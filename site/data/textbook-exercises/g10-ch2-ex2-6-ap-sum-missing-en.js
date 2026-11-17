/* TRACE Grade 10 Exercise 2.6: five missing textbook parts, 2025 English.
 * Original PDF SHA256 602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d.
 * Printed p. 67 (PDF p. 73) and Answer Appendix printed p. 336 (PDF p. 342),
 * independently visually checked.
 * 8 already-present student records (covering 11 subparts) remain unchanged.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10], chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Exercise 2.6 source data unavailable');
const entries=[
  {
    "id": "c10-2-ex2-6-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Series"
    },
    "label": {
      "en": "Exercise 2.6 · Q1(iii)",
      "ta": "Exercise 2.6 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of an arithmetic series given its last term"
    },
    "q": {
      "en": "Find the sum of the following: 6 + 13 + 20 + … + 97"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following: ",
        {
          "latex": "6+13+20+\\cdots+97",
          "fallback": "6 + 13 + 20 + … + 97",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Identify the first term a = 6, the common difference d = 13 − 6 = 7, and the last term l = 97.",
        "eq": "a = 6, d = 13 − 6 = 7, l = 97",
        "math": {
          "latex": "a=6,\\quad d=13-6=7,\\quad l=97",
          "fallback": "a = 6, d = 13 − 6 = 7, l = 97",
          "display": true
        }
      },
      {
        "en": "Find the number of terms n in the series using n = ((l − a) / d) + 1.",
        "eq": "n = (97 − 6)/7 + 1 = 91/7 + 1 = 13 + 1 = 14",
        "math": {
          "latex": "n=\\dfrac{97-6}{7}+1=\\dfrac{91}{7}+1=13+1=14",
          "fallback": "n = (97 − 6)/7 + 1 = 91/7 + 1 = 13 + 1 = 14",
          "display": true
        }
      },
      {
        "en": "Substitute n = 14, a = 6, and l = 97 into the first-and-last term sum formula Sₙ = (n / 2)(a + l).",
        "eq": "S₁₄ = (14/2)(6 + 97) = 7 × 103 = 721",
        "math": {
          "latex": "S_{14}=\\dfrac{14}{2}(6+97)=7\\times 103=721",
          "fallback": "S₁₄ = (14/2)(6 + 97) = 7 × 103 = 721",
          "display": true
        }
      }
    ],
    "answer": "721.",
    "answerMath": {
      "latex": "721.",
      "fallback": "721.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.6 Q1(iii); printed p. 67, PDF p. 73; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-6-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Series"
    },
    "label": {
      "en": "Exercise 2.6 · Q3",
      "ta": "Exercise 2.6 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of 28 terms from the nth term formula"
    },
    "q": {
      "en": "Find the sum of first 28 terms of an A.P. whose nth term is 4n − 3."
    },
    "questionMath": {
      "en": [
        "Find the sum of first 28 terms of an A.P. whose ",
        {
          "latex": "n\\text{th}",
          "fallback": "nth",
          "display": false
        },
        " term is ",
        {
          "latex": "4n-3.",
          "fallback": "4n − 3.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Substitute n = 1 into tₙ = 4n − 3 to find the first term a = t₁.",
        "eq": "a = t₁ = 4(1) − 3 = 1",
        "math": {
          "latex": "a=t_1=4(1)-3=1",
          "fallback": "a = t₁ = 4(1) − 3 = 1",
          "display": true
        }
      },
      {
        "en": "Substitute n = 28 into tₙ = 4n − 3 to find the 28th term l = t₂₈.",
        "eq": "l = t₂₈ = 4(28) − 3 = 112 − 3 = 109",
        "math": {
          "latex": "l=t_{28}=4(28)-3=112-3=109",
          "fallback": "l = t₂₈ = 4(28) − 3 = 112 − 3 = 109",
          "display": true
        }
      },
      {
        "en": "Use the arithmetic series sum formula Sₙ = (n / 2)(a + l) for n = 28 terms.",
        "eq": "S₂₈ = (28/2)(1 + 109) = 14 × 110 = 1540",
        "math": {
          "latex": "S_{28}=\\dfrac{28}{2}(1+109)=14\\times 110=1540",
          "fallback": "S₂₈ = (28/2)(1 + 109) = 14 × 110 = 1540",
          "display": true
        }
      }
    ],
    "answer": "1540.",
    "answerMath": {
      "latex": "1540.",
      "fallback": "1540.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.6 Q3; printed p. 67, PDF p. 73; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-6-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Series"
    },
    "label": {
      "en": "Exercise 2.6 · Q4",
      "ta": "Exercise 2.6 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Prove a series is an A.P. from its partial sums"
    },
    "q": {
      "en": "The sum of first n terms of a certain series is given as 2n² − 3n. Show that the series is an A.P."
    },
    "questionMath": {
      "en": [
        "The sum of first ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of a certain series is given as ",
        {
          "latex": "2n^2-3n.",
          "fallback": "2n² − 3n.",
          "display": false
        },
        " Show that the series is an A.P."
      ]
    },
    "steps": [
      {
        "en": "Write the partial sum Sₙ = 2n² − 3n and evaluate S₁ to find the first term t₁.",
        "eq": "Sₙ = 2n² − 3n; t₁ = S₁ = 2(1)² − 3(1) = −1",
        "math": {
          "latex": "S_n=2n^2-3n,\\quad t_1=S_1=2(1)^2-3(1)=-1",
          "fallback": "Sₙ = 2n² − 3n; t₁ = S₁ = 2(1)² − 3(1) = −1",
          "display": true
        }
      },
      {
        "en": "For every integer n ≥ 2, recover the nth term using tₙ = Sₙ − Sₙ₋₁ (which also gives t₁ = −1 when n = 1).",
        "eq": "tₙ = (2n² − 3n) − [2(n − 1)² − 3(n − 1)] = 4n − 5",
        "math": {
          "latex": "\\begin{aligned}t_n&=(2n^2-3n)-\\bigl[2(n-1)^2-3(n-1)\\bigr]\\\\&=4n-5\\end{aligned}",
          "fallback": "tₙ = (2n² − 3n) − [2(n − 1)² − 3(n − 1)] = 4n − 5",
          "display": true
        }
      },
      {
        "en": "Compute the difference between consecutive terms tₙ₊₁ − tₙ. Since the difference is the constant 4 for all n ≥ 1, the series is an A.P.",
        "eq": "tₙ₊₁ − tₙ = [4(n + 1) − 5] − (4n − 5) = 4 (constant)",
        "math": {
          "latex": "t_{n+1}-t_n=\\bigl[4(n+1)-5\\bigr]-(4n-5)=4\\text{ (constant)}",
          "fallback": "tₙ₊₁ − tₙ = [4(n + 1) − 5] − (4n − 5) = 4 (constant)",
          "display": true
        }
      }
    ],
    "answer": "Since tₙ = 4n − 5 and tₙ₊₁ − tₙ = 4 is constant, the series is an A.P. with a = −1 and d = 4.",
    "answerMath": {
      "latex": "t_n=4n-5,\\quad t_{n+1}-t_n=4\\text{ (constant A.P. with }a=-1,\\ d=4\\text{)}.",
      "fallback": "Since tₙ = 4n − 5 and tₙ₊₁ − tₙ = 4 is constant, the series is an A.P. with a = −1 and d = 4.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.6 Q4; printed p. 67, PDF p. 73; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-6-q11",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Series"
    },
    "label": {
      "en": "Exercise 2.6 · Q11",
      "ta": "Exercise 2.6 · Q11 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of n-term sums across m arithmetic progressions"
    },
    "q": {
      "en": "If S₁, S₂, S₃, …, Sₘ are the sums of n terms of m A.P.'s whose first terms are 1, 2, 3, …, m and whose common differences are 1, 3, 5, …, (2m − 1) respectively, then show that S₁ + S₂ + S₃ + … + Sₘ = ½ mn(mn + 1)."
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "S_1, S_2, S_3, \\dots, S_m",
          "fallback": "S₁, S₂, S₃, …, Sₘ",
          "display": false
        },
        " are the sums of ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of ",
        {
          "latex": "m",
          "fallback": "m",
          "display": false
        },
        " A.P.'s whose first terms are ",
        {
          "latex": "1, 2, 3, \\dots, m",
          "fallback": "1, 2, 3, …, m",
          "display": false
        },
        " and whose common differences are ",
        {
          "latex": "1, 3, 5, \\dots, (2m-1)",
          "fallback": "1, 3, 5, …, (2m − 1)",
          "display": false
        },
        " respectively, then show that ",
        {
          "latex": "S_1+S_2+S_3+\\cdots+S_m=\\dfrac{1}{2}mn(mn+1).",
          "fallback": "S₁ + S₂ + S₃ + … + Sₘ = ½ mn(mn + 1).",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "For the kth A.P. (where k = 1, 2, …, m), the first term is aₖ = k and the common difference is dₖ = 2k − 1. Write its n-term sum Sₖ.",
        "eq": "Sₖ = (n/2)[2k + (n − 1)(2k − 1)] = (n/2)[2nk − (n − 1)]",
        "math": {
          "latex": "\\begin{aligned}S_k&=\\dfrac{n}{2}\\bigl[2k+(n-1)(2k-1)\\bigr]\\\\&=\\dfrac{n}{2}\\bigl[2nk-(n-1)\\bigr]\\end{aligned}",
          "fallback": "Sₖ = (n/2)[2k + (n − 1)(2k − 1)] = (n/2)[2nk − (n − 1)]",
          "display": true
        }
      },
      {
        "en": "Evaluate the first and mth sums: S₁ = (n/2)[n + 1] and Sₘ = (n/2)[2mn − n + 1]. Because Sₖ is linear in k, S₁, S₂, …, Sₘ themselves form an m-term A.P.",
        "eq": "S₁ = (n/2)(n + 1); Sₘ = (n/2)(2mn − n + 1)",
        "math": {
          "latex": "S_1=\\dfrac{n}{2}(n+1),\\quad S_m=\\dfrac{n}{2}(2mn-n+1)",
          "fallback": "S₁ = (n/2)(n + 1); Sₘ = (n/2)(2mn − n + 1)",
          "display": true
        }
      },
      {
        "en": "Sum the m terms from S₁ to Sₘ using (m / 2)(S₁ + Sₘ) and simplify.",
        "eq": "S₁ + S₂ + … + Sₘ = (m/2) × (n/2)[(n + 1) + (2mn − n + 1)] = ½ mn(mn + 1)",
        "math": {
          "latex": "\\begin{aligned}S_1+S_2+\\cdots+S_m&=\\dfrac{m}{2}\\cdot\\dfrac{n}{2}\\bigl[(n+1)+(2mn-n+1)\\bigr]\\\\&=\\dfrac{mn}{4}(2mn+2)=\\dfrac{1}{2}mn(mn+1)\\end{aligned}",
          "fallback": "S₁ + S₂ + … + Sₘ = (m/2) × (n/2)[(n + 1) + (2mn − n + 1)] = ½ mn(mn + 1)",
          "display": true
        }
      }
    ],
    "answer": "S₁ + S₂ + S₃ + … + Sₘ = ½ mn(mn + 1) (proved).",
    "answerMath": {
      "latex": "S_1+S_2+S_3+\\cdots+S_m=\\dfrac{1}{2}mn(mn+1)\\text{ (proved)}.",
      "fallback": "S₁ + S₂ + S₃ + … + Sₘ = ½ mn(mn + 1) (proved).",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.6 Q11; printed p. 67, PDF p. 73; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-6-q12",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Series"
    },
    "label": {
      "en": "Exercise 2.6 · Q12",
      "ta": "Exercise 2.6 · Q12 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of 12 algebraic fractional terms in A.P."
    },
    "q": {
      "en": "Find the sum [(a − b)/(a + b) + (3a − 2b)/(a + b) + (5a − 3b)/(a + b) + … to 12 terms]."
    },
    "questionMath": {
      "en": [
        "Find the sum ",
        {
          "latex": "\\left[\\dfrac{a-b}{a+b}+\\dfrac{3a-2b}{a+b}+\\dfrac{5a-3b}{a+b}+\\cdots\\text{ to }12\\text{ terms}\\right].",
          "fallback": "[(a − b)/(a + b) + (3a − 2b)/(a + b) + (5a − 3b)/(a + b) + … to 12 terms].",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "For a + b ≠ 0, identify the first term T₁ and the constant common difference d = T₂ − T₁.",
        "eq": "T₁ = (a − b)/(a + b), d = [(3a − 2b) − (a − b)]/(a + b) = (2a − b)/(a + b)",
        "math": {
          "latex": "T_1=\\dfrac{a-b}{a+b},\\quad d=\\dfrac{(3a-2b)-(a-b)}{a+b}=\\dfrac{2a-b}{a+b}",
          "fallback": "T₁ = (a − b)/(a + b), d = [(3a − 2b) − (a − b)]/(a + b) = (2a − b)/(a + b)",
          "display": true
        }
      },
      {
        "en": "Apply the n-term arithmetic progression sum formula Sₙ = (n / 2)[2T₁ + (n − 1)d] for n = 12 terms.",
        "eq": "S₁₂ = (12/2)[2(a − b)/(a + b) + 11(2a − b)/(a + b)]",
        "math": {
          "latex": "S_{12}=\\dfrac{12}{2}\\left[\\dfrac{2(a-b)}{a+b}+\\dfrac{11(2a-b)}{a+b}\\right]",
          "fallback": "S₁₂ = (12/2)[2(a − b)/(a + b) + 11(2a − b)/(a + b)]",
          "display": true
        }
      },
      {
        "en": "Combine the numerators over the common denominator a + b.",
        "eq": "S₁₂ = (6/(a + b))(2a − 2b + 22a − 11b) = (6/(a + b))(24a − 13b)",
        "math": {
          "latex": "S_{12}=\\dfrac{6}{a+b}(2a-2b+22a-11b)=\\dfrac{6}{a+b}(24a-13b)",
          "fallback": "S₁₂ = (6/(a + b))(2a − 2b + 22a − 11b) = (6/(a + b))(24a − 13b)",
          "display": true
        }
      }
    ],
    "answer": "(6/(a + b))(24a − 13b).",
    "answerMath": {
      "latex": "\\dfrac{6}{a+b}(24a-13b).",
      "fallback": "(6/(a + b))(24a − 13b).",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.6 Q12; printed p. 67, PDF p. 73; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 2.6 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
