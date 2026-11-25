# TRACE Final Frontier

**Mission in progress. Android release preparation is NO-GO.** The first source-to-runtime reconciliation covers all 17 chapters and 129 textbook exercise sections. It identified five completely absent sections, all in Grade 9 Set Language. Exercises 1.3–1.7 are live. They add 56 cards covering 112 canonical tasks, with 111 checked bilingual solutions and one unscored source ambiguity. Exercise 2.9 is also live, adding production verification for 20 existing Real Numbers cards. The checkpoint tracks the coordinated releases and the remaining mathematical and bilingual reconciliation.

- [Machine-readable inventory](TRACE_FINAL_FRONTIER_INVENTORY.json)
- [One row per candidate canonical task](TRACE_FINAL_FRONTIER_INVENTORY.csv)
- [Release and verification checkpoint](TRACE_FINAL_FRONTIER_CHECKPOINT.json)

## Sources and counting

All four 2025 revised Tamil Nadu SCERT PDFs were retrieved and matched the registered SHA-256 digests. The Grade 10 Tamil PDF with the registered bytes is the copy at Drive ID `1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC`. The older student-facing link in the baseline is inaccessible. [2025 source register](../../reference-library/2025-user-textbook-manifest.json) · [Grade 10 Tamil source](https://drive.google.com/file/d/1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC/view)

The baseline is production commit `7b39aef78215088ccd64576f983d71f665f82066`. The current column uses the live Set Language and Real Numbers releases and the separately tracked release candidates. A numbered question may bundle several canonical tasks. Grade 9 Exercise 6.3 has one unnumbered stem and four tasks. Grade 10 has 17 preserved older Trigonometry bookmarks suppressed in the catalogue when the canonical label is present. The JSON records the distinction between a registered ID and catalogue visibility. [Baseline deployment](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45667113749)

The numbers below reflect the current reconciliation. Fresh source-text extraction was reconciled with the reader overrides and captured source pages. An independent Tamil pass matched all 129 exercise headings and confirmed their numbered sequences, with Grade 9 Exercise 4.2 checked from its source manifest. Subsequent subpart review added two candidates each for Grade 9 Statistics, Grade 9 Probability, and Grade 10 Relations and Functions. Some grouping and source-to-card comparisons still require a second independent review. The CSV provides a scope row and language fields for every candidate task. Fully completed English, Tamil and bilingual totals are unknown until that review. `PARTIAL` includes confirmed or suspected English prose in Tamil rendering and tasks whose remaining language evidence still needs review. `Math evidence` counts only exact task evidence checked or rerun for this ledger. The Grade 10 evidence joins exact registered IDs to page-visual manifests and tests rerun in the repository suite. Additional evidence elsewhere remains to be joined. No percentages are calculated from provisional totals.

| Grade | Exercise sections | Numbered questions | Canonical tasks | Registered records before → candidate | Missing eligible before → candidate | Partial before → candidate | Source blocked | Math evidence | Live verified |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 60 | 482 | 843 | 690 → 746 | 111 → 0 | 45 → 0 | 3 | 270 | 131 |
| 10 | 69 | 664 | 931 | 881 → 881 | 0 → 0 | 19 → 0 | 9 | 419 | 0 |

## Chapter reconciliation

| Grade | Chapter | Title | Sections | Numbered | Canonical | Missing eligible before → candidate | Partial before → candidate | Source blocked | Math evidence | Live verified |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 1 | Set Language | 7 | 72 | 176 | 111 → 0 | 0 → 0 | 1 | 111 | 111 |
| 9 | 2 | Real Numbers | 9 | 53 | 120 | 0 → 0 | 40 → 0 | 0 | 40 | 20 |
| 9 | 3 | Algebra | 15 | 109 | 227 | 0 → 0 | 2 → 0 | 0 | 2 | 0 |
| 9 | 4 | Geometry | 7 | 69 | 86 | 0 → 0 | 0 → 0 | 0 | 86 | 0 |
| 9 | 5 | Coordinate Geometry | 6 | 58 | 75 | 0 → 0 | 1 → 0 | 0 | 20 | 0 |
| 9 | 6 | Trigonometry | 5 | 30 | 54 | 0 → 0 | 0 → 0 | 2 | 0 | 0 |
| 9 | 7 | Mensuration | 4 | 36 | 42 | 0 → 0 | 0 → 0 | 0 | 0 | 0 |
| 9 | 8 | Statistics | 4 | 30 | 32 | 0 → 0 | 2 → 0 | 0 | 11 | 0 |
| 9 | 9 | Probability | 3 | 25 | 31 | 0 → 0 | 0 → 0 | 0 | 0 | 0 |
| 10 | 1 | Relations and Functions | 7 | 69 | 124 | 0 → 0 | 6 → 0 | 0 | 6 | 0 |
| 10 | 2 | Numbers and Sequences | 11 | 115 | 161 | 0 → 0 | 5 → 0 | 0 | 5 | 0 |
| 10 | 3 | Algebra | 21 | 140 | 236 | 0 → 0 | 0 → 0 | 1 | 97 | 0 |
| 10 | 4 | Geometry | 6 | 78 | 88 | 0 → 0 | 0 → 0 | 4 | 76 | 0 |
| 10 | 5 | Coordinate Geometry | 6 | 75 | 97 | 0 → 0 | 0 → 0 | 0 | 97 | 0 |
| 10 | 6 | Trigonometry | 6 | 52 | 69 | 0 → 0 | 6 → 0 | 2 | 66 | 0 |
| 10 | 7 | Mensuration | 6 | 60 | 62 | 0 → 0 | 0 → 0 | 0 | 33 | 0 |
| 10 | 8 | Statistics and Probability | 6 | 75 | 94 | 0 → 0 | 2 → 0 | 2 | 39 | 0 |

## Curriculum changes and release evidence

| Grade 9 exercise | Added cards | Canonical tasks | Bilingual solutions with checked mathematics | Original SVG figures | Release state |
|---|---:|---:|---:|---:|---|
| 1.3 Q1–Q7 | 7 | 42 | 42 | 4 | Live verified |
| 1.4 Q1–Q5 | 5 | 7 | 7 | 0 | Live verified |
| 1.5 Q1–Q11 | 11 | 20 | 20 | 4 | Live verified |
| 1.6 Q1–Q13 | 13 | 23 | 23 | 4 | Live verified |
| 1.7 Q1–Q20 | 20 | 20 | 19 | 2 | Live verified |

- **Exercise 1.3.** The independent checks enumerate set rosters and evaluate the four disjoint Venn regions for each relevant expression. Q6 uses the correct figure numbers for each edition. PR #432 passed unit, four Chromium/WebKit shards, Firestore and the required risk gate. Its merged SHA is `0d6e4e7eb407b8d93ed4af0ab183e06b58af6e8a`. [PR #432](https://github.com/vigneswaranmba20-afk/Triggle/pull/432) · [Pre-merge checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45678186546) · [Pages publish job](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45681691336/job/139452144134) · [Live Exercise 1.3](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch1-ex1.3-q1)
- **Exercises 1.4–1.7.** The independent checks cover roster membership and counterexamples, set identities and diagrams, exact exclusive-region counts, and MCQ choices. Q3 of Exercise 1.5 uses the distinct identity printed in each edition. Q12 of Exercise 1.7 has an unscored conditional explanation in both languages. The batch passed local `npm test`, all focused bilingual Chromium checks at widths 320, 360, 390 and 412 px, offline reopen, and progress restoration. The merged SHA is `452540614a3043c1a1a7b7b85f58e9ff7107f9be`. All 49 cards passed the live 390 px bilingual sweep, and deployed bytes matched the 23 changed site files. [PR #433](https://github.com/vigneswaranmba20-afk/Triggle/pull/433) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45682881316) · [Pages publish job](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45685647834/job/139467154560) · [Live Exercise 1.7](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch1-ex1.7-q1)
- **Grade 9 Real Numbers.** PR #434 completed the 20 Exercise 2.9 MCQs with bilingual working, feedback, hints and fractional notation. All 755 Grade 9 cards passed the local typography sweep. The full hosted gate and Pages publish succeeded for `bdb2a4a06a71530eee7b61443a67a3d25d2ed1ae`. Eight changed site files matched the deployed bytes and all 20 cards passed the bilingual 390 px live check. The release also corrected 20 Tamil final answers in existing Real Numbers cards and restored the Grade 10 Tamil PDF link. [PR #434](https://github.com/vigneswaranmba20-afk/Triggle/pull/434) · [Checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45688847027) · [Pages publish job](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45691758754/job/139487138252) · [Live Exercise 2.9](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch2-ex9-q1)
- **Grade 9 Coordinate Geometry.** PR #435 corrects Q1(iii) to `|c−a|`, localizes equation labels, and adds four scaled diagrams. All 20 tasks passed independent checks across 12 stable cards. The four-width bilingual, offline figure and retained-progress checks passed locally. The head under hosted checks is `269cb96ae86d10261809e082f5fd52d1f634a01a`. [PR #435](https://github.com/vigneswaranmba20-afk/Triggle/pull/435) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45691981458)
- **Tamil solution follow-ups.** PR #436 corrects 19 Grade 10 final answers and two equations, with all 19 English outputs preserved. PR #437 finishes the Tamil equation labels for 20 Grade 9 Real Numbers tasks and supplies Tamil conclusions for Grade 9 Algebra Exercise 3.1 Q11 and Q12. Both passed focused deterministic checks, bilingual checks at 320, 360, 390 and 412 px, and offline progress checks. They are queued behind Coordinate Geometry. [PR #436](https://github.com/vigneswaranmba20-afk/Triggle/pull/436) · [PR #437](https://github.com/vigneswaranmba20-afk/Triggle/pull/437)
- **Grade 9 Statistics.** Nine printed tables have accessible row and column headers in both languages. Exercise 8.3 Q6 now gives `55.9 kg` for the mean, `793/14 kg ≈ 56.64 kg` for the median, and `58.5 kg` for the mode. Independent exact arithmetic and the four-width bilingual, offline and retained-progress checks passed. The broader regression is in progress.

## Source differences and remaining work

- **Grade 9 Exercise 1.7 Q12, EN PDF p. 43 and TA p. 46.** The overlap is five plus the number who play neither game. Five follows if all 50 play at least one. Keep the unscored conditional solution unless the source is corrected.
- **Grade 9 Exercise 2.5 Q3, EN PDF p. 65 and TA p. 70.** English prints `(vi)` for the fourth expression and Tamil prints `(iv)`. The expression maps to the stable `g9-ch2-ex5-q3-iv` card.
- **Grade 9 Exercise 6.5 Q5 and Q6, EN PDF p. 246 and TA p. 260.** Q5 has two listed solutions, 30° and 60°. Q6 evaluates to about 5.3985 and none of the options matches. Record the discrepancy at the student question and seek an official erratum. The nine Grade 10 source limitations are listed by task ID, including the two Grade 10 Exercise 6.1 Q7 premises that make the requested reasoning undefined or impossible.
- **Grade 9 Exercise 8.3 Q6, EN PDF p. 293 and TA p. 311.** English asks for the mode. Tamil also asks for the mean and median. Both answer appendices list the mode. The candidate retains both versions of the prompt and provides all three solutions in both languages.
- **Coverage and verification.** The candidate closes all identified question-presence and visible answer-field gaps. Grade 10 Exercise 1.3 Q10 and Exercise 3.3 Q4 still need the printed tables restored. Full question-level mathematical evidence, other source figures and hints, and exact whole-grade bilingual and live counts remain open. The CSV records the remaining task IDs and source locators.
- **Editorial and release gates.** Independent Tamil editorial certification and teacher approval remain pending. The second source-to-runtime reconciliation and the remaining production releases are outstanding. The independent MathGuard PR continues in its own workflow. [MathGuard PR #425](https://github.com/vigneswaranmba20-afk/Triggle/pull/425)
