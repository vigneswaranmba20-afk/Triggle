# TRACE Final Frontier

**Mission in progress. Android release preparation is NO-GO.** The first source-to-runtime reconciliation covers all 17 chapters and 129 textbook exercise sections. It identified five completely absent sections, all in Grade 9 Set Language. Exercise 1.3 has merged, and the batch for Exercises 1.4–1.7 has passed focused local tests and entered hosted checks. The release and the remaining bilingual and mathematical reconciliation are tracked in the checkpoint.

- [Machine-readable inventory](TRACE_FINAL_FRONTIER_INVENTORY.json)
- [One row per candidate canonical task](TRACE_FINAL_FRONTIER_INVENTORY.csv)
- [Release and verification checkpoint](TRACE_FINAL_FRONTIER_CHECKPOINT.json)

## Sources and counting

All four 2025 revised Tamil Nadu SCERT PDFs were retrieved and matched the registered SHA-256 digests. The Grade 10 Tamil PDF with the registered bytes is the copy at Drive ID `1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC`. The older student-facing link in the baseline is inaccessible. [2025 source register](../../reference-library/2025-user-textbook-manifest.json) · [Grade 10 Tamil source](https://drive.google.com/file/d/1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC/view)

The baseline is production commit `7b39aef78215088ccd64576f983d71f665f82066`. The current column uses the second Set Language release candidate, which includes the first batch. A numbered question may bundle several canonical tasks. Grade 9 Exercise 6.3 has one unnumbered stem and four tasks. Grade 10 has 17 preserved older Trigonometry bookmarks suppressed in the catalogue when the canonical label is present. The JSON records the distinction between a registered ID and catalogue visibility. [Baseline deployment](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45667113749)

The numbers below are the current first-pass counts. Fresh source-text extraction was checked against prior registers and checked page images where recorded. Some grouping and source-to-card comparisons still require a second independent review. The CSV provides a scope row and language fields for every candidate task. Fully completed English, Tamil and bilingual totals are unknown until that review. `PARTIAL` includes candidates with English prose in a Tamil fallback and two Grade 10 bundle mappings pending review. `Math evidence` counts only exact task evidence checked or rerun for this ledger. Prior evidence elsewhere remains to be joined by task ID. No percentages are calculated from provisional totals.

| Grade | Exercise sections | Numbered questions | Canonical tasks | Registered records before → candidate | Missing eligible before → candidate | Partial candidates | Source blocked | Math evidence | Live verified |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 60 | 482 | 837 | 690 → 746 | 111 → 0 | 66 | 3 | 197 | 0 |
| 10 | 69 | 664 | 929 | 881 → 881 | 0 → 0 | 53 | 7 | 0 | 0 |

## Chapter reconciliation

| Grade | Chapter | Title | Sections | Numbered | Canonical | Missing eligible before → candidate | Partial | Source blocked | Math evidence | Live verified |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 1 | Set Language | 7 | 72 | 176 | 111 → 0 | 0 | 1 | 111 | 0 |
| 9 | 2 | Real Numbers | 9 | 53 | 120 | 0 → 0 | 40 | 0 | 0 | 0 |
| 9 | 3 | Algebra | 15 | 109 | 227 | 0 → 0 | 2 | 0 | 0 | 0 |
| 9 | 4 | Geometry | 7 | 69 | 86 | 0 → 0 | 0 | 0 | 86 | 0 |
| 9 | 5 | Coordinate Geometry | 6 | 58 | 73 | 0 → 0 | 9 | 0 | 0 | 0 |
| 9 | 6 | Trigonometry | 5 | 30 | 54 | 0 → 0 | 5 | 2 | 0 | 0 |
| 9 | 7 | Mensuration | 4 | 36 | 42 | 0 → 0 | 6 | 0 | 0 | 0 |
| 9 | 8 | Statistics | 4 | 30 | 30 | 0 → 0 | 0 | 0 | 0 | 0 |
| 9 | 9 | Probability | 3 | 25 | 29 | 0 → 0 | 4 | 0 | 0 | 0 |
| 10 | 1 | Relations and Functions | 7 | 69 | 122 | 0 → 0 | 29 | 0 | 0 | 0 |
| 10 | 2 | Numbers and Sequences | 11 | 115 | 161 | 0 → 0 | 10 | 0 | 0 | 0 |
| 10 | 3 | Algebra | 21 | 140 | 236 | 0 → 0 | 0 | 1 | 0 | 0 |
| 10 | 4 | Geometry | 6 | 78 | 88 | 0 → 0 | 3 | 4 | 0 | 0 |
| 10 | 5 | Coordinate Geometry | 6 | 75 | 97 | 0 → 0 | 1 | 0 | 0 | 0 |
| 10 | 6 | Trigonometry | 6 | 52 | 69 | 0 → 0 | 7 | 0 | 0 | 0 |
| 10 | 7 | Mensuration | 6 | 60 | 62 | 0 → 0 | 0 | 0 | 0 | 0 |
| 10 | 8 | Statistics and Probability | 6 | 75 | 94 | 0 → 0 | 3 | 2 | 0 | 0 |

## Curriculum changes and release evidence

| Grade 9 exercise | Added cards | Canonical tasks | Bilingual solutions with checked mathematics | Original SVG figures | Release state |
|---|---:|---:|---:|---:|---|
| 1.3 Q1–Q7 | 7 | 42 | 42 | 4 | Merged, Pages workflow running |
| 1.4 Q1–Q5 | 5 | 7 | 7 | 0 | Local tests passed, hosted checks running |
| 1.5 Q1–Q11 | 11 | 20 | 20 | 4 | Local tests passed, hosted checks running |
| 1.6 Q1–Q13 | 13 | 23 | 23 | 4 | Local tests passed, hosted checks running |
| 1.7 Q1–Q20 | 20 | 20 | 19 | 2 | Local tests passed, hosted checks running |

- **Exercise 1.3.** The independent checks enumerate set rosters and evaluate the four disjoint Venn regions for each relevant expression. Q6 uses the correct figure numbers for each edition. PR #432 passed unit, four Chromium/WebKit shards, Firestore and the required risk gate. Its merged SHA is `0d6e4e7eb407b8d93ed4af0ab183e06b58af6e8a`. [PR #432](https://github.com/vigneswaranmba20-afk/Triggle/pull/432) · [Pre-merge checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45678186546) · [Pages workflow](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45681691336)
- **Exercises 1.4–1.7.** The independent checks cover roster membership and counterexamples, set identities and diagrams, exact exclusive-region counts, and MCQ choices. Q3 of Exercise 1.5 uses the distinct identity printed in each edition. Q12 of Exercise 1.7 has an unscored conditional explanation in both languages. The batch passed local `npm test`, all focused bilingual Chromium checks at widths 320, 360, 390 and 412 px, offline reopen, and progress restoration. The PR head is `f819d9cd4169f6540c24378b8137d9d44c43efab`. [PR #433](https://github.com/vigneswaranmba20-afk/Triggle/pull/433) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45682881316)
- The original SVG figures use bilingual contextual descriptions and the existing full-screen figure reader. No separate worked-example section, exercise videos, or new data tables were introduced in these batches. [Student site](https://vigneswaranmba20-afk.github.io/Triggle/site/)

## Source differences and remaining work

- **Grade 9 Exercise 1.7 Q12, EN PDF p. 43 and TA p. 46.** The overlap is five plus the number who play neither game. Five follows if all 50 play at least one. Keep the unscored conditional solution unless the source is corrected.
- **Grade 9 Exercise 2.5 Q3, EN PDF p. 65 and TA p. 70.** English prints `(vi)` for the fourth expression and Tamil prints `(iv)`. The expression maps to the stable `g9-ch2-ex5-q3-iv` card.
- **Grade 9 Exercise 6.5 Q5 and Q6, EN PDF p. 246 and TA p. 260.** Q5 has two listed solutions, 30° and 60°. Q6 evaluates to about 5.3985 and none of the options matches. Record the discrepancy at the student question and seek an official erratum. The seven previously identified Grade 10 source limitations, including contradictory or omitted premises, are listed with task IDs, evidence and proposed resolutions in the inventory.
- **Coverage and verification.** The 119 partial candidates, figure and hint checks, exact completed-language counts and second independent source-to-runtime reconciliation remain open. The first confirmed Tamil final-answer gap under repair is Grade 9 Exercise 2.9, whose 20 existing cards must keep their IDs and progress. Full mathematical evidence coverage and production spot checks are outstanding.
- **Editorial and release gates.** Independent Tamil editorial certification and teacher approval remain pending. The post-merge Pages gate for PR #432 and all hosted checks for PR #433 must finish before marking those releases live. The Grade 10 Tamil reference URL needs the matching current link. The independent MathGuard PR remains in its own workflow. [MathGuard PR #425](https://github.com/vigneswaranmba20-afk/Triggle/pull/425)
