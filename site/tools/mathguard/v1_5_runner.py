"""TRACE MathGuard V1.5 — Full Verification, Regression & Deliverable Runner."""

from __future__ import annotations

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
from .adapters.sets_relations_adapter import SetsRelationsFunctionsAdapter
from .adversarial_v1_5 import run_v1_5_adversarial_suite


def _summarize_domain_records(records: List[Dict[str, Any]]) -> Dict[str, Any]:
    tot_c = sum(r["total_claims"] for r in records)
    ver_c = sum(r["verified_claims"] for r in records)
    fail_c = sum(r["failed_claims"] for r in records)
    unsup_c = sum(r["unsupported_claims"] for r in records)
    return {
        "totalItems": len(records),
        "workingStatusCounts": dict(Counter(r["working_status"] for r in records)),
        "answerStatusCounts": dict(Counter(r["answer_status"] for r in records)),
        "tamilStatusCounts": dict(Counter(r["tamil_status"] for r in records)),
        "claims": {
            "total": tot_c,
            "verified": ver_c,
            "failed": fail_c,
            "unsupported": unsup_c,
            "verifiedRatePct": round((ver_c / tot_c * 100.0) if tot_c else 0.0, 2),
        },
        "ambiguityFlagCounts": dict(Counter(f for r in records for f in r.get("ambiguity_flags", []))),
    }


def main(repo: Path) -> Dict[str, Any]:
    git_commit = r14c._git_head(repo)

    # 1. Historical + V1.4c regression suites + V1.5 450-case adversarial & holdout suite
    reg_doc = r14c.run_historical_and_recent_suites()
    v15_adv = run_v1_5_adversarial_suite()
    reg_doc["engine"] = "TRACE MathGuard V1.5"
    reg_doc["gitCommit"] = git_commit
    reg_doc["v1_5_adversarial"] = {
        "totalCases": v15_adv["totalCases"],
        "passed": v15_adv["passed"],
        "failed": v15_adv["failed"],
        "abstentions": v15_adv["abstentions"],
        "falseAcceptances": v15_adv["falseAcceptances"],
        "falseRejections": v15_adv["falseRejections"],
        "main": {k: v for k, v in v15_adv["main"].items() if k != "failures"},
        "holdout": {k: v for k, v in v15_adv["holdout"].items() if k != "failures"},
    }

    # 2. Frozen 334-item benchmark (strictly separate)
    t0 = time.perf_counter()
    frozen = r14.evaluate_frozen_benchmark(repo)
    frozen_rt = round(time.perf_counter() - t0, 2)
    frozen_peak = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)

    # 3. Expanded V1.4 benchmark (765 items, strictly separate from V1.5 new domain)
    t1 = time.perf_counter()
    expanded = r14.evaluate_expanded_dataset(repo)
    expanded_rt = round(time.perf_counter() - t1, 2)

    # 4. V1.5 New Domain Audit: Grade 9 Ch 1 (Set Language) & Grade 10 Ch 1 (Relations & Functions)
    proc = subprocess.run(
        ["node", str(repo / "site" / "tools" / "mathguard" / "extractor_v1_5.cjs")],
        cwd=str(repo),
        capture_output=True,
        text=True,
        check=True,
    )
    v15_bundle = json.loads(proc.stdout)

    g9_ad = SetsRelationsFunctionsAdapter(grade=9, chapter="1", title="Set Language")
    g9_ex_records = [g9_ad.verify_item(it, is_concept=False) for it in v15_bundle["grades"]["9"]["exercises"]]
    g9_con_records = [g9_ad.verify_item(it, is_concept=True) for it in v15_bundle["grades"]["9"]["concepts"]]

    g10_ad = SetsRelationsFunctionsAdapter(grade=10, chapter="1", title="Relations and Functions")
    g10_ex_records = [g10_ad.verify_item(it, is_concept=False) for it in v15_bundle["grades"]["10"]["exercises"]]
    g10_con_records = [g10_ad.verify_item(it, is_concept=True) for it in v15_bundle["grades"]["10"]["concepts"]]

    g9_all = g9_ex_records + g9_con_records
    g10_all = g10_ex_records + g10_con_records

    set_theory_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "grade": 9,
        "chapter": "1",
        "title": "Set Language",
        "inventoryCounts": v15_bundle["grades"]["9"]["counts"],
        "summary": _summarize_domain_records(g9_all),
        "exercisesSummary": _summarize_domain_records(g9_ex_records),
        "conceptsSummary": _summarize_domain_records(g9_con_records),
        "records": g9_all,
    }

    rel_fn_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "grade": 10,
        "chapter": "1",
        "title": "Relations and Functions",
        "inventoryCounts": v15_bundle["grades"]["10"]["counts"],
        "summary": _summarize_domain_records(g10_all),
        "exercisesSummary": _summarize_domain_records(g10_ex_records),
        "conceptsSummary": _summarize_domain_records(g10_con_records),
        "records": g10_all,
    }

    domain_cov_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "frozenBenchmark": {
            "total": sum(frozen["statuses"].values()),
            "statuses": frozen["statuses"],
            "claims": frozen["claims"],
            "answerStatuses": frozen["answerStatuses"],
            "runtimeSec": frozen_rt,
            "peakMemoryMB": frozen_peak,
        },
        "expandedV1_4Benchmark": {
            "total": len(expanded["records"]),
            "workingStatusCounts": expanded["workingStatusCounts"],
            "answerStatusCounts": dict(Counter(r["answer_status"] for r in expanded["records"])),
            "tamilStatusCounts": expanded["tamilStatusCounts"],
            "claims": expanded["claims"],
            "runtimeSec": expanded_rt,
        },
        "newDomainV1_5": {
            "grade9Chapter1": {
                "inventory": v15_bundle["grades"]["9"]["counts"],
                "summary": set_theory_doc["summary"],
            },
            "grade10Chapter1": {
                "inventory": v15_bundle["grades"]["10"]["counts"],
                "summary": rel_fn_doc["summary"],
            },
            "combinedSummary": _summarize_domain_records(g9_all + g10_all),
        },
    }

    bilingual_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "expandedV1_4TamilCounts": expanded["tamilStatusCounts"],
        "newDomainV1_5TamilCounts": _summarize_domain_records(g9_all + g10_all)["tamilStatusCounts"],
        "grade9Chapter1TamilCounts": set_theory_doc["summary"]["tamilStatusCounts"],
        "grade10Chapter1TamilCounts": rel_fn_doc["summary"]["tamilStatusCounts"],
        "newDomainTamilFails": [
            {"id": r["id"], "grade": r["grade"], "flags": r["tamil_flags"]}
            for r in (g9_all + g10_all)
            if r["tamil_status"] == "FAIL"
        ],
    }

    # Reconcile prior V1.4c/V1.4d correction queue
    prior_queue_path = repo / "Confirmed_Correction_Queue.json"
    prior_queue = json.loads(prior_queue_path.read_text(encoding="utf-8")) if prior_queue_path.exists() else {}
    expanded_map = {r["id"]: r for r in expanded["records"]}
    prior_reconciled = []
    for item in prior_queue.get("confirmedTamilPlaceholderQueue", []):
        qid = item.get("questionId")
        cur = expanded_map.get(qid, {})
        prior_reconciled.append({
            "questionId": qid,
            "priorStatus": item.get("status"),
            "currentV1_5ExpandedTamilStatus": cur.get("tamil_status", "NOT_FOUND"),
            "resolvedOnMain": cur.get("tamil_status") == "PASS",
        })

    new_math_fails = [
        {
            "questionId": r["id"],
            "grade": r["grade"],
            "chapter": r["chapter"],
            "workingStatus": r["working_status"],
            "failedDetails": r["failed_details"],
            "status": "PROPOSED_DO_NOT_AUTO_APPLY",
        }
        for r in (g9_all + g10_all)
        if r["working_status"] == "FAIL"
    ]

    corr_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5",
        "gitCommit": git_commit,
        "priorV1_4dQueueReconciliation": prior_reconciled,
        "newDomainConfirmedFindings": new_math_fails,
        "newDomainTamilFindings": bilingual_doc["newDomainTamilFails"],
    }

    # Write JSON deliverables
    deliverables = {
        "TRACE_MathGuard_V1_5_Regression_Results.json": reg_doc,
        "TRACE_MathGuard_V1_5_Domain_Coverage.json": domain_cov_doc,
        "TRACE_MathGuard_V1_5_Set_Theory_Results.json": set_theory_doc,
        "TRACE_MathGuard_V1_5_Relations_Functions_Results.json": rel_fn_doc,
        "TRACE_MathGuard_V1_5_Bilingual_Parity_Report.json": bilingual_doc,
        "TRACE_MathGuard_V1_5_Confirmed_Correction_Queue.json": corr_doc,
    }
    for fname, payload in deliverables.items():
        (repo / fname).write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    # Package independent review zip
    zip_path = repo / "TRACE_MathGuard_V1_5_Independent_Review_Package.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for fname in deliverables:
            zf.write(repo / fname, arcname=fname)
        zf.write(repo / "site/tools/mathguard/adversarial_v1_5.py", arcname="adversarial_v1_5.py")
        zf.write(repo / "site/tools/mathguard/extractor_v1_5.cjs", arcname="extractor_v1_5.cjs")

    return {
        "gitCommit": git_commit,
        "historical": reg_doc["historicalSummary"],
        "v1_5_adversarial": reg_doc["v1_5_adversarial"],
        "frozen": domain_cov_doc["frozenBenchmark"],
        "expandedV1_4": domain_cov_doc["expandedV1_4Benchmark"],
        "newDomainV1_5": {
            "g9": set_theory_doc["summary"],
            "g10": rel_fn_doc["summary"],
        },
    }


if __name__ == "__main__":
    summary = main(Path(__file__).resolve().parents[3])
    print(json.dumps(summary, indent=2, ensure_ascii=False))
