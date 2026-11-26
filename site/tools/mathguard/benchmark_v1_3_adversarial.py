"""TRACE MathGuard V1.3 — Frozen 186-Case Structurally Distinct Independent Adversarial Benchmark.

Frozen BEFORE V1.3 engine modifications. Each case tests a structurally distinct
mathematical scenario rather than repeated numerical substitutions.
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List

import sympy as sp

from . import geometry as geo
from .derivations_g10_ch7 import DerivedResult
from .engine import _verify_exercise_answer
from .steps import validate_steps


@dataclass(frozen=True)
class AdversarialCase:
    case_id: str
    category: str
    is_error: bool
    critical: bool
    runner: Callable[[], bool]


def _step_fails(steps: List[Dict[str, Any]], allow_positive_domain: bool = True) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain).status == "FAIL"


def _ans_fails(derived: DerivedResult, q_en: str, ans_en: str) -> bool:
    item = {"q": {"en": q_en}, "answer": ans_en, "answerMath": {}}
    st, _, _, _ = _verify_exercise_answer(item, derived)
    return st == "FAIL"


def _raws(derived: DerivedResult, q_en: str, ans_en: str, steps: List[Dict[str, Any]]) -> bool:
    return (not _ans_fails(derived, q_en, ans_en)) and _step_fails(steps)


def build_adversarial_cases() -> List[AdversarialCase]:
    cases: List[AdversarialCase] = []

    # 1. Correct final answers obtained through incorrect reasoning (13)
    raws_cases = [
        ("adv-raws-01", lambda: _raws(DerivedResult(True, "cyl", sp.Integer(440), "area", "22/7", required_numbers=["7", "10"]), "r=7, h=10", "440 cm²", [{"eq": "", "math": {"latex": r"A=\pi(7)(10)=440"}}])),
        ("adv-raws-02", lambda: _raws(DerivedResult(True, "cone", sp.Integer(13), "length", "exact", required_numbers=["5", "12"]), "r=5, h=12", "13 cm", [{"eq": "", "math": {"latex": r"\ell=5+12=13"}}])),
        ("adv-raws-03", lambda: _raws(DerivedResult(True, "sph", sp.Integer(36) * sp.pi, "volume", "exact", required_numbers=["3"]), "r=3", "36π cm³", [{"eq": "", "math": {"latex": r"V=\dfrac43\pi(3)^2=36\pi"}}])),
        ("adv-raws-04", lambda: _raws(DerivedResult(True, "frust", sp.Integer(52) * sp.pi, "volume", "exact", required_numbers=["5", "2", "4"]), "R=5, r=2, h=4", "52π cm³", [{"eq": "", "math": {"latex": r"V=\dfrac13\pi(4)(25+4)=52\pi"}}])),
        ("adv-raws-05", lambda: _raws(DerivedResult(True, "hemi", sp.Integer(147) * sp.pi, "area", "exact", required_numbers=["7"]), "r=7", "147π cm²", [{"eq": "", "math": {"latex": r"\text{TSA}=2\pi(7)^2=147\pi"}}])),
        ("adv-raws-06", lambda: _raws(DerivedResult(True, "alg", sp.Integer(5), None, "exact"), "2x+3=13", "5", [{"eq": "", "math": {"latex": r"2x=16 \Rightarrow x=5"}}])),
        ("adv-raws-07", lambda: _raws(DerivedResult(True, "alg", sp.Integer(4), None, "exact"), "x^2-8x+16=0", "4", [{"eq": "", "math": {"latex": r"(x-4)(x+4)=0 \Rightarrow x=4"}}])),
        ("adv-raws-08", lambda: _raws(DerivedResult(True, "cg_dist", sp.Integer(5), "length", "exact"), "(0,0) to (3,4)", "5", [{"eq": "", "math": {"latex": r"d=\sqrt{3^2-4^2}=5"}}])),
        ("adv-raws-09", lambda: _raws(DerivedResult(True, "cg_slope", sp.Integer(2), None, "exact"), "(1,2) to (3,6)", "2", [{"eq": "", "math": {"latex": r"m=\dfrac{3-1}{6-2}=2"}}])),
        ("adv-raws-10", lambda: _raws(DerivedResult(True, "unit", sp.Integer(2500), "volume", "exact"), "2.5 m³", "2500 litres", [{"eq": "", "math": {"latex": r"2.5\times 100=2500"}}])),
        ("adv-raws-11", lambda: _raws(DerivedResult(True, "ratio", (sp.Integer(1), sp.Integer(4)), None, "exact"), "r halved", "1:4", [{"eq": "", "math": {"latex": r"\dfrac{V_1}{V_2}=\dfrac{1}{2}=1:4"}}])),
        ("adv-raws-12", lambda: _raws(DerivedResult(True, "pct", sp.Integer(5625) / 100, "percentage", "exact"), "25% increase", "56.25%", [{"eq": "", "math": {"latex": r"(1.25)^2=56.25"}}])),
        ("adv-raws-13", lambda: _raws(DerivedResult(True, "cube", sp.Integer(294), "area", "exact"), "a=7", "294 cm²", [{"eq": "", "math": {"latex": r"4\times 7^2=294"}}])),
    ]
    for cid, fn in raws_cases:
        cases.append(AdversarialCase(cid, "right_answer_wrong_reasoning", True, True, fn))

    # 2. Missing variables in formulas (13)
    missing_var_cases = [
        ("adv-mvar-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\pi r^2 h-\dfrac{1}{3}\pi r^2=\dfrac{2}{3}\pi r^2 h"}}])),
        ("adv-mvar-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"2\pi r h+2\pi r=2\pi r(r+h)"}}])),
        ("adv-mvar-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\pi(R+r)\ell+\pi R^2=\pi(R+r)\ell+\pi R^2+\pi r^2"}}])),
        ("adv-mvar-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"(a+b)^2=a^2+2a+b^2"}}], False)),
        ("adv-mvar-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"(x-y)^2=x^2-2xy+y"}}], False)),
        ("adv-mvar-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1}{3}\pi h(R^2+R+r^2)=\dfrac{1}{3}\pi h(R^2+Rr+r^2)"}}])),
        ("adv-mvar-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"2(lb+bh+hl)=2(lb+bh+l)"}}], False)),
        ("adv-mvar-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4}{3}\pi R^3-\dfrac{4}{3}\pi r^2=\dfrac{4}{3}\pi(R^3-r^3)"}}])),
        ("adv-mvar-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"a^3-b^3=(a-b)(a^2+ab+b)"}}], False)),
        ("adv-mvar-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"a^3+b^3=(a+b)(a^2-a+b^2)"}}], False)),
        ("adv-mvar-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"b^2-4a=b^2-4ac"}}], False)),
        ("adv-mvar-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\pi r^2+\pi r\ell=\pi r(\ell+1)"}}])),
        ("adv-mvar-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"2\pi(R+r)h+2\pi(R^2-r)=2\pi(R+r)(R-r+h)"}}])),
    ]
    for cid, fn in missing_var_cases:
        cases.append(AdversarialCase(cid, "missing_variable_in_formula", True, True, fn))

    # 3. Incorrect cancellation (13)
    cancel_cases = [
        ("adv-canc-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x+2}{x}=2"}}], False)),
        ("adv-canc-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{a^2+b^2}{a+b}=a+b"}}], False)),
        ("adv-canc-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{3x+6}{3}=x+6"}}], False)),
        ("adv-canc-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{r_1^2-r_2^2}{r_1-r_2}=r_1-r_2"}}])),
        ("adv-canc-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{2\pi r h}{\pi r}=2h+1"}}])),
        ("adv-canc-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x^2-9}{x-3}=x-3"}}], False)),
        ("adv-canc-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4x+8}{2}=2x+8"}}], False)),
        ("adv-canc-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{a+b}{a-b}=-1"}}], False)),
        ("adv-canc-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x^2+x}{x}=x"}}], False)),
        ("adv-canc-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{R^3-r^3}{R-r}=R^2-r^2"}}])),
        ("adv-canc-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{5y-10}{5}=y-10"}}], False)),
        ("adv-canc-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{2x^2+4x}{2x}=x+4"}}], False)),
        ("adv-canc-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{a^2-b^2}{a+b}=a+b"}}], False)),
    ]
    for cid, fn in cancel_cases:
        cases.append(AdversarialCase(cid, "incorrect_cancellation", True, True, fn))

    # 4. Division by zero (13)
    div0_cases = [
        ("adv-div0-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1}{0}=1"}}])),
        ("adv-div0-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x}{x-x}=1"}}], False)),
        ("adv-div0-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{5-5}{2-2}=1"}}])),
        ("adv-div0-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4}{3-3}=4"}}])),
        ("adv-div0-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{10}{0}=0"}}])),
        ("adv-div0-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{a}{a-a}=0"}}], False)),
        ("adv-div0-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x+1}{0}=x+1"}}], False)),
        ("adv-div0-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{22}{7-7}=22"}}])),
        ("adv-div0-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{9}{3^2-9}=1"}}])),
        ("adv-div0-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{16}{4^2-16}=0"}}])),
        ("adv-div0-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{2r}{r-r}=2"}}])),
        ("adv-div0-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{h}{0}=h"}}])),
        ("adv-div0-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{100}{10-10}=10"}}])),
    ]
    for cid, fn in div0_cases:
        cases.append(AdversarialCase(cid, "division_by_zero", True, True, fn))

    # 5. Loss of roots (13)
    loss_roots = [
        ("adv-loss-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2=9 \Rightarrow x=3"}}], False)),
        ("adv-loss-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2=49 \Rightarrow x=7"}}], False)),
        ("adv-loss-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"x(x-2)=0 \Rightarrow x=2"}}], False)),
        ("adv-loss-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"(x-1)(x+4)=0 \Rightarrow x=1"}}], False)),
        ("adv-loss-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2-5x+6=0 \Rightarrow x=2"}}], False)),
        ("adv-loss-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"y^2-1=0 \Rightarrow y=1"}}], False)),
        ("adv-loss-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"t^2=16 \Rightarrow t=4"}}], False)),
        ("adv-loss-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"a^2-9a=0 \Rightarrow a=9"}}], False)),
        ("adv-loss-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2-100=0 \Rightarrow x=10"}}], False)),
        ("adv-loss-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"(z+3)(z-5)=0 \Rightarrow z=5"}}], False)),
        ("adv-loss-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"p^2+2p=0 \Rightarrow p=-2"}}], False)),
        ("adv-loss-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"4x^2=16 \Rightarrow x=2"}}], False)),
        ("adv-loss-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"m^2-12m+35=0 \Rightarrow m=5"}}], False)),
    ]
    for cid, fn in loss_roots:
        cases.append(AdversarialCase(cid, "loss_of_roots", True, True, fn))

    # 6. Extraneous roots & invalid root claims (13)
    extra_roots = [
        ("adv-extr-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{x+2}=-3 \Rightarrow x=7"}}], False)),
        ("adv-extr-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{x}=-4 \Rightarrow x=16"}}], False)),
        ("adv-extr-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{2x-1}=-5 \Rightarrow x=13"}}], False)),
        ("adv-extr-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"x+3=5 \Rightarrow x=2 \text{ or } x=-2"}}], False)),
        ("adv-extr-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"2x=6 \Rightarrow x=3"}} if False else {"eq": "", "math": {"latex": r"2x=6 \Rightarrow x^2=9"}}], False)),
        ("adv-extr-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"x-4=0 \Rightarrow x^2-16=0"}}], False)),
        ("adv-extr-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x-2}{x-2}=0 \Rightarrow x=2"}}], False)),
        ("adv-extr-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{x-1}=-2 \Rightarrow x=5"}}], False)),
        ("adv-extr-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"3x+1=7 \Rightarrow x=3"}}], False)),
        ("adv-extr-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"x+5=0 \Rightarrow x^2=25"}}], False)),
        ("adv-extr-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{x+9}=-1 \Rightarrow x=-8"}}], False)),
        ("adv-extr-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"2x-10=0 \Rightarrow x^2-25=0"}}], False)),
        ("adv-extr-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"y-3=0 \Rightarrow y^2-9=0"}}], False)),
    ]
    for cid, fn in extra_roots:
        cases.append(AdversarialCase(cid, "extraneous_roots", True, True, fn))

    # 7. Incorrect mathematical assumptions (diameter vs radius, slant vs vertical height) (13)
    bad_assumptions = [
        ("adv-assm-01", lambda: _ans_fails(DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(7), sp.Integer(10)), "area", "22/7"), "d=14, h=10", "880 cm²")),
        ("adv-assm-02", lambda: _ans_fails(DerivedResult(True, "cone", geo.cone_slant_height(sp.Integer(6), sp.Integer(8)), "length", "exact"), "d=12, h=8", "14.42 cm")),
        ("adv-assm-03", lambda: _ans_fails(DerivedResult(True, "sph", geo.sphere_sa(sp.Integer(5)), "area", "exact"), "d=10", "400π cm²")),
        ("adv-assm-04", lambda: _ans_fails(DerivedResult(True, "hemi", geo.hemisphere_volume(sp.Integer(3)), "volume", "exact"), "d=6", "144π cm³")),
        ("adv-assm-05", lambda: _ans_fails(DerivedResult(True, "cone_h", sp.Integer(12), "length", "exact"), "r=5, l=13", "13.93 cm")),
        ("adv-assm-06", lambda: _ans_fails(DerivedResult(True, "frust", geo.frustum_volume(sp.Integer(10), sp.Integer(4), sp.Integer(8)), "volume", "exact"), "D=20, d=8, h=8", "3328π cm³")),
        ("adv-assm-07", lambda: _ans_fails(DerivedResult(True, "cyl_v", geo.cylinder_volume(sp.Integer(5), sp.Integer(10)), "volume", "exact"), "d=10, h=10", "1000π cm³")),
        ("adv-assm-08", lambda: _ans_fails(DerivedResult(True, "cone_csa", geo.cone_csa(sp.Integer(7), sp.Integer(25)), "area", "22/7"), "r=7, h=24", "528 cm²")),  # used h instead of l
        ("adv-assm-09", lambda: _ans_fails(DerivedResult(True, "hollow", geo.hollow_cylinder_volume(sp.Integer(5), sp.Integer(3), sp.Integer(10)), "volume", "exact"), "R=5, r=3, h=10", "40π cm³")),  # (R-r)^2 instead of R^2-r^2
        ("adv-assm-10", lambda: _ans_fails(DerivedResult(True, "hemi_tsa", geo.hemisphere_tsa(sp.Integer(7)), "area", "exact"), "r=7", "98π cm²")),  # CSA instead of TSA
        ("adv-assm-11", lambda: _ans_fails(DerivedResult(True, "cube_hemi", sp.Integer(3325) / 10, "area", "22/7"), "a=7, d=7", "294 cm²")),
        ("adv-assm-12", lambda: _ans_fails(DerivedResult(True, "shell", geo.hollow_sphere_volume(sp.Integer(5), sp.Integer(3)), "volume", "exact"), "R=5, r=3", "32π/3 cm³")),
        ("adv-assm-13", lambda: _ans_fails(DerivedResult(True, "frust_csa", geo.frustum_csa(sp.Integer(12), sp.Integer(6), sp.Integer(10)), "area", "exact"), "R=12, r=6, h=8", "144π cm²")),  # used h instead of l
    ]
    for cid, fn in bad_assumptions:
        cases.append(AdversarialCase(cid, "incorrect_assumptions", True, True, fn))

    # 8. Incorrect theorem application (13)
    bad_theorems = [
        ("adv-thm-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{5^2-12^2}=13"}}])),
        ("adv-thm-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"5^2+12^2=13^2+1"}}])),
        ("adv-thm-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{3^2+4^2}=3+4"}}])),
        ("adv-thm-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x_1+x_2}{2}=\dfrac{3-7}{2}"}}]) if False else _step_fails([{"eq": "", "math": {"latex": r"\dfrac{3+7}{2}=2"}}])),
        ("adv-thm-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{(4-1)^2-(6-2)^2}=5"}}])),
        ("adv-thm-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"b^2-4ac=5^2+4(1)(6)"}}])),
        ("adv-thm-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"\alpha+\beta=\dfrac{b}{a}=\dfrac{-5}{2}"}}]) if False else _step_fails([{"eq": "", "math": {"latex": r"-\dfrac{5}{2}=\dfrac{5}{2}"}}])),
        ("adv-thm-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"1^2+2^2=3^2"}}])),
        ("adv-thm-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{8^2+15^2}=23"}}])),
        ("adv-thm-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"(x-2)^2=x^2-4"}}], False)),
        ("adv-thm-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"(a+b)^3=a^3+b^3"}}], False)),
        ("adv-thm-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1}{a}+\dfrac{1}{b}=\dfrac{1}{a+b}"}}], False)),
        ("adv-thm-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{a^2+b^2}=a+b"}}], False)),
    ]
    for cid, fn in bad_theorems:
        cases.append(AdversarialCase(cid, "incorrect_theorem", True, True, fn))

    # 9. Incorrect unit conversions (13)
    bad_units = [
        ("adv-unit-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"2500\,\mathrm{cm}^3=25\,\mathrm{L}"}}])),
        ("adv-unit-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"1.5\,\mathrm{m}^3=150\,\mathrm{L}"}}])),
        ("adv-unit-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"3\,\mathrm{m}^2=300\,\mathrm{cm}^2"}}])),
        ("adv-unit-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"40\,\mathrm{mm}=0.4\,\mathrm{cm}"}}])),
        ("adv-unit-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"5\,\mathrm{km}=500\,\mathrm{m}"}}])),
        ("adv-unit-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"200\,\mathrm{cm}^2=2\,\mathrm{m}^2"}}])),
        ("adv-unit-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"1\,\mathrm{m}^3=10000\,\mathrm{cm}^3"}}])),
        ("adv-unit-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"500\,\mathrm{cm}=50\,\mathrm{m}"}}])),
        ("adv-unit-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"12\,\mathrm{L}=1200\,\mathrm{cm}^3"}}])),
        ("adv-unit-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"0.5\,\mathrm{m}=5\,\mathrm{cm}"}}])),
        ("adv-unit-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"4\,\mathrm{cm}^2=40\,\mathrm{mm}^2"}}])),
        ("adv-unit-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"7\,\mathrm{cm}^3=70\,\mathrm{mm}^3"}}])),
        ("adv-unit-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"6\,\mathrm{L}=600\,\mathrm{ml}"}}])),
    ]
    for cid, fn in bad_units:
        cases.append(AdversarialCase(cid, "incorrect_unit_conversion", True, True, fn))

    # 10. Misleading approximations (13)
    bad_approx = [
        ("adv-apx-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{14}{3}\approx 4.50"}}])),
        ("adv-apx-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{2}\approx 1.50"}}])),
        ("adv-apx-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{3}\approx 1.80"}}])),
        ("adv-apx-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"216\times\dfrac{22}{7}\approx 678.80"}}])),
        ("adv-apx-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{22}{7}\approx 3.10"}}])),
        ("adv-apx-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4928}{3}\approx 1642.50"}}])),
        ("adv-apx-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{333}\approx 18.10"}}])),
        ("adv-apx-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1089}{14}\approx 77.60"}}])),
        ("adv-apx-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{6336}{7}\approx 905.00"}}])),
        ("adv-apx-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"418.36\approx 418.00"}}])),
        ("adv-apx-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4}{3}\approx 1.30"}}])),
        ("adv-apx-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{5}\approx 2.20"}}])),
        ("adv-apx-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"249\times\dfrac{22}{7}\approx 782.40"}}])),
    ]
    for cid, fn in bad_approx:
        cases.append(AdversarialCase(cid, "misleading_approximation", True, True, fn))

    # 11. Conflicting intermediate steps (13)
    conflicting = [
        ("adv-conf-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"r=7"}}, {"eq": "", "math": {"latex": r"2\pi r=2\pi(14)=88"}}])),
        ("adv-conf-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"h=10"}}, {"eq": "", "math": {"latex": r"V=\pi(3)^2 h=90\pi+10\pi"}}])),
        ("adv-conf-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"x=5"}}, {"eq": "", "math": {"latex": r"2x+1=12"}}], False)),
        ("adv-conf-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"a=3"}}, {"eq": "", "math": {"latex": r"a^2+1=11"}}], False)),
        ("adv-conf-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"R=10"}}, {"eq": "", "math": {"latex": r"R^2-4=90"}}])),
        ("adv-conf-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"k=4"}}, {"eq": "", "math": {"latex": r"5k=25"}}])),
        ("adv-conf-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"l=13"}}, {"eq": "", "math": {"latex": r"5l=60"}}])),
        ("adv-conf-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"r=6"}}, {"eq": "", "math": {"latex": r"4\pi r^2=140\pi"}}])),
        ("adv-conf-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"d=12"}}, {"eq": "", "math": {"latex": r"d^2=140"}}])),
        ("adv-conf-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"y=2"}}, {"eq": "", "math": {"latex": r"3y^2=15"}}], False)),
        ("adv-conf-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"m=3"}}, {"eq": "", "math": {"latex": r"2m+4=12"}}], False)),
        ("adv-conf-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"p=8"}}, {"eq": "", "math": {"latex": r"p/2=5"}}], False)),
        ("adv-conf-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"n=9"}}, {"eq": "", "math": {"latex": r"n-3=7"}}], False)),
    ]
    for cid, fn in conflicting:
        cases.append(AdversarialCase(cid, "conflicting_intermediate_steps", True, True, fn))

    # 12. Incorrect formula definitions followed by internally consistent arithmetic (13)
    bad_formula_consistent_arith = [
        ("adv-bfca-01", lambda: _ans_fails(DerivedResult(True, "hemi_tsa", geo.hemisphere_tsa(sp.Integer(7)), "area", "22/7"), "r=7", "308 cm²")),
        ("adv-bfca-02", lambda: _ans_fails(DerivedResult(True, "cone_v", geo.cone_volume(sp.Integer(3), sp.Integer(7)), "volume", "22/7"), "r=3, h=7", "198 cm³")),
        ("adv-bfca-03", lambda: _ans_fails(DerivedResult(True, "sph_sa", geo.sphere_sa(sp.Integer(7)), "area", "22/7"), "r=7", "308 cm²")),
        ("adv-bfca-04", lambda: _ans_fails(DerivedResult(True, "cyl_tsa", geo.cylinder_tsa(sp.Integer(7), sp.Integer(10)), "area", "22/7"), "r=7, h=10", "440 cm²")),
        ("adv-bfca-05", lambda: _ans_fails(DerivedResult(True, "frust_v", geo.frustum_volume(sp.Integer(5), sp.Integer(2), sp.Integer(3)), "volume", "exact"), "R=5, r=2, h=3", "29π cm³")),
        ("adv-bfca-06", lambda: _ans_fails(DerivedResult(True, "sph_v", geo.sphere_volume(sp.Integer(3)), "volume", "exact"), "r=3", "18π cm³")),
        ("adv-bfca-07", lambda: _ans_fails(DerivedResult(True, "hemi_v", geo.hemisphere_volume(sp.Integer(3)), "volume", "exact"), "r=3", "36π cm³")),
        ("adv-bfca-08", lambda: _ans_fails(DerivedResult(True, "cube_tsa", geo.cube_tsa(sp.Integer(5)), "area", "exact"), "a=5", "100 cm²")),
        ("adv-bfca-09", lambda: _ans_fails(DerivedResult(True, "cuboid_tsa", geo.cuboid_tsa(sp.Integer(2), sp.Integer(3), sp.Integer(4)), "area", "exact"), "2,3,4", "24 cm²")),
        ("adv-bfca-10", lambda: _ans_fails(DerivedResult(True, "cone_tsa", geo.cone_tsa(sp.Integer(3), sp.Integer(5)), "area", "exact"), "r=3, l=5", "15π cm²")),
        ("adv-bfca-11", lambda: _ans_fails(DerivedResult(True, "hollow_sph", geo.hollow_sphere_volume(sp.Integer(5), sp.Integer(3)), "volume", "exact"), "R=5, r=3", "392π/3 cm³" if False else "100π cm³")),
        ("adv-bfca-12", lambda: _ans_fails(DerivedResult(True, "hollow_hemi_tsa", geo.hollow_hemisphere_tsa(sp.Integer(5), sp.Integer(3)), "area", "exact"), "R=5, r=3", "68π cm²")),
        ("adv-bfca-13", lambda: _ans_fails(DerivedResult(True, "frust_l", geo.frustum_slant_height(sp.Integer(8), sp.Integer(2), sp.Integer(8)), "length", "exact"), "R=8, r=2, h=8", "14 cm")),
    ]
    for cid, fn in bad_formula_consistent_arith:
        cases.append(AdversarialCase(cid, "bad_formula_consistent_arith", True, True, fn))

    # 13. Structurally distinct clean controls (30 — must NOT flag)
    clean_controls = [
        ("adv-ctrl-01", lambda: _step_fails([{"eq": "", "math": {"latex": r"\text{TSA}=2\pi r(r+h)"}}])),
        ("adv-ctrl-02", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{V_1}{V_2}=\dfrac{\tfrac{1}{3}\pi r^2 h_1}{\tfrac{1}{3}\pi r^2 h_2}=\dfrac{h_1}{h_2}"}}])),
        ("adv-ctrl-03", lambda: _step_fails([{"eq": "", "math": {"latex": r"(a+b)^3=a^3+3a^2b+3ab^2+b^3"}}], False)),
        ("adv-ctrl-04", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2-9=(x-3)(x+3)"}}], False)),
        ("adv-ctrl-05", lambda: _step_fails([{"eq": "", "math": {"latex": r"x^2=9 \Rightarrow x^2-9=0"}}], False)),
        ("adv-ctrl-06", lambda: _step_fails([{"eq": "", "math": {"latex": r"r^2=25 \Rightarrow r=5"}}], True)),
        ("adv-ctrl-07", lambda: _step_fails([{"eq": "", "math": {"latex": r"1000\,\mathrm{cm}^3=1\,\mathrm{L}"}}])),
        ("adv-ctrl-08", lambda: _step_fails([{"eq": "", "math": {"latex": r"1\,\mathrm{m}^2=10000\,\mathrm{cm}^2"}}])),
        ("adv-ctrl-09", lambda: _step_fails([{"eq": "", "math": {"latex": r"50\,\mathrm{mm}=5\,\mathrm{cm}"}}])),
        ("adv-ctrl-10", lambda: _step_fails([{"eq": "", "math": {"latex": r"\sqrt{5^2+12^2}=13"}}])),
        ("adv-ctrl-11", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{4}{3}\pi(3)^3=36\pi"}}])),
        ("adv-ctrl-12", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{x^2-9}{x-3}=x+3"}}], False)),
        ("adv-ctrl-13", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{2x^2+4x}{2x}=x+2"}}], False)),
        ("adv-ctrl-14", lambda: _step_fails([{"eq": "", "math": {"latex": r"216\times\dfrac{22}{7}\approx 678.86"}}])),
        ("adv-ctrl-15", lambda: _step_fails([{"eq": "", "math": {"latex": r"26.74\approx 27"}}])),
        ("adv-ctrl-16", lambda: _step_fails([{"eq": "", "math": {"latex": r"r=7"}}, {"eq": "", "math": {"latex": r"2\pi r=2\pi(7)=14\pi"}}])),
        ("adv-ctrl-17", lambda: _step_fails([{"eq": "", "math": {"latex": r"PQ=\sqrt{20^2-16^2}=12"}}])),
        ("adv-ctrl-18", lambda: _step_fails([{"eq": "", "math": {"latex": r"\mathrm{CSA}_{QR}=\pi(12)(20)=240\pi"}}])),
        ("adv-ctrl-19", lambda: _step_fails([{"eq": "", "math": {"latex": r"1005+\dfrac{5}{7}=\dfrac{7040}{7}"}}])),
        ("adv-ctrl-20", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{216}{360}\times 21=12.6"}}])),
        ("adv-ctrl-21", lambda: _step_fails([{"eq": "", "math": {"latex": r"\pi r^2 h-\dfrac{1}{3}\pi r^2 h=\dfrac{2}{3}\pi r^2 h"}}])),
        ("adv-ctrl-22", lambda: _step_fails([{"eq": "", "math": {"latex": r"\begin{aligned}\dfrac{4}{3}\pi R^3&=\pi r^2 H\\\implies H&=\dfrac{4R^3}{3r^2}\end{aligned}"}}])),
        ("adv-ctrl-23", lambda: _step_fails([{"eq": "", "math": {"latex": r"2\pi R^2+2\pi r^2+\pi(R^2-r^2)=\pi(3R^2+r^2)"}}])),
        ("adv-ctrl-24", lambda: _step_fails([{"eq": "", "math": {"latex": r"2\pi Rh+2\pi rh+2\pi(R^2-r^2)=2\pi(R+r)(R-r+h)"}}])),
        ("adv-ctrl-25", lambda: _ans_fails(DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(7), sp.Integer(10)), "area", "22/7"), "r=7, h=10", "440 cm²")),
        ("adv-ctrl-26", lambda: _ans_fails(DerivedResult(True, "hemi_tsa", geo.hemisphere_tsa(sp.Integer(7)), "area", "22/7"), "r=7", "462 cm²")),
        ("adv-ctrl-27", lambda: _ans_fails(DerivedResult(True, "frust_v", geo.frustum_volume(sp.Integer(5), sp.Integer(2), sp.Integer(3)), "volume", "exact"), "R=5, r=2, h=3", "39π cm³")),
        ("adv-ctrl-28", lambda: _step_fails([{"eq": "", "math": {"latex": r"x=5"}}, {"eq": "", "math": {"latex": r"2x+1=11"}}], False)),
        ("adv-ctrl-29", lambda: _step_fails([{"eq": "", "math": {"latex": r"a^3-b^3=(a-b)(a^2+ab+b^2)"}}], False)),
        ("adv-ctrl-30", lambda: _step_fails([{"eq": "", "math": {"latex": r"\dfrac{1}{2}+\dfrac{1}{3}=\dfrac{5}{6}"}}])),
    ]
    for cid, fn in clean_controls:
        cases.append(AdversarialCase(cid, "clean_structural_control", False, False, fn))

    return cases


def run_adversarial_benchmark() -> Dict[str, Any]:
    t0 = time.perf_counter()
    cases = build_adversarial_cases()
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
        "engine": "TRACE MathGuard V1.3 Adversarial",
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
