# Exercise and viewer audit

The inventory-led browser sweep opened 316 active questions in English and Tamil at 320 CSS px and independent 200% text. Each engine reached 632 question routes, 632 enlarged viewers and 486 inline figures. It inspected 304 generated or inline SVG instances and checked the decoding and displayed bounds of 836 externally embedded images. Each pass completed without page errors or image decode errors. The sweep did not exercise all the modes within each interactive construction. It also left 22 older example identifiers outside the active question list used by this route test.

| Measurement | Chromium before | Chromium after | WebKit before | WebKit after |
| --- | ---: | ---: | ---: | ---: |
| SVG instances with any flagged label contact | 44 | 40 | 40 | 36 |
| Label boundary flags | 4 | 0 | 4 | 0 |
| Horizontal clipping in the surrounding UI | 0 | 0 | 0 | 0 |

The four boundary observations in each engine represent two Grade 9 figures tested in both languages. One figure omitted the 60° apex from the drawing and the other cut a duplicate 24°24′ label at the edge. The remaining raw contacts require individual review. Some are reference-grid contacts or intended connections. [Matched captures and invariant checks](../ver-diagramguard-grade9-exercise-angles/README.md)

A separate manual inspection covered the three Grade 10 Relations PNGs and the Grade 9 Mensuration Exercise 7.1 Q6 reference crop. The textbook crops contain their original page marks, including cropped margin content. The reader chooses the SVG replacements. In Chromium and WebKit, 64 inline and enlarged renderings per engine decoded successfully for these four placements across both languages, 320 and 430 CSS px, and 100% and 200% text. This verified the active drawing method and image bounds. The SVG asset audit measures the labels within those files separately.

Run `node site/tools/audit_diagramguard_exercises.cjs` on the authoring site. Add `--webkit` for the second engine. Set `TRIGGLE_DIAGRAMGUARD_WIDTH` or `TRIGGLE_DIAGRAMGUARD_TEXT_PERCENT` to repeat the audit at another size. The JSON identifies each route, surfaces, candidate contacts and unmatched identifiers.
