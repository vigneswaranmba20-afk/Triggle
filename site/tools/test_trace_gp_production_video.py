#!/usr/bin/env python3
"""Regression gate for the production-quality Grade 10 G.P. narrated video."""
import json
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "site" / "tools"))
from trace_video_factory import load_lesson, validate_lesson, GP_ORDER
from trace_video_release import verify as release_verify


class GeometricProductionVideoTest(unittest.TestCase):
    def test_audio_segments_present_and_valid(self):
        audio_dir = ROOT / "site" / "video-factory" / "audio" / "g10-ch2-gp-sum"
        spec = load_lesson("g10-ch2-gp-sum")
        for beat in spec["beats"]:
            wav = audio_dir / f"{beat['id']}.wav"
            self.assertTrue(wav.is_file(), f"Missing audio: {wav}")
            self.assertGreater(wav.stat().st_size, 10000, f"Audio too small: {wav}")

    def test_production_preview_result_and_media(self):
        result_file = ROOT / "build" / "trace-video" / "production-preview" / "result.json"
        if not result_file.is_file():
            self.skipTest("Production preview result.json not yet generated")
        record = json.loads(result_file.read_text(encoding="utf8"))
        self.assertEqual(record["factoryVersion"], 1)
        self.assertEqual(record["lessonId"], "g10-ch2-gp-sum")
        self.assertEqual(record["mode"], "existing")
        self.assertEqual(record["width"], 720)
        self.assertEqual(record["height"], 1280)
        self.assertEqual(record["fps"], 12)
        self.assertTrue(record["publishable"])
        self.assertAlmostEqual(record["durationSeconds"], 93.19, delta=0.5)
        self.assertEqual(len(record["beats"]), 9)
        self.assertEqual([b["scene"] for b in record["beats"]], GP_ORDER)

        # Release guard verification
        rec, path = release_verify(str(result_file), record["sha256"], "g10-ch2-gp-sum")
        self.assertEqual(path.name, "g10-ch2-gp-sum-existing.mp4")
        self.assertTrue(path.is_file())


if __name__ == "__main__":
    unittest.main()
