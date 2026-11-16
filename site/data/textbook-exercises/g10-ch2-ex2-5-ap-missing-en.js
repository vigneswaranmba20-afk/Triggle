/* TRACE Grade 10 Exercise 2.5: six missing textbook parts, 2025 English.
 * Original PDF SHA256 602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d.
 * Printed pp. 61–62 (PDF pp. 67–68), independently visually checked.
 * Released through guarded student loader; no additional video, network or translations.
 * 15 already-present student tasks must remain unchanged.
 */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10], chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Exercise 2.5 source data unavailable');
const entries=[
  {
    "id": "c10-2-ex2-5-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q1(i)",
      "ta": "Exercise 2.5 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "See a constant difference even with a variable"
    },
    "q": {
      "en": "Check whether the sequence a − 3, a − 5, a − 7, … is an arithmetic progression."
    },
    "steps": [
      {
        "en": "In an A.P., each next term minus the preceding term must be the same. The symbol a cancels when we subtract.",
        "eq": "(a − 5) − (a − 3) = −2",
        "math": {
          "latex": "(a-5)-(a-3)=-2",
          "fallback": "(a − 5) − (a − 3) = −2",
          "display": true
        }
      },
      {
        "en": "Check the next gap independently.",
        "eq": "(a − 7) − (a − 5) = −2",
        "math": {
          "latex": "(a-7)-(a-5)=-2",
          "fallback": "(a − 7) − (a − 5) = −2",
          "display": true
        }
      },
      {
        "en": "The nth term follows tₙ = a − (2n + 1), so tₙ₊₁ − tₙ = [a − (2n + 3)] − [a − (2n + 1)] = −2 for every positive integer n. Therefore the common difference is constant for the entire sequence, for any fixed real a.",
        "eq": "tₙ₊₁ − tₙ = [a − (2n + 3)] − [a − (2n + 1)] = −2",
        "math": {
          "latex": "t_{n+1}-t_n=\\bigl[a-(2n+3)\\bigr]-\\bigl[a-(2n+1)\\bigr]=-2",
          "fallback": "tₙ₊₁ − tₙ = [a − (2n + 3)] − [a − (2n + 1)] = −2",
          "display": true
        }
      }
    ],
    "answer": "Yes, an A.P. with common difference −2.",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q1(i); printed p. 61, PDF p. 67; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-5-q1-v",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q1(v)",
      "ta": "Exercise 2.5 · Q1(v) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Repeating terms do not always form an A.P."
    },
    "q": {
      "en": "Check whether 1, −1, 1, −1, 1, −1, … is an arithmetic progression."
    },
    "steps": [
      {
        "en": "Find the change from the first term to the second.",
        "eq": "−1 − 1 = −2",
        "math": {
          "latex": "-1-1=-2",
          "fallback": "−1 − 1 = −2",
          "display": true
        }
      },
      {
        "en": "Find the change from the second term to the third. This time the change goes the other way.",
        "eq": "1 − (−1) = 2",
        "math": {
          "latex": "1-(-1)=2",
          "fallback": "1 − (−1) = 2",
          "display": true
        }
      },
      {
        "en": "The two consecutive differences are unequal. A repeating pattern is not enough to make an A.P.",
        "eq": "−2 ≠ 2",
        "math": {
          "latex": "-2\\ne2",
          "fallback": "−2 ≠ 2",
          "display": true
        }
      }
    ],
    "answer": "No, this is not an A.P.",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q1(v); printed p. 61, PDF p. 67; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-5-q2-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q2(iii)",
      "ta": "Exercise 2.5 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Build an A.P. using fractions"
    },
    "q": {
      "en": "Write the A.P. whose first term is a = 3/4 and whose common difference is d = 1/2."
    },
    "steps": [
      {
        "en": "Write the first term exactly as given. Express the difference as quarters so addition is easier.",
        "eq": "a₁ = 3/4, d = 1/2 = 2/4",
        "math": {
          "latex": "a_1=\\frac34,\\quad d=\\frac12=\\frac24",
          "fallback": "a₁ = 3/4, d = 1/2 = 2/4",
          "display": true
        }
      },
      {
        "en": "Add the difference to get the next two terms.",
        "eq": "a₂ = 3/4 + 2/4 = 5/4; a₃ = 5/4 + 2/4 = 7/4",
        "math": {
          "latex": "a_2=\\frac34+\\frac24=\\frac54,\\quad a_3=\\frac54+\\frac24=\\frac74",
          "fallback": "a₂ = 3/4 + 2/4 = 5/4; a₃ = 5/4 + 2/4 = 7/4",
          "display": true
        }
      },
      {
        "en": "Continue once more and verify that each jump is 1/2.",
        "eq": "a₄ = 7/4 + 2/4 = 9/4",
        "math": {
          "latex": "a_4=\\frac74+\\frac24=\\frac94",
          "fallback": "a₄ = 7/4 + 2/4 = 9/4",
          "display": true
        }
      },
      {
        "en": "To find any term, start with 3/4 and add the common difference 1/2 exactly n − 1 times. This rule reproduces every term without repeatedly adding fractions.",
        "eq": "aₙ = 3/4 + (n − 1)/2 = (2n + 1)/4",
        "math": {
          "latex": "a_n=\\frac34+\\frac{n-1}{2}=\\frac{2n+1}{4}",
          "fallback": "aₙ = 3/4 + (n − 1)/2 = (2n + 1)/4",
          "display": true
        }
      }
    ],
    "answer": "3/4, 5/4, 7/4, 9/4, …",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q2(iii); printed p. 61, PDF p. 67; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-5-q3-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q3(i)",
      "ta": "Exercise 2.5 · Q3(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Get a and d from an nth-term expression"
    },
    "q": {
      "en": "Find the first term a and the common difference d for the A.P. with nth term tₙ = −3 + 2n."
    },
    "steps": [
      {
        "en": "The first term means n = 1. Substitute n = 1 into the nth-term formula.",
        "eq": "t₁ = −3 + 2(1) = −1",
        "math": {
          "latex": "t_1=-3+2(1)=-1",
          "fallback": "t₁ = −3 + 2(1) = −1",
          "display": true
        }
      },
      {
        "en": "Substitute n = 2 to calculate the second term.",
        "eq": "t₂ = −3 + 2(2) = 1",
        "math": {
          "latex": "t_2=-3+2(2)=1",
          "fallback": "t₂ = −3 + 2(2) = 1",
          "display": true
        }
      },
      {
        "en": "Subtract consecutive terms to find the constant difference.",
        "eq": "d = t₂ − t₁ = 1 − (−1) = 2",
        "math": {
          "latex": "d=t_2-t_1=1-(-1)=2",
          "fallback": "d = t₂ − t₁ = 1 − (−1) = 2",
          "display": true
        }
      },
      {
        "en": "Check that this difference holds between every pair of consecutive terms, not just the first two. Replace n with n + 1 in the given formula and subtract.",
        "eq": "tₙ₊₁ − tₙ = [−3 + 2(n + 1)] − [−3 + 2n] = 2",
        "math": {
          "latex": "t_{n+1}-t_n=[-3+2(n+1)]-[-3+2n]=2",
          "fallback": "tₙ₊₁ − tₙ = [−3 + 2(n + 1)] − [−3 + 2n] = 2",
          "display": true
        }
      }
    ],
    "answer": "First term a = −1; common difference d = 2.",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q3(i); printed p. 62, PDF p. 68; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-5-q3-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q3(ii)",
      "ta": "Exercise 2.5 · Q3(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Interpret a negative common difference"
    },
    "q": {
      "en": "Find the first term a and the common difference d for the A.P. with nth term tₙ = 4 − 7n."
    },
    "steps": [
      {
        "en": "At n = 1, the formula gives the first term.",
        "eq": "t₁ = 4 − 7(1) = −3",
        "math": {
          "latex": "t_1=4-7(1)=-3",
          "fallback": "t₁ = 4 − 7(1) = −3",
          "display": true
        }
      },
      {
        "en": "Calculate the next term by substituting n = 2.",
        "eq": "t₂ = 4 − 7(2) = −10",
        "math": {
          "latex": "t_2=4-7(2)=-10",
          "fallback": "t₂ = 4 − 7(2) = −10",
          "display": true
        }
      },
      {
        "en": "The common difference is the second term minus the first; a negative difference means the terms decrease.",
        "eq": "d = −10 − (−3) = −7",
        "math": {
          "latex": "d=-10-(-3)=-7",
          "fallback": "d = −10 − (−3) = −7",
          "display": true
        }
      },
      {
        "en": "Confirm that the common difference stays negative for every positive integer n. Subtract the nth term from the next term.",
        "eq": "tₙ₊₁ − tₙ = [4 − 7(n + 1)] − [4 − 7n] = −7",
        "math": {
          "latex": "t_{n+1}-t_n=[4-7(n+1)]-[4-7n]=-7",
          "fallback": "tₙ₊₁ − tₙ = [4 − 7(n + 1)] − [4 − 7n] = −7",
          "display": true
        }
      }
    ],
    "answer": "First term a = −3; common difference d = −7.",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q3(ii); printed p. 62, PDF p. 68; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-5-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences — Arithmetic Progression"
    },
    "label": {
      "en": "Exercise 2.5 · Q8",
      "ta": "Exercise 2.5 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Use the middle-term property of three A.P. terms"
    },
    "q": {
      "en": "If 3 + k, 18 − k, 5k + 1 are in A.P., find k."
    },
    "steps": [
      {
        "en": "For any three numbers in A.P., the middle number is the average of the first and third. This is the condition 2b = a + c.",
        "eq": "2(18 − k) = (3 + k) + (5k + 1)",
        "math": {
          "latex": "2(18-k)=(3+k)+(5k+1)",
          "fallback": "2(18 − k) = (3 + k) + (5k + 1)",
          "display": true
        }
      },
      {
        "en": "Expand both sides carefully; the third term contains 5k, not 5 + k.",
        "eq": "36 − 2k = 4 + 6k",
        "math": {
          "latex": "36-2k=4+6k",
          "fallback": "36 − 2k = 4 + 6k",
          "display": true
        }
      },
      {
        "en": "Collect numbers on the left and k terms on the right.",
        "eq": "32 = 8k, so k = 4",
        "math": {
          "latex": "32=8k,\\qquad k=4",
          "fallback": "32 = 8k, so k = 4",
          "display": true
        }
      },
      {
        "en": "Check by replacing k with 4: the three numbers become 7, 14, 21, and both gaps are 7.",
        "eq": "14 − 7 = 21 − 14 = 7",
        "math": {
          "latex": "14-7=21-14=7",
          "fallback": "14 − 7 = 21 − 14 = 7",
          "display": true
        }
      }
    ],
    "answer": "k = 4.",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.5 Q8; printed p. 62, PDF p. 68; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const oldIds=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(x=>x.id)));
if(entries.some(item=>oldIds.has(item.id)))throw Error('Duplicate Grade 10 Exercise 2.5 textbook ID');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G10_CH2_EX25_STAGED=Object.freeze({count:entries.length,parts:['Q1(i)','Q1(v)','Q2(iii)','Q3(i)','Q3(ii)','Q8'],sourcePages:[67,68],tamilReview:'pending',chapterComplete:false});
})();
