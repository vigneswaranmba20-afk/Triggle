#!/usr/bin/env python3
"""Generate a copy-ready, source-locked Fola recording sheet for any TRACE lesson.

No API access. One sheet replaces repeated instructions and preserves
verbatim beat IDs/narration. --check detects stale human instructions.
"""
import argparse
from pathlib import Path
import sys
from trace_video_factory import load_lesson


def sheet(spec):
    voice = spec["voice"]
    lines = [
        f"# TRACE Recording Sheet — {spec['title']}",
        "",
        f"**Lesson:** `{spec['id']}` · Grade {spec['class']} · English concept video",
        f"**Voice target:** {voice['name']} · **Model in storyboard:** `{voice['model']}`",
        "**Cost rule:** Only use Gemini AI Studio if your signed-in interface allows no-additional-charge generation. A Google AI subscription does not guarantee free API access. Do not activate billing.",
        "",
        "## Record once, following this entire sheet",
        "",
        "1. Open [Google AI Studio — Speech](https://aistudio.google.com/generate-speech). Choose single-speaker, the available Fola voice and no-extra-cost access.",
        "2. Set the speaking style once: " + voice['delivery'],
        "3. For every row, generate **only its spoken words**, listen for mathematical pronunciation and export as WAV (PCM). Preserve the filename exactly.",
        "4. Place all WAV files at ZIP root (or under one common folder). Upload the ZIP once to TRACE's review-only workflow after it is merged.",
        "5. Review the finished MP4 on a phone. Do not publish on voice filename or automated tests alone; the owner must explicitly approve the full video.",
        "",
        "## All nine narration beats",
        "",
    ]
    for idx, beat in enumerate(spec["beats"],1):
        lines.extend([
            f"### {idx:02d} · `{beat['id']}.wav`",
            "",
            "> " + beat["narration"],
            "",
            f"*Animation:* `{beat['scene']}` · final visual hold: {beat['holdAfter']:g}s.",
            "",
        ])
    lines.extend([
        "## File checklist",
        "",
    ])
    lines.extend(f"- [ ] `{beat['id']}.wav`" for beat in spec["beats"])
    lines.extend([
        "",
        "**Do not use** the old paid-TTS `generate` workflow. The importer reads these existing WAVs locally; it does not request Gemini or OpenAI API inference.",
        "**Release boundary:** Imported WAVs and first assembled MP4 are review-only; Cloudflare R2 publication requires a separate approved release.",
        "",
    ])
    return "\n".join(lines)


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("--lesson",default="g10-ch3-discriminant")
    p.add_argument("--output")
    p.add_argument("--check",action="store_true")
    a=p.parse_args()
    rendered=sheet(load_lesson(a.lesson))
    if a.check:
        if not a.output: p.error("--check requires --output")
        path=Path(a.output)
        if not path.exists() or path.read_text(encoding="utf-8")!=rendered:
            raise SystemExit("Recording sheet is stale: run script without --check and commit its output")
        print("PASS source-locked recording sheet:",path)
    elif a.output:
        path=Path(a.output)
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text(rendered,encoding="utf-8")
        print("Generated Fola recording sheet:",path)
    else:
        sys.stdout.write(rendered)

if __name__=="__main__":
    main()
