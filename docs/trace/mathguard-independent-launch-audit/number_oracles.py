"""Exact reference checks for recurring decimals, powers, surds and integer arithmetic."""
import math
import re
from fractions import Fraction

import sympy as sp


def signed_fraction(text):
    text = text.translate(str.maketrans("−–", "--")).strip()
    recurring = re.fullmatch(r"(-?)(\d+)\.(\d*)\((\d+)\)", text)
    if recurring:
        sign, whole, prefix, block = recurring.groups()
        place = 10 ** len(prefix)
        value = Fraction(int(whole)) + Fraction(int(prefix or "0"), place)
        value += Fraction(int(block), place * (10 ** len(block) - 1))
        return -value if sign else value
    mixed = re.fullmatch(r"(-?)(\d+)\s+(\d+)/(\d+)", text)
    if mixed:
        sign, whole, numerator, denominator = mixed.groups()
        value = int(whole) + Fraction(int(numerator), int(denominator))
        return -value if sign else value
    try:
        return Fraction(text)
    except (ValueError, ZeroDivisionError):
        return None


def period_length(value):
    denominator = value.denominator
    for factor in (2, 5):
        while denominator % factor == 0:
            denominator //= factor
    if denominator == 1:
        return 0
    remainder, length = 10 % denominator, 1
    while remainder != 1:
        remainder = remainder * 10 % denominator
        length += 1
    return length


def answer_numeric_token(text):
    """Strip a known MCQ option prefix or simple answer key without losing signs."""
    text = re.sub(r"^\s*(?:(?:Option|விடை|விருப்பம்)\s*)?\([A-Da-d1-4அஆஇஈ]\)\s*[—:–]?\s*", "", text, flags=re.I)
    text = re.sub(r"^\s*Option\s+[A-Da-d]\s*:\s*", "", text, flags=re.I)
    return text.strip().rstrip(".")


def decimal_answer(text, value, required_period, any_expansion_type=False):
    text = text.translate(str.maketrans("−–", "--"))
    decimal = re.search(r"(?<![\d/])(-?\d+\.(?:\d*\(\d+\)|\d+))(?![\d(])", text)
    if not decimal or signed_fraction(decimal[0]) != value:
        return False
    block = re.search(r"\((\d+)\)$", decimal[0])
    if len(block[1] if block else "") != required_period:
        return False
    if not any_expansion_type:
        return True
    label = text.lower()
    has_terminating = bool(re.search(r"\bterminating\b|முடிவுறு(?:ம்)?|முடிவடையும்", label))
    has_recurring = bool(re.search(r"\brecurring\b|சுழல்|மீளும்", label))
    return has_recurring if block else has_terminating


def fractions_and_powers(q, answers, expression):
    match = re.fullmatch(r"Convert (.+?) to decimal and state its expansion type", q, re.I)
    if match and (value := signed_fraction(match[1])) is not None:
        period = period_length(value)
        return "decimal_expansion", [str(value), period], [
            decimal_answer(answer, value, period, any_expansion_type=True) for answer in answers
        ]
    match = re.fullmatch(r"Express (.+?) as a recurring decimal and find its period length", q, re.I)
    if match and (value := signed_fraction(match[1])) is not None:
        period = period_length(value)
        return "decimal_period", [str(value), period], [
            decimal_answer(answer, value, period) and bool(re.search(rf"(?<!\d){period}\s*$", answer.rstrip(". ")))
            for answer in answers
        ]
    match = re.fullmatch(r"Express (.+?) as a fraction p/q \(parentheses show recurring digits\)", q, re.I)
    if match and (value := signed_fraction(match[1])) is not None:
        return "decimal_to_fraction", [str(value)], [
            "/" in answer and signed_fraction(answer.rstrip(".")) == value for answer in answers
        ]
    match = re.fullmatch(r"Without division, decide whether (.+?) has a terminating decimal expansion", q, re.I)
    if match and (value := signed_fraction(match[1])) is not None:
        terminates = period_length(value) == 0
        labels = r"^\s*(?:yes\b|ஆம்(?=\W|$))" if terminates else r"^\s*(?:no\b|இல்லை(?=\W|$))"
        return "decimal_denominator", [terminates], [bool(re.search(labels, answer, re.I)) for answer in answers]
    match = re.fullmatch(r"Find the fifth root of (.+)", q, re.I)
    if match and (value := expression(match[1])) is not None and value.is_positive:
        expected = value ** sp.Rational(1, 5)
        return "principal_fifth_root", [str(expected)], [expression(answer.rstrip(".")) == expected for answer in answers]
    match = re.fullmatch(r"Write (.+) in the form (\d+)ⁿ", q, re.I)
    if match and (value := expression(match[1])) is not None and not value.free_symbols:
        base = match[2]
        return "rewritten_power", [str(value), f"base {base}"], [
            bool(re.match(rf"^{base}(?:\^|[⁰¹²³⁴⁵⁶⁷⁸⁹⁻])", answer)) and
            expression(answer.rstrip(".")) == value for answer in answers
        ]
    match = re.fullmatch(r"(?:Find the exact value of|Write) (.+?)(?: using a fractional index)?", q, re.I)
    if match and (value := expression(match[1])) is not None and not value.free_symbols:
        return "exact_power_or_radical", [str(value)], [
            expression(answer.rstrip(".")) == value and
            ("fractional index" not in q or bool(re.search(r"\^\([^)]*/[^)]*\)", answer)))
            for answer in answers
        ]
    match = re.fullmatch(r"Give two irrational numbers between (.+?) and (.+)", q, re.I)
    if match:
        interval = [expression(part) for part in match.groups()]
        if all(value is not None and value.is_real and not value.free_symbols for value in interval):
            lo, hi = sorted(interval)
            def valid(answer):
                real = [expression(part) for part in re.split(r"\s*(?:,|;|\band\b|மற்றும்)\s*", answer.rstrip("."))]
                return (len(real) == 2 and all(
                    value is not None and value.is_rational is False and lo < value < hi for value in real
                ) and real[0] != real[1])
            return "irrational_interval", [str(lo), str(hi)], [valid(answer) for answer in answers]
    return None


def rounded_matches(value, observed, quantum):
    """Round nonnegative magnitudes to nearest quantum, ties away from zero."""
    scaled = abs(value / quantum)
    rounded = sp.floor(scaled + sp.Rational(1, 2)) * quantum
    return observed == (-rounded if value.is_negative else rounded)


def expression_forms(q, answers, expression):
    match = re.fullmatch(r"(?:Write|Express|Simplify) (.+?) in (scientific notation|ordinary decimal form)", q, re.I)
    if match:
        value = expression(match[1])
        if value is not None and not value.free_symbols:
            def valid(answer):
                if match[2] == "ordinary decimal form":
                    return bool(re.fullmatch(r"[+-]?(?:\d+|\d+\.\d+)", answer)) and expression(answer) == value
                science = re.fullmatch(r"(≈\s*)?([+-]?\d+(?:\.\d+)?)\s*[×*]\s*10(?:\^\(?([+-]?\d+)\)?|([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+))", answer)
                if not science:
                    return False
                approx, coefficient, caret, superscript = science.groups()
                exponent = int(caret or superscript.translate(str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")))
                mantissa = sp.Rational(coefficient)
                if abs(exponent) > 100 or not 1 <= abs(mantissa) < 10:
                    return False
                observed = mantissa * 10 ** sp.Integer(exponent)
                if approx:
                    places = len(coefficient.partition(".")[2])
                    return rounded_matches(value, observed, 10 ** sp.Integer(exponent - places))
                return observed == value
            return "scientific_or_decimal_notation", [str(value)], [valid(answer.rstrip(".")) for answer in answers]
    match = re.fullmatch(r"(?:Rationalise the denominator of|Rationalise and simplify|Simplify) (.+?)(?: using (?:the )?(?:addition and subtraction|multiplication or division properties) of surds)?", q, re.I)
    if match:
        value = expression(match[1])
        if value is not None and not value.free_symbols:
            checks = []
            for answer in answers:
                observed = expression(answer.rstrip("."))
                # SymPy may rationalise automatically. A visible radical denominator
                # remains a form mismatch even if its value is equivalent.
                has_radical_denominator = bool(re.search(r"/\s*\(?\d*\s*[√∛∜]", answer))
                checks.append(observed is not None and sp.simplify(value - observed) == 0 and
                              ("rationalise" not in q.lower() or not has_radical_denominator))
            return "exact_surd_or_fraction", [str(value)], checks
    return None


def integers(q, answers, expression):
    cases = (
        (r"Find the HCF of (\d+) and (\d+)", lambda a, b: (math.gcd(a, b),)),
        (r"Find the LCM and HCF of (\d+) and (\d+) by applying the fundamental theorem of arithmetic",
         lambda a, b: (math.lcm(a, b), math.gcd(a, b))),
        (r"Find the largest number which divides (\d+) and (\d+) leaving remainder (\d+) in each case",
         lambda a, b, r: (math.gcd(a-r, b-r),)),
        (r"Find the greatest number consisting of (\d+) digits which is exactly divisible by (\d+)\s*,\s*(\d+)\s*,\s*(\d+)",
         lambda digits, *divisors: ((10 ** digits - 1) // math.lcm(*divisors) * math.lcm(*divisors),)),
        (r"Find the least number that is divisible by the first ten natural numbers",
         lambda: (math.lcm(*range(1, 11)),)),
        (r"Find the sum of all odd positive integers less than (\d+)",
         lambda n: (sum(range(1, n, 2)),)),
        (r"Find the sum of all natural numbers between (\d+) and (\d+) which are not divisible by (\d+)",
         lambda lo, hi, divisor: (sum(n for n in range(lo + 1, hi) if n % divisor),)),
    )
    for pattern, solve in cases:
        match = re.fullmatch(pattern, q, re.I)
        if match:
            values = solve(*map(int, match.groups()))
            checks = []
            for answer in answers:
                cleaned = re.sub(r"(?<=\d),(?=\d{3}(?:\D|$))", "", answer.rstrip("."))
                parts = [part.rsplit("=", 1)[-1].strip() for part in re.split(r";|(?<=\d)\.\s+(?=\D)", cleaned)]
                checks.append(tuple(expression(part) for part in parts) == values)
            return "number_theory_or_integer_sum", list(values), checks
    return None


def check_number(q, answers, expression):
    q = re.sub(r"^\s*\d+\.\s*", "", q).strip().rstrip(".?")
    q = re.sub(r"\s+", " ", q)
    answers = [answer_numeric_token(answer) for answer in answers]
    for solve in (fractions_and_powers, expression_forms, integers):
        outcome = solve(q, answers, expression)
        if outcome:
            return outcome
    return None
