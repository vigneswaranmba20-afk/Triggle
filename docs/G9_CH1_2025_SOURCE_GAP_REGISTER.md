# Grade 9 Chapter 1 — 2025 Textbook Fidelity & Missing-Content Register
As checked 2026-11-08. **This is an audit, not a chapter-completion certificate.**

## Source authority
- English: `Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf` (user-provided Drive source, revision 2025; textbook chapter 1 printed pp. 1–40).
- Tamil: `Class_9_Mathematics_Tamil_2025_Edition-www.tntextbooks.in (2).pdf` (user-provided Drive source, revision 2025).
- Both files are listed in `docs/reference-library/2025-user-textbook-manifest.json`; text has been cross-checked against these connected source editions. Complex mathematical glyphs and original Venn figures still require visually checking PDF page images before an item is certified as an exact transcription.
- The source identifies SCERT copyright (© SCERT 2018) and a free-textbook/not-for-sale programme. The user has directed exact transcription from the connected source PDFs. This source-fidelity register records what has actually been checked; it is not a general determination of publication rights. Never silently paraphrase a question or label an unchecked question verbatim.

## Exercise 1.1 — confirmed source inventory (EN/TA printed pp. 5–6)
| Textbook item | Expected subparts | Currently available app subparts | Pending | Source and quality note |
|---|---:|---:|---:|---|
| Q1: identifying sets | 4 | 4 | 0 | Q1 (i–iv) now transcribed from visually inspected 2025 EN/TA PDFs, printed p. 5 / PDF p. 11; independent Tamil editorial review pending |
| Q2: roster form of letters | 4 | 4 | 0 | Q2 (i–iv) now transcribed from visually inspected 2025 EN/TA PDFs, printed p. 5 / PDF p. 11; independent Tamil editorial review pending |
| Q3(a): membership true/false | 6 | 6 | 0 | Check membership symbols against printed figure/glyphs |
| Q3(b): fill the blanks | 4 | 4 | 0 | Check membership symbols against printed figure/glyphs |
| Q4: roster-form conversions | 4 | **0** | **4** | Q4(ii) fractional expression is garbled in extracted PDF text: require page-image inspection |
| Q5: set-builder conversions | 4 | **0** | **4** | Q5(ii) rational-number sequence is garbled in extracted PDF text: require page-image inspection |
| Q6: descriptive-form conversions | 4 | **0** | **4** | Source text visible in both editions; independent Tamil editorial review pending |
| **Total** | **30** | **18** | **12** | **Do not label Exercise 1.1 complete** |

Missing IDs to create once source and publication gates are satisfied: `g9-ch1-ex1.1-q4-i` through `-iv`, `g9-ch1-ex1.1-q5-i` through `-iv`, `g9-ch1-ex1.1-q6-i` through `-iv`. Preserve all 18 existing question IDs and localStorage progress.

## Other Chapter 1 exercises
The English 2025 textbook contains **Exercises 1.1–1.7**. The current dedicated textbook-exercise module covers only Exercise 1.1 Questions 1–3; Exercises **1.2–1.7** have not been reconciled as complete against the prescribed text. Some original Triggle practice exists separately; do not count that as official textbook coverage. These later exercises include diagrams and multi-part questions; inventory each individually before publication.

## Worked Examples 1.1–1.35
The app currently has 35 numbered Chapter 1 worked-example entries sourced/rephrased from the older 2019 text, **not certified word-for-word matches** of the 2025 PDFs. Reconcile in chronological groups of 5–10 (less for complex figures), keeping original textbook wording separate from Triggle-authored solutions.
- Source check of **Example 1.4** (English printed p. 7): the source refers to the distinct prime factors of **210**; both sets have four members. Do **not** change the numeric value to `2` based only on an ambiguous voice description; inspect the exact user-flagged screenshot/expression before making that change.
- Original, source-aligned Venn SVGs now cover: Examples **1.11–1.18, 1.25, 1.27–1.31** (14 examples). They are schematic teaching figures, not copies of textbook artwork.
- Remaining graph/figure-dependent items, particularly **1.19–1.24, 1.26 and three-set word problems 1.32–1.35**, require further figure-to-source comparison. Never attach a plausible but mathematically irrelevant diagram.

## Release and sign-off
- UI navigation and nonfloating questions: implemented and live; browser validated.
- 14 diagram improvements: code and CI implemented, publication status tracked by GitHub workflow.
- Exercise 1.1 missing 12: **NOT IMPLEMENTED** as of this audit; image verification of two formula subparts, source-text and bilingual editorial checks must be resolved first.
- Student output may use original worked solutions, hints and original diagrams. A question must never be reworded silently while marked `textbook-exact`.
- Independent Tamil teacher editorial certification: **pending**. 2026–27 edition parity: **pending**.
