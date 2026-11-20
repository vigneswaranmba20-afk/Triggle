#!/usr/bin/env python3
"""Offline regression tests: a single recorded WAV becomes nine reviewed scenes."""
import tempfile
from pathlib import Path
import sys
import unittest
from array import array
import math
import wave

sys.path.insert(0, str(Path(__file__).parent))
from trace_single_wav_import import import_recording, validate_source_url, find_boundaries


class SingleWavImportTest(unittest.TestCase):
    def test_reject_bad_urls(self):
        for bad in (
            "http://github.com/user-attachments/a.wav",
            "https://evil.com/user-attachments/assets/x",
            "https://github.com/a/b.wav",
            "https://github.com@evil.com/user-attachments/assets/a",
            "https://github.com:443/user-attachments/assets/a",
        ):
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                validate_source_url(bad)
        validate_source_url("https://github.com/user-attachments/assets/1234")

    def fixture(self, path, beat_count=9, extra_gap=False, missing_gap=False, rate=16000):
        buf = array("h")
        for i in range(beat_count):
            # Distinct non-silent synthetic beats, not real narration.
            for n in range(int(rate * 2.8)):
                buf.append(int(6500 * math.sin(2 * math.pi * (180 + 15 * i) * n / rate)))
            if i < beat_count - 1 and not (missing_gap and i == 3):
                gap = 2.4
                buf.extend([0] * int(rate * gap))
                if extra_gap and i == 3:
                    buf.extend([int(6500 * math.sin(2 * math.pi * 220 * n / rate)) for n in range(rate)])
                    buf.extend([0] * int(rate * gap))
        with wave.open(str(path), "wb") as audio:
            audio.setnchannels(1)
            audio.setsampwidth(2)
            audio.setframerate(rate)
            audio.writeframes(buf.tobytes())

    def test_success_manifest_and_no_overwrite(self):
        with tempfile.TemporaryDirectory() as tmp:
            source, target = Path(tmp) / "whole.wav", Path(tmp) / "split"
            self.fixture(source)
            result = import_recording(source, target, "g10-ch3-discriminant")
            self.assertEqual(len(result["beats"]), 9)
            self.assertEqual(len(result["detectedSeparatorSeconds"]), 8)
            self.assertFalse(result["releaseApproved"])
            self.assertTrue(result["noModelApiCalls"])
            self.assertEqual(len(list(target.glob("*.wav"))), 9)
            self.assertTrue((target / "voice-pack-manifest.json").exists())
            self.assertTrue(all(2.9 < row["durationSeconds"] < 4 for row in result["beats"]))
            with self.assertRaises(ValueError):
                import_recording(source, target, "g10-ch3-discriminant")

    def test_missing_boundary_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            source, target = Path(tmp) / "whole.wav", Path(tmp) / "split"
            self.fixture(source, missing_gap=True)
            with self.assertRaisesRegex(ValueError, "found 7"):
                import_recording(source, target, "g10-ch3-discriminant")
            self.assertFalse(target.exists())

    def test_extra_boundary_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            source, target = Path(tmp) / "whole.wav", Path(tmp) / "split"
            self.fixture(source, extra_gap=True)
            with self.assertRaisesRegex(ValueError, "found 9"):
                import_recording(source, target, "g10-ch3-discriminant")
            self.assertFalse(target.exists())

    def test_silent_recording_rejected(self):
        with self.assertRaisesRegex(ValueError, "quiet"):
            find_boundaries(array("h", [0] * 16000 * 30), 1, 16000, 16000 * 30, 9)


if __name__ == "__main__":
    unittest.main()
