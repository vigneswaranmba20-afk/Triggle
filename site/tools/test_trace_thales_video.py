#!/usr/bin/env python3
"""TRACE M05: independent Thales math, source fidelity and 9:16 animation tests."""
import copy
from fractions import Fraction
from pathlib import Path
import sys
import unittest

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site"/"tools"))
from trace_video_factory import THALES_ORDER,load_lesson,validate_lesson
from trace_thales_artwork import Image,artwork,lengths,parallel_segments,slide_t


class ThalesVideoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.lesson=load_lesson("g10-ch4-bpt-thales")

    def test_textbook_concept_is_mathematically_preserved(self):
        source=(ROOT/"site/data/g10-ch4-concepts.js").read_text(encoding="utf-8")
        a=source.index('"id": "g10-ch4-bpt-thales"')
        b=source.index('"id": "g10-ch4-converse-bpt"',a)
        section=source[a:b]
        for x in ("AD/DB = AE/EC","AD = 3 cm","DB = 5 cm","AC = 16 cm","6 cm"):
            with self.subTest(x=x):
                self.assertIn(x,section)
        self.assertEqual(self.lesson["visual"]["unit"],"THALES · PARALLEL LINES")

    def test_example_and_original_transfer_are_exact(self):
        example=lengths(3,5,16)
        self.assertEqual(example["AB"],8)
        self.assertEqual(example["AE"],Fraction(6))
        self.assertEqual(example["EC"],Fraction(10))
        self.assertEqual(Fraction(3,5),example["AE"]/example["EC"])
        practice=lengths(4,6,20)
        self.assertEqual(practice["AB"],10)
        self.assertEqual(practice["AE"],Fraction(8))
        self.assertEqual(practice["EC"],Fraction(12))
        self.assertEqual(Fraction(4,6),practice["AE"]/practice["EC"])
        for args in ((0,5,16),(3,-5,16),(3,5,0),(3,5,501),(1.5,5,16)):
            with self.subTest(args=args),self.assertRaises(ValueError):
                lengths(*args)

    def test_parallel_line_remains_exact_during_slide(self):
        vertices=self.lesson["visual"]["triangle"]
        for time in (0,.1,.25,.5,.75,.9,1):
            t=slide_t("bpt-slide",time,self.lesson["visual"])
            a,b,c,d,e=parallel_segments(vertices,t)
            # Two fractional cut positions must agree on both sides.
            self.assertAlmostEqual((d[0]-a[0])/(b[0]-a[0]),t,places=9)
            self.assertAlmostEqual((e[0]-a[0])/(c[0]-a[0]),t,places=9)
            self.assertAlmostEqual(e[1],d[1],places=9)
            self.assertTrue(0<t<1)
        self.assertGreater(slide_t("bpt-slide",0,self.lesson["visual"]),
                           slide_t("bpt-slide",1,self.lesson["visual"]))
        self.assertEqual(slide_t("bpt-practice",0,self.lesson["visual"]),.4)
        with self.assertRaises(ValueError):
            parallel_segments(vertices,1)

    def test_sealed_nine_beats_practice_answer_hidden(self):
        beats=self.lesson["beats"]
        self.assertEqual([x["scene"] for x in beats],THALES_ORDER)
        self.assertEqual(len(beats),9)
        self.assertEqual(self.lesson["voice"]["name"],"Fola")
        self.assertIn("pause",beats[-2]["narration"].lower())
        self.assertNotIn("eight",beats[-2]["narration"].lower())
        self.assertIn("eight",beats[-1]["narration"].lower())
        self.assertIn("twelve",beats[-1]["narration"].lower())

    def test_lesson_rejects_bad_math_and_revealed_answer(self):
        for mutation in (
            lambda x:x["visual"]["example"].__setitem__("AC",15),
            lambda x:x["visual"]["practice"].__setitem__("DB",5),
            lambda x:x["visual"]["triangle"]["B"].__setitem__(1,840),
            lambda x:x["beats"][5].__setitem__("scene","bpt-angles"),
            lambda x:x["beats"][-2].__setitem__("narration","A E equals eight. Pause and try."),
            lambda x:x["beats"][-2].__setitem__("narration","Your turn. Find A E now."),
        ):
            with self.subTest(change=mutation),self.assertRaises(ValueError):
                changed=copy.deepcopy(self.lesson)
                mutation(changed)
                validate_lesson(changed)

    def test_previous_concepts_remain_loadable(self):
        self.assertEqual(load_lesson("g10-ch2-gp-sum")["visual"]["template"],"gp-sum-cancel-v1")
        self.assertEqual(load_lesson("g10-ch3-discriminant")["visual"]["template"],"discriminant-parabola-v1")

    @unittest.skipUnless(Image is not None,"Pillow optional for math-only CI")
    def test_360_and_720_frames_render_with_answer_hidden(self):
        spec=self.lesson
        for w,h in ((360,640),(720,1280)):
            frames=[]
            for i,beat in enumerate(spec["beats"]):
                for t in (0,.5,1):
                    frame=artwork(spec,beat,t,i,9,w,h,False)
                    self.assertEqual(frame.size,(w,h))
                    self.assertEqual(frame.mode,"RGB")
                    frames.append(frame)
            self.assertNotEqual(frames[0].tobytes(),frames[-1].tobytes())

if __name__=="__main__":
    unittest.main()
