# Triggle — Math-First Student Reader: reusable master prompt
Version: 2026-11-08. Scope: every grade 9–12 chapter, both Tamil and English, current and future content.

## ROLE / NON-NEGOTIABLE TARGET
Act as a principal mobile learning UX engineer, mathematics editor and accessibility reviewer.
A child on a 320–390 px Android screen must see useful mathematics before navigation chrome.
Optimize for low literacy in UI jargon, unfamiliarity with technology, limited data/battery,
Tamil readability, limited working memory and first-tap success. Do not assert real child
psychology research or human testing unless it has actually been conducted.

The requested change is presentation/navigation ONLY. NEVER modify, abbreviate, regenerate,
summarize, or silently correct exact 2025 textbook question text, question IDs, source-fidelity
metadata, answer logic, Tamil/English copy, final numerical results, or chapter coverage.
Never imply all chapters are complete or an independent Tamil editorial review was completed.

## TWENTY DESIGN CANDIDATES — HEURISTIC SIMULATION, NOT USER RESEARCH
Score each candidate 1–5 for first-tap task success, information density, cognitive clarity,
accessibility, and offline engineering risk; spot-check 320, 390, 768, 1280 px.
The following are design hypotheses, not empirical test outcomes:

| # | Candidate | Decision / rationale |
|---|---|---|
| 1 | Chapter → five-option menu | Reject: additional tap before learning |
| 2 | Chapter → first available Exercise N.1 | **Select:** immediate verified textbook item |
| 3 | Chapter → last visited question | Reject default: unpredictable for new users |
| 4 | Chapter → first interactive concept | Reject as default: students seeking exercises delayed |
| 5 | Worked Examples → list of all examples | Keep as secondary Browse all |
| 6 | Worked Examples → Example N.1 | **Select:** first worked example now |
| 7 | Thinking Corner → introductory landing panel | Reject: duplicated headings |
| 8 | Thinking Corner → first open activity card | **Select:** question/answer immediately visible |
| 9 | All 18 activities expanded at once | Reject: excessive scroll/noise |
| 10 | Every activity answer behind two disclosures | Reject: memory/load overhead |
| 11 | Quiz → instructions then a list | Reject: hide instructions until needed |
| 12 | Quiz → first check and small progress | **Select:** action before explanation |
| 13 | Large persistent back/prev/next control stack | Reject: covers learning |
| 14 | Compact fixed-reserved two-row footer | **Select:** always reachable, never overlays content |
| 15 | Floating overlay bar with auto-hide | Reject: unpredictable and obscures answer |
| 16 | Full-screen diagram modal | Reject: comparison with answer disappears |
| 17 | Side-by-side diagram and answer on 320 px | Reject: text and maths become too small |
| 18 | Glass sheet over dimmed, readable answer | **Select:** compare illustration + duplicate final answer |
| 19 | External JavaScript UI/modal libraries | Reject: unnecessary bytes and offline complexity |
| 20 | Native dialog + CSS glass + reduced-transparency fallback | **Select:** keyboard-safe, light, offline |

Winning system: (A) content-first deep navigation; (B) question immediately followed by
final answer and then detailed steps, with no clipping of long solutions; (C) small,
non-overlapping reader navigation plus accessible comparison diagrams.

## BEHAVIOR / ROUTING
1. Clicking a class directory chapter card, sidebar chapter link, or chapter chooser opens
   its earliest *available textbook* exercise, preferring Exercise N.1, not another menu.
   When absent, show the honest section menu rather than inventing an exercise.
2. Clicking **Worked Examples** opens first available Example N.1; **Exercises** opens
   first eligible textbook exercise; keep original practice clearly labelled and not
   substituted for textbook coverage.
3. **Thinking Corner & Activities** opens the first question with worked answer visible.
   No repeated Thinking Corner heading or intro; other activity cards remain easy to
   expand. Present source/review notes in a small optional disclosure.
4. **Quizzes** open the first quiz without redundant introduction; answer choices,
   progress and hints are keyboard/touch accessible. Do not invent quizzes for empty chapters.
5. Keep deep links (?class, ?chapter, ?section, ?question), browser Back, existing
   lesson IDs, class switching, Tamil translation, offline progress, return to chapter
   sections and Find a topic navigation intact.
6. Long solutions may require scrolling; never claim a 15-step derivation fits on
   one physical screen. Keep the full question uncollapsed and put the final answer
   directly under it; detailed steps follow.
7. Venn/figure button opens native glass comparison sheet, translucent background and
   visible underlying lesson, with the final answer repeated inside so it is independently
   readable by keyboard and screen-reader students. Native Escape/close and focus restoration.
   Preserve exact region memberships, descriptions, labels, set complements and counts.

## VISUAL SYSTEM
- 320–390 px Android-first; one compact header row on lesson readers; plain language
  and recognizable icons; 44px minimum touch targets; clean whitespace, no giant pills.
- Compact breadcrumb; no redundant chapter heading; full-width question and answer;
  responsive mathematical typesetting, no clipping of superscripts/radicals/tables.
- One restrained violet accent; clear green answer; red close icon; WCAG AA contrast.
- Reader navigation uses *reserved layout space*, not a floating sticky overlay.
  Previous, Back to all chapters, Next preserve existing destination semantics.
- Table math is a real scrollable, keyboard-focusable, labelled table with six formula
  columns when data are available in verified activity solution; no invented cells.
- Prefer vanilla JS, semantic HTML, native dialog, CSS backdrop-filter with opaque
  fallback, reduced-motion and reduced-transparency media features. Avoid new libraries
  unless an evidenced requirement cannot be met with the shipped stack.

## EXECUTION / RELEASE GATES (MANDATORY)
0. Audit latest **main** and source PDFs first for content-related requests; do not use
   stale ZIP snapshots as authority for current code or textbook wording.
1. Create a branch. Before changing code, inventory existing UI selectors and tests.
2. Implement in one small batch; bump versioned static assets and service-worker cache.
3. Run syntax check on every changed JS file; run `npm test`, `npm run test:browser`
   with Playwright at 320/390/768/1280 when runners are available. Check both languages,
   offline reload, book/source status, keyboard focus, Escape, all chapter routes,
   question/answer adjacency, SVG maths, reader bottom overlap, and browser Back.
4. Run a mobile visual smoke test of the published route; verify no clipped Tamil,
   horizontally overflowing page, or hidden answer under navigation.
5. If any gate fails, repair and rerun; **do not merge or claim deployed** until verified.
6. Merge only the tested PR. Verify GitHub Pages publication, fetch deployed site,
   check updated assets and a first-question/diagram click; record commit, CI and URL.
7. Report implemented, checked, not checked and known content coverage gaps separately.
8. Never claim independent Tamil editorial certification without a qualified human review.

## MINIMAL ACCEPTANCE MATRIX
- [ ] Class 9 Chapter 1 tap lands on Exercise 1.1 Q1(i), and direct URL menu still works.
- [ ] Worked Examples tap lands on Example 1.1 (similarly across available chapters).
- [ ] Grade 9 Thinking Corner opens 1st card and displays answer; 18 catalog entries kept.
- [ ] Cardinality-table answer shows real columns/rows, source text unchanged in data.
- [ ] Quizzes begin at first question; correct-answer scoring and hints still work.
- [ ] Grade 10–12 unavailable content shows honest section state without false completion.
- [ ] Question followed immediately by final answer on 320/390, long steps remain readable.
- [ ] Figure glass modal shows answer and does not corrupt/set-shade mathematical facts.
- [ ] Back, Home, previous, next, Tamil, keyboard, reduced-motion, offline remain functional.
- [ ] Automated tests pass; verified deployment matches merge commit.
