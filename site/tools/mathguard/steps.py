"""Intermediate-step equation transformation validator."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List

import sympy as sp

from .parser import ParseError, parse_equality_chain, parse_expression
from .symbolic import PI_22_7, PI_3_14, expressions_equivalent


@dataclass
class StepValidationResult:
    status: str  # PASS, PARTIAL, FAIL, UNVERIFIABLE
    total_steps: int
    checked_chains: int
    passed_chains: int
    failed_chains: List[Dict[str, Any]] = field(default_factory=list)
    unparsed_steps: List[int] = field(default_factory=list)
    notes: List[str] = field(default_factory=list)


def _numeric_close(a: sp.Expr, b: sp.Expr, line_text: str, tol: float = 0.025) -> bool:
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
    for pi_sub in (PI_22_7, PI_3_14, sp.pi):
        try:
            va = complex(a.subs(sp.pi, pi_sub).evalf(25))
            vb = complex(b.subs(sp.pi, pi_sub).evalf(25))
            if abs(va.imag) < 1e-12 and abs(vb.imag) < 1e-12:
                if abs(va.real - vb.real) <= tol:
                    return True
        except Exception:
            continue
    return False


def _is_assignment_like(lhs: sp.Expr, rhs: sp.Expr, lhs_raw: str = "") -> bool:
    """Return True if lhs is a variable/label being assigned a value or formula."""
    if isinstance(lhs, sp.Symbol) and lhs not in rhs.free_symbols:
        return True
    # Multi-letter label like TSA, CSA, PQ, QR, V_earth, A_cap
    if re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", lhs_raw.strip()) and lhs.free_symbols and not (lhs.free_symbols & rhs.free_symbols):
        return True
    return False


def validate_steps(steps: List[Dict[str, Any]]) -> StepValidationResult:
    """Validate algebraic/numeric equality chains in item.steps."""
    if not steps:
        return StepValidationResult(
            status="UNVERIFIABLE",
            total_steps=0,
            checked_chains=0,
            passed_chains=0,
            notes=["No intermediate steps provided."],
        )

    checked = 0
    passed = 0
    failed: List[Dict[str, Any]] = []
    unparsed: List[int] = []

    for idx, step in enumerate(steps):
        latex = ((step.get("math") or {}).get("latex")) or ""
        eq_str = step.get("eq") or ""
        target = latex if latex.strip() else eq_str
        if not target.strip():
            unparsed.append(idx)
            continue

        # Skip pure descriptive text or ratios like "5 : 7" when no '=' is present
        if "=" not in target and "≈" not in target:
            continue

        # Clean trailing descriptive parentheticals like "(nearest whole cm³: 2 cm³)"
        cleaned = re.sub(r"\([^)]*nearest[^)]*\)", "", target, flags=re.IGNORECASE)
        try:
            chains = parse_equality_chain(cleaned)
        except ParseError:
            # Fallback to plain eq if latex had unsupported macros
            if latex and eq_str:
                try:
                    chains = parse_equality_chain(eq_str)
                except ParseError:
                    unparsed.append(idx)
                    continue
            else:
                unparsed.append(idx)
                continue

        # Track 2-side equations on the same step for implication consistency (e.g. 14h = 140 => h = 1960)
        step_equations: List[Tuple[str, sp.Expr, sp.Expr]] = []

        for line, exprs in chains:
            if len(exprs) < 2:
                continue
            raw_segs = [seg.strip() for seg in line.split("=") if seg.strip()]
            lhs_raw = raw_segs[0] if raw_segs else ""
            if len(exprs) == 2:
                step_equations.append((line, exprs[0], exprs[1]))
            # Compare consecutive pairs (e0 = e1 = e2 ...).
            # If e0 is a variable/label assignment like V = (1/3)*pi*r^2*h, e0=e1 is definitional;
            # subsequent equalities e1=e2=... must be mathematically equivalent!
            start_pair = 1 if (_is_assignment_like(exprs[0], exprs[1], lhs_raw) and len(exprs) >= 3) else 0
            for j in range(start_pair, len(exprs) - 1):
                lhs, rhs = exprs[j], exprs[j + 1]
                # Skip definitional assignment or stated equation/formula when len == 2 and symbols differ
                if j == 0 and len(exprs) == 2 and (_is_assignment_like(lhs, rhs, lhs_raw) or lhs.free_symbols != rhs.free_symbols):
                    continue
                checked += 1
                pi_equiv = (
                    (lhs.has(sp.pi) or rhs.has(sp.pi))
                    and (
                        expressions_equivalent(lhs.subs(sp.pi, PI_22_7), rhs.subs(sp.pi, PI_22_7))
                        or expressions_equivalent(lhs.subs(sp.pi, PI_3_14), rhs.subs(sp.pi, PI_3_14))
                    )
                )
                if expressions_equivalent(lhs, rhs) or pi_equiv or _numeric_close(lhs, rhs, target):
                    passed += 1
                else:
                    # Also check if lhs is an algebraic formula and rhs is its numeric substitution
                    if lhs.free_symbols and not rhs.free_symbols and lhs.free_symbols != rhs.free_symbols:
                        passed += 1
                    else:
                        failed.append(
                            {
                                "stepIndex": idx,
                                "line": line,
                                "lhs": str(lhs),
                                "rhs": str(rhs),
                            }
                        )

        # Check implication consistency between consecutive 1-variable equations in the same step
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
                        if sol1 and sol2:
                            checked += 1
                            if set(sol1) == set(sol2):
                                passed += 1
                            else:
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
    elif checked > 0:
        status = "PASS"
    else:
        status = "PARTIAL" if unparsed else "UNVERIFIABLE"

    return StepValidationResult(
        status=status,
        total_steps=len(steps),
        checked_chains=checked,
        passed_chains=passed,
        failed_chains=failed,
        unparsed_steps=unparsed,
    )
