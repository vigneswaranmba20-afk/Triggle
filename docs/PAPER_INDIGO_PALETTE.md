# Paper + Indigo — all-grade visual design (15 November 2026)

This is a color-only, low-bandwidth implementation of the user's selected
palette for the free student-facing Triggle web app. It is not a new navigation
design. The experience must remain simple enough for a first-time learner on a
basic Android phone.

## Tokens

| Role | Hex | Application |
| --- | --- | --- |
| Page | `#F7F7F4` | Near-white textbook paper |
| Cards | `#FFFFFF` | Lessons, diagrams, indexes |
| Ink | `#22283B` | Symbols, explanations, headings |
| Supporting ink | `#566275` | Secondary readable copy |
| Indigo | `#473D91` | Back, active links, Next, selected |
| Indigo tint | `#EEEAF8` | Selected options and quiet concepts |
| Teal | `#13746F` | Highlighted mathematical marks |
| Answer dark teal | `#11645B` | Existing correct/final answer label |

These tokens were chosen after a 30-simulation heuristic design study, not
a field study with schoolchildren. Preserving mathematical meaning matters
more than eliminating every other plot color.

## Accessibility and testing

- Seven defined foreground/background pairs are tested to exceed WCAG 2.2
  ratio thresholds (4.5:1 text, 3:1 significant graphic elements).
- Real Chromium rendering is checked at 320, 390 and 430 px on Grade 9
  Chapters 1/2, Tamil labels, Grade 10 exercise and Grade 12 matrices.
- Color cannot be the sole carrier of success, errors, set membership or
  a comparison between two or more plotted quantities.
- CSS deliberately makes **no changes** to display, layout geometry, fonts,
  lesson text or lesson JS. Offline service worker precaches the stylesheet.
- The new stylesheet is loaded *last*, so the palette is easy to revise or
  remove without editing dozens of original math modules.
- Higher contrast operating-system mode is supported through forced-colors.

A full in-school usability pilot, device sunlight study and WCAG certification
have **not** been carried out. Accessibility checks are automated safeguards,
not a substitute for real learners and assistive technology testing.

## Rollback

Remove the versioned `paper-indigo.css` link from `site/index.html` and
remove the new asset from `site/service-worker.js`. Bump the cache version.
The original functional CSS and all textbook content remain intact.
