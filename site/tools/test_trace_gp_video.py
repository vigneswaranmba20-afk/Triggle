#!/usr/bin/env python3
"""Offline exact-math release gate for TRACE geometric-series video."""
import json
from pathlib import Path
import sys
import unittest
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site"/"tools"))
from trace_video_factory import load_lesson,validate_lesson,GP_ORDER

class GeometricVideoTest(unittest.TestCase):
    def test_cancellation_is_exact(self):
        spec=load_lesson("g10-ch2-gp-sum")
        self.assertEqual(len(spec["beats"]),9)
        self.assertEqual([b["scene"] for b in spec["beats"]],GP_ORDER)
        self.assertEqual(spec["voice"]["name"],"Kore")
        self.assertEqual(spec["visual"]["template"],"gp-sum-cancel-v1")
        for values,r in [(spec["visual"]["exampleTerms"],2),(spec["visual"]["practiceTerms"],3)]:
            self.assertEqual(values,[r**i for i in range(4)])
            total=sum(values)
            self.assertEqual((r-1)*total,r**4-1)
        self.assertEqual(sum(spec["visual"]["exampleTerms"]),15)
        self.assertEqual(sum(spec["visual"]["practiceTerms"]),40)

    def test_no_practice_answer_before_final_beat(self):
        spec=load_lesson("g10-ch2-gp-sum")
        first="\n".join(x["narration"] for x in spec["beats"][:-1]).lower()
        self.assertNotIn("equals forty",first)
        self.assertNotIn("s equals forty",first)
        self.assertIn("pause",spec["beats"][-2]["narration"].lower())

    def test_rejects_untrue_ratio_and_unordered_beats(self):
        spec=load_lesson("g10-ch2-gp-sum")
        invalid=json.loads(json.dumps(spec))
        invalid["visual"]["practiceTerms"]=[1,3,9,28]
        with self.assertRaises(ValueError): validate_lesson(invalid)
        invalid=json.loads(json.dumps(spec))
        invalid["beats"][5]["scene"]="gp-rule"
        with self.assertRaises(ValueError): validate_lesson(invalid)
        invalid=json.loads(json.dumps(spec))
        invalid["beats"][-2]["narration"]="The secret is forty. Pause the video."
        with self.assertRaises(ValueError):validate_lesson(invalid)

    def test_ap_pilot_remains_unchanged(self):
        spec=load_lesson("g10-ch2-ap-sum")
        self.assertEqual(spec["visual"]["template"],"ap-sum-pairs-v1")
        self.assertEqual(len(spec["beats"]),9)
        self.assertEqual(sum(spec["visual"]["exampleTerms"]),30)

if __name__=="__main__":unittest.main()
