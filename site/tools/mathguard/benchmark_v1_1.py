"""Independent 108-case V1.1 benchmark suite (unseen textbook-style, domain, security, and step-reasoning cases).

Strictly separated from the original 120-case V1.0 benchmark (which is preserved intact).
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List

import sympy as sp

from . import geometry as geo
from .derivations_g10_ch7 import DerivedResult
from .engine import _verify_exercise_answer
from .parser import ParseError, parse_expression
from .steps import validate_steps


@dataclass
class V11Case:
    case_id: str
    category: str
    is_error: bool
    critical: bool
    runner: Callable[[], bool]


def _step_fails(steps: List[Dict[str, Any]], allow_positive_domain: bool = True) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain).status == "FAIL"


def _step_not_pass(steps: List[Dict[str, Any]], allow_positive_domain: bool = True) -> bool:
    return validate_steps(steps, allow_positive_domain=allow_positive_domain).status != "PASS"


def _ans_fails(derived: DerivedResult, q_en: str, ans_en: str, ans_latex: str = "") -> bool:
    item = {
        "q": {"en": q_en},
        "answer": ans_en,
        "answerMath": {"latex": ans_latex, "display": True} if ans_latex else {},
    }
    st, _, _, _ = _verify_exercise_answer(item, derived)
    return st == "FAIL"


def _right_ans_wrong_steps(derived: DerivedResult, q_en: str, ans_en: str, steps: List[Dict[str, Any]]) -> bool:
    ans_ok = not _ans_fails(derived, q_en, ans_en)
    step_bad = _step_fails(steps)
    return ans_ok and step_bad


def _parser_rejects(expr_str: str) -> bool:
    try:
        parse_expression(expr_str)
        return False
    except ParseError:
        return True
    except Exception:
        return True


def build_v1_1_cases() -> List[V11Case]:
    cases: List[V11Case] = []

    d_cyl = lambda r, h: DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "22/7", required_numbers=[str(r), str(h)])
    d_cone = lambda r, h: DerivedResult(True, "cone", geo.cone_slant_height(sp.Integer(r), sp.Integer(h)), "length", "exact", required_numbers=[str(r), str(h)])
    d_frust = lambda R, r, h: DerivedResult(True, "frust", geo.frustum_volume(sp.Integer(R), sp.Integer(r), sp.Integer(h)), "volume", "exact", required_numbers=[str(R), str(r), str(h)])

    # 1. Clean unseen textbook-style controls (24 cases — must NOT be flagged)
    clean_cases = [
        ("v11-ctrl-01", lambda: _step_fails([{"eq": "r = 7", "math": {"latex": r"r=7"}}, {"eq": "A = 2*pi*7*10 = 140*pi", "math": {"latex": r"A=2\pi(7)(10)=140\pi"}}])),
        ("v11-ctrl-02", lambda: _step_fails([{"eq": r"V = \dfrac43 \pi (3)^3 = 36\pi", "math": {"latex": r"V=\dfrac43\pi(3)^3=36\pi"}}])),
        ("v11-ctrl-03", lambda: _step_fails([{"eq": "PQ = sqrt(PR^2 - QR^2) = 12", "math": {"latex": r"PQ=\sqrt{20^2-16^2}=12"}}])),
        ("v11-ctrl-04", lambda: _step_fails([{"eq": "r^2 = 16 => r = 4", "math": {"latex": r"r^2=16 \Rightarrow r=4"}}], True)),
        ("v11-ctrl-05", lambda: _step_fails([{"eq": "k^2 = 25 => k = 5", "math": {"latex": r"k^2=25 \Rightarrow k=5"}}], True)),
        ("v11-ctrl-06", lambda: _step_fails([{"eq": "x^2 = 9 => x = 3 or x = -3", "math": {"latex": r"x^2=9 \Rightarrow x^2-9=0"}}], False)),
        ("v11-ctrl-07", lambda: _step_fails([{"eq": "10459.43 cm^3 = 10.45943 L", "math": {"latex": r"10459.43\,\mathrm{cm}^3 = 10.45943\,\mathrm{L}"}}])),
        ("v11-ctrl-08", lambda: _step_fails([{"eq": "2500 cm^2 = 0.25 m^2", "math": {"latex": r"2500\,\mathrm{cm}^2 = 0.25\,\mathrm{m}^2"}}])),
        ("v11-ctrl-09", lambda: _step_fails([{"eq": "500 mm = 50 cm", "math": {"latex": r"500\,\mathrm{mm} = 50\,\mathrm{cm}"}}])),
        ("v11-ctrl-10", lambda: _step_fails([{"eq": "t = 26.74 min ≈ 27 min", "math": {"latex": r"t=26.74\approx 27"}}])),
        ("v11-ctrl-11", lambda: _step_fails([{"eq": "A = 4*pi*r^2", "math": {"latex": r"A=4\pi r^2"}}, {"eq": "A_new = 4*pi*(1.5*r)^2 = 2.25*A", "math": {"latex": r"A_{new}=4\pi(1.5r)^2=2.25A"}}])),
        ("v11-ctrl-12", lambda: _step_fails([{"eq": "2*pi*r = 44 => 2*(22/7)*r = 44", "math": {"latex": r"2\pi r=44 \Rightarrow 2\times\dfrac{22}{7}\times r=44"}}])),
        ("v11-ctrl-13", lambda: _step_fails([{"eq": "3x + 2x = 5x", "math": {"latex": r"3x+2x=5x"}}], False)),
        ("v11-ctrl-14", lambda: _step_fails([{"eq": "(a+b)^2 = a^2 + 2ab + b^2", "math": {"latex": r"(a+b)^2=a^2+2ab+b^2"}}], False)),
        ("v11-ctrl-15", lambda: _step_fails([{"eq": "Increase % = (1.21 - 1)*100 = 21%", "math": {"latex": r"\text{Increase \%}=(1.21-1)\times 100=21\%"}}])),
        ("v11-ctrl-16", lambda: _step_fails([{"eq": r"V = \dfrac13 \pi (6)^2 (7) = 84\pi", "math": {"latex": r"V=\dfrac13\pi(6)^2(7)=84\pi"}}])),
        ("v11-ctrl-17", lambda: _step_fails([{"eq": "l = sqrt(9^2 + 12^2) = 15", "math": {"latex": r"\ell=\sqrt{9^2+12^2}=\sqrt{225}=15"}}])),
        ("v11-ctrl-18", lambda: _step_fails([{"eq": "952*pi = 2992", "math": {"latex": r"952\pi=952\times\dfrac{22}{7}=2992"}}])),
        ("v11-ctrl-19", lambda: _ans_fails(d_cyl(14, 10), "r=14 cm, h=10 cm", "880 cm²")),
        ("v11-ctrl-20", lambda: _ans_fails(d_cone(9, 12), "r=9 cm, h=12 cm", "15 cm")),
        ("v11-ctrl-21", lambda: _ans_fails(d_frust(10, 4, 8), "R=10, r=4, h=8", "416π cm³")),
        ("v11-ctrl-22", lambda: _step_fails([{"eq": "462/231 = 2 h", "math": {"latex": r"t=\dfrac{462}{231}=2\,\mathrm{h}"}}])),
        ("v11-ctrl-23", lambda: _step_fails([{"eq": "AB^2 + BC^2 = 3^2 + 4^2 = 25", "math": {"latex": r"AB^2+BC^2=3^2+4^2=25"}}])),
        ("v11-ctrl-24", lambda: _step_fails([{"eq": "1/4 + 3/4 = 1", "math": {"latex": r"\dfrac14+\dfrac34=1"}}])),
    ]
    for cid, fn in clean_cases:
        cases.append(V11Case(cid, "clean_unseen_control", False, False, fn))

    # 2. Deliberately incorrect calculations (16 cases)
    calc_errors = [
        ("v11-calc-01", lambda: _step_fails([{"eq": "2*pi*7*10 = 150*pi", "math": {"latex": r"2\pi(7)(10)=150\pi"}}])),
        ("v11-calc-02", lambda: _step_fails([{"eq": r"\dfrac43 \pi (3)^3 = 27\pi", "math": {"latex": r"\dfrac43\pi(3)^3=27\pi"}}])),
        ("v11-calc-03", lambda: _step_fails([{"eq": r"\dfrac13 \pi (6)^2 (7) = 72\pi", "math": {"latex": r"\dfrac13\pi(6)^2(7)=72\pi"}}])),
        ("v11-calc-04", lambda: _step_fails([{"eq": "sqrt(9^2 + 12^2) = 16", "math": {"latex": r"\sqrt{9^2+12^2}=16"}}])),
        ("v11-calc-05", lambda: _step_fails([{"eq": "1005 + 5/7 = 7042/7", "math": {"latex": r"1005+\dfrac{5}{7}=\dfrac{7042}{7}"}}])),
        ("v11-calc-06", lambda: _step_fails([{"eq": "22/7 * 49 = 156", "math": {"latex": r"\dfrac{22}{7}\times 49=156"}}])),
        ("v11-calc-07", lambda: _step_fails([{"eq": "(a+b)^2 = a^2 + b^2", "math": {"latex": r"(a+b)^2=a^2+b^2"}}], False)),
        ("v11-calc-08", lambda: _step_fails([{"eq": "3x + 2x = 6x", "math": {"latex": r"3x+2x=6x"}}], False)),
        ("v11-calc-09", lambda: _step_fails([{"eq": "pi*r^2*h - 1/3*pi*r^2 = 2/3*pi*r^2*h", "math": {"latex": r"\pi r^2 h-\dfrac{1}{3}\pi r^2=\dfrac{2}{3}\pi r^2 h"}}])),
        ("v11-calc-10", lambda: _step_fails([{"eq": "4/3*pi*(6^3 - 3^3) = 250*pi", "math": {"latex": r"\dfrac43\pi(6^3-3^3)=250\pi"}}])),
        ("v11-calc-11", lambda: _ans_fails(d_cyl(14, 10), "r=14, h=10", "440 cm²")),
        ("v11-calc-12", lambda: _ans_fails(d_cone(9, 12), "r=9, h=12", "21 cm")),
        ("v11-calc-13", lambda: _ans_fails(d_frust(10, 4, 8), "R=10, r=4, h=8", "400π cm³")),
        ("v11-calc-14", lambda: _step_fails([{"eq": "15000 * 0.07 * 0.07 * 22/7 = 230", "math": {"latex": r"15000\times 0.07^2\times\dfrac{22}{7}=230"}}])),
        ("v11-calc-15", lambda: _step_fails([{"eq": "200*150*100 - 1188000 = 1810000", "math": {"latex": r"200\times 150\times 100 - 1188000 = 1810000"}}])),
        ("v11-calc-16", lambda: _step_fails([{"eq": "1/2 + 1/4 = 2/6", "math": {"latex": r"\dfrac12+\dfrac14=\dfrac26"}}])),
    ]
    for cid, fn in calc_errors:
        cases.append(V11Case(cid, "incorrect_calculation", True, True, fn))

    # 3. Invalid equation transformations & unrestricted algebraic variables (16 cases)
    transform_errors = [
        ("v11-tr-01", lambda: _step_fails([{"eq": "x^2 = 9 => x = 3", "math": {"latex": r"x^2=9 \Rightarrow x=3"}}], allow_positive_domain=False)),
        ("v11-tr-02", lambda: _step_fails([{"eq": "x^2 = 25 => x = 5", "math": {"latex": r"x^2=25 \Rightarrow x=5"}}], allow_positive_domain=False)),
        ("v11-tr-03", lambda: _step_fails([{"eq": "y^2 - 16 = 0 => y = 4", "math": {"latex": r"y^2-16=0 \Rightarrow y=4"}}], allow_positive_domain=False)),
        ("v11-tr-04", lambda: _step_fails([{"eq": "5k = 35 => k = 175", "math": {"latex": r"5k=35 \Rightarrow k=175"}}])),
        ("v11-tr-05", lambda: _step_fails([{"eq": "2r + 4 = 10 => 2r = 14", "math": {"latex": r"2r+4=10 \Rightarrow 2r=14"}}])),
        ("v11-tr-06", lambda: _step_fails([{"eq": "3h = 27 => h = 81", "math": {"latex": r"3h=27 \Rightarrow h=81"}}])),
        ("v11-tr-07", lambda: _step_fails([{"eq": "4x - 8 = 0 => x = -2", "math": {"latex": r"4x-8=0 \Rightarrow x=-2"}}], False)),
        ("v11-tr-08", lambda: _step_fails([{"eq": "r/2 = 7 => r = 3.5", "math": {"latex": r"\dfrac{r}{2}=7 \Rightarrow r=3.5"}}])),
        ("v11-tr-09", lambda: _step_fails([{"eq": "7*h = 49 => h = 343", "math": {"latex": r"7h=49 \Rightarrow h=343"}}])),
        ("v11-tr-10", lambda: _step_fails([{"eq": "2*pi*r = 44 => 2*pi*r = 22", "math": {"latex": r"2\pi r=44 \Rightarrow 2\pi r=22"}}])),
        ("v11-tr-11", lambda: _step_fails([{"eq": "x + 5 = 12 => x = 17", "math": {"latex": r"x+5=12 \Rightarrow x=17"}}], False)),
        ("v11-tr-12", lambda: _step_fails([{"eq": "10*t = 20 => t = 200", "math": {"latex": r"10t=20 \Rightarrow t=200"}}])),
        ("v11-tr-13", lambda: _step_fails([{"eq": "r^2 = 49 => r = 49", "math": {"latex": r"r^2=49 \Rightarrow r=49"}}])),
        ("v11-tr-14", lambda: _step_fails([{"eq": "3*V = 150 => V = 450", "math": {"latex": r"3V=150 \Rightarrow V=450"}}])),
        ("v11-tr-15", lambda: _step_fails([{"eq": "2*h - 6 = 10 => 2*h = 4", "math": {"latex": r"2h-6=10 \Rightarrow 2h=4"}}])),
        ("v11-tr-16", lambda: _step_fails([{"eq": "x^2 = 100 => x = 10", "math": {"latex": r"x^2=100 \Rightarrow x=10"}}], allow_positive_domain=False)),
    ]
    for cid, fn in transform_errors:
        cases.append(V11Case(cid, "invalid_transformation_or_domain", True, True, fn))

    # 4. Correct answers obtained through incorrect steps (16 cases — MUST be caught!)
    right_ans_bad_steps = [
        ("v11-raws-01", lambda: _right_ans_wrong_steps(d_cyl(7, 10), "r=7, h=10", "440 cm²", [{"eq": "A = pi*7*10 = 220", "math": {"latex": r"A=\pi(7)(10)=440"}}])),
        ("v11-raws-02", lambda: _right_ans_wrong_steps(d_cone(3, 4), "r=3, h=4", "5 cm", [{"eq": "l = sqrt(3^2 + 4^2) = sqrt(20) = 5", "math": {"latex": r"\ell=\sqrt{3^2+4^2}=\sqrt{20}=5"}}])),
        ("v11-raws-03", lambda: _right_ans_wrong_steps(d_cone(5, 12), "r=5, h=12", "13 cm", [{"eq": "l = 5 + 12 = 13", "math": {"latex": r"\ell=5+12=13"}}])),
        ("v11-raws-04", lambda: _right_ans_wrong_steps(d_frust(20, 8, 16), "R=20, r=8, h=16", "3328π cm³", [{"eq": "V = 1/3*pi*16*(400+64) = 3328*pi", "math": {"latex": r"V=\dfrac13\pi(16)(400+64)=3328\pi"}}])),
        ("v11-raws-05", lambda: _right_ans_wrong_steps(d_cyl(14, 10), "r=14, h=10", "880 cm²", [{"eq": "2*22/7*14*10 = 440+440 = 880", "math": {"latex": r"2\times\dfrac{22}{7}\times 14\times 10 = 440"}}])),
        ("v11-raws-06", lambda: _right_ans_wrong_steps(d_cone(8, 15), "r=8, h=15", "17 cm", [{"eq": "8^2+15^2 = 280 => l = 17", "math": {"latex": r"8^2+15^2=280"}}])),
        ("v11-raws-07", lambda: _right_ans_wrong_steps(d_cyl(7, 5), "r=7, h=5", "220 cm²", [{"eq": "2*22/7*7*5 = 220", "math": {"latex": r"2\times\dfrac{22}{7}\times 7\times 5 = 110\times 3"}}])),
        ("v11-raws-08", lambda: _right_ans_wrong_steps(d_cone(9, 12), "r=9, h=12", "15 cm", [{"eq": "9^2+12^2 = 225 = 15", "math": {"latex": r"9^2+12^2=225=15"}}])),
        ("v11-raws-09", lambda: _right_ans_wrong_steps(d_frust(5, 2, 4), "R=5, r=2, h=4", "52π cm³", [{"eq": "1/3*pi*4*(25+10+4) = 50*pi", "math": {"latex": r"\dfrac13\pi(4)(25+10+4)=50\pi"}}])),
        ("v11-raws-10", lambda: _right_ans_wrong_steps(d_cyl(25, 35), "r=25, h=35", "5500 cm²", [{"eq": "2*22/7*25*35 = 5000", "math": {"latex": r"2\times\dfrac{22}{7}\times 25\times 35=5000"}}])),
        ("v11-raws-11", lambda: _right_ans_wrong_steps(d_cone(6, 8), "r=6, h=8", "10 cm", [{"eq": "sqrt(6^2+8^2) = sqrt(100) = 20", "math": {"latex": r"\sqrt{6^2+8^2}=\sqrt{100}=20"}}])),
        ("v11-raws-12", lambda: _right_ans_wrong_steps(d_cyl(7, 20), "r=7, h=20", "880 cm²", [{"eq": "2*22/7*7*20 = 44*10", "math": {"latex": r"2\times\dfrac{22}{7}\times 7\times 20=44\times 10"}}])),
        ("v11-raws-13", lambda: _right_ans_wrong_steps(d_cone(7, 24), "r=7, h=24", "25 cm", [{"eq": "7^2+24^2 = 625 = 25", "math": {"latex": r"7^2+24^2=625=25"}}])),
        ("v11-raws-14", lambda: _right_ans_wrong_steps(d_frust(10, 4, 8), "R=10, r=4, h=8", "416π cm³", [{"eq": "1/3*pi*8*(100+40+16) = 400*pi", "math": {"latex": r"\dfrac13\pi(8)(100+40+16)=400\pi"}}])),
        ("v11-raws-15", lambda: _right_ans_wrong_steps(d_cyl(14, 5), "r=14, h=5", "440 cm²", [{"eq": "2*22/7*14*5 = 44*5", "math": {"latex": r"2\times\dfrac{22}{7}\times 14\times 5=44\times 5"}}])),
        ("v11-raws-16", lambda: _right_ans_wrong_steps(d_cone(12, 16), "r=12, h=16", "20 cm", [{"eq": "sqrt(12^2+16^2) = 12+16", "math": {"latex": r"\sqrt{12^2+16^2}=12+16"}}])),
    ]
    for cid, fn in right_ans_bad_steps:
        cases.append(V11Case(cid, "right_answer_wrong_steps", True, True, fn))

    # 5. Unit conversion & dimensional mismatch in steps/answers (12 cases)
    unit_errors = [
        ("v11-unit-01", lambda: _step_fails([{"eq": "1000 cm^3 = 10 L", "math": {"latex": r"1000\,\mathrm{cm}^3 = 10\,\mathrm{L}"}}])),
        ("v11-unit-02", lambda: _step_fails([{"eq": "2.5 m^3 = 250 L", "math": {"latex": r"2.5\,\mathrm{m}^3 = 250\,\mathrm{L}"}}])),
        ("v11-unit-03", lambda: _step_fails([{"eq": "100 cm^2 = 1 m^2", "math": {"latex": r"100\,\mathrm{cm}^2 = 1\,\mathrm{m}^2"}}])),
        ("v11-unit-04", lambda: _step_fails([{"eq": "50 mm = 0.5 cm", "math": {"latex": r"50\,\mathrm{mm} = 0.5\,\mathrm{cm}"}}])),
        ("v11-unit-05", lambda: _ans_fails(d_cyl(7, 10), "r=7 cm, h=10 cm", "440 cm³")),
        ("v11-unit-06", lambda: _ans_fails(d_cone(3, 4), "r=3 cm, h=4 cm", "5 cm²")),
        ("v11-unit-07", lambda: _ans_fails(d_frust(5, 2, 4), "R=5, r=2, h=4", "52π cm²")),
        ("v11-unit-08", lambda: _step_fails([{"eq": "2 m = 20 cm", "math": {"latex": r"2\,\mathrm{m} = 20\,\mathrm{cm}"}}])),
        ("v11-unit-09", lambda: _step_fails([{"eq": "1.5 m^2 = 1500 cm^2", "math": {"latex": r"1.5\,\mathrm{m}^2 = 1500\,\mathrm{cm}^2"}}])),
        ("v11-unit-10", lambda: _step_fails([{"eq": "3000 cm^3 = 30 L", "math": {"latex": r"3000\,\mathrm{cm}^3 = 30\,\mathrm{L}"}}])),
        ("v11-unit-11", lambda: _ans_fails(d_cyl(14, 10), "r=14 cm, h=10 cm", "880 cm")),
        ("v11-unit-12", lambda: _ans_fails(d_frust(10, 4, 8), "R=10, r=4, h=8", "416π cm")),
    ]
    for cid, fn in unit_errors:
        cases.append(V11Case(cid, "unit_and_dimension_error", True, True, fn))

    # 6. Malformed inputs & security vulnerability tests (12 cases — must reject safely without eval/crash)
    malformed_security = [
        ("v11-sec-01", lambda: _parser_rejects("__import__('os').system('echo pwned')")),
        ("v11-sec-02", lambda: _parser_rejects("eval('1+1')")),
        ("v11-sec-03", lambda: _parser_rejects("exec('import sys')")),
        ("v11-sec-04", lambda: _parser_rejects("open('/etc/passwd').read()")),
        ("v11-sec-05", lambda: _parser_rejects(r"\dfrac{1}{")),
        ("v11-sec-06", lambda: _parser_rejects("((1 + 2)")),
        ("v11-sec-07", lambda: _parser_rejects("1 + * 2")),
        ("v11-sec-08", lambda: _parser_rejects("   ")),
        ("v11-sec-09", lambda: _parser_rejects("`rm -rf /`")),
        ("v11-sec-10", lambda: _parser_rejects("${7*7}")),
        ("v11-sec-11", lambda: _parser_rejects(r"\sqrt{}")),
        ("v11-sec-12", lambda: _parser_rejects("2 + (3 * 4))")),
    ]
    for cid, fn in malformed_security:
        cases.append(V11Case(cid, "malformed_and_security", True, True, fn))

    # 7. Unverified / insufficient context steps MUST NOT silently PASS (12 cases)
    non_silent_unverified = [
        ("v11-ns-01", lambda: _step_not_pass([])),
        ("v11-ns-02", lambda: _step_not_pass([{"eq": "Apply formula", "math": {"latex": ""}}])),
        ("v11-ns-03", lambda: _step_not_pass([{"eq": "V = pi*r^2*h = 154", "math": {"latex": r"V=\pi r^2 h=154"}}])),
        ("v11-ns-04", lambda: _step_not_pass([{"eq": "A = 4*pi*r^2 = 100", "math": {"latex": r"A=4\pi r^2=100"}}])),
        ("v11-ns-05", lambda: _step_not_pass([{"eq": "l = sqrt(r^2+h^2) = 13", "math": {"latex": r"\ell=\sqrt{r^2+h^2}=13"}}])),
        ("v11-ns-06", lambda: _step_not_pass([{"eq": "CSA = pi*r*l = 220", "math": {"latex": r"CSA=\pi r\ell=220"}}])),
        ("v11-ns-07", lambda: _step_not_pass([{"eq": "Ratio = 5 : 7", "math": {"latex": r"5:7"}}])),
        ("v11-ns-08", lambda: _step_not_pass([{"eq": "r = 7", "math": {"latex": r"r=7"}}])),
        ("v11-ns-09", lambda: _step_not_pass([{"eq": "h = 24", "math": {"latex": r"h=24"}}])),
        ("v11-ns-10", lambda: _step_not_pass([{"eq": "V = (1/3)*pi*r^2*h = 308", "math": {"latex": r"V=\dfrac13\pi r^2 h=308"}}])),
        ("v11-ns-11", lambda: _step_not_pass([{"eq": "TSA = 6*a^2 = 294", "math": {"latex": r"TSA=6a^2=294"}}])),
        ("v11-ns-12", lambda: _step_not_pass([{"eq": "Unbalanced (1+2", "math": {"latex": r"(1+2"}}])),
    ]
    for cid, fn in non_silent_unverified:
        cases.append(V11Case(cid, "non_silent_unverified", True, True, fn))

    return cases


def run_v1_1_benchmark() -> Dict[str, Any]:
    t0 = time.perf_counter()
    cases = build_v1_1_cases()
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
        "engine": "TRACE MathGuard V1.1",
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
