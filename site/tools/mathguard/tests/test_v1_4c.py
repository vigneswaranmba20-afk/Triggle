"""TRACE MathGuard V1.4c unit & regression recovery tests."""

from __future__ import annotations

from mathguard.adapters.v1_5_planned import (
    EuclideanGeometryAdapter,
    NumbersSequencesAdapter,
    ProbabilityAdapter,
    RealNumbersAdapter,
    SetsRelationsFunctionsAdapter,
    StatisticsAdapter,
    TrigonometryAdapter,
)
from mathguard.reasoning_engine import verify_complete_working
from mathguard.tamil_semantic_parity import semantic_step_parity_check


def test_stem_extraction_stops_before_prose():
    item = {
        "id": "v14c-stem-1",
        "q": {"en": "For what value of k is the polynomial p(x) = 2x³ − kx² + 3x + 10 exactly divisible by (x − 2)?"},
        "steps": [
            {"math": {"latex": "p(2) = 0"}, "eq": "p(2) = 0"},
            {"math": {"latex": "16 - 4k + 6 + 10 = 0"}, "eq": "2(2)³ − k(2)² + 3(2) + 10 = 0"},
            {"math": {"latex": r"32 - 4k = 0 \implies k = 8"}, "eq": "32 − 4k = 0 ⇒ k = 8"},
        ],
        "answer": "k = 8",
    }
    res = verify_complete_working(item)
    assert res.status == "PASS", res.failed_details


def test_disjunctive_or_and_unit_converted_approx():
    item_or = {
        "id": "v14c-or-1",
        "q": {"en": "Matrix has 18 or 6 elements."},
        "steps": [{"math": {"latex": r"mn=18\quad\text{or}\quad mn=6"}, "eq": "mn=18 or mn=6"}],
        "answer": "orders",
    }
    assert verify_complete_working(item_or).status == "PASS"

    item_time = {
        "id": "v14c-time-1",
        "q": {"en": "Find time."},
        "steps": [
            {"math": {"latex": r"t \approx \dfrac{539 \times 1000}{48 \times 7} = \dfrac{9625}{6}\,\mathrm{s}"}},
            {"math": {"latex": r"t \approx \dfrac{9625}{360} = 26.74\,\mathrm{min}"}},
        ],
        "answer": "26.74 min",
    }
    assert verify_complete_working(item_time, allow_positive_domain=True).status == "PASS"


def test_gcd_implication_and_lcm_spacing():
    item_gcd = {
        "id": "v14c-gcd-1",
        "q": {"en": "Find GCD"},
        "steps": [{"math": {"latex": r"x^3+x^2-5x+3=(x-1)(x^2+2x-3)+0\implies\text{GCD}=x^2+2x-3"}}],
    }
    assert verify_complete_working(item_gcd).status == "PASS"

    item_lcm = {
        "id": "v14c-lcm-1",
        "q": {"en": "LCM = (a-7)(a-5)(a+2), GCD = a - 7, p(x) = a^2 - 12a + 35"},
        "steps": [
            {"math": {"latex": r"\begin{aligned}p(x)&=(a-7)(a-5)\\\text{LCM}&=(a-7)(a-5)(a+2)\end{aligned}"}},
            {"math": {"latex": r"q(x)=\dfrac{\text{LCM}\times\text{GCD}}{p(x)}=\dfrac{(a-7)(a-5)(a+2)(a-7)}{(a-7)(a-5)}"}},
            {"math": {"latex": r"q(x)=(a+2)(a-7)"}},
        ],
    }
    assert verify_complete_working(item_lcm).status == "PASS"


def test_tamil_semantic_parity_v1_4c():
    # Tamil indefinite article 'ஒரு' should not inject '1'
    assert semantic_step_parity_check("Total is 10.", "இது ஒரு மொத்தம் 10 ஆகும்.")[0] is True
    # 'மீது' ('on') should not be parsed as 'm' ('metres')
    assert semantic_step_parity_check("Subtract over x - 4.", "பகுதி x - 4 மீது கழிக்க.")[0] is True
    # Period after 'மீ.'
    assert semantic_step_parity_check("Length is 100 cm.", "நீளம் 1 மீ.", math_latex="l=100")[0] is True
    # Pure algebraic expressions without English prose
    assert semantic_step_parity_check("Compute 3abc.", "3abc = -9/4.")[0] is True
    # Placeholder / wrong values MUST still FAIL
    assert semantic_step_parity_check("Side is 7 cm.", "பக்கம் 9 செ.மீ.", math_latex="a=7")[0] is False
    assert semantic_step_parity_check("Sum is 5.", "English explanation (Tamil unchanged): 5.")[0] is False


def test_v1_5_planned_adapters_abstain():
    for cls, dom in [
        (SetsRelationsFunctionsAdapter, "sets_and_relations"),
        (RealNumbersAdapter, "real_numbers"),
        (NumbersSequencesAdapter, "number_sequences"),
        (EuclideanGeometryAdapter, "euclidean_geometry"),
        (TrigonometryAdapter, "trigonometry"),
        (StatisticsAdapter, "statistics"),
        (ProbabilityAdapter, "probability"),
    ]:
        ad = cls(grade=9, chapter="1")
        assert ad.certified is False
        assert ad.adapter_status == "planned_v1_5"
        res = ad.verify_item({"id": f"stub-{dom}", "q": {"en": "Q"}, "steps": [{"en": "S", "math": {"latex": "1=1"}}]})
        assert res["working_status"] == "UNVERIFIABLE"
        assert res["answer_status"] == "UNVERIFIABLE"
