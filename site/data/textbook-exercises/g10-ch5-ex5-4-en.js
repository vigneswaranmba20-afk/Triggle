/* 2025 revised TN SCERT Grade 10 Coordinate Geometry, Exercise 5.4 (Q1–Q12, 15 subparts).
 * English and Tamil prompts and appendix keys checked against rendered 2025 PDF pages:
 *   EN PDF p. 241 (printed p. 235), Answer Appendix PDF p. 347 (printed p. 341)
 *   TA PDF pp. 248–249 (printed pp. 242–243), Answer Appendix PDF p. 361 (printed p. 355)
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-5-ex5-4-q1-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Slope of a Straight Line",
      "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.4 · Q1(i)",
      "ta": "பயிற்சி 5.4 · வினா 1(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of the horizontal line 5y − 3 = 0"
    },
    "q": {
      "en": "1. Find the slope of the following straight lines\n(i) 5y − 3 = 0",
      "ta": "1. பின்வரும் நேர்க்கோடுகளின் சாய்வைக் காண்க.\n(i) 5y − 3 = 0"
    },
    "questionMath": {
      "en": [
        "1. Find the slope of the following straight lines\n(i) ",
        {
          "latex": "5y - 3 = 0",
          "fallback": "5y − 3 = 0",
          "display": false
        }
      ],
      "ta": [
        "1. பின்வரும் நேர்க்கோடுகளின் சாய்வைக் காண்க.\n(i) ",
        {
          "latex": "5y - 3 = 0",
          "fallback": "5y − 3 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compare 5y − 3 = 0 with the general line form ax + by + c = 0. Because x does not appear, a = 0 and b = 5, so the slope m = −a/b = 0.",
        "eq": "0·x + 5y − 3 = 0 gives a = 0, b = 5",
        "math": {
          "latex": "0\\cdot x + 5y - 3 = 0\\quad\\text{gives}\\quad a = 0,\\; b = 5",
          "fallback": "0·x + 5y − 3 = 0 gives a = 0, b = 5",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Writing y = 3/5 shows that y stays constant for every x. Because the vertical change Δy is zero along the line, steepness m = Δy/Δx equals zero.",
        "eq": "m = −a/b = −0/5 = 0",
        "math": {
          "latex": "m = -\\dfrac{a}{b} = -\\dfrac{0}{5} = 0",
          "fallback": "m = −a/b = −0/5 = 0",
          "display": true
        }
      }
    ],
    "answer": "0",
    "answerMath": {
      "latex": "0",
      "fallback": "0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q1(i). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q1-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Slope of a Straight Line",
      "ta": "ஆயத்தொலை வடிவியல் — நேர்க்கோட்டின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.4 · Q1(ii)",
      "ta": "பயிற்சி 5.4 · வினா 1(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of the vertical line 7x − 3/17 = 0"
    },
    "q": {
      "en": "1. Find the slope of the following straight lines\n(ii) 7x − 3/17 = 0",
      "ta": "1. பின்வரும் நேர்க்கோடுகளின் சாய்வைக் காண்க.\n(ii) 7x − 3/17 = 0"
    },
    "questionMath": {
      "en": [
        "1. Find the slope of the following straight lines\n(ii) ",
        {
          "latex": "7x - \\dfrac{3}{17} = 0",
          "fallback": "7x − 3/17 = 0",
          "display": false
        }
      ],
      "ta": [
        "1. பின்வரும் நேர்க்கோடுகளின் சாய்வைக் காண்க.\n(ii) ",
        {
          "latex": "7x - \\dfrac{3}{17} = 0",
          "fallback": "7x − 3/17 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: In 7x − 3/17 = 0, the y-term is absent so b = 0. Substituting b = 0 into m = −a/b requires dividing by zero, so the slope is undefined.",
        "eq": "7x + 0·y − 3/17 = 0 gives a = 7, b = 0",
        "math": {
          "latex": "7x + 0\\cdot y - \\dfrac{3}{17} = 0\\quad\\text{gives}\\quad a = 7,\\; b = 0",
          "fallback": "7x + 0·y − 3/17 = 0 gives a = 7, b = 0",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Rearranging gives x = 3/119, which fixes x horizontally and goes straight up parallel to the Y-axis. Since Δx = 0 and tan 90° does not exist as a finite number, slope is undefined.",
        "eq": "m = −7/0 is undefined (vertical line x = 3/119)",
        "math": {
          "latex": "x = \\dfrac{3}{119}\\;\\text{is vertical, so}\\; m = -\\dfrac{7}{0}\\;\\text{is not defined}",
          "fallback": "m = −7/0 is undefined (vertical line x = 3/119)",
          "display": true
        }
      }
    ],
    "answer": "undefined",
    "answerMath": {
      "latex": "\\text{not defined}",
      "fallback": "undefined",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q1(ii). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q2-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Parallel Line Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — இணை கோடுகளின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.4 · Q2(i)",
      "ta": "பயிற்சி 5.4 · வினா 2(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of a line parallel to y = 0.7x − 11"
    },
    "q": {
      "en": "2. Find the slope of the line which is\n(i) parallel to y = 0.7x − 11",
      "ta": "2. (i) y = 0.7x − 11 க்கு இணையாக அமையும் நேர்க்கோட்டின் சாய்வைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. Find the slope of the line which is\n(i) parallel to ",
        {
          "latex": "y = 0.7x - 11",
          "fallback": "y = 0.7x − 11",
          "display": false
        }
      ],
      "ta": [
        "2. (i) ",
        {
          "latex": "y = 0.7x - 11",
          "fallback": "y = 0.7x − 11",
          "display": false
        },
        " க்கு இணையாக அமையும் நேர்க்கோட்டின் சாய்வைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Match y = 0.7x − 11 with slope-intercept form y = mx + c to read slope m = 0.7. Parallel lines have equal slopes, so the required slope is 0.7.",
        "eq": "y = 0.7x − 11 gives given slope m₁ = 0.7",
        "math": {
          "latex": "y = 0.7x - 11\\quad\\text{gives}\\quad m_1 = 0.7",
          "fallback": "y = 0.7x − 11 gives given slope m₁ = 0.7",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Two non-vertical lines are parallel if and only if they rise at the exact same angle to the X-axis, meaning m₂ = m₁ = 0.7.",
        "eq": "Parallel line slope m₂ = m₁ = 0.7",
        "math": {
          "latex": "m_2 = m_1 = 0.7",
          "fallback": "Parallel line slope m₂ = m₁ = 0.7",
          "display": true
        }
      }
    ],
    "answer": "0.7",
    "answerMath": {
      "latex": "0.7",
      "fallback": "0.7",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q2(i). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q2-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Line Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — செங்குத்து கோடுகளின் சாய்வு"
    },
    "label": {
      "en": "Exercise 5.4 · Q2(ii)",
      "ta": "பயிற்சி 5.4 · வினா 2(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Slope of a line perpendicular to x = −11"
    },
    "q": {
      "en": "2. Find the slope of the line which is\n(ii) perpendicular to the line x = −11",
      "ta": "2. (ii) x = −11 −க்கு செங்குத்தாக அமையும் நேர்க்கோட்டின் சாய்வைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. Find the slope of the line which is\n(ii) perpendicular to the line ",
        {
          "latex": "x = -11",
          "fallback": "x = −11",
          "display": false
        }
      ],
      "ta": [
        "2. (ii) ",
        {
          "latex": "x = -11",
          "fallback": "x = −11",
          "display": false
        },
        " −க்கு செங்குத்தாக அமையும் நேர்க்கோட்டின் சாய்வைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: The line x = −11 is vertical (parallel to the Y-axis). A line perpendicular to a vertical line is horizontal (parallel to the X-axis), whose slope is 0.",
        "eq": "x = −11 is parallel to Y-axis (vertical)",
        "math": {
          "latex": "x = -11\\;\\text{is parallel to the Y-axis}",
          "fallback": "x = −11 is parallel to Y-axis (vertical)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because we cannot multiply an undefined vertical slope using m₁·m₂ = −1, we use geometry directly: rotating a vertical line by 90° produces a horizontal line y = k with zero slope.",
        "eq": "Perpendicular horizontal line has slope m = 0",
        "math": {
          "latex": "\\text{Perpendicular line is parallel to X-axis, so}\\; m = 0",
          "fallback": "Perpendicular horizontal line has slope m = 0",
          "display": true
        }
      }
    ],
    "answer": "0",
    "answerMath": {
      "latex": "0",
      "fallback": "0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q2(ii). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q3-i",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Comparing Line Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — கோடுகளின் சாய்வு ஒப்பீடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q3(i)",
      "ta": "பயிற்சி 5.4 · வினா 3(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Test whether x/3 + y/4 + 1/7 = 0 and 2x/3 + y/2 + 1/10 = 0 are parallel or perpendicular"
    },
    "q": {
      "en": "3. Check whether the given lines are parellel or perpendicular\n(i) x/3 + y/4 + 1/7 = 0 and 2x/3 + y/2 + 1/10 = 0",
      "ta": "3. கொடுக்கப்பட்ட நேர்க்கோடுகள் இணையானவையா அல்லது செங்குத்தானவையா எனச் சோதிக்கவும்.\n(i) x/3 + y/4 + 1/7 = 0 மற்றும் 2x/3 + y/2 + 1/10 = 0"
    },
    "questionMath": {
      "en": [
        "3. Check whether the given lines are parellel or perpendicular\n(i) ",
        {
          "latex": "\\dfrac{x}{3}+\\dfrac{y}{4}+\\dfrac{1}{7}=0",
          "fallback": "x/3 + y/4 + 1/7 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "\\dfrac{2x}{3}+\\dfrac{y}{2}+\\dfrac{1}{10}=0",
          "fallback": "2x/3 + y/2 + 1/10 = 0",
          "display": false
        }
      ],
      "ta": [
        "3. கொடுக்கப்பட்ட நேர்க்கோடுகள் இணையானவையா அல்லது செங்குத்தானவையா எனச் சோதிக்கவும்.\n(i) ",
        {
          "latex": "\\dfrac{x}{3}+\\dfrac{y}{4}+\\dfrac{1}{7}=0",
          "fallback": "x/3 + y/4 + 1/7 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\dfrac{2x}{3}+\\dfrac{y}{2}+\\dfrac{1}{10}=0",
          "fallback": "2x/3 + y/2 + 1/10 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute the slope of each line using m = −a/b. Both give −4/3, so the lines are parallel.",
        "eq": "m₁ = −(1/3)/(1/4) = −4/3 and m₂ = −(2/3)/(1/2) = −4/3",
        "math": {
          "latex": "m_1 = -\\dfrac{1/3}{1/4} = -\\dfrac{4}{3},\\qquad m_2 = -\\dfrac{2/3}{1/2} = -\\dfrac{4}{3}",
          "fallback": "m₁ = −(1/3)/(1/4) = −4/3 and m₂ = −(2/3)/(1/2) = −4/3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Comparing slopes shows m₁ = m₂ = −4/3 (while their constant terms differ, so they do not coincide). Equal slopes confirm that the two lines are parallel.",
        "eq": "m₁ = m₂ = −4/3, so the given lines are parallel",
        "math": {
          "latex": "m_1 = m_2\\quad\\text{so the given lines are parallel}",
          "fallback": "m₁ = m₂ = −4/3, so the given lines are parallel",
          "display": true
        }
      }
    ],
    "answer": "Parallel",
    "answerMath": {
      "latex": "\\text{Parallel}",
      "fallback": "Parallel",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q3(i). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q3-ii",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Comparing Line Slopes",
      "ta": "ஆயத்தொலை வடிவியல் — கோடுகளின் சாய்வு ஒப்பீடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q3(ii)",
      "ta": "பயிற்சி 5.4 · வினா 3(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Test whether 5x + 23y + 14 = 0 and 23x − 5y + 9 = 0 are parallel or perpendicular"
    },
    "q": {
      "en": "3. Check whether the given lines are parellel or perpendicular\n(ii) 5x + 23y + 14 = 0 and 23x − 5y + 9 = 0",
      "ta": "3. கொடுக்கப்பட்ட நேர்க்கோடுகள் இணையானவையா அல்லது செங்குத்தானவையா எனச் சோதிக்கவும்.\n(ii) 5x + 23y + 14 = 0 மற்றும் 23x − 5y + 9 = 0"
    },
    "questionMath": {
      "en": [
        "3. Check whether the given lines are parellel or perpendicular\n(ii) ",
        {
          "latex": "5x+23y+14=0",
          "fallback": "5x + 23y + 14 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "23x-5y+9=0",
          "fallback": "23x − 5y + 9 = 0",
          "display": false
        }
      ],
      "ta": [
        "3. கொடுக்கப்பட்ட நேர்க்கோடுகள் இணையானவையா அல்லது செங்குத்தானவையா எனச் சோதிக்கவும்.\n(ii) ",
        {
          "latex": "5x+23y+14=0",
          "fallback": "5x + 23y + 14 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "23x-5y+9=0",
          "fallback": "23x − 5y + 9 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use m = −a/b on both lines to get m₁ = −5/23 and m₂ = 23/5. Multiply m₁·m₂ to obtain −1, proving they are perpendicular.",
        "eq": "m₁ = −5/23, m₂ = −23/(−5) = 23/5",
        "math": {
          "latex": "m_1 = -\\dfrac{5}{23},\\qquad m_2 = -\\dfrac{23}{-5} = \\dfrac{23}{5}",
          "fallback": "m₁ = −5/23, m₂ = −23/(−5) = 23/5",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice that the coefficients of x and y swapped and one sign changed, creating negative reciprocal slopes. Their product (−5/23)(23/5) = −1 proves the lines intersect at 90°.",
        "eq": "m₁·m₂ = (−5/23)(23/5) = −1, so the lines are perpendicular",
        "math": {
          "latex": "m_1\\cdot m_2 = \\left(-\\dfrac{5}{23}\\right)\\left(\\dfrac{23}{5}\\right) = -1\\quad(\\text{Perpendicular})",
          "fallback": "m₁·m₂ = (−5/23)(23/5) = −1, so the lines are perpendicular",
          "display": true
        }
      }
    ],
    "answer": "Perpendicular",
    "answerMath": {
      "latex": "\\text{Perpendicular}",
      "fallback": "Perpendicular",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q3(ii). EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q4",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Lines",
      "ta": "ஆயத்தொலை வடிவியல் — செங்குத்துக் கோடுகள்"
    },
    "label": {
      "en": "Exercise 5.4 · Q4",
      "ta": "பயிற்சி 5.4 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find p when 12y = −(p + 3)x + 12 and 12x − 7y = 16 are perpendicular"
    },
    "q": {
      "en": "4. If the straight lines 12y = −(p + 3)x + 12, 12x − 7y = 16 are perpendicular then find ‘p’.",
      "ta": "4. 12y = −(p + 3)x + 12, 12x − 7y = 16 ஆகிய நேர்க்கோடுகள் ஒன்றுக்கொன்று செங்குத்து எனில் ‘p’-யின் மதிப்பைக் காண்க."
    },
    "questionMath": {
      "en": [
        "4. If the straight lines ",
        {
          "latex": "12y=-(p+3)x+12",
          "fallback": "12y = −(p + 3)x + 12",
          "display": false
        },
        ", ",
        {
          "latex": "12x-7y=16",
          "fallback": "12x − 7y = 16",
          "display": false
        },
        " are perpendicular then find ‘",
        {
          "latex": "p",
          "fallback": "p",
          "display": false
        },
        "’."
      ],
      "ta": [
        "4. ",
        {
          "latex": "12y=-(p+3)x+12",
          "fallback": "12y = −(p + 3)x + 12",
          "display": false
        },
        ", ",
        {
          "latex": "12x-7y=16",
          "fallback": "12x − 7y = 16",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் ஒன்றுக்கொன்று செங்குத்து எனில் ‘",
        {
          "latex": "p",
          "fallback": "p",
          "display": false
        },
        "’-யின் மதிப்பைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Divide the first equation by 12 to read slope m₁ = −(p + 3)/12, and find m₂ = 12/7 from the second line. Set m₁·m₂ = −1 and solve p = 4.",
        "eq": "m₁ = −(p + 3)/12, m₂ = −12/(−7) = 12/7",
        "math": {
          "latex": "m_1 = -\\dfrac{p+3}{12},\\qquad m_2 = -\\dfrac{12}{-7} = \\dfrac{12}{7}",
          "fallback": "m₁ = −(p + 3)/12, m₂ = −12/(−7) = 12/7",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because the lines are perpendicular, the product of their slopes must equal −1. Cancel the common factor 12 and remove the negative signs on both sides.",
        "eq": "[−(p + 3)/12]·(12/7) = −1 gives (p + 3)/7 = 1, so p = 4",
        "math": {
          "latex": "\\begin{aligned} m_1\\cdot m_2 &= -1 \\\\ \\left(-\\dfrac{p+3}{12}\\right)\\left(\\dfrac{12}{7}\\right) &= -1 \\\\ -\\dfrac{p+3}{7} &= -1 \\\\ p+3 &= 7 \\\\ p &= 4 \\end{aligned}",
          "fallback": "[−(p + 3)/12]·(12/7) = −1 gives (p + 3)/7 = 1, so p = 4",
          "display": true
        }
      }
    ],
    "answer": "4",
    "answerMath": {
      "latex": "p = 4",
      "fallback": "4",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q4. EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q5",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Parallel Line Equation",
      "ta": "ஆயத்தொலை வடிவியல் — இணை கோட்டின் சமன்பாடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q5",
      "ta": "பயிற்சி 5.4 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through P(−5, 2) parallel to QR joining Q(3, −2) and R(−5, 4)"
    },
    "q": {
      "en": "5. Find the equation of a straight line passing through the point P(−5, 2) and parallel to the line joining the points Q(3, −2) and R(−5, 4).",
      "ta": "5. Q(3, −2) மற்றும் R(−5, 4) ஆகியபுள்ளிகளை இணைக்கும் நேர்க்கோட்டிற்கு இணையானதும், P(−5, 2) என்ற புள்ளி வழி செல்வதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "5. Find the equation of a straight line passing through the point ",
        {
          "latex": "P(-5,2)",
          "fallback": "P(−5, 2)",
          "display": false
        },
        " and parallel to the line joining the points ",
        {
          "latex": "Q(3,-2)",
          "fallback": "Q(3, −2)",
          "display": false
        },
        " and ",
        {
          "latex": "R(-5,4)",
          "fallback": "R(−5, 4)",
          "display": false
        },
        "."
      ],
      "ta": [
        "5. ",
        {
          "latex": "Q(3,-2)",
          "fallback": "Q(3, −2)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "R(-5,4)",
          "fallback": "R(−5, 4)",
          "display": false
        },
        " ஆகியபுள்ளிகளை இணைக்கும் நேர்க்கோட்டிற்கு இணையானதும், ",
        {
          "latex": "P(-5,2)",
          "fallback": "P(−5, 2)",
          "display": false
        },
        " என்ற புள்ளி வழி செல்வதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First compute the slope of QR as m = −3/4. Since our line is parallel, it shares slope m = −3/4, and point-slope form through P(−5, 2) yields 3x + 4y + 7 = 0.",
        "eq": "m_QR = (4 − (−2))/(−5 − 3) = 6/(−8) = −3/4",
        "math": {
          "latex": "m_{QR} = \\dfrac{4-(-2)}{-5-3} = \\dfrac{6}{-8} = -\\dfrac{3}{4}",
          "fallback": "m_QR = (4 − (−2))/(−5 − 3) = 6/(−8) = −3/4",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Apply y − y₁ = m(x − x₁) with (x₁, y₁) = (−5, 2) and m = −3/4. Multiply through by 4 to clear the fraction and bring every term to one side.",
        "eq": "y − 2 = (−3/4)(x + 5) gives 4y − 8 = −3x − 15, so 3x + 4y + 7 = 0",
        "math": {
          "latex": "\\begin{aligned} y - 2 &= -\\dfrac{3}{4}(x + 5) \\\\ 4y - 8 &= -3x - 15 \\\\ 3x + 4y + 7 &= 0 \\end{aligned}",
          "fallback": "y − 2 = (−3/4)(x + 5) gives 4y − 8 = −3x − 15, so 3x + 4y + 7 = 0",
          "display": true
        }
      }
    ],
    "answer": "3x + 4y + 7 = 0",
    "answerMath": {
      "latex": "3x + 4y + 7 = 0",
      "fallback": "3x + 4y + 7 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q5. EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q6",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Line Equation",
      "ta": "ஆயத்தொலை வடிவியல் — செங்குத்துக் கோட்டின் சமன்பாடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q6",
      "ta": "பயிற்சி 5.4 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through (6, −2) perpendicular to segment joining (6, 7) and (2, −3)"
    },
    "q": {
      "en": "6. Find the equation of a line passing through (6, −2) and perpendicular to the line joining the points (6, 7) and (2, −3).",
      "ta": "6. (6, 7) மற்றும் (2, −3) ஆகிய புள்ளிகளை இணைக்கும் நேர்க்கோட்டிற்குச் செங்குத்தானதும் (6, −2) என்ற புள்ளி வழி செல்வதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. Find the equation of a line passing through ",
        {
          "latex": "(6,-2)",
          "fallback": "(6, −2)",
          "display": false
        },
        " and perpendicular to the line joining the points ",
        {
          "latex": "(6,7)",
          "fallback": "(6, 7)",
          "display": false
        },
        " and ",
        {
          "latex": "(2,-3)",
          "fallback": "(2, −3)",
          "display": false
        },
        "."
      ],
      "ta": [
        "6. ",
        {
          "latex": "(6,7)",
          "fallback": "(6, 7)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(2,-3)",
          "fallback": "(2, −3)",
          "display": false
        },
        " ஆகிய புள்ளிகளை இணைக்கும் நேர்க்கோட்டிற்குச் செங்குத்தானதும் ",
        {
          "latex": "(6,-2)",
          "fallback": "(6, −2)",
          "display": false
        },
        " என்ற புள்ளி வழி செல்வதுமான நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find slope m₁ = 5/2 for the line through (6, 7) and (2, −3), take the negative reciprocal m₂ = −2/5, and apply point-slope form at (6, −2) to get 2x + 5y − 2 = 0.",
        "eq": "m₁ = (−3 − 7)/(2 − 6) = −10/(−4) = 5/2, so m₂ = −2/5",
        "math": {
          "latex": "m_1 = \\dfrac{-3-7}{2-6} = \\dfrac{-10}{-4} = \\dfrac{5}{2},\\qquad m_2 = -\\dfrac{1}{m_1} = -\\dfrac{2}{5}",
          "fallback": "m₁ = (−3 − 7)/(2 − 6) = −10/(−4) = 5/2, so m₂ = −2/5",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Insert (x₁, y₁) = (6, −2) and m₂ = −2/5 into y − y₁ = m(x − x₁), clear the denominator 5, and write in standard form.",
        "eq": "y + 2 = (−2/5)(x − 6) gives 5y + 10 = −2x + 12, so 2x + 5y − 2 = 0",
        "math": {
          "latex": "\\begin{aligned} y - (-2) &= -\\dfrac{2}{5}(x - 6) \\\\ 5y + 10 &= -2x + 12 \\\\ 2x + 5y - 2 &= 0 \\end{aligned}",
          "fallback": "y + 2 = (−2/5)(x − 6) gives 5y + 10 = −2x + 12, so 2x + 5y − 2 = 0",
          "display": true
        }
      }
    ],
    "answer": "2x + 5y − 2 = 0",
    "answerMath": {
      "latex": "2x + 5y - 2 = 0",
      "fallback": "2x + 5y − 2 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q6. EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    }
  },
  {
    "id": "c10-5-ex5-4-q7",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Altitudes of a Triangle",
      "ta": "ஆயத்தொலை வடிவியல் — முக்கோணத்தின் குத்துக்கோடுகள்"
    },
    "label": {
      "en": "Exercise 5.4 · Q7",
      "ta": "பயிற்சி 5.4 · வினா 7 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Equations of altitudes through A and B of ΔABC"
    },
    "q": {
      "en": "7. A(−3, 0) B(10, −2) and C(12, 3) are the vertices of ΔABC. Find the equation of the altitude through A and B.",
      "ta": "7. ΔABC -யின் முனைகள் A(−3, 0) B(10, −2) மற்றும் C(12, 3) எனில், A மற்றும் B-யிலிருந்து முக்கோணத்தின் எதிர்பக்கத்திற்கு வரையப்படும் குத்துக்கோட்டின் சமன்பாடுகளைக் காண்க."
    },
    "questionMath": {
      "en": [
        "7. ",
        {
          "latex": "A(-3,0)\\; B(10,-2)",
          "fallback": "A(−3, 0) B(10, −2)",
          "display": false
        },
        " and ",
        {
          "latex": "C(12,3)",
          "fallback": "C(12, 3)",
          "display": false
        },
        " are the vertices of ",
        {
          "latex": "\\Delta ABC",
          "fallback": "ΔABC",
          "display": false
        },
        ". Find the equation of the altitude through ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " and ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "."
      ],
      "ta": [
        "7. ",
        {
          "latex": "\\Delta ABC",
          "fallback": "ΔABC",
          "display": false
        },
        " -யின் முனைகள் ",
        {
          "latex": "A(-3,0)\\; B(10,-2)",
          "fallback": "A(−3, 0) B(10, −2)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "C(12,3)",
          "fallback": "C(12, 3)",
          "display": false
        },
        " எனில், ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-யிலிருந்து முக்கோணத்தின் எதிர்பக்கத்திற்கு வரையப்படும் குத்துக்கோட்டின் சமன்பாடுகளைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: An altitude from vertex A is perpendicular to opposite side BC (slope 5/2 -> altitude slope −2/5 -> 2x + 5y + 6 = 0), and the altitude from B is perpendicular to AC (slope 1/5 -> altitude slope −5 -> 5x + y − 48 = 0).",
        "eq": "m_BC = (3 − (−2))/(12 − 10) = 5/2, so altitude through A has slope −2/5",
        "math": {
          "latex": "m_{BC} = \\dfrac{3-(-2)}{12-10} = \\dfrac{5}{2}\\quad\\text{gives}\\quad m_{\\text{alt }A} = -\\dfrac{2}{5}",
          "fallback": "m_BC = (3 − (−2))/(12 − 10) = 5/2, so altitude through A has slope −2/5",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — For the altitude through A(−3, 0), substitute into y − 0 = (−2/5)(x + 3) to get 2x + 5y + 6 = 0. Then compute the slope of AC = (3 − 0)/(12 − (−3)) = 1/5, take its negative reciprocal −5, and apply point-slope form at B(10, −2).",
        "eq": "Through A: 2x + 5y + 6 = 0; m_AC = 1/5 gives altitude through B slope −5: 5x + y − 48 = 0",
        "math": {
          "latex": "\\begin{aligned} \\text{Altitude from } A:\\quad y - 0 &= -\\dfrac{2}{5}(x+3) \\quad\\text{gives}\\quad 2x+5y+6=0 \\\\ m_{AC} &= \\dfrac{3-0}{12-(-3)} = \\dfrac{3}{15} = \\dfrac{1}{5} \\quad\\text{gives}\\quad m_{\\text{alt }B} = -5 \\\\ \\text{Altitude from } B:\\quad y + 2 &= -5(x-10) \\quad\\text{gives}\\quad 5x+y-48=0 \\end{aligned}",
          "fallback": "Through A: 2x + 5y + 6 = 0; m_AC = 1/5 gives altitude through B slope −5: 5x + y − 48 = 0",
          "display": true
        }
      }
    ],
    "answer": "2x + 5y + 6 = 0, 5x + y − 48 = 0",
    "answerMath": {
      "latex": "2x + 5y + 6 = 0,\\quad 5x + y - 48 = 0",
      "fallback": "2x + 5y + 6 = 0, 5x + y − 48 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q7. EN printed p. 235 (PDF p. 241); TA printed p. 242 (PDF p. 248); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 248
      }
    },
    "figureSrc": "assets/grade10-ch5/ex5-4-q7.svg",
    "figureAlt": {
      "en": "Altitudes from A to D on the extension of BC and from B to E on AC. Right-angle markers show where they meet the sides.",
      "ta": "A-இலிருந்து BC-யின் நீட்டிப்பில் D வரையும், B-இலிருந்து AC-யில் E வரையும் செல்லும் செங்குத்துகள். அவை சந்திக்கும் இடங்களில் செங்கோணக் குறிகள் உள்ளன."
    }
  },
  {
    "id": "c10-5-ex5-4-q8",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Perpendicular Bisector",
      "ta": "ஆயத்தொலை வடிவியல் — மையக் குத்துக்கோடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q8",
      "ta": "பயிற்சி 5.4 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Perpendicular bisector of segment joining A(−4, 2) and B(6, −4)"
    },
    "q": {
      "en": "8. Find the equation of the perpendicular bisector of the line joining the points A(−4, 2) and B(6, −4).",
      "ta": "8. A(−4, 2) மற்றும் B(6, −4) என்ற புள்ளிகளை இணைக்கும் மையக் குத்துக்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "8. Find the equation of the perpendicular bisector of the line joining the points ",
        {
          "latex": "A(-4,2)",
          "fallback": "A(−4, 2)",
          "display": false
        },
        " and ",
        {
          "latex": "B(6,-4)",
          "fallback": "B(6, −4)",
          "display": false
        },
        "."
      ],
      "ta": [
        "8. ",
        {
          "latex": "A(-4,2)",
          "fallback": "A(−4, 2)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "B(6,-4)",
          "fallback": "B(6, −4)",
          "display": false
        },
        " என்ற புள்ளிகளை இணைக்கும் மையக் குத்துக்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: A perpendicular bisector passes through midpoint M = (1, −1) of AB at 90° to AB. Since m_AB = −3/5, the perpendicular slope is 5/3, yielding 5x − 3y − 8 = 0.",
        "eq": "M = ((−4 + 6)/2, (2 − 4)/2) = (1, −1), m_AB = −6/10 = −3/5",
        "math": {
          "latex": "M = \\left(\\dfrac{-4+6}{2},\\;\\dfrac{2-4}{2}\\right) = (1,-1),\\qquad m_{AB} = \\dfrac{-4-2}{6-(-4)} = -\\dfrac{3}{5}",
          "fallback": "M = ((−4 + 6)/2, (2 − 4)/2) = (1, −1), m_AB = −6/10 = −3/5",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Take negative reciprocal slope m_perp = 5/3 and pass the line through M(1, −1) using y − y₁ = m(x − x₁).",
        "eq": "m_perp = 5/3 through (1, −1): y + 1 = (5/3)(x − 1) gives 5x − 3y − 8 = 0",
        "math": {
          "latex": "\\begin{aligned} m_{\\perp} &= \\dfrac{5}{3} \\\\ y - (-1) &= \\dfrac{5}{3}(x - 1) \\\\ 3y + 3 &= 5x - 5 \\\\ 5x - 3y - 8 &= 0 \\end{aligned}",
          "fallback": "m_perp = 5/3 through (1, −1): y + 1 = (5/3)(x − 1) gives 5x − 3y − 8 = 0",
          "display": true
        }
      }
    ],
    "answer": "5x − 3y − 8 = 0",
    "answerMath": {
      "latex": "5x - 3y - 8 = 0",
      "fallback": "5x − 3y − 8 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q8. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 249
      }
    },
    "figureSrc": "assets/grade10-ch5/ex5-4-q8.svg",
    "figureAlt": {
      "en": "The perpendicular bisector meets segment AB at its midpoint M (1, −1).",
      "ta": "A, B புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி M (1, −1) வழியாகச் செல்லும் மையக் குத்துக்கோடு."
    }
  },
  {
    "id": "c10-5-ex5-4-q9",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Line Through Intersection",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டும் புள்ளி வழிச் செல்லும் கோடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q9",
      "ta": "பயிற்சி 5.4 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through intersection of 7x + 3y = 10 and 5x − 4y = 1 parallel to 13x + 5y + 12 = 0"
    },
    "q": {
      "en": "9. Find the equation of a straight line through the intersection of lines 7x + 3y = 10, 5x − 4y = 1 and parallel to the line 13x + 5y + 12 = 0",
      "ta": "9. 7x + 3y = 10, 5x − 4y = 1 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும், 13x + 5y + 12 = 0 என்ற நேர்க்கோட்டிற்கு இணையாகவும் அமையும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "9. Find the equation of a straight line through the intersection of lines ",
        {
          "latex": "7x+3y=10",
          "fallback": "7x + 3y = 10",
          "display": false
        },
        ", ",
        {
          "latex": "5x-4y=1",
          "fallback": "5x − 4y = 1",
          "display": false
        },
        " and parallel to the line ",
        {
          "latex": "13x+5y+12=0",
          "fallback": "13x + 5y + 12 = 0",
          "display": false
        }
      ],
      "ta": [
        "9. ",
        {
          "latex": "7x+3y=10",
          "fallback": "7x + 3y = 10",
          "display": false
        },
        ", ",
        {
          "latex": "5x-4y=1",
          "fallback": "5x − 4y = 1",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும், ",
        {
          "latex": "13x+5y+12=0",
          "fallback": "13x + 5y + 12 = 0",
          "display": false
        },
        " என்ற நேர்க்கோட்டிற்கு இணையாகவும் அமையும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Solve 7x + 3y = 10 and 5x − 4y = 1 simultaneously to get intersection (1, 1). Any line parallel to 13x + 5y + 12 = 0 has form 13x + 5y + k = 0; substituting (1, 1) gives k = −18.",
        "eq": "4(7x + 3y) + 3(5x − 4y) = 43 gives x = 1, y = 1",
        "math": {
          "latex": "\\begin{aligned} 4(7x+3y) + 3(5x-4y) &= 4(10)+3(1) \\\\ 43x &= 43\\quad\\text{gives}\\quad x=1,\\; y=1 \\end{aligned}",
          "fallback": "4(7x + 3y) + 3(5x − 4y) = 43 gives x = 1, y = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Parallel lines share identical x and y coefficients: 13x + 5y + k = 0 (same slope −13/5). Plug in (1, 1) to evaluate the constant k.",
        "eq": "13(1) + 5(1) + k = 0 gives k = −18, so 13x + 5y − 18 = 0",
        "math": {
          "latex": "\\begin{aligned} 13x + 5y + k &= 0 \\\\ 13(1) + 5(1) + k &= 0\\quad\\text{gives}\\quad k = -18 \\\\ 13x + 5y - 18 &= 0 \\end{aligned}",
          "fallback": "13(1) + 5(1) + k = 0 gives k = −18, so 13x + 5y − 18 = 0",
          "display": true
        }
      }
    ],
    "answer": "13x + 5y − 18 = 0",
    "answerMath": {
      "latex": "13x + 5y - 18 = 0",
      "fallback": "13x + 5y − 18 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q9. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
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
    "id": "c10-5-ex5-4-q10",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Line Through Intersection",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டும் புள்ளி வழிச் செல்லும் கோடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q10",
      "ta": "பயிற்சி 5.4 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through intersection of 5x − 6y = 2 and 3x + 2y = 10 perpendicular to 4x − 7y + 13 = 0"
    },
    "q": {
      "en": "10. Find the equation of a straight line through the intersection of lines 5x − 6y = 2, 3x + 2y = 10 and perpendicular to the line 4x − 7y + 13 = 0",
      "ta": "10. 5x − 6y = 2, 3x + 2y = 10 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும் 4x − 7y + 13 = 0 என்ற நேர்க்கோட்டிற்குச் செங்குத்தாகவும் அமையும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "10. Find the equation of a straight line through the intersection of lines ",
        {
          "latex": "5x-6y=2",
          "fallback": "5x − 6y = 2",
          "display": false
        },
        ", ",
        {
          "latex": "3x+2y=10",
          "fallback": "3x + 2y = 10",
          "display": false
        },
        " and perpendicular to the line ",
        {
          "latex": "4x-7y+13=0",
          "fallback": "4x − 7y + 13 = 0",
          "display": false
        }
      ],
      "ta": [
        "10. ",
        {
          "latex": "5x-6y=2",
          "fallback": "5x − 6y = 2",
          "display": false
        },
        ", ",
        {
          "latex": "3x+2y=10",
          "fallback": "3x + 2y = 10",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளி வழியாகவும் ",
        {
          "latex": "4x-7y+13=0",
          "fallback": "4x − 7y + 13 = 0",
          "display": false
        },
        " என்ற நேர்க்கோட்டிற்குச் செங்குத்தாகவும் அமையும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Eliminate y between 5x − 6y = 2 and 3x + 2y = 10 to locate the intersection point (16/7, 11/7). A line perpendicular to 4x − 7y + 13 = 0 has form 7x + 4y + k = 0; substituting (16/7, 11/7) produces 49x + 28y − 156 = 0.",
        "eq": "(5x − 6y) + 3(3x + 2y) = 2 + 30 gives 14x = 32, so (16/7, 11/7)",
        "math": {
          "latex": "\\begin{aligned} (5x-6y) + 3(3x+2y) &= 2 + 30 \\\\ 14x = 32\\quad\\text{gives}\\quad x &= \\dfrac{16}{7},\\qquad y = \\dfrac{10-3(16/7)}{2} = \\dfrac{11}{7} \\end{aligned}",
          "fallback": "(5x − 6y) + 3(3x + 2y) = 2 + 30 gives 14x = 32, so (16/7, 11/7)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — To form a line perpendicular to 4x − 7y + 13 = 0 (slope 4/7), swap the x and y coefficients and flip the sign between them to get 7x + 4y + k = 0 (slope −7/4). Substitute (16/7, 11/7) and multiply by 7.",
        "eq": "7(16/7) + 4(11/7) + k = 0 gives k = −156/7, so 49x + 28y − 156 = 0",
        "math": {
          "latex": "\\begin{aligned} 7\\left(\\dfrac{16}{7}\\right) + 4\\left(\\dfrac{11}{7}\\right) + k &= 0 \\\\ \\dfrac{112 + 44}{7} + k &= 0\\quad\\text{gives}\\quad k = -\\dfrac{156}{7} \\\\ 7x + 4y - \\dfrac{156}{7} &= 0\\quad\\text{gives}\\quad 49x + 28y - 156 = 0 \\end{aligned}",
          "fallback": "7(16/7) + 4(11/7) + k = 0 gives k = −156/7, so 49x + 28y − 156 = 0",
          "display": true
        }
      }
    ],
    "answer": "49x + 28y − 156 = 0",
    "answerMath": {
      "latex": "49x + 28y - 156 = 0",
      "fallback": "49x + 28y − 156 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q10. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
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
    "id": "c10-5-ex5-4-q11",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Line Joining Two Intersections",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டும் புள்ளிகளை இணைக்கும் கோடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q11",
      "ta": "பயிற்சி 5.4 · வினா 11 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line joining the intersections of two pairs of lines"
    },
    "q": {
      "en": "11. Find the equation of a straight line joining the point of intersection of 3x + y + 2 = 0 and x − 2y − 4 = 0 to the point of intersection of 7x − 3y = −12 and 2y = x + 3",
      "ta": "11. 7x − 3y = −12 மற்றும் 2y = x + 3 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியையும், 3x + y + 2 = 0 மற்றும் x − 2y − 4 = 0 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியையும் இணைக்கும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "11. Find the equation of a straight line joining the point of intersection of ",
        {
          "latex": "3x+y+2=0",
          "fallback": "3x + y + 2 = 0",
          "display": false
        },
        " and ",
        {
          "latex": "x-2y-4=0",
          "fallback": "x − 2y − 4 = 0",
          "display": false
        },
        " to the point of intersection of ",
        {
          "latex": "7x-3y=-12",
          "fallback": "7x − 3y = −12",
          "display": false
        },
        " and ",
        {
          "latex": "2y=x+3",
          "fallback": "2y = x + 3",
          "display": false
        }
      ],
      "ta": [
        "11. ",
        {
          "latex": "7x-3y=-12",
          "fallback": "7x − 3y = −12",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "2y=x+3",
          "fallback": "2y = x + 3",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியையும், ",
        {
          "latex": "3x+y+2=0",
          "fallback": "3x + y + 2 = 0",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "x-2y-4=0",
          "fallback": "x − 2y − 4 = 0",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியையும் இணைக்கும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Solve the first pair to get P(0, −2) and the second pair to get Q(−15/11, 9/11). Apply the two-point straight line formula through P and Q to obtain 31x + 15y + 30 = 0.",
        "eq": "P = (0, −2) from 3x + y + 2 = 0 and x − 2y − 4 = 0; Q = (−15/11, 9/11) from 7x − 3y = −12 and 2y = x + 3",
        "math": {
          "latex": "\\begin{aligned} 2(3x+y+2)+(x-2y-4)=0 &\\;\\text{gives}\\; P(0,-2) \\\\ 7(2y-3)-3y=-12 &\\;\\text{gives}\\; 11y=9,\\; Q\\left(-\\dfrac{15}{11},\\dfrac{9}{11}\\right) \\end{aligned}",
          "fallback": "P = (0, −2) from 3x + y + 2 = 0 and x − 2y − 4 = 0; Q = (−15/11, 9/11) from 7x − 3y = −12 and 2y = x + 3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Use (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁) with P(0, −2) and Q(−15/11, 9/11). Notice the common denominator 11 cancels cleanly between both ratios.",
        "eq": "(y + 2)/(31/11) = x/(−15/11) gives −15(y + 2) = 31x, so 31x + 15y + 30 = 0",
        "math": {
          "latex": "\\begin{aligned} \\dfrac{y - (-2)}{\\frac{9}{11} - (-2)} &= \\dfrac{x - 0}{-\\frac{15}{11} - 0} \\\\ \\dfrac{y+2}{31/11} &= \\dfrac{x}{-15/11} \\\\ -15(y+2) &= 31x \\\\ 31x + 15y + 30 &= 0 \\end{aligned}",
          "fallback": "(y + 2)/(31/11) = x/(−15/11) gives −15(y + 2) = 31x, so 31x + 15y + 30 = 0",
          "display": true
        }
      }
    ],
    "answer": "31x + 15y + 30 = 0",
    "answerMath": {
      "latex": "31x + 15y + 30 = 0",
      "fallback": "31x + 15y + 30 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q11. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
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
    "id": "c10-5-ex5-4-q12",
    "classNum": 10,
    "chapter": "5",
    "exercise": "5.4",
    "topic": {
      "en": "Coordinate Geometry — Line Through Intersection & Midpoint",
      "ta": "ஆயத்தொலை வடிவியல் — வெட்டும் புள்ளி மற்றும் நடுப்புள்ளி வழிச் செல்லும் கோடு"
    },
    "label": {
      "en": "Exercise 5.4 · Q12",
      "ta": "பயிற்சி 5.4 · வினா 12 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Line through intersection of 8x + 3y = 18 and 4x + 5y = 9 and midpoint of (5, −4) and (−7, 6)"
    },
    "q": {
      "en": "12. Find the equation of a straight line through the point of intersection of the lines 8x + 3y = 18, 4x + 5y = 9 and bisecting the line segment joining the points (5, −4) and (−7, 6).",
      "ta": "12. 8x + 3y = 18, 4x + 5y = 9 ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியின் வழியாகவும், (5, −4) மற்றும் (−7, 6) ஆகிய புள்ளிகளை இணைக்கும் நேர்க்கோட்டுத் துண்டின் நடுப்புள்ளி வழியாகச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
    },
    "questionMath": {
      "en": [
        "12. Find the equation of a straight line through the point of intersection of the lines ",
        {
          "latex": "8x+3y=18",
          "fallback": "8x + 3y = 18",
          "display": false
        },
        ", ",
        {
          "latex": "4x+5y=9",
          "fallback": "4x + 5y = 9",
          "display": false
        },
        " and bisecting the line segment joining the points ",
        {
          "latex": "(5,-4)",
          "fallback": "(5, −4)",
          "display": false
        },
        " and ",
        {
          "latex": "(-7,6)",
          "fallback": "(−7, 6)",
          "display": false
        },
        "."
      ],
      "ta": [
        "12. ",
        {
          "latex": "8x+3y=18",
          "fallback": "8x + 3y = 18",
          "display": false
        },
        ", ",
        {
          "latex": "4x+5y=9",
          "fallback": "4x + 5y = 9",
          "display": false
        },
        " ஆகிய நேர்க்கோடுகள் சந்திக்கும் புள்ளியின் வழியாகவும், ",
        {
          "latex": "(5,-4)",
          "fallback": "(5, −4)",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "(-7,6)",
          "fallback": "(−7, 6)",
          "display": false
        },
        " ஆகிய புள்ளிகளை இணைக்கும் நேர்க்கோட்டுத் துண்டின் நடுப்புள்ளி வழியாகச் செல்லும் நேர்க்கோட்டின் சமன்பாட்டைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Solve 8x + 3y = 18 and 4x + 5y = 9 to obtain intersection P(9/4, 0), and compute midpoint M(−1, 1) of (5, −4) and (−7, 6). Using the two-point formula through P and M yields 4x + 13y − 9 = 0.",
        "eq": "2(4x + 5y) − (8x + 3y) = 18 − 18 gives y = 0, x = 9/4; M = (−1, 1)",
        "math": {
          "latex": "\\begin{aligned} 2(4x+5y)-(8x+3y)=0 &\\;\\text{gives}\\; y=0,\\; x=\\dfrac{9}{4},\\; P\\left(\\dfrac{9}{4},0\\right) \\\\ M &= \\left(\\dfrac{5-7}{2},\\;\\dfrac{-4+6}{2}\\right) = (-1, 1) \\end{aligned}",
          "fallback": "2(4x + 5y) − (8x + 3y) = 18 − 18 gives y = 0, x = 9/4; M = (−1, 1)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — A line bisecting a segment passes through its midpoint M(−1, 1). Apply the two-point equation between P(9/4, 0) and M(−1, 1) and clear the fraction 4.",
        "eq": "(y − 0)/(1 − 0) = (x − 9/4)/(−1 − 9/4) gives −13y = 4x − 9, so 4x + 13y − 9 = 0",
        "math": {
          "latex": "\\begin{aligned} \\dfrac{y - 0}{1 - 0} &= \\dfrac{x - \\frac{9}{4}}{-1 - \\frac{9}{4}} \\\\ y &= \\dfrac{4x - 9}{-13} \\\\ 4x + 13y - 9 &= 0 \\end{aligned}",
          "fallback": "(y − 0)/(1 − 0) = (x − 9/4)/(−1 − 9/4) gives −13y = 4x − 9, so 4x + 13y − 9 = 0",
          "display": true
        }
      }
    ],
    "answer": "4x + 13y − 9 = 0",
    "answerMath": {
      "latex": "4x + 13y - 9 = 0",
      "fallback": "4x + 13y − 9 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 5.4 Q12. EN printed p. 235 (PDF p. 241); TA printed p. 243 (PDF p. 249); Answer Appendix EN PDF p. 347 / TA PDF p. 361.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 241,
        "ta": 249
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
