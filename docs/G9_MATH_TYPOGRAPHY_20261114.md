# Grade 9 mathematical typography — 14 November 2026

Scope: all 313 student-visible Grade 9 exercise/reference/practice records in nine chapters. Chapter counts: 31, 121, 6, 12, 9, 40, 37, 31, 26. Worked Examples remain archived and excluded. The previous 127 Chapters 2/3 presentation records remain byte-equivalent as objects; 186 records gain presentation annotations. Canonical questions, explanations, answers, IDs, ordering, difficulty, review state and diagram geometry are not changed.

The existing Grade 10 offline KaTeX 0.16.22 renderer and CSS remain the typography standard. `build_g9_math.cjs` compiles explicit source-preserving annotations. Its additional bounded grammar is build-time only; the browser never infers LaTeX from prose or globally replaces DOM text. It preserves already structured objects and retains unsupported prose as escaped text. Source anchors reconstruct the complete original string. The build freshness test makes future Grade 9 exercise additions inherit this pipeline after regeneration. New authors should continue to supply `questionMath`, `steps[].math`, `reasonMath` and `answerMath` directly when appropriate, following the permanent notation standard.

Supported annotations include sets/membership, powers/subscripts, stacked fractions, absolute values, radicals, angles, trigonometric functions, units, probability event labels, statistical sums and bars. Equality chains and independent parameters wrap on separate lines; coordinate pairs stay grouped and adjacent table values retain their original boundaries. English/Tamil final answers are selected before rendering. Exact-string concept annotations and authored interactive formula objects reuse the same renderer. SVG labels opt in through exact authored annotations; original coordinates and shapes stay intact.

Source access: opened both connected Drive 2025 Grade 9 PDFs (English `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`, Tamil `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`). Visually inspected English PDF p.11 and Tamil PDF p.12 for Exercise 1.1 notation. This is a rendering migration, not a new textbook-fidelity certification or Tamil editorial review. Existing pending source/editorial statuses remain pending. No user screenshot was attached to this session; the clean main-branch Grade 10 pages supply the visual reference.

Validation commands:

```sh
node site/tools/build_g9_math.cjs --check
npm test
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
CHROMIUM_PATH=/usr/bin/chromium node site/tools/compare_math_reference_browser.cjs --baseline=/workspace/Triggle-baseline
```

The full Grade 9 sweep checks 313 records × English/Tamil × 320/360/393/430 px: exact formula counts, complete source wording reconstructed from visual fallbacks (including legacy Unicode superscripts), every step, final answers, semantic MathML, renderer errors, glyph clipping, keyboard scrolling and page overflow. Prose-only probability definitions are checked for exact preservation and zero invented formulas. Existing navigation, progress, figures, optional explanations, offline caching and Grade 10 suites remain release gates. Screenshot comparisons assert the requested question ID actually loaded and compare identical Grade 10 questions pixel for pixel against the clean baseline.

Screenshots and machine-readable viewport results are written to ignored `screenshots/g9-typography/`; the new PR workflow uploads them as an artifact. Deployment must be verified separately from a successful commit or PR check.

Release record: [PR #173](https://github.com/vigneswaranmba20-afk/Triggle/pull/173). The PR checks and Pages workflow are the release gates. `screenshots/g9-typography/live-results.json` is written only by the production browser verifier and records the actual tested deployment commit. A source commit alone is not deployment evidence.
