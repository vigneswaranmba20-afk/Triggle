"""TRACE MathGuard V1.4a: re-evaluation, 72-item disposition, regression matrix.

Dispositions are assigned from re-verification evidence only. No item is called a
confirmed mathematical error without independent confirmation (none is auto-confirmed).
"""
from __future__ import annotations

import json
import resource
import time
from pathlib import Path
from collections import Counter
from typing import Any, Dict, List

from . import v1_4_runner as r14


def _flag_kind(flags: List[str]) -> str:
    f = " ".join(flags)
    if "missing_tamil_script" in f:
        return "tamil_placeholder_or_untranslated"
    if "number_mismatch" in f:
        return "tamil_number_token_difference"
    if "unit_mismatch" in f:
        return "tamil_unit_difference"
    return "other"


def disposition(old: Dict[str, Any], new_rec: Dict[str, Any] | None) -> Dict[str, Any]:
    ev = old["independentDeterministicEvidence"]
    old_fail = ev["workingStatus"] == "FAIL"
    old_ta = ev["tamilStatus"]
    out = {"questionId": old["questionId"], "grade": old["grade"], "chapter": old["chapter"],
           "exercise": old.get("exercise"), "v1_4": {"working": ev["workingStatus"], "tamil": old_ta,
           "evidence": sorted({d["evidence"] for d in ev.get("failedDetails", [])}), "tamilFlags": ev.get("tamilFlags", [])}}
    if new_rec is None:
        out.update(classification="unresolved_finding", reason="item not re-evaluated")
        return out
    nw, nt = new_rec.get("working_status"), new_rec.get("tamil_status")
    out["v1_4a"] = {"working": nw, "tamil": nt}
    if old_fail and nw != "FAIL":
        out.update(classification="engine_false_positive",
                   reason="Working no longer fails after reusable parser fixes (custom [[a|b]] fractions / unit-conversion facts); not a student-content error.")
    elif old_fail:
        out.update(classification="unresolved_finding",
                   reason="Still flagged. Not auto-confirmed: remaining patterns (function evaluation p(x) without binding, "
                          "multi-variable chains, aligned chains, given overwrite) are known false-positive risks; needs manual/textbook review.")
    elif old_ta == "FAIL":
        kind = _flag_kind(ev.get("tamilFlags", []))
        if kind == "tamil_placeholder_or_untranslated":
            out.update(classification="explanation_deficiency",
                       reason="Tamil step text is an English placeholder ('Tamil unchanged'); maths is not mistranslated, Tamil prose is missing. Do not auto-fill without Tamil review.")
        else:
            out.update(classification="unresolved_finding",
                       reason="Number tokens differ between EN/TA step; may be a different valid method, not confirmed mistranslation.")
    else:
        out.update(classification="unresolved_finding", reason="Partial/other flag only.")
    return out


def main(repo: Path) -> Dict[str, Any]:
    t0 = time.perf_counter()
    frozen = r14.evaluate_frozen_benchmark(repo)
    frozen_rt = time.perf_counter() - t0
    peak = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024
    exp = r14.evaluate_expanded_dataset(repo)
    q_old = json.load(open(repo / "TRACE_MathGuard_V1_4_Confirmed_Correction_Queue.json"))["corrections"]
    recs = {x.get("id"): x for x in exp.get("records", [])}
    disp = [disposition(o, recs.get(o["questionId"])) for o in q_old]
    summary = Counter(d["classification"] for d in disp)
    still_failing = [x for x in exp.get("records", []) if x.get("working_status") == "FAIL"]
    matrix = {
        "engine": "TRACE MathGuard V1.4a",
        "frozen": {k: v for k, v in frozen.items() if k != "details"},
        "frozenRuntimeSec": round(frozen_rt, 1), "peakMemMB_after_frozen": round(peak, 1),
        "expanded": {k: v for k, v in exp.items() if k not in ("records", "correctionQueue", "auditedChapters")},
        "workingFailsRemaining": len(still_failing),
    }
    out = repo
    json.dump({"schemaVersion": 1, "engine": "TRACE MathGuard V1.4a", "total": len(disp),
               "summary": dict(summary), "items": disp},
              open(out / "TRACE_MathGuard_V1_4a_False_Positive_Analysis.json", "w"), ensure_ascii=False, indent=1)
    json.dump({"schemaVersion": 1, "engine": "TRACE MathGuard V1.4a",
               "policy": "Only independently confirmed errors listed. None confirmed automatically in V1.4a.",
               "confirmedErrors": []}, open(out / "TRACE_MathGuard_V1_4a_Confirmed_Correction_Queue.json", "w"), indent=1)
    json.dump(matrix, open(out / "TRACE_MathGuard_V1_4a_Regression_Matrix.json", "w"), ensure_ascii=False, indent=1, default=str)
    ta_fail = [x for x in exp.get("records", []) if x.get("tamil_status") == "FAIL"]
    json.dump({"schemaVersion": 1, "tamilFailCount": len(ta_fail),
               "items": [{"id": x.get("id"), "flags": x.get("tamil_flags", []),
                          "kind": _flag_kind(x.get("tamil_flags", []))} for x in ta_fail],
               "kindCounts": dict(Counter(_flag_kind(x.get("tamil_flags", [])) for x in ta_fail))},
              open(out / "TRACE_MathGuard_V1_4a_Bilingual_Parity_Report.json", "w"), ensure_ascii=False, indent=1)
    return {"summary": dict(summary), **matrix}


if __name__ == "__main__":
    print(json.dumps(main(Path(".")), ensure_ascii=False, indent=1, default=str)[:3000])
