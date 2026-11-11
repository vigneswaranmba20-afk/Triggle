> **Discontinued design (2026-11-11):** retained as historical research. Exam/Detailed/Fun presentation and hard-only Detailed views are no longer product requirements. Use [the standard-solution direction](STANDARD_SOLUTIONS_2026-11-11.md).

# Grade 12 Explain Your Way — 40-approach simulated design audit

> **Historical research note (2026-11-11):** The original simulation compared three-mode ideas, but the product decision has since changed. That release supported **Exam + Detailed only**, without a Fun tab; this design is now also discontinued. See `docs/G12_EXPLAIN_YOUR_WAY_BUILD_PROMPT.md` v1.1 for the implementation contract. This original simulation is preserved for research provenance.
**Date:** 2026-11-11. **Decision:** Use H2 (three opt-in explanation depths, clear visual hierarchy, optional relevant jokes, progressive detailed steps and small voluntary understanding checks).

## Method and scientific limits
This is **not an actual psychological experiment**: there are no children, IQ measures, A/B results, invented test subjects, significance claims, simulated empirical learning gains or human interviews. It is a *structured simulated design review*: 8 candidate learning strategies × 5 presentation styles = **40 designs**, each hypothetically inspected against **8 learner situations**. Every score is an *author judgment*, not a measurement of educational benefit. IQ is a poor UX segmentation variable. Prior knowledge, reader speed, anxiety, language, mobile size and accessibility are more actionable.

### Eight modeled situations
- **P1 Missing prerequisite:** Can a student who forgot determinant signs follow the first transition?
- **P2 Slow processing:** Can every calculation be paused/revealed without a timer?
- **P3 Low working-memory budget:** Can the matrix/question remain visible while working?
- **P4 High prior knowledge:** Can the full answer be reached immediately without a lecture?
- **P5 Math anxiety:** Are errors explained without shaming/ability labels?
- **P6 English/Tamil switching:** Is untranslated content flagged accurately, without false Tamil parity?
- **P7 Small-screen reader:** Do large matrices scroll inside a container at 320px?
- **P8 Offline/assistive learner:** Does the experience work offline, by keyboard and with semantic MathML?

### Rubric (judgment only)
- **Math fidelity** 0–25: reuses a single checked canonical solution; no fabricated symbolic work.
- **Learner agency** 0–20: learner chooses depth, skips or reveals, never forced through a timer.
- **Cognitive-load protection** 0–20: concise default; contextual but optional extra details.
- **Prospective transfer opportunity** 0–15: optional check, error warning, or later comparable problem.
- **Accessibility/age respect** 0–10: no ability/medical labels; keyboard, MathML, mobile.
- **Offline/implementation fit** 0–10: no per-click AI/network or analytic tracking.
  
These ordinal scores prioritize *design hazards and compatibility* and do not predict test scores, comprehension, learning gains or completion rates. Versions with gratuitous emoji or forced gamification are intentionally penalized based on attention and autonomy concerns. The scores cannot establish causality, equivalence or comparative effectiveness.

## The 40 candidate approaches, ordered by rubric
| Rank | ID | Learning strategy × presentation | Design score (/100; not outcome) | Main concern |
|---:|---|---|---:|---|
| 1 | H2 | Learner-controlled Exam/Detailed/Fun tabs, gradual steps and one optional check × Readable hierarchy, accurate TeX, optional relevant analogy | 99 | needs reviewed instructional content and tab QA |
| 2 | H1 | Learner-controlled Exam/Detailed/Fun tabs, gradual steps and one optional check × Sparse text, no diagrams or humor | 96 | needs reviewed instructional content and tab QA |
| 3 | H3 | Learner-controlled Exam/Detailed/Fun tabs, gradual steps and one optional check × Relevant light humor in explanations | 95 | needs reviewed instructional content and tab QA |
| 4 | D2 | Inline expandable Why on each canonical step × Readable hierarchy, accurate TeX, optional relevant analogy | 85 | not a complete novice pathway |
| 5 | E2 | Faded examples alternating with practice × Readable hierarchy, accurate TeX, optional relevant analogy | 85 | Must avoid semantic loss and clipping |
| 6 | H4 | Learner-controlled Exam/Detailed/Fun tabs, gradual steps and one optional check × Emojis and memes in every step | 84 | needs reviewed instructional content and tab QA |
| 7 | D3 | Inline expandable Why on each canonical step × Relevant light humor in explanations | 83 | not a complete novice pathway |
| 8 | E3 | Faded examples alternating with practice × Relevant light humor in explanations | 83 | Keep jokes tied to each mathematical rule |
| 9 | C2 | Single progressive reveal of canonical steps × Readable hierarchy, accurate TeX, optional relevant analogy | 82 | Must avoid semantic loss and clipping |
| 10 | D1 | Inline expandable Why on each canonical step × Sparse text, no diagrams or humor | 81 | not a complete novice pathway |
| 11 | E1 | Faded examples alternating with practice × Sparse text, no diagrams or humor | 81 | Accessible but abstract |
| 12 | C3 | Single progressive reveal of canonical steps × Relevant light humor in explanations | 80 | Keep jokes tied to each mathematical rule |
| 13 | C1 | Single progressive reveal of canonical steps × Sparse text, no diagrams or humor | 78 | Accessible but abstract |
| 14 | H5 | Learner-controlled Exam/Detailed/Fun tabs, gradual steps and one optional check × Mandatory points, streaks and timed unlocks | 76 | needs reviewed instructional content and tab QA |
| 15 | F2 | Side-by-side working and commentary × Readable hierarchy, accurate TeX, optional relevant analogy | 72 | Must avoid semantic loss and clipping |
| 16 | F3 | Side-by-side working and commentary × Relevant light humor in explanations | 70 | Keep jokes tied to each mathematical rule |
| 17 | D4 | Inline expandable Why on each canonical step × Emojis and memes in every step | 69 | not a complete novice pathway |
| 18 | E4 | Faded examples alternating with practice × Emojis and memes in every step | 69 | Extraneous detail and potential distraction |
| 19 | F1 | Side-by-side working and commentary × Sparse text, no diagrams or humor | 68 | Accessible but abstract |
| 20 | G2 | Socratic hints before any completed solution × Readable hierarchy, accurate TeX, optional relevant analogy | 68 | Must avoid semantic loss and clipping |
| 21 | C4 | Single progressive reveal of canonical steps × Emojis and memes in every step | 66 | Extraneous detail and potential distraction |
| 22 | G3 | Socratic hints before any completed solution × Relevant light humor in explanations | 66 | Keep jokes tied to each mathematical rule |
| 23 | A2 | Exam-only complete worked answer × Readable hierarchy, accurate TeX, optional relevant analogy | 64 | Must avoid semantic loss and clipping |
| 24 | G1 | Socratic hints before any completed solution × Sparse text, no diagrams or humor | 64 | Accessible but abstract |
| 25 | A3 | Exam-only complete worked answer × Relevant light humor in explanations | 62 | Keep jokes tied to each mathematical rule |
| 26 | D5 | Inline expandable Why on each canonical step × Mandatory points, streaks and timed unlocks | 61 | not a complete novice pathway |
| 27 | E5 | Faded examples alternating with practice × Mandatory points, streaks and timed unlocks | 61 | Pressure, accessibility and autonomy concerns |
| 28 | A1 | Exam-only complete worked answer × Sparse text, no diagrams or humor | 60 | Accessible but abstract |
| 29 | C5 | Single progressive reveal of canonical steps × Mandatory points, streaks and timed unlocks | 58 | Pressure, accessibility and autonomy concerns |
| 30 | B2 | Always-visible very detailed solution × Readable hierarchy, accurate TeX, optional relevant analogy | 56 | experts face overload |
| 31 | F4 | Side-by-side working and commentary × Emojis and memes in every step | 56 | Extraneous detail and potential distraction |
| 32 | B3 | Always-visible very detailed solution × Relevant light humor in explanations | 54 | experts face overload |
| 33 | B1 | Always-visible very detailed solution × Sparse text, no diagrams or humor | 52 | experts face overload |
| 34 | G4 | Socratic hints before any completed solution × Emojis and memes in every step | 52 | Extraneous detail and potential distraction |
| 35 | A4 | Exam-only complete worked answer × Emojis and memes in every step | 48 | Extraneous detail and potential distraction |
| 36 | F5 | Side-by-side working and commentary × Mandatory points, streaks and timed unlocks | 48 | Pressure, accessibility and autonomy concerns |
| 37 | B4 | Always-visible very detailed solution × Emojis and memes in every step | 45 | experts face overload |
| 38 | G5 | Socratic hints before any completed solution × Mandatory points, streaks and timed unlocks | 44 | Pressure, accessibility and autonomy concerns |
| 39 | A5 | Exam-only complete worked answer × Mandatory points, streaks and timed unlocks | 42 | Pressure, accessibility and autonomy concerns |
| 40 | B5 | Always-visible very detailed solution × Mandatory points, streaks and timed unlocks | 38 | experts face overload |

## Decision for engineering
**Winner H2:** retain existing exam worked solution, add learner-choice buttons **📝 Exam / 🧩 Detailed / 😂 Fun** to medium and hard Grade 12 question readers. The other two use original vetted reasoning/equations in small progressive chunks, never new computed answers. Fun may contain *at most one relevant analogy per section*, with the underlying identity or calculation visible; humor is optional. After explanation include a small optional topic-specific reasoning check when one has been carefully authored. No IQ profiles, scores, psychological assessment or compulsive nudges. Grade 12 easy questions keep existing reader. Not-yet-authored textbook exercises must not be faked.

The H1 minimal version protects cognitive load but misses helpful visual grouping. H3 increases risks of decorative humor; H4/H5 are rejected. H2 is an engineering *hypothesis* deserving real learner trials, not scientific proof.

### Pilot acceptance criteria (not measured in this audit)
- Exact original question text, record IDs, calculations, final answer, student progress keys remain unchanged.
- Browser screens at 320, 390 and desktop; keyboard tabs; screen-reader semantic structure; offline reload.
- No duplicative final answers and no claims of Tamil translation where pending.
- In a future real pilot compare accuracy on **new related questions**, time, mistakes, confidence and subjective confusion. Collect only with appropriate school/family permission; avoid IQ labeling.

## Source triangulation and trust hierarchy
**Research/technical standards** have the highest evidentiary weight for design decisions. **Reddit** comments serve as anecdotal requirements discovery (missing algebraic transitions, passive answer reading, prior concepts). **X/Twitter-origin** posts/mirrors are teacher observations, not experiments; direct x.com results were sparse or summarizing uncertain debates, so no unverifiable X claims are made. **Internet Archive** hosts historical studies/book material; not proof of modern product effectiveness. Other educational platforms show implementation patterns, not controlled results.

- Meta-analysis: worked examples in mathematics (2023): https://eric.ed.gov/?id=EJ1364058
- Meta-analysis: expertise reversal (2025): https://www.sciencedirect.com/science/article/pii/S0959475225000660
- Meta-analysis: seductive details (2026): https://doi.org/10.1007/s10648-025-10099-z
- Instructional humor vs irrelevant humor (2026): https://pubmed.ncbi.nlm.nih.gov/41906388/
- EEF: what and why worked examples: https://educationendowmentfoundation.org.uk/news/eef-blog-using-worked-examples-to-support-mathematical-problem-solving
- Experimental evidence: learning solution steps and transfer: https://eric.ed.gov/?id=EJ1402965
- Reddit math: able to follow, not reconstruct: https://www.reddit.com/r/math/comments/q3ufp5
- Reddit MathHelp: where did a step come from?: https://www.reddit.com/r/MathHelp/comments/o99wta
- Reddit learnmath: prerequisite order complaints: https://www.reddit.com/r/learnmath/comments/1vv9ql3/is_khan_academy_actual_garbage_for_learning_math/
- Reddit math: importance of attempting before reading: https://www.reddit.com/r/math/comments/t1wef7
- Reddit learnmath: unexplained step jump: https://www.reddit.com/r/learnmath/comments/ftq5sy
- X-origin math education notes mirrored with author attribution: https://www.ollielovell.com/craigbartonnotes/
- Public archived educator X thread on worked examples: https://threadreaderapp.com/user/sharemath
- Internet Archive: Polya framework study: https://ia600503.us.archive.org/3/items/e5716319/MTODODEPOLYAUNAALTERNATIVA.pdf
- W3C ARIA tab guidance: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- Khan Academy: hints/reveals example: https://blog.khanacademy.org/how-should-people-practice-on-khan-academy/
