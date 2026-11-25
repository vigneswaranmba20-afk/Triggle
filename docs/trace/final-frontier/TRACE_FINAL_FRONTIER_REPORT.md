# TRACE Final Frontier

**Mission in progress. Android release preparation is NO-GO.** The first source-to-runtime reconciliation covers all 17 chapters and 129 textbook exercise sections. It identified five completely absent sections, all in Grade 9 Set Language. Exercises 1.3–1.7 are live. They add 56 cards covering 112 canonical tasks, with 111 checked bilingual solutions and one unscored source ambiguity. Exercise 2.9 is also live, adding production verification for 20 existing Real Numbers cards. Coordinate Geometry Exercise 5.2 is also live. The checkpoint preserves each release and the remaining mathematical and bilingual work.

- [Machine-readable inventory](TRACE_FINAL_FRONTIER_INVENTORY.json)
- [One row per candidate canonical task](TRACE_FINAL_FRONTIER_INVENTORY.csv)
- [Release and verification checkpoint](TRACE_FINAL_FRONTIER_CHECKPOINT.json)

## Sources and counting

All four 2025 revised Tamil Nadu SCERT PDFs were retrieved and matched the registered SHA-256 digests. The Grade 10 Tamil PDF with the registered bytes is the copy at Drive ID `1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC`. The older student-facing link in the baseline is inaccessible. [2025 source register](../../reference-library/2025-user-textbook-manifest.json) · [Grade 10 Tamil source](https://drive.google.com/file/d/1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC/view)

The baseline is production commit `7b39aef78215088ccd64576f983d71f665f82066`. The current column uses the live Set Language, Real Numbers and Coordinate Geometry releases and the separately tracked release candidates. A numbered question may bundle several canonical tasks. Grade 9 Exercise 6.3 has one unnumbered stem and four tasks. Grade 10 has 17 preserved older Trigonometry bookmarks suppressed in the catalogue when the canonical label is present. The JSON records the distinction between a registered ID and catalogue visibility. [Baseline deployment](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45667113749)

The numbers below reflect the current reconciliation. Fresh source-text extraction was reconciled with the reader overrides and captured source pages. An independent Tamil pass matched all 129 exercise headings and confirmed their numbered sequences, with Grade 9 Exercise 4.2 checked from its source manifest. Subsequent subpart review added two candidates each for Grade 9 Statistics, Grade 9 Probability, and Grade 10 Relations and Functions. Some grouping and source-to-card comparisons still require a second independent review. The CSV records both-language fields and outstanding visual and teaching checks for every candidate task. Fully completed English, Tamil and bilingual totals are unknown until that review. `PARTIAL` includes confirmed or suspected English prose in Tamil rendering and tasks whose remaining language evidence still needs review. `Math evidence` counts only exact task evidence checked or rerun for this ledger. The Grade 10 evidence joins exact registered IDs to page-visual manifests and tests rerun in the repository suite. Additional evidence elsewhere remains to be joined. The inventory tracks mathematical evidence, bilingual reader coverage and verified production coverage separately.

| Grade | Exercise sections | Numbered questions | Canonical tasks | Registered records before → candidate | Missing eligible before → candidate | Partial before → candidate | Source blocked | Math evidence | Live verified |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 60 | 482 | 843 | 690 → 746 | 111 → 0 | 45 → 0 | 3 | 282 | 151 |
| 10 | 69 | 664 | 931 | 881 → 881 | 0 → 0 | 22 → 344 | 10 | 543 | 19 |

## Chapter reconciliation

| Grade | Chapter | Title | Sections | Numbered | Canonical | Missing eligible before → candidate | Partial before → candidate | Source blocked | Math evidence | Live verified |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 9 | 1 | Set Language | 7 | 72 | 176 | 111 → 0 | 0 → 0 | 1 | 111 | 111 |
| 9 | 2 | Real Numbers | 9 | 53 | 120 | 0 → 0 | 40 → 0 | 0 | 40 | 20 |
| 9 | 3 | Algebra | 15 | 109 | 227 | 0 → 0 | 2 → 0 | 0 | 13 | 0 |
| 9 | 4 | Geometry | 7 | 69 | 86 | 0 → 0 | 0 → 0 | 0 | 86 | 0 |
| 9 | 5 | Coordinate Geometry | 6 | 58 | 75 | 0 → 0 | 1 → 0 | 0 | 21 | 20 |
| 9 | 6 | Trigonometry | 5 | 30 | 54 | 0 → 0 | 0 → 0 | 2 | 0 | 0 |
| 9 | 7 | Mensuration | 4 | 36 | 42 | 0 → 0 | 0 → 0 | 0 | 0 | 0 |
| 9 | 8 | Statistics | 4 | 30 | 32 | 0 → 0 | 2 → 0 | 0 | 11 | 0 |
| 9 | 9 | Probability | 3 | 25 | 31 | 0 → 0 | 0 → 0 | 0 | 0 | 0 |
| 10 | 1 | Relations and Functions | 7 | 69 | 124 | 0 → 0 | 6 → 0 | 0 | 10 | 6 |
| 10 | 2 | Numbers and Sequences | 11 | 115 | 161 | 0 → 0 | 8 → 0 | 1 | 8 | 5 |
| 10 | 3 | Algebra | 21 | 140 | 236 | 0 → 0 | 0 → 12 | 1 | 214 | 0 |
| 10 | 4 | Geometry | 6 | 78 | 88 | 0 → 0 | 0 → 39 | 4 | 76 | 0 |
| 10 | 5 | Coordinate Geometry | 6 | 75 | 97 | 0 → 0 | 0 → 97 | 0 | 97 | 0 |
| 10 | 6 | Trigonometry | 6 | 52 | 69 | 0 → 0 | 6 → 60 | 2 | 66 | 6 |
| 10 | 7 | Mensuration | 6 | 60 | 62 | 0 → 0 | 0 → 62 | 0 | 33 | 0 |
| 10 | 8 | Statistics and Probability | 6 | 75 | 94 | 0 → 0 | 2 → 74 | 2 | 39 | 2 |

## Curriculum changes and release evidence

| Grade and exercise | Added cards | Reviewed canonical tasks | Original assets |
|---|---:|---:|---|
| Grade 9 Exercise 1.3 Q1–Q7 | 7 | 42 | 4 Venn diagrams |
| Grade 9 Exercise 1.4 Q1–Q5 | 5 | 7 | |
| Grade 9 Exercise 1.5 Q1–Q11 | 11 | 20 | 4 Venn diagrams |
| Grade 9 Exercise 1.6 Q1–Q13 | 13 | 23 | 4 Venn diagrams |
| Grade 9 Exercise 1.7 Q1–Q20 | 20 | 20 | 2 Venn diagrams |
| Grade 9 Exercise 2.9 Q1–Q20 | 0 | 20 | |
| Grade 9 Exercise 5.2 Q1–Q12 | 0 | 20 | 4 scaled coordinate figures |
| Grade 9 Exercises 8.1, 8.2 and 8.3 | 0 | 11 | 9 semantic data tables |
| Grade 10 Exercises 1.3 and 3.3 | 0 | 6 | 3 semantic data tables and 3 Tamil figure variants |
| Grade 9 Exercises 3.10 and 5.6 | 0 | 12 | 12 scaled figures |

- **Grade 9 Set Language 1.3** · `LIVE_VERIFIED`. Seven new cards cover 42 textbook tasks. Independent roster enumeration and region truth tables checked the solutions. Thirteen deployed site files matched and all seven cards passed the bilingual reader check. Revision `0d6e4e7eb407b8d93ed4af0ab183e06b58af6e8a`. [PR #432](https://github.com/vigneswaranmba20-afk/Triggle/pull/432) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45678186546) · [Pages publish](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45681691336/job/139452144134) · [Live exercise](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch1-ex1.3-q1)
- **Grade 9 Set Language 1.4–1.7** · `LIVE_VERIFIED`. Forty-nine new cards cover 70 tasks, including 69 checked bilingual solutions and an unscored conditional explanation at Exercise 1.7 Q12. All 49 cards passed the live bilingual sweep, and 23 changed site files matched the deployed bytes. Revision `452540614a3043c1a1a7b7b85f58e9ff7107f9be`. [PR #433](https://github.com/vigneswaranmba20-afk/Triggle/pull/433) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45682881316) · [Pages publish](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45685647834/job/139467154560) · [Live exercise](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch1-ex1.4-q1)
- **Grade 9 Real Numbers** · `LIVE_VERIFIED`. All 20 Real Numbers MCQs now have bilingual working, feedback and hints. The full 755-card Grade 9 typography sweep passed. Eight changed site files matched production, all 20 MCQs passed the live bilingual check, and the Grade 10 Tamil source link now opens the registered copy. Revision `bdb2a4a06a71530eee7b61443a67a3d25d2ed1ae`. [PR #434](https://github.com/vigneswaranmba20-afk/Triggle/pull/434) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45688847027) · [Pages publish](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45691758754/job/139487138252) · [Live exercise](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch2-ex9-q1)
- **Grade 9 Coordinate Geometry** · `LIVE_VERIFIED`. Corrected Q1(iii) to |c−a|, completed Tamil equation labels, and added four scaled figures. All 12 cards passed the 390 px production check in English and Tamil. Ten site files matched the deployed revision. Revision `56635d458a0332ed085fd2c5d34e1b6423c47219`. [PR #435](https://github.com/vigneswaranmba20-afk/Triggle/pull/435) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45691981458) · [Pages publish](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45695859868/job/139504815478) · [Live exercise](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&question=g9-ch5-ex5.2-q1-iii)
- **Grade 10 Tamil displays** · `LIVE_VERIFIED`. Corrected 19 Grade 10 Tamil final answers and two worked equations. Deterministic checks preserved the English displays, and all four mobile widths and offline progress passed locally. Revision `03e716eb769366748217c51b09009c2d8a7f6a38`. [PR #436](https://github.com/vigneswaranmba20-afk/Triggle/pull/436) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45696488927) · [Pages publish](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45699947516/job/139514826451) · [Live exercise](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&question=c10-1-ex1-1-q5)
- **Grade 9 Tamil working** · `MERGED`. Localized the remaining equation labels across 20 Real Numbers cards and added Tamil conclusions for Algebra Exercise 3.1 Q11 and Q12. Focused bilingual checks at four mobile widths and offline progress passed. Revision `32ee7cb58e78ed8cf7dbb32995fad82b4fa1d122`. [PR #437](https://github.com/vigneswaranmba20-afk/Triggle/pull/437) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45698190245) · [Pages run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45702720071)
- **Grade 9 Statistics** · `TESTED`. Restored nine printed tables. Exercise 8.3 Q6 now gives a mean of 55.9 kg, median of 793/14 kg (about 56.64 kg), and mode of 58.5 kg. Independent arithmetic, four mobile widths, offline operation and retained progress passed. Revision `1d4a7a96876a6588fb3aaf4048d4ac6350c6fdbe`. [PR #438](https://github.com/vigneswaranmba20-afk/Triggle/pull/438) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45698197473)
- **Grade 10 source tables and figures** · `TESTED`. Restored Grade 10 Exercise 1.3 Q10 and Exercise 3.3 Q4(i) and (ii) as accessible tables. The Relations and Functions full-screen figures also have Tamil labels. Independent arithmetic, the Relations and Functions typography suite, Algebra smoke checks, and four-width bilingual and offline verification passed. Revision `891f046ccbeb26d7dda668bc25eb9daf56c452ba`. [PR #439](https://github.com/vigneswaranmba20-afk/Triggle/pull/439) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45698184974)
- **Grade 9 graphs** · `TESTED`. Added all 11 Grade 9 Algebra Exercise 3.10 solution plots and the quadrant plot for Coordinate Geometry Exercise 5.6 Q4. Exact line endpoints and intersections, bilingual Figure view, four mobile widths, offline operation and the full Grade 9 typography suite passed. Revision `bd7777f5ef2f49db9baa59ddb97be270ed2185dd`. [PR #440](https://github.com/vigneswaranmba20-afk/Triggle/pull/440) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45698510313)
- **Grade 9 step explanations** · `TESTED`. Added source-matched explanations to 14 Algebra and seven Coordinate Geometry cards. Revision `9422df6e0ffbfb3f5ab2f17e40c3527c13afe325`. [PR #441](https://github.com/vigneswaranmba20-afk/Triggle/pull/441) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45700509362)
- **Grade 10 Numbers and Sequences explanations** · `TESTED`. Addresses the 123 Grade 10 Numbers and Sequences cards that lacked a visible explanatory hint. Revision `27b91cdef8812cbda4e2d3a81c10a75d3ce9c908`. [PR #442](https://github.com/vigneswaranmba20-afk/Triggle/pull/442) · [Hosted checks](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45701636311)

## Source differences and remaining work

- **Grade 9 Exercise 1.7 Q12, EN PDF p. 43 and TA p. 46.** The overlap is five plus the number who play neither game. Five follows if all 50 play at least one. The reader preserves the unscored conditional explanation.
- **Grade 9 Exercise 2.5 Q3, EN PDF p. 65 and TA p. 70.** English prints `(vi)` for the fourth expression and Tamil prints `(iv)`. Both map to the stable `(iv)` record.
- **Grade 9 Exercise 5.2 Q1 and Exercise 5.6 Q4.** English repeats `(ii)` for the third distance expression. Tamil prints `(iii)`. The Tamil Exercise 5.6 Q4 option for S contains an extra conjunction. The coordinates and correct choice Q and R agree across both editions.
- **Grade 9 Exercise 6.5 Q5 and Q6, EN PDF p. 246 and TA p. 260.** Q5 has two listed solutions, 30° and 60°. Q6 evaluates to approximately 5.3985 and none of its choices matches. Both remain quarantined in the inventory.
- **Grade 9 Exercise 8.3 Q6, EN PDF p. 293 and TA p. 311.** The Tamil question asks for mean and median as well as mode. Both answer appendices show the mode. The candidate preserves the edition-specific prompts and provides all three solutions in both languages.
- **Grade 10 source limitations.** The inventory lists every known source-blocked task with the exact canonical ID, evidence and proposed resolution. Exercise 6.1 Q7(i) has an impossible real-angle premise. In Q7(ii), the given value makes both sides undefined. The figures and final totals leave those cards outside verified completion.
- **Teacher and Tamil editorial reviews.** Both are pending. Independent mathematical evidence is linked where available. Complete source and instructional verification across all 17 chapters still requires the open releases and the remaining question-level evidence. [MathGuard PR #425](https://github.com/vigneswaranmba20-afk/Triggle/pull/425)
- **Reader reconciliation.** The reviewed local candidate opened 1,610 catalogue cards in English and Tamil at 390 px. Each had the question, worked steps and final answer. Chromium found zero KaTeX errors and zero page overflows. The ledger identifies 0 Grade 9 and 355 Grade 10 cards still requiring a visible bilingual step explanation at this checkpoint.
