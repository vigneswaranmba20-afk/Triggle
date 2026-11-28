"""TRACE MathGuard V1.4b — Mathematical Semantic Tamil Parity Engine.

Replaces naive number-token set comparison with:
- Deterministic English & Tamil number-word normalisation
- Unit-aware equivalence (e.g., 100 cm == 1 m, 1000 ml == 1 l)
- Arithmetic/symbolic expression equivalence (e.g., 36 - 6 == 30, 1/2 == 0.5, sqrt(900+900) == sqrt(1800))
- Shared step math/eq grounding so quoting shared LaTeX values in Tamil prose is not a false alarm
- Real contradiction detection (e.g., 7 cm vs 9 cm, 49 vs 81)
"""

from __future__ import annotations

import re
import unicodedata
from fractions import Fraction
from typing import Any, Dict, List, Optional, Set, Tuple

import sympy as sp

from .parser import parse_expression
from .tamil_consistency import TAMIL_INTENTS, TAMIL_TERMS, norm_nfc, validate_en_ta_consistency

_EN_NUM_WORDS: Dict[str, str] = {
    "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
    "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9",
    "ten": "10", "eleven": "11", "twelve": "12", "thirteen": "13",
    "fourteen": "14", "fifteen": "15", "sixteen": "16", "seventeen": "17",
    "eighteen": "18", "nineteen": "19", "twenty": "20",
    "thirty": "30", "forty": "40", "fifty": "50", "sixty": "60",
    "seventy": "70", "eighty": "80", "ninety": "90", "hundred": "100",
    "thousand": "1000", "half": "0.5", "quarter": "0.25",
    "twice": "2", "doubled": "2", "thrice": "3", "both": "2",
}

_TA_NUM_WORDS: List[Tuple[str, str]] = [
    ("பூஜ்ஜியம்", "0"), ("பூச்சியம்", "0"),
    ("நூற்று ஐம்பது", "150"), ("நூற்றுஐம்பது", "150"),
    ("ஒன்று", "1"), ("ஒன்றை", "1"),
    ("இரண்டு", "2"), ("இரண்டை", "2"), ("இரு", "2"),
    ("மூன்று", "3"), ("மூன்றை", "3"), ("மூன்ற", "3"),
    ("நான்கு", "4"), ("நான்கை", "4"), ("நாலு", "4"),
    ("ஐந்து", "5"), ("ஐந்தை", "5"), ("அஞ்சு", "5"),
    ("ஆறு", "6"), ("ஆறை", "6"),
    ("ஏழு", "7"), ("ஏழை", "7"),
    ("எட்டு", "8"), ("எட்டை", "8"),
    ("ஒன்பது", "9"), ("ஒன்பதை", "9"),
    ("பத்து", "10"), ("பத்தை", "10"),
    ("நூறு", "100"),
    ("ஆயிரம்", "1000"),
    ("அரை", "0.5"), ("பாதி", "0.5"),
    ("கால்", "0.25"),
    ("முக்கால்", "0.75"),
    ("இருமடங்கு", "2"),
    ("மும்மடங்கு", "3"),
]

_SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")

_UNIT_SCALE: Dict[str, Tuple[str, Fraction]] = {
    "mm": ("L", Fraction(1, 10)),
    "cm": ("L", Fraction(1)),
    "m": ("L", Fraction(100)),
    "km": ("L", Fraction(100000)),
    "ml": ("V", Fraction(1)),
    "l": ("V", Fraction(1000)),
    "litre": ("V", Fraction(1000)),
    "litres": ("V", Fraction(1000)),
}

_TA_UNIT_MAP = [
    (r"செ\.?\s*மீ", "cm"),
    (r"மி\.?\s*மீ", "mm"),
    (r"கி\.?\s*மீ(?!/\s*மணி)", "km"),
    (r"லிட்டர்", "litre"),
    (r"(?<!செ\.)(?<!மி\.)(?<!கி\.)(?<![\u0B80-\u0BFF])மீ(?![\u0B80-\u0BFF])", "m"),
]


def _normalize_bilingual_text(text: str, is_tamil: bool = False) -> str:
    s = norm_nfc(text).replace("−", "-").replace("–", "-")
    # Strip option/subpart labels like (A)-(D), (i)-(vi), or line-leading (1)-(9),
    # but preserve inline parenthesized numbers like "7x^3 (3)"
    s = re.sub(r"\([A-Da-d]\)|\((?:ii|iii|iv|vi|v|i)\)", " ", s)
    s = re.sub(r"(?:^|\n)\s*\(\d+\)\s*", " ", s)
    s = re.sub(r"^\d+\.\s+", "", s)
    # Strip Western (125,000) and Indian (1,25,000) digit-grouping commas
    s = re.sub(r"(?<=\d),(?=\d{2,3}(?:,|\b))", "", s)
    s = re.sub(r"\b(mm|cm|km|m)[²³23]\b", r" \1 ", s, flags=re.I)
    s = s.translate(_SUP_MAP)
    if is_tamil:
        # Map "ஒரு" to "1" ONLY when followed by an explicit unit (not indefinite article "a/an")
        s = re.sub(
            r"(?<![\u0B80-\u0BFF])ஒரு\s+(?=(?:செ\.?\s*மீ|மி\.?\s*மீ|கி\.?\s*மீ|மீ|லிட்டர்|சதுர|கன))",
            " 1 ",
            s,
        )
        for pat, rep in _TA_UNIT_MAP:
            s = re.sub(pat, f" {rep} ", s)
        for tw, num in _TA_NUM_WORDS:
            s = re.sub(rf"(?<![\u0B80-\u0BFF]){re.escape(tw)}(?![\u0B80-\u0BFF])", f" {num} ", s)
    else:
        for ew, num in _EN_NUM_WORDS.items():
            s = re.sub(rf"\b{ew}\b", f" {num} ", s, flags=re.I)
    return s


def extract_semantic_values(text: str, is_tamil: bool = False) -> Set[Fraction]:
    """Extract normalized numeric/fraction/root-evaluated values and unit-scaled quantities."""
    s = _normalize_bilingual_text(text, is_tamil=is_tamil)
    vals: Set[Fraction] = set()

    # Unit-attached quantities -> add both raw number and canonical base-unit value
    for m in re.finditer(r"(-?\d+(?:\.\d+)?)\s*(mm|cm|km|ml|litres?|l|m)\b", s, flags=re.I):
        try:
            v = Fraction(m.group(1))
            u = m.group(2).lower()
            vals.add(v)
            if u in _UNIT_SCALE:
                vals.add(v * _UNIT_SCALE[u][1])
        except Exception:
            pass

    # Fractions a/b -> add both Fraction(a, b) and components
    for m in re.finditer(r"(-?\d+)\s*/\s*(\d+)", s):
        try:
            a, b = int(m.group(1)), int(m.group(2))
            if b != 0:
                vals.add(Fraction(a, b))
        except Exception:
            pass

    # Simple arithmetic expressions like "36 - 6", "900 + 900", "2^2"
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*([+\-*/^])\s*(\d+(?:\.\d+)?)", s):
        try:
            a, op, b = Fraction(m.group(1)), m.group(2), Fraction(m.group(3))
            if op == "+":
                vals.add(a + b)
            elif op == "-":
                vals.add(a - b)
            elif op == "*":
                vals.add(a * b)
            elif op == "/" and b != 0:
                vals.add(a / b)
            elif op == "^" and b.denominator == 1 and abs(b.numerator) <= 6:
                vals.add(a ** b.numerator)
        except Exception:
            pass

    # Standalone numbers (also absolute values so "-32" and "32" can match sign-context)
    for m in re.finditer(r"\d+(?:\.\d+)?", s):
        try:
            vals.add(Fraction(m.group(0)))
        except Exception:
            pass

    # Evaluated square roots like sqrt(1800), √(900 + 900) -> approximate rounded Fraction
    for m in re.finditer(r"(?:√|sqrt)\s*\(?\s*([0-9+\-*/\s]+)\s*\)?", s):
        try:
            inner = parse_expression(m.group(1))
            if inner is not None and not inner.free_symbols:
                vals.add(Fraction(str(round(float(sp.sqrt(inner).evalf()), 4))))
        except Exception:
            pass

    return vals


def semantic_step_parity_check(
    en_text: str,
    ta_text: str,
    math_latex: str = "",
    eq_text: str = "",
) -> Tuple[bool, List[str]]:
    """Compare EN and TA step prose semantically, grounded in shared math_latex/eq_text.

    Returns (is_ok, flags).
    """
    flags: List[str] = []
    if not en_text.strip() or not ta_text.strip():
        return True, flags

    has_ta = bool(re.search(r"[\u0B80-\u0BFF]", ta_text))
    ta_low = ta_text.lower()
    if "tamil unchanged" in ta_low or "english-language question" in ta_low or "english explanation" in ta_low:
        flags.append("missing_tamil_script")
        return False, flags
    if not has_ta:
        # Pure math expressions like "±110." or "3(2x)(-3y)(-4z) = 72xyz." or "3abc = -9/4." don't require Tamil letters;
        # flag only if English prose words (>=3 letters outside units/math/roman numerals) are left untranslated.
        cleaned_en_words = re.sub(r"\((?:ii|iii|iv|vi|v|i)\)", "", ta_text, flags=re.I)
        cleaned_en_words = re.sub(
            r"(?<![a-zA-Z])(?:cm|mm|km|ml|sin|cos|tan|cot|sec|csc|log|ln|sqrt|mod|iff|and|or|xyz|abc|lhs|rhs|lcm|gcd|hcf|csa|tsa)(?![a-zA-Z])",
            "",
            cleaned_en_words,
            flags=re.I,
        )
        if re.search(r"[a-zA-Z]{3,}", cleaned_en_words):
            flags.append("missing_tamil_script")
            return False, flags

    en_vals = extract_semantic_values(en_text, is_tamil=False)
    ta_vals = extract_semantic_values(ta_text, is_tamil=True)
    shared_vals = extract_semantic_values(f"{math_latex} {eq_text}", is_tamil=False)

    # Extra numbers in TA not in EN and not in shared math/eq
    extra_ta = ta_vals - en_vals - shared_vals

    # Only flag if TA introduces an ungrounded number while EN has an explicit number not in TA
    if extra_ta and (en_vals - ta_vals):
        flags.append(
            f"semantic_number_mismatch:en={[str(x) for x in sorted(en_vals - ta_vals)[:4]]},ta={[str(x) for x in sorted(extra_ta)[:4]]}"
        )
        return False, flags

    return True, flags
