/* Grade 10 Ch 3 Ex 3.5 (Q1(i)-(iii), Q2(i)-(ii), Q3(i)-(iv), Q4, Q5) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 107 (printed p. 101), Tamil PDF p. 109 (printed p. 103),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-5-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q1(i)",
      "ta": "Exercise 3.5 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify (4x²y / 2z²) × (6xz³ / 20y⁴)"
    },
    "q": {
      "en": "Simplify (i) (4x²y)/(2z²) × (6xz³)/(20y⁴)"
    },
    "questionMath": {
      "en": [
        "Simplify (i) ",
        {
          "latex": "\\dfrac{4x^2y}{2z^2}\\times\\dfrac{6xz^3}{20y^4}",
          "fallback": "(4x²y)/(2z²) × (6xz³)/(20y⁴)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Multiply the numerators together and the denominators together, combining powers of identical variables.",
        "eq": "[(4 × 6) x^(2+1) y z³] / [(2 × 20) y⁴ z²] = (24x³yz³) / (40y⁴z²)",
        "math": {
          "latex": "\\dfrac{(4\\times 6)x^{2+1}yz^3}{(2\\times 20)y^4z^2}=\\dfrac{24x^3yz^3}{40y^4z^2}",
          "fallback": "[(4 × 6) x^(2+1) y z³] / [(2 × 20) y⁴ z²] = (24x³yz³) / (40y⁴z²)",
          "display": true
        }
      },
      {
        "en": "Divide the numerical coefficients 24 and 40 by 8, and cancel the common factors y and z² between the numerator and denominator. Therefore, the simplified expression is (3x³z)/(5y³).",
        "eq": "= (3x³z)/(5y³)",
        "math": {
          "latex": "=\\dfrac{3x^3z}{5y^3}",
          "fallback": "= (3x³z)/(5y³)",
          "display": true
        }
      }
    ],
    "answer": "(3x³z)/(5y³)",
    "answerMath": {
      "latex": "\\dfrac{3x^3z}{5y^3}",
      "fallback": "(3x³z)/(5y³)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q1(i); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q1(ii)",
      "ta": "Exercise 3.5 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(p² − 10p + 21) / (p − 7)] × [(p² + p − 12) / (p − 3)²]"
    },
    "q": {
      "en": "Simplify (ii) (p² − 10p + 21)/(p − 7) × (p² + p − 12)/(p − 3)²"
    },
    "questionMath": {
      "en": [
        "Simplify (ii) ",
        {
          "latex": "\\dfrac{p^2-10p+21}{p-7}\\times\\dfrac{p^2+p-12}{(p-3)^2}",
          "fallback": "(p² − 10p + 21)/(p − 7) × (p² + p − 12)/(p − 3)²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize both quadratic numerators: p² − 10p + 21 = (p − 7)(p − 3) and p² + p − 12 = (p + 4)(p − 3).",
        "eq": "[(p − 7)(p − 3)] / (p − 7) × [(p + 4)(p − 3)] / (p − 3)²",
        "math": {
          "latex": "\\dfrac{(p-7)(p-3)}{p-7}\\times\\dfrac{(p+4)(p-3)}{(p-3)^2}",
          "fallback": "[(p − 7)(p − 3)] / (p − 7) × [(p + 4)(p − 3)] / (p − 3)²",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (p − 7) and (p − 3)² from the numerator and denominator. Therefore, the simplified expression is p + 4.",
        "eq": "= p + 4",
        "math": {
          "latex": "=p+4",
          "fallback": "= p + 4",
          "display": true
        }
      }
    ],
    "answer": "p + 4",
    "answerMath": {
      "latex": "p+4",
      "fallback": "p + 4",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q1(ii); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q1(iii)",
      "ta": "Exercise 3.5 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [5t³ / (4t − 8)] × [(6t − 12) / 10t]"
    },
    "q": {
      "en": "Simplify (iii) (5t³)/(4t − 8) × (6t − 12)/(10t)"
    },
    "questionMath": {
      "en": [
        "Simplify (iii) ",
        {
          "latex": "\\dfrac{5t^3}{4t-8}\\times\\dfrac{6t-12}{10t}",
          "fallback": "(5t³)/(4t − 8) × (6t − 12)/(10t)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out 4 from the denominator 4t − 8 and factor out 6 from the numerator 6t − 12.",
        "eq": "(5t³)/[4(t − 2)] × [6(t − 2)]/(10t)",
        "math": {
          "latex": "\\dfrac{5t^3}{4(t-2)}\\times\\dfrac{6(t-2)}{10t}",
          "fallback": "(5t³)/[4(t − 2)] × [6(t − 2)]/(10t)",
          "display": true
        }
      },
      {
        "en": "Cancel the common factor (t − 2), cancel 5t between 5t³ and 10t, and simplify 6 / (4 × 2) = 3/4. Therefore, the simplified expression is 3t²/4.",
        "eq": "= (30t³)/(40t) = (3t²)/4",
        "math": {
          "latex": "=\\dfrac{30t^3}{40t}=\\dfrac{3t^2}{4}",
          "fallback": "= (30t³)/(40t) = (3t²)/4",
          "display": true
        }
      }
    ],
    "answer": "(3t²)/4",
    "answerMath": {
      "latex": "\\dfrac{3t^2}{4}",
      "fallback": "(3t²)/4",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q1(iii); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q2(i)",
      "ta": "Exercise 3.5 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(x + 4) / (3x + 4y)] × [(9x² − 16y²) / (2x² + 3x − 20)]"
    },
    "q": {
      "en": "Simplify (i) (x + 4)/(3x + 4y) × (9x² − 16y²)/(2x² + 3x − 20)"
    },
    "questionMath": {
      "en": [
        "Simplify (i) ",
        {
          "latex": "\\dfrac{x+4}{3x+4y}\\times\\dfrac{9x^2-16y^2}{2x^2+3x-20}",
          "fallback": "(x + 4)/(3x + 4y) × (9x² − 16y²)/(2x² + 3x − 20)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize 9x² − 16y² = (3x)² − (4y)² as (3x + 4y)(3x − 4y), and factorize 2x² + 3x − 20 into (2x − 5)(x + 4).",
        "eq": "(x + 4)/(3x + 4y) × [(3x + 4y)(3x − 4y)] / [(2x − 5)(x + 4)]",
        "math": {
          "latex": "\\dfrac{x+4}{3x+4y}\\times\\dfrac{(3x+4y)(3x-4y)}{(2x-5)(x+4)}",
          "fallback": "(x + 4)/(3x + 4y) × [(3x + 4y)(3x − 4y)] / [(2x − 5)(x + 4)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (x + 4) and (3x + 4y). Therefore, the simplified expression is (3x − 4y)/(2x − 5).",
        "eq": "= (3x − 4y)/(2x − 5)",
        "math": {
          "latex": "=\\dfrac{3x-4y}{2x-5}",
          "fallback": "= (3x − 4y)/(2x − 5)",
          "display": true
        }
      }
    ],
    "answer": "(3x − 4y)/(2x − 5)",
    "answerMath": {
      "latex": "\\dfrac{3x-4y}{2x-5}",
      "fallback": "(3x − 4y)/(2x − 5)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q2(i); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q2(ii)",
      "ta": "Exercise 3.5 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(x³ − y³) / (3x² + 9xy + 6y²)] × [(x² + 2xy + y²) / (x² − y²)]"
    },
    "q": {
      "en": "Simplify (ii) (x³ − y³)/(3x² + 9xy + 6y²) × (x² + 2xy + y²)/(x² − y²)"
    },
    "questionMath": {
      "en": [
        "Simplify (ii) ",
        {
          "latex": "\\dfrac{x^3-y^3}{3x^2+9xy+6y^2}\\times\\dfrac{x^2+2xy+y^2}{x^2-y^2}",
          "fallback": "(x³ − y³)/(3x² + 9xy + 6y²) × (x² + 2xy + y²)/(x² − y²)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize each polynomial: x³ − y³ = (x − y)(x² + xy + y²), 3x² + 9xy + 6y² = 3(x + y)(x + 2y), x² + 2xy + y² = (x + y)², and x² − y² = (x − y)(x + y).",
        "eq": "[(x − y)(x² + xy + y²)] / [3(x + y)(x + 2y)] × (x + y)² / [(x − y)(x + y)]",
        "math": {
          "latex": "\\dfrac{(x-y)(x^2+xy+y^2)}{3(x+y)(x+2y)}\\times\\dfrac{(x+y)^2}{(x-y)(x+y)}",
          "fallback": "[(x − y)(x² + xy + y²)] / [3(x + y)(x + 2y)] × (x + y)² / [(x − y)(x + y)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (x − y) and (x + y)² from the numerator and denominator. Therefore, the simplified expression is (x² + xy + y²)/[3(x + 2y)].",
        "eq": "= (x² + xy + y²)/[3(x + 2y)]",
        "math": {
          "latex": "=\\dfrac{x^2+xy+y^2}{3(x+2y)}",
          "fallback": "= (x² + xy + y²)/[3(x + 2y)]",
          "display": true
        }
      }
    ],
    "answer": "(x² + xy + y²)/[3(x + 2y)]",
    "answerMath": {
      "latex": "\\dfrac{x^2+xy+y^2}{3(x+2y)}",
      "fallback": "(x² + xy + y²)/[3(x + 2y)]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q2(ii); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q3-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q3(i)",
      "ta": "Exercise 3.5 · Q3(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(2a² + 5a + 3) / (2a² + 7a + 6)] ÷ [(a² + 6a + 5) / (−5a² − 35a − 50)]"
    },
    "q": {
      "en": "Simplify (i) (2a² + 5a + 3)/(2a² + 7a + 6) ÷ (a² + 6a + 5)/(−5a² − 35a − 50)"
    },
    "questionMath": {
      "en": [
        "Simplify (i) ",
        {
          "latex": "\\dfrac{2a^2+5a+3}{2a^2+7a+6}\\div\\dfrac{a^2+6a+5}{-5a^2-35a-50}",
          "fallback": "(2a² + 5a + 3)/(2a² + 7a + 6) ÷ (a² + 6a + 5)/(−5a² − 35a − 50)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Rewrite division by the second fraction as multiplication by its reciprocal, and factorize all four polynomials.",
        "eq": "[(2a + 3)(a + 1)] / [(2a + 3)(a + 2)] × [−5(a + 5)(a + 2)] / [(a + 5)(a + 1)]",
        "math": {
          "latex": "\\dfrac{(2a+3)(a+1)}{(2a+3)(a+2)}\\times\\dfrac{-5(a+5)(a+2)}{(a+5)(a+1)}",
          "fallback": "[(2a + 3)(a + 1)] / [(2a + 3)(a + 2)] × [−5(a + 5)(a + 2)] / [(a + 5)(a + 1)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (2a + 3), (a + 1), (a + 2), and (a + 5). Therefore, the simplified value is −5.",
        "eq": "= −5",
        "math": {
          "latex": "=-5",
          "fallback": "= −5",
          "display": true
        }
      }
    ],
    "answer": "−5",
    "answerMath": {
      "latex": "-5",
      "fallback": "−5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q3(i); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q3-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q3(ii)",
      "ta": "Exercise 3.5 · Q3(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(b² + 3b − 28) / (b² + 4b + 4)] ÷ [(b² − 49) / (b² − 5b − 14)]"
    },
    "q": {
      "en": "Simplify (ii) (b² + 3b − 28)/(b² + 4b + 4) ÷ (b² − 49)/(b² − 5b − 14)"
    },
    "questionMath": {
      "en": [
        "Simplify (ii) ",
        {
          "latex": "\\dfrac{b^2+3b-28}{b^2+4b+4}\\div\\dfrac{b^2-49}{b^2-5b-14}",
          "fallback": "(b² + 3b − 28)/(b² + 4b + 4) ÷ (b² − 49)/(b² − 5b − 14)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Convert division into multiplication by the reciprocal and factorize each quadratic expression: b² + 3b − 28 = (b + 7)(b − 4), b² + 4b + 4 = (b + 2)², b² − 5b − 14 = (b − 7)(b + 2), and b² − 49 = (b − 7)(b + 7).",
        "eq": "[(b + 7)(b − 4)] / (b + 2)² × [(b − 7)(b + 2)] / [(b − 7)(b + 7)]",
        "math": {
          "latex": "\\dfrac{(b+7)(b-4)}{(b+2)^2}\\times\\dfrac{(b-7)(b+2)}{(b-7)(b+7)}",
          "fallback": "[(b + 7)(b − 4)] / (b + 2)² × [(b − 7)(b + 2)] / [(b − 7)(b + 7)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (b + 7), (b − 7), and (b + 2). Therefore, the simplified expression is (b − 4)/(b + 2).",
        "eq": "= (b − 4)/(b + 2)",
        "math": {
          "latex": "=\\dfrac{b-4}{b+2}",
          "fallback": "= (b − 4)/(b + 2)",
          "display": true
        }
      }
    ],
    "answer": "(b − 4)/(b + 2)",
    "answerMath": {
      "latex": "\\dfrac{b-4}{b+2}",
      "fallback": "(b − 4)/(b + 2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q3(ii); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q3-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q3(iii)",
      "ta": "Exercise 3.5 · Q3(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(x + 2) / 4y] ÷ [(x² − x − 6) / 12y²]"
    },
    "q": {
      "en": "Simplify (iii) (x + 2)/(4y) ÷ (x² − x − 6)/(12y²)"
    },
    "questionMath": {
      "en": [
        "Simplify (iii) ",
        {
          "latex": "\\dfrac{x+2}{4y}\\div\\dfrac{x^2-x-6}{12y^2}",
          "fallback": "(x + 2)/(4y) ÷ (x² − x − 6)/(12y²)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Multiply by the reciprocal of the second rational expression and factorize x² − x − 6 into (x − 3)(x + 2).",
        "eq": "(x + 2)/(4y) × (12y²)/[(x − 3)(x + 2)]",
        "math": {
          "latex": "\\dfrac{x+2}{4y}\\times\\dfrac{12y^2}{(x-3)(x+2)}",
          "fallback": "(x + 2)/(4y) × (12y²)/[(x − 3)(x + 2)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (x + 2) and 4y (since 12y² / 4y = 3y). Therefore, the simplified expression is (3y)/(x − 3).",
        "eq": "= (3y)/(x − 3)",
        "math": {
          "latex": "=\\dfrac{3y}{x-3}",
          "fallback": "= (3y)/(x − 3)",
          "display": true
        }
      }
    ],
    "answer": "(3y)/(x − 3)",
    "answerMath": {
      "latex": "\\dfrac{3y}{x-3}",
      "fallback": "(3y)/(x − 3)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q3(iii); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q3-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q3(iv)",
      "ta": "Exercise 3.5 · Q3(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify [(12t² − 22t + 8) / 3t] ÷ [(3t² + 2t − 8) / (2t² + 4t)]"
    },
    "q": {
      "en": "Simplify (iv) (12t² − 22t + 8)/(3t) ÷ (3t² + 2t − 8)/(2t² + 4t)"
    },
    "questionMath": {
      "en": [
        "Simplify (iv) ",
        {
          "latex": "\\dfrac{12t^2-22t+8}{3t}\\div\\dfrac{3t^2+2t-8}{2t^2+4t}",
          "fallback": "(12t² − 22t + 8)/(3t) ÷ (3t² + 2t − 8)/(2t² + 4t)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Multiply by the reciprocal of the divisor and factorize each polynomial: 12t² − 22t + 8 = 2(3t − 4)(2t − 1), 2t² + 4t = 2t(t + 2), and 3t² + 2t − 8 = (3t − 4)(t + 2).",
        "eq": "[2(3t − 4)(2t − 1)] / (3t) × [2t(t + 2)] / [(3t − 4)(t + 2)]",
        "math": {
          "latex": "\\dfrac{2(3t-4)(2t-1)}{3t}\\times\\dfrac{2t(t+2)}{(3t-4)(t+2)}",
          "fallback": "[2(3t − 4)(2t − 1)] / (3t) × [2t(t + 2)] / [(3t − 4)(t + 2)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors t, (3t − 4), and (t + 2). Multiplying the remaining factors gives 4(2t − 1)/3.",
        "eq": "= [4(2t − 1)]/3",
        "math": {
          "latex": "=\\dfrac{4(2t-1)}{3}",
          "fallback": "= [4(2t − 1)]/3",
          "display": true
        }
      }
    ],
    "answer": "4(2t − 1)/3",
    "answerMath": {
      "latex": "\\dfrac{4(2t-1)}{3}",
      "fallback": "4(2t − 1)/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q3(iv); printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q4",
      "ta": "Exercise 3.5 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the value of x²y⁻² given rational expressions for x and y"
    },
    "q": {
      "en": "If x = (a² + 3a − 4)/(3a² − 3) and y = (a² + 2a − 8)/(2a² − 2a − 4) find the value of x²y⁻²."
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "x=\\dfrac{a^2+3a-4}{3a^2-3}",
          "fallback": "x = (a² + 3a − 4)/(3a² − 3)",
          "display": false
        },
        " and ",
        {
          "latex": "y=\\dfrac{a^2+2a-8}{2a^2-2a-4}",
          "fallback": "y = (a² + 2a − 8)/(2a² − 2a − 4)",
          "display": false
        },
        " find the value of ",
        {
          "latex": "x^2y^{-2}.",
          "fallback": "x²y⁻².",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize and simplify x and y separately to their lowest forms.",
        "eq": "x = [(a + 4)(a − 1)] / [3(a + 1)(a − 1)] = (a + 4)/[3(a + 1)]; y = [(a + 4)(a − 2)] / [2(a − 2)(a + 1)] = (a + 4)/[2(a + 1)]",
        "math": {
          "latex": "\\begin{aligned}x&=\\dfrac{(a+4)(a-1)}{3(a+1)(a-1)}=\\dfrac{a+4}{3(a+1)}\\\\y&=\\dfrac{(a+4)(a-2)}{2(a-2)(a+1)}=\\dfrac{a+4}{2(a+1)}\\end{aligned}",
          "fallback": "x = [(a + 4)(a − 1)] / [3(a + 1)(a − 1)] = (a + 4)/[3(a + 1)]; y = [(a + 4)(a − 2)] / [2(a − 2)(a + 1)] = (a + 4)/[2(a + 1)]",
          "display": true
        }
      },
      {
        "en": "Rewrite x²y⁻² as (x / y)² and divide x by y.",
        "eq": "x/y = [(a + 4)/(3(a + 1))] × [(2(a + 1))/(a + 4)] = 2/3",
        "math": {
          "latex": "\\dfrac{x}{y}=\\dfrac{a+4}{3(a+1)}\\times\\dfrac{2(a+1)}{a+4}=\\dfrac{2}{3}",
          "fallback": "x/y = [(a + 4)/(3(a + 1))] × [(2(a + 1))/(a + 4)] = 2/3",
          "display": true
        }
      },
      {
        "en": "Square x/y to find x²y⁻². Therefore, the value of x²y⁻² is 4/9.",
        "eq": "x²y⁻² = (x/y)² = (2/3)² = 4/9",
        "math": {
          "latex": "x^2y^{-2}=\\left(\\dfrac{x}{y}\\right)^2=\\left(\\dfrac{2}{3}\\right)^2=\\dfrac{4}{9}",
          "fallback": "x²y⁻² = (x/y)² = (2/3)² = 4/9",
          "display": true
        }
      }
    ],
    "answer": "4/9",
    "answerMath": {
      "latex": "\\dfrac{4}{9}",
      "fallback": "4/9",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q4; printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-5-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.5",
    "topic": {
      "en": "Algebra — Operations of Rational Expressions (Multiplication and Division)"
    },
    "label": {
      "en": "Exercise 3.5 · Q5",
      "ta": "Exercise 3.5 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the divisor polynomial q(x) when p(x) = x² − 5x − 14 divided by q(x) gives (x − 7)/(x + 2)"
    },
    "q": {
      "en": "If a polynomial p(x) = x² − 5x − 14 is divided by another polynomial q(x) we get (x − 7)/(x + 2), find q(x)."
    },
    "questionMath": {
      "en": [
        "If a polynomial ",
        {
          "latex": "p(x)=x^2-5x-14",
          "fallback": "p(x) = x² − 5x − 14",
          "display": false
        },
        " is divided by another polynomial ",
        {
          "latex": "q(x)",
          "fallback": "q(x)",
          "display": false
        },
        " we get ",
        {
          "latex": "\\dfrac{x-7}{x+2},",
          "fallback": "(x − 7)/(x + 2),",
          "display": false
        },
        " find ",
        {
          "latex": "q(x).",
          "fallback": "q(x).",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the given division relationship p(x) / q(x) = (x − 7)/(x + 2) and factorize p(x) = x² − 5x − 14 into (x − 7)(x + 2).",
        "eq": "p(x)/q(x) = (x − 7)/(x + 2) ⇒ [(x − 7)(x + 2)] / q(x) = (x − 7)/(x + 2)",
        "math": {
          "latex": "\\dfrac{p(x)}{q(x)}=\\dfrac{x-7}{x+2}\\implies\\dfrac{(x-7)(x+2)}{q(x)}=\\dfrac{x-7}{x+2}",
          "fallback": "p(x)/q(x) = (x − 7)/(x + 2) ⇒ [(x − 7)(x + 2)] / q(x) = (x − 7)/(x + 2)",
          "display": true
        }
      },
      {
        "en": "Solve for q(x) by multiplying p(x) by (x + 2)/(x − 7) and cancelling (x − 7).",
        "eq": "q(x) = [(x − 7)(x + 2) × (x + 2)] / (x − 7) = (x + 2)²",
        "math": {
          "latex": "q(x)=\\dfrac{(x-7)(x+2)(x+2)}{x-7}=(x+2)^2",
          "fallback": "q(x) = [(x − 7)(x + 2) × (x + 2)] / (x − 7) = (x + 2)²",
          "display": true
        }
      },
      {
        "en": "Expand (x + 2)² using (a + b)² = a² + 2ab + b². Therefore, the polynomial q(x) is x² + 4x + 4.",
        "eq": "q(x) = x² + 4x + 4",
        "math": {
          "latex": "q(x)=x^2+4x+4",
          "fallback": "q(x) = x² + 4x + 4",
          "display": true
        }
      }
    ],
    "answer": "x² + 4x + 4",
    "answerMath": {
      "latex": "x^2+4x+4",
      "fallback": "x² + 4x + 4",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.5 Q5; printed p. 101, PDF p. 107; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.5 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
