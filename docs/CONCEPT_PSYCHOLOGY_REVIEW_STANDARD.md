# VER Triggle — Concept Psychology Review Standard
**Decision:** 18 November 2026 — derived from user-reviewed Grade 10 Chapter 2 HCF and Geometric Progression improvements.
**Scope:** Concepts for Grades 9–12 in English and Tamil. Supplements `docs/CONCEPTS_UX_SCHEMA.md`, `docs/CHATGPT_STYLE_MATH_NOTATION_STANDARD.md`, and the existing curriculum and release gates. Do not override those standards.

## Mission
Make every mathematical interaction help a beginner *see why the mathematics works*, rather than merely manipulate a decorative control. Adapt the presentation to the **specific reasoning difficulty** of each concept. Preserve the source, sequence, published exercises and detailed solutions. Remain free, offline-capable, low-bandwidth and usable on inexpensive Android phones.

This is an instructional-design heuristic informed by cognitive-load and worked-example principles, **not a claim to have psychologically profiled children or conducted a controlled student study**. Do not infer individual students' ability, identity, mental state or learning style.

## Two user-validated pilot decisions (18 November 2026)
1. **HCF / Euclidean algorithm:** The user found a clipped formula chain and an unrelated term/remainder slider confusing, despite being able to solve the quiz. Preferred: three fully visible and correctly labeled divisions (e.g. `60 = 32 × 1 + 28`, `32 = 28 × 1 + 4`, `28 = 4 × 7 + 0`), concluding that the last nonzero remainder is 4. Demonstrate sequential mathematical reasoning; avoid horizontal clipping.
2. **Geometric Progression:** The user liked the existing lesson and preferred replacing a generic term slider with a clickable term sequence. For `5, 15, 45, 135`, selecting each step shows `5 × 3 = 15`, `15 × 3 = 45`, and `45 × 3 = 135`. Preserve the compact explanation, A.P.–G.P. contrast and formula, and define `a`, `r`, and `n` for beginners.

**Generalization:** Neither “always use three steps” nor “always use clickable terms” is a universal rule. Use the demonstration that reveals the defining mathematical relationship. A slider is appropriate *only when continuous change itself teaches something*. Do not redesign a lesson that already works merely for novelty.

## Standard workflow: automated first pass + individualized concept review
For **each concept**, before building, record:
- **Learning target:** one sentence describing what a beginner should understand and demonstrate.
- **Prior-knowledge risk:** every unfamiliar symbol, vocabulary item, representation or prerequisite; explain it in place or via an optional deep dive.
- **Likely misconception:** the most plausible wrong reasoning, not a judgment of a particular child.
- **Best representation:** e.g. successive division for HCF, multiplicative links for G.P., number line for integers, movable geometry for angle relationships, cancellation for series sums, or a short worked example when no interaction earns its space.
- **Independent transfer check:** one *new* question that cannot be answered merely by copying the demonstration.

### Step A — Build lean and mathematically complete
Show the concept's mathematical object and essential explanation immediately. Make the student see the operation, units, symbols, and causal relationship. Use ChatGPT-style typeset notation and sensible spacing. One useful primary interaction per concept is usually enough; omit generic sliders, excess counters, decorative animations and misleading visual effects. Keep the existing “Understand the idea” optional depth. Do not make compulsory videos; preserve the current policy that videos are selective for worthwhile concepts, not exercises.

### Step B — Assess the specific concept after the first build
Score 0–10 for each dimension (10 = independently clear):
| Dimension | Weight | What to inspect |
| --- | ---: | --- |
| Mathematical correctness and source fidelity | 25% | Correct identity, examples, cases, bilingual meaning |
| Beginner understanding and symbol clarity | 25% | Can a novice follow without assumed vocabulary? |
| Cognitive load and explanatory sequence | 20% | One coherent progression, no distracting competing controls |
| Purposeful representation or interaction | 15% | Does each tap reveal the mathematical mechanism? |
| Mobile, accessibility and offline usability | 10% | 320/360/393/430 px; keyboard, screen reader, low bandwidth |
| Independent transfer question and feedback | 5% | Checks understanding, not only recognition or recall |

Weighted score is a **design-review estimate**, not evidence of measured learning gain. No publishing of concept changes with wrong mathematics, missing exercise content, false Tamil claims, clipped formulas, unusable keyboard controls or broken offline assets, regardless of the weighted score. Aim for >=9/10 after fixes, but quality gates are stronger than numeric targets.

### Step C — Prioritize and validate
- **Always do a lightweight individual review** after each first build, even when a shared component pattern was used.
- Prioritize deeper review for scores below 9, prerequisite-heavy concepts, misconceptions with high exam impact, or any lesson with a distracting interaction.
- Automatically check deterministic mathematics, semantic markup, navigation, offline cache, accessibility basics, and mobile overflow; use browser screenshots at 320/360/393/430 CSS px and both languages wherever authored.
- Human/student feedback is especially valuable when a learner says a concept is confusing or “good” despite a passing automated test. Record the actual observation, not invented learner profiles.
- Reassess after a targeted redesign. Keep already-effective copy and controls; avoid full-page rebuilds unless necessary.
- Prefer finishing accurate textbook exercises over speculative visual polish; batch repetitive safe checks, but do not bypass critical release gates.

## Applying this in dual-AI work
Codex, Gemini/Antigravity and TRACE may author or audit different concepts in parallel. Every concept PR should link this standard and include the learning target, key misconception, chosen representation, score before/after (where applicable), exact test evidence and known open issues. A reviewer decides whether the concept itself needs a unique demonstration; **no one-size-fits-all widget factory**. Check conflicts with concurrent branches before merging. Publish only after required tests and verify the GitHub Pages output.

## Example acceptance criteria
- **HCF:** no horizontal clipping; three divisions visible; last nonzero remainder explained; correct independent HCF quiz.
- **G.P.:** clicking 5, 15, 45 or 135 shows the corresponding multiplication (starting term stated); 3 is identified as common ratio; formula symbols explained; keyboard operation works.
- **All concepts:** concise first viewport, legible math, optional detailed explanation, textbook exercises unchanged, bilingual claims honest, no costly external dependency.

**Design rule:** Every interaction must earn its place by making a mathematical relationship easier to understand.
