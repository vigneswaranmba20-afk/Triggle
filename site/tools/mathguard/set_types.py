"""TRACE MathGuard V1.5 — Typed Mathematical Objects & Set Parser.

Provides exact, hashable, typed representations for:
- Elements (numbers as exact Fraction/int, symbols/strings, nested TypedSet, OrderedPair)
- Finite sets (TypedSet) with automatic deduplication and exact ∅ vs {∅} distinction
- Infinite/symbolic sets (SymbolicInfiniteSet: ℕ, 𝕎, ℤ, ℚ, ℝ, intervals, predicates)
- Ordered pairs (OrderedPair) & tuples (OrderedTuple) with strict directionality
- Roster, set-builder, and set-expression parsers (Unicode + LaTeX)
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass
from fractions import Fraction
from typing import Any, Callable, Dict, FrozenSet, Iterable, List, Optional, Sequence, Set, Tuple, Union

import sympy as sp

from .parser import parse_expression


def _is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n in (2, 3):
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def _canonical_number(val: Any) -> Optional[Fraction]:
    if isinstance(val, bool):
        return None
    if isinstance(val, int):
        return Fraction(val, 1)
    if isinstance(val, Fraction):
        return val
    if isinstance(val, sp.Integer):
        return Fraction(int(val), 1)
    if isinstance(val, sp.Rational):
        return Fraction(int(val.p), int(val.q))
    return None


@dataclass(frozen=True)
class OrderedPair:
    """Directed ordered pair (a, b) where (a, b) != (b, a) for a != b."""

    first: Any
    second: Any

    def __repr__(self) -> str:
        return f"({self.first}, {self.second})"


@dataclass(frozen=True)
class OrderedTuple:
    """Directed n-tuple (a1, ..., an)."""

    items: Tuple[Any, ...]

    def __repr__(self) -> str:
        return "(" + ", ".join(repr(x) for x in self.items) + ")"


class TypedSet:
    """Exact finite mathematical set with deduplication and nested-set support."""

    __slots__ = ("_elements",)

    def __init__(self, elements: Iterable[Any] = ()) -> None:
        normed = [_normalize_element(e) for e in elements]
        self._elements: FrozenSet[Any] = frozenset(normed)

    @property
    def elements(self) -> FrozenSet[Any]:
        return self._elements

    @property
    def is_empty(self) -> bool:
        return len(self._elements) == 0

    @property
    def cardinality(self) -> int:
        return len(self._elements)

    @property
    def proper_subset_count(self) -> int:
        return (1 << len(self._elements)) - 1

    def __len__(self) -> int:
        return len(self._elements)

    def __iter__(self):
        return iter(self._elements)

    def __contains__(self, item: Any) -> bool:
        return _normalize_element(item) in self._elements

    def contains(self, item: Any) -> bool:
        return item in self

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, TypedSet):
            return False
        return self._elements == other._elements

    def __hash__(self) -> int:
        return hash(("TypedSet", self._elements))

    def __repr__(self) -> str:
        if not self._elements:
            return "∅"
        return "{" + ", ".join(sorted((repr(e) for e in self._elements))) + "}"

    def format_str(self) -> str:
        return repr(self)

    def is_equal(self, other: "TypedSet") -> bool:
        return self == other

    def is_equivalent(self, other: "TypedSet") -> bool:
        return len(self._elements) == len(other._elements)

    def is_subset(self, other: "TypedSet") -> bool:
        return self._elements.issubset(other._elements)

    def is_subset_of(self, other: "TypedSet") -> bool:
        return self.is_subset(other)

    def is_proper_subset(self, other: "TypedSet") -> bool:
        return self._elements < other._elements

    def is_proper_subset_of(self, other: "TypedSet") -> bool:
        return self.is_proper_subset(other)

    def is_disjoint(self, other: "TypedSet") -> bool:
        return self._elements.isdisjoint(other._elements)

    def union(self, other: "TypedSet") -> "TypedSet":
        return TypedSet(self._elements | other._elements)

    def intersection(self, other: "TypedSet") -> "TypedSet":
        return TypedSet(self._elements & other._elements)

    def difference(self, other: "TypedSet") -> "TypedSet":
        return TypedSet(self._elements - other._elements)

    def symmetric_difference(self, other: "TypedSet") -> "TypedSet":
        return TypedSet(self._elements ^ other._elements)

    def complement(self, universe: "TypedSet") -> "TypedSet":
        return TypedSet(universe._elements - self._elements)

    def power_set(self) -> "TypedSet":
        elems = list(self._elements)
        n = len(elems)
        if n > 12:
            raise ValueError(f"Power set enumeration guarded for |A|={n} > 12")
        subsets: List[TypedSet] = []
        for mask in range(1 << n):
            sub = [elems[i] for i in range(n) if (mask >> i) & 1]
            subsets.append(TypedSet(sub))
        return TypedSet(subsets)

    def cartesian_product(self, other: "TypedSet") -> "TypedSet":
        return TypedSet(OrderedPair(a, b) for a in self._elements for b in other._elements)


EMPTY_SET = TypedSet()


@dataclass(frozen=True)
class SymbolicInfiniteSet:
    """Represents an infinite or symbolically constrained set (ℕ, 𝕎, ℤ, ℚ, ℝ, intervals)."""

    kind: str  # "N" | "W" | "Z" | "Q" | "R" | "INTERVAL" | "PREDICATE"
    label: str
    lower: Optional[Fraction] = None
    upper: Optional[Fraction] = None
    lower_closed: bool = True
    upper_closed: bool = True
    predicate_desc: str = ""

    @property
    def is_finite(self) -> bool:
        return False

    def contains(self, elem: Any) -> Optional[bool]:
        num = _canonical_number(elem)
        if self.kind == "N":
            if num is None:
                return False
            return num.denominator == 1 and num.numerator >= 1
        if self.kind == "W":
            if num is None:
                return False
            return num.denominator == 1 and num.numerator >= 0
        if self.kind == "Z":
            if num is None:
                return False
            return num.denominator == 1
        if self.kind == "Q":
            return num is not None
        if self.kind == "R":
            if num is not None:
                return True
            if isinstance(elem, sp.Basic):
                return bool(elem.is_real) if elem.is_real is not None else None
            return None
        if self.kind == "INTERVAL":
            if num is None:
                return None
            if self.lower is not None:
                if self.lower_closed and num < self.lower:
                    return False
                if not self.lower_closed and num <= self.lower:
                    return False
            if self.upper is not None:
                if self.upper_closed and num > self.upper:
                    return False
                if not self.upper_closed and num >= self.upper:
                    return False
            return True
        return None


STANDARD_INFINITE_SETS: Dict[str, SymbolicInfiniteSet] = {
    "N": SymbolicInfiniteSet("N", "ℕ"),
    "ℕ": SymbolicInfiniteSet("N", "ℕ"),
    "W": SymbolicInfiniteSet("W", "𝕎"),
    "𝕎": SymbolicInfiniteSet("W", "𝕎"),
    "Z": SymbolicInfiniteSet("Z", "ℤ"),
    "ℤ": SymbolicInfiniteSet("Z", "ℤ"),
    "Q": SymbolicInfiniteSet("Q", "ℚ"),
    "ℚ": SymbolicInfiniteSet("Q", "ℚ"),
    "R": SymbolicInfiniteSet("R", "ℝ"),
    "ℝ": SymbolicInfiniteSet("R", "ℝ"),
}


def _normalize_element(elem: Any) -> Any:
    """Canonicalize an element for exact set membership and equality."""
    if isinstance(elem, (TypedSet, OrderedPair, OrderedTuple, SymbolicInfiniteSet)):
        return elem
    num = _canonical_number(elem)
    if num is not None:
        return num
    if isinstance(elem, (tuple, list)):
        if len(elem) == 2:
            return OrderedPair(_normalize_element(elem[0]), _normalize_element(elem[1]))
        return OrderedTuple(tuple(_normalize_element(x) for x in elem))
    if isinstance(elem, (set, frozenset)):
        return TypedSet(elem)
    if isinstance(elem, str):
        s = elem.strip()
        if s in ("∅", "{}", r"\emptyset", r"\varnothing"):
            return EMPTY_SET
        # Try exact numeric parse
        if re.fullmatch(r"[+-]?\d+", s):
            return Fraction(int(s), 1)
        if re.fullmatch(r"[+-]?\d+/\d+", s):
            p, q = s.split("/")
            if int(q) != 0:
                return Fraction(int(p), int(q))
        return s
    if isinstance(elem, sp.Basic):
        if elem.is_Integer:
            return Fraction(int(elem), 1)
        if elem.is_Rational:
            return Fraction(int(elem.p), int(elem.q))
        return sp.simplify(elem)
    return elem


def normalize_set_text(text: str) -> str:
    """Normalize LaTeX and Unicode set-theory notation into canonical tokens."""
    if not text:
        return ""
    s = text.strip()
    replacements = [
        (r"\left\{", "{"), (r"\right\}", "}"),
        (r"\left(", "("), (r"\right)", ")"),
        (r"\lbrace", "{"), (r"\rbrace", "}"),
        (r"\{", "{"), (r"\}", "}"),
        (r"\emptyset", "∅"), (r"\varnothing", "∅"),
        (r"\cup", " ∪ "), (r"\cap", " ∩ "),
        (r"\setminus", " \\ "), (r"\times", " × "),
        (r"\Delta", " Δ "), (r"\triangle", " Δ "),
        (r"\subseteq", " ⊆ "), (r"\subset", " ⊂ "),
        (r"\nsubseteq", " ⊈ "), (r"\nsubset", " ⊄ "),
        (r"\in", " ∈ "), (r"\notin", " ∉ "),
        (r"\leq", " ≤ "), (r"\le", " ≤ "),
        (r"\geq", " ≥ "), (r"\ge", " ≥ "),
        (r"\neq", " ≠ "), (r"\ne", " ≠ "),
        (r"\mathbb{N}", "ℕ"), (r"\mathbb{W}", "𝕎"),
        (r"\mathbb{Z}", "ℤ"), (r"\mathbb{Q}", "ℚ"), (r"\mathbb{R}", "ℝ"),
        (r"^{\prime}", "'"), (r"^c", "'"), (r"^\prime", "'"),
        ("−", "-"), ("–", "-"), ("′", "'"), ("ᶜ", "'"),
    ]
    for old, new in replacements:
        s = s.replace(old, new)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def _split_top_level(s: str, sep: str = ",") -> List[str]:
    """Split string by sep only at bracket depth 0."""
    parts: List[str] = []
    depth_curly = 0
    depth_paren = 0
    depth_sq = 0
    cur: List[str] = []
    for ch in s:
        if ch == "{":
            depth_curly += 1
        elif ch == "}":
            depth_curly = max(0, depth_curly - 1)
        elif ch == "(":
            depth_paren += 1
        elif ch == ")":
            depth_paren = max(0, depth_paren - 1)
        elif ch == "[":
            depth_sq += 1
        elif ch == "]":
            depth_sq = max(0, depth_sq - 1)
        if ch == sep and depth_curly == 0 and depth_paren == 0 and depth_sq == 0:
            part = "".join(cur).strip()
            if part:
                parts.append(part)
            cur = []
        else:
            cur.append(ch)
    tail = "".join(cur).strip()
    if tail:
        parts.append(tail)
    return parts


def _parse_single_element(token: str) -> Any:
    tok = token.strip()
    if tok in ("∅", "{}"):
        return EMPTY_SET
    if tok.startswith("{") and tok.endswith("}"):
        parsed = parse_set_literal(tok)
        if parsed is not None:
            return parsed
    if tok.startswith("(") and tok.endswith(")"):
        inner = tok[1:-1].strip()
        parts = _split_top_level(inner, ",")
        if len(parts) == 2:
            return OrderedPair(_parse_single_element(parts[0]), _parse_single_element(parts[1]))
        if len(parts) > 2:
            return OrderedTuple(tuple(_parse_single_element(p) for p in parts))
    if re.fullmatch(r"[+-]?\d+", tok):
        return Fraction(int(tok), 1)
    if re.fullmatch(r"[+-]?\d+/\d+", tok):
        p, q = tok.split("/")
        if int(q) != 0:
            return Fraction(int(p), int(q))
    # Try symbolic expression if numeric/radical
    if any(c in tok for c in ("√", "sqrt", "^", "/", "+", "-", "*")) and not re.search(r"[a-zA-Z]{3,}", tok):
        expr = parse_expression(tok)
        if expr is not None:
            if expr.is_Integer:
                return Fraction(int(expr), 1)
            if expr.is_Rational:
                return Fraction(int(expr.p), int(expr.q))
            return sp.simplify(expr)
    return tok.strip("'\"")


def _parse_set_builder(inner: str) -> Optional[Union[TypedSet, SymbolicInfiniteSet]]:
    """Parse set-builder notation like 'x : x ∈ N, x < 5' or 'x | x is prime, x < 10'."""
    # Split on ':' or '|' at top level
    m = re.match(r"^([a-zA-Z](?:\s*,\s*[a-zA-Z])*)\s*[:|]\s*(.+)$", inner.strip())
    if not m:
        return None
    var_name = m.group(1).strip()
    cond_str = m.group(2).strip()
    if "," in var_name:
        return None  # Multi-variable set-builder handled by relation/function reasoners

    # Detect domain (ℕ, 𝕎, ℤ, ℚ, ℝ)
    domain = "R"
    if re.search(r"(?:∈|in)\s*(?:ℕ|N\b|natural)", cond_str, re.I):
        domain = "N"
    elif re.search(r"(?:∈|in)\s*(?:𝕎|W\b|whole)", cond_str, re.I):
        domain = "W"
    elif re.search(r"(?:∈|in)\s*(?:ℤ|Z\b|integer)", cond_str, re.I):
        domain = "Z"
    elif re.search(r"(?:∈|in)\s*(?:ℚ|Q\b|rational)", cond_str, re.I):
        domain = "Q"
    elif re.search(r"(?:∈|in)\s*(?:ℝ|R\b|real)", cond_str, re.I):
        domain = "R"

    # Check parametric form: x = expr, n ∈ N/W/Z, bounds
    param_m = re.search(
        rf"^{re.escape(var_name)}\s*=\s*([^,;]+)[,;]\s*([a-zA-Z])\s*(?:∈|in)\s*([ℕ𝕎ℤNWZ])(.*)$",
        cond_str,
    )
    if param_m:
        expr_str = param_m.group(1).strip()
        pvar = param_m.group(2).strip()
        pdom = param_m.group(3).strip()
        rest = param_m.group(4).strip(" ,;")
        pdom_norm = {"ℕ": "N", "N": "N", "𝕎": "W", "W": "W", "ℤ": "Z", "Z": "Z"}.get(pdom, "Z")
        bounds = _extract_integer_bounds(pvar, rest, pdom_norm)
        if bounds is not None:
            lo, hi = bounds
            expr = parse_expression(expr_str)
            if expr is not None:
                sym = sp.Symbol(pvar)
                elems = []
                for k in range(lo, hi + 1):
                    elems.append(sp.simplify(expr.subs(sym, k)))
                return TypedSet(elems)
        return SymbolicInfiniteSet("PREDICATE", f"{{{inner}}}", predicate_desc=cond_str)

    # Check polynomial equation: e.g. x^2 - 5x + 6 = 0
    eq_m = re.search(r"([^,;<>=≤≥]+)\s*=\s*([^,;<>=≤≥]+)", cond_str)
    if eq_m and not re.search(r"[<>≤≥]", cond_str):
        lhs_s, rhs_s = eq_m.group(1).strip(), eq_m.group(2).strip()
        lhs_e, rhs_e = parse_expression(lhs_s), parse_expression(rhs_s)
        if lhs_e is not None and rhs_e is not None:
            sym = sp.Symbol(var_name)
            try:
                sols = sp.solve(sp.Eq(lhs_e, rhs_e), sym)
                filtered = []
                for s in sols:
                    if domain == "N" and s.is_integer and s >= 1:
                        filtered.append(s)
                    elif domain == "W" and s.is_integer and s >= 0:
                        filtered.append(s)
                    elif domain == "Z" and s.is_integer:
                        filtered.append(s)
                    elif domain == "Q" and s.is_rational:
                        filtered.append(s)
                    elif domain == "R" and s.is_real:
                        filtered.append(s)
                return TypedSet(filtered)
            except Exception:
                pass

    # Finite integer/natural/whole domain with bounds
    int_domain = domain if domain in ("N", "W", "Z") else None
    if int_domain is None and re.search(r"\b(?:prime|even|odd|integer|natural|whole|factor|divisor|multiple)\b", cond_str, re.I):
        int_domain = "Z" if "integer" in cond_str.lower() else ("W" if "whole" in cond_str.lower() else "N")

    if int_domain is not None:
        # Check polynomial inequality like x^2 < 20 or x^2 <= 16
        ineq_m = re.search(rf"({re.escape(var_name)}\s*\^\s*\d+[^,;<>=≤≥]*)\s*(<|≤|>|≥)\s*(-?\d+)", cond_str.replace("<=", "≤").replace(">=", "≥"))
        if ineq_m:
            lhs_e = parse_expression(ineq_m.group(1).strip())
            op_s = ineq_m.group(2)
            rhs_v = int(ineq_m.group(3))
            if lhs_e is not None and len(lhs_e.free_symbols) == 1:
                sym = next(iter(lhs_e.free_symbols))
                start_k = 1 if int_domain == "N" else (0 if int_domain == "W" else -100)
                end_k = 200
                if op_s in ("<", "≤"):
                    elems = []
                    for k in range(start_k, end_k + 1):
                        val = lhs_e.subs(sym, k)
                        if val.is_number and ((op_s == "<" and val < rhs_v) or (op_s == "≤" and val <= rhs_v)):
                            elems.append(k)
                    return TypedSet(elems)

        bounds = _extract_integer_bounds(var_name, cond_str, int_domain)
        if bounds is not None:
            lo, hi = bounds
            if hi - lo <= 5000:
                candidates = list(range(lo, hi + 1))
                if re.search(r"\bprime\b", cond_str, re.I):
                    candidates = [c for c in candidates if _is_prime(c)]
                if re.search(r"\beven\b", cond_str, re.I):
                    candidates = [c for c in candidates if c % 2 == 0]
                if re.search(r"\bodd\b", cond_str, re.I):
                    candidates = [c for c in candidates if c % 2 != 0]
                mult_m = re.search(r"\bmultiple\s+of\s+(\d+)\b", cond_str, re.I)
                if mult_m:
                    mval = int(mult_m.group(1))
                    if mval > 0:
                        candidates = [c for c in candidates if c % mval == 0]
                fac_m = re.search(r"\b(?:factor|divisor)\s+of\s+(\d+)\b", cond_str, re.I)
                if fac_m:
                    fval = int(fac_m.group(1))
                    candidates = [c for c in candidates if c > 0 and fval % c == 0]
                return TypedSet(candidates)

    if domain in ("N", "W", "Z", "Q", "R"):
        return SymbolicInfiniteSet("PREDICATE", f"{{{inner}}}", predicate_desc=cond_str)
    return None


def _extract_integer_bounds(var_name: str, cond_str: str, int_domain: str) -> Optional[Tuple[int, int]]:
    """Extract inclusive integer [lo, hi] bounds for var_name from inequality clauses."""
    lo: Optional[int] = None
    hi: Optional[int] = None
    if int_domain == "N":
        lo = 1
    elif int_domain == "W":
        lo = 0

    s = cond_str.replace("<=", " ≤ ").replace(">=", " ≥ ")
    # Chained inequality: a < x < b or a ≤ x ≤ b
    chained = re.search(
        rf"(-?\d+)\s*(<|≤)\s*{re.escape(var_name)}\s*(<|≤)\s*(-?\d+)",
        s,
    )
    if chained:
        a = int(chained.group(1))
        op1 = chained.group(2)
        op2 = chained.group(3)
        b = int(chained.group(4))
        c_lo = a if op1 == "≤" else a + 1
        c_hi = b if op2 == "≤" else b - 1
        lo = c_lo if lo is None else max(lo, c_lo)
        hi = c_hi if hi is None else min(hi, c_hi)
    else:
        for m in re.finditer(rf"{re.escape(var_name)}\s*(<|≤|>|≥)\s*(-?\d+)", s):
            op, val = m.group(1), int(m.group(2))
            if op == "<":
                hi = val - 1 if hi is None else min(hi, val - 1)
            elif op == "≤":
                hi = val if hi is None else min(hi, val)
            elif op == ">":
                lo = val + 1 if lo is None else max(lo, val + 1)
            elif op == "≥":
                lo = val if lo is None else max(lo, val)
        for m in re.finditer(rf"(-?\d+)\s*(<|≤|>|≥)\s*{re.escape(var_name)}", s):
            val, op = int(m.group(1)), m.group(2)
            if op == "<":
                lo = val + 1 if lo is None else max(lo, val + 1)
            elif op == "≤":
                lo = val if lo is None else max(lo, val)
            elif op == ">":
                hi = val - 1 if hi is None else min(hi, val - 1)
            elif op == "≥":
                hi = val if hi is None else min(hi, val)

    # Factor/divisor of N implies 1 <= x <= N
    fac_m = re.search(r"\b(?:factor|divisor)\s+of\s+(\d+)\b", s, re.I)
    if fac_m:
        fval = int(fac_m.group(1))
        lo = 1 if lo is None else max(lo, 1)
        hi = fval if hi is None else min(hi, fval)

    if lo is not None and hi is not None:
        return (lo, hi)
    return None


def parse_set_literal(text: str) -> Optional[Union[TypedSet, SymbolicInfiniteSet]]:
    """Parse a roster set, empty set, named infinite set, or set-builder expression."""
    if not text or not isinstance(text, str):
        return None
    s = normalize_set_text(text)
    if s in ("∅", "{}"):
        return EMPTY_SET
    if s in STANDARD_INFINITE_SETS:
        return STANDARD_INFINITE_SETS[s]
    if s.startswith("{") and s.endswith("}"):
        inner = s[1:-1].strip()
        if not inner:
            return EMPTY_SET
        # Ellipsis indicates infinite/pattern set unless bounded
        if "..." in inner or "…" in inner:
            return SymbolicInfiniteSet("PREDICATE", s, predicate_desc="ellipsis_set")
        # Check set-builder (':' or '|' at top level)
        if _has_top_level_builder_sep(inner):
            return _parse_set_builder(inner)
        parts = _split_top_level(inner, ",")
        return TypedSet(_parse_single_element(p) for p in parts)
    return None


def _has_top_level_builder_sep(inner: str) -> bool:
    depth = 0
    for ch in inner:
        if ch in "({[":
            depth += 1
        elif ch in ")}]":
            depth = max(0, depth - 1)
        elif ch in ":|" and depth == 0:
            return True
    return False
