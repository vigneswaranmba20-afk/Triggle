> **Archive note:** This document describes an earlier release. For the current video policy (no pilot, human-narrated videos later), read `README_v127_COMING_SOON.md`.

# Triggle v1.26 — Selective learning and video production roadmap

## What changed
- **All 105 questions:** Quick Solution remains available, unchanged in mathematics.
- **Only six carefully authored problems:** show Understand Deeply (English/Tamil). This is a deliberate, conservative first selection.
- **The repetitive per-step Why? buttons are removed**, including the Class 10 quadratic practice problem.
- **Existing pilot MP4 and Watch Visual Lesson feature remain intact.** No new animations are generated automatically.
- Other questions receive a deeper experience only after a real, reviewed conceptual lesson is written. A generic restatement of the solution is not acceptable.

## Selected Understand Deeply lessons
| Class | ID | Educational justification |
|---|---|---|
|9|c9-example-6-2|Discover right-triangle sides, Pythagoras, and six ratios.|
|10|c10-6-6-1-1|Derive a trig proof via sine/cosine rather than reciting identities.|
|12|c12-4-4-1-1|Understand many sine zeros and interval restrictions.|
|12|c12-4-4-1-2|Understand 2kπ, negative rotations, valid k and proof.|
|12|c12-4-4-1-3|Link sine waves, period compression and unit-circle motion.|
|12|c12-4-4-3-5|Reason about nested-function domains and endpoints.|

## All other questions
Quick Solution only. The class 10 problem x²−5x+6=0 is included in that group: the correct factoring steps are visible, with no redundant Understand Deeply control.

## Videos: only selected hard problems
The file `data/video-production-plan.json` contains 15 ranked question IDs, English video descriptions, exact existing problem text, a mathematical animation idea and an expected MP4 filename. It is a production backlog, not the student-facing manifest. A planned video NEVER causes a Watch button to appear.

## How to publish a video by uploading it into GitHub

**One-time setup**
1. Upload `Triggle_v124_Complete_Website.zip` (v1.26) to the repository root, replacing the previous ZIP with that exact name.
2. In the GitHub repository, edit `.github/workflows/deploy.yml` to match `GITHUB_WORKFLOW_TO_INSTALL.yml` (provided inside the package and as a separate download). This replaces the outdated push-path trigger and overlays future MP4s into the deployed site. Under GitHub Pages Settings, choose Source: GitHub Actions, not Deploy from a branch.
3. Verify the website shows v1.26 and Quick Solution-only questions do not display Understand Deeply.

**Each new video**
1. Create an H.264 MP4 (AAC audio optional) with the exact filename for the question in `data/video-production-plan.json`; e.g. `triggle-class12-ex4-1-q1-ii.mp4`.
2. In the GitHub repository **root**, create or open `videos/`, and upload the MP4 there. Optional poster: a same-stem WebP, e.g. `triggle-class12-ex4-1-q1-ii.webp`.
3. Commit the files. The updated workflow copies `videos/*` into the published site and runs `tools/build_video_catalog.py`. The script adds only genuinely present MP4s to `data/video-lessons.json` as ready.
4. The site then displays Watch Visual Lesson for the exact `questionId` automatically. If only English narration is available and the learner selects Tamil, the interface still offers the English video with a language note. All other questions keep their buttons hidden. A newly uploaded narrated MP4 for the pilot question replaces the visual-only pilot for that question.
5. Check playback and downloads on Android Chrome. Download uses the deployed same-origin MP4.

No paid APIs, no client-side secrets, no public GitHub repo edits from a student browser. Avoid burning subtitles into videos. Your existing player still handles playback, fullscreen, download and Back to question.

## Important limits and accuracy
- The 15 video recommendations are **a teaching-priority shortlist**, not 15 produced videos. Only the existing visual-only pilot is included.
- Six authored deep lessons are selected; mathematical content in the wider question bank still needs source-edition and pedagogical review.
- GitHub Pages deploys output from the ZIP. Without the one-time updated workflow, merely uploading a standalone MP4 to the repository will NOT make it available in the website. The one-time workflow update solves that.
- Keeping MP4s in the repo works for small collections, but monitor repository and Pages limits as the library grows. Cloudflare R2 is a possible later scaling step.

© 2026 VIGNESWARAN E R. All rights reserved.
