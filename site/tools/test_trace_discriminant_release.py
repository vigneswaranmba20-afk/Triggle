#!/usr/bin/env python3
"""Offline exact Discriminant release adapter contract and regression checks."""
import hashlib
from pathlib import Path
import sys
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/"site"/"tools"))
from trace_discriminant_release import (
    APPROVED_SHA,DURATION,LESSON,PUBLIC_HOST,OBJECT_PATH,TAG,
    validated_url,register_concept,bump_loader,bump_player,bump_sw,update_site
)
PUBLIC_URL="https://"+PUBLIC_HOST+OBJECT_PATH

def prerelease_text(rel):
    """Construct a pristine fixture from either pre- or post-release sources.

    Exact approved tokens only: never strip unrelated chapter changes.
    Also assert already-released sources still have precisely the approved URL.
    """
    source=(ROOT/rel).read_text(encoding="utf-8")
    if rel=="site/data/g10-ch3-concepts.js":
        marker='\n      "video": {"src": "'+PUBLIC_URL+'", "language": "en", "durationSeconds": 152.44},'
        if '"id": "'+LESSON+'",\n      "video": ' in source:
            assert source.count(marker)==1, "Only exact approved Discriminant media may be present"
            source=source.replace(marker,'',1)
    elif rel=="site/index.html":
        marker='&discriminant-fola=4c692aa7'
        if marker in source:
            assert source.count(marker)==2, "Both concept and player cache-bust tokens are required"
            source=source.replace(marker,'')
    elif rel=="site/service-worker.js":
        marker='-'+TAG
        if marker in source:
            assert source.count(marker)==1, "One exact service-worker revision required"
            source=source.replace(marker,'',1)
    return source


class DiscriminantReleaseTests(unittest.TestCase):
    def test_pinned_media_fingerprint_and_url(self):
        self.assertEqual(len(APPROVED_SHA),64)
        self.assertAlmostEqual(DURATION,152.437663)
        self.assertEqual(validated_url(PUBLIC_URL),PUBLIC_URL)
        for url in (
            "http://"+PUBLIC_HOST+OBJECT_PATH,
            "https://evil.example"+OBJECT_PATH,
            "https://"+PUBLIC_HOST+"/other.mp4",
            PUBLIC_URL+"?download=1",
            "https://"+PUBLIC_HOST+"@evil.example"+OBJECT_PATH,
        ):
            with self.subTest(url=url),self.assertRaises(ValueError):
                validated_url(url)

    def test_only_discriminant_concept_receives_media(self):
        path=ROOT/"site/data/g10-ch3-concepts.js"
        original=prerelease_text("site/data/g10-ch3-concepts.js")
        updated=register_concept(original,PUBLIC_URL)
        current=path.read_text(encoding="utf-8")
        if '"video": ' in current[current.index('"id": "'+LESSON+'"'):][:180]:
            self.assertEqual(current,updated)
        expected='"id": "'+LESSON+'",\n      "video": '
        self.assertIn(expected,updated)
        self.assertIn('"durationSeconds": 152.44',updated)
        self.assertEqual(updated.replace('\n      "video": {"src": "'+PUBLIC_URL+'", "language": "en", "durationSeconds": 152.44},',''),original)
        with self.assertRaises(ValueError):
            register_concept(updated,PUBLIC_URL)

    def test_other_chapter_video_player_links_still_work(self):
        player=(ROOT/"site/assets/chapter-hub.js").read_text(encoding="utf-8")
        self.assertIn("'g10-ch2-ap-sum'",player)
        self.assertIn("'g10-ch2-gp-sum'",player)
        self.assertIn("'g10-ch3-discriminant'",player)
        self.assertIn("video.controls=true",player)
        self.assertIn("video.playsInline=true",player)
        self.assertIn("video.preload='none'",player)
        self.assertIn("url.protocol!=='https:'",player)

    def test_loader_and_sw_bump_are_isolated(self):
        html=prerelease_text("site/index.html")
        sw=prerelease_text("site/service-worker.js")
        html2=bump_player(bump_loader(html))
        sw2=bump_sw(sw)
        self.assertIn("&discriminant-fola=4c692aa7",html2)
        self.assertIn("g10-ch3-concepts.js?v=g10-ch3-concepts-20261119-1&discriminant-fola=4c692aa7",html2)
        self.assertIn("-"+TAG,sw2)
        self.assertIn("gpfola-v2-fa50e19c",sw2)
        self.assertTrue(sw2.startswith("const CACHE='triggle-"))
        self.assertIn("-gpfola-v2-fa50e19c-g9ex32",sw2.splitlines()[0])
        self.assertIn("g10geom-ex43",sw2)
        self.assertNotEqual(html,html2)
        released_html=(ROOT/"site/index.html").read_text(encoding="utf-8")
        released_sw=(ROOT/"site/service-worker.js").read_text(encoding="utf-8")
        if "&discriminant-fola=4c692aa7" in released_html:
            self.assertEqual(html2,released_html)
        if "-"+TAG in released_sw:
            # Later audit/PWA revisions can appear after the original video tag.
            # Require exact same remaining cache text, marker once, and old suffix.
            self.assertEqual(sw2.count("-"+TAG),1)
            self.assertEqual(released_sw.count("-"+TAG),1)
            self.assertEqual(sw2.replace("-"+TAG,"",1),released_sw.replace("-"+TAG,"",1))

    def test_combined_release_never_changes_unrelated_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            for rel in ("site/data/g10-ch3-concepts.js","site/index.html","site/service-worker.js"):
                dest=root/rel
                dest.parent.mkdir(parents=True,exist_ok=True)
                dest.write_text(prerelease_text(rel),encoding="utf-8")
            before={p:p.read_bytes() for p in root.rglob("*") if p.is_file()}
            changed=update_site(root,PUBLIC_URL)
            self.assertEqual(set(changed),set(
                ("site/data/g10-ch3-concepts.js","site/index.html","site/service-worker.js")
            ))
            self.assertEqual(set(before),set(root.rglob("*"))-{p for p in root.rglob("*") if p.is_dir()})
            for file in before:self.assertNotEqual(file.read_bytes(),before[file])
            with self.assertRaises(ValueError):
                update_site(root,PUBLIC_URL)


if __name__=="__main__":
    unittest.main()
