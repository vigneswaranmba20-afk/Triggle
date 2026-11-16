# Risk-based Triggle CI policy

Single mandatory PR check: **Triggle quality gate** from .github/workflows/smart-ci.yml.
All legacy specialized workflows are preserved for workflow_dispatch (manual troubleshooting), never automatic duplicate PR or push runs.

| Tier | Scope | Browser requirement |
| --- | --- | --- |
| cosmetic | CSS, icons, spacing, media metadata, cache revision only | Cross-grade mobile Chromium visual smoke |
| ui | Navigation, app views, non-core JS and substantive HTML | Core navigation regression plus mobile Chromium |
| math | Student exercises, concept data, source curriculum | Full mathematical/unit/curriculum validation plus relevant mobile Chromium |
| major | Core app, curriculum index, security, tests, dependencies, workflows, unknown or broad changes | Full unit + security + Chromium regression shards + WebKit |

Unrecognized files, failed diff detection, core JavaScript changes, substantive service-worker edits and changes to the testing model escalate to major. A CSS change plus *only version-string changes* in site/index.html and the service-worker cache key can stay cosmetic. Never infer that substantive HTML or offline-worker logic is cosmetic.

The mandatory **Triggle quality gate** fails on any missing or unsuccessful required job, including security and any full-browser shard. No branch merge is authorized while critical failures remain. Ensure branch protection / rulesets require this single stable status name; old required-check names must be removed from branch protection by a repo administrator if they are currently configured. Without branch protection, a person with merge privileges could still bypass CI; the workflow itself cannot prevent that.

Production publication is a reusable workflow called only from the same quality workflow after a successful main-branch gate. The publish step checks essential source files and confirms the GitHub Pages deployment is live.

Runs on PRs and main pushes are intentional: a direct main push must not bypass source validation. Each run chooses one tier and runs unit tests only once, and complete browser tests are sharded without rerunning unit tests in every shard. Manual dispatch always performs the major suite.

Timing targets are goals, not guarantees: ~2–4 minutes cosmetic checks, 5–10 UI, 8–15 mathematical, 15–30 major. Monitor observed GitHub Actions durations and refine focused checks after real runs.


## Browser setup and sharding optimization (November 16, 2026)

- Keep the existing npm tarball cache from actions/setup-node; always run npm ci with the lockfile. Do not cache node_modules.
- Install only the Chromium headless shell for CI using Playwright's --only-shell. Full Chromium is not used by these headless browser scripts. Retain WebKit on shards 0 and 2, which run test_standard_solutions_browser.cjs and test_katex_browser.cjs respectively; shard 0 also runs the separate WebKit/mobile dock smoke.
- Do not add a Playwright browser-binary Actions cache by default: Playwright's official CI guidance notes that restoring the binary cache can take about as long as downloading browsers, and Linux OS packages still need installing. Reconsider only after measured improvement on this repository.
- Balance all 32 browser scripts using the measured seconds from successful main run [43784590384](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/43784590384), rather than alternating scripts by original index. The command `node site/tools/run_browser_shard.cjs --plan-only` verifies full coverage before CI runs; any new browser script receives a conservative estimated duration and remains scheduled.
- Baseline (browser execution only, seconds): shards 0=304, 1=91, 2=162, 3=206. New estimated allocation: 0≈226 (including the separately run WebKit smoke), 1≈183, 2≈183, 3≈182. These are workload estimates, not completed-run timings or promised speedups. Compare future same-scope CI runs using actual durations. No mathematical, WebKit, security, or offline test has been removed.
