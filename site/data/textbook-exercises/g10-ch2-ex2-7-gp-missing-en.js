/* TRACE Grade 10 Exercise 2.7: six missing/exact textbook parts, 2025 English.
 * Original PDF SHA256 602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d.
 * Printed pp. 72–73 (PDF pp. 78–79) and Answer Appendix printed p. 336 (PDF p. 342),
 * independently visually checked.
 * 13 already-present student records remain unchanged.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10], chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Exercise 2.7 source data unavailable');
const entries=[
  {
    "id": "c10-2-ex2-7-q1-v",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(v)",
      "ta": "Exercise 2.7 · Q1(v) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Alternating-sign sequence with constant negative ratio"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (v) 1, −5, 25, −125, …"
    },
    "questionMath": {
      "en": [
        "Which of the following sequences are in G.P.? (v) ",
        {
          "latex": "1, -5, 25, -125, \\dots",
          "fallback": "1, −5, 25, −125, …",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Divide the second term by the first term to find the first consecutive ratio.",
        "eq": "t₂/t₁ = −5/1 = −5",
        "math": {
          "latex": "\\dfrac{t_2}{t_1}=\\dfrac{-5}{1}=-5",
          "fallback": "t₂/t₁ = −5/1 = −5",
          "display": true
        }
      },
      {
        "en": "Check the next two consecutive ratios t₃ / t₂ and t₄ / t₃.",
        "eq": "t₃/t₂ = 25/(−5) = −5; t₄/t₃ = −125/25 = −5",
        "math": {
          "latex": "\\dfrac{t_3}{t_2}=\\dfrac{25}{-5}=-5,\\quad \\dfrac{t_4}{t_3}=\\dfrac{-125}{25}=-5",
          "fallback": "t₃/t₂ = 25/(−5) = −5; t₄/t₃ = −125/25 = −5",
          "display": true
        }
      },
      {
        "en": "Since every consecutive ratio equals −5, the sequence is a G.P. with common ratio r = −5.",
        "eq": "t₂/t₁ = t₃/t₂ = t₄/t₃ = −5 ⇒ G.P. with r = −5",
        "math": {
          "latex": "\\dfrac{t_2}{t_1}=\\dfrac{t_3}{t_2}=\\dfrac{t_4}{t_3}=-5\\implies\\text{G.P. with }r=-5",
          "fallback": "t₂/t₁ = t₃/t₂ = t₄/t₃ = −5 ⇒ G.P. with r = −5",
          "display": true
        }
      }
    ],
    "answer": "Yes, it is in G.P. (with common ratio r = −5).",
    "answerMath": {
      "latex": "\\text{G.P. }(r=-5).",
      "fallback": "Yes, it is in G.P. (with common ratio r = −5).",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q1(v); printed p. 72, PDF p. 78; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-7-q1-vii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(vii)",
      "ta": "Exercise 2.7 · Q1(vii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Dividing by 4 at each step gives a fractional common ratio"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (vii) 16, 4, 1, 1/4, …"
    },
    "questionMath": {
      "en": [
        "Which of the following sequences are in G.P.? (vii) ",
        {
          "latex": "16, 4, 1, \\dfrac{1}{4}, \\dots",
          "fallback": "16, 4, 1, 1/4, …",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Find the ratio of the second term to the first term.",
        "eq": "t₂/t₁ = 4/16 = 1/4",
        "math": {
          "latex": "\\dfrac{t_2}{t_1}=\\dfrac{4}{16}=\\dfrac{1}{4}",
          "fallback": "t₂/t₁ = 4/16 = 1/4",
          "display": true
        }
      },
      {
        "en": "Check the remaining consecutive ratios t₃ / t₂ and t₄ / t₃.",
        "eq": "t₃/t₂ = 1/4; t₄/t₃ = (1/4)/1 = 1/4",
        "math": {
          "latex": "\\dfrac{t_3}{t_2}=\\dfrac{1}{4},\\quad \\dfrac{t_4}{t_3}=\\dfrac{1/4}{1}=\\dfrac{1}{4}",
          "fallback": "t₃/t₂ = 1/4; t₄/t₃ = (1/4)/1 = 1/4",
          "display": true
        }
      },
      {
        "en": "Since all consecutive ratios are equal to 1/4, the sequence is a G.P. with common ratio r = 1/4.",
        "eq": "t₂/t₁ = t₃/t₂ = t₄/t₃ = 1/4 ⇒ G.P. with r = 1/4",
        "math": {
          "latex": "\\dfrac{t_2}{t_1}=\\dfrac{t_3}{t_2}=\\dfrac{t_4}{t_3}=\\dfrac{1}{4}\\implies\\text{G.P. with }r=\\dfrac{1}{4}",
          "fallback": "t₂/t₁ = t₃/t₂ = t₄/t₃ = 1/4 ⇒ G.P. with r = 1/4",
          "display": true
        }
      }
    ],
    "answer": "Yes, it is in G.P. (with common ratio r = 1/4).",
    "answerMath": {
      "latex": "\\text{G.P. }\\left(r=\\dfrac{1}{4}\\right).",
      "fallback": "Yes, it is in G.P. (with common ratio r = 1/4).",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q1(vii); printed p. 72, PDF p. 78; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-7-q2-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q2(ii)",
      "ta": "Exercise 2.7 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "First three G.P. terms with radical first term and ratio"
    },
    "q": {
      "en": "Write the first three terms of the G.P. whose first term and the common ratio are given below: (ii) a = √2, r = √2"
    },
    "questionMath": {
      "en": [
        "Write the first three terms of the G.P. whose first term and the common ratio are given below: (ii) ",
        {
          "latex": "a=\\sqrt{2},\\ r=\\sqrt{2}",
          "fallback": "a = √2, r = √2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The first three terms of a geometric progression are a, ar, and ar².",
        "eq": "t₁ = a = √2",
        "math": {
          "latex": "t_1=a=\\sqrt{2}",
          "fallback": "t₁ = a = √2",
          "display": true
        }
      },
      {
        "en": "Multiply the first term by r = √2 to obtain the second term t₂.",
        "eq": "t₂ = ar = √2 × √2 = 2",
        "math": {
          "latex": "t_2=ar=\\sqrt{2}\\times\\sqrt{2}=2",
          "fallback": "t₂ = ar = √2 × √2 = 2",
          "display": true
        }
      },
      {
        "en": "Multiply the second term by r = √2 to obtain the third term t₃.",
        "eq": "t₃ = ar² = 2 × √2 = 2√2",
        "math": {
          "latex": "t_3=ar^2=2\\times\\sqrt{2}=2\\sqrt{2}",
          "fallback": "t₃ = ar² = 2 × √2 = 2√2",
          "display": true
        }
      }
    ],
    "answer": "√2, 2, 2√2.",
    "answerMath": {
      "latex": "\\sqrt{2},\\ 2,\\ 2\\sqrt{2}.",
      "fallback": "√2, 2, 2√2.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q2(ii); printed p. 72, PDF p. 78; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-7-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q9",
      "ta": "Exercise 2.7 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Three consecutive G.P. terms from product and pairwise products"
    },
    "q": {
      "en": "In a G.P. the product of three consecutive terms is 27 and the sum of the product of two terms taken at a time is 57/2. Find the three terms."
    },
    "questionMath": {
      "en": [
        "In a G.P. the product of three consecutive terms is ",
        {
          "latex": "27",
          "fallback": "27",
          "display": false
        },
        " and the sum of the product of two terms taken at a time is ",
        {
          "latex": "\\dfrac{57}{2}.",
          "fallback": "57/2.",
          "display": false
        },
        " Find the three terms."
      ]
    },
    "steps": [
      {
        "en": "Let the three consecutive terms in G.P. be a/r, a, and ar. Their product is 27, so r cancels immediately.",
        "eq": "(a/r) × a × (ar) = a³ = 27 ⇒ a = 3",
        "math": {
          "latex": "\\dfrac{a}{r}\\cdot a\\cdot ar=a^3=27\\implies a=3",
          "fallback": "(a/r) × a × (ar) = a³ = 27 ⇒ a = 3",
          "display": true
        }
      },
      {
        "en": "Substitute a = 3 into the sum of products taken two at a time: (a/r)(a) + (a)(ar) + (ar)(a/r) = 57/2.",
        "eq": "9/r + 9r + 9 = 57/2 ⇒ 9(1 + r²)/r = 39/2 ⇒ 6r² − 13r + 6 = 0",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{9}{r}+9r+9&=\\dfrac{57}{2}\\\\\\dfrac{9(1+r^2)}{r}&=\\dfrac{39}{2}\\implies 6r^2-13r+6=0\\end{aligned}",
          "fallback": "9/r + 9r + 9 = 57/2 ⇒ 9(1 + r²)/r = 39/2 ⇒ 6r² − 13r + 6 = 0",
          "display": true
        }
      },
      {
        "en": "Factor 6r² − 13r + 6 = (2r − 3)(3r − 2) = 0 to obtain r = 3/2 or r = 2/3, and list the three terms for each ratio.",
        "eq": "(2r − 3)(3r − 2) = 0 ⇒ r = 3/2 or r = 2/3 ⇒ terms: 2, 3, 9/2 or 9/2, 3, 2",
        "math": {
          "latex": "(2r-3)(3r-2)=0\\implies r=\\dfrac{3}{2}\\text{ or }\\dfrac{2}{3}\\implies \\dfrac{9}{2},\\ 3,\\ 2\\text{ or }2,\\ 3,\\ \\dfrac{9}{2}",
          "fallback": "(2r − 3)(3r − 2) = 0 ⇒ r = 3/2 or r = 2/3 ⇒ terms: 2, 3, 9/2 or 9/2, 3, 2",
          "display": true
        }
      }
    ],
    "answer": "9/2, 3, 2 or 2, 3, 9/2.",
    "answerMath": {
      "latex": "\\dfrac{9}{2},\\ 3,\\ 2\\text{ or }2,\\ 3,\\ \\dfrac{9}{2}.",
      "fallback": "9/2, 3, 2 or 2, 3, 9/2.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q9; printed p. 72, PDF p. 78; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-7-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q10",
      "ta": "Exercise 2.7 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Compound annual salary growth using a G.P."
    },
    "q": {
      "en": "A man joined a company as Assistant Manager. The company gave him a starting salary of ₹60,000 and agreed to increase his salary 5% annually. What will be his salary after 5 years?"
    },
    "steps": [
      {
        "en": "The starting salary is a = ₹60,000. A 5% annual increase multiplies each year's salary by the common ratio r = 1 + 5/100 = 1.05.",
        "eq": "a = 60000, r = 1 + 5/100 = 105/100 = 1.05",
        "math": {
          "latex": "a=60000,\\quad r=1+\\dfrac{5}{100}=\\dfrac{105}{100}=1.05",
          "fallback": "a = 60000, r = 1 + 5/100 = 105/100 = 1.05",
          "display": true
        }
      },
      {
        "en": "After 5 years, the salary has received 5 annual increases, which is ar⁵.",
        "eq": "Salary after 5 years = 60000 × (1.05)⁵",
        "math": {
          "latex": "\\text{Salary after }5\\text{ years}=60000\\times(1.05)^5",
          "fallback": "Salary after 5 years = 60000 × (1.05)⁵",
          "display": true
        }
      },
      {
        "en": "Evaluate 60000 × 1.2762815625 = ₹76,576.89 and round to the nearest rupee as in the textbook answer.",
        "eq": "60000 × 1.2762815625 = 76576.89 ≈ ₹76,577",
        "math": {
          "latex": "60000\\times 1.2762815625=76576.89\\approx\\text{Rs. }76,577",
          "fallback": "60000 × 1.2762815625 = 76576.89 ≈ ₹76,577",
          "display": true
        }
      }
    ],
    "answer": "₹76,577.",
    "answerMath": {
      "latex": "\\text{Rs. }76,577.",
      "fallback": "₹76,577.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q10; printed p. 72, PDF p. 78; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-7-q12",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences — Geometric Progression"
    },
    "label": {
      "en": "Exercise 2.7 · Q12",
      "ta": "Exercise 2.7 · Q12 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Combine A.P. differences in exponents with G.P. bases"
    },
    "q": {
      "en": "If a, b, c are three consecutive terms of an A.P. and x, y, z are three consecutive terms of a G.P., then prove that x^(b−c) × y^(c−a) × z^(a−b) = 1."
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "a, b, c",
          "fallback": "a, b, c",
          "display": false
        },
        " are three consecutive terms of an A.P. and ",
        {
          "latex": "x, y, z",
          "fallback": "x, y, z",
          "display": false
        },
        " are three consecutive terms of a G.P., then prove that ",
        {
          "latex": "x^{b-c}\\times y^{c-a}\\times z^{a-b}=1.",
          "fallback": "x^(b−c) × y^(c−a) × z^(a−b) = 1.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Since a, b, c are in A.P. with common difference d, we have b − a = d and c − b = d, which gives b − c = −d, a − b = −d, and c − a = 2d.",
        "eq": "b − c = −d, c − a = 2d, a − b = −d",
        "math": {
          "latex": "b-c=-d,\\quad c-a=2d,\\quad a-b=-d",
          "fallback": "b − c = −d, c − a = 2d, a − b = −d",
          "display": true
        }
      },
      {
        "en": "Since x, y, z are consecutive terms of a G.P., the square of the middle term equals the product of the other two: y² = xz.",
        "eq": "x, y, z in G.P. ⇒ y² = xz",
        "math": {
          "latex": "x, y, z\\text{ in G.P.}\\implies y^2=xz",
          "fallback": "x, y, z in G.P. ⇒ y² = xz",
          "display": true
        }
      },
      {
        "en": "For arbitrary real exponents, assume that x, y and z are positive. Under this condition, substitute the exponent expressions and y² = xz and use the laws of powers.",
        "eq": "x^(−d) × y^(2d) × z^(−d) = (y²/(xz))^d = 1^d = 1",
        "math": {
          "latex": "x^{-d}\\cdot y^{2d}\\cdot z^{-d}=\\left(\\dfrac{y^2}{xz}\\right)^d=1^d=1",
          "fallback": "x^(−d) × y^(2d) × z^(−d) = (y²/(xz))^d = 1^d = 1",
          "display": true
        }
      }
    ],
    "answer": "x^(b−c) × y^(c−a) × z^(a−b) = 1 when x, y, z > 0.",
    "answerMath": {
      "latex": "x^{b-c}\\times y^{c-a}\\times z^{a-b}=1\\quad(x,y,z>0)",
      "fallback": "x^(b−c) × y^(c−a) × z^(a−b) = 1 when x, y, z > 0.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.7 Q12; printed p. 73, PDF p. 79; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 2.7 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
