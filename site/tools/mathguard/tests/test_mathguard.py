"""Pytest suite for TRACE MathGuard V1.0."""

from __future__ import annotations

from fractions import Fraction
from pathlib import Path

import pytest
import sympy as sp

from mathguard import geometry as geo
from mathguard.arithmetic import exact_fractions_equal, parse_ratio, ratios_equivalent, to_exact_fraction
from mathguard.algebra import quadratic_discriminant, try_derive_algebra_from_prompt
from mathguard.benchmark import run_benchmark
from mathguard.benchmark_v1_1 import run_v1_1_benchmark
from mathguard.benchmark_v1_2 import run_v1_2_benchmark
from mathguard.benchmark_v1_3_adversarial import run_adversarial_benchmark
from mathguard.benchmark_v1_3_1_holdout import run_holdout_100
from mathguard.coord_geometry import are_collinear, distance, midpoint, slope, triangle_area
from mathguard.corrector import propose_and_verify_correction
from mathguard.derivations_g10_ch7 import DerivedResult
from mathguard.engine import run_audit
from mathguard.mcq import extract_selected_option_label, option_matches_derived, parse_mcq_options_en
from mathguard.parser import ParseError, parse_expression
from mathguard.rounding import check_numeric_match
from mathguard.steps import validate_steps
from mathguard.symbolic import evaluate_with_pi_mode, expressions_equivalent
from mathguard.tamil_consistency import screen_tamil_vs_reference, validate_en_ta_consistency
from mathguard.units import convert_length, convert_volume, detect_answer_dimension

REPO_ROOT = Path(__file__).resolve().parents[4]


def test_parser_latex_and_unicode():
    e1 = parse_expression(r"\dfrac{22}{7} \times 7^2")
    assert e1 == sp.Integer(154)

    e2 = parse_expression(r"\sqrt{8^2 + (12-6)^2}")
    assert e2 == sp.Integer(10)

    e3 = parse_expression("1005 5/7")
    assert e3 == sp.Rational(7040, 7)

    e4 = parse_expression(r"4\pi r^2")
    assert expressions_equivalent(e4, 4 * sp.pi * sp.Symbol("r") ** 2)


def test_parser_rejects_arbitrary_code():
    with pytest.raises(ParseError):
        parse_expression("__import__('os').system('id')")


def test_arithmetic_and_ratios():
    assert exact_fractions_equal("1005 5/7", Fraction(7040, 7))
    assert to_exact_fraction("4/3") == Fraction(4, 3)
    r1 = parse_ratio("3600 : 5040")
    r2 = parse_ratio("5 : 7")
    assert r1 is not None and r2 is not None
    assert ratios_equivalent(r1, r2)


def test_geometry_and_units():
    assert geo.cone_slant_height(sp.Integer(5), sp.Integer(12)) == sp.Integer(13)
    assert geo.frustum_volume(sp.Integer(20), sp.Integer(8), sp.Integer(16)) == sp.Integer(3328) * sp.pi
    assert convert_length(Fraction(2), "mm", "cm") == Fraction(1, 5)
    assert convert_volume(Fraction(25, 10), "m3", "litres") == Fraction(2500)
    assert detect_answer_dimension("440 cm²") == "area"
    assert detect_answer_dimension("1642.67 cm³") == "volume"
    assert detect_answer_dimension("17 cm") == "length"


def test_rounding_and_pi_modes():
    expr = sp.Integer(216) * sp.pi * 2
    val_22_7 = evaluate_with_pi_mode(expr, "22/7")
    assert val_22_7 is not None
    assert abs(val_22_7 - 1357.7142857) < 1e-4
    m = check_numeric_match(expr, 1357.72, tolerance=0.02, preferred_pi="22/7")
    assert m.matched


def test_steps_validator_catches_invalid_transform():
    ok = validate_steps([{"eq": "2*22/7*7*10 = 440", "math": {"latex": r"2\times\dfrac{22}{7}\times 7\times 10=440"}}])
    assert ok.status == "PASS"

    bad = validate_steps([{"eq": "14h = 140 => h = 140*14", "math": {"latex": r"14h=140 \Rightarrow h=140\times 14"}}])
    assert bad.status == "FAIL"


def test_mcq_validator():
    opts = parse_mcq_options_en("Q?\n(A) 60π cm²\n(B) 68π cm²\n(C) 120π cm²\n(D) 136π cm²")
    assert len(opts) == 4
    assert extract_selected_option_label("(D) 136π cm²") == "D"
    assert option_matches_derived(opts["D"], sp.Integer(136) * sp.pi)
    assert not option_matches_derived(opts["A"], sp.Integer(136) * sp.pi)


def test_tamil_consistency_and_screening():
    res = validate_en_ta_consistency(
        "The radius is 7 cm and height is 10 cm.",
        "ஆரம் 7 செ.மீ மற்றும் உயரம் 10 செ.மீ.",
    )
    assert res.status == "PASS"

    scr = screen_tamil_vs_reference("ஆரம் 7 செ.மீ உருளை", "விட்டம் 7 செ.மீ உருளை")
    assert scr["requiresReview"] is True
    assert "math_terminology" in scr["flags"]


def test_g10_ch7_audit_inventory_and_answers():
    report = run_audit(REPO_ROOT)
    s = report["summary"]
    assert s["exercises"] == 62
    assert s["concepts"] == 9
    assert s["totalItems"] == 71
    assert s["answerVerificationCounts"]["FAIL"] == 0
    assert s["answerVerificationCounts"]["UNVERIFIABLE"] == 1
    assert s["answerVerificationCounts"]["PASS"] == 70


def test_120_case_mutation_benchmark():
    res = run_benchmark()
    s = res["summary"]
    assert s["total"] == 120
    assert s["dev"]["total"] == 60
    assert s["held_out"]["total"] == 60
    assert s["criticalMissedErrors"] == 0
    assert s["falsePositives"] == 0
    assert s["recall"] == 1.0
    assert s["precision"] == 1.0


def test_v1_1_context_domain_and_non_silent_unverified():
    # Physical positive domain allows r^2=16 => r=4
    ok_phys = validate_steps([{"eq": "", "math": {"latex": r"r^2=16 \Rightarrow r=4"}}], allow_positive_domain=True)
    assert ok_phys.status == "PASS"

    # Unrestricted algebraic variable MUST flag x^2=16 => x=4
    bad_alg = validate_steps([{"eq": "", "math": {"latex": r"x^2=16 \Rightarrow x=4"}}], allow_positive_domain=False)
    assert bad_alg.status == "FAIL"

    # Unverified substitution without env bindings MUST NOT silently PASS
    unver = validate_steps([{"eq": "", "math": {"latex": r"V=\pi r^2 h=154"}}])
    assert unver.status != "PASS"


def test_v1_1_108_case_benchmark():
    res = run_v1_1_benchmark()
    s = res["summary"]
    assert s["total"] == 108
    assert s["criticalMissedErrors"] == 0
    assert s["falsePositives"] == 0
    assert s["precision"] >= 0.98
    assert s["recall"] >= 0.98


def test_v1_2_division_by_zero_and_safe_corrector():
    div0 = validate_steps([{"eq": "", "math": {"latex": r"\dfrac{5}{0}=5"}}])
    assert div0.status == "FAIL"

    d_cyl = DerivedResult(True, "cyl", geo.cylinder_csa(sp.Integer(7), sp.Integer(10)), "area", "22/7", required_numbers=["7", "10"])
    bad_item = {"id": "syn-fix", "q": {"en": "r=7 cm, h=10 cm"}, "answer": "220 cm²", "steps": []}
    prop = propose_and_verify_correction(bad_item, "synthetic", d_cyl)
    assert prop.status == "APPROVED"

    unver_item = {"id": "syn-unver", "q": {"en": "qualitative"}, "answer": "cone", "steps": []}
    unver_prop = propose_and_verify_correction(unver_item, "synthetic", DerivedResult(False, "qualitative"))
    assert unver_prop.status == "UNRESOLVED"


def test_v1_2_300_case_benchmark():
    res = run_v1_2_benchmark()
    s = res["summary"]
    assert s["total"] == 300
    assert s["criticalMissedErrors"] == 0
    assert s["falsePositives"] == 0
    assert s["precision"] >= 0.98
    assert s["recall"] >= 0.98


def test_v1_3_algebra_and_coord_geometry():
    assert quadratic_discriminant(sp.Integer(1), sp.Integer(-5), sp.Integer(6)) == sp.Integer(1)
    d = try_derive_algebra_from_prompt("Solve x^2 - 5x + 6 = 0.")
    assert d.verifiable and set(d.value) == {sp.Integer(2), sp.Integer(3)}

    p1 = (sp.Integer(2), sp.Integer(4))
    p2 = (sp.Integer(8), sp.Integer(10))
    assert midpoint(p1, p2) == (sp.Integer(5), sp.Integer(7))
    assert distance((sp.Integer(0), sp.Integer(0)), (sp.Integer(3), sp.Integer(4))) == sp.Integer(5)
    assert slope(p1, p2) == sp.Integer(1)
    assert are_collinear((sp.Integer(0), sp.Integer(0)), (sp.Integer(1), sp.Integer(2)), (sp.Integer(2), sp.Integer(4)))
    assert triangle_area((sp.Integer(0), sp.Integer(0)), (sp.Integer(4), sp.Integer(0)), (sp.Integer(0), sp.Integer(3))) == sp.Integer(6)


def test_v1_3_186_case_adversarial_benchmark():
    res = run_adversarial_benchmark()
    s = res["summary"]
    assert s["total"] == 186
    assert s["falsePositives"] == 0
    assert s["criticalMissedErrors"] == 0
    assert s["precision"] == 1.0
    assert s["recall"] == 1.0


def test_v1_3_1_100_case_holdout():
    res = run_holdout_100()
    s = res["summary"]
    assert s["total"] == 100
    assert s["falsePositives"] == 0
    assert s["criticalMissedErrors"] == 0
    assert s["precision"] == 1.0
    assert s["recall"] == 1.0


def test_v1_3_2_ch5_coverage():
    from mathguard.audit_chapters import _audit_generic_chapter, load_all_3_chapters

    b = load_all_3_chapters(REPO_ROOT)
    ch5_rep = _audit_generic_chapter("5", b["chapters"]["5"], "coord")
    assert ch5_rep["counts"]["total"] == 110
    assert ch5_rep["answerVerificationCounts"]["PASS"] >= 105
    assert ch5_rep["answerVerificationCounts"].get("FAIL", 0) == 0


def test_v1_3_2a_ch5_hardening_and_mutations():
    from mathguard.ch5_mutation_tests import run_ch5_mutation_suite

    res = run_ch5_mutation_suite(REPO_ROOT)
    assert res["total"] >= 25
    assert res["failed"] == 0, [c for c in res["cases"] if not c["passed"]]


def test_v1_3_3_ch3_coverage_and_mutations():
    from mathguard.audit_chapters import _audit_generic_chapter, load_all_3_chapters
    from mathguard.ch3_mutation_tests import run_ch3_mutation_suite

    b = load_all_3_chapters(REPO_ROOT)
    ch3_rep = _audit_generic_chapter("3", b["chapters"]["3"], "algebra")
    assert ch3_rep["counts"]["total"] == 153
    assert ch3_rep["answerVerificationCounts"]["PASS"] >= 146
    assert ch3_rep["answerVerificationCounts"].get("FAIL", 0) == 0

    mut = run_ch3_mutation_suite(REPO_ROOT)
    assert mut["total"] >= 25
    assert mut["failed"] == 0, [c for c in mut["cases"] if not c["passed"]]


def test_v1_3_4_reasoning_engine_and_mutations(tmp_path):
    from mathguard.audit_chapters import run_all_3_chapters_audit
    from mathguard.reasoning_mutation_tests import run_reasoning_mutation_tests

    mut_results = run_reasoning_mutation_tests()
    assert len(mut_results) >= 11
    failed_muts = [r for r in mut_results if not r.passed]
    assert not failed_muts, failed_muts

    summary = run_all_3_chapters_audit(REPO_ROOT, tmp_path)
    ch3_w = summary["chapters"]["ch3_algebra"]["workingVerificationCounts"]
    ch5_w = summary["chapters"]["ch5_coord_geometry"]["workingVerificationCounts"]
    ch7_w = summary["chapters"]["ch7_mensuration"]["workingVerificationCounts"]

    total_pass = ch3_w.get("PASS", 0) + ch5_w.get("PASS", 0) + ch7_w.get("PASS", 0)
    assert ch5_w.get("PASS", 0) >= 80, ch5_w
    assert ch7_w.get("PASS", 0) >= 40, ch7_w
    assert ch3_w.get("PASS", 0) >= 90, ch3_w
    assert total_pass >= 210, f"Expected >= 210/334 hardened PASS, got {total_pass}"


def test_v1_3_4a_adversarial_hardening():
    from mathguard.adversarial_v1_3_4a import run_v1_3_4a_adversarial_suite

    res = run_v1_3_4a_adversarial_suite()
    assert res["total"] >= 20
    assert res["falseAcceptances"] == 0, res["details"]
    assert res["falseRejections"] == 0, res["details"]
    assert res["passed"] == res["total"], [d for d in res["details"] if not d["passed"]]


