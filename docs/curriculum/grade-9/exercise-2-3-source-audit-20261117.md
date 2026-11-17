# TRACE Grade 9 Real Numbers — Exercise 2.3 (2025 textbook) source audit

## Provenance
- **Edition:** Tamil Nadu State Board / SCERT Standard Nine Mathematics; revised 2025. Original connected PDF: [2025 English textbook](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view).
- **Original PDF SHA-256:** `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`.
- **Visually inspected:** exercise and contextual semicircle construction, printed p.55 / PDF p.61; official answers, printed p.308 / PDF p.314. Images rendered at 1.75× with PyMuPDF; exercise image SHA-256 `261930c244490b9c6f5fcd0abeef6469abdc6fe835c1894916565f2821d7537d`, answer appendix SHA-256 `3268cd58e2e02deba652e9aaeee1e78d778782f9729c4f46f53d99d2751c8045`. For Q1 geometry, context is Example 2.13 / Fig.2.8 immediately preceding the exercise.

## Exhaustive 2025 exercise inventory
**3 numbered questions / 7 question-parts** (Q1 three, Q2 three, Q3 one). All seven already have a student record in `site/data/real-numbers/g9-ch2-exercises-a.js`; no new textbook questions are necessary.

| ID | 2025 source instruction | Existing app answer / independent maths check | Official appendix |
|---|---|---|---|
| `g9-ch2-ex3-q1-i` | Represent √3 on number line | √3 ≈ 1.73205; semicircle segments 3 and 1 imply height²=3 | Q1 construction has no printed answer |
| `g9-ch2-ex3-q1-ii` | Represent √4.7 on number line | √4.7 ≈ 2.16795; height²=4.7 | No printed answer |
| `g9-ch2-ex3-q1-iii` | Represent √6.5 on number line | √6.5 ≈ 2.54951; height²=6.5 | No printed answer |
| `g9-ch2-ex3-q2-i` | Two irrationals between 0.3010011000111… and 0.3020020002… | 0.30131001000100001… and 0.30161001000100001…, with an explicitly unbounded increase in zero-run lengths; both strictly between | Different valid examples: 0.301202200222…, 0.301303300333… |
| `g9-ch2-ex3-q2-ii` | Two irrationals between 6/7 and 12/13 | √3/2 and √(4/5); square endpoints to prove 36/49 < 3/4 < 4/5 < 144/169 | Different valid nonperiodic decimals: 0.8616611666111…, 0.8717711777111… |
| `g9-ch2-ex3-q2-iii` | Two irrationals between √2 and √3 | √(5/2), √(8/3); 2 < 5/2 < 8/3 < 3 and neither radicand is a rational square | Different valid nonperiodic decimals: 1.515511555…, 1.616611666… |
| `g9-ch2-ex3-q3` | Two rationals between 2.2360679… and 2.236505500… | 2.2361=22361/10000 and 2.2363=22363/10000, both strictly within interval | 2.2362 and 2.2363 |

### Independent verification and pedagogy
- All three Q1 approximations are consistent with their exact square roots. A semicircle on diameter `n+1`, split into `AB=n` and `BC=1`, yields perpendicular `BD²=AB×BC=n`. Copy `BD` from origin to represent `√n` exactly; a decimal label alone is approximate.
- All three Q2 pairs are strictly inside their endpoints and irrational. The decimal examples require **ever-growing** runs of zeroes, not an unspecified eventually-periodic continuation. The radical examples are irrational by the reduced perfect-square numerator/denominator criterion, and inequalities are checked by exact positive-square comparisons.
- Q3's app answers differ from the appendix's examples but satisfy the stated request to find **any** two interior rationals.
- **Preservation:** source-pinned student prompts, original steps, final answers, existing Tamil explanations, figure policy, and Grade 10 content remain untouched; optional English `Why-step` hints improved for all seven parts.
- **Counts:** source-inventoried 7/7, verified 7/7, missing 0, original final-answer corrections 0, optional English explanation repairs 7. No claim of Tamil editorial approval or independent physical-device testing.

## Validation and release
The independent exact-arithmetic gate `docs/curriculum/grade-9/tests/ex2-3-source-audit-math.cjs` checks record IDs, source pages, exact inequalities, root positioning, wording and manifest. Release requires a green PR quality gate, green post-merge quality gate, and GitHub Pages live-source verification. No paid model/API calls required for this audit.
