> **Archive note:** This document describes an earlier release. For the current video policy (no pilot, human-narrated videos later), read `README_v127_COMING_SOON.md`.

# Triggle v1.24 · Watch Visual Lesson (pilot)

## What this release includes

This is a **non-destructive upgrade** to v1.23, preserving all 105 exercise entries, the navigation, Quick Solution, Understand Deeply and its Why? steps, Class 9 original view, Trigonometry Basics, and copyright **© 2026 VIGNESWARAN E R**.

A fourth component, **Watch Visual Lesson**, is a reusable, question-linked **video delivery feature**; the three complementary study choices remain Quick Solution, Understand Deeply, and Watch Visual Lesson.

The exact Class 12 exercise is `c12-4-4-1-2` in `data/class-12.js`. The video library is `data/video-lessons.json`.

**Important asset distinction:** The original **narrated** experimental sine animation was NOT present in the available project, chat files or library search results. No claim is made that we recovered it or produced a replacement narration. This package ships a small, original **72-second visual-only MP4 pilot** for the same maths problem, with no subtitles or audio track. The button explicitly says **Visual-only pilot · narration pending**. When the original finished narrated MP4 is supplied, replace the pilot (or update the manifest `video` filename), change `status` to `ready`, and choose the correct narration language.

## What a student sees

1. Navigate to **Class 12 → Exercise 4.1 → Q1(ii)**. Or open `index.html?class=12&question=c12-4-4-1-2`.
2. A lavender **▶ Watch Visual Lesson** button appears near Quick Solution and Understand Deeply. It is **not shown on the other 104 questions**, which have no video asset.
3. Tap to open a dedicated mobile-first video dialog. The original question is in a disclosure at the top. The poster loads and the native video player supports play/pause/seek/replay. The separate speed selector provides 0.75×, 1×, 1.25×, 1.5×, 2× where the browser supports `playbackRate`. There is an optional fullscreen control.
4. **⬇ Download Lesson** points to the same-origin MP4 with the native HTML `download` attribute; it should save in Android Chrome. Some browser versions may open an MP4 instead: long-press the Download link and choose Download link, or use Chrome's menu to download the opened media.
5. Close the dialog or press Back to return to the same exercise. The dialog does **not** automatically play with sound; it loads the video **only** after the user clicks.

## Files introduced

| File | Purpose |
|---|---|
| `assets/visual-lessons.js` | Native player, dialog, back/restore, speed, fullscreen, download, error and loading states |
| `data/video-lessons.json` | Self-describing manifest; lesson IDs and available MP4 assets |
| `videos/triggle-class12-ex4-1-q1-ii-visual-preview.mp4` | Mathematical visual-only pilot, H.264, yuv420p, 720×1080, 72 seconds, ~427 KB |
| `videos/posters/triggle-class12-ex4-1-q1-ii.webp` | Matching thumbnail image |
| `tools/render_visual_pilot.py` | Deterministic, no-cloud Python + Pillow + FFmpeg pilot renderer |
| `tools/verify_video_assets.py` | Check lesson mapping, file existence, mathematical answers and video metadata |

`index.html`, `assets/app.css`, `assets/app.js`, and `service-worker.js` are changed minimally. `grades.html` still redirects to the main learning centre as before.

## How to publish using the existing GitHub Pages workflow

The existing workflow expects **one ZIP at repo root** named `Triggle_v1_11_Original_Basics.zip`. Replace the previous ZIP with the new GitHub-ready ZIP from the assistant. Leave the workflow alone. Ensure GitHub Pages → **Source: GitHub Actions**, not *Deploy from a branch*, to avoid the duplicate publishing race observed in older deployments.

**Do not upload the MP4 separately** when using this ZIP workflow: the MP4 and poster are already inside the ZIP and will be extracted as site files. GitHub Pages serves them at `https://vigneswaranmba20-afk.github.io/Triggle/videos/...`.

## Adding your original narrated video

1. Find the original video created during the prior Triggle visual-lesson experiment, and **send it as an MP4 attachment** or make it available as an owned downloadable file. It could not be found in the files available for this build.
2. For the next release, put a copy in `videos/triggle-class12-ex4-1-q1-ii.mp4`.
3. In `data/video-lessons.json` update the matching lesson record:

```json
{
  "id": "triggle-class12-ex4-1-q1-ii-en",
  "questionId": "c12-4-4-1-2",
  "class": 12,
  "chapter": "4",
  "exercise": "4.1",
  "question": "1(ii)",
  "title": {"en": "Why sine equals −1 again and again", "ta": "சைன் −1 மீண்டும் மீண்டும் ஏன் வருகிறது?"},
  "language": "en",
  "status": "ready",
  "video": "./videos/triggle-class12-ex4-1-q1-ii.mp4",
  "poster": "./videos/posters/triggle-class12-ex4-1-q1-ii.webp",
  "durationSeconds": 170,
  "downloadAllowed": true,
  "concepts": ["sine", "unit circle", "2kπ", "periodicity", "interval restrictions"]
}
```

Replace `durationSeconds` with your file's verified duration. If the new recording has Tamil audio, set `language: "ta"` and add a separate entry for English when available. A `language: "visual"` record can be shown to both language users if it contains no language-specific audio.

### Adding another question's MP4

Identify the **real question ID** in `data/class-*.js`; do **not** guess the ID. Add an MP4 and poster to `videos/` and one JSON record in `data/video-lessons.json`. Set `status: "ready"` only after validating video and maths. Status `planned` or `unavailable` does **not** show a player button. For remote media use a publicly accessible `https://` MP4 URL, with byte-range support, and preferably a direct download URL via optional `downloadUrl`; cross-origin HTML `download` attributes are not honored by many browsers unless the remote host sends `Content-Disposition: attachment`.

**Example next subject:** Class 11 quadrant angles `c11-3-3-1-1` (verify that actual ID in current data before creating its manifest entry). Produce a bespoke angle-in-quadrants video, not a recycled sine solution.

## Recommended production system

**Start cheap:** use HTML/SVG/Canvas/JavaScript for scenes; export to video with Remotion or a custom Puppeteer/Playwright renderer running on a suitable desktop, CI, or low-cost cloud worker. Use **Manim** when a scene requires very accurate geometry, symbolic transformations, or complex graphing. Mix audio with FFmpeg. The built-in pilot uses Pillow + FFmpeg because it can produce a compatible MP4 locally without paid APIs.

**Narration:** create one script per question and verify spoken mathematical wording and timing. Use the original natural voice from your earlier experiment when provided, or an appropriately licensed high-quality TTS/recorded voice. Narration may need cloud tooling, but **visiting and playing the static site does not call any paid API**. Never place narration/API secrets in GitHub Pages JavaScript, manifest, or public repository.

**Encode compatible MP4:**

```bash
ffmpeg -i input-with-voice.mov -vf "scale='min(720,iw)':-2" \
  -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart \
  videos/new-lesson.mp4
```

For 720×1080 portrait, aim for ~24–30 fps for final narration-backed animations. The silent pilot is 12 fps and intentionally not a voice-finished master. No subtitles are burned in.

## Hosting strategy, November 2026

- **Small pilot**: GitHub Pages and compressed H.264 MP4 files. No additional provider, simple one-ZIP workflow. GitHub documents a 1 GB maximum published-site size, recommended 1 GB source repository size, and a soft 100 GB/month bandwidth limit. GitHub Pages is not an unrestricted commercial SaaS hosting service. Keep video count/traffic modest and plan migration before scale. [Official GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- **Hundreds of MP4s**: Cloudflare R2 Standard with public custom domain and appropriate Content-Type `video/mp4`, streaming Range support, CORS as necessary, and optionally `Content-Disposition` for downloads. Current listed pricing: 10 GB-month Standard and 10 million Class B reads free each month; above free, $0.015/GB-month storage, $0.36 per million Class B reads; free egress. Requires an account / payment setup depending on Cloudflare requirements. [R2 pricing](https://developers.cloudflare.com/r2/pricing/).
- **Managed video streaming**: Cloudflare Stream handles transcoding and adaptive delivery, but has video storage and delivered-minute costs (~$5/1000 stored minutes per month; ~$1/1000 delivered minutes), not as cheap as raw R2 MP4 at small traffic. [Stream pricing](https://developers.cloudflare.com/stream/pricing/).
- **YouTube**: easy embeds and low operator cost, but standard embedded YouTube is **not suitable for Triggle's direct MP4 downloads**; YouTube's API policies restrict downloading/offline copying except with prior approval. Privacy, advertisements, and unrelated recommendations also reduce control. [YouTube policies](https://developers.google.com/youtube/terms/developer-policies).

## Accessibility and performance

- Native HTML5 `<video controls playsinline preload="none">` — autoplay is never invoked.
- No automatic MP4 downloads on lesson load. The service worker expressly bypasses MP4 and HTTP Range requests, so seeking works independently and the PWA cache doesn't fill with videos.
- Responsive portrait or landscape playback with native fullscreen where available; no overlay controls obscuring formulas.
- Poster as WebP. The original question is accessible via the summary above the video.
- An optional written transcript could be added later *outside* the video; subtitles and captions are **not burned in** and are not on by default.

## Verification completed and limitations

- `ffprobe` verifies a real 72-second, 720×1080 H.264 MP4, compatible yuv420p pixel format, with no audio/subtitle streams. `ffmpeg` fully decodes the MP4.
- Mathematical verification: valid integer `k` values are exactly `−1,0,+1`; the three proposed angles all satisfy `sin x = −1` and lie in the interval.
- JS syntax validation with Node; JSON manifest; source file presence and ZIP integrity verification.
- **Live Android Chrome testing was not possible before deployment.** The available Chromium environment has administrator policy `URLBlocklist: ["*"]`, which prevents local browser page navigation and playback tests. This is an environment restriction, not evidence the site itself is broken. Test on an actual Android device after GitHub Pages deployment before labelling the playback/download feature production verified.

### Android acceptance checklist after upload

1. Open the Class 12 problem from the link above. Verify **Watch Visual Lesson** appears; no such button on an unrelated Class 9 question.
2. Tap Watch. Confirm original question is accessible and a poster appears; press Play. No autoplay.
3. Pause, drag the timeline, replay, change playback speed, try fullscreen.
4. Tap Download; check `Downloads/triggle-class12-ex4-1-q1-ii-visual-preview.mp4` and open it offline. If the phone opens the MP4 instead, long-press Download Lesson and use Download link.
5. Close with `Back to question` and with Android Back; confirm the same question, scroll position, and learning stage remain.
6. Switch to Tamil; the player labels should translate (the silent preview itself has English mathematical labels; the final Tamil voice/video needs its own asset).
7. In Understand Deeply, change stages, close, then play the video and return. Check that the deep-learning position is preserved.

**No existing Triggle lesson data was altered by this update.**
