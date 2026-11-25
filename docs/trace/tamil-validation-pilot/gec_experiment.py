"""Read-only Tamil GEC experiment. Inference sees only blind input, not labels."""
import argparse
import importlib.metadata
import json
import re
import time
import unicodedata
from pathlib import Path

MODEL = "manavdhamecha77/GEC-mT5-Small-Tamil"
LIMIT = 128

def norm(s):
    return " ".join(unicodedata.normalize("NFC", s).split())

def body(s):
    return re.sub(r"^\d+\.\s*", "", norm(s))

def load(p):
    return json.loads(p.read_text(encoding="utf-8"))

def save(p, x):
    p.write_text(json.dumps(x, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def numbers(s):
    return re.findall(r"\d+(?:[.,]\d+)?", s)

def infer(folder):
    import torch
    from huggingface_hub import HfApi, snapshot_download
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

    start = time.monotonic()
    torch.set_num_threads(4)
    torch.manual_seed(0)
    info = HfApi().model_info(MODEL, token=False)
    revision = info.sha
    if not re.fullmatch(r"[a-f0-9]{40}", revision or "") or info.gated:
        raise RuntimeError("Cannot resolve public immutable model revision")
    print("Resolved model revision:", revision, flush=True)
    weights = snapshot_download(
        MODEL, revision=revision, token=False,
        allow_patterns=["config.json", "generation_config.json", "model*.safetensors",
                        "model.safetensors.index.json", "tokenizer.json", "tokenizer_config.json",
                        "special_tokens_map.json", "added_tokens.json", "spiece.model"],
    )
    tok = AutoTokenizer.from_pretrained(weights, local_files_only=True, trust_remote_code=False)
    model = AutoModelForSeq2SeqLM.from_pretrained(
        weights, local_files_only=True, trust_remote_code=False, use_safetensors=True
    ).to("cpu").eval()
    inputs = load(folder / "blind-input.json")
    assert len(inputs) == len({x["caseId"] for x in inputs}) == 60
    # Preserve whole question context. No input truncation, no hidden answer key.
    rows, pending = [], []
    for item in inputs:
        original = body(item["ta"])
        prompt = "correct this: " + original
        count = len(tok(prompt, truncation=False)["input_ids"])
        row = {"caseId": item["caseId"], "inputTokens": count, "original": original}
        if count > LIMIT:
            rows.append(dict(row, status="input_over_limit", suggestion=None))
        else:
            pending.append((row, prompt))
    for i in range(0, len(pending), 4):
        batch = pending[i:i+4]
        encoded = tok([p for _, p in batch], return_tensors="pt", padding=True, truncation=False)
        assert encoded.input_ids.shape[1] <= LIMIT
        t0 = time.monotonic()
        with torch.inference_mode():
            output = model.generate(**encoded, max_length=LIMIT, num_beams=4, do_sample=False)
        decoded = tok.batch_decode(output, skip_special_tokens=True)
        for (row, _), ids, suggestion in zip(batch, output.tolist(), decoded):
            complete = tok.eos_token_id in ids
            status = "ok" if complete and norm(suggestion) else "incomplete_output"
            rows.append(dict(row, status=status, suggestion=norm(suggestion)))
        print(f"Generated {min(i+4,len(pending))}/{len(pending)} eligible cases in batch {time.monotonic()-t0:.1f}s", flush=True)
    assert len(rows) == len({x["caseId"] for x in rows}) == 60
    save(folder / "gec-suggestions.json", sorted(rows, key=lambda x: x["caseId"]))
    save(folder / "gec-model-provenance.json", {
        "model": MODEL, "revision": revision, "device": "cpu", "maxLength": LIMIT,
        "beams": 4, "prefix": "correct this: ", "paidInference": False,
        "dependencies": {p: importlib.metadata.version(p) for p in
                         ["torch", "transformers", "sentencepiece", "safetensors", "huggingface-hub"]},
        "elapsedSeconds": round(time.monotonic()-start, 2),
    })

def metrics(rows, field):
    tp = sum(r["isError"] and r[field] for r in rows)
    fp = sum(not r["isError"] and r[field] for r in rows)
    fn = sum(r["isError"] and not r[field] for r in rows)
    tn = sum(not r["isError"] and not r[field] for r in rows)
    return dict(tp=tp, fp=fp, fn=fn, tn=tn,
                precision=tp/(tp+fp) if tp+fp else None,
                recall=tp/(tp+fn) if tp+fn else None)

def score(folder):
    # Only this separate scoring process reads the labels.
    blind = {r["caseId"]: r for r in load(folder / "blind-input.json")}
    key = {r["caseId"]: r for r in load(folder / "answer-key.json")}
    outputs = {r["caseId"]: r for r in load(folder / "gec-suggestions.json")}
    assert set(blind) == set(key) == set(outputs) and len(key) == 60
    refs = {k["recordId"]: body(blind[i]["ta"]) for i,k in key.items() if k["label"] == "clean"}
    assert len(refs) == 10
    rows = []
    for i,k in key.items():
        original = body(blind[i]["ta"])
        out = outputs[i]
        assert out["original"] == original
        assessed = out["status"] == "ok"
        suggestion = norm(out["suggestion"] or "")
        model_flag = assessed and suggestion != original
        baseline_flag = bool(k["baselineFlags"])
        reference = refs[k["recordId"]]
        rows.append({**k, "original": original, "suggestion": out["suggestion"],
                     "status": out["status"], "baselineFlag": baseline_flag,
                     "modelFlag": model_flag, "combinedFlag": baseline_flag or model_flag,
                     "exactReferenceRestored": assessed and suggestion == reference,
                     "changedNumerals": assessed and numbers(suggestion) != numbers(original),
                     "requiresManualReview": not assessed or model_flag})
    report = {"scope": "60 synthetic development cases; not teacher-validated",
              "provenance": load(folder / "gec-model-provenance.json"),
              "total": len(rows), "assessed": sum(r["status"]=="ok" for r in rows),
              "baseline": metrics(rows,"baselineFlag"), "modelChangeHeuristic": metrics(rows,"modelFlag"),
              "combined": metrics(rows,"combinedFlag"), "perCategory": {},
              "limitations": ["Any normalized edit is only a review suggestion, not proof of an error.",
                              "Unassessed cases contribute no model detections and remain unresolved.",
                              "Exact restoration is not the only valid correction.",
                              "All benchmark labels and suggestions require independent editorial review.",
                              "No automatic content edits or publication."]}
    for label in sorted({r["label"] for r in rows}):
        x = [r for r in rows if r["label"]==label]
        report["perCategory"][label] = {
            "total": len(x), "assessed": sum(r["status"]=="ok" for r in x),
            "baselineFlags": sum(r["baselineFlag"] for r in x),
            "modelFlags": sum(r["modelFlag"] for r in x),
            "combinedFlags": sum(r["combinedFlag"] for r in x),
            "exactReferenceRestored": sum(r["exactReferenceRestored"] for r in x),
            "changedNumerals": sum(r["changedNumerals"] for r in x),
        }
    save(folder / "gec-scored-cases.json", rows)
    save(folder / "gec-report.json", report)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    print("PASS experiment execution (not model quality certification).")

def self_test():
    assert body(" 1.  ஆரம்   5 செ.மீ ") == "ஆரம் 5 செ.மீ"
    assert numbers("ஆரம் 1.75, உயரம் 12") == ["1.75", "12"]
    r = metrics([{"isError": True, "flag": True}, {"isError": False, "flag": True},
                 {"isError": True, "flag": False}, {"isError": False, "flag": False}], "flag")
    assert r == dict(tp=1,fp=1,fn=1,tn=1,precision=.5,recall=.5)
    print("PASS normalization and confusion matrix self-test")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("mode", choices=["infer", "score", "self-test"])
    p.add_argument("--folder", default="build/tamil-validation-pilot", type=Path)
    a = p.parse_args()
    if a.mode == "self-test":
        self_test()
    else:
        (infer if a.mode=="infer" else score)(a.folder)
