# Hugging Face Pro × Triggle — five-finding independent benchmark review
Date: 2026-11-23 IST
Status: **MODEL CALLS COMPLETE; PROPOSALS UNREVIEWED FOR RELEASE / INDEPENDENT INITIAL TRIAGE RECORDED**
Experimental run: https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45081974231
Source baseline: `8ca60d0aaaae07011017cb9f321713c141a48ba2` (GitHub main, pinned)
Model: `Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock`
Experiment branch: `experiment/evolve-shadow-v1-20261122`

## Measured outcome
- **5/5** attempted model calls returned HTTP success and schema-compliant JSON.
- **6,739** input tokens + **1,009** output tokens = **7,748** metered tokens.
- Model response-reported total inference cost: **USD $0.00161625**, not the conservative $0.00945 pre-call estimate. Hugging Face billing should be the authoritative final total.
- GitHub job duration: **23 s** (23:12:30–23:12:53 UTC); overall workflow **26 s** (23:12:27–23:12:53 UTC).
- **0** model-proposed patches applied; **0** production source writes; **0** deployment actions; **0** automatic retries.
- Short-lived GitHub OIDC → Hugging Face identity check passed; no permanent HF token or public web token.

## Five audit proposals — independent first-pass adjudication

| ID | Model verdict | Reviewer assessment | Disposition |
|---|---|---|---|
| **AUD08-03** Grade 10 Ex 8.1 Q11 | confirmed | **Partially useful.** Source visibly contains malformed `were noted as Find` wording and flattened age/frequency lists. Proposed rewrite is **not cleared** until official 2025 English/Tamil source and 320px rendered table checked. | SOURCE_IMAGE_REQUIRED / preview-only |
| **AUD09-04** Grade 10 Ex 2.7 Q12 | confirmed | **Reject proposed repair.** Raw caret expressions appear in prose and fallback fields, but `questionMath.en` already contains structured LaTeX. Replacing a plain-text accessibility fallback with LaTeX contradicts the repo math standard. Must inspect real rendered prose and fix the correct field only. | REJECT_BAD_PATCH / reproduce UI |
| **AUD09-06** Grade 10 Unit Ex 2 Q1 | needs-source | **Appropriate safety triage.** `q.en` and structured `questionMath.en` omit `is`; source-book exact wording governs any change. | SOURCE_IMAGE_REQUIRED |
| **AUD10-03** Grade 9 Ex 7.4 Q10 | confirmed | **Reject unsupported evidence.** Current source excerpt contains `V_brick` and `V_wall`, **not** `V___brick` or `V___wall`. Triple-underscore display may still be a renderer issue; must reproduce live UI before proposing a code fix. | REJECT_FALSE_CODE_CLAIM / browser reproduction |
| **AUD08-05** Grade 10 Ch 8 references | needs-source | **Appropriate safety triage.** Source metadata includes older 2019/2020 edition locators p300/p309. Replacing them with 2025 page spans must follow 2025 original textbook evidence, preserving historical attribution when appropriate. | SOURCE_IMAGE_REQUIRED |

**Review quality summary:** 2 appropriately cautious triage responses, 1 partially useful diagnosis requiring source proof, 2 flawed repair proposals. This is an editorial assessment, not a statistically meaningful model-accuracy benchmark and not live-fix verification.

## Release decision
**NO-GO for autonomous editing or deployment.** Approved use today: read-only audit triage and draft proposals with independent source/mathematics/browser review. No new audit closure credit. This benchmark does not change workbook statuses.

## Reproducibility and security
- `experiments/evolve/hf_five_audit_benchmark.mjs` uses five pinned source snippets and one fixed model/provider.
- `.github/workflows/evolve-audit-repair.yml` permits metered inference only on a unique, exact approval commit, on a single allowlisted experiment branch, with an `evolve-hf-lab` environment and `contents: read` + `id-token: write` only.
- A 60-minute-or-shorter OIDC exchanged token stays within the job and is never stored.
- Pricing checked before calling; $0.05 **estimated** total guard (not a hard bill stop); 650 maximum generation tokens/case; no retry.
- The archive `evolve-hf-pro-five-audit-proposals` contains raw outputs and returned provider token usage for independent review, kept for 7 days.

## Next controlled experiment
Add deterministic evidence-grounding checks and tests for fabricated source substrings, preserve fallback/plain-accessibility fields, and require actual textbook-page + real rendered browser evidence before a candidate patch can be considered. Then repeat only the two flawed cases after improving prompt context (and separately track their costs); no automatic deployment.
