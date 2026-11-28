"""TRACE MathGuard V1.5 unit, domain, and adversarial tests."""

from __future__ import annotations

import sympy as sp

from mathguard.adversarial_v1_5 import run_v1_5_adversarial_suite
from mathguard.function_reasoner import ExtendedFunctionRegistry, FiniteFunction, SymbolicFunction
from mathguard.relation_reasoner import RelationReasoner
from mathguard.set_theory_reasoner import SetTheoryReasoner
from mathguard.set_types import EMPTY_SET, STANDARD_INFINITE_SETS, OrderedPair, TypedSet, parse_set_literal
from mathguard.tamil_sets_parity import check_bilingual_set_parity
from mathguard.venn_reasoner import VennDiagramReasoner


def test_typed_sets_empty_dedup_and_membership():
    assert EMPTY_SET.cardinality == 0
    singleton_empty = TypedSet([EMPTY_SET])
    assert singleton_empty.cardinality == 1
    assert EMPTY_SET != singleton_empty
    assert EMPTY_SET in singleton_empty

    dedup = TypedSet([1, 1, 2, 2, 3])
    assert dedup.cardinality == 3
    assert 1 in dedup
    assert TypedSet([1]) not in dedup  # membership != subset
    assert TypedSet([1]).is_subset(dedup)
    assert dedup.power_set().cardinality == 8


def test_set_builder_and_boolean_proofs():
    sb = parse_set_literal("{x : x ∈ ℕ, x < 5}")
    assert sb == TypedSet([1, 2, 3, 4])
    sb_sq = parse_set_literal("{x | x ∈ N, x^2 < 20}")
    assert sb_sq == TypedSet([1, 2, 3, 4])

    sr = SetTheoryReasoner()
    assert sr.prove_identity("(A ∪ B)' = A' ∩ B'").status == "PROVED"
    assert sr.prove_identity("A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)").status == "PROVED"
    dis = sr.prove_identity("A \\ (B \\ C) = (A \\ B) \\ C")
    assert dis.status == "DISPROVED"
    assert dis.counterexample is not None
    # Non-Boolean identity must abstain rather than claim universal proof from finite sample
    assert sr.prove_identity("P(A ∪ B) = P(A ∪ B)").status == "ABSTAINED"


def test_venn_reasoner_population_and_outside_guard():
    # Underdetermined when n(U) is missing (must not assume outside=0)
    v_und = VennDiagramReasoner(2)
    v_und.add_constraint("A", 20)
    v_und.add_constraint("B", 15)
    v_und.add_constraint("A ∩ B", 5)
    assert v_und.solve(["U"]).status == "UNDERDETERMINED"

    # Negative population rejected
    v_neg = VennDiagramReasoner(2)
    v_neg.add_constraint("A", 10)
    v_neg.add_constraint("A ∩ B", 12)
    assert v_neg.solve().status == "INVALID_POPULATION"

    # 3-set exact solve
    v3 = VennDiagramReasoner(3)
    v3.add_constraint("A", 9)
    v3.add_constraint("B", 12)
    v3.add_constraint("C", 12)
    v3.add_constraint("A ∩ B", 4)
    v3.add_constraint("A ∩ C", 3)
    v3.add_constraint("B ∩ C", 5)
    v3.add_constraint("A ∩ B ∩ C", 2)
    v3.add_constraint("U", 30)
    res = v3.solve(["outside"])
    assert res.status == "SOLVED"
    assert res.regions["outside"] == 7


def test_relation_and_function_reasoners():
    assert OrderedPair(1, 2) != OrderedPair(2, 1)
    A = TypedSet([1, 2, 3])
    B = TypedSet([4, 5, 6])
    rel_not_fn = RelationReasoner.from_arrow_diagram(A, B, {1: [4, 5], 2: [5], 3: [6]})
    assert rel_not_fn.is_function()[0] is False

    x = sp.Symbol("x", real=True)
    sf_n = SymbolicFunction(x, 2 * x, STANDARD_INFINITE_SETS["N"], STANDARD_INFINITE_SETS["N"])
    cls = sf_n.classify()
    assert cls.is_one_to_one is True
    assert cls.is_onto is False  # codomain N != range 2N

    reg = ExtendedFunctionRegistry()
    reg.register_mapping("f", SymbolicFunction(x, x + 1, STANDARD_INFINITE_SETS["R"], STANDARD_INFINITE_SETS["R"]))
    reg.register_mapping("g", SymbolicFunction(x, 2 * x, STANDARD_INFINITE_SETS["R"], STANDARD_INFINITE_SETS["R"]))
    assert reg.verify_commutativity("f", "g") is False

    rat = SymbolicFunction(x, 1 / (x - 2), STANDARD_INFINITE_SETS["R"], STANDARD_INFINITE_SETS["R"])
    assert rat.evaluate(2)[0] is False
    assert rat.evaluate(4)[1] == sp.Rational(1, 2)


def test_tamil_sets_parity():
    ok = check_bilingual_set_parity(
        "The function f is bijective (one-to-one and onto).",
        "சார்பு f ஒன்றுக்கு ஒன்றானதாகவும் மேற்கோர்த்தலாகவும் உள்ளதால் இது இருபுறச் சார்பு ஆகும்.",
    )
    assert ok.status == "PASS"

    bad = check_bilingual_set_parity(
        "f is a one-to-one function.",
        "f என்பது பலவற்றிற்கு ஒன்றான சார்பு ஆகும்.",
    )
    assert bad.status == "FAIL"


def test_v1_5_450_case_adversarial_and_holdout():
    res = run_v1_5_adversarial_suite()
    assert res["totalCases"] >= 400
    assert res["failed"] == 0, res["main"].get("failures")
    assert res["falseAcceptances"] == 0
    assert res["holdout"]["total"] == 100
    assert res["holdout"]["passed"] == 100
    assert res["holdout"]["falseAcceptances"] == 0
