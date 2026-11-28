"""Controlled 120-case mutation benchmark for TRACE MathGuard V1.0.

Separates development cases (60) from held-out evaluation cases (60), covering
clean/formatting controls and 9 deliberate error categories.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Callable, Dict, List

import sympy as sp

from . import geometry as geo
from .steps import validate_steps
from .tamil_consistency import screen_tamil_vs_reference
from .units import detect_answer_dimension
from .engine import _verify_exercise_answer
from .derivations_g10_ch7 import DerivedResult


@dataclass
class BenchmarkCase:
    case_id: str
    split: str  # "dev" | "held_out"
    category: str
    is_error: bool
    critical: bool
    runner: Callable[[], Dict[str, Any]]


def _eval_answer_case(
    derived: DerivedResult,
    q_en: str,
    answer_en: str,
    answer_latex: str = "",
) -> bool:
    item = {
        "q": {"en": q_en},
        "answer": answer_en,
        "answerMath": {"latex": answer_latex, "display": True} if answer_latex else {},
    }
    status, _, _, _ = _verify_exercise_answer(item, derived)
    return status == "FAIL"


def _eval_step_case(steps: List[Dict[str, Any]]) -> bool:
    res = validate_steps(steps)
    return res.status == "FAIL"


def _eval_tamil_case(ref_ta: str, cand_ta: str) -> bool:
    res = screen_tamil_vs_reference(ref_ta, cand_ta)
    return bool(res["requiresReview"])


def build_benchmark_cases() -> List[BenchmarkCase]:
    cases: List[BenchmarkCase] = []

    # Helper derived specs
    d_cyl_csa = lambda r, h: DerivedResult(True, "cyl_csa", geo.cylinder_csa(sp.Integer(r), sp.Integer(h)), "area", "22/7", required_numbers=[str(r), str(h)])
    d_cone_l = lambda r, h: DerivedResult(True, "cone_l", geo.cone_slant_height(sp.Integer(r), sp.Integer(h)), "length", "exact", required_numbers=[str(r), str(h)])
    d_sph_vol = lambda r: DerivedResult(True, "sph_vol", geo.sphere_volume(sp.Integer(r)), "volume", "exact", required_numbers=[str(r)])
    d_frust_vol = lambda R, r, h: DerivedResult(True, "frust_vol", geo.frustum_volume(sp.Integer(R), sp.Integer(r), sp.Integer(h)), "volume", "exact", required_numbers=[str(R), str(r), str(h)])

    # ---------------- DEV SPLIT (60 cases) ----------------
    # 12 Clean / formatting controls
    dev_controls = [
        ("dev-ctrl-01", lambda: _eval_answer_case(d_cyl_csa(7, 10), "r=7 cm, h=10 cm", "440 cm²", r"\boxed{440\,\mathrm{cm}^2}")),
        ("dev-ctrl-02", lambda: _eval_answer_case(d_cone_l(3, 4), "r=3 cm, h=4 cm", "5 cm", r"\boxed{5\,\mathrm{cm}}")),
        ("dev-ctrl-03", lambda: _eval_answer_case(d_sph_vol(3), "r=3 cm", "36π cm³", r"\boxed{36\pi\,\mathrm{cm}^3}")),
        ("dev-ctrl-04", lambda: _eval_answer_case(d_frust_vol(20, 8, 16), "R=20, r=8, h=16", "3328π cm³", r"\boxed{3328\pi\,\mathrm{cm}^3}")),
        ("dev-ctrl-05", lambda: _eval_step_case([{"eq": "l = √(3²+4²) = 5", "math": {"latex": r"\ell=\sqrt{3^2+4^2}=\sqrt{25}=5"}}])),
        ("dev-ctrl-06", lambda: _eval_step_case([{"eq": "A = 2*pi*7*10 = 140*pi", "math": {"latex": r"A=2\pi(7)(10)=140\pi"}}])),
        ("dev-ctrl-07", lambda: _eval_step_case([{"eq": "V = (4/3)*pi*3^3 = 36*pi", "math": {"latex": r"V=\dfrac{4}{3}\pi(3)^3=36\pi"}}])),
        ("dev-ctrl-08", lambda: _eval_step_case([{"eq": "1/2 + 1/3 = 5/6", "math": {"latex": r"\dfrac{1}{2}+\dfrac{1}{3}=\dfrac{5}{6}"}}])),
        ("dev-ctrl-09", lambda: _eval_tamil_case("ஆரம் 7 செ.மீ உயரம் 10 செ.மீ உருளையின் வளைபரப்பு", "ஆரம் 7 செ.மீ உயரம் 10 செ.மீ உருளையின் வளைபரப்பு")),
        ("dev-ctrl-10", lambda: _eval_tamil_case("ஆரம் 7 செ.மீ உயரம் 10 செ.மீ", "  ஆரம்  7  செ.மீ  உயரம்  10  செ.மீ  ")),
        ("dev-ctrl-11", lambda: _eval_tamil_case("கூம்பின் சாயுயரம் 13 செ.மீ", "கூம்பின் சாயுயரம் 13 செ.மீ")),
        ("dev-ctrl-12", lambda: _eval_answer_case(d_cyl_csa(14, 5), "r=14 cm, h=5 cm", "440 cm²", r"440\,\mathrm{cm}^2")),
    ]
    for cid, fn in dev_controls:
        cases.append(BenchmarkCase(cid, "dev", "clean_control", False, False, lambda f=fn: {"flagged": f()}))

    # 48 Dev error mutations across all 9 categories
    dev_errors = [
        # numeric_value (6)
        ("dev-num-01", "numeric_value", True, lambda: _eval_answer_case(d_cyl_csa(7, 10), "r=7, h=10", "450 cm²")),
        ("dev-num-02", "numeric_value", True, lambda: _eval_answer_case(d_cone_l(5, 12), "r=5, h=12", "14 cm")),
        ("dev-num-03", "numeric_value", True, lambda: _eval_answer_case(d_sph_vol(6), "r=6", "280π cm³")),
        ("dev-num-04", "numeric_value", True, lambda: _eval_step_case([{"eq": "2*22/7*7*10 = 445", "math": {"latex": r"2\times\dfrac{22}{7}\times7\times10=445"}}])),
        ("dev-num-05", "numeric_value", True, lambda: _eval_step_case([{"eq": "3^2 + 4^2 = 24", "math": {"latex": r"3^2+4^2=24"}}])),
        ("dev-num-06", "numeric_value", True, lambda: _eval_answer_case(d_frust_vol(20, 8, 16), "R=20, r=8, h=16", "3320π cm³")),
        # wrong_operator (5)
        ("dev-op-01", "wrong_operator", True, lambda: _eval_step_case([{"eq": "l = sqrt(5^2 - 12^2) = 13", "math": {"latex": r"\sqrt{5^2-12^2}=13"}}])),
        ("dev-op-02", "wrong_operator", True, lambda: _eval_step_case([{"eq": "5 + 7 = 35", "math": {"latex": r"5+7=35"}}])),
        ("dev-op-03", "wrong_operator", True, lambda: _eval_step_case([{"eq": "16 - 4 = 20", "math": {"latex": r"16-4=20"}}])),
        ("dev-op-04", "wrong_operator", True, lambda: _eval_step_case([{"eq": "2 * pi * 7 + 10 = 440", "math": {"latex": r"2\pi(7)+10=440"}}])),
        ("dev-op-05", "wrong_operator", True, lambda: _eval_step_case([{"eq": "1/3 * 22/7 * 7 * 7 * 3 = 154/3 + 1", "math": {"latex": r"\dfrac{1}{3}\times\dfrac{22}{7}\times49\times3=154+1"}}])),
        # missing_power_sqrt (5)
        ("dev-pow-01", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "pi * 7 * 10 = 1540", "math": {"latex": r"\pi(7)(10)=1540"}}])),
        ("dev-pow-02", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "sqrt(3^2 + 4^2) = 25", "math": {"latex": r"\sqrt{3^2+4^2}=25"}}])),
        ("dev-pow-03", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "4/3 * pi * 3^2 = 36*pi", "math": {"latex": r"\dfrac{4}{3}\pi(3)^2=36\pi"}}])),
        ("dev-pow-04", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "5^2 + 12^2 = 13", "math": {"latex": r"5^2+12^2=13"}}])),
        ("dev-pow-05", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "(10^2 - 6^2) = 10 - 6", "math": {"latex": r"10^2-6^2=10-6"}}])),
        # wrong_fraction (5)
        ("dev-frac-01", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "1/2 * pi * 6^2 = 12*pi", "math": {"latex": r"\dfrac{1}{2}\pi(6)^2=12\pi"}}])),
        ("dev-frac-02", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "2/3 + 1/6 = 3/9", "math": {"latex": r"\dfrac{2}{3}+\dfrac{1}{6}=\dfrac{3}{9}"}}])),
        ("dev-frac-03", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "1005 5/7 = 7041/7", "math": {"latex": r"1005+\dfrac{5}{7}=\dfrac{7041}{7}"}}])),
        ("dev-frac-04", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "4/3 * 3/4 = 2", "math": {"latex": r"\dfrac{4}{3}\times\dfrac{3}{4}=2"}}])),
        ("dev-frac-05", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "22/7 * 14 = 42", "math": {"latex": r"\dfrac{22}{7}\times14=42"}}])),
        # wrong_formula (6)
        ("dev-form-01", "wrong_formula", True, lambda: _eval_answer_case(d_cyl_csa(7, 10), "r=7, h=10", "220 cm²")),  # pi*r*h instead of 2*pi*r*h
        ("dev-form-02", "wrong_formula", True, lambda: _eval_answer_case(d_sph_vol(3), "r=3", "18π cm³")),  # 2/3 instead of 4/3
        ("dev-form-03", "wrong_formula", True, lambda: _eval_answer_case(d_frust_vol(20, 8, 16), "R=20, r=8, h=16", "2464π cm³")),  # missing Rr term
        ("dev-form-04", "wrong_formula", True, lambda: _eval_step_case([{"eq": "2*pi*7^2 = 3*pi*7^2", "math": {"latex": r"2\pi(7)^2=3\pi(7)^2"}}])),
        ("dev-form-05", "wrong_formula", True, lambda: _eval_answer_case(d_cone_l(6, 8), "r=6, h=8", "14 cm")),  # r+h instead of sqrt(r^2+h^2)
        ("dev-form-06", "wrong_formula", True, lambda: _eval_step_case([{"eq": "1/3 * pi * 6^2 * 10 = pi * 6^2 * 10", "math": {"latex": r"\dfrac{1}{3}\pi(6)^2(10)=\pi(6)^2(10)"}}])),
        # unit_conversion (5)
        ("dev-unit-01", "unit_conversion", True, lambda: _eval_answer_case(d_cyl_csa(7, 10), "r=7 cm, h=10 cm", "440 cm³")),
        ("dev-unit-02", "unit_conversion", True, lambda: _eval_answer_case(d_sph_vol(3), "r=3 cm", "36π cm²")),
        ("dev-unit-03", "unit_conversion", True, lambda: _eval_answer_case(d_cone_l(3, 4), "r=3 cm, h=4 cm", "5 cm²")),
        ("dev-unit-04", "unit_conversion", True, lambda: _eval_answer_case(DerivedResult(True, "m3_to_l", sp.Integer(2500), "volume", "exact", required_numbers=["2.5"]), "2.5 m³", "250 litres")),
        ("dev-unit-05", "unit_conversion", True, lambda: _eval_answer_case(DerivedResult(True, "mm_to_cm", sp.Rational(2, 10), "length", "exact", required_numbers=["2"]), "2 mm", "2 cm")),
        # wrong_final_answer (5)
        ("dev-ans-01", "wrong_final_answer", True, lambda: _eval_answer_case(d_cyl_csa(7, 10), "r=7, h=10", "880 cm²")),
        ("dev-ans-02", "wrong_final_answer", True, lambda: _eval_answer_case(d_cone_l(7, 24), "r=7, h=24", "26 cm")),
        ("dev-ans-03", "wrong_final_answer", True, lambda: _eval_answer_case(d_sph_vol(6), "r=6", "144π cm³")),
        ("dev-ans-04", "wrong_final_answer", True, lambda: _eval_answer_case(d_frust_vol(5, 2, 4), "R=5, r=2, h=4", "50π cm³")),
        ("dev-ans-05", "wrong_final_answer", True, lambda: _eval_answer_case(DerivedResult(True, "mcq", sp.Integer(12), "length", "exact"), "(A) 10 cm (B) 12 cm", "(A) 10 cm")),
        # invalid_step_transform (5)
        ("dev-step-01", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "2*7*h = 140 => h = 140*14", "math": {"latex": r"14h=140 \Rightarrow h=140\times 14"}}])),
        ("dev-step-02", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "(22/7)*r^2 = 154 = 154*22/7", "math": {"latex": r"\dfrac{22}{7}\times 49 = 154 = 154\times\dfrac{22}{7}"}}])),
        ("dev-step-03", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "sqrt(100) = 50", "math": {"latex": r"\sqrt{100}=50"}}])),
        ("dev-step-04", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "216*pi + 36*pi = 240*pi", "math": {"latex": r"216\pi+36\pi=240\pi"}}])),
        ("dev-step-05", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "(18+16)/2 * 4 = 64", "math": {"latex": r"\dfrac{18+16}{2}\times 4 = 64"}}])),
        # tamil_discrepancy (6)
        ("dev-ta-01", "tamil_discrepancy", True, lambda: _eval_tamil_case("ஆரம் 7 செ.மீ உயரம் 10 செ.மீ", "ஆரம் 9 செ.மீ உயரம் 10 செ.மீ")),
        ("dev-ta-02", "tamil_discrepancy", True, lambda: _eval_tamil_case("ஆரம் 7 செ.மீ உருளை", "விட்டம் 7 செ.மீ உருளை")),
        ("dev-ta-03", "tamil_discrepancy", True, lambda: _eval_tamil_case("கூம்பின் சாயுயரம் 13 செ.மீ", "கூம்பின் உயரம் 13 செ.மீ")),
        ("dev-ta-04", "tamil_discrepancy", True, lambda: _eval_tamil_case("உள்ளீடற்ற கோளத்தின் கன அளவு", "உள்ளீடற்ற உருளையின் கன அளவு")),
        ("dev-ta-05", "tamil_discrepancy", True, lambda: _eval_tamil_case("அரைக்கோளத்தின் வளைபரப்பு", "அரைக்கோளத்தின் கன அளவு")),
        ("dev-ta-06", "tamil_discrepancy", True, lambda: _eval_tamil_case("இடைக்கண்டத்தின் உயரம் 16 செ.மீ", "கூம்பின் உயரம் 16 செ.மீ")),
    ]
    for cid, cat, crit, fn in dev_errors:
        cases.append(BenchmarkCase(cid, "dev", cat, True, crit, lambda f=fn: {"flagged": f()}))

    # ---------------- HELD-OUT SPLIT (60 cases) ----------------
    held_controls = [
        ("ho-ctrl-01", lambda: _eval_answer_case(d_cyl_csa(25, 35), "r=25, h=35", "5500 cm²")),
        ("ho-ctrl-02", lambda: _eval_answer_case(d_cone_l(8, 15), "r=8, h=15", "17 cm")),
        ("ho-ctrl-03", lambda: _eval_answer_case(d_sph_vol(6), "r=6", "288π cm³")),
        ("ho-ctrl-04", lambda: _eval_answer_case(d_frust_vol(5, 2, 4), "R=5, r=2, h=4", "52π cm³")),
        ("ho-ctrl-05", lambda: _eval_step_case([{"eq": "l = sqrt(8^2+15^2) = 17", "math": {"latex": r"\ell=\sqrt{8^2+15^2}=\sqrt{289}=17"}}])),
        ("ho-ctrl-06", lambda: _eval_step_case([{"eq": "V = 1/3*pi*6^2*12 = 144*pi", "math": {"latex": r"V=\dfrac{1}{3}\pi(6)^2(12)=144\pi"}}])),
        ("ho-ctrl-07", lambda: _eval_step_case([{"eq": "2*(22/7)*14*(14+6) = 1760", "math": {"latex": r"2\times\dfrac{22}{7}\times 14\times(14+6)=1760"}}])),
        ("ho-ctrl-08", lambda: _eval_step_case([{"eq": "4/3*pi*(5^3-3^3) = 392/3*pi", "math": {"latex": r"\dfrac{4}{3}\pi(5^3-3^3)=\dfrac{392}{3}\pi"}}])),
        ("ho-ctrl-09", lambda: _eval_tamil_case("விட்டம் 14 செ.மீ உயரம் 13 செ.மீ", "விட்டம் 14 செ.மீ உயரம் 13 செ.மீ")),
        ("ho-ctrl-10", lambda: _eval_tamil_case("தடிமன் 4 செ.மீ உள்ளீடற்ற உருளை", "  தடிமன்  4  செ.மீ  உள்ளீடற்ற  உருளை  ")),
        ("ho-ctrl-11", lambda: _eval_tamil_case("கோளத்தின் கன அளவு 288π க.செ.மீ", "கோளத்தின் கன அளவு 288π க.செ.மீ")),
        ("ho-ctrl-12", lambda: _eval_answer_case(d_cone_l(9, 12), "r=9, h=12", "15 cm")),
    ]
    for cid, fn in held_controls:
        cases.append(BenchmarkCase(cid, "held_out", "clean_control", False, False, lambda f=fn: {"flagged": f()}))

    held_errors = [
        # numeric_value (6)
        ("ho-num-01", "numeric_value", True, lambda: _eval_answer_case(d_cyl_csa(25, 35), "r=25, h=35", "5550 cm²")),
        ("ho-num-02", "numeric_value", True, lambda: _eval_answer_case(d_cone_l(8, 15), "r=8, h=15", "19 cm")),
        ("ho-num-03", "numeric_value", True, lambda: _eval_answer_case(d_sph_vol(6), "r=6", "286π cm³")),
        ("ho-num-04", "numeric_value", True, lambda: _eval_step_case([{"eq": "7040/7 / (1408/7) = 6", "math": {"latex": r"\dfrac{7040}{1408}=6"}}])),
        ("ho-num-05", "numeric_value", True, lambda: _eval_step_case([{"eq": "64+225 = 299", "math": {"latex": r"64+225=299"}}])),
        ("ho-num-06", "numeric_value", True, lambda: _eval_answer_case(d_frust_vol(5, 2, 4), "R=5, r=2, h=4", "54π cm³")),
        # wrong_operator (5)
        ("ho-op-01", "wrong_operator", True, lambda: _eval_step_case([{"eq": "sqrt(8^2 - 15^2) = 17", "math": {"latex": r"\sqrt{8^2-15^2}=17"}}])),
        ("ho-op-02", "wrong_operator", True, lambda: _eval_step_case([{"eq": "12 * 3 = 15", "math": {"latex": r"12\times 3=15"}}])),
        ("ho-op-03", "wrong_operator", True, lambda: _eval_step_case([{"eq": "20 + 8 = 12", "math": {"latex": r"20+8=12"}}])),
        ("ho-op-04", "wrong_operator", True, lambda: _eval_step_case([{"eq": "200*150 + 100 = 3000000", "math": {"latex": r"200\times 150+100=3000000"}}])),
        ("ho-op-05", "wrong_operator", True, lambda: _eval_step_case([{"eq": "6^3 - 2^3 = 224", "math": {"latex": r"6^3-2^3=224"}}])),
        # missing_power_sqrt (5)
        ("ho-pow-01", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "sqrt(64+225) = 289", "math": {"latex": r"\sqrt{64+225}=289"}}])),
        ("ho-pow-02", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "pi*6*12 = 432*pi", "math": {"latex": r"\pi(6)(12)=432\pi"}}])),
        ("ho-pow-03", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "4/3*pi*6^2 = 288*pi", "math": {"latex": r"\dfrac{4}{3}\pi(6)^2=288\pi"}}])),
        ("ho-pow-04", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "2*pi*(5+3) = 2*pi*(5^2+3^2)", "math": {"latex": r"2\pi(5+3)=2\pi(5^2+3^2)"}}])),
        ("ho-pow-05", "missing_power_sqrt", True, lambda: _eval_step_case([{"eq": "7^2 = 14", "math": {"latex": r"7^2=14"}}])),
        # wrong_fraction (5)
        ("ho-frac-01", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "201 + 1/7 = 1409/7", "math": {"latex": r"201+\dfrac{1}{7}=\dfrac{1409}{7}"}}])),
        ("ho-frac-02", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "1/3 + 2/3 = 2/3", "math": {"latex": r"\dfrac{1}{3}+\dfrac{2}{3}=\dfrac{2}{3}"}}])),
        ("ho-frac-03", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "216/360 = 2/5", "math": {"latex": r"\dfrac{216}{360}=\dfrac{2}{5}"}}])),
        ("ho-frac-04", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "3/2 * 3/2 = 6/4", "math": {"latex": r"\dfrac{3}{2}\times\dfrac{3}{2}=\dfrac{6}{4}"}}])),
        ("ho-frac-05", "wrong_fraction", True, lambda: _eval_step_case([{"eq": "436/3 - 100 = 236/3", "math": {"latex": r"\dfrac{436}{3}-100=\dfrac{236}{3}"}}])),
        # wrong_formula (6)
        ("ho-form-01", "wrong_formula", True, lambda: _eval_answer_case(d_cyl_csa(25, 35), "r=25, h=35", "2750 cm²")),
        ("ho-form-02", "wrong_formula", True, lambda: _eval_answer_case(d_sph_vol(6), "r=6", "144π cm³")),
        ("ho-form-03", "wrong_formula", True, lambda: _eval_answer_case(d_frust_vol(5, 2, 4), "R=5, r=2, h=4", "38π cm³")),
        ("ho-form-04", "wrong_formula", True, lambda: _eval_step_case([{"eq": "pi*(5^2-3^2) = pi*(3*5^2+3^2)", "math": {"latex": r"\pi(5^2-3^2)=\pi(3\cdot 5^2+3^2)"}}])),
        ("ho-form-05", "wrong_formula", True, lambda: _eval_answer_case(d_cone_l(8, 15), "r=8, h=15", "23 cm")),
        ("ho-form-06", "wrong_formula", True, lambda: _eval_step_case([{"eq": "2*pi*7*(7+10) = 2*pi*7*10", "math": {"latex": r"2\pi(7)(7+10)=2\pi(7)(10)"}}])),
        # unit_conversion (5)
        ("ho-unit-01", "unit_conversion", True, lambda: _eval_answer_case(d_cyl_csa(25, 35), "r=25 cm, h=35 cm", "5500 cm³")),
        ("ho-unit-02", "unit_conversion", True, lambda: _eval_answer_case(d_sph_vol(6), "r=6 cm", "288π cm²")),
        ("ho-unit-03", "unit_conversion", True, lambda: _eval_answer_case(d_cone_l(8, 15), "r=8 cm, h=15 cm", "17 cm²")),
        ("ho-unit-04", "unit_conversion", True, lambda: _eval_answer_case(DerivedResult(True, "l_to_cm3", sp.Integer(200), "volume", "exact", required_numbers=["200"]), "200 ml", "20 cm³")),
        ("ho-unit-05", "unit_conversion", True, lambda: _eval_answer_case(DerivedResult(True, "cm_to_m", sp.Rational(1, 2), "length", "exact", required_numbers=["50"]), "50 cm", "5 m")),
        # wrong_final_answer (5)
        ("ho-ans-01", "wrong_final_answer", True, lambda: _eval_answer_case(d_cyl_csa(25, 35), "r=25, h=35", "5400 cm²")),
        ("ho-ans-02", "wrong_final_answer", True, lambda: _eval_answer_case(d_cone_l(9, 12), "r=9, h=12", "18 cm")),
        ("ho-ans-03", "wrong_final_answer", True, lambda: _eval_answer_case(d_sph_vol(3), "r=3", "72π cm³")),
        ("ho-ans-04", "wrong_final_answer", True, lambda: _eval_answer_case(d_frust_vol(20, 8, 16), "R=20, r=8, h=16", "3228π cm³")),
        ("ho-ans-05", "wrong_final_answer", True, lambda: _eval_answer_case(DerivedResult(True, "mcq", sp.Integer(136) * sp.pi, "area", "exact"), "(A) 60π cm² (D) 136π cm²", "(A) 60π cm²")),
        # invalid_step_transform (5)
        ("ho-step-01", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "3*V = 90 => V = 270", "math": {"latex": r"3V=90 \Rightarrow V=270"}}])),
        ("ho-step-02", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "22/7 * 21 * 21 = 1380", "math": {"latex": r"\dfrac{22}{7}\times 21\times 21=1380"}}])),
        ("ho-step-03", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "sqrt(289) = 19", "math": {"latex": r"\sqrt{289}=19"}}])),
        ("ho-step-04", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "180*pi + 36*pi = 210*pi", "math": {"latex": r"180\pi+36\pi=210\pi"}}])),
        ("ho-step-05", "invalid_step_transform", True, lambda: _eval_step_case([{"eq": "1000 * 1.5 = 150", "math": {"latex": r"1000\times 1.5=150"}}])),
        # tamil_discrepancy (6)
        ("ho-ta-01", "tamil_discrepancy", True, lambda: _eval_tamil_case("விட்டம் 14 செ.மீ உயரம் 13 செ.மீ", "விட்டம் 16 செ.மீ உயரம் 13 செ.மீ")),
        ("ho-ta-02", "tamil_discrepancy", True, lambda: _eval_tamil_case("தடிமன் 4 செ.மீ உள்ளீடற்ற உருளை", "தடிமன் 4 செ.மீ உள்ளீடற்ற கூம்பு")),
        ("ho-ta-03", "tamil_discrepancy", True, lambda: _eval_tamil_case("கூம்பின் சாயுயரம் 17 செ.மீ", "கூம்பின் உயரம் 17 செ.மீ")),
        ("ho-ta-04", "tamil_discrepancy", True, lambda: _eval_tamil_case("கோளத்தின் ஆரம் 6 செ.மீ", "கோளத்தின் விட்டம் 6 செ.மீ")),
        ("ho-ta-05", "tamil_discrepancy", True, lambda: _eval_tamil_case("மீதமுள்ள தண்ணீரின் கன அளவு", "தண்ணீரின் கன அளவு")),
        ("ho-ta-06", "tamil_discrepancy", True, lambda: _eval_tamil_case("உருளையின் வளைபரப்பு", "உருளையின் கன அளவு")),
    ]
    for cid, cat, crit, fn in held_errors:
        cases.append(BenchmarkCase(cid, "held_out", cat, True, crit, lambda f=fn: {"flagged": f()}))

    return cases


def _score_subset(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    tp = sum(1 for r in rows if r["is_error"] and r["flagged"])
    fp = sum(1 for r in rows if not r["is_error"] and r["flagged"])
    fn = sum(1 for r in rows if r["is_error"] and not r["flagged"])
    tn = sum(1 for r in rows if not r["is_error"] and not r["flagged"])
    crit_missed = sum(1 for r in rows if r["is_error"] and r["critical"] and not r["flagged"])
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    return {
        "total": len(rows),
        "tp": tp,
        "fp": fp,
        "fn": fn,
        "tn": tn,
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "falsePositives": fp,
        "unresolved": 0,
        "criticalMissedErrors": crit_missed,
    }


def run_benchmark() -> Dict[str, Any]:
    cases = build_benchmark_cases()
    rows: List[Dict[str, Any]] = []
    for c in cases:
        out = c.runner()
        rows.append(
            {
                "caseId": c.case_id,
                "split": c.split,
                "category": c.category,
                "is_error": c.is_error,
                "critical": c.critical,
                "flagged": bool(out["flagged"]),
            }
        )

    dev_rows = [r for r in rows if r["split"] == "dev"]
    ho_rows = [r for r in rows if r["split"] == "held_out"]
    overall = _score_subset(rows)
    return {
        "schemaVersion": 1,
        "engine": "TRACE MathGuard V1.0",
        "summary": {
            **overall,
            "dev": _score_subset(dev_rows),
            "held_out": _score_subset(ho_rows),
        },
        "cases": rows,
    }
