# Exercise release recovery — 13 November 2026

[`queue.json`](queue.json) is the persistent, machine-readable **recovery and release assessment**. It is separate from the 41-chapter source-inventory work queue and does not authorize publication. The existing bulk engine remains the publisher. [`schema.json`](schema.json) describes the data; `trace_release_queue.cjs::validate` enforces identity, count, origin and approval safeguards beyond JSON schema.

The baseline is main `6e288869d550493d7dec11dd168cd3e614690b28`. All **35 open PRs** were pinned through connected GitHub metadata; the old reconciliation inspected only `site/data` records, omitting documentation-only Grade 12 drafts. This recovery examines 126 changed JSON/Markdown artifacts, the existing compiler batch, historical archive snapshot, bounded source inventories and chapter gaps. Unparsed artifacts are explicitly retained in `artifacts`; this is a bounded inventory, not an assertion that every historical solution or all-grade textbook denominator is known. Worked Examples are excluded from publication.

| Measure | Actual |
|---|---:|
| Unique location groups located | 491 |
| Authored or partial candidate groups | 222 |
| Source/ID-only groups, separately identified | 269 |
| Exact full-record duplicates already in runtime | 8 |
| Candidates independently math-validated this run | 8 |
| Promoted to READY | 0 |
| Exercises integrated / newly live-verified | 0 / 0 |
| Remaining groups with release blockers | 483 |
| Of those, authored/partial candidates | 214 |

Disposition: 78 NEEDS_REPAIR, 136 NEEDS_REVIEW, 8 DUPLICATE, 269 BLOCKED, 0 READY. A location group is a triage identity, **not a certified source-equivalence claim**. Every original app ID, artifact pointer, PR and commit is retained. Multiple representations of the same location are not counted as new exercises. Only complete record equality establishes DUPLICATE here; normalized text and source-number matches remain explicit review evidence. Existing English/Tamil source claims stay inherited unless revalidated.

The eight exact duplicates are Grade 10 Exercise 2.2 Q1–Q7 and Q9 from PR #130, already released by PR #151. Q8 remains blocked. Runtime inspection now finds **576 source-loaded records, 486 exercise records and 48 modules**, versus 568/478/46 in the old report. The app filters archived Worked Examples before student use; source-loaded totals must not be presented as student-visible question counts.

## Grade 12 Exercise 1.4

All eight existing candidates, Q1(i–iv) and Q2–Q5, pass the existing bulk validator, reviewed-model guards, exact Cramer compiler, independent BigInt Gauss–Jordan critic and question-specific answer/domain checks. The existing suite also exercises 240 seeded systems and rejects changed signs, working, answers, domains and source mappings. No question or solution needed a content change. [`g12-ex1-4-validation.json`](g12-ex1-4-validation.json) binds validation to the current records.

The original English and Tamil Volume I PDFs were reopened through connected Drive, downloaded privately and SHA-256 matched. Seven original page images were inspected: EN PDF 2, 43, 44, 290 (exercise printed 35–36, answers 282); TA PDF 2, 47, 318 (exercise printed 39, answers 310). [Fresh source review](../candidates/g12-ex1-4/source-review-20261113.json) records image hashes and the exact batch hash. Q1(iv)'s **−2/z** and Q5's medium-specific method instruction are preserved. Full Tamil prose review is pending.

English-only records with a visible Tamil-pending notice are supported by `docs/curriculum/SCHEMA.md`, and existing English releases use that format. However, this candidate batch has an explicit release hold in `docs/trace/SPRINT-2-2026-11-12.md`: **“Qualified Tamil and teacher reviews are required before the eight staged records can be released.”** Owner deferral does not complete or waive that requirement. This recovery records English mathematical/source readiness separately, retains the teacher hold, and does not grant professional Tamil or teacher approval. These eight remain NEEDS_REVIEW. No READY candidate exists in this checkpoint.

## Evidence and remaining work

Each queue record contains grade/chapter/exercise/question/part, preserved IDs, pinned authored artifacts and hashes, available original-source evidence, question/solution shape, current mathematical validation, exact/text/location runtime overlap, PR overlap, separate English/Tamil eligibility, blocking reasons and next action. Prose solutions in Markdown are recorded as existing narrative working requiring normalization, not misreported as missing solutions. Partial/ambiguous/source-only work is never promoted by a heading inventory or a claimed historical validation.

For non-compiler candidates, the queue explicitly requires fresh source fidelity and record-bound independent validation; many additionally need bulk schema/standard-solution normalization and legacy overlap reconciliation. Source anomalies and older artifact blockers remain in the linked evidence. W1–W5 original archive reconciliation and professional Tamil/teacher review remain **owner-deferred**, not completed. The real 60-item pilot remains unstarted. No schedules or provider configuration were changed.

The CLI has no publishing, merge, registration or approval action. This recovery-only validator rejects READY/eligible flags: a future promotion implementation must consume real, record-bound release evidence rather than manually toggling a boolean. For an eligible batch, use the existing grade and integration leases, bulk registration, preserved progress/navigation, full source/math/unit/mobile/security/CI gates at the exact head, then Pages and live verification.

Reproduce from the pinned history (PDFs remain outside Git):

```bash
git fetch origin main '+refs/pull/*/head:refs/remotes/pull/*'
npm ci
npm run trace:release-queue
node site/tools/bulk/test_trace_release_queue.cjs
node site/tools/curriculum_bulk.cjs validate docs/trace/candidates/g12-ex1-4/batch.json
node site/tools/bulk/trace_reconcile.cjs --offline --dry-run \
  --prs docs/trace/open-pr-snapshot-20261113.json \
  --intake docs/trace/trace_intake_2026-11-12.json --report /tmp/triggle-current-reconciliation
npm test
npm run test:browser
npm run test:security
npm run test:webkit
```

The full ledger is reproducible instead of duplicating its multi-megabyte historical rows. [`reconciliation.json`](reconciliation.json) stores the refreshed summary, known gaps, validation, collisions and historical staging comparison. [`live-baseline.json`](live-baseline.json) verifies the **existing** student-visible inventory and all 48 module byte hashes against inspected main, checks an existing full solution and Tamil-pending heading at 390px, confirms Worked Examples suppression and the absence of all eight unpublished candidates. It is not new-exercise deployment evidence. The existing [Pages run 43355192423](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/43355192423) succeeded for baseline main.
