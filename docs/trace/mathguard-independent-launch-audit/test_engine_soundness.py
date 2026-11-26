"""Independent checks. Run against the pinned MathGuard worktree with PYTHONPATH."""
import pytest
import sympy as sp

from mathguard.adapters.algebra_adapter import AlgebraAdapter
from mathguard.adapters.base import verify_tamil_math_parity
from mathguard.adapters.mensuration_adapter import MensurationAdapter
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


def test_working_cannot_replace_question_roster():
    record = item("Given A = {2,5}, B = {11}, find A ∪ B.",
                  ["A = {2,13}", "A ∪ B = {2,11,13}"], "{2,5,11}")
    observed = SetsRelationsFunctionsAdapter(9, "1").verify_item(record)
    assert observed["working_status"] == "FAIL", observed


def test_nonnegative_venn_feasibility_precedes_any_answer():
    from mathguard.venn_reasoner import VennDiagramReasoner

    venn = VennDiagramReasoner(("A", "B"))
    # A two-member subset cannot fit in a one-member universe.
    venn.add_constraint("A", 2)
    venn.add_constraint("B", 2)
    venn.add_constraint("U", 1)
    assert venn.solve(["A"]).status in {"INCONSISTENT", "INVALID_POPULATION"}


def symbolic_fn(expr, domain="R", codomain="R"):
    from mathguard.function_reasoner import SymbolicFunction
    from mathguard.set_types import STANDARD_INFINITE_SETS

    x = sp.Symbol("x", real=True)
    return SymbolicFunction(x, expr(x), STANDARD_INFINITE_SETS[domain], STANDARD_INFINITE_SETS[codomain])


def test_composition_preserves_removed_pole_of_inner_function():
    f = symbolic_fn(lambda x: (x - 1) / (x + 1))
    combined, _ = f.compose(f)
    # Simplified algebra gives -1/x, but the first f is undefined at -1.
    assert not combined.evaluate(-1)[0]
    assert not combined.evaluate(0)[0]
    assert combined.evaluate(2)[:2] == (True, sp.Rational(-1, 2))


def test_composition_preserves_outer_natural_domain():
    outer = symbolic_fn(lambda x: x + 1, domain="N")
    inner = symbolic_fn(lambda x: x / 2)
    combined, _ = outer.compose(inner)
    assert not combined.evaluate(1)[0]  # g(1)=1/2 is not natural.
    assert combined.evaluate(4)[:2] == (True, 3)


def test_equal_composition_formulas_can_have_different_domains():
    from mathguard.function_reasoner import ExtendedFunctionRegistry

    registry = ExtendedFunctionRegistry()
    registry.register_mapping("f", symbolic_fn(lambda x: (x - 1) / (x + 1)))
    registry.register_mapping("g", symbolic_fn(lambda x: (1 + x) / (1 - x)))
    # Both reduce to x. At 1, g(f(1)) is defined while f(g(1)) is not.
    assert registry.verify_commutativity("f", "g") is False


def test_radical_without_restricted_domain_is_not_total():
    root = symbolic_fn(sp.sqrt)
    assert root.classify().is_function is False  # sqrt(-1) is not real.


def test_affine_integer_domain_cannot_be_onto_the_reals():
    linear = symbolic_fn(lambda x: 2 * x, domain="Z")
    result = linear.classify()
    assert result.is_function is True
    assert result.is_one_to_one is True
    assert result.is_onto is False  # The real value 1 has no integer preimage.


def test_even_degree_does_not_force_integer_collision():
    parabola = symbolic_fn(lambda x: 2 * x ** 2 + x, domain="Z", codomain="Z")
    # f(a)=f(b) forces a=b or 2(a+b)=-1, impossible for integers.
    assert parabola.classify().is_one_to_one is True


def test_evaluation_rejects_output_outside_declared_codomain():
    linear = symbolic_fn(lambda x: x - 2, domain="N", codomain="N")
    assert not linear.evaluate(1)[0]


@pytest.mark.parametrize(("answer", "expected"), [
    ("Radius = 35 cm; height = 25 cm", "FAIL"),
    ("Radius = −25 cm; height = 35 cm", "FAIL"),
    ("Radius = 25 m; height = 35 m", "FAIL"),
    ("h = 0.35 m; r = 250 mm", "PASS"),
    ("Radius = 25 cm; height = 35 cm", "PASS"),
])
def test_cylinder_answers_bind_each_measure_to_its_label_and_unit(answer, expected):
    question = "The radius and height of a cylinder are in the ratio 5:7 and its curved surface area is 5500 sq.cm. Find its radius and height."
    record = item(question, [], answer)
    record["id"] = "c10-7-ex7-1-q1"
    # 2 × (22/7) × (5k) × (7k) = 220k² = 5500, so k=5.
    assert 2 * sp.Rational(22, 7) * 25 * 35 == 5500
    assert MensurationAdapter(10, "7").verify_item(record)["answer_status"] == expected
