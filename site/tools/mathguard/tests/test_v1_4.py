"""TRACE MathGuard V1.4 unit and integration tests."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

from mathguard.adapters import (
    UnsupportedDomainAdapter,
    get_adapter_for_chapter,
    verify_tamil_math_parity,
)
from mathguard.adversarial_v1_4 import run_v1_4_adversarial_suite


REPO_ROOT = Path(__file__).resolve().parents[4]


def test_v1_4_chapter_independent_adapters():
    for g in (9, 10):
        assert get_adapter_for_chapter(g, "3").domain == "algebra"
        assert get_adapter_for_chapter(g, "5").domain == "coordinate_geometry"
        assert get_adapter_for_chapter(g, "7").domain == "mensuration"

    for g, ch, dom in [
        (9, "1", "sets_and_relations"),
        (9, "4", "euclidean_geometry"),
        (9, "8", "statistics"),
        (9, "9", "probability"),
        (10, "1", "sets_and_relations"),
        (10, "4", "euclidean_geometry"),
        (10, "8", "statistics_and_probability"),
    ]:
        ad = get_adapter_for_chapter(g, ch)
        assert isinstance(ad, UnsupportedDomainAdapter)
        assert ad.domain == dom
        assert ad.adapter_status == "planned_v1_4"
        res = ad.verify_item({"id": f"test-g{g}-ch{ch}", "q": {"en": "Sample"}, "steps": [{"math": {"latex": "1+1=2"}}]})
        assert res["working_status"] == "UNVERIFIABLE"
        assert res["answer_status"] == "UNVERIFIABLE"


def test_v1_4_270_case_adversarial_suite():
    res = run_v1_4_adversarial_suite()
    assert res["totalCases"] >= 250
    assert res["failed"] == 0, f"Adversarial failures: {res['failures']}"
    assert res["falseAcceptances"] == 0
    assert res["falseRejections"] == 0


def test_v1_4_tamil_math_parity():
    bad_item = {
        "id": "ta-parity-bad",
        "q": {"en": "Find the area of a square of side 7 cm.", "ta": "9 செ.மீ பக்க அளவுள்ள சதுரத்தின் பரப்பளவு காண்க."},
        "steps": [{"en": "Side a = 7 cm", "ta": "பக்கம் a = 9 செ.மீ", "math": {"latex": "a = 7"}}],
        "answer": {"en": "49 cm²", "ta": "81 செ.மீ²"},
    }
    res_bad = verify_tamil_math_parity(bad_item)
    assert res_bad.status == "FAIL"

    good_item = {
        "id": "ta-parity-good",
        "q": {"en": "Find the area of a square of side 7 cm.", "ta": "7 செ.மீ பக்க அளவுள்ள சதுரத்தின் பரப்பளவு காண்க."},
        "steps": [{"en": "Side a = 7 cm", "ta": "பக்கம் a = 7 செ.மீ", "math": {"latex": "a = 7"}}],
        "answer": {"en": "49 cm²", "ta": "49 செ.மீ²"},
    }
    res_good = verify_tamil_math_parity(good_item)
    assert res_good.status == "PASS"


def test_v1_4_cross_grade_discovery():
    extractor = REPO_ROOT / "site" / "tools" / "mathguard" / "extractor_v1_4.cjs"
    proc = subprocess.run(["node", str(extractor)], cwd=str(REPO_ROOT), capture_output=True, text=True, check=True)
    bundle = json.loads(proc.stdout)
    for g in ("9", "10"):
        for ch in ("3", "5", "7"):
            counts = bundle["grades"][g]["chapters"][ch]["counts"]
            assert counts["exercises"] > 0, f"Expected exercises in G{g} Ch{ch}"
