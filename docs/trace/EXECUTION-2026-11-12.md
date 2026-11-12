# TRACE execution — 12 November 2026

Baseline main: `91c56ddfd556cc6e748c39bbfb7861658170da92`. PR #147 is open, draft, unmerged; its head was `65a6f21258497f9df2370db60945328843366d69`. Its six v0 files were recovered onto a separate main-based branch, retaining historical evidence and extending tooling. The new branch does not merge the older content PRs.

## Selection

Scores below are engineering estimates for this session, not measured educational outcomes.

| Alternative | Expected impact | Defect risk | Build effort | External running cost | Reversibility | Decision |
|---|---|---|---|---|---|---|
| Extend existing runtime/PR reconciliation | High: avoid reauthoring available work | Low with conservative matches | Medium | USD 0 | High | Implemented |
| Offline provider-neutral broker and protection tests | Medium: make later connections testable | Low while mock-only | Medium | USD 0 | High | Implemented |
| Author new official exercise solutions | Potentially high | Source/editorial fidelity unresolved | High | Unknown | Medium | Deferred until original pages/review |
| Run real 60-part pilot | Unknown | Invalid inference without eligible sample/reviewers | High | Unknown | High | NOT_STARTED |
| Add concept animation | Unestablished benefit | Mobile/offline regression exposure | Medium | USD 0 | High | No demonstrated UI defect selected |

## Measured reconciliation

| Measure | v0 evidence scope | New adapter result |
|---|---|---|
| Grade 10 app inventory | Base class file, 20 records | All registered modules, 110 records |
| Historical staging entries | 16 | Same 16; original ZIPs not reopened |
| Staging entries with possible runtime label overlap | 3 reported | 12 by numbered-question match |
| Staging entries overlapping supplied PR work | 6 against #114 | 6 across #106/#112/#114 |
| Open PR metadata inspected | Curated #114 evidence | 35 pinned open PRs; 227 candidate occurrences |
| All-grade runtime inventory | Not established by v0 | 568 records, including 478 exercise records, 46 data modules |
| Strict inherited math-checked app records | Not measured | 48 records / 55 source parts |
| Ledger representations | Not measured | 847 medium/part rows |
| Known missing source parts | No global denominator | 53 in existing Grade 12 Chapter 1 inventory; lower bound |
| Newly accepted unique question-parts | 0 | 0 |
| Whole-project denominator / completion percentage | Unknown | Unknown / not calculated |

The different overlap scopes are not source-equivalence proofs. Whole-question matches do not certify individual subparts. Unmerged PR ancestry remains unmerged; matching file bytes are recorded separately because squash merges can incorporate work without preserving a branch's head as an ancestor. The source/math audit documents on older branches remain visible for further reconciliation.

## Source and cost evidence

Drive search located the twelve matching 2025 PDFs. Raw English Grade 10 PDF fetch returned an authenticated file reference; no page images were inspected or rendered. Source-pages actually checked this run: **0**. No new official question, Tamil editorial certification, figure certification, chapter completion or accepted unique part was produced. Statistics Ex 8.1 Q5's reported EN/TA worker-count mismatch remains unresolved.

The five original WIP ZIPs were not available in the checkout and `G10_W` Drive search returned no files. The committed historical intake snapshot is explicitly labelled as the basis for the 16-item comparison. The repaired base-label snapshot is not a replacement for original source evidence.

Real provider adapters: **0**. Shipped local mock: **1**. Paid/external model requests: **0**. Actual external API spend: **USD 0**. Time/cost per newly accepted part: **unknown**, because no part was accepted. No A/B experiment or acceleration measurement occurred.

## Verification and release

The baseline `npm test` passed through the approved outer execution route; the command sandbox blocked child Node processes with EPERM. The new TRACE suite contains seven Python ZIP tests, six reconciliation test groups and twelve offline broker test groups. It tests runtime identity preservation, actual module attribution, unsafe/unbounded ZIP rejection, grade/nested-part identity handling, pinned PR parsing without execution, source-state isolation, idempotency, cache integrity, missing credentials, spending limits, 429 dates/delays, 5xx, circuit breaking, cancellation, interruption and secret protection.

Full final test outcomes, dependency audit and browser evidence are recorded in `session-checkpoint.json`. Existing exact math tests include the 320 seeded Grade 12 matrix invariant cases and all strict integrated batch verifiers; they do not certify uninspected source pages or new solutions.

No dependency versions changed. The audit reported 20 existing advisories (1 low, 14 moderate, 5 high); this run adds no package dependency and does not broaden into unrelated dependency upgrades. No student-facing source or service-worker files changed. Browser regressions still exercise bilingual navigation, deep links, progress, offline loading and mobile widths; this is regression evidence, not a new UX improvement or comparison study.

The existing shared integration lease was acquired before package/test integration and released using its saved exact owner SHA after shared changes and local verification finished. No grade content lease or content integration was needed. No scheduled task was created, resumed or modified. No background continuation is promised. No merge or Pages deployment is part of this checkpoint.

WebKit initially lacked Linux libraries. Its pinned browser and checksum-verified dependencies from Debian's official index were installed in the test runtime; no repository dependency versions changed. The launcher overwrites `LD_LIBRARY_PATH`, so missing libraries also had to be copied into its own dependency directory without replacing existing files. The final full browser command used `PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1` because Playwright's dlopen heuristic consults the system-only ldconfig cache. An actual WebKit smoke launch and all browser assertions then passed; no test assertions were skipped or modified.

```bash
LD_LIBRARY_PATH=/tmp/triggle-webkit-runtime/usr/lib/x86_64-linux-gnu \
PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 CHROMIUM_PATH=/usr/bin/chromium \
npm run test:browser
```

The standalone WebKit teacher-flow suite passed with the same local runtime. The Grade 9 audit passed **238/238 checks**, zero findings/blockers, with the repository's pinned `@axe-core/playwright@4.11.1` CI checker installed temporarily without modifying manifests/lockfile. Raw usability artifacts are local at `/tmp/triggle-usability-artifacts-20261112`; ordinary browser screenshots are ignored under `screenshots/`. These tests are desktop browser-engine emulation, not physical Android/iOS certification.

## Next task

Reconcile the original W1–W5 archives and the Grade 12 Exercise 1.4 audit on PR #38 against current runtime and original English/Tamil page images before generating anything new. Exercise 1.4 has eight known missing app parts, but prior audited work may be reusable. Renew source/hash evidence and independent Tamil review, then use the existing bulk engine and release gates for one coherent batch.
