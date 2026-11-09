# Grade 9 content-only sprint — 9 November 2026

## Today's user instruction
Fill mathematics content first. Do **not** spend time inspecting or redesigning the UI, running browser/Playwright tests, or deploying incomplete chapters. Preserve lightweight arithmetic and source checks. Run the comprehensive UI and deployment checks as a consolidated end-of-day release gate.

## Source and workflow
- Use the user-connected revised **2025** Grade 9 English PDF ID `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J` and Tamil PDF ID `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`.
- Source text can be extracted in bulk. **Never certify text-layer extraction as visually exact** for formulas, geometry figures, tables or spinner diagrams. Mark them pending.
- There are **60 exercise groups** over nine chapters. For each group: inventory every Q and subpart; store exact source wording and page record; author numbered solution steps; reconcile with source answer key; make a minimal content-only assertion; continue to next group.
- Work chapter-parallel only if independent sessions are available; avoid simultaneous writes to the same files. Prioritize English 2025, then bilingual Tamil with source checks. Never write automatic English placeholders as genuine Tamil.
- No UI modifications; no new libraries; no visual redesign. Do not modify existing question IDs.

## Reused and new content in this branch
- **Reused from open PR #80:** Exercise 9.2 Q1–Q4 English text-layer drafts and solutions. These were not yet merged into main.
- **Added here:** Exercise 9.2 Q5 (table and three subparts), and Exercise 9.3 Q1–Q10 (all multiple-choice questions with explanations), checked against textbook printed EN pp. 302–303, PDF pp. 308–309; Tamil printed pp. 319–320, PDF pp. 335–336.
- The English answer key agrees with the new answers: Exercise 9.2 Q5 (i) 1/6, (ii) 43/75, (iii) 1/75; 9.3 choices 4,2,1,4,1,4,4,4,1,2.
- **Ambiguity found:** Exercise 9.2 Q5 part (ii) "Part time maids" could imply 860+250 families, but the printed answer key 43/75 corresponds to **only part-time** 860. Record this and explain it instead of hiding the ambiguity.
- The Q5 table and Q6 complement glyph require final source page-image inspection. Tamil student-facing translations pending. These are staged content drafts, **not published chapters**.

## Final consolidated release gate (do not run during content sprint)
1. Inspect original page images, compare English/Tamil literal text and exact notation, flag figure gaps.
2. Run source/mathematical regressions, then `npm test` and `npm run test:browser` once at release stage, fix failures.
3. Add final import tags in `site/index.html`, offline cache registration and version bump; merge and deploy only after all hard gates pass.
4. Verify actual production website and chapter links; avoid claiming 9th grade complete while any group or subpart remains pending.

## Content-only developer check
`node site/tools/test_g9_ch9_content_only.cjs`

## 14:08 IST Grade 9 bulk increment — Exercise 1.2 Q4–Q6
- Added 11 new English source-text-layer entries: Q4(i–iv), Q5(i–iii), Q6(i–iv), printed p.12 (PDF-page and image verification pending). Original question stems and subpart text are recorded; no figure dependencies for these entries.
- Content files: `site/data/g9-ex1-2-q4-content-only.json`, `...q5...`, `...q6...`. Each has three explanation steps, answer, math-check description, edition, source Drive ID, and pending Tamil and visual-review flags.
- Added executable Node test `site/tools/test_g9_ex1_2_q4_q6_content_only.cjs`; test file committed but its Node execution and CI not confirmed this turn. Connector-side JavaScript assertions for basic cardinality and intersection passed; schema and 11-ID uniqueness checked before writing.
- All new entries remain staged, unregistered in live UI, unmerged, undeployed; no claim of page-image fidelity or Tamil review.
- Next: Exercise 1.2 Q7 (nested set; preserve distinction between a and {a,b}), then Q8(i–iv) power sets; check source and add tests. Also revisit Q1(iii) fraction visual ambiguity.
