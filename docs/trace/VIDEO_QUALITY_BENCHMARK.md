# TRACE Video Quality Benchmark — mathematical teaching, not just MP4 output

**Version:** 1.0 · 20 November 2026  
**Scope:** English concept videos for Triggle Grades 9–10. Do **not** treat this as permission to generate exercise videos or publish unreviewed material.

## Approved reference lessons

1. **Geometric Series / Progression** — Grade 10 Ch 2, published 108.62-second Fola lesson. The production pattern established source-verified mathematics, nine synchronized narration beats, safe SHA-pinned media storage, mobile-friendly 9:16 layout, and explicit quality gates.
2. **Nature of Roots and the Discriminant** — Grade 10 Ch 3, nine-beat Fola **review** MP4, not yet student-published. The prototype uses an exact parabola driven by coefficients, not decorative AI-generated curves. Production mission: [#290](https://github.com/vigneswaranmba20-afk/Triggle/issues/290); code: [PR #291](https://github.com/vigneswaranmba20-afk/Triggle/pull/291).

Do not conflate a local or GitHub Actions review artifact with a live lesson. Keep media-provenance evidence separate from teaching-quality judgments.

## Reusable lesson design system

- Begin with a **concrete misconception or surprising observation**, not unexplained symbols.
- One key idea per beat; use a visual change whenever the explanation describes change.
- The opening should state a learner question; introduce mathematical notation only after defining its symbols.
- Animate **the reason** an operation works: pair the terms that cancel, show an actual axis crossing, move the exact curve as a coefficient changes.
- Use precise mathematical typography and readable superscripts, fractions, axes, labels, negative signs and brackets.
- Never reveal the practice answer before a genuine learner pause. Make the pause easy to extend using the student's player controls.
- End with independent transfer or a quick verification; avoid adding a second unrelated topic.
- Prefer an individual scene when timing precision matters. Accept a single full-length WAV only when forced alignment and semantic checks are reliable; neither approach should require new model API charges by default.
- All visuals should be generated from checked coefficients, terms and formulas, not inferred from narration alone.

### Quality rubric (score each dimension 0–5; total weighted to 100)

| Dimension | Weight | What reviewers must check |
|---|---:|---|
| Mathematical truth | 30 | Every formula, example, root, cancellation, sign and stated condition agrees with independently checked calculations and syllabus |
| Learner comprehension | 20 | No assumed prerequisite, symbols explained, each beat supports a single mental step, practice supports transfer |
| Visual meaning | 15 | Animated elements demonstrate mathematical causes; no decorative motion; coordinates match numeric values |
| Fola/voice delivery | 10 | Natural pace, exact transcript, correct numbers and pronunciation, no background music or unintended speech |
| Audio–visual synchronization | 10 | Visuals occur during the correct spoken explanation; holds are intentional; no early answers |
| Android usability | 10 | Readable on 360px portrait; controls, seeking, replay, pause and fullscreen work; no clipped text |
| Provenance and release safety | 5 | All source scripts/audio/video checksums recorded, reviewed MP4 matched exactly, old published link remains recoverable |

**Target:** 90/100 or above **and every hard gate passed**. A number never overrides a mathematical or technical failure.

### Mandatory hard gates — any failure blocks publication

1. **Math:** Independent exact mathematics test, error-free symbols and the correct domain/conditions (e.g. `a ≠ 0` for quadratics, `r ≠ 1` for the geometric-series formula).
2. **Narration:** A person listens to the full recording and confirms transcript, voice identity, formula pronunciation and clarity. WAV filenames alone never prove it is Fola.
3. **Pedagogy:** Every scene must be faithful to its script and source; a student challenge must not leak its answer beforehand.
4. **Media:** Probe H.264 + AAC and portrait dimensions, decode the complete video with FFmpeg, confirm expected scene count and audio durations, retain SHA-256.
5. **Mobile:** Real-phone or equivalent 360px readability inspection and actual pause/seek/replay, including video loading on a slow connection when feasible.
6. **Deployment:** Immutable R2 key, verify public range/playback; update exactly the intended concept's media reference; preserve other textbook/exercise work; merge only with required GitHub quality gate green; check the **live** GitHub Pages asset and correct cache revision.
7. **Finance/privacy:** No additional billable OpenAI/Gemini API calls without explicit approval. Using paid subscriptions in their UI must not be misrepresented as unlimited developer API usage. No unnecessary student data collection.

## Production loop — what TRACE does, and does not, learn

`Concept → source audit → storyboard + precise visual data → voice recording → local MP4 rendering → independent checks → human review → signed-off release → measured retrospective`

**Today TRACE is an engineered pipeline, not a self-training model.** Improvements persist when developers capture a lesson's failure modes in source-controlled templates, tests, prompts and review notes. Every completed video should create a retrospective entry:

- Concept/lesson ID and existing template chosen; new template only if necessary
- Number of beats, narration source, audio duration and scene timing
- First-review quality score (all seven categories), reviewer observations
- Errors found, root cause, specific fix, regression test added
- Human actions required and any repeated handoffs that could be eliminated
- Whether reusable template logic was extracted; measured minutes from script lock to review MP4
- Immutable final-media SHA-256 and deployment verification result

Do **not** assume that a video makes later videos faster until the timings and actual handoffs confirm it. Quality first, with fewer manual steps as a measured objective.

## Templates to expand next

- **Series:** exact term labels, alignment, cancellation and independent example (existing G.P./A.P. patterns)
- **Quadratics:** exact parabola movement with discriminant and intercepts (Discriminant pilot)
- **Functions and graphs:** mapped pairs and domain/range transitions
- **Geometry:** labeled construction, angle invariants and coordinate/length checks
- **Trigonometry:** unit-circle motion and verified right-triangle ratios

Prioritize concept videos that demonstrably benefit from motion and meet the existing **8/10 concept-video selection threshold**. Preserve student-facing textbook exercises and existing live videos.

## Release sign-off record (copy into each mission issue)

```text
Lesson:
Source chapter/section:
Narration recorded and listened to by:
Visual/math test results:
Scene count / frame size / duration:
Math /30; comprehension /20; visual /15; voice /10;
sync /10; mobile /10; provenance /5; TOTAL /100:
Hard gates (math, narration, pedagogy, media, mobile, deployment, cost):
Review MP4 SHA-256:
Approved video SHA-256:
Cloudflare immutable URL:
PR / required checks:
Public Pages verification date + URL:
Known limitations and rollback link:
```

The benchmark is a reusable acceptance protocol, **not automatic approval** to publish the reviewed Discriminant MP4.
