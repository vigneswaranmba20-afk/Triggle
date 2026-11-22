#!/usr/bin/env python3
"""Exact media, one-concept release adapter for TRACE M06 approved Fola V2.

No network or AI calls. Only run after byte-verified immutable R2 staging.
Preserve all other Grade 9/10 work, videos, and previously established cache
suffixes. Refuse unexpected source structure instead of guessing.
"""
import argparse
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[2]
LESSON="g10-ch5-area-triangle"
APPROVED_SHA="7b0eac211cb97175a46f335ad339a3fb91c7649124fd4021143cbc08b68575ec"
SIZE=3341368
DURATION=109.6
FPS=10
HOST="pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev"
PUBLIC_URL=f"https://{HOST}/trace-videos/{LESSON}/{APPROVED_SHA}.mp4"
TAG="area-fola-m06-7b0eac21"
VIDEO=f'"video": {json.dumps({"src": PUBLIC_URL, "language": "en", "durationSeconds": DURATION},ensure_ascii=False)},'
PATHS=("site/data/g10-ch5-concepts.js","site/index.html","site/service-worker.js")


def verify_url(url):
    p=urlsplit(url)
    if (p.scheme!="https" or p.netloc!=HOST or p.path!=urlsplit(PUBLIC_URL).path
            or p.query or p.fragment or p.username or p.password or p.port):
        raise ValueError("R2 URL differs from owner-approved SHA-pinned M06 V2")
    return url


def register_concept(text,url):
    verify_url(url)
    marker=f'"id": "{LESSON}",'
    if text.count(marker)!=1:
        raise ValueError("Missing or duplicated area-triangle concept ID")
    start=text.index(marker)
    next_id=text.find('"id": "g10-ch5-collinearity"',start)
    if next_id<0:
        raise ValueError("Chapter 5 concept sequence changed")
    if '"video":' in text[start:next_id]:
        raise ValueError("Area-triangle video already registered; no silent replacement")
    result=text.replace(marker,marker+"\n      "+VIDEO,1)
    if result.count(VIDEO)!=1:
        raise ValueError("Did not insert exactly one lesson video")
    return result


def bump_script(text,relative):
    pattern=r'(<script src="'+re.escape(relative)+r'\?v=[^"]+)("></script>)'
    def replace(m):
        if "&"+TAG in m.group(1):
            raise ValueError("Already applied cache revision to "+relative)
        return m.group(1)+"&"+TAG+"=1"+m.group(2)
    new,n=re.subn(pattern,replace,text)
    if n!=1:
        raise ValueError("Expected exactly one versioned "+relative)
    return new


def bump_sw(text):
    # Preserve ALL suffixes created by concurrent audit and curriculum releases.
    marker="-gpfola-v2-fa50e19c-g9ex32"
    first,sep,tail=text.partition("\n")
    if not sep or not first.startswith("const CACHE='") or not first.endswith("';"):
        raise ValueError("Unexpected service worker cache declaration")
    if first.count(marker)!=1 or "-"+TAG in first:
        raise ValueError("Already registered or unexpected SW cache suffix")
    return first.replace(marker,"-"+TAG+marker,1)+sep+tail


def update_site(root,url):
    root=Path(root)
    edits=(
      (PATHS[0],lambda s:register_concept(s,url)),
      (PATHS[1],lambda s:bump_script(bump_script(s,"./data/g10-ch5-concepts.js"),"./assets/chapter-hub.js")),
      (PATHS[2],bump_sw),
    )
    pending=[]
    for rel,func in edits:
        path=root/rel
        before=path.read_text(encoding="utf8")
        after=func(before)
        if before==after:
            raise ValueError("No effect on "+rel)
        pending.append((path,after))
    # All preconditions validated before writing any file.
    for path,after in pending:
        path.write_text(after,encoding="utf8")
    return [str(path.relative_to(root)) for path,_ in pending]


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action",choices=["register"])
    parser.add_argument("--url",default=PUBLIC_URL)
    parser.add_argument("--root",type=Path,default=ROOT)
    args=parser.parse_args()
    print("PASS exact approved area-triangle release files:",", ".join(update_site(args.root,args.url)))


if __name__=="__main__":
    try:main()
    except (OSError,ValueError,AssertionError) as error:
        raise SystemExit("TRACE M06 RELEASE BLOCKED: "+str(error))
