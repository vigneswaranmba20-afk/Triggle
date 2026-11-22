# One approved metered Hugging Face call — Neon's AUD08-06

User approved one metered request on 2026-11-22. Model pinned to Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock, only on experiment/evolve-shadow-v1-20261122.

Execution requires push commit message exact: `EVOLVE_ONE_CALL_APPROVED_20261122_QWEN3_CODER`. Re-runs are rejected by `GITHUB_RUN_ATTEMPT==1` guard. The model receives only the existing public Q5/Q6 exercise data and a constrained fix request. All GitHub runner permissions are `contents:read` and OIDC `id-token:write`; no HF permanent secret or GitHub write key is given to the model. The workflow writes patch and JSON evidence only to runner temporary files and GitHub artifacts. Any response that violates allowlist is rejected.

Precall verification queries the public HF router for model/provider live status and advertised token rates, aborts if estimated conservative input + 650 output exceeds US$0.01. This is a *budget estimate*, not a billing guarantee. No automatic retries. Any failed request consumes this one authorization; do not rerun without new user approval.

No production deployment or merge. Independently review source/math/test results before a new release PR.
