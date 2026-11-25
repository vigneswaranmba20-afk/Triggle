# TRACE Tamil Video Standard V2.0

## Language and narration

Use refined modern Tamil and the terminology from the matching Tamil-medium
Samacheer Kalvi textbook. Aim for a composed, confident, authoritative voice.
Obtain native Tamil review and owner approval. Record the approved WAV hash
and sample count. Use the recording at 1.00×, with its original pronunciation,
pacing and pauses. Apply a small linear gain adjustment only when measured
headroom requires it. Report suspected material mathematical errors with their
source timestamps and hold the release for resolution.

Write visible headings and explanatory labels in Tamil. Preserve universal
mathematical symbols, variables, numerical values and equations. Use original
explanations and diagrams. Use Tamil text shaping and measure actual composed
glyphs. The pilot uses Noto Sans Tamil with Pillow RAQM and the existing offline
KaTeX equation renderer. Show explanatory labels at their relevant diagram
locations. Use subtitles when specifically requested.

## Timing and visual production

Reuse the corresponding English animation source, palette, geometry, equation
renderer and visual hierarchy. Use the approved recording as the only timeline
for speech. Record the actual timestamps of spoken anchors, confirm uncertain
transcriptions against the recording or the approved native review, and time
each diagram change to its anchor. Allow important equations to settle and hold.
Place the final visual fade inside the closing pause.

Render with the existing portrait pipeline at 720 × 1280, 24 fps, in a fast-start
H.264/AAC MP4. Confirm audio duration directly from the muxed stream, inspect
representative encoded frames, and decode the entire file before publishing.
Check the mathematical derivation independently, including all stated
equivalences and all dimensions used in the geometry.

## Hosting and release

Use the existing Triggle Cloudflare R2 bucket. Publish language-specific,
immutable keys with the verified SHA-256 and check the public file's full hash,
MIME type, cache metadata and byte-range response. Register each video in its
concept and language. Confirm the correct accessible title, paused opening,
playback, rate selection, pause, resume, seek and fullscreen. Test portrait and
landscape on mobile and switch languages on the live concept. Use the normal
protected-branch checks and GitHub Pages deployment.

## Pilot source and reproduction

The Grade 10 cylinder pilot uses the approved 70.24-second Tamil WAV whose hash
is in the [cue sheet](../../site/tools/trace_tamil_cylinder_timeline.json).
The cylinder terms and formulas were checked against the revised 2025 Tamil
Grade 10 mathematics textbook, printed pages 278–279 (PDF pages 284–285).
The audio is a separate approved asset. [Tamil Grade 10 mathematics textbook](https://drive.google.com/file/d/1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC/view)

Install the repository's renderer dependencies, FFmpeg, Chromium and Noto Sans
Tamil. Run from the repository root with the approved local narration file.

```bash
python site/tools/trace_tamil_cylinder.py /path/to/approved.wav /path/to/output
```

The output directory contains the encoded video and notation and render evidence.
Use `--font-dir` for a custom Noto Sans Tamil installation directory and
`--samples` to inspect the shaped labels and formula holds before encoding.
