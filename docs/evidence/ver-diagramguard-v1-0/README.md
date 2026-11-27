# VER DiagramGuard v1.0

## Corrections and source checks

- Grade 10 Geometry, the three similarity previews and the criteria lab. The previews reuse one triangle and uniformly scale it. The AA lab uses 50°, 65°, 65°. SAS uses sides 4 and 6 about 50°. SSS uses 3, 4 and 5. The SSA lab draws the two intersections of a radius-5.5 arc with the 35° ray at B, with AB = 8. The selectable polygons share the givens and are non-similar. The criteria, angle summary and explanatory copy sit outside the drawing. Verified against revised 2025 Grade 10 PDF pages 169–170 EN and 174–175 TA (printed pages 163–164 and 168–169).
- Grade 10 Exercise 4.3 Q4. Both editions put Z and Y above W and X. The drawing restores that orientation, renders the 12:5 rectangle, gives both auxiliary diagonals the same midpoint and length, and puts the equation below the drawing. Q2 also uses the source's 2:1.5 leg ratio and clears the street labels in both languages. Verified against PDF pages 193 EN and 199 TA (printed pages 187 and 193).
- Grade 10 Ex3.12 Q2 and Q8. The walkway and flowerbed have uniform widths. The diagrams retain the source measurements and move the repeated width labels clear of their dimension lines. The figure sizes follow the existing worked solutions. Sources are the 2025 book, PDF pages 122–123 EN and 124–125 TA.
- Grade 9 Ex7.1 Q6. The redrawn Fig. 7.8 uses the original vertex order, lengths 34, 42, 12 and 16, and perpendicular sides at D. A retained [source crop](../../../site/assets/textbook-figures/g9-ch7-ex7-1-q6-reference.png) shows the orientation and the measurements (EN PDF p. 258, printed p. 252). The source file download was rate limited during this pass. Tamil uses the shared geometry.
- The wider concept sweep corrected clipped labels in eight scene groups. The converse-angle-bisector lab uses the exact 4:5:6 triangle and orders the 5 + 5 = 10 flat-line example correctly. The Menelaus line passes through all three marked points. The circumcircle and similar-triangle construction remain in view at their tested endpoints.
- Grade 10 trigonometry. Ex6.3 Q3–Q5 use the given sight angles. Ex6.4 Q3 reflects the cloud across the waterline. Unit Ex6 Q9 shows the two sight angles, distance, and both vertical measurements. Sources are PDF pages 267, 271, 273 EN and 275, 278, 281 TA. Work overlaps the existing figure audit [#393](https://github.com/vigneswaranmba20-afk/Triggle/pull/393) and Grade 9 correction [#388](https://github.com/vigneswaranmba20-afk/Triggle/pull/388).

## Evidence and coverage

[Inventory](inventory.csv) lists 522 registered figure groups and 22 additional asset-only groups. It groups shared assets and inline/enlarged presentations, tracks locale-specific files, and identifies generated figures, interactive stages and their curriculum sources. A stage or composite asset can contain multiple panels. It is a source inventory, with no claim that every state or panel was rendered during validation.

| Measure | Result |
| --- | ---: |
| Figures with the full bilingual responsive browser matrix | 5 |
| Additional figure groups checked as standalone SVGs | 16 |
| SVG variants in the standalone regression suite, including fallbacks | 23 |
| Figures visually inspected through the student UI | 21 |
| Archived raster figures visually inspected | 4 |
| Interactive mode configurations across viewport, locale, text size and engine | 360 |
| Known screenshot collisions reproduced and corrected | 2 of 2 |
| Legacy SVG boundary flags before → after | 10 → 0 |
| Distinct legacy SVG renderings screened | 258 |
| Legacy renderings with a collision candidate before → after | 162 → 147 |
| Raw legacy scan candidate hits before → after | 1,112 → 1,064 |
| Additional concept scenes checked for clipping in both engines | 8 |
| Exploratory concept route and locale combinations | 310 |
| Exploratory control states with a rendered SVG | 650 |
| Concept SVG instances screened | 864 |
| Concept label boundary flags before → after | 52 → 0 |
| Concept SVG instances with a collision candidate before → after | 593 → 576 |
| Figure groups with geometry or proportionality corrections | 16 |
| Registered groups outside the full responsive matrix | 517 |

The browser matrix covers 320, 360, 375, 390, 412, 430, 768 and 1280 CSS px plus 667 × 375 landscape, in Chromium and WebKit. It checks EN and TA independently at 100% and 200% root text size, including the rectangle in both presentations, all five criteria states, an SSA round trip, and live viewport resizing. Tests measure displayed font size and triangle geometry from rendered SVG data. The standalone suite measures both locale variants where present at 240, 300 and 480 CSS px. The concept sweep explored defaults, tabs and slider endpoints at 390 CSS px. Its flags need review before application-wide collision totals can be established. It does not certify legacy image text enlargement.

Matched before/after browser captures were made at 390 × 844 using Chromium's Android-sized Pixel 7 profile. They are browser emulation evidence.

| Fixture | English | Tamil |
| --- | --- | --- |
| Similarity preview | [Before](screenshots/before/similarity-preview-en.webp) · [After](screenshots/after/similarity-preview-en.webp) | [Before](screenshots/before/similarity-preview-ta.webp) · [After](screenshots/after/similarity-preview-ta.webp) |
| Similarity AA | [Before](screenshots/before/similarity-aa-en.webp) · [After](screenshots/after/similarity-aa-en.webp) | [Before](screenshots/before/similarity-aa-ta.webp) · [After](screenshots/after/similarity-aa-ta.webp) |
| Similarity SAS | [Before](screenshots/before/similarity-sas-en.webp) · [After](screenshots/after/similarity-sas-en.webp) | [Before](screenshots/before/similarity-sas-ta.webp) · [After](screenshots/after/similarity-sas-ta.webp) |
| Similarity SSS | [Before](screenshots/before/similarity-sss-en.webp) · [After](screenshots/after/similarity-sss-en.webp) | [Before](screenshots/before/similarity-sss-ta.webp) · [After](screenshots/after/similarity-sss-ta.webp) |
| Similarity SSA | [Before](screenshots/before/similarity-ssa-en.webp) · [After](screenshots/after/similarity-ssa-en.webp) | [Before](screenshots/before/similarity-ssa-ta.webp) · [After](screenshots/after/similarity-ssa-ta.webp) |
| Rectangle inline | [Before](screenshots/before/rectangle-inline-en.webp) · [After](screenshots/after/rectangle-inline-en.webp) | [Before](screenshots/before/rectangle-inline-ta.webp) · [After](screenshots/after/rectangle-inline-ta.webp) |
| Rectangle enlarged | [Before](screenshots/before/rectangle-enlarged-en.webp) · [After](screenshots/after/rectangle-enlarged-en.webp) | [Before](screenshots/before/rectangle-enlarged-ta.webp) · [After](screenshots/after/rectangle-enlarged-ta.webp) |

## Qualified figures scorecard

The scores are for the five full-matrix fixtures only. Mathematical invariants, collisions, label sizes, viewport overflow and focus checks inform the ratings. Aesthetics remains a visual judgment.

| Category | Weight | Before | After |
| --- | ---: | ---: | ---: |
| Mathematical accuracy | 25% | 5.0 | 10.0 |
| Label placement | 25% | 4.5 | 10.0 |
| Typography and readability | 15% | 5.0 | 9.5 |
| Responsive behavior | 15% | 5.0 | 9.5 |
| Aesthetics | 10% | 6.0 | 9.0 |
| Interactive stability | 5% | 6.0 | 9.0 |
| Accessibility | 5% | 6.0 | 8.5 |
| **Weighted result** | | **5.1** | **9.6** |

## Running checks

`node site/tools/test_diagramguard_browser.cjs` runs Chromium. Add `--webkit` for WebKit. Both are registered in the existing browser regression lanes. `node site/tools/build_diagramguard_inventory.cjs` regenerates the CSV. `node site/tools/audit_diagramguard_assets.cjs` prints a JSON review queue for the legacy SVG files. Run `node site/tools/audit_diagramguard_concepts.cjs` for the exploratory concept scan. The current [legacy review queue](legacy-review-queue.json) records the exact labels and shapes flagged by that scan.

DiagramGuard uses rendered text bounding boxes, transforms them into screen coordinates, checks exact line and polygon segments, and samples curved paths. The fixtures include cases that overlapping rectangles alone would misclassify, plus a disjoint SVG subpath and an explicitly intentional overlap. The qualified figures had zero unintended collisions in the executed checks. Legacy flags include conservative bounding boxes, dashed segments, and unresolved intent. Generic SVG marker instances were unmeasured in 28 archived renderings. Explicitly drawn arrowheads and declared shaded or plotting regions can be checked. Raster candidates require visual review. Canvas has text-metric support. The registered student figure renderers examined use SVG or HTML. The wider application still needs per-figure review before a site-wide score or a zero-collision claim.
