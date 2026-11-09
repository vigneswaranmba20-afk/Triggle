// Grade 9 English 2025 source checked; original solutions; page-image review pending.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch4-ex4.1-q2",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "Geometry (English version only)"
    },
    "label": {
      "en": "Exercise 4.1 · Q2",
      "ta": "Exercise 4.1 · Q2 (English only)"
    },
    "title": {
      "en": "Triangle-angle ratio",
      "ta": "Triangle-angle ratio (English only)"
    },
    "q": {
      "en": "The angles of a triangle are in the ratio 1: 2 : 3, find the measure of each angle of the triangle.",
      "ta": "English-language question; Tamil version not changed. The angles of a triangle are in the ratio 1: 2 : 3, find the measure of each angle of the triangle."
    },
    "steps": [
      {
        "en": "Represent the three angles by x, 2x and 3x.",
        "ta": "English explanation (Tamil unchanged): Represent the three angles by x, 2x and 3x.",
        "eq": "Angles = x, 2x, 3x"
      },
      {
        "en": "The three interior angles of a triangle add to 180°.",
        "ta": "English explanation (Tamil unchanged): The three interior angles of a triangle add to 180°.",
        "eq": "x+2x+3x=180°"
      },
      {
        "en": "Solve for the common multiplier.",
        "ta": "English explanation (Tamil unchanged): Solve for the common multiplier.",
        "eq": "6x=180° ⇒ x=30°"
      },
      {
        "en": "Write all three angles and check their sum.",
        "ta": "English explanation (Tamil unchanged): Write all three angles and check their sum.",
        "eq": "30°+60°+90°=180°"
      }
    ],
    "answer": "30°, 60°, 90°",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 4.1, Q2 · printed p. 144; mathematical solutions original to Triggle; page-image fidelity review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 150,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPrintedPage": 144,
      "enPdfPage": 150,
      "tamilEditorial": "not-in-scope",
      "notes": [
        "Original SCERT textbook English wording checked against Drive extraction; typography normalized where PDF text encodes math poorly.",
        "No external diagram required for this question; page image has not been visually inspected."
      ]
    }
  },
  {
    "id": "g9-ch4-ex4.1-q4",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "Geometry (English version only)"
    },
    "label": {
      "en": "Exercise 4.1 · Q4",
      "ta": "Exercise 4.1 · Q4 (English only)"
    },
    "title": {
      "en": "Congruence by ASA",
      "ta": "Congruence by ASA (English only)"
    },
    "q": {
      "en": "ΔABC and ΔDEF are two triangles in which AB=DF, ∠ACB=70°, ∠ABC=60°; ∠DEF=70° and ∠EDF=60°. Prove that the triangles are congruent.",
      "ta": "English-language question; Tamil version not changed. ΔABC and ΔDEF are two triangles in which AB=DF, ∠ACB=70°, ∠ABC=60°; ∠DEF=70° and ∠EDF=60°. Prove that the triangles are congruent."
    },
    "steps": [
      {
        "en": "Use the angle-sum property in ΔABC.",
        "ta": "English explanation (Tamil unchanged): Use the angle-sum property in ΔABC.",
        "eq": "∠BAC=180°−70°−60°=50°"
      },
      {
        "en": "Find the remaining angle of ΔDEF.",
        "ta": "English explanation (Tamil unchanged): Find the remaining angle of ΔDEF.",
        "eq": "∠DFE=180°−70°−60°=50°"
      },
      {
        "en": "The corresponding angles and the included sides match.",
        "ta": "English explanation (Tamil unchanged): The corresponding angles and the included sides match.",
        "eq": "∠BAC=∠DFE; AB=FD; ∠ABC=∠FDE"
      },
      {
        "en": "Apply the Angle–Side–Angle congruence rule with matching vertex order.",
        "ta": "English explanation (Tamil unchanged): Apply the Angle–Side–Angle congruence rule with matching vertex order.",
        "eq": "ΔABC ≅ ΔFDE (ASA)"
      }
    ],
    "answer": "ΔABC ≅ ΔFDE (ASA)",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 4.1, Q4 · printed p. 144; mathematical solutions original to Triggle; page-image fidelity review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 150,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPrintedPage": 144,
      "enPdfPage": 150,
      "tamilEditorial": "not-in-scope",
      "notes": [
        "Original SCERT textbook English wording checked against Drive extraction; typography normalized where PDF text encodes math poorly.",
        "No external diagram required for this question; page image has not been visually inspected."
      ]
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch4');
if(!grade||!chapter)throw Error('Grade 9 English chapter registration missing: 4');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate textbook ID: '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
