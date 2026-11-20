/* 2025 revised TN SCERT Grade 10 Trigonometry, Exercise 6.5 (Q1–Q15 MCQs).
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-ex6-5-q1",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Identities (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q1",
      "ta": "பயிற்சி 6.5 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Simplifying sin²θ + 1/(1 + tan²θ)"
    },
    "q": {
      "en": "1. The value of sin² θ + 1/(1 + tan² θ) is equal to\n(A) tan² θ   (B) 1   (C) cot² θ   (D) 0",
      "ta": "1. sin² θ + 1/(1 + tan² θ) -ன் மதிப்பு\n(அ) tan² θ   (ஆ) 1   (இ) cot² θ   (ஈ) 0"
    },
    "questionMath": {
      "en": [
        "1. The value of ",
        {
          "latex": "\\sin^2\\theta + \\dfrac{1}{1 + \\tan^2\\theta}",
          "fallback": "sin² θ + 1/(1 + tan² θ)",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "\\tan^2\\theta",
          "fallback": "tan² θ",
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
          "latex": "\\cot^2\\theta",
          "fallback": "cot² θ",
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
        "1. ",
        {
          "latex": "\\sin^2\\theta + \\dfrac{1}{1 + \\tan^2\\theta}",
          "fallback": "sin² θ + 1/(1 + tan² θ)",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "\\tan^2\\theta",
          "fallback": "tan² θ",
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
          "latex": "\\cot^2\\theta",
          "fallback": "cot² θ",
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
        "en": "Quick Solution Plan: Substitute 1 + tan²θ = sec²θ and turn 1/sec²θ into cos²θ so the sum collapses to sin²θ + cos²θ = 1 — Option (B).",
        "eq": "sin² θ + 1/(1 + tan² θ) = sin² θ + 1/sec² θ",
        "math": {
          "latex": "\\sin^2\\theta + \\dfrac{1}{1 + \\tan^2\\theta} = \\sin^2\\theta + \\dfrac{1}{\\sec^2\\theta}",
          "fallback": "sin² θ + 1/(1 + tan² θ) = sin² θ + 1/sec² θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Since sec θ = 1/cos θ, its reciprocal squared is cos²θ. Adding sin²θ + cos²θ gives 1 by the fundamental Pythagorean identity.",
        "eq": "sin² θ + cos² θ = 1 — Option (B)",
        "math": {
          "latex": "\\sin^2\\theta + \\cos^2\\theta = 1\\quad\\text{— Option (B)}",
          "fallback": "sin² θ + cos² θ = 1 — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 1",
    "answerMath": {
      "latex": "(B)\\; 1",
      "fallback": "(B) 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q1. EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q2",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Identities (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q2",
      "ta": "பயிற்சி 6.5 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Simplifying tan θ cosec²θ − tan θ"
    },
    "q": {
      "en": "2. tan θ cosec² θ − tan θ is equal to\n(A) sec θ   (B) cot² θ   (C) sin θ   (D) cot θ",
      "ta": "2. tan θ cosec² θ − tan θ -ன் மதிப்பு\n(அ) sec θ   (ஆ) cot² θ   (இ) sin θ   (ஈ) cot θ"
    },
    "questionMath": {
      "en": [
        "2. ",
        {
          "latex": "\\tan\\theta\\,\\csc^2\\theta - \\tan\\theta",
          "fallback": "tan θ cosec² θ − tan θ",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "\\sec\\theta",
          "fallback": "sec θ",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\cot^2\\theta",
          "fallback": "cot² θ",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\sin\\theta",
          "fallback": "sin θ",
          "display": false
        },
        "   (D) ",
        {
          "latex": "\\cot\\theta",
          "fallback": "cot θ",
          "display": false
        }
      ],
      "ta": [
        "2. ",
        {
          "latex": "\\tan\\theta\\,\\csc^2\\theta - \\tan\\theta",
          "fallback": "tan θ cosec² θ − tan θ",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "\\sec\\theta",
          "fallback": "sec θ",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\cot^2\\theta",
          "fallback": "cot² θ",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\sin\\theta",
          "fallback": "sin θ",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "\\cot\\theta",
          "fallback": "cot θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Factor out tan θ to get tan θ(cosec²θ − 1) = tan θ · cot²θ = cot θ — Option (D).",
        "eq": "tan θ(cosec² θ − 1) = tan θ · cot² θ",
        "math": {
          "latex": "\\tan\\theta(\\csc^2\\theta - 1) = \\tan\\theta\\cdot\\cot^2\\theta",
          "fallback": "tan θ(cosec² θ − 1) = tan θ · cot² θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because tan θ = 1/cot θ, multiplying (1/cot θ) by cot²θ cancels one factor of cot θ, leaving cot θ.",
        "eq": "(1/cot θ) · cot² θ = cot θ — Option (D)",
        "math": {
          "latex": "\\dfrac{1}{\\cot\\theta}\\cdot\\cot^2\\theta = \\cot\\theta\\quad\\text{— Option (D)}",
          "fallback": "(1/cot θ) · cot² θ = cot θ — Option (D)",
          "display": true
        }
      }
    ],
    "answer": "(D) cot θ",
    "answerMath": {
      "latex": "(D)\\; \\cot\\theta",
      "fallback": "(D) cot θ",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q2. EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q3",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Identities (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q3",
      "ta": "பயிற்சி 6.5 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Finding k in (sin α + cosec α)² + (cos α + sec α)²"
    },
    "q": {
      "en": "3. If (sin α + cosec α)² + (cos α + sec α)² = k + tan² α + cot² α, then the value of k is equal to\n(A) 9   (B) 7   (C) 5   (D) 3",
      "ta": "3. (sin α + cosec α)² + (cos α + sec α)² = k + tan² α + cot² α எனில் k -ன் மதிப்பு\n(அ) 9   (ஆ) 7   (இ) 5   (ஈ) 3"
    },
    "questionMath": {
      "en": [
        "3. If ",
        {
          "latex": "(\\sin\\alpha + \\csc\\alpha)^2 + (\\cos\\alpha + \\sec\\alpha)^2 = k + \\tan^2\\alpha + \\cot^2\\alpha",
          "fallback": "(sin α + cosec α)² + (cos α + sec α)² = k + tan² α + cot² α",
          "display": false
        },
        ", then the value of ",
        {
          "latex": "k",
          "fallback": "k",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "9",
          "fallback": "9",
          "display": false
        },
        "   (B) ",
        {
          "latex": "7",
          "fallback": "7",
          "display": false
        },
        "   (C) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        "   (D) ",
        {
          "latex": "3",
          "fallback": "3",
          "display": false
        }
      ],
      "ta": [
        "3. ",
        {
          "latex": "(\\sin\\alpha + \\csc\\alpha)^2 + (\\cos\\alpha + \\sec\\alpha)^2 = k + \\tan^2\\alpha + \\cot^2\\alpha",
          "fallback": "(sin α + cosec α)² + (cos α + sec α)² = k + tan² α + cot² α",
          "display": false
        },
        " எனில் ",
        {
          "latex": "k",
          "fallback": "k",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "9",
          "fallback": "9",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "7",
          "fallback": "7",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "3",
          "fallback": "3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Expand both squares using (a + b)² = a² + 2ab + b². Because sin α · cosec α = 1 and cos α · sec α = 1, both cross terms equal 2. Grouping sin²α + cos²α = 1 and converting cosec²α = 1 + cot²α, sec²α = 1 + tan²α yields 7 + tan²α + cot²α — Option (B).",
        "eq": "(sin²α + 2 + cosec²α) + (cos²α + 2 + sec²α)",
        "math": {
          "latex": "\\begin{aligned} &(\\sin^2\\alpha + 2 + \\csc^2\\alpha) + (\\cos^2\\alpha + 2 + \\sec^2\\alpha) \\\\[4pt] &= (\\sin^2\\alpha + \\cos^2\\alpha) + 4 + (1 + \\cot^2\\alpha) + (1 + \\tan^2\\alpha) \\end{aligned}",
          "fallback": "(sin²α + 2 + cosec²α) + (cos²α + 2 + sec²α)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Add the constants 1 + 4 + 1 + 1 = 7. Matching 7 + tan²α + cot²α against k + tan²α + cot²α gives k = 7.",
        "eq": "7 + tan² α + cot² α gives k = 7",
        "math": {
          "latex": "7 + \\tan^2\\alpha + \\cot^2\\alpha = k + \\tan^2\\alpha + \\cot^2\\alpha \\text{gives}\\; k = 7",
          "fallback": "7 + tan² α + cot² α gives k = 7",
          "display": true
        }
      }
    ],
    "answer": "(B) 7",
    "answerMath": {
      "latex": "(B)\\; 7",
      "fallback": "(B) 7",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q3. EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q4",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Elimination (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q4",
      "ta": "பயிற்சி 6.5 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Evaluating b(a² − 1) given a = sin θ + cos θ and b = sec θ + cosec θ"
    },
    "q": {
      "en": "4. If sin θ + cos θ = a and sec θ + cosec θ = b, then the value of b(a² − 1) is equal to\n(A) 2a   (B) 3a   (C) 0   (D) 2ab",
      "ta": "4. sin θ + cos θ = a மற்றும் sec θ + cosec θ = b எனில் b(a² − 1) -ன் மதிப்பு\n(அ) 2a   (ஆ) 3a   (இ) 0   (ஈ) 2ab"
    },
    "questionMath": {
      "en": [
        "4. If ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = a",
          "fallback": "sin θ + cos θ = a",
          "display": false
        },
        " and ",
        {
          "latex": "\\sec\\theta + \\csc\\theta = b",
          "fallback": "sec θ + cosec θ = b",
          "display": false
        },
        ", then the value of ",
        {
          "latex": "b(a^2 - 1)",
          "fallback": "b(a² − 1)",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "2a",
          "fallback": "2a",
          "display": false
        },
        "   (B) ",
        {
          "latex": "3a",
          "fallback": "3a",
          "display": false
        },
        "   (C) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        },
        "   (D) ",
        {
          "latex": "2ab",
          "fallback": "2ab",
          "display": false
        }
      ],
      "ta": [
        "4. ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = a",
          "fallback": "sin θ + cos θ = a",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\sec\\theta + \\csc\\theta = b",
          "fallback": "sec θ + cosec θ = b",
          "display": false
        },
        " எனில் ",
        {
          "latex": "b(a^2 - 1)",
          "fallback": "b(a² − 1)",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "2a",
          "fallback": "2a",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "3a",
          "fallback": "3a",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "0",
          "fallback": "0",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "2ab",
          "fallback": "2ab",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Square sin θ + cos θ = a to see a² − 1 = 2 sin θ cos θ. Rewrite b = 1/cos θ + 1/sin θ = a / (sin θ cos θ). Multiplying cancels sin θ cos θ and leaves 2a — Option (A).",
        "eq": "a² − 1 = 2 sin θ cos θ",
        "math": {
          "latex": "\\begin{aligned} a^2 &= (\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta \\\\[4pt] a^2 - 1 &= 2\\sin\\theta\\cos\\theta \\end{aligned}",
          "fallback": "a² − 1 = 2 sin θ cos θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Combine b = 1/cos θ + 1/sin θ over the common denominator sin θ cos θ, then multiply by (a² − 1) so sin θ cos θ cancels cleanly.",
        "eq": "b(a² − 1) = 2a — Option (A)",
        "math": {
          "latex": "b(a^2 - 1) = \\left(\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta}\\right)(2\\sin\\theta\\cos\\theta) = \\dfrac{a}{\\sin\\theta\\cos\\theta}\\cdot 2\\sin\\theta\\cos\\theta = 2a\\quad\\text{— Option (A)}",
          "fallback": "b(a² − 1) = 2a — Option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) 2a",
    "answerMath": {
      "latex": "(A)\\; 2a",
      "fallback": "(A) 2a",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q4. EN printed p. 266 (PDF p. 272); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q5",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Elimination (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q5",
      "ta": "பயிற்சி 6.5 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Eliminating θ from 5x = sec θ and 5/y = tan θ"
    },
    "q": {
      "en": "5. If 5x = sec θ and 5/y = tan θ, then x² − 1/y² is equal to\n(A) 25   (B) 1/25   (C) 5   (D) 1",
      "ta": "5. 5x = sec θ மற்றும் 5/y = tan θ எனில் x² − 1/y² -ன் மதிப்பு\n(அ) 25   (ஆ) 1/25   (இ) 5   (ஈ) 1"
    },
    "questionMath": {
      "en": [
        "5. If ",
        {
          "latex": "5x = \\sec\\theta",
          "fallback": "5x = sec θ",
          "display": false
        },
        " and ",
        {
          "latex": "\\dfrac{5}{y} = \\tan\\theta",
          "fallback": "5/y = tan θ",
          "display": false
        },
        ", then ",
        {
          "latex": "x^2 - \\dfrac{1}{y^2}",
          "fallback": "x² − 1/y²",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "25",
          "fallback": "25",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{1}{25}",
          "fallback": "1/25",
          "display": false
        },
        "   (C) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        "   (D) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        }
      ],
      "ta": [
        "5. ",
        {
          "latex": "5x = \\sec\\theta",
          "fallback": "5x = sec θ",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\dfrac{5}{y} = \\tan\\theta",
          "fallback": "5/y = tan θ",
          "display": false
        },
        " எனில் ",
        {
          "latex": "x^2 - \\dfrac{1}{y^2}",
          "fallback": "x² − 1/y²",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "25",
          "fallback": "25",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{1}{25}",
          "fallback": "1/25",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "1",
          "fallback": "1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Square both equations and subtract them using sec²θ − tan²θ = 1: 25x² − 25/y² = 1, then divide by 25 to obtain 1/25 — Option (B).",
        "eq": "sec² θ − tan² θ = (5x)² − (5/y)² = 1",
        "math": {
          "latex": "\\sec^2\\theta - \\tan^2\\theta = (5x)^2 - \\left(\\dfrac{5}{y}\\right)^2 = 1",
          "fallback": "sec² θ − tan² θ = (5x)² − (5/y)² = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Factor 25 from 25x² − 25/y² = 25(x² − 1/y²) = 1 and divide both sides by 25.",
        "eq": "x² − 1/y² = 1/25 — Option (B)",
        "math": {
          "latex": "25\\left(x^2 - \\dfrac{1}{y^2}\\right) = 1 \\quad\\text{gives}\\quad x^2 - \\dfrac{1}{y^2} = \\dfrac{1}{25}\\quad\\text{— Option (B)}",
          "fallback": "x² − 1/y² = 1/25 — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 1/25",
    "answerMath": {
      "latex": "(B)\\; \\dfrac{1}{25}",
      "fallback": "(B) 1/25",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q5. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q6",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Ratios (MCQ)",
      "ta": "முக்கோணவியல் விகிதங்கள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q6",
      "ta": "பயிற்சி 6.5 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Evaluating 2 tan²θ + sin²θ − 1 when sin θ = cos θ"
    },
    "q": {
      "en": "6. If sin θ = cos θ, then 2 tan² θ + sin² θ − 1 is equal to\n(A) −3/2   (B) 3/2   (C) 2/3   (D) −2/3",
      "ta": "6. sin θ = cos θ எனில் 2 tan² θ + sin² θ − 1 -ன் மதிப்பு\n(அ) −3/2   (ஆ) 3/2   (இ) 2/3   (ஈ) −2/3"
    },
    "questionMath": {
      "en": [
        "6. If ",
        {
          "latex": "\\sin\\theta = \\cos\\theta",
          "fallback": "sin θ = cos θ",
          "display": false
        },
        ", then ",
        {
          "latex": "2\\tan^2\\theta + \\sin^2\\theta - 1",
          "fallback": "2 tan² θ + sin² θ − 1",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "\\dfrac{-3}{2}",
          "fallback": "−3/2",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{3}{2}",
          "fallback": "3/2",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{2}{3}",
          "fallback": "2/3",
          "display": false
        },
        "   (D) ",
        {
          "latex": "\\dfrac{-2}{3}",
          "fallback": "−2/3",
          "display": false
        }
      ],
      "ta": [
        "6. ",
        {
          "latex": "\\sin\\theta = \\cos\\theta",
          "fallback": "sin θ = cos θ",
          "display": false
        },
        " எனில் ",
        {
          "latex": "2\\tan^2\\theta + \\sin^2\\theta - 1",
          "fallback": "2 tan² θ + sin² θ − 1",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "\\dfrac{-3}{2}",
          "fallback": "−3/2",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{3}{2}",
          "fallback": "3/2",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{2}{3}",
          "fallback": "2/3",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "\\dfrac{-2}{3}",
          "fallback": "−2/3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Dividing sin θ = cos θ by cos θ gives tan θ = 1 (θ = 45°), so sin θ = 1/√2. Plugging in yields 2(1) + 1/2 − 1 = 3/2 — Option (B).",
        "eq": "tan θ = 1, sin² θ = 1/2",
        "math": {
          "latex": "\\sin\\theta = \\cos\\theta \\quad\\text{gives}\\quad \\tan\\theta = 1\\; (\\theta = 45^\\circ),\\quad \\sin^2\\theta = \\dfrac{1}{2}",
          "fallback": "tan θ = 1, sin² θ = 1/2",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Evaluate term by term: 2 tan²θ = 2(1) = 2, plus 1/2, minus 1 = 1 + 1/2 = 3/2.",
        "eq": "2 + 1/2 − 1 = 3/2 — Option (B)",
        "math": {
          "latex": "2(1)^2 + \\left(\\dfrac{1}{\\sqrt{2}}\\right)^2 - 1 = 2 + \\dfrac{1}{2} - 1 = \\dfrac{3}{2}\\quad\\text{— Option (B)}",
          "fallback": "2 + 1/2 − 1 = 3/2 — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 3/2",
    "answerMath": {
      "latex": "(B)\\; \\dfrac{3}{2}",
      "fallback": "(B) 3/2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q6. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q7",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Elimination (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q7",
      "ta": "பயிற்சி 6.5 · வினா 7 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Eliminating θ from x = a tan θ and y = b sec θ"
    },
    "q": {
      "en": "7. If x = a tan θ and y = b sec θ then\n(A) y²/b² − x²/a² = 1   (B) x²/a² − y²/b² = 1   (C) x²/a² + y²/b² = 1   (D) x²/a² − y²/b² = 0",
      "ta": "7. x = a tan θ மற்றும் y = b sec θ எனில்\n(அ) y²/b² − x²/a² = 1   (ஆ) x²/a² − y²/b² = 1   (இ) x²/a² + y²/b² = 1   (ஈ) x²/a² − y²/b² = 0"
    },
    "questionMath": {
      "en": [
        "7. If ",
        {
          "latex": "x = a\\tan\\theta",
          "fallback": "x = a tan θ",
          "display": false
        },
        " and ",
        {
          "latex": "y = b\\sec\\theta",
          "fallback": "y = b sec θ",
          "display": false
        },
        " then\n(A) ",
        {
          "latex": "\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1",
          "fallback": "y²/b² − x²/a² = 1",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1",
          "fallback": "x²/a² − y²/b² = 1",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1",
          "fallback": "x²/a² + y²/b² = 1",
          "display": false
        },
        "   (D) ",
        {
          "latex": "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 0",
          "fallback": "x²/a² − y²/b² = 0",
          "display": false
        }
      ],
      "ta": [
        "7. ",
        {
          "latex": "x = a\\tan\\theta",
          "fallback": "x = a tan θ",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "y = b\\sec\\theta",
          "fallback": "y = b sec θ",
          "display": false
        },
        " எனில்\n(அ) ",
        {
          "latex": "\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1",
          "fallback": "y²/b² − x²/a² = 1",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1",
          "fallback": "x²/a² − y²/b² = 1",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1",
          "fallback": "x²/a² + y²/b² = 1",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 0",
          "fallback": "x²/a² − y²/b² = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Isolate tan θ = x/a and sec θ = y/b, then plug into sec²θ − tan²θ = 1 to get y²/b² − x²/a² = 1 — Option (A).",
        "eq": "tan θ = x/a, sec θ = y/b",
        "math": {
          "latex": "\\tan\\theta = \\dfrac{x}{a},\\qquad \\sec\\theta = \\dfrac{y}{b}",
          "fallback": "tan θ = x/a, sec θ = y/b",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice the subtraction order: sec²θ comes first (since 1 + tan²θ = sec²θ), so y²/b² is positive and x²/a² is subtracted.",
        "eq": "y²/b² − x²/a² = 1 — Option (A)",
        "math": {
          "latex": "\\sec^2\\theta - \\tan^2\\theta = 1 \\quad\\text{gives}\\quad \\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1\\quad\\text{— Option (A)}",
          "fallback": "y²/b² − x²/a² = 1 — Option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) y²/b² − x²/a² = 1",
    "answerMath": {
      "latex": "(A)\\; \\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1",
      "fallback": "(A) y²/b² − x²/a² = 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q7. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q8",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Identities (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q8",
      "ta": "பயிற்சி 6.5 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Evaluating (1 + tan θ + sec θ)(1 + cot θ − cosec θ)"
    },
    "q": {
      "en": "8. (1 + tan θ + sec θ)(1 + cot θ − cosec θ) is equal to\n(A) 0   (B) 1   (C) 2   (D) −1",
      "ta": "8. (1 + tan θ + sec θ)(1 + cot θ − cosec θ) -ன் மதிப்பு\n(அ) 0   (ஆ) 1   (இ) 2   (ஈ) −1"
    },
    "questionMath": {
      "en": [
        "8. ",
        {
          "latex": "(1 + \\tan\\theta + \\sec\\theta)(1 + \\cot\\theta - \\csc\\theta)",
          "fallback": "(1 + tan θ + sec θ)(1 + cot θ − cosec θ)",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "0",
          "fallback": "0",
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
          "latex": "2",
          "fallback": "2",
          "display": false
        },
        "   (D) ",
        {
          "latex": "-1",
          "fallback": "−1",
          "display": false
        }
      ],
      "ta": [
        "8. ",
        {
          "latex": "(1 + \\tan\\theta + \\sec\\theta)(1 + \\cot\\theta - \\csc\\theta)",
          "fallback": "(1 + tan θ + sec θ)(1 + cot θ − cosec θ)",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "0",
          "fallback": "0",
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
          "latex": "2",
          "fallback": "2",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "-1",
          "fallback": "−1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Convert every function into sin θ and cos θ. The numerator multiplies into (sin θ + cos θ + 1)(sin θ + cos θ − 1) = (sin θ + cos θ)² − 1 = 2 sin θ cos θ, leaving 2 — Option (C).",
        "eq": "(1 + sin θ/cos θ + 1/cos θ)(1 + cos θ/sin θ − 1/sin θ)",
        "math": {
          "latex": "\\left(1 + \\dfrac{\\sin\\theta}{\\cos\\theta} + \\dfrac{1}{\\cos\\theta}\\right)\\left(1 + \\dfrac{\\cos\\theta}{\\sin\\theta} - \\dfrac{1}{\\sin\\theta}\\right)",
          "fallback": "(1 + sin θ/cos θ + 1/cos θ)(1 + cos θ/sin θ − 1/sin θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Write each factor over its denominator (cos θ and sin θ), apply (A + 1)(A − 1) = A² − 1 with A = sin θ + cos θ, and simplify.",
        "eq": "2 sin θ cos θ / (sin θ cos θ) = 2 — Option (C)",
        "math": {
          "latex": "\\begin{aligned} &= \\dfrac{(\\sin\\theta + \\cos\\theta + 1)(\\sin\\theta + \\cos\\theta - 1)}{\\sin\\theta\\cos\\theta} \\\\[4pt] &= \\dfrac{(\\sin\\theta + \\cos\\theta)^2 - 1}{\\sin\\theta\\cos\\theta} = \\dfrac{1 + 2\\sin\\theta\\cos\\theta - 1}{\\sin\\theta\\cos\\theta} = 2\\quad\\text{— Option (C)} \\end{aligned}",
          "fallback": "2 sin θ cos θ / (sin θ cos θ) = 2 — Option (C)",
          "display": true
        }
      }
    ],
    "answer": "(C) 2",
    "answerMath": {
      "latex": "(C)\\; 2",
      "fallback": "(C) 2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q8. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q9",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Trigonometric Elimination (MCQ)",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.5 · Q9",
      "ta": "பயிற்சி 6.5 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Finding p² − q² from p = a cot θ + b cosec θ and q = b cot θ + a cosec θ"
    },
    "q": {
      "en": "9. a cot θ + b cosec θ = p and b cot θ + a cosec θ = q then p² − q² is equal to\n(A) a² − b²   (B) b² − a²   (C) a² + b²   (D) b − a",
      "ta": "9. a cot θ + b cosec θ = p மற்றும் b cot θ + a cosec θ = q எனில் p² − q² -ன் மதிப்பு\n(அ) a² − b²   (ஆ) b² − a²   (இ) a² + b²   (ஈ) b − a"
    },
    "questionMath": {
      "en": [
        "9. ",
        {
          "latex": "a\\cot\\theta + b\\csc\\theta = p",
          "fallback": "a cot θ + b cosec θ = p",
          "display": false
        },
        " and ",
        {
          "latex": "b\\cot\\theta + a\\csc\\theta = q",
          "fallback": "b cot θ + a cosec θ = q",
          "display": false
        },
        " then ",
        {
          "latex": "p^2 - q^2",
          "fallback": "p² − q²",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "a^2 - b^2",
          "fallback": "a² − b²",
          "display": false
        },
        "   (B) ",
        {
          "latex": "b^2 - a^2",
          "fallback": "b² − a²",
          "display": false
        },
        "   (C) ",
        {
          "latex": "a^2 + b^2",
          "fallback": "a² + b²",
          "display": false
        },
        "   (D) ",
        {
          "latex": "b - a",
          "fallback": "b − a",
          "display": false
        }
      ],
      "ta": [
        "9. ",
        {
          "latex": "a\\cot\\theta + b\\csc\\theta = p",
          "fallback": "a cot θ + b cosec θ = p",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "b\\cot\\theta + a\\csc\\theta = q",
          "fallback": "b cot θ + a cosec θ = q",
          "display": false
        },
        " எனில் ",
        {
          "latex": "p^2 - q^2",
          "fallback": "p² − q²",
          "display": false
        },
        " -ன் மதிப்பு\n(அ) ",
        {
          "latex": "a^2 - b^2",
          "fallback": "a² − b²",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "b^2 - a^2",
          "fallback": "b² − a²",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "a^2 + b^2",
          "fallback": "a² + b²",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "b - a",
          "fallback": "b − a",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Square both p and q. The cross terms 2ab cot θ cosec θ are identical and cancel upon subtraction, leaving (b² − a²)(cosec²θ − cot²θ) = b² − a² — Option (B).",
        "eq": "p² − q² = (a² cot² θ + b² cosec² θ) − (b² cot² θ + a² cosec² θ)",
        "math": {
          "latex": "p^2 - q^2 = (a^2\\cot^2\\theta + b^2\\csc^2\\theta) - (b^2\\cot^2\\theta + a^2\\csc^2\\theta)",
          "fallback": "p² − q² = (a² cot² θ + b² cosec² θ) − (b² cot² θ + a² cosec² θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Regroup by coefficients (b² − a²) and apply the identity cosec²θ − cot²θ = 1 carefully (watch the sign: cosec²θ has +b² and −a²).",
        "eq": "p² − q² = b² − a² — Option (B)",
        "math": {
          "latex": "p^2 - q^2 = b^2(\\csc^2\\theta - \\cot^2\\theta) - a^2(\\csc^2\\theta - \\cot^2\\theta) = (b^2 - a^2)(1) = b^2 - a^2\\quad\\text{— Option (B)}",
          "fallback": "p² − q² = b² − a² — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) b² − a²",
    "answerMath": {
      "latex": "(B)\\; b^2 - a^2",
      "fallback": "(B) b² − a²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q9. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q10",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q10",
      "ta": "பயிற்சி 6.5 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Angle of elevation when tower height to shadow ratio is √3 : 1"
    },
    "q": {
      "en": "10. If the ratio of the height of a tower and the length of its shadow is √3 : 1, then the angle of elevation of the sun has measure\n(A) 45°   (B) 30°   (C) 90°   (D) 60°",
      "ta": "10. ஒரு கோபுரத்தின் உயரத்திற்கும் அதன் நிழலின் நீளத்திற்கும் உள்ள விகிதம் √3 : 1, எனில் சூரியனைக் காணும் ஏற்றக்கோண அளவானது\n(அ) 45°   (ஆ) 30°   (இ) 90°   (ஈ) 60°"
    },
    "questionMath": {
      "en": [
        "10. If the ratio of the height of a tower and the length of its shadow is ",
        {
          "latex": "\\sqrt{3} : 1",
          "fallback": "√3 : 1",
          "display": false
        },
        ", then the angle of elevation of the sun has measure\n(A) ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        "   (B) ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        "   (C) ",
        {
          "latex": "90^\\circ",
          "fallback": "90°",
          "display": false
        },
        "   (D) ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        }
      ],
      "ta": [
        "10. ஒரு கோபுரத்தின் உயரத்திற்கும் அதன் நிழலின் நீளத்திற்கும் உள்ள விகிதம் ",
        {
          "latex": "\\sqrt{3} : 1",
          "fallback": "√3 : 1",
          "display": false
        },
        ", எனில் சூரியனைக் காணும் ஏற்றக்கோண அளவானது\n(அ) ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "90^\\circ",
          "fallback": "90°",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: In the right triangle made by vertical tower (opposite) and horizontal shadow (adjacent), tan θ = √3 / 1 = √3, so θ = 60° — Option (D).",
        "eq": "tan θ = √3 / 1 = √3",
        "math": {
          "latex": "\\tan\\theta = \\dfrac{\\text{Height}}{\\text{Shadow}} = \\dfrac{\\sqrt{3}}{1} = \\sqrt{3}",
          "fallback": "tan θ = √3 / 1 = √3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Recall tan 60° = √3 from the standard table (while tan 30° = 1/√3), so the sun’s elevation is 60°.",
        "eq": "θ = 60° — Option (D)",
        "math": {
          "latex": "\\theta = 60^\\circ\\quad\\text{— Option (D)}",
          "fallback": "θ = 60° — Option (D)",
          "display": true
        }
      }
    ],
    "answer": "(D) 60°",
    "answerMath": {
      "latex": "(D)\\; 60^\\circ",
      "fallback": "(D) 60°",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q10. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q11",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q11",
      "ta": "பயிற்சி 6.5 · வினா 11 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of electric pole from 30° elevation and 60° depression at height b"
    },
    "q": {
      "en": "11. The electric pole subtends an angle of 30° at a point on the same level as its foot. At a second point ‘b’ metres above the first, the depression of the foot of the pole is 60°. The height of the pole (in metres) is equal to\n(A) √3 b   (B) b/3   (C) b/2   (D) b/√3",
      "ta": "11. ஒரு மின் கம்பமானது அதன் அடியில் சமதளப் பரப்பில் உள்ள ஒரு புள்ளியில் 30° கோணத்தை ஏற்படுத்துகிறது. முதல் புள்ளிக்கு ‘b’ மீ உயரத்தில் உள்ள இரண்டாவது புள்ளியிலிருந்து மின்கம்பத்தின் அடிக்கு இறக்கக்கோணம் 60° எனில் மின் கம்பத்தின் உயரமானது (மீட்டரில்)\n(அ) √3 b   (ஆ) b/3   (இ) b/2   (ஈ) b/√3"
    },
    "questionMath": {
      "en": [
        "11. The electric pole subtends an angle of ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " at a point on the same level as its foot. At a second point ‘",
        {
          "latex": "b",
          "fallback": "b",
          "display": false
        },
        "’ metres above the first, the depression of the foot of the pole is ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ". The height of the pole (in metres) is equal to\n(A) ",
        {
          "latex": "\\sqrt{3}\\,b",
          "fallback": "√3 b",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{b}{3}",
          "fallback": "b/3",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{b}{2}",
          "fallback": "b/2",
          "display": false
        },
        "   (D) ",
        {
          "latex": "\\dfrac{b}{\\sqrt{3}}",
          "fallback": "b/√3",
          "display": false
        }
      ],
      "ta": [
        "11. ஒரு மின் கம்பமானது அதன் அடியில் சமதளப் பரப்பில் உள்ள ஒரு புள்ளியில் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " கோணத்தை ஏற்படுத்துகிறது. முதல் புள்ளிக்கு ‘",
        {
          "latex": "b",
          "fallback": "b",
          "display": false
        },
        "’ மீ உயரத்தில் உள்ள இரண்டாவது புள்ளியிலிருந்து மின்கம்பத்தின் அடிக்கு இறக்கக்கோணம் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " எனில் மின் கம்பத்தின் உயரமானது (மீட்டரில்)\n(அ) ",
        {
          "latex": "\\sqrt{3}\\,b",
          "fallback": "√3 b",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{b}{3}",
          "fallback": "b/3",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{b}{2}",
          "fallback": "b/2",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "\\dfrac{b}{\\sqrt{3}}",
          "fallback": "b/√3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: From the second point b m high, the 60° depression to the pole foot gives ground distance d = b / tan 60° = b/√3. Then the 30° elevation at the first point gives pole height h = d tan 30° = (b/√3)(1/√3) = b/3 — Option (B).",
        "eq": "d = b / √3, h = d tan 30°",
        "math": {
          "latex": "d = \\dfrac{b}{\\tan 60^\\circ} = \\dfrac{b}{\\sqrt{3}},\\qquad h = d\\tan 30^\\circ",
          "fallback": "d = b / √3, h = d tan 30°",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply (b/√3) by tan 30° = 1/√3 so √3 × √3 = 3 in the denominator.",
        "eq": "h = b/3 — Option (B)",
        "math": {
          "latex": "h = \\dfrac{b}{\\sqrt{3}}\\cdot\\dfrac{1}{\\sqrt{3}} = \\dfrac{b}{3}\\quad\\text{— Option (B)}",
          "fallback": "h = b/3 — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) b/3",
    "answerMath": {
      "latex": "(B)\\; \\dfrac{b}{3}",
      "fallback": "(B) b/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q11. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q12",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q12",
      "ta": "பயிற்சி 6.5 · வினா 12 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Reduction in shadow of 60 m tower as sun rises from 30° to 45°"
    },
    "q": {
      "en": "12. A tower is 60 m heigh. Its shadow reduces by x metres when the angle of elevation of the sun increases from 30° to 45° then x is equal to\n(A) 41.92 m   (B) 43.92 m   (C) 43 m   (D) 45.6 m",
      "ta": "12. ஒரு கோபுரத்தின் உயரம் 60 மீ ஆகும். சூரியனை காணும் ஏற்றக்கோணம் 30°-லிருந்து 45° ஆக உயரும்போது கோபுரத்தின் நிழலானது x மீ குறைகிறது எனில், x-ன் மதிப்பு\n(அ) 41.92 மீ   (ஆ) 43.92 மீ   (இ) 43 மீ   (ஈ) 45.6 மீ"
    },
    "questionMath": {
      "en": [
        "12. A tower is ",
        {
          "latex": "60\\text{ m}",
          "fallback": "60 m",
          "display": false
        },
        " heigh. Its shadow reduces by ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " metres when the angle of elevation of the sun increases from ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " to ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " then ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " is equal to\n(A) ",
        {
          "latex": "41.92\\text{ m}",
          "fallback": "41.92 m",
          "display": false
        },
        "   (B) ",
        {
          "latex": "43.92\\text{ m}",
          "fallback": "43.92 m",
          "display": false
        },
        "   (C) ",
        {
          "latex": "43\\text{ m}",
          "fallback": "43 m",
          "display": false
        },
        "   (D) ",
        {
          "latex": "45.6\\text{ m}",
          "fallback": "45.6 m",
          "display": false
        }
      ],
      "ta": [
        "12. ஒரு கோபுரத்தின் உயரம் ",
        {
          "latex": "60",
          "fallback": "60",
          "display": false
        },
        " மீ ஆகும். சூரியனை காணும் ஏற்றக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        "-லிருந்து ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " ஆக உயரும்போது கோபுரத்தின் நிழலானது ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " மீ குறைகிறது எனில், ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        "-ன் மதிப்பு\n(அ) ",
        {
          "latex": "41.92",
          "fallback": "41.92",
          "display": false
        },
        " மீ   (ஆ) ",
        {
          "latex": "43.92",
          "fallback": "43.92",
          "display": false
        },
        " மீ   (இ) ",
        {
          "latex": "43",
          "fallback": "43",
          "display": false
        },
        " மீ   (ஈ) ",
        {
          "latex": "45.6",
          "fallback": "45.6",
          "display": false
        },
        " மீ"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: At 30°, the shadow length is 60 / tan 30° = 60√3 m. At 45°, it shrinks to 60 / tan 45° = 60 m. Subtract to get x = 60(√3 − 1) = 43.92 m — Option (B).",
        "eq": "x = 60√3 − 60",
        "math": {
          "latex": "x = \\dfrac{60}{\\tan 30^\\circ} - \\dfrac{60}{\\tan 45^\\circ} = 60\\sqrt{3} - 60",
          "fallback": "x = 60√3 − 60",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Using √3 = 1.732, compute 60 × (1.732 − 1) = 60 × 0.732 = 43.92 m.",
        "eq": "x = 43.92 m — Option (B)",
        "math": {
          "latex": "x = 60(1.732 - 1) = 60(0.732) = 43.92\\text{ m}\\quad\\text{— Option (B)}",
          "fallback": "x = 43.92 m — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) 43.92 m",
    "answerMath": {
      "latex": "(B)\\; 43.92\\text{ m}",
      "fallback": "(B) 43.92 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q12. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      },
      "textbookTypoNote": "2025 English PDF p. 272 prints \"heigh\" instead of \"high\"; preserved verbatim in textbookPrompt.en."
    }
  },
  {
    "id": "c10-6-ex6-5-q13",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q13",
      "ta": "பயிற்சி 6.5 · வினா 13 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of multistoried building and spacing from 20 m building"
    },
    "q": {
      "en": "13. The angle of depression of the top and bottom of 20 m tall building from the top of a multistoried building are 30° and 60° respectively. The height of the multistoried building and the distance between two buildings (in metres) is\n(A) 20, 10√3   (B) 30, 5√3   (C) 20, 10   (D) 30, 10√3",
      "ta": "13. பல அடுக்குக் கட்டடத்தின் உச்சியிலிருந்து 20 மீ உயரமுள்ள கட்டடத்தின் உச்சி, அடி ஆகியவற்றின் இறக்கக்கோணங்கள் முறையே 30° மற்றும் 60° எனில் பல அடுக்குக் கட்டடத்தின் உயரம் மற்றும் இரு கட்டடங்களுக்கு இடையேயுள்ள தொலைவானது (மீட்டரில்)\n(அ) 20, 10√3   (ஆ) 30, 5√3   (இ) 20, 10   (ஈ) 30, 10√3"
    },
    "questionMath": {
      "en": [
        "13. The angle of depression of the top and bottom of ",
        {
          "latex": "20\\text{ m}",
          "fallback": "20 m",
          "display": false
        },
        " tall building from the top of a multistoried building are ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " and ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " respectively. The height of the multistoried building and the distance between two buildings (in metres) is\n(A) ",
        {
          "latex": "20,\\; 10\\sqrt{3}",
          "fallback": "20, 10√3",
          "display": false
        },
        "   (B) ",
        {
          "latex": "30,\\; 5\\sqrt{3}",
          "fallback": "30, 5√3",
          "display": false
        },
        "   (C) ",
        {
          "latex": "20,\\; 10",
          "fallback": "20, 10",
          "display": false
        },
        "   (D) ",
        {
          "latex": "30,\\; 10\\sqrt{3}",
          "fallback": "30, 10√3",
          "display": false
        }
      ],
      "ta": [
        "13. பல அடுக்குக் கட்டடத்தின் உச்சியிலிருந்து ",
        {
          "latex": "20",
          "fallback": "20",
          "display": false
        },
        " மீ உயரமுள்ள கட்டடத்தின் உச்சி, அடி ஆகியவற்றின் இறக்கக்கோணங்கள் முறையே ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " எனில் பல அடுக்குக் கட்டடத்தின் உயரம் மற்றும் இரு கட்டடங்களுக்கு இடையேயுள்ள தொலைவானது (மீட்டரில்)\n(அ) ",
        {
          "latex": "20,\\; 10\\sqrt{3}",
          "fallback": "20, 10√3",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "30,\\; 5\\sqrt{3}",
          "fallback": "30, 5√3",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "20,\\; 10",
          "fallback": "20, 10",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "30,\\; 10\\sqrt{3}",
          "fallback": "30, 10√3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let H be the tall building’s height and d the spacing between buildings. From 30° and 60° depressions, H − 20 = d/√3 and H = d√3. Subtracting gives 20 = 2d/√3, so d = 10√3 m and H = 30 m — Option (D).",
        "eq": "H − 20 = d / √3 and H = d√3",
        "math": {
          "latex": "\\begin{aligned} H - 20 &= d\\tan 30^\\circ = \\dfrac{d}{\\sqrt{3}} \\\\[4pt] H &= d\\tan 60^\\circ = d\\sqrt{3} \\end{aligned}",
          "fallback": "H − 20 = d / √3 and H = d√3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute H = d√3 into the first equation to eliminate H, solve d = 10√3, then compute H = (10√3)√3 = 30.",
        "eq": "d = 10√3 m, H = 30 m — Option (D)",
        "math": {
          "latex": "\\begin{aligned} d\\sqrt{3} - \\dfrac{d}{\\sqrt{3}} = 20 \\quad&\\text{gives}\\quad \\dfrac{2d}{\\sqrt{3}} = 20 \\text{gives}\\; d = 10\\sqrt{3}\\text{ m} \\\\[4pt] H &= (10\\sqrt{3})\\sqrt{3} = 30\\text{ m}\\quad\\text{— Option (D)} \\end{aligned}",
          "fallback": "d = 10√3 m, H = 30 m — Option (D)",
          "display": true
        }
      }
    ],
    "answer": "(D) 30, 10√3",
    "answerMath": {
      "latex": "(D)\\; 30,\\; 10\\sqrt{3}",
      "fallback": "(D) 30, 10√3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q13. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q14",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q14",
      "ta": "பயிற்சி 6.5 · வினா 14 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of shorter person from complementary midpoint elevations"
    },
    "q": {
      "en": "14. Two persons are standing ‘x’ metres apart from each other and the height of the first person is double that of the other. If from the middle point of the line joining their feet an observer finds the angular elevations of their tops to be complementary, then the height of the shorter person (in metres) is\n(A) √2 x   (B) x / (2√2)   (C) x / √2   (D) 2x",
      "ta": "14. இரண்டு நபர்களுக்கு இடைப்பட்ட தொலைவு x மீ ஆகும். முதல் நபரின் உயரமானது இரண்டாவது நபரின் உயரத்தைப் போல இரு மடங்காக உள்ளது. அவர்களுக்கு இடைப்பட்ட தொலைவு நேர்கோட்டின் மையப் புள்ளியிலிருந்து இரு நபர்களின் உச்சியின் ஏற்றக் கோணங்கள் நிரப்புக்கோணங்கள் எனில், குட்டையாக உள்ள நபரின் உயரம் (மீட்டரில்) காண்க.\n(அ) √2 x   (ஆ) x / (2√2)   (இ) x / √2   (ஈ) 2x"
    },
    "questionMath": {
      "en": [
        "14. Two persons are standing ‘",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        "’ metres apart from each other and the height of the first person is double that of the other. If from the middle point of the line joining their feet an observer finds the angular elevations of their tops to be complementary, then the height of the shorter person (in metres) is\n(A) ",
        {
          "latex": "\\sqrt{2}\\,x",
          "fallback": "√2 x",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{x}{2\\sqrt{2}}",
          "fallback": "x / (2√2)",
          "display": false
        },
        "   (C) ",
        {
          "latex": "\\dfrac{x}{\\sqrt{2}}",
          "fallback": "x / √2",
          "display": false
        },
        "   (D) ",
        {
          "latex": "2x",
          "fallback": "2x",
          "display": false
        }
      ],
      "ta": [
        "14. இரண்டு நபர்களுக்கு இடைப்பட்ட தொலைவு ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " மீ ஆகும். முதல் நபரின் உயரமானது இரண்டாவது நபரின் உயரத்தைப் போல இரு மடங்காக உள்ளது. அவர்களுக்கு இடைப்பட்ட தொலைவு நேர்கோட்டின் மையப் புள்ளியிலிருந்து இரு நபர்களின் உச்சியின் ஏற்றக் கோணங்கள் நிரப்புக்கோணங்கள் எனில், குட்டையாக உள்ள நபரின் உயரம் (மீட்டரில்) காண்க.\n(அ) ",
        {
          "latex": "\\sqrt{2}\\,x",
          "fallback": "√2 x",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{x}{2\\sqrt{2}}",
          "fallback": "x / (2√2)",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "\\dfrac{x}{\\sqrt{2}}",
          "fallback": "x / √2",
          "display": false
        },
        "   (ஈ) ",
        {
          "latex": "2x",
          "fallback": "2x",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: From the midpoint, each person is x/2 metres away. Let their heights be 2h and h. Because their elevation angles θ and 90° − θ are complementary, tan θ · tan(90° − θ) = 1, giving (4h/x)(2h/x) = 1 and h = x/(2√2) — Option (B).",
        "eq": "tan θ = 4h/x and cot θ = 2h/x",
        "math": {
          "latex": "\\tan\\theta = \\dfrac{2h}{x/2} = \\dfrac{4h}{x},\\qquad \\tan(90^\\circ - \\theta) = \\cot\\theta = \\dfrac{h}{x/2} = \\dfrac{2h}{x}",
          "fallback": "tan θ = 4h/x and cot θ = 2h/x",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply the two equations so tan θ · cot θ = 1 simplifies the left side, then take the positive square root of h² = x²/8.",
        "eq": "8h² = x² gives h = x / (2√2) — Option (B)",
        "math": {
          "latex": "\\dfrac{4h}{x}\\cdot\\dfrac{2h}{x} = 1 \\quad\\text{gives}\\quad 8h^2 = x^2 \\quad\\text{gives}\\quad h = \\dfrac{x}{2\\sqrt{2}}\\quad\\text{— Option (B)}",
          "fallback": "8h² = x² gives h = x / (2√2) — Option (B)",
          "display": true
        }
      }
    ],
    "answer": "(B) x / (2√2)",
    "answerMath": {
      "latex": "(B)\\; \\dfrac{x}{2\\sqrt{2}}",
      "fallback": "(B) x / (2√2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q14. EN printed p. 266 (PDF p. 272); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 272,
        "ta": 280
      }
    }
  },
  {
    "id": "c10-6-ex6-5-q15",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.5",
    "topic": {
      "en": "Heights and Distances (MCQ)",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Exercise 6.5 · Q15",
      "ta": "பயிற்சி 6.5 · வினா 15 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Cloud height above lake with elevation β and reflection depression 45°"
    },
    "q": {
      "en": "15. The angle of elevation of a cloud from a point h metres above a lake is β. The angle of depression of its reflection in the lake is 45°. The height of location of the cloud from the lake is\n(A) h(1 + tan β) / (1 − tan β)   (B) h(1 − tan β) / (1 + tan β)   (C) h tan(45° − β)   (D) none of these",
      "ta": "15. ஓர் ஏரியின் மேலே h மீ உயரத்தில் உள்ள ஒரு புள்ளியிலிருந்து மேகத்திற்கு உள்ள ஏற்றக்கோணம் β. மேக பிம்பத்தின் இறக்கக்கோணம் 45° எனில், ஏரியில் இருந்து மேகத்திற்கு உள்ள உயரமானது (மீட்டரில்)\n(அ) h(1 + tan β) / (1 − tan β)   (ஆ) h(1 − tan β) / (1 + tan β)   (இ) h tan(45° − β)   (ஈ) இவை ஒன்றும் இல்லை"
    },
    "questionMath": {
      "en": [
        "15. The angle of elevation of a cloud from a point ",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        " metres above a lake is ",
        {
          "latex": "\\beta",
          "fallback": "β",
          "display": false
        },
        ". The angle of depression of its reflection in the lake is ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        ". The height of location of the cloud from the lake is\n(A) ",
        {
          "latex": "\\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}",
          "fallback": "h(1 + tan β) / (1 − tan β)",
          "display": false
        },
        "   (B) ",
        {
          "latex": "\\dfrac{h(1 - \\tan\\beta)}{1 + \\tan\\beta}",
          "fallback": "h(1 − tan β) / (1 + tan β)",
          "display": false
        },
        "   (C) ",
        {
          "latex": "h\\tan(45^\\circ - \\beta)",
          "fallback": "h tan(45° − β)",
          "display": false
        },
        "   (D) none of these"
      ],
      "ta": [
        "15. ஓர் ஏரியின் மேலே ",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        " மீ உயரத்தில் உள்ள ஒரு புள்ளியிலிருந்து மேகத்திற்கு உள்ள ஏற்றக்கோணம் ",
        {
          "latex": "\\beta",
          "fallback": "β",
          "display": false
        },
        ". மேக பிம்பத்தின் இறக்கக்கோணம் ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " எனில், ஏரியில் இருந்து மேகத்திற்கு உள்ள உயரமானது (மீட்டரில்)\n(அ) ",
        {
          "latex": "\\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}",
          "fallback": "h(1 + tan β) / (1 − tan β)",
          "display": false
        },
        "   (ஆ) ",
        {
          "latex": "\\dfrac{h(1 - \\tan\\beta)}{1 + \\tan\\beta}",
          "fallback": "h(1 − tan β) / (1 + tan β)",
          "display": false
        },
        "   (இ) ",
        {
          "latex": "h\\tan(45^\\circ - \\beta)",
          "fallback": "h tan(45° − β)",
          "display": false
        },
        "   (ஈ) இவை ஒன்றும் இல்லை"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Apply the lake-cloud height formula h(tan θ₁ + tan θ₂)/(tan θ₂ − tan θ₁) with θ₁ = β and θ₂ = 45°. Since tan 45° = 1, the cloud height is h(1 + tan β)/(1 − tan β) — Option (A).",
        "eq": "H = h(tan β + tan 45°) / (tan 45° − tan β)",
        "math": {
          "latex": "H = \\dfrac{h(\\tan\\beta + \\tan 45^\\circ)}{\\tan 45^\\circ - \\tan\\beta}",
          "fallback": "H = h(tan β + tan 45°) / (tan 45° − tan β)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Or derive directly: if cloud height above lake is H, tan 45° = 1 = (H + h)/d gives d = H + h, and tan β = (H − h)/(H + h) rearranges to H = h(1 + tan β)/(1 − tan β).",
        "eq": "H = h(1 + tan β) / (1 − tan β) — Option (A)",
        "math": {
          "latex": "\\tan\\beta = \\dfrac{H - h}{H + h} \\quad\\text{gives}\\quad H = \\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}\\quad\\text{— Option (A)}",
          "fallback": "H = h(1 + tan β) / (1 − tan β) — Option (A)",
          "display": true
        }
      }
    ],
    "answer": "(A) h(1 + tan β) / (1 − tan β)",
    "answerMath": {
      "latex": "(A)\\; \\dfrac{h(1 + \\tan\\beta)}{1 - \\tan\\beta}",
      "fallback": "(A) h(1 + tan β) / (1 − tan β)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.5 Q15. EN printed p. 267 (PDF p. 273); TA printed p. 274 (PDF p. 280); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 280
      }
    }
  }
];
if (typeof window !== 'undefined' && window.TRIGGLE_CLASSES?.[10]?.items) {
  window.TRIGGLE_CLASSES[10].items.push(...entries);
}
if (typeof window !== 'undefined' && window.TRIGGLE_CURRICULUM?.grades) {
  const g = window.TRIGGLE_CURRICULUM.grades.find(x => x.grade === 10);
  const c = g?.chapters.find(ch => Number(ch.number) === 6);
  if (c) {
    c.textbookQuestionIds = c.textbookQuestionIds || [];
    for (const e of entries) {
      if (!c.textbookQuestionIds.includes(e.id)) c.textbookQuestionIds.push(e.id);
    }
  }
}
})();
