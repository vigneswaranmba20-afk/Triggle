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

## Preview geometry

Four additional previews have rendered geometry checks in both languages at 100% and 200% text. The inclination arc starts on the positive x-axis and ends on its line. Both perpendicular previews use negative-reciprocal slopes. The intercept marks lie on the intercept-form line and on their designated axes. The 2025 SCERT sources include Figure 5.35 on English printed page 225 (PDF 231) and Tamil printed page 232 (PDF 238), and section 5.6.2 on English printed page 230 (PDF 236) and Tamil printed page 238 (PDF 244).

| Matched Tamil capture at 390 CSS px | Before | After |
| --- | --- | --- |
| Inclination | [Arc endpoint 1.118 CSS px from line](figures/preview-4-ta-before.png) | [Arc meets line](figures/preview-4-ta-after.png) |
| Parallel and perpendicular slopes | [82.278°](figures/preview-5-ta-before.png) | [90.000°](figures/preview-5-ta-after.png) |
| Intercept form | [Y-intercept marker 0.610 CSS px from line](figures/preview-9-ta-before.png) | [Both markers on the line and axes](figures/preview-9-ta-after.png) |
| Lines in general form | [82.278°](figures/preview-11-ta-before.png) | [90.000°](figures/preview-11-ta-after.png) |

The revised rendered offsets are under 0.00001 CSS px on the captured Chromium profile. Both browser engines enforce a 0.001 CSS px tolerance for the incidence checks. The four previews remain outside full typography qualification.

## Interactive boundary states

The quadrilateral lab now selects an interior diagonal after dragging. For the reproduced concave example, the two triangles along BD each have area 2.5, so their total agrees with the shoelace area of 5. Crossed polygons and repeated vertices get an invalid-state message. The textbook requires triangles with no shared area (English page 208, PDF 214, and Tamil page 214, PDF 220).

The vertical-parallel case draws two distinct vertical lines. Equal general-form equations are shown as coincident. The slope–intercept construction stays within the plot at all four slider endpoint combinations. The point–slope slider starts at exactly 0.75, and the coefficient controls retain the last valid pair when the other coefficient is zero.

| Matched Tamil capture at 390 CSS px | Before | After |
| --- | --- | --- |
| Concave quadrilateral | [Areas of 10 and 5](figures/state-3-ta-before.png) | [Both calculations give 5](figures/state-3-ta-after.png) |
| Parallel vertical lines | [Lines drawn at the same x](figures/state-5-ta-before.png) | [Separated vertical lines](figures/state-5-ta-after.png) |
| Slope construction | [Off-plot construction](figures/state-7-ta-before.png) | [Complete construction inside the plot](figures/state-7-ta-after.png) |
| Equal general-form equations | [Coincidence shown as parallel](figures/state-11-ta-before.png) | [One line with an explicit coincidence explanation](figures/state-11-ta-after.png) |
