"""TRACE MathGuard V1.3.3 — Algebra Expression, Equation, Tuple, Matrix, and Nature Parser."""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple

import sympy as sp

from .parser import parse_expression
from .symbolic import expressions_equivalent

_SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")


def _normalize_algebra_text(text: str) -> str:
    s = (text or "").strip()
    # Replace bracket grouping [ ... ] with ( ... )
    s = s.replace("[", "(").replace("]", ")")
    # Convert Greek alpha/beta (including adjacent αβ) to single-letter u, v
    s = s.replace("αβ", "(u*v)").replace("α", "u").replace("β", "v")
    # Convert unicode superscripts like 2³ or y¹² to ^3, ^12
    s = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(_SUP_MAP), s)
    # Remove currency and common trailing units
    s = s.replace("₹", "")
    s = re.sub(r"\b(years?|yrs?|hours?|hrs?|minutes?|mins?|kgs?|km/hr|sq\.?\s*units?|pipes?|seconds?|m|cm)\b", "", s, flags=re.I)
    s = s.strip().rstrip(".")
    return s


def parse_algebra_expr(text: str) -> sp.Expr:
    s = _normalize_algebra_text(text)
    if "=" in s and s.count("=") == 1:
        # Handle 'y = 8' or 'x = 15' or '24'
        lhs, rhs = s.split("=", 1)
        if re.fullmatch(r"\s*[a-zA-Z]\s*", lhs):
            s = rhs.strip()
    return parse_expression(s)


def parse_abs_expr(text: str) -> sp.Expr:
    """Parse square-root expressions containing |...| absolute value bars."""
    s = _normalize_algebra_text(text)
    # Replace |...| with (...)
    s = re.sub(r"\|([^|]+)\|", r"(\1)", s)
    return parse_expression(s)


def parse_quadratic_equation(text: str, var_name: str = "x") -> Optional[Tuple[sp.Expr, sp.Expr, sp.Expr]]:
    """Parse ax^2 + bx + c = 0 and strictly verify degree == 2 in var_name."""
    s = _normalize_algebra_text(text)
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
    a1, b1, c1 = q1
    a2, b2, c2 = q2
    return (
        expressions_equivalent(a1 * b2, a2 * b1)
        and expressions_equivalent(a1 * c2, a2 * c1)
        and expressions_equivalent(b1 * c2, b2 * c1)
    )


def parse_ordered_tuple(text: str) -> Optional[List[sp.Expr]]:
    s = _normalize_algebra_text(text)
    # Take the rightmost parenthesized tuple (e.g. "(x, y, z) = (2, -1, 4)")
    matches = re.findall(r"\(([^()]+)\)", s)
    if not matches:
        return None
    inner = matches[-1]
    parts = [p.strip() for p in inner.split(",") if p.strip()]
    try:
        return [parse_expression(p) for p in parts]
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
        grid = [[parse_expression(c.strip()) for c in r.split("&")] for r in rows_raw]
        return sp.Matrix(grid)
    if s.startswith("[[") and s.endswith("]]"):
        try:
            inner = s[2:-2]
            rows_raw = re.split(r"\]\s*,\s*\[", inner)
            grid = [[parse_expression(c.strip()) for c in r.split(",")] for r in rows_raw]
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
        if re.search(r"\bno\s+solution\b|\binconsistent\b", low):
            return "no_solution"
        if re.search(r"\binfinitely\s+many\b|\binfinite\s+solutions?\b", low):
            return "infinite"
        if re.search(r"\bunique\s+solution\b", low):
            return "unique"
        return None
    if domain == "root_nature":
        if re.search(r"\bnot\s+real\b|\bno\s+real\s+roots?\b|\bimaginary\b", low):
            return "not_real"
        if re.search(r"\breal\s+and\s+unequal\b|\breal\s+and\s+distinct\b", low):
            return "real_unequal"
        if re.search(r"\breal\s+and\s+equal\b", low):
            return "real_equal"
        return None
    if domain == "variation":
        if re.search(r"\bnot\s+direct\b|\binverse\s+variation\b", low):
            return "inverse"
        if re.search(r"\bdirect\s+variation\b", low):
            return "direct"
        return None
    return None
