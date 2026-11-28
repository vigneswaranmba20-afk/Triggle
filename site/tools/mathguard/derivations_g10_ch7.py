"""Independent first-principles SymPy derivations for Grade 10 Chapter 7 (Mensuration).

Each derivation uses only the quantities stated in the question (or figureAlt when
dimensions are diagram-only), geometric formulas from geometry.py, and unit
conversions from units.py — never reading answers or steps from student records.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from . import geometry as geo
from .units import convert_length


@dataclass
class DerivedResult:
    verifiable: bool
    method: str
    expr: Any = None  # sp.Expr or Tuple[sp.Expr, ...] or List[sp.Expr]
    expected_dimension: Optional[str] = None
    preferred_pi: str = "22/7"
    tolerance: float = 0.02
    required_numbers: List[str] = field(default_factory=list)
    figure_sourced: bool = False
    notes: str = ""


def _num_in_source(num_str: str, source_text: str) -> bool:
    cleaned = re.sub(r"(?<=\d),(?=\d{3}\b)", "", source_text or "")
    return bool(re.search(rf"(?<!\d){re.escape(num_str)}(?!\d)", cleaned))


def verify_source_numbers(required_numbers: List[str], source_text: str) -> List[str]:
    return [n for n in required_numbers if not _num_in_source(n, source_text)]


def _derive_ex7_1_q1() -> DerivedResult:
    # r:h = 5:7, CSA = 5500 sq.cm, find r and h
    k = sp.Symbol("k", positive=True)
    r, h = 5 * k, 7 * k
    csa_eq = sp.Eq(geo.cylinder_csa(r, h).subs(sp.pi, sp.Rational(22, 7)), 5500)
    k_val = sp.solve(csa_eq, k)[0]
    return DerivedResult(
        verifiable=True,
        method="sympy_solve_cylinder_csa_ratio",
        expr=[5 * k_val, 7 * k_val],
        expected_dimension="length",
        preferred_pi="22/7",
        required_numbers=["5", "7", "5500"],
    )


def _derive_ex7_1_q2() -> DerivedResult:
    # TSA = 1848, CSA = (5/6) TSA -> 2*pi*r^2 = TSA/6
    r, h = sp.symbols("r h", positive=True)
    tsa = sp.Integer(1848)
    csa = sp.Rational(5, 6) * tsa
    pi_val = sp.Rational(22, 7)
    r_val = sp.solve(sp.Eq(2 * pi_val * r**2, tsa - csa), r)[0]
    h_val = sp.solve(sp.Eq(2 * pi_val * r_val * h, csa), h)[0]
    return DerivedResult(
        verifiable=True,
        method="sympy_solve_cylinder_tsa_csa",
        expr=[r_val, h_val],
        expected_dimension="length",
        preferred_pi="22/7",
        required_numbers=["1848"],
    )


def _derive_ex7_1_q3() -> DerivedResult:
    R, h, t = sp.Integer(16), sp.Integer(13), sp.Integer(4)
    r = R - t
    return DerivedResult(
        verifiable=True,
        method="hollow_cylinder_tsa",
        expr=geo.hollow_cylinder_tsa(R, r, h),
        expected_dimension="area",
        preferred_pi="22/7",
        required_numbers=["16", "13", "4"],
    )


def _derive_ex7_1_q4() -> DerivedResult:
    # Right triangle PQR, angle Q=90, QR=16, PR=20 -> PQ = sqrt(20^2 - 16^2) = 12
    qr, pr = sp.Integer(16), sp.Integer(20)
    pq = sp.sqrt(pr**2 - qr**2)
    csa_qr = geo.cone_csa(pq, pr)  # rotated about QR: r = PQ, l = PR
    csa_pq = geo.cone_csa(qr, pr)  # rotated about PQ: r = QR, l = PR
    return DerivedResult(
        verifiable=True,
        method="cone_rotation_csa_ratio",
        expr=(csa_qr, csa_pq),
        expected_dimension=None,
        preferred_pi="exact",
        required_numbers=["16", "20"],
    )


def _derive_ex7_1_q5() -> DerivedResult:
    # 4 persons, 22 m^2 each -> base area = 88 m^2, slant height l = 19 m
    l = sp.Integer(19)
    base_area = sp.Integer(4) * sp.Integer(22)
    r_sq = base_area / sp.Rational(22, 7)
    h = sp.sqrt(l**2 - r_sq)
    return DerivedResult(
        verifiable=True,
        method="cone_height_from_base_area_slant",
        expr=h,
        expected_dimension="length",
        preferred_pi="22/7",
        required_numbers=["4", "19", "22"],
    )


def _derive_ex7_1_q6() -> DerivedResult:
    r, h, sheet = sp.Integer(5), sp.Integer(12), sp.Integer(5720)
    l = geo.cone_slant_height(r, h)
    cap_area = geo.cone_csa(r, l).subs(sp.pi, sp.Rational(22, 7))
    return DerivedResult(
        verifiable=True,
        method="cone_csa_count_from_sheet",
        expr=sheet / cap_area,
        expected_dimension=None,
        preferred_pi="22/7",
        required_numbers=["5720", "5", "12"],
    )


def _derive_ex7_1_q7() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    r1, r2, h = r, 3 * r, 3 * r
    csa1 = geo.cone_csa(r1, geo.cone_slant_height(r1, h))
    csa2 = geo.cone_csa(r2, geo.cone_slant_height(r2, h))
    return DerivedResult(
        verifiable=True,
        method="cone_csa_ratio_symbolic",
        expr=(sp.simplify(csa1 / sp.pi / r**2), sp.simplify(csa2 / sp.pi / r**2)),
        expected_dimension=None,
        preferred_pi="exact",
        required_numbers=["1", "3"],
    )


def _derive_ex7_1_q8() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    sa1 = geo.sphere_sa(r)
    sa2 = geo.sphere_sa(sp.Rational(125, 100) * r)
    pct = sp.simplify((sa2 - sa1) / sa1 * 100)
    return DerivedResult(
        verifiable=True,
        method="sphere_sa_scaling_percentage",
        expr=pct,
        expected_dimension="percentage",
        preferred_pi="exact",
        required_numbers=["25"],
    )


def _derive_ex7_1_q9() -> DerivedResult:
    r, R = sp.Integer(20) / 2, sp.Integer(28) / 2
    tsa = geo.hollow_hemisphere_tsa(R, r)
    cost = tsa * sp.Rational("0.14")
    return DerivedResult(
        verifiable=True,
        method="hollow_hemisphere_tsa_painting_cost",
        expr=cost,
        expected_dimension="currency",
        preferred_pi="22/7",
        required_numbers=["20", "28", "0.14"],
    )


def _derive_ex7_1_q10() -> DerivedResult:
    # Dimensions from textbook figure: r=6 cm, R=12 cm, h=8 cm; top part is pi*r^2
    r, R, h = sp.Integer(6), sp.Integer(12), sp.Integer(8)
    l = geo.frustum_slant_height(R, r, h)
    area = geo.frustum_csa(R, r, l) + sp.pi * r**2
    cost = area * sp.Integer(2)
    return DerivedResult(
        verifiable=True,
        method="frustum_outer_plus_top_cost",
        expr=cost,
        expected_dimension="currency",
        preferred_pi="22/7",
        tolerance=0.02,
        required_numbers=["6", "12", "8", "2"],
        figure_sourced=True,
        notes="Unrounded 216*(22/7)*2 = 1357.714..., intermediate-rounded area 678.86*2 = 1357.72.",
    )


def _derive_ex7_2_q1() -> DerivedResult:
    r_well, h_well, w = sp.Integer(10) / 2, sp.Integer(14), sp.Integer(5)
    vol_well = geo.cylinder_volume(r_well, h_well)
    h_emb = sp.Symbol("h_emb", positive=True)
    vol_emb = geo.hollow_cylinder_volume(r_well + w, r_well, h_emb)
    ans = sp.solve(sp.Eq(vol_well, vol_emb), h_emb)[0]
    return DerivedResult(
        verifiable=True,
        method="well_embankment_volume_conservation",
        expr=ans,
        expected_dimension="length",
        preferred_pi="exact",
        required_numbers=["14", "10", "5"],
    )


def _derive_ex7_2_q2() -> DerivedResult:
    r_glass = sp.Integer(20) / 2
    r_metal, h_metal = sp.Integer(5), sp.Integer(4)
    dh = sp.Symbol("dh", positive=True)
    ans = sp.solve(sp.Eq(geo.cylinder_volume(r_glass, dh), geo.cylinder_volume(r_metal, h_metal)), dh)[0]
    return DerivedResult(
        verifiable=True,
        method="water_displacement_cylinder",
        expr=ans,
        expected_dimension="length",
        preferred_pi="exact",
        required_numbers=["20", "9", "5", "4"],
    )


def _derive_ex7_2_q3() -> DerivedResult:
    # circumference = 484 cm, h = 105 cm
    r = sp.Integer(484) / (2 * sp.Rational(22, 7))
    vol = geo.cone_volume(r, sp.Integer(105)).subs(sp.pi, sp.Rational(22, 7))
    return DerivedResult(
        verifiable=True,
        method="cone_volume_from_circumference",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["484", "105"],
    )


def _derive_ex7_2_q4() -> DerivedResult:
    vol = geo.cone_volume(sp.Integer(10), sp.Integer(15))
    rate = sp.Integer(25)
    return DerivedResult(
        verifiable=True,
        method="cone_emptying_time",
        expr=vol / rate,
        expected_dimension="time",
        preferred_pi="22/7",
        tolerance=0.5,
        required_numbers=["10", "15", "25"],
    )


def _derive_ex7_2_q5() -> DerivedResult:
    v1 = geo.cone_volume(sp.Integer(8), sp.Integer(6))
    v2 = geo.cone_volume(sp.Integer(6), sp.Integer(8))
    return DerivedResult(
        verifiable=True,
        method="right_triangle_cone_volumes_diff",
        expr=sp.Abs(v1 - v2),
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["6", "8", "10"],
    )


def _derive_ex7_2_q6() -> DerivedResult:
    return DerivedResult(
        verifiable=True,
        method="cone_height_ratio_from_volumes",
        expr=(sp.Integer(3600), sp.Integer(5040)),
        expected_dimension=None,
        required_numbers=["3600", "5040"],
    )


def _derive_ex7_2_q7() -> DerivedResult:
    return DerivedResult(
        verifiable=True,
        method="sphere_volume_ratio_from_radii",
        expr=(sp.Integer(4) ** 3, sp.Integer(7) ** 3),
        expected_dimension=None,
        required_numbers=["4", "7"],
    )


def _derive_ex7_2_q8() -> DerivedResult:
    R, r = sp.symbols("R r", positive=True)
    # 4*pi*R^2 = 3*pi*r^2 => r = 2/sqrt(3) * R
    r_expr = sp.solve(sp.Eq(geo.sphere_sa(R), geo.hemisphere_tsa(r)), r)[0]
    v_sphere = geo.sphere_volume(R)
    v_hemi = geo.hemisphere_volume(r_expr)
    ratio = sp.simplify(v_sphere / v_hemi)
    return DerivedResult(
        verifiable=True,
        method="sphere_hemisphere_equal_tsa_volume_ratio",
        expr=(sp.simplify(ratio * 4), sp.Integer(4)),
        expected_dimension=None,
        required_numbers=["3", "4"],
    )


def _derive_ex7_2_q9() -> DerivedResult:
    R, r = sp.symbols("R r", positive=True)
    R_val = sp.solve(sp.Eq(geo.sphere_sa(R), 576 * sp.pi), R)[0]
    r_val = sp.solve(sp.Eq(geo.sphere_sa(r), 324 * sp.pi), r)[0]
    vol = geo.hollow_sphere_volume(R_val, r_val)
    return DerivedResult(
        verifiable=True,
        method="hollow_sphere_volume_from_areas",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["576", "324"],
    )


def _derive_ex7_2_q10() -> DerivedResult:
    vol_cm3 = geo.frustum_volume(sp.Integer(20), sp.Integer(8), sp.Integer(16))
    cost = (vol_cm3 / sp.Integer(1000)) * sp.Integer(40)
    return DerivedResult(
        verifiable=True,
        method="frustum_milk_cost",
        expr=cost,
        expected_dimension="currency",
        preferred_pi="22/7",
        required_numbers=["16", "8", "20", "40"],
    )


def _derive_ex7_3_q1() -> DerivedResult:
    r = sp.Integer(14) / 2
    h_cyl = sp.Integer(13) - r
    vol = geo.hemisphere_volume(r) + geo.cylinder_volume(r, h_cyl)
    return DerivedResult(
        verifiable=True,
        method="hemisphere_plus_cylinder_volume",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["14", "13"],
    )


def _derive_ex7_3_q2() -> DerivedResult:
    r = sp.Rational(3, 2)
    h_cone = sp.Integer(2)
    h_cyl = sp.Integer(12) - 2 * h_cone
    vol = geo.cylinder_volume(r, h_cyl) + 2 * geo.cone_volume(r, h_cone)
    return DerivedResult(
        verifiable=True,
        method="cylinder_plus_two_cones_volume",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["3", "12", "2"],
    )


def _derive_ex7_3_q3() -> DerivedResult:
    r = sp.Rational("1.4") / 2
    h = sp.Rational("2.4")
    vol = geo.cylinder_volume(r, h) - geo.cone_volume(r, h)
    return DerivedResult(
        verifiable=True,
        method="cylinder_minus_cone_volume",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        tolerance=0.01,
        required_numbers=["2.4", "1.4"],
    )


def _derive_ex7_3_q4() -> DerivedResult:
    r, h_cone = sp.Integer(6), sp.Integer(12)
    vol = geo.cone_volume(r, h_cone) + geo.hemisphere_volume(r)
    return DerivedResult(
        verifiable=True,
        method="cone_on_hemisphere_displacement",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["12", "6", "18"],
    )


def _derive_ex7_3_q5() -> DerivedResult:
    r = sp.Rational(3, 2)
    h_cyl = sp.Integer(12) - 2 * r
    vol = geo.cylinder_volume(r, h_cyl) + 2 * geo.hemisphere_volume(r)
    return DerivedResult(
        verifiable=True,
        method="capsule_cylinder_plus_two_hemispheres",
        expr=vol,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["12", "3"],
    )


def _derive_ex7_3_q6() -> DerivedResult:
    a = sp.Integer(7)
    r = a / 2
    # Cube TSA - circular base + hemisphere CSA = 6a^2 + pi*r^2
    area = geo.cube_tsa(a) - sp.pi * r**2 + geo.hemisphere_csa(r)
    return DerivedResult(
        verifiable=True,
        method="cube_surmounted_by_hemisphere_sa",
        expr=area,
        expected_dimension="area",
        preferred_pi="22/7",
        required_numbers=["7"],
    )


def _derive_ex7_3_q7_i() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(
        verifiable=True,
        method="enclosed_sphere_sa",
        expr=geo.sphere_sa(r),
        expected_dimension="area",
        preferred_pi="exact",
        required_numbers=[],
    )


def _derive_ex7_3_q7_ii() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(
        verifiable=True,
        method="enclosing_cylinder_csa",
        expr=geo.cylinder_csa(r, 2 * r),
        expected_dimension="area",
        preferred_pi="exact",
        required_numbers=[],
    )


def _derive_ex7_3_q7_iii() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(
        verifiable=True,
        method="sphere_vs_enclosing_cylinder_ratio",
        expr=(geo.sphere_sa(r), geo.cylinder_csa(r, 2 * r)),
        expected_dimension=None,
        preferred_pi="exact",
        required_numbers=[],
    )


def _derive_ex7_4_q1() -> DerivedResult:
    h = sp.Symbol("h", positive=True)
    ans = sp.solve(sp.Eq(geo.sphere_volume(sp.Integer(12)), geo.cylinder_volume(sp.Integer(8), h)), h)[0]
    return DerivedResult(
        verifiable=True,
        method="sphere_to_cylinder_volume_conservation",
        expr=ans,
        expected_dimension="length",
        required_numbers=["12", "8"],
    )


def _derive_ex7_4_q2() -> DerivedResult:
    # 15 km/h = 15000 m/h; pipe d = 14 cm => r = 7/100 m; tank 50m x 44m x 21/100 m
    t = sp.Symbol("t", positive=True)
    r_pipe = sp.Rational(7, 100)
    rate_len = sp.Integer(15000)
    vol_flow = geo.cylinder_volume(r_pipe, rate_len * t).subs(sp.pi, sp.Rational(22, 7))
    vol_tank = geo.cuboid_volume(sp.Integer(50), sp.Integer(44), sp.Rational(21, 100))
    ans = sp.solve(sp.Eq(vol_flow, vol_tank), t)[0]
    return DerivedResult(
        verifiable=True,
        method="pipe_flow_tank_fill_time",
        expr=ans,
        expected_dimension="time",
        preferred_pi="22/7",
        required_numbers=["15", "14", "50", "44", "21"],
    )


def _derive_ex7_4_q3() -> DerivedResult:
    r, h, x, H = sp.symbols("r h x H", positive=True)
    ans = sp.solve(sp.Eq(geo.cone_volume(r, h), geo.cylinder_volume(x * r, H)), H)[0]
    return DerivedResult(
        verifiable=True,
        method="cone_to_cylinder_symbolic_height",
        expr=ans,
        expected_dimension="length",
        preferred_pi="exact",
        required_numbers=[],
    )


def _derive_ex7_4_q4() -> DerivedResult:
    r_cone, h_cone = sp.Integer(14) / 2, sp.Integer(8)
    R_sph = sp.Integer(10) / 2
    r_sph = sp.Symbol("r_sph", positive=True)
    r_in = sp.solve(sp.Eq(geo.cone_volume(r_cone, h_cone), geo.hollow_sphere_volume(R_sph, r_sph)), r_sph)[0]
    return DerivedResult(
        verifiable=True,
        method="cone_to_hollow_sphere_internal_diameter",
        expr=2 * r_in,
        expected_dimension="length",
        required_numbers=["14", "8", "10"],
    )


def _derive_ex7_4_q5() -> DerivedResult:
    # Sump 2m x 1.5m x 1m in cm; overhead r=60cm, h=105cm
    v_sump = geo.cuboid_volume(sp.Integer(200), sp.Integer(150), sp.Integer(100))
    v_tank = geo.cylinder_volume(sp.Integer(60), sp.Integer(105))
    return DerivedResult(
        verifiable=True,
        method="sump_minus_overhead_tank_volume",
        expr=v_sump - v_tank,
        expected_dimension="volume",
        preferred_pi="22/7",
        required_numbers=["2", "1.5", "1", "60", "105"],
    )


def _derive_ex7_4_q6() -> DerivedResult:
    h = sp.Symbol("h", positive=True)
    v_shell = geo.hollow_hemisphere_volume(sp.Integer(5), sp.Integer(3))
    v_cyl = geo.cylinder_volume(sp.Integer(7), h)
    ans = sp.solve(sp.Eq(v_shell, v_cyl), h)[0]
    return DerivedResult(
        verifiable=True,
        method="hollow_hemisphere_to_cylinder_height",
        expr=ans,
        expected_dimension="length",
        required_numbers=["6", "10", "14"],
    )


def _derive_ex7_4_q7() -> DerivedResult:
    r_in = sp.Symbol("r_in", positive=True)
    v_sph = geo.sphere_volume(sp.Integer(6))
    v_cyl = geo.hollow_cylinder_volume(sp.Integer(5), r_in, sp.Integer(32))
    r_val = [sol for sol in sp.solve(sp.Eq(v_sph, v_cyl), r_in) if sol > 0][0]
    return DerivedResult(
        verifiable=True,
        method="sphere_to_hollow_cylinder_thickness",
        expr=sp.Integer(5) - r_val,
        expected_dimension="length",
        required_numbers=["6", "5", "32"],
    )


def _derive_ex7_4_q8() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    # r = 1.5 * h_cyl => h_cyl = 2r/3
    h_cyl = sp.Rational(2, 3) * r
    pct = sp.simplify(geo.hemisphere_volume(r) / geo.cylinder_volume(r, h_cyl) * 100)
    return DerivedResult(
        verifiable=True,
        method="hemisphere_to_cylinder_percentage",
        expr=pct,
        expected_dimension="percentage",
        required_numbers=["50"],
    )


def _derive_ex7_5_q1() -> DerivedResult:
    r, h = sp.Integer(16) / 2, sp.Integer(15)
    l = geo.cone_slant_height(r, h)
    return DerivedResult(True, "mcq_cone_csa", geo.cone_csa(r, l), "area", "exact", required_numbers=["15", "16"])


def _derive_ex7_5_q2() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(True, "mcq_two_hemispheres_csa", 2 * geo.hemisphere_csa(r), "area", "exact")


def _derive_ex7_5_q3() -> DerivedResult:
    r, l = sp.Integer(5), sp.Integer(13)
    return DerivedResult(True, "mcq_cone_height", sp.sqrt(l**2 - r**2), "length", "exact", required_numbers=["5", "13"])


def _derive_ex7_5_q4() -> DerivedResult:
    r, h = sp.symbols("r h", positive=True)
    return DerivedResult(
        True,
        "mcq_cylinder_halved_radius_ratio",
        (geo.cylinder_volume(r / 2, h), geo.cylinder_volume(r, h)),
        None,
        "exact",
    )


def _derive_ex7_5_q5() -> DerivedResult:
    h = sp.Symbol("h", positive=True)
    return DerivedResult(True, "mcq_cylinder_tsa_r_one_third_h", geo.cylinder_tsa(h / 3, h), "area", "exact")


def _derive_ex7_5_q6() -> DerivedResult:
    # R + r = 14, R - r = 4, h = 20 => V = pi*(R+r)*(R-r)*h
    return DerivedResult(
        True,
        "mcq_hollow_cylinder_volume",
        sp.pi * sp.Integer(14) * sp.Integer(4) * sp.Integer(20),
        "volume",
        "exact",
        required_numbers=["14", "4", "20"],
    )


def _derive_ex7_5_q7() -> DerivedResult:
    r, h = sp.symbols("r h", positive=True)
    factor = sp.simplify(geo.cone_volume(3 * r, 2 * h) / geo.cone_volume(r, h))
    return DerivedResult(True, "mcq_cone_scaling_factor", factor, None, "exact")


def _derive_ex7_5_q8() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(True, "mcq_hemisphere_tsa_over_r2", sp.simplify(geo.hemisphere_tsa(r) / r**2), None, "exact")


def _derive_ex7_5_q9() -> DerivedResult:
    x, h = sp.symbols("x h", positive=True)
    ans = sp.solve(sp.Eq(geo.sphere_volume(x), geo.cone_volume(x, h)), h)[0]
    return DerivedResult(True, "mcq_sphere_to_cone_height", ans, "length", "exact")


def _derive_ex7_5_q10() -> DerivedResult:
    return DerivedResult(
        True,
        "mcq_frustum_volume",
        geo.frustum_volume(sp.Integer(20), sp.Integer(8), sp.Integer(16)),
        "volume",
        "exact",
        required_numbers=["16", "8", "20"],
    )


def _derive_ex7_5_q11() -> DerivedResult:
    return DerivedResult(
        verifiable=False,
        method="qualitative_shape_recognition",
        notes="Shuttlecock shape recognition is qualitative/non-numerical and cannot be derived from stated quantities.",
    )


def _derive_ex7_5_q12() -> DerivedResult:
    # (4/3)pi r1^3 = 8 * (4/3)pi r2^3 => r1:r2 = 2:1
    return DerivedResult(True, "mcq_sphere_8_balls_ratio", (sp.Integer(2), sp.Integer(1)), None, "exact", required_numbers=["8"])


def _derive_ex7_5_q13() -> DerivedResult:
    return DerivedResult(
        True,
        "mcq_greatest_sphere_in_cylinder",
        geo.sphere_volume(sp.Integer(1)),
        "volume",
        "exact",
        required_numbers=["1", "5"],
    )


def _derive_ex7_5_q14() -> DerivedResult:
    return DerivedResult(True, "mcq_similar_cones_ratio", (sp.Integer(1), sp.Integer(2)), None, "exact", required_numbers=["1", "2"])


def _derive_ex7_5_q15() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    h = 2 * r
    return DerivedResult(
        True,
        "mcq_cylinder_cone_sphere_volume_ratio",
        (geo.cylinder_volume(r, h), geo.cone_volume(r, h), geo.sphere_volume(r)),
        None,
        "exact",
    )


def _derive_unit_q1() -> DerivedResult:
    # r = 0.25 cm, h = 7 cm; 1/5 litre = 200 cm^3; 330 words per barrel
    v_barrel = geo.cylinder_volume(sp.Rational("0.25"), sp.Integer(7)).subs(sp.pi, sp.Rational(22, 7))
    words = (sp.Integer(200) / v_barrel) * sp.Integer(330)
    return DerivedResult(True, "fountain_pen_words", words, None, "22/7", tolerance=1.0, required_numbers=["7", "5", "330"])


def _derive_unit_q2() -> DerivedResult:
    # r = 1.75 m; V in litres = V_m3 * 1000; rate = 7 L/s; answer in minutes
    v_m3 = geo.hemisphere_volume(sp.Rational("1.75")).subs(sp.pi, sp.Rational(22, 7))
    v_litres = v_m3 * 1000
    minutes = (v_litres / 7) / 60
    return DerivedResult(True, "hemisphere_tank_empty_time", minutes, "time", "22/7", tolerance=0.5, required_numbers=["1.75", "7"])


def _derive_unit_q3() -> DerivedResult:
    r = sp.Symbol("r", positive=True)
    return DerivedResult(True, "max_cone_in_hemisphere", geo.cone_volume(r, r), "volume", "exact")


def _derive_unit_q4() -> DerivedResult:
    r_cyl = sp.Integer(8) / 2
    h_cyl = sp.Integer(10)
    R_top = sp.Integer(18) / 2
    h_frustum = sp.Integer(22) - h_cyl
    l_frustum = geo.frustum_slant_height(R_top, r_cyl, h_frustum)
    area = geo.cylinder_csa(r_cyl, h_cyl) + geo.frustum_csa(R_top, r_cyl, l_frustum)
    return DerivedResult(True, "funnel_tin_area", area, "area", "22/7", required_numbers=["10", "22", "8", "18"])


def _derive_unit_q5() -> DerivedResult:
    r_coin = sp.Rational("1.5") / 2
    h_coin = convert_length(sp.Rational(2), "mm", "cm")
    r_cyl = sp.Rational("4.5") / 2
    h_cyl = sp.Integer(10)
    n = geo.cylinder_volume(r_cyl, h_cyl) / geo.cylinder_volume(r_coin, sp.Rational(h_coin.numerator, h_coin.denominator))
    return DerivedResult(True, "coins_to_cylinder_count", sp.simplify(n), None, "exact", required_numbers=["1.5", "2", "10", "4.5"])


def _derive_unit_q6() -> DerivedResult:
    r_solid = sp.Symbol("r_solid", positive=True)
    v_hollow = geo.hollow_cylinder_volume(sp.Rational("4.3"), sp.Rational("1.1"), sp.Integer(4))
    v_solid = geo.cylinder_volume(r_solid, sp.Integer(12))
    r_val = sp.solve(sp.Eq(v_hollow, v_solid), r_solid)[0]
    return DerivedResult(True, "hollow_to_solid_cylinder_diameter", 2 * r_val, "length", "exact", required_numbers=["4.3", "1.1", "4", "12"])


def _derive_unit_q7() -> DerivedResult:
    # 2*pi*R = 18, 2*pi*r = 16 => pi*(R+r)*l = ((18+16)/2)*4 = 68 m^2; cost = 68*100 = 6800
    area = ((sp.Integer(18) + sp.Integer(16)) / 2) * sp.Integer(4)
    return DerivedResult(True, "frustum_csa_from_perimeters_cost", area * 100, "currency", "exact", required_numbers=["4", "18", "16", "100"])


def _derive_unit_q8() -> DerivedResult:
    R = sp.Integer(14) / 2
    r = sp.Symbol("r", positive=True)
    r_val = [s for s in sp.solve(sp.Eq(geo.hollow_hemisphere_volume(R, r), sp.Rational(436, 3) * sp.pi), r) if s > 0][0]
    return DerivedResult(True, "hollow_hemisphere_thickness", R - r_val, "length", "exact", required_numbers=["436", "3", "14"])


def _derive_unit_q9() -> DerivedResult:
    v = sp.Integer(1005) + sp.Rational(5, 7)
    a = sp.Integer(201) + sp.Rational(1, 7)
    h = 3 * v / a
    r = sp.sqrt(a / sp.Rational(22, 7))
    l = geo.cone_slant_height(r, h)
    return DerivedResult(True, "cone_slant_from_vol_base_area", l, "length", "22/7", required_numbers=["1005", "5", "7", "201", "1"])


def _derive_unit_q10() -> DerivedResult:
    # Sector R=21 cm, angle=216 deg => l_cone = 21, 2*pi*r = (216/360)*2*pi*21 => r = 63/5 = 12.6 cm
    l_cone = sp.Integer(21)
    r_cone = sp.Rational(216, 360) * l_cone
    h_cone = sp.sqrt(l_cone**2 - r_cone**2)
    return DerivedResult(True, "sector_to_cone_volume", geo.cone_volume(r_cone, h_cone), "volume", "22/7", required_numbers=["21", "216"])


# --- 9 Concept Lessons ---
def _derive_concept_1() -> DerivedResult:
    return DerivedResult(True, "concept_m3_to_litres", sp.Rational("2.5") * 1000, "volume", "exact", required_numbers=["2.5"])


def _derive_concept_2() -> DerivedResult:
    return DerivedResult(True, "concept_hollow_cylinder_csa", geo.hollow_cylinder_csa(sp.Integer(5), sp.Integer(3), sp.Integer(10)), "area", "exact", required_numbers=["5", "3", "10"])


def _derive_concept_3() -> DerivedResult:
    l = geo.cone_slant_height(sp.Integer(7), sp.Integer(24))
    return DerivedResult(True, "concept_cone_csa", geo.cone_csa(sp.Integer(7), l), "area", "22/7", required_numbers=["7", "24"])


def _derive_concept_4() -> DerivedResult:
    return DerivedResult(True, "concept_hollow_hemisphere_tsa", geo.hollow_hemisphere_tsa(sp.Integer(5), sp.Integer(3)), "area", "exact", required_numbers=["5", "3"])


def _derive_concept_5() -> DerivedResult:
    return DerivedResult(True, "concept_frustum_slant", geo.frustum_slant_height(sp.Integer(5), sp.Integer(2), sp.Integer(4)), "length", "exact", required_numbers=["4", "5", "2"])


def _derive_concept_6() -> DerivedResult:
    r, h = sp.symbols("r h", positive=True)
    return DerivedResult(True, "concept_cone_double_radius_scaling", sp.simplify(geo.cone_volume(2 * r, h) / geo.cone_volume(r, h)), None, "exact")


def _derive_concept_7() -> DerivedResult:
    return DerivedResult(True, "concept_sphere_volume_ratio", (sp.Integer(2) ** 3, sp.Integer(3) ** 3), None, "exact", required_numbers=["2", "3"])


def _derive_concept_8() -> DerivedResult:
    a, r = sp.symbols("a r", positive=True)
    return DerivedResult(True, "concept_cube_minus_hemisphere_sa", geo.cube_tsa(a) - sp.pi * r**2 + geo.hemisphere_csa(r), "area", "exact", required_numbers=["7"])


def _derive_concept_9() -> DerivedResult:
    n = geo.sphere_volume(sp.Integer(6)) / geo.sphere_volume(sp.Integer(2))
    return DerivedResult(True, "concept_sphere_recast_count", sp.simplify(n), None, "exact", required_numbers=["6", "2"])


DERIVATION_REGISTRY: Dict[str, Callable[[], DerivedResult]] = {
    "c10-7-ex7-1-q1": _derive_ex7_1_q1,
    "c10-7-ex7-1-q2": _derive_ex7_1_q2,
    "c10-7-ex7-1-q3": _derive_ex7_1_q3,
    "c10-7-ex7-1-q4": _derive_ex7_1_q4,
    "c10-7-ex7-1-q5": _derive_ex7_1_q5,
    "c10-7-ex7-1-q6": _derive_ex7_1_q6,
    "c10-7-ex7-1-q7": _derive_ex7_1_q7,
    "c10-7-ex7-1-q8": _derive_ex7_1_q8,
    "c10-7-ex7-1-q9": _derive_ex7_1_q9,
    "c10-7-ex7-1-q10": _derive_ex7_1_q10,
    "c10-7-ex7-2-q1": _derive_ex7_2_q1,
    "c10-7-ex7-2-q2": _derive_ex7_2_q2,
    "c10-7-ex7-2-q3": _derive_ex7_2_q3,
    "c10-7-ex7-2-q4": _derive_ex7_2_q4,
    "c10-7-ex7-2-q5": _derive_ex7_2_q5,
    "c10-7-ex7-2-q6": _derive_ex7_2_q6,
    "c10-7-ex7-2-q7": _derive_ex7_2_q7,
    "c10-7-ex7-2-q8": _derive_ex7_2_q8,
    "c10-7-ex7-2-q9": _derive_ex7_2_q9,
    "c10-7-ex7-2-q10": _derive_ex7_2_q10,
    "c10-7-ex7-3-q1": _derive_ex7_3_q1,
    "c10-7-ex7-3-q2": _derive_ex7_3_q2,
    "c10-7-ex7-3-q3": _derive_ex7_3_q3,
    "c10-7-ex7-3-q4": _derive_ex7_3_q4,
    "c10-7-ex7-3-q5": _derive_ex7_3_q5,
    "c10-7-ex7-3-q6": _derive_ex7_3_q6,
    "c10-7-ex7-3-q7-i": _derive_ex7_3_q7_i,
    "c10-7-ex7-3-q7-ii": _derive_ex7_3_q7_ii,
    "c10-7-ex7-3-q7-iii": _derive_ex7_3_q7_iii,
    "c10-7-ex7-4-q1": _derive_ex7_4_q1,
    "c10-7-ex7-4-q2": _derive_ex7_4_q2,
    "c10-7-ex7-4-q3": _derive_ex7_4_q3,
    "c10-7-ex7-4-q4": _derive_ex7_4_q4,
    "c10-7-ex7-4-q5": _derive_ex7_4_q5,
    "c10-7-ex7-4-q6": _derive_ex7_4_q6,
    "c10-7-ex7-4-q7": _derive_ex7_4_q7,
    "c10-7-ex7-4-q8": _derive_ex7_4_q8,
    "c10-7-ex7-5-q1": _derive_ex7_5_q1,
    "c10-7-ex7-5-q2": _derive_ex7_5_q2,
    "c10-7-ex7-5-q3": _derive_ex7_5_q3,
    "c10-7-ex7-5-q4": _derive_ex7_5_q4,
    "c10-7-ex7-5-q5": _derive_ex7_5_q5,
    "c10-7-ex7-5-q6": _derive_ex7_5_q6,
    "c10-7-ex7-5-q7": _derive_ex7_5_q7,
    "c10-7-ex7-5-q8": _derive_ex7_5_q8,
    "c10-7-ex7-5-q9": _derive_ex7_5_q9,
    "c10-7-ex7-5-q10": _derive_ex7_5_q10,
    "c10-7-ex7-5-q11": _derive_ex7_5_q11,
    "c10-7-ex7-5-q12": _derive_ex7_5_q12,
    "c10-7-ex7-5-q13": _derive_ex7_5_q13,
    "c10-7-ex7-5-q14": _derive_ex7_5_q14,
    "c10-7-ex7-5-q15": _derive_ex7_5_q15,
    "c10-7-unit-q1": _derive_unit_q1,
    "c10-7-unit-q2": _derive_unit_q2,
    "c10-7-unit-q3": _derive_unit_q3,
    "c10-7-unit-q4": _derive_unit_q4,
    "c10-7-unit-q5": _derive_unit_q5,
    "c10-7-unit-q6": _derive_unit_q6,
    "c10-7-unit-q7": _derive_unit_q7,
    "c10-7-unit-q8": _derive_unit_q8,
    "c10-7-unit-q9": _derive_unit_q9,
    "c10-7-unit-q10": _derive_unit_q10,
    "g10-ch7-solids-and-units": _derive_concept_1,
    "g10-ch7-cylinder-surface-area": _derive_concept_2,
    "g10-ch7-cone-slant-surface": _derive_concept_3,
    "g10-ch7-sphere-hemisphere-surface": _derive_concept_4,
    "g10-ch7-frustum-surface-volume": _derive_concept_5,
    "g10-ch7-volumes-cylinder-cone": _derive_concept_6,
    "g10-ch7-volumes-sphere-hemisphere": _derive_concept_7,
    "g10-ch7-combined-solids": _derive_concept_8,
    "g10-ch7-conversion-volume-conservation": _derive_concept_9,
}
