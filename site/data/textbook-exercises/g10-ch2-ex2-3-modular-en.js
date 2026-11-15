/* Grade 10 Ex 2.3: source-aligned modular arithmetic, ten missing published parts.
 * Answers verified using integer congruences; not a chapter-complete claim.
 * The textbook's x/7 in Q1(iv) is understood as an integer, as in its appendix.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Grade 10 Chapter 2 source data missing');
const entries=[
  {
    "id": "c10-2-ex2-3-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q1(i)",
      "ta": "Exercise 2.3 · Q1(i) (English only; Tamil pending)"
    },
    "title": {
      "en": "First congruence: find the remainder"
    },
    "q": {
      "en": "Find the least positive value of x such that 71 ≡ x (mod 8)."
    },
    "steps": [
      {
        "en": "The symbol ≡ (mod 8) means these two integers must give the same remainder after division by 8.",
        "eq": "71 = 8 × 8 + 7",
        "math": {
          "latex": "71=8\\cdot8+7",
          "fallback": "71 = 8 × 8 + 7",
          "display": true
        }
      },
      {
        "en": "The remainder 7 is already a positive number less than 8. So it is the least positive value of x.",
        "eq": "x = 7",
        "math": {
          "latex": "x=7",
          "fallback": "x = 7",
          "display": true
        }
      }
    ],
    "answer": "7.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q1(i), printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q1(ii)",
      "ta": "Exercise 2.3 · Q1(ii) (English only; Tamil pending)"
    },
    "title": {
      "en": "When the remainder is zero, least positive is not zero"
    },
    "q": {
      "en": "Find the least positive value of x such that 78 + x ≡ 3 (mod 5)."
    },
    "steps": [
      {
        "en": "Remove complete groups of 5 from 78. The part left over is 3.",
        "eq": "78 ≡ 3 (mod 5)",
        "math": {
          "latex": "78\\equiv3\\pmod5",
          "fallback": "78 ≡ 3 (mod 5)",
          "display": true
        }
      },
      {
        "en": "Subtract 3 from both sides of the congruence to find which remainder x must have.",
        "eq": "x ≡ 0 (mod 5)",
        "math": {
          "latex": "78+x\\equiv3\\Rightarrow x\\equiv0\\pmod5",
          "fallback": "x ≡ 0 (mod 5)",
          "display": true
        }
      },
      {
        "en": "Numbers with remainder zero are multiples of 5. Zero itself is not positive, so the least positive choice is 5.",
        "eq": "x = 5",
        "math": {
          "latex": "x=5",
          "fallback": "x = 5",
          "display": true
        }
      }
    ],
    "answer": "5.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q1(ii), printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q1(iii)",
      "ta": "Exercise 2.3 · Q1(iii) (English only; Tamil pending)"
    },
    "title": {
      "en": "Move an added term across a congruence"
    },
    "q": {
      "en": "Find the least positive value of x such that 89 ≡ (x + 3) (mod 4)."
    },
    "steps": [
      {
        "en": "First find the remainder of 89 after dividing by 4.",
        "eq": "89 = 4 × 22 + 1",
        "math": {
          "latex": "89=4(22)+1",
          "fallback": "89 = 4 × 22 + 1",
          "display": true
        }
      },
      {
        "en": "The expression x + 3 therefore must have remainder 1. Subtract 3, then add a full group of 4 to reach a positive representative.",
        "eq": "x ≡ 1 − 3 ≡ −2 ≡ 2 (mod 4)",
        "math": {
          "latex": "x\\equiv1-3\\equiv-2\\equiv2\\pmod4",
          "fallback": "x ≡ 1 − 3 ≡ −2 ≡ 2 (mod 4)",
          "display": true
        }
      },
      {
        "en": "Verify: 2 + 3 equals 5, whose remainder modulo 4 is 1, just like 89.",
        "eq": "x = 2; 89 − (2 + 3) = 84",
        "math": {
          "latex": "x=2,\\quad89-(2+3)=84=4(21)",
          "fallback": "x = 2; 89 − (2 + 3) = 84",
          "display": true
        }
      }
    ],
    "answer": "2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q1(iii), printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q1-iv",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q1(iv)",
      "ta": "Exercise 2.3 · Q1(iv) (English only; Tamil pending)"
    },
    "title": {
      "en": "A congruence containing a fraction"
    },
    "q": {
      "en": "Find the least positive value of x such that 96 ≡ x/7 (mod 5)."
    },
    "steps": [
      {
        "en": "This textbook question compares integers modulo 5, so interpret x/7 as an integer; x must be a multiple of 7.",
        "eq": "x = 7k, where k is a positive integer",
        "math": {
          "latex": "x=7k,\\quad k\\in\\mathbb{Z}_{>0}",
          "fallback": "x = 7k, where k is a positive integer",
          "display": true
        }
      },
      {
        "en": "Since 96 leaves remainder 1 upon division by 5, the integer k = x/7 must also leave remainder 1.",
        "eq": "96 = 5 × 19 + 1; k ≡ 1 (mod 5)",
        "math": {
          "latex": "96=5(19)+1,\\quad k\\equiv1\\pmod5",
          "fallback": "96 = 5 × 19 + 1; k ≡ 1 (mod 5)",
          "display": true
        }
      },
      {
        "en": "The smallest positive k is 1; multiply back by 7, then check the integer quotient.",
        "eq": "x = 7; x/7 = 1",
        "math": {
          "latex": "k=1\\Rightarrow x=7,\\quad x/7=1",
          "fallback": "x = 7; x/7 = 1",
          "display": true
        }
      }
    ],
    "answer": "7 (with x/7 interpreted as an integer, as in the textbook).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q1(iv), printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q1-v",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q1(v)",
      "ta": "Exercise 2.3 · Q1(v) (English only; Tamil pending)"
    },
    "title": {
      "en": "Replace multiplication by 5 with a negative sign"
    },
    "q": {
      "en": "Find the least positive value of x such that 5x ≡ 4 (mod 6)."
    },
    "steps": [
      {
        "en": "Modulo 6, multiplying by 5 is the same as multiplying by −1, because 5 and −1 differ by 6.",
        "eq": "5 ≡ −1 (mod 6)",
        "math": {
          "latex": "5\\equiv-1\\pmod6",
          "fallback": "5 ≡ −1 (mod 6)",
          "display": true
        }
      },
      {
        "en": "Replace 5x with −x, then change the sign on both sides.",
        "eq": "−x ≡ 4 (mod 6); x ≡ −4 ≡ 2 (mod 6)",
        "math": {
          "latex": "-x\\equiv4\\pmod6\\Rightarrow x\\equiv-4\\equiv2\\pmod6",
          "fallback": "−x ≡ 4 (mod 6); x ≡ −4 ≡ 2 (mod 6)",
          "display": true
        }
      },
      {
        "en": "Check the smallest positive solution directly.",
        "eq": "5 × 2 = 10 = 6 + 4",
        "math": {
          "latex": "5(2)=10=6+4",
          "fallback": "5 × 2 = 10 = 6 + 4",
          "display": true
        }
      }
    ],
    "answer": "2 (other positive solutions: 8, 14, 20, …).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q1(v), printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q2",
      "ta": "Exercise 2.3 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "Substitute equal remainders before calculating"
    },
    "q": {
      "en": "If x is congruent to 13 modulo 17, to which number is 7x − 3 congruent modulo 17?"
    },
    "steps": [
      {
        "en": "Congruent numbers have the same remainder. We may replace x by 13 when calculating 7x − 3 modulo 17.",
        "eq": "x ≡ 13 (mod 17)",
        "math": {
          "latex": "x\\equiv13\\pmod{17}",
          "fallback": "x ≡ 13 (mod 17)",
          "display": true
        }
      },
      {
        "en": "Multiply and subtract using the smaller representative.",
        "eq": "7x − 3 ≡ 7 × 13 − 3 = 88 (mod 17)",
        "math": {
          "latex": "7x-3\\equiv7(13)-3=88\\pmod{17}",
          "fallback": "7x − 3 ≡ 7 × 13 − 3 = 88 (mod 17)",
          "display": true
        }
      },
      {
        "en": "Take away five full groups of 17. The remainder is 3.",
        "eq": "88 = 17 × 5 + 3",
        "math": {
          "latex": "88=17(5)+3",
          "fallback": "88 = 17 × 5 + 3",
          "display": true
        }
      }
    ],
    "answer": "3 (mod 17).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q2, printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q3",
      "ta": "Exercise 2.3 · Q3 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find all solutions, not just one"
    },
    "q": {
      "en": "Solve 5x ≡ 4 (mod 6)."
    },
    "steps": [
      {
        "en": "Since 5 differs from −1 by a multiple of 6, use −x in place of 5x.",
        "eq": "5x ≡ −x (mod 6)",
        "math": {
          "latex": "5x\\equiv-x\\pmod6",
          "fallback": "5x ≡ −x (mod 6)",
          "display": true
        }
      },
      {
        "en": "Change the sign and add 6 to find a nonnegative representative.",
        "eq": "x ≡ −4 ≡ 2 (mod 6)",
        "math": {
          "latex": "x\\equiv-4\\equiv2\\pmod6",
          "fallback": "x ≡ −4 ≡ 2 (mod 6)",
          "display": true
        }
      },
      {
        "en": "A congruence represents infinitely many integers. Add or subtract complete groups of 6.",
        "eq": "x = 2 + 6k, k an integer",
        "math": {
          "latex": "x=2+6k,\\quad k\\in\\mathbb{Z}",
          "fallback": "x = 2 + 6k, k an integer",
          "display": true
        }
      }
    ],
    "answer": "All integers x = 2 + 6k (k ∈ ℤ); positive values include 2, 8, 14, ….",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q3, printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q4",
      "ta": "Exercise 2.3 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Undo multiplication in modular arithmetic"
    },
    "q": {
      "en": "Solve 3x − 2 ≡ 0 (mod 11)."
    },
    "steps": [
      {
        "en": "Move 2 to the other side. Unlike ordinary division, we first look for an integer that turns 3 into 1 modulo 11.",
        "eq": "3x ≡ 2 (mod 11)",
        "math": {
          "latex": "3x\\equiv2\\pmod{11}",
          "fallback": "3x ≡ 2 (mod 11)",
          "display": true
        }
      },
      {
        "en": "Because 3 × 4 = 12 leaves remainder 1 modulo 11, multiply both sides by 4.",
        "eq": "4 × 3 ≡ 1 (mod 11); x ≡ 8 (mod 11)",
        "math": {
          "latex": "3(4)\\equiv1\\pmod{11}\\Rightarrow x\\equiv4(2)\\equiv8\\pmod{11}",
          "fallback": "4 × 3 ≡ 1 (mod 11); x ≡ 8 (mod 11)",
          "display": true
        }
      },
      {
        "en": "Check one solution, and add multiples of 11 to obtain the rest.",
        "eq": "3 × 8 − 2 = 22 = 2 × 11",
        "math": {
          "latex": "3(8)-2=22=2(11)",
          "fallback": "3 × 8 − 2 = 22 = 2 × 11",
          "display": true
        }
      }
    ],
    "answer": "All integers x = 8 + 11k (k ∈ ℤ); positive values include 8, 19, 30, ….",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q4, printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q8",
      "ta": "Exercise 2.3 · Q8 (English only; Tamil pending)"
    },
    "title": {
      "en": "Why the expression is always divisible by 7"
    },
    "q": {
      "en": "Prove that 2ⁿ + 6 × 9ⁿ is divisible by 7 for every positive integer n."
    },
    "steps": [
      {
        "en": "9 differs from 2 by exactly 7. Therefore, 9 and 2 behave identically under multiplication modulo 7, even after raising both to the nth power.",
        "eq": "9 ≡ 2 (mod 7) ⇒ 9ⁿ ≡ 2ⁿ (mod 7)",
        "math": {
          "latex": "9\\equiv2\\pmod7\\Rightarrow9^n\\equiv2^n\\pmod7",
          "fallback": "9 ≡ 2 (mod 7) ⇒ 9ⁿ ≡ 2ⁿ (mod 7)",
          "display": true
        }
      },
      {
        "en": "Replace 9ⁿ with its congruent counterpart, then take the common factor 2ⁿ.",
        "eq": "2ⁿ + 6 × 9ⁿ ≡ 2ⁿ + 6 × 2ⁿ = 7 × 2ⁿ (mod 7)",
        "math": {
          "latex": "2^n+6\\cdot9^n\\equiv2^n+6\\cdot2^n=7\\cdot2^n\\pmod7",
          "fallback": "2ⁿ + 6 × 9ⁿ ≡ 2ⁿ + 6 × 2ⁿ = 7 × 2ⁿ (mod 7)",
          "display": true
        }
      },
      {
        "en": "Seven times any integer is divisible by 7. This holds for every positive n, so we have a proof, not just a numerical example.",
        "eq": "2ⁿ + 6 × 9ⁿ ≡ 0 (mod 7)",
        "math": {
          "latex": "2^n+6\\cdot9^n\\equiv0\\pmod7",
          "fallback": "2ⁿ + 6 × 9ⁿ ≡ 0 (mod 7)",
          "display": true
        }
      }
    ],
    "answer": "Divisible by 7 for every positive integer n.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q8, printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  },
  {
    "id": "c10-2-ex2-3-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q9",
      "ta": "Exercise 2.3 · Q9 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find a remainder without calculating a huge power"
    },
    "q": {
      "en": "Find the remainder when 2⁸¹ is divided by 17."
    },
    "steps": [
      {
        "en": "Look for a short power of 2 that gives a convenient remainder modulo 17.",
        "eq": "2⁴ = 16 ≡ −1 (mod 17)",
        "math": {
          "latex": "2^4=16\\equiv-1\\pmod{17}",
          "fallback": "2⁴ = 16 ≡ −1 (mod 17)",
          "display": true
        }
      },
      {
        "en": "Square that congruence. It shows that powers repeat after groups of 8.",
        "eq": "2⁸ ≡ 1 (mod 17)",
        "math": {
          "latex": "2^8\\equiv(-1)^2\\equiv1\\pmod{17}",
          "fallback": "2⁸ ≡ 1 (mod 17)",
          "display": true
        }
      },
      {
        "en": "Split the exponent 81 into ten groups of eight and one more factor of 2.",
        "eq": "2⁸¹ = (2⁸)¹⁰ × 2 ≡ 2 (mod 17)",
        "math": {
          "latex": "2^{81}=(2^8)^{10}\\cdot2\\equiv1^{10}\\cdot2\\equiv2\\pmod{17}",
          "fallback": "2⁸¹ = (2⁸)¹⁰ × 2 ≡ 2 (mod 17)",
          "display": true
        }
      }
    ],
    "answer": "2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, English revised 2025, Exercise 2.3 Q9, printed p. 51, PDF p. 57. Source cross-checked; Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "verified modulo reasoning; original source-text cross-checked"
  }
];
const allIds=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(q=>q.id)));
if(entries.some(q=>allIds.has(q.id)))throw Error('Duplicate Exercise 2.3 modular question ID');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const q of entries){grade.items.push(q);chapter.textbookQuestionIds.push(q.id);}
window.TRIGGLE_G10_CH2_MODULAR_ADDED=Object.freeze({count:entries.length,questionNumbers:[1,2,3,4,8,9],verifiedEnglish:true,tamilEditorialPending:true});
})();
