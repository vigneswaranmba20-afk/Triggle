"""TRACE MathGuard V1.3.2 — Reusable Computational Coordinate Geometry Engine.

Uses exact rational arithmetic, SymPy determinants, vector algebra, and symbolic
equation solving. Never relies on string equality or existing solution answers.
"""

from __future__ import annotations

from typing import List, Optional, Tuple

import sympy as sp

Point = Tuple[sp.Expr, sp.Expr]
LineABC = Tuple[sp.Expr, sp.Expr, sp.Expr]  # ax + by + c = 0


def distance(p1: Point, p2: Point) -> sp.Expr:
    return sp.simplify(sp.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2))


def distance_sq(p1: Point, p2: Point) -> sp.Expr:
    return sp.simplify((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)


def midpoint(p1: Point, p2: Point) -> Point:
    return (sp.simplify((p1[0] + p2[0]) / 2), sp.simplify((p1[1] + p2[1]) / 2))


def centroid(p1: Point, p2: Point, p3: Point) -> Point:
    return (
        sp.simplify((p1[0] + p2[0] + p3[0]) / 3),
        sp.simplify((p1[1] + p2[1] + p3[1]) / 3),
    )


def section_internal(p1: Point, p2: Point, m: sp.Expr, n: sp.Expr) -> Point:
    return (
        sp.simplify((m * p2[0] + n * p1[0]) / (m + n)),
        sp.simplify((m * p2[1] + n * p1[1]) / (m + n)),
    )


def section_external(p1: Point, p2: Point, m: sp.Expr, n: sp.Expr) -> Point:
    return (
        sp.simplify((m * p2[0] - n * p1[0]) / (m - n)),
        sp.simplify((m * p2[1] - n * p1[1]) / (m - n)),
    )


def slope(p1: Point, p2: Point) -> Optional[sp.Expr]:
    dx = sp.simplify(p2[0] - p1[0])
    if dx == 0:
        return None
    return sp.simplify((p2[1] - p1[1]) / dx)


def slope_from_angle(deg: sp.Expr) -> Optional[sp.Expr]:
    if sp.simplify(deg - 90) == 0:
        return None
    return sp.simplify(sp.tan(deg * sp.pi / 180))


def angle_from_slope(m: sp.Expr) -> sp.Expr:
    return sp.simplify(sp.atan(m) * 180 / sp.pi)


def signed_polygon_area(vertices: List[Point]) -> sp.Expr:
    n = len(vertices)
    s1 = sum(vertices[i][0] * vertices[(i + 1) % n][1] for i in range(n))
    s2 = sum(vertices[i][1] * vertices[(i + 1) % n][0] for i in range(n))
    return sp.simplify((s1 - s2) / 2)


def polygon_area(vertices: List[Point]) -> sp.Expr:
    return sp.simplify(sp.Abs(signed_polygon_area(vertices)))


def order_polygon_ccw(vertices: List[Point]) -> List[Point]:
    """Sort 2D vertices in counterclockwise order around their centroid."""
    import math

    cx = sum(float(v[0].evalf()) for v in vertices) / len(vertices)
    cy = sum(float(v[1].evalf()) for v in vertices) / len(vertices)
    return sorted(vertices, key=lambda v: math.atan2(float(v[1].evalf()) - cy, float(v[0].evalf()) - cx))


def are_collinear(p1: Point, p2: Point, p3: Point) -> bool:
    return polygon_area([p1, p2, p3]) == 0


def line_from_point_slope(p: Point, m: Optional[sp.Expr]) -> LineABC:
    if m is None:
        return (sp.Integer(1), sp.Integer(0), -p[0])
    # y - y0 = m(x - x0) => m*x - y + (y0 - m*x0) = 0
    return (sp.simplify(m), sp.Integer(-1), sp.simplify(p[1] - m * p[0]))


def line_from_two_points(p1: Point, p2: Point) -> LineABC:
    a = sp.simplify(p2[1] - p1[1])
    b = sp.simplify(p1[0] - p2[0])
    c = sp.simplify(p2[0] * p1[1] - p1[0] * p2[1])
    return (a, b, c)


def line_from_intercepts(a_int: sp.Expr, b_int: sp.Expr) -> LineABC:
    # x/a + y/b = 1 => b*x + a*y - a*b = 0
    return (sp.simplify(b_int), sp.simplify(a_int), sp.simplify(-a_int * b_int))


def line_properties(line: LineABC) -> dict:
    a, b, c = line
    m = None if sp.simplify(b) == 0 else sp.simplify(-a / b)
    x_int = None if sp.simplify(a) == 0 else sp.simplify(-c / a)
    y_int = None if sp.simplify(b) == 0 else sp.simplify(-c / b)
    return {"slope": m, "x_intercept": x_int, "y_intercept": y_int}


def line_intersection(l1: LineABC, l2: LineABC) -> Optional[Point]:
    a1, b1, c1 = l1
    a2, b2, c2 = l2
    det = sp.simplify(a1 * b2 - a2 * b1)
    if det == 0:
        return None
    x = sp.simplify((b1 * c2 - b2 * c1) / det)
    y = sp.simplify((c1 * a2 - c2 * a1) / det)
    return (x, y)


def perpendicular_bisector(p1: Point, p2: Point) -> LineABC:
    mid = midpoint(p1, p2)
    m = slope(p1, p2)
    if m is None:
        return line_from_point_slope(mid, sp.Integer(0))
    if m == 0:
        return line_from_point_slope(mid, None)
    return line_from_point_slope(mid, sp.simplify(-1 / m))


def reflect_point_across_line(p: Point, line: LineABC) -> Point:
    a, b, c = line
    x0, y0 = p
    denom = a**2 + b**2
    factor = -2 * (a * x0 + b * y0 + c) / denom
    return (sp.simplify(x0 + factor * a), sp.simplify(y0 + factor * b))


def are_parallel(m1: Optional[sp.Expr], m2: Optional[sp.Expr]) -> bool:
    if m1 is None and m2 is None:
        return True
    if m1 is None or m2 is None:
        return False
    return sp.simplify(m1 - m2) == 0


def are_perpendicular(m1: Optional[sp.Expr], m2: Optional[sp.Expr]) -> bool:
    if m1 is None and m2 == 0:
        return True
    if m2 is None and m1 == 0:
        return True
    if m1 is None or m2 is None:
        return False
    return sp.simplify(m1 * m2 + 1) == 0


def is_right_triangle(p1: Point, p2: Point, p3: Point) -> bool:
    d12 = distance_sq(p1, p2)
    d23 = distance_sq(p2, p3)
    d31 = distance_sq(p3, p1)
    sides = sorted([d12, d23, d31], key=lambda x: float(x.evalf()))
    return sp.simplify(sides[0] + sides[1] - sides[2]) == 0


def classify_quadrilateral(p1: Point, p2: Point, p3: Point, p4: Point) -> str:
    m12 = slope(p1, p2)
    m23 = slope(p2, p3)
    m34 = slope(p3, p4)
    m41 = slope(p4, p1)
    opp1_par = are_parallel(m12, m34)
    opp2_par = are_parallel(m23, m41)
    if opp1_par and opp2_par:
        d12 = distance_sq(p1, p2)
        d23 = distance_sq(p2, p3)
        right = are_perpendicular(m12, m23)
        eq_sides = sp.simplify(d12 - d23) == 0
        if right and eq_sides:
            return "Square"
        if right:
            return "Rectangle"
        if eq_sides:
            return "Rhombus"
        return "Parallelogram"
    if opp1_par or opp2_par:
        return "Trapezium"
    return "Quadrilateral"


def lines_equivalent(l1: LineABC, l2: LineABC) -> bool:
    a1, b1, c1 = l1
    a2, b2, c2 = l2
    return (
        sp.simplify(a1 * b2 - a2 * b1) == 0
        and sp.simplify(a1 * c2 - a2 * c1) == 0
        and sp.simplify(b1 * c2 - b2 * c1) == 0
    )
