"""TRACE MathGuard V1.3.3a — Hardened Algebra Expression, Unit, Tuple, Matrix, and Nature Parser."""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple

import sympy as sp

from .parser import parse_expression

_SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")

_UNIT_PATTERNS: List[Tuple[str, str, sp.Rational]] = [
    (r"km\s*/\s*hr|kmph", "speed", sp.Integer(1)),
    (r"m\s*/\s*s", "speed", sp.Rational(18, 5)),
    (r"sq\.?\s*units?|sq\.?\s*m|m²|m\^2", "area", sp.Integer(1)),
    (r"cu\.?\s*units?|m³|cm³|m\^3", "volume", sp.Integer(1)),
    (r"hours?|hrs?", "time_hr", sp.Integer(1)),
    (r"minutes?|mins?", "time_min", sp.Integer(1)),
    (r"seconds?|secs?", "time_sec", sp.Integer(1)),
    (r"years?|yrs?", "time_yr", sp.Integer(1)),
    (r"kgs?", "mass", sp.Integer(1)),
    (r"feet|ft", "length_ft", sp.Integer(1)),
    (r"km", "length_km", sp.Integer(1)),
    (r"cm", "length_cm", sp.Integer(1)),
    # Match 'm' as length unit ONLY after a digit/space, never standalone algebraic variable 'm'
    (r"(?<=\d\s)m\b|(?<=\d)m\b", "length", sp.Integer(1)),
    (r"pipes?|teams?|bees?", "count", sp.Integer(1)),
]


def extract_unit_and_dimension(text: str) -> Tuple[str, Optional[str], sp.Rational]:
    """Extract measurement unit and dimension before expression normalization."""
    s = (text or "").strip()
    if "₹" in s:
        s = s.replace("₹", "").strip()
        return s, "currency", sp.Integer(1)
    for pat, dim, factor in _UNIT_PATTERNS:
        m = re.search(rf"(?:^|\s|\d)({pat})\s*\.?$", s, flags=re.I)
        if m:
            unit_str = m.group(1)
            cleaned = (s[: m.start(1)] + s[m.end(1) :]).strip().rstrip(".")
            return cleaned, dim, factor
    return s, None, sp.Integer(1)


def _normalize_algebra_text(text: str, strip_units: bool = False) -> str:
    s = (text or "").strip()
    if strip_units:
        s, _, _ = extract_unit_and_dimension(s)
    # Replace bracket grouping [ ... ] with ( ... )
    s = s.replace("[", "(").replace("]", ")")
    # Convert Greek alpha/beta (including adjacent αβ) to single-letter u, v
    s = s.replace("αβ", "(u*v)").replace("α", "u").replace("β", "v")
    # Convert unicode superscripts like 2³ or y¹² to ^3, ^12
    s = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(_SUP_MAP), s)
    s = s.strip().rstrip(".")
    return s


def parse_algebra_expr(text: str, strip_units: bool = True) -> sp.Expr:
    s = _normalize_algebra_text(text, strip_units=strip_units)
    if "=" in s and s.count("=") == 1:
        lhs, rhs = s.split("=", 1)
        if re.fullmatch(r"\s*[a-zA-Z]\s*", lhs):
            s = rhs.strip()
    return parse_expression(s)


def parse_abs_components(text: str) -> Optional[Tuple[sp.Expr, sp.Expr, bool]]:
    """Parse '<outer>|<inner>' preserving outer sign and inner expression separately."""
    s = _normalize_algebra_text(text, strip_units=False)
    m = re.fullmatch(r"\s*(.*?)\|([^|]+)\|\s*(.*?)\s*", s)
    if not m:
        try:
            return (sp.Integer(1), parse_expression(s), False)
        except Exception:
            return None
    prefix, inner_s, suffix = m.group(1).strip(), m.group(2).strip(), m.group(3).strip()
    try:
        inner = parse_expression(inner_s)
        if not prefix:
            outer = sp.Integer(1)
        elif prefix in ("-", "−"):
            outer = sp.Integer(-1)
        elif prefix == "+":
            outer = sp.Integer(1)
        else:
            outer = parse_expression(prefix)
        if suffix:
            outer = outer * parse_expression(suffix)
        return (sp.simplify(outer), inner, True)
    except Exception:
        return None


def parse_quadratic_equation(text: str, var_name: str = "x") -> Optional[Tuple[sp.Expr, sp.Expr, sp.Expr]]:
    """Parse ax^2 + bx + c = 0 and strictly verify degree == 2 in var_name."""
    s = _normalize_algebra_text(text, strip_units=False)
    if s.count("=") != 1:
        return None
    lhs_s, rhs_s = s.split("=", 1)
    if not lhs_s.strip() or not rhs_s.strip():
        return None
    try:
        lhs = parse_expression(lhs_s)
        rhs = parse_expression(rhs_s)
        expr = sp.together(lhs - rhs)
        x = sp.Symbol(var_name, real=True)
        for sym in list(expr.free_symbols):
            if sym.name == var_name:
                expr = expr.subs(sym, x)
        if sp.denom(expr).has(x):
            return None
        num = sp.expand(sp.numer(expr))
        poly = sp.Poly(num, x)
        if poly.degree() != 2:
            return None
        a, b, c = poly.all_coeffs()
        if sp.simplify(a) == 0:
            return None
        return (sp.simplify(a), sp.simplify(b), sp.simplify(c))
    except Exception:
        return None


def quad_equations_equivalent(q1: Tuple[sp.Expr, sp.Expr, sp.Expr], q2: Tuple[sp.Expr, sp.Expr, sp.Expr]) -> bool:
    from .symbolic import expressions_equivalent
    a1, b1, c1 = q1
    a2, b2, c2 = q2
    return (
        expressions_equivalent(a1 * b2, a2 * b1)
        and expressions_equivalent(a1 * c2, a2 * c1)
        and expressions_equivalent(b1 * c2, b2 * c1)
    )


def parse_ordered_tuple(text: str) -> Optional[Tuple[Optional[List[str]], List[sp.Expr]]]:
    """Parse '(x, y, z) = (2, -1, 4)' or '(2, -1, 4)', returning (optional_lhs_vars, values)."""
    s = _normalize_algebra_text(text, strip_units=False)
    lhs_vars: Optional[List[str]] = None
    if "=" in s:
        if s.count("=") != 1:
            return None
        lhs_s, rhs_s = s.split("=", 1)
        m_lhs = re.fullmatch(r"\s*\(([^()]+)\)\s*", lhs_s)
        if not m_lhs:
            return None
        lhs_vars = [v.strip() for v in m_lhs.group(1).split(",") if v.strip()]
        s = rhs_s.strip()
    m_rhs = re.fullmatch(r"\s*\(([^()]+)\)\s*", s)
    if not m_rhs:
        return None
    parts = [p.strip() for p in m_rhs.group(1).split(",") if p.strip()]
    try:
        vals = [parse_expression(p) for p in parts]
        return (lhs_vars, vals)
    except Exception:
        return None


def parse_matrix_order(text: str) -> Optional[Tuple[int, int]]:
    m = re.search(r"(\d+)\s*[×xX*]\s*(\d+)", text or "")
    if not m:
        return None
    return (int(m.group(1)), int(m.group(2)))


def parse_matrix(text: str) -> Optional[sp.Matrix]:
    s = (text or "").strip()
    m_env = re.search(r"\\begin\{[pb]?matrix\}(.*?)\\end\{[pb]?matrix\}", s, flags=re.S)
    if m_env:
        rows_raw = [r.strip() for r in m_env.group(1).split(r"\\") if r.strip()]
        if not rows_raw:
            return None
        grid = [[parse_expression(c.strip()) for c in r.split("&")] for r in rows_raw]
        if len({len(row) for row in grid}) != 1 or not grid[0]:
            return None
        return sp.Matrix(grid)
    if s.startswith("[[") and s.endswith("]]"):
        try:
            inner = s[2:-2]
            rows_raw = re.split(r"\]\s*,\s*\[", inner)
            if not rows_raw:
                return None
            grid = [[parse_expression(c.strip()) for c in r.split(",")] for r in rows_raw]
            if len({len(row) for row in grid}) != 1 or not grid[0]:
                return None
            return sp.Matrix(grid)
        except Exception:
            return None
    return None


def parse_named_dict(text: str) -> Optional[Dict[str, str]]:
    segs = [s.strip() for s in re.split(r",|;|\band\b", text or "") if s.strip()]
    out: Dict[str, str] = {}
    for seg in segs:
        m = re.match(r"^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(.+)$", seg)
        if not m:
            return None
        k = m.group(1).strip()
        if k in out:
            return None
        out[k] = m.group(2).strip()
    return out if out else None


def classify_algebra_nature(text: str, domain: str) -> Optional[str]:
    low = re.sub(r"\s+", " ", (text or "").lower()).strip()
    if domain == "linear_system":
        hits = set()
        if re.search(r"\bno\s+solution\b|\binconsistent\b", low):
            hits.add("no_solution")
        if re.search(r"\binfinitely\s+many\b|\binfinite\s+solutions?\b", low):
            hits.add("infinite")
        if re.search(r"\bunique\s+solution\b", low):
            hits.add("unique")
        return next(iter(hits)) if len(hits) == 1 else None
    if domain == "root_nature":
        hits = set()
        if re.search(r"\bnot\s+real\b|\bno\s+real\s+roots?\b|\bimaginary\b", low):
            hits.add("not_real")
        if re.search(r"\breal\s+and\s+unequal\b|\breal\s+and\s+distinct\b", low):
            hits.add("real_unequal")
        if re.search(r"\breal\s+and\s+equal\b", low):
            hits.add("real_equal")
        return next(iter(hits)) if len(hits) == 1 else None
    if domain == "variation":
        hits = set()
        if re.search(r"\bnot\s+direct\b|\binverse\s+variation\b", low):
            hits.add("inverse")
        elif re.search(r"\bdirect\s+variation\b", low):
            hits.add("direct")
        return next(iter(hits)) if len(hits) == 1 else None
    return None
