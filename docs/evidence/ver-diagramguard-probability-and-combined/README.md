# DiagramGuard · Probability and combined sight lines

The two-set Venn lab computes the intersection points of its circles and uses those points for every shaded region. The numbers remain in the correct sets. Selecting an event changes the highlighted regions and the probability without moving the labels. The lesson order, choices and worked solutions are preserved. The source is 2025 SCERT Grade 10, English Fig. 8.6 on printed page 323 (PDF 329) and Tamil Fig. 8.9 on printed page 337 (PDF 343).

At 320 CSS px and 200% Tamil text, the previous layout let the chart's parent grow to 433 px inside a 262 px lab. The figure's viewBox still contained all its labels. The repaired layout constrains the chart and selection control to the lab width. DiagramGuard also reports horizontal clipping by CSS ancestors. A fixture distinguishes that layout failure from a text label outside the viewBox.

| Original rendered rays for the 60°/30° setting | Before | After |
| --- | ---: | ---: |
| Deck to hill, elevation and depression | 27.646° and 17.819° | 60° and 30° |
| Two boats on the same side | 55.008° and 30.466° | 60° and 30° |
| Two ships on opposite sides | 47.750° and 47.750° | 60° and 30° |

The combined-height scenes share a scale across the triangles and preserve the angle values and formulas. The label key wraps below the drawing. The same-side mode keeps the steeper ray tied to the nearer boat and reflects any valid angle adjustment in the controls. The sight-line construction follows 2025 SCERT Grade 10 Fig. 6.27, English printed page 262 (PDF 268) and Tamil printed page 270 (PDF 276).

| Matched Chromium views at 320 CSS px and 200% text | Before | After |
| --- | --- | --- |
| Event intersection, English | [Original](figures/venn-en-before.png) | [Clear labels](figures/venn-en-after.png) |
| Event intersection, Tamil | [Original](figures/venn-ta-before.png) | [Complete diagram](figures/venn-ta-after.png) |
| Deck to hill, Tamil | [Original](figures/sight-0-before.png) | [Exact rays](figures/sight-0-after.png) |
| Boats on the same side, Tamil | [Original](figures/sight-1-before.png) | [Exact rays](figures/sight-1-after.png) |
| Ships on opposite sides, Tamil | [Original](figures/sight-2-before.png) | [Exact rays](figures/sight-2-after.png) |

The DiagramGuard browser suite offers `--venn` and `--combined-sight` for the full matrices. The checks compare plotted points and angles, verify all event selections, and measure label clearance and reflow.
