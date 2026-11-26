# TRACE MathGuard independent launch audit

**Launch decision — HOLD.** The released verifier accepted eight independently constructed false claims or unsupported attestations. A candidate engine patch closes the demonstrated cases. Two student-facing solution corrections are staged on this branch. Full independent curriculum verification is incomplete.

## Baseline and curriculum outcome

- Audited `origin/main` at `413a7540c4a6054b98f20d9c43d73b66ddb6332b`. The catalogue extract from that checkout matched the live reader byte for byte, with SHA-256 `56f08125d88595d042b93fec2a5067fd3580319f4710e1e60f20f58ab04774fe`. The deployed site revision recorded by the ledger is `0898788ea1e05a54c9924c3c5cf32eae749ecb8d`. The intervening merge added only ledger files. [Final Frontier](../final-frontier/TRACE_FINAL_FRONTIER_REPORT.md)
- Reconciled 17 chapters, 129 sections, 1,609 catalogue cards, 1,774 canonical tasks and 1,756 eligible tasks. There are 18 registered direct-bookmark records outside the catalogue. These are distinct from the 18 source quarantines. Card and task counts differ because one card can carry several source subparts.
- Downloaded all four current Grade 9/10 English and Tamil PDFs from the connected Drive. Their bytes match the 2025 register. Compared both rendered source pages for each quarantine, both corrected tasks and the six manually verified probability tasks. [Source register](../../reference-library/2025-user-textbook-manifest.json)

| Eligible baseline classification | Tasks |
|---|---:|
| Independently verified working | 6 |
| Independently verified final answer | 12 |
| Confirmed defect | 2 |
| Partial mathematical evidence | 618 |
| Unsupported by this audit | 1,118 |
| Untested | 0 |
| **Eligible tasks attempted** | **1,756** |
| Corrected on audit branch, included in confirmed baseline defects | 2 |
| Quarantined, outside eligibility | 18 |

The independent pipeline examined the runtime cards and the canonical subpart mapping. It uses exact fractions and symbolic arithmetic for a restricted grammar and question-derived oracles for selected preconditions, formulas, and answer shapes. A verified final answer compares the expected result with English and Tamil numerical answer content, including shared formulas and structured fallbacks. It leaves the full Tamil semantics and complete derivation open unless explicitly reviewed. A partial result may cover only one equality link. Unsupported includes proof prose, diagram-dependent reasoning, out-of-grammar formulas and shared cards whose results could not be assigned safely to a subpart. Candidate conflicts are a triage queue. They can include deliberate contradictions, unit or π substitutions, and valid approximations. [Task coverage](MATHGUARD_COVERAGE.csv) · [Candidate queue](logs/curriculum-review-queue.json)

The six fully reviewed Grade 10 Exercise 8.4 probability solutions use independent enumeration for dice, odd cards, coins and student roll numbers, and exact probability atoms for the three-event question. The two corrections cover Grade 10 Exercise 6.1 Q3(i) and Q3(ii). On the common domain the two left sides simplify to `(1+sin θ)/|cos θ|` and `2/|cos θ|`. The printed equalities require `cos θ > 0`. At 180° the left sides are 1 and 2, while the printed right sides are −1 and −2. The student-facing working and KaTeX answers now say this in both languages. The printed questions and record IDs are preserved. [Findings](MATHGUARD_FINDINGS.json) · [Probability tests](logs/curriculum-oracles.log) · [Bilingual browser test](logs/trig-reader.log)

## Engine reproduction and challenge

| Run | Pinned PR | Candidate patch |
|---|---:|---:|
| Historical and recent suite | 1,654 / 1,654 | 1,654 / 1,654 |
| V1.5 adversarial and holdout | 450 / 450 | 450 / 450 |
| Existing Pytest | 59 / 59 | 59 / 59 |
| New independent probes | 9 / 17 | 17 / 17 |
| Frozen working PASS / PARTIAL / UNVERIFIABLE / FAIL | 256 / 74 / 4 / 0 | 256 / 74 / 4 / 0 |
| Frozen verified claims | 1,595 / 1,708 | 1,595 / 1,708 |
| Frozen answer PASS / UNVERIFIABLE | 328 / 6 | 327 / 7 |
| Frozen elapsed / process peak RSS | 27.72 s / 91.18 MiB | 31.41 s / 91.12 MiB |

PR #467 and the remote MathGuard branch point to `985a9bbf6c34a9cd069a3cba3c04c078a0f3c0a1`. The reported V1.4d branch and short SHA were unavailable in the fetched refs. Reproduced the published working and regression counts without changing their tests. The eight failing independent probes cover wrong final answers despite correct working, unrelated variable declarations, missing Tamil material, the principal square-root sign, a cancelled denominator hole and dimensionally incompatible units. The candidate adds conservative abstentions when the final answer cannot be grounded in the question. The existing engine lives on the PR branch. Its candidate changes are supplied as a patch against that exact head. [PR #467](https://github.com/vigneswaranmba20-afk/Triggle/pull/467) · [Engine patch](mathguard-v1.5a-candidate.patch) · [Regression logs](logs/)

Every frozen working abstention has a per-case disposition and unsupported claim evidence in the findings JSON. This is a claim-level investigation with targeted independent mathematical rechecks. In particular, the transpose and two-line intersection are recoverable working abstentions, and the unmodeled shuttlecock is a reasonable abstention. The candidate’s additional final-answer abstention concerns the method for proving a parallelogram using opposing slopes.

The frozen set spans three chapters in Grade 10 and shares 297 IDs with production. Its algebra and coordinate fixture IDs all appear in the corresponding per-question fingerprint registries. Some reference answers derive from equations with hardcoded textbook coefficients. The V1.5 holdout is public alongside its main suite. Thirty expected sets reuse the same `TypedSet` implementation, and 50 executions in three groups represent four distinct fixture behaviors. The count of 2,104 is a count of executed assertions with their published expectations, and includes expected abstentions. It cannot establish general mathematical soundness. The frozen evaluator echoes its declared digest without enforcing input integrity. The findings also record the actual file digest. [Frozen log](logs/frozen-baseline.json) · [Case dispositions and independence findings](MATHGUARD_FINDINGS.json)

## Quarantines and release state

All 18 quarantine entries remain open. Ten have reader explanations. Each explains the issue correctly within its stated conditions. The other eight have no catalogue card. The review includes the reversed Tamil premise, the missing geometry ordering and concurrence, ambiguous choices, and impossible probability data. The original source issues still require authoritative resolution. [Quarantine reviews](MATHGUARD_FINDINGS.json)

The scoped source, hints, generated-status and mobile reader gates passed. The broad browser sweep was still running at checkpoint time. Both the engine patch and student-facing changes require release review. No deployment or merge was performed. [Resume checkpoint](MATHGUARD_RESUME_CHECKPOINT.json)
