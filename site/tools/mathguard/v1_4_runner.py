"""TRACE MathGuard V1.4 — Cross-Grade Verification, Benchmark & Deliverable Runner."""

from __future__ import annotations

import hashlib
import json
import resource
import subprocess
import time
import zipfile
from collections import Counter
from pathlib import Path
from typing import Any, Dict, List

from .adapters.registry import CHAPTER_DOMAIN_MAP, get_adapter_for_chapter
from .adversarial_v1_3_4a import run_v1_3_4a_adversarial_suite
from .adversarial_v1_3_5 import run_v1_3_5_adversarial_and_holdout
from .adversarial_v1_3_5a import run_v1_3_5a_adversarial_suite
from .adversarial_v1_4 import run_v1_4_adversarial_suite
from .benchmark import run_benchmark
from .benchmark_v1_1 import run_v1_1_benchmark
from .benchmark_v1_2 import run_v1_2_benchmark
from .benchmark_v1_3_1_holdout import run_holdout_100
from .benchmark_v1_3_adversarial import run_adversarial_benchmark
from .reasoning_engine import verify_complete_working

FROZEN_SHA256 = "e72571d9be9c0978cab84762b5c21f356a78d04c799d2ba6a75d060093005f9b"


def classify_non_pass(
    status: str,
    failed_details: List[Dict[str, Any]],
    unsupported_details: List[Dict[str, Any]],
    item: Dict[str, Any],
) -> str:
    """Classify a non-PASS working into one of the 6 V1.4 root-cause categories."""
    if status == "FAIL" or failed_details:
        return "Confirmed mathematical error"
    evs = [str(d.get("evidence") or "") for d in unsupported_details]
    if any(e == "prose_only_unverified" for e in evs) and len(evs) == len(unsupported_details):
        # Purely qualitative/prose-only item (e.g. c10-7-ex7-5-q11)
        if status == "UNVERIFIABLE":
            return "Legitimately unverifiable statement"
        return "Missing mathematical explanation"
    if any(e in ("no_equality_relation", "standalone_expression_no_relation") for e in evs):
        return "Missing mathematical explanation"
    if any(e == "missing_variable_bindings" for e in evs):
        return "Context extraction limitation"
    if any(e in ("unparsed_equation", "unparsed_rhs", "empty_side") for e in evs):
        return "Parser limitation"
    if any(e in ("unverified_implication", "unverified_inequality", "unjustified_approximation") for e in evs):
        return "Unsupported mathematical reasoning"
    if status == "UNVERIFIABLE":
        return "Legitimately unverifiable statement"
    return "Unsupported mathematical reasoning"


def evaluate_frozen_benchmark(repo_root: Path) -> Dict[str, Any]:
    frozen_path = repo_root / "docs" / "trace" / "mathguard" / "v1_3_5_frozen_dataset.json"
    raw_bytes = frozen_path.read_bytes()
    file_sha = hashlib.sha256(raw_bytes).hexdigest()
    frozen = json.loads(raw_bytes.decode("utf-8"))
    sha = frozen.get("sha256") or FROZEN_SHA256
    v135a_path = repo_root / "docs" / "trace" / "mathguard" / "v1_3_5a_results.json"
    v135a_details = json.loads(v135a_path.read_text(encoding="utf-8")).get("details", {})

    t0 = time.perf_counter()
    statuses = Counter()
    answer_statuses = Counter()
    by_ch: Dict[str, Dict[str, Any]] = {}
    total_claims = ver_claims = fail_claims = unver_claims = 0
    details: Dict[str, Any] = {}
    non_pass_v14: List[Dict[str, Any]] = []
    v135a_non_pass_investigation: List[Dict[str, Any]] = []
    regressions: List[Dict[str, Any]] = []
    improvements: List[Dict[str, Any]] = []

    rank = {"FAIL": 0, "UNVERIFIABLE": 1, "PARTIAL": 2, "PASS": 3}

    for entry in frozen["items"]:
        qid = entry["id"]
        ch = str(entry["chapter"])
        is_concept = entry["item_type"] == "concept"
        allow_pos = bool(entry["allow_positive_domain"])
        item = entry["item"]

        adapter = get_adapter_for_chapter(10, ch)
        ad_res = adapter.verify_item(item, is_concept=is_concept)
        ans_st = ad_res["answer_status"]
        w_st = ad_res["working_status"]
        tot_c = ad_res["total_claims"]
        ver_c = ad_res["verified_claims"]
        fail_c = ad_res["failed_claims"]
        unver_c = ad_res["unsupported_claims"]
        f_det = ad_res["failed_details"]
        u_det = ad_res["unsupported_details"]

        statuses[w_st] += 1
        answer_statuses[ans_st] += 1
        total_claims += tot_c
        ver_claims += ver_c
        fail_claims += fail_c
        unver_claims += unver_c

        ch_bucket = by_ch.setdefault(
            ch,
            {
                "total": 0,
                "statuses": Counter(),
                "total_claims": 0,
                "verified_claims": 0,
                "failed_claims": 0,
                "unsupported_claims": 0,
            },
        )
        ch_bucket["total"] += 1
        ch_bucket["statuses"][w_st] += 1
        ch_bucket["total_claims"] += tot_c
        ch_bucket["verified_claims"] += ver_c
        ch_bucket["failed_claims"] += fail_c
        ch_bucket["unsupported_claims"] += unver_c

        prev_rec = v135a_details.get(qid, {})
        prev_st = prev_rec.get("status", "UNKNOWN")
        if prev_st in rank:
            if rank[w_st] < rank[prev_st]:
                regressions.append({"id": qid, "chapter": ch, "v1_3_5a": prev_st, "v1_4": w_st})
            elif rank[w_st] > rank[prev_st]:
                improvements.append({"id": qid, "chapter": ch, "v1_3_5a": prev_st, "v1_4": w_st})

        rec = {
            "id": qid,
            "chapter": ch,
            "item_type": entry["item_type"],
            "status": w_st,
            "answer_status": ans_st,
            "total_claims": tot_c,
            "verified_claims": ver_c,
            "failed_claims": fail_c,
            "unsupported_claims": unver_c,
            "failed_details": f_det,
            "unsupported_details": u_det,
        }
        details[qid] = rec

        if w_st != "PASS":
            cat = classify_non_pass(w_st, f_det, u_det, item)
            non_pass_v14.append({**rec, "classification": cat})

        if prev_st != "PASS":
            prev_fail = [c for c in prev_rec.get("claims", []) if c.get("status") == "FAILED"]
            prev_unver = [c for c in prev_rec.get("claims", []) if c.get("status") == "UNVERIFIED"]
            v135a_cat = (
                "Resolved in V1.4"
                if w_st == "PASS"
                else classify_non_pass(w_st, f_det, u_det, item)
            )
            v135a_non_pass_investigation.append(
                {
                    "id": qid,
                    "chapter": ch,
                    "item_type": entry["item_type"],
                    "v1_3_5a_status": prev_st,
                    "v1_4_status": w_st,
                    "v1_3_5a_claims": f"{prev_rec.get('verified_claims', 0)}/{prev_rec.get('total_claims', 0)}",
                    "v1_4_claims": f"{ver_c}/{tot_c}",
                    "classification": v135a_cat,
                    "v1_3_5a_non_verified_sample": (prev_fail + prev_unver)[:3],
                    "v1_4_remaining_non_verified": (f_det + u_det)[:3],
                }
            )

    dt = round(time.perf_counter() - t0, 2)
    peak_mb = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)

    by_ch_clean = {}
    for ch, b in sorted(by_ch.items()):
        by_ch_clean[ch] = {
            "total": b["total"],
            "statuses": dict(b["statuses"]),
            "total_claims": b["total_claims"],
            "verified_claims": b["verified_claims"],
            "failed_claims": b["failed_claims"],
            "unsupported_claims": b["unsupported_claims"],
        }

    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "frozenDatasetSha256": sha,
        "totalItems": len(frozen["items"]),
        "runtimeSec": dt,
        "peakMemoryMB": peak_mb,
        "statuses": dict(statuses),
        "passRatePct": round(100.0 * statuses["PASS"] / len(frozen["items"]), 2),
        "answerStatuses": dict(answer_statuses),
        "answerPassRatePct": round(
            100.0 * answer_statuses["PASS"] / max(1, sum(v for k, v in answer_statuses.items() if k != "UNVERIFIABLE")),
            2,
        ),
        "claims": {
            "total": total_claims,
            "verified": ver_claims,
            "failed": fail_claims,
            "unsupported": unver_claims,
            "verifiedRatePct": round(100.0 * ver_claims / max(1, total_claims), 2),
        },
        "byChapter": by_ch_clean,
        "regressionsVsV1_3_5a": regressions,
        "improvementsVsV1_3_5a": improvements,
        "v1_3_5a_non_pass_102_investigation": v135a_non_pass_investigation,
        "v1_4_remaining_non_pass": non_pass_v14,
        "v1_4_non_pass_classification_counts": dict(Counter(r["classification"] for r in non_pass_v14)),
        "details": details,
    }


def evaluate_expanded_dataset(repo_root: Path) -> Dict[str, Any]:
    extractor = repo_root / "site" / "tools" / "mathguard" / "extractor_v1_4.cjs"
    proc = subprocess.run(["node", str(extractor)], cwd=str(repo_root), capture_output=True, text=True, check=True)
    bundle = json.loads(proc.stdout)

    t0 = time.perf_counter()
    chapters_out: Dict[str, Any] = {}
    correction_queue: List[Dict[str, Any]] = []
    all_records: List[Dict[str, Any]] = []

    for grade_str, g_data in sorted(bundle["grades"].items(), key=lambda x: int(x[0])):
        grade = int(grade_str)
        for ch_str, ch_data in sorted(g_data["chapters"].items(), key=lambda x: int(x[0])):
            adapter = get_adapter_for_chapter(grade, ch_str)
            ex_records: List[Dict[str, Any]] = []
            con_records: List[Dict[str, Any]] = []

            for item in ch_data["exercises"]:
                rec = adapter.verify_item(item, is_concept=False)
                ex_records.append(rec)
                all_records.append(rec)
                if rec["working_status"] == "FAIL" or rec["tamil_status"] == "FAIL":
                    correction_queue.append(_build_correction_entry(grade, ch_str, item, rec, is_concept=False))

            for concept in ch_data["concepts"]:
                rec = adapter.verify_item(concept, is_concept=True)
                con_records.append(rec)
                all_records.append(rec)
                if rec["working_status"] == "FAIL" or rec["tamil_status"] == "FAIL":
                    correction_queue.append(_build_correction_entry(grade, ch_str, concept, rec, is_concept=True))

            combined = ex_records + con_records
            w_counts = Counter(r["working_status"] for r in combined)
            a_counts = Counter(r["answer_status"] for r in combined)
            t_counts = Counter(r["tamil_status"] for r in combined)
            tot_c = sum(r["total_claims"] for r in combined)
            ver_c = sum(r["verified_claims"] for r in combined)
            fail_c = sum(r["failed_claims"] for r in combined)
            unver_c = sum(r["unsupported_claims"] for r in combined)

            chapters_out[f"g{grade}-ch{ch_str}"] = {
                "grade": grade,
                "chapter": int(ch_str),
                "domain": adapter.domain,
                "title": ch_data["name"],
                "adapterStatus": adapter.adapter_status,
                "counts": ch_data["counts"],
                "workingStatusCounts": dict(w_counts),
                "answerStatusCounts": dict(a_counts),
                "tamilStatusCounts": dict(t_counts),
                "claims": {
                    "total": tot_c,
                    "verified": ver_c,
                    "failed": fail_c,
                    "unsupported": unver_c,
                    "verifiedRatePct": round(100.0 * ver_c / max(1, tot_c), 2),
                },
            }

    # Also inventory unsupported / planned chapters without certifying them
    planned_chapters = {}
    for (g, ch), (dom, title) in sorted(CHAPTER_DOMAIN_MAP.items()):
        key = f"g{g}-ch{ch}"
        if key in chapters_out:
            continue
        ad = get_adapter_for_chapter(g, ch, dom)
        inv = bundle.get("inventory", {}).get(str(g), {}).get(ch, {})
        planned_chapters[key] = {
            "grade": g,
            "chapter": int(ch),
            "domain": dom,
            "title": title,
            "adapterStatus": ad.adapter_status,
            "discoveredExercises": inv.get("exercises", 0),
            "certified": False,
        }

    dt = round(time.perf_counter() - t0, 2)
    tot_items = len(all_records)
    w_all = Counter(r["working_status"] for r in all_records)
    t_all = Counter(r["tamil_status"] for r in all_records)
    tot_c_all = sum(r["total_claims"] for r in all_records)
    ver_c_all = sum(r["verified_claims"] for r in all_records)

    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "runtimeSec": dt,
        "totalAuditedItems": tot_items,
        "workingStatusCounts": dict(w_all),
        "tamilStatusCounts": dict(t_all),
        "claims": {
            "total": tot_c_all,
            "verified": ver_c_all,
            "verifiedRatePct": round(100.0 * ver_c_all / max(1, tot_c_all), 2),
        },
        "auditedChapters": chapters_out,
        "plannedUnsupportedChapters": planned_chapters,
        "correctionQueue": correction_queue,
        "records": all_records,
    }


def _build_correction_entry(
    grade: int,
    chapter: str,
    item: Dict[str, Any],
    rec: Dict[str, Any],
    is_concept: bool,
) -> Dict[str, Any]:
    qid = str(item.get("id") or "")
    ex = str(item.get("exercise") or item.get("section") or "")
    steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
    incorrect_step = rec["failed_details"][0] if rec["failed_details"] else ({"tamilFlags": rec["tamil_flags"]} if rec["tamil_flags"] else {})
    return {
        "grade": grade,
        "chapter": int(chapter),
        "exercise": ex,
        "questionId": qid,
        "itemType": "concept" if is_concept else "exercise",
        "originalWorking": [
            {
                "en": s.get("en", ""),
                "ta": s.get("ta", ""),
                "math": (s.get("math") or {}).get("latex", "") if isinstance(s.get("math"), dict) else "",
                "eq": s.get("eq", ""),
            }
            for s in steps
        ],
        "incorrectStep": incorrect_step,
        "correctWorking": "Requires independent editorial review against verified 2025 textbook source before patching.",
        "independentDeterministicEvidence": {
            "workingStatus": rec["working_status"],
            "answerStatus": rec["answer_status"],
            "tamilStatus": rec["tamil_status"],
            "failedDetails": rec["failed_details"],
            "tamilFlags": rec["tamil_flags"],
            "discrepancy": rec["discrepancy"],
        },
        "englishTamilParityImplications": (
            f"Tamil parity status: {rec['tamil_status']} (flags: {rec['tamil_flags']})"
            if rec["tamil_flags"]
            else f"Tamil parity status: {rec['tamil_status']}"
        ),
        "proposedCorrectionPatch": {
            "status": "PROPOSED_DO_NOT_AUTO_APPLY",
            "targetId": qid,
            "reason": rec["failed_details"][0]["evidence"] if rec["failed_details"] else (rec["tamil_flags"][0] if rec["tamil_flags"] else "discrepancy"),
        },
    }


def run_all_suites() -> Dict[str, Any]:
    def _norm_s(res: Dict[str, Any]) -> Dict[str, Any]:
        s = res.get("summary")
        if isinstance(s, dict):
            return s
        return {k: v for k, v in res.items() if k not in ("cases", "details", "failures")}

    suites = {}
    suites["v1_0_120_case"] = _norm_s(run_benchmark())
    suites["v1_1_108_case"] = _norm_s(run_v1_1_benchmark())
    suites["v1_2_300_case"] = _norm_s(run_v1_2_benchmark())
    suites["v1_3_186_case"] = _norm_s(run_adversarial_benchmark())
    suites["v1_3_1_100_case_holdout"] = _norm_s(run_holdout_100())
    suites["v1_3_4a_adversarial"] = _norm_s(run_v1_3_4a_adversarial_suite())
    suites["v1_3_5_adversarial"] = _norm_s(run_v1_3_5_adversarial_and_holdout())
    suites["v1_3_5a_185_case"] = _norm_s(run_v1_3_5a_adversarial_suite())
    suites["v1_4_270_case"] = _norm_s(run_v1_4_adversarial_suite())
    return suites


def build_v1_4_deliverables(repo_root: Path) -> Dict[str, Any]:
    t_start = time.perf_counter()
    frozen_res = evaluate_frozen_benchmark(repo_root)
    expanded_res = evaluate_expanded_dataset(repo_root)
    suites_res = run_all_suites()
    total_runtime = round(time.perf_counter() - t_start, 2)
    peak_mb = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)

    # 1. TRACE_MathGuard_V1_4_Chapter_Coverage.json
    coverage_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "benchmarkSeparationPolicy": {
            "frozenBenchmark": "docs/trace/mathguard/v1_3_5_frozen_dataset.json",
            "frozenItemCount": 334,
            "frozenDatasetSha256": FROZEN_SHA256,
            "note": "Frozen 334-item benchmark is reported separately from the expanded 765-item Grade 9/10 dataset.",
        },
        "expandedDatasetSummary": {
            "totalAuditedItems": expanded_res["totalAuditedItems"],
            "workingStatusCounts": expanded_res["workingStatusCounts"],
            "tamilStatusCounts": expanded_res["tamilStatusCounts"],
            "claims": expanded_res["claims"],
            "runtimeSec": expanded_res["runtimeSec"],
        },
        "auditedChapters": expanded_res["auditedChapters"],
        "plannedUnsupportedChapters": expanded_res["plannedUnsupportedChapters"],
    }
    (repo_root / "TRACE_MathGuard_V1_4_Chapter_Coverage.json").write_text(
        json.dumps(coverage_doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    # 2. TRACE_MathGuard_V1_4_Regression_Matrix.json
    reg_matrix = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "frozenDatasetSha256": FROZEN_SHA256,
        "performance": {
            "frozenRuntimeSec": frozen_res["runtimeSec"],
            "totalPipelineRuntimeSec": total_runtime,
            "peakMemoryMB": peak_mb,
            "llmApiExpenditureUSD": 0.0,
        },
        "v1_3_5a_totals": {
            "total": 334,
            "statuses": {"PASS": 232, "PARTIAL": 93, "FAIL": 3, "UNVERIFIABLE": 6},
            "total_claims": 1723,
            "verified_claims": 1571,
            "failed_claims": 3,
            "unsupported_claims": 149,
        },
        "v1_4_frozen_totals": {
            "total": frozen_res["totalItems"],
            "statuses": frozen_res["statuses"],
            "passRatePct": frozen_res["passRatePct"],
            "answerStatuses": frozen_res["answerStatuses"],
            "answerPassRatePct": frozen_res["answerPassRatePct"],
            "claims": frozen_res["claims"],
            "byChapter": frozen_res["byChapter"],
        },
        "regressionsVsV1_3_5a": frozen_res["regressionsVsV1_3_5a"],
        "improvementsVsV1_3_5a": frozen_res["improvementsVsV1_3_5a"],
        "v1_3_5a_non_pass_102_investigation": frozen_res["v1_3_5a_non_pass_102_investigation"],
        "v1_4_remaining_non_pass": frozen_res["v1_4_remaining_non_pass"],
        "v1_4_non_pass_classification_counts": frozen_res["v1_4_non_pass_classification_counts"],
    }
    (repo_root / "TRACE_MathGuard_V1_4_Regression_Matrix.json").write_text(
        json.dumps(reg_matrix, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    # 3. TRACE_MathGuard_V1_4_Confirmed_Correction_Queue.json
    corr_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "policy": "Auto-modification of student content is disabled. All confirmed errors require editorial sign-off.",
        "totalConfirmedErrors": len(expanded_res["correctionQueue"]),
        "corrections": expanded_res["correctionQueue"],
    }
    (repo_root / "TRACE_MathGuard_V1_4_Confirmed_Correction_Queue.json").write_text(
        json.dumps(corr_doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    # 4. Complete machine-readable test results
    test_results = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.4",
        "totalRuntimeSec": total_runtime,
        "peakMemoryMB": peak_mb,
        "llmApiExpenditureUSD": 0.0,
        "frozenBenchmark": {k: v for k, v in frozen_res.items() if k != "details"},
        "expandedDataset": {k: v for k, v in expanded_res.items() if k not in ("records", "correctionQueue")},
        "adversarialAndHoldoutSuites": suites_res,
    }
    out_test_path = repo_root / "docs" / "trace" / "mathguard" / "v1_4_test_results.json"
    out_test_path.parent.mkdir(parents=True, exist_ok=True)
    out_test_path.write_text(json.dumps(test_results, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # 5. TRACE_MathGuard_V1_4_Independent_Review_Package.zip (preserving 45-item Gemini Neon holdout)
    old_zip = repo_root / "TRACE_MathGuard_Independent_Review_Package.zip"
    new_zip = repo_root / "TRACE_MathGuard_V1_4_Independent_Review_Package.zip"
    sample_records = [r for r in expanded_res["records"] if r["grade"] == 9][:15] + [
        r for r in expanded_res["records"] if r["grade"] == 10
    ][:15]
    with zipfile.ZipFile(new_zip, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        if old_zip.exists():
            with zipfile.ZipFile(old_zip, "r") as zin:
                for name in zin.namelist():
                    zout.writestr(name, zin.read(name))
        zout.writestr(
            "v1_4_expanded_review_sample.json",
            json.dumps(sample_records, indent=2, ensure_ascii=False) + "\n",
        )
        zout.writestr(
            "v1_4_review_notes.md",
            "# TRACE MathGuard V1.4 Independent Review Package\n\n"
            "- Preserves the original 45-item Gemini Neon holdout (`holdout_items.json`, `run_independent_holdout.py`).\n"
            "- Adds a 30-item cross-grade sample (`v1_4_expanded_review_sample.json`) across Grade 9 & Grade 10 Ch 3/5/7.\n"
            "- Zero LLM API expenditure; deterministic SymPy + Fraction verification.\n",
        )

    return test_results


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[3]
    summary = build_v1_4_deliverables(root)
    print(json.dumps({
        "frozen": {
            "statuses": summary["frozenBenchmark"]["statuses"],
            "passRatePct": summary["frozenBenchmark"]["passRatePct"],
            "claims": summary["frozenBenchmark"]["claims"],
            "regressions": len(summary["frozenBenchmark"]["regressionsVsV1_3_5a"]),
        },
        "expanded": summary["expandedDataset"],
        "v1_4_270_case": {
            "passed": summary["adversarialAndHoldoutSuites"]["v1_4_270_case"]["passed"],
            "total": summary["adversarialAndHoldoutSuites"]["v1_4_270_case"]["totalCases"],
            "falseAcceptances": summary["adversarialAndHoldoutSuites"]["v1_4_270_case"]["falseAcceptances"],
        },
        "totalRuntimeSec": summary["totalRuntimeSec"],
        "peakMemoryMB": summary["peakMemoryMB"],
    }, indent=2))
