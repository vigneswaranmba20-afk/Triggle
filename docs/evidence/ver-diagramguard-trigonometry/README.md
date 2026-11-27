# DiagramGuard · Angle bisectors, exact trigonometry and mobile reflow

| Figure | Original browser measurement | Revised browser measurement |
| --- | --- | --- |
| Angle Bisector Theorem and converse previews | AB/AC ≈ 0.717157 while BD/DC = 0.84 | Both ratios ≈ 0.717157, and the two angles at A are equal |
| 30°, 45° and 60° preset triangles | 29.932°, 42.709° and 56.768° | 30°, 45° and 60°, with exact right angles and side ratios |
| Square-area illustration of sin²θ + cos²θ = 1 | At 45°, the two regions were about 84.85 × 44.12 and 67.88 × 84.85 in SVG units | Each region is a square attached to its corresponding leg, with normalized areas adding to one |
| Standard-angle endpoints | Long Tamil notes crossed the SVG boundary at 320 CSS px | Notes wrap below the drawing at both text settings, including 200% |

The angle-bisector and converse relationships follow the 2025 revised SCERT English printed pages 174–175 (PDF 180–181) and Tamil printed pages 180–181 (PDF 186–187). Standard ratios and the first identity follow English printed pages 241–242 (PDF 247–248) and Tamil printed pages 249–250 (PDF 255–256).

An exploratory 320 CSS px sweep at 200% text sampled 976 SVG instances in 718 interactive states across both grades and languages per engine. The label-boundary flags fell from 28 to zero in Chromium and from two to zero in WebKit. The broader scan still produced 642 Chromium and 610 WebKit figure instances with other candidates for review.

| Matching Chromium captions and figures at 320 CSS px, 200% text | Before | After |
| --- | --- | --- |
| Angle-bisector preview, Tamil | [Old ratio](figures/bisector-before.png) | [Exact construction](figures/bisector-after.png) |
| 45° triangle, English | [42.709° drawing](figures/angle-45-before.png) | [Exact 45° drawing](figures/angle-45-after.png) |
| 60° triangle, Tamil | [56.768° drawing](figures/angle-60-before.png) | [Exact 60° drawing](figures/angle-60-after.png) |
| 90° endpoint, Tamil | [Clipped note](figures/angle-90-before.png) | [Wrapped explanation](figures/angle-90-after.png) |
| Square areas at 45°, English | [Rectangular regions](figures/square-areas-before.png) | [Squares on both legs](figures/square-areas-after.png) |

Run `node site/tools/test_diagramguard_browser.cjs --angles-and-squares` for the 540-case matrix. Add `--webkit` for WebKit. The assertions compare the rendered geometry, check label clearance and mobile reflow, measure the displayed text of the HTML annotations and exercise six slider positions.
