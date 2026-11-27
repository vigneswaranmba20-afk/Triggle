"""TRACE MathGuard V1.3.4a — Fresh Frozen Adversarial & Positive-Control Suite.

Tests every reliability hardening requirement from V1.3.4a:
1. False mathematical prose (prose-only step must NOT PASS)
2. Incorrect named formula (V = pi*r*h dimensionally invalid for Volume)
3. Unsupported substitution (missing variable bindings must NOT PASS)
4. Overwritten textbook givens (r = 99 contradicting given r = 7 -> FAIL)
5. Negative principal square root (sqrt(x^2) = -|x| -> FAIL)
6. Conditional sqrt(x^2) = x on real x -> FAIL
7. Incorrect ± branch (y = 1 ± 2 = 3, 5 -> FAIL)
8. Extraneous root introduced by squaring (x = 2 -> x^2 = 4 -> FAIL)
9. Missing root (x^2 - 9 = 0 => x = 3 -> UNVERIFIED/FAIL)
10. False inequality (Delta = -5 > 0 -> FAIL)
11. Incorrect exact equality hidden by tolerance (3 = 3.04 -> FAIL)
12. Standalone expression without equality (2x + 3 -> UNVERIFIABLE, never PASS)
13. False inconsistent-system conclusion (0 = 5 when active system is consistent -> FAIL)
14. Unjustified bare approximation (x \approx 999 -> UNVERIFIABLE, never PASS)
15. Correct final answer obtained through wrong intermediate step -> FAIL
Plus 5 valid positive controls (PASS).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

from .reasoning_engine import verify_complete_working


@dataclass
class AdversarialV134aCase:
    case_id: str
    category: str
    item: Dict[str, Any]
    allow_positive_domain: bool
    expected_outcome: str  # "FAIL" | "NON_PASS" | "PASS"


def _mk(qid: str, q_en: str, steps: List[Dict[str, Any]], ans: str = "") -> Dict[str, Any]:
    return {"id": qid, "q": {"en": q_en}, "steps": steps, "answer": {"en": ans}}


FROZEN_V134A_SUITE: List[AdversarialV134aCase] = [
    AdversarialV134aCase(
        "adv34a-01-false-prose",
        "false_mathematical_prose",
        _mk("a01", "Solve x + 2 = 5.", [{"text": "Clearly x equals 99 by inspection."}]),
        False,
        "NON_PASS",
    ),
    AdversarialV134aCase(
        "adv34a-02-wrong-named-formula",
        "incorrect_named_formula",
        _mk("a02", "Find volume of cylinder with r = 7, h = 10.", [
            {"math": {"latex": r"V=\pi r h"}},
            {"math": {"latex": r"V=\dfrac{22}{7}\times 7\times 10=220"}},
        ]),
        True,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-03-unsupported-substitution",
        "unsupported_substitution",
        _mk("a03", "Evaluate 3a + 2b.", [
            {"math": {"latex": r"S=3a+2b=19"}},
        ]),
        False,
        "NON_PASS",
    ),
    AdversarialV134aCase(
        "adv34a-04-overwrite-given",
        "overwritten_textbook_given",
        _mk("a04", "A cylinder has radius r = 7 cm and height h = 10 cm. Find CSA.", [
            {"math": {"latex": r"r=99"}},
            {"math": {"latex": r"CSA=2\pi r h"}},
        ]),
        True,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-05-negative-principal-sqrt",
        "negative_principal_square_root",
        _mk("a05", "Simplify sqrt(x^2).", [
            {"math": {"latex": r"\sqrt{x^2}=-|x|"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-06-conditional-sqrt-real",
        "conditional_sqrt_on_real_x",
        _mk("a06", "Simplify sqrt(x^2) for real x.", [
            {"math": {"latex": r"\sqrt{x^2}=x"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-07-wrong-pm-branch",
        "incorrect_pm_branch",
        _mk("a07", "Solve (y - 1)^2 = 4.", [
            {"math": {"latex": r"y=1\pm 2=3, 5"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-08-extraneous-root-squaring",
        "extraneous_root_introduced",
        _mk("a08", "Solve x - 2 = 0.", [
            {"math": {"latex": r"x-2=0"}},
            {"math": {"latex": r"x^2=4"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-09-missing-root-implication",
        "missing_root",
        _mk("a09", "Solve x^2 - 9 = 0.", [
            {"math": {"latex": r"x^2-9=0\implies x=3"}},
        ]),
        False,
        "NON_PASS",
    ),
    AdversarialV134aCase(
        "adv34a-10-false-inequality",
        "false_inequality",
        _mk("a10", "Find discriminant.", [
            {"math": {"latex": r"\Delta = 2^2 - 4(1)(3) = -8 > 0"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-11-exact-equality-tolerance-mask",
        "incorrect_exact_equality_tolerance",
        _mk("a11", "Evaluate 3.", [
            {"math": {"latex": r"3=3.04"}},
        ]),
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-12-standalone-expr",
        "standalone_expression_no_relation",
        _mk("a12", "Simplify.", [
            {"math": {"latex": r"2x+999"}},
        ]),
        False,
        "NON_PASS",
    ),
    AdversarialV134aCase(
        "adv34a-13-false-inconsistent-system",
        "false_inconsistent_system",
        _mk("a13", "Solve x + y = 3, x - y = 1.", [
            {"math": {"latex": r"x+y=3"}},
            {"math": {"latex": r"x-y=1"}},
            {"math": {"latex": r"0=5"}},
        ], ans="No solution"),  # Must NOT peek at ans!
        False,
        "FAIL",
    ),
    AdversarialV134aCase(
        "adv34a-14-unjustified-approx",
        "unjustified_bare_approximation",
        _mk("a14", "Estimate k.", [
            {"math": {"latex": r"k\approx 999"}},
        ]),
        False,
        "NON_PASS",
    ),
    AdversarialV134aCase(
        "adv34a-15-wrong-step-right-answer",
        "right_answer_wrong_working",
        _mk("a15", "Expand (x+3)^2.", [
            {"math": {"latex": r"(x+3)^2=x^2+9"}},
        ], ans="x^2 + 6x + 9"),
        False,
        "FAIL",
    ),
    # Positive controls
    AdversarialV134aCase(
        "pos34a-01-sqrt-abs-real",
        "valid_principal_sqrt_abs",
        _mk("p01", "Find square root of x^2.", [
            {"math": {"latex": r"\sqrt{x^2}=|x|"}},
        ]),
        False,
        "PASS",
    ),
    AdversarialV134aCase(
        "pos34a-02-sqrt-pos-mensuration",
        "valid_positive_radius_sqrt",
        _mk("p02", "Find radius r.", [
            {"math": {"latex": r"\sqrt{r^2}=r"}},
        ]),
        True,
        "PASS",
    ),
    AdversarialV134aCase(
        "pos34a-03-pm-both-branches",
        "valid_pm_both_branches",
        _mk("p03", "Evaluate 1 ± 2.", [
            {"math": {"latex": r"y=1\pm 2=3, -1"}},
        ]),
        False,
        "PASS",
    ),
    AdversarialV134aCase(
        "pos34a-04-valid-inequality",
        "valid_discriminant_inequality",
        _mk("p04", "Find discriminant.", [
            {"math": {"latex": r"\Delta = 5^2 - 4(1)(4) = 9 > 0"}},
        ]),
        False,
        "PASS",
    ),
    AdversarialV134aCase(
        "pos34a-05-valid-cylinder-volume",
        "valid_cylinder_volume",
        _mk("p05", "Find cylinder volume for r = 7, h = 10.", [
            {"math": {"latex": r"V=\pi r^2 h=\dfrac{22}{7}(7)^2(10)=1540"}},
        ]),
        True,
        "PASS",
    ),
]


def run_v1_3_4a_adversarial_suite() -> Dict[str, Any]:
    details: List[Dict[str, Any]] = []
    confirmed_detections = 0
    false_acceptances = 0
    false_rejections = 0
    abstentions = 0
    passed_cases = 0

    for case in FROZEN_V134A_SUITE:
        res = verify_complete_working(case.item, is_concept=False, allow_positive_domain=case.allow_positive_domain)
        obs = res.status
        exp = case.expected_outcome

        if exp == "PASS":
            ok = obs == "PASS"
            if not ok:
                false_rejections += 1
        elif exp == "FAIL":
            ok = obs == "FAIL"
            if obs == "FAIL":
                confirmed_detections += 1
            elif obs == "PASS":
                false_acceptances += 1
            else:
                abstentions += 1
        else:  # NON_PASS (FAIL | PARTIAL | UNVERIFIABLE)
            ok = obs != "PASS"
            if obs == "PASS":
                false_acceptances += 1
            elif obs == "FAIL":
                confirmed_detections += 1
            else:
                abstentions += 1

        if ok:
            passed_cases += 1
        details.append({
            "case_id": case.case_id,
            "category": case.category,
            "expected": exp,
            "observed": obs,
            "passed": ok,
        })

    return {
        "total": len(FROZEN_V134A_SUITE),
        "passed": passed_cases,
        "confirmedDetections": confirmed_detections,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "abstentions": abstentions,
        "details": details,
    }
