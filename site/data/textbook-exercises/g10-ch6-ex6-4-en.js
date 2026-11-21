/* 2025 revised TN SCERT Grade 10 Trigonometry, Exercise 6.4 (Q1–Q6, 9 subparts).
 * Solutions are English-first; Tamil lesson translation review remains pending.
 */
(() => {
'use strict';
const entries = [
  {
    "id": "c10-6-ex6-4-q1",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q1",
      "ta": "பயிற்சி 6.4 · வினா 1 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of second tree from top of a 13 m tree"
    },
    "q": {
      "en": "1. From the top of a tree of height 13 m the angle of elevation and depression of the top and bottom of another tree are 45° and 30° respectively. Find the height of the second tree. (√3 = 1.732)",
      "ta": "1. 13 மீ உயரமுள்ள ஒரு மரத்தின் உச்சியிலிருந்து மற்றொரு மரத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே 45° மற்றும் 30° எனில், இரண்டாவது மரத்தின் உயரத்தைக் காண்க. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "1. From the top of a tree of height ",
        {
          "latex": "13\\text{ m}",
          "fallback": "13 m",
          "display": false
        },
        " the angle of elevation and depression of the top and bottom of another tree are ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " and ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " respectively. Find the height of the second tree. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "1. ",
        {
          "latex": "13",
          "fallback": "13",
          "display": false
        },
        " மீ உயரமுள்ள ஒரு மரத்தின் உச்சியிலிருந்து மற்றொரு மரத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே ",
        {
          "latex": "45^\\circ",
          "fallback": "45°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில், இரண்டாவது மரத்தின் உயரத்தைக் காண்க. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First use the 30° angle of depression from the 13 m tree top to find the horizontal distance x between the two trees. Then use the 45° angle of elevation to find the extra height h above 13 m, and add 13 + h.",
        "eq": "tan 30° = 13 / x and tan 45° = h / x",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{13}{x} \\quad\\text{and}\\quad \\tan 45^\\circ = \\dfrac{h}{x}",
          "fallback": "tan 30° = 13 / x and tan 45° = h / x",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — In the lower right triangle, the vertical drop to the foot of the second tree equals the height of the first tree, 13 m, and the angle at the base equals the alternate interior angle 30°. Using tan 30° = 1/√3 gives the horizontal gap x = 13√3 m.",
        "eq": "1/√3 = 13 / x gives x = 13√3 m",
        "math": {
          "latex": "\\dfrac{1}{\\sqrt{3}} = \\dfrac{13}{x} \\quad\\text{gives}\\quad x = 13\\sqrt{3}\\text{ m}",
          "fallback": "1/√3 = 13 / x gives x = 13√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Now look at the upper right triangle above the horizontal eye level. With angle of elevation 45° and horizontal side x = 13√3 m, tan 45° = 1 gives the extra height h = 13√3 m. Add the lower 13 m section and substitute √3 = 1.732 to get 35.52 m.",
        "eq": "Height = 13 + 13√3 = 13(2.732) ≈ 35.52 m",
        "math": {
          "latex": "\\begin{aligned} h &= x\\tan 45^\\circ = 13\\sqrt{3}\\text{ m} \\\\[4pt] \\text{Height} &= 13 + 13\\sqrt{3} = 13(1 + 1.732) = 13(2.732) = 35.516 \\approx 35.52\\text{ m} \\end{aligned}",
          "fallback": "Height = 13 + 13√3 = 13(2.732) ≈ 35.52 m",
          "display": true
        }
      }
    ],
    "answer": "35.52 m",
    "answerMath": {
      "latex": "35.52\\text{ m}",
      "fallback": "35.52 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q1.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q1. EN printed p. 264 (PDF p. 270); TA printed p. 272 (PDF p. 278); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 270,
        "ta": 278
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q2",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2",
      "ta": "பயிற்சி 6.4 · வினா 2 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance of hill from ship deck and height of hill"
    },
    "q": {
      "en": "2. A man is standing on the deck of a ship, which is 40 m above water level. He observes the angle of elevation of the top of a hill as 60° and the angle of depression of the base of the hill as 30°. Calculate the distance of the hill from the ship and the height of the hill. (√3 = 1.732)",
      "ta": "2. கடலின் நீர் மட்டத்திலிருந்து 40 மீட்டருக்கு மேலே உள்ள ஒரு கப்பலின் மேல் பகுதியில் நின்று கொண்டிருக்கிற ஒருவர், குன்றின் உச்சியை 60° ஏற்றக்கோணத்திலும் அடிப்பகுதியை 30° இறக்கக்கோணத்திலும் காண்கிறார் எனில், கப்பலிலிருந்து குன்றுக்கு உள்ள தொலைவையும், குன்றின் உயரத்தையும் காண்க. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "2. A man is standing on the deck of a ship, which is ",
        {
          "latex": "40\\text{ m}",
          "fallback": "40 m",
          "display": false
        },
        " above water level. He observes the angle of elevation of the top of a hill as ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and the angle of depression of the base of the hill as ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Calculate the distance of the hill from the ship and the height of the hill. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "2. கடலின் நீர் மட்டத்திலிருந்து ",
        {
          "latex": "40",
          "fallback": "40",
          "display": false
        },
        " மீட்டருக்கு மேலே உள்ள ஒரு கப்பலின் மேல் பகுதியில் நின்று கொண்டிருக்கிற ஒருவர், குன்றின் உச்சியை ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " ஏற்றக்கோணத்திலும் அடிப்பகுதியை ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " இறக்கக்கோணத்திலும் காண்கிறார் எனில், கப்பலிலிருந்து குன்றுக்கு உள்ள தொலைவையும், குன்றின் உயரத்தையும் காண்க. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: From the 40 m ship deck, use the 30° angle of depression to find horizontal distance d = 40√3 ≈ 69.28 m. Then multiply d by tan 60° = √3 to get the rise 120 m above the deck and add 40 m for total hill height 160 m.",
        "eq": "tan 30° = 40 / d, tan 60° = h / d",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{40}{d},\\qquad \\tan 60^\\circ = \\dfrac{h}{d}",
          "fallback": "tan 30° = 40 / d, tan 60° = h / d",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Using tan 30° = 1/√3 on the lower triangle between deck height 40 m and water level, solve for the distance d between ship and hill and substitute √3 = 1.732.",
        "eq": "d = 40√3 = 69.28 m",
        "math": {
          "latex": "d = \\dfrac{40}{\\tan 30^\\circ} = 40\\sqrt{3} = 40(1.732) = 69.28\\text{ m}",
          "fallback": "d = 40√3 = 69.28 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — For the upper triangle rising at 60° above deck level, tan 60° = √3 gives h = 40√3 · √3 = 120 m. Adding the deck height of 40 m gives total hill height 160 m.",
        "eq": "Hill height = 40 + 120 = 160 m",
        "math": {
          "latex": "\\begin{aligned} h &= d\\tan 60^\\circ = (40\\sqrt{3})(\\sqrt{3}) = 40 \\times 3 = 120\\text{ m} \\\\[4pt] \\text{Hill height} &= 40 + 120 = 160\\text{ m} \\end{aligned}",
          "fallback": "Hill height = 40 + 120 = 160 m",
          "display": true
        }
      }
    ],
    "answer": "69.28 m, 160 m",
    "answerMath": {
      "latex": "69.28\\text{ m},\\; 160\\text{ m}",
      "fallback": "69.28 m, 160 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q2.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q2. EN printed p. 265 (PDF p. 271); TA printed p. 272 (PDF p. 278); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 278
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q3",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — General Proof (Elevation & Depression)",
      "ta": "முக்கோணவியல் — நிரூபணம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q3",
      "ta": "பயிற்சி 6.4 · வினா 3 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of cloud above lake from elevation θ₁ and reflection depression θ₂"
    },
    "q": {
      "en": "3. If the angle of elevation of a cloud from a point ‘h’ metres above a lake is θ1 and the angle of depression of its reflection in the lake is θ2. Prove that the height that the cloud is located from the ground is h(tan θ1 + tan θ2) / (tan θ2 − tan θ1).",
      "ta": "3. ஏரியின் நீர் மட்டத்திலிருந்து h மீ உயரத்திலுள்ள ஒரு புள்ளியிலிருந்து ஒரு மேகத்தின் ஏற்றக்கோணம் θ1 மற்றும் ஏரி நீரில் விழும் மேகப் பிம்பத்தின் இறக்கக்கோணம் θ2 எனில், தரையிலிருந்து மேகத்தின் உயரம் h(tan θ1 + tan θ2)/(tan θ2 − tan θ1) என நிரூபிக்கவும்"
    },
    "questionMath": {
      "en": [
        "3. If the angle of elevation of a cloud from a point ‘",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        "’ metres above a lake is ",
        {
          "latex": "\\theta_1",
          "fallback": "θ1",
          "display": false
        },
        " and the angle of depression of its reflection in the lake is ",
        {
          "latex": "\\theta_2",
          "fallback": "θ2",
          "display": false
        },
        ". Prove that the height that the cloud is located from the ground is ",
        {
          "latex": "\\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1}",
          "fallback": "h(tan θ1 + tan θ2) / (tan θ2 − tan θ1)",
          "display": false
        },
        "."
      ],
      "ta": [
        "3. ஏரியின் நீர் மட்டத்திலிருந்து ",
        {
          "latex": "h",
          "fallback": "h",
          "display": false
        },
        " மீ உயரத்திலுள்ள ஒரு புள்ளியிலிருந்து ஒரு மேகத்தின் ஏற்றக்கோணம் ",
        {
          "latex": "\\theta_1",
          "fallback": "θ1",
          "display": false
        },
        " மற்றும் ஏரி நீரில் விழும் மேகப் பிம்பத்தின் இறக்கக்கோணம் ",
        {
          "latex": "\\theta_2",
          "fallback": "θ2",
          "display": false
        },
        " எனில், தரையிலிருந்து மேகத்தின் உயரம் ",
        {
          "latex": "\\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1}",
          "fallback": "h(tan θ1 + tan θ2)/(tan θ2 − tan θ1)",
          "display": false
        },
        " என நிரூபிக்கவும்"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Let the cloud sit x metres above the observer’s horizontal level (so H = h + x above the lake). Its reflection lies H = h + x below the lake, which is 2h + x below eye level. Equate horizontal distance d from tan θ₁ = x/d and tan θ₂ = (2h + x)/d.",
        "eq": "d = x / tan θ1 = (2h + x) / tan θ2",
        "math": {
          "latex": "d = \\dfrac{x}{\\tan\\theta_1} = \\dfrac{2h + x}{\\tan\\theta_2}",
          "fallback": "d = x / tan θ1 = (2h + x) / tan θ2",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Because a calm lake acts like a flat mirror, image depth below the water equals object height above the water (h + x). Adding the observer’s height h above the lake gives vertical drop h + (h + x) = 2h + x. Cross-multiply the equal expressions for d to isolate x.",
        "eq": "x = 2h tan θ1 / (tan θ2 − tan θ1)",
        "math": {
          "latex": "\\begin{aligned} x\\tan\\theta_2 &= (2h + x)\\tan\\theta_1 \\\\[4pt] x(\\tan\\theta_2 - \\tan\\theta_1) &= 2h\\tan\\theta_1 \\\\[4pt] x &= \\dfrac{2h\\tan\\theta_1}{\\tan\\theta_2 - \\tan\\theta_1} \\end{aligned}",
          "fallback": "x = 2h tan θ1 / (tan θ2 − tan θ1)",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Finally add the observer height h to x using the common denominator (tan θ₂ − tan θ₁). The −h tan θ₁ and +2h tan θ₁ terms combine into +h tan θ₁, completing the proof.",
        "eq": "Height = h(tan θ1 + tan θ2) / (tan θ2 − tan θ1)",
        "math": {
          "latex": "\\begin{aligned} h + x &= h + \\dfrac{2h\\tan\\theta_1}{\\tan\\theta_2 - \\tan\\theta_1} \\\\[4pt] &= \\dfrac{h\\tan\\theta_2 - h\\tan\\theta_1 + 2h\\tan\\theta_1}{\\tan\\theta_2 - \\tan\\theta_1} = \\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1} \\end{aligned}",
          "fallback": "Height = h(tan θ1 + tan θ2) / (tan θ2 − tan θ1)",
          "display": true
        }
      }
    ],
    "answer": "h(tan θ1 + tan θ2) / (tan θ2 − tan θ1)",
    "answerMath": {
      "latex": "\\dfrac{h(\\tan\\theta_1 + \\tan\\theta_2)}{\\tan\\theta_2 - \\tan\\theta_1}",
      "fallback": "h(tan θ1 + tan θ2) / (tan θ2 − tan θ1)",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q3.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q3. EN printed p. 265 (PDF p. 271); TA printed p. 272 (PDF p. 278); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 278
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q4",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q4",
      "ta": "பயிற்சி 6.4 · வினா 4 · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of cell phone tower and compliance with 120 m norm"
    },
    "q": {
      "en": "4. The angle of elevation of the top of a cell phone tower from the foot of a high apartment is 60° and the angle of depression of the foot of the tower from the top of the apartment is 30°. If the height of the apartment is 50 m, find the height of the cell phone tower. According to radiations control norms, the minimum height of a cell phone tower should be 120 m. State if the height of the above mentioned cell phone tower meets the radiation norms.",
      "ta": "4. உயரமான அடுக்குமாடிக் குடியிருப்பின் அடியிலிருந்து அலைபேசி கோபுர உச்சியின் ஏற்றக்கோணம் 60° மற்றும் குடியிருப்பின் உச்சியிலிருந்து கோபுர அடியின் இறக்கக்கோணம் 30° ஆகும். அடுக்குமாடி குடியிருப்பின் உயரம் 50 மீ எனில் அலைபேசிக் கோபுரத்தின் உயரத்தைக் காண்க. கதிர்வீச்சுக் கட்டுப்பாடு விதியின்படி அலைபேசிக் கோபுரத்தின் குறைந்தபட்ச உயரம் 120 மீ இருக்க வேண்டும். மேற்கண்ட அலைக்கோபுரம் இந்தக் கட்டுப்பாட்டிற்கு உட்படுகிறதா?"
    },
    "questionMath": {
      "en": [
        "4. The angle of elevation of the top of a cell phone tower from the foot of a high apartment is ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " and the angle of depression of the foot of the tower from the top of the apartment is ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". If the height of the apartment is ",
        {
          "latex": "50\\text{ m}",
          "fallback": "50 m",
          "display": false
        },
        ", find the height of the cell phone tower. According to radiations control norms, the minimum height of a cell phone tower should be ",
        {
          "latex": "120\\text{ m}",
          "fallback": "120 m",
          "display": false
        },
        ". State if the height of the above mentioned cell phone tower meets the radiation norms."
      ],
      "ta": [
        "4. உயரமான அடுக்குமாடிக் குடியிருப்பின் அடியிலிருந்து அலைபேசி கோபுர உச்சியின் ஏற்றக்கோணம் ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        " மற்றும் குடியிருப்பின் உச்சியிலிருந்து கோபுர அடியின் இறக்கக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " ஆகும். அடுக்குமாடி குடியிருப்பின் உயரம் ",
        {
          "latex": "50",
          "fallback": "50",
          "display": false
        },
        " மீ எனில் அலைபேசிக் கோபுரத்தின் உயரத்தைக் காண்க. கதிர்வீச்சுக் கட்டுப்பாடு விதியின்படி அலைபேசிக் கோபுரத்தின் குறைந்தபட்ச உயரம் ",
        {
          "latex": "120",
          "fallback": "120",
          "display": false
        },
        " மீ இருக்க வேண்டும். மேற்கண்ட அலைக்கோபுரம் இந்தக் கட்டுப்பாட்டிற்கு உட்படுகிறதா?"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Use the 30° depression from the 50 m apartment top to get ground distance d = 50√3 m. Then use the 60° elevation from the apartment foot to find tower height H = d tan 60° = 150 m, which exceeds the 120 m minimum norm (yes).",
        "eq": "tan 30° = 50 / d, tan 60° = H / d",
        "math": {
          "latex": "\\tan 30^\\circ = \\dfrac{50}{d},\\qquad \\tan 60^\\circ = \\dfrac{H}{d}",
          "fallback": "tan 30° = 50 / d, tan 60° = H / d",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — By alternate interior angles, looking down 30° from the apartment roof makes a 30° angle at the tower base with the ground. Thus d = 50 / tan 30° = 50√3 m.",
        "eq": "d = 50√3 m",
        "math": {
          "latex": "d = \\dfrac{50}{1/\\sqrt{3}} = 50\\sqrt{3}\\text{ m}",
          "fallback": "d = 50√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Now in the right triangle from the apartment foot to the top of the tower, H = d tan 60° = 50√3 · √3 = 150 m. Comparing 150 m ≥ 120 m confirms the tower meets the radiation control norm.",
        "eq": "H = 150 m > 120 m (yes)",
        "math": {
          "latex": "H = 50\\sqrt{3}\\cdot\\sqrt{3} = 50 \\times 3 = 150\\text{ m} > 120\\text{ m} \\;(\\text{Yes})",
          "fallback": "H = 150 m > 120 m (yes)",
          "display": true
        }
      }
    ],
    "answer": "150 m, yes",
    "answerMath": {
      "latex": "150\\text{ m},\\; \\text{yes}",
      "fallback": "150 m, yes",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q4.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q4. EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q5-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q5(i)",
      "ta": "பயிற்சி 6.4 · வினா 5(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height of lamp post observed from 66 m apartment"
    },
    "q": {
      "en": "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a 66 m high apartment are 60° and 30° respectively. Find\n(i) The height of the lamp post.",
      "ta": "5. 66 மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே 60°, 30° எனில் பின்வருவனவற்றைக் காண்க.\n(i) விளக்குக் கம்பத்தின் உயரம்."
    },
    "questionMath": {
      "en": [
        "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a ",
        {
          "latex": "66\\text{ m}",
          "fallback": "66 m",
          "display": false
        },
        " high apartment are ",
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
        " respectively. Find\n(i) The height of the lamp post."
      ],
      "ta": [
        "5. ",
        {
          "latex": "66",
          "fallback": "66",
          "display": false
        },
        " மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ", ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில் பின்வருவனவற்றைக் காண்க.\n(i) விளக்குக் கம்பத்தின் உயரம்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: First use the 30° depression from the 66 m roof to find horizontal distance d = 66√3 m. Next find the vertical rise above eye level h = d tan 60° = 198 m, and add 66 m to get the lamp post height 264 m.",
        "eq": "d = 66 / tan 30° = 66√3 m",
        "math": {
          "latex": "d = \\dfrac{66}{\\tan 30^\\circ} = 66\\sqrt{3}\\text{ m}",
          "fallback": "d = 66 / tan 30° = 66√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — In the upper right triangle, tan 60° = √3 multiplies d = 66√3 m to give h = 66 × 3 = 198 m above the apartment roof. Adding the 66 m apartment height gives the full lamp post height.",
        "eq": "Lamp post height = 66 + 198 = 264 m",
        "math": {
          "latex": "\\begin{aligned} h &= (66\\sqrt{3})\\tan 60^\\circ = 66 \\times 3 = 198\\text{ m} \\\\[4pt] \\text{Lamp post height} &= 66 + 198 = 264\\text{ m} \\end{aligned}",
          "fallback": "Lamp post height = 66 + 198 = 264 m",
          "display": true
        }
      }
    ],
    "answer": "264 m",
    "answerMath": {
      "latex": "264\\text{ m}",
      "fallback": "264 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q5.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q5(i). EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q5-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q5(ii)",
      "ta": "பயிற்சி 6.4 · வினா 5(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Height difference between lamp post and apartment"
    },
    "q": {
      "en": "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a 66 m high apartment are 60° and 30° respectively. Find\n(ii) The difference between height of the lamp post and the apartment.",
      "ta": "5. 66 மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே 60°, 30° எனில் பின்வருவனவற்றைக் காண்க.\n(ii) விளக்குக் கம்ப உயரத்திற்கும் அடுக்குமாடியின் உயரத்திற்கும் இடையேயுள்ள வித்தியாசம்."
    },
    "questionMath": {
      "en": [
        "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a ",
        {
          "latex": "66\\text{ m}",
          "fallback": "66 m",
          "display": false
        },
        " high apartment are ",
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
        " respectively. Find\n(ii) The difference between height of the lamp post and the apartment."
      ],
      "ta": [
        "5. ",
        {
          "latex": "66",
          "fallback": "66",
          "display": false
        },
        " மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ", ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில் பின்வருவனவற்றைக் காண்க.\n(ii) விளக்குக் கம்ப உயரத்திற்கும் அடுக்குமாடியின் உயரத்திற்கும் இடையேயுள்ள வித்தியாசம்."
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: The difference between the two heights is simply the portion of the lamp post extending above the 66 m apartment roof, which we computed in Q5(i) as 264 − 66 = 198 m.",
        "eq": "h = (66√3)(√3) = 198 m",
        "math": {
          "latex": "h = d\\tan 60^\\circ = (66\\sqrt{3})(\\sqrt{3}) = 198\\text{ m}",
          "fallback": "h = (66√3)(√3) = 198 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — You can also verify directly by subtracting the apartment height from the lamp post height: 264 m − 66 m = 198 m.",
        "eq": "264 − 66 = 198 m",
        "math": {
          "latex": "264 - 66 = 198\\text{ m}",
          "fallback": "264 − 66 = 198 m",
          "display": true
        }
      }
    ],
    "answer": "198 m",
    "answerMath": {
      "latex": "198\\text{ m}",
      "fallback": "198 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q5.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q5(ii). EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q5-iii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Elevation and Depression",
      "ta": "முக்கோணவியல் — ஏற்றம் மற்றும் இறக்கம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q5(iii)",
      "ta": "பயிற்சி 6.4 · வினா 5(iii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Distance between lamp post and apartment"
    },
    "q": {
      "en": "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a 66 m high apartment are 60° and 30° respectively. Find\n(iii) The distance between the lamp post and the apartment. (√3 = 1.732)",
      "ta": "5. 66 மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே 60°, 30° எனில் பின்வருவனவற்றைக் காண்க.\n(iii) விளக்குக் கம்பத்திற்கும் அடுக்குமாடிக்கும் இடையே உள்ள தொலைவு. (√3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "5. The angles of elevation and depression of the top and bottom of a lamp post from the top of a ",
        {
          "latex": "66\\text{ m}",
          "fallback": "66 m",
          "display": false
        },
        " high apartment are ",
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
        " respectively. Find\n(iii) The distance between the lamp post and the apartment. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "5. ",
        {
          "latex": "66",
          "fallback": "66",
          "display": false
        },
        " மீ உயரமான அடுக்குமாடிக் குடியிருப்பின் உச்சியிலிருந்து ஒரு விளக்குக் கம்பத்தின் உச்சி மற்றும் அடியின் ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம் முறையே ",
        {
          "latex": "60^\\circ",
          "fallback": "60°",
          "display": false
        },
        ", ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில் பின்வருவனவற்றைக் காண்க.\n(iii) விளக்குக் கம்பத்திற்கும் அடுக்குமாடிக்கும் இடையே உள்ள தொலைவு. (",
        {
          "latex": "\\sqrt{3} = 1.732",
          "fallback": "√3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: From the lower triangle with vertical height 66 m and 30° angle of depression, horizontal distance d = 66 / tan 30° = 66√3 m.",
        "eq": "d = 66 / tan 30° = 66√3 m",
        "math": {
          "latex": "d = \\dfrac{66}{\\tan 30^\\circ} = 66\\sqrt{3}\\text{ m}",
          "fallback": "d = 66 / tan 30° = 66√3 m",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Substitute the given decimal √3 = 1.732 and round 114.312 m to two decimal places: 114.31 m.",
        "eq": "d = 66 × 1.732 = 114.312 ≈ 114.31 m",
        "math": {
          "latex": "d = 66 \\times 1.732 = 114.312 \\approx 114.31\\text{ m}",
          "fallback": "d = 66 × 1.732 = 114.312 ≈ 114.31 m",
          "display": true
        }
      }
    ],
    "answer": "114.31 m",
    "answerMath": {
      "latex": "114.31\\text{ m}",
      "fallback": "114.31 m",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q5.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q5(iii). EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q6-i",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Angle of Depression",
      "ta": "முக்கோணவியல் — இறக்கக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q6(i)",
      "ta": "பயிற்சி 6.4 · வினா 6(i) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Vertical height between villagers A and B"
    },
    "q": {
      "en": "6. Three villagers A, B and C can see each other using telescope across a valley. The horizontal distance between A and B is 8 km and the horizontal distance between B and C is 12 km. The angle of depression of B from A is 20° and the angle of elevation of C from B is 30°. Calculate : (i) the vertical height between A and B. (tan 20° = 0.3640, √3 = 1.732)",
      "ta": "6. A, B மற்றும் C என்ற மூன்று கிராமவாசிகள் ஒரு பள்ளத்தாக்கில் ஒருவருக்கொருவர் தொலைநோக்கியில் பார்க்குமாறு உள்ளனர். A-க்கும், B-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு 8 கி.மீ மற்றும் B-க்கும், C-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு 12 கி.மீ. A-லிருந்து B-க்கு உள்ள இறக்கக்கோணம் 20° மற்றும் B-லிருந்து C-க்கு உள்ள ஏற்றக்கோணம் 30° எனில் பின்வருவனவற்றைக் கணக்கிடுக. (i) A-க்கும் B-க்கும் இடையேயுள்ள செங்குத்து உயரம். (tan 20° = 0.3640, √3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "6. Three villagers ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ", ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " and ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " can see each other using telescope across a valley. The horizontal distance between ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " and ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " is ",
        {
          "latex": "8\\text{ km}",
          "fallback": "8 km",
          "display": false
        },
        " and the horizontal distance between ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " and ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " is ",
        {
          "latex": "12\\text{ km}",
          "fallback": "12 km",
          "display": false
        },
        ". The angle of depression of ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " is ",
        {
          "latex": "20^\\circ",
          "fallback": "20°",
          "display": false
        },
        " and the angle of elevation of ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " from ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " is ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Calculate : (i) the vertical height between ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " and ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        ". (",
        {
          "latex": "\\tan 20^\\circ = 0.3640,\\; \\sqrt{3} = 1.732",
          "fallback": "tan 20° = 0.3640, √3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "6. ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ", ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற மூன்று கிராமவாசிகள் ஒரு பள்ளத்தாக்கில் ஒருவருக்கொருவர் தொலைநோக்கியில் பார்க்குமாறு உள்ளனர். ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "-க்கும், ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு ",
        {
          "latex": "8",
          "fallback": "8",
          "display": false
        },
        " கி.மீ மற்றும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும், ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு ",
        {
          "latex": "12",
          "fallback": "12",
          "display": false
        },
        " கி.மீ. ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "-லிருந்து ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கு உள்ள இறக்கக்கோணம் ",
        {
          "latex": "20^\\circ",
          "fallback": "20°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-லிருந்து ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-க்கு உள்ள ஏற்றக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில் பின்வருவனவற்றைக் கணக்கிடுக. (i) ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "-க்கும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும் இடையேயுள்ள செங்குத்து உயரம். (",
        {
          "latex": "\\tan 20^\\circ = 0.3640,\\; \\sqrt{3} = 1.732",
          "fallback": "tan 20° = 0.3640, √3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: The horizontal leg between A and B is 8 km and the angle of depression at A is 20°. Use tan 20° = Opposite / Adjacent = h₁ / 8.",
        "eq": "tan 20° = h1 / 8",
        "math": {
          "latex": "\\tan 20^\\circ = \\dfrac{h_1}{8}",
          "fallback": "tan 20° = h1 / 8",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Multiply 8 km by the given tan 20° = 0.3640 and round 2.912 km to two decimal places: 2.91 km.",
        "eq": "h1 = 8 × 0.3640 = 2.912 ≈ 2.91 km",
        "math": {
          "latex": "h_1 = 8 \\times 0.3640 = 2.912 \\approx 2.91\\text{ km}",
          "fallback": "h1 = 8 × 0.3640 = 2.912 ≈ 2.91 km",
          "display": true
        }
      }
    ],
    "answer": "2.91 km",
    "answerMath": {
      "latex": "2.91\\text{ km}",
      "fallback": "2.91 km",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q6.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q6(i). EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  },
  {
    "id": "c10-6-ex6-4-q6-ii",
    "classNum": 10,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry — Angle of Elevation",
      "ta": "முக்கோணவியல் — ஏற்றக்கோணம்"
    },
    "label": {
      "en": "Exercise 6.4 · Q6(ii)",
      "ta": "பயிற்சி 6.4 · வினா 6(ii) · ஆங்கிலத் தீர்வு"
    },
    "title": {
      "en": "Vertical height between villagers B and C"
    },
    "q": {
      "en": "6. Three villagers A, B and C can see each other using telescope across a valley. The horizontal distance between A and B is 8 km and the horizontal distance between B and C is 12 km. The angle of depression of B from A is 20° and the angle of elevation of C from B is 30°. Calculate : (ii) the vertical height between B and C. (tan 20° = 0.3640, √3 = 1.732)",
      "ta": "6. A, B மற்றும் C என்ற மூன்று கிராமவாசிகள் ஒரு பள்ளத்தாக்கில் ஒருவருக்கொருவர் தொலைநோக்கியில் பார்க்குமாறு உள்ளனர். A-க்கும், B-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு 8 கி.மீ மற்றும் B-க்கும், C-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு 12 கி.மீ. A-லிருந்து B-க்கு உள்ள இறக்கக்கோணம் 20° மற்றும் B-லிருந்து C-க்கு உள்ள ஏற்றக்கோணம் 30° எனில் பின்வருவனவற்றைக் கணக்கிடுக. (ii) B-க்கும் C-க்கும் இடையேயுள்ள செங்குத்து உயரம். (tan 20° = 0.3640, √3 = 1.732)"
    },
    "questionMath": {
      "en": [
        "6. Three villagers ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ", ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " and ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " can see each other using telescope across a valley. The horizontal distance between ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " and ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " is ",
        {
          "latex": "8\\text{ km}",
          "fallback": "8 km",
          "display": false
        },
        " and the horizontal distance between ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " and ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " is ",
        {
          "latex": "12\\text{ km}",
          "fallback": "12 km",
          "display": false
        },
        ". The angle of depression of ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " from ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        " is ",
        {
          "latex": "20^\\circ",
          "fallback": "20°",
          "display": false
        },
        " and the angle of elevation of ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " from ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " is ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        ". Calculate : (ii) the vertical height between ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " and ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        ". (",
        {
          "latex": "\\tan 20^\\circ = 0.3640,\\; \\sqrt{3} = 1.732",
          "fallback": "tan 20° = 0.3640, √3 = 1.732",
          "display": false
        },
        ")"
      ],
      "ta": [
        "6. ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        ", ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        " என்ற மூன்று கிராமவாசிகள் ஒரு பள்ளத்தாக்கில் ஒருவருக்கொருவர் தொலைநோக்கியில் பார்க்குமாறு உள்ளனர். ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "-க்கும், ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு ",
        {
          "latex": "8",
          "fallback": "8",
          "display": false
        },
        " கி.மீ மற்றும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும், ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-க்கும் இடைப்பட்ட கிடைமட்டத் தொலைவு ",
        {
          "latex": "12",
          "fallback": "12",
          "display": false
        },
        " கி.மீ. ",
        {
          "latex": "A",
          "fallback": "A",
          "display": false
        },
        "-லிருந்து ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கு உள்ள இறக்கக்கோணம் ",
        {
          "latex": "20^\\circ",
          "fallback": "20°",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-லிருந்து ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-க்கு உள்ள ஏற்றக்கோணம் ",
        {
          "latex": "30^\\circ",
          "fallback": "30°",
          "display": false
        },
        " எனில் பின்வருவனவற்றைக் கணக்கிடுக. (ii) ",
        {
          "latex": "B",
          "fallback": "B",
          "display": false
        },
        "-க்கும் ",
        {
          "latex": "C",
          "fallback": "C",
          "display": false
        },
        "-க்கும் இடையேயுள்ள செங்குத்து உயரம். (",
        {
          "latex": "\\tan 20^\\circ = 0.3640,\\; \\sqrt{3} = 1.732",
          "fallback": "tan 20° = 0.3640, √3 = 1.732",
          "display": false
        },
        ")"
      ]
    },
    "steps": [
      {
        "en": "Quick Solution Plan: Between B and C the horizontal leg is 12 km and angle of elevation is 30°. Compute h₂ = 12 tan 30° = 12/√3 = 4√3 ≈ 6.93 km.",
        "eq": "h2 = 12 tan 30° = 12 / √3",
        "math": {
          "latex": "h_2 = 12\\tan 30^\\circ = \\dfrac{12}{\\sqrt{3}}",
          "fallback": "h2 = 12 tan 30° = 12 / √3",
          "display": true
        }
      },
      {
        "en": "Understand Deeply — Rationalise 12/√3 by writing 12 = 4 × 3 = 4(√3)(√3), so one √3 cancels cleanly leaving 4√3. Substitute √3 = 1.732 to get 6.928 ≈ 6.93 km.",
        "eq": "h2 = 4√3 = 6.928 ≈ 6.93 km",
        "math": {
          "latex": "h_2 = \\dfrac{12\\sqrt{3}}{3} = 4\\sqrt{3} = 4(1.732) = 6.928 \\approx 6.93\\text{ km}",
          "fallback": "h2 = 4√3 = 6.928 ≈ 6.93 km",
          "display": true
        }
      }
    ],
    "answer": "6.93 km",
    "answerMath": {
      "latex": "6.93\\text{ km}",
      "fallback": "6.93 km",
      "display": true
    },
    "figureSrc": "assets/grade10-ch6/ex6-4-q6.svg",
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, Exercise 6.4 Q6(ii). EN printed p. 265 (PDF p. 271); TA printed p. 273 (PDF p. 279); Answer Appendix EN PDF p. 347 / TA PDF p. 362.",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 271,
        "ta": 279
      }
    }
  }
];
if (typeof window !== 'undefined' && window.TRIGGLE_CLASSES?.[10]?.items) {
  window.TRIGGLE_CLASSES[10].items.push(...entries);
}
if (typeof window !== 'undefined' && window.TRIGGLE_CURRICULUM?.grades) {
  const g = window.TRIGGLE_CURRICULUM.grades.find(x => x.grade === 10);
  const c = g?.chapters.find(ch => Number(ch.number) === 6);
  if (c) {
    c.textbookQuestionIds = c.textbookQuestionIds || [];
    for (const e of entries) {
      if (!c.textbookQuestionIds.includes(e.id)) c.textbookQuestionIds.push(e.id);
    }
  }
}
})();
