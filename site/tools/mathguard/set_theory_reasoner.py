"""TRACE MathGuard V1.5 — SetTheoryReasoner & Boolean Set-Identity Proof Engine.

Provides deterministic verification for:
- Set operations: union, intersection, difference, symmetric difference, complement,
  power set, Cartesian product, cardinality
- Set relations: membership (∈, ∉), subset (⊆), proper subset (⊂), equality (=),
  equivalence (n(A)=n(B)), disjointness
- Inclusion-exclusion (2-set and 3-set)
- Complete universal proof & counterexample generation for general set identities
  via 2^k minterm Boolean truth tables (Stone representation)
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Set, Tuple, Union

from .set_types import (
    EMPTY_SET,
    OrderedPair,
    SymbolicInfiniteSet,
    TypedSet,
    _parse_single_element,
    normalize_set_text,
    parse_set_literal,
)


@dataclass
class SetEvalResult:
    ok: bool
    value: Any = None  # TypedSet | SymbolicInfiniteSet | Fraction | int | bool
    error: str = ""
    abstained: bool = False

    @property
    def status(self) -> str:
        if self.ok:
            return "OK"
        return "ABSTAINED" if self.abstained else "ERROR"


@dataclass
class ProofResult:
    status: str  # "PROVED" | "DISPROVED" | "ABSTAINED"
    claim: str
    method: str
    universal: bool = False
    counterexample: Optional[Dict[str, Any]] = None
    reason: str = ""


class _SetExprParser:
    """Recursive-descent parser/evaluator for set-theoretic expressions."""

    def __init__(self, text: str, env: Dict[str, Any], universe: Optional[TypedSet] = None) -> None:
        self.raw = normalize_set_text(text)
        self.env = env
        self.universe = universe
        self.tokens = self._tokenize(self.raw)
        self.pos = 0

    @staticmethod
    def _tokenize(s: str) -> List[str]:
        tokens: List[str] = []
        i = 0
        n = len(s)
        while i < n:
            ch = s[i]
            if ch.isspace():
                i += 1
                continue
            if ch == "{":
                # Capture balanced {...} literal as single token
                depth = 0
                j = i
                while j < n:
                    if s[j] == "{":
                        depth += 1
                    elif s[j] == "}":
                        depth -= 1
                        if depth == 0:
                            j += 1
                            break
                    j += 1
                tokens.append(s[i:j])
                i = j
                continue
            if ch in "()∪∩\\-Δ×'∅|":
                tokens.append(ch)
                i += 1
                continue
            # Multi-char identifiers (e.g. P, n, A, U, A1, etc.)
            m = re.match(r"[A-Za-z0-9_ℕ𝕎ℤℚℝ]+", s[i:])
            if m:
                tokens.append(m.group(0))
                i += len(m.group(0))
                continue
            tokens.append(ch)
            i += 1
        return tokens

    def peek(self) -> Optional[str]:
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self) -> str:
        tok = self.tokens[self.pos]
        self.pos += 1
        return tok

    def parse(self) -> Any:
        val = self._parse_union_diff()
        if self.pos < len(self.tokens):
            raise ValueError(f"Unexpected token: {self.tokens[self.pos]}")
        return val

    def _parse_union_diff(self) -> Any:
        left = self._parse_inter()
        while self.peek() in ("∪", "\\", "-", "Δ"):
            op = self.consume()
            right = self._parse_inter()
            left = self._apply_binop(op, left, right)
        return left

    def _parse_inter(self) -> Any:
        left = self._parse_prod()
        while self.peek() == "∩":
            self.consume()
            right = self._parse_prod()
            left = self._apply_binop("∩", left, right)
        return left

    def _parse_prod(self) -> Any:
        left = self._parse_postfix()
        while self.peek() == "×":
            self.consume()
            right = self._parse_postfix()
            left = self._apply_binop("×", left, right)
        return left

    def _parse_postfix(self) -> Any:
        val = self._parse_atom()
        while self.peek() == "'":
            self.consume()
            if self.universe is None:
                raise ValueError("ABSTAIN:complement_missing_universe")
            if not isinstance(val, TypedSet):
                raise ValueError("ABSTAIN:complement_non_finite_set")
            val = val.complement(self.universe)
        return val

    def _parse_atom(self) -> Any:
        tok = self.peek()
        if tok is None:
            raise ValueError("Unexpected end of expression")
        if tok == "(":
            self.consume()
            val = self._parse_union_diff()
            if self.peek() != ")":
                raise ValueError("Missing closing ')'")
            self.consume()
            return val
        if tok == "|":
            self.consume()
            val = self._parse_union_diff()
            if self.peek() != "|":
                raise ValueError("Missing closing '|'")
            self.consume()
            if isinstance(val, TypedSet):
                return Fraction(val.cardinality, 1)
            raise ValueError("ABSTAIN:cardinality_non_finite")
        if tok in ("P", "n") and self.pos + 1 < len(self.tokens) and self.tokens[self.pos + 1] == "(":
            fn = self.consume()
            self.consume()  # '('
            arg = self._parse_union_diff()
            if self.peek() != ")":
                raise ValueError(f"Missing ')' after {fn}(")
            self.consume()
            if not isinstance(arg, TypedSet):
                raise ValueError(f"ABSTAIN:{fn}_non_finite")
            if fn == "n":
                return Fraction(arg.cardinality, 1)
            return arg.power_set()
        self.consume()
        if tok == "∅":
            return EMPTY_SET
        if tok.startswith("{"):
            parsed = parse_set_literal(tok)
            if parsed is None:
                raise ValueError(f"Cannot parse set literal: {tok}")
            return parsed
        if tok in self.env:
            return self.env[tok]
        if tok in ("U", "ξ") and self.universe is not None:
            return self.universe
        lit = parse_set_literal(tok)
        if lit is not None:
            return lit
        if re.fullmatch(r"\d+", tok):
            return Fraction(int(tok), 1)
        raise ValueError(f"ABSTAIN:unknown_symbol:{tok}")

    @staticmethod
    def _apply_binop(op: str, left: Any, right: Any) -> Any:
        if isinstance(left, SymbolicInfiniteSet) or isinstance(right, SymbolicInfiniteSet):
            raise ValueError("ABSTAIN:infinite_set_operation")
        if not isinstance(left, TypedSet) or not isinstance(right, TypedSet):
            raise ValueError(f"Expected TypedSet for {op}, got {type(left).__name__}, {type(right).__name__}")
        if op == "∪":
            return left.union(right)
        if op == "∩":
            return left.intersection(right)
        if op in ("\\", "-"):
            return left.difference(right)
        if op == "Δ":
            return left.symmetric_difference(right)
        if op == "×":
            return left.cartesian_product(right)
        raise ValueError(f"Unknown operator {op}")


class _BooleanMaskParser:
    """Compiles a Boolean set expression into an integer bitmask over 2^k minterms."""

    def __init__(self, text: str, var_to_idx: Dict[str, int]) -> None:
        self.tokens = _SetExprParser._tokenize(normalize_set_text(text))
        self.var_to_idx = var_to_idx
        self.k = len(var_to_idx)
        self.full_mask = (1 << (1 << self.k)) - 1
        self.pos = 0

    def peek(self) -> Optional[str]:
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self) -> str:
        tok = self.tokens[self.pos]
        self.pos += 1
        return tok

    def parse(self) -> int:
        val = self._parse_union_diff()
        if self.pos < len(self.tokens):
            raise ValueError(f"Unexpected token: {self.tokens[self.pos]}")
        return val

    def _parse_union_diff(self) -> int:
        left = self._parse_inter()
        while self.peek() in ("∪", "\\", "-", "Δ"):
            op = self.consume()
            right = self._parse_inter()
            if op == "∪":
                left = left | right
            elif op in ("\\", "-"):
                left = left & (~right & self.full_mask)
            elif op == "Δ":
                left = left ^ right
        return left

    def _parse_inter(self) -> int:
        left = self._parse_postfix()
        while self.peek() == "∩":
            self.consume()
            right = self._parse_postfix()
            left = left & right
        return left

    def _parse_postfix(self) -> int:
        val = self._parse_atom()
        while self.peek() == "'":
            self.consume()
            val = (~val) & self.full_mask
        return val

    def _parse_atom(self) -> int:
        tok = self.peek()
        if tok is None:
            raise ValueError("Unexpected end")
        if tok == "(":
            self.consume()
            val = self._parse_union_diff()
            if self.peek() != ")":
                raise ValueError("Missing ')'")
            self.consume()
            return val
        self.consume()
        if tok in ("∅", "{}"):
            return 0
        if tok in ("U", "ξ"):
            return self.full_mask
        if tok in self.var_to_idx:
            idx = self.var_to_idx[tok]
            mask = 0
            for m in range(1 << self.k):
                if (m >> idx) & 1:
                    mask |= (1 << m)
            return mask
        raise ValueError(f"Unsupported token in boolean set identity: {tok}")


class SetTheoryReasoner:
    """Deterministic mathematical verifier for Grade 9 Set Language & set algebra."""

    def evaluate(
        self,
        expr_text: str,
        env: Optional[Dict[str, Any]] = None,
        universe: Optional[TypedSet] = None,
    ) -> SetEvalResult:
        env = dict(env or {})
        try:
            parser = _SetExprParser(expr_text, env=env, universe=universe)
            val = parser.parse()
            return SetEvalResult(ok=True, value=val)
        except ValueError as exc:
            msg = str(exc)
            if msg.startswith("ABSTAIN:"):
                return SetEvalResult(ok=False, error=msg, abstained=True)
            return SetEvalResult(ok=False, error=msg, abstained=False)

    def verify_claim(
        self,
        claim: str,
        env: Optional[Dict[str, Any]] = None,
        universe: Optional[TypedSet] = None,
    ) -> Dict[str, Any]:
        """Verify a concrete set-theory statement against env & universe."""
        s = normalize_set_text(claim)
        env = dict(env or {})

        # Check relational operators in priority order
        for op in ("∉", "∈", "⊈", "⊄", "⊆", "⊂", "≠", "≈", "="):
            if op in s:
                parts = s.split(op, 1)
                lhs_s, rhs_s = parts[0].strip(), parts[1].strip()
                return self._verify_relation(op, lhs_s, rhs_s, env, universe)

        return {"status": "UNVERIFIABLE", "reason": "No recognized set relation operator", "claim": claim}

    def _verify_relation(
        self,
        op: str,
        lhs_s: str,
        rhs_s: str,
        env: Dict[str, Any],
        universe: Optional[TypedSet],
    ) -> Dict[str, Any]:
        if op in ("∈", "∉"):
            # LHS is an element (could be a number, symbol, OrderedPair, or even a TypedSet like ∅)
            rhs_res = self.evaluate(rhs_s, env, universe)
            if not rhs_res.ok:
                return {"status": "UNVERIFIABLE", "reason": rhs_res.error}
            # Evaluate LHS as set if it's a set literal/variable, else as single element
            lhs_val: Any
            if lhs_s in env:
                lhs_val = env[lhs_s]
            else:
                lhs_val = _parse_single_element(lhs_s)
            if isinstance(rhs_res.value, TypedSet):
                is_in = lhs_val in rhs_res.value
            elif isinstance(rhs_res.value, SymbolicInfiniteSet):
                is_in = rhs_res.value.contains(lhs_val)
                if is_in is None:
                    return {"status": "UNVERIFIABLE", "reason": "Cannot decide membership in symbolic set"}
            else:
                return {"status": "UNVERIFIABLE", "reason": "RHS is not a set"}
            ok = is_in if op == "∈" else (not is_in)
            return {"status": "PASS" if ok else "FAIL", "op": op, "lhs": repr(lhs_val), "rhs": repr(rhs_res.value)}

        lhs_res = self.evaluate(lhs_s, env, universe)
        rhs_res = self.evaluate(rhs_s, env, universe)
        if not lhs_res.ok or not rhs_res.ok:
            return {"status": "UNVERIFIABLE", "reason": lhs_res.error or rhs_res.error}
        lv, rv = lhs_res.value, rhs_res.value

        if op in ("=", "≠"):
            if isinstance(lv, Fraction) and isinstance(rv, Fraction):
                eq = lv == rv
            elif isinstance(lv, TypedSet) and isinstance(rv, TypedSet):
                eq = lv == rv
            else:
                return {"status": "UNVERIFIABLE", "reason": f"Incompatible types for {op}"}
            ok = eq if op == "=" else (not eq)
            return {"status": "PASS" if ok else "FAIL", "op": op, "lhs": repr(lv), "rhs": repr(rv)}

        if not isinstance(lv, TypedSet) or not isinstance(rv, TypedSet):
            return {"status": "UNVERIFIABLE", "reason": f"{op} requires finite TypedSet operands"}

        if op == "≈":
            ok = lv.is_equivalent(rv)
        elif op == "⊆":
            ok = lv.is_subset(rv)
        elif op == "⊈":
            ok = not lv.is_subset(rv)
        elif op == "⊂":
            ok = lv.is_proper_subset(rv)
        elif op == "⊄":
            ok = not lv.is_proper_subset(rv)
        else:
            return {"status": "UNVERIFIABLE", "reason": f"Unsupported op {op}"}
        return {"status": "PASS" if ok else "FAIL", "op": op, "lhs": repr(lv), "rhs": repr(rv)}

    def prove_identity(self, claim: str, variables: Optional[List[str]] = None) -> ProofResult:
        """Prove or disprove a general set-algebraic identity via 2^k Boolean minterms."""
        s = normalize_set_text(claim)
        rel_op = None
        for op in ("⊆", "="):
            if op in s:
                rel_op = op
                break
        if rel_op is None:
            return ProofResult("ABSTAINED", claim, "boolean_minterm", reason="No '=' or '⊆' found")

        lhs_s, rhs_s = [p.strip() for p in s.split(rel_op, 1)]
        # Reject Cartesian products or power sets from Boolean minterm prover (cannot be proved by Venn minterms alone)
        if any(sym in s for sym in ("×", "P(", "n(", "|")):
            return self._check_non_boolean_counterexample(claim, rel_op, lhs_s, rhs_s)

        if variables is None:
            found = []
            for tok in _SetExprParser._tokenize(s):
                if re.fullmatch(r"[A-Za-z]", tok) and tok not in ("U", "ξ"):
                    if tok not in found:
                        found.append(tok)
            variables = found

        if len(variables) > 5:
            return ProofResult("ABSTAINED", claim, "boolean_minterm", reason="Too many set variables (>5)")

        var_to_idx = {v: i for i, v in enumerate(variables)}
        try:
            lmask = _BooleanMaskParser(lhs_s, var_to_idx).parse()
            rmask = _BooleanMaskParser(rhs_s, var_to_idx).parse()
        except ValueError as exc:
            return ProofResult("ABSTAINED", claim, "boolean_minterm", reason=str(exc))

        if rel_op == "=":
            valid = lmask == rmask
            diff = lmask ^ rmask
        else:
            valid = (lmask & (~rmask)) == 0
            diff = lmask & (~rmask)

        if valid:
            return ProofResult(
                status="PROVED",
                claim=claim,
                method="boolean_minterm_truth_table",
                universal=True,
                reason=f"Verified over all {1 << len(variables)} minterm regions",
            )

        # Build minimal concrete counterexample from differing minterms
        k = len(variables)
        universe_elems = []
        var_sets: Dict[str, Set[int]] = {v: set() for v in variables}
        for m in range(1 << k):
            if (diff >> m) & 1:
                elem = m + 1
                universe_elems.append(elem)
                for idx, v in enumerate(variables):
                    if (m >> idx) & 1:
                        var_sets[v].add(elem)
        cx: Dict[str, Any] = {v: TypedSet(var_sets[v]) for v in variables}
        cx["U"] = TypedSet(universe_elems)
        return ProofResult(
            status="DISPROVED",
            claim=claim,
            method="boolean_minterm_counterexample",
            universal=False,
            counterexample=cx,
            reason="Identity fails on constructed minimal counterexample",
        )

    def _check_non_boolean_counterexample(
        self, claim: str, rel_op: str, lhs_s: str, rhs_s: str
    ) -> ProofResult:
        """For non-Boolean identities (×, P, n), only disprove via counterexample; abstain if sample agrees."""
        vars_found = []
        for tok in _SetExprParser._tokenize(lhs_s + " " + rhs_s):
            if re.fullmatch(r"[A-Za-z]", tok) and tok not in ("U", "ξ", "P", "n"):
                if tok not in vars_found:
                    vars_found.append(tok)
        if len(vars_found) > 3:
            return ProofResult("ABSTAINED", claim, "non_boolean_guard", reason="Cannot universally prove non-Boolean identity")

        # Test a small set of distinct finite witnesses to catch false identities (e.g. A × B = B × A)
        witnesses = [TypedSet([1]), TypedSet([2, 3]), TypedSet([3, 4])]
        env = {v: witnesses[i % len(witnesses)] for i, v in enumerate(vars_found)}
        u = TypedSet([1, 2, 3, 4])
        lv = self.evaluate(lhs_s, env, u)
        rv = self.evaluate(rhs_s, env, u)
        if lv.ok and rv.ok:
            if rel_op == "=" and lv.value != rv.value:
                return ProofResult(
                    status="DISPROVED",
                    claim=claim,
                    method="counterexample_witness",
                    universal=False,
                    counterexample={**env, "U": u},
                    reason=f"Counterexample found: {lv.value} != {rv.value}",
                )
            if rel_op == "⊆" and isinstance(lv.value, TypedSet) and isinstance(rv.value, TypedSet):
                if not lv.value.is_subset(rv.value):
                    return ProofResult(
                        status="DISPROVED",
                        claim=claim,
                        method="counterexample_witness",
                        universal=False,
                        counterexample={**env, "U": u},
                        reason=f"Counterexample found: {lv.value} ⊈ {rv.value}",
                    )
        # Crucial soundness rule: finite sample agreeing does NOT establish universal proof!
        return ProofResult(
            status="ABSTAINED",
            claim=claim,
            method="non_boolean_guard",
            universal=False,
            reason="Finite sample agreement does not establish universal proof for non-Boolean set identity",
        )

    @staticmethod
    def verify_inclusion_exclusion_2(
        n_a: int, n_b: int, n_a_inter_b: int, n_a_union_b: int
    ) -> bool:
        return n_a_union_b == n_a + n_b - n_a_inter_b

    @staticmethod
    def verify_inclusion_exclusion_3(
        n_a: int,
        n_b: int,
        n_c: int,
        n_ab: int,
        n_bc: int,
        n_ac: int,
        n_abc: int,
        n_union: int,
    ) -> bool:
        return n_union == n_a + n_b + n_c - n_ab - n_bc - n_ac + n_abc
