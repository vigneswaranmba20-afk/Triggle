"""TRACE MathGuard V1.3.2a — Independent Curriculum Mutation Test Suite for Grade 10 Chapter 5."""

from __future__ import annotations

import copy
from pathlib import Path
from typing import Any, Dict, List

from .audit_chapters import load_all_3_chapters
from .ch5_verifier import verify_ch5_answer
from .derivations_g10_ch5 import derive_ch5_for_item


def run_ch5_mutation_suite(repo_root: Path) -> Dict[str, Any]:
    bundle = load_all_3_chapters(repo_root)
    ch5_ex = {it["id"]: it for it in bundle["chapters"]["5"]["exercises"]}

    cases: List[Dict[str, Any]] = []

    def _check_ans_mut(case_id: str, qid: str, category: str, mutated_answer: str, expected_statuses: tuple[str, ...]):
        item = copy.deepcopy(ch5_ex[qid])
        item["answer"] = {"en": mutated_answer}
        deriv = derive_ch5_for_item(qid, item, is_concept=False)
        status, reason = verify_ch5_answer(item, deriv, is_concept=False)
        cases.append({
            "caseId": case_id,
            "qid": qid,
            "category": category,
            "expected": list(expected_statuses),
            "observed": status,
            "passed": status in expected_statuses,
            "reason": reason,
        })

    def _check_q_mut(case_id: str, qid: str, category: str, old_substr: str, new_substr: str, expected_statuses: tuple[str, ...]):
        item = copy.deepcopy(ch5_ex[qid])
        item["q"]["en"] = item["q"]["en"].replace(old_substr, new_substr, 1)
        deriv = derive_ch5_for_item(qid, item, is_concept=False)
        status, reason = verify_ch5_answer(item, deriv, is_concept=False)
        cases.append({
            "caseId": case_id,
            "qid": qid,
            "category": category,
            "expected": list(expected_statuses),
            "observed": status,
            "passed": status in expected_statuses,
            "reason": reason,
        })

    # 1. Missing roots & extraneous roots
    _check_ans_mut("mut-missing-root", "c10-5-ex5-1-q4-ii", "missing_root", "a = 1/2", ("FAIL",))
    _check_ans_mut("mut-extraneous-root", "c10-5-ex5-1-q4-ii", "extraneous_root", "a = 1/2 or a = −1 or a = 5", ("FAIL",))

    # 2. Duplicate answers replacing distinct solutions
    _check_ans_mut("mut-dup-scalar-set", "c10-5-ex5-1-q4-ii", "duplicate_root", "a = 1/2 or a = 1/2", ("FAIL",))
    _check_ans_mut("mut-dup-point-list", "c10-5-unit-q2", "duplicate_point", "(7/2, 13/2), (7/2, 13/2)", ("FAIL",))
    _check_ans_mut("mut-dup-line-list", "c10-5-ex5-4-q7", "duplicate_line", "2x + 5y + 6 = 0, 2x + 5y + 6 = 0", ("FAIL",))

    # 3. Swapped variables & coordinates & vertex labels
    _check_ans_mut("mut-swapped-vars", "c10-5-ex5-1-q7", "swapped_variables", "a = −1, b = 2", ("FAIL",))
    _check_ans_mut("mut-swapped-intercepts", "c10-5-ex5-3-q13-i", "swapped_ordered_list", "−3, 2", ("FAIL",))
    _check_ans_mut("mut-swapped-xy", "c10-5-5-practice-20", "swapped_coordinates", "(7, 5)", ("FAIL",))
    _check_ans_mut(
        "mut-swapped-vertex-labels",
        "c10-5-ex5-1-q8",
        "swapped_vertex_labels",
        "A(15, 7), B(7, 7), C(12, 1); Area(ΔABC) = 24 sq. units; Area(ΔABC) = 4 × Area(ΔPQR)",
        ("FAIL",),
    )

    # 4. Reversed & ambiguous geometric conclusions
    _check_ans_mut("mut-rev-collinear", "c10-5-ex5-1-q2-i", "reversed_conclusion", "The given points are not collinear", ("FAIL",))
    _check_ans_mut("mut-rev-right-tri", "c10-5-ex5-2-q9-i", "reversed_conclusion", "No, ΔABC is not right-angled", ("FAIL",))
    _check_ans_mut("mut-rev-parallel", "c10-5-ex5-4-q3-i", "reversed_conclusion", "Not Parallel", ("FAIL",))
    _check_ans_mut("mut-rev-parallelogram", "c10-5-ex5-2-q10", "reversed_conclusion", "Not a parallelogram", ("FAIL",))
    _check_ans_mut("mut-ambiguous-geom", "c10-5-ex5-1-q2-i", "ambiguous_conclusion", "Points lie in the Cartesian plane", ("UNVERIFIABLE", "FAIL"))

    # 5. Nonlinear / degenerate / invalid-var line equations (+ valid scalar-multiple control)
    _check_ans_mut("mut-nonlinear-x2", "c10-5-ex5-3-q6", "nonlinear_equation", "x^2 + x - y - 16 = 0", ("FAIL",))
    _check_ans_mut("mut-nonlinear-xy", "c10-5-ex5-3-q6", "nonlinear_equation", "x*y + x - y - 16 = 0", ("FAIL",))
    _check_ans_mut("mut-invalid-denom", "c10-5-ex5-3-q6", "invalid_denominator", "1/x - y - 16 = 0", ("FAIL",))
    _check_ans_mut("mut-unexpected-var", "c10-5-ex5-3-q6", "unexpected_variable", "x - y + z - 16 = 0", ("FAIL",))
    _check_ans_mut("mut-degenerate-line", "c10-5-ex5-3-q6", "degenerate_equation", "0 = 0", ("FAIL",))
    _check_ans_mut("ctrl-scalar-mult-line", "c10-5-ex5-3-q6", "valid_scalar_multiple", "2x - 2y - 32 = 0", ("PASS",))

    # 6. Incorrect signs & units
    _check_ans_mut("mut-wrong-sign", "c10-5-ex5-1-q3-i", "incorrect_sign", "p = −44", ("FAIL",))
    _check_ans_mut("mut-wrong-unit-vol", "c10-5-ex5-1-q1-i", "incorrect_unit", "24 cu. units", ("FAIL",))
    _check_ans_mut("mut-wrong-unit-deg", "c10-5-ex5-1-q1-i", "incorrect_unit", "24°", ("FAIL",))

    # 7. Changed question givens (stale derivation invalidation)
    _check_q_mut("mut-changed-coord-q1", "c10-5-ex5-1-q1-i", "changed_givens", "(1, −1)", "(2, −1)", ("UNVERIFIABLE",))
    _check_q_mut("mut-changed-coord-q3", "c10-5-ex5-1-q3-i", "changed_givens", "20", "25", ("UNVERIFIABLE",))

    # 8. Incomplete / partially wrong multi-part answers
    _check_ans_mut("mut-multipart-missing-area", "c10-5-ex5-1-q8", "incomplete_multipart", "A(7, 7), B(15, 7), C(12, 1)", ("FAIL",))
    _check_ans_mut(
        "mut-multipart-wrong-area",
        "c10-5-ex5-1-q8",
        "wrong_multipart_area",
        "A(7, 7), B(15, 7), C(12, 1); Area(ΔABC) = 12 sq. units; Area(ΔABC) = 4 × Area(ΔPQR)",
        ("FAIL",),
    )
    _check_ans_mut(
        "mut-multipart-missing-inclination",
        "c10-5-ex5-3-q2",
        "incomplete_multipart",
        "slope = 1, y-intercept = 5/2",
        ("FAIL",),
    )

    passed = sum(1 for c in cases if c["passed"])
    return {
        "total": len(cases),
        "passed": passed,
        "failed": len(cases) - passed,
        "cases": cases,
    }
