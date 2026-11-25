# Grade 10 Chapter 8 Statistics and Probability

## Curriculum coverage

The baseline was Triggle main at `327ec4de48264c5358c5e7b351afc49d6158f229`. The revised 2025 English and Tamil PDFs match the recorded Drive file checksums. The original chapter spans English printed pages 301–333 and Tamil printed pages 309–346. The answer keys are on English printed page 342 and Tamil printed page 357.

The source inventory contains 75 numbered questions and 94 canonical tasks. The baseline displayed 53 tasks across Exercises 8.1–8.3, including Tamil working applied during app startup. There were no student records for Exercises 8.4, 8.5 or Unit Exercise 8, and there was no Chapter 8 concept studio.

| Exercise | Source questions | Source tasks | Baseline runtime tasks | Live English tasks | Live unconditional Tamil tasks | Source limits |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 8.1 | 15 | 16 | 16 | 16 | 15 | Q5 provides a conditional Tamil solution for the nine wages actually listed |
| 8.2 | 8 | 8 | 8 | 8 | 8 | Q6 explains the textbook rounding convention |
| 8.3 | 13 | 29 | 29 | 29 | 29 | Q8 retains the source label discrepancy; Q12 states the probability model |
| 8.4 | 13 | 15 | 0 | 14 | 14 | Q1 quarantined |
| 8.5 | 15 | 15 | 0 | 14 | 14 | Q11 quarantined |
| Unit Exercise 8 | 11 | 11 | 0 | 11 | 11 | Q5 retains exact values and correct final rounding |
| **Total** | **75** | **94** | **53** | **92** | **91** | **Two absent tasks and one conditional Tamil task** |

The release adds 39 bilingual canonical tasks. It covers 73 numbered questions in English and 72 with unconditional bilingual solutions. All 94 canonical tasks are accounted for in the [mission checkpoint](g10-ch8-mission-checkpoint.json). Independent Tamil editorial approval remains pending.

## Concept studio and student experience

- Fifteen lessons cover §§8.1–8.6 in textbook order, including weighted mean, range, deviations, variance, standard deviation, grouped and ungrouped methods, coefficient of variation, sample spaces, tree diagrams, event relationships, complements, event algebra and the two- and three-event addition theorems.
- Students can change the inputs in a distribution plot, compare coefficients of variation, enumerate sample spaces, trace a tree branch, and select a region of a probability Venn diagram. The studio also demonstrates how inclusion–exclusion counts an outcome belonging to several events.
- Five Exercise 8.1 tables and four Unit Exercise 8 tables appear as native HTML tables. Exercise 8.3 retains its three figures and now has Tamil labels. Exercise 8.4 Q6 adds an original ordered-dice grid. Concept and textbook routes link in both directions.
- The chapter uses the existing bilingual reader, structured offline KaTeX, difficulty metadata, question navigation and progress storage.

## Source discrepancies and mathematical decisions

| Task | Printed source or key | Working and release disposition |
| --- | --- | --- |
| 8.1 Q5 | English specifies nine workers. Tamil specifies ten. Both list nine wages. | Tamil shows the exact stem, explains the missing observation and gives the result for the nine listed wages only. |
| 8.1 Q6 | Both keys give 6.9. | There are 156 daily strikes. Repeating the hourly counts 1–12 twice leaves the standard deviation unchanged at √(143/12), about 3.45. |
| 8.1 Q7 | Both keys give 6.05. | The exact result √(110/3) rounds to 6.06. |
| 8.2 Q6 | Both keys give 10.07%. | The existing solution explains why intermediate rounding gives 10.07% and final-only rounding gives 10.06%. |
| 8.3 Q8 | Tamil repeats label (ii) where the third task appears. | Preserves the printed label and the independent canonical part ID. |
| 8.3 Q12 | The text gives each shopper a uniform choice of day. | Working explicitly uses independent day choices, the model consistent with the keyed 36 ordered outcomes. |
| 8.4 Q1 | The union is printed as 1/3 while P(A) = 2/3. Both keys give 11/15. | A is contained in the union. The printed givens cannot coexist, and 11/15 exceeds both event probabilities. The original stems and bilingual explanation are preserved in the fidelity record. |
| 8.4 Q7 | The English key gives 13/18 and the Tamil key gives 5/6. | There are 11 primes, three multiples of seven, and one overlap among 18 cards. The solution gives 13/18. |
| 8.5 Q11 | The page count is absent. The English and Tamil keys give 7/10 and 3/10 respectively. | Pages 1–10 give 7/10 and pages 1–9 give 6/9. There is no unconditional choice. Both stems and all choices remain in the fidelity record. |
| Unit Q5 | Both keys give standard deviation 1.53. | The exact mean is 31/6 and exact standard deviation is √85/6, which rounds to 1.54. |

## Verification and release

Targeted tests cover original wording and choices, frequency counts, exact and rounded arithmetic, probability bounds, registered IDs, KaTeX, mobile layout, exercise navigation, linked concepts and correct-answer feedback. The 15 concept lessons were exercised in both languages across 320, 390, 412 and 1024 pixel viewports. The full local non-browser regression passed. The four GitHub Chromium/WebKit shards, core suite, Firestore tests and required quality gate passed on both the reviewed PR head and the merged commit.

- [Chapter 8 pull request](https://github.com/vigneswaranmba20-afk/Triggle/pull/428)
- [Production Chapter 8 overview](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&chapter=g10-ch8)
- [Production exercise index](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&chapter=g10-ch8&section=exercises)
- [Production concept studio](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&chapter=g10-ch8&section=concepts)

Obtain authorized textbook clarification for the two quarantined tasks and the missing Tamil wage. Commission independent Tamil editorial review of the complete chapter.

## Production release record

- Reviewed branch head `f4cbfad45c76ba6409fbbcdb023e67204c1b289a`. [PR quality run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45580599291)
- GitHub Pages published merged commit `213e207ca8047e20ca188229ee584074a4ebf626`. The site tree on main matched the reviewed branch, and eight served files were compared byte for byte with the merge commit. [Successful Pages workflow](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45582715378)
- Production Chromium checks at 390 pixels exercised six representative questions, one from each exercise, in English and Tamil. The test opened a figure, followed previous/next navigation, and used the linked probability Venn diagram. The Tamil studio and target diagram also passed a separate local offline test at 320 pixels. [Live exercise reader](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&question=c10-8-ex8-4-q6)

Paid external LLM expenditure was zero.
