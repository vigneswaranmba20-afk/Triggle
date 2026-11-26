"""Exact computations for data, class intervals and elementary probability."""
import re
from collections import Counter
from statistics import median

import sympy as sp

from algebra_oracles import algebra_case, equal, normalize
from number_oracles import answer_numeric_token, rounded_matches


NUMBER = r"[+-]?\d+(?:\.\d+)?(?:/\d+)?"
INTERVAL = re.compile(rf"^({NUMBER})\s*[-–−]\s*({NUMBER})$")
UNIT = {
    "kg": r"(?:kg|kgs|கி\.?கி\.?)",
    "mm³": r"(?:mm³|mm3|மி\.?மீ³)",
    "years": r"(?:years?|வருடங்கள்|ஆண்டுகள்)",
    "seconds": r"(?:seconds?|sec|வினாடிகள்|நொடிகள்)",
    "pages": r"(?:pages?|பக்கங்கள்|பக்கம்)",
    "marks": r"(?:marks?|மதிப்பெண்கள்|மதிப்பெண்)",
    "mm": r"(?:mm|மி\.?மீ\.?)",
    "cm": r"(?:cm|செ\.?மீ\.?)",
    "°C": r"(?:°C|°\s*செ)",
}


def table_data(table, language):
    """Support both the horizontal table and the shared two-column table."""
    if not table:
        return ()
    local = table.get(language, {})
    rows = local.get("rows", table.get("rows", []))
    headers = local.get("headers", table.get("headers", []))
    if len(rows) == 1 and len(rows[0]) == len(headers) and len(headers) > 2:
        return tuple(zip(headers[1:], rows[0][1:]))
    if rows and all(len(row) == 2 for row in rows):
        return tuple(map(tuple, rows))
    return ()


def frequency_distribution(table):
    rows = table_data(table, "en")
    if not rows or rows != table_data(table, "ta"):
        return None
    if not all(type(frequency) is int and frequency >= 0 for _, frequency in rows):
        return None
    intervals = [INTERVAL.fullmatch(str(mark)) for mark, _ in rows]
    frequencies = [freq for _, freq in rows]
    if not sum(frequencies):
        return None
    if all(intervals):
        bounds = [tuple(map(sp.Rational, m.groups())) for m in intervals]
        if not all(lo < hi for lo, hi in bounds):
            return None
        return [(lo+hi)/2 for lo, hi in bounds], frequencies, bounds
    if all(re.fullmatch(NUMBER, str(mark)) for mark, _ in rows):
        return [sp.Rational(str(mark)) for mark, _ in rows], frequencies, []
    return None


def exact_stats(marks, frequencies):
    count = sum(frequencies)
    mean = sum(x*f for x, f in zip(marks, frequencies)) / count
    variance = sum(f*(x-mean)**2 for x, f in zip(marks, frequencies)) / count
    return mean, variance


def continuous_bounds(bounds):
    gaps = {lo - previous_hi for (_, previous_hi), (lo, _) in zip(bounds, bounds[1:])}
    if len(gaps) > 1 or not gaps <= {0, 1}:
        return None
    adjustment = sp.Rational(next(iter(gaps), 0), 2)
    return [(lo-adjustment, hi+adjustment) for lo, hi in bounds]


def grouped_statistic(kind, frequencies, intervals):
    bounds = continuous_bounds(intervals)
    if not bounds:
        return None
    if kind == "median":
        halfway = sp.Rational(sum(frequencies), 2)
        running = 0
        for (lo, hi), freq in zip(bounds, frequencies):
            if running + freq >= halfway and freq > 0:
                return lo + (halfway-running)*(hi-lo)/freq
            running += freq
    if kind == "mode":
        index = frequencies.index(max(frequencies))
        if frequencies.count(frequencies[index]) != 1 or index in (0, len(frequencies)-1):
            return None
        if len({hi-lo for lo, hi in bounds}) != 1:
            return None
        lo, hi = bounds[index]
        up = frequencies[index]-frequencies[index-1]
        down = frequencies[index]-frequencies[index+1]
        return lo + sp.Rational(up, up+down)*(hi-lo)
    return None


def observed_scalar(text, expected, expression, unit=None):
    text = answer_numeric_token(text).strip(" .")
    if unit:
        suffix = re.compile(UNIT[unit] + r"\.?$", re.I)
        has_unit = suffix.search(text)
        if not has_unit:
            return False
        text = text[:has_unit.start()].strip()
    chunks = text.split("≈")
    first = chunks[0].rsplit("=", 1)[-1].strip()
    if first and (exact := expression(first)) is not None and not equal(exact, expected):
        return False
    if len(chunks) == 1:
        return equal(expression(first), expected)
    if len(chunks) == 2:
        approx = chunks[1].strip()
        if not re.fullmatch(r"-?\d+(?:\.\d+)?", approx):
            return False
        return rounded_matches(expected, sp.Rational(approx), sp.Rational(1, 10 ** len(approx.partition(".")[2])))
    return False


def checked_stat(method, value, answers, expression, unit=None, permit_implicit_unit=False):
    def compare(text):
        if observed_scalar(text, value, expression, unit):
            return True
        return permit_implicit_unit and observed_scalar(text, value, expression)
    return algebra_case(method, [value] + ([unit] if unit else []), answers, compare)


def tables(q, answers, expression, table):
    dist = frequency_distribution(table)
    if not dist:
        return None
    marks, freqs, bounds = dist
    lower = q.lower()
    if "standard deviation" in lower:
        _, variance = exact_stats(marks, freqs)
        unit = next((unit for word, unit in (("years", "years"), ("diameter", "cm"),
                    ("rainfall", "mm"), ("sec", "seconds"), ("exam marks", "marks")) if word in lower), None)
        return checked_stat("frequency_population_sd", sp.sqrt(variance), answers, expression, unit)
    if bounds and "calculate the median" in lower:
        value = grouped_statistic("median", freqs, bounds)
        if value is not None:
            return checked_stat("grouped_median_interpolation", value, answers, expression)
    if bounds and lower.startswith("find the mode"):
        value = grouped_statistic("mode", freqs, bounds)
        if value is not None:
            unit = "kg" if "weight" in lower else "marks"
            return checked_stat("grouped_mode_interpolation", value, answers, expression, unit)
    if bounds and re.search(r"\b(?:mean|arithmetic mean)\b", lower):
        mean, _ = exact_stats(marks, freqs)
        unit = "kg" if "weight" in lower else "years" if "age" in lower else None
        return checked_stat("weighted_class_midpoint_mean", mean, answers, expression, unit)
    return None


def ungrouped(q, answers, expression):
    match = re.fullmatch(r"Find the median of the given (?:values|data)\s*:\s*(.+)", q, re.I)
    if match:
        marks = [expression(element.strip()) for element in match[1].split(",")]
        if len(marks) >= 3 and all(mark is not None and not mark.free_symbols for mark in marks):
            return checked_stat("ordered_sample_median", median(marks), answers, expression)
    match = re.fullmatch(r"Find the mode of the given data\s*:\s*(.+)", q, re.I)
    if match:
        marks = [expression(element.strip()) for element in match[1].split(",")]
        if len(marks) >= 3 and all(mark is not None and not mark.free_symbols for mark in marks):
            counts = Counter(marks)
            modes = {key for key, count in counts.items() if count == max(counts.values())}
            def compare(answer):
                actual = [expression(part.strip()) for part in re.split(r",|\band\b|மற்றும்", answer)]
                return set(actual) == modes
            return algebra_case("ungrouped_modes", sorted(modes), answers, compare)
    match = re.fullmatch(r"Find the standard deviation of first (\d+) natural numbers", q, re.I)
    if match and 0 < (n := int(match[1])) <= 500:
        _, variance = exact_stats(list(map(sp.Integer, range(1, n+1))), [1]*n)
        return checked_stat("first_n_population_sd", sp.sqrt(variance), answers, expression)
    match = re.fullmatch(r"If the standard deviation of a data is ("+NUMBER+r") and if each value of the data is decreased by ("+NUMBER+r"), then find the new standard deviation", q, re.I)
    if match:
        return checked_stat("translation_invariant_sd", sp.Rational(match[1]), answers, expression)
    match = re.fullmatch(r"The .*Eight students have completed only (.+?) pages\. Find the standard deviation of the pages completed(?: by them)?",q,re.I)
    if match:
        sample = re.split(r",\s*|\s+and\s+", match[1])
        if len(sample) == 8 and all(re.fullmatch(NUMBER,item) for item in sample):
            _, variance = exact_stats(list(map(sp.Rational,sample)),[1]*8)
            return checked_stat("population_sd_of_pages", sp.sqrt(variance), answers, expression, "pages")
    return None


def probability(q, answers, expression, question_id):
    match = re.fullmatch(r"A and B are two events such that, P\(A\) = ("+NUMBER+r"), P\(B\) = ("+NUMBER+r"), and P\(A ∩ B\) = ("+NUMBER+r")\. Find \(i\) P\(not A\) \(ii\) P\(not B\) \(iii\) P\(A or B\)", q, re.I)
    if match and (label := re.search(r"-q\d+-(i|ii|iii)$", question_id)):
        a,b,ab = map(sp.Rational,match.groups())
        if min(ab,a-ab,b-ab,1-a-b+ab) >= 0:
            value = {"i":1-a,"ii":1-b,"iii":a+b-ab}[label[1]]
            return checked_stat("probability_complement_and_union",value,answers,expression)
    match = re.fullmatch(r"If A and B are two mutually exclusive events of a random experiment and P\(not A\) = ("+NUMBER+r"),\s*P\(A ∪ B\) = ("+NUMBER+r"), then find P\(B\)",q,re.I)
    if match:
        not_a, union = map(sp.Rational,match.groups())
        val = union + not_a - 1
        if 0 <= val <= union <= 1:
            return checked_stat("disjoint_probability", val, answers, expression)
    match = re.fullmatch(r"The probability that atleast one of A and B occur is ("+NUMBER+r")\. If A and B occur simultaneously with probability ("+NUMBER+r"), then find P\(Ā\) \+ P\(B̄\)",q,re.I)
    if match:
        union, intersection = map(sp.Rational,match.groups())
        if 0 <= intersection <= union <= 1:
            return checked_stat("sum_of_two_complements", 2-union-intersection, answers, expression)
    return None


def check_statistics(question, answers, expression, record):
    q = normalize(question)
    return (tables(q, answers, expression, record.get("dataTable")) or
            ungrouped(q, answers, expression) or probability(q, answers, expression, record["id"]))
