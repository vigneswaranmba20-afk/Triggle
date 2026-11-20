#!/usr/bin/env python3
"""Offline security and completeness checks for TRACE voice pack import."""
import math
from pathlib import Path
import sys
import tempfile
import unittest
import wave
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parent))
from trace_voice_pack_import import import_zip, lesson_beat_names, validate_source_url


class VoicePackImportTests(unittest.TestCase):
    def setUp(self):
        self.work = tempfile.TemporaryDirectory()
        self.addCleanup(self.work.cleanup)
        self.root = Path(self.work.name)
        self.names = lesson_beat_names("g10-ch2-gp-sum")

    def make_archive(self, omitted=None, extra=None, bad=None, folder=""):
        archive = self.root / "voice-pack.zip"
        with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
            for name in self.names:
                if name == omitted:
                    continue
                audio = self.root / (name + ".wav")
                with wave.open(str(audio), "wb") as target:
                    target.setnchannels(1)
                    target.setsampwidth(2)
                    target.setframerate(24000)
                    target.writeframes(b"\\0\\0" * 24000)
                filename = folder + name + ".wav"
                bundle.write(audio, filename)
            if extra:
                bundle.writestr(extra, b"junk")
            if bad:
                bundle.writestr(bad, b"junk")
        return archive

    def test_valid_nine_beat_pack(self):
        archive = self.make_archive(folder="gp-audio/")
        result = import_zip(archive, self.root / "out", "g10-ch2-gp-sum")
        self.assertEqual(len(result["beats"]), 9)
        self.assertFalse(result["releaseApproved"])
        self.assertTrue(result["reviewRequired"])
        self.assertTrue(result["noModelApiCalls"])
        self.assertEqual([item["beat"] for item in result["beats"]], self.names)
        self.assertEqual([item["durationSeconds"] for item in result["beats"]], [1.0] * 9)

    def test_missing_beat_blocked(self):
        archive = self.make_archive(omitted=self.names[-1])
        with self.assertRaisesRegex(ValueError, "missing"):
            import_zip(archive, self.root / "out", "g10-ch2-gp-sum")

    def test_unknown_file_blocked(self):
        archive = self.make_archive(extra="other.wav")
        with self.assertRaisesRegex(ValueError, "Unknown"):
            import_zip(archive, self.root / "out", "g10-ch2-gp-sum")

    def test_nested_zip_path_blocked(self):
        archive = self.make_archive(extra="../../bad.wav")
        with self.assertRaisesRegex(ValueError, "Unsafe"):
            import_zip(archive, self.root / "out", "g10-ch2-gp-sum")

    def test_mixed_folders_blocked(self):
        archive = self.make_archive(folder="gp-audio/", extra=self.names[0] + ".wav")
        with self.assertRaisesRegex(ValueError, "duplicate"):
            import_zip(archive, self.root / "out", "g10-ch2-gp-sum")

    def test_invalid_url_blocked(self):
        for url in (
            "http://github.com/user-attachments/files/123/a.zip",
            "https://example.com/user-attachments/files/123/a.zip",
            "https://github.com/owner/repo/raw/main/a.zip",
            "https://github.com@evil.example/user-attachments/files/123/a.zip",
        ):
            with self.subTest(url=url):
                with self.assertRaises(ValueError):
                    validate_source_url(url)
        self.assertEqual(
            validate_source_url("https://github.com/user-attachments/files/123/audio.zip"),
            "https://github.com/user-attachments/files/123/audio.zip",
        )


if __name__ == "__main__":
    unittest.main()
