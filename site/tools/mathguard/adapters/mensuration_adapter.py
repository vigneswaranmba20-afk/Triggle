"""Chapter-independent Mensuration verification adapter (Grade 9 Ch 7, Grade 10 Ch 7, etc.)."""

from __future__ import annotations

from typing import Any, Dict

from ..derivations_g10_ch7 import DERIVATION_REGISTRY
from ..engine import _verify_concept_answer, _verify_exercise_answer
from ..reasoning_engine import verify_complete_working
from .base import ChapterAdapter, verify_generic_answer, verify_tamil_math_parity


class MensurationAdapter(ChapterAdapter):
    domain = "mensuration"
    adapter_status = "verified_v1_4"
    allow_positive_domain = True

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or "")
        work_res = verify_complete_working(item, is_concept=is_concept, allow_positive_domain=True)
        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)

        deriv_fn = DERIVATION_REGISTRY.get(qid)
        if deriv_fn is not None:
            derived = deriv_fn()
            if is_concept:
                ans_status, ans_disc, _, _ = _verify_concept_answer(item, derived)
            else:
                ans_status, ans_disc, _, _ = _verify_exercise_answer(item, derived)
            method = derived.method
        else:
            ans_status, ans_disc = verify_generic_answer(item, work_res, is_concept=is_concept, allow_positive_domain=True)
            method = work_res.verification_method

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
            "total_claims": work_res.total_claims,
            "verified_claims": work_res.verified_claims,
            "failed_claims": work_res.failed_claims,
            "unsupported_claims": work_res.unsupported_claims,
            "failed_details": work_res.failed_details,
            "unsupported_details": work_res.unsupported_details,
            "discrepancy": ans_disc,
        }
