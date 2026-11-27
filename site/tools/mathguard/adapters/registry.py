"""Registry mapping grades/chapters and mathematical domains to verification adapters."""

from __future__ import annotations

from typing import Dict, Tuple

from .algebra_adapter import AlgebraAdapter
from .base import ChapterAdapter, UnsupportedDomainAdapter
from .coord_geometry_adapter import CoordGeometryAdapter
from .mensuration_adapter import MensurationAdapter

ADAPTER_REGISTRY = {
    "algebra": AlgebraAdapter,
    "coordinate_geometry": CoordGeometryAdapter,
    "mensuration": MensurationAdapter,
}

CHAPTER_DOMAIN_MAP: Dict[Tuple[int, str], Tuple[str, str]] = {
    (9, "1"): ("sets_and_relations", "Set Language"),
    (9, "2"): ("real_numbers", "Real Numbers"),
    (9, "3"): ("algebra", "Algebra"),
    (9, "4"): ("euclidean_geometry", "Geometry"),
    (9, "5"): ("coordinate_geometry", "Coordinate Geometry"),
    (9, "6"): ("trigonometry", "Trigonometry"),
    (9, "7"): ("mensuration", "Mensuration"),
    (9, "8"): ("statistics", "Statistics"),
    (9, "9"): ("probability", "Probability"),
    (10, "1"): ("sets_and_relations", "Relations and Functions"),
    (10, "2"): ("number_sequences", "Numbers and Sequences"),
    (10, "3"): ("algebra", "Algebra"),
    (10, "4"): ("euclidean_geometry", "Geometry"),
    (10, "5"): ("coordinate_geometry", "Coordinate Geometry"),
    (10, "6"): ("trigonometry", "Trigonometry"),
    (10, "7"): ("mensuration", "Mensuration"),
    (10, "8"): ("statistics_and_probability", "Statistics and Probability"),
}


def get_adapter_for_chapter(grade: int, chapter: str, domain: str = "") -> ChapterAdapter:
    ch_str = str(chapter)
    mapped_domain, title = CHAPTER_DOMAIN_MAP.get((grade, ch_str), (domain or "unknown", f"Chapter {ch_str}"))
    eff_domain = domain or mapped_domain
    cls = ADAPTER_REGISTRY.get(eff_domain)
    if cls is not None:
        return cls(grade=grade, chapter=ch_str, title=title)
    return UnsupportedDomainAdapter(grade=grade, chapter=ch_str, domain=eff_domain, title=title)
