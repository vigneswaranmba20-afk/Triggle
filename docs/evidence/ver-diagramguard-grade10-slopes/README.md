# DiagramGuard · Grade 10 Exercise 5.2

These five plots use a single scale for both axes and DiagramGuard label placement. The textbook questions, published answers, and identifiers are preserved. The figures are original Triggle drawings checked against both 2025 revised SCERT books.

| Question | English printed / PDF page | Tamil printed / PDF page | Geometry checked | Standalone scan candidates before → after |
| --- | --- | --- | --- | ---: |
| Q9(i) | 220 / 226 | 227 / 233 | Right angle at A | 5 → 0 |
| Q9(ii) | 220 / 226 | 227 / 233 | Right angle at N | 8 → 0 |
| Q10 | 221 / 227 | 228 / 234 | Opposite sides are parallel, with the given fractional coordinates | 9 → 0 |
| Q12 | 221 / 227 | 228 / 234 | Solid convex ABDC and dashed sides of the printed order ABCD, crossing at the independently calculated point | 12 → 0 |
| Q13 | 221 / 227 | 228 / 234 | Four side midpoints and their parallelogram | 16 → 0 |

The scan found 50 candidates in the old SVGs, including contacts with reference grid lines. The responsive fixtures check English and Tamil independently at 100% and 200% text size, including 320 CSS px reflow, landscape, and tablet and desktop widths. Q12 stays in the figure viewer and keeps the explanation of the printed order nearby. Its dashed crossing is marked without placing a coordinate string over construction lines.

| Matched browser captures at 390 CSS px | Before | After |
| --- | --- | --- |
| Q9(i) · English | [Old triangle](figures/q9-i-en-before.png) | [Right-angle marker at A](figures/q9-i-en-after.png) |
| Q12 · Tamil | [Old trapezium](figures/q12-ta-before.png) | [Convex boundary and crossing](figures/q12-ta-after.png) |
| Q13 · Tamil | [Old midpoint plot](figures/q13-ta-before.png) | [Midpoint parallelogram](figures/q13-ta-after.png) |

[Diagram inventory](../ver-diagramguard-v1-0/inventory.csv) · [Browser regression](../../../site/tools/test_g10_ch5_coordinate_figures_browser.cjs)

## Interactive coordinate scale

The 2025 textbook defines inclination from the positive x-axis and illustrates perpendicular lines in Figure 5.22. Reviewed English printed pages 212 and 216 (PDF 218 and 222) and Tamil printed pages 219 and 223 (PDF 225 and 229).

The twelve labs and their previews now use the same number of CSS pixels per unit on both axes. The coordinate transform used for dragging reads the rendered SVG matrix. The browser test measures all four inclination presets and the parallel and perpendicular modes before and after a drag. It also checks equal grid spacing on both axes in the other labs.

| Tamil browser fixture at 390 CSS px | Original | Equal axis scale |
| --- | ---: | ---: |
| 45° inclination | [37.959°](figures/concept-angle-4-before.png) | [45.000°](figures/concept-angle-4-after.png) |
| Perpendicular lines | [76.963°](figures/concept-angle-5-before.png) | [90.000°](figures/concept-angle-5-after.png) |

A separate Chromium sweep found equal grid scales in all 196 sampled states of the revised plots, including 32 pointer drags. Label-boundary contacts fell from eight to zero. The raw label-overlap candidates fell from 80 to 72 and remain under review. Collision-free qualification in this batch covers the Exercise 5.2 figures above.
