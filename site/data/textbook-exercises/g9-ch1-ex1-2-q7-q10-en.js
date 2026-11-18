/* TRACE 2025 Grade 9 Exercise 1.2 Q7, Q8(i–iv), Q9(i–ii), and Q10(i–iii) English source-backed lessons. */
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch1-ex1.2-q7",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q7",
      "ta": "Exercise 1.2 · Q7 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subsets of nested set A = {a, {a, b}}"
    },
    "q": {
      "en": "7. If A = {a, {a, b}}, write all the subsets of A."
    },
    "steps": [
      {
        "en": "In A = {a, {a, b}}, the outer curly braces { } enclose 2 elements: the single letter a and the entire inner set {a, b} treated as one object, so the cardinal number n(A) is 2.",
        "eq": "A = {a, {a,b}}; n(A)=2",
        "math": {
          "latex": "A=\\{a,\\ \\{a,b\\}\\};\\quad n(A)=2",
          "fallback": "A = {a, {a,b}}; n(A)=2",
          "display": true
        },
        "reasonMath": {
          "en": "In A = {a, {a, b}}, the outer curly braces { } enclose 2 elements: the single letter a and the entire inner set {a, b} treated as one object, so the cardinal number n(A) is 2."
        }
      },
      {
        "en": "In n[P(A)] = 2^{n(A)}, P(A) denotes the power set (the set of all subsets of A). Because n(A) = 2, set A has 2² = 4 subsets in total.",
        "eq": "n[P(A)] = 2² = 4",
        "math": {
          "latex": "n[P(A)]=2^2=4",
          "fallback": "n[P(A)] = 2² = 4",
          "display": true
        },
        "reasonMath": {
          "en": [
            "In ",
            {
              "latex": "n[P(A)]=2^{n(A)}",
              "fallback": "n[P(A)] = 2^{n(A)}"
            },
            ", P(A) denotes the power set (the set of all subsets of A). Because n(A) = 2, set A has 2² = 4 subsets in total."
          ]
        }
      },
      {
        "en": "List all 4 subsets of A: the empty set ∅ (0 elements), the two one-element subsets {a} and {{a, b}}, and the full set {a, {a, b}} itself.",
        "eq": "P(A) = {∅, {a}, {{a,b}}, {a,{a,b}}}",
        "math": {
          "latex": "\\begin{aligned}P(A)=\\{&\\varnothing,\\ \\{a\\},\\\\&\\{\\{a,b\\}\\},\\ \\{a,\\{a,b\\}\\}\\}\\end{aligned}",
          "fallback": "P(A) = {∅, {a}, {{a,b}}, {a,{a,b}}}",
          "display": true
        },
        "reasonMath": {
          "en": "List all 4 subsets of A: the empty set ∅ (0 elements), the two one-element subsets {a} and {{a, b}}, and the full set {a, {a, b}} itself."
        }
      }
    ],
    "answer": "∅, {a}, {{a, b}}, {a, {a, b}}",
    "answerMath": {
      "latex": "\\varnothing,\\ \\{a\\},\\ \\{\\{a,b\\}\\},\\ \\{a,\\{a,b\\}\\}",
      "fallback": "∅, {a}, {{a, b}}, {a, {a, b}}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q7 (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "7. If ",
        {
          "latex": "A=\\{a,\\ \\{a,b\\}\\}",
          "fallback": "A = {a, {a, b}}"
        },
        ", write all the subsets of A."
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q8-i",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q8(i)",
      "ta": "Exercise 1.2 · Q8(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Power set of A = {a, b}"
    },
    "q": {
      "en": "8. Write down the power set of the following sets:\n(i) A = {a, b}"
    },
    "steps": [
      {
        "en": "Set A = {a, b} contains 2 distinct elements inside its curly braces { }, so its cardinal number n(A) is 2 and it has 2² = 4 subsets.",
        "eq": "n(A) = 2",
        "math": {
          "latex": "n(A)=2",
          "fallback": "n(A) = 2",
          "display": true
        },
        "reasonMath": {
          "en": "Set A = {a, b} contains 2 distinct elements inside its curly braces { }, so its cardinal number n(A) is 2 and it has 2² = 4 subsets."
        }
      },
      {
        "en": "Form every possible subset of A by choosing 0 elements (the empty set ∅), 1 element at a time ({a} and {b}), or both elements ({a, b}).",
        "eq": "∅; {a}; {b}; {a,b}",
        "math": {
          "latex": "\\varnothing;\\ \\{a\\};\\ \\{b\\};\\ \\{a,b\\}",
          "fallback": "∅; {a}; {b}; {a,b}",
          "display": true
        },
        "reasonMath": {
          "en": "Form every possible subset of A by choosing 0 elements (the empty set ∅), 1 element at a time ({a} and {b}), or both elements ({a, b})."
        }
      },
      {
        "en": "The power set P(A) is the set whose elements are all the subsets of A, enclosed together inside outer curly braces { }.",
        "eq": "P(A) = {∅, {a}, {b}, {a,b}}",
        "math": {
          "latex": "P(A)=\\{\\varnothing,\\ \\{a\\},\\ \\{b\\},\\ \\{a,b\\}\\}",
          "fallback": "P(A) = {∅, {a}, {b}, {a,b}}",
          "display": true
        },
        "reasonMath": {
          "en": "The power set P(A) is the set whose elements are all the subsets of A, enclosed together inside outer curly braces { }."
        }
      }
    ],
    "answer": "P(A) = {∅, {a}, {b}, {a, b}}",
    "answerMath": {
      "latex": "P(A)=\\{\\varnothing,\\ \\{a\\},\\ \\{b\\},\\ \\{a,b\\}\\}",
      "fallback": "P(A) = {∅, {a}, {b}, {a, b}}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q8(i) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "8. Write down the power set of the following sets:\n(i) ",
        {
          "latex": "A=\\{a,b\\}",
          "fallback": "A = {a, b}"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q8-ii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q8(ii)",
      "ta": "Exercise 1.2 · Q8(ii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Power set of B = {1, 2, 3}"
    },
    "q": {
      "en": "8. Write down the power set of the following sets:\n(ii) B = {1, 2, 3}"
    },
    "steps": [
      {
        "en": "Each of the 3 distinct elements in B = {1, 2, 3} has 2 choices (either include it or omit it), giving 2³ = 8 subsets in total.",
        "eq": "2³ = 8 subsets",
        "math": {
          "latex": "2^3=8\\text{ subsets}",
          "fallback": "2³ = 8 subsets",
          "display": true
        },
        "reasonMath": {
          "en": "Each of the 3 distinct elements in B = {1, 2, 3} has 2 choices (either include it or omit it), giving 2³ = 8 subsets in total."
        }
      },
      {
        "en": "Group the subsets systematically by size: 1 empty subset (size 0), 3 singletons (size 1), 3 pairs (size 2), and 1 full set (size 3).",
        "eq": "1 + 3 + 3 + 1 = 8",
        "math": {
          "latex": "1+3+3+1=8",
          "fallback": "1 + 3 + 3 + 1 = 8",
          "display": true
        },
        "reasonMath": {
          "en": "Group the subsets systematically by size: 1 empty subset (size 0), 3 singletons (size 1), 3 pairs (size 2), and 1 full set (size 3)."
        }
      },
      {
        "en": "Enclose all 8 subsets—starting with the empty set ∅ and ending with {1, 2, 3}—inside outer curly braces { } to write the power set P(B).",
        "eq": "P(B) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}",
        "math": {
          "latex": "\\begin{aligned}P(B)=\\{&\\varnothing,\\ \\{1\\},\\ \\{2\\},\\ \\{3\\},\\\\&\\{1,2\\},\\ \\{1,3\\},\\ \\{2,3\\},\\ \\{1,2,3\\}\\}\\end{aligned}",
          "fallback": "P(B) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}",
          "display": true
        },
        "reasonMath": {
          "en": "Enclose all 8 subsets—starting with the empty set ∅ and ending with {1, 2, 3}—inside outer curly braces { } to write the power set P(B)."
        }
      }
    ],
    "answer": "P(B) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}",
    "answerMath": {
      "latex": "\\begin{aligned}P(B)=\\{&\\varnothing,\\ \\{1\\},\\ \\{2\\},\\ \\{3\\},\\\\&\\{1,2\\},\\ \\{1,3\\},\\ \\{2,3\\},\\ \\{1,2,3\\}\\}\\end{aligned}",
      "fallback": "P(B) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q8(ii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "8. Write down the power set of the following sets:\n(ii) ",
        {
          "latex": "B=\\{1,2,3\\}",
          "fallback": "B = {1, 2, 3}"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q8-iii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q8(iii)",
      "ta": "Exercise 1.2 · Q8(iii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Power set of D = {p, q, r, s}"
    },
    "q": {
      "en": "8. Write down the power set of the following sets:\n(iii) D = {p, q, r, s}"
    },
    "steps": [
      {
        "en": "Set D = {p, q, r, s} has 4 distinct elements, so the number of elements in its power set P(D) is n[P(D)] = 2⁴ = 16 subsets.",
        "eq": "n[P(D)] = 2⁴ = 16",
        "math": {
          "latex": "n[P(D)]=2^4=16",
          "fallback": "n[P(D)] = 2⁴ = 16",
          "display": true
        },
        "reasonMath": {
          "en": "Set D = {p, q, r, s} has 4 distinct elements, so the number of elements in its power set P(D) is n[P(D)] = 2⁴ = 16 subsets."
        }
      },
      {
        "en": "First list the 0-element subset (the empty set ∅) and the 4 one-element (singleton) subsets.",
        "eq": "∅; {p}; {q}; {r}; {s}",
        "math": {
          "latex": "\\varnothing;\\ \\{p\\};\\ \\{q\\};\\ \\{r\\};\\ \\{s\\}",
          "fallback": "∅; {p}; {q}; {r}; {s}",
          "display": true
        },
        "reasonMath": {
          "en": "First list the 0-element subset (the empty set ∅) and the 4 one-element (singleton) subsets."
        }
      },
      {
        "en": "Next list all 6 two-element subsets in alphabetical pair order so that no pair is missed or repeated.",
        "eq": "{p,q}; {p,r}; {p,s}; {q,r}; {q,s}; {r,s}",
        "math": {
          "latex": "\\begin{aligned}&\\{p,q\\};\\ \\{p,r\\};\\ \\{p,s\\};\\\\&\\{q,r\\};\\ \\{q,s\\};\\ \\{r,s\\}\\end{aligned}",
          "fallback": "{p,q}; {p,r}; {p,s}; {q,r}; {q,s}; {r,s}",
          "display": true
        },
        "reasonMath": {
          "en": "Next list all 6 two-element subsets in alphabetical pair order so that no pair is missed or repeated."
        }
      },
      {
        "en": "Then list the 4 three-element subsets (each formed by omitting one letter) together with the 1 four-element subset D itself.",
        "eq": "{p,q,r}; {p,q,s}; {p,r,s}; {q,r,s}; {p,q,r,s}",
        "math": {
          "latex": "\\begin{aligned}&\\{p,q,r\\};\\ \\{p,q,s\\};\\ \\{p,r,s\\};\\\\&\\{q,r,s\\};\\ \\{p,q,r,s\\}\\end{aligned}",
          "fallback": "{p,q,r}; {p,q,s}; {p,r,s}; {q,r,s}; {p,q,r,s}",
          "display": true
        },
        "reasonMath": {
          "en": "Then list the 4 three-element subsets (each formed by omitting one letter) together with the 1 four-element subset D itself."
        }
      },
      {
        "en": "Verify the total count across sizes 0, 1, 2, 3, and 4 (1 + 4 + 6 + 4 + 1 = 16) and enclose all 16 subsets in outer braces { } to form P(D).",
        "eq": "1 + 4 + 6 + 4 + 1 = 16",
        "math": {
          "latex": "1+4+6+4+1=16",
          "fallback": "1 + 4 + 6 + 4 + 1 = 16",
          "display": true
        },
        "reasonMath": {
          "en": "Verify the total count across sizes 0, 1, 2, 3, and 4 (1 + 4 + 6 + 4 + 1 = 16) and enclose all 16 subsets in outer braces { } to form P(D)."
        }
      }
    ],
    "answer": "P(D) = {∅, {p}, {q}, {r}, {s}, {p,q}, {p,r}, {p,s}, {q,r}, {q,s}, {r,s}, {p,q,r}, {p,q,s}, {p,r,s}, {q,r,s}, {p,q,r,s}}",
    "answerMath": {
      "latex": "\\begin{aligned}P(D)=\\{&\\varnothing,\\ \\{p\\},\\ \\{q\\},\\ \\{r\\},\\ \\{s\\},\\\\&\\{p,q\\},\\ \\{p,r\\},\\ \\{p,s\\},\\\\&\\{q,r\\},\\ \\{q,s\\},\\ \\{r,s\\},\\\\&\\{p,q,r\\},\\ \\{p,q,s\\},\\\\&\\{p,r,s\\},\\ \\{q,r,s\\},\\ \\{p,q,r,s\\}\\}\\end{aligned}",
      "fallback": "P(D) = {∅, {p}, {q}, {r}, {s}, {p,q}, {p,r}, {p,s}, {q,r}, {q,s}, {r,s}, {p,q,r}, {p,q,s}, {p,r,s}, {q,r,s}, {p,q,r,s}}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q8(iii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "8. Write down the power set of the following sets:\n(iii) ",
        {
          "latex": "D=\\{p,q,r,s\\}",
          "fallback": "D = {p, q, r, s}"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q8-iv",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q8(iv)",
      "ta": "Exercise 1.2 · Q8(iv) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Power set of the empty set E = ∅"
    },
    "q": {
      "en": "8. Write down the power set of the following sets:\n(iv) E = ∅"
    },
    "steps": [
      {
        "en": "The symbol ∅ denotes the empty (or null) set, so set E = ∅ contains 0 elements.",
        "eq": "E = ∅",
        "math": {
          "latex": "E=\\varnothing",
          "fallback": "E = ∅",
          "display": true
        },
        "reasonMath": {
          "en": "The symbol ∅ denotes the empty (or null) set, so set E = ∅ contains 0 elements."
        }
      },
      {
        "en": "The symbol ⊆ means “is a subset of”. Because the empty set ∅ is a subset of every set, ∅ is a subset of E itself.",
        "eq": "∅ ⊆ ∅",
        "math": {
          "latex": "\\varnothing\\subseteq\\varnothing",
          "fallback": "∅ ⊆ ∅",
          "display": true
        },
        "reasonMath": {
          "en": "The symbol ⊆ means “is a subset of”. Because the empty set ∅ is a subset of every set, ∅ is a subset of E itself."
        }
      },
      {
        "en": "An empty set has no other subsets, so the power set P(E) contains exactly 1 element—namely ∅ inside curly braces {∅}.",
        "eq": "P(E) = {∅}; n[P(E)] = 1",
        "math": {
          "latex": "P(E)=\\{\\varnothing\\};\\quad n[P(E)]=1",
          "fallback": "P(E) = {∅}; n[P(E)] = 1",
          "display": true
        },
        "reasonMath": {
          "en": "An empty set has no other subsets, so the power set P(E) contains exactly 1 element—namely ∅ inside curly braces {∅}."
        }
      }
    ],
    "answer": "P(E) = {∅}",
    "answerMath": {
      "latex": "P(E)=\\{\\varnothing\\}",
      "fallback": "P(E) = {∅}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q8(iv) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "8. Write down the power set of the following sets:\n(iv) ",
        {
          "latex": "E=\\varnothing",
          "fallback": "E = ∅"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q9-i",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q9(i)",
      "ta": "Exercise 1.2 · Q9(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subsets and proper subsets of W = {red, blue, yellow}"
    },
    "q": {
      "en": "9. Find the number of subsets and the number of proper subsets of the following sets.\n(i) W = {red, blue, yellow}"
    },
    "steps": [
      {
        "en": "Count the distinct colour names inside the curly braces { } of W = {red, blue, yellow} to find its cardinal number n(W) = 3.",
        "eq": "n(W) = 3",
        "math": {
          "latex": "n(W)=3",
          "fallback": "n(W) = 3",
          "display": true
        },
        "reasonMath": {
          "en": "Count the distinct colour names inside the curly braces { } of W = {red, blue, yellow} to find its cardinal number n(W) = 3."
        }
      },
      {
        "en": "A set with m = n(W) elements has 2^m subsets in total. Substitute m = 3 to get 2³ = 2 × 2 × 2 = 8 subsets.",
        "eq": "Number of subsets = 2³ = 8",
        "math": {
          "latex": "\\text{Number of subsets}=2^3=8",
          "fallback": "Number of subsets = 2³ = 8",
          "display": true
        },
        "reasonMath": {
          "en": [
            "A set with m = n(W) elements has ",
            {
              "latex": "2^m",
              "fallback": "2^m"
            },
            " subsets in total. Substitute m = 3 to get 2³ = 2 × 2 × 2 = 8 subsets."
          ]
        }
      },
      {
        "en": "A proper subset of W is any subset except the full set W itself, so subtract 1 from the total number of subsets: 2³ − 1 = 8 − 1 = 7.",
        "eq": "Proper subsets = 2³ − 1 = 7",
        "math": {
          "latex": "\\text{Proper subsets}=2^3-1=7",
          "fallback": "Proper subsets = 2³ − 1 = 7",
          "display": true
        },
        "reasonMath": {
          "en": "A proper subset of W is any subset except the full set W itself, so subtract 1 from the total number of subsets: 2³ − 1 = 8 − 1 = 7."
        }
      }
    ],
    "answer": "8 subsets; 7 proper subsets",
    "answerMath": {
      "latex": "\\text{8 subsets;\\quad 7 proper subsets}",
      "fallback": "8 subsets; 7 proper subsets",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q9(i) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "9. Find the number of subsets and the number of proper subsets of the following sets.\n(i) ",
        {
          "latex": "W=\\{\\text{red, blue, yellow}\\}",
          "fallback": "W = {red, blue, yellow}"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q9-ii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q9(ii)",
      "ta": "Exercise 1.2 · Q9(ii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subsets and proper subsets of X = {x² : x ∈ N, x² ≤ 100}"
    },
    "q": {
      "en": "9. Find the number of subsets and the number of proper subsets of the following sets.\n(ii) X = {x² : x∈N, x² ≤ 100}"
    },
    "steps": [
      {
        "en": "In X = {x² : x ∈ N, x² ≤ 100}, ∈ means “belongs to”, N is the set of natural numbers {1, 2, 3, …}, and ≤ means “less than or equal to”. The natural numbers whose squares are at most 100 are 1 through 10.",
        "eq": "x = 1, 2, …, 10",
        "math": {
          "latex": "x=1,2,\\ldots,10",
          "fallback": "x = 1, 2, …, 10",
          "display": true
        },
        "reasonMath": {
          "en": "In X = {x² : x ∈ N, x² ≤ 100}, ∈ means “belongs to”, N is the set of natural numbers {1, 2, 3, …}, and ≤ means “less than or equal to”. The natural numbers whose squares are at most 100 are 1 through 10."
        }
      },
      {
        "en": "Square each natural number from 1 to 10 to list the 10 distinct elements of set X, giving cardinal number n(X) = 10.",
        "eq": "X = {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}",
        "math": {
          "latex": "\\begin{aligned}X=\\{&1,4,9,16,25,\\\\&36,49,64,81,100\\}\\end{aligned}",
          "fallback": "X = {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}",
          "display": true
        },
        "reasonMath": {
          "en": "Square each natural number from 1 to 10 to list the 10 distinct elements of set X, giving cardinal number n(X) = 10."
        }
      },
      {
        "en": "Use the subset formula 2^{n(X)} with n(X) = 10 to find the total number of subsets: 2¹⁰ = 1024 subsets.",
        "eq": "2¹⁰ = 1024 subsets",
        "math": {
          "latex": "2^{10}=1024\\text{ subsets}",
          "fallback": "2¹⁰ = 1024 subsets",
          "display": true
        },
        "reasonMath": {
          "en": [
            "Use the subset formula ",
            {
              "latex": "2^{n(X)}",
              "fallback": "2^{n(X)}"
            },
            " with n(X) = 10 to find the total number of subsets: 2¹⁰ = 1024 subsets."
          ]
        }
      },
      {
        "en": "Subtract 1 (to exclude the improper subset X itself) to find the number of proper subsets: 1024 − 1 = 1023 proper subsets.",
        "eq": "1024 − 1 = 1023 proper subsets",
        "math": {
          "latex": "1024-1=1023\\text{ proper subsets}",
          "fallback": "1024 − 1 = 1023 proper subsets",
          "display": true
        },
        "reasonMath": {
          "en": "Subtract 1 (to exclude the improper subset X itself) to find the number of proper subsets: 1024 − 1 = 1023 proper subsets."
        }
      }
    ],
    "answer": "1024 subsets; 1023 proper subsets",
    "answerMath": {
      "latex": "\\begin{aligned}&\\text{1024 subsets;}\\\\&\\text{1023 proper subsets}\\end{aligned}",
      "fallback": "1024 subsets; 1023 proper subsets",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q9(ii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "9. Find the number of subsets and the number of proper subsets of the following sets.\n(ii) ",
        {
          "latex": "X=\\{x^2:x\\in\\mathbb{N},\\ x^2\\le 100\\}",
          "fallback": "X = {x² : x∈N, x² ≤ 100}"
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q10-i",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q10(i)",
      "ta": "Exercise 1.2 · Q10(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Find n[P(A)] when n(A) = 4"
    },
    "q": {
      "en": "10. (i) If n(A) = 4, find n[P(A)]."
    },
    "steps": [
      {
        "en": "If a finite set A has n(A) elements, then its power set P(A) (the set of all subsets of A) contains n[P(A)] = 2^{n(A)} elements.",
        "eq": "n[P(A)] = 2^{n(A)}",
        "math": {
          "latex": "n[P(A)]=2^{n(A)}",
          "fallback": "n[P(A)] = 2^{n(A)}",
          "display": true
        },
        "reasonMath": {
          "en": [
            "If a finite set A has n(A) elements, then its power set P(A) (the set of all subsets of A) contains ",
            {
              "latex": "n[P(A)]=2^{n(A)}",
              "fallback": "n[P(A)] = 2^{n(A)}"
            },
            " elements."
          ]
        }
      },
      {
        "en": "Substitute the given cardinal number n(A) = 4 into the exponent of 2.",
        "eq": "n[P(A)] = 2⁴",
        "math": {
          "latex": "n[P(A)]=2^4",
          "fallback": "n[P(A)] = 2⁴",
          "display": true
        },
        "reasonMath": {
          "en": "Substitute the given cardinal number n(A) = 4 into the exponent of 2."
        }
      },
      {
        "en": "Multiply four factors of 2 (2 × 2 × 2 × 2) to evaluate 2⁴ = 16.",
        "eq": "2⁴ = 16",
        "math": {
          "latex": "2^4=16",
          "fallback": "2⁴ = 16",
          "display": true
        },
        "reasonMath": {
          "en": "Multiply four factors of 2 (2 × 2 × 2 × 2) to evaluate 2⁴ = 16."
        }
      }
    ],
    "answer": "16",
    "answerMath": {
      "latex": "16",
      "fallback": "16",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q10(i) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "10. (i) If ",
        {
          "latex": "n(A)=4",
          "fallback": "n(A) = 4"
        },
        ", find ",
        {
          "latex": "n[P(A)]",
          "fallback": "n[P(A)]"
        },
        "."
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q10-ii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q10(ii)",
      "ta": "Exercise 1.2 · Q10(ii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Find n[P(A)] when n(A) = 0"
    },
    "q": {
      "en": "10. (ii) If n(A) = 0, find n[P(A)]."
    },
    "steps": [
      {
        "en": "When n(A) = 0, set A is the empty set ∅. Its only subset is ∅ itself, so its power set is P(A) = {∅}.",
        "eq": "A = ∅; P(A) = {∅}",
        "math": {
          "latex": "A=\\varnothing;\\quad P(A)=\\{\\varnothing\\}",
          "fallback": "A = ∅; P(A) = {∅}",
          "display": true
        },
        "reasonMath": {
          "en": "When n(A) = 0, set A is the empty set ∅. Its only subset is ∅ itself, so its power set is P(A) = {∅}."
        }
      },
      {
        "en": "Apply the power-set cardinality formula n[P(A)] = 2^{n(A)} with n(A) = 0.",
        "eq": "n[P(A)] = 2⁰",
        "math": {
          "latex": "n[P(A)]=2^0",
          "fallback": "n[P(A)] = 2⁰",
          "display": true
        },
        "reasonMath": {
          "en": [
            "Apply the power-set cardinality formula ",
            {
              "latex": "n[P(A)]=2^{n(A)}",
              "fallback": "n[P(A)] = 2^{n(A)}"
            },
            " with n(A) = 0."
          ]
        }
      },
      {
        "en": "Any nonzero number raised to the power 0 equals 1, so 2⁰ = 1.",
        "eq": "2⁰ = 1",
        "math": {
          "latex": "2^0=1",
          "fallback": "2⁰ = 1",
          "display": true
        },
        "reasonMath": {
          "en": "Any nonzero number raised to the power 0 equals 1, so 2⁰ = 1."
        }
      }
    ],
    "answer": "1",
    "answerMath": {
      "latex": "1",
      "fallback": "1",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q10(ii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "10. (ii) If ",
        {
          "latex": "n(A)=0",
          "fallback": "n(A) = 0"
        },
        ", find ",
        {
          "latex": "n[P(A)]",
          "fallback": "n[P(A)]"
        },
        "."
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q10-iii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q10(iii)",
      "ta": "Exercise 1.2 · Q10(iii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Find n(A) when n[P(A)] = 256"
    },
    "q": {
      "en": "10. (iii) If n[P(A)] = 256, find n(A)."
    },
    "steps": [
      {
        "en": "Use the power-set cardinality formula n[P(A)] = 2^{n(A)} and set it equal to the given value 256.",
        "eq": "2^{n(A)} = 256",
        "math": {
          "latex": "2^{n(A)}=256",
          "fallback": "2^{n(A)} = 256",
          "display": true
        },
        "reasonMath": {
          "en": [
            "Use the power-set cardinality formula ",
            {
              "latex": "n[P(A)]=2^{n(A)}",
              "fallback": "n[P(A)] = 2^{n(A)}"
            },
            " and set it equal to the given value 256."
          ]
        }
      },
      {
        "en": "Express 256 as a power of 2 by repeated doubling (2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64, 2⁷ = 128, 2⁸ = 256).",
        "eq": "256 = 2⁸",
        "math": {
          "latex": "256=2^8",
          "fallback": "256 = 2⁸",
          "display": true
        },
        "reasonMath": {
          "en": "Express 256 as a power of 2 by repeated doubling (2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64, 2⁷ = 128, 2⁸ = 256)."
        }
      },
      {
        "en": "Because 2^{n(A)} = 2⁸ has the same base 2 on both sides, equate the exponents to get n(A) = 8.",
        "eq": "n(A) = 8",
        "math": {
          "latex": "n(A)=8",
          "fallback": "n(A) = 8",
          "display": true
        },
        "reasonMath": {
          "en": [
            "Because ",
            {
              "latex": "2^{n(A)}=2^8",
              "fallback": "2^{n(A)} = 2⁸"
            },
            " has the same base 2 on both sides, equate the exponents to get n(A) = 8."
          ]
        }
      }
    ],
    "answer": "8",
    "answerMath": {
      "latex": "8",
      "fallback": "8",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q10(iii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "English visual audit archived in Exercise 1.2 source audit",
      "sourceAudit": "docs/curriculum/grade-9/exercise-1-2-source-audit-20261110.md",
      "enPrintedPage": 12,
      "enPdfPage": 18,
      "enPrintedPages": [
        12
      ],
      "enPdfPages": [
        18
      ],
      "taPrintedPage": 14,
      "taPdfPage": 20,
      "taPrintedPages": [
        14
      ],
      "taPdfPages": [
        20
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "10. (iii) If ",
        {
          "latex": "n[P(A)]=256",
          "fallback": "n[P(A)] = 256"
        },
        ", find ",
        {
          "latex": "n(A)",
          "fallback": "n(A)"
        },
        "."
      ]
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>String(c.number)==='1');
if(!grade||!chapter)throw Error('Grade 9 Ex1.2 Q7-Q10 curriculum unavailable');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(x=>x.id===item.id)||chapter.textbookQuestionIds.includes(item.id))throw Error('Duplicate Grade 9 Ex1.2 Q7-Q10: '+item.id);grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G9_EX1_2_Q7_Q10_IDS=Object.freeze(entries.map(x=>x.id));
})();
