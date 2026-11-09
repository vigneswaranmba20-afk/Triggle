# CODEX TASK — Triggle Grade 9 content-only ZIP, no UI redesign

I am providing a ZIP based on published GitHub main commit `cd4f669da960e34380f97aa8ada7cd19a3e2d0e2`.
The ZIP contains 66 additional Grade 9 English textbook exercise question entries in Chapters 7 and 8,
plus their mathematical solutions and source references. **Your role is UI integration/verification only.**

First compare the ZIP's content changes with the current GitHub main. If main has progressed, integrate the
content changes into the newer tree; do not roll back recent Chapter 9 or home/navigation fixes.

Do not redesign, rearrange, or restyle the existing UI. Use the current typography, navigation controls,
question-first layout and Figure viewer. Do not introduce extra cards, floating headers or redundant buttons.

Verify that Chapter 7 contains Exercise 7.1 (10 questions), 7.2 (7), 7.3 (9), 7.4 (10),
and Chapter 8 contains Exercise 8.1 (8), 8.2 (6), 8.3 (6), 8.4 (10).
All 66 entries must show their exact textbook question, full final answer and authored step-by-step solution.
Check previous/next and Back to all chapters on mobile and desktop. Ensure the figure reference for Exercise
7.1 Question 6 is visible on the current Figure button and accurately corresponds to the textbook diagram.

Use `node site/tools/test_g9_bulk_content_only.cjs` and `npm run validate` before UI work.
Run the existing browser tests; note that the current main already had a hard-coded content-count failure
`125 !== 105` after Chapter 9. Update stale test expectations only after independently verifying the counts
and preserving the intended invariant. Do not hide genuine breakages.

Check source fidelity for formula typography, hard questions, figures and tables against the provided 2025
English textbook PDF. The batch deliberately marks image checks and Tamil editorial certification pending.
Do not claim Tamil content is complete. Record any book-answer discrepancy, notably Statistics 8.1 Q3.

After checks pass, create/merge the pull request and publish to the established GitHub Pages site.
Report the actual commit SHA, Actions results and live URL. Preserve all other chapters untouched.
