"""TRACE MathGuard V1.2 — Controlled Safe Automatic Correction Pipeline.

Pipeline:
  Detect -> Independently derive -> Verify -> Generate patch -> Regression test -> Approve correction

Only repairs errors that can be independently established with mathematical evidence.
Uncertain or unverifiable findings remain unresolved rather than receiving speculative edits.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

import sympy as sp

from .derivations_g10_ch7 import DERIVATION_REGISTRY, DerivedResult
from .engine import _format_derived, _verify_exercise_answer
from .steps import extract_stem_assumptions, validate_steps


@dataclass
class CorrectionProposal:
    question_id: str
    affected_file: str
    original_working: Dict[str, Any]
    corrected_working: Optional[Dict[str, Any]]
    mathematical_justification: str
    validation_evidence: Dict[str, Any] = field(default_factory=dict)
    status: str = "UNRESOLVED"  # APPROVED | REJECTED | UNRESOLVED


def propose_and_verify_correction(
    item: Dict[str, Any],
    affected_file: str,
    derived: Optional[DerivedResult] = None,
) -> CorrectionProposal:
    """Run the 6-stage safe correction pipeline on a curriculum item."""
    qid = str(item.get("id") or "")
    if derived is None:
        fn = DERIVATION_REGISTRY.get(qid)
        derived = fn() if fn else DerivedResult(False, "unregistered", notes="No independent derivation.")

    # Stage 1: Detect
    ans_status, ans_disc, _, _ = _verify_exercise_answer(item, derived)
    q_en = (item.get("q") or {}).get("en") or ""
    fig_alt = (item.get("figureAlt") or {}).get("en") or ""
    stem_env = extract_stem_assumptions(q_en, fig_alt)
    step_res = validate_steps(item.get("steps") or [], initial_env=stem_env)

    if ans_status == "UNVERIFIABLE" or not derived.verifiable:
        return CorrectionProposal(
            question_id=qid,
            affected_file=affected_file,
            original_working={"answer": item.get("answer"), "steps": item.get("steps")},
            corrected_working=None,
            mathematical_justification="Item cannot be independently derived deterministically; left unresolved.",
            validation_evidence={"answerStatus": ans_status, "stepStatus": step_res.status},
            status="UNRESOLVED",
        )

    if ans_status == "PASS" and step_res.status != "FAIL":
        return CorrectionProposal(
            question_id=qid,
            affected_file=affected_file,
            original_working={"answer": item.get("answer"), "steps": item.get("steps")},
            corrected_working=None,
            mathematical_justification="No mathematical error detected; no correction required.",
            validation_evidence={"answerStatus": ans_status, "stepStatus": step_res.status},
            status="UNRESOLVED",
        )

    # Stage 2 & 3: Independently derive & build candidate patch
    derived_str = _format_derived(derived)
    candidate = dict(item)
    justifications: List[str] = []

    if ans_status == "FAIL":
        if isinstance(derived.expr, sp.Expr):
            if derived.preferred_pi == "22/7" and derived.expr.has(sp.pi):
                val = float(derived.expr.subs(sp.pi, sp.Rational(22, 7)).evalf())
                new_ans = f"{val:g}" if abs(val - round(val)) < 1e-9 else f"{val:.2f}"
            else:
                new_ans = str(derived.expr).replace("**", "^").replace("*", "")
            candidate["answer"] = new_ans
            justifications.append(f"Updated answer to independently derived value ({derived_str}): {ans_disc}")
        else:
            return CorrectionProposal(
                question_id=qid,
                affected_file=affected_file,
                original_working={"answer": item.get("answer"), "steps": item.get("steps")},
                corrected_working=None,
                mathematical_justification="Non-scalar derived result requires manual editorial patch.",
                validation_evidence={"answerStatus": ans_status},
                status="UNRESOLVED",
            )

    if step_res.status == "FAIL":
        # Do not speculatively rewrite arbitrary prose steps; only approve if answer-only or verifiable
        return CorrectionProposal(
            question_id=qid,
            affected_file=affected_file,
            original_working={"answer": item.get("answer"), "steps": item.get("steps")},
            corrected_working=None,
            mathematical_justification=f"Intermediate step failure requires targeted review: {step_res.failed_chains}",
            validation_evidence={"stepStatus": step_res.status, "failedChains": step_res.failed_chains},
            status="UNRESOLVED",
        )

    # Stage 4 & 5: Verify & Regression-test the candidate patch
    new_ans_status, _, _, new_ans_ev = _verify_exercise_answer(candidate, derived)
    if new_ans_status == "PASS":
        return CorrectionProposal(
            question_id=qid,
            affected_file=affected_file,
            original_working={"answer": item.get("answer")},
            corrected_working={"answer": candidate.get("answer")},
            mathematical_justification="; ".join(justifications),
            validation_evidence={
                "before": {"answerStatus": ans_status},
                "after": {"answerStatus": new_ans_status, "evidence": new_ans_ev},
            },
            status="APPROVED",
        )

    return CorrectionProposal(
        question_id=qid,
        affected_file=affected_file,
        original_working={"answer": item.get("answer")},
        corrected_working=None,
        mathematical_justification="Candidate patch failed post-correction verification; rejected.",
        validation_evidence={"afterStatus": new_ans_status},
        status="REJECTED",
    )
