# EVOLVE HF Pro — evidence-grounded two-case repeat (23 November 2026 IST)

## Decision
**NO-GO for autonomous repairs or production deployment.** The Hugging Face two-case follow-up ran successfully, but neither response passed the independent proposal-safety gate. No code changes were applied to the student app.

## Reproducible trial
- **Prior trial:** https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45081974231
- **Evidence-grounded rerun:** https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45082848307
- **Independent post-rerun zero-cost regression checks:** https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45082938913
- **Source commit in both:** `8ca60d0aaaae07011017cb9f321713c141a48ba2`.
- **Same model/provider:** `Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock`.
- **Audit IDs:** AUD09-04 (Grade 10 Exercise 2.7 Q12) and AUD10-03 (Grade 9 Exercise 7.4 Q10).
- **Baseline artifacts:** `evolve-hf-pro-five-audit-proposals` from 45081974231.
- **Rerun artifacts:** `evolve-hf-two-case-grounded-rerun` from 45082848307.
- **Rerun model usage:** 1,378 prompt tokens, 547 completion tokens; 1,925 tokens total; provider response reported **USD $0.00053490**. The earlier same-two-case model calls cost **USD $0.00067815** (2,645 input, 469 output tokens). Rerun cost was approximately 21.1% lower, but the requests used different prompt lengths and generation sizes; this is not a statistically meaningful cost benchmark.
- Rerun workflow: completed successfully in **20 seconds** (23:21:48–23:22:08 UTC). Two inference responses arrived; upload, secretless OIDC, pinned checkout and no-write checks passed.
- **0 source writes, 0 fixes applied, 0 merges, 0 production deployments, 0 model-call retries.** GitHub `main` remained at the pinned commit during the trial.

## Accuracy comparison

| Audit | Original model answer | Evidence-grounded rerun | Independent disposition |
|---|---|---|---|
| **AUD09-04** | Identified the plain-text `questionMath.en[5].fallback` field, then incorrectly proposed replacing its ASCII fallback with LaTeX. | Quoted real source fields, picked `steps[2].en` as a proposed target, but **did not quote that field** as evidence and still suggested the fallback should imitate KaTeX. | **Rejected again**: missing direct target-field evidence and residual fallback-formatting misconception. Math-source fidelity unchanged. |
| **AUD10-03** | Falsely claimed the current JS source contained `V___brick` and `V___wall`, although it actually had `V_brick` and `V_wall`. | Correctly quoted `V_brick` from `steps[1].eq`, explicitly said `V___brick` was absent, and proposed **no edit**, but misclassified the finding as a confirmed `source-issue` rather than `needs-browser`. | **Rejected again** under verdict consistency; a real screenshot/rendering reproduction is still needed. Source honesty improved. |

**Comparison:** Strict safe-action acceptance **0/2 → 0/2**. Accurate, field-grounded source quoting and denial of nonexistent tokens improved (especially AUD10-03), but the model still cannot be trusted to infer actionable root cause without additional code-render or live-browser evidence. These results must not be recorded as closed findings.

## Automatic gates added

`experiments/evolve/hf_two_case_evidence_policy.mjs` and companion `...test.mjs`:
1. Parse the exact textbook record from the immutable checkout rather than trusting long excerpts.
2. Compute SHA-256 for the source file; pin the repository commit.
3. Supply structured field-value pairs for the affected question, solution prose, equation, KaTeX, and accessible fallback.
4. Require exact literal quotes from named source fields and match their text byte-for-byte.
5. Independently verify whether reported literals actually occur in the record; a source-absence report cannot be labeled a confirmed source defect.
6. Reject evidence from unknown paths or mismatched fields, and require target-field support.
7. Protect accessibility fallbacks from being replaced with LaTeX or mistaken for broken renderers.
8. Reject unearned claims of deployment, test passes or live verification; record all responses as `proposal-only`.
9. Preserve explicit conservative `no edit` recommendations for findings that genuinely need browser evidence.

**Regression development:** Initial preflight correctly failed when the evidence extractor targeted the wrong `questionMath` array index; it was corrected to index 5 before inference. The stronger post-rerun guard additionally catches suggestive fallback-rewrite language inside the rationale, not only proposed actions, and permits explicit `no edit` when verdict and evidence agree.

## What this experiment establishes
- Model-assisted **triage** can be useful at negligible inference cost.
- Model-generated edits are not automatically safe, even when output is valid JSON and citations look plausible.
- The source data alone cannot establish whether a MathML/KaTeX rendering artefact occurred in a production browser.
- The next *unmetered* technical step is to attach real rendered screenshots/DOM observations to the same source-evidence packet, while retaining a separate reviewer for math and textbook accuracy.
- **Do not automatically run more inference or deploy any changes** from this trial.
