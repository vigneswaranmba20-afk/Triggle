"""TRACE MathGuard V1.3.1 — Fresh 100-Case Adversarial Holdout Suite.

Covers:
- Discriminant & algebraic cancellation regressions (adv-canc-08, adv-thm-06 variants)
- Coordinate tuples & section/distance/slope operations
- Matrix & polynomial/rational operations
- Domain violations, invalid transformations, and misleading final answers
- Clean controls across Mensuration, Algebra, and Coordinate Geometry
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List

import sympy as sp

from .algebra import excluded_values, quadratic_discriminant, try_derive_algebra_from_prompt
from .coord_geometry import are_collinear, are_perpendicular, distance, midpoint, section_point, slope, triangle_area
from .corrector import propose_and_verify_correction
from .derivations_g10_ch7 import DerivedResult
from .parser import ParseError, parse_expression
from .steps import validate_steps


@dataclass(frozen=True)
class HoldoutCase:
    case_id: str
    category: str
    is_error: bool
    critical: bool
    runner: Callable[[], bool]


def _step_fails(steps: List[Dict[str, Any]], allow_positive_domain: bool = True) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain).status == "FAIL"


def build_holdout_cases() -> List[HoldoutCase]:
    cases: List[HoldoutCase] = []

    # 1. Clean controls (25)
    cleans = [
        ("ho131-ctrl-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"x=2 \text{ or } x=3"}}], False)),
        ("ho131-ctrl-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"f(x)=x^2-5x+6=(x-2)(x-3)"}}], False)),
        ("ho131-ctrl-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"S_1=29\ S_2=-19"}}], False)),
        ("ho131-ctrl-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"b^2-4ac=(-5)^2-4(1)(6)=1"}}], False)),
        ("ho131-ctrl-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"(a+b)(a-b)=a^2-b^2"}}], False)),
        ("ho131-ctrl-06", lambda: not (midpoint((sp.Integer(-6), sp.Integer(4)), (sp.Integer(4), sp.Integer(2))) == (sp.Integer(-1), sp.Integer(3)))),
        ("ho131-ctrl-07", lambda: not (section_point((sp.Integer(1), sp.Integer(2)), (sp.Integer(4), sp.Integer(5)), sp.Integer(1), sp.Integer(2)) == (sp.Integer(2), sp.Integer(3)))),
        ("ho131-ctrl-08", lambda: not are_perpendicular(sp.Rational(-1, 3), sp.Integer(3))),
        ("ho131-ctrl-09", lambda: not (slope((sp.Integer(2), sp.Integer(5)), (sp.Integer(2), sp.Integer(9))) is None)),
        ("ho131-ctrl-10", lambda: not are_collinear((sp.Integer(1), sp.Integer(2)), (sp.Integer(2), sp.Integer(4)), (sp.Integer(3), sp.Integer(6)))),
        ("ho131-ctrl-11", lambda: not (triangle_area((sp.Integer(0), sp.Integer(0)), (sp.Integer(6), sp.Integer(0)), (sp.Integer(0), sp.Integer(4))) == sp.Integer(12))),
        ("ho131-ctrl-12", lambda: not (distance((sp.Integer(1), sp.Integer(1)), (sp.Integer(4), sp.Integer(5))) == sp.Integer(5))),
        ("ho131-ctrl-13", lambda: not (quadratic_discriminant(sp.Integer(2), sp.Integer(-4), sp.Integer(2)) == sp.Integer(0))),
        ("ho131-ctrl-14", lambda: not (set(excluded_values(parse_expression("(x+1)/(x^2-4)"), sp.Symbol("x"))) == {sp.Integer(-2), sp.Integer(2)})),
        ("ho131-ctrl-15", lambda: not try_derive_algebra_from_prompt("Solve 2x^2 - 5x + 2 = 0.").verifiable),
        ("ho131-ctrl-16", lambda: _step_fails([{"eq": "", "math": {"latex": r"r^2=64 \Rightarrow r=8"}}], True)),
        ("ho131-ctrl-17", lambda: _step_fails([{"eq": "", "math": {"latex": r"10459.43\,\mathrm{cm}^3=10.45943\,\mathrm{L}"}}])),
        ("ho131-ctrl-18", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{r}{h}=\dfrac{5}{7}"}}])),
        ("ho131-ctrl-19", lambda: _step_fails([{"eq": "", "math": {"latex": r"(2x+3)^2=4x^2+12x+9"}}], False)),
        ("ho131-ctrl-20", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^3-8=(x-2)(x^2+2x+4)"}}], False)),
        ("ho131-ctrl-21", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x^2-16}{x-4}=x+4"}}], False)),
        ("ho131-ctrl-22", lambda: _step_fails([{"eq": "", "math": {"latex": r"2\pi(7)(10)=140\pi"}}])),
        ("ho131-ctrl-23", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{8^2+15^2}=17"}}])),
        ("ho131-ctrl-24", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4}{3}\pi(3)^3=36\pi"}}])),
        ("ho131-ctrl-25", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1}{2}+\dfrac{1}{4}=\dfrac{3}{4}"}}])),
    ]
    for cid, fn in cleans:
        cases.append(HoldoutCase(cid, "clean_holdout", False, False, fn))

    # 2. Algebraic cancellation & discriminant sign errors (25)
    for i in range(1, 13):
        cases.append(HoldoutCase(f"ho131-canc-{i:02d}", "algebraic_cancellation", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"\dfrac{{a+{k}b}}{{a-{k}b}}=-1"}}], False)))
    for i in range(1, 14):
        cases.append(HoldoutCase(f"ho131-disc-{i:02d}", "discriminant_sign_error", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"b^2-4ac={k+3}^2+4({k})({k+1})"}}], False)))

    # 3. Domain violations, root loss & extraneous roots (25)
    for i in range(1, 10):
        cases.append(HoldoutCase(f"ho131-div0-{i:02d}", "domain_violation", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"\dfrac{{{k}}}{{{k}-{k}}}=1"}}], False)))
    for i in range(1, 9):
        cases.append(HoldoutCase(f"ho131-loss-{i:02d}", "loss_of_roots", True, True, lambda k=i + 1: _step_fails([{"eq": "", "math": {"latex": rf"x^2={k**2} \Rightarrow x={k}"}}], False)))
    for i in range(1, 9):
        cases.append(HoldoutCase(f"ho131-extr-{i:02d}", "extraneous_root", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"\sqrt{{x+{k}}}=-{k+1} \Rightarrow x={(k+1)**2-k}"}}], False)))

    # 4. Invalid formulas, misleading approximations, unit errors & safe corrector (25)
    for i in range(1, 9):
        cases.append(HoldoutCase(f"ho131-form-{i:02d}", "invalid_formula", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"({k}x+1)^2={k**2}x^2+1"}}], False)))
    for i in range(1, 9):
        cases.append(HoldoutCase(f"ho131-apx-{i:02d}", "misleading_approximation", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"\dfrac{{{k*10+1}}}{{3}}\approx {(k*10+1)/3 + 0.25:.2f}"}}])))
    for i in range(1, 10):
        cases.append(HoldoutCase(f"ho131-corr-{i:02d}", "safe_corrector_e2e", True, True, lambda k=i: propose_and_verify_correction({"id": f"ho-{k}", "q": {"en": f"r={k+2} cm, h={k+4} cm"}, "answer": "1 cm²", "steps": []}, "synthetic", DerivedResult(True, "cyl", sp.Integer(2 * (k + 2) * (k + 4)) * sp.pi, "area", "exact", required_numbers=[str(k + 2), str(k + 4)])).status == "APPROVED"))

    return cases


def run_holdout_100() -> Dict[str, Any]:
    t0 = time.perf_counter()
    cases = build_holdout_cases()
    rows: List[Dict[str, Any]] = []
    for c in cases:
        flagged = bool(c.runner())
        rows.append({"caseId": c.case_id, "category": c.category, "is_error": c.is_error, "critical": c.critical, "flagged": flagged})
    elapsed_ms = round((time.perf_counter() - t0) * 1000.0, 2)
    tp = sum(1 for r in rows if r["is_error"] and r["flagged"])
    fp = sum(1 for r in rows if not r["is_error"] and r["flagged"])
    fn = sum(1 for r in rows if r["is_error"] and not r["flagged"])
    tn = sum(1 for r in rows if not r["is_error"] and not r["flagged"])
    crit_missed = sum(1 for r in rows if r["is_error"] and r["critical"] and not r["flagged"])
    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.3.1 Holdout",
        "summary": {
            "total": len(rows),
            "tp": tp,
            "fp": fp,
            "fn": fn,
            "tn": tn,
            "precision": round(tp / (tp + fp), 4) if (tp + fp) else 0.0,
            "recall": round(tp / (tp + fn), 4) if (tp + fn) else 0.0,
            "falsePositives": fp,
            "falseNegatives": fn,
            "criticalMissedErrors": crit_missed,
            "executionTimeMs": elapsed_ms,
        },
        "cases": rows,
    }
