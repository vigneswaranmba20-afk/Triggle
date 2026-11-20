/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Exercise 5.3 (Q1–Q14, 22 subparts).
 * English and Tamil prompts and appendix keys checked against rendered 2025 PDF pages:
 *   EN PDF pp. 235–236 (printed pp. 229–230), Answer Appendix PDF pp. 346–347 (printed pp. 340–341)
 *   TA PDF pp. 242–243 (printed pp. 236–237), Answer Appendix PDF p. 361 (printed p. 355)
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-ex5-3-q1-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Straight Line Equations", "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டின் சமன்பாடு" },
    "label": { "en": "Exercise 5.3 · Q1(i)", "ta": "பயிற்சி 5.3 · வினா 1(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through midpoint of (1, −5) and (4, 2) parallel to X-axis" },
    "q": {
      "en": "1. Find the equation of a straight line passing through the mid-point of a line segment joining the points (1, −5), (4, 2) and parallel to\n(i) X axis",
      "ta": "1. (1, −5) மற்றும் (4, 2) என்ற புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி வழியாகச் செல்வதும், கீழ்க்காண்பனவற்றிற்கு இணையானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(i) X அச்சு"
    },
    "questionMath": {
      "en": ["1. Find the equation of a straight line passing through the mid-point of a line segment joining the points ", { "latex": "(1,-5),\\; (4,2)", "fallback": "(1, −5), (4, 2)", "display": false }, " and parallel to\n(i) X axis"],
      "ta": ["1. ", { "latex": "(1,-5)", "fallback": "(1, −5)", "display": false }, " மற்றும் ", { "latex": "(4,2)", "fallback": "(4, 2)", "display": false }, " என்ற புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி வழியாகச் செல்வதும், கீழ்க்காண்பனவற்றிற்கு இணையானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(i) X அச்சு"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First compute midpoint M = (5/2, −3/2). Any horizontal line parallel to the X-axis has a constant y-coordinate y = k, so y = −3/2, giving 2y + 3 = 0.",
        "eq": "M = ((1 + 4)/2, (−5 + 2)/2) = (5/2, −3/2)",
        "math": { "latex": "M=\\left(\\dfrac{1+4}{2},\\;\\dfrac{-5+2}{2}\\right)=\\left(\\dfrac{5}{2},-\\dfrac{3}{2}\\right)", "fallback": "M = ((1 + 4)/2, (−5 + 2)/2) = (5/2, −3/2)", "display": true }
      },
      {
        "en": "Understand Deeply — Every point on a line parallel to the X-axis stays at the exact same vertical height above or below the X-axis. Since the line passes through (5/2, −3/2), every point (x, y) on it must have y = −3/2. Multiply by 2 and collect terms on the left.",
        "eq": "y = −3/2 gives 2y = −3, so 2y + 3 = 0",
        "math": { "latex": "y=-\\dfrac{3}{2}\\quad\\text{gives}\\quad 2y=-3,\\quad 2y+3=0", "fallback": "y = −3/2 gives 2y = −3, so 2y + 3 = 0", "display": true }
      }
    ],
    "answer": "2y + 3 = 0", "answerMath": { "latex": "2y+3=0", "fallback": "2y + 3 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q1(i). EN printed p. 229 (PDF p. 235); TA printed p. 236 (PDF p. 242); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 242 } }
  },
  {
    "id": "c10-5-ex5-3-q1-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Straight Line Equations", "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டின் சமன்பாடு" },
    "label": { "en": "Exercise 5.3 · Q1(ii)", "ta": "பயிற்சி 5.3 · வினா 1(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through midpoint of (1, −5) and (4, 2) parallel to Y-axis" },
    "q": {
      "en": "1. Find the equation of a straight line passing through the mid-point of a line segment joining the points (1, −5), (4, 2) and parallel to\n(ii) Y axis",
      "ta": "1. (1, −5) மற்றும் (4, 2) என்ற புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி வழியாகச் செல்வதும், கீழ்க்காண்பனவற்றிற்கு இணையானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(ii) Y அச்சு"
    },
    "questionMath": {
      "en": ["1. Find the equation of a straight line passing through the mid-point of a line segment joining the points ", { "latex": "(1,-5),\\; (4,2)", "fallback": "(1, −5), (4, 2)", "display": false }, " and parallel to\n(ii) Y axis"],
      "ta": ["1. ", { "latex": "(1,-5)", "fallback": "(1, −5)", "display": false }, " மற்றும் ", { "latex": "(4,2)", "fallback": "(4, 2)", "display": false }, " என்ற புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி வழியாகச் செல்வதும், கீழ்க்காண்பனவற்றிற்கு இணையானதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(ii) Y அச்சு"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use midpoint M = (5/2, −3/2). Any vertical line parallel to the Y-axis keeps a fixed x-coordinate x = h, so x = 5/2, giving 2x − 5 = 0.",
        "eq": "M = ((1 + 4)/2, (−5 + 2)/2) = (5/2, −3/2)",
        "math": { "latex": "M=\\left(\\dfrac{1+4}{2},\\;\\dfrac{-5+2}{2}\\right)=\\left(\\dfrac{5}{2},-\\dfrac{3}{2}\\right)", "fallback": "M = ((1 + 4)/2, (−5 + 2)/2) = (5/2, −3/2)", "display": true }
      },
      {
        "en": "Understand Deeply — Moving up or down parallel to the Y-axis never changes your horizontal distance from the Y-axis, so every point (x, y) keeps x = 5/2. Clear the denominator by multiplying by 2.",
        "eq": "x = 5/2 gives 2x = 5, so 2x − 5 = 0",
        "math": { "latex": "x=\\dfrac{5}{2}\\quad\\text{gives}\\quad 2x=5,\\quad 2x-5=0", "fallback": "x = 5/2 gives 2x = 5, so 2x − 5 = 0", "display": true }
      }
    ],
    "answer": "2x − 5 = 0", "answerMath": { "latex": "2x-5=0", "fallback": "2x − 5 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q1(ii). EN printed p. 229 (PDF p. 235); TA printed p. 236 (PDF p. 242); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 242 } }
  },
  {
    "id": "c10-5-ex5-3-q2", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Slope-Intercept Form", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு-வெட்டுத்துண்டு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q2", "ta": "பயிற்சி 5.3 · வினா 2 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope, inclination, and y-intercept of 2(x − y) + 5 = 0" },
    "q": {
      "en": "2. The equation of a straight line is 2(x − y) + 5 = 0. Find its slope, inclination and intercept on the Y axis.",
      "ta": "2. 2(x − y) + 5 = 0 என்ற நேர்க்கோட்டு சமன்பாட்டின் சாய்வு, சாய்வு கோணம் மற்றும் y-வெட்டுத்துண்டு ஆகியவற்றைக் காண்க."
    },
    "questionMath": {
      "en": ["2. The equation of a straight line is ", { "latex": "2(x-y)+5=0", "fallback": "2(x − y) + 5 = 0", "display": false }, ". Find its slope, inclination and intercept on the Y axis."],
      "ta": ["2. ", { "latex": "2(x-y)+5=0", "fallback": "2(x − y) + 5 = 0", "display": false }, " என்ற நேர்க்கோட்டு சமன்பாட்டின் சாய்வு, சாய்வு கோணம் மற்றும் y-வெட்டுத்துண்டு ஆகியவற்றைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Rearrange 2(x − y) + 5 = 0 into slope-intercept form y = mx + c to read slope m = 1, inclination θ = 45° (since tan θ = 1), and y-intercept c = 5/2.",
        "eq": "2x − 2y + 5 = 0 gives y = x + 5/2",
        "math": { "latex": "2x-2y+5=0\\quad\\text{gives}\\quad 2y=2x+5,\\quad y=1x+\\dfrac{5}{2}", "fallback": "2x − 2y + 5 = 0 gives y = x + 5/2", "display": true }
      },
      {
        "en": "Understand Deeply — Comparing y = 1·x + 5/2 term-by-term with y = mx + c identifies the coefficient of x as slope m = 1 and the constant term as y-intercept c = 5/2. Since tan θ = m = 1, the angle of inclination is 45°.",
        "eq": "m = 1, tan θ = 1 gives θ = 45°, c = 5/2",
        "math": { "latex": "m=1,\\quad \\tan\\theta=1\\;\\text{gives}\\;\\theta=45^\\circ,\\quad c=\\dfrac{5}{2}", "fallback": "m = 1, tan θ = 1 gives θ = 45°, c = 5/2", "display": true }
      }
    ],
    "answer": "slope = 1, inclination = 45°, y-intercept = 5/2",
    "answerMath": { "latex": "m=1,\\quad \\theta=45^\\circ,\\quad c=\\dfrac{5}{2}", "fallback": "slope = 1, inclination = 45°, y-intercept = 5/2", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q2. EN printed p. 229 (PDF p. 235); TA printed p. 236 (PDF p. 242); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 242 } }
  },
  {
    "id": "c10-5-ex5-3-q3", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Slope-Intercept Form", "ta": "ஆயத்தொலை வடிவியல் — சாய்வு-வெட்டுத்துண்டு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q3", "ta": "பயிற்சி 5.3 · வினா 3 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Equation of line with inclination 30° and y-intercept −3" },
    "q": {
      "en": "3. Find the equation of a line whose inclination is 30° and making an intercept −3 on the Y axis.",
      "ta": "3. சாய்வு கோணம் 30° மற்றும் y-வெட்டுத்துண்டு −3 ஆகியவற்றைக் கொண்ட நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": ["3. Find the equation of a line whose inclination is ", { "latex": "30^\\circ", "fallback": "30°", "display": false }, " and making an intercept ", { "latex": "-3", "fallback": "−3", "display": false }, " on the Y axis."],
      "ta": ["3. சாய்வு கோணம் ", { "latex": "30^\\circ", "fallback": "30°", "display": false }, " மற்றும் y-வெட்டுத்துண்டு ", { "latex": "-3", "fallback": "−3", "display": false }, " ஆகியவற்றைக் கொண்ட நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute slope m = tan 30° = 1/√3, plug into y = mx + c with c = −3, and multiply by √3 to reach standard form x − √3y − 3√3 = 0.",
        "eq": "m = tan 30° = 1/√3, c = −3",
        "math": { "latex": "m=\\tan 30^\\circ=\\dfrac{1}{\\sqrt{3}},\\qquad c=-3", "fallback": "m = tan 30° = 1/√3, c = −3", "display": true }
      },
      {
        "en": "Understand Deeply — Substitute m = 1/√3 and c = −3 into y = mx + c, multiply both sides by √3 to clear the radical denominator, and bring every term to one side.",
        "eq": "y = (1/√3)x − 3 gives √3y = x − 3√3, so x − √3y − 3√3 = 0",
        "math": { "latex": "y=\\dfrac{1}{\\sqrt{3}}x-3\\quad\\text{gives}\\quad \\sqrt{3}y=x-3\\sqrt{3},\\quad x-\\sqrt{3}y-3\\sqrt{3}=0", "fallback": "y = (1/√3)x − 3 gives √3y = x − 3√3, so x − √3y − 3√3 = 0", "display": true }
      }
    ],
    "answer": "x − √3y − 3√3 = 0", "answerMath": { "latex": "x-\\sqrt{3}y-3\\sqrt{3}=0", "fallback": "x − √3y − 3√3 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q3. EN printed p. 229 (PDF p. 235); TA printed p. 236 (PDF p. 242); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 242 } }
  },
  {
    "id": "c10-5-ex5-3-q4", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Rationalizing Radical Slope and Intercept", "ta": "ஆயத்தொலை வடிவியல் — முறுடு சாய்வு மற்றும் வெட்டுத்துண்டு" },
    "label": { "en": "Exercise 5.3 · Q4", "ta": "பயிற்சி 5.3 · வினா 4 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Slope and y-intercept of √3x + (1 − √3)y = 3" },
    "q": {
      "en": "4. Find the slope and y intercept of √3x + (1 − √3)y = 3.",
      "ta": "4. √3x + (1 − √3)y = 3 என்ற நேர்க்கோட்டு சமன்பாட்டின் சாய்வு, y-வெட்டுத்துண்டு ஆகியவற்றைக் காண்க."
    },
    "questionMath": {
      "en": ["4. Find the slope and y intercept of ", { "latex": "\\sqrt{3}x+(1-\\sqrt{3})y=3", "fallback": "√3x + (1 − √3)y = 3", "display": false }, "."],
      "ta": ["4. ", { "latex": "\\sqrt{3}x+(1-\\sqrt{3})y=3", "fallback": "√3x + (1 − √3)y = 3", "display": false }, " என்ற நேர்க்கோட்டு சமன்பாட்டின் சாய்வு, y-வெட்டுத்துண்டு ஆகியவற்றைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Solve for y to match y = mx + c, then rationalize the denominator (1 − √3) by multiplying top and bottom by its conjugate (1 + √3).",
        "eq": "(1 − √3)y = −√3x + 3 gives y = (−√3/(1 − √3))x + 3/(1 − √3)",
        "math": { "latex": "y=\\dfrac{-\\sqrt{3}}{1-\\sqrt{3}}x+\\dfrac{3}{1-\\sqrt{3}}", "fallback": "(1 − √3)y = −√3x + 3 gives y = (−√3/(1 − √3))x + 3/(1 − √3)", "display": true }
      },
      {
        "en": "Understand Deeply — Rationalizing denominators removes square roots from the bottom: since (1 − √3)(1 + √3) = 1 − 3 = −2, simplify both slope m and y-intercept c.",
        "eq": "m = (−√3(1 + √3))/(−2) = (√3 + 3)/2; c = 3(1 + √3)/(−2) = (3 + 3√3)/(−2)",
        "math": { "latex": "\\begin{aligned}m&=\\dfrac{-\\sqrt{3}(1+\\sqrt{3})}{(1-\\sqrt{3})(1+\\sqrt{3})}=\\dfrac{-\\sqrt{3}-3}{-2}=\\dfrac{\\sqrt{3}+3}{2}\\\\ c&=\\dfrac{3(1+\\sqrt{3})}{-2}=\\dfrac{3+3\\sqrt{3}}{-2}\\end{aligned}", "fallback": "m = (−√3(1 + √3))/(−2) = (√3 + 3)/2; c = 3(1 + √3)/(−2) = (3 + 3√3)/(−2)", "display": true }
      }
    ],
    "answer": "slope = (√3 + 3)/2, y-intercept = (3 + 3√3)/(−2)",
    "answerMath": { "latex": "m=\\dfrac{\\sqrt{3}+3}{2},\\quad c=\\dfrac{3+3\\sqrt{3}}{-2}", "fallback": "slope = (√3 + 3)/2, y-intercept = (3 + 3√3)/(−2)", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q4. EN printed p. 229 (PDF p. 235); TA printed p. 236 (PDF p. 242); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 242 } }
  },
  {
    "id": "c10-5-ex5-3-q5", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Perpendicular Lines", "ta": "ஆயத்தொலை வடிவியல் — செங்குத்துக் கோடுகள்" },
    "label": { "en": "Exercise 5.3 · Q5", "ta": "பயிற்சி 5.3 · வினா 5 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Find a if line through (−2, 3) and (8, 5) is perpendicular to y = ax + 2" },
    "q": {
      "en": "5. Find the value of ‘a’, if the line through (−2, 3) and (8, 5) is perpendicular to y = ax + 2",
      "ta": "5. (−2, 3) மற்றும் (8, 5) என்ற புள்ளிகள் வழிச் செல்லும் கோடானது, y = ax + 2 என்ற நேர்க்கோட்டிற்குச் செங்குத்தானது எனில், ‘a’-யின் மதிப்பு காண்க."
    },
    "questionMath": {
      "en": ["5. Find the value of ‘a’, if the line through ", { "latex": "(-2,3)", "fallback": "(−2, 3)", "display": false }, " and ", { "latex": "(8,5)", "fallback": "(8, 5)", "display": false }, " is perpendicular to ", { "latex": "y=ax+2", "fallback": "y = ax + 2", "display": false }],
      "ta": ["5. ", { "latex": "(-2,3)", "fallback": "(−2, 3)", "display": false }, " மற்றும் ", { "latex": "(8,5)", "fallback": "(8, 5)", "display": false }, " என்ற புள்ளிகள் வழிச் செல்லும் கோடானது, ", { "latex": "y=ax+2", "fallback": "y = ax + 2", "display": false }, " என்ற நேர்க்கோட்டிற்குச் செங்குத்தானது எனில், ‘a’-யின் மதிப்பு காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find slope m₁ = 1/5 of the two-point line, read slope m₂ = a from y = ax + 2, and apply m₁ × m₂ = −1 to get a = −5.",
        "eq": "m₁ = (5 − 3)/(8 − (−2)) = 2/10 = 1/5",
        "math": { "latex": "m_1=\\dfrac{5-3}{8-(-2)}=\\dfrac{2}{10}=\\dfrac{1}{5}", "fallback": "m₁ = (5 − 3)/(8 − (−2)) = 2/10 = 1/5", "display": true }
      },
      {
        "en": "Understand Deeply — In y = ax + 2, the coefficient of x is the slope m₂ = a. Because the two lines are perpendicular, (1/5)(a) = −1, so a = −5.",
        "eq": "(1/5)(a) = −1 gives a = −5",
        "math": { "latex": "\\dfrac{1}{5}\\cdot a=-1\\quad\\text{gives}\\quad a=-5", "fallback": "(1/5)(a) = −1 gives a = −5", "display": true }
      }
    ],
    "answer": "a = −5", "answerMath": { "latex": "a=-5", "fallback": "a = −5", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q5. EN printed p. 229 (PDF p. 235); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 235, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q6", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Point-Slope Form", "ta": "ஆயத்தொலை வடிவியல் — புள்ளி-சாய்வு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q6", "ta": "பயிற்சி 5.3 · வினா 6 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Equation of hill through (19, 3) with inclination 45°" },
    "q": {
      "en": "6. The hill in the form of a right triangle has its foot at (19, 3). The inclination of the hill to the ground is 45°. Find the equation of the hill joining the foot and top.",
      "ta": "6. (19, 3) என்ற புள்ளியை அடியாகக் கொண்ட குன்றானது செங்கோண முக்கோண வடிவில் உள்ளது. தரையுடன் குன்று ஏற்படுத்தும் சாய்வுக் கோணம் 45° எனில், குன்றின் அடி மற்றும் உச்சியை இணைக்கும் கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": ["6. The hill in the form of a right triangle has its foot at ", { "latex": "(19,3)", "fallback": "(19, 3)", "display": false }, ". The inclination of the hill to the ground is ", { "latex": "45^\\circ", "fallback": "45°", "display": false }, ". Find the equation of the hill joining the foot and top."],
      "ta": ["6. ", { "latex": "(19,3)", "fallback": "(19, 3)", "display": false }, " என்ற புள்ளியை அடியாகக் கொண்ட குன்றானது செங்கோண முக்கோண வடிவில் உள்ளது. தரையுடன் குன்று ஏற்படுத்தும் சாய்வுக் கோணம் ", { "latex": "45^\\circ", "fallback": "45°", "display": false }, " எனில், குன்றின் அடி மற்றும் உச்சியை இணைக்கும் கோட்டின் சமன்பாட்டைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Slope is m = tan 45° = 1 and the point is (19, 3). Apply point-slope form y − y₁ = m(x − x₁) to get x − y − 16 = 0.",
        "eq": "m = tan 45° = 1; y − y₁ = m(x − x₁)",
        "math": { "latex": "m=\\tan 45^\\circ=1;\\qquad y-y_1=m(x-x_1)", "fallback": "m = tan 45° = 1; y − y₁ = m(x − x₁)", "display": true }
      },
      {
        "en": "Understand Deeply — Substitute (x₁, y₁) = (19, 3) and m = 1, then move all terms onto one side with positive x coefficient.",
        "eq": "y − 3 = 1(x − 19) gives x − y − 16 = 0",
        "math": { "latex": "y-3=1(x-19)\\quad\\text{gives}\\quad x-y-16=0", "fallback": "y − 3 = 1(x − 19) gives x − y − 16 = 0", "display": true }
      }
    ],
    "answer": "x − y − 16 = 0", "answerMath": { "latex": "x-y-16=0", "fallback": "x − y − 16 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q6. EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q7-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Two-Point Line Form", "ta": "ஆயத்தொலை வடிவியல் — இரு புள்ளி வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q7(i)", "ta": "பயிற்சி 5.3 · வினா 7(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through (2, 2/3) and (−1/2, −2)" },
    "q": {
      "en": "7. Find the equation of a line through the given pair of points\n(i) (2, 2/3) and (−1/2, −2)",
      "ta": "7. கொடுக்கப்பட்ட இரு புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(i) (2, 2/3) மற்றும் (−1/2, −2)"
    },
    "questionMath": {
      "en": ["7. Find the equation of a line through the given pair of points\n(i) ", { "latex": "\\left(2,\\dfrac{2}{3}\\right)\\text{ and }\\left(-\\dfrac{1}{2},-2\\right)", "fallback": "(2, 2/3) and (−1/2, −2)", "display": false }],
      "ta": ["7. கொடுக்கப்பட்ட இரு புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(i) ", { "latex": "\\left(2,\\dfrac{2}{3}\\right)\\text{ மற்றும் }\\left(-\\dfrac{1}{2},-2\\right)", "fallback": "(2, 2/3) மற்றும் (−1/2, −2)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute slope m = 16/15 between (2, 2/3) and (−1/2, −2), then plug into point-slope form y − (−2) = (16/15)(x − (−1/2)) to clear fractions into 16x − 15y − 22 = 0.",
        "eq": "m = (−2 − 2/3) / (−1/2 − 2) = (−8/3) / (−5/2) = 16/15",
        "math": { "latex": "m=\\dfrac{-2-\\frac{2}{3}}{-\\frac{1}{2}-2}=\\dfrac{-8/3}{-5/2}=\\dfrac{16}{15}", "fallback": "m = (−2 − 2/3) / (−1/2 − 2) = (−8/3) / (−5/2) = 16/15", "display": true }
      },
      {
        "en": "Understand Deeply — Using (−1/2, −2) avoids fractions inside y − y₁: multiply both sides of y + 2 = (16/15)(x + 1/2) by 15, expand 16(1/2) = 8, and collect all terms cleanly.",
        "eq": "15(y + 2) = 16(x + 1/2) gives 15y + 30 = 16x + 8, so 16x − 15y − 22 = 0",
        "math": { "latex": "15(y+2)=16\\left(x+\\dfrac{1}{2}\\right)\\quad\\text{gives}\\quad 15y+30=16x+8,\\quad 16x-15y-22=0", "fallback": "15(y + 2) = 16(x + 1/2) gives 15y + 30 = 16x + 8, so 16x − 15y − 22 = 0", "display": true }
      }
    ],
    "answer": "16x − 15y − 22 = 0", "answerMath": { "latex": "16x-15y-22=0", "fallback": "16x − 15y − 22 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q7(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q7-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Two-Point Line Form", "ta": "ஆயத்தொலை வடிவியல் — இரு புள்ளி வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q7(ii)", "ta": "பயிற்சி 5.3 · வினா 7(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through (2, 3) and (−7, −1)" },
    "q": {
      "en": "7. Find the equation of a line through the given pair of points\n(ii) (2, 3) and (−7, −1)",
      "ta": "7. கொடுக்கப்பட்ட இரு புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(ii) (2, 3) மற்றும் (−7, −1)"
    },
    "questionMath": {
      "en": ["7. Find the equation of a line through the given pair of points\n(ii) ", { "latex": "(2,3)\\text{ and }(-7,-1)", "fallback": "(2, 3) and (−7, −1)", "display": false }],
      "ta": ["7. கொடுக்கப்பட்ட இரு புள்ளிகள் வழிச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க.\n(ii) ", { "latex": "(2,3)\\text{ மற்றும் }(-7,-1)", "fallback": "(2, 3) மற்றும் (−7, −1)", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find slope m = 4/9 between (2, 3) and (−7, −1), then substitute into y − 3 = (4/9)(x − 2) to obtain 4x − 9y + 19 = 0.",
        "eq": "m = (−1 − 3)/(−7 − 2) = −4/(−9) = 4/9",
        "math": { "latex": "m=\\dfrac{-1-3}{-7-2}=\\dfrac{-4}{-9}=\\dfrac{4}{9}", "fallback": "m = (−1 − 3)/(−7 − 2) = −4/(−9) = 4/9", "display": true }
      },
      {
        "en": "Understand Deeply — Multiply both sides of y − 3 = (4/9)(x − 2) by 9 and move terms to keep the x-coefficient positive.",
        "eq": "9(y − 3) = 4(x − 2) gives 9y − 27 = 4x − 8, so 4x − 9y + 19 = 0",
        "math": { "latex": "9(y-3)=4(x-2)\\quad\\text{gives}\\quad 9y-27=4x-8,\\quad 4x-9y+19=0", "fallback": "9(y − 3) = 4(x − 2) gives 9y − 27 = 4x − 8, so 4x − 9y + 19 = 0", "display": true }
      }
    ],
    "answer": "4x − 9y + 19 = 0", "answerMath": { "latex": "4x-9y+19=0", "fallback": "4x − 9y + 19 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q7(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q8", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Straight Path Word Problem", "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டுப் பாதை" },
    "label": { "en": "Exercise 5.3 · Q8", "ta": "பயிற்சி 5.3 · வினா 8 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Shortest straight-line path from cat (−6, −4) to milk (5, 11)" },
    "q": {
      "en": "8. A cat is located at the point (−6, −4) in xy plane. A bottle of milk is kept at (5, 11). The cat wish to consume the milk travelling through shortest possible distance. Find the equation of the path it needs to take its milk.",
      "ta": "8. ஒரு பூனை xy-தளத்தில் (−6, −4) என்ற புள்ளியில் உள்ளது. (5, 11) என்ற புள்ளியில் ஒரு பால் புட்டி வைக்கப்பட்டுள்ளது. பூனை மிகக் குறுகிய தூரம் பயணித்துப் பால் அருந்த விரும்புகிறது எனில், பாலைப் பருகுவதற்குத் தேவையான பாதையின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": ["8. A cat is located at the point ", { "latex": "(-6,-4)", "fallback": "(−6, −4)", "display": false }, " in xy plane. A bottle of milk is kept at ", { "latex": "(5,11)", "fallback": "(5, 11)", "display": false }, ". The cat wish to consume the milk travelling through shortest possible distance. Find the equation of the path it needs to take its milk."],
      "ta": ["8. ஒரு பூனை xy-தளத்தில் ", { "latex": "(-6,-4)", "fallback": "(−6, −4)", "display": false }, " என்ற புள்ளியில் உள்ளது. ", { "latex": "(5,11)", "fallback": "(5, 11)", "display": false }, " என்ற புள்ளியில் ஒரு பால் புட்டி வைக்கப்பட்டுள்ளது. பூனை மிகக் குறுகிய தூரம் பயணித்துப் பால் அருந்த விரும்புகிறது எனில், பாலைப் பருகுவதற்குத் தேவையான பாதையின் சமன்பாட்டைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: The shortest distance between two points is the straight line joining them. Find slope m = 15/11 between (−6, −4) and (5, 11) and write the equation 15x − 11y + 46 = 0.",
        "eq": "m = (11 − (−4))/(5 − (−6)) = 15/11",
        "math": { "latex": "m=\\dfrac{11-(-4)}{5-(-6)}=\\dfrac{15}{11}", "fallback": "m = (11 − (−4))/(5 − (−6)) = 15/11", "display": true }
      },
      {
        "en": "Understand Deeply — Apply point-slope form through (−6, −4), clear denominator 11, and check that both points satisfy 15x − 11y + 46 = 0 (at (5, 11): 75 − 121 + 46 = 0).",
        "eq": "11(y + 4) = 15(x + 6) gives 11y + 44 = 15x + 90, so 15x − 11y + 46 = 0",
        "math": { "latex": "11(y+4)=15(x+6)\\quad\\text{gives}\\quad 11y+44=15x+90,\\quad 15x-11y+46=0", "fallback": "11(y + 4) = 15(x + 6) gives 11y + 44 = 15x + 90, so 15x − 11y + 46 = 0", "display": true }
      }
    ],
    "answer": "15x − 11y + 46 = 0", "answerMath": { "latex": "15x-11y+46=0", "fallback": "15x − 11y + 46 = 0", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-3-q8.svg",
    "figureAlt": {
      "en": "Coordinate grid showing cat at (-6,-4) and milk bottle at (5,11) connected by the straight shortest path.",
      "ta": "பூனை (-6,-4) மற்றும் பால் புட்டி (5,11) ஆகியவற்றை இணைக்கும் நேர்க்கோட்டுப் பாதை வரைபடம்."
    },
    "figureCaption": { "en": "Shortest path = straight line through (−6, −4) and (5, 11)", "ta": "மிகக் குறுகிய பாதை = (−6, −4) மற்றும் (5, 11) வழியே செல்லும் நேர்க்கோடு" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q8. EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q9-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Median of a Triangle", "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் நடுக்கோடு" },
    "label": { "en": "Exercise 5.3 · Q9(i)", "ta": "பயிற்சி 5.3 · வினா 9(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Equation of median through A(6, 2) of ΔABC" },
    "q": {
      "en": "9. If the vertices of a ΔABC are A(6, 2), B(−5, −1) and C(1, 9); through the vertex A\n(i) find the equation of median",
      "ta": "9. A(6, 2), B(−5, −1) மற்றும் C(1, 9)-ஐ முனைகளாகக் கொண்ட ΔABC-யின் முனை A-யிலிருந்து வரையப்படும்\n(i) நடுக்கோட்டின் சமன்பாட்டைக் காண்க"
    },
    "questionMath": {
      "en": ["9. If the vertices of a ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, " are ", { "latex": "A(6,2),\\; B(-5,-1)\\text{ and }C(1,9)", "fallback": "A(6, 2), B(−5, −1) and C(1, 9)", "display": false }, "; through the vertex A\n(i) find the equation of median"],
      "ta": ["9. ", { "latex": "A(6,2),\\; B(-5,-1)\\text{ மற்றும் }C(1,9)", "fallback": "A(6, 2), B(−5, −1) மற்றும் C(1, 9)", "display": false }, "-ஐ முனைகளாகக் கொண்ட ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, "-யின் முனை A-யிலிருந்து வரையப்படும்\n(i) நடுக்கோட்டின் சமன்பாட்டைக் காண்க"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A median from A connects A(6, 2) to the midpoint D of opposite side BC. Find D(−2, 4), compute slope m(AD) = −1/4, and get x + 4y − 14 = 0.",
        "eq": "D = Midpoint(BC) = ((−5 + 1)/2, (−1 + 9)/2) = (−2, 4)",
        "math": { "latex": "D=\\left(\\dfrac{-5+1}{2},\\;\\dfrac{-1+9}{2}\\right)=(-2,4)", "fallback": "D = Midpoint(BC) = ((−5 + 1)/2, (−1 + 9)/2) = (−2, 4)", "display": true }
      },
      {
        "en": "Understand Deeply — Calculate slope m(AD) between A(6, 2) and D(−2, 4), then apply point-slope form through A(6, 2) and clear the fraction.",
        "eq": "m(AD) = (4 − 2)/(−2 − 6) = 2/(−8) = −1/4; 4(y − 2) = −1(x − 6) gives x + 4y − 14 = 0",
        "math": { "latex": "\\begin{aligned}m_{AD}&=\\dfrac{4-2}{-2-6}=-\\dfrac{1}{4}\\\\ 4(y-2)&=-(x-6)\\quad\\text{so}\\quad x+4y-14=0\\end{aligned}", "fallback": "m(AD) = (4 − 2)/(−2 − 6) = 2/(−8) = −1/4; 4(y − 2) = −1(x − 6) gives x + 4y − 14 = 0", "display": true }
      }
    ],
    "answer": "x + 4y − 14 = 0", "answerMath": { "latex": "x+4y-14=0", "fallback": "x + 4y − 14 = 0", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-3-q9.svg",
    "figureAlt": {
      "en": "Triangle ABC showing median AD to midpoint D(-2,4) of BC and perpendicular altitude AE through A(6,2).",
      "ta": "A(6,2) முனையிலிருந்து வரையப்பட்ட நடுக்கோடு AD மற்றும் குத்துக்கோடு AE காட்டும் முக்கோணம் ABC."
    },
    "figureCaption": { "en": "Median AD joins A to midpoint D of BC", "ta": "நடுக்கோடு AD: A முதல் BC நடுப்புள்ளி D வரை" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q9(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q9-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Altitude of a Triangle", "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் குத்துக்கோடு" },
    "label": { "en": "Exercise 5.3 · Q9(ii)", "ta": "பயிற்சி 5.3 · வினா 9(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Equation of altitude through A(6, 2) of ΔABC" },
    "q": {
      "en": "9. If the vertices of a ΔABC are A(6, 2), B(−5, −1) and C(1, 9); through the vertex A\n(ii) find the equation of altitude",
      "ta": "9. A(6, 2), B(−5, −1) மற்றும் C(1, 9)-ஐ முனைகளாகக் கொண்ட ΔABC-யின் முனை A-யிலிருந்து வரையப்படும்\n(ii) குத்துக் கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": ["9. If the vertices of a ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, " are ", { "latex": "A(6,2),\\; B(-5,-1)\\text{ and }C(1,9)", "fallback": "A(6, 2), B(−5, −1) and C(1, 9)", "display": false }, "; through the vertex A\n(ii) find the equation of altitude"],
      "ta": ["9. ", { "latex": "A(6,2),\\; B(-5,-1)\\text{ மற்றும் }C(1,9)", "fallback": "A(6, 2), B(−5, −1) மற்றும் C(1, 9)", "display": false }, "-ஐ முனைகளாகக் கொண்ட ", { "latex": "\\triangle ABC", "fallback": "ΔABC", "display": false }, "-யின் முனை A-யிலிருந்து வரையப்படும்\n(ii) குத்துக் கோட்டின் சமன்பாட்டைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: An altitude from A passes through A(6, 2) and is perpendicular to opposite side BC. Find m(BC) = 5/3, flip and negate to get altitude slope m_⊥ = −3/5, and build 3x + 5y − 28 = 0.",
        "eq": "m(BC) = (9 − (−1))/(1 − (−5)) = 10/6 = 5/3",
        "math": { "latex": "m_{BC}=\\dfrac{9-(-1)}{1-(-5)}=\\dfrac{10}{6}=\\dfrac{5}{3}", "fallback": "m(BC) = (9 − (−1))/(1 − (−5)) = 10/6 = 5/3", "display": true }
      },
      {
        "en": "Understand Deeply — Because the altitude meets BC at 90°, its slope is −1 / (5/3) = −3/5. Substitute A(6, 2) and m_⊥ = −3/5 into point-slope form and multiply by 5.",
        "eq": "5(y − 2) = −3(x − 6) gives 5y − 10 = −3x + 18, so 3x + 5y − 28 = 0",
        "math": { "latex": "\\begin{aligned}m_\\perp&=-\\dfrac{3}{5}\\\\ 5(y-2)&=-3(x-6)\\quad\\text{so}\\quad 3x+5y-28=0\\end{aligned}", "fallback": "5(y − 2) = −3(x − 6) gives 5y − 10 = −3x + 18, so 3x + 5y − 28 = 0", "display": true }
      }
    ],
    "answer": "3x + 5y − 28 = 0", "answerMath": { "latex": "3x+5y-28=0", "fallback": "3x + 5y − 28 = 0", "display": true },
    "figureSrc": "assets/grade10-ch5/ex5-3-q9.svg",
    "figureAlt": {
      "en": "Triangle ABC showing median AD and perpendicular altitude AE meeting BC at 90 degrees.",
      "ta": "A(6,2) முனையிலிருந்து BC-க்கு செங்குத்தான குத்துக்கோடு AE காட்டும் முக்கோணம் ABC."
    },
    "figureCaption": { "en": "Altitude AE is perpendicular to side BC", "ta": "குத்துக்கோடு AE பக்கம் BC-க்கு செங்குத்து" },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q9(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q10", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Point-Slope Form", "ta": "ஆயத்தொலை வடிவியல் — புள்ளி-சாய்வு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q10", "ta": "பயிற்சி 5.3 · வினா 10 · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line with slope −5/4 through (−1, 2)" },
    "q": {
      "en": "10. Find the equation of a straight line which has slope −5/4 and passing through the point (−1, 2).",
      "ta": "10. (−1, 2) என்ற புள்ளி வழி செல்வதும், சாய்வு −5/4 உடையதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": ["10. Find the equation of a straight line which has slope ", { "latex": "\\dfrac{-5}{4}", "fallback": "−5/4", "display": false }, " and passing through the point ", { "latex": "(-1,2)", "fallback": "(−1, 2)", "display": false }, "."],
      "ta": ["10. ", { "latex": "(-1,2)", "fallback": "(−1, 2)", "display": false }, " என்ற புள்ளி வழி செல்வதும், சாய்வு ", { "latex": "\\dfrac{-5}{4}", "fallback": "−5/4", "display": false }, " உடையதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute m = −5/4 and (x₁, y₁) = (−1, 2) into y − y₁ = m(x − x₁) and multiply by 4.",
        "eq": "y − 2 = (−5/4)(x − (−1))",
        "math": { "latex": "y-2=-\\dfrac{5}{4}(x+1)", "fallback": "y − 2 = (−5/4)(x − (−1))", "display": true }
      },
      {
        "en": "Understand Deeply — Multiply both sides by 4 to eliminate the denominator and bring all terms to the left.",
        "eq": "4y − 8 = −5x − 5 gives 5x + 4y − 3 = 0",
        "math": { "latex": "4y-8=-5x-5\\quad\\text{gives}\\quad 5x+4y-3=0", "fallback": "4y − 8 = −5x − 5 gives 5x + 4y − 3 = 0", "display": true }
      }
    ],
    "answer": "5x + 4y − 3 = 0", "answerMath": { "latex": "5x+4y-3=0", "fallback": "5x + 4y − 3 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q10. EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q11-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Linear Model Interpretation", "ta": "ஆயத்தொலை வடிவியல் — நேரியல் மாதிரி" },
    "label": { "en": "Exercise 5.3 · Q11(i)", "ta": "பயிற்சி 5.3 · வினா 11(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Total MB of the song from y = −0.1x + 1" },
    "q": {
      "en": "11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by y = −0.1x + 1.\n(i) find the total MB of the song.",
      "ta": "11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) y = −0.1x + 1 என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(i) பாடலின் மொத்த MB அளவைக் காண்க."
    },
    "questionMath": {
      "en": ["11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, ".\n(i) find the total MB of the song."],
      "ta": ["11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, " என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(i) பாடலின் மொத்த MB அளவைக் காண்க."]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: At the start of the download (time x = 0 seconds), 100% of the song remains, so evaluate y at x = 0: y = 1 MB.",
        "eq": "At x = 0, y = −0.1(0) + 1 = 1",
        "math": { "latex": "\\text{At }x=0,\\quad y=-0.1(0)+1=1", "fallback": "At x = 0, y = −0.1(0) + 1 = 1", "display": true }
      },
      {
        "en": "Understand Deeply — The y-intercept c = 1 represents the starting amount remaining before any seconds pass, which equals the total size of the song (1 MB).",
        "eq": "Total MB = 1",
        "math": { "latex": "\\text{Total size}=1\\text{ MB}", "fallback": "Total MB = 1", "display": true }
      }
    ],
    "answer": "1 MB (1)", "answerMath": { "latex": "1\\text{ MB}", "fallback": "1 MB (1)", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q11(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q11-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Linear Model Interpretation", "ta": "ஆயத்தொலை வடிவியல் — நேரியல் மாதிரி" },
    "label": { "en": "Exercise 5.3 · Q11(ii)", "ta": "பயிற்சி 5.3 · வினா 11(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Seconds until 75% of the song is downloaded" },
    "q": {
      "en": "11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by y = −0.1x + 1.\n(ii) after how many seconds will 75% of the song gets downloaded?",
      "ta": "11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) y = −0.1x + 1 என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(ii) 75% பாடலைப் பதிவிறக்கம் செய்ய எவ்வளவு வினாடிகள் ஆகும்?"
    },
    "questionMath": {
      "en": ["11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, ".\n(ii) after how many seconds will 75% of the song gets downloaded?"],
      "ta": ["11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, " என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(ii) 75% பாடலைப் பதிவிறக்கம் செய்ய எவ்வளவு வினாடிகள் ஆகும்?"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: When 75% is already downloaded, 25% remains (y = 0.25 in decimal form). Substitute y = 0.25 into y = −0.1x + 1 to find x = 7.5 seconds.",
        "eq": "Remaining = 1 − 0.75 = 0.25",
        "math": { "latex": "y=1-0.75=0.25", "fallback": "Remaining = 1 − 0.75 = 0.25", "display": true }
      },
      {
        "en": "Understand Deeply — Solve 0.25 = −0.1x + 1 by moving 0.1x to the left and subtracting 0.25 from 1.",
        "eq": "0.1x = 1 − 0.25 = 0.75, so x = 0.75 / 0.1 = 7.5 seconds",
        "math": { "latex": "0.1x=1-0.25=0.75\\quad\\text{so}\\quad x=\\dfrac{0.75}{0.1}=7.5\\text{ seconds}", "fallback": "0.1x = 1 − 0.25 = 0.75, so x = 0.75 / 0.1 = 7.5 seconds", "display": true }
      }
    ],
    "answer": "7.5 seconds", "answerMath": { "latex": "7.5\\text{ seconds}", "fallback": "7.5 seconds", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q11(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q11-iii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Linear Model Interpretation", "ta": "ஆயத்தொலை வடிவியல் — நேரியல் மாதிரி" },
    "label": { "en": "Exercise 5.3 · Q11(iii)", "ta": "பயிற்சி 5.3 · வினா 11(iii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Seconds until the song downloads completely" },
    "q": {
      "en": "11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by y = −0.1x + 1.\n(iii) after how many seconds the song will be downloaded completely?",
      "ta": "11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) y = −0.1x + 1 என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(iii) எத்தனை வினாடிகள் கழித்துப் பாடல் முழுமையாகப் பதிவிறக்கம் செய்யப்படும்?"
    },
    "questionMath": {
      "en": ["11. You are downloading a song. The percent y (in decimal form) of mega bytes remaining to get downloaded in x seconds is given by ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, ".\n(iii) after how many seconds the song will be downloaded completely?"],
      "ta": ["11. நீங்கள் ஒரு பாடலைப் பதிவிறக்கம் செய்யும்போது, x வினாடிகளுக்குப் பிறகு பதிவிறக்கம் செய்யவேண்டிய மீதமுள்ள பாடலின் சதவீதம் (மெகா பைட்டில்) y-ஆனது (தசமத்தில்) ", { "latex": "y=-0.1x+1", "fallback": "y = −0.1x + 1", "display": false }, " என்ற சமன்பாட்டின் மூலம் குறிக்கப்பட்டால்,\n(iii) எத்தனை வினாடிகள் கழித்துப் பாடல் முழுமையாகப் பதிவிறக்கம் செய்யப்படும்?"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Complete download means 0 MB remaining (y = 0, the x-intercept). Solve 0 = −0.1x + 1 to get x = 10 seconds.",
        "eq": "0 = −0.1x + 1",
        "math": { "latex": "0=-0.1x+1", "fallback": "0 = −0.1x + 1", "display": true }
      },
      {
        "en": "Understand Deeply — Add 0.1x to both sides and divide by 0.1 (which multiplies by 10): x = 10 seconds.",
        "eq": "0.1x = 1 gives x = 1 / 0.1 = 10 seconds",
        "math": { "latex": "0.1x=1\\quad\\text{gives}\\quad x=\\dfrac{1}{0.1}=10\\text{ seconds}", "fallback": "0.1x = 1 gives x = 1 / 0.1 = 10 seconds", "display": true }
      }
    ],
    "answer": "10 seconds", "answerMath": { "latex": "10\\text{ seconds}", "fallback": "10 seconds", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q11(iii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 346 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q12-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Intercept Form", "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q12(i)", "ta": "பயிற்சி 5.3 · வினா 12(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line with x-intercept 4 and y-intercept −6" },
    "q": {
      "en": "12. Find the equation of a line whose intercepts on the x and y axes are given below.\n(i) 4, −6",
      "ta": "12. கீழே கொடுக்கப்பட்டுள்ள x, y வெட்டுத்துண்டுகளைக் கொண்ட நேர்க்கோடுகளின் சமன்பாடுகளைக் காண்க\n(i) 4, −6"
    },
    "questionMath": {
      "en": ["12. Find the equation of a line whose intercepts on the x and y axes are given below.\n(i) ", { "latex": "4,\\; -6", "fallback": "4, −6", "display": false }],
      "ta": ["12. கீழே கொடுக்கப்பட்டுள்ள x, y வெட்டுத்துண்டுகளைக் கொண்ட நேர்க்கோடுகளின் சமன்பாடுகளைக் காண்க\n(i) ", { "latex": "4,\\; -6", "fallback": "4, −6", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute x-intercept a = 4 and y-intercept b = −6 into the intercept form x/a + y/b = 1 and multiply through by 12.",
        "eq": "x/4 + y/(−6) = 1",
        "math": { "latex": "\\dfrac{x}{4}+\\dfrac{y}{-6}=1", "fallback": "x/4 + y/(−6) = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Multiplying every term by LCM(4, 6) = 12 removes all denominators cleanly.",
        "eq": "3x − 2y = 12, so 3x − 2y − 12 = 0",
        "math": { "latex": "3x-2y=12\\quad\\text{so}\\quad 3x-2y-12=0", "fallback": "3x − 2y = 12, so 3x − 2y − 12 = 0", "display": true }
      }
    ],
    "answer": "3x − 2y − 12 = 0", "answerMath": { "latex": "3x-2y-12=0", "fallback": "3x − 2y − 12 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q12(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q12-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Intercept Form", "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டு வடிவம்" },
    "label": { "en": "Exercise 5.3 · Q12(ii)", "ta": "பயிற்சி 5.3 · வினா 12(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line with x-intercept −5 and y-intercept 3/4" },
    "q": {
      "en": "12. Find the equation of a line whose intercepts on the x and y axes are given below.\n(ii) −5, 3/4",
      "ta": "12. கீழே கொடுக்கப்பட்டுள்ள x, y வெட்டுத்துண்டுகளைக் கொண்ட நேர்க்கோடுகளின் சமன்பாடுகளைக் காண்க\n(ii) −5, 3/4"
    },
    "questionMath": {
      "en": ["12. Find the equation of a line whose intercepts on the x and y axes are given below.\n(ii) ", { "latex": "-5,\\;\\dfrac{3}{4}", "fallback": "−5, 3/4", "display": false }],
      "ta": ["12. கீழே கொடுக்கப்பட்டுள்ள x, y வெட்டுத்துண்டுகளைக் கொண்ட நேர்க்கோடுகளின் சமன்பாடுகளைக் காண்க\n(ii) ", { "latex": "-5,\\;\\dfrac{3}{4}", "fallback": "−5, 3/4", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute a = −5 and b = 3/4 into x/a + y/b = 1, turning y/(3/4) into 4y/3, then multiply by −15.",
        "eq": "x/(−5) + y/(3/4) = 1 gives −x/5 + 4y/3 = 1",
        "math": { "latex": "\\dfrac{x}{-5}+\\dfrac{y}{3/4}=1\\quad\\text{gives}\\quad -\\dfrac{x}{5}+\\dfrac{4y}{3}=1", "fallback": "x/(−5) + y/(3/4) = 1 gives −x/5 + 4y/3 = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Multiply by 15 to get −3x + 20y = 15, then multiply by −1 (or move to the right side) so the leading x term is positive.",
        "eq": "−3x + 20y = 15 gives 3x − 20y + 15 = 0",
        "math": { "latex": "-3x+20y=15\\quad\\text{gives}\\quad 3x-20y+15=0", "fallback": "−3x + 20y = 15 gives 3x − 20y + 15 = 0", "display": true }
      }
    ],
    "answer": "3x − 20y + 15 = 0", "answerMath": { "latex": "3x-20y+15=0", "fallback": "3x − 20y + 15 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q12(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q13-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Finding Axis Intercepts", "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டுகளைக் காணல்" },
    "label": { "en": "Exercise 5.3 · Q13(i)", "ta": "பயிற்சி 5.3 · வினா 13(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Intercepts of 3x − 2y − 6 = 0 on coordinate axes" },
    "q": {
      "en": "13. Find the intercepts made by the following lines on the coordinate axes.\n(i) 3x − 2y − 6 = 0",
      "ta": "13. கொடுக்கப்பட்ட நேர்க்கோடுகளின் சமன்பாட்டிலிருந்து ஆய அச்சுகளின் மேல் ஏற்படுத்தும் வெட்டுத்துண்டுகளைக் காண்க.\n(i) 3x − 2y − 6 = 0"
    },
    "questionMath": {
      "en": ["13. Find the intercepts made by the following lines on the coordinate axes.\n(i) ", { "latex": "3x-2y-6=0", "fallback": "3x − 2y − 6 = 0", "display": false }],
      "ta": ["13. கொடுக்கப்பட்ட நேர்க்கோடுகளின் சமன்பாட்டிலிருந்து ஆய அச்சுகளின் மேல் ஏற்படுத்தும் வெட்டுத்துண்டுகளைக் காண்க.\n(i) ", { "latex": "3x-2y-6=0", "fallback": "3x − 2y − 6 = 0", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Move −6 to the right and divide by 6 to rewrite 3x − 2y = 6 in intercept form x/a + y/b = 1.",
        "eq": "3x − 2y = 6 gives x/2 + y/(−3) = 1",
        "math": { "latex": "\\dfrac{3x}{6}-\\dfrac{2y}{6}=1\\quad\\text{gives}\\quad \\dfrac{x}{2}+\\dfrac{y}{-3}=1", "fallback": "3x − 2y = 6 gives x/2 + y/(−3) = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Comparing with x/a + y/b = 1 gives x-intercept a = 2 and y-intercept b = −3 (crossing the X-axis at (2, 0) and Y-axis at (0, −3)).",
        "eq": "x-intercept = 2, y-intercept = −3",
        "math": { "latex": "x\\text{-intercept}=2,\\qquad y\\text{-intercept}=-3", "fallback": "x-intercept = 2, y-intercept = −3", "display": true }
      }
    ],
    "answer": "2, −3", "answerMath": { "latex": "2,\\; -3", "fallback": "2, −3", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q13(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q13-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Finding Axis Intercepts", "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டுகளைக் காணல்" },
    "label": { "en": "Exercise 5.3 · Q13(ii)", "ta": "பயிற்சி 5.3 · வினா 13(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Intercepts of 4x + 3y + 12 = 0 on coordinate axes" },
    "q": {
      "en": "13. Find the intercepts made by the following lines on the coordinate axes.\n(ii) 4x + 3y + 12 = 0",
      "ta": "13. கொடுக்கப்பட்ட நேர்க்கோடுகளின் சமன்பாட்டிலிருந்து ஆய அச்சுகளின் மேல் ஏற்படுத்தும் வெட்டுத்துண்டுகளைக் காண்க.\n(ii) 4x + 3y + 12 = 0"
    },
    "questionMath": {
      "en": ["13. Find the intercepts made by the following lines on the coordinate axes.\n(ii) ", { "latex": "4x+3y+12=0", "fallback": "4x + 3y + 12 = 0", "display": false }],
      "ta": ["13. கொடுக்கப்பட்ட நேர்க்கோடுகளின் சமன்பாட்டிலிருந்து ஆய அச்சுகளின் மேல் ஏற்படுத்தும் வெட்டுத்துண்டுகளைக் காண்க.\n(ii) ", { "latex": "4x+3y+12=0", "fallback": "4x + 3y + 12 = 0", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Move +12 to the right side as −12 and divide every term by −12 to write x/a + y/b = 1.",
        "eq": "4x + 3y = −12 gives x/(−3) + y/(−4) = 1",
        "math": { "latex": "\\dfrac{4x}{-12}+\\dfrac{3y}{-12}=1\\quad\\text{gives}\\quad \\dfrac{x}{-3}+\\dfrac{y}{-4}=1", "fallback": "4x + 3y = −12 gives x/(−3) + y/(−4) = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Both intercepts are negative: x-intercept = −3 and y-intercept = −4.",
        "eq": "x-intercept = −3, y-intercept = −4",
        "math": { "latex": "x\\text{-intercept}=-3,\\qquad y\\text{-intercept}=-4", "fallback": "x-intercept = −3, y-intercept = −4", "display": true }
      }
    ],
    "answer": "−3, −4", "answerMath": { "latex": "-3,\\; -4", "fallback": "−3, −4", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q13(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q14-i", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Intercept Ratio Word Problem", "ta": "ஆயத்தொலை வடிவியல் — வெட்டுத்துண்டு விகிதம்" },
    "label": { "en": "Exercise 5.3 · Q14(i)", "ta": "பயிற்சி 5.3 · வினா 14(i) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through (1, −4) with intercepts in ratio 2:5" },
    "q": {
      "en": "14. Find the equation of a straight line\n(i) passing through (1, −4) and has intercepts which are in the ratio 2:5",
      "ta": "14. நேர்க்கோட்டின் சமன்பாட்டினைக் காண்க.\n(i) (1, −4) என்ற புள்ளி வழிச் செல்வதும், வெட்டுத்துண்டுகளின் விகிதம் 2:5"
    },
    "questionMath": {
      "en": ["14. Find the equation of a straight line\n(i) passing through ", { "latex": "(1,-4)", "fallback": "(1, −4)", "display": false }, " and has intercepts which are in the ratio ", { "latex": "2:5", "fallback": "2:5", "display": false }],
      "ta": ["14. நேர்க்கோட்டின் சமன்பாட்டினைக் காண்க.\n(i) ", { "latex": "(1,-4)", "fallback": "(1, −4)", "display": false }, " என்ற புள்ளி வழிச் செல்வதும், வெட்டுத்துண்டுகளின் விகிதம் ", { "latex": "2:5", "fallback": "2:5", "display": false }]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let intercepts be a = 2k and b = 5k (ratio 2:5). Plug (x, y) = (1, −4) into x/(2k) + y/(5k) = 1 to solve k = −3/10, giving 5x + 2y + 3 = 0.",
        "eq": "x/(2k) + y/(5k) = 1",
        "math": { "latex": "\\dfrac{x}{2k}+\\dfrac{y}{5k}=1", "fallback": "x/(2k) + y/(5k) = 1", "display": true }
      },
      {
        "en": "Understand Deeply — Multiply the general intercept equation by 10k to obtain 5x + 2y = 10k, then substitute the known point (1, −4) directly.",
        "eq": "5(1) + 2(−4) = 10k gives 10k = −3",
        "math": { "latex": "5(1)+2(-4)=10k\\quad\\text{gives}\\quad 10k=-3", "fallback": "5(1) + 2(−4) = 10k gives 10k = −3", "display": true }
      },
      {
        "en": "Replace 10k = −3 back into 5x + 2y = 10k to finish in standard form 5x + 2y + 3 = 0.",
        "eq": "5x + 2y = −3, so 5x + 2y + 3 = 0",
        "math": { "latex": "5x+2y=-3\\quad\\text{so}\\quad 5x+2y+3=0", "fallback": "5x + 2y = −3, so 5x + 2y + 3 = 0", "display": true }
      }
    ],
    "answer": "5x + 2y + 3 = 0", "answerMath": { "latex": "5x+2y+3=0", "fallback": "5x + 2y + 3 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q14(i). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
  },
  {
    "id": "c10-5-ex5-3-q14-ii", "classNum": 10, "chapter": "5", "exercise": "5.3",
    "topic": { "en": "Coordinate Geometry — Equal Intercepts", "ta": "ஆயத்தொலை வடிவியல் — சம வெட்டுத்துண்டுகள்" },
    "label": { "en": "Exercise 5.3 · Q14(ii)", "ta": "பயிற்சி 5.3 · வினா 14(ii) · ஆங்கிலத் தீர்வு" },
    "title": { "en": "Line through (−8, 4) with equal intercepts on coordinate axes" },
    "q": {
      "en": "14. Find the equation of a straight line\n(ii) passing through (−8, 4) and making equal intercepts on the coordinate axes",
      "ta": "14. நேர்க்கோட்டின் சமன்பாட்டினைக் காண்க.\n(ii) (−8, 4) என்ற புள்ளி வழிச் செல்வதும், ஆய அச்சுகளின் வெட்டுத் துண்டுகள் சமம்"
    },
    "questionMath": {
      "en": ["14. Find the equation of a straight line\n(ii) passing through ", { "latex": "(-8,4)", "fallback": "(−8, 4)", "display": false }, " and making equal intercepts on the coordinate axes"],
      "ta": ["14. நேர்க்கோட்டின் சமன்பாட்டினைக் காண்க.\n(ii) ", { "latex": "(-8,4)", "fallback": "(−8, 4)", "display": false }, " என்ற புள்ளி வழிச் செல்வதும், ஆய அச்சுகளின் வெட்டுத் துண்டுகள் சமம்"]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Equal intercepts means a = b, so x/a + y/a = 1 becomes x + y = a. Substitute (−8, 4) to get a = −4, hence x + y + 4 = 0.",
        "eq": "x/a + y/a = 1 gives x + y = a",
        "math": { "latex": "\\dfrac{x}{a}+\\dfrac{y}{a}=1\\quad\\text{gives}\\quad x+y=a", "fallback": "x/a + y/a = 1 gives x + y = a", "display": true }
      },
      {
        "en": "Understand Deeply — Plug in (−8, 4) for (x, y) to determine a, then rearrange to standard form.",
        "eq": "−8 + 4 = a gives a = −4, so x + y + 4 = 0",
        "math": { "latex": "-8+4=a\\quad\\text{gives}\\quad a=-4,\\quad x+y+4=0", "fallback": "−8 + 4 = a gives a = −4, so x + y + 4 = 0", "display": true }
      }
    ],
    "answer": "x + y + 4 = 0", "answerMath": { "latex": "x+y+4=0", "fallback": "x + y + 4 = 0", "display": true },
    "kind": "textbook", "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.3 Q14(ii). EN printed p. 230 (PDF p. 236); TA printed p. 237 (PDF p. 243); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": { "status": "page-visual-checked", "sourcePdfPage": { "en": 236, "ta": 243 } }
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
