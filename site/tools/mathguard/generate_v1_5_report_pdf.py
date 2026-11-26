"""Generate concise, quantitative TRACE_MathGuard_V1_5_Report.pdf."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def _tbl(data: List[List[str]], col_widths: List[int]) -> Table:
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e293b")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ])
    )
    return t


def build_v1_5_pdf(
    out_path: Path,
    reg_doc: Dict[str, Any],
    frozen: Dict[str, Any],
    g9_ch1_doc: Dict[str, Any],
    g10_ch1_doc: Dict[str, Any],
    parity_doc: Dict[str, Any],
    corr_doc: Dict[str, Any],
    coverage_doc: Dict[str, Any],
) -> None:
    doc = SimpleDocTemplate(str(out_path), pagesize=A4, leftMargin=32, rightMargin=32, topMargin=32, bottomMargin=32)
    styles = getSampleStyleSheet()
    story: List[Any] = []

    story.append(Paragraph("TRACE MathGuard V1.5 — Set Theory, Relations & Functional Reasoning", styles["Title"]))
    story.append(Paragraph(
        f"Commit: {coverage_doc.get('gitCommit')} | External LLM Cost: $0.00 | Recommendation: {coverage_doc.get('v1_6Recommendation')}",
        styles["Normal"],
    ))
    story.append(Spacer(1, 8))

    # 1. Regression & Frozen Benchmark Preservation
    story.append(Paragraph("1. Regression Preservation & Frozen Benchmark (334 items)", styles["Heading2"]))
    hs = reg_doc["historicalSummary"]
    rs = reg_doc["recentSummary"]
    v15s = reg_doc["v1_5Adversarial"]
    f_st = frozen["statuses"]
    f_cl = frozen["claims"]
    reg_rows = [
        ["Suite", "Discovered", "Executed", "Passed", "Failed", "False Accept"],
        ["Historical (V1.0–V1.3.1)", str(hs["discovered"]), str(hs["executed"]), str(hs["passed"]), str(hs["failed"]), str(hs["falseAcceptances"])],
        ["Recent Adversarial (V1.3.4a–V1.4b)", str(rs["discovered"]), str(rs["executed"]), str(rs["passed"]), str(rs["failed"]), str(rs["falseAcceptances"])],
        ["V1.5 Adversarial + Holdout (New)", str(v15s["totalCases"]), str(v15s["totalCases"]), str(v15s["passed"]), str(v15s["failed"]), str(v15s["falseAcceptances"])],
        ["Frozen 334 Working", "334", "334", f"{f_st.get('PASS', 0)} ({frozen['passRatePct']}%)", str(f_st.get("FAIL", 0)), "0"],
        ["Frozen 334 Claims", str(f_cl["total"]), str(f_cl["total"]), f"{f_cl['verified']} ({f_cl['verifiedRatePct']}%)", str(f_cl["failed"]), "0"],
    ]
    story.append(_tbl(reg_rows, [160, 65, 65, 95, 55, 65]))
    story.append(Spacer(1, 8))

    # 2. New Domain Coverage (G9 Ch 1 & G10 Ch 1)
    story.append(Paragraph("2. New Domain Expansion: Set Language (G9 Ch 1) & Relations/Functions (G10 Ch 1)", styles["Heading2"]))
    s9 = g9_ch1_doc["summary"]
    s10 = g10_ch1_doc["summary"]
    dom_rows = [
        ["Chapter", "Exercises", "Concepts", "Working PASS", "Answer PASS", "Working FAIL", "Tamil PASS/FAIL"],
        [
            "G9 Ch 1: Set Language",
            str(s9["exercises"]),
            str(s9["concepts"]),
            f"{s9['workingCounts'].get('PASS', 0)}/{s9['totalItems']}",
            f"{s9['answerCounts'].get('PASS', 0)}/{s9['totalItems']}",
            str(s9["workingCounts"].get("FAIL", 0)),
            f"{s9['tamilCounts'].get('PASS', 0)}/{s9['tamilCounts'].get('FAIL', 0)}",
        ],
        [
            "G10 Ch 1: Relations & Functions",
            str(s10["exercises"]),
            str(s10["concepts"]),
            f"{s10['workingCounts'].get('PASS', 0)}/{s10['totalItems']}",
            f"{s10['answerCounts'].get('PASS', 0)}/{s10['totalItems']}",
            str(s10["workingCounts"].get("FAIL", 0)),
            f"{s10['tamilCounts'].get('PASS', 0)}/{s10['tamilCounts'].get('FAIL', 0)}",
        ],
    ]
    story.append(_tbl(dom_rows, [145, 55, 55, 70, 70, 55, 65]))
    story.append(Spacer(1, 8))

    # 3. Algorithms & Bilingual / Correction Summary
    story.append(Paragraph("3. Mathematical Engines, Bilingual Parity & Correction Queue", styles["Heading2"]))
    p_sum = parity_doc["summary"]
    c_sum = corr_doc["summary"]
    story.append(Paragraph(
        f"Implemented Engines: SetTheoryReasoner (2^k Stone minterm proof + counterexample), "
        f"VennDiagramReasoner (2/3-set exact Fraction RREF + shaded-region truth tables), "
        f"RelationReasoner (directed ordered pairs, R ⊆ A×B, reflexive/symmetric/transitive), "
        f"ExtendedFunctionRegistry (FiniteFunction & SymbolicFunction, domain-guarded composition, bijective inverse).<br/>"
        f"New Domain Bilingual Parity: PASS={p_sum.get('PASS', 0)}, FAIL={p_sum.get('FAIL', 0)}, UNVERIFIABLE={p_sum.get('UNVERIFIABLE', 0)}.<br/>"
        f"Correction Queue: {c_sum['reconciledV14cCount']} reconciled V1.4c/d items + {c_sum['newDomainFindingsCount']} new Ch 1 findings (isolated, non-destructive).",
        styles["Normal"],
    ))

    doc.build(story)
