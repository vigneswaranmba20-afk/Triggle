"""Independent expected values for scalar mensuration verification."""

import pytest
import sympy as sp

from mathguard.derivations_g10_ch7 import DerivedResult
from mathguard.engine import _verify_exercise_answer


def check(question, answer, expected, dimension="area", answer_math=None):
    item = {"q": {"en": question}, "answer": answer, "answerMath": answer_math}
    derived = DerivedResult(True, "synthetic_mensuration", expected, dimension)
    return _verify_exercise_answer(item, derived)[0]


@pytest.mark.parametrize(("answer", "status"), [
    ("Area = 31415.93 cm²", "FAIL"),
    ("Area = 31428.56 cm²", "FAIL"),
    ("Area = 31428.570 cm²", "FAIL"),
    ("Area = 10000π cm²", "FAIL"),
    ("Area = 31428.57 cm²", "PASS"),
    ("A = 10000π cm² ≈ 31428.57 cm²", "PASS"),
])
def test_mandated_pi_and_rounding(answer, status):
    # (22/7) × 100² = 220000/7, which rounds to 31428.57.
    prompt = "Find the area of a circle of radius 100 cm. Use π = 22/7 and round to two decimal places."
    assert check(prompt, answer, 10000 * sp.pi) == status


def test_other_pi_conventions_are_bound_to_the_question():
    prompt = "Find the area of a circle of radius 100 cm. Take π as 3.14."
    assert check(prompt, "31400 cm²", 10000 * sp.pi) == "PASS"
    assert check(prompt, "31428.57 cm²", 10000 * sp.pi) == "FAIL"
    assert check("Give the area in terms of π.", "10000π cm²", 10000 * sp.pi) == "PASS"
    assert check("Give the area in terms of π.", "31415.93 cm²", 10000 * sp.pi) == "FAIL"
    assert check("Use π = 3.14 and π = 22/7.", "31400 cm²", 10000 * sp.pi) == "UNVERIFIABLE"
    assert check("Use π = 22/0.", "31400 cm²", 10000 * sp.pi) == "UNVERIFIABLE"
    assert check("Use π = 3.14 + 0.01.", "31400 cm²", 10000 * sp.pi) == "UNVERIFIABLE"


@pytest.mark.parametrize(("answer", "status"), [
    ("Area = 1 cm²; an unrelated check figure is 40 cm²", "FAIL"),
    ("Area = 1 cm² = 40 cm²", "FAIL"),
    ("Area = 1 cm² (40 cm² from a check)", "FAIL"),
    ("Area = 1 cm²; Area = 40 cm²", "UNVERIFIABLE"),
    ("Unrelated area = 40 cm²; Area = 1 cm²", "UNVERIFIABLE"),
    ("Perimeter = 40 cm²", "UNVERIFIABLE"),
    ("Area = −40 cm²", "FAIL"),
    ("Area = 40 cm³", "FAIL"),
    ("40 sq. cm", "PASS"),
    ("Answer: Area = 40 cm²; check the multiplication separately", "PASS"),
])
def test_only_the_requested_result_can_satisfy_the_oracle(answer, status):
    assert check("Find the area of an 8 cm by 5 cm rectangle.", answer, sp.Integer(40)) == status


def test_a_structured_answer_cannot_rescue_a_conflicting_result_field():
    structured = {"en": {"latex": r"\boxed{40\,\mathrm{cm}^2}", "fallback": "40 cm²"}}
    question = "Find the area of an 8 cm by 5 cm rectangle."
    assert check(question, "Area = 1 cm²", sp.Integer(40), answer_math=structured) == "FAIL"
    assert check(question, "", sp.Integer(40), answer_math=structured) == "PASS"
    structured["en"]["fallback"] = "1 cm²"
    assert check(question, "Area = 40 cm²", sp.Integer(40), answer_math=structured) == "FAIL"
    assert check(question, "", sp.Integer(40), answer_math={"latex": r"\boxed{40\,\mathrm{cm}^2}"}) == "PASS"
    assert check(question, "", sp.Integer(40), answer_math={"latex": r"\boxed{40\,\mathrm{cm}^3}"}) == "FAIL"


def test_nearest_unit_and_decimal_tie_do_not_use_a_tolerance_band():
    # 2.464... cm³ falls below 2.5, and 1.245 rounds up to 1.25.
    prompt = "Find the volume to the nearest cm³."
    assert check(prompt, "2.46 cm³", sp.Rational(98, 125) * sp.pi, "volume") == "FAIL"
    assert check(prompt, "2 cm³", sp.Rational(98, 125) * sp.pi, "volume") == "PASS"
    prompt = "Round the calculated number to two decimal places."
    assert check(prompt, "1.25", sp.Rational(249, 200), None) == "PASS"
    assert check(prompt, "1.24", sp.Rational(249, 200), None) == "FAIL"
    assert check(prompt, "−1.25", -sp.Rational(249, 200), None) == "PASS"


def test_equivalent_units_in_one_result_must_agree():
    prompt = "Find the volume remaining."
    assert check(prompt, "1,000 cm³ = 1 litre", sp.Integer(1000), "volume") == "PASS"
    assert check(prompt, "1,000 cm³ = 2 litres", sp.Integer(1000), "volume") == "FAIL"
    assert check("Find the height.", "Width = 4 cm", sp.Integer(4), "length") == "UNVERIFIABLE"


def test_numeric_choices_obey_pi_and_rounding():
    prompt = (
        "Use π = 3.14 and round the area to two decimal places.\n"
        "(A) 314.16 cm²\n(B) 314.00 cm²"
    )
    assert check(prompt, "(A) 314.16 cm²", 100 * sp.pi) == "FAIL"
    assert check(prompt, "(B) 314.00 cm²", 100 * sp.pi) == "PASS"
