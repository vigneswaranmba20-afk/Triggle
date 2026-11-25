"""TRACE MathGuard V1.3 — Independent Algebra Validator (Grade 10 Chapter 3).

Supports polynomials, factorisation, algebraic identities, simultaneous equations,
quadratic equations, discriminants, rational expressions, and domain restrictions.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from .mcq import extract_selected_option_label, parse_mcq_options_en
from .parser import ParseError, parse_expression
from .symbolic import expressions_equivalent


@dataclass
class AlgebraDerivation:
    verifiable: bool
    method: str
    result_type: str  # "roots" | "expr" | "scalar" | "pair" | "none"
    value: Any = None
    notes: str = ""


def quadratic_discriminant(a: sp.Expr, b: sp.Expr, c: sp.Expr) -> sp.Expr:
    return sp.simplify(b**2 - 4 * a * c)


def solve_quadratic(expr: sp.Expr, var: sp.Symbol) -> List[sp.Expr]:
    return sp.solve(sp.Eq(expr, 0), var)


def excluded_values(expr: sp.Expr, var: sp.Symbol) -> List[sp.Expr]:
    _, den = sp.together(expr).as_numer_denom()
    if not den.has(var):
        return []
    return sp.solve(sp.Eq(den, 0), var)


def try_derive_algebra_from_prompt(q_en: str) -> AlgebraDerivation:
    """Attempt general, non-hardcoded independent derivation from an Algebra question stem."""
    text = re.sub(r"\s+", " ", (q_en or "")).strip()
    # Strip MCQ options before scanning equation
    stem = re.split(r"\(A\)", text)[0].strip()

    # 1. Quadratic / linear equation: "Solve <lhs>=0." or "Solve <lhs>=<rhs>."
    m_solve = re.search(r"\bSolve\s+([^.?]+?=.+?)(?:\.|$)", stem, re.I)
    if m_solve:
        eq_str = m_solve.group(1).strip()
        if "=" in eq_str and "," not in eq_str and "and" not in eq_str.lower():
            lhs_s, rhs_s = eq_str.split("=", 1)
            try:
                lhs = parse_expression(lhs_s)
                rhs = parse_expression(rhs_s)
                syms = list((lhs - rhs).free_symbols)
                if len(syms) == 1:
                    sols = sp.solve(sp.Eq(lhs, rhs), syms[0])
                    return AlgebraDerivation(True, "algebra_solve_equation", "roots", sols)
            except Exception:
                pass

    # 2. Simultaneous equations: "Solve <eq1> and <eq2>" or "<eq1>, <eq2>"
    m_sim = re.search(r"\bSolve\s+([^,;]+?=[^,;]+?)\s*(?:,|and)\s*([^.?]+?=[^.?]+?)(?:\.|$)", stem, re.I)
    if m_sim:
        try:
            l1, r1 = m_sim.group(1).split("=", 1)
            l2, r2 = m_sim.group(2).split("=", 1)
            e1 = sp.Eq(parse_expression(l1), parse_expression(r1))
            e2 = sp.Eq(parse_expression(l2), parse_expression(r2))
            syms = sorted(list(e1.free_symbols | e2.free_symbols), key=lambda s: s.name)
            if len(syms) == 2:
                sol = sp.solve([e1, e2], syms, dict=True)
                if sol:
                    return AlgebraDerivation(True, "algebra_simultaneous_solve", "pair", sol[0])
        except Exception:
            pass

    # 3. Discriminant / nature of roots: "discriminant of <expr> = 0"
    m_disc = re.search(r"discriminant\s+of\s+([^.?]+?)(?:=0|\.|$)", stem, re.I)
    if m_disc:
        try:
            poly = parse_expression(m_disc.group(1))
            syms = list(poly.free_symbols)
            if len(syms) == 1:
                p = sp.Poly(sp.expand(poly), syms[0])
                if p.degree() == 2:
                    a, b, c = p.all_coeffs()
                    return AlgebraDerivation(True, "algebra_discriminant", "scalar", quadratic_discriminant(a, b, c))
        except Exception:
            pass

    # 4. Factorise <expr>
    m_fac = re.search(r"\bFactori[sz]e\s+([^.?]+?)(?:\.|$)", stem, re.I)
    if m_fac:
        try:
            expr = parse_expression(m_fac.group(1))
            if expr.free_symbols:
                return AlgebraDerivation(True, "algebra_factorise", "expr", sp.factor(expr))
        except Exception:
            pass

    # 5. Excluded value(s) of <rational expr>
    m_excl = re.search(r"excluded\s+values?\s+(?:of|for)\s+([^.?]+?)(?:\.|$)", stem, re.I)
    if m_excl:
        try:
            expr = parse_expression(m_excl.group(1))
            syms = list(expr.free_symbols)
            if len(syms) == 1:
                return AlgebraDerivation(True, "algebra_excluded_values", "roots", excluded_values(expr, syms[0]))
        except Exception:
            pass

    return AlgebraDerivation(False, "algebra_unverified_stem", "none", notes="Stem requires specialized or non-parsed structure.")


def verify_algebra_answer(item: Dict[str, Any], deriv: AlgebraDerivation) -> Tuple[str, str]:
    """Verify an Algebra item's answer against an independent AlgebraDerivation."""
    if not deriv.verifiable:
        return "UNVERIFIABLE", deriv.notes

    ans_raw = item.get("answer")
    ans_text = str(ans_raw.get("en") if isinstance(ans_raw, dict) else (ans_raw or ""))
    q_en = (item.get("q") or {}).get("en") or ""

    # MCQ check if applicable
    opts = parse_mcq_options_en(q_en)
    if opts and deriv.result_type in ("scalar", "expr"):
        sel = extract_selected_option_label(ans_text)
        if sel and sel in opts:
            try:
                opt_expr = parse_expression(opts[sel])
                if expressions_equivalent(opt_expr, deriv.value):
                    return "PASS", ""
                return "FAIL", f"MCQ {sel} ({opts[sel]}) != derived {deriv.value}"
            except Exception:
                return "UNVERIFIABLE", "Could not parse MCQ option symbolically."

    if deriv.result_type == "roots":
        # Parse numbers/fractions from answer like "x=2, 3" or "2, -3"
        cleaned = re.sub(r"^[A-Za-z_]+\s*=\s*", "", ans_text.strip())
        parts = [p.strip() for p in re.split(r",|\band\b|\bor\b", cleaned) if p.strip()]
        try:
            obs = [parse_expression(p) for p in parts]
            if len(obs) == len(deriv.value) and all(
                any(expressions_equivalent(o, e) for o in obs) for e in deriv.value
            ):
                return "PASS", ""
            return "FAIL", f"Roots mismatch: expected {deriv.value}, observed {obs}"
        except Exception:
            return "UNVERIFIABLE", f"Could not parse root list from {ans_text!r}"

    if deriv.result_type in ("expr", "scalar"):
        try:
            obs = parse_expression(ans_text.split("=")[-1].strip().rstrip("."))
            if expressions_equivalent(obs, deriv.value):
                return "PASS", ""
            return "FAIL", f"Expression mismatch: expected {deriv.value}, observed {obs}"
        except Exception:
            return "UNVERIFIABLE", f"Could not parse expression from {ans_text!r}"

    return "UNVERIFIABLE", "Unsupported algebra result type."
