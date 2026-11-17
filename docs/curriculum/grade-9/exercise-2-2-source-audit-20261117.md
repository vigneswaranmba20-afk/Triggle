# Grade 9 Chapter 2 — Exercise 2.2 source-image and independent math audit (2026-11-17)

## Source and visual provenance
- **Edition:** Tamil Nadu SCERT Standard Nine Mathematics, revised 2025 (the same connected PDF used for Exercise 2.1).
- **Exact PDF:** [Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view); SHA-256 `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`.
- **Visual checks:** rendered source PDF pp. 57–58 (printed pp. 51–52) and the answer appendix PDF p. 314 (printed p. 308) at 144 DPI; inspected the recurring-digit bars at higher magnification. Render PNG SHA-256s: p.57 `423f3d1696d4cf6f7df6cad21d52260e71a27757563ac7abf44cf5a375dc50c6`; p.58 `d264cfa716702b2714bd8224354c856daf51bea1e9c4f1c9540b3f8cd1f851cc`; appendix `e5ba187226eb82dced62b8cf62ff8f129b0bf459a3546ec7c36d66f04ec9f814`.
- **Scope:** English source and answer verification; Tamil editorial review deferred. No API billing.

## Exhaustive source inventory and independent verification

| ID suffix | 2025 textbook input | Source answer / equivalent verified app answer | Exact check |
|---|---|---|---|
| Q1(i) | 2/7 | 0.(285714), recurring | 2/7; period 6 |
| Q1(ii) | −5 3/11 | −5.(27), recurring | −58/11; period 2 |
| Q1(iii) | 22/3 | 7.(3), recurring | 22/3; period 1 |
| Q1(iv) | 327/200 | 1.635, terminating | 327/200 |
| Q2 | 1/13 | 0.(076923), period 6 | leading zero is part of period |
| Q3 | 1/33 using 1/11; then 71/33 | 0.(03); 2.(15) | 71/33=2+5/33 |
| Q4(i) | 0.(24) | 8/33 | appendix 24/99 |
| Q4(ii) | 2.(327) | 775/333 | appendix 2325/999 |
| Q4(iii) | −5.132 (terminating) | −1283/250 | appendix −1283/250 |
| Q4(iv) | 3.1(7) | 143/45 | recurring bar over 7 only |
| Q4(v) | 17.2(15) | 5681/330 | recurring bar over 15 only |
| Q4(vi) | −21.213(7) | −47731/2250 | appendix −190924/9000 |
| Q5(i) | 7/128 | terminating | 128=2⁷ |
| Q5(ii) | 21/15 | terminating | reduces to 7/5 |
| Q5(iii) | 4 9/35 | nonterminating recurring | reduced denominator includes 7 |
| Q5(iv) | 219/2200 | nonterminating recurring | reduced denominator includes 11 |

**Totals:** 5 numbered questions; 16 independently verified question-parts; 0 missing app records; 0 wrong baseline final answers. Parenthesized digits in the app mean the overbar in the printed textbook, not ordinary parentheses. There is no diagram-dependent question in this exercise.

## Targeted teaching repairs (English-only, additive)
- Replace generic rational-number descriptions on Q1 with the actual long-division/remainder logic and the repeating block of each answer; distinguish terminating and recurring.
- Q2: explicitly explain the leading zero in `076923` and why six is the *shortest* period.
- Q3: teach the link from 1/11 to 1/33 and the whole-number part of 71/33.
- Q4: distinguish terminating vs purely recurring vs mixed recurring (including exact placement of overbars); explain matching decimal tails before subtraction and sign handling.
- Keep all original locked question, answer and solution records untouched. Preserve existing Tamil strings pending editorial review.

## Release evidence
- Source pages and appendix visually audited; independent exact rational arithmetic test added at `docs/curriculum/grade-9/tests/ex2-2-source-audit-math.cjs`.
- Any new claim about production requires passing GitHub CI, merge, Pages publish and live-source verification. This document alone does **not** prove deployment.
