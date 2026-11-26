"""TRACE MathGuard V1.5a — Full Regression Recovery, Baseline Reconciliation & Deliverable Runner."""

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


def _summarize_records(records: List[Dict[str, Any]]) -> Dict[str, Any]:
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


def _classify_non_pass(r: Dict[str, Any]) -> str:
    if r["working_status"] == "PASS":
        return "PASS"
    if r["working_status"] == "FAIL":
        return "engine_or_parser_limitation" if r["failed_details"] else "algebraic_fallback_mismatch"
    if any("external_diagram_dependency" in f for f in r.get("ambiguity_flags", [])):
        return "source_ambiguity_or_external_diagram"
    if any("missing_universal_set" in f for f in r.get("ambiguity_flags", [])):
        return "missing_mathematical_context"
    if r["item_type"] == "concept":
        return "concept_prose_explanation"
    if r["working_status"] == "PARTIAL":
        return "partial_symbolic_working"
    return "unsupported_or_prose_classification"


def main(repo: Path) -> Dict[str, Any]:
    git_commit = r14c._git_head(repo)

    # 1. Historical + Recent Regression Suites (1,654 cases) + V1.5 450-case Suite
    reg_doc = r14c.run_historical_and_recent_suites()
    v15_adv = run_v1_5_adversarial_suite()
    reg_doc["engine"] = "TRACE MathGuard V1.5a"
    reg_doc["gitCommit"] = git_commit

    hist_rec_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "v1_4_270_case_recovery": {
            "priorV1_5": {"passed": 267, "failed": 3, "falseAcceptances": 3, "failingIds": ["v14-abs-dom-01", "v14-abs-dom-05", "v14-abs-dom-08"]},
            "currentV1_5a": {
                "passed": reg_doc["suites"]["v1_4_270_case"]["passed"],
                "failed": reg_doc["suites"]["v1_4_270_case"]["failed"],
                "falseAcceptances": reg_doc["suites"]["v1_4_270_case"]["falseAcceptances"],
            },
            "rootCause": "SetsRelationsFunctionsAdapter fell back to base_work (1+1=2) on non-domain 'unsupported domain' prompts; fixed with domain-context abstention guard and V1.4/V1.5 registry separation.",
        },
        "historicalSummary": reg_doc["historicalSummary"],
        "recentSummary": reg_doc["recentSummary"],
        "overallHistoricalAndRecent": reg_doc["overallSummary"],
        "suites": reg_doc["suites"],
    }

    complete_reg_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "historicalAndRecent1654": reg_doc["overallSummary"],
        "v1_5_450_case_adversarial_and_holdout": {
            "totalCases": v15_adv["totalCases"],
            "passed": v15_adv["passed"],
            "failed": v15_adv["failed"],
            "abstentions": v15_adv["abstentions"],
            "falseAcceptances": v15_adv["falseAcceptances"],
            "falseRejections": v15_adv["falseRejections"],
            "main": {k: v for k, v in v15_adv["main"].items() if k != "failures"},
            "holdout": {k: v for k, v in v15_adv["holdout"].items() if k != "failures"},
        },
        "totalExecutedCases": reg_doc["overallSummary"]["executed"] + v15_adv["totalCases"],
        "totalPassed": reg_doc["overallSummary"]["passed"] + v15_adv["passed"],
        "totalFailed": reg_doc["overallSummary"]["failed"] + v15_adv["failed"],
        "totalFalseAcceptances": reg_doc["overallSummary"]["falseAcceptances"] + v15_adv["falseAcceptances"],
    }

    # 2. Frozen 334-item benchmark & Expanded 765-item benchmark
    t0 = time.perf_counter()
    frozen = r14.evaluate_frozen_benchmark(repo)
    frozen_rt = round(time.perf_counter() - t0, 2)
    frozen_peak = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 2)

    t1 = time.perf_counter()
    expanded = r14.evaluate_expanded_dataset(repo)
    expanded_rt = round(time.perf_counter() - t1, 2)

    # 3. Git Ancestry & V1.4d Baseline Reconciliation
    v14d_recon_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "gitAncestryInvestigation": {
            "reportedV1_4dBranch": "trace/mathguard-v1-4d",
            "reportedV1_4dCommit": "2541d7f",
            "presentOnOrigin": False,
            "v1_5BaseCommit": "add170c (origin/trace/mathguard-v1-4c)",
            "explanation": "V1.4d (2541d7f) and its 112-case disclosed / 220-case holdout files were not pushed to origin; V1.5 branched from V1.4c (add170c) merged with origin/main (9bb35b5).",
        },
        "frozenBenchmark": {
            "reportedV1_4d": {"workingPass": 258, "total": 334, "verifiedClaims": 1606, "totalClaims": 1716, "regressions": 0},
            "currentV1_5a": {
                "workingPass": frozen["statuses"].get("PASS", 0),
                "total": sum(frozen["statuses"].values()),
                "statuses": frozen["statuses"],
                "claims": frozen["claims"],
                "answerStatuses": frozen["answerStatuses"],
                "runtimeSec": frozen_rt,
                "peakMemoryMB": frozen_peak,
            },
        },
        "expandedBenchmark": {
            "total": len(expanded["records"]),
            "workingStatusCounts": expanded["workingStatusCounts"],
            "answerStatusCounts": dict(Counter(r["answer_status"] for r in expanded["records"])),
            "tamilStatusCounts": expanded["tamilStatusCounts"],
            "claims": expanded["claims"],
            "runtimeSec": expanded_rt,
        },
        "omittedV1_4dSuitesStatus": {
            "disclosed112Benchmark": "NOT_IN_ORIGIN_REPO (unpushed V1.4d local artifact)",
            "holdout220Benchmark": "NOT_IN_ORIGIN_REPO (unpushed V1.4d local artifact)",
        },
    }

    # 4. New Domain Audit (Grade 9 Ch 1 & Grade 10 Ch 1)
    proc = subprocess.run(
        ["node", str(repo / "site" / "tools" / "mathguard" / "extractor_v1_5.cjs")],
        cwd=str(repo),
        capture_output=True,
        text=True,
        check=True,
    )
    v15_bundle = json.loads(proc.stdout)

    g9_ad = SetsRelationsFunctionsAdapter(grade=9, chapter="1", title="Set Language")
    g9_records = [g9_ad.verify_item(it, is_concept=False) for it in v15_bundle["grades"]["9"]["exercises"]] + [
        g9_ad.verify_item(it, is_concept=True) for it in v15_bundle["grades"]["9"]["concepts"]
    ]
    for r in g9_records:
        r["auditClassification"] = _classify_non_pass(r)

    g10_ad = SetsRelationsFunctionsAdapter(grade=10, chapter="1", title="Relations and Functions")
    g10_records = [g10_ad.verify_item(it, is_concept=False) for it in v15_bundle["grades"]["10"]["exercises"]] + [
        g10_ad.verify_item(it, is_concept=True) for it in v15_bundle["grades"]["10"]["concepts"]
    ]
    for r in g10_records:
        r["auditClassification"] = _classify_non_pass(r)

    set_theory_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "inventoryCounts": v15_bundle["grades"]["9"]["counts"],
        "summary": _summarize_records(g9_records),
        "classificationCounts": dict(Counter(r["auditClassification"] for r in g9_records)),
        "records": g9_records,
    }

    rel_fn_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "inventoryCounts": v15_bundle["grades"]["10"]["counts"],
        "summary": _summarize_records(g10_records),
        "classificationCounts": dict(Counter(r["auditClassification"] for r in g10_records)),
        "records": g10_records,
    }

    bilingual_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "expandedV1_4TamilCounts": expanded["tamilStatusCounts"],
        "grade9Chapter1TamilCounts": set_theory_doc["summary"]["tamilStatusCounts"],
        "grade10Chapter1TamilCounts": rel_fn_doc["summary"]["tamilStatusCounts"],
        "newDomainTamilFails": [
            {"id": r["id"], "grade": r["grade"], "flags": r["tamil_flags"]}
            for r in (g9_records + g10_records)
            if r["tamil_status"] == "FAIL"
        ],
    }

    # Reconcile prior queue (8 items in V1.4c; 9th item from unpushed V1.4d not present in origin)
    prior_q = json.loads((repo / "Confirmed_Correction_Queue.json").read_text(encoding="utf-8"))
    exp_map = {r["id"]: r for r in expanded["records"]}
    prior_recon = [
        {
            "questionId": item["questionId"],
            "priorStatus": item.get("status"),
            "currentExpandedTamilStatus": exp_map.get(item["questionId"], {}).get("tamil_status", "NOT_FOUND"),
        }
        for item in prior_q.get("confirmedTamilPlaceholderQueue", [])
    ]

    corr_doc = {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.5a",
        "gitCommit": git_commit,
        "priorQueueCount": len(prior_recon),
        "ninthItemDisposition": "V1.4d (2541d7f) was not pushed to origin; origin/trace/mathguard-v1-4c Confirmed_Correction_Queue.json contains 8 English-only placeholder items and 0 confirmed mathematical errors.",
        "priorV1_4cQueueReconciliation": prior_recon,
        "confirmedTamilPlaceholderQueue": prior_q.get("confirmedTamilPlaceholderQueue", []),
        "newDomainConfirmedFindings": [
            {"id": r["id"], "grade": r["grade"], "workingStatus": r["working_status"], "failedDetails": r["failed_details"]}
            for r in (g9_records + g10_records)
            if r["working_status"] == "FAIL"
        ],
        "newDomainTamilFindings": bilingual_doc["newDomainTamilFails"],
    }

    deliverables = {
        "Historical_Regression_Recovery.json": hist_rec_doc,
        "V1_4d_Baseline_Reconciliation.json": v14d_recon_doc,
        "Set_Theory_Verification_Report.json": set_theory_doc,
        "Relations_Functions_Verification_Report.json": rel_fn_doc,
        "Bilingual_Parity_Report.json": bilingual_doc,
        "Confirmed_Correction_Queue.json": corr_doc,
        "Complete_Regression_Results.json": complete_reg_doc,
    }
    for fname, payload in deliverables.items():
        (repo / fname).write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    zip_path = repo / "Independent_Review_Package.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for fname in deliverables:
            zf.write(repo / fname, arcname=fname)
        zf.write(repo / "site/tools/mathguard/adversarial_v1_5.py", arcname="adversarial_v1_5.py")
        zf.write(repo / "site/tools/mathguard/tests/test_v1_5a.py", arcname="test_v1_5a.py")

    return {
        "gitCommit": git_commit,
        "completeRegression": complete_reg_doc,
        "frozen": v14d_recon_doc["frozenBenchmark"]["currentV1_5a"],
        "g9": set_theory_doc["summary"],
        "g10": rel_fn_doc["summary"],
    }


if __name__ == "__main__":
    out = main(Path(__file__).resolve().parents[3])
    print(json.dumps(out, indent=2, ensure_ascii=False))
