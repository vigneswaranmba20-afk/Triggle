"""Finite set and relation reference model using Python sets and exact atoms."""
import calendar
import itertools
import math
import operator
import re
from fractions import Fraction

DASH = str.maketrans({"−": "-", "–": "-", "′": "'", "’": "'", "∆": "Δ"})
OPERATIONS = {"∪": operator.or_, "∩": operator.and_, "-": operator.sub, "Δ": operator.xor,
              "×": lambda left, right: frozenset(itertools.product(left, right))}
ROMAN = re.compile(r"\(([ivx]+)\)\s*")


def split_top(text, separators):
    """Split at separators outside balanced grouping delimiters."""
    groups, marks, depth = [], [], []
    opens = {"(": ")", "{": "}", "[": "]"}
    start = 0
    for offset, character in enumerate(text):
        if character in opens:
            depth.append(opens[character])
        elif character in opens.values():
            if not depth or depth.pop() != character:
                raise ValueError("unbalanced groups")
        elif not depth and character in separators:
            groups.append(text[start:offset].strip())
            marks.append(character)
            start = offset + 1
    if depth:
        raise ValueError("unbalanced groups")
    return groups + [text[start:].strip()], marks


def roster(text):
    text = text.translate(DASH).strip()
    if text in {"∅", "φ", "Ø"}:
        return frozenset()
    if text.startswith("{") and text.endswith("}"):
        body = text[1:-1].strip()
        return frozenset(roster(item) for item in split_top(body, ",")[0]) if body else frozenset()
    if text.startswith("(") and text.endswith(")"):
        elements, _ = split_top(text[1:-1], ",")
        if len(elements) == 2:
            return tuple(roster(element) for element in elements)
    if re.fullmatch(r"[A-Za-z]+", text):
        return text
    if re.fullmatch(r"√\d+", text):
        return ("positive_sqrt", int(text[1:]))
    fraction = re.fullmatch(r"\[\[\s*(-?\d+)\s*\|\s*(\d+)\s*\]\]", text)
    if fraction:
        return Fraction(int(fraction[1]), int(fraction[2]))
    if re.fullmatch(r"-?\d+(?:\s*/\s*\d+|\.\d+)?", text):
        return Fraction(text.replace(" ", ""))
    raise ValueError("unsupported roster atom: " + text)


def literal_at(text, start):
    if text[start] in "∅φØ":
        return start + 1
    depth = 0
    for index in range(start, len(text)):
        if text[index] == "{":
            depth += 1
        elif text[index] == "}":
            depth -= 1
            if depth == 0:
                return index + 1
    raise ValueError("unclosed roster")


def prime(n):
    return n > 1 and all(n % divisor for divisor in range(2, math.isqrt(n) + 1))


def integer_roster(literal):
    """Read explicitly bounded integer/whole/natural ranges and finite prime sets."""
    body = literal.strip("{} ").translate(DASH)
    prime_match = re.fullmatch(r"x\s*[:|]\s*x is a prime number less than (\d+)", body)
    if prime_match and int(prime_match[1]) <= 500:
        return frozenset(n for n in range(2, int(prime_match[1])) if prime(n))
    match = re.fullmatch(r"(?:x\s*[:|]\s*)?x\s*∈\s*([NℕWℤZ])(?:\s*,\s*x is an integers)?\s*(?:[,|]|and)\s*(.+)", body)
    if not match:
        match = re.fullmatch(r"x\s*:\s*x is an integers,\s*x\s*∈\s*([Zℤ])\s+and\s+(.+)", body)
    if not match:
        return None
    domain, bounds = match.groups()
    interval = re.fullmatch(r"(?:(-?\d+)\s*([<≤])\s*)?x\s*([<≤])\s*(-?\d+)", bounds.strip())
    if not interval:
        return None
    lower, low_op, high_op, upper = interval.groups()
    if lower is None and domain in {"Z", "ℤ"}:
        return None
    lo = (int(lower) + (low_op == "<")) if lower is not None else (0 if domain == "W" else 1)
    if domain == "W":
        lo = max(lo, 0)
    if domain in {"N", "ℕ"}:
        lo = max(lo, 1)
    hi = int(upper) + (high_op == "≤")
    return frozenset(range(lo, hi)) if hi - lo <= 500 else None


def named_rosters(text):
    env = {}
    for match in re.finditer(r"\b([A-Z])\s*=\s*(?:(?P<alias>[A-Z])\s*=\s*)?(?=[{∅φØ])", text):
        literal = text[match.end():literal_at(text, match.end())]
        try:
            value = roster(literal)
        except ValueError:
            value = integer_roster(literal)
        if value is not None:
            for name in (match[1], match["alias"]):
                if name is None:
                    continue
                if name in env and env[name] != value:
                    raise ValueError("conflicting set givens")
                env[name] = value
    return env


def eval_set(text, env):
    s = re.sub(r"\s+", "", text.translate(DASH))
    if s in env:
        return env[s]
    if not s or len(s) > 160 or not re.fullmatch(r"[A-Z∪∩Δ×()'\-]+", s):
        raise ValueError("unsupported set expression")
    # Inputs that mix different operations at the same nesting level must group
    # them explicitly, since classroom operator-precedence conventions vary.
    parts, operators = split_top(s, "∪∩-Δ×")
    if operators:
        if len(set(operators)) > 1:
            raise ValueError("mixed operators require grouping")
        operation = OPERATIONS[operators[0]]
        result = eval_set(parts[0], env)
        for part in parts[1:]:
            result = operation(result, eval_set(part, env))
        return result
    if s.endswith("'") and "U" in env:
        return env["U"] - eval_set(s[:-1], env)
    if s.startswith("(") and s.endswith(")"):
        return eval_set(s[1:-1], env)
    if s.startswith("P(") and s.endswith(")"):
        return power_set(eval_set(s[2:-1], env))
    raise ValueError("unknown set")


def power_set(value):
    if len(value) > 12:
        raise ValueError("power set exceeds review bound")
    return frozenset(frozenset(subset) for size in range(len(value) + 1)
                     for subset in itertools.combinations(value, size))


def answer_rosters(answer):
    """Read only explicit roster literals or empty-set symbols in the answer."""
    results = []
    start = 0
    while match := re.search(r"[{∅φØ]", answer[start:]):
        location = start + match.start()
        end = literal_at(answer, location)
        results.append(roster(answer[location:end]))
        start = end
    return results


def compare_rosters(expected, answer):
    try:
        return answer_rosters(answer) == expected
    except ValueError:
        return False


def split_labels(text):
    matches = list(ROMAN.finditer(text))
    tags = [match[1] for match in matches]
    if len(set(tags)) != len(tags):
        raise ValueError("ambiguous repeated part label")
    return {match[1]: text[match.end(): matches[index + 1].start() if index + 1 < len(matches) else None].strip(" .;\n")
            for index, match in enumerate(matches)}


def set_case(method, expected, answers, compare):
    return method, [stable(value) for value in expected], [compare(expected, answer) for answer in answers]


def stable(value):
    if isinstance(value, frozenset):
        return "{" + ",".join(sorted(map(stable, value))) + "}"
    if isinstance(value, tuple):
        return "(" + ",".join(map(stable, value)) + ")"
    return str(value)


def simple_set(question, answers, env):
    match = re.fullmatch(r"List the set of letters of the following words in Roster form\.\s*\([ivx]+\)\s*([A-Z]+)", question)
    if match:
        return set_case("distinct_letters", [frozenset(match[1])], answers, compare_rosters)
    match = re.search(r"State whether True or False:\s*\([ivx]+\)\s*(-?\d+)\s*([∈∉])\s*([A-Z])$", question)
    if match and match[3] in env:
        expected = (int(match[1]) in env[match[3]]) == (match[2] == "∈")
        labels = {"true": True, "false": False, "சரி": True, "தவறு": False}
        return set_case("finite_membership", [expected], answers,
                        lambda values, answer: labels.get(answer.rstrip(". ").lower()) == values[0])
    match = re.search(r"Fill in the blanks:\s*\([ivx]+\)\s*(-?\d+)\s*(?:∈\s*(_+)|_+\s*([A-Z]))$", question)
    if match:
        element = int(match[1])
        if match[2]:
            candidates = [name for name, value in env.items() if element in value]
            if len(candidates) == 1:
                return set_case("unique_roster_membership", candidates, answers,
                                lambda values, answer: answer.strip() == values[0])
        elif match[3] in env:
            return set_case("finite_membership_symbol", ["∈" if element in env[match[3]] else "∉"], answers,
                            lambda values, answer: answer.strip() == values[0])
    if "write down the power set of the following sets" in question.lower() and len(env) == 1:
        return set_case("finite_power_set", [power_set(next(iter(env.values())))], answers, compare_rosters)
    if "write all the subsets of" in question.lower() and len(env) == 1:
        expected = list(power_set(next(iter(env.values()))))
        return set_case("all_finite_subsets", expected, answers,
                        lambda values, answer: set(answer_rosters(answer)) == set(values))
    if "find the cardinal number of the following sets" in question.lower():
        if len(env) == 1:
            cardinal = len(next(iter(env.values())))
        elif leap_years := re.search(r"all leap years between (\d+) and (\d+)$", question):
            cardinal = sum(calendar.isleap(year) for year in range(int(leap_years[1]) + 1, int(leap_years[2])))
        else:
            return None
        return set_case("finite_cardinality", [cardinal], answers,
                        lambda values, answer: bool(re.search(rf"=\s*{values[0]}\.?$", answer)))
    if "identify the following sets as null set or singleton set" in question.lower() and len(env) == 1:
        count = len(next(iter(env.values())))
        labels = {"null set": 0, "empty set": 0, "வெற்றுக்கணம்": 0, "singleton set": 1, "ஓருறுப்புக் கணம்": 1}
        return set_case("empty_or_singleton_roster", [count], answers,
                        lambda values, answer: labels.get(answer.rstrip(". ").lower()) == values[0])
    if "state which pairs of sets are disjoint or overlapping" in question.lower() and len(env) == 2:
        left, right = env.values()
        labels = {"disjoint": False, "overlapping": True, "வெட்டாக் கணங்கள்": False, "வெட்டும் கணங்கள்": True}
        return set_case("roster_intersection_classification", [bool(left & right)], answers,
                        lambda values, answer: labels.get(answer.rstrip(". ").lower()) == values[0])
    if "represent the following sets in roster form" in question.lower():
        if match := re.search(r"all even natural numbers less than (\d+)$", question):
            values = frozenset(range(2, int(match[1]), 2))
        elif match := re.search(r"y\s*=\s*\[\[1\|2n\]\],\s*n\s*∈\s*ℕ,\s*n\s*≤\s*(\d+)\}$", question):
            values = frozenset(Fraction(1, 2*n) for n in range(1, int(match[1]) + 1))
        elif match := re.search(r"is perfect cube,\s*(\d+)\s*<\s*x\s*<\s*(\d+)\}$", question):
            lo, hi = map(int, match.groups())
            values = frozenset(n ** 3 for n in range(1, hi) if lo < n ** 3 < hi)
        elif len(env) == 1:
            values = next(iter(env.values()))
        else:
            return None
        return set_case("finite_roster_construction", [values], answers, compare_rosters)
    return None


def cartesian_and_equalities(question, answers, env):
    request = re.search(r"\bFind ([A-Z] ?× ?[A-Z](?:, [A-Z] ?× ?[A-Z])?(?: and [A-Z] ?× ?[A-Z])?)\b", question)
    if request and env:
        terms = re.split(r",\s*|\s+and\s+", request[1])
        expected = [eval_set(term, env) for term in terms]
        def compare(values, answer):
            observed = answer_rosters(answer)
            if observed == values:
                return True
            return len(observed) == 1 and all(value == observed[0] for value in values) and answer.count("×") >= len(values)
        return set_case("cartesian_products", expected, answers, compare)
    product = re.fullmatch(r"If ([A-Z])\s*×\s*([A-Z])\s*=\s*(\{.+\})\s*find [A-Z] and [A-Z]", question)
    if product:
        relation = roster(product[3])
        named = {product[1]: frozenset(x for x, _ in relation), product[2]: frozenset(y for _, y in relation)}
        if relation == frozenset(itertools.product(named[product[1]], named[product[2]])):
            order = re.search(r"find ([A-Z]) and ([A-Z])$", question).groups()
            return set_case("cartesian_projection", [named[name] for name in order], answers, compare_rosters)
    equality = re.search(r"(?:show that|verify that|check if)\s*(?:\([ivx]+\)\s*)?([^=]+)=([^=]+?)(?:\s+is true)?$", question, re.I)
    if equality and env:
        lhs, rhs = (eval_set(part, env) for part in equality.groups())
        if lhs != rhs:
            return None
        def compare(values, answer):
            observed = answer_rosters(answer)
            return bool(observed) and all(value == values[0] for value in observed)
        return set_case("finite_set_identity_instance", [lhs], answers, compare)
    return None


def shared_parts(question, answers, env):
    questions = split_labels(question)
    if len(questions) < 2:
        return {}
    shown = [split_labels(answer) for answer in answers]
    if "find the following" not in question.lower() or not env:
        return {}
    verdicts = {}
    for part, target in questions.items():
        target = re.split(r"\s+and verify\b", target, maxsplit=1, flags=re.I)[0].strip()
        try:
            expected = eval_set(target, env)
        except ValueError:
            return {}
        verdicts[part] = set_case("labelled_finite_set_operation", [expected],
                                  [answer.get(part, "") for answer in shown], compare_rosters)
    return verdicts


def check_sets(question, answers):
    question = re.sub(r"^\s*\d+\.\s*", "", question).strip().rstrip(".?")
    try:
        env = named_rosters(question)
    except (ValueError, ZeroDivisionError):
        return None, {}
    try:
        return simple_set(question, answers, env) or cartesian_and_equalities(question, answers, env), shared_parts(question, answers, env)
    except (ValueError, KeyError, TypeError, ZeroDivisionError):
        return None, {}
