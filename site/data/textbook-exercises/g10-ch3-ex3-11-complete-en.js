/* Grade 10 Ch 3 Ex 3.11 (Q1(i)-(ii), Q2(i)-(iv), Q3) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 120 (printed p. 114), Tamil PDF p. 122 (printed p. 116),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-11-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q1(i)",
      "ta": "Exercise 3.11 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve 9x² − 12x + 4 = 0 by completing the square method"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by completing the square method\n(i) 9x² − 12x + 4 = 0"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by completing the square method\n(i) ",
        {
          "latex": "9x^2-12x+4=0",
          "fallback": "9x² − 12x + 4 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "To complete the square, first make the coefficient of x² equal to 1 by dividing every term by 9 (including the constant 4 and 0). Simplify −12/9 to −4/3, then move the constant term +4/9 to the right-hand side as −4/9.",
        "eq": "x² − (4/3)x + 4/9 = 0 ⇒ x² − (4/3)x = −4/9",
        "math": {
          "latex": "\\begin{aligned}x^2-\\dfrac{12}{9}x+\\dfrac{4}{9}&=0\\\\x^2-\\dfrac{4}{3}x&=-\\dfrac{4}{9}\\end{aligned}",
          "fallback": "x² − (4/3)x + 4/9 = 0 ⇒ x² − (4/3)x = −4/9",
          "display": true
        }
      },
      {
        "en": "Take half of the x-coefficient: half of (−4/3) is −2/3. Square it: (−2/3)² = 4/9. Add 4/9 to BOTH sides so the left side becomes the exact square (x − 2/3)².",
        "eq": "x² − (4/3)x + (2/3)² = −4/9 + 4/9 ⇒ (x − 2/3)² = 0",
        "math": {
          "latex": "\\begin{aligned}x^2-\\dfrac{4}{3}x+\\left(\\dfrac{2}{3}\\right)^2&=-\\dfrac{4}{9}+\\dfrac{4}{9}\\\\\\left(x-\\dfrac{2}{3}\\right)^2&=0\\end{aligned}",
          "fallback": "x² − (4/3)x + (2/3)² = −4/9 + 4/9 ⇒ (x − 2/3)² = 0",
          "display": true
        }
      },
      {
        "en": "Take the square root on both sides. Since the right side is 0, there is one repeated root x = 2/3, 2/3.",
        "eq": "x − 2/3 = 0 ⇒ x = 2/3, 2/3",
        "math": {
          "latex": "x-\\dfrac{2}{3}=0\\implies x=\\dfrac{2}{3},\\;\\dfrac{2}{3}",
          "fallback": "x − 2/3 = 0 ⇒ x = 2/3, 2/3",
          "display": true
        }
      }
    ],
    "answer": "2/3, 2/3",
    "answerMath": {
      "latex": "\\dfrac{2}{3},\\;\\dfrac{2}{3}",
      "fallback": "2/3, 2/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q1(i); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q1(ii)",
      "ta": "Exercise 3.11 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve (5x + 7)/(x − 1) = 3x + 2 by completing the square method"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by completing the square method\n(ii) (5x + 7)/(x − 1) = 3x + 2"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by completing the square method\n(ii) ",
        {
          "latex": "\\dfrac{5x+7}{x-1}=3x+2",
          "fallback": "(5x + 7)/(x − 1) = 3x + 2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Note that x ≠ 1 so the denominator (x − 1) is never zero. Multiply both sides by (x − 1), expand (3x + 2)(x − 1) carefully, and collect all terms on one side to get a standard quadratic equation.",
        "eq": "5x + 7 = (3x + 2)(x − 1) = 3x² − x − 2 ⇒ 3x² − 6x − 9 = 0",
        "math": {
          "latex": "\\begin{aligned}5x+7&=(3x+2)(x-1)\\\\5x+7&=3x^2-3x+2x-2\\\\5x+7&=3x^2-x-2\\\\3x^2-6x-9&=0\\end{aligned}",
          "fallback": "5x + 7 = (3x + 2)(x − 1) = 3x² − x − 2 ⇒ 3x² − 6x − 9 = 0",
          "display": true
        }
      },
      {
        "en": "Divide every term by 3 so the coefficient of x² becomes 1, and move the constant −3 to the right-hand side as +3. Then add (half of −2)² = (−1)² = 1 to BOTH sides to complete the square.",
        "eq": "x² − 2x − 3 = 0 ⇒ x² − 2x = 3 ⇒ x² − 2x + 1 = 3 + 1 ⇒ (x − 1)² = 4",
        "math": {
          "latex": "\\begin{aligned}x^2-2x-3&=0\\\\x^2-2x&=3\\\\x^2-2x+1&=3+1\\\\(x-1)^2&=4\\end{aligned}",
          "fallback": "x² − 2x − 3 = 0 ⇒ x² − 2x = 3 ⇒ x² − 2x + 1 = 3 + 1 ⇒ (x − 1)² = 4",
          "display": true
        }
      },
      {
        "en": "Take the square root of both sides, remembering BOTH +2 and −2 satisfy (±2)² = 4. Solve both cases and confirm neither equals the excluded value x = 1.",
        "eq": "x − 1 = ±2 ⇒ x = 1 + 2 = 3 or x = 1 − 2 = −1",
        "math": {
          "latex": "\\begin{aligned}x-1&=\\pm 2\\\\x=1+2=3&\\quad\\text{or}\\quad x=1-2=-1\\end{aligned}",
          "fallback": "x − 1 = ±2 ⇒ x = 1 + 2 = 3 or x = 1 − 2 = −1",
          "display": true
        }
      }
    ],
    "answer": "−1, 3",
    "answerMath": {
      "latex": "-1,\\;3",
      "fallback": "−1, 3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q1(ii); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q2(i)",
      "ta": "Exercise 3.11 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve 2x² − 5x + 2 = 0 by formula method"
    },
    "q": {
      "en": "2. Solve the following quadratic equations by formula method\n(i) 2x² − 5x + 2 = 0"
    },
    "questionMath": {
      "en": [
        "2. Solve the following quadratic equations by formula method\n(i) ",
        {
          "latex": "2x^2-5x+2=0",
          "fallback": "2x² − 5x + 2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 2x² − 5x + 2 = 0 with ax² + bx + c = 0. Notice that the minus sign belongs to b, so b = −5, while a = 2 and c = 2.",
        "eq": "a = 2, b = −5, c = 2",
        "math": {
          "latex": "a=2,\\qquad b=-5,\\qquad c=2",
          "fallback": "a = 2, b = −5, c = 2",
          "display": true
        }
      },
      {
        "en": "Substitute into the quadratic formula x = [−b ± √(b² − 4ac)] / (2a). Because b = −5, −b = −(−5) = +5 and b² = (−5)² = +25. Also 4ac = 4(2)(2) = 16, giving discriminant 25 − 16 = 9.",
        "eq": "x = [−(−5) ± √((−5)² − 4(2)(2))] / (2·2) = (5 ± √9)/4 = (5 ± 3)/4",
        "math": {
          "latex": "\\begin{aligned}x&=\\dfrac{-(-5)\\pm\\sqrt{(-5)^2-4(2)(2)}}{2(2)}\\\\&=\\dfrac{5\\pm\\sqrt{25-16}}{4}=\\dfrac{5\\pm 3}{4}\\end{aligned}",
          "fallback": "x = [−(−5) ± √((−5)² − 4(2)(2))] / (2·2) = (5 ± √9)/4 = (5 ± 3)/4",
          "display": true
        }
      },
      {
        "en": "Evaluate the + and − branches separately and simplify fractions to lowest terms.",
        "eq": "x = (5 + 3)/4 = 8/4 = 2; x = (5 − 3)/4 = 2/4 = 1/2",
        "math": {
          "latex": "\\begin{aligned}x&=\\dfrac{5+3}{4}=\\dfrac{8}{4}=2\\\\x&=\\dfrac{5-3}{4}=\\dfrac{2}{4}=\\dfrac{1}{2}\\end{aligned}",
          "fallback": "x = (5 + 3)/4 = 8/4 = 2; x = (5 − 3)/4 = 2/4 = 1/2",
          "display": true
        }
      }
    ],
    "answer": "2, 1/2",
    "answerMath": {
      "latex": "2,\\;\\dfrac{1}{2}",
      "fallback": "2, 1/2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q2(i); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q2(ii)",
      "ta": "Exercise 3.11 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve √2 f² − 6f + 3√2 = 0 by formula method"
    },
    "q": {
      "en": "2. Solve the following quadratic equations by formula method\n(ii) √2 f² − 6f + 3√2 = 0"
    },
    "questionMath": {
      "en": [
        "2. Solve the following quadratic equations by formula method\n(ii) ",
        {
          "latex": "\\sqrt{2}\\,f^2-6f+3\\sqrt{2}=0",
          "fallback": "√2 f² − 6f + 3√2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare √2 f² − 6f + 3√2 = 0 with af² + bf + c = 0. Identify a = √2, b = −6 (include the minus sign), and c = 3√2.",
        "eq": "a = √2, b = −6, c = 3√2",
        "math": {
          "latex": "a=\\sqrt{2},\\qquad b=-6,\\qquad c=3\\sqrt{2}",
          "fallback": "a = √2, b = −6, c = 3√2",
          "display": true
        }
      },
      {
        "en": "Apply the quadratic formula f = [−b ± √(b² − 4ac)] / (2a). Multiply 4ac = 4(√2)(3√2) = 12 × 2 = 24, so the discriminant is (−6)² − 24 = 36 − 24 = 12. Simplify √12 = √(4 × 3) = 2√3.",
        "eq": "f = [6 ± √(36 − 24)] / (2√2) = (6 ± √12)/(2√2) = (6 ± 2√3)/(2√2)",
        "math": {
          "latex": "\\begin{aligned}f&=\\dfrac{-(-6)\\pm\\sqrt{(-6)^2-4(\\sqrt{2})(3\\sqrt{2})}}{2\\sqrt{2}}\\\\&=\\dfrac{6\\pm\\sqrt{36-24}}{2\\sqrt{2}}=\\dfrac{6\\pm 2\\sqrt{3}}{2\\sqrt{2}}\\end{aligned}",
          "fallback": "f = [6 ± √(36 − 24)] / (2√2) = (6 ± √12)/(2√2) = (6 ± 2√3)/(2√2)",
          "display": true
        }
      },
      {
        "en": "Factor the common 2 out of the numerator (6 ± 2√3) = 2(3 ± √3) and cancel 2 with the 2 in the denominator 2√2.",
        "eq": "f = 2(3 ± √3)/(2√2) = (3 ± √3)/√2",
        "math": {
          "latex": "f=\\dfrac{2(3\\pm\\sqrt{3})}{2\\sqrt{2}}=\\dfrac{3\\pm\\sqrt{3}}{\\sqrt{2}}",
          "fallback": "f = 2(3 ± √3)/(2√2) = (3 ± √3)/√2",
          "display": true
        }
      }
    ],
    "answer": "(3 + √3)/√2, (3 − √3)/√2",
    "answerMath": {
      "latex": "\\dfrac{3+\\sqrt{3}}{\\sqrt{2}},\\;\\dfrac{3-\\sqrt{3}}{\\sqrt{2}}",
      "fallback": "(3 + √3)/√2, (3 − √3)/√2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q2(ii); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q2(iii)",
      "ta": "Exercise 3.11 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve 3y² − 20y − 23 = 0 by formula method"
    },
    "q": {
      "en": "2. Solve the following quadratic equations by formula method\n(iii) 3y² − 20y − 23 = 0"
    },
    "questionMath": {
      "en": [
        "2. Solve the following quadratic equations by formula method\n(iii) ",
        {
          "latex": "3y^2-20y-23=0",
          "fallback": "3y² − 20y − 23 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 3y² − 20y − 23 = 0 with ay² + by + c = 0. Both b and c carry minus signs: a = 3, b = −20, c = −23.",
        "eq": "a = 3, b = −20, c = −23",
        "math": {
          "latex": "a=3,\\qquad b=-20,\\qquad c=-23",
          "fallback": "a = 3, b = −20, c = −23",
          "display": true
        }
      },
      {
        "en": "Substitute into y = [−b ± √(b² − 4ac)] / (2a). Watch the signs carefully: −(−20) = +20, (−20)² = 400, and −4(3)(−23) = +276 because minus times minus is plus. Thus the discriminant is 400 + 276 = 676, and √676 = 26.",
        "eq": "y = [20 ± √(400 + 276)] / 6 = (20 ± √676)/6 = (20 ± 26)/6",
        "math": {
          "latex": "\\begin{aligned}y&=\\dfrac{-(-20)\\pm\\sqrt{(-20)^2-4(3)(-23)}}{2(3)}\\\\&=\\dfrac{20\\pm\\sqrt{400+276}}{6}=\\dfrac{20\\pm 26}{6}\\end{aligned}",
          "fallback": "y = [20 ± √(400 + 276)] / 6 = (20 ± √676)/6 = (20 ± 26)/6",
          "display": true
        }
      },
      {
        "en": "Compute the + and − branches and reduce each fraction to simplest form.",
        "eq": "y = (20 + 26)/6 = 46/6 = 23/3; y = (20 − 26)/6 = −6/6 = −1",
        "math": {
          "latex": "\\begin{aligned}y&=\\dfrac{20+26}{6}=\\dfrac{46}{6}=\\dfrac{23}{3}\\\\y&=\\dfrac{20-26}{6}=\\dfrac{-6}{6}=-1\\end{aligned}",
          "fallback": "y = (20 + 26)/6 = 46/6 = 23/3; y = (20 − 26)/6 = −6/6 = −1",
          "display": true
        }
      }
    ],
    "answer": "−1, 23/3",
    "answerMath": {
      "latex": "-1,\\;\\dfrac{23}{3}",
      "fallback": "−1, 23/3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q2(iii); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q2(iv)",
      "ta": "Exercise 3.11 · Q2(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Solve 36y² − 12ay + (a² − b²) = 0 by formula method"
    },
    "q": {
      "en": "2. Solve the following quadratic equations by formula method\n(iv) 36y² − 12ay + (a² − b²) = 0"
    },
    "questionMath": {
      "en": [
        "2. Solve the following quadratic equations by formula method\n(iv) ",
        {
          "latex": "36y^2-12ay+(a^2-b^2)=0",
          "fallback": "36y² − 12ay + (a² − b²) = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Here the quadratic variable is y while a and b are parameters. To avoid confusion with the standard coefficients, write A = 36, B = −12a, and C = a² − b².",
        "eq": "A = 36, B = −12a, C = a² − b²",
        "math": {
          "latex": "A=36,\\qquad B=-12a,\\qquad C=a^2-b^2",
          "fallback": "A = 36, B = −12a, C = a² − b²",
          "display": true
        }
      },
      {
        "en": "Substitute into y = [−B ± √(B² − 4AC)] / (2A). Expand B² = 144a² and −4(36)(a² − b²) = −144a² + 144b². The +144a² and −144a² cancel out completely, leaving discriminant 144b², whose square root is ±12b.",
        "eq": "y = [12a ± √(144a² − 144a² + 144b²)] / 72 = [12a ± 12b] / 72",
        "math": {
          "latex": "\\begin{aligned}y&=\\dfrac{-(-12a)\\pm\\sqrt{(-12a)^2-4(36)(a^2-b^2)}}{2(36)}\\\\&=\\dfrac{12a\\pm\\sqrt{144a^2-144a^2+144b^2}}{72}\\\\&=\\dfrac{12a\\pm 12b}{72}\\end{aligned}",
          "fallback": "y = [12a ± √(144a² − 144a² + 144b²)] / 72 = [12a ± 12b] / 72",
          "display": true
        }
      },
      {
        "en": "Factor 12 from the numerator and divide 12/72 = 1/6 to get the two roots.",
        "eq": "y = 12(a ± b)/72 = (a + b)/6, (a − b)/6",
        "math": {
          "latex": "y=\\dfrac{12(a\\pm b)}{72}=\\dfrac{a+b}{6},\\;\\dfrac{a-b}{6}",
          "fallback": "y = 12(a ± b)/72 = (a + b)/6, (a − b)/6",
          "display": true
        }
      }
    ],
    "answer": "(a + b)/6, (a − b)/6",
    "answerMath": {
      "latex": "\\dfrac{a+b}{6},\\;\\dfrac{a-b}{6}",
      "fallback": "(a + b)/6, (a − b)/6",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q2(iv); printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-11-q3",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.11",
    "topic": {
      "en": "Algebra — Completing the Square and Quadratic Formula"
    },
    "label": {
      "en": "Exercise 3.11 · Q3",
      "ta": "Exercise 3.11 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the time taken by a rolling ball to travel 11.25 feet"
    },
    "q": {
      "en": "3. A ball rolls down a slope and travels a distance d = t² − 0.75t feet in t seconds. Find the time when the distance travelled by the ball is 11.25 feet."
    },
    "questionMath": {
      "en": [
        "3. A ball rolls down a slope and travels a distance ",
        {
          "latex": "d=t^2-0.75t",
          "fallback": "d = t² − 0.75t",
          "display": false
        },
        " feet in t seconds. Find the time when the distance travelled by the ball is 11.25 feet."
      ]
    },
    "steps": [
      {
        "en": "Substitute d = 11.25 into d = t² − 0.75t. To remove decimals cleanly, convert 0.75 = 3/4 and 11.25 = 45/4 (or multiply every term by 4) so all coefficients become integers.",
        "eq": "t² − (3/4)t = 45/4 ⇒ 4t² − 3t = 45 ⇒ 4t² − 3t − 45 = 0",
        "math": {
          "latex": "\\begin{aligned}t^2-0.75t&=11.25\\\\t^2-\\dfrac{3}{4}t&=\\dfrac{45}{4}\\\\4t^2-3t-45&=0\\end{aligned}",
          "fallback": "t² − (3/4)t = 45/4 ⇒ 4t² − 3t = 45 ⇒ 4t² − 3t − 45 = 0",
          "display": true
        }
      },
      {
        "en": "Apply the quadratic formula with a = 4, b = −3, and c = −45. Here −4(4)(−45) = +720, so the discriminant is (−3)² + 720 = 9 + 720 = 729, and √729 = 27.",
        "eq": "t = [−(−3) ± √(9 + 720)] / 8 = (3 ± √729)/8 = (3 ± 27)/8",
        "math": {
          "latex": "\\begin{aligned}t&=\\dfrac{-(-3)\\pm\\sqrt{(-3)^2-4(4)(-45)}}{2(4)}\\\\&=\\dfrac{3\\pm\\sqrt{9+720}}{8}=\\dfrac{3\\pm 27}{8}\\end{aligned}",
          "fallback": "t = [−(−3) ± √(9 + 720)] / 8 = (3 ± √729)/8 = (3 ± 27)/8",
          "display": true
        }
      },
      {
        "en": "Solve both branches: t = (3 + 27)/8 = 30/8 = 3.75 or t = (3 − 27)/8 = −24/8 = −3. Since time cannot be negative, reject t = −3. Check t = 3.75: (3.75)² − 0.75(3.75) = 14.0625 − 2.8125 = 11.25 feet.",
        "eq": "t = 30/8 = 3.75 seconds (reject t = −3)",
        "math": {
          "latex": "t=\\dfrac{30}{8}=3.75\\text{ s}\\quad(\\text{reject }t=\\dfrac{-24}{8}=-3)",
          "fallback": "t = 30/8 = 3.75 seconds (reject t = −3)",
          "display": true
        }
      }
    ],
    "answer": "3.75 seconds",
    "answerMath": {
      "latex": "3.75\\text{ seconds}",
      "fallback": "3.75 seconds",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.11 Q3; printed p. 114, PDF p. 120; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.11 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
