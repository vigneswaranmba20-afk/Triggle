"""Generate TRACE_MathGuard_V1_4a_Report.pdf (Tamil rendered via Chromium)."""
from __future__ import annotations
import html, json
from collections import Counter
from pathlib import Path
from playwright.sync_api import sync_playwright

e = lambda v: html.escape(str(v if v is not None else ""))


def generate(root: Path) -> Path:
    L = lambda n: json.loads((root / n).read_text(encoding="utf-8"))
    fp = L("TRACE_MathGuard_V1_4a_False_Positive_Analysis.json")
    reg = L("TRACE_MathGuard_V1_4a_Regression_Matrix.json")
    par = L("TRACE_MathGuard_V1_4a_Bilingual_Parity_Report.json")
    q = {c["questionId"]: c for c in L("TRACE_MathGuard_V1_4_Confirmed_Correction_Queue.json")["corrections"]}
    fz, ex = reg["frozen"], reg["expanded"]
    items = ""
    for d in fp["items"]:
        c = q.get(d["questionId"], {})
        steps = ""
        for s in c.get("originalWorking", []):
            steps += f"<li><b>EN:</b> {e(s.get('en'))}<br><b>TA:</b> {e(s.get('ta'))}<br><b>eq:</b> <code>{e(s.get('eq'))}</code></li>"
        bad = c.get("incorrectStep")
        items += f"""<div class=item><h4>{e(d['questionId'])} <small>G{d['grade']} Ch{d['chapter']} {e(d.get('exercise'))}</small></h4>
<p><span class=tag>{e(d['classification'])}</span> v1.4: working {e(d['v1_4']['working'])}, Tamil {e(d['v1_4']['tamil'])}
&rarr; v1.4a: {e(d.get('v1_4a',{}).get('working'))}/{e(d.get('v1_4a',{}).get('tamil'))}</p>
<p>{e(d['reason'])}</p><p><b>Engine evidence:</b> {e(', '.join(d['v1_4']['evidence']) or '-')} {e(' '.join(d['v1_4']['tamilFlags']))}</p>
<p><b>Flagged step:</b> <code>{e(json.dumps(bad, ensure_ascii=False)[:400])}</code></p><ol>{steps}</ol></div>"""
    cls = fp["summary"]
    html_doc = f"""<html><head><meta charset=utf-8><style>
body{{font-family:'Lohit Tamil','DejaVu Sans',sans-serif;font-size:10.5px;margin:18px}}
h1{{font-size:20px}}h4{{margin:2px 0}}.item{{border:1px solid #bbb;padding:6px;margin:6px 0;page-break-inside:avoid}}
.tag{{background:#eef;padding:1px 5px;border-radius:3px}}table{{border-collapse:collapse}}td,th{{border:1px solid #999;padding:3px 6px}}
code{{font-size:9.5px;word-break:break-all}}</style></head><body>
<h1>TRACE MathGuard V1.4a — Consolidated Report</h1>
<p>Branch trace/mathguard-v1-4a. Recommendation: <b>NO-GO for V1.5</b> (targets not met; 61 findings unresolved).</p>
<h2>Metrics</h2><table>
<tr><th>Frozen 334</th><td>{fz['statuses']} — PASS {fz['passRatePct']}% (target 85%), claims {fz['claims']['verifiedRatePct']}% (target 97%), answers {fz['answerPassRatePct']}%, 0 regressions, {reg['frozenRuntimeSec']} s, ~{fz['peakMemoryMB']} MB</td></tr>
<tr><th>Expanded 765</th><td>{ex.get('workingStatusCounts')}; claims {ex.get('claims')}; Tamil {ex.get('tamilStatusCounts')}</td></tr>
<tr><th>Tests</th><td>40/40 pytest passed (12 new V1.4a paired tests; 200-test goal not met)</td></tr></table>
<h2>Engine changes</h2><ul><li>[[a|b]] custom fraction notation parsed as (a)/(b).</li><li>Deterministic unit-conversion statement verifier (length/area/volume).</li></ul>
<h2>72-item disposition</h2><p>{e(dict(cls))}. No item is confirmed as a mathematical error; no curriculum content was changed.</p>
<h2>Tamil parity FAIL ({par['tamilFailCount']})</h2><p>{e(par['kindCounts'])}</p>
<h2>Not completed</h2><ul><li>Function-binding p(x), factor/remainder, aligned chains, GCD/LCM/Vieta bindings.</li><li>200 adversarial tests; V1.3.5 zero-executed investigation; new blind holdout; Gemini Neon review not performed; Tamil textbook checks.</li></ul>
<h2>Per-item workings</h2>{items}</body></html>"""
    tmp = root / "docs/trace/mathguard/_v1_4a_report.html"
    tmp.write_text(html_doc, encoding="utf-8")
    out = root / "TRACE_MathGuard_V1_4a_Report.pdf"
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(); pg.goto(tmp.as_uri()); pg.pdf(path=str(out), format="A4", print_background=True); b.close()
    tmp.unlink()
    return out


if __name__ == "__main__":
    print(generate(Path(".").resolve()))
