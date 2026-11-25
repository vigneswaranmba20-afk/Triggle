"""TRACE MathGuard V1.3.2 — Independent Answer Verifier for Grade 10 Chapter 5."""

from __future__ import annotations

import re
from typing import Any, Dict, List, Tuple

import sympy as sp

from .coordinate_geometry import lines_equivalent
from .coordinate_parser import (
    line_lists_equal,
    parse_all_points,
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
    s = re.sub(r"\((?!\s*[−-]\s*\d+\s*\))[^)]*\)", lambda m: m.group(0) if any(op in m.group(0) for op in "+-*/√") else "", text or "")
    s = re.sub(r"\b(sq\.?\s*units?|units?|cans?|litres?|seconds?|mb|°|the\s+slope\s+is|the\s+y\s*[- ]?intercept\s+is)\b", "", s, flags=re.I)
    s = s.replace("°", "").strip().rstrip(".")
    if "=" in s:
        s = s.split("=")[-1].strip()
    return s


def _match_scalar(obs_text: str, expected: sp.Expr, tol: float = 0.02) -> bool:
    if expected == sp.zoo:
        return "undefined" in obs_text.lower()
    cleaned = _clean_scalar_text(obs_text)
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
        if pts and points_equal(pts[0], val):
            return "PASS", ""
        return "FAIL", f"Point mismatch: derived {val}, existing {ans_text!r}"

    if rt == "point_list":
        pts = parse_all_points(ans_text)
        # Allow ordered or unordered when multiple vertices/solutions
        if point_lists_equal(pts, val, ordered=False):
            return "PASS", ""
        return "FAIL", f"Point list mismatch: derived {val}, existing {ans_text!r}"

    if rt == "line":
        line = parse_line_equation(ans_text)
        if line and lines_equivalent(line, val):
            return "PASS", ""
        return "FAIL", f"Line equation mismatch: derived {val}, existing {ans_text!r}"

    if rt == "line_list":
        parts = [p.strip() for p in re.split(r",|;", ans_text) if "=" in p]
        lines = [parse_line_equation(p) for p in parts]
        valid_lines = [l for l in lines if l is not None]
        if line_lists_equal(valid_lines, val):
            return "PASS", ""
        return "FAIL", f"Line list mismatch: derived {val}, existing {ans_text!r}"

    if rt == "scalar":
        if _match_scalar(ans_text, val, tol=deriv.tolerance):
            return "PASS", ""
        return "FAIL", f"Scalar mismatch: derived {val}, existing {ans_text!r}"

    if rt == "scalar_set":
        # Extract all numeric/fractional tokens after '=' or separated by ',' / 'or'
        cleaned = re.sub(r"\b[a-zA-Z_]\s*=\s*", "", ans_text)
        segs = [s.strip() for s in re.split(r",|\bor\b|\band\b", cleaned) if s.strip()]
        obs_vals: List[sp.Expr] = []
        for seg in segs:
            try:
                obs_vals.append(parse_expression(_clean_scalar_text(seg)))
            except Exception:
                continue
        if obs_vals and all(any(expressions_equivalent(o, e) for e in val) for o in obs_vals):
            return "PASS", ""
        return "FAIL", f"Solution set mismatch: derived {val}, existing {ans_text!r}"

    if rt == "pair_dict":
        # Check every numeric/expression value mentioned in ans_text matches one of val.values()
        # Specifically for slope/y_intercept or a/b or x/y
        vals = list(val.values())
        # Extract numeric/expression segments separated by ',' or 'and'
        segs = [s.strip() for s in re.split(r",|\band\b", ans_text) if s.strip()]
        if len(segs) >= len(vals):
            matched = 0
            for v in vals:
                if any(_match_scalar(seg, v, tol=0.06) for seg in segs):
                    matched += 1
            if matched == len(vals):
                return "PASS", ""
        return "FAIL", f"Pair mismatch: derived {val}, existing {ans_text!r}"

    if rt == "bool":
        low = ans_text.lower()
        if val and any(w in low for w in ("collinear", "yes", "proved", "right-angled", "parallel", "perpendicular")):
            return "PASS", ""
        if (not val) and any(w in low for w in ("not collinear", "no", "not")):
            return "PASS", ""
        return "FAIL", f"Boolean mismatch: derived {val}, existing {ans_text!r}"

    if rt == "label":
        low = ans_text.lower()
        target = str(val).lower()
        if target in low or low in target:
            return "PASS", ""
        return "FAIL", f"Label mismatch: derived {val!r}, existing {ans_text!r}"

    return "UNVERIFIABLE", "Unsupported Ch5 result type."
