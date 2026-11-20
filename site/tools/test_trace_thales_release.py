#!/usr/bin/env python3
"""No-network, exact-file scope tests for the Thales student video release."""
import tempfile
from pathlib import Path
import sys
import unittest

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site/tools"))
from trace_thales_release import (
    APPROVED_SHA,GIT_BLOB_SHA,SIZE,DURATION,PUBLIC_URL,LESSON,TAG,CACHE_SUFFIX,
    register_concept,bump_loader,bump_player,bump_sw,update_site,validate_url,
)

RELS=["site/data/g10-ch4-concepts.js","site/index.html","site/service-worker.js"]


def pristine(path):
    text=(ROOT/path).read_text(encoding="utf-8")
    if path==RELS[0]:
        insert='\n      "video": {"src": "'+PUBLIC_URL+'", "language": "en", "durationSeconds": 99.85},'
        if '"id": "'+LESSON+'",\n      "video": ' in text:
            assert text.count(insert)==1
            text=text.replace(insert,"",1)
    elif path==RELS[1]:
        if "&"+TAG in text:
            assert text.count("&"+TAG)==2
            text=text.replace("&"+TAG,"")
    elif path==RELS[2]:
        if "-"+TAG in text:
            assert text.count("-"+TAG)==1
            text=text.replace("-"+TAG,"",1)
    return text


class ThalesReleaseTests(unittest.TestCase):
    def test_verified_immutable_r2_fingerprint(self):
        self.assertEqual(len(APPROVED_SHA),64)
        self.assertEqual(len(GIT_BLOB_SHA),40)
        self.assertEqual(SIZE,1734325)
        self.assertAlmostEqual(DURATION,99.854333)
        self.assertEqual(validate_url(PUBLIC_URL),PUBLIC_URL)
        for url in (
            PUBLIC_URL+"?x=1",PUBLIC_URL+"#tail",
            PUBLIC_URL.replace("https:","http:"),
            PUBLIC_URL.replace("pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev","attacker.example"),
            PUBLIC_URL.replace(".mp4",".mov"),
        ):
            with self.subTest(url=url),self.assertRaises(ValueError):
                validate_url(url)

    def test_only_exact_thales_concept_receives_video(self):
        original=pristine(RELS[0])
        changed=register_concept(original,PUBLIC_URL)
        self.assertIn('"durationSeconds": 99.85',changed)
        self.assertIn(PUBLIC_URL,changed)
        self.assertEqual(original,changed.replace(
            '\n      "video": {"src": "'+PUBLIC_URL+'", "language": "en", "durationSeconds": 99.85},','',1))
        with self.assertRaises(ValueError):register_concept(changed,PUBLIC_URL)
        live=(ROOT/RELS[0]).read_text(encoding="utf-8")
        if PUBLIC_URL in live:self.assertEqual(changed,live)

    def test_previous_lessons_remain_in_player(self):
        player=(ROOT/"site/assets/chapter-hub.js").read_text(encoding="utf-8")
        for lesson in ("g10-ch2-ap-sum","g10-ch2-gp-sum","g10-ch3-discriminant","g10-ch4-bpt-thales"):
            self.assertIn("'"+lesson+"'",player)
        for required in ("video.controls=true","video.playsInline=true","video.preload='none'","url.protocol!=='https:'"):
            self.assertIn(required,player)
        self.assertIn("pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev",player)
        self.assertIn("const anchor=panel.querySelector('.g10ch4-studio')",player)
        self.assertEqual(player.count("if(stage.video)attachStageVideo(panel,stage,lang);"),2)
        self.assertIn(".sp2-concept-heading",player)

    def test_cache_bumps_do_not_break_older_chapter_suffix(self):
        html=pristine(RELS[1]);sw=pristine(RELS[2])
        updated=bump_player(bump_loader(html))
        updated_sw=bump_sw(sw)
        self.assertEqual(updated.count("&"+TAG),2)
        self.assertIn("g10-ch4-concepts.js",updated)
        self.assertIn("discriminant-fola=4c692aa7",updated)
        self.assertTrue(updated_sw.splitlines()[0].endswith(CACHE_SUFFIX+"';"))
        self.assertEqual(updated_sw.count("-"+TAG),1)
        if "&"+TAG in (ROOT/RELS[1]).read_text(encoding="utf-8"):
            self.assertEqual(updated,(ROOT/RELS[1]).read_text(encoding="utf-8"))
        if "-"+TAG in (ROOT/RELS[2]).read_text(encoding="utf-8"):
            self.assertEqual(updated_sw,(ROOT/RELS[2]).read_text(encoding="utf-8"))

    def test_release_edits_are_atomic_and_only_named_paths(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            for path in RELS:
                dest=root/path;dest.parent.mkdir(parents=True,exist_ok=True)
                dest.write_text(pristine(path),encoding="utf-8")
            before={x:x.read_bytes() for x in root.rglob("*") if x.is_file()}
            changed=update_site(root,PUBLIC_URL)
            self.assertEqual(set(changed),set(RELS))
            self.assertEqual(set(before),{x for x in root.rglob("*") if x.is_file()})
            self.assertTrue(all(x.read_bytes()!=before[x] for x in before))
            with self.assertRaises(ValueError):update_site(root,PUBLIC_URL)

if __name__=="__main__":unittest.main()
