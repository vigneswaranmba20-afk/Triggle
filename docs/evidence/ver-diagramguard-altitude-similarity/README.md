# Right-triangle altitude and area similarity

The old interactive altitude diagram reported a right angle at B while the rendered angle measured 99.566°. Its labels at A and C also touched the triangle strokes in narrow layouts. The corrected drawing starts with the authored 37° angle at A and constructs the point B and perpendicular foot D from the hypotenuse. The resulting angles are 37°, 90° and 53°. The right-angle marks at B and D align with their sides and the vertex labels remain outside the construction.

The three selection states preserve the exact order △ADB ∼ △BDC ∼ △ABC. The fixture recomputes each angle, the perpendicular foot, the geometric mean relation BD² = AD × DC, and all corresponding side ratios. It uses the previous coordinates as a failing case. The four tiled-area states verify 1, 4, 9 and 16 equal-area triangles and keep keyboard focus on the selected control. The chart follows the similarity and area relationships in the Tamil Nadu 2025 textbooks, English PDF pages 169–170 and Tamil PDF pages 174–175.

## Matched browser evidence

Chromium mobile emulation at 320 CSS px with independent 200% text enlargement. Across the six matched altitude states the probe found eight old label-to-stroke contacts and zero contacts after correction. The smallest displayed label increased from 8.94 to 30 CSS px. The fixture and captures use the original 37° and 53° lesson values.

| State | Before | After |
| --- | --- | --- |
| Full triangle in English | [Before](figures/altitude-en-0-before.png) | [After](figures/altitude-en-0-after.png) |
| Left triangle in English | [Before](figures/altitude-en-1-before.png) | [After](figures/altitude-en-1-after.png) |
| Right triangle in English | [Before](figures/altitude-en-2-before.png) | [After](figures/altitude-en-2-after.png) |
| Full triangle in Tamil | [Before](figures/altitude-ta-0-before.png) | [After](figures/altitude-ta-0-after.png) |
| Left triangle in Tamil | [Before](figures/altitude-ta-1-before.png) | [After](figures/altitude-ta-1-after.png) |
| Right triangle in Tamil | [Before](figures/altitude-ta-2-before.png) | [After](figures/altitude-ta-2-after.png) |
