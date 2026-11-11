# Checkpoint 2 — remaining Grade 12 Chapter 1 matrix notation (2026-11-11)

This branch migrates the remaining **32 of 38** already-published Chapter 1 records from the legacy visual notation to explicitly authored local KaTeX. Checkpoint 1 below documents the preceding six-record release and should be read as **historical status at that point**, not the current branch's counts. All 38 records now have structured mathematics in the branch.

| Exercise | Newly migrated | Source (English 2025 Volume I) |
| --- | ---: | --- |
| 1.1 | 13 (Q3–Q15) | printed pp. 15–16, PDF pp. 23–24 |
| 1.2 | 11 (Q1(i–v), Q2(i–iii), Q3(i–iii)) | printed p. 27, PDF p. 35 |
| 1.3 | 8 (Q1(i–iv), Q2–Q5) | printed p. 33, PDF p. 41 |

Preserved: all exact English canonical question strings, worked-step equation strings, answers, immutable question IDs, source mappings, chapter order and student progress keys. Explicit display formulas include proper matrices, semantic fractions, integer powers and transposes, signed minors, determinant/inverse operations and correctly separated Gauss–Jordan augmented blocks. They use only the KaTeX 0.16.22 assets locally bundled in checkpoint 1. The newly authored `questionMath`, `steps[].math` and `answerMath` fields have readable exact-text fallbacks. The proof hash snapshots were renewed for the same underlying calculations; independent rational math verifiers are unchanged.

The original English and Tamil 2025-revised Volume I PDFs are available from the user-provided Drive references, and their exercise texts were consulted. Previous English source-page and independent arithmetic evidence remains the basis of the exact-source manifests. **No new complete Tamil translations were authored**; their status remains English-only/Tamil editorial pending. A Tamil textbook being available does not certify Tamil lesson parity, and the 2026–27 edition is not independently certified.

A new full-inventory pinned-KaTeX regression check validates all 32 rich formulas, exact wording and fallbacks. Source, mathematical, CI, browser, security and live Pages verification must be recorded separately; a branch or an open PR is **not** a live deployment. The offline cache and three module URL revisions were advanced for an eventual verified release.

---

# Locally bundled mathematical typesetting — checkpoint 1

Scope: Grade 12 Chapter 1, Exercise 1.1 Q1(i–iii) and Q2(i–iii), plus the shared Grades 9–12 rendering foundation. Question IDs, exact source wording, canonical answers, chapter order, storage keys, Grade 10 extraction schedules and PWA routes are preserved. Chapter 1 is not complete.

## Rendering contract

KaTeX **0.16.22**, MIT, is pinned in `package.json` and the lockfile. `site/assets/vendor/katex/` contains the browser script, stylesheet, license and all 20 WOFF2 fonts (about 604 KiB total, 260 KB of fonts). The stylesheet retains WOFF2 sources and removes only redundant WOFF/TTF alternatives. `manifest.json` records the upstream package and individual asset hashes. No essential rendering asset uses a runtime CDN.

`site/assets/math-notation.js` preserves the existing escaped legacy renderer and adds explicit structured input. Ordinary prose is never guessed to be TeX. Example:

```js
TriggleNotation.render([
  'English / தமிழ்: ',
  {latex: 'C_{ij}=(-1)^{i+j}M_{ij}', fallback: 'Cofactor equals signed minor'},
  {latex: '\\frac{a+b}{c+d}', fallback: 'a plus b divided by c plus d', display: true}
]);
```

`renderLatex(latex, {displayMode, fallback})` is available directly. `prepare(root)` makes only overflowing equation containers keyboard reachable. KaTeX generates visual HTML plus semantic MathML; visual duplicates are hidden from assistive technology. Rendering uses `trust:false`, strict errors, bounded expansion/size and a fresh macro scope. Invalid, unavailable or denied-command output falls back to escaped readable text. TeX source appears only in nonvisual MathML annotations. Rendering is synchronous before insertion, with local styles loaded before the app.

Authoring records retain canonical `q`, `eq` and `answer` strings for exact-source checks. Optional `questionMath` and `reasonMath` hold language-keyed rich content; step `math` and `answerMath` hold explicit mathematical nodes. The batch manifest is authoritative; regenerate its module with `generateModule`. Reviewed hashes were renewed only for the six changed records. Source-to-browser assertions still compare exact canonical question text and complete final answers.

The private teacher preview uses the same structured fields and local engine, so reviewers see the published notation when approving a content hash.

Display calculations use actual subscripts, superscripts, stacked fractions, sized matrices and a transpose. Shared engine tests also cover determinants, aligned calculations, roots, limits, derivatives, integrals, vectors, sets and inequalities. Long formulas scroll inside their own focusable container; their glyphs remain intact. No new buttons, panels or detailed tabs were added.

The service worker cache is `triggle-shell-real-2025-v71-local-katex-1`; it precaches the engine, stylesheet, license, every font and the new layout CSS. Cached reload and navigation must pass with networking disabled.

## Source and mathematical verification

Both matching user-owned Google Drive PDFs were downloaded and their **page images** inspected in this run. No PDF pages are redistributed.

| Medium | Drive ID | Revision evidence | Q1–Q2 | Answers |
| --- | --- | --- | --- | --- |
| English Volume I | `1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm` | PDF p2: revised 2025 | printed p15 / PDF p23 | printed p282 / PDF p290 |
| Tamil Volume I | `1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c` | PDF p2: revised 2025 | printed p16 / PDF p24 | printed p310 / PDF p318 |

The six matrices and answers agree between the two books and the retained records. All six results are independently checked by existing exact rational arithmetic: Laplace determinants, Gauss–Jordan inverses and products in both orders. New tests check every sign/minor/index in Q1(i), its cofactor matrix, its transpose and the complete derivation. For Q1(i): determinant −30; cofactors `[[2, −6; −4, −3]]`; adjoint `[[2, −4; −6, −3]]`; both products equal −30 times the identity.

The Q1(i) Quick Solution explains the question, the **2×2-only** diagonal-swap/sign-change shortcut, symbol meanings, all four cofactors, transpose and independent verification. Q1(ii–iii) use the general cofactor method. Q2(i–iii) define the determinant/nonzero condition and show the stacked inverse formula before calculating.

The existing English-only/Tamil-pending lesson status is retained. Checking the Tamil source matrices does not certify a complete Tamil translation or 2026–27 prescribed-edition parity. Those editorial checks remain pending.

## Published Chapter 1 inventory and next safe batch

There are **38 published app records**: 19 in Exercise 1.1, 11 in Exercise 1.2 and 8 in Exercise 1.3. Six use the explicit KaTeX path after this batch; **32 remain on legacy notation**:

- `g12-ch1-ex1.1-q3` through `g12-ch1-ex1.1-q15` (13 records): trigonometric matrices, inverse identities, matrix multiplication and algebra, nested adjoints and decryption.
- Exercise 1.2: `q1-i` through `q1-v`, `q2-i` through `q2-iii`, `q3-i` through `q3-iii` (11 records), with prefix `g12-ch1-ex1.2-`: elementary operations, rank and inverse matrices.
- Exercise 1.3: `q1-i` through `q1-iv`, `q2` through `q5` (8 records), with prefix `g12-ch1-ex1.3-`: matrix methods for linear equations and applications.

The next safe notation batch is **Exercise 1.1 Q3–Q7**, reopening the corresponding English/Tamil page images, preserving question text and IDs, explicitly marking formulas, renewing mathematical review hashes and rerunning the full gates. Do not mechanically convert the remaining curriculum. The general engine is already reusable by Grades 9–12; their legacy records are intentionally unchanged.

## QA and release evidence

Android-width screenshots: [before](images/math-typesetting/adjoint-before-390.png) and [after](images/math-typesetting/adjoint-after-390.png), at 390 CSS pixels. The full-page capture includes the existing fixed Previous/Next controls; their position in a long screenshot is not a clipped equation.

The clean pinned `npm ci`, `npm test`, existing `npm run test:webkit`, exact textbook fidelity gate, rational mathematics validators and real Firestore `npm run test:security` pass locally. Targeted Chromium **and** WebKit math suites pass at 320, 360, 390, 412 and 1280 CSS pixels with 3× pixel density. Assertions cover all six migrated questions, exact matrix dimensions/entries, the full reference derivation, final answers, semantic subscripts/powers/fractions, safe malformed input, Tamil/English prose, contained scroll, vertical glyph bounds, keyboard focus, previous/next, browser Back, saved progress and cached reload/navigation.

The offline test stops the HTTP origin for both engines, guaranteeing service-worker network requests also fail. Chromium additionally has networking disabled. Every KaTeX font, script, stylesheet and license is confirmed in the cold cache before offline use.

The repository Grade 9 usability/accessibility audit passes **238/238** checks, with zero findings. The settled Grade 12 lesson passes scoped axe 4.11.1 checks in English/Tamil at 320, 390 and 1280 pixels, with **zero violations**; [machine-readable evidence](images/math-typesetting/lesson-accessibility.json) retains two checks needing human assessment. A whole-page scan also found existing shell contrast and heading/landmark issues outside the upgraded lesson. This is not a full WCAG certification or a TalkBack test.

The final full `npm run test:browser` release gate passes, including all existing Chromium suites and the new two-engine math suite. See the final task report / PR for live deployment evidence. Preserve separate source, test, merge, Pages and live-verification states. The generated project status deliberately marks changed Exercise 1.1 as awaiting a new live module-hash verification until its historical release checkpoint is refreshed; this does not change source-verified task counts.

Local environment note: Debian user-owned libraries were used for WebKit; its bundled launcher overwrites `LD_LIBRARY_PATH`, so a workspace launcher preserves those paths. WPE 26's Back→reload crash was reproduced on a static `grades.html` page without KaTeX. Reload/progress and browser-history assertions are tested independently; no assertion was removed. Physical Android, TalkBack and iOS testing are not claimed.
