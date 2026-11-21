# NEON Bridge Lab — Mission 01: Grade 9 Concept UI Unification

Repository: https://github.com/vigneswaranmba20-afk/Triggle
Live site: https://vigneswaranmba20-afk.github.io/Triggle/site/
Working branch for ChatGPT implementation: `feature/g9-mensuration-ui-unification-20261121`
Reference: Grade 9 Mensuration's **"A quadrilateral is two triangles"** interactive concept, not Grade 9 Sets' **"Three ways to describe one set"** page.
Date: 2026-11-21

## Goal
Create an evidence-based, implementation-ready visual audit so ChatGPT can unify the UI of **every existing Grade 9 concept lesson**, using Mensuration's neat touch-first styling as the benchmark. Scope includes currently published English and Tamil versions; do not invent or create new lessons.

## Source CSS to inspect
- `site/assets/g9-mensuration-concepts.css`: benchmark lab/card/button patterns
- `site/assets/living-concepts.css`: some Set Language lesson styles
- `site/assets/chapter-hub.css`: shared concepts and navigation
- `site/assets/paper-indigo.css`, `site/assets/bond-light.css`: global palette and overrides
- `site/index.html`: CSS order and script wiring
- Identify other real Grade 9 concept modules from the repository before claiming coverage.

## Benchmark patterns (verify in source and screenshots)
- Lab: soft tinted background, restrained 18px-ish corner radius, subtle border and breathing room.
- Touch controls: clear 46px-or-greater hit area, consistent shape and readable typography.
- Selected state: maroon/salmon tinted surface with a visible border, plus keyboard focus indicator.
- Mathematical diagram: labels with a halo and separation from crossing lines.
- Page hierarchy: consistent title, control group, diagram, explanation, practice, and navigational affordances.

Keep a light paper interface, not dark mode. Preserve compact layout, ChatGPT-style mathematical rendering, English/Tamil text flow, reduced motion and offline operation.

## Critical guardrails
1. VISUAL AUDIT ONLY: NEON does not need to edit or deploy code. Do not say changes were implemented, tested, merged or published unless independently verified. Share the audit output with ChatGPT.
2. Do not change content, math facts, exercise questions, solution logic, chapter order, grade 10, video workflows, question IDs, saved progress or existing event handlers.
3. Do not blindly copy CSS classes between concept implementations; propose a Grade-9-scoped theme/token layer with minimal exceptions.
4. Preserve "Back to concepts" and consistent "Previous idea / Next idea" where applicable; no floating bottom navigation that follows scrolling.
5. Confirm changes do not collide with ongoing audit fixes or change 9/10 teaching behavior.
6. Do not ask for credentials or API keys. If GitHub/Pages cannot be accessed, mark paths/claims UNVERIFIED and request screenshots or file excerpts rather than guessing.
7. Avoid new paid APIs, external fonts, heavy libraries or image downloads.

## Required output
A. Inventory: every **existing Grade 9 concept chapter**, concept count, route/deep link, and render module; mark uncertain counts explicitly.
B. Screenshots/before-state findings for at least one representative lesson per chapter, and more where layouts differ.
C. Component-by-component visual comparison against Mensuration: title fonts/weights, card padding/radius, selected state, buttons, touch size, spacing, formula container, diagram labels, language switching and top/bottom navigation.
D. Severity-prioritized matrix with: chapter, issue, location, expected style, safe implementation hint, regression risk and screenshot evidence.
E. Proposed shared CSS design tokens and selectors scoped strictly to Grade 9 concepts; list exceptional components that must retain custom diagram styles.
F. A measurable acceptance checklist covering widths 320px, 390px, 412px; English/Tamil, mobile no-overflow, readable KaTeX, working interactive controls, keyboard focus and reduced motion.
G. Three highest-risk failure modes and minimal rollout order: pilot on Sets, validate, then remaining published Grade 9 concepts.
H. Clear distinction of what is confirmed from files/screenshots versus inferred.

Do not provide a vague aesthetic essay. Make it engineering-ready and concise enough that ChatGPT can turn it into code/tests.
