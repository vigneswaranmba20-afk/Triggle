/* TN SCERT revised 2025, Grade 10 Statistics Ex8.2 Q1–Q3; English source page checked. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='8');
if(!grade||!chapter)throw Error('Grade 10 Statistics Ex8.2 dependencies absent');
const entries=[
  {
    "id": "c10-8-ex8-2-q1",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.2 · Q1",
      "ta": "பயிற்சி 8.2 · வினா 1"
    },
    "title": {
      "en": "Coefficient of variation from standard deviation and mean",
      "ta": "திட்ட விலக்கம், சராசரியிலிருந்து மாறுபாட்டுக் கெழு"
    },
    "q": {
      "en": "1. The standard deviation and mean of a data are 6.5 and 12.5 respectively. Find the coefficient of variation.",
      "ta": "1. ஒரு தரவின் திட்ட விலக்கம் மற்றும் சராசரி ஆகியன முறையே 6.5 மற்றும் 12.5 எனில், மாறுபாட்டுக் கெழுவைக் காண்க."
    },
    "steps": [
      {
        "en": "Write what is given. Symbols: σ (sigma) is the standard deviation, which measures how spread out the data are; x̄ (x-bar) is the mean, the average value; C.V. is the coefficient of variation, which writes the spread as a percentage of the mean so that different data sets can be compared. Formula: C.V. = σ/x̄ × 100%.",
        "eq": "σ = 6.5, x̄ = 12.5; C.V. = σ/x̄ × 100 %",
        "math": {
          "latex": "\\begin{aligned}\\sigma&=6.5,\\quad \\bar{x}=12.5\\\\\\text{C.V.}&=\\dfrac{\\sigma}{\\bar{x}}\\times100\\%\\end{aligned}",
          "display": true,
          "fallback": "σ = 6.5, x̄ = 12.5; C.V. = σ/x̄ × 100 %"
        },
        "ta": "கொடுக்கப்பட்டவற்றை எழுதுக. σ (சிக்மா) என்பது தரவின் பரவலைக் காட்டும் திட்ட விலக்கம்; x̄ என்பது சராசரி; C.V. என்பது சராசரியுடன் ஒப்பிடும் பரவலின் சதவீதமான மாறுபாட்டுக் கெழு. சூத்திரம்: C.V. = (σ/x̄) × 100%."
      },
      {
        "en": "Substitute the two values into the formula.",
        "eq": "C.V. = 6.5/12.5 × 100 %",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{6.5}{12.5}\\times100\\%",
          "display": true,
          "fallback": "C.V. = 6.5/12.5 × 100 %"
        },
        "ta": "கொடுக்கப்பட்ட இரு மதிப்புகளையும் சூத்திரத்தில் பதிலிடுக."
      },
      {
        "en": "Clear the decimals by multiplying the top and bottom by 2: 6.5 × 2 = 13 and 12.5 × 2 = 25.",
        "eq": "6.5/12.5 = 13/25",
        "math": {
          "latex": "\\dfrac{6.5}{12.5}=\\dfrac{13}{25}",
          "display": true,
          "fallback": "6.5/12.5 = 13/25"
        },
        "ta": "பகுதி மற்றும் தொகுதியில் உள்ள தசமங்களை நீக்க இரண்டையும் 2-ஆல் பெருக்குக: 6.5 × 2 = 13; 12.5 × 2 = 25."
      },
      {
        "en": "Multiply by 100. Since 100 ÷ 25 = 4, the fraction becomes 13 × 4.",
        "eq": "C.V. = 13/25 × 100 = 13 × 4 = 52 %",
        "math": {
          "latex": "\\begin{aligned}\\text{C.V.}&=\\dfrac{13}{25}\\times100\\\\&=13\\times4=52\\%\\end{aligned}",
          "display": true,
          "fallback": "C.V. = 13/25 × 100 = 13 × 4 = 52 %"
        },
        "ta": "100-ஆல் பெருக்குக. 100 ÷ 25 = 4 என்பதால் 13 × 4 கிடைக்கும்."
      },
      {
        "en": "Check by reversing: 52 % of the mean should be the standard deviation: 0.52 × 12.5 = 6.5.",
        "eq": "0.52 × 12.5 = 6.5 ✓",
        "math": {
          "latex": "0.52\\times12.5=6.5\\ \\checkmark",
          "display": true,
          "fallback": "0.52 × 12.5 = 6.5 ✓"
        },
        "ta": "சரிபார்க்க: சராசரியின் 52% திட்ட விலக்கத்திற்குச் சமமாக இருக்க வேண்டும். 0.52 × 12.5 = 6.5."
      }
    ],
    "answer": {
      "en": "The coefficient of variation is 52 %.",
      "ta": "மாறுபாட்டுக் கெழு 52%."
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 316 / PDF p. 322 (page text and image checked); Tamil printed p. 325 / PDF p. 331 (numerical evidence from the verified source inventory docs/trace/source-inventories/g10-ch8-ex8-2.json). Tamil editorial approval and teacher review not claimed. Tamil question wording source-checked against revised 2025 printed pp.325-326; teacher/editorial verification of Tamil explanations pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{C.V.}=52\\%}",
      "display": true,
      "fallback": "The coefficient of variation is 52 %."
    },
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-2-q2",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.2 · Q2",
      "ta": "பயிற்சி 8.2 · வினா 2"
    },
    "title": {
      "en": "Mean from standard deviation and coefficient of variation",
      "ta": "திட்ட விலக்கம், மாறுபாட்டுக் கெழுவிலிருந்து சராசரி"
    },
    "q": {
      "en": "2. The standard deviation and coefficient of variation of a data are 1.2 and 25.6 respectively. Find the value of mean.",
      "ta": "2. ஒரு தரவின் திட்ட விலக்கம் மற்றும் மாறுபாட்டுக் கெழு ஆகியன முறையே 1.2 மற்றும் 25.6 எனில், அதன் சராசரியைக் காண்க."
    },
    "steps": [
      {
        "en": "Write what is given. Symbols: σ (sigma) is the standard deviation, which measures how spread out the data are; x̄ (x-bar) is the mean, the average value; C.V. is the coefficient of variation, which writes the spread as a percentage of the mean so that different data sets can be compared. Formula: C.V. = σ/x̄ × 100%. Here the mean x̄ is unknown.",
        "eq": "σ = 1.2, C.V. = 25.6 %; C.V. = σ/x̄ × 100 %",
        "math": {
          "latex": "\\begin{aligned}\\sigma&=1.2,\\quad \\text{C.V.}=25.6\\%\\\\\\text{C.V.}&=\\dfrac{\\sigma}{\\bar{x}}\\times100\\end{aligned}",
          "display": true,
          "fallback": "σ = 1.2, C.V. = 25.6 %; C.V. = σ/x̄ × 100 %"
        },
        "ta": "கொடுக்கப்பட்டவற்றை எழுதுக. σ என்பது திட்ட விலக்கம்; x̄ என்பது சராசரி; C.V. என்பது மாறுபாட்டுக் கெழு. C.V. = (σ/x̄) × 100%. இங்கு சராசரி x̄ தெரியாதது."
      },
      {
        "en": "Substitute the known values.",
        "eq": "25.6 = 1.2/x̄ × 100",
        "math": {
          "latex": "25.6=\\dfrac{1.2}{\\bar{x}}\\times100",
          "display": true,
          "fallback": "25.6 = 1.2/x̄ × 100"
        },
        "ta": "தெரிந்த மதிப்புகளைச் சூத்திரத்தில் பதிலிடுக."
      },
      {
        "en": "Multiply both sides by x̄ and divide both sides by 25.6 to get x̄ alone.",
        "eq": "x̄ = 1.2 × 100/25.6",
        "math": {
          "latex": "\\bar{x}=\\dfrac{1.2\\times100}{25.6}",
          "display": true,
          "fallback": "x̄ = 1.2 × 100/25.6"
        },
        "ta": "சராசரி x̄-ஐத் தனியாகப் பெற இருபக்கங்களையும் x̄-ஆல் பெருக்கி, பின்னர் 25.6-ஆல் வகுக்கவும்."
      },
      {
        "en": "Simplify: 1.2 × 100 = 120. Multiply top and bottom by 10 to remove the decimal, then divide both by 16.",
        "eq": "x̄ = 120/25.6 = 1200/256 = 75/16",
        "math": {
          "latex": "\\begin{aligned}\\bar{x}&=\\dfrac{120}{25.6}=\\dfrac{1200}{256}\\\\&=\\dfrac{75}{16}\\end{aligned}",
          "display": true,
          "fallback": "x̄ = 120/25.6 = 1200/256 = 75/16"
        },
        "ta": "1.2 × 100 = 120. தசமத்தை நீக்க தொகுதியையும் பகுதியையும் 10-ஆல் பெருக்கி, பின்னர் 16-ஆல் வகுத்து எளிமைப்படுத்துக."
      },
      {
        "en": "Write 75/16 as a decimal: 75 ÷ 16 = 4.6875.",
        "eq": "x̄ = 4.6875",
        "math": {
          "latex": "\\bar{x}=4.6875",
          "display": true,
          "fallback": "x̄ = 4.6875"
        },
        "ta": "75/16 என்ற பின்னத்தைத் தசமமாக மாற்றுக: 75 ÷ 16 = 4.6875."
      },
      {
        "en": "Check: with this mean, C.V. = 1.2/4.6875 × 100 = 25.6 %.",
        "eq": "1.2/4.6875 × 100 = 25.6 ✓",
        "math": {
          "latex": "\\dfrac{1.2}{4.6875}\\times100=25.6\\ \\checkmark",
          "display": true,
          "fallback": "1.2/4.6875 × 100 = 25.6 ✓"
        },
        "ta": "சரிபார்க்க: இச்சராசரியுடன் C.V. = (1.2/4.6875) × 100 = 25.6%."
      }
    ],
    "answer": {
      "en": "The mean is 75/16 = 4.6875.",
      "ta": "சராசரி 75/16 = 4.6875."
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 316 / PDF p. 322 (page text and image checked); Tamil printed p. 325 / PDF p. 331 (numerical evidence from the verified source inventory docs/trace/source-inventories/g10-ch8-ex8-2.json). Tamil editorial approval and teacher review not claimed. Tamil question wording source-checked against revised 2025 printed pp.325-326; teacher/editorial verification of Tamil explanations pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\bar{x}=\\dfrac{75}{16}=4.6875}",
      "display": true,
      "fallback": "The mean is 75/16 = 4.6875."
    },
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-2-q3",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.2 · Q3",
      "ta": "பயிற்சி 8.2 · வினா 3"
    },
    "title": {
      "en": "Standard deviation from mean and coefficient of variation",
      "ta": "சராசரி, மாறுபாட்டுக் கெழுவிலிருந்து திட்ட விலக்கம்"
    },
    "q": {
      "en": "3. If the mean and coefficient of variation of a data are 15 and 48 respectively, then find the value of standard deviation.",
      "ta": "3. ஒரு தரவின் சராசரி மற்றும் மாறுபாட்டுக் கெழு முறையே 15 மற்றும் 48 எனில், அதன் திட்ட விலக்கத்தைக் காண்க."
    },
    "steps": [
      {
        "en": "Write what is given. Symbols: σ (sigma) is the standard deviation, which measures how spread out the data are; x̄ (x-bar) is the mean, the average value; C.V. is the coefficient of variation, which writes the spread as a percentage of the mean so that different data sets can be compared. Formula: C.V. = σ/x̄ × 100%. Here the standard deviation σ is unknown.",
        "eq": "x̄ = 15, C.V. = 48 %; C.V. = σ/x̄ × 100 %",
        "math": {
          "latex": "\\begin{aligned}\\bar{x}&=15,\\quad \\text{C.V.}=48\\%\\\\\\text{C.V.}&=\\dfrac{\\sigma}{\\bar{x}}\\times100\\end{aligned}",
          "display": true,
          "fallback": "x̄ = 15, C.V. = 48 %; C.V. = σ/x̄ × 100 %"
        },
        "ta": "கொடுக்கப்பட்டவற்றை எழுதுக. σ என்பது திட்ட விலக்கம்; x̄ என்பது சராசரி; C.V. என்பது மாறுபாட்டுக் கெழு. C.V. = (σ/x̄) × 100%. இங்கு σ தெரியாதது."
      },
      {
        "en": "Substitute the known values.",
        "eq": "48 = σ/15 × 100",
        "math": {
          "latex": "48=\\dfrac{\\sigma}{15}\\times100",
          "display": true,
          "fallback": "48 = σ/15 × 100"
        },
        "ta": "தெரிந்த மதிப்புகளைச் சூத்திரத்தில் பதிலிடுக."
      },
      {
        "en": "Multiply both sides by 15 and divide both sides by 100 to get σ alone.",
        "eq": "σ = 48 × 15/100",
        "math": {
          "latex": "\\sigma=\\dfrac{48\\times15}{100}",
          "display": true,
          "fallback": "σ = 48 × 15/100"
        },
        "ta": "σ-ஐத் தனியாகப் பெற இருபக்கங்களையும் 15-ஆல் பெருக்கி, 100-ஆல் வகுக்கவும்."
      },
      {
        "en": "Multiply: 48 × 15 = 720.",
        "eq": "σ = 720/100",
        "math": {
          "latex": "\\sigma=\\dfrac{720}{100}",
          "display": true,
          "fallback": "σ = 720/100"
        },
        "ta": "பெருக்குக: 48 × 15 = 720."
      },
      {
        "en": "Divide: 720 ÷ 100 = 7.2.",
        "eq": "σ = 7.2",
        "math": {
          "latex": "\\sigma=7.2",
          "display": true,
          "fallback": "σ = 7.2"
        },
        "ta": "வகுக்கவும்: 720 ÷ 100 = 7.2."
      },
      {
        "en": "Check: C.V. = 7.2/15 × 100 = 0.48 × 100 = 48 %.",
        "eq": "7.2/15 × 100 = 48 ✓",
        "math": {
          "latex": "\\dfrac{7.2}{15}\\times100=48\\ \\checkmark",
          "display": true,
          "fallback": "7.2/15 × 100 = 48 ✓"
        },
        "ta": "சரிபார்க்க: C.V. = (7.2/15) × 100 = 48%."
      }
    ],
    "answer": {
      "en": "The standard deviation is 7.2.",
      "ta": "திட்ட விலக்கம் 7.2."
    },
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 316 / PDF p. 322 (page text and image checked); Tamil printed p. 325 / PDF p. 331 (numerical evidence from the verified source inventory docs/trace/source-inventories/g10-ch8-ex8-2.json). Tamil editorial approval and teacher review not claimed. Tamil question wording source-checked against revised 2025 printed pp.325-326; teacher/editorial verification of Tamil explanations pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\sigma=7.2}",
      "display": true,
      "fallback": "The standard deviation is 7.2."
    },
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
for(const item of entries){if(ids.has(item.id))throw Error('Duplicate textbook ID '+item.id);ids.add(item.id);}
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
