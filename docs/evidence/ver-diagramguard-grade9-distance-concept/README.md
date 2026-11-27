# DiagramGuard · Grade 9 Distance Formula

The distance concept reuses the same equal-scale coordinate renderer as the chapter exercises. The reference grid preserves one-unit spacing and leaves room around glyphs. The labels A, B and C remain close to their points. The bilingual coordinate key and side lengths sit below the plot. The points remain A (1, 2), B (4, 6) and C (4, 2), with a right angle at C and lengths 3, 4 and 5.

The worked figure is a Triggle example aligned to the revised 2025 SCERT Grade 9 Section 5.3, which begins on English printed page 193 (PDF 199) and Tamil printed page 206 (PDF 212). The approved lesson and question data remain byte-for-byte intact.

Chromium and WebKit each passed 36 renderings across nine viewports, English and Tamil, and 100% and 200% text. The checks recover the coordinates from the SVG geometry, verify the exact length ratios and right angle, and measure label clearance and typography. At 320 CSS px and 200% text, the old figure logged 10 and 12 intersections in English and Tamil in Chromium and 8 and 10 in WebKit. These counts include reference-grid contacts. The revised figure has zero in those checks and measures vertex text at 30 CSS px.

| Matched Chromium captures at 320 CSS px and 200% text | Before | After |
| --- | --- | --- |
| English | [Original](figures/en-before.png) | [Measured plot](figures/en-after.png) |
| Tamil | [Original](figures/ta-before.png) | [Measured plot](figures/ta-after.png) |

Run `node site/tools/test_g9_ch5_coordinate_figures_browser.cjs --concept-only` for the concept matrix. Add `--webkit` for WebKit.
