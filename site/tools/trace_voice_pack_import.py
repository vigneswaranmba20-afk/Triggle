#!/usr/bin/env python3
"""Safely import user-recorded WAV beats for TRACE. No model/API generation.

Expected input is a ZIP attached to a GitHub issue or a local ZIP file.
Exactly one WAV per approved lesson beat is required. Files are not claimed
to be Fola-verified: that requires listening to the review MP4.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import shutil
import sys
import tempfile
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import wave
import zipfile

MAX_DOWNLOAD_BYTES = 75 * 1024 * 1024
MAX_EXTRACT_BYTES = 160 * 1024 * 1024
MAX_SINGLE_WAV_BYTES = 35 * 1024 * 1024
ROOT = Path(__file__).resolve().parents[2]


def sha256(path):
    hasher = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def validate_source_url(url):
    parsed = urlsplit(url.strip())
    if parsed.scheme != "https" or parsed.hostname != "github.com":
        raise ValueError("Only HTTPS GitHub user-attachment URLs are accepted")
    if parsed.username or parsed.password or parsed.port or parsed.fragment:
        raise ValueError("Unexpected URL credentials, port, or fragment")
    if not parsed.path.startswith(("/user-attachments/files/", "/user-attachments/assets/")):
        raise ValueError("Attach the ZIP to a GitHub issue and paste its attachment URL")
    return url.strip()


def download_github_attachment(url, output):
    validate_source_url(url)
    request = Request(url, headers={"User-Agent": "Triggle-TRACE-voice-pack/1"})
    with urlopen(request, timeout=90) as response, output.open("wb") as dest:
        final = urlsplit(response.geturl())
        host = (final.hostname or "").lower()
        allowed = host == "github.com" or host.endswith(".githubusercontent.com") or host.endswith(".amazonaws.com")
        if final.scheme != "https" or not allowed:
            raise ValueError("GitHub attachment redirected to an unexpected host")
        count = 0
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            count += len(chunk)
            if count > MAX_DOWNLOAD_BYTES:
                raise ValueError("Voice ZIP exceeds 75 MiB")
            dest.write(chunk)
    if not zipfile.is_zipfile(output):
        raise ValueError("Attachment is not a ZIP archive")


def lesson_beat_names(lesson):
    if not lesson.replace("-", "").isalnum():
        raise ValueError("Invalid lesson name")
    path = ROOT / "site" / "video-factory" / "lessons" / (lesson + ".json")
    spec = json.loads(path.read_text(encoding="utf-8"))
    beats = spec["beats"]
    names = [beat["id"] for beat in beats]
    if len(names) != len(set(names)) or len(names) != 9:
        raise ValueError("Expected exactly nine unique storyboard beats")
    return names


def validate_wav(path):
    with wave.open(str(path), "rb") as audio:
        channels = audio.getnchannels()
        rate = audio.getframerate()
        width = audio.getsampwidth()
        frames = audio.getnframes()
    if channels not in (1, 2) or width not in (2, 3, 4) or not (8000 <= rate <= 48000):
        raise ValueError("WAV must be PCM, 1–2 channels, 16–32 bits, 8–48 kHz")
    seconds = frames / rate
    if not 0.5 <= seconds <= 95:
        raise ValueError("WAV narration duration must be between 0.5s and 95s")
    return round(seconds, 3)


def import_zip(archive, output, lesson):
    expected = lesson_beat_names(lesson)
    want = set(name + ".wav" for name in expected)
    output = Path(output)
    if output.exists() and any(output.iterdir()):
        raise ValueError("Destination must be empty; refuse to overwrite previous narration")
    output.mkdir(parents=True, exist_ok=True)
    archive = Path(archive)
    if archive.stat().st_size > MAX_DOWNLOAD_BYTES:
        raise ValueError("Voice ZIP exceeds 75 MiB")
    with zipfile.ZipFile(archive, "r") as package:
        infos = [info for info in package.infolist() if not info.is_dir()]
        found = {}
        folders = set()
        total = 0
        for info in infos:
            path = PurePosixPath(info.filename)
            parts = path.parts
            if len(parts) not in (1, 2) or any(part in (".", "..") or part.startswith(".") for part in parts):
                raise ValueError("Unsafe or nested ZIP filename: " + info.filename)
            folders.add(parts[0] if len(parts) == 2 else "")
            filename = parts[-1]
            if filename not in want or filename in found:
                raise ValueError("Unknown or duplicate narration WAV: " + filename)
            if info.flag_bits & 0x1:
                raise ValueError("Encrypted archives are not accepted")
            if info.file_size > MAX_SINGLE_WAV_BYTES:
                raise ValueError("WAV exceeds 35 MiB: " + filename)
            total += info.file_size
            if total > MAX_EXTRACT_BYTES:
                raise ValueError("Extracted WAVs would exceed 160 MiB")
            found[filename] = info
        if set(found) != want or len(folders) != 1:
            missing = sorted(want - set(found))
            raise ValueError("Expected nine WAVs in one folder or at ZIP root; missing: " + ", ".join(missing))
        records = []
        for name in expected:
            filename = name + ".wav"
            dest = output / filename
            with package.open(found[filename]) as source, dest.open("wb") as target:
                shutil.copyfileobj(source, target, length=1024 * 1024)
            seconds = validate_wav(dest)
            records.append({"beat": name, "filename": filename, "durationSeconds": seconds, "sha256": sha256(dest)})
    manifest = {
        "lessonId": lesson,
        "source": "user-supplied-WAV-ZIP",
        "voiceIdentity": "unverified-listening-review-required",
        "releaseApproved": False,
        "reviewRequired": True,
        "noModelApiCalls": True,
        "archiveSha256": sha256(archive),
        "beats": records,
    }
    (output / "voice-pack-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--archive", type=Path)
    source.add_argument("--url", help="HTTPS github.com/user-attachments/... URL to ZIP")
    parser.add_argument("--lesson", default="g10-ch2-gp-sum")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if args.url:
        with tempfile.TemporaryDirectory(prefix="trace-voice-") as temp:
            archive = Path(temp) / "voice-pack.zip"
            download_github_attachment(args.url, archive)
            result = import_zip(archive, args.output, args.lesson)
    else:
        result = import_zip(args.archive, args.output, args.lesson)
    print("PASS: imported", len(result["beats"]), "real WAV beats; review required; zero model API calls")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, zipfile.BadZipFile, EOFError, wave.Error) as error:
        print("TRACE VOICE PACK ERROR:", str(error), file=sys.stderr)
        sys.exit(1)
