# VER Triggle — Universal Concept Screen Contract
**Applies to Grades 9–12; every chapter with published Concepts, English and Tamil when available.**
**Decision:** 15 November 2026. **Audience:** children, including first-time low-bandwidth mobile users.

## Non-negotiable design

1. **One small index, not a landing page.** Opening Concepts shows a vertically readable numbered list of idea names. Keep the global class switcher and *one* Back to chapter link. No repeated “Chapter N · Title · Concepts” heading, marketing headline, “interactive lab”, introductory paragraph, progress fraction, or separate Previous/Next controls.
2. **One idea per page.** Tapping an idea opens the mathematical title and the actual activity or diagram immediately. Do not require children to expand an introduction or answer a question before seeing the concept.
3. **Deep understanding remains available.** Explain formulas, symbols, exact reasoning and common mistakes in a clearly named, optional “Understand the idea” section. Never delete teaching content just to reduce visual density.
4. **One way back; one place for sequential movement.** Within an idea show only Back to concepts near the top and Previous idea / Next idea in one accessible bottom dock. Hide the parent Back to chapter control while the child Back to concepts control is present. On the final lesson, Next returns to the index. On the index, the dock is not shown.
5. **No duplicate controls or passive metrics.** Do not show progress counters, “you have learned 0/8”, redundant chapter titles, scroll directions or separate navigation bars. A subtle checkmark on a completed index item is acceptable; local-only progress remains private and not required for studying.
6. **Good on a low-cost phone.** Start the first interaction within the first viewport; targets at least 44 CSS px; portrait 320/360/393/430 px; no page-wide horizontal overflow, no math glyph clipping, and keyboard/screen-reader navigation. Offline cached content must work; no signup, premium prompt, remote analytics or autoplay.
7. **Preserve source truth.** Keep chapter sequence and exact textbook exercise numbering, bilingual math, worked exercise solutions and source anchors. Concepts may use original diagrams and simplified explanations, but must never silently replace exam content.

## Rendering and navigation states

- `index`: `data-view="index"`, `data-index-view` visible, `data-detail-view` hidden, URL `?section=concepts`; one Back to chapter
- `lesson`: `data-view="lesson"`, `data-index-view` hidden, `data-detail-view` visible, URL `?section=concepts&concept=N`; one Back to concepts plus one bottom dock; the chapter-level Back action hidden
- Browser Back and language switches preserve the intended index/lesson. A bad concept index falls back safely to the index.
- A chapter with no authored concept dataset should communicate “not available” honestly at its chapter menu; **never generate fake content or progress**.
- For specialized math engines (such as Grade 12 matrices), migrate their own navigation to this contract without degrading working diagrams, algebra, saved states or exercise links.

## Release gates

Check both languages where available, all eight Grade 9 Real Numbers stages and seven Set Language stages, direct links, back navigation, refreshed PWA cache, diagram visibility and fixed viewport sizing. Run the full curriculum, accessibility, browser and Pages release gates before merging.

**Research basis (design guidance, not a claim of student testing):** CAST UDL 3.0 recommends removing navigation/interaction barriers and clarifying symbols; the Education Endowment Foundation identifies working-memory and cognitive-load constraints as relevant to teaching. This is a product hypothesis to validate with pupils; no field study of government-school children has yet been conducted.
