"""Textbook answer-key and fidelity metadata reconciliation."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional


@dataclass
class TextbookReconciliation:
    has_fidelity_record: bool
    source_reference: str
    fidelity_status: str
    textbook_answer_key: Optional[str]
    notes: str = ""


def build_fidelity_index(fidelity_data: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    """Index fidelity/passport records by exercise item ID."""
    index: Dict[str, Dict[str, Any]] = {}

    for key in ("7.1_q1_q5", "7.1_q6_q10"):
        doc = fidelity_data.get(key)
        if not doc:
            continue
        for rec in doc.get("records", []):
            rid = rec.get("id")
            if rid:
                index[rid] = {
                    "source": key,
                    "status": "passport-verified",
                    "answerKey": (rec.get("mathVerification") or {}).get("visualAnswerKeyPage"),
                    "englishQuestion": rec.get("englishQuestion"),
                }

    for key in ("7.4_fid", "7.5_fid", "7.unit_fid"):
        doc = fidelity_data.get(key)
        if not doc:
            continue
        for rec in doc.get("questions", []) + doc.get("items", []):
            rid = rec.get("id")
            if rid:
                index[rid] = {
                    "source": key,
                    "status": rec.get("status") or doc.get("status") or "fidelity-checked",
                    "answerKey": rec.get("answerKey") or rec.get("expectedAnswer"),
                    "enPrompt": (rec.get("en") or rec.get("textbookPrompt", {}).get("en")),
                    "taPrompt": (rec.get("ta") or rec.get("textbookPrompt", {}).get("ta")),
                }
    return index


def reconcile_item(item: Dict[str, Any], fidelity_index: Dict[str, Dict[str, Any]]) -> TextbookReconciliation:
    item_id = item.get("id", "")
    fid = fidelity_index.get(item_id)
    src_ref = item.get("reference") or item.get("source") or "site/data/textbook-exercises"
    sf = item.get("sourceFidelity") or {}
    sf_status = sf.get("status") or (fid.get("status") if fid else "unindexed")
    ans_key = fid.get("answerKey") if fid else None
    return TextbookReconciliation(
        has_fidelity_record=fid is not None or bool(sf),
        source_reference=str(src_ref),
        fidelity_status=str(sf_status),
        textbook_answer_key=str(ans_key) if ans_key is not None else None,
    )
