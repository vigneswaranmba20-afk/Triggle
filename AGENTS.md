# AI coding-agent guidance for Triggle

This file tells coding agents (including Codex) where to find **maintained educational reference notes** before adding or revising mathematics content.

## Before editing Grades 9–12 mathematics content

1. Read `docs/reference-library/README.md` (source register, verified links, limitations, permissions).
2. Read `docs/reference-library/2025-upload-audit.md` and `docs/reference-library/2025-user-textbook-manifest.json` for verified **2025 revisions** in the user's ten uploaded books. Two 2025 Tamil books are not visible here (Grade 9 and Grade 12 Volume I). The PDFs themselves are not committed to GitHub; do not pretend a repository clone can read them.
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

**Current archive evidence does not close the editorial gate:** Grade 12 Tamil chapter names are now anchored in archived SCERT books (Volume I rev. 2020; Volume II rev. 2022). Never mark any `terminology.ta` as `verified` or claim 2026–27 edition parity without comparing the prescribed textbook and reviewing complete lesson wording. Two-language source links alone are not full translation review.

**2025 upload update (2026-11-06):** The new 2025 PDF audit supersedes older "only ZIP accessible" statements. The 2025 revision is confirmed from imprints, but equivalence to 2026–27 prescribed printings and full bilingual lesson accuracy are **not** certified. Avoid changing sourceRefs to an older-edition PDF while claiming the destination is a 2025 file.
