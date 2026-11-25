"""TRACE MathGuard V1.3.2a — Hardened Independent Answer Verifier for Grade 10 Chapter 5."""

from __future__ import annotations

import re
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from .coordinate_geometry import lines_equivalent
from .coordinate_parser import (
    line_lists_equal,
    parse_all_points,
    parse_labeled_points,
    parse_line_equation,
    point_lists_equal,
    points_equal,
)
from .derivations_g10_ch5 import Ch5DerivedResult
from .mcq import extract_selected_option_label, parse_mcq_options_en
from .parser import parse_expression
from .rounding import check_numeric_match
from .symbolic import expressions_equivalent


def _clean_scalar_text(text: str) -> str:
    # Remove parenthetical notes like "(1)" ONLY when not purely a negative number like "(−2)"
    s = re.sub(
        r"\((?!\s*[−-]\s*\d+\s*\))[^)]*\)",
        lambda m: m.group(0) if any(op in m.group(0) for op in "+-*/√") else "",
        text or "",
    )
    s = re.sub(
        r"\b(sq\.?\s*units?|cu\.?\s*units?|units?|cans?|litres?|seconds?|mb|°|the\s+slope\s+is|the\s+y\s*[- ]?intercept\s+is)\b",
        "",
        s,
        flags=re.I,
    )
    s = s.replace("°", "").strip().rstrip(".")
    if "=" in s:
        s = s.split("=")[-1].strip()
    return s


def _check_unit_consistency(ans_text: str, expected_unit: str) -> Optional[str]:
    if not expected_unit:
        return None
    low = (ans_text or "").lower()
    if expected_unit == "area":
        if re.search(r"\b(cu\.?\s*units?|cubic|cm³|m³|km³|litres?|seconds?)\b|°", low):
            return f"Unit mismatch for area: {ans_text!r}"
        if re.search(r"\b(cm|m|km|mm)\b", low) and not re.search(r"(sq\.?|²|\^2)", low):
            return f"Linear unit given for area: {ans_text!r}"
    elif expected_unit == "deg":
        if re.search(r"\b(sq\.?\s*units?|cu\.?\s*units?|cm²|m²)\b", low):
            return f"Unit mismatch for angle: {ans_text!r}"
    return None


def _match_scalar(obs_text: str, expected: sp.Expr, tol: float = 0.02, expected_unit: str = "") -> bool:
    if expected_unit and _check_unit_consistency(obs_text, expected_unit):
        return False
    if expected == sp.zoo:
        return "undefined" in (obs_text or "").lower()
    cleaned = _clean_scalar_text(obs_text)
    if not cleaned:
        return False
    if re.fullmatch(r"[−-]?\s*cot\s*θ", cleaned.replace(" ", ""), flags=re.I):
        th = sp.Symbol("theta", real=True)
        obs = -sp.cos(th) / sp.sin(th) if cleaned.strip()[0] in "-−" else sp.cos(th) / sp.sin(th)
        return sp.trigsimp(obs - expected) == 0
    try:
        obs = parse_expression(cleaned)
        if expressions_equivalent(obs, expected):
            return True
        if not obs.free_symbols and not expected.free_symbols:
            m = check_numeric_match(expected, float(obs.evalf()), tolerance=tol)
            return m.matched
    except Exception:
        pass
    return False


def _match_bijection(obs_list: List[Any], exp_list: List[Any], eq_fn: Callable[[Any, Any], bool]) -> bool:
    """Require exact 1-to-1 bijection (same cardinality, no missing/extraneous/duplicate elements)."""
    if len(obs_list) != len(exp_list):
        return False
    used = [False] * len(exp_list)
    for o in obs_list:
        found = False
        for j, e in enumerate(exp_list):
            if not used[j] and eq_fn(o, e):
                used[j] = True
                found = True
                break
        if not found:
            return False
    return True


def _canonical_var_key(raw_key: str) -> str:
    k = re.sub(r"\s+", " ", raw_key.strip().lower()).replace("-", " ")
    if k in ("y intercept", "y_intercept"):
        return "y_intercept"
    if k in ("x intercept", "x_intercept"):
        return "x_intercept"
    if k in ("slope", "m"):
        return "slope" if "slope" in k else "m"
    if k == "inclination":
        return "inclination"
    return k.replace(" ", "_")


def _parse_named_assignments(text: str, expected_keys: set[str]) -> Optional[Dict[str, str]]:
    """Parse named variable assignments like 'a = 2, b = −1' or 'The slope is 0.5 and the y intercept is 2.6'."""
    segs = [s.strip() for s in re.split(r",|;|\band\b", text or "") if s.strip()]
    out: Dict[str, str] = {}
    for seg in segs:
        m_eq = re.match(r"^(?:the\s+)?([a-zA-Z][a-zA-Z0-9_\- ]*?)\s*=\s*(.+)$", seg, flags=re.I)
        m_is = re.match(r"^(?:the\s+)?([a-zA-Z][a-zA-Z0-9_\- ]*?)\s+is\s+(.+)$", seg, flags=re.I)
        m = m_eq or m_is
        if not m:
            return None
        ckey = _canonical_var_key(m.group(1))
        # Map 'm' <-> 'slope' only if expected_keys uses one of them explicitly
        if ckey == "m" and "m" not in expected_keys and "slope" in expected_keys:
            ckey = "slope"
        if ckey in out:
            return None  # Duplicate key assignment
        out[ckey] = m.group(2).strip()
    return out if out else None


def classify_geometric_conclusion(text: str) -> Optional[bool]:
    """Structured geometric conclusion classifier (checks negation before positive keywords)."""
    low = re.sub(r"\s+", " ", (text or "").lower()).strip()
    if not low:
        return None
    neg_patterns = (
        r"\bnot\s+collinear\b",
        r"\bnon[-\s]?collinear\b",
        r"\bnot\s+parallel\b",
        r"\bnot\s+perpendicular\b",
        r"\bneither\s+parallel\s+nor\s+perpendicular\b",
        r"\bnot\s+(?:a\s+)?right[-\s]?angled\b",
        r"^\s*no\b",
        r"\bno,\s",
    )
    if any(re.search(pat, low) for pat in neg_patterns):
        return False
    pos_patterns = (
        r"\bcollinear\b",
        r"\bright[-\s]?angled\b",
        r"\bparallel\b",
        r"\bperpendicular\b",
        r"\bproved\b",
        r"\byes\b",
    )
    if any(re.search(pat, low) for pat in pos_patterns):
        return True
    return None


def _normalize_label_text(text: str) -> str:
    s = re.sub(r"^\s*\([A-D]\)\s*", "", text or "", flags=re.I)
    s = s.replace("₂", "2").replace("₄", "4").replace("−", "-")
    return re.sub(r"\s+", " ", s.strip().lower()).rstrip(".")


def verify_ch5_answer(item: Dict[str, Any], deriv: Ch5DerivedResult, is_concept: bool = False) -> Tuple[str, str]:
    """Compare existing answer against independently derived Ch5 result."""
    if not deriv.verifiable:
        return "UNVERIFIABLE", deriv.notes

    if is_concept:
        choices = item.get("choices") or []
        cidx = item.get("correct")
        if not isinstance(cidx, int) or not (0 <= cidx < len(choices)):
            return "FAIL", f"Invalid concept correct index {cidx!r}"
        ans_text = str(choices[cidx].get("en") or "")
    else:
        ans_raw = item.get("answer")
        ans_text = str(ans_raw.get("en") if isinstance(ans_raw, dict) else (ans_raw or ""))
        q_en = (item.get("q") or {}).get("en") or ""
        opts = parse_mcq_options_en(q_en)
        if opts:
            sel = extract_selected_option_label(ans_text)
            if sel and sel in opts:
                ans_text = opts[sel]

    rt = deriv.result_type
    val = deriv.value

    if rt == "point":
        pts = parse_all_points(ans_text)
        if len(pts) == 1 and points_equal(pts[0], val):
            return "PASS", ""
        return "FAIL", f"Point mismatch: derived {val}, existing {ans_text!r}"

    if rt == "point_list":
        pts = parse_all_points(ans_text)
        if point_lists_equal(pts, val, ordered=False):
            return "PASS", ""
        return "FAIL", f"Point list mismatch: derived {val}, existing {ans_text!r}"

    if rt == "line":
        line = parse_line_equation(ans_text)
        if line and lines_equivalent(line, val):
            return "PASS", ""
        return "FAIL", f"Line equation mismatch: derived {val}, existing {ans_text!r}"

    if rt == "line_list":
        parts = [p.strip() for p in re.split(r",|;", ans_text) if p.strip()]
        if not parts or any("=" not in p for p in parts):
            return "FAIL", f"Invalid line list syntax: {ans_text!r}"
        lines = [parse_line_equation(p) for p in parts]
        if any(l is None for l in lines):
            return "FAIL", f"Invalid/nonlinear line in list: {ans_text!r}"
        if line_lists_equal([l for l in lines if l is not None], val):
            return "PASS", ""
        return "FAIL", f"Line list mismatch: derived {val}, existing {ans_text!r}"

    if rt == "scalar":
        if _match_scalar(ans_text, val, tol=deriv.tolerance, expected_unit=deriv.expected_unit):
            return "PASS", ""
        return "FAIL", f"Scalar mismatch: derived {val}, existing {ans_text!r}"

    if rt == "scalar_set":
        cleaned = re.sub(r"\b[a-zA-Z_]\s*=\s*", "", ans_text)
        segs = [s.strip() for s in re.split(r",|\bor\b|\band\b", cleaned) if s.strip()]
        obs_vals: List[sp.Expr] = []
        for seg in segs:
            try:
                obs_vals.append(parse_expression(_clean_scalar_text(seg)))
            except Exception:
                return "FAIL", f"Unparseable element {seg!r} in solution set {ans_text!r}"
        if obs_vals and _match_bijection(obs_vals, val, expressions_equivalent):
            return "PASS", ""
        return "FAIL", f"Solution set mismatch: derived {val}, existing {ans_text!r}"

    if rt == "ordered_list":
        segs = [s.strip() for s in re.split(r",|\band\b", ans_text) if s.strip()]
        obs_vals = []
        for seg in segs:
            try:
                obs_vals.append(parse_expression(_clean_scalar_text(seg)))
            except Exception:
                return "FAIL", f"Unparseable element {seg!r} in ordered list {ans_text!r}"
        if len(obs_vals) == len(val) and all(expressions_equivalent(o, e) for o, e in zip(obs_vals, val)):
            return "PASS", ""
        return "FAIL", f"Ordered list mismatch: derived {val}, existing {ans_text!r}"

    if rt == "pair_dict":
        obs_dict = _parse_named_assignments(ans_text, set(val.keys()))
        if not obs_dict or set(obs_dict.keys()) != set(val.keys()):
            return "FAIL", f"Variable association mismatch: derived keys {sorted(val.keys())}, existing {ans_text!r}"
        tol = 0.06 if deriv.method == "mcq_slope_yintercept" else deriv.tolerance
        for k, exp_v in val.items():
            if not _match_scalar(obs_dict[k], exp_v, tol=tol):
                return "FAIL", f"Variable '{k}' mismatch: derived {exp_v}, existing {obs_dict[k]!r}"
        return "PASS", ""

    if rt == "bool":
        obs_bool = classify_geometric_conclusion(ans_text)
        if obs_bool is None:
            return "UNVERIFIABLE", f"Ambiguous geometric conclusion: {ans_text!r}"
        if obs_bool is bool(val):
            return "PASS", ""
        return "FAIL", f"Boolean conclusion mismatch: derived {val}, existing {ans_text!r}"

    if rt == "label":
        low = _normalize_label_text(ans_text)
        target = _normalize_label_text(str(val))
        geom_classes = {"parallelogram", "trapezium", "rhombus", "rectangle", "square", "parallel", "perpendicular", "neither"}
        if target in geom_classes:
            if re.search(rf"\bnot\s+(?:a\s+)?{re.escape(target)}\b", low):
                return "FAIL", f"Negated geometric label: derived {val!r}, existing {ans_text!r}"
            if re.search(rf"\b{re.escape(target)}\b", low):
                return "PASS", ""
            return "FAIL", f"Label mismatch: derived {val!r}, existing {ans_text!r}"
        if low == target:
            return "PASS", ""
        return "FAIL", f"Label mismatch: derived {val!r}, existing {ans_text!r}"

    if rt == "multi_part":
        # Currently used for 5.1 Q8: labeled_points (A, B, C), area_abc, and area_ratio
        exp_pts = val["labeled_points"]
        obs_pts = parse_labeled_points(ans_text)
        if set(obs_pts.keys()) != set(exp_pts.keys()):
            return "FAIL", f"Missing/extra vertex labels: expected {sorted(exp_pts.keys())}, got {sorted(obs_pts.keys())}"
        for lbl, ep in exp_pts.items():
            if not points_equal(obs_pts[lbl], ep):
                return "FAIL", f"Vertex {lbl} mismatch: expected {ep}, got {obs_pts[lbl]}"
        m_area = re.search(r"Area\s*\([^)]*ABC[^)]*\)\s*=\s*([^;]+)", ans_text, flags=re.I)
        if not m_area or not _match_scalar(m_area.group(1), val["area_abc"], tol=deriv.tolerance, expected_unit="area"):
            return "FAIL", f"Area(ABC) missing or incorrect in {ans_text!r}"
        m_ratio = re.search(r"Area\s*\([^)]*ABC[^)]*\)\s*=\s*([^;×x*]+?)\s*[×x*]\s*Area\s*\([^)]*PQR", ans_text, flags=re.I)
        if not m_ratio or not _match_scalar(m_ratio.group(1), val["area_ratio"], tol=deriv.tolerance):
            return "FAIL", f"Area ratio missing or incorrect in {ans_text!r}"
        return "PASS", ""

    return "UNVERIFIABLE", "Unsupported Ch5 result type."
