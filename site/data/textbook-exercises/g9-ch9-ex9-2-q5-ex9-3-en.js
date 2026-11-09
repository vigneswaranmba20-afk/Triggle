// Grade 9 English 2025, Probability Ex 9.2 Q5 and Ex 9.3 Q1-Q10.
// Content-only sprint: 2025 English and Tamil PDF text-layer checks; page-image checks pending.
// Tamil is not claimed complete. No UI review has been conducted for this batch.
(()=>{
 'use strict';
 const entries=[
  {
    "id": "g9-ch9-ex9.2-q5",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.2 · Q5",
      "ta": "Exercise 9.2 · Q5 (English only)"
    },
    "title": {
      "en": "Families and maids",
      "ta": "Families and maids (English only)"
    },
    "q": {
      "en": "1500 families were surveyed and following data was recorded about their maids at homes\nType of maids           Only part time    Only full time    Both\nNumber of families      860               370               250\nA family is selected at random. Find the probability that the family selected has\n(i)Both types of maids (ii)Part time maids (iii)No maids",
      "ta": "English-language question; Tamil version pending. 1500 families were surveyed and following data was recorded about their maids at homes\nType of maids           Only part time    Only full time    Both\nNumber of families      860               370               250\nA family is selected at random. Find the probability that the family selected has\n(i)Both types of maids (ii)Part time maids (iii)No maids"
    },
    "steps": [
      {
        "en": "The three recorded categories are mutually exclusive: only part time, only full time and both.",
        "ta": "English explanation (Tamil version pending): The three recorded categories are mutually exclusive: only part time, only full time and both.",
        "eq": "860 + 370 + 250 = 1480"
      },
      {
        "en": "Count the families with both types of maids.",
        "ta": "English explanation (Tamil version pending): Count the families with both types of maids.",
        "eq": "P(both) = [[250|1500]] = [[1|6]]"
      },
      {
        "en": "For part-time maids, the printed answer key uses the 'Only part time' category; use 860 families. The wording is ambiguous because the 250 'Both' families also employ part-time maids.",
        "ta": "English explanation (Tamil version pending): For part-time maids, the printed answer key uses the 'Only part time' category; use 860 families. The wording is ambiguous because the 250 'Both' families also employ part-time maids.",
        "eq": "P(only part time) = [[860|1500]] = [[43|75]]"
      },
      {
        "en": "Find households without maids by subtracting the recorded households from all surveyed households.",
        "ta": "English explanation (Tamil version pending): Find households without maids by subtracting the recorded households from all surveyed households.",
        "eq": "No maids = 1500 − 1480 = 20"
      },
      {
        "en": "Divide by the total to get the probability of no maids.",
        "ta": "English explanation (Tamil version pending): Divide by the total to get the probability of no maids.",
        "eq": "P(none) = [[20|1500]] = [[1|75]]"
      }
    ],
    "answer": "(i) [[1|6]] ; (ii) [[43|75]] (textbook 'only part time' interpretation) ; (iii) [[1|75]]",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [
        "Table layout must be checked against original page image",
        "Printed part (ii) answer 43/75 counts only-part-time families; alternative broad interpretation 37/50 requires explicit clarification"
      ]
    }
  },
  {
    "id": "g9-ch9-ex9.3-q1",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q1",
      "ta": "Exercise 9.3 · Q1 (English only)"
    },
    "title": {
      "en": "Probability",
      "ta": "Probability (English only)"
    },
    "q": {
      "en": "A number between 0 and 1 that is used to measure uncertainty is called\n(1) Random variable  (2) Trial  (3) Simple event  (4) Probability",
      "ta": "English-language question; Tamil version pending. A number between 0 and 1 that is used to measure uncertainty is called\n(1) Random variable  (2) Trial  (3) Simple event  (4) Probability"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "Probability measures the likelihood of an event on the scale from 0 to 1."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "0 ≤ P(E) ≤ 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (4) Probability"
      }
    ],
    "answer": "(4) Probability",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q2",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q2",
      "ta": "Exercise 9.3 · Q2 (English only)"
    },
    "title": {
      "en": "0 and 1",
      "ta": "0 and 1 (English only)"
    },
    "q": {
      "en": "Probability lies between\n(1) −1 and +1  (2) 0 and 1  (3) 0 and 2  (4) 0 and 0.5",
      "ta": "English-language question; Tamil version pending. Probability lies between\n(1) −1 and +1  (2) 0 and 1  (3) 0 and 2  (4) 0 and 0.5"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "The probability of any event cannot be negative and cannot be greater than 1."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "0 ≤ P(E) ≤ 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (2) 0 and 1"
      }
    ],
    "answer": "(2) 0 and 1",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q3",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q3",
      "ta": "Exercise 9.3 · Q3 (English only)"
    },
    "title": {
      "en": "Empirical probability",
      "ta": "Empirical probability (English only)"
    },
    "q": {
      "en": "The probability based on the concept of relative frequency theory is called\n(1) Empirical probability  (2) Classical probability  (3) Both (1) and (2)  (4) Neither (1) nor (2)",
      "ta": "English-language question; Tamil version pending. The probability based on the concept of relative frequency theory is called\n(1) Empirical probability  (2) Classical probability  (3) Both (1) and (2)  (4) Neither (1) nor (2)"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "Empirical probability is estimated from observed frequencies over repeated trials."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "P(E) ≈ [[Number of occurrences of E|Total trials]]"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (1) Empirical probability"
      }
    ],
    "answer": "(1) Empirical probability",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q4",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q4",
      "ta": "Exercise 9.3 · Q4 (English only)"
    },
    "title": {
      "en": "Less than zero",
      "ta": "Less than zero (English only)"
    },
    "q": {
      "en": "The probability of an event cannot be\n(1) Equal to zero  (2) Greater than zero  (3) Equal to one  (4) Less than zero",
      "ta": "English-language question; Tamil version pending. The probability of an event cannot be\n(1) Equal to zero  (2) Greater than zero  (3) Equal to one  (4) Less than zero"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "A probability may be 0, between 0 and 1, or exactly 1, but never negative."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "P(E) ≥ 0"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (4) Less than zero"
      }
    ],
    "answer": "(4) Less than zero",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q5",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q5",
      "ta": "Exercise 9.3 · Q5 (English only)"
    },
    "title": {
      "en": "One",
      "ta": "One (English only)"
    },
    "q": {
      "en": "The probability of all possible outcomes of a random experiment is always equal to\n(1) One  (2) Zero  (3) Infinity  (4) Less than one",
      "ta": "English-language question; Tamil version pending. The probability of all possible outcomes of a random experiment is always equal to\n(1) One  (2) Zero  (3) Infinity  (4) Less than one"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "All possible outcomes together make the sample space S, a certain event."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "P(S) = 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (1) One"
      }
    ],
    "answer": "(1) One",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q6",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q6",
      "ta": "Exercise 9.3 · Q6 (English only)"
    },
    "title": {
      "en": "1−P(A)",
      "ta": "1−P(A) (English only)"
    },
    "q": {
      "en": "If A is any event in S and its complement is A’ then, P(A′) is equal to\n(1) 1  (2) 0  (3) 1−A  (4) 1−P(A)",
      "ta": "English-language question; Tamil version pending. If A is any event in S and its complement is A’ then, P(A′) is equal to\n(1) 1  (2) 0  (3) 1−A  (4) 1−P(A)"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "An event and its complement are exhaustive and mutually exclusive; their probabilities add to 1."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "P(A′) = 1 − P(A)"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (4) 1−P(A)"
      }
    ],
    "answer": "(4) 1−P(A)",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [
        "Complement glyph P(A′) reconstructed from broken PDF text; visually confirm"
      ]
    }
  },
  {
    "id": "g9-ch9-ex9.3-q7",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q7",
      "ta": "Exercise 9.3 · Q7 (English only)"
    },
    "title": {
      "en": "−1",
      "ta": "−1 (English only)"
    },
    "q": {
      "en": "Which of the following cannot be taken as probability of an event?\n(1) 0  (2) 0.5  (3) 1  (4) −1",
      "ta": "English-language question; Tamil version pending. Which of the following cannot be taken as probability of an event?\n(1) 0  (2) 0.5  (3) 1  (4) −1"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "Only values between 0 and 1, including endpoints, are valid probabilities."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "−1 < 0 ≤ P(E)"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (4) −1"
      }
    ],
    "answer": "(4) −1",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 335,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q8",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q8",
      "ta": "Exercise 9.3 · Q8 (English only)"
    },
    "title": {
      "en": "Outcome",
      "ta": "Outcome (English only)"
    },
    "q": {
      "en": "A particular result of an experiment is called\n(1) Trial  (2) Simple event  (3) Compound event  (4) Outcome",
      "ta": "English-language question; Tamil version pending. A particular result of an experiment is called\n(1) Trial  (2) Simple event  (3) Compound event  (4) Outcome"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "One specific result is an outcome; a trial is the experiment being performed."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "Single result = outcome"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (4) Outcome"
      }
    ],
    "answer": "(4) Outcome",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 336,
      "taPrintedPage": 320,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q9",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q9",
      "ta": "Exercise 9.3 · Q9 (English only)"
    },
    "title": {
      "en": "Event",
      "ta": "Event (English only)"
    },
    "q": {
      "en": "A collection of one or more outcomes of an experiment is called\n(1) Event  (2) Outcome  (3) Sample point  (4) None of the above",
      "ta": "English-language question; Tamil version pending. A collection of one or more outcomes of an experiment is called\n(1) Event  (2) Outcome  (3) Sample point  (4) None of the above"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "An event is a subset of the sample space containing one or more outcomes."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "E ⊆ S"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (1) Event"
      }
    ],
    "answer": "(1) Event",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 336,
      "taPrintedPage": 320,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch9-ex9.3-q10",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "Probability (English version only)"
    },
    "label": {
      "en": "Exercise 9.3 · Q10",
      "ta": "Exercise 9.3 · Q10 (English only)"
    },
    "title": {
      "en": "Fair",
      "ta": "Fair (English only)"
    },
    "q": {
      "en": "The six faces of the dice are called equally likely if the dice is\n(1) Small  (2) Fair  (3) Six-faced  (4) Round",
      "ta": "English-language question; Tamil version pending. The six faces of the dice are called equally likely if the dice is\n(1) Small  (2) Fair  (3) Six-faced  (4) Round"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "English explanation (Tamil version pending): Identify what the question is asking about.",
        "eq": "A fair six-faced die gives each face the same chance, one out of six."
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "English explanation (Tamil version pending): Apply the probability rule or definition.",
        "eq": "P(each face) = [[1|6]]"
      },
      {
        "en": "Select the matching option.",
        "ta": "English explanation (Tamil version pending): Select the matching option.",
        "eq": "Correct option: (2) Fair"
      }
    ],
    "answer": "(2) Fair",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 336,
      "taPrintedPage": 320,
      "tamilEditorial": "pending",
      "notes": []
    }
  }
];
 const grade=window.TRIGGLE_CLASSES?.[9];
 const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch9');
 if(!grade||!chapter)throw Error('Grade 9 Probability content integration missing grade/chapter');
 chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
 for(const item of entries){
   if(grade.items.some(e=>e.id===item.id))throw Error('Duplicate Grade 9 content ID: '+item.id);
   grade.items.push(item);
   if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);
 }
 window.TRIGGLE_G9_CH9_EX9_2_Q5_EX9_3_EN=entries.map(item=>item.id);
})();
