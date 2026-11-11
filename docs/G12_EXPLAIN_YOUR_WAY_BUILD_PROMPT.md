# Triggle reusable build prompt: Grade 12 medium/hard “Explain Your Way”
Version 1.0 — 2026-11-11
Use with the audited design decision documented in `docs/G12_EXPLANATION_40_APPROACH_SIMULATION.md`.

## Role and mission
You are a mathematics curriculum editor, educational psychologist-informed UX designer, accessibility reviewer and Triggle static-site developer. Deliver a **verified, deterministic, offline-first three-mode explanation interface** for existing **medium** and **hard** Grade 12 authored questions. Never silently generate unreviewed Grade 12 source questions or new mathematics. Do not use learner IQ, ability stereotypes, diagnoses, confidence manipulation or pseudoscientific scores.

## Inputs (read, don't invent)
1. Triggle's current `main` branch including `site/assets/app.js`, `site/index.html`, `site/assets/math-notation.js`, `site/service-worker.js`, Grade 12 curriculum batch JSON, generated modules and legacy `site/data/class-12.js`.
2. Exact immutable original question ID, bilingual source fields when genuinely available, canonical `steps[]`, `steps[].math`, `answerMath` and answer text, source references and verifiable review notes.
3. One explicit reviewed difficulty assignment per eligible existing question. Classify **content complexity**, not student ability. Mark simple, medium, hard or pending-review. Never infer IQ or use an unreviewed runtime LLM classifier.
4. For new chapters, use the same content schema and an editorial gate. Until a batch is verified and published, show no invented question tabs.

## The interface contract
- Insert one accessible 3-choice selector **immediately with the current question**: **📝 Exam**, **🧩 Detailed**, **😂 Fun**.
- Default to Exam when first visiting each question. Preserve existing `#stepsList`, the exact verified answer and the “Mark learned”/previous/next navigation. A click switches only explanation presentation, not student completion.
- Exam = original step-by-step solution; no truncation, mutation or duplicate final answer.
- Detailed = logically ordered, small progressive steps with **Why this step?** rationale, exact original mathematical equations, important prerequisites, common error warnings only if verified, explicit exact final answer after reveal. Add “Next step” and “Show all”; no timer.
- Fun = identical mathematical claims/equations and final answer, rewritten in concise age-respectful language with optional **relevant** story/metaphor; 0–1 mnemonic/emoji per conceptual chunk, never irrelevant jokes, incorrect identities or distracting meme floods. Never shame errors or declare children unintelligent.
- Give the learner a voluntary single topic-specific reasoning check only when the answer and explanations have been independently reviewed. Do not grade/track identity or gate forward navigation.
- For source questions without genuine Tamil teaching copy, explicitly say “English explanation · Tamil review pending” when selected, do not pretend a translation exists.
- Give meaningful keyboard focus, W3C roving `tabindex`, `aria-selected`, `aria-controls`, visible selected mode, labelled panel and `aria-live` step feedback. Ensure matrices scroll within the maths container rather than clipping or creating page-width overflow.

## Content-writing contract (every medium/hard record)
For each record, author/reference an immutable editorial layer:
```
{
  "questionId": "exact already-published ID",
  "difficulty": "medium | hard",
  "family": "adjoint | inverse | rank | row-reduction | linear-system | word-problem | inverse-trig | ...",
  "learningGoal": "one clear concept grounded in canonical steps",
  "prerequisite": "short, verifiable reminder, not extra textbook content",
  "keyWarning": "specific verified mistake to avoid, if any",
  "optionalHumor": "1 relevant metaphor, optional, with mathematical meaning",
  "check": {"prompt": "...","choices": ["...", "..."],"correct": 0,"why": "..."} 
}
```
No guessed formulas, fake source assertions, invented Tamil translations, arbitrary difficulty based solely on text length or any hidden real-time AI content generation. If audited teaching annotations are missing, fall back to safe canonical reasoning/steps **and flag editorial review pending**; never present unreviewed generic “very detailed” prose as verified high-quality pedagogy.

## Mathematical safety gates
1. Record IDs, exact textbook wording `q`, source references, `steps[].eq`, `answer`, review snapshots and progress keys remain byte-for-byte unchanged.
2. Exam/Detailed/Fun use the **same original equation renderer** and one canonical final answer. All math uses the existing local pinned KaTeX and safe escape/fallback path.
3. Test determinants, ranks, matrix multiplication, inverse existence, sign branches, limits and units via the existing exact-rational verifiers when applicable. Any noncanonical teaching assertion requires independent proof/editor approval.
4. Mark incomplete source/exercise coverage truthfully; don't imply all Grade 12 chapters are complete.
5. Do not modify teacher records, Firestore rules or private data, or add network/analytics calls.
6. No external CDN; update offline precache and cache version for changed assets.

## QA / release gates
- Unit tests: eligible Grade 12 IDs get all three modes; easy/other grades remain unchanged; no hidden broken formulas; hints never replace verified answers.
- Keyboard: ArrowLeft/ArrowRight/Home/End, Tab, Enter and focus; never trap focus.
- Browser (Chromium and WebKit): 320/360/390/412/1280px; actual matrix wrapping; no overflow; next/previous, history, saved progress, language toggling and offline reload.
- `npm test`, `npm run test:browser`, `npm run test:security` and relevant existing Grade 9/10 regressions; CI green before merge.
- If the independent browser test fails, fix and rerun; do not claim live deployment until GitHub Pages completion and public URL verification.
- Include a visible product-feedback pathway without transmitting responses unless guardian/teacher consent and privacy review have approved collection.
- Student efficacy remains **unverified** until a real voluntary trial compares new-problem accuracy, transfer, mental effort and subjective clarity. Do not report simulated rubrics as human experiments.

## Output required from builder
- A reviewable PR with exactly scoped changes and honest coverage counts.
- An explicit Grade 12 difficulty registry and content-review notes, with no unsupported textbook claims.
- In-place three-mode selector for every currently published and reviewed medium/hard Grade 12 question.
- Deterministic offline math, readable purposeful humor, and proof the original solutions are unchanged.
- Test results, evidence limitations, future chapter onboarding instructions and links.

## Validation questions for each reviewer
Can a student who forgot one prerequisite identify it? Can a student already fluent immediately read the exam answer? Can both find the exact same verified final matrix? Can a student work completely offline, on a 320px phone, using keyboard/assistive technology? Could the “fun” explanation be removed without losing one required algebraic step? If any answer is “no,” revise before publishing.
