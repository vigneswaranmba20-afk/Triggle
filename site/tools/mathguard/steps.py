"""Intermediate-step equation transformation & context-aware validator (V1.1)."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from .parser import ParseError, parse_equality_chain
from .symbolic import PI_22_7, PI_3_14, expressions_equivalent
from .units import are_unit_converted_equivalent

# Physical Mensuration variables that are strictly positive in geometric contexts
PHYSICAL_POSITIVE_SYMBOLS = {
    "r", "R", "r_1", "r_2", "R_1", "R_2",
    "h", "H", "h_1", "h_2", "h_cone", "h_cyl",
    "l", "k", "a", "b", "d", "t", "w",
    "PQ", "QR", "PR", "AB", "BC", "AC",
}


@dataclass
class StepValidationResult:
    status: str  # PASS, PARTIAL, FAIL, UNVERIFIABLE
    total_steps: int
    checked_chains: int
    passed_chains: int
    failed_chains: List[Dict[str, Any]] = field(default_factory=list)
    unparsed_steps: List[int] = field(default_factory=list)
    notes: List[str] = field(default_factory=list)
    classification: str = "Verified"
    context_applied: List[str] = field(default_factory=list)


def _numeric_close(a: sp.Expr, b: sp.Expr, line_text: str, tol: float = 0.025, r_rhs: str = "") -> bool:
    """Check if two constant expressions are numerically close ONLY when approximation is indicated."""
    if a.free_symbols or b.free_symbols:
        return False
    is_approx = (
        "≈" in line_text
        or r"\approx" in line_text
        or "…" in line_text
        or "..." in line_text
        or bool(re.search(r"\d+\.\d+", line_text))
    )
    if not is_approx:
        return False
    rhs_has_decimal = bool(re.search(r"\d+\.\d+", r_rhs))
    for pi_sub in (PI_22_7, PI_3_14, sp.pi):
        try:
            va = complex(a.subs(sp.pi, pi_sub).evalf(25))
            vb = complex(b.subs(sp.pi, pi_sub).evalf(25))
            if abs(va.imag) < 1e-12 and abs(vb.imag) < 1e-12:
                if abs(va.real - vb.real) <= tol:
                    return True
                # Allow integer rounding ONLY when RHS is an integer (no decimal point like .00)
                if not rhs_has_decimal and vb.real == int(vb.real) and abs(round(va.real) - vb.real) == 0 and abs(va.real - vb.real) <= 0.5:
                    return True
        except Exception:
            continue
    return False


def _is_named_quantity_lhs(lhs: sp.Expr, rhs: sp.Expr, lhs_raw: str) -> bool:
    """Return True if lhs is a named quantity or prose label being defined."""
    s = lhs_raw.strip()
    if re.fullmatch(r"\d+(?:\.\d+)?\s+[A-Za-z]+(?:\^\{?\d+\}?)?", s):
        return False
    if isinstance(lhs, sp.Symbol) and lhs not in rhs.free_symbols:
        return True
    # Subscripted/named label like TSA, CSA, PQ, V_displaced, A_new
    if re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", s) and lhs.free_symbols and not (lhs.free_symbols & rhs.free_symbols):
        return True
    # Multi-word English prose label like "Area of one cap", "New radius", "Area (i)"
    if len(s.split()) >= 2 and re.fullmatch(r"[A-Za-z][A-Za-z0-9\s_()-]*", s):
        return True
    return False


def _apply_env_subs(expr: sp.Expr, env: Dict[sp.Symbol, sp.Expr]) -> sp.Expr:
    """Iteratively substitute known variable definitions from prior steps."""
    cur = expr
    for _ in range(3):
        nxt = cur.subs(env)
        if nxt == cur:
            break
        cur = nxt
    return cur


def _check_pair_equivalent(
    lhs: sp.Expr,
    rhs: sp.Expr,
    lhs_raw: str,
    rhs_raw: str,
    full_line: str,
    env: Dict[sp.Symbol, sp.Expr],
) -> Tuple[bool, Optional[str]]:
    """Check if lhs and rhs are equivalent directly, via env, pi=22/7, unit conversion, or rounding."""
    if expressions_equivalent(lhs, rhs):
        return True, None

    # Try substituting tracked variable definitions from earlier steps
    if env:
        l_sub = _apply_env_subs(lhs, env)
        r_sub = _apply_env_subs(rhs, env)
        if expressions_equivalent(l_sub, r_sub):
            return True, "env_substitution"
        if _numeric_close(l_sub, r_sub, full_line):
            return True, "env_numeric_approx"

    # Try pi = 22/7 or 3.14
    if lhs.has(sp.pi) or rhs.has(sp.pi):
        for pi_sub in (PI_22_7, PI_3_14):
            if expressions_equivalent(lhs.subs(sp.pi, pi_sub), rhs.subs(sp.pi, pi_sub)):
                return True, f"pi={pi_sub}"

    # Try unit conversion (e.g., 10459.43 cm³ = 10.45943 L)
    if not lhs.free_symbols and not rhs.free_symbols:
        try:
            lv = float(lhs.evalf(20))
            rv = float(rhs.evalf(20))
            if are_unit_converted_equivalent(lhs_raw, lv, rhs_raw, rv, tol=0.05):
                return True, "unit_conversion"
        except Exception:
            pass

    if _numeric_close(lhs, rhs, full_line, r_rhs=rhs_raw):
        return True, "numeric_approx"

    return False, None


def _has_domain_violation(expr: sp.Expr) -> bool:
    """Detect division by zero (zoo), indeterminate (nan), or infinity (oo)."""
    return bool(expr.has(sp.zoo, sp.nan, sp.oo, -sp.oo))


def _is_named_quantity_expr(expr: sp.Expr) -> bool:
    """Return True if expr is a ratio/sum of named or subscripted quantities (e.g. V_1/V_2, V_cone+V_hemi)."""
    syms = expr.free_symbols
    if not syms:
        return False
    return all("_" in s.name or len(s.name) >= 2 for s in syms)


def extract_stem_assumptions(question_en: str, figure_alt_en: str = "") -> Dict[str, sp.Expr]:
    """Extract explicit variable assignments and ratios from question stem (general, non-hardcoded)."""
    text = f"{question_en or ''} {figure_alt_en or ''}"
    assumptions: Dict[str, sp.Expr] = {}
    # Explicit assignments like "QR = 16", "r = 6 cm", "R = 12 cm"
    for m in re.finditer(r"\b([A-Za-z](?:_[A-Za-z0-9]+|[A-Z])?)\s*=\s*(\d+(?:\.\d+)?)\b", text):
        name, val = m.group(1), m.group(2)
        if name not in assumptions:
            assumptions[name] = sp.Rational(val) if "." in val else sp.Integer(int(val))
    # Explicit variable ratios like "h₂ : h₁ = 1 : 2" or "h_2 : h_1 = 1 : 2"
    norm_t = text.replace("₁", "_1").replace("₂", "_2").replace("₃", "_3")
    for m in re.finditer(r"\b([A-Za-z]_[0-9]+)\s*:\s*([A-Za-z]_[0-9]+)\s*=\s*(\d+)\s*:\s*(\d+)\b", norm_t):
        v1, v2, p, q = m.group(1), m.group(2), int(m.group(3)), int(m.group(4))
        if q != 0 and v1 not in assumptions:
            assumptions[v1] = sp.Rational(p, q) * sp.Symbol(v2, real=True)
    return assumptions


def validate_steps(
    steps: List[Dict[str, Any]],
    allow_positive_domain: bool = True,
    initial_env: Optional[Dict[str, sp.Expr]] = None,
) -> StepValidationResult:
    """Validate algebraic/numeric equality chains and equation transformations in item.steps."""
    if not steps:
        return StepValidationResult(
            status="UNVERIFIABLE",
            total_steps=0,
            checked_chains=0,
            passed_chains=0,
            notes=["No intermediate steps provided."],
            classification="Missing mathematical context",
        )

    env_sym: Dict[sp.Symbol, sp.Expr] = {}
    env_num: Dict[sp.Symbol, sp.Expr] = {}
    if initial_env:
        for k, v in initial_env.items():
            sym = sp.Symbol(k, real=True)
            env_sym[sym] = v
            if not v.free_symbols:
                env_num[sym] = v

    checked = 0
    passed = 0
    failed: List[Dict[str, Any]] = []
    unparsed: List[int] = []
    context_applied: List[str] = []

    for idx, step in enumerate(steps):
        latex = ((step.get("math") or {}).get("latex")) or ""
        eq_str = step.get("eq") or ""
        target = latex if latex.strip() else eq_str
        if not target.strip():
            unparsed.append(idx)
            continue

        if "=" not in target and "≈" not in target and r"\approx" not in target:
            continue

        cleaned = re.sub(r"\([^)]*nearest[^)]*\)", "", target, flags=re.IGNORECASE)
        try:
            chains = parse_equality_chain(cleaned)
        except ParseError:
            if latex and eq_str:
                try:
                    chains = parse_equality_chain(eq_str)
                except ParseError:
                    unparsed.append(idx)
                    continue
            else:
                unparsed.append(idx)
                continue

        step_equations: List[Tuple[str, sp.Expr, sp.Expr]] = []

        for line, exprs in chains:
            if any(_has_domain_violation(e) for e in exprs):
                checked += 1
                failed.append(
                    {
                        "stepIndex": idx,
                        "line": line,
                        "lhs": "domain_violation",
                        "rhs": "division_by_zero_or_indeterminate",
                    }
                )
                continue
            if len(exprs) < 2:
                continue
            raw_segs = [seg.strip() for seg in line.split("=") if seg.strip()]
            raw_target_segs = [seg.strip() for seg in re.split(r"=|≈", target) if seg.strip()]
            lhs_raw = raw_segs[0] if raw_segs else ""

            # Record 2-term equation for implication checking
            step_equations.append((line, exprs[0], exprs[1]))

            # Record clean variable definition in dual symbolic/numeric env
            if isinstance(exprs[0], sp.Symbol) and exprs[0] not in exprs[1].free_symbols:
                if exprs[0] not in env_sym:
                    env_sym[exprs[0]] = exprs[1]
                if len(exprs) >= 3 and not exprs[-1].free_symbols and exprs[0] not in env_num:
                    env_num[exprs[0]] = exprs[-1]
                elif not exprs[1].free_symbols and exprs[0] not in env_num:
                    env_num[exprs[0]] = exprs[1]

            # If e0 is a named quantity/prose label, or a named-quantity ratio/sum not yet fully bound in env_sym,
            # or a constant/unknown-power LHS with matching e1==e2 (e.g. 1540 = 44h, r^2 = 308/(44/7) = 49),
            # e0=e1 is definitional/stated; check e1=e2=...
            is_stated_eq_chain = (
                len(exprs) >= 3
                and (not exprs[0].free_symbols or (len(exprs[0].free_symbols) == 1 and not exprs[1].free_symbols and not (exprs[0].free_symbols <= set(env_sym.keys()))))
                and exprs[1].free_symbols == exprs[2].free_symbols
            )
            is_named_expr_def = (
                len(exprs) >= 3
                and _is_named_quantity_expr(exprs[0])
                and not (exprs[0].free_symbols <= set(env_sym.keys()))
            )
            start_pair = 1 if (
                len(exprs) >= 3
                and (_is_named_quantity_lhs(exprs[0], exprs[1], lhs_raw) or is_stated_eq_chain or is_named_expr_def)
            ) else 0

            for j in range(start_pair, len(exprs) - 1):
                lhs, rhs = exprs[j], exprs[j + 1]
                r_lhs = raw_target_segs[j] if j < len(raw_target_segs) else (raw_segs[j] if j < len(raw_segs) else "")
                r_rhs = raw_target_segs[j + 1] if (j + 1) < len(raw_target_segs) else (raw_segs[j + 1] if (j + 1) < len(raw_segs) else "")

                # Handle percentage equations like "Increase % = (1.5625 - 1)*100 = 56.25%"
                if "%" in lhs_raw and "%" in r_rhs and not rhs.free_symbols:
                    rhs = rhs * sp.Integer(100)

                # Skip 3-part ratio statements like V_1:V_2:V_3 = 3:1:2
                if r_lhs.count(":") >= 2 and r_rhs.count(":") >= 2:
                    continue
                # Skip definitional assignment, named-quantity formula expansion, or stated 2-side equation
                # (when lhs is a single symbol/constant, OR both sides have unique variables like (1/3)pi r^2 h = pi(xr)^2 H,
                #  OR 2+ distinct symbols equal to a constant like r/h = 5/7)
                is_simple_lhs = isinstance(lhs, sp.Symbol) or not lhs.free_symbols
                is_disjoint_or_new_var_eq = bool(
                    lhs.free_symbols
                    and rhs.free_symbols
                    and (lhs.free_symbols - rhs.free_symbols)
                    and (rhs.free_symbols - lhs.free_symbols)
                )
                is_multi_sym_ratio = len(lhs.free_symbols) >= 2 and not rhs.free_symbols
                if j == 0 and len(exprs) == 2 and (
                    _is_named_quantity_lhs(lhs, rhs, lhs_raw)
                    or is_disjoint_or_new_var_eq
                    or is_multi_sym_ratio
                    or (is_simple_lhs and lhs.free_symbols != rhs.free_symbols)
                ):
                    continue
                if _is_named_quantity_expr(lhs) and not _is_named_quantity_expr(rhs) and not (lhs.free_symbols <= set(env_sym.keys())):
                    continue

                checked += 1
                ok, reason = _check_pair_equivalent(lhs, rhs, r_lhs, r_rhs, target, env_sym)
                if not ok and env_num:
                    ok, reason = _check_pair_equivalent(lhs, rhs, r_lhs, r_rhs, target, env_num)
                if ok:
                    passed += 1
                    if reason and reason not in context_applied:
                        context_applied.append(reason)
                else:
                    # Check if lhs is a symbolic formula and rhs is its numeric substitution
                    # (skip rational cancellation claims like (x+2)/x = 2 where lhs has a non-constant denominator)
                    if lhs.free_symbols and not rhs.free_symbols and lhs.as_numer_denom()[1].free_symbols == set():
                        l_sub = _apply_env_subs(lhs, env_num if env_num else env_sym)
                        if not l_sub.free_symbols:
                            ok_sub, _ = _check_pair_equivalent(l_sub, rhs, r_lhs, r_rhs, target, env_sym)
                            if ok_sub:
                                passed += 1
                                continue
                            # All symbols WERE bound in env, yet l_sub != rhs -> confirmed contradiction!
                            failed.append(
                                {
                                    "stepIndex": idx,
                                    "line": line,
                                    "lhs": str(l_sub),
                                    "rhs": str(rhs),
                                }
                            )
                            continue
                        # Missing variable bindings -> cannot verify substitution
                        unparsed.append(idx)
                        checked -= 1
                    else:
                        failed.append(
                            {
                                "stepIndex": idx,
                                "line": line,
                                "lhs": str(lhs),
                                "rhs": str(rhs),
                            }
                        )

        # Validate logical equation transformations across => / \Rightarrow
        if len(step_equations) >= 2:
            for k in range(len(step_equations) - 1):
                l1, a1, b1 = step_equations[k]
                l2, a2, b2 = step_equations[k + 1]
                syms1 = a1.free_symbols | b1.free_symbols
                syms2 = a2.free_symbols | b2.free_symbols
                if len(syms1) == 1 and syms1 == syms2:
                    sym = next(iter(syms1))
                    try:
                        sol1 = sp.solve(sp.Eq(a1, b1), sym)
                        sol2 = sp.solve(sp.Eq(a2, b2), sym)
                        # If eq1 has NO solution (e.g. sqrt(x+2) = -3) but eq2 claims a root, that's an extraneous root!
                        if not sol1 and sol2:
                            checked += 1
                            failed.append(
                                {
                                    "stepIndex": idx,
                                    "line": f"{l1} => {l2}",
                                    "lhs": f"{sym}=[] (no real solution)",
                                    "rhs": f"{sym}={sol2}",
                                }
                            )
                            continue
                        if not sol1 or not sol2:
                            continue
                        checked += 1
                        s1_set = set(sol1)
                        s2_set = set(sol2)
                        # Check exact solution set match
                        if s1_set == s2_set:
                            passed += 1
                            unparsed = [u for u in unparsed if u != idx]
                            continue
                        # Check pi = 22/7 or 3.14 equivalence between eq1 and eq2
                        pi_ok = False
                        for pi_sub in (PI_22_7, PI_3_14):
                            sol1_pi = set(sp.solve(sp.Eq(a1.subs(sp.pi, pi_sub), b1.subs(sp.pi, pi_sub)), sym))
                            sol2_pi = set(sp.solve(sp.Eq(a2.subs(sp.pi, pi_sub), b2.subs(sp.pi, pi_sub)), sym))
                            if sol1_pi and sol1_pi == sol2_pi:
                                pi_ok = True
                                break
                        if pi_ok:
                            passed += 1
                            unparsed = [u for u in unparsed if u != idx]
                            if "pi_substitution_implication" not in context_applied:
                                context_applied.append("pi_substitution_implication")
                            continue
                        # Check positive physical quantity domain restriction (ONLY when justified!)
                        if (
                            allow_positive_domain
                            and sym.name in PHYSICAL_POSITIVE_SYMBOLS
                            and s2_set.issubset(s1_set)
                            and all(val.is_real and val > 0 for val in s2_set)
                            and any(val.is_real and val <= 0 for val in s1_set - s2_set)
                        ):
                            passed += 1
                            unparsed = [u for u in unparsed if u != idx]
                            if "positive_physical_domain" not in context_applied:
                                context_applied.append("positive_physical_domain")
                            continue

                        failed.append(
                            {
                                "stepIndex": idx,
                                "line": f"{l1} => {l2}",
                                "lhs": f"{sym}={sol1}",
                                "rhs": f"{sym}={sol2}",
                            }
                        )
                    except Exception:
                        pass

    if failed:
        status = "FAIL"
        classification = "Confirmed mathematical error"
    elif checked == 0:
        status = "UNVERIFIABLE"
        classification = "Missing mathematical context"
    elif unparsed:
        status = "PARTIAL"
        classification = "Parser limitation"
    else:
        status = "PASS"
        classification = "Verified"

    return StepValidationResult(
        status=status,
        total_steps=len(steps),
        checked_chains=checked,
        passed_chains=passed,
        failed_chains=failed,
        unparsed_steps=sorted(set(unparsed)),
        classification=classification,
        context_applied=context_applied,
    )
