"""Chapter-independent Algebra verification adapter (Grade 9 Ch 3, Grade 10 Ch 3, etc.)."""

from __future__ import annotations

from typing import Any, Dict

from ..ch3_verifier import verify_ch3_answer
from ..derivations_g10_ch3 import derive_ch3_for_item
from ..reasoning_engine import verify_complete_working
from .base import ChapterAdapter, verify_generic_answer, verify_tamil_math_parity


class AlgebraAdapter(ChapterAdapter):
    domain = "algebra"
    adapter_status = "verified_v1_4"
    allow_positive_domain = False

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or "")
        work_res = verify_complete_working(item, is_concept=is_concept, allow_positive_domain=False)
        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)

        deriv = derive_ch3_for_item(qid, item, is_concept=is_concept)
        if deriv.verifiable:
            ans_status, ans_disc = verify_ch3_answer(item, deriv, is_concept=is_concept)
            method = deriv.method
        else:
            ans_status, ans_disc = verify_generic_answer(item, work_res, is_concept=is_concept, allow_positive_domain=False)
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
