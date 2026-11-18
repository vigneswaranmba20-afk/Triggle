# Class 9 worked mathematics and comprehension follow-up

The initial audit used main at `b6c85fe`, whose public Pages output matched the source byte for byte. The release branch starts from `31f4a4e`, the squash commit of [PR #262](https://github.com/vigneswaranmba20-afk/Triggle/pull/262). That PR contributes the ten coefficient conclusions across five Algebra 3.1 Q2 parts and passed the [required quality gate](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44259298081). The follow-up builds on the all-chapter rendering work from [PR #258](https://github.com/vigneswaranmba20-afk/Triggle/pull/258).

## Inventory

The [baseline record inventory](g9-math-first-inventory.csv) identifies chapter, exercise, stable record ID, published languages and previously recorded source-locator languages. The preservation test checks ordered IDs, canonical question text, answer text, the number and order of steps, and every equation against `31f4a4e`. It allows changes to the thirteen Statistics explanation rows and their English fallbacks in the Tamil reader. Set Language changes use authored KaTeX annotations with verbatim fallbacks.

| Chapter | Exercise families | Textbook records | Tamil prompt text | Practice records |
| --- | ---: | ---: | ---: | ---: |
| 1 Set Language | 2 | 64 | 30 | 1 |
| 2 Real Numbers | 9 | 120 | 120 | 1 |
| 3 Algebra | 2 | 54 | 0 | 2 |
| 4 Geometry | 3 | 11 | 0 | 1 |
| 5 Coordinate Geometry | 1 | 8 | 0 | 1 |
| 6 Trigonometry | 5 | 40 | 40 | 0 |
| 7 Mensuration | 4 | 36 | 0 | 1 |
| 8 Statistics | 4 | 30 | 0 | 1 |
| 9 Probability | 3 | 25 | 0 | 1 |
| **Total** | **33** | **388** | **190** | **9** |

The Tamil reader uses the published English fallback for 198 textbook records. The 397 textbook and practice records contain 1,163 worked-step entries. Chapter counts describe integrated records. Chapter completion depends on the full textbook inventory.

## Findings and repairs

| Severity | Finding | Baseline | Candidate |
| --- | --- | --- | --- |
| Medium | Raw caret notation in Set Language working explanations | 7 rows in 6 records | All seven use authored inline KaTeX. Two more Q6(iii) rows consistently typeset geometry and degree notation. |
| Medium | Statistical results or formula inputs needed explicit interpretation | 4 missing result conclusions and 2 partly implicit computation roles in 6 targeted records | All six results are named in context. Thirteen reasons cover signed deviations, units, running totals, modal-class frequencies and boundaries. |
| Medium | Probability concept quiz used “impossible probability” ambiguously | 1 question offered both a valid probability of zero and a value outside the range | The revised question asks which number cannot be a probability. Feedback names both endpoints and explains zero. |
| Medium | Grade 9 optional explanations undershot the mobile reading and touch targets | 383 disclosures, with hint prose at 12.5–13 px, summary text at 12 px and touch targets of 36–38 px | Hint prose 16–18 px, summary text 14 px, minimum target 44 px. |
| Medium | A shared triangle diagram's accessible name described a right triangle | 4 Mensuration altitude sketches used the same inaccurate name | The name identifies an altitude perpendicular to the base. Existing English-only figure names carry the correct language attribute. |
| Medium | Grade 9 formula wrappers suppressed natural line breaks and risked clipping tall glyphs | Browser geometry flagged 161 records at 320/393 px for bounds extending more than 2 px outside wrappers. The count describes a layout risk. | Allow KaTeX's inline breakpoints and leave vertical room for scrollers. Trigonometry 6.2 Q1(iii) goes from 339 px in a 243 px wrapper to two lines fitting the wrapper at 320 px. Indivisible wide expressions retain focusable local scrolling. |
| Medium | Tamil source locators led to the wrong pages or were missing | 14 wrong Set Language locators, 20 wrong Statistics locators and 10 absent Statistics locators | Corrected using the actual page images in both 2025 books. |
| High | Raw TeX commands, missing answers or KaTeX failures | 0 in the existing inventory checks | 0. The extended gate also checks raw caret notation. |

Four existing Statistics Why-step disclosures still attach to their original step indices. The two mode hints retain the direction to compare frequencies and avoid conflating a modal interval with the estimated mode.

The family review below identifies eight remaining result-meaning candidates and twenty-seven prerequisite candidates. Those counts refer to specific candidate records, with overlap permitted. Where existing records need additional mathematical or source interpretation, the appropriate follow-up is to validate their 2025 pages and independent calculations before editing. The review identifies two possible source questions in Real Numbers 2.4, already under audit in PR #247, and a known Tamil prompt scope difference for Statistics 8.3 Q6. No editorial or teacher approval is claimed.

## Set Language source comparison

The English 2025 book printed page 12 (PDF page 18) and the Tamil printed pages 13–14 (PDF pages 19–20) were inspected as page images. Q5(iii) is on Tamil page 13. Q6–Q10 are on Tamil page 14. Q6(iii) asks for shapes with an interior-angle sum of 180°. The triangle and quadrilateral sums are `180°` and `360°`. Q7 has two distinct members, giving four subsets. Q9(i–ii) give 8 and 1024 subsets, or 7 and 1023 proper subsets. For Q10, the function `2ⁿ` yields 16 for four elements, 1 for zero elements, and gives eight elements when the power set has 256 entries. The same descriptions and fallback strings remain available. The new annotations give the formulas semantic superscripts in the English question's working, including when opened from the Tamil interface. [English book](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view) · [Tamil book](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

For an independent transfer check, take three distinct members and ask why there are two choices for each member, giving eight subsets, then ask which one to remove to count only proper subsets. The existing lesson already distinguishes a set used as one element from separate members.

## Set Language and Real Numbers concept review

The chapter hub publishes seven Set Language stages, eight Real Numbers stages and five Probability stages. Chapters 3–8 publish worked exercises and optional explanations where authored. The following is a source-level review of the existing teaching examples and questions.

| Concept | Observation and transfer |
| --- | --- |
| What makes a set? | The sorting example shows how membership depends on a precise rule. The novel choice about even numbers tests whether the learner can identify a well-defined rule. |
| Three ways to describe one set | Three renderings represent the same members. A new check would give a description and ask the learner to write the roster instead of identify its name. |
| Types, subsets and cardinality | A repeated letter is visibly counted once. A transfer check with a set as one of the distinct members complements the existing duplicate-letter quiz. |
| Union, intersection and complement | The Venn lab gives the shared area a mathematical purpose. The quiz uses the same overlapping members as the demonstration. A different pair of sets would test transfer. |
| Why set-operation rules work | Swapping the operands demonstrates commutativity. Ask whether swapping operands also leaves a set difference unchanged. |
| De Morgan's laws | The demonstration compares both routes to the same complement. The existing question tests the first route, and a follow-up could ask learners to calculate the intersection of the two complements separately. |
| Counting without counting twice | The overlap control adjusts the actual double-counted group. Give different set sizes and ask for the number in neither group. |
| Rational numbers and number-line density | A common denominator justifies the fraction between two given fractions. The existing check transfers to a different interval. |
| Irrational numbers and decimal expansions | Terminating and recurring decimals are distinguished from irrational examples. Ask learners to use the factors of a reduced denominator to predict whether a fraction terminates. |
| Successive magnification | Each new position divides a visible interval into ten. The interval question uses a separate decimal. |
| Radicals and fractional indices | The worked example identifies the positive fourth root. The mixed rule could state the fractional-power domain separately from the nonzero requirement for reciprocals. This is an editorial follow-up. |
| Surds and their operations | The exercise combines matching radicands after simplification. It checks a different pair from the rule example. |
| Rationalisation and conjugates | The feedback shows multiplying by a form of 1. An independent check can ask when to choose the conjugate for a two-term denominator. |
| Scientific notation | The existing interactive shift affects the actual decimal value and exponent. The small-decimal quiz asks for the direction of the power. |
| Exactness and common errors | The final quiz tests the principal square root. For transfer, compare the principal root with all solutions of the corresponding square equation. |

## Exercise-family comprehension review

The review sampled the prompt and working in all 33 integrated exercise families. Fresh textbook and independent calculation checks covered the individually reviewed repairs. The Statistics page images and calculations are documented below.

| Chapter and exercise | Records | Review |
| --- | ---: | --- |
| Set Language 1.1 | 30 | Membership steps name what ∈ and ∉ mean, and roster steps explain removing repeated letters and keeping or excluding endpoints. Q5(ii) explains the numerator and denominator pattern. |
| Set Language 1.2 | 34 | Cardinality counts distinct members, equal cardinality is distinguished from equal membership, and set-builder boundaries/order remain visible. See the separate Set Language batch for the power-set and subset review. |
| Real Numbers 2.1 | 5 | Worked comparisons include a common positive denominator, nearby decimal places, and the correct negative-number order. Check whether a learner can place an unfamiliar negative fraction between two integers. |
| Real Numbers 2.2 | 16 | Terminating and recurring answers explain remainder behavior. The five recurring-to-fraction records Q4(i), (ii), (iv)–(vi) could show why the chosen shifts align the repeated part before subtraction. In Q4(iv), 100x and 10x both end with .777… when x = 3.1777…. |
| Real Numbers 2.3 | 7 | Irrational-number examples state why the decimal remains nonperiodic or the positive bounds keep their order. The three Q1 construction records cite the semicircle height equation without naming why the two segment lengths multiply to the height squared. A transfer check can construct the length √2 using a diameter split into lengths 1 and 2. |
| Real Numbers 2.4 | 3 | Decimal magnification locates all three points. Q1(i) uses an approximation sign for an exact finite decimal, and Q1(iii)'s “to four decimal places” needs source comparison to distinguish truncation from rounding. Source-audit work was already open in PR #247. |
| Real Numbers 2.5 | 19 | Existing reasons and Why panels identify negative indices as reciprocals and fractional indices as roots. Q4(iii)–(iv) could name the distinct roles of the fractional exponent numerator and denominator in the main step. |
| Real Numbers 2.6 | 21 | Worked examples distinguish like surds, products, and rational or irrational sums. Q4(i) already displays the right descending order but the instruction to “reverse” may suggest the opposite operation. Positive roots of the same index preserve radicand order. |
| Real Numbers 2.7 | 11 | Why panels already explain multiplying by the same nonzero factor above and below the fraction bar. Q3 could name the negative coefficient of √7 and the separate rational term directly next to the result. |
| Real Numbers 2.8 | 18 | The direct conversions identify the direction and size of the decimal shift. Q3(ii), Q3(iii) and Q5(iv) leave the change in exponent during normalization mostly implicit. A separate transfer check can ask why 0.06 × 10⁵ equals 6 × 10³. |
| Real Numbers 2.9 | 20 | The unit questions connect results to exceptions and counterexamples. Q11 already distinguishes the principal square root from the two solutions of a square equation. |
| Algebra 3.1 | 34 | Q2(i–v) is the five-record coefficient pilot in PR #262. The other sampled families identify degree by the largest exponent whose coefficient stays nonzero and explain cancellation or division restrictions. Existing arithmetic validation PRs were already open for Q3–Q4 and Q10–Q12. |
| Algebra 3.2 | 20 | Q1 explicitly connects function notation with input and output, Q3 introduces a zero through substitution, and Q6 identifies horizontal-axis meetings. Q5(i), (iii), and (iv) could directly conclude that the proposed input is a zero once its output is zero, as Q5(ii) already does. |
| Geometry 4.1 | 2 | Angle-ratio working labels the common multiplier and validates the full sum. The proof relates two equal angles to the included equal side and preserves the matching vertex order for ASA. |
| Geometry 4.2 | 5 | Reasons connect supplementary angles, half-diagonals and perpendicular height to their equations. The proof in Q6 visually concludes a factor of one-half; saying the triangle has half the area because both figures share the same base and height would give it a plain-language conclusion. |
| Geometry 4.3 | 4 | Each chord problem names which length its equation finds and distinguishes half-chord from full chord. Q6 could explain why t=4 puts the chord midpoint at the smaller circle's centre, so that h equals its radius. |
| Coordinate Geometry 5.2 | 8 | Collinearity and equal-distance constructions state what the numerical relationships represent. Q5 would benefit from calling out that AB is compared with DC and BC with AD because same-direction vectors must be compared. |

### Chapters 6–9

The Trigonometry records carry earlier-edition provenance. The transfer examples are independent of the textbook sequence.

| Family | Records | Observed strength and remaining comprehension risk | Independent transfer check |
| --- | ---: | --- | --- |
| 6.1 Trigonometric ratios | 10 | Q1 starts with sides relative to B and derives the reciprocal functions. Q5 explains the absolute-value length and gives the symbolic case for \(0<x<1\). It describes the case \(x>1\) in words. A 2025 page-image check would establish the source wording before a lesson edit. | With a 5–12–13 right triangle, identify the side opposite each of the two acute angles and express the two sines. |
| 6.2 Exact special-angle values | 9 | Q1(ii) evaluates the two sides independently and names their equality. Q2(iii) says to substitute powers carefully and could state that the exponent applies to the trigonometric value. | Evaluate twice the square of the sine of 30 degrees and name the number being squared. |
| 6.3 Complementary angles | 4 | Q(i) states the complementary-angle pairs and the reason their ratios are 1. Q(ii) and Q(iv) rely on nonzero denominators. Q(iv) does say “wherever defined” but gives no example of an excluded input. Review domains with the source before expanding either solution. | Pair cosine of 27 degrees with the matching sine and explain when an equal-over-equal quotient can be simplified to 1. |
| 6.4 Tables, minutes and applications | 9 | Q1(ii–vi) consistently divides angular minutes by 60. Q5 correctly calls inverse cosine the angle with cosine 0.8. A learner can still confuse the inverse operation with the reciprocal cosine introduced in 6.1. | Find the acute angle with cosine 0.5 and explain what the result measures. |
| 6.5 Mixed special-angle work | 8 | Q9 explains pairings and the middle factor. Q3 ends with cotangent times tangent equalling 1 without stating that these functions at the same angle are reciprocals. Q8 already explains that the equal pairs cancel. | Evaluate the product of the tangents of 25 and 65 degrees and explain why the product has that value. |
| 7.1 Plane areas and Heron’s formula | 10 | Q6 and Q7 identify the partition and retain units. Q3 uses the Pythagorean converse but leaves implicit that the resulting perpendicular legs are the first two lengths in the area formula. | A right triangle has side lengths in ratio 3:4:5 and perimeter 48 m. Identify the perpendicular sides, then find its area. |
| 7.2 Cube and cuboid surface areas | 7 | Q5 explicitly links lateral area with four side faces. Q7 derives the outer cuboid dimensions but leaves implicit that joined faces are interior and contribute no outer surface area. | Join two 2 cm cubes end to end. Explain which faces become interior and find the total outer area. |
| 7.3 Volumes and capacity | 9 | Q5 aligns wall and brick units, and Q9 names conserved volume. Q3 calls \(x\) a scale factor but gives only the final product as confirmation of the three derived dimensions. Q6 can clarify that length times breadth is the base area used to recover height. | A cuboid with dimensions in ratio 3:2:1 has volume 162 cm³. Recover and name the three dimensions. |
| 7.4 Mensuration mixed review | 10 | Q1 defines semiperimeter and Q5 explains the face count. Q7 gives the square ratio directly. The common factor of six cancels when comparing the two total cube surface areas. | Two cube side lengths are in ratio 3:5. Find the total surface-area ratio and explain why the factor of six cancels. |
| 8.1 Means | 8 | Q2 and Q3 explain reversal and weighting. Q5 needs the meaning of \(p=20\), Q6 the use of a midpoint to represent a whole group, and Q7–Q8 what an average deviation corrects and how class widths convert to years. | Two students score 10 and three score 20. Explain the frequency weights and find the mean. |
| 8.2 Medians | 6 | Q1 and Q2 distinguish location from value and odd from even counts. Q5 gives the grouped median formula without naming all of its parameters or showing why the median class contains the halfway count. | Cumulative counts are 5, 13 and 20. Identify which class contains the halfway count and how far that count lies past the prior class. |
| 8.3 Modes | 6 | Q2 allows a tie and Q4 separates the frequency 37 from the requested size 40. Q5–Q6 need the three neighbouring-frequency roles, and Q5 needs the distinction between a modal class and an estimated mode. | With consecutive frequencies 4, 9 and 6, identify the modal class and label the previous, modal and next frequencies. |
| 8.4 Statistics mixed review | 10 | Q1 names its lower limit and Q10 explicitly names the new mean. Q7 assumes the midpoint property for evenly spaced data without explaining that values equally far below and above it balance. | Explain why the mean of 3, 5, 7, 9 and 11 is 7, then find the mean of the first three. |
| 9.1 Counting outcomes and relative frequency | 10 | Q6 names all three sum events and their outcomes. Q5 lists ordered tosses but does not say that HT and TH identify different coins or positions. The existing sample-space concept already makes that distinction. | For two fair tosses, enumerate the outcomes with exactly one head and calculate their probability. |
| 9.2 Complements | 5 | Q1–Q2 retain the full sample as the denominator. Q3 verifies its two probabilities, but \(x=15/8\) can confuse the valid probability range because \(x\) is a parameter rather than a probability. Q5 already discloses the textbook’s “only part time” interpretation. | If two complementary probabilities are \(x/2\) and \(x/4\), solve for \(x\) and name the two probabilities. |
| 9.3 Probability mixed review | 10 | Q2 distinguishes the interval endpoints, and Q5 names the certain event. Q6 puts “exhaustive and mutually exclusive” together without explaining that exactly one of an event or its complement occurs on each trial. | On a six-sided die, identify the complement of rolling an odd face and verify the two probabilities add to 1. |

## Statistics source comparison and individual review

Both PDFs were downloaded through the connected Drive tool. Their SHA-256 digests match the repository's 2025 upload manifest, and PDF page 2 in each book confirms the 2025 revision. The question pages below were inspected as images. The English and Tamil answer keys on PDF pages 323 and 339 (printed pages 317 and 333) agree on all six results. Tamil 8.3 Q6 asks for mean and median as well as mode. The student reader continues to serve the existing English question and its mode-only solution under its Tamil-pending label.

| Exercise record | EN printed / PDF | TA printed / PDF | Reviewed explanation and independent check | Independent concept check |
| --- | --- | --- | --- | --- |
| `g9-ch8-ex8.1-q5` | 278 / 284 | 294 / 300 | The value 20 means 20 students scored 20 marks. Direct substitution gives a weighted total of 1010 for 50 observations, or 20.2. | In a new frequency table, ask which score the unknown frequency belongs to and what it counts. |
| `g9-ch8-ex8.1-q7` | 278 / 284 | 294 / 300 | The weighted deviation is averaged and added to the chosen midpoint. Directly weighting all midpoints gives 1845 divided by 63, or 205/7 ≈ 29.29. | Choose another assumed mean for a short frequency table and explain why the reported mean stays the same. |
| `g9-ch8-ex8.1-q8` | 278 / 284 | 294 / 300 | The five-year step converts the average deviation back to years before adding 27. Directly weighting the age midpoints gives 3050/105 = 610/21 ≈ 29.05 years. | With classes four years wide and an average coded deviation of −0.5, ask how many years to add to the assumed mean. |
| `g9-ch8-ex8.2-q5` | 284 / 290 | 301 / 307 | The cumulative counts bracket halfway position 25 between 24 and 34. This identifies the 30–40 class and names the formula's four inputs. Linear interpolation gives 30 plus one-tenth of 10, or an estimated median of 31 marks. | Given running totals 6, 15 and 21 for 20 total observations, identify the median class from the halfway count of 10. |
| `g9-ch8-ex8.3-q5` | 287 / 293 | 304 / 310 | The highest class frequency labels 20–30 as the modal class. Its gains over the adjacent frequencies are 8 and 12, giving an estimated mode of 20 + 10 × 8/(8 + 12) = 24 marks. | From a new frequency table, identify the modal interval and the three frequencies used to estimate the mode. |
| `g9-ch8-ex8.3-q6` | 287 / 293 | 305 / 311 | Extending the inclusive endpoints by half a kilogram gives continuous boundaries 54.5–64.5 kg. The two frequency differences are 4 and 6, giving 54.5 + 10 × 4/(4 + 6) = 58.5 kg. | Convert the adjacent weight classes 40–44 and 45–49 to continuous boundaries and identify their shared boundary. |

Four missing result explanations and two wholly or partly implicit roles in computation were found in the selected batch. The changes name all six results in context and clarify five distinct prerequisites (average weighted deviations, coded deviations and units, cumulative-frequency interpolation, neighboring frequencies, and continuous class boundaries). Thirteen reason rows changed. Question text, final answers, equation strings and step order match baseline in all 31 Chapter 8 student records including the separate practice record. The potential transfer checks above remain concept-review prompts and are outside canonical textbook questions.

The Tamil question page mapping now records Exercise 8.1 Q1–Q8 at PDF 300 (printed 294), Exercise 8.2 Q1–Q3 at PDF 306 (printed 300) and Q4–Q6 at PDF 307 (printed 301), Exercise 8.3 Q1–Q5 at PDF 310 (printed 304) and Q6 at PDF 311 (printed 305), and Exercise 8.4 Q1–Q10 at PDF 311 (printed 305). Twenty existing locators pointed to other pages and ten were absent. Source image comparison changes only the six selected English authoring verification labels. Tamil editorial status remains pending for all 30.

- [2025 Grade 9 English textbook](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view)
- [2025 Grade 9 Tamil textbook](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

## Design review of the Statistics batch

These expert-design estimates cover three exercise families. They assess textbook alignment, whether reasons name the relevant quantities, the sequence of working, the purpose of equations beside explanations, usability evidence, and transfer. Learning gains and grade-wide quality scores remain unmeasured.

| Exercise family and teaching focus | Before | After | Evidence behind the change |
| --- | ---: | ---: | --- |
| 8.1 Meaning of frequency and of grouped-mean corrections | 7.7 | 9.0 | The arrow resolves a student count, and the formula steps state what is averaged and when to restore the original unit. |
| 8.2 Grouped median and running totals | 7.3 | 8.8 | The middle rank identifies an interval. The four adjacent symbols name the calculation's inputs and the reason traces the one-tenth move. |
| 8.3 Modal interval, boundaries and mode estimate | 7.3 | 9.0 | The frequencies refer to named neighboring intervals and the final estimate is distinguished from the observed interval. |

The scores apply the master prompt's six weights in order. The before and after scores out of 10 by dimension were 8.1 `10,6,7,7,9,7 → 10,9,9,8,9,7`, 8.2 `10,5,6,7,9,7 → 10,9,8,8,9,7`, and 8.3 `10,5,6,7,9,7 → 10,9,9,8,9,7`. The usability rating is an estimate based on the existing reader and representative browser checks. The proposed concept checks test novel transfer outside the exercise records.

## Probability concept review

Only Chapter 9 publishes concept stages among Chapters 6–9. The chapter hub exposes all five stages in Concepts and Quizzes. Trigonometry, Mensuration and Statistics have exercise records and optional figures where authored. They have no published concept stages in this reader.

| Concept | Review and transfer |
| --- | --- |
| 9.1 Understanding probability | The existing die example maps 0 to an impossible event. The original quiz called a value above 1 “an impossible probability,” also offering a valid probability of 0. The revised question asks what cannot be a probability, keeps 0 and 1.2 among its choices, and names the allowed endpoints and the meaning of 0 in feedback. A fresh check can ask the learner to distinguish −0.1, 0 and 1. |
| 9.2 Random experiments and sample spaces | Ordered tosses connect one trial, a single result, all results and a selected event. The exercise transfer can ask which outcomes belong to the event of exactly one tail. |
| 9.3 Classical probability | The rule states the equal-likelihood prerequisite. The quiz repeats the same even-die example. A fresh check can ask for the probability of rolling above 4 on a fair die, then ask when counting equally would fail on a weighted die. |
| 9.4 Empirical probability and relative frequency | The example and different switch quiz distinguish an observed proportion from a theoretical value. The available wording already avoids claiming that a larger sample guarantees certainty. |
| 9.5 Sure, impossible, mutually exclusive and complementary events | The rain example and numerical complement check connect the complement to subtraction from 1. A fresh conceptual check can distinguish the disjoint events “roll 1” and “roll 2” from complementary odd and even outcomes. |

For the 9.1 quiz change, the English 2025 textbook establishes the inclusive range on printed page 296 (PDF 302) and probability 0 for impossible events on printed page 299 (PDF 305). The Tamil textbook gives the same rules on printed pages 313 and 316 (PDF 319 and 322). All four page images were visually inspected. The quiz is original Triggle practice. Its English text remains visible under the existing Tamil editorial-pending fallback.

## Browser evidence

| Class 9 page | Viewport | Before | After |
| --- | --- | --- | --- |
| Algebra 3.1 Q2(i), coefficient conclusion from PR #262 | 393 × 1024 | [Before](g9-symbol-meaning-screens/algebra-coefficients-before.png) | [After](g9-symbol-meaning-screens/algebra-coefficients-after.png) |
| Set Language 1.2 Q10(i), power-set exponent | 393 × 1024 | [Before](g9-symbol-meaning-screens/set-language-exponent-before.png) | [After](g9-symbol-meaning-screens/set-language-exponent-after.png) |
| Statistics 8.3 Q5, modal class and estimated mode | 393 × 1024 | [Before](g9-symbol-meaning-screens/statistics-mode-before.png) | [After](g9-symbol-meaning-screens/statistics-mode-after.png) |
| The expanded Class 9 “Why this step?” disclosure | 393 × 1024 | [Before](g9-symbol-meaning-screens/why-this-step-before.png) | [After](g9-symbol-meaning-screens/why-this-step-after.png) |
| Trigonometry 6.2 Q1(iii), inline math wrapping | 320 × 1024 | [Before](g9-symbol-meaning-screens/trigonometry-inline-before.png) | [After](g9-symbol-meaning-screens/trigonometry-inline-after.png) |

The candidate's inventory sweep covered 3,176 question views, or all 397 records in both interface languages at 320, 360, 393 and 430 px. It checked 27,200 formula instances, source fallbacks, all original work, MathML, vertical glyph clearance, local keyboard scrolling and document width. The representative mobile and desktop suite also exercises 390, 412, 768 and 1280 px. It covers saved progress, offline reload, keyboard navigation and figure focus.

A separate Grade 10–12 comparison used four records at 320, 393 and 430 px. Ten of twelve comparisons were pixel-identical. The other two matched mathematical text, glyphs, typography and geometry within the existing comparison harness's tolerance. Live checks for this batch depend on deployment of its exact merge commit.

External paid API cost was $0.
