"""Unit normalization, conversion, and dimensional consistency checks."""

from __future__ import annotations

import re
from dataclasses import dataclass
from fractions import Fraction
from typing import Optional

LENGTH_TO_CM = {
    "mm": Fraction(1, 10),
    "cm": Fraction(1, 1),
    "m": Fraction(100, 1),
    "km": Fraction(100000, 1),
}

AREA_TO_CM2 = {
    "mm2": Fraction(1, 100),
    "cm2": Fraction(1, 1),
    "m2": Fraction(10000, 1),
}

VOLUME_TO_CM3 = {
    "mm3": Fraction(1, 1000),
    "cm3": Fraction(1, 1),
    "ml": Fraction(1, 1),
    "l": Fraction(1000, 1),
    "litre": Fraction(1000, 1),
    "litres": Fraction(1000, 1),
    "m3": Fraction(1000000, 1),
}


@dataclass(frozen=True)
class UnitInfo:
    canonical: str
    dimension: str  # length, area, volume, time, speed, currency, percentage, dimensionless


def convert_length(value: Fraction, from_unit: str, to_unit: str) -> Fraction:
    f = from_unit.lower()
    t = to_unit.lower()
    return value * LENGTH_TO_CM[f] / LENGTH_TO_CM[t]


def convert_area(value: Fraction, from_unit: str, to_unit: str) -> Fraction:
    f = from_unit.lower()
    t = to_unit.lower()
    return value * AREA_TO_CM2[f] / AREA_TO_CM2[t]


def convert_volume(value: Fraction, from_unit: str, to_unit: str) -> Fraction:
    f = from_unit.lower()
    t = to_unit.lower()
    return value * VOLUME_TO_CM3[f] / VOLUME_TO_CM3[t]


def detect_answer_dimension(text: str) -> Optional[str]:
    """Detect physical dimension from English or Tamil answer text."""
    s = str(text or "").lower()
    # Volume / capacity markers
    if re.search(
        r"(cm³|cm\^3|cu\.?\s*cm|m³|m\^3|cu\.?\s*m|mm³|mm\^3|cubic\s+units|litres?|\\mathrm\{l\}|க\.?\s*செ\.?\s*மீ|கன\s*செ\.?\s*மீ|கன\s*அலகு|லிட்டர்)",
        s,
    ):
        return "volume"
    # Area markers
    if re.search(
        r"(cm²|cm\^2|sq\.?\s*cm|m²|m\^2|sq\.?\s*m|sq\.?\s*units|square\s+units|ச\.?\s*செ\.?\s*மீ|ச\.?\s*மீ|சதுர\s*அலகு)",
        s,
    ):
        return "area"
    # Currency
    if "₹" in s or "rs." in s or "rupees" in s or "ரூ" in s:
        return "currency"
    # Percentage
    if "%" in s or "percent" in s:
        return "percentage"
    # Time
    if re.search(r"\b(minutes?|mins?|hours?|hrs?|seconds?|sec)\b|நிமிட|மணி", s):
        return "time"
    # Length
    if re.search(r"(\bcm\b|\bm\b|\bmm\b|\bkm\b|\bunits\b|செ\.?\s*மீ|மீட்டர்|அலகு)", s):
        return "length"
    return None


def extract_segment_unit(text: str) -> Optional[str]:
    """Extract canonical unit from an equation segment (e.g. '10459.43 cm^3' -> 'cm3')."""
    s = str(text or "")
    s = re.sub(r"\\(?:text|mathrm|mathbf)\s*\{([^}]*)\}", r" \1 ", s)
    if re.search(r"(?<![a-zA-Z])(cm\s*\^\s*\{?3\}?|cm³|cu\.?\s*cm)", s, re.I):
        return "cm3"
    if re.search(r"(?<![a-zA-Z])(m\s*\^\s*\{?3\}?|m³|cu\.?\s*m)", s, re.I):
        return "m3"
    if re.search(r"(?<![a-zA-Z])(mm\s*\^\s*\{?3\}?|mm³)", s, re.I):
        return "mm3"
    if re.search(r"(\blitres?\b|\bL\b)", s):
        return "litre"
    if re.search(r"(?<![a-zA-Z])(m\s*\^\s*\{?2\}?|m²|sq\.?\s*m)", s, re.I):
        return "m2"
    if re.search(r"(?<![a-zA-Z])(cm\s*\^\s*\{?2\}?|cm²|sq\.?\s*cm)", s, re.I):
        return "cm2"
    if re.search(r"(?<![a-zA-Z])km\b", s, re.I):
        return "km"
    if re.search(r"(?<![a-zA-Z])m\b", s, re.I):
        return "m"
    if re.search(r"(?<![a-zA-Z])cm\b", s, re.I):
        return "cm"
    if re.search(r"(?<![a-zA-Z])mm\b", s, re.I):
        return "mm"
    return None


def are_unit_converted_equivalent(
    lhs_raw: str,
    lhs_val: float,
    rhs_raw: str,
    rhs_val: float,
    tol: float = 0.02,
) -> bool:
    """Return True if lhs_val in lhs_unit converts to rhs_val in rhs_unit."""
    u1 = extract_segment_unit(lhs_raw)
    u2 = extract_segment_unit(rhs_raw)
    if not u1 or not u2 or u1 == u2:
        return False
    try:
        if u1 in VOLUME_TO_CM3 and u2 in VOLUME_TO_CM3:
            converted = lhs_val * float(VOLUME_TO_CM3[u1] / VOLUME_TO_CM3[u2])
            return abs(converted - rhs_val) <= tol
        if u1 in AREA_TO_CM2 and u2 in AREA_TO_CM2:
            converted = lhs_val * float(AREA_TO_CM2[u1] / AREA_TO_CM2[u2])
            return abs(converted - rhs_val) <= tol
        if u1 in LENGTH_TO_CM and u2 in LENGTH_TO_CM:
            converted = lhs_val * float(LENGTH_TO_CM[u1] / LENGTH_TO_CM[u2])
            return abs(converted - rhs_val) <= tol
    except Exception:
        return False
    return False
