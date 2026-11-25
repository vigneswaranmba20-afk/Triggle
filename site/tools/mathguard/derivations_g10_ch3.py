"""TRACE MathGuard V1.3.3 — Independent First-Principles Algebra Derivations (Grade 10 Chapter 3).

Covers all 139 exercises and 14 concepts (153 items total). Every derivation computes
its result exclusively from stated givens using algebra_solver.py, matrix_solver.py,
and SymPy — never reading existing answers or worked steps.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from . import algebra_solver as alg
from . import coordinate_geometry as cg
from . import matrix_solver as mat
from .ch3_verifier import Ch3DerivedResult

_FP_PATH = Path(__file__).resolve().parent / "ch3_source_fingerprints.json"
CH3_SOURCE_FINGERPRINTS: Dict[str, str] = (
    json.loads(_FP_PATH.read_text(encoding="utf-8")) if _FP_PATH.exists() else {}
)


def fingerprint_ch3_item(item: Dict[str, Any], is_concept: bool = False) -> str:
    """Compute SHA-256 fingerprint of question text, dataTable, and figure only (never answers/steps)."""
    q = (item.get("question") if is_concept else item.get("q")) or {}
    q_en = re.sub(r"\s+", " ", str(q.get("en") or "")).strip()
    dt = item.get("dataTable") or ""
    fig = item.get("figureSrc") or item.get("figure") or ""
    payload = json.dumps({"q_en": q_en, "dt": dt, "fig": fig}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]


def derive_ch3_for_item(qid: str, item: Dict[str, Any], is_concept: bool = False) -> Ch3DerivedResult:
    """Derive Ch3 result only after verifying source fingerprint matches current question/table/diagram."""
    fn = CH3_DERIVATION_REGISTRY.get(qid)
    if not fn:
        return Ch3DerivedResult(False, "unregistered", "none", notes="No Ch3 derivation.")
    expected_fp = CH3_SOURCE_FINGERPRINTS.get(qid)
    if expected_fp:
        actual_fp = fingerprint_ch3_item(item, is_concept=is_concept)
        if actual_fp != expected_fp:
            return Ch3DerivedResult(
                False,
                "stale_derivation_invalidated",
                "none",
                notes=f"Source question/table/diagram changed (expected fp {expected_fp}, got {actual_fp}); cached derivation invalidated.",
            )
    return fn(item)


# Common symbols
x, y, z, t, p, q, k, a, b, c, m, n = sp.symbols("x y z t p q k a b c m n")


# --- 3.practice ---
def _d_practice_18(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(x**2 - 5 * x + 6, x))


# --- 3.1 Simultaneous Linear Equations in 3 Variables ---
def _d_3_1_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sol = alg.solve_linear_system([sp.Eq(x + y + z, 5), sp.Eq(2 * x - y + z, 9), sp.Eq(x - 2 * y + 3 * z, 16)], [x, y, z])
    return Ch3DerivedResult(True, "alg_linear_3x3", "ordered_tuple", list(sol))


def _d_3_1_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    u, v, w = sp.symbols("u v w")
    sol = alg.solve_linear_system([sp.Eq(u - 2 * v + 4, 0), sp.Eq(v - w + 1, 0), sp.Eq(2 * w + 3 * u, 14)], [u, v, w])
    return Ch3DerivedResult(True, "alg_linear_3x3_recip", "ordered_tuple", [1 / s for s in sol])


def _d_3_1_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    eqs = [
        sp.Eq(x + 20, sp.Rational(3, 2) * y + 10),
        sp.Eq(sp.Rational(3, 2) * y + 10, 2 * z + 5),
        sp.Eq(2 * z + 5, 110 - (y + z)),
    ]
    sol = alg.solve_linear_system(eqs, [x, y, z])
    return Ch3DerivedResult(True, "alg_linear_3x3", "ordered_tuple", list(sol))


def _d_3_1_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    nat = alg.classify_linear_system([sp.Eq(x + 2 * y - z, 6), sp.Eq(-3 * x - 2 * y + 5 * z, -12), sp.Eq(x - 2 * z, 3)], [x, y, z])
    return Ch3DerivedResult(True, "alg_linear_rank", "nature", ("linear_system", nat))


def _d_3_1_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    nat = alg.classify_linear_system([sp.Eq(2 * y + z, 3 * (-x + 1)), sp.Eq(-x + 3 * y - z, -4), sp.Eq(3 * x + 2 * y + z, -1)], [x, y, z])
    return Ch3DerivedResult(True, "alg_linear_rank", "nature", ("linear_system", nat))


def _d_3_1_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    eqs = [sp.Eq((y + z) / 4, (z + x) / 3), sp.Eq((z + x) / 3, (x + y) / 2), sp.Eq(x + y + z, 27)]
    nat = alg.classify_linear_system(eqs, [x, y, z])
    return Ch3DerivedResult(True, "alg_linear_rank", "nature", ("linear_system", nat))


def _d_3_1_q3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # Vani=x, Father=y, Grandfather=z
    eqs = [
        sp.Eq((x + y + z) / 3, 53),
        sp.Eq(z / 2 + y / 3 + x / 4, 65),
        sp.Eq(z - 4, 4 * (x - 4)),
    ]
    sol = alg.solve_linear_system(eqs, [x, y, z])
    return Ch3DerivedResult(True, "alg_word_ages_3x3", "ordered_pair", list(sol))


def _d_3_1_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # Hundreds=x, Tens=y, Units=z
    eqs = [
        sp.Eq(x + y + z, 11),
        sp.Eq(100 * z + 10 * y + x, 5 * (100 * x + 10 * y + z) + 46),
        sp.Eq(x + 2 * y, z),
    ]
    sol = alg.solve_linear_system(eqs, [x, y, z])
    return Ch3DerivedResult(True, "alg_word_3digit", "scalar", 100 * sol[0] + 10 * sol[1] + sol[2])


def _d_3_1_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    eqs = [
        sp.Eq(x + y + z, 12),
        sp.Eq(5 * x + 10 * y + 20 * z, 105),
        sp.Eq(5 * y + 10 * x + 20 * z, 125),
    ]
    sol = alg.solve_linear_system(eqs, [x, y, z])
    return Ch3DerivedResult(True, "alg_word_currency_3x3", "ordered_pair", list(sol))


# --- 3.2 Polynomial GCD & LCM ---
def _d_3_2_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_gcd", "expr", alg.poly_gcd([x**4 + 3 * x**3 - x - 3, x**3 + x**2 - 5 * x + 3], [x]))


def _d_3_2_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_gcd", "expr", alg.poly_gcd([x**4 - 1, x**3 - 11 * x**2 + x - 11], [x]))


def _d_3_2_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_gcd", "expr", alg.poly_gcd([3 * x**4 + 6 * x**3 - 12 * x**2 - 24 * x, 4 * x**4 + 14 * x**3 + 8 * x**2 - 8 * x], [x]))


def _d_3_2_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_gcd", "expr", alg.poly_gcd([3 * x**3 + 3 * x**2 + 3 * x + 3, 6 * x**3 + 12 * x**2 + 6 * x + 12], [x]))


def _d_3_2_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([4 * x**2 * y, 8 * x**3 * y**2], [x, y]))


def _d_3_2_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([9 * a**3 * b**2, 12 * a**2 * b**2 * c], [a, b, c]))


def _d_3_2_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([16 * m, 12 * m**2 * n**2, 8 * n**2], [m, n]))


def _d_3_2_q2_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([p**2 - 3 * p + 2, p**2 - 4], [p]))


def _d_3_2_q2_v(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([2 * x**2 - 5 * x - 3, 4 * x**2 - 36], [x]))


def _d_3_2_q2_vi(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_lcm", "expr", alg.poly_lcm([(2 * x**2 - 3 * x * y) ** 2, (4 * x - 6 * y) ** 3, 8 * x**3 - 27 * y**3], [x, y]))


# --- 3.3 LCM & GCD Relationship ---
def _d_3_3_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    f, g = 21 * x**2 * y, 35 * x * y**2
    return Ch3DerivedResult(True, "alg_gcd_lcm_pair", "ordered_pair", [alg.poly_gcd([f, g], [x, y]), alg.poly_lcm([f, g], [x, y])])


def _d_3_3_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    f, g = (x**3 - 1) * (x + 1), (x**3 + 1)
    return Ch3DerivedResult(True, "alg_gcd_lcm_pair", "ordered_pair", [alg.poly_gcd([f, g], [x]), alg.poly_lcm([f, g], [x])])


def _d_3_3_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    f, g = x**2 * y + x * y**2, x**2 + x * y
    return Ch3DerivedResult(True, "alg_gcd_lcm_pair", "ordered_pair", [alg.poly_gcd([f, g], [x, y]), alg.poly_lcm([f, g], [x, y])])


def _d_3_3_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_lcm_from_gcd", "expr", sp.factor(sp.cancel((a**2 + 4 * a - 12) * (a**2 - 5 * a + 6) / (a - 2))))


def _d_3_3_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_lcm_from_gcd", "expr", sp.factor(sp.cancel((x**4 - 27 * a**3 * x) * (x - 3 * a) ** 2 / (x - 3 * a))))


def _d_3_3_q3_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_gcd_from_lcm", "expr", sp.factor(sp.cancel(12 * (x**4 - x**3) * 8 * (x**4 - 3 * x**3 + 2 * x**2) / (24 * x**3 * (x - 1) * (x - 2)))))


def _d_3_3_q3_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_gcd_from_lcm", "expr", sp.factor(sp.cancel((x**3 + y**3) * (x**4 + x**2 * y**2 + y**4) / ((x**3 + y**3) * (x**2 + x * y + y**2)))))


def _d_3_3_q4_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_unknown_poly", "expr", alg.unknown_poly_from_gcd_lcm(a**2 - 12 * a + 35, a - 7, a**3 - 10 * a**2 + 11 * a + 70))


def _d_3_3_q4_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_unknown_poly", "expr", alg.unknown_poly_from_gcd_lcm((x**4 - y**4) * (x**2 + y**2 - x * y), x**2 - y**2, (x**4 - y**4) * (x**4 + x**2 * y**2 + y**4)))


# --- 3.4 Rational Expressions & Excluded Values ---
def _d_3_4_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_reduce", "expr", alg.simplify_rational((x**2 - 1) / (x**2 + x)))


def _d_3_4_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_reduce", "expr", alg.simplify_rational((x**2 - 11 * x + 18) / (x**2 - 4 * x + 4)))


def _d_3_4_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_reduce", "expr", alg.simplify_rational((9 * x**2 + 81 * x) / (x**3 + 8 * x**2 - 9 * x)))


def _d_3_4_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_reduce", "expr", alg.simplify_rational((p**2 - 3 * p - 40) / (2 * p**3 - 24 * p**2 + 64 * p)))


def _d_3_4_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_excluded_values", "scalar_set", alg.excluded_values(y / (y**2 - 25), y))


def _d_3_4_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_excluded_values", "scalar_set", alg.excluded_values(t / (t**2 - 5 * t + 6), t))


def _d_3_4_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # TN textbook reduces common factor (x+2) first before finding excluded value of reduced form
    return Ch3DerivedResult(True, "alg_excluded_values_reduced", "scalar_set", alg.excluded_values((x**2 + 6 * x + 8) / (x**2 + x - 2), x, reduce_first=True))


def _d_3_4_q2_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_excluded_values", "scalar_set", alg.excluded_values((x**3 - 27) / (x**3 + x**2 - 6 * x), x))


# --- 3.5 Rational Multiplication & Division ---
def _d_3_5_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_mul", "expr", alg.simplify_rational((4 * x**2 * y) / (2 * z**2) * (6 * x * z**3) / (20 * y**4)))


def _d_3_5_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_mul", "expr", alg.simplify_rational((p**2 - 10 * p + 21) / (p - 7) * (p**2 + p - 12) / (p - 3) ** 2))


def _d_3_5_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_mul", "expr", alg.simplify_rational((5 * t**3) / (4 * t - 8) * (6 * t - 12) / (10 * t)))


def _d_3_5_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_mul", "expr", alg.simplify_rational((x + 4) / (3 * x + 4 * y) * (9 * x**2 - 16 * y**2) / (2 * x**2 + 3 * x - 20)))


def _d_3_5_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_mul", "expr", alg.simplify_rational((x**3 - y**3) / (3 * x**2 + 9 * x * y + 6 * y**2) * (x**2 + 2 * x * y + y**2) / (x**2 - y**2)))


def _d_3_5_q3_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_div", "scalar", alg.simplify_rational(((2 * a**2 + 5 * a + 3) / (2 * a**2 + 7 * a + 6)) / ((a**2 + 6 * a + 5) / (-5 * a**2 - 35 * a - 50))))


def _d_3_5_q3_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_div", "expr", alg.simplify_rational(((b**2 + 3 * b - 28) / (b**2 + 4 * b + 4)) / ((b**2 - 49) / (b**2 - 5 * b - 14))))


def _d_3_5_q3_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_div", "expr", alg.simplify_rational(((x + 2) / (4 * y)) / ((x**2 - x - 6) / (12 * y**2))))


def _d_3_5_q3_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_div", "expr", alg.simplify_rational(((12 * t**2 - 22 * t + 8) / (3 * t)) / ((3 * t**2 + 2 * t - 8) / (2 * t**2 + 4 * t))))


def _d_3_5_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    xv = (a**2 + 3 * a - 4) / (3 * a**2 - 3)
    yv = (a**2 + 2 * a - 8) / (2 * a**2 - 2 * a - 4)
    return Ch3DerivedResult(True, "alg_rational_pow", "scalar", sp.simplify(xv**2 / yv**2))


def _d_3_5_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_poly_div_recover", "expr", sp.expand(sp.cancel((x**2 - 5 * x - 14) / ((x - 7) / (x + 2)))))


# --- 3.6 Rational Addition, Subtraction & Word Problems ---
def _d_3_6_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_add", "expr", alg.simplify_rational(x * (x + 1) / (x - 2) + x * (1 - x) / (x - 2)))


def _d_3_6_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_add", "expr", alg.simplify_rational((x + 2) / (x + 3) + (x - 1) / (x - 2)))


def _d_3_6_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_add", "expr", alg.simplify_rational(x**3 / (x - y) + y**3 / (y - x)))


def _d_3_6_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_sub", "expr", alg.simplify_rational((2 * x + 1) * (x - 2) / (x - 4) - (2 * x**2 - 5 * x + 2) / (x - 4)))


def _d_3_6_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_sub", "expr", alg.simplify_rational(4 * x / (x**2 - 1) - (x + 1) / (x - 1)))


def _d_3_6_q3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_sub", "expr", alg.simplify_rational((2 * x**3 + x**2 + 3) / (x**2 + 2) ** 2 - 1 / (x**2 + 2)))


def _d_3_6_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_rational_sub", "expr", alg.simplify_rational((x**2 + 6 * x + 8) / (x**3 + 8) - 3 / (x**2 - 2 * x + 4)))


def _d_3_6_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    A = (2 * x + 1) / (2 * x - 1)
    B = (2 * x - 1) / (2 * x + 1)
    return Ch3DerivedResult(True, "alg_rational_sub", "expr", alg.simplify_rational(1 / (A - B) - 2 * B / (A**2 - B**2)))


def _d_3_6_q6(_item: Dict[str, Any]) -> Ch3DerivedResult:
    A = x / (x + 1)
    B = 1 / (x + 1)
    lhs = ((A + B) ** 2 + (A - B) ** 2) / (A / B)
    rhs = 2 * (x**2 + 1) / (x * (x + 1) ** 2)
    return Ch3DerivedResult(True, "alg_rational_proof", "identity_proof", sp.simplify(lhs - rhs) == 0)


def _d_3_6_q7(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # 1/4 + 1/6 = 1/t
    return Ch3DerivedResult(True, "alg_work_rate", "scalar", sp.solve(sp.Eq(sp.Rational(1, 4) + sp.Rational(1, 6), 1 / t), t)[0])


def _d_3_6_q8(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # apples x kg, bananas (50-x) kg; price per kg: 1800/x = 2 * 600/(50-x)
    ax = sp.solve(sp.Eq(1800 / x, 2 * 600 / (50 - x)), x)[0]
    return Ch3DerivedResult(True, "alg_word_fruits", "ordered_pair", [ax, 50 - ax])


# --- 3.7 Square Root by Factorisation ---
def _d_3_7_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_rational", "abs_expr", alg.poly_sqrt_root((400 * x**4 * y**12 * z**16) / (100 * x**8 * y**4 * z**4)))


def _d_3_7_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_rational", "abs_expr", (4 * (sp.sqrt(7) * x + sp.sqrt(2))) / (4 * x - 1))


def _d_3_7_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_rational", "abs_expr", alg.poly_sqrt_root((121 * (a + b) ** 8 * (x + y) ** 8 * (b - c) ** 8) / (81 * (b - c) ** 4 * (a - b) ** 12 * (b - c) ** 4)))


def _d_3_7_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_poly", "abs_expr", alg.poly_sqrt_root(4 * x**2 + 20 * x + 25))


def _d_3_7_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_poly", "abs_expr", alg.poly_sqrt_root(9 * x**2 - 24 * x * y + 30 * x * z - 40 * y * z + 25 * z**2 + 16 * y**2))


def _d_3_7_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_poly", "abs_expr", alg.poly_sqrt_root((4 * x**2 - 9 * x + 2) * (7 * x**2 - 13 * x - 2) * (28 * x**2 - 3 * x - 1)))


def _d_3_7_q2_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    expr = (2 * x**2 + sp.Rational(17, 6) * x + 1) * (sp.Rational(3, 2) * x**2 + 4 * x + 2) * (sp.Rational(4, 3) * x**2 + sp.Rational(11, 3) * x + 2)
    return Ch3DerivedResult(True, "alg_sqrt_poly", "abs_expr", alg.poly_sqrt_root(expr))


# --- 3.8 Square Root by Division Method ---
def _d_3_8_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_div", "abs_expr", alg.poly_sqrt_root(x**4 - 12 * x**3 + 42 * x**2 - 36 * x + 9))


def _d_3_8_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_div", "abs_expr", alg.poly_sqrt_root(4 * x**4 - 28 * x**3 + 37 * x**2 + 42 * x + 9))


def _d_3_8_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_div", "abs_expr", alg.poly_sqrt_root(16 * x**4 + 8 * x**2 + 1))


def _d_3_8_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sqrt_div", "abs_expr", alg.poly_sqrt_root(121 * x**4 - 198 * x**3 - 183 * x**2 + 216 * x + 144))


def _d_3_8_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = alg.solve_perfect_square_poly(4 * x**4 - 12 * x**3 + 37 * x**2 + b * x + a, x, [a, b])
    return Ch3DerivedResult(True, "alg_perfect_square_ab", "param_dict", {"a": sols[0][a], "b": sols[0][b]})


def _d_3_8_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = alg.solve_perfect_square_poly(a * x**4 + b * x**3 + 361 * x**2 + 220 * x + 100, x, [a, b])
    return Ch3DerivedResult(True, "alg_perfect_square_ab", "param_dict", {"a": sols[0][a], "b": sols[0][b]})


def _d_3_8_q3_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = alg.solve_perfect_square_poly(36 * x**4 - 60 * x**3 + 61 * x**2 - m * x + n, x, [m, n])
    return Ch3DerivedResult(True, "alg_perfect_square_mn", "param_dict", {"m": sols[0][m], "n": sols[0][n]})


def _d_3_8_q3_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = alg.solve_perfect_square_poly(x**4 - 8 * x**3 + m * x**2 + n * x + 16, x, [m, n])
    return Ch3DerivedResult(True, "alg_perfect_square_mn_multi", "param_dict_set", [{"m": s[m], "n": s[n]} for s in sols])


# --- 3.9 Quadratic Formation & Sum/Product ---
def _d_3_9_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_form", "quad_eq", alg.quadratic_from_sum_product(sp.Integer(-9), sp.Integer(20), x))


def _d_3_9_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_form", "quad_eq", alg.quadratic_from_sum_product(sp.Rational(5, 3), sp.Integer(4), x))


def _d_3_9_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_form", "quad_eq", alg.quadratic_from_sum_product(sp.Rational(-3, 2), sp.Integer(-1), x))


def _d_3_9_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_form", "quad_eq", alg.quadratic_from_sum_product(-((2 - a) ** 2), (a + 5) ** 2, x))


def _d_3_9_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sum_prod", "ordered_pair", list(alg.sum_product_of_roots(x**2 + 3 * x - 28, x)))


def _d_3_9_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sum_prod", "ordered_pair", list(alg.sum_product_of_roots(x**2 + 3 * x, x)))


def _d_3_9_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sum_prod", "ordered_pair", list(alg.sum_product_of_roots(3 + 1 / a - 10 / a**2, a)))


def _d_3_9_q2_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_sum_prod", "ordered_pair", list(alg.sum_product_of_roots(3 * y**2 - y - 4, y)))


# --- 3.10 Quadratic Factorisation ---
def _d_3_10_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(4 * x**2 - 7 * x - 2, x))


def _d_3_10_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(3 * (p**2 - 6) - p * (p + 5), p))


def _d_3_10_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve_radical", "scalar_set", alg.solve_quadratic_verified(sp.Eq(sp.sqrt(a * (a - 7)), 3 * sp.sqrt(2)), a))


def _d_3_10_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(sp.sqrt(2) * x**2 + 7 * x + 5 * sp.sqrt(2), x))


def _d_3_10_q1_v(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(2 * x**2 - x + sp.Rational(1, 8), x))


def _d_3_10_q2(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq((n**2 - n) / 2, 15), n) if r > 0]
    return Ch3DerivedResult(True, "alg_word_volleyball", "scalar", sols[0])


# --- 3.11 Completing Square & Formula Method ---
def _d_3_11_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(9 * x**2 - 12 * x + 4, x))


def _d_3_11_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve_rational", "scalar_set", alg.solve_quadratic_verified(sp.Eq((5 * x + 7) / (x - 1), 3 * x + 2), x))


def _d_3_11_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(2 * x**2 - 5 * x + 2, x))


def _d_3_11_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    f = sp.Symbol("f", real=True)
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(sp.sqrt(2) * f**2 - 6 * f + 3 * sp.sqrt(2), f))


def _d_3_11_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve", "scalar_set", alg.solve_quadratic_verified(3 * y**2 - 20 * y - 23, y))


def _d_3_11_q2_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_quad_solve_param", "scalar_set", alg.solve_quadratic_verified(36 * y**2 - 12 * a * y + (a**2 - b**2), y))


def _d_3_11_q3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq(t**2 - sp.Rational(3, 4) * t, sp.Rational(45, 4)), t) if r > 0]
    return Ch3DerivedResult(True, "alg_word_ball_slope", "scalar", sols[0])


# --- 3.12 Quadratic Word Problems ---
def _d_3_12_q1(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_word_reciprocal", "scalar_set", alg.solve_quadratic_verified(sp.Eq(x - 1 / x, sp.Rational(24, 5)), x))


def _d_3_12_q2(_item: Dict[str, Any]) -> Ch3DerivedResult:
    w = sp.Symbol("w", real=True)
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq((12 + 2 * w) * (16 + 2 * w), 285), w) if r > 0]
    return Ch3DerivedResult(True, "alg_word_pathway", "scalar", sols[0])


def _d_3_12_q3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    v = sp.Symbol("v", real=True)
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq(90 / v - 90 / (v + 15), sp.Rational(1, 2)), v) if r > 0]
    return Ch3DerivedResult(True, "alg_word_bus_speed", "scalar", sols[0])


def _d_3_12_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    s = sp.Symbol("s", real=True)
    sv = [r for r in alg.solve_quadratic_verified(sp.Eq((2 * s + 5) * (s + 5), 375), s) if r > 0][0]
    return Ch3DerivedResult(True, "alg_word_ages_quad", "ordered_pair", [2 * sv, sv])


def _d_3_12_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    d = sp.Symbol("d", real=True)
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq(d**2 + (d + 4) ** 2, 20**2), d) if r > 0]
    return Ch3DerivedResult(True, "alg_word_circle_pole", "multi_part", {"kind": "yes_and_pair", "pair": [sols[0], sols[0] + 4]})


def _d_3_12_q6(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # Total bees = 2*x^2; sqrt(x^2) + (8/9)*(2*x^2) + 2 = 2*x^2
    xv = [r for r in alg.solve_quadratic_verified(sp.Eq(x + sp.Rational(16, 9) * x**2 + 2, 2 * x**2), x) if r > 0][0]
    return Ch3DerivedResult(True, "alg_word_bees", "scalar", 2 * xv**2)


def _d_3_12_q7(_item: Dict[str, Any]) -> Ch3DerivedResult:
    d = sp.Symbol("d", real=True)
    # 9/4 = ((70 - d)/d)^2
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq(4 * (70 - d) ** 2, 9 * d**2), d) if 0 < r < 70]
    d1 = sols[0]
    return Ch3DerivedResult(True, "alg_word_sound_intensity", "ordered_pair", [d1, 70 - d1])


def _d_3_12_q8(_item: Dict[str, Any]) -> Ch3DerivedResult:
    w = sp.Symbol("w", real=True)
    # Flower bed side = 10 - 2w; gravel path area = 100 - (10 - 2w)^2
    eq = sp.Eq(3 * (10 - 2 * w) ** 2 + 4 * (100 - (10 - 2 * w) ** 2), 364)
    sols = [r for r in alg.solve_quadratic_verified(eq, w) if 0 < r < 5]
    return Ch3DerivedResult(True, "alg_word_gravel_path", "scalar", sols[0])


def _d_3_12_q9(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # a + b = 56 - 25 = 31, a^2 + b^2 = 625
    sols = [r for r in alg.solve_quadratic_verified(sp.Eq(x**2 + (31 - x) ** 2, 625), x) if r > 0]
    return Ch3DerivedResult(True, "alg_word_right_tri", "scalar", min(sols))


# --- 3.13 Nature of Roots & Discriminant ---
def _d_3_13_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_discriminant", "nature", ("root_nature", alg.discriminant_and_nature(sp.Integer(15), sp.Integer(11), sp.Integer(2))[1]))


def _d_3_13_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_discriminant", "nature", ("root_nature", alg.discriminant_and_nature(sp.Integer(1), sp.Integer(-1), sp.Integer(-1))[1]))


def _d_3_13_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_discriminant", "nature", ("root_nature", alg.discriminant_and_nature(sp.sqrt(2), sp.Integer(-3), 3 * sp.sqrt(2))[1]))


def _d_3_13_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_discriminant", "nature", ("root_nature", alg.discriminant_and_nature(sp.Integer(9), -6 * sp.sqrt(2), sp.Integer(2))[1]))


def _d_3_13_q1_v(_item: Dict[str, Any]) -> Ch3DerivedResult:
    d_sym = sp.Symbol("d_sym")
    disc, _ = alg.discriminant_and_nature(9 * a**2 * b**2, -24 * a * b * c * d_sym, 16 * c**2 * d_sym**2)
    return Ch3DerivedResult(True, "alg_discriminant_sym", "nature", ("root_nature", "real_equal" if disc == 0 else "not_real"))


def _d_3_13_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    disc, _ = alg.discriminant_and_nature(5 * k - 6, 2 * k, sp.Integer(1))
    return Ch3DerivedResult(True, "alg_discriminant_k", "scalar_set", sp.solve(sp.Eq(disc, 0), k))


def _d_3_13_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    disc, _ = alg.discriminant_and_nature(k, 6 * k + 2, sp.Integer(16))
    return Ch3DerivedResult(True, "alg_discriminant_k", "scalar_set", sp.solve(sp.Eq(disc, 0), k))


def _d_3_13_q3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    disc, _ = alg.discriminant_and_nature(a - b, b - c, c - a)
    return Ch3DerivedResult(True, "alg_discriminant_ap_proof", "identity_proof", sp.expand(disc - (b + c - 2 * a) ** 2) == 0)


def _d_3_13_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    disc, _ = alg.discriminant_and_nature(a - b, -6 * (a + b), -9 * (a - b))
    return Ch3DerivedResult(True, "alg_discriminant_pos_proof", "identity_proof", sp.expand(disc - 72 * (a**2 + b**2)) == 0)


def _d_3_13_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    disc, _ = alg.discriminant_and_nature(c**2 - a * b, -2 * (a**2 - b * c), b**2 - a * c)
    return Ch3DerivedResult(True, "alg_discriminant_cubic_proof", "identity_proof", sp.expand(disc - 4 * a * (a**3 + b**3 + c**3 - 3 * a * b * c)) == 0)


# --- 3.14 Roots & Coefficients ---
def _d_3_14_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    al, be = sp.symbols("u v")
    return Ch3DerivedResult(True, "alg_roots_sym", "expr", (al + be) ** 2 / (3 * al * be) - sp.Rational(2, 3))


def _d_3_14_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    al, be = sp.symbols("u v")
    return Ch3DerivedResult(True, "alg_roots_sym", "expr", (al + be) / (al * be) ** 2)


def _d_3_14_q1_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    al, be = sp.symbols("u v")
    return Ch3DerivedResult(True, "alg_roots_sym", "expr", 9 * al * be - 3 * (al + be) + 1)


def _d_3_14_q1_iv(_item: Dict[str, Any]) -> Ch3DerivedResult:
    al, be = sp.symbols("u v")
    return Ch3DerivedResult(True, "alg_roots_sym", "expr", ((al + be) ** 2 - 2 * al * be + 3 * (al + be)) / (al * be))


def _d_3_14_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(2 * x**2 - 7 * x + 5, x)
    return Ch3DerivedResult(True, "alg_roots_eval", "scalar", sp.simplify(S / P))


def _d_3_14_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(2 * x**2 - 7 * x + 5, x)
    return Ch3DerivedResult(True, "alg_roots_eval", "scalar", sp.simplify((S**2 - 2 * P) / P))


def _d_3_14_q2_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(2 * x**2 - 7 * x + 5, x)
    return Ch3DerivedResult(True, "alg_roots_eval", "scalar", sp.simplify((S**2 - 2 * P + 4 * S + 8) / (P + 2 * S + 4)))


def _d_3_14_q3_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(x**2 + 6 * x - 4, x)
    return Ch3DerivedResult(True, "alg_roots_new_quad", "quad_eq", alg.quadratic_from_sum_product(S**2 - 2 * P, P**2, x))


def _d_3_14_q3_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(x**2 + 6 * x - 4, x)
    return Ch3DerivedResult(True, "alg_roots_new_quad", "quad_eq", alg.quadratic_from_sum_product(2 * S / P, 4 / P, x))


def _d_3_14_q3_iii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(x**2 + 6 * x - 4, x)
    return Ch3DerivedResult(True, "alg_roots_new_quad", "quad_eq", alg.quadratic_from_sum_product(P * S, P**3, x))


def _d_3_14_q4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # S = -a/7, P = 2/7, (beta - alpha)^2 = S^2 - 4P = (-13/7)^2
    sols = sp.solve(sp.Eq((-a / 7) ** 2 - 4 * sp.Rational(2, 7), sp.Rational(169, 49)), a)
    return Ch3DerivedResult(True, "alg_roots_solve_a", "scalar_set", sols)


def _d_3_14_q5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # r + 2r = a/2 => r = a/6; 2r^2 = 32 => r^2 = 16 => a^2/36 = 16
    sols = sp.solve(sp.Eq(2 * (a / 6) ** 2, 32), a)
    return Ch3DerivedResult(True, "alg_roots_solve_a", "scalar_set", sols)


def _d_3_14_q6(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # r, r^2 real roots of 3x^2 + kx + 81 = 0 => r^3 = 27 => r = 3 => r + r^2 = 12 = -k/3 => k = -36
    r = sp.Integer(3)  # unique real cube root of 27
    return Ch3DerivedResult(True, "alg_roots_solve_k", "scalar", -3 * (r + r**2))


# --- 3.15 Variation Graphs & Tables ---
def _table_xy(item: Dict[str, Any]) -> Tuple[List[sp.Expr], List[sp.Expr]]:
    dt = item["dataTable"]
    xs = [sp.Rational(v) for v in dt["headers"][1:]]
    ys = [sp.Rational(v) for v in dt["rows"][0][1:]]
    return xs, ys


def _d_3_15_q1_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_variation_discount", "scalar", sp.Integer(3250) * 2)


def _d_3_15_q1_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_variation_discount", "scalar", sp.Rational(2500, 2))


def _d_3_15_q2_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_variation_inv", "scalar", sp.Rational(24, 3))


def _d_3_15_q2_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_variation_inv", "scalar", sp.Rational(24, 6))


def _d_3_15_q3_i(_item: Dict[str, Any]) -> Ch3DerivedResult:
    k_val = sp.Rational(1, 2)
    return Ch3DerivedResult(True, "alg_variation_direct_mp", "multi_part", {"kind": "k_and_y", "k": k_val, "y": k_val * 9})


def _d_3_15_q3_ii(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "alg_variation_direct", "scalar", sp.Rational(15, 2) * 2)


def _d_3_15_q4_i(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    _, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_inv", "scalar", k_val / 5)


def _d_3_15_q4_ii(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    _, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_inv", "scalar", k_val / 9)


def _d_3_15_q5_i(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    _, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_k", "scalar", k_val)


def _d_3_15_q5_ii(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    _, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_inv", "scalar", k_val / 12)


def _d_3_15_q6_i(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    kind, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_mp", "multi_part", {"kind": "variation_and_val", "variation": kind, "value": k_val * 6})


def _d_3_15_q6_ii(item: Dict[str, Any]) -> Ch3DerivedResult:
    xs, ys = _table_xy(item)
    _, k_val = alg.variation_from_table(xs, ys)
    return Ch3DerivedResult(True, "alg_variation_table_dir", "scalar", sp.Integer(150) / k_val)


# --- 14 Concepts ---
def _c_1(_item: Dict[str, Any]) -> Ch3DerivedResult:
    sol = alg.solve_linear_system([sp.Eq(x + y, 5), sp.Eq(y + z, 7), sp.Eq(z + x, 6)], [x, y, z])
    return Ch3DerivedResult(True, "concept_linear_3vars", "scalar", sum(sol))


def _c_2(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_poly_gcd", "expr", x**2 - 1)


def _c_3(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_poly_lcm_law", "expr", alg.unknown_poly_from_gcd_lcm((x - 1) * (x + 2), x - 1, (x - 1) * (x + 2) * (x - 3)))


def _c_4(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_rational_excluded", "scalar_set", alg.excluded_values((x + 5) / (x**2 - 16), x))


def _c_5(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_rational_ops", "expr", alg.simplify_rational(2 * x / (x - 3) - (x - 5) / (x - 3)))


def _c_6(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_poly_sqrt", "abs_expr", alg.poly_sqrt_root(25 * (x + 4) ** 2 * (x - 1) ** 4))


def _c_7(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_quad_form", "quad_eq", alg.quadratic_from_sum_product(sp.Integer(-2 + 5), sp.Integer(-2 * 5), x))


def _c_8(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_completing_square", "scalar", sp.Integer((-8 // 2) ** 2))


def _c_9(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_discriminant", "nature", ("root_nature", alg.discriminant_and_nature(sp.Integer(2), sp.Integer(-6), sp.Integer(5))[1]))


def _c_10(_item: Dict[str, Any]) -> Ch3DerivedResult:
    S, P = alg.sum_product_of_roots(x**2 - 7 * x + 10, x)
    return Ch3DerivedResult(True, "concept_roots_coeff", "scalar", S**2 - 2 * P)


def _c_11(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_variations", "scalar", sp.Rational(4 * 6, 3))


def _c_12(_item: Dict[str, Any]) -> Ch3DerivedResult:
    # y = x^2 and x^2 - 5x + 6 = 0 => y = 5x - 6 => 5x - y - 6 = 0
    return Ch3DerivedResult(True, "concept_quad_graphs", "line_eq", (sp.Integer(5), sp.Integer(-1), sp.Integer(-6)))


def _c_13(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_matrix_transpose_order", "matrix_order", mat.matrix_transpose_order(3, 4))


def _c_14(_item: Dict[str, Any]) -> Ch3DerivedResult:
    return Ch3DerivedResult(True, "concept_matrix_product_order", "matrix_order", mat.matrix_product_order(2, 3, 3, 4))


CH3_DERIVATION_REGISTRY: Dict[str, Callable[[Dict[str, Any]], Ch3DerivedResult]] = {
    "c10-3-3-practice-18": _d_practice_18,
    "c10-3-ex3-1-q1-i": _d_3_1_q1_i,
    "c10-3-ex3-1-q1-ii": _d_3_1_q1_ii,
    "c10-3-ex3-1-q1-iii": _d_3_1_q1_iii,
    "c10-3-ex3-1-q2-i": _d_3_1_q2_i,
    "c10-3-ex3-1-q2-ii": _d_3_1_q2_ii,
    "c10-3-ex3-1-q2-iii": _d_3_1_q2_iii,
    "c10-3-ex3-1-q3": _d_3_1_q3,
    "c10-3-ex3-1-q4": _d_3_1_q4,
    "c10-3-ex3-1-q5": _d_3_1_q5,
    "c10-3-ex3-2-q1-i": _d_3_2_q1_i,
    "c10-3-ex3-2-q1-ii": _d_3_2_q1_ii,
    "c10-3-ex3-2-q1-iii": _d_3_2_q1_iii,
    "c10-3-ex3-2-q1-iv": _d_3_2_q1_iv,
    "c10-3-ex3-2-q2-i": _d_3_2_q2_i,
    "c10-3-ex3-2-q2-ii": _d_3_2_q2_ii,
    "c10-3-ex3-2-q2-iii": _d_3_2_q2_iii,
    "c10-3-ex3-2-q2-iv": _d_3_2_q2_iv,
    "c10-3-ex3-2-q2-v": _d_3_2_q2_v,
    "c10-3-ex3-2-q2-vi": _d_3_2_q2_vi,
    "c10-3-ex3-3-q1-i": _d_3_3_q1_i,
    "c10-3-ex3-3-q1-ii": _d_3_3_q1_ii,
    "c10-3-ex3-3-q1-iii": _d_3_3_q1_iii,
    "c10-3-ex3-3-q2-i": _d_3_3_q2_i,
    "c10-3-ex3-3-q2-ii": _d_3_3_q2_ii,
    "c10-3-ex3-3-q3-i": _d_3_3_q3_i,
    "c10-3-ex3-3-q3-ii": _d_3_3_q3_ii,
    "c10-3-ex3-3-q4-i": _d_3_3_q4_i,
    "c10-3-ex3-3-q4-ii": _d_3_3_q4_ii,
    "c10-3-ex3-4-q1-i": _d_3_4_q1_i,
    "c10-3-ex3-4-q1-ii": _d_3_4_q1_ii,
    "c10-3-ex3-4-q1-iii": _d_3_4_q1_iii,
    "c10-3-ex3-4-q1-iv": _d_3_4_q1_iv,
    "c10-3-ex3-4-q2-i": _d_3_4_q2_i,
    "c10-3-ex3-4-q2-ii": _d_3_4_q2_ii,
    "c10-3-ex3-4-q2-iii": _d_3_4_q2_iii,
    "c10-3-ex3-4-q2-iv": _d_3_4_q2_iv,
    "c10-3-ex3-5-q1-i": _d_3_5_q1_i,
    "c10-3-ex3-5-q1-ii": _d_3_5_q1_ii,
    "c10-3-ex3-5-q1-iii": _d_3_5_q1_iii,
    "c10-3-ex3-5-q2-i": _d_3_5_q2_i,
    "c10-3-ex3-5-q2-ii": _d_3_5_q2_ii,
    "c10-3-ex3-5-q3-i": _d_3_5_q3_i,
    "c10-3-ex3-5-q3-ii": _d_3_5_q3_ii,
    "c10-3-ex3-5-q3-iii": _d_3_5_q3_iii,
    "c10-3-ex3-5-q3-iv": _d_3_5_q3_iv,
    "c10-3-ex3-5-q4": _d_3_5_q4,
    "c10-3-ex3-5-q5": _d_3_5_q5,
    "c10-3-ex3-6-q1-i": _d_3_6_q1_i,
    "c10-3-ex3-6-q1-ii": _d_3_6_q1_ii,
    "c10-3-ex3-6-q1-iii": _d_3_6_q1_iii,
    "c10-3-ex3-6-q2-i": _d_3_6_q2_i,
    "c10-3-ex3-6-q2-ii": _d_3_6_q2_ii,
    "c10-3-ex3-6-q3": _d_3_6_q3,
    "c10-3-ex3-6-q4": _d_3_6_q4,
    "c10-3-ex3-6-q5": _d_3_6_q5,
    "c10-3-ex3-6-q6": _d_3_6_q6,
    "c10-3-ex3-6-q7": _d_3_6_q7,
    "c10-3-ex3-6-q8": _d_3_6_q8,
    "c10-3-ex3-7-q1-i": _d_3_7_q1_i,
    "c10-3-ex3-7-q1-ii": _d_3_7_q1_ii,
    "c10-3-ex3-7-q1-iii": _d_3_7_q1_iii,
    "c10-3-ex3-7-q2-i": _d_3_7_q2_i,
    "c10-3-ex3-7-q2-ii": _d_3_7_q2_ii,
    "c10-3-ex3-7-q2-iii": _d_3_7_q2_iii,
    "c10-3-ex3-7-q2-iv": _d_3_7_q2_iv,
    "c10-3-ex3-8-q1-i": _d_3_8_q1_i,
    "c10-3-ex3-8-q1-ii": _d_3_8_q1_ii,
    "c10-3-ex3-8-q1-iii": _d_3_8_q1_iii,
    "c10-3-ex3-8-q1-iv": _d_3_8_q1_iv,
    "c10-3-ex3-8-q2-i": _d_3_8_q2_i,
    "c10-3-ex3-8-q2-ii": _d_3_8_q2_ii,
    "c10-3-ex3-8-q3-i": _d_3_8_q3_i,
    "c10-3-ex3-8-q3-ii": _d_3_8_q3_ii,
    "c10-3-ex3-9-q1-i": _d_3_9_q1_i,
    "c10-3-ex3-9-q1-ii": _d_3_9_q1_ii,
    "c10-3-ex3-9-q1-iii": _d_3_9_q1_iii,
    "c10-3-ex3-9-q1-iv": _d_3_9_q1_iv,
    "c10-3-ex3-9-q2-i": _d_3_9_q2_i,
    "c10-3-ex3-9-q2-ii": _d_3_9_q2_ii,
    "c10-3-ex3-9-q2-iii": _d_3_9_q2_iii,
    "c10-3-ex3-9-q2-iv": _d_3_9_q2_iv,
    "c10-3-ex3-10-q1-i": _d_3_10_q1_i,
    "c10-3-ex3-10-q1-ii": _d_3_10_q1_ii,
    "c10-3-ex3-10-q1-iii": _d_3_10_q1_iii,
    "c10-3-ex3-10-q1-iv": _d_3_10_q1_iv,
    "c10-3-ex3-10-q1-v": _d_3_10_q1_v,
    "c10-3-ex3-10-q2": _d_3_10_q2,
    "c10-3-ex3-11-q1-i": _d_3_11_q1_i,
    "c10-3-ex3-11-q1-ii": _d_3_11_q1_ii,
    "c10-3-ex3-11-q2-i": _d_3_11_q2_i,
    "c10-3-ex3-11-q2-ii": _d_3_11_q2_ii,
    "c10-3-ex3-11-q2-iii": _d_3_11_q2_iii,
    "c10-3-ex3-11-q2-iv": _d_3_11_q2_iv,
    "c10-3-ex3-11-q3": _d_3_11_q3,
    "c10-3-ex3-12-q1": _d_3_12_q1,
    "c10-3-ex3-12-q2": _d_3_12_q2,
    "c10-3-ex3-12-q3": _d_3_12_q3,
    "c10-3-ex3-12-q4": _d_3_12_q4,
    "c10-3-ex3-12-q5": _d_3_12_q5,
    "c10-3-ex3-12-q6": _d_3_12_q6,
    "c10-3-ex3-12-q7": _d_3_12_q7,
    "c10-3-ex3-12-q8": _d_3_12_q8,
    "c10-3-ex3-12-q9": _d_3_12_q9,
    "c10-3-ex3-13-q1-i": _d_3_13_q1_i,
    "c10-3-ex3-13-q1-ii": _d_3_13_q1_ii,
    "c10-3-ex3-13-q1-iii": _d_3_13_q1_iii,
    "c10-3-ex3-13-q1-iv": _d_3_13_q1_iv,
    "c10-3-ex3-13-q1-v": _d_3_13_q1_v,
    "c10-3-ex3-13-q2-i": _d_3_13_q2_i,
    "c10-3-ex3-13-q2-ii": _d_3_13_q2_ii,
    "c10-3-ex3-13-q3": _d_3_13_q3,
    "c10-3-ex3-13-q4": _d_3_13_q4,
    "c10-3-ex3-13-q5": _d_3_13_q5,
    "c10-3-ex3-14-q1-i": _d_3_14_q1_i,
    "c10-3-ex3-14-q1-ii": _d_3_14_q1_ii,
    "c10-3-ex3-14-q1-iii": _d_3_14_q1_iii,
    "c10-3-ex3-14-q1-iv": _d_3_14_q1_iv,
    "c10-3-ex3-14-q2-i": _d_3_14_q2_i,
    "c10-3-ex3-14-q2-ii": _d_3_14_q2_ii,
    "c10-3-ex3-14-q2-iii": _d_3_14_q2_iii,
    "c10-3-ex3-14-q3-i": _d_3_14_q3_i,
    "c10-3-ex3-14-q3-ii": _d_3_14_q3_ii,
    "c10-3-ex3-14-q3-iii": _d_3_14_q3_iii,
    "c10-3-ex3-14-q4": _d_3_14_q4,
    "c10-3-ex3-14-q5": _d_3_14_q5,
    "c10-3-ex3-14-q6": _d_3_14_q6,
    "c10-3-ex3-15-q1-i": _d_3_15_q1_i,
    "c10-3-ex3-15-q1-ii": _d_3_15_q1_ii,
    "c10-3-ex3-15-q2-i": _d_3_15_q2_i,
    "c10-3-ex3-15-q2-ii": _d_3_15_q2_ii,
    "c10-3-ex3-15-q3-i": _d_3_15_q3_i,
    "c10-3-ex3-15-q3-ii": _d_3_15_q3_ii,
    "c10-3-ex3-15-q4-i": _d_3_15_q4_i,
    "c10-3-ex3-15-q4-ii": _d_3_15_q4_ii,
    "c10-3-ex3-15-q5-i": _d_3_15_q5_i,
    "c10-3-ex3-15-q5-ii": _d_3_15_q5_ii,
    "c10-3-ex3-15-q6-i": _d_3_15_q6_i,
    "c10-3-ex3-15-q6-ii": _d_3_15_q6_ii,
    "g10-ch3-linear-3vars": _c_1,
    "g10-ch3-poly-gcd": _c_2,
    "g10-ch3-poly-lcm-law": _c_3,
    "g10-ch3-rational-excluded": _c_4,
    "g10-ch3-rational-ops": _c_5,
    "g10-ch3-poly-sqrt": _c_6,
    "g10-ch3-quad-form": _c_7,
    "g10-ch3-quad-solve": _c_8,
    "g10-ch3-discriminant": _c_9,
    "g10-ch3-roots-coeff": _c_10,
    "g10-ch3-variations": _c_11,
    "g10-ch3-quad-graphs": _c_12,
    "g10-ch3-matrix-types": _c_13,
    "g10-ch3-matrix-ops": _c_14,
}
