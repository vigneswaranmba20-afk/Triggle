"""TRACE MathGuard V1.4b unit and 240-case adversarial tests."""

from __future__ import annotations

import sympy as sp

from mathguard.adversarial_v1_4b import run_v1_4b_adversarial_suite
from mathguard.symbolic_reasoning import FunctionRegistry, PolynomialReasoner
from mathguard.tamil_semantic_parity import semantic_step_parity_check


def test_v1_4b_240_case_adversarial_suite():
    res = run_v1_4b_adversarial_suite()
    assert res["totalCases"] >= 200
    assert res["failed"] == 0, f"V1.4b adversarial failures: {res['failures'][:10]}"
    assert res["falseAcceptances"] == 0
    assert res["falseRejections"] == 0


def test_polynomial_reasoner_operations():
    x = sp.Symbol("x")
    p1 = sp.expand((x - 1) * (x - 2))
    p2 = sp.expand((x - 1) * (x + 3))
    assert PolynomialReasoner.verify_factor_theorem(p1, x - 1) is True
    assert PolynomialReasoner.verify_factor_theorem(p1, x + 5) is False
    assert PolynomialReasoner.verify_remainder_theorem(x**3 - 1, x - 1, sp.Integer(0)) is True
    assert PolynomialReasoner.verify_remainder_theorem(x**3 + 2, x - 1, sp.Integer(3)) is True
    assert PolynomialReasoner.verify_gcd_lcm(p1, p2, claimed_gcd=x - 1) is True
    assert PolynomialReasoner.verify_gcd_lcm(p1, p2, claimed_gcd=x - 2) is False


def test_function_registry_evaluations():
    reg = FunctionRegistry()
    x, a, b = sp.Symbol("x"), sp.Symbol("a"), sp.Symbol("b")
    reg.define("p", ("x",), a * x + b)
    assert sp.simplify(reg.evaluate("p", [-b / a])) == 0
    reg.define("f", ("y",), 6 * sp.Symbol("y") - 3 * sp.Symbol("y") ** 2 + 3)
    assert reg.evaluate("f", [sp.Integer(0)]) == 3


def test_tamil_semantic_parity_equivalences():
    assert semantic_step_parity_check("The degree is four.", "படி 4 ஆகும்.")[0] is True
    assert semantic_step_parity_check("Compute 36 - 6.", "மதிப்பு 30.")[0] is True
    assert semantic_step_parity_check("Length is 100 cm.", "நீளம் 1 மீ.")[0] is True
    assert semantic_step_parity_check("Take 1/2.", "0.5 மடங்கு.")[0] is True
    assert semantic_step_parity_check("Side is 7 cm.", "பக்கம் 9 செ.மீ.", math_latex="a=7")[0] is False
    assert semantic_step_parity_check("Sum is 5.", "Tamil unchanged", math_latex="2+3=5")[0] is False
