/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Unit Exercise 5 (Q1–Q10).
 * EN PDF p. 243 (printed p. 237), Answer Appendix PDF p. 347
 * TA PDF pp. 250–251 (printed pp. 244–245), Answer Appendix PDF p. 361
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-unit-q1",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Unit Exercise 5 (Slopes & Side Lengths)",
      "ta": "ஆயத்தொலை வடிவியல் — அலகுப் பயிற்சி 5"
    },
    "label": {
      "en": "Unit Exercise 5 · Q1",
      "ta": "அலகுப் பயிற்சி 5 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Classify midpoint quadrilateral ABCD inside rectangle PQRS"
    },
    "q": {
      "en": "1. PQRS is a rectangle formed by joining the points P(−1,−1), Q(−1,4), R(5,4) and S(5,−1). A, B, C and D are the mid-points of PQ, QR, RS and SP respectively. Is the quadrilateral ABCD a square, a rectangle or a rhombus? Justify your answer.",
      "ta": "1. P(−1,−1), Q(−1,4), R(5,4) மற்றும் S(5,−1) ஆகிய புள்ளிகளால் ஆன செவ்வகம் PQRS-யில் A, B, C மற்றும் D என்பன முறையே பக்கங்கள் PQ, QR, RS மற்றும் SP-யின் நடுப்புள்ளிகள் ஆகும். ABCD என்ற நாற்கரமானது ஒரு சதுரம், செவ்வகம் அல்லது சாய்சதுரமா? உங்கள் விடையைக் காரணத்தோடு விளக்குக."
    },
    "questionMath": {
      "en": [
        "1. ",
        {
          "latex": "PQRS",
          "fallback": "PQRS",
          "display": false
        },
        " is a rectangle formed by joining the points ",
        {
          "latex": "P(-1,-1),\\; Q(-1,4),\\; R(5,4)",
          "fallback": "P(−1,−1), Q(−1,4), R(5,4)",
          "display": false
        },
        " and ",
        {
          "latex": "S(5,-1)",
          "fallback": "S(5,−1)",
          "display": false
        },
        ". ",
        {
          "latex": "A,\\; B,\\; C",
          "fallback": "A, B, C",
          "display": false
        },
        " and ",
        {
          "latex": "D",
          "fallback": "D",
          "display": false
        },
        " are the mid-points of ",
        {
          "latex": "PQ,\\; QR,\\; RS",
          "fallback": "PQ, QR, RS",
          "display": false
        },
        " and ",
        {
          "latex": "SP",
          "fallback": "SP",
          "display": false
        },
        " respectively. Is the quadrilateral ",
        {
          "latex": "ABCD",
          "fallback": "ABCD",
          "display": false
        },
        " a square, a rectangle or a rhombus? Justify your answer."
      ],
      "ta": [
        "1. ",
        {
          "latex": "P(-1,-1),\\; Q(-1,4),\\; R(5,4)",
          "fallback": "P(−1,−1), Q(−1,4), R(5,4)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "S(5,-1)",
          "fallback": "S(5,−1)",
          "display": false
        },
        " ஆகிய புள்ளிகளால் ஆன செவ்வகம் ",
        {
          "latex": "PQRS",
          "fallback": "PQRS",
          "display": false
        },
        "-யில் ",
        {
          "latex": "A,\\; B,\\; C",
          "fallback": "A, B, C",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "D",
          "fallback": "D",
          "display": false
        },
        " என்பன முறையே பக்கங்கள் ",
        {
          "latex": "PQ,\\; QR,\\; RS",
          "fallback": "PQ, QR, RS",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "SP",
          "fallback": "SP",
          "display": false
        },
        "-யின் நடுப்புள்ளிகள் ஆகும். ",
        {
          "latex": "ABCD",
          "fallback": "ABCD",
          "display": false
        },
        " என்ற நாற்கரமானது ஒரு சதுரம், செவ்வகம் அல்லது சாய்சதுரமா? உங்கள் விடையைக் காரணத்தோடு விளக்குக."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find midpoints A(−1, 3/2), B(2, 4), C(5, 3/2), D(2, −1). All four sides have equal length √61/2 and opposite sides are parallel, while adjacent slopes (5/6 and −5/6) are not perpendicular, so ABCD is a rhombus.",
        "eq": "Midpoints: A(−1, 3/2), B(2, 4), C(5, 3/2), D(2, −1)",
        "math": {
          "latex": "A\\left(-1,\\dfrac{3}{2}\\right),\\quad B(2,4),\\quad C\\left(5,\\dfrac{3}{2}\\right),\\quad D(2,-1)",
          "fallback": "Midpoints: A(−1, 3/2), B(2, 4), C(5, 3/2), D(2, −1)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Compute side lengths and slopes: each side changes horizontally by ±3 and vertically by ±5/2, so AB = BC = CD = DA = √(9 + 25/4) = √61/2. Also diagonal AC = 6 while diagonal BD = 5 (unequal), and m_AB·m_BC = (5/6)(−5/6) = −25/36 ≠ −1, proving it is not a square or rectangle, only a rhombus.",
        "eq": "AB = BC = CD = DA = √61/2; m_AB·m_BC = −25/36 ≠ −1 (or AC = 6 ≠ BD = 5), so ABCD is a Rhombus",
        "math": {
          "latex": "\\begin{aligned} AB &= BC = CD = DA = \\sqrt{3^2 + \\left(\\dfrac{5}{2}\\right)^2} = \\dfrac{\\sqrt{61}}{2} \\\\ AC &= 6 \\neq BD = 5 \\quad\\text{and}\\quad m_{AB}\\cdot m_{BC} = -\\dfrac{25}{36}\\neq -1\\quad(\\text{Rhombus}) \\end{aligned}",
          "fallback": "AB = BC = CD = DA = √61/2; m_AB·m_BC = −25/36 ≠ −1 (or AC = 6 ≠ BD = 5), so ABCD is a Rhombus",
          "display": true
        }
      }
    ],
    "answer": "Rhombus",
    "answerMath": {
      "latex": "\\text{Rhombus}",
      "fallback": "Rhombus",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q1. EN printed p. 237 (PDF p. 243); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 250
      }
    },
    "figureSrc": "assets/grade10-ch5/ex5-unit-q1.svg"
  },
  {
    "id": "c10-5-unit-q2",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Area of Triangle",
      "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் பரப்பு"
    },
    "label": {
      "en": "Unit Exercise 5 · Q2",
      "ta": "அலகுப் பயிற்சி 5 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Third vertex of triangle with area 5 lying on y = x + 3"
    },
    "q": {
      "en": "2. The area of a triangle is 5 sq.units. Two of its vertices are (2,1) and (3, −2). The third vertex is (x, y) where y = x + 3. Find the coordinates of the third vertex.",
      "ta": "2. ஒரு முக்கோணத்தின் பரப்பு 5 ச. அலகுகள். (2,1) மற்றும் (3, −2) என்பன முக்கோணத்தின் இரண்டு முனைப் புள்ளிகள் ஆகும். மூன்றாம் முனைப் புள்ளி (x, y) என்பதில் y = x + 3 என இருந்தால் அப்புள்ளியைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. The area of a triangle is ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " sq.units. Two of its vertices are ",
        {
          "latex": "(2,1)",
          "fallback": "(2,1)",
          "display": false
        },
        " and ",
        {
          "latex": "(3,-2)",
          "fallback": "(3, −2)",
          "display": false
        },
        ". The third vertex is ",
        {
          "latex": "(x,\\; y)",
          "fallback": "(x, y)",
          "display": false
        },
        " where ",
        {
          "latex": "y = x + 3",
          "fallback": "y = x + 3",
          "display": false
        },
        ". Find the coordinates of the third vertex."
      ],
      "ta": [
        "2. ஒரு முக்கோணத்தின் பரப்பு ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " ச. அலகுகள். ",
        {
          "latex": "(2,1)",
          "fallback": "(2,1)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(3,-2)",
          "fallback": "(3, −2)",
          "display": false
        },
        " என்பன முக்கோணத்தின் இரண்டு முனைப் புள்ளிகள் ஆகும். மூன்றாம் முனைப் புள்ளி ",
        {
          "latex": "(x,\\; y)",
          "fallback": "(x, y)",
          "display": false
        },
        " என்பதில் ",
        {
          "latex": "y = x + 3",
          "fallback": "y = x + 3",
          "display": false
        },
        " என இருந்தால் அப்புள்ளியைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the triangle area formula to (2, 1), (3, −2), and (x, y) to get |(3x + y − 7)/2| = 5. Substituting y = x + 3 yields |4x − 4| = 10, giving textbook counter-clockwise vertex (7/2, 13/2) (and opposite-orientation vertex (−3/2, 3/2)).",
        "eq": "(1/2)|[2(−2) + 3y + x] − [3 + (−2x) + 2y]| = 5 gives |3x + y − 7| = 10",
        "math": {
          "latex": "\\dfrac{1}{2}\\big|(2(-2)+3y+x)-(1(3)-2x+2y)\\big| = 5\\quad\\text{gives}\\quad |3x+y-7| = 10",
          "fallback": "(1/2)|[2(−2) + 3y + x] − [3 + (−2x) + 2y]| = 5 gives |3x + y − 7| = 10",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Replace y by x + 3 inside 3x + y − 7 to obtain 4x − 4. Taking the positive branch 4x − 4 = 10 gives x = 14/4 = 7/2 and y = 7/2 + 3 = 13/2, so (7/2, 13/2). (The negative branch 4x − 4 = −10 also yields (−3/2, 3/2) in reversed orientation.)",
        "eq": "4x − 4 = 10 gives x = 7/2, y = 13/2 giving (7/2, 13/2) (opposite sign branch: (−3/2, 3/2))",
        "math": {
          "latex": "\\begin{aligned} 3x + (x+3) - 7 &= 10 \\\\ 4x - 4 &= 10\\quad\\text{gives}\\quad x = \\dfrac{7}{2},\\quad y = \\dfrac{7}{2} + 3 = \\dfrac{13}{2} \\end{aligned}",
          "fallback": "4x − 4 = 10 gives x = 7/2, y = 13/2 giving (7/2, 13/2) (opposite sign branch: (−3/2, 3/2))",
          "display": true
        }
      }
    ],
    "answer": "(7/2, 13/2)",
    "answerMath": {
      "latex": "\\left(\\dfrac{7}{2},\\;\\dfrac{13}{2}\\right)",
      "fallback": "(7/2, 13/2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q2. EN printed p. 237 (PDF p. 243); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-unit-q3",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Concurrent Lines & Zero Area",
      "ta": "ஆயத்தொலை வடிவியல் — ஒரு புள்ளி வழிக் கோடுகள்"
    },
    "label": {
      "en": "Unit Exercise 5 · Q3",
      "ta": "அலகுப் பயிற்சி 5 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Area of triangle bounded by three lines 3x+y−2=0, 5x+2y−3=0, 2x−y−3=0"
    },
    "q": {
      "en": "3. Find the area of a triangle formed by the lines 3x + y − 2 = 0, 5x + 2y − 3 = 0 and 2x − y − 3 = 0",
      "ta": "3. 3x + y − 2 = 0, 5x + 2y − 3 = 0 மற்றும் 2x − y − 3 = 0 ஆகிய கோடுகளால்அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க."
    },
    "questionMath": {
      "en": [
        "3. Find the area of a triangle formed by the lines ",
        {
          "latex": "3x+y-2=0",
          "fallback": "3x + y − 2 = 0",
          "display": false
        },
        ", ",
        {
          "latex": "5x+2y-3=0",
          "fallback": "5x + 2y − 3 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "2x-y-3=0",
          "fallback": "2x − y − 3 = 0",
          "display": false
        }
      ],
      "ta": [
        "3. ",
        {
          "latex": "3x+y-2=0",
          "fallback": "3x + y − 2 = 0",
          "display": false
        },
        ", ",
        {
          "latex": "5x+2y-3=0",
          "fallback": "5x + 2y − 3 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "2x-y-3=0",
          "fallback": "2x − y − 3 = 0",
          "display": false
        },
        " ஆகிய கோடுகளால்அமைக்கப்படும் முக்கோணத்தின் பரப்பு காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find the pairwise intersections of the three lines. All three intersect at the exact same point (1, −1) — they are concurrent, forming no triangle, so the area is 0 sq.units.",
        "eq": "Solving (3x + y − 2 = 0) and (2x − y − 3 = 0) gives 5x − 5 = 0, so (1, −1)",
        "math": {
          "latex": "\\begin{aligned} (3x+y-2)+(2x-y-3) &= 0 \\\\ 5x - 5 = 0\\quad\\text{gives}\\quad x &= 1,\\; y = -1 \\end{aligned}",
          "fallback": "Solving (3x + y − 2 = 0) and (2x − y − 3 = 0) gives 5x − 5 = 0, so (1, −1)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Check whether (1, −1) satisfies the remaining line 5x + 2y − 3 = 0: 5(1) + 2(−1) − 3 = 0. Because all three lines meet at one common vertex (1, −1), all three vertices coincide and the enclosed area is 0 sq.units.",
        "eq": "Check 5(1) + 2(−1) − 3 = 0: all three lines meet at (1, −1), so Area = 0 sq.units",
        "math": {
          "latex": "5(1)+2(-1)-3 = 0\\quad\\text{gives Area} = 0\\;\\text{sq.units}",
          "fallback": "Check 5(1) + 2(−1) − 3 = 0: all three lines meet at (1, −1), so Area = 0 sq.units",
          "display": true
        }
      }
    ],
    "answer": "0 sq.units",
    "answerMath": {
      "latex": "0\\text{ sq.units}",
      "fallback": "0 sq.units",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q3. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q4",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Area of Quadrilateral",
      "ta": "ஆயத்தொலை வடிவியல் — நாற்கரத்தின் பரப்பு"
    },
    "label": {
      "en": "Unit Exercise 5 · Q4",
      "ta": "அலகுப் பயிற்சி 5 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Value of k given quadrilateral area 72 sq.units"
    },
    "q": {
      "en": "4. If vertices of a quadrilateral are at A(−5,7), B(−4,k), C(−1,−6) and D(4,5) and its area is 72 sq.units. Find the value of k.",
      "ta": "4. A(−5,7), B(−4,k), C(−1,−6) மற்றும் D(4,5) ஆகியவற்றை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பு 72 ச. அலகுகள் எனில், k-யின் மதிப்பைக் காண்க."
    },
    "questionMath": {
      "en": [
        "4. If vertices of a quadrilateral are at ",
        {
          "latex": "A(-5,7),\\; B(-4,k),\\; C(-1,-6)",
          "fallback": "A(−5,7), B(−4,k), C(−1,−6)",
          "display": false
        },
        " and ",
        {
          "latex": "D(4,5)",
          "fallback": "D(4,5)",
          "display": false
        },
        " and its area is ",
        {
          "latex": "72",
          "fallback": "72",
          "display": false
        },
        " sq.units. Find the value of ",
        {
          "latex": "k",
          "fallback": "k",
          "display": false
        },
        "."
      ],
      "ta": [
        "4. ",
        {
          "latex": "A(-5,7),\\; B(-4,k),\\; C(-1,-6)",
          "fallback": "A(−5,7), B(−4,k), C(−1,−6)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "D(4,5)",
          "fallback": "D(4,5)",
          "display": false
        },
        " ஆகியவற்றை முனைகளாகக் கொண்ட நாற்கரத்தின் பரப்பு ",
        {
          "latex": "72",
          "fallback": "72",
          "display": false
        },
        " ச. அலகுகள் எனில், ",
        {
          "latex": "k",
          "fallback": "k",
          "display": false
        },
        "-யின் மதிப்பைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the quadrilateral shoelace area formula to A(−5, 7), B(−4, k), C(−1, −6), D(4, 5) in counter-clockwise order: (1/2)[(−5k + 24 − 5 + 28) − (−28 − k − 24 − 25)] = 72, giving k = −5.",
        "eq": "(1/2)[(47 − 5k) − (−77 − k)] = 72 gives 124 − 4k = 144",
        "math": {
          "latex": "\\begin{aligned} \\dfrac{1}{2}\\big[(-5k+24-5+28)-(-28-k-24-25)\\big] &= 72 \\\\ (47-5k) - (-77-k) &= 144 \\\\ 124 - 4k &= 144 \\end{aligned}",
          "fallback": "(1/2)[(47 − 5k) − (−77 − k)] = 72 gives 124 − 4k = 144",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Solve 124 − 4k = 144: subtracting 124 gives −4k = 20, so k = −5 (keeping vertices A, B, C, D strictly in counter-clockwise order).",
        "eq": "−4k = 20 gives k = −5",
        "math": {
          "latex": "-4k = 20\\quad\\text{gives}\\quad k = -5",
          "fallback": "−4k = 20 gives k = −5",
          "display": true
        }
      }
    ],
    "answer": "−5",
    "answerMath": {
      "latex": "k = -5",
      "fallback": "−5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q4. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q5",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Parallelogram via Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — சாய்வின் மூலம் இணைகரம்"
    },
    "label": {
      "en": "Unit Exercise 5 · Q5",
      "ta": "அலகுப் பயிற்சி 5 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove vertices form a parallelogram without distance formula"
    },
    "q": {
      "en": "5. Without using distance formula, show that the points (−2,−1) , (4,0), (3,3) and (−3,2) are vertices of a parallelogram.",
      "ta": "5. தொலைவு காணும் சூத்திரத்தைப் பயன்படுத்தாமல், (−2,−1), (4,0), (3,3) மற்றும் (−3,2) என்பன இணைகரத்தின் முனைப் புள்ளிகள் எனக் காட்டுக."
    },
    "questionMath": {
      "en": [
        "5. Without using distance formula, show that the points ",
        {
          "latex": "(-2,-1)\\; ,\\; (4,0),\\; (3,3)",
          "fallback": "(−2,−1) , (4,0), (3,3)",
          "display": false
        },
        " and ",
        {
          "latex": "(-3,2)",
          "fallback": "(−3,2)",
          "display": false
        },
        " are vertices of a parallelogram."
      ],
      "ta": [
        "5. தொலைவு காணும் சூத்திரத்தைப் பயன்படுத்தாமல், ",
        {
          "latex": "(-2,-1),\\;(4,0),\\;(3,3)",
          "fallback": "(−2,−1), (4,0), (3,3)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(-3,2)",
          "fallback": "(−3,2)",
          "display": false
        },
        " என்பன இணைகரத்தின் முனைப் புள்ளிகள் எனக் காட்டுக."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Label A(−2, −1), B(4, 0), C(3, 3), D(−3, 2) and use slopes (avoiding distance formula). Since slope of AB equals slope of CD (1/6) and slope of BC equals slope of DA (−3), both pairs of opposite sides are parallel, so ABCD is a parallelogram.",
        "eq": "m_AB = (0 − (−1))/(4 − (−2)) = 1/6 and m_CD = (2 − 3)/(−3 − 3) = 1/6",
        "math": {
          "latex": "m_{AB} = \\dfrac{0-(-1)}{4-(-2)} = \\dfrac{1}{6},\\qquad m_{CD} = \\dfrac{2-3}{-3-3} = \\dfrac{1}{6}",
          "fallback": "m_AB = (0 − (−1))/(4 − (−2)) = 1/6 and m_CD = (2 − 3)/(−3 − 3) = 1/6",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Next check the other pair of opposite sides: m_BC = (3 − 0)/(3 − 4) = −3 and m_DA = (−1 − 2)/(−2 − (−3)) = −3. Because m_AB = m_CD and m_BC = m_DA (with midpoint of AC and BD both at (1/2, 1)), opposite sides are parallel and ABCD is a parallelogram.",
        "eq": "m_BC = −3 = m_DA confirms AB ∥ CD and BC ∥ DA (Parallelogram)",
        "math": {
          "latex": "m_{BC} = \\dfrac{3-0}{3-4} = -3,\\qquad m_{DA} = \\dfrac{-1-2}{-2-(-3)} = -3\\quad(\\text{Parallelogram})",
          "fallback": "m_BC = −3 = m_DA confirms AB ∥ CD and BC ∥ DA (Parallelogram)",
          "display": true
        }
      }
    ],
    "answer": "Opposite sides have equal slopes (m_AB = m_CD = 1/6 and m_BC = m_DA = −3), so ABCD is a parallelogram.",
    "answerMath": {
      "latex": "m_{AB}=m_{CD}=\\dfrac{1}{6},\\;\\; m_{BC}=m_{DA}=-3\\quad(\\text{Parallelogram})",
      "fallback": "Opposite sides have equal slopes (m_AB = m_CD = 1/6 and m_BC = m_DA = −3), so ABCD is a parallelogram.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q5. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q6",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Intercept Form",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டு வடிவம்"
    },
    "label": {
      "en": "Unit Exercise 5 · Q6",
      "ta": "அலகுப் பயிற்சி 5 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Equations of lines whose intercepts have sum 1 and product −6"
    },
    "q": {
      "en": "6. Find the equations of the lines, whose sum and product of intercepts are 1 and −6 respectively.",
      "ta": "6. இரு வெட்டுத்துண்டுகளின் கூடுதல் மற்றும் அவற்றின் பெருக்கற்பலன் முறையே 1, −6 எனில், நேர்க்கோடுகளின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. Find the equations of the lines, whose sum and product of intercepts are ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        " and ",
        {
          "latex": "-6",
          "fallback": "−6",
          "display": false
        },
        " respectively."
      ],
      "ta": [
        "6. இரு வெட்டுத்துண்டுகளின் கூடுதல் மற்றும் அவற்றின் பெருக்கற்பலன் முறையே ",
        {
          "latex": "1,\\;-6",
          "fallback": "1, −6",
          "display": false
        },
        " எனில், நேர்க்கோடுகளின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let x-intercept = a and y-intercept = b. Solving a + b = 1 and ab = −6 gives {a, b} = {3, −2}. Substituting both ordered pairs (3, −2) and (−2, 3) into x/a + y/b = 1 yields 2x − 3y − 6 = 0 and 3x − 2y + 6 = 0.",
        "eq": "a + b = 1 and ab = −6 gives a(1 − a) = −6, so a² − a − 6 = 0 gives a = 3 or a = −2",
        "math": {
          "latex": "\\begin{aligned} a + b &= 1,\\quad ab = -6 \\\\ a(1-a) &= -6\\quad\\text{gives}\\quad a^2 - a - 6 = 0 \\\\ (a-3)(a+2) &= 0\\quad\\text{gives}\\quad (a,b) = (3,-2)\\;\\text{or}\\;(-2,3) \\end{aligned}",
          "fallback": "a + b = 1 and ab = −6 gives a(1 − a) = −6, so a² − a − 6 = 0 gives a = 3 or a = −2",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Insert each (a, b) pair into intercept form x/a + y/b = 1 and clear the denominator 6.",
        "eq": "Case 1 (3, −2): x/3 + y/(−2) = 1 gives 2x − 3y − 6 = 0; Case 2 (−2, 3): −x/2 + y/3 = 1 gives 3x − 2y + 6 = 0",
        "math": {
          "latex": "\\begin{aligned} \\text{Case 1 } (3,-2):\\quad \\dfrac{x}{3} + \\dfrac{y}{-2} &= 1\\quad\\text{gives}\\quad 2x - 3y - 6 = 0 \\\\ \\text{Case 2 } (-2,3):\\quad \\dfrac{x}{-2} + \\dfrac{y}{3} &= 1\\quad\\text{gives}\\quad 3x - 2y + 6 = 0 \\end{aligned}",
          "fallback": "Case 1 (3, −2): x/3 + y/(−2) = 1 gives 2x − 3y − 6 = 0; Case 2 (−2, 3): −x/2 + y/3 = 1 gives 3x − 2y + 6 = 0",
          "display": true
        }
      }
    ],
    "answer": "2x − 3y − 6 = 0, 3x − 2y + 6 = 0",
    "answerMath": {
      "latex": "2x - 3y - 6 = 0,\\quad 3x - 2y + 6 = 0",
      "fallback": "2x − 3y − 6 = 0, 3x − 2y + 6 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q6. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q7",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Linear Applications",
      "ta": "ஆயத்தொலை வடிவியல் — நேரிய சமன்பாட்டுப் பயன்பாடுகள்"
    },
    "label": {
      "en": "Unit Exercise 5 · Q7",
      "ta": "அலகுப் பயிற்சி 5 · வினா 7 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Linear price-demand model for weekly milk sales"
    },
    "q": {
      "en": "7. The owner of a milk store finds that, he can sell 980 litres of milk each week at ₹14/litre and 1220 litres of milk each week at ₹16/litre. Assuming a linear relationship between selling price and demand, how many litres could he sell weekly at ₹17/litre?",
      "ta": "7. ஒரு பால்கடை உரிமையாளர் 1 லிட்டர் ₹16 வீதம் ஒரு வாரத்திற்கு 1220 லிட்டரும், 1 லிட்டர் ₹14 வீதம் ஒரு வாரத்திற்கு 980 லிட்டரும் விற்பனை செய்கிறார். விற்பனை விலையானது தேவையோடு நேரிய தொடர்பு உடையது என ஊகித்துக் கொண்டால், 1 லிட்டர், ₹17 வீதம் ஒரு வாரத்திற்கு எத்தனை லிட்டர் விற்பனை செய்வார்?"
    },
    "questionMath": {
      "en": [
        "7. The owner of a milk store finds that, he can sell ",
        {
          "latex": "980",
          "fallback": "980",
          "display": false
        },
        " litres of milk each week at ",
        "₹14",
        "/litre and ",
        {
          "latex": "1220",
          "fallback": "1220",
          "display": false
        },
        " litres of milk each week at ",
        "₹16",
        "/litre. Assuming a linear relationship between selling price and demand, how many litres could he sell weekly at ",
        "₹17",
        "/litre?"
      ],
      "ta": [
        "7. ஒரு பால்கடை உரிமையாளர் ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        " லிட்டர் ",
        "₹16",
        " வீதம் ஒரு வாரத்திற்கு ",
        {
          "latex": "1220",
          "fallback": "1220",
          "display": false
        },
        " லிட்டரும், ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        " லிட்டர் ",
        "₹14",
        " வீதம் ஒரு வாரத்திற்கு ",
        {
          "latex": "980",
          "fallback": "980",
          "display": false
        },
        " லிட்டரும் விற்பனை செய்கிறார். விற்பனை விலையானது தேவையோடு நேரிய தொடர்பு உடையது என ஊகித்துக் கொண்டால், ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        " லிட்டர், ",
        "₹17",
        " வீதம் ஒரு வாரத்திற்கு எத்தனை லிட்டர் விற்பனை செய்வார்?"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Treat (price x, litres y) as points (14, 980) and (16, 1220). Constant rate of change is (1220 − 980)/(16 − 14) = 120 litres per rupee, so at x = 17, y = 1220 + 120 = 1340 litres.",
        "eq": "Slope m = (1220 − 980)/(16 − 14) = 240/2 = 120",
        "math": {
          "latex": "m = \\dfrac{1220 - 980}{16 - 14} = \\dfrac{240}{2} = 120",
          "fallback": "Slope m = (1220 − 980)/(16 − 14) = 240/2 = 120",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Form the linear equation y − 980 = 120(x − 14), giving y = 120x − 700, and evaluate at x = 17.",
        "eq": "y = 120(17) − 700 = 2040 − 700 = 1340 litres",
        "math": {
          "latex": "\\begin{aligned} y - 980 &= 120(x - 14) \\\\ \\text{At } x = 17:\\quad y &= 980 + 120(3) = 1340\\;\\text{litres} \\end{aligned}",
          "fallback": "y = 120(17) − 700 = 2040 − 700 = 1340 litres",
          "display": true
        }
      }
    ],
    "answer": "1340 litres",
    "answerMath": {
      "latex": "1340\\text{ litres}",
      "fallback": "1340 litres",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q7. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q8",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Reflection Image Across a Line",
      "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டில் பிம்பப் புள்ளி"
    },
    "label": {
      "en": "Unit Exercise 5 · Q8",
      "ta": "அலகுப் பயிற்சி 5 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Reflection image of (3, 8) across plane mirror x + 3y = 7"
    },
    "q": {
      "en": "8. Find the image of the point (3,8) with respect to the line x + 3y = 7 assuming the line to be a plane mirror.",
      "ta": "8. x + 3y = 7 என்ற நேர்க்கோட்டினைச் சமதள ஆடியாகக் கொண்டு (3,8) என்ற புள்ளியின் பிம்பப் புள்ளியைக் காண்க."
    },
    "questionMath": {
      "en": [
        "8. Find the image of the point ",
        {
          "latex": "(3,8)",
          "fallback": "(3,8)",
          "display": false
        },
        " with respect to the line ",
        {
          "latex": "x+3y=7",
          "fallback": "x + 3y = 7",
          "display": false
        },
        " assuming the line to be a plane mirror."
      ],
      "ta": [
        "8. ",
        {
          "latex": "x+3y=7",
          "fallback": "x + 3y = 7",
          "display": false
        },
        " என்ற நேர்க்கோட்டினைச் சமதள ஆடியாகக் கொண்டு ",
        {
          "latex": "(3,8)",
          "fallback": "(3,8)",
          "display": false
        },
        " என்ற புள்ளியின் பிம்பப் புள்ளியைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Drop a perpendicular from P(3, 8) to mirror x + 3y = 7 (line 3x − y = 1), meeting the mirror at foot M(1, 2). Since M is the midpoint of object P(3, 8) and its image Q(h, k), we obtain Q(−1, −4).",
        "eq": "Perpendicular line through (3, 8) to x + 3y = 7 is 3x − y = 1",
        "math": {
          "latex": "\\begin{aligned} \\text{Mirror slope } &= -\\dfrac{1}{3}\\quad\\text{gives perpendicular slope } = 3 \\\\ y - 8 &= 3(x - 3)\\quad\\text{gives}\\quad 3x - y = 1 \\end{aligned}",
          "fallback": "Perpendicular line through (3, 8) to x + 3y = 7 is 3x − y = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Solve x + 3y = 7 and 3x − y = 1 together: x + 3(3x − 1) = 7 gives 10x = 10, so foot M = (1, 2). Equating M to the midpoint of P(3, 8) and Q(h, k) gives (3 + h)/2 = 1 and (8 + k)/2 = 2, hence image Q = (−1, −4).",
        "eq": "Foot M = (1, 2); midpoint rule gives h = 2(1) − 3 = −1, k = 2(2) − 8 = −4 giving (−1, −4)",
        "math": {
          "latex": "\\begin{aligned} x + 3(3x-1) &= 7\\quad\\text{gives}\\quad M(1,2) \\\\ \\left(\\dfrac{3+h}{2},\\;\\dfrac{8+k}{2}\\right) &= (1,2)\\quad\\text{gives}\\quad (h,k) = (-1,-4) \\end{aligned}",
          "fallback": "Foot M = (1, 2); midpoint rule gives h = 2(1) − 3 = −1, k = 2(2) − 8 = −4 giving (−1, −4)",
          "display": true
        }
      }
    ],
    "answer": "(−1, −4)",
    "answerMath": {
      "latex": "(-1,-4)",
      "fallback": "(−1, −4)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q8. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    },
    "figureSrc": "assets/grade10-ch5/ex5-unit-q8.svg"
  },
  {
    "id": "c10-5-unit-q9",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Equal-Intercept Line Through Intersection",
      "ta": "ஆயத்தொலை வடிவியல் — சம வெட்டுத்துண்டு நேர்க்கோடு"
    },
    "label": {
      "en": "Unit Exercise 5 · Q9",
      "ta": "அலகுப் பயிற்சி 5 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through intersection of 4x+7y−3=0 and 2x−3y+1=0 with equal intercepts"
    },
    "q": {
      "en": "9. Find the equation of a line passing through the point of intersection of the lines 4x + 7y − 3 = 0 and 2x − 3y + 1 = 0 that has equal intercepts on the axes.",
      "ta": "9. 4x + 7y − 3 = 0 மற்றும் 2x − 3y + 1 = 0 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும், ஆய அச்சுகளின் வெட்டுத் துண்டுகள் சமமானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "9. Find the equation of a line passing through the point of intersection of the lines ",
        {
          "latex": "4x+7y-3=0",
          "fallback": "4x + 7y − 3 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "2x-3y+1=0",
          "fallback": "2x − 3y + 1 = 0",
          "display": false
        },
        " that has equal intercepts on the axes."
      ],
      "ta": [
        "9. ",
        {
          "latex": "4x+7y-3=0",
          "fallback": "4x + 7y − 3 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "2x-3y+1=0",
          "fallback": "2x − 3y + 1 = 0",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும், ஆய அச்சுகளின் வெட்டுத் துண்டுகள் சமமானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Eliminate x between 4x + 7y − 3 = 0 and 2x − 3y + 1 = 0 to find intersection P(1/13, 5/13). Equal intercepts (a = b) means x + y = a; plugging in P gives 1/13 + 5/13 = 6/13, hence 13x + 13y − 6 = 0.",
        "eq": "(4x + 7y − 3) − 2(2x − 3y + 1) = 0 gives 13y = 5, so y = 5/13, x = 1/13",
        "math": {
          "latex": "\\begin{aligned} (4x+7y-3) - 2(2x-3y+1) &= 0 \\\\ 13y - 5 &= 0\\quad\\text{gives}\\quad y = \\dfrac{5}{13},\\qquad x = \\dfrac{3(5/13)-1}{2} = \\dfrac{1}{13} \\end{aligned}",
          "fallback": "(4x + 7y − 3) − 2(2x − 3y + 1) = 0 gives 13y = 5, so y = 5/13, x = 1/13",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Write the equal-intercept line x/a + y/a = 1 as x + y = a, substitute (1/13, 5/13), and multiply through by 13.",
        "eq": "x + y = 1/13 + 5/13 = 6/13 gives 13x + 13y − 6 = 0",
        "math": {
          "latex": "\\begin{aligned} x + y &= \\dfrac{1}{13} + \\dfrac{5}{13} = \\dfrac{6}{13} \\\\ 13x + 13y - 6 &= 0 \\end{aligned}",
          "fallback": "x + y = 1/13 + 5/13 = 6/13 gives 13x + 13y − 6 = 0",
          "display": true
        }
      }
    ],
    "answer": "13x + 13y − 6 = 0",
    "answerMath": {
      "latex": "13x + 13y - 6 = 0",
      "fallback": "13x + 13y − 6 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q9. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    }
  },
  {
    "id": "c10-5-unit-q10",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.unit",
    "topic": {
      "en": "Coordinate Geometry — Shortest Perpendicular Path",
      "ta": "ஆயத்தொலை வடிவியல் — குறுகிய செங்குத்துப் பாதை"
    },
    "label": {
      "en": "Unit Exercise 5 · Q10",
      "ta": "அலகுப் பயிற்சி 5 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Least-time perpendicular path from junction to 6x − 7y + 8 = 0"
    },
    "q": {
      "en": "10. A person standing at a junction (crossing) of two straight paths represented by the equations 2x − 3y + 4 = 0 and 3x + 4y − 5 = 0 seek to reach the path whose equation is 6x − 7y + 8 = 0 in the least time. Find the equation of the path that he should follow.",
      "ta": "10. 2x − 3y + 4 = 0 மற்றும் 3x + 4y − 5 = 0 என்ற நேர்க்கோடுகளால் குறிக்கப்படும் இரண்டு பாதைகள் சந்திக்கும் புள்ளியில் நிற்கும் ஒருவர் 6x − 7y + 8 = 0 என்ற நேர்க்கோட்டால் குறிக்கப்படும் பாதையைக் குறுகிய நேரத்தில் சென்றடைய விரும்புகிறார் எனில், அவர் செல்ல வேண்டிய பாதையின் சமன்பாட்டினைக் காண்க."
    },
    "questionMath": {
      "en": [
        "10. A person standing at a junction (crossing) of two straight paths represented by the equations ",
        {
          "latex": "2x-3y+4=0",
          "fallback": "2x − 3y + 4 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "3x+4y-5=0",
          "fallback": "3x + 4y − 5 = 0",
          "display": false
        },
        " seek to reach the path whose equation is ",
        {
          "latex": "6x-7y+8=0",
          "fallback": "6x − 7y + 8 = 0",
          "display": false
        },
        " in the least time. Find the equation of the path that he should follow."
      ],
      "ta": [
        "10. ",
        {
          "latex": "2x-3y+4=0",
          "fallback": "2x − 3y + 4 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "3x+4y-5=0",
          "fallback": "3x + 4y − 5 = 0",
          "display": false
        },
        " என்ற நேர்க்கோடுகளால் குறிக்கப்படும் இரண்டு பாதைகள் சந்திக்கும் புள்ளியில் நிற்கும் ஒருவர் ",
        {
          "latex": "6x-7y+8=0",
          "fallback": "6x − 7y + 8 = 0",
          "display": false
        },
        " என்ற நேர்க்கோட்டால் குறிக்கப்படும் பாதையைக் குறுகிய நேரத்தில் சென்றடைய விரும்புகிறார் எனில், அவர் செல்ல வேண்டிய பாதையின் சமன்பாட்டினைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First find the person's standing point by solving 2x − 3y + 4 = 0 and 3x + 4y − 5 = 0 to get (−1/17, 22/17). Least time means shortest distance, i.e., moving perpendicular to 6x − 7y + 8 = 0 along 7x + 6y + k = 0, yielding 119x + 102y − 125 = 0.",
        "eq": "4(2x − 3y + 4) + 3(3x + 4y − 5) = 0 gives 17x + 1 = 0 giving (−1/17, 22/17)",
        "math": {
          "latex": "\\begin{aligned} 4(2x-3y+4) + 3(3x+4y-5) &= 0 \\\\ 17x + 1 &= 0\\quad\\text{gives}\\quad x = -\\dfrac{1}{17},\\qquad y = \\dfrac{2(-1/17)+4}{3} = \\dfrac{22}{17} \\end{aligned}",
          "fallback": "4(2x − 3y + 4) + 3(3x + 4y − 5) = 0 gives 17x + 1 = 0 giving (−1/17, 22/17)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — The shortest line segment from a point to a line meets that target line at 90°. Any line perpendicular to 6x − 7y + 8 = 0 has equation 7x + 6y + k = 0. Plug in (−1/17, 22/17) and multiply through by 17.",
        "eq": "7(−1/17) + 6(22/17) + k = 0 gives k = −125/17, so 119x + 102y − 125 = 0",
        "math": {
          "latex": "\\begin{aligned} 7x + 6y + k &= 0 \\\\ 7\\left(-\\dfrac{1}{17}\\right) + 6\\left(\\dfrac{22}{17}\\right) + k &= 0\\quad\\text{gives}\\quad \\dfrac{125}{17} + k = 0,\\quad k = -\\dfrac{125}{17} \\\\ 7x + 6y - \\dfrac{125}{17} &= 0\\quad\\text{gives}\\quad 119x + 102y - 125 = 0 \\end{aligned}",
          "fallback": "7(−1/17) + 6(22/17) + k = 0 gives k = −125/17, so 119x + 102y − 125 = 0",
          "display": true
        }
      }
    ],
    "answer": "119x + 102y − 125 = 0",
    "answerMath": {
      "latex": "119x + 102y - 125 = 0",
      "fallback": "119x + 102y − 125 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 5 Q10. EN printed p. 237 (PDF p. 243); TA printed p. 245 (PDF p. 251); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 243,
        "ta": 251
      }
    },
    "figureSrc": "assets/grade10-ch5/ex5-unit-q10.svg"
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
