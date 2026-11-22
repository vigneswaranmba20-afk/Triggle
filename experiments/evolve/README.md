# EVOLVE — Triggle AI Self-Improvement Laboratory (stage 1)

STATUS: Shadow-mode prototype. No production changes, merges, Pages deployment, scheduled jobs, or automatic AI inference.

This harness benchmarks five paraphrased Grade 10 Chapter 7 Exercise 7.1 mathematics calculations, based on existing, independently checked material in:
- docs/curriculum/grade-10/g10-ch7-ex7-1-pilot-passports-20261122.json
- site/tools/test_g10_ch7_ex71_pilot.cjs

The 2025 English/Tamil pages were recorded as checked in the existing pilot; full Tamil authored teaching review remains pending. The benchmark prompts are paraphrases for evaluation and are NOT textbook-exact transcriptions. The arithmetic checker cannot judge explanation quality, diagrams, or source parity.

## Step A — offline / zero model calls

Requires Node.js 22. From repository root:

    node experiments/evolve/evolve.mjs --self-test
    node experiments/evolve/evolve.mjs --demo

Expected: 7 offline assertions pass; all 5 known-correct answers pass, all 5 deliberate mutants fail the numerical oracles. This uses **hand-authored fixtures, not AI output**.

Evaluate a manually saved model candidate:

    node experiments/evolve/evolve.mjs --score my-candidate.json

Candidate JSON shape:

    {"model":"my-model","answers":[{"id":"c10-7-ex7-1-q1","result":{"radius_cm":25,"height_cm":35}}]}

A missing answer scores zero for that question. Numerical correctness never grants release approval.

## Step B — optional, explicitly authorized Hugging Face inference

1. Open https://huggingface.co/ and sign in.
2. Read current fees and account spending controls at https://huggingface.co/docs/inference-providers/pricing. Model inference may cost money; free accounts can have zero included credits.
3. Find a model actually supported by an Inference Provider at https://router.huggingface.co/v1/models. Hub model hosting alone does not guarantee a runnable provider.
4. Create a fine-grained token with Inference Providers permission. Keep the token in your own private Termux session, not in GitHub/ChatGPT/site code.
5. After checking pricing, from Termux run:

    export HF_TOKEN='your-private-token'
    export HF_MODEL='currently-supported-chat-model-id'
    node experiments/evolve/evolve.mjs --hf-once --allow-billing --out /tmp/evolve-hf-candidate.json
    unset HF_TOKEN

The script makes **at most one** inference request; it does NOT guarantee a zero-rupee spend. It never retries automatically, never uses tokens in GitHub Actions, and never edits Triggle. It expects model JSON and can reject invalid responses.

Stage 2 will compare independently generated responses and send anonymized results to Gemini Neon for teaching and reasoning review. We must record prices, token usage, response quality, elapsed time and regressions before declaring a better strategy. Scores do not modify a model's weights.

Hard gates: exact textbook source check, independent mathematics, English/Tamil editorial status, mobile accessibility, security, full existing CI and human approval before any future release.
