"""TRACE MathGuard V1.3.5a — 185-Case Adversarial, Positive-Control & Abstention Suite.

Covers all 14 required adversarial categories (150 negative controls),
25 positive controls across Algebra/CoordGeo/Mensuration/Matrices/Inequalities,
and 10 legitimate abstention cases. Reports false acceptances, false rejections,
and abstentions independently.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

from .reasoning_engine import verify_complete_working


@dataclass
class AdversarialV135aCase:
    case_id: str
    category: str
    control_type: str  # "negative" | "positive" | "abstention"
    item: Dict[str, Any]
    allow_positive_domain: bool
    expected_outcome: str  # "FAIL" | "PASS" | "ABSTAIN" (PARTIAL or UNVERIFIABLE)


def _mk(qid: str, q_en: str, steps: List[Dict[str, Any]], ans: str = "", q_ta: str = "") -> Dict[str, Any]:
    return {"id": qid, "q": {"en": q_en, "ta": q_ta}, "steps": steps, "answer": {"en": ans}}


def build_v1_3_5a_suite() -> List[AdversarialV135aCase]:
    cases: List[AdversarialV135aCase] = []

    # 1. Correct answers derived from incorrect working (12 cases)
    for i, n in enumerate([2, 3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-raw-bin-{i}", "right_answer_wrong_working", "negative",
            _mk(f"rawb{i}", f"Expand (x + {n})^2.", [
                {"math": {"latex": f"(x+{n})^2 = x^2 + {n**2}"}},
            ], ans=f"x^2 + {2*n}x + {n**2}"), False, "FAIL",
        ))
    for i, (r, h) in enumerate([(7, 10), (7, 12), (14, 5), (7, 6), (21, 4), (14, 10)], 1):
        csa = int(round(2 * (22 / 7) * r * h))
        cases.append(AdversarialV135aCase(
            f"v135a-raw-cyl-{i}", "right_answer_wrong_working", "negative",
            _mk(f"rawc{i}", f"A cylinder has radius {r} cm and height {h} cm.", [
                {"math": {"latex": rf"CSA = \pi r h = \dfrac{{22}}{{7}}({r})({h}) = {csa // 2}"}},
            ], ans=f"{csa} cm²"), True, "FAIL",
        ))

    # 2. Incorrect intermediate calculations (12 cases)
    for i, (a, b) in enumerate([(3, 4), (5, 12), (8, 15), (7, 24), (9, 40), (6, 8)], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-calc-pyth-{i}", "incorrect_intermediate_calc", "negative",
            _mk(f"calp{i}", f"A cone has radius {a} cm and height {b} cm.", [
                {"math": {"latex": rf"\ell = \sqrt{{{a}^2 + {b}^2}} = {a + b}"}},
            ]), True, "FAIL",
        ))
    for i, k in enumerate([2, 3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-calc-alg-{i}", "incorrect_intermediate_calc", "negative",
            _mk(f"cala{i}", f"Solve {k}x + 4 = 16.", [
                {"math": {"latex": f"{k}x + 4 = 16"}},
                {"math": {"latex": f"{k}x = 20"}},
            ]), False, "FAIL",
        ))

    # 3. Invalid mathematical identities (12 cases)
    invalid_ids = [
        (r"(x+y)^2 = x^2 + y^2", "sq_sum"),
        (r"(x-y)^2 = x^2 - y^2", "sq_diff"),
        (r"\sqrt{x^2 + y^2} = x + y", "sqrt_sum"),
        (r"\dfrac{1}{x+y} = \dfrac{1}{x} + \dfrac{1}{y}", "recip_sum"),
        (r"\dfrac{x+2}{x} = 2", "cancel_add"),
        (r"\dfrac{x^2 - 1}{x - 1} = x - 1", "diff_sq_bad"),
        (r"(a+b)^3 = a^3 + b^3", "cube_sum"),
        (r"\sin^2\theta - \cos^2\theta = 1", "trig_sign"),
        (r"(x+1)(x+2) = x^2 + 2x + 2", "poly_prod"),
        (r"2(x+3) = 2x + 3", "distrib"),
        (r"-(x - 4) = -x - 4", "neg_distrib"),
        (r"\left(\dfrac{a}{b}\right)^2 = \dfrac{a^2}{b}", "pow_frac"),
    ]
    for i, (ltx, tag) in enumerate(invalid_ids, 1):
        cases.append(AdversarialV135aCase(
            f"v135a-id-{i}-{tag}", "invalid_mathematical_identity", "negative",
            _mk(f"id{i}", "Simplify or verify the identity.", [{"math": {"latex": ltx}}]),
            False, "FAIL",
        ))

    # 4. Hidden division by zero (12 cases)
    for i, c in enumerate([1, 2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-div0-lit-{i}", "hidden_division_by_zero", "negative",
            _mk(f"dzl{i}", "Evaluate.", [
                {"math": {"latex": rf"\dfrac{{{c}}}{{0}} = {c}"}},
            ]), False, "FAIL",
        ))
    for i, c in enumerate([2, 3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-div0-sub-{i}", "hidden_division_by_zero", "negative",
            _mk(f"dzs{i}", f"Evaluate for x = {c}.", [
                {"math": {"latex": f"x = {c}"}},
                {"math": {"latex": rf"y = \dfrac{{1}}{{x - {c}}} = 1"}},
            ]), False, "FAIL",
        ))

    # 5. Extraneous roots (10 cases)
    for i, v in enumerate([2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-ext-sq-{i}", "extraneous_roots", "negative",
            _mk(f"exsq{i}", f"Solve x - {v} = 0.", [
                {"math": {"latex": f"x - {v} = 0"}},
                {"math": {"latex": f"x^2 = {v**2}"}},
            ]), False, "FAIL",
        ))
    for i, v in enumerate([1, 2, 3, 4, 5], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-ext-neg-{i}", "extraneous_roots", "negative",
            _mk(f"exneg{i}", f"Solve x^2 - {v**2} = 0.", [
                {"math": {"latex": f"x^2 - {v**2} = 0 \\implies x = -{v+1}, {v}"}},
            ]), False, "FAIL",
        ))

    # 6. Incorrect formula selection (10 cases)
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-form-cone-{i}", "incorrect_formula_selection", "negative",
            _mk(f"fc{i}", f"Find the volume of a cone with radius {7*i} cm and height 10 cm.", [
                {"math": {"latex": r"V = \pi r^2 h"}},
            ]), True, "FAIL",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-form-hemi-{i}", "incorrect_formula_selection", "negative",
            _mk(f"fh{i}", f"Find the volume of a hemisphere of radius {3*i} cm.", [
                {"math": {"latex": r"V = \dfrac{4}{3}\pi r^3"}},
            ]), True, "FAIL",
        ))

    # 7. Conflicting / negative / impossible physical dimensions (12 cases)
    for i, neg_r in enumerate([-7, -5, -3, -10, -14, 0], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-dim-neg-{i}", "conflicting_or_impossible_dimensions", "negative",
            _mk(f"dneg{i}", f"A cylinder has radius {neg_r} cm and height 10 cm.", [
                {"math": {"latex": rf"CSA = 2\pi r h"}},
            ]), True, "FAIL",
        ))
    for i, (r_cm, h_m) in enumerate([(7, 2), (10, 3), (5, 1), (14, 4), (21, 5), (28, 2)], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-dim-unit-{i}", "conflicting_or_impossible_dimensions", "negative",
            _mk(f"dunit{i}", f"A cylinder has radius {r_cm} cm and height {h_m} m.", [
                {"math": {"latex": f"r = {r_cm * 100}"}},
            ]), True, "FAIL",
        ))

    # 8. Invalid substitutions (10 cases)
    for i, (r_v, bad_r) in enumerate([(7, 14), (5, 10), (3, 9), (8, 4), (12, 6)], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-sub-r-{i}", "invalid_substitution", "negative",
            _mk(f"subr{i}", f"A cone has radius {r_v} cm and height 12 cm.", [
                {"math": {"latex": f"r = {bad_r}"}},
            ]), True, "FAIL",
        ))
    for i, d_v in enumerate([14, 10, 20, 28, 12], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-sub-diam-{i}", "invalid_substitution", "negative",
            _mk(f"subd{i}", f"A sphere has diameter {d_v} cm.", [
                {"math": {"latex": f"r = {d_v}"}},
            ]), True, "FAIL",
        ))

    # 9. Misinterpreted Tamil terminology (10 cases)
    for i, (ta_r, bad_r) in enumerate([(7, 14), (5, 10), (14, 7), (21, 42), (10, 20)], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-ta-r-{i}", "misinterpreted_tamil_terminology", "negative",
            _mk(f"tar{i}", "", [{"math": {"latex": f"r = {bad_r}"}}], q_ta=f"ஆரம் {ta_r} செ.மீ"),
            True, "FAIL",
        ))
    for i, (ta_h, bad_h) in enumerate([(10, 20), (12, 6), (15, 30), (8, 16), (24, 12)], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-ta-h-{i}", "misinterpreted_tamil_terminology", "negative",
            _mk(f"tah{i}", "", [{"math": {"latex": f"h = {bad_h}"}}], q_ta=f"உயரம் {ta_h} செ.மீ"),
            True, "FAIL",
        ))

    # 10. Incorrect mathematical proofs (10 cases)
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-proof-ineq-{i}", "incorrect_mathematical_proof", "negative",
            _mk(f"pin{i}", "Prove that the discriminant is negative.", [
                {"math": {"latex": f"-x^2 - {i} > 0"}},
            ]), False, "FAIL",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-proof-mat-{i}", "incorrect_mathematical_proof", "negative",
            _mk(f"pmat{i}", "Verify matrix multiplication.", [
                {"math": {"latex": rf"A = \begin{{pmatrix}}1 & {i}\\0 & 1\end{{pmatrix}}"}},
                {"math": {"latex": rf"B = \begin{{pmatrix}}2 & 0\\1 & 2\end{{pmatrix}}"}},
                {"math": {"latex": rf"AB = \begin{{pmatrix}}2 & {i}\\1 & 2\end{{pmatrix}}"}},
            ]), False, "FAIL",
        ))

    # 11. Answer leakage (10 cases)
    for i, opt_x in enumerate([10, 12, 15, 20, 25], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-leak-mcq-{i}", "answer_leakage", "negative",
            _mk(f"lmcq{i}", f"Find the value of x if x + 5 = 8.\n(A) x = {opt_x} (B) x = 3 (C) x = 0 (D) x = 1", [
                {"math": {"latex": f"x = {opt_x}"}},
            ], ans="(B) x = 3"), False, "FAIL",
        ))
    for i, c in enumerate([3, 5, 7, 11, 13], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-leak-sys-{i}", "answer_leakage", "negative",
            _mk(f"lsys{i}", "Solve x + y = 4, x - y = 2.", [
                {"math": {"latex": "x + y = 4"}},
                {"math": {"latex": "x - y = 2"}},
                {"math": {"latex": f"0 = {c}"}},
            ], ans="No solution"), False, "FAIL",
        ))

    # 12. Misleading numerical coincidences (10 cases)
    for i in range(1, 6):
        # 2 + 2 = 2*2, 1+2+3 = 1*2*3, etc. — wrong formula 2*pi*r for area of circle when r=2 gives 4pi = pi*r^2!
        cases.append(AdversarialV135aCase(
            f"v135a-coinc-dim-{i}", "misleading_numerical_coincidence", "negative",
            _mk(f"coinc{i}", "Find the area of a circle of radius 2 cm.", [
                {"math": {"latex": r"Area = 2\pi r"}},
            ]), True, "FAIL",
        ))
    for i, k in enumerate([2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-coinc-tol-{i}", "misleading_numerical_coincidence", "negative",
            _mk(f"ctol{i}", "Evaluate exact integer equality.", [
                {"math": {"latex": f"{k + 1} = {k + 1}.04"}},
            ]), False, "FAIL",
        ))

    # 13. Invalid assumptions about positive variables (10 cases)
    for i, v in enumerate(["x", "y", "z", "a", "b"], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-sqrt-{i}", "invalid_positive_assumption", "negative",
            _mk(f"psq{i}", f"Simplify sqrt({v}^2).", [
                {"math": {"latex": rf"\sqrt{{{v}^2}} = {v}"}},
            ]), False, "FAIL",
        ))
    for i, v in enumerate([1, 2, 3, 4, 5], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-root-{i}", "invalid_positive_assumption", "negative",
            _mk(f"proot{i}", f"Solve x^2 = {v**2}.", [
                {"math": {"latex": f"x^2 = {v**2} \\implies x = {v}"}},
            ]), False, "FAIL",
        ))

    # 14. Compound reasoning errors involving multiple steps (10 cases)
    for i, n in enumerate([2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-comp-alg-{i}", "compound_reasoning_error", "negative",
            _mk(f"compa{i}", f"Solve 2x + {n} = 10.", [
                {"math": {"latex": f"2x + {n} = 10"}},
                {"math": {"latex": f"2x = {10 + n}"}},
                {"math": {"latex": f"x = {(10 + n) / 2}"}},
            ]), False, "FAIL",
        ))
    for i, r in enumerate([7, 14, 21, 28, 35], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-comp-mens-{i}", "compound_reasoning_error", "negative",
            _mk(f"compm{i}", f"A cone has radius {r} cm and slant height {r + 5} cm.", [
                {"math": {"latex": r"TSA = \pi r (\ell + r)"}},
                {"math": {"latex": rf"TSA = \dfrac{{22}}{{7}}({r})({r + 5})"}},
            ]), True, "FAIL",
        ))

    # 15. Positive controls (25 cases)
    for i, (r_v, h_v) in enumerate([(7, 10), (7, 12), (14, 5), (21, 10), (3.5, 8)], 1):
        val = 2 * (22 / 7) * r_v * h_v
        csa_s = str(int(val)) if abs(val - round(val)) < 1e-9 else f"{val:.2f}".rstrip("0").rstrip(".")
        cases.append(AdversarialV135aCase(
            f"v135a-pos-cyl-{i}", "positive_control", "positive",
            _mk(f"p_cyl{i}", f"A cylinder has radius {r_v} cm and height {h_v} cm.", [
                {"math": {"latex": rf"CSA = 2\pi r h = 2\left(\dfrac{{22}}{{7}}\right)({r_v})({h_v}) = {csa_s}"}},
            ]), True, "PASS",
        ))
    for i, n in enumerate([2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-bin-{i}", "positive_control", "positive",
            _mk(f"p_bin{i}", f"Expand (x + {n})^2.", [
                {"math": {"latex": f"(x+{n})^2 = x^2 + {2*n}x + {n**2}"}},
            ]), False, "PASS",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-ineq-{i}", "positive_control", "positive",
            _mk(f"p_ineq{i}", "Verify non-negativity.", [
                {"math": {"latex": f"(a + {i}*b)^2 \\ge 0"}},
            ]), False, "PASS",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-mat-{i}", "positive_control", "positive",
            _mk(f"p_mat{i}", "Add matrices.", [
                {"math": {"latex": rf"A = \begin{{pmatrix}}1 & {i}\\0 & 2\end{{pmatrix}}"}},
                {"math": {"latex": rf"B = \begin{{pmatrix}}3 & 1\\{i} & 4\end{{pmatrix}}"}},
                {"math": {"latex": rf"A + B = \begin{{pmatrix}}4 & {i+1}\\{i} & 6\end{{pmatrix}}"}},
            ]), False, "PASS",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-pos-pm-{i}", "positive_control", "positive",
            _mk(f"p_pm{i}", "Simplify quadratic formula.", [
                {"math": {"latex": rf"y = \dfrac{{12a \pm \sqrt{{144b^2}}}}{{72}}"}},
                {"math": {"latex": rf"&= \dfrac{{12a \pm 12b}}{{72}}"}},
            ]), False, "PASS",
        ))

    # 16. Legitimate abstention cases (10 cases)
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-abst-prose-{i}", "legitimate_abstention", "abstention",
            _mk(f"absp{i}", "State the geometric property.", [
                {"text": f"The shuttlecock is a combination of a frustum of a cone and a hemisphere (case {i})."},
            ]), True, "ABSTAIN",
        ))
    for i in range(1, 6):
        cases.append(AdversarialV135aCase(
            f"v135a-abst-unbound-{i}", "legitimate_abstention", "abstention",
            _mk(f"absu{i}", "Find the area.", [
                {"math": {"latex": rf"V = \pi r^2 h = {100 * i}"}},
            ]), True, "ABSTAIN",
        ))

    return cases


def run_v1_3_5a_adversarial_suite() -> Dict[str, Any]:
    cases = build_v1_3_5a_suite()
    false_acceptances = 0
    false_rejections = 0
    abstentions = 0
    confirmed_detections = 0
    passed = 0
    details: List[Dict[str, Any]] = []

    for c in cases:
        res = verify_complete_working(c.item, is_concept=False, allow_positive_domain=c.allow_positive_domain)
        obs = res.status
        exp = c.expected_outcome
        if c.control_type == "positive":
            ok = obs == "PASS"
            if not ok:
                false_rejections += 1
        elif c.control_type == "negative":
            if exp == "FAIL":
                ok = obs == "FAIL"
                if obs == "FAIL":
                    confirmed_detections += 1
                elif obs == "PASS":
                    false_acceptances += 1
                else:
                    abstentions += 1
            else:
                ok = obs != "PASS"
                if obs == "PASS":
                    false_acceptances += 1
                else:
                    abstentions += 1
        else:  # abstention
            ok = obs in ("PARTIAL", "UNVERIFIABLE")
            if obs == "PASS":
                false_acceptances += 1
            elif obs == "FAIL":
                false_rejections += 1
            else:
                abstentions += 1
        if ok:
            passed += 1
        details.append({
            "case_id": c.case_id,
            "category": c.category,
            "control_type": c.control_type,
            "expected": exp,
            "observed": obs,
            "passed": ok,
        })

    return {
        "total": len(cases),
        "passed": passed,
        "confirmedDetections": confirmed_detections,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "abstentions": abstentions,
        "details": details,
    }
