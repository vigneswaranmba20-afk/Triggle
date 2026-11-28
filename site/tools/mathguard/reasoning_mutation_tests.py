"""TRACE MathGuard V1.3.4 — Adversarial ReasoningGraph Mutation Tests.

Tests complete-working verification against planted intermediate reasoning defects
(wrong intermediate arithmetic with right final answer, invalid equation transforms,
extraneous/wrong roots, false identities, bad approximations, and contradictory claims).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

from .reasoning_engine import verify_complete_working


@dataclass
class ReasoningMutationResult:
    case_id: str
    description: str
    expected_status: str
    observed_status: str
    passed: bool


def _make_item(qid: str, q_en: str, steps: List[Dict[str, Any]], answer: str) -> Dict[str, Any]:
    return {
        "id": qid,
        "q": {"en": q_en},
        "steps": steps,
        "answer": {"en": answer},
    }


def run_reasoning_mutation_tests() -> List[ReasoningMutationResult]:
    cases: List[tuple[str, str, Dict[str, Any], bool, str]] = [
        (
            "rg-mut-01-wrong-intermediate-right-answer",
            "Wrong intermediate sum (6+20+4=29) with correct final answer",
            _make_item(
                "mut-01",
                "Find the sum.",
                [
                    {"math": {"latex": r"S_1=(1)(6)+(-4)(-5)+(-3)(-1)=6+20+4=29"}},
                    {"math": {"latex": r"\text{Area}=\dfrac{1}{2}|29-(-19)|=\dfrac{1}{2}(48)=24"}},
                ],
                "24",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-02-invalid-equation-transform",
            "Invalid equation transformation (2x + 1 = 5 -> 2x = 6)",
            _make_item(
                "mut-02",
                "Solve 2x + 1 = 5.",
                [
                    {"math": {"latex": r"2x+1=5"}},
                    {"math": {"latex": r"2x=6"}},
                ],
                "x = 2",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-03-wrong-implication-root",
            "Quadratic implication with wrong root (y^2 - 25 = 0 => y = 4)",
            _make_item(
                "mut-03",
                "Solve y^2 - 25 = 0.",
                [
                    {"math": {"latex": r"y^2-25=0\implies y=-5, 4"}},
                ],
                "-5, 5",
            ),
            False,
            "UNVERIFIED",
        ),
        (
            "rg-mut-04-false-algebraic-identity",
            "False binomial expansion (x + 2)^2 = x^2 + 4",
            _make_item(
                "mut-04",
                "Expand (x + 2)^2.",
                [
                    {"math": {"latex": r"(x+2)^2=x^2+4"}},
                ],
                "x^2 + 4x + 4",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-05-false-sqrt-factorization",
            "Wrong square-root factorization sqrt(4x^2+20x+25) = |2x+4|",
            _make_item(
                "mut-05",
                "Find the square root of 4x^2 + 20x + 25.",
                [
                    {"math": {"latex": r"\sqrt{4x^2+20x+25}=\sqrt{(2x+5)^2}=|2x+4|"}},
                ],
                "|2x+5|",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-06-bad-coordinate-tuple",
            "Coordinate tuple mismatch (1, 2) = (1, 3)",
            _make_item(
                "mut-06",
                "Check midpoint.",
                [
                    {"math": {"latex": r"(1, 2) = (1, 3)"}},
                ],
                "(1, 2)",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-07-contradictory-constant-not-inconsistent",
            "Contradictory constant 3 = 5 in a non-inconsistent-system problem",
            _make_item(
                "mut-07",
                "Evaluate 1 + 2.",
                [
                    {"math": {"latex": r"1+2=5"}},
                ],
                "3",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-08-bad-approx-tolerance",
            "Unjustified approximation 22/7 * 7 = 25",
            _make_item(
                "mut-08",
                "Find circumference.",
                [
                    {"math": {"latex": r"C\approx \dfrac{22}{7}(7)"}},
                    {"math": {"latex": r"&\approx 25"}},
                ],
                "22",
            ),
            False,
            "FAIL",
        ),
        (
            "rg-mut-09-valid-inconsistent-system",
            "Valid inconsistent system proof 0 = 7/2 => no solution",
            _make_item(
                "mut-09",
                "Solve the system.",
                [
                    {"math": {"latex": r"3x+2y+z=3"}},
                    {"math": {"latex": r"3x+2y+z=-\dfrac{1}{2}"}},
                    {"math": {"latex": r"(1)-(3): (3x+2y+z)-(3x+2y+z)=3-\left(-\dfrac{1}{2}\right)"}},
                    {"math": {"latex": r"0=\dfrac{7}{2}\implies \text{no solution}"}},
                ],
                "No solution",
            ),
            False,
            "PASS",
        ),
        (
            "rg-mut-10-valid-sqrt-abs",
            "Valid principal square root |2x+5| = sqrt((2x+5)^2)",
            _make_item(
                "mut-10",
                "Find square root.",
                [
                    {"math": {"latex": r"\sqrt{4x^2+20x+25}=\sqrt{(2x+5)^2}=|2x+5|"}},
                ],
                "|2x+5|",
            ),
            False,
            "PASS",
        ),
        (
            "rg-mut-11-empty-working-unverifiable",
            "Empty working must return UNVERIFIABLE (never silent PASS)",
            _make_item("mut-11", "Solve x = 1.", [], "1"),
            False,
            "UNVERIFIABLE",
        ),
    ]

    results: List[ReasoningMutationResult] = []
    for cid, desc, item, allow_pos, expected in cases:
        res = verify_complete_working(item, is_concept=False, allow_positive_domain=allow_pos)
        ok = (res.status == expected) or (expected == "UNVERIFIED" and res.status in ("FAIL", "PARTIAL"))
        results.append(
            ReasoningMutationResult(
                case_id=cid,
                description=desc,
                expected_status=expected,
                observed_status=res.status,
                passed=ok,
            )
        )
    return results
