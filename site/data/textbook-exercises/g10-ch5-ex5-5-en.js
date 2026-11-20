/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Exercise 5.5 MCQs (Q1–Q15).
 * EN PDF pp. 241–242 (printed pp. 235–236), Answer Appendix PDF p. 347
 * TA PDF pp. 249–250 (printed pp. 243–244), Answer Appendix PDF p. 361
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-ex5-5-q1",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Triangle Area (MCQ)",
      "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் பரப்பு"
    },
    "label": {
      "en": "Exercise 5.5 · Q1",
      "ta": "பயிற்சி 5.5 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Area of triangle formed by (−5, 0), (0, −5) and (5, 0)"
    },
    "q": {
      "en": "1. The area of triangle formed by the points (−5,0) , (0,−5) and (5,0) is\n(A) 0 sq.units   (B) 25 sq.units   (C) 5 sq.units   (D) none of these",
      "ta": "1. (−5,0) , (0,−5) மற்றும் (5,0) ஆகிய புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு\n(அ) 0 ச.அலகுகள்   (ஆ) 25 ச.அலகுகள்   (இ) 5 ச.அலகுகள்   (ஈ) எதுவுமில்லை"
    },
    "questionMath": {
      "en": [
        "1. The area of triangle formed by the points ",
        {
          "latex": "(-5,0)\\; ,\\; (0,-5)",
          "fallback": "(−5,0) , (0,−5)",
          "display": false
        },
        " and ",
        {
          "latex": "(5,0)",
          "fallback": "(5,0)",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        },
        " sq.units   (B) ",
        {
          "latex": "25",
          "fallback": "25",
          "display": false
        },
        " sq.units   (C) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " sq.units   (D) none of these"
      ],
      "ta": [
        "1. ",
        {
          "latex": "(-5,0)\\; ,\\; (0,-5)",
          "fallback": "(−5,0) , (0,−5)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(5,0)",
          "fallback": "(5,0)",
          "display": false
        },
        " ஆகிய புள்ளிகளால் அமைக்கப்படும் முக்கோணத்தின் பரப்பு\n(அ) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        },
        " ச.அலகுகள்   (ஆ) ",
        {
          "latex": "25",
          "fallback": "25",
          "display": false
        },
        " ச.அலகுகள்   (இ) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " ச.அலகுகள்   (ஈ) எதுவுமில்லை"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Base along the X-axis stretches from (−5, 0) to (5, 0), so base = 10 units, and perpendicular height to (0, −5) is 5 units. Area = (1/2) × 10 × 5 = 25 sq.units — Option (B).",
        "eq": "Base = 5 − (−5) = 10 units, Height = 5 units",
        "math": {
          "latex": "\\text{Base} = 5 - (-5) = 10,\\qquad \\text{Height} = |-5| = 5",
          "fallback": "Base = 5 − (−5) = 10 units, Height = 5 units",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — You can verify using the shoelace area formula with vertices A(−5, 0), B(0, −5), C(5, 0) in counter-clockwise order.",
        "eq": "Area = (1/2)|[25 + 0 + 0] − [0 − 25 + 0]| = 50/2 = 25 sq.units, option (B)",
        "math": {
          "latex": "\\text{Area} = \\dfrac{1}{2}|(25+0+0)-(0-25+0)| = \\dfrac{50}{2} = 25\\;\\text{sq.units}",
          "fallback": "Area = (1/2)|[25 + 0 + 0] − [0 − 25 + 0]| = 50/2 = 25 sq.units, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 25 sq.units",
    "answerMath": {
      "latex": "\\text{(B) } 25\\text{ sq.units}",
      "fallback": "(B) 25 sq.units",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q1. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q2",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Equations of Lines Parallel to Axes",
      "ta": "ஆயத்தொலை வடிவியல் — அச்சுகளுக்கு இணையான கோடுகள்"
    },
    "label": {
      "en": "Exercise 5.5 · Q2",
      "ta": "பயிற்சி 5.5 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Path of a man walking 10 units from the Y-axis wall"
    },
    "q": {
      "en": "2. A man walks near a wall, such that the distance between him and the wall is 10 units. Consider the wall to be the Y axis. The path travelled by the man is\n(A) x = 10   (B) y = 10   (C) x = 0   (D) y = 0",
      "ta": "2. ஒரு சுவரின் அருகே நடந்து சென்று கொண்டிருக்கும் ஒரு நபருக்கும் சுவருக்கும் இடையே உள்ள தூரம் 10 அலகுகள். சுவரை Y-அச்சாகக் கருதினால், அந்த நபர் செல்லும் பாதை என்பது\n(அ) x = 10   (ஆ) y = 10   (இ) x = 0   (ஈ) y = 0"
    },
    "questionMath": {
      "en": [
        "2. A man walks near a wall, such that the distance between him and the wall is ",
        {
          "latex": "10",
          "fallback": "10",
          "display": false
        },
        " units. Consider the wall to be the ",
        {
          "latex": "Y",
          "fallback": "Y",
          "display": false
        },
        " axis. The path travelled by the man is\n(A) ",
        {
          "latex": "x = 10",
          "fallback": "x = 10",
          "display": false
        },
        "   (B) ",
        {
          "latex": "y = 10",
          "fallback": "y = 10",
          "display": false
        },
        "   (C) ",
        {
          "latex": "x = 0",
          "fallback": "x = 0",
          "display": false
        },
        "   (D) ",
        {
          "latex": "y = 0",
          "fallback": "y = 0",
          "display": false
        }
      ],
      "ta": [
        "2. ஒரு சுவரின் அருகே நடந்து சென்று கொண்டிருக்கும் ஒரு நபருக்கும் சுவருக்கும் இடையே உள்ள தூரம் ",
        {
          "latex": "10",
          "fallback": "10",
          "display": false
        },
        " அலகுகள். சுவரை ",
        {
          "latex": "Y",
          "fallback": "Y",
          "display": false
        },
        "-அச்சாகக் கருதினால், அந்த நபர் செல்லும் பாதை என்பது\n(அ) ",
        {
          "latex": "x = 10",
          "fallback": "x = 10",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "y = 10",
          "fallback": "y = 10",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "x = 0",
          "fallback": "x = 0",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "y = 0",
          "fallback": "y = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Every point at perpendicular distance 10 units to the right of the Y-axis has horizontal x-coordinate equal to 10, so his path is x = 10 — Option (A).",
        "eq": "Wall is Y-axis (x = 0); parallel path 10 units away is x = 10",
        "math": {
          "latex": "\\text{Wall: } x = 0\\quad\\text{gives path at distance 10:}\\quad x = 10",
          "fallback": "Wall is Y-axis (x = 0); parallel path 10 units away is x = 10",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Distance from the Y-axis equals |x|. Walking along a line parallel to the Y-axis keeps x constant while y varies, so the equation is x = 10 (Option A).",
        "eq": "x = 10 keeps constant horizontal distance 10 units from Y-axis, option (A)",
        "math": {
          "latex": "x = 10\\quad(\\text{Option (A)})",
          "fallback": "x = 10 keeps constant horizontal distance 10 units from Y-axis, option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) x = 10",
    "answerMath": {
      "latex": "\\text{(A) } x = 10",
      "fallback": "(A) x = 10",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q2. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q3",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Vertical Lines",
      "ta": "ஆயத்தொலை வடிவியல் — Y-அச்சுக்கு இணையான கோடுகள்"
    },
    "label": {
      "en": "Exercise 5.5 · Q3",
      "ta": "பயிற்சி 5.5 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Geometric meaning of line x = 11"
    },
    "q": {
      "en": "3. The straight line given by the equation x = 11 is\n(A) parallel to X axis   (B) parallel to Y axis\n(C) passing through the origin   (D) passing through the point (0,11)",
      "ta": "3. x = 11 எனக் கொடுக்கப்பட்ட நேர்க்கோட்டின் சமன்பாடானது\n(அ) X -அச்சுக்கு இணை   (ஆ) Y -அச்சுக்கு இணை\n(இ) ஆதிப் புள்ளி வழிச் செல்லும்   (ஈ) (0,11) என்ற புள்ளி வழிச் செல்லும்"
    },
    "questionMath": {
      "en": [
        "3. The straight line given by the equation ",
        {
          "latex": "x = 11",
          "fallback": "x = 11",
          "display": false
        },
        " is\n(A) parallel to X axis   (B) parallel to Y axis\n(C) passing through the origin   (D) passing through the point ",
        {
          "latex": "(0,11)",
          "fallback": "(0,11)",
          "display": false
        }
      ],
      "ta": [
        "3. ",
        {
          "latex": "x = 11",
          "fallback": "x = 11",
          "display": false
        },
        " எனக் கொடுக்கப்பட்ட நேர்க்கோட்டின் சமன்பாடானது\n(அ) X -அச்சுக்கு இணை   (ஆ) Y -அச்சுக்கு இணை\n(இ) ஆதிப் புள்ளி வழிச் செல்லும்   (ஈ) ",
        {
          "latex": "(0,11)",
          "fallback": "(0,11)",
          "display": false
        },
        " என்ற புள்ளி வழிச் செல்லும்"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Any line of the form x = c (with constant c ≠ 0) fixes x = 11 while y takes all values, forming a vertical line parallel to the Y-axis — Option (B).",
        "eq": "x = 11 is of the vertical form x = c",
        "math": {
          "latex": "x = 11\\;\\text{passes through }(11,0),(11,1),(11,-3),\\dots",
          "fallback": "x = 11 is of the vertical form x = c",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because every point has the same distance 11 units right of the Y-axis and never meets x = 0, the line is parallel to the Y-axis (Option B).",
        "eq": "Constant x = 11 means vertical line parallel to Y-axis, option (B)",
        "math": {
          "latex": "\\text{Parallel to } Y\\text{-axis}\\quad(\\text{Option (B)})",
          "fallback": "Constant x = 11 means vertical line parallel to Y-axis, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) parallel to Y axis",
    "answerMath": {
      "latex": "\\text{(B) parallel to } Y \\text{ axis}",
      "fallback": "(B) parallel to Y axis",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q3. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q4",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Collinearity via Slope",
      "ta": "ஆயத்தொலை வடிவியல் — ஒருகோடமைப் புள்ளிகள்"
    },
    "label": {
      "en": "Exercise 5.5 · Q4",
      "ta": "பயிற்சி 5.5 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Value of p when (5, 7), (3, p) and (6, 6) are collinear"
    },
    "q": {
      "en": "4. If (5,7), (3,p) and (6,6) are collinear, then the value of p is\n(A) 3   (B) 6   (C) 9   (D) 12",
      "ta": "4. (5,7), (3,p) மற்றும் (6,6) என்பன ஒரு கோடமைந்தவை எனில், p-யின் மதிப்பு\n(அ) 3   (ஆ) 6   (இ) 9   (ஈ) 12"
    },
    "questionMath": {
      "en": [
        "4. If ",
        {
          "latex": "(5,7),\\;(3,p)",
          "fallback": "(5,7), (3,p)",
          "display": false
        },
        " and ",
        {
          "latex": "(6,6)",
          "fallback": "(6,6)",
          "display": false
        },
        " are collinear, then the value of ",
        {
          "latex": "p",
          "fallback": "p",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "3",
          "fallback": "3",
          "display": false
        },
        "   (B) ",
        {
          "latex": "6",
          "fallback": "6",
          "display": false
        },
        "   (C) ",
        {
          "latex": "9",
          "fallback": "9",
          "display": false
        },
        "   (D) ",
        {
          "latex": "12",
          "fallback": "12",
          "display": false
        }
      ],
      "ta": [
        "4. ",
        {
          "latex": "(5,7),\\;(3,p)",
          "fallback": "(5,7), (3,p)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(6,6)",
          "fallback": "(6,6)",
          "display": false
        },
        " என்பன ஒரு கோடமைந்தவை எனில், ",
        {
          "latex": "p",
          "fallback": "p",
          "display": false
        },
        "-யின் மதிப்பு\n(அ) ",
        {
          "latex": "3",
          "fallback": "3",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "6",
          "fallback": "6",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "9",
          "fallback": "9",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "12",
          "fallback": "12",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Since the points are collinear, slope from (5, 7) to (6, 6) equals slope from (5, 7) to (3, p): −1 = (p − 7)/(−2), giving p = 9 — Option (C).",
        "eq": "(p − 7)/(3 − 5) = (6 − 7)/(6 − 5) = −1",
        "math": {
          "latex": "\\dfrac{p-7}{3-5} = \\dfrac{6-7}{6-5} = -1",
          "fallback": "(p − 7)/(3 − 5) = (6 − 7)/(6 − 5) = −1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply both sides by denominator −2 to find p − 7 = 2, so p = 9.",
        "eq": "p − 7 = (−1)(−2) = 2 gives p = 9, option (C)",
        "math": {
          "latex": "p - 7 = (-1)(-2) = 2\\quad\\text{gives}\\quad p = 9\\quad(\\text{Option (C)})",
          "fallback": "p − 7 = (−1)(−2) = 2 gives p = 9, option (C)",
          "display": true
        }
      }
    ],
    "answer": "(C) 9",
    "answerMath": {
      "latex": "\\text{(C) } 9",
      "fallback": "(C) 9",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q4. EN printed p. 236 (PDF p. 242); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q5",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Intersection of Two Lines",
      "ta": "ஆயத்தொலை வடிவியல் — இரு கோடுகள் சந்திக்கும் புள்ளி"
    },
    "label": {
      "en": "Exercise 5.5 · Q5",
      "ta": "பயிற்சி 5.5 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Point of intersection of 3x − y = 4 and x + y = 8"
    },
    "q": {
      "en": "5. The point of intersection of 3x − y = 4 and x + y = 8 is\n(A) (5,3)   (B) (2,4)   (C) (3,5)   (D) (4,4)",
      "ta": "5. 3x − y = 4 மற்றும் x + y = 8 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி\n(அ) (5,3)   (ஆ) (2,4)   (இ) (3,5)   (ஈ) (4,4)"
    },
    "questionMath": {
      "en": [
        "5. The point of intersection of ",
        {
          "latex": "3x-y=4",
          "fallback": "3x − y = 4",
          "display": false
        },
        " and ",
        {
          "latex": "x+y=8",
          "fallback": "x + y = 8",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "(5,3)",
          "fallback": "(5,3)",
          "display": false
        },
        "   (B) ",
        {
          "latex": "(2,4)",
          "fallback": "(2,4)",
          "display": false
        },
        "   (C) ",
        {
          "latex": "(3,5)",
          "fallback": "(3,5)",
          "display": false
        },
        "   (D) ",
        {
          "latex": "(4,4)",
          "fallback": "(4,4)",
          "display": false
        }
      ],
      "ta": [
        "5. ",
        {
          "latex": "3x-y=4",
          "fallback": "3x − y = 4",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "x+y=8",
          "fallback": "x + y = 8",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி\n(அ) ",
        {
          "latex": "(5,3)",
          "fallback": "(5,3)",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "(2,4)",
          "fallback": "(2,4)",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "(3,5)",
          "fallback": "(3,5)",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "(4,4)",
          "fallback": "(4,4)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Add the two equations directly to cancel −y and +y: 4x = 12 gives x = 3, and x + y = 8 gives y = 5, so intersection is (3, 5) — Option (C).",
        "eq": "(3x − y) + (x + y) = 4 + 8 gives 4x = 12, so x = 3",
        "math": {
          "latex": "\\begin{aligned} (3x-y) + (x+y) &= 4 + 8 \\\\ 4x &= 12\\quad\\text{gives}\\quad x = 3 \\end{aligned}",
          "fallback": "(3x − y) + (x + y) = 4 + 8 gives 4x = 12, so x = 3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute x = 3 into x + y = 8 to get y = 5, and check 3(3) − 5 = 4 holds as well.",
        "eq": "y = 8 − 3 = 5, so intersection point is (3, 5), option (C)",
        "math": {
          "latex": "y = 8 - 3 = 5\\quad\\text{gives}\\quad (3,5)\\quad(\\text{Option (C)})",
          "fallback": "y = 8 − 3 = 5, so intersection point is (3, 5), option (C)",
          "display": true
        }
      }
    ],
    "answer": "(C) (3, 5)",
    "answerMath": {
      "latex": "\\text{(C) } (3,5)",
      "fallback": "(C) (3, 5)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q5. EN printed p. 236 (PDF p. 242); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q6",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Slope Formula",
      "ta": "ஆயத்தொலை வடிவியல் — சாய்வு சூத்திரம்"
    },
    "label": {
      "en": "Exercise 5.5 · Q6",
      "ta": "பயிற்சி 5.5 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Value of a when line joining (12, 3) and (4, a) has slope 1/8"
    },
    "q": {
      "en": "6. The slope of the line joining (12,3) , (4,a) is 1/8. The value of ‘a’ is\n(A) 1   (B) 4   (C) −5   (D) 2",
      "ta": "6. (12,3) , (4,a) என்ற புள்ளிகளை இணைக்கும் கோட்டின் சாய்வு 1/8 எனில், ‘a’-யின் மதிப்பு.\n(அ) 1   (ஆ) 4   (இ) −5   (ஈ) 2"
    },
    "questionMath": {
      "en": [
        "6. The slope of the line joining ",
        {
          "latex": "(12,3)\\; ,\\; (4,a)",
          "fallback": "(12,3) , (4,a)",
          "display": false
        },
        " is ",
        {
          "latex": "\\dfrac{1}{8}",
          "fallback": "1/8",
          "display": false
        },
        ". The value of ‘",
        {
          "latex": "a",
          "fallback": "a",
          "display": false
        },
        "’ is\n(A) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        "   (B) ",
        {
          "latex": "4",
          "fallback": "4",
          "display": false
        },
        "   (C) ",
        {
          "latex": "-5",
          "fallback": "−5",
          "display": false
        },
        "   (D) ",
        {
          "latex": "2",
          "fallback": "2",
          "display": false
        }
      ],
      "ta": [
        "6. ",
        {
          "latex": "(12,3)\\; ,\\; (4,a)",
          "fallback": "(12,3) , (4,a)",
          "display": false
        },
        " என்ற புள்ளிகளை இணைக்கும் கோட்டின் சாய்வு ",
        {
          "latex": "\\dfrac{1}{8}",
          "fallback": "1/8",
          "display": false
        },
        " எனில், ‘",
        {
          "latex": "a",
          "fallback": "a",
          "display": false
        },
        "’-யின் மதிப்பு.\n(அ) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "4",
          "fallback": "4",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "-5",
          "fallback": "−5",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "2",
          "fallback": "2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the two-point slope formula (a − 3)/(4 − 12) = 1/8. Since 4 − 12 = −8, denominator magnitude matches 8: a − 3 = −1, giving a = 2 — Option (D).",
        "eq": "(a − 3)/(4 − 12) = 1/8 gives (a − 3)/(−8) = 1/8",
        "math": {
          "latex": "\\dfrac{a-3}{4-12} = \\dfrac{1}{8}\\quad\\text{gives}\\quad \\dfrac{a-3}{-8} = \\dfrac{1}{8}",
          "fallback": "(a − 3)/(4 − 12) = 1/8 gives (a − 3)/(−8) = 1/8",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply both sides by −8 to obtain a − 3 = −1, so a = 2.",
        "eq": "a − 3 = −1 gives a = 2, option (D)",
        "math": {
          "latex": "a - 3 = -1\\quad\\text{gives}\\quad a = 2\\quad(\\text{Option (D)})",
          "fallback": "a − 3 = −1 gives a = 2, option (D)",
          "display": true
        }
      }
    ],
    "answer": "(D) 2",
    "answerMath": {
      "latex": "\\text{(D) } 2",
      "fallback": "(D) 2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q6. EN printed p. 236 (PDF p. 242); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q7",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — செங்குத்துக் கோட்டின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.5 · Q7",
      "ta": "பயிற்சி 5.5 · வினா 7 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of line perpendicular to segment joining (0, 0) and (−8, 8)"
    },
    "q": {
      "en": "7. The slope of the line which is perpendicular to a line joining the points (0,0) and (−8,8) is\n(A) −1   (B) 1   (C) 1/3   (D) −8",
      "ta": "7. (0,0) மற்றும் (−8,8) என்ற புள்ளிகளை இணைக்கும் கோட்டிற்குச் செங்குத்தான கோட்டின் சாய்வு\n(அ) −1   (ஆ) 1   (இ) 1/3   (ஈ) −8"
    },
    "questionMath": {
      "en": [
        "7. The slope of the line which is perpendicular to a line joining the points ",
        {
          "latex": "(0,0)",
          "fallback": "(0,0)",
          "display": false
        },
        " and ",
        {
          "latex": "(-8,8)",
          "fallback": "(−8,8)",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "-1",
          "fallback": "−1",
          "display": false
        },
        "   (B) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{1}{3}",
          "fallback": "1/3",
          "display": false
        },
        "   (D) ",
        {
          "latex": "-8",
          "fallback": "−8",
          "display": false
        }
      ],
      "ta": [
        "7. ",
        {
          "latex": "(0,0)",
          "fallback": "(0,0)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(-8,8)",
          "fallback": "(−8,8)",
          "display": false
        },
        " என்ற புள்ளிகளை இணைக்கும் கோட்டிற்குச் செங்குத்தான கோட்டின் சாய்வு\n(அ) ",
        {
          "latex": "-1",
          "fallback": "−1",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{1}{3}",
          "fallback": "1/3",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "-8",
          "fallback": "−8",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First compute slope of segment joining (0, 0) and (−8, 8) as m₁ = 8/(−8) = −1. The perpendicular slope is the negative reciprocal m₂ = −1/(−1) = 1 — Option (B).",
        "eq": "m₁ = (8 − 0)/(−8 − 0) = −1",
        "math": {
          "latex": "m_1 = \\dfrac{8-0}{-8-0} = -1",
          "fallback": "m₁ = (8 − 0)/(−8 − 0) = −1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Apply m₁·m₂ = −1, so (−1)·m₂ = −1 gives m₂ = 1.",
        "eq": "m₂ = −1/m₁ = −1/(−1) = 1, option (B)",
        "math": {
          "latex": "m_2 = -\\dfrac{1}{-1} = 1\\quad(\\text{Option (B)})",
          "fallback": "m₂ = −1/m₁ = −1/(−1) = 1, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 1",
    "answerMath": {
      "latex": "\\text{(B) } 1",
      "fallback": "(B) 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q7. EN printed p. 236 (PDF p. 242); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q8",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Bisector Slope",
      "ta": "ஆயத்தொலை வடிவியல் — மையக் குத்துக்கோட்டின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.5 · Q8",
      "ta": "பயிற்சி 5.5 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of perpendicular bisector of PQ when slope of PQ is 1/√3"
    },
    "q": {
      "en": "8. If slope of the line PQ is 1/√3 then slope of the perpendicular bisector of PQ is\n(A) √3   (B) −√3   (C) 1/√3   (D) 0",
      "ta": "8. கோட்டுத்துண்டு PQ-யின் சாய்வு 1/√3 எனில், PQ-க்கு செங்குத்தான இரு சம வெட்டியின் சாய்வு\n(அ) √3   (ஆ) −√3   (இ) 1/√3   (ஈ) 0"
    },
    "questionMath": {
      "en": [
        "8. If slope of the line ",
        {
          "latex": "PQ",
          "fallback": "PQ",
          "display": false
        },
        " is ",
        {
          "latex": "\\dfrac{1}{\\sqrt{3}}",
          "fallback": "1/√3",
          "display": false
        },
        " then slope of the perpendicular bisector of ",
        {
          "latex": "PQ",
          "fallback": "PQ",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "\\sqrt{3}",
          "fallback": "√3",
          "display": false
        },
        "   (B) ",
        {
          "latex": "-\\sqrt{3}",
          "fallback": "−√3",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{1}{\\sqrt{3}}",
          "fallback": "1/√3",
          "display": false
        },
        "   (D) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        }
      ],
      "ta": [
        "8. கோட்டுத்துண்டு ",
        {
          "latex": "PQ",
          "fallback": "PQ",
          "display": false
        },
        "-யின் சாய்வு ",
        {
          "latex": "\\dfrac{1}{\\sqrt{3}}",
          "fallback": "1/√3",
          "display": false
        },
        " எனில், ",
        {
          "latex": "PQ",
          "fallback": "PQ",
          "display": false
        },
        "-க்கு செங்குத்தான இரு சம வெட்டியின் சாய்வு\n(அ) ",
        {
          "latex": "\\sqrt{3}",
          "fallback": "√3",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "-\\sqrt{3}",
          "fallback": "−√3",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{1}{\\sqrt{3}}",
          "fallback": "1/√3",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A perpendicular bisector is perpendicular to segment PQ, so its slope is the negative reciprocal of 1/√3, which equals −√3 — Option (B).",
        "eq": "m₁ = 1/√3 gives m₂ = −1/m₁ = −√3",
        "math": {
          "latex": "m_2 = -\\dfrac{1}{1/\\sqrt{3}} = -\\sqrt{3}",
          "fallback": "m₁ = 1/√3 gives m₂ = −1/m₁ = −√3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Check m₁·m₂ = (1/√3)(−√3) = −1, confirming the 90° angle regardless of midpoint location.",
        "eq": "Product (1/√3)(−√3) = −1, so perpendicular bisector slope is −√3, option (B)",
        "math": {
          "latex": "\\left(\\dfrac{1}{\\sqrt{3}}\\right)(-\\sqrt{3}) = -1\\quad(\\text{Option (B)})",
          "fallback": "Product (1/√3)(−√3) = −1, so perpendicular bisector slope is −√3, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) −√3",
    "answerMath": {
      "latex": "\\text{(B) } -\\sqrt{3}",
      "fallback": "(B) −√3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q8. EN printed p. 236 (PDF p. 242); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 249
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q9",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Intercept Form",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டு வடிவம்"
    },
    "label": {
      "en": "Exercise 5.5 · Q9",
      "ta": "பயிற்சி 5.5 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Equation of AB with y-intercept 8 and x-intercept 5"
    },
    "q": {
      "en": "9. If A is a point on the Y axis whose ordinate is 8 and B is a point on the X axis whose abscissae is 5 then the equation of the line AB is\n(A) 8x + 5y = 40   (B) 8x − 5y = 40   (C) x = 8   (D) y = 5",
      "ta": "9. Y அச்சில் அமையும் புள்ளி A -யின் செங்குத்துத் தொலைவு 8 மற்றும் X அச்சில் அமையும் புள்ளி B-யின் கிடைமட்டத் தொலைவு 5 எனில், AB என்ற நேர்க்கோட்டின் சமன்பாடு\n(அ) 8x + 5y = 40   (ஆ) 8x − 5y = 40   (இ) x = 8   (ஈ) y = 5"
    },
    "questionMath": {
      "en": [
        "9. If ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " is a point on the ",
        {
          "latex": "Y",
          "fallback": "Y",
          "display": false
        },
        " axis whose ordinate is ",
        {
          "latex": "8",
          "fallback": "8",
          "display": false
        },
        " and ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " is a point on the ",
        {
          "latex": "X",
          "fallback": "X",
          "display": false
        },
        " axis whose abscissae is ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " then the equation of the line ",
        {
          "latex": "AB",
          "fallback": "AB",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "8x+5y=40",
          "fallback": "8x + 5y = 40",
          "display": false
        },
        "   (B) ",
        {
          "latex": "8x-5y=40",
          "fallback": "8x − 5y = 40",
          "display": false
        },
        "   (C) ",
        {
          "latex": "x=8",
          "fallback": "x = 8",
          "display": false
        },
        "   (D) ",
        {
          "latex": "y=5",
          "fallback": "y = 5",
          "display": false
        }
      ],
      "ta": [
        "9. ",
        {
          "latex": "Y",
          "fallback": "Y",
          "display": false
        },
        " அச்சில் அமையும் புள்ளி ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " -யின் செங்குத்துத் தொலைவு ",
        {
          "latex": "8",
          "fallback": "8",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "X",
          "fallback": "X",
          "display": false
        },
        " அச்சில் அமையும் புள்ளி ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-யின் கிடைமட்டத் தொலைவு ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " எனில், ",
        {
          "latex": "AB",
          "fallback": "AB",
          "display": false
        },
        " என்ற நேர்க்கோட்டின் சமன்பாடு\n(அ) ",
        {
          "latex": "8x+5y=40",
          "fallback": "8x + 5y = 40",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "8x-5y=40",
          "fallback": "8x − 5y = 40",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "x=8",
          "fallback": "x = 8",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "y=5",
          "fallback": "y = 5",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Here A = (0, 8) gives y-intercept b = 8 and B = (5, 0) gives x-intercept a = 5. Substituting into intercept form x/5 + y/8 = 1 and multiplying by 40 gives 8x + 5y = 40 — Option (A).",
        "eq": "x-intercept a = 5, y-intercept b = 8 gives x/5 + y/8 = 1",
        "math": {
          "latex": "\\dfrac{x}{5} + \\dfrac{y}{8} = 1",
          "fallback": "x-intercept a = 5, y-intercept b = 8 gives x/5 + y/8 = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply every term by LCM 40: 8x + 5y = 40. Checking A(0, 8) gives 40 = 40 and B(5, 0) gives 40 = 40.",
        "eq": "(8x + 5y)/40 = 1 gives 8x + 5y = 40, option (A)",
        "math": {
          "latex": "8x + 5y = 40\\quad(\\text{Option (A)})",
          "fallback": "(8x + 5y)/40 = 1 gives 8x + 5y = 40, option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) 8x + 5y = 40",
    "answerMath": {
      "latex": "\\text{(A) } 8x + 5y = 40",
      "fallback": "(A) 8x + 5y = 40",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q9. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q10",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Line Through Origin",
      "ta": "ஆயத்தொலை வடிவியல் — ஆதிவழிச் செல்லும் செங்குத்துக் கோடு"
    },
    "label": {
      "en": "Exercise 5.5 · Q10",
      "ta": "பயிற்சி 5.5 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through origin perpendicular to 7x − 3y + 4 = 0"
    },
    "q": {
      "en": "10. The equation of a line passing through the origin and perpendicular to the line 7x − 3y + 4 = 0 is\n(A) 7x − 3y + 4 = 0   (B) 3x − 7y + 4 = 0   (C) 3x + 7y = 0   (D) 7x − 3y = 0",
      "ta": "10. 7x − 3y + 4 = 0 என்ற நேர்க்கோட்டிற்குச் செங்குத்தாகவும், ஆதிப்புள்ளி வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாடு\n(அ) 7x − 3y + 4 = 0   (ஆ) 3x − 7y + 4 = 0   (இ) 3x + 7y = 0   (ஈ) 7x − 3y = 0"
    },
    "questionMath": {
      "en": [
        "10. The equation of a line passing through the origin and perpendicular to the line ",
        {
          "latex": "7x-3y+4=0",
          "fallback": "7x − 3y + 4 = 0",
          "display": false
        },
        " is\n(A) ",
        {
          "latex": "7x-3y+4=0",
          "fallback": "7x − 3y + 4 = 0",
          "display": false
        },
        "   (B) ",
        {
          "latex": "3x-7y+4=0",
          "fallback": "3x − 7y + 4 = 0",
          "display": false
        },
        "   (C) ",
        {
          "latex": "3x+7y=0",
          "fallback": "3x + 7y = 0",
          "display": false
        },
        "   (D) ",
        {
          "latex": "7x-3y=0",
          "fallback": "7x − 3y = 0",
          "display": false
        }
      ],
      "ta": [
        "10. ",
        {
          "latex": "7x-3y+4=0",
          "fallback": "7x − 3y + 4 = 0",
          "display": false
        },
        " என்ற நேர்க்கோட்டிற்குச் செங்குத்தாகவும், ஆதிப்புள்ளி வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாடு\n(அ) ",
        {
          "latex": "7x-3y+4=0",
          "fallback": "7x − 3y + 4 = 0",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "3x-7y+4=0",
          "fallback": "3x − 7y + 4 = 0",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "3x+7y=0",
          "fallback": "3x + 7y = 0",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "7x-3y=0",
          "fallback": "7x − 3y = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A line perpendicular to 7x − 3y + 4 = 0 swaps coefficients and flips the middle sign to 3x + 7y + k = 0. Because it passes through origin (0, 0), k = 0, giving 3x + 7y = 0 — Option (C).",
        "eq": "Perpendicular form is 3x + 7y + k = 0",
        "math": {
          "latex": "\\text{Perpendicular form: } 3x + 7y + k = 0",
          "fallback": "Perpendicular form is 3x + 7y + k = 0",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute (0, 0) into 3x + 7y + k = 0 to get k = 0, and verify slopes (7/3)(−3/7) = −1.",
        "eq": "3(0) + 7(0) + k = 0 gives k = 0, so 3x + 7y = 0, option (C)",
        "math": {
          "latex": "3x + 7y = 0\\quad(\\text{Option (C)})",
          "fallback": "3(0) + 7(0) + k = 0 gives k = 0, so 3x + 7y = 0, option (C)",
          "display": true
        }
      }
    ],
    "answer": "(C) 3x + 7y = 0",
    "answerMath": {
      "latex": "\\text{(C) } 3x + 7y = 0",
      "fallback": "(C) 3x + 7y = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q10. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q11",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Comparing Multiple Line Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — நான்கு கோடுகளின் சாய்வு ஒப்பீடு"
    },
    "label": {
      "en": "Exercise 5.5 · Q11",
      "ta": "பயிற்சி 5.5 · வினா 11 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Identifying true parallel/perpendicular statement among four given lines"
    },
    "q": {
      "en": "11. Consider four straight lines\n(i) l₁; 3y = 4x + 5   (ii) l₂; 4y = 3x − 1   (iii) l₃; 4y + 3x = 7   (iv) l₄; 4x + 3y = 2\nWhich of the following statement is true ?\n(A) l₁ and l₂ are perpendicular   (B) l₁ and l₄ are parallel\n(C) l₂ and l₄ are perpendicular   (D) l₂ and l₃ are parallel",
      "ta": "11. (i) l₁; 3y = 4x + 5   (ii) l₂; 4y = 3x − 1   (iii) l₃; 4y + 3x = 7   (iv) l₄; 4x + 3y = 2\nஎனக் கொடுக்கப்பட்ட நான்கு நேர்க்கோடுகளுக்குக் கீழ்க்காணும் கூற்றுகளில் எது உண்மை\n(அ) l₁ மற்றும் l₂ செங்குத்தானவை   (ஆ) l₁ மற்றும் l₄ இணையானவை\n(இ) l₂ மற்றும் l₄ செங்குத்தானவை   (ஈ) l₂ மற்றும் l₃ இணையானவை"
    },
    "questionMath": {
      "en": [
        "11. Consider four straight lines\n(i) ",
        {
          "latex": "l_1:\\; 3y=4x+5",
          "fallback": "l₁; 3y = 4x + 5",
          "display": false
        },
        "   (ii) ",
        {
          "latex": "l_2:\\; 4y=3x-1",
          "fallback": "l₂; 4y = 3x − 1",
          "display": false
        },
        "   (iii) ",
        {
          "latex": "l_3:\\; 4y+3x=7",
          "fallback": "l₃; 4y + 3x = 7",
          "display": false
        },
        "   (iv) ",
        {
          "latex": "l_4:\\; 4x+3y=2",
          "fallback": "l₄; 4x + 3y = 2",
          "display": false
        },
        "\nWhich of the following statement is true ?\n(A) ",
        {
          "latex": "l_1",
          "fallback": "l₁",
          "display": false
        },
        " and ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " are perpendicular   (B) ",
        {
          "latex": "l_1",
          "fallback": "l₁",
          "display": false
        },
        " and ",
        {
          "latex": "l_4",
          "fallback": "l₄",
          "display": false
        },
        " are parallel\n(C) ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " and ",
        {
          "latex": "l_4",
          "fallback": "l₄",
          "display": false
        },
        " are perpendicular   (D) ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " and ",
        {
          "latex": "l_3",
          "fallback": "l₃",
          "display": false
        },
        " are parallel"
      ],
      "ta": [
        "11. (i) ",
        {
          "latex": "l_1:\\; 3y=4x+5",
          "fallback": "l₁; 3y = 4x + 5",
          "display": false
        },
        "   (ii) ",
        {
          "latex": "l_2:\\; 4y=3x-1",
          "fallback": "l₂; 4y = 3x − 1",
          "display": false
        },
        "   (iii) ",
        {
          "latex": "l_3:\\; 4y+3x=7",
          "fallback": "l₃; 4y + 3x = 7",
          "display": false
        },
        "   (iv) ",
        {
          "latex": "l_4:\\; 4x+3y=2",
          "fallback": "l₄; 4x + 3y = 2",
          "display": false
        },
        "\nஎனக் கொடுக்கப்பட்ட நான்கு நேர்க்கோடுகளுக்குக் கீழ்க்காணும் கூற்றுகளில் எது உண்மை\n(அ) ",
        {
          "latex": "l_1",
          "fallback": "l₁",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " செங்குத்தானவை   (ஆ) ",
        {
          "latex": "l_1",
          "fallback": "l₁",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "l_4",
          "fallback": "l₄",
          "display": false
        },
        " இணையானவை\n(இ) ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "l_4",
          "fallback": "l₄",
          "display": false
        },
        " செங்குத்தானவை   (ஈ) ",
        {
          "latex": "l_2",
          "fallback": "l₂",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "l_3",
          "fallback": "l₃",
          "display": false
        },
        " இணையானவை"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find each slope: m₁ = 4/3, m₂ = 3/4, m₃ = −3/4, m₄ = −4/3. Because m₂·m₄ = (3/4)(−4/3) = −1, lines l₂ and l₄ are perpendicular — Option (C).",
        "eq": "m₁ = 4/3, m₂ = 3/4, m₃ = −3/4, m₄ = −4/3",
        "math": {
          "latex": "m_1 = \\dfrac{4}{3},\\quad m_2 = \\dfrac{3}{4},\\quad m_3 = -\\dfrac{3}{4},\\quad m_4 = -\\dfrac{4}{3}",
          "fallback": "m₁ = 4/3, m₂ = 3/4, m₃ = −3/4, m₄ = −4/3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Check each option: m₁ ≠ m₄ (not parallel), m₂ ≠ m₃ (not parallel), m₁·m₂ = 1 ≠ −1, whereas m₂·m₄ = (3/4)(−4/3) = −1 confirms l₂ ⊥ l₄.",
        "eq": "m₂·m₄ = (3/4)(−4/3) = −1 proves l₂ and l₄ are perpendicular, option (C)",
        "math": {
          "latex": "m_2\\cdot m_4 = \\left(\\dfrac{3}{4}\\right)\\left(-\\dfrac{4}{3}\\right) = -1\\quad(\\text{Option (C)})",
          "fallback": "m₂·m₄ = (3/4)(−4/3) = −1 proves l₂ and l₄ are perpendicular, option (C)",
          "display": true
        }
      }
    ],
    "answer": "(C) l₂ and l₄ are perpendicular",
    "answerMath": {
      "latex": "\\text{(C) } l_2 \\text{ and } l_4 \\text{ are perpendicular}",
      "fallback": "(C) l₂ and l₄ are perpendicular",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q11. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q12",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Slope-Intercept Form",
      "ta": "ஆயத்தொலை வடிவியல் — சாய்வு-வெட்டுத்துண்டு வடிவம்"
    },
    "label": {
      "en": "Exercise 5.5 · Q12",
      "ta": "பயிற்சி 5.5 · வினா 12 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope and y-intercept of 8y = 4x + 21"
    },
    "q": {
      "en": "12. A straight line has equation 8y = 4x + 21. Which of the following is true\n(A) The slope is 0.5 and the y intercept is 2.6\n(B) The slope is 5 and the y intercept is 1.6\n(C) The slope is 0.5 and the y intercept is 1.6\n(D) The slope is 5 and the y intercept is 2.6",
      "ta": "12. 8y = 4x + 21 என்ற நேர்க்கோட்டின் சமன்பாட்டிற்குக் கீழ்க்காணபனவற்றில் எது உண்மை\n(அ) சாய்வு 0.5 மற்றும் y வெட்டுத்துண்டு 2.6\n(ஆ) சாய்வு 5 மற்றும் y வெட்டுத்துண்டு 1.6\n(இ) சாய்வு 0.5 மற்றும் y வெட்டுத்துண்டு 1.6\n(ஈ) சாய்வு 5 மற்றும் y வெட்டுத்துண்டு 2.6"
    },
    "questionMath": {
      "en": [
        "12. A straight line has equation ",
        {
          "latex": "8y=4x+21",
          "fallback": "8y = 4x + 21",
          "display": false
        },
        ". Which of the following is true\n(A) The slope is ",
        {
          "latex": "0.5",
          "fallback": "0.5",
          "display": false
        },
        " and the ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " intercept is ",
        {
          "latex": "2.6",
          "fallback": "2.6",
          "display": false
        },
        "\n(B) The slope is ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " and the ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " intercept is ",
        {
          "latex": "1.6",
          "fallback": "1.6",
          "display": false
        },
        "\n(C) The slope is ",
        {
          "latex": "0.5",
          "fallback": "0.5",
          "display": false
        },
        " and the ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " intercept is ",
        {
          "latex": "1.6",
          "fallback": "1.6",
          "display": false
        },
        "\n(D) The slope is ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " and the ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " intercept is ",
        {
          "latex": "2.6",
          "fallback": "2.6",
          "display": false
        }
      ],
      "ta": [
        "12. ",
        {
          "latex": "8y=4x+21",
          "fallback": "8y = 4x + 21",
          "display": false
        },
        " என்ற நேர்க்கோட்டின் சமன்பாட்டிற்குக் கீழ்க்காணபனவற்றில் எது உண்மை\n(அ) சாய்வு ",
        {
          "latex": "0.5",
          "fallback": "0.5",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " வெட்டுத்துண்டு ",
        {
          "latex": "2.6",
          "fallback": "2.6",
          "display": false
        },
        "\n(ஆ) சாய்வு ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " வெட்டுத்துண்டு ",
        {
          "latex": "1.6",
          "fallback": "1.6",
          "display": false
        },
        "\n(இ) சாய்வு ",
        {
          "latex": "0.5",
          "fallback": "0.5",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " வெட்டுத்துண்டு ",
        {
          "latex": "1.6",
          "fallback": "1.6",
          "display": false
        },
        "\n(ஈ) சாய்வு ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " வெட்டுத்துண்டு ",
        {
          "latex": "2.6",
          "fallback": "2.6",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Divide 8y = 4x + 21 through by 8 to isolate y: y = 0.5x + 2.625, so slope is 0.5 and y-intercept rounds to 2.6 — Option (A).",
        "eq": "y = (4/8)x + 21/8 = 0.5x + 2.625",
        "math": {
          "latex": "y = \\dfrac{4}{8}x + \\dfrac{21}{8} = 0.5x + 2.625",
          "fallback": "y = (4/8)x + 21/8 = 0.5x + 2.625",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Comparing y = 0.5x + 2.625 against y = mx + c directly matches slope m = 0.5 and y-intercept c ≈ 2.6 (Option A).",
        "eq": "m = 0.5 and c = 2.625 ≈ 2.6, option (A)",
        "math": {
          "latex": "m = 0.5,\\qquad c \\approx 2.6\\quad(\\text{Option (A)})",
          "fallback": "m = 0.5 and c = 2.625 ≈ 2.6, option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) The slope is 0.5 and the y intercept is 2.6",
    "answerMath": {
      "latex": "\\text{(A) } m=0.5,\\; c \\approx 2.6",
      "fallback": "(A) The slope is 0.5 and the y intercept is 2.6",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q12. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q13",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Quadrilateral Classification",
      "ta": "ஆயத்தொலை வடிவியல் — சரிவகத்திற்கான நிபந்தனை"
    },
    "label": {
      "en": "Exercise 5.5 · Q13",
      "ta": "பயிற்சி 5.5 · வினா 13 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Condition to prove a quadrilateral is a trapezium"
    },
    "q": {
      "en": "13. When proving that a quadrilateral is a trapezium, it is necessary to show\n(A) Two sides are parallel.   (B) Two parallel and two non-parallel sides.\n(C) Opposite sides are parallel.   (D) All sides are of equal length.",
      "ta": "13. ஒரு நாற்கரமானது ஒரு சரிவகமாக அமையத் தேவையான நிபந்தனை\n(அ) இரு பக்கங்கள் இணை.   (ஆ) இரு பக்கங்கள் இணை மற்றும் இரு பக்கங்கள் இணையற்றவை.\n(இ) எதிரெதிர் பக்கங்கள் இணை.   (ஈ) அனைத்துப் பக்கங்களும் சமம்."
    },
    "questionMath": {
      "en": [
        "13. When proving that a quadrilateral is a trapezium, it is necessary to show\n(A) Two sides are parallel.   (B) Two parallel and two non-parallel sides.\n(C) Opposite sides are parallel.   (D) All sides are of equal length."
      ],
      "ta": [
        "13. ஒரு நாற்கரமானது ஒரு சரிவகமாக அமையத் தேவையான நிபந்தனை\n(அ) இரு பக்கங்கள் இணை.   (ஆ) இரு பக்கங்கள் இணை மற்றும் இரு பக்கங்கள் இணையற்றவை.\n(இ) எதிரெதிர் பக்கங்கள் இணை.   (ஈ) அனைத்துப் பக்கங்களும் சமம்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: By definition in Tamil Nadu coordinate geometry, a trapezium has one pair of opposite sides parallel and the other pair of opposite sides non-parallel — Option (B).",
        "eq": "Trapezium: 1 pair of opposite sides parallel, 1 pair non-parallel",
        "math": {
          "latex": "\\text{One pair parallel }(m_{AB}=m_{CD})\\;\\text{and second pair non-parallel }(m_{BC}\\neq m_{AD})",
          "fallback": "Trapezium: 1 pair of opposite sides parallel, 1 pair non-parallel",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Checking only two sides are parallel could accidentally include a parallelogram; showing the remaining pair has unequal slopes rules out parallelograms and confirms a trapezium (Option B).",
        "eq": "Two parallel and two non-parallel sides confirms a trapezium, option (B)",
        "math": {
          "latex": "\\text{Two parallel and two non-parallel sides}\\quad(\\text{Option (B)})",
          "fallback": "Two parallel and two non-parallel sides confirms a trapezium, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) Two parallel and two non-parallel sides.",
    "answerMath": {
      "latex": "\\text{(B) Two parallel and two non-parallel sides}",
      "fallback": "(B) Two parallel and two non-parallel sides.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q13. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q14",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Parallelogram Slope Property",
      "ta": "ஆயத்தொலை வடிவியல் — இணைகரம் நிரூபித்தல்"
    },
    "label": {
      "en": "Exercise 5.5 · Q14",
      "ta": "பயிற்சி 5.5 · வினா 14 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Using slopes to prove a quadrilateral is a parallelogram"
    },
    "q": {
      "en": "14. When proving that a quadrilateral is a parallelogram by using slopes you must find\n(A) The slopes of two sides   (B) The slopes of two pair of opposite sides\n(C) The lengths of all sides   (D) Both the lengths and slopes of two sides",
      "ta": "14. சாய்வைப் பயன்படுத்தி நாற்கரமானது ஓர் இணைகரமாக உள்ளது எனக் கூற நாம் காண வேண்டியவை\n(அ) இரு பக்கங்களின் சாய்வுகள்   (ஆ) இரு சோடி எதிர் பக்கங்களின் சாய்வுகள்\n(இ) அனைத்துப் பக்கங்களின் நீளங்கள்   (ஈ) இரு பக்கங்களின் சாய்வுகள் மற்றும் நீளங்கள்"
    },
    "questionMath": {
      "en": [
        "14. When proving that a quadrilateral is a parallelogram by using slopes you must find\n(A) The slopes of two sides   (B) The slopes of two pair of opposite sides\n(C) The lengths of all sides   (D) Both the lengths and slopes of two sides"
      ],
      "ta": [
        "14. சாய்வைப் பயன்படுத்தி நாற்கரமானது ஓர் இணைகரமாக உள்ளது எனக் கூற நாம் காண வேண்டியவை\n(அ) இரு பக்கங்களின் சாய்வுகள்   (ஆ) இரு சோடி எதிர் பக்கங்களின் சாய்வுகள்\n(இ) அனைத்துப் பக்கங்களின் நீளங்கள்   (ஈ) இரு பக்கங்களின் சாய்வுகள் மற்றும் நீளங்கள்"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A parallelogram has both pairs of opposite sides parallel, so using slopes alone requires finding the slopes of both pairs of opposite sides — Option (B).",
        "eq": "Need slopes of both pairs of opposite sides: m_AB = m_CD and m_BC = m_DA",
        "math": {
          "latex": "m_{AB} = m_{CD}\\quad\\text{and}\\quad m_{BC} = m_{DA}",
          "fallback": "Need slopes of both pairs of opposite sides: m_AB = m_CD and m_BC = m_DA",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Checking only two sides leaves open whether the quadrilateral is a trapezium or general figure. Finding the slopes of two pairs of opposite sides suffices without lengths (Option B).",
        "eq": "Slopes of two pairs of opposite sides proves a parallelogram, option (B)",
        "math": {
          "latex": "\\text{Slopes of two pair of opposite sides}\\quad(\\text{Option (B)})",
          "fallback": "Slopes of two pairs of opposite sides proves a parallelogram, option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) The slopes of two pair of opposite sides",
    "answerMath": {
      "latex": "\\text{(B) The slopes of two pair of opposite sides}",
      "fallback": "(B) The slopes of two pair of opposite sides",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q14. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
  },
  {
    "id": "c10-5-ex5-5-q15",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.5",
    "topic": {
      "en": "Coordinate Geometry — Verifying Point of Intersection",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டும் புள்ளியைச் சரிபார்த்தல்"
    },
    "label": {
      "en": "Exercise 5.5 · Q15",
      "ta": "பயிற்சி 5.5 · வினா 15 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Two lines intersecting at (2, 1)"
    },
    "q": {
      "en": "15. (2, 1) is the point of intersection of two lines.\n(A) x − y − 3 = 0; 3x − y − 7 = 0   (B) x + y = 3; 3x + y = 7\n(C) 3x + y = 3; x + y = 7   (D) x + 3y − 3 = 0; x − y − 7 = 0",
      "ta": "15. (2, 1) ஐ சந்திப்புப் புள்ளியாகக் கொண்ட இரு நேர்க்கோடுகள்\n(அ) x − y − 3 = 0; 3x − y − 7 = 0   (ஆ) x + y = 3; 3x + y = 7\n(இ) 3x + y = 3; x + y = 7   (ஈ) x + 3y − 3 = 0; x − y − 7 = 0"
    },
    "questionMath": {
      "en": [
        "15. ",
        {
          "latex": "(2,\\;1)",
          "fallback": "(2, 1)",
          "display": false
        },
        " is the point of intersection of two lines.\n(A) ",
        {
          "latex": "x-y-3=0;\\; 3x-y-7=0",
          "fallback": "x − y − 3 = 0; 3x − y − 7 = 0",
          "display": false
        },
        "   (B) ",
        {
          "latex": "x+y=3;\\; 3x+y=7",
          "fallback": "x + y = 3; 3x + y = 7",
          "display": false
        },
        "\n(C) ",
        {
          "latex": "3x+y=3;\\; x+y=7",
          "fallback": "3x + y = 3; x + y = 7",
          "display": false
        },
        "   (D) ",
        {
          "latex": "x+3y-3=0;\\; x-y-7=0",
          "fallback": "x + 3y − 3 = 0; x − y − 7 = 0",
          "display": false
        }
      ],
      "ta": [
        "15. ",
        {
          "latex": "(2,\\;1)",
          "fallback": "(2, 1)",
          "display": false
        },
        " ஐ சந்திப்புப் புள்ளியாகக் கொண்ட இரு நேர்க்கோடுகள்\n(அ) ",
        {
          "latex": "x-y-3=0;\\; 3x-y-7=0",
          "fallback": "x − y − 3 = 0; 3x − y − 7 = 0",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "x+y=3;\\; 3x+y=7",
          "fallback": "x + y = 3; 3x + y = 7",
          "display": false
        },
        "\n(இ) ",
        {
          "latex": "3x+y=3;\\; x+y=7",
          "fallback": "3x + y = 3; x + y = 7",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "x+3y-3=0;\\; x-y-7=0",
          "fallback": "x + 3y − 3 = 0; x − y − 7 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A point of intersection satisfies both line equations. Substitute x = 2, y = 1 into Option (B): 2 + 1 = 3 and 3(2) + 1 = 7 both hold — Option (B).",
        "eq": "At (2, 1): x + y = 2 + 1 = 3 and 3x + y = 6 + 1 = 7",
        "math": {
          "latex": "\\begin{aligned} x + y &= 2 + 1 = 3 \\\\ 3x + y &= 3(2) + 1 = 7 \\end{aligned}",
          "fallback": "At (2, 1): x + y = 2 + 1 = 3 and 3x + y = 6 + 1 = 7",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — In every other choice, at least one equation fails at (2, 1) (for example in (A), 2 − 1 − 3 = −2 ≠ 0). Since both lines in (B) have different slopes (−1 and −3) and pass through (2, 1), their unique intersection is (2, 1).",
        "eq": "Unique intersection of x + y = 3 and 3x + y = 7 is (2, 1), option (B)",
        "math": {
          "latex": "(2,1)\\;\\text{satisfies both equations in (B)}",
          "fallback": "Unique intersection of x + y = 3 and 3x + y = 7 is (2, 1), option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) x + y = 3; 3x + y = 7",
    "answerMath": {
      "latex": "\\text{(B) } x+y=3;\\; 3x+y=7",
      "fallback": "(B) x + y = 3; 3x + y = 7",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.5 Q15. EN printed p. 236 (PDF p. 242); TA printed p. 244 (PDF p. 250); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 242,
        "ta": 250
      }
    }
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
