# Grade 9 Algebra and Real Numbers notation

This is a presentation migration of the 127 existing Chapter 2/3 records:
120 Real Numbers exercise subparts, four Algebra exercise records (Exercise
3.1 Q10–12 and Exercise 3.2 Q4), and three original practice questions.
It adds no textbook questions and does not claim either chapter is complete.

The original question objects, IDs, English/Tamil strings, working, answers,
source/review metadata and difficulty classifications remain unchanged.
`site/data/g9-clear-math.js` is a separate explicit TeX presentation registry;
the reader looks up the matching record without mutating canonical content.
The local KaTeX bundle supplies visual notation and semantic MathML offline.

The reproducible build-time migration supports stacked/grouped fractions,
fractional and signed exponents, multi-digit radical indices, full radical
bars, mixed numbers, recurring-decimal bars, and compact aligned calculations.
Unknown syntax stays readable rather than being guessed at runtime. Each
question, explanation, step and answer has its exact source text as fallback.
Only Grade 9 Chapters 2/3 consume this registry; archived examples stay hidden.

## Source consultation

Opened the actual connected Drive PDFs on 2026-11-12, including rendered page
images, rather than relying on stored links. Both PDF page 2 imprints list the
2025 revision. No PDF or scan is added to the repository.

| Medium | Drive file | Visually checked exercise pages |
| --- | --- | --- |
| English | `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`, Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf | Printed 70 / PDF 76 (Exercise 2.7); printed 88 / PDF 94 (3.1 Q10–12); printed 91 / PDF 97 (3.2 Q4) |
| Tamil | `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`, Class_9_Mathematics_Tamil_2025_Edition-www.tntextbooks.in.pdf | Printed 75 / PDF 81 (Exercise 2.7); printed 95 / PDF 101 (3.1 Q10–12); printed 99 / PDF 105 (3.2 Q4) |

These source samples checked fraction grouping, radical notation, coefficient
placement and polynomial equations. They do not constitute a new exhaustive
source-fidelity audit. Existing exactness flags, pending Tamil editorial review
and unresolved chapter coverage are preserved.

## Regression coverage

`test_g9_clear_math.cjs` checks reproducibility, verbatim bilingual fallbacks,
every working step, strict KaTeX/MathML rendering, original-object preservation,
scope isolation, offline inclusion and independent grouping expectations.
Negative mixed numbers and multi-digit root indices have explicit regressions.

`test_g9_clear_math_browser.cjs` visits all 127 records in English/Tamil at
390px, ten representative questions at 320/1280px, and checks unclipped glyphs,
keyboard-reachable equation scrolling, page width, complete solutions,
Previous/Next, stored progress, the existing figure dialog and offline routes.
Both tests are included in the existing required npm suites.

The existing persistent-question source assertion now recognizes the separate
Grade 9 presentation lookup while retaining the canonical question fallback.
The service-worker cache and reader script URL are versioned for this release.
