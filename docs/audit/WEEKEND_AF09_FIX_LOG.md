# VER Triggle — Mission AF-09 Weekend Fix & Verify Ledger Log

**Started:** 2026-11-21 (IST)
**Baseline `origin/main` SHA:** `25e405e66f683dcb7f61b616e43ebd827b5ed7f2` (`PR #313` merged; `Publish` job skipped/failed to upload `github-pages` artifact because CSS-only tier did not run build-artifact job)
**External Ledger:** Google Sheet `1jWqBgH2k2zQHEe3_JlgUHE2QXMx0d67X0W2RuEt2n6U` (44 findings) + Drive folder `1_CHU7zbz_evIbUaM1jVuncAldNc1ZTQ_`

---

## Plugin / Tool Access Checkpoint

- `github`: Connected (`PR #280`, `#283`, `#311`, `#312`, `#314` inspected directly; `#313` verified merged).
- `gsheets` / `gdrive`: **NOT CONNECTED** in current VM session — full 44-row ledger criteria and 2025 Tamil Nadu textbook PDF visual verification are blocked until connected. Visual/code-reproducible fixes (`USER-AF09-01`, `USER-AF09-02`) were executed immediately without fabricating sheet/PDF claims.

---

## All 46 Tracked Items (44 Gemini Ledger Findings + 2 User Reports)

| ID | Scope | Status | PR / Commit | Verification / Notes |
|---|---|---|---|---|
| **USER-AF09-01** | G10 Ch 6 Unit Ex 6 Q2, Concepts UI/data, Difficulty basis (`∓` / minus-over-plus display & mobile overflow) | **FIXED_IN_PR** | `fix/af09-svg-orientation-and-plus-minus` | Split `c10-6-unit-q2` into explicit numerator/denominator/division steps with left-aligned KaTeX (`texOver: 0` at 390px); replaced standalone `1 ∓ sin θ` with `1 ± sin θ`; expanded cube identity wording; `U+1D400–U+1D7FF` scan = 0 hits; verified by `test_af09_ch6_fixes.cjs` + Chromium screenshots |
| **USER-AF09-02** | G10 Ch 6 Exercise SVG label clarity & orientation (`ex6-unit-q7.svg`, `ex6-4-q2.svg`, `ex6-4-q4.svg` + all 23 `assets/grade10-ch6/*.svg`) | **FIXED_IN_PR** | `fix/af09-svg-orientation-and-plus-minus` | Re-laid out all 23 Ch 6 SVGs with `-90°` vertical height labels, `atan2`-aligned parallel diagonal labels (`30 km`, `32 km`, `Line of sight`), horizontal bases, separated upright wedge angles with arcs, and `#F7F6F2` `paint-order:stroke` halos. Oriented-OBB Chromium check = **0 LINE_HIT, 0 TEXT_HIT, 0 CLIP** across all 23 SVGs; wired into `test_g10_ch6_mobile_browser.cjs` |
| **AUD01-01** | G9 Sets Venn / complement / symmetric diff | `PR_OPEN_ON_GITHUB` | PR `#280` (`CONFLICTING`) | Existing parallel PR by audit agent; needs conflict resolution after ledger inspection |
| **AUD01-02** | G9 Sets cardinality notation & 3-set bridge | `PR_OPEN_ON_GITHUB` | PR `#283` (`MERGEABLE`, targets `#280`) | Dependent on `#280`; validate/merge `#280` first |
| **AUD01-03** | G9 Sets distributive-law visual verification | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD01-04** | G9 Sets Tamil fallback & language toggle state | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD01-05** | G9 Sets power-set / proper-subset / disjoint | `PR_OPEN_ON_GITHUB` | PR `#312` (CI failed: regenerate derived data) | Existing PR failing `"Regenerate source-derived curriculum data before release"` |
| **AUD01-06** | G9 Sets De Morgan difference & SVG collisions | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD01-07** | G9 Sets `\mathbb{N}`, `∈`, `:` clarity | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD01-08** | G9 Sets mismatched chip typography & orphan text | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD02-01** | G9 Real Numbers `\sqrt[n]{a}` & fractional exponents | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Local scan found `0` `U+1D400–U+1D7FF` chars on `main`; awaiting ledger specifics |
| **AUD02-02** | G9 Real Numbers 10-subinterval number line & `√2` bounds | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD02-03** | G9 Real Numbers tiny radical-pill scrollbars | **MERGED_AWAITING_LIVE** | PR `#313` (`25e405e`) | Merged into `main`, but Pages workflow failed to upload artifact on `25e405e`; will go live with Batch 1 release |
| **AUD02-04** | G9 Real Numbers unlike-order surds LCM explanation | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD02-05** | G9 Real Numbers recurring overbar & period/domain | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD02-06** | G9 Real Numbers gcd slider & scientific notation | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD03-01** | G10 Algebra `|α−β|` & HTML leak check | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD03-02** | G10 Algebra `U+1D400–U+1D7FF` math italic glyphs | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Whole-`site/` Unicode math-italic scan on `main` returned **0 hits**; verify against ledger scope once `gsheets` connected |
| **AUD03-03** | G10 Algebra long-choice scrollbars & remainder bridge | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD03-04** | G10 Algebra Δ > 0 rational vs irrational split | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD03-05** | G10 Algebra `(AB)^T = B^T A^T` & distributivity | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD03-06** | G10 Algebra SVG collisions & verified citations | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD04-01** | G10 Coord Geometry division-by-zero slope & signs | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD04-02** | G10 Coord Geometry slider sync & conflicting slope state | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD04-03** | G10 Coord Geometry exact fractions vs rounded equalities | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD04-04** | G10 Coord Geometry stem/option match | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD04-05** | G10 Coord Geometry slider label & sticky-header clip | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD04-06** | G10 Coord Geometry overlapping point labels & orientation | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD05-01** | G10 Trig `45°` wall-angle trap & missing angle arg | `PR_OPEN_ON_GITHUB` | PR `#311` (CI failed at `test_g10_ch6_concepts.cjs:152`) | Inspected diff: `test_g10_ch6_concepts.cjs` escaped `\${focusDeg}` inside `String.raw`; avoid clobbering `#311` lines |
| **AUD05-02** | G10 Trig math italic glyph boxes in identities | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Whole-`site/` scan shows 0 `U+1D400–U+1D7FF` chars on `main`; verify against ledger |
| **AUD05-03** | G10 Trig rounded decimal division false equality | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD05-04** | G10 Trig overlapping ray/side labels & concept SVGs | **PARTIAL_FIXED_IN_PR** | `fix/af09-svg-orientation-and-plus-minus` | All 23 Ch 6 exercise SVGs fixed cleanly (`0` OBB collisions); concept interactive SVGs deferred to avoid merge conflict with open `PR #311` on `assets/g10-ch6-concepts.js` |
| **AUD05-05** | G10 Trig angle/height/distance symbol defs & citations | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD05-06** | G10 Trig MCQ answer independence | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD06-01** | G9 Probability malformed table / `43/75` vs `37/50` | `PR_OPEN_ON_GITHUB` | Draft PR `#314` (CI failed: regenerate derived data) | Needs `gdrive` textbook PDF source check before completion |
| **AUD06-02** | G9 Probability `P(A∪B)` overlap vs mutually exclusive | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD06-03** | G9 Probability verified EN/TA citations & links | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` |
| **AUD06-04** | G9 Probability stale under-dev banners & counts | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD06-05** | G9 Probability coin / prime faces / `n(S)=36` | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD06-06** | G9 Probability Toss 100 & `r/n` readout / reset | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD07-01** | G10 Ch 1/Ch 8 concept loader & PR #294 provenance | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD07-02** | G10 Relations & Functions arrow/graph/table diagrams | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD07-03** | G10 Ex 1.5/1.6/Unit1 tofu-box variables `x`/`y` | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Whole-`site/` `U+1D400–U+1D7FF` scan = 0 hits; verify KaTeX/Unicode cause from ledger |
| **AUD07-04** | G10 concatenated `\text{}` / `Notafunction` spacing | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
| **AUD07-05** | G10 bleeding raster textbook crops | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row + `gdrive` textbook PDFs |
| **AUD07-06** | G10 blank Tamil Sources title & toggle | `BLOCKED_MISSING_GSHEETS_GDRIVE` | — | Awaiting full ledger row from `gsheets` |
