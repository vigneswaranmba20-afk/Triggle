"""TRACE MathGuard V1.5a — Soundness, Regression Recovery & Curriculum Intelligence Tests."""

from __future__ import annotations

from mathguard.adapters.registry import get_adapter_for_chapter
from mathguard.adapters.sets_relations_adapter import SetsRelationsFunctionsAdapter
from mathguard.adversarial_v1_4 import run_v1_4_adversarial_suite
from mathguard.set_types import TypedSet, parse_set_literal
from mathguard.tamil_sets_parity import check_bilingual_set_parity


def test_v1_4_270_regression_recovered():
    res = run_v1_4_adversarial_suite()
    assert res["totalCases"] == 270
    assert res["passed"] == 270, res["failures"]
    assert res["failed"] == 0
    assert res["falseAcceptances"] == 0


def test_sets_adapter_abstains_on_non_domain_trivial_arithmetic():
    ad = SetsRelationsFunctionsAdapter(9, "1", "Set Language")
    res = ad.verify_item({
        "id": "v15a-non-domain",
        "q": {"en": "Prove or compute in unsupported domain."},
        "steps": [{"math": {"latex": "1 + 1 = 2"}}],
    })
    assert res["working_status"] == "UNVERIFIABLE"
    assert res["answer_status"] == "UNVERIFIABLE"
    assert get_adapter_for_chapter(9, "1", include_v1_5=False).domain == "sets_and_relations"


def test_set_builder_lhs_domain_and_custom_fractions():
    assert parse_set_literal("{x ∈ W | x < 2}") == TypedSet([0, 1])
    assert parse_set_literal("{x ∈ N | 1 < x ≤ 4}") == TypedSet([2, 3, 4])
    q = parse_set_literal("{[[4|9]], [[1|3]], [[4|15]]}")
    assert isinstance(q, TypedSet)
    assert q.cardinality == 3


def test_tamil_sets_parity_equivalent_prose_counts():
    r1 = check_bilingual_set_parity(
        "The two only-groups and the common group are disjoint.",
        "இசையில் மட்டும், நாடகத்தில் மட்டும், இரண்டிலும் பங்கேற்பவர்கள் என்ற மூன்று குழுக்களிலும் உள்ளனர்.",
        eq_text="(iii) 17 + 22 + 8 = 47",
    )
    assert r1.status == "PASS"

    r2 = check_bilingual_set_parity(
        "Inspect the 5 shapes inside S: four are polygons.",
        "S இன் மற்ற நான்கு வடிவங்களும் பலகோணங்கள்.",
        eq_text="S = {square, rectangle, circle, rhombus, triangle}",
    )
    assert r2.status == "PASS"
