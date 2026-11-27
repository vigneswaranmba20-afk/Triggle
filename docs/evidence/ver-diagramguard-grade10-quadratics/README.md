# Grade 10 quadratic graphs

The discriminant and quadratic-graph labs now use a single scale on both axes. The renderer clips the analytical curve to the plotting window and represents it by exact quadratic Bézier paths. The discriminant plot shows two crossings, a tangent, or no crossing as appropriate. The intersection plot marks (−1, 1) and (2, 4), follows the corresponding guides to x = −1 and x = 2, and puts the equations below the drawing. The shape options preserve the same scale and window as learners compare the four coefficients. A keyboard selection keeps focus on its control.

The original 2025 Tamil Nadu textbooks cover the nature of roots in §3.6.6 on English PDF page 123 and Tamil PDF page 125. Graphical root cases and the intersection method are covered in §3.8 on English PDF pages 136–141 and Tamil PDF pages 138–143. The lab examples, including y = x² − 4x + c and x² − x − 2 = 0, retain their authored equations and all five discriminant values.

## Matched captures

Chromium mobile emulation, 320 CSS px, independent 200% text enlargement.

| Case | Before | After |
| --- | --- | --- |
| Two roots in English | [Before](figures/graph-8-0-en-before.png) | [After](figures/graph-8-0-en-after.png) |
| Two roots in Tamil | [Before](figures/graph-8-0-ta-before.png) | [After](figures/graph-8-0-ta-after.png) |
| Double root in English | [Before](figures/graph-8-2-en-before.png) | [After](figures/graph-8-2-en-after.png) |
| Double root in Tamil | [Before](figures/graph-8-2-ta-before.png) | [After](figures/graph-8-2-ta-after.png) |
| No real roots in English | [Before](figures/graph-8-4-en-before.png) | [After](figures/graph-8-4-en-after.png) |
| No real roots in Tamil | [Before](figures/graph-8-4-ta-before.png) | [After](figures/graph-8-4-ta-after.png) |
| Coefficient and width in Tamil | [Before](figures/graph-11-1-ta-before.png) | [After](figures/graph-11-1-ta-after.png) |
| Solving by intersection in English | [Before](figures/graph-11-4-en-before.png) | [After](figures/graph-11-4-en-after.png) |
| Solving by intersection in Tamil | [Before](figures/graph-11-4-ta-before.png) | [After](figures/graph-11-4-ta-after.png) |

## Measurement

The matched collision probe exercised 20 states per engine across both languages. The old plots triggered 30 text-to-stroke contacts in Chromium and 28 in WebKit, including strokes that were hidden by the old opaque equation block. The corrected plots produced zero flags. The smallest displayed label in the comparison grew from 8.57 to 28 CSS px. For cases with axis names alone the smallest label is 30 CSS px at 200% text. The before and after counts are separate engine observations of the same educational states.

The regression checks independently recover graph coordinates from the SVG and verify the plotted polynomial at several Bézier parameter values. The roots must lie on the visible curve. For the double root the tangent slope is zero. The intersections must also lie on y = x + 2, and each projection must end on the x-axis. A visual stroke check alone misses a mathematically incorrect incidence when the discrepancy is smaller than the drawing stroke. The old sampled polyline did not include the exact vertex in the tangent state. No physical phone or screen reader session was used.
