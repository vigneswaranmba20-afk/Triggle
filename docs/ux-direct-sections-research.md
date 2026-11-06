# Direct section navigation — review and implementation notes
**2026-11-06 · Triggle accessible student navigation improvement**

## What students found confusing

Students were clicking Concepts or Quizzes, but the UI kept all four large chapter cards above the selected section, requiring another scroll. When a quiz had not yet been developed, the interface offered unrelated Exercises instead, obscuring the fact that there was no quiz. Home appeared in the app header, chapter hub and desktop sidebar; the class listing had two ways to "change class". Reaching the exact material involved unnecessary and unpredictable navigation.

## Research-informed design principles

This is an adaptation, not a copy of another website.

- **Clear contextual Back:** GOV.UK Design System recommends a back action at the top with a destination that people can understand, and says navigation should preserve where users came from. Source: https://design-system.service.gov.uk/components/back-link/
- **Only show the selected content:** GOV.UK tabs guidance emphasizes clear labels, human-readable sections, and keeping the selected view in URL history so Browser Back works. Here a **separate section view** (not traditional tabs) suits a school child on a narrow phone better than leaving all four large cards stacked above the content. Source: https://design-system.service.gov.uk/components/tabs/
- **Clarify page location:** W3C WCAG 2.2 Understanding 2.4.8 describes techniques for indicating location using navigation labels and \`aria-current\` (AAA technique; we are not claiming full conformance). Source: https://www.w3.org/WAI/WCAG22/Understanding/location

## Route and interface contract

| Page | What appears immediately | Contextual navigation |
|---|---|---|
| Home | Four grade cards, search | One global Home in header |
| Class directory | Actual chapter cards before optional search | "All classes" |
| Chapter menu | **Concepts, Worked Examples, Exercises, Quizzes** cards (no lesson content yet) | "All chapters" |
| Selected section | Section heading and **only that section's content**; no four-card menu above it | "All chapter options" |
| Question / worked solution | Existing solution, math notation and "Understand deeply"; no new unrelated UI | "Back to Exercises/Worked Examples" if entered from that list, otherwise "Back to Chapter choices" |

The routes use existing \`?class=9&chapter=g9-ch1&section=quizzes\` deep links, work on Browser Back, and preserve existing \`?class=...&question=...\` URLs. When a section is not written, show a straightforward bilingual "coming soon" message in the named section without a "See Exercises" detour. The chapter itself is not marked completed and no nonexistent quiz is invented.

The app header is the **one consistent global Home control**. Remove the redundant Home in the chapter hub and sidebar footer. On a class directory, use "All classes" rather than another "Home" label. "All chapters" from the chapter menu returns to the current class directory. All labels also have Tamil equivalents.

On narrow phones, both the workspace and the lesson container may have scroll offsets. Reset both on a section change so tapping Quizzes or Concepts does not leave the selected content below the viewport.

## Performance, safety and availability

- Uses existing vanilla JS, semantic markup and scoped CSS; no runtime library, build chain, paid AI, remote image or subscription added.
- Existing 41 mapped chapters, 105 legacy questions, offline service worker, bilingual content, deep mathematical explanations and mathematics notation stay unchanged.
- A new offline cache revision ensures the updated Home/navigation code appears after the next visit.
- Test via GitHub Playwright in 320px/390px/1280px English and Tamil, deep links and Browser Back, sections with and without content, accurate solved examples/exercises, question back navigation, offline cache and no page-wide horizontal overflow.

## Limitations

The design is grounded in established guidance and automated tests. Actual research with children/teachers and accessible-technology testing in village classrooms is still needed. This change does not add new curriculum lessons, worked examples or quizzes; it makes the available content easier to reach.
