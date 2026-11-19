/* Grade 10 Ch 3 Ex 3.9 (Q1(i)-(iv), Q2(i)-(iv)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 115 (printed p. 109), Tamil PDF p. 117 (printed p. 111),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-9-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q1(i)",
      "ta": "Exercise 3.9 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the quadratic equation whose sum and product of roots are −9, 20"
    },
    "q": {
      "en": "1. Determine the quadratic equations, whose sum and product of roots are\n(i) −9, 20"
    },
    "questionMath": {
      "en": [
        "1. Determine the quadratic equations, whose sum and product of roots are\n(i) ",
        {
          "latex": "-9,\\;20",
          "fallback": "−9, 20",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "If α and β are the roots of a quadratic equation, its standard form is x² − (α + β)x + αβ = 0. Here, sum of the roots (α + β) = −9 and product of the roots (αβ) = 20.",
        "eq": "x² − (Sum of roots)x + (Product of roots) = 0",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-9,\\qquad \\alpha\\beta=20\\\\x^2-(\\alpha+\\beta)x+\\alpha\\beta&=0\\end{aligned}",
          "fallback": "x² − (Sum of roots)x + (Product of roots) = 0",
          "display": true
        }
      },
      {
        "en": "Substitute −9 and 20 carefully. Notice that subtracting −9 flips the sign to +9: −(−9)x = +9x. Therefore, the required quadratic equation is x² + 9x + 20 = 0.",
        "eq": "x² − (−9)x + 20 = 0 ⇒ x² + 9x + 20 = 0",
        "math": {
          "latex": "x^2-(-9)x+20=0\\implies x^2+9x+20=0",
          "fallback": "x² − (−9)x + 20 = 0 ⇒ x² + 9x + 20 = 0",
          "display": true
        }
      }
    ],
    "answer": "x² + 9x + 20 = 0",
    "answerMath": {
      "latex": "x^2+9x+20=0",
      "fallback": "x² + 9x + 20 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q1(i); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q1(ii)",
      "ta": "Exercise 3.9 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the quadratic equation whose sum and product of roots are 5/3, 4"
    },
    "q": {
      "en": "1. Determine the quadratic equations, whose sum and product of roots are\n(ii) 5/3, 4"
    },
    "questionMath": {
      "en": [
        "1. Determine the quadratic equations, whose sum and product of roots are\n(ii) ",
        {
          "latex": "\\dfrac{5}{3},\\;4",
          "fallback": "5/3, 4",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Substitute sum α + β = 5/3 and product αβ = 4 into x² − (α + β)x + αβ = 0.",
        "eq": "x² − (5/3)x + 4 = 0",
        "math": {
          "latex": "x^2-\\left(\\dfrac{5}{3}\\right)x+4=0",
          "fallback": "x² − (5/3)x + 4 = 0",
          "display": true
        }
      },
      {
        "en": "Multiply every term on both sides by the denominator 3 (including 0 × 3 = 0) to clear the fraction and write the quadratic equation with integer coefficients.",
        "eq": "3x² − 5x + 12 = 0",
        "math": {
          "latex": "\\dfrac{3x^2-5x+12}{3}=0\\implies 3x^2-5x+12=0",
          "fallback": "3x² − 5x + 12 = 0",
          "display": true
        }
      }
    ],
    "answer": "3x² − 5x + 12 = 0",
    "answerMath": {
      "latex": "3x^2-5x+12=0",
      "fallback": "3x² − 5x + 12 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q1(ii); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q1(iii)",
      "ta": "Exercise 3.9 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the quadratic equation whose sum and product of roots are −3/2, −1"
    },
    "q": {
      "en": "1. Determine the quadratic equations, whose sum and product of roots are\n(iii) −3/2, −1"
    },
    "questionMath": {
      "en": [
        "1. Determine the quadratic equations, whose sum and product of roots are\n(iii) ",
        {
          "latex": "\\dfrac{-3}{2},\\;-1",
          "fallback": "−3/2, −1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Substitute sum α + β = −3/2 and product αβ = −1 into x² − (α + β)x + αβ = 0. Be careful with both signs: −(−3/2)x becomes +(3/2)x, and +(−1) becomes −1.",
        "eq": "x² − (−3/2)x + (−1) = 0 ⇒ x² + (3/2)x − 1 = 0",
        "math": {
          "latex": "x^2-\\left(-\\dfrac{3}{2}\\right)x+(-1)=0\\implies x^2+\\dfrac{3}{2}x-1=0",
          "fallback": "x² − (−3/2)x + (−1) = 0 ⇒ x² + (3/2)x − 1 = 0",
          "display": true
        }
      },
      {
        "en": "Multiply every term on both sides by 2 to clear the fraction 3/2.",
        "eq": "2x² + 3x − 2 = 0",
        "math": {
          "latex": "\\dfrac{2x^2+3x-2}{2}=0\\implies 2x^2+3x-2=0",
          "fallback": "2x² + 3x − 2 = 0",
          "display": true
        }
      }
    ],
    "answer": "2x² + 3x − 2 = 0",
    "answerMath": {
      "latex": "2x^2+3x-2=0",
      "fallback": "2x² + 3x − 2 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q1(iii); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q1(iv)",
      "ta": "Exercise 3.9 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the quadratic equation whose sum and product of roots are −(2 − a)², (a + 5)²"
    },
    "q": {
      "en": "1. Determine the quadratic equations, whose sum and product of roots are\n(iv) −(2 − a)², (a + 5)²"
    },
    "questionMath": {
      "en": [
        "1. Determine the quadratic equations, whose sum and product of roots are\n(iv) ",
        {
          "latex": "-(2-a)^2,\\;(a+5)^2",
          "fallback": "−(2 − a)², (a + 5)²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Use the standard formula x² − (Sum of roots)x + (Product of roots) = 0 with sum α + β = −(2 − a)² and product αβ = (a + 5)².",
        "eq": "x² − [−(2 − a)²]x + (a + 5)² = 0",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-(2-a)^2,\\qquad \\alpha\\beta=(a+5)^2\\\\x^2&-[-(2-a)^2]x+(a+5)^2=0\\end{aligned}",
          "fallback": "x² − [−(2 − a)²]x + (a + 5)² = 0",
          "display": true
        }
      },
      {
        "en": "Subtracting −(2 − a)² changes the sign to +(2 − a)². Leave (2 − a)² and (a + 5)² in factored form as in the textbook answer.",
        "eq": "x² + (2 − a)²x + (a + 5)² = 0",
        "math": {
          "latex": "x^2+(2-a)^2x+(a+5)^2=0",
          "fallback": "x² + (2 − a)²x + (a + 5)² = 0",
          "display": true
        }
      }
    ],
    "answer": "x² + (2 − a)²x + (a + 5)² = 0",
    "answerMath": {
      "latex": "x^2+(2-a)^2x+(a+5)^2=0",
      "fallback": "x² + (2 − a)²x + (a + 5)² = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q1(iv); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q2(i)",
      "ta": "Exercise 3.9 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the sum and product of the roots of x² + 3x − 28 = 0"
    },
    "q": {
      "en": "2. Find the sum and product of the roots for each of the following quadratic equations\n(i) x² + 3x − 28 = 0"
    },
    "questionMath": {
      "en": [
        "2. Find the sum and product of the roots for each of the following quadratic equations\n(i) ",
        {
          "latex": "x^2+3x-28=0",
          "fallback": "x² + 3x − 28 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare x² + 3x − 28 = 0 with the general quadratic equation ax² + bx + c = 0. Since x² has no written number in front, its coefficient is a = 1; also b = 3 and c = −28 (keep the negative sign with c).",
        "eq": "a = 1, b = 3, c = −28",
        "math": {
          "latex": "a=1,\\qquad b=3,\\qquad c=-28",
          "fallback": "a = 1, b = 3, c = −28",
          "display": true
        }
      },
      {
        "en": "Use α + β = −b/a and αβ = c/a to find the sum and product of the roots.",
        "eq": "α + β = −3/1 = −3; αβ = −28/1 = −28",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-\\dfrac{b}{a}=-\\dfrac{3}{1}=-3\\\\\\alpha\\beta&=\\dfrac{c}{a}=\\dfrac{-28}{1}=-28\\end{aligned}",
          "fallback": "α + β = −3/1 = −3; αβ = −28/1 = −28",
          "display": true
        }
      }
    ],
    "answer": "−3, −28",
    "answerMath": {
      "latex": "-3,\\;-28",
      "fallback": "−3, −28",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q2(i); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q2(ii)",
      "ta": "Exercise 3.9 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the sum and product of the roots of x² + 3x = 0"
    },
    "q": {
      "en": "2. Find the sum and product of the roots for each of the following quadratic equations\n(ii) x² + 3x = 0"
    },
    "questionMath": {
      "en": [
        "2. Find the sum and product of the roots for each of the following quadratic equations\n(ii) ",
        {
          "latex": "x^2+3x=0",
          "fallback": "x² + 3x = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Rewrite x² + 3x = 0 as x² + 3x + 0 = 0 and compare with ax² + bx + c = 0. Because there is no constant term, c = 0 (along with a = 1 and b = 3).",
        "eq": "a = 1, b = 3, c = 0",
        "math": {
          "latex": "a=1,\\qquad b=3,\\qquad c=0",
          "fallback": "a = 1, b = 3, c = 0",
          "display": true
        }
      },
      {
        "en": "Compute sum α + β = −b/a and product αβ = c/a.",
        "eq": "α + β = −3/1 = −3; αβ = 0/1 = 0",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-\\dfrac{b}{a}=-\\dfrac{3}{1}=-3\\\\\\alpha\\beta&=\\dfrac{c}{a}=\\dfrac{0}{1}=0\\end{aligned}",
          "fallback": "α + β = −3/1 = −3; αβ = 0/1 = 0",
          "display": true
        }
      }
    ],
    "answer": "−3, 0",
    "answerMath": {
      "latex": "-3,\\;0",
      "fallback": "−3, 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q2(ii); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q2(iii)",
      "ta": "Exercise 3.9 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the sum and product of the roots of 3 + 1/a = 10/a²"
    },
    "q": {
      "en": "2. Find the sum and product of the roots for each of the following quadratic equations\n(iii) 3 + 1/a = 10/a²"
    },
    "questionMath": {
      "en": [
        "2. Find the sum and product of the roots for each of the following quadratic equations\n(iii) ",
        {
          "latex": "3+\\dfrac{1}{a}=\\dfrac{10}{a^2}",
          "fallback": "3 + 1/a = 10/a²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "First bring the equation to standard quadratic form by multiplying every term by a² (with a ≠ 0) so the denominators clear, then move 10 to the left side.",
        "eq": "3a² + a = 10 ⇒ 3a² + a − 10 = 0",
        "math": {
          "latex": "\\begin{aligned}3a^2+a&=10\\\\3a^2+a-10&=0\\end{aligned}",
          "fallback": "3a² + a = 10 ⇒ 3a² + a − 10 = 0",
          "display": true
        }
      },
      {
        "en": "Notice the equation's unknown is named a, so write the general coefficients as A, B, C in Aa² + Ba + C = 0 to avoid mixing up variables: A = 3, B = 1 (the implied coefficient of a), and C = −10.",
        "eq": "A = 3, B = 1, C = −10",
        "math": {
          "latex": "A=3,\\qquad B=1,\\qquad C=-10",
          "fallback": "A = 3, B = 1, C = −10",
          "display": true
        }
      },
      {
        "en": "Apply α + β = −B/A and αβ = C/A.",
        "eq": "α + β = −1/3; αβ = −10/3",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-\\dfrac{B}{A}=-\\dfrac{1}{3}\\\\\\alpha\\beta&=\\dfrac{C}{A}=-\\dfrac{10}{3}\\end{aligned}",
          "fallback": "α + β = −1/3; αβ = −10/3",
          "display": true
        }
      }
    ],
    "answer": "−1/3, −10/3",
    "answerMath": {
      "latex": "-\\dfrac{1}{3},\\;-\\dfrac{10}{3}",
      "fallback": "−1/3, −10/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q2(iii); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-9-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.9",
    "topic": {
      "en": "Algebra — Formation and Roots of Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.9 · Q2(iv)",
      "ta": "Exercise 3.9 · Q2(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the sum and product of the roots of 3y² − y − 4 = 0"
    },
    "q": {
      "en": "2. Find the sum and product of the roots for each of the following quadratic equations\n(iv) 3y² − y − 4 = 0"
    },
    "questionMath": {
      "en": [
        "2. Find the sum and product of the roots for each of the following quadratic equations\n(iv) ",
        {
          "latex": "3y^2-y-4=0",
          "fallback": "3y² − y − 4 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 3y² − y − 4 = 0 with ay² + by + c = 0. Because −y = (−1)y, the coefficient b is −1, while a = 3 and c = −4.",
        "eq": "a = 3, b = −1, c = −4",
        "math": {
          "latex": "a=3,\\qquad b=-1,\\qquad c=-4",
          "fallback": "a = 3, b = −1, c = −4",
          "display": true
        }
      },
      {
        "en": "Substitute into α + β = −b/a and αβ = c/a. Notice that −b = −(−1) = +1, so the sum of the roots is positive 1/3, while the product is −4/3.",
        "eq": "α + β = −(−1)/3 = 1/3; αβ = −4/3",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-\\dfrac{b}{a}=-\\dfrac{-1}{3}=\\dfrac{1}{3}\\\\\\alpha\\beta&=\\dfrac{c}{a}=\\dfrac{-4}{3}=-\\dfrac{4}{3}\\end{aligned}",
          "fallback": "α + β = −(−1)/3 = 1/3; αβ = −4/3",
          "display": true
        }
      }
    ],
    "answer": "1/3, −4/3",
    "answerMath": {
      "latex": "\\dfrac{1}{3},\\;\\dfrac{-4}{3}",
      "fallback": "1/3, −4/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.9 Q2(iv); printed p. 109, PDF p. 115; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.9 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
