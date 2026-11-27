"""Multiple-choice question (MCQ) option parser and answer validator."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Dict, Optional

import sympy as sp

from .arithmetic import parse_ratio, ratios_equivalent
from .parser import ParseError, parse_expression
from .rounding import check_numeric_match
from .symbolic import expressions_equivalent


@dataclass(frozen=True)
class McqCheckResult:
    is_mcq: bool
    selected_label: Optional[str]
    options: Dict[str, str]
    matched_label: Optional[str]
    passed: Optional[bool]
    note: str = ""


def parse_mcq_options_en(question_en: str) -> Dict[str, str]:
    """Extract (A), (B), (C), (D) options from an English MCQ prompt."""
    matches = list(re.finditer(r"\(([A-D])\)\s*", question_en))
    if len(matches) < 2:
        return {}
    options: Dict[str, str] = {}
    for i, m in enumerate(matches):
        label = m.group(1)
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(question_en)
        options[label] = question_en[start:end].strip()
    return options


def extract_selected_option_label(answer_en: str) -> Optional[str]:
    m = re.match(r"^\s*\(([A-D])\)", answer_en or "")
    return m.group(1) if m else None


def option_matches_derived(option_text: str, derived: object) -> bool:
    """Check whether an MCQ option text matches an independently derived SymPy expr or ratio."""
    opt = option_text.strip()
    # Handle ratio options like "1:4" or "3:1:2"
    if isinstance(derived, tuple):
        r_opt = parse_ratio(re.sub(r"[^0-9A-Za-zπ√:\s./+\-*()]", "", opt))
        return r_opt is not None and ratios_equivalent(r_opt, derived)

    if isinstance(derived, sp.Expr):
        # Clean trailing/leading unit or count phrases like "sq. units", "made 18 times", "27 small spheres"
        cleaned = re.sub(
            r"\b(sq\.?\s*units?|cu\.?\s*units?|cubic\s+units?|units?|cm²|cm³|cm|m²|m³|m|made|times|small|spheres?|litres?)\b",
            "",
            opt,
            flags=re.IGNORECASE,
        ).strip()
        try:
            opt_expr = parse_expression(cleaned)
            if expressions_equivalent(opt_expr, derived):
                return True
            if not opt_expr.free_symbols and not derived.free_symbols:
                m = check_numeric_match(derived, float(opt_expr.evalf()), tolerance=1e-4)
                return m.matched
        except (ParseError, Exception):
            return False
    return False
