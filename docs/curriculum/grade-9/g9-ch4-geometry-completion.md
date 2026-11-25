# Grade 9 Geometry exercise reconciliation

Base revision: `a61d596417d4436500812a5f5ba35db0a428dac9` (latest main at intake). Release reference: PR #429.

The registered English and Tamil Grade 9 SCERT Mathematics revised 2025 PDFs were opened directly from Drive. Exercise and appendix page images were inspected. The figures and typography on those pages matter for identifying reflex angles, right angles, congruence marks and parts continued on the next page.

| Exercise | English PDF pages | Tamil PDF pages | Numbered questions | Tasks | Existing textbook records |
| --- | --- | --- | ---: | ---: | ---: |
| 4.1 | 149–150 | 160–161 | 5 | 12 | 2 |
| 4.2 | 163–164 | 175–176 | 11 | 14 | 5 |
| 4.3 | 175–176 | 186–187 | 8 | 12 | 4 |
| 4.4 | 179–180 | 190–191 | 9 | 12 | 0 |
| 4.5 | 183 | 194–195 | 8 | 8 | 0 |
| 4.6 | 186–187 | 198–199 | 8 | 8 | 0 |
| 4.7 | 187–189 | 199–201 | 20 | 20 | 0 |
| **Total** | | | **69** | **86** | **11** |

Printed page numbers are six less than the PDF page numbers. Both answer appendices were located (EN printed 314 / PDF 320; TA printed 330 / PDF 336). One canonical task is each separately numbered or lettered subpart, or the whole question when it has no printed subparts. Multiple requested values within one unlettered question remain one task. The appendix's stray “(i)” on 4.2 Q1 and the Tamil exercise page's stray “(iv)” between 4.2 Q8 and Q9 do not create new tasks.

- English Drive ID `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`, SHA-256 `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`.
- Tamil Drive ID `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`, SHA-256 `f1ca8c449f3af848edd7ef844f47ebcf4b7f0c8ef2cb4a8a1ded32687c2e1303`.

## Checkpoints

- Source inventory complete.
- Batch A authoring checkpoint. Exercises 4.1–4.3 now contain 38 canonical records, including the 11 preserved records. Focused structure, KaTeX, asset and source-fidelity checks passed. Full browser and release checks are pending.
- Exercise 4.2 Q5 omits the distinct-intersection condition. A rhombus is a counterexample to the universal claim. The solution gives the corrected theorem and the rhombus case.
- Exercise 4.3 Q5 gives no side-of-centre condition. Both chords can lie on opposite sides (14 cm, as in both keys) or on the same side (2 cm). The solution gives both configurations.
- Batch B authoring checkpoint. Exercise 4.4 contains nine numbered questions and 12 bilingual tasks, with question-specific figures. Focused registration, notation and distance checks passed. Question 8 retains the exact distance √31 m before rounding to the appendix value 5.6 m.
- Batch C authoring checkpoint. Exercises 4.5 and 4.6 add 16 bilingual constructions. A separate coordinate check verified the input lengths and angles and the centroid, orthocentre, circumcentre and incentre invariants. Exercise 4.6 Q7 prints a triangle symbol before ABC = 40° in both editions. The construction preserves the question and explains the angle interpretation. In Q4 the English edition requests the circumcircle and the Tamil edition explicitly requests its centre. The solution constructs both.
- Batch D authoring checkpoint. Exercise 4.7 contains all 20 MCQs. The independently derived answers agree with both appendices. Q5 has duplicate English distractors; the Tamil second distractor uses equality. Option 4 is uniquely correct in either edition.

## Chapter integration

- The 11 existing bilingual records retain their IDs and record hashes. This release adds 58 numbered questions and 75 canonical tasks. The final runtime inventory contains 86 English prompts and solutions and 86 Tamil prompts and solutions.
- The 10 proof or justification tasks are 4.1 Q3(i–vi) and Q4, plus 4.2 Q5, Q6 and Q11. They were checked from corresponding sides and angles, parallel-line and area relations, or a counterexample where a premise is missing. The 16 construction tasks were checked separately for their specified lengths, angles and centre invariants.
- The answer keys for 4.2 Q2 suppress the given 72° and list x alongside the unknown angles. The existing complete solution gives x = 62 and angles 72°, 114°, 108° and 66°. For 4.2 Q9 the English wording “Ratios are equal” is clarified by the Tamil key's explicit 1:1 and by the congruence proof.
- The unconditional statement in 4.2 Q5 is quarantined as a theorem claim. A square has four angle bisectors through one point. The learner-facing diagnostic retains the printed question with the corrected condition and a counterexample. For 4.3 Q5 the answer set covers both chord placements. No exercise task is omitted.
- For 4.7 Q7 the interior-bisector argument uses the chapter's convex quadrilateral configuration. In 4.2 Q7 the annotated sectors distinguish the supplementary angles at intersections in the bridge figure.
- The figures include 62 new SVG assets, including 16 construction starting views, and seven corrected existing SVGs. The Figure dialog draws each construction sequence from the given measurements.
- Independent Tamil editorial certification, teacher approval and equivalence to a later prescribed printing remain pending.
- The generated Grade 9 project inventory records all 69 questions and 86 tasks. Its next Grade 9 reconciliation priority is Chapter 1, Set Language. The runtime contains Exercises 1.1 and 1.2, and the remaining chapter denominator and exact first missing task require source reconciliation.

## Batch E release checkpoint

The focused Chromium suite passed 298 bilingual reader views at 320, 360, 390 and 412 px. It checked all 86 tasks at 390 px, all seven exercise routes at each width, the construction-stage controls, figure and notation bounds, concept links, and offline reload. The existing concept tests also passed for Geometry, Coordinate Geometry and Trigonometry. PR #430 carries the release. GitHub's required quality gate and post-merge Pages verification determine deployment status.
