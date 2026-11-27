"""Chapter-independent verification adapters for TRACE MathGuard V1.4."""

from .base import (
    ChapterAdapter,
    UnsupportedDomainAdapter,
    verify_generic_answer,
    verify_tamil_math_parity,
)
from .registry import get_adapter_for_chapter, ADAPTER_REGISTRY

__all__ = [
    "ChapterAdapter",
    "UnsupportedDomainAdapter",
    "verify_generic_answer",
    "verify_tamil_math_parity",
    "get_adapter_for_chapter",
    "ADAPTER_REGISTRY",
]
