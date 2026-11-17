/* TRACE 2025 Grade 9 Exercise 1.2 Q5(iii) & Q6(i–iv) English source-backed lessons. */
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch1-ex1.2-q5-iii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q5(iii)",
      "ta": "Exercise 1.2 · Q5(iii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Factors of 24 and multiples of 3: disjoint or overlapping?"
    },
    "q": {
      "en": "5. State which pairs of sets are disjoint or overlapping?\n(iii) E = {x : x is a factor of 24} and F = {x : x is a multiple of 3, x < 30}"
    },
    "steps": [
      {
        "en": "In set-builder notation {x : …}, the curly braces { } enclose a set and the colon : means “such that”. List every positive integer that divides 24 with remainder 0 to write set E.",
        "eq": "E = {1, 2, 3, 4, 6, 8, 12, 24}",
        "math": {
          "latex": "E=\\{1,2,3,4,6,8,12,24\\}",
          "fallback": "E = {1, 2, 3, 4, 6, 8, 12, 24}",
          "display": true
        },
        "reasonMath": {
          "en": "In set-builder notation {x : …}, the curly braces { } enclose a set and the colon : means “such that”. List every positive integer that divides 24 with remainder 0 to write set E."
        }
      },
      {
        "en": "The symbol < means “is strictly less than”, so x < 30 excludes 30. List the positive multiples of 3 smaller than 30 to write set F.",
        "eq": "F = {3, 6, 9, 12, 15, 18, 21, 24, 27}",
        "math": {
          "latex": "F=\\{3,6,9,12,15,18,21,24,27\\}",
          "fallback": "F = {3, 6, 9, 12, 15, 18, 21, 24, 27}",
          "display": true
        },
        "reasonMath": {
          "en": "The symbol < means “is strictly less than”, so x < 30 excludes 30. List the positive multiples of 3 smaller than 30 to write set F."
        }
      },
      {
        "en": "The intersection symbol ∩ denotes elements belonging to both sets. Because E ∩ F contains the shared numbers 3, 6, 12, and 24 (not empty), sets E and F are overlapping.",
        "eq": "E∩F = {3, 6, 12, 24}; overlapping",
        "math": {
          "latex": "\\begin{aligned}E\\cap F&=\\{3,6,12,24\\}\\neq\\varnothing\\\\&\\Rightarrow\\ \\text{overlapping sets}\\end{aligned}",
          "fallback": "E∩F = {3, 6, 12, 24}; overlapping",
          "display": true
        },
        "reasonMath": {
          "en": "The intersection symbol ∩ denotes elements belonging to both sets. Because E ∩ F contains the shared numbers 3, 6, 12, and 24 (not empty), sets E and F are overlapping."
        }
      }
    ],
    "answer": "Overlapping",
    "answerMath": {
      "latex": "\\text{Overlapping sets}",
      "fallback": "Overlapping",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q5(iii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
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
      "taPrintedPage": 13,
      "taPdfPage": 19,
      "taPrintedPages": [
        13
      ],
      "taPdfPages": [
        19
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "5. State which pairs of sets are disjoint or overlapping?\n(iii) ",
        {
          "latex": "\\begin{aligned}E&=\\{x:x\\text{ is a factor of }24\\}\\\\F&=\\{x:x\\text{ is a multiple of }3,\\ x<30\\}\\end{aligned}",
          "fallback": "E = {x : x is a factor of 24} and F = {x : x is a multiple of 3, x < 30}",
          "display": true
        }
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q6-i",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q6(i)",
      "ta": "Exercise 1.2 · Q6(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subset of shapes with 4 equal sides"
    },
    "q": {
      "en": "6. If S = {square, rectangle, circle, rhombus, triangle}, list the elements of the following subset of S.\n(i) The set of shapes which have 4 equal sides."
    },
    "steps": [
      {
        "en": "The curly braces { } enclose the 5 shapes in the parent set S. Check which shapes in S have all 4 sides of equal length: both a square and a rhombus have 4 equal sides.",
        "eq": "square: 4 equal sides; rhombus: 4 equal sides",
        "math": {
          "latex": "\\begin{aligned}\\text{square}&:\\text{ 4 equal sides}\\\\\\text{rhombus}&:\\text{ 4 equal sides}\\end{aligned}",
          "fallback": "square: 4 equal sides; rhombus: 4 equal sides",
          "display": true
        },
        "reasonMath": {
          "en": "The curly braces { } enclose the 5 shapes in the parent set S. Check which shapes in S have all 4 sides of equal length: both a square and a rhombus have 4 equal sides."
        }
      },
      {
        "en": "Check the remaining shapes in S: a general rectangle has only opposite sides equal, a triangle has 3 sides, and a circle has a curved boundary.",
        "eq": "rectangle: opposite sides equal",
        "math": {
          "latex": "\\text{rectangle: opposite sides equal}",
          "fallback": "rectangle: opposite sides equal",
          "display": true
        },
        "reasonMath": {
          "en": "Check the remaining shapes in S: a general rectangle has only opposite sides equal, a triangle has 3 sides, and a circle has a curved boundary."
        }
      },
      {
        "en": "A subset of S is a set formed by selecting only the matching elements from S and writing them inside curly braces { }.",
        "eq": "{square, rhombus}",
        "math": {
          "latex": "\\{\\text{square},\\ \\text{rhombus}\\}",
          "fallback": "{square, rhombus}",
          "display": true
        },
        "reasonMath": {
          "en": "A subset of S is a set formed by selecting only the matching elements from S and writing them inside curly braces { }."
        }
      }
    ],
    "answer": "{square, rhombus}",
    "answerMath": {
      "latex": "\\{\\text{square},\\ \\text{rhombus}\\}",
      "fallback": "{square, rhombus}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q6(i) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
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
      "taPrintedPage": 13,
      "taPdfPage": 19,
      "taPrintedPages": [
        13
      ],
      "taPdfPages": [
        19
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "6. If ",
        {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        ", list the elements of the following subset of S.\n(i) The set of shapes which have 4 equal sides."
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q6-ii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q6(ii)",
      "ta": "Exercise 1.2 · Q6(ii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subset of shapes with a radius"
    },
    "q": {
      "en": "6. If S = {square, rectangle, circle, rhombus, triangle}, list the elements of the following subset of S.\n(ii) The set of shapes which have radius."
    },
    "steps": [
      {
        "en": "The radius r of a circle is the constant distance from its centre to any point on its curved boundary.",
        "eq": "r = distance from centre to circle",
        "math": {
          "latex": "r=\\text{distance from centre to circle}",
          "fallback": "r = distance from centre to circle",
          "display": true
        },
        "reasonMath": {
          "en": "The radius r of a circle is the constant distance from its centre to any point on its curved boundary."
        }
      },
      {
        "en": "Inspect the 5 shapes inside the curly braces { } of S: square, rectangle, rhombus, and triangle are polygons made of straight sides, so only the circle is defined by a radius.",
        "eq": "S = {square, rectangle, circle, rhombus, triangle}",
        "math": {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        "reasonMath": {
          "en": "Inspect the 5 shapes inside the curly braces { } of S: square, rectangle, rhombus, and triangle are polygons made of straight sides, so only the circle is defined by a radius."
        }
      },
      {
        "en": "Write the single matching element from S inside curly braces { } to form the subset.",
        "eq": "{circle}",
        "math": {
          "latex": "\\{\\text{circle}\\}",
          "fallback": "{circle}",
          "display": true
        },
        "reasonMath": {
          "en": "Write the single matching element from S inside curly braces { } to form the subset."
        }
      }
    ],
    "answer": "{circle}",
    "answerMath": {
      "latex": "\\{\\text{circle}\\}",
      "fallback": "{circle}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q6(ii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
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
      "taPrintedPage": 13,
      "taPdfPage": 19,
      "taPrintedPages": [
        13
      ],
      "taPdfPages": [
        19
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "6. If ",
        {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        ", list the elements of the following subset of S.\n(ii) The set of shapes which have radius."
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q6-iii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q6(iii)",
      "ta": "Exercise 1.2 · Q6(iii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subset of shapes with interior angle sum 180°"
    },
    "q": {
      "en": "6. If S = {square, rectangle, circle, rhombus, triangle}, list the elements of the following subset of S.\n(iii) The set of shapes in which the sum of all interior angles is 180°. "
    },
    "steps": [
      {
        "en": "In ∠A + ∠B + ∠C = 180°, the symbol ∠ means “angle” and ° means “degrees”. The 3 interior (inside) angles of any triangle always add up to 180°.",
        "eq": "∠A+∠B+∠C=180°",
        "math": {
          "latex": "\\angle A+\\angle B+\\angle C=180^\\circ",
          "fallback": "∠A+∠B+∠C=180°",
          "display": true
        },
        "reasonMath": {
          "en": "In ∠A + ∠B + ∠C = 180°, the symbol ∠ means “angle” and ° means “degrees”. The 3 interior (inside) angles of any triangle always add up to 180°."
        }
      },
      {
        "en": "The four-sided shapes in S (square, rectangle, and rhombus) each have an interior-angle sum of 360°, while a circle has no polygon vertex angles.",
        "eq": "square, rectangle, rhombus: 360°",
        "math": {
          "latex": "\\text{square, rectangle, rhombus}:\\ 360^\\circ",
          "fallback": "square, rectangle, rhombus: 360°",
          "display": true
        },
        "reasonMath": {
          "en": "The four-sided shapes in S (square, rectangle, and rhombus) each have an interior-angle sum of 360°, while a circle has no polygon vertex angles."
        }
      },
      {
        "en": "Select the triangle from S and enclose it in curly braces { } to write the subset.",
        "eq": "{triangle}",
        "math": {
          "latex": "\\{\\text{triangle}\\}",
          "fallback": "{triangle}",
          "display": true
        },
        "reasonMath": {
          "en": "Select the triangle from S and enclose it in curly braces { } to write the subset."
        }
      }
    ],
    "answer": "{triangle}",
    "answerMath": {
      "latex": "\\{\\text{triangle}\\}",
      "fallback": "{triangle}",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q6(iii) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
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
      "taPrintedPage": 13,
      "taPdfPage": 19,
      "taPrintedPages": [
        13
      ],
      "taPdfPages": [
        19
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "6. If ",
        {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        ", list the elements of the following subset of S.\n(iii) The set of shapes in which the sum of all interior angles is ",
        {
          "latex": "180^\\circ",
          "fallback": "180°"
        },
        ". "
      ]
    }
  },
  {
    "id": "g9-ch1-ex1.2-q6-iv",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.2",
    "topic": {
      "en": "Set Language"
    },
    "label": {
      "en": "Exercise 1.2 · Q6(iv)",
      "ta": "Exercise 1.2 · Q6(iv) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Subset of shapes with 5 sides"
    },
    "q": {
      "en": "6. If S = {square, rectangle, circle, rhombus, triangle}, list the elements of the following subset of S.\n(iv) The set of shapes which have 5 sides."
    },
    "steps": [
      {
        "en": "A closed flat shape with 5 straight sides is a pentagon.",
        "eq": "pentagon: 5 sides",
        "math": {
          "latex": "\\text{pentagon: 5 sides}",
          "fallback": "pentagon: 5 sides",
          "display": true
        },
        "reasonMath": {
          "en": "A closed flat shape with 5 straight sides is a pentagon."
        }
      },
      {
        "en": "Count the sides of each shape in S: square (4), rectangle (4), rhombus (4), triangle (3), and circle (0 straight sides). None has 5 sides.",
        "eq": "S = {square, rectangle, circle, rhombus, triangle}",
        "math": {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        "reasonMath": {
          "en": "Count the sides of each shape in S: square (4), rectangle (4), rhombus (4), triangle (3), and circle (0 straight sides). None has 5 sides."
        }
      },
      {
        "en": "When no element of S satisfies the condition, the subset is the empty (null) set, denoted by the symbol ∅ (or empty braces { }).",
        "eq": "∅",
        "math": {
          "latex": "\\varnothing",
          "fallback": "∅",
          "display": true
        },
        "reasonMath": {
          "en": "When no element of S satisfies the condition, the subset is the empty (null) set, denoted by the symbol ∅ (or empty braces { })."
        }
      }
    ],
    "answer": "∅",
    "answerMath": {
      "latex": "\\varnothing",
      "fallback": "∅",
      "display": true
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.2 Q6(iv) (printed English p. 12, PDF p. 18). English wording reviewed against source; Tamil editorial and teacher reviews deferred.",
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
      "taPrintedPage": 13,
      "taPdfPage": 19,
      "taPrintedPages": [
        13
      ],
      "taPdfPages": [
        19
      ],
      "tamilReview": "deferred",
      "tamilEditorial": "deferred"
    },
    "questionMath": {
      "en": [
        "6. If ",
        {
          "latex": "\\begin{aligned}S=\\{&\\text{square, rectangle, circle,}\\\\&\\text{rhombus, triangle}\\}\\end{aligned}",
          "fallback": "S = {square, rectangle, circle, rhombus, triangle}",
          "display": true
        },
        ", list the elements of the following subset of S.\n(iv) The set of shapes which have 5 sides."
      ]
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9],chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>String(c.number)==='1');
if(!grade||!chapter)throw Error('Grade 9 Ex1.2 Q5(iii)-Q6 curriculum unavailable');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(x=>x.id===item.id)||chapter.textbookQuestionIds.includes(item.id))throw Error('Duplicate Grade 9 Ex1.2 Q5(iii)-Q6: '+item.id);grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G9_EX1_2_Q5III_Q6_IDS=Object.freeze(entries.map(x=>x.id));
})();
