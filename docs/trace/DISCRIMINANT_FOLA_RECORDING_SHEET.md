# TRACE Recording Sheet — Why a parabola has two, one, or no real roots

**Lesson:** `g10-ch3-discriminant` · Grade 10 · English concept video
**Voice target:** Fola · **Model in storyboard:** `gemini-3.8-flash-tts`
**Cost rule:** Only use Gemini AI Studio if your signed-in interface allows no-additional-charge generation. A Google AI subscription does not guarantee free API access. Do not activate billing.

## Record once, following this entire sheet

1. Open [Google AI Studio — Speech](https://aistudio.google.com/generate-speech). Choose single-speaker, the available Fola voice and no-extra-cost access.
2. Set the speaking style once: Friendly, warm, clear and unhurried mathematics teacher. Neutral natural English, gentle pauses after equations, no music. Read only the narration exactly, including numbers.
3. For every row, generate **only its spoken words**, listen for mathematical pronunciation and export as WAV (PCM). Preserve the filename exactly.
4. Place all WAV files at ZIP root (or under one common folder). Upload the ZIP once to TRACE's review-only workflow after it is merged.
5. Review the finished MP4 on a phone. Do not publish on voice filename or automated tests alone; the owner must explicitly approve the full video.

## All nine narration beats

### 01 · `three-possibilities.wav`

> Why does one parabola cross the horizontal axis twice, another just touch it, and a third miss it completely? Watch the same curve change.

*Animation:* `disc-intro` · final visual hold: 1.3s.

### 02 · `roots-are-intercepts.wav`

> A root of a quadratic is an x value that makes y equal zero. On a graph, real roots are exactly the points where the parabola meets the x axis.

*Animation:* `disc-roots` · final visual hold: 1.2s.

### 03 · `move-only-c.wav`

> Start with y equals x squared minus four x plus c. Keep the x squared and x terms fixed. We will change only c, which slides the curve up or down.

*Animation:* `disc-slider` · final visual hold: 1.2s.

### 04 · `two-real-roots.wav`

> When c equals three, the curve crosses the x axis at x equals one and x equals three. There are two different real roots.

*Animation:* `disc-two` · final visual hold: 1.6s.

### 05 · `equal-real-roots.wav`

> Raise c to four. The parabola now touches the x axis at x equals two. The two roots have become equal, with x equal to two.

*Animation:* `disc-touch` · final visual hold: 1.5s.

### 06 · `no-real-roots.wav`

> Raise c to five. The whole curve sits above the x axis, so it has no real roots. A vertical shift changed the answer.

*Animation:* `disc-none` · final visual hold: 1.6s.

### 07 · `delta-sign-rule.wav`

> The shortcut is the discriminant, delta equals b squared minus four a c. Positive delta means two unequal real roots. Zero means equal real roots. Negative means no real roots.

*Animation:* `disc-rule` · final visual hold: 2s.

### 08 · `your-turn.wav`

> Your turn. For two x squared minus six x plus five equals zero, find a, b, and c. Compute delta, and decide whether real roots exist. Pause to think.

*Animation:* `disc-practice` · final visual hold: 4s.

### 09 · `check-the-sign.wav`

> Here, a equals two, b equals negative six, and c equals five. Delta equals thirty six minus forty, which is negative four. So there are no real roots. The sign of delta tells us.

*Animation:* `disc-answer` · final visual hold: 2.5s.

## File checklist

- [ ] `three-possibilities.wav`
- [ ] `roots-are-intercepts.wav`
- [ ] `move-only-c.wav`
- [ ] `two-real-roots.wav`
- [ ] `equal-real-roots.wav`
- [ ] `no-real-roots.wav`
- [ ] `delta-sign-rule.wav`
- [ ] `your-turn.wav`
- [ ] `check-the-sign.wav`

**Do not use** the old paid-TTS `generate` workflow. The importer reads these existing WAVs locally; it does not request Gemini or OpenAI API inference.
**Release boundary:** Imported WAVs and first assembled MP4 are review-only; Cloudflare R2 publication requires a separate approved release.
