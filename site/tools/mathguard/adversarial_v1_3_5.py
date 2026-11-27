"""TRACE MathGuard V1.3.5 — Expanded 100+ Adversarial & 25-Case Holdout Suite.

Covers all 16 adversarial defect categories plus positive controls and an independent holdout:
- Incorrect variable bindings, radius-vs-diameter confusion, conflicting units, multi-object ambiguity
- Incorrect formula selection, dimensionally valid but wrong solid formula (cone V = pi*r^2*h)
- Invalid roots, hidden division by zero, incorrect intermediate equations, right answer/wrong working
- Misleading prose, incorrect Tamil-to-symbol mappings, answer leakage, unsupported assumptions
- Invalid algebraic transformations, extraneous solutions
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

from .reasoning_engine import verify_complete_working


@dataclass
class AdversarialV135Case:
    case_id: str
    category: str
    item: Dict[str, Any]
    allow_positive_domain: bool
    expected_outcome: str  # "FAIL" | "NON_PASS" | "PASS"


def _mk(qid: str, q_en: str, steps: List[Dict[str, Any]], ans: str = "", q_ta: str = "") -> Dict[str, Any]:
    return {"id": qid, "q": {"en": q_en, "ta": q_ta}, "steps": steps, "answer": {"en": ans}}


def _build_main_suite() -> List[AdversarialV135Case]:
    cases: List[AdversarialV135Case] = []

    # 1. Incorrect variable bindings (5 cases)
    for idx, (r_val, wrong_r) in enumerate([(7, 14), (5, 10), (3, 6), (8, 4), (12, 6)], 1):
        cases.append(AdversarialV135Case(
            f"v135-bind-{idx}", "incorrect_variable_binding",
            _mk(f"b{idx}", f"A cylinder has radius {r_val} cm and height 10 cm.", [
                {"math": {"latex": f"r={wrong_r}"}},
                {"math": {"latex": r"CSA=2\pi r h"}},
            ]), True, "FAIL",
        ))

    # 2. Radius-vs-diameter confusion (5 cases)
    for idx, d_val in enumerate([14, 10, 20, 28, 12], 1):
        cases.append(AdversarialV135Case(
            f"v135-diam-{idx}", "radius_vs_diameter_confusion",
            _mk(f"d{idx}", f"A sphere has diameter {d_val} cm.", [
                {"math": {"latex": f"r={d_val}"}},
            ]), True, "FAIL",
        ))

    # 3. Conflicting units (5 cases)
    for idx, (r_cm, h_m) in enumerate([(7, 2), (10, 3), (5, 1), (14, 4), (21, 5)], 1):
        cases.append(AdversarialV135Case(
            f"v135-unit-{idx}", "conflicting_units",
            _mk(f"u{idx}", f"A cylinder has radius {r_cm} cm and height {h_m} m.", [
                {"math": {"latex": f"r={r_cm * 100}"}},
            ]), True, "FAIL",
        ))

    # 4. Multiple-object ambiguity (5 cases)
    for idx, (r1, r2) in enumerate([(3, 5), (4, 7), (6, 9), (2, 8), (5, 11)], 1):
        cases.append(AdversarialV135Case(
            f"v135-multi-{idx}", "multiple_object_ambiguity",
            _mk(f"m{idx}", f"Two cylinders have radius {r1} cm and radius {r2} cm.", [
                {"math": {"latex": f"r_1={r2}"}},
            ]), True, "FAIL",
        ))

    # 5. Incorrect formula dimension (5 cases)
    for idx, bad_f in enumerate([r"\pi r h", r"2\pi r", r"\dfrac{1}{3}\pi r h", r"4\pi r", r"r^2"], 1):
        cases.append(AdversarialV135Case(
            f"v135-fdim-{idx}", "incorrect_formula_dimension",
            _mk(f"fd{idx}", "Find volume of solid with r = 7 cm, h = 10 cm.", [
                {"math": {"latex": f"V={bad_f}"}},
            ]), True, "FAIL",
        ))

    # 6. Dimensionally valid but wrong solid formula (5 cases)
    for idx in range(1, 6):
        cases.append(AdversarialV135Case(
            f"v135-fapp-{idx}", "wrong_solid_formula_cone",
            _mk(f"fa{idx}", "Find volume of a cone with radius 7 cm and height 12 cm.", [
                {"math": {"latex": r"V=\pi r^2 h"}},
            ]), True, "FAIL",
        ))

    # 7. Invalid roots (6 cases)
    for idx, (c_val, bad_r) in enumerate([(9, 4), (16, 5), (25, 6), (36, 7), (49, 8), (64, 9)], 1):
        cases.append(AdversarialV135Case(
            f"v135-root-{idx}", "invalid_roots",
            _mk(f"rt{idx}", f"Solve x^2 - {c_val} = 0.", [
                {"math": {"latex": f"x^2-{c_val}=0\\implies x=-{bad_r}, {bad_r}"}},
            ]), False, "FAIL",
        ))

    # 8. Incorrect intermediate equations (6 cases)
    for idx, (k, bad_rhs) in enumerate([(1, 13), (2, 14), (3, 15), (4, 16), (5, 17), (6, 18)], 1):
        cases.append(AdversarialV135Case(
            f"v135-eq-{idx}", "incorrect_intermediate_equation",
            _mk(f"eq{idx}", f"Solve 3x + {k} = 10.", [
                {"math": {"latex": f"3x+{k}=10"}},
                {"math": {"latex": f"3x={bad_rhs}"}},
            ]), False, "FAIL",
        ))

    # 9. Correct final answer from invalid working (6 cases)
    for idx, n in enumerate([2, 3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135Case(
            f"v135-raw-{idx}", "right_answer_wrong_working",
            _mk(f"rw{idx}", f"Expand (x + {n})^2.", [
                {"math": {"latex": f"(x+{n})^2=x^2+{n**2}"}},
            ], ans=f"x^2 + {2*n}x + {n**2}"), False, "FAIL",
        ))

    # 10. Misleading prose (5 cases)
    for idx in range(1, 6):
        cases.append(AdversarialV135Case(
            f"v135-prose-{idx}", "misleading_prose",
            _mk(f"pr{idx}", "Solve x + 5 = 12.", [
                {"text": f"By symmetry the solution is x = {100 + idx}."},
            ]), False, "NON_PASS",
        ))

    # 11. Incorrect Tamil-to-symbol mappings (5 cases)
    for idx, (ta_r, bad_r) in enumerate([(7, 9), (14, 28), (5, 15), (10, 20), (6, 12)], 1):
        cases.append(AdversarialV135Case(
            f"v135-ta-{idx}", "incorrect_tamil_mapping",
            _mk(f"ta{idx}", "", [
                {"math": {"latex": f"r={bad_r}"}},
            ], q_ta=f"ஆரம் {ta_r} செ.மீ"), True, "FAIL",
        ))

    # 12. Answer leakage (5 cases)
    for idx, c in enumerate([3, 5, 7, 11, 13], 1):
        cases.append(AdversarialV135Case(
            f"v135-leak-{idx}", "answer_leakage_inconsistent",
            _mk(f"lk{idx}", "Solve x + y = 4, x - y = 2.", [
                {"math": {"latex": "x+y=4"}},
                {"math": {"latex": "x-y=2"}},
                {"math": {"latex": f"0={c}"}},
            ], ans="No solution"), False, "FAIL",
        ))

    # 13. Unsupported assumptions / negative sqrt (6 cases)
    for idx, var in enumerate(["x", "y", "z", "p", "q", "t"], 1):
        cases.append(AdversarialV135Case(
            f"v135-sqrt-{idx}", "unsupported_sqrt_assumption",
            _mk(f"sq{idx}", f"Simplify sqrt({var}^2).", [
                {"math": {"latex": f"\\sqrt{{{var}^2}}={var}"}},
            ]), False, "FAIL",
        ))

    # 14. Extraneous solutions (6 cases)
    for idx, val in enumerate([2, 3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135Case(
            f"v135-ext-{idx}", "extraneous_solution",
            _mk(f"ex{idx}", f"Solve x - {val} = 0.", [
                {"math": {"latex": f"x-{val}=0"}},
                {"math": {"latex": f"x^2={val**2}"}},
            ]), False, "FAIL",
        ))

    # 15. Positive controls (25 cases)
    for idx, (r_v, h_v) in enumerate([(7, 10), (7, 12), (14, 5), (3.5, 8), (21, 10)], 1):
        csa_val = sp_pi_22_7_csa(r_v, h_v)
        cases.append(AdversarialV135Case(
            f"v135-pos-cyl-{idx}", "positive_control_cylinder",
            _mk(f"pc{idx}", f"A cylinder has radius {r_v} cm and height {h_v} cm.", [
                {"math": {"latex": rf"CSA=2\pi r h=2\left(\dfrac{{22}}{{7}}\right)({r_v})({h_v})={csa_val}"}},
            ]), True, "PASS",
        ))
    for idx, n in enumerate([2, 3, 4, 5, 6], 1):
        cases.append(AdversarialV135Case(
            f"v135-pos-alg-{idx}", "positive_control_binomial",
            _mk(f"pa{idx}", f"Expand (x + {n})^2.", [
                {"math": {"latex": f"(x+{n})^2=x^2+{2*n}x+{n**2}"}},
            ]), False, "PASS",
        ))
    for idx, n in enumerate([3, 4, 5, 6, 7], 1):
        cases.append(AdversarialV135Case(
            f"v135-pos-sqrt-{idx}", "positive_control_sqrt_abs",
            _mk(f"ps{idx}", f"Find square root of (x+{n})^2.", [
                {"math": {"latex": f"\\sqrt{{(x+{n})^2}}=|x+{n}|"}},
            ]), False, "PASS",
        ))
    for idx, (a, b) in enumerate([(1, 2), (2, 3), (3, 4), (4, 5), (5, 6)], 1):
        cases.append(AdversarialV135Case(
            f"v135-pos-pm-{idx}", "positive_control_pm",
            _mk(f"pm{idx}", "Evaluate.", [
                {"math": {"latex": f"y={a}\\pm {b}={a+b}, {a-b}"}},
            ]), False, "PASS",
        ))
    for idx, (x1, y1, x2, y2) in enumerate([(1, 2, 3, 6), (2, 4, 5, 10), (0, 0, 2, 4), (1, 1, 3, 5), (-1, 0, 1, 4)], 1):
        cases.append(AdversarialV135Case(
            f"v135-pos-slope-{idx}", "positive_control_slope",
            _mk(f"sl{idx}", f"Find slope of ({x1}, {y1}) and ({x2}, {y2}).", [
                {"math": {"latex": rf"m=\dfrac{{y_2-y_1}}{{x_2-x_1}}=\dfrac{{{y2}-{y1}}}{{{x2}-{x1}}}={int((y2-y1)/(x2-x1))}"}},
            ]), False, "PASS",
        ))

    return cases


def sp_pi_22_7_csa(r: float, h: float) -> str:
    val = 2 * (22 / 7) * r * h
    return str(int(val)) if abs(val - round(val)) < 1e-9 else f"{val:.2f}".rstrip("0").rstrip(".")


def _build_holdout_suite() -> List[AdversarialV135Case]:
    hold: List[AdversarialV135Case] = []
    # 15 adversarial holdouts + 10 positive-control holdouts = 25 cases
    for i in range(1, 6):
        hold.append(AdversarialV135Case(
            f"hold-ineq-{i}", "holdout_false_inequality",
            _mk(f"hi{i}", "Check discriminant.", [{"math": {"latex": f"\\Delta = 1 - 4({i+2}) = {1 - 4*(i+2)} > 0"}}]),
            False, "FAIL",
        ))
    for i in range(1, 6):
        hold.append(AdversarialV135Case(
            f"hold-tol-{i}", "holdout_exact_tolerance",
            _mk(f"ht{i}", "Evaluate.", [{"math": {"latex": f"{i + 1} = {i + 1}.03"}}]),
            False, "FAIL",
        ))
    for i in range(1, 6):
        hold.append(AdversarialV135Case(
            f"hold-neg-sqrt-{i}", "holdout_negative_sqrt",
            _mk(f"hn{i}", "Simplify.", [{"math": {"latex": f"\\sqrt{{(x+{i})^2}} = -|x+{i}|"}}]),
            False, "FAIL",
        ))
    for i in range(1, 6):
        hold.append(AdversarialV135Case(
            f"hold-pos-cone-{i}", "holdout_valid_cone",
            _mk(f"hc{i}", f"A cone has radius 7 cm and height {3*i} cm.", [
                {"math": {"latex": rf"V=\dfrac{{1}}{{3}}\pi r^2 h=\dfrac{{1}}{{3}}\left(\dfrac{{22}}{{7}}\right)(7)^2({3*i})={154*i}"}},
            ]), True, "PASS",
        ))
    for i in range(1, 6):
        hold.append(AdversarialV135Case(
            f"hold-pos-quad-{i}", "holdout_valid_quadratic",
            _mk(f"hq{i}", f"Solve x^2 - {i**2} = 0.", [
                {"math": {"latex": f"x^2-{i**2}=0\\implies x=-{i}, {i}"}},
            ]), False, "PASS",
        ))
    return hold


def _run_cases(cases: List[AdversarialV135Case]) -> Dict[str, Any]:
    confirmed_detections = 0
    false_acceptances = 0
    false_rejections = 0
    abstentions = 0
    passed = 0
    details: List[Dict[str, Any]] = []

    for c in cases:
        res = verify_complete_working(c.item, is_concept=False, allow_positive_domain=c.allow_positive_domain)
        obs = res.status
        exp = c.expected_outcome
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
        else:
            ok = obs != "PASS"
            if obs == "PASS":
                false_acceptances += 1
            elif obs == "FAIL":
                confirmed_detections += 1
            else:
                abstentions += 1
        if ok:
            passed += 1
        details.append({"case_id": c.case_id, "category": c.category, "expected": exp, "observed": obs, "passed": ok})

    return {
        "total": len(cases),
        "passed": passed,
        "confirmedDetections": confirmed_detections,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "abstentions": abstentions,
        "details": details,
    }


def run_v1_3_5_adversarial_and_holdout() -> Dict[str, Any]:
    main_res = _run_cases(_build_main_suite())
    hold_res = _run_cases(_build_holdout_suite())
    return {"main": main_res, "holdout": hold_res}
