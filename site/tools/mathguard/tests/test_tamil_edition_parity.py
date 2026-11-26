"""Regression tests for localized answer fields and 2025 edition-specific rounding."""

from copy import deepcopy
from pathlib import Path

import pytest

from mathguard.adapters.base import verify_tamil_math_parity
from mathguard.adapters.mensuration_adapter import MensurationAdapter
from mathguard.engine import load_g10_ch7_bundle


def test_legacy_and_structured_localized_answers():
    item = {
        "q": {"en": "Find 2 + 3.", "ta": "2 + 3 ஐக் காண்க."},
        "steps": [{"en": "Add 2 and 3.", "ta": "2 மற்றும் 3 ஐக் கூட்டுக.", "eq": "2 + 3 = 5"}],
        "answer": {"en": "5", "ta": "2"},
        "answerTa": "5",
    }
    assert verify_tamil_math_parity(item).status == "PASS"
    item["answerTa"] = "7"
    assert verify_tamil_math_parity(item).status == "FAIL"

    del item["answerTa"]
    item["answer"].pop("ta")
    result = verify_tamil_math_parity(item)
    assert result.status == "PARTIAL" and not result.has_tamil_answer
    assert "missing_tamil_answer" in result.flags

    item["answer"] = "5"
    item["answerMath"] = {"en": {"fallback": "5", "latex": "5"}}
    result = verify_tamil_math_parity(item)
    assert result.status == "PARTIAL" and "missing_tamil_answer" in result.flags
    item["answerMath"]["ta"] = {"fallback": "விடை 5", "latex": "5"}
    assert verify_tamil_math_parity(item).status == "PASS"
    item["answerMath"]["ta"] = {"fallback": "விடை கிடைக்கவில்லை"}
    assert verify_tamil_math_parity(item).status == "PARTIAL"


@pytest.fixture(scope="module")
def observed_q3():
    root = Path(__file__).resolve().parents[4]
    return next(item for item in load_g10_ch7_bundle(root)["exercises"] if item["id"] == "c10-7-ex7-3-q3")


@pytest.fixture
def corrected_q3(observed_q3):
    item = deepcopy(observed_q3)
    item["answer"] = "2 cm³"
    item["answerTa"] = "சுமார் 2.46 கன செ.மீ"
    item["answerMath"] = {
        "en": {"latex": r"\boxed{2\,\mathrm{cm}^3}", "fallback": "2 cm³"},
        "ta": {"latex": r"\boxed{\approx2.46\,\text{செ.மீ}^3}", "fallback": item["answerTa"]},
    }
    return item


def test_both_reviewed_edition_results_are_verified(corrected_q3):
    result = MensurationAdapter(10, "7").verify_item(corrected_q3)
    assert result["tamil_status"] == "PASS", result
    assert result["answer_status"] == "PASS"
    assert result["tamil_answer_evidence"]["exactVolumeCm3"] == "98*pi/125"
    assert result["tamil_answer_evidence"]["forms"] == {
        lang: {rep: "PASS" for rep in ("plain", "fallback", "latex")} for lang in ("en", "ta")
    }
    # Tamil does not prescribe rounding, so the independently derived exact value is also valid.
    exact = "98π/125 கன செ.மீ"
    corrected_q3["answerTa"] = exact
    corrected_q3["answerMath"]["ta"] = {"fallback": exact, "latex": r"\frac{98\pi}{125}\,\mathrm{cm}^3"}
    assert MensurationAdapter(10, "7").verify_item(corrected_q3)["tamil_status"] == "PASS"


@pytest.mark.parametrize(("language", "form", "value"), [
    ("ta", "plain", "2 கன செ.மீ"),
    ("ta", "plain", "−2.46 கன செ.மீ"),
    ("ta", "fallback", "2.46 செ.மீ²"),
    ("ta", "latex", r"\boxed{2.47\,\text{செ.மீ}^3}"),
    ("en", "latex", r"\boxed{2.46\,\mathrm{cm}^3}"),
    ("ta", "plain", "2.47 கன செ.மீ; 2.46 கன செ.மீ"),
])
def test_correct_value_elsewhere_does_not_hide_a_wrong_localized_answer(corrected_q3, language, form, value):
    if form == "plain":
        corrected_q3["answer" if language == "en" else "answerTa"] = value
    else:
        corrected_q3["answerMath"][language][form] = value
    result = MensurationAdapter(10, "7").verify_item(corrected_q3)
    assert result["tamil_status"] != "PASS", result
    assert result["tamil_answer_evidence"]["forms"][language][form] != "PASS"


def test_edition_precision_needs_checked_matching_source(corrected_q3):
    corrected_q3["q"]["ta"] += " முழு எண்ணாகத் தருக."
    result = MensurationAdapter(10, "7").verify_item(corrected_q3)
    assert result["tamil_status"] != "PASS"
    assert "edition_rounding_source_unverified" in result["tamil_flags"]
