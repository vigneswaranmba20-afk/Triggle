# VER Triggle — ChatGPT-style mathematics notation
**Permanent product standard, effective 13 November 2026. Applies across Classes 9–12 and both language interfaces.**

## What the student should see
A calm, readable mathematical explanation with genuine textbook maths, not a paragraph of slash-delimited expressions. Use:
- **Stacked fractions:** \(\dfrac{275}{8}\), not `275/8` in displayed mathematical working
- **Complete radicals:** \(\dfrac{\sqrt{351}}{8}\), not ambiguous `√351/8`
- **Proper bars and subscripts:** \(\bar x\), \(\sigma^2\), \(x_i\), \(\sum x_i^2\)
- **Readable aligned steps:** each transformation on its own line with a meaningful equality
- **Correct superscripts and parentheses:** \(\left(\dfrac{275}{8}\right)^2\)
- **Complete expressions in final answer** rather than squeezed inline pseudo-maths

## Mandatory authoring contract
1. Preserve the verbatim source `q.en`/`q.ta` and `steps[].eq` and `answer` fields as exact readable fallbacks. **Do not change mathematical content** to style it.
2. When a step contains mathematical notation, set `steps[i].math={latex:"...", fallback: steps[i].eq, display:true}` and `answerMath={latex:"...", fallback:answer, display:true}`. If a question has formula/matrix notation, additionally provide `questionMath` preserving exact prose fallback; never generate notation heuristically from paragraphs.
3. Use self-hosted KaTeX 0.16.22 via `TriggleNotation.render`; trust is off, strict TeX errors fall back safely. Never load hosted libraries or untrusted HTML. Parenthesize radicands and fraction terms correctly; `\sqrt{\frac{2000}{9}}=\frac{20\sqrt5}{3}` is a single exact chain.
4. For long expressions, write source-reviewed TeX `\begin{aligned}...\\...\end{aligned}`, using separate lines, no font-size tricks or clipping. At least one fully intelligible formula remains visible at a time on 320px Android.
5. Always provide **accessible** fallback and correct Unicode/Tamil prose; do not mark Tamil verified unless it is. Hide/defer no mathematical working.
6. Validate **all authored formula objects** using the pinned KaTeX renderer before merge; ensure each source `eq` equals its `math.fallback` and each source `answer` equals `answerMath.fallback`. Validate mathematical equivalence independently.
7. Browser-test actual formula glyphs at 320, 390, 412 px (plus a larger width), including stacked fractions, roots, bars, powers, MathML, final answer, no whole-page overflow, and scrollable formula keyboard access. Preserve navigation, previous answers, offline caches and all original record IDs. A missing renderer/MathML or `.math-fallback` in student UI blocks publication.

## Implementation reference
- `site/assets/math-notation.js`: offline, accessible KaTeX and legacy MathML
- `site/assets/math-typesetting.css`: responsive layout, per-expression scrolling only
- `site/tools/test_chatgpt_math_g10.cjs` and `site/tools/test_chatgpt_math_g10_browser.cjs`: standard regression tests
- `docs/curriculum/grade-10/g10-seven-recovery-20261113.json`, `docs/curriculum/grade-10/g10-ch8-ex8-1-q5-q10-20261113.json`: migrated English reference examples
- `AGENTS.md`: every future coding agent must respect this persistent rule

**Migration policy:** Older legacy exercise records without structured mathematics remain compatible and must be upgraded progressively without changing their wording or numerical results. New or modified mathematical content must never reintroduce the old plain-text-only style. Real mathematical correctness and original-text fidelity take precedence over appearance.
