# VER DiagramGuard · Grade 9 Exercise 5.1

Four exercise figures contain seven coordinate plots. The 2025 SCERT English edition, printed pp. 192–193, and Tamil edition, printed pp. 205–206, agree on the coordinates and the printed plotting order. Fig. 5.11 preserves the four labeled points and both projections per point. Q3 separates the horizontal and vertical cases. The earlier Q1–Q3 SVGs used different horizontal and vertical scales. The revised plots use one scale for both axes. Q4 shows the square, the self-crossing printed order ABCDA, and the perimeter order ABDCA in separate plots.

At larger text sizes Fig. 5.11 places the required tick values at the nearest grid edges. The projections remain continuous in meaning and the question still asks the learner to read the values. All sixteen unit tick marks and eight required values stay visible. The renderer places additional tick numbers only where it can measure sufficient clearance.

| Figure | Baseline SVG intersections flagged | Revised SVG intersections flagged |
| --- | ---: | ---: |
| Q1 | 109 | 0 |
| Q2 · Fig. 5.11 | 40 | 0 |
| Q3 | 63 | 0 |
| Q4 | 14 | 0 |
| **Total** | **226** | **0** |

Both standalone scans used Chromium at 300 CSS px. Baseline counts include contacts with the reference grid. The broader legacy scan still flags 136 distinct renderings after the two coordinate passes.

The [permanent browser tests](../../../site/tools/test_g9_ch5_coordinate_figures_browser.cjs) check the point coordinates at a single Cartesian scale, render both projections per point at the correct ticks, verify the panel-specific edges and regions, and check for intersections and reflow in both languages and both figure surfaces at 100% and 200% text size. The [inventory](../ver-diagramguard-v1-0/inventory.csv) records the four asset groups and their source references. Additional Q1 and Q2 regressions use wider fallback font metrics to check the X′ label, tick values and plot boundaries. Physical Android inspection remains outstanding.

## Matched captures

| Chromium, 390 × 844 CSS px, enlarged | Before | After |
| --- | --- | --- |
| Q1 · English | [Quadrants](figures/g9-q1-en-before.png) | [Quadrants](figures/g9-q1-en-after.png) |
| Q2 · Tamil | [Fig. 5.11](figures/g9-q2-ta-before.png) | [Fig. 5.11](figures/g9-q2-ta-after.png) |

[Fig. 5.11 in Tamil at 320 CSS px and 200% text size](figures/g9-q2-ta-320-200.png)
