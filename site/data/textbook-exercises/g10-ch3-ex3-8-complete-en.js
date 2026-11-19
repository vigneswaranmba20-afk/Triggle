/* Grade 10 Ch 3 Ex 3.8 (Q1(i)-(iv), Q2(i)-(ii), Q3(i)-(ii)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 112 (printed p. 106), Tamil PDF p. 114 (printed p. 108),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-8-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q1(i)",
      "ta": "Exercise 3.8 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the square root of x⁴ − 12x³ + 42x² − 36x + 9 by division method"
    },
    "q": {
      "en": "1. Find the square root of the following polynomials by division method\n(i) x⁴ − 12x³ + 42x² − 36x + 9"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following polynomials by division method\n(i) ",
        {
          "latex": "x^4-12x^3+42x^2-36x+9",
          "fallback": "x⁴ − 12x³ + 42x² − 36x + 9",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The polynomial is already in descending powers of x. Take the square root of the leading term x⁴, which is x². Put x² as both the first quotient term and first divisor, subtract x⁴ × 1 = x⁴ (x² · x² = x⁴), and bring down −12x³ + 42x².",
        "eq": "First term: x²; (x²)² = x⁴; remainder = −12x³ + 42x²",
        "math": {
          "latex": "\\begin{aligned}\\text{First quotient term}&=\\sqrt{x^4}=x^2\\\\(x^4-12x^3+42x^2)-(x^2)^2&=-12x^3+42x^2\\end{aligned}",
          "fallback": "First term: x²; (x²)² = x⁴; remainder = −12x³ + 42x²",
          "display": true
        }
      },
      {
        "en": "Double the current quotient x² to get 2x². Divide the leading remainder term −12x³ by 2x² to get −6x. Append −6x to both the quotient (x² − 6x) and the divisor (2x² − 6x), multiply (2x² − 6x)(−6x) = −12x³ + 36x², subtract carefully (42x² − 36x² = 6x²), and bring down −36x + 9.",
        "eq": "−12x³ ÷ 2x² = −6x; (−12x³ + 42x²) − (−12x³ + 36x²) = 6x²; bring down → 6x² − 36x + 9",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-12x^3}{2x^2}&=-6x\\\\(2x^2-6x)(-6x)&=-12x^3+36x^2\\\\(-12x^3+42x^2)-(-12x^3+36x^2)&=6x^2\\\\\\text{Next dividend}&=6x^2-36x+9\\end{aligned}",
          "fallback": "−12x³ ÷ 2x² = −6x; (−12x³ + 42x²) − (−12x³ + 36x²) = 6x²; bring down → 6x² − 36x + 9",
          "display": true
        }
      },
      {
        "en": "Double the quotient (x² − 6x) to get 2x² − 12x. Divide 6x² by 2x² to get +3. Append +3 to the quotient and divisor, multiply (2x² − 12x + 3)(3) = 6x² − 36x + 9, and subtract to obtain remainder 0. Enclose the quotient in absolute value bars.",
        "eq": "6x² ÷ 2x² = 3; (2x² − 12x + 3)(3) = 6x² − 36x + 9; remainder = 0 ⇒ |x² − 6x + 3|",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{6x^2}{2x^2}&=3\\\\(2x^2-12x+3)(3)&=6x^2-36x+9\\;(\\text{remainder }0)\\\\\\sqrt{x^4-12x^3+42x^2-36x+9}&=|x^2-6x+3|\\end{aligned}",
          "fallback": "6x² ÷ 2x² = 3; (2x² − 12x + 3)(3) = 6x² − 36x + 9; remainder = 0 ⇒ |x² − 6x + 3|",
          "display": true
        }
      }
    ],
    "answer": "|x² − 6x + 3|",
    "answerMath": {
      "latex": "|x^2-6x+3|",
      "fallback": "|x² − 6x + 3|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q1(i); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q1(ii)",
      "ta": "Exercise 3.8 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the square root of 37x² − 28x³ + 4x⁴ + 42x + 9 by division method"
    },
    "q": {
      "en": "1. Find the square root of the following polynomials by division method\n(ii) 37x² − 28x³ + 4x⁴ + 42x + 9"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following polynomials by division method\n(ii) ",
        {
          "latex": "37x^2-28x^3+4x^4+42x+9",
          "fallback": "37x² − 28x³ + 4x⁴ + 42x + 9",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The terms are out of order, so first rewrite the polynomial in descending powers of x: 4x⁴ − 28x³ + 37x² + 42x + 9. Take √(4x⁴) = 2x² as the first quotient term, subtract (2x²)² = 4x⁴, and bring down −28x³ + 37x².",
        "eq": "Order: 4x⁴ − 28x³ + 37x² + 42x + 9; first term = 2x²; remainder = −28x³ + 37x²",
        "math": {
          "latex": "\\begin{aligned}37x^2-28x^3+4x^4+42x+9&=4x^4-28x^3+37x^2+42x+9\\\\\\text{First term}&=\\sqrt{4x^4}=2x^2\\end{aligned}",
          "fallback": "Order: 4x⁴ − 28x³ + 37x² + 42x + 9; first term = 2x²; remainder = −28x³ + 37x²",
          "display": true
        }
      },
      {
        "en": "Double 2x² to get 4x². Divide −28x³ by 4x² to get −7x. Form the new divisor (4x² − 7x), multiply by −7x to get −28x³ + 49x², and subtract carefully: 37x² − 49x² = −12x². Bring down +42x + 9.",
        "eq": "−28x³ ÷ 4x² = −7x; (4x² − 7x)(−7x) = −28x³ + 49x²; 37x² − 49x² = −12x²",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-28x^3}{4x^2}&=-7x\\\\(4x^2-7x)(-7x)&=-28x^3+49x^2\\\\(-28x^3+37x^2)-(-28x^3+49x^2)&=-12x^2\\\\\\text{Next dividend}&=-12x^2+42x+9\\end{aligned}",
          "fallback": "−28x³ ÷ 4x² = −7x; (4x² − 7x)(−7x) = −28x³ + 49x²; 37x² − 49x² = −12x²",
          "display": true
        }
      },
      {
        "en": "Double the quotient (2x² − 7x) to get 4x² − 14x. Divide −12x² by 4x² to get −3. Multiply (4x² − 14x − 3)(−3) = −12x² + 42x + 9, leaving remainder 0. Note the double negative (−3)(−14x) = +42x. Therefore, the square root is |2x² − 7x − 3|.",
        "eq": "−12x² ÷ 4x² = −3; (4x² − 14x − 3)(−3) = −12x² + 42x + 9; remainder = 0 ⇒ |2x² − 7x − 3|",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-12x^2}{4x^2}&=-3\\\\(4x^2-14x-3)(-3)&=-12x^2+42x+9\\;(\\text{remainder }0)\\\\\\sqrt{4x^4-28x^3+37x^2+42x+9}&=|2x^2-7x-3|\\end{aligned}",
          "fallback": "−12x² ÷ 4x² = −3; (4x² − 14x − 3)(−3) = −12x² + 42x + 9; remainder = 0 ⇒ |2x² − 7x − 3|",
          "display": true
        }
      }
    ],
    "answer": "|2x² − 7x − 3|",
    "answerMath": {
      "latex": "|2x^2-7x-3|",
      "fallback": "|2x² − 7x − 3|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q1(ii); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q1(iii)",
      "ta": "Exercise 3.8 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the square root of 16x⁴ + 8x² + 1 by division method"
    },
    "q": {
      "en": "1. Find the square root of the following polynomials by division method\n(iii) 16x⁴ + 8x² + 1"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following polynomials by division method\n(iii) ",
        {
          "latex": "16x^4+8x^2+1",
          "fallback": "16x⁴ + 8x² + 1",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Insert 0x³ and 0x as placeholders for the missing odd-degree terms so terms align neatly by degree: 16x⁴ + 0x³ + 8x² + 0x + 1. Take √(16x⁴) = 4x² as the first quotient term and subtract (4x²)² = 16x⁴.",
        "eq": "16x⁴ + 0x³ + 8x² + 0x + 1; first term = 4x²; remainder = 0x³ + 8x²",
        "math": {
          "latex": "\\begin{aligned}16x^4+8x^2+1&=16x^4+0x^3+8x^2+0x+1\\\\\\text{First term}&=\\sqrt{16x^4}=4x^2\\\\(16x^4+0x^3+8x^2)-(4x^2)^2&=8x^2\\end{aligned}",
          "fallback": "16x⁴ + 0x³ + 8x² + 0x + 1; first term = 4x²; remainder = 0x³ + 8x²",
          "display": true
        }
      },
      {
        "en": "Double 4x² to get 8x². Bring down +0x + 1 so the dividend is 8x² + 0x + 1. Divide 8x² by 8x² to get +1. Append +1 to both the quotient and divisor, multiply (8x² + 1)(1) = 8x² + 1, and subtract to get remainder 0.",
        "eq": "8x² ÷ 8x² = 1; (8x² + 1)(1) = 8x² + 1; remainder = 0 ⇒ |4x² + 1|",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{8x^2}{8x^2}&=1\\\\(8x^2+1)(1)&=8x^2+1\\;(\\text{remainder }0)\\\\\\sqrt{16x^4+8x^2+1}&=|4x^2+1|\\end{aligned}",
          "fallback": "8x² ÷ 8x² = 1; (8x² + 1)(1) = 8x² + 1; remainder = 0 ⇒ |4x² + 1|",
          "display": true
        }
      }
    ],
    "answer": "|4x² + 1|",
    "answerMath": {
      "latex": "|4x^2+1|",
      "fallback": "|4x² + 1|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q1(iii); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q1(iv)",
      "ta": "Exercise 3.8 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the square root of 121x⁴ − 198x³ − 183x² + 216x + 144 by division method"
    },
    "q": {
      "en": "1. Find the square root of the following polynomials by division method\n(iv) 121x⁴ − 198x³ − 183x² + 216x + 144"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following polynomials by division method\n(iv) ",
        {
          "latex": "121x^4-198x^3-183x^2+216x+144",
          "fallback": "121x⁴ − 198x³ − 183x² + 216x + 144",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The terms are already in descending powers of x. Take √(121x⁴) = 11x² as the first quotient term, subtract (11x²)² = 121x⁴, and bring down −198x³ − 183x².",
        "eq": "First term = 11x²; (11x²)² = 121x⁴; remainder = −198x³ − 183x²",
        "math": {
          "latex": "\\begin{aligned}\\text{First quotient term}&=\\sqrt{121x^4}=11x^2\\\\(121x^4-198x^3-183x^2)-121x^4&=-198x^3-183x^2\\end{aligned}",
          "fallback": "First term = 11x²; (11x²)² = 121x⁴; remainder = −198x³ − 183x²",
          "display": true
        }
      },
      {
        "en": "Double 11x² to get 22x². Divide −198x³ by 22x² to get −9x. Multiply (22x² − 9x)(−9x) = −198x³ + 81x², subtract (−183x² − 81x² = −264x²), and bring down +216x + 144.",
        "eq": "−198x³ ÷ 22x² = −9x; (−198x³ − 183x²) − (−198x³ + 81x²) = −264x²; bring down → −264x² + 216x + 144",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-198x^3}{22x^2}&=-9x\\\\(22x^2-9x)(-9x)&=-198x^3+81x^2\\\\(-198x^3-183x^2)-(-198x^3+81x^2)&=-264x^2\\\\\\text{Next dividend}&=-264x^2+216x+144\\end{aligned}",
          "fallback": "−198x³ ÷ 22x² = −9x; (−198x³ − 183x²) − (−198x³ + 81x²) = −264x²; bring down → −264x² + 216x + 144",
          "display": true
        }
      },
      {
        "en": "Double the quotient (11x² − 9x) to get 22x² − 18x. Divide −264x² by 22x² to get −12. Multiply (22x² − 18x − 12)(−12) = −264x² + 216x + 144, leaving remainder 0. Therefore, the square root is |11x² − 9x − 12|.",
        "eq": "−264x² ÷ 22x² = −12; (22x² − 18x − 12)(−12) = −264x² + 216x + 144; remainder = 0 ⇒ |11x² − 9x − 12|",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-264x^2}{22x^2}&=-12\\\\(22x^2-18x-12)(-12)&=-264x^2+216x+144\\;(\\text{remainder }0)\\\\\\sqrt{121x^4-198x^3-183x^2+216x+144}&=|11x^2-9x-12|\\end{aligned}",
          "fallback": "−264x² ÷ 22x² = −12; (22x² − 18x − 12)(−12) = −264x² + 216x + 144; remainder = 0 ⇒ |11x² − 9x − 12|",
          "display": true
        }
      }
    ],
    "answer": "|11x² − 9x − 12|",
    "answerMath": {
      "latex": "|11x^2-9x-12|",
      "fallback": "|11x² − 9x − 12|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q1(iv); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q2(i)",
      "ta": "Exercise 3.8 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find a and b if 4x⁴ − 12x³ + 37x² + bx + a is a perfect square"
    },
    "q": {
      "en": "2. Find the values of a and b if the following polynomials are perfect squares\n(i) 4x⁴ − 12x³ + 37x² + bx + a"
    },
    "questionMath": {
      "en": [
        "2. Find the values of a and b if the following polynomials are perfect squares\n(i) ",
        {
          "latex": "4x^4-12x^3+37x^2+bx+a",
          "fallback": "4x⁴ − 12x³ + 37x² + bx + a",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Apply the division method in descending powers of x. First quotient term is √(4x⁴) = 2x²; subtract (2x²)² = 4x²·x² = 4x⁴ and bring down −12x³ + 37x².",
        "eq": "First term = 2x²; remainder = −12x³ + 37x²",
        "math": {
          "latex": "\\begin{aligned}\\text{First term}&=\\sqrt{4x^4}=2x^2\\\\(4x^4-12x^3+37x^2)-4x^4&=-12x^3+37x^2\\end{aligned}",
          "fallback": "First term = 2x²; remainder = −12x³ + 37x²",
          "display": true
        }
      },
      {
        "en": "Double 2x² to get 4x². Divide −12x³ by 4x² to get −3x. Multiply (4x² − 3x)(−3x) = −12x³ + 9x², subtract (37x² − 9x² = 28x²), and bring down + bx + a.",
        "eq": "−12x³ ÷ 4x² = −3x; 37x² − 9x² = 28x²; next dividend = 28x² + bx + a",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-12x^3}{4x^2}&=-3x\\\\(4x^2-3x)(-3x)&=-12x^3+9x^2\\\\\\text{Next dividend}&=28x^2+bx+a\\end{aligned}",
          "fallback": "−12x³ ÷ 4x² = −3x; 37x² − 9x² = 28x²; next dividend = 28x² + bx + a",
          "display": true
        }
      },
      {
        "en": "Double the quotient (2x² − 3x) to get 4x² − 6x. Divide 28x² by 4x² to get +7, so the final divisor is 4x² − 6x + 7. Multiply by 7 to obtain 28x² − 42x + 49.",
        "eq": "28x² ÷ 4x² = 7; (4x² − 6x + 7)(7) = 28x² − 42x + 49",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{28x^2}{4x^2}&=7\\\\(4x^2-6x+7)(7)&=28x^2-42x+49\\end{aligned}",
          "fallback": "28x² ÷ 4x² = 7; (4x² − 6x + 7)(7) = 28x² − 42x + 49",
          "display": true
        }
      },
      {
        "en": "Because the given polynomial is a perfect square, subtracting 28x² − 42x + 49 must leave zero remainder: (b + 42)x + (a − 49) = 0. Watch the sign on b: b − (−42) = b + 42 = 0 gives b = −42, and a − 49 = 0 gives a = 49.",
        "eq": "b + 42 = 0 ⇒ b = −42; a − 49 = 0 ⇒ a = 49",
        "math": {
          "latex": "\\begin{aligned}b-(-42)&=0\\implies b=-42\\\\a-49&=0\\implies a=49\\end{aligned}",
          "fallback": "b + 42 = 0 ⇒ b = −42; a − 49 = 0 ⇒ a = 49",
          "display": true
        }
      }
    ],
    "answer": "a = 49, b = −42",
    "answerMath": {
      "latex": "a=49,\\;b=-42",
      "fallback": "a = 49, b = −42",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q2(i); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q2(ii)",
      "ta": "Exercise 3.8 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find a and b if ax⁴ + bx³ + 361x² + 220x + 100 is a perfect square"
    },
    "q": {
      "en": "2. Find the values of a and b if the following polynomials are perfect squares\n(ii) ax⁴ + bx³ + 361x² + 220x + 100"
    },
    "questionMath": {
      "en": [
        "2. Find the values of a and b if the following polynomials are perfect squares\n(ii) ",
        {
          "latex": "ax^4+bx^3+361x^2+220x+100",
          "fallback": "ax⁴ + bx³ + 361x² + 220x + 100",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Notice the unknown coefficients a and b are on the x⁴ and x³ terms, whereas the constant and x terms (100 and 220x) are known. Write the polynomial in ascending powers of x so we can start from 100: 100 + 220x + 361x² + bx³ + ax⁴. First term is √100 = 10.",
        "eq": "Ascending order: 100 + 220x + 361x² + bx³ + ax⁴; first term = 10; remainder = 220x + 361x²",
        "math": {
          "latex": "\\begin{aligned}&100+220x+361x^2+bx^3+ax^4\\\\\\text{First term}&=\\sqrt{100}=10,\\quad 10^2=100\\end{aligned}",
          "fallback": "Ascending order: 100 + 220x + 361x² + bx³ + ax⁴; first term = 10; remainder = 220x + 361x²",
          "display": true
        }
      },
      {
        "en": "Double 10 to get 20. Divide 220x by 20 to get +11x. Multiply (20 + 11x)(11x) = 220x + 121x², subtract (361x² − 121x² = 240x²), and bring down + bx³ + ax⁴.",
        "eq": "220x ÷ 20 = 11x; (20 + 11x)(11x) = 220x + 121x²; 361x² − 121x² = 240x²",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{220x}{20}&=11x\\\\(20+11x)(11x)&=220x+121x^2\\\\\\text{Next dividend}&=240x^2+bx^3+ax^4\\end{aligned}",
          "fallback": "220x ÷ 20 = 11x; (20 + 11x)(11x) = 220x + 121x²; 361x² − 121x² = 240x²",
          "display": true
        }
      },
      {
        "en": "Double the quotient (10 + 11x) to get 20 + 22x. Divide 240x² by 20 to get +12x². Form the divisor 20 + 22x + 12x² and multiply by 12x²: (20 + 22x + 12x²)(12x²) = 240x² + 264x³ + 144x⁴.",
        "eq": "240x² ÷ 20 = 12x²; (20 + 22x + 12x²)(12x²) = 240x² + 264x³ + 144x⁴",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{240x^2}{20}&=12x^2\\\\(20+22x+12x^2)(12x^2)&=240x^2+264x^3+144x^4\\end{aligned}",
          "fallback": "240x² ÷ 20 = 12x²; (20 + 22x + 12x²)(12x²) = 240x² + 264x³ + 144x⁴",
          "display": true
        }
      },
      {
        "en": "For the polynomial to be a perfect square, the final remainder (b − 264)x³ + (a − 144)x⁴ must be 0. Equating each coefficient to zero gives a = 144 and b = 264.",
        "eq": "b − 264 = 0 ⇒ b = 264; a − 144 = 0 ⇒ a = 144",
        "math": {
          "latex": "\\begin{aligned}a-144&=0\\implies a=144\\\\b-264&=0\\implies b=264\\end{aligned}",
          "fallback": "b − 264 = 0 ⇒ b = 264; a − 144 = 0 ⇒ a = 144",
          "display": true
        }
      }
    ],
    "answer": "a = 144, b = 264",
    "answerMath": {
      "latex": "a=144,\\;b=264",
      "fallback": "a = 144, b = 264",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q2(ii); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q3-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q3(i)",
      "ta": "Exercise 3.8 · Q3(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find m and n if 36x⁴ − 60x³ + 61x² − mx + n is a perfect square"
    },
    "q": {
      "en": "3. Find the values of m and n if the following polynomials are perfect squares\n(i) 36x⁴ − 60x³ + 61x² − mx + n"
    },
    "questionMath": {
      "en": [
        "3. Find the values of m and n if the following polynomials are perfect squares\n(i) ",
        {
          "latex": "36x^4-60x^3+61x^2-mx+n",
          "fallback": "36x⁴ − 60x³ + 61x² − mx + n",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Use the division method in descending powers of x. Take √(36x⁴) = 6x² as the first quotient term, subtract (6x²)² = 36x⁴, and bring down −60x³ + 61x².",
        "eq": "First term = 6x²; remainder = −60x³ + 61x²",
        "math": {
          "latex": "\\begin{aligned}\\text{First term}&=\\sqrt{36x^4}=6x^2\\\\(36x^4-60x^3+61x^2)-36x^4&=-60x^3+61x^2\\end{aligned}",
          "fallback": "First term = 6x²; remainder = −60x³ + 61x²",
          "display": true
        }
      },
      {
        "en": "Double 6x² to get 12x². Divide −60x³ by 12x² to get −5x. Multiply (12x² − 5x)(−5x) = −60x³ + 25x², subtract (61x² − 25x² = 36x²), and bring down − mx + n.",
        "eq": "−60x³ ÷ 12x² = −5x; 61x² − 25x² = 36x²; next dividend = 36x² − mx + n",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-60x^3}{12x^2}&=-5x\\\\(12x^2-5x)(-5x)&=-60x^3+25x^2\\\\\\text{Next dividend}&=36x^2-mx+n\\end{aligned}",
          "fallback": "−60x³ ÷ 12x² = −5x; 61x² − 25x² = 36x²; next dividend = 36x² − mx + n",
          "display": true
        }
      },
      {
        "en": "Double the quotient (6x² − 5x) to get 12x² − 10x. Divide 36x² by 12x² to get +3. Multiply (12x² − 10x + 3)(3) = 36x² − 30x + 9.",
        "eq": "36x² ÷ 12x² = 3; (12x² − 10x + 3)(3) = 36x² − 30x + 9",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{36x^2}{12x^2}&=3\\\\(12x^2-10x+3)(3)&=36x^2-30x+9\\end{aligned}",
          "fallback": "36x² ÷ 12x² = 3; (12x² − 10x + 3)(3) = 36x² − 30x + 9",
          "display": true
        }
      },
      {
        "en": "Since the polynomial is a perfect square, compare −mx + n with −30x + 9. Pay close attention to the minus sign in −mx: matching −m = −30 gives m = 30 (not −30), and n = 9.",
        "eq": "−m = −30 ⇒ m = 30; n = 9",
        "math": {
          "latex": "\\begin{aligned}-m&=-30\\implies m=30\\\\n&=9\\end{aligned}",
          "fallback": "−m = −30 ⇒ m = 30; n = 9",
          "display": true
        }
      }
    ],
    "answer": "m = 30, n = 9",
    "answerMath": {
      "latex": "m=30,\\;n=9",
      "fallback": "m = 30, n = 9",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q3(i); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-8-q3-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.8",
    "topic": {
      "en": "Algebra — Square Root of Polynomials by Division Method"
    },
    "label": {
      "en": "Exercise 3.8 · Q3(ii)",
      "ta": "Exercise 3.8 · Q3(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find m and n if x⁴ − 8x³ + mx² + nx + 16 is a perfect square"
    },
    "q": {
      "en": "3. Find the values of m and n if the following polynomials are perfect squares\n(ii) x⁴ − 8x³ + mx² + nx + 16"
    },
    "questionMath": {
      "en": [
        "3. Find the values of m and n if the following polynomials are perfect squares\n(ii) ",
        {
          "latex": "x^4-8x^3+mx^2+nx+16",
          "fallback": "x⁴ − 8x³ + mx² + nx + 16",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Begin the division method in descending powers of x. Take √(x⁴) = x² as the first quotient term, subtract (x²)² = x⁴, and bring down −8x³ + mx².",
        "eq": "First term = x²; remainder = −8x³ + mx²",
        "math": {
          "latex": "\\begin{aligned}\\text{First term}&=\\sqrt{x^4}=x^2\\\\(x^4-8x^3+mx^2)-x^4&=-8x^3+mx^2\\end{aligned}",
          "fallback": "First term = x²; remainder = −8x³ + mx²",
          "display": true
        }
      },
      {
        "en": "Double x² to get 2x². Divide −8x³ by 2x² to get −4x. Multiply (2x² − 4x)(−4x) = −8x³ + 16x², subtract to get (m − 16)x², and bring down + nx + 16.",
        "eq": "−8x³ ÷ 2x² = −4x; (2x² − 4x)(−4x) = −8x³ + 16x²; next dividend = (m − 16)x² + nx + 16",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{-8x^3}{2x^2}&=-4x\\\\(2x^2-4x)(-4x)&=-8x^3+16x^2\\\\\\text{Next dividend}&=(m-16)x^2+nx+16\\end{aligned}",
          "fallback": "−8x³ ÷ 2x² = −4x; (2x² − 4x)(−4x) = −8x³ + 16x²; next dividend = (m − 16)x² + nx + 16",
          "display": true
        }
      },
      {
        "en": "Double (x² − 4x) to get 2x² − 8x. Since the final constant term is +16 and √16 = 4, choose the positive constant term +4 for the quotient (x² − 4x + 4). Multiply (2x² − 8x + 4)(4) = 8x² − 32x + 16.",
        "eq": "Constant term = √16 = +4; (2x² − 8x + 4)(4) = 8x² − 32x + 16",
        "math": {
          "latex": "\\begin{aligned}\\text{Last term}&=\\sqrt{16}=+4\\\\(2x^2-8x+4)(4)&=8x^2-32x+16\\end{aligned}",
          "fallback": "Constant term = √16 = +4; (2x² − 8x + 4)(4) = 8x² − 32x + 16",
          "display": true
        }
      },
      {
        "en": "For zero remainder, match the x² and x coefficients: m − 16 = 8 gives m = 24, and n = −32. (Note: taking −4 instead of +4 gives the alternative square (x² − 4x − 4)² with m = 8, n = 32; the prescribed textbook key uses +4, giving m = 24, n = −32.)",
        "eq": "m − 16 = 8 ⇒ m = 24; n = −32",
        "math": {
          "latex": "\\begin{aligned}m-16&=8\\implies m=24\\\\n&=-32\\end{aligned}",
          "fallback": "m − 16 = 8 ⇒ m = 24; n = −32",
          "display": true
        }
      }
    ],
    "answer": "m = 24, n = −32",
    "answerMath": {
      "latex": "m=24,\\;n=-32",
      "fallback": "m = 24, n = −32",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.8 Q3(ii); printed p. 106, PDF p. 112; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.8 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
