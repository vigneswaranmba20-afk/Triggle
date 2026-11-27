"""TRACE MathGuard V1.4b — 240-Case Deterministic Adversarial & Property-Based Suite.

Covers 12 categories (20 cases each = 240 cases) with positive controls,
deliberately incorrect claims, and legitimate abstentions:
1. Function binding
2. Polynomial evaluation
3. Factor & remainder theorem
4. Equation chains & aligned LaTeX
5. Simultaneous equations & proportion chains
6. Variable scoping & subpart isolation
7. Root-set & extraneous-solution validation
8. Polynomial GCD & LCM
9. Vieta's formulas
10. Dimensional & geometric reasoning
11. Unit conversions
12. Bilingual EN/TA mathematical semantic parity
"""

from __future__ import annotations

import random
from dataclasses import dataclass
from typing import Any, Dict, List

import sympy as sp

from .adapters.base import verify_tamil_math_parity
from .reasoning_engine import _verify_unit_conversion_statement, verify_complete_working
from .symbolic_reasoning import PolynomialReasoner


@dataclass
class AdversarialV14bCase:
    case_id: str
    category: str
    kind: str  # "working" | "unit" | "poly_gcd" | "poly_rem" | "tamil"
    payload: Dict[str, Any]
    allow_positive_domain: bool
    expected: str  # "PASS" | "FAIL" | "NON_PASS" | "UNVERIFIABLE"


def _mk(qid: str, q_en: str, steps: List[Dict[str, Any]], ans: str = "", q_ta: str = "") -> Dict[str, Any]:
    return {"id": qid, "q": {"en": q_en, "ta": q_ta}, "steps": steps, "answer": {"en": ans}}


def build_v1_4b_adversarial_cases() -> List[AdversarialV14bCase]:
    rng = random.Random(20261125)
    cases: List[AdversarialV14bCase] = []

    # 1. Function binding (20 cases: 8 PASS, 8 FAIL, 4 UNVERIFIABLE)
    for i in range(1, 9):
        a = rng.randint(2, 9)
        b = rng.randint(1, 12)
        x0 = rng.randint(-4, 5)
        val = a * x0**2 - b * x0 + 3
        cases.append(AdversarialV14bCase(
            f"v14b-fn-ok-{i}", "function_binding", "working",
            _mk(f"fn_ok_{i}", f"If p(x) = {a}x^2 - {b}x + 3, find p({x0}).", [
                {"math": {"latex": f"p({x0}) = {a}({x0})^2 - {b}({x0}) + 3 = {val}"}}
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-fn-bad-{i}", "function_binding", "working",
            _mk(f"fn_bad_{i}", f"If p(x) = {a}x^2 - {b}x + 3, find p({x0}).", [
                {"math": {"latex": f"p({x0}) = {val + rng.choice([1, -1, 2, -3])}"}}
            ]), False, "FAIL",
        ))
    for i in range(1, 5):
        cases.append(AdversarialV14bCase(
            f"v14b-fn-unv-{i}", "function_binding", "working",
            _mk(f"fn_unv_{i}", f"Find g({i}).", [
                {"math": {"latex": f"g({i}) = {i + 5}"}}
            ]), False, "UNVERIFIABLE",
        ))

    # 2. Polynomial evaluation (20 cases: 10 PASS, 10 FAIL; radicals, fractions, symbolic)
    for i in range(1, 6):
        a = rng.randint(2, 7)
        b = rng.randint(1, 9)
        cases.append(AdversarialV14bCase(
            f"v14b-peval-sym-ok-{i}", "polynomial_evaluation", "working",
            _mk(f"pe_sok_{i}", f"Verify p(x) = {a}x + {b} at x = -{b}/{a}.", [
                {"math": {"latex": rf"p\left(-\dfrac{{{b}}}{{{a}}}\right) = {a}\left(-\dfrac{{{b}}}{{{a}}}\right) + {b} = 0"}}
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-peval-sym-bad-{i}", "polynomial_evaluation", "working",
            _mk(f"pe_sbad_{i}", f"Verify p(x) = {a}x + {b} at x = -{b}/{a}.", [
                {"math": {"latex": rf"p\left(-\dfrac{{{b}}}{{{a}}}\right) = {b}"}}
            ]), False, "FAIL",
        ))
    for i in range(1, 6):
        k = rng.randint(2, 6)
        cases.append(AdversarialV14bCase(
            f"v14b-peval-rad-ok-{i}", "polynomial_evaluation", "working",
            _mk(f"pe_rok_{i}", f"If p(x) = x^2 - {k}, find p(\\sqrt{{{k}}}).", [
                {"math": {"latex": rf"p(\sqrt{{{k}}}) = (\sqrt{{{k}}})^2 - {k} = 0"}}
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-peval-rad-bad-{i}", "polynomial_evaluation", "working",
            _mk(f"pe_rbad_{i}", f"If p(x) = x^2 - {k}, find p(\\sqrt{{{k}}}).", [
                {"math": {"latex": rf"p(\sqrt{{{k}}}) = {k}"}}
            ]), False, "FAIL",
        ))

    # 3. Factor and remainder theorem (20 cases: 10 PASS, 10 FAIL)
    x = sp.Symbol("x")
    for i in range(1, 11):
        r1 = rng.randint(-5, 5)
        c1 = rng.randint(1, 6)
        rem_true = rng.randint(1, 9) if i > 5 else 0
        poly = sp.expand((x - r1) * (x + c1) + rem_true)
        cases.append(AdversarialV14bCase(
            f"v14b-rem-ok-{i}", "factor_remainder_theorem", "poly_rem",
            {"poly": poly, "divisor": x - r1, "rem": sp.Integer(rem_true)},
            False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-rem-bad-{i}", "factor_remainder_theorem", "poly_rem",
            {"poly": poly, "divisor": x - r1, "rem": sp.Integer(rem_true + 1)},
            False, "FAIL",
        ))

    # 4. Equation chains & aligned LaTeX (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        a = rng.randint(2, 6)
        b = rng.randint(1, 5)
        cases.append(AdversarialV14bCase(
            f"v14b-chain-ok-{i}", "equation_chains", "working",
            _mk(f"ch_ok_{i}", "Simplify.", [
                {"math": {"latex": rf"\begin{{aligned}}(x+{a})(x+{b})&=x^2+{a+b}x+{a*b}\\&=x^2+{a}x+{b}x+{a*b}\end{{aligned}}"}}
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-chain-bad-{i}", "equation_chains", "working",
            _mk(f"ch_bad_{i}", "Simplify.", [
                {"math": {"latex": rf"\begin{{aligned}}(x+{a})(x+{b})&=x^2+{a+b}x+{a*b}\\&=x^2+{a+b+1}x+{a*b}\end{{aligned}}"}}
            ]), False, "FAIL",
        ))

    # 5. Simultaneous equations & proportion chains (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        xv = rng.randint(2, 8)
        yv = rng.randint(2, 8)
        d1, d2, d3 = 2, 3, 5
        cases.append(AdversarialV14bCase(
            f"v14b-sim-ok-{i}", "simultaneous_equations", "working",
            _mk(f"sim_ok_{i}", "Solve by cross multiplication.", [
                {"math": {"latex": rf"\dfrac{{x}}{{{xv * d1}}} = \dfrac{{y}}{{{yv * d1}}} = \dfrac{{1}}{{{d1}}}"}},
                {"math": {"latex": f"x = {xv},\\; y = {yv}"}},
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-sim-bad-{i}", "simultaneous_equations", "working",
            _mk(f"sim_bad_{i}", "Solve.", [
                {"math": {"latex": f"x + y = {xv + yv}"}},
                {"math": {"latex": f"x + y = {xv + yv + 3}"}},
            ]), False, "FAIL",
        ))

    # 6. Variable scoping & subpart isolation (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        v1 = rng.randint(3, 8)
        v2 = v1 + rng.randint(2, 6)
        cases.append(AdversarialV14bCase(
            f"v14b-scope-ok-{i}", "variable_scoping", "working",
            _mk(f"sc_ok_{i}", "Find AB in each subpart.", [
                {"en": "(i) First triangle", "math": {"latex": f"(i)\\; AB^2 = {v1}^2 = {v1**2}"}},
                {"en": "(ii) Second triangle", "math": {"latex": f"(ii)\\; AB^2 = {v2}^2 = {v2**2}"}},
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-scope-bad-{i}", "variable_scoping", "working",
            _mk(f"sc_bad_{i}", f"A cylinder has radius {v1} cm.", [
                {"math": {"latex": f"r = {v2}"}}
            ]), True, "FAIL",
        ))

    # 7. Root-set & extraneous-solution validation (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        r1 = i
        r2 = i + 2
        s_sum = r1 + r2
        s_prod = r1 * r2
        cases.append(AdversarialV14bCase(
            f"v14b-root-ok-{i}", "root_set_validation", "working",
            _mk(f"rt_ok_{i}", f"Solve x^2 - {s_sum}x + {s_prod} = 0.", [
                {"math": {"latex": f"x^2 - {s_sum}x + {s_prod} = 0"}},
                {"math": {"latex": f"x = {r1}, {r2}"}},
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-root-bad-{i}", "root_set_validation", "working",
            _mk(f"rt_bad_{i}", f"Solve x^2 - {s_sum}x + {s_prod} = 0.", [
                {"math": {"latex": f"x^2 - {s_sum}x + {s_prod} = 0"}},
                {"math": {"latex": f"x = {r1}, {r2 + 1}"}},
            ]), False, "FAIL",
        ))

    # 8. Polynomial GCD & LCM (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        a = rng.randint(1, 5)
        b = rng.randint(6, 10)
        c = rng.randint(11, 15)
        p1 = sp.expand((x - a) * (x - b))
        p2 = sp.expand((x - a) * (x - c))
        cases.append(AdversarialV14bCase(
            f"v14b-gcd-ok-{i}", "polynomial_gcd_lcm", "poly_gcd",
            {"p1": p1, "p2": p2, "gcd": x - a, "lcm": sp.expand((x - a) * (x - b) * (x - c))},
            False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-gcd-bad-{i}", "polynomial_gcd_lcm", "poly_gcd",
            {"p1": p1, "p2": p2, "gcd": x - b, "lcm": sp.expand((x - a) * (x - b) * (x - c))},
            False, "FAIL",
        ))

    # 9. Vieta's formulas (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        a = rng.randint(2, 5)
        b = rng.randint(1, 9)
        c = rng.randint(1, 9)
        cases.append(AdversarialV14bCase(
            f"v14b-vieta-ok-{i}", "vietas_formulas", "working",
            _mk(f"vt_ok_{i}", f"For {a}x^2 + {b}x + {c} = 0, find sum and product of roots.", [
                {"math": {"latex": rf"\alpha + \beta = -\dfrac{{{b}}}{{{a}}}"}},
                {"math": {"latex": rf"\alpha \beta = \dfrac{{{c}}}{{{a}}}"}},
            ]), False, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-vieta-bad-{i}", "vietas_formulas", "working",
            _mk(f"vt_bad_{i}", f"For {a}x^2 + {b}x + {c} = 0, find sum of roots.", [
                {"math": {"latex": rf"\alpha + \beta = \dfrac{{{b}}}{{{a}}}"}},
            ]), False, "FAIL",
        ))

    # 10. Dimensional & geometric reasoning (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 6):
        cases.append(AdversarialV14bCase(
            f"v14b-dim-ok-{i}", "dimensional_analysis", "working",
            _mk(f"dm_ok_{i}", f"A cuboid has base area {10*i} cm² and height {i+2} cm.", [
                {"math": {"latex": "V = A_{base} h"}},
            ]), True, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-dim-bad-{i}", "dimensional_analysis", "working",
            _mk(f"dm_bad_{i}", f"Find volume of solid with r = {i+1} cm, h = {i+3} cm.", [
                {"math": {"latex": r"V = \pi r h"}},
            ]), True, "FAIL",
        ))
    for i in range(6, 11):
        cases.append(AdversarialV14bCase(
            f"v14b-geom-ok-{i}", "dimensional_analysis", "working",
            _mk(f"gm_ok_{i}", "Verify LSA.", [
                {"math": {"latex": f"l = {i},\\; b = {i+1},\\; h = {i+2}"}},
                {"math": {"latex": f"LSA = 2(l+b)h = 2({i}+{i+1})\\times {i+2} = {2*(2*i+1)*(i+2)}"}},
            ]), True, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-geom-bad-{i}", "dimensional_analysis", "working",
            _mk(f"gm_bad_{i}", "Find volume of a cone with radius 7 cm and height 12 cm.", [
                {"math": {"latex": r"V = \pi r^2 h"}},
            ]), True, "FAIL",
        ))

    # 11. Unit conversions (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 11):
        m3 = i * 25
        litres = m3 * 1000
        cases.append(AdversarialV14bCase(
            f"v14b-unit-ok-{i}", "unit_conversions", "unit",
            {"expr": f"{litres:,} litres = {m3} m³"}, True, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-unit-bad-{i}", "unit_conversions", "unit",
            {"expr": f"{litres:,} litres = {m3 // 5} m³"}, True, "FAIL",
        ))

    # 12. Bilingual EN/TA mathematical semantic parity (20 cases: 10 PASS, 10 FAIL)
    for i in range(1, 6):
        n = i + 2
        cases.append(AdversarialV14bCase(
            f"v14b-ta-ok-{i}", "bilingual_parity", "tamil",
            _mk(f"ta_ok_{i}", f"Find the area of square of side {n} cm.", [
                {"en": f"Side is {n} cm, square is {n*n}.", "ta": f"பக்கம் {n} செ.மீ, பரப்பளவு {n*n}.", "math": {"latex": f"A = {n}^2 = {n*n}"}}
            ], ans=f"{n*n} cm²", q_ta=f"{n} செ.மீ பக்க அளவுள்ள சதுரத்தின் பரப்பளவு காண்க."),
            True, "PASS",
        ))
        cases.append(AdversarialV14bCase(
            f"v14b-ta-bad-{i}", "bilingual_parity", "tamil",
            _mk(f"ta_bad_{i}", f"Find the area of square of side {n} cm.", [
                {"en": f"Side is {n} cm.", "ta": f"பக்கம் {n+3} செ.மீ.", "math": {"latex": f"a = {n}"}}
            ], ans=f"{n*n} cm²", q_ta=f"{n+3} செ.மீ பக்க அளவுள்ள சதுரத்தின் பரப்பளவு காண்க."),
            True, "FAIL",
        ))
    # Semantic equivalents (number words, 36 - 6 vs 30, 100 cm vs 1 m, 1/2 vs 0.5, sqrt(900+900) vs sqrt(1800))
    sem_pairs = [
        ("The exponent is four.", "அடுக்கு 4 ஆகும்.", "x^4", "PASS"),
        ("Compute 36 - 6.", "மதிப்பு 30 ஆகும்.", "36 - 6 = 30", "PASS"),
        ("Length is 100 cm.", "நீளம் 1 மீ.", "l = 100", "PASS"),
        ("Take 1/2 of base.", "அடிப்பக்கத்தில் 0.5 மடங்கு.", "0.5", "PASS"),
        ("Distance is √(900 + 900).", "தொலைவு √1800 ஆகும்.", "\\sqrt{1800}", "PASS"),
    ]
    for idx_s, (en_s, ta_s, ltx_s, exp_s) in enumerate(sem_pairs, 1):
        cases.append(AdversarialV14bCase(
            f"v14b-ta-sem-ok-{idx_s}", "bilingual_parity", "tamil",
            _mk(f"ts_ok_{idx_s}", "Evaluate.", [{"en": en_s, "ta": ta_s, "math": {"latex": ltx_s}}], q_ta="மதிப்பிடுக."),
            False, exp_s,
        ))
    for idx_p in range(1, 6):
        cases.append(AdversarialV14bCase(
            f"v14b-ta-ph-bad-{idx_p}", "bilingual_parity", "tamil",
            _mk(f"ts_ph_{idx_p}", f"Add {idx_p} and {idx_p + 1}.", [
                {"en": f"Sum is {2*idx_p + 1}.", "ta": "Tamil unchanged", "math": {"latex": f"{idx_p}+{idx_p+1}={2*idx_p+1}"}}
            ], q_ta=f"{idx_p} மற்றும் {idx_p+1} கூட்டவும்."),
            False, "FAIL",
        ))

    return cases


def run_v1_4b_adversarial_suite() -> Dict[str, Any]:
    cases = build_v1_4b_adversarial_cases()
    passed = 0
    false_acceptances = 0
    false_rejections = 0
    abstentions = 0
    failures: List[Dict[str, Any]] = []

    for c in cases:
        if c.kind == "working":
            obs = verify_complete_working(c.payload, is_concept=False, allow_positive_domain=c.allow_positive_domain).status
        elif c.kind == "unit":
            uv = _verify_unit_conversion_statement(c.payload["expr"])
            obs = "PASS" if uv is True else ("FAIL" if uv is False else "UNVERIFIABLE")
        elif c.kind == "poly_rem":
            ok = PolynomialReasoner.verify_remainder_theorem(c.payload["poly"], c.payload["divisor"], c.payload["rem"])
            obs = "PASS" if ok is True else ("FAIL" if ok is False else "UNVERIFIABLE")
        elif c.kind == "poly_gcd":
            ok = PolynomialReasoner.verify_gcd_lcm(c.payload["p1"], c.payload["p2"], claimed_gcd=c.payload["gcd"], claimed_lcm=c.payload["lcm"])
            obs = "PASS" if ok is True else ("FAIL" if ok is False else "UNVERIFIABLE")
        elif c.kind == "tamil":
            obs = verify_tamil_math_parity(c.payload, is_concept=False).status
        else:
            obs = "UNVERIFIABLE"

        if c.expected == "PASS":
            ok = obs == "PASS"
            if not ok:
                false_rejections += 1
        elif c.expected == "FAIL":
            ok = obs == "FAIL"
            if obs == "PASS":
                false_acceptances += 1
            elif obs != "FAIL":
                abstentions += 1
        elif c.expected == "UNVERIFIABLE":
            ok = obs in ("UNVERIFIABLE", "PARTIAL")
            if obs == "PASS":
                false_acceptances += 1
        else:
            ok = obs != "PASS"
            if obs == "PASS":
                false_acceptances += 1

        if ok:
            passed += 1
        else:
            failures.append({"case_id": c.case_id, "category": c.category, "expected": c.expected, "observed": obs})

    return {
        "totalCases": len(cases),
        "passed": passed,
        "failed": len(cases) - passed,
        "falseAcceptances": false_acceptances,
        "falseRejections": false_rejections,
        "abstentions": abstentions,
        "failures": failures,
    }
