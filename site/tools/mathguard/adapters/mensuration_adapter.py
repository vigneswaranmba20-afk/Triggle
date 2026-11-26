"""Chapter-independent Mensuration verification adapter (Grade 9 Ch 7, Grade 10 Ch 7, etc.)."""

from __future__ import annotations

import hashlib
import re
import unicodedata
from typing import Any, Dict

from ..answer_fields import localized_answer_forms
from ..derivations_g10_ch7 import DERIVATION_REGISTRY, DerivedResult
from ..engine import _verify_concept_answer, _verify_exercise_answer
from ..parser import ParseError
from ..reasoning_engine import verify_complete_working
from ..scalar_answer import RequestedPrecision, parse_scalar_answer, requested_precision, scalar_latex_text, scalar_matches
from .base import ChapterAdapter, verify_generic_answer, verify_tamil_math_parity


_ROUNDING_ITEM = "c10-7-ex7-3-q3"
_SOURCE_PAGES = {"en": 300, "ta": 308}
_KEY_PAGES = {"en": 347, "ta": 362}
_REVIEWED_PROMPTS = {
    "en": "8a60b8993f4c86e42a8101e58f0ce207473b8b2fca3fcf067113ead80090f189",
    "ta": "7932205da33947d595556522c4e967c1ddd48065e2e377201ac0c01aac18f25f",
}
_TA_CUBIC_CM = re.compile(r"கன\s+செ\.?\s*மீ\.?|செ\.?\s*மீ\.?\s*(?:³|\^\s*(?:\{3\}|3))")


def _check_reviewed_rounding(item: Dict[str, Any], derived: DerivedResult) -> tuple[str, Dict[str, Any]]:
    """Compare each medium against its documented 2025 source and the same exact volume."""
    prompts = item.get("q") or {}
    normalized = {
        lang: " ".join(unicodedata.normalize("NFC", str(prompts.get(lang) or "")).split())
        for lang in _REVIEWED_PROMPTS
    }
    fingerprints = {
        lang: hashlib.sha256(prompt.encode("utf-8")).hexdigest() for lang, prompt in normalized.items()
    }
    evidence: Dict[str, Any] = {
        "method": "source_verified_medium_rounding",
        "sourcePdfPages": _SOURCE_PAGES,
        "keyPdfPages": _KEY_PAGES,
    }
    if (
        fingerprints != _REVIEWED_PROMPTS
        or item.get("edition") != "2025"
        or (item.get("sourceFidelity") or {}).get("sourcePdfPage") != _SOURCE_PAGES
    ):
        return "UNVERIFIABLE", {**evidence, "reason": "edition_rounding_source_unverified"}

    evidence["exactVolumeCm3"] = str(derived.expr)
    requirements = {
        "en": requested_precision(prompts["en"]),
        "ta": RequestedPrecision(places=2, fixed_places=True, unit="cm3"),
    }
    results: Dict[str, Dict[str, str]] = {}
    for language, precision in requirements.items():
        forms = localized_answer_forms(item, language)
        checks: Dict[str, str] = {}
        for representation, answer in forms.items():
            if representation == "latex":
                answer = scalar_latex_text(answer)
            if language == "ta":
                answer = re.sub(r"^(?:சுமார்|தோராயமாக)\s+", "", answer)
                answer = _TA_CUBIC_CM.sub("cm³", answer)
            try:
                values = parse_scalar_answer(answer, prompts[language], "volume")
            except ParseError:
                checks[representation] = "UNVERIFIABLE"
                continue
            exact_tamil = language == "ta" and len(values) == 1 and values[0].expression == derived.expr
            matched = all(value.unit == "cm3" for value in values) and (
                exact_tamil or scalar_matches(values, derived.expr, "volume", precision, derived.preferred_pi, 0)
            )
            checks[representation] = "PASS" if matched else "FAIL"
        results[language] = checks

    evidence["forms"] = results
    if any("FAIL" in checks.values() for checks in results.values()):
        return "FAIL", {**evidence, "reason": "edition_answer_value_or_precision_mismatch"}
    if any(not checks or "UNVERIFIABLE" in checks.values() for checks in results.values()):
        return "UNVERIFIABLE", {**evidence, "reason": "edition_answer_form_unverified"}
    return "PASS", evidence


class MensurationAdapter(ChapterAdapter):
    domain = "mensuration"
    adapter_status = "verified_v1_4"
    allow_positive_domain = True

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or "")
        work_res = verify_complete_working(item, is_concept=is_concept, allow_positive_domain=True)

        deriv_fn = DERIVATION_REGISTRY.get(qid)
        reviewed_answer = None
        if deriv_fn is not None:
            derived = deriv_fn()
            if is_concept:
                ans_status, ans_disc, _, _ = _verify_concept_answer(item, derived)
            else:
                ans_status, ans_disc, _, _ = _verify_exercise_answer(item, derived)
                if qid == _ROUNDING_ITEM and (self.grade, self.chapter) == (10, "7"):
                    reviewed_answer = _check_reviewed_rounding(item, derived)
            method = derived.method
        else:
            ans_status, ans_disc = verify_generic_answer(item, work_res, is_concept=is_concept, allow_positive_domain=True)
            method = work_res.verification_method

        ta_res = verify_tamil_math_parity(item, is_concept=is_concept, reviewed_answer=reviewed_answer)
        return {
            "id": qid,
            "grade": self.grade,
            "chapter": self.chapter,
            "domain": self.domain,
            "item_type": "concept" if is_concept else "exercise",
            "validation_method": method,
            "working_status": work_res.status,
            "answer_status": ans_status,
            "tamil_status": ta_res.status,
            "tamil_flags": ta_res.flags,
            "tamil_answer_evidence": ta_res.answer_evidence,
            "total_claims": work_res.total_claims,
            "verified_claims": work_res.verified_claims,
            "failed_claims": work_res.failed_claims,
            "unsupported_claims": work_res.unsupported_claims,
            "failed_details": work_res.failed_details,
            "unsupported_details": work_res.unsupported_details,
            "discrepancy": ans_disc,
        }
