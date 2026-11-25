# TRACE Mensuration media

The Grade 10 Chapter 7 renderer uses the shared TRACE media helpers and the
same offline KaTeX build as the lesson pages. It renders five
narration-aligned scenes per lesson. A bounded worker pool encodes 720 × 1280
H.264/AAC files at 24 fps. Neither rendering nor narration preparation
requires an API.

Keep source recordings and renders outside git. In the local production
directory place the supplied manifest at `input/batch_manifest.json`,
prepared pitch-preserving PCM narration in `audio/`, and the checked
timeline at `evidence/timing.json`. The timeline records each lesson's ID,
prepared WAV hash, five scene intervals and spoken cue times. Use the
provided narration without synthesizing replacement speech.

With Pillow, FFmpeg, DejaVu fonts, the repository's npm dependencies, and
Chromium available, run:

```sh
python site/tools/trace_mensuration_batch.py /path/to/local/production --pilot
python site/tools/trace_mensuration_batch.py /path/to/local/production --keep-math
```

The batch emits a release manifest only when all six narrations are complete.
`--available-only` produces a separate review manifest for an incomplete
batch. The supplied Batch 01 recording omits the cone surface-area lesson
and the first three beats of the frustum lesson. It also includes extra
frustum commentary after the planned ending. All four complete lessons can
be reviewed locally from that recording.

For a complete batch, verify the rendered bytes before using Triggle's
existing R2 account and public origin. Use immutable
`trace-videos/<concept-id>/<sha256>.mp4` object keys and conditional writes.
Check public MIME type, a matching HTTP 206 prefix, and the full public
SHA-256. Attach English records to the six existing concept stages together,
refresh the affected app asset versions, and rebuild project status when
required. The shared player loads media on request and filters Mensuration
video records by their declared language. Follow the normal protected-branch
quality gate and Pages workflow for the resulting release.
