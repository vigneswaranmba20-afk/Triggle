/* Grade 10 Ch 3 Ex 3.6 (Q1(i)-(iii), Q2(i)-(ii), Q3, Q4, Q5, Q6, Q7, Q8) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 109 (printed p. 103), Tamil PDF p. 111 (printed p. 105),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-6-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q1(i)",
      "ta": "Exercise 3.6 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify x(x + 1)/(x − 2) + x(1 − x)/(x − 2)"
    },
    "q": {
      "en": "Simplify (i) x(x + 1)/(x − 2) + x(1 − x)/(x − 2)"
    },
    "questionMath": {
      "en": [
        "Simplify (i) ",
        {
          "latex": "\\dfrac{x(x+1)}{x-2}+\\dfrac{x(1-x)}{x-2}",
          "fallback": "x(x + 1)/(x − 2) + x(1 − x)/(x − 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Since both rational expressions have the same denominator (x − 2), add their numerators over the common denominator (x − 2).",
        "eq": "[x(x + 1) + x(1 − x)] / (x − 2) = (x² + x + x − x²) / (x − 2)",
        "math": {
          "latex": "\\dfrac{x(x+1)+x(1-x)}{x-2}=\\dfrac{x^2+x+x-x^2}{x-2}",
          "fallback": "[x(x + 1) + x(1 − x)] / (x − 2) = (x² + x + x − x²) / (x − 2)",
          "display": true
        }
      },
      {
        "en": "Combine like terms in the numerator (x² − x² = 0 and x + x = 2x). Therefore, the simplified expression is 2x/(x − 2).",
        "eq": "= (2x)/(x − 2)",
        "math": {
          "latex": "=\\dfrac{2x}{x-2}",
          "fallback": "= (2x)/(x − 2)",
          "display": true
        }
      }
    ],
    "answer": "(2x)/(x − 2)",
    "answerMath": {
      "latex": "\\dfrac{2x}{x-2}",
      "fallback": "(2x)/(x − 2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q1(i); printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q1(ii)",
      "ta": "Exercise 3.6 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify (x + 2)/(x + 3) + (x − 1)/(x − 2)"
    },
    "q": {
      "en": "Simplify (ii) (x + 2)/(x + 3) + (x − 1)/(x − 2)"
    },
    "questionMath": {
      "en": [
        "Simplify (ii) ",
        {
          "latex": "\\dfrac{x+2}{x+3}+\\dfrac{x-1}{x-2}",
          "fallback": "(x + 2)/(x + 3) + (x − 1)/(x − 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Take the LCM of the denominators (x + 3)(x − 2) and combine the numerators.",
        "eq": "[(x + 2)(x − 2) + (x − 1)(x + 3)] / [(x + 3)(x − 2)]",
        "math": {
          "latex": "\\dfrac{(x+2)(x-2)+(x-1)(x+3)}{(x+3)(x-2)}",
          "fallback": "[(x + 2)(x − 2) + (x − 1)(x + 3)] / [(x + 3)(x − 2)]",
          "display": true
        }
      },
      {
        "en": "Expand both products in the numerator: (x + 2)(x − 2) = x² − 4 and (x − 1)(x + 3) = x² + 2x − 3, then collect like terms. Therefore, the simplified expression is (2x² + 2x − 7)/[(x + 3)(x − 2)].",
        "eq": "= [(x² − 4) + (x² + 2x − 3)] / [(x + 3)(x − 2)] = (2x² + 2x − 7)/[(x + 3)(x − 2)]",
        "math": {
          "latex": "=\\dfrac{(x^2-4)+(x^2+2x-3)}{(x+3)(x-2)}=\\dfrac{2x^2+2x-7}{(x+3)(x-2)}",
          "fallback": "= [(x² − 4) + (x² + 2x − 3)] / [(x + 3)(x − 2)] = (2x² + 2x − 7)/[(x + 3)(x − 2)]",
          "display": true
        }
      }
    ],
    "answer": "(2x² + 2x − 7)/[(x + 3)(x − 2)]",
    "answerMath": {
      "latex": "\\dfrac{2x^2+2x-7}{(x+3)(x-2)}",
      "fallback": "(2x² + 2x − 7)/[(x + 3)(x − 2)]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q1(ii); printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q1(iii)",
      "ta": "Exercise 3.6 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify x³/(x − y) + y³/(y − x)"
    },
    "q": {
      "en": "Simplify (iii) x³/(x − y) + y³/(y − x)"
    },
    "questionMath": {
      "en": [
        "Simplify (iii) ",
        {
          "latex": "\\dfrac{x^3}{x-y}+\\dfrac{y^3}{y-x}",
          "fallback": "x³/(x − y) + y³/(y − x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Since y − x = −(x − y), rewrite the second fraction with denominator (x − y) by changing the plus sign to a minus sign.",
        "eq": "x³/(x − y) − y³/(x − y) = (x³ − y³)/(x − y)",
        "math": {
          "latex": "\\dfrac{x^3}{x-y}-\\dfrac{y^3}{x-y}=\\dfrac{x^3-y^3}{x-y}",
          "fallback": "x³/(x − y) − y³/(x − y) = (x³ − y³)/(x − y)",
          "display": true
        }
      },
      {
        "en": "Factorize x³ − y³ as (x − y)(x² + xy + y²) and cancel the common factor (x − y). Therefore, the simplified expression is x² + xy + y².",
        "eq": "= [(x − y)(x² + xy + y²)] / (x − y) = x² + xy + y²",
        "math": {
          "latex": "=\\dfrac{(x-y)(x^2+xy+y^2)}{x-y}=x^2+xy+y^2",
          "fallback": "= [(x − y)(x² + xy + y²)] / (x − y) = x² + xy + y²",
          "display": true
        }
      }
    ],
    "answer": "x² + xy + y²",
    "answerMath": {
      "latex": "x^2+xy+y^2",
      "fallback": "x² + xy + y²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q1(iii); printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q2(i)",
      "ta": "Exercise 3.6 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify (2x + 1)(x − 2)/(x − 4) − (2x² − 5x + 2)/(x − 4)"
    },
    "q": {
      "en": "Simplify (i) (2x + 1)(x − 2)/(x − 4) − (2x² − 5x + 2)/(x − 4)"
    },
    "questionMath": {
      "en": [
        "Simplify (i) ",
        {
          "latex": "\\dfrac{(2x+1)(x-2)}{x-4}-\\dfrac{(2x^2-5x+2)}{x-4}",
          "fallback": "(2x + 1)(x − 2)/(x − 4) − (2x² − 5x + 2)/(x − 4)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Expand (2x + 1)(x − 2) = 2x² − 3x − 2 and subtract the second numerator (2x² − 5x + 2) over the common denominator (x − 4).",
        "eq": "[(2x² − 3x − 2) − (2x² − 5x + 2)] / (x − 4) = (2x − 4)/(x − 4)",
        "math": {
          "latex": "\\dfrac{(2x^2-3x-2)-(2x^2-5x+2)}{x-4}=\\dfrac{2x-4}{x-4}",
          "fallback": "[(2x² − 3x − 2) − (2x² − 5x + 2)] / (x − 4) = (2x − 4)/(x − 4)",
          "display": true
        }
      },
      {
        "en": "Factor out 2 from the numerator 2x − 4. Therefore, the simplified expression is 2(x − 2)/(x − 4).",
        "eq": "= 2(x − 2)/(x − 4)",
        "math": {
          "latex": "=\\dfrac{2(x-2)}{x-4}",
          "fallback": "= 2(x − 2)/(x − 4)",
          "display": true
        }
      }
    ],
    "answer": "2(x − 2)/(x − 4)",
    "answerMath": {
      "latex": "\\dfrac{2(x-2)}{x-4}",
      "fallback": "2(x − 2)/(x − 4)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q2(i); printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q2(ii)",
      "ta": "Exercise 3.6 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Simplify 4x/(x² − 1) − (x + 1)/(x − 1)"
    },
    "q": {
      "en": "Simplify (ii) 4x/(x² − 1) − (x + 1)/(x − 1)"
    },
    "questionMath": {
      "en": [
        "Simplify (ii) ",
        {
          "latex": "\\dfrac{4x}{x^2-1}-\\dfrac{x+1}{x-1}",
          "fallback": "4x/(x² − 1) − (x + 1)/(x − 1)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize x² − 1 as (x − 1)(x + 1) so that the common denominator is (x − 1)(x + 1).",
        "eq": "[4x − (x + 1)²] / [(x − 1)(x + 1)] = [4x − (x² + 2x + 1)] / [(x − 1)(x + 1)]",
        "math": {
          "latex": "\\dfrac{4x-(x+1)^2}{(x-1)(x+1)}=\\dfrac{4x-(x^2+2x+1)}{(x-1)(x+1)}",
          "fallback": "[4x − (x + 1)²] / [(x − 1)(x + 1)] = [4x − (x² + 2x + 1)] / [(x − 1)(x + 1)]",
          "display": true
        }
      },
      {
        "en": "Simplify the numerator to −x² + 2x − 1 = −(x − 1)² and cancel (x − 1). Therefore, the simplified expression is (1 − x)/(1 + x).",
        "eq": "= −(x − 1)² / [(x − 1)(x + 1)] = (1 − x)/(1 + x)",
        "math": {
          "latex": "=\\dfrac{-(x-1)^2}{(x-1)(x+1)}=\\dfrac{1-x}{1+x}",
          "fallback": "= −(x − 1)² / [(x − 1)(x + 1)] = (1 − x)/(1 + x)",
          "display": true
        }
      }
    ],
    "answer": "(1 − x)/(1 + x)",
    "answerMath": {
      "latex": "\\dfrac{1-x}{1+x}",
      "fallback": "(1 − x)/(1 + x)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q2(ii); printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q3",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q3",
      "ta": "Exercise 3.6 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Subtract 1/(x² + 2) from (2x³ + x² + 3)/(x² + 2)²"
    },
    "q": {
      "en": "Subtract 1/(x² + 2) from (2x³ + x² + 3)/(x² + 2)²"
    },
    "questionMath": {
      "en": [
        "Subtract ",
        {
          "latex": "\\dfrac{1}{x^2+2}",
          "fallback": "1/(x² + 2)",
          "display": false
        },
        " from ",
        {
          "latex": "\\dfrac{2x^3+x^2+3}{(x^2+2)^2}",
          "fallback": "(2x³ + x² + 3)/(x² + 2)²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the subtraction with common denominator (x² + 2)² by multiplying the numerator and denominator of 1/(x² + 2) by (x² + 2).",
        "eq": "(2x³ + x² + 3)/(x² + 2)² − 1/(x² + 2) = [(2x³ + x² + 3) − (x² + 2)] / (x² + 2)²",
        "math": {
          "latex": "\\dfrac{2x^3+x^2+3}{(x^2+2)^2}-\\dfrac{1}{x^2+2}=\\dfrac{(2x^3+x^2+3)-(x^2+2)}{(x^2+2)^2}",
          "fallback": "(2x³ + x² + 3)/(x² + 2)² − 1/(x² + 2) = [(2x³ + x² + 3) − (x² + 2)] / (x² + 2)²",
          "display": true
        }
      },
      {
        "en": "Combine like terms in the numerator (x² − x² = 0 and 3 − 2 = 1). Therefore, the result is (2x³ + 1)/(x² + 2)².",
        "eq": "= (2x³ + 1)/(x² + 2)²",
        "math": {
          "latex": "=\\dfrac{2x^3+1}{(x^2+2)^2}",
          "fallback": "= (2x³ + 1)/(x² + 2)²",
          "display": true
        }
      }
    ],
    "answer": "(2x³ + 1)/(x² + 2)²",
    "answerMath": {
      "latex": "\\dfrac{2x^3+1}{(x^2+2)^2}",
      "fallback": "(2x³ + 1)/(x² + 2)²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q3; printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q4",
      "ta": "Exercise 3.6 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the rational expression to subtract from (x² + 6x + 8)/(x³ + 8) to get 3/(x² − 2x + 4)"
    },
    "q": {
      "en": "Which rational expression should be subtracted from (x² + 6x + 8)/(x³ + 8) to get 3/(x² − 2x + 4)"
    },
    "questionMath": {
      "en": [
        "Which rational expression should be subtracted from ",
        {
          "latex": "\\dfrac{x^2+6x+8}{x^3+8}",
          "fallback": "(x² + 6x + 8)/(x³ + 8)",
          "display": false
        },
        " to get ",
        {
          "latex": "\\dfrac{3}{x^2-2x+4}",
          "fallback": "3/(x² − 2x + 4)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Let P be the required rational expression. Then P = (x² + 6x + 8)/(x³ + 8) − 3/(x² − 2x + 4). First simplify (x² + 6x + 8)/(x³ + 8) by factorizing the numerator as (x + 2)(x + 4) and the denominator as (x + 2)(x² − 2x + 4).",
        "eq": "(x² + 6x + 8)/(x³ + 8) = [(x + 2)(x + 4)] / [(x + 2)(x² − 2x + 4)] = (x + 4)/(x² − 2x + 4)",
        "math": {
          "latex": "\\dfrac{x^2+6x+8}{x^3+8}=\\dfrac{(x+2)(x+4)}{(x+2)(x^2-2x+4)}=\\dfrac{x+4}{x^2-2x+4}",
          "fallback": "(x² + 6x + 8)/(x³ + 8) = [(x + 2)(x + 4)] / [(x + 2)(x² − 2x + 4)] = (x + 4)/(x² − 2x + 4)",
          "display": true
        }
      },
      {
        "en": "Subtract 3/(x² − 2x + 4) from (x + 4)/(x² − 2x + 4) over the common denominator x² − 2x + 4. Therefore, the required rational expression is (x + 1)/(x² − 2x + 4).",
        "eq": "P = (x + 4)/(x² − 2x + 4) − 3/(x² − 2x + 4) = (x + 1)/(x² − 2x + 4)",
        "math": {
          "latex": "P=\\dfrac{x+4}{x^2-2x+4}-\\dfrac{3}{x^2-2x+4}=\\dfrac{x+1}{x^2-2x+4}",
          "fallback": "P = (x + 4)/(x² − 2x + 4) − 3/(x² − 2x + 4) = (x + 1)/(x² − 2x + 4)",
          "display": true
        }
      }
    ],
    "answer": "(x + 1)/(x² − 2x + 4)",
    "answerMath": {
      "latex": "\\dfrac{x+1}{x^2-2x+4}",
      "fallback": "(x + 1)/(x² − 2x + 4)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q4; printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q5",
      "ta": "Exercise 3.6 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Evaluate 1/(A − B) − 2B/(A² − B²) for A = (2x + 1)/(2x − 1) and B = (2x − 1)/(2x + 1)"
    },
    "q": {
      "en": "If A = (2x + 1)/(2x − 1), B = (2x − 1)/(2x + 1) find 1/(A − B) − 2B/(A² − B²)"
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "A=\\dfrac{2x+1}{2x-1},\\;B=\\dfrac{2x-1}{2x+1}",
          "fallback": "A = (2x + 1)/(2x − 1), B = (2x − 1)/(2x + 1)",
          "display": false
        },
        " find ",
        {
          "latex": "\\dfrac{1}{A-B}-\\dfrac{2B}{A^2-B^2}",
          "fallback": "1/(A − B) − 2B/(A² − B²)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "First simplify the algebraic expression 1/(A − B) − 2B/(A² − B²) using A² − B² = (A − B)(A + B).",
        "eq": "1/(A − B) − 2B/[(A − B)(A + B)] = (A + B − 2B)/[(A − B)(A + B)] = (A − B)/[(A − B)(A + B)] = 1/(A + B)",
        "math": {
          "latex": "\\dfrac{1}{A-B}-\\dfrac{2B}{(A-B)(A+B)}=\\dfrac{A+B-2B}{(A-B)(A+B)}=\\dfrac{A-B}{(A-B)(A+B)}=\\dfrac{1}{A+B}",
          "fallback": "1/(A − B) − 2B/[(A − B)(A + B)] = (A + B − 2B)/[(A − B)(A + B)] = (A − B)/[(A − B)(A + B)] = 1/(A + B)",
          "display": true
        }
      },
      {
        "en": "Compute A + B by adding (2x + 1)/(2x − 1) and (2x − 1)/(2x + 1) over the common denominator (2x − 1)(2x + 1) = 4x² − 1.",
        "eq": "A + B = [(2x + 1)² + (2x − 1)²] / (4x² − 1) = [2(4x² + 1)] / (4x² − 1)",
        "math": {
          "latex": "A+B=\\dfrac{(2x+1)^2+(2x-1)^2}{4x^2-1}=\\dfrac{2(4x^2+1)}{4x^2-1}",
          "fallback": "A + B = [(2x + 1)² + (2x − 1)²] / (4x² − 1) = [2(4x² + 1)] / (4x² − 1)",
          "display": true
        }
      },
      {
        "en": "Take the reciprocal of A + B to find 1/(A + B). Therefore, the value of the expression is (4x² − 1)/[2(4x² + 1)].",
        "eq": "1/(A + B) = (4x² − 1)/[2(4x² + 1)]",
        "math": {
          "latex": "\\dfrac{1}{A+B}=\\dfrac{4x^2-1}{2(4x^2+1)}",
          "fallback": "1/(A + B) = (4x² − 1)/[2(4x² + 1)]",
          "display": true
        }
      }
    ],
    "answer": "(4x² − 1)/[2(4x² + 1)]",
    "answerMath": {
      "latex": "\\dfrac{4x^2-1}{2(4x^2+1)}",
      "fallback": "(4x² − 1)/[2(4x² + 1)]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q5; printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q6",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q6",
      "ta": "Exercise 3.6 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Prove that [(A + B)² + (A − B)²]/(A ÷ B) = 2(x² + 1)/[x(x + 1)²]"
    },
    "q": {
      "en": "If A = x/(x + 1), B = 1/(x + 1), prove that [(A + B)² + (A − B)²]/(A ÷ B) = 2(x² + 1)/[x(x + 1)²]"
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "A=\\dfrac{x}{x+1},\\;B=\\dfrac{1}{x+1},",
          "fallback": "A = x/(x + 1), B = 1/(x + 1),",
          "display": false
        },
        " prove that ",
        {
          "latex": "\\dfrac{(A+B)^2+(A-B)^2}{A\\div B}=\\dfrac{2(x^2+1)}{x(x+1)^2}",
          "fallback": "[(A + B)² + (A − B)²]/(A ÷ B) = 2(x² + 1)/[x(x + 1)²]",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Evaluate A + B, A − B, and A ÷ B from A = x/(x + 1) and B = 1/(x + 1).",
        "eq": "A + B = (x + 1)/(x + 1) = 1; A − B = (x − 1)/(x + 1); A ÷ B = [x/(x + 1)] × [(x + 1)/1] = x",
        "math": {
          "latex": "A+B=\\dfrac{x+1}{x+1}=1,\\quad A-B=\\dfrac{x-1}{x+1},\\quad A\\div B=\\dfrac{x}{x+1}\\times\\dfrac{x+1}{1}=x",
          "fallback": "A + B = (x + 1)/(x + 1) = 1; A − B = (x − 1)/(x + 1); A ÷ B = [x/(x + 1)] × [(x + 1)/1] = x",
          "display": true
        }
      },
      {
        "en": "Compute the numerator (A + B)² + (A − B)² by adding 1² and [(x − 1)/(x + 1)]² over (x + 1)².",
        "eq": "(A + B)² + (A − B)² = 1 + (x − 1)²/(x + 1)² = [(x + 1)² + (x − 1)²]/(x + 1)² = 2(x² + 1)/(x + 1)²",
        "math": {
          "latex": "(A+B)^2+(A-B)^2=1+\\dfrac{(x-1)^2}{(x+1)^2}=\\dfrac{(x+1)^2+(x-1)^2}{(x+1)^2}=\\dfrac{2(x^2+1)}{(x+1)^2}",
          "fallback": "(A + B)² + (A − B)² = 1 + (x − 1)²/(x + 1)² = [(x + 1)² + (x − 1)²]/(x + 1)² = 2(x² + 1)/(x + 1)²",
          "display": true
        }
      },
      {
        "en": "Divide the numerator 2(x² + 1)/(x + 1)² by A ÷ B = x. This equals the right-hand side 2(x² + 1)/[x(x + 1)²], completing the proof.",
        "eq": "LHS = [2(x² + 1)/(x + 1)²] ÷ x = 2(x² + 1)/[x(x + 1)²] = RHS",
        "math": {
          "latex": "\\text{LHS}=\\dfrac{2(x^2+1)}{(x+1)^2}\\div x=\\dfrac{2(x^2+1)}{x(x+1)^2}=\\text{RHS}",
          "fallback": "LHS = [2(x² + 1)/(x + 1)²] ÷ x = 2(x² + 1)/[x(x + 1)²] = RHS",
          "display": true
        }
      }
    ],
    "answer": "Hence proved: [(A + B)² + (A − B)²]/(A ÷ B) = 2(x² + 1)/[x(x + 1)²]",
    "answerMath": {
      "latex": "\\text{Hence proved: }\\dfrac{(A+B)^2+(A-B)^2}{A\\div B}=\\dfrac{2(x^2+1)}{x(x+1)^2}",
      "fallback": "Hence proved: [(A + B)² + (A − B)²]/(A ÷ B) = 2(x² + 1)/[x(x + 1)²]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q6; printed p. 103, PDF p. 109; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q7",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q7",
      "ta": "Exercise 3.6 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Combined work time for Pari (4 hours) and Yuvan (6 hours)"
    },
    "q": {
      "en": "Pari needs 4 hours to complete a work. His friend Yuvan needs 6 hours to complete the same work. How long will it take to complete if they work together?"
    },
    "questionMath": {
      "en": [
        "Pari needs 4 hours to complete a work. His friend Yuvan needs 6 hours to complete the same work. How long will it take to complete if they work together?"
      ]
    },
    "steps": [
      {
        "en": "Find the fraction of the work completed by each person in 1 hour: Pari completes 1/4 of the work per hour, and Yuvan completes 1/6 of the work per hour.",
        "eq": "Pari's 1-hour work = 1/4; Yuvan's 1-hour work = 1/6",
        "math": {
          "latex": "\\text{Pari's 1-hour work}=\\dfrac{1}{4},\\qquad\\text{Yuvan's 1-hour work}=\\dfrac{1}{6}",
          "fallback": "Pari's 1-hour work = 1/4; Yuvan's 1-hour work = 1/6",
          "display": true
        }
      },
      {
        "en": "Add their hourly work rates to find the fraction of the work completed together in 1 hour.",
        "eq": "Combined 1-hour work = 1/4 + 1/6 = (3 + 2)/12 = 5/12",
        "math": {
          "latex": "\\text{Combined 1-hour work}=\\dfrac{1}{4}+\\dfrac{1}{6}=\\dfrac{3+2}{12}=\\dfrac{5}{12}",
          "fallback": "Combined 1-hour work = 1/4 + 1/6 = (3 + 2)/12 = 5/12",
          "display": true
        }
      },
      {
        "en": "Take the reciprocal of 5/12 to find the total time taken together, and convert 2/5 hours into minutes (2/5 × 60 = 24 minutes). Therefore, working together they take 2 hrs 24 minutes.",
        "eq": "Time = 12/5 hours = 2 2/5 hours = 2 hrs 24 minutes",
        "math": {
          "latex": "\\text{Time}=\\dfrac{12}{5}\\text{ hours}=2\\dfrac{2}{5}\\text{ hours}=2\\text{ hrs }24\\text{ minutes}",
          "fallback": "Time = 12/5 hours = 2 2/5 hours = 2 hrs 24 minutes",
          "display": true
        }
      }
    ],
    "answer": "2 hrs 24 minutes",
    "answerMath": {
      "latex": "2\\text{ hrs }24\\text{ minutes}",
      "fallback": "2 hrs 24 minutes",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q7; printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-6-q8",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.6",
    "topic": {
      "en": "Algebra — Addition and Subtraction of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.6 · Q8",
      "ta": "Exercise 3.6 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the weights of apples and bananas bought by Iniya"
    },
    "q": {
      "en": "Iniya bought 50 kg of fruits consisting of apples and bananas. She paid twice as much per kg for the apple as she did for the banana. If Iniya bought ₹ 1800 worth of apples and ₹ 600 worth bananas, then how many kgs of each fruit did she buy?"
    },
    "questionMath": {
      "en": [
        "Iniya bought 50 kg of fruits consisting of apples and bananas. She paid twice as much per kg for the apple as she did for the banana. If Iniya bought ",
        {
          "latex": "\\text{Rs. }1800",
          "fallback": "₹ 1800",
          "display": false
        },
        " worth of apples and ",
        {
          "latex": "\\text{Rs. }600",
          "fallback": "₹ 600",
          "display": false
        },
        " worth bananas, then how many kgs of each fruit did she buy?"
      ]
    },
    "steps": [
      {
        "en": "Let the price of bananas be ₹ x per kg; then the price of apples is ₹ 2x per kg. Using Weight = Total Cost / Price per kg, express the weight of apples and bananas in terms of x.",
        "eq": "Apples = 1800/(2x) = 900/x kg; Bananas = 600/x kg",
        "math": {
          "latex": "\\text{Apples}=\\dfrac{1800}{2x}=\\dfrac{900}{x}\\text{ kg},\\qquad\\text{Bananas}=\\dfrac{600}{x}\\text{ kg}",
          "fallback": "Apples = 1800/(2x) = 900/x kg; Bananas = 600/x kg",
          "display": true
        }
      },
      {
        "en": "Since the total weight of fruits is 50 kg, add the two rational expressions and solve for x.",
        "eq": "900/x + 600/x = 50 ⇒ 1500/x = 50 ⇒ x = 1500/50 = 30",
        "math": {
          "latex": "\\dfrac{900}{x}+\\dfrac{600}{x}=50\\implies\\dfrac{1500}{x}=50\\implies x=30",
          "fallback": "900/x + 600/x = 50 ⇒ 1500/x = 50 ⇒ x = 1500/50 = 30",
          "display": true
        }
      },
      {
        "en": "Substitute x = 30 into the weight expressions: Apples = 900/30 = 30 kg and Bananas = 600/30 = 20 kg. Therefore, Iniya bought 30 kgs of apples and 20 kgs of bananas.",
        "eq": "Apples = 900/30 = 30 kgs; Bananas = 600/30 = 20 kgs",
        "math": {
          "latex": "\\text{Apples}=\\dfrac{900}{30}=30\\text{ kgs},\\qquad\\text{Bananas}=\\dfrac{600}{30}=20\\text{ kgs}",
          "fallback": "Apples = 900/30 = 30 kgs; Bananas = 600/30 = 20 kgs",
          "display": true
        }
      }
    ],
    "answer": "30 kgs, 20 kgs",
    "answerMath": {
      "latex": "30\\text{ kgs},\\;20\\text{ kgs}",
      "fallback": "30 kgs, 20 kgs",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.6 Q8; printed p. 103, PDF p. 109; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.6 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
