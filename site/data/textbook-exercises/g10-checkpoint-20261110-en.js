/* SCERT 2025 Grade 10 checkpoint: 6 newly verified English items; incomplete exercises are not chapter-complete. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];
if(!grade||!Array.isArray(grade.items))throw Error('Grade 10 base content missing');
const entries=[
  {
    "id": "c10-3-ex3-1-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra"
    },
    "label": {
      "en": "Exercise 3.1 · Q1(i)",
      "ta": "Exercise 3.1 · Q1(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Solve three-variable simultaneous equations"
    },
    "q": {
      "en": "1. Solve the following system of linear equations in three variables. (i) x + y + z = 5; 2x − y + z = 9; x − 2y + 3z = 16."
    },
    "steps": [
      {
        "en": "Subtract the first equation from the second.",
        "eq": "(2) − (1): x − 2y = 4"
      },
      {
        "en": "Subtract the first equation from the third.",
        "eq": "(3) − (1): −3y + 2z = 11"
      },
      {
        "en": "Express x using y, then use the first equation.",
        "eq": "x = 4 + 2y; z = 1 − 3y"
      },
      {
        "en": "Substitute for z and solve for y.",
        "eq": "−3y + 2(1 − 3y) = 11 ⇒ −9y = 9 ⇒ y = −1"
      },
      {
        "en": "Find x and z, then verify in all three equations.",
        "eq": "x = 2, z = 4; 2−1+4=5; 4+1+4=9; 2+2+12=16"
      }
    ],
    "answer": "(x, y, z) = (2, −1, 4)",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 92 / PDF p. 98; corresponding Tamil printed p. 94 / PDF p. 100; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  },
  {
    "id": "c10-4-ex4-1-q2",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry"
    },
    "label": {
      "en": "Exercise 4.1 · Q2",
      "ta": "Exercise 4.1 · Q2 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Similar triangles and mirror reflection"
    },
    "q": {
      "en": "2. A girl looks the reflection of the top of a lamp post on the mirror which is 6.6 m away from the foot of the lamp post. The girl whose height is 1.25 m is standing 2.5 m away from the mirror. Assuming the mirror is placed on the ground facing the sky and the girl, mirror and the lamppost are in a same line, find the height of the lamp post."
    },
    "steps": [
      {
        "en": "The girl/mirror and post/mirror triangles are similar by equality of reflection angles.",
        "eq": "H / 6.6 = 1.25 / 2.5"
      },
      {
        "en": "Calculate the required height.",
        "eq": "H = 6.6 × 1.25 / 2.5 = 3.3 m"
      },
      {
        "en": "Check that corresponding height-to-distance ratios match.",
        "eq": "3.3 / 6.6 = 1.25 / 2.5 = 0.5"
      }
    ],
    "answer": "Height of lamp post = 3.3 m",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 170 / PDF p. 176; corresponding Tamil printed p. 175 / PDF p. 181; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  },
  {
    "id": "c10-4-ex4-1-q3",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry"
    },
    "label": {
      "en": "Exercise 4.1 · Q3",
      "ta": "Exercise 4.1 · Q3 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Similar shadow triangles"
    },
    "q": {
      "en": "3. A vertical stick of length 6 m casts a shadow 400 cm long on the ground and at the same time a tower casts a shadow 28 m long. Using similarity, find the height of the tower."
    },
    "steps": [
      {
        "en": "Convert the stick's shadow to metres.",
        "eq": "400 cm = 4 m"
      },
      {
        "en": "At the same time the sunlight creates similar right triangles.",
        "eq": "H / 28 = 6 / 4"
      },
      {
        "en": "Solve the proportion for the tower height.",
        "eq": "H = 28 × 6 / 4 = 42 m"
      },
      {
        "en": "Verify the two height/shadow ratios.",
        "eq": "42 / 28 = 6 / 4 = 1.5"
      }
    ],
    "answer": "Height of tower = 42 m",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 170 / PDF p. 176; corresponding Tamil printed p. 175 / PDF p. 181; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  },
  {
    "id": "c10-8-ex8-1-q1-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q1(i)",
      "ta": "Exercise 8.1 · Q1(i) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Range and coefficient of range"
    },
    "q": {
      "en": "1. Find the range and coefficient of range of the following data. (i) 63, 89, 98, 125, 79, 108, 117, 68."
    },
    "steps": [
      {
        "en": "Identify the largest and smallest observations.",
        "eq": "L = 125, S = 63"
      },
      {
        "en": "Subtract smallest from largest to find the range.",
        "eq": "Range = 125 − 63 = 62"
      },
      {
        "en": "Use the coefficient of range formula.",
        "eq": "(L − S) / (L + S) = 62 / (125 + 63) = 62 / 188 = 31 / 94"
      }
    ],
    "answer": "Range = 62; coefficient of range = 31/94 ≈ 0.329787",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 313 / PDF p. 319; corresponding Tamil printed p. 322 / PDF p. 328; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  },
  {
    "id": "c10-8-ex8-1-q1-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q1(ii)",
      "ta": "Exercise 8.1 · Q1(ii) (English only; Tamil review pending)"
    },
    "title": {
      "en": "Range and coefficient of range"
    },
    "q": {
      "en": "1. Find the range and coefficient of range of the following data. (ii) 43.5, 13.6, 18.9, 38.4, 61.4, 29.8."
    },
    "steps": [
      {
        "en": "Identify the largest and smallest observations.",
        "eq": "L = 61.4, S = 13.6"
      },
      {
        "en": "Find the difference between them.",
        "eq": "Range = 61.4 − 13.6 = 47.8"
      },
      {
        "en": "Calculate the coefficient of range.",
        "eq": "(L − S) / (L + S) = 47.8 / 75 = 239 / 375"
      }
    ],
    "answer": "Range = 47.8; coefficient of range = 239/375 ≈ 0.637333",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 313 / PDF p. 319; corresponding Tamil printed p. 322 / PDF p. 328; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  },
  {
    "id": "c10-8-ex8-1-q2",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q2",
      "ta": "Exercise 8.1 · Q2 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Find the largest observation"
    },
    "q": {
      "en": "2. If the range and the smallest value of a set of data are 36.8 and 13.4 respectively, then find the largest value."
    },
    "steps": [
      {
        "en": "Recall the definition of the range.",
        "eq": "Range = largest − smallest"
      },
      {
        "en": "Rearrange to isolate the largest value.",
        "eq": "Largest = range + smallest"
      },
      {
        "en": "Substitute the numbers and verify.",
        "eq": "Largest = 36.8 + 13.4 = 50.2; check: 50.2 − 13.4 = 36.8"
      }
    ],
    "answer": "Largest value = 50.2",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics 2025 revised, English printed p. 313 / PDF p. 319; corresponding Tamil printed p. 322 / PDF p. 328; mathematical values checked, Tamil wording editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-10"
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>(g.items||[]).map(item=>item.id)));
const seen=new Set();
for(const item of entries){if(ids.has(item.id)||seen.has(item.id))throw Error('Duplicate Grade 10 checkpoint ID '+item.id);seen.add(item.id);}
// Chapter navigation is ID-driven: publishing an item without this registry
// makes the lesson reachable only by its direct URL, not via Exercises.
const chapterRegistry=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters;
if(!Array.isArray(chapterRegistry))throw Error('Grade 10 curriculum must be loaded before checkpoint questions');
const assigned=entries.map(item=>{
  const chapter=chapterRegistry.find(ch=>String(ch.number)===String(item.chapter));
  if(!chapter)throw Error('Missing Grade 10 chapter for checkpoint '+item.id);
  return {item,chapter};
});
for(const {item,chapter} of assigned){
  grade.items.push(item);ids.add(item.id);
  chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
  if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);
}
})();
