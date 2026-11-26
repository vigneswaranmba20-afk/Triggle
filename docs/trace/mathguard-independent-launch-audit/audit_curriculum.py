"""Independent arithmetic and question-derived answer audit of the public catalogue."""
import argparse
import ast
import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from functools import lru_cache
from pathlib import Path

import sympy as sp

ROOT = Path(__file__).resolve().parent
LEDGER = ROOT.parent / "final-frontier/TRACE_FINAL_FRONTIER_INVENTORY.json"
NUMBER = r"[+-]?(?:\d+\.\d+|\d+)(?:\s*/\s*\d+)?"
UNIT = r"(?:sq\.?\s*units|square units|cm²|m²|mm²|cm³|m³|mm³|cm|mm|km|m|°)"
MINUS = str.maketrans({"−": "-", "–": "-", "×": "*", "·": "*", "÷": "/", "π": "pi"})
SUPERSCRIPTS = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")


def language(value, lang):
    return str(value.get(lang) or "") if isinstance(value, dict) else (str(value or "") if lang == "en" else "")


def exact(node, source):
    if isinstance(node, ast.Constant) and type(node.value) in {int, float}:
        return sp.Rational(ast.get_source_segment(source, node))
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
        value = exact(node.operand, source)
        return -value if isinstance(node.op, ast.USub) else value
    if isinstance(node, ast.Name):
        if node.id == "pi":
            return sp.pi
        if len(node.id) == 1 and node.id.isascii():
            return sp.Symbol(node.id, real=True)
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and not node.keywords and len(node.args) == 1:
        if node.func.id == "sqrt":
            value = exact(node.args[0], source)
            if value.is_nonnegative:
                return sp.sqrt(value)
    if isinstance(node, ast.BinOp):
        left, right = exact(node.left, source), exact(node.right, source)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div) and right.is_nonzero and not right.free_symbols:
            return left / right
        if isinstance(node.op, ast.Pow) and right.is_integer and abs(right) <= 10:
            if right >= 0 or (left.is_nonzero and not left.free_symbols):
                return left ** right
    raise ValueError("outside exact arithmetic and polynomial grammar")


@lru_cache(maxsize=16384)
def expression(value):
    text = value.translate(MINUS).strip()
    if not text or len(text) > 160 or not re.fullmatch(r"[0-9A-Za-z√⁰¹²³⁴⁵⁶⁷⁸⁹⁻+*/^().\[\]|\s-]+", text):
        return None
    text = re.sub(r"\[\[([^\[\]|]+)\|([^\[\]|]+)\]\]", r"((\1)/(\2))", text)
    text = re.sub(r"[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+", lambda m: "**(" + m[0].translate(SUPERSCRIPTS) + ")", text)
    text = re.sub(r"√\s*(\d+(?:\.\d+)?)", r"sqrt(\1)", text).replace("√", "sqrt").replace("^", "**")
    if re.search(r"\d+\.\d+\(\d+\)", text):
        return None  # Recurring decimal, rather than implicit multiplication.
    text = re.sub(r"(?<=[\d)])(?=(?:[a-zA-Z]|\())", "*", text)
    try:
        return exact(ast.parse(text, mode="eval").body, text)
    except (SyntaxError, ValueError, TypeError, ZeroDivisionError, RecursionError):
        return None


def equal(left, right):
    return left == right or sp.expand(left - right) == 0 or sp.simplify(left - right) == 0


def split_work(text):
    # A comma is retained because it can be a decimal grouping, point or set separator.
    for clause in re.split(r"[;\n⇒]", text):
        if not any(symbol in clause for symbol in ("≈", "≠", "≤", "≥", "<", ">", "…", "...", ":")):
            yield [entry.strip() for entry in clause.split("=")]


def working_evidence(record):
    matched = set()
    candidates = set()
    for language_key in ("shared", "ta"):
        for step in record.get("steps") or []:
            if not isinstance(step, dict):
                continue
            raw = step.get("eq") if language_key == "shared" else step.get("mathTa")
            strings = [raw] if isinstance(raw, str) else (
                [entry.get("fallback", "") for entry in raw if isinstance(entry, dict)] if isinstance(raw, list) else
                [raw.get("fallback", "")] if isinstance(raw, dict) else []
            )
            for value in strings:
                for chain in split_work(value):
                    for a, b in zip(chain, chain[1:]):
                        left, right = expression(a), expression(b)
                        if left is None or right is None:
                            continue
                        if equal(left, right):
                            if a != b and not (left.is_Symbol and right.is_Symbol):
                                matched.add((a, b))
                        elif not (left.free_symbols or right.free_symbols):
                            candidates.add((a, b))
    return len(matched), sorted(candidates)


def numeric_list(text):
    parts = re.split(r"\s*[,;]\s*", text.strip().rstrip("."))
    values = [expression(part.strip()) for part in parts]
    return tuple(values) if values and all(value is not None and not value.free_symbols for value in values) else ()


def numeric_fields(text):
    """Parse only bare answers or numeric RHS clauses, keeping units for dimensional checks."""
    values = []
    for field in re.split(r"[;\n]", text.strip().rstrip(".")):
        field = field.rsplit("=", 1)[-1].split("≈", 1)[0].strip()
        field = re.sub(r"\s+(?:சதுர அலகுகள்|கன அலகுகள்|அலகுகள்|செ\.மீ|மீ)\.?$", "", field)
        unit = re.search(rf"\s*({UNIT})\.?$", field, re.I)
        if unit:
            field = field[:unit.start()].strip()
        value = expression(field)
        if value is None or value.free_symbols:
            return ()
        values.append(value)
    return tuple(values)


def expected_numeric(question):
    """Return a full-answer oracle only if the question matches a supported shape."""
    q = re.sub(r"^\s*\d+\.\s*", "", question.translate(MINUS)).strip().rstrip(".?")
    q = re.sub(r"\s+", " ", q)
    match = re.fullmatch(rf"(?:write|find)(?: any)? (three|five|3|5) rational numbers (?:strictly )?between ({NUMBER}) and ({NUMBER})", q, re.I)
    if match:
        count = 3 if match[1] in {"three", "3"} else 5
        bounds = sorted((expression(match[2]), expression(match[3])))
        return "rational_interval", (count, *bounds)
    match = re.fullmatch(r"(?:simplify|evaluate|calculate|find the value of)\s*:?\s*(?:\([ivx]+\)\s*)?(.+)", q, re.I)
    if match:
        value = expression(match[1])
        if value is not None and not value.free_symbols:
            return "exact_expression", (value,)
    match = re.search(r"angles of a (triangle|quadrilateral) are in the ratio (\d+(?:\s*:\s*\d+){2,3})[,. ]+find .*angle", q, re.I)
    if match:
        weights = [int(value) for value in re.split(r"\s*:\s*", match[2])]
        sides = 3 if match[1].lower() == "triangle" else 4
        if len(weights) == sides and all(weights):
            return "polygon_angle_sum", tuple(sp.Rational(w * 180 * (sides - 2), sum(weights)) for w in weights)
    match = re.search(rf"area of the triangle formed by the points\s*(?:\([ivx]+\)\s*)?"
                      rf"\(({NUMBER}),\s*({NUMBER})\),\s*\(({NUMBER}),\s*({NUMBER})\)(?:\s*(?:and|,)\s*)\(({NUMBER}),\s*({NUMBER})\)$", q, re.I)
    if match:
        x, y, u, v, a, b = map(expression, match.groups())
        return "coordinate_determinant", (abs((u-x)*(b-y)-(v-y)*(a-x))/2,)
    match = re.search(r"find the range and coefficient of range of the following data\s*\.?(?:\s*\([ivx]+\))?\s*(.+)$", q, re.I)
    if match:
        values = numeric_list(match[1])
        if len(values) >= 2 and max(values) + min(values):
            span = max(values) - min(values)
            return "range_and_coefficient", (span, span/(max(values) + min(values)))
    match = re.search(rf"range and the smallest value of a set of data are ({NUMBER}) and ({NUMBER}) respectively, then find the largest value$", q, re.I)
    if match:
        return "range_endpoint", (expression(match[1]) + expression(match[2]),)
    match = re.fullmatch(rf"the radius and height of a cylinder are in the ratio (\d+)\s*:\s*(\d+) and its curved surface area is ({NUMBER}) sq\.cm\. find its radius and height", q, re.I)
    if match:
        r, h, area = map(expression, match.groups())
        scale = sp.sqrt(area / (2 * sp.Rational(22, 7) * r * h))
        if scale.is_rational:
            return "cylinder_curved_area_pi_22_7", (r*scale, h*scale)
    match = re.fullmatch(rf".*find (?:the )?probability of getting (?:a|an) (even|odd|prime) number"
                         r"(?: when a (?:fair )?die is (?:rolled|thrown)(?: once)?)?", q, re.I)
    if match and re.search(r"\b(?:die)\b", q, re.I) and not re.search(r"\b(?:two|three|twice|dice)\b", q, re.I):
        faces = {"even": {2, 4, 6}, "odd": {1, 3, 5}, "prime": {2, 3, 5}}
        return "enumerated_die", (sp.Rational(len(faces[match[1].lower()]), 6),)
    return "", ()


def fallback(value):
    if isinstance(value, list):
        return "".join(fallback(part) for part in value)
    if isinstance(value, dict):
        return value.get("fallback") or ""
    return value if isinstance(value, str) else ""


def answer_text(record, lang):
    presentation = record.get("independentAuditPresentation") or {}
    structured = record.get("answerMath") or presentation.get("answerMath")
    if isinstance(structured, dict) and ("en" in structured or "ta" in structured):
        structured = structured.get(lang) or structured.get("en")
    plain = record.get("answer")
    return (fallback(structured) or (record.get("answerTa") if lang == "ta" else "") or
            language(plain, lang) or (plain if isinstance(plain, str) else ""))


def numeric_answer(record, lang, method, expected):
    answer = answer_text(record, lang)
    if method == "rational_interval":
        actual = numeric_list(answer.translate(MINUS))
        count, lo, hi = expected
        return bool(actual) and len(actual) == count and len(set(actual)) == count and all(lo < value < hi for value in actual)
    if method == "polygon_angle_sum":
        actual = numeric_list(re.sub(r"(?<=\d)\s*°", "", answer).translate(MINUS))
        return bool(actual) and actual == expected and answer.count("°") == len(actual)
    if method == "cylinder_curved_area_pi_22_7":
        answer = answer.replace(",", ";")
    actual = numeric_fields(answer)
    if method == "coordinate_determinant" and lang == "en" and not re.search(r"sq\.?\s*units|square units", answer, re.I):
        return False
    if method == "cylinder_curved_area_pi_22_7" and lang == "en" and answer.count("cm") != 2:
        return False
    return bool(actual) and len(actual) == len(expected) and all(equal(a, b) for a, b in zip(actual, expected))


def audit(runtime, output, manual_path):
    ledger = json.loads(LEDGER.read_text())
    records = {item["id"]: item for chapter in runtime["chapters"] for item in chapter["items"]}
    visible = {(chapter["grade"], chapter["chapter"], item["exercise"], item["id"])
               for chapter in runtime["chapters"] for item in chapter["items"]}
    registered = {card for exercise in ledger["exercises"] for card in exercise["runtimeRecordIds"]["current"]}
    ledger_cards = {(exercise["grade"], exercise["chapter"], exercise["exercise"], record["id"])
                    for exercise in ledger["exercises"] for question in exercise["questions"]
                    for task in question["tasks"] for record in task["state"]["current"]["records"]
                    if record.get("catalogueVisible")}
    assert {item[-1] for item in ledger_cards} <= records.keys()
    manual = json.loads(manual_path.read_text()) if manual_path.exists() else {}
    rows, suspects, mapped, seen = [], {}, set(), set()
    inspected = {}
    for record_id, record in records.items():
        checked, candidates = working_evidence(record)
        method, expected = expected_numeric(language(record.get("q"), "en"))
        en = numeric_answer(record, "en", method, expected) if method else False
        ta = numeric_answer(record, "ta", method, expected) if method else False
        inspected[record_id] = (checked, method, en, ta)
        if candidates or (method and not (en and ta)):
            suspects[record_id] = {
                "exactWorkingConflictsToReview": candidates,
                "questionDerivedMethod": method, "expected": [str(v) for v in expected],
                "englishAnswerMatch": en, "tamilAnswerMatch": ta,
            }

    for exercise in ledger["exercises"]:
        for question in exercise["questions"]:
            multi = len(question["tasks"]) > 1
            for task in question["tasks"]:
                task_id = task["taskId"]
                assert task_id not in seen, task_id
                seen.add(task_id)
                state = task["state"]["current"]
                ids = [r["id"] for r in state["records"] if r.get("catalogueVisible")]
                mapped.update(ids)
                quarantined = state["status"] == "SOURCE_BLOCKED"
                samples = [inspected[record_id] for record_id in ids]
                checked = max((entry[0] for entry in samples), default=0)
                unique_part = len(ids) == 1 and (
                    not multi or any(r.get("mapping") == "explicit-part-label" for r in state["records"])
                )
                method = samples[0][1] if unique_part else ""
                en = unique_part and samples[0][2]
                ta = unique_part and samples[0][3]
                # Card statements cannot be attributed to an individual subpart
                # when the catalogue card serves multiple canonical tasks.
                if not unique_part:
                    checked = 0
                status = ("QUARANTINED" if quarantined else "UNTESTED" if not ids else
                          "VERIFIED_FINAL_ANSWER" if en and ta else "PARTIAL" if checked or en or ta else "UNSUPPORTED")
                note = manual.get(task_id, {})
                if status != "QUARANTINED" and note:
                    status = note["status"]
                rows.append({
                    "task_id": task_id, "grade": exercise["grade"], "chapter": exercise["chapter"],
                    "exercise": exercise["exercise"], "question": question["number"], "part": task["part"],
                    "record_ids": "|".join(ids), "prior_ledger_status": state["status"], "audit_status": status,
                    "exact_working_links": checked, "answer_method": method,
                    "english_numeric_answer_match": en, "tamil_numeric_answer_match": ta,
                    "tamil_full_semantic_review": note.get("tamil_semantic_review", False),
                    "source_pages_en": "|".join(map(str, question["source"]["en"]["pdfPages"])),
                    "source_pages_ta": "|".join(map(str, question["source"]["ta"]["pdfPages"])),
                    "corrected_on_branch": note.get("corrected", False), "finding_id": note.get("finding_id", ""),
                })
    assert manual.keys() <= seen
    counts = Counter(row["audit_status"] for row in rows)
    grouped = defaultdict(Counter)
    for row in rows:
        grouped[f"{row['grade']}/{row['chapter']}"][row["audit_status"]] += 1
    output.mkdir(parents=True, exist_ok=True)
    with (output / "MATHGUARD_COVERAGE.csv").open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=rows[0].keys(), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    summary = {
        "chapters": len(runtime["chapters"]),
        "exerciseSections": len({v[:3] for v in visible}),
        "catalogueCards": len(records),
        "ledgerSections": len(ledger["exercises"]),
        "registeredOutsideCatalogueIds": sorted(registered - records.keys()),
        "ledgerOnlyCardSectionTuples": sorted(ledger_cards - visible),
        "runtimeOnlyCardSectionTuples": sorted(visible - ledger_cards),
        "canonicalTasks": len(rows), "eligibleTasks": len(rows) - counts["QUARANTINED"],
        "eligibleAttempts": len(rows) - counts["QUARANTINED"] - counts["UNTESTED"],
        "corrected": sum(row["corrected_on_branch"] for row in rows),
        "counts": {k: counts[k] for k in (
            "VERIFIED_WORKING", "VERIFIED_FINAL_ANSWER", "FAILED", "PARTIAL", "UNSUPPORTED", "UNTESTED", "QUARANTINED")},
        "byGradeChapter": dict(grouped), "catalogueCardsWithoutCanonicalMapping": sorted(records.keys() - mapped),
        "workingConflictCandidateCards": sum(bool(s["exactWorkingConflictsToReview"]) for s in suspects.values()),
        "oracleAnswerReviewCandidateCards": sum(bool(s["questionDerivedMethod"]) for s in suspects.values()),
    }
    (output / "logs").mkdir(exist_ok=True)
    (output / "logs/curriculum-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    (output / "logs/curriculum-review-queue.json").write_text(json.dumps(suspects, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("runtime", type=Path)
    parser.add_argument("--output", type=Path, default=ROOT)
    parser.add_argument("--manual", type=Path, default=ROOT / "curriculum-adjudications.json")
    arguments = parser.parse_args()
    raw = arguments.runtime.read_bytes()
    print("Catalogue JSON SHA-256", hashlib.sha256(raw).hexdigest())
    audit(json.loads(raw), arguments.output, arguments.manual)
