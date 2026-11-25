"""Render one Fola-narrated Mensuration batch, from its aligned local timeline.

Usage: python site/tools/trace_mensuration_batch.py /path/to/local/release [--pilot]
Requires the supplied batch manifest, prepared WAVs and a verified timeline
under that directory. The source WAV and exports stay outside of git.
"""
import argparse
from concurrent.futures import ProcessPoolExecutor
import json
import math
from pathlib import Path
import subprocess

from trace_mensuration_artwork import artwork
from trace_video_factory import sha256, verify_video

FPS = 24
WIDTH, HEIGHT = 720, 1280

# Each cue names an audible anchor and the exact math row(s) that it reveals.
# Ordered row groups permit two separate, readable displays for longer results.
CUES = (
    (
        (("cut its wall", .8, r"r, h"),),
        (("becomes a rectangle", 1.5, ""), ("its width", .8, r"\text{width}=2\pi r")),
        (("multiply", 1.25, r"A_{\mathrm{curved}}=2\pi rh"),),
        (("two circular ends", .6, ""), ("pi r squared", .65, r"A_{\mathrm{ends}}=2\pi r^2")),
        (("total surface area", .65, r"A_{\mathrm{total}}=2\pi rh+2\pi r^2",
          r"=2\pi r(h+r)"),),
    ), (
        (("vertical height", .8, r"h,\ r"),),
        (("slant height", 1.05, ""), ("pythagoras", .65, r"\ell=\sqrt{h^2+r^2}")),
        (("circular sector", 1.2, ""), ("base circumference", .6, r"s=2\pi r")),
        (("fraction of a full circle", .7, r"\frac{2\pi r}{2\pi\ell}"),
         ("full circle area", .7, r"A=\dfrac{2\pi r}{2\pi\ell}\,\pi\ell^2")),
        (("curved surface area", .75, r"A_{\mathrm{curved}}=\pi r\ell"),
         ("add the base disc", .7, r"A_{\mathrm{curved}}=\pi r\ell",
          r"A_{\mathrm{total}}=\pi r(\ell+r)")),
    ), (
        (("slice the top", 1.35, ""),),
        (("larger radius", 1.0, r"R>r>0,\quad h>0"),),
        (("horizontal distance", .85, r"\ell=\sqrt{h^2+(R-r)^2}"),),
        (("restoring the missing cone", .8, ""),
         ("are similar", .8, r"\dfrac{r}{R}=\dfrac{H-h}{H},\quad H=\dfrac{hR}{R-r}"),
         ("subtract", .75, r"H=\dfrac{hR}{R-r}",
          r"V=\dfrac{\pi}{3}\left[R^2H-r^2(H-h)\right]")),
        (("frustum volume formula", .8, r"V=\dfrac{\pi h}{3}(R^2+Rr+r^2)"),
         ("curved surface area", .8, r"V=\dfrac{\pi h}{3}(R^2+Rr+r^2)",
          r"A_{\mathrm{curved}}=\pi(R+r)\ell")),
    ), (
        (("same base radius", .7, r"r_{\mathrm{cone}}=r_{\mathrm{cyl}}",
          r"h_{\mathrm{cone}}=h_{\mathrm{cyl}}"),),
        (("fill the cone", .55, ""), ("pour it", 1.7, r"\dfrac{1}{3}")),
        (("a second", 1.55, r"\dfrac{1}{3}+\dfrac{1}{3}=\dfrac{2}{3}"),
         ("a third", 1.55, r"\dfrac{1}{3}+\dfrac{1}{3}+\dfrac{1}{3}=1")),
        (("base area", .75, r"V_{\mathrm{cyl}}=\pi r^2h"),),
        (("one third", .75, r"V_{\mathrm{cone}}=\dfrac{1}{3}\pi r^2h"),),
    ), (
        (("hemisphere joined", 1.1, ""), ("same radius", 1.2, r"r_{\mathrm{cyl}}=r_{\mathrm{hemi}}=r")),
        (("once joined", 1.35, ""),),
        (("curved wall", .65, r"2\pi rh"),
         ("bottom circle", .65, r"2\pi rh+\pi r^2"),
         ("curved dome", .65, r"A=2\pi rh+\pi r^2+2\pi r^2")),
        (("exposed area", .7, r"A=2\pi rh+3\pi r^2"),
         ("volumes add", .7, r"A=2\pi rh+3\pi r^2",
          r"V=\pi r^2h+\dfrac{2}{3}\pi r^3")),
        (("exposed surfaces", .7, r"A=\text{sum of exposed areas}"),
         ("subtract", .7, r"V=V_{\mathrm{joined}}-V_{\mathrm{removed}}")),
    ), (
        (("rearrange", 2.1, r"3\times2\times2=4\times3\times1=12"),),
        (("volume has not changed", .7, r"V_{\mathrm{before}}=V_{\mathrm{after}}"),),
        (("no material is lost", .65, ""), ("density is unchanged", .65, "")),
        (("equate", .8, r"\dfrac{4}{3}\pi R^3=\pi r^2H"),),
        (("cancel pi", .75, r"\dfrac{4}{3}R^3=r^2H"),
         ("new height", .75, r"H=\dfrac{4R^3}{3r^2}"),
         ("surface area", .75, r"H=\dfrac{4R^3}{3r^2}")),
    ),
)

# Visual baselines and formulas are ordinal, but the resulting cue manifest
# uses absolute narration time within each lesson.
DEFAULT_ROWS = {
    (0, 0): (r"r,\ h",),
    (1, 0): (r"h,\ r",),
    (2, 4): (),
    (3, 2): (r"\dfrac{1}{3}",),
    (4, 4): (r"A=2\pi rh+3\pi r^2", r"V=\pi r^2h+\dfrac{2}{3}\pi r^3"),
}


def all_formulas():
    expressions = dict.fromkeys(
        row for sequence in CUES for beat in sequence for _, _, *rows in beat
        for row in rows if row
    )
    expressions.update(dict.fromkeys(row for rows in DEFAULT_ROWS.values() for row in rows))
    return {tex: str(index) for index, tex in enumerate(expressions, 1)}


def prepare_math(root, formulas):
    work = root / "math"
    work.mkdir(exist_ok=True)
    formula_file = work / "formulas.json"
    formula_file.write_text(json.dumps({key:tex for tex,key in formulas.items()}, indent=2))
    log = root / "evidence/notation.log"
    with log.open("w") as output:
        subprocess.run(["node", str(Path(__file__).with_name("trace_mensuration_math.cjs")),
                        str(formula_file), str(work)], stdout=output, check=True)


def render_lesson(root, lesson, timing, formulas, pilot):
    index = lesson["num"] - 1
    audio = root / "audio" / lesson["files"]["en"]["audio"]
    if sha256(audio) != timing["slowedSha256"]:
        raise ValueError(f"Prepared narration does not match timing manifest for {lesson['id']}")
    beats = timing["beats"][:1] if pilot else timing["beats"]
    target = root / "videos" / ("pilot.mp4" if pilot else lesson["files"]["en"]["video"])
    frames = math.ceil(beats[-1]["videoEnd"] * FPS - 1e-8)
    command = [
        "ffmpeg", "-y", "-v", "error", "-threads", "1", "-filter_threads", "1",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}", "-framerate",
        str(FPS), "-i", "pipe:0", "-i", str(audio), "-af", "apad",
        "-t", f"{frames/FPS:.6f}", "-c:v", "libx264", "-threads", "2",
        "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
        "-c:a", "aac", "-ar", "48000", "-b:a", "112k", "-movflags", "+faststart", str(target)
    ]
    console = root / "evidence" / (target.stem + "-render.log")
    math_path = root / "math"
    with console.open("w") as log:
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stderr=log)
        try:
            frame = 0
            for beat, info in enumerate(beats):
                changes = info["cues"]
                paths = [tuple(math_path / (formulas[row]+".png") for row in rows if row)
                         for rows in [DEFAULT_ROWS.get((index, beat), ()),
                                      *(entry[2:] for entry in CUES[index][beat])]]
                previous = None
                while frame < math.ceil(info["videoEnd"] * FPS - 1e-8):
                    timestamp = frame / FPS
                    stage = sum(cue["videoTime"] <= timestamp for cue in changes)
                    progress = 0
                    if stage:
                        cue = changes[stage-1]
                        progress = min(1, (timestamp-cue["videoTime"])/cue["animationSeconds"])
                    # Reuse held frames byte for byte across narration pauses.
                    state = (stage, progress)
                    if state != previous:
                        image = artwork(index, beat, stage, progress, paths[stage])
                        if beat and timestamp-info["videoStart"] < .16:
                            from PIL import Image
                            blend = max(0, min(1, (timestamp-info["videoStart"])/.16))
                            header = image.crop((40,160,680,282))
                            blank = Image.new("RGB",header.size,image.getpixel((0,285)))
                            image.paste(Image.blend(blank,header,.4+.6*blend),(40,160))
                        payload = image.tobytes()
                        previous = state if not beat or timestamp-info["videoStart"]>=.16 else None
                    process.stdin.write(payload)
                    frame += 1
        finally:
            process.stdin.close()
            status = process.wait()
    if status:
        raise RuntimeError(console.read_text())
    data = verify_video(target, WIDTH, HEIGHT)
    result = {"id": lesson["id"], "file": target.name, "sha256": sha256(target),
              "durationSeconds": float(data["format"]["duration"]),
              "bytes": target.stat().st_size}
    (root / "evidence" / (target.stem + "-result.json")).write_text(json.dumps(result, indent=2)+"\n")
    print(json.dumps(result), flush=True)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path)
    parser.add_argument("--pilot", action="store_true")
    parser.add_argument("--keep-math", action="store_true")
    parser.add_argument("--available-only", action="store_true",
                        help="Render the verified subset to review; do not produce a release manifest")
    args = parser.parse_args()
    root = args.directory.resolve()
    manifest = json.loads((root / "input/batch_manifest.json").read_text())
    timing = json.loads((root / "evidence/timing.json").read_text())
    lessons = manifest["lessons"]
    aligned = timing["lessons"]
    if [lesson["id"] for lesson in lessons] != [item["lessonId"] for item in aligned]:
        raise ValueError("Lesson order in the source manifest and timeline must match")
    ready = [(lesson,item) for lesson,item in zip(lessons,aligned,strict=True)
             if item["status"] == "narration complete" and len(item["beats"]) == 5]
    if not args.pilot and not args.available_only and len(ready) != len(lessons):
        raise ValueError("Six complete narrations are required for a release manifest")
    formulas = all_formulas()
    if not args.keep_math:
        prepare_math(root, formulas)
    if args.pilot:
        render_lesson(root, *ready[0], formulas, True)
    else:
        with ProcessPoolExecutor(max_workers=3) as pool:
            jobs = [pool.submit(render_lesson, root, lesson, item, formulas, False)
                    for lesson, item in ready]
            results = [job.result() for job in jobs]
        name = "available-media.json" if args.available_only else "release.json"
        (root / "evidence" / name).write_text(json.dumps(results, indent=2)+"\n")


if __name__ == "__main__":
    main()
