/* TRACE Grade 10, 2025 Tamil Nadu English mathematics, Exercise 2.4 Q2–Q6.
 * The source is visually checked on printed p55/PDF p61 (SHA256 original
 * 602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d).
 * Stage independently; integration into student HTML requires all release gates.
 * Q1(i–iii) already exists and MUST NOT be duplicated.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Grade 10 Chapter 2 source data missing');
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
      "ta": "Exercise 2.4 · Q2(i) (English source; Tamil pending)"
    },
    "title": {
      "en": "Evaluate a cubic nth-term rule"
    },
    "q": {
      "en": "Find the first four terms when aₙ = n³ − 2."
    },
    "steps": [
      {
        "en": "Use n = 1 in the given formula. The cube is calculated before subtracting 2.",
        "eq": "a₁ = 1³ − 2 = −1",
        "math": {
          "latex": "a_1=1^3-2=-1",
          "fallback": "a₁ = 1³ − 2 = −1",
          "display": true
        }
      },
      {
        "en": "Put n = 2 and n = 3 into the same formula, without changing the rule.",
        "eq": "a₂ = 2³ − 2 = 6; a₃ = 3³ − 2 = 25",
        "math": {
          "latex": "a_2=2^3-2=6,\\quad a_3=3^3-2=25",
          "fallback": "a₂ = 2³ − 2 = 6; a₃ = 3³ − 2 = 25",
          "display": true
        }
      },
      {
        "en": "Use n = 4 for the last requested term.",
        "eq": "a₄ = 4³ − 2 = 62",
        "math": {
          "latex": "a_4=4^3-2=62",
          "fallback": "a₄ = 4³ − 2 = 62",
          "display": true
        }
      }
    ],
    "answer": "−1, 6, 25, 62.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q2(i), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q2(ii) (English source; Tamil pending)"
    },
    "title": {
      "en": "Understand alternating signs"
    },
    "q": {
      "en": "Find the first four terms when aₙ = (−1)ⁿ⁺¹ n(n + 1)."
    },
    "steps": [
      {
        "en": "First decide the sign: (−1) raised to an even power is +1, and to an odd power is −1.",
        "eq": "(−1)² = +1; (−1)³ = −1",
        "math": {
          "latex": "(-1)^2=1,\\quad(-1)^3=-1",
          "fallback": "(−1)² = +1; (−1)³ = −1",
          "display": true
        }
      },
      {
        "en": "For n = 1 and n = 2, calculate n(n + 1) after choosing the sign.",
        "eq": "a₁ = (+1) × 1 × 2 = 2; a₂ = (−1) × 2 × 3 = −6",
        "math": {
          "latex": "a_1=1\\cdot1\\cdot2=2,\\quad a_2=-1\\cdot2\\cdot3=-6",
          "fallback": "a₁ = (+1) × 1 × 2 = 2; a₂ = (−1) × 2 × 3 = −6",
          "display": true
        }
      },
      {
        "en": "Continue for n = 3 and n = 4; the sign alternates but the multiplication rule remains unchanged.",
        "eq": "a₃ = (+1) × 3 × 4 = 12; a₄ = (−1) × 4 × 5 = −20",
        "math": {
          "latex": "a_3=3\\cdot4=12,\\quad a_4=-4\\cdot5=-20",
          "fallback": "a₃ = (+1) × 3 × 4 = 12; a₄ = (−1) × 4 × 5 = −20",
          "display": true
        }
      }
    ],
    "answer": "2, −6, 12, −20.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q2(ii), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q2(iii) (English source; Tamil pending)"
    },
    "title": {
      "en": "Substitute into a squared nth-term rule"
    },
    "q": {
      "en": "Find the first four terms when aₙ = 2n² − 6."
    },
    "steps": [
      {
        "en": "Square n, multiply by 2, and only then subtract 6.",
        "eq": "a₁ = 2(1²) − 6 = −4",
        "math": {
          "latex": "a_1=2(1)^2-6=-4",
          "fallback": "a₁ = 2(1²) − 6 = −4",
          "display": true
        }
      },
      {
        "en": "Apply the same operations for n = 2 and n = 3.",
        "eq": "a₂ = 2(2²) − 6 = 2; a₃ = 2(3²) − 6 = 12",
        "math": {
          "latex": "a_2=2(2)^2-6=2,\\quad a_3=2(3)^2-6=12",
          "fallback": "a₂ = 2(2²) − 6 = 2; a₃ = 2(3²) − 6 = 12",
          "display": true
        }
      },
      {
        "en": "Substitute n = 4 to complete the first four terms.",
        "eq": "a₄ = 2(4²) − 6 = 26",
        "math": {
          "latex": "a_4=2(4)^2-6=26",
          "fallback": "a₄ = 2(4²) − 6 = 26",
          "display": true
        }
      }
    ],
    "answer": "−4, 2, 12, 26.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q2(iii), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q3(i) (English source; Tamil pending)"
    },
    "title": {
      "en": "Recognise square numbers in a pattern"
    },
    "q": {
      "en": "Find the nth term of the sequence 2, 5, 10, 17, …"
    },
    "steps": [
      {
        "en": "Compare each term with the squares 1, 4, 9, 16. Each displayed term is one greater than the corresponding square.",
        "eq": "2 = 1² + 1; 5 = 2² + 1; 10 = 3² + 1",
        "math": {
          "latex": "2=1^2+1,\\quad5=2^2+1,\\quad10=3^2+1",
          "fallback": "2 = 1² + 1; 5 = 2² + 1; 10 = 3² + 1",
          "display": true
        }
      },
      {
        "en": "The simplest matching nth-term pattern is therefore square the term number and add one.",
        "eq": "aₙ = n² + 1",
        "math": {
          "latex": "a_n=n^2+1",
          "fallback": "aₙ = n² + 1",
          "display": true
        }
      },
      {
        "en": "Check n = 4 to see that the pattern also gives the fourth displayed term.",
        "eq": "a₄ = 4² + 1 = 17",
        "math": {
          "latex": "a_4=4^2+1=17",
          "fallback": "a₄ = 4² + 1 = 17",
          "display": true
        }
      }
    ],
    "answer": "aₙ = n² + 1.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q3(i), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q3(ii) (English source; Tamil pending)"
    },
    "title": {
      "en": "See the missing numerator pattern"
    },
    "q": {
      "en": "Find the nth term of the sequence 0, 1/2, 2/3, …"
    },
    "steps": [
      {
        "en": "Write the first term as 0/1; then compare numerator and denominator by position.",
        "eq": "0 = 0/1; 1/2; 2/3",
        "math": {
          "latex": "0=\\frac01,\\quad\\frac12,\\quad\\frac23",
          "fallback": "0 = 0/1; 1/2; 2/3",
          "display": true
        }
      },
      {
        "en": "At position n, the numerator is n − 1 and the denominator is n.",
        "eq": "aₙ = (n − 1)/n",
        "math": {
          "latex": "a_n=\\frac{n-1}{n}",
          "fallback": "aₙ = (n − 1)/n",
          "display": true
        }
      },
      {
        "en": "Check the first three positions. A formula suggested by finitely many terms is a pattern, not a logically unique rule without further conditions.",
        "eq": "a₁ = 0; a₂ = 1/2; a₃ = 2/3",
        "math": {
          "latex": "a_1=0,\\quad a_2=\\frac12,\\quad a_3=\\frac23",
          "fallback": "a₁ = 0; a₂ = 1/2; a₃ = 2/3",
          "display": true
        }
      }
    ],
    "answer": "aₙ = (n − 1)/n, for n ≥ 1.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q3(ii), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q3(iii) (English source; Tamil pending)"
    },
    "title": {
      "en": "Convert a constant difference into a formula"
    },
    "q": {
      "en": "Find the nth term of the sequence 3, 8, 13, 18, …"
    },
    "steps": [
      {
        "en": "The difference between each pair of neighbouring terms is 5.",
        "eq": "8 − 3 = 13 − 8 = 18 − 13 = 5",
        "math": {
          "latex": "8-3=13-8=18-13=5",
          "fallback": "8 − 3 = 13 − 8 = 18 − 13 = 5",
          "display": true
        }
      },
      {
        "en": "Start with 3 and add 5 for each step after the first: there are n − 1 such steps.",
        "eq": "aₙ = 3 + (n − 1) × 5",
        "math": {
          "latex": "a_n=3+5(n-1)",
          "fallback": "aₙ = 3 + (n − 1) × 5",
          "display": true
        }
      },
      {
        "en": "Expand and verify against the displayed fourth term.",
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
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q3(iii), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q4(i) (English source; Tamil pending)"
    },
    "title": {
      "en": "Evaluate a fractional nth-term rule"
    },
    "q": {
      "en": "Given aₙ = 5n/(n + 2), find a₆ and a₁₃."
    },
    "steps": [
      {
        "en": "Substitute n = 6 in numerator and denominator together, then simplify.",
        "eq": "a₆ = (5 × 6)/(6 + 2) = 30/8 = 15/4",
        "math": {
          "latex": "a_6=\\frac{5\\cdot6}{6+2}=\\frac{30}{8}=\\frac{15}{4}",
          "fallback": "a₆ = (5 × 6)/(6 + 2) = 30/8 = 15/4",
          "display": true
        }
      },
      {
        "en": "For a₁₃, use n = 13 in both places and reduce the fraction.",
        "eq": "a₁₃ = (5 × 13)/(13 + 2) = 65/15 = 13/3",
        "math": {
          "latex": "a_{13}=\\frac{5\\cdot13}{13+2}=\\frac{65}{15}=\\frac{13}{3}",
          "fallback": "a₁₃ = (5 × 13)/(13 + 2) = 65/15 = 13/3",
          "display": true
        }
      }
    ],
    "answer": "a₆ = 15/4; a₁₃ = 13/3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q4(i), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q4(ii) (English source; Tamil pending)"
    },
    "title": {
      "en": "Keep a minus sign outside the brackets"
    },
    "q": {
      "en": "Given aₙ = −(n² − 4), find a₄ and a₁₁."
    },
    "steps": [
      {
        "en": "The minus sign is outside the whole bracket. Calculate the bracket first for n = 4.",
        "eq": "a₄ = −(4² − 4) = −(16 − 4) = −12",
        "math": {
          "latex": "a_4=-(4^2-4)=-(16-4)=-12",
          "fallback": "a₄ = −(4² − 4) = −(16 − 4) = −12",
          "display": true
        }
      },
      {
        "en": "Repeat with n = 11 and apply the outside minus after subtraction.",
        "eq": "a₁₁ = −(11² − 4) = −(121 − 4) = −117",
        "math": {
          "latex": "a_{11}=-(11^2-4)=-(121-4)=-117",
          "fallback": "a₁₁ = −(11² − 4) = −(121 − 4) = −117",
          "display": true
        }
      }
    ],
    "answer": "a₄ = −12; a₁₁ = −117.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q4(ii), printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q5 (English source; Tamil pending)"
    },
    "title": {
      "en": "Choose the even or odd branch first"
    },
    "q": {
      "en": "Find a₈ and a₁₅ where aₙ = (n² − 1)/(n + 3) for even n, and aₙ = n²/(2n + 1) for odd n."
    },
    "steps": [
      {
        "en": "A piecewise rule gives two different formulas. Before calculating a₈, choose the even-numbered rule because 8 is even.",
        "eq": "a₈ = (8² − 1)/(8 + 3) = 63/11",
        "math": {
          "latex": "a_8=\\frac{8^2-1}{8+3}=\\frac{63}{11}",
          "fallback": "a₈ = (8² − 1)/(8 + 3) = 63/11",
          "display": true
        }
      },
      {
        "en": "15 is odd, so for a₁₅ use the other rule, not the formula used for a₈.",
        "eq": "a₁₅ = 15²/(2 × 15 + 1) = 225/31",
        "math": {
          "latex": "a_{15}=\\frac{15^2}{2\\cdot15+1}=\\frac{225}{31}",
          "fallback": "a₁₅ = 15²/(2 × 15 + 1) = 225/31",
          "display": true
        }
      },
      {
        "en": "Check the decision: a₈ came from the even branch and a₁₅ from the odd branch; do not substitute both n values into one formula.",
        "eq": "8 is even; 15 is odd",
        "math": {
          "latex": "8\\in2\\mathbb Z,\\quad15\\in 2\\mathbb Z+1",
          "fallback": "8 is even; 15 is odd",
          "display": true
        }
      }
    ],
    "answer": "a₈ = 63/11; a₁₅ = 225/31.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q5, printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
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
      "ta": "Exercise 2.4 · Q6 (English source; Tamil pending)"
    },
    "title": {
      "en": "Build a recurrence one step at a time"
    },
    "q": {
      "en": "If a₁ = 1, a₂ = 1 and aₙ = 2aₙ₋₁ + aₙ₋₂ for n ≥ 3, find the first six terms."
    },
    "steps": [
      {
        "en": "The first two terms are already given. In this rule, aₙ₋₁ means the previous term and aₙ₋₂ means the term before that.",
        "eq": "a₁ = 1; a₂ = 1",
        "math": {
          "latex": "a_1=1,\\quad a_2=1",
          "fallback": "a₁ = 1; a₂ = 1",
          "display": true
        }
      },
      {
        "en": "Use both known terms to find a₃, then use a₂ and a₃ to find a₄.",
        "eq": "a₃ = 2(1) + 1 = 3; a₄ = 2(3) + 1 = 7",
        "math": {
          "latex": "a_3=2(1)+1=3,\\quad a_4=2(3)+1=7",
          "fallback": "a₃ = 2(1) + 1 = 3; a₄ = 2(3) + 1 = 7",
          "display": true
        }
      },
      {
        "en": "Each newly found term becomes the previous term at the next step. Continue to a₆.",
        "eq": "a₅ = 2(7) + 3 = 17; a₆ = 2(17) + 7 = 41",
        "math": {
          "latex": "a_5=2(7)+3=17,\\quad a_6=2(17)+7=41",
          "fallback": "a₅ = 2(7) + 3 = 17; a₆ = 2(17) + 7 = 41",
          "display": true
        }
      }
    ],
    "answer": "1, 1, 3, 7, 17, 41.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English, Exercise 2.4 Q6, printed p. 55, PDF p. 61; visually source-checked. Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independent mathematics; Tamil pending"
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(q=>q.id)));
if(entries.some(q=>ids.has(q.id)))throw Error('Duplicate Exercise 2.4 question ID');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G10_CH2_EX24_ADDED=Object.freeze({count:entries.length,questions:[2,3,4,5,6],sourcePage:61,tamilEditorialPending:true,chapterComplete:false});
})();
