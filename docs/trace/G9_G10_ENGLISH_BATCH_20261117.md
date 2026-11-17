# TRACE — Grade 9/10 English-first acceleration (17 November 2026)

This is **read-only, no-spend, no-release** groundwork building on PR #227.
It prioritizes source-checked textbook exercises over narration/video production.
It does not claim the whole Grade 9/10 curriculum is complete.

## Audited source records (do not turn them into invented grade completion)

- Grade 9 source: revised 2025 English, Chapter 1 Exercise 1.2.
  Candidate file records **34 English parts**; 9 Q1/Q2 parts are referenced by
  student-index-loaded JavaScript, so **25 are not yet registered**.
  Stage the 25 in source-verified groups of 10/10/5; preserve IDs and avoid
  loading the generated 34-part staging module as well as the Q1/Q2 modules.
- Grade 10 source: revised 2025 English, Chapter 2 Exercise 2.5.
  Its audit records **21 unique tasks**; all 21 identifiers occur in
  student-index-loaded modules. Five identifiers occur in two modules: Q5,
  Q6, Q9, Q10 and Q11. Inspect overlapping definitions before changing
  either registration pathway. Presence is not proof of source fidelity.
- Historical checkpoint totals are **304 Grade 9 exercise app records**
  and **101 Grade 10 exercise app records**. These snapshots do NOT measure
  current textbook completion and may predate later releases.
- There is **no source-verified whole-grade denominator**. Do not calculate
  grade completion percentage from app records or chapter navigation counts.

## No-cost run

```sh
npm run trace:g9-g10-batch
node site/tools/bulk/test_trace_g9_g10_batch.cjs
npm run test:trace
```

The planner scans only actual `site/index.html` script registrations,
matching known source identities and checking candidate shape/IDs.
It emits nonpublishable review batches for items not registered in the app.
It makes no HTTP requests, writes no source files, invokes no model, and
does not prove that Pages has shipped the committed source. A missing source
or structural mismatch fails closed.

## English-first evidence for the optional paid difficult-item reviewer

- Explicit `sourceMedium: 'en'` means `sourceEvidence.pages` must contain
  the English source page **only**, with book hash and page-image metadata
  matching the 2025 registry. An English review cannot certify Tamil.
- `sourceMedium: 'ta'` analogously requires Tamil-only metadata.
- Omitting `sourceMedium` preserves the strict previous bilingual
  `en,ta` identity requirement. A bilingual record still needs both.
- Source metadata, owner assertions, two agreeing models and exact-math
  checks are **not** substitutes for visually matching original textbook
  pages and student-facing mathematical review.
- Real OpenAI/Gemini API calls remain opt-in behind keys, explicit spend
  approval and a persistent private ledger. This change performs none.

## Required release gates for each 10-part batch

1. Confirm every question/subpart against the actual 2025 English pages;
   verify figure, notation, source edition and question numbering.
2. Independently verify full mathematics and teachable intermediate steps.
   Do not treat agreement of AI models as release approval.
3. Normalize KaTeX/math presentation, confirm minimal student UI and mobile
   readability, preserve existing IDs, and run duplicate registration checks.
4. Run `npm test`, applicable browser and CI checks. Obtain successful
   exact-head PR checks; only then merge and verify live Pages bytes.
5. Keep Tamil/editorial and teacher review deferred, never silently
   promoted to certified or used to block English-only engineering work.

This PR intentionally does **not** publish the 25 unfinished Grade 9
candidates. It creates auditable small batches for the next validation and
integration cycles.
