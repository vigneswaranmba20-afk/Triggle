# Triggle EVOLVE: tokenless GitHub -> Hugging Face OIDC

Status 2026-11-22: authentication-only workflow staged; **no inference enabled, no HF personal token required**. The existing --infer-once runner is not called by this workflow. No merges or deployments.

## Required one-time user configuration

1. In Hugging Face visit https://huggingface.co/settings/authentication#ci-cd-access; add **Account CI/CD identity** (NOT a model-repo Trusted Publisher). Provider: GitHub Actions.
2. Claim repository: `vigneswaranmba20-afk/Triggle`.
3. Claim branch: `experiment/evolve-shadow-v1-20261122`.
4. Claim workflow: `evolve-audit-repair.yml`.
5. Tick **Allow Inference Providers calls** for later one-call trial. This adds only `inference-api` and `gated-repos`, not Hugging Face repository write. Even though inference permission exists, the authentication-only probe never calls the model.
6. Configure the GitHub environment `evolve-hf-lab` in repo Settings -> Environments: Selected branches -> exactly experiment/evolve-shadow-v1-20261122. No personal HF token secret needed.
7. In GitHub repository Settings -> Secrets and variables -> Actions -> Variables, add `EVOLVE_HF_USERNAME` = the *actual Hugging Face account username* which owns the CI/CD identity (not a token). This is public/nonsecret configuration.
8. Ask ChatGPT to trigger the branch-only authentication test after these steps. It will touch only the experiment branch and inspect GitHub Actions output.

## Validation

- Github workflow OIDC job has `id-token:write` and `contents:read`, but no GitHub contents write.
- Job confirms GitHub repository + branch + workflow and push event; mints OIDC audience https://huggingface.co, exchanges via https://huggingface.co/oauth/token.
- No HF credentials, GitHub JWT, generated token or complete exchange response are printed, saved or uploaded.
- No hosted model is invoked and there are no inference charges.
- Any future inference call requires an explicit separate budget approval and a reviewed workflow change; existing secret-based invocation removed.

## Notes

- GitHub workflow_dispatch is only available if workflow is on the default branch; the *branch-only* probe uses the push event instead, which is safe because it performs no paid inference.
- User's existing HF token should remain private and unused by this workflow.
- Official spec: https://huggingface.co/docs/hub/trusted-publishers
- Actual paid inference will be separately authorized and returns patch artifacts only. ChatGPT performs academic checks, tests and final deployment.
