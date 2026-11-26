"""Base chapter-independent verification adapter and Tamil/answer parity helpers."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from ..answer_fields import localized_answer_forms
from ..parser import parse_expression
from ..reasoning_engine import WorkingAuditResult, verify_complete_working
from ..scalar_answer import scalar_answer_parity
from ..symbolic import expressions_equivalent
from ..tamil_consistency import number_signature, validate_en_ta_consistency
from ..tamil_semantic_parity import extract_semantic_values, semantic_step_parity_check


@dataclass
class TamilParityResult:
    status: str  # PASS | FAIL | PARTIAL | UNVERIFIABLE
    has_tamil_question: bool
    has_tamil_steps: bool
    has_tamil_answer: bool
    flags: List[str] = field(default_factory=list)
    mismatched_numbers: List[Dict[str, Any]] = field(default_factory=list)
    answer_evidence: Dict[str, Any] = field(default_factory=dict)


def _norm_ta_nums(text: str) -> List[str]:
    """Extract normalized numeric tokens from English/Tamil prose, ignoring option labels."""
    if not text:
        return []
    cleaned = text.replace("−", "-").replace("–", "-")
    # Remove Tamil/English step numbering or option tags like (A), (i), (1)
    cleaned = re.sub(r"\([A-Da-d0-9ivxIVX]+\)", " ", cleaned)
    return number_signature(cleaned)


def verify_tamil_math_parity(
    item: Dict[str, Any],
    is_concept: bool = False,
    *,
    reviewed_answer: Tuple[str, Dict[str, Any]] | None = None,
) -> TamilParityResult:
    """Audit English vs Tamil mathematical parity across question, steps, and answer.

    Uses deterministic semantic normalisation (number words, unit scales, expression
    evaluation, and shared LaTeX/eq grounding) rather than naive token equality.
    """
    q_obj = (item.get("question") if is_concept else item.get("q")) or {}
    q_en = str(q_obj.get("en") or "")
    q_ta = str(q_obj.get("ta") or "").strip()

    steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
    has_ta_steps = any(isinstance(s, dict) and str(s.get("ta") or "").strip() for s in steps)

    en_forms = localized_answer_forms(item, "en")
    ta_forms = localized_answer_forms(item, "ta")
    ans_en = en_forms.get("fallback") or en_forms.get("plain") or en_forms.get("latex", "")
    ans_ta = ta_forms.get("fallback") or ta_forms.get("plain") or ta_forms.get("latex", "")

    if not q_ta and not has_ta_steps and not ans_ta:
        return TamilParityResult(
            status="UNVERIFIABLE",
            has_tamil_question=False,
            has_tamil_steps=False,
            has_tamil_answer=False,
            flags=["tamil_pending"],
        )

    flags: List[str] = []
    mismatches: List[Dict[str, Any]] = []
    if q_en and not q_ta:
        flags.append("missing_tamil_question")
    if ans_en and not ans_ta:
        flags.append("missing_tamil_answer")
    if any(isinstance(step, dict) and str(step.get("en") or "").strip()
           and not str(step.get("ta") or "").strip() for step in steps):
        flags.append("missing_tamil_working")
    if steps and not has_ta_steps and not any(
        isinstance(step, dict) and step.get("math") and not step.get("en") for step in steps
    ) and "missing_tamil_working" not in flags:
        flags.append("missing_tamil_working")

    if q_ta:
        ta_q_res = validate_en_ta_consistency(q_en, q_ta)
        q_flags = list(ta_q_res.flags)
        q_status = ta_q_res.status
        if "en_ta_number_mismatch" in q_flags:
            sem_ok, sem_flags = semantic_step_parity_check(q_en, q_ta)
            if sem_ok:
                q_flags = [f for f in q_flags if f != "en_ta_number_mismatch"]
                if q_status == "FAIL" and "en_ta_unit_mismatch" not in q_flags:
                    q_status = "PARTIAL" if q_flags else "PASS"
        flags.extend(q_flags)
        if q_status == "FAIL":
            mismatches.append({"location": "question", "flags": q_flags})

    # Independently checked medium-specific requirements supersede raw answer equality.
    answer_evidence: Dict[str, Any] = {}
    if reviewed_answer is not None:
        answer_status, answer_evidence = reviewed_answer
        if answer_status != "PASS":
            flag = answer_evidence["reason"]
            flags.append(flag)
            if answer_status == "FAIL":
                mismatches.append({"location": "answer", **answer_evidence})
    elif ans_en and ans_ta:
        scalar_parity = scalar_answer_parity(ans_en, ans_ta)
        if scalar_parity is False:
            flags.append("answer_scalar_value_or_unit_mismatch")
            mismatches.append({"location": "answer", "en": ans_en, "ta": ans_ta})
        elif scalar_parity is None:
            en_vals = extract_semantic_values(ans_en, is_tamil=False)
            ta_vals = extract_semantic_values(ans_ta, is_tamil=True)
            if en_vals and not ta_vals:
                flags.append("unverified_tamil_answer_numbers")
            if en_vals and ta_vals and (extra_ta := ta_vals - en_vals) and (missing_en := en_vals - ta_vals):
                flags.append(f"answer_number_mismatch:en={[str(x) for x in sorted(missing_en)[:4]]},ta={[str(x) for x in sorted(extra_ta)[:4]]}")
                mismatches.append({"location": "answer", "en": [str(x) for x in sorted(en_vals)], "ta": [str(x) for x in sorted(ta_vals)]})

    # Check step-level semantic parity grounded in shared math.latex / eq
    for idx, st in enumerate(steps):
        if not isinstance(st, dict):
            continue
        st_en = str(st.get("en") or "").strip()
        st_ta = str(st.get("ta") or "").strip()
        st_math = (st.get("math") or {}).get("latex") if isinstance(st.get("math"), dict) else ""
        st_eq = str(st.get("eq") or "")
        if st_en and st_ta:
            ok_st, st_flags = semantic_step_parity_check(st_en, st_ta, math_latex=str(st_math or ""), eq_text=st_eq)
            if not ok_st:
                for fl in st_flags:
                    flags.append(f"step_{idx}_{fl}")
                mismatches.append({"location": f"step[{idx}]", "flags": st_flags})

    if mismatches:
        status = "FAIL"
    elif flags:
        status = "PARTIAL"
    else:
        status = "PASS"

    return TamilParityResult(
        status=status,
        has_tamil_question=bool(q_ta),
        has_tamil_steps=has_ta_steps,
        has_tamil_answer=bool(ans_ta),
        flags=flags,
        mismatched_numbers=mismatches,
        answer_evidence=answer_evidence,
    )


def verify_generic_answer(
    item: Dict[str, Any],
    work_res: WorkingAuditResult,
    is_concept: bool = False,
    allow_positive_domain: bool = False,
) -> Tuple[str, str]:
    """Chapter-independent final-answer verifier for newly discovered exercises."""
    if is_concept:
        return ("PASS", "") if work_res.status == "PASS" else ("UNVERIFIABLE", "concept_without_derivation_registry")

    ans_raw = item.get("answer")
    ans_en = str(ans_raw.get("en") if isinstance(ans_raw, dict) else (ans_raw or "")).strip()
    ans_math = item.get("answerMath")
    if ans_math:
        return "UNVERIFIABLE", "structured_answer_requires_dedicated_derivation"

    if work_res.status == "FAIL":
        return "FAIL", f"Working failed: {work_res.failed_details[:1]}"

    # Bind the answer to the requested expression. A correct intermediate
    # equality or an unrelated declaration cannot establish a final answer.
    question = str((item.get("q") or {}).get("en") or "").strip().rstrip(".?")
    target = re.fullmatch(
        r"(?:find(?: the value of)?|evaluate|calculate)\s+([0-9+*/^(). −–×÷-]+)"
        r"(?:\s+in exact form)?", question, re.I,
    )
    if target and ans_en and re.fullmatch(r"[0-9+*/^(). −–×÷-]+", ans_en):
        try:
            expected = parse_expression(target[1].strip())
            observed = parse_expression(ans_en)
        except ValueError:
            return "UNVERIFIABLE", "unsupported_answer_expression"
        if expected.is_finite and observed.is_finite and not (expected.free_symbols or observed.free_symbols):
            if expressions_equivalent(expected, observed):
                return "PASS", "exact_question_expression"
            return "FAIL", "answer_differs_from_exact_question_expression"

    return "UNVERIFIABLE", "no_dedicated_derivation"


class ChapterAdapter:
    """Base class for chapter-independent mathematical verification adapters."""

    domain: str = "generic"
    adapter_status: str = "adapter_ready"
    allow_positive_domain: bool = False

    def __init__(self, grade: int, chapter: str, title: str = "") -> None:
        self.grade = grade
        self.chapter = str(chapter)
        self.title = title

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or "")
        work_res = verify_complete_working(
            item,
            is_concept=is_concept,
            allow_positive_domain=self.allow_positive_domain,
        )
        ans_status, ans_disc = verify_generic_answer(
            item,
            work_res,
            is_concept=is_concept,
            allow_positive_domain=self.allow_positive_domain,
        )
        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)
        return {
            "id": qid,
            "grade": self.grade,
            "chapter": self.chapter,
            "domain": self.domain,
            "item_type": "concept" if is_concept else "exercise",
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


class UnsupportedDomainAdapter(ChapterAdapter):
    """Explicit abstention adapter for planned domains (Sets, Euclidean Proofs, Statistics, Probability)."""

    adapter_status: str = "planned_v1_4"

    def __init__(self, grade: int, chapter: str, domain: str, title: str = "") -> None:
        super().__init__(grade, chapter, title)
        self.domain = domain

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or "")
        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)
        return {
            "id": qid,
            "grade": self.grade,
            "chapter": self.chapter,
            "domain": self.domain,
            "item_type": "concept" if is_concept else "exercise",
            "working_status": "UNVERIFIABLE",
            "answer_status": "UNVERIFIABLE",
            "tamil_status": ta_res.status,
            "tamil_flags": ta_res.flags,
            "total_claims": 0,
            "verified_claims": 0,
            "failed_claims": 0,
            "unsupported_claims": 0,
            "failed_details": [],
            "unsupported_details": [],
            "discrepancy": f"Unsupported domain '{self.domain}' (planned; not prematurely certified)",
        }
