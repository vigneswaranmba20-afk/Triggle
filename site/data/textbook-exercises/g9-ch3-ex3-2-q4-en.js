// Grade 9 Exercise 3.2 Q4. English source page and answer appendix visually checked.
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
      "en": "Find the roots of the polynomial equations .\n(i) 5x – 6 = 0 (ii) x +3 = 0\n(iii) 10x + 9 = 0 (iv) 9x – 4 = 0"
    },
    "steps": [
      {
        "en": "For a linear equation ax+b=0 with a≠0, isolate x.",
        "eq": "x = −b/a"
      },
      {
        "en": "Move the constant term in parts (i) and (ii).",
        "eq": "(i) 5x=6 ⇒ x=[[6|5]]; (ii) x=−3"
      },
      {
        "en": "Move the constant term and divide in parts (iii) and (iv).",
        "eq": "(iii) 10x=−9 ⇒ x=−[[9|10]]; (iv) 9x=4 ⇒ x=[[4|9]]"
      },
      {
        "en": "Each value makes its original left-hand side equal zero.",
        "eq": "5([[6|5]])−6=0; −3+3=0; 10(−[[9|10]])+9=0; 9([[4|9]])−4=0"
      }
    ],
    "answer": "(i) [[6|5]]; (ii) −3; (iii) −[[9|10]]; (iv) [[4|9]]",
    "kind": "textbook",
    "reference": "Tamil Nadu SCERT 2025 revised Grade 9 Mathematics English · Exercise 3.2, Q4 · printed p. 91 (PDF p. 97) · answer appendix printed p. 310 (PDF p. 316). Tamil editorial and teacher review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 97,
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 91,
      "enPdfPage": 97,
      "answerKeyEnPrintedPage": 310,
      "answerKeyEnPdfPage": 316,
      "sourcePdfSha256": "e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037",
      "comparableTamilPrintedPage": 99,
      "comparableTamilPdfPage": 105,
      "tamilReview": "pending",
      "teacherReview": "pending"
    },
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview"
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch3');
if(!grade||!chapter)throw Error('Grade 9 English chapter registration missing: 3');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate textbook ID: '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
