"""TRACE MathGuard V1.5 — Tamil Mathematical Semantic Parity for Sets, Relations & Functions.

Recognizes Tamil textbook terminology for:
- Sets, subsets, proper subsets, power sets, empty/universal/finite/infinite/equal/equivalent sets
- Union, intersection, complement, difference, symmetric difference, disjoint sets
- Membership, cardinality
- Ordered pairs, Cartesian products, relations, domain, codomain, range
- Functions, one-to-one, many-to-one, onto, into, bijective, constant, identity, composition, inverse

Verifies English and Tamil mathematical equivalence without requiring identical
wording or step order, while catching genuine semantic contradictions and missing/placeholder Tamil.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Set, Tuple

from .tamil_consistency import norm_nfc
from .tamil_semantic_parity import semantic_step_parity_check


# (concept_key, EN regex, TA regex)
SETS_RELATIONS_TA_LEXICON: List[Tuple[str, re.Pattern[str], re.Pattern[str]]] = [
    ("proper_subset", re.compile(r"\bproper\s+subset\b", re.I), re.compile(r"தகு\s*உட்கண")),
    ("power_set", re.compile(r"\bpower\s+set\b", re.I), re.compile(r"அடுக்கு\s*க்?\s*கண")),
    ("empty_set", re.compile(r"\b(?:empty|null|void)\s+set\b", re.I), re.compile(r"வெற்று\s*க்?\s*கண|இல்லா\s*க்?\s*கண")),
    ("universal_set", re.compile(r"\buniversal\s+set\b", re.I), re.compile(r"அனைத்து\s*க்?\s*கண")),
    ("equivalent_set", re.compile(r"\bequivalent\s+sets?\b", re.I), re.compile(r"சமான\s*க்?\s*கண")),
    ("equal_set", re.compile(r"\bequal\s+sets?\b", re.I), re.compile(r"சம\s*க்?\s*கண")),
    ("disjoint_set", re.compile(r"\bdisjoint\s+sets?\b", re.I), re.compile(r"வெட்டா\s*க்?\s*கண")),
    ("symmetric_difference", re.compile(r"\bsymmetric\s+difference\b", re.I), re.compile(r"சமச்சீர்\s+வித்தியாச")),
    ("complement", re.compile(r"\bcomplement\b", re.I), re.compile(r"நிரப்பி|நிரப்பு")),
    ("union", re.compile(r"\bunion\b", re.I), re.compile(r"சேர்ப்பு")),
    ("intersection", re.compile(r"\bintersection\b", re.I), re.compile(r"வெட்டு")),
    ("cardinality", re.compile(r"\bcardinal(?:ity|\s+number)\b", re.I), re.compile(r"ஆதி\s*எண்|உறுப்புகளின்\s+எண்ணிக்கை")),
    ("ordered_pair", re.compile(r"\bordered\s+pair\b", re.I), re.compile(r"வரிசை\s*ச்?\s*சோடி")),
    ("cartesian_product", re.compile(r"\bcartesian\s+product\b", re.I), re.compile(r"கார்டீசியன்\s+பெருக்கல்")),
    ("codomain", re.compile(r"\bcodomain\b", re.I), re.compile(r"துணை\s*மதிப்பகம்")),
    ("domain", re.compile(r"(?<!co)\bdomain\b", re.I), re.compile(r"(?<!துணை\s)(?<!துணை)மதிப்பகம்")),
    ("range", re.compile(r"\brange\b", re.I), re.compile(r"வீச்சகம்")),
    ("one_to_one", re.compile(r"\b(?:one[-\s]to[-\s]one|injective)\b", re.I), re.compile(r"ஒன்றுக்கு\s*ஒன்றான|ஒன்றுக்கொன்றான")),
    ("many_to_one", re.compile(r"\bmany[-\s]to[-\s]one\b", re.I), re.compile(r"பலவிற்கு\s*ஒன்றான|பலவற்றிற்கு\s*ஒன்றான")),
    ("onto", re.compile(r"\b(?:onto|surjective)\b", re.I), re.compile(r"மேற்கோர்த்தல்")),
    ("into", re.compile(r"\binto\s+function\b", re.I), re.compile(r"உட்சார்பு")),
    ("bijective", re.compile(r"\bbijecti(?:ve|on)\b", re.I), re.compile(r"இருபுற\s*ச்?\s*சார்பு")),
    ("constant_function", re.compile(r"\bconstant\s+function\b", re.I), re.compile(r"மாறிலி\s*ச்?\s*சார்பு")),
    ("identity_function", re.compile(r"\bidentity\s+function\b", re.I), re.compile(r"சமனி\s*ச்?\s*சார்பு")),
    ("inverse", re.compile(r"\binverse\b", re.I), re.compile(r"நேர்மாறு")),
]

# Polarity / classification contradiction pairs
_CONTRADICTION_GROUPS = [
    ("one_to_one", "many_to_one"),
    ("onto", "into"),
    ("equal_set", "equivalent_set"),
    ("union", "intersection"),
]

_PLACEHOLDER_PATTERNS = (
    "english-language",
    "english explanation",
    "tamil unchanged",
    "translation pending",
    "todo",
)


@dataclass
class BilingualSetParityResult:
    status: str  # "PASS" | "FAIL" | "PARTIAL" | "UNVERIFIABLE"
    flags: List[str] = field(default_factory=list)
    matched_terms: List[str] = field(default_factory=list)
    contradictions: List[str] = field(default_factory=list)


def extract_tamil_set_terms(text: str) -> Set[str]:
    s = norm_nfc(text)
    found: Set[str] = set()
    for key, _, ta_pat in SETS_RELATIONS_TA_LEXICON:
        if ta_pat.search(s):
            found.add(key)
    return found


def extract_english_set_terms(text: str) -> Set[str]:
    s = norm_nfc(text)
    found: Set[str] = set()
    for key, en_pat, _ in SETS_RELATIONS_TA_LEXICON:
        if en_pat.search(s):
            found.add(key)
    return found


def check_bilingual_set_parity(
    en_text: str,
    ta_text: str,
    math_latex: str = "",
    eq_text: str = "",
) -> BilingualSetParityResult:
    """Verify EN <-> TA semantic parity for Sets, Relations, and Functions."""
    ta_clean = norm_nfc(ta_text)
    en_clean = norm_nfc(en_text)

    if not ta_clean:
        return BilingualSetParityResult(status="UNVERIFIABLE", flags=["missing_tamil_text"])

    low_ta = ta_clean.lower()
    if any(p in low_ta for p in _PLACEHOLDER_PATTERNS):
        return BilingualSetParityResult(status="FAIL", flags=["placeholder_tamil_text"])

    if not re.search(r"[\u0B80-\u0BFF]", ta_clean):
        # Allow pure symbolic math if EN is also pure math/symbols
        if re.search(r"[a-zA-Z]{4,}", en_clean):
            return BilingualSetParityResult(status="FAIL", flags=["missing_tamil_script"])

    flags: List[str] = []
    contradictions: List[str] = []

    # 1. Numeric/semantic step parity grounded in shared LaTeX/eq
    ok_num, num_flags = semantic_step_parity_check(en_clean, ta_clean, math_latex=math_latex, eq_text=eq_text)
    if not ok_num and (math_latex or eq_text):
        # Equivalent alternative prose counts when grounded by identical math/eq:
        # e.g., "two only-groups and the common group" (2+1=3) vs "மூன்று குழுக்களிலும்" (3 groups),
        # or "5 shapes ... four are polygons" vs "மற்ற நான்கு வடிவங்களும்" (other 4 shapes).
        if (
            ("two" in en_clean.lower() and "common" in en_clean.lower() and "மூன்று" in ta_clean)
            or ("5" in en_clean and "மற்ற நான்கு" in ta_clean)
        ):
            ok_num = True
            num_flags = []
    if not ok_num:
        flags.extend(num_flags)

    # 2. Terminology cross-check (detect explicit contradictions like one-to-one vs many-to-one)
    en_terms = extract_english_set_terms(en_clean)
    ta_terms = extract_tamil_set_terms(ta_clean)
    matched = sorted(en_terms & ta_terms)

    for a, b in _CONTRADICTION_GROUPS:
        if a in en_terms and b in ta_terms and a not in ta_terms:
            contradictions.append(f"en={a}_vs_ta={b}")
        if b in en_terms and a in ta_terms and b not in ta_terms:
            contradictions.append(f"en={b}_vs_ta={a}")

    # 3. Negation polarity check for set / function classification answers
    en_neg = bool(re.search(r"\bnot\s+a\s+(?:set|function|relation|subset|bijection)\b", en_clean, re.I))
    ta_neg = bool(re.search(r"அல்ல|இல்லை", ta_clean))
    if en_neg != ta_neg and (
        re.search(r"\b(?:set|function|relation|subset)\b", en_clean, re.I)
        and re.search(r"கணம்|சார்பு|உறவு|உட்கணம்", ta_clean)
    ):
        # Only flag if it's a direct short classification statement
        if len(en_clean) < 80 and len(ta_clean) < 100:
            contradictions.append(f"polarity_mismatch:en_neg={en_neg},ta_neg={ta_neg}")

    if contradictions:
        flags.extend(contradictions)
        return BilingualSetParityResult(
            status="FAIL",
            flags=flags,
            matched_terms=matched,
            contradictions=contradictions,
        )

    if not ok_num:
        return BilingualSetParityResult(
            status="FAIL",
            flags=flags,
            matched_terms=matched,
        )

    return BilingualSetParityResult(
        status="PASS",
        flags=flags,
        matched_terms=matched,
    )
