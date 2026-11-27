"""TRACE MathGuard V1.4b — Symbolic Reasoning Intelligence.

Provides:
- Scoped FunctionRegistry (definitions, substitutions, radical/fraction/parameter evaluations)
- PolynomialReasoner (division, Remainder/Factor theorems, GCD/LCM, exact coefficient comparison)
- ScopedMathState (givens vs derived vs temporary substitutions vs solution branches)
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Set, Tuple

import sympy as sp

_BUILTIN_FUNCS = {
    "sin", "cos", "tan", "cot", "sec", "csc",
    "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh",
    "sqrt", "cbrt", "log", "ln", "exp", "abs", "Abs",
    "gcd", "lcm", "GCD", "LCM", "min", "max", "floor", "ceiling",
    "Area", "Slope", "Distance", "Midpoint",
}

_CONVENTIONAL_FUNC_NAMES = {"f", "g", "h", "p", "q", "P", "Q", "R", "F", "G"}


@dataclass
class FunctionDef:
    name: str
    params: Tuple[str, ...]
    body: sp.Expr
    source: str = "step"  # "stem" | "step"


def _find_matching_paren(s: str, open_idx: int) -> int:
    """Find matching ')' for '(' at open_idx, returning -1 if unbalanced."""
    depth = 0
    for i in range(open_idx, len(s)):
        if s[i] == "(":
            depth += 1
        elif s[i] == ")":
            depth -= 1
            if depth == 0:
                return i
    return -1


def _split_top_level_commas(s: str) -> List[str]:
    parts: List[str] = []
    depth = 0
    cur: List[str] = []
    for ch in s:
        if ch in "([{":
            depth += 1
        elif ch in ")]}":
            depth = max(0, depth - 1)
        if ch == "," and depth == 0:
            parts.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
    tail = "".join(cur).strip()
    if tail:
        parts.append(tail)
    return parts


class FunctionRegistry:
    """Scoped mathematical function table supporting symbolic and numeric evaluation."""

    def __init__(self) -> None:
        self.functions: Dict[str, FunctionDef] = {}

    def copy(self) -> "FunctionRegistry":
        reg = FunctionRegistry()
        reg.functions = dict(self.functions)
        return reg

    def define(self, name: str, params: Tuple[str, ...], body: sp.Expr, source: str = "step") -> None:
        self.functions[name] = FunctionDef(name=name, params=params, body=body, source=source)

    def has(self, name: str) -> bool:
        return name in self.functions

    def evaluate(self, name: str, args: List[sp.Expr]) -> Optional[sp.Expr]:
        fdef = self.functions.get(name)
        if fdef is None or len(fdef.params) != len(args):
            return None
        subs = {sp.Symbol(p): a for p, a in zip(fdef.params, args)}
        try:
            res = fdef.body.subs(subs)
            return sp.simplify(res)
        except Exception:
            try:
                return fdef.body.subs(subs)
            except Exception:
                return None

    def extract_from_stem(self, q_text: str, parse_fn: Callable[[str], Optional[sp.Expr]]) -> None:
        """Extract function definitions like p(x) = x^3 - 1, f(y) = 6y - 3y^2 + 3 from stem."""
        if not q_text:
            return
        txt = q_text.replace("−", "-").replace("–", "-")
        txt = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")), txt)
        # Match explicit f(x) = <expr>
        for m in re.finditer(r"\b([fgphqPFG])\s*\(\s*([a-zA-Z](?:\s*,\s*[a-zA-Z])*)\s*\)\s*=\s*([^\n;]+)", txt):
            fname = m.group(1)
            params = tuple(p.strip() for p in m.group(2).split(","))
            rhs_raw = m.group(3)
            # Stop before trailing clauses like ", x = 1/2", ", find ...", "at x =", "when ..."
            rhs_raw = re.split(
                r",\s*(?:[a-zA-Z]\s*=|find\b|at\b|when\b|where\b|if\b|then\b|verify\b|check\b|show\b|determine\b)",
                rhs_raw,
                maxsplit=1,
                flags=re.I,
            )[0]
            rhs_raw = re.split(r"\b(?:find|at|when|where|if|and)\b", rhs_raw, maxsplit=1, flags=re.I)[0]
            rhs_raw = rhs_raw.strip().rstrip(".,:")
            if not rhs_raw:
                continue
            body = parse_fn(rhs_raw)
            if body is not None:
                self.define(fname, params, body, source="stem")

        # Implicit primary polynomial in factor/remainder/divisibility/square-root stems
        if "p" not in self.functions:
            m_fac = re.search(
                r"(?:factor\s+of(?:\s+the\s+following\s+polynomials?)?|divisible\s+by(?:\s+\([^)]+\)\s*,?\s*then)?|square\s+root\s+of|remainder\s+when)\s*:?\s*(?:\([ivx]+\)\s*)?([a-zA-Z0-9\^\+\-\*\/\(\)\s√⁰¹²³⁴⁵⁶⁷⁸⁹]+?)(?:\s+(?:is|by|when|at)\b|[.?,\n]|$)",
                txt,
                flags=re.I,
            )
            if not m_fac:
                m_fac = re.search(
                    r"\bif\s+([a-zA-Z0-9\^\+\-\*\/\(\)\s√⁰¹²³⁴⁵⁶⁷⁸⁹]+?)\s+is\s+(?:exactly\s+)?divisible\s+by\b",
                    txt,
                    flags=re.I,
                )
            if m_fac:
                cand = m_fac.group(1).strip().rstrip(".,:")
                # Avoid capturing "(x + 2)" as the polynomial itself
                if cand and not re.fullmatch(r"\([^)]+\)", cand):
                    body = parse_fn(cand)
                    if body is not None and body.free_symbols:
                        # Prefer 'x' if present, else first sorted symbol
                        syms = sorted(s.name for s in body.free_symbols)
                        var = "x" if "x" in syms else syms[0]
                        self.define("p", (var,), body, source="stem_implicit")

    def resolve_calls_in_preprocessed(
        self,
        pre: str,
        parse_fn: Callable[[str], Optional[sp.Expr]],
        scalar_env_names: Set[str],
        protect_chars: List[str],
    ) -> Tuple[str, Dict[str, sp.Expr], List[str], int]:
        """Replace function calls f(arg) in preprocessed line with protected tokens.

        Returns (rewritten_str, rev_map, unbound_func_names, next_protect_idx).
        Does NOT treat f(arg) as f * arg when f is a registered function or a
        conventional function symbol not in scalar_env_names.
        """
        rev_map: Dict[str, sp.Expr] = {}
        unbound: List[str] = []
        p_idx = 0

        # Scan left-to-right for identifier '('
        out: List[str] = []
        i = 0
        n = len(pre)
        while i < n:
            m = re.match(r"([A-Za-z][A-Za-z0-9_]*)\s*\(", pre[i:])
            if m and (i == 0 or not (pre[i - 1].isalnum() or pre[i - 1] == "_")):
                fname = m.group(1)
                open_paren = i + m.end() - 1
                close_paren = _find_matching_paren(pre, open_paren)
                is_known = fname in self.functions
                is_conv = (fname in _CONVENTIONAL_FUNC_NAMES) and (fname not in scalar_env_names)
                if close_paren != -1 and fname not in _BUILTIN_FUNCS and (is_known or is_conv):
                    arg_raw = pre[open_paren + 1 : close_paren]
                    arg_parts = _split_top_level_commas(arg_raw)
                    parsed_args = [parse_fn(a) for a in arg_parts] if arg_parts else []
                    if is_known and parsed_args and all(a is not None for a in parsed_args):
                        val = self.evaluate(fname, [a for a in parsed_args if a is not None])
                        if val is not None and p_idx < len(protect_chars):
                            ch = protect_chars[p_idx]
                            p_idx += 1
                            rev_map[ch] = val
                            out.append(f"({ch})")
                            i = close_paren + 1
                            continue
                    # Unbound function call (do NOT fall back to multiplication!)
                    if not is_known:
                        unbound.append(f"{fname}({arg_raw})")
                        if p_idx < len(protect_chars):
                            ch = protect_chars[p_idx]
                            p_idx += 1
                            rev_map[ch] = sp.Symbol(f"__unbound_{fname}_{p_idx}")
                            out.append(f"({ch})")
                            i = close_paren + 1
                            continue
            out.append(pre[i])
            i += 1
        return "".join(out), rev_map, unbound, p_idx


class PolynomialReasoner:
    """Deterministic symbolic polynomial operations over exact arithmetic."""

    @staticmethod
    def _pick_var(exprs: List[sp.Expr], var: Optional[sp.Symbol] = None) -> Optional[sp.Symbol]:
        if var is not None:
            return var
        syms = set()
        for e in exprs:
            syms |= e.free_symbols
        if not syms:
            return None
        for pref in ("x", "y", "t", "a", "z"):
            s = sp.Symbol(pref)
            if s in syms:
                return s
        return sorted(syms, key=lambda s: s.name)[0]

    @classmethod
    def verify_division_identity(
        cls,
        dividend: sp.Expr,
        divisor: sp.Expr,
        quotient: sp.Expr,
        remainder: sp.Expr,
    ) -> Optional[bool]:
        try:
            diff = sp.expand(dividend - (divisor * quotient + remainder))
            return diff == 0
        except Exception:
            return None

    @classmethod
    def verify_remainder_theorem(
        cls,
        poly: sp.Expr,
        divisor: sp.Expr,
        claimed_rem: sp.Expr,
        var: Optional[sp.Symbol] = None,
    ) -> Optional[bool]:
        v = cls._pick_var([poly, divisor], var)
        if v is None:
            return None
        try:
            roots = sp.solve(divisor, v)
            if len(roots) != 1:
                _, rem = sp.div(sp.Poly(poly, v), sp.Poly(divisor, v))
                return sp.simplify(rem.as_expr() - claimed_rem) == 0
            val = sp.simplify(poly.subs(v, roots[0]))
            return sp.simplify(val - claimed_rem) == 0
        except Exception:
            return None

    @classmethod
    def verify_factor_theorem(
        cls,
        poly: sp.Expr,
        factor_expr: sp.Expr,
        var: Optional[sp.Symbol] = None,
    ) -> Optional[bool]:
        return cls.verify_remainder_theorem(poly, factor_expr, sp.Integer(0), var=var)

    @classmethod
    def verify_gcd_lcm(
        cls,
        p1: sp.Expr,
        p2: sp.Expr,
        claimed_gcd: Optional[sp.Expr] = None,
        claimed_lcm: Optional[sp.Expr] = None,
        var: Optional[sp.Symbol] = None,
    ) -> Optional[bool]:
        v = cls._pick_var([p1, p2], var)
        if v is None:
            return None
        try:
            g = sp.gcd(p1, p2)
            l = sp.lcm(p1, p2)
            ok = True
            if claimed_gcd is not None:
                # Polynomial GCD is unique up to a nonzero scalar factor
                ratio = sp.simplify(claimed_gcd / g) if g != 0 else None
                ok = ok and (ratio is not None and ratio != 0 and not ratio.free_symbols)
            if claimed_lcm is not None:
                ratio = sp.simplify(claimed_lcm / l) if l != 0 else None
                ok = ok and (ratio is not None and ratio != 0 and not ratio.free_symbols)
            return ok
        except Exception:
            return None

    @classmethod
    def verify_coefficients_equal(cls, e1: sp.Expr, e2: sp.Expr, var: Optional[sp.Symbol] = None) -> Optional[bool]:
        v = cls._pick_var([e1, e2], var)
        if v is None:
            return sp.simplify(e1 - e2) == 0
        try:
            p1 = sp.Poly(sp.expand(e1), v)
            p2 = sp.Poly(sp.expand(e2), v)
            return p1.all_coeffs() == p2.all_coeffs()
        except Exception:
            return sp.simplify(e1 - e2) == 0


@dataclass
class ScopedMathState:
    """Tracks givens, derived values, temporary substitutions, branches, and functions."""

    givens: Dict[str, sp.Expr] = field(default_factory=dict)
    derived: Dict[str, sp.Expr] = field(default_factory=dict)
    temp_subs: Dict[str, sp.Expr] = field(default_factory=dict)
    functions: FunctionRegistry = field(default_factory=FunctionRegistry)
    active_equations: List[sp.Eq] = field(default_factory=list)
    solution_branches: List[List[sp.Eq]] = field(default_factory=list)
    domain_restrictions: List[str] = field(default_factory=list)
    assumptions: List[str] = field(default_factory=list)
    variable_units: Dict[str, str] = field(default_factory=dict)

    def push_temp_scope(self) -> Dict[str, sp.Expr]:
        return dict(self.temp_subs)

    def pop_temp_scope(self, saved: Dict[str, sp.Expr]) -> None:
        self.temp_subs = saved

    def merged_env(self) -> Dict[str, sp.Expr]:
        out = dict(self.givens)
        out.update(self.derived)
        out.update(self.temp_subs)
        return out
