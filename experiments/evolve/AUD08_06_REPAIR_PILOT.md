# EVOLVE pilot: Gemini Neon AUD08-06 → Hugging Face repair candidate

Gemini Neon's 2026-11-22 reconciliation identified Grade 10 Exercise 8.1 Q5/Q6 currency inconsistency and missing statistical-variance teaching bridge. Report was based on historical repository snapshot; the current target is separately checked in the runner.

Target: site/data/textbook-exercises/g10-ch8-ex8-1-q5-q10-en.js. Allowed changes: six Q5 LaTeX currency labels plus one Q6 prose explanation. Preserve exact textbook questions, math answers, source refs, IDs, Tamil-pending status and all other records.

On push to the isolated experiment branch, GitHub Actions runs a hand-written offline mock and mathematical assertions. This is NOT a real Hugging Face fix. Workflow uses contents:read permissions, writes only to temporary artifacts and never commits, merges or deploys.

The optional single-model trial requires a separately authorized nonzero spending budget and a GitHub Actions secret HF_TOKEN with minimum inference scope. Manual workflow dispatch may require registering workflow on default branch first. Avoid revealing the token in chat or in code. Max 650 output tokens is not a billing cap; use paid inference only with explicit user authorization. The actual model output is subject to strict allowlist checks.

After the model generates a proposed file, ChatGPT reviews math/source fidelity and regression tests, creates a separate fix PR, runs all relevant gates and deploys only if verified. Zero changes in this experiment are currently live.
