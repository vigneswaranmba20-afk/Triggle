#!/usr/bin/env python3
"""Exact-media release adapter for the approved Grade 10 discriminant concept.

This only mutates the named concept, the two loader revisions, and PWA cache.
Upload to immutable R2 must have succeeded BEFORE this is invoked.
No network, no paid AI inference; no direct student-site deployment.
"""
import argparse
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]
LESSON = "g10-ch3-discriminant"
APPROVED_SHA = "4c692aa75bad331a6d1f859f3c8be79da3d621af15259ac5e79ebadb79eef890"
DURATION = 152.437663
PUBLIC_HOST = "pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev"
OBJECT_PATH = "/trace-videos/" + LESSON + "/" + APPROVED_SHA + ".mp4"
TAG = "disc-fola-4c692aa7-20261120"


def validated_url(url):
    parsed = urlsplit(url)
    if (parsed.scheme != "https" or parsed.hostname != PUBLIC_HOST
            or parsed.path != OBJECT_PATH or parsed.port is not None
            or parsed.username or parsed.password or parsed.query or parsed.fragment):
        raise ValueError("URL must be the exact immutable, publicly verified reviewed MP4")
    return url


def register_concept(source, url):
    validated_url(url)
    if '"video"' in source[source.index('"id": "'+LESSON+'"'):][:180]:
        raise ValueError("Target already contains a video reference; manual reconciliation required")
    header = '"id": "' + LESSON + '",'
    if source.count(header) != 1:
        raise ValueError("Cannot identify the one and only Discriminant concept")
    video = {"src": url, "language": "en", "durationSeconds": round(DURATION, 2)}
    replacement = header + '\n      "video": ' + json.dumps(video,ensure_ascii=False) + ','
    updated = source.replace(header, replacement, 1)
    if updated.count('"video": '+json.dumps(video,ensure_ascii=False))!=1:
        raise ValueError("Video insert failed")
    return updated


def bump_loader(source):
    # Append the release token to the existing Ch3 loader, without discarding
    # unrelated curriculum/geometry query revisions.
    pattern=r'(<script src="\./data/g10-ch3-concepts\.js\?v=[^"]+)("></script>)'
    def replace(match):
        if '&discriminant-fola=' in match.group(1):
            raise ValueError("Discriminant loader already released")
        return match.group(1)+'&discriminant-fola=4c692aa7'+match.group(2)
    result,n=re.subn(pattern,replace,source)
    if n!=1:
        raise ValueError("Cannot uniquely identify Grade 10 Chapter 3 loader")
    return result

def bump_player(source):
    needle = './assets/chapter-hub.js?v='
    if source.count(needle)!=1:
        raise ValueError("Chapter hub loader changed; refuse ambiguous update")
    pattern=r'(<script src="\./assets/chapter-hub\.js\?v=[^"]+)("></script>)'
    def replace(match):
        if '&discriminant-fola=' in match.group(1):
            raise ValueError('Discriminant player already released')
        return match.group(1)+'&discriminant-fola=4c692aa7'+match.group(2)
    result,n=re.subn(pattern,replace,source)
    if n!=1:
        raise ValueError("Failed to bump chapter hub resource URL")
    return result


def bump_sw(source):
    # Keep the established Grade 9 and G.P. cache suffix intact: earlier
    # chapter gates deliberately require it at the very end of CACHE.
    suffix = '-gpfola-v2-fa50e19c-g9ex32'
    pattern = r"^(const CACHE=')([^'\r\n]*?)(-gpfola-v2-fa50e19c-g9ex32)(';)"
    result,n=re.subn(pattern,lambda m:m.group(1)+m.group(2)+'-'+TAG+m.group(3)+m.group(4),source,count=1)
    if n!=1:
        raise ValueError("Service worker cache signature changed; manual reconciliation required")
    return result

def update_site(root,url):
    root=Path(root)
    changed = []
    operations = [
        ("site/data/g10-ch3-concepts.js", lambda s:register_concept(s,url)),
        ("site/index.html", lambda s:bump_player(bump_loader(s))),
        ("site/service-worker.js", bump_sw)
    ]
    for rel,func in operations:
        path=root/rel
        original=path.read_text(encoding="utf-8")
        updated=func(original)
        if original==updated:
            raise ValueError("Expected media update missing for "+rel)
        changed.append((path,updated))
    # Atomic on validation: do not modify one file if the other guards fail.
    for path,data in changed:
        path.write_text(data,encoding="utf-8")
    return [str(path.relative_to(root)) for path,_ in changed]


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action",choices=["register"])
    parser.add_argument("--url",required=True)
    parser.add_argument("--root",type=Path,default=ROOT)
    args=parser.parse_args()
    if args.action=="register":
        files=update_site(args.root,args.url)
        print("PASS reviewed Discriminant concept URL + cache revisions:",",".join(files))


if __name__ == "__main__":
    try: main()
    except (OSError, ValueError) as error:
        raise SystemExit("TRACE DISCRIMINANT RELEASE BLOCKED: "+str(error))
