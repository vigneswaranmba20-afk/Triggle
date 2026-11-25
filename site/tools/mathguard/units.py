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
