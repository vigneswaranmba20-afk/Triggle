# Class 9 Math-First audit

Baseline `9cde0fceeb06ab29995f71ee4f5a19a4963b1a2b` from `main`. The inventory comes from the Grade 9 records loaded by the student app. A record can represent a question, one subpart, or a question with several subparts. [Record inventory](g9-math-first-inventory.csv)

## Scope

| Chapter | Exercises | Textbook records | Records with Tamil prompt text | Practice records |
| --- | ---: | ---: | ---: | ---: |
| 1 Set Language | 2 | 64 | 30 | 1 |
| 2 Real Numbers | 9 | 120 | 120 | 1 |
| 3 Algebra | 2 | 54 | 0 | 2 |
| 4 Geometry | 3 | 11 | 0 | 1 |
| 5 Coordinate Geometry | 1 | 8 | 0 | 1 |
| 6 Trigonometry | 5 | 40 | 40 | 0 |
| 7 Mensuration | 4 | 36 | 0 | 1 |
| 8 Statistics | 4 | 30 | 0 | 1 |
| 9 Probability | 3 | 25 | 0 | 1 |
| **Total** | **33** | **388** | **190** | **9** |

The inventory records both published prompt languages and source locator languages. Across the 388 textbook records, 260 have English and Tamil locators, 88 have English locators, and 40 legacy records have an unspecified source medium in per-record metadata. The Tamil reader displays English for 198 textbook records, comprising 113 existing English placeholders and 85 existing fallbacks. Tamil editorial review remains pending.

## Baseline findings and repairs

Counts refer to affected records unless otherwise stated. Some records occur in multiple rows.

| Severity | Finding | Baseline | Candidate |
| --- | --- | ---: | ---: |
| High | Several numbered answers entered the same formula and looked like an algebraic product | 15 records, 34 formula fragments | 0. All 50 four-option questions render each original label and option together |
| High | Displayed working dropped implication signs when equations broke across lines | 23 records, 31 signs | 0. The two existing compilers retain the signs, with one exact-text notation override for Set Language |
| Medium | Coefficients written with invented symbolic names | 5 records, 15 formulas | 0. Worked terms and arrows lead to the same five signed pairs |
| Medium | Repeated Algebra subpart label in the underlying source string | 11 records | 0. Each source-checked subpart has one label |
| Medium | Independent equalities could extend past a single mobile line | Seen in Set Language and Geometry | Complete equalities can wrap at commas while grouped expressions stay together |
| Medium | Sampled questions and explanations below the 18 px and 16 px reading targets at 393 px | 3 of 3 screenshot pairs | 0 of 3 |
| Medium | Reader arrows intercepted keyboard scrolling of wide mathematics. Without the notation script, structured arrays could display object labels | Shared reader defects | Grade 9 lets focused formula regions handle arrows and shows the original text if the script is unavailable |
| Low | Slash-delimited fractions in displayed English solution prose | 4 text fragments in 3 records | 0 flagged fragments. Fractions appear as math or the explanation uses words |
| Low | Statistics midpoint `m` was styled as the metre unit | 1 record | 0. The textbook's variable styling is used for this question |
| Low | Gap between the first explanation and display equation in the three screenshot pairs | 9.85 px | 4.63 px |
| — | Unrenderable authored KaTeX, raw TeX fragments, or empty final results | 0 in each category | 0 in each category |

The Class 9 scale applies to the existing exercise reader, concept and activity text. It uses the existing light palette, gives each wide formula its own scroll region, and marks the final answer with a thin rule and a readable label. In the 393 px samples, the question moves from 15.33 to 18 px, worked prose from 15 to 16 px, display math from 17.68 to 19.95 px, and the answer label from 12 to 15 px. All 1,163 step entries remain in their original order.

Pending editorial work includes the 198 English-only textbook prompts in the Tamil reader and broader source review for legacy records. Statistics 8.4 Q10 still uses the already-defined `X` for the mean, where the book puts a bar above `X`. The mobile tests use Chromium emulation with keyboard, touch and MathML assertions. Broader physical-device and assistive-technology testing would be needed for an overall quality score.

## Source and mathematics

Eleven Algebra Exercise 3.1 records, Q1(i–vi) and Q2(i–v), were individually checked against the 2025 question and answer-key page images. English printed pages 87 and 310 correspond to PDF pages 93 and 316. Tamil printed pages 94 and 326 correspond to PDF pages 100 and 332. Both editions give the same mathematics. The Q1(iv) exercise continues to explain that the simplified polynomial comes from an expression defined for nonzero `x`. [Source pages, IDs and edition hashes](../../site/data/textbook-fidelity/g9-ch3-ex3-1-q1-q2.json)

The five coefficient pairs for `x²` and `x` in order are `(2/5, −3)`, `(−2, −√7)`, `(π, −1)`, `(√3, √2)` and `(1, −7/2)`. Reading each signed multiplier independently gives the textbook pairs. Q2(i) identifies the two terms, shows each term leading to its coefficient, and boxes the result. The visual question uses a stacked fraction. All 397 final answer strings match the baseline.

Statistics Exercise 8.4 Q1 was also checked against both question-page images. The two sources use `m` for the midpoint, and solving `m = (a+b)/2` for the lower limit `a` gives the existing option 1, `2m−b`. English printed page 288 is PDF page 294. Tamil printed page 305 is PDF page 311. [English source](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view) · [Tamil source](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

## Browser evidence

| Actual Class 9 question | Before at 393 × 1024 | After at 393 × 1024 |
| --- | --- | --- |
| Algebra 3.1 Q2(i) `g9-ch3-ex3.1-q2-i` | [Before](g9-math-first-screens/algebra-before.png) | [After](g9-math-first-screens/algebra-after.png) |
| Geometry 4.1 Q4 congruence proof `g9-ch4-ex4.1-q4` | [Before](g9-math-first-screens/geometry-proof-before.png) | [After](g9-math-first-screens/geometry-proof-after.png) |
| Geometry 4.1 Q4 conclusion after scrolling | [Before](g9-math-first-screens/geometry-proof-before-end.png) | [After](g9-math-first-screens/geometry-proof-after-end.png) |
| Statistics 8.4 Q1 `g9-ch8-ex8.4-q1` | [Before](g9-math-first-screens/statistics-before.png) | [After](g9-math-first-screens/statistics-after.png) |

The exhaustive browser suite loads 397 records in both reader languages at 320, 360, 393 and 430 px. The representative suite additionally uses 390, 412, 768 and 1280 px. It checks the three screenshot records and seven other pages.

| Chapter | Additional browser sample |
| --- | --- |
| Set Language | `g9-ch1-ex1.1-q3-b-i` |
| Real Numbers | `g9-ch2-ex7-q2-i` |
| Algebra | `g9-ch3-ex3.2-q4` |
| Coordinate Geometry | `g9-ch5-ex5.2-q5` |
| Trigonometry | `c9-exercise-6-4-q1-i` |
| Mensuration | `g9-ch7-ex7.2-q4` |
| Probability | `g9-ch9-ex9.1-q4` |

`test_g9_clear_math.cjs` checks the full inventory, exact fallbacks, 4,655 KaTeX formula instances and the baseline preservation checksum. `test_g9_ex3_1_q1_q2_release.cjs` checks the corrected source prompts and signed working. `test_g9_math_first_browser.cjs` checks direct links, exercise boundaries, language switching, figure dialog focus, final-answer clearance above the dock, local formula scrolling, rotation, saved progress, offline reload and renderer fallback. `test_g9_concepts_typography_browser.cjs` exercises the concept controls and figures in both languages.

The comparison script checks the question and solution regions for Grade 10 `c10-1-ex1-1-q1-i` and `c10-8-ex8-1-q5`, Grade 11 `c11-3-3-1-1`, and Grade 12 `g12-ch1-ex1.1-q1-i` at 320, 393 and 430 px. It compares screenshots, mathematical output, fonts and geometry against the baseline. The normal major-risk GitHub Actions gate runs the full unit, curriculum, browser, WebKit and Firestore security suites.

External paid API cost was $0.
