# Class 9 Math-First handoff

## Resume

Run `git -C /workspace/Triggle status --short --branch` when the original workspace reconnects. It contained the integrated `codex/g9-symbol-meaning` checkout at base `31f4a4e` and the audit and screenshots below. Preserve those edits before switching branches. The GitHub recovery branch reconstructs the Class 9 reader changes from the checked implementation. GitHub Actions tests the reconstructed commit. The statistics, set notation, probability and screenshots described below were in the original interrupted checkout.

## Confirmed release

[PR #262](https://github.com/vigneswaranmba20-afk/Triggle/pull/262) passed its full major-risk gate and merged at `31f4a4ea82fa1d35d02a8bb3c483d78c90d4ce5a`. The [Pages deployment](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44261926726/job/134668185672) passed and six published assets matched that commit byte for byte. Public Chromium at 320 px verified both language interfaces for all five Algebra Ex 3.1 Q2 parts. All ten signed coefficient conclusions appeared next to the corresponding equations with rendered MathML.

## Completed public-candidate reader work

Class 9 lets KaTeX use its own line breaks. At 320 px, Trigonometry 6.2 Q1(iii) went from a 339 px expression in a 243 px wrapper to two lines that fit in the 243 px wrapper. Genuinely wide expressions retain keyboard-focusable scrollers with room for their tall glyphs. All 383 existing Why-step disclosures use 16–18 px body copy and a 44 px minimum target. Four existing altitude sketches (Mensuration 7.1 Q3, Q7, Q8, Q10) now have the matching accessible name. Existing English SVG descriptions carry language metadata.

The isolated reader test at base `31f4a4e` passed 3,176 views (397 records, both languages, four phone widths) and 27,024 formula instances. Widths were 320, 360, 393 and 430 px. The Why-step browser test covered all chapters at eight widths and its Grade 10 control. A separate Chromium comparison exercised Grades 10, 11 and 12 at 320, 393 and 430 px. Ten of twelve cases matched pixel for pixel. The remaining two matched the measured fonts, glyphs, text and geometry.

## Integrated follow-up in the interrupted checkout

The inventory covers 9 chapters, 33 published exercises, 388 textbook records, 9 practice records and 1,163 worked steps. It is indexed in [the baseline inventory](g9-math-first-inventory.csv). There are 190 textbook records with authored Tamil question text and 198 with an English fallback in the Tamil reader. The family review covered all 33 exercise families and 20 published concept stages. An audit of families differs from a fresh textbook review of every record.

- Set Language 1.2 Q6(iii), Q7, Q9(i–ii), Q10(i–iii) had authored inline math repairs. Seven reason strings displayed raw caret notation and two other rows needed consistent degree notation. Fourteen Tamil locators were wrong. The checked English page is printed 12 / PDF 18. Tamil Q5(iii) is printed 13 / PDF 19 and Q6–Q10 are printed 14 / PDF 20. The new LaTeX preserves the original wording and fallbacks.
- Statistics 8.1 Q5, Q7 and Q8, 8.2 Q5 and 8.3 Q5 and Q6 had thirteen clearer steps. The revised reasons name the count of twenty, the average-deviation correction, conversion back to years, what the cumulative-frequency rank means, the three modal frequencies and the continuous boundaries. The independently checked answers are 20, 205/7, 610/21, 31, 24 and 58.5. Tamil 8.3 Q6 also asks for mean and median. The existing English question scope and Tamil-pending fallback were preserved.
- Statistics Tamil locators are printed 294 / PDF 300 for 8.1, printed 300–301 / PDF 306–307 for 8.2, printed 304–305 / PDF 310–311 for 8.3 and printed 305 / PDF 311 for 8.4. This replaces twenty wrong locators and supplies ten absent ones. Both answer keys were checked at EN printed 317 / PDF 323 and TA printed 333 / PDF 339.
- The original Probability concept quiz now asks which value cannot be a probability. Its feedback explains the inclusive range and probability zero. The rule and impossible event pages were checked in both 2025 editions (English PDF 302 and 305, Tamil PDF 319 and 322). No textbook prompt or answer changed.
- Independent concept transfer checks and remaining candidate findings were documented in `docs/trace/G9_SYMBOL_TO_MEANING_REVIEW.md` in the interrupted checkout. The Statistics design estimates were 7.7 to 9.0 for mean, 7.3 to 8.8 for median, and 7.3 to 9.0 for mode. These are expert design estimates. Physical Android and live screen-reader testing were outside the available test environment.

[English 2025 textbook](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view) · [Tamil 2025 textbook](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

## Pending integrated validation and release

Before the environment disconnected, the integrated focused checks passed for generated Grade 9 output (397 records and 4,745 KaTeX instances), Statistics source and fallbacks, Algebra release, Set Language release, Probability, and the project status projection. The Firestore emulator suite also passed with a temporary port substitution. All six Statistics cases had passed independent 320 px EN/TA checks. The full unit run stopped at the intentional Statistics fingerprint change in `docs/standard-solution-preservation.json`. A refresh was in progress and its completion was unconfirmed. Verify that only the 30 source-checked Statistics fingerprints changed, with all question wording, result equations and answers preserved.

The integrated browser loop reached the Statistics mode assertion. Its value is rendered as a math node containing `24` followed by a text node containing ` marks`. Read both siblings for the final-result test before rerunning. In `site/tools/test_g9_math_first_browser.cjs` use `[...el.childNodes].map(node => node.dataset?.mathFallback || node.textContent).join('')` for that answer. The workbook's previous study baseline and five candidate pairs were captured in `docs/trace/g9-symbol-meaning-screens/` in the interrupted checkout. Algebra, Set Language, Statistics mode and Why-step use 393 × 1024 px. The Trigonometry pair uses 320 × 1024 px.

Regenerate via `node site/tools/build_g9_math.cjs && npm run status:build` as soon as source changes are complete. Run `npm test`, `npm run test:browser`, and `npm run test:security`. Confirm the required quality gate for the exact PR head. After merge, verify the new GitHub Pages deployment, fetch its versioned assets and compare them with that merge commit, then check the changed 320 px pages and offline reload. The interrupted integrated follow-up is **NOT LIVE-VERIFIED**. Paid external API cost was $0.
