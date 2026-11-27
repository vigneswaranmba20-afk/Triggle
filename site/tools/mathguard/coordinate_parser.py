"""TRACE MathGuard V1.3.2a — Hardened Coordinate Geometry Tuple, Equation, and Answer Parser."""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Set

import sympy as sp

from .coordinate_geometry import LineABC, Point, lines_equivalent
from .parser import parse_expression
from .symbolic import expressions_equivalent


def parse_point_tuple(text: str) -> Optional[Point]:
    """Parse a single '(x, y)' coordinate pair with fractions, radicals, or decimals."""
    m = re.search(r"\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*\)", text)
    if not m:
        return None
    try:
        return (parse_expression(m.group(1)), parse_expression(m.group(2)))
    except Exception:
        return None


def parse_all_points(text: str) -> List[Point]:
    """Extract all '(x, y)' coordinate pairs in order."""
    pts: List[Point] = []
    for m in re.finditer(r"\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*\)", text):
        try:
            pts.append((parse_expression(m.group(1)), parse_expression(m.group(2))))
        except Exception:
            continue
    return pts


def parse_labeled_points(text: str) -> Dict[str, Point]:
    """Extract labeled points like 'A(7, 7), B(15, 7), C(12, 1)'."""
    out: Dict[str, Point] = {}
    for m in re.finditer(r"\b([A-Z][A-Za-z0-9_']*)\s*\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*\)", text):
        label = m.group(1)
        try:
            out[label] = (parse_expression(m.group(2)), parse_expression(m.group(3)))
        except Exception:
            continue
    return out


def parse_line_equation(text: str, allowed_params: Optional[Set[str]] = None) -> Optional[LineABC]:
    """Parse a strictly linear equation in x and y into canonical (a, b, c) for ax + by + c = 0.

    Rejects:
    - Missing or multiple '=' signs
    - Nonlinear terms (x^2, y^2, x*y, sqrt(x), sin(x), etc.)
    - Variable denominators (e.g. 1/x + y = 1)
    - Unexpected variables outside {x, y} | allowed_params
    - Degenerate equations (0 = 0, 5 = 0)
    """
    s = str(text or "").strip().rstrip(".")
    if s.count("=") != 1:
        return None
    lhs_s, rhs_s = s.split("=", 1)
    if not lhs_s.strip() or not rhs_s.strip():
        return None
    try:
        lhs = parse_expression(lhs_s)
        rhs = parse_expression(rhs_s)
        expr = sp.together(lhs - rhs)
        x = sp.Symbol("x", real=True)
        y = sp.Symbol("y", real=True)
        # Normalize symbol assumptions for x, y
        sub_map = {}
        allowed = {"x", "y"} | set(allowed_params or ())
        for sym in expr.free_symbols:
            if sym.name not in allowed:
                return None
            if sym.name == "x":
                sub_map[sym] = x
            elif sym.name == "y":
                sub_map[sym] = y
        expr = expr.subs(sub_map)

        # Reject variable denominators (e.g., 1/x + y = 1)
        den = sp.denom(expr)
        if den.has(x, y):
            return None

        num = sp.expand(sp.numer(expr))
        # Must be strictly degree <= 1 in (x, y) with no xy cross term or transcendental functions
        a = sp.simplify(num.coeff(x, 1))
        b = sp.simplify(num.coeff(y, 1))
        c = sp.simplify(num.subs({x: 0, y: 0}))
        if a.has(x, y) or b.has(x, y) or c.has(x, y):
            return None
        if sp.expand(num - (a * x + b * y + c)) != 0:
            return None
        if a == 0 and b == 0:
            return None
        return (a, b, c)
    except Exception:
        return None


def points_equal(p1: Point, p2: Point) -> bool:
    return expressions_equivalent(p1[0], p2[0]) and expressions_equivalent(p1[1], p2[1])


def point_lists_equal(l1: List[Point], l2: List[Point], ordered: bool = True) -> bool:
    if len(l1) != len(l2):
        return False
    if ordered:
        return all(points_equal(a, b) for a, b in zip(l1, l2))
    used = [False] * len(l2)
    for a in l1:
        matched = False
        for j, b in enumerate(l2):
            if not used[j] and points_equal(a, b):
                used[j] = True
                matched = True
                break
        if not matched:
            return False
    return True


def line_lists_equal(l1: List[LineABC], l2: List[LineABC]) -> bool:
    if len(l1) != len(l2):
        return False
    used = [False] * len(l2)
    for a in l1:
        matched = False
        for j, b in enumerate(l2):
            if not used[j] and lines_equivalent(a, b):
                used[j] = True
                matched = True
                break
        if not matched:
            return False
    return True
