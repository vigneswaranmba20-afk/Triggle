/* Grade 10 Ch 3 Ex 3.2 (Q1(i)-(iv), Q2(i)-(vi)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF pp. 102-103 (printed pp. 96-97), Tamil PDF p. 104 (printed p. 98),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-2-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q1(i)",
      "ta": "Exercise 3.2 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of x⁴ + 3x³ − x − 3 and x³ + x² − 5x + 3"
    },
    "q": {
      "en": "Find the GCD of the given polynomials (i) x⁴ + 3x³ − x − 3, x³ + x² − 5x + 3"
    },
    "questionMath": {
      "en": [
        "Find the GCD of the given polynomials (i) ",
        {
          "latex": "x^4+3x^3-x-3,\\;x^3+x^2-5x+3",
          "fallback": "x⁴ + 3x³ − x − 3, x³ + x² − 5x + 3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Let f(x) = x⁴ + 3x³ − x − 3 and g(x) = x³ + x² − 5x + 3. Divide the higher-degree polynomial f(x) by g(x) to find the first remainder.",
        "eq": "x⁴ + 3x³ − x − 3 = (x + 2)(x³ + x² − 5x + 3) + (3x² + 6x − 9)",
        "math": {
          "latex": "x^4+3x^3-x-3=(x+2)(x^3+x^2-5x+3)+(3x^2+6x-9)",
          "fallback": "x⁴ + 3x³ − x − 3 = (x + 2)(x³ + x² − 5x + 3) + (3x² + 6x − 9)",
          "display": true
        }
      },
      {
        "en": "Factor out the non-zero numerical constant 3 from the remainder 3x² + 6x − 9 to obtain the simplified divisor x² + 2x − 3.",
        "eq": "3x² + 6x − 9 = 3(x² + 2x − 3)",
        "math": {
          "latex": "3x^2+6x-9=3(x^2+2x-3)",
          "fallback": "3x² + 6x − 9 = 3(x² + 2x − 3)",
          "display": true
        }
      },
      {
        "en": "Divide g(x) = x³ + x² − 5x + 3 by x² + 2x − 3. Since the remainder is 0, the last non-zero divisor x² + 2x − 3 is the Greatest Common Divisor (GCD). Therefore, the GCD of the given polynomials is x² + 2x − 3.",
        "eq": "x³ + x² − 5x + 3 = (x − 1)(x² + 2x − 3) + 0 ⇒ GCD = x² + 2x − 3",
        "math": {
          "latex": "x^3+x^2-5x+3=(x-1)(x^2+2x-3)+0\\implies\\text{GCD}=x^2+2x-3",
          "fallback": "x³ + x² − 5x + 3 = (x − 1)(x² + 2x − 3) + 0 ⇒ GCD = x² + 2x − 3",
          "display": true
        }
      }
    ],
    "answer": "x² + 2x − 3",
    "answerMath": {
      "latex": "x^2+2x-3",
      "fallback": "x² + 2x − 3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q1(i); printed p. 96, PDF p. 102; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q1(ii)",
      "ta": "Exercise 3.2 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of x⁴ − 1 and x³ − 11x² + x − 11"
    },
    "q": {
      "en": "Find the GCD of the given polynomials (ii) x⁴ − 1 , x³ − 11x² + x − 11"
    },
    "questionMath": {
      "en": [
        "Find the GCD of the given polynomials (ii) ",
        {
          "latex": "x^4-1\\,,\\;x^3-11x^2+x-11",
          "fallback": "x⁴ − 1 , x³ − 11x² + x − 11",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Let f(x) = x⁴ − 1 and g(x) = x³ − 11x² + x − 11. Divide f(x) by g(x) using polynomial long division.",
        "eq": "x⁴ − 1 = (x + 11)(x³ − 11x² + x − 11) + (120x² + 120)",
        "math": {
          "latex": "x^4-1=(x+11)(x^3-11x^2+x-11)+(120x^2+120)",
          "fallback": "x⁴ − 1 = (x + 11)(x³ − 11x² + x − 11) + (120x² + 120)",
          "display": true
        }
      },
      {
        "en": "Factor out the non-zero constant 120 from the remainder 120x² + 120 to get the simplified divisor x² + 1.",
        "eq": "120x² + 120 = 120(x² + 1)",
        "math": {
          "latex": "120x^2+120=120(x^2+1)",
          "fallback": "120x² + 120 = 120(x² + 1)",
          "display": true
        }
      },
      {
        "en": "Divide g(x) = x³ − 11x² + x − 11 by x² + 1. Because the remainder is 0, the last non-zero divisor x² + 1 is the GCD. Therefore, the GCD of the given polynomials is x² + 1.",
        "eq": "x³ − 11x² + x − 11 = (x − 11)(x² + 1) + 0 ⇒ GCD = x² + 1",
        "math": {
          "latex": "x^3-11x^2+x-11=(x-11)(x^2+1)+0\\implies\\text{GCD}=x^2+1",
          "fallback": "x³ − 11x² + x − 11 = (x − 11)(x² + 1) + 0 ⇒ GCD = x² + 1",
          "display": true
        }
      }
    ],
    "answer": "x² + 1",
    "answerMath": {
      "latex": "x^2+1",
      "fallback": "x² + 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q1(ii); printed p. 96, PDF p. 102; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q1(iii)",
      "ta": "Exercise 3.2 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of 3x⁴ + 6x³ − 12x² − 24x and 4x⁴ + 14x³ + 8x² − 8x"
    },
    "q": {
      "en": "Find the GCD of the given polynomials (iii) 3x⁴ + 6x³ − 12x² − 24x, 4x⁴ + 14x³ + 8x² − 8x"
    },
    "questionMath": {
      "en": [
        "Find the GCD of the given polynomials (iii) ",
        {
          "latex": "3x^4+6x^3-12x^2-24x,\\;4x^4+14x^3+8x^2-8x",
          "fallback": "3x⁴ + 6x³ − 12x² − 24x, 4x⁴ + 14x³ + 8x² − 8x",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out the greatest common monomial factor from each polynomial first: take out 3x from the first polynomial and 2x from the second polynomial. The GCD of the monomial factors 3x and 2x is x (since gcd(3, 2) = 1).",
        "eq": "f(x) = 3x(x³ + 2x² − 4x − 8); g(x) = 2x(2x³ + 7x² + 4x − 4); gcd(3x, 2x) = x",
        "math": {
          "latex": "\\begin{aligned}f(x)&=3x(x^3+2x^2-4x-8)\\\\g(x)&=2x(2x^3+7x^2+4x-4),\\quad\\gcd(3x,2x)=x\\end{aligned}",
          "fallback": "f(x) = 3x(x³ + 2x² − 4x − 8); g(x) = 2x(2x³ + 7x² + 4x − 4); gcd(3x, 2x) = x",
          "display": true
        }
      },
      {
        "en": "Now divide 2x³ + 7x² + 4x − 4 by x³ + 2x² − 4x − 8 and factor out the numerical constant 3 from the remainder.",
        "eq": "2x³ + 7x² + 4x − 4 = 2(x³ + 2x² − 4x − 8) + 3(x² + 4x + 4)",
        "math": {
          "latex": "2x^3+7x^2+4x-4=2(x^3+2x^2-4x-8)+3(x^2+4x+4)",
          "fallback": "2x³ + 7x² + 4x − 4 = 2(x³ + 2x² − 4x − 8) + 3(x² + 4x + 4)",
          "display": true
        }
      },
      {
        "en": "Divide x³ + 2x² − 4x − 8 by x² + 4x + 4. Since the remainder is 0, the cubic polynomials have GCD x² + 4x + 4. Multiplying by the common monomial factor x gives the complete GCD x(x² + 4x + 4).",
        "eq": "x³ + 2x² − 4x − 8 = (x − 2)(x² + 4x + 4) + 0 ⇒ GCD = x(x² + 4x + 4)",
        "math": {
          "latex": "x^3+2x^2-4x-8=(x-2)(x^2+4x+4)+0\\implies\\text{GCD}=x(x^2+4x+4)",
          "fallback": "x³ + 2x² − 4x − 8 = (x − 2)(x² + 4x + 4) + 0 ⇒ GCD = x(x² + 4x + 4)",
          "display": true
        }
      }
    ],
    "answer": "x(x² + 4x + 4)",
    "answerMath": {
      "latex": "x(x^2+4x+4)",
      "fallback": "x(x² + 4x + 4)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q1(iii); printed p. 96, PDF p. 102; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q1(iv)",
      "ta": "Exercise 3.2 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the GCD of 3x³ + 3x² + 3x + 3 and 6x³ + 12x² + 6x + 12"
    },
    "q": {
      "en": "Find the GCD of the given polynomials (iv) 3x³ + 3x² + 3x + 3 , 6x³ + 12x² + 6x + 12"
    },
    "questionMath": {
      "en": [
        "Find the GCD of the given polynomials (iv) ",
        {
          "latex": "3x^3+3x^2+3x+3\\,,\\;6x^3+12x^2+6x+12",
          "fallback": "3x³ + 3x² + 3x + 3 , 6x³ + 12x² + 6x + 12",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out the numerical coefficient 3 from the first polynomial and 6 from the second polynomial. The GCD of the leading coefficients 3 and 6 is 3.",
        "eq": "f(x) = 3(x³ + x² + x + 1); g(x) = 6(x³ + 2x² + x + 2); gcd(3, 6) = 3",
        "math": {
          "latex": "f(x)=3(x^3+x^2+x+1),\\quad g(x)=6(x^3+2x^2+x+2),\\quad\\gcd(3,6)=3",
          "fallback": "f(x) = 3(x³ + x² + x + 1); g(x) = 6(x³ + 2x² + x + 2); gcd(3, 6) = 3",
          "display": true
        }
      },
      {
        "en": "Divide x³ + 2x² + x + 2 by x³ + x² + x + 1 to obtain the remainder x² + 1.",
        "eq": "x³ + 2x² + x + 2 = 1(x³ + x² + x + 1) + (x² + 1)",
        "math": {
          "latex": "x^3+2x^2+x+2=1(x^3+x^2+x+1)+(x^2+1)",
          "fallback": "x³ + 2x² + x + 2 = 1(x³ + x² + x + 1) + (x² + 1)",
          "display": true
        }
      },
      {
        "en": "Divide x³ + x² + x + 1 by x² + 1. Since the remainder is 0, the polynomial GCD is x² + 1. Multiplying by the numerical GCD 3 gives the final answer 3(x² + 1).",
        "eq": "x³ + x² + x + 1 = (x + 1)(x² + 1) + 0 ⇒ GCD = 3(x² + 1)",
        "math": {
          "latex": "x^3+x^2+x+1=(x+1)(x^2+1)+0\\implies\\text{GCD}=3(x^2+1)",
          "fallback": "x³ + x² + x + 1 = (x + 1)(x² + 1) + 0 ⇒ GCD = 3(x² + 1)",
          "display": true
        }
      }
    ],
    "answer": "3(x² + 1)",
    "answerMath": {
      "latex": "3(x^2+1)",
      "fallback": "3(x² + 1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q1(iv); printed p. 96, PDF p. 102; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(i)",
      "ta": "Exercise 3.2 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of 4x²y and 8x³y²"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (i) 4x²y, 8x³y²"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (i) ",
        {
          "latex": "4x^2y,\\;8x^3y^2",
          "fallback": "4x²y, 8x³y²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Find the Least Common Multiple (LCM) of the numerical coefficients 4 and 8.",
        "eq": "LCM(4, 8) = 8",
        "math": {
          "latex": "\\text{LCM}(4,8)=8",
          "fallback": "LCM(4, 8) = 8",
          "display": true
        }
      },
      {
        "en": "For each variable, take the highest power present in either expression: between x² and x³ the highest power is x³, and between y¹ and y² the highest power is y².",
        "eq": "LCM(x²y, x³y²) = x³y²",
        "math": {
          "latex": "\\text{LCM}(x^2y,\\,x^3y^2)=x^3y^2",
          "fallback": "LCM(x²y, x³y²) = x³y²",
          "display": true
        }
      },
      {
        "en": "Multiply the numerical LCM by the variable LCM. Therefore, the LCM of 4x²y and 8x³y² is 8x³y².",
        "eq": "LCM(4x²y, 8x³y²) = 8x³y²",
        "math": {
          "latex": "\\text{LCM}(4x^2y,\\,8x^3y^2)=8x^3y^2",
          "fallback": "LCM(4x²y, 8x³y²) = 8x³y²",
          "display": true
        }
      }
    ],
    "answer": "8x³y²",
    "answerMath": {
      "latex": "8x^3y^2",
      "fallback": "8x³y²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(i); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(ii)",
      "ta": "Exercise 3.2 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of −9a³b² and 12a²b²c"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (ii) −9a³b², 12a²b²c"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (ii) ",
        {
          "latex": "-9a^3b^2,\\;12a^2b^2c",
          "fallback": "−9a³b², 12a²b²c",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Find the LCM of the numerical coefficients −9 and 12 (retaining the negative sign as printed in the textbook answer key for signed monomials, since 9 = 3² and 12 = 2² × 3 give magnitude 36).",
        "eq": "LCM(−9, 12) = −36",
        "math": {
          "latex": "\\text{LCM}(-9,12)=-36",
          "fallback": "LCM(−9, 12) = −36",
          "display": true
        }
      },
      {
        "en": "Select the highest power of each variable a, b, and c across both terms: a³ for a, b² for b, and c¹ for c.",
        "eq": "LCM(a³b², a²b²c) = a³b²c",
        "math": {
          "latex": "\\text{LCM}(a^3b^2,\\,a^2b^2c)=a^3b^2c",
          "fallback": "LCM(a³b², a²b²c) = a³b²c",
          "display": true
        }
      },
      {
        "en": "Combine the coefficient and variable factors. Therefore, the LCM is −36a³b²c.",
        "eq": "LCM(−9a³b², 12a²b²c) = −36a³b²c",
        "math": {
          "latex": "\\text{LCM}(-9a^3b^2,\\,12a^2b^2c)=-36a^3b^2c",
          "fallback": "LCM(−9a³b², 12a²b²c) = −36a³b²c",
          "display": true
        }
      }
    ],
    "answer": "−36a³b²c",
    "answerMath": {
      "latex": "-36a^3b^2c",
      "fallback": "−36a³b²c",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(ii); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(iii)",
      "ta": "Exercise 3.2 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of 16m, −12m²n², and 8n²"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (iii) 16m, −12m²n², 8n²"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (iii) ",
        {
          "latex": "16m,\\;-12m^2n^2,\\;8n^2",
          "fallback": "16m, −12m²n², 8n²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Find the LCM of the numerical coefficients 16, −12, and 8 (since 16 = 2⁴, 12 = 2² × 3, and 8 = 2³, their least common multiple has magnitude 2⁴ × 3 = 48, carrying the negative sign as −48).",
        "eq": "LCM(16, −12, 8) = −48",
        "math": {
          "latex": "\\text{LCM}(16,-12,8)=-48",
          "fallback": "LCM(16, −12, 8) = −48",
          "display": true
        }
      },
      {
        "en": "Take the highest power of each variable m and n across the three expressions: m² for m and n² for n.",
        "eq": "LCM(m, m²n², n²) = m²n²",
        "math": {
          "latex": "\\text{LCM}(m,\\,m^2n^2,\\,n^2)=m^2n^2",
          "fallback": "LCM(m, m²n², n²) = m²n²",
          "display": true
        }
      },
      {
        "en": "Multiply the numerical and variable parts together. Therefore, the LCM is −48m²n².",
        "eq": "LCM(16m, −12m²n², 8n²) = −48m²n²",
        "math": {
          "latex": "\\text{LCM}(16m,\\,-12m^2n^2,\\,8n^2)=-48m^2n^2",
          "fallback": "LCM(16m, −12m²n², 8n²) = −48m²n²",
          "display": true
        }
      }
    ],
    "answer": "−48m²n²",
    "answerMath": {
      "latex": "-48m^2n^2",
      "fallback": "−48m²n²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(iii); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(iv)",
      "ta": "Exercise 3.2 · Q2(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of p² − 3p + 2 and p² − 4"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (iv) p² − 3p + 2, p² − 4"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (iv) ",
        {
          "latex": "p^2-3p+2,\\;p^2-4",
          "fallback": "p² − 3p + 2, p² − 4",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the quadratic trinomial p² − 3p + 2 by splitting the middle term (−1 − 2 = −3 and (−1)(−2) = 2).",
        "eq": "p² − 3p + 2 = (p − 1)(p − 2)",
        "math": {
          "latex": "p^2-3p+2=(p-1)(p-2)",
          "fallback": "p² − 3p + 2 = (p − 1)(p − 2)",
          "display": true
        }
      },
      {
        "en": "Factorize p² − 4 using the difference of two squares identity a² − b² = (a − b)(a + b).",
        "eq": "p² − 4 = p² − 2² = (p − 2)(p + 2)",
        "math": {
          "latex": "p^2-4=p^2-2^2=(p-2)(p+2)",
          "fallback": "p² − 4 = p² − 2² = (p − 2)(p + 2)",
          "display": true
        }
      },
      {
        "en": "Take the product of all distinct linear factors, each raised to its highest power. Therefore, the LCM is (p − 1)(p − 2)(p + 2).",
        "eq": "LCM = (p − 1)(p − 2)(p + 2)",
        "math": {
          "latex": "\\text{LCM}=(p-1)(p-2)(p+2)",
          "fallback": "LCM = (p − 1)(p − 2)(p + 2)",
          "display": true
        }
      }
    ],
    "answer": "(p − 1)(p − 2)(p + 2)",
    "answerMath": {
      "latex": "(p-1)(p-2)(p+2)",
      "fallback": "(p − 1)(p − 2)(p + 2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(iv); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-v",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(v)",
      "ta": "Exercise 3.2 · Q2(v) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of 2x² − 5x − 3 and 4x² − 36"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (v) 2x² − 5x − 3, 4x² − 36"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (v) ",
        {
          "latex": "2x^2-5x-3,\\;4x^2-36",
          "fallback": "2x² − 5x − 3, 4x² − 36",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the first quadratic 2x² − 5x − 3 by splitting −5x into −6x + x.",
        "eq": "2x² − 5x − 3 = 2x(x − 3) + 1(x − 3) = (2x + 1)(x − 3)",
        "math": {
          "latex": "2x^2-5x-3=2x(x-3)+1(x-3)=(2x+1)(x-3)",
          "fallback": "2x² − 5x − 3 = 2x(x − 3) + 1(x − 3) = (2x + 1)(x − 3)",
          "display": true
        }
      },
      {
        "en": "Factor out 4 from the second expression 4x² − 36 and apply the difference of squares identity x² − 3² = (x + 3)(x − 3).",
        "eq": "4x² − 36 = 4(x² − 9) = 4(x + 3)(x − 3)",
        "math": {
          "latex": "4x^2-36=4(x^2-9)=4(x+3)(x-3)",
          "fallback": "4x² − 36 = 4(x² − 9) = 4(x + 3)(x − 3)",
          "display": true
        }
      },
      {
        "en": "Combine the numerical factor 4 with each distinct linear factor (x + 3), (2x + 1), and (x − 3). Therefore, the LCM is 4(x + 3)(2x + 1)(x − 3).",
        "eq": "LCM = 4(x + 3)(2x + 1)(x − 3)",
        "math": {
          "latex": "\\text{LCM}=4(x+3)(2x+1)(x-3)",
          "fallback": "LCM = 4(x + 3)(2x + 1)(x − 3)",
          "display": true
        }
      }
    ],
    "answer": "4(x + 3)(2x + 1)(x − 3)",
    "answerMath": {
      "latex": "4(x+3)(2x+1)(x-3)",
      "fallback": "4(x + 3)(2x + 1)(x − 3)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(v); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-2-q2-vi",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra — GCD and LCM of Polynomials"
    },
    "label": {
      "en": "Exercise 3.2 · Q2(vi)",
      "ta": "Exercise 3.2 · Q2(vi) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the LCM of (2x² − 3xy)², (4x − 6y)³, and 8x³ − 27y³"
    },
    "q": {
      "en": "Find the LCM of the given expressions. (vi) (2x² − 3xy)², (4x − 6y)³, 8x³ − 27y³"
    },
    "questionMath": {
      "en": [
        "Find the LCM of the given expressions. (vi) ",
        {
          "latex": "(2x^2-3xy)^2,\\;(4x-6y)^3,\\;8x^3-27y^3",
          "fallback": "(2x² − 3xy)², (4x − 6y)³, 8x³ − 27y³",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out x inside the first expression (2x² − 3xy)² and factor out 2 inside the second expression (4x − 6y)³.",
        "eq": "(2x² − 3xy)² = [x(2x − 3y)]² = x²(2x − 3y)²; (4x − 6y)³ = [2(2x − 3y)]³ = 2³(2x − 3y)³",
        "math": {
          "latex": "\\begin{aligned}(2x^2-3xy)^2&=[x(2x-3y)]^2=x^2(2x-3y)^2\\\\(4x-6y)^3&=[2(2x-3y)]^3=2^3(2x-3y)^3\\end{aligned}",
          "fallback": "(2x² − 3xy)² = [x(2x − 3y)]² = x²(2x − 3y)²; (4x − 6y)³ = [2(2x − 3y)]³ = 2³(2x − 3y)³",
          "display": true
        }
      },
      {
        "en": "Factorize the third expression 8x³ − 27y³ = (2x)³ − (3y)³ using the difference of cubes identity a³ − b³ = (a − b)(a² + ab + b²).",
        "eq": "8x³ − 27y³ = (2x − 3y)(4x² + 6xy + 9y²)",
        "math": {
          "latex": "8x^3-27y^3=(2x-3y)(4x^2+6xy+9y^2)",
          "fallback": "8x³ − 27y³ = (2x − 3y)(4x² + 6xy + 9y²)",
          "display": true
        }
      },
      {
        "en": "Take the highest power of every distinct factor across all three expressions: 2³, x², (2x − 3y)³, and (4x² + 6xy + 9y²). Therefore, the LCM is 2³x²(2x − 3y)³(4x² + 6xy + 9y²).",
        "eq": "LCM = 2³x²(2x − 3y)³(4x² + 6xy + 9y²)",
        "math": {
          "latex": "\\text{LCM}=2^3x^2(2x-3y)^3(4x^2+6xy+9y^2)",
          "fallback": "LCM = 2³x²(2x − 3y)³(4x² + 6xy + 9y²)",
          "display": true
        }
      }
    ],
    "answer": "2³x²(2x − 3y)³(4x² + 6xy + 9y²)",
    "answerMath": {
      "latex": "2^3x^2(2x-3y)^3(4x^2+6xy+9y^2)",
      "fallback": "2³x²(2x − 3y)³(4x² + 6xy + 9y²)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.2 Q2(vi); printed p. 97, PDF p. 103; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.2 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
