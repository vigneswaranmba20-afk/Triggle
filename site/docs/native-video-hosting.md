# Triggle Native Video Lessons — Phase 1

## Live Class 12 visual lesson
- **Question:** Class 12 · Exercise 4.1 · Question 1(ii), `c12-4-4-1-2`
- **Math:** Solve `sin x = -1`, `-3π ≤ x ≤ 3π` → `-5π/2, -π/2, 3π/2`
- **Media:** `site/videos/triggle-class12-ex4-1-q1-ii.mp4` (4,932,846 bytes; H.264/AAC; 720×1280; 170.1667 seconds)
- **SHA-256:** `bf0965d5657838b83fb9926a8ac0358517f90aa1a4e4e8e3f99aaae80e4430fe`
- **Poster:** `site/videos/posters/triggle-class12-sine.svg`
- **Cross-browser fallback:** `site/videos/triggle-class12-ex4-1-q1-ii.webm` (~9.4MB, VP9/Opus). Native HTML `<source>` selects compatible MP4 or WebM automatically.
- **Public video URL:** `https://vigneswaranmba20-afk.github.io/Triggle/site/videos/triggle-class12-ex4-1-q1-ii.mp4`
- **Student page:** `https://vigneswaranmba20-afk.github.io/Triggle/?class=12&question=c12-4-4-1-2`

Both video formats are now committed to GitHub (not linked to Drive). No Google Drive dependency is required at runtime or for future deployments. The existing Google Drive recording remains an owner backup.

## Experience
The video is embedded directly in the matching question as a native `<video controls playsinline preload="none">` with ordered MP4 and WebM sources, with a poster, sound, scrubbing, and built-in fullscreen where supported. The explicit **Fullscreen/Larger view** control opens the pre-existing lesson viewer with speed, seek, Back-to-question, and download controls. The native player never autoplays or fetches MP4 bytes on page load. When the student changes questions, inline playback is stopped and sources are cleared. Only the published question shows this video; all other 14 planned questions remain unavailable.

## Publishing more videos
For a small number of lessons, add a reviewed H.264/AAC file to `site/videos/` and a manifest record in `site/data/video-lessons.json`. Build browser tests for the exact question ID. The `verify_video_assets.py` test validates duration, dimensions/pixel format, and file existence. Update the preserved manifest hash in `site/data/legacy-content-baseline.json` for reviewed changes.

### Limits and scale
GitHub Pages publishes static files and is appropriate for this ~4.8MB pilot. It has 1GB published-site capacity and a soft 100GB/month bandwidth limit. Do not add hundreds of HD MP4s to Git history: at larger scale, retain the same HTML5 player but put video bytes in dedicated object storage, for example Cloudflare R2 with range support. Avoid Google Drive preview links as the primary student video interface.
