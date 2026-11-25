"""Verify and transfer a six-file TRACE batch using the existing R2 bindings."""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
from zipfile import ZipFile

from register_mensuration import LESSONS, ORIGIN, release_records, verify_remote


def file_hash(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def verify_package(artifact, expected_hash, directory):
    if file_hash(artifact) != expected_hash:
        raise ValueError("Transfer package SHA-256 differs")
    with ZipFile(artifact) as package:
        names = {"release.json", *(f"videos/{lesson}-en.mp4" for lesson in LESSONS)}
        if sorted(package.namelist()) != sorted(names):
            raise ValueError("Transfer package must contain only the six approved MP4s and manifest")
        if sum(info.file_size for info in package.infolist()) > 12_000_000:
            raise ValueError("Transfer package exceeds the expected batch size")
        package.extractall(directory)
    manifest = release_records(json.loads((directory / "release.json").read_text()))
    for row in manifest.values():
        video = directory / "videos" / row["file"]
        if video.stat().st_size != row["bytes"] or file_hash(video) != row["sha256"]:
            raise ValueError(f"Verified MP4 bytes differ for {row['id']}")
    return manifest


def upload(manifest, directory):
    required = ("R2_ACCOUNT_ID", "R2_BUCKET", "R2_PUBLIC_BASE_URL",
                "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY")
    missing = [name for name in required if not os.environ.get(name)]
    if missing:
        raise ValueError("Missing existing R2 Actions bindings: "+", ".join(missing))
    account = os.environ["R2_ACCOUNT_ID"]
    bucket = os.environ["R2_BUCKET"]
    if not re.fullmatch(r"[a-f0-9]{32}", account) or not re.fullmatch(r"[a-z0-9][a-z0-9-]+", bucket):
        raise ValueError("The existing R2 account or bucket binding has an unexpected format")
    if os.environ["R2_PUBLIC_BASE_URL"].rstrip("/") != ORIGIN:
        raise ValueError("The configured public R2 origin differs from Triggle's current player")
    endpoint = f"https://{account}.r2.cloudflarestorage.com"
    for row in manifest.values():
        key = f"trace-videos/{row['id']}/{row['sha256']}.mp4"
        target = directory / "videos" / row["file"]
        result = subprocess.run([
            "aws", "--no-cli-pager", "--endpoint-url", endpoint, "s3api", "put-object",
            "--bucket", bucket, "--key", key, "--body", str(target), "--if-none-match", "*",
            "--content-type", "video/mp4", "--cache-control", "public,max-age=31536000,immutable",
        ], capture_output=True, text=True)
        if result.returncode and "PreconditionFailed" not in result.stderr:
            code = re.search(r"An error occurred \(([A-Za-z0-9]+)\)", result.stderr)
            detail = code.group(1) if code else f"CLI exit {result.returncode}"
            raise ValueError(f"R2 conditional write failed for {row['id']} ({detail})")
        url = f"{ORIGIN}/{key}"
        verify_remote(url, row)
        print(f"PASS immutable R2 object, full SHA-256 and byte ranges for {row['id']}: {url}", flush=True)


if __name__ == "__main__":
    archive = Path(sys.argv[1])
    expected = sys.argv[2]
    directory = Path(sys.argv[3])
    upload(verify_package(archive, expected, directory), directory)
