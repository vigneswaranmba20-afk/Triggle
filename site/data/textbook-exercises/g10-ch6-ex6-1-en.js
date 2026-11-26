/* 2025 revised TN SCERT Grade 10 Trigonometry, Exercise 6.1 (Q1–Q10, 18 new canonical records; Q2(i) preserved in c10-6-ex6-1-q2-i).
 * EN PDF pp. 255–256 (printed pp. 249–250)
 * TA PDF p. 264 (printed p. 258)
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-ex6-1-q1-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Fundamental Identities",
      "ta": "முக்கோணவியல் — முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.1 · Q1(i)",
      "ta": "பயிற்சி 6.1 · வினா 1(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove cot θ + tan θ = sec θ cosec θ"
    },
    "q": {
      "en": "1. Prove the following identities.\n(i) cot θ + tan θ = sec θ cosec θ",
      "ta": "1. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) cot θ + tan θ = sec θ cosec θ"
    },
    "questionMath": {
      "en": [
        "1. Prove the following identities.\n(i) ",
        {
          "latex": "\\cot\\theta + \\tan\\theta = \\sec\\theta\\operatorname{cosec}\\theta",
          "fallback": "cot θ + tan θ = sec θ cosec θ",
          "display": false
        }
      ],
      "ta": [
        "1. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\cot\\theta + \\tan\\theta = \\sec\\theta\\operatorname{cosec}\\theta",
          "fallback": "cot θ + tan θ = sec θ cosec θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Rewrite cot θ = cos θ / sin θ and tan θ = sin θ / cos θ, add using the common denominator sin θ cos θ, then apply cos²θ + sin²θ = 1 to reach 1/(sin θ cos θ) = sec θ cosec θ.",
        "eq": "LHS = cos θ/sin θ + sin θ/cos θ = (cos²θ + sin²θ)/(sin θ cos θ)",
        "math": {
          "latex": "\\mathrm{LHS} = \\cot\\theta + \\tan\\theta = \\dfrac{\\cos\\theta}{\\sin\\theta} + \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{\\cos^2\\theta + \\sin^2\\theta}{\\sin\\theta\\cos\\theta}",
          "fallback": "LHS = cos θ/sin θ + sin θ/cos θ = (cos²θ + sin²θ)/(sin θ cos θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because sin²θ + cos²θ = 1 for every angle θ, the numerator simplifies to 1. Finally separate the product in the denominator into reciprocals 1/cos θ = sec θ and 1/sin θ = cosec θ (assuming sin θ ≠ 0 and cos θ ≠ 0).",
        "eq": "= 1/(sin θ cos θ) = sec θ cosec θ = RHS",
        "math": {
          "latex": "= \\dfrac{1}{\\sin\\theta\\cos\\theta} = \\left(\\dfrac{1}{\\cos\\theta}\\right)\\left(\\dfrac{1}{\\sin\\theta}\\right) = \\sec\\theta\\operatorname{cosec}\\theta = \\mathrm{RHS}",
          "fallback": "= 1/(sin θ cos θ) = sec θ cosec θ = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = sec θ cosec θ (where sin θ ≠ 0, cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = \\sec\\theta\\operatorname{cosec}\\theta",
      "fallback": "LHS = RHS = sec θ cosec θ (where sin θ ≠ 0, cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q1(i). EN printed p. 249 (PDF p. 255); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 255,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q1-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Pythagorean Identities",
      "ta": "முக்கோணவியல் — முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.1 · Q1(ii)",
      "ta": "பயிற்சி 6.1 · வினா 1(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove tan⁴θ + tan²θ = sec⁴θ − sec²θ"
    },
    "q": {
      "en": "1. Prove the following identities.\n(ii) tan⁴θ + tan²θ = sec⁴θ − sec²θ",
      "ta": "1. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) tan⁴θ + tan²θ = sec⁴θ − sec²θ"
    },
    "questionMath": {
      "en": [
        "1. Prove the following identities.\n(ii) ",
        {
          "latex": "\\tan^4\\theta + \\tan^2\\theta = \\sec^4\\theta - \\sec^2\\theta",
          "fallback": "tan⁴θ + tan²θ = sec⁴θ − sec²θ",
          "display": false
        }
      ],
      "ta": [
        "1. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\tan^4\\theta + \\tan^2\\theta = \\sec^4\\theta - \\sec^2\\theta",
          "fallback": "tan⁴θ + tan²θ = sec⁴θ − sec²θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Factor out tan²θ from the left-hand side to get tan²θ(tan²θ + 1), then convert every tan²θ factor to sec²θ using 1 + tan²θ = sec²θ.",
        "eq": "LHS = tan²θ(tan²θ + 1)",
        "math": {
          "latex": "\\mathrm{LHS} = \\tan^4\\theta + \\tan^2\\theta = \\tan^2\\theta(\\tan^2\\theta + 1)",
          "fallback": "LHS = tan²θ(tan²θ + 1)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice two substitutions from 1 + tan²θ = sec²θ: first replace (tan²θ + 1) by sec²θ, and also replace tan²θ by (sec²θ − 1). Expanding gives sec⁴θ − sec²θ (where cos θ ≠ 0).",
        "eq": "= (sec²θ − 1)(sec²θ) = sec⁴θ − sec²θ = RHS",
        "math": {
          "latex": "= (\\sec^2\\theta - 1)\\sec^2\\theta = \\sec^4\\theta - \\sec^2\\theta = \\mathrm{RHS}",
          "fallback": "= (sec²θ − 1)(sec²θ) = sec⁴θ − sec²θ = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = sec⁴θ − sec²θ (where cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = \\sec^4\\theta - \\sec^2\\theta",
      "fallback": "LHS = RHS = sec⁴θ − sec²θ (where cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q1(ii). EN printed p. 249 (PDF p. 255); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 255,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q2-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Conjugate Multiplication",
      "ta": "முக்கோணவியல் — இணைப் பெருக்கல்"
    },
    "label": {
      "en": "Exercise 6.1 · Q2(ii)",
      "ta": "பயிற்சி 6.1 · வினா 2(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove cos θ / (1 + sin θ) = sec θ − tan θ"
    },
    "q": {
      "en": "2. Prove the following identities.\n(ii) cos θ / (1 + sin θ) = sec θ − tan θ",
      "ta": "2. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) cos θ / (1 + sin θ) = sec θ − tan θ"
    },
    "questionMath": {
      "en": [
        "2. Prove the following identities.\n(ii) ",
        {
          "latex": "\\dfrac{\\cos\\theta}{1+\\sin\\theta} = \\sec\\theta - \\tan\\theta",
          "fallback": "cos θ / (1 + sin θ) = sec θ − tan θ",
          "display": false
        }
      ],
      "ta": [
        "2. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\dfrac{\\cos\\theta}{1+\\sin\\theta} = \\sec\\theta - \\tan\\theta",
          "fallback": "cos θ / (1 + sin θ) = sec θ − tan θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Multiply numerator and denominator by the conjugate (1 − sin θ) so the denominator becomes 1 − sin²θ = cos²θ, cancel one cos θ factor, and split into sec θ − tan θ.",
        "eq": "LHS = [cos θ(1 − sin θ)] / [(1 + sin θ)(1 − sin θ)]",
        "math": {
          "latex": "\\mathrm{LHS} = \\dfrac{\\cos\\theta}{1+\\sin\\theta}\\times\\dfrac{1-\\sin\\theta}{1-\\sin\\theta} = \\dfrac{\\cos\\theta(1-\\sin\\theta)}{1-\\sin^2\\theta}",
          "fallback": "LHS = [cos θ(1 − sin θ)] / [(1 + sin θ)(1 − sin θ)]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Replace 1 − sin²θ by cos²θ and cancel the nonzero common factor cos θ (for cos θ ≠ 0 and sin θ ≠ −1). Splitting (1 − sin θ)/cos θ yields 1/cos θ − sin θ/cos θ = sec θ − tan θ.",
        "eq": "= [cos θ(1 − sin θ)] / cos²θ = (1 − sin θ)/cos θ = sec θ − tan θ = RHS",
        "math": {
          "latex": "\\begin{aligned} &= \\dfrac{\\cos\\theta(1-\\sin\\theta)}{\\cos^2\\theta} = \\dfrac{1-\\sin\\theta}{\\cos\\theta} \\\\ &= \\dfrac{1}{\\cos\\theta} - \\dfrac{\\sin\\theta}{\\cos\\theta} = \\sec\\theta - \\tan\\theta = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= [cos θ(1 − sin θ)] / cos²θ = (1 − sin θ)/cos θ = sec θ − tan θ = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = sec θ − tan θ (where cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = \\sec\\theta - \\tan\\theta",
      "fallback": "LHS = RHS = sec θ − tan θ (where cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q2(ii). EN printed p. 249 (PDF p. 255); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 255,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q3-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Radicals & Identities",
      "ta": "முக்கோணவியல் — வர்க்கமூல முற்றொருமை"
    },
    "label": {
      "en": "Exercise 6.1 · Q3(i)",
      "ta": "பயிற்சி 6.1 · வினா 3(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove √((1 + sin θ)/(1 − sin θ)) = sec θ + tan θ"
    },
    "q": {
      "en": "3. Prove the following identities.\n(i) √((1 + sin θ)/(1 − sin θ)) = sec θ + tan θ",
      "ta": "3. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) √((1 + sin θ)/(1 − sin θ)) = sec θ + tan θ"
    },
    "questionMath": {
      "en": [
        "3. Prove the following identities.\n(i) ",
        {
          "latex": "\\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}} = \\sec\\theta + \\tan\\theta",
          "fallback": "√((1 + sin θ)/(1 − sin θ)) = sec θ + tan θ",
          "display": false
        }
      ],
      "ta": [
        "3. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}} = \\sec\\theta + \\tan\\theta",
          "fallback": "√((1 + sin θ)/(1 − sin θ)) = sec θ + tan θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: On the common domain, cos θ is nonzero and 1 + sin θ is positive. Multiply the numerator and denominator by 1 + sin θ and use 1 − sin²θ = cos²θ.",
        "eq": "LHS = √[((1 + sin θ)²)/(1 − sin²θ)]",
        "math": {
          "latex": "\\mathrm{LHS} = \\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}\\times\\dfrac{1+\\sin\\theta}{1+\\sin\\theta}} = \\sqrt{\\dfrac{(1+\\sin\\theta)^2}{1-\\sin^2\\theta}}",
          "fallback": "LHS = √[((1 + sin θ)²)/(1 − sin²θ)]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — A principal square root is nonnegative. Taking the square root of the square gives an absolute value. The printed equality holds when cos θ > 0. At θ = 180°, the left side is 1 and the printed right side is −1.",
        "eq": "LHS = (1 + sin θ)/|cos θ| = |sec θ + tan θ|",
        "math": {
          "latex": "\\mathrm{LHS}=\\dfrac{1+\\sin\\theta}{|\\cos\\theta|}=|\\sec\\theta+\\tan\\theta|",
          "fallback": "LHS = (1 + sin θ)/|cos θ| = |sec θ + tan θ|",
          "display": true
        }
      }
    ],
    "answer": "LHS = sec θ + tan θ when cos θ > 0.",
    "answerMath": {
      "latex": "\\mathrm{LHS}=\\sec\\theta+\\tan\\theta\\quad(\\cos\\theta>0)",
      "fallback": "LHS = sec θ + tan θ when cos θ > 0.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q3(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q3-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Radicals & Identities",
      "ta": "முக்கோணவியல் — வர்க்கமூல முற்றொருமை"
    },
    "label": {
      "en": "Exercise 6.1 · Q3(ii)",
      "ta": "பயிற்சி 6.1 · வினா 3(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove √((1+sinθ)/(1−sinθ)) + √((1−sinθ)/(1+sinθ)) = 2 sec θ"
    },
    "q": {
      "en": "3. Prove the following identities.\n(ii) √((1 + sin θ)/(1 − sin θ)) + √((1 − sin θ)/(1 + sin θ)) = 2 sec θ",
      "ta": "3. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) √((1 + sin θ)/(1 − sin θ)) + √((1 − sin θ)/(1 + sin θ)) = 2 sec θ"
    },
    "questionMath": {
      "en": [
        "3. Prove the following identities.\n(ii) ",
        {
          "latex": "\\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}} + \\sqrt{\\dfrac{1-\\sin\\theta}{1+\\sin\\theta}} = 2\\sec\\theta",
          "fallback": "√((1 + sin θ)/(1 − sin θ)) + √((1 − sin θ)/(1 + sin θ)) = 2 sec θ",
          "display": false
        }
      ],
      "ta": [
        "3. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}} + \\sqrt{\\dfrac{1-\\sin\\theta}{1+\\sin\\theta}} = 2\\sec\\theta",
          "fallback": "√((1 + sin θ)/(1 − sin θ)) + √((1 − sin θ)/(1 + sin θ)) = 2 sec θ",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: On the common domain, cos θ is nonzero and both 1 + sin θ and 1 − sin θ are positive. Rationalise each radical using 1 − sin²θ = cos²θ.",
        "eq": "LHS = √[(1 + sin θ)²/cos²θ] + √[(1 − sin θ)²/cos²θ]",
        "math": {
          "latex": "\\mathrm{LHS} = \\sqrt{\\dfrac{(1+\\sin\\theta)^2}{\\cos^2\\theta}} + \\sqrt{\\dfrac{(1-\\sin\\theta)^2}{\\cos^2\\theta}}",
          "fallback": "LHS = √[(1 + sin θ)²/cos²θ] + √[(1 − sin θ)²/cos²θ]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Each principal square root has denominator |cos θ|. The sine terms cancel. The printed equality holds when cos θ > 0. At θ = 180°, the left side is 2 and the printed right side is −2.",
        "eq": "LHS = (1 + sin θ + 1 − sin θ)/|cos θ| = 2/|cos θ| = 2|sec θ|",
        "math": {
          "latex": "\\mathrm{LHS}=\\dfrac{(1+\\sin\\theta)+(1-\\sin\\theta)}{|\\cos\\theta|}=2|\\sec\\theta|",
          "fallback": "LHS = (1 + sin θ + 1 − sin θ)/|cos θ| = 2/|cos θ| = 2|sec θ|",
          "display": true
        }
      }
    ],
    "answer": "LHS = 2 sec θ when cos θ > 0.",
    "answerMath": {
      "latex": "\\mathrm{LHS}=2\\sec\\theta\\quad(\\cos\\theta>0)",
      "fallback": "LHS = 2 sec θ when cos θ > 0.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q3(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q4-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Higher-Power Identities",
      "ta": "முக்கோணவியல் — உயர்படி முற்றொருமை"
    },
    "label": {
      "en": "Exercise 6.1 · Q4(i)",
      "ta": "பயிற்சி 6.1 · வினா 4(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1"
    },
    "q": {
      "en": "4. Prove the following identities.\n(i) sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1",
      "ta": "4. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1"
    },
    "questionMath": {
      "en": [
        "4. Prove the following identities.\n(i) ",
        {
          "latex": "\\sec^6\\theta = \\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1",
          "fallback": "sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1",
          "display": false
        }
      ],
      "ta": [
        "4. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\sec^6\\theta = \\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1",
          "fallback": "sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Begin with the Pythagorean identity sec²θ − tan²θ = 1 and cube both sides using (a − b)³ = a³ − b³ − 3ab(a − b).",
        "eq": "(sec²θ − tan²θ)³ = 1³ gives sec⁶θ − tan⁶θ − 3 sec²θ tan²θ(sec²θ − tan²θ) = 1",
        "math": {
          "latex": "\\begin{aligned} \\sec^2\\theta - \\tan^2\\theta &= 1 \\\\ (\\sec^2\\theta - \\tan^2\\theta)^3 &= 1^3 \\\\ \\sec^6\\theta - \\tan^6\\theta - 3\\sec^2\\theta\\tan^2\\theta(\\sec^2\\theta - \\tan^2\\theta) &= 1 \\end{aligned}",
          "fallback": "(sec²θ − tan²θ)³ = 1³ gives sec⁶θ − tan⁶θ − 3 sec²θ tan²θ(sec²θ − tan²θ) = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute sec²θ − tan²θ = 1 inside the parentheses and move the negative terms to the right side to isolate sec⁶θ.",
        "eq": "sec⁶θ − tan⁶θ − 3 tan²θ sec²θ = 1 gives sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1",
        "math": {
          "latex": "\\begin{aligned} \\sec^6\\theta - \\tan^6\\theta - 3\\tan^2\\theta\\sec^2\\theta(1) &= 1 \\\\ \\sec^6\\theta &= \\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1 \\end{aligned}",
          "fallback": "sec⁶θ − tan⁶θ − 3 tan²θ sec²θ = 1 gives sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1",
          "display": true
        }
      }
    ],
    "answer": "sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1 (proved)",
    "answerMath": {
      "latex": "\\sec^6\\theta = \\tan^6\\theta + 3\\tan^2\\theta\\sec^2\\theta + 1",
      "fallback": "sec⁶θ = tan⁶θ + 3 tan²θ sec²θ + 1 (proved)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q4(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q4-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Algebraic Expansion Identities",
      "ta": "முக்கோணவியல் — முற்றொருமை விரிவாக்கம்"
    },
    "label": {
      "en": "Exercise 6.1 · Q4(ii)",
      "ta": "பயிற்சி 6.1 · வினா 4(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove (sin θ + sec θ)² + (cos θ + cosec θ)² = 1 + (sec θ + cosec θ)²"
    },
    "q": {
      "en": "4. Prove the following identities.\n(ii) (sin θ + sec θ)² + (cos θ + cosec θ)² = 1 + (sec θ + cosec θ)²",
      "ta": "4. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) (sin θ + sec θ)² + (cos θ + cosec θ)² = 1 + (sec θ + cosec θ)²"
    },
    "questionMath": {
      "en": [
        "4. Prove the following identities.\n(ii) ",
        {
          "latex": "(\\sin\\theta + \\sec\\theta)^2 + (\\cos\\theta + \\operatorname{cosec}\\theta)^2 = 1 + (\\sec\\theta + \\operatorname{cosec}\\theta)^2",
          "fallback": "(sin θ + sec θ)² + (cos θ + cosec θ)² = 1 + (sec θ + cosec θ)²",
          "display": false
        }
      ],
      "ta": [
        "4. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "(\\sin\\theta + \\sec\\theta)^2 + (\\cos\\theta + \\operatorname{cosec}\\theta)^2 = 1 + (\\sec\\theta + \\operatorname{cosec}\\theta)^2",
          "fallback": "(sin θ + sec θ)² + (cos θ + cosec θ)² = 1 + (sec θ + cosec θ)²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Expand both squares using (a + b)² = a² + 2ab + b², group sin²θ + cos²θ = 1, and simplify 2 sin θ sec θ + 2 cos θ cosec θ into 2 sec θ cosec θ so sec²θ + 2 sec θ cosec θ + cosec²θ forms (sec θ + cosec θ)².",
        "eq": "LHS = (sin²θ + cos²θ) + (sec²θ + cosec²θ) + 2(sin θ/cos θ + cos θ/sin θ)",
        "math": {
          "latex": "\\begin{aligned} \\mathrm{LHS} &= (\\sin^2\\theta + 2\\sin\\theta\\sec\\theta + \\sec^2\\theta) + (\\cos^2\\theta + 2\\cos\\theta\\operatorname{cosec}\\theta + \\operatorname{cosec}^2\\theta) \\\\ &= (\\sin^2\\theta + \\cos^2\\theta) + \\sec^2\\theta + \\operatorname{cosec}^2\\theta + 2\\left(\\dfrac{\\sin\\theta}{\\cos\\theta} + \\dfrac{\\cos\\theta}{\\sin\\theta}\\right) \\end{aligned}",
          "fallback": "LHS = (sin²θ + cos²θ) + (sec²θ + cosec²θ) + 2(sin θ/cos θ + cos θ/sin θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice sin θ/cos θ + cos θ/sin θ = (sin²θ + cos²θ)/(sin θ cos θ) = 1/(sin θ cos θ) = sec θ cosec θ! Replacing this middle term completes the perfect square (sec θ + cosec θ)².",
        "eq": "= 1 + sec²θ + 2 sec θ cosec θ + cosec²θ = 1 + (sec θ + cosec θ)² = RHS",
        "math": {
          "latex": "\\begin{aligned} &= 1 + \\sec^2\\theta + \\operatorname{cosec}^2\\theta + 2\\left(\\dfrac{1}{\\sin\\theta\\cos\\theta}\\right) \\\\ &= 1 + (\\sec^2\\theta + 2\\sec\\theta\\operatorname{cosec}\\theta + \\operatorname{cosec}^2\\theta) \\\\ &= 1 + (\\sec\\theta + \\operatorname{cosec}\\theta)^2 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= 1 + sec²θ + 2 sec θ cosec θ + cosec²θ = 1 + (sec θ + cosec θ)² = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = 1 + (sec θ + cosec θ)² (where sin θ ≠ 0, cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = 1 + (\\sec\\theta + \\operatorname{cosec}\\theta)^2",
      "fallback": "LHS = RHS = 1 + (sec θ + cosec θ)² (where sin θ ≠ 0, cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q4(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q5-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Converting to sin θ and cos θ",
      "ta": "முக்கோணவியல் — சைன், கொசைன் வடிவ மாற்று"
    },
    "label": {
      "en": "Exercise 6.1 · Q5(i)",
      "ta": "பயிற்சி 6.1 · வினா 5(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove sec⁴θ(1 − sin⁴θ) − 2 tan²θ = 1"
    },
    "q": {
      "en": "5. Prove the following identities.\n(i) sec⁴θ(1 − sin⁴θ) − 2 tan²θ = 1",
      "ta": "5. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) sec⁴θ(1 − sin⁴θ) − 2 tan²θ = 1"
    },
    "questionMath": {
      "en": [
        "5. Prove the following identities.\n(i) ",
        {
          "latex": "\\sec^4\\theta(1-\\sin^4\\theta) - 2\\tan^2\\theta = 1",
          "fallback": "sec⁴θ(1 − sin⁴θ) − 2 tan²θ = 1",
          "display": false
        }
      ],
      "ta": [
        "5. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\sec^4\\theta(1-\\sin^4\\theta) - 2\\tan^2\\theta = 1",
          "fallback": "sec⁴θ(1 − sin⁴θ) − 2 tan²θ = 1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Factor 1 − sin⁴θ = (1 − sin²θ)(1 + sin²θ) = cos²θ(1 + sin²θ), convert sec⁴θ = 1/cos⁴θ and tan²θ = sin²θ/cos²θ, and combine over common denominator cos²θ.",
        "eq": "LHS = [(1 − sin²θ)(1 + sin²θ)]/cos⁴θ − 2 sin²θ/cos²θ",
        "math": {
          "latex": "\\mathrm{LHS} = \\dfrac{1}{\\cos^4\\theta}(1-\\sin^2\\theta)(1+\\sin^2\\theta) - \\dfrac{2\\sin^2\\theta}{\\cos^2\\theta}",
          "fallback": "LHS = [(1 − sin²θ)(1 + sin²θ)]/cos⁴θ − 2 sin²θ/cos²θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Cancel one cos²θ factor from numerator and denominator, combine (1 + sin²θ − 2 sin²θ) = 1 − sin²θ = cos²θ, and simplify cos²θ/cos²θ = 1 (where cos θ ≠ 0).",
        "eq": "= (1 + sin²θ − 2 sin²θ)/cos²θ = (1 − sin²θ)/cos²θ = cos²θ/cos²θ = 1 = RHS",
        "math": {
          "latex": "\\begin{aligned} &= \\dfrac{\\cos^2\\theta(1+\\sin^2\\theta)}{\\cos^4\\theta} - \\dfrac{2\\sin^2\\theta}{\\cos^2\\theta} = \\dfrac{1+\\sin^2\\theta - 2\\sin^2\\theta}{\\cos^2\\theta} \\\\ &= \\dfrac{1-\\sin^2\\theta}{\\cos^2\\theta} = \\dfrac{\\cos^2\\theta}{\\cos^2\\theta} = 1 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= (1 + sin²θ − 2 sin²θ)/cos²θ = (1 − sin²θ)/cos²θ = cos²θ/cos²θ = 1 = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = 1 (where cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = 1",
      "fallback": "LHS = RHS = 1 (where cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q5(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q5-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Factoring Common Trigonometric Terms",
      "ta": "முக்கோணவியல் — பொதுக் காரணி நீக்கம்"
    },
    "label": {
      "en": "Exercise 6.1 · Q5(ii)",
      "ta": "பயிற்சி 6.1 · வினா 5(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove (cot θ − cos θ)/(cot θ + cos θ) = (cosec θ − 1)/(cosec θ + 1)"
    },
    "q": {
      "en": "5. Prove the following identities.\n(ii) (cot θ − cos θ)/(cot θ + cos θ) = (cosec θ − 1)/(cosec θ + 1)",
      "ta": "5. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) (cot θ − cos θ)/(cot θ + cos θ) = (cosec θ − 1)/(cosec θ + 1)"
    },
    "questionMath": {
      "en": [
        "5. Prove the following identities.\n(ii) ",
        {
          "latex": "\\dfrac{\\cot\\theta - \\cos\\theta}{\\cot\\theta + \\cos\\theta} = \\dfrac{\\operatorname{cosec}\\theta - 1}{\\operatorname{cosec}\\theta + 1}",
          "fallback": "(cot θ − cos θ)/(cot θ + cos θ) = (cosec θ − 1)/(cosec θ + 1)",
          "display": false
        }
      ],
      "ta": [
        "5. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\dfrac{\\cot\\theta - \\cos\\theta}{\\cot\\theta + \\cos\\theta} = \\dfrac{\\operatorname{cosec}\\theta - 1}{\\operatorname{cosec}\\theta + 1}",
          "fallback": "(cot θ − cos θ)/(cot θ + cos θ) = (cosec θ − 1)/(cosec θ + 1)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute cot θ = cos θ / sin θ = cos θ cosec θ, factor cos θ out of both numerator and denominator, and cancel cos θ.",
        "eq": "LHS = [(cos θ/sin θ) − cos θ] / [(cos θ/sin θ) + cos θ]",
        "math": {
          "latex": "\\mathrm{LHS} = \\dfrac{\\dfrac{\\cos\\theta}{\\sin\\theta} - \\cos\\theta}{\\dfrac{\\cos\\theta}{\\sin\\theta} + \\cos\\theta} = \\dfrac{\\cos\\theta\\left(\\dfrac{1}{\\sin\\theta} - 1\\right)}{\\cos\\theta\\left(\\dfrac{1}{\\sin\\theta} + 1\\right)}",
          "fallback": "LHS = [(cos θ/sin θ) − cos θ] / [(cos θ/sin θ) + cos θ]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Provided cos θ ≠ 0 and sin θ ≠ 0, cancel the common factor cos θ and replace 1/sin θ with cosec θ to reach the right-hand side.",
        "eq": "= (cosec θ − 1)/(cosec θ + 1) = RHS",
        "math": {
          "latex": "= \\dfrac{\\operatorname{cosec}\\theta - 1}{\\operatorname{cosec}\\theta + 1} = \\mathrm{RHS}",
          "fallback": "= (cosec θ − 1)/(cosec θ + 1) = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = (cosec θ − 1)/(cosec θ + 1) (where sin θ ≠ 0, cos θ ≠ 0)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = \\dfrac{\\operatorname{cosec}\\theta - 1}{\\operatorname{cosec}\\theta + 1}",
      "fallback": "LHS = RHS = (cosec θ − 1)/(cosec θ + 1) (where sin θ ≠ 0, cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q5(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q6-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Sum of Two Fractions",
      "ta": "முக்கோணவியல் — இரு கோவைகளின் கூடுதல்"
    },
    "label": {
      "en": "Exercise 6.1 · Q6(i)",
      "ta": "பயிற்சி 6.1 · வினா 6(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove (sin A − sin B)/(cos A + cos B) + (cos A − cos B)/(sin A + sin B) = 0"
    },
    "q": {
      "en": "6. Prove the following identities.\n(i) (sin A − sin B)/(cos A + cos B) + (cos A − cos B)/(sin A + sin B) = 0",
      "ta": "6. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) (sin A − sin B)/(cos A + cos B) + (cos A − cos B)/(sin A + sin B) = 0"
    },
    "questionMath": {
      "en": [
        "6. Prove the following identities.\n(i) ",
        {
          "latex": "\\dfrac{\\sin A - \\sin B}{\\cos A + \\cos B} + \\dfrac{\\cos A - \\cos B}{\\sin A + \\sin B} = 0",
          "fallback": "(sin A − sin B)/(cos A + cos B) + (cos A − cos B)/(sin A + sin B) = 0",
          "display": false
        }
      ],
      "ta": [
        "6. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\dfrac{\\sin A - \\sin B}{\\cos A + \\cos B} + \\dfrac{\\cos A - \\cos B}{\\sin A + \\sin B} = 0",
          "fallback": "(sin A − sin B)/(cos A + cos B) + (cos A − cos B)/(sin A + sin B) = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Combine over the common denominator (cos A + cos B)(sin A + sin B). Cross-multiplying uses (a − b)(a + b) = a² − b², yielding (sin²A − sin²B) + (cos²A − cos²B) = 1 − 1 = 0.",
        "eq": "LHS = [(sin A − sin B)(sin A + sin B) + (cos A − cos B)(cos A + cos B)] / [(cos A + cos B)(sin A + sin B)]",
        "math": {
          "latex": "\\mathrm{LHS} = \\dfrac{(\\sin A - \\sin B)(\\sin A + \\sin B) + (\\cos A - \\cos B)(\\cos A + \\cos B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)}",
          "fallback": "LHS = [(sin A − sin B)(sin A + sin B) + (cos A − cos B)(cos A + cos B)] / [(cos A + cos B)(sin A + sin B)]",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Apply (a − b)(a + b) = a² − b² to both numerator products and regroup by angle: (sin²A + cos²A) − (sin²B + cos²B) = 1 − 1 = 0.",
        "eq": "= [(sin²A + cos²A) − (sin²B + cos²B)] / [(cos A + cos B)(sin A + sin B)] = 0 = RHS",
        "math": {
          "latex": "\\begin{aligned} &= \\dfrac{(\\sin^2 A - \\sin^2 B) + (\\cos^2 A - \\cos^2 B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)} \\\\ &= \\dfrac{(\\sin^2 A + \\cos^2 A) - (\\sin^2 B + \\cos^2 B)}{(\\cos A + \\cos B)(\\sin A + \\sin B)} = \\dfrac{1 - 1}{(\\cos A + \\cos B)(\\sin A + \\sin B)} = 0 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= [(sin²A + cos²A) − (sin²B + cos²B)] / [(cos A + cos B)(sin A + sin B)] = 0 = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = 0 (where denominators are nonzero)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = 0",
      "fallback": "LHS = RHS = 0 (where denominators are nonzero)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q6(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q6-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Sum and Difference of Cubes",
      "ta": "முக்கோணவியல் — கனங்களின் கூடுதல் மற்றும் கழித்தல்"
    },
    "label": {
      "en": "Exercise 6.1 · Q6(ii)",
      "ta": "பயிற்சி 6.1 · வினா 6(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove (sin³A + cos³A)/(sin A + cos A) + (sin³A − cos³A)/(sin A − cos A) = 2"
    },
    "q": {
      "en": "6. Prove the following identities.\n(ii) (sin³A + cos³A)/(sin A + cos A) + (sin³A − cos³A)/(sin A − cos A) = 2",
      "ta": "6. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) (sin³A + cos³A)/(sin A + cos A) + (sin³A − cos³A)/(sin A − cos A) = 2"
    },
    "questionMath": {
      "en": [
        "6. Prove the following identities.\n(ii) ",
        {
          "latex": "\\dfrac{\\sin^3 A + \\cos^3 A}{\\sin A + \\cos A} + \\dfrac{\\sin^3 A - \\cos^3 A}{\\sin A - \\cos A} = 2",
          "fallback": "(sin³A + cos³A)/(sin A + cos A) + (sin³A − cos³A)/(sin A − cos A) = 2",
          "display": false
        }
      ],
      "ta": [
        "6. பின்வரும் முற்றொருமைகளை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\dfrac{\\sin^3 A + \\cos^3 A}{\\sin A + \\cos A} + \\dfrac{\\sin^3 A - \\cos^3 A}{\\sin A - \\cos A} = 2",
          "fallback": "(sin³A + cos³A)/(sin A + cos A) + (sin³A − cos³A)/(sin A − cos A) = 2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Factor both numerators with a³ + b³ = (a + b)(a² − ab + b²) and a³ − b³ = (a − b)(a² + ab + b²), cancel denominators, and add (1 − sin A cos A) + (1 + sin A cos A) = 2.",
        "eq": "Factor sin³A ± cos³A using cube sum and difference identities",
        "math": {
          "latex": "\\mathrm{LHS} = \\dfrac{(\\sin A+\\cos A)(\\sin^2 A - \\sin A\\cos A + \\cos^2 A)}{\\sin A+\\cos A} + \\dfrac{(\\sin A-\\cos A)(\\sin^2 A + \\sin A\\cos A + \\cos^2 A)}{\\sin A-\\cos A}",
          "fallback": "Factor sin³A ± cos³A using cube sum and difference identities",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Assuming sin A ± cos A ≠ 0, cancel both common factors, apply sin²A + cos²A = 1 inside each remaining trinomial, and watch −sin A cos A and +sin A cos A cancel to leave 1 + 1 = 2.",
        "eq": "= (1 − sin A cos A) + (1 + sin A cos A) = 2 = RHS",
        "math": {
          "latex": "\\begin{aligned} &= (\\sin^2 A + \\cos^2 A - \\sin A\\cos A) + (\\sin^2 A + \\cos^2 A + \\sin A\\cos A) \\\\ &= (1 - \\sin A\\cos A) + (1 + \\sin A\\cos A) = 2 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= (1 − sin A cos A) + (1 + sin A cos A) = 2 = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = 2 (where sin A ≠ ±cos A)",
    "answerMath": {
      "latex": "\\mathrm{LHS} = \\mathrm{RHS} = 2",
      "fallback": "LHS = RHS = 2 (where sin A ≠ ±cos A)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q6(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q7-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Conditional Identities",
      "ta": "முக்கோணவியல் — நிபந்தனை முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.1 · Q7(i)",
      "ta": "பயிற்சி 6.1 · வினா 7(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given sin θ + cos θ = √3, prove tan θ + cot θ = 1"
    },
    "q": {
      "en": "7. (i) If sin θ + cos θ = √3, then prove that tan θ + cot θ = 1.",
      "ta": "7. (i) sin θ + cos θ = √3 எனில், tan θ + cot θ = 1 என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "7. (i) If ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = \\sqrt{3}",
          "fallback": "sin θ + cos θ = √3",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "\\tan\\theta+\\cot\\theta=1\\quad(\\text{No real angle})",
          "fallback": "tan θ + cot θ = 1",
          "display": false
        },
        "."
      ],
      "ta": [
        "7. (i) ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = \\sqrt{3}",
          "fallback": "sin θ + cos θ = √3",
          "display": false
        },
        " எனில், ",
        {
          "latex": "\\tan\\theta + \\cot\\theta = 1",
          "fallback": "tan θ + cot θ = 1",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Square both sides of sin θ + cos θ = √3 to find sin θ cos θ = 1, then rewrite tan θ + cot θ = (sin²θ + cos²θ)/(sin θ cos θ) = 1/1 = 1.",
        "eq": "(sin θ + cos θ)² = 3 gives 1 + 2 sin θ cos θ = 3, so sin θ cos θ = 1",
        "math": {
          "latex": "\\begin{aligned} (\\sin\\theta + \\cos\\theta)^2 &= (\\sqrt{3})^2 \\\\ \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta &= 3 \\\\ 1 + 2\\sin\\theta\\cos\\theta &= 3\\quad\\text{gives}\\quad \\sin\\theta\\cos\\theta = 1 \\end{aligned}",
          "fallback": "(sin θ + cos θ)² = 3 gives 1 + 2 sin θ cos θ = 3, so sin θ cos θ = 1",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Convert tan θ + cot θ to sin θ and cos θ: (sin²θ + cos²θ)/(sin θ cos θ) = 1/(sin θ cos θ) = 1/1 = 1. (Note: no real angle satisfies sin θ + cos θ = √3 since max is √2 ≈ 1.414 < 1.732, so this proof holds purely as an algebraic relation assuming the given equation.)",
        "eq": "tan θ + cot θ = 1/(sin θ cos θ) = 1/1 = 1",
        "math": {
          "latex": "\\tan\\theta + \\cot\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} + \\dfrac{\\cos\\theta}{\\sin\\theta} = \\dfrac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta} = \\dfrac{1}{1} = 1",
          "fallback": "tan θ + cot θ = 1/(sin θ cos θ) = 1/1 = 1",
          "display": true
        }
      }
    ],
    "answer": "Formal result 1. No real angle satisfies the given condition.",
    "answerMath": {
      "latex": "\\tan\\theta + \\cot\\theta = 1",
      "fallback": "Formal result 1. No real angle satisfies the given condition.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q7(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q7-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Triple-Angle Formula Check",
      "ta": "முக்கோணவியல் — முக்கோண சமன்பாடு"
    },
    "label": {
      "en": "Exercise 6.1 · Q7(ii)",
      "ta": "பயிற்சி 6.1 · வினா 7(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given √3 sin θ − cos θ = 0, show tan 3θ = (3 tan θ − tan³θ)/(1 − 3 tan²θ)"
    },
    "q": {
      "en": "7. (ii) If √3 sin θ − cos θ = 0, then show that tan 3θ = (3 tan θ − tan³θ)/(1 − 3 tan²θ)",
      "ta": "7. (ii) √3 sin θ − cos θ = 0 எனில், tan 3θ = (3 tan θ − tan³θ)/(1 − 3 tan²θ) எனக் நிறுவுக."
    },
    "questionMath": {
      "en": [
        "7. (ii) If ",
        {
          "latex": "\\sqrt{3}\\sin\\theta - \\cos\\theta = 0",
          "fallback": "√3 sin θ − cos θ = 0",
          "display": false
        },
        ", then show that ",
        {
          "latex": "\\tan 3\\theta = \\dfrac{3\\tan\\theta - \\tan^3\\theta}{1 - 3\\tan^2\\theta}",
          "fallback": "tan 3θ = (3 tan θ − tan³θ)/(1 − 3 tan²θ)",
          "display": false
        }
      ],
      "ta": [
        "7. (ii) ",
        {
          "latex": "\\sqrt{3}\\sin\\theta - \\cos\\theta = 0",
          "fallback": "√3 sin θ − cos θ = 0",
          "display": false
        },
        " எனில், ",
        {
          "latex": "\\tan 3\\theta = \\dfrac{3\\tan\\theta - \\tan^3\\theta}{1 - 3\\tan^2\\theta}",
          "fallback": "tan 3θ = (3 tan θ − tan³θ)/(1 − 3 tan²θ)",
          "display": false
        },
        " எனக் நிறுவுக."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Rearrange √3 sin θ = cos θ to get tan θ = 1/√3, which gives acute angle θ = 30° and 3θ = 90°. Substitute θ = 30° into both sides: tan 90° and the RHS denominator 1 − 3 tan²30° = 0 both become undefined.",
        "eq": "√3 sin θ = cos θ gives tan θ = 1/√3, so θ = 30°",
        "math": {
          "latex": "\\sqrt{3}\\sin\\theta = \\cos\\theta\\quad\\text{gives}\\quad \\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{1}{\\sqrt{3}}\\quad\\text{so}\\quad \\theta = 30^\\circ",
          "fallback": "√3 sin θ = cos θ gives tan θ = 1/√3, so θ = 30°",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Carefully evaluate both sides at θ = 30°: on LHS, tan(3×30°) = tan 90°, which divides by cos 90° = 0 and is not defined; on RHS, 1 − 3 tan²30° = 1 − 3(1/3) = 0, so the denominator is also zero. Since neither side has a value, substitution at this angle cannot verify equality. The triple-angle identity applies when its terms are defined.",
        "eq": "LHS = tan 90° (not defined); RHS denominator = 1 − 3(1/√3)² = 1 − 1 = 0 (not defined)",
        "math": {
          "latex": "\\begin{aligned} \\mathrm{LHS} &= \\tan 3(30^\\circ) = \\tan 90^\\circ \\quad(\\text{not defined}) \\\\ \\mathrm{RHS} &= \\dfrac{3\\left(\\frac{1}{\\sqrt{3}}\\right) - \\left(\\frac{1}{\\sqrt{3}}\\right)^3}{1 - 3\\left(\\frac{1}{\\sqrt{3}}\\right)^2} = \\dfrac{\\sqrt{3} - \\frac{1}{3\\sqrt{3}}}{1 - 1} = \\dfrac{8/(3\\sqrt{3})}{0} \\quad(\\text{not defined}) \\end{aligned}",
          "fallback": "LHS = tan 90° (not defined); RHS denominator = 1 − 3(1/√3)² = 1 − 1 = 0 (not defined)",
          "display": true
        }
      }
    ],
    "answer": "At θ = 30°, neither side has a value. Equality cannot be checked at this angle.",
    "answerMath": {
      "latex": "\\theta=30^\\circ:\\quad\\text{both expressions have no value}",
      "fallback": "At θ = 30°, neither side has a value. Equality cannot be checked at this angle.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q7(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q8-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Elimination of Angles",
      "ta": "முக்கோணவியல் — நிபந்தனை முற்றொருமைகள்"
    },
    "label": {
      "en": "Exercise 6.1 · Q8(i)",
      "ta": "பயிற்சி 6.1 · வினா 8(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given cos α / cos β = m and cos α / sin β = n, prove (m² + n²)cos²β = n²"
    },
    "q": {
      "en": "8. (i) If cos α / cos β = m and cos α / sin β = n, then prove that (m² + n²)cos²β = n²",
      "ta": "8. (i) cos α / cos β = m மற்றும் cos α / sin β = n , எனக் கொண்டு (m² + n²)cos²β = n² என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "8. (i) If ",
        {
          "latex": "\\dfrac{\\cos\\alpha}{\\cos\\beta} = m",
          "fallback": "cos α / cos β = m",
          "display": false
        },
        " and ",
        {
          "latex": "\\dfrac{\\cos\\alpha}{\\sin\\beta} = n",
          "fallback": "cos α / sin β = n",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "(m^2 + n^2)\\cos^2\\beta = n^2",
          "fallback": "(m² + n²)cos²β = n²",
          "display": false
        }
      ],
      "ta": [
        "8. (i) ",
        {
          "latex": "\\dfrac{\\cos\\alpha}{\\cos\\beta} = m",
          "fallback": "cos α / cos β = m",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\dfrac{\\cos\\alpha}{\\sin\\beta} = n",
          "fallback": "cos α / sin β = n",
          "display": false
        },
        " , எனக் கொண்டு ",
        {
          "latex": "(m^2 + n^2)\\cos^2\\beta = n^2",
          "fallback": "(m² + n²)cos²β = n²",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Substitute m = cos α / cos β and n = cos α / sin β into (m² + n²)cos²β, combine fractions inside the bracket using sin²β + cos²β = 1, and cancel cos²β.",
        "eq": "LHS = (cos²α/cos²β + cos²α/sin²β) cos²β",
        "math": {
          "latex": "\\mathrm{LHS} = (m^2 + n^2)\\cos^2\\beta = \\left(\\dfrac{\\cos^2\\alpha}{\\cos^2\\beta} + \\dfrac{\\cos^2\\alpha}{\\sin^2\\beta}\\right)\\cos^2\\beta",
          "fallback": "LHS = (cos²α/cos²β + cos²α/sin²β) cos²β",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Factor out cos²α and add 1/cos²β + 1/sin²β = (sin²β + cos²β)/(cos²β sin²β) = 1/(cos²β sin²β). Multiplying by cos²β cancels cos²β, leaving cos²α/sin²β = n².",
        "eq": "= cos²α [(sin²β + cos²β)/(cos²β sin²β)] cos²β = cos²α/sin²β = n² = RHS",
        "math": {
          "latex": "\\begin{aligned} &= \\cos^2\\alpha\\left(\\dfrac{\\sin^2\\beta + \\cos^2\\beta}{\\cos^2\\beta\\sin^2\\beta}\\right)\\cos^2\\beta \\\\ &= \\dfrac{\\cos^2\\alpha\\cdot 1}{\\sin^2\\beta} = \\left(\\dfrac{\\cos\\alpha}{\\sin\\beta}\\right)^2 = n^2 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "= cos²α [(sin²β + cos²β)/(cos²β sin²β)] cos²β = cos²α/sin²β = n² = RHS",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = n² (where sin β ≠ 0, cos β ≠ 0)",
    "answerMath": {
      "latex": "(m^2 + n^2)\\cos^2\\beta = n^2",
      "fallback": "LHS = RHS = n² (where sin β ≠ 0, cos β ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q8(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q8-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Elimination via sec²θ − tan²θ = 1",
      "ta": "முக்கோணவியல் — நீக்கல் முறை முற்றொருமை"
    },
    "label": {
      "en": "Exercise 6.1 · Q8(ii)",
      "ta": "பயிற்சி 6.1 · வினா 8(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given cot θ + tan θ = x and sec θ − cos θ = y, prove (x²y)^(2/3) − (xy²)^(2/3) = 1"
    },
    "q": {
      "en": "8. (ii) If cot θ + tan θ = x and sec θ − cos θ = y, then prove that (x²y)^(2/3) − (xy²)^(2/3) = 1",
      "ta": "8. (ii) cot θ + tan θ = x மற்றும் sec θ − cos θ = y எனில், (x²y)^(2/3) − (xy²)^(2/3) = 1 என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "8. (ii) If ",
        {
          "latex": "\\cot\\theta + \\tan\\theta = x",
          "fallback": "cot θ + tan θ = x",
          "display": false
        },
        " and ",
        {
          "latex": "\\sec\\theta - \\cos\\theta = y",
          "fallback": "sec θ − cos θ = y",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "(x^2y)^{\\frac{2}{3}} - (xy^2)^{\\frac{2}{3}} = 1",
          "fallback": "(x²y)^(2/3) − (xy²)^(2/3) = 1",
          "display": false
        }
      ],
      "ta": [
        "8. (ii) ",
        {
          "latex": "\\cot\\theta + \\tan\\theta = x",
          "fallback": "cot θ + tan θ = x",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\sec\\theta - \\cos\\theta = y",
          "fallback": "sec θ − cos θ = y",
          "display": false
        },
        " எனில், ",
        {
          "latex": "(x^2y)^{\\frac{2}{3}} - (xy^2)^{\\frac{2}{3}} = 1",
          "fallback": "(x²y)^(2/3) − (xy²)^(2/3) = 1",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Simplify x = 1/(sin θ cos θ) and y = sin²θ/cos θ. Then x²y = 1/cos³θ = sec³θ and xy² = sin³θ/cos³θ = tan³θ, so raising both cubes to the 2/3 power produces sec²θ − tan²θ = 1.",
        "eq": "x = 1/(sin θ cos θ) and y = sin²θ/cos θ",
        "math": {
          "latex": "\\begin{aligned} x &= \\dfrac{\\cos\\theta}{\\sin\\theta} + \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{\\cos^2\\theta+\\sin^2\\theta}{\\sin\\theta\\cos\\theta} = \\dfrac{1}{\\sin\\theta\\cos\\theta} \\\\ y &= \\dfrac{1}{\\cos\\theta} - \\cos\\theta = \\dfrac{1-\\cos^2\\theta}{\\cos\\theta} = \\dfrac{\\sin^2\\theta}{\\cos\\theta} \\end{aligned}",
          "fallback": "x = 1/(sin θ cos θ) and y = sin²θ/cos θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply x²y and xy² carefully to spot exact cubes: in x²y, sin²θ cancels completely to leave sec³θ; in xy², sin⁴θ/sin θ leaves sin³θ/cos³θ = tan³θ. Raising a cube to exponent 2/3 cancels the 3 in the exponent.",
        "eq": "(x²y)^(2/3) − (xy²)^(2/3) = (sec³θ)^(2/3) − (tan³θ)^(2/3) = sec²θ − tan²θ = 1",
        "math": {
          "latex": "\\begin{aligned} x^2y &= \\dfrac{1}{\\sin^2\\theta\\cos^2\\theta}\\cdot\\dfrac{\\sin^2\\theta}{\\cos\\theta} = \\dfrac{1}{\\cos^3\\theta} = \\sec^3\\theta \\\\ xy^2 &= \\dfrac{1}{\\sin\\theta\\cos\\theta}\\cdot\\dfrac{\\sin^4\\theta}{\\cos^2\\theta} = \\dfrac{\\sin^3\\theta}{\\cos^3\\theta} = \\tan^3\\theta \\\\ \\mathrm{LHS} &= (\\sec^3\\theta)^{\\frac{2}{3}} - (\\tan^3\\theta)^{\\frac{2}{3}} = \\sec^2\\theta - \\tan^2\\theta = 1 = \\mathrm{RHS} \\end{aligned}",
          "fallback": "(x²y)^(2/3) − (xy²)^(2/3) = (sec³θ)^(2/3) − (tan³θ)^(2/3) = sec²θ − tan²θ = 1",
          "display": true
        }
      }
    ],
    "answer": "LHS = RHS = 1 (where sin θ ≠ 0, cos θ ≠ 0)",
    "answerMath": {
      "latex": "(x^2y)^{\\frac{2}{3}} - (xy^2)^{\\frac{2}{3}} = 1",
      "fallback": "LHS = RHS = 1 (where sin θ ≠ 0, cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q8(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q9-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Symmetric Relations",
      "ta": "முக்கோணவியல் — சமச்சீர் தொடர்புகள்"
    },
    "label": {
      "en": "Exercise 6.1 · Q9(i)",
      "ta": "பயிற்சி 6.1 · வினா 9(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given sin θ + cos θ = p and sec θ + cosec θ = q, prove q(p² − 1) = 2p"
    },
    "q": {
      "en": "9. (i) If sin θ + cos θ = p and sec θ + cosec θ = q, then prove that q(p² − 1) = 2p",
      "ta": "9. (i) sin θ + cos θ = p மற்றும் sec θ + cosec θ = q எனில், q(p² − 1) = 2p என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "9. (i) If ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = p",
          "fallback": "sin θ + cos θ = p",
          "display": false
        },
        " and ",
        {
          "latex": "\\sec\\theta + \\operatorname{cosec}\\theta = q",
          "fallback": "sec θ + cosec θ = q",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "q(p^2 - 1) = 2p",
          "fallback": "q(p² − 1) = 2p",
          "display": false
        }
      ],
      "ta": [
        "9. (i) ",
        {
          "latex": "\\sin\\theta + \\cos\\theta = p",
          "fallback": "sin θ + cos θ = p",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\sec\\theta + \\operatorname{cosec}\\theta = q",
          "fallback": "sec θ + cosec θ = q",
          "display": false
        },
        " எனில், ",
        {
          "latex": "q(p^2 - 1) = 2p",
          "fallback": "q(p² − 1) = 2p",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Simplify q = (sin θ + cos θ)/(sin θ cos θ) = p/(sin θ cos θ) and expand p² − 1 = 2 sin θ cos θ. Multiplying q and (p² − 1) cancels sin θ cos θ, giving 2p.",
        "eq": "p² − 1 = (sin θ + cos θ)² − 1 = 2 sin θ cos θ; q = p/(sin θ cos θ)",
        "math": {
          "latex": "\\begin{aligned} p^2 - 1 &= \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta - 1 = 2\\sin\\theta\\cos\\theta \\\\ q &= \\dfrac{1}{\\cos\\theta} + \\dfrac{1}{\\sin\\theta} = \\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta\\cos\\theta} = \\dfrac{p}{\\sin\\theta\\cos\\theta} \\end{aligned}",
          "fallback": "p² − 1 = (sin θ + cos θ)² − 1 = 2 sin θ cos θ; q = p/(sin θ cos θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply the two simplified expressions together: the product sin θ cos θ in the denominator of q cancels directly with the factor sin θ cos θ in (p² − 1).",
        "eq": "q(p² − 1) = [p/(sin θ cos θ)](2 sin θ cos θ) = 2p",
        "math": {
          "latex": "q(p^2 - 1) = \\left(\\dfrac{p}{\\sin\\theta\\cos\\theta}\\right)(2\\sin\\theta\\cos\\theta) = 2p = \\mathrm{RHS}",
          "fallback": "q(p² − 1) = [p/(sin θ cos θ)](2 sin θ cos θ) = 2p",
          "display": true
        }
      }
    ],
    "answer": "q(p² − 1) = 2p (where sin θ ≠ 0, cos θ ≠ 0)",
    "answerMath": {
      "latex": "q(p^2 - 1) = 2p",
      "fallback": "q(p² − 1) = 2p (where sin θ ≠ 0, cos θ ≠ 0)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q9(i). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q9-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Converting Equation to Powers of cos θ",
      "ta": "முக்கோணவியல் — கொசைன் அடுக்கு வடிவ சமன்பாடு"
    },
    "label": {
      "en": "Exercise 6.1 · Q9(ii)",
      "ta": "பயிற்சி 6.1 · வினா 9(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given sin θ(1 + sin²θ) = cos²θ, prove cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4"
    },
    "q": {
      "en": "9. (ii) If sin θ(1 + sin²θ) = cos²θ, then prove that cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4",
      "ta": "9. (ii) sin θ(1 + sin²θ) = cos²θ எனில், cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4 என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "9. (ii) If ",
        {
          "latex": "\\sin\\theta(1+\\sin^2\\theta) = \\cos^2\\theta",
          "fallback": "sin θ(1 + sin²θ) = cos²θ",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "\\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta = 4",
          "fallback": "cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4",
          "display": false
        }
      ],
      "ta": [
        "9. (ii) ",
        {
          "latex": "\\sin\\theta(1+\\sin^2\\theta) = \\cos^2\\theta",
          "fallback": "sin θ(1 + sin²θ) = cos²θ",
          "display": false
        },
        " எனில், ",
        {
          "latex": "\\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta = 4",
          "fallback": "cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Replace sin²θ inside the bracket by 1 − cos²θ to get sin θ(2 − cos²θ) = cos²θ, square both sides so the remaining sin²θ also converts to 1 − cos²θ, expand, and collect terms.",
        "eq": "sin θ(2 − cos²θ) = cos²θ; squaring gives (1 − cos²θ)(2 − cos²θ)² = cos⁴θ",
        "math": {
          "latex": "\\begin{aligned} \\sin\\theta(1 + 1 - \\cos^2\\theta) &= \\cos^2\\theta \\\\ \\sin\\theta(2 - \\cos^2\\theta) &= \\cos^2\\theta \\\\ \\sin^2\\theta(2 - \\cos^2\\theta)^2 &= \\cos^4\\theta \\\\ (1 - \\cos^2\\theta)(4 - 4\\cos^2\\theta + \\cos^4\\theta) &= \\cos^4\\theta \\end{aligned}",
          "fallback": "sin θ(2 − cos²θ) = cos²θ; squaring gives (1 − cos²θ)(2 − cos²θ)² = cos⁴θ",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply out (1 − c)(4 − 4c + c²) where c = cos²θ carefully: 4 − 8c + 5c² − c³ = c². Subtract c² and rearrange to move −c³ to positive leading coefficient.",
        "eq": "4 − 8 cos²θ + 4 cos⁴θ − cos⁶θ = 0 gives cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4",
        "math": {
          "latex": "\\begin{aligned} 4 - 8\\cos^2\\theta + 5\\cos^4\\theta - \\cos^6\\theta &= \\cos^4\\theta \\\\ 4 - 8\\cos^2\\theta + 4\\cos^4\\theta - \\cos^6\\theta &= 0 \\\\ \\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta &= 4 \\end{aligned}",
          "fallback": "4 − 8 cos²θ + 4 cos⁴θ − cos⁶θ = 0 gives cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4",
          "display": true
        }
      }
    ],
    "answer": "cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4 (proved)",
    "answerMath": {
      "latex": "\\cos^6\\theta - 4\\cos^4\\theta + 8\\cos^2\\theta = 4",
      "fallback": "cos⁶θ − 4 cos⁴θ + 8 cos²θ = 4 (proved)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q9(ii). EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  },
  {
    "id": "c10-6-ex6-1-q10",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.1",
    "topic": {
      "en": "Trigonometry — Ratio Proportion & Identity",
      "ta": "முக்கோணவியல் — விகித சமன்பாடு"
    },
    "label": {
      "en": "Exercise 6.1 · Q10",
      "ta": "பயிற்சி 6.1 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Given cos θ / (1 + sin θ) = 1/a, prove (a² − 1)/(a² + 1) = sin θ"
    },
    "q": {
      "en": "10. If cos θ / (1 + sin θ) = 1/a, then prove that (a² − 1)/(a² + 1) = sin θ",
      "ta": "10. cos θ / (1 + sin θ) = 1/a எனில், (a² − 1)/(a² + 1) = sin θ என்பதை நிரூபிக்கவும்."
    },
    "questionMath": {
      "en": [
        "10. If ",
        {
          "latex": "\\dfrac{\\cos\\theta}{1+\\sin\\theta} = \\dfrac{1}{a}",
          "fallback": "cos θ / (1 + sin θ) = 1/a",
          "display": false
        },
        ", then prove that ",
        {
          "latex": "\\dfrac{a^2 - 1}{a^2 + 1} = \\sin\\theta",
          "fallback": "(a² − 1)/(a² + 1) = sin θ",
          "display": false
        }
      ],
      "ta": [
        "10. ",
        {
          "latex": "\\dfrac{\\cos\\theta}{1+\\sin\\theta} = \\dfrac{1}{a}",
          "fallback": "cos θ / (1 + sin θ) = 1/a",
          "display": false
        },
        " எனில், ",
        {
          "latex": "\\dfrac{a^2 - 1}{a^2 + 1} = \\sin\\theta",
          "fallback": "(a² − 1)/(a² + 1) = sin θ",
          "display": false
        },
        " என்பதை நிரூபிக்கவும்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Take reciprocals to get a = (1 + sin θ)/cos θ, square to express a² = (1 + sin θ)/(1 − sin θ) using cos²θ = (1 − sin θ)(1 + sin θ), and substitute into (a² − 1)/(a² + 1) to simplify to sin θ.",
        "eq": "a = (1 + sin θ)/cos θ gives a² = (1 + sin θ)²/(1 − sin²θ) = (1 + sin θ)/(1 − sin θ)",
        "math": {
          "latex": "\\begin{aligned} a &= \\dfrac{1+\\sin\\theta}{\\cos\\theta} \\\\ a^2 &= \\dfrac{(1+\\sin\\theta)^2}{\\cos^2\\theta} = \\dfrac{(1+\\sin\\theta)^2}{(1-\\sin\\theta)(1+\\sin\\theta)} = \\dfrac{1+\\sin\\theta}{1-\\sin\\theta} \\end{aligned}",
          "fallback": "a = (1 + sin θ)/cos θ gives a² = (1 + sin θ)²/(1 − sin²θ) = (1 + sin θ)/(1 − sin θ)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute a² = (1 + sin θ)/(1 − sin θ) into (a² − 1)/(a² + 1) and clear the common denominator (1 − sin θ) top and bottom: (1 + sin θ − 1 + sin θ)/(1 + sin θ + 1 − sin θ) = 2 sin θ / 2 = sin θ.",
        "eq": "(a² − 1)/(a² + 1) = [(1 + sin θ) − (1 − sin θ)] / [(1 + sin θ) + (1 − sin θ)] = 2 sin θ / 2 = sin θ",
        "math": {
          "latex": "\\begin{aligned} \\dfrac{a^2 - 1}{a^2 + 1} &= \\dfrac{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta} - 1}{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta} + 1} = \\dfrac{(1+\\sin\\theta)-(1-\\sin\\theta)}{(1+\\sin\\theta)+(1-\\sin\\theta)} \\\\ &= \\dfrac{2\\sin\\theta}{2} = \\sin\\theta = \\mathrm{RHS} \\end{aligned}",
          "fallback": "(a² − 1)/(a² + 1) = [(1 + sin θ) − (1 − sin θ)] / [(1 + sin θ) + (1 − sin θ)] = 2 sin θ / 2 = sin θ",
          "display": true
        }
      }
    ],
    "answer": "(a² − 1)/(a² + 1) = sin θ (where cos θ ≠ 0, sin θ ≠ ±1)",
    "answerMath": {
      "latex": "\\dfrac{a^2 - 1}{a^2 + 1} = \\sin\\theta",
      "fallback": "(a² − 1)/(a² + 1) = sin θ (where cos θ ≠ 0, sin θ ≠ ±1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.1 Q10. EN printed p. 250 (PDF p. 256); TA printed p. 258 (PDF p. 264).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 256,
        "ta": 264
      }
    }
  }
];

const grade = window.TRIGGLE_CLASSES[10];
const chapter = window.TRIGGLE_CURRICULUM.grades.find(({ grade }) => grade === 10)
  .chapters.find(({ number }) => number === 6);
chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];
for (const entry of entries) {
  if (grade.items.some(({ id }) => id === entry.id)) throw new Error('Duplicate Grade 10 Trigonometry question: ' + entry.id);
  grade.items.push(entry);
  if (!chapter.textbookQuestionIds.includes(entry.id)) chapter.textbookQuestionIds.push(entry.id);
}
})();
