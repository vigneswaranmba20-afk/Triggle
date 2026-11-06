# Triggle Reference Library — Source Register
Version 0.1 • 6 November 2026 • Maintained reference notes (not a substitute textbook)

This is a maintained **reference workspace for Triggle's authors, reviewers, and coding agents**, not an attempt to republish books. It links verifiable source collections, records their use and restrictions, and points to original Triggle teaching notes.

## Curriculum authority and priority
1. **Tamil Nadu State Board / Samacheer Kalvi mathematics, Grades 9–12 (English and Tamil)**: authoritative for order, chapter boundaries, exercise numbering, medium and expected methods. The definitive live chapter IDs and current statuses are in `site/data/curriculum.js`; textbook edition research is in `docs/phase-0-audit.md`.
2. **NCERT Mathematics Exemplar Problems**: supplementary reasoning, misconception analysis, and independently authored practice; never assume NCERT's chapter numbers correspond to Tamil Nadu's.
3. **NCERT Mathematics Laboratory Manuals and Mathematics Kit Manual**: activities and visual analogies for concepts, used to design original Triggle animations and hands-on explanations.
4. **Tamil Nadu Directorate of Government Examinations papers**: exam-pattern evidence **only if year/medium/examination are recorded**; older papers must not be represented as 2026–27 patterns.
5. **Other books (e.g. R. D. Sharma)**: optional private reading when supplied or lawfully available. No bulk downloading, copying questions or importing copyrighted solutions. Never a prerequisite.

## Public official resource catalogue

| ID | Resource | Official landing page | Scope | Status as of 2026-11-06 | Intended use |
|---|---|---|---|---|---|
| TN-CURRIC | Tamil Nadu State Board mathematics textbooks | https://www.textbookcorp.in/files/PRICELIST.pdf (catalogue **only**; see existing source register for edition-specific locators) | G9–G12, EN/TA | Historic chapter sources now include Grade 12 Tamil SCERT Vol I revised 2020 + Vol II revised 2022; 2026–27 prescribed edition match remains open | Curriculum alignment |
| NCERT-EXEMPLAR | NCERT Exemplar Problems — Mathematics | https://ncert.nic.in/exemplar-problems.php?ln=en | G9–G12 | Official index located; individual units **not yet exhaustively read or crosswalked** | Problem varieties, reasoning |
| NCERT-MATH-LAB | NCERT Laboratory Manuals — Mathematics | https://ncert.nic.in/science-laboratory-manual.php?ln=en | Mathematics activities IX, X, XI, XII | Official index located; no bulk material copied | Visual and activity-based pedagogy |
| NCERT-MATH-KIT | NCERT secondary mathematics-kit manual | https://ncert.nic.in/division/dek/kit-manuals.php?ln=en | IX–X | Official kit/manual index located | Original interactive manipulatives |
| TN-DGE | Tamil Nadu Directorate of Government Examinations | https://dge.tn.gov.in/ | SSLC and HSC papers | Official index located; year-specific latest papers not verified | Exam format and practice |
| TN-SCERT-TEACH | Tamil Nadu SCERT mathematics teachers' handbooks | No verified official, stable G9–G12 handbook URL yet | G9–G12, EN/TA | **Needs source verification or user-supplied copy** | Teaching sequence and local terminology |
| OPTIONAL-RDS | R. D. Sharma mathematics references | No official freely accessible full-book source verified | Secondary and higher secondary | Optional **only**; not ingested | Compare pedagogy without reproducing exercises |

**Access status distinctions:** "Index located" means a legitimate public collection can be found. It does **not** mean each document is already downloaded, transcribed, checked or approved for reuse. Publisher PDF access, legal reuse, exact chapter mapping and edition match must be logged separately.

## Created internal reference files

- [Teaching handbook v0.1](./teaching-handbook.md): original model lessons, worked examples, visual ideas, common mistakes, formative checks and bilingual terminology candidates.
- [41-chapter cross-reference](./chapter-crosswalk.md): source-of-truth current chapter names/IDs plus supplementary teaching lenses.
- [Phase 0 audit](../phase-0-audit.md): prior evidence of textbook source editions, incomplete verification, and 105 preserved questions.
- [Edition and Tamil terminology evidence audit (2026-11-06)](edition-and-tamil-audit-2026-11-06.md): newly verified archived Grade 12 Tamil volumes and precise outstanding 2026–27 approval checks.

## Policy for reading and using sources

Each chapter addition should record: (1) Triggle chapter ID, (2) TN textbook exact volume/medium/edition/page and exercise (when confirmed), (3) any supplementary source and its edition/unit, (4) a summary **in new wording**, (5) a mathematically checked worked example written from scratch, (6) EN/TA terminology review state, (7) diagram/interaction design, (8) solution checks and status.

The content generation workflow is **read source → explain from understanding → independently derive examples → verify results → review terminology → publish**. Do not copy whole chapters, scanned pages, original diagrams, answer keys or large passages; link to official source material instead. Do not claim affiliation or endorsement by NCERT or SCERT.

For exercise fidelity, compare against **the user's prescribed TN volume** and cite page/exercise identifiers internally. If that physical or PDF edition is not accessible, mark the exact exercise mapping `unverified`. Reference-reading permission is not publication permission.

## Missing or unresolved evidence, prioritized

1. **Grade 12 Tamil medium prescribed books, both volumes**, if not already available to the reviewer; the Phase 0 audit has only secondary corroboration for Tamil titles. This is the most consequential present editorial gap.
2. Confirmation that the available Grade 9–12 EN/TA textbook PDFs are **the academic-year 2026–27 prescribed editions**, or record the actual imprint years and explicitly use those.
3. An **official** TN SCERT mathematics teacher handbook / local EN–TA term list, if such a file is accessible.
4. Recent official TN SSLC/HSC mathematics sample papers with their years and mediums, for later exam-mode work.

If materials have been uploaded elsewhere in the project, locate or attach them to the workspace used by the coding agent. This repository does **not** claim to have imported or inspected user-uploaded textbooks in this workspace; the accessible local upload was a Triggle project ZIP, not textbook PDFs. The Grade 12 Tamil research uses publicly available reproductions of Government/SCERT books.

## Phase 2 handoff for coding agents

- Consult this source register and the handbook before writing learning text.
- Keep `site/data/curriculum.js` as the sole runtime chapter metadata authority; don't invent a parallel syllabus.
- New material must pass the existing curriculum schema, site checks, language review and browser tests.
- Never upgrade planned chapters to `published` simply because a reference is listed here.
- The GitHub source files are living notes, not a user-facing book download or evidence that all Grade 9–12 exercises are complete.
