"""Independent checks. Run against the pinned MathGuard worktree with PYTHONPATH."""
import pytest
import sympy as sp

from mathguard.adapters.algebra_adapter import AlgebraAdapter
from mathguard.adapters.base import verify_tamil_math_parity
from mathguard.adapters.sets_relations_adapter import SetsRelationsFunctionsAdapter
from mathguard.parser import parse_expression
from mathguard.reasoning_engine import verify_complete_working
from mathguard.rounding import check_numeric_match
from mathguard.units import are_unit_converted_equivalent


def item(question, equations, answer, tamil_answer=None):
    return {
        "id": "independent-no-fingerprint",
        "q": {"en": question},
        "steps": [{"eq": eq} for eq in equations],
        "answer": {"en": answer, "ta": tamil_answer or answer},
    }


@pytest.mark.parametrize(
    ("equations", "answer", "expected"),
    [
        (["A ∪ B = {2,5,11}"], "{11,2,5}", "PASS"),
        (["A ∪ B = {2,5,11}"], "{2,5,13}", "FAIL"),
        (["A = {2,13}", "A ∪ B = {2,5,11,13}"], "{2,5,11,13}", "FAIL"),
        (["A ∪ B = {2,5,11}", "A ∩ B = {2}"], "{2,5,11}", "FAIL"),
    ],
)
def test_finite_union_from_question(equations, answer, expected):
    # Python sets give {2,5,11} and ∅ respectively for union and intersection.
    assert {2, 5} | {11} == {2, 5, 11}
    assert not ({2, 5} & {11})
    record = item("Given A = {2,5}, B = {11}, find A ∪ B.", equations, answer)
    result = SetsRelationsFunctionsAdapter(9, "1").verify_item(record)
    assert result["answer_status"] == expected, result


@pytest.mark.parametrize(
    ("question", "equations", "answer"),
    [
        ("Find the value of 17 + 34.", ["17 + 34 = 51"], "52"),
        ("Evaluate 99 - 7.", ["a = 5", "99 - 7 = 92"], "5"),
        ("Find 17 + 34 in exact form.", ["17 + 34 = 51"], "51.01"),
    ],
)
def test_unanchored_answer_never_passes(question, equations, answer):
    record = item(question, equations, answer)
    result = AlgebraAdapter(9, "3").verify_item(record)
    assert result["answer_status"] in {"FAIL", "UNVERIFIABLE"}, result


def test_missing_tamil_question_and_work_never_passes():
    record = item("Evaluate 23 + 9.", ["23 + 9 = 32"], "32", "32")
    assert verify_tamil_math_parity(record).status in {"PARTIAL", "UNVERIFIABLE"}


@pytest.mark.parametrize(
    ("equation", "expected"),
    [
        ("5/14 + 3/7 = 11/14", "PASS"),
        ("5/14 + 3/7 = 6/7", "FAIL"),
        ("(x^2 - 1)/(x - 1) = x + 1", "UNVERIFIABLE"),
        ("sqrt(x^2) = x", "FAIL"),
        ("1/0 = 0", "FAIL"),
        ("5 kg = 5 m", "FAIL"),
        ("2^(-3) = 1/8", "PASS"),
        ("3*(x-2) = 3*x-6", "PASS"),
    ],
)
def test_working_independent_cases(equation, expected):
    record = item("Check the stated real-valued equality for all real x.", [equation], "")
    result = verify_complete_working(record)
    if expected == "UNVERIFIABLE":
        # At x=1 only the right side is defined. Rejection or a domain abstention is sound.
        assert result.status in {"FAIL", "PARTIAL", "UNVERIFIABLE"}, result.failed_details
    else:
        assert result.status == expected, result.failed_details


def test_exact_numbers_units_and_rounding():
    assert parse_expression("7/19 + 4/19") == sp.Rational(11, 19)
    assert are_unit_converted_equivalent("1 m²", 1, "10000 cm²", 10000)
    assert not are_unit_converted_equivalent("1 m²", 1, "100 cm²", 100)
    assert check_numeric_match(sp.Rational(2, 3), 0.667, tolerance=0.0005).matched
    assert not check_numeric_match(sp.Rational(2, 3), 0.666, tolerance=0.0005).matched
