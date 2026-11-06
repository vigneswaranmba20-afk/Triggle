# Triggle Mathematics Teaching Reference Handbook
## Working edition 0.1 — Samacheer Kalvi Grades 9–12 • English + Tamil

**Audience:** Triggle curriculum editors, mathematics reviewers and coding agents.  
**Status:** Original instructional prototype; **not an endorsed textbook, final student-facing book, or complete Phase 2 chapter set**.  
**Curriculum authority:** Tamil Nadu State Board Mathematics; each chapter must be checked against the user's prescribed edition.  
**Supplementary idea banks:** NCERT Exemplar Problems and Mathematics Laboratory Manuals; no source pages, copyrighted questions or images are reproduced here.

This reference handbook is intentionally independent of specific textbook page numbers until their edition can be checked. The four grades and all 41 IDs are in [the chapter crosswalk](chapter-crosswalk.md). Source provenance and restrictions are in [the source register](README.md).

---

# Part I. A common teaching system for Triggle

## 1. The six-layer chapter blueprint

Every published chapter should eventually have these layers, in this order:

1. **Motivate / Why it matters.** A local, plausible question in clear English and Tamil, with the same mathematics in both versions.
2. **Explore visually.** A student changes one control and predicts what happens. Distinguish a visual experiment from a proof.
3. **Name and define.** Precise definitions, symbols, notation, conditions, and at least one **counterexample**.
4. **Derive and solve.** Independently written worked examples from basic to nonroutine, with verification.
5. **Practise and diagnose.** Recall → application → misconception challenge → mixed review. Give feedback explaining *why*, not just correct/incorrect.
6. **Demonstrate mastery.** Short quiz, a transfer task, and an honest readiness state that is separate from the current chapter's publication state.

**Always specify:** grade, Triggle chapter ID, prereqs, concept ID, EN & TA labels, textbook edition/source locator, example difficulty, expected response, answer check, alternate valid methods, plausible misconceptions, interaction fallback for keyboard/touch, and a mathematical reviewer.

## 2. Mathematical accuracy rules

- State domains, restrictions, units and angle convention. Never divide by an expression without discussing whether it can be zero.
- Use exact values such as √3/2 when possible; round only at the **final** approximation step and announce precision.
- A diagram is a learning model, not a substitute for proof. Avoid "not drawn to scale" confusion by showing assumptions.
- Put a substitution, inverse operation, independent calculation, or graph-based sanity check after a symbolic answer.
- For inverse trig, always specify principal ranges. For logarithms, discuss positive arguments and valid bases.
- In probability, state sample space and conditions before computing; in geometry identify all relevant constraints.
- Mark ambiguous textbook editions and unsourced translations as **pending review**, not published.

## 3. Visual interaction design templates

| Pattern | Student input | Mathematical output | Critical accessibility fallback |
|---|---|---|---|
| Drag and measure | Drag a vertex or adjust an angle | Length, ratio, equation, constraints | Numeric input and accessible labels |
| Set builder | Toggle membership in A, B | Venn diagram and set notation | Checklist/table alternative |
| Mapping machine | Select inputs/outputs | Ordered pairs, domain, codomain, range | Keyboard-operable table |
| Expression explorer | Modify a coefficient | Updated factors, zeros, graph | Textual exact root calculation |
| Function & tangent | Move a point or step h | Slope estimate toward derivative | Table of successive h values |
| Area accumulator | Change a bound | Riemann approximation and integral | Partition table and derivation |
| Chance experiment | Choose trials and seed | Relative frequencies versus probabilities | Tabular counts without motion |

Avoid animation that hides information, auto-plays indefinitely, produces a false numerical proof, or cannot be disabled.

## 4. Bilingual editorial discipline

Tamil labels below are a **candidate glossary**, primarily aligned with the older Tamil Nadu chapter register, not approved translations for every equation and context. A Tamil-medium mathematics reviewer must confirm the exact term in the prescribed edition. Preserve conventional mathematical notation in both languages.

| Concept | English label | Tamil candidate | Review |
|---|---|---|---|
| Set | Set | கணம் | Pending |
| Set language | Set language | கண மொழி | Pending |
| Real numbers | Real numbers | மெய்யெண்கள் | Pending |
| Algebra | Algebra | இயற்கணிதம் | Pending |
| Coordinate geometry | Coordinate geometry | ஆயத்தொலை வடிவியல் | Pending |
| Trigonometry | Trigonometry | முக்கோணவியல் | Pending |
| Mensuration | Mensuration | அளவியல் | Pending |
| Statistics | Statistics | புள்ளியியல் | Pending |
| Probability | Probability | நிகழ்தகவு | Pending |
| Relations | Relations | உறவுகள் / தொடர்புகள் (context dependent) | Pending |
| Functions | Functions | சார்புகள் | Pending |
| Matrices | Matrices | அணிகள் | Pending |
| Determinants | Determinants | அணிக்கோவைகள் | Pending |
| Vectors | Vectors | வெக்டர்கள் (confirm textbook wording) | Pending |
| Complex numbers | Complex numbers | கலப்பு எண்கள் | Pending |
| Inverse trigonometric functions | Inverse trigonometric functions | நேர்மாறு முக்கோணவியல் சார்புகள் | Pending |
| Differential calculus | Differential calculus | வகை நுண்கணிதம் | Pending |
| Integral calculus | Integral calculus | தொகை நுண்கணிதம் | Pending |
| Partial derivatives | Partial derivatives | பகுதி வகைக்கெழுக்கள் | Pending |
| Discrete mathematics | Discrete mathematics | தனிநிலைக் கணிதம் | Pending |
| Probability distributions | Probability distributions | நிகழ்தகவு பரவல்கள் | Pending |
| Equation | Equation | சமன்பாடு | Pending |
| Sequence | Sequence | தொடர்வரிசை | Pending |
| Geometry | Geometry | வடிவியல் | Pending |

**Language quality check:** Both mediums must express the *same conditional statement*, not merely translate word by word. The sign of an inequality, the location of "not", "at least", "at most", and quantifiers matter.

---

# Part II. Seed model lessons (original examples, not textbook exercise reproductions)

These are **starter teaching notes** to reuse as styles, then extend and independently validate against textbooks. They do not constitute full chapter coverage.

## Model A — Grade 9, Chapter 1: Set Language (`g9-ch1`)

**Essential idea:** A set describes a collection of clearly determined objects. Intersection means "both"; union means "at least one"; complement requires a stated universe.

**Student investigation:** In a group of 20 students, 12 play chess, 11 play badminton, and 7 play both. How many play either? How many play neither?

**Worked solution:** Let C and B be the two sets. By inclusion–exclusion,  
|C ∪ B| = |C| + |B| − |C ∩ B| = 12 + 11 − 7 = **16**.  
Neither = 20 − 16 = **4**.

**Independent check:** Chess-only = 12 − 7 = 5, badminton-only = 11 − 7 = 4; 5 + 7 + 4 + 4 = 20.

**Visualization:** Click students into a two-circle Venn diagram; update all four region counts and the symbolic equation. A table must expose the same information without relying only on color.

**Misconception:** 12 + 11 = 23 counts shared members twice. Ask students to show which seven were duplicated.

**Quick checks:** What is the intersection size? Why does "neither" depend on the universal set? Can union be smaller than either input set? (No.)

**Tamil cue:** கணம், சேர்ப்பு, வெட்டு terminology should be confirmed against the prescribed Grade 9 Tamil textbook before publication.

## Model B — Grade 9, Chapter 6: Trigonometry (`g9-ch6`)

**Essential idea:** In a right triangle, sine, cosine and tangent compare sides **relative to the selected acute angle**.

**Original example:** A right triangle has legs 5 cm and 12 cm and a hypotenuse 13 cm. For the acute angle θ opposite the 5 cm leg, find the three primary ratios.

sin θ = 5/13; cos θ = 12/13; tan θ = 5/12.

**Checks:** sin²θ + cos²θ = 25/169 + 144/169 = 1; tan θ = sin θ / cos θ = 5/12.

**Visualization:** Keep the sides fixed and let the learner switch the chosen acute angle; opposite/adjacent labels switch, while hypotenuse does not. Show the invariant Pythagorean relationship.

**Common error:** Calling 5 cm "opposite" for both acute angles. Another error is using 5/12 for sine, which ignores the hypotenuse.

**Bilingual cue:** முக்கோணவியல் is the chapter label; confirm words used for opposite/adjacent/hypotenuse from the Tamil textbook rather than inventing textbook terminology.

## Model C — Grade 10, Chapter 1: Relations and Functions (`g10-ch1`)

**Essential idea:** A function assigns **exactly one output** to each input in its domain, though different inputs may share an output.

**Original example:** For f(x) = 2x + 3 and domain {0, 1, 2}, the ordered pairs are {(0,3), (1,5), (2,7)}. The range is {3,5,7}; the codomain need not equal the range.

**Checks:** f(2) = 7; f(0) = 3. The output 5 comes from x = 1. On this specified domain, the function is one-to-one.

**Visualization:** A mapping diagram with one arrow from each domain element; when two outputs are attached to one input, explain why it is a relation but not a function.

**Misconception:** A function need not give *different* outputs for different inputs. Contrast with g(x) = x² on {-1,1} where both map to 1.

**Tamil cues:** உறவுகளும் சார்புகளும் is the current chapter title; translate "domain", "codomain", "range" only after prescribed-edition review.

## Model D — Grade 10, Chapter 3: Algebra (`g10-ch3`)

**Original example:** Solve x² − 5x + 6 = 0.

Seek two numbers multiplying to 6 and summing to −5: −2 and −3.  
(x − 2)(x − 3) = 0. Therefore x = **2 or 3**.

**Substitution check:** 4 − 10 + 6 = 0 and 9 − 15 + 6 = 0.

**Visualization:** Two movable roots on a parabola. Change constant term and coefficients to observe when the roots coincide or are non-real, without asserting graph appearance proves the algebra.

**Misconception:** Writing only one root, or cancelling (x − 2) without considering x = 2.

## Model E — Grade 11, Chapter 3: Trigonometry (`g11-ch3`)

**Essential idea:** Angle addition formula is a structural identity, not a numerical table trick.

**Original example:** sin(75°) = sin(45° + 30°)  
= sin45° cos30° + cos45° sin30°  
= (√2/2)(√3/2) + (√2/2)(1/2)  
= **(√6 + √2)/4**.

**Independent checks:** This is between sin60° and sin90°, as expected for an acute angle in this range. Numerical approximation is about 0.9659.

**Visualization:** Two unit-circle rotations; animate component changes and overlay the exact identity. Add a "show derivation" route using rotation matrices, after the basic lesson.

**Misconception:** sin(a+b) ≠ sin(a)+sin(b). Test a=b=30° to expose the error.

## Model F — Grade 11, Chapter 9: Limits and Continuity (`g11-ch9`)

**Essential idea:** A limit describes values as x approaches a point; it need not equal the function's value at that point.

**Original example:** Evaluate lim(x→2) (x²−4)/(x−2).

Factor the numerator: (x−2)(x+2)/(x−2) = x+2 **for x≠2**. The limit as x approaches 2 is **4**; the original fraction is undefined at x=2.

**Visualization:** Show a graph of y=x+2 with a missing point at x=2, distinct from a filled function point. A table approaching from left and right is essential.

**Misconception:** "0/0 means the limit is zero." It signals an indeterminate form requiring more work.

## Model G — Grade 11, Chapter 10: Differentiation (`g11-ch10`)

**Original example:** For f(x)=x², find the instantaneous rate of change at x=3.

Difference quotient = [f(3+h)−f(3)]/h = [(3+h)²−9]/h = 6+h for h≠0.  
As h→0, derivative at 3 = **6**.

**Visualization:** Secant slope for h = 1, 0.5, 0.1, −0.1 and tangent slope 6. Label h=0 as undefined for the quotient: the *limit* exists.

**Misconception:** Substituting h=0 into the original quotient before simplification, causing division by zero.

## Model H — Grade 12, Chapter 1: Applications of Matrices (`g12-ch1`)

**Original example:** Solve x + 2y = 5 and 3x + 4y = 11 by matrices.

A = [[1,2],[3,4]], b = [5,11], determinant det(A)=4−6=**−2** ≠ 0, so a unique solution exists.  
A⁻¹ = (−1/2)[[4,−2],[−3,1]]. Thus [x,y]=A⁻¹b = **[1,2]**.

**Check:** 1 + 2·2 = 5; 3·1 + 4·2 = 11.

**Visualization:** Show how a linear map transforms a coordinate grid. The determinant sign indicates orientation; zero determinant demonstrates collapse and why inversion fails.

**Misconception:** Swapping rows instead of diagonals in a 2×2 inverse, or ignoring det(A)=0.

## Model I — Grade 12, Chapter 4: Inverse Trigonometric Functions (`g12-ch4`)

**Essential idea:** arcsin returns a **principal value**, not every angle whose sine equals the input.

**Original example:** arcsin(1/2) = **π/6**, because sin(π/6)=1/2 and π/6 lies in the principal range [−π/2, π/2].

**Contrast:** All real solutions of sin θ = 1/2 are θ = π/6 + 2kπ or θ = 5π/6 + 2kπ, where k is any integer. This is a different question.

**Visualization:** Horizontal line y=1/2 intersecting the sine curve in multiple places, with a shaded principal interval and highlighted arcsin choice.

**Misconception:** arcsin(sin θ)=θ for every θ. Correct only when θ is in the chosen principal interval (or when suitably reduced).

## Model J — Grade 12, Chapter 11: Probability Distributions (`g12-ch11`)

**Original example:** Let X be the number of heads from two independent fair coin tosses.

| X | 0 | 1 | 2 |
|---|---:|---:|---:|
| P(X) | 1/4 | 1/2 | 1/4 |

Total probability = 1. E[X] = 0·(1/4)+1·(1/2)+2·(1/4)=**1**.  
E[X²] = 0+(1/2)+4·(1/4) = 3/2.  
Var(X) = E[X²]−(E[X])² = **1/2**.

**Visualization:** Repeated simulated tosses versus the theoretical bar chart, with a seeded reproducible session for debugging. Do not confuse sample frequencies with exact probabilities.

**Misconception:** Counting HT and TH as the same elementary outcome while still treating four two-toss sequences as equally likely.

---

# Part III. Review and production checklists

## 5. Teacher review checklist

- [ ] TN Grade/volume/medium/edition/chapter name and topic boundary confirmed.
- [ ] Concept and any theorem hypotheses mathematically accurate.
- [ ] Original examples independently verified by substitution or second method.
- [ ] Worked solutions do not skip a logically necessary step.
- [ ] Tamil terminology and grammar reviewed by a competent Tamil-medium maths reviewer.
- [ ] Accessibility fallback exposes the same mathematics without dragging/animation.
- [ ] Supplementary source contributions recorded as **ideas**, not unattributed reproduction.
- [ ] No unrelated syllabus material falsely labelled as an official board exercise.
- [ ] Existing 105 question IDs and progress routes stay intact.
- [ ] Code checks and mobile browser tests pass before merging.

## 6. Early Phase 2 chapter planning

A sensible content sequence, **subject to verified user textbooks**, is:
- **Grade 9:** Set Language → Real Numbers → Algebra → Geometry → remaining chapters, expanding existing Trigonometry rather than replacing its original questions.
- **Grade 10:** Relations and Functions → Numbers and Sequences → Algebra, plus later Trigonometry and exam-oriented review.
- **Grade 11:** Sets/Relations/Functions → Basic Algebra → Trigonometry → subsequent chapters; differentiation and integrals should have dynamic models.
- **Grade 12:** Matrices → Complex Numbers → Theory of Equations → Inverse Trigonometric Functions → remaining chapters; avoid teaching topics before prerequisite checks.

The sequence lists an editorial plan, not a claim that teaching modules exist for each chapter. Content generation must be incremental and testable, with review gates rather than blind bulk publication.

## 7. Internal record template for every new concept

- **Identifier:** `g{grade}-ch{chapter}/concept/{slug}`.
- **Book anchor:** State Board, language, volume, edition/imprint, chapter, exercise, printed page; include PDF page offset separately.
- **Cross-reference:** NCERT Exemplar unit/page and/or NCERT math lab activity when **actually consulted**, else `none`.
- **Explanation EN/TA:** independently authored, two independent editorial reviews where possible.
- **Models:** mathematical invariant, controls, exact answer policy, accessibility.
- **Original example:** full solution plus independent check and plausible wrong answer.
- **Evidence:** sources consulted with retrieval date, copyright restrictions and notes.
- **Status:** `drafting` → `review` → `published` only after real content and checks.

This living handbook can grow chapter by chapter without copying any supplementary book into the repository. Reference links can be refreshed while the source-of-truth syllabus remains `site/data/curriculum.js`.
