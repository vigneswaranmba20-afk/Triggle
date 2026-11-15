/* TRACE Grade 10 Chapter 2 textbook source-aligned batch A (2025 English).
 * Exercises 2.3–2.6. Ambiguous scanned formulas are held, not guessed.
 * Each solution contains independent explanation and verifiable arithmetic;
 * this is not the textbook's Worked Examples section. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Missing Grade 10 Ch2 dependencies');
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
      "ta": "Exercise 2.3 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Clock arithmetic: 100 hours later"
    },
    "q": {
      "en": "What is the time 100 hours after 7 a.m.?"
    },
    "steps": [
      {
        "en": "A clock repeats every 24 hours. First separate full days from the extra hours.",
        "eq": "100 = 24 × 4 + 4"
      },
      {
        "en": "Four full days return us to the same hour. Only the remaining four hours change the displayed time.",
        "eq": "100 mod 24 = 4"
      },
      {
        "en": "Move four hours forward from 7 a.m., without changing a.m. to p.m. here.",
        "eq": "7 a.m. + 4 hours = 11 a.m."
      }
    ],
    "answer": "11 a.m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.3 Q5, printed p. 51.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.3 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Clock arithmetic: count backwards"
    },
    "q": {
      "en": "What is the time 15 hours before 11 p.m.?"
    },
    "steps": [
      {
        "en": "Express the starting time in 24-hour notation so subtraction is unambiguous.",
        "eq": "11 p.m. = 23:00"
      },
      {
        "en": "Count back fifteen hours from 23:00.",
        "eq": "23:00 − 15:00 = 08:00"
      },
      {
        "en": "08:00 in 12-hour time is in the morning.",
        "eq": "08:00 = 8 a.m."
      }
    ],
    "answer": "8 a.m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.3 Q6, printed p. 51.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.3 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Days of the week and remainders"
    },
    "q": {
      "en": "Today is Tuesday. My uncle will come after 45 days. In which day my uncle will be coming?"
    },
    "steps": [
      {
        "en": "The days of the week repeat in a cycle of seven, so remove full weeks.",
        "eq": "45 = 7 × 6 + 3"
      },
      {
        "en": "Six whole weeks bring us back to Tuesday. Move forward the remaining three days.",
        "eq": "Tuesday → Wednesday → Thursday → Friday"
      },
      {
        "en": "The resulting weekday is Friday.",
        "eq": "45 mod 7 = 3; Friday"
      }
    ],
    "answer": "Friday.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.3 Q7, printed p. 51.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.3 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Time-zone application with supplied offset"
    },
    "q": {
      "en": "The duration of flight travel from Chennai to London is approximately 11 hours. The airplane begins its journey on Sunday at 23:30 hours. If the time at Chennai is four and half hours ahead of London's time, find the London local time when the flight lands."
    },
    "steps": [
      {
        "en": "Start with the departure time in Chennai as given by the question.",
        "eq": "Sunday 23:30 (Chennai)"
      },
      {
        "en": "After 11 hours of flight, Chennai local time will be 10:30 on Monday.",
        "eq": "Sunday 23:30 + 11 h = Monday 10:30"
      },
      {
        "en": "The textbook gives a fixed time difference of four and a half hours. Subtract it to obtain London local time.",
        "eq": "Monday 10:30 − 4 h 30 min = Monday 06:00"
      },
      {
        "en": "Use the difference stated in the textbook, not a guessed current seasonal offset.",
        "eq": "London arrival: Monday, 6:00 a.m."
      }
    ],
    "answer": "Monday at 6:00 a.m. (London local time, using the textbook's stated offset).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.3 Q10, printed p. 52.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-4-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q1(i)",
      "ta": "Exercise 2.4 · Q1-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find next terms: multiplying by 3"
    },
    "q": {
      "en": "Find the next three terms of the sequence 8, 24, 72, …"
    },
    "steps": [
      {
        "en": "Check whether each number is obtained by adding or multiplying a constant.",
        "eq": "24 ÷ 8 = 3; 72 ÷ 24 = 3"
      },
      {
        "en": "Multiply by 3 to get the first two missing terms.",
        "eq": "72 × 3 = 216; 216 × 3 = 648"
      },
      {
        "en": "Multiply once more to find the third missing term.",
        "eq": "648 × 3 = 1944"
      }
    ],
    "answer": "216, 648, 1944.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.4 Q1-i, printed p. 55.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-4-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q1(ii)",
      "ta": "Exercise 2.4 · Q1-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find next terms: difference −4"
    },
    "q": {
      "en": "Find the next three terms of the sequence 5, 1, −3, …"
    },
    "steps": [
      {
        "en": "Compare consecutive terms: each step subtracts 4.",
        "eq": "1 − 5 = −4; −3 − 1 = −4"
      },
      {
        "en": "Continue by the same difference.",
        "eq": "−3 − 4 = −7; −7 − 4 = −11"
      },
      {
        "en": "Subtract 4 a third time.",
        "eq": "−11 − 4 = −15"
      }
    ],
    "answer": "−7, −11, −15.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.4 Q1-ii, printed p. 55.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-4-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.4",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.4 · Q1(iii)",
      "ta": "Exercise 2.4 · Q1-iii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Pattern in numerator and square denominator"
    },
    "q": {
      "en": "Find the next three terms of the sequence 1/4, 2/9, 3/16, …"
    },
    "steps": [
      {
        "en": "Read numerator and denominator separately: numerators are 1, 2, 3, while denominators are 2², 3², 4².",
        "eq": "a_n = n/(n+1)²"
      },
      {
        "en": "For the fourth and fifth terms, substitute n = 4 and 5.",
        "eq": "a₄ = 4/25; a₅ = 5/36"
      },
      {
        "en": "For the sixth term, substitute n = 6.",
        "eq": "a₆ = 6/49"
      }
    ],
    "answer": "4/25, 5/36, 6/49.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.4 Q1-iii, printed p. 55.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-5-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q1(ii)",
      "ta": "Exercise 2.5 · Q1-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Not every decreasing sequence is an A.P."
    },
    "q": {
      "en": "Check whether the sequence 1/2, 1/3, 1/4, 1/5, … is in A.P."
    },
    "steps": [
      {
        "en": "An arithmetic progression needs one constant difference between each pair of successive terms.",
        "eq": "d₁ = 1/3 − 1/2 = −1/6"
      },
      {
        "en": "Find the following difference and compare it with the first one.",
        "eq": "d₂ = 1/4 − 1/3 = −1/12"
      },
      {
        "en": "The differences are unequal, so the sequence is not an A.P.",
        "eq": "−1/6 ≠ −1/12"
      }
    ],
    "answer": "Not an arithmetic progression.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q1-ii, printed p. 61.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-5-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q1(iii)",
      "ta": "Exercise 2.5 · Q1-iii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Recognise a constant difference"
    },
    "q": {
      "en": "Check whether 9, 13, 17, 21, 25, … is in A.P."
    },
    "steps": [
      {
        "en": "Find the differences between successive terms.",
        "eq": "13 − 9 = 4; 17 − 13 = 4"
      },
      {
        "en": "Check the remaining consecutive gaps as well.",
        "eq": "21 − 17 = 4; 25 − 21 = 4"
      },
      {
        "en": "Because all differences equal 4, it is an A.P.",
        "eq": "Common difference d = 4"
      }
    ],
    "answer": "Yes, it is an A.P. with common difference 4.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q1-iii, printed p. 61.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-5-q1-iv",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q1(iv)",
      "ta": "Exercise 2.5 · Q1-iv (English source; Tamil review pending)"
    },
    "title": {
      "en": "Fractional arithmetic progression"
    },
    "q": {
      "en": "Check whether −1/3, 0, 1/3, 2/3, … is in A.P."
    },
    "steps": [
      {
        "en": "Subtract each term from the next term.",
        "eq": "0 − (−1/3) = 1/3"
      },
      {
        "en": "Check the other gaps.",
        "eq": "1/3 − 0 = 1/3; 2/3 − 1/3 = 1/3"
      },
      {
        "en": "Equal consecutive differences confirm an A.P.",
        "eq": "Common difference d = 1/3"
      }
    ],
    "answer": "Yes, an A.P. with common difference 1/3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q1-iv, printed p. 61.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-5-q2-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q2(i)",
      "ta": "Exercise 2.5 · Q2-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Build an A.P. from its first term"
    },
    "q": {
      "en": "The first term a = 5 and common difference d = 6. Find the corresponding A.P."
    },
    "steps": [
      {
        "en": "The first term is already known. Add the common difference to reach the second.",
        "eq": "a₁ = 5; a₂ = 5 + 6 = 11"
      },
      {
        "en": "Keep adding 6 to generate the following terms.",
        "eq": "a₃ = 11 + 6 = 17; a₄ = 17 + 6 = 23"
      },
      {
        "en": "Confirm that each difference is 6.",
        "eq": "11 − 5 = 17 − 11 = 23 − 17 = 6"
      }
    ],
    "answer": "5, 11, 17, 23, …",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q2-i, printed p. 61.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-5-q2-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.5",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.5 · Q2(ii)",
      "ta": "Exercise 2.5 · Q2-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Decreasing arithmetic progression"
    },
    "q": {
      "en": "The first term a = 7 and common difference d = −5. Find the corresponding A.P."
    },
    "steps": [
      {
        "en": "A negative common difference means each following term is smaller.",
        "eq": "a₁ = 7; d = −5"
      },
      {
        "en": "Add −5 to get the next two terms.",
        "eq": "a₂ = 7 − 5 = 2; a₃ = 2 − 5 = −3"
      },
      {
        "en": "Continue by subtracting 5 again.",
        "eq": "a₄ = −3 − 5 = −8"
      }
    ],
    "answer": "7, 2, −3, −8, …",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q2-ii, printed p. 61.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.5 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the position of a term"
    },
    "q": {
      "en": "Which term of an A.P. 16, 11, 6, 1, ... is −54?"
    },
    "steps": [
      {
        "en": "Find the first term and common difference.",
        "eq": "a = 16; d = 11 − 16 = −5"
      },
      {
        "en": "Use aₙ = a + (n−1)d and set the result to −54.",
        "eq": "−54 = 16 − 5(n−1)"
      },
      {
        "en": "Solve for the position n and verify it is a positive whole number.",
        "eq": "−70 = −5(n−1); n−1 = 14; n = 15"
      },
      {
        "en": "Substitute n = 15 to check.",
        "eq": "a₁₅ = 16 + 14(−5) = −54"
      }
    ],
    "answer": "−54 is the 15th term.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q5, printed p. 62.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.5 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Two middle terms in an even-length A.P."
    },
    "q": {
      "en": "Find the middle term(s) of an A.P. 9, 15, 21, 27, …, 183."
    },
    "steps": [
      {
        "en": "Find the number of terms by applying the nth-term formula.",
        "eq": "183 = 9 + (n−1)6"
      },
      {
        "en": "There are 30 terms; an even-sized sequence has two middle positions.",
        "eq": "n−1 = 29; n = 30; middle positions = 15 and 16"
      },
      {
        "en": "Find those terms from aₙ = 9 + (n−1)6.",
        "eq": "a₁₅ = 9 + 14(6) = 93; a₁₆ = 9 + 15(6) = 99"
      }
    ],
    "answer": "93 and 99.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q6, printed p. 62.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.5 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Missing terms in an A.P."
    },
    "q": {
      "en": "Find x, y and z, given that x, 10, y, 24, z are in A.P."
    },
    "steps": [
      {
        "en": "Between the second term 10 and fourth term 24 are two equal jumps.",
        "eq": "24 − 10 = 2d"
      },
      {
        "en": "Solve for the common difference.",
        "eq": "d = 7"
      },
      {
        "en": "Move one step backwards for x and forward for y and z.",
        "eq": "x = 10 − 7 = 3; y = 10 + 7 = 17; z = 24 + 7 = 31"
      }
    ],
    "answer": "x = 3, y = 17, z = 31.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q9, printed p. 62.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.5 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Theatre seats in arithmetic progression"
    },
    "q": {
      "en": "In a theatre, there are 20 seats in the front row and 30 rows were allotted. Each successive row contains two additional seats than its front row. How many seats are there in the last row?"
    },
    "steps": [
      {
        "en": "The first row has 20 seats. Each successive row has two more, so this is an A.P.",
        "eq": "a = 20; d = 2"
      },
      {
        "en": "There are 30 rows, hence 29 increases from first to last.",
        "eq": "a₃₀ = a + (30−1)d"
      },
      {
        "en": "Substitute and find the last-row seat count.",
        "eq": "a₃₀ = 20 + 29(2) = 78"
      }
    ],
    "answer": "78 seats in the 30th row.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q10, printed p. 62.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.5 · Q11 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Three consecutive A.P. terms from sum and product"
    },
    "q": {
      "en": "The sum of three consecutive terms that are in A.P. is 27 and their product is 288. Find the three terms."
    },
    "steps": [
      {
        "en": "Write three consecutive A.P. terms symmetrically, which makes their middle term easy to find.",
        "eq": "a−d, a, a+d"
      },
      {
        "en": "Their sum is three times the middle term, so a = 9.",
        "eq": "(a−d)+a+(a+d) = 27; 3a = 27; a = 9"
      },
      {
        "en": "Use the product condition to find d².",
        "eq": "(9−d)×9×(9+d) = 288; 9(81−d²) = 288"
      },
      {
        "en": "Solve for the common difference and list the terms.",
        "eq": "81−d² = 32; d² = 49; d = ±7; terms = 2, 9, 16 (or reverse)"
      }
    ],
    "answer": "2, 9, 16 (also 16, 9, 2).",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.5 Q11, printed p. 62.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q1(i)",
      "ta": "Exercise 2.6 · Q1-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of 40 terms of an increasing A.P."
    },
    "q": {
      "en": "Find the sum of the A.P. 3, 7, 11, … up to 40 terms."
    },
    "steps": [
      {
        "en": "The first term is 3; successive terms increase by 4.",
        "eq": "a = 3; d = 4; n = 40"
      },
      {
        "en": "Find the 40th term before finding the sum.",
        "eq": "l = 3 + (40−1)4 = 159"
      },
      {
        "en": "Pair the first and last terms using Sₙ = n(a+l)/2.",
        "eq": "S₄₀ = 40(3+159)/2 = 3240"
      }
    ],
    "answer": "3240.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q1-i, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q1(ii)",
      "ta": "Exercise 2.6 · Q1-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of a decreasing A.P."
    },
    "q": {
      "en": "Find the sum of the A.P. 102, 97, 92, … up to 27 terms."
    },
    "steps": [
      {
        "en": "The difference is −5, so later terms can become negative.",
        "eq": "a = 102; d = −5; n = 27"
      },
      {
        "en": "Compute the final term. Do not assume the terms remain positive.",
        "eq": "l = 102 + 26(−5) = −28"
      },
      {
        "en": "Use the first-and-last pair formula, retaining the negative sign.",
        "eq": "S₂₇ = 27(102−28)/2 = 999"
      }
    ],
    "answer": "999.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q1-ii, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.6 · Q2 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find number of terms from a sum"
    },
    "q": {
      "en": "How many consecutive odd integers beginning with 5 will sum to 480?"
    },
    "steps": [
      {
        "en": "The odd numbers 5, 7, 9, … form an A.P. with common difference 2.",
        "eq": "a = 5; d = 2; Sₙ = 480"
      },
      {
        "en": "Use the arithmetic series formula.",
        "eq": "480 = n[2(5)+(n−1)2]/2 = n(n+4)"
      },
      {
        "en": "Solve the quadratic and reject a negative number of terms.",
        "eq": "n² + 4n − 480 = 0 = (n−20)(n+24); n = 20"
      },
      {
        "en": "Check the sum using the first and last terms.",
        "eq": "l = 5+19(2) = 43; S₂₀ = 20(5+43)/2 = 480"
      }
    ],
    "answer": "20 consecutive odd integers.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q2, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.6 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of consecutive odd integers"
    },
    "q": {
      "en": "Find the sum of all odd positive integers less than 450."
    },
    "steps": [
      {
        "en": "The numbers are 1, 3, 5, …, 449. They form an A.P. with difference 2.",
        "eq": "a = 1; l = 449; d = 2"
      },
      {
        "en": "Count how many odd numbers occur up to 449.",
        "eq": "449 = 2n − 1; n = 225"
      },
      {
        "en": "Add them by pairing first and last.",
        "eq": "S = 225(1+449)/2 = 50625"
      }
    ],
    "answer": "50625.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q6, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q8-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q8(i)",
      "ta": "Exercise 2.6 · Q8-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Laptop installments: total amount"
    },
    "q": {
      "en": "Raghu can buy a laptop for ₹40,000 cash, or pay 10 installments starting at ₹4800, decreasing by ₹50 every month. Find the total amount paid in 10 installments."
    },
    "steps": [
      {
        "en": "The installments are an A.P. because each one decreases by ₹50.",
        "eq": "a = 4800; d = −50; n = 10"
      },
      {
        "en": "Find the amount of the tenth installment.",
        "eq": "l = 4800 + 9(−50) = ₹4350"
      },
      {
        "en": "Add all ten installments using the A.P. sum formula.",
        "eq": "S₁₀ = 10(4800+4350)/2 = ₹45750"
      }
    ],
    "answer": "₹45,750.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q8-i, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q8-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q8(ii)",
      "ta": "Exercise 2.6 · Q8-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Laptop installments: extra cost"
    },
    "q": {
      "en": "For Raghu's laptop, how much extra does he pay in 10 decreasing installments compared with the ₹40,000 cash price?"
    },
    "steps": [
      {
        "en": "First calculate the total of the 10 installments (starting ₹4800, decreasing by ₹50).",
        "eq": "S₁₀ = 10[2(4800)+9(−50)]/2 = ₹45750"
      },
      {
        "en": "Subtract the cash price, because only the difference is the extra cost.",
        "eq": "Extra = ₹45750 − ₹40000"
      },
      {
        "en": "Compute the additional amount.",
        "eq": "Extra = ₹5750"
      }
    ],
    "answer": "₹5,750 extra.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q8-ii, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q10-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q10(i)",
      "ta": "Exercise 2.6 · Q10-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Bricks on topmost stair"
    },
    "q": {
      "en": "A brick staircase has 30 steps. The bottom step requires 100 bricks; each successive step requires two bricks less. How many bricks are needed for the topmost step?"
    },
    "steps": [
      {
        "en": "Number the 30 steps from the bottom: 100 bricks in the first, then two fewer each step.",
        "eq": "a = 100; d = −2; n = 30"
      },
      {
        "en": "There are 29 decreases between the first and thirtieth steps.",
        "eq": "l = 100 + (30−1)(−2)"
      },
      {
        "en": "Compute the bricks on the topmost step.",
        "eq": "l = 42"
      }
    ],
    "answer": "42 bricks.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q10-i, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-6-q10-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.6",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.6 · Q10(ii)",
      "ta": "Exercise 2.6 · Q10-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Total bricks in the staircase"
    },
    "q": {
      "en": "For the same 30-step brick staircase (100 bricks at the bottom and two fewer on each next step), how many bricks are needed for the entire staircase?"
    },
    "steps": [
      {
        "en": "Use the arithmetic progression 100, 98, 96, … with 30 steps.",
        "eq": "a = 100; d = −2; n = 30"
      },
      {
        "en": "Find the topmost step's bricks, which is the last term.",
        "eq": "l = 100 + 29(−2) = 42"
      },
      {
        "en": "Add all 30 terms rather than counting each step separately.",
        "eq": "S₃₀ = 30(100+42)/2 = 2130"
      }
    ],
    "answer": "2,130 bricks.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.6 Q10-ii, printed p. 67.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  }
];
const allIds=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(q=>q.id)));
const originalCount=entries.length;
// The canonical TRACE source release loads first. Do not duplicate a textbook
// question already published there, including one with bundled subparts.
const extras=entries.filter(q=>{
 if(allIds.has(q.id))return false;
 const parent=q.id.replace(/-(?:i|ii|iii|iv|v|vi)$/,'');
 return parent===q.id||!allIds.has(parent);
});
if(new Set(extras.map(q=>q.id)).size!==extras.length)throw Error('Duplicate TRACE supplement IDs');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const q of extras){
 grade.items.push(q);
 if(!chapter.textbookQuestionIds.includes(q.id))chapter.textbookQuestionIds.push(q.id);
}
window.TRIGGLE_G10_CH2_SUPPLEMENTS=window.TRIGGLE_G10_CH2_SUPPLEMENTS||{};
window.TRIGGLE_G10_CH2_SUPPLEMENTS['2.3–2.6']={candidates:originalCount,integrated:extras.length,held:originalCount-extras.length};
})();