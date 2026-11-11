# Grade 12 Chapter 1 Concepts — completion and release

Released and checked on 11 November 2026, 06:04 UTC.

**Live:** https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=12&chapter=g12-ch1&section=concepts&concept=0

**Merged PR:** [#146](https://github.com/vigneswaranmba20-afk/Triggle/pull/146). Production code commit: `6f6b80bf6c3a1eec9119c3e432fa1aeea97272cb`. [Pages deployment 42969718294](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/42969718294) completed successfully. The documentation-only completion commit does not change the published application.

## Completed scenes and coverage

All nine scenes have functioning controls, computed results, a prediction/self-check with specific feedback, optional mathematical reasoning, local state, source-order navigation and deep links. No scene is an empty placeholder.

| Scene | Textbook coverage | Implemented behavior |
| --- | --- | --- |
| Cofactor X-Ray / matrix prerequisites | 1.1; 1.2.1 | Select row/column entry in 2×2 or 3×3; deletion → minor → cofactor signs → animated transpose into adjoint. |
| Undo Machine | 1.2.2 | Apply a transformation, restore with inverse, flatten to determinant zero, demonstrate two inputs merging and reject inversion. |
| Order Matters | 1.2.3 | Apply B then A; undo A then B; reversal and other inverse identities explained with their assumptions. |
| Two Reference Frames | 1.2.4 | Compare passive axes and active point rotation with correct signs and rounded coordinate labels. |
| Secret Message | 1.2.5 | Choose short messages and invertible keys; exact row-vector encode/decode, clearly labelled as a classroom model. |
| Row Workshop | 1.3.1–1.3.2 | Swap by drag or controls, nonzero scaling, row addition, undo/reset, computed echelon/pivot indication and illegal-operation feedback. |
| Independence → Inverse | 1.3.3–1.3.4 | Dependent/independent rows and pivot counts; assisted exact Gauss–Jordan steps for invertible and singular matrices. |
| Intersection Lab | 1.4.1–1.4.3 | Synchronized line equations, graph, AX=B, unique/infinite/no solution; inverse/Cramer/Gaussian selector with validity restrictions. |
| Consistency Scanner | 1.5.1–1.5.2 | Compare ranks, contradictory row, free variables, rectangular case and homogeneous zero/nonzero solutions. |

The English Concepts card now truthfully advertises nine available explorations. The three existing chapter cards remain. Quizzes are not falsely counted from the new scenes. Available Exercises 1.1–1.3 have accurate scene links; unavailable exercise groups are not fabricated. Existing question wording, solutions, IDs, grade/language navigation, progress keys and Grade 10 extraction/checkpoints are unchanged. No Worked Examples page or card was added. Whole-chapter editorial publication flags remain unchanged.

## Sources and mathematics

See [source audit](g12-ch1-concepts-source-audit.md) for the attached chapter PDF, actual connected Drive EN/TA 2025 files, their hashes, inspected page images, printed/PDF offsets and the printed p12 rotation inconsistency. See [implementation plan](g12-ch1-concepts-plan.md) for the full subsection/exercise map and invariants.

All displayed matrix calculations use a separate exact rational core. Rotation coordinates alone are floating point, explicitly rounded to two decimals. Independent deterministic tests check 320 matrices: 234 invertible and 86 singular. These include cofactor signs, adjoint transpose, both adjoint/inverse product orders, independent rank checks via minors, reversal/transpose/scalar identities, row operations, systems/Cramer, Gauss–Jordan, passive/active rotation and cipher round trips.

## Files changed

- Engineering: `docs/g12-ch1-concepts-plan.md`, `docs/g12-ch1-concepts-source-audit.md`, this completion note.
- New self-hosted runtime: `site/assets/matrix-core.js`, `site/assets/matrix-concepts.js`, `site/assets/matrix-concepts.css` (52,488 bytes total, uncompressed).
- Existing integration: `site/assets/chapter-hub.js`, `site/assets/app.js`, `site/assets/discovery.js`, `site/index.html`, `site/service-worker.js`.
- Checks: `site/tools/test_g12_matrix_math.cjs`, `site/tools/test_g12_matrix_concepts_browser.cjs`, `package.json`, existing cache-version assertions in `test_back_to_chapters.cjs` and `test_math_first.cjs`.
- Generated provenance: `site/data/project-status.json`. Only source commit/time and the updated index hash changed; exercise totals and content records are preserved. This also repairs a pre-existing failing baseline check.

## Verification results

- `npm test`: passed, including source fidelity, preserved content, static links/syntax/offline assets and new mathematical invariants.
- `npm run test:browser`: passed in Chromium and WebKit. Existing English/Tamil question readers, navigation, figures, old bookmarks, teacher UI and offline behavior passed alongside the new lesson suite.
- `npm run test:webkit`: passed.
- New acceptance suite: passed at 320, 360, 390, 412, 430 and 1280 px, including a short 360×640 screen, every scene control, wrong-answer feedback, reduced motion, proof dismissal/Escape, browser Back, refresh/state, mapped exercise links, EN/TA routing and offline reload.
- All nine scenes fit without horizontal overflow at 200% root font size on 360×640. Keyboard activation and desktop header clearance were inspected. Static production source requires no framework compilation; repository static checks and the Pages artifact/deployment succeeded.
- GitHub [full validation 42968913990](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/42968913990), including Firestore rules and browser checks: passed. [Grade 9 usability audit 42968914033](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/42968914033): passed. [Unit workflow 42968914056](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/42968914056): passed before merge.
- After merge, `npm run status:check`: passed.
- Actual public URL opened in Chromium at 390 and 1280 px. Verified the nine-scene entry, cofactor/adjoint controls, inverse restoration, singular rejection, existing exercise question/full working/final answer, Tamil switching, existing Grade 9 figure dialog and Home. No JavaScript errors or horizontal overflow occurred. All three served matrix assets matched the committed source byte-for-byte.

Live asset SHA-256 values:

```text
matrix-core.js      91521852c3e7c8a8ea3ad6a9da807a6a695e741f1e81aea65a1b59cfb5581124
matrix-concepts.js  f4898f5dfd40f7fea9633548ab95f0181990172ed0fbdb9e4dd7d4b2b66497bb
matrix-concepts.css 937a3771fad98a02370594c2fbac7c222537b28abda52360921261f9d768d234
```

## Retained artifacts and limits

Local screenshots (not distributed with the public app): `screenshots/g12-cofactor-{360,390,430,1280}.png`, `screenshots/g12-consistency-{360,390,430,1280}.png`, `screenshots/g12-live-cofactor-{390,1280}.png`. Baseline: `/workspace/scratch/g12-before-390.png`; desktop viewport/keyboard inspection: `/workspace/scratch/g12-desktop-viewport.png`. Logs: `/workspace/scratch/triggle-final-unit.log`, `triggle-final-browser.log`, `triggle-final-webkit.log`; live report: `/workspace/scratch/g12-live-verification.json`.

This is the requested English-only release; no complete Tamil lesson translation or independent teacher review is claimed. Browser tests emulate phone sizes and text scaling, not physical Android/iOS devices or a human screen-reader assessment. The 12–18 minute learning path remains a design target, not a measured learning outcome. These are focused teaching demonstrations, not unrestricted matrix calculators; larger textbook systems are explained through the general rank rules and exact math tests rather than a 3D visualization. No known blocking functional issue remains.

Next smallest meaningful item: a teacher/student review of whether Cofactor X-Ray and Undo Machine improve transfer to the existing Exercise 1.1 questions, before expanding optional depth or starting a separately reviewed Tamil workstream.
