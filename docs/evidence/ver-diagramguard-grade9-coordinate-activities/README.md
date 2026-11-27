# Grade 9 coordinate activities

Six interactive concept figures now share the responsive DiagramGuard coordinate renderer used by textbook exercises. Point names sit next to their markers. Full signed coordinate pairs wrap below the graph in an English- or Tamil-labelled key. Both axes use one scale. The route to a point still shows the horizontal step before the vertical step. Marked values stay beside their axes and the quadrant labels remain in the correct quadrants. The grid yields around measured text while the mathematical axes, segments and medians remain continuous.

The coordinates and choices are original Triggle examples of the 2025 Tamil Nadu textbook methods. The comparison used the English PDF pages 191–199 and 209–223 and Tamil PDF pages 203–212 and 222–237. Sections 5.1, 5.2 and 5.4–5.7 keep their existing routes, explanations, practice links and reset behavior. The separate section 5.3 Distance Formula lab retains its existing bookmark.

## Matched browser captures

All captures use the same 320 CSS px viewport and independent 200% text setting. The captures are from Chromium mobile emulation.

| Activity | Before | After |
| --- | --- | --- |
| Mapping the plane in Tamil | [Before](figures/activity-1-ta-before.png) | [After](figures/activity-1-ta-after.png) |
| Plotting a point in English | [Before](figures/activity-2-en-before.png) | [After](figures/activity-2-en-after.png) |
| Plotting a point in Tamil | [Before](figures/activity-2-ta-before.png) | [After](figures/activity-2-ta-after.png) |
| Trisection in English | [Before](figures/activity-4-en-before.png) | [After](figures/activity-4-en-after.png) |
| Trisection in Tamil | [Before](figures/activity-4-ta-before.png) | [After](figures/activity-4-ta-after.png) |
| Section formula at the origin in Tamil | [Before](figures/activity-5-ta-before.png) | [After](figures/activity-5-ta-after.png) |
| Centroid and medians in Tamil | [Before](figures/activity-6-ta-before.png) | [After](figures/activity-6-ta-after.png) |

## Measured comparison

The matched narrow-screen sweep checked all 17 activity choices in both languages, for 34 states in each engine. At 200% text size, the minimum measured SVG label grew from 8.79 to 28 CSS px. The wider geometry fixture checks circle positions against each expected coordinate, equal scales on both axes, ordered steps, equal trisection lengths and exact median endpoints. It also checks selection, reset, accessible figure names, text size, overflow and the position of the coordinate key.

| Engine | Old label-to-label flags | Old label-to-stroke flags | Remaining flags in this comparison |
| --- | ---: | ---: | ---: |
| Chromium | 40 | 184 | 0 |
| WebKit | 36 | 144 | 0 |

Reference grid contacts are included in the old label-to-stroke totals. The old English and Tamil trisection captures show the coordinate label touching the origin name and the first endpoint touching the scale markings. The larger plot clearance is verified on both axes without masking lines. Automated boxes approximate the outlines of the rendered glyphs. No physical phone or screen reader session was used.
