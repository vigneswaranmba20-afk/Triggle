"""Cross-check six source-reviewed probability answers through independent enumeration."""
import json
import sys
from fractions import Fraction
from itertools import product
from math import isqrt
from pathlib import Path


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


if __name__ == "__main__":
    catalogue = json.loads(Path(sys.argv[1]).read_text())
    records = {i["id"]: i for chapter in catalogue["chapters"] for i in chapter["items"]}
    for number, result in expected().items():
        record = records[f"c10-8-ex8-4-q{number}"]
        for language in ("en", "ta"):
            actual = record["answer"][language].replace(";", ",")
            assert tuple(Fraction(term.rsplit("=", 1)[-1].strip()) for term in actual.split(",")) == result
        print(f"PASS Grade 10 8.4 Q{number}: {', '.join(map(str, result))} in EN and TA.")
