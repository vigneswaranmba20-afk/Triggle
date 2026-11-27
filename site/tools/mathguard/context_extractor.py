"""TRACE MathGuard V1.3.5 — Deterministic Mathematical Context & Provenance Extractor.

Extracts source-grounded mathematical givens from English and Tamil question stems:
- Mensuration quantities: radius (r), diameter (d -> r = d/2), height (h), slant height (l),
  length, breadth/width, area, CSA, TSA, volume (V), multi-object indices (r_1, r_2, h_1, h_2),
  and ratios (r_1/r_2 = a/b).
- Algebra: quadratic coefficients (a, b, c / A, B, C) from ax^2 + bx + c = 0.
- Coordinate Geometry: inclination angles (theta), slopes (m), intercepts (c),
  labeled points A(x1, y1), and ordered point lists (x_1, y_1), (x_2, y_2), ...
- Units & domain constraints (e.g., r > 0, unit conversion tracking).

Never infers unsupported numerical values and never reads expected final answers.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

import sympy as sp

from .coordinate_parser import parse_all_points, parse_labeled_points
from .parser import parse_expression


@dataclass
class ExtractedGiven:
    symbol: str
    expr: sp.Expr
    source_span: str
    role: str
    unit: str = ""
    domain_constraint: str = ""
    object_id: str = "primary"
    language: str = "en"


@dataclass
class ContextExtractionResult:
    givens: Dict[str, sp.Expr] = field(default_factory=dict)
    provenance: List[ExtractedGiven] = field(default_factory=list)
    conflicts: List[str] = field(default_factory=list)
    unit_notes: List[str] = field(default_factory=list)
    domain_constraints: List[str] = field(default_factory=list)


_NUM_PAT = r"[-+]?\d+(?:\.\d+)?(?:/\d+)?"
_UNIT_PAT = r"(?:cm|m|mm|km|kg|g|hrs?|hours?|mins?|minutes?|secs?|seconds?|sq\.?\s*cm|sq\.?\s*m|cm²|m²|cm³|m³|cu\.?\s*cm)?"


def _parse_num(raw: str) -> Optional[sp.Expr]:
    s = (raw or "").strip().replace("−", "-")
    if not s:
        return None
    try:
        if "/" in s and not any(c.isalpha() for c in s):
            p, q = s.split("/", 1)
            return sp.Rational(p.strip()) / sp.Rational(q.strip())
        if "." in s and not any(c.isalpha() for c in s):
            return sp.Rational(s)
        return sp.sympify(s)
    except Exception:
        try:
            return parse_expression(s)
        except Exception:
            return None


def _add_given(
    res: ContextExtractionResult,
    sym: str,
    expr: sp.Expr,
    span: str,
    role: str,
    unit: str = "",
    domain: str = "",
    obj_id: str = "primary",
    lang: str = "en",
) -> None:
    if sym in res.givens:
        try:
            if sp.simplify(res.givens[sym] - expr) != 0:
                res.conflicts.append(f"Conflicting given for {sym}: {res.givens[sym]} vs {expr} ({span})")
                return
        except Exception:
            pass
    res.givens[sym] = expr
    res.provenance.append(
        ExtractedGiven(
            symbol=sym,
            expr=expr,
            source_span=span[:100],
            role=role,
            unit=unit,
            domain_constraint=domain,
            object_id=obj_id,
            language=lang,
        )
    )
    if domain and domain not in res.domain_constraints:
        res.domain_constraints.append(domain)


def _strip_mcq_options(raw: str) -> str:
    """Strip MCQ answer choices (A) ... (B) ... so option values never leak into stem givens."""
    if not raw:
        return ""
    m = re.search(r"(?:\n|\s)\(A\)\s+", raw)
    if m and re.search(r"\(B\)\s+", raw[m.start():]):
        return raw[:m.start()].strip()
    return raw.strip()


def extract_mathematical_context(
    q_en: str,
    q_ta: Optional[str] = None,
    allow_positive_domain: bool = False,
) -> ContextExtractionResult:
    """Extract deterministic, source-grounded mathematical givens from question stems."""
    res = ContextExtractionResult()
    text = _strip_mcq_options(q_en or "")
    ta_text = _strip_mcq_options(q_ta or "")
    if not text and not ta_text:
        return res

    # 1. Mensuration / Geometry physical quantities (English + Tamil cues)
    if allow_positive_domain or re.search(
        r"\b(?:cylinder|cone|sphere|hemisphere|frustum|cube|cuboid|radius|diameter|height|slant\s+height|volume|surface\s+area|ஆரம்|விட்டம்|உயரம்|சாய்வுயரம்)\b",
        text + " " + ta_text,
        flags=re.I,
    ):
        _SOLIDS = re.findall(
            r"\b(?:cylinder|cylindrical|cone|conical|sphere|spherical|hemisphere|hemispherical|frustum|cuboid|cube|wire|bullet|coins?|sector|circle)\b",
            text,
            flags=re.I,
        )
        is_multi_solid = len(_SOLIDS) >= 2 or bool(re.search(r"\b(?:two|three|both|each|melted|recast|sector\s+of\s+a\s+circle)\b", text, flags=re.I))
        _OF_BRIDGE = r"(?:of\s+(?:(?!\b(?:whose|which|where|with|and|or|radius|diameter|height|slant|area|volume|circumference)\b)[^0-9\n,;]){1,35}?)?"
        _VAL_TAIL = r"(" + _NUM_PAT + r")(?!\s*(?::|times\b))\s*(" + _UNIT_PAT + r")"
        qty_patterns = [
            (r"\bslant\s+height\s*" + _OF_BRIDGE + r"(?:is|=|be|of)?\s*" + _VAL_TAIL, "l", "slant_height", "l > 0"),
            (r"(?<!outer\s)(?<!inner\s)(?<!external\s)(?<!internal\s)\bradius\s*" + _OF_BRIDGE + r"(?:is|=|be|of)?\s*" + _VAL_TAIL, "r", "radius", "r > 0"),
            (r"(?<!outer\s)(?<!inner\s)(?<!external\s)(?<!internal\s)\bdiameter\s*" + _OF_BRIDGE + r"(?:is|=|be|of)?\s*" + _VAL_TAIL, "d", "diameter", "d > 0"),
            (r"(?<!total\s)(?<!slant\s)\bheight\s*" + _OF_BRIDGE + r"(?:is|=|be|of)?\s*" + _VAL_TAIL, "h", "height", "h > 0"),
            (r"\bthickness\s*(?:is|=|be|of)?\s*" + _VAL_TAIL, "t", "thickness", "t > 0"),
            (r"\bcurved\s+surface\s+area\s*(?:is|=|be|of)?\s*" + _VAL_TAIL, "CSA", "curved_surface_area", "CSA > 0"),
            (r"\btotal\s+surface\s+area\s*(?:is|=|be|of)?\s*" + _VAL_TAIL, "TSA", "total_surface_area", "TSA > 0"),
        ]
        for pat, sym, role, dom in qty_patterns:
            matches = list(re.finditer(pat, text, flags=re.I))
            # Also count "<num> <unit> in diameter" mentions so multi-diameter stems don't look single-object
            in_diam_matches = list(re.finditer(r"(" + _NUM_PAT + r")\s*(" + _UNIT_PAT + r")\s+in\s+diameter\b", text, flags=re.I)) if sym == "d" else []
            total_matches = len(matches) + len(in_diam_matches)
            if total_matches == 1 and len(matches) == 1 and not (is_multi_solid and sym in ("r", "d", "h", "l")):
                m = matches[0]
                val = _parse_num(m.group(1))
                if val is not None:
                    if val.is_real and val <= 0:
                        res.conflicts.append(f"Invalid non-positive physical dimension for {sym}: {val} ({m.group(0)})")
                    else:
                        unit = (m.group(2) or "").strip()
                        _add_given(res, sym, val, m.group(0), role, unit=unit, domain=dom)
                        if sym == "d":
                            _add_given(res, "r", val / 2, m.group(0), "radius_from_diameter", unit=unit, domain="r > 0")
            elif total_matches >= 2:
                # Multiple objects: bind sym_1, sym_2, ... without overwriting primary
                for idx_m, m in enumerate(matches, start=1):
                    val = _parse_num(m.group(1))
                    if val is not None:
                        if val.is_real and val <= 0:
                            res.conflicts.append(f"Invalid non-positive physical dimension for {sym}_{idx_m}: {val} ({m.group(0)})")
                        else:
                            unit = (m.group(2) or "").strip()
                            _add_given(res, f"{sym}_{idx_m}", val, m.group(0), f"{role}_{idx_m}", unit=unit, domain=f"{sym}_{idx_m} > 0", obj_id=f"object_{idx_m}")

        # Also extract explicit "r = 7 cm", "h = 10 cm" assignments in stem
        for m_ex in re.finditer(r"\b([rhlbaRHd])\s*=\s*(" + _NUM_PAT + r")(?!\s*(?::|times\b))\s*(" + _UNIT_PAT + r")", text):
            sym = m_ex.group(1)
            val = _parse_num(m_ex.group(2))
            if val is not None:
                if allow_positive_domain and val.is_real and val <= 0:
                    res.conflicts.append(f"Invalid non-positive physical dimension for {sym}: {val} ({m_ex.group(0)})")
                elif (not val.is_real or val > 0) and sym not in res.givens:
                    unit = (m_ex.group(3) or "").strip()
                    _add_given(res, sym, val, m_ex.group(0), f"explicit_{sym}", unit=unit, domain=f"{sym} > 0")
        if ta_text and not is_multi_solid:
            for ta_pat, sym, role, dom in [
                (r"(?<!வெளி\s)(?<!உள்\s)(?<!வெளிப்புற\s)(?<!உட்புற\s)ஆரம்\s*(" + _NUM_PAT + r")(?!\s*(?::|மடங்கு))", "r", "radius_ta", "r > 0"),
                (r"(?<!மொத்த\s)(?<!சாய்வு\s)உயரம்\s*(" + _NUM_PAT + r")(?!\s*(?::|மடங்கு))", "h", "height_ta", "h > 0"),
            ]:
                ta_matches = list(re.finditer(ta_pat, ta_text))
                if len(ta_matches) == 1 and sym not in res.givens:
                    m_ta = ta_matches[0]
                    val = _parse_num(m_ta.group(1))
                    if val is not None:
                        if val.is_real and val <= 0:
                            res.conflicts.append(f"Invalid non-positive physical dimension for {sym}: {val} ({m_ta.group(0)})")
                        else:
                            _add_given(res, sym, val, m_ta.group(0), role, domain=dom, lang="ta")

    # 2. Algebra: quadratic equation ax^2 + bx + c = 0 in stem
    m_quad = re.search(
        r"([+-]?\s*(?:√\d+|\d+(?:\.\d+)?(?:/\d+)?)?\s*[a-zA-Z]\s*[²2])\s*([+-]\s*(?:√\d+|\d+(?:\.\d+)?(?:/\d+)?)?\s*[a-zA-Z])\s*([+-]\s*(?:√\d+|\d+(?:\.\d+)?(?:/\d+)?))\s*=\s*0",
        text.replace("−", "-"),
    )
    if m_quad:
        raw_q = f"{m_quad.group(1)}{m_quad.group(2)}{m_quad.group(3)}"
        raw_q_norm = raw_q.replace("²", "^2")
        raw_q_norm = re.sub(r"√(\d+)", r"sqrt(\1)", raw_q_norm)
        raw_q_norm = re.sub(r"([a-zA-Z])2\b", r"\1^2", raw_q_norm)
        try:
            q_expr = parse_expression(raw_q_norm)
            if len(q_expr.free_symbols) == 1:
                var_sym = next(iter(q_expr.free_symbols))
                poly = sp.Poly(q_expr, var_sym)
                if poly.degree() == 2:
                    ca, cb, cc = poly.all_coeffs()
                    _add_given(res, "a", ca, raw_q, "quadratic_coeff_a")
                    _add_given(res, "b", cb, raw_q, "quadratic_coeff_b")
                    _add_given(res, "c", cc, raw_q, "quadratic_coeff_c")
                    _add_given(res, "A", ca, raw_q, "quadratic_coeff_A")
                    _add_given(res, "B", cb, raw_q, "quadratic_coeff_B")
                    _add_given(res, "C", cc, raw_q, "quadratic_coeff_C")
        except Exception:
            pass

    # Extract explicit "whose GCD is <expr>" / "whose LCM is <expr>"
    for m_gl in re.finditer(r"\bwhose\s+(GCD|LCM)\s+is\s+([^,.;\n]+)", text, flags=re.I):
        sym_gl = m_gl.group(1).upper()
        raw_gl = m_gl.group(2).strip().replace("−", "-")
        raw_gl = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")), raw_gl)
        try:
            e_gl = parse_expression(raw_gl)
            _add_given(res, sym_gl, e_gl, m_gl.group(0), f"explicit_{sym_gl.lower()}")
        except Exception:
            pass

    # Check triangle inequality when 3 triangle sides are explicitly given
    m_tri = re.search(
        r"\btriangle\s+with\s+sides\s+(\d+(?:\.\d+)?)\s*(?:cm|m|mm)?\s*,\s*(\d+(?:\.\d+)?)\s*(?:cm|m|mm)?\s*(?:,|and)\s*(\d+(?:\.\d+)?)\s*(?:cm|m|mm)?",
        text,
        flags=re.I,
    )
    if m_tri:
        s1, s2, s3 = float(m_tri.group(1)), float(m_tri.group(2)), float(m_tri.group(3))
        if s1 + s2 <= s3 or s1 + s3 <= s2 or s2 + s3 <= s1:
            res.conflicts.append(f"Triangle inequality violated for sides ({s1}, {s2}, {s3})")

    # 3. Coordinate Geometry: inclination angle, slope, intercepts, points
    m_ang = re.search(r"\binclination\s+(?:with[^0-9]+)?(?:is\s+)?(\d+)\s*°", text, flags=re.I)
    if m_ang:
        deg = int(m_ang.group(1))
        _add_given(res, "theta", sp.Integer(deg), m_ang.group(0), "inclination_deg", unit="deg")
        if deg in (0, 30, 45, 60):
            tan_map = {0: sp.Integer(0), 30: 1 / sp.sqrt(3), 45: sp.Integer(1), 60: sp.sqrt(3)}
            _add_given(res, "m", tan_map[deg], m_ang.group(0), "slope_from_inclination")

    m_int = re.search(r"\bintercept\s+(-?\d+(?:\.\d+)?(?:/\d+)?)\s+on\s+the\s+y-axis", text, flags=re.I)
    if m_int:
        cv = _parse_num(m_int.group(1))
        if cv is not None:
            _add_given(res, "c", cv, m_int.group(0), "y_intercept")

    # Labeled points A(x1, y1), B(x2, y2), ...
    lpts = parse_labeled_points(text)
    for lbl, pt in lpts.items():
        _add_given(res, f"{lbl}_x", pt[0], f"{lbl}{pt}", f"point_{lbl}_x")
        _add_given(res, f"{lbl}_y", pt[1], f"{lbl}{pt}", f"point_{lbl}_y")

    # Unlabeled coordinate sequence (x1, y1), (x2, y2), ... when not an equation-of-line question
    if not lpts:
        all_pts = parse_all_points(text)
        if 2 <= len(all_pts) <= 4:
            for idx_p, pt in enumerate(all_pts, start=1):
                _add_given(res, f"x_{idx_p}", pt[0], str(pt), f"point_{idx_p}_x")
                _add_given(res, f"y_{idx_p}", pt[1], str(pt), f"point_{idx_p}_y")

    return res
