# Triggle v1.27 — Video lessons coming soon

## Current student experience
- All 105 existing Quick Solutions are unchanged.
- Understand Deeply remains limited to the 6 curated mathematics lessons from v1.26.
- For 15 preselected video-worthy questions, students see **Visual lessons · Coming soon · Human narration on the way**, a small informational label (not a button).
- There are **no playable video lessons**, video download buttons, dummy videos, or automatic narration yet.
- The old visual-only experimental MP4 and its poster are excluded from this deployment ZIP. It has not been deleted from earlier releases or your own files.

## When the human-narrated videos are ready
1. Record the lesson with a real human voice and verify the explanation and mathematics.
2. Export a phone-readable `.mp4` with H.264 video and AAC audio. Do not burn subtitles into the picture.
3. Refer to `VIDEO_PRODUCTION_ROADMAP.md` or `data/video-production-plan.json` for the filename mapped to that question (example: `triggle-class12-ex4-1-q1-ii.mp4`).
4. On GitHub, upload your finalized MP4 to the **repository-root `videos/` folder** (separate from the ZIP). If you want an optional poster, name it the same stem plus `.webp` and put it in the same folder.
5. The one-time GitHub Actions workflow from `GITHUB_WORKFLOW_TO_INSTALL.yml` must be installed as `.github/workflows/deploy.yml`. It copies the uploaded video into the published site and runs `tools/build_video_catalog.py` to register the question automatically, without editing HTML.
6. Only genuinely present MP4s receive an enabled Watch Visual Lesson button. The Coming Soon label disappears for that question; everyone else keeps the placeholder or sees nothing.
7. Test audio, seeking, mobile fullscreen, and download on Android Chrome after publishing.

**Important:** This simple catalog detects the existence and MP4 container signature of uploaded videos, but **cannot certify whether narration is a real human voice**. The creator should review and approve a video before uploading it. No AI voice generation or API keys are involved.

## Deploy v1.27
Replace `Triggle_v124_Complete_Website.zip` in the GitHub repository root and run the ZIP publishing workflow. Verify GitHub Pages Source = GitHub Actions. Keep `GITHUB_WORKFLOW_TO_INSTALL.yml` available for the one-time workflow update so future standalone video uploads publish automatically.

© 2026 VIGNESWARAN E R. All rights reserved.
