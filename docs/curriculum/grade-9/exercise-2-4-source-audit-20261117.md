# TRACE Grade 9 — Exercise 2.4 (2025 SCERT) source audit

## Source provenance and visual evidence

- Exact 2025 Tamil Nadu SCERT Standard Nine Mathematics English PDF: [source](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view). Original SHA-256: `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`.
- Inspected **PDF page 63 / printed page 57** as a rendered image at 1.65× scale, image SHA-256 `45f1dcd5b071146393c61b5f5d09c67dd257aadc24c8a64c182ea0f6d0f05c97`. The printed exercise is directly below Fig. 2.10 on that page.
- Inspected the official **answer appendix PDF pages 314–315 / printed 308–309**. Exercise 2.4 has **no standalone printed answer section**; do not claim the answer key explicitly confirms a particular four-place decimal.
- Textbook request: “Represent the following numbers on the number line: (i) 5.348 (ii) 6.[bar 4] upto 3 decimal places (iii) 4.[bar 73] upto 4 decimal places.” Recurring overbars were visually inspected; plain PDF extraction loses them.

## Exhaustive 2025 inventory

**One numbered question, three subparts.** The three pre-existing student records are:
`g9-ch2-ex4-q1-i`, `g9-ch2-ex4-q1-ii`, `g9-ch2-ex4-q1-iii`.
No source items are missing.

| ID | Exact number | Four/three-place interpretation | Correct number-line teaching |
|---|---|---|---|
| q1(i) | 5.348 | Already exact, not a recurring expansion | 5.34 < 5.348 < 5.35, locate the eighth thousandth after 5.340 |
| q1(ii) | 6.(4) = 58/9 = 6.44444… | Rounded to 3 dp: **6.444** | Exact recurring value lies strictly inside (6.444, 6.445), nearer the lower endpoint |
| q1(iii) | 4.(73) = 469/99 = 4.737373… | First four digits/truncation **4.7373**; nearest-four-decimal rounding **4.7374** | Exact recurring value lies strictly inside (4.7373, 4.7374), nearer the upper endpoint |

**Important nuance:** The textbook says “upto 4 decimal places” rather than explicitly “round to the nearest”. Thus a sequence-of-magnification approach can first locate the left four-decimal endpoint `4.7373`. However **`4.7373` is not a correctly rounded four-decimal approximation**; the next digit is 7. To avoid teaching an incorrect rounding rule, the student app now labels the point `4.7374` as the four-decimal rounded approximation while placing its actual location at `469/99` inside the final interval. A truncation-only walkthrough must say it is a *bound*, not an exact equality or a nearest-four-decimal answer.

## Changes, independent mathematics, and quality gate

- Keep the same one-question/three-part inventory, textbook prompt IDs, general number-line diagrams and non-Exercise-2.4 curricula.
- Repair the source-pinned rounding answer for q1(iii), ensure exact diagram targets for the two recurring numbers, distinguish equality for q1(i) from approximation, and supply source-specific beginner explanations.
- English-first source verification. The q1(iii) Tamil teaching line only receives the corresponding numeric correction; full Tamil editorial review remains pending.
- Include `docs/curriculum/grade-9/tests/ex2-4-source-audit-math.cjs` in `npm test`: exact rational checks, strict placement in intervals, recurrence and decimal-place semantics, and hint/manifest coverage.
- **Gemini independent review requested:** see the GitHub issue created for independent Antigravity review of the rounding interpretation. No claim that Gemini has already audited the answer. Review concerns the "upto" interpretation, not the exact algebra.

Release requires green standard PR gates, merge, repeat post-merge regression and Pages source verification.
