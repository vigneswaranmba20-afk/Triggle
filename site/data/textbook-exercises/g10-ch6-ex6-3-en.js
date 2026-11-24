/* 2025 revised TN SCERT Grade 10 Trigonometry, Exercise 6.3 (Q1–Q6; Q5 prints as a single whole question covering both ships).
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-ex6-3-q1",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Angle of Depression",
      "ta": "முக்கோணவியல் — இறக்கக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.3 · Q1",
      "ta": "பயிற்சி 6.3 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Horizontal distance of a car at 30° depression from 50√3 m rock"
    },
    "q": {
      "en": "1. From the top of a rock 50√3 m high, the angle of depression of a car on the ground is observed to be 30°. Find the distance of the car from the rock.",
      "ta": "1. 50√3 மீ உயரமுள்ள ஒரு பாறையின் உச்சியிலிருந்து 30° இறக்கக்கோணத்தில் தரையிலுள்ள மகிழுந்து ஒன்று பார்க்கப்படுகிறது எனில், மகிழுந்திற்கும் பாறைக்கும் இடையேயுள்ள தொலைவைக் காண்க."
    },
    "questionMath": {
      "en": [
        "1. From the top of a rock ",
        {
          "latex": "50\\sqrt{3}\\text{ m}",
          "fallback": "50√3 m",
          "display": false
        },
        " high, the angle of depression of a car on the ground is observed to be ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Find the distance of the car from the rock."
      ],
      "ta": [
        "1. ",
        {
          "latex": "50\\sqrt{3}",
          "fallback": "50√3",
          "display": false
        },
        " மீ உயரமுள்ள ஒரு பாறையின் உச்சியிலிருந்து ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " இறக்கக்கோணத்தில் தரையிலுள்ள மகிழுந்து ஒன்று பார்க்கப்படுகிறது எனில், மகிழுந்திற்கும் பாறைக்கும் இடையேயுள்ள தொலைவைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: By alternate interior angles with the horizontal eye line, the ground angle of elevation from the car to the rock top is also 30°. Using tan 30° = 50√3 / d gives d = 50√3 × √3 = 150 m.",
        "eq": "Alternate angle = 30°; tan 30° = 50√3 / d",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{50\\sqrt{3}}{d}\\quad\\text{gives}\\quad \\dfrac{1}{\\sqrt{3}} = \\dfrac{50\\sqrt{3}}{d}",
          "fallback": "Alternate angle = 30°; tan 30° = 50√3 / d",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Always recall that angle of depression from horizontal equals angle of elevation from the ground by parallel horizontal lines. Multiply 50√3 by √3 to get 50 × 3 = 150 m.",
        "eq": "d = 50√3 × √3 = 50 × 3 = 150 m",
        "math": {
          "latex": "d = 50\\sqrt{3}\\times\\sqrt{3} = 50\\times 3 = 150\\text{ m}",
          "fallback": "d = 50√3 × √3 = 50 × 3 = 150 m",
          "display": true
        }
      }
    ],
    "answer": "150 m",
    "answerMath": {
      "latex": "150\\text{ m}",
      "fallback": "150 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q1.svg",
    "figureAlt": { "en": "Angle of depression 30 degrees from rock height 50 root 3 m equals alternate elevation 30 degrees at car.", "ta": "கிடைமட்டக் கோட்டிலிருந்து அளக்கப்படும் இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Car viewed from top of 50 root 3 m rock at 30 degrees depression for Exercise 6.3 Q1", "ta": "இறக்கக்கோணம் — செங்கோண முக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q1. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  },
  {
    "id": "c10-6-ex6-3-q2",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Angle of Depression",
      "ta": "முக்கோணவியல் — இறக்கக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.3 · Q2",
      "ta": "பயிற்சி 6.3 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of first building when depression from 120 m building is 45°"
    },
    "q": {
      "en": "2. The horizontal distance between two buildings is 70 m. The angle of depression of the top of the first building when seen from the top of the second building is 45°. If the height of the second building is 120 m, find the height of the first building.",
      "ta": "2. இரண்டு கட்டடங்களுக்கு இடைப்பட்ட கிடைமட்டத் தொலைவு 70 மீ ஆகும். இரண்டாவது கட்டடத்தின் உச்சியிலிருந்து முதல் கட்டடத்தின் உச்சிக்கு உள்ள இறக்கக்கோணம் 45° ஆகும். இரண்டாவது கட்டடத்தின் உயரம் 120 மீ எனில் முதல் கட்டடத்தின் உயரத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. The horizontal distance between two buildings is ",
        {
          "latex": "70\\text{ m}",
          "fallback": "70 m",
          "display": false
        },
        ". The angle of depression of the top of the first building when seen from the top of the second building is ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        ". If the height of the second building is ",
        {
          "latex": "120\\text{ m}",
          "fallback": "120 m",
          "display": false
        },
        ", find the height of the first building."
      ],
      "ta": [
        "2. இரண்டு கட்டடங்களுக்கு இடைப்பட்ட கிடைமட்டத் தொலைவு ",
        {
          "latex": "70",
          "fallback": "70",
          "display": false
        },
        " மீ ஆகும். இரண்டாவது கட்டடத்தின் உச்சியிலிருந்து முதல் கட்டடத்தின் உச்சிக்கு உள்ள இறக்கக்கோணம் ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " ஆகும். இரண்டாவது கட்டடத்தின் உயரம் ",
        {
          "latex": "120",
          "fallback": "120",
          "display": false
        },
        " மீ எனில் முதல் கட்டடத்தின் உயரத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Across the 70 m horizontal gap at 45° depression, the vertical height difference between the buildings satisfies tan 45° = (120 − h)/70, so 120 − h = 70 and h = 50 m.",
        "eq": "Vertical drop above first building = 120 − h; tan 45° = (120 − h)/70",
        "math": {
          "latex": "\\tan 45^\\circ = \\dfrac{120 - h}{70}\\quad\\text{gives}\\quad 1 = \\dfrac{120 - h}{70}",
          "fallback": "Vertical drop above first building = 120 − h; tan 45° = (120 − h)/70",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Since tan 45° = 1, the vertical drop equals the horizontal distance 70 m. Subtract that drop from 120 m to find the shorter building's height.",
        "eq": "120 − h = 70 gives h = 120 − 70 = 50 m",
        "math": {
          "latex": "120 - h = 70\\quad\\text{gives}\\quad h = 120 - 70 = 50\\text{ m}",
          "fallback": "120 − h = 70 gives h = 120 − 70 = 50 m",
          "display": true
        }
      }
    ],
    "answer": "50 m",
    "answerMath": {
      "latex": "50\\text{ m}",
      "fallback": "50 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q2.svg",
    "figureAlt": { "en": "Second building is 120 m tall and first building roof is at 45 degrees depression across 70 m gap.", "ta": "கோபுர உச்சியிலிருந்து இறக்கக்கோணப் பார்வைக் கோடு படம்." },
    "figureCaption": { "en": "Two buildings 70 m apart with 45 degrees depression for Exercise 6.3 Q2", "ta": "இறக்கக்கோணம் — கிடைமட்டத் தொலைவுப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q2. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  },
  {
    "id": "c10-6-ex6-3-q3",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Two Depression Angles",
      "ta": "முக்கோணவியல் — இரு இறக்கக்கோணங்கள்"
    },
    "label": {
      "en": "Exercise 6.3 · Q3",
      "ta": "பயிற்சி 6.3 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of lamp post observed from top of a 60 m tower"
    },
    "q": {
      "en": "3. From the top of the tower 60 m high the angles of depression of the top and bottom of a vertical lamp post are observed to be 38° and 60° respectively. Find the height of the lamp post. (tan 38° = 0.7813, √3 = 1.732)",
      "ta": "3. 60 மீ உயரமுள்ள கோபுரத்தின் உச்சியிலிருந்து செங்குத்தாக உள்ள ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் இறக்கக்கோணங்கள் முறையே 38° மற்றும் 60° எனில், விளக்குக் கம்பத்தின் உயரத்தைக் காண்க. (tan 38° = 0.7813, √3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "3. From the top of the tower ",
        {
          "latex": "60\\text{ m}",
          "fallback": "60 m",
          "display": false
        },
        " high the angles of depression of the top and bottom of a vertical lamp post are observed to be ",
        {
          "latex": "38^\\circ",
          "fallback": "38°",
          "display": false
        },
        " and ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " respectively. Find the height of the lamp post. (",
        {
          "latex": "\\tan 38^\\circ=0.7813,\\;\\sqrt{3}=1.732",
          "fallback": "tan 38° = 0.7813, √3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "3. ",
        {
          "latex": "60",
          "fallback": "60",
          "display": false
        },
        " மீ உயரமுள்ள கோபுரத்தின் உச்சியிலிருந்து செங்குத்தாக உள்ள ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் இறக்கக்கோணங்கள் முறையே ",
        {
          "latex": "38^\\circ",
          "fallback": "38°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " எனில், விளக்குக் கம்பத்தின் உயரத்தைக் காண்க. (",
        {
          "latex": "\\tan 38^\\circ=0.7813,\\;\\sqrt{3}=1.732",
          "fallback": "tan 38° = 0.7813, √3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First find horizontal distance d = 60 / tan 60° = 60 / 1.732 ≈ 34.642 m. Using depression 38° to the lamp post top, the drop from tower top to lamp post top is d tan 38° ≈ 27.07 m, leaving lamp post height ≈ 60 − 27.07 = 32.93 m.",
        "eq": "d = 60 / tan 60° = 60 / √3 = 20√3 = 34.64 m",
        "math": {
          "latex": "\\tan 60^\\circ = \\dfrac{60}{d}\\quad\\text{gives}\\quad d = \\dfrac{60}{\\sqrt{3}} = \\dfrac{60}{1.732} = 34.642\\text{ m}",
          "fallback": "d = 60 / tan 60° = 60 / √3 = 20√3 = 34.64 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — In the upper right triangle to the top of the lamp post (height h), vertical leg is (60 − h) and base is d = 34.642 m with angle 38°. Multiply d × tan 38° and subtract from 60 m.",
        "eq": "60 − h = (60/1.732) × 0.7813 ≈ 27.07 m gives h ≈ 60 − 27.07 = 32.93 m",
        "math": {
          "latex": "\\begin{aligned} 60 - h &= d\\tan 38^\\circ = \\dfrac{60}{1.732}\\times 0.7813 \\approx 27.07\\text{ m} \\\\ h &= 60 - 27.07 = 32.93\\text{ m} \\end{aligned}",
          "fallback": "60 − h = (60/1.732) × 0.7813 ≈ 27.07 m gives h ≈ 60 − 27.07 = 32.93 m",
          "display": true
        }
      }
    ],
    "answer": "32.93 m",
    "answerMath": {
      "latex": "32.93\\text{ m}",
      "fallback": "32.93 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q3.svg",
    "figureAlt": { "en": "Tower height 60 m looks down at lamp post top (38 deg) and bottom (60 deg).", "ta": "60 மீ கோபுர உச்சியிலிருந்து விளக்குக் கம்பத்தின் உச்சி மற்றும் அடிக்கான இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Lamp post viewed at 38 and 60 degrees depression from 60 m tower for Exercise 6.3 Q3", "ta": "விளக்குக் கம்பம் — 38°, 60° இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q3. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  },
  {
    "id": "c10-6-ex6-3-q4",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Same-Side Depression",
      "ta": "முக்கோணவியல் — ஒரே திசையில் இறக்கக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.3 · Q4",
      "ta": "பயிற்சி 6.3 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance between two boats seen from an aeroplane at 1800 m"
    },
    "q": {
      "en": "4. An aeroplane at an altitude of 1800 m finds that two boats are sailing towards it in the same direction. The angles of depression of the boats as observed from the aeroplane are 60° and 30° respectively. Find the distance between the two boats. (√3 = 1.732)",
      "ta": "4. 1800 மீ உயரத்தில் பறக்கும் ஒரு விமானத்திலிருந்து ஒரே திசையில் விமானத்தை நோக்கிச் செல்லும் இரு படகுகள் பார்க்கப்படுகிறது. விமானத்திலிருந்து இரு படகுகளை முறையே 60° மற்றும் 30° இறக்கக்கோணங்களில் உற்று நோக்கினால், இரண்டு படகுகளுக்கும் இடைப்பட்டத் தொலைவைக் காண்க. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "4. An aeroplane at an altitude of ",
        {
          "latex": "1800\\text{ m}",
          "fallback": "1800 m",
          "display": false
        },
        " finds that two boats are sailing towards it in the same direction. The angles of depression of the boats as observed from the aeroplane are ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " respectively. Find the distance between the two boats. (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "4. ",
        {
          "latex": "1800",
          "fallback": "1800",
          "display": false
        },
        " மீ உயரத்தில் பறக்கும் ஒரு விமானத்திலிருந்து ஒரே திசையில் விமானத்தை நோக்கிச் செல்லும் இரு படகுகள் பார்க்கப்படுகிறது. விமானத்திலிருந்து இரு படகுகளை முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " இறக்கக்கோணங்களில் உற்று நோக்கினால், இரண்டு படகுகளுக்கும் இடைப்பட்டத் தொலைவைக் காண்க. (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Because both boats sail on the same side below the plane, compute each horizontal distance from directly beneath the plane (d₁ = 1800/√3 = 600√3 m, d₂ = 1800√3 m) and subtract: d₂ − d₁ = 1200√3 = 2078.4 m.",
        "eq": "Closer boat: d₁ = 1800 / tan 60° = 600√3 m; farther boat: d₂ = 1800 / tan 30° = 1800√3 m",
        "math": {
          "latex": "\\begin{aligned} d_1 &= \\dfrac{1800}{\\tan 60^\\circ} = \\dfrac{1800}{\\sqrt{3}} = 600\\sqrt{3}\\text{ m} \\\\ d_2 &= \\dfrac{1800}{\\tan 30^\\circ} = \\dfrac{1800}{1/\\sqrt{3}} = 1800\\sqrt{3}\\text{ m} \\end{aligned}",
          "fallback": "Closer boat: d₁ = 1800 / tan 60° = 600√3 m; farther boat: d₂ = 1800 / tan 30° = 1800√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice the steeper depression (60°) belongs to the closer boat and the shallower depression (30°) to the farther boat. Since both lie in front on the same side, distance between them is d₂ − d₁.",
        "eq": "d₂ − d₁ = (1800√3 − 600√3) = 1200√3 = 1200 × 1.732 = 2078.4 m",
        "math": {
          "latex": "\\text{Distance} = 1800\\sqrt{3} - 600\\sqrt{3} = 1200\\sqrt{3} = 1200\\times 1.732 = 2078.4\\text{ m}",
          "fallback": "d₂ − d₁ = (1800√3 − 600√3) = 1200√3 = 1200 × 1.732 = 2078.4 m",
          "display": true
        }
      }
    ],
    "answer": "2078.4 m",
    "answerMath": {
      "latex": "2078.4\\text{ m}",
      "fallback": "2078.4 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q4.svg",
    "figureAlt": { "en": "Two boats on same side of vertical projection below plane at 1800 m seen at 60 and 30 degrees depression.", "ta": "1800 மீ உயர விமானத்திலிருந்து இரு படகுகளுக்கான 60°, 30° இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Aeroplane at 1800 m observing two boats at 60 and 30 degrees depression for Exercise 6.3 Q4", "ta": "விமானமும் இரு படகுகளும் — இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q4. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  },
  {
    "id": "c10-6-ex6-3-q5",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Opposite-Side Depression Proof",
      "ta": "முக்கோணவியல் — எதிரெதிர் திசைகளில் இறக்கக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.3 · Q5",
      "ta": "பயிற்சி 6.3 · வினா 5 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance 4h/√3 between ships on opposite sides of lighthouse h"
    },
    "q": {
      "en": "5. From the top of a lighthouse, the angle of depression of two ships on the opposite sides of it are observed to be 30° and 60°. If the height of the lighthouse is h meters and the line joining the ships passes through the foot of the lighthouse, show that the distance between the ships is 4h/√3 m.",
      "ta": "5. ஒரு கலங்கரை விளக்கத்தின் உச்சியிலிருந்து எதிரெதிர் பக்கங்களில் உள்ள இரண்டு கப்பல்கள் 30° மற்றும் 60° இறக்கக்கோணத்தில் பார்க்கப்படுகின்றன. கலங்கரை விளக்கத்தின் உயரம் h மீ. இரு கப்பல்கள் மற்றும் கலங்கரை விளக்கத்தின் அடிப்பகுதி ஆகியவை ஒரே நேர்க்கோட்டில் அமைகின்றன எனில், இரண்டு கப்பல்களுக்கு இடைப்பட்ட தொலைவு 4h/√3 மீ என நிரூபிக்க."
    },
    "questionMath": {
      "en": [
        "5. From the top of a lighthouse, the angle of depression of two ships on the opposite sides of it are observed to be ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " and ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ". If the height of the lighthouse is ",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        " meters and the line joining the ships passes through the foot of the lighthouse, show that the distance between the ships is ",
        {
          "latex": "\\dfrac{4h}{\\sqrt{3}}\\text{ m}",
          "fallback": "4h/√3 m",
          "display": false
        },
        "."
      ],
      "ta": [
        "5. ஒரு கலங்கரை விளக்கத்தின் உச்சியிலிருந்து எதிரெதிர் பக்கங்களில் உள்ள இரண்டு கப்பல்கள் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " இறக்கக்கோணத்தில் பார்க்கப்படுகின்றன. கலங்கரை விளக்கத்தின் உயரம் ",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        " மீ. இரு கப்பல்கள் மற்றும் கலங்கரை விளக்கத்தின் அடிப்பகுதி ஆகியவை ஒரே நேர்க்கோட்டில் அமைகின்றன எனில், இரண்டு கப்பல்களுக்கு இடைப்பட்ட தொலைவு ",
        {
          "latex": "\\dfrac{4h}{\\sqrt{3}}",
          "fallback": "4h/√3",
          "display": false
        },
        " மீ என நிரூபிக்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Compute the distance from the lighthouse foot to each ship on opposite sides: d₁ = h/tan 30° = h√3 and d₂ = h/tan 60° = h/√3. Adding opposite-side distances gives h√3 + h/√3 = 4h/√3 m.",
        "eq": "d₁ = h / tan 30° = h√3; d₂ = h / tan 60° = h/√3",
        "math": {
          "latex": "d_1 = \\dfrac{h}{\\tan 30^\\circ} = h\\sqrt{3},\\qquad d_2 = \\dfrac{h}{\\tan 60^\\circ} = \\dfrac{h}{\\sqrt{3}}",
          "fallback": "d₁ = h / tan 30° = h√3; d₂ = h / tan 60° = h/√3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because the ships lie on opposite sides of the lighthouse along a straight line through its foot, we add d₁ + d₂ rather than subtracting. Combine over common denominator √3: (h·√3·√3 + h)/√3 = (3h + h)/√3 = 4h/√3 m.",
        "eq": "Total distance = h√3 + h/√3 = (3h + h)/√3 = 4h/√3 m",
        "math": {
          "latex": "\\text{Distance between ships} = d_1 + d_2 = h\\sqrt{3} + \\dfrac{h}{\\sqrt{3}} = \\dfrac{3h + h}{\\sqrt{3}} = \\dfrac{4h}{\\sqrt{3}}\\text{ m}",
          "fallback": "Total distance = h√3 + h/√3 = (3h + h)/√3 = 4h/√3 m",
          "display": true
        }
      }
    ],
    "answer": "4h/√3 m (proved)",
    "answerMath": {
      "latex": "\\dfrac{4h}{\\sqrt{3}}\\text{ m}",
      "fallback": "4h/√3 m (proved)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q5.svg",
    "figureAlt": { "en": "Two ships on opposite sides of a lighthouse of height h; the unknown horizontal distances d₁ and d₂ correspond to depression angles 30° and 60° respectively.", "ta": "h உயரமுள்ள கலங்கரை விளக்கத்தின் எதிரெதிர் பக்கங்களில் உள்ள கப்பல்களுக்கான 30°, 60° இறக்கக்கோணங்கள்; கிடைமட்டத் தொலைவுகள் d₁, d₂." },
    "figureCaption": { "en": "Lighthouse of height h observing ships on opposite sides at 30 and 60 degrees for Exercise 6.3 Q5", "ta": "கலங்கரை விளக்கமும் கப்பல்களும் — இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q5. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  },
  {
    "id": "c10-6-ex6-3-q6",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.3",
    "topic": {
      "en": "Trigonometry — Speed from Changing Depression",
      "ta": "முக்கோணவியல் — இறக்கக்கோண மாற்றமும் வேகமும்"
    },
    "label": {
      "en": "Exercise 6.3 · Q6",
      "ta": "பயிற்சி 6.3 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Descending speed of a glass lift over 2 minutes"
    },
    "q": {
      "en": "6. A lift in a building of height 90 feet with transparent glass walls is descending from the top of the building. At the top of the building, the angle of depression to a fountain in the garden is 60°. Two minutes later, the angle of depression reduces to 30°. If the fountain is 30√3 feet from the entrance of the lift, find the speed of the lift which is descending.",
      "ta": "6. 90 அடி உயரமுள்ள கட்டடத்தின் மேலிருந்து ஒளி ஊடுருவும் கண்ணாடிச் சுவர் கொண்ட மின் தூக்கியானது கீழ் நோக்கி வருகிறது. கட்டடத்தின் உச்சியில் மின் தூக்கி இருக்கும்போது பூந்தோட்டத்தில் உள்ள ஒரு நீரூற்றின் இறக்கக்கோணம் 60° ஆகும். இரண்டு நிமிடம் கழித்து அதன் இறக்கக்கோணம் 30° ஆக குறைகிறது. மின்தூக்கியின் நுழைவு வாயிலிலிருந்து நீரூற்று 30√3 அடி தொலைவில் உள்ளது எனில் மின்தூக்கி கீழே வரும் வேகத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. A lift in a building of height ",
        {
          "latex": "90",
          "fallback": "90",
          "display": false
        },
        " feet with transparent glass walls is descending from the top of the building. At the top of the building, the angle of depression to a fountain in the garden is ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ". Two minutes later, the angle of depression reduces to ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". If the fountain is ",
        {
          "latex": "30\\sqrt{3}",
          "fallback": "30√3",
          "display": false
        },
        " feet from the entrance of the lift, find the speed of the lift which is descending."
      ],
      "ta": [
        "6. ",
        {
          "latex": "90",
          "fallback": "90",
          "display": false
        },
        " அடி உயரமுள்ள கட்டடத்தின் மேலிருந்து ஒளி ஊடுருவும் கண்ணாடிச் சுவர் கொண்ட மின் தூக்கியானது கீழ் நோக்கி வருகிறது. கட்டடத்தின் உச்சியில் மின் தூக்கி இருக்கும்போது பூந்தோட்டத்தில் உள்ள ஒரு நீரூற்றின் இறக்கக்கோணம் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " ஆகும். இரண்டு நிமிடம் கழித்து அதன் இறக்கக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " ஆக குறைகிறது. மின்தூக்கியின் நுழைவு வாயிலிலிருந்து நீரூற்று ",
        {
          "latex": "30\\sqrt{3}",
          "fallback": "30√3",
          "display": false
        },
        " அடி தொலைவில் உள்ளது எனில் மின்தூக்கி கீழே வரும் வேகத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: At height h₁ = 90 ft (where tan 60° = 90/(30√3) = √3 confirms the top angle 60°), after 2 minutes at depression 30° the height drops to h₂ = 30√3 · tan 30° = 30 ft. Thus the lift descends 90 − 30 = 60 feet in 2 minutes, giving speed 30 feet/min.",
        "eq": "Initial height h₁ = 90 ft; after 2 min, h₂ = 30√3 × tan 30° = 30 ft",
        "math": {
          "latex": "\\begin{aligned} h_1 &= 30\\sqrt{3}\\tan 60^\\circ = 30\\sqrt{3}(\\sqrt{3}) = 90\\text{ ft} \\\\ h_2 &= 30\\sqrt{3}\\tan 30^\\circ = 30\\sqrt{3}\\left(\\dfrac{1}{\\sqrt{3}}\\right) = 30\\text{ ft} \\end{aligned}",
          "fallback": "Initial height h₁ = 90 ft; after 2 min, h₂ = 30√3 × tan 30° = 30 ft",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Distance descended = h₁ − h₂ = 90 − 30 = 60 feet. Divide distance by elapsed time (2 minutes) to obtain descending speed.",
        "eq": "Descended = 90 − 30 = 60 ft; Speed = 60 / 2 = 30 feet/min",
        "math": {
          "latex": "\\begin{aligned} \\text{Distance descended} &= 90 - 30 = 60\\text{ feet} \\\\ \\text{Speed} &= \\dfrac{60\\text{ feet}}{2\\text{ min}} = 30\\text{ feet/min} \\end{aligned}",
          "fallback": "Descended = 90 − 30 = 60 ft; Speed = 60 / 2 = 30 feet/min",
          "display": true
        }
      }
    ],
    "answer": "30 feet/min",
    "answerMath": {
      "latex": "30\\text{ feet/min}",
      "fallback": "30 feet/min",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-3-q6.svg",
    "figureAlt": { "en": "Lift descends from 90 ft top to 30 ft in 2 minutes as depression angle to fountain 30 root 3 ft away goes from 60 to 30 degrees.", "ta": "90 அடி கட்டிடத்தில் இறங்கும் மின்தூக்கியிலிருந்து நீரூற்றுக்கான இறக்கக்கோணப் படம்." },
    "figureCaption": { "en": "Descending glass lift in 90 ft building seeing fountain at 60 and 30 degrees for Exercise 6.3 Q6", "ta": "கண்ணாடி மின்தூக்கி — 60°, 30° இறக்கக்கோணப் படம்" },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.3 Q6. EN printed p. 261 (PDF p. 267); TA printed p. 269 (PDF p. 275); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 267,
        "ta": 275
      }
    }
  }
];

const grade = window.TRIGGLE_CLASSES[10];
const chapter = window.TRIGGLE_CURRICULUM.grades.find(({ grade }) => grade === 10)
  .chapters.find(({ number }) => number === 6);
chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];
for (const entry of entries) {
  if (grade.items.some(({ id }) => id === entry.id)) throw new Error('Duplicate Grade 10 Trigonometry question: ' + entry.id);
  grade.items.push(entry);
  if (!chapter.textbookQuestionIds.includes(entry.id)) chapter.textbookQuestionIds.push(entry.id);
}
})();
