# VER DiagramGuard · Grade 10 Exercise 5.1

This pass covers all seven exercise figures. The coordinates were checked visually against the 2025 SCERT English edition, printed p. 212, and Tamil edition, printed pp. 218–219. The reader preserves a single Cartesian scale, every source coordinate, vertex order, all three midpoint relationships in Q8, the difference of areas in Q9 and the three named regions in Q11. Q9 follows the textbook's axes-free plan view. The three Q11 variants preserve the textbook's solid partition edges.

## Collision results

| Figure | Baseline SVG intersections flagged | Revised SVG intersections flagged |
| --- | ---: | ---: |
| Q5(i) | 10 | 0 |
| Q5(ii) | 16 | 0 |
| Q8 | 13 | 0 |
| Q9 | 23 | 0 |
| Q11(i) | 15 | 0 |
| Q11(ii) | 15 | 0 |
| Q11(iii) | 16 | 0 |
| **Total** | **108** | **0** |

The baseline and revised scans measured standalone figures at 300 CSS px in Chromium. The baseline count includes contacts with decorative reference grid lines. The matched captures show the coordinate text crossing pool edges in Q9 and coming close to the axes and partition edges in Q11. The larger site scan still flags 140 of 258 distinct legacy SVG renderings for review.

The updated [inventory](../ver-diagramguard-v1-0/inventory.csv) records the responsive SVG, standalone fallback and source for each case. The [browser regression](../../../site/tools/test_g10_ch5_coordinate_figures_browser.cjs) measures every label and coordinate key after fonts load. It verifies source coordinates, areas, point-to-label association, dialog keyboard focus and page reflow across six mobile widths, tablet, desktop and mobile landscape. It runs separately in English and Tamil at 100% and 200% text size, both inline and enlarged. The seven figures are static drawings. The checks exercise opening, closing, resizing and language changes.

## Matched captures

| Chromium, 390 × 844 CSS px, enlarged | Before | After |
| --- | --- | --- |
| Q9 · Tamil | [Pool and patio](figures/q9-ta-before.png) | [Pool and patio](figures/q9-ta-after.png) |
| Q11(iii) · English | [Area of BCEG](figures/q11-iii-en-before.png) | [Area of BCEG](figures/q11-iii-en-after.png) |

[All seven inline figures, Tamil, 320 CSS px at 200% text size](figures/ta-320-200.png)

These captures come from browser runs. Physical Android verification and screen-reader testing on devices remain outstanding. The SVG fallback uses a fixed layout for standalone viewing. The normal reader reflows its labels and key independently.
