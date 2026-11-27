# DiagramGuard · Grade 10 inclination lab labels

The inclination lab uses the equal axis scale and preserves the original presets, plotted points and calculations. Short names in the drawing use measured 15 CSS px labels at normal text size. The bilingual coordinate key and the grid scale use 14 CSS px and move with the surrounding text. Both double at 200%. Every grid interval represents one unit. The axes and geometric lines stay whole. The reference grid leaves clearance around letters.

The permanent angle regression also checks label collisions and the measured font sizes in both languages. The extended matrix checks the initial state, four presets, and four intermediate stops while dragging each of the two points at nine viewport sizes. It includes a landscape-to-portrait reflow with the plotted points retained.

| Matched Chromium captures at 390 CSS px | Before | After |
| --- | --- | --- |
| English, 100% | [Old lab](figures/inclination-en-100-before.png) | [Measured labels](figures/inclination-en-100-after.png) |
| English, 200% | [Old lab](figures/inclination-en-200-before.png) | [Measured labels](figures/inclination-en-200-after.png) |
| Tamil, 100% | [Old lab](figures/inclination-ta-100-before.png) | [Measured labels](figures/inclination-ta-100-after.png) |
| Tamil, 200% | [Old lab](figures/inclination-ta-200-before.png) | [Measured labels](figures/inclination-ta-200-after.png) |

Run `node site/tools/test_g10_ch5_concepts_browser.cjs --label-matrix` for the extended Chromium matrix. Add `--webkit` for WebKit.

The first matrix covers the inclination lab. Placement and verification for five other labs are recorded below.

The same placement also covers the distance, midpoint, section and centroid lab, both views of triangle area, the horizontal and vertical lines lab, both point–slope modes, and the intercept lab. Coordinates and localized scale notes are placed below the SVG. Approximated coordinates are marked with ≈. The two axes have padding for their labels and points at the ends. The shaded intercept triangle participates in the collision checks.

| Permanent matrix | States per browser |
| --- | ---: |
| Inclination presets, two corner drags and orientation change | 469 |
| Parallel axes, point–slope and intercept modes | 1,332 |
| Distance, section and area presets, ratios and drag checkpoints | 720 |
| **Total, nine viewports and both languages at 100% and 200% text** | **2,521** |

Chromium and WebKit passed each matrix. Run the last two groups with the same browser test script and the options `--coordinate-label-matrix` and `--area-label-matrix`.

All 12 overview plots and 12 interactive coordinate labs now use the same axes and measured typography. The remaining interactive cases include the collinear and concave examples, slope relationships, the (y=mx+c) offsets, general line equations and the line-family slider. The browser test measures the rendered SVG labels and the displayed key. Run `node site/tools/test_g10_ch5_concepts_browser.cjs --catalog-label-matrix` for the 2,196 rendered checks at both text sizes and in both languages. Add `--webkit` for WebKit.
