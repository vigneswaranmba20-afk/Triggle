"""Regression checks for the independent audit's acceptance boundaries."""
import sympy as sp

from algebra_oracles import excluded_values
from audit_curriculum import expression, polynomial_expression
from geometry_oracles import value_with_unit
from number_oracles import rounded_matches, signed_fraction
from trig_oracles import evaluate_angle_expression, exact_angle_prompts


def test_exact_arithmetic_uses_original_numeric_tokens():
    assert expression("0.1 + 0.2") == sp.Rational(3, 10)
    assert expression("−2³ + 2⁻³") == -sp.Rational(63, 8)
    assert expression("1/0") is None
    assert expression("√(x²)") == sp.Abs(sp.Symbol("x", real=True))
    assert signed_fraction("−0.1(6)") == -sp.Rational(1, 6)


def test_cancelled_factor_does_not_erase_original_exclusion():
    prompt = "Find the excluded values, if any of the following expressions. (iii) (x²+6x+8)/(x²+x−2)"
    outcome = excluded_values(prompt, ("1", "−2, 1"), polynomial_expression)
    assert outcome == ("original_denominator_real_zeros", ["-2", "1"], [False, True])


def test_rounding_and_units_are_checked_at_requested_precision():
    assert rounded_matches(sp.Rational(2469, 2000), sp.Rational(1235, 1000), sp.Rational(1, 1000))
    assert not rounded_matches(sp.Rational(2469, 2000), sp.Rational(1234, 1000), sp.Rational(1, 1000))
    assert value_with_unit("72 cm²", expression, "cm²") == 72
    assert value_with_unit("72 cm", expression, "cm²") is None


def test_trig_preserves_undefined_terms_and_rejects_unparsed_answer_claims():
    assert evaluate_angle_expression("sin 30°/cos 60°", expression) == 1
    assert evaluate_angle_expression("0 tan 90°", expression) is None
    assert evaluate_angle_expression("sin 30°/sin 0°", expression) is None
    assert exact_angle_prompts("Verify: tan 45° = 1", ("LHS = RHS = 1", "@ = 1"), expression) == (
        "exact_degree_trig_identity_values", ["1"], [True, False]
    )
