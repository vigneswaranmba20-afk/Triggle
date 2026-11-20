/* TN SCERT 2025 Grade 10 Geometry, Exercise 4.1. Both textbook prompts
   were checked against the page images. The authored solution is in English. */
(() => {
'use strict';
const preservedIds = new Set(["c10-4-ex4-1-q1-i", "c10-4-ex4-1-q1-ii", "c10-4-ex4-1-q2", "c10-4-ex4-1-q3"]);
const entries = [
  {
    "id": "c10-4-ex4-1-q1-i",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q1(i)",
      "ta": "பயிற்சி 4.1 · வினா 1(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Check the two triangles"
    },
    "q": {
      "en": "1. In the given triangles, check which triangles are similar? Also find the value of x.\n(i)",
      "ta": "1. கீழே கொடுக்கப்பட்டவற்றில் எந்த முக்கோணங்கள் வடிவொத்தவை என்பதைச் சோதிக்கவும் மேலும் x –யின் மதிப்பு காண்க.\n(i)"
    },
    "questionMath": {
      "en": [
        "1. In the given triangles, check which triangles are similar? Also find the value of ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        ".\n(i)"
      ],
      "ta": [
        "1. கீழே கொடுக்கப்பட்டவற்றில் எந்த முக்கோணங்கள் வடிவொத்தவை என்பதைச் சோதிக்கவும் மேலும் ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " –யின் மதிப்பு காண்க.\n(i)"
      ]
    },
    "steps": [
      {
        "en": "This panel has no side labelled x. To check similarity, find the complete sides from A by adding the smaller segments.",
        "eq": "AB = 3 + 5 = 8, AC = 2 + 3½ = 11/2",
        "math": {
          "latex": "\\begin{aligned}AB&=3+5=8\\\\AC&=2+3\\tfrac12=\\tfrac{11}2\\end{aligned}",
          "fallback": "AB = 3 + 5 = 8, AC = 2 + 3½ = 11/2",
          "display": true
        }
      },
      {
        "en": "For similar triangles sharing angle A, the two sides enclosing that angle must be proportional. In the order shown, compare AD with AB and AE with AC.",
        "eq": "AD/AB = 3/8, AE/AC = 4/11",
        "math": {
          "latex": "\\dfrac{AD}{AB}=\\dfrac38,\\quad\\dfrac{AE}{AC}=\\dfrac4{11}",
          "fallback": "AD/AB = 3/8, AE/AC = 4/11",
          "display": true
        }
      },
      {
        "en": "Cross-multiplication gives 33 and 32, so those ratios differ. Pairing AD with AC instead also fails: the ratios are 6/11 and 1/4. Thus neither matching at A gives proportional sides.",
        "eq": "3 × 11 = 33, 4 × 8 = 32, and 6/11 ≠ 1/4",
        "math": {
          "latex": "\\begin{aligned}3\\times11&=33\\\\4\\times8&=32\\\\\\dfrac6{11}&\\ne\\dfrac14\\end{aligned}",
          "fallback": "3 × 11 = 33, 4 × 8 = 32, and 6/11 ≠ 1/4",
          "display": true
        }
      }
    ],
    "answer": "The two triangles are not similar.",
    "answerMath": {
      "latex": "\\triangle ADE\\not\\sim\\triangle ABC",
      "fallback": "The two triangles are not similar.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q1(i). English p. 170 (PDF p. 176); Tamil p. 175 (PDF p. 181).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 181
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q1-i.svg",
    "figureAlt": {
      "en": "E lies on AC and D lies on AB. AE = 2, EC = 3½, AD = 3 and DB = 5. No side is marked x in this panel.",
      "ta": "E புள்ளி AC மீதும் D புள்ளி AB மீதும் உள்ளன. AE = 2, EC = 3½, AD = 3, DB = 5."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q1-ii",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q1(ii)",
      "ta": "பயிற்சி 4.1 · வினா 1(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Use the angles to find x"
    },
    "q": {
      "en": "1. In the given triangles, check which triangles are similar? Also find the value of x.\n(ii)",
      "ta": "1. கீழே கொடுக்கப்பட்டவற்றில் எந்த முக்கோணங்கள் வடிவொத்தவை என்பதைச் சோதிக்கவும் மேலும் x –யின் மதிப்பு காண்க.\n(ii)"
    },
    "questionMath": {
      "en": [
        "1. In the given triangles, check which triangles are similar? Also find the value of ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        ".\n(ii)"
      ],
      "ta": [
        "1. கீழே கொடுக்கப்பட்டவற்றில் எந்த முக்கோணங்கள் வடிவொத்தவை என்பதைச் சோதிக்கவும் மேலும் ",
        {
          "latex": "x",
          "fallback": "x",
          "display": false
        },
        " –யின் மதிப்பு காண்க.\n(ii)"
      ]
    },
    "steps": [
      {
        "en": "The rays QB and QC point in opposite directions along a straight line. The two angles next to QP therefore add to 180°.",
        "eq": "∠PQC = 180° − 110° = 70°",
        "math": {
          "latex": "\\angle PQC=180^\\circ-110^\\circ=70^\\circ",
          "fallback": "∠PQC = 180° − 110° = 70°",
          "display": true
        }
      },
      {
        "en": "The angle at Q matches the angle at B. The small and large triangles also share the angle at C because CP lies on CA and CQ lies on CB.",
        "eq": "∠PQC = ∠ABC = 70°, ∠PCQ = ∠ACB",
        "math": {
          "latex": "\\begin{aligned}\\angle PQC&=\\angle ABC=70^\\circ\\\\\\angle PCQ&=\\angle ACB\\end{aligned}",
          "fallback": "∠PQC = ∠ABC = 70°, ∠PCQ = ∠ACB",
          "display": true
        }
      },
      {
        "en": "By the AA similarity criterion, two matching angles make the triangles similar. P corresponds to A, Q to B, and C to itself.",
        "eq": "△PQC ∼ △ABC",
        "math": {
          "latex": "\\triangle PQC\\sim\\triangle ABC",
          "fallback": "△PQC ∼ △ABC",
          "display": true
        }
      },
      {
        "en": "The full base BC is 3 + 3 = 6. Corresponding sides have equal ratios. Since PQ is x and matches AB, it is half of 5.",
        "eq": "PQ/AB = QC/BC = 3/6 = 1/2, x = 5/2 = 2.5",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{PQ}{AB}&=\\dfrac{QC}{BC}=\\dfrac36=\\dfrac12\\\\x&=\\dfrac52=2.5\\end{aligned}",
          "fallback": "PQ/AB = QC/BC = 3/6 = 1/2, x = 5/2 = 2.5",
          "display": true
        }
      },
      {
        "en": "Check that the small base is half the large base and the corresponding sloping side is also half as long.",
        "eq": "3/6 = 2.5/5 = 1/2",
        "math": {
          "latex": "\\dfrac36=\\dfrac{2.5}{5}=\\dfrac12",
          "fallback": "3/6 = 2.5/5 = 1/2",
          "display": true
        }
      }
    ],
    "answer": "The triangles are similar; x = 2.5.",
    "answerMath": {
      "latex": "\\triangle PQC\\sim\\triangle ABC,\\quad x=2.5",
      "fallback": "The triangles are similar; x = 2.5.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q1(ii). English p. 170 (PDF p. 176); Tamil p. 175 (PDF p. 181).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 181
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q1-ii.svg",
    "figureAlt": {
      "en": "Q lies on BC and P lies on AC. AB = 5, BQ = QC = 3, ∠ABC = 70°, ∠BQP = 110° and PQ = x.",
      "ta": "Q புள்ளி BC மீதும் P புள்ளி AC மீதும் உள்ளன. AB = 5, BQ = QC = 3, ∠ABC = 70°, ∠BQP = 110°, PQ = x."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q2",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q2",
      "ta": "பயிற்சி 4.1 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find the lamp post height"
    },
    "q": {
      "en": "2. A girl looks the reflection of the top of the lamp post on the mirror which is 6.6 m away from the foot of the lamppost. The girl whose height is 1.25 m is standing 2.5 m away from the mirror. Assuming the mirror is placed on the ground facing the sky and the girl, mirror and the lamppost are in a same line, find the height of the lamp post.",
      "ta": "2. ஒரு பெண் விளக்கு கம்பத்தின் அடியிலிருந்து 6.6 மீ தொலைவிலுள்ள கண்ணாடியில் விளக்கு கம்ப உச்சியின் பிரதிபலிப்பைக் காண்கிறாள். 1.25 மீ உயரமுள்ள அப்பெண் கண்ணாடியிலிருந்து 2.5 மீ தொலைவில் நிற்கிறாள். கண்ணாடியானது வானத்தை நோக்கி வைக்கப்பட்டுள்ளது. அப்பெண், கண்ணாடி மற்றும் விளக்கு கம்பம் ஆகியவை எல்லாம் ஒரே நேர்க்கோட்டில் அமைவதாக எடுத்துக் கொண்டால், விளக்குக் கம்பத்தின் உயரத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. A girl looks the reflection of the top of the lamp post on the mirror which is 6.6 m away from the foot of the lamppost. The girl whose height is 1.25 m is standing 2.5 m away from the mirror. Assuming the mirror is placed on the ground facing the sky and the girl, mirror and the lamppost are in a same line, find the height of the lamp post."
      ],
      "ta": [
        "2. ஒரு பெண் விளக்கு கம்பத்தின் அடியிலிருந்து 6.6 மீ தொலைவிலுள்ள கண்ணாடியில் விளக்கு கம்ப உச்சியின் பிரதிபலிப்பைக் காண்கிறாள். 1.25 மீ உயரமுள்ள அப்பெண் கண்ணாடியிலிருந்து 2.5 மீ தொலைவில் நிற்கிறாள். கண்ணாடியானது வானத்தை நோக்கி வைக்கப்பட்டுள்ளது. அப்பெண், கண்ணாடி மற்றும் விளக்கு கம்பம் ஆகியவை எல்லாம் ஒரே நேர்க்கோட்டில் அமைவதாக எடுத்துக் கொண்டால், விளக்குக் கம்பத்தின் உயரத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "The girl/mirror and post/mirror triangles each have a right angle because the girl and the post are upright. Let H be the post height in metres. Use 1.25 m as the girl’s eye height in the textbook model.",
        "eq": "Eye height = 1.25 m, height to find = H",
        "math": {
          "latex": "\\begin{aligned}\\text{Eye height}&=1.25\\,\\text{m}\\\\\\text{Height to find}&=H\\end{aligned}",
          "fallback": "Eye height = 1.25 m, height to find = H",
          "display": true
        }
      },
      {
        "en": "A flat mirror reflects light at the same angle at which it arrives, measured from the perpendicular to the mirror. Subtracting each of those equal angles from 90° gives equal angles with the ground. The two right triangles are therefore similar by AA.",
        "eq": "H/6.6 = 1.25/2.5",
        "math": {
          "latex": "\\dfrac{H}{6.6}=\\dfrac{1.25}{2.5}",
          "fallback": "H/6.6 = 1.25/2.5",
          "display": true
        }
      },
      {
        "en": "The girl’s height is half her distance from the mirror. Multiply both sides of the proportion by 6.6 to find the corresponding post height.",
        "eq": "H = 6.6 × (1.25/2.5) = 6.6 × 0.5 = 3.3",
        "math": {
          "latex": "\\begin{aligned}H&=6.6\\times\\dfrac{1.25}{2.5}\\\\&=6.6\\times0.5=3.3\\end{aligned}",
          "fallback": "H = 6.6 × (1.25/2.5) = 6.6 × 0.5 = 3.3",
          "display": true
        }
      },
      {
        "en": "Check the height-to-distance ratios on both sides of the mirror. Each height is half its corresponding ground distance.",
        "eq": "3.3/6.6 = 1.25/2.5 = 0.5",
        "math": {
          "latex": "\\dfrac{3.3}{6.6}=\\dfrac{1.25}{2.5}=0.5",
          "fallback": "3.3/6.6 = 1.25/2.5 = 0.5",
          "display": true
        }
      }
    ],
    "answer": "Height of lamp post = 3.3 m",
    "answerMath": {
      "latex": "H=3.3\\,\\text{m}",
      "fallback": "Height of lamp post = 3.3 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q2. English p. 170 (PDF p. 176); Tamil p. 175 (PDF p. 181).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 181
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q2.svg",
    "figureAlt": {
      "en": "The horizontal mirror is between the post and the girl. The two sight lines meet at the mirror. Ground distances are 6.6 m and 2.5 m."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q3",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q3",
      "ta": "பயிற்சி 4.1 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find the tower height"
    },
    "q": {
      "en": "3. A vertical stick of length 6 m casts a shadow 400 cm long on the ground and at the same time a tower casts a shadow 28 m long. Using similarity, find the height of the tower.",
      "ta": "3. 6 மீ உயரமுள்ள செங்குத்தாக நிற்கும் கம்பமானது தரையில் 400 செ.மீ நீளமுள்ள நிழலை ஏற்படுத்துகிறது. ஒரு கோபுரமானது 28 மீ நீளமுள்ள நிழலை ஏற்படுத்துகிறது. கம்பம் மற்றும் கோபுரம் ஒரே நேர்கோட்டில் அமைவதாகக் கருதி வடிவொத்த தன்மையைப் பயன்படுத்தி, கோபுரத்தின் உயரம் காண்க."
    },
    "questionMath": {
      "en": [
        "3. A vertical stick of length 6 m casts a shadow 400 cm long on the ground and at the same time a tower casts a shadow 28 m long. Using similarity, find the height of the tower."
      ],
      "ta": [
        "3. 6 மீ உயரமுள்ள செங்குத்தாக நிற்கும் கம்பமானது தரையில் 400 செ.மீ நீளமுள்ள நிழலை ஏற்படுத்துகிறது. ஒரு கோபுரமானது 28 மீ நீளமுள்ள நிழலை ஏற்படுத்துகிறது. கம்பம் மற்றும் கோபுரம் ஒரே நேர்கோட்டில் அமைவதாகக் கருதி வடிவொத்த தன்மையைப் பயன்படுத்தி, கோபுரத்தின் உயரம் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Convert the stick’s shadow to metres. One metre is 100 centimetres.",
        "eq": "400 cm = 400/100 m = 4 m",
        "math": {
          "latex": "400\\,\\text{cm}=\\dfrac{400}{100}\\,\\text{m}=4\\,\\text{m}",
          "fallback": "400 cm = 400/100 m = 4 m",
          "display": true
        }
      },
      {
        "en": "At the same time, the sunlight makes the same angle with the ground at both shadow tips. Each vertical object also makes a right angle with the level ground. The triangles are similar by AA, so the ratio of heights equals the ratio of shadows. Let H be the height of the tower in metres.",
        "eq": "H/6 = 28/4",
        "math": {
          "latex": "\\dfrac{H}{6}=\\dfrac{28}{4}",
          "fallback": "H/6 = 28/4",
          "display": true
        }
      },
      {
        "en": "The tower’s shadow is seven times as long as the stick’s shadow. Multiply the stick’s height by seven.",
        "eq": "H = 6 × (28/4) = 6 × 7 = 42",
        "math": {
          "latex": "H=6\\times\\dfrac{28}{4}=6\\times7=42",
          "fallback": "H = 6 × (28/4) = 6 × 7 = 42",
          "display": true
        }
      },
      {
        "en": "Check that both objects have the same ratio of height to shadow length.",
        "eq": "42/28 = 6/4 = 1.5",
        "math": {
          "latex": "\\dfrac{42}{28}=\\dfrac64=1.5",
          "fallback": "42/28 = 6/4 = 1.5",
          "display": true
        }
      }
    ],
    "answer": "Height of tower = 42 m",
    "answerMath": {
      "latex": "H=42\\,\\text{m}",
      "fallback": "Height of tower = 42 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q3. English p. 170 (PDF p. 176); Tamil p. 175 (PDF p. 181).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 181
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q3.svg",
    "figureAlt": {
      "en": "A 6 m stick and a tower form right triangles with their 4 m and 28 m shadows. The light rays have the same direction."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q4",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q4",
      "ta": "பயிற்சி 4.1 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove the product of segments"
    },
    "q": {
      "en": "4. Two triangles QPR and QSR, right angled at P and S respectively are drawn on the same base QR and on the same side of QR. If PR and SQ intersect at T, prove that PT × TR = ST × TQ.",
      "ta": "4. QR ஐ அடிப்பக்கமாகக் கொண்ட இரு முக்கோணங்கள் QPR மற்றும் QSR –யின் புள்ளிகள் P மற்றும் S –யில் செங்கோணங்களாக அமைந்துள்ளன. இரு முக்கோணங்களும் QR-யின் ஒரே பக்கத்தில் அமைந்துள்ளன. PR மற்றும் SQ என்ற பக்கங்கள் T என்ற புள்ளியில் சந்திக்கின்றன எனில், PT × TR = ST × TQ என நிறுவுக."
    },
    "questionMath": {
      "en": [
        "4. Two triangles ",
        {
          "latex": "QPR",
          "fallback": "QPR",
          "display": false
        },
        " and ",
        {
          "latex": "QSR",
          "fallback": "QSR",
          "display": false
        },
        ", right angled at ",
        {
          "latex": "P",
          "fallback": "P",
          "display": false
        },
        " and ",
        {
          "latex": "S",
          "fallback": "S",
          "display": false
        },
        " respectively are drawn on the same base ",
        {
          "latex": "QR",
          "fallback": "QR",
          "display": false
        },
        " and on the same side of ",
        {
          "latex": "QR",
          "fallback": "QR",
          "display": false
        },
        ". If ",
        {
          "latex": "PR",
          "fallback": "PR",
          "display": false
        },
        " and ",
        {
          "latex": "SQ",
          "fallback": "SQ",
          "display": false
        },
        " intersect at ",
        {
          "latex": "T",
          "fallback": "T",
          "display": false
        },
        ", prove that ",
        {
          "latex": "PT\\times TR=ST\\times TQ",
          "fallback": "PT × TR = ST × TQ",
          "display": false
        },
        "."
      ],
      "ta": [
        "4. QR ஐ அடிப்பக்கமாகக் கொண்ட இரு முக்கோணங்கள் QPR மற்றும் QSR –யின் புள்ளிகள் P மற்றும் S –யில் செங்கோணங்களாக அமைந்துள்ளன. இரு முக்கோணங்களும் QR-யின் ஒரே பக்கத்தில் அமைந்துள்ளன. PR மற்றும் SQ என்ற பக்கங்கள் T என்ற புள்ளியில் சந்திக்கின்றன எனில், ",
        {
          "latex": "PT\\times TR=ST\\times TQ",
          "fallback": "PT × TR = ST × TQ",
          "display": false
        },
        " என நிறுவுக."
      ]
    },
    "steps": [
      {
        "en": "Focus on the two small triangles QPT and RST. Since T lies on PR and SQ, the given right angles appear at P and S in these smaller triangles.",
        "eq": "∠QPT = ∠RST = 90°",
        "math": {
          "latex": "\\angle QPT=\\angle RST=90^\\circ",
          "fallback": "∠QPT = ∠RST = 90°",
          "display": true
        }
      },
      {
        "en": "The angles QTP and RTS are opposite at the crossing of two straight lines, so they are equal. Two equal pairs give AA similarity, with P matching S and Q matching R.",
        "eq": "△QPT ∼ △RST",
        "math": {
          "latex": "\\triangle QPT\\sim\\triangle RST",
          "fallback": "△QPT ∼ △RST",
          "display": true
        }
      },
      {
        "en": "Compare the matching sides. Multiply both sides by ST × TR to clear the denominators.",
        "eq": "PT/ST = TQ/TR, so PT × TR = ST × TQ",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{PT}{ST}&=\\dfrac{TQ}{TR}\\\\PT\\times TR&=ST\\times TQ\\end{aligned}",
          "fallback": "PT/ST = TQ/TR, so PT × TR = ST × TQ",
          "display": true
        }
      }
    ],
    "answer": "PT × TR = ST × TQ",
    "answerMath": {
      "latex": "PT\\times TR=ST\\times TQ",
      "fallback": "PT × TR = ST × TQ",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q4. English p. 170 (PDF p. 176); Tamil p. 175 (PDF p. 181).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 181
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q4.svg",
    "figureAlt": {
      "en": "Q and R are endpoints of the common base. P and S are above it. PR and SQ cross at T. The right angles are QPR and QSR."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q5",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q5",
      "ta": "பயிற்சி 4.1 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Use a right triangle inside another"
    },
    "q": {
      "en": "5. In the adjacent figure, △ABC is right angled at C and DE ⟂ AB. Prove that △ABC ∼ △ADE and hence find the lengths of AE and DE.",
      "ta": "5. கொடுக்கப்பட்ட படத்தில், C -ஐ செங்கோணமாகக் கொண்ட △ABC -யில் DE ⟂ AB எனில் △ABC ∼ △ADE என நிரூபிக்க. மேலும் AE மற்றும் DE ஆகியவற்றின் நீளங்களைக் காண்க."
    },
    "questionMath": {
      "en": [
        "5. In the adjacent figure, ",
        {
          "latex": "\\triangle ABC",
          "fallback": "△ABC",
          "display": false
        },
        " is right angled at ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " and ",
        {
          "latex": "DE\\perp AB",
          "fallback": "DE ⟂ AB",
          "display": false
        },
        ". Prove that ",
        {
          "latex": "\\triangle ABC\\sim\\triangle ADE",
          "fallback": "△ABC ∼ △ADE",
          "display": false
        },
        " and hence find the lengths of ",
        {
          "latex": "AE",
          "fallback": "AE",
          "display": false
        },
        " and ",
        {
          "latex": "DE",
          "fallback": "DE",
          "display": false
        },
        "."
      ],
      "ta": [
        "5. கொடுக்கப்பட்ட படத்தில், C -ஐ செங்கோணமாகக் கொண்ட ",
        {
          "latex": "\\triangle ABC",
          "fallback": "△ABC",
          "display": false
        },
        " -யில் ",
        {
          "latex": "DE\\perp AB",
          "fallback": "DE ⟂ AB",
          "display": false
        },
        " எனில் ",
        {
          "latex": "\\triangle ABC\\sim\\triangle ADE",
          "fallback": "△ABC ∼ △ADE",
          "display": false
        },
        " என நிரூபிக்க. மேலும் AE மற்றும் DE ஆகியவற்றின் நீளங்களைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Add AD and DC to get AC. In the right triangle ABC, the hypotenuse AB is the side opposite the right angle. Its square is the sum of the squares of the two legs by the Pythagorean theorem. Take the positive square root because AB is a length.",
        "eq": "AC = 3 + 2 = 5, AB = √(5² + 12²) = 13",
        "math": {
          "latex": "\\begin{aligned}AC&=3+2=5\\\\AB&=\\sqrt{5^2+12^2}=13\\end{aligned}",
          "fallback": "AC = 3 + 2 = 5, AB = √(5² + 12²) = 13",
          "display": true
        }
      },
      {
        "en": "Right angles C and E correspond. The angle at A is shared because AE lies on AB and AD lies on AC. By AA similarity, A, B, C correspond to A, D, E in that order.",
        "eq": "△ABC ∼ △ADE",
        "math": {
          "latex": "\\triangle ABC\\sim\\triangle ADE",
          "fallback": "△ABC ∼ △ADE",
          "display": true
        }
      },
      {
        "en": "The smaller hypotenuse AD is 3/13 of AB. The same multiplier takes AC to AE and BC to DE.",
        "eq": "AE = 5 × 3/13 = 15/13, DE = 12 × 3/13 = 36/13",
        "math": {
          "latex": "\\begin{aligned}AE&=5\\times\\dfrac3{13}=\\dfrac{15}{13}\\\\DE&=12\\times\\dfrac3{13}=\\dfrac{36}{13}\\end{aligned}",
          "fallback": "AE = 5 × 3/13 = 15/13, DE = 12 × 3/13 = 36/13",
          "display": true
        }
      }
    ],
    "answer": "AE = 15/13 and DE = 36/13 in the figure’s units.",
    "answerMath": {
      "latex": "AE=\\dfrac{15}{13},\\quad DE=\\dfrac{36}{13}",
      "fallback": "AE = 15/13 and DE = 36/13 in the figure’s units.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q5. English p. 170 (PDF p. 176); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q5.svg",
    "figureAlt": {
      "en": "D is between A and C. AD = 3, DC = 2 and BC = 12. E lies on AB with DE perpendicular to AB.",
      "ta": "AD = 3, DC = 2, BC = 12. E புள்ளி AB மீது உள்ளது. DE என்பது AB-க்குச் செங்குத்து."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q6",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q6",
      "ta": "பயிற்சி 4.1 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Pair the matching sides"
    },
    "q": {
      "en": "6. In the adjacent figure, △ACB ∼ △APQ. If BC = 8 cm, PQ = 4 cm, BA = 6.5 cm and AP = 2.8 cm, find CA and AQ.",
      "ta": "6. கொடுக்கப்பட்ட படத்தில், △ACB ∼ △APQ. BC = 8 செ.மீ, PQ = 4 செ.மீ, BA = 6.5 செ.மீ மற்றும் AP = 2.8 செ.மீ எனில், CA மற்றும் AQ –யின் மதிப்பைக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. In the adjacent figure, ",
        {
          "latex": "\\triangle ACB\\sim\\triangle APQ",
          "fallback": "△ACB ∼ △APQ",
          "display": false
        },
        ". If ",
        {
          "latex": "BC=8\\,\\text{cm}",
          "fallback": "BC = 8 cm",
          "display": false
        },
        ", ",
        {
          "latex": "PQ=4\\,\\text{cm}",
          "fallback": "PQ = 4 cm",
          "display": false
        },
        ", ",
        {
          "latex": "BA=6.5\\,\\text{cm}",
          "fallback": "BA = 6.5 cm",
          "display": false
        },
        " and ",
        {
          "latex": "AP=2.8\\,\\text{cm}",
          "fallback": "AP = 2.8 cm",
          "display": false
        },
        ", find ",
        {
          "latex": "CA",
          "fallback": "CA",
          "display": false
        },
        " and ",
        {
          "latex": "AQ",
          "fallback": "AQ",
          "display": false
        },
        "."
      ],
      "ta": [
        "6. கொடுக்கப்பட்ட படத்தில், ",
        {
          "latex": "\\triangle ACB\\sim\\triangle APQ",
          "fallback": "△ACB ∼ △APQ",
          "display": false
        },
        ". ",
        {
          "latex": "BC=8",
          "fallback": "BC = 8",
          "display": false
        },
        " செ.மீ, ",
        {
          "latex": "PQ=4",
          "fallback": "PQ = 4",
          "display": false
        },
        " செ.மீ, ",
        {
          "latex": "BA=6.5",
          "fallback": "BA = 6.5",
          "display": false
        },
        " செ.மீ மற்றும் ",
        {
          "latex": "AP=2.8",
          "fallback": "AP = 2.8",
          "display": false
        },
        " செ.மீ எனில், CA மற்றும் AQ –யின் மதிப்பைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Read the similarity statement in order. A matches A, C matches P, and B matches Q. So BC matches PQ. The ratio from ACB to APQ is the length in APQ divided by the matching length in ACB.",
        "eq": "PQ/BC = 4/8 = 1/2",
        "math": {
          "latex": "\\dfrac{PQ}{BC}=\\dfrac48=\\dfrac12",
          "fallback": "PQ/BC = 4/8 = 1/2",
          "display": true
        }
      },
      {
        "en": "CA matches PA. Because PA is half of CA, double PA to get CA.",
        "eq": "CA = 2 × 2.8 = 5.6 cm",
        "math": {
          "latex": "CA=2\\times 2.8=5.6\\,\\text{cm}",
          "fallback": "CA = 2 × 2.8 = 5.6 cm",
          "display": true
        }
      },
      {
        "en": "AQ matches AB. Take half of AB to get AQ.",
        "eq": "AQ = 6.5/2 = 3.25 cm",
        "math": {
          "latex": "AQ=\\dfrac{6.5}{2}=3.25\\,\\text{cm}",
          "fallback": "AQ = 6.5/2 = 3.25 cm",
          "display": true
        }
      }
    ],
    "answer": "CA = 5.6 cm, AQ = 3.25 cm",
    "answerMath": {
      "latex": "CA=5.6\\,\\text{cm},\\quad AQ=3.25\\,\\text{cm}",
      "fallback": "CA = 5.6 cm, AQ = 3.25 cm",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q6. English p. 170 (PDF p. 176); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 176,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q6.svg",
    "figureAlt": {
      "en": "The triangles meet at A. B, A, Q lie on one line and C, A, P on another.",
      "ta": "B, A, Q ஒரே நேர்க்கோட்டில் உள்ளன. C, A, P மற்றொரு நேர்க்கோட்டில் உள்ளன."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q7-i",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q7(i)",
      "ta": "பயிற்சி 4.1 · வினா 7(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Compare the top and left triangles"
    },
    "q": {
      "en": "7. If figure OPRQ is a square and ∠MLN = 90°. Prove that\n(i) △LOP ∼ △QMO",
      "ta": "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ∠MLN = 90° எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(i) △LOP ∼ △QMO"
    },
    "questionMath": {
      "en": [
        "7. If figure ",
        {
          "latex": "OPRQ",
          "fallback": "OPRQ",
          "display": false
        },
        " is a square and ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        ". Prove that\n(i) ",
        {
          "latex": "\\triangle LOP\\sim\\triangle QMO",
          "fallback": "△LOP ∼ △QMO",
          "display": false
        }
      ],
      "ta": [
        "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        " எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(i) ",
        {
          "latex": "\\triangle LOP\\sim\\triangle QMO",
          "fallback": "△LOP ∼ △QMO",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "L is the right-angle vertex of MLN. Q is a right-angle vertex of the square. The line MQ extends the square’s bottom edge, so MQ is perpendicular to QO.",
        "eq": "∠OLP = ∠MQO = 90°",
        "math": {
          "latex": "\\angle OLP=\\angle MQO=90^\\circ",
          "fallback": "∠OLP = ∠MQO = 90°",
          "display": true
        }
      },
      {
        "en": "OP and MQ are parallel because OP and QR are opposite sides of the square. The rays OL and MO point along the same sloping line. The angles at O and M are corresponding angles made by that line across the parallels.",
        "eq": "∠LOP = ∠QMO",
        "math": {
          "latex": "\\angle LOP=\\angle QMO",
          "fallback": "∠LOP = ∠QMO",
          "display": true
        }
      },
      {
        "en": "Two pairs of matching angles give AA similarity. In order, L matches Q, O matches M, and P matches O."
      }
    ],
    "answer": "△LOP ∼ △QMO",
    "answerMath": {
      "latex": "\\triangle LOP\\sim\\triangle QMO",
      "fallback": "△LOP ∼ △QMO",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q7(i). English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q7.svg",
    "figureAlt": {
      "en": "The square OPRQ sits inside triangle MLN. O lies on LM, P on LN, and M, Q, R, N are collinear.",
      "ta": "MLN முக்கோணத்திற்குள் OPRQ சதுரம் உள்ளது. O புள்ளி LM மீதும் P புள்ளி LN மீதும் உள்ளன. M, Q, R, N ஒரே நேர்க்கோட்டில் உள்ளன."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q7-ii",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q7(ii)",
      "ta": "பயிற்சி 4.1 · வினா 7(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Compare the top and right triangles"
    },
    "q": {
      "en": "7. If figure OPRQ is a square and ∠MLN = 90°. Prove that\n(ii) △LOP ∼ △RPN",
      "ta": "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ∠MLN = 90° எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(ii) △LOP ∼ △RPN"
    },
    "questionMath": {
      "en": [
        "7. If figure ",
        {
          "latex": "OPRQ",
          "fallback": "OPRQ",
          "display": false
        },
        " is a square and ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        ". Prove that\n(ii) ",
        {
          "latex": "\\triangle LOP\\sim\\triangle RPN",
          "fallback": "△LOP ∼ △RPN",
          "display": false
        }
      ],
      "ta": [
        "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        " எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(ii) ",
        {
          "latex": "\\triangle LOP\\sim\\triangle RPN",
          "fallback": "△LOP ∼ △RPN",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "L is the right-angle vertex of MLN. At R, PR is perpendicular to the square’s bottom edge and hence to its extension RN.",
        "eq": "∠OLP = ∠PRN = 90°",
        "math": {
          "latex": "\\angle OLP=\\angle PRN=90^\\circ",
          "fallback": "∠OLP = ∠PRN = 90°",
          "display": true
        }
      },
      {
        "en": "OP and RN are parallel because OP and QR are opposite sides of the square. The line LPN crosses them, so the corresponding angles at P and N agree.",
        "eq": "∠LPO = ∠RNP",
        "math": {
          "latex": "\\angle LPO=\\angle RNP",
          "fallback": "∠LPO = ∠RNP",
          "display": true
        }
      },
      {
        "en": "Two pairs of matching angles give AA similarity. L matches R, P matches N, and O matches P."
      }
    ],
    "answer": "△LOP ∼ △RPN",
    "answerMath": {
      "latex": "\\triangle LOP\\sim\\triangle RPN",
      "fallback": "△LOP ∼ △RPN",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q7(ii). English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q7.svg",
    "figureAlt": {
      "en": "The square OPRQ sits inside triangle MLN. O lies on LM, P on LN, and M, Q, R, N are collinear.",
      "ta": "MLN முக்கோணத்திற்குள் OPRQ சதுரம் உள்ளது. O புள்ளி LM மீதும் P புள்ளி LN மீதும் உள்ளன. M, Q, R, N ஒரே நேர்க்கோட்டில் உள்ளன."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q7-iii",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q7(iii)",
      "ta": "பயிற்சி 4.1 · வினா 7(iii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Compare the left and right triangles"
    },
    "q": {
      "en": "7. If figure OPRQ is a square and ∠MLN = 90°. Prove that\n(iii) △QMO ∼ △RPN",
      "ta": "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ∠MLN = 90° எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(iii) △QMO ∼ △RPN"
    },
    "questionMath": {
      "en": [
        "7. If figure ",
        {
          "latex": "OPRQ",
          "fallback": "OPRQ",
          "display": false
        },
        " is a square and ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        ". Prove that\n(iii) ",
        {
          "latex": "\\triangle QMO\\sim\\triangle RPN",
          "fallback": "△QMO ∼ △RPN",
          "display": false
        }
      ],
      "ta": [
        "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        " எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(iii) ",
        {
          "latex": "\\triangle QMO\\sim\\triangle RPN",
          "fallback": "△QMO ∼ △RPN",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The top triangle is similar to the left triangle by part (i). The order says that L, O, P match Q, M, O.",
        "eq": "△LOP ∼ △QMO",
        "math": {
          "latex": "\\triangle LOP\\sim\\triangle QMO",
          "fallback": "△LOP ∼ △QMO",
          "display": true
        }
      },
      {
        "en": "The top triangle is also similar to the right triangle by part (ii). This time L, O, P match R, P, N.",
        "eq": "△LOP ∼ △RPN",
        "math": {
          "latex": "\\triangle LOP\\sim\\triangle RPN",
          "fallback": "△LOP ∼ △RPN",
          "display": true
        }
      },
      {
        "en": "Angles matching the same angle in the top triangle are equal to one another. Pair Q with R, M with P, and O with N. That gives AA similarity for the left and right triangles."
      }
    ],
    "answer": "△QMO ∼ △RPN",
    "answerMath": {
      "latex": "\\triangle QMO\\sim\\triangle RPN",
      "fallback": "△QMO ∼ △RPN",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q7(iii). English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q7.svg",
    "figureAlt": {
      "en": "The square OPRQ sits inside triangle MLN. O lies on LM, P on LN, and M, Q, R, N are collinear.",
      "ta": "MLN முக்கோணத்திற்குள் OPRQ சதுரம் உள்ளது. O புள்ளி LM மீதும் P புள்ளி LN மீதும் உள்ளன. M, Q, R, N ஒரே நேர்க்கோட்டில் உள்ளன."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q7-iv",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q7(iv)",
      "ta": "பயிற்சி 4.1 · வினா 7(iv) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Relate the square to the base segments"
    },
    "q": {
      "en": "7. If figure OPRQ is a square and ∠MLN = 90°. Prove that\n(iv) QR² = MQ × RN",
      "ta": "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ∠MLN = 90° எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(iv) QR² = MQ × RN"
    },
    "questionMath": {
      "en": [
        "7. If figure ",
        {
          "latex": "OPRQ",
          "fallback": "OPRQ",
          "display": false
        },
        " is a square and ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        ". Prove that\n(iv) ",
        {
          "latex": "QR^2=MQ\\times RN",
          "fallback": "QR² = MQ × RN",
          "display": false
        }
      ],
      "ta": [
        "7. கொடுக்கப்பட்ட படத்தில் OPRQ ஆனது சதுரம் மற்றும் ",
        {
          "latex": "\\angle MLN=90^\\circ",
          "fallback": "∠MLN = 90°",
          "display": false
        },
        " எனில், கீழ்க்காண்பனவற்றை நிரூபிக்கவும்.\n(iv) ",
        {
          "latex": "QR^2=MQ\\times RN",
          "fallback": "QR² = MQ × RN",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Use the similarity from part (iii). The matching vertices are Q with R, M with P and O with N. Therefore MQ matches PR, and QO matches RN.",
        "eq": "MQ/PR = QO/RN",
        "math": {
          "latex": "\\dfrac{MQ}{PR}=\\dfrac{QO}{RN}",
          "fallback": "MQ/PR = QO/RN",
          "display": true
        }
      },
      {
        "en": "Multiply both sides by PR × RN. This gives the product of the two outside base segments on the left and the product of two sides of the square on the right.",
        "eq": "MQ × RN = PR × QO",
        "math": {
          "latex": "MQ\\times RN=PR\\times QO",
          "fallback": "MQ × RN = PR × QO",
          "display": true
        }
      },
      {
        "en": "The square has four equal sides. Replace PR and QO by QR.",
        "eq": "PR × QO = QR × QR = QR²",
        "math": {
          "latex": "PR\\times QO=QR\\times QR=QR^2",
          "fallback": "PR × QO = QR × QR = QR²",
          "display": true
        }
      }
    ],
    "answer": "QR² = MQ × RN",
    "answerMath": {
      "latex": "QR^2=MQ\\times RN",
      "fallback": "QR² = MQ × RN",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q7(iv). English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q7.svg",
    "figureAlt": {
      "en": "The square OPRQ sits inside triangle MLN. The base segments on either side of the square are MQ and RN.",
      "ta": "MLN முக்கோணத்திற்குள் OPRQ சதுரம் உள்ளது. O புள்ளி LM மீதும் P புள்ளி LN மீதும் உள்ளன. M, Q, R, N ஒரே நேர்க்கோட்டில் உள்ளன."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q8",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q8",
      "ta": "பயிற்சி 4.1 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Convert an area ratio to a side ratio"
    },
    "q": {
      "en": "8. If △ABC ∼ △DEF such that area of △ABC is 9cm² and the area of △DEF is 16cm² and BC = 2.1 cm. Find the length of EF.",
      "ta": "8. △ABC ∼ △DEF -ல், △ABC -யின் பரப்பு 9 செ.மீ², △DEF -யின் பரப்பு 16 செ.மீ² மற்றும் BC = 2.1 செ.மீ எனில், EF -யின் நீளம் காண்க."
    },
    "questionMath": {
      "en": [
        "8. If ",
        {
          "latex": "\\triangle ABC\\sim\\triangle DEF",
          "fallback": "△ABC ∼ △DEF",
          "display": false
        },
        " such that area of ",
        {
          "latex": "\\triangle ABC",
          "fallback": "△ABC",
          "display": false
        },
        " is ",
        {
          "latex": "9\\,\\text{cm}^2",
          "fallback": "9cm²",
          "display": false
        },
        " and the area of ",
        {
          "latex": "\\triangle DEF",
          "fallback": "△DEF",
          "display": false
        },
        " is ",
        {
          "latex": "16\\,\\text{cm}^2",
          "fallback": "16cm²",
          "display": false
        },
        " and ",
        {
          "latex": "BC=2.1\\,\\text{cm}",
          "fallback": "BC = 2.1 cm",
          "display": false
        },
        ". Find the length of ",
        {
          "latex": "EF",
          "fallback": "EF",
          "display": false
        },
        "."
      ],
      "ta": [
        "8. ",
        {
          "latex": "\\triangle ABC\\sim\\triangle DEF",
          "fallback": "△ABC ∼ △DEF",
          "display": false
        },
        " -ல், △ABC -யின் பரப்பு ",
        {
          "latex": "9\\,\\text{செ.மீ}^2",
          "fallback": "9 செ.மீ²",
          "display": false
        },
        ", △DEF -யின் பரப்பு ",
        {
          "latex": "16\\,\\text{செ.மீ}^2",
          "fallback": "16 செ.மீ²",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "BC=2.1",
          "fallback": "BC = 2.1",
          "display": false
        },
        " செ.மீ எனில், EF -யின் நீளம் காண்க."
      ]
    },
    "steps": [
      {
        "en": "In the given similarity order, B matches E and C matches F. Let k be the scale factor from ABC to DEF, so k = EF/BC."
      },
      {
        "en": "Each triangle’s area is half its base times its perpendicular height. Similarity multiplies both the base and that height by k, so the area is multiplied by k². Use the positive root because lengths are positive.",
        "eq": "k² = 16/9, k = √(16/9) = 4/3",
        "math": {
          "latex": "k^2=\\dfrac{16}{9},\\quad k=\\dfrac43",
          "fallback": "k² = 16/9, k = √(16/9) = 4/3",
          "display": true
        }
      },
      {
        "en": "Multiply the side BC by the scale factor.",
        "eq": "EF = (4/3) × 2.1 = 4 × 0.7 = 2.8 cm",
        "math": {
          "latex": "EF=\\dfrac43\\times2.1=4\\times0.7=2.8\\,\\text{cm}",
          "fallback": "EF = (4/3) × 2.1 = 4 × 0.7 = 2.8 cm",
          "display": true
        }
      }
    ],
    "answer": "EF = 2.8 cm",
    "answerMath": {
      "latex": "EF=2.8\\,\\text{cm}",
      "fallback": "EF = 2.8 cm",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q8. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    }
  },
  {
    "id": "c10-4-ex4-1-q9",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q9",
      "ta": "பயிற்சி 4.1 · வினா 9 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find where the crossing sits above the ground"
    },
    "q": {
      "en": "9. Two vertical poles of heights 6 m and 3 m are erected above a horizontal ground AC. Find the value of y.",
      "ta": "9. 6 மீ மற்றும் 3 மீ உயரமுள்ள இரண்டு செங்குத்தான தூண்கள் AC என்ற தரையின் மேல் படத்தில் காட்டியுள்ளவாறு ஊன்றப்பட்டுள்ளது எனில், y -யின் மதிப்பு காண்க."
    },
    "questionMath": {
      "en": [
        "9. Two vertical poles of heights ",
        {
          "latex": "6\\,\\text{m}",
          "fallback": "6 m",
          "display": false
        },
        " and ",
        {
          "latex": "3\\,\\text{m}",
          "fallback": "3 m",
          "display": false
        },
        " are erected above a horizontal ground ",
        {
          "latex": "AC",
          "fallback": "AC",
          "display": false
        },
        ". Find the value of ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        "."
      ],
      "ta": [
        "9. 6 மீ மற்றும் 3 மீ உயரமுள்ள இரண்டு செங்குத்தான தூண்கள் AC என்ற தரையின் மேல் படத்தில் காட்டியுள்ளவாறு ஊன்றப்பட்டுள்ளது எனில், ",
        {
          "latex": "y",
          "fallback": "y",
          "display": false
        },
        " -யின் மதிப்பு காண்க."
      ]
    },
    "steps": [
      {
        "en": "The triangles CBQ and CAP are right triangles with the same angle at C, so they are similar by AA. The small and large vertical sides are BQ and AP. The matching horizontal sides are CB and CA.",
        "eq": "CB/CA = y/6",
        "math": {
          "latex": "\\dfrac{CB}{CA}=\\dfrac y6",
          "fallback": "CB/CA = y/6",
          "display": true
        }
      },
      {
        "en": "The triangles ABQ and ACR are right triangles with the same angle at A. Their vertical sides are BQ and CR and their horizontal sides are AB and AC.",
        "eq": "AB/AC = y/3",
        "math": {
          "latex": "\\dfrac{AB}{AC}=\\dfrac y3",
          "fallback": "AB/AC = y/3",
          "display": true
        }
      },
      {
        "en": "The two ground segments add to AC. Here CA and AC denote the same length. Add the equations and solve for y.",
        "eq": "y/6 + y/3 = (CB + AB)/AC = 1, 3y/6 = 1, y = 2",
        "math": {
          "latex": "\\begin{aligned}\\dfrac y6+\\dfrac y3&=\\dfrac{CB+AB}{AC}=1\\\\\\dfrac{3y}{6}&=1\\\\y&=2\\end{aligned}",
          "fallback": "y/6 + y/3 = (CB + AB)/AC = 1, 3y/6 = 1, y = 2",
          "display": true
        }
      }
    ],
    "answer": "y = 2 m",
    "answerMath": {
      "latex": "y=2\\,\\text{m}",
      "fallback": "y = 2 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q9. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q9.svg",
    "figureAlt": {
      "en": "AP = 6 m and CR = 3 m are vertical poles. PC and AR cross at Q. B is directly below Q on AC and QB = y.",
      "ta": "AP = 6 மீ, CR = 3 மீ. PC, AR ஆகியவை Q-இல் சந்திக்கின்றன. AC மீது B உள்ளது. QB = y."
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q10",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q10",
      "ta": "பயிற்சி 4.1 · வினா 10 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Reduce a triangle by 2/3"
    },
    "q": {
      "en": "10. Construct a triangle similar to a given triangle PQR with its sides equal to 2/3 of the corresponding sides of the triangle PQR (scale factor 2/3 < 1).",
      "ta": "10. கொடுக்கப்பட்ட முக்கோணம் PQR –யின் ஒத்த பக்கங்களின் விகிதம் 2/3 என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி 2/3 < 1)"
    },
    "questionMath": {
      "en": [
        "10. Construct a triangle similar to a given triangle ",
        {
          "latex": "PQR",
          "fallback": "PQR",
          "display": false
        },
        " with its sides equal to ",
        {
          "latex": "\\dfrac{2}{3}",
          "fallback": "2/3",
          "display": false
        },
        " of the corresponding sides of the triangle ",
        {
          "latex": "PQR",
          "fallback": "PQR",
          "display": false
        },
        " (scale factor ",
        {
          "latex": "\\dfrac{2}{3}<1",
          "fallback": "2/3 < 1",
          "display": false
        },
        ")."
      ],
      "ta": [
        "10. கொடுக்கப்பட்ட முக்கோணம் PQR –யின் ஒத்த பக்கங்களின் விகிதம் ",
        {
          "latex": "\\dfrac23",
          "fallback": "2/3",
          "display": false
        },
        " என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி ",
        {
          "latex": "\\dfrac23<1",
          "fallback": "2/3 < 1",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Start with the given triangle PQR. From Q, draw an auxiliary ray on the opposite side of QR from P. A ray starts at one point and extends in one direction. Use a compass with a fixed opening to mark 3 equal intervals from Q, naming the marks X₁ through X₃."
      },
      {
        "en": "Join X3 to R. Through X2, draw a parallel to that line, copying its angle to the auxiliary ray. Mark where the parallel meets the ray from Q through R as R′."
      },
      {
        "en": "Through R′, draw a parallel to RP. Mark where it meets the ray from Q through P as P′. Join the three vertices of the new triangle."
      },
      {
        "en": "The parallel connectors give AA similarity for triangles QX2R′ and QX3R. The ratio of their corresponding sides from Q is the ratio of the counts of equal intervals.",
        "eq": "QR′/QR = QX2/QX3 = 2/3",
        "math": {
          "latex": "\\dfrac{QR'}{QR}=\\dfrac{QX_2}{QX_3}=\\dfrac{2}{3}",
          "fallback": "QR′/QR = QX2/QX3 = 2/3",
          "display": true
        }
      },
      {
        "en": "The final parallel through R′ gives equal corresponding angles, and the angle at Q is shared. By AA the new triangle is similar to the given triangle, with the same multiplier on all three sides."
      }
    ],
    "answer": "△P′QR′ is similar to △PQR with scale factor 2/3.",
    "answerMath": {
      "latex": "\\triangle P'QR'\\sim\\triangle PQR,\\quad k=\\dfrac{2}{3}",
      "fallback": "△P′QR′ is similar to △PQR with scale factor 2/3.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q10. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q10.svg",
    "figureAlt": {
      "en": "The original and new triangles share Q. On the auxiliary ray, point X3 lines up with R and X2 lines up with R′ by parallel connectors. The opposite triangle sides are parallel."
    },
    "figureCaption": {
      "en": "Construction figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q11",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q11",
      "ta": "பயிற்சி 4.1 · வினா 11 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Reduce a triangle by 4/5"
    },
    "q": {
      "en": "11. Construct a triangle similar to a given triangle LMN with its sides equal to 4/5 of the corresponding sides of the triangle LMN (scale factor 4/5 < 1).",
      "ta": "11. கொடுக்கப்பட்ட முக்கோணம் LMN-ன் ஒத்த பக்கங்களின் விகிதம் 4/5 என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி 4/5 < 1)"
    },
    "questionMath": {
      "en": [
        "11. Construct a triangle similar to a given triangle ",
        {
          "latex": "LMN",
          "fallback": "LMN",
          "display": false
        },
        " with its sides equal to ",
        {
          "latex": "\\dfrac{4}{5}",
          "fallback": "4/5",
          "display": false
        },
        " of the corresponding sides of the triangle ",
        {
          "latex": "LMN",
          "fallback": "LMN",
          "display": false
        },
        " (scale factor ",
        {
          "latex": "\\dfrac{4}{5}<1",
          "fallback": "4/5 < 1",
          "display": false
        },
        ")."
      ],
      "ta": [
        "11. கொடுக்கப்பட்ட முக்கோணம் LMN-ன் ஒத்த பக்கங்களின் விகிதம் ",
        {
          "latex": "\\dfrac45",
          "fallback": "4/5",
          "display": false
        },
        " என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி ",
        {
          "latex": "\\dfrac45<1",
          "fallback": "4/5 < 1",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Start with the given triangle LMN. From M, draw an auxiliary ray on the opposite side of MN from L. A ray starts at one point and extends in one direction. Use a compass with a fixed opening to mark 5 equal intervals from M, naming the marks X₁ through X₅."
      },
      {
        "en": "Join X5 to N. Through X4, draw a parallel to that line, copying its angle to the auxiliary ray. Mark where the parallel meets the ray from M through N as N′."
      },
      {
        "en": "Through N′, draw a parallel to NL. Mark where it meets the ray from M through L as L′. Join the three vertices of the new triangle."
      },
      {
        "en": "The parallel connectors give AA similarity for triangles MX4N′ and MX5N. The ratio of their corresponding sides from M is the ratio of the counts of equal intervals.",
        "eq": "MN′/MN = MX4/MX5 = 4/5",
        "math": {
          "latex": "\\dfrac{MN'}{MN}=\\dfrac{MX_4}{MX_5}=\\dfrac{4}{5}",
          "fallback": "MN′/MN = MX4/MX5 = 4/5",
          "display": true
        }
      },
      {
        "en": "The final parallel through N′ gives equal corresponding angles, and the angle at M is shared. By AA the new triangle is similar to the given triangle, with the same multiplier on all three sides."
      }
    ],
    "answer": "△L′MN′ is similar to △LMN with scale factor 4/5.",
    "answerMath": {
      "latex": "\\triangle L'MN'\\sim\\triangle LMN,\\quad k=\\dfrac{4}{5}",
      "fallback": "△L′MN′ is similar to △LMN with scale factor 4/5.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q11. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q11.svg",
    "figureAlt": {
      "en": "The original and new triangles share M. On the auxiliary ray, point X5 lines up with N and X4 lines up with N′ by parallel connectors. The opposite triangle sides are parallel."
    },
    "figureCaption": {
      "en": "Construction figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q12",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q12",
      "ta": "பயிற்சி 4.1 · வினா 12 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Enlarge a triangle by 6/5"
    },
    "q": {
      "en": "12. Construct a triangle similar to a given triangle ABC with its sides equal to 6/5 of the corresponding sides of the triangle ABC (scale factor 6/5 > 1).",
      "ta": "12. கொடுக்கப்பட்ட முக்கோணம் ABC -யின் ஒத்த பக்கங்களின் விகிதம் 6/5 என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி 6/5 > 1)"
    },
    "questionMath": {
      "en": [
        "12. Construct a triangle similar to a given triangle ",
        {
          "latex": "ABC",
          "fallback": "ABC",
          "display": false
        },
        " with its sides equal to ",
        {
          "latex": "\\dfrac{6}{5}",
          "fallback": "6/5",
          "display": false
        },
        " of the corresponding sides of the triangle ",
        {
          "latex": "ABC",
          "fallback": "ABC",
          "display": false
        },
        " (scale factor ",
        {
          "latex": "\\dfrac{6}{5}>1",
          "fallback": "6/5 > 1",
          "display": false
        },
        ")."
      ],
      "ta": [
        "12. கொடுக்கப்பட்ட முக்கோணம் ABC -யின் ஒத்த பக்கங்களின் விகிதம் ",
        {
          "latex": "\\dfrac65",
          "fallback": "6/5",
          "display": false
        },
        " என அமையுமாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி ",
        {
          "latex": "\\dfrac65>1",
          "fallback": "6/5 > 1",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Start with the given triangle ABC. From B, draw an auxiliary ray on the opposite side of BC from A. A ray starts at one point and extends in one direction. Use a compass with a fixed opening to mark 6 equal intervals from B, naming the marks X₁ through X₆."
      },
      {
        "en": "Join X5 to C. Through X6, draw a parallel to that line, copying its angle to the auxiliary ray. Mark where the parallel meets the ray from B through C as C′."
      },
      {
        "en": "Through C′, draw a parallel to CA. Mark where it meets the ray from B through A as A′. Join the three vertices of the new triangle."
      },
      {
        "en": "The parallel connectors give AA similarity for triangles BX6C′ and BX5C. The ratio of their corresponding sides from B is the ratio of the counts of equal intervals.",
        "eq": "BC′/BC = BX6/BX5 = 6/5",
        "math": {
          "latex": "\\dfrac{BC'}{BC}=\\dfrac{BX_6}{BX_5}=\\dfrac{6}{5}",
          "fallback": "BC′/BC = BX6/BX5 = 6/5",
          "display": true
        }
      },
      {
        "en": "The final parallel through C′ gives equal corresponding angles, and the angle at B is shared. By AA the new triangle is similar to the given triangle, with the same multiplier on all three sides."
      }
    ],
    "answer": "△A′BC′ is similar to △ABC with scale factor 6/5.",
    "answerMath": {
      "latex": "\\triangle A'BC'\\sim\\triangle ABC,\\quad k=\\dfrac{6}{5}",
      "fallback": "△A′BC′ is similar to △ABC with scale factor 6/5.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q12. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q12.svg",
    "figureAlt": {
      "en": "The original and new triangles share B. On the auxiliary ray, point X5 lines up with C and X6 lines up with C′ by parallel connectors. The opposite triangle sides are parallel."
    },
    "figureCaption": {
      "en": "Construction figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-1-q13",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.1",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.1 · Q13",
      "ta": "பயிற்சி 4.1 · வினா 13 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Enlarge a triangle by 7/3"
    },
    "q": {
      "en": "13. Construct a triangle similar to a given triangle PQR with its sides equal to 7/3 of the corresponding sides of the triangle PQR (scale factor 7/3 > 1).",
      "ta": "13. கொடுக்கப்பட்ட முக்கோணம் PQR-ன் ஒத்த பக்கங்களின் விகிதம் 7/3 என்றவாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி 7/3 > 1)"
    },
    "questionMath": {
      "en": [
        "13. Construct a triangle similar to a given triangle ",
        {
          "latex": "PQR",
          "fallback": "PQR",
          "display": false
        },
        " with its sides equal to ",
        {
          "latex": "\\dfrac{7}{3}",
          "fallback": "7/3",
          "display": false
        },
        " of the corresponding sides of the triangle ",
        {
          "latex": "PQR",
          "fallback": "PQR",
          "display": false
        },
        " (scale factor ",
        {
          "latex": "\\dfrac{7}{3}>1",
          "fallback": "7/3 > 1",
          "display": false
        },
        ")."
      ],
      "ta": [
        "13. கொடுக்கப்பட்ட முக்கோணம் PQR-ன் ஒத்த பக்கங்களின் விகிதம் ",
        {
          "latex": "\\dfrac73",
          "fallback": "7/3",
          "display": false
        },
        " என்றவாறு ஒரு வடிவொத்த முக்கோணம் வரைக. (அளவு காரணி ",
        {
          "latex": "\\dfrac73>1",
          "fallback": "7/3 > 1",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Start with the given triangle PQR. From Q, draw an auxiliary ray on the opposite side of QR from P. A ray starts at one point and extends in one direction. Use a compass with a fixed opening to mark 7 equal intervals from Q, naming the marks X₁ through X₇."
      },
      {
        "en": "Join X3 to R. Through X7, draw a parallel to that line, copying its angle to the auxiliary ray. Mark where the parallel meets the ray from Q through R as R′."
      },
      {
        "en": "Through R′, draw a parallel to RP. Mark where it meets the ray from Q through P as P′. Join the three vertices of the new triangle."
      },
      {
        "en": "The parallel connectors give AA similarity for triangles QX7R′ and QX3R. The ratio of their corresponding sides from Q is the ratio of the counts of equal intervals.",
        "eq": "QR′/QR = QX7/QX3 = 7/3",
        "math": {
          "latex": "\\dfrac{QR'}{QR}=\\dfrac{QX_7}{QX_3}=\\dfrac{7}{3}",
          "fallback": "QR′/QR = QX7/QX3 = 7/3",
          "display": true
        }
      },
      {
        "en": "The final parallel through R′ gives equal corresponding angles, and the angle at Q is shared. By AA the new triangle is similar to the given triangle, with the same multiplier on all three sides."
      }
    ],
    "answer": "△P′QR′ is similar to △PQR with scale factor 7/3.",
    "answerMath": {
      "latex": "\\triangle P'QR'\\sim\\triangle PQR,\\quad k=\\dfrac{7}{3}",
      "fallback": "△P′QR′ is similar to △PQR with scale factor 7/3.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.1 Q13. English p. 171 (PDF p. 177); Tamil p. 176 (PDF p. 182).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 177,
        "ta": 182
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-1-q13.svg",
    "figureAlt": {
      "en": "The original and new triangles share Q. On the auxiliary ray, point X3 lines up with R and X7 lines up with R′ by parallel connectors. The opposite triangle sides are parallel."
    },
    "figureCaption": {
      "en": "Construction figure",
      "ta": "வடிவியல் படம்"
    }
  }
];

const grade = window.TRIGGLE_CLASSES[10];
const chapter = window.TRIGGLE_CURRICULUM.grades.find(({grade}) => grade === 10)
  .chapters.find(({number}) => number === 4);
for (const entry of entries) {
  const index = grade.items.findIndex(({id}) => id === entry.id);
  if (index === -1) grade.items.push(entry);
  else if (preservedIds.has(entry.id)) grade.items[index] = {...grade.items[index], ...entry};
  else throw new Error('Duplicate Grade 10 Geometry question: ' + entry.id);
  if (!chapter.textbookQuestionIds.includes(entry.id)) chapter.textbookQuestionIds.push(entry.id);
}
})();
