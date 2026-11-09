// Grade 9 English 2025 source checked; original solutions; page-image review pending.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch3-ex3.2-q4",
    "classNum": 9,
    "chapter": "3",
    "exercise": "3.2",
    "topic": {
      "en": "Algebra",
      "ta": "Algebra (English version only)"
    },
    "label": {
      "en": "Exercise 3.2 · Q4",
      "ta": "Exercise 3.2 · Q4 (English only)"
    },
    "title": {
      "en": "Roots of four linear equations",
      "ta": "Roots of four linear equations (English only)"
    },
    "q": {
      "en": "Find the roots of the polynomial equations .\n(i) 5x – 6 = 0 (ii) x +3 = 0\n(iii) 10x + 9 = 0 (iv) 9x – 4 = 0",
      "ta": "English-language question; Tamil version not changed. Find the roots of the polynomial equations .\n(i) 5x – 6 = 0 (ii) x +3 = 0\n(iii) 10x + 9 = 0 (iv) 9x – 4 = 0"
    },
    "steps": [
      {
        "en": "For a linear equation ax+b=0 with a≠0, isolate x.",
        "ta": "English explanation (Tamil unchanged): For a linear equation ax+b=0 with a≠0, isolate x.",
        "eq": "x = −b/a"
      },
      {
        "en": "Move the constant term in parts (i) and (ii).",
        "ta": "English explanation (Tamil unchanged): Move the constant term in parts (i) and (ii).",
        "eq": "(i) 5x=6 ⇒ x=[[6|5]]; (ii) x=−3"
      },
      {
        "en": "Move the constant term and divide in parts (iii) and (iv).",
        "ta": "English explanation (Tamil unchanged): Move the constant term and divide in parts (iii) and (iv).",
        "eq": "(iii) 10x=−9 ⇒ x=−[[9|10]]; (iv) 9x=4 ⇒ x=[[4|9]]"
      },
      {
        "en": "Each value makes its original left-hand side equal zero.",
        "ta": "English explanation (Tamil unchanged): Each value makes its original left-hand side equal zero.",
        "eq": "5([[6|5]])−6=0; −3+3=0; 10(−[[9|10]])+9=0; 9([[4|9]])−4=0"
      }
    ],
    "answer": "(i) [[6|5]]; (ii) −3; (iii) −[[9|10]]; (iv) [[4|9]]",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 3.2, Q4 · printed p. 92; mathematical solutions original to Triggle; page-image fidelity review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 98,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPrintedPage": 92,
      "enPdfPage": 98,
      "tamilEditorial": "not-in-scope",
      "notes": [
        "Original SCERT textbook English wording checked against Drive extraction; typography normalized where PDF text encodes math poorly.",
        "No external diagram required for this question; page image has not been visually inspected."
      ]
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch3');
if(!grade||!chapter)throw Error('Grade 9 English chapter registration missing: 3');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate textbook ID: '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
