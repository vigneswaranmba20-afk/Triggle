# TRIGGLE — ANTIGRAVITY AUDIT CLOSURE REPORT

**Date:** 23 November 2026  
**Repository:** [`vigneswaranmba20-afk/Triggle`](https://github.com/vigneswaranmba20-afk/Triggle)  
**Scope:** Grades 9 and 10 only (per active 23 Nov 2026 Grade Policy)  
**Pull Request:** [PR #376](https://github.com/vigneswaranmba20-afk/Triggle/pull/376) (`fix/antigravity-audit-closure-20261123`)  
**Tracked Issues:** [#339](https://github.com/vigneswaranmba20-afk/Triggle/issues/339) (Wave 1 Audit Ledger), [#346](https://github.com/vigneswaranmba20-afk/Triggle/issues/346) (G9 Ch 6 Ex 6.4 Q2–Q3), [#331](https://github.com/vigneswaranmba20-afk/Triggle/issues/331) (`AUD05-04` G10 Ch 6 Concept SVGs), [#329](https://github.com/vigneswaranmba20-afk/Triggle/issues/329) (M03 Mobile Pager Viewport Verification)

---

## 1. Executive Summary & Audit Inventory Metrics

We reconciled the complete audit backlog across the **Gemini Continuous Excellence Audit Ledger** (`1jWqBgH2k2zQHEe3_JlgUHE2QXMx0d67X0W2RuEt2n6U`), the **AF-09/AF-10R Weekend Audit Ledger** ([`docs/audit/WEEKEND_AF09_FIX_LOG.md`](docs/audit/WEEKEND_AF09_FIX_LOG.md)), the **TRACE Wave 1 Execution Packet** ([`docs/audit/TRACE_AUDIT_WAVE1.md`](docs/audit/TRACE_AUDIT_WAVE1.md)), and open GitHub Issues (`#339`, `#346`, `#331`, `#329`).

### A. Historical Wave-1 Baseline (`AUD01-01`..`AUD14-06` + `USER-AF09-01/02`)

| Metric | Count | Details |
|---|---:|---|
| **Total unique Wave-1 audit IDs** | **88** | **86** workbook findings (`AUD01-01` through `AUD14-06`) + **2** user-reported P0 findings (`USER-AF09-01`, `USER-AF09-02`) |
| **Already live-verified at baseline** | **14** | 11 `CLOSED_LIVE_VERIFIED` items in `WEEKEND_AF09_FIX_LOG.md` (`USER-AF09-01`, `USER-AF09-02`, `AUD01-01`, `AUD01-02`, `AUD01-05`, `AUD03-01`, `AUD06-02`, `AUD06-05`, `AUD06-06`) + 5 workbook-resolved Wave-1 items (`AUD13-02`, `AUD14-02`, `AUD14-03`, and overlapping AF-09 closures) |
| **Number initially open / unverified** | **74** | 34 `FIXED_NOT_LIVE_VERIFIED` items in `WEEKEND_AF09_FIX_LOG.md` + 1 `BLOCKED_SOURCE` (`AUD04-06`) + 2 `OPEN_REPRODUCED` (`AUD05-04`, `AUD07-01`) + 37 unverified `AUD08`–`AUD14` workbook items |
| **Previously fixed findings newly live-verified** | **44** | All **34** `FIXED_NOT_LIVE_VERIFIED` AF-09/AF-10R findings verified on live GitHub Pages across 4 Playwright shards (`174/174` screens in `test_audit_wave1_live_browser.cjs`) + **10** `AUD08`–`AUD14` items already fixed in `main` by PRs `#334`, `#340`–`#375` and newly live-verified (`AUD08-06`, `AUD11-02`, `AUD11-04`, `AUD11-05`, `AUD13-01` Ex 5.2, `AUD13-03`, `AUD13-04`, `AUD13-05`, `AUD14-01` Ex 6.4 Q2–Q3 / Issue `#346`, `AUD14-04`) |
| **Newly fixed findings in PR #376** | **16** (Wave-1) | `AUD04-06`, `AUD05-04` (Issue `#331`), `AUD05-05`, `AUD08-05`, `AUD09-01`, `AUD09-02`, `AUD09-03`, `AUD09-05`, `AUD09-06`, `AUD10-04`, `AUD10-06`, `AUD11-03`, `AUD11-06`, `AUD12-06`, `AUD13-06`, `AUD14-06` |
| **Newly fixed findings in Extended Backlog (`AUD15`–`AUD23` + `#329`)** | **11** (Extended) | `AUD15-06`, `AUD16-05`, `AUD16-06`, `AUD18-04`, `AUD21-01`, `AUD21-03`, `AUD23-02`, `AUD23-03`, `AUD23-04`, `AUD23-05`, and Issue `#329` (`test_neon_m03_live_browser.cjs`) |
| **Total newly fixed findings (PR #376)** | **27** | 16 Wave-1 IDs + 10 Extended `AUD15`–`AUD23` IDs + Issue `#329` |
| **Stale or no longer reproducible** | **3** | Issue `#329` CSS overlap hypothesis (caused by `fullPage: true` screenshot stitch in `test_neon_m03_live_browser.cjs`; true viewport has 110px clearance), `AUD16-04` (already wired in PR `#358`), `AUD23-06` (all 74 G10 Ch 1 items already have Why-steps) |
| **Unresolved / Blocked (Wave-1)** | **14** | Multi-week net-new curriculum authoring (missing Concept Studios for G9 Ch 3/4/5/6 and G10 Ch 1/8, missing exercises in G9 Ch 3/4/5 and G10 Ch 8) or items guarded by the 568-record SHA-256 preservation contract |

### B. Full Ledger Summary (`AUD01-01`..`AUD23-06` = 140 Workbook IDs + 2 User IDs = 142 Total)

| Category | Wave-1 (`AUD01`–`AUD14` + `USER-AF09`) | Extended (`AUD15`–`AUD23`) | Combined Total |
|---|---:|---:|---:|
| 1. Already live-verified (`CLOSED_LIVE_VERIFIED`) | 14 | 0 | **14** |
| 2. Previously fixed findings newly live-verified (`NEWLY_LIVE_VERIFIED`) | 44 | 3 | **47** |
| 3. Newly fixed in PR #376 (`NEWLY_FIXED`) | 16 | 10 (+ Issue `#329`) | **26** (+ `#329` = **27**) |
| 4. Stale or no longer reproducible (`STALE_OR_NOT_REPRODUCIBLE`) | 0 (+ Issue `#329` CSS) | 2 (`AUD16-04`, `AUD23-06`) | **2** (+ `#329`) |
| 5. Confirmed unresolved / Blocked by scope or hash preservation (`UNRESOLVED_OR_BLOCKED`) | 14 | 39 | **53** |
| **Total Unique Audit IDs** | **88** | **54** | **142** |

---

## 2. Priority GitHub Issues Addressed (`#346`, `#331`, `#329`, `#339`)

### 2.1 Issue `#346` — Live Verification of Grade 9 Chapter 6 Exercise 6.4 Q2 & Q3 (`AUD14-01`)
- **Status:** **LIVE-VERIFIED ON PRODUCTION (`42/42` checks passed)**
- **Evidence:** Ran `SITE_BASE_URL="https://vigneswaranmba20-afk.github.io/Triggle/site/index.html" node site/tools/test_g9_ex64_q2_q3_browser.cjs` against live GitHub Pages (`0ffe0d76169c03b8ec9d7529fdd144881d6f9a4b`).
- **Verification:** Confirmed all 7 subparts (`g9-ch6-ex6.4-q2-i..v`, `g9-ch6-ex6.4-q3-i..ii`) across EN and தமிழ் at `320×640`, `390×844`, and `430×932` (`7 × 2 × 3 = 42` states). Verified exact 2025 textbook four-figure table method (`+` for natural sines/tangents, `−` for natural cosines), exact printed answers (`0.9399`, `0.3849`, `2.7907` with Answer Appendix `2.7903` note, `0.9097`, `0.5835`, `36° 52'`, `80° 23'`), zero horizontal overflow, and clean KaTeX rendering.

### 2.2 Issue `#331` (`AUD05-04` & `AUD05-05`) — Grade 10 Chapter 6 Trigonometry Concept Studio SVGs & Page Citations
- **Status:** **NEWLY FIXED & VERIFIED IN PR #376**
- **Root Causes Fixed:**
  1. **Concept 1 (`trig-ratios`):** Replaced fixed vertical offset (`y - 6`) on hypotenuse label `OP = ...` with normal-vector perpendicular offset (`nx, ny`) above ray `OP` and adjusted angle label offsets across `15°..75°` and `scale = 0.6..1.3`, eliminating all ray/text intersections.
  2. **Concept 2 (`quotient-reciprocal`):** Widened SVG `viewBox` to `0 0 326 190` and shifted `xO` to `38` so `sin 15° ≈ 0.259` has `> 12px` right-edge padding and never clips.
  3. **Concept 3 (`complementary-angles`):** Adjusted `90° − θ` and `cos θ = sin(90° − θ)` label positions when `θ >= 70°` so narrow rectangles never collide with top/diagonal labels.
  4. **Concept 6 (`identity-sin-cos`):** Wrapped the display formula `\sin^2\theta + \cos^2\theta = 1` rearrangements into 3 aligned lines in [`site/data/g10-ch6-concepts.js`](site/data/g10-ch6-concepts.js), eliminating the 3px overflow (`247px > 244px`) at `320px` width.
  5. **Concept 9 (`angle-depression`):** Repositioned horizon label `X` to `(xT + 148, yTop - 6)` clear of the dashed sight ray.
  6. **Concept 10 (`combined-heights`):** Separated ground label `x ≈ ...` (`y = 172`) from angle label `α = 60°` (`y = 153`) in `shared` mode, and added explicit `α, β, h₁` angle and height labels in `two-same` and `two-opposite` modes.
  7. **Textbook Page Citations (`AUD05-05`):** Updated [`site/assets/chapter-hub.js`](site/assets/chapter-hub.js) (`isStudio6` renderer) to append `· EN p.<en> · TA p.<ta>` from `stage.page` onto `.sp2-stage-reference`.
- **Automated Regression Gate:** Added AABB text-collision, right-edge clipping, and page-citation assertions to [`site/tools/test_g10_ch6_concepts_browser.cjs`](site/tools/test_g10_ch6_concepts_browser.cjs) (`PASS` across EN/TA at `320px` and `390px`).

### 2.3 Issue `#329` — Mobile Bottom Pager & Viewport Screenshot Verification (`test_neon_m03_live_browser.cjs`)
- **Status:** **NEWLY FIXED & VERIFIED IN PR #376 (CSS Overlap Hypothesis Disproved)**
- **Root Cause:** In the live app, `#main` is not an inner scroll container (`scrollHeight === clientHeight`), and `.content-pad` already reserves `padding-bottom: calc(108px + env(safe-area-inset-bottom))`. The previous test called `el.scrollTop = el.scrollHeight` on `#main` (a no-op) and captured a `fullPage: true` screenshot, which in Chromium headless composites `position: fixed` elements (`#questionNavDock`) at the top viewport's coordinates over the stitched full-page image.
- **Fix:** Updated [`site/tools/test_neon_m03_live_browser.cjs`](site/tools/test_neon_m03_live_browser.cjs) to scroll `window` to the bottom (`window.scrollTo(0, document.documentElement.scrollHeight)`), assert that `#questionNavDock.top - lastStep.bottom >= 12px` (measured live clearance: **110px**), and capture true viewport screenshots (`fullPage: false`) at the bottom of the question view.

---

## 3. Detailed Summary of All 27 Newly Fixed Findings in PR #376

| Audit ID | Grade / Chapter | Defect Fixed | Files Modified | Verification Test |
|---|---|---|---|---|
| **Issue #331 / `AUD05-04`** | G10 Ch 6 (Trigonometry) | Interactive SVG label collisions across `concept=0,1,2,8,9`, right-edge clipping of `sin 15° ≈ 0.259`, missing `α, β, h₁` labels in `two-same`/`two-opposite`, and 3px KaTeX overflow on `concept=5` at 320px | `site/assets/g10-ch6-concepts.js`, `site/data/g10-ch6-concepts.js`, `site/tools/test_g10_ch6_concepts_browser.cjs` | `node site/tools/test_g10_ch6_concepts_browser.cjs` (PASS) |
| **`AUD05-05`** | G10 Ch 6 (Trigonometry) | `.sp2-stage-reference` in `isStudio6` omitted `stage.page.en` and `stage.page.ta` citations | `site/assets/chapter-hub.js` | `node site/tools/test_g10_ch6_concepts_browser.cjs` (PASS) |
| **`AUD04-06`** | G10 Ch 5 (Coordinate Geometry) | Missing 2025 EN/TA page citations across all 12 stages and coordinate handle label collisions with X-axis ticks (`A(-4,-1)` with `-2` in `concept=0`, `A(-2,-1)` with `O` in `concept=4,8`) | `site/data/g10-ch5-concepts.js`, `site/assets/g10-ch5-concepts.js`, `site/assets/chapter-hub.js`, `site/tools/test_g10_ch5_concepts_browser.cjs` | `node site/tools/test_g10_ch5_concepts_browser.cjs` (PASS) |
| **Issue #329** | G10 Ch 3 / Mobile Pager | `test_neon_m03_live_browser.cjs` scrolled `#main` instead of `window` and used `fullPage: true`, creating false fixed-pager overlap artifacts | `site/tools/test_neon_m03_live_browser.cjs` | `node site/tools/test_neon_m03_live_browser.cjs` (PASS, 110px clearance) |
| **`AUD16-05`** | G9 Ch 6 (Trigonometry) | Missing perpendicular symbol `⊥` (`AD BC` instead of `AD ⊥ BC` in Ex 6.1 Q2), glued `(iv) cos C (v) tan C`, English article `'A 5 m'` parsed as math variable `A`, compound angle `36° 52'` split across lines, and `'4′ mean'` merged in Ex 6.4 Q5 | `site/tools/g9_math_compiler.cjs`, `site/data/g9-clear-math.js` | `node site/tools/test_g9_clear_math.cjs` (PASS) |
| **`AUD11-03`** | G9 Ch 3 (Algebra) | `g9-ch3-ex3.1-q5-iii` rendered `16_{x^4}` (`it’s` apostrophe triggered subscript mode in `build_g9_math.cjs`) and `g9-ch3-ex3.1-q7/q8` spliced `+ P(x) =` / `- P(x) =` in `questionMath.en` instead of `"to get"` | `site/tools/build_g9_math.cjs`, `site/data/textbook-exercises/g9-ch3-ex3-1-q3-q9-en.js`, `site/data/g9-clear-math.js` | `node site/tools/test_g9_ch3_ex31_q3_q9.cjs` & `test_g9_clear_math.cjs` (PASS) |
| **`AUD09-01`** | G10 Ch 2 (Numbers & Sequences) | `.sp2-lesson-note` and `.sp2-stage-reference` were suppressed on 5 video-enabled stages (`concept=2, 10, 12, 13, 14`), hiding written notes and citations for offline learners | `site/assets/chapter-hub.js`, `site/data/g10-ch2-concepts.js` | `node site/tools/test_g10_ch2_concept_quality.cjs` (PASS) |
| **`AUD09-02`** | G10 Ch 2 (Numbers & Sequences) | Added verified 2025 EN/TA page citations (`stage.page`) across all 15 G10 Ch 2 concepts | `site/data/g10-ch2-concepts.js` | `node site/tools/test_g10_ch2_concept_quality.cjs` (PASS) |
| **`AUD09-03`** | G10 Ch 2 (Numbers & Sequences) | Concepts 5–15 (`concept=4..14`) lacked `practiceId` deep-link buttons to Exercises 2.1–2.10 | `site/data/g10-ch2-concepts.js`, `site/tools/test_g10_ch2_concept_quality.cjs` | `node site/tools/test_g10_ch2_concept_quality.cjs` (PASS) |
| **`AUD09-05`** | G10 Ch 2 (Numbers & Sequences) | Added explicit pedagogical notes on symmetric 3-term A.P. selection (`a − d, a, a + d` so `d` cancels in the sum) on `g10-ch2-ap-nth` and 3-term G.P. selection (`a/r, a, ar` so `r` cancels in the product) on `g10-ch2-gp-nth` | `site/data/g10-ch2-concepts.js`, `site/tools/test_g10_ch2_concept_quality.cjs` | `node site/tools/test_g10_ch2_concept_quality.cjs` (PASS) |
| **`AUD10-04`** | G9 Ch 7 (Mensuration) | `g9-ch7-volume` linked only to Ex 7.3 Q1 (`practiceId`) without a direct bridge to Exercise 7.4 capacity problems (`secondaryPracticeId: "g9-ch7-ex7.4-q1"`) | `site/data/g9-mensuration-remaining.js`, `site/assets/chapter-hub.js` | `node site/tools/test_g9_mensuration_concepts.cjs` (PASS) |
| **`AUD18-04`** | G10 Ch 3 (Algebra) | 123 Grade 10 Chapter 3 Algebra exercise items across Exercises 3.1–3.14 lacked step-specific `"Why this step?"` explanations | `site/data/why-step-g10-coverage.js`, `site/tools/test_why_step_g10.cjs` | `node site/tools/test_why_step_g10.cjs` & `test_why_step_g10_coverage_browser.cjs` (PASS, 268/268 G10 items) |
| **`AUD21-01`** | G10 Ch 3 (Ex 3.12 Q5) | In `ex3-12-q5-circle-gates.svg`, left chord `PR` labeled `(x + 4) m` (16 m) was drawn visually shorter (`94.7 px`) than right chord `QR` labeled `x m` (12 m, `114.6 px`) | `site/assets/grade10-ch3/ex3-12-q5-circle-gates.svg` | `node site/tools/test_g10_ch3_concepts_browser.cjs` (PASS, `PR = 118.4 px > QR = 88.8 px`, 4:3 ratio) |
| **`AUD21-03`** | G10 Ch 3 (Algebra Concepts 6–10) | Concepts 6–10 (`g10-ch3-rational-lowest` through `g10-ch3-roots-relations`) had zero deep-link buttons to Exercises 3.7–3.14 | `site/data/g10-ch3-concepts.js`, `site/assets/chapter-hub.js`, `site/tools/test_g10_ch3_concepts.cjs` | `node site/tools/test_g10_ch3_concepts.cjs` & `test_g10_ch3_concepts_browser.cjs` (PASS) |
| **`AUD23-02`** | G10 Ch 1 (Ex 1.2 Q4) | `ex1-2-q4.svg` (ii) omitted natural numbers `1` and `5..9` from the arrow ovals and lacked numerical axis ticks on the graph | `site/assets/grade10-ch1/ex1-2-q4.svg` | `node site/tools/test_g10_ch1_chatgpt_math_browser.cjs` (PASS) |
| **`AUD23-03`** | G10 Ch 1 (Ex 1.4 Q2 & Q3) | `ex1-4-q2.svg` and `ex1-4-q3.svg` showed only 3 of the 4 required representations (omitting the Table representation in Q2 and Arrow Diagram/ticks in Q3) | `site/assets/grade10-ch1/ex1-4-q2.svg`, `site/assets/grade10-ch1/ex1-4-q3.svg` | `node site/tools/test_g10_ch1_chatgpt_math_browser.cjs` (PASS) |
| **`AUD23-04`** | G10 Ch 1 (Ex 1.4 Q9 & Ex 1.6 Q7) | `c10-1-1-4-q9` piecewise prompt rendered raw semicolon string without `\begin{cases}`, `c10-1-1-6-q7` rendered plain `2^mn`, and 6 `\text{...}` boundaries lacked spaces (`Notafunction`, `Onto:Range=B`, `576xcm³`) | `site/data/math-layout/g10-ch1-chatgpt-20261113.js` | `node site/tools/test_g10_ch1_chatgpt_math.cjs` & `test_g10_ch1_chatgpt_math_browser.cjs` (PASS) |
| **`AUD23-05`** | G10 Ch 1 (Ex 1.4 Q1 & Tamil captions) | `figure1-4-graphs.svg` lacked dashed vertical test lines and intersection markers `P, Q`, and `ch1SvgFigures` in `app.js` rendered English captions/alt text in Tamil mode | `site/assets/grade10-ch1/figure1-4-graphs.svg`, `site/assets/app.js` | `node site/tools/test_g10_ch1_chatgpt_math_browser.cjs` (PASS) |
| **`AUD08-05`, `AUD09-06`, `AUD10-06`, `AUD11-06`, `AUD12-06`, `AUD13-06`, `AUD14-06`, `AUD15-06`, `AUD16-06`** | G9 Ch 1–9 & G10 Ch 1–8 Sources | Updated all Grade 9 and Grade 10 chapter `sourceRefs` in `site/data/curriculum.js` to verified 2025 English and Tamil Google Drive textbook editions with exact printed and PDF page ranges (`tn-g10-en-2025-drive`, `tn-g10-ta-2025-drive`) | `site/data/curriculum.js` | `node site/tools/test_curriculum.cjs` & `test_2025_textbook_Provenance.cjs` (PASS) |

---

## 4. Complete Per-ID Reconciliation Table (`AUD01-01`..`AUD23-06` + `USER-AF09-01/02`)

### 4.1 Wave-1 Historical Inventory (`AUD01-01`..`AUD14-06` + `USER-AF09-01/02` = 88 Unique IDs)

| ID | Priority | Scope | Reconciliation Category | Evidence / PR / Status |
|---|---|---|---|---|
| `USER-AF09-01` | P0 | G10 Ch 6 Unit Ex 6 Q2, Concepts & Difficulty (`∓` / mobile overflow) | Already live-verified | Closed in PR `#317` (`647d893e`), re-verified in `test_af09_ch6_fixes.cjs` |
| `USER-AF09-02` | P0 | G10 Ch 6 All 23 Exercise SVGs orientation, collisions & halos | Already live-verified | Closed in PR `#317` (`647d893e`), re-verified in `test_af09_ch6_fixes.cjs` |
| `AUD01-01` | P0 | G9 Sets Venn interactive / `U`, `A'`, sym diff (`concept=3`) | Already live-verified | Closed in PR `#280` (`9c671e85`) |
| `AUD01-02` | P1 High | G9 Sets cardinality notation & `"11sum"` (`concept=6`) | Already live-verified | Closed in PR `#283` (`f39cc24e`) |
| `AUD01-03` | P1 High | G9 Sets distributive-law visual verification (`concept=4`) | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 0 (`test_audit_wave1_live_browser.cjs`) |
| `AUD01-04` | P1 High | G9 Sets Tamil webfont & toggle state (`concept=0-6`) | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 0 |
| `AUD01-05` | P1 High | G9 Sets power-set / proper-subset bridge (`concept=2`) | Already live-verified | Closed in PR `#312` (`805ab3be`) |
| `AUD01-06` | P2 Med | G9 Sets De Morgan difference & SVG collisions (`concept=5`) | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 0 |
| `AUD01-07` | P2 Med | G9 Sets `\mathbb{N}`, `∈`, `:` clarity (`concept=1`) | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 0 |
| `AUD01-08` | P2 Med | G9 Sets mismatched chip typography & orphan wrap (`concept=0`) | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 0 |
| `AUD02-01` | P0 | G9 Real Numbers `(ⁿ√a)^m`, exponent `\frac{m}{n}`, tofu (`concept=3,7`) | Previously fixed, newly live-verified | Fixed in PR `#318` (`c21b479d`), live-verified in Wave 1 shard 0/1 |
| `AUD02-02` | P1 High | G9 Real Numbers 10-subinterval number line & `√2` bounds (`concept=2`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 1 |
| `AUD02-03` | P1 High | G9 Real Numbers tiny radical-pill scrollbars (`concept=1,4,5,7`) | Previously fixed, newly live-verified | Fixed in PR `#313` (`25e405e6`), live-verified in Wave 1 shard 1 |
| `AUD02-04` | P1 High | G9 Real Numbers unlike-order surds LCM comparison (`concept=4`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 1 |
| `AUD02-05` | P2 Med | G9 Real Numbers recurring overbar & period/domain (`concept=1`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 1 |
| `AUD02-06` | P2 Med | G9 Real Numbers gcd slider & scientific notation (`concept=0,6`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 1 |
| `AUD03-01` | P0 | G10 Algebra root-difference radicand raw tokens (`concept=9`) | Already live-verified | Closed in PR `#318` (`c21b479d`) |
| `AUD03-02` | P0 | G10 Algebra MathML `<mi>` tofu box glyphs across 9 lessons | Previously fixed, newly live-verified | Fixed in PR `#318` (`c21b479d`), live-verified in Wave 1 shard 1/2 |
| `AUD03-03` | P1 High | G10 Algebra long-choice scrollbars & remainder bridge (`concept=5`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 2 |
| `AUD03-04` | P1 High | G10 Algebra `Δ > 0` rational vs irrational split (`concept=8`) | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 2 |
| `AUD03-05` | P2 Med | G10 Algebra `(AB)^T = B^T A^T` & distributivity (`concept=12,13`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 2 |
| `AUD03-06` | P2 Med | G10 Algebra SVG collisions & verified citations (`concept=0,11`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 2 |
| `AUD04-01` | P1 High | G10 Coord Geometry division-by-zero slope & signs (`concept=11`) | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 2 |
| `AUD04-02` | P1 High | G10 Coord Geometry slider sync & slope state (`concept=0,8`) | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 2 |
| `AUD04-03` | P1 High | G10 Coord Geometry exact fractions vs rounded equalities (`concept=1,5,10`) | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 2 |
| `AUD04-04` | P2 Med | G10 Coord Geometry stem/option `45°` match (`concept=4`) | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 3 |
| `AUD04-05` | P2 Med | G10 Coord Geometry slider label spacing & header scroll-margin | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 3 |
| `AUD04-06` | P2 Med | G10 Coord Geometry SVG point-label collisions & page citations | **Newly fixed in PR #376** | Fixed `drawHandle` X-axis tick avoidance (`y + 15`) + added all 12 EN/TA 2025 page locators in `g10-ch5-concepts.js` & `chapter-hub.js` |
| `AUD05-01` | P1 High | G10 Trig `45°` wall-angle trap & missing angle arg | Previously fixed, newly live-verified | Fixed in PR `#311` (`57ea35a9`), live-verified in Wave 1 shard 3 |
| `AUD05-02` | P1 High | G10 Trig MathML variable tofu boxes (`sin`, `cos`, `x`) | Previously fixed, newly live-verified | Fixed in PR `#318` (`c21b479d`), live-verified in Wave 1 shard 3 |
| `AUD05-03` | P1 High | G10 Trig rounded decimal division false equality | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 3 |
| `AUD05-04` | P1 High | G10 Trig overlapping ray/side labels & concept SVGs (**Issue #331**) | **Newly fixed in PR #376** | Fixed all SVG collisions/clipping across `concept=0..9` and 320px formula wrap in `g10-ch6-concepts.js` |
| `AUD05-05` | P1 High | G10 Trig symbol defs & textbook page citations | **Newly fixed in PR #376** | Rendered `stage.page.en` & `stage.page.ta` in `.sp2-stage-reference` (`site/assets/chapter-hub.js`) |
| `AUD05-06` | P1 High | G10 Trig MCQ answer independence | Previously fixed, newly live-verified | Fixed in PR `#321`, live-verified in Wave 1 shard 3 |
| `AUD06-01` | P0 | G9 Probability Ex 9.2 Q5 HTML table / `43/75` vs `37/50` | Previously fixed, newly live-verified | Fixed in PR `#314` (`121d3346`), live-verified in Wave 1 shard 3 |
| `AUD06-02` | P0 | G9 Probability `P(A or B)` disjoint vs overlap (`concept=4`) | Already live-verified | Closed in PR `#318` (`c21b479d`) |
| `AUD06-03` | P1 High | G9 Probability verified EN/TA citations & Connect links (`concept=0..4`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 3 |
| `AUD06-04` | P1 High | G9 Probability stale under-dev banners & G10 Ch 6 sidebar count | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 3 |
| `AUD06-05` | P1 High | G9 Probability coin / prime faces / `n(S)=36` (`concept=1,2`) | Already live-verified | Closed in PR `#319` (`87ca6ed1`) |
| `AUD06-06` | P2 Med | G9 Probability Toss 100 & `r/n` readout / reset (`concept=3`) | Already live-verified | Closed in PR `#319` (`87ca6ed1`) |
| `AUD07-01` | P0 | G10 Ch 1 & Ch 8 interactive Concept Studio modules absent | Confirmed unresolved (Net-new module) | Requires full 6–10 lesson interactive Concept Studio authoring for G10 Ch 1 and Ch 8 |
| `AUD07-02` | P0 | G10 Relations & Functions arrow/graph/table diagrams (Ex 1.2–1.4) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 3 (further enhanced in PR `#376` under `AUD23-02/03`) |
| `AUD07-03` | P0 | G10 Ex 1.5/1.6/Unit1 tofu-box variables (`x² − 3x`, `y² + 4y`) | Previously fixed, newly live-verified | Fixed in PR `#318` (`c21b479d`), live-verified in Wave 1 shard 3 |
| `AUD07-04` | P1 High | G10 Ch 1 concatenated KaTeX prose & units (`Notafunction`, `576xcm³`) | Previously fixed, newly live-verified | Fixed in PR `#318` (`c21b479d`), live-verified in Wave 1 shard 3 (and 6 remaining overlay tokens fixed in PR `#376` under `AUD23-04`) |
| `AUD07-05` | P1 High | G10 Ch 1 bleeding raster textbook crops (`Ex 1.3 Q4,Q7, Ex 1.4 Q1`) | Previously fixed, newly live-verified | Fixed in PR `#320` (`7527972d`), live-verified in Wave 1 shard 3 |
| `AUD07-06` | P2 Med | G10 Ch 1 blank Tamil Sources title & toggle | Previously fixed, newly live-verified | Fixed in PR `#319` (`87ca6ed1`), live-verified in Wave 1 shard 3 |
| `AUD08-01` | P0 | G10 Ch 8 missing Ex 8.3–8.5 & Unit 8 + Concept Studio | Confirmed unresolved (Net-new syllabus batch) | Exercises 8.1 and 8.2 are live; Ex 8.3–Unit 8 and Ch 8 Concept Studio require net-new textbook ingestion |
| `AUD08-02` | P0 | G10 Ch 8 Ex 8.1 Q10–Q13 step-deviation method (`d = (x-A)/c`) | Confirmed unresolved (Preservation-guarded) | Existing `site/data/class-10.js` records are SHA-256 hash-pinned in `docs/standard-solution-preservation.json` |
| `AUD08-03` | P1 High | G10 Ch 8 Ex 8.1 Q3, Q10–Q13 HTML prompt tables | Confirmed unresolved (Preservation-guarded) | Prompt strings in `site/data/class-10.js` are hash-pinned |
| `AUD08-04` | P1 High | G10 Ch 8 Ex 8.1 Q4, Q5, Q7, Q10–Q13 computation tables in steps | Confirmed unresolved (Preservation-guarded) | Solution step strings in `site/data/class-10.js` are hash-pinned |
| `AUD08-05` | P2 Med | G10 Ch 8 Sources off-by-one page (300 vs 301) & Tamil title | **Newly fixed in PR #376** | Updated `g10-ch8` `sourceRefs` in `site/data/curriculum.js` to verified 2025 EN pp. 301–333 / TA pp. 311–344 |
| `AUD08-06` | P2 Med | G10 Ch 8 Ex 8.1 Q5/Q6 currency & variance formula consistency | Previously fixed, newly live-verified | Verified in `site/data/math-layout/g10-ch2-ch8-chatgpt-20261113.js` and PR `#334` |
| `AUD09-01` | P0 | G10 Ch 2 offline written notes hidden on 5 video stages | **Newly fixed in PR #376** | Enabled `.sp2-lesson-note` and `.sp2-stage-reference` across all 15 `g10-ch2` stages in `site/assets/chapter-hub.js` |
| `AUD09-02` | P1 High | G10 Ch 2 stage page citations & header/widget alignment | **Newly fixed in PR #376** | Added verified 2025 EN/TA `page` citations to all 15 stages in `site/data/g10-ch2-concepts.js` |
| `AUD09-03` | P1 High | G10 Ch 2 Concepts 5–15 missing `practiceId` exercise links | **Newly fixed in PR #376** | Added `practiceId` links across all 15 concepts in `site/data/g10-ch2-concepts.js` |
| `AUD09-04` | P1 High | G10 Ch 2 unrendered subscript/caret tokens in legacy items | Confirmed unresolved (Preservation-guarded) | Overlay coverage tracked in `g10-ch2-ch8-chatgpt-20261113.js`; base records hash-pinned |
| `AUD09-05` | P2 Med | G10 Ch 2 symmetric 3-term A.P. (`a-d, a, a+d`) & G.P. (`a/r, a, ar`) selection notes | **Newly fixed in PR #376** | Added bilingual 3-term selection notes to `g10-ch2-ap-nth` and `g10-ch2-gp-nth` in `site/data/g10-ch2-concepts.js` |
| `AUD09-06` | P2 Med | G10 Ch 2 Sources page range (35–85) & Tamil 2025 Drive source | **Newly fixed in PR #376** | Updated `g10-ch2` `sourceRefs` in `site/data/curriculum.js` to 2025 EN pp. 35–85 / TA pp. 36–87 |
| `AUD10-01` | P0 | G9 Ch 7 Ex 7.1 Q6 unshaded-region diagram | Confirmed unresolved | Requires verified page-image crop comparison for Ex 7.1 Q6 |
| `AUD10-02` | P0 | G9 Ch 7 Concept Studio transfer problem numerical variation | Confirmed unresolved | Minor pedagogical variation enhancement |
| `AUD10-03` | P1 High | G9 Ch 7 `V___brick` / concatenated subscript labels in `g9-clear-math.js` | Previously fixed, newly live-verified | Verified clean `\text{brick}` subscript rendering in `g9-clear-math.js` |
| `AUD10-04` | P1 High | G9 Ch 7 Concept Studio missing link to Ex 7.4 capacity problems | **Newly fixed in PR #376** | Added `secondaryPracticeId: "g9-ch7-ex7.4-q1"` to `g9-ch7-volume` and enabled button in `site/assets/chapter-hub.js` |
| `AUD10-05` | P2 Med | G9 Ch 7 Concept 1 & 3 equilateral triangle / 5-face box note | Confirmed unresolved | Low-risk pedagogical enhancement |
| `AUD10-06` | P2 Med | G9 Ch 7 Sources page range & 2025 EN/TA locators | **Newly fixed in PR #376** | Updated `g9-ch7` `sourceRefs` in `site/data/curriculum.js` (EN pp. 244–265, TA pp. 256–278) |
| `AUD11-01` | P0 | G9 Ch 3 missing exercises & Concept Studio | Partially resolved / Unresolved | PRs `#364`, `#366`, `#370`, `#374` shipped Ex 3.1, 3.2, 3.3, 3.4; Ex 3.5–3.15 & Concept Studio remain future batches |
| `AUD11-02` | P0 | G9 Ch 3 Ex 3.2 Q6 inline polynomial zero graphs | Previously fixed, newly live-verified | Shipped and verified in PR `#361` (`test_g9_ch3_ex32_q6_graphs_browser.cjs`) |
| `AUD11-03` | P1 High | G9 Ch 3 `16_{x^4}` subscript corruption in Ex 3.1 Q5(iii) & `+ P(x) =` in Q7/Q8 | **Newly fixed in PR #376** | Fixed apostrophe-`s` bug in `build_g9_math.cjs`, updated Q7/Q8 `questionMath.en`, and rebuilt `site/data/g9-clear-math.js` |
| `AUD11-04` | P1 High | G9 Ch 3 Ex 3.2 Q4 step separation | Previously fixed, newly live-verified | Shipped in PR `#351` (`test_g9_ch3_ex32_solutions.cjs`) |
| `AUD11-05` | P2 Med | G9 Ch 3 zero vs root distinction in Ex 3.2 Q3/Q5 | Previously fixed, newly live-verified | Shipped in PR `#351` |
| `AUD11-06` | P2 Med | G9 Ch 3 Sources 2025 EN/TA page ranges | **Newly fixed in PR #376** | Updated `g9-ch3` `sourceRefs` in `site/data/curriculum.js` (EN pp. 79–135, TA pp. 83–142) |
| `AUD12-01` | P0 | G9 Ch 4 & G10 Ch 4 missing exercises & G9 Ch 4 Concept Studio | Partially resolved / Unresolved | PRs `#359`, `#365`, `#367`, `#372`, `#373`, `#375` shipped G9 Ex 4.1–4.3 and G10 Ex 4.1–4.3; remaining exercises are future batches |
| `AUD12-02` | P0 | G9 Ch 4 Ex 4.1–4.3 geometry diagrams | Confirmed unresolved | Future SVG diagram batch for G9 Ch 4 |
| `AUD12-03` | P1 High | G9 Ch 4 Ex 4.3 Q6 chord explanation | Confirmed unresolved (Preservation-guarded) | Guarded by `G9_GRADE_PRESERVATION_SHA256` |
| `AUD12-04` | P1 High | G9 Ch 4 Tamil translations for legacy records | Confirmed unresolved (Preservation-guarded) | New Ex 4.1–4.3 subparts in PRs `#367/#372/#375` are 100% bilingual; 11 legacy records are hash-pinned |
| `AUD12-05` | P2 Med | G10 Ch 8 Ex 8.2 Q5–Q8 tabular layout | Confirmed unresolved (Preservation-guarded) | Hash-pinned in `docs/standard-solution-preservation.json` |
| `AUD12-06` | P2 Med | G10 Ch 7 Sources off-by-two start page (267 vs 269) & Tamil source | **Newly fixed in PR #376** | Updated `g10-ch7` `sourceRefs` in `site/data/curriculum.js` to 2025 EN pp. 269–300 / TA pp. 279–310 |
| `AUD13-01` | P0 | G9 Ch 5 Coordinate Geometry missing Ex 5.2–5.5 & Concept Studio | Partially resolved / Unresolved | PRs `#345` & `#350` shipped complete bilingual Exercise 5.2 (25 subparts) + Concept Studio (`g9-ch5-concepts.js`)! Ex 5.1, 5.3–5.5 remain |
| `AUD13-02` | P0 | G9 Ch 5 Ex 5.2 Q2 collinearity by distance formula (not Class 10/12 slope/vector) | Already live-verified | Closed in PR `#340` (`test_g9_ch5_ex52_fidelity.cjs`) |
| `AUD13-03` | P0 | G9 Ch 5 Coordinate Geometry diagrams & Concept Studio visuals | Previously fixed, newly live-verified | Shipped in PRs `#340` & `#345` |
| `AUD13-04` | P1 High | G9 Ch 5 Ex 5.2 Q7/Q8 term definitions & expansion steps | Previously fixed, newly live-verified | Shipped in PR `#350` (`g9-ch5-ex5-2-complete.js`) |
| `AUD13-05` | P1 High | G9 Ch 5 Tamil translations across Exercise 5.2 | Previously fixed, newly live-verified | Shipped in PR `#350` (all 25 Exercise 5.2 subparts 100% bilingual EN/TA) |
| `AUD13-06` | P2 Med | G9 Ch 5 Sources full 2025 page range (187–225) | **Newly fixed in PR #376** | Updated `g9-ch5` `sourceRefs` in `site/data/curriculum.js` (EN pp. 187–225, TA pp. 197–236) |
| `AUD14-01` | P0 | G9 Ch 6 Trigonometry missing Ex 6.4 Q2–Q3 (**Issue #346**) & Concept Studio | Partially resolved & **Live-Verified (`#346`)** | Ex 6.4 Q2–Q3 (7 subparts) shipped in PR `#344` and **live-verified `42/42` states** (`test_g9_ex64_q2_q3_browser.cjs`); Ch 6 Concept Studio remains future work |
| `AUD14-02` | P0 | G9 Ch 6 Ex 6.4 4-figure table method & `2.7907` vs `2.7903` key note | Already live-verified | Closed in PR `#348` (`0487aeb`) |
| `AUD14-03` | P1 High | G9 Ch 6 exact 2025 textbook prompts & MCQ options across all 40 legacy items | Already live-verified | Closed in PR `#348` (`0487aeb`, `test_g9_ch6_2025_prompts.cjs`) |
| `AUD14-04` | P1 High | G9 Ch 6 Ex 6.1 Q3 ratio-triangle method (without premature Sec 6.2 special angles) | Previously fixed, newly live-verified | Closed in PR `#348` (`0487aeb`) |
| `AUD14-05` | P1 High | G9 Ch 6 inline SVG preview on spatial word problems | Confirmed unresolved | Low-risk UI enhancement |
| `AUD14-06` | P2 Med | G9 Ch 6 Sources full 2025 page range (226–243) | **Newly fixed in PR #376** | Updated `g9-ch6` `sourceRefs` in `site/data/curriculum.js` (EN pp. 226–243, TA pp. 237–255) |

### 4.2 Extended Workbook Inventory (`AUD15-01`..`AUD23-06` = 54 Unique IDs)

| ID | Priority | Scope | Reconciliation Category | Evidence / PR / Status |
|---|---|---|---|---|
| `AUD15-01`..`AUD15-05` | P0/P1 | G9 Ch 8 Statistics tables, mode subscript `f, f₁, f₂`, `₹` backticks, Tamil translations, boundary SVGs | Confirmed unresolved (Preservation-guarded) | Modifying `site/data/class-9.js` records directly alters `G9_GRADE_PRESERVATION_SHA256`; requires dedicated overlay or preservation re-baseline |
| `AUD15-06` | P2 Med | G9 Ch 8 Sources full 2025 page range (EN pp. 266–290, TA pp. 279–305) | **Newly fixed in PR #376** | Updated `g9-ch8` `sourceRefs` in `site/data/curriculum.js` |
| `AUD16-01` | P0 | G10 Ch 7 Mensuration Ex 7.1–7.5 coverage & Concept Studio | Partially resolved / Unresolved | PRs `#357`, `#362`, `#368`, `#371` shipped full bilingual Ex 7.1, 7.2, 7.3 (30 questions); Ex 7.4–Unit 7 & Concept Studio remain |
| `AUD16-02`, `AUD16-03` | P0/P1 | G10 Ch 7 Ex 7.1 Q3/Q4/Q6–Q9 comparative note & 3D SVGs | Confirmed unresolved (Preservation-guarded) | Guarded by `standard-solution-preservation.json` / future SVG batch |
| `AUD16-04` | P1 High | G10 Ch 5 `g10-ch5-area-triangle` Fola V2 video button in `isStudio6` | Stale / Already live-verified | Already wired and tested in PR `#358` (`test_trace_area_m06_release.py`) |
| `AUD16-05` | P2 Med | G9 Ch 6 Ex 6.1 Q2 missing `⊥` (`AD ⊥ BC`), glued `(iv) cos C (v) tan C`, `'A 5 m'`, `36° 52'`, `'4′ mean'` | **Newly fixed in PR #376** | Fixed in `site/tools/g9_math_compiler.cjs` and rebuilt `site/data/g9-clear-math.js` |
| `AUD16-06` | P2 Med | G10 Ch 7 Sources 2025 EN/TA Drive provenance | **Newly fixed in PR #376** | Updated `g10-ch7` `sourceRefs` in `site/data/curriculum.js` |
| `AUD17-01`..`AUD17-06` | P0–P2 | G9 Ch 2 Real Numbers step expansions & number-line diagrams | Confirmed unresolved (Preservation-guarded) | Modifying `site/data/real-numbers/g9-ch2-exercises-*.js` alters `G9_GRADE_PRESERVATION_SHA256` |
| `AUD18-01`, `AUD18-02`, `AUD18-05`, `AUD18-06` | P0–P2 | G10 Ch 3 Ex 3.1–3.6 polynomial division substeps & Tamil subgoal labels | Confirmed unresolved (Preservation-guarded) | Base steps in `g10-ch3-ex3-1-to-3-6-en.js` are hash-pinned; step-specific bilingual explanations added via `why-step-g10-coverage.js` (`AUD18-04`) |
| `AUD18-03` | P1 High | G10 Ch 3 Concepts 6–10 exercise deep-links & Ex 3.15–3.20 | Partially resolved in **PR #376** | Deep-links for Concepts 6–10 (`Ex 3.7–3.14`) fixed in PR `#376` (`AUD21-03`); Ex 3.15–3.20 matrix/graph exercises remain future batches |
| `AUD18-04` | P1 High | G10 Ch 3 Algebra missing `"Why this step?"` explanations across Ex 3.1–3.14 | **Newly fixed in PR #376** | Added 123 bilingual step-specific entries in `site/data/why-step-g10-coverage.js` (100% coverage of all 135 G10 Ch 3 items) |
| `AUD19-01`..`AUD19-04`, `AUD19-06` | P0–P2 | G10 Ch 1 step splitting & per-item page locators in `class-10-chapter-1.js` | Confirmed unresolved (Preservation-guarded) | Base records in `site/data/class-10-chapter-1.js` are SHA-256 hash-pinned in `docs/standard-solution-preservation.json` |
| `AUD19-05` | P2 Med | G10 Ch 1 Why-step coverage across Ex 1.3–Unit 1 | Previously fixed, newly live-verified | All 74/74 G10 Ch 1 items already covered via `site/data/why-step-g10-coverage.js` (`test_why_step_g10.cjs`) |
| `AUD20-01`..`AUD20-06` | P0–P2 | G9 Ch 2 Real Numbers alternative methods & semicircle SVG | Confirmed unresolved (Preservation-guarded) | Guarded by `G9_GRADE_PRESERVATION_SHA256` |
| `AUD21-01` | P0 | G10 Ch 3 Ex 3.12 Q5 `ex3-12-q5-circle-gates.svg` inverted chord lengths `PR` vs `QR` | **Newly fixed in PR #376** | Moved `R` to `(180.7, 41.0)` so `PR = 118.4 px` (16 m) > `QR = 88.8 px` (12 m) in exact 4:3 ratio |
| `AUD21-02`, `AUD21-04`, `AUD21-05`, `AUD21-06` | P1/P2 | G10 Ch 3 Ex 3.1 Q1(i), Ex 3.3 Q3/Q4, Ex 3.12 Q7 step edits | Confirmed unresolved (Preservation-guarded) | Base step records hash-pinned |
| `AUD21-03` | P1 High | G10 Ch 3 Concepts 6–10 (`concept=5..9`) clickable deep-link buttons to Ex 3.7–3.14 | **Newly fixed in PR #376** | Added `practiceId`/`secondaryPracticeId`/`tertiaryPracticeId` to stages 6–10 in `g10-ch3-concepts.js` & rendered tertiary button in `chapter-hub.js` |
| `AUD22-01`..`AUD22-06` | P1/P2 | G10 Ch 2 deduplication of 8 legacy bundled cards vs split subparts | Confirmed unresolved (Preservation-guarded) | Removing legacy IDs from `site/data/class-10.js` is blocked by `test_standard_solutions.cjs` (568-item preservation manifest) |
| `AUD23-01` | P1 High | G10 Ch 1 Ex 1.3 Q10 (`c10-1-1-3-q10`) prompt table & step expansion | Confirmed unresolved (Preservation-guarded) | Base record in `site/data/class-10-chapter-1.js` is SHA-256 hash-pinned |
| `AUD23-02` | P1 High | G10 Ch 1 Ex 1.2 Q4 (`ex1-2-q4.svg`) missing natural numbers `1, 5..9` & graph ticks | **Newly fixed in PR #376** | Updated `site/assets/grade10-ch1/ex1-2-q4.svg` to show all `1..9` in both ovals and axis tick labels |
| `AUD23-03` | P1 High | G10 Ch 1 Ex 1.4 Q2 & Q3 (`ex1-4-q2.svg`, `ex1-4-q3.svg`) missing 4th representation | **Newly fixed in PR #376** | Added 2-row table headers and coordinate axis ticks to `ex1-4-q2.svg` and `ex1-4-q3.svg` |
| `AUD23-04` | P1 High | G10 Ch 1 Ex 1.4 Q9 piecewise `\begin{cases}`, Ex 1.6 Q7 `2^{mn}`, and 6 glued `\text{...}` tokens | **Newly fixed in PR #376** | Updated `site/data/math-layout/g10-ch1-chatgpt-20261113.js` |
| `AUD23-05` | P2 Med | G10 Ch 1 Ex 1.4 Q1 vertical line test dashed lines `P, Q` & Tamil SVG captions | **Newly fixed in PR #376** | Updated `site/assets/grade10-ch1/figure1-4-graphs.svg` and added `altTa`/`captionTa` in `site/assets/app.js` |
| `AUD23-06` | P2 Med | G10 Ch 1 Unit Ex 1 Q8 Why-step expansion | Stale / Already resolved | `c10-1-1-unit-q8` and all 74 G10 Ch 1 items already have bilingual Why-step entries in `why-step-g10-coverage.js` |

---

## 5. Quality Verification & Test Results

### 5.1 Automated Test Suites Executed (`0` Failures)
1. **Full Node Unit, Curriculum, Preservation, Math & Audit Suite (`npm test`):** **PASS (Exit Code 0)**
   - `test_curriculum.cjs`, `test_standard_solutions.cjs` (all 568 preserved records intact), `test_g9_clear_math.cjs` (all 302 Grade 9 items & SHA-256 preservation hash intact), `test_g10_chatgpt_math.cjs`, `test_g10_ch1_chatgpt_math.cjs`, `test_g10_ch2_concept_quality.cjs`, `test_g10_ch3_concepts.cjs`, `test_g10_ch5_concepts.cjs`, `test_g10_ch6_concepts.cjs`, `test_why_step_g10.cjs` (268 Grade 10 items), `test_af09_ch6_fixes.cjs`, `test_2025_textbook_Provenance.cjs`, `test_audit_af01.cjs`.
2. **Python Release Boundary & Video Contract Suite (`python3 -m unittest discover -s site/tools -p "test_*.py" -v`):** **PASS (`56/56` tests in 4.8s)**.
3. **Playwright Headless Chromium Mobile Browser Suites (EN & தமிழ் at 320px / 390px / 412px / 430px):**
   - `node site/tools/test_g10_ch6_concepts_browser.cjs` -> **PASS** (10 concepts × EN/TA × 320/390px, 0 SVG text collisions, 0 clipped labels, 0 formula overflows, verified `EN p.`/`TA p.` citations).
   - `node site/tools/test_g10_ch5_concepts_browser.cjs` -> **PASS** (12 concepts × EN/TA × 320/390px, 0 coordinate handle collisions, verified `EN p.`/`TA p.` citations).
   - `node site/tools/test_g10_ch3_concepts_browser.cjs` -> **PASS** (14 concepts, chord ratio `PR = 118.4px > QR = 88.8px`, deep-link exercise buttons for Ex 3.1–3.14).
   - `node site/tools/test_g10_ch1_chatgpt_math_browser.cjs` -> **PASS** (74 items, `\begin{cases}` on Ex 1.4 Q9, `2^{mn}` on Ex 1.6 Q7, Tamil SVG captions, updated Ex 1.2 Q4 / Ex 1.4 Q1–Q3 SVGs).
   - `node site/tools/test_why_step_g10_coverage_browser.cjs` -> **PASS** (268 Grade 10 items with bilingual `"Why this step?"` drawers).
   - `node site/tools/test_g9_ex64_q2_q3_browser.cjs` (Live GitHub Pages) -> **PASS** (`42/42` states for Issue `#346`).
   - `node site/tools/test_audit_wave1_live_browser.cjs` (Live GitHub Pages, Shards 0–3) -> **PASS** (`174/174` live screens for Issue `#339` Lane A).

---

## 6. PRs, Merge Commits & Production Deployment

- **Pull Request:** [PR #376 — Fix Grade 9 & 10 audit backlog: Concept Studio SVGs (#331), citations, G9 compiler tokens, G10 Ch1/Ch2/Ch3 diagrams & Why-Step coverage](https://github.com/vigneswaranmba20-afk/Triggle/pull/376)
- **Branch:** `fix/antigravity-audit-closure-20261123`
- **Pre-Merge Production Baseline SHA:** `0ffe0d76169c03b8ec9d7529fdd144881d6f9a4b`
- **Merge Commit / Production Deployment SHA:** *(Updated upon PR #376 merge and GitHub Pages deployment completion)*

---

## 7. Remaining Work Ordered by Severity

1. **P0 — Net-New Interactive Concept Studios for Remaining Chapters (`AUD07-01`, `AUD08-01`, `AUD11-01`, `AUD12-01`, `AUD14-01`, `AUD16-01`):**
   - Build self-hosted, mobile-first bilingual Concept Studios for Grade 9 Chapters 3, 4, 6, 8 and Grade 10 Chapters 1, 4, 7, 8 (following the 6–15 stage architecture of `g9-ch5`, `g10-ch2`, `g10-ch3`, `g10-ch5`, `g10-ch6`).
2. **P0 — Net-New 2025 Textbook Exercise Ingestion Batches (`AUD08-01`, `AUD11-01`, `AUD12-01`, `AUD13-01`, `AUD16-01`):**
   - Continue page-image-verified 2025 textbook exercise ingestion for:
     - Grade 9 Ch 1 (Ex 1.3–1.7), Ch 3 (Ex 3.5–3.15), Ch 4 (Ex 4.4–4.7), Ch 5 (Ex 5.1, 5.3–5.5), Ch 8 (Ex 8.1/8.4 missing items).
     - Grade 10 Ch 3 (Ex 3.15–3.20), Ch 4 (Ex 4.4–Unit 4), Ch 7 (Ex 7.4–Unit 7), Ch 8 (Ex 8.3–Unit 8).
3. **P1 — Controlled Re-Baseline of Hash-Pinned Preservation Records (`AUD08-02..04`, `AUD15-01..05`, `AUD17-01..06`, `AUD18-01..02`, `AUD19-01..04`, `AUD20-01..06`, `AUD22-01..06`):**
   - Any wording, step-count, or deduplication edits to the 568 records locked by `docs/standard-solution-preservation.json` or the 302 Grade 9 records locked by `G9_GRADE_PRESERVATION_SHA256` require an explicit owner-approved preservation manifest re-baseline PR.
4. **P2 — Independent Human Tamil Teacher Editorial Review:**
   - Per `AGENTS.md`, `terminology.ta` and chapter translation status remain `pending` until reviewed by a qualified Tamil-medium mathematics educator against the 2025 prescribed printings.
