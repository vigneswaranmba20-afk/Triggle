"""TRACE MathGuard V1.5 — RelationReasoner.

Deterministic mathematical verification for:
- Ordered pairs & Cartesian products (strict directionality (a, b) != (b, a))
- Relations R ⊆ A × B (roster, tabular, arrow diagram, rule-based)
- Domain, codomain, range, inverse relation, cardinality, total relations 2^(|A||B|)
- Relation-to-function distinction
- Reflexivity, symmetry, antisymmetry, transitivity, equivalence relations
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Dict, Iterable, List, Optional, Sequence, Tuple

import sympy as sp

from .set_types import OrderedPair, TypedSet, _normalize_element, parse_set_literal


@dataclass
class RelationObj:
    """Typed binary relation R ⊆ domain_set × codomain_set."""

    domain_set: TypedSet
    codomain_set: TypedSet
    pairs: TypedSet  # TypedSet of OrderedPair

    def is_valid_relation(self) -> bool:
        for p in self.pairs:
            if not isinstance(p, OrderedPair):
                return False
            if p.first not in self.domain_set or p.second not in self.codomain_set:
                return False
        return True

    @property
    def active_domain(self) -> TypedSet:
        return TypedSet(p.first for p in self.pairs if isinstance(p, OrderedPair))

    @property
    def range_set(self) -> TypedSet:
        return TypedSet(p.second for p in self.pairs if isinstance(p, OrderedPair))

    @property
    def cardinality(self) -> int:
        return self.pairs.cardinality

    def total_possible_relations(self) -> int:
        return 1 << (self.domain_set.cardinality * self.codomain_set.cardinality)

    def inverse(self) -> "RelationObj":
        inv_pairs = TypedSet(
            OrderedPair(p.second, p.first) for p in self.pairs if isinstance(p, OrderedPair)
        )
        return RelationObj(domain_set=self.codomain_set, codomain_set=self.domain_set, pairs=inv_pairs)

    def is_function(self) -> Tuple[bool, str]:
        """A relation R ⊆ A × B is a function iff every a ∈ A has a unique image b ∈ B."""
        if not self.is_valid_relation():
            return False, "Relation contains pairs outside A × B"
        images_by_x: Dict[Any, List[Any]] = {x: [] for x in self.domain_set}
        for p in self.pairs:
            if isinstance(p, OrderedPair):
                images_by_x[p.first].append(p.second)
        missing = [x for x, ys in images_by_x.items() if len(ys) == 0]
        multi = [x for x, ys in images_by_x.items() if len(ys) > 1]
        if missing:
            return False, f"Domain element(s) {missing} have no image"
        if multi:
            return False, f"Domain element(s) {multi} have multiple images (one-to-many)"
        return True, "Every element in domain has a unique image in codomain"

    def is_reflexive(self) -> Tuple[bool, str]:
        if self.domain_set != self.codomain_set:
            return False, "Reflexivity requires relation on a single set A × A"
        missing = [a for a in self.domain_set if OrderedPair(a, a) not in self.pairs]
        if missing:
            return False, f"Missing reflexive pair(s) for {missing}"
        return True, "Reflexive on A"

    def is_symmetric(self) -> Tuple[bool, str]:
        for p in self.pairs:
            if isinstance(p, OrderedPair) and OrderedPair(p.second, p.first) not in self.pairs:
                return False, f"({p.first}, {p.second}) ∈ R but ({p.second}, {p.first}) ∉ R"
        return True, "Symmetric"

    def is_antisymmetric(self) -> Tuple[bool, str]:
        for p in self.pairs:
            if isinstance(p, OrderedPair) and p.first != p.second:
                if OrderedPair(p.second, p.first) in self.pairs:
                    return False, f"Both ({p.first}, {p.second}) and ({p.second}, {p.first}) in R with {p.first} ≠ {p.second}"
        return True, "Antisymmetric"

    def is_transitive(self) -> Tuple[bool, str]:
        pair_list = [p for p in self.pairs if isinstance(p, OrderedPair)]
        for p1 in pair_list:
            for p2 in pair_list:
                if p1.second == p2.first:
                    if OrderedPair(p1.first, p2.second) not in self.pairs:
                        return False, (
                            f"({p1.first}, {p1.second}) ∈ R and ({p2.first}, {p2.second}) ∈ R "
                            f"but ({p1.first}, {p2.second}) ∉ R"
                        )
        return True, "Transitive"

    def is_equivalence(self) -> Tuple[bool, str]:
        r_ok, r_msg = self.is_reflexive()
        if not r_ok:
            return False, r_msg
        s_ok, s_msg = self.is_symmetric()
        if not s_ok:
            return False, s_msg
        t_ok, t_msg = self.is_transitive()
        if not t_ok:
            return False, t_msg
        return True, "Equivalence relation (reflexive, symmetric, transitive)"


class RelationReasoner:
    """Helper to construct and verify relations from roster, arrow diagrams, tables, or rules."""

    @staticmethod
    def from_pairs(
        domain: Iterable[Any],
        codomain: Iterable[Any],
        pairs: Iterable[Tuple[Any, Any]],
    ) -> RelationObj:
        dom = domain if isinstance(domain, TypedSet) else TypedSet(domain)
        cod = codomain if isinstance(codomain, TypedSet) else TypedSet(codomain)
        p_set = TypedSet(OrderedPair(_normalize_element(a), _normalize_element(b)) for a, b in pairs)
        return RelationObj(domain_set=dom, codomain_set=cod, pairs=p_set)

    @staticmethod
    def from_arrow_diagram(
        domain: Iterable[Any],
        codomain: Iterable[Any],
        arrows: Dict[Any, Iterable[Any]],
    ) -> RelationObj:
        pairs = []
        for x, ys in arrows.items():
            for y in ys:
                pairs.append((x, y))
        return RelationReasoner.from_pairs(domain, codomain, pairs)

    @staticmethod
    def from_rule(
        domain: TypedSet,
        codomain: TypedSet,
        predicate: Callable[[Any, Any], bool],
    ) -> RelationObj:
        pairs = []
        for a in domain:
            for b in codomain:
                try:
                    if predicate(a, b):
                        pairs.append((a, b))
                except Exception:
                    continue
        return RelationReasoner.from_pairs(domain, codomain, pairs)

    @staticmethod
    def verify_cartesian_product_claim(
        A: TypedSet, B: TypedSet, claimed_text: str
    ) -> Dict[str, Any]:
        expected = A.cartesian_product(B)
        parsed = parse_set_literal(claimed_text)
        if not isinstance(parsed, TypedSet):
            return {"status": "UNVERIFIABLE", "reason": "Could not parse claimed Cartesian product"}
        ok = parsed == expected
        return {
            "status": "PASS" if ok else "FAIL",
            "expected_cardinality": expected.cardinality,
            "claimed_cardinality": parsed.cardinality,
            "equal": ok,
        }
