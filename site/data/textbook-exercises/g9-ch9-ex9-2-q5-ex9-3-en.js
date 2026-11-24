// Grade 9 English 2025, Probability Ex 9.2 Q5 and Ex 9.3 Q1-Q10.
// Content-only sprint: 2025 English and Tamil PDF text-layer checks; page-image checks pending.
// Tamil is not claimed complete. No UI review has been conducted for this batch.
(()=>{
 'use strict';
 const entries=[
  {
    "id": "g9-ch9-ex9.2-q5",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.2 · Q5",
      "ta": "பயிற்சி 9.2 · வினா 5"
    },
    "title": {
      "en": "Families and maids",
      "ta": "பகுதிநேர மற்றும் முழுநேரப் பணியாளர்கள்"
    },
    "q": {
      "en": "1500 families were surveyed and following data was recorded about their maids at homes\nType of maids           Only part time    Only full time    Both\nNumber of families      860               370               250\nA family is selected at random. Find the probability that the family selected has\n(i)Both types of maids (ii)Part time maids (iii)No maids",
      "ta": "1500 குடும்பங்களில் அவர்கள் வீட்டிலுள்ள பணிப்பெண்கள் பற்றிய தகவல்கள் திரட்டப்பட்டுப் பின்வருமாறு பதிவு செய்யப்பட்டுள்ளன.\nபணிப்பெண்கள் வகை: பகுதிநேரம் மட்டும் 860, முழுநேரம் மட்டும் 370, இரண்டு வகையும் 250 குடும்பங்கள்.\nசமவாய்ப்பு முறையில் ஒரு குடும்பம் தேர்ந்தெடுக்கப்படும்போது, அக்குடும்பம் (i) இருவகைப் பணிப்பெண்களும் வைத்திருக்க (ii) பகுதி நேரப் பணிப்பெண் வைத்திருக்க (iii) பணிப்பெண் வைத்திருக்காமல் இருக்க நிகழ்தகவு காண்க."
    },
    "dataTable": {
      "caption": "Survey of maids employed by 1500 families",
      "replaceRegex": "\\r?\\nType of maids[\\s\\S]*?250\\r?\\n",
      "headers": [
        "Type of maids",
        "Only part time",
        "Only full time",
        "Both"
      ],
      "rows": [
        [
          "Number of families",
          "860",
          "370",
          "250"
        ]
      ]
    },
    "steps": [
      {
        "en": "The three recorded categories are mutually exclusive: only part time, only full time and both.",
        "ta": "பகுதிநேரம் மட்டும், முழுநேரம் மட்டும், இரு வகையும் ஆகிய மூன்று பிரிவுகளும் ஒன்றையொன்று விலக்குபவை.",
        "eq": "860 + 370 + 250 = 1480"
      },
      {
        "en": "Count the families with both types of maids.",
        "ta": "இரு வகைப் பணிப்பெண்களையும் வைத்துள்ள குடும்பங்களின் எண்ணிக்கையைப் பயன்படுத்துக.",
        "eq": "P(both) = [[250|1500]] = [[1|6]]",
        "mathTa": {
          "latex": "\\begin{aligned}&P\\left(\\text{இரு வகையும்}\\right) = \\dfrac{250}{1500}  \\\\ &= \\dfrac{1}{6}\\end{aligned}",
          "fallback": "P(இரு வகையும்) = [[250|1500]] = [[1|6]]",
          "display": true
        }
      },
      {
        "en": "For part-time maids, the printed answer key uses the 'Only part time' category; use 860 families. The wording is ambiguous because the 250 'Both' families also employ part-time maids.",
        "ta": "(ii) இல் பாடநூல் விடை பகுதிநேரம் மட்டும் என்ற பிரிவை எடுத்துக்கொள்கிறது. அதன் எண்ணிக்கை 860. இரு வகையும் உள்ள 250 குடும்பங்களிலும் பகுதிநேரப் பணிப்பெண் இருப்பதால் வினாவிற்கு மற்றொரு பொருளும் உள்ளது.",
        "eq": "P(only part time) = [[860|1500]] = [[43|75]]",
        "mathTa": {
          "latex": "\\begin{aligned}&P\\left(\\text{பகுதிநேரம் மட்டும்}\\right) = \\dfrac{860}{1500}  \\\\ &= \\dfrac{43}{75}\\end{aligned}",
          "fallback": "P(பகுதிநேரம் மட்டும்) = [[860|1500]] = [[43|75]]",
          "display": true
        }
      },
      {
        "en": "If part-time maids includes families who also employ full-time maids, add the disjoint categories: 860 only-part-time families and 250 both-types families. This inclusive interpretation differs from the printed answer key for part (ii).",
        "ta": "பகுதிநேரப் பணிப்பெண் உள்ள எல்லாக் குடும்பங்களையும் எடுத்தால், பகுதிநேரம் மட்டும் உள்ள 860 உடன் இரு வகையும் உள்ள 250 ஐக் கூட்ட வேண்டும். இது பாடநூல் விடையில் பயன்படுத்திய பொருளிலிருந்து வேறுபடும்.",
        "eq": "P(part time or both); = [[860 + 250|1500]] = [[1110|1500]] = [[37|50]]",
        "mathTa": [
          {
            "latex": "P\\left(\\text{பகுதிநேரம் மட்டும் அல்லது இரு வகையும்}\\right)",
            "fallback": "P(பகுதிநேரம் மட்டும் அல்லது இரு வகையும்)",
            "display": true
          },
          "; = ",
          {
            "latex": "\\begin{aligned}&\\dfrac{860 + 250}{1500} = \\dfrac{1110}{1500}  \\\\ &= \\dfrac{37}{50}\\end{aligned}",
            "fallback": "[[860 + 250|1500]] = [[1110|1500]] = [[37|50]]",
            "display": true
          }
        ]
      },
      {
        "en": "Find households without maids by subtracting the recorded households from all surveyed households.",
        "ta": "பணிப்பெண் இல்லாத குடும்பங்களைக் காண மொத்தம் 1500 இலிருந்து பதிவு செய்யப்பட்ட மூன்று பிரிவுகளின் கூடுதலைக் கழிக்கவும்.",
        "eq": "No maids = 1500 − 1480 = 20",
        "mathTa": [
          "பணிப்பெண் இல்லாத குடும்பங்கள் = ",
          {
            "latex": "1500 - 1480 = 20",
            "fallback": "1500 − 1480 = 20",
            "display": true
          }
        ]
      },
      {
        "en": "Divide by the total to get the probability of no maids.",
        "ta": "மீதமுள்ள எண்ணிக்கையை மொத்தக் குடும்பங்களின் எண்ணிக்கையால் வகுத்து நிகழ்தகவைப் பெறுக.",
        "eq": "P(none) = [[20|1500]] = [[1|75]]",
        "mathTa": {
          "latex": "\\begin{aligned}&P\\left(\\text{பணிப்பெண் இல்லை}\\right) = \\dfrac{20}{1500}  \\\\ &= \\dfrac{1}{75}\\end{aligned}",
          "fallback": "P(பணிப்பெண் இல்லை) = [[20|1500]] = [[1|75]]",
          "display": true
        }
      }
    ],
    "answer": "(i) [[1|6]] ; (ii) [[43|75]] (textbook 'only part time' interpretation) ; (iii) [[1|75]]",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPdfPageRange": [
        324,
        325
      ],
      "taPrintedPageRange": [
        318,
        319
      ],
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [
        "Table layout must be checked against original page image",
        "Printed part (ii) answer 43/75 counts only-part-time families; alternative broad interpretation 37/50 requires explicit clarification"
      ],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(i) [[1|6]] ; (ii) [[43|75]] (பாடநூலின்படி பகுதிநேரம் மட்டும்) ; (iii) [[1|75]]",
    "answerMath": {
      "en": [
        "(i) ",
        {
          "latex": "\\dfrac{1}{6}",
          "fallback": "[[1|6]]"
        },
        " ; (ii) ",
        {
          "latex": "\\dfrac{43}{75}",
          "fallback": "[[43|75]]"
        },
        " (textbook 'only part time' interpretation) ; (iii) ",
        {
          "latex": "\\dfrac{1}{75}",
          "fallback": "[[1|75]]"
        }
      ],
      "ta": [
        "(i) ",
        {
          "latex": "\\dfrac{1}{6}",
          "fallback": "[[1|6]]"
        },
        " ; (ii) ",
        {
          "latex": "\\dfrac{43}{75}",
          "fallback": "[[43|75]]"
        },
        " (பாடநூலின்படி பகுதிநேரம் மட்டும்) ; (iii) ",
        {
          "latex": "\\dfrac{1}{75}",
          "fallback": "[[1|75]]"
        }
      ]
    }
  },
  {
    "id": "g9-ch9-ex9.3-q1",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q1",
      "ta": "பயிற்சி 9.3 · வினா 1"
    },
    "title": {
      "en": "Probability",
      "ta": "உறுதியின்மையின் அளவு"
    },
    "q": {
      "en": "A number between 0 and 1 that is used to measure uncertainty is called\n(1) Random variable  (2) Trial  (3) Simple event  (4) Probability",
      "ta": "0 க்கும் 1 க்கும் இடைப்பட்ட ஓர் எண்ணைக் கொண்டு உறுதியற்றவற்றை அளவிடுவது எவ்வாறு அழைக்கப்படுகிறது?\n(1) சமவாய்ப்பு மாறி   (2) முயற்சி   (3) எளிய நிகழ்ச்சி   (4) நிகழ்தகவு"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "Probability measures the likelihood of an event on the scale from 0 to 1.",
        "mathTa": [
          "ஒரு நிகழ்ச்சி நிகழக்கூடிய வாய்ப்பிற்கு அளவாக அமைவது நிகழ்தகவு. அது 0 முதல் 1 வரையிலான மதிப்பாகும்."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "0 ≤ P(E) ≤ 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (4) Probability",
        "mathTa": [
          "சரியான விடை: (4) நிகழ்தகவு"
        ]
      }
    ],
    "answer": "(4) Probability",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(4) நிகழ்தகவு",
    "answerMath": {
      "en": "(4) Probability",
      "ta": "(4) நிகழ்தகவு"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q2",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q2",
      "ta": "பயிற்சி 9.3 · வினா 2"
    },
    "title": {
      "en": "0 and 1",
      "ta": "நிகழ்தகவின் எல்லைகள்"
    },
    "q": {
      "en": "Probability lies between\n(1) −1 and +1  (2) 0 and 1  (3) 0 and 2  (4) 0 and 0.5",
      "ta": "நிகழ்தகவு மதிப்பின் இடைவெளி\n(1) −1 மற்றும் +1   (2) 0 மற்றும் 1   (3) 0 மற்றும் 2   (4) 0 மற்றும் 0.5"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "The probability of any event cannot be negative and cannot be greater than 1.",
        "mathTa": [
          "நிகழ்தகவு எதிர்மறையாகவோ ஒன்றை விட அதிகமாகவோ இருக்க முடியாது."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "0 ≤ P(E) ≤ 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (2) 0 and 1",
        "mathTa": [
          "சரியான விடை: (2) 0 மற்றும் 1"
        ]
      }
    ],
    "answer": "(2) 0 and 1",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(2) 0 மற்றும் 1",
    "answerMath": {
      "en": [
        "(2) ",
        {
          "latex": "0",
          "fallback": "0"
        },
        " and ",
        {
          "latex": "1",
          "fallback": "1"
        }
      ],
      "ta": [
        "(2) ",
        {
          "latex": "0",
          "fallback": "0"
        },
        " மற்றும் ",
        {
          "latex": "1",
          "fallback": "1"
        }
      ]
    }
  },
  {
    "id": "g9-ch9-ex9.3-q3",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q3",
      "ta": "பயிற்சி 9.3 · வினா 3"
    },
    "title": {
      "en": "Empirical probability",
      "ta": "பட்டறி நிகழ்தகவு"
    },
    "q": {
      "en": "The probability based on the concept of relative frequency theory is called\n(1) Empirical probability  (2) Classical probability  (3) Both (1) and (2)  (4) Neither (1) nor (2)",
      "ta": "ஒப்பீட்டு நிகழ்வெண் கருத்தை அடிப்படையாகக் கொண்ட நிகழ்தகவு எவ்வாறு அழைக்கப்படுகிறது?\n(1) பட்டறி நிகழ்தகவு   (2) தொன்மை நிகழ்தகவு   (3) (1) மற்றும் (2) இரண்டும்   (4) (1) உம் அல்ல (2) உம் அல்ல"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "Empirical probability is estimated from observed frequencies over repeated trials.",
        "mathTa": [
          "மீண்டும் மீண்டும் செய்யும் சோதனைகளில் கிடைக்கும் ஒப்பீட்டு நிகழ்வெண்ணைக் கொண்டு பட்டறி நிகழ்தகவை மதிப்பிடலாம்."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "P(E) ≈ [[Number of occurrences of E|Total trials]]",
        "mathTa": [
          "நிகழ்ச்சியின் நிகழ்தகவு ≈ நிகழ்ச்சி நிகழ்ந்த முறைகளின் எண்ணிக்கை / சோதனைகளின் மொத்த எண்ணிக்கை"
        ]
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (1) Empirical probability",
        "mathTa": [
          "சரியான விடை: (1) பட்டறி நிகழ்தகவு"
        ]
      }
    ],
    "answer": "(1) Empirical probability",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(1) பட்டறி நிகழ்தகவு",
    "answerMath": {
      "en": "(1) Empirical probability",
      "ta": "(1) பட்டறி நிகழ்தகவு"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q4",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q4",
      "ta": "பயிற்சி 9.3 · வினா 4"
    },
    "title": {
      "en": "Less than zero",
      "ta": "இயலாத மதிப்பு"
    },
    "q": {
      "en": "The probability of an event cannot be\n(1) Equal to zero  (2) Greater than zero  (3) Equal to one  (4) Less than zero",
      "ta": "ஒரு நிகழ்ச்சியின் நிகழ்தகவு எவ்வாறு இருக்க முடியாது?\n(1) பூச்சியத்திற்குச் சமம்   (2) பூச்சியத்தை விடப் பெரியது   (3) 1 க்குச் சமம்   (4) பூச்சியத்தை விடச் சிறியது"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "A probability may be 0, between 0 and 1, or exactly 1, but never negative.",
        "mathTa": [
          "நிகழ்தகவு பூச்சியமாகவோ, ஒன்றாகவோ, இவற்றிற்கு இடையிலோ இருக்கலாம். எதிர்மறையாக இருக்க முடியாது."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "P(E) ≥ 0"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (4) Less than zero",
        "mathTa": [
          "சரியான விடை: (4) பூச்சியத்தை விடச் சிறியது"
        ]
      }
    ],
    "answer": "(4) Less than zero",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(4) பூச்சியத்தை விடச் சிறியது",
    "answerMath": {
      "en": "(4) Less than zero",
      "ta": "(4) பூச்சியத்தை விடச் சிறியது"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q5",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q5",
      "ta": "பயிற்சி 9.3 · வினா 5"
    },
    "title": {
      "en": "One",
      "ta": "உறுதியான நிகழ்ச்சி"
    },
    "q": {
      "en": "The probability of all possible outcomes of a random experiment is always equal to\n(1) One  (2) Zero  (3) Infinity  (4) Less than one",
      "ta": "ஒரு சமவாய்ப்புச் சோதனையில் வாய்ப்புள்ள அனைத்து விளைவுகளின் நிகழ்தகவு எப்பொழுதும் ............ இக்குச் சமம்.\n(1) ஒன்று   (2) பூச்சியம்   (3) முடிவிலி   (4) ஒன்றை விடக் குறைவு"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "All possible outcomes together make the sample space S, a certain event.",
        "mathTa": [
          "எல்லா விளைவுகளையும் சேர்த்தால் கூறுவெளி S கிடைக்கும். இது உறுதியான நிகழ்ச்சி."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "P(S) = 1"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (1) One",
        "mathTa": [
          "சரியான விடை: (1) ஒன்று"
        ]
      }
    ],
    "answer": "(1) One",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(1) ஒன்று",
    "answerMath": {
      "en": "(1) One",
      "ta": "(1) ஒன்று"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q6",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q6",
      "ta": "பயிற்சி 9.3 · வினா 6"
    },
    "title": {
      "en": "1−P(A)",
      "ta": "நிரப்பு நிகழ்ச்சி"
    },
    "q": {
      "en": "If A is any event in S and its complement is A’ then, P(A′) is equal to\n(1) 1  (2) 0  (3) 1−A  (4) 1−P(A)",
      "ta": "A என்பது S இன் ஏதேனும் ஒரு நிகழ்ச்சி மற்றும் A′ என்பது A இன் நிரப்பு நிகழ்ச்சி எனில் P(A′) இன் மதிப்பு\n(1) 1   (2) 0   (3) 1−A   (4) 1−P(A)"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "An event and its complement are exhaustive and mutually exclusive; their probabilities add to 1.",
        "mathTa": [
          "ஒரு நிகழ்ச்சியும் அதன் நிரப்பு நிகழ்ச்சியும் ஒன்றையொன்று விலக்கி எல்லா விளைவுகளையும் உள்ளடக்குகின்றன. அவற்றின் நிகழ்தகவுகளின் கூடுதல் ஒன்று."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "P(A′) = 1 − P(A)"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (4) 1−P(A)",
        "mathTa": [
          "சரியான விடை: (4) 1−P(A)"
        ]
      }
    ],
    "answer": "(4) 1−P(A)",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [
        "Complement glyph P(A′) reconstructed from broken PDF text; visually confirm"
      ],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q7",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q7",
      "ta": "பயிற்சி 9.3 · வினா 7"
    },
    "title": {
      "en": "−1",
      "ta": "நிகழ்தகவாக அமையாத மதிப்பு"
    },
    "q": {
      "en": "Which of the following cannot be taken as probability of an event?\n(1) 0  (2) 0.5  (3) 1  (4) −1",
      "ta": "பின்வருவனவற்றுள் எது ஒரு நிகழ்ச்சியின் நிகழ்தகவாக இருக்க முடியாது?\n(1) 0   (2) 0.5   (3) 1   (4) −1"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "Only values between 0 and 1, including endpoints, are valid probabilities.",
        "mathTa": [
          "மேலும் கீழும் இரு எல்லைகளையும் சேர்த்து, 0 முதல் 1 வரையுள்ள மதிப்புகளே நிகழ்தகவாக இருக்க முடியும்."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "−1 < 0 ≤ P(E)"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (4) −1",
        "mathTa": [
          "சரியான விடை: (4) −1"
        ]
      }
    ],
    "answer": "(4) −1",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 302 / PDF p. 308. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q8",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q8",
      "ta": "பயிற்சி 9.3 · வினா 8"
    },
    "title": {
      "en": "Outcome",
      "ta": "சோதனையின் விளைவு"
    },
    "q": {
      "en": "A particular result of an experiment is called\n(1) Trial  (2) Simple event  (3) Compound event  (4) Outcome",
      "ta": "ஒரு சோதனையின் குறிப்பிட்ட முடிவு எவ்வாறு அழைக்கப்படுகிறது?\n(1) முயற்சி   (2) எளிய நிகழ்ச்சி   (3) கூட்டு நிகழ்ச்சி   (4) விளைவு"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "One specific result is an outcome; a trial is the experiment being performed.",
        "mathTa": [
          "சோதனையை ஒரு முறை செய்வது முயற்சி. அப்போது கிடைக்கும் குறிப்பிட்ட முடிவு விளைவு."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "Single result = outcome",
        "mathTa": [
          "ஒரு குறிப்பிட்ட முடிவு = விளைவு"
        ]
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (4) Outcome",
        "mathTa": [
          "சரியான விடை: (4) விளைவு"
        ]
      }
    ],
    "answer": "(4) Outcome",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(4) விளைவு",
    "answerMath": {
      "en": "(4) Outcome",
      "ta": "(4) விளைவு"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q9",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q9",
      "ta": "பயிற்சி 9.3 · வினா 9"
    },
    "title": {
      "en": "Event",
      "ta": "நிகழ்ச்சியின் வரையறை"
    },
    "q": {
      "en": "A collection of one or more outcomes of an experiment is called\n(1) Event  (2) Outcome  (3) Sample point  (4) None of the above",
      "ta": "ஒரு சோதனையின் ஒன்று அல்லது அதற்கு மேற்பட்ட விளைவுகளின் தொகுப்பு ............ என அழைக்கப்படுகிறது.\n(1) நிகழ்ச்சி   (2) விளைவு   (3) கூறுபுள்ளி   (4) மேற்கண்ட எதுவுமில்லை"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "An event is a subset of the sample space containing one or more outcomes.",
        "mathTa": [
          "ஒன்று அல்லது அதற்கு மேற்பட்ட விளைவுகளைக் கொண்ட கூறுவெளியின் உட்கணம் ஒரு நிகழ்ச்சி."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "E ⊆ S"
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (1) Event",
        "mathTa": [
          "சரியான விடை: (1) நிகழ்ச்சி"
        ]
      }
    ],
    "answer": "(1) Event",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(1) நிகழ்ச்சி",
    "answerMath": {
      "en": "(1) Event",
      "ta": "(1) நிகழ்ச்சி"
    }
  },
  {
    "id": "g9-ch9-ex9.3-q10",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.3",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.3 · Q10",
      "ta": "பயிற்சி 9.3 · வினா 10"
    },
    "title": {
      "en": "Fair",
      "ta": "சீரான பகடை"
    },
    "q": {
      "en": "The six faces of the dice are called equally likely if the dice is\n(1) Small  (2) Fair  (3) Six-faced  (4) Round",
      "ta": "ஒரு பகடையானது ........ இருக்கும்போது, அதன் ஆறு முகங்களும் சமவாய்ப்புடையவை என அழைக்கப்படுகிறது.\n(1) சிறியதாக   (2) சீரானதாக   (3) ஆறு முகம் கொண்டதாக   (4) வட்டமாக"
    },
    "steps": [
      {
        "en": "Identify what the question is asking about.",
        "ta": "வினாவில் குறிப்பிடப்பட்ட கருத்தை அடையாளம் காண்க.",
        "eq": "A fair six-faced die gives each face the same chance, one out of six.",
        "mathTa": [
          "சீரான ஆறு முகப் பகடையில் ஒவ்வொரு முகமும் விழுவதற்கான வாய்ப்பு ஆறில் ஒன்று."
        ]
      },
      {
        "en": "Apply the probability rule or definition.",
        "ta": "இந்த நிகழ்தகவுக்குரிய விதி அல்லது வரையறையைப் பயன்படுத்துக.",
        "eq": "P(each face) = [[1|6]]",
        "mathTa": [
          "ஒவ்வொரு முகத்திற்குமான நிகழ்தகவு = ",
          {
            "latex": "\\dfrac{1}{6}",
            "fallback": "1/6"
          }
        ]
      },
      {
        "en": "Select the matching option.",
        "ta": "பொருந்தும் விடையைத் தேர்ந்தெடுக்கவும்.",
        "eq": "Correct option: (2) Fair",
        "mathTa": [
          "சரியான விடை: (2) சீரானதாக"
        ]
      }
    ],
    "answer": "(2) Fair",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.3 · printed p. 303 / PDF p. 309. English and Tamil PDF text layers consulted; page-image check and Tamil student-facing content pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 309,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 309,
      "enPrintedPage": 303,
      "taPdfPage": 325,
      "taPrintedPage": 319,
      "tamilEditorial": "pending",
      "notes": [],
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "(2) சீரானதாக",
    "answerMath": {
      "en": "(2) Fair",
      "ta": "(2) சீரானதாக"
    }
  }
];
 const grade=window.TRIGGLE_CLASSES?.[9];
 const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch9');
 if(!grade||!chapter)throw Error('Grade 9 Probability content integration missing grade/chapter');
 chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
 for(const item of entries){
   if(grade.items.some(e=>e.id===item.id))throw Error('Duplicate Grade 9 content ID: '+item.id);
   grade.items.push(item);
   if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);
 }
 window.TRIGGLE_G9_CH9_EX9_2_Q5_EX9_3_EN=entries.map(item=>item.id);
})();
