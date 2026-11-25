"""Render the approved Tamil Cylinder Surface Area narration in the original template."""
import argparse
from functools import lru_cache, partial
import json
from pathlib import Path
import wave

from PIL import ImageFont, features

from trace_mensuration_artwork import (
    Diagram, GOLD, INK, TEAL, artwork, cylinder_scene,
)
from trace_mensuration_batch import prepare_math, render_timed_lesson
from trace_video_factory import sha256

LESSON = "g10-ch7-cylinder-surface-area"
TITLES = ("உருளை", (
    "நேர் வட்ட உருளை",
    "வளைபரப்பை விரித்தல்",
    "செவ்வகத்தின் பரப்பு",
    "மேல் வட்டமும் கீழ் வட்டமும்",
    "மொத்தப் புறப்பரப்பு",
))
LABELS = {
    "Vertical seam": "செங்குத்து வெட்டு",
    "Wall only": "வளைபரப்பு",
    "Closed cylinder": "திண்ம உருளை",
}


@lru_cache(maxsize=None)
def tamil_font(directory, size, bold):
    weight = "Bold" if bold else "Regular"
    return ImageFont.truetype(str(directory / f"NotoSansTamil-{weight}.ttf"), size,
                              layout_engine=ImageFont.Layout.RAQM)


class TamilDiagram(Diagram):
    def __init__(self, font_directory):
        super().__init__()
        self.font_directory = font_directory

    def typeface(self, text, size, bold):
        if any("\u0b80" <= char <= "\u0bff" for char in text):
            return tamil_font(self.font_directory, size, bold)
        return super().typeface(text, size, bold)

    def text(self, xy, text, size=32, color=INK, bold=False, anchor="mm"):
        if text in LABELS:
            text, size = LABELS[text], min(size, 30)
        super().text(xy, text, size, color, bold, anchor)


def draw_cylinder(cues, d, beat, stage, eased_progress):
    delivered = cues[:stage]
    events = {cue["event"] for cue in delivered}
    current = delivered[-1]["event"] if delivered else None
    # Geometry only moves on the cue that describes that movement. Additional
    # formula reveals keep the cylinder and rectangle in their resolved poses.
    if beat == 1:
        progress = eased_progress if current == "unfold" else float("unfold" in events)
        cylinder_scene(d, beat, int("unfold" in events), progress,
                       show_length="length" in events, show_height="width" in events,
                       length_label="2πr" if "circumference-value" in events else "l",
                       height_label="h" if "height" in events else "b")
        if "length" in events:
            label = "நீளம் = அடிச்சுற்றளவு" if "circumference" in events else "நீளம்"
            d.text((360, 852), label, 32, TEAL, True)
        if "width" in events:
            d.text((605, 395), "அகலம்", 27, GOLD, True)
        if "height" in events:
            d.text((360, 899), "அகலம் = உயரம்", 28, GOLD, True)
    elif beat == 3:
        area = "disc-area" in events
        discs = int("top-disc" in events) + int("bottom-disc" in events)
        cylinder_scene(d, beat, 2 if area else 0, eased_progress,
                       show_circle_area=area, visible_discs=discs)
        if discs >= 1:
            d.text((541, 386), "மேல் வட்டம்", 28, GOLD, True)
        if discs == 2:
            d.text((541, 820), "கீழ் வட்டம்", 28, GOLD, True)
    else:
        progress = eased_progress if stage == 1 else float(stage > 1)
        cylinder_scene(d, beat, stage, progress)
        if beat == 0:
            d.text((396, 359), "ஆரம்", 30, TEAL, True)
            d.text((141, 647), "உயரம்", 28, GOLD, True)


def frame(timing, font_directory, beat, stage, progress, formulas):
    return artwork(0, beat, stage, progress, formulas,
                   diagram=TamilDiagram(font_directory), titles=TITLES,
                   scene=partial(draw_cylinder, timing[beat]["cues"]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("narration", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--font-dir", type=Path,
                        default=Path("/usr/share/fonts/truetype/noto"))
    parser.add_argument("--timeline", type=Path,
                        default=Path(__file__).with_name("trace_tamil_cylinder_timeline.json"))
    parser.add_argument("--samples", action="store_true",
                        help="Render layout samples without encoding or changing the narration")
    args = parser.parse_args()
    spec = json.loads(args.timeline.read_text())
    audio = spec["source"]
    with wave.open(str(args.narration), "rb") as wav:
        if (wav.getframerate(), wav.getnchannels(), wav.getsampwidth(), wav.getnframes()) != (
                audio["sampleRate"], 1, 2, audio["sampleCount"]):
            raise ValueError("Unexpected narration stream")
    if sha256(args.narration) != audio["sha256"]:
        raise ValueError("Only the approved, unchanged narration is accepted")
    if not features.check_feature("raqm"):
        raise RuntimeError("Pillow with RAQM Tamil shaping is required")
    beats = spec["beats"]
    if len(beats) != len(TITLES[1]) or beats[-1]["videoEnd"] != audio["sampleCount"] / audio["sampleRate"]:
        raise ValueError("The visual timeline must cover the approved narration")
    start = 0
    for beat in beats:
        end = beat["videoEnd"]
        times = [cue["videoTime"] for cue in beat["cues"]]
        if beat["videoStart"] != start or end <= start or not (
                times == sorted(set(times)) and all(start <= cue < end for cue in times)):
            raise ValueError("The visual beats and cues must be continuous and ordered")
        start = end
    for part in ("evidence", "videos"):
        (args.output / part).mkdir(parents=True, exist_ok=True)
    display_rows = [[beat.get("openingRows", []), *(cue["rows"] for cue in beat["cues"])]
                    for beat in beats]
    unique = dict.fromkeys(row for beat in display_rows for group in beat for row in group)
    formulas = {tex: str(index) for index, tex in enumerate(unique, 1)}
    prepare_math(args.output, formulas)
    math_path = args.output / "math"
    paths = [[tuple(math_path / (formulas[row] + ".png") for row in group) for group in beat]
             for beat in display_rows]
    build_frame = partial(frame, beats, args.font_dir)
    if args.samples:
        for beat, groups in enumerate(paths):
            for stage, rows in enumerate(groups):
                build_frame(beat, stage, 1, rows).save(
                    args.output / "evidence" / f"beat-{beat+1}-{stage}.png")
        return
    render_timed_lesson(args.output, LESSON, args.narration,
                        args.output / "videos" / f"{LESSON}-ta.mp4",
                        beats, paths, build_frame, pad_audio=False,
                        fade_out_seconds=spec["fadeOutSeconds"])


if __name__ == "__main__":
    main()
