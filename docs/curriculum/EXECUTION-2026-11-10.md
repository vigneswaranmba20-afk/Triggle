# First execution: universal curriculum engine

Baseline: `85bd47be82451f356e0e5a64d9fb95bdbe50cd5d`, latest remote main at audit and pre-release refresh. All 41 chapters were catalogued against the runtime; this is not a claim that all textbook exercises were inventoried. Twelve matching owner Drive PDFs were located. Grades 11–12 retain separate volume references and require source inspection before production.

| Grade | Source inventory reconciled | Evidence-backed numbered questions | Total app records | Tamil coverage | Blockers | Next batch |
|---|---|---:|---:|---|---|---|
| 9 | No full chapter; inherited Ex 1.1/9.1 evidence | 14 inherited | 388 | Pending full review | Full denominators unknown; overlapping drafts | Chapter 1 Ex 1.2 reconciliation |
| 10 | Chapter 1; Chapter 2 Ex 2.1 | 69 inherited + 10 new | 104 | Chapter 1 has 12 drafted Tamil records; pilot English-only | Remaining Chapter 2 inventory and Tamil review | Ex 2.2 |
| 11 | No full chapter on main | Not established | 16 | Pending | Reconcile unpublished PR #40 and original pages | Chapter 1 earliest incomplete exercise |
| 12 | No full chapter on main | Not established | 16 | Pending | Reconcile unpublished PR #38 and original pages | Chapter 1 earliest incomplete exercise |

Inherited evidence is explicitly distinguished from fresh source review in each checkpoint. No full-grade percentage is calculated. The Grade 9 inherited evidence covers 38 records/42 tasks. The Grade 10 reference remains 69 numbered questions/74 records, not a target count for other chapters.

## Pilot and mathematics

Completed Grade 10 Chapter 2 Exercise 2.1: ten numbered questions, ten new app records, thirteen mathematical tasks, including all four Q6 subparts. English printed pp42–43 / PDF pp48–49, Tamil counterpart printed p43 / PDF p49, both imprints on PDF p2, and English answer key printed p336 / PDF p342 were visually checked. PDF hashes match the prior supplied-book register. No compulsory figures, tables, graphs or MCQs occur in this exercise. Tamil publication remains pending; the source counterpart's Q5 scope differs from the English wording and was not silently translated.

The independent verifier checks every displayed Euclidean division and valid remainder, recalculates HCFs by trial divisors, verifies the Bézout substitution, derives remainder identities for arbitrary integer quotients, and checks exact polynomial parity identities with reviewed general proofs. Ten records/thirteen tasks pass. Mutation tests reject wrong answers, changed proofs, stale evidence, missing subparts and incomplete sources.

All five Grade 10 Chapter 1 reference file hashes remain identical to the audit. Its original seven exercise groups, three figures, 74 records and IDs are preserved. No existing grade content or UI layout was edited.

## Implementation

- `site/tools/curriculum_bulk.cjs`: candidate extraction, runtime inventory, schema/source/math/subpart/figure gates, collection ownership checks, additive registration, guarded corrections, cumulative chapter reconciliation, machine reports and atomic grade checkpoints.
- `site/tools/bulk/remote_lease.cjs`: local/common-directory and atomic remote grade/integration coordination; persistent owner acquisition, compare-and-swap release and no automatic stale-lease theft.
- `site/tools/bulk/verify_g10_ch2_ex2_1.cjs`: actual pilot mathematics and reviewed record digests.
- `site/tools/test_curriculum_bulk.cjs`, `site/tools/bulk/test_remote_lease.cjs`, `site/tools/test_curriculum_bulk_browser.cjs`: failure cases, two-clone lease exclusion, reference preservation and source-to-browser/offline acceptance.
- `docs/curriculum/`: source register, baseline audit/open-PR conflict review, schema/workflow, independent grade checkpoints, the authoring batch and its validation report, four task prompts and verified migration evidence.
- `site/data/textbook-exercises/g10-ch2-ex2-1-en.js` and fidelity index: generated compatible module and source-evidence locator.
- `site/index.html`, `site/service-worker.js`, `package.json`: loading/navigation integration, offline registration/cache update and required test wiring.
- `site/tools/test_curriculum_ui.cjs`: select the same 105 immutable legacy IDs directly rather than excluding every new content prefix. All original route assertions remain.

No textbook PDFs, historical ZIP changes, UI redesign or additional content-generation schedule were committed. Standalone deterministic tools assist authors; saved task prompts do not provision AI runners or credentials.

## Schedules and release evidence

Exactly four existing ChatGPT tasks were updated through the supported scheduler and individually read back. Prompt hashes match the committed prompt files. IDs, titles, enabled states, exact hourly schedules and `Asia/Kolkata` remain unchanged: Grade 9 :00, Grade 11 :15, Grade 10 :30, Grade 12 :45. No duplicates or unrelated task changes. No schedule-related owner action remains pending. Future inherited execution environments/source access/credentials must still be checked by the scheduled run; their metadata was unspecified.

Baseline `npm test` and `npm run test:browser` passed. The integrated pilot browser acceptance, full release `npm test`, full release `npm run test:browser`, and focused engine/remote-lease tests passed. Full release results, PR/commit and deployment evidence are recorded in the per-grade checkpoints after the release gates complete; source, CI, merge, Pages publishing and live verification are separate facts.

Release candidate: commit `c1aafea64c1b3fe70d00f1b7efba493beaa33f6f`, [PR #119](https://github.com/vigneswaranmba20-afk/Triggle/pull/119). Required remote CI, merge and Pages/live verification are pending at this checkpoint.
