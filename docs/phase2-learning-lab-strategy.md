# Phase 2 — Triggle Mathematics-for-Everyone Learning Lab
**Research and implementation plan** • 6 November 2026 • Source-based decisions, not marketing claims

## Product promise

A Grade 9–12 Tamil Nadu State Board student with a modest Android phone, a limited data plan, and the prescribed 2025 Samacheer Kalvi textbook should be able to **understand a concept, verify one calculation, and continue solving on paper** without subscribing, signing in, watching compulsory videos, or sending their work to a server.

This plan **preserves Triggle's existing design system and all 105 legacy question IDs**. No seasonal overlay, forced gamification, autoplay videos, distracting streaks or unreviewed AI answers.

## Competitive research and differentiator

The following are publicly documented features, not controlled evaluation scores.

| Comparator | Observed teaching strength | Deliberate Triggle choice | Source |
|---|---|---|---|
| Khan Academy | Progressive exercise hints, worked solutions and mastery practice | Textbook-exact bilingual explanations plus compact off-screen practice and delayed recall | https://www.khanacademy.org/ and https://ies.ed.gov/ncee/wwc/PracticeGuide/1 |
| GeoGebra | Widely used dynamic geometry/visualization; whole-product licensing is non-commercial by default | Prefer original small diagrams and permissively licensed JSXGraph for advanced geometry; do not copy proprietary activities | https://www.geogebra.org/license |
| Desmos | Dynamic graphing and accessible calculators; commercial API tiers have fees | No essential feature may depend on a paid or limited external graph API | https://help.desmos.com/hc/en-us/articles/49078363315725-API-Plans-for-Commercial-Use |
| Mathigon / Polypad | Dozens of interactive manipulatives and short discovery activities, available free | Interactive understanding tied to *specific* Samacheer concepts and a final paper task | https://mathigon.org/teachers and https://mathigon.org/about |
| Brilliant | Interactive lessons and guided AI tutor; free plan has daily limitations and content requires internet | All core lessons/hints free, no daily unlock limits, no forced online inference | https://brilliant.org/faq/ |
| PhET | Downloadable HTML5 simulations with support for offline learning | Build lightweight, original interactive demonstrations that are cached alongside the actual lesson | https://phet.colorado.edu/en/offline-access |

Do not claim Triggle is 60% better than any comparator until independent, comparable testing is conducted. "60% more advanced" is a research goal, **not currently measured**. Accuracy, affordability, local-language support, comfort and learning outcomes matter more than the number of libraries.

## Research-grounded learning cycle

The US Institute of Education Sciences practice guide recommends **spacing learning over time, interleaving worked solutions with student attempts, combining graphics and verbal explanations, linking abstract and concrete representations, quizzing for retrieval and asking deep explanatory questions**.
- Source: https://ies.ed.gov/ncee/wwc/PracticeGuide/1
- Application to Triggle: **Recognize → Explore → Explain → Try → Check → Close and solve on paper → Revisit later**.
- The first-session time recommendation is a design aim, **not a guarantee** that children learn everything in 2 minutes.
- No app can guarantee a child will "never forget." Spaced retrieval and independent problem-solving make retention *more likely*; measure whether they help Triggle learners.

## Math notation and accessible problem solving

1. A superscript applied to a bracketed expression belongs above/outside the **closing** bracket: e.g. **[x+1]²**, **(a+b)²**, **([[1|2]])²** (internal markup for one-half). Never let the superscript appear on the final number or denominator alone.
2. Mobile width 320px must not clip the final right bracket or superscript. Long equations can scroll horizontally **inside their equation container**, not the whole webpage.
3. The app currently has a small locally hosted HTML notation renderer with safely escaped source strings. Pilot coverage: compact bracket groups, caret exponents, Unicode squared/cubed signs, existing double-bracket fraction syntax. This is **not a complete TeX parser**.
4. **Later** for complex algebra/arrays/matrices: evaluate a self-hosted KaTeX distribution (MIT, pre-render when possible), or MathJax 4 when richer assistive speech/Braille exploration is required. Test on inexpensive Android Chrome, screen readers and Tamil fonts first.
   - https://katex.org/
   - https://docs.mathjax.org/en/latest/web/components/accessibility.html
5. **Later** for input: locally bundled MathLive (MIT) if students need structured formula editing; always retain basic keyboard/text input for compatibility.
   - https://mathlive.io/mathfield/
6. Complex mathematical solutions should not be marked correct solely by numerical coincidence: verify domains, conditions, units and steps mathematically.

## Implementation decisions: JavaScript, mathematical engines, AI

| Tier | Candidate | License/cost and reason | Decision |
|---|---|---|---|
| Essential first | Browser DOM, SVG, CSS, service worker, localStorage, authored text | No paid dependencies, current device support, minimal overhead | **In use now** |
| Advanced geometry | JSXGraph **v1.14.2** (version from documentation updated 2026-10-26) | MIT OR LGPL-3.0-or-later; touch support, standalone, accessible author features | Candidate for a lazy-loaded geometry lesson, not needed for fixed two-set Venn |
| Complex symbolic verification | CortexJS Compute Engine | MIT; symbolic evaluation and simplification in JS | Candidate for selected equation/formula checker after math QA and bundle-size evaluation |
| Math formula entry | MathLive | MIT; touch math keyboard/editor | Candidate for advanced student input only |
| Formula rendering | KaTeX; MathJax 4 | KaTeX fast and bundlable; MathJax richer assistive tooling | Choose by audited test cases, bundle size and voice accessibility |
| AI-generated text | Hosted commercial/third-party LLM API | Variable cost and potential hallucinations; static GitHub Pages cannot protect browser-exposed API keys | **Not used as required infrastructure.** Optional teacher-reviewed mode only if funded and safety-tested |
| On-device AI | Google ML Kit Gemini Nano | Google's Android SDK runs locally but only supported devices/API versions; **not a general solution for a static web app or entry-level phones** | Research only; never block any child based on eligibility |
| In-browser generative models | WebGPU LLMs | Large downloads, battery/RAM and hardware variability; zero API cost does not mean zero data cost | Opt-in experimental mode on suitable hardware only, not in core lessons |

Sources for technology selection:
- https://jsxgraph.org/docs/
- https://www.npmjs.com/package/jsxgraph
- https://github.com/cortex-js/compute-engine
- https://mathlive.io/mathfield/
- https://developers.google.com/ml-kit/genai

**AI safety rule for minors:** An LLM may offer phrasing suggestions **only when grounded in an independently checked canonical solution and verified constraints**. Children must never be required to provide identifying details or send school work to commercial AI services. AI cannot be the judge of a mathematical proof by itself. No API key may be shipped to the public website.

## First working Phase 2 pilot

**Grade 9, Chapter 1 — Set Language / கண மொழி**, grounded in the supplied Tamil Nadu government Mathematics 2025 revisions:
- English printed Ch 1 opens p1, Tamil printed Ch 1 opens p1; Tamil PDF contents pp3–4 show set operations, De Morgan's laws, cardinality.
- Authored example: A={1,2,3,5}, B={3,4,5,6}, U={1,2,3,4,5,6,7,8}.
- Four selectable representations: union, intersection, A minus B, and the complement of the union.
- Always-available region text alternative to colored SVG.
- One short retrieval question with hint and meaningful incorrect-answer guidance.
- Medium challenge about overlapping sports with **four user-requested reasoning reveals**.
- Tamil terminology corroborated with uploaded Grade 9 Tamil 2025 contents and symbol glossary (PDF pp3–5).
- Finish on paper; suggest a voluntary return the next day, **without streaks, notifications, or attention-tracking**.

**This is only one original interactive section**, not all of Grade 9 Chapter 1 or the 41-chapter curriculum. The live chapter status remains *planned* and Tamil full-lesson review remains *pending*. Existing questions and user progress are untouched.

## Quality gates and "60%" benchmark design

Evaluate against a user-relevant baseline or comparable curriculum module before claiming improvement. Obtain independent consent and protect children's privacy. Record anonymized aggregated outcomes **without default analytics**:
- **Accuracy:** 100% sample-checked worked answers in released concepts, including domain/notation checks; no misleading references to mismatched textbook editions.
- **Accessibility:** 320px mobile viewport, keyboard controls, labeled/non-color alternatives, no audio dependency, no essential hover, reduced-motion compliance; independently audit toward WCAG 2.2 AA.
- **Availability:** every essential lesson and its diagrams/feedback usable from service-worker cache after first connection; no account, no mandatory remote API; all core chapters free.
- **Learning:** compare correct new-problem answers without hints and 7-day delayed retrieval. **Target** a ≥60% *relative* gain in delayed independent recall over a controlled baseline, but this is not yet demonstrated; report sample size and confidence intervals.
- **Digital wellbeing:** compare time to first independently correct paper task; avoid measuring success by minutes watched, logins or streaks.
- **Network performance:** measure transfer bytes, time-to-interactive, cold/warm loads on entry-level Android devices and simulated 2G/3G; prioritize offline and small page payloads.

## Next execution batches

1. **Pilot hardening:** run code tests, 320px + 390px mobile/browser checks, Tamil font audit, offline reload, mathematical editorial review and notation screenshots; retain the existing interface.
2. **Reusable concept schema:** authored EN/TA explanations, prerequisites, symbolic statements, illustrations, misconception feedback, answer validators, paper exercises and source-page locators.
3. **Full Grade 9 content:** cover the real book subsections and exercises (9 chapters), not generic placeholders. Continue with Grade 10 (8), Grade 11 (12) and Grade 12 (12), with QA checkpoints each chapter.
4. **Deep explanations for harder problems:** provide concise answer plus optional staged investigation: *What is given? Why this method? Calculation with no skipped logic. Independent check. Transfer problem.* Teacher-mode printable summary as a future feature.
5. **Later, not before educational QA:** optional symbolic math engine / rich input / curated AI assistance, each gated by real need and low-end-device cost tests.

No new paid infrastructure is required for this pilot. Static hosting has platform limits and may incur costs at larger scale; "free for learners" is a product commitment, not a promise that every potential server cost is permanently zero.
