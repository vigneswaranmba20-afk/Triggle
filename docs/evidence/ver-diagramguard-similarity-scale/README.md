# Similarity and congruence scale factor

The Grade 10 scale-factor lab now constructs both triangles from the same 6–8–10 right triangle on one drawing scale. The second set of vertices uses the selected factor `k`. The reference triangle keeps its position and size throughout slider changes. A right-angle mark identifies each corresponding right angle. Both sets of side lengths are available below the SVG in a wrapping, bilingual figure key. The displayed acute angles are rounded and marked as approximations.

The lesson follows the 2025 Tamil Nadu textbook treatment of similarity and congruence in §4.1–4.2.1. The sources are English PDF pages 167–168 and Tamil PDF pages 172–173. The 6–8–10 triangle and the slider are existing Triggle examples of the textbook definition.

## Reproduced defect

At the initial `k = 1.25`, the previous display drew the legs of ABC at 96 and 72 SVG units while labelling them 6 and 8. The corresponding legs of PQR measured 92.5 and 70 SVG units. The visible triangle shrank to about 0.97 times the size of the reference even while the lesson stated that it was 1.25 times larger. The old geometry is preserved as `similarity-scale-before.svg` so the mathematical fixture has a known failure to detect.

The corrected drawing recovers the exact selected factor from all three sides. At `k = 1`, it draws two congruent triangles. The fixture also verifies the right angle, the acute angle, stable reference geometry, the side key, and the `Home` and `End` keyboard controls. The detector found zero contacts in six matched 320 px cases before and after. The minimum SVG text grew from 8.125 to 30 CSS px at 200% text.

## Matched captures

Chromium mobile emulation, 320 CSS px, independent 200% text enlargement.

| State | Before | After | After side key |
| --- | --- | --- | --- |
| English at 1 | [Before](figures/en-k1-before.png) | [After](figures/en-k1-after.png) | [Key](figures/en-k1-after-key.png) |
| English at 1.25 | [Before](figures/en-k1.25-before.png) | [After](figures/en-k1.25-after.png) | [Key](figures/en-k1.25-after-key.png) |
| English at 1.5 | [Before](figures/en-k1.5-before.png) | [After](figures/en-k1.5-after.png) | [Key](figures/en-k1.5-after-key.png) |
| Tamil at 1 | [Before](figures/ta-k1-before.png) | [After](figures/ta-k1-after.png) | [Key](figures/ta-k1-after-key.png) |
| Tamil at 1.25 | [Before](figures/ta-k1.25-before.png) | [After](figures/ta-k1.25-after.png) | [Key](figures/ta-k1.25-after-key.png) |
| Tamil at 1.5 | [Before](figures/ta-k1.5-before.png) | [After](figures/ta-k1.5-after.png) | [Key](figures/ta-k1.5-after-key.png) |
