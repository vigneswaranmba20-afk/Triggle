# Production Deployment Verification Report — 24 November 2026

**Repository:** [`vigneswaranmba20-afk/Triggle`](https://github.com/vigneswaranmba20-afk/Triggle)  
**Production URL:** `https://vigneswaranmba20-afk.github.io/Triggle/site/index.html`  
**Verified `origin/main` Commit SHA:** [`9d103ea6ac5d86b75314134bf4e955b4e7c29681`](https://github.com/vigneswaranmba20-afk/Triggle/commit/9d103ea6ac5d86b75314134bf4e955b4e7c29681) (PR #376 merge)  
**Verification Timestamp:** `2026-11-24T00:18:47Z` (`2026-11-24 05:48 IST`)

---

## 1. Deployment Pipeline & GitHub Actions Status

| Workflow | Run ID | Trigger / Commit | Status | Scope Verified |
|---|---|---|---|---|
| **Triggle risk-based quality** | [`45256462634`](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45256462634) | `main` push (`9d103ea6`) | **PASS** (12m 27s) | Select tier, Firestore security, Full Chromium/WebKit Shards 0–3, Triggle quality gate, `Publish only after successful quality gate` |
| **NEON Mission 03 live production P0 evidence** | [`45256462866`](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45256462866) | `main` push (`9d103ea6`) | **PASS** (5m 26s) | Direct GitHub Pages P0 smoke (`320/390/412px` EN/TA, `60/60` checks) |

---

## 2. Live Asset SHA-256 Parity Check (`0/20` Mismatches)

Direct HTTP fetches against `https://vigneswaranmba20-afk.github.io/Triggle/site/` with cache-busting query strings (`?cb=...`) matched `origin/main` (`9d103ea6ac5d86b75314134bf4e955b4e7c29681`) byte-for-byte across all 20 checked production files:

| Status | File Path (`site/...`) | Local SHA-256 (12) | Live SHA-256 (12) |
|---|---|---|---|
| `MATCH` | `index.html` | `69d59ff97b8e` | `69d59ff97b8e` |
| `MATCH` | `service-worker.js` | `9ee9d106a250` | `9ee9d106a250` |
| `MATCH` | `data/project-status.json` | `f072725cf607` | `f072725cf607` |
| `MATCH` | `assets/chapter-hub.js` | `d2272d05160d` | `d2272d05160d` |
| `MATCH` | `assets/app.js` | `0ad8e5b14098` | `0ad8e5b14098` |
| `MATCH` | `assets/g10-ch5-concepts.js` | `ebf6c927faa0` | `ebf6c927faa0` |
| `MATCH` | `assets/g10-ch6-concepts.js` | `b10db432cb98` | `b10db432cb98` |
| `MATCH` | `data/g10-ch2-concepts.js` | `b971874bef33` | `b971874bef33` |
| `MATCH` | `data/g10-ch3-concepts.js` | `6b6d4dd72676` | `6b6d4dd72676` |
| `MATCH` | `data/g10-ch5-concepts.js` | `e2b8896b489e` | `e2b8896b489e` |
| `MATCH` | `data/g10-ch6-concepts.js` | `f2f4cd58399d` | `f2f4cd58399d` |
| `MATCH` | `data/curriculum.js` | `591af31ada37` | `591af31ada37` |
| `MATCH` | `data/g9-clear-math.js` | `7e5944738dc3` | `7e5944738dc3` |
| `MATCH` | `data/why-step-g10-coverage.js` | `5bb489206496` | `5bb489206496` |
| `MATCH` | `data/math-layout/g10-ch1-chatgpt-20261113.js` | `7f74a9d8f2f0` | `7f74a9d8f2f0` |
| `MATCH` | `assets/grade10-ch3/ex3-12-q5-circle-gates.svg` | `a06d9aab9884` | `a06d9aab9884` |
| `MATCH` | `assets/grade10-ch1/ex1-2-q4.svg` | `ea8fa05a504f` | `ea8fa05a504f` |
| `MATCH` | `assets/grade10-ch1/ex1-4-q2.svg` | `987ca9bc07af` | `987ca9bc07af` |
| `MATCH` | `assets/grade10-ch1/ex1-4-q3.svg` | `864689225b20` | `864689225b20` |
| `MATCH` | `assets/grade10-ch1/figure1-4-graphs.svg` | `8c2f6e10f621` | `8c2f6e10f621` |

---

## 3. Live Functional & Mobile Viewport Verification (`320px`, `390px`, `412px` EN/TA)

1. **Full `npm test` Suite on `9d103ea6`:** **PASS (Exit Code 0)** — verified all 624 Grade 9 records (7,944 KaTeX formulas, `G9_GRADE_PRESERVATION_SHA256 = b932038da4e548189a11c6e27ff471b1cf9022d92bba818aa5c0906bb1b91d9f`), all Grade 10 math/curriculum/preservation suites, and all `audit_af01` guards.
2. **Direct Live Playwright Verification (`320px`, `390px`, `412px` × EN & TA):** **PASS**
   - **G10 Ch 6 Concept Studio (`#331`, `AUD05-04`, `AUD05-05`):** Live `EN p.240 · TA p.248` citation rendered on Concept 0; `0px` display formula overflow on Concept 5 at `320px` in both EN and TA.
   - **G10 Ch 5 Concept Studio (`AUD04-06`):** Live `EN p.203–204 · TA p.210–211` citation rendered on Concept 0.
   - **G10 Ch 2 Concept Studio (`AUD09-01/02/03`):** `.sp2-lesson-note` and `.g10ch2-practice-link` rendered on video-enabled Concept 10.
   - **G10 Ch 3 (`AUD18-04`, `AUD21-01`, `AUD21-03`):** `.g10ch2-practice-link` rendered on Concept 8; `details.why-step-g10` disclosure rendered on `c10-3-ex3-12-q5`.
   - **G9 Ch 6 & Ch 3 (`AUD16-05`, `AUD11-03`):** Perpendicular symbol `⊥` rendered on `c9-exercise-6-1-q2`; `16_{x^4}` subscript corruption absent on `g9-ch3-ex3.1-q5-iii`.
   - **G10 Ch 1 (`AUD23-04`, `AUD23-05`):** KaTeX piecewise `\begin{cases}` rendered on `c10-1-1-4-q9`; Tamil SVG caption (`குத்துக்கோடு`) rendered on `c10-1-1-4-q1` when toggled to Tamil.
3. **Live Probes of Newly Logged Audit #25 Defects (`AUD25-01`–`AUD25-03`):**
   - Confirmed `c10-6-ex6-1-q2-i` renders no Tamil prompt (`q.ta: undefined`) when switched to Tamil (`AUD25-03`).
   - Confirmed `g10-ch6-concepts.js` still binds to deprecated `c10-6-6-*` IDs (`AUD25-02`) and `ex6-3-q3.svg` still places `60°` at `(93, 96)` (`AUD25-01`).
   - Confirmed `c10-5-ex5-2-q12` still computes `m(BC) = 3/4, m(AD) = -3/4` without reconciling convex boundary legs `AC, BD` (`AUD24-01`).
4. **Conclusion:** Zero deployment-pipeline defects exist; `origin/main` (`9d103ea6ac5d86b75314134bf4e955b4e7c29681`) is 100% live and verified on GitHub Pages. Remaining open items are curriculum/mathematical content findings logged in `docs/audit/FINAL_AUDIT_RECONCILIATION_20261124.md`.
