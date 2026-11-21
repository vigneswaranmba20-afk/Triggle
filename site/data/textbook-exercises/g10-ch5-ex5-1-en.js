/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Exercise 5.1 (Q1–Q11, 18 subparts).
 * English and Tamil prompts and appendix keys checked against rendered 2025 PDF pages:
 *   EN PDF pp. 217–218 (printed pp. 211–212), Answer Appendix PDF p. 346 (printed p. 340)
 *   TA PDF pp. 224–225 (printed pp. 218–219), Answer Appendix PDF pp. 360–361 (printed pp. 354–355)
 * Solutions are English-first; Tamil lesson translation review remains pending.
 * Coordinate diagrams in site/assets/grade10-ch5/ are original vector SVG drawings.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-ex5-1-q1-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area of a Triangle", "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q1(i)", "ta": "பயிற்சி 5.1 · வினா 1(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Area of triangle with vertices (1, −1), (−4, 6), (−3, −5)" },
    "q": {
      "en": "1. Find the area of the triangle formed by the points\n(i) (1, −1), (−4, 6) and (−3, −5)",
      "ta": "1. கீழ்க்காணும் புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க.\n(i) (1, −1), (−4, 6) மற்றும் (−3, −5)"
    },
    "questionMath": {
      "en": ["1. Find the area of the triangle formed by the points\n(i) ", { "latex": "(1,-1),\\; (-4,6)\\text{ and }(-3,-5)", "fallback": "(1, −1), (−4, 6) and (−3, −5)", "display": false }],
      "ta": ["1. கீழ்க்காணும் புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க.\n(i) ", { "latex": "(1,-1),\\; (-4,6)\\text{ மற்றும் }(-3,-5)", "fallback": "(1, −1), (−4, 6) மற்றும் (−3, −5)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use the coordinate area formula A = (1/2) |(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)| after writing the three vertices in counterclockwise order so the signed result is positive.",
        "eq": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right|", "fallback": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|", "display": true }
      },
      {
        "en": "Understand Deeply — Vertex order: On a coordinate grid, (1, −1) sits at bottom-right, (−4, 6) at top-left, and (−3, −5) at bottom-left. Moving counterclockwise from (1, −1) visits (−4, 6) next and then (−3, −5), which matches the given order. Label each coordinate pair (xᵢ, yᵢ).",
        "eq": "(x₁, y₁) = (1, −1), (x₂, y₂) = (−4, 6), (x₃, y₃) = (−3, −5)",
        "math": { "latex": "(x_1,y_1)=(1,-1),\\quad (x_2,y_2)=(-4,6),\\quad (x_3,y_3)=(-3,-5)", "fallback": "(x₁, y₁) = (1, −1), (x₂, y₂) = (−4, 6), (x₃, y₃) = (−3, −5)", "display": true }
      },
      {
        "en": "Compute the first group of cross-products (downward diagonals: x₁y₂, x₂y₃, x₃y₁) and the second group (upward diagonals: y₁x₂, y₂x₃, y₃x₁), keeping careful track of minus signs when two negatives multiply to a positive.",
        "eq": "S₁ = (1)(6) + (−4)(−5) + (−3)(−1) = 6 + 20 + 3 = 29; S₂ = (−1)(−4) + (6)(−3) + (−5)(1) = 4 − 18 − 5 = −19",
        "math": { "latex": "\\begin{aligned}S_1&=(1)(6)+(-4)(-5)+(-3)(-1)=6+20+3=29\\\\ S_2&=(-1)(-4)+(6)(-3)+(-5)(1)=4-18-5=-19\\end{aligned}", "fallback": "S₁ = (1)(6) + (−4)(−5) + (−3)(−1) = 6 + 20 + 3 = 29; S₂ = (−1)(−4) + (6)(−3) + (−5)(1) = 4 − 18 − 5 = −19", "display": true }
      },
      {
        "en": "Subtract the upward sum S₂ from the downward sum S₁. Notice subtracting −19 is the same as adding +19. Finally divide by 2; because area measures surface size, it carries square units (sq. units).",
        "eq": "Area = (1/2)|29 − (−19)| = (1/2)(48) = 24 sq. units",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|29-(-19)\\right|=\\dfrac{1}{2}(48)=24\\text{ sq. units}", "fallback": "Area = (1/2)|29 − (−19)| = (1/2)(48) = 24 sq. units", "display": true }
      }
    ],
    "answer": "24 sq. units",
    "answerMath": { "latex": "24\\text{ sq. units}", "fallback": "24 sq. units", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q1(i). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q1-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area of a Triangle", "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q1(ii)", "ta": "பயிற்சி 5.1 · வினா 1(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Area of triangle with vertices (−10, −4), (−8, −1), (−3, −5)" },
    "q": {
      "en": "1. Find the area of the triangle formed by the points\n(ii) (−10, −4), (−8, −1) and (−3, −5)",
      "ta": "1. கீழ்க்காணும் புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க.\n(ii) (−10, −4), (−8, −1) மற்றும் (−3, −5)"
    },
    "questionMath": {
      "en": ["1. Find the area of the triangle formed by the points\n(ii) ", { "latex": "(-10,-4),\\; (-8,-1)\\text{ and }(-3,-5)", "fallback": "(−10, −4), (−8, −1) and (−3, −5)", "display": false }],
      "ta": ["1. கீழ்க்காணும் புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க.\n(ii) ", { "latex": "(-10,-4),\\; (-8,-1)\\text{ மற்றும் }(-3,-5)", "fallback": "(−10, −4), (−8, −1) மற்றும் (−3, −5)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the shoelace triangle area formula A = (1/2) |(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|; the absolute-value bars ensure a positive area regardless of whether the vertices go clockwise or counterclockwise.",
        "eq": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right|", "fallback": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|", "display": true }
      },
      {
        "en": "Understand Deeply — Counterclockwise order: Plotting the three Quadrant-III points puts (−10, −4) on the left, (−3, −5) on the right-bottom, and (−8, −1) at the top. Going counterclockwise uses (−10, −4) -> (−3, −5) -> (−8, −1), though taking absolute value at the end gives the identical magnitude.",
        "eq": "(x₁, y₁) = (−10, −4), (x₂, y₂) = (−3, −5), (x₃, y₃) = (−8, −1)",
        "math": { "latex": "(x_1,y_1)=(-10,-4),\\quad (x_2,y_2)=(-3,-5),\\quad (x_3,y_3)=(-8,-1)", "fallback": "(x₁, y₁) = (−10, −4), (x₂, y₂) = (−3, −5), (x₃, y₃) = (−8, −1)", "display": true }
      },
      {
        "en": "Multiply the downward pairs and upward pairs separately. Every coordinate here is negative, so every product of two negative numbers becomes positive.",
        "eq": "S₁ = (−10)(−5) + (−3)(−1) + (−8)(−4) = 50 + 3 + 32 = 85; S₂ = (−4)(−3) + (−5)(−8) + (−1)(−10) = 12 + 40 + 10 = 62",
        "math": { "latex": "\\begin{aligned}S_1&=(-10)(-5)+(-3)(-1)+(-8)(-4)=50+3+32=85\\\\ S_2&=(-4)(-3)+(-5)(-8)+(-1)(-10)=12+40+10=62\\end{aligned}", "fallback": "S₁ = (−10)(−5) + (−3)(−1) + (−8)(−4) = 50 + 3 + 32 = 85; S₂ = (−4)(−3) + (−5)(−8) + (−1)(−10) = 12 + 40 + 10 = 62", "display": true }
      },
      {
        "en": "Subtract S₂ from S₁ and divide by 2. Notice 23/2 is an exact half-integer equal to 11.5.",
        "eq": "Area = (1/2)|85 − 62| = 23/2 = 11.5 sq. units",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}|85-62|=\\dfrac{23}{2}=11.5\\text{ sq. units}", "fallback": "Area = (1/2)|85 − 62| = 23/2 = 11.5 sq. units", "display": true }
      }
    ],
    "answer": "11.5 sq. units",
    "answerMath": { "latex": "11.5\\text{ sq. units}", "fallback": "11.5 sq. units", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q1(ii). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q2-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Collinear Points", "ta": "ஆயத்தொலை வடிவியல் — ஒரு கோடமைப் புள்ளிகள்" },
    "label": { "en": "Exercise 5.1 · Q2(i)", "ta": "பயிற்சி 5.1 · வினா 2(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Check collinearity of (−1/2, 3), (−5, 6), (−8, 8)" },
    "q": {
      "en": "2. Determine whether the sets of points are collinear?\n(i) (−1/2, 3), (−5, 6) and (−8, 8)",
      "ta": "2. கீழ்க்காணும் புள்ளிகள் ஒரே நேர்க்கோட்டில் அமையுமா எனத் தீர்மானிக்கவும்.\n(i) (−1/2, 3), (−5, 6) மற்றும் (−8, 8)"
    },
    "questionMath": {
      "en": ["2. Determine whether the sets of points are collinear?\n(i) ", { "latex": "\\left(-\\dfrac{1}{2},3\\right),\\; (-5,6)\\text{ and }(-8,8)", "fallback": "(−1/2, 3), (−5, 6) and (−8, 8)", "display": false }],
      "ta": ["2. கீழ்க்காணும் புள்ளிகள் ஒரே நேர்க்கோட்டில் அமையுமா எனத் தீர்மானிக்கவும்.\n(i) ", { "latex": "\\left(-\\dfrac{1}{2},3\\right),\\; (-5,6)\\text{ மற்றும் }(-8,8)", "fallback": "(−1/2, 3), (−5, 6) மற்றும் (−8, 8)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Three points are collinear (all lie on the same straight line) if and only if the triangle they form has area 0. Evaluate the coordinate area formula and test whether the value equals 0.",
        "eq": "Collinear when (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)| = 0",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right|=0", "fallback": "Collinear when (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)| = 0", "display": true }
      },
      {
        "en": "Understand Deeply — Meaning of collinear: 'Co-' means together and 'linear' means line. If three points lie on a single line, the triangle collapses flat so its enclosed area shrinks to 0. Assign coordinates with x₁ = −1/2.",
        "eq": "(x₁, y₁) = (−1/2, 3), (x₂, y₂) = (−5, 6), (x₃, y₃) = (−8, 8)",
        "math": { "latex": "(x_1,y_1)=\\left(-\\dfrac{1}{2},3\\right),\\quad (x_2,y_2)=(-5,6),\\quad (x_3,y_3)=(-8,8)", "fallback": "(x₁, y₁) = (−1/2, 3), (x₂, y₂) = (−5, 6), (x₃, y₃) = (−8, 8)", "display": true }
      },
      {
        "en": "Compute the downward products S₁ and upward products S₂ carefully. When multiplying −1/2 by 6, simplify 6/2 = 3; when multiplying 8 by −1/2, simplify 8/2 = 4.",
        "eq": "S₁ = (−1/2)(6) + (−5)(8) + (−8)(3) = −3 − 40 − 24 = −67; S₂ = (3)(−5) + (6)(−8) + (8)(−1/2) = −15 − 48 − 4 = −67",
        "math": { "latex": "\\begin{aligned}S_1&=\\left(-\\dfrac{1}{2}\\right)(6)+(-5)(8)+(-8)(3)=-3-40-24=-67\\\\ S_2&=(3)(-5)+(6)(-8)+(8)\\left(-\\dfrac{1}{2}\\right)=-15-48-4=-67\\end{aligned}", "fallback": "S₁ = (−1/2)(6) + (−5)(8) + (−8)(3) = −3 − 40 − 24 = −67; S₂ = (3)(−5) + (6)(−8) + (8)(−1/2) = −15 − 48 − 4 = −67", "display": true }
      },
      {
        "en": "Both sums equal −67, so their difference is 0 and the area of the triangle is 0. Therefore the three points lie on one straight line.",
        "eq": "Area = (1/2)|−67 − (−67)| = (1/2)(0) = 0",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}|-67-(-67)|=0\\quad\\text{(collinear)}", "fallback": "Area = (1/2)|−67 − (−67)| = (1/2)(0) = 0", "display": true }
      }
    ],
    "answer": "The given points are collinear",
    "answerMath": { "latex": "\\text{The given points are collinear}", "fallback": "The given points are collinear", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q2(i). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q2-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Collinear Points", "ta": "ஆயத்தொலை வடிவியல் — ஒரு கோடமைப் புள்ளிகள்" },
    "label": { "en": "Exercise 5.1 · Q2(ii)", "ta": "பயிற்சி 5.1 · வினா 2(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Check collinearity of (a, b+c), (b, c+a), (c, a+b)" },
    "q": {
      "en": "2. Determine whether the sets of points are collinear?\n(ii) (a, b+c), (b, c+a) and (c, a+b)",
      "ta": "2. கீழ்க்காணும் புள்ளிகள் ஒரே நேர்க்கோட்டில் அமையுமா எனத் தீர்மானிக்கவும்.\n(ii) (a, b+c), (b, c+a) மற்றும் (c, a+b)"
    },
    "questionMath": {
      "en": ["2. Determine whether the sets of points are collinear?\n(ii) ", { "latex": "(a,b+c),\\; (b,c+a)\\text{ and }(c,a+b)", "fallback": "(a, b+c), (b, c+a) and (c, a+b)", "display": false }],
      "ta": ["2. கீழ்க்காணும் புள்ளிகள் ஒரே நேர்க்கோட்டில் அமையுமா எனத் தீர்மானிக்கவும்.\n(ii) ", { "latex": "(a,b+c),\\; (b,c+a)\\text{ மற்றும் }(c,a+b)", "fallback": "(a, b+c), (b, c+a) மற்றும் (c, a+b)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute the symbolic coordinates into the triangle area formula and expand; if all positive and negative terms cancel to 0 for every real value of a, b, c, the points are collinear.",
        "eq": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right|", "fallback": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|", "display": true }
      },
      {
        "en": "Understand Deeply — Notice symmetry: Each point has x + y = a + b + c! Geometrically, every point sits on the straight line x + y = a + b + c. Let us confirm algebraically using the area determinant.",
        "eq": "(x₁, y₁) = (a, b + c), (x₂, y₂) = (b, c + a), (x₃, y₃) = (c, a + b)",
        "math": { "latex": "(x_1,y_1)=(a,b+c),\\quad (x_2,y_2)=(b,c+a),\\quad (x_3,y_3)=(c,a+b)", "fallback": "(x₁, y₁) = (a, b + c), (x₂, y₂) = (b, c + a), (x₃, y₃) = (c, a + b)", "display": true }
      },
      {
        "en": "Compute S₁ = x₁y₂ + x₂y₃ + x₃y₁ and S₂ = y₁x₂ + y₂x₃ + y₃x₁ by distributing each multiplication over brackets.",
        "eq": "S₁ = a(c + a) + b(a + b) + c(b + c) = ac + a² + ab + b² + bc + c²; S₂ = (b + c)b + (c + a)c + (a + b)a = b² + bc + c² + ac + a² + ab",
        "math": { "latex": "\\begin{aligned}S_1&=a(c+a)+b(a+b)+c(b+c)=a^2+b^2+c^2+ab+bc+ca\\\\ S_2&=(b+c)b+(c+a)c+(a+b)a=a^2+b^2+c^2+ab+bc+ca\\end{aligned}", "fallback": "S₁ = a(c + a) + b(a + b) + c(b + c) = ac + a² + ab + b² + bc + c²; S₂ = (b + c)b + (c + a)c + (a + b)a = b² + bc + c² + ac + a² + ab", "display": true }
      },
      {
        "en": "Since S₁ and S₂ are identical polynomials (a² + b² + c² + ab + bc + ca), subtracting them leaves 0, proving area = 0 and the three points are collinear.",
        "eq": "Area = (1/2)|S₁ − S₂| = (1/2)(0) = 0",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}|S_1-S_2|=0\\quad\\text{(collinear)}", "fallback": "Area = (1/2)|S₁ − S₂| = (1/2)(0) = 0", "display": true }
      }
    ],
    "answer": "The given points are collinear",
    "answerMath": { "latex": "\\text{The given points are collinear}", "fallback": "The given points are collinear", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q2(ii). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q3-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Finding Unknown Vertex from Area", "ta": "ஆயத்தொலை வடிவியல் — பரப்பிலிருந்து தெரியாத மதிப்பு" },
    "label": { "en": "Exercise 5.1 · Q3(i)", "ta": "பயிற்சி 5.1 · வினா 3(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find p when vertices (0, 0), (p, 8), (6, 2) have area 20" },
    "q": {
      "en": "3. Vertices of given triangles are taken in order and their areas are provided aside. In each case, find the value of ‘p’.\n(i) Vertices: (0, 0), (p, 8), (6, 2); Area (sq.units): 20",
      "ta": "3. வரிசையில் அமைந்த முக்கோணத்தின் முனைப் புள்ளிகளும், அதன் பரப்பளவுகளும் அட்டவணையில் கொடுக்கப்பட்டுள்ளன. ‘p’-யின் மதிப்பைக் காண்க.\n(i) முனைப் புள்ளிகள்: (0, 0), (p, 8), (6, 2); பரப்பு (சதுர அலகில்): 20"
    },
    "questionMath": {
      "en": ["3. Vertices of given triangles are taken in order and their areas are provided aside. In each case, find the value of ‘p’.\n(i) Vertices: ", { "latex": "(0,0),\\; (p,8),\\; (6,2)", "fallback": "(0, 0), (p, 8), (6, 2)", "display": false }, "; Area (sq.units): ", { "latex": "20", "fallback": "20", "display": false }],
      "ta": ["3. வரிசையில் அமைந்த முக்கோணத்தின் முனைப் புள்ளிகளும், அதன் பரப்பளவுகளும் அட்டவணையில் கொடுக்கப்பட்டுள்ளன. ‘p’-யின் மதிப்பைக் காண்க.\n(i) முனைப் புள்ளிகள்: ", { "latex": "(0,0),\\; (p,8),\\; (6,2)", "fallback": "(0, 0), (p, 8), (6, 2)", "display": false }, "; பரப்பு (சதுர அலகில்): ", { "latex": "20", "fallback": "20", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Set the counterclockwise triangle area formula equal to 20: (1/2)[(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)] = 20, solve for p.",
        "eq": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)] = 20",
        "math": { "latex": "\\dfrac{1}{2}\\left[(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right]=20", "fallback": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)] = 20", "display": true }
      },
      {
        "en": "Understand Deeply — Why vertices 'taken in order' determines the sign: In the TN textbook convention, vertices taken in counterclockwise order give a positive signed determinant without needing negative branch inversion. With (x₁, y₁) = (0, 0), four of the six cross-products vanish because they multiply by 0!",
        "eq": "(x₁, y₁) = (0, 0), (x₂, y₂) = (p, 8), (x₃, y₃) = (6, 2)",
        "math": { "latex": "(x_1,y_1)=(0,0),\\quad (x_2,y_2)=(p,8),\\quad (x_3,y_3)=(6,2)", "fallback": "(x₁, y₁) = (0, 0), (x₂, y₂) = (p, 8), (x₃, y₃) = (6, 2)", "display": true }
      },
      {
        "en": "Substitute into S₁ and S₂, then multiply both sides by 2 to clear the fraction 1/2.",
        "eq": "(1/2)[(0 + 2p + 0) − (0 + 48 + 0)] = 20, so 2p − 48 = 40",
        "math": { "latex": "\\dfrac{1}{2}[(0+2p+0)-(0+48+0)]=20\\quad\\text{so}\\quad 2p-48=40", "fallback": "(1/2)[(0 + 2p + 0) − (0 + 48 + 0)] = 20, so 2p − 48 = 40", "display": true }
      },
      {
        "en": "Add 48 to both sides and divide by 2 to isolate p. Check: moving (0,0) → (44,8) → (6,2) goes counterclockwise and gives (1/2)(88 − 48) = 20 sq. units.",
        "eq": "2p = 88, so p = 44",
        "math": { "latex": "2p=88\\quad\\text{so}\\quad p=44", "fallback": "2p = 88, so p = 44", "display": true }
      }
    ],
    "answer": "p = 44",
    "answerMath": { "latex": "p=44", "fallback": "p = 44", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q3(i). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q3-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Finding Unknown Vertex from Area", "ta": "ஆயத்தொலை வடிவியல் — பரப்பிலிருந்து தெரியாத மதிப்பு" },
    "label": { "en": "Exercise 5.1 · Q3(ii)", "ta": "பயிற்சி 5.1 · வினா 3(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find p when vertices (p, p), (5, 6), (5, −2) have area 32" },
    "q": {
      "en": "3. Vertices of given triangles are taken in order and their areas are provided aside. In each case, find the value of ‘p’.\n(ii) Vertices: (p, p), (5, 6), (5, −2); Area (sq.units): 32",
      "ta": "3. வரிசையில் அமைந்த முக்கோணத்தின் முனைப் புள்ளிகளும், அதன் பரப்பளவுகளும் அட்டவணையில் கொடுக்கப்பட்டுள்ளன. ‘p’-யின் மதிப்பைக் காண்க.\n(ii) முனைப் புள்ளிகள்: (p, p), (5, 6), (5, −2); பரப்பு (சதுர அலகில்): 32"
    },
    "questionMath": {
      "en": ["3. Vertices of given triangles are taken in order and their areas are provided aside. In each case, find the value of ‘p’.\n(ii) Vertices: ", { "latex": "(p,p),\\; (5,6),\\; (5,-2)", "fallback": "(p, p), (5, 6), (5, −2)", "display": false }, "; Area (sq.units): ", { "latex": "32", "fallback": "32", "display": false }],
      "ta": ["3. வரிசையில் அமைந்த முக்கோணத்தின் முனைப் புள்ளிகளும், அதன் பரப்பளவுகளும் அட்டவணையில் கொடுக்கப்பட்டுள்ளன. ‘p’-யின் மதிப்பைக் காண்க.\n(ii) முனைப் புள்ளிகள்: ", { "latex": "(p,p),\\; (5,6),\\; (5,-2)", "fallback": "(p, p), (5, 6), (5, −2)", "display": false }, "; பரப்பு (சதுர அலகில்): ", { "latex": "32", "fallback": "32", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the positive-oriented (counterclockwise) coordinate area formula equal to 32, collect like terms in p, and solve the linear equation.",
        "eq": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)] = 32",
        "math": { "latex": "\\dfrac{1}{2}\\left[(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right]=32", "fallback": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)] = 32", "display": true }
      },
      {
        "en": "Understand Deeply — Notice geometric meaning: The segment from (5, 6) to (5, −2) is vertical with base length 6 − (−2) = 8 units along x = 5! Moving downward from (5, 6) to (5, −2) keeps the third vertex (p, p) to the right (p > 5) for counterclockwise order. Let us compute the shoelace terms.",
        "eq": "S₁ = p(6) + 5(−2) + 5(p) = 11p − 10; S₂ = p(5) + 6(5) + (−2)p = 3p + 30",
        "math": { "latex": "\\begin{aligned}S_1&=p(6)+5(-2)+5(p)=11p-10\\\\ S_2&=p(5)+6(5)+(-2)p=3p+30\\end{aligned}", "fallback": "S₁ = p(6) + 5(−2) + 5(p) = 11p − 10; S₂ = p(5) + 6(5) + (−2)p = 3p + 30", "display": true }
      },
      {
        "en": "Subtract S₂ from S₁ carefully, remembering that the minus sign distributes to both 3p and +30. Multiply both sides by 2 to eliminate 1/2.",
        "eq": "(1/2)[(11p − 10) − (3p + 30)] = 32, so 8p − 40 = 64",
        "math": { "latex": "\\dfrac{1}{2}[(11p-10)-(3p+30)]=32\\quad\\text{so}\\quad 8p-40=64", "fallback": "(1/2)[(11p − 10) − (3p + 30)] = 32, so 8p − 40 = 64", "display": true }
      },
      {
        "en": "Add 40 to both sides and divide by 8. Check with base 8: horizontal height from x = 5 to x = 13 is 8, and (1/2) × 8 × 8 = 32 sq. units!",
        "eq": "8p = 104, so p = 13",
        "math": { "latex": "8p=104\\quad\\text{so}\\quad p=13", "fallback": "8p = 104, so p = 13", "display": true }
      }
    ],
    "answer": "p = 13",
    "answerMath": { "latex": "p=13", "fallback": "p = 13", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q3(ii). EN printed p. 211 (PDF p. 217); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 217, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q4-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Unknown Parameter from Collinearity", "ta": "ஆயத்தொலை வடிவியல் — ஒரு கோடமை நிபந்தனை" },
    "label": { "en": "Exercise 5.1 · Q4(i)", "ta": "பயிற்சி 5.1 · வினா 4(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a so (2, 3), (4, a), (6, −3) are collinear" },
    "q": {
      "en": "4. In each of the following, find the value of ‘a’ for which the given points are collinear.\n(i) (2, 3), (4, a) and (6, −3)",
      "ta": "4. கொடுக்கப்பட்ட புள்ளிகள் ஒரு கோட்டில் அமைந்தவை எனில், ‘a’-யின் மதிப்பைக் காண்க.\n(i) (2, 3), (4, a) மற்றும் (6, −3)"
    },
    "questionMath": {
      "en": ["4. In each of the following, find the value of ‘a’ for which the given points are collinear.\n(i) ", { "latex": "(2,3),\\; (4,a)\\text{ and }(6,-3)", "fallback": "(2, 3), (4, a) and (6, −3)", "display": false }],
      "ta": ["4. கொடுக்கப்பட்ட புள்ளிகள் ஒரு கோட்டில் அமைந்தவை எனில், ‘a’-யின் மதிப்பைக் காண்க.\n(i) ", { "latex": "(2,3),\\; (4,a)\\text{ மற்றும் }(6,-3)", "fallback": "(2, 3), (4, a) மற்றும் (6, −3)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Collinear points form a triangle of area 0, which gives x₁y₂ + x₂y₃ + x₃y₁ = y₁x₂ + y₂x₃ + y₃x₁. Substitute the three points and solve for a.",
        "eq": "(1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)| = 0",
        "math": { "latex": "\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_1)-(y_1x_2+y_2x_3+y_3x_1)\\right|=0", "fallback": "(1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)| = 0", "display": true }
      },
      {
        "en": "Understand Deeply — Midpoint intuition: Notice x-coordinates 2, 4, 6 step evenly, so (4, a) lies halfway between (2, 3) and (6, −3), meaning a should equal the average of 3 and −3 (which is 0). Let us prove this algebraically.",
        "eq": "S₁ = 2(a) + 4(−3) + 6(3) = 2a − 12 + 18 = 2a + 6; S₂ = 3(4) + a(6) + (−3)(2) = 12 + 6a − 6 = 6a + 6",
        "math": { "latex": "\\begin{aligned}S_1&=2(a)+4(-3)+6(3)=2a+6\\\\ S_2&=3(4)+a(6)+(-3)(2)=6a+6\\end{aligned}", "fallback": "S₁ = 2(a) + 4(−3) + 6(3) = 2a − 12 + 18 = 2a + 6; S₂ = 3(4) + a(6) + (−3)(2) = 12 + 6a − 6 = 6a + 6", "display": true }
      },
      {
        "en": "Set S₁ − S₂ = 0 and solve for a. Canceling +6 leaves −4a = 0, so a = 0.",
        "eq": "(2a + 6) − (6a + 6) = 0, so −4a = 0, hence a = 0",
        "math": { "latex": "(2a+6)-(6a+6)=0\\quad\\text{so}\\quad -4a=0,\\quad a=0", "fallback": "(2a + 6) − (6a + 6) = 0, so −4a = 0, hence a = 0", "display": true }
      }
    ],
    "answer": "a = 0",
    "answerMath": { "latex": "a=0", "fallback": "a = 0", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q4(i). EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q4-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Unknown Parameter from Collinearity", "ta": "ஆயத்தொலை வடிவியல் — ஒரு கோடமை நிபந்தனை" },
    "label": { "en": "Exercise 5.1 · Q4(ii)", "ta": "பயிற்சி 5.1 · வினா 4(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a so (a, 2−2a), (−a+1, 2a), (−4−a, 6−2a) are collinear" },
    "q": {
      "en": "4. In each of the following, find the value of ‘a’ for which the given points are collinear.\n(ii) (a, 2−2a), (−a+1, 2a) and (−4−a, 6−2a)",
      "ta": "4. கொடுக்கப்பட்ட புள்ளிகள் ஒரு கோட்டில் அமைந்தவை எனில், ‘a’-யின் மதிப்பைக் காண்க.\n(ii) (a, 2−2a), (−a+1, 2a) மற்றும் (−4−a, 6−2a)"
    },
    "questionMath": {
      "en": ["4. In each of the following, find the value of ‘a’ for which the given points are collinear.\n(ii) ", { "latex": "(a,2-2a),\\; (-a+1,2a)\\text{ and }(-4-a,6-2a)", "fallback": "(a, 2−2a), (−a+1, 2a) and (−4−a, 6−2a)", "display": false }],
      "ta": ["4. கொடுக்கப்பட்ட புள்ளிகள் ஒரு கோட்டில் அமைந்தவை எனில், ‘a’-யின் மதிப்பைக் காண்க.\n(ii) ", { "latex": "(a,2-2a),\\; (-a+1,2a)\\text{ மற்றும் }(-4-a,6-2a)", "fallback": "(a, 2−2a), (−a+1, 2a) மற்றும் (−4−a, 6−2a)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Set the area determinant equal to 0: x₁y₂ + x₂y₃ + x₃y₁ = y₁x₂ + y₂x₃ + y₃x₁. Expanding produces a quadratic equation in a whose roots are 1/2 and −1.",
        "eq": "x₁y₂ + x₂y₃ + x₃y₁ = y₁x₂ + y₂x₃ + y₃x₁",
        "math": { "latex": "x_1y_2+x_2y_3+x_3y_1=y_1x_2+y_2x_3+y_3x_1", "fallback": "x₁y₂ + x₂y₃ + x₃y₁ = y₁x₂ + y₂x₃ + y₃x₁", "display": true }
      },
      {
        "en": "Understand Deeply — Expand each binomial product slowly. First compute the downward products S₁ = x₁y₂ + x₂y₃ + x₃y₁ carefully combining a² terms, a terms, and constants.",
        "eq": "S₁ = a(2a) + (−a + 1)(6 − 2a) + (−4 − a)(2 − 2a) = 2a² + (2a² − 8a + 6) + (2a² + 6a − 8) = 6a² − 2a − 2",
        "math": { "latex": "\\begin{aligned}S_1&=a(2a)+(-a+1)(6-2a)+(-4-a)(2-2a)\\\\ &=2a^2+(2a^2-8a+6)+(2a^2+6a-8)=6a^2-2a-2\\end{aligned}", "fallback": "S₁ = a(2a) + (−a + 1)(6 − 2a) + (−4 − a)(2 − 2a) = 2a² + (2a² − 8a + 6) + (2a² + 6a − 8) = 6a² − 2a − 2", "display": true }
      },
      {
        "en": "Next compute the upward products S₂ = y₁x₂ + y₂x₃ + y₃x₁ and simplify like terms.",
        "eq": "S₂ = (2 − 2a)(−a + 1) + 2a(−4 − a) + (6 − 2a)a = (2a² − 4a + 2) + (−2a² − 8a) + (−2a² + 6a) = −2a² − 6a + 2",
        "math": { "latex": "\\begin{aligned}S_2&=(2-2a)(-a+1)+2a(-4-a)+(6-2a)a\\\\ &=(2a^2-4a+2)+(-2a^2-8a)+(-2a^2+6a)=-2a^2-6a+2\\end{aligned}", "fallback": "S₂ = (2 − 2a)(−a + 1) + 2a(−4 − a) + (6 − 2a)a = (2a² − 4a + 2) + (−2a² − 8a) + (−2a² + 6a) = −2a² − 6a + 2", "display": true }
      },
      {
        "en": "Equate S₁ − S₂ = 0, divide through by 4 to get a simple quadratic equation 2a² + a − 1 = 0, and factor it into (2a − 1)(a + 1) = 0.",
        "eq": "(6a² − 2a − 2) − (−2a² − 6a + 2) = 8a² + 4a − 4 = 0, so 2a² + a − 1 = 0, giving (2a − 1)(a + 1) = 0",
        "math": { "latex": "\\begin{aligned}8a^2+4a-4&=0\\\\ 2a^2+a-1&=0\\\\ (2a-1)(a+1)&=0\\quad\\text{so}\\quad a=\\dfrac{1}{2}\\text{ or }a=-1\\end{aligned}", "fallback": "(6a² − 2a − 2) − (−2a² − 6a + 2) = 8a² + 4a − 4 = 0, so 2a² + a − 1 = 0, giving (2a − 1)(a + 1) = 0", "display": true }
      }
    ],
    "answer": "a = 1/2 or a = −1",
    "answerMath": { "latex": "a=\\dfrac{1}{2}\\text{ or }a=-1", "fallback": "a = 1/2 or a = −1", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q4(ii). EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q5-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area of a Quadrilateral", "ta": "ஆயத்தொலை வடிவியல் — நாற்கரத்தின் பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q5(i)", "ta": "பயிற்சி 5.1 · வினா 5(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Area of quadrilateral with vertices (−9, −2), (−8, −4), (2, 2), (1, −3)" },
    "q": {
      "en": "5. Find the area of the quadrilateral whose vertices are at\n(i) (−9, −2), (−8, −4), (2, 2) and (1, −3)",
      "ta": "5. கொடுக்கப்பட்ட புள்ளிகளை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பைக் காண்க.\n(i) (−9, −2), (−8, −4), (2, 2) மற்றும் (1, −3)"
    },
    "questionMath": {
      "en": ["5. Find the area of the quadrilateral whose vertices are at\n(i) ", { "latex": "(-9,-2),\\; (-8,-4),\\; (2,2)\\text{ and }(1,-3)", "fallback": "(−9, −2), (−8, −4), (2, 2) and (1, −3)", "display": false }],
      "ta": ["5. கொடுக்கப்பட்ட புள்ளிகளை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பைக் காண்க.\n(i) ", { "latex": "(-9,-2),\\; (-8,-4),\\; (2,2)\\text{ மற்றும் }(1,-3)", "fallback": "(−9, −2), (−8, −4), (2, 2) மற்றும் (1, −3)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First plot the four vertices on a grid and trace the perimeter counterclockwise so edges do not cross: A(−9, −2) → B(−8, −4) → C(1, −3) → D(2, 2). Then apply the 4-vertex shoelace area formula.",
        "eq": "Area = (1/2)|[(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)]|",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_4+x_4y_1)-(y_1x_2+y_2x_3+y_3x_4+y_4x_1)\\right|", "fallback": "Area = (1/2)|[(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)]|", "display": true }
      },
      {
        "en": "Understand Deeply — Why reordering matters: Notice (2, 2) was listed before (1, −3) in the question! Looking at the diagram, going directly (−8, −4) → (2, 2) → (1, −3) cuts across the inside like a bowtie. Reordering to C(1, −3) then D(2, 2) traces the true outer boundary counterclockwise.",
        "eq": "A(−9, −2), B(−8, −4), C(1, −3), D(2, 2)",
        "math": { "latex": "A(-9,-2),\\quad B(-8,-4),\\quad C(1,-3),\\quad D(2,2)", "fallback": "A(−9, −2), B(−8, −4), C(1, −3), D(2, 2)", "display": true }
      },
      {
        "en": "Compute downward products S₁ = x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁ and upward products S₂ = y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁.",
        "eq": "S₁ = (−9)(−4) + (−8)(−3) + (1)(2) + (2)(−2) = 36 + 24 + 2 − 4 = 58; S₂ = (−2)(−8) + (−4)(1) + (−3)(2) + (2)(−9) = 16 − 4 − 6 − 18 = −12",
        "math": { "latex": "\\begin{aligned}S_1&=(-9)(-4)+(-8)(-3)+(1)(2)+(2)(-2)=36+24+2-4=58\\\\ S_2&=(-2)(-8)+(-4)(1)+(-3)(2)+(2)(-9)=16-4-6-18=-12\\end{aligned}", "fallback": "S₁ = (−9)(−4) + (−8)(−3) + (1)(2) + (2)(−2) = 36 + 24 + 2 − 4 = 58; S₂ = (−2)(−8) + (−4)(1) + (−3)(2) + (2)(−9) = 16 − 4 − 6 − 18 = −12", "display": true }
      },
      {
        "en": "Subtract S₂ from S₁ and divide by 2: 58 − (−12) = 70, and half of 70 is 35 sq. units.",
        "eq": "Area = (1/2)|58 − (−12)| = (1/2)(70) = 35 sq. units",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}|58-(-12)|=\\dfrac{1}{2}(70)=35\\text{ sq. units}", "fallback": "Area = (1/2)|58 − (−12)| = (1/2)(70) = 35 sq. units", "display": true }
      }
    ],
    "answer": "35 sq. units",
    "answerMath": { "latex": "35\\text{ sq. units}", "fallback": "35 sq. units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q5-i.svg",
    "figureAlt": {
      "en": "Coordinate grid plotting quadrilateral vertices A(-9,-2), B(-8,-4), C(1,-3), and D(2,2) in counterclockwise boundary order.",
      "ta": "(-9,-2), (-8,-4), (1,-3), (2,2) ஆகிய நாற்கர முனைகளை கடிகார எதிர் திசையில் காட்டும் ஆயத்தொலை வரைபடம்."
    },
    "figureCaption": { "en": "Counterclockwise vertex order A → B → C → D", "ta": "கடிகார எதிர் திசை வரிசை A → B → C → D" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q5(i). EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q5-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area of a Quadrilateral", "ta": "ஆயத்தொலை வடிவியல் — நாற்கரத்தின் பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q5(ii)", "ta": "பயிற்சி 5.1 · வினா 5(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Area of quadrilateral with vertices (−9, 0), (−8, 6), (−1, −2), (−6, −3)" },
    "q": {
      "en": "5. Find the area of the quadrilateral whose vertices are at\n(ii) (−9, 0), (−8, 6), (−1, −2) and (−6, −3)",
      "ta": "5. கொடுக்கப்பட்ட புள்ளிகளை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பைக் காண்க.\n(ii) (−9, 0), (−8, 6), (−1, −2) மற்றும் (−6, −3)"
    },
    "questionMath": {
      "en": ["5. Find the area of the quadrilateral whose vertices are at\n(ii) ", { "latex": "(-9,0),\\; (-8,6),\\; (-1,-2)\\text{ and }(-6,-3)", "fallback": "(−9, 0), (−8, 6), (−1, −2) and (−6, −3)", "display": false }],
      "ta": ["5. கொடுக்கப்பட்ட புள்ளிகளை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பைக் காண்க.\n(ii) ", { "latex": "(-9,0),\\; (-8,6),\\; (-1,-2)\\text{ மற்றும் }(-6,-3)", "fallback": "(−9, 0), (−8, 6), (−1, −2) மற்றும் (−6, −3)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Order the vertices counterclockwise from the coordinate plot: A(−9, 0) → B(−6, −3) → C(−1, −2) → D(−8, 6), then evaluate (1/2)|(S₁ − S₂)|.",
        "eq": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)|",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\left|(x_1y_2+x_2y_3+x_3y_4+x_4y_1)-(y_1x_2+y_2x_3+y_3x_4+y_4x_1)\\right|", "fallback": "Area = (1/2)|(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)|", "display": true }
      },
      {
        "en": "Understand Deeply — Reading the plot counterclockwise: Starting at A(−9, 0) on the negative X-axis, moving downward goes to B(−6, −3), right to C(−1, −2), and up to D(−8, 6). Using (−9, 0) as the first vertex keeps two products equal to 0.",
        "eq": "A(−9, 0), B(−6, −3), C(−1, −2), D(−8, 6)",
        "math": { "latex": "A(-9,0),\\quad B(-6,-3),\\quad C(-1,-2),\\quad D(-8,6)", "fallback": "A(−9, 0), B(−6, −3), C(−1, −2), D(−8, 6)", "display": true }
      },
      {
        "en": "Calculate S₁ (downward products) and S₂ (upward products).",
        "eq": "S₁ = (−9)(−3) + (−6)(−2) + (−1)(6) + (−8)(0) = 27 + 12 − 6 + 0 = 33; S₂ = (0)(−6) + (−3)(−1) + (−2)(−8) + (6)(−9) = 0 + 3 + 16 − 54 = −35",
        "math": { "latex": "\\begin{aligned}S_1&=(-9)(-3)+(-6)(-2)+(-1)(6)+(-8)(0)=27+12-6+0=33\\\\ S_2&=(0)(-6)+(-3)(-1)+(-2)(-8)+(6)(-9)=0+3+16-54=-35\\end{aligned}", "fallback": "S₁ = (−9)(−3) + (−6)(−2) + (−1)(6) + (−8)(0) = 27 + 12 − 6 + 0 = 33; S₂ = (0)(−6) + (−3)(−1) + (−2)(−8) + (6)(−9) = 0 + 3 + 16 − 54 = −35", "display": true }
      },
      {
        "en": "Subtract S₂ from S₁ and divide by 2: 33 − (−35) = 68, so half is 34 sq. units.",
        "eq": "Area = (1/2)|33 − (−35)| = (1/2)(68) = 34 sq. units",
        "math": { "latex": "\\text{Area}=\\dfrac{1}{2}|33-(-35)|=\\dfrac{1}{2}(68)=34\\text{ sq. units}", "fallback": "Area = (1/2)|33 − (−35)| = (1/2)(68) = 34 sq. units", "display": true }
      }
    ],
    "answer": "34 sq. units",
    "answerMath": { "latex": "34\\text{ sq. units}", "fallback": "34 sq. units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q5-ii.svg",
    "figureAlt": {
      "en": "Coordinate grid plotting quadrilateral vertices A(-9,0), B(-6,-3), C(-1,-2), and D(-8,6) in counterclockwise order.",
      "ta": "(-9,0), (-6,-3), (-1,-2), (-8,6) ஆகிய நாற்கர முனைகளை கடிகார எதிர் திசையில் காட்டும் ஆயத்தொலை வரைபடம்."
    },
    "figureCaption": { "en": "Counterclockwise vertex order A → B → C → D", "ta": "கடிகார எதிர் திசை வரிசை A → B → C → D" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q5(ii). EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 360.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q6",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Finding Unknown Vertex of a Quadrilateral", "ta": "ஆயத்தொலை வடிவியல் — நாற்கரத்தின் தெரியாத மதிப்பு" },
    "label": { "en": "Exercise 5.1 · Q6", "ta": "பயிற்சி 5.1 · வினா 6 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find k when quadrilateral (−4, −2), (−3, k), (3, −2), (2, 3) has area 28" },
    "q": {
      "en": "6. Find the value of k, if the area of a quadrilateral is 28 sq.units, whose vertices are taken in the order (−4, −2), (−3, k), (3, −2) and (2, 3)",
      "ta": "6. (−4, −2), (−3, k), (3, −2) மற்றும் (2, 3) ஆகிய முனைகளை வரிசையாகக் கொண்ட நாற்கரத்தின் பரப்பு 28 ச. அலகுகள் எனில், k-யின் மதிப்புக் காண்க."
    },
    "questionMath": {
      "en": ["6. Find the value of k, if the area of a quadrilateral is ", { "latex": "28\\text{ sq.units}", "fallback": "28 sq.units", "display": false }, ", whose vertices are taken in the order ", { "latex": "(-4,-2),\\; (-3,k),\\; (3,-2)\\text{ and }(2,3)", "fallback": "(−4, −2), (−3, k), (3, −2) and (2, 3)", "display": false }],
      "ta": ["6. ", { "latex": "(-4,-2),\\; (-3,k),\\; (3,-2)\\text{ மற்றும் }(2,3)", "fallback": "(−4, −2), (−3, k), (3, −2) மற்றும் (2, 3)", "display": false }, " ஆகிய முனைகளை வரிசையாகக் கொண்ட நாற்கரத்தின் பரப்பு ", { "latex": "28", "fallback": "28", "display": false }, " ச. அலகுகள் எனில், k-யின் மதிப்புக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Since the vertices are given in counterclockwise order (−4, −2) → (−3, k) → (3, −2) → (2, 3), set the quadrilateral area formula equal to 28 and solve for k.",
        "eq": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)] = 28",
        "math": { "latex": "\\dfrac{1}{2}\\left[(x_1y_2+x_2y_3+x_3y_4+x_4y_1)-(y_1x_2+y_2x_3+y_3x_4+y_4x_1)\\right]=28", "fallback": "(1/2)[(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (y₁x₂ + y₂x₃ + y₃x₄ + y₄x₁)] = 28", "display": true }
      },
      {
        "en": "Understand Deeply — Notice the geometry: Moving (−4, −2) → (−3, k) → (3, −2) → (2, 3) goes counterclockwise around the interior when (−3, k) sits below the segment y = −2 (so k < −2). Evaluate S₁ and S₂ in terms of k.",
        "eq": "S₁ = (−4)(k) + (−3)(−2) + (3)(3) + (2)(−2) = −4k + 6 + 9 − 4 = 11 − 4k; S₂ = (−2)(−3) + (k)(3) + (−2)(2) + (3)(−4) = 6 + 3k − 4 − 12 = 3k − 10",
        "math": { "latex": "\\begin{aligned}S_1&=(-4)(k)+(-3)(-2)+(3)(3)+(2)(-2)=11-4k\\\\ S_2&=(-2)(-3)+(k)(3)+(-2)(2)+(3)(-4)=3k-10\\end{aligned}", "fallback": "S₁ = (−4)(k) + (−3)(−2) + (3)(3) + (2)(−2) = −4k + 6 + 9 − 4 = 11 − 4k; S₂ = (−2)(−3) + (k)(3) + (−2)(2) + (3)(−4) = 6 + 3k − 4 − 12 = 3k − 10", "display": true }
      },
      {
        "en": "Multiply both sides by 2 and simplify (11 − 4k) − (3k − 10). Notice −(−10) becomes +10.",
        "eq": "21 − 7k = 56",
        "math": { "latex": "(11-4k)-(3k-10)=56\\quad\\text{so}\\quad 21-7k=56", "fallback": "21 − 7k = 56", "display": true }
      },
      {
        "en": "Subtract 21 from both sides to get −7k = 35, then divide by −7. Check: when k = −5, the four vertices sit cleanly at (−4, −2), (−3, −5), (3, −2), (2, 3) in counterclockwise order and enclose (1/2)(21 + 35) = 28 sq. units.",
        "eq": "−7k = 35, so k = −5",
        "math": { "latex": "-7k=35\\quad\\text{so}\\quad k=-5", "fallback": "−7k = 35, so k = −5", "display": true }
      }
    ],
    "answer": "k = −5",
    "answerMath": { "latex": "k=-5", "fallback": "k = −5", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q6. EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q7",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Collinearity and Linear Equations", "ta": "ஆயத்தொலை வடிவியல் — ஒரு கோடமை மற்றும் சமன்பாடுகள்" },
    "label": { "en": "Exercise 5.1 · Q7", "ta": "பயிற்சி 5.1 · வினா 7 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a and b when A(−3, 9), B(a, b), C(4, −5) are collinear and a + b = 1" },
    "q": {
      "en": "7. If the points A(−3, 9), B(a, b) and C(4, −5) are collinear and if a + b = 1, then find a and b.",
      "ta": "7. A(−3, 9), B(a, b) மற்றும் C(4, −5) என்பன ஒரு கோடமைந்த புள்ளிகள் மற்றும் a + b = 1 எனில், a மற்றும் b-யின் மதிப்பைக் காண்க."
    },
    "questionMath": {
      "en": ["7. If the points ", { "latex": "A(-3,9),\\; B(a,b)\\text{ and }C(4,-5)", "fallback": "A(−3, 9), B(a, b) and C(4, −5)", "display": false }, " are collinear and if ", { "latex": "a+b=1", "fallback": "a + b = 1", "display": false }, ", then find a and b."],
      "ta": ["7. ", { "latex": "A(-3,9),\\; B(a,b)\\text{ மற்றும் }C(4,-5)", "fallback": "A(−3, 9), B(a, b) மற்றும் C(4, −5)", "display": false }, " என்பன ஒரு கோடமைந்த புள்ளிகள் மற்றும் ", { "latex": "a+b=1", "fallback": "a + b = 1", "display": false }, " எனில், a மற்றும் b-யின் மதிப்பைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Collinearity of A, B, C means area(ΔABC) = 0, giving a first linear equation between a and b. Solve it simultaneously with the given equation a + b = 1.",
        "eq": "Area(ΔABC) = 0 and a + b = 1",
        "math": { "latex": "\\text{Area}(\\triangle ABC)=0\\quad\\text{and}\\quad a+b=1", "fallback": "Area(ΔABC) = 0 and a + b = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Build Equation (1) from collinearity: Compute downward products S₁ and upward products S₂ for (−3, 9), (a, b), (4, −5).",
        "eq": "S₁ = (−3)b + a(−5) + 4(9) = −3b − 5a + 36; S₂ = 9a + b(4) + (−5)(−3) = 9a + 4b + 15",
        "math": { "latex": "\\begin{aligned}S_1&=-3b-5a+36\\\\ S_2&=9a+4b+15\\end{aligned}", "fallback": "S₁ = (−3)b + a(−5) + 4(9) = −3b − 5a + 36; S₂ = 9a + b(4) + (−5)(−3) = 9a + 4b + 15", "display": true }
      },
      {
        "en": "Set S₁ − S₂ = 0 and divide by 7 to simplify the linear relationship between a and b.",
        "eq": "(−3b − 5a + 36) − (9a + 4b + 15) = −14a − 7b + 21 = 0, so 2a + b = 3",
        "math": { "latex": "-14a-7b+21=0\\quad\\text{so}\\quad 2a+b=3\\;\\text{--- (1)}", "fallback": "(−3b − 5a + 36) − (9a + 4b + 15) = −14a − 7b + 21 = 0, so 2a + b = 3", "display": true }
      },
      {
        "en": "Subtract given Equation (2) a + b = 1 from Equation (1) 2a + b = 3 to cancel b and find a = 2. Then substitute a = 2 into a + b = 1 to get b = −1.",
        "eq": "(2a + b) − (a + b) = 3 − 1 gives a = 2; then 2 + b = 1 gives b = −1",
        "math": { "latex": "\\begin{aligned}(2a+b)-(a+b)&=3-1\\quad\\text{gives}\\quad a=2\\\\ 2+b&=1\\quad\\text{gives}\\quad b=-1\\end{aligned}", "fallback": "(2a + b) − (a + b) = 3 − 1 gives a = 2; then 2 + b = 1 gives b = −1", "display": true }
      }
    ],
    "answer": "a = 2, b = −1",
    "answerMath": { "latex": "a=2,\\quad b=-1", "fallback": "a = 2, b = −1", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q7. EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q8",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Midpoints and Triangle Area Ratio", "ta": "ஆயத்தொலை வடிவியல் — நடுப்புள்ளிகள் மற்றும் பரப்பு விகிதம்" },
    "label": { "en": "Exercise 5.1 · Q8", "ta": "பயிற்சி 5.1 · வினா 8 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find A, B, C from midpoints P, Q, R and compare Area(ΔABC) with Area(ΔPQR)" },
    "q": {
      "en": "8. Let P(11, 7), Q(13.5, 4) and R(9.5, 4) be the midpoints of the sides AB, BC and AC respectively of ΔABC. Find the coordinates of the vertices A, B and C. Hence find the area of ΔABC and compare this with area of ΔPQR.",
      "ta": "8. ΔABC-யின் பக்கங்கள் AB, BC மற்றும் AC ஆகியவற்றின் நடுப்புள்ளிகள் முறையே P(11, 7), Q(13.5, 4) மற்றும் R(9.5, 4) என்க. முக்கோணத்தின் முனைப் புள்ளிகள் A, B மற்றும் C காண்க. மேலும், ΔABC-யின் பரப்பை ΔPQR-யின் பரப்புடன் ஒப்பிடுக."
    },
    "questionMath": {
      "en": ["8. Let ", { "latex": "P(11,7),\\; Q(13.5,4)\\text{ and }R(9.5,4)", "fallback": "P(11, 7), Q(13.5, 4) and R(9.5, 4)", "display": false }, " be the midpoints of the sides AB, BC and AC respectively of ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, ". Find the coordinates of the vertices A, B and C. Hence find the area of ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, " and compare this with area of ", { "latex": "\\triangle PQR", "fallback": "ΔPQR", "display": false }, "."],
      "ta": ["8. ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, "-யின் பக்கங்கள் AB, BC மற்றும் AC ஆகியவற்றின் நடுப்புள்ளிகள் முறையே ", { "latex": "P(11,7),\\; Q(13.5,4)\\text{ மற்றும் }R(9.5,4)", "fallback": "P(11, 7), Q(13.5, 4) மற்றும் R(9.5, 4)", "display": false }, " என்க. முக்கோணத்தின் முனைப் புள்ளிகள் A, B மற்றும் C காண்க. மேலும், ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, "-யின் பரப்பை ", { "latex": "\\triangle PQR", "fallback": "ΔPQR", "display": false }, "-யின் பரப்புடன் ஒப்பிடுக."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use midpoint equations (x₁+x₂)/2 = x_M and (y₁+y₂)/2 = y_M to solve for vertices A(7, 7), B(15, 7), C(12, 1), compute both triangle areas, and confirm area(ΔABC) = 4 × area(ΔPQR).",
        "eq": "A = P + R − Q, B = P + Q − R, C = Q + R − P",
        "math": { "latex": "A=P+R-Q,\\quad B=P+Q-R,\\quad C=Q+R-P", "fallback": "A = P + R − Q, B = P + Q − R, C = Q + R − P", "display": true }
      },
      {
        "en": "Understand Deeply — How to solve from midpoints: Since P is the midpoint of AB, x₁ + x₂ = 2(11) = 22. Similarly x₂ + x₃ = 2(13.5) = 27 and x₁ + x₃ = 2(9.5) = 19. Adding all three gives 2(x₁ + x₂ + x₃) = 68, so x₁ + x₂ + x₃ = 34. Subtracting each pair reveals x₁, x₂, x₃ directly!",
        "eq": "x₁ = 34 − 27 = 7, x₂ = 34 − 19 = 15, x₃ = 34 − 22 = 12",
        "math": { "latex": "\\begin{aligned}x_1+x_2=22,\\; x_2+x_3=27,\\; x_1+x_3=19&\\text{ gives }x_1+x_2+x_3=34\\\\ x_1=7,\\quad x_2=15,\\quad x_3=12&\\end{aligned}", "fallback": "x₁ = 34 − 27 = 7, x₂ = 34 − 19 = 15, x₃ = 34 − 22 = 12", "display": true }
      },
      {
        "en": "Apply the same sum trick to the y-coordinates: y₁ + y₂ = 14, y₂ + y₃ = 8, y₁ + y₃ = 8, so y₁ + y₂ + y₃ = 15. Subtracting each pair gives the three vertices A(7, 7), B(15, 7), C(12, 1).",
        "eq": "y₁ = 15 − 8 = 7, y₂ = 15 − 8 = 7, y₃ = 15 − 14 = 1; so A(7, 7), B(15, 7), C(12, 1)",
        "math": { "latex": "\\begin{aligned}y_1+y_2=14,\\; y_2+y_3=8,\\; y_1+y_3=8&\\text{ gives }y_1+y_2+y_3=15\\\\ A(7,7),\\quad B(15,7),\\quad C(12,1)&\\end{aligned}", "fallback": "y₁ = 15 − 8 = 7, y₂ = 15 − 8 = 7, y₃ = 15 − 14 = 1; so A(7, 7), B(15, 7), C(12, 1)", "display": true }
      },
      {
        "en": "Compute area(ΔABC) and area(ΔPQR). Notice both AB and QR are horizontal! AB runs from (7, 7) to (15, 7) (base 8, height 6 → area 24); QR runs from (9.5, 4) to (13.5, 4) (base 4, height 3 → area 6). Using the shoelace formula confirms the exact same values.",
        "eq": "Area(ΔABC) = (1/2)|7(7)+15(1)+12(7) − (7(15)+7(12)+1(7))| = (1/2)|148 − 196| = 24 sq. units; Area(ΔPQR) = (1/2)|11(4)+13.5(4)+9.5(7) − (7(13.5)+4(9.5)+4(11))| = (1/2)|164.5 − 176.5| = 6 sq. units",
        "math": { "latex": "\\begin{aligned}\\text{Area}(\\triangle ABC)&=\\dfrac{1}{2}|148-196|=24\\text{ sq. units}\\\\ \\text{Area}(\\triangle PQR)&=\\dfrac{1}{2}|164.5-176.5|=6\\text{ sq. units}\\end{aligned}", "fallback": "Area(ΔABC) = (1/2)|7(7)+15(1)+12(7) − (7(15)+7(12)+1(7))| = (1/2)|148 − 196| = 24 sq. units; Area(ΔPQR) = (1/2)|11(4)+13.5(4)+9.5(7) − (7(13.5)+4(9.5)+4(11))| = (1/2)|164.5 − 176.5| = 6 sq. units", "display": true }
      },
      {
        "en": "Divide 24 by 6: the midpoint triangle divides ΔABC into 4 congruent smaller triangles, so area(ΔABC) is 4 times area(ΔPQR).",
        "eq": "Area(ΔABC) = 4 × Area(ΔPQR)",
        "math": { "latex": "\\text{Area}(\\triangle ABC)=4\\times\\text{Area}(\\triangle PQR)", "fallback": "Area(ΔABC) = 4 × Area(ΔPQR)", "display": true }
      }
    ],
    "answer": "A(7, 7), B(15, 7), C(12, 1); Area(ΔABC) = 24 sq. units; Area(ΔABC) = 4 × Area(ΔPQR)",
    "answerMath": { "latex": "A(7,7),\\; B(15,7),\\; C(12,1);\\quad \\text{Area}(\\triangle ABC)=24\\text{ sq. units}=4\\times\\text{Area}(\\triangle PQR)", "fallback": "A(7, 7), B(15, 7), C(12, 1); Area(ΔABC) = 24 sq. units; Area(ΔABC) = 4 × Area(ΔPQR)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q8.svg",
    "figureAlt": {
      "en": "Coordinate diagram of triangle ABC with vertices A(7,7), B(15,7), C(12,1) and midpoint triangle P(11,7), Q(13.5,4), R(9.5,4) inside it.",
      "ta": "A(7,7), B(15,7), C(12,1) முனைகளையும் நடுப்புள்ளி முக்கோணம் PQR-யையும் காட்டும் வரைபடம்."
    },
    "figureCaption": { "en": "Midpoint triangle ΔPQR has 1/4 the area of ΔABC", "ta": "நடுப்புள்ளி முக்கோணம் ΔPQR பரப்பு = ΔABC பரப்பில் 1/4" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q8. EN printed p. 212 (PDF p. 218); TA printed p. 218 (PDF p. 224); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 224 } }
  },
  {
    "id": "c10-5-ex5-1-q9",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area Between Two Quadrilaterals", "ta": "ஆயத்தொலை வடிவியல் — இரு நாற்கரங்களுக்கு இடைப்பட்ட பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q9", "ta": "பயிற்சி 5.1 · வினா 9 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Area of the concrete patio around the swimming pool" },
    "q": {
      "en": "9. In the figure, the quadrilateral swimming pool shown is surrounded by concrete patio. Find the area of the patio.",
      "ta": "9. நாற்கர வடிவ நீச்சல் குளத்தின் கான்கிரீட் உள்முற்றமானது படத்தில் காட்டியுள்ளபடி அமைக்கப்பட்டுள்ளது எனில், உள்முற்றத்தின் பரப்பு காண்க."
    },
    "questionMath": {
      "en": ["9. In the figure, the quadrilateral swimming pool shown is surrounded by concrete patio. Find the area of the patio."],
      "ta": ["9. நாற்கர வடிவ நீச்சல் குளத்தின் கான்கிரீட் உள்முற்றமானது படத்தில் காட்டியுள்ளபடி அமைக்கப்பட்டுள்ளது எனில், உள்முற்றத்தின் பரப்பு காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: The concrete patio is the shaded ring outside the pool, so Area(patio) = Area(outer ABCD) − Area(inner pool EFGH).",
        "eq": "Area(patio) = Area(ABCD) − Area(EFGH)",
        "math": { "latex": "\\text{Area(patio)}=\\text{Area}(ABCD)-\\text{Area}(EFGH)", "fallback": "Area(patio) = Area(ABCD) − Area(EFGH)", "display": true }
      },
      {
        "en": "Understand Deeply — Read coordinates from the textbook figure counterclockwise: Outer boundary A(−4, −8) → B(8, −4) → C(6, 10) → D(−10, 6). Compute Area(ABCD) using the 4-vertex shoelace formula.",
        "eq": "S₁(ABCD) = (−4)(−4)+(8)(10)+(6)(6)+(−10)(−8) = 16+80+36+80 = 212; S₂(ABCD) = (−8)(8)+(−4)(6)+(10)(−10)+(6)(−4) = −64−24−100−24 = −212; Area(ABCD) = (1/2)|212−(−212)| = 212 sq. units",
        "math": { "latex": "\\begin{aligned}S_1&=16+80+36+80=212\\\\ S_2&=-64-24-100-24=-212\\\\ \\text{Area}(ABCD)&=\\dfrac{1}{2}|212-(-212)|=212\\text{ sq. units}\\end{aligned}", "fallback": "S₁(ABCD) = (−4)(−4)+(8)(10)+(6)(6)+(−10)(−8) = 16+80+36+80 = 212; S₂(ABCD) = (−8)(8)+(−4)(6)+(10)(−10)+(6)(−4) = −64−24−100−24 = −212; Area(ABCD) = (1/2)|212−(−212)| = 212 sq. units", "display": true }
      },
      {
        "en": "Next read the inner swimming pool vertices counterclockwise: E(−3, −5) → F(6, −2) → G(3, 7) → H(−6, 4), and compute Area(EFGH).",
        "eq": "S₁(EFGH) = (−3)(−2)+(6)(7)+(3)(4)+(−6)(−5) = 6+42+12+30 = 90; S₂(EFGH) = (−5)(6)+(−2)(3)+(7)(−6)+(4)(−3) = −30−6−42−12 = −90; Area(EFGH) = (1/2)|90−(−90)| = 90 sq. units",
        "math": { "latex": "\\begin{aligned}S_1&=6+42+12+30=90\\\\ S_2&=-30-6-42-12=-90\\\\ \\text{Area}(EFGH)&=\\dfrac{1}{2}|90-(-90)|=90\\text{ sq. units}\\end{aligned}", "fallback": "S₁(EFGH) = (−3)(−2)+(6)(7)+(3)(4)+(−6)(−5) = 6+42+12+30 = 90; S₂(EFGH) = (−5)(6)+(−2)(3)+(7)(−6)+(4)(−3) = −30−6−42−12 = −90; Area(EFGH) = (1/2)|90−(−90)| = 90 sq. units", "display": true }
      },
      {
        "en": "Subtract the water area 90 from the total area 212 to leave the area of the concrete patio alone.",
        "eq": "Area(patio) = 212 − 90 = 122 sq. units",
        "math": { "latex": "\\text{Area(patio)}=212-90=122\\text{ sq.units}", "fallback": "Area(patio) = 212 − 90 = 122 sq. units", "display": true }
      }
    ],
    "answer": "122 sq.units",
    "answerMath": { "latex": "122\\text{ sq.units}", "fallback": "122 sq.units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q9.svg",
    "figureAlt": {
      "en": "Outer concrete patio quadrilateral A(-4,-8), B(8,-4), C(6,10), D(-10,6) surrounding inner swimming pool quadrilateral E(-3,-5), F(6,-2), G(3,7), H(-6,4).",
      "ta": "நீச்சல் குளம் EFGH மற்றும் சுற்றியுள்ள கான்கிரீட் உள்முற்றம் ABCD ஆயத்தொலைகளைக் காட்டும் வரைபடம்."
    },
    "figureCaption": { "en": "Outer patio ABCD minus inner pool EFGH", "ta": "வெளி நாற்கரம் ABCD − உள் குளம் EFGH" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q9. EN printed p. 212 (PDF p. 218); TA printed p. 219 (PDF p. 225); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 225 } }
  },
  {
    "id": "c10-5-ex5-1-q10",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area Applied to Painting", "ta": "ஆயத்தொலை வடிவியல் — பரப்பு பயன்பாட்டுக் கணக்கு" },
    "label": { "en": "Exercise 5.1 · Q10", "ta": "பயிற்சி 5.1 · வினா 10 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Paint cans needed for triangular glass A(−5, −4), B(1, 6), C(7, −4)" },
    "q": {
      "en": "10. A triangular shaped glass with vertices at A(−5, −4), B(1, 6) and C(7, −4) has to be painted. If one bucket of paint covers 6 square feet, how many buckets of paint will be required to paint the whole glass, if only one coat of paint is applied.",
      "ta": "10. A(−5, −4), B(1, 6) மற்றும் C(7, −4) ஆகியவற்றை முனைப் புள்ளிகளாகக் கொண்ட முக்கோண வடிவக் கண்ணாடிக்கு வர்ணம் பூசப்படுகிறது. 6 சதுர அடி பரப்புக்கு வர்ணம் பூச ஒரு வாளி தேவைப்படுகிறது எனில் கண்ணாடியின் முழுப் பகுதியையும் ஒரு முறை வர்ணம் பூச எத்தனை வாளிகள் தேவைப்படும்?."
    },
    "questionMath": {
      "en": ["10. A triangular shaped glass with vertices at ", { "latex": "A(-5,-4),\\; B(1,6)\\text{ and }C(7,-4)", "fallback": "A(−5, −4), B(1, 6) and C(7, −4)", "display": false }, " has to be painted. If one bucket of paint covers 6 square feet, how many buckets of paint will be required to paint the whole glass, if only one coat of paint is applied."],
      "ta": ["10. ", { "latex": "A(-5,-4),\\; B(1,6)\\text{ மற்றும் }C(7,-4)", "fallback": "A(−5, −4), B(1, 6) மற்றும் C(7, −4)", "display": false }, " ஆகியவற்றை முனைப் புள்ளிகளாகக் கொண்ட முக்கோண வடிவக் கண்ணாடிக்கு வர்ணம் பூசப்படுகிறது. 6 சதுர அடி பரப்புக்கு வர்ணம் பூச ஒரு வாளி தேவைப்படுகிறது எனில் கண்ணாடியின் முழுப் பகுதியையும் ஒரு முறை வர்ணம் பூச எத்தனை வாளிகள் தேவைப்படும்?."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First compute the area of triangular glass ΔABC in square feet, then divide the total area by 6 sq. ft per bucket (can) to get the number of buckets required.",
        "eq": "Buckets needed = Area(ΔABC) / 6",
        "math": { "latex": "\\text{Buckets needed}=\\dfrac{\\text{Area}(\\triangle ABC)}{6}", "fallback": "Buckets needed = Area(ΔABC) / 6", "display": true }
      },
      {
        "en": "Understand Deeply — Notice horizontal base AC: Both A(−5, −4) and C(7, −4) share y = −4, forming a horizontal base of length 7 − (−5) = 12 ft, while B(1, 6) rises 6 − (−4) = 10 ft above it. Ordering counterclockwise A(−5, −4) → C(7, −4) → B(1, 6) or applying |(S₁ − S₂)|/2 yields the exact area 60 sq. feet.",
        "eq": "S₁ = (−5)(−4)+(7)(6)+(1)(−4) = 20+42−4 = 58; S₂ = (−4)(7)+(−4)(1)+(6)(−5) = −28−4−30 = −62; Area = (1/2)|58−(−62)| = 60 sq. ft",
        "math": { "latex": "\\begin{aligned}S_1&=20+42-4=58,\\qquad S_2=-28-4-30=-62\\\\ \\text{Area}(\\triangle ABC)&=\\dfrac{1}{2}|58-(-62)|=\\dfrac{120}{2}=60\\text{ sq. ft}\\end{aligned}", "fallback": "S₁ = (−5)(−4)+(7)(6)+(1)(−4) = 20+42−4 = 58; S₂ = (−4)(7)+(−4)(1)+(6)(−5) = −28−4−30 = −62; Area = (1/2)|58−(−62)| = 60 sq. ft", "display": true }
      },
      {
        "en": "Since 1 bucket (referred to as a can in the answer appendix) covers 6 square feet, divide 60 by 6 to get 10 cans.",
        "eq": "Number of cans = 60 / 6 = 10",
        "math": { "latex": "\\text{Number of buckets (cans)}=\\dfrac{60}{6}=10", "fallback": "Number of cans = 60 / 6 = 10", "display": true }
      }
    ],
    "answer": "10 cans",
    "answerMath": { "latex": "10\\text{ cans}", "fallback": "10 cans", "display": true },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q10. EN printed p. 212 (PDF p. 218); TA printed p. 219 (PDF p. 225); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 225 } }
  },
  {
    "id": "c10-5-ex5-1-q11-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Reading Coordinates from Grid Figure", "ta": "ஆயத்தொலை வடிவியல் — படத்திலிருந்து பரப்பு காணுதல்" },
    "label": { "en": "Exercise 5.1 · Q11(i)", "ta": "பயிற்சி 5.1 · வினா 11(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find the area of triangle AGF from the figure" },
    "q": {
      "en": "11. In the figure, find the area of\n(i) triangle AGF",
      "ta": "11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(i) முக்கோணம் AGF"
    },
    "questionMath": {
      "en": ["11. In the figure, find the area of\n(i) triangle ", { "latex": "AGF", "fallback": "AGF", "display": false }],
      "ta": ["11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(i) முக்கோணம் ", { "latex": "AGF", "fallback": "AGF", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Read vertices A(−5, 3), G(−4.5, 0.5), F(−2, 3) counterclockwise from the grid figure and compute (1/2)|(x₁y₂ + x₂y₃ + x₃y₁) − (y₁x₂ + y₂x₃ + y₃x₁)|.",
        "eq": "A(−5, 3), G(−4.5, 0.5), F(−2, 3)",
        "math": { "latex": "A(-5,3),\\quad G(-4.5,0.5),\\quad F(-2,3)", "fallback": "A(−5, 3), G(−4.5, 0.5), F(−2, 3)", "display": true }
      },
      {
        "en": "Understand Deeply — Notice AF is horizontal at y = 3 from x = −5 to x = −2 (base 3 units), while G sits 2.5 units below it at y = 0.5, giving (1/2) × 3 × 2.5 = 3.75! Let us verify with the coordinate area formula.",
        "eq": "S₁ = (−5)(0.5)+(−4.5)(3)+(−2)(3) = −2.5−13.5−6 = −22; S₂ = 3(−4.5)+0.5(−2)+3(−5) = −13.5−1−15 = −29.5",
        "math": { "latex": "\\begin{aligned}S_1&=(-5)(0.5)+(-4.5)(3)+(-2)(3)=-22\\\\ S_2&=(3)(-4.5)+(0.5)(-2)+(3)(-5)=-29.5\\end{aligned}", "fallback": "S₁ = (−5)(0.5)+(−4.5)(3)+(−2)(3) = −2.5−13.5−6 = −22; S₂ = 3(−4.5)+0.5(−2)+3(−5) = −13.5−1−15 = −29.5", "display": true }
      },
      {
        "en": "Subtract S₂ from S₁ and divide by 2: −22 − (−29.5) = 7.5, and half of 7.5 is 3.75 sq. units.",
        "eq": "Area(ΔAGF) = (1/2)|−22 − (−29.5)| = 7.5/2 = 3.75 sq. units",
        "math": { "latex": "\\text{Area}(\\triangle AGF)=\\dfrac{1}{2}|-22-(-29.5)|=\\dfrac{7.5}{2}=3.75\\text{ sq. units}", "fallback": "Area(ΔAGF) = (1/2)|−22 − (−29.5)| = 7.5/2 = 3.75 sq. units", "display": true }
      }
    ],
    "answer": "3.75 sq. units",
    "answerMath": { "latex": "3.75\\text{ sq. units}", "fallback": "3.75 sq. units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q11-i.svg",
    "figureAlt": {
      "en": "Coordinate grid highlighting triangle AGF formed by A(-5,3), G(-4.5,0.5), and F(-2,3).",
      "ta": "A(-5,3), G(-4.5,0.5), F(-2,3) முக்கோணம் AGF-ஐ சிறப்பித்துக் காட்டும் வரைபடம்."
    },
    "figureCaption": { "en": "Highlighted triangle AGF", "ta": "சிறப்பிக்கப்பட்ட முக்கோணம் AGF" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q11(i). EN printed p. 212 (PDF p. 218); TA printed p. 219 (PDF p. 225); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 225 } }
  },
  {
    "id": "c10-5-ex5-1-q11-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Reading Coordinates from Grid Figure", "ta": "ஆயத்தொலை வடிவியல் — படத்திலிருந்து பரப்பு காணுதல்" },
    "label": { "en": "Exercise 5.1 · Q11(ii)", "ta": "பயிற்சி 5.1 · வினா 11(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find the area of triangle FED from the figure" },
    "q": {
      "en": "11. In the figure, find the area of\n(ii) triangle FED",
      "ta": "11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(ii) முக்கோணம் FED"
    },
    "questionMath": {
      "en": ["11. In the figure, find the area of\n(ii) triangle ", { "latex": "FED", "fallback": "FED", "display": false }],
      "ta": ["11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(ii) முக்கோணம் ", { "latex": "FED", "fallback": "FED", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Read vertices F(−2, 3), E(1.5, 1), D(1, 3) counterclockwise from the figure and apply the coordinate triangle area formula.",
        "eq": "F(−2, 3), E(1.5, 1), D(1, 3)",
        "math": { "latex": "F(-2,3),\\quad E(1.5,1),\\quad D(1,3)", "fallback": "F(−2, 3), E(1.5, 1), D(1, 3)", "display": true }
      },
      {
        "en": "Understand Deeply — Base FD lies horizontally along y = 3 from x = −2 to x = 1 (base 3 units), and E(1.5, 1) sits 2 units below y = 3, giving (1/2) × 3 × 2 = 3. Compute S₁ and S₂ to confirm.",
        "eq": "S₁ = (−2)(1)+(1.5)(3)+(1)(3) = −2+4.5+3 = 5.5; S₂ = 3(1.5)+1(1)+3(−2) = 4.5+1−6 = −0.5",
        "math": { "latex": "\\begin{aligned}S_1&=(-2)(1)+(1.5)(3)+(1)(3)=5.5\\\\ S_2&=(3)(1.5)+(1)(1)+(3)(-2)=-0.5\\end{aligned}", "fallback": "S₁ = (−2)(1)+(1.5)(3)+(1)(3) = −2+4.5+3 = 5.5; S₂ = 3(1.5)+1(1)+3(−2) = 4.5+1−6 = −0.5", "display": true }
      },
      {
        "en": "Subtract −0.5 from 5.5 to get 6, and divide by 2.",
        "eq": "Area(ΔFED) = (1/2)|5.5 − (−0.5)| = 6/2 = 3 sq. units",
        "math": { "latex": "\\text{Area}(\\triangle FED)=\\dfrac{1}{2}|5.5-(-0.5)|=\\dfrac{6}{2}=3\\text{ sq. units}", "fallback": "Area(ΔFED) = (1/2)|5.5 − (−0.5)| = 6/2 = 3 sq. units", "display": true }
      }
    ],
    "answer": "3 sq. units",
    "answerMath": { "latex": "3\\text{ sq. units}", "fallback": "3 sq. units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q11-ii.svg",
    "figureAlt": {
      "en": "Coordinate grid highlighting triangle FED formed by F(-2,3), E(1.5,1), and D(1,3).",
      "ta": "F(-2,3), E(1.5,1), D(1,3) முக்கோணம் FED-ஐ சிறப்பித்துக் காட்டும் வரைபடம்."
    },
    "figureCaption": { "en": "Highlighted triangle FED", "ta": "சிறப்பிக்கப்பட்ட முக்கோணம் FED" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q11(ii). EN printed p. 212 (PDF p. 218); TA printed p. 219 (PDF p. 225); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 225 } }
  },
  {
    "id": "c10-5-ex5-1-q11-iii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.1",
    "topic": { "en": "Coordinate Geometry — Area of Quadrilateral from Grid Figure", "ta": "ஆயத்தொலை வடிவியல் — படத்திலிருந்து நாற்கர பரப்பு" },
    "label": { "en": "Exercise 5.1 · Q11(iii)", "ta": "பயிற்சி 5.1 · வினா 11(iii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find the area of quadrilateral BCEG from the figure" },
    "q": {
      "en": "11. In the figure, find the area of\n(iii) quadrilateral BCEG.",
      "ta": "11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(iii) நாற்கரம் BCEG."
    },
    "questionMath": {
      "en": ["11. In the figure, find the area of\n(iii) quadrilateral ", { "latex": "BCEG", "fallback": "BCEG", "display": false }, "."],
      "ta": ["11. படத்தைப் பயன்படுத்திப் பரப்பைக் காண்க.\n(iii) நாற்கரம் ", { "latex": "BCEG", "fallback": "BCEG", "display": false }, "."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Read vertices B(−4, −2), C(2, −1), E(1.5, 1), G(−4.5, 0.5) in counterclockwise order around BCEG and apply the 4-vertex shoelace area formula.",
        "eq": "B(−4, −2), C(2, −1), E(1.5, 1), G(−4.5, 0.5)",
        "math": { "latex": "B(-4,-2),\\quad C(2,-1),\\quad E(1.5,1),\\quad G(-4.5,0.5)", "fallback": "B(−4, −2), C(2, −1), E(1.5, 1), G(−4.5, 0.5)", "display": true }
      },
      {
        "en": "Understand Deeply — Multiply the four downward cross-products S₁ and the four upward cross-products S₂ carefully, watching decimal decimals (0.5 and 1.5) and signs.",
        "eq": "S₁ = (−4)(−1)+(2)(1)+(1.5)(0.5)+(−4.5)(−2) = 4+2+0.75+9 = 15.75; S₂ = (−2)(2)+(−1)(1.5)+(1)(−4.5)+(0.5)(−4) = −4−1.5−4.5−2 = −12",
        "math": { "latex": "\\begin{aligned}S_1&=(-4)(-1)+(2)(1)+(1.5)(0.5)+(-4.5)(-2)=4+2+0.75+9=15.75\\\\ S_2&=(-2)(2)+(-1)(1.5)+(1)(-4.5)+(0.5)(-4)=-4-1.5-4.5-2=-12\\end{aligned}", "fallback": "S₁ = (−4)(−1)+(2)(1)+(1.5)(0.5)+(−4.5)(−2) = 4+2+0.75+9 = 15.75; S₂ = (−2)(2)+(−1)(1.5)+(1)(−4.5)+(0.5)(−4) = −4−1.5−4.5−2 = −12", "display": true }
      },
      {
        "en": "Subtract −12 from 15.75 to get 27.75, then divide by 2. Exact area is 27.75/2 = 13.875 sq. units, which the textbook rounds to two decimal places as 13.88 sq. units.",
        "eq": "Area(BCEG) = (1/2)|15.75 − (−12)| = 27.75/2 = 13.875 ≈ 13.88 sq. units",
        "math": { "latex": "\\text{Area}(BCEG)=\\dfrac{1}{2}|15.75-(-12)|=\\dfrac{27.75}{2}=13.875\\approx 13.88\\text{ sq. units}", "fallback": "Area(BCEG) = (1/2)|15.75 − (−12)| = 27.75/2 = 13.875 ≈ 13.88 sq. units", "display": true }
      }
    ],
    "answer": "13.88 sq. units",
    "answerMath": { "latex": "13.88\\text{ sq. units}", "fallback": "13.88 sq. units", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-1-q11-iii.svg",
    "figureAlt": {
      "en": "Coordinate grid highlighting quadrilateral BCEG formed by B(-4,-2), C(2,-1), E(1.5,1), and G(-4.5,0.5).",
      "ta": "B(-4,-2), C(2,-1), E(1.5,1), G(-4.5,0.5) நாற்கரம் BCEG-ஐ சிறப்பித்துக் காட்டும் வரைபடம்."
    },
    "figureCaption": { "en": "Highlighted quadrilateral BCEG", "ta": "சிறப்பிக்கப்பட்ட நாற்கரம் BCEG" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.1 Q11(iii). EN printed p. 212 (PDF p. 218); TA printed p. 219 (PDF p. 225); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 218, "ta": 225 } }
  }
];

const grade = window.TRIGGLE_CLASSES[10];
const chapter = window.TRIGGLE_CURRICULUM.grades.find(({ grade }) => grade === 10)
  .chapters.find(({ number }) => number === 5);
chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];
for (const entry of entries) {
  if (grade.items.some(({ id }) => id === entry.id)) throw new Error('Duplicate Grade 10 Coordinate Geometry question: ' + entry.id);
  grade.items.push(entry);
  if (!chapter.textbookQuestionIds.includes(entry.id)) chapter.textbookQuestionIds.push(entry.id);
}
})();
