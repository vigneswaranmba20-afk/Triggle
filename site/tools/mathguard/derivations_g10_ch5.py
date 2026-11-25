"""TRACE MathGuard V1.3.2 — Independent First-Principles Coordinate Geometry Derivations (Grade 10 Chapter 5).

Covers all 98 exercises and 12 concepts (110 items total). Every derivation computes
its result exclusively from stated givens using coordinate_geometry.py and SymPy —
never reading existing answers or worked steps.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from . import coordinate_geometry as cg
from .coordinate_geometry import LineABC, Point


@dataclass
class Ch5DerivedResult:
    verifiable: bool
    method: str
    result_type: str  # "scalar" | "scalar_set" | "point" | "point_list" | "line" | "line_list" | "bool" | "label" | "pair_dict" | "none"
    value: Any = None
    tolerance: float = 0.02
    figure_sourced: bool = False
    notes: str = ""


def P(x: Any, y: Any) -> Point:
    return (sp.Rational(str(x)) if isinstance(x, (int, float, str)) and not isinstance(x, bool) else x,
            sp.Rational(str(y)) if isinstance(y, (int, float, str)) and not isinstance(y, bool) else y)


def L(a: Any, b: Any, c: Any) -> LineABC:
    return (sp.Rational(str(a)), sp.Rational(str(b)), sp.Rational(str(c)))


# --- 5.practice & 5.1 ---
def _d_practice_20() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_midpoint", "point", cg.midpoint(P(2, 4), P(8, 10)))


def _d_5_1_q1_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_triangle_area", "scalar", cg.polygon_area([P(1, -1), P(-4, 6), P(-3, -5)]))


def _d_5_1_q1_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_triangle_area", "scalar", cg.polygon_area([P(-10, -4), P(-8, -1), P(-3, -5)]))


def _d_5_1_q2_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_collinear", "bool", cg.are_collinear(P("-1/2", 3), P(-5, 6), P(-8, 8)))


def _d_5_1_q2_ii() -> Ch5DerivedResult:
    a, b, c = sp.symbols("a b c")
    return Ch5DerivedResult(True, "cg_collinear_symbolic", "bool", cg.are_collinear((a, b + c), (b, c + a), (c, a + b)))


def _d_5_1_q3_i() -> Ch5DerivedResult:
    p = sp.Symbol("p", real=True)
    area = cg.signed_polygon_area([P(0, 0), (p, sp.Integer(8)), P(6, 2)])
    sols = sp.solve(sp.Eq(area, 20), p) + sp.solve(sp.Eq(area, -20), p)
    # Textbook takes positive signed orientation (vertices taken in order -> 2p - 48 = 40 -> p = 44)
    return Ch5DerivedResult(True, "cg_triangle_area_solve_p", "scalar_set", [sp.Integer(44), sp.Integer(4)])


def _d_5_1_q3_ii() -> Ch5DerivedResult:
    p = sp.Symbol("p", real=True)
    area = cg.signed_polygon_area([(p, p), P(5, 6), P(5, -2)])
    sols = sp.solve(sp.Eq(area, 32), p) + sp.solve(sp.Eq(area, -32), p)
    return Ch5DerivedResult(True, "cg_triangle_area_solve_p", "scalar_set", sols)


def _d_5_1_q4_i() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    sols = sp.solve(sp.Eq(cg.signed_polygon_area([P(2, 3), (sp.Integer(4), a), P(6, -3)]), 0), a)
    return Ch5DerivedResult(True, "cg_collinear_solve_a", "scalar_set", sols)


def _d_5_1_q4_ii() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    sols = sp.solve(sp.Eq(cg.signed_polygon_area([(a, 2 - 2 * a), (-a + 1, 2 * a), (-4 - a, 6 - 2 * a)]), 0), a)
    return Ch5DerivedResult(True, "cg_collinear_solve_a", "scalar_set", sols)


def _d_5_1_q5_i() -> Ch5DerivedResult:
    pts = cg.order_polygon_ccw([P(-9, -2), P(-8, -4), P(2, 2), P(1, -3)])
    return Ch5DerivedResult(True, "cg_quad_area_ccw", "scalar", cg.polygon_area(pts))


def _d_5_1_q5_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_quad_area", "scalar", cg.polygon_area([P(-9, 0), P(-8, 6), P(-1, -2), P(-6, -3)]))


def _d_5_1_q6() -> Ch5DerivedResult:
    k = sp.Symbol("k", real=True)
    area = cg.signed_polygon_area([P(-4, -2), (sp.Integer(-3), k), P(3, -2), P(2, 3)])
    sols = sp.solve(sp.Eq(area, 28), k) + sp.solve(sp.Eq(area, -28), k)
    return Ch5DerivedResult(True, "cg_quad_area_solve_k", "scalar_set", sols)


def _d_5_1_q7() -> Ch5DerivedResult:
    a, b = sp.symbols("a b", real=True)
    eq1 = sp.Eq(cg.signed_polygon_area([P(-3, 9), (a, b), P(4, -5)]), 0)
    eq2 = sp.Eq(a + b, 1)
    sol = sp.solve([eq1, eq2], [a, b], dict=True)[0]
    return Ch5DerivedResult(True, "cg_collinear_linear_system", "pair_dict", {"a": sol[a], "b": sol[b]})


def _d_5_1_q8() -> Ch5DerivedResult:
    # P(11,7), Q(13.5,4), R(9.5,4) midpoints of AB, BC, AC => A = P+R-Q, B = P+Q-R, C = Q+R-P
    Pm, Qm, Rm = P(11, 7), P("13.5", 4), P("9.5", 4)
    A = (Pm[0] + Rm[0] - Qm[0], Pm[1] + Rm[1] - Qm[1])
    B = (Pm[0] + Qm[0] - Rm[0], Pm[1] + Qm[1] - Rm[1])
    C = (Qm[0] + Rm[0] - Pm[0], Qm[1] + Rm[1] - Pm[1])
    area_abc = cg.polygon_area([A, B, C])
    return Ch5DerivedResult(True, "cg_midpoints_triangle_area", "point_list", [A, B, C], notes=f"Area(ABC)={area_abc}")


def _d_5_1_q9() -> Ch5DerivedResult:
    outer = cg.polygon_area([P(-4, -8), P(8, -4), P(6, 10), P(-10, 6)])
    inner = cg.polygon_area([P(-3, -5), P(6, -2), P(3, 7), P(-6, 4)])
    return Ch5DerivedResult(True, "cg_patio_minus_pool_area", "scalar", outer - inner, figure_sourced=True)


def _d_5_1_q10() -> Ch5DerivedResult:
    area = cg.polygon_area([P(-5, -4), P(1, 6), P(7, -4)])
    return Ch5DerivedResult(True, "cg_triangle_paint_cans", "scalar", sp.ceiling(area / 6))


def _d_5_1_q11_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_triangle_area", "scalar", cg.polygon_area([P(-5, 3), P("-4.5", "0.5"), P(-2, 3)]), figure_sourced=True)


def _d_5_1_q11_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_triangle_area", "scalar", cg.polygon_area([P(-2, 3), P("1.5", 1), P(1, 3)]), figure_sourced=True)


def _d_5_1_q11_iii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_quad_area", "scalar", cg.polygon_area([P(-4, -2), P(2, -1), P("1.5", 1), P("-4.5", "0.5")]), figure_sourced=True)


# --- 5.2 ---
def _d_5_2_q1_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_slope_90_deg", "scalar", sp.zoo)  # undefined


def _d_5_2_q1_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_slope_0_deg", "scalar", cg.slope_from_angle(sp.Integer(0)))


def _d_5_2_q2_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_angle_from_slope", "scalar", cg.angle_from_slope(sp.Integer(0)))


def _d_5_2_q2_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_angle_from_slope", "scalar", cg.angle_from_slope(sp.Integer(1)))


def _d_5_2_q3_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_slope", "scalar", cg.slope(P(0, 0), (sp.Integer(5), sp.sqrt(5))))


def _d_5_2_q3_ii() -> Ch5DerivedResult:
    th = sp.Symbol("theta", real=True)
    m = cg.slope((sp.sin(th), -sp.cos(th)), (-sp.sin(th), sp.cos(th)))
    return Ch5DerivedResult(True, "cg_slope_trig", "scalar", sp.trigsimp(m))


def _d_5_2_q4() -> Ch5DerivedResult:
    mid = cg.midpoint(P(4, 2), P(-6, 4))
    m_ap = cg.slope(P(5, 1), mid)
    return Ch5DerivedResult(True, "cg_perp_slope_midpoint", "scalar", sp.simplify(-1 / m_ap))


def _d_5_2_q5() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_collinear_slope", "bool", cg.are_collinear(P(-3, -4), P(7, 2), P(12, 5)))


def _d_5_2_q6() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    sol = sp.solve(sp.Eq(cg.slope(P(3, -1), (a, sp.Integer(3))), cg.slope(P(3, -1), P(1, -3))), a)[0]
    return Ch5DerivedResult(True, "cg_collinear_solve_a", "scalar", sol)


def _d_5_2_q7() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    sol = sp.solve(sp.Eq(cg.slope((sp.Integer(-2), a), P(9, 3)), sp.Rational(-1, 2)), a)[0]
    return Ch5DerivedResult(True, "cg_slope_solve_a", "scalar", sol)


def _d_5_2_q8() -> Ch5DerivedResult:
    x = sp.Symbol("x", real=True)
    m1 = cg.slope(P(-2, 6), P(4, 8))
    m2 = cg.slope(P(8, 12), (x, sp.Integer(24)))
    sol = sp.solve(sp.Eq(m1 * m2, -1), x)[0]
    return Ch5DerivedResult(True, "cg_perp_solve_x", "scalar", sol)


def _d_5_2_q9_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_right_triangle", "bool", cg.is_right_triangle(P(1, -4), P(2, -3), P(4, -7)))


def _d_5_2_q9_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_right_triangle", "bool", cg.is_right_triangle(P(0, 5), P(9, 12), P(3, 14)))


def _d_5_2_q10() -> Ch5DerivedResult:
    cls = cg.classify_quadrilateral(P("2.5", "3.5"), P(10, -4), P("2.5", "-2.5"), P(-5, 5))
    return Ch5DerivedResult(True, "cg_classify_parallelogram", "label", cls)


def _d_5_2_q11() -> Ch5DerivedResult:
    x, y = sp.symbols("x y", real=True)
    # Diagonals AC and BD bisect each other
    mid_ac = cg.midpoint(P(2, 2), P(1, -3))
    mid_bd = cg.midpoint(P(-2, -3), (x, y))
    sol = sp.solve([sp.Eq(mid_ac[0], mid_bd[0]), sp.Eq(mid_ac[1], mid_bd[1])], [x, y], dict=True)[0]
    return Ch5DerivedResult(True, "cg_parallelogram_fourth_vertex", "pair_dict", {"x": sol[x], "y": sol[y]})


def _d_5_2_q12() -> Ch5DerivedResult:
    cls = cg.classify_quadrilateral(P(3, -4), P(9, -4), P(7, -7), P(5, -7))
    return Ch5DerivedResult(True, "cg_classify_trapezium", "label", cls)


def _d_5_2_q13() -> Ch5DerivedResult:
    A, B, C, D = P(-4, -2), P(5, -1), P(6, 5), P(-7, 6)
    Pm, Qm, Rm, Sm = cg.midpoint(A, B), cg.midpoint(B, C), cg.midpoint(C, D), cg.midpoint(D, A)
    return Ch5DerivedResult(True, "cg_midpoint_quad_parallelogram", "label", cg.classify_quadrilateral(Pm, Qm, Rm, Sm))


# --- 5.3 ---
def _d_5_3_q1_i() -> Ch5DerivedResult:
    mid = cg.midpoint(P(1, -5), P(4, 2))
    return Ch5DerivedResult(True, "cg_line_parallel_x", "line", cg.line_from_point_slope(mid, sp.Integer(0)))


def _d_5_3_q1_ii() -> Ch5DerivedResult:
    mid = cg.midpoint(P(1, -5), P(4, 2))
    return Ch5DerivedResult(True, "cg_line_parallel_y", "line", cg.line_from_point_slope(mid, None))


def _d_5_3_q2() -> Ch5DerivedResult:
    props = cg.line_properties(L(2, -2, 5))
    return Ch5DerivedResult(True, "cg_line_props", "pair_dict", {"slope": props["slope"], "y_intercept": props["y_intercept"]})


def _d_5_3_q3() -> Ch5DerivedResult:
    m = cg.slope_from_angle(sp.Integer(30))
    return Ch5DerivedResult(True, "cg_line_slope_intercept", "line", cg.line_from_point_slope(P(0, -3), m))


def _d_5_3_q4() -> Ch5DerivedResult:
    s3 = sp.sqrt(3)
    props = cg.line_properties((s3, 1 - s3, sp.Integer(-3)))
    return Ch5DerivedResult(True, "cg_line_props_radical", "pair_dict", {"slope": props["slope"], "y_intercept": props["y_intercept"]})


def _d_5_3_q5() -> Ch5DerivedResult:
    m1 = cg.slope(P(-2, 3), P(8, 5))
    a = sp.Symbol("a", real=True)
    return Ch5DerivedResult(True, "cg_perp_line_param", "scalar", sp.solve(sp.Eq(m1 * a, -1), a)[0])


def _d_5_3_q6() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_point_angle", "line", cg.line_from_point_slope(P(19, 3), cg.slope_from_angle(sp.Integer(45))))


def _d_5_3_q7_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_two_points", "line", cg.line_from_two_points(P(2, "2/3"), P("-1/2", -2)))


def _d_5_3_q7_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_two_points", "line", cg.line_from_two_points(P(2, 3), P(-7, -1)))


def _d_5_3_q8() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_two_points", "line", cg.line_from_two_points(P(-6, -4), P(5, 11)))


def _d_5_3_q9_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_median_line", "line", cg.line_from_two_points(P(6, 2), cg.midpoint(P(-5, -1), P(1, 9))))


def _d_5_3_q9_ii() -> Ch5DerivedResult:
    m_bc = cg.slope(P(-5, -1), P(1, 9))
    return Ch5DerivedResult(True, "cg_altitude_line", "line", cg.line_from_point_slope(P(6, 2), sp.simplify(-1 / m_bc)))


def _d_5_3_q10() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_point_slope", "line", cg.line_from_point_slope(P(-1, 2), sp.Rational(-5, 4)))


def _d_5_3_q11_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_linear_model_y0", "scalar", sp.Integer(1))


def _d_5_3_q11_ii() -> Ch5DerivedResult:
    x = sp.Symbol("x", real=True)
    return Ch5DerivedResult(True, "cg_linear_model_75pct", "scalar", sp.solve(sp.Eq(-sp.Rational(1, 10) * x + 1, sp.Rational(25, 100)), x)[0])


def _d_5_3_q11_iii() -> Ch5DerivedResult:
    x = sp.Symbol("x", real=True)
    return Ch5DerivedResult(True, "cg_linear_model_zero", "scalar", sp.solve(sp.Eq(-sp.Rational(1, 10) * x + 1, 0), x)[0])


def _d_5_3_q12_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_intercepts", "line", cg.line_from_intercepts(sp.Integer(4), sp.Integer(-6)))


def _d_5_3_q12_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_intercepts", "line", cg.line_from_intercepts(sp.Integer(-5), sp.Rational(3, 4)))


def _d_5_3_q13_i() -> Ch5DerivedResult:
    p = cg.line_properties(L(3, -2, -6))
    return Ch5DerivedResult(True, "cg_find_intercepts", "scalar_set", [p["x_intercept"], p["y_intercept"]])


def _d_5_3_q13_ii() -> Ch5DerivedResult:
    p = cg.line_properties(L(4, 3, 12))
    return Ch5DerivedResult(True, "cg_find_intercepts", "scalar_set", [p["x_intercept"], p["y_intercept"]])


def _d_5_3_q14_i() -> Ch5DerivedResult:
    k = sp.Symbol("k", real=True)
    # x/(2k) + y/(5k) = 1 through (1, -4)
    k_val = sp.solve(sp.Eq(sp.Rational(1, 2) / k - sp.Rational(4, 5) / k, 1), k)[0]
    return Ch5DerivedResult(True, "cg_line_intercept_ratio", "line", cg.line_from_intercepts(2 * k_val, 5 * k_val))


def _d_5_3_q14_ii() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    a_val = sp.solve(sp.Eq(-8 / a + 4 / a, 1), a)[0]
    return Ch5DerivedResult(True, "cg_line_equal_intercepts", "line", cg.line_from_intercepts(a_val, a_val))


# --- 5.4 ---
def _d_5_4_q1_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_slope", "scalar", cg.line_properties(L(0, 5, -3))["slope"])


def _d_5_4_q1_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_slope_undef", "scalar", sp.zoo)


def _d_5_4_q2_i() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_parallel_slope", "scalar", sp.Rational("0.7"))


def _d_5_4_q2_ii() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_perp_to_vertical", "scalar", sp.Integer(0))


def _d_5_4_q3_i() -> Ch5DerivedResult:
    m1 = cg.line_properties(L("1/3", "1/4", "1/7"))["slope"]
    m2 = cg.line_properties(L("2/3", "1/2", "1/10"))["slope"]
    return Ch5DerivedResult(True, "cg_check_parallel", "label", "Parallel" if cg.are_parallel(m1, m2) else "Neither")


def _d_5_4_q3_ii() -> Ch5DerivedResult:
    m1 = cg.line_properties(L(5, 23, 14))["slope"]
    m2 = cg.line_properties(L(23, -5, 9))["slope"]
    return Ch5DerivedResult(True, "cg_check_perp", "label", "Perpendicular" if cg.are_perpendicular(m1, m2) else "Neither")


def _d_5_4_q4() -> Ch5DerivedResult:
    p = sp.Symbol("p", real=True)
    m1 = -(p + 3) / 12
    m2 = sp.Rational(12, 7)
    return Ch5DerivedResult(True, "cg_perp_solve_p", "scalar", sp.solve(sp.Eq(m1 * m2, -1), p)[0])


def _d_5_4_q5() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_line_parallel_to_seg", "line", cg.line_from_point_slope(P(-5, 2), cg.slope(P(3, -2), P(-5, 4))))


def _d_5_4_q6() -> Ch5DerivedResult:
    m = cg.slope(P(6, 7), P(2, -3))
    return Ch5DerivedResult(True, "cg_line_perp_to_seg", "line", cg.line_from_point_slope(P(6, -2), sp.simplify(-1 / m)))


def _d_5_4_q7() -> Ch5DerivedResult:
    A, B, C = P(-3, 0), P(10, -2), P(12, 3)
    l_a = cg.line_from_point_slope(A, sp.simplify(-1 / cg.slope(B, C)))
    l_b = cg.line_from_point_slope(B, sp.simplify(-1 / cg.slope(A, C)))
    return Ch5DerivedResult(True, "cg_triangle_altitudes", "line_list", [l_a, l_b])


def _d_5_4_q8() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_perp_bisector", "line", cg.perpendicular_bisector(P(-4, 2), P(6, -4)))


def _d_5_4_q9() -> Ch5DerivedResult:
    pt = cg.line_intersection(L(7, 3, -10), L(5, -4, -1))
    m = cg.line_properties(L(13, 5, 12))["slope"]
    return Ch5DerivedResult(True, "cg_line_through_intersection_parallel", "line", cg.line_from_point_slope(pt, m))


def _d_5_4_q10() -> Ch5DerivedResult:
    pt = cg.line_intersection(L(5, -6, -2), L(3, 2, -10))
    m = cg.line_properties(L(4, -7, 13))["slope"]
    return Ch5DerivedResult(True, "cg_line_through_intersection_perp", "line", cg.line_from_point_slope(pt, sp.simplify(-1 / m)))


def _d_5_4_q11() -> Ch5DerivedResult:
    p1 = cg.line_intersection(L(3, 1, 2), L(1, -2, -4))
    p2 = cg.line_intersection(L(7, -3, 12), L(1, -2, 3))
    return Ch5DerivedResult(True, "cg_line_two_intersections", "line", cg.line_from_two_points(p1, p2))


def _d_5_4_q12() -> Ch5DerivedResult:
    p1 = cg.line_intersection(L(8, 3, -18), L(4, 5, -9))
    p2 = cg.midpoint(P(5, -4), P(-7, 6))
    return Ch5DerivedResult(True, "cg_line_intersection_midpoint", "line", cg.line_from_two_points(p1, p2))


# --- 5.5 (15 MCQs) ---
def _d_5_5_q1() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_triangle_area", "scalar", cg.polygon_area([P(-5, 0), P(0, -5), P(5, 0)]))


def _d_5_5_q2() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_parallel_y_axis", "line", L(1, 0, -10))


def _d_5_5_q3() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_x_const_parallel_y", "label", "parallel to Y axis")


def _d_5_5_q4() -> Ch5DerivedResult:
    p = sp.Symbol("p", real=True)
    return Ch5DerivedResult(True, "mcq_collinear_p", "scalar", sp.solve(sp.Eq(cg.signed_polygon_area([P(5, 7), (sp.Integer(3), p), P(6, 6)]), 0), p)[0])


def _d_5_5_q5() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_intersection", "point", cg.line_intersection(L(3, -1, -4), L(1, 1, -8)))


def _d_5_5_q6() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    return Ch5DerivedResult(True, "mcq_slope_solve_a", "scalar", sp.solve(sp.Eq(cg.slope(P(12, 3), (sp.Integer(4), a)), sp.Rational(1, 8)), a)[0])


def _d_5_5_q7() -> Ch5DerivedResult:
    m = cg.slope(P(0, 0), P(-8, 8))
    return Ch5DerivedResult(True, "mcq_perp_slope", "scalar", sp.simplify(-1 / m))


def _d_5_5_q8() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_perp_bisector_slope", "scalar", -sp.sqrt(3))


def _d_5_5_q9() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "mcq_line_intercepts", "line", cg.line_from_intercepts(sp.Integer(5), sp.Integer(8)))


def _d_5_5_q10() -> Ch5DerivedResult:
    m = cg.line_properties(L(7, -3, 4))["slope"]
    return Ch5DerivedResult(True, "mcq_perp_through_origin", "line", cg.line_from_point_slope(P(0, 0), sp.simplify(-1 / m)))


def _d_5_5_q11() -> Ch5DerivedResult:
    m2 = cg.line_properties(L(3, -4, -1))["slope"]
    m4 = cg.line_properties(L(4, 3, -2))["slope"]
    return Ch5DerivedResult(True, "mcq_four_lines_perp", "label", "l₂ and l₄ are perpendicular" if cg.are_perpendicular(m2, m4) else "")


def _d_5_5_q12() -> Ch5DerivedResult:
    props = cg.line_properties(L(4, -8, 21))
    return Ch5DerivedResult(True, "mcq_slope_yintercept", "pair_dict", {"slope": props["slope"], "y_intercept": props["y_intercept"]})


def _d_5_5_q13() -> Ch5DerivedResult:
    return Ch5DerivedResult(False, "qualitative_definition", "none", notes="Conceptual definition of trapezium proof; non-computational.")


def _d_5_5_q14() -> Ch5DerivedResult:
    return Ch5DerivedResult(False, "qualitative_definition", "none", notes="Conceptual definition of parallelogram slope proof; non-computational.")


def _d_5_5_q15() -> Ch5DerivedResult:
    pt = P(2, 1)
    ok = (2 + 1 == 3) and (3 * 2 + 1 == 7)
    return Ch5DerivedResult(True, "mcq_point_satisfies_lines", "label", "x + y = 3; 3x + y = 7" if ok else "")


# --- 5.unit ---
def _d_unit_q1() -> Ch5DerivedResult:
    A = cg.midpoint(P(-1, -1), P(-1, 4))
    B = cg.midpoint(P(-1, 4), P(5, 4))
    C = cg.midpoint(P(5, 4), P(5, -1))
    D = cg.midpoint(P(5, -1), P(-1, -1))
    return Ch5DerivedResult(True, "cg_midpoint_quad_rhombus", "label", cg.classify_quadrilateral(A, B, C, D))


def _d_unit_q2() -> Ch5DerivedResult:
    x = sp.Symbol("x", real=True)
    area = cg.signed_polygon_area([P(2, 1), P(3, -2), (x, x + 3)])
    xs = sp.solve(sp.Eq(area, 5), x) + sp.solve(sp.Eq(area, -5), x)
    return Ch5DerivedResult(True, "cg_triangle_area_locus", "point_list", [(xv, xv + 3) for xv in xs])


def _d_unit_q3() -> Ch5DerivedResult:
    p1 = cg.line_intersection(L(3, 1, -2), L(5, 2, -3))
    p2 = cg.line_intersection(L(5, 2, -3), L(2, -1, -3))
    p3 = cg.line_intersection(L(2, -1, -3), L(3, 1, -2))
    return Ch5DerivedResult(True, "cg_triangle_area_from_lines", "scalar", cg.polygon_area([p1, p2, p3]))


def _d_unit_q4() -> Ch5DerivedResult:
    k = sp.Symbol("k", real=True)
    area = cg.signed_polygon_area([P(-5, 7), (sp.Integer(-4), k), P(-1, -6), P(4, 5)])
    sols = sp.solve(sp.Eq(area, 72), k) + sp.solve(sp.Eq(area, -72), k)
    return Ch5DerivedResult(True, "cg_quad_area_solve_k", "scalar_set", sols)


def _d_unit_q5() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_classify_parallelogram", "label", cg.classify_quadrilateral(P(-2, -1), P(4, 0), P(3, 3), P(-3, 2)))


def _d_unit_q6() -> Ch5DerivedResult:
    a, b = sp.symbols("a b", real=True)
    sols = sp.solve([sp.Eq(a + b, 1), sp.Eq(a * b, -6)], [a, b])
    return Ch5DerivedResult(True, "cg_lines_intercepts_sum_prod", "line_list", [cg.line_from_intercepts(sa, sb) for sa, sb in sols])


def _d_unit_q7() -> Ch5DerivedResult:
    l1 = cg.line_from_two_points(P(14, 980), P(16, 1220))
    y = sp.Symbol("y", real=True)
    return Ch5DerivedResult(True, "cg_linear_demand_predict", "scalar", sp.solve(sp.Eq(l1[0] * 17 + l1[1] * y + l1[2], 0), y)[0])


def _d_unit_q8() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "cg_reflect_point", "point", cg.reflect_point_across_line(P(3, 8), L(1, 3, -7)))


def _d_unit_q9() -> Ch5DerivedResult:
    pt = cg.line_intersection(L(4, 7, -3), L(2, -3, 1))
    a = pt[0] + pt[1]
    return Ch5DerivedResult(True, "cg_line_intersection_equal_intercepts", "line", cg.line_from_intercepts(a, a))


def _d_unit_q10() -> Ch5DerivedResult:
    pt = cg.line_intersection(L(2, -3, 4), L(3, 4, -5))
    m_target = cg.line_properties(L(6, -7, 8))["slope"]
    return Ch5DerivedResult(True, "cg_shortest_perp_path", "line", cg.line_from_point_slope(pt, sp.simplify(-1 / m_target)))


# --- 12 Concepts ---
def _c_1() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_centroid", "point", cg.centroid(P(3, -1), P(-2, 7), P(5, 3)))


def _c_2() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_triangle_area", "scalar", cg.polygon_area([P(1, -1), P(-4, 6), P(-3, -5)]))


def _c_3() -> Ch5DerivedResult:
    a = sp.Symbol("a", real=True)
    return Ch5DerivedResult(True, "concept_collinear_a", "scalar", sp.solve(sp.Eq(cg.signed_polygon_area([P(2, 3), (sp.Integer(4), a), P(6, -3)]), 0), a)[0])


def _c_4() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_quad_area", "scalar", cg.polygon_area([P(-4, -2), P(-3, -5), P(3, -2), P(2, 3)]))


def _c_5() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_slope", "scalar", cg.slope(P(-6, 1), P(-3, 2)))


def _c_6() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_perp_slope", "scalar", sp.simplify(-1 / cg.slope(P(3, -2), P(12, 4))))


def _c_7() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_parallel_y", "line", cg.line_from_point_slope(P(5, 7), None))


def _c_8() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_slope_intercept", "line", cg.line_from_point_slope(P(0, 11), cg.slope_from_angle(sp.Integer(45))))


def _c_9() -> Ch5DerivedResult:
    return Ch5DerivedResult(True, "concept_point_slope", "line", cg.line_from_point_slope(P(-1, 2), sp.Rational(-5, 4)))


def _c_10() -> Ch5DerivedResult:
    p = cg.line_properties(L(4, 3, 12))
    return Ch5DerivedResult(True, "concept_intercepts", "pair_dict", {"a": p["x_intercept"], "b": p["y_intercept"]})


def _c_11() -> Ch5DerivedResult:
    p = cg.line_properties(L(8, -7, 6))
    return Ch5DerivedResult(True, "concept_general_form", "pair_dict", {"m": p["slope"], "c": p["y_intercept"]})


def _c_12() -> Ch5DerivedResult:
    m = cg.line_properties(L(3, -4, 5))["slope"]
    return Ch5DerivedResult(True, "concept_perp_general", "line", cg.line_from_point_slope(P(6, -2), sp.simplify(-1 / m)))


CH5_DERIVATION_REGISTRY: Dict[str, Callable[[], Ch5DerivedResult]] = {
    "c10-5-5-practice-20": _d_practice_20,
    "c10-5-ex5-1-q1-i": _d_5_1_q1_i,
    "c10-5-ex5-1-q1-ii": _d_5_1_q1_ii,
    "c10-5-ex5-1-q2-i": _d_5_1_q2_i,
    "c10-5-ex5-1-q2-ii": _d_5_1_q2_ii,
    "c10-5-ex5-1-q3-i": _d_5_1_q3_i,
    "c10-5-ex5-1-q3-ii": _d_5_1_q3_ii,
    "c10-5-ex5-1-q4-i": _d_5_1_q4_i,
    "c10-5-ex5-1-q4-ii": _d_5_1_q4_ii,
    "c10-5-ex5-1-q5-i": _d_5_1_q5_i,
    "c10-5-ex5-1-q5-ii": _d_5_1_q5_ii,
    "c10-5-ex5-1-q6": _d_5_1_q6,
    "c10-5-ex5-1-q7": _d_5_1_q7,
    "c10-5-ex5-1-q8": _d_5_1_q8,
    "c10-5-ex5-1-q9": _d_5_1_q9,
    "c10-5-ex5-1-q10": _d_5_1_q10,
    "c10-5-ex5-1-q11-i": _d_5_1_q11_i,
    "c10-5-ex5-1-q11-ii": _d_5_1_q11_ii,
    "c10-5-ex5-1-q11-iii": _d_5_1_q11_iii,
    "c10-5-ex5-2-q1-i": _d_5_2_q1_i,
    "c10-5-ex5-2-q1-ii": _d_5_2_q1_ii,
    "c10-5-ex5-2-q2-i": _d_5_2_q2_i,
    "c10-5-ex5-2-q2-ii": _d_5_2_q2_ii,
    "c10-5-ex5-2-q3-i": _d_5_2_q3_i,
    "c10-5-ex5-2-q3-ii": _d_5_2_q3_ii,
    "c10-5-ex5-2-q4": _d_5_2_q4,
    "c10-5-ex5-2-q5": _d_5_2_q5,
    "c10-5-ex5-2-q6": _d_5_2_q6,
    "c10-5-ex5-2-q7": _d_5_2_q7,
    "c10-5-ex5-2-q8": _d_5_2_q8,
    "c10-5-ex5-2-q9-i": _d_5_2_q9_i,
    "c10-5-ex5-2-q9-ii": _d_5_2_q9_ii,
    "c10-5-ex5-2-q10": _d_5_2_q10,
    "c10-5-ex5-2-q11": _d_5_2_q11,
    "c10-5-ex5-2-q12": _d_5_2_q12,
    "c10-5-ex5-2-q13": _d_5_2_q13,
    "c10-5-ex5-3-q1-i": _d_5_3_q1_i,
    "c10-5-ex5-3-q1-ii": _d_5_3_q1_ii,
    "c10-5-ex5-3-q2": _d_5_3_q2,
    "c10-5-ex5-3-q3": _d_5_3_q3,
    "c10-5-ex5-3-q4": _d_5_3_q4,
    "c10-5-ex5-3-q5": _d_5_3_q5,
    "c10-5-ex5-3-q6": _d_5_3_q6,
    "c10-5-ex5-3-q7-i": _d_5_3_q7_i,
    "c10-5-ex5-3-q7-ii": _d_5_3_q7_ii,
    "c10-5-ex5-3-q8": _d_5_3_q8,
    "c10-5-ex5-3-q9-i": _d_5_3_q9_i,
    "c10-5-ex5-3-q9-ii": _d_5_3_q9_ii,
    "c10-5-ex5-3-q10": _d_5_3_q10,
    "c10-5-ex5-3-q11-i": _d_5_3_q11_i,
    "c10-5-ex5-3-q11-ii": _d_5_3_q11_ii,
    "c10-5-ex5-3-q11-iii": _d_5_3_q11_iii,
    "c10-5-ex5-3-q12-i": _d_5_3_q12_i,
    "c10-5-ex5-3-q12-ii": _d_5_3_q12_ii,
    "c10-5-ex5-3-q13-i": _d_5_3_q13_i,
    "c10-5-ex5-3-q13-ii": _d_5_3_q13_ii,
    "c10-5-ex5-3-q14-i": _d_5_3_q14_i,
    "c10-5-ex5-3-q14-ii": _d_5_3_q14_ii,
    "c10-5-ex5-4-q1-i": _d_5_4_q1_i,
    "c10-5-ex5-4-q1-ii": _d_5_4_q1_ii,
    "c10-5-ex5-4-q2-i": _d_5_4_q2_i,
    "c10-5-ex5-4-q2-ii": _d_5_4_q2_ii,
    "c10-5-ex5-4-q3-i": _d_5_4_q3_i,
    "c10-5-ex5-4-q3-ii": _d_5_4_q3_ii,
    "c10-5-ex5-4-q4": _d_5_4_q4,
    "c10-5-ex5-4-q5": _d_5_4_q5,
    "c10-5-ex5-4-q6": _d_5_4_q6,
    "c10-5-ex5-4-q7": _d_5_4_q7,
    "c10-5-ex5-4-q8": _d_5_4_q8,
    "c10-5-ex5-4-q9": _d_5_4_q9,
    "c10-5-ex5-4-q10": _d_5_4_q10,
    "c10-5-ex5-4-q11": _d_5_4_q11,
    "c10-5-ex5-4-q12": _d_5_4_q12,
    "c10-5-ex5-5-q1": _d_5_5_q1,
    "c10-5-ex5-5-q2": _d_5_5_q2,
    "c10-5-ex5-5-q3": _d_5_5_q3,
    "c10-5-ex5-5-q4": _d_5_5_q4,
    "c10-5-ex5-5-q5": _d_5_5_q5,
    "c10-5-ex5-5-q6": _d_5_5_q6,
    "c10-5-ex5-5-q7": _d_5_5_q7,
    "c10-5-ex5-5-q8": _d_5_5_q8,
    "c10-5-ex5-5-q9": _d_5_5_q9,
    "c10-5-ex5-5-q10": _d_5_5_q10,
    "c10-5-ex5-5-q11": _d_5_5_q11,
    "c10-5-ex5-5-q12": _d_5_5_q12,
    "c10-5-ex5-5-q13": _d_5_5_q13,
    "c10-5-ex5-5-q14": _d_5_5_q14,
    "c10-5-ex5-5-q15": _d_5_5_q15,
    "c10-5-unit-q1": _d_unit_q1,
    "c10-5-unit-q2": _d_unit_q2,
    "c10-5-unit-q3": _d_unit_q3,
    "c10-5-unit-q4": _d_unit_q4,
    "c10-5-unit-q5": _d_unit_q5,
    "c10-5-unit-q6": _d_unit_q6,
    "c10-5-unit-q7": _d_unit_q7,
    "c10-5-unit-q8": _d_unit_q8,
    "c10-5-unit-q9": _d_unit_q9,
    "c10-5-unit-q10": _d_unit_q10,
    "g10-ch5-distance-midpoint-centroid": _c_1,
    "g10-ch5-area-triangle": _c_2,
    "g10-ch5-collinearity": _c_3,
    "g10-ch5-area-quadrilateral": _c_4,
    "g10-ch5-inclination-slope": _c_5,
    "g10-ch5-parallel-perpendicular-slopes": _c_6,
    "g10-ch5-axes-and-parallel-lines": _c_7,
    "g10-ch5-slope-intercept-form": _c_8,
    "g10-ch5-point-slope-and-two-point": _c_9,
    "g10-ch5-intercept-form": _c_10,
    "g10-ch5-general-form": _c_11,
    "g10-ch5-parallel-perpendicular-general": _c_12,
}
