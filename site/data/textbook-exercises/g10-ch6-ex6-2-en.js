/* 2025 revised TN SCERT Grade 10 Trigonometry, Exercise 6.2 (Q1–Q6, 7 subparts).
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-ex6-2-q1",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Angle of Elevation",
      "ta": "முக்கோணவியல் — ஏற்றக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.2 · Q1",
      "ta": "பயிற்சி 6.2 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Angle of elevation of a 10√3 m tower from 30 m away"
    },
    "q": {
      "en": "1. Find the angle of elevation of the top of a tower from a point on the ground, which is 30 m away from the foot of a tower of height 10√3 m.",
      "ta": "1. 10√3 மீ உயரமுள்ள கோபுரத்தின் அடியிலிருந்து 30 மீ தொலைவில் தரையில் உள்ள ஒரு புள்ளியிலிருந்து கோபுரத்தின் உச்சியின் ஏற்றக்கோணத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "1. Find the angle of elevation of the top of a tower from a point on the ground, which is ",
        {
          "latex": "30\\text{ m}",
          "fallback": "30 m",
          "display": false
        },
        " away from the foot of a tower of height ",
        {
          "latex": "10\\sqrt{3}\\text{ m}",
          "fallback": "10√3 m",
          "display": false
        },
        "."
      ],
      "ta": [
        "1. ",
        {
          "latex": "10\\sqrt{3}",
          "fallback": "10√3",
          "display": false
        },
        " மீ உயரமுள்ள கோபுரத்தின் அடியிலிருந்து ",
        {
          "latex": "30",
          "fallback": "30",
          "display": false
        },
        " மீ தொலைவில் தரையில் உள்ள ஒரு புள்ளியிலிருந்து கோபுரத்தின் உச்சியின் ஏற்றக்கோணத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: In the right triangle formed by the ground distance 30 m (adjacent) and vertical tower height 10√3 m (opposite), use tan θ = Opposite / Adjacent = 10√3 / 30 = 1/√3, giving θ = 30°.",
        "eq": "tan θ = (10√3) / 30 = √3 / 3",
        "math": {
          "latex": "\\tan\\theta = \\dfrac{\\text{Opposite}}{\\text{Adjacent}} = \\dfrac{10\\sqrt{3}}{30} = \\dfrac{\\sqrt{3}}{3}",
          "fallback": "tan θ = (10√3) / 30 = √3 / 3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply numerator and denominator (or cancel √3 into 3 = √3·√3) to write √3/3 as 1/√3. From standard trigonometric ratios, tan 30° = 1/√3, so the angle of elevation is 30°.",
        "eq": "tan θ = 1/√3 gives θ = 30°",
        "math": {
          "latex": "\\tan\\theta = \\dfrac{1}{\\sqrt{3}} = \\tan 30^\\circ\\quad\\text{gives}\\quad \\theta = 30^\\circ",
          "fallback": "tan θ = 1/√3 gives θ = 30°",
          "display": true
        }
      }
    ],
    "answer": "30°",
    "answerMath": {
      "latex": "30^\\circ",
      "fallback": "30°",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q1.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q1. EN printed p. 257 (PDF p. 263); TA printed p. 265 (PDF p. 271); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 271
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q2",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Angle of Elevation",
      "ta": "முக்கோணவியல் — ஏற்றக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.2 · Q2",
      "ta": "பயிற்சி 6.2 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Width of a road flanked by 4√3 m houses"
    },
    "q": {
      "en": "2. A road is flanked on either side by continuous rows of houses of height 4√3 m with no space in between them. A pedestrian is standing on the median of the road facing a row house. The angle of elevation from the pedestrian to the top of the house is 30°. Find the width of the road.",
      "ta": "2. ஒரு சாலையின் இருபுறமும் இடைவெளியே இல்லாமல் வரிசையாக வீடுகள் தொடர்ச்சியாக உள்ளன. அவற்றின் உயரம் 4√3 மீ. பாதசாரி ஒருவர் சாலையின் மையப் பகுதியில் நின்றுகொண்டு வரிசையாக உள்ள வீடுகளை நோக்குகிறார். 30° ஏற்றக்கோணத்தில் பாதசாரி வீட்டின் உச்சியை நோக்குகிறார் எனில், சாலையின் அகலத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "2. A road is flanked on either side by continuous rows of houses of height ",
        {
          "latex": "4\\sqrt{3}\\text{ m}",
          "fallback": "4√3 m",
          "display": false
        },
        " with no space in between them. A pedestrian is standing on the median of the road facing a row house. The angle of elevation from the pedestrian to the top of the house is ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Find the width of the road."
      ],
      "ta": [
        "2. ஒரு சாலையின் இருபுறமும் இடைவெளியே இல்லாமல் வரிசையாக வீடுகள் தொடர்ச்சியாக உள்ளன. அவற்றின் உயரம் ",
        {
          "latex": "4\\sqrt{3}",
          "fallback": "4√3",
          "display": false
        },
        " மீ. பாதசாரி ஒருவர் சாலையின் மையப் பகுதியில் நின்றுகொண்டு வரிசையாக உள்ள வீடுகளை நோக்குகிறார். ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " ஏற்றக்கோணத்தில் பாதசாரி வீட்டின் உச்சியை நோக்குகிறார் எனில், சாலையின் அகலத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let the half-width from the road median (centre) to one row of houses be x. Using tan 30° = 4√3 / x gives x = 12 m, so total width of the road = 2x = 24 m.",
        "eq": "tan 30° = 4√3 / x gives 1/√3 = 4√3 / x, so x = 12 m",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{4\\sqrt{3}}{x}\\quad\\text{gives}\\quad \\dfrac{1}{\\sqrt{3}} = \\dfrac{4\\sqrt{3}}{x},\\quad x = 4\\sqrt{3}\\times\\sqrt{3} = 12\\text{ m}",
          "fallback": "tan 30° = 4√3 / x gives 1/√3 = 4√3 / x, so x = 12 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because the pedestrian stands on the median (midpoint of the road) and both sides have houses, x = 12 m covers only half the road width. Doubling gives total width 2(12) = 24 m.",
        "eq": "Total road width = 2x = 2 × 12 = 24 m",
        "math": {
          "latex": "\\text{Width of road} = 2x = 2(12) = 24\\text{ m}",
          "fallback": "Total road width = 2x = 2 × 12 = 24 m",
          "display": true
        }
      }
    ],
    "answer": "24 m",
    "answerMath": {
      "latex": "24\\text{ m}",
      "fallback": "24 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q2.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q2. EN printed p. 257 (PDF p. 263); TA printed p. 265 (PDF p. 271); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 271
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q3",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Two Elevation Angles",
      "ta": "முக்கோணவியல் — இரு ஏற்றக்கோணங்கள்"
    },
    "label": {
      "en": "Exercise 6.2 · Q3",
      "ta": "பயிற்சி 6.2 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of a window from elevation angles 45° and 60°"
    },
    "q": {
      "en": "3. To a man standing outside his house, the angles of elevation of the top and bottom of a window are 60° and 45° respectively. If the height of the man is 180 cm and if he is 5 m away from the wall, what is the height of the window? (√3 = 1.732)",
      "ta": "3. ஒருவர் அவருடைய வீட்டிற்கு வெளியில் நின்றுகொண்டு ஒரு ஜன்னலின் உச்சி மற்றும் அடி ஆகியவற்றை முறையே 60° மற்றும் 45° ஆகிய ஏற்றக்கோணங்களில் காண்கிறார். அவரின் உயரம் 180 செ.மீ. மேலும் வீட்டிலிருந்து 5 மீ தொலைவில் அவர் உள்ளார் எனில், ஜன்னலின் உயரத்தைக் காண்க (√3 = 1.732)."
    },
    "questionMath": {
      "en": [
        "3. To a man standing outside his house, the angles of elevation of the top and bottom of a window are ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " respectively. If the height of the man is ",
        {
          "latex": "180\\text{ cm}",
          "fallback": "180 cm",
          "display": false
        },
        " and if he is ",
        {
          "latex": "5\\text{ m}",
          "fallback": "5 m",
          "display": false
        },
        " away from the wall, what is the height of the window? (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "3. ஒருவர் அவருடைய வீட்டிற்கு வெளியில் நின்றுகொண்டு ஒரு ஜன்னலின் உச்சி மற்றும் அடி ஆகியவற்றை முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " ஆகிய ஏற்றக்கோணங்களில் காண்கிறார். அவரின் உயரம் ",
        {
          "latex": "180",
          "fallback": "180",
          "display": false
        },
        " செ.மீ. மேலும் வீட்டிலிருந்து ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " மீ தொலைவில் அவர் உள்ளார் எனில், ஜன்னலின் உயரத்தைக் காண்க (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Measure heights above the man's eye level (180 cm = 1.8 m): bottom of window is x₁ = 5 tan 45° = 5 m above eye level, and top of window is x₂ = 5 tan 60° = 5√3 m above eye level. Subtracting gives window height 5(√3 − 1) = 3.66 m.",
        "eq": "x₁ = 5 tan 45° = 5 m; x₂ = 5 tan 60° = 5√3 m",
        "math": {
          "latex": "\\begin{aligned} x_1 &= 5\\tan 45^\\circ = 5(1) = 5\\text{ m} \\\\ x_2 &= 5\\tan 60^\\circ = 5\\sqrt{3}\\text{ m} \\end{aligned}",
          "fallback": "x₁ = 5 tan 45° = 5 m; x₂ = 5 tan 60° = 5√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Notice the man's eye height (1.8 m) adds equally to both window edges, so subtracting (x₂ + 1.8) − (x₁ + 1.8) cancels 1.8 completely. Factor 5 and substitute √3 = 1.732.",
        "eq": "Window height = 5√3 − 5 = 5(1.732 − 1) = 5(0.732) = 3.66 m",
        "math": {
          "latex": "\\begin{aligned} \\text{Height of window} &= x_2 - x_1 = 5(\\sqrt{3} - 1) \\\\ &= 5(1.732 - 1) = 5(0.732) = 3.66\\text{ m} \\end{aligned}",
          "fallback": "Window height = 5√3 − 5 = 5(1.732 − 1) = 5(0.732) = 3.66 m",
          "display": true
        }
      }
    ],
    "answer": "3.66 m",
    "answerMath": {
      "latex": "3.66\\text{ m}",
      "fallback": "3.66 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q3.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q3. EN printed p. 257 (PDF p. 263); TA printed p. 266 (PDF p. 272); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 272
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q4",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Elevation with Given Tangent",
      "ta": "முக்கோணவியல் — ஏற்றக்கோணக் கணக்கு"
    },
    "label": {
      "en": "Exercise 6.2 · Q4",
      "ta": "பயிற்சி 6.2 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of a pedestal supporting a 1.6 m statue"
    },
    "q": {
      "en": "4. A statue 1.6 m tall stands on the top of a pedestal. From a point on the ground, the angle of elevation of the top of the statue is 60° and from the same point the angle of elevation of the top of the pedestal is 40°. Find the height of the pedestal. (tan 40° = 0.8391, √3 = 1.732)",
      "ta": "4. 1.6 மீ உயரமுள்ள சிலை ஒன்று பீடத்தின் மேல் அமைந்துள்ளது. தரையிலுள்ள ஒரு புள்ளியிலிருந்து 60° ஏற்றக்கோணத்தில் சிலையின் உச்சி அமைந்துள்ளது. மேலும் அதே புள்ளியிலிருந்து பீடத்தின் உச்சியானது 40° ஏற்றக்கோணத்தில் உள்ளது எனில், பீடத்தின் உயரத்தைக் காண்க. (tan 40° = 0.8391, √3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "4. A statue ",
        {
          "latex": "1.6\\text{ m}",
          "fallback": "1.6 m",
          "display": false
        },
        " tall stands on the top of a pedestal. From a point on the ground, the angle of elevation of the top of the statue is ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and from the same point the angle of elevation of the top of the pedestal is ",
        {
          "latex": "40^\\circ",
          "fallback": "40°",
          "display": false
        },
        ". Find the height of the pedestal. (",
        {
          "latex": "\\tan 40^\\circ=0.8391,\\;\\sqrt{3}=1.732",
          "fallback": "tan 40° = 0.8391, √3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "4. ",
        {
          "latex": "1.6",
          "fallback": "1.6",
          "display": false
        },
        " மீ உயரமுள்ள சிலை ஒன்று பீடத்தின் மேல் அமைந்துள்ளது. தரையிலுள்ள ஒரு புள்ளியிலிருந்து ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " ஏற்றக்கோணத்தில் சிலையின் உச்சி அமைந்துள்ளது. மேலும் அதே புள்ளியிலிருந்து பீடத்தின் உச்சியானது ",
        {
          "latex": "40^\\circ",
          "fallback": "40°",
          "display": false
        },
        " ஏற்றக்கோணத்தில் உள்ளது எனில், பீடத்தின் உயரத்தைக் காண்க. (",
        {
          "latex": "\\tan 40^\\circ=0.8391,\\;\\sqrt{3}=1.732",
          "fallback": "tan 40° = 0.8391, √3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let pedestal height be h and horizontal distance be d. Then d = h / tan 40° and d = (h + 1.6) / tan 60°. Equating d eliminates distance and solves h ≈ 1.5 m.",
        "eq": "tan 40° = h/d and tan 60° = (h + 1.6)/d",
        "math": {
          "latex": "\\tan 40^\\circ = \\dfrac{h}{d}\\;\\text{gives}\\; d = \\dfrac{h}{0.8391},\\qquad \\tan 60^\\circ = \\dfrac{h+1.6}{d}\\;\\text{gives}\\; d = \\dfrac{h+1.6}{\\sqrt{3}}",
          "fallback": "tan 40° = h/d and tan 60° = (h + 1.6)/d",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Equate both expressions for d, cross-multiply using √3 = 1.732 and tan 40° = 0.8391, and collect h terms on the left.",
        "eq": "1.732h = 0.8391h + 1.34256 gives 0.8929h = 1.34256, so h ≈ 1.5 m",
        "math": {
          "latex": "\\begin{aligned} \\dfrac{h}{0.8391} &= \\dfrac{h + 1.6}{1.732} \\\\ 1.732h &= 0.8391h + 1.34256 \\\\ (1.732 - 0.8391)h &= 1.34256 \\\\ h &= \\dfrac{1.34256}{0.8929} \\approx 1.5\\text{ m} \\end{aligned}",
          "fallback": "1.732h = 0.8391h + 1.34256 gives 0.8929h = 1.34256, so h ≈ 1.5 m",
          "display": true
        }
      }
    ],
    "answer": "1.5 m",
    "answerMath": {
      "latex": "1.5\\text{ m}",
      "fallback": "1.5 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q4.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q4. EN printed p. 257 (PDF p. 263); TA printed p. 266 (PDF p. 272); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 272
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q5-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Hemisphere & Flag Pole",
      "ta": "முக்கோணவியல் — அரைக்கோளம் மற்றும் கொடிக்கம்பம்"
    },
    "label": {
      "en": "Exercise 6.2 · Q5(i)",
      "ta": "பயிற்சி 6.2 · வினா 5(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of flag pole standing on a hemispherical dome"
    },
    "q": {
      "en": "5. A flag pole of height ‘h’ metres is on the top of the hemispherical dome of radius ‘r’ metres. A man is standing 7 m away from the dome. Seeing the top of the pole at an angle 45° and moving 5 m away from the dome and seeing the bottom of the pole at an angle 30°. Find\n(i) the height of the pole (√3 = 1.732)",
      "ta": "5. ‘r’ மீ ஆரம் கொண்ட அரைக் கோளக் குவிமாடத்தின் மீது ‘h’ மீ உயரமுள்ள ஒரு கொடிக்கம்பம் நிற்கிறது. குவிமாடத்தின் அடியிலிருந்து 7 மீ தொலைவில் ஒருவர் நிற்கிறார். அவர் கொடிக்கம்பத்தின் உச்சியை 45° ஏற்றக் கோணத்திலும் நிற்குமிடத்திலிருந்து மேலும் 5 மீ தொலைவு விலகிச் சென்று கொடிக்கம்பத்தின் அடியை 30° ஏற்றக் கோணத்திலும் பார்க்கிறார் எனில், (i) கொடிக்கம்பத்தின் உயரம் (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "5. A flag pole of height ‘",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        "’ metres is on the top of the hemispherical dome of radius ‘",
        {
          "latex": "r",
          "fallback": "r",
          "display": false
        },
        "’ metres. A man is standing ",
        {
          "latex": "7\\text{ m}",
          "fallback": "7 m",
          "display": false
        },
        " away from the dome. Seeing the top of the pole at an angle ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " and moving ",
        {
          "latex": "5\\text{ m}",
          "fallback": "5 m",
          "display": false
        },
        " away from the dome and seeing the bottom of the pole at an angle ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Find\n(i) the height of the pole (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "5. ‘",
        {
          "latex": "r",
          "fallback": "r",
          "display": false
        },
        "’ மீ ஆரம் கொண்ட அரைக் கோளக் குவிமாடத்தின் மீது ‘",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        "’ மீ உயரமுள்ள ஒரு கொடிக்கம்பம் நிற்கிறது. குவிமாடத்தின் அடியிலிருந்து ",
        {
          "latex": "7",
          "fallback": "7",
          "display": false
        },
        " மீ தொலைவில் ஒருவர் நிற்கிறார். அவர் கொடிக்கம்பத்தின் உச்சியை ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " ஏற்றக் கோணத்திலும் நிற்குமிடத்திலிருந்து மேலும் ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " மீ தொலைவு விலகிச் சென்று கொடிக்கம்பத்தின் அடியை ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " ஏற்றக் கோணத்திலும் பார்க்கிறார் எனில், (i) கொடிக்கம்பத்தின் உயரம் (",
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
        "en": "Quick Solution Plan: Because the dome has radius r, its center is horizontally r metres inside its outer edge. At 7 m outside the dome, horizontal distance to the centre line is (r + 7) m, while total height to pole top is (r + h) m. With angle 45°, tan 45° = 1 forces r + h = r + 7, so h = 7 m.",
        "eq": "Horizontal distance from center = r + 7; vertical height to pole top = r + h",
        "math": {
          "latex": "\\tan 45^\\circ = \\dfrac{r + h}{r + 7}",
          "fallback": "Horizontal distance from center = r + 7; vertical height to pole top = r + h",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Since tan 45° = 1, cross-multiplying gives r + h = r + 7. Subtracting radius r from both sides determines h = 7 m immediately, even before solving r.",
        "eq": "1 = (r + h)/(r + 7) gives r + h = r + 7, so h = 7 m",
        "math": {
          "latex": "\\begin{aligned} 1 &= \\dfrac{r + h}{r + 7} \\\\ r + h &= r + 7 \\\\ h &= 7\\text{ m} \\end{aligned}",
          "fallback": "1 = (r + h)/(r + 7) gives r + h = r + 7, so h = 7 m",
          "display": true
        }
      }
    ],
    "answer": "7 m",
    "answerMath": {
      "latex": "7\\text{ m}",
      "fallback": "7 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q5.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q5(i). EN printed p. 257 (PDF p. 263); TA printed p. 266 (PDF p. 272); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 272
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q5-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Hemisphere & Flag Pole",
      "ta": "முக்கோணவியல் — அரைக்கோளம் மற்றும் கொடிக்கம்பம்"
    },
    "label": {
      "en": "Exercise 6.2 · Q5(ii)",
      "ta": "பயிற்சி 6.2 · வினா 5(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Radius of hemispherical dome supporting a flag pole"
    },
    "q": {
      "en": "5. A flag pole of height ‘h’ metres is on the top of the hemispherical dome of radius ‘r’ metres. A man is standing 7 m away from the dome. Seeing the top of the pole at an angle 45° and moving 5 m away from the dome and seeing the bottom of the pole at an angle 30°. Find\n(ii) radius of the dome. (√3 = 1.732)",
      "ta": "5. ‘r’ மீ ஆரம் கொண்ட அரைக் கோளக் குவிமாடத்தின் மீது ‘h’ மீ உயரமுள்ள ஒரு கொடிக்கம்பம் நிற்கிறது. குவிமாடத்தின் அடியிலிருந்து 7 மீ தொலைவில் ஒருவர் நிற்கிறார். அவர் கொடிக்கம்பத்தின் உச்சியை 45° ஏற்றக் கோணத்திலும் நிற்குமிடத்திலிருந்து மேலும் 5 மீ தொலைவு விலகிச் சென்று கொடிக்கம்பத்தின் அடியை 30° ஏற்றக் கோணத்திலும் பார்க்கிறார் எனில், (ii) அரைக் கோளக் குவிமாடத்தின் ஆரம் ஆகியவற்றைக் காண்க. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "5. A flag pole of height ‘",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        "’ metres is on the top of the hemispherical dome of radius ‘",
        {
          "latex": "r",
          "fallback": "r",
          "display": false
        },
        "’ metres. A man is standing ",
        {
          "latex": "7\\text{ m}",
          "fallback": "7 m",
          "display": false
        },
        " away from the dome. Seeing the top of the pole at an angle ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " and moving ",
        {
          "latex": "5\\text{ m}",
          "fallback": "5 m",
          "display": false
        },
        " away from the dome and seeing the bottom of the pole at an angle ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Find\n(ii) radius of the dome. (",
        {
          "latex": "\\sqrt{3}=1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "5. ‘",
        {
          "latex": "r",
          "fallback": "r",
          "display": false
        },
        "’ மீ ஆரம் கொண்ட அரைக் கோளக் குவிமாடத்தின் மீது ‘",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        "’ மீ உயரமுள்ள ஒரு கொடிக்கம்பம் நிற்கிறது. குவிமாடத்தின் அடியிலிருந்து ",
        {
          "latex": "7",
          "fallback": "7",
          "display": false
        },
        " மீ தொலைவில் ஒருவர் நிற்கிறார். அவர் கொடிக்கம்பத்தின் உச்சியை ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " ஏற்றக் கோணத்திலும் நிற்குமிடத்திலிருந்து மேலும் ",
        {
          "latex": "5",
          "fallback": "5",
          "display": false
        },
        " மீ தொலைவு விலகிச் சென்று கொடிக்கம்பத்தின் அடியை ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " ஏற்றக் கோணத்திலும் பார்க்கிறார் எனில், (ii) அரைக் கோளக் குவிமாடத்தின் ஆரம் ஆகியவற்றைக் காண்க. (",
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
        "en": "Quick Solution Plan: Moving 5 m farther away places the man 7 + 5 = 12 m from the dome's edge, so horizontal distance to the dome center is (r + 12) m. The bottom of the pole sits at height r, so tan 30° = r/(r + 12) gives r = 12/(√3 − 1) ≈ 16.39 m.",
        "eq": "Horizontal distance = r + 7 + 5 = r + 12; vertical height = r; tan 30° = r/(r + 12)",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{r}{r + 12}\\quad\\text{gives}\\quad \\dfrac{1}{\\sqrt{3}} = \\dfrac{r}{r + 12}",
          "fallback": "Horizontal distance = r + 7 + 5 = r + 12; vertical height = r; tan 30° = r/(r + 12)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Cross-multiply to get √3 r = r + 12, isolate r = 12/(√3 − 1), and rationalise by multiplying numerator and denominator by (√3 + 1).",
        "eq": "r = 12(√3 + 1)/(3 − 1) = 6(1.732 + 1) = 16.392 ≈ 16.39 m",
        "math": {
          "latex": "\\begin{aligned} (\\sqrt{3} - 1)r &= 12 \\\\ r &= \\dfrac{12}{\\sqrt{3}-1}\\times\\dfrac{\\sqrt{3}+1}{\\sqrt{3}+1} = \\dfrac{12(\\sqrt{3}+1)}{2} \\\\ &= 6(1.732 + 1) = 16.392 \\approx 16.39\\text{ m} \\end{aligned}",
          "fallback": "r = 12(√3 + 1)/(3 − 1) = 6(1.732 + 1) = 16.392 ≈ 16.39 m",
          "display": true
        }
      }
    ],
    "answer": "16.39 m",
    "answerMath": {
      "latex": "16.39\\text{ m}",
      "fallback": "16.39 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q5.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q5(ii). EN printed p. 257 (PDF p. 263); TA printed p. 266 (PDF p. 272); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 263,
        "ta": 272
      }
    }
  },
  {
    "id": "c10-6-ex6-2-q6",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.2",
    "topic": {
      "en": "Trigonometry — Complementary Elevation Angles",
      "ta": "முக்கோணவியல் — ஏற்றக்கோணக் கணக்கு"
    },
    "label": {
      "en": "Exercise 6.2 · Q6",
      "ta": "பயிற்சி 6.2 · வினா 6 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of an electric pole beside a 15 m tower"
    },
    "q": {
      "en": "6. The top of a 15 m high tower makes an angle of elevation of 60° with the bottom of an electronic pole and angle of elevation of 30° with the top of the pole. What is the height of the electric pole?",
      "ta": "6. 15 மீ உயரமுள்ள ஒரு கோபுரம் உள்ளது. ஒரு மின் கம்பத்தின் அடி மற்றும் உச்சியிலிருந்து கோபுரத்தின் உச்சியை முறையே 60°, 30° என்ற ஏற்றக்கோணங்களில் பார்த்தால் மின் கம்பத்தின் உயரத்தைக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. The top of a ",
        {
          "latex": "15\\text{ m}",
          "fallback": "15 m",
          "display": false
        },
        " high tower makes an angle of elevation of ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " with the bottom of an electronic pole and angle of elevation of ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " with the top of the pole. What is the height of the electric pole?"
      ],
      "ta": [
        "6. ",
        {
          "latex": "15",
          "fallback": "15",
          "display": false
        },
        " மீ உயரமுள்ள ஒரு கோபுரம் உள்ளது. ஒரு மின் கம்பத்தின் அடி மற்றும் உச்சியிலிருந்து கோபுரத்தின் உச்சியை முறையே ",
        {
          "latex": "60^\\circ,\\;30^\\circ",
          "fallback": "60°, 30°",
          "display": false
        },
        " என்ற ஏற்றக்கோணங்களில் பார்த்தால் மின் கம்பத்தின் உயரத்தைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Find horizontal gap d from the bottom 60° triangle: tan 60° = 15/d gives d = 5√3 m. Then use the upper 30° triangle above pole height h: (15 − h)/d = tan 30° = 1/√3, yielding 15 − h = 5 and h = 10 m.",
        "eq": "d = 15 / tan 60° = 15/√3 = 5√3 m",
        "math": {
          "latex": "\\tan 60^\\circ = \\dfrac{15}{d}\\quad\\text{gives}\\quad d = \\dfrac{15}{\\sqrt{3}} = 5\\sqrt{3}\\text{ m}",
          "fallback": "d = 15 / tan 60° = 15/√3 = 5√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Draw a horizontal line from the top of the electric pole (height h) across to the 15 m tower. The remaining vertical height above the pole is (15 − h), forming a right triangle with angle 30° and base d = 5√3 m.",
        "eq": "(15 − h)/(5√3) = 1/√3 gives 15 − h = 5, so h = 10 m",
        "math": {
          "latex": "\\begin{aligned} \\tan 30^\\circ &= \\dfrac{15 - h}{d} \\\\ \\dfrac{1}{\\sqrt{3}} &= \\dfrac{15 - h}{5\\sqrt{3}} \\\\ 15 - h &= 5\\quad\\text{gives}\\quad h = 10\\text{ m} \\end{aligned}",
          "fallback": "(15 − h)/(5√3) = 1/√3 gives 15 − h = 5, so h = 10 m",
          "display": true
        }
      }
    ],
    "answer": "10 m",
    "answerMath": {
      "latex": "10\\text{ m}",
      "fallback": "10 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-2-q6.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.2 Q6. EN printed p. 258 (PDF p. 264); TA printed p. 266 (PDF p. 272); Answer Appendix EN PDF p. 347 / TA PDF pp. 361–362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 264,
        "ta": 272
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
