# VER Triggle — Grade 10 Chapter 3 Algebra: Phase 2 Design & Phase 4 Individual Concept Quality Review

**Date:** 19 November 2026  
**Mission:** VER Triggle — Gemini Antigravity Mission 03  
**Standards Applied:**
- `docs/CONCEPTS_UX_SCHEMA.md` (Universal Concept Screen Contract)
- `docs/CONCEPT_PSYCHOLOGY_REVIEW_STANDARD.md` (Weighted Cognitive-Load & Psychology Review Standard)
- `docs/CHATGPT_STYLE_MATH_NOTATION_STANDARD.md` (Offline KaTeX Structured Display Standard)

**Source Authority:** Tamil Nadu State Board Standard Ten Mathematics, Revised 2025 Edition — Chapter 3 *Algebra* (English pp. 85–160; Tamil Ch. 3 *இயற்கணிதம்* pp. 86–164), cross-checked against `site/data/curriculum.js`.

> **Methodological honesty note:** Every score below is an instructional-design and automated + visual engineering review estimate under `docs/CONCEPT_PSYCHOLOGY_REVIEW_STANDARD.md` — **not** a substitute for real classroom trials with students. Tamil text carries the explicit inline draft banner (`tamilStatus: 'draft, editorial review pending'`) until bilingual editorial review is completed.

---

## Summary of Curriculum Discovery & Build Scope

- **Total Chapter 3 textbook curriculum concepts identified & implemented:** **14** (ordered strictly by 2025 TN Class 10 Sections `3.1`–`3.9.3`)
- **Exercises & textbook fidelity:** Existing textbook exercises (`Ex 3.1`–`Ex 3.6`, IDs, wording, and worked solutions) were preserved untouched; Concepts 1–5 link directly to `c10-3-ex3-1-q1-i` through `c10-3-ex3-6-q1-i`, while Concepts 6–14 clearly prepare upcoming Sections `3.5`–`3.9` without creating any student-facing Worked Examples sections or fake/duplicate exercise records.
- **UI & sibling boundaries:** Grade 10 Chapter 2 concept files (`site/data/g10-ch2-concepts.js`, `site/assets/g10-ch2-discovery-labs.*`) and Chapter 2 routes in `site/assets/chapter-hub.js` were left completely untouched.

---

## Visual & 320 px Defect Log (Caught & Fixed Prior to Release)

1. **Wide display-math formulas overflowing 320 px portrait cards:** Initial headless Chromium captures (`/tmp/ch3_shots/en-320-c01..14.png`) + strict `scrollWidth <= clientWidth + 2` checks showed single-line equations exceeding `244–260 px` inside `.sp2-formula`, `.sp2-example-math`, `.g10ch3-math-box`, and `[data-why-response]` across 13 concepts and Labs 2, 3, 4, 5, 6, 7, 8, 10, 12, and 14. Refactored into compact multi-line `\begin{aligned}...\end{aligned}` blocks plus `@media (max-width: 400px)` `0.86em` KaTeX sizing in `site/assets/g10-ch3-concepts.css`.
2. **Factor grid left label wrapping (`g(x\n)` / `GC\nD`):** Widened `.g10ch3-fg-row` first column to `52px` (`46px` under `400px`) with `white-space: nowrap`.
3. **Lab 8 Completing-the-Square SVG right-edge clipping & untranslated label:** `(x + 3)² = 7 + 9 = 16` clipped (`= 1`) inside `viewBox="0 0 280 148"`, and `"Add half-coeff squared:"` stayed English in Tamil mode. Expanded `viewBox="0 0 320 154"`, shifted text column to `x="142"`, and localized the caption.
4. **Lab 11 Variation SVG label collision:** `"Line through (0, 0)"` at `(155, 24)` overlapped the `(6, 12)` dot, and `"Hyperbola xy = 12"` lacked Tamil localization. Moved the caption dynamically to clear graph quadrants (`(42, 22)` for direct; `(142, 22)` for inverse), offset `(xVal, yVal)` dot labels off the line/curve, and localized both SVG captions.
5. **Labs 9 & 12 parabola stroke crossing label text:** Inspection of `en-393-c09.png` and `en-393-c12.png` showed top-left `y = x² − 4x + 3` and `y = x²` touching the ascending parabola stroke. Added clean semi-opaque white SVG backing pills (`rx="6"`).

---

## Weighted Rubric Key

All concepts are evaluated independently on the six dimensions of `docs/CONCEPT_PSYCHOLOGY_REVIEW_STANDARD.md`:
- **M (25%):** Mathematical correctness & 2025 TN textbook fidelity
- **B (25%):** Beginner understanding & symbol clarity
- **C (20%):** Cognitive load & explanatory progression
- **V (15%):** Purposeful visualization / interaction (earned its space; no generic sliders)
- **A (10%):** Mobile (`320–430 px`), keyboard, ARIA, and offline SW usability
- **T (5%):** Independent transfer question & distractor-specific feedback

$$\text{Score} = 0.25M + 0.25B + 0.20C + 0.15V + 0.10A + 0.05T$$

---

## Individual Concept Design & Evaluation (`1`–`14`)

### 1. `g10-ch3-linear-3vars` — Simultaneous linear equations in three variables (`Sec 3.2`, Ex 3.1 link)
- **Learning target:** Reduce a 3-variable linear system to 2 variables by eliminating the *same* variable from two distinct equation pairs, and interpret `0 = 0` vs `0 = k`.
- **Prior-knowledge risk:** Multi-equation numbering `(1), (2), (3)`, ordered triple notation `(x, y, z)`, 3D plane geometry.
- **Likely misconception:** Eliminating `y` from `(1),(2)` and eliminating `z` from `(2),(3)`—leaving three variables still tangled—or confusing `0 = 0` (infinitely many solutions) with `0 = 5` (no solution).
- **Best representation:** Interactive 4-step **Elimination Flow** stepper + **Three Outcomes** geometric SVG switcher (`Unique (x, y, z)`, `Infinitely many 0 = 0`, `No solution 0 = 5`).
- **Independent transfer check:** Given cyclic sums `x + y = 5, y + z = 7, z + x = 6`, find `x + y + z` (sum trick `2(x+y+z) = 18 ⇒ 9`; distractors trap failing to divide by `2` or adding inconsistently).
- **Scores:** Initial build `8.7` (wide display math clipped at 320 px) → **Final `9.5/10`** (`M=9.5, B=9.5, C=9.5, V=9.5, A=9.5, T=9.5`).

### 2. `g10-ch3-poly-gcd` — Polynomial GCD by Euclid's division (`Sec 3.3.1`, Ex 3.2 link)
- **Learning target:** Apply repeated polynomial division until remainder `0`, and justify omitting a non-zero numeric constant factor from an intermediate remainder while preserving shared initial numeric factors.
- **Prior-knowledge risk:** Degree vs leading coefficient tie-break, polynomial remainder notation `r₁(x)`, constant factor rule.
- **Likely misconception:** Leaving `-5` inside the next divisor unnecessarily or forgetting to multiply back an initial common numeric GCD such as `gcd(6, 9) = 3`.
- **Best representation:** Interactive 3-step Euclid division sequence highlighting where `-5` factors out and drops, paired with a collapsible numeric-factor rule callout.
- **Independent transfer check:** Next divisor from remainder `r(x) = -4(x² − 1)` (transfer of omitting `-4` cleanly; checks both `-4` omission and degree-drop error).
- **Scores:** Initial build `8.5` (Step 1 and `exampleMath` clipped at 320 px) → **Final `9.4/10`** (`M=9.5, B=9.5, C=9.5, V=9.0, A=9.5, T=9.5`).

### 3. `g10-ch3-poly-lcm-law` — LCM of polynomials & `LCM × GCD = f(x) × g(x)` (`Sec 3.3.2`, Ex 3.3 link)
- **Learning target:** Contrast GCD (minimum exponents of shared factors) with LCM (maximum exponents of all factors) and verify why `f(x) · g(x) = LCM · GCD` works for two polynomials (and not three).
- **Prior-knowledge risk:** Exponents of binomial factors `(x − 2)²`, `min/max` exponent rules.
- **Likely misconception:** Reversing lowest/highest powers between GCD and LCM, or applying `f·g·h = LCM·GCD` to 3 polynomials.
- **Best representation:** Side-by-side interactive **Factor-Power Matrix** (`f(x)`, `g(x)`, active mode row highlighting `min`, `max`, or `min + max` exponent sum per column).
- **Independent transfer check:** Given `GCD = (x − 1)`, `LCM = (x − 1)(x + 2)(x − 3)`, `f(x) = (x − 1)(x + 2)`, find `g(x)`.
- **Scores:** Initial build `8.6` (`g(x)` / `GCD` left labels wrapped at 320 px) → **Final `9.5/10`** (`M=9.5, B=9.5, C=9.5, V=9.5, A=9.5, T=9.5`).

### 4. `g10-ch3-rational-excluded` — Rational expressions & excluded values (`Sec 3.4`, Ex 3.4 link)
- **Learning target:** Factor before reducing rational expressions and determine excluded values where division by zero occurs (following the 2025 TN lowest-form convention).
- **Prior-knowledge risk:** Difference of squares `x² − a²`, zero-in-numerator vs zero-in-denominator distinction.
- **Likely misconception:** Cancelling summed `x²` terms across `(x² − 9)/(x² + 5x + 6)` or falsely marking a numerator zero (`x = 3`) as an excluded value.
- **Best representation:** Interactive **Value Probe** (`x = 1, 3, -2, -3`) explicitly distinguishing `0/5 = 0` from `-5/0 = undefined`, plus numerical counter-example chip refuting term-by-term `x²` cancellation.
- **Independent transfer check:** Find excluded values of `(x + 5)/(x² − 16)` (`±4`, trapping both "only +4" and "numerator root -5").
- **Scores:** Initial build `9.1` → **Final `9.6/10`** (`M=9.5, B=9.5, C=9.5, V=10.0, A=9.5, T=9.5`).

### 5. `g10-ch3-rational-ops` — Operations on rational expressions (`Sec 3.4.3`, Ex 3.5 & 3.6 links)
- **Learning target:** Execute rational `×`, `÷` (flip divisor only), and `+ / −` (LCM denominator with bracketed subtracted numerator) without sign or cancellation errors.
- **Prior-knowledge risk:** Reciprocal of divisor vs dividend, distributive negation `-(x - 2)(x - 3)`.
- **Likely misconception:** Inverting the first fraction in division, or dropping parentheses around the subtracted numerator.
- **Best representation:** Interactive **3-Operation Switcher** displaying color-coded KaTeX `\cancel{...}` cancellations, reciprocal flip, and bracketed subtraction numerator.
- **Independent transfer check:** Subtract `2x/(x − 3) − (x − 5)/(x − 3)` (directly catches the missing-bracket `-5` sign error!).
- **Scores:** Initial build `8.7` (long fraction chain clipped at 320 px) → **Final `9.4/10`** (`M=9.5, B=9.5, C=9.5, V=9.0, A=9.5, T=9.5`).

### 6. `g10-ch3-poly-sqrt` — Square root of polynomials (`Sec 3.5`)
- **Learning target:** Compute polynomial square roots by factoring (halving even powers, taking modulus `|...|`) and by long division (doubling the current quotient at every step).
- **Prior-knowledge risk:** Absolute value modulus bars `|...|`, descending degree order, `(A + B)² = A² + (2A + B)B` identity behind doubling the quotient.
- **Likely misconception:** Halving numerical coefficients instead of taking `√` (e.g. `25 → 12.5` or omitting `|...|`), or forgetting to double the quotient in division.
- **Best representation:** Dual-tab **Factoring Cards** (splitting coefficient √ vs halved powers vs `|...|`) + **3-Step Division Doubler** (`9x⁴ − 12x³ + 10x² − 4x + 1`).
- **Independent transfer check:** Find `√[25(x + 4)²(x − 1)⁴]` (traps both `5` vs `25` and exponent halving + modulus bars).
- **Scores:** Initial build `8.8` (factor identity clipped at 320 px) → **Final `9.4/10`** (`M=9.5, B=9.5, C=9.5, V=9.0, A=9.5, T=9.5`).

### 7. `g10-ch3-quad-form` — Zeroes, roots & forming a quadratic equation (`Sec 3.6.1–3.6.2`)
- **Learning target:** Construct a quadratic equation from roots `α, β` via `x² − (α + β)x + αβ = 0` and track the middle minus sign carefully.
- **Prior-knowledge risk:** Zeroes of `p(x)` vs roots of `p(x) = 0`, Greek symbols `α, β`, Vieta's minus sign on the linear term.
- **Likely misconception:** Writing `x² + (sum)x + product = 0` (losing the `-` sign before `α + β`).
- **Best representation:** Interactive **Root-Pair Sign Builder** (`(-3, 4)` default to surface mixed-sign behavior immediately) verifying `p(α) = 0` and `p(β) = 0`.
- **Independent transfer check:** Form equation with roots `-2` and `5` (`x² − 3x − 10 = 0`, catching `+3x` sign reversal).
- **Scores:** Initial build `8.8` (320 px middle line clipped) → **Final `9.5/10`** (`M=9.5, B=9.5, C=9.5, V=9.5, A=9.5, T=9.5`).

### 8. `g10-ch3-quad-solve` — Solving quadratic equations: three methods (`Sec 3.6.3`)
- **Learning target:** Solve any quadratic equation via factoring, completing the square, or the quadratic formula `(-b ± √(b² - 4ac))/(2a)`, understanding when integers fail and why `(b/2a)²` completes a geometric square.
- **Prior-knowledge risk:** Area of a square + two rectangles `x² + 2(3x) = (x+3)² − 9`, dividing by `a` first when `a ≠ 1`.
- **Likely misconception:** Adding `b²` instead of `(b/2)²` (or `b/2` un-squared), or dropping `-b`'s initial minus sign in the quadratic formula.
- **Best representation:** **Geometric Completing-the-Square SVG** (`x²` square + two green `3x` strips + dashed missing `+9` corner, bilingual EN/TA) paired with integer-root vs irrational-root method switcher.
- **Independent transfer check:** What number must be added to both sides of `x² − 8x = −3` (`(-4)² = 16`, catching `-8`, `4`, `64`).
- **Scores:** Initial build `8.4` (`squareSvg` right text clipped at 320 px + English-only SVG text in TA) → **Final `9.6/10`** (`M=9.5, B=9.5, C=9.5, V=10.0, A=9.5, T=9.5`).

### 9. `g10-ch3-discriminant` — Nature of roots & discriminant `Δ = b² − 4ac` (`Sec 3.6.5`)
- **Learning target:** Classify roots from `Δ = b² − 4ac` (`Δ > 0`, `Δ = 0`, `Δ < 0`) and connect the sign of `Δ` geometrically to how many times `y = ax² + bx + c` meets the x-axis.
- **Prior-knowledge risk:** Greek `Δ`, standard form `ax² + bx + c = 0`, x-intercepts as real roots.
- **Likely misconception:** Reading `Δ = 0` as "no solution" or omitting `Δ = 0` when a question specifies "real roots" (`Δ ≥ 0`).
- **Best representation:** Live **Parabola x-Axis Crossing SVG** toggling `c ∈ {0, 3, 4, 5, 7}` in `y = x² − 4x + c` so vertical shifts directly turn `2` green crossings into `1` gold tangent point into `0` crossings!
- **Independent transfer check:** Determine the nature of roots of `2x² − 6x + 5 = 0` (`Δ = −4 < 0 ⇒ no real roots`).
- **Scores:** Initial build `8.9` (`exampleMath` clipped at 320 px; SVG parabola touched top-left text) → **Final `9.6/10`** (`M=9.5, B=9.5, C=9.5, V=10.0, A=9.5, T=9.5`).

### 10. `g10-ch3-roots-coeff` — Symmetric expressions in `α` and `β` (`Sec 3.6.6`)
- **Learning target:** Evaluate symmetric combinations (`α² + β²`, `(α − β)²`, `1/α + 1/β`, `α³ + β³`) purely from `α + β` and `αβ` without solving messy roots.
- **Prior-knowledge risk:** Binomial expansions `(α + β)²`, `(α + β)³`, fraction addition.
- **Likely misconception:** Assuming `(α + β)² = α² + β²` (forgetting `-2αβ`) or substituting `α + β = b/a` without the minus sign.
- **Best representation:** **Symmetric Identity Rewriter** toggling 4 classic TN textbook identities for `x² − 5x + 6 = 0` with explicit independent verification against actual roots `3, 2`.
- **Independent transfer check:** Evaluate `α² + β²` for `x² − 7x + 10 = 0` (`7² − 2(10) = 29`, catching `7² = 49` misconception directly).
- **Scores:** Initial build `8.8` (long identity chains clipped at 320 px) → **Final `9.4/10`** (`M=9.5, B=9.5, C=9.5, V=9.0, A=9.5, T=9.5`).

### 11. `g10-ch3-variations` — Direct & inverse variation graphs (`Sec 3.7`)
- **Learning target:** Distinguish direct variation (`y/x = k`, line through `(0, 0)`) from inverse variation (`xy = k`, hyperbola never touching axes) by invariant testing on `(x, y)` pairs.
- **Prior-knowledge risk:** Ratio vs product invariance, proportional scaling, hyperbola asymptote behavior.
- **Likely misconception:** Solving an inverse work-rate problem ("4 pumps in 6 hours → 3 pumps") directly as `6 × 3/4 = 4.5 hours` instead of keeping product `4 × 6 = 3 × t ⇒ 8 hours`.
- **Best representation:** Dual-mode **Ratio vs Product SVG Graph** with selectable `x ∈ {1, 2, 3, 4, 6}` highlighting points cleanly along `y = 2x` vs `xy = 12` and printing the invariant `y/x = 2` vs `x·y = 12`.
- **Independent transfer check:** 4 identical pumps fill a tank in 6 hours → time for 3 pumps (`8 hours`, specifically trapping the `4.5 hours` direct-ratio mistake!).
- **Scores:** Initial build `8.6` (SVG label overlap at `(6, 12)`, untranslated TA caption, 320 px `exampleMath` width `320 > 260`) → **Final `9.5/10`** (`M=9.5, B=9.5, C=9.5, V=9.5, A=9.5, T=9.5`).

### 12. `g10-ch3-quad-graphs` — Quadratic graphs: parabolas & line intersection (`Sec 3.8.1–3.8.2`)
- **Learning target:** Interpret how `|a|` and `sign(a)` shape `y = ax²`, and find the line `y = -(bx + c)` to intersect with a drawn parabola `y = ax²` by subtracting the two equations.
- **Prior-knowledge risk:** Reading x-coordinates (not y-coordinates!) of intersection points `(x₁, y₁)` and `(x₂, y₂)` as roots.
- **Likely misconception:** Adding instead of subtracting `(x² − x − 2) = 0` from `y = x²` (yielding `y = -x - 2` instead of `y = x + 2`), or reading `y = 1, 4` as roots instead of `x = -1, 2`.
- **Best representation:** Two-mode **Shape & Intersection SVG**: Mode 0 inspects `y = x², 3x², ¼x², −x²`; Mode 1 draws `y = x²` intersecting `y = x + 2` with dashed vertical drops to `x = −1` and `x = 2`.
- **Independent transfer check:** Given `y = x²`, find the intersecting line to solve `x² − 5x + 6 = 0` (`y = 5x − 6`, catching `y = -5x + 6` sign error).
- **Scores:** Initial build `8.7` (intersection line text clipped at 320 px; mode 0 curve label touched curve) → **Final `9.6/10`** (`M=9.5, B=9.5, C=9.5, V=10.0, A=9.5, T=9.5`).

### 13. `g10-ch3-matrix-types` — Matrix order, indexing & types (`Sec 3.9.1–3.9.2`)
- **Learning target:** Read matrix order `(rows × columns)`, index entries `aᵢⱼ` row-first, classify special matrices (diagonal ⊃ scalar ⊃ identity), and form transpose `Aᵀ`.
- **Prior-knowledge risk:** Confusion between `a₁₂` and `a₂₁`; nesting hierarchy (`Identity ⇒ Scalar ⇒ Diagonal`).
- **Likely misconception:** Counting columns before rows (`3 × 2` instead of `2 × 3`) or writing `aᵢⱼ` column-first.
- **Best representation:** Interactive **Tap-a-Cell Matrix & Transpose Switcher** (tapping any entry cross-highlights its full row and column, prints `Order = m × n, aᵢⱼ`, and toggles `A ↔ Aᵀ`), plus a 6-type gallery.
- **Independent transfer check:** If `A` has order `3 × 4`, find order of `Aᵀ` (`4 × 3`, trapping `3 × 4` unchanged).
- **Scores:** Initial build `8.8` (`A ⇒ Aᵀ` side-by-side matrix clipped at 320 px) → **Final `9.5/10`** (`M=9.5, B=9.5, C=9.5, V=9.5, A=9.5, T=9.5`).

### 14. `g10-ch3-matrix-ops` — Operations on matrices (`Sec 3.9.3`)
- **Learning target:** Verify dimension compatibility `A_{m×n} · B_{n×p} = (AB)_{m×p}`, compute dot-product cells via row-of-A × column-of-B, and recognize non-commutativity (`AB ≠ BA`) and zero-divisors (`AB = O` with `A, B ≠ O`).
- **Prior-knowledge risk:** Inner dimensions matching (`cols(A) = rows(B)`), distinction between element-wise addition and row×column multiplication.
- **Likely misconception:** Multiplying entry-by-entry like addition, assuming `AB = BA`, or concluding `AB = O ⇒ A = O or B = O`.
- **Best representation:** Interactive **Row × Column Tracer** where tapping any output entry highlights the exact contributing row in left matrix and column in right matrix, alongside `Compute BA` comparison and `AB = O` counterexample tabs.
- **Independent transfer check:** For `P` (`2 × 3`) and `Q` (`3 × 4`), find the order of `PQ` (`2 × 4`, trapping both inner `3 × 3` and "undefined" errors).
- **Scores:** Initial build `8.9` (dot-product trace wrapped tightly at 320 px) → **Final `9.6/10`** (`M=9.5, B=9.5, C=9.5, V=10.0, A=9.5, T=9.5`).

---

## Automated Verification Summary

- `node site/tools/test_g10_ch3_concepts.cjs` — verifies all 14 stages, EN + TA draft presence & banner, KaTeX rendering with bundled offline KaTeX, balanced MCQ positions, `mathAPI` arithmetic proofs, Ex `3.1`–`3.6` links, SW asset precache, and Ch 2 non-modification invariants.
- `CHROMIUM_PATH=/usr/bin/chromium node site/tools/test_g10_ch3_concepts_browser.cjs` — verifies discovery → chapter hub → concept index (`14`) → lesson UX (`CONCEPTS_UX_SCHEMA.md`), keyboard Tab+Enter nav, collapsible deep dive, Try-it wrong → Hint → correct → Why → Ex 3.1 link → browser Back (`concept=0`), all 14 concepts across `320 / 360 / 393 / 430 px` portrait with zero horizontal overflow, zero clipped KaTeX boxes (`scrollWidth <= clientWidth + 2`), `>= 44 px` touch targets, all 14 interactive labs, EN + TA rendering, and offline Service Worker persistence.
- `npm test` and release browser checks (exact pass output recorded in PR & Final Report).
