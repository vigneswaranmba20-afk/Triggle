# DiagramGuard · SVG markers and wider screening

The checker measures standard local SVG arrowheads on lines and single-subpath curves. It projects the marker using its reference point, viewBox, orientation and stroke scaling, then checks the transformed fill and outline against rendered text. Marker cases outside this scope remain unmeasured. The regression includes a start arrow, an end arrow, and a curved arrow tested with and without a label contact.

The standalone scan recursively includes language-specific subdirectories. It deduplicates 271 files into 261 distinct rendered SVGs and checks the 240, 300 and 480 CSS px sizes with both font stacks at both text settings. The completed native browser matrix has 3,132 measurements per engine. All markers encountered in those SVGs were measured. The final run produced zero label–arrowhead contacts in either browser. Four labels moved in the three listed graphics without changing the plots, coordinates or arrows.

| Exercise | English and Tamil 2025 SCERT source pages (PDF) | Adjustment |
| --- | --- | --- |
| Grade 10 Relations and Functions 1.2 Q4 | 15 and 16 | Clear the positive Y-axis arrow on the first graph. |
| Grade 10 Relations and Functions 1.3 Q4 | 20 and 21 | Clear the positive x-axis arrow in Figure 1.16. |
| Grade 10 Relations and Functions 1.4 Q1 | 30 and 32 | Move P beside each of the two positive vertical-line test plots. |

| Matched Chromium figure dialog captures at 390 CSS px | Before | After |
| --- | --- | --- |
| Function graph, English | [Original x label](figures/axis-label-before.png) | [Cleared x label](figures/axis-label-after.png) |
| Vertical-line test, Tamil | [Original P labels](figures/vertical-line-test-before.png) | [Cleared P labels](figures/vertical-line-test-after.png) |

The wider scan reports review candidates. The asset checks exercise rendered SVGs with alternate font stacks, and the concept scan exercises the application at a specified viewport and root text size. The full per-figure visual qualification is separate.
