"""TRACE MathGuard V1.0 — Main Validation Engine & Audit Report Generator."""

from __future__ import annotations

import csv
import json
import re
import subprocess
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from .arithmetic import parse_ratio, ratios_equivalent
from .derivations_g10_ch7 import (
    DERIVATION_REGISTRY,
    DerivedResult,
    verify_source_numbers,
)
from .mcq import (
    extract_selected_option_label,
    option_matches_derived,
    parse_mcq_options_en,
)
from .parser import ParseError, parse_expression
from .reconcile import build_fidelity_index, reconcile_item
from .rounding import check_numeric_match
from .steps import validate_steps
from .symbolic import evaluate_with_pi_mode, expressions_equivalent
from .tamil_consistency import validate_en_ta_consistency
from .units import detect_answer_dimension


@dataclass
class AuditRecord:
    id: str
    item_type: str  # "exercise" | "concept"
    section: str
    source_reference: str
    validation_method: str
    independently_derived_result: str
    existing_result: str
    status: str  # PASS | FAIL | PARTIAL | UNVERIFIABLE
    answer_status: str
    step_status: str
    tamil_status: str
    discrepancy: str
    severity: str  # none | info | minor | major | critical
    recommended_correction: str
    supporting_evidence: Dict[str, Any] = field(default_factory=dict)


def load_g10_ch7_bundle(repo_root: Path) -> Dict[str, Any]:
    extractor = repo_root / "site" / "tools" / "mathguard" / "extractor.cjs"
    proc = subprocess.run(
        ["node", str(extractor)],
        cwd=str(repo_root),
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(proc.stdout)


def _format_derived(derived: DerivedResult) -> str:
    if not derived.verifiable:
        return "UNVERIFIABLE"
    expr = derived.expr
    if isinstance(expr, tuple):
        if len(expr) == 2 and all(isinstance(x, sp.Expr) for x in expr):
            g = sp.simplify(expr[0] / expr[1])
            return f"{expr[0]} : {expr[1]} (simplified ratio {g})"
        return " : ".join(str(x) for x in expr)
    if isinstance(expr, list):
        return ", ".join(str(x) for x in expr)
    if isinstance(expr, sp.Expr):
        if not expr.free_symbols:
            approx = evaluate_with_pi_mode(expr, derived.preferred_pi)
            if approx is not None and expr.has(sp.pi):
                return f"{expr} (≈ {approx:.4f} with pi={derived.preferred_pi})"
        return str(expr)
    return str(expr)


def _extract_answer_text(item: Dict[str, Any]) -> str:
    ans = item.get("answer")
    if isinstance(ans, dict):
        return str(ans.get("en") or "")
    return str(ans or "")


def _extract_answer_numbers(answer_text: str, answer_math: Any) -> List[float]:
    # Prefer answerMath.en.latex or answerMath.latex if present
    latex = ""
    if isinstance(answer_math, dict):
        if "en" in answer_math and isinstance(answer_math["en"], dict):
            latex = str(answer_math["en"].get("latex") or "")
        else:
            latex = str(answer_math.get("latex") or "")
    for candidate in (latex, answer_text):
        if not candidate:
            continue
        # Remove parenthetical notes like "(using the textbook's ...)"
        cleaned = re.sub(r"\([^)]*\)", "", candidate)
        # Try direct parse
        try:
            expr = parse_expression(cleaned)
            if not expr.free_symbols:
                return [float(expr.evalf())]
        except Exception:
            pass
    # Fallback: extract numeric tokens from answer_text (stripping parenthetical notes)
    cleaned = re.sub(r"\([^)]*\)", "", answer_text)
    cleaned = re.sub(r"(?<=\d),(?=\d{3}\b)", "", cleaned)
    nums: List[float] = []
    for m in re.finditer(r"(\d+)\s+(\d+)\s*/\s*(\d+)|(\d+)\s*/\s*(\d+)|\d+(?:\.\d+)?", cleaned):
        if m.group(1):
            nums.append(int(m.group(1)) + int(m.group(2)) / int(m.group(3)))
        elif m.group(4):
            nums.append(int(m.group(4)) / int(m.group(5)))
        else:
            nums.append(float(m.group(0)))
    return nums


def _verify_exercise_answer(item: Dict[str, Any], derived: DerivedResult) -> Tuple[str, str, str, Dict[str, Any]]:
    """Return (answer_status, discrepancy, severity, evidence)."""
    if not derived.verifiable:
        return "UNVERIFIABLE", derived.notes or "Cannot verify deterministically.", "info", {}

    q_en = (item.get("q") or {}).get("en") or ""
    fig_alt = (item.get("figureAlt") or {}).get("en") or ""
    source_text = f"{q_en} {fig_alt}" if derived.figure_sourced else q_en
    missing_nums = verify_source_numbers(derived.required_numbers, source_text)
    if missing_nums:
        return (
            "UNVERIFIABLE",
            f"Required source numbers missing from prompt: {missing_nums}",
            "major",
            {"missingSourceNumbers": missing_nums},
        )

    ans_text = _extract_answer_text(item)
    ans_math = item.get("answerMath")

    # 1. MCQ handling
    mcq_opts = parse_mcq_options_en(q_en)
    if mcq_opts:
        selected = extract_selected_option_label(ans_text)
        matched_labels = [lbl for lbl, txt in mcq_opts.items() if option_matches_derived(txt, derived.expr)]
        if selected and selected in matched_labels:
            return (
                "PASS",
                "",
                "none",
                {"mcqSelected": selected, "mcqMatched": matched_labels},
            )
        return (
            "FAIL",
            f"MCQ selected={selected}, but independently derived matches {matched_labels}",
            "critical",
            {"mcqSelected": selected, "mcqMatched": matched_labels, "options": mcq_opts},
        )

    # 2. Ratio handling
    if isinstance(derived.expr, tuple):
        # Extract ratio substring from answer_text or answerMath
        ratio_candidates = [ans_text]
        if isinstance(ans_math, dict):
            lx = ans_math.get("latex") or (ans_math.get("en") or {}).get("latex") or ""
            if lx:
                ratio_candidates.insert(0, lx)
        for cand in ratio_candidates:
            # Strip prefix like "Ratio of heights = " or trailing "(Proved)."
            seg = cand.split("=")[-1]
            seg = re.sub(r"\([^)]*\)", "", seg).strip().rstrip(".")
            r_obs = parse_ratio(seg)
            if r_obs and ratios_equivalent(r_obs, derived.expr):
                return "PASS", "", "none", {"ratioMatched": seg}
        return (
            "FAIL",
            f"Ratio mismatch: expected {_format_derived(derived)}, got {ans_text!r}",
            "critical",
            {},
        )

    # 3. Multi-value answers (e.g. radius and height in Ex 7.1 Q1, Q2)
    if isinstance(derived.expr, list):
        obs_nums = _extract_answer_numbers(ans_text, ans_math)
        expected_vals = [float(x.evalf()) for x in derived.expr]
        if len(obs_nums) >= len(expected_vals) and all(
            any(abs(o - e) <= derived.tolerance for o in obs_nums) for e in expected_vals
        ):
            return "PASS", "", "none", {"observedNumbers": obs_nums, "expectedNumbers": expected_vals}
        return (
            "FAIL",
            f"Multi-value mismatch: expected {expected_vals}, got {obs_nums}",
            "critical",
            {"observedNumbers": obs_nums, "expectedNumbers": expected_vals},
        )

    # 4. Symbolic or numeric scalar expression
    expr = derived.expr
    if isinstance(expr, sp.Expr):
        # Try symbolic equivalence first if answerMath latex exists
        lx = ""
        if isinstance(ans_math, dict):
            lx = (ans_math.get("en") or {}).get("latex") if "en" in ans_math else ans_math.get("latex") or ""
        if lx:
            cleaned_lx = re.sub(r"\\approx", "", lx)
            cleaned_lx = cleaned_lx.split("=")[-1]
            try:
                obs_expr = parse_expression(cleaned_lx)
                if expressions_equivalent(obs_expr, expr):
                    return "PASS", "", "none", {"matchType": "symbolic_latex"}
            except Exception:
                pass

        # Strip algebraic expression from answer_text if free_symbols present
        if expr.free_symbols:
            seg = re.sub(r"\b(sq\.?\s*units?|cubic\s+units?|units?)\b", "", ans_text, flags=re.I)
            seg = seg.split("=")[-1].strip().rstrip(".")
            try:
                obs_expr = parse_expression(seg)
                if expressions_equivalent(obs_expr, expr):
                    return "PASS", "", "none", {"matchType": "symbolic_text"}
            except Exception:
                pass
            return (
                "FAIL",
                f"Symbolic answer mismatch: expected {expr}, got {ans_text!r}",
                "critical",
                {},
            )

        # Numeric comparison
        obs_nums = _extract_answer_numbers(ans_text, ans_math)
        for o in obs_nums:
            # If answer_text had '%' (e.g. "100%"), parse_expression("100%") returns 1.0; scale back to 100
            cand = o * 100.0 if (derived.expected_dimension == "percentage" and "%" in ans_text and o <= 1.0) else o
            m = check_numeric_match(expr, cand, tolerance=derived.tolerance, preferred_pi=derived.preferred_pi)
            if m.matched:
                # Dimensional consistency check
                obs_dim = detect_answer_dimension(ans_text)
                if derived.expected_dimension and obs_dim and obs_dim != derived.expected_dimension:
                    return (
                        "FAIL",
                        f"Dimensional unit mismatch: expected {derived.expected_dimension}, observed {obs_dim} in {ans_text!r}",
                        "major",
                        {"numericMatch": asdict(m), "observedDimension": obs_dim},
                    )
                return "PASS", "", "none", {"numericMatch": asdict(m), "observedDimension": obs_dim}

        return (
            "FAIL",
            f"Numeric answer mismatch: expected {_format_derived(derived)}, got {obs_nums} ({ans_text!r})",
            "critical",
            {"observedNumbers": obs_nums},
        )

    return "UNVERIFIABLE", "Unsupported derived expression type.", "info", {}


def _verify_concept_answer(concept: Dict[str, Any], derived: DerivedResult) -> Tuple[str, str, str, Dict[str, Any]]:
    if not derived.verifiable:
        return "UNVERIFIABLE", derived.notes, "info", {}
    choices = concept.get("choices") or []
    correct_idx = concept.get("correct")
    if not isinstance(correct_idx, int) or not (0 <= correct_idx < len(choices)):
        return "FAIL", f"Invalid concept correct index: {correct_idx!r}", "critical", {}

    matched_indices = [
        i for i, ch in enumerate(choices) if option_matches_derived(str(ch.get("en") or ""), derived.expr)
    ]
    if correct_idx in matched_indices:
        return "PASS", "", "none", {"correctIndex": correct_idx, "matchedIndices": matched_indices}
    return (
        "FAIL",
        f"Concept correct={correct_idx} ({choices[correct_idx].get('en')}), but derived matches {matched_indices}",
        "critical",
        {"correctIndex": correct_idx, "matchedIndices": matched_indices},
    )


def run_audit(repo_root: Path) -> Dict[str, Any]:
    bundle = load_g10_ch7_bundle(repo_root)
    fidelity_index = build_fidelity_index(bundle.get("fidelity") or {})
    records: List[AuditRecord] = []

    # 1. Exercises (62)
    for item in bundle["exercises"]:
        item_id = item["id"]
        rec_meta = reconcile_item(item, fidelity_index)
        deriv_fn = DERIVATION_REGISTRY.get(item_id)
        derived = deriv_fn() if deriv_fn else DerivedResult(False, "unregistered", notes="No derivation registered.")

        ans_status, ans_disc, ans_sev, ans_ev = _verify_exercise_answer(item, derived)
        step_res = validate_steps(item.get("steps") or [])
        q_obj = item.get("q") or {}
        ta_res = validate_en_ta_consistency(q_obj.get("en") or "", q_obj.get("ta"))

        # Combine into overall status while keeping sub-statuses strictly separate
        if ans_status == "FAIL" or step_res.status == "FAIL" or ta_res.status == "FAIL":
            overall = "FAIL"
            if ans_status == "FAIL":
                sev = ans_sev
                disc = ans_disc
                corr = "Correct mathematical derivation/answer to match first-principles calculation."
            elif step_res.status == "FAIL":
                sev = "major"
                disc = f"Intermediate step equality failure: {step_res.failed_chains}"
                corr = "Fix invalid intermediate equation transformation in steps."
            else:
                sev = "major"
                disc = f"English-Tamil consistency failure: {ta_res.flags}"
                corr = "Align Tamil prompt numbers/terminology with English prompt."
        elif ans_status == "UNVERIFIABLE":
            overall = "UNVERIFIABLE"
            sev = "info"
            disc = ans_disc
            corr = "Manual/qualitative verification required (non-numerical item)."
        elif ta_res.status in ("MISSING", "PARTIAL") or step_res.status == "PARTIAL":
            overall = "PARTIAL"
            sev = "minor"
            parts = []
            if ta_res.status == "MISSING":
                parts.append("Tamil prompt missing in student data module")
            elif ta_res.status == "PARTIAL":
                parts.append(f"Tamil consistency flags: {ta_res.flags}")
            if step_res.status == "PARTIAL":
                parts.append(f"Unparsed step indices: {step_res.unparsed_steps}")
            disc = "; ".join(parts)
            corr = "Populate/review Tamil prompt or simplify non-standard step notation."
        else:
            overall = "PASS"
            sev = "none"
            disc = ""
            corr = ""

        records.append(
            AuditRecord(
                id=item_id,
                item_type="exercise",
                section=str(item.get("exercise") or ""),
                source_reference=rec_meta.source_reference,
                validation_method=derived.method,
                independently_derived_result=_format_derived(derived),
                existing_result=_extract_answer_text(item),
                status=overall,
                answer_status=ans_status,
                step_status=step_res.status,
                tamil_status=ta_res.status,
                discrepancy=disc,
                severity=sev,
                recommended_correction=corr,
                supporting_evidence={
                    "answerEvidence": ans_ev,
                    "stepChecks": {
                        "checkedChains": step_res.checked_chains,
                        "passedChains": step_res.passed_chains,
                        "failedChains": step_res.failed_chains,
                        "unparsedSteps": step_res.unparsed_steps,
                    },
                    "tamilChecks": {
                        "flags": ta_res.flags,
                        "details": ta_res.details,
                    },
                    "fidelity": asdict(rec_meta),
                },
            )
        )

    # 2. Concepts (9)
    for concept in bundle["concepts"]:
        cid = concept["id"]
        deriv_fn = DERIVATION_REGISTRY.get(cid)
        derived = deriv_fn() if deriv_fn else DerivedResult(False, "unregistered", notes="No derivation registered.")

        ans_status, ans_disc, ans_sev, ans_ev = _verify_concept_answer(concept, derived)
        proof_steps = (concept.get("proof") or {}).get("steps") or []
        step_res = validate_steps(
            [{"eq": "", "math": st.get("math")} for st in proof_steps]
        )
        q_obj = concept.get("question") or {}
        ta_res = validate_en_ta_consistency(q_obj.get("en") or "", q_obj.get("ta"))

        if ans_status == "FAIL" or step_res.status == "FAIL" or ta_res.status == "FAIL":
            overall = "FAIL"
            sev = ans_sev if ans_status == "FAIL" else "major"
            disc = ans_disc or f"Step={step_res.status}, Tamil={ta_res.flags}"
            corr = "Review concept question/choice/proof/Tamil alignment."
        elif ta_res.status in ("MISSING", "PARTIAL"):
            overall = "PARTIAL"
            sev = "minor"
            disc = f"Tamil editorial check flags: {ta_res.flags}"
            corr = "Review Tamil terminology/units in concept prompt."
        else:
            overall = "PASS"
            sev = "none"
            disc = ""
            corr = ""

        choices = concept.get("choices") or []
        cidx = concept.get("correct")
        existing_ans = f"choice[{cidx}]: {choices[cidx].get('en')}" if isinstance(cidx, int) and 0 <= cidx < len(choices) else str(cidx)

        records.append(
            AuditRecord(
                id=cid,
                item_type="concept",
                section=str(concept.get("section") or ""),
                source_reference="site/data/g10-ch7-concepts.js",
                validation_method=derived.method,
                independently_derived_result=_format_derived(derived),
                existing_result=existing_ans,
                status=overall,
                answer_status=ans_status,
                step_status=step_res.status,
                tamil_status=ta_res.status,
                discrepancy=disc,
                severity=sev,
                recommended_correction=corr,
                supporting_evidence={
                    "answerEvidence": ans_ev,
                    "tamilChecks": {"flags": ta_res.flags, "details": ta_res.details},
                },
            )
        )

    summary = _compute_summary(records, bundle["counts"])
    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.0",
        "scope": "Grade 10 Chapter 7 — Mensuration",
        "inventoryCounts": bundle["counts"],
        "summary": summary,
        "records": [asdict(r) for r in records],
    }


def _compute_summary(records: List[AuditRecord], counts: Dict[str, int]) -> Dict[str, Any]:
    by_status: Dict[str, int] = {"PASS": 0, "FAIL": 0, "PARTIAL": 0, "UNVERIFIABLE": 0}
    by_answer: Dict[str, int] = {"PASS": 0, "FAIL": 0, "UNVERIFIABLE": 0}
    by_step: Dict[str, int] = {"PASS": 0, "FAIL": 0, "PARTIAL": 0, "UNVERIFIABLE": 0}
    by_tamil: Dict[str, int] = {"PASS": 0, "FAIL": 0, "PARTIAL": 0, "MISSING": 0}

    for r in records:
        by_status[r.status] = by_status.get(r.status, 0) + 1
        by_answer[r.answer_status] = by_answer.get(r.answer_status, 0) + 1
        by_step[r.step_status] = by_step.get(r.step_status, 0) + 1
        by_tamil[r.tamil_status] = by_tamil.get(r.tamil_status, 0) + 1

    return {
        "totalItems": len(records),
        "exercises": counts.get("exercises", 0),
        "concepts": counts.get("concepts", 0),
        "overallStatusCounts": by_status,
        "answerVerificationCounts": by_answer,
        "intermediateStepCounts": by_step,
        "tamilValidationCounts": by_tamil,
    }


def write_reports(report: Dict[str, Any], out_dir: Path) -> Dict[str, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    json_path = out_dir / "audit-g10-ch7.json"
    csv_path = out_dir / "audit-g10-ch7.csv"
    md_path = out_dir / "audit-g10-ch7.md"

    json_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    fieldnames = [
        "id",
        "item_type",
        "section",
        "status",
        "answer_status",
        "step_status",
        "tamil_status",
        "severity",
        "validation_method",
        "independently_derived_result",
        "existing_result",
        "discrepancy",
        "recommended_correction",
        "source_reference",
    ]
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for rec in report["records"]:
            writer.writerow({k: rec.get(k, "") for k in fieldnames})

    s = report["summary"]
    lines = [
        "# TRACE MathGuard V1.0 — Grade 10 Chapter 7 (Mensuration) Audit Report",
        "",
        f"- **Total audited items**: {s['totalItems']} ({s['exercises']} exercises + {s['concepts']} concepts)",
        f"- **Overall status**: PASS={s['overallStatusCounts']['PASS']}, PARTIAL={s['overallStatusCounts']['PARTIAL']}, FAIL={s['overallStatusCounts']['FAIL']}, UNVERIFIABLE={s['overallStatusCounts']['UNVERIFIABLE']}",
        f"- **Answer verification (independent SymPy)**: PASS={s['answerVerificationCounts']['PASS']}, FAIL={s['answerVerificationCounts']['FAIL']}, UNVERIFIABLE={s['answerVerificationCounts']['UNVERIFIABLE']}",
        f"- **Intermediate-step verification**: PASS={s['intermediateStepCounts']['PASS']}, PARTIAL={s['intermediateStepCounts']['PARTIAL']}, FAIL={s['intermediateStepCounts']['FAIL']}, UNVERIFIABLE={s['intermediateStepCounts']['UNVERIFIABLE']}",
        f"- **Tamil consistency validation**: PASS={s['tamilValidationCounts']['PASS']}, PARTIAL={s['tamilValidationCounts']['PARTIAL']}, FAIL={s['tamilValidationCounts']['FAIL']}, MISSING={s['tamilValidationCounts']['MISSING']}",
        "",
        "## Items Requiring Attention (Non-PASS Overall Status)",
        "",
        "| ID | Type | Section | Overall | Answer | Steps | Tamil | Severity | Discrepancy |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    for rec in report["records"]:
        if rec["status"] != "PASS":
            disc = str(rec["discrepancy"]).replace("|", "\\|").replace("\n", " ")
            lines.append(
                f"| `{rec['id']}` | {rec['item_type']} | {rec['section']} | {rec['status']} | "
                f"{rec['answer_status']} | {rec['step_status']} | {rec['tamil_status']} | {rec['severity']} | {disc} |"
            )

    lines.extend([
        "",
        "## Full Item-by-Item Ledger",
        "",
        "| ID | Section | Method | Derived | Existing | Overall | Answer | Steps | Tamil |",
        "|---|---|---|---|---|---|---|---|---|",
    ])
    for rec in report["records"]:
        der = str(rec["independently_derived_result"]).replace("|", "\\|").replace("\n", " ")[:60]
        exi = str(rec["existing_result"]).replace("|", "\\|").replace("\n", " ")[:60]
        lines.append(
            f"| `{rec['id']}` | {rec['section']} | `{rec['validation_method']}` | {der} | {exi} | "
            f"{rec['status']} | {rec['answer_status']} | {rec['step_status']} | {rec['tamil_status']} |"
        )

    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return {"json": json_path, "csv": csv_path, "md": md_path}
