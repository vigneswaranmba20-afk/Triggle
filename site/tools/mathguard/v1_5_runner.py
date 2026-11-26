"""TRACE MathGuard V1.5 — Full Verification, Regression, Curriculum Sync & Deliverable Runner."""

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

from . import v1_4_runner as r14
from . import v1_4c_runner as r14c
from .adapters.registry import get_adapter_for_chapter
from .adversarial_v1_5 import run_v1_5_adversarial_suite
from .generate_v1_5_report_pdf import build_v1_5_pdf


def _item_hash(item: Dict[str, Any]) -> str:
    raw = json.dumps(item, sort_keys=True, ensure_ascii=False).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()[:16]


def _evaluate_chapter_1(grade: int, ch_bundle: Dict[str, Any]) -> Dict[str, Any]:
    adapter = get_adapter_for_chapter(grade, "1")
    exercises = ch_bundle.get("exercises", [])
    concepts = ch_bundle.get("concepts", [])
    non_exercises = ch_bundle.get("nonExercises", [])

    records: List[Dict[str, Any]] = []
    for it in exercises:
        rec = adapter.verify_item(it, is_concept=False)
        rec["contentHash"] = _item_hash(it)
        rec["exerciseSection"] = it.get("exercise") or it.get("ex") or ""
        records.append(rec)
    for it in concepts:
        rec = adapter.verify_item(it, is_concept=True)
        rec["contentHash"] = _item_hash(it)
        rec["exerciseSection"] = it.get("section") or "concept"
        records.append(rec)

    work_counts = dict(Counter(r["working_status"] for r in records))
    ans_counts = dict(Counter(r["answer_status"] for r in records))
    ta_counts = dict(Counter(r["tamil_status"] for r in records))
    tot_claims = sum(r["total_claims"] for r in records)
    ver_claims = sum(r["verified_claims"] for r in records)
    fail_claims = sum(r["failed_claims"] for r in records)
    unsup_claims = sum(r["unsupported_claims"] for r in records)
    ambig_items = [r["id"] for r in records if r.get("ambiguity_flags")]

    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "grade": grade,
        "chapter": "1",
        "title": ch_bundle.get("name", ""),
        "summary": {
            "exercises": len(exercises),
            "concepts": len(concepts),
            "archivedNonExercises": len(non_exercises),
            "totalItems": len(records),
            "workingCounts": work_counts,
            "answerCounts": ans_counts,
            "tamilCounts": ta_counts,
            "claims": {
                "total": tot_claims,
                "verified": ver_claims,
                "failed": fail_claims,
                "unsupported": unsup_claims,
                "verifiedRatePct": round((ver_claims / tot_claims * 100.0), 2) if tot_claims else 100.0,
            },
            "ambiguityFlaggedCount": len(ambig_items),
        },
        "records": records,
    }


def main(repo: Path) -> Dict[str, Any]:
    git_commit = r14c._git_head(repo)

    # 1. Historical & Recent Regression Suites + New V1.5 420-Case Adversarial/Holdout Suite
    reg_doc = r14c.run_historical_and_recent_suites()
    v15_adv = run_v1_5_adversarial_suite()
    reg_doc["engine"] = "TRACE MathGuard V1.5"
    reg_doc["gitCommit"] = git_commit
    reg_doc["v1_5Adversarial"] = {
        "totalCases": v15_adv["totalCases"],
        "passed": v15_adv["passed"],
        "failed": v15_adv["failed"],
        "abstentions": v15_adv["abstentions"],
        "falseAcceptances": v15_adv["falseAcceptances"],
        "falseRejections": v15_adv["falseRejections"],
        "provenance": v15_adv["provenance"],
        "main": {k: v for k, v in v15_adv["main"].items() if k != "failures"},
        "holdout": {k: v for k, v in v15_adv["holdout"].items() if k != "failures"},
    }

    # 2. Frozen 334-item benchmark (strictly separate)
    t0 = time.perf_counter()
    frozen = r14.evaluate_frozen_benchmark(repo)
    frozen_rt = round(time.perf_counter() - t0, 2)
    frozen_peak = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)
    frozen["runtimeSec"] = frozen_rt
    frozen["peakMemoryMB"] = frozen_peak

    # 3. Extract synchronized curriculum via extractor_v1_5.cjs
    proc = subprocess.run(
        ["node", str(repo / "site" / "tools" / "mathguard" / "extractor_v1_5.cjs")],
        cwd=str(repo),
        capture_output=True,
        text=True,
        check=True,
    )
    bundle = json.loads(proc.stdout)

    g9_ch1_doc = _evaluate_chapter_1(9, bundle["grades"]["9"]["chapters"]["1"])
    g9_ch1_doc["gitCommit"] = git_commit
    g10_ch1_doc = _evaluate_chapter_1(10, bundle["grades"]["10"]["chapters"]["1"])
    g10_ch1_doc["gitCommit"] = git_commit

    # 4. Bilingual Parity Report for New Domain
    all_new_records = g9_ch1_doc["records"] + g10_ch1_doc["records"]
    parity_counts = dict(Counter(r["tamil_status"] for r in all_new_records))
    parity_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "summary": {
            "totalAudited": len(all_new_records),
            **parity_counts,
        },
        "failingItems": [
            {"id": r["id"], "grade": r["grade"], "chapter": r["chapter"], "flags": r["tamil_flags"]}
            for r in all_new_records
            if r["tamil_status"] == "FAIL"
        ],
        "unverifiableItems": [
            {"id": r["id"], "grade": r["grade"], "chapter": r["chapter"], "flags": r["tamil_flags"]}
            for r in all_new_records
            if r["tamil_status"] == "UNVERIFIABLE"
        ],
    }

    # 5. Confirmed Correction Queue (Reconcile V1.4c queue + New Domain Findings)
    v14c_queue_path = repo / "Confirmed_Correction_Queue.json"
    reconciled_v14c = []
    if v14c_queue_path.exists():
        v14c_q = json.loads(v14c_queue_path.read_text(encoding="utf-8"))
        for entry in v14c_q.get("confirmedTamilPlaceholderQueue", []):
            reconciled_v14c.append({**entry, "v1_5Reconciliation": "PRESERVED_FOR_CODEX"})

    new_domain_findings = [
        {
            "questionId": r["id"],
            "grade": r["grade"],
            "chapter": r["chapter"],
            "contentHash": r["contentHash"],
            "issueType": "working_or_tamil_defect" if r["working_status"] == "FAIL" else "tamil_parity_defect",
            "workingStatus": r["working_status"],
            "tamilFlags": r["tamil_flags"],
            "ambiguityFlags": r.get("ambiguity_flags", []),
            "status": "PROPOSED_DO_NOT_AUTO_APPLY",
        }
        for r in all_new_records
        if r["working_status"] == "FAIL" or r["tamil_status"] == "FAIL"
    ]

    corr_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "summary": {
            "reconciledV14cCount": len(reconciled_v14c),
            "newDomainFindingsCount": len(new_domain_findings),
        },
        "reconciledV14cQueue": reconciled_v14c,
        "newDomainFindings": new_domain_findings,
        "policy": "Isolated non-destructive queue. Codex curriculum files untouched.",
    }

    # 6. Domain Coverage & V1.6 Recommendation
    overall_ok = (
        reg_doc["overallSummary"]["failed"] == 0
        and reg_doc["overallSummary"]["falseAcceptances"] == 0
        and v15_adv["failed"] == 0
        and v15_adv["falseAcceptances"] == 0
        and frozen["statuses"].get("FAIL", 0) == 0
    )
    coverage_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "externalLlmApiCostUSD": 0.0,
        "inventory": bundle["inventory"],
        "frozenBenchmark": {
            "totalItems": frozen["totalItems"],
            "statuses": frozen["statuses"],
            "passRatePct": frozen["passRatePct"],
            "claims": frozen["claims"],
            "runtimeSec": frozen_rt,
            "peakMemoryMB": frozen_peak,
        },
        "newDomainCoverage": {
            "grade9Chapter1": g9_ch1_doc["summary"],
            "grade10Chapter1": g10_ch1_doc["summary"],
        },
        "v1_6Recommendation": "GO" if overall_ok else "NO-GO",
        "nextTargetDomain": "Real Numbers (Grade 9 Ch 2) & Numbers and Sequences (Grade 10 Ch 2)",
    }

    # Write all 7 JSON/PDF deliverables
    (repo / "TRACE_MathGuard_V1_5_Regression_Results.json").write_text(json.dumps(reg_doc, ensure_ascii=False, indent=1), encoding="utf-8")
    (repo / "TRACE_MathGuard_V1_5_Set_Theory_Results.json").write_text(json.dumps(g9_ch1_doc, ensure_ascii=False, indent=1), encoding="utf-8")
    (repo / "TRACE_MathGuard_V1_5_Relations_Functions_Results.json").write_text(json.dumps(g10_ch1_doc, ensure_ascii=False, indent=1), encoding="utf-8")
    (repo / "TRACE_MathGuard_V1_5_Bilingual_Parity_Report.json").write_text(json.dumps(parity_doc, ensure_ascii=False, indent=1), encoding="utf-8")
    (repo / "TRACE_MathGuard_V1_5_Confirmed_Correction_Queue.json").write_text(json.dumps(corr_doc, ensure_ascii=False, indent=1), encoding="utf-8")
    (repo / "TRACE_MathGuard_V1_5_Domain_Coverage.json").write_text(json.dumps(coverage_doc, ensure_ascii=False, indent=1), encoding="utf-8")

    build_v1_5_pdf(
        repo / "TRACE_MathGuard_V1_5_Report.pdf",
        reg_doc,
        frozen,
        g9_ch1_doc,
        g10_ch1_doc,
        parity_doc,
        corr_doc,
        coverage_doc,
    )

    # 8. Independent Review Package
    blind_cases = [
        {
            "caseId": r["id"],
            "grade": r["grade"],
            "chapter": r["chapter"],
            "workingStatus": r["working_status"],
            "answerStatus": r["answer_status"],
            "tamilStatus": r["tamil_status"],
            "ambiguityFlags": r.get("ambiguity_flags", []),
        }
        for r in all_new_records
        if r["working_status"] == "FAIL" or r["tamil_status"] == "FAIL" or r.get("ambiguity_flags")
    ]
    pkg_manifest = {
        "package": "TRACE_MathGuard_V1_5_Independent_Review_Package",
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "files": [
            "TRACE_MathGuard_V1_5_Domain_Coverage.json",
            "TRACE_MathGuard_V1_5_Set_Theory_Results.json",
            "TRACE_MathGuard_V1_5_Relations_Functions_Results.json",
            "TRACE_MathGuard_V1_5_Bilingual_Parity_Report.json",
            "TRACE_MathGuard_V1_5_Confirmed_Correction_Queue.json",
            "TRACE_MathGuard_V1_5_Regression_Results.json",
            "TRACE_MathGuard_V1_5_Report.pdf",
            "blind_review_cases.json",
        ],
    }
    with zipfile.ZipFile(repo / "TRACE_MathGuard_V1_5_Independent_Review_Package.zip", "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("MANIFEST.json", json.dumps(pkg_manifest, indent=2))
        zf.writestr("blind_review_cases.json", json.dumps(blind_cases, ensure_ascii=False, indent=2))
        for fn in pkg_manifest["files"]:
            if fn != "blind_review_cases.json":
                zf.write(repo / fn, arcname=fn)

    return {
        "gitCommit": git_commit,
        "v1_6Recommendation": coverage_doc["v1_6Recommendation"],
        "historicalPassed": f"{reg_doc['overallSummary']['passed']}/{reg_doc['overallSummary']['executed']}",
        "v1_5AdversarialPassed": f"{v15_adv['passed']}/{v15_adv['totalCases']}",
        "frozen": {"statuses": frozen["statuses"], "runtimeSec": frozen_rt, "peakMemoryMB": frozen_peak},
        "g9Ch1": g9_ch1_doc["summary"],
        "g10Ch1": g10_ch1_doc["summary"],
    }


if __name__ == "__main__":
    print(json.dumps(main(Path(".")), ensure_ascii=False, indent=2))
