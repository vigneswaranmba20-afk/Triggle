#!/usr/bin/env python3
"""Mission 05: reusable one-WAV silence splitter with the *new* Thales lesson."""
from array import array
from pathlib import Path
import math
import sys
import tempfile
import unittest
import wave

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site"/"tools"))
from trace_single_wav_import import import_recording
from trace_video_factory import load_lesson
from trace_one_wav_recording_sheet import guide


def make_fixture(filename, missing=False, extra=False, rate=16000):
    # Original synthesized *tones*, not copyrighted or AI-generated narration.
    # Only checks deterministic scene splitting, not speech semantics.
    signal=array("h")
    for beat in range(9):
        for n in range(rate*25//10):
            signal.append(int(6600*math.sin(2*math.pi*(160+13*beat)*n/rate)))
        if beat<8 and not (missing and beat==2):
            signal.extend([0]*(rate*22//10))
            if extra and beat==4:
                for n in range(rate):
                    signal.append(int(6400*math.sin(2*math.pi*205*n/rate)))
                signal.extend([0]*(rate*22//10))
    with wave.open(str(filename),"wb") as wf:
        wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(rate)
        wf.writeframes(signal.tobytes())


class ThalesOneWavTest(unittest.TestCase):
    def test_thales_nine_real_ids_one_wav_no_api_and_no_approval(self):
        lesson=load_lesson("g10-ch4-bpt-thales")
        expected=[b["id"]+".wav" for b in lesson["beats"]]
        with tempfile.TemporaryDirectory() as tmp:
            source=Path(tmp)/"one.wav"
            dest=Path(tmp)/"split"
            make_fixture(source)
            result=import_recording(source,dest,lesson["id"])
            self.assertEqual(result["lessonId"],"g10-ch4-bpt-thales")
            self.assertEqual([x["filename"] for x in result["beats"]],expected)
            self.assertEqual(len(result["detectedSeparatorSeconds"]),8)
            self.assertFalse(result["releaseApproved"])
            self.assertTrue(result["reviewRequired"])
            self.assertTrue(result["noModelApiCalls"])
            self.assertEqual(result["alignmentMethod"],"eight-verified-long-silence-separators")
            self.assertTrue(all((dest/name).is_file() for name in expected))
            with self.assertRaises(ValueError):
                import_recording(source,dest,lesson["id"])

    def test_one_copy_recording_sheet_has_exact_narration(self):
        spec=load_lesson("g10-ch4-bpt-thales")
        source=(ROOT/"docs/trace/THALES_ONE_SHOT_FOLA_RECORDING_SHEET.md")
        content=source.read_text(encoding="utf8")
        self.assertEqual(content,guide(spec))
        self.assertEqual(content.count(" — followed by a 2.5–3 s silent separator"),8)
        self.assertIn("only within account limits",content)
        self.assertIn("private review MP4",content)

    def test_missing_and_extra_gap_refuse_to_guess(self):
        for missing,extra,found in ((True,False,7),(False,True,9)):
            with self.subTest(missing=missing,extra=extra),tempfile.TemporaryDirectory() as tmp:
                source=Path(tmp)/"one.wav";output=Path(tmp)/"output"
                make_fixture(source,missing,extra)
                with self.assertRaisesRegex(ValueError,f"found {found}"):
                    import_recording(source,output,"g10-ch4-bpt-thales")
                self.assertFalse(output.exists())

if __name__=="__main__":
    unittest.main()
