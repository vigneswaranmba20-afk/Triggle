/* Grade 10 Ch 3 Ex 3.3 (Q1(i)-(iii), Q2(i)-(ii), Q3(i)-(ii), Q4(i)-(ii)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF pp. 103-104 (printed pp. 97-98), Tamil PDF p. 105 (printed p. 99),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-3-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q1(i)",
      "ta": "Exercise 3.3 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find LCM and GCD of 21x²y and 35xy² and verify f(x) × g(x) = LCM × GCD"
    },
    "q": {
      "en": "Find the LCM and GCD for the following and verify that f(x) × g(x) = LCM × GCD (i) 21x²y, 35xy²"
    },
    "questionMath": {
      "en": [
        "Find the LCM and GCD for the following and verify that ",
        {
          "latex": "f(x)\\times g(x)=\\text{LCM}\\times\\text{GCD}",
          "fallback": "f(x) × g(x) = LCM × GCD",
          "display": false
        },
        " (i) ",
        {
          "latex": "21x^2y,\\;35xy^2",
          "fallback": "21x²y, 35xy²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the prime factorizations of the numerical coefficients of f(x) = 21x²y and g(x) = 35xy².",
        "eq": "f(x) = 21x²y = 3 × 7 × x² × y; g(x) = 35xy² = 5 × 7 × x × y²",
        "math": {
          "latex": "\\begin{aligned}f(x)&=21x^2y=3\\times 7\\times x^2\\times y\\\\g(x)&=35xy^2=5\\times 7\\times x\\times y^2\\end{aligned}",
          "fallback": "f(x) = 21x²y = 3 × 7 × x² × y; g(x) = 35xy² = 5 × 7 × x × y²",
          "display": true
        }
      },
      {
        "en": "Find the GCD by taking the lowest power of common factors (7, x, y), and find the LCM by taking the highest power of all factors (3 × 5 × 7, x², y²). Thus, the GCD is 7xy and the LCM is 105x²y².",
        "eq": "GCD = 7xy; LCM = 3 × 5 × 7 × x²y² = 105x²y²",
        "math": {
          "latex": "\\text{GCD}=7xy,\\qquad \\text{LCM}=3\\times 5\\times 7\\times x^2y^2=105x^2y^2",
          "fallback": "GCD = 7xy; LCM = 3 × 5 × 7 × x²y² = 105x²y²",
          "display": true
        }
      },
      {
        "en": "Verify the product identity by multiplying f(x) × g(x) and comparing with LCM × GCD. Both products equal 735x³y³, verifying that f(x) × g(x) = LCM × GCD.",
        "eq": "f(x) × g(x) = (21x²y)(35xy²) = 735x³y³; LCM × GCD = (105x²y²)(7xy) = 735x³y³",
        "math": {
          "latex": "\\begin{aligned}f(x)\\times g(x)&=(21x^2y)(35xy^2)=735x^3y^3\\\\\\text{LCM}\\times\\text{GCD}&=(105x^2y^2)(7xy)=735x^3y^3\\end{aligned}",
          "fallback": "f(x) × g(x) = (21x²y)(35xy²) = 735x³y³; LCM × GCD = (105x²y²)(7xy) = 735x³y³",
          "display": true
        }
      }
    ],
    "answer": "7xy, 105x²y²",
    "answerMath": {
      "latex": "\\text{GCD}=7xy,\\quad\\text{LCM}=105x^2y^2",
      "fallback": "7xy, 105x²y²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q1(i); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q1(ii)",
      "ta": "Exercise 3.3 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find LCM and GCD of (x³ − 1)(x + 1) and (x³ + 1) and verify product identity"
    },
    "q": {
      "en": "Find the LCM and GCD for the following and verify that f(x) × g(x) = LCM × GCD (ii) (x³ − 1)(x + 1), (x³ + 1)"
    },
    "questionMath": {
      "en": [
        "Find the LCM and GCD for the following and verify that ",
        {
          "latex": "f(x)\\times g(x)=\\text{LCM}\\times\\text{GCD}",
          "fallback": "f(x) × g(x) = LCM × GCD",
          "display": false
        },
        " (ii) ",
        {
          "latex": "(x^3-1)(x+1),\\;(x^3+1)",
          "fallback": "(x³ − 1)(x + 1), (x³ + 1)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize f(x) = (x³ − 1)(x + 1) using x³ − 1 = (x − 1)(x² + x + 1), and factorize g(x) = x³ + 1 using x³ + 1 = (x + 1)(x² − x + 1).",
        "eq": "f(x) = (x − 1)(x² + x + 1)(x + 1); g(x) = (x + 1)(x² − x + 1)",
        "math": {
          "latex": "\\begin{aligned}f(x)&=(x-1)(x^2+x+1)(x+1)\\\\g(x)&=(x+1)(x^2-x+1)\\end{aligned}",
          "fallback": "f(x) = (x − 1)(x² + x + 1)(x + 1); g(x) = (x + 1)(x² − x + 1)",
          "display": true
        }
      },
      {
        "en": "The only common factor is (x + 1), so the GCD is (x + 1). The product of all distinct factors is the LCM: (x − 1)(x + 1)(x² + x + 1)(x² − x + 1).",
        "eq": "GCD = (x + 1); LCM = (x − 1)(x + 1)(x² + x + 1)(x² − x + 1)",
        "math": {
          "latex": "\\begin{aligned}\\text{GCD}&=(x+1)\\\\\\text{LCM}&=(x-1)(x+1)(x^2+x+1)(x^2-x+1)\\end{aligned}",
          "fallback": "GCD = (x + 1); LCM = (x − 1)(x + 1)(x² + x + 1)(x² − x + 1)",
          "display": true
        }
      },
      {
        "en": "Compare f(x) × g(x) with LCM × GCD. Since (x − 1)(x² + x + 1) = x³ − 1 and (x + 1)(x² − x + 1) = x³ + 1, both products equal (x³ − 1)(x³ + 1)(x + 1), verifying that f(x) × g(x) = LCM × GCD.",
        "eq": "f(x) × g(x) = (x³ − 1)(x³ + 1)(x + 1) = LCM × GCD",
        "math": {
          "latex": "f(x)\\times g(x)=(x^3-1)(x^3+1)(x+1)=\\text{LCM}\\times\\text{GCD}",
          "fallback": "f(x) × g(x) = (x³ − 1)(x³ + 1)(x + 1) = LCM × GCD",
          "display": true
        }
      }
    ],
    "answer": "(x + 1), (x − 1)(x + 1)(x² + x + 1)(x² − x + 1)",
    "answerMath": {
      "latex": "\\text{GCD}=(x+1),\\quad\\text{LCM}=(x-1)(x+1)(x^2+x+1)(x^2-x+1)",
      "fallback": "(x + 1), (x − 1)(x + 1)(x² + x + 1)(x² − x + 1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q1(ii); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q1(iii)",
      "ta": "Exercise 3.3 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find LCM and GCD of (x²y + xy²) and (x² + xy) and verify product identity"
    },
    "q": {
      "en": "Find the LCM and GCD for the following and verify that f(x) × g(x) = LCM × GCD (iii) (x²y + xy²), (x² + xy)"
    },
    "questionMath": {
      "en": [
        "Find the LCM and GCD for the following and verify that ",
        {
          "latex": "f(x)\\times g(x)=\\text{LCM}\\times\\text{GCD}",
          "fallback": "f(x) × g(x) = LCM × GCD",
          "display": false
        },
        " (iii) ",
        {
          "latex": "(x^2y+xy^2),\\;(x^2+xy)",
          "fallback": "(x²y + xy²), (x² + xy)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out the greatest common monomial factor from each expression: xy from f(x) = x²y + xy² and x from g(x) = x² + xy.",
        "eq": "f(x) = xy(x + y); g(x) = x(x + y)",
        "math": {
          "latex": "f(x)=xy(x+y),\\qquad g(x)=x(x+y)",
          "fallback": "f(x) = xy(x + y); g(x) = x(x + y)",
          "display": true
        }
      },
      {
        "en": "Identify the common factors x and (x + y) to get GCD = x(x + y), and include the extra factor y to get LCM = xy(x + y).",
        "eq": "GCD = x(x + y); LCM = xy(x + y)",
        "math": {
          "latex": "\\text{GCD}=x(x+y),\\qquad\\text{LCM}=xy(x+y)",
          "fallback": "GCD = x(x + y); LCM = xy(x + y)",
          "display": true
        }
      },
      {
        "en": "Multiply f(x) × g(x) and compare with LCM × GCD. Both equal x²y(x + y)², verifying that f(x) × g(x) = LCM × GCD.",
        "eq": "f(x) × g(x) = [xy(x + y)][x(x + y)] = x²y(x + y)² = LCM × GCD",
        "math": {
          "latex": "f(x)\\times g(x)=[xy(x+y)][x(x+y)]=x^2y(x+y)^2=\\text{LCM}\\times\\text{GCD}",
          "fallback": "f(x) × g(x) = [xy(x + y)][x(x + y)] = x²y(x + y)² = LCM × GCD",
          "display": true
        }
      }
    ],
    "answer": "x(x + y), xy(x + y)",
    "answerMath": {
      "latex": "\\text{GCD}=x(x+y),\\quad\\text{LCM}=xy(x+y)",
      "fallback": "x(x + y), xy(x + y)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q1(iii); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q2(i)",
      "ta": "Exercise 3.3 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of a² + 4a − 12 and a² − 5a + 6 given GCD = a − 2"
    },
    "q": {
      "en": "Find the LCM of each pair of the following polynomials (i) a² + 4a − 12, a² − 5a + 6 whose GCD is a − 2"
    },
    "questionMath": {
      "en": [
        "Find the LCM of each pair of the following polynomials (i) ",
        {
          "latex": "a^2+4a-12,\\;a^2-5a+6",
          "fallback": "a² + 4a − 12, a² − 5a + 6",
          "display": false
        },
        " whose ",
        {
          "latex": "\\text{GCD}",
          "fallback": "GCD",
          "display": false
        },
        " is ",
        {
          "latex": "a-2",
          "fallback": "a − 2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize both quadratic polynomials f(a) = a² + 4a − 12 and g(a) = a² − 5a + 6.",
        "eq": "f(a) = (a + 6)(a − 2); g(a) = (a − 2)(a − 3)",
        "math": {
          "latex": "f(a)=(a+6)(a-2),\\qquad g(a)=(a-2)(a-3)",
          "fallback": "f(a) = (a + 6)(a − 2); g(a) = (a − 2)(a − 3)",
          "display": true
        }
      },
      {
        "en": "Use the identity LCM = [f(a) × g(a)] / GCD.",
        "eq": "LCM = [(a + 6)(a − 2) × (a − 2)(a − 3)] / (a − 2)",
        "math": {
          "latex": "\\text{LCM}=\\dfrac{f(a)\\times g(a)}{\\text{GCD}}=\\dfrac{(a+6)(a-2)(a-2)(a-3)}{a-2}",
          "fallback": "LCM = [(a + 6)(a − 2) × (a − 2)(a − 3)] / (a − 2)",
          "display": true
        }
      },
      {
        "en": "Cancel the common factor (a − 2) in the numerator and denominator. Therefore, the LCM is (a + 6)(a − 2)(a − 3).",
        "eq": "LCM = (a + 6)(a − 2)(a − 3)",
        "math": {
          "latex": "\\text{LCM}=(a+6)(a-2)(a-3)",
          "fallback": "LCM = (a + 6)(a − 2)(a − 3)",
          "display": true
        }
      }
    ],
    "answer": "(a + 6)(a − 2)(a − 3)",
    "answerMath": {
      "latex": "(a+6)(a-2)(a-3)",
      "fallback": "(a + 6)(a − 2)(a − 3)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q2(i); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q2(ii)",
      "ta": "Exercise 3.3 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of x⁴ − 27a³x and (x − 3a)² given GCD = (x − 3a)"
    },
    "q": {
      "en": "Find the LCM of each pair of the following polynomials (ii) x⁴ − 27a³x, (x − 3a)² whose GCD is (x − 3a)"
    },
    "questionMath": {
      "en": [
        "Find the LCM of each pair of the following polynomials (ii) ",
        {
          "latex": "x^4-27a^3x,\\;(x-3a)^2",
          "fallback": "x⁴ − 27a³x, (x − 3a)²",
          "display": false
        },
        " whose ",
        {
          "latex": "\\text{GCD}",
          "fallback": "GCD",
          "display": false
        },
        " is ",
        {
          "latex": "(x-3a)",
          "fallback": "(x − 3a)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out x from f(x) = x⁴ − 27a³x and apply the difference of cubes identity x³ − (3a)³ = (x − 3a)(x² + 3ax + 9a²).",
        "eq": "f(x) = x(x³ − 27a³) = x(x − 3a)(x² + 3ax + 9a²)",
        "math": {
          "latex": "f(x)=x(x^3-27a^3)=x(x-3a)(x^2+3ax+9a^2)",
          "fallback": "f(x) = x(x³ − 27a³) = x(x − 3a)(x² + 3ax + 9a²)",
          "display": true
        }
      },
      {
        "en": "Substitute f(x), g(x) = (x − 3a)², and GCD = (x − 3a) into LCM = [f(x) × g(x)] / GCD.",
        "eq": "LCM = [x(x − 3a)(x² + 3ax + 9a²) × (x − 3a)²] / (x − 3a)",
        "math": {
          "latex": "\\text{LCM}=\\dfrac{x(x-3a)(x^2+3ax+9a^2)(x-3a)^2}{x-3a}",
          "fallback": "LCM = [x(x − 3a)(x² + 3ax + 9a²) × (x − 3a)²] / (x − 3a)",
          "display": true
        }
      },
      {
        "en": "Cancel the common factor (x − 3a). Therefore, the LCM is x(x − 3a)²(x² + 3ax + 9a²).",
        "eq": "LCM = x(x − 3a)²(x² + 3ax + 9a²)",
        "math": {
          "latex": "\\text{LCM}=x(x-3a)^2(x^2+3ax+9a^2)",
          "fallback": "LCM = x(x − 3a)²(x² + 3ax + 9a²)",
          "display": true
        }
      }
    ],
    "answer": "x(x − 3a)²(x² + 3ax + 9a²)",
    "answerMath": {
      "latex": "x(x-3a)^2(x^2+3ax+9a^2)",
      "fallback": "x(x − 3a)²(x² + 3ax + 9a²)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q2(ii); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q3-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q3(i)",
      "ta": "Exercise 3.3 · Q3(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of 12(x⁴ − x³) and 8(x⁴ − 3x³ + 2x²) given their LCM"
    },
    "q": {
      "en": "Find the GCD of each pair of the following polynomials (i) 12(x⁴ − x³), 8(x⁴ − 3x³ + 2x²) whose LCM is 24x³(x − 1)(x − 2)"
    },
    "questionMath": {
      "en": [
        "Find the GCD of each pair of the following polynomials (i) ",
        {
          "latex": "12(x^4-x^3),\\;8(x^4-3x^3+2x^2)",
          "fallback": "12(x⁴ − x³), 8(x⁴ − 3x³ + 2x²)",
          "display": false
        },
        " whose LCM is ",
        {
          "latex": "24x^3(x-1)(x-2)",
          "fallback": "24x³(x − 1)(x − 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out the highest power of x from each polynomial and factorize the remaining quadratic.",
        "eq": "f(x) = 12x³(x − 1); g(x) = 8x²(x² − 3x + 2) = 8x²(x − 1)(x − 2)",
        "math": {
          "latex": "\\begin{aligned}f(x)&=12x^3(x-1)\\\\g(x)&=8x^2(x^2-3x+2)=8x^2(x-1)(x-2)\\end{aligned}",
          "fallback": "f(x) = 12x³(x − 1); g(x) = 8x²(x² − 3x + 2) = 8x²(x − 1)(x − 2)",
          "display": true
        }
      },
      {
        "en": "Use the identity GCD = [f(x) × g(x)] / LCM.",
        "eq": "GCD = [12x³(x − 1) × 8x²(x − 1)(x − 2)] / [24x³(x − 1)(x − 2)]",
        "math": {
          "latex": "\\text{GCD}=\\dfrac{f(x)\\times g(x)}{\\text{LCM}}=\\dfrac{12x^3(x-1)\\times 8x^2(x-1)(x-2)}{24x^3(x-1)(x-2)}",
          "fallback": "GCD = [12x³(x − 1) × 8x²(x − 1)(x − 2)] / [24x³(x − 1)(x − 2)]",
          "display": true
        }
      },
      {
        "en": "Simplify (12 × 8) / 24 = 4 and cancel x³(x − 1)(x − 2). Therefore, the GCD is 4x²(x − 1).",
        "eq": "GCD = 4x²(x − 1)",
        "math": {
          "latex": "\\text{GCD}=4x^2(x-1)",
          "fallback": "GCD = 4x²(x − 1)",
          "display": true
        }
      }
    ],
    "answer": "4x²(x − 1)",
    "answerMath": {
      "latex": "4x^2(x-1)",
      "fallback": "4x²(x − 1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q3(i); printed p. 98, PDF p. 104; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q3-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q3(ii)",
      "ta": "Exercise 3.3 · Q3(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of (x³ + y³) and (x⁴ + x²y² + y⁴) given their LCM"
    },
    "q": {
      "en": "Find the GCD of each pair of the following polynomials (ii) (x³ + y³), (x⁴ + x²y² + y⁴) whose LCM is (x³ + y³)(x² + xy + y²)"
    },
    "questionMath": {
      "en": [
        "Find the GCD of each pair of the following polynomials (ii) ",
        {
          "latex": "(x^3+y^3),\\;(x^4+x^2y^2+y^4)",
          "fallback": "(x³ + y³), (x⁴ + x²y² + y⁴)",
          "display": false
        },
        " whose LCM is ",
        {
          "latex": "(x^3+y^3)(x^2+xy+y^2)",
          "fallback": "(x³ + y³)(x² + xy + y²)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize x⁴ + x²y² + y⁴ by completing the square: (x² + y²)² − (xy)² = (x² + xy + y²)(x² − xy + y²).",
        "eq": "x⁴ + x²y² + y⁴ = (x² + xy + y²)(x² − xy + y²)",
        "math": {
          "latex": "x^4+x^2y^2+y^4=(x^2+xy+y^2)(x^2-xy+y^2)",
          "fallback": "x⁴ + x²y² + y⁴ = (x² + xy + y²)(x² − xy + y²)",
          "display": true
        }
      },
      {
        "en": "Substitute f(x) = x³ + y³, g(x) = (x² + xy + y²)(x² − xy + y²), and LCM = (x³ + y³)(x² + xy + y²) into GCD = [f(x) × g(x)] / LCM.",
        "eq": "GCD = [(x³ + y³)(x² + xy + y²)(x² − xy + y²)] / [(x³ + y³)(x² + xy + y²)]",
        "math": {
          "latex": "\\text{GCD}=\\dfrac{(x^3+y^3)(x^2+xy+y^2)(x^2-xy+y^2)}{(x^3+y^3)(x^2+xy+y^2)}",
          "fallback": "GCD = [(x³ + y³)(x² + xy + y²)(x² − xy + y²)] / [(x³ + y³)(x² + xy + y²)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (x³ + y³) and (x² + xy + y²). Therefore, the GCD is x² − xy + y².",
        "eq": "GCD = x² − xy + y²",
        "math": {
          "latex": "\\text{GCD}=x^2-xy+y^2",
          "fallback": "GCD = x² − xy + y²",
          "display": true
        }
      }
    ],
    "answer": "x² − xy + y²",
    "answerMath": {
      "latex": "x^2-xy+y^2",
      "fallback": "x² − xy + y²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q3(ii); printed p. 98, PDF p. 104; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q4-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q4(i)",
      "ta": "Exercise 3.3 · Q4(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the unknown polynomial q(x) from LCM, GCD, and p(x)"
    },
    "q": {
      "en": "Given the LCM and GCD of the two polynomials p(x) and q(x) find the unknown polynomial in the following table (i) LCM = a³ − 10a² + 11a + 70, GCD = a − 7, p(x) = a² − 12a + 35, find q(x)"
    },
    "questionMath": {
      "en": [
        "Given the LCM and GCD of the two polynomials ",
        {
          "latex": "p(x)",
          "fallback": "p(x)",
          "display": false
        },
        " and ",
        {
          "latex": "q(x)",
          "fallback": "q(x)",
          "display": false
        },
        " find the unknown polynomial in the following table (i) ",
        {
          "latex": "\\text{LCM}=a^3-10a^2+11a+70,\\;\\text{GCD}=a-7,\\;p(x)=a^2-12a+35,\\;\\text{find }q(x)",
          "fallback": "LCM = a³ − 10a² + 11a + 70, GCD = a − 7, p(x) = a² − 12a + 35, find q(x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize p(x) = a² − 12a + 35 into (a − 7)(a − 5). Since a = 7 and a = 5 are roots of LCM = a³ − 10a² + 11a + 70, divide the cubic by (a − 7)(a − 5) to factorize the LCM completely.",
        "eq": "p(x) = (a − 7)(a − 5); LCM = a³ − 10a² + 11a + 70 = (a − 7)(a − 5)(a + 2)",
        "math": {
          "latex": "\\begin{aligned}p(x)&=(a-7)(a-5)\\\\\\text{LCM}&=a^3-10a^2+11a+70=(a-7)(a-5)(a+2)\\end{aligned}",
          "fallback": "p(x) = (a − 7)(a − 5); LCM = a³ − 10a² + 11a + 70 = (a − 7)(a − 5)(a + 2)",
          "display": true
        }
      },
      {
        "en": "Substitute LCM, GCD = (a − 7), and p(x) into the relationship q(x) = (LCM × GCD) / p(x).",
        "eq": "q(x) = [(a − 7)(a − 5)(a + 2) × (a − 7)] / [(a − 7)(a − 5)]",
        "math": {
          "latex": "q(x)=\\dfrac{\\text{LCM}\\times\\text{GCD}}{p(x)}=\\dfrac{(a-7)(a-5)(a+2)(a-7)}{(a-7)(a-5)}",
          "fallback": "q(x) = [(a − 7)(a − 5)(a + 2) × (a − 7)] / [(a − 7)(a − 5)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (a − 7) and (a − 5). Therefore, the unknown polynomial q(x) is (a + 2)(a − 7).",
        "eq": "q(x) = (a + 2)(a − 7)",
        "math": {
          "latex": "q(x)=(a+2)(a-7)",
          "fallback": "q(x) = (a + 2)(a − 7)",
          "display": true
        }
      }
    ],
    "answer": "(a + 2)(a − 7)",
    "answerMath": {
      "latex": "(a+2)(a-7)",
      "fallback": "(a + 2)(a − 7)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q4(i); printed p. 98, PDF p. 104; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-3-q4-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.3",
    "topic": {
      "en": "Algebra — Relationship between LCM and GCD"
    },
    "label": {
      "en": "Exercise 3.3 · Q4(ii)",
      "ta": "Exercise 3.3 · Q4(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the unknown polynomial p(x) from LCM, GCD, and q(x)"
    },
    "q": {
      "en": "Given the LCM and GCD of the two polynomials p(x) and q(x) find the unknown polynomial in the following table (ii) LCM = (x⁴ − y⁴)(x⁴ + x²y² + y⁴), GCD = (x² − y²), q(x) = (x⁴ − y⁴)(x² + y² − xy), find p(x)"
    },
    "questionMath": {
      "en": [
        "Given the LCM and GCD of the two polynomials ",
        {
          "latex": "p(x)",
          "fallback": "p(x)",
          "display": false
        },
        " and ",
        {
          "latex": "q(x)",
          "fallback": "q(x)",
          "display": false
        },
        " find the unknown polynomial in the following table (ii) ",
        {
          "latex": "\\text{LCM}=(x^4-y^4)(x^4+x^2y^2+y^4),\\;\\text{GCD}=(x^2-y^2),\\;q(x)=(x^4-y^4)(x^2+y^2-xy),\\;\\text{find }p(x)",
          "fallback": "LCM = (x⁴ − y⁴)(x⁴ + x²y² + y⁴), GCD = (x² − y²), q(x) = (x⁴ − y⁴)(x² + y² − xy), find p(x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize x⁴ + x²y² + y⁴ into (x² + xy + y²)(x² − xy + y²) so that the LCM is expressed in terms of quadratic factors.",
        "eq": "x⁴ + x²y² + y⁴ = (x² + xy + y²)(x² + y² − xy)",
        "math": {
          "latex": "x^4+x^2y^2+y^4=(x^2+xy+y^2)(x^2+y^2-xy)",
          "fallback": "x⁴ + x²y² + y⁴ = (x² + xy + y²)(x² + y² − xy)",
          "display": true
        }
      },
      {
        "en": "Substitute LCM, GCD = (x² − y²), and q(x) = (x⁴ − y⁴)(x² + y² − xy) into p(x) = (LCM × GCD) / q(x).",
        "eq": "p(x) = [(x⁴ − y⁴)(x² + xy + y²)(x² + y² − xy)(x² − y²)] / [(x⁴ − y⁴)(x² + y² − xy)]",
        "math": {
          "latex": "p(x)=\\dfrac{(x^4-y^4)(x^2+xy+y^2)(x^2+y^2-xy)(x^2-y^2)}{(x^4-y^4)(x^2+y^2-xy)}",
          "fallback": "p(x) = [(x⁴ − y⁴)(x² + xy + y²)(x² + y² − xy)(x² − y²)] / [(x⁴ − y⁴)(x² + y² − xy)]",
          "display": true
        }
      },
      {
        "en": "Cancel the common factors (x⁴ − y⁴) and (x² + y² − xy). Therefore, the unknown polynomial p(x) is (x² − y²)(x² + xy + y²).",
        "eq": "p(x) = (x² − y²)(x² + xy + y²)",
        "math": {
          "latex": "p(x)=(x^2-y^2)(x^2+xy+y^2)",
          "fallback": "p(x) = (x² − y²)(x² + xy + y²)",
          "display": true
        }
      }
    ],
    "answer": "(x² − y²)(x² + xy + y²)",
    "answerMath": {
      "latex": "(x^2-y^2)(x^2+xy+y^2)",
      "fallback": "(x² − y²)(x² + xy + y²)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.3 Q4(ii); printed p. 98, PDF p. 104; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.3 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
