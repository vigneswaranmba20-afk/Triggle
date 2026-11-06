# Triggle Home + chapter navigation redesign
**Design decision — 6 November 2026**

## User problem and constraints
A parent using mobile Triggle saw a nice interface but had trouble understanding why a particular chapter said "Planned" and how to reach the new mini-lessons. The top action gave **Trigonometry Basics** more prominence than Home. The site needs to be immediately readable on affordable Android devices, keep bilingual learning and a familiar layout, and avoid making pupils spend longer on screens.

## Shipped UX

- **Home is the default** when no \`class\`, \`chapter\`, or \`question\` parameter is given. Header **Home** returns here from any view, without a network reload.
- **Choose Class** cards open a full, searchable **Class 9–12 chapter directory**, not a randomly remembered example. The bottom grade dock and sidebar grade choices do the same.
- **Jump to a chapter** using a native \`select\` grouped by class, or type any of the 41 English/Tamil titles in the Home search. Only current, actually mapped chapter metadata is used.
- **Chapter page** has a native "Go directly to" dropdown. For the live Class 9 Set Language pilot, choose from seven actual mini-lessons, the live Venn lab, any existing question, or textbook references. Other chapters offer existing questions/sections/references without inventing unbuilt concepts.
- **Question page** retains existing quick vs deep solution tabs, progress, diagrams, and backward-compatible deep links. Exercise breadcrumb now lists specific questions in addition to groups.
- **Trigonometry Basics shortcut hidden** from the learning app's header/sidebar. The independent \`playground.html\` is not deleted, so old bookmarked links do not break.
- **Honest learning availability**: seven mini-lessons are shown as available, but the whole chapter is still planned and other chapters are not falsely marked as published.
- **Bilingual throughout**, with Tamil search matching Tamil titles; controls are native and keyboard-friendly.
- **No new paid APIs, framework, Python runtime, Sass build or internet dependency**: authored local JavaScript and CSS are the right technology for a fast static site with low-bandwidth learners.

## Practical discovery path

1. Home: read one clear statement of purpose and choose a class or search.
2. Class directory: choose a chapter. Only the available mini-lessons are described as live.
3. Chapter overview: use the native jump dropdown to go directly to a concept, exercise question, or source.
4. Lesson: study an explanation and solve the paper exercise without extra on-screen tasks.
5. Home: return instantly from the top shortcut. Browser Back, prior deep links and user progress remain.

## Technology strategy

Use semantic HTML, responsive CSS grid and modern browser features without requiring a build pipeline. Custom visual decoration is a small inline original SVG, not an external image or animation. Optional CSS transitions obey \`prefers-reduced-motion\`; the interface must still work without animations. A native \`select\` is preferable to introducing a large third-party dropdown library for children on low-end phones. This follows accessible navigation guidance at https://web.dev/articles/website-navigation.

The existing service worker precaches \`discovery.js\` and \`discovery.css\`, so the Home and chapter lists are available offline after initial download. The site still has no accounts, tracking, expensive image/video payloads or paid AI dependencies.

## Acceptance and regression criteria

- Default \`index.html\` opens Home; \`?class=9&chapter=g9-ch1\` and all 105 question deep links still function.
- Tamil/English labels, class pages, search and chapter jump work at 320px, 390px and 1280px without horizontal overflow.
- Existing user learning progress and deep-explanation tabs are untouched.
- Page navigation is linkable with stable URLs and supports browser back/forward.
- New Home and directory work offline after initial cache is ready.
- No Trigonometry Basics shortcut in the learning app, with the original standalone playground preserved for bookmarked links.
- Run \`npm test\` and \`npm run test:browser\` in GitHub CI before merge.

**Note:** This is a *navigation and home usability milestone*, not a claim that every textbook chapter is completed or that Triggle beats another learning platform by any measured percentage.
