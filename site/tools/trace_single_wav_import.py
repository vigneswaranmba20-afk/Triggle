#!/usr/bin/env python3
"""Split one owner-recorded continuous PCM WAV into TRACE's existing nine-beat voice pack.

No model/API calls. Requires eight deliberate >=1.6-second silent gaps between
the nine reviewed narration beats. If gaps are absent, extra, or ambiguous,
fail closed rather than guess a cut. The original nine-WAV workflow remains.
"""
import argparse
from array import array
import json
import math
from pathlib import Path
import sys
import tempfile
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import wave

from trace_voice_pack_import import lesson_beat_names, validate_wav, sha256

MAX_INPUT_BYTES = 75 * 1024 * 1024
MIN_GAP = 1.6
FRAME_SECONDS = 0.02
PAD_SECONDS = 0.18


def validate_source_url(url):
    parsed = urlsplit(url.strip())
    if parsed.scheme != "https" or parsed.hostname != "github.com":
        raise ValueError("Only HTTPS GitHub user-attachment WAV URLs accepted")
    if parsed.username or parsed.password or parsed.port or parsed.fragment:
        raise ValueError("Unexpected URL credentials, port, or fragment")
    if not parsed.path.startswith(("/user-attachments/files/", "/user-attachments/assets/")):
        raise ValueError("Attach the complete WAV to a GitHub issue and paste its attachment URL")
    return url.strip()


def download_recording(url, output):
    validate_source_url(url)
    with urlopen(Request(url, headers={"User-Agent": "Triggle-TRACE-single-WAV/1"}), timeout=90) as response, output.open("wb") as dest:
        final = urlsplit(response.geturl())
        host = (final.hostname or "").lower()
        if final.scheme != "https" or not (host == "github.com" or host.endswith(".githubusercontent.com") or host.endswith(".amazonaws.com")):
            raise ValueError("Unexpected GitHub attachment redirect")
        total = 0
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_INPUT_BYTES:
                raise ValueError("Recording exceeds 75 MiB")
            dest.write(chunk)


def load_pcm(path):
    path = Path(path)
    if path.stat().st_size > MAX_INPUT_BYTES:
        raise ValueError("Recording exceeds 75 MiB")
    with wave.open(str(path), "rb") as audio:
        channels, width, rate = audio.getnchannels(), audio.getsampwidth(), audio.getframerate()
        frames = audio.getnframes()
        if channels not in (1, 2) or width != 2 or not 16000 <= rate <= 48000 or audio.getcomptype() != "NONE":
            raise ValueError("Single recording requires uncompressed 16-bit PCM WAV, mono/stereo, 16–48 kHz")
        if not 25 <= frames / rate <= 1200:
            raise ValueError("Single recording must last 25–1200 seconds")
        data = audio.readframes(frames)
    samples = array("h")
    samples.frombytes(data)
    if sys.byteorder != "little":
        samples.byteswap()
    return samples, channels, rate, frames


def find_boundaries(samples, channels, rate, frames, expected):
    chunk_size = max(1, round(rate * FRAME_SECONDS))
    peak = max((abs(value) for value in samples), default=0)
    if peak < 1000:
        raise ValueError("Narration too quiet or missing")
    threshold = max(100, min(650, round(peak * 0.025)))
    silent = []
    for start in range(0, frames, chunk_size):
        stop = min(frames, start + chunk_size)
        values = samples[start * channels:stop * channels]
        rms = math.sqrt(sum(int(x) * int(x) for x in values) / len(values))
        silent.append(rms < threshold)
    ranges = []
    begin = None
    for i, is_silent in enumerate(silent + [False]):
        if is_silent and begin is None:
            begin = i
        elif not is_silent and begin is not None:
            first, last = begin * chunk_size, min(frames, i * chunk_size)
            if (last - first) / rate >= MIN_GAP:
                ranges.append((first, last))
            begin = None
    internal = [(a, b) for a, b in ranges if a > 0.35 * rate and b < frames - 0.35 * rate]
    if len(internal) != expected - 1:
        raise ValueError(
            f"Expected {expected - 1} deliberate >= {MIN_GAP}s scene silences, "
            f"found {len(internal)}. Use nine-WAV fallback; no guessed cuts."
        )
    starts = [0] + [b for a, b in internal]
    ends = [a for a, b in internal] + [frames]
    pads = round(PAD_SECONDS * rate)
    segments = []
    for i, (start, end) in enumerate(zip(starts, ends)):
        lo = max(0, start - (pads if i else 0))
        hi = min(frames, end + (pads if i < expected - 1 else 0))
        seconds = (hi - lo) / rate
        if not 2 <= seconds <= 95:
            raise ValueError(f"Scene {i + 1} duration {seconds:.2f}s is outside 2–95s; use nine-WAV fallback")
        if max((abs(x) for x in samples[lo * channels:hi * channels]), default=0) < 1000:
            raise ValueError(f"Scene {i + 1} missing audible narration")
        segments.append((lo, hi))
    return segments, internal, threshold


def import_recording(source, output, lesson):
    expected = lesson_beat_names(lesson)
    source, output = Path(source), Path(output)
    if output.exists() and any(output.iterdir()):
        raise ValueError("Destination must be empty; refuse to overwrite narration")
    samples, channels, rate, frames = load_pcm(source)
    segments, gaps, threshold = find_boundaries(samples, channels, rate, frames, len(expected))
    output.mkdir(parents=True, exist_ok=True)
    beats = []
    for name, (start, end) in zip(expected, segments):
        filename = name + ".wav"
        dest = output / filename
        with wave.open(str(dest), "wb") as audio:
            audio.setnchannels(channels)
            audio.setsampwidth(2)
            audio.setframerate(rate)
            piece = samples[start * channels:end * channels]
            if sys.byteorder != "little":
                piece.byteswap()
            audio.writeframes(piece.tobytes())
        seconds = validate_wav(dest)
        beats.append({"beat": name, "filename": filename, "durationSeconds": seconds, "sha256": sha256(dest)})
    manifest = {
        "lessonId": lesson,
        "source": "one-user-supplied-continuous-WAV",
        "sourceSha256": sha256(source),
        "voiceIdentity": "unverified-listening-review-required",
        "reviewRequired": True,
        "releaseApproved": False,
        "noModelApiCalls": True,
        "alignmentMethod": "eight-verified-long-silence-separators",
        "minimumSeparatorSeconds": MIN_GAP,
        "detectedSeparatorSeconds": [round((b - a) / rate, 3) for a, b in gaps],
        "amplitudeThreshold": threshold,
        "beats": beats,
        "warning": "Silence verifies scene cuts, NOT spoken-word accuracy. Listen to every scene before release.",
    }
    (output / "voice-pack-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf8")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--wav", type=Path)
    source.add_argument("--url", help="GitHub issue user-attachments URL of one continuous WAV")
    parser.add_argument("--lesson", default="g10-ch3-discriminant")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if args.url:
        with tempfile.TemporaryDirectory(prefix="trace-single-wav-") as tmp:
            recording = Path(tmp) / "continuous.wav"
            download_recording(args.url, recording)
            result = import_recording(recording, args.output, args.lesson)
    else:
        result = import_recording(args.wav, args.output, args.lesson)
    print("PASS: one recording ->", len(result["beats"]), "verified WAV scenes; review required; no model API calls")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, EOFError, wave.Error, KeyError) as error:
        print("TRACE SINGLE WAV ERROR:", error, file=sys.stderr)
        sys.exit(1)
