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

    Shared LaTeX (`steps[i].math`, `answerMath`) is deduplicated at the symbolic layer;
    this function specifically catches translation-specific mathematical errors in Tamil text.
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
        flags.extend(ta_q_res.flags)
        if ta_q_res.status == "FAIL":
            mismatches.append({"location": "question", "flags": ta_q_res.flags})

    # Check answer numerical parity when both EN and TA answers are present
    if ans_en and ans_ta:
        en_nums = set(_norm_ta_nums(ans_en))
        ta_nums = set(_norm_ta_nums(ans_ta))
        # Check for numbers present in TA answer that contradict EN answer
        if en_nums and ta_nums and en_nums != ta_nums:
            # Allow Tamil prose to omit or spell out small counts like 1/2, but flag conflicting values
            extra_ta = ta_nums - en_nums
            missing_en = en_nums - ta_nums
            if extra_ta and missing_en:
                flags.append(f"answer_number_mismatch:en={sorted(missing_en)},ta={sorted(extra_ta)}")
                mismatches.append({"location": "answer", "en": sorted(en_nums), "ta": sorted(ta_nums)})

    # Check step-level numerical parity where Tamil step prose is authored
    for idx, st in enumerate(steps):
        if not isinstance(st, dict):
            continue
        st_en = str(st.get("en") or "").strip()
        st_ta = str(st.get("ta") or "").strip()
        if st_en and st_ta:
            n_en = set(_norm_ta_nums(st_en))
            n_ta = set(_norm_ta_nums(st_ta))
            # Only flag if both have explicit numbers and Tamil introduces a conflicting number
            if n_en and n_ta and (n_ta - n_en) and (n_en - n_ta):
                # Ignore cases where math LaTeX carries the numbers and prose just differs in phrasing
                if len(n_ta - n_en) == len(n_en - n_ta):
                    flags.append(f"step_{idx}_number_mismatch:en={sorted(n_en - n_ta)},ta={sorted(n_ta - n_en)}")
                    mismatches.append({"location": f"step[{idx}]", "en": sorted(n_en), "ta": sorted(n_ta)})

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
