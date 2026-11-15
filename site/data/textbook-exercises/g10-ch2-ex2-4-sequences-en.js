/* STAGED ONLY: Ex 2.4 p.55/PDF p.61, 2025 English textbook; not loaded in site.
 * Ten new authored English parts for five missing numbered questions.
 * Exact original formulas inspected visually and checked with appendix.
 * Never call this file deployed until the curriculum release gate is green.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Grade 10 Chapter 2 prerequisites missing');
const entries=[
  {
    "id": "c10-2-ex2-4-q2-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q2(i)",
      "ta": "Exercise 2.4 · Q2(i) (English only; Tamil pending)"
    },
    "title": {
      "en": "Substitute positions into a cubic rule"
    },
    "q": {
      "en": "Find the first four terms when aₙ = n³ − 2."
    },
    "steps": [
      {
        "en": "The subscript n means the position of the term. Start with n = 1.",
        "eq": "n = 1, 2, 3, 4",
        "math": {
          "latex": "n=1,2,3,4",
          "fallback": "n = 1, 2, 3, 4",
          "display": true
        }
      },
      {
        "en": "Calculate each cube before subtracting 2.",
        "eq": "a₁ = 1³ − 2 = −1; a₂ = 2³ − 2 = 6",
        "math": {
          "latex": "a_1=1^3-2=-1,\\quad a_2=2^3-2=6",
          "fallback": "a₁ = 1³ − 2 = −1; a₂ = 2³ − 2 = 6",
          "display": true
        }
      },
      {
        "en": "Continue the same rule for positions 3 and 4.",
        "eq": "a₃ = 3³ − 2 = 25; a₄ = 4³ − 2 = 62",
        "math": {
          "latex": "a_3=3^3-2=25,\\quad a_4=4^3-2=62",
          "fallback": "a₃ = 3³ − 2 = 25; a₄ = 4³ − 2 = 62",
          "display": true
        }
      }
    ],
    "answer": "-1, 6, 25, 62.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q2(i); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q2-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q2(ii)",
      "ta": "Exercise 2.4 · Q2(ii) (English only; Tamil pending)"
    },
    "title": {
      "en": "An alternating-sign nth-term rule"
    },
    "q": {
      "en": "Find the first four terms when aₙ = (−1)ⁿ⁺¹n(n + 1)."
    },
    "steps": [
      {
        "en": "The power of −1 alternates between +1 and −1. For odd n, n + 1 is even, giving a positive term.",
        "eq": "(−1)² = +1; (−1)³ = −1",
        "math": {
          "latex": "(-1)^{1+1}=1,\\quad (-1)^{2+1}=-1",
          "fallback": "(−1)² = +1; (−1)³ = −1",
          "display": true
        }
      },
      {
        "en": "Substitute n = 1 and n = 2, keeping the sign and product together.",
        "eq": "a₁ = 1 × 1 × 2 = 2; a₂ = −1 × 2 × 3 = −6",
        "math": {
          "latex": "a_1=(1)(1)(2)=2,\\quad a_2=(-1)(2)(3)=-6",
          "fallback": "a₁ = 1 × 1 × 2 = 2; a₂ = −1 × 2 × 3 = −6",
          "display": true
        }
      },
      {
        "en": "The next two signs alternate again.",
        "eq": "a₃ = 12; a₄ = −20",
        "math": {
          "latex": "a_3=(1)(3)(4)=12,\\quad a_4=(-1)(4)(5)=-20",
          "fallback": "a₃ = 12; a₄ = −20",
          "display": true
        }
      }
    ],
    "answer": "2, −6, 12, −20.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q2(ii); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q2-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q2(iii)",
      "ta": "Exercise 2.4 · Q2(iii) (English only; Tamil pending)"
    },
    "title": {
      "en": "A quadratic nth-term rule"
    },
    "q": {
      "en": "Find the first four terms when aₙ = 2n² − 6."
    },
    "steps": [
      {
        "en": "For each position square n first, multiply by 2, and subtract 6.",
        "eq": "aₙ = 2n² − 6",
        "math": {
          "latex": "a_n=2n^2-6",
          "fallback": "aₙ = 2n² − 6",
          "display": true
        }
      },
      {
        "en": "Substitute n = 1 and n = 2.",
        "eq": "a₁ = −4; a₂ = 2",
        "math": {
          "latex": "a_1=2-6=-4,\\quad a_2=8-6=2",
          "fallback": "a₁ = −4; a₂ = 2",
          "display": true
        }
      },
      {
        "en": "Repeat at n = 3 and n = 4.",
        "eq": "a₃ = 12; a₄ = 26",
        "math": {
          "latex": "a_3=18-6=12,\\quad a_4=32-6=26",
          "fallback": "a₃ = 12; a₄ = 26",
          "display": true
        }
      }
    ],
    "answer": "−4, 2, 12, 26.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q2(iii); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q3-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q3(i)",
      "ta": "Exercise 2.4 · Q3(i) (English only; Tamil pending)"
    },
    "title": {
      "en": "Spot the square-plus-one pattern"
    },
    "q": {
      "en": "Find the nth term of the sequence 2, 5, 10, 17, …"
    },
    "steps": [
      {
        "en": "Subtract 1 from the visible terms. The resulting numbers are perfect squares.",
        "eq": "2−1=1; 5−1=4; 10−1=9; 17−1=16",
        "math": {
          "latex": "2-1=1,\\quad5-1=4,\\quad10-1=9,\\quad17-1=16",
          "fallback": "2−1=1; 5−1=4; 10−1=9; 17−1=16",
          "display": true
        }
      },
      {
        "en": "The squares 1, 4, 9, 16 occur at positions n = 1, 2, 3, 4.",
        "eq": "1²; 2²; 3²; 4²",
        "math": {
          "latex": "1^2,\\quad2^2,\\quad3^2,\\quad4^2",
          "fallback": "1²; 2²; 3²; 4²",
          "display": true
        }
      },
      {
        "en": "Put back the 1 and verify a later term.",
        "eq": "aₙ = n² + 1; a₄ = 17",
        "math": {
          "latex": "a_n=n^2+1,\\quad a_4=4^2+1=17",
          "fallback": "aₙ = n² + 1; a₄ = 17",
          "display": true
        }
      }
    ],
    "answer": "aₙ = n² + 1.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q3(i); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q3-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q3(ii)",
      "ta": "Exercise 2.4 · Q3(ii) (English only; Tamil pending)"
    },
    "title": {
      "en": "Recognise a numerator one below its denominator"
    },
    "q": {
      "en": "Find the nth term of 0, 1/2, 2/3, …"
    },
    "steps": [
      {
        "en": "Rewrite the first zero as a fraction, so every denominator shows the position n.",
        "eq": "0/1; 1/2; 2/3",
        "math": {
          "latex": "0=\\frac01,\\quad\\frac12,\\quad\\frac23",
          "fallback": "0/1; 1/2; 2/3",
          "display": true
        }
      },
      {
        "en": "At position n, the numerator is always one smaller than the denominator.",
        "eq": "numerator = n − 1; denominator = n",
        "math": {
          "latex": "\\text{numerator}=n-1,\\quad\\text{denominator}=n",
          "fallback": "numerator = n − 1; denominator = n",
          "display": true
        }
      },
      {
        "en": "Check the first three terms by substitution.",
        "eq": "aₙ = (n−1)/n",
        "math": {
          "latex": "a_n=\\frac{n-1}{n},\\quad n\\ge1",
          "fallback": "aₙ = (n−1)/n",
          "display": true
        }
      }
    ],
    "answer": "aₙ = (n − 1)/n.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q3(ii); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q3-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q3(iii)",
      "ta": "Exercise 2.4 · Q3(iii) (English only; Tamil pending)"
    },
    "title": {
      "en": "Translate a repeated +5 pattern into n"
    },
    "q": {
      "en": "Find the nth term of 3, 8, 13, 18, …"
    },
    "steps": [
      {
        "en": "Every next term is five larger; the first term is 3.",
        "eq": "d = 5",
        "math": {
          "latex": "d=8-3=5",
          "fallback": "d = 5",
          "display": true
        }
      },
      {
        "en": "The nth term starts with the first term and takes n − 1 steps of size 5.",
        "eq": "aₙ = 3 + (n−1) × 5",
        "math": {
          "latex": "a_n=3+(n-1)5",
          "fallback": "aₙ = 3 + (n−1) × 5",
          "display": true
        }
      },
      {
        "en": "Simplify and verify at n = 4.",
        "eq": "aₙ = 5n − 2; a₄ = 18",
        "math": {
          "latex": "a_n=5n-2,\\quad a_4=18",
          "fallback": "aₙ = 5n − 2; a₄ = 18",
          "display": true
        }
      }
    ],
    "answer": "aₙ = 5n − 2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q3(iii); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q4-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q4(i)",
      "ta": "Exercise 2.4 · Q4(i) (English only; Tamil pending)"
    },
    "title": {
      "en": "Substitute the index into a fraction rule"
    },
    "q": {
      "en": "Given aₙ = 5n/(n + 2), find a₆ and a₁₃."
    },
    "steps": [
      {
        "en": "For a₆, use n = 6 in both numerator and denominator.",
        "eq": "a₆ = 30/8 = 15/4",
        "math": {
          "latex": "a_6=\\frac{5\\cdot6}{6+2}=\\frac{30}8=\\frac{15}4",
          "fallback": "a₆ = 30/8 = 15/4",
          "display": true
        }
      },
      {
        "en": "For a₁₃, substitute 13 in both parts.",
        "eq": "a₁₃ = 65/15 = 13/3",
        "math": {
          "latex": "a_{13}=\\frac{5\\cdot13}{13+2}=\\frac{65}{15}=\\frac{13}3",
          "fallback": "a₁₃ = 65/15 = 13/3",
          "display": true
        }
      }
    ],
    "answer": "a₆ = 15/4; a₁₃ = 13/3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q4(i); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q4-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q4(ii)",
      "ta": "Exercise 2.4 · Q4(ii) (English only; Tamil pending)"
    },
    "title": {
      "en": "A negative sign outside a squared expression"
    },
    "q": {
      "en": "Given aₙ = −(n² − 4), find a₄ and a₁₁."
    },
    "steps": [
      {
        "en": "Square the value of n first, then subtract 4 inside the brackets. The negative sign applies to the entire result.",
        "eq": "aₙ = −(n² − 4) = 4 − n²",
        "math": {
          "latex": "a_n=-(n^2-4)=4-n^2",
          "fallback": "aₙ = −(n² − 4) = 4 − n²",
          "display": true
        }
      },
      {
        "en": "For n = 4, the value inside the brackets is 12, then its negative is −12.",
        "eq": "a₄ = −(16 − 4) = −12",
        "math": {
          "latex": "a_4=-(16-4)=-12",
          "fallback": "a₄ = −(16 − 4) = −12",
          "display": true
        }
      },
      {
        "en": "Use the same order for n = 11.",
        "eq": "a₁₁ = −(121 − 4) = −117",
        "math": {
          "latex": "a_{11}=-(121-4)=-117",
          "fallback": "a₁₁ = −(121 − 4) = −117",
          "display": true
        }
      }
    ],
    "answer": "a₄ = −12; a₁₁ = −117.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q4(ii); independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q5",
      "ta": "Exercise 2.4 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Apply the correct branch of a piecewise sequence"
    },
    "q": {
      "en": "Find a₈ and a₁₅ when aₙ = (n² − 1)/(n + 3) for even n, and aₙ = n²/(2n + 1) for odd n."
    },
    "steps": [
      {
        "en": "A piecewise rule is a choice: decide whether the term position is even or odd before doing any calculation.",
        "eq": "8 is even; 15 is odd",
        "math": {
          "latex": "8\\text{ even},\\quad15\\text{ odd}",
          "fallback": "8 is even; 15 is odd",
          "display": true
        }
      },
      {
        "en": "Eight is even, so use the first fraction.",
        "eq": "a₈ = (64 − 1)/(8 + 3) = 63/11",
        "math": {
          "latex": "a_8=\\frac{8^2-1}{8+3}=\\frac{63}{11}",
          "fallback": "a₈ = (64 − 1)/(8 + 3) = 63/11",
          "display": true
        }
      },
      {
        "en": "Fifteen is odd, so use the second fraction.",
        "eq": "a₁₅ = 225/(30 + 1) = 225/31",
        "math": {
          "latex": "a_{15}=\\frac{15^2}{2\\cdot15+1}=\\frac{225}{31}",
          "fallback": "a₁₅ = 225/(30 + 1) = 225/31",
          "display": true
        }
      },
      {
        "en": "The two formulas serve different positions; never average them or apply both to one n.",
        "eq": "a₈ = 63/11; a₁₅ = 225/31",
        "math": {
          "latex": "a_8=\\frac{63}{11},\\quad a_{15}=\\frac{225}{31}",
          "fallback": "a₈ = 63/11; a₁₅ = 225/31",
          "display": true
        }
      }
    ],
    "answer": "a₈ = 63/11; a₁₅ = 225/31.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q5; independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  },
  {
    "id": "c10-2-ex2-4-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q6",
      "ta": "Exercise 2.4 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "Build a recursive sequence from two earlier terms"
    },
    "q": {
      "en": "If a₁ = 1, a₂ = 1 and aₙ = 2aₙ₋₁ + aₙ₋₂ for n ≥ 3, find the first six terms."
    },
    "steps": [
      {
        "en": "This is a recursive rule. To get a new term, use two terms already found: twice the previous one plus the one before it.",
        "eq": "aₙ = 2aₙ₋₁ + aₙ₋₂",
        "math": {
          "latex": "a_n=2a_{n-1}+a_{n-2},\\quad n\\ge3",
          "fallback": "aₙ = 2aₙ₋₁ + aₙ₋₂",
          "display": true
        }
      },
      {
        "en": "Start with the two given values and compute the next two.",
        "eq": "a₁ = 1; a₂ = 1; a₃ = 3; a₄ = 7",
        "math": {
          "latex": "a_1=a_2=1,\\quad a_3=2(1)+1=3,\\quad a_4=2(3)+1=7",
          "fallback": "a₁ = 1; a₂ = 1; a₃ = 3; a₄ = 7",
          "display": true
        }
      },
      {
        "en": "Keep using the two immediately preceding values, not the initial ones.",
        "eq": "a₅ = 17; a₆ = 41",
        "math": {
          "latex": "a_5=2(7)+3=17,\\quad a_6=2(17)+7=41",
          "fallback": "a₅ = 17; a₆ = 41",
          "display": true
        }
      },
      {
        "en": "Read off all six values in their original positions.",
        "eq": "1, 1, 3, 7, 17, 41",
        "math": {
          "latex": "(a_1,a_2,a_3,a_4,a_5,a_6)=(1,1,3,7,17,41)",
          "fallback": "1, 1, 3, 7, 17, 41",
          "display": true
        }
      }
    ],
    "answer": "1, 1, 3, 7, 17, 41.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "edition": "2025",
    "reference": "TN SCERT Standard Ten Mathematics, English revised 2025, printed p. 55, PDF p. 61, Exercise 2.4 Q6; independently checked against appendix p. 336.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; staged only, not integrated"
  }
];
const existing=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(x=>x.id)));
if(entries.some(e=>existing.has(e.id)))throw Error('Duplicate Exercise 2.4 source draft');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const record of entries){grade.items.push(record);chapter.textbookQuestionIds.push(record.id);}
window.TRIGGLE_G10_CH2_EX24_STAGED=Object.freeze({records:entries.length,numberedQuestions:[2,3,4,5,6],englishSourceChecked:true,notDeployed:true});
})();
