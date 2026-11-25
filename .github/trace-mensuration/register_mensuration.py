#!/usr/bin/env python3
"""Verify all six public media objects before registering the Mensuration batch."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
from tempfile import TemporaryDirectory

ORIGIN = "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev"
LESSONS = frozenset((
    "g10-ch7-cylinder-surface-area",
    "g10-ch7-cone-slant-surface",
    "g10-ch7-frustum-surface-volume",
    "g10-ch7-volumes-cylinder-cone",
    "g10-ch7-combined-solids",
    "g10-ch7-conversion-volume-conservation",
))
CONCEPTS = "site/data/g10-ch7-concepts.js"
INDEX = "site/index.html"
WORKER = "site/service-worker.js"


def release_records(document):
    if not isinstance(document, list) or len(document) != len(LESSONS):
        raise ValueError("Expected six validated media records")
    by_id = {row["id"]: row for row in document}
    if by_id.keys() != LESSONS:
        raise ValueError("The manifest must contain each Mensuration lesson exactly once")
    for lesson, row in by_id.items():
        sha = row["sha256"]
        duration = row["durationSeconds"]
        if (row["file"] != f"{lesson}-en.mp4" or
            not re.fullmatch(r"[0-9a-f]{64}", sha) or
            type(row["bytes"]) is not int or row["bytes"] < 1024 or
            type(duration) not in (int, float) or not 45 <= duration <= 75):
            raise ValueError(f"Invalid media record for {lesson}")
    return by_id


def fetch_remote(url, destination, limit, byte_range=None):
    command = ["curl", "--fail", "--silent", "--show-error", "--proto", "=https", "--retry", "2",
               "--max-time", "60", "--max-filesize", str(limit), "--output", str(destination),
               "--write-out", "%{http_code}\n%{content_type}\n%header{content-range}\n"]
    if byte_range:
        command.extend(("--range", byte_range))
    status, content_type, content_range = subprocess.check_output([*command, url], text=True).splitlines()
    return int(status), content_type.partition(";")[0].strip(), content_range


def verify_remote(url, row, fetch=fetch_remote):
    expected = row["bytes"]
    with TemporaryDirectory() as tmp:
        prefix = Path(tmp) / "prefix"
        full = Path(tmp) / "full"
        range_metadata = fetch(url, prefix, 1024, "0-1023")
        if range_metadata != (206, "video/mp4", f"bytes 0-1023/{expected}") or prefix.stat().st_size != 1024:
            raise ValueError(f"Unexpected HTTP range metadata for {row['id']}")
        full_metadata = fetch(url, full, expected)
        if full_metadata != (200, "video/mp4", "") or full.stat().st_size != expected:
            raise ValueError(f"Unexpected public MP4 response for {row['id']}")
        with full.open("rb") as video:
            if video.read(1024) != prefix.read_bytes():
                raise ValueError(f"Public MP4 range bytes differ for {row['id']}")
            video.seek(0)
            sha = hashlib.file_digest(video, "sha256").hexdigest()
        if sha != row["sha256"]:
            raise ValueError(f"Public MP4 SHA-256 differs for {row['id']}")


def edit_concepts(source, media):
    match = re.search(r"(?m)^window\.TRIGGLE_G10_CH7_PATH\s*=\s*(?=\{)", source)
    if match is None:
        raise ValueError("Unexpected Mensuration concept format")
    data, _ = json.JSONDecoder().raw_decode(source[match.end():])
    for lesson, metadata in media.items():
        stages = [stage for stage in data["stages"] if stage["id"] == lesson]
        if len(stages) != 1:
            raise ValueError(f"Expected one stage for {lesson}")
        if "video" in stages[0]:
            if stages[0]["video"] != metadata:
                raise ValueError(f"A different video is already registered for {lesson}")
            continue
        pattern = rf'(?m)^( +)"id": "{re.escape(lesson)}",\n'
        lines = json.dumps(metadata, ensure_ascii=False)
        source, count = re.subn(pattern, lambda m: f'{m[0]}{m[1]}"video": {lines},\n', source)
        if count != 1:
            raise ValueError(f"Could not locate the exact source line for {lesson}")
    return source


def version_index(source, version):
    for path in ("./data/g10-ch7-concepts.js", "./assets/chapter-hub.js"):
        pattern = rf'({re.escape(path)}\?[^"]+)'
        source, count = re.subn(pattern, lambda m: re.sub(r"&trace-mensuration=[0-9a-f]+", "", m[0])
                               + f"&trace-mensuration={version}", source)
        if count != 1:
            raise ValueError(f"Could not locate one script tag for {path}")
    return source


def registration(repo, document, verify=verify_remote):
    rows = release_records(document)
    media = {
        lesson: {"src": f"{ORIGIN}/trace-videos/{lesson}/{row['sha256']}.mp4",
                 "language": "en", "durationSeconds": round(row["durationSeconds"], 2)}
        for lesson, row in rows.items()
    }
    version = hashlib.sha256("".join(rows[key]["sha256"] for key in sorted(rows)).encode()).hexdigest()[:12]
    paths = {name: repo / name for name in (CONCEPTS, INDEX, WORKER)}
    old = {name: file.read_text(encoding="utf-8") for name, file in paths.items()}
    worker, count = re.subn(r"(?m)^(const CACHE='[^'\n]*?)(?:-trace-mensuration-[0-9a-f]+)?(';)",
                            rf"\g<1>-trace-mensuration-{version}\g<2>", old[WORKER])
    if count != 1:
        raise ValueError("Could not locate the service worker cache name")
    updated = {
        CONCEPTS: edit_concepts(old[CONCEPTS], media),
        INDEX: version_index(old[INDEX], version),
        WORKER: worker,
    }
    for lesson, item in media.items():
        verify(item["src"], rows[lesson])
    for name, path in paths.items():
        if updated[name] != old[name]:
            temporary = path.with_suffix(path.suffix + ".trace-mensuration.tmp")
            temporary.write_text(updated[name], encoding="utf-8")
            temporary.replace(path)


if __name__ == "__main__":
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("repo", type=Path)
    cli.add_argument("release", type=Path)
    args = cli.parse_args()
    registration(args.repo, json.loads(args.release.read_text(encoding="utf-8")))
    print("PASS six exact R2 videos registered in English with fresh cache versions")
