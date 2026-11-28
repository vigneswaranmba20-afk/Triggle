"""TRACE MathGuard V1.4 — 270-Case Deterministic Adversarial & Cross-Grade Test Suite.

Covers 10 adversarial categories + positive controls + legitimate abstentions:
1. Incorrect signs (25 cases)
2. Incorrect formulas (25 cases)
3. Invalid algebraic cancellation (25 cases)
4. Division by zero (25 cases)
5. Extraneous roots (25 cases)
6. Incorrect units (25 cases)
7. Geometric impossibilities (25 cases)
8. Missing solution branches (25 cases)
9. Incorrect Tamil mathematical values (25 cases)
10. Mathematically equivalent alternative answers / positive controls (25 cases)
11. Legitimate abstentions & unsupported domains (20 cases)

Total: 270 genuinely new deterministic test cases.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

from .adapters.base import verify_tamil_math_parity
from .adapters.registry import get_adapter_for_chapter
from .reasoning_engine import verify_complete_working


@dataclass
class AdvCase:
    case_id: str
    category: str
    control_type: str  # negative | positive | abstention
    grade: int
    chapter: str
    item: Dict[str, Any]
    allow_positive_domain: bool
    expected_not_pass: bool = True
    check_tamil: bool = False
    use_adapter: bool = False


def build_v1_4_adversarial_cases() -> List[AdvCase]:
    cases: List[AdvCase] = []

    # 1. Incorrect signs (25 cases: algebra expansion, Vieta, slope, distance)
    for i in range(1, 26):
        a = i + 1
        b = i + 3
        if i % 3 == 0:
            # Wrong sign in (x - a)(x + b) expansion
            steps = [
                {"math": {"latex": f"(x-{a})(x+{b}) = x^2 - {b - a}x - {a * b}"}},  # wrong middle sign
            ]
            q_en = f"Expand (x - {a})(x + {b})"
        elif i % 3 == 1:
            # Wrong sign in Vieta sum alpha + beta = +b/a instead of -b/a
            steps = [
                {"math": {"latex": f"a=1,\\ b={a},\\ c={b}"}},
                {"math": {"latex": f"\\alpha+\\beta = \\dfrac{{b}}{{a}} = {a}"}},
            ]
            q_en = f"Find sum of roots of x² + {a}x + {b} = 0"
        else:
            # Wrong sign in slope (y2 - y1)/(x2 - x1) -> (y1 - y2)/(x2 - x1)
            steps = [
                {"math": {"latex": f"m = \\dfrac{{{a} - {b}}}{{4 - 1}} = \\dfrac{{{a - b}}}{{3}}"}},
                {"math": {"latex": f"m = \\dfrac{{{b - a}}}{{3}}"}},  # sign flip between steps
            ]
            q_en = f"Find slope of line through (1, {a}) and (4, {b})"
        cases.append(
            AdvCase(
                f"v14-sign-{i:02d}",
                "incorrect_signs",
                "negative",
                9 if i % 2 == 0 else 10,
                "3" if i % 3 != 2 else "5",
                {"id": f"adv-sign-{i}", "q": {"en": q_en}, "steps": steps},
                False,
                expected_not_pass=True,
            )
        )

    # 2. Incorrect formulas (25 cases: mensuration & coordinate geometry)
    for i in range(1, 26):
        r = i + 2
        h = i + 5
        if i % 3 == 0:
            # Wrong cylinder volume formula: pi*r*h instead of pi*r^2*h
            steps = [{"math": {"latex": f"V = \\pi r h = \\pi ({r})({h}) = {r * h}\\pi"}}]
            ch, pos = "7", True
            q_en = f"Find volume of cylinder of radius {r} cm and height {h} cm"
        elif i % 3 == 1:
            # Wrong sphere TSA formula: 2*pi*r^2 instead of 4*pi*r^2
            steps = [{"math": {"latex": f"\\text{{TSA}} = 2\\pi r^2 = 2\\pi ({r})^2 = {2 * r * r}\\pi"}}]
            ch, pos = "7", True
            q_en = f"Find TSA of sphere of radius {r} cm"
        else:
            # Wrong midpoint formula: (x1 - x2)/2 instead of (x1 + x2)/2
            steps = [{"math": {"latex": f"\\text{{Midpoint}} = \\left(\\dfrac{{{r} - {h}}}{{2}}, \\dfrac{{2 - 4}}{{2}}\\right) = \\left(\\dfrac{{{r + h}}}{{2}}, 3\\right)"}}]
            ch, pos = "5", False
            q_en = f"Find midpoint of ({r}, 2) and ({h}, 4)"
        cases.append(
            AdvCase(
                f"v14-form-{i:02d}",
                "incorrect_formulas",
                "negative",
                9 if i % 2 == 0 else 10,
                ch,
                {"id": f"adv-form-{i}", "q": {"en": q_en}, "steps": steps},
                pos,
                expected_not_pass=True,
            )
        )

    # 3. Invalid algebraic cancellation (25 cases: cancelling terms across + / -)
    for i in range(1, 26):
        c = i + 1
        steps = [
            {"math": {"latex": f"\\dfrac{{x + {c}}}{{x}} = {c}" if i % 2 == 0 else f"\\dfrac{{x^2 - {c**2}}}{{x - {c}}} = x - {c}"}},
        ]
        cases.append(
            AdvCase(
                f"v14-canc-{i:02d}",
                "invalid_cancellation",
                "negative",
                10,
                "3",
                {"id": f"adv-canc-{i}", "q": {"en": f"Simplify rational expression {i}"}, "steps": steps},
                False,
                expected_not_pass=True,
            )
        )

    # 4. Division by zero (25 cases)
    for i in range(1, 26):
        k = i + 1
        steps = [
            {"math": {"latex": f"x = {k}"}},
            {"math": {"latex": f"y = \\dfrac{{{k + 3}}}{{x - {k}}} = \\dfrac{{{k + 3}}}{{0}}"}},
        ]
        cases.append(
            AdvCase(
                f"v14-div0-{i:02d}",
                "division_by_zero",
                "negative",
                10,
                "3",
                {"id": f"adv-div0-{i}", "q": {"en": f"Evaluate at x = {k}"}, "steps": steps},
                False,
                expected_not_pass=True,
            )
        )

    # 5. Extraneous roots (25 cases: claiming root that makes denominator 0 or fails original eq)
    for i in range(1, 26):
        k = i + 2
        steps = [
            {"math": {"latex": f"(x - {k})(x + 1) = 0 \\implies x = {k + 1}, -1"}},  # k+1 is extraneous/wrong!
        ]
        cases.append(
            AdvCase(
                f"v14-extr-{i:02d}",
                "extraneous_roots",
                "negative",
                10,
                "3",
                {"id": f"adv-extr-{i}", "q": {"en": f"Solve (x - {k})(x + 1) = 0"}, "steps": steps},
                False,
                expected_not_pass=True,
            )
        )

    # 6. Incorrect units (25 cases: cm vs m without conversion factor 100)
    for i in range(1, 26):
        r_cm = (i + 1) * 10
        h_m = i + 2
        steps = [
            {"math": {"latex": f"r = {r_cm}\\text{{ cm}}"}},
            {"math": {"latex": f"r = {r_cm}\\text{{ m}}"}},  # overwrites r without /100
        ]
        cases.append(
            AdvCase(
                f"v14-unit-{i:02d}",
                "incorrect_units",
                "negative",
                9 if i % 2 == 0 else 10,
                "7",
                {"id": f"adv-unit-{i}", "q": {"en": f"A cylinder has radius {r_cm} cm and height {h_m} m."}, "steps": steps},
                True,
                expected_not_pass=True,
            )
        )

    # 7. Geometric impossibilities (25 cases: negative radius/height, triangle inequality violation)
    for i in range(1, 26):
        if i % 2 == 0:
            # Negative physical radius in mensuration
            steps = [{"math": {"latex": f"r = -{i + 1}"}}]
            q_en = f"A cone has radius -{i + 1} cm and height 10 cm."
        else:
            # Impossible triangle sides: a + b < c in Heron's formula -> negative area^2
            a, b, c = 2, 3, 10 + i
            s = (a + b + c) / 2
            steps = [
                {"math": {"latex": f"s = \\dfrac{{{a}+{b}+{c}}}{{2}} = {s}"}},
                {"math": {"latex": f"\\text{{Area}} = {i + 5}"}},  # impossible real positive area!
                {"math": {"latex": f"\\text{{Area}} = {i + 9}"}},  # inconsistent!
            ]
            q_en = f"Find area of triangle with sides {a} cm, {b} cm, {c} cm."
        cases.append(
            AdvCase(
                f"v14-geom-{i:02d}",
                "geometric_impossibilities",
                "negative",
                9,
                "7",
                {"id": f"adv-geom-{i}", "q": {"en": q_en}, "steps": steps},
                True,
                expected_not_pass=True,
            )
        )

    # 8. Missing solution branches (25 cases: quadratic dropping second root without domain reason)
    for i in range(1, 26):
        r1 = i + 1
        r2 = -(i + 3)
        steps = [
            {"math": {"latex": f"(x - {r1})(x - ({r2})) = 0 \\implies x = {r1}"}},  # drops r2!
        ]
        cases.append(
            AdvCase(
                f"v14-branch-{i:02d}",
                "missing_solution_branches",
                "negative",
                10,
                "3",
                {"id": f"adv-branch-{i}", "q": {"en": f"Solve (x - {r1})(x + {abs(r2)}) = 0"}, "steps": steps},
                False,
                expected_not_pass=True,
            )
        )

    # 9. Incorrect Tamil mathematical values (25 cases: EN and TA numbers contradict)
    for i in range(1, 26):
        val_en = 10 + i
        val_ta = 10 + i + 7  # corrupted Tamil number!
        item = {
            "id": f"adv-ta-{i}",
            "q": {
                "en": f"Find the volume of a cube of side {val_en} cm.",
                "ta": f"{val_ta} செ.மீ பக்க அளவுள்ள கனசதுரத்தின் கன அளவைக் காண்க.",
            },
            "steps": [
                {"en": f"Side a = {val_en} cm", "ta": f"பக்கம் a = {val_ta} செ.மீ", "math": {"latex": f"a = {val_en}"}},
            ],
            "answer": {
                "en": f"{val_en**3} cm³",
                "ta": f"{val_ta**3} செ.மீ³",
            },
        }
        cases.append(
            AdvCase(
                f"v14-tamil-{i:02d}",
                "incorrect_tamil_values",
                "negative",
                9,
                "7",
                item,
                True,
                expected_not_pass=True,
                check_tamil=True,
            )
        )

    # 10. Mathematically equivalent alternative answers / positive controls (25 cases)
    for i in range(1, 26):
        a = i + 2
        b = i + 4
        if i % 3 == 0:
            # Equivalent factored vs expanded polynomial
            steps = [
                {"math": {"latex": f"(x+{a})(x+{b}) = x^2 + {a + b}x + {a * b}"}},
            ]
            ch, pos = "3", False
            q_en = f"Expand (x + {a})(x + {b})"
        elif i % 3 == 1:
            # Equivalent rational fraction vs decimal/reduced form
            steps = [
                {"math": {"latex": f"m = \\dfrac{{{2 * a}}}{{{2 * b}}} = \\dfrac{{{a}}}{{{b}}}"}},
            ]
            ch, pos = "5", False
            q_en = f"Find slope"
        else:
            # Mensuration exact pi vs factored form
            steps = [
                {"math": {"latex": f"r = {a},\\ h = {b}"}},
                {"math": {"latex": f"V = \\pi r^2 h = \\pi ({a})^2({b}) = {a * a * b}\\pi"}},
            ]
            ch, pos = "7", True
            q_en = f"Cylinder radius {a} cm height {b} cm"
        cases.append(
            AdvCase(
                f"v14-pos-{i:02d}",
                "equivalent_positive_control",
                "positive",
                9 if i % 2 == 0 else 10,
                ch,
                {"id": f"adv-pos-{i}", "q": {"en": q_en}, "steps": steps},
                pos,
                expected_not_pass=False,
            )
        )

    # 11. Legitimate abstentions & unsupported domains (20 cases)
    for i in range(1, 11):
        # Prose-only non-symbolic statements -> must abstain (not PASS, not false-accept)
        cases.append(
            AdvCase(
                f"v14-abs-prose-{i:02d}",
                "legitimate_abstention",
                "abstention",
                10,
                "7",
                {
                    "id": f"adv-abs-prose-{i}",
                    "q": {"en": f"Describe the geometric shape of object {i}."},
                    "steps": [{"en": "The base is circular and the top tapers smoothly."}],
                },
                True,
                expected_not_pass=True,
            )
        )
    unsupported_domains = [(9, "1"), (9, "4"), (9, "8"), (9, "9"), (10, "1"), (10, "4"), (10, "8"), (9, "1"), (9, "8"), (10, "4")]
    for idx_u, (ug, uch) in enumerate(unsupported_domains, start=1):
        cases.append(
            AdvCase(
                f"v14-abs-dom-{idx_u:02d}",
                "unsupported_domain_abstention",
                "abstention",
                ug,
                uch,
                {
                    "id": f"adv-abs-dom-{idx_u}",
                    "q": {"en": "Prove or compute in unsupported domain."},
                    "steps": [{"math": {"latex": "1 + 1 = 2"}}],
                },
                False,
                expected_not_pass=True,
                use_adapter=True,
            )
        )

    return cases


def run_v1_4_adversarial_suite() -> Dict[str, Any]:
    cases = build_v1_4_adversarial_cases()
    passed = 0
    failed = 0
    false_acceptances = 0
    false_rejections = 0
    by_category: Dict[str, Dict[str, int]] = {}
    failures: List[Dict[str, Any]] = []

    for c in cases:
        cat_stat = by_category.setdefault(c.category, {"total": 0, "passed": 0, "failed": 0})
        cat_stat["total"] += 1

        if c.use_adapter:
            adapter = get_adapter_for_chapter(c.grade, c.chapter)
            res = adapter.verify_item(c.item, is_concept=False)
            status = res["working_status"]
        elif c.check_tamil:
            ta_res = verify_tamil_math_parity(c.item, is_concept=False)
            status = ta_res.status
        else:
            w_res = verify_complete_working(c.item, is_concept=False, allow_positive_domain=c.allow_positive_domain)
            status = w_res.status

        if c.expected_not_pass:
            ok = status != "PASS"
            if not ok:
                false_acceptances += 1
        else:
            ok = status == "PASS"
            if not ok:
                false_rejections += 1

        if ok:
            passed += 1
            cat_stat["passed"] += 1
        else:
            failed += 1
            cat_stat["failed"] += 1
            failures.append({"id": c.case_id, "category": c.category, "control": c.control_type, "got_status": status})

    return {
        "schemaVersion": 1,
        "suite": "TRACE MathGuard V1.4 Adversarial Suite",
        "totalCases": len(cases),
        "passed": passed,
        "failed": failed,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "byCategory": by_category,
        "failures": failures,
    }
