/* TRACE Grade 10 Chapter 2: source-text-checked English textbook exercises.
 * Verified against user-connected 2025 Tamil Nadu Standard Ten Mathematics PDF.
 * Gaps/ambiguous visual maths withheld; this is NOT a claim of full chapter coverage.
 * Tamil source content pending. Existing 2.1/2.2 exercises and Q8 quarantine preserved. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==="2");
if(!grade||!chapter)throw Error('TRACE g10-ch2 dependencies missing');
const entries=[
  {
    "id": "c10-2-ex2-3-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q5",
      "ta": "Exercise 2.3 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Clock arithmetic"
    },
    "q": {
      "en": "What is the time 100 hours after 7 a.m.?"
    },
    "steps": [
      {
        "en": "First remove complete 24-hour days. Full days return the clock to its starting time.",
        "eq": "100 = 24 × 4 + 4",
        "math": {
          "latex": "100=24(4)+4",
          "fallback": "100 = 24 × 4 + 4",
          "display": true
        }
      },
      {
        "en": "Only four hours change the time shown on the clock.",
        "eq": "7 a.m. + 4 hours = 11 a.m.",
        "math": {
          "latex": "7+4=11",
          "fallback": "7 a.m. + 4 hours = 11 a.m.",
          "display": true
        }
      }
    ],
    "answer": "11 a.m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.3 Q5; printed p. 51; PDF p. 57. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-3-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q6",
      "ta": "Exercise 2.3 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "Count backwards on a clock"
    },
    "q": {
      "en": "What is the time 15 hours before 11 p.m.?"
    },
    "steps": [
      {
        "en": "11 p.m. is 23:00 in the 24-hour clock.",
        "eq": "11 p.m. = 23:00"
      },
      {
        "en": "Subtract the elapsed time, then return to the 12-hour clock.",
        "eq": "23 − 15 = 8",
        "math": {
          "latex": "23-15=8",
          "fallback": "23 − 15 = 8",
          "display": true
        }
      }
    ],
    "answer": "8 a.m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.3 Q6; printed p. 51; PDF p. 57. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-3-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q7",
      "ta": "Exercise 2.3 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "Days repeat every seven"
    },
    "q": {
      "en": "Today is Tuesday. My uncle will come after 45 days. On which day will he come?"
    },
    "steps": [
      {
        "en": "Every seven days we return to Tuesday; count the leftover days only.",
        "eq": "45 = 7 × 6 + 3",
        "math": {
          "latex": "45=7(6)+3",
          "fallback": "45 = 7 × 6 + 3",
          "display": true
        }
      },
      {
        "en": "Move three days after Tuesday: Wednesday, Thursday, Friday.",
        "eq": "Tuesday + 3 days = Friday"
      }
    ],
    "answer": "Friday.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.3 Q7; printed p. 51; PDF p. 57. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-3-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.3",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.3 · Q10",
      "ta": "Exercise 2.3 · Q10 (English only; Tamil pending)"
    },
    "title": {
      "en": "International time offset"
    },
    "q": {
      "en": "A flight from Chennai to London takes approximately 11 hours. It leaves on Sunday at 23:30 hours. Chennai is 4½ hours ahead of London. Find the London arrival day and time."
    },
    "steps": [
      {
        "en": "Add the 11-hour flight duration to departure time in Chennai.",
        "eq": "Sunday 23:30 + 11 h = Monday 10:30 (Chennai time)"
      },
      {
        "en": "London is 4½ hours behind Chennai under the stated offset.",
        "eq": "Monday 10:30 − 4:30 = Monday 06:00 (London time)"
      }
    ],
    "answer": "Monday, 6:00 a.m. London time, using the textbook's fixed 4½-hour time difference.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.3 Q10; printed p. 52; PDF p. 58. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-4-q1",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q1",
      "ta": "Exercise 2.4 · Q1 (English only; Tamil pending)"
    },
    "title": {
      "en": "Next terms of three sequences"
    },
    "q": {
      "en": "Find the next three terms: (i) 8, 24, 72, … (ii) 5, 1, −3, … (iii) 1/4, 2/9, 3/16, …"
    },
    "steps": [
      {
        "en": "In (i) each term is multiplied by 3.",
        "eq": "72 × 3 = 216; 216 × 3 = 648; 648 × 3 = 1944"
      },
      {
        "en": "In (ii) the common difference is −4.",
        "eq": "−3 − 4 = −7; −7 − 4 = −11; −11 − 4 = −15"
      },
      {
        "en": "In (iii) numerators count upward; denominators are squares of the next integer.",
        "eq": "4/25, 5/36, 6/49",
        "math": {
          "latex": "\\frac4{25},\\ \\frac5{36},\\ \\frac6{49}",
          "fallback": "4/25, 5/36, 6/49",
          "display": true
        }
      }
    ],
    "answer": "(i) 216, 648, 1944; (ii) −7, −11, −15; (iii) 4/25, 5/36, 6/49.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.4 Q1; printed p. 55; PDF p. 61. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q4",
      "ta": "Exercise 2.5 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find the 19th A.P. term"
    },
    "q": {
      "en": "Find the 19th term of the A.P. −11, −15, −19, …"
    },
    "steps": [
      {
        "en": "Identify the first term and common difference.",
        "eq": "a = −11, d = −4"
      },
      {
        "en": "Use n−1 jumps, not n jumps, from the first term.",
        "eq": "a₁₉ = −11 + 18(−4) = −83",
        "math": {
          "latex": "a_{19}=-11+18(-4)=-83",
          "fallback": "a₁₉ = −11 + 18(−4) = −83",
          "display": true
        }
      }
    ],
    "answer": "−83.",
    "answerMath": {
      "latex": "-83",
      "fallback": "−83.",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q4; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q5",
      "ta": "Exercise 2.5 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Identify the term number"
    },
    "q": {
      "en": "Which term of the A.P. 16, 11, 6, 1, … is −54?"
    },
    "steps": [
      {
        "en": "The progression begins at 16 and decreases by 5 each step.",
        "eq": "a = 16, d = −5"
      },
      {
        "en": "Set the nth term equal to −54 and solve.",
        "eq": "16 − 5(n−1) = −54 ⇒ n = 15",
        "math": {
          "latex": "16-5(n-1)=-54\\implies n=15",
          "fallback": "16 − 5(n−1) = −54 ⇒ n = 15",
          "display": true
        }
      }
    ],
    "answer": "15th term.",
    "answerMath": {
      "latex": "n=15",
      "fallback": "15th term.",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q5; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q6",
      "ta": "Exercise 2.5 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "The two middle terms"
    },
    "q": {
      "en": "Find the middle term(s) of the A.P. 9, 15, 21, 27, …, 183."
    },
    "steps": [
      {
        "en": "Calculate how many terms the A.P. has.",
        "eq": "183 = 9 + (n−1) × 6 ⇒ n = 30",
        "math": {
          "latex": "183=9+6(n-1)\\implies n=30",
          "fallback": "183 = 9 + (n−1) × 6 ⇒ n = 30",
          "display": true
        }
      },
      {
        "en": "There are 30 terms, so the central positions are 15 and 16.",
        "eq": "a₁₅ = 9 + 14 × 6 = 93; a₁₆ = 99",
        "math": {
          "latex": "a_{15}=93,\\quad a_{16}=99",
          "fallback": "a₁₅ = 9 + 14 × 6 = 93; a₁₆ = 99",
          "display": true
        }
      }
    ],
    "answer": "93 and 99.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q6; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q7",
      "ta": "Exercise 2.5 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find and explain the reason"
    },
    "q": {
      "en": "If nine times the 9th term of an A.P. equals fifteen times its 15th term, show that six times the 24th term is zero."
    },
    "steps": [
      {
        "en": "Write the 9th and 15th terms using the first term a and difference d.",
        "eq": "9(a+8d)=15(a+14d)"
      },
      {
        "en": "Rearrange: 9a+72d=15a+210d, so 6a+138d=0.",
        "eq": "a+23d=0"
      },
      {
        "en": "But the 24th term is a+23d, so it is zero.",
        "eq": "6t₂₄=6(a+23d)=0"
      }
    ],
    "answer": "6t₂₄ = 0.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q7; printed p. 62, PDF p. 68. English source text and derivation checked.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; exact algebra verified"
  },
  {
    "id": "c10-2-ex2-5-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q9",
      "ta": "Exercise 2.5 · Q9 (English only; Tamil pending)"
    },
    "title": {
      "en": "Five terms in an A.P."
    },
    "q": {
      "en": "Find x, y and z if x, 10, y, 24, z are in A.P."
    },
    "steps": [
      {
        "en": "Terms 10 and 24 are two positions apart; divide the change by two.",
        "eq": "d = (24−10)/2 = 7",
        "math": {
          "latex": "d=\\frac{24-10}{2}=7",
          "fallback": "d = (24−10)/2 = 7",
          "display": true
        }
      },
      {
        "en": "Step back for x, forward once for y, and forward twice for z.",
        "eq": "x = 3, y = 17, z = 31"
      }
    ],
    "answer": "x = 3, y = 17, z = 31.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q9; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q10",
      "ta": "Exercise 2.5 · Q10 (English only; Tamil pending)"
    },
    "title": {
      "en": "The last theatre row"
    },
    "q": {
      "en": "A theatre has 20 seats in its front row and 30 rows. Each next row has 2 more seats. How many seats are in the last row?"
    },
    "steps": [
      {
        "en": "The first row has 20 seats. Reaching row 30 takes 29 increases.",
        "eq": "a = 20, d = 2, n = 30"
      },
      {
        "en": "Apply the A.P. term formula.",
        "eq": "a₃₀ = 20 + 29 × 2 = 78",
        "math": {
          "latex": "a_{30}=20+29(2)=78",
          "fallback": "a₃₀ = 20 + 29 × 2 = 78",
          "display": true
        }
      }
    ],
    "answer": "78 seats.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q10; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q11",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q11",
      "ta": "Exercise 2.5 · Q11 (English only; Tamil pending)"
    },
    "title": {
      "en": "Three A.P. terms from sum and product"
    },
    "q": {
      "en": "The sum of three consecutive terms in A.P. is 27 and their product is 288. Find the three terms."
    },
    "steps": [
      {
        "en": "Represent the consecutive A.P. terms symmetrically: 9−d, 9 and 9+d.",
        "eq": "(9−d)+9+(9+d)=27"
      },
      {
        "en": "Use their product to find the common difference.",
        "eq": "9(81−d²)=288 ⇒ d²=49",
        "math": {
          "latex": "9(81-d^2)=288\\implies d^2=49",
          "fallback": "9(81−d²)=288 ⇒ d²=49",
          "display": true
        }
      },
      {
        "en": "With d = 7 the terms are 2, 9, 16 (the reversed order also works).",
        "eq": "2 × 9 × 16 = 288"
      }
    ],
    "answer": "2, 9 and 16 (or in reverse order).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q11; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q12",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q12",
      "ta": "Exercise 2.5 · Q12 (English only; Tamil pending)"
    },
    "title": {
      "en": "Ratio of A.P. terms"
    },
    "q": {
      "en": "The ratio of the 6th to the 8th term of an A.P. is 7:9. Find the ratio of the 9th to the 13th term."
    },
    "steps": [
      {
        "en": "Write a₆=a+5d and a₈=a+7d, then cross multiply.",
        "eq": "9(a+5d)=7(a+7d) ⇒ a=2d",
        "math": {
          "latex": "9(a+5d)=7(a+7d)\\implies a=2d",
          "fallback": "9(a+5d)=7(a+7d) ⇒ a=2d",
          "display": true
        }
      },
      {
        "en": "Now evaluate the requested terms using a=2d.",
        "eq": "a₉=10d; a₁₃=14d ⇒ 10:14=5:7",
        "math": {
          "latex": "a_9:a_{13}=10d:14d=5:7",
          "fallback": "a₉=10d; a₁₃=14d ⇒ 10:14=5:7",
          "display": true
        }
      }
    ],
    "answer": "5:7.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q12; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q13",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q13",
      "ta": "Exercise 2.5 · Q13 (English only; Tamil pending)"
    },
    "title": {
      "en": "Five days of A.P. temperatures"
    },
    "q": {
      "en": "The temperatures from Monday to Friday are in A.P. The Monday–Wednesday sum is 0°C and the Wednesday–Friday sum is 18°C. Find each day's temperature."
    },
    "steps": [
      {
        "en": "Let Monday be a and the daily change be d. The first three days sum to zero.",
        "eq": "3a+3d=0 ⇒ a=−d",
        "math": {
          "latex": "3a+3d=0\\implies a=-d",
          "fallback": "3a+3d=0 ⇒ a=−d",
          "display": true
        }
      },
      {
        "en": "The last three days sum to 18 degrees.",
        "eq": "3a+9d=18 ⇒ 6d=18 ⇒ d=3",
        "math": {
          "latex": "3a+9d=18\\implies d=3",
          "fallback": "3a+9d=18 ⇒ 6d=18 ⇒ d=3",
          "display": true
        }
      },
      {
        "en": "Use a=−3 and increase by 3 each day; verify both sums.",
        "eq": "−3, 0, 3, 6, 9 (°C)"
      }
    ],
    "answer": "Monday −3°C, Tuesday 0°C, Wednesday 3°C, Thursday 6°C, Friday 9°C.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q13; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-5-q14",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q14",
      "ta": "Exercise 2.5 · Q14 (English only; Tamil pending)"
    },
    "title": {
      "en": "Salary minus expenses"
    },
    "q": {
      "en": "Priya earns ₹15,000 monthly at first, increasing ₹1,500 annually. Her initial monthly expenses are ₹13,000, increasing ₹900 annually. When can she save ₹20,000 each month?"
    },
    "steps": [
      {
        "en": "Monthly savings begin at 15,000−13,000=2,000 and grow by 1,500−900=600 each year.",
        "eq": "First-year saving ₹2,000; annual increase ₹600"
      },
      {
        "en": "Set the monthly saving in year n equal to 20,000.",
        "eq": "2,000 + 600(n−1) = 20,000 ⇒ n = 31",
        "math": {
          "latex": "2000+600(n-1)=20000\\implies n=31",
          "fallback": "2,000 + 600(n−1) = 20,000 ⇒ n = 31",
          "display": true
        }
      }
    ],
    "answer": "From the 31st year (after 30 annual increases).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.5 Q14; printed p. 62; PDF p. 68. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q1",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q1",
      "ta": "Exercise 2.6 · Q1 (English only; Tamil pending)"
    },
    "title": {
      "en": "Sum of two arithmetic series"
    },
    "q": {
      "en": "Find (i) the sum of 3, 7, 11, … up to 40 terms and (ii) the sum of 102, 97, 92, … up to 27 terms."
    },
    "steps": [
      {
        "en": "For (i), use a=3, d=4, n=40 in the sum formula.",
        "eq": "S₄₀ = 40/2[2×3+39×4] = 3240",
        "math": {
          "latex": "S_{40}=\\frac{40}{2}[6+39(4)]=3240",
          "fallback": "S₄₀ = 40/2[2×3+39×4] = 3240",
          "display": true
        }
      },
      {
        "en": "For (ii), the common difference is −5; there are 27 terms.",
        "eq": "S₂₇ = 27/2[2×102+26×(−5)] = 999",
        "math": {
          "latex": "S_{27}=\\frac{27}{2}[204+26(-5)]=999",
          "fallback": "S₂₇ = 27/2[2×102+26×(−5)] = 999",
          "display": true
        }
      }
    ],
    "answer": "(i) 3240; (ii) 999.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q1; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q2",
      "ta": "Exercise 2.6 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "How many odd terms sum to 480?"
    },
    "q": {
      "en": "How many consecutive odd integers, beginning with 5, sum to 480?"
    },
    "steps": [
      {
        "en": "The terms are 5, 7, 9, … with first term 5 and common difference 2.",
        "eq": "a = 5, d = 2"
      },
      {
        "en": "Set the A.P. sum to 480 and simplify.",
        "eq": "n/2[10+2(n−1)] = n(n+4) = 480",
        "math": {
          "latex": "\\frac n2[10+2(n-1)]=n(n+4)=480",
          "fallback": "n/2[10+2(n−1)] = n(n+4) = 480",
          "display": true
        }
      },
      {
        "en": "Only the positive solution represents a number of terms.",
        "eq": "n²+4n−480=0 ⇒ (n−20)(n+24)=0 ⇒ n=20",
        "math": {
          "latex": "(n-20)(n+24)=0\\implies n=20",
          "fallback": "n²+4n−480=0 ⇒ (n−20)(n+24)=0 ⇒ n=20",
          "display": true
        }
      }
    ],
    "answer": "20 terms.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q2; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q5",
      "ta": "Exercise 2.6 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Sum from two given A.P. terms"
    },
    "q": {
      "en": "The 104th term and 4th term of an A.P. are 125 and 0. Find the sum of its first 35 terms."
    },
    "steps": [
      {
        "en": "Subtract the two term equations to eliminate the first term.",
        "eq": "(a+103d)−(a+3d)=125 ⇒ 100d=125 ⇒ d=1.25",
        "math": {
          "latex": "100d=125\\implies d=1.25",
          "fallback": "(a+103d)−(a+3d)=125 ⇒ 100d=125 ⇒ d=1.25",
          "display": true
        }
      },
      {
        "en": "Use the 4th term to find the first term.",
        "eq": "a+3(1.25)=0 ⇒ a=−3.75",
        "math": {
          "latex": "a=-3.75",
          "fallback": "a+3(1.25)=0 ⇒ a=−3.75",
          "display": true
        }
      },
      {
        "en": "Calculate the first 35 terms' sum.",
        "eq": "S₃₅ = 35/2[−7.5 + 34(1.25)] = 612.5",
        "math": {
          "latex": "S_{35}=\\frac{35}{2}[-7.5+34(1.25)]=612.5",
          "fallback": "S₃₅ = 35/2[−7.5 + 34(1.25)] = 612.5",
          "display": true
        }
      }
    ],
    "answer": "612.5.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q5; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q6",
      "ta": "Exercise 2.6 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "Sum of odd numbers below 450"
    },
    "q": {
      "en": "Find the sum of all odd positive integers less than 450."
    },
    "steps": [
      {
        "en": "The odd positive numbers below 450 run from 1 to 449.",
        "eq": "1, 3, 5, …, 449"
      },
      {
        "en": "There are 225 terms; the first n odd positives sum to n².",
        "eq": "n = (449+1)/2 = 225 ⇒ S=225²=50,625",
        "math": {
          "latex": "n=225,\\quad S=225^2=50625",
          "fallback": "n = (449+1)/2 = 225 ⇒ S=225²=50,625",
          "display": true
        }
      }
    ],
    "answer": "50,625.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q6; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q7",
      "ta": "Exercise 2.6 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find and explain the reason"
    },
    "q": {
      "en": "Find the sum of all natural numbers between 602 and 902 which are not divisible by 4."
    },
    "steps": [
      {
        "en": "The integers strictly between 602 and 902 are 603 to 901.",
        "eq": "Number of integers = 901−603+1 = 299"
      },
      {
        "en": "Their total is the sum of an A.P. with first term 603 and last term 901.",
        "eq": "(603+901)×299/2 = 224,848"
      },
      {
        "en": "The multiples of four in this interval are 604, 608, …, 900, a sequence of 75 terms.",
        "eq": "(604+900)×75/2 = 56,400"
      },
      {
        "en": "Subtract all multiples of four from the total.",
        "eq": "224,848−56,400 = 168,448"
      }
    ],
    "answer": "168,448.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q7; printed p. 67, PDF p. 73. English source text and derivation checked.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; exact algebra verified"
  },
  {
    "id": "c10-2-ex2-6-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q8",
      "ta": "Exercise 2.6 · Q8 (English only; Tamil pending)"
    },
    "title": {
      "en": "Laptop instalments as an A.P."
    },
    "q": {
      "en": "A laptop costs ₹40,000 in cash or 10 instalments starting ₹4,800, decreasing by ₹50 each month. Find (i) total instalments and (ii) extra cost."
    },
    "steps": [
      {
        "en": "Payments form an A.P. with a=4800, d=−50, n=10.",
        "eq": "₹4,800, ₹4,750, ₹4,700, …"
      },
      {
        "en": "Sum the ten payments.",
        "eq": "S₁₀ = 10/2[9,600+9(−50)] = ₹45,750",
        "math": {
          "latex": "S_{10}=\\frac{10}{2}[9600-450]=45750",
          "fallback": "S₁₀ = 10/2[9,600+9(−50)] = ₹45,750",
          "display": true
        }
      },
      {
        "en": "Subtract the cash price to find the additional cost.",
        "eq": "₹45,750 − ₹40,000 = ₹5,750"
      }
    ],
    "answer": "(i) ₹45,750; (ii) ₹5,750 extra.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q8; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q9",
      "ta": "Exercise 2.6 · Q9 (English only; Tamil pending)"
    },
    "title": {
      "en": "Pay off a loan with increasing instalments"
    },
    "q": {
      "en": "A man repays ₹65,000 starting with ₹400 the first month, increasing each monthly payment by ₹300. After how many months is the loan cleared?"
    },
    "steps": [
      {
        "en": "Payments form an A.P. with a=400, d=300. Set the accumulated payments equal to ₹65,000.",
        "eq": "n/2[800+300(n−1)]=65000",
        "math": {
          "latex": "\\frac n2[800+300(n-1)]=65000",
          "fallback": "n/2[800+300(n−1)]=65000",
          "display": true
        }
      },
      {
        "en": "Rearrange to a quadratic and solve for positive n.",
        "eq": "3n²+5n−1300=0 ⇒ (n−20)(3n+65)=0",
        "math": {
          "latex": "(n-20)(3n+65)=0",
          "fallback": "3n²+5n−1300=0 ⇒ (n−20)(3n+65)=0",
          "display": true
        }
      },
      {
        "en": "Reject the negative root. Verify 20 payments total ₹65,000.",
        "eq": "n = 20; S₂₀ = 10(800+5700) = 65,000",
        "math": {
          "latex": "n=20,\\quad S_{20}=65000",
          "fallback": "n = 20; S₂₀ = 10(800+5700) = 65,000",
          "display": true
        }
      }
    ],
    "answer": "20 months.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q9; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-6-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q10",
      "ta": "Exercise 2.6 · Q10 (English only; Tamil pending)"
    },
    "title": {
      "en": "Bricks in a staircase"
    },
    "q": {
      "en": "A staircase has 30 steps. The bottom needs 100 bricks and each higher step needs 2 fewer. Find (i) bricks at the top and (ii) the total bricks."
    },
    "steps": [
      {
        "en": "There are 29 decreases between the bottom and the 30th step.",
        "eq": "Top = 100−29×2 = 42"
      },
      {
        "en": "Sum the 30-step A.P., starting at 100 and ending at 42.",
        "eq": "S₃₀ = 30(100+42)/2 = 2130",
        "math": {
          "latex": "S_{30}=\\frac{30(100+42)}2=2130",
          "fallback": "S₃₀ = 30(100+42)/2 = 2130",
          "display": true
        }
      }
    ],
    "answer": "(i) 42 bricks; (ii) 2,130 bricks.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.6 Q10; printed p. 67; PDF p. 73. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q2",
      "ta": "Exercise 2.7 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "Write G.P. terms from a and r"
    },
    "q": {
      "en": "Write the first three G.P. terms when (i) a=6, r=3 (ii) a=2, r=2 (iii) a=1000, r=2/5."
    },
    "steps": [
      {
        "en": "For a G.P. write a, ar, ar²; each term multiplies by the same ratio.",
        "eq": "a, ar, ar²",
        "math": {
          "latex": "a,\\ ar,\\ ar^2",
          "fallback": "a, ar, ar²",
          "display": true
        }
      },
      {
        "en": "Substitute (i) and (ii).",
        "eq": "(i) 6, 18, 54; (ii) 2, 4, 8"
      },
      {
        "en": "For (iii), multiplying by 2/5 gives progressively smaller terms.",
        "eq": "(iii) 1000, 400, 160",
        "math": {
          "latex": "1000,\\ 1000\\frac25=400,\\ 400\\frac25=160",
          "fallback": "(iii) 1000, 400, 160",
          "display": true
        }
      }
    ],
    "answer": "(i) 6, 18, 54; (ii) 2, 4, 8; (iii) 1000, 400, 160.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q2; printed p. 72; PDF p. 78. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q3",
      "ta": "Exercise 2.7 · Q3 (English only; Tamil pending)"
    },
    "title": {
      "en": "Seventh G.P. term"
    },
    "q": {
      "en": "In the G.P. 729, 243, 81, … find the seventh term."
    },
    "steps": [
      {
        "en": "The ratio is one third, as each term is divided by 3.",
        "eq": "a=729, r=1/3"
      },
      {
        "en": "Use the n−1 exponent in the G.P. term formula.",
        "eq": "a₇ = 729(1/3)⁶ = 1",
        "math": {
          "latex": "a_7=729\\left(\\frac13\\right)^6=1",
          "fallback": "a₇ = 729(1/3)⁶ = 1",
          "display": true
        }
      }
    ],
    "answer": "1.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q3; printed p. 72; PDF p. 78. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q4",
      "ta": "Exercise 2.7 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Three consecutive G.P. terms"
    },
    "q": {
      "en": "Find x so that x+6, x+12, x+15 are consecutive terms in a G.P."
    },
    "steps": [
      {
        "en": "The middle term squared equals the product of its two neighbours.",
        "eq": "(x+12)²=(x+6)(x+15)",
        "math": {
          "latex": "(x+12)^2=(x+6)(x+15)",
          "fallback": "(x+12)²=(x+6)(x+15)",
          "display": true
        }
      },
      {
        "en": "Expand and solve for x.",
        "eq": "x²+24x+144=x²+21x+90 ⇒ x=−18",
        "math": {
          "latex": "3x=-54\\implies x=-18",
          "fallback": "x²+24x+144=x²+21x+90 ⇒ x=−18",
          "display": true
        }
      },
      {
        "en": "Verify that −12, −6, −3 has a constant ratio 1/2.",
        "eq": "−12, −6, −3; ratio = 1/2"
      }
    ],
    "answer": "x = −18.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q4; printed p. 72; PDF p. 78. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q5",
      "ta": "Exercise 2.7 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Number of terms in a G.P."
    },
    "q": {
      "en": "Find the number of terms of (i) 4, 8, 16, …, 8192 and (ii) 1/3, 1/9, 1/27, …, 1/2187."
    },
    "steps": [
      {
        "en": "For (i), both the first and last terms are powers of 2.",
        "eq": "4=2², 8192=2¹³; 2²×2⁽ⁿ⁻¹⁾=2¹³ ⇒ n=12",
        "math": {
          "latex": "2^2\\,2^{n-1}=2^{13}\\implies n=12",
          "fallback": "4=2², 8192=2¹³; 2²×2⁽ⁿ⁻¹⁾=2¹³ ⇒ n=12",
          "display": true
        }
      },
      {
        "en": "For (ii), the nth term is (1/3)ⁿ. The last is 3⁻⁷.",
        "eq": "(1/3)ⁿ=1/2187=3⁻⁷ ⇒ n=7",
        "math": {
          "latex": "\\left(\\frac13\\right)^n=3^{-7}\\implies n=7",
          "fallback": "(1/3)ⁿ=1/2187=3⁻⁷ ⇒ n=7",
          "display": true
        }
      }
    ],
    "answer": "(i) 12 terms; (ii) 7 terms.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q5; printed p. 73; PDF p. 79. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q6",
      "ta": "Exercise 2.7 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "Use two G.P. terms to find a third"
    },
    "q": {
      "en": "In a G.P., the ninth term is 32805 and sixth is 1215. Find the twelfth term."
    },
    "steps": [
      {
        "en": "Divide the terms three positions apart to find r cubed.",
        "eq": "r³=t₉/t₆=32805/1215=27 ⇒ r=3",
        "math": {
          "latex": "r^3=\\frac{32805}{1215}=27\\implies r=3",
          "fallback": "r³=t₉/t₆=32805/1215=27 ⇒ r=3",
          "display": true
        }
      },
      {
        "en": "Move three more positions from the ninth to the twelfth term.",
        "eq": "t₁₂=t₉r³=32805×27=885735",
        "math": {
          "latex": "t_{12}=32805\\cdot27=885735",
          "fallback": "t₁₂=t₉r³=32805×27=885735",
          "display": true
        }
      }
    ],
    "answer": "885,735.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q6; printed p. 73; PDF p. 79. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q7",
      "ta": "Exercise 2.7 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "Tenth term from eighth term"
    },
    "q": {
      "en": "Find the 10th term of a G.P. whose eighth term is 768 and ratio is 2."
    },
    "steps": [
      {
        "en": "From term 8 to term 10 there are exactly two multiplications by 2.",
        "eq": "t₁₀=t₈r²",
        "math": {
          "latex": "t_{10}=t_8r^2",
          "fallback": "t₁₀=t₈r²",
          "display": true
        }
      },
      {
        "en": "Each step of a G.P. multiplies by the ratio. From term 8 to term 10 there are two steps, so multiply 768 by 2² = 4.",
        "eq": "t₁₀ = 768 × 2² = 3072",
        "math": {
          "latex": "t_{10}=768\\cdot2^2=3072",
          "fallback": "t₁₀ = 768 × 2² = 3072",
          "display": true
        }
      }
    ],
    "answer": "3072.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q7; printed p. 73; PDF p. 79. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-7-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q8",
      "ta": "Exercise 2.7 · Q8 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find and explain the reason"
    },
    "q": {
      "en": "If a, b, c are in arithmetic progression, show that 3ᵃ, 3ᵇ, 3ᶜ are in geometric progression."
    },
    "steps": [
      {
        "en": "For three terms in A.P., the middle term is the average of its neighbours.",
        "eq": "2b = a+c"
      },
      {
        "en": "Raise 3 to both sides, then separate the product of powers.",
        "eq": "3²ᵇ = 3ᵃ⁺ᶜ = 3ᵃ × 3ᶜ"
      },
      {
        "en": "The middle term squared equals the product of the extremes; this is a defining G.P. property.",
        "eq": "(3ᵇ)² = 3ᵃ × 3ᶜ"
      }
    ],
    "answer": "3ᵃ, 3ᵇ, 3ᶜ form a G.P.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q8; printed p. 73, PDF p. 79. English source text and derivation checked.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; exact algebra verified"
  },
  {
    "id": "c10-2-ex2-7-q11",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q11",
      "ta": "Exercise 2.7 · Q11 (English only; Tamil pending)"
    },
    "title": {
      "en": "Compare two annual-growth salary offers"
    },
    "q": {
      "en": "Offer A starts at ₹20,000 with a 6% annual rise; Offer B starts at ₹22,000 with a 3% rise. Find the fourth-year salaries."
    },
    "steps": [
      {
        "en": "The fourth year follows three raises; do not apply four raises.",
        "eq": "t₄=a(1+r)³",
        "math": {
          "latex": "t_4=a(1+r)^3",
          "fallback": "t₄=a(1+r)³",
          "display": true
        }
      },
      {
        "en": "Compute each fourth-year salary separately.",
        "eq": "A: 20,000(1.06)³=₹23,820.32; B: 22,000(1.03)³≈₹24,039.39"
      },
      {
        "en": "Compare; B is larger in the fourth year by about ₹219.07.",
        "eq": "B−A≈₹219.07"
      }
    ],
    "answer": "Offer A: ₹23,820.32; Offer B: about ₹24,039.39; Offer B is larger.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.7 Q11; printed p. 73; PDF p. 79. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-8-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.8 · Q2",
      "ta": "Exercise 2.8 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "First six terms of a G.P. sum"
    },
    "q": {
      "en": "Find the sum of the first six terms of the G.P. 5, 15, 45, …"
    },
    "steps": [
      {
        "en": "The first term is 5, common ratio 3, and n=6.",
        "eq": "a=5, r=3, n=6"
      },
      {
        "en": "Use the finite geometric sum formula.",
        "eq": "S₆=5(3⁶−1)/(3−1)=1820",
        "math": {
          "latex": "S_6=5\\frac{3^6-1}{3-1}=1820",
          "fallback": "S₆=5(3⁶−1)/(3−1)=1820",
          "display": true
        }
      }
    ],
    "answer": "1820.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.8 Q2; printed p. 76; PDF p. 82. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-8-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.8 · Q3",
      "ta": "Exercise 2.8 · Q3 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find a missing first G.P. term"
    },
    "q": {
      "en": "Find the first term of a G.P. with common ratio 5 and sum of the first six terms 46872."
    },
    "steps": [
      {
        "en": "Apply the geometric sum formula with the first term a unknown.",
        "eq": "46872=a(5⁶−1)/(5−1)",
        "math": {
          "latex": "46872=a\\frac{5^6-1}{5-1}",
          "fallback": "46872=a(5⁶−1)/(5−1)",
          "display": true
        }
      },
      {
        "en": "Evaluate the multiplier and divide.",
        "eq": "46872=3906a ⇒ a=12",
        "math": {
          "latex": "a=\\frac{46872}{3906}=12",
          "fallback": "46872=3906a ⇒ a=12",
          "display": true
        }
      }
    ],
    "answer": "12.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.8 Q3; printed p. 76; PDF p. 82. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-8-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.8 · Q4",
      "ta": "Exercise 2.8 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Sum two infinite G.P. series"
    },
    "q": {
      "en": "Find the infinite sums of (i) 9+3+1+… and (ii) 21+14+28/3+…"
    },
    "steps": [
      {
        "en": "Both ratios have absolute value less than 1, so finite limits exist.",
        "eq": "(i) r=1/3; (ii) r=2/3"
      },
      {
        "en": "Apply S∞=a/(1−r) for the first series.",
        "eq": "(i) 9/(1−1/3)=27/2",
        "math": {
          "latex": "\\frac9{1-\\frac13}=\\frac{27}2",
          "fallback": "(i) 9/(1−1/3)=27/2",
          "display": true
        }
      },
      {
        "en": "Repeat for the second series.",
        "eq": "(ii) 21/(1−2/3)=63",
        "math": {
          "latex": "\\frac{21}{1-\\frac23}=63",
          "fallback": "(ii) 21/(1−2/3)=63",
          "display": true
        }
      }
    ],
    "answer": "(i) 27/2 = 13.5; (ii) 63.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.8 Q4; printed p. 76; PDF p. 82. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-8-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.8 · Q5",
      "ta": "Exercise 2.8 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Ratio from infinite G.P. sum"
    },
    "q": {
      "en": "An infinite G.P. has first term 8 and sum to infinity 32/3. Find its common ratio."
    },
    "steps": [
      {
        "en": "Use S∞=a/(1−r), valid only for |r|<1.",
        "eq": "32/3=8/(1−r)",
        "math": {
          "latex": "\\frac{32}3=\\frac8{1-r}",
          "fallback": "32/3=8/(1−r)",
          "display": true
        }
      },
      {
        "en": "Rearrange and confirm that the ratio is less than 1 in absolute value.",
        "eq": "1−r=3/4 ⇒ r=1/4",
        "math": {
          "latex": "r=1-\\frac34=\\frac14",
          "fallback": "1−r=3/4 ⇒ r=1/4",
          "display": true
        }
      }
    ],
    "answer": "1/4.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.8 Q5; printed p. 76; PDF p. 82. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-8-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.8 · Q7",
      "ta": "Exercise 2.8 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "Sum a geometric series with known last term"
    },
    "q": {
      "en": "Find the sum 3+6+12+…+1536."
    },
    "steps": [
      {
        "en": "The common ratio is 2. Determine the number of terms using the last term.",
        "eq": "1536=3×2⁽ⁿ⁻¹⁾ ⇒ 2⁽ⁿ⁻¹⁾=512=2⁹ ⇒ n=10",
        "math": {
          "latex": "2^{n-1}=512=2^9\\implies n=10",
          "fallback": "1536=3×2⁽ⁿ⁻¹⁾ ⇒ 2⁽ⁿ⁻¹⁾=512=2⁹ ⇒ n=10",
          "display": true
        }
      },
      {
        "en": "Sum the first 10 terms.",
        "eq": "S₁₀=3(2¹⁰−1)=3069",
        "math": {
          "latex": "S_{10}=3(2^{10}-1)=3069",
          "fallback": "S₁₀=3(2¹⁰−1)=3069",
          "display": true
        }
      }
    ],
    "answer": "3069.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.8 Q7; printed p. 76; PDF p. 82. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-9-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.9 · Q2",
      "ta": "Exercise 2.9 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "Convert a natural-number sum into cubes"
    },
    "q": {
      "en": "If 1+2+3+…+k=325, find 1³+2³+…+k³."
    },
    "steps": [
      {
        "en": "Use the identity: the sum of the first k cubes is the square of the sum of the first k numbers.",
        "eq": "1³+…+k³=(1+…+k)²",
        "math": {
          "latex": "\\sum_{j=1}^{k}j^3=\\left(\\sum_{j=1}^{k}j\\right)^2",
          "fallback": "1³+…+k³=(1+…+k)²",
          "display": true
        }
      },
      {
        "en": "Square the given sum directly.",
        "eq": "325²=105625",
        "math": {
          "latex": "325^2=105625",
          "fallback": "325²=105625",
          "display": true
        }
      }
    ],
    "answer": "105,625.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.9 Q2; printed p. 81; PDF p. 87. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-9-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.9 · Q3",
      "ta": "Exercise 2.9 · Q3 (English only; Tamil pending)"
    },
    "title": {
      "en": "Natural-number sum from a cube sum"
    },
    "q": {
      "en": "If 1³+2³+…+k³=44100, find 1+2+3+…+k."
    },
    "steps": [
      {
        "en": "The sum of first k cubes equals the square of the sum of first k integers.",
        "eq": "(1+2+…+k)²=44100"
      },
      {
        "en": "Use the positive square root, since the sum is positive.",
        "eq": "1+2+…+k=√44100=210",
        "math": {
          "latex": "\\sqrt{44100}=210",
          "fallback": "1+2+…+k=√44100=210",
          "display": true
        }
      }
    ],
    "answer": "210.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.9 Q3; printed p. 81; PDF p. 87. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-9-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.9 · Q4",
      "ta": "Exercise 2.9 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Number of terms in a cube sum"
    },
    "q": {
      "en": "How many terms of 1³+2³+3³+… have sum 14400?"
    },
    "steps": [
      {
        "en": "The cube-sum identity gives a perfect square.",
        "eq": "[n(n+1)/2]²=14400 ⇒ n(n+1)/2=120",
        "math": {
          "latex": "\\left(\\frac{n(n+1)}2\\right)^2=14400",
          "fallback": "[n(n+1)/2]²=14400 ⇒ n(n+1)/2=120",
          "display": true
        }
      },
      {
        "en": "Solve n(n+1)=240 with positive n.",
        "eq": "n²+n−240=0 ⇒ (n−15)(n+16)=0 ⇒ n=15",
        "math": {
          "latex": "(n-15)(n+16)=0\\implies n=15",
          "fallback": "n²+n−240=0 ⇒ (n−15)(n+16)=0 ⇒ n=15",
          "display": true
        }
      }
    ],
    "answer": "15 terms.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.9 Q4; printed p. 81; PDF p. 87. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-9-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.9 · Q5",
      "ta": "Exercise 2.9 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "Recognise a triangular-number square"
    },
    "q": {
      "en": "The sum of cubes of the first n natural numbers is 2025. Find n."
    },
    "steps": [
      {
        "en": "Convert the cube sum into the square of a triangular number.",
        "eq": "[n(n+1)/2]²=2025 ⇒ n(n+1)/2=45",
        "math": {
          "latex": "\\frac{n(n+1)}2=\\sqrt{2025}=45",
          "fallback": "[n(n+1)/2]²=2025 ⇒ n(n+1)/2=45",
          "display": true
        }
      },
      {
        "en": "Multiplying both sides by 2 gives n(n+1)=90. Two consecutive positive integers whose product is 90 are 9 and 10, so n=9.",
        "eq": "9×10=90 ⇒ n=9",
        "math": {
          "latex": "n=9",
          "fallback": "9×10=90 ⇒ n=9",
          "display": true
        }
      }
    ],
    "answer": "n = 9.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.9 Q5; printed p. 81; PDF p. 87. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-9-q6",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.9 · Q6",
      "ta": "Exercise 2.9 · Q6 (English only; Tamil pending)"
    },
    "title": {
      "en": "Area of square papers"
    },
    "q": {
      "en": "Rekha has 15 square sheets with side lengths 10 cm, 11 cm, …, 24 cm. Find the total area."
    },
    "steps": [
      {
        "en": "Each sheet of side k has area k²; sum the squares from 10 to 24.",
        "eq": "10²+11²+…+24² = Σ₁²⁴k² − Σ₁⁹k²"
      },
      {
        "en": "Apply the square-sum formula to the two prefixes.",
        "eq": "24×25×49/6 − 9×10×19/6 = 4900−285",
        "math": {
          "latex": "\\frac{24(25)(49)}6-\\frac{9(10)(19)}6=4615",
          "fallback": "24×25×49/6 − 9×10×19/6 = 4900−285",
          "display": true
        }
      }
    ],
    "answer": "4615 cm².",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.9 Q6; printed p. 81; PDF p. 87. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q1",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q1",
      "ta": "Exercise 2.10 · Q1 (English only; Tamil pending)"
    },
    "title": {
      "en": "Euclid remainder rule"
    },
    "q": {
      "en": "Which inequality must the remainder r satisfy in Euclid's division lemma for positive a and b? Options: (A) 1<r<b (B) 0<r<b (C) 0≤r<b (D) 0<r≤b."
    },
    "steps": [
      {
        "en": "The remainder cannot be negative, and it must be smaller than the divisor.",
        "eq": "0≤r<b",
        "math": {
          "latex": "0\\le r<b",
          "fallback": "0≤r<b",
          "display": true
        }
      },
      {
        "en": "Zero is allowed when division is exact; r=b is not allowed.",
        "eq": "Correct option C"
      }
    ],
    "answer": "Option C: 0≤r<b.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q1; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q2",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q2",
      "ta": "Exercise 2.10 · Q2 (English only; Tamil pending)"
    },
    "title": {
      "en": "Cube remainders modulo 9"
    },
    "q": {
      "en": "Possible remainders when the cube of a positive integer is divided by 9: (A) 0,1,8 (B) 1,4,8 (C) 0,1,3 (D) 1,3,5."
    },
    "steps": [
      {
        "en": "Check residue classes 0,1,2,…,8 before cubing modulo 9.",
        "eq": "0³≡0, 1³≡1, 2³≡8 (mod 9)",
        "math": {
          "latex": "0^3\\equiv0,\\ 1^3\\equiv1,\\ 2^3\\equiv8\\pmod9",
          "fallback": "0³≡0, 1³≡1, 2³≡8 (mod 9)",
          "display": true
        }
      },
      {
        "en": "The remaining residue classes repeat only 0,1 or 8.",
        "eq": "Correct option A"
      }
    ],
    "answer": "Option A: 0, 1 and 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q2; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q3",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q3",
      "ta": "Exercise 2.10 · Q3 (English only; Tamil pending)"
    },
    "title": {
      "en": "Express an HCF as a difference"
    },
    "q": {
      "en": "HCF(65,117) is expressible as 65m−117. Find m. Options: (A) 4 (B) 2 (C) 1 (D) 3."
    },
    "steps": [
      {
        "en": "Find HCF of 65 and 117. Both are divisible by 13, and 65=5×13, 117=9×13.",
        "eq": "HCF(65,117)=13",
        "math": {
          "latex": "\\gcd(65,117)=13",
          "fallback": "HCF(65,117)=13",
          "display": true
        }
      },
      {
        "en": "Solve the linear equation 65m−117=13.",
        "eq": "65m=130 ⇒ m=2",
        "math": {
          "latex": "65m=130\\implies m=2",
          "fallback": "65m=130 ⇒ m=2",
          "display": true
        }
      }
    ],
    "answer": "Option B: m = 2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q3; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q4",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q4",
      "ta": "Exercise 2.10 · Q4 (English only; Tamil pending)"
    },
    "title": {
      "en": "Count prime exponents"
    },
    "q": {
      "en": "The sum of the exponents of prime factors in 1729 is: (A) 1 (B) 2 (C) 3 (D) 4."
    },
    "steps": [
      {
        "en": "Factor 1729 into primes.",
        "eq": "1729 = 7×13×19",
        "math": {
          "latex": "1729=7\\cdot13\\cdot19",
          "fallback": "1729 = 7×13×19",
          "display": true
        }
      },
      {
        "en": "Each of the three primes has exponent 1.",
        "eq": "1+1+1=3 ⇒ option C"
      }
    ],
    "answer": "Option C: 3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q4; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q5",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q5",
      "ta": "Exercise 2.10 · Q5 (English only; Tamil pending)"
    },
    "title": {
      "en": "LCM of 1 through 10"
    },
    "q": {
      "en": "The least positive number divisible by every number 1 through 10 is: (A) 2025 (B) 5220 (C) 5025 (D) 2520."
    },
    "steps": [
      {
        "en": "Use the highest prime powers needed among 1 to 10.",
        "eq": "2³ (8), 3² (9), 5, 7"
      },
      {
        "en": "Multiply the prime powers to get the least common multiple.",
        "eq": "2³×3²×5×7=2520",
        "math": {
          "latex": "2^3\\cdot3^2\\cdot5\\cdot7=2520",
          "fallback": "2³×3²×5×7=2520",
          "display": true
        }
      }
    ],
    "answer": "Option D: 2520.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q5; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q7",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q7",
      "ta": "Exercise 2.10 · Q7 (English only; Tamil pending)"
    },
    "title": {
      "en": "A recursive sequence"
    },
    "q": {
      "en": "Given F₁=1, F₂=3 and Fₙ=Fₙ₋₁+Fₙ₋₂, find F₅. Options: (A)3 (B)5 (C)8 (D)11."
    },
    "steps": [
      {
        "en": "Each new term is the sum of the previous two terms.",
        "eq": "F₃=1+3=4; F₄=3+4=7"
      },
      {
        "en": "Continue the recurrence to the fifth term.",
        "eq": "F₅=4+7=11",
        "math": {
          "latex": "F_5=F_4+F_3=7+4=11",
          "fallback": "F₅=4+7=11",
          "display": true
        }
      }
    ],
    "answer": "Option D: 11.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q7; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q8",
      "ta": "Exercise 2.10 · Q8 (English only; Tamil pending)"
    },
    "title": {
      "en": "Which number belongs to the A.P.?"
    },
    "q": {
      "en": "An A.P. starts at 1 with common difference 4. Which is a term: (A)4551 (B)10091 (C)7881 (D)13531?"
    },
    "steps": [
      {
        "en": "Every term in this A.P. is 1+4(n−1), so it leaves remainder 1 modulo 4.",
        "eq": "tₙ=1+4(n−1)≡1 (mod 4)",
        "math": {
          "latex": "t_n=1+4(n-1)\\equiv1\\pmod4",
          "fallback": "tₙ=1+4(n−1)≡1 (mod 4)",
          "display": true
        }
      },
      {
        "en": "Only 7881 leaves remainder 1 on division by 4.",
        "eq": "7881=4×1970+1 ⇒ option C"
      }
    ],
    "answer": "Option C: 7881.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q8; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q9",
      "ta": "Exercise 2.10 · Q9 (English only; Tamil pending)"
    },
    "title": {
      "en": "An A.P. identity from two terms"
    },
    "q": {
      "en": "If six times the 6th A.P. term equals seven times the 7th, find the 13th term. Options: (A)0 (B)6 (C)7 (D)13."
    },
    "steps": [
      {
        "en": "Write the 6th and 7th terms using first term a and difference d.",
        "eq": "6(a+5d)=7(a+6d)"
      },
      {
        "en": "Solve and substitute in the 13th term.",
        "eq": "a=−12d; t₁₃=a+12d=0",
        "math": {
          "latex": "a=-12d\\implies t_{13}=a+12d=0",
          "fallback": "a=−12d; t₁₃=a+12d=0",
          "display": true
        }
      }
    ],
    "answer": "Option A: 0.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q9; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q10",
      "ta": "Exercise 2.10 · Q10 (English only; Tamil pending)"
    },
    "title": {
      "en": "Odd-length A.P. sum"
    },
    "q": {
      "en": "An A.P. has 31 terms and the 16th term is m. Its sum is: (A)16m (B)62m (C)31m (D)31m/2."
    },
    "steps": [
      {
        "en": "For an odd number of A.P. terms, the average equals the middle term.",
        "eq": "Average of 31 terms = t₁₆ = m"
      },
      {
        "en": "Total equals number of terms multiplied by their average.",
        "eq": "S₃₁ = 31m",
        "math": {
          "latex": "S_{31}=31m",
          "fallback": "S₃₁ = 31m",
          "display": true
        }
      }
    ],
    "answer": "Option C: 31m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q10; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q11",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q11",
      "ta": "Exercise 2.10 · Q11 (English only; Tamil pending)"
    },
    "title": {
      "en": "How many terms sum to 120?"
    },
    "q": {
      "en": "An A.P. begins at 1 and has common difference 4. How many terms have sum 120? Options: (A)6 (B)7 (C)8 (D)9."
    },
    "steps": [
      {
        "en": "Set the A.P. sum equal to 120.",
        "eq": "n/2[2+4(n−1)] = n(2n−1)=120",
        "math": {
          "latex": "\\frac n2[2+4(n-1)]=120",
          "fallback": "n/2[2+4(n−1)] = n(2n−1)=120",
          "display": true
        }
      },
      {
        "en": "Solve the resulting quadratic for positive n.",
        "eq": "2n²−n−120=0 ⇒ n=8",
        "math": {
          "latex": "2n^2-n-120=0\\implies n=8",
          "fallback": "2n²−n−120=0 ⇒ n=8",
          "display": true
        }
      }
    ],
    "answer": "Option C: 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q11; printed p. 82; PDF p. 88. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  },
  {
    "id": "c10-2-ex2-10-q12",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q12",
      "ta": "Exercise 2.10 · Q12 (English only; Tamil pending)"
    },
    "title": {
      "en": "Find and explain the reason"
    },
    "q": {
      "en": "Let A = 2⁶⁵ and B = 2⁶⁴ + 2⁶³ + 2⁶² + … + 2⁰. Which is larger and by how much?"
    },
    "steps": [
      {
        "en": "B is a finite geometric series with first term 1 and powers through 64.",
        "eq": "B = 1+2+4+…+2⁶⁴"
      },
      {
        "en": "Use the finite G.P. sum formula with n=65, a=1 and r=2.",
        "eq": "B = (2⁶⁵−1)/(2−1) = 2⁶⁵−1"
      },
      {
        "en": "A is therefore one more than B.",
        "eq": "A−B = 2⁶⁵−(2⁶⁵−1)=1"
      }
    ],
    "answer": "A is larger than B by 1 (option D).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q12; printed p. 83, PDF p. 89. English source text and derivation checked.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; exact algebra verified"
  },
  {
    "id": "c10-2-ex2-10-q14",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.10",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.10 · Q14",
      "ta": "Exercise 2.10 · Q14 (English only; Tamil pending)"
    },
    "title": {
      "en": "Every sixth term of an A.P."
    },
    "q": {
      "en": "If t₁,t₂,t₃,… form an A.P., what type of sequence is t₆,t₁₂,t₁₈,…? Options include A.P., G.P. and neither."
    },
    "steps": [
      {
        "en": "Write the nth A.P. term and then inspect every sixth position.",
        "eq": "tₙ=a+(n−1)d ⇒ t₆=a+5d, t₁₂=a+11d"
      },
      {
        "en": "The difference between chosen terms is a constant 6d.",
        "eq": "t₁₂−t₆=6d; t₁₈−t₁₂=6d",
        "math": {
          "latex": "t_{12}-t_6=t_{18}-t_{12}=6d",
          "fallback": "t₁₂−t₆=6d; t₁₈−t₁₂=6d",
          "display": true
        }
      }
    ],
    "answer": "Option B: An arithmetic progression.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics; 2025 revised English edition; Chapter 2, Exercise 2.10 Q14; printed p. 83; PDF p. 89. Text verified against source extract; independent figure/editorial review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text-checked; arithmetic independently tested where numeric"
  }
];
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
const same=(a,b)=>JSON.stringify(stable(a))===JSON.stringify(stable(b));
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
const pending=new Set();
for(const item of entries){const existing=grade.items.find(q=>q.id===item.id);
 if(pending.has(item.id)||(ids.has(item.id)&&(!existing||!same(existing,item))))throw Error('Duplicate TRACE textbook ID '+item.id);
 pending.add(item.id);
 if(item.steps.length<2||item.steps.some(s=>!s.en||!s.eq))throw Error('Incomplete TRACE solution '+item.id);
}
for(const item of entries){if(!ids.has(item.id)){grade.items.push(item);ids.add(item.id);}
 if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
window.TriggleG10Ch2TraceRecords=Object.freeze({count:entries.length,ids:Object.freeze(entries.map(q=>q.id)),sourceEdition:2025,tamilStatus:'pending',sourceVerified:'text',chapterComplete:false});
})();
