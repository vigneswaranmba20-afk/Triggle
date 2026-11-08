/* Testing-phase preview: source-referenced Grade 9 Exercise 1.1 Q4(i–ii). Editorial review pending. */
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch1-ex1.1-q4-i",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.1",
    "topic": {
      "en": "Set Language",
      "ta": "கண மொழி"
    },
    "label": {
      "en": "Exercise 1.1 · Question 4 (i)",
      "ta": "பயிற்சி 1.1 · வினா 4 (i)"
    },
    "title": {
      "en": "Roster form",
      "ta": "பட்டியல் முறை"
    },
    "q": {
      "en": "Write in roster form the set A of all even natural numbers less than 20.",
      "ta": "20-ஐ விடக் குறைவான இரட்டைப்படை இயல் எண்களின் கணம் A-ஐப் பட்டியல் முறையில் எழுதுக."
    },
    "steps": [
      {
        "en": "Natural numbers begin at 1; even natural numbers are positive multiples of 2.",
        "ta": "இயல் எண்கள் 1-இலிருந்து தொடங்குகின்றன; இரட்டைப்படை இயல் எண்கள் 2-இன் நேர்மறை மடங்குகள்."
      },
      {
        "en": "List 2 × n for positive integers n while 2 × n < 20: n = 1, 2, ..., 9.",
        "ta": "2 × n < 20 என்ற நிபந்தனையை நிறைவேற்றும் இயல் எண்கள் n = 1, 2, ..., 9 ஆகும்."
      },
      {
        "en": "Thus A = {2, 4, 6, 8, 10, 12, 14, 16, 18}. Neither 0 nor 20 belongs to A.",
        "ta": "எனவே A = {2, 4, 6, 8, 10, 12, 14, 16, 18}. 0 மற்றும் 20 இக்கணத்தில் உறுப்புகள் அல்ல."
      }
    ],
    "answer": {
      "en": "A = {2, 4, 6, 8, 10, 12, 14, 16, 18}",
      "ta": "A = {2, 4, 6, 8, 10, 12, 14, 16, 18}"
    },
    "kind": "reference",
    "source": "",
    "reference": "2025 revised Grade 9, Ex 1.1 Q4(i), EN printed p.5 / TA printed p.6",
    "sourceEdition": "2025 revised",
    "review": {
      "tamilEditorial": "pending",
      "studentBrowser": "pending",
      "publication": "draft"
    }
  },
  {
    "id": "g9-ch1-ex1.1-q4-ii",
    "classNum": 9,
    "chapter": "1",
    "exercise": "1.1",
    "topic": {
      "en": "Set Language",
      "ta": "கண மொழி"
    },
    "label": {
      "en": "Exercise 1.1 · Question 4 (ii)",
      "ta": "பயிற்சி 1.1 · வினா 4 (ii)"
    },
    "title": {
      "en": "Roster form",
      "ta": "பட்டியல் முறை"
    },
    "q": {
      "en": "Convert B = {y : y = 1/(2n), n ∈ N and n ≤ 5} into roster form.",
      "ta": "B = {y : y = 1/(2n), n ∈ N, n ≤ 5} என்ற கணத்தைப் பட்டியல் முறையில் எழுதுக."
    },
    "steps": [
      {
        "en": "Because n is a natural number and n ≤ 5, the permitted values are n = 1, 2, 3, 4, 5.",
        "ta": "n ஓர் இயல் எண்; n ≤ 5 என்பதால் n = 1, 2, 3, 4, 5 ஆகிய மதிப்புகளை எடுத்துக்கொள்கிறோம்."
      },
      {
        "en": "Substitute each value into y = 1/(2n): 1/2, 1/4, 1/6, 1/8 and 1/10.",
        "ta": "ஒவ்வொரு n மதிப்பையும் y = 1/(2n) இல் பிரதியிடும்போது 1/2, 1/4, 1/6, 1/8, 1/10 கிடைக்கும்."
      },
      {
        "en": "Write each distinct value once: B = {1/2, 1/4, 1/6, 1/8, 1/10}. n = 0 is excluded because it is not natural and would make the denominator zero.",
        "ta": "ஒவ்வொரு தனித்த மதிப்பையும் ஒருமுறை எழுதி B = {1/2, 1/4, 1/6, 1/8, 1/10} எனப் பெறுகிறோம். n = 0 அனுமதிக்கப்படாது; அது பகுதியை வரையறுக்க முடியாததாக்கும்."
      }
    ],
    "answer": {
      "en": "B = {1/2, 1/4, 1/6, 1/8, 1/10}",
      "ta": "B = {1/2, 1/4, 1/6, 1/8, 1/10}"
    },
    "kind": "reference",
    "source": "",
    "reference": "2025 revised Grade 9, Ex 1.1 Q4(ii), EN printed p.5 / TA printed p.6",
    "sourceEdition": "2025 revised",
    "review": {
      "tamilEditorial": "pending",
      "studentBrowser": "pending",
      "publication": "draft"
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch1');
if(!grade||!chapter)throw Error('Missing Grade 9 curriculum for Q4 integration');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(x=>x.id===item.id)||chapter.textbookQuestionIds.includes(item.id))throw Error('Duplicate textbook question: '+item.id);grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_TEXTBOOK_EX1_1_Q4_IDS=entries.map(x=>x.id);
})();
