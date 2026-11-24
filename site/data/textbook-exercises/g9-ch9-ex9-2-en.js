// Grade 9 English (2025), Probability Exercise 9.2: Q1–Q4 from PDF text.
// Unreviewed page images; do not mark as visually verified or as a completed exercise.
// Keep original textbook wording (including the Q4 printing typo) and existing IDs unchanged.
(()=>{
'use strict';
const entries=[
  {
    "id": "g9-ch9-ex9.2-q1",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.2 · Q1",
      "ta": "பயிற்சி 9.2 · வினா 1"
    },
    "title": {
      "en": "Good laptops",
      "ta": "குறைபாடில்லாத மடிக்கணினி"
    },
    "q": {
      "en": "A company manufactures 10000 Laptops in 6 months. Out of which 25 of them are found to be defective. When you choose one Laptop from the manufactured, what is the probability that selected Laptop is a good one.",
      "ta": "ஒரு நிறுவனம் ஆறு மாதங்களில் 10000 மடிக்கணினிகளை உற்பத்தி செய்தது. அவற்றில் 25 மடிக்கணினிகள் குறைபாடு உடையனவாகக் கண்டறியப்பட்டன. சமவாய்ப்பு முறையில் ஒரு மடிக்கணினியைத் தேர்ந்தெடுக்கும்போது அது குறைபாடில்லாததாக இருக்க நிகழ்தகவு யாது?"
    },
    "steps": [
      {
        "en": "Count the laptops that are not defective.",
        "ta": "குறைபாடில்லாத மடிக்கணினிகளின் எண்ணிக்கையைக் காண்க.",
        "eq": "Good laptops = 10000 − 25 = 9975",
        "mathTa": [
          "குறைபாடில்லாத மடிக்கணினிகள் = ",
          {
            "latex": "10000 - 25 = 9975",
            "fallback": "10000 − 25 = 9975",
            "display": true
          }
        ]
      },
      {
        "en": "Use the ratio of good laptops to all manufactured laptops.",
        "ta": "அந்த எண்ணிக்கையை உற்பத்தி செய்யப்பட்ட மொத்த மடிக்கணினிகளின் எண்ணிக்கையால் வகுக்கவும்.",
        "eq": "P(good) = [[9975|10000]]",
        "mathTa": {
          "latex": "P\\left(\\text{குறைபாடில்லை}\\right) = \\dfrac{9975}{10000}",
          "fallback": "P(குறைபாடில்லை) = [[9975|10000]]",
          "display": true
        }
      },
      {
        "en": "Simplify the fraction and convert to a decimal.",
        "ta": "பின்னத்தைச் சுருக்கித் தசம எண்ணாகவும் எழுதுக.",
        "eq": "P(good) = [[399|400]] = 0.9975",
        "mathTa": {
          "latex": "\\begin{aligned}&P\\left(\\text{குறைபாடில்லை}\\right) = \\dfrac{399}{400}  \\\\ &= 0.9975\\end{aligned}",
          "fallback": "P(குறைபாடில்லை) = [[399|400]] = 0.9975",
          "display": true
        }
      }
    ],
    "answer": "[[399|400]] = 0.9975",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 301 / PDF p. 307. Text checked against Drive PDF; page-image review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 307,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 307,
      "enPrintedPage": 301,
      "taPdfPage": 324,
      "taPrintedPage": 318,
      "tamilEditorial": "pending",
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch9-ex9.2-q2",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.2 · Q2",
      "ta": "பயிற்சி 9.2 · வினா 2"
    },
    "title": {
      "en": "Youngsters without voter ID",
      "ta": "அடையாள அட்டை இல்லாதவர்"
    },
    "q": {
      "en": "In a survey of 400 youngsters aged 16-20 years, it was found that 191 have their voter ID card. If a youngster is selected at random, find the probability that the youngster does not have their voter ID card.",
      "ta": "16–20 வயதுக்குட்பட்ட 400 இளைஞர்களிடம் நடத்தப்பட்ட ஓர் ஆய்வில், 191 பேர் வாக்காளர் அடையாள அட்டை வைத்திருப்பதாகக் கண்டறியப்பட்டது. சமவாய்ப்பு முறையில் அவர்களில் ஒருவரைத் தேர்ந்தெடுக்கும்போது அவர் வாக்காளர் அடையாள அட்டை வைத்திருக்கும் நபராக இல்லாமல் இருக்க நிகழ்தகவு என்ன?"
    },
    "steps": [
      {
        "en": "Find how many surveyed youngsters do not have voter ID cards.",
        "ta": "அட்டை இல்லாத இளைஞர்களின் எண்ணிக்கையைக் காண்க.",
        "eq": "Without card = 400 − 191 = 209",
        "mathTa": [
          "அட்டை இல்லாதவர்கள் = ",
          {
            "latex": "400 - 191 = 209",
            "fallback": "400 − 191 = 209",
            "display": true
          }
        ]
      },
      {
        "en": "Use all 400 surveyed youngsters as the total.",
        "ta": "ஆய்வில் பங்குபெற்ற 400 இளைஞர்களையும் மொத்த எண்ணிக்கையாக எடுத்துக்கொள்க.",
        "eq": "P(no voter ID) = [[209|400]]",
        "mathTa": {
          "latex": "P\\left(\\text{வாக்காளர் அட்டை இல்லை}\\right) = \\dfrac{209}{400}",
          "fallback": "P(வாக்காளர் அட்டை இல்லை) = [[209|400]]",
          "display": true
        }
      },
      {
        "en": "The numerator and denominator have no common factor greater than 1.",
        "ta": "தொகுதி மற்றும் பகுதிக்கு 1 ஐ விடப் பெரிய பொதுக் காரணி இல்லை. எனவே பின்னம் ஏற்கெனவே சுருங்கிய வடிவில் உள்ளது.",
        "eq": "Final answer = [[209|400]]",
        "mathTa": [
          "விடை = ",
          {
            "latex": "\\dfrac{209}{400}",
            "fallback": "[[209|400]]"
          }
        ]
      }
    ],
    "answer": "[[209|400]]",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 301 / PDF p. 307. Text checked against Drive PDF; page-image review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 307,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 307,
      "enPrintedPage": 301,
      "taPdfPage": 324,
      "taPrintedPage": 318,
      "tamilEditorial": "pending",
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch9-ex9.2-q3",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.2 · Q3",
      "ta": "பயிற்சி 9.2 · வினா 3"
    },
    "title": {
      "en": "Complementary probabilities",
      "ta": "ஊகித்த விடையின் நிகழ்தகவு"
    },
    "q": {
      "en": "The probability of guessing the correct answer to a certain question is [[x|3]]. If the probability of not guessing the correct answer is [[x|5]], then find the value of x .",
      "ta": "ஒரு வினாவிற்கான சரியான விடையை ஊகிப்பதற்கான நிகழ்தகவு [[x|3]] என்க. சரியான விடையை ஊகிக்காமல் இருப்பதற்கான நிகழ்தகவு [[x|5]] எனில், x இன் மதிப்பு காண்க."
    },
    "steps": [
      {
        "en": "Correct and incorrect guesses are complementary, so their probabilities add to one.",
        "ta": "சரியாக ஊகிப்பதும் சரியாக ஊகிக்காமல் இருப்பதும் நிரப்பு நிகழ்ச்சிகள். அவற்றின் நிகழ்தகவுகளின் கூடுதல் ஒன்று.",
        "eq": "[[x|3]] + [[x|5]] = 1"
      },
      {
        "en": "Use a common denominator of 15.",
        "ta": "இரண்டு பின்னங்களுக்கும் பொதுப் பகுதியாக 15 ஐ எடுத்துக்கொள்க.",
        "eq": "[[5x|15]] + [[3x|15]] = 1"
      },
      {
        "en": "Add the fractions and solve.",
        "ta": "பின்னங்களைக் கூட்டிச் சமன்பாட்டை எளிமைப்படுத்துக.",
        "eq": "[[8x|15]] = 1  ⇒  8x = 15"
      },
      {
        "en": "Divide both sides by 8.",
        "ta": "இரு பக்கங்களையும் 8 ஆல் வகுக்கவும்.",
        "eq": "x = [[15|8]]"
      },
      {
        "en": "Check that both probabilities are valid and add to one.",
        "ta": "இரு நிகழ்தகவுகளும் 0 முதல் 1 வரை உள்ளனவா, அவற்றின் கூடுதல் ஒன்று ஆகிறதா எனச் சரிபார்க்கவும்.",
        "eq": "[[5|8]] + [[3|8]] = 1"
      }
    ],
    "answer": "x = [[15|8]]",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 301 / PDF p. 307. Text checked against Drive PDF; page-image review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 307,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 307,
      "enPrintedPage": 301,
      "taPdfPage": 324,
      "taPrintedPage": 318,
      "tamilEditorial": "pending",
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch9-ex9.2-q4",
    "classNum": 9,
    "chapter": "9",
    "exercise": "9.2",
    "topic": {
      "en": "Probability",
      "ta": "நிகழ்தகவு"
    },
    "label": {
      "en": "Exercise 9.2 · Q4",
      "ta": "பயிற்சி 9.2 · வினா 4"
    },
    "title": {
      "en": "Probability of losing",
      "ta": "தோல்விக்கான நிகழ்தகவு"
    },
    "q": {
      "en": "If a probability of a player winning a particular tennis match is 0.72. What is the probability of the player loosing the match?",
      "ta": "ஒரு வரிப்பந்து (tennis) விளையாட்டு வீரர் ஒரு குறிப்பிட்ட ஆட்டத்தில் வெற்றி பெறுவதற்கான நிகழ்தகவு 0.72 எனில் அவர் அந்த விளையாட்டில் தோல்வியடைவதற்கான நிகழ்தகவு என்ன?"
    },
    "steps": [
      {
        "en": "Winning and losing are complementary outcomes for this match.",
        "ta": "இந்த ஆட்டத்தில் வெற்றியும் தோல்வியும் நிரப்பு நிகழ்ச்சிகள்.",
        "eq": "P(win) + P(lose) = 1",
        "mathTa": {
          "latex": "P\\left(\\text{வெற்றி}\\right) + P\\left(\\text{தோல்வி}\\right) = 1",
          "fallback": "P(வெற்றி) + P(தோல்வி) = 1",
          "display": true
        }
      },
      {
        "en": "Subtract the winning probability from 1.",
        "ta": "ஒன்றிலிருந்து வெற்றிக்கான நிகழ்தகவைக் கழிக்கவும்.",
        "eq": "P(lose) = 1 − 0.72",
        "mathTa": {
          "latex": "P\\left(\\text{தோல்வி}\\right) = 1 - 0.72",
          "fallback": "P(தோல்வி) = 1 − 0.72",
          "display": true
        }
      },
      {
        "en": "Evaluate.",
        "ta": "கழித்துத் தோல்விக்கான நிகழ்தகவைப் பெறுக.",
        "eq": "P(lose) = 0.28",
        "mathTa": {
          "latex": "P\\left(\\text{தோல்வி}\\right) = 0.28",
          "fallback": "P(தோல்வி) = 0.28",
          "display": true
        }
      }
    ],
    "answer": "0.28",
    "kind": "reference",
    "reference": "2025 revised Tamil Nadu Standard Nine Mathematics (English) · Exercise 9.2 · printed p. 302 / PDF p. 308. Text checked against Drive PDF; page-image review pending.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 308,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 308,
      "enPrintedPage": 302,
      "taPdfPage": 324,
      "taPrintedPage": 318,
      "tamilEditorial": "pending",
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch9');
if(!grade||!chapter)throw Error('Grade 9 Exercise 9.2 integration: missing grade/chapter');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){
 if(grade.items.some(existing=>existing.id===item.id))throw Error('Duplicate Grade 9 textbook ID: '+item.id);
 grade.items.push(item);
 if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);
}
window.TRIGGLE_G9_CH9_EX9_2_EN=entries.map(item=>item.id);
})();
