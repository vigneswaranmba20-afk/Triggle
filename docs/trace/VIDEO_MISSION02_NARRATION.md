# TRACE Video Factory — Mission 02 narration readiness

## Status and scope

Mission 01 confirmed offline A.P. and G.P. storyboard demos (synthetic chimes, **not** publishable teaching videos). This increment prepares narration policy and stale-audio safety; it **does not** call an AI API, create an approved narrated MP4, change existing lessons, or upload to R2.

## Voice production policy

- The factory now requests **warm, calm, natural, clear, neutral international English**, with a relaxed pace, gentle equation pauses, and no artificial forced accent or music.
- The existing A.P./G.P. lesson JSONs still list Gemini's **Kore** voice. Kore remains a technical configuration, **not user-approved final narration**. Do not assume that the separately preferred voice **Fola** is a valid Gemini API identifier.
- Before invoking paid `--mode gemini` on a release candidate, audition the provider-supported voice and obtain approval. A Gemini Pro consumer subscription does not necessarily cover the separate API's usage.
- To use an externally recorded or approved Fola-like voice without assuming Gemini API support, use `--mode existing --existing-dir <path>`; put **one WAV file per beat**, named `<beat-id>.wav` (for A.P.: `welcome.wav`, `sequence.wav`, ... `reveal.wav`; for G.P.: `wonder.wav`, ... `check-your-thinking.wav`).
- Changing narration style, voice, model, or script now changes the cache fingerprint, so old accent-mismatched WAVs cannot be silently reused.

## Verified reproduction commands (no paid calls)

```bash
python3 site/tools/trace_video_factory.py validate --lesson g10-ch2-ap-sum
python3 site/tools/trace_video_factory.py self-test --lesson g10-ch2-ap-sum
python3 site/tools/trace_video_factory.py validate --lesson g10-ch2-gp-sum
python3 site/tools/trace_video_factory.py self-test --lesson g10-ch2-gp-sum
python3 site/tools/test_trace_gp_video.py
python3 site/tools/test_trace_voice_policy.py
python3 site/tools/trace_video_factory.py render --lesson g10-ch2-ap-sum --mode demo --width 360 --height 640 --fps 8 --output build/trace-video/preview/ap
```

The demo uses chimes/silence and cannot be released. Do not mistake file existence for successful review.

## First real production pilot

1. Audition and approve one natural narrator; prepare nine reviewed narration beats.
2. Render a complete A.P. or G.P. lesson with `--mode existing` and `--width 720 --height 1280 --fps 12`, or explicitly approved Gemini voice if API billing is understood.
3. Check frame-by-frame mathematics, spoken accuracy, naturalness, legibility on a real Android phone, practice-before-answer ordering, A/V synchronization, full duration, and H.264/AAC codecs.
4. Independently hash and verify the exact MP4 using `site/tools/trace_video_release.py verify` with the complete `result.json` and SHA-256.
5. Only after approval, upload the final MP4 to Cloudflare R2 (prefer a custom public delivery domain; never rely on `r2.dev` at scale) and update the reviewed concept's video reference. Preserve old video playback and fallback until the public URL is verified.
6. Google Drive holds optional working masters/backups, **not** public student playback.

**Future scope** (not claimed complete): modular template registry, Grade 9 concept pilots, generic Grade 9/10 release adapters, portable font selection, bulk job queue, and R2 deployment automation.
