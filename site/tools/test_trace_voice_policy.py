#!/usr/bin/env python3
"""Regression checks for offline TRACE narration policy. No network or paid API calls."""
import copy
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from trace_video_factory import (
    DEFAULT_VOICE_DELIVERY,
    build_speech_prompt,
    load_lesson,
    segment_audio,
)


class VoicePolicyTest(unittest.TestCase):
    def test_default_prompt_is_neutral_and_teaches_clearly(self):
        passage = "The first term is two. Now add six."
        prompt = build_speech_prompt(passage)
        self.assertIn(passage, prompt)
        self.assertIn("neutral international English", prompt)
        self.assertIn("pauses around equations", prompt)
        self.assertNotIn("gentle Indian English pronunciation", prompt)
        self.assertIn("No background music", prompt)

    def test_rejects_empty_narration_and_bad_delivery(self):
        with self.assertRaises(ValueError):
            build_speech_prompt("")
        with self.assertRaises(ValueError):
            build_speech_prompt("Hello", "short")
        with self.assertRaises(ValueError):
            build_speech_prompt("Hello", "x" * 601)

    def test_delivery_change_invalidates_cached_audio_without_network(self):
        spec = load_lesson("g10-ch2-ap-sum")
        beat = spec["beats"][0]
        with tempfile.TemporaryDirectory() as tmp:
            cache = Path(tmp)
            original = segment_audio(beat, spec, cache, "demo", None, None)
            updated_spec = copy.deepcopy(spec)
            updated_spec["voice"]["delivery"] = (
                DEFAULT_VOICE_DELIVERY + " Leave a gentle pause after every question."
            )
            revised = segment_audio(beat, updated_spec, cache, "demo", None, None)
            self.assertNotEqual(original.name, revised.name)
            self.assertTrue(original.is_file())
            self.assertTrue(revised.is_file())

    def test_external_wav_audio_remains_supported(self):
        spec = load_lesson("g10-ch2-ap-sum")
        beat = spec["beats"][0]
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "approved"
            source.mkdir()
            cache = root / "cache"
            from trace_video_factory import demo_audio
            demo_audio(source / (beat["id"] + ".wav"), seconds=1)
            result = segment_audio(beat, spec, cache, "existing", source, None)
            self.assertTrue(result.is_file())
            self.assertEqual(result.read_bytes(), (source / (beat["id"] + ".wav")).read_bytes())


if __name__ == "__main__":
    unittest.main()
