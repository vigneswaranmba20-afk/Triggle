/* TRACE Grade 10 Ch2 source-aligned textbook exercises 2.7–2.10 (2025 EN).
 * Source text reviewed; some ambiguous scanned subparts deliberately held.
 * Authored solutions are not textbook worked-example displays. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)throw Error('Missing Grade 10 Chapter 2 dependencies');
const entries=[
  {
    "id": "c10-2-ex2-7-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(i)",
      "ta": "Exercise 2.7 · Q1-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Recognise a doubling or tripling pattern"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (i) 3, 9, 27, 81, …"
    },
    "steps": [
      {
        "en": "A geometric progression (G.P.) requires a single constant ratio between consecutive terms.",
        "eq": "r = next term ÷ previous term"
      },
      {
        "en": "Compute the ratios from the first four terms.",
        "eq": "9/3 = 3; 27/9 = 3; 81/27 = 3"
      },
      {
        "en": "Every ratio is 3, so it is a G.P.",
        "eq": "r = 3"
      }
    ],
    "answer": "Yes, it is a G.P.; common ratio 3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q1-i, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(ii)",
      "ta": "Exercise 2.7 · Q1-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Repeated digits do not guarantee a common ratio"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (ii) 4, 44, 444, 4444, …"
    },
    "steps": [
      {
        "en": "Check the ratio instead of assuming that a visual pattern is geometric.",
        "eq": "44 ÷ 4 = 11"
      },
      {
        "en": "Calculate the next ratio. If it differs, the sequence is not a G.P.",
        "eq": "444 ÷ 44 = 111/11"
      },
      {
        "en": "The ratios 11 and 111/11 are unequal, so the condition fails.",
        "eq": "11 ≠ 111/11"
      }
    ],
    "answer": "No, this is not a G.P.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q1-ii, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(iii)",
      "ta": "Exercise 2.7 · Q1-iii (English source; Tamil review pending)"
    },
    "title": {
      "en": "Decimal G.P. decreasing by a tenth"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (iii) 0.5, 0.05, 0.005, …"
    },
    "steps": [
      {
        "en": "The terms are shrinking by the same multiplicative factor.",
        "eq": "0.05 ÷ 0.5 = 0.1"
      },
      {
        "en": "Check the following ratio.",
        "eq": "0.005 ÷ 0.05 = 0.1"
      },
      {
        "en": "Equal ratios show that it is a G.P.",
        "eq": "r = 0.1 = 1/10"
      }
    ],
    "answer": "Yes, it is a G.P. with common ratio 1/10.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q1-iii, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q1-iv",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(iv)",
      "ta": "Exercise 2.7 · Q1-iv (English source; Tamil review pending)"
    },
    "title": {
      "en": "Halving a fraction at each step"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (iv) 1/3, 1/6, 1/12, …"
    },
    "steps": [
      {
        "en": "Dividing the second fraction by the first reveals the multiplicative rule.",
        "eq": "(1/6) ÷ (1/3) = 1/2"
      },
      {
        "en": "Check that the following fraction has the same ratio.",
        "eq": "(1/12) ÷ (1/6) = 1/2"
      },
      {
        "en": "Both ratios are 1/2, so the sequence is geometric.",
        "eq": "r = 1/2"
      }
    ],
    "answer": "Yes, it is a G.P. with common ratio 1/2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q1-iv, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q1-vi",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q1(vi)",
      "ta": "Exercise 2.7 · Q1-vi (English source; Tamil review pending)"
    },
    "title": {
      "en": "Test every visible ratio, not just the first two"
    },
    "q": {
      "en": "Which of the following sequences are in G.P.? (vi) 120, 60, 30, 18, …"
    },
    "steps": [
      {
        "en": "Check the first pair of successive ratios.",
        "eq": "60/120 = 1/2; 30/60 = 1/2"
      },
      {
        "en": "Check the next ratio rather than stopping early.",
        "eq": "18/30 = 3/5"
      },
      {
        "en": "A changing ratio disqualifies the sequence from being a G.P.",
        "eq": "1/2 ≠ 3/5"
      }
    ],
    "answer": "No, it is not a G.P.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q1-vi, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q2-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q2(i)",
      "ta": "Exercise 2.7 · Q2-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "G.P. from a = 6 and r = 3"
    },
    "q": {
      "en": "Write the first three terms of the G.P. with first term a = 6 and common ratio r = 3."
    },
    "steps": [
      {
        "en": "The first term is 6. Multiply by 3 for each following term.",
        "eq": "a₁ = 6; r = 3"
      },
      {
        "en": "Find the second term.",
        "eq": "a₂ = 6 × 3 = 18"
      },
      {
        "en": "Multiply by 3 again to find the third.",
        "eq": "a₃ = 18 × 3 = 54"
      }
    ],
    "answer": "6, 18, 54.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q2-i, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q2-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q2(ii)",
      "ta": "Exercise 2.7 · Q2-ii (English source; Tamil review pending)"
    },
    "title": {
      "en": "G.P. from a = 2 and r = 2"
    },
    "q": {
      "en": "Write the first three terms of the G.P. with first term a = 2 and common ratio r = 2."
    },
    "steps": [
      {
        "en": "The first term is 2 and the common ratio is 2.",
        "eq": "a₁ = 2; r = 2"
      },
      {
        "en": "Double the first term.",
        "eq": "a₂ = 2 × 2 = 4"
      },
      {
        "en": "Double the second term.",
        "eq": "a₃ = 4 × 2 = 8"
      }
    ],
    "answer": "2, 4, 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q2-ii, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.7 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Seventh term of a decreasing G.P."
    },
    "q": {
      "en": "In a G.P. 729, 243, 81, … find t₇."
    },
    "steps": [
      {
        "en": "Find the common ratio from the first two terms.",
        "eq": "r = 243/729 = 1/3"
      },
      {
        "en": "For the seventh term there are six multiplications from the first.",
        "eq": "t₇ = ar⁶ = 729 × (1/3)⁶"
      },
      {
        "en": "Since 3⁶ = 729, the powers cancel.",
        "eq": "t₇ = 729/729 = 1"
      }
    ],
    "answer": "t₇ = 1.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q3, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
  },
  {
    "id": "c10-2-ex2-7-q5-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.7",
    "topic": {
      "en": "Numbers and Sequences"
    },
    "label": {
      "en": "Exercise 2.7 · Q5(i)",
      "ta": "Exercise 2.7 · Q5-i (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the length of a geometric sequence"
    },
    "q": {
      "en": "Find the number of terms in the G.P. 4, 8, 16, …, 8192."
    },
    "steps": [
      {
        "en": "The common ratio is 2, with first term 4.",
        "eq": "a = 4; r = 2"
      },
      {
        "en": "Use the nth term to match the stated last term.",
        "eq": "8192 = 4 × 2⁽ⁿ⁻¹⁾"
      },
      {
        "en": "Divide by 4; then match the powers of 2.",
        "eq": "2048 = 2¹¹ = 2⁽ⁿ⁻¹⁾; n−1 = 11"
      },
      {
        "en": "Count the original first term when giving the number of terms.",
        "eq": "n = 12"
      }
    ],
    "answer": "12 terms.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q5-i, printed p. 72.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.7 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Jump forward in a G.P."
    },
    "q": {
      "en": "Find the 10th term of a G.P. whose 8th term is 768 and the common ratio is 2."
    },
    "steps": [
      {
        "en": "From the 8th term to the 10th, we move forward exactly two steps.",
        "eq": "10 − 8 = 2 steps"
      },
      {
        "en": "Each step multiplies by the common ratio 2.",
        "eq": "t₁₀ = t₈ × 2²"
      },
      {
        "en": "Substitute the known term and simplify.",
        "eq": "t₁₀ = 768 × 4 = 3072"
      }
    ],
    "answer": "3072.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.7 Q7, printed p. 73.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.8 · Q2 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Geometric sum of six terms"
    },
    "q": {
      "en": "Find the sum of the first six terms of the G.P. 5, 15, 45, …"
    },
    "steps": [
      {
        "en": "The first term is 5; each term is multiplied by 3.",
        "eq": "a = 5; r = 3; n = 6"
      },
      {
        "en": "Use the geometric sum formula for r ≠ 1.",
        "eq": "S₆ = 5(3⁶−1)/(3−1)"
      },
      {
        "en": "Calculate the power and divide by 2.",
        "eq": "S₆ = 5(729−1)/2 = 1820"
      }
    ],
    "answer": "1820.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.8 Q2, printed p. 76.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.8 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Recover first term from geometric sum"
    },
    "q": {
      "en": "Find the first term of the G.P. whose common ratio is 5 and whose sum to first 6 terms is 46872."
    },
    "steps": [
      {
        "en": "The sum and ratio are known; the unknown is the first term a.",
        "eq": "S₆ = 46872; r = 5; n = 6"
      },
      {
        "en": "Substitute these values in the geometric series formula.",
        "eq": "46872 = a(5⁶−1)/(5−1)"
      },
      {
        "en": "Compute the geometric factor before solving for a.",
        "eq": "(15625−1)/4 = 3906"
      },
      {
        "en": "Divide to find the first term; verify by multiplying back.",
        "eq": "a = 46872/3906 = 12; 12 × 3906 = 46872"
      }
    ],
    "answer": "a = 12.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.8 Q3, printed p. 76.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.8 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Recover the ratio of a convergent G.P."
    },
    "q": {
      "en": "If the first term of an infinite G.P. is 8 and its sum to infinity is 32/3, find the common ratio."
    },
    "steps": [
      {
        "en": "For an infinite G.P. sum we must have |r| < 1.",
        "eq": "S∞ = a/(1−r)"
      },
      {
        "en": "Insert the first term and the given sum.",
        "eq": "32/3 = 8/(1−r)"
      },
      {
        "en": "Solve for r carefully.",
        "eq": "1−r = 8×3/32 = 3/4; r = 1/4"
      },
      {
        "en": "Check the convergence condition and substitute back.",
        "eq": "|1/4| < 1; 8/(1−1/4) = 32/3"
      }
    ],
    "answer": "r = 1/4.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.8 Q5, printed p. 76.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.8 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum a finite doubling series"
    },
    "q": {
      "en": "Find the sum of the geometric series 3 + 6 + 12 + … + 1536."
    },
    "steps": [
      {
        "en": "The common ratio is 2; the first term is 3.",
        "eq": "a = 3; r = 2"
      },
      {
        "en": "Determine how many terms lead from 3 to 1536.",
        "eq": "1536 = 3 × 2⁹, so n = 10"
      },
      {
        "en": "Use the geometric sum formula with ten terms.",
        "eq": "S₁₀ = 3(2¹⁰−1)/(2−1) = 3×1023"
      },
      {
        "en": "Multiply to get the sum.",
        "eq": "S₁₀ = 3069"
      }
    ],
    "answer": "3069.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.8 Q7, printed p. 76.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.9 · Q2 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of cubes from a known ordinary sum"
    },
    "q": {
      "en": "If 1 + 2 + 3 + … + k = 325, then find 1³ + 2³ + 3³ + … + k³."
    },
    "steps": [
      {
        "en": "The sum of the first k integers is already given.",
        "eq": "1+2+⋯+k = 325"
      },
      {
        "en": "Use the identity: the sum of cubes equals the square of the sum of first k natural numbers.",
        "eq": "1³+2³+⋯+k³ = (1+2+⋯+k)²"
      },
      {
        "en": "Square the given value.",
        "eq": "325² = 105625"
      }
    ],
    "answer": "105625.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.9 Q2, printed p. 81.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.9 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Recover the natural-number sum from cubes"
    },
    "q": {
      "en": "If 1³ + 2³ + 3³ + … + k³ = 44100, find 1 + 2 + 3 + … + k."
    },
    "steps": [
      {
        "en": "The sum of cubes is the square of the sum of first k natural numbers.",
        "eq": "44100 = (1+2+⋯+k)²"
      },
      {
        "en": "Because the sum of natural numbers is positive, take the positive square root.",
        "eq": "1+2+⋯+k = √44100"
      },
      {
        "en": "Calculate the square root.",
        "eq": "√44100 = 210"
      }
    ],
    "answer": "210.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.9 Q3, printed p. 81.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.9 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find how many cubes sum to 14400"
    },
    "q": {
      "en": "How many terms of the series 1³ + 2³ + 3³ + … should be taken to get the sum 14400?"
    },
    "steps": [
      {
        "en": "Use the sum-of-cubes identity to relate the total to the triangular number.",
        "eq": "14400 = [n(n+1)/2]²"
      },
      {
        "en": "Take the positive square root.",
        "eq": "n(n+1)/2 = √14400 = 120"
      },
      {
        "en": "Solve the resulting quadratic equation.",
        "eq": "n²+n−240 = 0 = (n−15)(n+16)"
      },
      {
        "en": "Only a positive whole number can count terms.",
        "eq": "n = 15"
      }
    ],
    "answer": "15 terms.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.9 Q4, printed p. 81.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.9 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine n from sum of cubes"
    },
    "q": {
      "en": "The sum of the cubes of the first n natural numbers is 2025. Find n."
    },
    "steps": [
      {
        "en": "Apply the identity for the sum of cubes.",
        "eq": "2025 = [n(n+1)/2]²"
      },
      {
        "en": "Take the positive square root to find the corresponding triangular number.",
        "eq": "n(n+1)/2 = √2025 = 45"
      },
      {
        "en": "Solve for n and reject the negative solution.",
        "eq": "n²+n−90 = 0 = (n−9)(n+10); n = 9"
      },
      {
        "en": "Check: the sum of 1 through 9 is 45, and 45² = 2025.",
        "eq": "(1+⋯+9)² = 45² = 2025"
      }
    ],
    "answer": "n = 9.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.9 Q5, printed p. 81.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q1 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: valid remainder range"
    },
    "q": {
      "en": "Euclid’s division lemma says positive integers a and b admit unique integers q and r satisfying a = bq + r. Which condition must r satisfy? (A) 1 < r < b (B) 0 < r < b (C) 0 ≤ r < b (D) 0 < r ≤ b"
    },
    "steps": [
      {
        "en": "The remainder cannot be negative when the divisor is positive.",
        "eq": "r ≥ 0"
      },
      {
        "en": "The remainder can be zero, meaning the number is exactly divisible.",
        "eq": "r = 0 is allowed"
      },
      {
        "en": "The remainder must be smaller than the divisor; otherwise another complete group can be removed.",
        "eq": "0 ≤ r < b"
      }
    ],
    "answer": "Option (C): 0 ≤ r < b.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q1, printed p. 82.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q2 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: remainders of cubes modulo 9"
    },
    "q": {
      "en": "Using Euclid’s division lemma, if the cube of a positive integer is divided by 9, what are the possible remainders? (A) 0, 1, 8 (B) 1, 4, 8 (C) 0, 1, 3 (D) 1, 3, 5"
    },
    "steps": [
      {
        "en": "Every integer has one of nine possible remainders when divided by 9.",
        "eq": "n mod 9 ∈ {0,1,2,3,4,5,6,7,8}"
      },
      {
        "en": "Cube a representative of each remainder and reduce modulo 9.",
        "eq": "0³ mod 9 = 0; 1³ mod 9 = 1; 2³ mod 9 = 8; 3³ mod 9 = 0; 4³ mod 9 = 1"
      },
      {
        "en": "The remaining representatives 5, 6, 7, 8 give 8, 0, 1, 8 respectively.",
        "eq": "Possible remainders = {0,1,8}"
      }
    ],
    "answer": "Option (A): 0, 1, 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q2, printed p. 82.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: HCF as a linear combination"
    },
    "q": {
      "en": "If the HCF of 65 and 117 is expressible as 65m − 117, find m. (A) 4 (B) 2 (C) 1 (D) 3"
    },
    "steps": [
      {
        "en": "Find the HCF by Euclid's algorithm.",
        "eq": "117 = 65 + 52; 65 = 52 + 13; 52 = 13 × 4"
      },
      {
        "en": "The last nonzero remainder is 13, so substitute it in the given expression.",
        "eq": "65m − 117 = 13"
      },
      {
        "en": "Solve the linear equation.",
        "eq": "65m = 130; m = 2"
      }
    ],
    "answer": "Option (B): m = 2.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q3, printed p. 82.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: exponents in prime factorisation"
    },
    "q": {
      "en": "The sum of the exponents of the prime factors in the prime factorization of 1729 is (A) 1 (B) 2 (C) 3 (D) 4."
    },
    "steps": [
      {
        "en": "Factor 1729 into primes.",
        "eq": "1729 = 7 × 247 = 7 × 13 × 19"
      },
      {
        "en": "The three primes all have exponent 1.",
        "eq": "1729 = 7¹ × 13¹ × 19¹"
      },
      {
        "en": "Sum the exponents, not the prime numbers.",
        "eq": "1+1+1 = 3"
      }
    ],
    "answer": "Option (C): 3.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q4, printed p. 82.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: least common multiple of 1 through 10"
    },
    "q": {
      "en": "The least number divisible by every integer from 1 to 10 inclusive is (A) 2025 (B) 5220 (C) 5025 (D) 2520."
    },
    "steps": [
      {
        "en": "We need the least common multiple of the numbers 1 through 10.",
        "eq": "LCM(1,2,3,4,5,6,7,8,9,10)"
      },
      {
        "en": "Take only the greatest powers of primes required by those numbers.",
        "eq": "2³ from 8; 3² from 9; 5; 7"
      },
      {
        "en": "Multiply the required prime factors.",
        "eq": "2³×3²×5×7 = 2520"
      }
    ],
    "answer": "Option (D): 2520.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q5, printed p. 82.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: identify an A.P. term by its remainder"
    },
    "q": {
      "en": "An A.P. has first term 1 and common difference 4. Which could be a term? (A) 4551 (B) 10091 (C) 7881 (D) 13531."
    },
    "steps": [
      {
        "en": "Write the nth term of the A.P. without generating all the terms.",
        "eq": "aₙ = 1+(n−1)4 = 4n−3"
      },
      {
        "en": "Every term therefore leaves remainder 1 when divided by 4.",
        "eq": "aₙ ≡ 1 (mod 4)"
      },
      {
        "en": "Test the candidates: only 7881 has remainder 1, because 7881 = 4×1970 + 1.",
        "eq": "7881 = 4×1970 + 1; n = 1971"
      }
    ],
    "answer": "Option (C): 7881.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q8, printed p. 83.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: an A.P. identity"
    },
    "q": {
      "en": "If 6 times the 6th term of an A.P. equals 7 times its 7th term, what is the 13th term? (A) 0 (B) 6 (C) 7 (D) 13."
    },
    "steps": [
      {
        "en": "Express the two known positions in the general A.P. formula.",
        "eq": "t₆ = a+5d; t₇ = a+6d"
      },
      {
        "en": "Apply the relationship given in the question.",
        "eq": "6(a+5d) = 7(a+6d)"
      },
      {
        "en": "Rearrange to find the first term in terms of the common difference.",
        "eq": "6a+30d = 7a+42d; a = −12d"
      },
      {
        "en": "Substitute in the 13th-term formula.",
        "eq": "t₁₃ = a+12d = −12d+12d = 0"
      }
    ],
    "answer": "Option (A): 0.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q9, printed p. 83.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: odd-length arithmetic sum"
    },
    "q": {
      "en": "An A.P. consists of 31 terms. If its 16th term is m, then find the sum of all the terms. (A) 16m (B) 62m (C) 31m (D) 31m/2."
    },
    "steps": [
      {
        "en": "An odd number of terms has a single middle term. For 31 terms the middle is the 16th.",
        "eq": "Middle term = t₁₆ = m"
      },
      {
        "en": "Pair terms equally far from the middle. Each pair sums to twice the middle term.",
        "eq": "t₁+t₃₁ = 2m; t₂+t₃₀ = 2m"
      },
      {
        "en": "There are 15 pairs plus the middle term.",
        "eq": "S₃₁ = 15(2m)+m = 31m"
      }
    ],
    "answer": "Option (C): 31m.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q10, printed p. 83.",
    "edition": "2025",
    "translationReview": "pending",
    "traceStatus": "source-text reviewed; arithmetic independently checked"
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
      "ta": "Exercise 2.10 · Q11 (English source; Tamil review pending)"
    },
    "title": {
      "en": "MCQ: count terms from an arithmetic sum"
    },
    "q": {
      "en": "In an A.P., the first term is 1 and common difference is 4. How many terms sum to 120? (A) 6 (B) 7 (C) 8 (D) 9."
    },
    "steps": [
      {
        "en": "Use the first-term and common-difference form of the arithmetic sum formula.",
        "eq": "Sₙ = n[2a+(n−1)d]/2"
      },
      {
        "en": "Substitute a=1, d=4 and Sₙ=120.",
        "eq": "120 = n[2+4(n−1)]/2 = n(2n−1)"
      },
      {
        "en": "Solve or test the candidate n=8.",
        "eq": "8(16−1) = 8×15 = 120"
      },
      {
        "en": "Since n(2n−1) increases for positive integers, this positive solution is unique.",
        "eq": "n = 8"
      }
    ],
    "answer": "Option (C): 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025 English edition, Chapter 2, Exercise 2.10 Q11, printed p. 83.",
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
window.TRIGGLE_G10_CH2_SUPPLEMENTS['2.7–2.10']={candidates:originalCount,integrated:extras.length,held:originalCount-extras.length};
})();