# TRACE MathGuard independent launch audit

**Launch decision — HOLD.** The pinned MathGuard PR failed 21 of 31 probes in the repaired-case suite. The candidate patch passes all 31. Two separately reproduced scalar-answer false acceptances remain open. Three student-facing solutions were corrected on the isolated audit branch. Independent curriculum verification remains incomplete.

## Baseline and curriculum outcome

- Audited `origin/main` at `413a7540c4a6054b98f20d9c43d73b66ddb6332b`. The catalogue extract from that checkout matched the live reader byte for byte, with SHA-256 `56f08125d88595d042b93fec2a5067fd3580319f4710e1e60f20f58ab04774fe`. The deployed site revision recorded by the ledger is `0898788ea1e05a54c9924c3c5cf32eae749ecb8d`. The intervening merge added only ledger files. [Final Frontier](../final-frontier/TRACE_FINAL_FRONTIER_REPORT.md)
- Reconciled 17 chapters, 129 sections, 1,609 catalogue cards, 1,774 canonical tasks and 1,756 eligible tasks. There are 18 registered direct-bookmark records outside the catalogue. These are distinct from the 18 source quarantines. Card and task counts differ because one card can carry several source subparts.
- Downloaded all four current Grade 9/10 English and Tamil PDFs. Their bytes match the 2025 register. Compared both rendered source pages for each quarantine, all three corrected tasks, and the manually verified probability and statistics tasks. [Source register](../../reference-library/2025-user-textbook-manifest.json)

| Eligible baseline classification | Tasks |
|---|---:|
| Independently verified working | 9 |
| Independently verified final answer | 318 |
| Confirmed defect | 3 |
| Partial mathematical evidence | 509 |
| Unsupported by this audit | 917 |
| Untested | 0 |
| **Eligible tasks attempted** | **1,756** |
| Corrected on audit branch, included in confirmed baseline defects | 3 |
| Quarantined, outside eligibility | 18 |

The independent pipeline examined the runtime cards and the canonical subpart mapping. It uses exact fractions and symbolic arithmetic for a restricted grammar and question-derived oracles for selected preconditions, formulas, and answer shapes. A verified final answer compares the expected result with English and Tamil numerical answer content, including shared formulas and structured fallbacks. It leaves the full Tamil semantics and complete derivation open unless explicitly reviewed. A partial result may cover only one equality link. Unsupported includes proof prose, diagram-dependent reasoning, out-of-grammar formulas and shared cards whose results could not be assigned safely to a subpart. Candidate conflicts are a triage queue. They can include deliberate contradictions, unit or π substitutions, and valid approximations. [Task coverage](MATHGUARD_COVERAGE.csv) · [Candidate queue](logs/curriculum-review-queue.json)

The nine fully reviewed tasks cover six Grade 10 probability problems and three Grade 9 grouped-statistics subparts. The grouped table yields a 58.5 kg mode, 55.9 kg midpoint mean and 793/14 kg interpolated median. The English edition asks for the mode. The Tamil edition asks for all three. A separate Grade 10 statistics task remains partial. Its Tamil question says ten workers but lists the same nine wages as English. The bilingual reader gives the correct calculation for those nine. [Findings](MATHGUARD_FINDINGS.json) · [Probability and statistics tests](logs/curriculum-oracles.log)

Grade 10 Exercise 6.1 Q3(i) and Q3(ii) now keep the principal square roots as `(1+sin θ)/|cos θ|` and `2/|cos θ|` on the common domain. The printed equalities require `cos θ > 0`. At 180° the left sides are 1 and 2, while the printed right sides are −1 and −2. Grade 10 Exercise 3.4 Q2(iii) now records the original denominator's exclusions −2 and 1. Considered separately, the lowest-term quotient excludes 1, matching the key. The corrected working and rendered answers cover both languages and preserve the source questions and IDs. [Trig browser test](logs/trig-reader.log) · [Algebra browser test](logs/rational-reader.log)

## Engine reproduction and challenge

| Run | Pinned PR | Candidate patch |
|---|---:|---:|
| Historical and recent suite | 1,654 / 1,654 | 1,654 / 1,654 |
| V1.5 adversarial and holdout | 450 / 450 | 450 / 450 |
| Existing Pytest | 59 / 59 | 59 / 59 |
| New independent probes | 10 / 31 | 31 / 31 |
| Frozen working PASS / PARTIAL / UNVERIFIABLE / FAIL | 256 / 74 / 4 / 0 | 256 / 74 / 4 / 0 |
| Frozen verified claims | 1,595 / 1,708 | 1,595 / 1,708 |
| Frozen answer PASS / UNVERIFIABLE | 328 / 6 | 327 / 7 |

PR #467 and the remote MathGuard branch point to `985a9bbf6c34a9cd069a3cba3c04c078a0f3c0a1`. The reported V1.4d branch and short SHA were unavailable in the fetched refs. The published working and regression counts reproduced with their existing tests. Independent probes exposed wrong answers accepted beside correct working, missing Tamil material, overwritten givens, infeasible Venn counts, missing function domain and codomain checks, and mismatched units and measure labels. The candidate patch is based on the exact PR head. [PR #467](https://github.com/vigneswaranmba20-afk/Triggle/pull/467) · [Engine patch](mathguard-v1.5a-candidate.patch) · [Regression logs](logs/)

Every frozen working abstention has a per-case disposition and unsupported claim evidence in the findings JSON. This is a claim-level investigation with targeted independent mathematical rechecks. In particular, the transpose and two-line intersection are recoverable working abstentions, and the unmodeled shuttlecock is a reasonable abstention. The candidate’s additional final-answer abstention concerns the method for proving a parallelogram using opposing slopes.

The candidate still accepts 31,415.93 cm² for a 100 cm radius circle when the question requires π = 22/7 and two decimal places, which gives 31,428.57 cm². It also accepts a wrong stated area when an unrelated number elsewhere in the answer matches the correct area. Both failures reproduce through the scalar mensuration answer checker with independently provided derivations. [Open engine cases](logs/engine-open-findings.jsonl)

The frozen set spans three chapters in Grade 10 and shares 297 IDs with production. Its algebra and coordinate fixture IDs all appear in the corresponding per-question fingerprint registries. Some derivations embed textbook coefficients. Grade 10 Exercise 3.4 Q2(iii) earns working and answer PASS by using the lowest-term convention. That result leaves the original denominator hole unchecked. The V1.5 holdout is public alongside its main suite. Thirty expected sets reuse the same `TypedSet` implementation, and 50 executions in three groups represent four distinct fixture behaviors. The 2,104 executions include expected abstentions. The frozen evaluator echoes its declared digest without enforcing input integrity. The findings record the actual file digest. [Frozen log](logs/frozen-baseline.json) · [Case dispositions and independence findings](MATHGUARD_FINDINGS.json)

## Quarantines and release state

All 18 quarantine entries remain open. Ten have reader explanations. Each explains the issue correctly within its stated conditions. The other eight have no catalogue card. The review includes the reversed Tamil premise, the missing geometry ordering and concurrence, ambiguous choices, and impossible probability data. The original source issues still require authoritative resolution. [Quarantine reviews](MATHGUARD_FINDINGS.json)

The full `npm test` suite and the focused mobile reader gates passed. The broad browser sweep was still running at checkpoint time. Both the engine patch and student-facing changes require release review. No deployment or merge was performed. [Repository tests](logs/repository-test.log) · [Browser progress](logs/browser-sweep-at-checkpoint.log) · [Resume checkpoint](MATHGUARD_RESUME_CHECKPOINT.json)
