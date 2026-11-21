# TRACE Discriminant — ONE-SHOT Fola Recording

**Purpose:** Record the **entire nine-beat Discriminant lesson once**, then have TRACE split that single WAV into nine visual scenes. This is a *trial* of automatic splitting, not a claim of perfect word-level alignment.

**Voice:** Fola, natural clear unhurried English; no music. **Audio format required:** uncompressed 16-bit PCM WAV, mono or stereo, 16–48 kHz, 25 seconds–20 minutes. The script comes directly from `site/video-factory/lessons/g10-ch3-discriminant.json`.

## Steps on Android

1. Open [Google AI Studio — Speech](https://aistudio.google.com/generate-speech). Use Fola only if your current interface makes it available without an extra charge. Do not enable billing.
2. Paste **only the nine paragraphs in the speech script below** as a **single generation**. Set the speaking style to: **"Speak every paragraph exactly. Between each paragraph leave 2.5–3 seconds of complete silence; do not say any pause or scene labels. Do not insert any other silence longer than one second. Natural, friendly, clear teaching voice, no music."**
3. Export **one** WAV. Check that it contains all nine paragraphs in the right order, with **eight genuinely silent gaps**. Do not use MP3; if the interface provides only unsupported audio formats, do not rename extensions.
4. Once the PR is merged, attach this WAV to the Triggle GitHub issue. In **Actions → TRACE discriminant — ONE continuous Fola WAV to MP4 → Run workflow**, paste the GitHub user-attachment WAV URL into `single_wav_url`.
5. TRACE detects exactly eight long silence separators (each at least 1.6 seconds), verifies audible nine-beat WAVs, renders 720×1280 synchronized MP4, and saves a **seven-day review-only artifact**. Check every scene and audio cut on Android. **It does not publish to Cloudflare or the student website.**

**Important limitations:** Gemini AI Studio may not honor the requested 2.5–3-second pauses. Without eight reliable gaps TRACE intentionally refuses to guess where words belong. If this happens, the existing **nine-WAV ZIP workflow remains available**. The splitter checks silence positions, durations, and amplitude; it cannot prove every spoken word matches the mathematical script. Human listening approval is required.

## One-shot speech script (copy only these nine paragraphs)

Why does one parabola cross the horizontal axis twice, another just touch it, and a third miss it completely? Watch the same curve change.

A root of a quadratic is an x value that makes y equal zero. On a graph, real roots are exactly the points where the parabola meets the x axis.

Start with y equals x squared minus four x plus c. Keep the x squared and x terms fixed. We will change only c, which slides the curve up or down.

When c equals three, the curve crosses the x axis at x equals one and x equals three. There are two different real roots.

Raise c to four. The parabola now touches the x axis at x equals two. The two roots have become equal, with x equal to two.

Raise c to five. The whole curve sits above the x axis, so it has no real roots. A vertical shift changed the answer.

The shortcut is the discriminant, delta equals b squared minus four a c. Positive delta means two unequal real roots. Zero means equal real roots. Negative means no real roots.

Your turn. For two x squared minus six x plus five equals zero, find a, b, and c. Compute delta, and decide whether real roots exist. Pause to think.

Here, a equals two, b equals negative six, and c equals five. Delta equals thirty six minus forty, which is negative four. So there are no real roots. The sign of delta tells us.

## Release checklist

- [ ] All nine pieces spoken completely, in order, with correct mathematical pronunciation
- [ ] Exactly eight long silent gaps; no unexpected gaps within sentences
- [ ] No clipped syllables at the start or end of each rendered scene
- [ ] Correct parabola and discriminant visual transitions
- [ ] Readable on 360px mobile; pause/seek/replay verified
- [ ] Explicit human approval before separate publication workflow

No model API requests are made by TRACE's one-shot review workflow. Standard GitHub Actions usage may count against account quotas.
