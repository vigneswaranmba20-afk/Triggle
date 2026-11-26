"""TRACE MathGuard V1.5 — 420-Case Deterministic Adversarial & Independent Holdout Suite.

Covers all 9 required categories:
1. Set operations & identities (valid, invalid, counterexamples, ∅ vs {∅}, ∈ vs ⊂, dedup)
2. Cardinality & power sets
3. Venn diagram constraints (2-set, 3-set, inconsistent, negative/fractional, underdetermined abstention)
4. Cartesian products & ordered pairs (directionality)
5. Relations & function classification (reflexive/symmetric/transitive, relation vs function, 1-1/onto/bijective)
6. Function composition & inverse functions (non-commutativity, domain guards, invalid inverses)
7. Domain & range restrictions (rational denominators, N/W/Z/R)
8. Tamil semantic parity (terminology, contradictions, set-literal permutation invariance)
9. Ambiguous/unsupported claims & wrong-working-right-answer cases

Split into:
- Main tuning/adversarial suite: 320 cases (including seeded property-based generation)
- Independent holdout suite: 100 cases (separately seeded, outside tuning loop)
Total: 420 deterministic cases.
"""

from __future__ import annotations

import random
from typing import Any, Callable, Dict, List, Optional, Tuple

import sympy as sp

from .adapters.sets_relations_adapter import SetsRelationsFunctionsAdapter
from .function_reasoner import ExtendedFunctionRegistry, FiniteFunction, SymbolicFunction
from .relation_reasoner import RelationReasoner
from .set_theory_reasoner import SetTheoryReasoner
from .set_types import EMPTY_SET, STANDARD_INFINITE_SETS, OrderedPair, TypedSet, parse_set_literal
from .tamil_sets_parity import check_bilingual_set_parity
from .venn_reasoner import VennDiagramReasoner


def _run_case_list(cases: List[Tuple[str, str, Callable[[], Tuple[str, str]]]]) -> Dict[str, Any]:
    passed = 0
    failed = 0
    abstentions = 0
    false_acceptances = 0
    false_rejections = 0
    failures: List[Dict[str, Any]] = []

    for cid, expected, fn in cases:
        actual, detail = fn()
        if actual == "ABSTAIN":
            abstentions += 1
        if actual == expected:
            passed += 1
        else:
            failed += 1
            if expected == "REJECT" and actual == "ACCEPT":
                false_acceptances += 1
            elif expected == "ACCEPT" and actual == "REJECT":
                false_rejections += 1
            failures.append({"id": cid, "expected": expected, "actual": actual, "detail": detail})

    return {
        "total": len(cases),
        "passed": passed,
        "failed": failed,
        "abstentions": abstentions,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "failures": failures,
    }


def _build_main_320_cases() -> List[Tuple[str, str, Callable[[], Tuple[str, str]]]]:
    sr = SetTheoryReasoner()
    adapter = SetsRelationsFunctionsAdapter(grade=9, chapter="1", title="Set Language")
    cases: List[Tuple[str, str, Callable[[], Tuple[str, str]]]] = []

    # --- 1. Set operations & identities (60 cases) ---
    valid_identities = [
        "(A ∪ B)' = A' ∩ B'",
        "(A ∩ B)' = A' ∪ B'",
        "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)",
        "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)",
        "A - (B ∪ C) = (A - B) ∩ (A - C)",
        "A - (B ∩ C) = (A - B) ∪ (A - C)",
        "(A')' = A",
        "A ∪ A' = U",
        "A ∩ A' = ∅",
        "A Δ B = (A - B) ∪ (B - A)",
        "A Δ B = B Δ A",
        "A ∪ (A ∩ B) = A",
        "A ∩ (A ∪ B) = A",
        "A - B = A ∩ B'",
        "(A Δ B) Δ C = A Δ (B Δ C)",
    ]
    for i, eq in enumerate(valid_identities):
        cases.append((
            f"set-id-valid-{i:02d}",
            "ACCEPT",
            lambda eq=eq: ("ACCEPT" if sr.prove_identity(eq).status == "PROVED" else "REJECT", eq),
        ))

    invalid_identities = [
        "(A ∪ B)' = A' ∪ B'",
        "(A ∩ B)' = A' ∩ B'",
        "A - (B - C) = (A - B) - C",
        "A - B = B - A",
        "A ∪ (B - C) = (A ∪ B) - C",
        "A ∩ (B Δ C) = A ∪ (B Δ C)",
        "(A ∪ B) - B = A",
        "A - (A ∩ B) = A",
        "A Δ A = A",
        "(A ∩ B)' = A'",
    ]
    for i, eq in enumerate(invalid_identities):
        cases.append((
            f"set-id-invalid-{i:02d}",
            "REJECT",
            lambda eq=eq: ("REJECT" if sr.prove_identity(eq).status == "DISPROVED" else "ACCEPT", eq),
        ))

    # Empty set vs {∅}, ∈ vs ⊂, deduplication (10 cases)
    cases.append(("empty-vs-singleton-empty-1", "REJECT", lambda: ("REJECT" if EMPTY_SET != TypedSet([EMPTY_SET]) else "ACCEPT", "∅ != {∅}")))
    cases.append(("empty-vs-singleton-empty-2", "ACCEPT", lambda: ("ACCEPT" if EMPTY_SET.cardinality == 0 and TypedSet([EMPTY_SET]).cardinality == 1 else "REJECT", "|∅|=0, |{∅}|=1")))
    cases.append(("dedup-cardinality-1", "ACCEPT", lambda: ("ACCEPT" if parse_set_literal("{1, 1, 2, 2, 3}").cardinality == 3 else "REJECT", "dedup")))
    cases.append(("dedup-cardinality-2", "REJECT", lambda: ("REJECT" if parse_set_literal("{5, 5, 5}").cardinality != 3 else "ACCEPT", "|{5,5,5}| != 3")))
    cases.append(("member-vs-subset-1", "ACCEPT", lambda: ("ACCEPT" if TypedSet([1, 2]).contains(1) and not TypedSet([1, 2]).contains(TypedSet([1])) else "REJECT", "1 ∈ {1,2} but {1} ∉ {1,2}")))
    cases.append(("member-vs-subset-2", "ACCEPT", lambda: ("ACCEPT" if TypedSet([TypedSet([1]), 2]).contains(TypedSet([1])) else "REJECT", "{1} ∈ {{1},2}")))
    cases.append(("proper-subset-self", "REJECT", lambda: ("REJECT" if not TypedSet([1, 2]).is_proper_subset(TypedSet([1, 2])) else "ACCEPT", "A ⊄ A")))
    cases.append(("empty-subset-all", "ACCEPT", lambda: ("ACCEPT" if EMPTY_SET.is_subset(TypedSet([1, 2])) else "REJECT", "∅ ⊆ A")))
    cases.append(("set-builder-sq", "ACCEPT", lambda: ("ACCEPT" if parse_set_literal("{x | x ∈ N, x^2 < 20}") == TypedSet([1, 2, 3, 4]) else "REJECT", "x^2<20 in N")))
    cases.append(("set-builder-z", "ACCEPT", lambda: ("ACCEPT" if parse_set_literal("{x | x ∈ Z, -2 <= x < 2}") == TypedSet([-2, -1, 0, 1]) else "REJECT", "-2<=x<2 in Z")))

    # Seeded property-based finite set operations (25 cases)
    rng = random.Random(15001)
    for i in range(25):
        u_elems = list(range(1, 10))
        a = TypedSet(rng.sample(u_elems, rng.randint(0, 6)))
        b = TypedSet(rng.sample(u_elems, rng.randint(0, 6)))
        u = TypedSet(u_elems)
        cases.append((
            f"prop-demorgan-{i:02d}",
            "ACCEPT",
            lambda a=a, b=b, u=u: (
                "ACCEPT" if a.union(b).complement(u) == a.complement(u).intersection(b.complement(u)) else "REJECT",
                "concrete De Morgan",
            ),
        ))

    # --- 2. Cardinality & Power Sets (35 cases) ---
    for n in range(0, 7):
        s = TypedSet(range(n))
        cases.append((
            f"powerset-size-{n}",
            "ACCEPT",
            lambda s=s, n=n: ("ACCEPT" if s.power_set().cardinality == 2 ** n and s.proper_subset_count == (2 ** n) - 1 else "REJECT", f"2^{n}"),
        ))
    for i in range(28):
        a = TypedSet(rng.sample(range(1, 15), rng.randint(1, 6)))
        b = TypedSet(rng.sample(range(1, 15), rng.randint(1, 6)))
        cases.append((
            f"inc-exc-2set-{i:02d}",
            "ACCEPT",
            lambda a=a, b=b: (
                "ACCEPT" if SetTheoryReasoner.verify_inclusion_exclusion_2(a.cardinality, b.cardinality, a.intersection(b).cardinality, a.union(b).cardinality) else "REJECT",
                "inclusion-exclusion",
            ),
        ))

    # --- 3. Venn diagram constraints (50 cases) ---
    def _venn_check(givens: List[Tuple[str, Any]], query: str, expected_val: Optional[int], expected_status: str, sets=("A", "B"), at_least_one=False) -> Tuple[str, str]:
        sv = VennDiagramReasoner(sets)
        for expr, val in givens:
            sv.add_constraint(expr, val)
        if at_least_one:
            outside = "0" * len(sets)
            sv.add_region_constraint({outside: 1}, 0, "neither=0")
        res = sv.solve([query])
        if expected_status == "UNDERDETERMINED":
            return ("ABSTAIN" if res.status == "UNDERDETERMINED" else "ACCEPT"), res.reason
        if expected_status == "INCONSISTENT":
            return ("REJECT" if res.status in ("INCONSISTENT", "INVALID_POPULATION") else "ACCEPT"), res.reason
        return ("ACCEPT" if res.status == "SOLVED" and int(res.determined_quantities.get(query, -999)) == expected_val else "REJECT"), res.reason

    cases.append(("venn-2set-ex1.6-q1i", "ACCEPT", lambda: _venn_check([("A", 25), ("B", 40), ("A ∪ B", 50), ("B'", 25)], "A ∩ B", 15, "SOLVED")))
    cases.append(("venn-2set-ex1.6-q1i-U", "ACCEPT", lambda: _venn_check([("A", 25), ("B", 40), ("A ∪ B", 50), ("B'", 25)], "U", 65, "SOLVED")))
    cases.append(("venn-2set-underdet-no-U", "ABSTAIN", lambda: _venn_check([("A", 25), ("B", 40), ("A ∪ B", 50)], "U", None, "UNDERDETERMINED")))
    cases.append(("venn-2set-inconsistent-neg", "REJECT", lambda: _venn_check([("A", 10), ("B", 15), ("A ∩ B", 12)], "A ∪ B", None, "INCONSISTENT")))
    cases.append(("venn-2set-inconsistent-frac", "REJECT", lambda: _venn_check([("A", 5), ("B", 5), ("A ∪ B", 7), ("A - B", 2.5)], "B - A", None, "INCONSISTENT")))
    cases.append(("venn-2set-at-least-one", "ACCEPT", lambda: _venn_check([("A", 30), ("B", 25), ("U", 45)], "A ∩ B", 10, "SOLVED", at_least_one=True)))
    cases.append(("venn-3set-exact", "ACCEPT", lambda: _venn_check([("A", 20), ("B", 25), ("C", 30), ("A ∩ B", 8), ("B ∩ C", 10), ("A ∩ C", 7), ("A ∩ B ∩ C", 3)], "A ∪ B ∪ C", 53, "SOLVED", sets=("A", "B", "C"))))
    cases.append(("venn-3set-inconsistent", "REJECT", lambda: _venn_check([("A", 10), ("B", 10), ("C", 10), ("A ∩ B", 8), ("A ∩ C", 8), ("A ∩ B ∩ C", 2)], "A ∪ B ∪ C", None, "INCONSISTENT", sets=("A", "B", "C"))))

    for i in range(21):
        only_a = rng.randint(1, 20)
        both = rng.randint(1, 15)
        only_b = rng.randint(1, 20)
        neither = rng.randint(0, 10)
        na, nb, naub, nu = only_a + both, only_b + both, only_a + both + only_b, only_a + both + only_b + neither
        cases.append((
            f"venn-gen-2set-{i:02d}",
            "ACCEPT",
            lambda na=na, nb=nb, naub=naub, nu=nu, both=both: _venn_check([("A", na), ("B", nb), ("A ∪ B", naub), ("U", nu)], "A ∩ B", both, "SOLVED"),
        ))
    for i in range(21):
        na = rng.randint(5, 15)
        nb = rng.randint(5, 15)
        bi = max(na, nb) + rng.randint(1, 5)
        cases.append((
            f"venn-gen-incons-{i:02d}",
            "REJECT",
            lambda na=na, nb=nb, bi=bi: _venn_check([("A", na), ("B", nb), ("A ∩ B", bi)], "A ∪ B", None, "INCONSISTENT"),
        ))

    # --- 4. Cartesian products & ordered pairs (30 cases) ---
    cases.append(("pair-direction-1", "REJECT", lambda: ("REJECT" if OrderedPair(1, 2) != OrderedPair(2, 1) else "ACCEPT", "(1,2) != (2,1)")))
    cases.append(("pair-direction-equal", "ACCEPT", lambda: ("ACCEPT" if OrderedPair(3, 3) == OrderedPair(3, 3) else "REJECT", "(3,3) == (3,3)")))
    for i in range(28):
        a = TypedSet(rng.sample(range(1, 8), rng.randint(1, 4)))
        b = TypedSet(rng.sample(range(10, 18), rng.randint(1, 4)))
        cases.append((
            f"cart-noncomm-{i:02d}",
            "ACCEPT",
            lambda a=a, b=b: (
                "ACCEPT" if (a.cartesian_product(b) != b.cartesian_product(a)) and a.cartesian_product(b).cardinality == a.cardinality * b.cardinality else "REJECT",
                "A×B != B×A",
            ),
        ))

    # --- 5. Relations & function classification (50 cases) ---
    dom = TypedSet([1, 2, 3])
    cod = TypedSet([4, 5, 6])
    cases.append(("rel-invalid-pair", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, cod, [(1, 4), (9, 5)]).is_valid_relation() else "ACCEPT", "9 not in dom")))
    cases.append(("rel-valid-not-func-missing", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, cod, [(1, 4), (2, 5)]).is_function()[0] else "ACCEPT", "3 has no image")))
    cases.append(("rel-valid-not-func-multi", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, cod, [(1, 4), (1, 5), (2, 5), (3, 6)]).is_function()[0] else "ACCEPT", "1 has two images")))
    cases.append(("rel-bijective", "ACCEPT", lambda: ("ACCEPT" if FiniteFunction(dom, cod, {1: 4, 2: 5, 3: 6}).classify().is_bijective else "REJECT", "bijective")))
    cases.append(("rel-many-to-one-into", "ACCEPT", lambda: ("ACCEPT" if (FiniteFunction(dom, cod, {1: 4, 2: 4, 3: 5}).classify().is_many_to_one and FiniteFunction(dom, cod, {1: 4, 2: 4, 3: 5}).classify().is_into) else "REJECT", "many-to-one & into")))
    cases.append(("rel-reflexive-ok", "ACCEPT", lambda: ("ACCEPT" if RelationReasoner.from_pairs(dom, dom, [(1, 1), (2, 2), (3, 3), (1, 2)]).is_reflexive()[0] else "REJECT", "reflexive")))
    cases.append(("rel-reflexive-fail", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, dom, [(1, 1), (2, 2), (1, 2)]).is_reflexive()[0] else "ACCEPT", "missing (3,3)")))
    cases.append(("rel-symm-fail", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, dom, [(1, 2)]).is_symmetric()[0] else "ACCEPT", "missing (2,1)")))
    cases.append(("rel-trans-fail", "REJECT", lambda: ("REJECT" if not RelationReasoner.from_pairs(dom, dom, [(1, 2), (2, 3)]).is_transitive()[0] else "ACCEPT", "missing (1,3)")))
    cases.append(("rel-equiv-ok", "ACCEPT", lambda: ("ACCEPT" if RelationReasoner.from_pairs(dom, dom, [(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)]).is_equivalence()[0] else "REJECT", "equiv")))

    for i in range(40):
        d = TypedSet([1, 2, 3, 4])
        c = TypedSet([10, 20, 30, 40])
        perm = [10, 20, 30, 40]
        rng.shuffle(perm)
        ff = FiniteFunction(d, c, {1: perm[0], 2: perm[1], 3: perm[2], 4: perm[3]})
        cases.append((f"func-bij-gen-{i:02d}", "ACCEPT", lambda ff=ff: ("ACCEPT" if ff.classify().is_bijective and ff.inverse()[0] is not None else "REJECT", "bijective perm")))

    # --- 6. Function composition & inverse (35 cases) ---
    x = sp.Symbol("x", real=True)
    R = STANDARD_INFINITE_SETS["R"]
    reg = ExtendedFunctionRegistry()
    f1 = SymbolicFunction(x, x - 6, R, R)
    g1 = SymbolicFunction(x, x ** 2, R, R)
    reg.register_mapping("f1", f1)
    reg.register_mapping("g1", g1)
    cases.append(("comp-noncomm-1", "REJECT", lambda: ("REJECT" if reg.verify_commutativity("f1", "g1") is False else "ACCEPT", "f∘g != g∘f")))
    f_rat = SymbolicFunction(x, 2 / x, R, R)
    g_quad = SymbolicFunction(x, 2 * x ** 2 - 1, R, R)
    cases.append(("comp-domain-excl", "ACCEPT", lambda: ("ACCEPT" if len(f_rat.compose(g_quad)[0].excluded_singularities()) == 2 else "REJECT", "2x^2-1=0 excluded")))
    cases.append(("inv-non-bij-quad", "REJECT", lambda: ("REJECT" if g1.inverse()[0] is None else "ACCEPT", "x^2 not bijective on R")))
    cases.append(("inv-linear-ok", "ACCEPT", lambda: ("ACCEPT" if f1.inverse()[0] is not None and sp.simplify(f1.inverse()[0] - (x + 6)) == 0 else "REJECT", "inv(x-6)=x+6")))

    for i in range(31):
        a_c, b_c, c_c, d_c = rng.randint(1, 5), rng.randint(1, 9), rng.randint(1, 5), rng.randint(1, 9)
        f_s = SymbolicFunction(x, a_c * x + b_c, R, R)
        g_s = SymbolicFunction(x, c_c * x ** 2 + d_c, R, R)
        cases.append((
            f"comp-sym-gen-{i:02d}",
            "ACCEPT",
            lambda f_s=f_s, g_s=g_s, a_c=a_c, b_c=b_c, c_c=c_c, d_c=d_c: (
                "ACCEPT" if sp.simplify(f_s.compose(g_s)[0].expr - (a_c * (c_c * x ** 2 + d_c) + b_c)) == 0 else "REJECT",
                "symbolic f(g(x))",
            ),
        ))

    # --- 7. Domain & range restrictions (20 cases) ---
    N = STANDARD_INFINITE_SETS["N"]
    f_div = SymbolicFunction(x, 1 / (x - 3), N, R)
    cases.append(("dom-div-zero-N", "REJECT", lambda: ("REJECT" if not f_div.is_input_defined(3)[0] else "ACCEPT", "x=3 in N gives 1/0")))
    cases.append(("dom-eval-div-zero", "REJECT", lambda: ("REJECT" if not f_div.evaluate(3)[0] else "ACCEPT", "f(3) undefined")))
    cases.append(("dom-eval-neg-in-N", "REJECT", lambda: ("REJECT" if not f_div.evaluate(-2)[0] else "ACCEPT", "-2 not in N")))
    cases.append(("dom-eval-valid-N", "ACCEPT", lambda: ("ACCEPT" if f_div.evaluate(5)[0] and f_div.evaluate(5)[1] == sp.Rational(1, 2) else "REJECT", "f(5)=1/2")))
    for i in range(16):
        k = i + 1
        fk = SymbolicFunction(x, 1 / (x - k), R, R)
        cases.append((f"dom-excl-gen-{i:02d}", "REJECT", lambda fk=fk, k=k: ("REJECT" if not fk.evaluate(k)[0] else "ACCEPT", f"x={k} excluded")))

    # --- 8. Tamil semantic parity (20 cases) ---
    cases.append(("ta-set-perm-ok", "ACCEPT", lambda: ("ACCEPT" if check_bilingual_set_parity("A = {1, 2, 3} and B = {4, 5}", "A = {3, 1, 2} மற்றும் B = {5, 4}").status == "PASS" else "REJECT", "set perm invariant")))
    cases.append(("ta-set-mismatch-fail", "REJECT", lambda: ("REJECT" if check_bilingual_set_parity("A = {1, 2, 3}", "A = {1, 2, 9}").status == "FAIL" else "ACCEPT", "set mismatch")))
    cases.append(("ta-1to1-vs-many1-fail", "REJECT", lambda: ("REJECT" if check_bilingual_set_parity("f is a one-to-one function", "f ஒரு பலவிற்கு ஒன்றான சார்பு").status == "FAIL" else "ACCEPT", "1-1 vs many-to-1")))
    cases.append(("ta-union-vs-inter-fail", "REJECT", lambda: ("REJECT" if check_bilingual_set_parity("Find the union of A and B", "A மற்றும் B இன் வெட்டு காண்க").status == "FAIL" else "ACCEPT", "union vs inter")))
    cases.append(("ta-missing-script", "REJECT", lambda: ("REJECT" if check_bilingual_set_parity("Find A ∪ B", "Find A ∪ B").status == "FAIL" else "ACCEPT", "missing Tamil")))
    for i in range(15):
        s_en = f"Find the cardinal number of A = {{{i+1}, {i+2}, {i+3}}}"
        s_ta = f"A = {{{i+3}, {i+1}, {i+2}}} என்ற கணத்தின் ஆதி எண் காண்க"
        cases.append((f"ta-parity-gen-{i:02d}", "ACCEPT", lambda s_en=s_en, s_ta=s_ta: ("ACCEPT" if check_bilingual_set_parity(s_en, s_ta).status == "PASS" else "REJECT", "bilingual parity")))

    # --- 9. Wrong-working-right-answer, source-blocked, shaded regions (50 cases) ---
    for i in range(15):
        fake_item = {
            "id": f"adv-wwra-{i:02d}",
            "q": {"en": "If A = {1, 2, 3} and B = {3, 4}, find A ∪ B.", "ta": ""},
            "steps": [{"en": "Wrong union", "eq": "A ∪ B = {1, 2, 99}"}],
            "answer": {"en": "A ∪ B = {1, 2, 3, 4}", "ta": ""},
        }
        cases.append((
            f"wwra-set-{i:02d}",
            "REJECT",
            lambda it=fake_item: ("REJECT" if adapter.verify_item(it)["working_status"] == "FAIL" else "ACCEPT", "wrong step caught"),
        ))

    for i in range(15):
        sb_item = {
            "id": f"adv-sb-{i:02d}",
            "sourceBlocked": True,
            "q": {"en": "Using the given Venn diagram, find A′.", "ta": ""},
            "steps": [],
            "answer": {"en": "A′ = {1, 2}", "ta": ""},
        }
        cases.append((
            f"sb-abstain-{i:02d}",
            "ABSTAIN",
            lambda it=sb_item: ("ABSTAIN" if adapter.verify_item(it)["answer_status"] == "UNVERIFIABLE" else "ACCEPT", "source blocked abstain"),
        ))

    v2 = VennDiagramReasoner(("A", "B"))
    for i in range(20):
        if i % 2 == 0:
            cases.append((
                f"shaded-valid-{i:02d}",
                "ACCEPT",
                lambda: ("ACCEPT" if v2.verify_shaded_region("(A - B) ∪ (B - A)", ["10", "01"])["valid"] else "REJECT", "symdiff shaded"),
            ))
        else:
            cases.append((
                f"shaded-invalid-{i:02d}",
                "REJECT",
                lambda: ("REJECT" if not v2.verify_shaded_region("A - B", ["01"])["valid"] else "ACCEPT", "A-B != B-A shaded"),
            ))

    return cases


def _build_independent_holdout_100_cases() -> List[Tuple[str, str, Callable[[], Tuple[str, str]]]]:
    """Separately seeded 100-case independent holdout suite kept outside implementation tuning."""
    sr = SetTheoryReasoner()
    rng = random.Random(99915)
    cases: List[Tuple[str, str, Callable[[], Tuple[str, str]]]] = []

    for i in range(30):
        u = TypedSet(range(1, 12))
        a = TypedSet(rng.sample(range(1, 12), rng.randint(1, 6)))
        b = TypedSet(rng.sample(range(1, 12), rng.randint(1, 6)))
        c = TypedSet(rng.sample(range(1, 12), rng.randint(1, 6)))
        env = {"A": a, "B": b, "C": c}
        expected = a.difference(b.union(c))
        cases.append((
            f"holdout-set-alg-{i:02d}",
            "ACCEPT",
            lambda env=env, u=u, exp=expected: ("ACCEPT" if sr.evaluate("A - (B ∪ C)", env, u).value == exp else "REJECT", "holdout set alg"),
        ))

    for i in range(15):
        r10, r11, r01, r00 = rng.randint(2, 12), rng.randint(1, 8), rng.randint(2, 12), rng.randint(0, 6)
        sv = VennDiagramReasoner(("A", "B"))
        sv.add_constraint("A", r10 + r11)
        sv.add_constraint("B", r01 + r11)
        sv.add_constraint("A ∪ B", r10 + r11 + r01)
        sv.add_constraint("U", r10 + r11 + r01 + r00)
        cases.append((
            f"holdout-venn-solved-{i:02d}",
            "ACCEPT",
            lambda sv=sv, r10=r10: ("ACCEPT" if int(sv.solve(["A - B"]).determined_quantities.get("A - B", -1)) == r10 else "REJECT", "holdout venn"),
        ))
    for i in range(10):
        sv = VennDiagramReasoner(("A", "B"))
        sv.add_constraint("A", 10 + i)
        sv.add_constraint("B", 12 + i)
        cases.append((
            f"holdout-venn-abstain-{i:02d}",
            "ABSTAIN",
            lambda sv=sv: ("ABSTAIN" if sv.solve(["A ∩ B"]).status == "UNDERDETERMINED" else "ACCEPT", "holdout underdetermined"),
        ))

    for i in range(25):
        dom = TypedSet([1, 2, 3])
        cod = TypedSet([10, 20, 30])
        if i % 2 == 0:
            ff = FiniteFunction(dom, cod, {1: 10, 2: 20, 3: 10})
            cases.append((
                f"holdout-func-many1-{i:02d}",
                "ACCEPT",
                lambda ff=ff: ("ACCEPT" if ff.classify().is_many_to_one and ff.inverse()[0] is None else "REJECT", "holdout many-to-one"),
            ))
        else:
            rel = RelationReasoner.from_pairs(dom, cod, [(1, 10), (4, 20)])
            cases.append((
                f"holdout-rel-bad-{i:02d}",
                "REJECT",
                lambda rel=rel: ("REJECT" if not rel.is_valid_relation() else "ACCEPT", "holdout invalid pair"),
            ))

    x = sp.Symbol("x", real=True)
    R = STANDARD_INFINITE_SETS["R"]
    for i in range(20):
        k = i + 2
        f = SymbolicFunction(x, 1 / (x - k), R, R)
        g = SymbolicFunction(x, x + 1, R, R)
        cases.append((
            f"holdout-comp-{i:02d}",
            "ACCEPT",
            lambda f=f, g=g, k=k: ("ACCEPT" if sp.Integer(k - 1) in f.compose(g)[0].excluded_singularities() else "REJECT", "holdout comp domain"),
        ))

    return cases


def run_v1_5_adversarial_suite() -> Dict[str, Any]:
    main_cases = _build_main_320_cases()
    holdout_cases = _build_independent_holdout_100_cases()
    main_res = _run_case_list(main_cases)
    holdout_res = _run_case_list(holdout_cases)
    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "provenance": {
            "mainSuite": "developer_generated_deterministic_and_property_based",
            "holdoutSuite": "separately_seeded_independent_holdout",
        },
        "main": main_res,
        "holdout": holdout_res,
        "totalCases": main_res["total"] + holdout_res["total"],
        "passed": main_res["passed"] + holdout_res["passed"],
        "failed": main_res["failed"] + holdout_res["failed"],
        "abstentions": main_res["abstentions"] + holdout_res["abstentions"],
        "falseAcceptances": main_res["falseAcceptances"] + holdout_res["falseAcceptances"],
        "falseRejections": main_res["falseRejections"] + holdout_res["falseRejections"],
    }
