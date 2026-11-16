# TRACE Video Factory v1 — audio-first lesson production

**Status:** first working A.P. pairing template with a technical-demo renderer and GitHub preview/release pipelines. The published A.P. lesson stays unchanged until the owner approves a new narrated MP4 and a required quality-gated release PR merges.

## Design

Yesterday's Grade 10 A.P. movie needed separate storyboarding, Google AI Studio voice download, re-timing, export and R2 upload. This version uses one reviewed lesson JSON and separate WAV clips per narration beat. The actual **WAV duration** determines each visual beat; that eliminates manual re-timing between whole scenes, without an external alignment API.

- **Math:** source-based storyboard; no AI-generated answers are accepted during rendering.
- **Audio:** Google Gemini TTS (explicitly enabled only with a secret). Narration segments are cached by model, voice, spoken script and beat ID. Changing one segment allows local re-use of all unchanged audio; changing the GitHub cache revision forces full regeneration.
- **Portrait visuals:** deterministic 9:16 Pillow rendering with a reusable A.P. pairing template and Triggle light/maroon typography. No subtitles by default.
- **Validation:** exact arithmetic, separate Practice/Answer scenes, ffprobe H.264/AAC metadata, SHA-256 fingerprints and an explicit owner preview.
- **Release:** never publish a draft. A separate approval workflow verifies the approved SHA-256, uploads only those exact bytes to R2, creates a single-file website PR and uses the existing mandatory Triggle quality gate.

The Grade 10, Chapter 2 concept ID is g10-ch2-ap-sum. The verified demonstration totals 2+4+6+8+10=30, with a **different** practice problem 3+6+9+12+15=45. The practice scene does not show 45 before the answer beat.

## One-time GitHub setup (Android)

In the repository, open **Settings → Secrets and variables → Actions → New repository secret**. Add these to GitHub, never to ChatGPT or a public repo file.

| Repository secret | Purpose |
| --- | --- |
| GEMINI_API_KEY | Google AI Studio / Gemini API key for spoken audio |
| R2_ACCOUNT_ID | Cloudflare account ID (32 lowercase hexadecimal chars) |
| R2_ACCESS_KEY_ID | R2 bucket-limited Object Read & Write access key |
| R2_SECRET_ACCESS_KEY | Matching R2 secret |
| R2_BUCKET | Existing Cloudflare R2 bucket |
| R2_PUBLIC_BASE_URL | Public HTTPS URL for that bucket (custom domain strongly preferred) |

The existing r2.dev host is for a rate-limited pilot, not production traffic.

To allow GitHub Actions to create a release PR, you may also need to enable **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**. Triggle's existing main-branch ruleset and required Triggle quality gate remain active. If that setting is disabled, the workflow stops safely without changing the live website.

## Free technical test

On Android go to **Actions → TRACE Video Factory — preview → Run workflow**. Choose lesson g10-ch2-ap-sum, mode demo, size preview. Open the completed run and download the ZIP under **Artifacts**. It includes a 360×640 portrait MP4 and result.json.

Demo audio is deliberately just a quiet synthetic chime and silence. Every frame displays **TECHNICAL DEMO — NO NARRATION**. The approval workflow will reject it. This mode tests video creation and narration-based timing without spending API credits.

Local commands (Python, Pillow, FFmpeg and DejaVu fonts required):

    python3 -m pip install -r site/video-factory/requirements.txt
    python3 site/tools/trace_video_factory.py self-test
    python3 site/tools/trace_video_factory.py render --mode demo --width 360 --height 640 --fps 8 --output build/trace-video/preview

## Natural-voice review

Run **TRACE Video Factory — preview** with mode **gemini** and size **final**. The voice candidate is gemini-3.1-flash-tts-preview, prebuilt voice Kore. It is **not verified to match the original Google AI Studio voice**, so listen for warmth, pacing and pronunciation before approval.

The workflow writes duration, video dimensions and its exact SHA-256 to the run summary. The ZIP contains the finished 720×1280 MP4 and result.json. TTS consumes the owner's Gemini API allocation; the rendered website never calls a paid narration API.

## Owner-approved publish

When the final narrated video passes listening and educational review, open **Actions → TRACE Video Factory — approved publish → Run workflow**. Supply the preview's numeric run ID (found in its URL), exact 64-character SHA-256 from its summary, and lesson ID.

The workflow:
1. Downloads only the matching Gemini preview artifact; rejects missing, demo or partial footage.
2. Verifies approved SHA-256, scene order, 720×1280 portrait video, H.264/AAC and duration.
3. Uploads the approved bytes to a content-addressed Cloudflare R2 key and checks public retrieval.
4. Opens a PR updating **only** the A.P. concept's video URL and duration.
5. Explicitly dispatches the Triggle risk-based workflow on the PR branch, then arms auto-merge. Bot-created PRs do not trigger ordinary PR workflows.
6. Publishes to GitHub Pages only after the required quality gate passes on the merged main branch.

No direct push to main, no WAV download/re-upload and no unrestricted token are needed.

## Limitations

- V1 contains **one authored visual template** for a five-term A.P. pairing. Its input numbers are data-driven, but new geometry, unit-circle or graph templates need separate verified scene implementations.
- Each beat is synchronized to its own actual WAV duration, but not yet word-by-word. Within a beat, visual emphasis uses progress heuristics. Advanced word-level alignment can be added when truly needed.
- TTS may mispronounce mathematics; only human listening can approve quality. No transcription-fidelity claim is made.
- Artifact retention is 7 days. Save approved files before expiry. GitHub cannot simulate a paid Gemini call without a configured secret.
- The first demo works without API keys; actual narration and R2 publish require the named secrets.

Official references: https://ai.google.dev/gemini-api/docs/generate-content/speech-generation and https://developers.cloudflare.com/r2/get-started/s3/.

## Recovering safely from a Gemini voice API interruption

The first real narration run (GitHub Actions #43806055627) rendered beats 1–7, then Gemini returned an HTTP error on beat 8 after three short retries. The original job did not preserve its partial audio cache. These changes address that design flaw.

- New Gemini narration requests are spaced at least 10 seconds apart, but cache hits skip requests entirely.
- Retryable HTTP 429/5xx errors use bounded backoff (8, 22 and 45 seconds, or longer when Gemini returns a numeric Retry-After), capped at four attempts.
- The logs show only the HTTP status/category, never the API key or full provider response.
- New jobs save generated WAV segments **even when the render step fails**. The next run with the same lesson source and cache_revision restores those segments using a prefix-matched per-run cache key and generates only the missing narration.
- Keep cache_revision unchanged (normally v1) when retrying. Change it only when you explicitly want to force fresh synthesis of every segment. The cache remains subject to GitHub retention and permission limits.
- A failed run still produces no public MP4 and cannot publish. Gemini API rate/quota/billing settings may need attention for persistent 429 errors. Other failures may be temporary provider overload.

**Security note:** GitHub Actions caches are not private encrypted vaults. Only generated voice segments from publicly authored scripts are cached. API keys are never saved into cache files.
