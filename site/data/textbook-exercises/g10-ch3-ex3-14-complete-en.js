/* Grade 10 Ch 3 Ex 3.14 (Q1(i)–(iv), Q2(i)–(iii), Q3(i)–(iii), Q4–Q6) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 128 (printed p. 122), Tamil PDF p. 130 (printed p. 124),
   and Answer Appendix PDF pp. 344–345 (printed pp. 338–339) / Tamil Answer Appendix PDF p. 359 (printed p. 353);
   Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-14-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Relation Between Roots and Coefficients",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q1(i)",
      "ta": "பயிற்சி 3.14 · வினா 1(i)"
    },
    "title": {
      "en": "Write α/(3β) + β/(3α) in terms of α + β and αβ",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "1. Write each of the following expression in terms of α + β and αβ.\n(i) α/(3β) + β/(3α)",
      "ta": "கீழே கொடுக்கப்பட்ட கோவைகளை α + β மற்றும் αβ வாயிலாக மாற்றி எழுதுக. (i) α/(3β) + β/(3α)"
    },
    "questionMath": {
      "en": [
        "1. Write each of the following expression in terms of ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " and ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        ".\n(i) ",
        {
          "latex": "\\dfrac{\\alpha}{3\\beta}+\\dfrac{\\beta}{3\\alpha}",
          "fallback": "α/(3β) + β/(3α)",
          "display": false
        }
      ],
      "ta": [
        "கீழே கொடுக்கப்பட்ட கோவைகளை ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        " வாயிலாக மாற்றி எழுதுக. (i) ",
        {
          "latex": "\\dfrac{\\alpha}{3\\beta}+\\dfrac{\\beta}{3\\alpha}",
          "fallback": "α/(3β) + β/(3α)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Here α and β represent the two roots of a quadratic equation (with α ≠ 0 and β ≠ 0 so the denominators are defined), α + β is the sum of the roots, and αβ is the product of the roots. To combine the two fractions, use the common denominator 3αβ: multiply the first fraction by α/α and the second by β/β.",
        "eq": "α/(3β) + β/(3α) = (α² + β²)/(3αβ)",
        "math": {
          "latex": "\\dfrac{\\alpha}{3\\beta}+\\dfrac{\\beta}{3\\alpha}=\\dfrac{\\alpha^2+\\beta^2}{3\\alpha\\beta}",
          "fallback": "α/(3β) + β/(3α) = (α² + β²)/(3αβ)",
          "display": true
        },
        "ta": "α, β இரண்டும் பூச்சியமல்ல. பொதுப் பகுதி 3αβ உடன் பின்னங்களைக் கூட்டுக."
      },
      {
        "en": "Recall the square identity (α + β)² = α² + 2αβ + β². Subtracting 2αβ from both sides isolates α² + β² purely in terms of α + β and αβ: α² + β² = (α + β)² − 2αβ.",
        "eq": "α² + β² = (α + β)² − 2αβ",
        "math": {
          "latex": "\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta",
          "fallback": "α² + β² = (α + β)² − 2αβ",
          "display": true
        },
        "ta": "கூட்டுத்தொகையின் வர்க்க முற்றொருமையிலிருந்து α² + β² = (α + β)² − 2αβ என எழுதுக."
      },
      {
        "en": "Substitute (α + β)² − 2αβ for α² + β² in the numerator so the entire expression uses only α + β and αβ.",
        "eq": "((α + β)² − 2αβ)/(3αβ)",
        "math": {
          "latex": "\\dfrac{\\alpha}{3\\beta}+\\dfrac{\\beta}{3\\alpha}=\\dfrac{(\\alpha+\\beta)^2-2\\alpha\\beta}{3\\alpha\\beta}",
          "fallback": "((α + β)² − 2αβ)/(3αβ)",
          "display": true
        },
        "ta": "தொகுதியிலுள்ள α² + β² க்குப் பதிலாக இக்கோவையை எழுதினால் கூடுதல், பெருக்கற்பலன் மட்டுமே எஞ்சும்."
      }
    ],
    "answer": "((α + β)² − 2αβ)/(3αβ)",
    "answerMath": {
      "latex": "\\dfrac{(\\alpha+\\beta)^2-2\\alpha\\beta}{3\\alpha\\beta}",
      "fallback": "((α + β)² − 2αβ)/(3αβ)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q1(i); printed p. 122, PDF p. 128; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Relation Between Roots and Coefficients",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q1(ii)",
      "ta": "பயிற்சி 3.14 · வினா 1(ii)"
    },
    "title": {
      "en": "Write 1/(α²β) + 1/(β²α) in terms of α + β and αβ",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "1. Write each of the following expression in terms of α + β and αβ.\n(ii) 1/(α²β) + 1/(β²α)",
      "ta": "கீழே கொடுக்கப்பட்ட கோவைகளை α + β மற்றும் αβ வாயிலாக மாற்றி எழுதுக. (ii) 1/(α²β) + 1/(β²α)"
    },
    "questionMath": {
      "en": [
        "1. Write each of the following expression in terms of ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " and ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        ".\n(ii) ",
        {
          "latex": "\\dfrac{1}{\\alpha^2\\beta}+\\dfrac{1}{\\beta^2\\alpha}",
          "fallback": "1/(α²β) + 1/(β²α)",
          "display": false
        }
      ],
      "ta": [
        "கீழே கொடுக்கப்பட்ட கோவைகளை ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        " வாயிலாக மாற்றி எழுதுக. (ii) ",
        {
          "latex": "\\dfrac{1}{\\alpha^2\\beta}+\\dfrac{1}{\\beta^2\\alpha}",
          "fallback": "1/(α²β) + 1/(β²α)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Here α and β are non-zero roots, α + β is the sum of the roots, and αβ is the product of the roots. Notice the lowest common denominator of α²β and β²α is α²β²: multiply the first fraction by β/β and the second by α/α.",
        "eq": "1/(α²β) + 1/(β²α) = (β + α)/(α²β²)",
        "math": {
          "latex": "\\dfrac{1}{\\alpha^2\\beta}+\\dfrac{1}{\\beta^2\\alpha}=\\dfrac{\\beta+\\alpha}{\\alpha^2\\beta^2}",
          "fallback": "1/(α²β) + 1/(β²α) = (β + α)/(α²β²)",
          "display": true
        },
        "ta": "α, β பூச்சியமல்ல. பகுதிகளின் மீ.சி.ம. α²β² என்பதால் இரு பின்னங்களையும் இப்பகுதிக்கு மாற்றிக் கூட்டுக."
      },
      {
        "en": "Rewrite β + α as α + β in the numerator, and rewrite α²β² as (αβ)² in the denominator so the expression depends only on α + β and αβ.",
        "eq": "(α + β)/(αβ)²",
        "math": {
          "latex": "\\dfrac{\\beta+\\alpha}{\\alpha^2\\beta^2}=\\dfrac{\\alpha+\\beta}{(\\alpha\\beta)^2}",
          "fallback": "(α + β)/(αβ)²",
          "display": true
        },
        "ta": "தொகுதியில் β + α ஐ α + β எனவும் பகுதியை (αβ)² எனவும் எழுதுக."
      },
      {
        "en": "Confirm that no bare α or β remains: only the sum α + β and the product αβ appear.",
        "eq": "1/(α²β) + 1/(β²α) = (α + β)/(αβ)²",
        "math": {
          "latex": "\\dfrac{1}{\\alpha^2\\beta}+\\dfrac{1}{\\beta^2\\alpha}=\\dfrac{\\alpha+\\beta}{(\\alpha\\beta)^2}",
          "fallback": "1/(α²β) + 1/(β²α) = (α + β)/(αβ)²",
          "display": true
        },
        "ta": "கிடைத்த கோவையில் α + β மற்றும் αβ மட்டுமே உள்ளன என்பதைச் சரிபார்க்க."
      }
    ],
    "answer": "(α + β)/(αβ)²",
    "answerMath": {
      "latex": "\\dfrac{\\alpha+\\beta}{(\\alpha\\beta)^2}",
      "fallback": "(α + β)/(αβ)²",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q1(ii); printed p. 122, PDF p. 128; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Relation Between Roots and Coefficients",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q1(iii)",
      "ta": "பயிற்சி 3.14 · வினா 1(iii)"
    },
    "title": {
      "en": "Write (3α − 1)(3β − 1) in terms of α + β and αβ",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "1. Write each of the following expression in terms of α + β and αβ.\n(iii) (3α − 1)(3β − 1)",
      "ta": "கீழே கொடுக்கப்பட்ட கோவைகளை α + β மற்றும் αβ வாயிலாக மாற்றி எழுதுக. (iii) (3α − 1)(3β − 1)"
    },
    "questionMath": {
      "en": [
        "1. Write each of the following expression in terms of ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " and ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        ".\n(iii) ",
        {
          "latex": "(3\\alpha-1)(3\\beta-1)",
          "fallback": "(3α − 1)(3β − 1)",
          "display": false
        }
      ],
      "ta": [
        "கீழே கொடுக்கப்பட்ட கோவைகளை ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        " வாயிலாக மாற்றி எழுதுக. (iii) ",
        {
          "latex": "(3\\alpha-1)(3\\beta-1)",
          "fallback": "(3α − 1)(3β − 1)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Here α and β represent the two roots, α + β is their sum, and αβ is their product. Expand the product (3α − 1)(3β − 1) term by term.",
        "eq": "(3α − 1)(3β − 1) = 9αβ − 3α − 3β + 1",
        "math": {
          "latex": "(3\\alpha-1)(3\\beta-1)=9\\alpha\\beta-3\\alpha-3\\beta+1",
          "fallback": "(3α − 1)(3β − 1) = 9αβ − 3α − 3β + 1",
          "display": true
        },
        "ta": "இரண்டு அடைப்புக்குறிகளையும் உறுப்புவாரியாகப் பெருக்குக."
      },
      {
        "en": "Factor −3 out of the middle two terms −3α − 3β; pulling out the minus sign turns both signs inside the bracket positive: −3(α + β).",
        "eq": "9αβ − 3(α + β) + 1",
        "math": {
          "latex": "9\\alpha\\beta-3\\alpha-3\\beta+1=9\\alpha\\beta-3(\\alpha+\\beta)+1",
          "fallback": "9αβ − 3(α + β) + 1",
          "display": true
        },
        "ta": "நடு உறுப்புகளான −3α, −3β இலிருந்து −3 ஐப் பொதுக்காரணியாக வெளியே எடுக்க."
      },
      {
        "en": "The expression 9αβ − 3(α + β) + 1 is now written completely in terms of α + β and αβ.",
        "eq": "(3α − 1)(3β − 1) = 9αβ − 3(α + β) + 1",
        "math": {
          "latex": "(3\\alpha-1)(3\\beta-1)=9\\alpha\\beta-3(\\alpha+\\beta)+1",
          "fallback": "(3α − 1)(3β − 1) = 9αβ − 3(α + β) + 1",
          "display": true
        },
        "ta": "கோவை 9αβ − 3(α + β) + 1 எனக் கேட்ட வடிவில் கிடைக்கிறது."
      }
    ],
    "answer": "9αβ − 3(α + β) + 1",
    "answerMath": {
      "latex": "9\\alpha\\beta-3(\\alpha+\\beta)+1",
      "fallback": "9αβ − 3(α + β) + 1",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q1(iii); printed p. 122, PDF p. 128; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Relation Between Roots and Coefficients",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q1(iv)",
      "ta": "பயிற்சி 3.14 · வினா 1(iv)"
    },
    "title": {
      "en": "Write (α + 3)/β + (β + 3)/α in terms of α + β and αβ",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "1. Write each of the following expression in terms of α + β and αβ.\n(iv) (α + 3)/β + (β + 3)/α",
      "ta": "கீழே கொடுக்கப்பட்ட கோவைகளை α + β மற்றும் αβ வாயிலாக மாற்றி எழுதுக. (iv) (α + 3)/β + (β + 3)/α"
    },
    "questionMath": {
      "en": [
        "1. Write each of the following expression in terms of ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " and ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        ".\n(iv) ",
        {
          "latex": "\\dfrac{\\alpha+3}{\\beta}+\\dfrac{\\beta+3}{\\alpha}",
          "fallback": "(α + 3)/β + (β + 3)/α",
          "display": false
        }
      ],
      "ta": [
        "கீழே கொடுக்கப்பட்ட கோவைகளை ",
        {
          "latex": "\\alpha+\\beta",
          "fallback": "α + β",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\alpha\\beta",
          "fallback": "αβ",
          "display": false
        },
        " வாயிலாக மாற்றி எழுதுக. (iv) ",
        {
          "latex": "\\dfrac{\\alpha+3}{\\beta}+\\dfrac{\\beta+3}{\\alpha}",
          "fallback": "(α + 3)/β + (β + 3)/α",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Here α and β are non-zero roots, α + β is the sum of the roots, and αβ is their product. Combine the fractions using the common denominator αβ and expand the numerator.",
        "eq": "(α + 3)/β + (β + 3)/α = [α(α + 3) + β(β + 3)]/(αβ) = (α² + 3α + β² + 3β)/(αβ)",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{\\alpha+3}{\\beta}+\\dfrac{\\beta+3}{\\alpha}&=\\dfrac{\\alpha(\\alpha+3)+\\beta(\\beta+3)}{\\alpha\\beta}\\\\&=\\dfrac{\\alpha^2+3\\alpha+\\beta^2+3\\beta}{\\alpha\\beta}\\end{aligned}",
          "fallback": "(α + 3)/β + (β + 3)/α = [α(α + 3) + β(β + 3)]/(αβ) = (α² + 3α + β² + 3β)/(αβ)",
          "display": true
        },
        "ta": "α, β பூச்சியமல்ல. பொதுப் பகுதி αβ உடன் பின்னங்களைக் கூட்டித் தொகுதியை விரிவாக்குக."
      },
      {
        "en": "Group the squared terms together as (α² + β²) and factor 3 from 3α + 3β to get 3(α + β).",
        "eq": "[(α² + β²) + 3(α + β)]/(αβ)",
        "math": {
          "latex": "\\dfrac{(\\alpha^2+\\beta^2)+3(\\alpha+\\beta)}{\\alpha\\beta}",
          "fallback": "[(α² + β²) + 3(α + β)]/(αβ)",
          "display": true
        },
        "ta": "வர்க்க உறுப்புகளை ஒன்றாகச் சேர்த்து மற்ற இரு உறுப்புகளிலிருந்து 3 ஐ வெளியே எடுக்க."
      },
      {
        "en": "Replace α² + β² with the identity (α + β)² − 2αβ so every part is written using only α + β and αβ.",
        "eq": "((α + β)² − 2αβ + 3(α + β))/(αβ)",
        "math": {
          "latex": "\\dfrac{(\\alpha+\\beta)^2-2\\alpha\\beta+3(\\alpha+\\beta)}{\\alpha\\beta}",
          "fallback": "((α + β)² − 2αβ + 3(α + β))/(αβ)",
          "display": true
        },
        "ta": "α² + β² க்கு (α + β)² − 2αβ ஐப் பிரதியிடுக."
      }
    ],
    "answer": "((α + β)² − 2αβ + 3(α + β))/(αβ)",
    "answerMath": {
      "latex": "\\dfrac{(\\alpha+\\beta)^2-2\\alpha\\beta+3(\\alpha+\\beta)}{\\alpha\\beta}",
      "fallback": "((α + β)² − 2αβ + 3(α + β))/(αβ)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q1(iv); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Evaluating Root Expressions Without Solving",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q2(i)",
      "ta": "பயிற்சி 3.14 · வினா 2(i)"
    },
    "title": {
      "en": "Find 1/α + 1/β for the roots of 2x² − 7x + 5 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "2. The roots of the equation 2x² − 7x + 5 = 0 are α and β. Without solving for the roots, find\n(i) 1/α + 1/β",
      "ta": "2x² − 7x + 5 = 0 என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (i) 1/α + 1/β"
    },
    "questionMath": {
      "en": [
        "2. The roots of the equation ",
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha",
          "fallback": "α",
          "display": false
        },
        " and ",
        {
          "latex": "\\beta",
          "fallback": "β",
          "display": false
        },
        ". Without solving for the roots, find\n(i) ",
        {
          "latex": "\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}",
          "fallback": "1/α + 1/β",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (i) ",
        {
          "latex": "\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}",
          "fallback": "1/α + 1/β",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 2x² − 7x + 5 = 0 with the standard quadratic form ax² + bx + c = 0, where a is the coefficient of x², b is the coefficient of x, and c is the constant term.",
        "eq": "a = 2, b = −7, c = 5",
        "math": {
          "latex": "a=2,\\quad b=-7,\\quad c=5",
          "fallback": "a = 2, b = −7, c = 5",
          "display": true
        },
        "ta": "கொடுக்கப்பட்ட சமன்பாட்டின் கெழுக்கள் a = 2, b = −7, c = 5."
      },
      {
        "en": "Use the roots-and-coefficients formulas for roots α and β: sum of roots α + β = −b/a and product of roots αβ = c/a.",
        "eq": "α + β = −(−7)/2 = 7/2; αβ = 5/2",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=-\\dfrac{b}{a}=-\\dfrac{-7}{2}=\\dfrac{7}{2}\\\\\\alpha\\beta&=\\dfrac{c}{a}=\\dfrac{5}{2}\\end{aligned}",
          "fallback": "α + β = −(−7)/2 = 7/2; αβ = 5/2",
          "display": true
        },
        "ta": "மூலங்களின் கூடுதல் −b/a = 7/2, பெருக்கற்பலன் c/a = 5/2."
      },
      {
        "en": "Combine 1/α + 1/β over the common denominator αβ, then substitute α + β = 7/2 and αβ = 5/2. Dividing by 5/2 is the same as multiplying by 2/5, and the 2s cancel.",
        "eq": "1/α + 1/β = (α + β)/(αβ) = (7/2)/(5/2) = 7/5",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}&=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}\\\\&=\\dfrac{7/2}{5/2}=\\dfrac{7}{2}\\times\\dfrac{2}{5}=\\dfrac{7}{5}\\end{aligned}",
          "fallback": "1/α + 1/β = (α + β)/(αβ) = (7/2)/(5/2) = 7/5",
          "display": true
        },
        "ta": "பின்னங்களின் கூடுதலை (α + β)/(αβ) என எழுதுக. இரு மதிப்புகளையும் பிரதியிட்டுச் சுருக்கினால் 7/5."
      }
    ],
    "answer": "7/5",
    "answerMath": {
      "latex": "\\dfrac{7}{5}",
      "fallback": "7/5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q2(i); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Evaluating Root Expressions Without Solving",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q2(ii)",
      "ta": "பயிற்சி 3.14 · வினா 2(ii)"
    },
    "title": {
      "en": "Find α/β + β/α for the roots of 2x² − 7x + 5 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "2. The roots of the equation 2x² − 7x + 5 = 0 are α and β. Without solving for the roots, find\n(ii) α/β + β/α",
      "ta": "2x² − 7x + 5 = 0 என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (ii) α/β + β/α"
    },
    "questionMath": {
      "en": [
        "2. The roots of the equation ",
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha",
          "fallback": "α",
          "display": false
        },
        " and ",
        {
          "latex": "\\beta",
          "fallback": "β",
          "display": false
        },
        ". Without solving for the roots, find\n(ii) ",
        {
          "latex": "\\dfrac{\\alpha}{\\beta}+\\dfrac{\\beta}{\\alpha}",
          "fallback": "α/β + β/α",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (ii) ",
        {
          "latex": "\\dfrac{\\alpha}{\\beta}+\\dfrac{\\beta}{\\alpha}",
          "fallback": "α/β + β/α",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 2x² − 7x + 5 = 0 with ax² + bx + c = 0 (where a = 2, b = −7, c = 5) to find the sum of roots α + β = −b/a and the product of roots αβ = c/a.",
        "eq": "α + β = 7/2; αβ = 5/2",
        "math": {
          "latex": "\\alpha+\\beta=-\\dfrac{-7}{2}=\\dfrac{7}{2},\\qquad\\alpha\\beta=\\dfrac{5}{2}",
          "fallback": "α + β = 7/2; αβ = 5/2",
          "display": true
        },
        "ta": "கெழுக்களிலிருந்து α + β = 7/2, αβ = 5/2 எனக் காண்க."
      },
      {
        "en": "Combine α/β + β/α over the common denominator αβ, then apply the identity α² + β² = (α + β)² − 2αβ.",
        "eq": "α/β + β/α = (α² + β²)/(αβ) = [(α + β)² − 2αβ]/(αβ)",
        "math": {
          "latex": "\\dfrac{\\alpha}{\\beta}+\\dfrac{\\beta}{\\alpha}=\\dfrac{\\alpha^2+\\beta^2}{\\alpha\\beta}=\\dfrac{(\\alpha+\\beta)^2-2\\alpha\\beta}{\\alpha\\beta}",
          "fallback": "α/β + β/α = (α² + β²)/(αβ) = [(α + β)² − 2αβ]/(αβ)",
          "display": true
        },
        "ta": "பொதுப் பகுதி αβ உடன் கூட்டி, தொகுதியிலுள்ள α² + β² ஐ (α + β)² − 2αβ என எழுதுக."
      },
      {
        "en": "Substitute α + β = 7/2 and αβ = 5/2. Notice (7/2)² = 49/4 and 2(5/2) = 5 = 20/4, so the numerator simplifies to 29/4.",
        "eq": "((7/2)² − 2(5/2))/(5/2) = (49/4 − 5)/(5/2) = (29/4)/(5/2) = 29/10",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{(7/2)^2-2(5/2)}{5/2}&=\\dfrac{\\frac{49}{4}-5}{\\frac{5}{2}}\\\\&=\\dfrac{\\frac{29}{4}}{\\frac{5}{2}}\\\\&=\\dfrac{29}{4}\\times\\dfrac{2}{5}=\\dfrac{29}{10}\\end{aligned}",
          "fallback": "((7/2)² − 2(5/2))/(5/2) = (49/4 − 5)/(5/2) = (29/4)/(5/2) = 29/10",
          "display": true
        },
        "ta": "பிரதியிட்டால் தொகுதி 49/4 − 5 = 29/4. அதனை 5/2 ஆல் வகுக்க."
      }
    ],
    "answer": "29/10",
    "answerMath": {
      "latex": "\\dfrac{29}{10}",
      "fallback": "29/10",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q2(ii); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Evaluating Root Expressions Without Solving",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q2(iii)",
      "ta": "பயிற்சி 3.14 · வினா 2(iii)"
    },
    "title": {
      "en": "Find (α + 2)/(β + 2) + (β + 2)/(α + 2) for the roots of 2x² − 7x + 5 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "2. The roots of the equation 2x² − 7x + 5 = 0 are α and β. Without solving for the roots, find\n(iii) (α + 2)/(β + 2) + (β + 2)/(α + 2)",
      "ta": "2x² − 7x + 5 = 0 என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (iii) (α + 2)/(β + 2) + (β + 2)/(α + 2)"
    },
    "questionMath": {
      "en": [
        "2. The roots of the equation ",
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha",
          "fallback": "α",
          "display": false
        },
        " and ",
        {
          "latex": "\\beta",
          "fallback": "β",
          "display": false
        },
        ". Without solving for the roots, find\n(iii) ",
        {
          "latex": "\\dfrac{\\alpha+2}{\\beta+2}+\\dfrac{\\beta+2}{\\alpha+2}",
          "fallback": "(α + 2)/(β + 2) + (β + 2)/(α + 2)",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "2x^2-7x+5=0",
          "fallback": "2x² − 7x + 5 = 0",
          "display": false
        },
        " என்ற சமன்பாட்டின் மூலங்கள் α மற்றும் β எனில், பின்வருவனவற்றின் மதிப்புகளைக் காண்க. (குறிப்பு: தீர்வு தேவையில்லை.) (iii) ",
        {
          "latex": "\\dfrac{\\alpha+2}{\\beta+2}+\\dfrac{\\beta+2}{\\alpha+2}",
          "fallback": "(α + 2)/(β + 2) + (β + 2)/(α + 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "From 2x² − 7x + 5 = 0 (with a = 2, b = −7, c = 5), we have sum of roots α + β = 7/2 and product of roots αβ = 5/2. Also compute α² + β² = (α + β)² − 2αβ = 49/4 − 5 = 29/4 so we can substitute it directly below.",
        "eq": "α + β = 7/2; αβ = 5/2; α² + β² = 29/4",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\beta&=\\dfrac{7}{2},\\qquad\\alpha\\beta=\\dfrac{5}{2}\\\\\\alpha^2+\\beta^2&=\\left(\\dfrac{7}{2}\\right)^2-2\\left(\\dfrac{5}{2}\\right)=\\dfrac{49}{4}-5=\\dfrac{29}{4}\\end{aligned}",
          "fallback": "α + β = 7/2; αβ = 5/2; α² + β² = 29/4",
          "display": true
        },
        "ta": "மூலங்களின் கூடுதல் 7/2, பெருக்கற்பலன் 5/2. வர்க்க முற்றொருமையால் α² + β² = 29/4."
      },
      {
        "en": "Combine the two fractions using the common denominator (α + 2)(β + 2), then expand both the numerator and the denominator into expressions containing α² + β², α + β, and αβ.",
        "eq": "[(α + 2)² + (β + 2)²]/[(α + 2)(β + 2)] = [(α² + β²) + 4(α + β) + 8]/[αβ + 2(α + β) + 4]",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{\\alpha+2}{\\beta+2}+\\dfrac{\\beta+2}{\\alpha+2}&=\\dfrac{(\\alpha+2)^2+(\\beta+2)^2}{(\\alpha+2)(\\beta+2)}\\\\&=\\dfrac{(\\alpha^2+\\beta^2)+4(\\alpha+\\beta)+8}{\\alpha\\beta+2(\\alpha+\\beta)+4}\\end{aligned}",
          "fallback": "[(α + 2)² + (β + 2)²]/[(α + 2)(β + 2)] = [(α² + β²) + 4(α + β) + 8]/[αβ + 2(α + β) + 4]",
          "display": true
        },
        "ta": "பொதுப் பகுதி (α + 2)(β + 2) உடன் பின்னங்களைக் கூட்டி, தொகுதியையும் பகுதியையும் விரிவாக்குக."
      },
      {
        "en": "Evaluate the numerator and denominator separately using α² + β² = 29/4, α + β = 7/2, and αβ = 5/2.",
        "eq": "Numerator = 29/4 + 14 + 8 = 117/4; Denominator = 5/2 + 7 + 4 = 27/2",
        "math": {
          "latex": "\\begin{aligned}\\text{Numerator}&=\\dfrac{29}{4}+4\\left(\\dfrac{7}{2}\\right)+8=\\dfrac{29}{4}+22=\\dfrac{117}{4}\\\\\\text{Denominator}&=\\dfrac{5}{2}+2\\left(\\dfrac{7}{2}\\right)+4=\\dfrac{5}{2}+11=\\dfrac{27}{2}\\end{aligned}",
          "fallback": "Numerator = 29/4 + 14 + 8 = 117/4; Denominator = 5/2 + 7 + 4 = 27/2",
          "display": true
        },
        "ta": "கூடுதல், பெருக்கற்பலன், வர்க்கங்களின் கூடுதல் ஆகியவற்றின் மதிப்புகளைப் பிரதியிட்டு தொகுதியையும் பகுதியையும் தனித்தனியே கணக்கிடுக.",
        "mathTa": {
          "latex": "\\begin{aligned}\\text{தொகுதி}&=\\dfrac{29}{4}+4\\left(\\dfrac{7}{2}\\right)+8=\\dfrac{29}{4}+22=\\dfrac{117}{4}\\\\\\text{பகுதி}&=\\dfrac{5}{2}+2\\left(\\dfrac{7}{2}\\right)+4=\\dfrac{5}{2}+11=\\dfrac{27}{2}\\end{aligned}",
          "fallback": "தொகுதி = 29/4 + 14 + 8 = 117/4; பகுதி = 5/2 + 7 + 4 = 27/2",
          "display": true
        }
      },
      {
        "en": "Divide the numerator 117/4 by the denominator 27/2 (multiply by 2/27), then cancel the common factor 9 from 117 = 13 × 9 and 54 = 6 × 9.",
        "eq": "(117/4) ÷ (27/2) = (117/4) × (2/27) = 117/54 = 13/6",
        "math": {
          "latex": "\\dfrac{117/4}{27/2}=\\dfrac{117}{4}\\times\\dfrac{2}{27}=\\dfrac{117}{54}=\\dfrac{13}{6}",
          "fallback": "(117/4) ÷ (27/2) = (117/4) × (2/27) = 117/54 = 13/6",
          "display": true
        },
        "ta": "117/4 ஐ 27/2 ஆல் வகுத்துச் சுருக்கினால் 13/6 கிடைக்கும்."
      }
    ],
    "answer": "13/6",
    "answerMath": {
      "latex": "\\dfrac{13}{6}",
      "fallback": "13/6",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q2(iii); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q3-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Forming Quadratic Equations from Transformed Roots",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q3(i)",
      "ta": "பயிற்சி 3.14 · வினா 3(i)"
    },
    "title": {
      "en": "Form the quadratic equation with roots α² and β² from x² + 6x − 4 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "3. The roots of the equation x² + 6x − 4 = 0 are α, β. Find the quadratic equation whose roots are\n(i) α² and β²",
      "ta": "x² + 6x − 4 = 0 இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (i) α² மற்றும் β²"
    },
    "questionMath": {
      "en": [
        "3. The roots of the equation ",
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha,\\,\\beta",
          "fallback": "α, β",
          "display": false
        },
        ". Find the quadratic equation whose roots are\n(i) ",
        {
          "latex": "\\alpha^2",
          "fallback": "α²",
          "display": false
        },
        " and ",
        {
          "latex": "\\beta^2",
          "fallback": "β²",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (i) ",
        {
          "latex": "\\alpha^2",
          "fallback": "α²",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\beta^2",
          "fallback": "β²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare x² + 6x − 4 = 0 with ax² + bx + c = 0 (a = 1, b = 6, c = −4) to find the sum α + β = −b/a and product αβ = c/a of the original roots α and β.",
        "eq": "α + β = −6/1 = −6; αβ = −4/1 = −4",
        "math": {
          "latex": "\\alpha+\\beta=-\\dfrac{6}{1}=-6,\\qquad\\alpha\\beta=\\dfrac{-4}{1}=-4",
          "fallback": "α + β = −6/1 = −6; αβ = −4/1 = −4",
          "display": true
        },
        "ta": "முதல் சமன்பாட்டின் கெழுக்களிலிருந்து α + β = −6, αβ = −4."
      },
      {
        "en": "Find the sum and product of the new roots α² and β². Use α² + β² = (α + β)² − 2αβ for the new sum, and α²β² = (αβ)² for the new product.",
        "eq": "Sum of new roots = α² + β² = (−6)² − 2(−4) = 36 + 8 = 44; Product of new roots = (αβ)² = (−4)² = 16",
        "math": {
          "latex": "\\begin{aligned}\\text{Sum}&=\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\&=(-6)^2-2(-4)=36+8=44\\\\\\text{Product}&=\\alpha^2\\beta^2=(\\alpha\\beta)^2=(-4)^2=16\\end{aligned}",
          "fallback": "Sum of new roots = α² + β² = (−6)² − 2(−4) = 36 + 8 = 44; Product of new roots = (αβ)² = (−4)² = 16",
          "display": true
        },
        "ta": "புதிய மூலங்களின் கூடுதல் (α + β)² − 2αβ. அவற்றின் பெருக்கற்பலன் (αβ)².",
        "mathTa": {
          "latex": "\\begin{aligned}\\text{கூடுதல்}&=\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\&=(-6)^2-2(-4)=36+8=44\\\\\\text{பெருக்கற்பலன்}&=\\alpha^2\\beta^2=(\\alpha\\beta)^2=(-4)^2=16\\end{aligned}",
          "fallback": "கூடுதல் of new மூலங்கள் = α² + β² = (−6)² − 2(−4) = 36 + 8 = 44; பெருக்கற்பலன் of new மூலங்கள் = (αβ)² = (−4)² = 16",
          "display": true
        }
      },
      {
        "en": "Substitute the new sum 44 and new product 16 into the general quadratic form x² − (Sum of the roots)x + (Product of the roots) = 0.",
        "eq": "x² − 44x + 16 = 0",
        "math": {
          "latex": "x^2-44x+16=0",
          "fallback": "x² − 44x + 16 = 0",
          "display": true
        },
        "ta": "புதிய கூடுதல் 44, பெருக்கற்பலன் 16 ஆகியவற்றைக் கொண்டு இருபடிச் சமன்பாட்டை எழுதுக."
      }
    ],
    "answer": "x² − 44x + 16 = 0",
    "answerMath": {
      "latex": "x^2-44x+16=0",
      "fallback": "x² − 44x + 16 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q3(i); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q3-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Forming Quadratic Equations from Transformed Roots",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q3(ii)",
      "ta": "பயிற்சி 3.14 · வினா 3(ii)"
    },
    "title": {
      "en": "Form the quadratic equation with roots 2/α and 2/β from x² + 6x − 4 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "3. The roots of the equation x² + 6x − 4 = 0 are α, β. Find the quadratic equation whose roots are\n(ii) 2/α and 2/β",
      "ta": "x² + 6x − 4 = 0 இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (ii) 2/α மற்றும் 2/β"
    },
    "questionMath": {
      "en": [
        "3. The roots of the equation ",
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha,\\,\\beta",
          "fallback": "α, β",
          "display": false
        },
        ". Find the quadratic equation whose roots are\n(ii) ",
        {
          "latex": "\\dfrac{2}{\\alpha}",
          "fallback": "2/α",
          "display": false
        },
        " and ",
        {
          "latex": "\\dfrac{2}{\\beta}",
          "fallback": "2/β",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (ii) ",
        {
          "latex": "\\dfrac{2}{\\alpha}",
          "fallback": "2/α",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\dfrac{2}{\\beta}",
          "fallback": "2/β",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "From x² + 6x − 4 = 0 (with a = 1, b = 6, c = −4), the sum and product of the original roots α and β are α + β = −6 and αβ = −4 (so neither root is zero, and 2/α, 2/β are well defined).",
        "eq": "α + β = −6; αβ = −4",
        "math": {
          "latex": "\\alpha+\\beta=-6,\\qquad\\alpha\\beta=-4",
          "fallback": "α + β = −6; αβ = −4",
          "display": true
        },
        "ta": "α + β = −6, αβ = −4. பெருக்கற்பலன் பூச்சியமல்ல என்பதால் இரு மூலங்களின் தலைகீழிகளும் வரையறுக்கப்பட்டவை."
      },
      {
        "en": "Compute the sum and product of the new roots 2/α and 2/β by writing 2/α + 2/β = 2(α + β)/(αβ) and (2/α)(2/β) = 4/(αβ).",
        "eq": "Sum = 2(−6)/(−4) = 12/4 = 3; Product = 4/(−4) = −1",
        "math": {
          "latex": "\\begin{aligned}\\text{Sum}&=\\dfrac{2}{\\alpha}+\\dfrac{2}{\\beta}=\\dfrac{2(\\alpha+\\beta)}{\\alpha\\beta}=\\dfrac{2(-6)}{-4}=3\\\\\\text{Product}&=\\dfrac{2}{\\alpha}\\times\\dfrac{2}{\\beta}=\\dfrac{4}{\\alpha\\beta}=\\dfrac{4}{-4}=-1\\end{aligned}",
          "fallback": "Sum = 2(−6)/(−4) = 12/4 = 3; Product = 4/(−4) = −1",
          "display": true
        },
        "ta": "புதிய கூடுதலை 2(α + β)/(αβ) எனவும் பெருக்கற்பலனை 4/(αβ) எனவும் எழுதுக.",
        "mathTa": {
          "latex": "\\begin{aligned}\\text{கூடுதல்}&=\\dfrac{2}{\\alpha}+\\dfrac{2}{\\beta}=\\dfrac{2(\\alpha+\\beta)}{\\alpha\\beta}=\\dfrac{2(-6)}{-4}=3\\\\\\text{பெருக்கற்பலன்}&=\\dfrac{2}{\\alpha}\\times\\dfrac{2}{\\beta}=\\dfrac{4}{\\alpha\\beta}=\\dfrac{4}{-4}=-1\\end{aligned}",
          "fallback": "கூடுதல் = 2(−6)/(−4) = 12/4 = 3; பெருக்கற்பலன் = 4/(−4) = −1",
          "display": true
        }
      },
      {
        "en": "Insert Sum = 3 and Product = −1 into x² − (Sum of the roots)x + (Product of the roots) = 0.",
        "eq": "x² − 3x − 1 = 0",
        "math": {
          "latex": "x^2-3x+(-1)=0\\quad\\text{so}\\quad x^2-3x-1=0",
          "fallback": "x² − 3x − 1 = 0",
          "display": true
        },
        "ta": "புதிய கூடுதல் 3, பெருக்கற்பலன் −1 ஆகியவற்றைப் பயன்படுத்திச் சமன்பாடு அமைக்க.",
        "mathTa": {
          "latex": "x^2-3x+(-1)=0\\quad\\text{எனவே}\\quad x^2-3x-1=0",
          "fallback": "x² − 3x − 1 = 0",
          "display": true
        }
      }
    ],
    "answer": "x² − 3x − 1 = 0",
    "answerMath": {
      "latex": "x^2-3x-1=0",
      "fallback": "x² − 3x − 1 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q3(ii); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q3-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Forming Quadratic Equations from Transformed Roots",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q3(iii)",
      "ta": "பயிற்சி 3.14 · வினா 3(iii)"
    },
    "title": {
      "en": "Form the quadratic equation with roots α²β and β²α from x² + 6x − 4 = 0",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "3. The roots of the equation x² + 6x − 4 = 0 are α, β. Find the quadratic equation whose roots are\n(iii) α²β and β²α",
      "ta": "x² + 6x − 4 = 0 இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (iii) α²β மற்றும் β²α"
    },
    "questionMath": {
      "en": [
        "3. The roots of the equation ",
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " are ",
        {
          "latex": "\\alpha,\\,\\beta",
          "fallback": "α, β",
          "display": false
        },
        ". Find the quadratic equation whose roots are\n(iii) ",
        {
          "latex": "\\alpha^2\\beta",
          "fallback": "α²β",
          "display": false
        },
        " and ",
        {
          "latex": "\\beta^2\\alpha",
          "fallback": "β²α",
          "display": false
        }
      ],
      "ta": [
        {
          "latex": "x^2+6x-4=0",
          "fallback": "x² + 6x − 4 = 0",
          "display": false
        },
        " இன் மூலங்கள் α, β எனில், கீழ்க்காண்பனவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டைக் காண்க. (iii) ",
        {
          "latex": "\\alpha^2\\beta",
          "fallback": "α²β",
          "display": false
        },
        " மற்றும் ",
        {
          "latex": "\\beta^2\\alpha",
          "fallback": "β²α",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "From x² + 6x − 4 = 0 (with a = 1, b = 6, c = −4), we have α + β = −6 and αβ = −4.",
        "eq": "α + β = −6; αβ = −4",
        "math": {
          "latex": "\\alpha+\\beta=-6,\\qquad\\alpha\\beta=-4",
          "fallback": "α + β = −6; αβ = −4",
          "display": true
        },
        "ta": "கொடுக்கப்பட்ட சமன்பாட்டில் α + β = −6, αβ = −4."
      },
      {
        "en": "Factor αβ out of the sum α²β + β²α to get αβ(α + β), and write the product (α²β)(β²α) as α³β³ = (αβ)³.",
        "eq": "Sum = (−4)(−6) = 24; Product = (−4)³ = −64",
        "math": {
          "latex": "\\begin{aligned}\\text{Sum}&=\\alpha^2\\beta+\\beta^2\\alpha=\\alpha\\beta(\\alpha+\\beta)\\\\&=(-4)(-6)=24\\\\\\text{Product}&=(\\alpha^2\\beta)(\\beta^2\\alpha)=\\alpha^3\\beta^3=(\\alpha\\beta)^3\\\\&=(-4)^3=-64\\end{aligned}",
          "fallback": "Sum = (−4)(−6) = 24; Product = (−4)³ = −64",
          "display": true
        },
        "ta": "புதிய கூடுதலிலிருந்து αβ ஐ வெளியே எடுக்க. புதிய பெருக்கற்பலனை (αβ)³ என எழுதுக.",
        "mathTa": {
          "latex": "\\begin{aligned}\\text{கூடுதல்}&=\\alpha^2\\beta+\\beta^2\\alpha=\\alpha\\beta(\\alpha+\\beta)\\\\&=(-4)(-6)=24\\\\\\text{பெருக்கற்பலன்}&=(\\alpha^2\\beta)(\\beta^2\\alpha)=\\alpha^3\\beta^3=(\\alpha\\beta)^3\\\\&=(-4)^3=-64\\end{aligned}",
          "fallback": "கூடுதல் = (−4)(−6) = 24; பெருக்கற்பலன் = (−4)³ = −64",
          "display": true
        }
      },
      {
        "en": "Substitute Sum = 24 and Product = −64 into x² − (Sum of the roots)x + (Product of the roots) = 0.",
        "eq": "x² − 24x − 64 = 0",
        "math": {
          "latex": "x^2-24x-64=0",
          "fallback": "x² − 24x − 64 = 0",
          "display": true
        },
        "ta": "புதிய கூடுதல் 24, பெருக்கற்பலன் −64 ஆகியவற்றைப் பயன்படுத்திச் சமன்பாடு அமைக்க."
      }
    ],
    "answer": "x² − 24x − 64 = 0",
    "answerMath": {
      "latex": "x^2-24x-64=0",
      "fallback": "x² − 24x − 64 = 0",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q3(iii); printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Finding Unknown Coefficients Using Root Relations",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q4",
      "ta": "பயிற்சி 3.14 · வினா 4"
    },
    "title": {
      "en": "Find the values of a when 7x² + ax + 2 = 0 has roots α, β with β − α = −13/7",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "4. If α, β are the roots of 7x² + ax + 2 = 0 and if β − α = −13/7. Find the values of a.",
      "ta": "α, β என்பன 7x² + ax + 2 = 0 இன் மூலங்கள் மற்றும் β − α = −13/7 எனில், a இன் மதிப்புக் காண்க."
    },
    "questionMath": {
      "en": [
        "4. If ",
        {
          "latex": "\\alpha,\\,\\beta",
          "fallback": "α, β",
          "display": false
        },
        " are the roots of ",
        {
          "latex": "7x^2+ax+2=0",
          "fallback": "7x² + ax + 2 = 0",
          "display": false
        },
        " and if ",
        {
          "latex": "\\beta-\\alpha=\\dfrac{-13}{7}",
          "fallback": "β − α = −13/7",
          "display": false
        },
        ". Find the values of ",
        {
          "latex": "a",
          "fallback": "a",
          "display": false
        },
        "."
      ],
      "ta": [
        {
          "latex": "\\alpha,\\,\\beta",
          "fallback": "α, β",
          "display": false
        },
        " என்பன ",
        {
          "latex": "7x^2+ax+2=0",
          "fallback": "7x² + ax + 2 = 0",
          "display": false
        },
        " இன் மூலங்கள் மற்றும் ",
        {
          "latex": "\\beta-\\alpha=\\dfrac{-13}{7}",
          "fallback": "β − α = −13/7",
          "display": false
        },
        " எனில், a இன் மதிப்புக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Because the letter a is the unknown coefficient of x, write the standard quadratic form using capital letters Ax² + Bx + C = 0 (with A = 7, B = a, C = 2). For roots α and β, the sum is α + β = −B/A and the product is αβ = C/A.",
        "eq": "A = 7, B = a, C = 2; α + β = −a/7, αβ = 2/7",
        "math": {
          "latex": "\\begin{aligned}A=7,\\quad B&=a,\\quad C=2\\\\\\alpha+\\beta=-\\dfrac{a}{7},&\\qquad\\alpha\\beta=\\dfrac{2}{7}\\end{aligned}",
          "fallback": "A = 7, B = a, C = 2; α + β = −a/7, αβ = 2/7",
          "display": true
        },
        "ta": "முதல் கெழு 7, அடுத்த கெழு a, மாறிலி 2 என்பதால் α + β = −a/7, αβ = 2/7."
      },
      {
        "en": "Relate β − α to α + β and αβ using the identity (β − α)² = (α + β)² − 4αβ, which holds because (α + β)² − 4αβ = α² + 2αβ + β² − 4αβ = α² − 2αβ + β² = (β − α)². Substitute β − α = −13/7, α + β = −a/7, and αβ = 2/7.",
        "eq": "(−13/7)² = (−a/7)² − 4(2/7); 169/49 = a²/49 − 8/7",
        "math": {
          "latex": "\\begin{aligned}(\\beta-\\alpha)^2&=(\\alpha+\\beta)^2-4\\alpha\\beta\\\\\\left(-\\dfrac{13}{7}\\right)^2&=\\left(-\\dfrac{a}{7}\\right)^2-4\\left(\\dfrac{2}{7}\\right)\\\\\\dfrac{169}{49}&=\\dfrac{a^2}{49}-\\dfrac{8}{7}\\end{aligned}",
          "fallback": "(−13/7)² = (−a/7)² − 4(2/7); 169/49 = a²/49 − 8/7",
          "display": true
        },
        "ta": "கொடுக்கப்பட்ட வேறுபாட்டை வர்க்கப்படுத்தி (β − α)² = (α + β)² − 4αβ இல் பிரதியிடுக."
      },
      {
        "en": "Multiply every term by 49 to clear all denominators (noting that 49 × 8/7 = 7 × 8 = 56), then add 56 to both sides.",
        "eq": "169 = a² − 56; a² = 169 + 56 = 225",
        "math": {
          "latex": "\\begin{aligned}169&=a^2-56\\\\a^2&=169+56=225\\end{aligned}",
          "fallback": "169 = a² − 56; a² = 169 + 56 = 225",
          "display": true
        },
        "ta": "பகுதிகளை நீக்க 49 ஆல் பெருக்கி இருபுறமும் 56 ஐக் கூட்டுக."
      },
      {
        "en": "Take both the positive and negative square roots of 225 (since 15² = 225 and (−15)² = 225). Both a = −15 and a = 15 give roots differing by 13/7.",
        "eq": "a = −15 or a = 15",
        "math": {
          "latex": "a=\\pm\\sqrt{225}=\\pm 15\\quad(\\text{so }a=-15,\\;15)",
          "fallback": "a = −15 or a = 15",
          "display": true
        },
        "ta": "a² = 225 என்பதால் a = −15 அல்லது 15. இரு மதிப்புகளிலும் கொடுக்கப்பட்ட வேறுபாட்டிற்கு ஏற்ப மூலங்களை வரிசைப்படுத்தலாம்.",
        "mathTa": {
          "latex": "a=\\pm\\sqrt{225}=\\pm 15\\quad(\\text{எனவே }a=-15,\\;15)",
          "fallback": "a = −15 அல்லது a = 15",
          "display": true
        }
      }
    ],
    "answer": "−15, 15",
    "answerMath": {
      "latex": "-15,\\;15",
      "fallback": "−15, 15",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q4; printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Finding Unknown Coefficients Using Root Relations",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q5",
      "ta": "பயிற்சி 3.14 · வினா 5"
    },
    "title": {
      "en": "Find the values of a when one root of 2y² − ay + 64 = 0 is twice the other",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "5. If one root of the equation 2y² − ay + 64 = 0 is twice the other then find the values of a.",
      "ta": "2y² − ay + 64 = 0 என்ற சமன்பாட்டின் ஒரு மூலம் மற்றதைப் போல இருமடங்கு எனில், a இன் மதிப்புக் காண்க."
    },
    "questionMath": {
      "en": [
        "5. If one root of the equation ",
        {
          "latex": "2y^2-ay+64=0",
          "fallback": "2y² − ay + 64 = 0",
          "display": false
        },
        " is twice the other then find the values of ",
        {
          "latex": "a",
          "fallback": "a",
          "display": false
        },
        "."
      ],
      "ta": [
        {
          "latex": "2y^2-ay+64=0",
          "fallback": "2y² − ay + 64 = 0",
          "display": false
        },
        " என்ற சமன்பாட்டின் ஒரு மூலம் மற்றதைப் போல இருமடங்கு எனில், a இன் மதிப்புக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Write 2y² − ay + 64 = 0 in standard form Ay² + By + C = 0 (with A = 2, B = −a, C = 64). Let the two roots be α and β; since one root is twice the other, set β = 2α so the two roots are α and 2α.",
        "eq": "Roots are α and 2α; A = 2, B = −a, C = 64",
        "math": {
          "latex": "\\text{Roots}=\\alpha,\\;2\\alpha\\qquad(A=2,\\;B=-a,\\;C=64)",
          "fallback": "Roots are α and 2α; A = 2, B = −a, C = 64",
          "display": true
        },
        "ta": "ஒரு மூலம் மற்றதன் இருமடங்கு என்பதால் மூலங்களை α, 2α எனக் கொள்க. கெழுக்கள் 2, −a, 64.",
        "mathTa": {
          "latex": "\\text{மூலங்கள்}=\\alpha,\\;2\\alpha\\qquad(A=2,\\;B=-a,\\;C=64)",
          "fallback": "மூலங்கள் are α மற்றும் 2α; A = 2, B = −a, C = 64",
          "display": true
        }
      },
      {
        "en": "Use the sum of the roots formula α + β = −B/A to express a in terms of α.",
        "eq": "α + 2α = −(−a)/2; 3α = a/2; a = 6α",
        "math": {
          "latex": "\\begin{aligned}\\alpha+2\\alpha&=-\\dfrac{-a}{2}\\\\3\\alpha&=\\dfrac{a}{2}\\\\a&=6\\alpha\\end{aligned}",
          "fallback": "α + 2α = −(−a)/2; 3α = a/2; a = 6α",
          "display": true
        },
        "ta": "மூலங்களின் கூடுதல் 3α = a/2 என்பதால் a = 6α."
      },
      {
        "en": "Use the product of the roots formula αβ = C/A to solve for α. Divide both sides of 2α² = 32 by 2 to get α² = 16, giving α = 4 or α = −4.",
        "eq": "α(2α) = 64/2; 2α² = 32; α² = 16; α = 4 or α = −4",
        "math": {
          "latex": "\\begin{aligned}\\alpha(2\\alpha)&=\\dfrac{64}{2}\\\\2\\alpha^2&=32\\\\\\alpha^2&=16\\\\\\alpha&=\\pm 4\\end{aligned}",
          "fallback": "α(2α) = 64/2; 2α² = 32; α² = 16; α = 4 or α = −4",
          "display": true
        },
        "ta": "மூலங்களின் பெருக்கற்பலன் 2α² = 32. எனவே α = 4 அல்லது −4."
      },
      {
        "en": "Substitute both values α = −4 and α = 4 into a = 6α to obtain the two possible values of a.",
        "eq": "a = 6(−4) = −24 or a = 6(4) = 24",
        "math": {
          "latex": "\\begin{aligned}\\alpha=-4&:\\;a=6(-4)=-24\\\\\\alpha=4&:\\;a=6(4)=24\\end{aligned}",
          "fallback": "a = 6(−4) = −24 or a = 6(4) = 24",
          "display": true
        },
        "ta": "இரு மதிப்புகளையும் a = 6α இல் பிரதியிட்டால் a = −24 அல்லது 24."
      }
    ],
    "answer": "−24, 24",
    "answerMath": {
      "latex": "-24,\\;24",
      "fallback": "−24, 24",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q5; printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-14-q6",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.14",
    "topic": {
      "en": "Algebra — Finding Unknown Coefficients Using Root Relations",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.14 · Q6",
      "ta": "பயிற்சி 3.14 · வினா 6"
    },
    "title": {
      "en": "Find k when one real root of 3x² + kx + 81 = 0 is the square of the other",
      "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயான தொடர்பு"
    },
    "q": {
      "en": "6. If one root of the equation 3x² + kx + 81 = 0 (having real roots) is the square of the other then find k.",
      "ta": "மெய்யெண்களை மூலங்களாகக் கொண்ட 3x² + kx + 81 = 0 என்ற சமன்பாட்டின் ஒரு மூலம் மற்றொரு மூலத்தின் வர்க்கம் எனில், k இன் மதிப்புக் காண்க."
    },
    "questionMath": {
      "en": [
        "6. If one root of the equation ",
        {
          "latex": "3x^2+kx+81=0",
          "fallback": "3x² + kx + 81 = 0",
          "display": false
        },
        " (having real roots) is the square of the other then find ",
        {
          "latex": "k",
          "fallback": "k",
          "display": false
        },
        "."
      ],
      "ta": [
        "மெய்யெண்களை மூலங்களாகக் கொண்ட ",
        {
          "latex": "3x^2+kx+81=0",
          "fallback": "3x² + kx + 81 = 0",
          "display": false
        },
        " என்ற சமன்பாட்டின் ஒரு மூலம் மற்றொரு மூலத்தின் வர்க்கம் எனில், k இன் மதிப்புக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Compare 3x² + kx + 81 = 0 with ax² + bx + c = 0 (a = 3, b = k, c = 81). Since one root is the square of the other, define the two real roots as α and α².",
        "eq": "Roots are α and α² (with α real); a = 3, b = k, c = 81",
        "math": {
          "latex": "\\text{Roots}=\\alpha,\\;\\alpha^2\\qquad(a=3,\\;b=k,\\;c=81)",
          "fallback": "Roots are α and α² (with α real); a = 3, b = k, c = 81",
          "display": true
        },
        "ta": "ஒரு மூலம் மற்றதன் வர்க்கம் என்பதால் மெய் மூலங்களை α, α² என்க. கெழுக்கள் 3, k, 81.",
        "mathTa": {
          "latex": "\\text{மூலங்கள்}=\\alpha,\\;\\alpha^2\\qquad(a=3,\\;b=k,\\;c=81)",
          "fallback": "மூலங்கள் are α மற்றும் α² (with α real); a = 3, b = k, c = 81",
          "display": true
        }
      },
      {
        "en": "Use the product of the roots formula α · β = c/a. Because 81/3 = 27 and 3³ = 27, the only real solution to α³ = 27 is α = 3 (the problem states the equation has real roots).",
        "eq": "α · α² = 81/3; α³ = 27; since α is real, α = 3",
        "math": {
          "latex": "\\begin{aligned}\\alpha\\cdot\\alpha^2&=\\dfrac{81}{3}\\\\\\alpha^3&=27\\\\\\alpha&=3\\quad(\\text{since }\\alpha\\text{ is real})\\end{aligned}",
          "fallback": "α · α² = 81/3; α³ = 27; since α is real, α = 3",
          "display": true
        },
        "ta": "மூலங்களின் பெருக்கற்பலன் α³ = 81/3 = 27. இதன் மெய் கனமூலம் 3.",
        "mathTa": {
          "latex": "\\begin{aligned}\\alpha\\cdot\\alpha^2&=\\dfrac{81}{3}\\\\\\alpha^3&=27\\\\\\alpha&=3\\quad(\\text{ஏனெனில் }\\alpha\\text{ மெய்யெண்})\\end{aligned}",
          "fallback": "α · α² = 81/3; α³ = 27; ஏனெனில் α மெய்யெண், α = 3",
          "display": true
        }
      },
      {
        "en": "Now use the sum of the roots formula α + α² = −b/a = −k/3, substitute α = 3 (so α² = 9), and multiply both sides by −3 to solve for k.",
        "eq": "3 + 3² = −k/3; 12 = −k/3; k = −36",
        "math": {
          "latex": "\\begin{aligned}\\alpha+\\alpha^2&=-\\dfrac{k}{3}\\\\3+9&=-\\dfrac{k}{3}\\\\12&=-\\dfrac{k}{3}\\\\k&=-36\\end{aligned}",
          "fallback": "3 + 3² = −k/3; 12 = −k/3; k = −36",
          "display": true
        },
        "ta": "மூலங்களின் கூடுதல் 3 + 9 = −k/3 என்பதால் k ஐக் காண்க."
      },
      {
        "en": "Verify: 3x² − 36x + 81 = 3(x² − 12x + 27) = 3(x − 3)(x − 9) = 0, which indeed has real roots 3 and 9 = 3².",
        "eq": "Check: 3(x − 3)(x − 9) = 3x² − 36x + 81 = 0",
        "math": {
          "latex": "\\text{Check: }3(x-3)(x-9)=3x^2-36x+81=0",
          "fallback": "Check: 3(x − 3)(x − 9) = 3x² − 36x + 81 = 0",
          "display": true
        },
        "ta": "k = −36 ஐப் பிரதியிட்டுக் காரணிப்படுத்துக. மூலங்கள் 3 மற்றும் 9; இரண்டாவது மூலம் முதலாவதன் வர்க்கம்.",
        "mathTa": {
          "latex": "\\text{சரிபார்ப்பு: }3(x-3)(x-9)=3x^2-36x+81=0",
          "fallback": "சரிபார்ப்பு: 3(x − 3)(x − 9) = 3x² − 36x + 81 = 0",
          "display": true
        }
      }
    ],
    "answer": "−36",
    "answerMath": {
      "latex": "-36",
      "fallback": "−36",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.14 Q6; printed p. 122, PDF p. 128; Answer Appendix printed p. 339, PDF p. 345; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.14 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
