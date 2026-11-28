"""Exact arithmetic, fractions, ratios, and percentage utilities."""

from __future__ import annotations

import re
from fractions import Fraction
from typing import Optional, Tuple

import sympy as sp


def to_exact_fraction(value: object) -> Fraction:
    """Convert int, float-string, Fraction, or SymPy Rational to exact Fraction."""
    if isinstance(value, Fraction):
        return value
    if isinstance(value, int):
        return Fraction(value, 1)
    if isinstance(value, sp.Integer):
        return Fraction(int(value), 1)
    if isinstance(value, sp.Rational):
        return Fraction(int(value.p), int(value.q))
    if isinstance(value, str):
        s = value.strip().replace(",", "")
        m = re.fullmatch(r"(-?\d+)\s+(\d+)\s*/\s*(\d+)", s)
        if m:
            whole = int(m.group(1))
            num = int(m.group(2))
            den = int(m.group(3))
            sign = -1 if whole < 0 else 1
            return Fraction(abs(whole) * den + num, den) * sign
        return Fraction(s)
    raise TypeError(f"Cannot convert {value!r} to exact Fraction")


def parse_ratio(text: str) -> Optional[Tuple[sp.Expr, ...]]:
    """Parse a colon-separated ratio like '5 : 7' or '3 : 1 : 2' or '3√3 : 4'."""
    from .parser import parse_expression

    if ":" not in text:
        return None
    parts = [p.strip() for p in text.split(":") if p.strip()]
    if len(parts) < 2:
        return None
    try:
        return tuple(parse_expression(p) for p in parts)
    except Exception:
        return None


def ratios_equivalent(r1: Tuple[sp.Expr, ...], r2: Tuple[sp.Expr, ...]) -> bool:
    """Check whether two ratios are proportional (all cross-ratios equal)."""
    if len(r1) != len(r2) or len(r1) < 2:
        return False
    # Check r1[i]/r1[0] == r2[i]/r2[0] for all i (or handle zero)
    for i in range(1, len(r1)):
        diff = sp.simplify(r1[i] * r2[0] - r2[i] * r1[0])
        if diff != 0:
            return False
    return True


def exact_fractions_equal(a: object, b: object) -> bool:
    return to_exact_fraction(a) == to_exact_fraction(b)
