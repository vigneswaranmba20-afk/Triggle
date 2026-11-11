# One standard solution, independent difficulty

Date: 2026-11-11. Branch: `codex/standard-solutions-difficulty`. Baseline: `c15bc7ebc34835b916fcad3ba73b78c42e8c7218`.

## Audit and retained content

The maintained product is a static, offline-capable site in `site/`. `assets/app.js` owns shared Grades 9–12 question rendering, localization, navigation and saved progress. `worked-example-display.js` provides the existing paired layout for Grade 9 Example 2.12. KaTeX and MathML remain locally hosted. Chapter concept labs, diagrams, video player, teacher portal and chapter navigation are independent of explanation switching and remain available.

The audit found Grade 12 Exam/Detailed tabs in `g12-explain-modes.js`, a shared optional Detailed dialog backed by guided/deep scripts, and the standalone Q8 prototype. Fun had already been removed from the active baseline. All additional question explanation controls, dialogs, switch handlers, mode-only styles and live script/cache entries are removed. Historical teaching sources are archived outside `site/`; the preservation validator still enforces the original guided-script hashes there. The old Q8 bookmark redirects to its canonical question, including offline.

All 568 original authored records (388 Grade 9, 110 Grade 10, 16 Grade 11, 54 Grade 12), including their original order, IDs, questions, source references, complete steps, answers and structured notation, are fingerprinted in `standard-solution-preservation.json`. These fingerprints establish preservation, not a new certification of the mathematics. No textbook questions, canonical steps/answers, learning-progress keys or Tamil curriculum text were edited. No new textbook-source inspection or human Tamil review is claimed for this presentation change.

## Difficulty criteria and provenance

`site/data/problem-difficulty.js` holds explicit per-ID structured metadata, independent of presentation. There is no runtime classifier or default for unknown IDs.

- **Easy:** direct definitions, formula application and routine calculations.
- **Medium:** multiple calculations, linked concepts and moderate reasoning.
- **Difficult:** complex reasoning, proof/case analysis, non-obvious connections and multi-stage calculations.

The 54 prior Grade 12 classifications and 34 Real Numbers hard classifications are retained (legacy `hard` displays as Difficult). The ambiguous legacy `standard` bucket was audited into Easy/Medium while preserving the old value as provenance. Other explicit assignments are marked `implementation-audit`, not human-reviewed mathematical certification. Counts: 313 Easy, 156 Medium, 99 Difficult. Repeated routine subparts do not alone make a question Difficult. Existing reviewed assignments are not lowered because they appear routine.

The compact indicator uses English text plus color dots in both interface languages, with `lang="en"`; this avoids generating unreviewed Tamil terminology. It appears only for the currently available authored question. Difficulty has no effect on displayed working. Future questions require explicit metadata review before release.

## Outstanding editorial review

**Grade 12 Chapter 1 Exercise 1.1 Q8 (`g12-ch1-ex1.1-q8`):** canonical working already preserves both valid signs and independently checks both adjoints. The retired prototype additionally shows `C(J)=[[24,20,24],[8,8,8],[4,8,12]]` and its transpose. No mathematical correction absent from the canonical answer was found. An editor should assess whether these intermediate calculations are required for full exam marks. The original solution remains intact and visibly marked “Solution review pending”; the extra working is preserved in the archive rather than silently promoted into verified content.

Existing textbook-exact, Tamil-review and incomplete chapter coverage caveats remain in force. This change does not certify previously unreviewed content. New difficulty assignments can receive human editorial review without changing the solution interface.

## Files changed

- `site/index.html`, `site/assets/app.js`: one Question → Solution → Final Answer path; difficulty and review indicator; remove dialogs and switch state/handlers.
- `site/assets/{app,math-first,quiet-reader,reader-pin}.css`, `chapter-hub.js`: remove unused selector/dialog rules and outdated copy; compact accessible difficulty styling.
- `site/data/problem-difficulty.js`: explicit classifications and provenance; `legacy-content-baseline.json` and validator: preserve archived script hashes; `project-status.json`: regenerate derived input hashes.
- `site/matrix-pilot.html`: compatibility redirect; `site/service-worker.js`: cache v76, remove retired dependencies, retain offline support and cache new metadata. Modified asset URLs are versioned.
- `site/tools/test_standard_solutions{,_browser}.cjs`: preservation of all records, all difficulties, every question in both interfaces, requested widths, navigation, offline and progress checks. Retired mode tests are replaced by standard-solution and redirect acceptance; existing mathematical tests remain enabled, including Q8 ± matrices and archived valid formulas.
- Shared navigation/layout/browser tests: update only expectations for the discontinued UI. `package.json`: run replacement tests. Repository guidance/README and historical research documents: record current direction and discontinued design.

## Verification and deployment

- Full `npm test`: passed locally after implementation, including source fidelity, mathematical verifiers, record preservation and difficulty coverage.
- Chromium and WebKit exhaustive acceptance: all 568 questions in English and Tamil passed, with five widths (320, 360, 390, 412, 1280), keyboard/Previous/Next/Back. Chromium also passed offline metadata/MathML/Tamil, the old Q8 bookmark and saved progress.
- Broad browser regressions passed the 70-scenario curriculum audit, mathematical rendering in both engines, teacher UI/startup, dashboards, exercise navigation, and Q8 redirect. The final combined release run is completing its repeated exhaustive acceptance. A cleanup error affecting a CSS comment was caught by the mobile Home regression and corrected before release.
- `npm run test:security` and `npm run test:webkit`: passed locally. WebKit initially lacked host libraries; official Debian libraries were extracted to `/tmp` with an isolated launcher. No production dependency was added.
- PR, required CI checks, merge, Pages deployment and live browser verification: pending. These are separate release gates. This document records source-time status; final CI, merge, deployment and live verification evidence is maintained in the implementation pull request and release handoff.
