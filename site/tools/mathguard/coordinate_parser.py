"""TRACE MathGuard V1.3.2 — Coordinate Geometry Tuple, Equation, and Answer Parser."""

from __future__ import annotations

import re
from typing import List, Optional, Tuple

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


def parse_line_equation(text: str) -> Optional[LineABC]:
    """Parse a linear equation in x and y into canonical (a, b, c) for ax + by + c = 0."""
    s = str(text or "").strip().rstrip(".")
    if "=" not in s:
        return None
    lhs_s, rhs_s = s.split("=", 1)
    try:
        lhs = parse_expression(lhs_s)
        rhs = parse_expression(rhs_s)
        expr = sp.expand(lhs - rhs)
        x = sp.Symbol("x", real=True)
        y = sp.Symbol("y", real=True)
        # Normalize symbol assumptions
        expr = expr.subs({sym: (x if sym.name == "x" else (y if sym.name == "y" else sym)) for sym in expr.free_symbols})
        a = sp.simplify(expr.coeff(x, 1))
        b = sp.simplify(expr.coeff(y, 1))
        c = sp.simplify(expr.subs({x: 0, y: 0}))
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
    return all(any(points_equal(a, b) for b in l2) for a in l1)


def line_lists_equal(l1: List[LineABC], l2: List[LineABC]) -> bool:
    if len(l1) != len(l2):
        return False
    return all(any(lines_equivalent(a, b) for b in l2) for a in l1)
