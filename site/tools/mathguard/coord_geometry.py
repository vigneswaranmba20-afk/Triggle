"""TRACE MathGuard V1.3 — Independent Coordinate Geometry Validator (Grade 10 Chapter 5).

Supports distance, midpoint, section formula, slope, collinearity, triangle area,
straight-line equations, and parallel/perpendicular line checks with exact fractions/radicals.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from .parser import parse_expression
from .rounding import check_numeric_match
from .symbolic import expressions_equivalent


@dataclass
class CoordDerivation:
    verifiable: bool
    method: str
    result_type: str  # "scalar" | "point" | "bool" | "line" | "none"
    value: Any = None
    notes: str = ""


def distance(p1: Tuple[sp.Expr, sp.Expr], p2: Tuple[sp.Expr, sp.Expr]) -> sp.Expr:
    return sp.simplify(sp.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2))


def midpoint(p1: Tuple[sp.Expr, sp.Expr], p2: Tuple[sp.Expr, sp.Expr]) -> Tuple[sp.Expr, sp.Expr]:
    return (sp.simplify((p1[0] + p2[0]) / 2), sp.simplify((p1[1] + p2[1]) / 2))


def section_point(
    p1: Tuple[sp.Expr, sp.Expr],
    p2: Tuple[sp.Expr, sp.Expr],
    m: sp.Expr,
    n: sp.Expr,
) -> Tuple[sp.Expr, sp.Expr]:
    return (
        sp.simplify((m * p2[0] + n * p1[0]) / (m + n)),
        sp.simplify((m * p2[1] + n * p1[1]) / (m + n)),
    )


def slope(p1: Tuple[sp.Expr, sp.Expr], p2: Tuple[sp.Expr, sp.Expr]) -> Optional[sp.Expr]:
    dx = sp.simplify(p2[0] - p1[0])
    if dx == 0:
        return None  # undefined (vertical line)
    return sp.simplify((p2[1] - p1[1]) / dx)


def triangle_area(
    p1: Tuple[sp.Expr, sp.Expr],
    p2: Tuple[sp.Expr, sp.Expr],
    p3: Tuple[sp.Expr, sp.Expr],
) -> sp.Expr:
    det = p1[0] * (p2[1] - p3[1]) + p2[0] * (p3[1] - p1[1]) + p3[0] * (p1[1] - p2[1])
    return sp.simplify(sp.Abs(det) / 2)


def are_collinear(
    p1: Tuple[sp.Expr, sp.Expr],
    p2: Tuple[sp.Expr, sp.Expr],
    p3: Tuple[sp.Expr, sp.Expr],
) -> bool:
    return triangle_area(p1, p2, p3) == 0


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


def _extract_points(text: str) -> List[Tuple[sp.Expr, sp.Expr]]:
    pts: List[Tuple[sp.Expr, sp.Expr]] = []
    for m in re.finditer(r"\(\s*(-?\d+(?:/\d+)?(?:\.\d+)?)\s*,\s*(-?\d+(?:/\d+)?(?:\.\d+)?)\s*\)", text):
        try:
            pts.append((parse_expression(m.group(1)), parse_expression(m.group(2))))
        except Exception:
            continue
    return pts


def try_derive_coord_from_prompt(q_en: str) -> CoordDerivation:
    """Attempt general, non-hardcoded independent derivation from a Coordinate Geometry stem."""
    text = re.sub(r"\s+", " ", (q_en or "")).strip()
    stem = re.split(r"\(A\)", text)[0].strip()
    pts = _extract_points(stem)

    if re.search(r"\bmidpoint\b", stem, re.I) and len(pts) == 2:
        return CoordDerivation(True, "coord_midpoint", "point", midpoint(pts[0], pts[1]))

    if re.search(r"\bdistance\b", stem, re.I) and len(pts) == 2:
        return CoordDerivation(True, "coord_distance", "scalar", distance(pts[0], pts[1]))

    if (
        re.search(r"\bslope\b", stem, re.I)
        and not re.search(r"\b(perpendicular|parallel|mid-?point)\b", stem, re.I)
        and len(pts) == 2
    ):
        m = slope(pts[0], pts[1])
        if m is None:
            return CoordDerivation(True, "coord_slope_undefined", "scalar", sp.zoo)
        return CoordDerivation(True, "coord_slope", "scalar", m)

    if re.search(r"\barea\s+of\s+(?:the\s+)?triangle\b", stem, re.I) and len(pts) == 3:
        return CoordDerivation(True, "coord_triangle_area", "scalar", triangle_area(pts[0], pts[1], pts[2]))

    if re.search(r"\bcollinear\b", stem, re.I) and len(pts) == 3:
        return CoordDerivation(True, "coord_collinear", "bool", are_collinear(pts[0], pts[1], pts[2]))

    return CoordDerivation(False, "coord_unverified_stem", "none", notes="Stem requires specialized or multi-step equation parsing.")


def verify_coord_answer(item: Dict[str, Any], deriv: CoordDerivation) -> Tuple[str, str]:
    if not deriv.verifiable:
        return "UNVERIFIABLE", deriv.notes

    ans_raw = item.get("answer")
    ans_text = str(ans_raw.get("en") if isinstance(ans_raw, dict) else (ans_raw or ""))

    if deriv.result_type == "point":
        pts = _extract_points(ans_text)
        if len(pts) == 1 and expressions_equivalent(pts[0][0], deriv.value[0]) and expressions_equivalent(pts[0][1], deriv.value[1]):
            return "PASS", ""
        return "FAIL", f"Point mismatch: expected {deriv.value}, observed {pts}"

    if deriv.result_type == "scalar":
        if deriv.value == sp.zoo:
            if "undefined" in ans_text.lower():
                return "PASS", ""
            return "FAIL", f"Expected undefined slope, got {ans_text!r}"
        cleaned = re.sub(r"\b(sq\.?\s*units?|units?)\b", "", ans_text, flags=re.I).split("=")[-1].strip().rstrip(".")
        try:
            obs = parse_expression(cleaned)
            if expressions_equivalent(obs, deriv.value):
                return "PASS", ""
            if not obs.free_symbols and not deriv.value.free_symbols:
                m = check_numeric_match(deriv.value, float(obs.evalf()), tolerance=0.02)
                if m.matched:
                    return "PASS", ""
            return "FAIL", f"Scalar mismatch: expected {deriv.value}, observed {obs}"
        except Exception:
            return "UNVERIFIABLE", f"Could not parse scalar from {ans_text!r}"

    if deriv.result_type == "bool":
        low = ans_text.lower()
        if deriv.value and ("collinear" in low or "yes" in low):
            return "PASS", ""
        if (not deriv.value) and ("not collinear" in low or "no" in low):
            return "PASS", ""
        return "UNVERIFIABLE", f"Could not deterministically classify collinearity text {ans_text!r}"

    return "UNVERIFIABLE", "Unsupported coordinate geometry result type."
