/* Grade 10 Ch 3 Ex 3.4 (Q1(i)-(iv), Q2(i)-(iv)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 105 (printed p. 99), Tamil PDF p. 107 (printed p. 101),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-4-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(i)",
      "ta": "Exercise 3.4 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Reduce (x² − 1) / (x² + x) to its lowest form"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (i) (x² − 1)/(x² + x)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (i) ",
        {
          "latex": "\\dfrac{x^2-1}{x^2+x}",
          "fallback": "(x² − 1)/(x² + x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x² − 1 using the difference of squares identity (x − 1)(x + 1), and factor out x from the denominator x² + x.",
        "eq": "(x² − 1)/(x² + x) = [(x − 1)(x + 1)] / [x(x + 1)]",
        "math": {
          "latex": "\\dfrac{x^2-1}{x^2+x}=\\dfrac{(x-1)(x+1)}{x(x+1)}",
          "fallback": "(x² − 1)/(x² + x) = [(x − 1)(x + 1)] / [x(x + 1)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factor (x + 1) from the numerator and denominator. Therefore, the rational expression in its lowest form is (x − 1)/x.",
        "eq": "= (x − 1)/x",
        "math": {
          "latex": "=\\dfrac{x-1}{x}",
          "fallback": "= (x − 1)/x",
          "display": true
        }
      }
    ],
    "answer": "(x − 1)/x",
    "answerMath": {
      "latex": "\\dfrac{x-1}{x}",
      "fallback": "(x − 1)/x",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(i); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(ii)",
      "ta": "Exercise 3.4 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Reduce (x² − 11x + 18) / (x² − 4x + 4) to its lowest form"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (ii) (x² − 11x + 18)/(x² − 4x + 4)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (ii) ",
        {
          "latex": "\\dfrac{x^2-11x+18}{x^2-4x+4}",
          "fallback": "(x² − 11x + 18)/(x² − 4x + 4)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x² − 11x + 18 into (x − 9)(x − 2) and the denominator x² − 4x + 4 into (x − 2)².",
        "eq": "(x² − 11x + 18)/(x² − 4x + 4) = [(x − 9)(x − 2)] / [(x − 2)(x − 2)]",
        "math": {
          "latex": "\\dfrac{x^2-11x+18}{x^2-4x+4}=\\dfrac{(x-9)(x-2)}{(x-2)(x-2)}",
          "fallback": "(x² − 11x + 18)/(x² − 4x + 4) = [(x − 9)(x − 2)] / [(x − 2)(x − 2)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factor (x − 2) from the numerator and denominator. Therefore, the expression in its lowest form is (x − 9)/(x − 2).",
        "eq": "= (x − 9)/(x − 2)",
        "math": {
          "latex": "=\\dfrac{x-9}{x-2}",
          "fallback": "= (x − 9)/(x − 2)",
          "display": true
        }
      }
    ],
    "answer": "(x − 9)/(x − 2)",
    "answerMath": {
      "latex": "\\dfrac{x-9}{x-2}",
      "fallback": "(x − 9)/(x − 2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(ii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(iii)",
      "ta": "Exercise 3.4 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Reduce (9x² + 81x) / (x³ + 8x² − 9x) to its lowest form"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (iii) (9x² + 81x)/(x³ + 8x² − 9x)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (iii) ",
        {
          "latex": "\\dfrac{9x^2+81x}{x^3+8x^2-9x}",
          "fallback": "(9x² + 81x)/(x³ + 8x² − 9x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out 9x from the numerator 9x² + 81x and factor out x from the denominator x³ + 8x² − 9x.",
        "eq": "(9x² + 81x)/(x³ + 8x² − 9x) = [9x(x + 9)] / [x(x² + 8x − 9)]",
        "math": {
          "latex": "\\dfrac{9x^2+81x}{x^3+8x^2-9x}=\\dfrac{9x(x+9)}{x(x^2+8x-9)}",
          "fallback": "(9x² + 81x)/(x³ + 8x² − 9x) = [9x(x + 9)] / [x(x² + 8x − 9)]",
          "display": true
        }
      },
      {
        "en": "Factorize the quadratic x² + 8x − 9 into (x + 9)(x − 1), then cancel the common factors x and (x + 9). Therefore, the rational expression in its lowest form is 9/(x − 1).",
        "eq": "= [9x(x + 9)] / [x(x + 9)(x − 1)] = 9/(x − 1)",
        "math": {
          "latex": "=\\dfrac{9x(x+9)}{x(x+9)(x-1)}=\\dfrac{9}{x-1}",
          "fallback": "= [9x(x + 9)] / [x(x + 9)(x − 1)] = 9/(x − 1)",
          "display": true
        }
      }
    ],
    "answer": "9/(x − 1)",
    "answerMath": {
      "latex": "\\dfrac{9}{x-1}",
      "fallback": "9/(x − 1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(iii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(iv)",
      "ta": "Exercise 3.4 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Reduce (p² − 3p − 40) / (2p³ − 24p² + 64p) to its lowest form"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (iv) (p² − 3p − 40)/(2p³ − 24p² + 64p)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (iv) ",
        {
          "latex": "\\dfrac{p^2-3p-40}{2p^3-24p^2+64p}",
          "fallback": "(p² − 3p − 40)/(2p³ − 24p² + 64p)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator p² − 3p − 40 into (p − 8)(p + 5) and factor out 2p from the denominator 2p³ − 24p² + 64p.",
        "eq": "(p² − 3p − 40)/(2p³ − 24p² + 64p) = [(p − 8)(p + 5)] / [2p(p² − 12p + 32)]",
        "math": {
          "latex": "\\dfrac{p^2-3p-40}{2p^3-24p^2+64p}=\\dfrac{(p-8)(p+5)}{2p(p^2-12p+32)}",
          "fallback": "(p² − 3p − 40)/(2p³ − 24p² + 64p) = [(p − 8)(p + 5)] / [2p(p² − 12p + 32)]",
          "display": true
        }
      },
      {
        "en": "Factorize p² − 12p + 32 into (p − 8)(p − 4) and cancel the common factor (p − 8). Therefore, the rational expression in its lowest form is (p + 5)/[2p(p − 4)].",
        "eq": "= [(p − 8)(p + 5)] / [2p(p − 8)(p − 4)] = (p + 5)/[2p(p − 4)]",
        "math": {
          "latex": "=\\dfrac{(p-8)(p+5)}{2p(p-8)(p-4)}=\\dfrac{p+5}{2p(p-4)}",
          "fallback": "= [(p − 8)(p + 5)] / [2p(p − 8)(p − 4)] = (p + 5)/[2p(p − 4)]",
          "display": true
        }
      }
    ],
    "answer": "(p + 5)/[2p(p − 4)]",
    "answerMath": {
      "latex": "\\dfrac{p+5}{2p(p-4)}",
      "fallback": "(p + 5)/[2p(p − 4)]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(iv); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(i)",
      "ta": "Exercise 3.4 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the excluded values of y / (y² − 25)"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (i) y/(y² − 25)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (i) ",
        {
          "latex": "\\dfrac{y}{y^2-25}",
          "fallback": "y/(y² − 25)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The rational expression y/(y² − 25) is already in its lowest form. It is undefined when the denominator equals zero, so set y² − 25 = 0.",
        "eq": "y² − 25 = 0 ⇒ (y + 5)(y − 5) = 0",
        "math": {
          "latex": "y^2-25=0\\implies(y+5)(y-5)=0",
          "fallback": "y² − 25 = 0 ⇒ (y + 5)(y − 5) = 0",
          "display": true
        }
      },
      {
        "en": "Solve for y. Therefore, the excluded values are −5 and 5.",
        "eq": "y = −5, 5",
        "math": {
          "latex": "y=-5,\\;5",
          "fallback": "y = −5, 5",
          "display": true
        }
      }
    ],
    "answer": "−5, 5",
    "answerMath": {
      "latex": "-5,\\;5",
      "fallback": "−5, 5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(i); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(ii)",
      "ta": "Exercise 3.4 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the excluded values of t / (t² − 5t + 6)"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (ii) t/(t² − 5t + 6)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (ii) ",
        {
          "latex": "\\dfrac{t}{t^2-5t+6}",
          "fallback": "t/(t² − 5t + 6)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The rational expression t/(t² − 5t + 6) is in lowest form. Set the denominator equal to zero and factorize the quadratic trinomial.",
        "eq": "t² − 5t + 6 = 0 ⇒ (t − 2)(t − 3) = 0",
        "math": {
          "latex": "t^2-5t+6=0\\implies(t-2)(t-3)=0",
          "fallback": "t² − 5t + 6 = 0 ⇒ (t − 2)(t − 3) = 0",
          "display": true
        }
      },
      {
        "en": "Solve each linear factor for t. Therefore, the excluded values are 2 and 3.",
        "eq": "t = 2, 3",
        "math": {
          "latex": "t=2,\\;3",
          "fallback": "t = 2, 3",
          "display": true
        }
      }
    ],
    "answer": "2, 3",
    "answerMath": {
      "latex": "2,\\;3",
      "fallback": "2, 3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(ii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(iii)",
      "ta": "Exercise 3.4 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the excluded values of (x² + 6x + 8) / (x² + x − 2)"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (iii) (x² + 6x + 8)/(x² + x − 2)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (iii) ",
        {
          "latex": "\\dfrac{x^2+6x+8}{x^2+x-2}",
          "fallback": "(x² + 6x + 8)/(x² + x − 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "First reduce the rational expression to its lowest form by factorizing the numerator x² + 6x + 8 = (x + 4)(x + 2) and the denominator x² + x − 2 = (x + 2)(x − 1), then cancelling (x + 2).",
        "eq": "(x² + 6x + 8)/(x² + x − 2) = [(x + 4)(x + 2)] / [(x + 2)(x − 1)] = (x + 4)/(x − 1)",
        "math": {
          "latex": "\\dfrac{x^2+6x+8}{x^2+x-2}=\\dfrac{(x+4)(x+2)}{(x+2)(x-1)}=\\dfrac{x+4}{x-1}",
          "fallback": "(x² + 6x + 8)/(x² + x − 2) = [(x + 4)(x + 2)] / [(x + 2)(x − 1)] = (x + 4)/(x − 1)",
          "display": true
        }
      },
      {
        "en": "Set the denominator of the lowest-form expression equal to zero: x − 1 = 0. Therefore, the excluded value is 1.",
        "eq": "x − 1 = 0 ⇒ x = 1",
        "math": {
          "latex": "x-1=0\\implies x=1",
          "fallback": "x − 1 = 0 ⇒ x = 1",
          "display": true
        }
      }
    ],
    "answer": "1",
    "answerMath": {
      "latex": "1",
      "fallback": "1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(iii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-4-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(iv)",
      "ta": "Exercise 3.4 · Q2(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the excluded values of (x³ − 27) / (x³ + x² − 6x)"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (iv) (x³ − 27)/(x³ + x² − 6x)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (iv) ",
        {
          "latex": "\\dfrac{x^3-27}{x^3+x^2-6x}",
          "fallback": "(x³ − 27)/(x³ + x² − 6x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x³ − 27 = (x − 3)(x² + 3x + 9) and factorize the denominator x³ + x² − 6x = x(x² + x − 6) = x(x + 3)(x − 2). Since there are no common factors, the expression is already in its lowest form.",
        "eq": "(x³ − 27)/(x³ + x² − 6x) = [(x − 3)(x² + 3x + 9)] / [x(x + 3)(x − 2)]",
        "math": {
          "latex": "\\dfrac{x^3-27}{x^3+x^2-6x}=\\dfrac{(x-3)(x^2+3x+9)}{x(x+3)(x-2)}",
          "fallback": "(x³ − 27)/(x³ + x² − 6x) = [(x − 3)(x² + 3x + 9)] / [x(x + 3)(x − 2)]",
          "display": true
        }
      },
      {
        "en": "Set the factored denominator equal to zero: x(x + 3)(x − 2) = 0. Therefore, the excluded values are 0, −3, and 2.",
        "eq": "x(x + 3)(x − 2) = 0 ⇒ x = 0, −3, 2",
        "math": {
          "latex": "x(x+3)(x-2)=0\\implies x=0,\\;-3,\\;2",
          "fallback": "x(x + 3)(x − 2) = 0 ⇒ x = 0, −3, 2",
          "display": true
        }
      }
    ],
    "answer": "0, −3, 2",
    "answerMath": {
      "latex": "0,\\;-3,\\;2",
      "fallback": "0, −3, 2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(iv); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.4 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
