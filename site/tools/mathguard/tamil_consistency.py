"""Deterministic English-Tamil numerical, terminology, unit, and intent checks.

Reuses and extends the deterministic screening rules from
trace/tamil-validation-pilot-20261125 (docs/trace/tamil-validation-pilot/run.cjs).
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple


def norm_nfc(text: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", str(text or ""))).strip()


def strip_question_prefix(text: str) -> str:
    return re.sub(r"^\d+\.\s*", "", norm_nfc(text))


def number_signature(text: str) -> List[str]:
    """Extract normalized numeric tokens from text (ignoring leading question number)."""
    s = strip_question_prefix(text)
    s = re.sub(r"(?<=\d),(?=\d{3}\b)", "", s)
    return re.findall(r"\d+(?:\.\d+)?", s)


# Reuse term patterns from trace/tamil-validation-pilot-20261125
TAMIL_TERMS: Dict[str, re.Pattern[str]] = {
    "radius": re.compile(r"ஆரம்|ஆரம|ஆரங்|ஆரத்த"),
    "diameter": re.compile(r"விட்ட"),
    "slantHeight": re.compile(r"சாயுயர"),
    "height": re.compile(r"(?<!சாய்)உயர"),
    "volume": re.compile(r"கன\s*அளவ|கனஅளவ"),
    "curvedArea": re.compile(r"வளை\s*பரப்ப"),
    "thickness": re.compile(r"தடிம"),
    "hollow": re.compile(r"உள்ளீடற்ற"),
    "sphere": re.compile(r"கோள"),
    "cone": re.compile(r"கூம்ப"),
    "cylinder": re.compile(r"உருள"),
    "frustum": re.compile(r"இடைக்கண்ட"),
}

TAMIL_INTENTS: Dict[str, re.Pattern[str]] = {
    "negation": re.compile(r"வேண்டாம்|இணைக்காமல்"),
    "increase": re.compile(r"அதிக|உயரும்"),
    "decrease": re.compile(r"குறைந்த|குறையும்"),
    "remaining": re.compile(r"மீதமுள்ள"),
    "uniform": re.compile(r"சீரான"),
    "nonuniform": re.compile(r"சீரற்ற"),
    "outflow": re.compile(r"வெளியேற்ற"),
    "inflow": re.compile(r"நிரப்பப்படுமானால்"),
    "unitRate": re.compile(r"ஒரு சதுர மீட்டருக்கு"),
}

# Cross-lingual EN <-> TA concept checks
CROSS_LINGUAL_TERMS: List[Tuple[str, re.Pattern[str], re.Pattern[str]]] = [
    ("radius", re.compile(r"\brad(ius|ii)\b", re.I), re.compile(r"ஆரம்|ஆரம|ஆரங்|ஆரத்த")),
    ("diameter", re.compile(r"\bdiameter\b", re.I), re.compile(r"விட்ட")),
    ("slant_height", re.compile(r"\bslant\s+height\b", re.I), re.compile(r"சாயுயர")),
    ("cylinder", re.compile(r"\bcylind(er|rical)\b", re.I), re.compile(r"உருள")),
    ("cone", re.compile(r"\bcon(e|ical)\b", re.I), re.compile(r"கூம்ப")),
    ("frustum", re.compile(r"\bfrustum\b", re.I), re.compile(r"இடைக்கண்ட")),
    ("hemisphere", re.compile(r"\bhemi[-\s]?spher(e|ical)\b", re.I), re.compile(r"அரை\s*க்கோள|அரைக்கோள")),
    ("sphere", re.compile(r"(?<!hemi)(?<!hemi-)(?<!hemi )\bspher(e|ical)\b", re.I), re.compile(r"(?<!அரை)(?<!அரைக்)கோள")),
    ("hollow", re.compile(r"\bhollow\b", re.I), re.compile(r"உள்ளீடற்ற")),
]

CROSS_LINGUAL_UNITS: List[Tuple[str, re.Pattern[str], re.Pattern[str]]] = [
    ("cm", re.compile(r"\bcm\b|sq\.?\s*cm|cu\.?\s*cm", re.I), re.compile(r"செ\.?\s*மீ")),
    ("m", re.compile(r"(?<![a-zA-Z])\bm\b|sq\.?\s*m\b|cu\.?\s*m\b|metre", re.I), re.compile(r"(?<!செ\.)மீ(?!\.மீ)")),
    ("mm", re.compile(r"\bmm\b", re.I), re.compile(r"மி\.?\s*மீ")),
    ("km", re.compile(r"\bkm\b", re.I), re.compile(r"கி\.?\s*மீ")),
    ("litre", re.compile(r"\blitres?\b", re.I), re.compile(r"லிட்டர்")),
]


@dataclass
class TamilValidationResult:
    status: str  # PASS, FAIL, PARTIAL, MISSING
    flags: List[str] = field(default_factory=list)
    details: Dict[str, object] = field(default_factory=dict)


def screen_tamil_vs_reference(reference_ta: str, candidate_ta: str) -> Dict[str, object]:
    """Screen a Tamil candidate string against a known Tamil reference (trace pilot contract)."""
    flags: List[str] = []
    if not re.search(r"[\u0B80-\u0BFF]", candidate_ta or ""):
        flags.append("missing_tamil")
    if number_signature(reference_ta) != number_signature(candidate_ta):
        flags.append("numeric_sequence")

    ref_terms = {k: len(p.findall(norm_nfc(reference_ta))) for k, p in TAMIL_TERMS.items()}
    cand_terms = {k: len(p.findall(norm_nfc(candidate_ta))) for k, p in TAMIL_TERMS.items()}
    if ref_terms != cand_terms:
        flags.append("math_terminology")

    ref_intents = {k: len(p.findall(norm_nfc(reference_ta))) for k, p in TAMIL_INTENTS.items()}
    cand_intents = {k: len(p.findall(norm_nfc(candidate_ta))) for k, p in TAMIL_INTENTS.items()}
    if ref_intents != cand_intents:
        flags.append("intent_marker")

    return {
        "flags": flags,
        "sourceDrift": norm_nfc(reference_ta) != norm_nfc(candidate_ta),
        "requiresReview": len(flags) > 0,
    }


def validate_en_ta_consistency(en_text: str, ta_text: Optional[str]) -> TamilValidationResult:
    """Validate English-Tamil numerical, terminology, and unit consistency."""
    if not ta_text or not ta_text.strip():
        return TamilValidationResult(
            status="MISSING",
            flags=["missing_tamil_prompt"],
            details={"reason": "Tamil prompt text is absent in student data item."},
        )

    flags: List[str] = []
    details: Dict[str, object] = {}

    if not re.search(r"[\u0B80-\u0BFF]", ta_text):
        flags.append("missing_tamil_script")

    en_nums = number_signature(en_text)
    ta_nums = number_signature(ta_text)
    if sorted(en_nums) != sorted(ta_nums):
        flags.append("en_ta_number_mismatch")
        details["en_nums"] = en_nums
        details["ta_nums"] = ta_nums

    term_mismatches: List[str] = []
    for name, en_re, ta_re in CROSS_LINGUAL_TERMS:
        has_en = bool(en_re.search(en_text))
        has_ta = bool(ta_re.search(ta_text))
        if has_en != has_ta:
            term_mismatches.append(f"{name}(en={has_en},ta={has_ta})")
    if term_mismatches:
        flags.append("en_ta_terminology_mismatch")
        details["term_mismatches"] = term_mismatches

    unit_mismatches: List[str] = []
    for name, en_re, ta_re in CROSS_LINGUAL_UNITS:
        has_en = bool(en_re.search(en_text))
        has_ta = bool(ta_re.search(ta_text))
        if has_en and not has_ta:
            unit_mismatches.append(f"{name}(en=True,ta=False)")
    if unit_mismatches:
        flags.append("en_ta_unit_mismatch")
        details["unit_mismatches"] = unit_mismatches

    if any(f in flags for f in ("missing_tamil_script", "en_ta_number_mismatch")):
        status = "FAIL"
    elif flags:
        status = "PARTIAL"
    else:
        status = "PASS"

    return TamilValidationResult(status=status, flags=flags, details=details)
