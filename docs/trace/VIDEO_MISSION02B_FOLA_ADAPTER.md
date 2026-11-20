# TRACE Video Factory — Mission 02B: user-approved Fola narration

## Purpose and scope

This PR ports the working Gemini 3.8 Interactions voice adapter from the old Fola preview branch onto the latest tested TRACE factory. The owner reviewed the Grade 10 A.P. preview and approved **Fola's voice and delivery as the narration benchmark** on 20 November 2026. Voice approval is not blanket approval for publication: every lesson still needs independent math, audio timing, phone legibility and answer-sequencing review.

**No network API call, paid generation, Cloudflare R2 upload or student-facing video publication is triggered by merging this adapter.** The provider is used only after an explicit `render --mode gemini` invocation with a configured `GEMINI_API_KEY`.

## Provider behavior

- For the existing `gemini-3.8-flash-tts` Fola implementation, the Interactions API receives the **spoken narration verbatim**. Voice delivery is separate `speech_metadata` and is never read aloud.
- Older model names retain the `generateContent` path and the neutral-English narration policy from Mission 02A; forced Indian-accent instructions are not reintroduced.
- Provider model, voice name, delivery instructions and individual beat transcript are hashed into each WAV cache key. Unchanged audio is reused rather than re-synthesized.
- `--mode existing` accepts separately approved external WAV files. `--mode demo` uses synthetic audio and is always nonpublishable.

## The two flagship concepts

1. A.P. sum: an existing complete nine-beat Fola review MP4 was generated successfully by GitHub Actions run 43989815963 (about 106.7 seconds). The narration style is approved; the final release remains gated on video-specific review.
2. G.P. sum: a prior Fola generation completed seven of nine beats and then hit repeated HTTP 429 errors. The failed GitHub Actions cache-save step means recovering all seven WAVs cannot be assumed. Do **not** assert a completed G.P. MP4 exists.

## Cost and recovery rules

Do not auto-trigger a provider generation. Before a paid rerun, inspect quota/billing, restore independently verified cached WAVs where available, and ensure the same model, delivery, voice and script are used to prevent invalidating useful cache. A fresh run cannot be advertised as free simply because the consumer has Gemini Pro. Stop on persistent 429 errors rather than issuing fresh batches. Work with the offline demo and existing reviewed WAV mode whenever possible.

## Offline regression checks

```bash
python3 site/tools/test_trace_voice_policy.py
python3 site/tools/test_trace_fola_voice.py
python3 site/tools/test_trace_gp_video.py
python3 site/tools/trace_video_factory.py self-test --lesson g10-ch2-ap-sum
python3 site/tools/trace_video_factory.py self-test --lesson g10-ch2-gp-sum
```

The earlier PR #224 is a reference source only. It diverged from current `main` and should not be merged wholesale. Generate reviewed MP4 previews separately, then use the existing hash-checked manual release flow for any eventual R2 publish.
