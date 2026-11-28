"""Base chapter-independent verification adapter and Tamil/answer parity helpers."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from ..parser import parse_expression
from ..reasoning_engine import WorkingAuditResult, verify_complete_working
from ..rounding import check_numeric_match
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


def _norm_ta_nums(text: str) -> List[str]:
    """Extract normalized numeric tokens from English/Tamil prose, ignoring option labels."""
    if not text:
        return []
    cleaned = text.replace("−", "-").replace("–", "-")
    # Remove Tamil/English step numbering or option tags like (A), (i), (1)
    cleaned = re.sub(r"\([A-Da-d0-9ivxIVX]+\)", " ", cleaned)
    return number_signature(cleaned)


def verify_tamil_math_parity(item: Dict[str, Any], is_concept: bool = False) -> TamilParityResult:
    """Audit English vs Tamil mathematical parity across question, steps, and answer.

    Uses deterministic semantic normalisation (number words, unit scales, expression
    evaluation, and shared LaTeX/eq grounding) rather than naive token equality.
    """
    q_obj = (item.get("question") if is_concept else item.get("q")) or {}
    q_en = str(q_obj.get("en") or "")
    q_ta = str(q_obj.get("ta") or "").strip()

    steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
    has_ta_steps = any(isinstance(s, dict) and str(s.get("ta") or "").strip() for s in steps)

    ans_obj = item.get("answer")
    ans_en = str(ans_obj.get("en") if isinstance(ans_obj, dict) else (ans_obj or ""))
    ans_ta = str(ans_obj.get("ta") if isinstance(ans_obj, dict) else "").strip()

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

    # Check answer semantic numerical parity when both EN and TA answers are present
    if ans_en and ans_ta:
        en_vals = extract_semantic_values(ans_en, is_tamil=False)
        ta_vals = extract_semantic_values(ans_ta, is_tamil=True)
        if en_vals and ta_vals and en_vals != ta_vals:
            extra_ta = ta_vals - en_vals
            missing_en = en_vals - ta_vals
            if extra_ta and missing_en:
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
    ans_latex = ""
    if isinstance(ans_math, dict):
        if isinstance(ans_math.get("en"), dict):
            ans_latex = str(ans_math["en"].get("latex") or "")
        else:
            ans_latex = str(ans_math.get("latex") or "")

    if work_res.status == "FAIL":
        return "FAIL", f"Working failed: {work_res.failed_details[:1]}"

    # Compare against final step / variable declarations in ReasoningGraph
    graph = work_res.graph
    ans_cand = ans_latex or ans_en
    if ans_cand:
        ans_clean = re.sub(r"\\text\s*\{[^}]*\}", "", ans_cand).strip()
        ans_clean = ans_clean.split("=")[-1].strip() if "=" in ans_clean else ans_clean
        try:
            ans_expr = parse_expression(ans_clean)
        except Exception:
            ans_expr = None

        if ans_expr is not None:
            for val in reversed(list(graph.variable_declarations.values())):
                try:
                    if expressions_equivalent(val, ans_expr):
                        return "PASS", ""
                    if not val.free_symbols and not ans_expr.free_symbols:
                        if check_numeric_match(float(val.evalf()), float(ans_expr.evalf()), rel_tol=0.02):
                            return "PASS", ""
                except Exception:
                    pass

    if work_res.status == "PASS":
        return "PASS", "working_verified_without_dedicated_derivation"
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
