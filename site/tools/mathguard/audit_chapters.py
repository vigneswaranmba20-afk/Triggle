"""TRACE MathGuard V1.3 — Multi-Chapter Audit Runner (Grade 10 Chapters 3, 5, and 7)."""

from __future__ import annotations

import json
import resource
import subprocess
import time
from pathlib import Path
from typing import Any, Dict, List

from .algebra import try_derive_algebra_from_prompt, verify_algebra_answer
from .ch5_verifier import verify_ch5_answer
from .derivations_g10_ch5 import Ch5DerivedResult, derive_ch5_for_item
from .engine import run_audit as run_ch7_audit
from .steps import extract_stem_assumptions, validate_steps
from .tamil_consistency import validate_en_ta_consistency


def load_all_3_chapters(repo_root: Path) -> Dict[str, Any]:
    extractor = repo_root / "site" / "tools" / "mathguard" / "extractor_all.cjs"
    proc = subprocess.run(
        ["node", str(extractor)],
        cwd=str(repo_root),
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(proc.stdout)


def _audit_generic_chapter(
    chapter_num: str,
    chapter_data: Dict[str, Any],
    mode: str,  # "algebra" | "coord"
) -> Dict[str, Any]:
    records: List[Dict[str, Any]] = []
    allow_pos = False  # Algebra & CoordGeo coordinates/roots can be negative!

    for item in chapter_data["exercises"]:
        qid = item["id"]
        q_obj = item.get("q") or {}
        q_en = q_obj.get("en") or ""
        q_ta = q_obj.get("ta")
        stem_env = extract_stem_assumptions(q_en)
        step_res = validate_steps(item.get("steps") or [], allow_positive_domain=allow_pos, initial_env=stem_env)
        ta_res = validate_en_ta_consistency(q_en, q_ta)

        if mode == "algebra":
            deriv = try_derive_algebra_from_prompt(q_en)
            ans_status, ans_disc = verify_algebra_answer(item, deriv)
        else:
            deriv = derive_ch5_for_item(qid, item, is_concept=False)
            ans_status, ans_disc = verify_ch5_answer(item, deriv, is_concept=False)

        ans_raw = item.get("answer")
        ans_str = str(ans_raw.get("en") if isinstance(ans_raw, dict) else (ans_raw or ""))

        records.append(
            {
                "id": qid,
                "item_type": "exercise",
                "section": str(item.get("exercise") or ""),
                "validation_method": deriv.method,
                "answer_status": ans_status,
                "step_status": step_res.status,
                "tamil_status": ta_res.status,
                "existing_result": ans_str,
                "discrepancy": ans_disc or (f"Step={step_res.failed_chains}" if step_res.status == "FAIL" else ""),
                "stepChecks": {
                    "checkedChains": step_res.checked_chains,
                    "passedChains": step_res.passed_chains,
                    "failedChains": step_res.failed_chains,
                    "unparsedSteps": step_res.unparsed_steps,
                },
                "tamilFlags": ta_res.flags,
            }
        )

    for concept in chapter_data["concepts"]:
        cid = concept["id"]
        q_obj = concept.get("question") or {}
        q_en = q_obj.get("en") or ""
        q_ta = q_obj.get("ta")
        proof_steps = (concept.get("proof") or {}).get("steps") or []
        step_res = validate_steps([{"eq": "", "math": st.get("math")} for st in proof_steps], allow_positive_domain=allow_pos)
        ta_res = validate_en_ta_consistency(q_en, q_ta)

        if mode == "algebra":
            deriv = try_derive_algebra_from_prompt(q_en)
            c_ans_status, c_ans_disc = "UNVERIFIABLE", ""
        else:
            deriv = derive_ch5_for_item(cid, concept, is_concept=True)
            c_ans_status, c_ans_disc = verify_ch5_answer(concept, deriv, is_concept=True)

        records.append(
            {
                "id": cid,
                "item_type": "concept",
                "section": str(concept.get("section") or ""),
                "validation_method": deriv.method,
                "answer_status": c_ans_status,
                "step_status": step_res.status,
                "tamil_status": ta_res.status,
                "existing_result": f"choice[{concept.get('correct')}]",
                "discrepancy": c_ans_disc or (f"Step={step_res.failed_chains}" if step_res.status == "FAIL" else ""),
                "stepChecks": {
                    "checkedChains": step_res.checked_chains,
                    "passedChains": step_res.passed_chains,
                    "failedChains": step_res.failed_chains,
                    "unparsedSteps": step_res.unparsed_steps,
                },
                "tamilFlags": ta_res.flags,
            }
        )

    def _counts(field: str) -> Dict[str, int]:
        out: Dict[str, int] = {}
        for r in records:
            v = r[field]
            out[v] = out.get(v, 0) + 1
        return out

    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.3",
        "chapter": chapter_num,
        "name": chapter_data["name"],
        "counts": {
            "exercises": len(chapter_data["exercises"]),
            "concepts": len(chapter_data["concepts"]),
            "total": len(records),
        },
        "answerVerificationCounts": _counts("answer_status"),
        "intermediateStepCounts": _counts("step_status"),
        "tamilValidationCounts": _counts("tamil_status"),
        "records": records,
    }


def run_all_3_chapters_audit(repo_root: Path, out_dir: Path) -> Dict[str, Any]:
    t0 = time.perf_counter()

    bundle = load_all_3_chapters(repo_root)
    ch3_report = _audit_generic_chapter("3", bundle["chapters"]["3"], "algebra")
    ch5_report = _audit_generic_chapter("5", bundle["chapters"]["5"], "coord")
    ch7_report = run_ch7_audit(repo_root)

    elapsed_ms = round((time.perf_counter() - t0) * 1000.0, 2)
    peak_kb = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss

    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "audit-g10-ch3.json").write_text(json.dumps(ch3_report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (out_dir / "audit-g10-ch5.json").write_text(json.dumps(ch5_report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    summary = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.3",
        "performance": {
            "totalExecutionTimeMs": elapsed_ms,
            "peakMemoryMB": round(peak_kb / 1024.0, 2),
        },
        "chapters": {
            "ch3_algebra": {
                "counts": ch3_report["counts"],
                "answerVerificationCounts": ch3_report["answerVerificationCounts"],
                "intermediateStepCounts": ch3_report["intermediateStepCounts"],
                "tamilValidationCounts": ch3_report["tamilValidationCounts"],
            },
            "ch5_coord_geometry": {
                "counts": ch5_report["counts"],
                "answerVerificationCounts": ch5_report["answerVerificationCounts"],
                "intermediateStepCounts": ch5_report["intermediateStepCounts"],
                "tamilValidationCounts": ch5_report["tamilValidationCounts"],
            },
            "ch7_mensuration": {
                "counts": {
                    "exercises": ch7_report["summary"]["exercises"],
                    "concepts": ch7_report["summary"]["concepts"],
                    "total": ch7_report["summary"]["totalItems"],
                },
                "answerVerificationCounts": ch7_report["summary"]["answerVerificationCounts"],
                "intermediateStepCounts": ch7_report["summary"]["intermediateStepCounts"],
                "tamilValidationCounts": ch7_report["summary"]["tamilValidationCounts"],
            },
        },
        "totalAuditedItems": (
            ch3_report["counts"]["total"]
            + ch5_report["counts"]["total"]
            + ch7_report["summary"]["totalItems"]
        ),
    }
    (out_dir / "audit-g10-all-3-chapters-summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return summary
