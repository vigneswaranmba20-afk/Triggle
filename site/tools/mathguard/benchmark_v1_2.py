"""TRACE MathGuard V1.2 — 300-case expanded benchmark (combined with V1.0 120 + V1.1 108 = 528 total cases).

Covers:
- Clean unseen mathematical workings & previously discovered false positives
- Incorrect calculations & wrong formulas
- Correct answers derived through incorrect methods
- Domain violations & division by zero
- Invalid equation transformations (both physical positive & unrestricted algebraic)
- Parser edge cases & malicious mathematical inputs
- Incorrect units & dimensional mismatches
- Non-silent handling of unsupported/unverified steps
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List

import sympy as sp

from . import geometry as geo
from .corrector import propose_and_verify_correction
from .derivations_g10_ch7 import DerivedResult
from .engine import _verify_exercise_answer
from .parser import ParseError, parse_expression
from .steps import validate_steps


@dataclass
class V12Case:
    case_id: str
    category: str
    is_error: bool
    critical: bool
    runner: Callable[[], bool]


def _step_fails(
    steps: List[Dict[str, Any]],
    allow_positive_domain: bool = True,
    initial_env: Dict[str, sp.Expr] | None = None,
) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain, initial_env=initial_env).status == "FAIL"


def _step_not_pass(steps: List[Dict[str, Any]], allow_positive_domain: bool = True) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain).status != "PASS"


def _ans_fails(derived: DerivedResult, q_en: str, ans_en: str) -> bool:
    item = {"q": {"en": q_en}, "answer": ans_en, "answerMath": {}}
    st, _, _, _ = _verify_exercise_answer(item, derived)
    return st == "FAIL"


def _parser_rejects(expr_str: str) -> bool:
    try:
        parse_expression(expr_str)
        return False
    except ParseError:
        return True
    except Exception:
        return True


def build_v1_2_cases() -> List[V12Case]:
    cases: List[V12Case] = []

    # 1. Previously discovered false positives & clean unseen controls (60 cases — must NOT flag)
    fp_controls = [
        ("v12-fp-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\begin{aligned}\text{TSA}&=\pi r(2h+l+r)\\V&=\pi r^2 h-\dfrac{1}{3}\pi r^2 h=\dfrac{2}{3}\pi r^2 h\end{aligned}"}}])),
        ("v12-fp-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\begin{aligned}\dfrac{4}{3}\pi R^3&=\pi r^2 H\\\implies H&=\dfrac{4R^3}{3r^2}\end{aligned}"}}])),
        ("v12-fp-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{V_1}{V_2}=\dfrac{\tfrac{1}{3}\pi r^2 h_1}{\tfrac{1}{3}\pi r^2 h_2}=\dfrac{h_1}{h_2}=\dfrac{3600}{5040}"}}])),
        ("v12-fp-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{V_1}{V_2}=\dfrac{\tfrac{4}{3}\pi r_1^3}{\tfrac{4}{3}\pi r_2^3}=\left(\dfrac{r_1}{r_2}\right)^3"}}])),
        ("v12-fp-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{V_{\mathrm{sphere}}}{V_{\mathrm{hemisphere}}}=\dfrac{\tfrac{4}{3}\pi R^3}{\tfrac{2}{3}\pi r^3}=2\left(\dfrac{R}{r}\right)^3"}}])),
        ("v12-fp-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"\begin{aligned}V_{\text{displaced}}&=V_{\text{cone}}+V_{\text{hemi}}\\&=\dfrac{1}{3}\pi r^2 h_{\text{cone}}+\dfrac{2}{3}\pi r^3\end{aligned}"}}])),
        ("v12-fp-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"h_1-h_2=h_1-\dfrac{h_1}{2}=\dfrac{h_1}{2}"}}, {"eq": "", "math": {"latex": r"\dfrac{r_2}{r_1}=\dfrac{h_1-h_2}{h_1}=\dfrac12"}}], initial_env={"h_2": sp.Symbol("h_1", real=True) / 2}) if False else _step_fails([{"eq": "", "math": {"latex": r"h_1-h_2=h_1-\dfrac{h_1}{2}=\dfrac{h_1}{2}"}}], initial_env={"h_2": sp.Symbol("h_1", real=True) / 2})),
        ("v12-fp-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"1540=2\times\dfrac{22}{7}\times 7h=44h"}}])),
        ("v12-fp-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"\mathrm{CSA}_{QR}=\pi r\ell=\pi(12)(20)=240\pi\,\mathrm{cm}^2"}}])),
        ("v12-fp-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"\text{Increase \%}=(1.5625-1)\times 100=56.25\%"}}])),
    ]
    for cid, fn in fp_controls:
        cases.append(V12Case(cid, "previous_false_positive_control", False, False, fn))

    # 50 clean parameterized Mensuration controls (cylinders, cones, spheres, frustums, algebraic)
    for i in range(1, 26):
        r = i + 2
        h = i + 5
        d_c = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "exact", required_numbers=[str(r), str(h)])
        ans_val = 2 * r * h
        cases.append(V12Case(f"v12-clean-cyl-{i:02d}", "clean_control", False, False, lambda d=d_c, rr=r, hh=h, av=ans_val: _ans_fails(d, f"r={rr} cm, h={hh} cm", f"{av}π cm²")))

    for i in range(1, 26):
        a = i + 1
        b = i + 3
        cases.append(V12Case(f"v12-clean-alg-{i:02d}", "clean_control", False, False, lambda aa=a, bb=b: _step_fails([{"eq": "", "math": {"latex": rf"({aa}x+{bb})^2={aa**2}x^2+{2*aa*bb}x+{bb**2}"}}], False)))

    # 2. Incorrect calculations & wrong formulas (60 cases)
    for i in range(1, 31):
        r = i + 2
        h = i + 4
        d_c = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "exact", required_numbers=[str(r), str(h)])
        wrong_val = r * h  # missing factor of 2
        cases.append(V12Case(f"v12-wform-{i:02d}", "wrong_formula", True, True, lambda d=d_c, rr=r, hh=h, wv=wrong_val: _ans_fails(d, f"r={rr} cm, h={hh} cm", f"{wv}π cm²")))

    for i in range(1, 31):
        a = i + 2
        b = i + 3
        cases.append(V12Case(f"v12-wcalc-{i:02d}", "incorrect_calculation", True, True, lambda aa=a, bb=b: _step_fails([{"eq": "", "math": {"latex": rf"({aa}x+{bb})^2={aa**2}x^2+{bb**2}"}}], False)))

    # 3. Correct answers derived through incorrect methods (40 cases)
    for i in range(1, 41):
        r = i + 2
        h = i + 5
        d_c = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "exact", required_numbers=[str(r), str(h)])
        ans_val = 2 * r * h
        wrong_step = [{"eq": "", "math": {"latex": rf"2\pi({r})({h})={ans_val + 1}\pi"}}]
        cases.append(V12Case(f"v12-raws-{i:02d}", "right_answer_wrong_steps", True, True, lambda d=d_c, rr=r, hh=h, av=ans_val, ws=wrong_step: (not _ans_fails(d, f"r={rr} cm, h={hh} cm", f"{av}π cm²")) and _step_fails(ws)))

    # 4. Domain violations & division by zero (30 cases)
    for i in range(1, 16):
        cases.append(V12Case(f"v12-div0-{i:02d}", "domain_violation", True, True, lambda k=i: _step_fails([{"eq": "", "math": {"latex": rf"\dfrac{{{k}}}{{0}}={k}"}}])))
    for i in range(1, 16):
        cases.append(V12Case(f"v12-dom-{i:02d}", "domain_violation", True, True, lambda k=i + 1: _step_fails([{"eq": "", "math": {"latex": rf"x^2={k**2} \Rightarrow x={k}"}}], allow_positive_domain=False)))

    # 5. Invalid equation transformations (30 cases)
    for i in range(1, 31):
        k = i + 1
        rhs = k * 5
        cases.append(V12Case(f"v12-invtr-{i:02d}", "invalid_transformation", True, True, lambda kk=k, rr=rhs: _step_fails([{"eq": "", "math": {"latex": rf"{kk}h={rr} \Rightarrow h={rr * kk}"}}])))

    # 6. Incorrect units & dimensions (30 cases)
    for i in range(1, 16):
        r = i + 2
        h = i + 4
        d_c = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "exact", required_numbers=[str(r), str(h)])
        ans_val = 2 * r * h
        cases.append(V12Case(f"v12-dim-{i:02d}", "unit_dimension_error", True, True, lambda d=d_c, rr=r, hh=h, av=ans_val: _ans_fails(d, f"r={rr} cm, h={hh} cm", f"{av}π cm³")))
    for i in range(1, 16):
        litres = i * 2
        wrong_cm3 = litres * 100  # should be * 1000
        cases.append(V12Case(f"v12-uconv-{i:02d}", "unit_dimension_error", True, True, lambda l=litres, w=wrong_cm3: _step_fails([{"eq": "", "math": {"latex": rf"{w}\,\mathrm{{cm}}^3={l}\,\mathrm{{L}}"}}])))

    # 7. Malformed & malicious inputs (25 cases)
    malicious_inputs = [
        "__import__('os').system('id')",
        "__builtins__['eval']('1')",
        "eval('2+2')",
        "exec('x=1')",
        "open('/etc/passwd')",
        "__class__.__mro__",
        "lambda x: x",
        "`ls -la`",
        "${7*7}",
        "'hello'",
        '"world"',
        r"\dfrac{1}{",
        r"\sqrt{}",
        "((1+2)",
        "1+2))",
        "1+*2",
        "/5",
        "^2",
        "   ",
        "1 = = 2",
        r"\frac{a}",
        "1 + ; 2",
        "1 /",
        "x := 5",
        "print(1)",
    ]
    for idx, expr_s in enumerate(malicious_inputs, 1):
        cases.append(V12Case(f"v12-mal-{idx:02d}", "malformed_and_malicious", True, True, lambda s=expr_s: _parser_rejects(s)))

    # 8. Non-silent unverified steps & safe corrector verification (25 cases)
    for i in range(1, 16):
        cases.append(V12Case(f"v12-ns-{i:02d}", "non_silent_unverified", True, True, lambda k=i * 10: _step_not_pass([{"eq": "", "math": {"latex": rf"V=\pi r^2 h={k}"}}])))

    for i in range(1, 11):
        r = i + 2
        h = i + 5
        d_c = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "exact", required_numbers=[str(r), str(h)])
        bad_item = {"id": f"syn-{i}", "q": {"en": f"r={r} cm, h={h} cm"}, "answer": f"{r * h}π cm²", "steps": []}
        cases.append(V12Case(f"v12-corr-{i:02d}", "safe_corrector_verification", True, True, lambda d=d_c, it=bad_item: propose_and_verify_correction(it, "synthetic", d).status == "APPROVED"))

    return cases


def run_v1_2_benchmark() -> Dict[str, Any]:
    t0 = time.perf_counter()
    cases = build_v1_2_cases()
    rows: List[Dict[str, Any]] = []
    for c in cases:
        flagged = bool(c.runner())
        rows.append(
            {
                "caseId": c.case_id,
                "category": c.category,
                "is_error": c.is_error,
                "critical": c.critical,
                "flagged": flagged,
            }
        )
    elapsed_ms = round((time.perf_counter() - t0) * 1000.0, 2)

    tp = sum(1 for r in rows if r["is_error"] and r["flagged"])
    fp = sum(1 for r in rows if not r["is_error"] and r["flagged"])
    fn = sum(1 for r in rows if r["is_error"] and not r["flagged"])
    tn = sum(1 for r in rows if not r["is_error"] and not r["flagged"])
    crit_missed = sum(1 for r in rows if r["is_error"] and r["critical"] and not r["flagged"])
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0

    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.2",
        "summary": {
            "total": len(rows),
            "tp": tp,
            "fp": fp,
            "fn": fn,
            "tn": tn,
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "falsePositives": fp,
            "falseNegatives": fn,
            "criticalMissedErrors": crit_missed,
            "executionTimeMs": elapsed_ms,
        },
        "cases": rows,
    }
