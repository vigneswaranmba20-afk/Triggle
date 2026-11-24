/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Exercise 5.2 (Q1–Q13, 17 subparts).
 * English and Tamil prompts and appendix keys checked against rendered 2025 PDF pages:
 *   EN PDF pp. 226–227 (printed pp. 220–221), Answer Appendix PDF p. 346 (printed p. 340)
 *   TA PDF pp. 233–234 (printed pp. 227–228), Answer Appendix PDF p. 361 (printed p. 355)
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-ex5-2-q1-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Slope and Inclination", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு மற்றும் சாய்வுக் கோணம்" },
    "label": { "en": "Exercise 5.2 · Q1(i)", "ta": "பயிற்சி 5.2 · வினா 1(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope when inclination is 90°" },
    "q": {
      "en": "1. What is the slope of a line whose inclination with positive direction of x-axis is\n(i) 90°",
      "ta": "1. X அச்சுடன் மிகை திசையில் சாய்வு கோணத்தைக் கொண்ட கோட்டின் சாய்வு என்ன?\n(i) 90°"
    },
    "questionMath": {
      "en": ["1. What is the slope of a line whose inclination with positive direction of x-axis is\n(i) ", { "latex": "90^\\circ", "fallback": "90°", "display": false }],
      "ta": ["1. X அச்சுடன் மிகை திசையில் சாய்வு கோணத்தைக் கொண்ட கோட்டின் சாய்வு என்ன?\n(i) ", { "latex": "90^\\circ", "fallback": "90°", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use the slope-inclination relation m = tan θ with θ = 90°.",
        "eq": "m = tan θ",
        "math": { "latex": "m=\\tan\\theta", "fallback": "m = tan θ", "display": true }
      },
      {
        "en": "Understand Deeply — A line at θ = 90° to the positive x-axis is completely vertical! Its horizontal run (change in x) between any two points is 0, while slope = rise / run divides by 0. Because division by 0 is impossible, tan 90° and the slope are undefined.",
        "eq": "m = tan 90° = sin 90° / cos 90° = 1 / 0 (undefined)",
        "math": { "latex": "m=\\tan 90^\\circ=\\dfrac{1}{0}\\quad\\text{(not defined)}", "fallback": "m = tan 90° = sin 90° / cos 90° = 1 / 0 (undefined)", "display": true }
      }
    ],
    "answer": "undefined",
    "answerMath": { "latex": "\\text{not defined}", "fallback": "undefined", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q1(i). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q1-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Slope and Inclination", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு மற்றும் சாய்வுக் கோணம்" },
    "label": { "en": "Exercise 5.2 · Q1(ii)", "ta": "பயிற்சி 5.2 · வினா 1(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope when inclination is 0°" },
    "q": {
      "en": "1. What is the slope of a line whose inclination with positive direction of x-axis is\n(ii) 0°",
      "ta": "1. X அச்சுடன் மிகை திசையில் சாய்வு கோணத்தைக் கொண்ட கோட்டின் சாய்வு என்ன?\n(ii) 0°"
    },
    "questionMath": {
      "en": ["1. What is the slope of a line whose inclination with positive direction of x-axis is\n(ii) ", { "latex": "0^\\circ", "fallback": "0°", "display": false }],
      "ta": ["1. X அச்சுடன் மிகை திசையில் சாய்வு கோணத்தைக் கொண்ட கோட்டின் சாய்வு என்ன?\n(ii) ", { "latex": "0^\\circ", "fallback": "0°", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute θ = 0° into the slope-inclination formula m = tan θ.",
        "eq": "m = tan θ",
        "math": { "latex": "m=\\tan\\theta", "fallback": "m = tan θ", "display": true }
      },
      {
        "en": "Understand Deeply — A line at θ = 0° is completely horizontal (parallel to the x-axis). Moving along it gives zero vertical rise (change in y = 0), so slope m = tan 0° = 0.",
        "eq": "m = tan 0° = 0",
        "math": { "latex": "m=\\tan 0^\\circ=0", "fallback": "m = tan 0° = 0", "display": true }
      }
    ],
    "answer": "0",
    "answerMath": { "latex": "0", "fallback": "0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q1(ii). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q2-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Inclination from Slope", "ta": "ஆயத்தொலை வடிவியல் — சாய்விலிருந்து கோணம்" },
    "label": { "en": "Exercise 5.2 · Q2(i)", "ta": "பயிற்சி 5.2 · வினா 2(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Inclination of a line with slope 0" },
    "q": {
      "en": "2. What is the inclination of a line whose slope is\n(i) 0",
      "ta": "2. பின்வரும் சாய்வுகளைக் கொண்ட நேர்க்கோடுகளின் சாய்வுக் கோணம் என்ன?\n(i) 0"
    },
    "questionMath": {
      "en": ["2. What is the inclination of a line whose slope is\n(i) ", { "latex": "0", "fallback": "0", "display": false }],
      "ta": ["2. பின்வரும் சாய்வுகளைக் கொண்ட நேர்க்கோடுகளின் சாய்வுக் கோணம் என்ன?\n(i) ", { "latex": "0", "fallback": "0", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Set tan θ = m = 0 for θ in [0°, 180°) and solve for θ.",
        "eq": "tan θ = 0",
        "math": { "latex": "\\tan\\theta=0", "fallback": "tan θ = 0", "display": true }
      },
      {
        "en": "Understand Deeply — Inclination θ always satisfies 0° ≤ θ < 180°. The unique angle in that interval with tan θ = 0 is θ = 0°, corresponding to a flat horizontal line.",
        "eq": "tan θ = tan 0°, so θ = 0°",
        "math": { "latex": "\\tan\\theta=\\tan 0^\\circ\\quad\\text{so}\\quad \\theta=0^\\circ", "fallback": "tan θ = tan 0°, so θ = 0°", "display": true }
      }
    ],
    "answer": "0°",
    "answerMath": { "latex": "0^\\circ", "fallback": "0°", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q2(i). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q2-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Inclination from Slope", "ta": "ஆயத்தொலை வடிவியல் — சாய்விலிருந்து கோணம்" },
    "label": { "en": "Exercise 5.2 · Q2(ii)", "ta": "பயிற்சி 5.2 · வினா 2(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Inclination of a line with slope 1" },
    "q": {
      "en": "2. What is the inclination of a line whose slope is\n(ii) 1",
      "ta": "2. பின்வரும் சாய்வுகளைக் கொண்ட நேர்க்கோடுகளின் சாய்வுக் கோணம் என்ன?\n(ii) 1"
    },
    "questionMath": {
      "en": ["2. What is the inclination of a line whose slope is\n(ii) ", { "latex": "1", "fallback": "1", "display": false }],
      "ta": ["2. பின்வரும் சாய்வுகளைக் கொண்ட நேர்க்கோடுகளின் சாய்வுக் கோணம் என்ன?\n(ii) ", { "latex": "1", "fallback": "1", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Solve tan θ = 1 within 0° ≤ θ < 180°.",
        "eq": "tan θ = 1",
        "math": { "latex": "\\tan\\theta=1", "fallback": "tan θ = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Slope 1 means vertical rise equals horizontal run (for every 1 step right, go 1 step up), forming an isosceles right triangle with angle θ = 45° since tan 45° = 1.",
        "eq": "tan θ = tan 45°, so θ = 45°",
        "math": { "latex": "\\tan\\theta=\\tan 45^\\circ\\quad\\text{so}\\quad \\theta=45^\\circ", "fallback": "tan θ = tan 45°, so θ = 45°", "display": true }
      }
    ],
    "answer": "45°",
    "answerMath": { "latex": "45^\\circ", "fallback": "45°", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q2(ii). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q3-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Two-Point Slope Formula", "ta": "ஆயத்தொலை வடிவியல் — இரு புள்ளி சாய்வு" },
    "label": { "en": "Exercise 5.2 · Q3(i)", "ta": "பயிற்சி 5.2 · வினா 3(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope of line joining (5, √5) and origin (0, 0)" },
    "q": {
      "en": "3. Find the slope of a line joining the points\n(i) (5, √5) with the origin",
      "ta": "3. கொடுக்கப்பட்ட புள்ளிகளை இணைக்கும் நேர்க்கோட்டின் சாய்வைக் காண்க.\n(i) (5, √5) மற்றும் ஆதிப்புள்ளி"
    },
    "questionMath": {
      "en": ["3. Find the slope of a line joining the points\n(i) ", { "latex": "(5,\\sqrt{5})", "fallback": "(5, √5)", "display": false }, " with the origin"],
      "ta": ["3. கொடுக்கப்பட்ட புள்ளிகளை இணைக்கும் நேர்க்கோட்டின் சாய்வைக் காண்க.\n(i) ", { "latex": "(5,\\sqrt{5})", "fallback": "(5, √5)", "display": false }, " மற்றும் ஆதிப்புள்ளி"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply m = (y₂ − y₁) / (x₂ − x₁) between (5, √5) and the origin (0, 0).",
        "eq": "m = (y₂ − y₁) / (x₂ − x₁)",
        "math": { "latex": "m=\\dfrac{y_2-y_1}{x_2-x_1}", "fallback": "m = (y₂ − y₁) / (x₂ − x₁)", "display": true }
      },
      {
        "en": "Understand Deeply — The origin is the center point O(0, 0) where axes cross. Substitute (x₁, y₁) = (0, 0) and (x₂, y₂) = (5, √5), then simplify 5 = √5 × √5 so one √5 cancels cleanly.",
        "eq": "m = (√5 − 0) / (5 − 0) = √5 / (√5 × √5) = 1 / √5",
        "math": { "latex": "m=\\dfrac{\\sqrt{5}-0}{5-0}=\\dfrac{\\sqrt{5}}{\\sqrt{5}\\cdot\\sqrt{5}}=\\dfrac{1}{\\sqrt{5}}", "fallback": "m = (√5 − 0) / (5 − 0) = √5 / (√5 × √5) = 1 / √5", "display": true }
      }
    ],
    "answer": "1/√5",
    "answerMath": { "latex": "\\dfrac{1}{\\sqrt{5}}", "fallback": "1/√5", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q3(i). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q3-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Two-Point Slope Formula", "ta": "ஆயத்தொலை வடிவியல் — இரு புள்ளி சாய்வு" },
    "label": { "en": "Exercise 5.2 · Q3(ii)", "ta": "பயிற்சி 5.2 · வினா 3(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope of line joining (sin θ, −cos θ) and (−sin θ, cos θ)" },
    "q": {
      "en": "3. Find the slope of a line joining the points\n(ii) (sin θ, −cos θ) and (−sin θ, cos θ)",
      "ta": "3. கொடுக்கப்பட்ட புள்ளிகளை இணைக்கும் நேர்க்கோட்டின் சாய்வைக் காண்க.\n(ii) (sin θ, −cos θ) மற்றும் (−sin θ, cos θ)"
    },
    "questionMath": {
      "en": ["3. Find the slope of a line joining the points\n(ii) ", { "latex": "(\\sin\\theta,-\\cos\\theta)\\text{ and }(-\\sin\\theta,\\cos\\theta)", "fallback": "(sin θ, −cos θ) and (−sin θ, cos θ)", "display": false }],
      "ta": ["3. கொடுக்கப்பட்ட புள்ளிகளை இணைக்கும் நேர்க்கோட்டின் சாய்வைக் காண்க.\n(ii) ", { "latex": "(\\sin\\theta,-\\cos\\theta)\\text{ மற்றும் }(-\\sin\\theta,\\cos\\theta)", "fallback": "(sin θ, −cos θ) மற்றும் (−sin θ, cos θ)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply m = (y₂ − y₁) / (x₂ − x₁), simplify to (2 cos θ)/(−2 sin θ), and use cos θ / sin θ = cot θ.",
        "eq": "m = (y₂ − y₁) / (x₂ − x₁)",
        "math": { "latex": "m=\\dfrac{y_2-y_1}{x_2-x_1}", "fallback": "m = (y₂ − y₁) / (x₂ − x₁)", "display": true }
      },
      {
        "en": "Understand Deeply — Subtract carefully with negative signs: cos θ − (−cos θ) = 2 cos θ in the numerator, and −sin θ − sin θ = −2 sin θ in the denominator.",
        "eq": "m = (cos θ − (−cos θ)) / (−sin θ − sin θ) = (2 cos θ) / (−2 sin θ)",
        "math": { "latex": "m=\\dfrac{\\cos\\theta-(-\\cos\\theta)}{-\\sin\\theta-\\sin\\theta}=\\dfrac{2\\cos\\theta}{-2\\sin\\theta}", "fallback": "m = (cos θ − (−cos θ)) / (−sin θ − sin θ) = (2 cos θ) / (−2 sin θ)", "display": true }
      },
      {
        "en": "Cancel the common factor 2 and rewrite cos θ / sin θ as cot θ (assuming sin θ ≠ 0), leaving −cot θ.",
        "eq": "m = −cos θ / sin θ = −cot θ",
        "math": { "latex": "m=-\\dfrac{\\cos\\theta}{\\sin\\theta}=-\\cot\\theta", "fallback": "m = −cos θ / sin θ = −cot θ", "display": true }
      }
    ],
    "answer": "−cot θ",
    "answerMath": { "latex": "-\\cot\\theta", "fallback": "−cot θ", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q3(ii). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q4",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Midpoint and Perpendicular Slope", "ta": "ஆயத்தொலை வடிவியல் — நடுப்புள்ளி மற்றும் செங்குத்துச் சாய்வு" },
    "label": { "en": "Exercise 5.2 · Q4", "ta": "பயிற்சி 5.2 · வினா 4 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope perpendicular to AP where P is midpoint of (4, 2) and (−6, 4)" },
    "q": {
      "en": "4. What is the slope of a line perpendicular to the line joining A(5, 1) and P where P is the mid-point of the segment joining (4, 2) and (−6, 4).",
      "ta": "4. A(5, 1) மற்றும் P ஆகியவற்றை இணைக்கும் கோட்டிற்குச் செங்குத்தான கோட்டின் சாய்வு என்ன? இதில் P என்பது (4, 2) மற்றும் (−6, 4) என்ற புள்ளிகளை இணைக்கும் கோட்டுத் துண்டின் நடுப்புள்ளி ஆகும்."
    },
    "questionMath": {
      "en": ["4. What is the slope of a line perpendicular to the line joining ", { "latex": "A(5,1)", "fallback": "A(5, 1)", "display": false }, " and P where P is the mid-point of the segment joining ", { "latex": "(4,2)", "fallback": "(4, 2)", "display": false }, " and ", { "latex": "(-6,4)", "fallback": "(−6, 4)", "display": false }, "."],
      "ta": ["4. ", { "latex": "A(5,1)", "fallback": "A(5, 1)", "display": false }, " மற்றும் P ஆகியவற்றை இணைக்கும் கோட்டிற்குச் செங்குத்தான கோட்டின் சாய்வு என்ன? இதில் P என்பது ", { "latex": "(4,2)", "fallback": "(4, 2)", "display": false }, " மற்றும் ", { "latex": "(-6,4)", "fallback": "(−6, 4)", "display": false }, " என்ற புள்ளிகளை இணைக்கும் கோட்டுத் துண்டின் நடுப்புள்ளி ஆகும்."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First find midpoint P = ((4+(−6))/2, (2+4)/2) = (−1, 3), compute slope m(AP) = −1/3, and take its negative reciprocal −1/m(AP) = 3 for the perpendicular slope.",
        "eq": "m_⊥ = −1 / m(AP)",
        "math": { "latex": "m_\\perp=-\\dfrac{1}{m_{AP}}", "fallback": "m_⊥ = −1 / m(AP)", "display": true }
      },
      {
        "en": "Understand Deeply — Find midpoint P by averaging the x-coordinates and averaging the y-coordinates of (4, 2) and (−6, 4).",
        "eq": "P = ((4 − 6)/2, (2 + 4)/2) = (−2/2, 6/2) = (−1, 3)",
        "math": { "latex": "P=\\left(\\dfrac{4+(-6)}{2},\\;\\dfrac{2+4}{2}\\right)=(-1,3)", "fallback": "P = ((4 − 6)/2, (2 + 4)/2) = (−2/2, 6/2) = (−1, 3)", "display": true }
      },
      {
        "en": "Compute the slope of segment AP joining A(5, 1) and P(−1, 3).",
        "eq": "m(AP) = (3 − 1) / (−1 − 5) = 2 / (−6) = −1/3",
        "math": { "latex": "m_{AP}=\\dfrac{3-1}{-1-5}=\\dfrac{2}{-6}=-\\dfrac{1}{3}", "fallback": "m(AP) = (3 − 1) / (−1 − 5) = 2 / (−6) = −1/3", "display": true }
      },
      {
        "en": "Two non-vertical perpendicular lines have slopes whose product equals −1 (m₁ × m₂ = −1). Dividing −1 by −1/3 gives +3.",
        "eq": "m_⊥ = −1 / (−1/3) = 3",
        "math": { "latex": "m_\\perp=-\\dfrac{1}{-1/3}=3", "fallback": "m_⊥ = −1 / (−1/3) = 3", "display": true }
      }
    ],
    "answer": "3",
    "answerMath": { "latex": "3", "fallback": "3", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q4. EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q5",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Collinearity via Equal Slopes", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு மூலம் ஒரு கோடமை" },
    "label": { "en": "Exercise 5.2 · Q5", "ta": "பயிற்சி 5.2 · வினா 5 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show (−3, −4), (7, 2), (12, 5) are collinear" },
    "q": {
      "en": "5. Show that the given points are collinear: (−3, −4), (7, 2) and (12, 5)",
      "ta": "5. (−3, −4), (7, 2) மற்றும் (12, 5) என்ற புள்ளிகள் ஒரு கோடமைந்தவை எனக் காட்டுக."
    },
    "questionMath": {
      "en": ["5. Show that the given points are collinear: ", { "latex": "(-3,-4),\\; (7,2)\\text{ and }(12,5)", "fallback": "(−3, −4), (7, 2) and (12, 5)", "display": false }],
      "ta": ["5. ", { "latex": "(-3,-4),\\; (7,2)\\text{ மற்றும் }(12,5)", "fallback": "(−3, −4), (7, 2) மற்றும் (12, 5)", "display": false }, " என்ற புள்ளிகள் ஒரு கோடமைந்தவை எனக் காட்டுக."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Label A(−3, −4), B(7, 2), C(12, 5). Show slope(AB) = slope(BC) = 3/5; sharing vertex B with identical slope proves A, B, C lie on one line.",
        "eq": "Slope(AB) = Slope(BC)",
        "math": { "latex": "\\text{Slope}(AB)=\\text{Slope}(BC)", "fallback": "Slope(AB) = Slope(BC)", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate slope of segment AB from A(−3, −4) to B(7, 2).",
        "eq": "m(AB) = (2 − (−4)) / (7 − (−3)) = 6 / 10 = 3/5",
        "math": { "latex": "m_{AB}=\\dfrac{2-(-4)}{7-(-3)}=\\dfrac{6}{10}=\\dfrac{3}{5}", "fallback": "m(AB) = (2 − (−4)) / (7 − (−3)) = 6 / 10 = 3/5", "display": true }
      },
      {
        "en": "Calculate slope of segment BC from B(7, 2) to C(12, 5). Both segments rise 3 units for every 5 units right and meet at point B, so they continue seamlessly in a single straight line.",
        "eq": "m(BC) = (5 − 2) / (12 − 7) = 3/5 = m(AB)",
        "math": { "latex": "m_{BC}=\\dfrac{5-2}{12-7}=\\dfrac{3}{5}=m_{AB}", "fallback": "m(BC) = (5 − 2) / (12 − 7) = 3/5 = m(AB)", "display": true }
      }
    ],
    "answer": "Proved collinear (slope of AB = slope of BC = 3/5)",
    "answerMath": { "latex": "\\text{Proved collinear }(m_{AB}=m_{BC}=\\dfrac{3}{5})", "fallback": "Proved collinear (slope of AB = slope of BC = 3/5)", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q5. EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233).",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q6",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Collinearity via Equal Slopes", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு மூலம் ஒரு கோடமை" },
    "label": { "en": "Exercise 5.2 · Q6", "ta": "பயிற்சி 5.2 · வினா 6 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a so (3, −1), (a, 3), (1, −3) are collinear" },
    "q": {
      "en": "6. If the three points (3, −1), (a, 3) and (1, −3) are collinear, find the value of a.",
      "ta": "6. (3, −1), (a, 3) மற்றும் (1, −3) ஆகிய மூன்று புள்ளிகள் ஒரு கோடமைந்தவை எனில் a-யின் மதிப்பு காண்க?"
    },
    "questionMath": {
      "en": ["6. If the three points ", { "latex": "(3,-1),\\; (a,3)\\text{ and }(1,-3)", "fallback": "(3, −1), (a, 3) and (1, −3)", "display": false }, " are collinear, find the value of a."],
      "ta": ["6. ", { "latex": "(3,-1),\\; (a,3)\\text{ மற்றும் }(1,-3)", "fallback": "(3, −1), (a, 3) மற்றும் (1, −3)", "display": false }, " ஆகிய மூன்று புள்ளிகள் ஒரு கோடமைந்தவை எனில் a-யின் மதிப்பு காண்க?"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Label A(3, −1), B(a, 3), C(1, −3). Equate slope(AB) = slope(AC) to solve for a.",
        "eq": "m(AB) = m(AC)",
        "math": { "latex": "m_{AB}=m_{AC}", "fallback": "m(AB) = m(AC)", "display": true }
      },
      {
        "en": "Understand Deeply — First compute the known slope of AC joining (3, −1) and (1, −3).",
        "eq": "m(AC) = (−3 − (−1)) / (1 − 3) = (−2) / (−2) = 1",
        "math": { "latex": "m_{AC}=\\dfrac{-3-(-1)}{1-3}=\\dfrac{-2}{-2}=1", "fallback": "m(AC) = (−3 − (−1)) / (1 − 3) = (−2) / (−2) = 1", "display": true }
      },
      {
        "en": "Set slope(AB) equal to 1 and cross-multiply to isolate a.",
        "eq": "(3 − (−1)) / (a − 3) = 1 gives 4 = a − 3, so a = 7",
        "math": { "latex": "\\dfrac{3-(-1)}{a-3}=1\\quad\\text{so}\\quad a-3=4,\\quad a=7", "fallback": "(3 − (−1)) / (a − 3) = 1 gives 4 = a − 3, so a = 7", "display": true }
      }
    ],
    "answer": "a = 7",
    "answerMath": { "latex": "a=7", "fallback": "a = 7", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q6. EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q7",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Unknown Coordinate from Slope", "ta": "ஆயத்தொலை வடிவியல் — சாய்விலிருந்து தெரியாத ஆயம்" },
    "label": { "en": "Exercise 5.2 · Q7", "ta": "பயிற்சி 5.2 · வினா 7 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a when line through (−2, a) and (9, 3) has slope −1/2" },
    "q": {
      "en": "7. The line through the points (−2, a) and (9, 3) has slope −1/2. Find the value of a.",
      "ta": "7. (−2, a) மற்றும் (9, 3) என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சாய்வு −1/2 எனில் a-யின் மதிப்பு காண்க."
    },
    "questionMath": {
      "en": ["7. The line through the points ", { "latex": "(-2,a)", "fallback": "(−2, a)", "display": false }, " and ", { "latex": "(9,3)", "fallback": "(9, 3)", "display": false }, " has slope ", { "latex": "-\\dfrac{1}{2}", "fallback": "−1/2", "display": false }, ". Find the value of a."],
      "ta": ["7. ", { "latex": "(-2,a)", "fallback": "(−2, a)", "display": false }, " மற்றும் ", { "latex": "(9,3)", "fallback": "(9, 3)", "display": false }, " என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சாய்வு ", { "latex": "-\\dfrac{1}{2}", "fallback": "−1/2", "display": false }, " எனில் a-யின் மதிப்பு காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Set (y₂ − y₁)/(x₂ − x₁) = −1/2 using (−2, a) and (9, 3) and cross-multiply to find a = 17/2.",
        "eq": "(3 − a) / (9 − (−2)) = −1/2",
        "math": { "latex": "\\dfrac{3-a}{9-(-2)}=-\\dfrac{1}{2}", "fallback": "(3 − a) / (9 − (−2)) = −1/2", "display": true }
      },
      {
        "en": "Understand Deeply — Simplify the denominator 9 − (−2) = 11, then multiply both sides by 22 (cross-multiplication) to clear both fractions cleanly.",
        "eq": "(3 − a) / 11 = −1/2 gives 2(3 − a) = −11, so 6 − 2a = −11",
        "math": { "latex": "\\dfrac{3-a}{11}=-\\dfrac{1}{2}\\quad\\text{gives}\\quad 6-2a=-11", "fallback": "(3 − a) / 11 = −1/2 gives 2(3 − a) = −11, so 6 − 2a = −11", "display": true }
      },
      {
        "en": "Subtract 6 from both sides to get −2a = −17, then divide by −2.",
        "eq": "−2a = −17, so a = 17/2",
        "math": { "latex": "-2a=-17\\quad\\text{so}\\quad a=\\dfrac{17}{2}", "fallback": "−2a = −17, so a = 17/2", "display": true }
      }
    ],
    "answer": "a = 17/2",
    "answerMath": { "latex": "a=\\dfrac{17}{2}", "fallback": "a = 17/2", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q7. EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q8",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Perpendicular Slopes", "ta": "ஆயத்தொலை வடிவியல் — செங்குத்துக் கோடுகளின் சாய்வு" },
    "label": { "en": "Exercise 5.2 · Q8", "ta": "பயிற்சி 5.2 · வினா 8 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find x using perpendicularity of (−2, 6)–(4, 8) and (8, 12)–(x, 24)" },
    "q": {
      "en": "8. The line through the points (−2, 6) and (4, 8) is perpendicular to the line through the points (8, 12) and (x, 24). Find the value of x.",
      "ta": "8. (−2, 6) மற்றும் (4, 8) என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோடானது (8, 12) மற்றும் (x, 24) என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டிற்குச் செங்குத்து எனில், x-யின் மதிப்பு காண்க."
    },
    "questionMath": {
      "en": ["8. The line through the points ", { "latex": "(-2,6)", "fallback": "(−2, 6)", "display": false }, " and ", { "latex": "(4,8)", "fallback": "(4, 8)", "display": false }, " is perpendicular to the line through the points ", { "latex": "(8,12)", "fallback": "(8, 12)", "display": false }, " and ", { "latex": "(x,24)", "fallback": "(x, 24)", "display": false }, ". Find the value of x."],
      "ta": ["8. ", { "latex": "(-2,6)", "fallback": "(−2, 6)", "display": false }, " மற்றும் ", { "latex": "(4,8)", "fallback": "(4, 8)", "display": false }, " என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோடானது ", { "latex": "(8,12)", "fallback": "(8, 12)", "display": false }, " மற்றும் ", { "latex": "(x,24)", "fallback": "(x, 24)", "display": false }, " என்ற புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டிற்குச் செங்குத்து எனில், x-யின் மதிப்பு காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute slope m₁ = 1/3 for the first line, use m₁ × m₂ = −1 to get m₂ = −3, and equate 12/(x − 8) = −3 to find x = 4.",
        "eq": "m₁ × m₂ = −1",
        "math": { "latex": "m_1\\times m_2=-1", "fallback": "m₁ × m₂ = −1", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate m₁ for (−2, 6) and (4, 8), and write m₂ in terms of x for (8, 12) and (x, 24).",
        "eq": "m₁ = (8 − 6) / (4 − (−2)) = 2/6 = 1/3; m₂ = (24 − 12) / (x − 8) = 12 / (x − 8)",
        "math": { "latex": "m_1=\\dfrac{8-6}{4-(-2)}=\\dfrac{2}{6}=\\dfrac{1}{3},\\qquad m_2=\\dfrac{24-12}{x-8}=\\dfrac{12}{x-8}", "fallback": "m₁ = (8 − 6) / (4 − (−2)) = 2/6 = 1/3; m₂ = (24 − 12) / (x − 8) = 12 / (x − 8)", "display": true }
      },
      {
        "en": "Multiply m₁ × m₂ = −1, simplify 12 / 3 = 4, and solve for x.",
        "eq": "(1/3) × (12 / (x − 8)) = −1 gives 4 / (x − 8) = −1, so x − 8 = −4, hence x = 4",
        "math": { "latex": "\\dfrac{1}{3}\\cdot\\dfrac{12}{x-8}=-1\\quad\\text{gives}\\quad \\dfrac{4}{x-8}=-1,\\quad x-8=-4,\\quad x=4", "fallback": "(1/3) × (12 / (x − 8)) = −1 gives 4 / (x − 8) = −1, so x − 8 = −4, hence x = 4", "display": true }
      }
    ],
    "answer": "x = 4",
    "answerMath": { "latex": "x=4", "fallback": "x = 4", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q8. EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q9-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Right-Angled Triangle Proof", "ta": "ஆயத்தொலை வடிவியல் — செங்கோண முக்கோண நிரூபணம்" },
    "label": { "en": "Exercise 5.2 · Q9(i)", "ta": "பயிற்சி 5.2 · வினா 9(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show A(1, −4), B(2, −3), C(4, −7) form a right-angled triangle" },
    "q": {
      "en": "9. Show that the given points form a right angled triangle.\n(i) A(1, −4), B(2, −3) and C(4, −7)",
      "ta": "9. கொடுக்கப்பட்ட புள்ளிகள் செங்கோண முக்கோணத்தை அமைக்கும் எனக் காட்டுக.\n(i) A(1, −4), B(2, −3) மற்றும் C(4, −7)"
    },
    "questionMath": {
      "en": ["9. Show that the given points form a right angled triangle.\n(i) ", { "latex": "A(1,-4),\\; B(2,-3)\\text{ and }C(4,-7)", "fallback": "A(1, −4), B(2, −3) and C(4, −7)", "display": false }],
      "ta": ["9. கொடுக்கப்பட்ட புள்ளிகள் செங்கோண முக்கோணத்தை அமைக்கும் எனக் காட்டுக.\n(i) ", { "latex": "A(1,-4),\\; B(2,-3)\\text{ மற்றும் }C(4,-7)", "fallback": "A(1, −4), B(2, −3) மற்றும் C(4, −7)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute slopes of all three sides AB, BC, AC and check whether two side slopes multiply to −1.",
        "eq": "Check m(AB) × m(AC) = −1",
        "math": { "latex": "\\text{Check }m_{AB}\\times m_{AC}=-1", "fallback": "Check m(AB) × m(AC) = −1", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate slope(AB), slope(BC), and slope(AC) using (y₂ − y₁)/(x₂ − x₁).",
        "eq": "m(AB) = (−3 − (−4)) / (2 − 1) = 1; m(BC) = (−7 − (−3)) / (4 − 2) = −4/2 = −2; m(AC) = (−7 − (−4)) / (4 − 1) = −3/3 = −1",
        "math": { "latex": "\\begin{aligned}m_{AB}&=\\dfrac{-3-(-4)}{2-1}=1\\\\ m_{BC}&=\\dfrac{-7-(-3)}{4-2}=-2\\\\ m_{AC}&=\\dfrac{-7-(-4)}{4-1}=-1\\end{aligned}", "fallback": "m(AB) = (−3 − (−4)) / (2 − 1) = 1; m(BC) = (−7 − (−3)) / (4 − 2) = −4/2 = −2; m(AC) = (−7 − (−4)) / (4 − 1) = −3/3 = −1", "display": true }
      },
      {
        "en": "Multiply m(AB) × m(AC) = (1)(−1) = −1. Therefore side AB is perpendicular to side AC, giving ∠A = 90°, so ΔABC is a right-angled triangle.",
        "eq": "m(AB) × m(AC) = (1)(−1) = −1, so AB ⊥ AC and ∠A = 90°",
        "math": { "latex": "m_{AB}\\times m_{AC}=(1)(-1)=-1\\quad\\text{so }AB\\perp AC\\text{ and }\\angle A=90^\\circ", "fallback": "m(AB) × m(AC) = (1)(−1) = −1, so AB ⊥ AC and ∠A = 90°", "display": true }
      }
    ],
    "answer": "Yes, ΔABC is right-angled at A (m(AB) × m(AC) = −1)",
    "answerMath": { "latex": "\\text{Yes, }\\triangle ABC\\text{ is right-angled at }A", "fallback": "Yes, ΔABC is right-angled at A (m(AB) × m(AC) = −1)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-2-q9-i.svg",
    "figureAlt": {
      "en": "Coordinate plot of triangle ABC with vertices A(1,-4), B(2,-3), C(4,-7) showing right angle at A.",
      "ta": "A(1,-4)-இல் செங்கோணம் கொண்ட முக்கோணம் ABC வரைபடம்."
    },
    "figureCaption": { "en": "Right angle at vertex A(1, −4)", "ta": "முனை A(1, −4)-இல் செங்கோணம்" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q9(i). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q9-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Right-Angled Triangle Proof", "ta": "ஆயத்தொலை வடிவியல் — செங்கோண முக்கோண நிரூபணம்" },
    "label": { "en": "Exercise 5.2 · Q9(ii)", "ta": "பயிற்சி 5.2 · வினா 9(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show L(0, 5), M(9, 12), N(3, 14) form a right-angled triangle" },
    "q": {
      "en": "9. Show that the given points form a right angled triangle.\n(ii) L(0, 5), M(9, 12) and N(3, 14)",
      "ta": "9. கொடுக்கப்பட்ட புள்ளிகள் செங்கோண முக்கோணத்தை அமைக்கும் எனக் காட்டுக.\n(ii) L(0, 5), M(9, 12) மற்றும் N(3, 14)"
    },
    "questionMath": {
      "en": ["9. Show that the given points form a right angled triangle.\n(ii) ", { "latex": "L(0,5),\\; M(9,12)\\text{ and }N(3,14)", "fallback": "L(0, 5), M(9, 12) and N(3, 14)", "display": false }],
      "ta": ["9. கொடுக்கப்பட்ட புள்ளிகள் செங்கோண முக்கோணத்தை அமைக்கும் எனக் காட்டுக.\n(ii) ", { "latex": "L(0,5),\\; M(9,12)\\text{ மற்றும் }N(3,14)", "fallback": "L(0, 5), M(9, 12) மற்றும் N(3, 14)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute the three side slopes m(LM), m(MN), m(LN) and confirm m(MN) × m(LN) = −1, proving ∠N = 90°.",
        "eq": "Check m(MN) × m(LN) = −1",
        "math": { "latex": "\\text{Check }m_{MN}\\times m_{LN}=-1", "fallback": "Check m(MN) × m(LN) = −1", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate all three side slopes using (y₂ − y₁)/(x₂ − x₁).",
        "eq": "m(LM) = (12 − 5)/(9 − 0) = 7/9; m(MN) = (14 − 12)/(3 − 9) = 2/(−6) = −1/3; m(LN) = (14 − 5)/(3 − 0) = 9/3 = 3",
        "math": { "latex": "\\begin{aligned}m_{LM}&=\\dfrac{12-5}{9-0}=\\dfrac{7}{9}\\\\ m_{MN}&=\\dfrac{14-12}{3-9}=\\dfrac{2}{-6}=-\\dfrac{1}{3}\\\\ m_{LN}&=\\dfrac{14-5}{3-0}=\\dfrac{9}{3}=3\\end{aligned}", "fallback": "m(LM) = (12 − 5)/(9 − 0) = 7/9; m(MN) = (14 − 12)/(3 − 9) = 2/(−6) = −1/3; m(LN) = (14 − 5)/(3 − 0) = 9/3 = 3", "display": true }
      },
      {
        "en": "Multiply m(MN) × m(LN) = (−1/3)(3) = −1. Because their product is −1, MN ⊥ LN and ∠N = 90°, so ΔLMN is a right-angled triangle.",
        "eq": "m(MN) × m(LN) = (−1/3)(3) = −1, so MN ⊥ LN and ∠N = 90°",
        "math": { "latex": "m_{MN}\\times m_{LN}=\\left(-\\dfrac{1}{3}\\right)(3)=-1\\quad\\text{so }MN\\perp LN\\text{ and }\\angle N=90^\\circ", "fallback": "m(MN) × m(LN) = (−1/3)(3) = −1, so MN ⊥ LN and ∠N = 90°", "display": true }
      }
    ],
    "answer": "Yes, ΔLMN is right-angled at N (m(MN) × m(LN) = −1)",
    "answerMath": { "latex": "\\text{Yes, }\\triangle LMN\\text{ is right-angled at }N", "fallback": "Yes, ΔLMN is right-angled at N (m(MN) × m(LN) = −1)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-2-q9-ii.svg",
    "figureAlt": {
      "en": "Coordinate plot of triangle LMN with vertices L(0,5), M(9,12), N(3,14) showing right angle at N.",
      "ta": "N(3,14)-இல் செங்கோணம் கொண்ட முக்கோணம் LMN வரைபடம்."
    },
    "figureCaption": { "en": "Right angle at vertex N(3, 14)", "ta": "முனை N(3, 14)-இல் செங்கோணம்" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q9(ii). EN printed p. 220 (PDF p. 226); TA printed p. 227 (PDF p. 233); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 226, "ta": 233 } }
  },
  {
    "id": "c10-5-ex5-2-q10",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Parallelogram Proof", "ta": "ஆயத்தொலை வடிவியல் — இணைகர நிரூபணம்" },
    "label": { "en": "Exercise 5.2 · Q10", "ta": "பயிற்சி 5.2 · வினா 10 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show A(2.5, 3.5), B(10, −4), C(2.5, −2.5), D(−5, 5) form a parallelogram" },
    "q": {
      "en": "10. Show that the given points form a parallelogram :\nA(2.5, 3.5), B(10, −4), C(2.5, −2.5) and D(−5, 5)",
      "ta": "10. A(2.5, 3.5), B(10, −4), C(2.5, −2.5) மற்றும் D(−5, 5) ஆகியன இணைகரத்தின் முனைப் புள்ளிகள் எனக் காட்டுக."
    },
    "questionMath": {
      "en": ["10. Show that the given points form a parallelogram :\n", { "latex": "A(2.5,3.5),\\; B(10,-4),\\; C(2.5,-2.5)\\text{ and }D(-5,5)", "fallback": "A(2.5, 3.5), B(10, −4), C(2.5, −2.5) and D(−5, 5)", "display": false }],
      "ta": ["10. ", { "latex": "A(2.5,3.5),\\; B(10,-4),\\; C(2.5,-2.5)\\text{ மற்றும் }D(-5,5)", "fallback": "A(2.5, 3.5), B(10, −4), C(2.5, −2.5) மற்றும் D(−5, 5)", "display": false }, " ஆகியன இணைகரத்தின் முனைப் புள்ளிகள் எனக் காட்டுக."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A quadrilateral is a parallelogram if both pairs of opposite sides are parallel. Show m(AB) = m(CD) = −1 and m(BC) = m(DA) = −1/5.",
        "eq": "m(AB) = m(CD) and m(BC) = m(DA)",
        "math": { "latex": "m_{AB}=m_{CD}\\quad\\text{and}\\quad m_{BC}=m_{DA}", "fallback": "m(AB) = m(CD) and m(BC) = m(DA)", "display": true }
      },
      {
        "en": "Understand Deeply — Compute slopes of opposite sides AB and CD.",
        "eq": "m(AB) = (−4 − 3.5)/(10 − 2.5) = −7.5/7.5 = −1; m(CD) = (5 − (−2.5))/(−5 − 2.5) = 7.5/(−7.5) = −1",
        "math": { "latex": "\\begin{aligned}m_{AB}&=\\dfrac{-4-3.5}{10-2.5}=\\dfrac{-7.5}{7.5}=-1\\\\ m_{CD}&=\\dfrac{5-(-2.5)}{-5-2.5}=\\dfrac{7.5}{-7.5}=-1\\end{aligned}", "fallback": "m(AB) = (−4 − 3.5)/(10 − 2.5) = −7.5/7.5 = −1; m(CD) = (5 − (−2.5))/(−5 − 2.5) = 7.5/(−7.5) = −1", "display": true }
      },
      {
        "en": "Compute slopes of the other opposite pair BC and DA. Notice both equal −1/5, so both opposite pairs are parallel and ABCD is a parallelogram.",
        "eq": "m(BC) = (−2.5 − (−4))/(2.5 − 10) = 1.5/(−7.5) = −1/5; m(DA) = (3.5 − 5)/(2.5 − (−5)) = −1.5/7.5 = −1/5",
        "math": { "latex": "\\begin{aligned}m_{BC}&=\\dfrac{-2.5-(-4)}{2.5-10}=\\dfrac{1.5}{-7.5}=-\\dfrac{1}{5}\\\\ m_{DA}&=\\dfrac{3.5-5}{2.5-(-5)}=\\dfrac{-1.5}{7.5}=-\\dfrac{1}{5}\\end{aligned}", "fallback": "m(BC) = (−2.5 − (−4))/(2.5 − 10) = 1.5/(−7.5) = −1/5; m(DA) = (3.5 − 5)/(2.5 − (−5)) = −1.5/7.5 = −1/5", "display": true }
      }
    ],
    "answer": "Proved parallelogram (AB ∥ CD and BC ∥ DA)",
    "answerMath": { "latex": "\\text{Proved parallelogram }(m_{AB}=m_{CD}=-1,\\; m_{BC}=m_{DA}=-\\dfrac{1}{5})", "fallback": "Proved parallelogram (AB ∥ CD and BC ∥ DA)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-2-q10.svg",
    "figureAlt": {
      "en": "Coordinate plot of parallelogram ABCD with vertices A(2.5,3.5), B(10,-4), C(2.5,-2.5), and D(-5,5).",
      "ta": "A(2.5,3.5), B(10,-4), C(2.5,-2.5), D(-5,5) இணைகரம் ABCD வரைபடம்."
    },
    "figureCaption": { "en": "Opposite sides share equal slopes", "ta": "எதிரெதிர் பக்கங்களின் சாய்வுகள் சமம்" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q10. EN printed p. 221 (PDF p. 227); TA printed p. 228 (PDF p. 234).",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 227, "ta": 234 } }
  },
  {
    "id": "c10-5-ex5-2-q11",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Unknown Vertex of a Parallelogram", "ta": "ஆயத்தொலை வடிவியல் — இணைகரத்தின் தெரியாத முனை" },
    "label": { "en": "Exercise 5.2 · Q11", "ta": "பயிற்சி 5.2 · வினா 11 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find x and y if A(2, 2), B(−2, −3), C(1, −3), D(x, y) form a parallelogram" },
    "q": {
      "en": "11. If the points A(2, 2), B(−2, −3), C(1, −3) and D(x, y) form a parallelogram then find the value of x and y.",
      "ta": "11. A(2, 2), B(−2, −3), C(1, −3) மற்றும் D(x, y) ஆகிய புள்ளிகள் இணைகரத்தை அமைக்கும் எனில், x மற்றும் y-யின் மதிப்பைக் காண்க.."
    },
    "questionMath": {
      "en": ["11. If the points ", { "latex": "A(2,2),\\; B(-2,-3),\\; C(1,-3)\\text{ and }D(x,y)", "fallback": "A(2, 2), B(−2, −3), C(1, −3) and D(x, y)", "display": false }, " form a parallelogram then find the value of x and y."],
      "ta": ["11. ", { "latex": "A(2,2),\\; B(-2,-3),\\; C(1,-3)\\text{ மற்றும் }D(x,y)", "fallback": "A(2, 2), B(−2, −3), C(1, −3) மற்றும் D(x, y)", "display": false }, " ஆகிய புள்ளிகள் இணைகரத்தை அமைக்கும் எனில், x மற்றும் y-யின் மதிப்பைக் காண்க.."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: In any parallelogram ABCD, diagonals AC and BD bisect each other, so Midpoint(AC) = Midpoint(BD). Equate x- and y-coordinates directly to find x = 5 and y = 2.",
        "eq": "Midpoint(AC) = Midpoint(BD)",
        "math": { "latex": "\\text{Midpoint}(AC)=\\text{Midpoint}(BD)", "fallback": "Midpoint(AC) = Midpoint(BD)", "display": true }
      },
      {
        "en": "Understand Deeply — Why this also agrees with parallel slopes: B(−2, −3) to C(1, −3) is horizontal (y = −3) with step +3 right and 0 up, so A(2, 2) must step +3 right and 0 up to D(5, 2). Equating diagonal midpoints proves this algebraically.",
        "eq": "((2 + 1)/2, (2 − 3)/2) = ((−2 + x)/2, (−3 + y)/2)",
        "math": { "latex": "\\left(\\dfrac{2+1}{2},\\;\\dfrac{2+(-3)}{2}\\right)=\\left(\\dfrac{-2+x}{2},\\;\\dfrac{-3+y}{2}\\right)", "fallback": "((2 + 1)/2, (2 − 3)/2) = ((−2 + x)/2, (−3 + y)/2)", "display": true }
      },
      {
        "en": "Match numerators after canceling /2 on both sides.",
        "eq": "3 = −2 + x gives x = 5; −1 = −3 + y gives y = 2",
        "math": { "latex": "\\begin{aligned}3&=-2+x\\quad\\text{gives}\\quad x=5\\\\ -1&=-3+y\\quad\\text{gives}\\quad y=2\\end{aligned}", "fallback": "3 = −2 + x gives x = 5; −1 = −3 + y gives y = 2", "display": true }
      }
    ],
    "answer": "x = 5, y = 2",
    "answerMath": { "latex": "x=5,\\quad y=2", "fallback": "x = 5, y = 2", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q11. EN printed p. 221 (PDF p. 227); TA printed p. 228 (PDF p. 234); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 227, "ta": 234 } }
  },
  {
    "id": "c10-5-ex5-2-q12",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Trapezium Proof", "ta": "ஆயத்தொலை வடிவியல் — சரிவக நிரூபணம்" },
    "label": { "en": "Exercise 5.2 · Q12", "ta": "பயிற்சி 5.2 · வினா 12 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show A(3, −4), B(9, −4), C(5, −7), D(7, −7) form a trapezium" },
    "q": {
      "en": "12. Let A(3, −4), B(9, −4), C(5, −7) and D(7, −7). Show that ABCD is a trapezium.",
      "ta": "12. A(3, −4), B(9, −4), C(5, −7) மற்றும் D(7, −7) ஆகிய புள்ளிகள் ABCD என்ற சரிவகத்தை அமைக்கும் எனக் காட்டுக."
    },
    "questionMath": {
      "en": ["12. Let ", { "latex": "A(3,-4),\\; B(9,-4),\\; C(5,-7)\\text{ and }D(7,-7)", "fallback": "A(3, −4), B(9, −4), C(5, −7) and D(7, −7)", "display": false }, ". Show that ABCD is a trapezium."],
      "ta": ["12. ", { "latex": "A(3,-4),\\; B(9,-4),\\; C(5,-7)\\text{ மற்றும் }D(7,-7)", "fallback": "A(3, −4), B(9, −4), C(5, −7) மற்றும் D(7, −7)", "display": false }, " ஆகிய புள்ளிகள் ABCD என்ற சரிவகத்தை அமைக்கும் எனக் காட்டுக."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Show one pair of opposite sides is parallel (slope AB = slope CD = 0). On y = −7, C(5, −7) lies left of D(7, −7), so the convex trapezium boundary legs in the plot are AC and BD (m_AC = −3/2 ≠ m_BD = 3/2), while cyclic pairs BC and AD also have unequal slopes (3/4 ≠ −3/4).",
        "eq": "m(AB) = m(CD) = 0; m(AC) = −3/2 ≠ m(BD) = 3/2 (and m(BC) = 3/4 ≠ m(AD) = −3/4)",
        "math": { "latex": "m_{AB}=m_{CD}=0\\quad\\text{and}\\quad m_{AC}=-\\dfrac{3}{2}\\ne m_{BD}=\\dfrac{3}{2}", "fallback": "m(AB) = m(CD) = 0; m(AC) = −3/2 ≠ m(BD) = 3/2 (and m(BC) = 3/4 ≠ m(AD) = −3/4)", "display": true }
      },
      {
        "en": "Understand Deeply — Notice A(3, −4) and B(9, −4) both lie on horizontal line y = −4, while C(5, −7) and D(7, −7) both lie on horizontal line y = −7, making AB parallel to CD.",
        "eq": "m(AB) = (−4 − (−4))/(9 − 3) = 0/6 = 0; m(CD) = (−7 − (−7))/(7 − 5) = 0/2 = 0",
        "math": { "latex": "m_{AB}=\\dfrac{-4-(-4)}{9-3}=0,\\qquad m_{CD}=\\dfrac{-7-(-7)}{7-5}=0", "fallback": "m(AB) = (−4 − (−4))/(9 − 3) = 0/6 = 0; m(CD) = (−7 − (−7))/(7 − 5) = 0/2 = 0", "display": true }
      },
      {
        "en": "Check the non-parallel sides joining y = −4 to y = −7. Because C(5, −7) is left of D(7, −7), the convex boundary legs drawn in the figure are AC and BD (m_AC = −3/2 ≠ m_BD = 3/2), and the alphabetical cyclic segments BC and AD also have unequal slopes (3/4 ≠ −3/4). Since only one pair of sides is parallel, the figure is a trapezium.",
        "eq": "m(AC) = (−7 − (−4))/(5 − 3) = −3/2, m(BD) = (−7 − (−4))/(7 − 9) = 3/2; m(BC) = 3/4 ≠ m(AD) = −3/4",
        "math": { "latex": "\\begin{aligned}m_{AC}&=\\dfrac{-7-(-4)}{5-3}=-\\dfrac{3}{2},\\quad m_{BD}=\\dfrac{-7-(-4)}{7-9}=\\dfrac{3}{2}\\quad (m_{AC}\\ne m_{BD})\\\\ m_{BC}&=\\dfrac{-7-(-4)}{5-9}=\\dfrac{3}{4},\\quad m_{AD}=\\dfrac{-7-(-4)}{7-3}=-\\dfrac{3}{4}\\quad (m_{BC}\\ne m_{AD})\\end{aligned}", "fallback": "m(AC) = (−7 − (−4))/(5 − 3) = −3/2, m(BD) = (−7 − (−4))/(7 − 9) = 3/2; m(BC) = 3/4 ≠ m(AD) = −3/4", "display": true }
      }
    ],
    "answer": "Proved trapezium (AB ∥ CD with slope 0; non-parallel boundary legs AC, BD have slopes −3/2 ≠ 3/2 and cyclic pair BC, AD have 3/4 ≠ −3/4)",
    "answerMath": { "latex": "\\text{Proved trapezium }(AB\\parallel CD,\\; m_{AC}=-\\dfrac{3}{2}\\ne m_{BD}=\\dfrac{3}{2})", "fallback": "Proved trapezium (AB ∥ CD with slope 0; non-parallel boundary legs AC, BD have slopes −3/2 ≠ 3/2 and cyclic pair BC, AD have 3/4 ≠ −3/4)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-2-q12.svg",
    "figureAlt": {
      "en": "Coordinate plot showing parallel horizontal bases A(3,-4)-B(9,-4) and C(5,-7)-D(7,-7) forming a trapezium.",
      "ta": "இணைப் பக்கங்கள் AB, CD கொண்ட சரிவகம் வரைபடம்."
    },
    "figureCaption": { "en": "Horizontal bases AB and CD have slope 0", "ta": "கிடைமட்டப் பக்கங்கள் AB, CD சாய்வு = 0" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q12. EN printed p. 221 (PDF p. 227); TA printed p. 228 (PDF p. 234).",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 227, "ta": 234 } }
  },
  {
    "id": "c10-5-ex5-2-q13",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.2",
    "topic": { "en": "Coordinate Geometry — Varignon Parallelogram Proof", "ta": "ஆயத்தொலை வடிவியல் — நடுப்புள்ளி இணைகர நிரூபணம்" },
    "label": { "en": "Exercise 5.2 · Q13", "ta": "பயிற்சி 5.2 · வினா 13 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Show midpoints of sides of A(−4,−2), B(5,−1), C(6,5), D(−7,6) form a parallelogram" },
    "q": {
      "en": "13. A quadrilateral has vertices at A(−4, −2), B(5, −1), C(6, 5) and D(−7, 6). Show that the mid-points of its sides form a parallelogram.",
      "ta": "13. A(−4, −2), B(5, −1), C(6, 5) மற்றும் D(−7, 6) ஆகியவற்றை முனைப் புள்ளிகளாகக் கொண்ட நாற்கரத்தின் பக்கங்களின் நடுப்புள்ளிகள் ஓர் இணைகரத்தை அமைக்கும் எனக் காட்டுக."
    },
    "questionMath": {
      "en": ["13. A quadrilateral has vertices at ", { "latex": "A(-4,-2),\\; B(5,-1),\\; C(6,5)\\text{ and }D(-7,6)", "fallback": "A(−4, −2), B(5, −1), C(6, 5) and D(−7, 6)", "display": false }, ". Show that the mid-points of its sides form a parallelogram."],
      "ta": ["13. ", { "latex": "A(-4,-2),\\; B(5,-1),\\; C(6,5)\\text{ மற்றும் }D(-7,6)", "fallback": "A(−4, −2), B(5, −1), C(6, 5) மற்றும் D(−7, 6)", "display": false }, " ஆகியவற்றை முனைப் புள்ளிகளாகக் கொண்ட நாற்கரத்தின் பக்கங்களின் நடுப்புள்ளிகள் ஓர் இணைகரத்தை அமைக்கும் எனக் காட்டுக."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find the four midpoints P, Q, R, S of sides AB, BC, CD, DA, then verify m(PQ) = m(RS) and m(QR) = m(SP).",
        "eq": "PQRS is a parallelogram when m(PQ) = m(RS) and m(QR) = m(SP)",
        "math": { "latex": "m_{PQ}=m_{RS}\\quad\\text{and}\\quad m_{QR}=m_{SP}", "fallback": "PQRS is a parallelogram when m(PQ) = m(RS) and m(QR) = m(SP)", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate all four midpoints using ((x₁+x₂)/2, (y₁+y₂)/2).",
        "eq": "P = (1/2, −3/2), Q = (11/2, 2), R = (−1/2, 11/2), S = (−11/2, 2)",
        "math": { "latex": "\\begin{aligned}P&=\\left(\\dfrac{-4+5}{2},\\;\\dfrac{-2-1}{2}\\right)=\\left(\\dfrac{1}{2},-\\dfrac{3}{2}\\right),\\quad Q=\\left(\\dfrac{5+6}{2},\\;\\dfrac{-1+5}{2}\\right)=\\left(\\dfrac{11}{2},2\\right)\\\\ R&=\\left(\\dfrac{6-7}{2},\\;\\dfrac{5+6}{2}\\right)=\\left(-\\dfrac{1}{2},\\dfrac{11}{2}\\right),\\quad S=\\left(\\dfrac{-7-4}{2},\\;\\dfrac{6-2}{2}\\right)=\\left(-\\dfrac{11}{2},2\\right)\\end{aligned}", "fallback": "P = (1/2, −3/2), Q = (11/2, 2), R = (−1/2, 11/2), S = (−11/2, 2)", "display": true }
      },
      {
        "en": "Compute slopes of opposite pairs PQ & RS, and QR & SP. Equal slopes on both pairs prove PQRS is always a parallelogram (Varignon's theorem).",
        "eq": "m(PQ) = (7/2)/5 = 7/10 = m(RS); m(QR) = (7/2)/(−6) = −7/12 = m(SP)",
        "math": { "latex": "\\begin{aligned}m_{PQ}&=\\dfrac{2-(-3/2)}{11/2-1/2}=\\dfrac{7/2}{5}=\\dfrac{7}{10},\\qquad m_{RS}=\\dfrac{2-11/2}{-11/2-(-1/2)}=\\dfrac{-7/2}{-5}=\\dfrac{7}{10}\\\\ m_{QR}&=\\dfrac{11/2-2}{-1/2-11/2}=\\dfrac{7/2}{-6}=-\\dfrac{7}{12},\\qquad m_{SP}=\\dfrac{-3/2-2}{1/2-(-11/2)}=\\dfrac{-7/2}{6}=-\\dfrac{7}{12}\\end{aligned}", "fallback": "m(PQ) = (7/2)/5 = 7/10 = m(RS); m(QR) = (7/2)/(−6) = −7/12 = m(SP)", "display": true }
      }
    ],
    "answer": "Proved PQRS is a parallelogram (m(PQ) = m(RS) = 7/10 and m(QR) = m(SP) = −7/12)",
    "answerMath": { "latex": "\\text{Proved parallelogram }(m_{PQ}=m_{RS}=\\dfrac{7}{10},\\; m_{QR}=m_{SP}=-\\dfrac{7}{12})", "fallback": "Proved PQRS is a parallelogram (m(PQ) = m(RS) = 7/10 and m(QR) = m(SP) = −7/12)", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-2-q13.svg",
    "figureAlt": {
      "en": "Quadrilateral ABCD with side midpoints P, Q, R, S connected to form inner parallelogram PQRS.",
      "ta": "ABCD பக்கங்களின் நடுப்புள்ளிகள் P, Q, R, S இணைத்து இணைகரம் PQRS அமைப்பதைக் காட்டும் படம்."
    },
    "figureCaption": { "en": "Side midpoints P, Q, R, S form a parallelogram", "ta": "பக்கங்களின் நடுப்புள்ளிகள் P, Q, R, S ஓர் இணைகரம்" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.2 Q13. EN printed p. 221 (PDF p. 227); TA printed p. 228 (PDF p. 234).",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 227, "ta": 234 } }
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
