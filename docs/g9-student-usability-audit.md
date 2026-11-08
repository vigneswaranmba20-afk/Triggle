# Grade 9 Chapters 1–2: child-centred usability audit

The 2025 Tamil Nadu State Board English- and Tamil-medium mathematics PDFs in the owner's connected Google Drive are the curriculum source of truth. This is an automated technical audit plus a human research plan, not a claim that any children have already been tested.

## Run automated checks

Run npm ci, install Playwright Chromium, and run:

    node site/tools/audit_g9_usability.cjs

The GitHub Actions workflow runs on code changes and uploads report.md, results.json, and mobile screenshot evidence. The matrix covers Chapters 1 and 2, both languages and 320, 390, and 1280 CSS-pixel viewports. The tests inspect direct navigation, all four chapter modes, interactive stage counts (7/8), demonstrations, answers, feedback, hints, stage switching, browser errors, overflow, labels, 24px targets, enlarged text, and optional axe-core WCAG 2.2 scans. Advisory findings require manual triage.

## Twelve creative methods (include human evidence where needed)

1. Five-second orientation: show the first screen briefly; ask where the student would tap.
2. Lost-student recovery: open a difficult solution, return to their chapter.
3. Tamil-only journey: no English translation or adult help.
4. Set-symbol detective: distinguish union, intersection, membership, and complement.
5. Predict-before-moving number line: ask where a rational or irrational number falls.
6. Deliberately wrong answer: observe whether feedback helps correct a misconception.
7. One-minute comeback: leave and return; find the same exercise unaided.
8. Paper-to-phone audit: compare wording, figures, and mathematical notation with the textbook.
9. One-screen cognitive load: ask what the single next action should be.
10. Shared-device airplane mode: prefetch, disconnect, and repeat the task.
11. Motor/vision stress: 320px, 200% text, screen reader, keyboard and touch areas.
12. Transfer to paper: put the phone aside and solve a new but equivalent question.

For every pilot task record completion, time, wrong turns, help requested, and the student's own explanation. Classify root causes into navigation, reading/translation, mathematics, interaction, and connectivity. Do not make up comprehension scores.

## AI-assisted quality safeguards

Use generative AI to propose candidate task variations, misconception probes, and screenshot anomaly hypotheses. Tie each to source textbook and the actual interface. Deterministic browser tests and human reviewers are the judge of truth. Do not use self-healing selectors to conceal UI regression. Model-based state journeys and metamorphic tests can complement the browser matrix. Treat model output as a suggestion, never as evidence of a student having understood.

## Human pilot

Seek school/teacher permission and suitable parent or guardian consent and student assent. Recommended exploratory sample: 12–18 Class 9 students across Tamil and English, including students with varied reading confidence and phone access. The pilot number is not a representative sample. Proposed release targets: 90% find Chapter 1 or 2 in under one minute unaided; 80% successfully complete a first interactive action without help; no uncorrected critical mathematical errors; no essential action hidden at 320px; and reliable lessons after successful offline preload. These are planning thresholds, not achieved findings. Collect no identifying information unless approved under an appropriate child-safeguarding process.

Accessibility tests are partial and do not prove WCAG conformance, which requires manual review.
