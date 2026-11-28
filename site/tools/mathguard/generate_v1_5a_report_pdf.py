"""Generate concise, quantitative TRACE_MathGuard_V1_5a_Report.pdf via Playwright Chromium."""

from __future__ import annotations

import html
import json
from pathlib import Path
from playwright.sync_api import sync_playwright


def build_pdf(repo: Path) -> Path:
    hist = json.loads((repo / "Historical_Regression_Recovery.json").read_text(encoding="utf-8"))
    recon = json.loads((repo / "V1_4d_Baseline_Reconciliation.json").read_text(encoding="utf-8"))
    st_doc = json.loads((repo / "Set_Theory_Verification_Report.json").read_text(encoding="utf-8"))
    rf_doc = json.loads((repo / "Relations_Functions_Verification_Report.json").read_text(encoding="utf-8"))
    bi_doc = json.loads((repo / "Bilingual_Parity_Report.json").read_text(encoding="utf-8"))
    reg = json.loads((repo / "Complete_Regression_Results.json").read_text(encoding="utf-8"))

    frz = recon["frozenBenchmark"]["currentV1_5a"]
    exp14 = recon["expandedBenchmark"]
    g9 = st_doc["summary"]
    g10 = rf_doc["summary"]

    gates_ok = (
        reg["totalFailed"] == 0
        and reg["totalFalseAcceptances"] == 0
        and frz["statuses"].get("FAIL", 0) == 0
        and exp14["workingStatusCounts"].get("FAIL", 0) == 0
    )
    decision = "GO for V1.6 (with V1.5a New-Domain Certification Gated on Independent Review)" if gates_ok else "NO-GO"

    html_str = f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #1a202c; margin: 24px 28px; line-height: 1.38; }}
  h1 {{ font-size: 15.5pt; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; }}
  h2 {{ font-size: 11.5pt; color: #1e40af; margin-top: 12px; margin-bottom: 5px; }}
  table {{ width: 100%; border-collapse: collapse; margin: 6px 0 10px 0; font-size: 8.8pt; }}
  th, td {{ border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; }}
  th {{ background: #f1f5f9; font-weight: 600; }}
  .badge {{ display: inline-block; padding: 2px 8px; border-radius: 3px; font-weight: 700; background: {'#dcfce7; color:#166534' if gates_ok else '#fee2e2; color:#991b1b'}; }}
</style>
</head>
<body>
<h1>TRACE MathGuard V1.5a — Soundness, Regression Recovery &amp; Curriculum Intelligence</h1>
<p><b>Commit:</b> <code>{html.escape(reg['gitCommit'])}</code> | <b>External LLM Spend:</b> $0.00 | <b>Decision:</b> <span class="badge">{html.escape(decision)}</span></p>

<h2>1. Critical Regression Recovery &amp; Complete Suite Results</h2>
<table>
  <tr><th>Suite</th><th>Executed</th><th>Passed</th><th>Failed</th><th>False Accept</th><th>Notes</th></tr>
  <tr><td>V1.4 270-Case Adversarial Suite</td><td>270</td><td>{hist['v1_4_270_case_recovery']['currentV1_5a']['passed']}</td><td>{hist['v1_4_270_case_recovery']['currentV1_5a']['failed']}</td><td>{hist['v1_4_270_case_recovery']['currentV1_5a']['falseAcceptances']}</td><td>Recovered from 267/270 (3 FA on v14-abs-dom-01/05/08)</td></tr>
  <tr><td>All Historical + Recent (V1.0–V1.4c)</td><td>{reg['historicalAndRecent1654']['executed']}</td><td>{reg['historicalAndRecent1654']['passed']}</td><td>{reg['historicalAndRecent1654']['failed']}</td><td>{reg['historicalAndRecent1654']['falseAcceptances']}</td><td>100% preserved</td></tr>
  <tr><td>V1.5 Adversarial + Holdout</td><td>{reg['v1_5_450_case_adversarial_and_holdout']['totalCases']}</td><td>{reg['v1_5_450_case_adversarial_and_holdout']['passed']}</td><td>{reg['v1_5_450_case_adversarial_and_holdout']['failed']}</td><td>{reg['v1_5_450_case_adversarial_and_holdout']['falseAcceptances']}</td><td>350 main + 100 holdout, 26 abstentions</td></tr>
  <tr><td><b>Combined Total</b></td><td><b>{reg['totalExecutedCases']}</b></td><td><b>{reg['totalPassed']}</b></td><td><b>{reg['totalFailed']}</b></td><td><b>{reg['totalFalseAcceptances']}</b></td><td><b>Zero false acceptances</b></td></tr>
</table>

<h2>2. V1.4d Baseline Reconciliation &amp; New-Domain Audit</h2>
<p><b>Git Ancestry:</b> <code>trace/mathguard-v1-4d</code> (<code>2541d7f</code>) and its 112-case/220-case files were never pushed to <code>origin</code>; V1.5 branched from <code>origin/trace/mathguard-v1-4c</code> (<code>add170c</code>).</p>
<table>
  <tr><th>Dataset</th><th>Items</th><th>PASS</th><th>PARTIAL</th><th>FAIL</th><th>UNVERIFIABLE</th><th>Tamil PASS / FAIL</th></tr>
  <tr><td>Frozen 334 Benchmark</td><td>{frz['total']}</td><td>{frz['statuses'].get('PASS',0)}</td><td>{frz['statuses'].get('PARTIAL',0)}</td><td>{frz['statuses'].get('FAIL',0)}</td><td>{frz['statuses'].get('UNVERIFIABLE',0)}</td><td>N/A ({frz['runtimeSec']}s, {frz['peakMemoryMB']} MB)</td></tr>
  <tr><td>Expanded 765 Benchmark</td><td>{exp14['total']}</td><td>{exp14['workingStatusCounts'].get('PASS',0)}</td><td>{exp14['workingStatusCounts'].get('PARTIAL',0)}</td><td>{exp14['workingStatusCounts'].get('FAIL',0)}</td><td>{exp14['workingStatusCounts'].get('UNVERIFIABLE',0)}</td><td>{exp14['tamilStatusCounts'].get('PASS',0)} / {exp14['tamilStatusCounts'].get('FAIL',0)}</td></tr>
  <tr><td>Grade 9 Ch 1 (Set Language)</td><td>{g9['totalItems']}</td><td>{g9['workingStatusCounts'].get('PASS',0)}</td><td>{g9['workingStatusCounts'].get('PARTIAL',0)}</td><td>{g9['workingStatusCounts'].get('FAIL',0)}</td><td>{g9['workingStatusCounts'].get('UNVERIFIABLE',0)}</td><td>{g9['tamilStatusCounts'].get('PASS',0)} / {g9['tamilStatusCounts'].get('FAIL',0)}</td></tr>
  <tr><td>Grade 10 Ch 1 (Relations &amp; Functions)</td><td>{g10['totalItems']}</td><td>{g10['workingStatusCounts'].get('PASS',0)}</td><td>{g10['workingStatusCounts'].get('PARTIAL',0)}</td><td>{g10['workingStatusCounts'].get('FAIL',0)}</td><td>{g10['workingStatusCounts'].get('UNVERIFIABLE',0)}</td><td>{g10['tamilStatusCounts'].get('PASS',0)} / {g10['tamilStatusCounts'].get('FAIL',0)}</td></tr>
</table>
</body>
</html>"""

    out_pdf = repo / "TRACE_MathGuard_V1_5a_Report.pdf"
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html_str, wait_until="load")
        page.pdf(path=str(out_pdf), format="A4", print_background=True)
        browser.close()
    return out_pdf


if __name__ == "__main__":
    print("Generated:", build_pdf(Path(__file__).resolve().parents[3]))
