"""Check a scalar mensuration result against its answer field and source instructions."""

from __future__ import annotations

import re
from dataclasses import dataclass

import sympy as sp

from .parser import ParseError, parse_expression
from .rounding import check_numeric_match
from .symbolic import expressions_equivalent
from .units import AREA_TO_CM2, LENGTH_TO_CM, VOLUME_TO_CM3


_UNITS = {
    "length": LENGTH_TO_CM,
    "area": AREA_TO_CM2,
    "volume": VOLUME_TO_CM3,
    "time": {"seconds": sp.Rational(1, 60), "minutes": 1, "hours": 60},
    "currency": {"₹": 1},
    "percentage": {"%": 1},
}
_LENGTH_LABEL = r"slant height|radius|diameter|height|width|depth|thickness|length|perimeter|circumference|rise|raise"
_LABELS = {
    "area": r"(?:surface )?areas?|csa|tsa",
    "length": _LENGTH_LABEL,
    "volume": r"volumes?|capacity",
    "time": r"time|duration",
    "currency": r"cost|price",
    "percentage": r"percentage|percent",
    None: r"number|count",
}
_VARIABLE_LABELS = {"area": {"A"}, "volume": {"V"}, "length": {"r", "d", "h", "l"}}
_PLACES = {word: index for index, word in enumerate(
    ("zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten")
)}
_NEAREST = {
    "tenth": 1, "hundredth": 2, "thousandth": 3,
}
_FIELD_SEPARATOR = re.compile(r"\s*(?:=|≈|:|\bis\b)\s*", re.I)
_FIELD_LABEL = re.compile(r"[A-Za-z][A-Za-z .’'-]*")
_PI_ASSIGNMENT = r"(?:π|\bpi\b)\s*(?:=|≈|\bas\b|\bto be\b|\bis\b)"
_UNIT_TOKEN = re.compile(
    r"(?<![A-Za-z])(?:(?:sq(?:uare)?|cu(?:bic)?)\.?\s*)?(?:mm|cm|km|m)(?:[²³]|\s*\^\s*\{?[23]\}?)?\s*$"
    r"|(?<![A-Za-z])(?:lit(?:re|er)s?|ml|l|seconds?|sec|minutes?|min|hours?|hrs?|h|%)\s*$",
    re.I,
)
_TA_METRIC_SUFFIX = re.compile(
    r"(?:(சதுர|கன)\s+)?(?:(கி|செ|மி)\.?\s*)?மீ\.?"
    r"(?:\s*([²³]|\^\s*(?:\{[23]\}|[23])))?$"
)


def _unit_name(token: str) -> str:
    token = token.lower().translate(str.maketrans("²³", "23"))
    token = re.sub(r"[\s^{}]", "", token)
    prefixed = re.fullmatch(r"(sq(?:uare)?|cu(?:bic)?)\.?(mm|cm|km|m)", token)
    if prefixed:
        return prefixed[2] + ("2" if prefixed[1].startswith("sq") else "3")
    if token.startswith(("litre", "liter")):
        return "litre"
    if token in {"hour", "hours", "hr", "hrs", "h"}:
        return "hours"
    if token in {"minute", "minutes", "min"}:
        return "minutes"
    if token in {"second", "seconds", "sec"}:
        return "seconds"
    return token


@dataclass(frozen=True)
class RequestedPrecision:
    pi: sp.Rational | None = None
    exact_pi: bool = False
    places: int | None = None
    fixed_places: bool = False
    unit: str | None = None

    @property
    def active(self) -> bool:
        return self.pi is not None or self.exact_pi or self.places is not None


def requested_precision(question: str) -> RequestedPrecision:
    """Read explicit numerical conventions from the question, independent of the answer."""
    q = question.lower().replace(r"\pi", "π").translate(str.maketrans("⁄÷", "//"))
    q = re.sub(r"\\(?:d?frac|tfrac)\s*\{(\d+)\}\s*\{(\d+)\}", r"\1/\2", q)
    pi_value = r"(\d+(?:\.\d+)?(?:\s*/\s*\d+)?)(?![\w./]\d|[\w/]|\s*[+−*/^×-])"
    assignments = re.findall(rf"{_PI_ASSIGNMENT}\s*{pi_value}", q)
    if len(assignments) != len(re.findall(_PI_ASSIGNMENT, q)):
        raise ValueError("The value assigned to π is outside the supported grammar.")
    pi_values = set()
    for token in assignments:
        try:
            pi_values.add(sp.Rational(re.sub(r"\s+", "", token)))
        except (ValueError, ZeroDivisionError):
            raise ValueError("The question gives an invalid value for π.") from None
    exact_pi = bool(re.search(r"\bin terms of\s*(?:π|pi)\b", q))
    if len(pi_values) > 1 or (pi_values and (exact_pi or min(pi_values) <= 0)):
        raise ValueError("The question gives conflicting or invalid π instructions.")

    decimal = re.search(r"\b(\d+|[a-z]+)\s+(?:decimal places?|decimals)\b", q)
    nearest = re.search(
        r"\bto (?:the )?nearest (?:whole )?"
        r"(tenth|hundredth|thousandth|integer|number|unit|minute|hour|second|(?:mm|cm|m)(?:[²³]|\^[23])?)(?!\w)",
        q,
    )
    places = None
    unit = None
    if decimal:
        token = decimal[1]
        places = int(token) if token.isdecimal() and len(token) <= 2 else _PLACES.get(token)
        if places is None or places > 20:
            raise ValueError("The requested decimal precision is outside the supported range.")
    elif nearest:
        word = nearest[1]
        places = _NEAREST.get(word, 0)
        if word not in _NEAREST and word not in {"integer", "number", "unit"}:
            unit = _unit_name(word)
    elif re.search(r"\b(?:round(?:ed)?(?: off| to)|to (?:the )?nearest|significant figures?)\b", q):
        raise ValueError("The requested rounding rule is outside the supported grammar.")
    return RequestedPrecision(next(iter(pi_values), None), exact_pi, places, decimal is not None, unit)


@dataclass(frozen=True)
class ScalarValue:
    expression: sp.Expr
    unit: str | None
    decimal_places: int | None


def _parse_value(text: str) -> ScalarValue:
    text = re.sub(r"\s+of [A-Za-z][A-Za-z -]*$", "", text.strip(), flags=re.I)
    unit = None
    currency = re.match(r"^(?:₹|rs\.?\s*)", text, re.I)
    if currency:
        text, unit = text[currency.end():].strip(), "₹"
    elif match := _UNIT_TOKEN.search(text):
        text, unit = text[:match.start()].strip(), _unit_name(match[0])
    else:
        text = re.sub(r"\s+(?:birthday caps|words|coins|units)\s*$", "", text, flags=re.I)
    text = re.sub(r"(?<=\d),(?=\d{3}\b)", "", text)
    expression = parse_expression(text)
    if expression.free_symbols or expression.is_real is not True or expression.is_finite is not True:
        raise ParseError("The answer is undefined or is not a real scalar.")
    decimal = re.fullmatch(r"[+−-]?(?:\d+(?:\.(\d+))?|\.(\d+))", text)
    return ScalarValue(expression, unit, len(decimal[1] or decimal[2] or "") if decimal else None)


def scalar_latex_text(latex: str) -> str:
    """Expose result labels and unit suffixes while retaining the expression as LaTeX."""
    text = re.sub(r"^\\boxed\s*\{(.*)\}$", r"\1", latex.strip(), flags=re.S)
    text = re.sub(r"\\(?:text|mathrm)\s*\{([^{}]*)\}", r" \1 ", text)
    text = re.sub(r"\\[,;! ]", " ", text)
    return text.replace(r"\approx", "≈").replace(r"\%", "%")


def tamil_scalar_text(answer: str) -> str:
    """Normalize compact Tamil scalar prefixes and metric units for the math parser."""
    text = re.sub(r"^(?:சுமார்|தோராயமாக|விடை)\s+", "", answer.strip()).rstrip(".")
    match = _TA_METRIC_SUFFIX.search(text)
    if not match:
        return text
    dimension, prefix, power = match.groups()
    explicit_power = {"சதுர": "2", "கன": "3"}.get(dimension)
    suffix_power = re.sub(r"[\s^{}]", "", (power or "").translate(str.maketrans("²³", "23")))
    if explicit_power and suffix_power and explicit_power != suffix_power:
        raise ParseError("The Tamil unit gives conflicting dimensions.")
    unit = {"கி": "km", "செ": "cm", "மி": "mm", None: "m"}[prefix]
    size = explicit_power or suffix_power
    return f"{text[:match.start()]} {unit}{'^' + size if size else ''}".strip()


def parse_scalar_answer(answer: str, question: str, dimension: str | None) -> list[ScalarValue]:
    # Annotations and independent clauses cannot supply an alternative answer value.
    annotation = r"(?=(?:\d{4}\s+)?(?:[A-Za-z]{2}|π\s*[=≈])|[^()]*\b(?:from|using|check|key)\b)"
    text = re.sub(rf"\s+\({annotation}[^()]*\)\.?\s*$", "", answer.strip(), flags=re.I)
    primary, *notes = re.split(r"[;\n]", text.rstrip("."))
    primary = re.sub(r"^(?:answer\s*:\s*)?(?:approximately\s+)?", "", primary.strip(), flags=re.I)
    if dimension == "percentage":
        primary = re.sub(r"^.*?\b(?:increases|decreases) by\s+(?=[+−-]?\d)", "", primary, flags=re.I)
    parts = _FIELD_SEPARATOR.split(primary.lstrip("≈ "))
    expected_label = re.compile(rf"\b(?:{_LABELS.get(dimension, 'answer')}|answer)\b", re.I)
    variables = _VARIABLE_LABELS.get(dimension, ())
    for note in notes:
        label, *rest = _FIELD_SEPARATOR.split(note.strip(), maxsplit=1)
        if rest and _FIELD_LABEL.fullmatch(label) and (expected_label.search(label) or label in variables):
            raise ParseError("The answer contains more than one field for the requested result.")
    if len(parts) > 1 and _FIELD_LABEL.fullmatch(parts[0]):
        label = parts.pop(0)
        is_result = expected_label.search(label) or label in variables
        is_annotation = re.search(r"\b(?:check|example|unrelated|given|input|intermediate|reference)\b", label, re.I)
        if not is_result or is_annotation:
            raise ParseError(f"The first answer field is labelled {label!r}.")
        if dimension == "length":
            asked = re.search(rf"\b(?:find|calculate|determine)\s+(?:the\s+)?(?:its\s+)?({_LENGTH_LABEL})\b", question, re.I)
            given = re.search(rf"\b({_LENGTH_LABEL})\b", label, re.I)
            if asked and given and asked[1].lower() != given[1].lower():
                raise ParseError(f"The question asks for {asked[1]}, but the answer field gives {given[1]}.")
    return [_parse_value(part) for part in parts]


def scalar_answer_parity(english: str, tamil: str) -> bool | None:
    """Compare compact scalar answers with their signs and units intact."""
    try:
        normalized_tamil = tamil_scalar_text(scalar_latex_text(tamil))
    except ParseError:
        return False
    try:
        en = parse_scalar_answer(scalar_latex_text(english), "", None)
        ta = parse_scalar_answer(normalized_tamil, "", None)
    except ParseError:
        return None
    if len(en) != 1 or len(ta) != 1:
        return None
    left, right = en[0], ta[0]
    if not left.unit or not right.unit or left.unit == right.unit:
        return expressions_equivalent(left.expression, right.expression)
    for units in _UNITS.values():
        if left.unit in units and right.unit in units:
            en_scaled = left.expression * sp.Rational(units[left.unit])
            ta_scaled = right.expression * sp.Rational(units[right.unit])
            return expressions_equivalent(en_scaled, ta_scaled)
    return False


def scalar_matches(
    values: list[ScalarValue],
    expected: sp.Expr,
    dimension: str | None,
    precision: RequestedPrecision,
    preferred_pi: str,
    tolerance: float,
) -> bool:
    units = _UNITS.get(dimension, {})
    first_unit = values[0].unit
    if any(value.unit is not None and units and value.unit not in units for value in values):
        return False

    if precision.pi is not None:
        expected = expected.subs(sp.pi, precision.pi)
    if precision.places is not None:
        rounded = values[-1]
        if precision.unit and rounded.unit != precision.unit:
            return False
        if precision.fixed_places and rounded.decimal_places != precision.places:
            return False
        # Compare against the exact rounded value, with ties away from zero.
        quantum = sp.Rational(1, 10**precision.places)
        result = sp.sign(expected) * sp.floor(abs(expected) / quantum + sp.Rational(1, 2)) * quantum
        if not expressions_equivalent(rounded.expression, result):
            return False
        values = values[:-1]

    for index, value in enumerate(values):
        expression = value.expression
        if precision.pi is not None and expression.has(sp.pi):
            if precision.places is None and index == len(values) - 1:
                return False
            expression = expression.subs(sp.pi, precision.pi)
        if first_unit in units and value.unit in units:
            expression *= sp.Rational(units[value.unit]) / sp.Rational(units[first_unit])
        if expressions_equivalent(expression, expected):
            continue
        if precision.exact_pi or precision.places is not None:
            return False
        if not check_numeric_match(expected, float(expression), tolerance, preferred_pi).matched:
            return False
    return True
