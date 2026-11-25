# Grade 10 Algebra exercise completion

Source and release baseline is `ee0732edae6d09bd922938570b720f3a7e80bef6` on `main`. Both Drive downloads matched the registered SHA-256 digests. The imprints, listed question pages and answer appendices were inspected as page images. The private PDFs and rendered page images remain outside the repository. [English 2025 textbook](https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view) · [Tamil 2025 textbook](https://drive.google.com/file/d/1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC/view)

## Coverage and batch checkpoints

| Batch | Exercise | English printed / PDF pages | Tamil printed / PDF pages | Numbered questions | Tasks | Existing records | Added bilingual records |
|---|---|---|---|---:|---:|---:|---:|
| A | 3.16 | 137 / 143 | 139 / 145 | 8 | 13 | 0 | 13 |
| A | 3.17 | 144 / 150 | 146–147 / 152–153 | 7 | 12 | 0 | 12 |
| B | 3.18 | 148–149 / 154–155 | 151–152 / 157–158 | 8 | 11 | 0 | 11 |
| B | 3.19 | 153–154 / 159–160 | 157 / 163 | 13 | 19 | 0 | 19 |
| C | 3.20 | 154–156 / 160–162 | 158–160 / 164–166 | 20 | 20 | 0 | 19 |
| D | Unit Exercise 3 | 156–158 / 162–164 | 160–162 / 166–168 | 20 | 23 | 0 | 23 |
| E | 3.1–3.15 | Previously audited | Previously audited | 64 | 138 | 138 | 0 |
| | **Chapter total** | | | **140** | **236** | **138** | **97** |

Unit Q6, Q15 and Q17 each have two printed parts. Unit Q1, Q2 and Q5 are single prompts. Unit Q17 ends at part (ii). The six-section denominator therefore changes from 101 to 98, and the full Grade 10 inventory changes from 935 to 932. The 12 previously integrated Exercise 3.15 parts use bilingual answer objects and count as existing solutions. Exercise 3.1's Tamil question and explanation data are applied by the established reader at startup. All 14 existing concept lessons retain their order and content, with related exercise links added.

The [source audit](g10-ch3-final-source-audit-20261125.json) binds each new record to checked PDF pages, independent results and its reviewed content hash. The [Grade 10 inventory](g10-2025-complete-inventory.json) records 235 available Algebra tasks and the one blocked source task. The batch manifests hold the English and Tamil questions, worked steps, final answers, hints, Why-this-step explanations and offline KaTeX. Thirteen original parabola and line plots and thirteen companion coordinate tables cover Exercise 3.16. Matrix notation uses structured brackets and rows. The 19 available multiple-choice questions use the existing answer feedback.

## Mathematical verification and source differences

The [SymPy verifier](../tests/verify_algebra_source.py) covers all 98 source tasks, including the quarantine counterexample. It checks real roots and graph intersections, matrix entries and dimensions, identities, eliminations, exact arithmetic, rational restrictions, and multiple-choice options. It calculates independently of the student records. The TRACE verifier detects changes to the reviewed records, and the release tests check the correspondence between the source evidence and the structured runtime questions and choices. Answer appendices are English printed pp. 339–340 / PDF pp. 345–346 and Tamil printed pp. 353–354 / PDF pp. 359–360.

| Source task | Recorded issue and resolution |
|---|---|
| Exercise 3.18 Q8 | The two variable equations are independent. The two possible values for each variable give four ordered pairs. |
| Exercise 3.19 Q2 | The appendices give the reverse product as undefined. The worked solution includes the condition for the reverse order. The order is \(q\times q\) when \(r=p\). |
| Exercise 3.19 Q4 | The bottom-right entry of \(BA\) is \(2(5)+5(3)=25\). The Tamil appendix prints 23. Both products are calculated in the lesson. |
| Exercise 3.20 Q1 | “Do not intersect” means the three planes have no common point. Pairwise intersections can still exist. |
| Exercise 3.20 Q11 | Quarantined. English squares the roots of the equation with coefficients \(q,p,r\). Tamil squares the roots of the equation with coefficients \(q^2,p^2,r^2\). For \((q,p,r)=(1,-1,0)\), the Tamil condition holds while the coefficients are in neither progression. |
| Unit Q2 | Tamil specifies equality of A and C after the transfer. The English phrase “the sections” is interpreted accordingly. Enforcing equality of all three gives inconsistent equations. |
| Unit Q4 | The keyed LCM is for the symbolic polynomials in \(x,y,k\). Specializing the parameter first can alter the factors. |
| Unit Q17(i) | The average for Kausigan's wheat is \((1500+3000)/2=2250\) rupees. The Tamil appendix prints 4250. |
| Unit Q18 | The keyed value \(x=\sin\theta\) is unique when \(\sin\theta\ne0\). If \(\sin\theta=0\), any real \(x\) satisfies the original equation. |

Independent Tamil editorial certification and teacher sign-off remain pending. The next Grade 10 inventory work is source clarification and editorial reconciliation. Chapter 8 Exercise 8.5 Q11 was already quarantined because the source omits the number of pages. It is not a missing teachable question. The Grade 9 Geometry completion report identifies Set Language as the next chapter to reconcile against the textbook. [Grade 9 reconciliation](../../grade-9/g9-ch4-geometry-completion.md)

## Release checks

The consolidated release follows the repository's risk-based CI and GitHub Pages workflow. The mobile browser gate tests 320, 360, 390 and 412 px, both languages, readable KaTeX and graphs, navigation, correct and incorrect option feedback, and an offline reload.

`site/tools/test_g10_ch3_final_release.cjs` checks all 97 new records. `TRIGGLE_ALGEBRA_EXHAUSTIVE=1` expands the browser gate from representative questions to every new record. The same suite can target the deployed site through `TRIGGLE_ALGEBRA_LIVE`.
