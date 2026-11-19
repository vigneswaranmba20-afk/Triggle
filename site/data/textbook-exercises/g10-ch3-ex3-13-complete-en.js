/* Grade 10 Ch 3 Ex 3.13 (Q1(i)–(v), Q2(i)–(ii), Q3–Q5) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 125 (printed p. 119), Tamil PDF p. 127 (printed p. 121),
   and Answer Appendix PDF p. 344 (printed p. 338) / Tamil Answer Appendix PDF p. 358 (printed p. 352);
   Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-13-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Nature of Roots of a Quadratic Equation"
    },
    "label": {
      "en": "Exercise 3.13 · Q1(i)",
      "ta": "Exercise 3.13 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the nature of the roots of 15x² + 11x + 2 = 0"
    },
    "q": {
      "en": "1. Determine the nature of the roots for the following quadratic equations\n(i) 15x² + 11x + 2 = 0"
    },
    "questionMath": {
      "en": [
        "1. Determine the nature of the roots for the following quadratic equations\n(i) ",
        {
          "latex": "15x^2+11x+2=0",
          "fallback": "15x² + 11x + 2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare the given equation 15x² + 11x + 2 = 0 with the standard quadratic form ax² + bx + c = 0, where a is the coefficient of x², b is the coefficient of x, and c is the constant term.",
        "eq": "a = 15, b = 11, c = 2",
        "math": {
          "latex": "a=15,\\quad b=11,\\quad c=2",
          "fallback": "a = 15, b = 11, c = 2",
          "display": true
        }
      },
      {
        "en": "Define the discriminant Δ = b² − 4ac, which tells us the nature of the roots. Substitute a = 15, b = 11, and c = 2 into Δ = b² − 4ac and simplify.",
        "eq": "Δ = b² − 4ac = 11² − 4(15)(2) = 121 − 120 = 1",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=b^2-4ac\\\\&=11^2-4(15)(2)\\\\&=121-120=1\\end{aligned}",
          "fallback": "Δ = b² − 4ac = 11² − 4(15)(2) = 121 − 120 = 1",
          "display": true
        }
      },
      {
        "en": "Because Δ = 1 is strictly greater than 0 (Δ > 0), √Δ is a non-zero real number, so the two roots are real and unequal.",
        "eq": "Δ = 1 > 0, so the roots are real and unequal",
        "math": {
          "latex": "\\Delta=1>0\\quad(\\text{real and unequal roots})",
          "fallback": "Δ = 1 > 0, so the roots are real and unequal",
          "display": true
        }
      }
    ],
    "answer": "Real and unequal",
    "answerMath": {
      "latex": "\\text{Real and unequal}",
      "fallback": "Real and unequal",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q1(i); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Nature of Roots of a Quadratic Equation"
    },
    "label": {
      "en": "Exercise 3.13 · Q1(ii)",
      "ta": "Exercise 3.13 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the nature of the roots of x² − x − 1 = 0"
    },
    "q": {
      "en": "1. Determine the nature of the roots for the following quadratic equations\n(ii) x² − x − 1 = 0"
    },
    "questionMath": {
      "en": [
        "1. Determine the nature of the roots for the following quadratic equations\n(ii) ",
        {
          "latex": "x^2-x-1=0",
          "fallback": "x² − x − 1 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare x² − x − 1 = 0 with the standard quadratic equation ax² + bx + c = 0, where a is the coefficient of x², b is the coefficient of x, and c is the constant term. Watch the negative signs on b and c.",
        "eq": "a = 1, b = −1, c = −1",
        "math": {
          "latex": "a=1,\\quad b=-1,\\quad c=-1",
          "fallback": "a = 1, b = −1, c = −1",
          "display": true
        }
      },
      {
        "en": "Use the discriminant Δ = b² − 4ac. Because (−1)² = +1 and subtracting 4(1)(−1) adds 4, compute Δ carefully.",
        "eq": "Δ = b² − 4ac = (−1)² − 4(1)(−1) = 1 + 4 = 5",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=b^2-4ac\\\\&=(-1)^2-4(1)(-1)\\\\&=1+4=5\\end{aligned}",
          "fallback": "Δ = b² − 4ac = (−1)² − 4(1)(−1) = 1 + 4 = 5",
          "display": true
        }
      },
      {
        "en": "Since Δ = 5 is greater than 0 (Δ > 0), √5 is a non-zero real number, so the quadratic equation has real and unequal roots.",
        "eq": "Δ = 5 > 0, so the roots are real and unequal",
        "math": {
          "latex": "\\Delta=5>0\\quad(\\text{real and unequal roots})",
          "fallback": "Δ = 5 > 0, so the roots are real and unequal",
          "display": true
        }
      }
    ],
    "answer": "Real and unequal",
    "answerMath": {
      "latex": "\\text{Real and unequal}",
      "fallback": "Real and unequal",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q1(ii); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Nature of Roots of a Quadratic Equation"
    },
    "label": {
      "en": "Exercise 3.13 · Q1(iii)",
      "ta": "Exercise 3.13 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the nature of the roots of √2 t² − 3t + 3√2 = 0"
    },
    "q": {
      "en": "1. Determine the nature of the roots for the following quadratic equations\n(iii) √2 t² − 3t + 3√2 = 0"
    },
    "questionMath": {
      "en": [
        "1. Determine the nature of the roots for the following quadratic equations\n(iii) ",
        {
          "latex": "\\sqrt{2}\\,t^2-3t+3\\sqrt{2}=0",
          "fallback": "√2 t² − 3t + 3√2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare √2 t² − 3t + 3√2 = 0 with the standard quadratic form at² + bt + c = 0 (here t is the variable, a is the coefficient of t², b is the coefficient of t, and c is the constant term).",
        "eq": "a = √2, b = −3, c = 3√2",
        "math": {
          "latex": "a=\\sqrt{2},\\quad b=-3,\\quad c=3\\sqrt{2}",
          "fallback": "a = √2, b = −3, c = 3√2",
          "display": true
        }
      },
      {
        "en": "Evaluate the discriminant Δ = b² − 4ac. Notice that √2 × √2 = 2, so 4(√2)(3√2) = 12 × 2 = 24.",
        "eq": "Δ = (−3)² − 4(√2)(3√2) = 9 − 24 = −15",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=b^2-4ac\\\\&=(-3)^2-4(\\sqrt{2})(3\\sqrt{2})\\\\&=9-24=-15\\end{aligned}",
          "fallback": "Δ = (−3)² − 4(√2)(3√2) = 9 − 24 = −15",
          "display": true
        }
      },
      {
        "en": "Because Δ = −15 is negative (Δ < 0), √(−15) is not a real number, so the equation has no real roots (the roots are not real).",
        "eq": "Δ = −15 < 0, so the roots are not real",
        "math": {
          "latex": "\\Delta=-15<0\\quad(\\text{not real})",
          "fallback": "Δ = −15 < 0, so the roots are not real",
          "display": true
        }
      }
    ],
    "answer": "Not real",
    "answerMath": {
      "latex": "\\text{Not real}",
      "fallback": "Not real",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q1(iii); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Nature of Roots of a Quadratic Equation"
    },
    "label": {
      "en": "Exercise 3.13 · Q1(iv)",
      "ta": "Exercise 3.13 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the nature of the roots of 9y² − 6√2 y + 2 = 0"
    },
    "q": {
      "en": "1. Determine the nature of the roots for the following quadratic equations\n(iv) 9y² − 6√2 y + 2 = 0"
    },
    "questionMath": {
      "en": [
        "1. Determine the nature of the roots for the following quadratic equations\n(iv) ",
        {
          "latex": "9y^2-6\\sqrt{2}\\,y+2=0",
          "fallback": "9y² − 6√2 y + 2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 9y² − 6√2 y + 2 = 0 with the standard quadratic form ay² + by + c = 0 (where y is the variable, a is the coefficient of y², b is the coefficient of y, and c is the constant term).",
        "eq": "a = 9, b = −6√2, c = 2",
        "math": {
          "latex": "a=9,\\quad b=-6\\sqrt{2},\\quad c=2",
          "fallback": "a = 9, b = −6√2, c = 2",
          "display": true
        }
      },
      {
        "en": "Compute the discriminant Δ = b² − 4ac. When squaring −6√2, square both factors: (−6)² × (√2)² = 36 × 2 = 72.",
        "eq": "Δ = (−6√2)² − 4(9)(2) = 72 − 72 = 0",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=b^2-4ac\\\\&=(-6\\sqrt{2})^2-4(9)(2)\\\\&=36(2)-72\\\\&=72-72=0\\end{aligned}",
          "fallback": "Δ = (−6√2)² − 4(9)(2) = 72 − 72 = 0",
          "display": true
        }
      },
      {
        "en": "Because Δ = 0, the ±√Δ part of the quadratic formula vanishes, leaving a single repeated real value (−b)/(2a), so the roots are real and equal.",
        "eq": "Δ = 0, so the roots are real and equal",
        "math": {
          "latex": "\\Delta=0\\quad(\\text{real and equal roots})",
          "fallback": "Δ = 0, so the roots are real and equal",
          "display": true
        }
      }
    ],
    "answer": "Real and equal",
    "answerMath": {
      "latex": "\\text{Real and equal}",
      "fallback": "Real and equal",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q1(iv); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q1-v",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Nature of Roots of a Quadratic Equation"
    },
    "label": {
      "en": "Exercise 3.13 · Q1(v)",
      "ta": "Exercise 3.13 · Q1(v) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine the nature of the roots of 9a²b²x² − 24abcdx + 16c²d² = 0"
    },
    "q": {
      "en": "1. Determine the nature of the roots for the following quadratic equations\n(v) 9a²b²x² − 24abcdx + 16c²d² = 0, a ≠ 0, b ≠ 0"
    },
    "questionMath": {
      "en": [
        "1. Determine the nature of the roots for the following quadratic equations\n(v) ",
        {
          "latex": "9a^2b^2x^2-24abcdx+16c^2d^2=0,\\;a\\neq 0,\\;b\\neq 0",
          "fallback": "9a²b²x² − 24abcdx + 16c²d² = 0, a ≠ 0, b ≠ 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Because the letters a, b, c, d already appear inside the equation, write the standard quadratic form using capital letters Ax² + Bx + C = 0, where A is the coefficient of x² (non-zero because a ≠ 0 and b ≠ 0), B is the coefficient of x, and C is the constant term.",
        "eq": "A = 9a²b², B = −24abcd, C = 16c²d²",
        "math": {
          "latex": "A=9a^2b^2,\\quad B=-24abcd,\\quad C=16c^2d^2",
          "fallback": "A = 9a²b², B = −24abcd, C = 16c²d²",
          "display": true
        }
      },
      {
        "en": "Define the discriminant Δ = B² − 4AC and substitute A, B, and C. Square −24 to get 576, and multiply 4 × 9 × 16 = 36 × 16 = 576.",
        "eq": "Δ = (−24abcd)² − 4(9a²b²)(16c²d²) = 576a²b²c²d² − 576a²b²c²d² = 0",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=B^2-4AC\\\\&=(-24abcd)^2-4(9a^2b^2)(16c^2d^2)\\\\&=576a^2b^2c^2d^2-576a^2b^2c^2d^2\\\\&=0\\end{aligned}",
          "fallback": "Δ = (−24abcd)² − 4(9a²b²)(16c²d²) = 576a²b²c²d² − 576a²b²c²d² = 0",
          "display": true
        }
      },
      {
        "en": "Since the discriminant Δ equals 0 (and the equation is a valid quadratic with 9a²b² ≠ 0), the roots are real and equal.",
        "eq": "Δ = 0, so the roots are real and equal",
        "math": {
          "latex": "\\Delta=0\\quad(\\text{real and equal roots})",
          "fallback": "Δ = 0, so the roots are real and equal",
          "display": true
        }
      }
    ],
    "answer": "Real and equal",
    "answerMath": {
      "latex": "\\text{Real and equal}",
      "fallback": "Real and equal",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q1(v); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Finding Parameters for Real and Equal Roots"
    },
    "label": {
      "en": "Exercise 3.13 · Q2(i)",
      "ta": "Exercise 3.13 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find k so that (5k − 6)x² + 2kx + 1 = 0 has real and equal roots"
    },
    "q": {
      "en": "2. Find the value(s) of ‘k’ for which the roots of the following equations are real and equal.\n(i) (5k − 6)x² + 2kx + 1 = 0"
    },
    "questionMath": {
      "en": [
        "2. Find the value(s) of ‘k’ for which the roots of the following equations are real and equal.\n(i) ",
        {
          "latex": "(5k-6)x^2+2kx+1=0",
          "fallback": "(5k − 6)x² + 2kx + 1 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare (5k − 6)x² + 2kx + 1 = 0 with the standard quadratic form ax² + bx + c = 0, where a is the coefficient of x², b is the coefficient of x, and c is the constant term. For the equation to be quadratic, a = 5k − 6 must be non-zero (k ≠ 6/5).",
        "eq": "a = 5k − 6 (with 5k − 6 ≠ 0), b = 2k, c = 1",
        "math": {
          "latex": "a=5k-6\\neq 0,\\quad b=2k,\\quad c=1",
          "fallback": "a = 5k − 6 (with 5k − 6 ≠ 0), b = 2k, c = 1",
          "display": true
        }
      },
      {
        "en": "A quadratic equation has real and equal roots precisely when its discriminant Δ = b² − 4ac equals 0. Substitute a, b, and c into Δ = 0 and expand.",
        "eq": "(2k)² − 4(5k − 6)(1) = 0; 4k² − 20k + 24 = 0",
        "math": {
          "latex": "\\begin{aligned}\\Delta=b^2-4ac&=0\\\\(2k)^2-4(5k-6)(1)&=0\\\\4k^2-20k+24&=0\\end{aligned}",
          "fallback": "(2k)² − 4(5k − 6)(1) = 0; 4k² − 20k + 24 = 0",
          "display": true
        }
      },
      {
        "en": "Divide every term by 4 to simplify the coefficients, then factor into two linear factors using numbers whose product is +6 and sum is −5 (namely −2 and −3).",
        "eq": "k² − 5k + 6 = 0; (k − 2)(k − 3) = 0",
        "math": {
          "latex": "\\begin{aligned}k^2-5k+6&=0\\\\(k-2)(k-3)&=0\\end{aligned}",
          "fallback": "k² − 5k + 6 = 0; (k − 2)(k − 3) = 0",
          "display": true
        }
      },
      {
        "en": "Set each factor to zero: k − 2 = 0 gives k = 2, and k − 3 = 0 gives k = 3. Check that neither value makes 5k − 6 zero: at k = 2, 5(2) − 6 = 4 ≠ 0; at k = 3, 5(3) − 6 = 9 ≠ 0.",
        "eq": "k = 2 or k = 3",
        "math": {
          "latex": "k=2\\quad\\text{or}\\quad k=3",
          "fallback": "k = 2 or k = 3",
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
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q2(i); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Finding Parameters for Real and Equal Roots"
    },
    "label": {
      "en": "Exercise 3.13 · Q2(ii)",
      "ta": "Exercise 3.13 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find k so that kx² + (6k + 2)x + 16 = 0 has real and equal roots"
    },
    "q": {
      "en": "2. Find the value(s) of ‘k’ for which the roots of the following equations are real and equal.\n(ii) kx² + (6k + 2)x + 16 = 0"
    },
    "questionMath": {
      "en": [
        "2. Find the value(s) of ‘k’ for which the roots of the following equations are real and equal.\n(ii) ",
        {
          "latex": "kx^2+(6k+2)x+16=0",
          "fallback": "kx² + (6k + 2)x + 16 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare kx² + (6k + 2)x + 16 = 0 with ax² + bx + c = 0, where a is the coefficient of x² (with k ≠ 0 so the equation remains quadratic), b is the coefficient of x, and c is the constant term.",
        "eq": "a = k (with k ≠ 0), b = 6k + 2, c = 16",
        "math": {
          "latex": "a=k\\neq 0,\\quad b=6k+2,\\quad c=16",
          "fallback": "a = k (with k ≠ 0), b = 6k + 2, c = 16",
          "display": true
        }
      },
      {
        "en": "For real and equal roots, set the discriminant Δ = b² − 4ac equal to 0. Expand (6k + 2)² = 36k² + 24k + 4 and subtract 4(k)(16) = 64k.",
        "eq": "(6k + 2)² − 4(k)(16) = 0; 36k² + 24k + 4 − 64k = 0; 36k² − 40k + 4 = 0",
        "math": {
          "latex": "\\begin{aligned}(6k+2)^2-4(k)(16)&=0\\\\36k^2+24k+4-64k&=0\\\\36k^2-40k+4&=0\\end{aligned}",
          "fallback": "(6k + 2)² − 4(k)(16) = 0; 36k² + 24k + 4 − 64k = 0; 36k² − 40k + 4 = 0",
          "display": true
        }
      },
      {
        "en": "Divide both sides by 4 to get 9k² − 10k + 1 = 0. Split −10k as −9k − k (since (−9)(−1) = 9 and −9 − 1 = −10) and factor by grouping.",
        "eq": "9k² − 10k + 1 = 0; 9k(k − 1) − 1(k − 1) = 0; (9k − 1)(k − 1) = 0",
        "math": {
          "latex": "\\begin{aligned}9k^2-10k+1&=0\\\\9k^2-9k-k+1&=0\\\\9k(k-1)-1(k-1)&=0\\\\(9k-1)(k-1)&=0\\end{aligned}",
          "fallback": "9k² − 10k + 1 = 0; 9k(k − 1) − 1(k − 1) = 0; (9k − 1)(k − 1) = 0",
          "display": true
        }
      },
      {
        "en": "Equate each factor to zero: k − 1 = 0 gives k = 1, and 9k − 1 = 0 gives k = 1/9. Both values are non-zero, so both give valid quadratic equations.",
        "eq": "k = 1 or k = 1/9",
        "math": {
          "latex": "k=1\\quad\\text{or}\\quad k=\\dfrac{1}{9}",
          "fallback": "k = 1 or k = 1/9",
          "display": true
        }
      }
    ],
    "answer": "1, 1/9",
    "answerMath": {
      "latex": "1,\\;\\dfrac{1}{9}",
      "fallback": "1, 1/9",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q2(ii); printed p. 119, PDF p. 125; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q3",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Proving Conditions from Equal Roots"
    },
    "label": {
      "en": "Exercise 3.13 · Q3",
      "ta": "Exercise 3.13 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Prove that b, a, c are in A.P. when (a − b)x² + (b − c)x + (c − a) = 0 has equal roots"
    },
    "q": {
      "en": "3. If the roots of (a − b)x² + (b − c)x + (c − a) = 0 are real and equal, then prove that b, a, c are in arithmetic progression."
    },
    "questionMath": {
      "en": [
        "3. If the roots of ",
        {
          "latex": "(a-b)x^2+(b-c)x+(c-a)=0",
          "fallback": "(a − b)x² + (b − c)x + (c − a) = 0",
          "display": false
        },
        " are real and equal, then prove that ",
        {
          "latex": "b,\\,a,\\,c",
          "fallback": "b, a, c",
          "display": false
        },
        " are in arithmetic progression."
      ]
    },
    "steps": [
      {
        "en": "Because a, b, and c appear in the given equation, denote the standard quadratic coefficients by capital letters A, B, and C in Ax² + Bx + C = 0, where A is the coefficient of x² (with a − b ≠ 0 for a quadratic equation), B is the coefficient of x, and C is the constant term.",
        "eq": "A = a − b, B = b − c, C = c − a",
        "math": {
          "latex": "A=a-b,\\quad B=b-c,\\quad C=c-a",
          "fallback": "A = a − b, B = b − c, C = c − a",
          "display": true
        }
      },
      {
        "en": "Since the roots are real and equal, set the discriminant Δ = B² − 4AC equal to 0, and expand both (b − c)² and −4(a − b)(c − a).",
        "eq": "(b − c)² − 4(a − b)(c − a) = 0; b² − 2bc + c² − 4(ac − a² − bc + ab) = 0",
        "math": {
          "latex": "\\begin{aligned}(b-c)^2-4(a-b)(c-a)&=0\\\\b^2-2bc+c^2-4(ac-a^2-bc+ab)&=0\\end{aligned}",
          "fallback": "(b − c)² − 4(a − b)(c − a) = 0; b² − 2bc + c² − 4(ac − a² − bc + ab) = 0",
          "display": true
        }
      },
      {
        "en": "Distribute −4 across the bracket and combine −2bc + 4bc = +2bc. Notice that b² + 2bc + c² forms (b + c)², and −4ac − 4ab factors as −4a(b + c).",
        "eq": "b² + 2bc + c² − 4ab − 4ac + 4a² = 0; (b + c)² − 4a(b + c) + 4a² = 0",
        "math": {
          "latex": "\\begin{aligned}b^2+2bc+c^2-4ab-4ac+4a^2&=0\\\\(b+c)^2-4a(b+c)+4a^2&=0\\end{aligned}",
          "fallback": "b² + 2bc + c² − 4ab − 4ac + 4a² = 0; (b + c)² − 4a(b + c) + 4a² = 0",
          "display": true
        }
      },
      {
        "en": "Recognize the left-hand side as the perfect square [(b + c) − 2a]² using u² − 4au + 4a² = (u − 2a)² with u = b + c. Taking the square root of 0 gives b + c − 2a = 0, so 2a = b + c (equivalently a − b = c − a), which proves b, a, c have a common difference and are in arithmetic progression.",
        "eq": "((b + c) − 2a)² = 0; b + c = 2a; a − b = c − a, so b, a, c are in A.P.",
        "math": {
          "latex": "\\begin{aligned}\\big((b+c)-2a\\big)^2&=0\\\\b+c-2a&=0\\\\b+c&=2a\\\\a-b&=c-a\\end{aligned}",
          "fallback": "((b + c) − 2a)² = 0; b + c = 2a; a − b = c − a, so b, a, c are in A.P.",
          "display": true
        }
      }
    ],
    "answer": "Hence proved: b, a, c are in arithmetic progression.",
    "answerMath": {
      "latex": "\\begin{aligned}2a&=b+c\\\\\\text{Hence }b,a,c&\\text{ are in A.P.}\\end{aligned}",
      "fallback": "Hence proved: b, a, c are in arithmetic progression.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q3; printed p. 119, PDF p. 125; source image checked (proof question; no Appendix entry).",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Proving Roots Are Real and Unequal"
    },
    "label": {
      "en": "Exercise 3.13 · Q4",
      "ta": "Exercise 3.13 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Show that (a − b)x² − 6(a + b)x − 9(a − b) = 0 has real and unequal roots"
    },
    "q": {
      "en": "4. If a, b are real then show that the roots of the equation (a − b)x² − 6(a + b)x − 9(a − b) = 0 are real and unequal."
    },
    "questionMath": {
      "en": [
        "4. If ",
        {
          "latex": "a,\\,b",
          "fallback": "a, b",
          "display": false
        },
        " are real then show that the roots of the equation ",
        {
          "latex": "(a-b)x^2-6(a+b)x-9(a-b)=0",
          "fallback": "(a − b)x² − 6(a + b)x − 9(a − b) = 0",
          "display": false
        },
        " are real and unequal."
      ]
    },
    "steps": [
      {
        "en": "Use capital letters A, B, and C for the coefficients of Ax² + Bx + C = 0 so they stay distinct from the parameters a and b. For the equation to be quadratic, its leading coefficient A = a − b must be non-zero (so a ≠ b).",
        "eq": "A = a − b (with a − b ≠ 0), B = −6(a + b), C = −9(a − b)",
        "math": {
          "latex": "A=a-b\\neq 0,\\quad B=-6(a+b),\\quad C=-9(a-b)",
          "fallback": "A = a − b (with a − b ≠ 0), B = −6(a + b), C = −9(a − b)",
          "display": true
        }
      },
      {
        "en": "Compute the discriminant Δ = B² − 4AC. Notice that (−6)² = 36 and −4(a − b)[−9(a − b)] = +36(a − b)² because the product of two minus signs is plus.",
        "eq": "Δ = [−6(a + b)]² − 4(a − b)[−9(a − b)] = 36(a + b)² + 36(a − b)²",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=B^2-4AC\\\\&=\\big[-6(a+b)\\big]^2-4(a-b)\\big[-9(a-b)\\big]\\\\&=36(a+b)^2+36(a-b)^2\\\\&=36\\big[(a+b)^2+(a-b)^2\\big]\\end{aligned}",
          "fallback": "Δ = [−6(a + b)]² − 4(a − b)[−9(a − b)] = 36(a + b)² + 36(a − b)²",
          "display": true
        }
      },
      {
        "en": "Because a and b are real numbers, any square of a real number is non-negative: (a + b)² ≥ 0. Moreover, since a − b ≠ 0 for a quadratic equation, (a − b)² is strictly positive: (a − b)² > 0. Adding a non-negative number and a strictly positive number gives a strictly positive sum, so Δ > 0.",
        "eq": "(a + b)² ≥ 0 and (a − b)² > 0, so Δ = 36[(a + b)² + (a − b)²] > 0",
        "math": {
          "latex": "\\begin{aligned}(a+b)^2&\\ge 0\\quad\\text{and}\\quad(a-b)^2>0\\\\\\Delta&=36\\big[(a+b)^2+(a-b)^2\\big]>0\\end{aligned}",
          "fallback": "(a + b)² ≥ 0 and (a − b)² > 0, so Δ = 36[(a + b)² + (a − b)²] > 0",
          "display": true
        }
      },
      {
        "en": "Since the discriminant Δ is strictly positive (Δ > 0), the roots of the equation are real and unequal.",
        "eq": "Δ > 0, hence the roots are real and unequal",
        "math": {
          "latex": "\\Delta>0\\quad(\\text{real and unequal roots})",
          "fallback": "Δ > 0, hence the roots are real and unequal",
          "display": true
        }
      }
    ],
    "answer": "Hence proved: the roots are real and unequal.",
    "answerMath": {
      "latex": "\\begin{aligned}\\Delta&=36\\big[(a+b)^2+(a-b)^2\\big]>0\\\\\\text{Roots }&\\text{are real and unequal}\\end{aligned}",
      "fallback": "Hence proved: the roots are real and unequal.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q4; printed p. 119, PDF p. 125; source image checked (proof question; no Appendix entry).",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-13-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.13",
    "topic": {
      "en": "Algebra — Proving Algebraic Identities from Equal Roots"
    },
    "label": {
      "en": "Exercise 3.13 · Q5",
      "ta": "Exercise 3.13 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Prove a = 0 or a³ + b³ + c³ = 3abc when (c² − ab)x² − 2(a² − bc)x + b² − ac = 0 has equal roots"
    },
    "q": {
      "en": "5. If the roots of the equation (c² − ab)x² − 2(a² − bc)x + b² − ac = 0 are real and equal prove that either a = 0 (or) a³ + b³ + c³ = 3abc"
    },
    "questionMath": {
      "en": [
        "5. If the roots of the equation ",
        {
          "latex": "(c^2-ab)x^2-2(a^2-bc)x+b^2-ac=0",
          "fallback": "(c² − ab)x² − 2(a² − bc)x + b² − ac = 0",
          "display": false
        },
        " are real and equal prove that either ",
        {
          "latex": "a=0",
          "fallback": "a = 0",
          "display": false
        },
        " (or) ",
        {
          "latex": "a^3+b^3+c^3=3abc",
          "fallback": "a³ + b³ + c³ = 3abc",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the equation in standard quadratic form Ax² + Bx + C = 0 using capital letters A, B, and C so they are distinct from a, b, and c (with A = c² − ab ≠ 0 for a quadratic equation).",
        "eq": "A = c² − ab, B = −2(a² − bc), C = b² − ac",
        "math": {
          "latex": "A=c^2-ab,\\quad B=-2(a^2-bc),\\quad C=b^2-ac",
          "fallback": "A = c² − ab, B = −2(a² − bc), C = b² − ac",
          "display": true
        }
      },
      {
        "en": "Because the roots are real and equal, the discriminant Δ = B² − 4AC equals 0. Substitute A, B, and C, then divide both sides by 4.",
        "eq": "[−2(a² − bc)]² − 4(c² − ab)(b² − ac) = 0; (a² − bc)² − (c² − ab)(b² − ac) = 0",
        "math": {
          "latex": "\\begin{aligned}\\big[-2(a^2-bc)\\big]^2-4(c^2-ab)(b^2-ac)&=0\\\\4(a^2-bc)^2-4(c^2-ab)(b^2-ac)&=0\\\\(a^2-bc)^2-(c^2-ab)(b^2-ac)&=0\\end{aligned}",
          "fallback": "[−2(a² − bc)]² − 4(c² − ab)(b² − ac) = 0; (a² − bc)² − (c² − ab)(b² − ac) = 0",
          "display": true
        }
      },
      {
        "en": "Expand both products carefully: (a² − bc)² = a⁴ − 2a²bc + b²c², and (c² − ab)(b² − ac) = b²c² − ac³ − ab³ + a²bc. Subtract the second expansion from the first; notice that +b²c² and −b²c² cancel out.",
        "eq": "(a⁴ − 2a²bc + b²c²) − (b²c² − ac³ − ab³ + a²bc) = 0; a⁴ + ab³ + ac³ − 3a²bc = 0",
        "math": {
          "latex": "\\begin{aligned}&(a^4-2a^2bc+b^2c^2)\\\\&-\\,(b^2c^2-ac^3-ab^3+a^2bc)=0\\\\&a^4+ab^3+ac^3-3a^2bc=0\\end{aligned}",
          "fallback": "(a⁴ − 2a²bc + b²c²) − (b²c² − ac³ − ab³ + a²bc) = 0; a⁴ + ab³ + ac³ − 3a²bc = 0",
          "display": true
        }
      },
      {
        "en": "Factor out the common factor a from every term. Since a product of two factors equals zero only when at least one factor is zero, either a = 0 or a³ + b³ + c³ − 3abc = 0 (which rearranges to a³ + b³ + c³ = 3abc).",
        "eq": "a(a³ + b³ + c³ − 3abc) = 0; either a = 0 or a³ + b³ + c³ = 3abc",
        "math": {
          "latex": "\\begin{aligned}a(a^3+b^3+c^3-3abc)&=0\\\\a=0\\quad\\text{or}\\quad a^3+b^3+c^3&=3abc\\end{aligned}",
          "fallback": "a(a³ + b³ + c³ − 3abc) = 0; either a = 0 or a³ + b³ + c³ = 3abc",
          "display": true
        }
      }
    ],
    "answer": "Hence proved: either a = 0 or a³ + b³ + c³ = 3abc.",
    "answerMath": {
      "latex": "\\begin{aligned}&a=0\\quad\\text{or}\\\\&a^3+b^3+c^3=3abc\\end{aligned}",
      "fallback": "Hence proved: either a = 0 or a³ + b³ + c³ = 3abc.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.13 Q5; printed p. 119, PDF p. 125; source image checked (proof question; no Appendix entry).",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.13 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
