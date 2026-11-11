# Grade 12 Concepts — source and mathematical review

Reviewed 11 November 2026. These are original English teaching demonstrations, not transcribed textbook questions or a new exercise collection. No textbook scan is distributed. No Tamil translation or independent teacher sign-off is claimed.

## Files opened

| Source | Identity / SHA-256 | Use |
| --- | --- | --- |
| Attached Chapter 1 reference, 51 PDF pages | `ec1fd8095c8879f12f43f3a7732b09ecb96006067334f92e53d44ffdf41fa305` | Entire Chapter 1 text, subsection order and exercise boundaries; PDF page = printed page. |
| Drive: Class_12_Mathematics_English_Volume_1_2025_Edition-www.tntextbooks.in.pdf | [`1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm`](https://drive.google.com/file/d/1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm/view), `d930d0c7d4ca52ebdbceeeca3e2f11e372b0874024f69691b63a639d067feb3a` | Downloaded; 2025 revision imprint visually inspected at PDF p2. Chapter starts PDF p9, printed p1. |
| Drive: Class_12_Mathematics_Tamil_Volume_1_2025_Edition-www.tntextbooks.in.pdf | [`1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c`](https://drive.google.com/file/d/1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c/view), `2aed3006325727da9cb9be4eaadb76d89586b71677200652c8c95b4ad66845e8` | Downloaded; imprint and targeted definitions/rotation/row/rank/Gauss–Jordan/consistency page images consulted. This does not certify complete lesson translation. |

The full-book hashes match the existing 2025 user-textbook manifest. No claim about equivalence to a separate 2026–27 printing is made.

## Anchors and image checks

The complete teaching/exercise map is in [the plan](g12-ch1-concepts-plan.md). English chapter page images specifically inspected at printed pp2, 4, 6, 12, 16, 17, 19, 25, 38, 43; English full-book imprint PDF p2. Tamil targeted images: PDF pp2, 10 (printed 2), 20 (printed 12), 25 (printed 17), 36 (printed 28), 50 (printed 42), 56 (printed 48). Local image evidence is in `/workspace/scratch/source-check-0.png`, `source-check-1.png`, `geometry-source.png`, `ta-adjoint.png` and `en-imprint.png`. These temporary source images are excluded from Git.

### Rotation discrepancy

English printed p12 (full PDF p20) establishes `old = W new` with `W = [[cosθ, −sinθ], [sinθ, cosθ]]`, and correctly prints `W⁻¹ = [[cosθ, sinθ], [−sinθ, cosθ]]`. Its next expanded inverse product and the “Hence” statement use the active signs instead. The attached page image confirms this is present in print, not a text-extraction error. The Tamil p12 page also contains the convention distinction requiring care.

The original lesson explicitly uses counterclockwise angles. Passive rotation uses `(X,Y) = (x cosθ + y sinθ, −x sinθ + y cosθ)`; active rotation uses `(x′,y′) = (x cosθ − y sinθ, x sinθ + y cosθ)`. At 90°, fixed point `(2,0)` has new passive coordinates `(0,−2)`, while active rotation moves it to `(0,2)`. Both signs and round trips are tested. The explanation identifies the source discrepancy in the optional depth dialog.

## Original demonstration checks

- Cofactor seed `[[2,1,0],[1,3,2],[0,1,1]]` has determinant 1. The 2×2 seed `[[2,1],[1,3]]` has determinant 5. Every selected minor, checkerboard sign and adjoint entry is computed.
- Undo uses `[[2,1],[0,t]]` for `t = 0,1,2`. Determinant is `2t`. At `t=0`, `(1,1)` and `(2,−1)` both map to `(3,0)`. Inversion is disabled; an inverse is never fabricated.
- Order uses a shear A and horizontal stretch B; `AB ≠ BA`. Column-vector application and reversed undo order are distinguished from row-vector cryptography.
- Cipher uses two keys, each with determinant 1, and original short messages. Exact row-vector encode/decode round trips recover every demonstrated message. It is labelled a classroom model, not secure encryption.
- Row Workshop starts with `[1,1|3]; [2,3|8]; [1,2|5]`. Every displayed step updates all columns. Row scaling by zero and same-row addition/swap selections are prevented. A 12-operation bound avoids unhelpful large-number sessions; reset is always available.
- Independence toggles the third row between `R₁+R₂` and a third independent row. Gauss–Jordan starts with `[[1,2],[1,3]]`, yielding inverse `[[3,−2],[−1,1]]`; singular alternative `[[1,2],[2,4]]` cannot reach I.
- Systems display `y=x+1` and `y=mx+b`, `m∈{−1,1}`, `b∈{1,3,5}`. Graphs, coefficient matrices, method calculations and exact solutions derive from the same inputs. Inverse/Cramer require nonzero determinant; Gaussian elimination diagnoses singular cases.
- Consistency includes unique, repeated, contradictory, rectangular and homogeneous cases. Rank and free-variable counts are computed by exact RREF. For homogeneous systems zero always solves; nonzero solutions require rank below the number of unknowns.

`test_g12_matrix_math.cjs` independently checks 320 deterministic 2×2/3×3 matrices (234 invertible, 86 singular), including duplicate rows. Determinants use a separate direct formula and rank is independently checked through minors. It verifies both adjoint product orders, both inverse product orders, reversal/transpose/scalar identities, legal row operations, Cramer and inverse solutions, rotation signs and cipher round trips. This is automated mathematical validation, not a claim of independent professional editorial review.
