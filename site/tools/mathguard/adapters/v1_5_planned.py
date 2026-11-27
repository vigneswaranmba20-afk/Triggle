"""Planned V1.5 verification adapter interfaces (un-certified abstention stubs).

These classes define the reusable domain interfaces, required mathematical invariants,
and priority order for TRACE MathGuard V1.5 without prematurely certifying any
unsupported chapter until reliability and independent review gates pass.
"""

from __future__ import annotations

from typing import Any, Dict, List

from .base import ChapterAdapter, verify_tamil_math_parity


class PlannedV15Adapter(ChapterAdapter):
    """Base interface for V1.5 planned domain adapters (explicit abstention)."""

    adapter_status: str = "planned_v1_5"
    certified: bool = False
    priority_rank: int = 99
    required_invariants: List[str] = []

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or item.get("stageId") or "")
        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)
        return {
            "id": qid,
            "grade": self.grade,
            "chapter": self.chapter,
            "domain": self.domain,
            "item_type": "concept" if is_concept else "exercise",
            "working_status": "UNVERIFIABLE",
            "answer_status": "UNVERIFIABLE",
            "tamil_status": ta_res.status,
            "tamil_flags": ta_res.flags,
            "total_claims": 0,
            "verified_claims": 0,
            "failed_claims": 0,
            "unsupported_claims": 0,
            "failed_details": [],
            "unsupported_details": [],
            "discrepancy": f"Planned V1.5 domain '{self.domain}' (not yet certified; explicit abstention)",
        }


class SetsRelationsFunctionsAdapter(PlannedV15Adapter):
    domain = "sets_and_relations"
    priority_rank = 1
    required_invariants = [
        "Set equality invariance under element permutation and deduplication",
        "De Morgan laws, distributive laws, and cardinality inclusion-exclusion |A ∪ B| = |A| + |B| - |A ∩ B|",
        "Cartesian product cardinality |A × B| = |A|·|B| and ordered-pair non-commutativity",
        "Relation properties (reflexive, symmetric, transitive) and function well-definedness (unique image)",
        "Composition domain/codomain compatibility (f ∘ g requires range(g) ⊆ domain(f))",
    ]


class RealNumbersAdapter(PlannedV15Adapter):
    domain = "real_numbers"
    priority_rank = 2
    required_invariants = [
        "Exact rational vs irrational classification and surd simplification equivalence",
        "Law of indices and rationalisation of denominators without sign loss",
        "Scientific notation mantissa-exponent normalisation (1 ≤ m < 10)",
    ]


class NumbersSequencesAdapter(PlannedV15Adapter):
    domain = "number_sequences"
    priority_rank = 3
    required_invariants = [
        "Euclid division lemma (a = bq + r, 0 ≤ r < |b|) and modular arithmetic congruence",
        "AP/GP nth term and partial sum closed forms with r ≠ 1 / |r| < 1 domain guards",
        "Special series identities (Σk, Σk², Σk³) exact polynomial verification",
    ]


class EuclideanGeometryAdapter(PlannedV15Adapter):
    domain = "euclidean_geometry"
    priority_rank = 4
    required_invariants = [
        "Triangle similarity/congruence criteria (SSS, SAS, AA/ASA) with vertex correspondence",
        "Thales (BPT), angle-bisector, Pythagoras, and alternate-segment theorem preconditions",
        "Angle-sum and cyclic quadrilateral opposite-angle supplementary constraints",
    ]


class TrigonometryAdapter(PlannedV15Adapter):
    domain = "trigonometry"
    priority_rank = 5
    required_invariants = [
        "Pythagorean, reciprocal, and complementary-angle identities over valid domains",
        "Exact special-angle table (0°, 30°, 45°, 60°, 90°) without premature rounding",
        "Heights-and-distances right-triangle tangent/sine ratio consistency",
    ]


class StatisticsAdapter(PlannedV15Adapter):
    domain = "statistics"
    priority_rank = 6
    required_invariants = [
        "Grouped/ungrouped mean, median, mode, range, variance, and standard deviation",
        "Coefficient of variation (CV = σ/x̄ × 100%) with x̄ ≠ 0 guard",
        "Step-deviation scaling invariance",
    ]


class ProbabilityAdapter(PlannedV15Adapter):
    domain = "probability"
    priority_rank = 7
    required_invariants = [
        "Kolmogorov bounds 0 ≤ P(E) ≤ 1 and complement rule P(E') = 1 - P(E)",
        "Addition theorem P(A ∪ B) = P(A) + P(B) - P(A ∩ B) and mutually exclusive special case",
        "Sample-space cardinality exactness for coins, dice, and cards",
    ]


V1_5_PLANNED_ADAPTERS = {
    "sets_and_relations": SetsRelationsFunctionsAdapter,
    "real_numbers": RealNumbersAdapter,
    "number_sequences": NumbersSequencesAdapter,
    "euclidean_geometry": EuclideanGeometryAdapter,
    "trigonometry": TrigonometryAdapter,
    "statistics": StatisticsAdapter,
    "statistics_and_probability": StatisticsAdapter,
    "probability": ProbabilityAdapter,
}
