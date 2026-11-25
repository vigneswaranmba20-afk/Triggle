"""TRACE MathGuard V1.3.3 — Hardened Independent Answer Verifier for Grade 10 Chapter 3."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from .algebra_parser import (
    classify_algebra_nature,
    parse_abs_expr,
    parse_algebra_expr,
    parse_matrix,
    parse_matrix_order,
    parse_named_dict,
    parse_ordered_tuple,
    parse_quadratic_equation,
    quad_equations_equivalent,
)
from .coordinate_geometry import lines_equivalent
from .coordinate_parser import parse_line_equation
from .matrix_solver import matrices_equal
from .mcq import extract_selected_option_label, parse_mcq_options_en
from .rounding import check_numeric_match
from .symbolic import expressions_equivalent


@dataclass
class Ch3DerivedResult:
    verifiable: bool
    method: str
    result_type: str
    value: Any = None
    tolerance: float = 0.02
    expected_unit: str = ""
    notes: str = ""


def _match_bijection(obs_list: List[Any], exp_list: List[Any], eq_fn: Callable[[Any, Any], bool]) -> bool:
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


def _match_expr_exact(obs_text: str, expected: sp.Expr, tol: float = 0.02) -> bool:
    try:
        obs = parse_algebra_expr(obs_text)
        if expressions_equivalent(obs, expected):
            return True
        if not obs.free_symbols and not expected.free_symbols:
            return check_numeric_match(expected, float(obs.evalf()), tolerance=tol).matched
    except Exception:
        pass
    return False


def _norm_syms(expr: sp.Expr) -> sp.Expr:
    subs = {sym: sp.Symbol(sym.name) for sym in expr.free_symbols}
    return expr.subs(subs) if subs else expr


def _match_rational_exact(obs: sp.Expr, exp: sp.Expr) -> bool:
    """Verify exact rational equivalence without ignoring domain-altering cancellations."""
    o_n, e_n = _norm_syms(obs), _norm_syms(exp)
    if not expressions_equivalent(o_n, e_n):
        return False
    # Ensure reduced denominators match up to a nonzero constant
    d_obs = sp.denom(sp.cancel(o_n))
    d_exp = sp.denom(sp.cancel(e_n))
    if d_obs.free_symbols or d_exp.free_symbols:
        ratio = sp.simplify(d_obs / d_exp)
        if ratio.free_symbols:
            return False
    return True


def _parse_hrs_mins(text: str) -> Optional[sp.Expr]:
    m = re.search(r"(\d+)\s*(?:hrs?|hours?)\s*(\d+)\s*(?:mins?|minutes?)", text or "", flags=re.I)
    if m:
        return sp.Rational(int(m.group(1))) + sp.Rational(int(m.group(2)), 60)
    return None


def verify_ch3_answer(item: Dict[str, Any], deriv: Ch3DerivedResult, is_concept: bool = False) -> Tuple[str, str]:
    """Compare existing Ch3 answer against independently derived result."""
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

    if rt == "scalar":
        hm = _parse_hrs_mins(ans_text)
        if hm is not None and expressions_equivalent(hm, val):
            return "PASS", ""
        if _match_expr_exact(ans_text, val, tol=deriv.tolerance):
            return "PASS", ""
        return "FAIL", f"Scalar mismatch: derived {val}, existing {ans_text!r}"

    if rt == "scalar_set":
        cleaned = re.sub(r"\b[a-zA-Z_]\s*=\s*", "", ans_text)
        segs = [s.strip() for s in re.split(r",|\bor\b|\band\b", cleaned) if s.strip()]
        obs_vals: List[sp.Expr] = []
        for seg in segs:
            try:
                obs_vals.append(parse_algebra_expr(seg))
            except Exception:
                return "FAIL", f"Unparseable root {seg!r} in {ans_text!r}"
        if obs_vals and _match_bijection(obs_vals, val, expressions_equivalent):
            return "PASS", ""
        return "FAIL", f"Solution set mismatch: derived {val}, existing {ans_text!r}"

    if rt == "ordered_tuple":
        tup = parse_ordered_tuple(ans_text)
        if tup is not None and len(tup) == len(val) and all(expressions_equivalent(o, e) for o, e in zip(tup, val)):
            return "PASS", ""
        return "FAIL", f"Ordered tuple mismatch: derived {val}, existing {ans_text!r}"

    if rt == "ordered_pair":
        segs = [s.strip() for s in re.split(r",|;|\band\b", ans_text) if s.strip()]
        if len(segs) != len(val):
            return "FAIL", f"Ordered pair length mismatch: derived {val}, existing {ans_text!r}"
        try:
            obs_exprs = [parse_algebra_expr(s) for s in segs]
        except Exception:
            return "FAIL", f"Unparseable ordered pair {ans_text!r}"
        if all(_match_rational_exact(o, e) for o, e in zip(obs_exprs, val)):
            return "PASS", ""
        return "FAIL", f"Ordered pair mismatch: derived {val}, existing {ans_text!r}"

    if rt == "expr":
        try:
            obs = parse_algebra_expr(ans_text)
            if _match_rational_exact(obs, val):
                return "PASS", ""
        except Exception:
            pass
        return "FAIL", f"Expression mismatch: derived {val}, existing {ans_text!r}"

    if rt == "abs_expr":
        try:
            obs = _norm_syms(parse_abs_expr(ans_text))
            v_n = _norm_syms(val)
            if expressions_equivalent(obs**2, v_n**2):
                return "PASS", ""
        except Exception:
            pass
        return "FAIL", f"Square-root expression mismatch: derived |{val}|, existing {ans_text!r}"

    if rt == "quad_eq":
        q_obs = parse_quadratic_equation(ans_text, var_name="x")
        if q_obs is not None and quad_equations_equivalent(q_obs, val):
            return "PASS", ""
        return "FAIL", f"Quadratic equation mismatch: derived {val}, existing {ans_text!r}"

    if rt == "line_eq":
        line = parse_line_equation(ans_text)
        if line is not None and lines_equivalent(line, val):
            return "PASS", ""
        return "FAIL", f"Line equation mismatch: derived {val}, existing {ans_text!r}"

    if rt == "param_dict":
        obs_d = parse_named_dict(ans_text)
        if not obs_d or set(obs_d.keys()) != set(val.keys()):
            return "FAIL", f"Parameter keys mismatch: derived {sorted(val.keys())}, existing {ans_text!r}"
        for k, ev in val.items():
            if not _match_expr_exact(obs_d[k], ev, tol=deriv.tolerance):
                return "FAIL", f"Parameter '{k}' mismatch: derived {ev}, existing {obs_d[k]!r}"
        return "PASS", ""

    if rt == "param_dict_set":
        groups = [g.strip() for g in re.split(r"\bor\b", ans_text, flags=re.I) if g.strip()]
        obs_dicts: List[Dict[str, sp.Expr]] = []
        for g in groups:
            d = parse_named_dict(g)
            if not d:
                return "FAIL", f"Unparseable parameter group {g!r}"
            try:
                obs_dicts.append({k: parse_algebra_expr(v) for k, v in d.items()})
            except Exception:
                return "FAIL", f"Unparseable parameter value in {g!r}"
        def _dict_eq(d1: Dict[str, sp.Expr], d2: Dict[str, sp.Expr]) -> bool:
            return set(d1.keys()) == set(d2.keys()) and all(expressions_equivalent(d1[k], d2[k]) for k in d1)
        if _match_bijection(obs_dicts, val, _dict_eq):
            return "PASS", ""
        return "FAIL", f"Parameter dict set mismatch: derived {val}, existing {ans_text!r}"

    if rt == "matrix_order":
        ord_obs = parse_matrix_order(ans_text)
        if ord_obs == val:
            return "PASS", ""
        return "FAIL", f"Matrix order mismatch: derived {val}, existing {ans_text!r}"

    if rt == "matrix":
        m_obs = parse_matrix(ans_text)
        if m_obs is not None and matrices_equal(m_obs, val):
            return "PASS", ""
        return "FAIL", f"Matrix mismatch: derived {val}, existing {ans_text!r}"

    if rt == "nature":
        domain, exp_nat = val
        obs_nat = classify_algebra_nature(ans_text, domain)
        if obs_nat is None:
            return "UNVERIFIABLE", f"Ambiguous nature classification: {ans_text!r}"
        if obs_nat == exp_nat:
            return "PASS", ""
        return "FAIL", f"Nature mismatch: derived {exp_nat!r}, existing {ans_text!r}"

    if rt == "identity_proof":
        if val is True:
            return "PASS", ""
        return "FAIL", f"Algebraic identity/discriminant proof failed: {deriv.notes}"

    if rt == "multi_part":
        kind = val["kind"]
        if kind == "k_and_y":
            obs_d = parse_named_dict(ans_text)
            if not obs_d or set(obs_d.keys()) != {"k", "y"}:
                return "FAIL", f"Expected k and y in {ans_text!r}"
            if _match_expr_exact(obs_d["k"], val["k"]) and _match_expr_exact(obs_d["y"], val["y"]):
                return "PASS", ""
            return "FAIL", f"k/y mismatch: derived {val}, existing {ans_text!r}"
        if kind == "variation_and_val":
            parts = [p.strip() for p in re.split(r";|,", ans_text) if p.strip()]
            if len(parts) < 2:
                return "FAIL", f"Incomplete variation+value answer: {ans_text!r}"
            obs_nat = classify_algebra_nature(parts[0], "variation")
            if obs_nat != val["variation"]:
                return "FAIL", f"Variation kind mismatch: derived {val['variation']}, existing {parts[0]!r}"
            if _match_expr_exact(parts[1], val["value"]):
                return "PASS", ""
            return "FAIL", f"Variation value mismatch: derived {val['value']}, existing {parts[1]!r}"
        if kind == "yes_and_pair":
            low = ans_text.lower()
            if not re.search(r"\byes\b", low) or re.search(r"\bno\b", low):
                return "FAIL", f"Missing/negated Yes in {ans_text!r}"
            segs = [s.strip() for s in ans_text.split(",")[1:] if s.strip()]
            try:
                obs_vals = [parse_algebra_expr(s) for s in segs]
            except Exception:
                return "FAIL", f"Unparseable pair in {ans_text!r}"
            if _match_bijection(obs_vals, val["pair"], expressions_equivalent):
                return "PASS", ""
            return "FAIL", f"Pair mismatch: derived {val['pair']}, existing {ans_text!r}"

    return "UNVERIFIABLE", "Unsupported Ch3 result type."
