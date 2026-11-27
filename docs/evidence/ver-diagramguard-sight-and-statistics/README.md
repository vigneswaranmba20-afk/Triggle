# DiagramGuard · Sight lines and statistical dot plots

The elevation lab uses the same scale for the horizontal distance, eye height and total target height. The depression lab uses the same scale for the vertical height and computed ground distance. The angle arcs meet the corresponding rays. The true-angle mode marks the two equal angles. The wall-angle mode shows the complementary vertical angle separately. The diagram key pairs each measurement with its symbol and wraps outside the drawing.

| Scenario | Original rendered angle | Revised rendered angle |
| --- | ---: | ---: |
| Elevation, 26 m away and 18 m above eye level | 30.475° | 34.695° |
| Depression, 30° preset and 30 m height | 32.531° | 30.000° |

The angle definitions and the equality of alternate interior angles follow the revised 2025 SCERT English printed pages 251 and 258 (PDF 257 and 264) and Tamil printed pages 259 and 266 (PDF 265 and 272).

The dot plots keep every data point and stack repeated values at their actual frequencies. The mean remains a dashed vertical marker at the calculated value. Its key sits below the plot. Measured tick text at 320 CSS px rose from 10.5 px to 28 px when the root text is set to 200%. Tick labels use a true minus sign. The underlying statistics follow the revised 2025 SCERT English Section 8.2, printed page 304 (PDF 310), and Tamil printed page 312 (PDF 318).

| Matched Chromium browser captures at 320 CSS px, 200% text | Before | After |
| --- | --- | --- |
| Elevation, English | [Original](figures/elevation-en-before.png) | [Exact angle and measurements](figures/elevation-en-after.png) |
| Elevation, Tamil | [Original](figures/elevation-ta-before.png) | [Exact angle and measurements](figures/elevation-ta-after.png) |
| Depression wall angle, English | [Original](figures/depression-en-before.png) | [Separate wall angle and height](figures/depression-en-after.png) |
| Dot plot with negative scale, English | [Original](figures/statistics-en-before.png) | [Clear ticks and mean legend](figures/statistics-en-after.png) |
| Dot plot with negative scale, Tamil | [Original](figures/statistics-ta-before.png) | [Clear ticks and mean legend](figures/statistics-ta-after.png) |

Run `node site/tools/test_diagramguard_browser.cjs --sight-lines` for the two sight-line labs. Run the same script with `--statistics` for the dot plot variants. Add `--webkit` for WebKit. The tests check rendered geometry and font sizes, bilingual reflow, and clearance at representative slider combinations and viewport sizes.
