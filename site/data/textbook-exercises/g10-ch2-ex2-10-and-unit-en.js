/* Grade 10 Ch 2 Ex 2.10 (missing MCQs Q6, Q13, Q15) & Unit Exercise 2 (Q1-Q10)
   source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF pp. 88-89 (printed pp. 82-83), Tamil PDF pp. 88-90 (printed pp. 82-84),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-2-ex2-10-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences — Multiple Choice Questions"
    },
    "label": {
      "en": "Exercise 2.10 · Q6",
      "ta": "Exercise 2.10 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: remainder of 7^(4k) modulo 100"
    },
    "q": {
      "en": "7^{4k} ≡ _____ (mod 100) (A) 1 (B) 2 (C) 3 (D) 4"
    },
    "questionMath": {
      "en": [
        {
          "latex": "7^{4k}\\equiv\\underline{\\hspace{1.2cm}}\\pmod{100}",
          "fallback": "7^{4k} ≡ _____ (mod 100)",
          "display": false
        },
        " (A) 1 (B) 2 (C) 3 (D) 4"
      ]
    },
    "steps": [
      {
        "en": "Evaluate the first four powers of 7 to spot a simple remainder when divided by 100.",
        "eq": "7¹ = 7; 7² = 49; 7³ = 343; 7⁴ = 2401",
        "math": {
          "latex": "7^1=7,\\quad 7^2=49,\\quad 7^3=343,\\quad 7^4=2401",
          "fallback": "7¹ = 7; 7² = 49; 7³ = 343; 7⁴ = 2401",
          "display": true
        }
      },
      {
        "en": "Since 2401 = 24 × 100 + 1, dividing 7⁴ by 100 leaves remainder 1.",
        "eq": "2401 = 24 × 100 + 1 ⇒ 7⁴ ≡ 1 (mod 100)",
        "math": {
          "latex": "2401=24\\times 100+1\\implies 7^4\\equiv 1\\pmod{100}",
          "fallback": "2401 = 24 × 100 + 1 ⇒ 7⁴ ≡ 1 (mod 100)",
          "display": true
        }
      },
      {
        "en": "Raise both sides of the congruence to any positive integer power k.",
        "eq": "7^{4k} = (7⁴)^k ≡ 1^k = 1 (mod 100)",
        "math": {
          "latex": "7^{4k}=(7^4)^k\\equiv 1^k=1\\pmod{100}",
          "fallback": "7^{4k} = (7⁴)^k ≡ 1^k = 1 (mod 100)",
          "display": true
        }
      }
    ],
    "answer": "Option (A): 1.",
    "answerMath": {
      "latex": "\\text{Option (A): }1.",
      "fallback": "Option (A): 1.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.10 Q6; printed p. 82, PDF p. 88; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-10-q13",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences — Multiple Choice Questions"
    },
    "label": {
      "en": "Exercise 2.10 · Q13",
      "ta": "Exercise 2.10 · Q13 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: next term of a geometric sequence"
    },
    "q": {
      "en": "The next term of the sequence 3/16, 1/8, 1/12, 1/18, ... is (A) 1/24 (B) 1/27 (C) 2/3 (D) 1/81"
    },
    "questionMath": {
      "en": [
        "The next term of the sequence ",
        {
          "latex": "\\dfrac{3}{16},\\,\\dfrac{1}{8},\\,\\dfrac{1}{12},\\,\\dfrac{1}{18},\\,\\dots",
          "fallback": "3/16, 1/8, 1/12, 1/18, ...",
          "display": false
        },
        " is (A) ",
        {
          "latex": "\\dfrac{1}{24}",
          "fallback": "1/24",
          "display": false
        },
        " (B) ",
        {
          "latex": "\\dfrac{1}{27}",
          "fallback": "1/27",
          "display": false
        },
        " (C) ",
        {
          "latex": "\\dfrac{2}{3}",
          "fallback": "2/3",
          "display": false
        },
        " (D) ",
        {
          "latex": "\\dfrac{1}{81}",
          "fallback": "1/81",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Divide the second term by the first term to find the ratio between consecutive terms.",
        "eq": "r = (1/8) ÷ (3/16) = (1/8) × (16/3) = 2/3",
        "math": {
          "latex": "r=\\dfrac{1/8}{3/16}=\\dfrac{1}{8}\\times\\dfrac{16}{3}=\\dfrac{2}{3}",
          "fallback": "r = (1/8) ÷ (3/16) = (1/8) × (16/3) = 2/3",
          "display": true
        }
      },
      {
        "en": "Verify that multiplying by 2/3 generates the third and fourth terms, confirming a Geometric Progression (G.P.).",
        "eq": "(1/8) × (2/3) = 1/12; (1/12) × (2/3) = 1/18",
        "math": {
          "latex": "\\dfrac{1}{8}\\times\\dfrac{2}{3}=\\dfrac{1}{12},\\quad \\dfrac{1}{12}\\times\\dfrac{2}{3}=\\dfrac{1}{18}",
          "fallback": "(1/8) × (2/3) = 1/12; (1/12) × (2/3) = 1/18",
          "display": true
        }
      },
      {
        "en": "Multiply the fourth term 1/18 by the common ratio 2/3 to obtain the next term.",
        "eq": "t₅ = (1/18) × (2/3) = 2/54 = 1/27",
        "math": {
          "latex": "t_5=\\dfrac{1}{18}\\times\\dfrac{2}{3}=\\dfrac{2}{54}=\\dfrac{1}{27}",
          "fallback": "t₅ = (1/18) × (2/3) = 2/54 = 1/27",
          "display": true
        }
      }
    ],
    "answer": "Option (B): 1/27.",
    "answerMath": {
      "latex": "\\text{Option (B): }\\dfrac{1}{27}.",
      "fallback": "Option (B): 1/27.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.10 Q13; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-10-q15",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences — Multiple Choice Questions"
    },
    "label": {
      "en": "Exercise 2.10 · Q15",
      "ta": "Exercise 2.10 · Q15 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: difference of sum of cubes and sum of naturals"
    },
    "q": {
      "en": "The value of (1³ + 2³ + 3³ + ... + 15³) − (1 + 2 + 3 + ... + 15) is (A) 14400 (B) 14200 (C) 14280 (D) 14520"
    },
    "questionMath": {
      "en": [
        "The value of ",
        {
          "latex": "(1^3+2^3+3^3+\\dots+15^3)-(1+2+3+\\dots+15)",
          "fallback": "(1³ + 2³ + 3³ + ... + 15³) − (1 + 2 + 3 + ... + 15)",
          "display": false
        },
        " is (A) 14400 (B) 14200 (C) 14280 (D) 14520"
      ]
    },
    "steps": [
      {
        "en": "First evaluate the sum of the first 15 natural numbers using n(n + 1)/2 with n = 15.",
        "eq": "1 + 2 + 3 + ... + 15 = (15 × 16) / 2 = 120",
        "math": {
          "latex": "1+2+3+\\dots+15=\\dfrac{15\\times 16}{2}=120",
          "fallback": "1 + 2 + 3 + ... + 15 = (15 × 16) / 2 = 120",
          "display": true
        }
      },
      {
        "en": "Use the sum-of-cubes identity 1³ + 2³ + ... + n³ = [n(n + 1)/2]² = 120².",
        "eq": "1³ + 2³ + 3³ + ... + 15³ = 120² = 14400",
        "math": {
          "latex": "1^3+2^3+3^3+\\dots+15^3=120^2=14400",
          "fallback": "1³ + 2³ + 3³ + ... + 15³ = 120² = 14400",
          "display": true
        }
      },
      {
        "en": "Subtract the natural-number sum from the cube sum.",
        "eq": "14400 − 120 = 14280",
        "math": {
          "latex": "14400-120=14280",
          "fallback": "14400 − 120 = 14280",
          "display": true
        }
      }
    ],
    "answer": "Option (C): 14280.",
    "answerMath": {
      "latex": "\\text{Option (C): }14280.",
      "fallback": "Option (C): 14280.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.10 Q15; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q1",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q1",
      "ta": "Unit Exercise 2 · Q1 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Divisibility of n² − n by 2"
    },
    "q": {
      "en": "Prove that n² − n divisible by 2 for every positive integer n."
    },
    "questionMath": {
      "en": [
        "Prove that ",
        {
          "latex": "n^2-n",
          "fallback": "n² − n",
          "display": false
        },
        " divisible by 2 for every positive integer ",
        {
          "latex": "n.",
          "fallback": "n.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor n² − n into the product of two consecutive integers.",
        "eq": "n² − n = n(n − 1)",
        "math": {
          "latex": "n^2-n=n(n-1)",
          "fallback": "n² − n = n(n − 1)",
          "display": true
        }
      },
      {
        "en": "By Euclid's division lemma with divisor 2, every positive integer n has remainder 0 or 1, so n = 2q (even) or n = 2q + 1 (odd).",
        "eq": "n = 2q or n = 2q + 1",
        "math": {
          "latex": "n=2q\\quad\\text{or}\\quad n=2q+1",
          "fallback": "n = 2q or n = 2q + 1",
          "display": true
        }
      },
      {
        "en": "Case 1 (n = 2q): substitute n = 2q into n(n − 1). Since 2 is an explicit factor, the product is divisible by 2.",
        "eq": "n² − n = 2q(2q − 1) = 2[q(2q − 1)]",
        "math": {
          "latex": "n^2-n=2q(2q-1)=2\\bigl[q(2q-1)\\bigr]",
          "fallback": "n² − n = 2q(2q − 1) = 2[q(2q − 1)]",
          "display": true
        }
      },
      {
        "en": "Case 2 (n = 2q + 1): then n − 1 = 2q, so the product again contains the factor 2 and is divisible by 2.",
        "eq": "n² − n = (2q + 1)(2q) = 2[q(2q + 1)]",
        "math": {
          "latex": "n^2-n=(2q+1)(2q)=2\\bigl[q(2q+1)\\bigr]",
          "fallback": "n² − n = (2q + 1)(2q) = 2[q(2q + 1)]",
          "display": true
        }
      }
    ],
    "answer": "In both cases n² − n = n(n − 1) is a multiple of 2; hence proved.",
    "answerMath": {
      "latex": "n^2-n=n(n-1)\\text{ is divisible by }2\\text{ for every }n\\in\\mathbb{N}.",
      "fallback": "In both cases n² − n = n(n − 1) is a multiple of 2; hence proved.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q1; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q2-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q2(i)",
      "ta": "Unit Exercise 2 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Maximum capacity of each milk can (HCF)"
    },
    "q": {
      "en": "A milk man has 175 litres of cow’s milk and 105 litres of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (i) Capacity of a can"
    },
    "questionMath": {
      "en": [
        "A milk man has ",
        {
          "latex": "175\\text{ litres}",
          "fallback": "175 litres",
          "display": false
        },
        " of cow’s milk and ",
        {
          "latex": "105\\text{ litres}",
          "fallback": "105 litres",
          "display": false
        },
        " of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (i) Capacity of a can"
      ]
    },
    "steps": [
      {
        "en": "The Tamil edition asks for the greatest capacity. The English wording permits smaller equal capacities as well. Find the greatest one by the Euclidean algorithm.",
        "eq": "175 = 105 × 1 + 70",
        "math": {
          "latex": "175=105\\times 1+70",
          "fallback": "175 = 105 × 1 + 70",
          "display": true
        }
      },
      {
        "en": "Divide the divisor 105 by the remainder 70.",
        "eq": "105 = 70 × 1 + 35",
        "math": {
          "latex": "105=70\\times 1+35",
          "fallback": "105 = 70 × 1 + 35",
          "display": true
        }
      },
      {
        "en": "Divide 70 by 35. Since the remainder becomes 0, the last divisor 35 is the HCF.",
        "eq": "70 = 35 × 2 + 0 ⇒ HCF(175, 105) = 35 litres",
        "math": {
          "latex": "70=35\\times 2+0\\implies \\operatorname{HCF}(175,105)=35\\text{ litres}",
          "fallback": "70 = 35 × 2 + 0 ⇒ HCF(175, 105) = 35 litres",
          "display": true
        }
      },
      {
        "en": "Let p and q be the numbers of full cans used for cow’s and buffalo’s milk. Their ratio is 175:105 = 5:3, so p = 5k and q = 3k for a positive whole number k. In either case each can holds 35/k litres. The largest capacity is reached at k = 1.",
        "eq": "p/q = 5/3 ⇒ (p, q) = (5k, 3k), k ≥ 1; capacity = 35/k litres",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{p}{q}&=\\dfrac{175}{105}=\\dfrac53\\\\(p,q)&=(5k,3k),\\quad k\\in\\mathbb N,\\ k\\ge 1\\\\c&=\\dfrac{175}{5k}=\\dfrac{35}{k}\\end{aligned}",
          "fallback": "p/q = 5/3 ⇒ (p, q) = (5k, 3k), k ≥ 1; capacity = 35/k litres",
          "display": true
        }
      }
    ],
    "answer": "Greatest capacity: 35 litres. With only an equal-capacity condition, each can can hold 35/k litres for any positive integer k.",
    "answerMath": {
      "latex": "\\begin{gathered}c_{\\max}=35\\,\\mathrm L\\\\c=\\dfrac{35}{k}\\,\\mathrm L,\\quad k\\in\\mathbb N,\\ k\\ge 1\\end{gathered}",
      "fallback": "Greatest capacity: 35 litres. With only an equal-capacity condition, each can can hold 35/k litres for any positive integer k.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q2(i); printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q2-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q2(ii)",
      "ta": "Unit Exercise 2 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Number of cans of cow's milk"
    },
    "q": {
      "en": "A milk man has 175 litres of cow’s milk and 105 litres of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (ii) Number of cans of cow’s milk"
    },
    "questionMath": {
      "en": [
        "A milk man has ",
        {
          "latex": "175\\text{ litres}",
          "fallback": "175 litres",
          "display": false
        },
        " of cow’s milk and ",
        {
          "latex": "105\\text{ litres}",
          "fallback": "105 litres",
          "display": false
        },
        " of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (ii) Number of cans of cow’s milk"
      ]
    },
    "steps": [
      {
        "en": "Use the greatest capacity from part (i), as requested in the Tamil edition.",
        "eq": "Capacity of one can = 35 litres",
        "math": {
          "latex": "\\text{Capacity of one can}=35\\text{ litres}",
          "fallback": "Capacity of one can = 35 litres",
          "display": true
        }
      },
      {
        "en": "Divide the total volume of cow's milk (175 litres) by the capacity of one can (35 litres).",
        "eq": "Number of cans of cow's milk = 175 / 35 = 5",
        "math": {
          "latex": "\\text{Number of cans of cow's milk}=\\dfrac{175}{35}=5",
          "fallback": "Number of cans of cow's milk = 175 / 35 = 5",
          "display": true
        }
      },
      {
        "en": "Under the English equal-capacity wording, a can could hold 35/k litres. Dividing 175 litres by that capacity gives 5k cans.",
        "eq": "175/(35/k) = 5k, k ≥ 1",
        "math": {
          "latex": "\\dfrac{175}{35/k}=5k,\\quad k\\in\\mathbb N,\\ k\\ge 1",
          "fallback": "175/(35/k) = 5k, k ≥ 1",
          "display": true
        }
      }
    ],
    "answer": "5 cans at the greatest capacity. For capacity 35/k litres, the count is 5k.",
    "answerMath": {
      "latex": "\\begin{gathered}c=35\\,\\mathrm L\\implies 5\\text{ cans}\\\\c=\\dfrac{35}{k}\\,\\mathrm L\\implies 5k\\text{ cans}\\end{gathered}",
      "fallback": "5 cans at the greatest capacity. For capacity 35/k litres, the count is 5k.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q2(ii); printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q2-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q2(iii)",
      "ta": "Unit Exercise 2 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Number of cans of buffalo's milk"
    },
    "q": {
      "en": "A milk man has 175 litres of cow’s milk and 105 litres of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (iii) Number of cans of buffalow’s milk."
    },
    "questionMath": {
      "en": [
        "A milk man has ",
        {
          "latex": "175\\text{ litres}",
          "fallback": "175 litres",
          "display": false
        },
        " of cow’s milk and ",
        {
          "latex": "105\\text{ litres}",
          "fallback": "105 litres",
          "display": false
        },
        " of buffalow’s milk. He wishes to sell the milk by filling the two types of milk in cans of equal capacity. Calculate the following (iii) Number of cans of buffalow’s milk."
      ]
    },
    "steps": [
      {
        "en": "Use the greatest capacity from part (i), as requested in the Tamil edition.",
        "eq": "Capacity of one can = 35 litres",
        "math": {
          "latex": "\\text{Capacity of one can}=35\\text{ litres}",
          "fallback": "Capacity of one can = 35 litres",
          "display": true
        }
      },
      {
        "en": "Divide the total volume of buffalo's milk (105 litres) by the capacity of one can (35 litres).",
        "eq": "Number of cans of buffalo's milk = 105 / 35 = 3",
        "math": {
          "latex": "\\text{Number of cans of buffalo's milk}=\\dfrac{105}{35}=3",
          "fallback": "Number of cans of buffalo's milk = 105 / 35 = 3",
          "display": true
        }
      },
      {
        "en": "Under the English equal-capacity wording, a can could hold 35/k litres. Dividing 105 litres by that capacity gives 3k cans.",
        "eq": "105/(35/k) = 3k, k ≥ 1",
        "math": {
          "latex": "\\dfrac{105}{35/k}=3k,\\quad k\\in\\mathbb N,\\ k\\ge 1",
          "fallback": "105/(35/k) = 3k, k ≥ 1",
          "display": true
        }
      }
    ],
    "answer": "3 cans at the greatest capacity. For capacity 35/k litres, the count is 3k.",
    "answerMath": {
      "latex": "\\begin{gathered}c=35\\,\\mathrm L\\implies 3\\text{ cans}\\\\c=\\dfrac{35}{k}\\,\\mathrm L\\implies 3k\\text{ cans}\\end{gathered}",
      "fallback": "3 cans at the greatest capacity. For capacity 35/k litres, the count is 3k.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q2(iii); printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q3",
      "ta": "Unit Exercise 2 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Remainder of a + 2b + 3c when divided by 13"
    },
    "q": {
      "en": "When the positive integers a, b and c are divided by 13 the respective remainders are 9, 7 and 10. Find the remainder when a + 2b + 3c is divided by 13."
    },
    "questionMath": {
      "en": [
        "When the positive integers ",
        {
          "latex": "a,\\,b\\text{ and }c",
          "fallback": "a, b and c",
          "display": false
        },
        " are divided by 13 the respective remainders are 9, 7 and 10. Find the remainder when ",
        {
          "latex": "a+2b+3c",
          "fallback": "a + 2b + 3c",
          "display": false
        },
        " is divided by 13."
      ]
    },
    "steps": [
      {
        "en": "By Euclid's division lemma, express a, b, and c in terms of multiples of 13 and their given remainders.",
        "eq": "a = 13p + 9; b = 13q + 7; c = 13r + 10",
        "math": {
          "latex": "a=13p+9,\\quad b=13q+7,\\quad c=13r+10",
          "fallback": "a = 13p + 9; b = 13q + 7; c = 13r + 10",
          "display": true
        }
      },
      {
        "en": "Substitute these expressions into a + 2b + 3c and group the multiples of 13 separately from the remainder sum.",
        "eq": "a + 2b + 3c = 13(p + 2q + 3r) + (9 + 2 × 7 + 3 × 10) = 13(p + 2q + 3r) + 53",
        "math": {
          "latex": "a+2b+3c=13(p+2q+3r)+(9+14+30)=13(p+2q+3r)+53",
          "fallback": "a + 2b + 3c = 13(p + 2q + 3r) + (9 + 2 × 7 + 3 × 10) = 13(p + 2q + 3r) + 53",
          "display": true
        }
      },
      {
        "en": "Divide 53 by 13: since 53 = 13 × 4 + 1, the remainder when a + 2b + 3c is divided by 13 is 1.",
        "eq": "53 = 13 × 4 + 1 ⇒ remainder = 1",
        "math": {
          "latex": "53=13\\times 4+1\\implies \\text{remainder}=1",
          "fallback": "53 = 13 × 4 + 1 ⇒ remainder = 1",
          "display": true
        }
      }
    ],
    "answer": "1.",
    "answerMath": {
      "latex": "1.",
      "fallback": "1.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q3; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q4",
      "ta": "Unit Exercise 2 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Express 107 in the form 4q + 3"
    },
    "q": {
      "en": "Show that 107 is of the form 4q + 3 for any integer q."
    },
    "questionMath": {
      "en": [
        "Show that 107 is of the form ",
        {
          "latex": "4q+3",
          "fallback": "4q + 3",
          "display": false
        },
        " for any integer ",
        {
          "latex": "q.",
          "fallback": "q.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Apply Euclid's division lemma a = bq + r (0 ≤ r < b) to divide a = 107 by b = 4.",
        "eq": "107 ÷ 4 gives quotient q = 26 and remainder r = 3",
        "math": {
          "latex": "107=4\\times 26+3",
          "fallback": "107 ÷ 4 gives quotient q = 26 and remainder r = 3",
          "display": true
        }
      },
      {
        "en": "Since q = 26 is an integer and the remainder is 3, 107 is of the form 4q + 3.",
        "eq": "107 = 4q + 3 where q = 26 ∈ ℤ",
        "math": {
          "latex": "107=4q+3\\quad(\\text{where }q=26\\in\\mathbb{Z})",
          "fallback": "107 = 4q + 3 where q = 26 ∈ ℤ",
          "display": true
        }
      }
    ],
    "answer": "107 = 4(26) + 3, which is of the form 4q + 3 with integer q = 26.",
    "answerMath": {
      "latex": "107=4(26)+3=4q+3\\quad(q=26\\in\\mathbb{Z}).",
      "fallback": "107 = 4(26) + 3, which is of the form 4q + 3 with integer q = 26.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q4; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q5",
      "ta": "Unit Exercise 2 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Prove the (3m + 1)th A.P. term is twice the (m + n + 1)th term"
    },
    "q": {
      "en": "If (m + 1)th term of an A.P. is twice the (n + 1)th term, then prove that (3m + 1)th term is twice the (m + n + 1)th term."
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "(m+1)^{\\text{th}}",
          "fallback": "(m + 1)th",
          "display": false
        },
        " term of an A.P. is twice the ",
        {
          "latex": "(n+1)^{\\text{th}}",
          "fallback": "(n + 1)th",
          "display": false
        },
        " term, then prove that ",
        {
          "latex": "(3m+1)^{\\text{th}}",
          "fallback": "(3m + 1)th",
          "display": false
        },
        " term is twice the ",
        {
          "latex": "(m+n+1)^{\\text{th}}",
          "fallback": "(m + n + 1)th",
          "display": false
        },
        " term."
      ]
    },
    "steps": [
      {
        "en": "Let the A.P. have first term a and common difference d, so tₖ = a + (k − 1)d. Write the given condition t_{m+1} = 2t_{n+1}.",
        "eq": "a + md = 2(a + nd) = 2a + 2nd",
        "math": {
          "latex": "t_{m+1}=2t_{n+1}\\implies a+md=2(a+nd)=2a+2nd",
          "fallback": "a + md = 2(a + nd) = 2a + 2nd",
          "display": true
        }
      },
      {
        "en": "Solve this relation for the first term a in terms of d.",
        "eq": "a = (m − 2n)d",
        "math": {
          "latex": "a=(m-2n)d",
          "fallback": "a = (m − 2n)d",
          "display": true
        }
      },
      {
        "en": "Substitute a = (m − 2n)d into the (3m + 1)th term t_{3m+1} = a + 3md.",
        "eq": "t_{3m+1} = (m − 2n)d + 3md = (4m − 2n)d = 2(2m − n)d",
        "math": {
          "latex": "t_{3m+1}=a+3md=(m-2n)d+3md=(4m-2n)d=2(2m-n)d",
          "fallback": "t_{3m+1} = (m − 2n)d + 3md = (4m − 2n)d = 2(2m − n)d",
          "display": true
        }
      },
      {
        "en": "Now compute the (m + n + 1)th term t_{m+n+1} = a + (m + n)d and compare.",
        "eq": "t_{m+n+1} = (m − 2n)d + (m + n)d = (2m − n)d ⇒ t_{3m+1} = 2t_{m+n+1}",
        "math": {
          "latex": "t_{m+n+1}=(m-2n)d+(m+n)d=(2m-n)d\\implies t_{3m+1}=2t_{m+n+1}",
          "fallback": "t_{m+n+1} = (m − 2n)d + (m + n)d = (2m − n)d ⇒ t_{3m+1} = 2t_{m+n+1}",
          "display": true
        }
      }
    ],
    "answer": "t_{3m+1} = 2(2m − n)d = 2t_{m+n+1}; hence proved.",
    "answerMath": {
      "latex": "t_{3m+1}=2(2m-n)d=2t_{m+n+1}.",
      "fallback": "t_{3m+1} = 2(2m − n)d = 2t_{m+n+1}; hence proved.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q5; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q6",
      "ta": "Unit Exercise 2 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the 12th term from the last term of an A.P."
    },
    "q": {
      "en": "Find the 12th term from the last term of the A. P −2, −4, −6, ... −100."
    },
    "questionMath": {
      "en": [
        "Find the ",
        {
          "latex": "12^{\\text{th}}",
          "fallback": "12th",
          "display": false
        },
        " term from the last term of the A. P ",
        {
          "latex": "-2,\\,-4,\\,-6,\\,\\dots\\,-100.",
          "fallback": "−2, −4, −6, ... −100.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Identify the first term a, common difference d, and last term l of the given A.P.",
        "eq": "a = −2; d = −4 − (−2) = −2; l = −100",
        "math": {
          "latex": "a=-2,\\quad d=-4-(-2)=-2,\\quad l=-100",
          "fallback": "a = −2; d = −4 − (−2) = −2; l = −100",
          "display": true
        }
      },
      {
        "en": "The kth term from the last term l of an A.P. is given by l − (k − 1)d.",
        "eq": "t₁₂ from last = l − (12 − 1)d = l − 11d",
        "math": {
          "latex": "\\text{12th term from last}=l-(12-1)d=l-11d",
          "fallback": "t₁₂ from last = l − (12 − 1)d = l − 11d",
          "display": true
        }
      },
      {
        "en": "Substitute l = −100 and d = −2.",
        "eq": "−100 − 11(−2) = −100 + 22 = −78",
        "math": {
          "latex": "-100-11(-2)=-100+22=-78",
          "fallback": "−100 − 11(−2) = −100 + 22 = −78",
          "display": true
        }
      }
    ],
    "answer": "−78.",
    "answerMath": {
      "latex": "-78.",
      "fallback": "−78.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q6; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q7",
      "ta": "Unit Exercise 2 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Constant difference between corresponding terms of two A.P.s"
    },
    "q": {
      "en": "Two A.P.’s have the same common difference. The first term of one A.P. is 2 and that of the other is 7. Show that the difference between their 10th terms is the same as the difference between their 21st terms, which is the same as the difference between any two corresponding terms."
    },
    "questionMath": {
      "en": [
        "Two A.P.’s have the same common difference. The first term of one A.P. is 2 and that of the other is 7. Show that the difference between their ",
        {
          "latex": "10^{\\text{th}}",
          "fallback": "10th",
          "display": false
        },
        " terms is the same as the difference between their ",
        {
          "latex": "21^{\\text{st}}",
          "fallback": "21st",
          "display": false
        },
        " terms, which is the same as the difference between any two corresponding terms."
      ]
    },
    "steps": [
      {
        "en": "Let the two A.P.s have first terms a₁ = 2 and b₁ = 7, and let their common difference be d. Write their nth terms tₙ and Tₙ.",
        "eq": "tₙ = 2 + (n − 1)d; Tₙ = 7 + (n − 1)d",
        "math": {
          "latex": "t_n=2+(n-1)d,\\quad T_n=7+(n-1)d",
          "fallback": "tₙ = 2 + (n − 1)d; Tₙ = 7 + (n − 1)d",
          "display": true
        }
      },
      {
        "en": "Find the difference between their 10th terms (n = 10).",
        "eq": "T₁₀ − t₁₀ = (7 + 9d) − (2 + 9d) = 5",
        "math": {
          "latex": "T_{10}-t_{10}=(7+9d)-(2+9d)=5",
          "fallback": "T₁₀ − t₁₀ = (7 + 9d) − (2 + 9d) = 5",
          "display": true
        }
      },
      {
        "en": "Find the difference between their 21st terms (n = 21).",
        "eq": "T₂₁ − t₂₁ = (7 + 20d) − (2 + 20d) = 5",
        "math": {
          "latex": "T_{21}-t_{21}=(7+20d)-(2+20d)=5",
          "fallback": "T₂₁ − t₂₁ = (7 + 20d) − (2 + 20d) = 5",
          "display": true
        }
      },
      {
        "en": "Find the difference between any two corresponding nth terms: the (n − 1)d parts cancel, leaving the constant difference 5.",
        "eq": "Tₙ − tₙ = [7 + (n − 1)d] − [2 + (n − 1)d] = 7 − 2 = 5",
        "math": {
          "latex": "T_n-t_n=\\bigl[7+(n-1)d\\bigr]-\\bigl[2+(n-1)d\\bigr]=7-2=5",
          "fallback": "Tₙ − tₙ = [7 + (n − 1)d] − [2 + (n − 1)d] = 7 − 2 = 5",
          "display": true
        }
      }
    ],
    "answer": "T₁₀ − t₁₀ = T₂₁ − t₂₁ = Tₙ − tₙ = 5 (or tₙ − Tₙ = −5); hence proved.",
    "answerMath": {
      "latex": "T_{10}-t_{10}=T_{21}-t_{21}=T_n-t_n=5.",
      "fallback": "T₁₀ − t₁₀ = T₂₁ − t₂₁ = Tₙ − tₙ = 5 (or tₙ − Tₙ = −5); hence proved.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q7; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q8",
      "ta": "Unit Exercise 2 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "First year's savings from 10-year arithmetic total"
    },
    "q": {
      "en": "A man saved ₹16500 in ten years. In each year after the first he saved ₹100 more than he did in the preceding year. How much did he save in the first year?"
    },
    "questionMath": {
      "en": [
        "A man saved ",
        {
          "latex": "\\text{Rs. }16500",
          "fallback": "₹16500",
          "display": false
        },
        " in ten years. In each year after the first he saved ",
        {
          "latex": "\\text{Rs. }100",
          "fallback": "₹100",
          "display": false
        },
        " more than he did in the preceding year. How much did he save in the first year?"
      ]
    },
    "steps": [
      {
        "en": "Let the savings in the first year be ₹a. Since each year's savings increases by ₹100, the yearly savings form an A.P. with common difference d = 100, n = 10, and S₁₀ = 16500.",
        "eq": "n = 10; d = 100; S₁₀ = 16500",
        "math": {
          "latex": "n=10,\\quad d=100,\\quad S_{10}=16500",
          "fallback": "n = 10; d = 100; S₁₀ = 16500",
          "display": true
        }
      },
      {
        "en": "Substitute these values into the A.P. sum formula Sₙ = (n/2)[2a + (n − 1)d].",
        "eq": "16500 = (10 / 2)[2a + (10 − 1) × 100] = 5(2a + 900)",
        "math": {
          "latex": "16500=\\dfrac{10}{2}\\bigl[2a+(10-1)\\times 100\\bigr]=5(2a+900)",
          "fallback": "16500 = (10 / 2)[2a + (10 − 1) × 100] = 5(2a + 900)",
          "display": true
        }
      },
      {
        "en": "Divide both sides by 5 and solve for a.",
        "eq": "3300 = 2a + 900 ⇒ 2a = 2400 ⇒ a = 1200",
        "math": {
          "latex": "3300=2a+900\\implies 2a=2400\\implies a=1200",
          "fallback": "3300 = 2a + 900 ⇒ 2a = 2400 ⇒ a = 1200",
          "display": true
        }
      }
    ],
    "answer": "₹1200.",
    "answerMath": {
      "latex": "\\text{Rs. }1200.",
      "fallback": "₹1200.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q8; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q9",
      "ta": "Unit Exercise 2 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the G.P. from its 2nd and 6th terms"
    },
    "q": {
      "en": "Find the G.P. in which the 2nd term is √6 and the 6th term is 9√6."
    },
    "questionMath": {
      "en": [
        "Find the G.P. in which the ",
        {
          "latex": "2^{\\text{nd}}",
          "fallback": "2nd",
          "display": false
        },
        " term is ",
        {
          "latex": "\\sqrt{6}",
          "fallback": "√6",
          "display": false
        },
        " and the ",
        {
          "latex": "6^{\\text{th}}",
          "fallback": "6th",
          "display": false
        },
        " term is ",
        {
          "latex": "9\\sqrt{6}.",
          "fallback": "9√6.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the 2nd and 6th terms of the G.P. using tₙ = ar^{n−1}.",
        "eq": "t₂ = ar = √6; t₆ = ar⁵ = 9√6",
        "math": {
          "latex": "t_2=ar=\\sqrt{6},\\quad t_6=ar^5=9\\sqrt{6}",
          "fallback": "t₂ = ar = √6; t₆ = ar⁵ = 9√6",
          "display": true
        }
      },
      {
        "en": "Divide t₆ by t₂ to find the common ratio r.",
        "eq": "ar⁵ / (ar) = (9√6) / √6 ⇒ r⁴ = 9 = (√3)⁴ ⇒ r = √3",
        "math": {
          "latex": "\\dfrac{ar^5}{ar}=\\dfrac{9\\sqrt{6}}{\\sqrt{6}}\\implies r^4=9=(\\sqrt{3})^4\\implies r=\\sqrt{3}",
          "fallback": "ar⁵ / (ar) = (9√6) / √6 ⇒ r⁴ = 9 = (√3)⁴ ⇒ r = √3",
          "display": true
        }
      },
      {
        "en": "Substitute r = √3 into ar = √6 to find the first term a.",
        "eq": "a = √6 / √3 = √2",
        "math": {
          "latex": "a=\\dfrac{\\sqrt{6}}{\\sqrt{3}}=\\sqrt{2}",
          "fallback": "a = √6 / √3 = √2",
          "display": true
        }
      },
      {
        "en": "List the consecutive terms a, ar, ar², ar³, ... of the G.P.",
        "eq": "√2, √6, 3√2, 3√6, ...",
        "math": {
          "latex": "\\sqrt{2},\\,\\sqrt{6},\\,3\\sqrt{2},\\,3\\sqrt{6},\\,\\dots",
          "fallback": "√2, √6, 3√2, 3√6, ...",
          "display": true
        }
      }
    ],
    "answer": "√2, √6, 3√2, 3√6, ...",
    "answerMath": {
      "latex": "\\sqrt{2},\\,\\sqrt{6},\\,3\\sqrt{2},\\,3\\sqrt{6},\\,\\dots",
      "fallback": "√2, √6, 3√2, 3√6, ...",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q9; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-unit-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.unit",
    "topic": {
      "en": "Numbers and Sequences — Unit Exercise 2"
    },
    "label": {
      "en": "Unit Exercise 2 · Q10",
      "ta": "Unit Exercise 2 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Depreciated value of a motor cycle after 3 years"
    },
    "q": {
      "en": "The value of a motor cycle depreciates at the rate of 15% per year. What will be the value of the motor cycle 3 year hence, which is now purchased for ₹ 45,000?"
    },
    "questionMath": {
      "en": [
        "The value of a motor cycle depreciates at the rate of ",
        {
          "latex": "15\\%",
          "fallback": "15%",
          "display": false
        },
        " per year. What will be the value of the motor cycle 3 year hence, which is now purchased for ",
        {
          "latex": "\\text{Rs. }45{,}000?",
          "fallback": "₹ 45,000?",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Given initial value P = ₹45,000, annual rate of depreciation r = 15%, and time n = 3 years. Use the compound depreciation formula V = P(1 − r/100)ⁿ.",
        "eq": "V = 45000 × (1 − 15/100)³ = 45000 × (85/100)³",
        "math": {
          "latex": "V=45000\\left(1-\\dfrac{15}{100}\\right)^3=45000\\left(\\dfrac{85}{100}\\right)^3",
          "fallback": "V = 45000 × (1 − 15/100)³ = 45000 × (85/100)³",
          "display": true
        }
      },
      {
        "en": "Expand (85/100)³ = 614125 / 1000000 and multiply by 45000.",
        "eq": "V = 45000 × (85 / 100) × (85 / 100) × (85 / 100) = (45 × 614125) / 1000",
        "math": {
          "latex": "V=45000\\times\\dfrac{85}{100}\\times\\dfrac{85}{100}\\times\\dfrac{85}{100}=\\dfrac{45\\times 614125}{1000}",
          "fallback": "V = 45000 × (85 / 100) × (85 / 100) × (85 / 100) = (45 × 614125) / 1000",
          "display": true
        }
      },
      {
        "en": "Compute 27635625 / 1000 = ₹27,635.625, which rounds to the nearest rupee as ₹27,636.",
        "eq": "V = 27635.625 ≈ ₹27636",
        "math": {
          "latex": "V=27635.625\\approx\\text{Rs. }27636",
          "fallback": "V = 27635.625 ≈ ₹27636",
          "display": true
        }
      }
    ],
    "answer": "₹27636.",
    "answerMath": {
      "latex": "\\text{Rs. }27636.",
      "fallback": "₹27636.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Unit Exercise 2 Q10; printed p. 83, PDF p. 89; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Ch2 Ex 2.10 / Unit Ex 2 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
