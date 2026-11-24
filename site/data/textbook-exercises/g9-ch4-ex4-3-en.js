// Grade 9 Geometry. Questions checked against the 2025 English and Tamil textbook pages.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch4-ex4.3-q1",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q1",
      "ta": "பயிற்சி 4.3 · வினா 1"
    },
    "title": {
      "en": "Distance from a chord to the centre",
      "ta": "வட்ட மையத்திலிருந்து நாணின் தொலைவு"
    },
    "q": {
      "en": "The diameter of the circle is 52cm and the length of one of its chord is 20cm. Find the distance of the chord from the centre.",
      "ta": "வட்டத்தின் விட்டம் 52 செமீ மற்றும் ஒரு நாணின் நீளம் 20 செமீ எனில், மையத்திலிருந்து நாணிற்கு உள்ள தூரம் காண்க."
    },
    "steps": [
      {
        "en": "The radius is half the diameter, and a perpendicular from the centre bisects the chord.",
        "ta": "ஆரம் விட்டத்தின் பாதி (26 செ.மீ) ஆகும்; வட்ட மையத்திலிருந்து நாணிற்கு வரையப்படும் செங்குத்து நாணை இருசமக்கூறிடும் (அரை நாண் = 10 செ.மீ).",
        "eq": "r=52/2=26 cm; half-chord=20/2=10 cm",
        "mathTa": [
          {
            "latex": "r=\\dfrac{52}{2}=26",
            "fallback": "r = 52/2 = 26"
          },
          " செ.மீ; நாணின் பாதி நீளம் = ",
          {
            "latex": "\\dfrac{20}{2}=10",
            "fallback": "20/2 = 10"
          },
          " செ.மீ"
        ]
      },
      {
        "en": "The radius, half-chord and perpendicular distance form a right triangle.",
        "ta": "ஆரம், அரை நாண் மற்றும் செங்குத்துத் தொலைவு ஆகியவை ஒரு செங்கோண முக்கோணத்தை உருவாக்குகின்றன.",
        "eq": "d²+10²=26²"
      },
      {
        "en": "Apply Pythagoras.",
        "ta": "பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தி d² காண்க.",
        "eq": "d²=676−100=576"
      },
      {
        "en": "Take the nonnegative distance.",
        "ta": "மிகை வர்க்கமூலம் எடுத்துத் தொலைவு 24 செ.மீ எனக் காண்க.",
        "eq": "d=√576=24 cm"
      }
    ],
    "answer": "24 cm",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics · Exercise 4.3, Q1 · English printed p. 169 · Tamil printed p. 180.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 175,
    "sourceFidelity": {
      "status": "page-images-checked-en-ta",
      "enPrintedPage": 169,
      "enPdfPage": 175,
      "tamilEditorial": "textbook-question-checked",
      "notes": [
        "Question checked against the rendered 2025 English and Tamil textbook pages. Printed spacing and mathematical symbols are normalized for the reader."
      ],
      "taPrintedPage": 180,
      "taPdfPage": 186,
      "taSource": "https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view"
    },
    "answerTa": "24 செ.மீ",
    "answerMath": {
      "en": {
        "latex": "24\\,\\mathrm{cm}",
        "fallback": "24 cm"
      },
      "ta": [
        {
          "latex": "24",
          "fallback": "24"
        },
        " செ.மீ"
      ]
    }
  },
  {
    "id": "g9-ch4-ex4.3-q2",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q2",
      "ta": "பயிற்சி 4.3 · வினா 2"
    },
    "title": {
      "en": "Radius from chord and distance",
      "ta": "நாண் மற்றும் தொலைவிலிருந்து வட்டத்தின் ஆரம்"
    },
    "q": {
      "en": "The chord of length 30 cm is drawn at the distance of 8cm from the centre of the circle. Find the radius of the circle",
      "ta": "வட்டத்தின் மையத்திலிருந்து 8 செமீ தொலைவில் 30 செமீ நீளமுள்ள நாண் வரையப்பட்டுள்ளது எனில், வட்டத்தின் ஆரம் காண்க."
    },
    "steps": [
      {
        "en": "A perpendicular from the centre to the chord bisects it.",
        "ta": "வட்ட மையத்திலிருந்து நாணிற்கு வரையப்படும் செங்குத்து நாணை இருசமக்கூறிடும் (அரை நாண் = 15 செ.மீ).",
        "eq": "Half-chord=30/2=15 cm",
        "mathTa": [
          "நாணின் பாதி நீளம் = ",
          {
            "latex": "\\dfrac{30}{2}=15",
            "fallback": "30/2 = 15"
          },
          " செ.மீ"
        ]
      },
      {
        "en": "The radius is the hypotenuse of the triangle with legs 15 cm and 8 cm.",
        "ta": "15 செ.மீ மற்றும் 8 செ.மீ பக்கங்களைக் கொண்ட செங்கோண முக்கோணத்தின் கர்ணமே வட்டத்தின் ஆரம் ஆகும்.",
        "eq": "r²=15²+8²"
      },
      {
        "en": "Calculate and take the positive root.",
        "ta": "பிதாகரஸ் தேற்றத்தால் கணக்கிட்டு மிகை வர்க்கமூலம் எடுக்க ஆரம் 17 செ.மீ கிடைக்கும்.",
        "eq": "r=√(225+64)=√289=17 cm"
      }
    ],
    "answer": "17 cm",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics · Exercise 4.3, Q2 · English printed p. 169 · Tamil printed p. 180.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 175,
    "sourceFidelity": {
      "status": "page-images-checked-en-ta",
      "enPrintedPage": 169,
      "enPdfPage": 175,
      "tamilEditorial": "textbook-question-checked",
      "notes": [
        "Question checked against the rendered 2025 English and Tamil textbook pages. Printed spacing and mathematical symbols are normalized for the reader."
      ],
      "taPrintedPage": 180,
      "taPdfPage": 186,
      "taSource": "https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view"
    },
    "answerTa": "17 செ.மீ",
    "answerMath": {
      "en": {
        "latex": "17\\,\\mathrm{cm}",
        "fallback": "17 cm"
      },
      "ta": [
        {
          "latex": "17",
          "fallback": "17"
        },
        " செ.மீ"
      ]
    }
  },
  {
    "id": "g9-ch4-ex4.3-q4",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q4",
      "ta": "பயிற்சி 4.3 · வினா 4"
    },
    "title": {
      "en": "Chord length from radius and offset",
      "ta": "ஆரம் மற்றும் தொலைவிலிருந்து நாணின் நீளம்"
    },
    "q": {
      "en": "A chord is 12cm away from the centre of the circle of radius 15cm. Find the length of the chord.",
      "ta": "ஆரம் 15 செமீ உள்ள வட்டத்தின் மையத்திலிருந்து 12 செமீ தொலைவில் அமைந்துள்ள நாணின் நீளம் காண்க."
    },
    "steps": [
      {
        "en": "A perpendicular from the centre bisects the chord.",
        "ta": "வட்ட மையத்திலிருந்து வரையப்படும் செங்குத்து நாணை இருசமக்கூறிடும்; அரை நாண் நீளத்தை t என்க.",
        "eq": "Half-chord = t",
        "mathTa": [
          "நாணின் பாதி நீளம் = ",
          {
            "latex": "t",
            "fallback": "t"
          }
        ]
      },
      {
        "en": "Use the radius as hypotenuse in the right triangle.",
        "ta": "செங்கோண முக்கோணத்தில் ஆரம் 15 செ.மீ-ஐக் கர்ணமாகக் கொண்டு பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துக.",
        "eq": "t²+12²=15²"
      },
      {
        "en": "Calculate half of the chord.",
        "ta": "அரை நாண் நீளம் t = 9 செ.மீ எனக் கணக்கிடுக.",
        "eq": "t=√(225−144)=√81=9 cm"
      },
      {
        "en": "Double it to find the full chord.",
        "ta": "முழு நாணின் நீளத்தைக் காண 2-ஆல் பெருக்குக.",
        "eq": "Chord length = 2×9=18 cm",
        "mathTa": [
          "நாணின் நீளம் = ",
          {
            "latex": "2\\times9=18",
            "fallback": "2 × 9 = 18"
          },
          " செ.மீ"
        ]
      }
    ],
    "answer": "18 cm",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics · Exercise 4.3, Q4 · English printed p. 169 · Tamil printed p. 181.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 175,
    "sourceFidelity": {
      "status": "page-images-checked-en-ta",
      "enPrintedPage": 169,
      "enPdfPage": 175,
      "tamilEditorial": "textbook-question-checked",
      "notes": [
        "Question checked against the rendered 2025 English and Tamil textbook pages. Printed spacing and mathematical symbols are normalized for the reader."
      ],
      "taPrintedPage": 181,
      "taPdfPage": 187,
      "taSource": "https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view"
    },
    "answerTa": "18 செ.மீ",
    "answerMath": {
      "en": {
        "latex": "18\\,\\mathrm{cm}",
        "fallback": "18 cm"
      },
      "ta": [
        {
          "latex": "18",
          "fallback": "18"
        },
        " செ.மீ"
      ]
    }
  },
  {
    "id": "g9-ch4-ex4.3-q6",
    "classNum": 9,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q6",
      "ta": "பயிற்சி 4.3 · வினா 6"
    },
    "title": {
      "en": "Common chord of intersecting circles",
      "ta": "வெட்டிக்கொள்ளும் இரு வட்டங்களின் பொது நாண்"
    },
    "q": {
      "en": "Two circles of radii 5 cm and 3 cm intersect at two points and the distance between their centres is 4 cm. Find the length of the common chord.",
      "ta": "5 செமீ மற்றும் 3 செமீ ஆரமுள்ள இரு வட்டங்கள், இரண்டு புள்ளிகளில் வெட்டிக் கொள்கின்றன. மேலும், அவற்றின் மையங்களுக்கு இடைப்பட்ட தொலைவு 4 செமீ எனில், பொது நாணின் நீளத்தைக் காண்க."
    },
    "steps": [
      {
        "en": "Let O₁ and O₂ be the centres; place O₁ at 0 and O₂ at 4 on the line of centres.",
        "ta": "இரு வட்டங்களின் மையங்களை O₁ மற்றும் O₂ என்க; மையக்கோட்டில் O₁-ஐ 0-இலும் O₂-ஐ 4-இலும் அமைப்போம்.",
        "eq": "r₁=5 cm; r₂=3 cm; O₁O₂=4 cm"
      },
      {
        "en": "The common chord is perpendicular to the line of centres. If its midpoint is distance t from O₁, subtract the two Pythagorean equations.",
        "ta": "பொது நாண் மையக்கோட்டிற்குச் செங்குத்தாக இருக்கும்; அதன் நடுப்புள்ளி O₁-லிருந்து t தொலைவில் உள்ளதெனில் இரு பிதாகரஸ் சமன்பாடுகளை அமைக்க.",
        "eq": "t²+h²=25; (t−4)²+h²=9"
      },
      {
        "en": "Subtract to find where the common chord crosses the line of centres.",
        "ta": "இரு சமன்பாடுகளையும் கழித்து பொது நாண் மையக்கோட்டை வெட்டும் தொலைவு t = 4 எனக் காண்க.",
        "eq": "t²−(t−4)²=16 ⇒ 8t−16=16 ⇒ t=4"
      },
      {
        "en": "Find the half-chord and double it.",
        "ta": "அரை நாண் h = 3 செ.மீ எனக் கண்டு அதை இரண்டால் பெருக்கிப் பொது நாணின் நீளம் 6 செ.மீ எனக் காண்க.",
        "eq": "h=√(25−4²)=3 cm; chord=2h=6 cm",
        "mathTa": [
          {
            "latex": "h=\\sqrt{25-4^2}=3",
            "fallback": "h = √(25 − 4²) = 3"
          },
          " செ.மீ; பொது நாணின் நீளம் = ",
          {
            "latex": "2h=6",
            "fallback": "2h = 6"
          },
          " செ.மீ"
        ]
      }
    ],
    "answer": "6 cm",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics · Exercise 4.3, Q6 · English printed p. 170 · Tamil printed p. 181.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 176,
    "sourceFidelity": {
      "status": "page-images-checked-en-ta",
      "enPrintedPage": 170,
      "enPdfPage": 176,
      "tamilEditorial": "textbook-question-checked",
      "notes": [
        "Question checked against the rendered 2025 English and Tamil textbook pages. Printed spacing and mathematical symbols are normalized for the reader."
      ],
      "taPrintedPage": 181,
      "taPdfPage": 187,
      "taSource": "https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view"
    },
    "answerTa": "6 செ.மீ",
    "answerMath": {
      "en": {
        "latex": "6\\,\\mathrm{cm}",
        "fallback": "6 cm"
      },
      "ta": [
        {
          "latex": "6",
          "fallback": "6"
        },
        " செ.மீ"
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
