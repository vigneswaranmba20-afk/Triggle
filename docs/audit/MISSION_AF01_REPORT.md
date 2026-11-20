# VER Triggle — MISSION AF-01 Audit & Remediation Report

## 1. Baseline & Parallel Development Protection
- **Baseline `main` commit:** `c32230d63c06a963b44407a8134e7003648a3593` (`Publish owner-approved Fola video: Grade 10 Discriminant (#296)`)
- **Remediation branch:** `audit-fix/mission-af01-quality-and-a11y-20261120`
- **Live deployment baseline check:** `https://vigneswaranmba20-afk.github.io/Triggle/` returned HTTP 200; live `site/index.html` matched baseline `main` byte-for-byte.
- **Parallel work protected (untouched):**
  - Open PR `#280` (`AUD01-01`: Grade 9 Venn 5-operations)
  - Open PR `#283` (`AUD01-02`: Grade 9 cardinality + 3-set bridge in `site/assets/set-language-journey.js`)
  - Issue `#246` / PR `#247` (Grade 9 Ex 2.4)
  - Active PRs `#249`, `#250`, `#254`, `#274`, `#221`, `#216`

## 2. Audit Intelligence System & Continuous Pipeline
- **Persistent inventory & checkpoint:** `docs/audit/mission-af01-inventory.json`
- **Deterministic audit & ingestion CLI:** `site/tools/audit_af01.cjs` (`npm run audit:af01`, `--check`, `--json`, `--ingest <path>`)
  - Deduplicates findings by unique `signature` and `id`, enforcing idempotency across repeated/scheduled runs.
  - Excludes active concurrent Neon/GitHub PR targets automatically (`externalAuditDeduplication`).
- **Regression suite:** `site/tools/test_af01_remediations.cjs` (wired into `npm test`).

## 3. Confirmed Findings & Remediations (Batch 1)

| ID | Grade / Ch | Area | Summary | Status |
|---|---|---|---|---|
| `AF01-01` | G10 Ch 2 | Math Notation | Added read-only `TriggleG10Ch2FractionMath` (`g10-ch2-fractions-20261120.js`) converting 16 records / 30 plain slash fractions (21 steps + 9 answers across Ex 2.4–2.8 -> 59 KaTeX `<mfrac>` nodes) without mutating SHA-pinned records. Grade 10 remaining slash fractions: `0`. | `VERIFIED` |
| `AF01-02` | Shared | Mobile Usability | Raised `.lang-switch button` under `@media(max-width:430px)` in `app.css` to `min-width:28px;min-height:34px` (verified `28px × 36px` at `320px` width, fixing `23.9px` `#langEn`). | `VERIFIED` |
| `AF01-03` | G9 Ch 2 | Mobile Usability | Styled `.chapter-hub .rnlab-pitfall summary` in `living-concepts.css` to `min-height:45px;padding:11px 14px;display:flex;align-items:center` (fixing `22px` target). | `VERIFIED` |
| `AF01-04` | Shared | Accessibility | Overrode `.page-status`, `.crumb-link span`, and `.hub-section-arrow` to `var(--bond-muted)` (`#525B62`, verified `6.93:1` `#pageStatus` and `5.51:1` `.crumb-link span` in Chromium, fixing `2.42:1`–`2.92:1` failures). | `VERIFIED` |
| `AF01-05` | G9 | Mobile Usability | `.grade-entry` in `class9-classic.html` measures `20px` tall; legacy file is SHA-256 locked by `validate_curriculum.cjs` (`Preserved content changed: class9-classic.html`) and reverted to baseline. | `BLOCKED` |
| `AF01-06` | G10 Ch 5 | Bilingual | Fixed mismatched Tamil reset label (`மீட்டமை A(−4,−1), B(4,3)`) and localized `'3-4-5 செங்கோண கட்டம்'` in `g10-ch5-concepts.js`. | `VERIFIED` |
| `AF01-07` | G10 Ch 4 | Stability | Added `!isGeometryExercise(current)` guard to `TriggleG10RemainingMath?.getAnswer` and `.getQuestion` in `app.js` matching `.getStep` (verified across `c10-4-ex4-1-q1-i`, `q1-ii`, `q2`). | `VERIFIED` |
| `AF01-08` | Shared | Mobile Usability | `.ranger` in `playground.html` measures `11–12px` tall; legacy file is SHA-256 locked by `validate_curriculum.cjs` (`Preserved content changed: playground.html`) and reverted to baseline. | `BLOCKED` |
| `AF01-09` | Shared | Accessibility | Added `aria-hidden="true"` to decorative `<span class="gold">.</span>` header/sidebar periods in `index.html` (`0` exposed decorative dots). | `VERIFIED` |
| `AF01-10` | G9–G10 | Bilingual | 85/406 active Grade 9 (20.9%) and 355/431 active Grade 10 (82.4%) exercises lack `q.ta` / Tamil wording; fabrication without Google Drive 2025 Tamil PDFs violates `AGENTS.md`. | `BLOCKED` |
| `AF01-11` | G9 | Math Notation | 122 Grade 9 step/answer slash fractions remain (Ch 2: 103, Ch 3: 1, Ch 4: 3, Ch 7: 10, Ch 8: 3, Ch 9: 2) — queued for Batch 2 read-only overlay. | `CONFIRMED` |

## 4. Root Causes & Preventive Coding Rules (Phase 7)
1. **SHA-pinned records vs KaTeX upgrades (`PAT-01`):** Place formatting upgrades in `site/data/math-layout/` with exact source fallback assertions; enforce `0` unconverted Grade 10 slash fractions in `audit_af01.cjs --check`.
2. **Theme token leakage (`PAT-02`):** Any muted text class added outside `bond-light.css` must explicitly map to `var(--bond-muted)` (`#525B62`, `>= 4.5:1`) without modifying CSS layout rules restricted by `test_bond_light_theme.cjs`.
3. **Sub-24px mobile targets (`PAT-03`):** Check every `button`, `a`, `summary`, and `input[type=range]` at `320x720` in Chromium headless verification; respect SHA-pinned legacy archives cleanly.
4. **Symmetric migration guards (`PAT-04`):** Any chapter guard (`!isGeometryExercise(current)`) in `app.js` must wrap `getQuestion`, `getStep`, and `getAnswer` identically.

## 5. 8-Dimension Quality Scorecard (Phase 8 — Automated Metrics)
Weights: Mathematical correctness `30%`, Beginner comprehension `20%`, Mobile usability `15%`, Mathematical notation `10%`, Cognitive design `10%`, Accessibility `5%`, Technical stability `5%`, Bilingual consistency `5%`.

- **Automated weighted averages (`audit_af01.cjs`):** Grade 9 = `9.28/10`, Grade 10 = `9.25/10`.
- **Evidence boundaries (non-automated):** Passing automated checks confirm KaTeX compilation, zero broken why-step references, CSS WCAG contrast/target compliance, and source-record preservation. They do **not** certify line-by-line equivalence against prescribed 2025 Tamil Nadu PDFs or full Tamil translation review (`AF01-10`).

## 6. Verification Log
- `npm run validate`: **PASS** (`41 bilingual chapters, 105 preserved questions`; `145 JavaScript files, 187 local HTML links`).
- `npm test`: **PASS** (exit code 0 across all unit, curriculum, preservation, TRACE, and `test_af01_remediations.cjs` checks).
- `node site/tools/audit_af01.cjs --check`: **PASS** (`11/11` checks, `0` remaining Grade 10 plain slash fractions, `0` KaTeX errors, `0` why-step mismatches, `0` concept integrity errors).
- **Headless Chromium verification:** **PASS** across `4` viewports (`320×720`, `360×780`, `390×844`, `640×360`), `120` route/language checks (`EN` & `TA`), `0` JS errors, `0` horizontal overflow, `0` failures.
