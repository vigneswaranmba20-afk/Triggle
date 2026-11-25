"""TRACE MathGuard V1.3.3 — Independent Curriculum Mutation Test Suite for Grade 10 Chapter 3."""

from __future__ import annotations

import copy
from pathlib import Path
from typing import Any, Dict, List

import sympy as sp

from .audit_chapters import load_all_3_chapters
from .ch3_verifier import verify_ch3_answer
from .derivations_g10_ch3 import derive_ch3_for_item
from .matrix_solver import matrices_equal, matrix_mul
from .steps import validate_steps


def run_ch3_mutation_suite(repo_root: Path) -> Dict[str, Any]:
    bundle = load_all_3_chapters(repo_root)
    ch3_ex = {it["id"]: it for it in bundle["chapters"]["3"]["exercises"]}
    ch3_co = {c["id"]: c for c in bundle["chapters"]["3"]["concepts"]}

    cases: List[Dict[str, Any]] = []

    def _check_ans(cid: str, qid: str, cat: str, mut_ans: str, exp_statuses: tuple[str, ...], is_concept: bool = False):
        if is_concept:
            item = copy.deepcopy(ch3_co[qid])
            item["choices"] = [{"en": mut_ans}]
            item["correct"] = 0
        else:
            item = copy.deepcopy(ch3_ex[qid])
            item["answer"] = {"en": mut_ans}
        deriv = derive_ch3_for_item(qid, item, is_concept=is_concept)
        status, reason = verify_ch3_answer(item, deriv, is_concept=is_concept)
        cases.append({
            "caseId": cid, "qid": qid, "category": cat,
            "expected": list(exp_statuses), "observed": status,
            "passed": status in exp_statuses, "reason": reason,
        })

    def _check_q(cid: str, qid: str, cat: str, old_s: str, new_s: str, exp_statuses: tuple[str, ...]):
        item = copy.deepcopy(ch3_ex[qid])
        item["q"]["en"] = item["q"]["en"].replace(old_s, new_s, 1)
        deriv = derive_ch3_for_item(qid, item, is_concept=False)
        status, reason = verify_ch3_answer(item, deriv, is_concept=False)
        cases.append({
            "caseId": cid, "qid": qid, "category": cat,
            "expected": list(exp_statuses), "observed": status,
            "passed": status in exp_statuses, "reason": reason,
        })

    # 1. Missing, extraneous, duplicate, and repeated roots
    _check_ans("ch3-mut-missing-root", "c10-3-ex3-10-q1-i", "missing_root", "2", ("FAIL",))
    _check_ans("ch3-mut-extra-root", "c10-3-ex3-10-q1-iii", "extraneous_root", "−2, 9, 10", ("FAIL",))
    _check_ans("ch3-mut-dup-root", "c10-3-ex3-10-q1-i", "duplicate_root", "2, 2", ("FAIL",))
    _check_ans("ch3-mut-missing-mult", "c10-3-ex3-10-q1-v", "missing_multiplicity", "1/4", ("FAIL",))

    # 2. Swapped tuple & swapped variable assignments
    _check_ans("ch3-mut-swapped-tuple", "c10-3-ex3-1-q1-i", "swapped_tuple", "(x, y, z) = (−1, 2, 4)", ("FAIL",))
    _check_ans("ch3-mut-swapped-params", "c10-3-ex3-8-q2-i", "swapped_variables", "a = −42, b = 49", ("FAIL",))

    # 3. Incorrect signs & discriminant/root nature
    _check_ans("ch3-mut-wrong-sign", "c10-3-ex3-14-q6", "incorrect_sign", "36", ("FAIL",))
    _check_ans("ch3-mut-wrong-quad-sign", "c10-3-ex3-9-q1-i", "incorrect_sign", "x² − 9x + 20 = 0", ("FAIL",))
    _check_ans("ch3-mut-wrong-nature", "c10-3-ex3-13-q1-iii", "incorrect_discriminant", "Real and unequal", ("FAIL",))
    _check_ans("ch3-mut-wrong-sys-nature", "c10-3-ex3-1-q2-i", "incorrect_nature", "unique solution", ("FAIL",))

    # 4. Invalid cancellation & excluded values
    _check_ans("ch3-mut-invalid-cancel", "c10-3-ex3-4-q1-i", "invalid_cancellation", "x − 1", ("FAIL",))
    _check_ans("ch3-mut-missing-excl", "c10-3-ex3-4-q2-iv", "missing_excluded_value", "0, 2", ("FAIL",))

    # 5. Incorrect polynomial factors & square roots
    _check_ans("ch3-mut-wrong-factor", "c10-3-ex3-2-q2-iv", "incorrect_factors", "(p − 1)(p − 2)", ("FAIL",))
    _check_ans("ch3-mut-wrong-sqrt-sign", "c10-3-ex3-7-q2-i", "incorrect_sqrt", "|2x − 5|", ("FAIL",))

    # 6. Matrix order & multiplication order & entries
    _check_ans("ch3-mut-mat-transpose-order", "g10-ch3-matrix-types", "invalid_matrix_order", "3 × 4", ("FAIL",), is_concept=True)
    _check_ans("ch3-mut-mat-prod-order", "g10-ch3-matrix-ops", "invalid_matrix_order", "3 × 3", ("FAIL",), is_concept=True)

    A = sp.Matrix([[1, 2, 3], [4, 5, 6]])
    B = sp.Matrix([[1, 0], [0, 1], [1, 1]])
    prod_ok = matrix_mul(A, B)
    prod_bad_order = matrix_mul(B, A)  # 3x2 * 2x3 is valid 3x3, whereas 2x3 * 2x3 is invalid!
    C = sp.Matrix([[1, 2], [3, 4]])
    invalid_dim = matrix_mul(C, B)  # 2x2 * 3x2 -> None
    swapped_entry = sp.Matrix([[4, 5], [11, 10]])  # swapped bottom row vs [[4, 5], [10, 11]]
    cases.append({
        "caseId": "ch3-mut-mat-invalid-dim", "qid": "matrix_solver", "category": "invalid_matrix_dimensions",
        "expected": ["None"], "observed": str(invalid_dim), "passed": invalid_dim is None, "reason": "",
    })
    cases.append({
        "caseId": "ch3-mut-mat-entry-pos", "qid": "matrix_solver", "category": "incorrect_matrix_entry",
        "expected": ["False"], "observed": str(matrices_equal(prod_ok, swapped_entry)),
        "passed": (prod_ok is not None) and (not matrices_equal(prod_ok, swapped_entry)), "reason": "",
    })

    # 7. Division by zero in step validator
    div0 = validate_steps([{"eq": "", "math": {"latex": r"\dfrac{x^2-1}{0}=x+1"}}])
    cases.append({
        "caseId": "ch3-mut-div-zero", "qid": "steps_validator", "category": "division_by_zero",
        "expected": ["FAIL"], "observed": div0.status, "passed": div0.status == "FAIL", "reason": "",
    })

    # 8. Incomplete multi-part & wrong variation
    _check_ans("ch3-mut-incomplete-mp", "c10-3-ex3-15-q3-i", "incomplete_multipart", "k = 1/2", ("FAIL",))
    _check_ans("ch3-mut-wrong-variation", "c10-3-ex3-15-q6-i", "wrong_variation", "Inverse variation; ₹90", ("FAIL",))

    # 9. Changed question givens (stale derivation invalidation)
    _check_q("ch3-mut-changed-q", "c10-3-ex3-1-q1-i", "changed_givens", "x + y + z = 5", "x + y + z = 6", ("UNVERIFIABLE",))

    dt_item = copy.deepcopy(ch3_ex["c10-3-ex3-15-q4-i"])
    dt_item["dataTable"]["rows"][0][1] = "99"
    d_dt = derive_ch3_for_item("c10-3-ex3-15-q4-i", dt_item, is_concept=False)
    st_dt, _ = verify_ch3_answer(dt_item, d_dt, is_concept=False)
    cases.append({
        "caseId": "ch3-mut-changed-table", "qid": "c10-3-ex3-15-q4-i", "category": "changed_table_givens",
        "expected": ["UNVERIFIABLE"], "observed": st_dt, "passed": st_dt == "UNVERIFIABLE", "reason": d_dt.notes,
    })

    # 10. Valid equivalent expressions (positive controls)
    _check_ans("ch3-ctrl-quad-mult", "c10-3-ex3-9-q1-ii", "equivalent_quad_multiple", "6x² − 10x + 24 = 0", ("PASS",))
    _check_ans("ch3-ctrl-sqrt-neg", "c10-3-ex3-7-q2-i", "equivalent_abs_sqrt", "|−2x − 5|", ("PASS",))

    passed = sum(1 for c in cases if c["passed"])
    return {"total": len(cases), "passed": passed, "failed": len(cases) - passed, "cases": cases}
