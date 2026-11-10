# Grade 9 English — Exercise 1.2 source-image audit and independent solutions (draft evidence)

**Scope:** Source evidence and nine independently checked tasks only. **Not a registered curriculum batch, not deployed, and not a chapter-completion claim.** Existing student-facing records and all other grades remain unchanged.

## Primary source
- Owner-connected Drive PDF: `Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf`
- Drive ID: `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`
- URL: https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view
- SHA-256 of actual 28,314,750-byte PDF: `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`
- Imprint: PDF page 2; *Government of Tamil Nadu, Standard Nine Mathematics*, first edition 2018, revised 2019, 2020, 2022, 2023, **2025**, © SCERT 2018.
- Original exercise page images inspected: printed pages **11–12**, PDF pages **17–18**. The fraction in Q1(iii) was visually confirmed as **4/(3n)**, not the corrupt PDF text extraction “34n”. Q2(iv) has superscript **x²**.
- No exercise figures, tables or graphs occur in Exercise 1.2. Answer appendix not independently image-checked; no answer-key certification claimed.

## Exercise inventory — original page-image checked
The exercise contains **10 numbered questions and 34 labelled/unlabelled tasks**: Q1 (5), Q2 (4), Q3 (4), Q4 (4), Q5 (3), Q6 (4), Q7 (1), Q8 (4), Q9 (2), Q10 (3). These are a source-image inventory, **not** a claim that 34 solutions or app records are verified.

### Original questions and worked solutions checked this run

**Q1. Find the cardinal number of the following sets.**

**(i) M = {p, q, r, s, t, u}**  
Steps: (1) Cardinality counts distinct elements. (2) List p, q, r, s, t, u. (3) None repeats. (4) Count six entries. **Answer: n(M) = 6.**

**(ii) P = {x : x = 3n+2, n∈ W and x< 15}**  
Steps: (1) Whole numbers begin 0, 1, 2, …. (2) The inequality 3n+2 < 15 gives n < 13/3. (3) Thus n=0,1,2,3,4. (4) Substitution gives P={2,5,8,11,14}. (5) All five are distinct. **Answer: n(P) = 5.**

**(iii) Q = {y : y = 4/(3n), n ∈ N and 2 < n ≤5}**  
Steps: (1) The original printed expression is a stacked fraction 4 over 3n. (2) The natural numbers allowed are n=3,4,5. (3) Evaluate y as 4/9, 1/3, 4/15 respectively. (4) These are distinct rational numbers. **Answer: n(Q) = 3.**

**(iv) R = {x : x is an integers, x∈ Z and –5 ≤ x <5}**  
Steps: (1) Integers include negative integers, zero and positive integers. (2) Start at −5, which is included. (3) Stop at 4, since 5 is excluded. (4) The elements are −5,−4,−3,−2,−1,0,1,2,3,4. (5) There are 4−(−5)+1=10 integers. **Answer: n(R) = 10.**

**(v) S = The set of all leap years between 1882 and 1906.**  
Steps: (1) A leap year is divisible by 4 except century years must be divisible by 400. (2) Candidates are 1884,1888,1892,1896,1900,1904. (3) The year 1900 is divisible by 100 but not by 400, so exclude it. (4) S={1884,1888,1892,1896,1904}. **Answer: n(S) = 5.**

**Q2. Identify the following sets as finite or infinite.**

**(i) X = The set of all districts in Tamilnadu.**  
Steps: (1) Districts are administratively enumerated. (2) Their number can change over time but is finite at any given time. (3) Hence X has finitely many members. **Answer: Finite.**

**(ii) Y = The set of all straight lines passing through a point.**  
Steps: (1) Fix the point. (2) Every distinct direction determines a distinct line through it. (3) There are infinitely many possible directions. **Answer: Infinite.**

**(iii) A = { x : x ∈ Z and x <5}**  
Steps: (1) All integers below 5 qualify. (2) In particular, 4,3,2,…,0,−1,−2,… are included. (3) Negative integers extend without a lower bound. **Answer: Infinite.**

**(iv) B = { x : x²–5x+6 = 0, x ∈ N }**  
Steps: (1) Factor x²−5x+6=(x−2)(x−3). (2) Thus x=2 or x=3. (3) Both are natural numbers. (4) B={2,3}, with two members. **Answer: Finite.**

## Independent mathematical verification evidence
- Q1(i): `len(set("pqrstu")) == 6`.
- Q1(ii): enumerating `3*n+2` for whole numbers with `3*n+2<15` yields `[2,5,8,11,14]`.
- Q1(iii): exact rational fractions `4/(3*n)` for n=3,4,5 are pairwise unequal.
- Q1(iv): `len(range(-5,5)) == 10`.
- Q1(v): leap-year rule `y%4==0 and (y%100!=0 or y%400==0)` for 1883–1905 yields `[1884,1888,1892,1896,1904]`.
- Q2(i–iii): independent finite/infinite set arguments above; Q2(iv) substitution confirms both 2 and 3 solve x²−5x+6=0.
- Source inspection confirms Q1(iii) denominator **3n** and Q2(iv) superscript **2**; extracted text alone is not reliable.

## Integration blockers and next batch
1. Reconcile these nine source-verified tasks with current main's registered Grade 9 items and all open draft PRs; preserve legacy IDs.
2. Encode them in the documented `grade-9/batches` schema with per-record source mapping and a synchronous independent verifier; run `curriculum_bulk.cjs validate`, then register only passing records.
3. Verify and solve Q3–Q10 against printed page 12 (PDF page 18), including all 25 remaining tasks, without counting practice as textbook coverage.
4. Acquire the **separate integration CAS lease** before any shared HTML, navigation, cache or merge writes; run required CI on the exact PR head.
5. English only; Tamil textbook wording/editorial certification remains pending.

**Evidence status:** 10 numbered questions inventoried visually; **9 source-image checked and independently reasoned tasks**; **0 new app records**, **0 engine-verified registered records**, **0 deployed**. This is a source-first staging artifact requiring full batch-schema conversion and CI before release.


## Continuation audit — Q3–Q10 (2026-11-10, Grade 9 only)

**Source re-read:** The actual owner Drive PDF was fetched in this execution (28,314,750 bytes; SHA-256 `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037`). Original PDF page 18 / printed page 12 was rendered and visually inspected. The preceding page 17 / printed page 11 was also inspected. All 25 remaining labelled/unlabelled tasks were inventoried; no compulsory figure, table or graph occurs in this exercise. The original wording below follows the inspected printed page; the explanatory steps and answers are newly authored. **This remains a source/solution audit, not a registered app module.**

### Q3. Which of the following sets are equivalent or unequal or equal sets?

- **(i)** A = The set of vowels in the English alphabets. B = The set of all letters in the word “VOWEL”. **Equivalent sets.** A has five vowels {a,e,i,o,u}; B has five distinct letters {V,O,W,E,L}. They are not the same members, but both have cardinality five.
- **(ii)** C = {2,3,4,5} D = {x : x ∈ W, 1 < x < 5}. **Unequal sets.** Enumerate D={2,3,4}. The element 5 is in C but not D, so the sets are unequal.
- **(iii)** X = {x : x is a letter in the word “LIFE”} Y = {F, I, L, E}. **Equal sets.** Listing the distinct letters of LIFE gives {L,I,F,E}; order is irrelevant, so X=Y.
- **(iv)** G = {x : x is a prime number and 3 < x < 23} H = {x : x is a divisor of 18}. **Equivalent sets.** G={5,7,11,13,17,19}; H={1,2,3,6,9,18}. Each contains six elements, although their elements differ.

### Q4. Identify the following sets as null set or singleton set.

- **(i)** A = {x : x ∈ N, 1 < x < 2}. **Null set.** There is no natural number strictly between 1 and 2, so A=∅.
- **(ii)** B = The set of all even natural numbers which are not divisible by 2. **Null set.** Every even natural number is divisible by 2 by definition, so no element qualifies.
- **(iii)** C = {0}. **Singleton set.** The set contains one element, zero. It is not empty.
- **(iv)** D = The set of all triangles having four sides. **Null set.** Every triangle has exactly three sides, so D=∅.

### Q5. State which pairs of sets are disjoint or overlapping.

- **(i)** A = {f, i, a, s} and B={a, n, f, h, s}. **Overlapping.** Compare members; A∩B={a,f,s}, which is nonempty.
- **(ii)** C = {x : x is a prime number, x > 2} and D = {x : x is an even prime number}. **Disjoint.** The only even prime is 2, but C requires x>2. Hence C∩D=∅.
- **(iii)** E = {x : x is a factor of 24} and F={x : x is a multiple of 3, x < 30}. **Overlapping.** E={1,2,3,4,6,8,12,24}; F={3,6,9,12,15,18,21,24,27}. Their intersection is {3,6,12,24}.

### Q6. If S = {square, rectangle, circle, rhombus, triangle}, list the elements of the following subset of S.

- **(i)** The set of shapes which have 4 equal sides. **{square, rhombus}.** A square has four equal sides; a rhombus does too. A general rectangle need not.
- **(ii)** The set of shapes which have radius. **{circle}.** A circle has a radius; the other listed plane shapes are not defined by one.
- **(iii)** The set of shapes in which the sum of all interior angles is 180°. **{triangle}.** A triangle's interior angles total 180°; a square, rectangle or rhombus totals 360°.
- **(iv)** The set of shapes which have 5 sides. **∅.** None of the five named shapes is a pentagon.

### Q7. If A = {a, {a, b}}, write all the subsets of A.

**Answer: ∅, {a}, {{a,b}}, {a,{a,b}}.** First identify the two elements of A: the symbol a and the *set* {a,b}. A two-element set has 2²=4 subsets. Do not confuse the inner set {a,b} with two separate elements of A.

### Q8. Write down the power set of the following sets.

- **(i)** A = {a, b}. **P(A)={∅,{a},{b},{a,b}}.** Choose neither element, either singleton, or both: 4 subsets.
- **(ii)** B = {1, 2, 3}. **P(B)={∅,{1},{2},{3},{1,2},{1,3},{2,3},{1,2,3}}.** Group subsets by size 0,1,2,3; count 1+3+3+1=8.
- **(iii)** D = {p, q, r, s}. **P(D)={∅,{p},{q},{r},{s},{p,q},{p,r},{p,s},{q,r},{q,s},{r,s},{p,q,r},{p,q,s},{p,r,s},{q,r,s},{p,q,r,s}}.** Group by subset size; counts 1+4+6+4+1=16.
- **(iv)** E = ∅. **P(E)={∅}.** The empty set has exactly one subset, itself.

### Q9. Find the number of subsets and the number of proper subsets of the following sets.

- **(i)** W = {red, blue, yellow}. **8 subsets; 7 proper subsets.** Three distinct elements give 2³=8 subsets; remove W itself to obtain 7 proper subsets.
- **(ii)** X = {x² : x ∈ N, x² ≤ 100}. **1024 subsets; 1023 proper subsets.** Natural numbers x=1,…,10 give ten distinct squares {1,4,9,16,25,36,49,64,81,100}. Thus 2¹⁰=1024; subtract one for proper subsets.

### Q10.

- **(i)** If n(A) = 4, find n[P(A)]. **16.** Each of four elements is either selected or omitted from a subset, so 2⁴=16.
- **(ii)** If n(A)=0, find n[P(A)]. **1.** The empty set has only the empty subset, so 2⁰=1.
- **(iii)** If n[P(A)] = 256, find n(A). **8.** Solve 2ⁿ=256=2⁸, giving n=8.

### Independent verification for the continuation

A fresh Python/SymPy check independently enumerated prime sets and divisors, compared intersections, tested the finite set identities and checked powers of two. **25/25 targeted assertions passed** (Q3:4, Q4:4, Q5:3, Q6:4, Q7:1, Q8:4, Q9:2, Q10:3). Q4(ii), Q4(iv), Q6(i–iv) and Q7 additionally require the general classification/nested-set arguments written above; numeric checks alone do not establish their meanings. The original printed page was visually inspected, including Q7's nested braces and Q9(ii)'s exponent and inequality.

**Reconciled Exercise 1.2 source audit:** 10 numbered questions / 34 tasks on printed pp. 11–12; all **34** tasks now have source-image-reviewed English wording and independently reasoned solutions in this audit (9 earlier + 25 here). This does **not** imply 34 engine-validated app records, full chapter coverage, Tamil certification, or deployment. Existing Grade 9 draft PRs (including #118) must still be reconciled against main. Next: migrate this source audit into a documented batch manifest and synchronous per-record verifier, check existing IDs, validate and register under the integration lease, and run full required CI. Do not merge this audit PR as student-facing content.
