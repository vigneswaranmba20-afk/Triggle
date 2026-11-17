# Grade 9 Algebra Exercise 3.2 source audit

The connected Government of Tamil Nadu Grade 9 Mathematics PDFs identify 2025 as the latest revision on PDF p. 2. Both file hashes match the repository’s 2025 textbook manifest. The English exercise and answer appendix were checked visually at 120 dpi. The corresponding Tamil exercise was checked for numbering, mathematical data, and figure parity. Tamil editorial and teacher review are pending. [English textbook](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view) · [Tamil textbook](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

## Inventory and reconciliation

| Number | Labeled subparts | English printed / PDF page | Existing records | Final records |
| --- | --- | --- | ---: | ---: |
| Q1 | (i), (ii), (iii) | 91 / 97 | 0 | 3 |
| Q2 | Standalone question | 91 / 97 | 0 | 1 |
| Q3 | (i), (ii), (iii), (iv), (v), (vi) | 91 / 97 | 0 | 6 |
| Q4 | (i), (ii), (iii), (iv) | 91 / 97 | 1 | 1 |
| Q5 | (i), (ii), (iii), (iv) | 91 / 97 | 0 | 4 |
| Q6 | (i), (ii), (iii), (iv), (v) | 92 / 98 | 0 | 5 |

At baseline `d294ebc150b5`, the bundled Q4 record covered **1 of 6 numbered questions**, **4 of 22 labeled subparts**, and **4 of 23 tasks**. The exercise now has **6 of 6 numbered questions**, **22 of 22 labeled subparts**, and **23 of 23 tasks** across **20 student records**. Q2 contributes one task. Q5(iv) contributes one labeled subpart with two substitutions. The page-image audit corrects the existing Q4 citation from printed p. 92 (PDF p. 98) to printed p. 91 (PDF p. 97). The record ID, English wording, worked equations, answer, and existing progress key are preserved. [Baseline commit](https://github.com/vigneswaranmba20-afk/Triggle/commit/d294ebc150b5acae79bd8f756aa7d40f40b405c5)

The exact prompts, record mappings, PDF hashes, and rendered-page hashes are in the [source fixture](../../../site/data/textbook-fidelity/g9-ch3-ex3-2.json). The English heading follows Examples 3.9 and 3.10 on printed p. 91 and ends before the Remainder Theorem on printed p. 92. The comparable Tamil exercise occupies printed p. 99 (PDF p. 105).

## Independent mathematics

- Q1–Q4 were recalculated by integer substitution, exact radical arithmetic, and linear-equation solving. The results agree with the printed English appendix on p. 310 (PDF p. 316).
- All four Q5 parts were verified by substitution. The appendix skips Q5. The proposed input in Q5(iii) requires a nonzero denominator. Both inputs in Q5(iv) produce zero.
- Q6 uses original vector redrawings of Figs. 3.10–3.14. The rendered curves meet the horizontal axis at **2, 3, 0, 1, 1** distinct points, matching the appendix. Fig. 3.13 is a sideways curve and meets the horizontal axis at the origin. Fig. 3.14 touches the axis at its highest point.
