# Grade 9 exercise angle labels

The exercise viewer now constructs both affected triangles with the shared DiagramGuard renderer. It places each angle at its vertex and puts the equation and side measurements below their drawings. The viewer remeasures an existing figure when it opens at a new text size. The student-facing question, solution and question identifier retain their original values and route.

- Grade 9 Geometry practice uses the original Triggle angles 55° and 65°. The third vertex measures 60°. The old apex and its 60° label were outside the viewBox.
- Grade 9 Trigonometry Exercise 6.4 Question 4 uses the textbook’s hypotenuse of 10 cm and acute angle of 24°24′. The old image placed a duplicate angle label beyond the left edge. The new drawing shows both given values at one scale and retains the original rounded side measurements in the bilingual key. The source is the 2025 Tamil Nadu textbook, English PDF page 245 and Tamil PDF page 259.

## Matched browser captures

Tamil in Chromium mobile emulation at 320 CSS px with independent 200% text enlargement. The audit of the two old images found two boundary flags and six stroke contacts in these captures. The same checks found zero after correction. The regression also measures the three angles of each rendered triangle, verifies the precise angle symbols, and opens and closes the enlarged figure with a text-size change between openings.

| Figure | Before | After |
| --- | --- | --- |
| Angles of a triangle | [Before](figures/dg-c9-4-4-practice-5-before.png) | [After](figures/dg-c9-4-4-practice-5-after.png) |
| Trigonometry Exercise 6.4 Question 4 | [Before](figures/dg-c9-exercise-6-4-q4-before.png) | [After](figures/dg-c9-exercise-6-4-q4-after.png) |
