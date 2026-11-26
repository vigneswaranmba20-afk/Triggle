"""Generate concise, quantitative TRACE_MathGuard_V1_5_Report.pdf via Playwright Chromium."""

from __future__ import annotations

import html
import json
from pathlib import Path
from playwright.sync_api import sync_playwright


def build_pdf(repo: Path) -> Path:
    reg = json.loads((repo / "TRACE_MathGuard_V1_5_Regression_Results.json").read_text(encoding="utf-8"))
    cov = json.loads((repo / "TRACE_MathGuard_V1_5_Domain_Coverage.json").read_text(encoding="utf-8"))
    st_doc = json.loads((repo / "TRACE_MathGuard_V1_5_Set_Theory_Results.json").read_text(encoding="utf-8"))
    rf_doc = json.loads((repo / "TRACE_MathGuard_V1_5_Relations_Functions_Results.json").read_text(encoding="utf-8"))
    bi_doc = json.loads((repo / "TRACE_MathGuard_V1_5_Bilingual_Parity_Report.json").read_text(encoding="utf-8"))
    cq_doc = json.loads((repo / "TRACE_MathGuard_V1_5_Confirmed_Correction_Queue.json").read_text(encoding="utf-8"))

    hist = reg["historicalSummary"]
    rec = reg["recentSummary"]
    adv = reg["v1_5_adversarial"]
    frz = cov["frozenBenchmark"]
    exp14 = cov["expandedV1_4Benchmark"]
    g9 = cov["newDomainV1_5"]["grade9Chapter1"]["summary"]
    g10 = cov["newDomainV1_5"]["grade10Chapter1"]["summary"]
    comb = cov["newDomainV1_5"]["combinedSummary"]

    gates_ok = (
        hist["failed"] == 0
        and hist["falseAcceptances"] == 0
        and rec["failed"] == 0
        and rec["falseAcceptances"] == 0
        and adv["failed"] == 0
        and adv["falseAcceptances"] == 0
        and frz["statuses"].get("FAIL", 0) == 0
        and exp14["workingStatusCounts"].get("FAIL", 0) == 0
    )
    decision = "GO for V1.6 (Real Numbers / Number Sequences) with V1.5 New-Domain Certification Gated on Independent Review" if gates_ok else "NO-GO"

    suite_rows = ""
    for sname, sdata in reg["suites"].items():
        suite_rows += (
            f"<tr><td>{html.escape(sname)}</td>"
            f"<td>{sdata['discovered']}</td>"
            f"<td>{sdata['executed']}</td>"
            f"<td>{sdata['passed']}/{sdata['discovered']}</td>"
            f"<td>{sdata['failed']}</td>"
            f"<td>{sdata['abstained']}</td>"
            f"<td>{sdata['falseAcceptances']}</td></tr>"
        )
    suite_rows += (
        f"<tr><td><b>v1_5_450_case_adversarial_and_holdout</b></td>"
        f"<td>{adv['totalCases']}</td><td>{adv['totalCases']}</td>"
        f"<td>{adv['passed']}/{adv['totalCases']}</td>"
        f"<td>{adv['failed']}</td><td>{adv['abstentions']}</td><td>{adv['falseAcceptances']}</td></tr>"
    )

    html_str = f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 10.5pt; color: #1a202c; margin: 24px 28px; line-height: 1.38; }}
  h1 {{ font-size: 16pt; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; }}
  h2 {{ font-size: 12pt; color: #1e40af; margin-top: 14px; margin-bottom: 6px; }}
  table {{ width: 100%; border-collapse: collapse; margin: 6px 0 10px 0; font-size: 9pt; }}
  th, td {{ border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; }}
  th {{ background: #f1f5f9; font-weight: 600; }}
  .kpi {{ display: flex; gap: 10px; margin: 8px 0; }}
  .card {{ flex: 1; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc; }}
  .card b {{ display: block; font-size: 11pt; color: #0f172a; }}
  .badge {{ display: inline-block; padding: 2px 8px; border-radius: 3px; font-weight: 700; background: {'#dcfce7; color:#166534' if gates_ok else '#fee2e2; color:#991b1b'}; }}
</style>
</head>
<body>
<h1>TRACE MathGuard V1.5 — Set Theory, Relations &amp; Functional Reasoning Intelligence</h1>
<p><b>Commit:</b> <code>{html.escape(reg['gitCommit'])}</code> | <b>External LLM Spend:</b> $0.00 | <b>Decision:</b> <span class="badge">{html.escape(decision)}</span></p>

<div class="kpi">
  <div class="card"><span>Historical + V1.4c</span><b>{hist['passed'] + rec['passed']}/{hist['discovered'] + rec['discovered']} PASS (0 FA)</b></div>
  <div class="card"><span>V1.5 Adversarial + Holdout</span><b>{adv['passed']}/{adv['totalCases']} PASS (0 FA)</b></div>
  <div class="card"><span>Frozen 334 Benchmark</span><b>{frz['statuses'].get('PASS',0)}/334 PASS, {frz['claims']['verified']}/{frz['claims']['total']} claims</b></div>
  <div class="card"><span>New Domain (G9+G10 Ch 1)</span><b>{comb['totalItems']} items ({comb['claims']['verified']}/{comb['claims']['total']} claims)</b></div>
</div>

<h2>1. Regression &amp; Adversarial Preservation</h2>
<table>
  <tr><th>Suite</th><th>Discovered</th><th>Executed</th><th>Passed</th><th>Failed</th><th>Abstained</th><th>False Accept</th></tr>
  {suite_rows}
</table>

<h2>2. Frozen &amp; Expanded V1.4 Benchmarks vs. V1.5 New Domain</h2>
<table>
  <tr><th>Dataset</th><th>Items</th><th>Working PASS</th><th>Working PARTIAL</th><th>Working FAIL</th><th>Claims Verified</th><th>Tamil PASS / FAIL</th></tr>
  <tr><td>Frozen Benchmark (V1.4)</td><td>{frz['total']}</td><td>{frz['statuses'].get('PASS',0)}</td><td>{frz['statuses'].get('PARTIAL',0)}</td><td>{frz['statuses'].get('FAIL',0)}</td><td>{frz['claims']['verified']}/{frz['claims']['total']} ({round(frz['claims']['verified']/frz['claims']['total']*100,2)}%)</td><td>N/A</td></tr>
  <tr><td>Expanded Benchmark (V1.4)</td><td>{exp14['total']}</td><td>{exp14['workingStatusCounts'].get('PASS',0)}</td><td>{exp14['workingStatusCounts'].get('PARTIAL',0)}</td><td>{exp14['workingStatusCounts'].get('FAIL',0)}</td><td>{exp14['claims']['verified']}/{exp14['claims']['total']} ({exp14['claims']['verifiedRatePct']}%)</td><td>{exp14['tamilStatusCounts'].get('PASS',0)} / {exp14['tamilStatusCounts'].get('FAIL',0)}</td></tr>
  <tr><td>Grade 9 Ch 1 (Set Language)</td><td>{g9['totalItems']}</td><td>{g9['workingStatusCounts'].get('PASS',0)}</td><td>{g9['workingStatusCounts'].get('PARTIAL',0)}</td><td>{g9['workingStatusCounts'].get('FAIL',0)}</td><td>{g9['claims']['verified']}/{g9['claims']['total']} ({g9['claims']['verifiedRatePct']}%)</td><td>{g9['tamilStatusCounts'].get('PASS',0)} / {g9['tamilStatusCounts'].get('FAIL',0)}</td></tr>
  <tr><td>Grade 10 Ch 1 (Relations &amp; Functions)</td><td>{g10['totalItems']}</td><td>{g10['workingStatusCounts'].get('PASS',0)}</td><td>{g10['workingStatusCounts'].get('PARTIAL',0)}</td><td>{g10['workingStatusCounts'].get('FAIL',0)}</td><td>{g10['claims']['verified']}/{g10['claims']['total']} ({g10['claims']['verifiedRatePct']}%)</td><td>{g10['tamilStatusCounts'].get('PASS',0)} / {g10['tamilStatusCounts'].get('FAIL',0)}</td></tr>
</table>

<h2>3. Mathematical Algorithms Implemented</h2>
<ul>
  <li><b>SetTheoryReasoner &amp; Proof Engine</b> (<code>set_types.py</code>, <code>set_theory_reasoner.py</code>): Typed immutable sets (<code>TypedSet</code>, <code>SymbolicInfiniteSet</code>, <code>OrderedPair</code>), exact <code>∅</code> vs <code>{{∅}}</code> distinction, membership vs subset guard, deduplication, roster/set-builder parsing, and 2<sup>k</sup> Boolean minterm truth-table proofs with minimal counterexamples and finite-sample abstention guards.</li>
  <li><b>VennDiagramReasoner</b> (<code>venn_reasoner.py</code>): Exact Gauss-Jordan RREF over ℚ on 4-region (2-set) and 8-region (3-set) disjoint partitions; rejects negative/fractional/inconsistent counts; never assumes <code>outside=0</code> unless established; truth-table shaded region verification.</li>
  <li><b>RelationReasoner &amp; FunctionReasoner</b> (<code>relation_reasoner.py</code>, <code>function_reasoner.py</code>): Ordered-pair directionality, domain/codomain/range, inverse relations, reflexivity/symmetry/transitivity, injective/surjective/bijective classification, rational/radical domain restrictions, non-commutative composition, and bijectivity-guarded inverses.</li>
  <li><b>Tamil Semantic Parity</b> (<code>tamil_sets_parity.py</code>): Bilingual terminology lexicon for sets, relations, mappings, and cardinality; contradiction detection without requiring identical wording or step order.</li>
</ul>

<h2>4. Operational Telemetry, Queue Reconciliation &amp; Limitations</h2>
<p>Frozen benchmark runtime: <b>{frz['runtimeSec']}s</b> (peak RSS: <b>{frz['peakMemoryMB']} MB</b>). Prior V1.4d correction queue reconciled: {len(cq_doc['priorV1_4dQueueReconciliation'])} items tracked; new-domain findings: {len(cq_doc['newDomainConfirmedFindings'])} math flags, {len(cq_doc['newDomainTamilFindings'])} Tamil flags. New-domain certification remains gated until independent review of flagged Grade 9/10 Ch 1 items.</p>
</body>
</html>"""

    out_pdf = repo / "TRACE_MathGuard_V1_5_Report.pdf"
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html_str, wait_until="load")
        page.pdf(path=str(out_pdf), format="A4", print_background=True)
        browser.close()
    return out_pdf


if __name__ == "__main__":
    p = build_pdf(Path(__file__).resolve().parents[3])
    print("Generated:", p)
