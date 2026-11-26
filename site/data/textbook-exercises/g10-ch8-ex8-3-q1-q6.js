/* TN SCERT revised 2025, Grade 10 Statistics and Probability Ex8.3 Q1–Q6 (9 parts); English and Tamil source pages checked. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='8');
if(!grade||!chapter)throw Error('Grade 10 Statistics and Probability Ex8.3 dependencies absent');
const SOURCE_EN='https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view';
const REF_322='TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 322 / PDF p. 328 (page text and image checked); Tamil printed p. 334 / PDF p. 340 (page text and image checked). Answer key checked: English printed p. 342 / PDF p. 348, Tamil printed p. 357 / PDF p. 363. Tamil editorial approval and teacher review pending.';
const entries=[
  {
    "id": "c10-8-ex8-3-q1",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q1",
      "ta": "பயிற்சி 8.3 · வினா 1"
    },
    "title": {
      "en": "Sample space for tossing three coins (tree diagram)",
      "ta": "மூன்று நாணயங்கள் சுண்டும்போது கிடைக்கும் கூறுவெளி (மர வரைபடம்)"
    },
    "q": {
      "en": "1. Write the sample space for tossing three coins using tree diagram.",
      "ta": "1. மூன்று நாணயங்கள் சுண்டப்படும்பொழுது கிடைக்கும் கூறுவெளியை மர வரைபடத்தைப் பயன்படுத்தி எழுதுக."
    },
    "figureSrc": "assets/grade10-ch8/ex8-3-q1-tree.svg",
    "figureSrcTa": "assets/grade10-ch8/ta/ex8-3-q1-tree.svg",
    "figureAlt": {
      "en": "Tree diagram for tossing three fair coins: 1st coin branches to H or T, 2nd coin branches to H or T, 3rd coin branches to H or T, yielding 8 outcomes from HHH to TTT.",
      "ta": "மூன்று நாணயங்களைச் சுண்டும் மர வரைபடம்: முதல், இரண்டாம், மூன்றாம் நாணயங்கள் ஒவ்வொன்றும் H அல்லது T எனக் கிளைத்து HHH முதல் TTT வரை 8 விளைவுகளைத் தருகிறது."
    },
    "figureCaption": {
      "en": "Tree diagram for tossing three coins (8 outcomes)",
      "ta": "மூன்று நாணயங்கள் சுண்டும் மர வரைபடம் (8 விளைவுகள்)"
    },
    "steps": [
      {
        "en": "Each coin toss has 2 possible outcomes: Head (H) or Tail (T). Draw the first level of the tree diagram with 2 branches: H and T.",
        "eq": "1st coin: {H, T} (2 branches)",
        "math": {
          "latex": "\\text{1st coin: } \\{H,\\ T\\} \\quad (2\\text{ branches})",
          "display": true,
          "fallback": "1st coin: {H, T} (2 branches)"
        },
        "ta": "ஒவ்வொரு நாணயத்திற்கும் தலை (H) அல்லது பூ (T) என 2 விளைவுகள் உள்ளன. மர வரைபடத்தின் முதல் நிலையில் H மற்றும் T என 2 கிளைகளை வரைக."
      },
      {
        "en": "From each outcome of the first coin, draw 2 branches (H and T) for the second coin, giving 2 × 2 = 4 partial outcomes: HH, HT, TH, TT.",
        "eq": "After 2nd coin: {HH, HT, TH, TT} (4 branches)",
        "math": {
          "latex": "\\text{After 2nd coin: } \\{HH,\\ HT,\\ TH,\\ TT\\} \\quad (2\\times 2=4)",
          "display": true,
          "fallback": "After 2nd coin: {HH, HT, TH, TT} (4 branches)"
        },
        "ta": "முதல் நாணயத்தின் ஒவ்வொரு விளைவிலிருந்தும் இரண்டாவது நாணயத்திற்காக H, T என 2 கிளைகளை வரைக. இதனால் 2 × 2 = 4 விளைவுகள் (HH, HT, TH, TT) கிடைக்கும்."
      },
      {
        "en": "From each of those 4 branches, draw 2 branches (H and T) for the third coin. Follow every root-to-leaf path to list all 8 outcomes in the sample space S.",
        "eq": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8",
        "math": {
          "latex": "\\begin{aligned}S&=\\{HHH,\\ HHT,\\ HTH,\\ HTT,\\\\&\\qquad\\ THH,\\ THT,\\ TTH,\\ TTT\\}\\\\n(S)&=2^3=8\\end{aligned}",
          "display": true,
          "fallback": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8"
        },
        "ta": "அந்த 4 கிளைகள் ஒவ்வொன்றிலிருந்தும் மூன்றாவது நாணயத்திற்காக H, T என 2 கிளைகளை வரைந்து, தொடக்கம் முதல் முடிவு வரை உள்ள அனைத்துப் பாதைகளையும் எழுதுக."
      }
    ],
    "answer": {
      "en": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}",
      "ta": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}"
    },
    "answerMath": {
      "latex": "\\boxed{S=\\{HHH,\\ HHT,\\ HTH,\\ HTT,\\ THH,\\ THT,\\ TTH,\\ TTT\\}}",
      "display": true,
      "fallback": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q2",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q2",
      "ta": "பயிற்சி 8.3 · வினா 2"
    },
    "title": {
      "en": "Sample space for selecting two balls from 6 balls (tree diagram)",
      "ta": "6 பந்துகளிலிருந்து இரு பந்துகள் எடுப்பதற்கான கூறுவெளி (மர வரைபடம்)"
    },
    "q": {
      "en": "2. Write the sample space for selecting two balls at a time from a bag containing 6 balls numbered 1 to 6 (using tree diagram).",
      "ta": "2. ஒரு பையிலுள்ள 1 முதல் 6 வரை எண்கள் குறிக்கப்பட்ட 6 பந்துகளிலிருந்து, ஒரே நேரத்தில் இரண்டு பந்துகள் எடுப்பதற்கான கூறுவெளியை மர வரைபடம் மூலமாகக் குறிப்பிடுக."
    },
    "figureSrc": "assets/grade10-ch8/ex8-3-q2-tree.svg",
    "figureSrcTa": "assets/grade10-ch8/ta/ex8-3-q2-tree.svg",
    "figureAlt": {
      "en": "Tree diagram with 6 first-pick branches (1 to 6) and 5 second-pick branches each (excluding the first ball), showing 30 ordered pairs.",
      "ta": "முதல் தேர்வில் 1 முதல் 6 வரை 6 கிளைகளும், ஒவ்வொன்றிலிருந்தும் மீதமுள்ள 5 பந்துகளுக்கான கிளைகளும் கொண்ட மர வரைபடம்; மொத்தம் 30 வரிசைச் சோடிகள்."
    },
    "figureCaption": {
      "en": "Tree diagram for 1st and 2nd picks from 6 balls (30 ordered pairs)",
      "ta": "6 பந்துகளிலிருந்து 1-ஆம் மற்றும் 2-ஆம் தேர்வு மர வரைபடம் (30 வரிசைச் சோடிகள்)"
    },
    "steps": [
      {
        "en": "In the tree diagram, label the first level as the 1st pick (balls 1, 2, 3, 4, 5, 6) and the second level as the 2nd pick from the remaining 5 balls (no ball can be paired with itself).",
        "eq": "1st pick: 6 choices; 2nd pick: 5 remaining choices (j ≠ i)",
        "math": {
          "latex": "\\text{1st pick: }6\\text{ choices},\\quad \\text{2nd pick: }5\\text{ remaining choices } (j\\neq i)",
          "display": true,
          "fallback": "1st pick: 6 choices; 2nd pick: 5 remaining choices (j ≠ i)"
        },
        "ta": "மர வரைபடத்தில் முதல் நிலையை 1-ஆம் தேர்வு (பந்துகள் 1 முதல் 6) எனவும், இரண்டாம் நிலையை மீதமுள்ள 5 பந்துகளிலிருந்து 2-ஆம் தேர்வு எனவும் குறிக்கவும் (ஒரே பந்து இருமுறை வராது)."
      },
      {
        "en": "List the ordered pairs (1st pick, 2nd pick) from all 6 × 5 = 30 branches. Note that each of the 15 unordered pairs {i, j} appears in two orders: (i, j) and (j, i).",
        "eq": "n(S) = 6 × 5 = 30 ordered pairs",
        "math": {
          "latex": "\\begin{aligned}S=\\{&(1,2),(1,3),(1,4),(1,5),(1,6),\\\\&(2,1),(2,3),(2,4),(2,5),(2,6),\\\\&(3,1),(3,2),(3,4),(3,5),(3,6),\\\\&(4,1),(4,2),(4,3),(4,5),(4,6),\\\\&(5,1),(5,2),(5,3),(5,4),(5,6),\\\\&(6,1),(6,2),(6,3),(6,4),(6,5)\\}\\end{aligned}",
          "display": true,
          "fallback": "n(S) = 6 × 5 = 30 ordered pairs"
        },
        "ta": "அனைத்து 6 × 5 = 30 கிளைகளிலிருந்தும் கிடைக்கும் வரிசைச் சோடிகளை எழுதுக. 15 வரிசையற்ற சோடிகள் ஒவ்வொன்றும் (i, j) மற்றும் (j, i) என இரு வரிசைகளில் இடம்பெறும்."
      }
    ],
    "answer": {
      "en": "S = {(1,2),(1,3),(1,4),(1,5),(1,6), (2,1),(2,3),(2,4),(2,5),(2,6), (3,1),(3,2),(3,4),(3,5),(3,6), (4,1),(4,2),(4,3),(4,5),(4,6), (5,1),(5,2),(5,3),(5,4),(5,6), (6,1),(6,2),(6,3),(6,4),(6,5)}",
      "ta": "S = {(1,2),(1,3),(1,4),(1,5),(1,6), (2,1),(2,3),(2,4),(2,5),(2,6), (3,1),(3,2),(3,4),(3,5),(3,6), (4,1),(4,2),(4,3),(4,5),(4,6), (5,1),(5,2),(5,3),(5,4),(5,6), (6,1),(6,2),(6,3),(6,4),(6,5)}"
    },
    "answerMath": {
      "en": {
        "latex": "\\boxed{n(S)=30\\text{ ordered pairs }(i,j)\\text{ with }i\\neq j}",
        "display": true,
        "fallback": "S = {(1,2),(1,3),(1,4),(1,5),(1,6), (2,1),(2,3),(2,4),(2,5),(2,6), (3,1),(3,2),(3,4),(3,5),(3,6), (4,1),(4,2),(4,3),(4,5),(4,6), (5,1),(5,2),(5,3),(5,4),(5,6), (6,1),(6,2),(6,3),(6,4),(6,5)}"
      },
      "ta": {
        "latex": "\\begin{gathered}S=\\{(i,j):i,j\\in\\{1,2,3,4,5,6\\},\\ i\\ne j\\}\\\\n(S)=30\\text{ வரிசைச் சோடிகள்}\\end{gathered}",
        "display": true,
        "fallback": "S = {(1,2),(1,3),(1,4),(1,5),(1,6), (2,1),(2,3),(2,4),(2,5),(2,6), (3,1),(3,2),(3,4),(3,5),(3,6), (4,1),(4,2),(4,3),(4,5),(4,6), (5,1),(5,2),(5,3),(5,4),(5,6), (6,1),(6,2),(6,3),(6,4),(6,5)}"
      }
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q3-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q3(i)",
      "ta": "பயிற்சி 8.3 · வினா 3(i)"
    },
    "title": {
      "en": "Complement probability from ratio P(A) : P(Ā)",
      "ta": "P(A) : P(Ā) விகிதத்திலிருந்து நிரப்பு நிகழ்ச்சியின் நிகழ்தகவு"
    },
    "q": {
      "en": "3. If A is an event of a random experiment such that P(A) : P(Ā) = 17 : 15 and n(S) = 640 then find (i) P(Ā)",
      "ta": "3. ஒரு சமவாய்ப்புச் சோதனையில் ஒரு நிகழ்ச்சி A என்க. இங்கு P(A) : P(Ā) = 17 : 15 மற்றும் n(S) = 640 எனில், (i) P(Ā) -ஐக் காண்க."
    },
    "questionMath": {
      "en": [
        "3. If ",
        {"latex": "A", "display": false, "fallback": "A"},
        " is an event of a random experiment such that ",
        {"latex": "P(A) : P(\\overline{A}) = 17 : 15", "display": false, "fallback": "P(A) : P(Ā) = 17 : 15"},
        " and ",
        {"latex": "n(S) = 640", "display": false, "fallback": "n(S) = 640"},
        " then find (i) ",
        {"latex": "P(\\overline{A})", "display": false, "fallback": "P(Ā)"}
      ],
      "ta": [
        "3. ஒரு சமவாய்ப்புச் சோதனையில் ஒரு நிகழ்ச்சி ",
        {"latex": "A", "display": false, "fallback": "A"},
        " என்க. இங்கு ",
        {"latex": "P(A) : P(\\overline{A}) = 17 : 15", "display": false, "fallback": "P(A) : P(Ā) = 17 : 15"},
        " மற்றும் ",
        {"latex": "n(S) = 640", "display": false, "fallback": "n(S) = 640"},
        " எனில், (i) ",
        {"latex": "P(\\overline{A})", "display": false, "fallback": "P(Ā)"},
        " -ஐக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Write the given ratio using a common positive multiplier k: P(A) = 17k and P(Ā) = 15k.",
        "eq": "P(A) = 17k, P(Ā) = 15k",
        "math": {
          "latex": "P(A)=17k,\\quad P(\\overline{A})=15k",
          "display": true,
          "fallback": "P(A) = 17k, P(Ā) = 15k"
        },
        "ta": "கொடுக்கப்பட்ட விகிதத்தைப் பொதுப் பெருக்கி k கொண்டு எழுதுக: P(A) = 17k மற்றும் P(Ā) = 15k."
      },
      {
        "en": "Use the complement rule P(A) + P(Ā) = 1 to solve for k.",
        "eq": "17k + 15k = 1 ⇒ 32k = 1 ⇒ k = 1/32",
        "math": {
          "latex": "\\begin{aligned}P(A)+P(\\overline{A})&=1\\\\17k+15k&=1\\\\32k&=1\\implies k=\\dfrac{1}{32}\\end{aligned}",
          "display": true,
          "fallback": "17k + 15k = 1 ⇒ 32k = 1 ⇒ k = 1/32"
        },
        "ta": "நிரப்பு நிகழ்ச்சி விதி P(A) + P(Ā) = 1 என்பதைப் பயன்படுத்தி k மதிப்பைக் காண்க."
      },
      {
        "en": "Substitute k = 1/32 into P(Ā) = 15k.",
        "eq": "P(Ā) = 15 × (1/32) = 15/32",
        "math": {
          "latex": "P(\\overline{A})=15\\times\\dfrac{1}{32}=\\dfrac{15}{32}",
          "display": true,
          "fallback": "P(Ā) = 15 × (1/32) = 15/32"
        },
        "ta": "k = 1/32 என்பதை P(Ā) = 15k-இல் பதிலிடுக."
      }
    ],
    "answer": {
      "en": "P(Ā) = 15/32",
      "ta": "P(Ā) = 15/32"
    },
    "answerMath": {
      "latex": "\\boxed{P(\\overline{A})=\\dfrac{15}{32}}",
      "display": true,
      "fallback": "P(Ā) = 15/32"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q3-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q3(ii)",
      "ta": "பயிற்சி 8.3 · வினா 3(ii)"
    },
    "title": {
      "en": "Number of outcomes in event A from P(A) : P(Ā) and n(S)",
      "ta": "P(A) : P(Ā) மற்றும் n(S) ஆகியவற்றிலிருந்து n(A) காணல்"
    },
    "q": {
      "en": "3. If A is an event of a random experiment such that P(A) : P(Ā) = 17 : 15 and n(S) = 640 then find (ii) n(A).",
      "ta": "3. ஒரு சமவாய்ப்புச் சோதனையில் ஒரு நிகழ்ச்சி A என்க. இங்கு P(A) : P(Ā) = 17 : 15 மற்றும் n(S) = 640 எனில், (ii) n(A) -ஐக் காண்க."
    },
    "questionMath": {
      "en": [
        "3. If ",
        {"latex": "A", "display": false, "fallback": "A"},
        " is an event of a random experiment such that ",
        {"latex": "P(A) : P(\\overline{A}) = 17 : 15", "display": false, "fallback": "P(A) : P(Ā) = 17 : 15"},
        " and ",
        {"latex": "n(S) = 640", "display": false, "fallback": "n(S) = 640"},
        " then find (ii) ",
        {"latex": "n(A)", "display": false, "fallback": "n(A)"},
        "."
      ],
      "ta": [
        "3. ஒரு சமவாய்ப்புச் சோதனையில் ஒரு நிகழ்ச்சி ",
        {"latex": "A", "display": false, "fallback": "A"},
        " என்க. இங்கு ",
        {"latex": "P(A) : P(\\overline{A}) = 17 : 15", "display": false, "fallback": "P(A) : P(Ā) = 17 : 15"},
        " மற்றும் ",
        {"latex": "n(S) = 640", "display": false, "fallback": "n(S) = 640"},
        " எனில், (ii) ",
        {"latex": "n(A)", "display": false, "fallback": "n(A)"},
        " -ஐக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "From part (i), P(Ā) = 15/32, so P(A) = 1 − P(Ā) = 17/32 (or directly 17k = 17/32).",
        "eq": "P(A) = 1 − 15/32 = 17/32",
        "math": {
          "latex": "P(A)=1-P(\\overline{A})=1-\\dfrac{15}{32}=\\dfrac{17}{32}",
          "display": true,
          "fallback": "P(A) = 1 − 15/32 = 17/32"
        },
        "ta": "பகுதி (i)-லிருந்து P(Ā) = 15/32 என்பதால், P(A) = 1 − 15/32 = 17/32 ஆகும்."
      },
      {
        "en": "Use P(A) = n(A)/n(S) with n(S) = 640 to find n(A).",
        "eq": "n(A) = P(A) × n(S) = (17/32) × 640 = 17 × 20 = 340",
        "math": {
          "latex": "\\begin{aligned}P(A)&=\\dfrac{n(A)}{n(S)}\\\\\\dfrac{17}{32}&=\\dfrac{n(A)}{640}\\\\n(A)&=\\dfrac{17}{32}\\times 640=17\\times 20=340\\end{aligned}",
          "display": true,
          "fallback": "n(A) = P(A) × n(S) = (17/32) × 640 = 17 × 20 = 340"
        },
        "ta": "P(A) = n(A)/n(S) என்ற சூத்திரத்தில் n(S) = 640 எனப் பதிலிட்டு n(A)-ஐக் காண்க."
      }
    ],
    "answer": {
      "en": "n(A) = 340",
      "ta": "n(A) = 340"
    },
    "answerMath": {
      "latex": "\\boxed{n(A)=340}",
      "display": true,
      "fallback": "n(A) = 340"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q4",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q4",
      "ta": "பயிற்சி 8.3 · வினா 4"
    },
    "title": {
      "en": "Probability of two consecutive tails in three coin tosses",
      "ta": "மூன்று முறை நாணயம் சுண்டும்போது இரண்டு அடுத்தடுத்த பூக்கள்"
    },
    "q": {
      "en": "4. A coin is tossed thrice. What is the probability of getting two consecutive tails?",
      "ta": "4. ஒரு நாணயம் மூன்று முறை சுண்டப்படுகிறது. இரண்டு அடுத்தடுத்த பூக்கள் கிடைப்பதற்கான நிகழ்தகவு என்ன?"
    },
    "steps": [
      {
        "en": "List the sample space S for tossing a coin three times; there are n(S) = 8 equally likely outcomes.",
        "eq": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8",
        "math": {
          "latex": "\\begin{aligned}S&=\\{HHH,\\ HHT,\\ HTH,\\ HTT,\\ THH,\\ THT,\\ TTH,\\ TTT\\}\\\\n(S)&=8\\end{aligned}",
          "display": true,
          "fallback": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8"
        },
        "ta": "ஒரு நாணயம் மூன்று முறை சுண்டப்படும்போது கிடைக்கும் கூறுவெளி S-ஐ எழுதுக; n(S) = 8."
      },
      {
        "en": "Let A be the event of getting two consecutive tails. Notice TTT also contains two consecutive tails, so A = {HTT, TTH, TTT} and n(A) = 3.",
        "eq": "A = {HTT, TTH, TTT}, n(A) = 3",
        "math": {
          "latex": "A=\\{HTT,\\ TTH,\\ TTT\\},\\quad n(A)=3",
          "display": true,
          "fallback": "A = {HTT, TTH, TTT}, n(A) = 3"
        },
        "ta": "இரண்டு அடுத்தடுத்த பூக்கள் கிடைக்கும் நிகழ்ச்சி A என்க. TTT என்பதிலும் இரண்டு அடுத்தடுத்த பூக்கள் உள்ளதால் A = {HTT, TTH, TTT}, n(A) = 3."
      },
      {
        "en": "Compute P(A) = n(A)/n(S).",
        "eq": "P(A) = 3/8",
        "math": {
          "latex": "P(A)=\\dfrac{n(A)}{n(S)}=\\dfrac{3}{8}",
          "display": true,
          "fallback": "P(A) = 3/8"
        },
        "ta": "நிகழ்தகவு P(A) = n(A)/n(S) = 3/8."
      }
    ],
    "answer": {
      "en": "3/8",
      "ta": "3/8"
    },
    "answerMath": {
      "latex": "\\boxed{\\dfrac{3}{8}}",
      "display": true,
      "fallback": "3/8"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q5-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q5(i)",
      "ta": "பயிற்சி 8.3 · வினா 5(i)"
    },
    "title": {
      "en": "First player wins a prize (perfect square > 500)",
      "ta": "முதலில் விளையாடுபவர் பரிசு பெற நிகழ்தகவு (500-ஐ விடப் பெரிய வர்க்க எண்)"
    },
    "q": {
      "en": "5. At a fete, cards bearing numbers 1 to 1000, one number on one card are put in a box. Each player selects one card at random and that card is not replaced. If the selected card has a perfect square number greater than 500, the player wins a prize. What is the probability that (i) the first player wins a prize",
      "ta": "5. ஒரு பொது விழாவில், 1 முதல் 1000 வரை எண்களிட்ட அட்டைகள் ஒரு பெட்டியில் வைக்கப்பட்டுள்ளன. விளையாடும் ஒவ்வொருவரும் ஒரு அட்டையைச் சமவாய்ப்பு முறையில் எடுக்கிறார்கள். எடுத்த அட்டை திரும்ப வைக்கப்படவில்லை. தேர்ந்தெடுக்கப்பட்ட அட்டையில் எண் 500-ஐ விட அதிகமாக உள்ள வர்க்க எண் இருந்தால், அவர் வெற்றிக்கான பரிசைப் பெறுவார். (i) முதலில் விளையாடுபவர் பரிசு பெற நிகழ்தகவைக் காண்க."
    },
    "steps": [
      {
        "en": "The box has cards numbered 1 to 1000, so the total number of outcomes for the first player is n(S) = 1000.",
        "eq": "n(S) = 1000",
        "math": {
          "latex": "n(S)=1000",
          "display": true,
          "fallback": "n(S) = 1000"
        },
        "ta": "பெட்டியில் 1 முதல் 1000 வரை எண்களிட்ட அட்டைகள் உள்ளதால், முதல் வீரருக்கான மொத்த வாய்ப்புகள் n(S) = 1000."
      },
      {
        "en": "Find all perfect squares strictly greater than 500 and up to 1000. Since 22² = 484 ≤ 500 and 32² = 1024 > 1000, the winning squares are 23² through 31².",
        "eq": "A = {529, 576, 625, 676, 729, 784, 841, 900, 961}, n(A) = 9",
        "math": {
          "latex": "\\begin{aligned}22^2&=484<500,\\quad 32^2=1024>1000\\\\A&=\\{23^2,24^2,\\dots,31^2\\}\\\\&=\\{529,\\ 576,\\ 625,\\ 676,\\ 729,\\ 784,\\ 841,\\ 900,\\ 961\\}\\\\n(A)&=9\\end{aligned}",
          "display": true,
          "fallback": "A = {529, 576, 625, 676, 729, 784, 841, 900, 961}, n(A) = 9"
        },
        "ta": "500-ஐ விட அதிகமாகவும் 1000-க்கு உள்ளாகவும் உள்ள வர்க்க எண்களைக் காண்க: 22² = 484 மற்றும் 32² = 1024 என்பதால் 23² முதல் 31² வரை 9 வர்க்க எண்கள் உள்ளன."
      },
      {
        "en": "Compute the probability that the first player wins: P(A) = n(A)/n(S).",
        "eq": "P(A) = 9/1000",
        "math": {
          "latex": "P(A)=\\dfrac{n(A)}{n(S)}=\\dfrac{9}{1000}",
          "display": true,
          "fallback": "P(A) = 9/1000"
        },
        "ta": "முதலில் விளையாடுபவர் பரிசு பெறுவதற்கான நிகழ்தகவு P(A) = 9/1000."
      }
    ],
    "answer": {
      "en": "9/1000",
      "ta": "9/1000"
    },
    "answerMath": {
      "latex": "\\boxed{\\dfrac{9}{1000}}",
      "display": true,
      "fallback": "9/1000"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q5-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q5(ii)",
      "ta": "பயிற்சி 8.3 · வினா 5(ii)"
    },
    "title": {
      "en": "Second player wins a prize given first won (without replacement)",
      "ta": "முதலாமவர் வெற்றி பெற்ற பிறகு இரண்டாமவர் வெற்றி பெற நிகழ்தகவு"
    },
    "q": {
      "en": "5. At a fete, cards bearing numbers 1 to 1000, one number on one card are put in a box. Each player selects one card at random and that card is not replaced. If the selected card has a perfect square number greater than 500, the player wins a prize. What is the probability that (ii) the second player wins a prize, if the first has won?",
      "ta": "5. ஒரு பொது விழாவில், 1 முதல் 1000 வரை எண்களிட்ட அட்டைகள் ஒரு பெட்டியில் வைக்கப்பட்டுள்ளன. விளையாடும் ஒவ்வொருவரும் ஒரு அட்டையைச் சமவாய்ப்பு முறையில் எடுக்கிறார்கள். எடுத்த அட்டை திரும்ப வைக்கப்படவில்லை. தேர்ந்தெடுக்கப்பட்ட அட்டையில் எண் 500-ஐ விட அதிகமாக உள்ள வர்க்க எண் இருந்தால், அவர் வெற்றிக்கான பரிசைப் பெறுவார். (ii) முதலாமவர் வெற்றி பெற்ற பிறகு, இரண்டாவதாக விளையாடுபவர் வெற்றி பெற நிகழ்தகவைக் காண்க."
    },
    "steps": [
      {
        "en": "Since the first player drew a winning card and did not replace it, 1000 − 1 = 999 cards remain in the box: n(S₁) = 999.",
        "eq": "n(S₁) = 1000 − 1 = 999",
        "math": {
          "latex": "n(S_1)=1000-1=999",
          "display": true,
          "fallback": "n(S₁) = 1000 − 1 = 999"
        },
        "ta": "முதலாமவர் வெற்றிக்கான அட்டையை எடுத்துத் திரும்ப வைக்காததால், பெட்டியில் மீதமுள்ள அட்டைகள் n(S₁) = 1000 − 1 = 999."
      },
      {
        "en": "One of the 9 winning cards (23² to 31²) was already drawn, so 9 − 1 = 8 winning cards remain: n(B) = 8.",
        "eq": "n(B) = 9 − 1 = 8",
        "math": {
          "latex": "n(B)=9-1=8",
          "display": true,
          "fallback": "n(B) = 9 − 1 = 8"
        },
        "ta": "9 வெற்றி அட்டைகளில் ஒன்று ஏற்கெனவே எடுக்கப்பட்டதால், மீதமுள்ள வெற்றி அட்டைகள் n(B) = 9 − 1 = 8."
      },
      {
        "en": "Compute the probability for the second player: P(B) = n(B)/n(S₁).",
        "eq": "P(B) = 8/999",
        "math": {
          "latex": "P(B)=\\dfrac{n(B)}{n(S_1)}=\\dfrac{8}{999}",
          "display": true,
          "fallback": "P(B) = 8/999"
        },
        "ta": "இரண்டாவதாக விளையாடுபவர் வெற்றி பெறுவதற்கான நிகழ்தகவு P(B) = 8/999."
      }
    ],
    "answer": {
      "en": "8/999",
      "ta": "8/999"
    },
    "answerMath": {
      "latex": "\\boxed{\\dfrac{8}{999}}",
      "display": true,
      "fallback": "8/999"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q6-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q6(i)",
      "ta": "பயிற்சி 8.3 · வினா 6(i)"
    },
    "title": {
      "en": "Probability of drawing a red ball in terms of x",
      "ta": "சிவப்பு நிறப்பந்து எடுப்பதற்கான நிகழ்தகவு (x வடிவில்)"
    },
    "q": {
      "en": "6. A bag contains 12 blue balls and x red balls. If one ball is drawn at random (i) what is the probability that it will be a red ball?",
      "ta": "6. ஒரு பையில் 12 நீல நிறப்பந்துகளும், x சிவப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் ஒரு பந்து தேர்ந்தெடுக்கப்படுகிறது. (i) அது சிவப்பு நிறப்பந்தாக இருப்பதற்கான நிகழ்தகவைக் காண்க"
    },
    "steps": [
      {
        "en": "Find the total number of balls in the bag by adding the 12 blue balls and x red balls.",
        "eq": "n(S) = 12 + x",
        "math": {
          "latex": "n(S)=12+x",
          "display": true,
          "fallback": "n(S) = 12 + x"
        },
        "ta": "பையிலுள்ள மொத்தப் பந்துகளின் எண்ணிக்கை n(S) = 12 + x."
      },
      {
        "en": "Let R be the event of drawing a red ball, so n(R) = x. Write P(R) = n(R)/n(S) = x/(12 + x). (After finding x = 4 in part (ii), this evaluates to 4/16 = 1/4, matching the textbook answer key.)",
        "eq": "P(R) = x/(12 + x) (= 1/4 when x = 4)",
        "math": {
          "latex": "P(R)=\\dfrac{n(R)}{n(S)}=\\dfrac{x}{12+x}\\quad\\left(=\\dfrac{4}{16}=\\dfrac{1}{4}\\text{ when }x=4\\right)",
          "display": true,
          "fallback": "P(R) = x/(12 + x) (= 1/4 when x = 4)"
        },
        "ta": "சிவப்புப் பந்து எடுக்கும் நிகழ்ச்சி R எனில் n(R) = x. எனவே P(R) = x/(12 + x). (பகுதி (ii)-இல் x = 4 எனக் கண்டறிந்தபின் 4/16 = 1/4 எனப் பாடநூல் விடை கிடைக்கும்.)"
      }
    ],
    "answer": {
      "en": "x/(12 + x) (which equals 1/4 once x = 4 is found in (ii))",
      "ta": "x/(12 + x) (பகுதி (ii)-இல் x = 4 எனக் கண்டறிந்தபின் 1/4)"
    },
    "answerMath": {
      "en": {
        "latex": "\\boxed{P(R)=\\dfrac{x}{12+x}\\ =\\ \\dfrac{1}{4}\\ (\\text{for }x=4)}",
        "display": true,
        "fallback": "x/(12 + x) (which equals 1/4 once x = 4 is found in (ii))"
      },
      "ta": {
        "latex": "\\begin{gathered}P(R)=\\dfrac{x}{12+x}\\\\x=4\\text{ எனில் }P(R)=\\dfrac{1}{4}\\end{gathered}",
        "display": true,
        "fallback": "x/(12 + x) (பகுதி (ii)-இல் x = 4 எனக் கண்டறிந்தபின் 1/4)"
      }
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q6-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {
      "en": "Statistics and Probability",
      "ta": "புள்ளியியலும் நிகழ்தகவும்"
    },
    "label": {
      "en": "Exercise 8.3 · Q6(ii)",
      "ta": "பயிற்சி 8.3 · வினா 6(ii)"
    },
    "title": {
      "en": "Find x when 8 more red balls double the probability",
      "ta": "8 சிவப்புப் பந்துகள் சேர்த்தபின் நிகழ்தகவு இருமடங்கானால் x காண்க"
    },
    "q": {
      "en": "6. A bag contains 12 blue balls and x red balls. If one ball is drawn at random (ii) If 8 more red balls are put in the bag, and if the probability of drawing a red ball will be twice that of the probability in (i), then find x.",
      "ta": "6. ஒரு பையில் 12 நீல நிறப்பந்துகளும், x சிவப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் ஒரு பந்து தேர்ந்தெடுக்கப்படுகிறது. (ii) 8 புதிய சிவப்பு நிறப்பந்துகள் அப்பையில் வைத்த பின்னர், ஒரு சிவப்பு நிறப்பந்தை தேர்ந்தெடுப்பதற்கான நிகழ்தகவானது (i)-யில் பெறப்பட்ட நிகழ்தகவைப் போல இருமடங்கு எனில், x-ன் மதிப்பினைக் காண்க."
    },
    "steps": [
      {
        "en": "After adding 8 red balls, there are x + 8 red balls and 12 + x + 8 = x + 20 balls in total, so the new probability is (x + 8)/(x + 20).",
        "eq": "P_new(R) = (x + 8)/(x + 20)",
        "math": {
          "latex": "P_{\\text{new}}(R)=\\dfrac{x+8}{x+20}",
          "display": true,
          "fallback": "P_new(R) = (x + 8)/(x + 20)"
        },
        "ta": "8 புதிய சிவப்புப் பந்துகள் சேர்த்தபின், சிவப்புப் பந்துகள் = x + 8 மற்றும் மொத்தப் பந்துகள் = x + 20. எனவே புதிய நிகழ்தகவு (x + 8)/(x + 20)."
      },
      {
        "en": "Set the new probability equal to twice the probability from (i) and cross-multiply.",
        "eq": "(x + 8)/(x + 20) = 2x/(x + 12)",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{x+8}{x+20}&=2\\cdot\\dfrac{x}{x+12}\\\\(x+8)(x+12)&=2x(x+20)\\\\x^2+20x+96&=2x^2+40x\\\\x^2+20x-96&=0\\end{aligned}",
          "display": true,
          "fallback": "(x + 8)/(x + 20) = 2x/(x + 12)"
        },
        "ta": "புதிய நிகழ்தகவை (i)-ன் நிகழ்தகவின் இருமடங்குக்குச் சமப்படுத்தி குறுக்குப் பெருக்கல் செய்க."
      },
      {
        "en": "Factor the quadratic equation. Since the number of balls x cannot be negative, reject x = −24 and accept x = 4.",
        "eq": "(x + 24)(x − 4) = 0 ⇒ x = 4",
        "math": {
          "latex": "\\begin{aligned}(x+24)(x-4)&=0\\\\x&=-24\\text{ (not possible)}\\quad\\text{or}\\quad x=4\\end{aligned}",
          "display": true,
          "fallback": "(x + 24)(x − 4) = 0 ⇒ x = 4"
        },
        "ta": "இருபடிச் சமன்பாட்டைக் காரணிப்படுத்துக. பந்துகளின் எண்ணிக்கை எதிர்மறையாக இருக்க முடியாது என்பதால் x = 4."
      },
      {
        "en": "Check: originally 4/16 = 1/4; after adding 8 red balls, 12/24 = 1/2 = 2 × (1/4).",
        "eq": "12/24 = 1/2 = 2 × (4/16) ✓",
        "math": {
          "latex": "\\dfrac{4+8}{20+4}=\\dfrac{12}{24}=\\dfrac{1}{2}=2\\times\\dfrac{1}{4}\\ \\checkmark",
          "display": true,
          "fallback": "12/24 = 1/2 = 2 × (4/16) ✓"
        },
        "ta": "சரிபார்க்க: முதலில் 4/16 = 1/4; 8 பந்துகள் சேர்த்தபின் 12/24 = 1/2 = 2 × (1/4)."
      }
    ],
    "answer": {
      "en": "x = 4",
      "ta": "x = 4"
    },
    "answerMath": {
      "latex": "\\boxed{x=4}",
      "display": true,
      "fallback": "x = 4"
    },
    "kind": "textbook",
    "source": SOURCE_EN,
    "reference": REF_322,
    "edition": "2025",
    "translationReview": "pending",
    "tamilQuestionSourceVerified": true,
    "tamilWorkedSolutionReview": "pending"
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
for(const item of entries){if(ids.has(item.id))throw Error('Duplicate textbook ID '+item.id);ids.add(item.id);}
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
