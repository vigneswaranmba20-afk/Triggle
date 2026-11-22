#!/usr/bin/env python3
"""Publish exactly one owner-approved Thales MP4 into the existing Triggle player.

Source adapter has zero network calls and no model/API charges.
Hard-fails when media URL, concept structure, loader, or PWA cache is unexpected.
"""
import argparse
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[2]
LESSON="g10-ch4-bpt-thales"
APPROVED_SHA="2c07afb76d30e65c707b0df1e56a2aa99bbfc8d092efa949ec91d920d898f201"
GIT_BLOB_SHA="6796a6edda4f940b9852e7e8c4929382e7eb3d0e"
SIZE=1734325
DURATION=99.854333
HOST="pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev"
OBJECT_PATH=f"/trace-videos/{LESSON}/{APPROVED_SHA}.mp4"
PUBLIC_URL="https://"+HOST+OBJECT_PATH
TAG="thales-fola-2c07afb7-20261120"
CACHE_SUFFIX="-gpfola-v2-fa50e19c-g9ex32-aud14-02-tables-20261122-q46-20261122"


def validate_url(url):
    p=urlsplit(url)
    if (p.scheme!="https" or p.netloc!=HOST or p.path!=OBJECT_PATH
            or p.query or p.fragment):
        raise ValueError("Only the exact owner-reviewed immutable Thales video URL is allowed")
    return url


def register_concept(text,url):
    validate_url(url)
    marker='"id": "'+LESSON+'",'
    if text.count(marker)!=1:
        raise ValueError("Expected exactly one Grade 10 Ch4 BPT concept ID")
    at=text.index(marker)
    if '"video"' in text[at:at+220]:
        raise ValueError("Thales video is already registered; no duplicate insertion")
    payload={"src":url,"language":"en","durationSeconds":round(DURATION,2)}
    inserted='\n      "video": '+json.dumps(payload,ensure_ascii=False)+','
    new=text.replace(marker,marker+inserted,1)
    assert new.count(inserted)==1
    return new


def bump_loader(text):
    return _bump_script(text,"./data/g10-ch4-concepts.js")


def bump_player(text):
    return _bump_script(text,"./assets/chapter-hub.js")


def _bump_script(text,name):
    escaped=re.escape(name)
    pattern=r'(<script src="'+escaped+r'\?v=[^"]+)("></script>)'
    def replace(m):
        if '&'+TAG in m.group(1):
            raise ValueError(name+" already references approved Thales cache revision")
        return m.group(1)+'&'+TAG+m.group(2)
    new,n=re.subn(pattern,replace,text)
    if n!=1:
        raise ValueError("Expected exactly one cache-versioned script "+name)
    return new


def bump_sw(text):
    # Retain the G.P./Grade 9 cache prefix and the audited AUD14-02 PWA refresh.
    pattern=r"^(const CACHE=')([^'\r\n]*?)("+re.escape(CACHE_SUFFIX)+r")(';)"
    def replace(m):
        if TAG in m.group(2):
            raise ValueError("Thales cache revision already recorded")
        return m.group(1)+m.group(2)+"-"+TAG+m.group(3)+m.group(4)
    updated,n=re.subn(pattern,replace,text,count=1)
    if n!=1:
        raise ValueError("Service-worker cache suffix unexpectedly changed")
    return updated


def update_site(root,url):
    root=Path(root)
    edits=(
        ("site/data/g10-ch4-concepts.js",lambda text:register_concept(text,url)),
        ("site/index.html",lambda text:bump_player(bump_loader(text))),
        ("site/service-worker.js",bump_sw)
    )
    results=[]
    for rel,operation in edits:
        target=root/rel
        text=target.read_text(encoding="utf-8")
        amended=operation(text)
        if amended==text:raise ValueError("No change in "+rel)
        results.append((target,amended))
    # Check all preconditions before changing any file.
    for target,amended in results:target.write_text(amended,encoding="utf-8")
    return [str(target.relative_to(root)) for target,_ in results]


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("command",choices=["register"])
    p.add_argument("--url",default=PUBLIC_URL)
    p.add_argument("--root",type=Path,default=ROOT)
    args=p.parse_args()
    print("PASS exact reviewed media staged for:",", ".join(update_site(args.root,args.url)))

if __name__=="__main__":
    try:main()
    except (OSError,ValueError,AssertionError) as err:
        raise SystemExit("TRACE THALES RELEASE BLOCKED: "+str(err))
