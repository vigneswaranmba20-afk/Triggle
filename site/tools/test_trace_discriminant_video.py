#!/usr/bin/env python3
"""Mission 04: offline discriminant math, narrative, art and regression tests."""
import copy
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "site" / "tools"))

from trace_video_factory import DISC_ORDER, load_lesson, validate_lesson
from trace_discriminant_artwork import (
    Image, artwork, discriminant, example_c, real_roots,
)
from trace_video_recording_sheet import sheet


class DiscriminantVideoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.lesson = load_lesson("g10-ch3-discriminant")

    def test_source_verified_example_and_practice(self):
        visual = self.lesson["visual"]
        self.assertEqual(visual["template"], "discriminant-parabola-v1")
        self.assertEqual(visual["example"], {"a": 1, "b": -4, "cValues": [3,4,5]})
        self.assertEqual(visual["practice"], {"a": 2, "b": -6, "c": 5})
        source = (ROOT / "site" / "data" / "g10-ch3-concepts.js").read_text(encoding="utf-8")
        start = source.index('"id": "g10-ch3-discriminant"')
        section = source[start:source.index('"id": "g10-ch3-roots-coeff"',start)]
        for phrase in ("c = 3", "c = 4", "c = 5", "2x² − 6x + 5", "Δ = −4"):
            self.assertIn(phrase, section)
        self.assertEqual(discriminant(1,-4,3),4)
        self.assertEqual(discriminant(1,-4,4),0)
        self.assertEqual(discriminant(1,-4,5),-4)
        self.assertEqual(discriminant(2,-6,5),-4)

    def test_intersections_are_exact(self):
        self.assertEqual(real_roots(1,-4,3),(1,3))
        self.assertEqual(real_roots(1,-4,4),(2,2))
        self.assertEqual(real_roots(1,-4,5),())
        self.assertEqual(real_roots(2,-6,5),())
        with self.assertRaises(ValueError):
            discriminant(0,2,3)

    def test_scene_transition_math(self):
        values = [3,4,5]
        self.assertEqual(example_c(values,"disc-touch",0),3)
        self.assertEqual(example_c(values,"disc-touch",1),4)
        self.assertEqual(example_c(values,"disc-none",0),4)
        self.assertEqual(example_c(values,"disc-none",1),5)
        self.assertEqual(example_c(values,"disc-slider",1),5)

    def test_nine_beats_are_ordered_and_narration_is_sealed(self):
        spec=self.lesson
        self.assertEqual(len(spec["beats"]),9)
        self.assertEqual([b["scene"] for b in spec["beats"]],DISC_ORDER)
        self.assertEqual(spec["voice"]["name"],"Fola")
        self.assertEqual(spec["voice"]["model"],"gemini-3.8-flash-tts")
        self.assertIn("pause",spec["beats"][-2]["narration"].lower())
        first_eight=" ".join(b["narration"].lower() for b in spec["beats"][:-1])
        self.assertNotIn("negative four",first_eight)
        self.assertIn("negative four",spec["beats"][-1]["narration"].lower())

    def test_lesson_rejects_mathematical_and_order_regressions(self):
        for changed in (
            lambda x:x["visual"]["example"]["cValues"].__setitem__(1,5),
            lambda x:x["visual"]["practice"].__setitem__("c",4),
            lambda x:x["beats"][4].__setitem__("scene","disc-none"),
            lambda x:x["beats"][-2].__setitem__("narration","Predict the roots, then say what happens."),
            lambda x:x["beats"][-2].__setitem__("narration","The discriminant is negative four. Pause and try it."),
        ):
            wrong=copy.deepcopy(self.lesson)
            changed(wrong)
            with self.subTest(changed=changed),self.assertRaises(ValueError):
                validate_lesson(wrong)

    def test_recording_sheet_matches_exact_source_narration(self):
        path=ROOT / 'docs' / 'trace' / 'DISCRIMINANT_FOLA_RECORDING_SHEET.md'
        self.assertEqual(path.read_text(encoding='utf-8'),sheet(self.lesson))
        for beat in self.lesson['beats']:
            self.assertIn('`'+beat['id']+'.wav`',sheet(self.lesson))

    def test_previous_gp_and_ap_lessons_untouched(self):
        self.assertEqual(load_lesson("g10-ch2-gp-sum")["visual"]["template"],"gp-sum-cancel-v1")
        self.assertEqual(load_lesson("g10-ch2-ap-sum")["visual"]["template"],"ap-sum-pairs-v1")

    @unittest.skipUnless(Image is not None,"Pillow optional for offline arithmetic tests")
    def test_nine_mobile_and_portrait_frames_render(self):
        spec=self.lesson
        for w,h in ((360,640),(720,1280)):
            images=[]
            for i,beat in enumerate(spec["beats"]):
                for position in (0,1):
                    frame=artwork(spec,beat,position,i,9,w,h,False)
                    self.assertEqual(frame.size,(w,h))
                    self.assertEqual(frame.mode,"RGB")
                    images.append(frame)
            self.assertNotEqual(images[0].tobytes(),images[-1].tobytes())

if __name__=="__main__":
    unittest.main()
