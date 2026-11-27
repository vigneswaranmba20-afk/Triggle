# TRACE MathGuard V1.0 vs V1.1 — Quantitative Comparison & Mensuration Findings

## 1. Before-and-After Audit Comparison (71 Grade 10 Chapter 7 Items)

| Metric | V1.0 Baseline | V1.1 Context Intelligence | Delta |
|---|---:|---:|---:|
| Answer PASS | 70 | 70 | +0 |
| Answer FAIL | 0 | 0 | +0 |
| Answer UNVERIFIABLE | 1 | 1 | +0 |
| Step PASS | 31 | 27 | -4 |
| Step FAIL | 21 | 7 | -14 |
| Step PARTIAL | 11 | 18 | +7 |
| Step UNVERIFIABLE | 8 | 19 | +11 |
| Tamil PASS / FAIL / PARTIAL / MISSING | 50/1/10/10 | 50/1/10/10 | Separated for TRACE Tamil Validator |

Note: Step UNVERIFIABLE increased honestly from 8 to 19 because V1.1 removed V1.0 silent-pass handling for formula-to-numeric substitutions lacking explicit variable bindings.

## 2. V1.1 Finding Classification Breakdown (71 Items)

- **Confirmed mathematical error**: 7
- **Missing mathematical context**: 22
- **Parser limitation**: 18
- **Requires independent review**: 2
- **Valid approximation**: 6
- **Verified**: 16

## 3. Benchmark Results (228 Total Independent Cases)

- **V1.0 Original Benchmark (120 cases)**: Precision=1.0, Recall=1.0, FP=0, Critical Missed=0 (zero regression)
- **V1.1 Independent Benchmark (108 cases)**: Precision=1.0, Recall=1.0, FP=0, Critical Missed=0, Execution Time=1051.73 ms

## 4. Remaining 7 Step-Validation Failures & Limitations

1. `g10-ch7-combined-solids` — **Mathematical notation error** in `site/data/g10-ch7-concepts.js`: `\pi r^2 h - \dfrac{1}{3}\pi r^2 = \dfrac{2}{3}\pi r^2 h` is missing factor `h` in the second term.
2. `g10-ch7-conversion-volume-conservation` — **Mathematical notation error** in `site/data/g10-ch7-concepts.js`: missing `\\` line break between `H` and `H=...` (`H\  H` parsed as `H^2`).
3. `c10-7-ex7-2-q6`, `c10-7-ex7-2-q7`, `c10-7-ex7-2-q8`, `c10-7-ex7-3-q4`, `c10-7-ex7-5-q14` — **Missing mathematical context**: named quantities (`V_1/V_2`, `V_sphere/V_hemisphere`, `V_cone + V_hemisphere`, `h_2 = h_1/2`) are defined implicitly in the question stem rather than in a prior explicit `=` step.
4. `c10-7-ex7-5-q11` — **Requires independent review**: qualitative shuttlecock shape recognition cannot be derived numerically.
5. `c10-7-ex7-5-q5` (Tamil `1/3` vs Tamil fraction words) & `c10-7-ex7-1-q1..q10` (missing `q.ta` in English-only module) — recorded separately for **TRACE Tamil Validator**.
