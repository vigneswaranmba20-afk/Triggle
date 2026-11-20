#!/usr/bin/env python3
"""Generate a verbatim one-take Fola guide directly from a validated TRACE lesson.

One-shot generation cannot be promised without checking eight actual silent gaps.
No API, network request or speech inference is performed by this script.
"""
import argparse
from pathlib import Path
import sys
from trace_video_factory import load_lesson


def guide(spec):
    beats=spec["beats"]
    number=len(beats)
    if number!=9:
        raise ValueError("One-WAV guide currently supports exactly nine reviewed scenes")
    lines=[
        "# TRACE Single-WAV Fola Recording Guide — "+spec["title"],
        "",
        "**Lesson:** `"+spec["id"]+"` · English · "+str(number)+" scenes.",
        "**Voice:** "+spec["voice"]["name"]+". Choose the existing voice in AI Studio; never enable billable API access.",
        "",
        "## One recording, not nine separate generations",
        "",
        "1. Open [Google AI Studio Speech](https://aistudio.google.com/generate-speech), single-speaker Fola, ONLY if your access has no additional billing.",
        "2. Keep the voice style outside the narration field: "+spec["voice"]["delivery"],
        "3. Copy the **nine paragraphs below** as one speech request. Ask for clear, completely silent **2.5–3 second gaps** BETWEEN paragraphs. Do not speak stage titles, numbering, cues, or the words \"pause two seconds\".",
        "4. Preview the output. Preserve the WAV in **uncompressed 16-bit PCM, 16–48 kHz**, mono/stereo. If a download is another format, convert **locally** with FFmpeg, without paid services.",
        "5. TRACE's one-WAV import demands exactly **eight internal silent gaps of at least 1.6 seconds**. A blank line, punctuation, or a TTS prompt is not proof that the waveform contains them. If missing or extra, the pipeline refuses to guess. Use the nine-WAV fallback, or insert gaps with a local editor before re-testing.",
        "6. Upload the single WAV as a GitHub issue attachment. When Mission 05's guarded workflow is merged, run its manual action with the attachment URL. The output is a **private review MP4**, not an automatic publication.",
        "",
        "## Copy this complete narration into one Fola speech request",
        "",
        "```text",
    ]
    lines.extend([beat["narration"]+("\n" if i != number-1 else "") for i,beat in enumerate(beats)])
    lines.extend([
        "```",
        "",
        "## Alignment checklist (not part of spoken narration)",
        "",
    ])
    for i,beat in enumerate(beats,1):
        lines.append(f"- [ ] Scene {i}: `{beat['id']}` — {beat['scene']}"+(" — followed by a 2.5–3 s silent separator" if i<number else " — final scene, no separator"))
    lines.extend([
        "",
        "**Cost:** The factory importer/renderer makes zero Gemini/OpenAI API calls. AI Studio itself must be used only within account limits; subscriptions do not guarantee free developer API access.",
        "**Mathematics:** `DE ∥ BC` implies `AD/DB = AE/EC`; for the first example, `AE=6 cm`. Do not accidentally reveal the independent practice answer (`8 cm`) before scene nine.",
        "**Review boundary:** The first assembled video requires mathematical, narration, mobile and checksum review and explicit approval before student publication.",
        "",
    ])
    return "\n".join(lines)


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("--lesson",default="g10-ch4-bpt-thales")
    p.add_argument("--output",type=Path)
    p.add_argument("--check",action="store_true")
    args=p.parse_args()
    content=guide(load_lesson(args.lesson))
    if args.check:
        if not args.output:
            p.error("--check requires --output")
        if not args.output.is_file() or args.output.read_text(encoding="utf8")!=content:
            raise SystemExit("One-take narration guide is stale; regenerate from lesson source")
        print("PASS one-WAV guide exactly matches the nine locked narrations")
    elif args.output:
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text(content,encoding="utf8")
        print("Wrote the one-take Fola guide:",args.output)
    else:
        sys.stdout.write(content)


if __name__=="__main__":
    main()
