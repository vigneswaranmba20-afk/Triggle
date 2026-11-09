# Triggle Grade 9 — content-only bulk ZIP (9 November 2026)

This archive is **a complete editable copy of the GitHub repository** based on `main` commit
`cd4f669da960e34380f97aa8ada7cd19a3e2d0e2`, plus a content-only Grade 9 batch.

## What this batch adds

- **66 new English textbook exercise question entries**, organized into eight groups:
  - Chapter 7 Mensuration: Exercise 7.1 (10), 7.2 (7), 7.3 (9), 7.4 (10) = **36**.
  - Chapter 8 Statistics: Exercise 8.1 (8), 8.2 (6), 8.3 (6), 8.4 (10) = **30**.
- Each question has a textbook-reference field, answer and **at least three original explanatory steps**.
- 37 entries were newly authored using the 2025 English textbook PDF; 29 had been drafted on the prior
  content-only GitHub branch and were incorporated here after mathematical answer-key checks.
- A source figure crop for Mensuration Exercise 7.1 Question 6 is under
  `site/assets/textbook-figures/g9-ch7-ex7-1-q6-reference.png` so Codex can attach it to the
  existing Figure viewer without changing the design.
- The existing JavaScript module registration in `site/index.html` and the offline pre-cache in
  `site/service-worker.js` were extended to include these eight modules. **No CSS, app.js, navigation
  logic or other UI presentation files were changed.**
- A content-only arithmetic and registration test is included:
  `node site/tools/test_g9_bulk_content_only.cjs`.
- Per-exercise provenance/answer records are in `site/data/textbook-fidelity/`.

## Textbook evidence

English source: Tamil Nadu SCERT Standard Nine Mathematics, 2025 revised edition, Google Drive PDF:
`https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view`.
Printed textbook pages = PDF page numbers minus six for these chapters.

**Editorial limitations:** English question content was transcribed/normalized from the PDF text, not independently
certified word-for-word for all exercises. Some source tables and figures still need direct page-image comparison.
Tamil student-facing question text, worked translations, and independent Tamil editorial approval are pending.
This batch completes the **exercise groups** of Chapters 7 and 8, **not all worked examples, projects,
concept lessons, thinking corners, or all nine Grade 9 chapters**.

**Known answer-key discrepancy:** Chapter 8 Exercise 8.1 Q3 has a mathematically exact mean of `1880/33 ≈ 56.9697`,
which rounds to **56.97**, although the textbook key reports **56.96 or approximately 57**.
The exact fraction is retained and the issue should be referred for editorial review instead of silently
changing the calculation.

## Checks performed locally

```
node site/tools/test_g9_bulk_content_only.cjs
node site/tools/validate_curriculum.cjs
node site/tools/check_site.cjs
```

These are content, formula, syntax and static registration checks; **no browser or visual UI test was run**.

## Codex integration workflow

1. **Check current GitHub main before importing.** This ZIP is based on commit `cd4f669...`.
   If Codex or another developer has made later commits, apply the accompanying content-only patch
   to the new main branch instead of overwriting files wholesale.
2. Open `CODEX_GRADE9_CONTENT_QA_PROMPT.md` in this package and run its instructions.
3. Verify source diagrams/tables against the original book where flagged. At minimum, wire the
   Q7.1(6) reference figure into the existing Figure button with no redesign.
4. Check that Grade 9 Chapters 7 and 8 show exercises 7.1–7.4 and 8.1–8.4 in the current navigation,
   in order, with the exact question, answer and steps visible.
5. The existing repository's `test_curriculum_ui.cjs` had a **pre-existing** outdated hard-coded count
   assertion (`125 !== 105`) after the Chapter 9 release. Review the test against the new truthful
   textbook counts; do not suppress unrelated regressions.
6. Only after source/math and Codex UI checks, open PR, merge, and deploy through the repo's existing
   GitHub Actions/Pages workflow. **This ZIP has not been deployed.**

## Files added/changed

New textbook exercise modules: `site/data/textbook-exercises/g9-ch7-ex7-{1,2,3,4}-en.js` and
`site/data/textbook-exercises/g9-ch8-ex8-{1,4}-en.js`, plus the prior staged filenames
`g9-ch8-ex8.2-en.js` and `g9-ch8-ex8.3-en.js` (periods intentionally retained).
Eight corresponding source-fidelity JSON files, one reference figure, the content-only test,
and content report were added. Only `site/index.html` and `site/service-worker.js` were modified.
