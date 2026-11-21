# VER Triggle — Mission AF-09 Weekend Fix & Verify Ledger Log

**Started:** 2026-11-21 (IST)
**Latest `origin/main` SHA:** `c21b479` (`PR #317` & `PR #318` merged & live on GitHub Pages; `44856622480` succeeded)
**External Ledger:** Google Sheet `1jWqBgH2k2zQHEe3_JlgUHE2QXMx0d67X0W2RuEt2n6U` (44 findings) + Drive folder `1_CHU7zbz_evIbUaM1jVuncAldNc1ZTQ_`

---

## Plugin / Tool Access Checkpoint

- `github`: Connected (`PR #317` merged & live; `PR #318` merged; `#311`/`#312` CI green & queued for rebase/merge; `#280`/`#283`/`#314` queued).
- `gsheets` & `gdrive`: **CONNECTED** (All 44 findings exported from `Audit Ledger` + `Quality Dashboard`; all 4 prescribed 2025 EN/TA textbook PDFs downloaded locally at `/tmp/af09_pdfs/`).

---

## All 46 Tracked Items (44 Gemini Ledger Findings + 2 User Reports)

| ID | Priority | Scope | Status | PR / Commit | Verification / Notes |
|---|---|---|---|---|---|
| **USER-AF09-01** | P0 (User) | G10 Ch 6 Unit Ex 6 Q2, Concepts & Difficulty (`∓` / mobile overflow) | **LIVE_VERIFIED** | `PR #317` (`647d893e`) | Split `c10-6-unit-q2` into explicit numerator/denominator/division left-aligned KaTeX steps (`texOver: 0` at 390px); replaced `1 ∓ sin θ` with `1 ± sin θ`; verified live on `github.io` & SW cache `-af09-batch1-` |
| **USER-AF09-02** | P0 (User) | G10 Ch 6 All 23 Exercise SVGs orientation, collisions & halos | **LIVE_VERIFIED** | `PR #317` (`647d893e`) | Orientation-aware labels (`-90°` vertical, `atan2` diagonal parallel `30 km` / `32 km`), upright wedge angles, `#F7F6F2` halos; 0 OBB hits across all 23 SVGs; `cmp -s` verified exact SVG match live on `github.io` |
| **AUD01-01** | P0 | G9 Sets Venn interactive / `U`, `A'`, sym diff (`concept=3`) | `PR_OPEN_ON_GITHUB` | `PR #280` (`8148dde`) | Conflicts resolved & CI shards pass; needs SW token order move before `-thales-fola-` |
| **AUD01-02** | P1 High | G9 Sets cardinality notation & `"11sum"` (`concept=6`) | `PR_OPEN_ON_GITHUB` | `PR #283` (targets `#280`) | Rebase onto `main` after `#280` lands |
| **AUD01-03** | P1 High | G9 Sets distributive-law visual verification (`concept=4`) | `TRIAGED_OPEN` | — | Ledger exported; queued after `#280`/`#283` merge |
| **AUD01-04** | P1 High | G9 Sets Tamil webfont & toggle state (`concept=0-6`) | `TRIAGED_OPEN` | — | Check Noto Sans Tamil fallback / font loading |
| **AUD01-05** | P1 High | G9 Sets power-set / proper-subset bridge (`concept=2`) | **PR_GREEN_CI** | `PR #312` (`43367b4`) | `Triggle quality gate` + Chromium mobile PASS; needs merge of `main` (`#318`) then squash-merge |
| **AUD01-06** | P2 Med | G9 Sets De Morgan difference & SVG collisions (`concept=5`) | `TRIAGED_OPEN` | — | Queued for Batch 4 after `#280` |
| **AUD01-07** | P2 Med | G9 Sets `\mathbb{N}`, `∈`, `:` clarity (`concept=1`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD01-08** | P2 Med | G9 Sets mismatched chip typography & orphan wrap (`concept=0`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD02-01** | P0 | G9 Real Numbers `(ⁿ√a)^m`, exponent `\frac{m}{n}`, variable `m`, tofu (`concept=3,7`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Added `ⁿ√` indexed root + `expDepth`/`rootDepth` compact `\frac` & variable `m` in `g9_math_compiler.cjs`; regenerated `g9-clear-math.js`; MathML `<mi>/<mn>` fixed in `app.css` |
| **AUD02-02** | P1 High | G9 Real Numbers 10-subinterval number line & `√2` bounds (`concept=2`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD02-03** | P1 High | G9 Real Numbers tiny radical-pill scrollbars (`concept=1,4,5,7`) | **LIVE_VERIFIED** | `PR #313` + `PR #317` (`647d893e`) | `overflow:visible;white-space:normal` verified via live `curl` against `vigneswaranmba20-afk.github.io/Triggle/site/assets/app.css` |
| **AUD02-04** | P1 High | G9 Real Numbers unlike-order surds LCM comparison (`concept=4`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD02-05** | P2 Med | G9 Real Numbers recurring overbar & period/domain (`concept=1`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD02-06** | P2 Med | G9 Real Numbers gcd slider & scientific notation (`concept=0,6`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD03-01** | P0 | G10 Algebra `|α−β| = √((α+β)²−4αβ)` HTML/stash leak (`concept=9`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Moved radical parsing before `math-group-power`, added 1-level nested paren radicands & `)` superscript in `math-notation.js` |
| **AUD03-02** | P0 | G10 Algebra MathML `<mi>` tofu box glyphs across 9 lessons | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Disabled Chromium `text-transform: math-auto` Plane-1 substitution on `.triggle-math mi` using bundled `KaTeX_Math`/`KaTeX_Main` in `app.css` |
| **AUD03-03** | P1 High | G10 Algebra long-choice scrollbars & remainder bridge (`concept=5`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD03-04** | P1 High | G10 Algebra `Δ > 0` rational vs irrational split (`concept=8`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Contrasted `Δ = 4` (perfect square, rational roots) vs `Δ = 8` (non-square, irrational roots) in `g10-ch3-concepts.js` |
| **AUD03-05** | P2 Med | G10 Algebra `(AB)^T = B^T A^T` & distributivity (`concept=12,13`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD03-06** | P2 Med | G10 Algebra SVG collisions & verified citations (`concept=0,11`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD04-01** | P1 High | G10 Coord Geometry division-by-zero slope & signs (`concept=11`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Fixed Concept 11 proof division-by-zero claim, aligned button `Perpendicular (2x+3y+k=0)` with readout & explicit `a₁a₂+b₁b₂` / `a₁b₂−a₂b₁` checks |
| **AUD04-02** | P1 High | G10 Coord Geometry slider sync & slope state (`concept=0,8`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Added `.g10ch4-slider-row[hidden]{display:none}` & slider flex alignment in `g10-ch4-concepts.css` |
| **AUD04-03** | P1 High | G10 Coord Geometry exact fractions vs rounded equalities (`concept=1,5,10`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Added exact `fracTex`, replaced Unicode `−` (`CW (-)`) KaTeX error, fixed `y = mx + l` → `y = mx + c` & `C = 6` vs `c = 6/7` |
| **AUD04-04** | P2 Med | G10 Coord Geometry stem/option `45°` match (`concept=4`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Aligned Concept 4 stem & options in `g10-ch5-concepts.js` |
| **AUD04-05** | P2 Med | G10 Coord Geometry slider label spacing & header scroll-margin | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Added `.g10ch4-slider-top` spacing & `scroll-margin-top:72px` in `g10-ch4-concepts.css` |
| **AUD04-06** | P2 Med | G10 Coord Geometry SVG point-label collisions & page citations | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD05-01** | High (5) | G10 Trig `45°` wall-angle trap & missing angle arg | **PR_GREEN_CI** | `PR #311` (`6fe25bb`) | Fixed `test_g10_ch6_concepts.cjs`, 4-line mobile KaTeX wrap & assertions; `Triggle quality gate` + 4 shards PASS; needs merge of `main` (`#318`) |
| **AUD05-02** | High (4) | G10 Trig MathML variable tofu boxes (`sin`, `cos`, `x`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Covered globally by `.triggle-math mi`/`mn` offline KaTeX font fix in `app.css` |
| **AUD05-03** | High (4) | G10 Trig rounded decimal division false equality | `TRIAGED_OPEN` | — | Queued after `#311` merge |
| **AUD05-04** | High (5) | G10 Trig overlapping ray/side labels & concept SVGs | **PARTIAL_LIVE_VERIFIED** | `PR #317` (`647d893e`) | All 23 Ch 6 exercise SVGs live & OBB-clean; interactive concept SVGs queued cleanly after `#311` |
| **AUD05-05** | High (4) | G10 Trig symbol defs & textbook page citations | `TRIAGED_OPEN` | — | Verify against G10 2025 PDF after `#311` |
| **AUD05-06** | High (4) | G10 Trig MCQ answer independence | `TRIAGED_OPEN` | — | Queued after `#311` |
| **AUD06-01** | P0 | G9 Probability Ex 9.2 Q5 HTML table / `$250' Both'` / `43/75` vs `37/50` | `PR_OPEN_ON_GITHUB` | Draft `PR #314` | Verified G9 EN p.302 / TA p.319 PDF key `43/75`; PR rebase & HTML table fix queued after Batch 3 |
| **AUD06-02** | P0 | G9 Probability `P(A or B)` disjoint vs overlap (`concept=4`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Updated `eventTypes` in `g9-probability-concepts.js` to display 2-line KaTeX `P(A or B)` (`2/4` vs `3/4`) and explain non-double-counting |
| **AUD06-03** | P1 High | G9 Probability verified EN/TA citations & Connect links (`concept=0..4`) | `TRIAGED_OPEN` | — | Queued for Batch 4 |
| **AUD06-04** | P1 High | G9 Probability stale under-dev banners & G10 Ch 6 sidebar count | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Registered `g9-ch9` & `g10-ch2` interactive counts, switched completed chapters to `learningStatus`, synced sidebar exercise count via `textbookExercises` |
| **AUD06-05** | P1 High | G9 Probability coin / prime faces / `n(S)=36` (`concept=1,2`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Added `'At least one blue'` (`3/4`), `'Prime numbers'` (`{2, 3, 5}`, `1` neither prime nor composite), & `6 × 6 = 36` ordered pairs note |
| **AUD06-06** | P2 Med | G9 Probability Toss 100 & `r/n` readout / reset (`concept=3`) | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Ordered `Toss 100` before `Reset` in Concept 3 simulator |
| **AUD07-01** | P0 | G10 Ch 1 concept gap & Ch 8 concept loader check | `TRIAGED_OPEN` | — | Investigate Ch 8 loader & Ch 1 concept coverage in Batch 4 |
| **AUD07-02** | P0 | G10 Relations & Functions arrow/graph/table diagrams (Ex 1.2–1.4) | `TRIAGED_OPEN` | — | Verify 5 prompts against G10 2025 PDF (`/tmp/af09_pdfs/g10_en.pdf` pp. 9,14,25) in Batch 4 |
| **AUD07-03** | P0 | G10 Ex 1.5/1.6/Unit1 tofu-box variables (`x² − 3x`, `y² + 4y`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Root cause was Chromium `text-transform: math-auto` on `.triggle-math mi`; bypassed via offline `KaTeX_Math`/`KaTeX_Main` fonts in `app.css` |
| **AUD07-04** | P1 High | G10 Ch 1 concatenated KaTeX prose & units (`Notafunction`, `576xcm³`) | **LIVE_VERIFIED** | `PR #318` (`c21b479`) | Wrapped 47 unescaped prose phrases and physical units (`cm^3`, `km`) in `\text{...}` / `\,\mathrm{...}` inside `g10-ch1-chatgpt-20261113.js` |
| **AUD07-05** | P1 High | G10 Ch 1 bleeding raster textbook crops (`Ex 1.3 Q4,Q7, Ex 1.4 Q1`) | `TRIAGED_OPEN` | — | Convert raster textbook crops to crisp original SVGs in Batch 4 |
| **AUD07-06** | P2 Medium | G10 Ch 1 blank Tamil Sources title & toggle | **FIXED_IN_PR** | `fix/af09-batch3-ch3-ch5-fixes` | Enabled `englishInTamilReader` across all grades and added Latin companion label on `section=sources` |
