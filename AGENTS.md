# AI coding-agent guidance for Triggle

## Mandatory execution workflow for every Triggle content or UI task

**Read and follow [the reusable Triggle master development prompt](docs/TRIGGLE_MASTER_PROMPT.md) before editing, testing, or deploying.** Its Google Drive 2025 textbook-first verification, single standard solution with independent difficulty metadata, useful question-specific figure icons, batch testing, and live deployment gates are mandatory. A repository clone does not contain the user's PDFs: use the connected Drive app to open them, and report an access blocker instead of pretending to have read them.

**For the Grade 9 Set Language exact-question and navigation repair**, also follow [the dedicated reusable master prompt](docs/G9_TEXTBOOK_FIDELITY_REPAIR_MASTER_PROMPT.md) and [the source gap register](docs/G9_CH1_2025_SOURCE_GAP_REGISTER.md). Preserve exact textbook questions from the user's connected PDFs. Do not mislabel reworded questions as exact. New official questions require a verified English/Tamil page-image evidence record, preserved IDs and a passing source-to-browser comparison test. Independently authored explanations and original Venn diagrams are permitted.

**Current product direction (2026-11-11):** one canonical exam solution per question; no Exam/Detailed/Fun selector or optional Detailed dialog. **No student-facing Worked Examples sections or example questions in any grade (9–12).** Preserve the authored example records in source archives for provenance, but do not expose them through chapter menus, search, navigation or new content batches. Only Exercises and Unit Exercises should open textbook questions with full standard step-by-step working. Preserve all required working. See [the implementation audit](docs/STANDARD_SOLUTIONS_2026-11-11.md) and [difficulty metadata](site/data/problem-difficulty.js).

This file tells coding agents (including Codex) where to find **maintained educational reference notes** before adding or revising mathematics content.

## Phase 2 education-first implementation

Read [the Phase 2 learning lab research and quality gates](docs/phase2-learning-lab-strategy.md) before adding new libraries, hosted AI, animations or curricular modules.

- Keep Triggle's existing design and the legacy question IDs. The first interactive pilot lives in `site/assets/phase2-lab.js` and is intentionally **not** full chapter completion.
- Default to original, self-hosted, offline-capable, mobile-accessible code; do not expose hosted AI keys in public GitHub Pages. Free and accessible means no mandatory subscriptions, videos or account creation.
- For medium/hard mathematics, use authored reasoning, graphical/abstract connections, a checked worked solution, a verification step and an off-screen transfer problem.
- Distinguish textbook-evidenced terminology from professionally reviewed whole-lesson bilingual content. No premature `published` or `verified` flags.
- For superscripts, fractions and bracket grouping test `site/assets/math-notation.js`, including powers that must sit outside and above the **closing** square bracket.

## Before editing Grades 9–12 mathematics content

1. Read `docs/reference-library/README.md` (source register, verified links, limitations, permissions).
2. Read `docs/reference-library/2025-upload-audit.md` and `docs/reference-library/2025-user-textbook-manifest.json` for verified **2025 revisions** in the user's twelve uploaded books, covering every one of the 41 English/Tamil chapter pairs. The PDFs themselves are not committed to GitHub; do not pretend a repository clone can read them.
3. Read `docs/reference-library/edition-and-tamil-audit-2026-11-06.md` for verified historic Grade 12 Tamil source volumes, printed-page locators and unresolved 2026–27 prescribed-edition comparison.
4. Read `docs/reference-library/teaching-handbook.md` (original examples, bilingual glossary candidates, misconception/visual-learning patterns).
5. Read `docs/reference-library/chapter-crosswalk.md` and `docs/phase-0-audit.md` (all 41 authoritative current IDs, chapter status and unresolved TN textbook evidence).
6. Read `site/data/curriculum.js`, schema and relevant `site/data/class-*.js` before altering the app.
7. Treat the **user's prescribed Tamil Nadu State Board textbook edition** as the final authority for scope/exercise numbering; NCERT and other references are supplementary, not an alternative syllabus.
8. Never claim the stored reference *links* mean those PDFs were downloaded or reviewed. For unavailable source material, mark exercise/page/medium verification pending.
9. Write original explanatory text, original examples and original diagrams; do not ingest or republish copyrighted pages/exercises/answer keys from third-party texts.
10. Keep Tamil translations `pending` until reviewed against prescribed Tamil medium books. Keep the preserved legacy questions and progress/storage keys untouched.
11. Run `npm test` and `npm run test:browser` and review English/Tamil UI before requesting a merge or publication. Do not mark chapters complete just because the chapter name appears in the register.

## Deployment and file hygiene

- The maintained site source is `site/`; the historical ZIP files are not working source.
- The repository root `index.html` is a redirect for deployments that serve the repo root; do not restore an obsolete app there.
- Educational documents live in `docs/`. Do not attach copyrighted PDFs unless redistribution rights are clear.
- New public content requires precise source provenance, accessible visual fallback, mathematical checks, and Tamil review.

The handbook is a *living internal working book*, not certification that Grade 9–12 lessons are complete.

**All 2025 textbooks are now represented by direct user-uploaded edition-imprint and contents evidence.** Older Grade 12 Tamil archives remain supplementary historical provenance. Never mark any `terminology.ta` as `verified` or claim 2026–27 edition parity without comparing the prescribed textbook and reviewing complete lesson wording. Two-language source links alone are not full translation review.

**2025 upload update (2026-11-06):** The complete 12-book 2025 PDF audit supersedes older "only ZIP accessible" and "two Tamil books missing" statements. The 2025 revision is confirmed from imprints, but equivalence to 2026–27 prescribed printings and full bilingual lesson accuracy are **not** certified. Avoid changing sourceRefs to an older-edition PDF while claiming the destination is a 2025 file.
