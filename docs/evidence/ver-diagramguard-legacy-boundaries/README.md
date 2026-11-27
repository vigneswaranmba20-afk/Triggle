# DiagramGuard · SVG boundary checks

| Figure | 2025 revised SCERT source | Correction |
| --- | --- | --- |
| Grade 9 Geometry Ex4.2 Q8 | English PDF 164, printed 158. Tamil PDF 175, printed 169. Both identify Figure 4.39. | The source gives angles A = 64° and B = 58°. The previous drawing rendered A as 58.560° and BOC as 116.282°. The revised triangle has angles 64°, 58° and 58°. The angle-bisector conditions give ACO = 29° and BOC = 122°. The angles and drawn bisectors are checked independently. |
| Grade 9 Coordinate Geometry Ex5.1 Q2 and Q3 | English PDFs 198–199 and Tamil PDFs 211–212. | The two generated fallback SVG frames gain 10 and 9 drawing units below their plotted labels. The point coordinates and angular relationships are preserved. |
| Grade 10 Relations and Functions Ex1.4 Q2 | English PDF 31, printed 25. Tamil PDF 32, printed 26. | The visible heading keeps the equation and the accessible description identifies all three illustrated representations. The plotted pairs and codomain are preserved. |
| Grade 10 Geometry Ex4.1 Q3 | English PDF 176, printed 170. Tamil PDF 181, printed 175. | The Tamil annotation is centered over the parallel rays with enough width for both lines. |

Chromium and WebKit each passed 60 standalone boundary configurations, covering two locale font stacks, 100% and 200% text styles, and 240, 300 and 480 CSS px. The Grade 9 bisector figure also passed full label clearance and its geometric invariant checks at each profile. The checks for the other four SVGs cover the identified boundary defects.

| Matching WebKit figure dialog captures at 390 CSS px | Before | After |
| --- | --- | --- |
| Bisectors, English | [Legacy drawing](figures/bisectors-en-before.png) | [Exact geometry](figures/bisectors-en-after.png) |
| Bisectors, Tamil | [Legacy drawing](figures/bisectors-ta-before.png) | [Exact geometry](figures/bisectors-ta-after.png) |
| Function diagram, Tamil | [Original heading](figures/function-ta-before.png) | [Equation heading](figures/function-ta-after.png) |
| Sun rays, Tamil | [Original annotation](figures/sun-rays-ta-before.png) | [Centered annotation](figures/sun-rays-ta-after.png) |

The wider standalone scan tested 261 distinct SVGs in 3,132 configurations per engine. After this change, boundary flags fell from four to zero in Chromium and from 46 to zero in WebKit. Other collision candidates remain in the review queue.
