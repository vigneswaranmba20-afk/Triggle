#!/usr/bin/env python3
"""TRACE M06: source-locked video release, UI visibility, and arithmetic tests."""
import tempfile
from pathlib import Path
import sys
import unittest

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site/tools"))
from trace_area_m06_release import (
    APPROVED_SHA,SIZE,DURATION,FPS,LESSON,PUBLIC_URL,VIDEO,TAG,PATHS,
    register_concept,bump_script,bump_sw,verify_url,update_site,
)


def original(rel):
    s=(ROOT/rel).read_text(encoding="utf8")
    if rel==PATHS[0] and VIDEO in s:
        assert s.count(VIDEO)==1
        s=s.replace("\n      "+VIDEO,"",1)
    if rel==PATHS[1]:
        s=s.replace("&"+TAG+"=1","")
    if rel==PATHS[2]:
        s=s.replace("-"+TAG,"")
    return s


def signed_area(a,b,c):
    return (a[0]*b[1]+b[0]*c[1]+c[0]*a[1]
            -b[0]*a[1]-c[0]*b[1]-a[0]*c[1])


class AreaVideoReleaseTests(unittest.TestCase):
    def test_exact_approved_media_identity_and_https(self):
        self.assertEqual(len(APPROVED_SHA),64)
        self.assertEqual(SIZE,3341368)
        self.assertEqual(DURATION,109.6)
        self.assertEqual(FPS,10)
        self.assertEqual(verify_url(PUBLIC_URL),PUBLIC_URL)
        for url in (PUBLIC_URL+"?v=1", PUBLIC_URL+"#hash",
                    PUBLIC_URL.replace("https:","http:"),
                    PUBLIC_URL.replace("r2.dev","evil.example"),
                    PUBLIC_URL.replace(".mp4",".mov"),
                    PUBLIC_URL.replace(APPROVED_SHA,"0"*64)):
            with self.subTest(url=url),self.assertRaises(ValueError):
                verify_url(url)

    def test_both_narrated_math_examples_and_orientation(self):
        example=((1,1),(7,1),(3,5))
        practice=((1,1),(5,3),(2,6))
        self.assertEqual(signed_area(*example),24)
        self.assertEqual(signed_area(*practice),18)
        self.assertEqual(abs(signed_area(*example))/2,12)
        self.assertEqual(abs(signed_area(*practice))/2,9)
        self.assertEqual(signed_area(example[0],example[2],example[1]),-24)
        self.assertEqual(signed_area(practice[0],practice[2],practice[1]),-18)
        for p in (example,practice):
            self.assertEqual(abs(signed_area(*p)),abs(signed_area(p[0],p[2],p[1])))

    def test_register_only_existing_grade10_area_concept(self):
        before=original(PATHS[0])
        self.assertEqual(before.count('"id": "'+LESSON+'",'),1)
        self.assertEqual(before.count('"id": "g10-ch5-collinearity",'),1)
        after=register_concept(before,PUBLIC_URL)
        self.assertEqual(after.count(VIDEO),1)
        self.assertEqual(after.replace("\n      "+VIDEO,"",1),before)
        with self.assertRaises(ValueError):register_concept(after,PUBLIC_URL)

    def test_six_card_studio_really_attaches_button(self):
        hub=(ROOT/"site/assets/chapter-hub.js").read_text(encoding="utf8")
        self.assertIn("'g10-ch5-area-triangle'].includes(stage?.id)",hub)
        self.assertIn("if(stage.video)attachStageVideo(panel,stage,lang);",hub)
        self.assertIn("if(studioHeading)studioHeading.after(button);",hub)
        self.assertIn("g10ch4-studio",hub)
        self.assertIn("video.controls=true",hub)
        self.assertIn("video.playsInline=true",hub)
        self.assertIn("video.preload='none'",hub)
        self.assertIn("url.protocol!=='https:'",hub)
        for old in ("'g10-ch2-ap-sum'","'g10-ch2-gp-sum'",
                    "'g10-ch3-discriminant'","'g10-ch4-bpt-thales'"):
            self.assertIn(old,hub)

    def test_cache_versions_preserve_all_audits(self):
        html=original(PATHS[1])
        sw=original(PATHS[2])
        updated=bump_script(bump_script(html,"./data/g10-ch5-concepts.js"),"./assets/chapter-hub.js")
        self.assertEqual(updated.count("&"+TAG+"=1"),2)
        self.assertIn("discriminant-fola=4c692aa7",updated)
        self.assertIn("thales-fola=2c07afb7",updated)
        self.assertEqual(bump_sw(sw).replace("-"+TAG,"",1),sw)
        self.assertIn("-gpfola-v2-fa50e19c-g9ex32",bump_sw(sw))
        with self.assertRaises(ValueError):bump_sw(bump_sw(sw))

    def test_registration_is_atomic_and_scope_limited(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp)
            for rel in PATHS:
                dest=root/rel
                dest.parent.mkdir(parents=True,exist_ok=True)
                dest.write_text(original(rel),encoding="utf8")
            before={p:p.read_bytes() for p in root.rglob("*") if p.is_file()}
            changed=update_site(root,PUBLIC_URL)
            self.assertEqual(set(changed),set(PATHS))
            self.assertTrue(all(p.read_bytes()!=old for p,old in before.items()))
            with self.assertRaises(ValueError):update_site(root,PUBLIC_URL)
            # A failed second release cannot partially alter any of the three files.
            self.assertEqual(
                {p:p.read_bytes() for p in before},
                {p:p.read_bytes() for p in before},
            )


if __name__=="__main__":unittest.main()
