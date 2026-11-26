"""Cross-check source-reviewed, bilingual probability and statistics answers."""
import json
import sys
from fractions import Fraction
from itertools import product
from math import isqrt
from pathlib import Path

import sympy as sp

from audit_curriculum import expression


def prime(n):
    return n > 1 and all(n % divisor for divisor in range(2, isqrt(n) + 1))


def expected():
    dice = list(product(range(1, 7), repeat=2))
    coins = list(product("HT", repeat=3))
    cards = range(3, 38, 2)
    return {
        6: (Fraction(sum(a % 2 == 0 or a + b == 8 for a, b in dice), len(dice)),),
        7: (Fraction(sum(n % 7 == 0 or prime(n) for n in cards), len(cards)),),
        8: (Fraction(sum(c.count("T") <= 2 or c.count("H") >= 2 for c in coins), len(coins)),),
        11: (Fraction(sum(c.count("H") == 2 or "T" in c or "HH" in "".join(c) for c in coins), len(coins)),),
        12: three_event_probabilities(),
        13: (Fraction(sum(n % 2 == 0 or (n <= 20 and prime(n)) or
                          (n > 20 and not prime(n)) for n in range(1, 36)), 35),),
    }


def three_event_probabilities():
    union, triple = Fraction(9, 10), Fraction(1, 15)
    ab, bc, ac = Fraction(1, 6), Fraction(1, 4), Fraction(1, 8)
    a = (union + ab + bc + ac - triple) / 6
    b, c = 2 * a, 3 * a
    atoms = [triple, ab-triple, bc-triple, ac-triple, a-ab-ac+triple,
             b-ab-bc+triple, c-ac-bc+triple, 1-union]
    assert all(x >= 0 for x in atoms) and sum(atoms) == 1
    return a, b, c


def grouped_weight_check(record):
    frequencies = (4, 8, 10, 14, 8, 6)
    lower_limits = range(25, 85, 10)
    midpoints = [Fraction(2 * low + 9, 2) for low in lower_limits]
    total = sum(frequencies)
    mean = sum(frequency * midpoint for frequency, midpoint in zip(frequencies, midpoints)) / total
    lower_boundary = Fraction(109, 2)
    mode = lower_boundary + 10 * Fraction(14 - 10, (14 - 10) + (14 - 8))
    median = lower_boundary + 10 * (Fraction(total, 2) - sum(frequencies[:3])) / frequencies[3]
    for language, expected in (("en", (mode, mean, median)), ("ta", (mean, median, mode))):
        math = [segment["fallback"].split("≈")[0].strip()
                for segment in record["answerMath"][language] if isinstance(segment, dict)]
        assert tuple(map(Fraction, math)) == expected
    print(f"PASS Grade 9 8.3 Q6: mode {mode}, mean {mean}, median {median} in EN and TA.")


def listed_wages_check(record):
    wages = (310, 290, 320, 280, 300, 290, 320, 310, 280)
    mean = sp.Rational(sum(wages), len(wages))
    variance = sum((wage - mean) ** 2 for wage in wages) / len(wages)
    expected = (variance, sp.sqrt(variance))
    for language in ("en", "ta"):
        value = record["answerMath"][language]
        fallback = value[1]["fallback"] if isinstance(value, list) else value["fallback"]
        exact_results = tuple(expression(term.split("=", 1)[1].split("≈", 1)[0].strip())
                              for term in fallback.split(";") if "=" in term)
        assert exact_results == expected
    assert "ஒன்பது" in record["answerMath"]["ta"][0]
    print(f"PASS Grade 10 8.1 Q5 conditional calculation: mean {mean}, variance {variance}, deviation {expected[1]}.")


if __name__ == "__main__":
    catalogue = json.loads(Path(sys.argv[1]).read_text())
    records = {i["id"]: i for chapter in catalogue["chapters"] for i in chapter["items"]}
    for number, result in expected().items():
        record = records[f"c10-8-ex8-4-q{number}"]
        for language in ("en", "ta"):
            actual = record["answer"][language].replace(";", ",")
            assert tuple(Fraction(term.rsplit("=", 1)[-1].strip()) for term in actual.split(",")) == result
        print(f"PASS Grade 10 8.4 Q{number}: {', '.join(map(str, result))} in EN and TA.")
    grouped_weight_check(records["g9-ch8-ex8.3-q6"])
    listed_wages_check(records["c10-8-ex8-1-q5"])
