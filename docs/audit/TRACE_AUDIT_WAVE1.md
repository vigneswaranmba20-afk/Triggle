# TRACE Audit Accelerator — Wave 1 execution packet

**Checkpoint:** 2026-11-22, Asia/Kolkata. **Issue:** #339. **Do not alter historical original reports.**

## Authoritative intake and overlap

1. Gemini [Continuous Excellence Audit Ledger](https://docs.google.com/spreadsheets/d/1jWqBgH2k2zQHEe3_JlgUHE2QXMx0d67X0W2RuEt2n6U/edit#gid=0): row-2 audit #14 timestamp 08:43 IST. Audit IDs AUD01-01 through AUD14-06 = 86 distinct items; 40 spreadsheet `Resolved`, 46 spreadsheet `Open`.
2. Historical [AF-09/AF-10R ledger](WEEKEND_AF09_FIX_LOG.md): 46 total, consisting of 44 overlapping AUD01–AUD07 entries and two separate USER-AF09 reports. Code evidence at this checkpoint: 9 `CLOSED_LIVE_VERIFIED`, 34 `FIXED_NOT_LIVE_VERIFIED`, 2 `OPEN_REPRODUCED`, 1 `BLOCKED_SOURCE`.
3. New findings = **AUD08–AUD14, 42 IDs**, all `Open` in the workbook. They are **not** 42 completed fixes or 42 independently reproduced current-main defects. Audit dates and current source commit may differ.
4. The four remaining *older* workbook `Open` entries are **AUD01-04, AUD02-01, AUD04-06, AUD07-01**. The first two have repairs recorded in the historical GitHub ledger but lack full live closure, illustrating why workbook status and repair status must remain distinct.
5. Hence workbook 86 + 2 USER-AF09 = 88 **distinct named findings**, not workbook 86 + historical 46. The user-reported reports are already historically live-verified.

## This PR: reliable screening, not automatic closure

`site/tools/test_audit_wave1_live_browser.cjs` reads the historical 46-row GitHub ledger and requires *exactly* the 34 repaired-but-unverified IDs. The target list is checked for completeness; repeated representative routes are deduplicated. Four GitHub Actions shards then visit public GitHub Pages on English and Tamil 320/390/412px with service workers blocked, assert navigation reaches the expected lesson/reader when applicable, no page exceptions, correct language, no global horizontal overflow and no marked math renderer errors.

It compares a small selection of published core asset hashes against the tested checkout. This **does not** prove all source or curriculum assets match, nor that the site's source content is the current live deployed commit. Captures one viewport screenshot per distinct route (EN 390px) and failure screenshots, plus a per-shard JSON manifest.

**Explicitly forbidden inference:** `PASS` here does *not* change `FIXED_NOT_LIVE_VERIFIED` to `CLOSED_LIVE_VERIFIED`. Each original finding still needs its original trigger/interaction reproduced and independently accepted with the published release SHA. Source citations require original page evidence.

## Parallel lanes (one write owner per shared file)

| Lane | Scope | Acceptance |
|---|---|---|
| A | 34 historically repaired findings; deduplicated production screening in this PR | Full original-bug scenario checks followed by independent human/Neon acceptance before marking closed |
| B | AUD05-04 G10 Trig **concept** SVGs (issue #331), AUD04-06 coordinate labels/citations, AUD07-01 concept coverage gaps; mobile pager follow-up #329 | Separate small branches, true reproduction, regression assertions, exact math |
| C | AUD08–AUD14: 42 open workbook findings | Source-image and changed-since-baseline review, duplicate/obsolete tagging, priority and owner |
| D | `smart-ci.yml` existing conservative tiered pipeline; `browser-shards.yml` already runs four shards | Mandatory math, quality, browser, security, source, bilingual and offline gates; live Pages post-merge verification |

## Work order within the new 42

1. **Math correctness and exam-source fidelity:** AUD13-02 (G9 Coordinate Geometry scalar-vs-vector equations), AUD14-02 (G9 trig 4-figure table method and 2.7907 vs 2.7903 key mismatch), AUD14-03 (missing question wording and MCQ options). Verify the 2025 original page images before modifying wording or answers.
2. **Broken/absent learner pathways:** AUD08-01, AUD11-01, AUD12-01, AUD13-01, AUD14-01. Distinguish missing whole modules (large authoring work) from broken route/loading.
3. **Mobile visual legibility:** AUD08-03/04, AUD10-01/03, AUD11-02, AUD13-03, AUD14-05. Verify at true viewport screenshots, not solely full-page captures.
4. **Tamil parity and citations:** AUD12-04, AUD13-05 and chapter source-page findings. Note existing PR #334 live correction for G10 Ex8.2: do not reimplement closed portion.
5. **Remaining enhancements and pedagogical polish:** independently score and batch by chapter/files touched.

### Release rules

- No concurrent agents editing `site/assets/app.js`, shared navigation CSS or the same exercise source file without a single merge coordinator.
- No changes to exercise IDs, official question data, original frozen audit reports or existing solution math without source-certified reason.
- Record tested SHA, live Pages SHA/assets, screenshots, original bug assertion, test result and independent reviewer per item.
- Incomplete release gates = draft/unmerged; failing screens are triage candidates, not proof of a source defect.
- Prefer small code batches + one required full suite when appropriate, not repeated exhaustive suites for a documentation-only change.

## Execution

The first automated run starts on the Wave 1 draft PR and can later be rerun with `workflow_dispatch` from GitHub Actions. Inspect four artifact manifests, select the cases still requiring detailed reproduction, then update the canonical ledger only after the separate original-bug acceptance.
