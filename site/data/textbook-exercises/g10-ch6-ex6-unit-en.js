/* 2025 revised TN SCERT Grade 10 Trigonometry, Unit Exercise 6 (Q1–Q9, 13 subpart tasks).
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-unit-q1-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Trigonometric Identities",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q1(i)",
      "ta": "அலகு பயிற்சி 6 · வினா 1(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Proving cot²A(sec A − 1)/(1 + sin A) + sec²A(sin A − 1)/(1 + sec A) = 0"
    },
    "q": {
      "en": "1. Prove that (i) cot² A ((sec A − 1) / (1 + sin A)) + sec² A ((sin A − 1) / (1 + sec A)) = 0",
      "ta": "1. நிரூபிக்கவும் (i) cot² A ((sec A − 1) / (1 + sin A)) + sec² A ((sin A − 1) / (1 + sec A)) = 0"
    },
    "questionMath": {
      "en": [
        "1. Prove that (i) ",
        {
          "latex": "\\cot^2 A\\left(\\dfrac{\\sec A - 1}{1 + \\sin A}\\right) + \\sec^2 A\\left(\\dfrac{\\sin A - 1}{1 + \\sec A}\\right) = 0",
          "fallback": "cot² A ((sec A − 1) / (1 + sin A)) + sec² A ((sin A − 1) / (1 + sec A)) = 0",
          "display": false
        }
      ],
      "ta": [
        "1. நிரூபிக்கவும் (i) ",
        {
          "latex": "\\cot^2 A\\left(\\dfrac{\\sec A - 1}{1 + \\sin A}\\right) + \\sec^2 A\\left(\\dfrac{\\sin A - 1}{1 + \\sec A}\\right) = 0",
          "fallback": "cot² A ((sec A − 1) / (1 + sin A)) + sec² A ((sin A − 1) / (1 + sec A)) = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Bring both terms over the common denominator (1 + sin A)(1 + sec A). Notice that (sec A − 1)(sec A + 1) = sec²A − 1 = tan²A, and (sin A − 1)(sin A + 1) = sin²A − 1 = −cos²A. Then cot²A tan²A − sec²A cos²A = 1 − 1 = 0.",
        "eq": "LHS = [cot² A(sec² A − 1) + sec² A(sin² A − 1)] / [(1 + sin A)(1 + sec A)]",
        "math": {
          "latex": "\\text{LHS} = \\dfrac{\\cot^2 A(\\sec^2 A - 1) + \\sec^2 A(\\sin^2 A - 1)}{(1 + \\sin A)(1 + \\sec A)}",
          "fallback": "LHS = [cot² A(sec² A − 1) + sec² A(sin² A − 1)] / [(1 + sin A)(1 + sec A)]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Apply sec²A − 1 = tan²A and sin²A − 1 = −cos²A, then use reciprocal pairs cot²A · tan²A = 1 and sec²A · cos²A = 1.",
        "eq": "LHS = (1 − 1) / [(1 + sin A)(1 + sec A)] = 0",
        "math": {
          "latex": "\\text{LHS} = \\dfrac{\\cot^2 A\\tan^2 A - \\sec^2 A\\cos^2 A}{(1 + \\sin A)(1 + \\sec A)} = \\dfrac{1 - 1}{(1 + \\sin A)(1 + \\sec A)} = 0 = \\text{RHS}",
          "fallback": "LHS = (1 − 1) / [(1 + sin A)(1 + sec A)] = 0",
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
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q1(i). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q1-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Trigonometric Identities",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q1(ii)",
      "ta": "அலகு பயிற்சி 6 · வினா 1(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Proving (tan²θ − 1)/(tan²θ + 1) = 1 − 2cos²θ"
    },
    "q": {
      "en": "1. Prove that (ii) (tan² θ − 1) / (tan² θ + 1) = 1 − 2 cos² θ",
      "ta": "1. நிரூபிக்கவும் (ii) (tan² θ − 1) / (tan² θ + 1) = 1 − 2 cos² θ"
    },
    "questionMath": {
      "en": [
        "1. Prove that (ii) ",
        {
          "latex": "\\dfrac{\\tan^2\\theta - 1}{\\tan^2\\theta + 1} = 1 - 2\\cos^2\\theta",
          "fallback": "(tan² θ − 1) / (tan² θ + 1) = 1 − 2 cos² θ",
          "display": false
        }
      ],
      "ta": [
        "1. நிரூபிக்கவும் (ii) ",
        {
          "latex": "\\dfrac{\\tan^2\\theta - 1}{\\tan^2\\theta + 1} = 1 - 2\\cos^2\\theta",
          "fallback": "(tan² θ − 1) / (tan² θ + 1) = 1 − 2 cos² θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Write tan²θ as sin²θ/cos²θ (or replace tan²θ + 1 with sec²θ = 1/cos²θ) to simplify the LHS to sin²θ − cos²θ, then replace sin²θ with 1 − cos²θ.",
        "eq": "LHS = (sin² θ / cos² θ − 1) / (1 / cos² θ)",
        "math": {
          "latex": "\\text{LHS} = \\dfrac{\\dfrac{\\sin^2\\theta}{\\cos^2\\theta} - 1}{\\dfrac{1}{\\cos^2\\theta}}",
          "fallback": "LHS = (sin² θ / cos² θ − 1) / (1 / cos² θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply numerator and denominator by cos²θ to clear inner fractions, leaving sin²θ − cos²θ. Since sin²θ = 1 − cos²θ, this becomes (1 − cos²θ) − cos²θ = 1 − 2 cos²θ.",
        "eq": "LHS = sin² θ − cos² θ = 1 − 2 cos² θ",
        "math": {
          "latex": "\\text{LHS} = \\sin^2\\theta - \\cos^2\\theta = (1 - \\cos^2\\theta) - \\cos^2\\theta = 1 - 2\\cos^2\\theta = \\text{RHS}",
          "fallback": "LHS = sin² θ − cos² θ = 1 − 2 cos² θ",
          "display": true
        }
      }
    ],
    "answer": "1 − 2 cos² θ",
    "answerMath": {
      "latex": "1 - 2\\cos^2\\theta",
      "fallback": "1 − 2 cos² θ",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q1(ii). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q2",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Trigonometric Identities",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q2",
      "ta": "அலகு பயிற்சி 6 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Proving ((1 + sin θ − cos θ)/(1 + sin θ + cos θ))² = (1 − cos θ)/(1 + cos θ)"
    },
    "q": {
      "en": "2. Prove that ((1 + sin θ − cos θ) / (1 + sin θ + cos θ))² = (1 − cos θ) / (1 + cos θ)",
      "ta": "2. ((1 + sin θ − cos θ) / (1 + sin θ + cos θ))² = (1 − cos θ) / (1 + cos θ) என்பதை நிரூபிக்கவும்"
    },
    "questionMath": {
      "en": [
        "2. Prove that ",
        {
          "latex": "\\left(\\dfrac{1 + \\sin\\theta - \\cos\\theta}{1 + \\sin\\theta + \\cos\\theta}\\right)^2 = \\dfrac{1 - \\cos\\theta}{1 + \\cos\\theta}",
          "fallback": "((1 + sin θ − cos θ) / (1 + sin θ + cos θ))² = (1 − cos θ) / (1 + cos θ)",
          "display": false
        }
      ],
      "ta": [
        "2. ",
        {
          "latex": "\\left(\\dfrac{1 + \\sin\\theta - \\cos\\theta}{1 + \\sin\\theta + \\cos\\theta}\\right)^2 = \\dfrac{1 - \\cos\\theta}{1 + \\cos\\theta}",
          "fallback": "((1 + sin θ − cos θ) / (1 + sin θ + cos θ))² = (1 − cos θ) / (1 + cos θ)",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Group A = 1 + sin θ so the numerator becomes (A − cos θ)². Expanding and replacing sin²θ + cos²θ = 1 factors the numerator as 2(1 + sin θ)(1 − cos θ).",
        "eq": "(1 + sin θ − cos θ)² = 2(1 + sin θ)(1 − cos θ)",
        "math": {
          "latex": "\\begin{aligned} &\\text{Numerator } (1 + \\sin\\theta - \\cos\\theta)^2 \\\\[4pt] &= (1 + \\sin\\theta)^2 - 2\\cos\\theta(1 + \\sin\\theta) \\\\[2pt] &\\quad + \\cos^2\\theta \\\\[4pt] &= 1 + 2\\sin\\theta + (\\sin^2\\theta + \\cos^2\\theta) \\\\[2pt] &\\quad - 2\\cos\\theta(1 + \\sin\\theta) \\\\[4pt] &= 2(1 + \\sin\\theta) - 2\\cos\\theta(1 + \\sin\\theta) \\\\[4pt] &= 2(1 + \\sin\\theta)(1 - \\cos\\theta) \\end{aligned}",
          "fallback": "(1 + sin θ − cos θ)² = 2(1 + sin θ)(1 − cos θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Apply the same expansion to the denominator (1 + sin θ + cos θ)², grouping sin²θ + cos²θ = 1 and factoring out 2(1 + sin θ) to obtain 2(1 + sin θ)(1 + cos θ).",
        "eq": "(1 + sin θ + cos θ)² = 2(1 + sin θ)(1 + cos θ)",
        "math": {
          "latex": "\\begin{aligned} &\\text{Denominator } (1 + \\sin\\theta + \\cos\\theta)^2 \\\\[4pt] &= (1 + \\sin\\theta)^2 + 2\\cos\\theta(1 + \\sin\\theta) \\\\[2pt] &\\quad + \\cos^2\\theta \\\\[4pt] &= 2(1 + \\sin\\theta) + 2\\cos\\theta(1 + \\sin\\theta) \\\\[4pt] &= 2(1 + \\sin\\theta)(1 + \\cos\\theta) \\end{aligned}",
          "fallback": "(1 + sin θ + cos θ)² = 2(1 + sin θ)(1 + cos θ)",
          "display": true
        }
      },
      {
        "en": "Divide the factored numerator by the factored denominator: the common factor 2(1 + sin θ) cancels directly, leaving (1 − cos θ) / (1 + cos θ).",
        "eq": "LHS = (1 − cos θ) / (1 + cos θ)",
        "math": {
          "latex": "\\begin{aligned} \\text{LHS} &= \\dfrac{2(1 + \\sin\\theta)(1 - \\cos\\theta)}{2(1 + \\sin\\theta)(1 + \\cos\\theta)} \\\\[6pt] &= \\dfrac{1 - \\cos\\theta}{1 + \\cos\\theta} = \\text{RHS} \\end{aligned}",
          "fallback": "LHS = (1 − cos θ) / (1 + cos θ)",
          "display": true
        }
      }
    ],
    "answer": "(1 − cos θ) / (1 + cos θ)",
    "answerMath": {
      "latex": "\\dfrac{1 - \\cos\\theta}{1 + \\cos\\theta}",
      "fallback": "(1 − cos θ) / (1 + cos θ)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q2. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q3",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Trigonometric Proofs",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q3",
      "ta": "அலகு பயிற்சி 6 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Proving x² + y² = 1 given x sin³θ + y cos³θ = sin θ cos θ and x sin θ = y cos θ"
    },
    "q": {
      "en": "3. If x sin³ θ + y cos³ θ = sin θ cos θ and x sin θ = y cos θ, then prove that x² + y² = 1.",
      "ta": "3. x sin³ θ + y cos³ θ = sin θ cos θ மற்றும் x sin θ = y cos θ எனில் x² + y² = 1 என நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "3. If ",
        {
          "latex": "x\\sin^3\\theta + y\\cos^3\\theta = \\sin\\theta\\cos\\theta",
          "fallback": "x sin³ θ + y cos³ θ = sin θ cos θ",
          "display": false
        },
        " and ",
        {
          "latex": "x\\sin\\theta = y\\cos\\theta",
          "fallback": "x sin θ = y cos θ",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "x^2 + y^2 = 1",
          "fallback": "x² + y² = 1",
          "display": false
        },
        "."
      ],
      "ta": [
        "3. ",
        {
          "latex": "x\\sin^3\\theta + y\\cos^3\\theta = \\sin\\theta\\cos\\theta",
          "fallback": "x sin³ θ + y cos³ θ = sin θ cos θ",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "x\\sin\\theta = y\\cos\\theta",
          "fallback": "x sin θ = y cos θ",
          "display": false
        },
        " எனில் ",
        {
          "latex": "x^2 + y^2 = 1",
          "fallback": "x² + y² = 1",
          "display": false
        },
        " என நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Split y cos³θ as (y cos θ)cos²θ and substitute y cos θ = x sin θ. Factoring out x sin θ lets sin²θ + cos²θ = 1 collapse the equation to x = cos θ, and then y = sin θ, so x² + y² = 1.",
        "eq": "x sin³ θ + (x sin θ) cos² θ = sin θ cos θ",
        "math": {
          "latex": "x\\sin^3\\theta + (x\\sin\\theta)\\cos^2\\theta = \\sin\\theta\\cos\\theta",
          "fallback": "x sin³ θ + (x sin θ) cos² θ = sin θ cos θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Factor out x sin θ on the left side, cancel sin θ on both sides to find x = cos θ, plug back into x sin θ = y cos θ to find y = sin θ, and compute x² + y².",
        "eq": "x = cos θ, y = sin θ gives x² + y² = 1",
        "math": {
          "latex": "\\begin{aligned} x\\sin\\theta(\\sin^2\\theta + \\cos^2\\theta) &= \\sin\\theta\\cos\\theta \\quad\\text{gives}\\quad x = \\cos\\theta \\\\[4pt] (\\cos\\theta)\\sin\\theta = y\\cos\\theta \\quad&\\text{gives}\\quad y = \\sin\\theta \\\\[4pt] x^2 + y^2 &= \\cos^2\\theta + \\sin^2\\theta = 1 \\end{aligned}",
          "fallback": "x = cos θ, y = sin θ gives x² + y² = 1",
          "display": true
        }
      }
    ],
    "answer": "x² + y² = 1",
    "answerMath": {
      "latex": "x^2 + y^2 = 1",
      "fallback": "x² + y² = 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q3. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q4",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Trigonometric Elimination",
      "ta": "முக்கோணவியல் முற்றொருமைகள்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q4",
      "ta": "அலகு பயிற்சி 6 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Proving a sin θ + b cos θ = ±√(a² + b² − c²) from a cos θ − b sin θ = c"
    },
    "q": {
      "en": "4. If a cos θ − b sin θ = c, then prove that (a sin θ + b cos θ) = ±√(a² + b² − c²).",
      "ta": "4. a cos θ − b sin θ = c எனில் (a sin θ + b cos θ) = ±√(a² + b² − c²) என நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "4. If ",
        {
          "latex": "a\\cos\\theta - b\\sin\\theta = c",
          "fallback": "a cos θ − b sin θ = c",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "(a\\sin\\theta + b\\cos\\theta) = \\pm\\sqrt{a^2 + b^2 - c^2}",
          "fallback": "(a sin θ + b cos θ) = ±√(a² + b² − c²)",
          "display": false
        },
        "."
      ],
      "ta": [
        "4. ",
        {
          "latex": "a\\cos\\theta - b\\sin\\theta = c",
          "fallback": "a cos θ − b sin θ = c",
          "display": false
        },
        " எனில் ",
        {
          "latex": "(a\\sin\\theta + b\\cos\\theta) = \\pm\\sqrt{a^2 + b^2 - c^2}",
          "fallback": "(a sin θ + b cos θ) = ±√(a² + b² − c²)",
          "display": false
        },
        " என நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Square the known expression (a cos θ − b sin θ) = c and add the square of the target expression (a sin θ + b cos θ). The −2ab sin θ cos θ and +2ab sin θ cos θ terms cancel out, leaving a² + b².",
        "eq": "(a cos θ − b sin θ)² + (a sin θ + b cos θ)² = c² + (a sin θ + b cos θ)²",
        "math": {
          "latex": "(a\\cos\\theta - b\\sin\\theta)^2 + (a\\sin\\theta + b\\cos\\theta)^2 = c^2 + (a\\sin\\theta + b\\cos\\theta)^2",
          "fallback": "(a cos θ − b sin θ)² + (a sin θ + b cos θ)² = c² + (a sin θ + b cos θ)²",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Expand both squares on the left side, group the a² and b² terms with sin²θ + cos²θ = 1, and take square roots on both sides (including ±).",
        "eq": "a sin θ + b cos θ = ±√(a² + b² − c²)",
        "math": {
          "latex": "\\begin{aligned} a^2(\\cos^2\\theta + \\sin^2\\theta) + b^2(\\sin^2\\theta + \\cos^2\\theta) &= c^2 + (a\\sin\\theta + b\\cos\\theta)^2 \\\\[4pt] (a\\sin\\theta + b\\cos\\theta)^2 &= a^2 + b^2 - c^2 \\\\[4pt] a\\sin\\theta + b\\cos\\theta &= \\pm\\sqrt{a^2 + b^2 - c^2} \\end{aligned}",
          "fallback": "a sin θ + b cos θ = ±√(a² + b² − c²)",
          "display": true
        }
      }
    ],
    "answer": "±√(a² + b² − c²)",
    "answerMath": {
      "latex": "\\pm\\sqrt{a^2 + b^2 - c^2}",
      "fallback": "±√(a² + b² − c²)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q4. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q5",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Heights and Distances",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q5",
      "ta": "அலகு பயிற்சி 6 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Speed of bird flying horizontally from an 80 m high tree"
    },
    "q": {
      "en": "5. A bird is sitting on the top of a 80 m high tree. From a point on the ground, the angle of elevation of the bird is 45°. The bird flies away horizontally in such away that it remained at a constant height from the ground. After 2 seconds, the angle of elevation of the bird from the same point is 30°. Determine the speed at which the bird flies. (√3 = 1.732)",
      "ta": "5. 80 மீ உயரமுள்ள மரத்தின் உச்சியில் ஒரு பறவை இருக்கிறது. தரையில் உள்ள ஒரு புள்ளியிலிருந்து பறவையின் ஏற்றக்கோணம் 45°. பறவை ஒரே உயரத்தில் கிடைமட்டத்தில் பறந்து செல்கிறது. 2 வினாடிகள் கழித்து அதே புள்ளியிலிருந்து பறவையின் ஏற்றக்கோணம் 30° எனில், பறவை பறக்கும் வேகத்தினைக் காண்க. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "5. A bird is sitting on the top of a ",
        {
          "latex": "80\\text{ m}",
          "fallback": "80 m",
          "display": false
        },
        " high tree. From a point on the ground, the angle of elevation of the bird is ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        ". The bird flies away horizontally in such away that it remained at a constant height from the ground. After ",
        {
          "latex": "2",
          "fallback": "2",
          "display": false
        },
        " seconds, the angle of elevation of the bird from the same point is ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Determine the speed at which the bird flies. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "5. ",
        {
          "latex": "80",
          "fallback": "80",
          "display": false
        },
        " மீ உயரமுள்ள மரத்தின் உச்சியில் ஒரு பறவை இருக்கிறது. தரையில் உள்ள ஒரு புள்ளியிலிருந்து பறவையின் ஏற்றக்கோணம் ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        ". பறவை ஒரே உயரத்தில் கிடைமட்டத்தில் பறந்து செல்கிறது. ",
        {
          "latex": "2",
          "fallback": "2",
          "display": false
        },
        " வினாடிகள் கழித்து அதே புள்ளியிலிருந்து பறவையின் ஏற்றக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில், பறவை பறக்கும் வேகத்தினைக் காண்க. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find the bird’s first horizontal distance d₁ = 80/tan 45° = 80 m and second distance d₂ = 80/tan 30° = 80√3 m. Subtract to get distance flown in 2 s, then divide by 2.",
        "eq": "d1 = 80 m, d2 = 80√3 m",
        "math": {
          "latex": "d_1 = \\dfrac{80}{\\tan 45^\\circ} = 80\\text{ m},\\qquad d_2 = \\dfrac{80}{\\tan 30^\\circ} = 80\\sqrt{3}\\text{ m}",
          "fallback": "d1 = 80 m, d2 = 80√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Distance flown = 80(√3 − 1) = 80(0.732) = 58.56 m. Dividing 58.56 m by 2 seconds gives speed = 29.28 m/s.",
        "eq": "Speed = 29.28 m/s",
        "math": {
          "latex": "\\text{Speed} = \\dfrac{80(\\sqrt{3} - 1)}{2} = 40(1.732 - 1) = 40(0.732) = 29.28\\text{ m/s}",
          "fallback": "Speed = 29.28 m/s",
          "display": true
        }
      }
    ],
    "answer": "29.28 m/s",
    "answerMath": {
      "latex": "29.28\\text{ m/s}",
      "fallback": "29.28 m/s",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q5.svg",
    "figureAlt": { "en": "80 m tall tree with bird flying horizontally away; elevation drops from 45 degrees to 30 degrees after 2 seconds.", "ta": "80 மீ மர உச்சியிலிருந்து பறவை பறக்கும் போது 45°-லிருந்து 30° ஆக மாறும் ஏற்றக்கோணப் படம்." },
    "figureCaption": { "en": "Flying bird diagram for Unit Exercise 6 Q5", "ta": "பறக்கும் பறவை — 45°, 30° ஏற்றக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q5. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q6",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Heights and Distances",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q6",
      "ta": "அலகு பயிற்சி 6 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Time for aeroplane elevation at 600 m to change from 37° to 53°"
    },
    "q": {
      "en": "6. An aeroplane is flying parallel to the Earth’s surface at a speed of 175 m/sec and at a height of 600 m. The angle of elevation of the aeroplane from a point on the Earth’s surface is 37°. After what period of time does the angle of elevation increase to 53°? (tan 53° = 1.3270, tan 37° = 0.7536)",
      "ta": "6. விமானம் ஒன்று புவிப் பரப்பிற்கு இணையாக 600 மீ உயரத்தில் 175 மீ/வி வேகத்தில் செல்கிறது. புவியின் மீது ஒரு புள்ளியிலிருந்து விமானத்திற்கு உள்ள ஏற்றக்கோணம் 37° ஆகும். அதே புள்ளியிலிருந்து ஏற்றக்கோணம் 53°-க்கு அதிகரிக்க எவ்வளவு நேரம் தேவைப்படும்? (tan 53° = 1.3270, tan 37° = 0.7536)"
    },
    "questionMath": {
      "en": [
        "6. An aeroplane is flying parallel to the Earth’s surface at a speed of ",
        {
          "latex": "175\\text{ m/sec}",
          "fallback": "175 m/sec",
          "display": false
        },
        " and at a height of ",
        {
          "latex": "600\\text{ m}",
          "fallback": "600 m",
          "display": false
        },
        ". The angle of elevation of the aeroplane from a point on the Earth’s surface is ",
        {
          "latex": "37^\\circ",
          "fallback": "37°",
          "display": false
        },
        ". After what period of time does the angle of elevation increase to ",
        {
          "latex": "53^\\circ",
          "fallback": "53°",
          "display": false
        },
        "? (",
        {
          "latex": "\\tan 53^\\circ = 1.3270,\\; \\tan 37^\\circ = 0.7536",
          "fallback": "tan 53° = 1.3270, tan 37° = 0.7536",
          "display": false
        },
        ")"
      ],
      "ta": [
        "6. விமானம் ஒன்று புவிப் பரப்பிற்கு இணையாக ",
        {
          "latex": "600",
          "fallback": "600",
          "display": false
        },
        " மீ உயரத்தில் ",
        {
          "latex": "175",
          "fallback": "175",
          "display": false
        },
        " மீ/வி வேகத்தில் செல்கிறது. புவியின் மீது ஒரு புள்ளியிலிருந்து விமானத்திற்கு உள்ள ஏற்றக்கோணம் ",
        {
          "latex": "37^\\circ",
          "fallback": "37°",
          "display": false
        },
        " ஆகும். அதே புள்ளியிலிருந்து ஏற்றக்கோணம் ",
        {
          "latex": "53^\\circ",
          "fallback": "53°",
          "display": false
        },
        "-க்கு அதிகரிக்க எவ்வளவு நேரம் தேவைப்படும்? (",
        {
          "latex": "\\tan 53^\\circ = 1.3270,\\; \\tan 37^\\circ = 0.7536",
          "fallback": "tan 53° = 1.3270, tan 37° = 0.7536",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: As elevation increases from 37° to 53°, the plane flies closer to the observer at constant 600 m height. Find both horizontal distances d₁ = 600/tan 37° and d₂ = 600/tan 53°, subtract, and divide by 175 m/s.",
        "eq": "d1 ≈ 796.18 m, d2 ≈ 452.15 m",
        "math": {
          "latex": "d_1 = \\dfrac{600}{0.7536} \\approx 796.18\\text{ m},\\qquad d_2 = \\dfrac{600}{1.3270} \\approx 452.15\\text{ m}",
          "fallback": "d1 ≈ 796.18 m, d2 ≈ 452.15 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Subtract d₁ − d₂ = 796.18 − 452.15 = 344.03 m travelled in time t, then divide by speed 175 m/s to get 1.966 ≈ 1.97 seconds.",
        "eq": "Time = 344.03 / 175 ≈ 1.97 seconds (approx)",
        "math": {
          "latex": "\\text{Time} = \\dfrac{796.18 - 452.15}{175} = \\dfrac{344.03}{175} \\approx 1.97\\text{ seconds (approx)}",
          "fallback": "Time = 344.03 / 175 ≈ 1.97 seconds (approx)",
          "display": true
        }
      }
    ],
    "answer": "1.97 seconds (approx)",
    "answerMath": {
      "latex": "1.97\\text{ seconds (approx)}",
      "fallback": "1.97 seconds (approx)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q6.svg",
    "figureAlt": { "en": "Aeroplane flying at 600 m altitude approaches ground observer as elevation increases from 37 degrees to 53 degrees.", "ta": "600 மீ உயரத்தில் பறக்கும் விமானத்தின் ஏற்றக்கோண மாற்றப் படம்." },
    "figureCaption": { "en": "Aeroplane angle change diagram for Unit Exercise 6 Q6", "ta": "விமானத்தின் கோண மாற்றம் — 53°, 37° படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q6. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      },
      "textbookTypoNote": "2025 Tamil PDF p. 281 Q6 renders a font-encoding glitch \"37ϒ\" for 37°; transcribed cleanly as 37°."
    }
  },
  {
    "id": "c10-6-unit-q7-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Bearings and Distances",
      "ta": "திசைக் கோணங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q7(i)",
      "ta": "அலகு பயிற்சி 6 · வினா 7(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance B lies North of A after flying 30 km at 35° West of North"
    },
    "q": {
      "en": "7. A bird is flying from A towards B at an angle of 35°, a point 30 km away from A. At B it changes its course of flight and heads towards C on a bearing of 48° and distance 32 km away.\n(i) How far is B to the North of A?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)",
      "ta": "7. ஒரு பறவை A என்ற இடத்திலிருந்து 30 கி.மீ தொலைவில் B என்ற இடத்திற்கு 35° கோணத்தில் பறக்கிறது. B-ல் 48° கோணத்திலிருந்து விலகி 32 கி.மீ தொலைவில் உள்ள C என்ற இடத்திற்குச் செல்கிறது,\n(i) A -ன் வடக்குப் புறமாக B-ன் தொலைவு எவ்வளவு?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)"
    },
    "questionMath": {
      "en": [
        "7. A bird is flying from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " towards ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " at an angle of ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        ", a point ",
        {
          "latex": "30\\text{ km}",
          "fallback": "30 km",
          "display": false
        },
        " away from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ". At ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " it changes its course of flight and heads towards ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " on a bearing of ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " and distance ",
        {
          "latex": "32\\text{ km}",
          "fallback": "32 km",
          "display": false
        },
        " away.\n(i) How far is ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " to the North of ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ],
      "ta": [
        "7. ஒரு பறவை ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " என்ற இடத்திலிருந்து ",
        {
          "latex": "30",
          "fallback": "30",
          "display": false
        },
        " கி.மீ தொலைவில் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " என்ற இடத்திற்கு ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        " கோணத்தில் பறக்கிறது. ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ல் ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " கோணத்திலிருந்து விலகி ",
        {
          "latex": "32",
          "fallback": "32",
          "display": false
        },
        " கி.மீ தொலைவில் உள்ள ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற இடத்திற்குச் செல்கிறது,\n(i) ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " -ன் வடக்குப் புறமாக ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ன் தொலைவு எவ்வளவு?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Flying 35° West of North puts path AB at 90° − 35° = 55° above the West horizontal line. Thus the northward component is Opposite = 30 sin 55° = 30 × 0.8192 = 24.58 km (approx).",
        "eq": "North distance = 30 sin 55° = 30 × 0.8192",
        "math": {
          "latex": "\\text{North distance} = 30\\sin 55^\\circ = 30 \\times 0.8192",
          "fallback": "North distance = 30 sin 55° = 30 × 0.8192",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply 30 × 0.8192 = 24.576 km and round to two decimal places: 24.58 km (approx).",
        "eq": "30 × 0.8192 ≈ 24.58 km (approx)",
        "math": {
          "latex": "30 \\times 0.8192 = 24.576 \\approx 24.58\\text{ km (approx)}",
          "fallback": "30 × 0.8192 ≈ 24.58 km (approx)",
          "display": true
        }
      }
    ],
    "answer": "24.58 km (approx)",
    "answerMath": {
      "latex": "24.58\\text{ km (approx)}",
      "fallback": "24.58 km (approx)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q7.svg",
    "figureAlt": { "en": "Bird flies 30 km from A to B at 35 degrees West of North (55 degrees from W), then 32 km from B to C on bearing 48 degrees (42 degrees from E).", "ta": "30 கி.மீ மற்றும் 32 கி.மீ தூரங்களில் கப்பல் செல்லும் திசைக்கோண முக்கோணப் படம்." },
    "figureCaption": { "en": "Two-leg flight bearing diagram for Unit Exercise 6 Q7", "ta": "கப்பலின் திசைக்கோணமும் பயணப் படமும்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q7(i). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q7-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Bearings and Distances",
      "ta": "திசைக் கோணங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q7(ii)",
      "ta": "அலகு பயிற்சி 6 · வினா 7(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance B lies West of A after flying 30 km at 35° West of North"
    },
    "q": {
      "en": "7. A bird is flying from A towards B at an angle of 35°, a point 30 km away from A. At B it changes its course of flight and heads towards C on a bearing of 48° and distance 32 km away.\n(ii) How far is B to the West of A?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)",
      "ta": "7. ஒரு பறவை A என்ற இடத்திலிருந்து 30 கி.மீ தொலைவில் B என்ற இடத்திற்கு 35° கோணத்தில் பறக்கிறது. B-ல் 48° கோணத்திலிருந்து விலகி 32 கி.மீ தொலைவில் உள்ள C என்ற இடத்திற்குச் செல்கிறது,\n(ii) A -ன் மேற்குப் புறமாக B-ன் தொலைவு எவ்வளவு?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)"
    },
    "questionMath": {
      "en": [
        "7. A bird is flying from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " towards ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " at an angle of ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        ", a point ",
        {
          "latex": "30\\text{ km}",
          "fallback": "30 km",
          "display": false
        },
        " away from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ". At ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " it changes its course of flight and heads towards ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " on a bearing of ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " and distance ",
        {
          "latex": "32\\text{ km}",
          "fallback": "32 km",
          "display": false
        },
        " away.\n(ii) How far is ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " to the West of ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ],
      "ta": [
        "7. ஒரு பறவை ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " என்ற இடத்திலிருந்து ",
        {
          "latex": "30",
          "fallback": "30",
          "display": false
        },
        " கி.மீ தொலைவில் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " என்ற இடத்திற்கு ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        " கோணத்தில் பறக்கிறது. ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ல் ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " கோணத்திலிருந்து விலகி ",
        {
          "latex": "32",
          "fallback": "32",
          "display": false
        },
        " கி.மீ தொலைவில் உள்ள ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற இடத்திற்குச் செல்கிறது,\n(ii) ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " -ன் மேற்குப் புறமாக ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ன் தொலைவு எவ்வளவு?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Along the West horizontal axis at angle 55°, the adjacent leg gives the westward distance: 30 cos 55° = 30 × 0.5736 = 17.21 km (approx).",
        "eq": "West distance = 30 cos 55° = 30 × 0.5736",
        "math": {
          "latex": "\\text{West distance} = 30\\cos 55^\\circ = 30 \\times 0.5736",
          "fallback": "West distance = 30 cos 55° = 30 × 0.5736",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply 30 × 0.5736 = 17.208 km and round to two decimal places: 17.21 km (approx).",
        "eq": "30 × 0.5736 ≈ 17.21 km (approx)",
        "math": {
          "latex": "30 \\times 0.5736 = 17.208 \\approx 17.21\\text{ km (approx)}",
          "fallback": "30 × 0.5736 ≈ 17.21 km (approx)",
          "display": true
        }
      }
    ],
    "answer": "17.21 km (approx)",
    "answerMath": {
      "latex": "17.21\\text{ km (approx)}",
      "fallback": "17.21 km (approx)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q7.svg",
    "figureAlt": { "en": "Bird flies 30 km from A to B at 35 degrees West of North (55 degrees from W), then 32 km from B to C on bearing 48 degrees (42 degrees from E).", "ta": "30 கி.மீ மற்றும் 32 கி.மீ தூரங்களில் கப்பல் செல்லும் திசைக்கோண முக்கோணப் படம்." },
    "figureCaption": { "en": "Two-leg flight bearing diagram for Unit Exercise 6 Q7", "ta": "கப்பலின் திசைக்கோணமும் பயணப் படமும்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q7(ii). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q7-iii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Bearings and Distances",
      "ta": "திசைக் கோணங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q7(iii)",
      "ta": "அலகு பயிற்சி 6 · வினா 7(iii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance C lies North of B after flying 32 km on bearing 48°"
    },
    "q": {
      "en": "7. A bird is flying from A towards B at an angle of 35°, a point 30 km away from A. At B it changes its course of flight and heads towards C on a bearing of 48° and distance 32 km away.\n(iii) How far is C to the North of B?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)",
      "ta": "7. ஒரு பறவை A என்ற இடத்திலிருந்து 30 கி.மீ தொலைவில் B என்ற இடத்திற்கு 35° கோணத்தில் பறக்கிறது. B-ல் 48° கோணத்திலிருந்து விலகி 32 கி.மீ தொலைவில் உள்ள C என்ற இடத்திற்குச் செல்கிறது,\n(iii) B -ன் வடக்குப் புறமாக C-ன் தொலைவு எவ்வளவு?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)"
    },
    "questionMath": {
      "en": [
        "7. A bird is flying from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " towards ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " at an angle of ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        ", a point ",
        {
          "latex": "30\\text{ km}",
          "fallback": "30 km",
          "display": false
        },
        " away from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ". At ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " it changes its course of flight and heads towards ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " on a bearing of ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " and distance ",
        {
          "latex": "32\\text{ km}",
          "fallback": "32 km",
          "display": false
        },
        " away.\n(iii) How far is ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " to the North of ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ],
      "ta": [
        "7. ஒரு பறவை ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " என்ற இடத்திலிருந்து ",
        {
          "latex": "30",
          "fallback": "30",
          "display": false
        },
        " கி.மீ தொலைவில் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " என்ற இடத்திற்கு ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        " கோணத்தில் பறக்கிறது. ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ல் ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " கோணத்திலிருந்து விலகி ",
        {
          "latex": "32",
          "fallback": "32",
          "display": false
        },
        " கி.மீ தொலைவில் உள்ள ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற இடத்திற்குச் செல்கிறது,\n(iii) ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " -ன் வடக்குப் புறமாக ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-ன் தொலைவு எவ்வளவு?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Bearing 48° means 48° East of North, which makes 90° − 48° = 42° above the East horizontal line. Thus the northward component is 32 sin 42° = 32 × 0.6691 = 21.41 km (approx).",
        "eq": "North distance = 32 sin 42° = 32 × 0.6691",
        "math": {
          "latex": "\\text{North distance} = 32\\sin 42^\\circ = 32 \\times 0.6691",
          "fallback": "North distance = 32 sin 42° = 32 × 0.6691",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply 32 × 0.6691 = 21.4112 km and round to two decimal places: 21.41 km (approx).",
        "eq": "32 × 0.6691 ≈ 21.41 km (approx)",
        "math": {
          "latex": "32 \\times 0.6691 = 21.4112 \\approx 21.41\\text{ km (approx)}",
          "fallback": "32 × 0.6691 ≈ 21.41 km (approx)",
          "display": true
        }
      }
    ],
    "answer": "21.41 km (approx)",
    "answerMath": {
      "latex": "21.41\\text{ km (approx)}",
      "fallback": "21.41 km (approx)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q7.svg",
    "figureAlt": { "en": "Bird flies 30 km from A to B at 35 degrees West of North (55 degrees from W), then 32 km from B to C on bearing 48 degrees (42 degrees from E).", "ta": "30 கி.மீ மற்றும் 32 கி.மீ தூரங்களில் கப்பல் செல்லும் திசைக்கோண முக்கோணப் படம்." },
    "figureCaption": { "en": "Two-leg flight bearing diagram for Unit Exercise 6 Q7", "ta": "கப்பலின் திசைக்கோணமும் பயணப் படமும்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q7(iii). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q7-iv",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Bearings and Distances",
      "ta": "திசைக் கோணங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q7(iv)",
      "ta": "அலகு பயிற்சி 6 · வினா 7(iv) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance C lies East of B after flying 32 km on bearing 48°"
    },
    "q": {
      "en": "7. A bird is flying from A towards B at an angle of 35°, a point 30 km away from A. At B it changes its course of flight and heads towards C on a bearing of 48° and distance 32 km away.\n(iv) How far is C to the East of B?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)",
      "ta": "7. ஒரு பறவை A என்ற இடத்திலிருந்து 30 கி.மீ தொலைவில் B என்ற இடத்திற்கு 35° கோணத்தில் பறக்கிறது. B-ல் 48° கோணத்திலிருந்து விலகி 32 கி.மீ தொலைவில் உள்ள C என்ற இடத்திற்குச் செல்கிறது,\n(iv) B -ன் கிழக்குப் புறமாக C-ன் தொலைவு எவ்வளவு?\n(sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431)"
    },
    "questionMath": {
      "en": [
        "7. A bird is flying from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " towards ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " at an angle of ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        ", a point ",
        {
          "latex": "30\\text{ km}",
          "fallback": "30 km",
          "display": false
        },
        " away from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ". At ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " it changes its course of flight and heads towards ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " on a bearing of ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " and distance ",
        {
          "latex": "32\\text{ km}",
          "fallback": "32 km",
          "display": false
        },
        " away.\n(iv) How far is ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " to the East of ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ],
      "ta": [
        "7. ஒரு பறவை ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " என்ற இடத்திலிருந்து ",
        {
          "latex": "30",
          "fallback": "30",
          "display": false
        },
        " கி.மீ தொலைவில் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " என்ற இடத்திற்கு ",
        {
          "latex": "35^\\circ",
          "fallback": "35°",
          "display": false
        },
        " கோணத்தில் பறக்கிறது. ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-ல் ",
        {
          "latex": "48^\\circ",
          "fallback": "48°",
          "display": false
        },
        " கோணத்திலிருந்து விலகி ",
        {
          "latex": "32",
          "fallback": "32",
          "display": false
        },
        " கி.மீ தொலைவில் உள்ள ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற இடத்திற்குச் செல்கிறது,\n(iv) ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " -ன் கிழக்குப் புறமாக ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-ன் தொலைவு எவ்வளவு?\n(",
        {
          "latex": "\\sin 55^\\circ = 0.8192,\\; \\cos 55^\\circ = 0.5736,\\; \\sin 42^\\circ = 0.6691,\\; \\cos 42^\\circ = 0.7431",
          "fallback": "sin 55° = 0.8192, cos 55° = 0.5736, sin 42° = 0.6691, cos 42° = 0.7431",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Along the East horizontal axis at angle 42°, the adjacent leg gives the eastward distance: 32 cos 42° = 32 × 0.7431 = 23.78 km (approx).",
        "eq": "East distance = 32 cos 42° = 32 × 0.7431",
        "math": {
          "latex": "\\text{East distance} = 32\\cos 42^\\circ = 32 \\times 0.7431",
          "fallback": "East distance = 32 cos 42° = 32 × 0.7431",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply 32 × 0.7431 = 23.7792 km and round to two decimal places: 23.78 km (approx).",
        "eq": "32 × 0.7431 ≈ 23.78 km (approx)",
        "math": {
          "latex": "32 \\times 0.7431 = 23.7792 \\approx 23.78\\text{ km (approx)}",
          "fallback": "32 × 0.7431 ≈ 23.78 km (approx)",
          "display": true
        }
      }
    ],
    "answer": "23.78 km (approx)",
    "answerMath": {
      "latex": "23.78\\text{ km (approx)}",
      "fallback": "23.78 km (approx)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q7.svg",
    "figureAlt": { "en": "Bird flies 30 km from A to B at 35 degrees West of North (55 degrees from W), then 32 km from B to C on bearing 48 degrees (42 degrees from E).", "ta": "30 கி.மீ மற்றும் 32 கி.மீ தூரங்களில் கப்பல் செல்லும் திசைக்கோண முக்கோணப் படம்." },
    "figureCaption": { "en": "Two-leg flight bearing diagram for Unit Exercise 6 Q7", "ta": "கப்பலின் திசைக்கோணமும் பயணப் படமும்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q7(iv). EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q8",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Heights and Distances",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q8",
      "ta": "அலகு பயிற்சி 6 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of lighthouse between two ships at depressions 60° and 45°"
    },
    "q": {
      "en": "8. Two ships are sailing in the sea on either side of the lighthouse. The angles of depression of two ships as observed from the top of the lighthouse are 60° and 45° respectively. If the distance between the ships is 200((√3 + 1) / √3) metres, find the height of the lighthouse.",
      "ta": "8. கலங்கரை விளக்கம் இருக்கும் இடத்திலிருந்து கடலில் எதிரெதிர் திசையில் இரு கப்பல்கள் பயணம் செய்கின்றன. கலங்கரை விளக்கத்தின் உச்சியிலிருந்து இரு கப்பல்களின் இறக்கக்கோணங்கள் முறையே 60° மற்றும் 45°. கப்பல்களுக்கு இடையே உள்ள தொலைவு 200((√3 + 1) / √3) மீ எனில், கலங்கரை விளக்கத்தின் உயரம் காண்க."
    },
    "questionMath": {
      "en": [
        "8. Two ships are sailing in the sea on either side of the lighthouse. The angles of depression of two ships as observed from the top of the lighthouse are ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " respectively. If the distance between the ships is ",
        {
          "latex": "200\\left(\\dfrac{\\sqrt{3} + 1}{\\sqrt{3}}\\right)",
          "fallback": "200((√3 + 1) / √3)",
          "display": false
        },
        " metres, find the height of the lighthouse."
      ],
      "ta": [
        "8. கலங்கரை விளக்கம் இருக்கும் இடத்திலிருந்து கடலில் எதிரெதிர் திசையில் இரு கப்பல்கள் பயணம் செய்கின்றன. கலங்கரை விளக்கத்தின் உச்சியிலிருந்து இரு கப்பல்களின் இறக்கக்கோணங்கள் முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        ". கப்பல்களுக்கு இடையே உள்ள தொலைவு ",
        {
          "latex": "200\\left(\\dfrac{\\sqrt{3} + 1}{\\sqrt{3}}\\right)",
          "fallback": "200((√3 + 1) / √3)",
          "display": false
        },
        " மீ எனில், கலங்கரை விளக்கத்தின் உயரம் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: With ships on opposite sides of a lighthouse of height h, their distances are d₁ = h/tan 60° = h/√3 and d₂ = h/tan 45° = h. Adding gives h((√3 + 1)/√3) = 200((√3 + 1)/√3), so h = 200 m.",
        "eq": "d1 + d2 = h((√3 + 1) / √3)",
        "math": {
          "latex": "d_1 + d_2 = \\dfrac{h}{\\sqrt{3}} + h = h\\left(\\dfrac{\\sqrt{3} + 1}{\\sqrt{3}}\\right)",
          "fallback": "d1 + d2 = h((√3 + 1) / √3)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Match the combined fraction against the given distance 200((√3 + 1)/√3). Dividing both sides by the identical non-zero factor ((√3 + 1)/√3) leaves h = 200 m.",
        "eq": "h = 200 m",
        "math": {
          "latex": "h\\left(\\dfrac{\\sqrt{3} + 1}{\\sqrt{3}}\\right) = 200\\left(\\dfrac{\\sqrt{3} + 1}{\\sqrt{3}}\\right) \\quad\\text{gives}\\quad h = 200\\text{ m}",
          "fallback": "h = 200 m",
          "display": true
        }
      }
    ],
    "answer": "200 m",
    "answerMath": {
      "latex": "200\\text{ m}",
      "fallback": "200 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q8.svg",
    "figureAlt": { "en": "Lighthouse of height h between two ships on opposite sides with depression angles 60 degrees and 45 degrees.", "ta": "கலங்கரை விளக்கத்திலிருந்து நகரும் கப்பலின் 30°, 60° இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Two ships and lighthouse diagram for Unit Exercise 6 Q8", "ta": "கலங்கரை விளக்கக் கப்பல் — 30°, 60° இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q8. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
      }
    }
  },
  {
    "id": "c10-6-unit-q9",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.unit",
    "topic": {
      "en": "Heights and Distances",
      "ta": "உயரங்களும் தொலைவுகளும்"
    },
    "label": {
      "en": "Unit Exercise 6 · Q9",
      "ta": "அலகு பயிற்சி 6 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of statue opposite a building across a 35 m street"
    },
    "q": {
      "en": "9. A building and a statue are in opposite side of a street from each other 35 m apart. From a point on the roof of building the angle of elevation of the top of statue is 24° and the angle of depression of base of the statue is 34°. Find the height of the statue. (tan 24° = 0.4452, tan 34° = 0.6745)",
      "ta": "9. ஒரு தெருவில் கட்டடமும், சிலையும் எதிரெதிர்த் திசையில் 35 மீ இடைவெளியில் அமைந்துள்ளன. கட்டடத்தின் உச்சியிலிருந்து, சிலை உச்சியின் ஏற்றக்கோணம் 24° மற்றும் சிலை அடியின் இறக்கக்கோணம் 34° எனில், சிலையின் உயரம் என்ன? (tan 24° = 0.4452, tan 34° = 0.6745)"
    },
    "questionMath": {
      "en": [
        "9. A building and a statue are in opposite side of a street from each other ",
        {
          "latex": "35\\text{ m}",
          "fallback": "35 m",
          "display": false
        },
        " apart. From a point on the roof of building the angle of elevation of the top of statue is ",
        {
          "latex": "24^\\circ",
          "fallback": "24°",
          "display": false
        },
        " and the angle of depression of base of the statue is ",
        {
          "latex": "34^\\circ",
          "fallback": "34°",
          "display": false
        },
        ". Find the height of the statue. (",
        {
          "latex": "\\tan 24^\\circ = 0.4452,\\; \\tan 34^\\circ = 0.6745",
          "fallback": "tan 24° = 0.4452, tan 34° = 0.6745",
          "display": false
        },
        ")"
      ],
      "ta": [
        "9. ஒரு தெருவில் கட்டடமும், சிலையும் எதிரெதிர்த் திசையில் ",
        {
          "latex": "35",
          "fallback": "35",
          "display": false
        },
        " மீ இடைவெளியில் அமைந்துள்ளன. கட்டடத்தின் உச்சியிலிருந்து, சிலை உச்சியின் ஏற்றக்கோணம் ",
        {
          "latex": "24^\\circ",
          "fallback": "24°",
          "display": false
        },
        " மற்றும் சிலை அடியின் இறக்கக்கோணம் ",
        {
          "latex": "34^\\circ",
          "fallback": "34°",
          "display": false
        },
        " எனில், சிலையின் உயரம் என்ன? (",
        {
          "latex": "\\tan 24^\\circ = 0.4452,\\; \\tan 34^\\circ = 0.6745",
          "fallback": "tan 24° = 0.4452, tan 34° = 0.6745",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Across the 35 m street, split the statue at the roof’s horizontal level. The upper section is 35 tan 24° = 15.582 m, the lower section is 35 tan 34° = 23.6075 m, and their sum is 39.19 m.",
        "eq": "h_top = 15.582 m, h_bot = 23.6075 m",
        "math": {
          "latex": "h_{\\text{top}} = 35\\tan 24^\\circ = 35(0.4452) = 15.582\\text{ m},\\qquad h_{\\text{bot}} = 35\\tan 34^\\circ = 35(0.6745) = 23.6075\\text{ m}",
          "fallback": "h_top = 15.582 m, h_bot = 23.6075 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Add the upper and lower heights (15.582 + 23.6075 = 39.1895 m) and round to two decimal places: 39.19 m.",
        "eq": "H = 15.582 + 23.6075 ≈ 39.19 m",
        "math": {
          "latex": "H = 15.582 + 23.6075 = 39.1895 \\approx 39.19\\text{ m}",
          "fallback": "H = 15.582 + 23.6075 ≈ 39.19 m",
          "display": true
        }
      }
    ],
    "answer": "39.19 m",
    "answerMath": {
      "latex": "39.19\\text{ m}",
      "fallback": "39.19 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-unit-q9.svg",
    "figureAlt": { "en": "Building and statue on opposite sides of 35 m street; from building roof elevation to statue top is 24 degrees and depression to base is 34 degrees.", "ta": "கட்டிடம் மற்றும் கோபுரத்திற்கு இடையிலான ஏற்ற-இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Building and statue diagram for Unit Exercise 6 Q9", "ta": "கட்டிடமும் கோபுரமும் — ஏற்ற-இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Unit Exercise 6 Q9. EN printed p. 267 (PDF p. 273); TA printed p. 275 (PDF p. 281); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 273,
        "ta": 281
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
