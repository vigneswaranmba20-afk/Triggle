/* 2025 revised TN SCERT Grade 10 Geometry, Exercise 4.3.
 * English and Tamil prompts and numeric keys checked against the two source
 * PDFs. Solutions are English-first; human Tamil editorial review is pending.
 * Geometric figures are accessible vector redrawings, not textbook scans.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-4-ex4-3-q1",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q1",
      "ta": "பயிற்சி 4.3 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Walking east, then north"
    },
    "q": {
      "en": "1. A man goes 18 m due east and then 24 m due north. Find the distance of his current position from the starting point?",
      "ta": "1. ஒரு மனிதன் 18 மீ கிழக்கே சென்று பின்னர் 24 மீ வடக்கே செல்கிறான். தொடக்க நிலையிலிருந்து அவர் இருக்கும் தொலைவைக் காண்க."
    },
    "questionMath": {
      "en": [
        "1. A man goes 18 m due east and then 24 m due north. Find the distance of his current position from the starting point?"
      ],
      "ta": [
        "1. ஒரு மனிதன் 18 மீ கிழக்கே சென்று பின்னர் 24 மீ வடக்கே செல்கிறான். தொடக்க நிலையிலிருந்து அவர் இருக்கும் தொலைவைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Draw an imaginary right triangle: one side is the 18 m eastward walk and the other is the 24 m northward walk. East and north are perpendicular."
      },
      {
        "en": "By the Pythagoras theorem, the square of the direct distance equals the sum of the squares of the perpendicular journeys.",
        "eq": "d² = 18² + 24² = 324 + 576 = 900",
        "math": {
          "latex": "d^2=18^2+24^2=324+576=900",
          "fallback": "d² = 18² + 24² = 324 + 576 = 900",
          "display": true
        }
      },
      {
        "en": "Distance cannot be negative, so take the positive square root of 900.",
        "eq": "d = √900 = 30 m",
        "math": {
          "latex": "d=\\sqrt{900}=30\\,\\text{m}",
          "fallback": "d = √900 = 30 m",
          "display": true
        }
      },
      {
        "en": "Check: 18² + 24² equals 30², so the calculated diagonal is correct."
      }
    ],
    "answer": "30 m",
    "answerMath": {
      "latex": "30\\,\\text{m}",
      "fallback": "30 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q1. English p. 187 (PDF p. 193); Tamil p. 193 (PDF p. 199).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 193,
        "ta": 199
      }
    }
  },
  {
    "id": "c10-4-ex4-3-q2",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q2",
      "ta": "பயிற்சி 4.3 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Compare the two street routes"
    },
    "q": {
      "en": "2. There are two paths that one can choose to go from Sarah’s house to James house. One way is to take C street, and the other way requires to take B street and then A street. How much shorter is the direct path along C street? (Using figure).",
      "ta": "2. சாராவின் வீட்டிலிருந்து ஜேம்ஸின் வீட்டிற்குச் செல்ல இரண்டு வழிகள் உள்ளன. ஒரு வழி ‘C’ என்ற தெரு வழியாகச் செல்வதாகும். மற்றொரு வழி B மற்றும் A ஆகிய தெருக்கள் வழியாகச் செல்வதாகும். நேரடி பாதை C வழி செல்லும்போது தொலைவு எவ்வளவு குறையும்? (படத்தைப் பயன்படுத்துக)."
    },
    "questionMath": {
      "en": [
        "2. There are two paths that one can choose to go from Sarah’s house to James house. One way is to take C street, and the other way requires to take B street and then A street. How much shorter is the direct path along C street? (Using figure)."
      ],
      "ta": [
        "2. சாராவின் வீட்டிலிருந்து ஜேம்ஸின் வீட்டிற்குச் செல்ல இரண்டு வழிகள் உள்ளன. ஒரு வழி ‘C’ என்ற தெரு வழியாகச் செல்வதாகும். மற்றொரு வழி B மற்றும் A ஆகிய தெருக்கள் வழியாகச் செல்வதாகும். நேரடி பாதை C வழி செல்லும்போது தொலைவு எவ்வளவு குறையும்? (படத்தைப் பயன்படுத்துக)."
      ]
    },
    "steps": [
      {
        "en": "The two streets A and B meet at a right angle. Their lengths are 2 miles and 1.5 miles, so travelling along both streets is their sum.",
        "eq": "A + B = 2 + 1.5 = 3.5 miles",
        "math": {
          "latex": "2+1.5=3.5\\,\\text{miles}",
          "fallback": "A + B = 2 + 1.5 = 3.5 miles",
          "display": true
        }
      },
      {
        "en": "C Street is the straight diagonal. Use the Pythagoras theorem, because the other two streets form a right angle.",
        "eq": "C² = 2² + 1.5² = 4 + 2.25 = 6.25",
        "math": {
          "latex": "C^2=2^2+1.5^2=6.25",
          "fallback": "C² = 2² + 1.5² = 4 + 2.25 = 6.25",
          "display": true
        }
      },
      {
        "en": "Take the positive square root to find the direct road length.",
        "eq": "C = √6.25 = 2.5 miles",
        "math": {
          "latex": "C=\\sqrt{6.25}=2.5\\,\\text{miles}",
          "fallback": "C = √6.25 = 2.5 miles",
          "display": true
        }
      },
      {
        "en": "Subtract the direct-route distance from the two-street distance to find the distance saved.",
        "eq": "3.5 − 2.5 = 1 mile",
        "math": {
          "latex": "3.5-2.5=1\\,\\text{mile}",
          "fallback": "3.5 − 2.5 = 1 mile",
          "display": true
        }
      }
    ],
    "answer": "1 mile shorter",
    "answerMath": {
      "latex": "1\\,\\text{mile}",
      "fallback": "1 mile shorter",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q2. English p. 187 (PDF p. 193); Tamil p. 193 (PDF p. 199).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 193,
        "ta": 199
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-3-q2.svg",
    "figureAlt": {
      "en": "The two roads A and B form the legs of a right triangle, measuring 2 miles and 1.5 miles. C Street connects Sarah’s and James’s houses directly, forming the diagonal.",
      "ta": "பாடநூல் படத்தின் கருத்தைப் பின்பற்றிய வடிவியல் வரைபடம்"
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-3-q3",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q3",
      "ta": "பயிற்சி 4.3 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Shortcut across the pond"
    },
    "q": {
      "en": "3. To get from point A to point B you must avoid walking through a pond. You must walk 34 m south and 41 m east. To the nearest meter, how many meters would be saved if it were possible to make a way through the pond?",
      "ta": "3. A என்ற புள்ளியில் இருந்து B என்ற புள்ளிக்குச் செல்வதற்கு ஒரு குளம் வழியாக நடந்து செல்ல வேண்டும். குளம் வழியே செல்வதைத் தவிர்க்க 34 மீ தெற்கேயும், 41 மீ கிழக்கு நோக்கியும் நடக்க வேண்டும். குளம் வழியாகச் செல்வதற்குப் பாதை அமைத்து அப்பாதை வழியே சென்றால் எவ்வளவு மீட்டர் தொலைவு சேமிக்கப்படும்?"
    },
    "questionMath": {
      "en": [
        "3. To get from point A to point B you must avoid walking through a pond. You must walk 34 m south and 41 m east. To the nearest meter, how many meters would be saved if it were possible to make a way through the pond?"
      ],
      "ta": [
        "3. A என்ற புள்ளியில் இருந்து B என்ற புள்ளிக்குச் செல்வதற்கு ஒரு குளம் வழியாக நடந்து செல்ல வேண்டும். குளம் வழியே செல்வதைத் தவிர்க்க 34 மீ தெற்கேயும், 41 மீ கிழக்கு நோக்கியும் நடக்க வேண்டும். குளம் வழியாகச் செல்வதற்குப் பாதை அமைத்து அப்பாதை வழியே சென்றால் எவ்வளவு மீட்டர் தொலைவு சேமிக்கப்படும்?"
      ]
    },
    "steps": [
      {
        "en": "The existing path first travels south and then east, so the two lengths add together.",
        "eq": "34 + 41 = 75 m",
        "math": {
          "latex": "34+41=75\\,\\text{m}",
          "fallback": "34 + 41 = 75 m",
          "display": true
        }
      },
      {
        "en": "South and east are perpendicular. A new direct path across the pond is the hypotenuse of the right triangle.",
        "eq": "d² = 34² + 41² = 1156 + 1681 = 2837",
        "math": {
          "latex": "d^2=34^2+41^2=2837",
          "fallback": "d² = 34² + 41² = 1156 + 1681 = 2837",
          "display": true
        }
      },
      {
        "en": "Take the positive square root, retaining extra digits until the last step.",
        "eq": "d = √2837 ≈ 53.2635 m",
        "math": {
          "latex": "d=\\sqrt{2837}\\approx53.2635\\,\\text{m}",
          "fallback": "d = √2837 ≈ 53.2635 m",
          "display": true
        }
      },
      {
        "en": "The distance saved equals existing distance minus new direct distance. The textbook reports 21.74 m; rounded to the nearest whole metre, the saving is 22 m.",
        "eq": "75 − 53.2635 ≈ 21.74 m ≈ 22 m",
        "math": {
          "latex": "75-\\sqrt{2837}\\approx21.74\\,\\text{m}\\approx22\\,\\text{m}",
          "fallback": "75 − 53.2635 ≈ 21.74 m ≈ 22 m",
          "display": true
        }
      }
    ],
    "answer": "21.74 m saved (about 22 m to the nearest metre)",
    "answerMath": {
      "latex": "21.74\\,\\text{m}\\ (\\text{about }22\\,\\text{m to the nearest metre})",
      "fallback": "21.74 m saved (about 22 m to the nearest metre)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q3. English p. 187 (PDF p. 193); Tamil p. 193 (PDF p. 199).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 193,
        "ta": 199
      }
    }
  },
  {
    "id": "c10-4-ex4-3-q4",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q4",
      "ta": "பயிற்சி 4.3 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find the rectangle's sides"
    },
    "q": {
      "en": "4. In the rectangle WXYZ, XY + YZ = 17 cm, and XZ + YW = 26 cm. Calculate the length and breadth of the rectangle?",
      "ta": "4. WXYZ என்ற செவ்வகத்தில், XY + YZ = 17 செ.மீ மற்றும் XZ + YW = 26 செ.மீ எனில் செவ்வகத்தின் நீளம் மற்றும் அகலத்தைக் கணக்கிடுக."
    },
    "questionMath": {
      "en": [
        "4. In the rectangle WXYZ, XY + YZ = 17 cm, and XZ + YW = 26 cm. Calculate the length and breadth of the rectangle?"
      ],
      "ta": [
        "4. WXYZ என்ற செவ்வகத்தில், XY + YZ = 17 செ.மீ மற்றும் XZ + YW = 26 செ.மீ எனில் செவ்வகத்தின் நீளம் மற்றும் அகலத்தைக் கணக்கிடுக."
      ]
    },
    "steps": [
      {
        "en": "Call the rectangle's length a and breadth b. The given sum of adjacent sides means a + b = 17 cm.",
        "eq": "a + b = 17",
        "math": {
          "latex": "a+b=17",
          "fallback": "a + b = 17",
          "display": true
        }
      },
      {
        "en": "Both diagonals of a rectangle are equal, so XZ = YW. Together the two diagonals total 26 cm, which makes either one 13 cm.",
        "eq": "XZ = YW = 26/2 = 13 cm",
        "math": {
          "latex": "XZ=YW=\\dfrac{26}{2}=13\\,\\text{cm}",
          "fallback": "XZ = YW = 26/2 = 13 cm",
          "display": true
        }
      },
      {
        "en": "A side, the adjacent side, and the diagonal make a right triangle. By Pythagoras, a² + b² = 13².",
        "eq": "a² + b² = 169",
        "math": {
          "latex": "a^2+b^2=13^2=169",
          "fallback": "a² + b² = 169",
          "display": true
        }
      },
      {
        "en": "Square a + b = 17: a² + 2ab + b² = 289. Substitute a² + b² = 169, so 2ab = 120 and ab = 60.",
        "eq": "2ab = 289 − 169 = 120, ab = 60",
        "math": {
          "latex": "2ab=289-169=120,\\quad ab=60",
          "fallback": "2ab = 289 − 169 = 120, ab = 60",
          "display": true
        }
      },
      {
        "en": "The two positive numbers with sum 17 and product 60 are 12 and 5. Check: 12² + 5² = 169 = 13².",
        "eq": "(a,b) = (12,5) cm",
        "math": {
          "latex": "(a,b)=(12,5)\\,\\text{cm}",
          "fallback": "(a,b) = (12,5) cm",
          "display": true
        }
      }
    ],
    "answer": "Length = 12 cm; breadth = 5 cm",
    "answerMath": {
      "latex": "\\text{Length}=12\\,\\text{cm},\\quad\\text{breadth}=5\\,\\text{cm}",
      "fallback": "Length = 12 cm; breadth = 5 cm",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q4. English p. 187 (PDF p. 193); Tamil p. 193 (PDF p. 199).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 193,
        "ta": 199
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-3-q4.svg",
    "figureAlt": {
      "en": "Rectangle WXYZ with W at top left, X at lower left, Y at lower right and Z at upper right, showing both equal diagonals XZ and YW.",
      "ta": "பாடநூல் படத்தின் கருத்தைப் பின்பற்றிய வடிவியல் வரைபடம்"
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  },
  {
    "id": "c10-4-ex4-3-q5",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q5",
      "ta": "பயிற்சி 4.3 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Find the three side lengths"
    },
    "q": {
      "en": "5. The hypotenuse of a right triangle is 6 m more than twice of the shortest side. If the third side is 2 m less than the hypotenuse, find the sides of the triangle.",
      "ta": "5. ஒரு செங்கோண முக்கோணத்தின் கர்ணம் சிறிய பக்கத்தின் 2 மடங்கை விட 6 மீ அதிகம். மேலும் மூன்றாவது பக்கமானது கர்ணத்தை விட 2 மீ குறைவு எனில், முக்கோணத்தின் பக்கங்களைக் காண்க."
    },
    "questionMath": {
      "en": [
        "5. The hypotenuse of a right triangle is 6 m more than twice of the shortest side. If the third side is 2 m less than the hypotenuse, find the sides of the triangle."
      ],
      "ta": [
        "5. ஒரு செங்கோண முக்கோணத்தின் கர்ணம் சிறிய பக்கத்தின் 2 மடங்கை விட 6 மீ அதிகம். மேலும் மூன்றாவது பக்கமானது கர்ணத்தை விட 2 மீ குறைவு எனில், முக்கோணத்தின் பக்கங்களைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Let the shortest side be x metres. Translate the words into mathematical expressions: the hypotenuse is 2x + 6, and the third side is (2x + 6) − 2 = 2x + 4.",
        "eq": "Shortest = x; third = 2x+4; hypotenuse = 2x+6",
        "math": {
          "latex": "\\text{shortest}=x,\\ \\text{third}=2x+4,\\ \\text{hypotenuse}=2x+6",
          "fallback": "Shortest = x; third = 2x+4; hypotenuse = 2x+6",
          "display": true
        }
      },
      {
        "en": "Pythagoras says the squares of the two smaller sides add to the square of the hypotenuse.",
        "eq": "x² + (2x+4)² = (2x+6)²",
        "math": {
          "latex": "x^2+(2x+4)^2=(2x+6)^2",
          "fallback": "x² + (2x+4)² = (2x+6)²",
          "display": true
        }
      },
      {
        "en": "Expand the squares, put everything on one side, and factorise the quadratic.",
        "eq": "x² − 8x − 20 = (x−10)(x+2) = 0",
        "math": {
          "latex": "x^2-8x-20=(x-10)(x+2)=0",
          "fallback": "x² − 8x − 20 = (x−10)(x+2) = 0",
          "display": true
        }
      },
      {
        "en": "The possible values are x = 10 or x = −2. A triangle cannot have a negative side length, so x must be 10 metres.",
        "eq": "x = 10 (reject x = −2)",
        "math": {
          "latex": "x=10\\quad(\\text{reject }x=-2)",
          "fallback": "x = 10 (reject x = −2)",
          "display": true
        }
      },
      {
        "en": "Substitute x = 10 into each expression. Check the right triangle: 10² + 24² = 26².",
        "eq": "10 m, 24 m, 26 m; 100 + 576 = 676",
        "math": {
          "latex": "10^2+24^2=100+576=676=26^2",
          "fallback": "10 m, 24 m, 26 m; 100 + 576 = 676",
          "display": true
        }
      }
    ],
    "answer": "10 m, 24 m, 26 m",
    "answerMath": {
      "latex": "10\\,\\text{m},\\quad24\\,\\text{m},\\quad26\\,\\text{m}",
      "fallback": "10 m, 24 m, 26 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q5. English p. 187 (PDF p. 193); Tamil p. 193 (PDF p. 199).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 193,
        "ta": 199
      }
    }
  },
  {
    "id": "c10-4-ex4-3-q6",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q6",
      "ta": "பயிற்சி 4.3 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Ladder sliding upward"
    },
    "q": {
      "en": "6. 5 m long ladder is placed leaning towards a vertical wall such that it reaches the wall at a point 4 m high. If the foot of the ladder is moved 1.6 m towards the wall, then find the distance by which the top of the ladder would slide upwards on the wall.",
      "ta": "6. 5 மீ நீளமுள்ள ஓர் ஏணியானது ஒரு செங்குத்து சுவர் மீது சாய்த்து வைக்கப்படுகிறது. ஏணியின் மேல் முனை சுவரை 4 மீ உயரத்தில் தொடுகிறது. ஏணியின் கீழ்முனை சுவரை நோக்கி 1.6 மீ நகர்த்தப்படும்போது, ஏணியின் மேல்முனை சுவரில் எவ்வளவு தொலைவு மேல்நோக்கி நகரும் எனக் கண்டுபிடி."
    },
    "questionMath": {
      "en": [
        "6. 5 m long ladder is placed leaning towards a vertical wall such that it reaches the wall at a point 4 m high. If the foot of the ladder is moved 1.6 m towards the wall, then find the distance by which the top of the ladder would slide upwards on the wall."
      ],
      "ta": [
        "6. 5 மீ நீளமுள்ள ஓர் ஏணியானது ஒரு செங்குத்து சுவர் மீது சாய்த்து வைக்கப்படுகிறது. ஏணியின் மேல் முனை சுவரை 4 மீ உயரத்தில் தொடுகிறது. ஏணியின் கீழ்முனை சுவரை நோக்கி 1.6 மீ நகர்த்தப்படும்போது, ஏணியின் மேல்முனை சுவரில் எவ்வளவு தொலைவு மேல்நோக்கி நகரும் எனக் கண்டுபிடி."
      ]
    },
    "steps": [
      {
        "en": "The ladder, wall and ground make a right triangle. The ladder is always the hypotenuse and stays 5 m long.",
        "eq": "ground² + 4² = 5²",
        "math": {
          "latex": "d^2+4^2=5^2",
          "fallback": "ground² + 4² = 5²",
          "display": true
        }
      },
      {
        "en": "First find how far the foot of the ladder was from the wall.",
        "eq": "d = √(25−16) = 3 m",
        "math": {
          "latex": "d=\\sqrt{25-16}=3\\,\\text{m}",
          "fallback": "d = √(25−16) = 3 m",
          "display": true
        }
      },
      {
        "en": "The foot moves 1.6 m towards the wall, so the new horizontal gap is smaller, not larger.",
        "eq": "3 − 1.6 = 1.4 m",
        "math": {
          "latex": "3-1.6=1.4\\,\\text{m}",
          "fallback": "3 − 1.6 = 1.4 m",
          "display": true
        }
      },
      {
        "en": "Apply Pythagoras again to the new right triangle to obtain the new height.",
        "eq": "h² = 5² − 1.4² = 23.04, h = 4.8 m",
        "math": {
          "latex": "h^2=5^2-1.4^2=23.04,\\quad h=4.8\\,\\text{m}",
          "fallback": "h² = 5² − 1.4² = 23.04, h = 4.8 m",
          "display": true
        }
      },
      {
        "en": "Subtract the old height of 4 m from the new height of 4.8 m.",
        "eq": "4.8 − 4 = 0.8 m upward",
        "math": {
          "latex": "4.8-4=0.8\\,\\text{m}",
          "fallback": "4.8 − 4 = 0.8 m upward",
          "display": true
        }
      }
    ],
    "answer": "0.8 m upward",
    "answerMath": {
      "latex": "0.8\\,\\text{m upward}",
      "fallback": "0.8 m upward",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q6. English p. 188 (PDF p. 194); Tamil p. 194 (PDF p. 200).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 194,
        "ta": 200
      }
    }
  },
  {
    "id": "c10-4-ex4-3-q7",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q7",
      "ta": "பயிற்சி 4.3 · வினா 7 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove an identity with an altitude"
    },
    "q": {
      "en": "7. The perpendicular PS on the base QR of a △PQR intersects QR at S, such that QS = 3 SR. Prove that 2PQ² = 2PR² + QR².",
      "ta": "7. △PQR-இல் அடிப்பக்கம் QR-க்கு செங்குத்தாக உள்ள PS ஆனது QR-ஐ S-இல் சந்திக்கிறது. மேலும் QS = 3SR எனில், 2PQ² = 2PR² + QR² என நிறுவுக."
    },
    "questionMath": {
      "en": [
        "7. The perpendicular PS on the base QR of a △PQR intersects QR at S, such that QS = 3 SR. Prove that ",
        {
          "latex": "2PQ^2=2PR^2+QR^2",
          "fallback": "2PQ² = 2PR² + QR²",
          "display": false
        },
        "."
      ],
      "ta": [
        "7. △PQR-இல் அடிப்பக்கம் QR-க்கு செங்குத்தாக உள்ள PS ஆனது QR-ஐ S-இல் சந்திக்கிறது. மேலும் QS = 3SR எனில், ",
        {
          "latex": "2PQ^2=2PR^2+QR^2",
          "fallback": "2PQ² = 2PR² + QR²",
          "display": false
        },
        " என நிறுவுக."
      ]
    },
    "steps": [
      {
        "en": "Let SR = t. Because QS is three times SR, QS = 3t. Adding the two pieces gives QR = 4t.",
        "eq": "SR = t; QS = 3t; QR = 4t",
        "math": {
          "latex": "SR=t,\\quad QS=3t,\\quad QR=4t",
          "fallback": "SR = t; QS = 3t; QR = 4t",
          "display": true
        }
      },
      {
        "en": "Since PS is perpendicular to QR, triangle PQS has a right angle at S. Apply the Pythagoras theorem.",
        "eq": "PQ² = PS² + QS² = PS² + 9t²",
        "math": {
          "latex": "PQ^2=PS^2+QS^2=PS^2+9t^2",
          "fallback": "PQ² = PS² + QS² = PS² + 9t²",
          "display": true
        }
      },
      {
        "en": "Triangle PRS also has a right angle at S. Apply Pythagoras a second time.",
        "eq": "PR² = PS² + SR² = PS² + t²",
        "math": {
          "latex": "PR^2=PS^2+SR^2=PS^2+t^2",
          "fallback": "PR² = PS² + SR² = PS² + t²",
          "display": true
        }
      },
      {
        "en": "Subtract the two equations. The common PS² cancels, leaving only the lengths along QR.",
        "eq": "PQ² − PR² = 8t²",
        "math": {
          "latex": "PQ^2-PR^2=8t^2",
          "fallback": "PQ² − PR² = 8t²",
          "display": true
        }
      },
      {
        "en": "Multiply both sides by 2. Since QR = 4t, QR² = 16t², which is exactly the difference obtained.",
        "eq": "2PQ² = 2PR² + 16t² = 2PR² + QR²",
        "math": {
          "latex": "2PQ^2=2PR^2+16t^2=2PR^2+QR^2",
          "fallback": "2PQ² = 2PR² + 16t² = 2PR² + QR²",
          "display": true
        }
      }
    ],
    "answer": "Proved: 2PQ² = 2PR² + QR²",
    "answerMath": {
      "latex": "2PQ^2=2PR^2+QR^2",
      "fallback": "Proved: 2PQ² = 2PR² + QR²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q7. English p. 188 (PDF p. 194); Tamil p. 194 (PDF p. 200).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 194,
        "ta": 200
      }
    }
  },
  {
    "id": "c10-4-ex4-3-q8",
    "classNum": 10,
    "chapter": "4",
    "exercise": "4.3",
    "topic": {
      "en": "Geometry",
      "ta": "வடிவியல்"
    },
    "label": {
      "en": "Exercise 4.3 · Q8",
      "ta": "பயிற்சி 4.3 · வினா 8 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Prove the trisected-side identity"
    },
    "q": {
      "en": "8. In the adjacent figure, ABC is a right angled triangle with right angle at B and points D, E trisect BC. Prove that 8AE² = 3AC² + 5AD².",
      "ta": "8. படத்தில், செங்கோண முக்கோணம் ABC-இல் கோணம் B ஆனது செங்கோணம் மற்றும் D, E என்ற புள்ளிகள் பக்கம் BC-ஐ மூன்று சமபகுதிகளாக பிரிக்கிறது எனில், 8AE² = 3AC² + 5AD² என நிறுவுக."
    },
    "questionMath": {
      "en": [
        "8. In the adjacent figure, ABC is a right angled triangle with right angle at B and points D, E trisect BC. Prove that ",
        {
          "latex": "8AE^2=3AC^2+5AD^2",
          "fallback": "8AE² = 3AC² + 5AD²",
          "display": false
        },
        "."
      ],
      "ta": [
        "8. படத்தில், செங்கோண முக்கோணம் ABC-இல் கோணம் B ஆனது செங்கோணம் மற்றும் D, E என்ற புள்ளிகள் பக்கம் BC-ஐ மூன்று சமபகுதிகளாக பிரிக்கிறது எனில், ",
        {
          "latex": "8AE^2=3AC^2+5AD^2",
          "fallback": "8AE² = 3AC² + 5AD²",
          "display": false
        },
        " என நிறுவுக."
      ]
    },
    "steps": [
      {
        "en": "Trisect means divide into three equal pieces. Let BD = DE = EC = t; then BE = 2t and BC = 3t.",
        "eq": "BD = DE = EC = t; BE = 2t; BC = 3t",
        "math": {
          "latex": "BD=DE=EC=t,\\quad BE=2t,\\quad BC=3t",
          "fallback": "BD = DE = EC = t; BE = 2t; BC = 3t",
          "display": true
        }
      },
      {
        "en": "The right angle at B belongs to triangle ABD. Use Pythagoras to express its hypotenuse AD.",
        "eq": "AD² = AB² + BD² = AB² + t²",
        "math": {
          "latex": "AD^2=AB^2+BD^2=AB^2+t^2",
          "fallback": "AD² = AB² + BD² = AB² + t²",
          "display": true
        }
      },
      {
        "en": "Triangle ABE is also right-angled at B, so use Pythagoras again.",
        "eq": "AE² = AB² + BE² = AB² + 4t²",
        "math": {
          "latex": "AE^2=AB^2+BE^2=AB^2+4t^2",
          "fallback": "AE² = AB² + BE² = AB² + 4t²",
          "display": true
        }
      },
      {
        "en": "In the largest right triangle ABC, the whole base has length 3t.",
        "eq": "AC² = AB² + BC² = AB² + 9t²",
        "math": {
          "latex": "AC^2=AB^2+BC^2=AB^2+9t^2",
          "fallback": "AC² = AB² + BC² = AB² + 9t²",
          "display": true
        }
      },
      {
        "en": "Replace AC² and AD² in the proposed right-hand side, and combine like terms.",
        "eq": "3AC² + 5AD² = 8AB² + 32t²",
        "math": {
          "latex": "3AC^2+5AD^2=3(AB^2+9t^2)+5(AB^2+t^2)=8AB^2+32t^2",
          "fallback": "3AC² + 5AD² = 8AB² + 32t²",
          "display": true
        }
      },
      {
        "en": "Factor out 8. From the equation for AE², AB² + 4t² is AE², so the right-hand side is 8AE² as required.",
        "eq": "3AC² + 5AD² = 8(AB²+4t²) = 8AE²",
        "math": {
          "latex": "3AC^2+5AD^2=8(AB^2+4t^2)=8AE^2",
          "fallback": "3AC² + 5AD² = 8(AB²+4t²) = 8AE²",
          "display": true
        }
      }
    ],
    "answer": "Proved: 8AE² = 3AC² + 5AD²",
    "answerMath": {
      "latex": "8AE^2=3AC^2+5AD^2",
      "fallback": "Proved: 8AE² = 3AC² + 5AD²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025, Exercise 4.3 Q8. English p. 188 (PDF p. 194); Tamil p. 194 (PDF p. 200).",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-and-answer-key-checked",
      "sourcePdfPage": {
        "en": 194,
        "ta": 200
      }
    },
    "figureSrc": "assets/grade10-geometry/ex4-3-q8.svg",
    "figureAlt": {
      "en": "Right triangle ABC with AB vertical, BC horizontal and right angle at B. D and E lie along BC in the order B, D, E, C, splitting BC into three equal segments.",
      "ta": "பாடநூல் படத்தின் கருத்தைப் பின்பற்றிய வடிவியல் வரைபடம்"
    },
    "figureCaption": {
      "en": "Geometry figure",
      "ta": "வடிவியல் படம்"
    }
  }
];
const grade = window.TRIGGLE_CLASSES[10];
const chapter = window.TRIGGLE_CURRICULUM.grades.find(({grade}) => grade === 10)
  .chapters.find(({number}) => number === 4);
for (const entry of entries) {
  if (grade.items.some(({id}) => id === entry.id)) throw new Error('Duplicate Grade 10 Geometry question: ' + entry.id);
  grade.items.push(entry);
  if (!chapter.textbookQuestionIds.includes(entry.id)) chapter.textbookQuestionIds.push(entry.id);
}
})();
