# TRACE MathGuard V1.0 vs V1.1 vs V1.2 — Comprehensive Comparison & Audit Summary

## 1. Version Progression (71 Grade 10 Chapter 7 Items)

| Metric | V1.0 Baseline | V1.1 Context Intelligence | V1.2 Reasoning & Safe Correction |
|---|---:|---:|---:|
| Answer PASS / FAIL / UNVER | 70 / 0 / 1 | 70 / 0 / 1 | 70 / 0 / 1 |
| Step PASS | 31 | 27 | 29 |
| Step FAIL (false positives) | 21 | 7 | 0 |
| Step PARTIAL | 11 | 18 | 22 |
| Step UNVERIFIABLE | 8 | 19 | 20 |
| Tamil PASS / FAIL / PARTIAL / MISSING | 50/1/10/10 | 50/1/10/10 | 50/1/10/10 |

## 2. Genuine Mathematical Errors vs False Positives

- **Genuine mathematical errors in English answers/steps**: **0** across all 71 items (1 item `c10-7-ex7-5-q11` is qualitative shuttlecock shape recognition and honestly marked `UNVERIFIABLE`).
- **False positives eliminated (7 -> 0)**: `ex7-2-q6`, `ex7-2-q7`, `ex7-2-q8`, `ex7-3-q4`, `ex7-5-q14`, `g10-ch7-combined-solids`, and `g10-ch7-conversion-volume-conservation` were all verified mathematically sound after fixing `\implies` spacing order, `r^2 h` unit stripping, named-quantity ratio/sum expansions, and stem assumption extraction.
- **Student-facing content modifications**: **0** (all textbook solutions were already mathematically accurate; no correct content was modified).
- **Tamil Validator findings (kept separate)**: `c10-7-ex7-5-q5` (`1/3` in English vs Tamil fraction words), 10 `PARTIAL`, and 10 `MISSING` (`ex7-1-q1..q10`).

## 3. Finding Classifications (71 Items)

- **Missing mathematical context**: 23
- **Parser limitation**: 22
- **Requires independent review**: 2
- **Valid approximation**: 6
- **Verified**: 18

## 4. Benchmark Results (528 Total Independent Cases)

| Suite | Cases | TP | TN | FP | FN | Precision | Recall | Critical Missed | Time (ms) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| V1.0 Original | 120 | 96 | 24 | 0 | 0 | 1.0 | 1.0 | 0 | — |
| V1.1 Independent | 108 | 84 | 24 | 0 | 0 | 1.0 | 1.0 | 0 | 1051.73 |
| V1.2 Expanded | 300 | 240 | 60 | 0 | 0 | 1.0 | 1.0 | 0 | 3222.68 |
| **Combined Total** | **528** | **420** | **108** | **0** | **0** | **1.0** | **1.0** | **0** | — |
