# Grade 12 Chapter 1 Concepts — working plan

## Scope and baseline

Integrate English-only original teaching demonstrations into the existing `g12-ch1` Concepts card in `site/assets/chapter-hub.js`. Keep the three chapter cards, exercise data/IDs/routes, Tamil content, and Grade 10 extraction unchanged. No Worked Examples destination. Static HTML/JS/CSS/SVG; no new runtime dependencies.

Baseline: main `1320df6`. `npm test` reaches the existing project-status gate and fails because its generated `sourceCommit`/`updatedAt` refer to an earlier commit. Regenerate only the derived status projection after source changes. Browser baseline at 390 × 844 recorded in `/workspace/scratch/g12-before-390.png`.

## Sources actually opened

- Attached `Grade12_Maths_2025_Ch1_Matrices_Determinants_Reference.pdf`: 51 chapter-only pages, PDF page = printed page. Extracted text inspected; page images checked for ambiguous notation.
- Connected Drive English Volume I, revised 2025: `1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm`; downloaded and opened locally. Full-book PDF page = printed page + 8.
- Connected Drive Tamil Volume I, revised 2025: `1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c`; downloaded and consulted for source comparison only. New lesson wording remains English-only; no claim of Tamil editorial review.
- No supplied app screenshot was attached; compare against the actual existing chapter screen.

## Scene map, in source order

| Scene | Source sections / printed pages | Interaction and transfer |
| --- | --- | --- |
| Cofactor X-Ray + just-in-time Matrix Playground | 1.1 p1; 1.2.1 pp2–4 | Locate a cell in 2×2/3×3, remove row/column, minor → signed cofactor → transpose. Predict a sign. |
| Undo Machine | 1.2.2 pp4–5 | Map a square/point, collapse determinant to zero, recover only if invertible. Verify both identity products. |
| Order Matters | 1.2.3 pp6–11 | Step through two maps and undo in reverse order; exact identities in optional depth. |
| Two Reference Frames | 1.2.4 pp12–13 | Change counterclockwise angle, compare fixed point with moving axes vs moving point with fixed axes. |
| Secret Message | 1.2.5 pp14–15 | Encode/decode short row vectors with a 2×2 key, original simplified classroom model. |
| Row Workshop | 1.3.1–1.3.2 pp16–18 | Swap, nonzero scale, row addition; drag with button/keyboard equivalent. Compute echelon/pivots. |
| Independence + Identity Builder | 1.3.3–1.3.4 pp19–27 | Toggle a dependent row; count pivots; assisted exact [A\|I] elimination to inverse. |
| Intersection Lab | 1.4.1–1.4.3 pp27–37 | Change line coefficients/RHS, graph and AX=B together; select inverse/Cramer/Gaussian method. |
| Consistency Scanner | 1.5.1–1.5.2 pp38–47 | Compare ranks of A and [A\|B], free variables, homogeneous toggle, contradictory row. |

Existing exercise coverage can be opened without duplicating problems. Source mapping: 1.2 → Ex1.1; 1.3 → Ex1.2; inverse method → Ex1.3; Cramer → Ex1.4; Gaussian → Ex1.5; nonhomogeneous rank → Ex1.6; homogeneous → Ex1.7; Ex1.8 is MCQ. Only link exact exercises already available in app; otherwise use the existing chapter Exercises entry.

## Mathematical invariants and risks

- Exact reduced rational arithmetic for determinants, minors/cofactors/adjoints, products, inverses, row operations and RREF/rank. Independent integer/cofactor and elimination comparisons, deterministic randomized fixtures for 2×2/3×3 including singular cases.
- `A adj(A) = adj(A) A = det(A) I`; inverse exists iff determinant nonzero. Explain matrix vs scalar and multiplication order.
- Row operations operate on the entire augmented matrix. Zero scaling rejected. Rank counts pivots, not visually nonzero rows in an unreduced matrix.
- For systems, consistency iff ranks agree; unique iff common rank equals unknown count. Homogeneous zero always solves.
- Rotation exception: printed English p12 correctly gives `old = W new` and `W⁻¹`, then incorrectly multiplies that inverse into the active-rotation signs. Page image confirms the inconsistency. Use and explain the correct passive coordinates `(x cosθ + y sinθ, −x sinθ + y cosθ)`; independently test round trips. Do not reproduce the inconsistent signs.
- New module must not inflate quiz availability from its scene count. Tamil Concepts stays at its existing state.
- Preserve state locally per scene, explicit deep links, browser Back, refresh, reduced motion, keyboard focus and offline cached assets.

## Verification and release

Unit invariants + scoped browser tests while implementing. At release: full `npm test`, full `npm run test:browser`, JS syntax/static packaging checks, 360/390/412/430 and desktop screenshots, 320px/short-screen/font-scaling checks, all scene controls and predictions, source-order index, proof close/Escape, navigation EN/TA/exercises, offline reload. Existing GitHub PR/CI/Pages workflow, then open live chapter/lesson and exercise in Chromium. Commit plan, coherent source/math slice, integrated verified UI, then source-derived status refresh. Record evidence and limitations in a completion note.
