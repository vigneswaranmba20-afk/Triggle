/* Grade 10 Ch 3 Ex 3.10 (Q1(i)-(v), Q2) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 117 (printed p. 111), Tamil PDF p. 119 (printed p. 113),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-10-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q1(i)",
      "ta": "பயிற்சி 3.10 · வினா 1(i)"
    },
    "title": {
      "en": "Solve 4x² − 7x − 2 = 0 by factorization method",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by factorization method\n(i) 4x² − 7x − 2 = 0",
      "ta": "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (i) 4x² − 7x − 2 = 0"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by factorization method\n(i) ",
        {
          "latex": "4x^2-7x-2=0",
          "fallback": "4x² − 7x − 2 = 0",
          "display": false
        }
      ],
      "ta": [
        "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (i) ",
        {
          "latex": "4x^2-7x-2=0",
          "fallback": "4x² − 7x − 2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Compare 4x² − 7x − 2 = 0 with ax² + bx + c = 0. Multiply the leading coefficient a = 4 by the constant term c = −2 to get product a × c = −8, while the middle coefficient is b = −7. Find two numbers whose product is −8 and sum is −7: they are −8 and +1 (since −8 × 1 = −8 and −8 + 1 = −7).",
        "eq": "a × c = 4 × (−2) = −8; b = −7 = −8 + 1",
        "math": {
          "latex": "a\\times c=4\\times(-2)=-8,\\qquad -8+1=-7",
          "fallback": "a × c = 4 × (−2) = −8; b = −7 = −8 + 1",
          "display": true
        },
        "ta": "முதல் கெழு 4, மாறிலி −2. அவற்றின் பெருக்கற்பலன் −8. பெருக்கற்பலன் −8 ஆகவும் கூட்டுத்தொகை −7 ஆகவும் உள்ள எண்கள் −8 மற்றும் 1."
      },
      {
        "en": "Split the middle term −7x into −8x + x, then group the first two terms and the last two terms. Factor 4x out of (4x² − 8x) and +1 out of (x − 2) so both groups share the common factor (x − 2).",
        "eq": "4x² − 8x + x − 2 = 0 ⇒ 4x(x − 2) + 1(x − 2) = 0 ⇒ (4x + 1)(x − 2) = 0",
        "math": {
          "latex": "\\begin{aligned}4x^2-8x+x-2&=0\\\\4x(x-2)+1(x-2)&=0\\\\(4x+1)(x-2)&=0\\end{aligned}",
          "fallback": "4x² − 8x + x − 2 = 0 ⇒ 4x(x − 2) + 1(x − 2) = 0 ⇒ (4x + 1)(x − 2) = 0",
          "display": true
        },
        "ta": "நடு உறுப்பை −8x + x எனப் பிரிக்க. முதல் இரண்டு உறுப்புகளிலிருந்து 4x ஐ வெளியே எடுத்தால் இரு தொகுப்புகளிலும் x − 2 பொதுக்காரணியாகும்."
      },
      {
        "en": "By the zero-product property, a product equals zero when at least one factor is zero. Set 4x + 1 = 0 (subtract 1, then divide by 4) and x − 2 = 0 (add 2) to find both roots.",
        "eq": "4x + 1 = 0 ⇒ x = −1/4; x − 2 = 0 ⇒ x = 2",
        "math": {
          "latex": "\\begin{aligned}4x+1=0&\\implies x=-\\dfrac{1}{4}\\\\x-2=0&\\implies x=2\\end{aligned}",
          "fallback": "4x + 1 = 0 ⇒ x = −1/4; x − 2 = 0 ⇒ x = 2",
          "display": true
        },
        "ta": "பெருக்கற்பலன் பூச்சியம் என்பதால் 4x + 1 அல்லது x − 2 பூச்சியம். இரு நேரியல் சமன்பாடுகளையும் தீர்க்க."
      }
    ],
    "answer": "−1/4, 2",
    "answerMath": {
      "latex": "-\\dfrac{1}{4},\\;2",
      "fallback": "−1/4, 2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q1(i); printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-10-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q1(ii)",
      "ta": "பயிற்சி 3.10 · வினா 1(ii)"
    },
    "title": {
      "en": "Solve 3(p² − 6) = p(p + 5) by factorization method",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by factorization method\n(ii) 3(p² − 6) = p(p + 5)",
      "ta": "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (ii) 3(p² − 6) = p(p + 5)"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by factorization method\n(ii) ",
        {
          "latex": "3(p^2-6)=p(p+5)",
          "fallback": "3(p² − 6) = p(p + 5)",
          "display": false
        }
      ],
      "ta": [
        "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (ii) ",
        {
          "latex": "3(p^2-6)=p(p+5)",
          "fallback": "3(p² − 6) = p(p + 5)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Expand both sides cleanly before moving terms: multiply 3 across (p² − 6) and p across (p + 5). Then subtract (p² + 5p) from both sides so the right-hand side becomes 0; notice both signs flip when moved to the left.",
        "eq": "3p² − 18 = p² + 5p ⇒ 3p² − p² − 5p − 18 = 0 ⇒ 2p² − 5p − 18 = 0",
        "math": {
          "latex": "\\begin{aligned}3p^2-18&=p^2+5p\\\\3p^2-p^2-5p-18&=0\\\\2p^2-5p-18&=0\\end{aligned}",
          "fallback": "3p² − 18 = p² + 5p ⇒ 3p² − p² − 5p − 18 = 0 ⇒ 2p² − 5p − 18 = 0",
          "display": true
        },
        "ta": "இருபுறமும் அடைப்புக்குறிகளை விரிவாக்குக. இருபுறத்திலிருந்தும் p² + 5p ஐக் கழித்து அனைத்தையும் இடப்பக்கத்தில் எழுதுக."
      },
      {
        "en": "In 2p² − 5p − 18 = 0, multiply a = 2 by c = −18 to get −36, and look for two numbers whose sum is b = −5: they are −9 and +4 (since −9 × 4 = −36 and −9 + 4 = −5). Split −5p as −9p + 4p (or +4p − 9p) and factor by grouping.",
        "eq": "2p² + 4p − 9p − 18 = 0 ⇒ 2p(p + 2) − 9(p + 2) = 0 ⇒ (2p − 9)(p + 2) = 0",
        "math": {
          "latex": "\\begin{aligned}2p^2+4p-9p-18&=0\\\\2p(p+2)-9(p+2)&=0\\\\(2p-9)(p+2)&=0\\end{aligned}",
          "fallback": "2p² + 4p − 9p − 18 = 0 ⇒ 2p(p + 2) − 9(p + 2) = 0 ⇒ (2p − 9)(p + 2) = 0",
          "display": true
        },
        "ta": "முதல் கெழுவையும் மாறிலியையும் பெருக்கினால் −36. பெருக்கற்பலன் −36, கூடுதல் −5 கொண்ட எண்கள் −9, 4. அவற்றைப் பயன்படுத்தி நடு உறுப்பைப் பிரிக்க."
      },
      {
        "en": "When factoring −9p − 18, pulling out negative 9 flips the minus inside to plus: −9(p + 2). Equate each factor to zero to solve for p.",
        "eq": "p + 2 = 0 ⇒ p = −2; 2p − 9 = 0 ⇒ p = 9/2",
        "math": {
          "latex": "\\begin{aligned}p+2=0&\\implies p=-2\\\\2p-9=0&\\implies p=\\dfrac{9}{2}\\end{aligned}",
          "fallback": "p + 2 = 0 ⇒ p = −2; 2p − 9 = 0 ⇒ p = 9/2",
          "display": true
        },
        "ta": "−9p − 18 இலிருந்து −9 ஐ வெளியே எடுத்தால் −9(p + 2). காரணிகள் ஒவ்வொன்றையும் பூச்சியத்திற்குச் சமப்படுத்தி p ஐக் காண்க."
      }
    ],
    "answer": "−2, 9/2",
    "answerMath": {
      "latex": "-2,\\;\\dfrac{9}{2}",
      "fallback": "−2, 9/2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q1(ii); printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-10-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q1(iii)",
      "ta": "பயிற்சி 3.10 · வினா 1(iii)"
    },
    "title": {
      "en": "Solve √(a(a − 7)) = 3√2 by factorization method",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by factorization method\n(iii) √(a(a − 7)) = 3√2",
      "ta": "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (iii) √(a(a − 7)) = 3√2"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by factorization method\n(iii) ",
        {
          "latex": "\\sqrt{a(a-7)}=3\\sqrt{2}",
          "fallback": "√(a(a − 7)) = 3√2",
          "display": false
        }
      ],
      "ta": [
        "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (iii) ",
        {
          "latex": "\\sqrt{a(a-7)}=3\\sqrt{2}",
          "fallback": "√(a(a − 7)) = 3√2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "For √(a(a − 7)) to be a real number, the expression inside the square root must be non-negative: a(a − 7) ≥ 0. Square both sides to remove the radicals; on the right-hand side, (3√2)² = 3² × (√2)² = 9 × 2 = 18.",
        "eq": "a(a − 7) = (3√2)² ⇒ a² − 7a = 18 ⇒ a² − 7a − 18 = 0",
        "math": {
          "latex": "\\begin{aligned}a(a-7)&=(3\\sqrt{2})^2\\\\a^2-7a&=9\\times 2=18\\\\a^2-7a-18&=0\\end{aligned}",
          "fallback": "a(a − 7) = (3√2)² ⇒ a² − 7a = 18 ⇒ a² − 7a − 18 = 0",
          "display": true
        },
        "ta": "வர்க்கமூலம் மெய்யெண்ணாக இருக்க a(a − 7) ≥ 0. இருபுறமும் வர்க்கப்படுத்துக. வலப்பக்கத்தில் (3√2)² = 18."
      },
      {
        "en": "Find two numbers that multiply to −18 and add to −7: they are −9 and +2 (since −9 × 2 = −18 and −9 + 2 = −7). Factor a² − 7a − 18 = 0 directly.",
        "eq": "(a − 9)(a + 2) = 0 ⇒ a = 9 or a = −2",
        "math": {
          "latex": "(a-9)(a+2)=0\\implies a=9\\text{ or }a=-2",
          "fallback": "(a − 9)(a + 2) = 0 ⇒ a = 9 or a = −2",
          "display": true
        },
        "ta": "பெருக்கற்பலன் −18, கூடுதல் −7 கொண்ட எண்கள் −9 மற்றும் 2. இவற்றைப் பயன்படுத்தி a² − 7a − 18 ஐக் காரணிப்படுத்துக.",
        "mathTa": {
          "latex": "(a-9)(a+2)=0\\implies a=9\\text{ அல்லது }a=-2",
          "fallback": "(a − 9)(a + 2) = 0 ⇒ a = 9 அல்லது a = −2",
          "display": true
        }
      },
      {
        "en": "Always substitute candidate roots back into an equation containing a square root to rule out extraneous roots: at a = −2, (−2)(−2 − 7) = (−2)(−9) = 18 ≥ 0 and √18 = 3√2; at a = 9, 9(9 − 7) = 18 ≥ 0 and √18 = 3√2. Both satisfy the original equation.",
        "eq": "Check: a = −2 ⇒ √((−2)(−9)) = √18 = 3√2; a = 9 ⇒ √(9·2) = √18 = 3√2",
        "math": {
          "latex": "\\begin{aligned}a=-2:\\;&\\sqrt{(-2)(-9)}=\\sqrt{18}=3\\sqrt{2}\\\\a=9:\\;&\\sqrt{9\\times 2}=\\sqrt{18}=3\\sqrt{2}\\end{aligned}",
          "fallback": "Check: a = −2 ⇒ √((−2)(−9)) = √18 = 3√2; a = 9 ⇒ √(9·2) = √18 = 3√2",
          "display": true
        },
        "ta": "a = −2, a = 9 ஆகிய இரண்டையும் மூலச் சமன்பாட்டில் சரிபார்க்க. இரண்டு மதிப்புகளுக்கும் வர்க்கமூலத்திற்குள் 18 கிடைப்பதால் இரண்டும் தீர்வுகள்."
      }
    ],
    "answer": "−2, 9",
    "answerMath": {
      "latex": "-2,\\;9",
      "fallback": "−2, 9",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q1(iii); printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-10-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q1(iv)",
      "ta": "பயிற்சி 3.10 · வினா 1(iv)"
    },
    "title": {
      "en": "Solve √2 x² + 7x + 5√2 = 0 by factorization method",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by factorization method\n(iv) √2 x² + 7x + 5√2 = 0",
      "ta": "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (iv) √2 x² + 7x + 5√2 = 0"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by factorization method\n(iv) ",
        {
          "latex": "\\sqrt{2}\\,x^2+7x+5\\sqrt{2}=0",
          "fallback": "√2 x² + 7x + 5√2 = 0",
          "display": false
        }
      ],
      "ta": [
        "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (iv) ",
        {
          "latex": "\\sqrt{2}\\,x^2+7x+5\\sqrt{2}=0",
          "fallback": "√2 x² + 7x + 5√2 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Multiply a = √2 and c = 5√2 carefully: √2 × √2 = 2, so a × c = 5 × 2 = 10. Now find two numbers whose product is +10 and sum is b = +7: they are +2 and +5 (since 2 × 5 = 10 and 2 + 5 = 7).",
        "eq": "a × c = √2 × 5√2 = 5(2) = 10; 2 + 5 = 7",
        "math": {
          "latex": "a\\times c=\\sqrt{2}\\times 5\\sqrt{2}=5\\times 2=10,\\qquad 2+5=7",
          "fallback": "a × c = √2 × 5√2 = 5(2) = 10; 2 + 5 = 7",
          "display": true
        },
        "ta": "√2 மற்றும் 5√2 இன் பெருக்கற்பலன் 10. பெருக்கற்பலன் 10 ஆகவும் கூடுதல் 7 ஆகவும் உள்ள எண்கள் 2, 5."
      },
      {
        "en": "Split 7x into 2x + 5x. Rewrite 2 as (√2)(√2) so you can factor √2 x out of (√2 x² + 2x), leaving (x + √2). Factor 5 out of (5x + 5√2) to obtain the matching factor (x + √2).",
        "eq": "√2 x² + 2x + 5x + 5√2 = 0 ⇒ √2 x(x + √2) + 5(x + √2) = 0 ⇒ (√2 x + 5)(x + √2) = 0",
        "math": {
          "latex": "\\begin{aligned}\\sqrt{2}\\,x^2+2x+5x+5\\sqrt{2}&=0\\\\\\sqrt{2}\\,x(x+\\sqrt{2})+5(x+\\sqrt{2})&=0\\\\(\\sqrt{2}\\,x+5)(x+\\sqrt{2})&=0\\end{aligned}",
          "fallback": "√2 x² + 2x + 5x + 5√2 = 0 ⇒ √2 x(x + √2) + 5(x + √2) = 0 ⇒ (√2 x + 5)(x + √2) = 0",
          "display": true
        },
        "ta": "7x ஐ 2x + 5x எனப் பிரிக்க. முதல் தொகுப்பிலிருந்து √2 x ஐயும் இரண்டாவதிலிருந்து 5 ஐயும் வெளியே எடுத்தால் x + √2 பொதுக்காரணியாகும்."
      },
      {
        "en": "Equate each factor to zero and solve for x.",
        "eq": "x + √2 = 0 ⇒ x = −√2; √2 x + 5 = 0 ⇒ x = −5/√2",
        "math": {
          "latex": "\\begin{aligned}x+\\sqrt{2}=0&\\implies x=-\\sqrt{2}\\\\\\sqrt{2}\\,x+5=0&\\implies x=-\\dfrac{5}{\\sqrt{2}}\\end{aligned}",
          "fallback": "x + √2 = 0 ⇒ x = −√2; √2 x + 5 = 0 ⇒ x = −5/√2",
          "display": true
        },
        "ta": "ஒவ்வொரு காரணியையும் பூச்சியத்திற்குச் சமப்படுத்தி x இன் இரு மதிப்புகளைக் காண்க."
      }
    ],
    "answer": "−√2, −5/√2",
    "answerMath": {
      "latex": "-\\sqrt{2},\\;-\\dfrac{5}{\\sqrt{2}}",
      "fallback": "−√2, −5/√2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q1(iv); printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-10-q1-v",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q1(v)",
      "ta": "பயிற்சி 3.10 · வினா 1(v)"
    },
    "title": {
      "en": "Solve 2x² − x + 1/8 = 0 by factorization method",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "1. Solve the following quadratic equations by factorization method\n(v) 2x² − x + 1/8 = 0",
      "ta": "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (v) 2x² − x + 1/8 = 0"
    },
    "questionMath": {
      "en": [
        "1. Solve the following quadratic equations by factorization method\n(v) ",
        {
          "latex": "2x^2-x+\\dfrac{1}{8}=0",
          "fallback": "2x² − x + 1/8 = 0",
          "display": false
        }
      ],
      "ta": [
        "காரணிப்படுத்தல் முறையைப் பயன்படுத்திப் பின்வரும் இருபடிச் சமன்பாடுகளைத் தீர்க்க. (v) ",
        {
          "latex": "2x^2-x+\\dfrac{1}{8}=0",
          "fallback": "2x² − x + 1/8 = 0",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Clear the fraction 1/8 by multiplying EVERY term on both sides of the equation by 8 (2x² × 8 = 16x², −x × 8 = −8x, (1/8) × 8 = 1, and 0 × 8 = 0).",
        "eq": "16x² − 8x + 1 = 0",
        "math": {
          "latex": "8\\left(2x^2-x+\\dfrac{1}{8}\\right)=8(0)\\implies 16x^2-8x+1=0",
          "fallback": "16x² − 8x + 1 = 0",
          "display": true
        },
        "ta": "1/8 என்ற பின்னத்தை நீக்க இருபுறமும் உள்ள எல்லா உறுப்புகளையும் 8 ஆல் பெருக்குக."
      },
      {
        "en": "Notice 16x² − 8x + 1 is a perfect square trinomial: (4x)² − 2(4x)(1) + 1² = (4x − 1)². Equivalently, a × c = 16 × 1 = 16 and −4 + (−4) = −8, giving (4x − 1)(4x − 1) = 0.",
        "eq": "16x² − 4x − 4x + 1 = 0 ⇒ 4x(4x − 1) − 1(4x − 1) = 0 ⇒ (4x − 1)(4x − 1) = 0",
        "math": {
          "latex": "\\begin{aligned}16x^2-4x-4x+1&=0\\\\4x(4x-1)-1(4x-1)&=0\\\\(4x-1)^2&=0\\end{aligned}",
          "fallback": "16x² − 4x − 4x + 1 = 0 ⇒ 4x(4x − 1) − 1(4x − 1) = 0 ⇒ (4x − 1)(4x − 1) = 0",
          "display": true
        },
        "ta": "16x² − 8x + 1 இன் முதல், கடைசி உறுப்புகள் வர்க்கங்கள். நடு உறுப்பு −2(4x)(1) என்பதால் (4x − 1)² = 0."
      },
      {
        "en": "Since both factors are (4x − 1), this quadratic has two equal real roots: x = 1/4, 1/4.",
        "eq": "4x − 1 = 0 ⇒ x = 1/4, 1/4",
        "math": {
          "latex": "4x-1=0\\implies x=\\dfrac{1}{4},\\;\\dfrac{1}{4}",
          "fallback": "4x − 1 = 0 ⇒ x = 1/4, 1/4",
          "display": true
        },
        "ta": "இரு காரணிகளும் 4x − 1 என்பதால் இரண்டு சமமான மூலங்கள் கிடைக்கும். இரண்டும் 1/4."
      }
    ],
    "answer": "1/4, 1/4",
    "answerMath": {
      "latex": "\\dfrac{1}{4},\\;\\dfrac{1}{4}",
      "fallback": "1/4, 1/4",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q1(v); printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-10-q2",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.10",
    "topic": {
      "en": "Algebra — Solving Quadratic Equations by Factorization",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.10 · Q2",
      "ta": "பயிற்சி 3.10 · வினா 2"
    },
    "title": {
      "en": "Find the number of teams in a volleyball league scheduling 15 games",
      "ta": "காரணிப்படுத்தல் முறையில் இருபடிச் சமன்பாடுகள்"
    },
    "q": {
      "en": "2. The number of volleyball games that must be scheduled in a league with n teams is given by G(n) = (n² − n)/2 where each team plays with every other team exactly once. A league schedules 15 games. How many teams are in the league?",
      "ta": "n அணிகள் பங்குபெறும் ஒரு கைப்பந்து விளையாட்டுப் போட்டியில் ஒவ்வோர் அணியும் மற்ற அனைத்து அணிகளோடும் ஒருமுறை விளையாட வேண்டும். 15 போட்டிகள் கொண்ட தொடரில் மொத்தப் போட்டிகளின் எண்ணிக்கை G(n) = (n² − n)/2 எனில், பங்கேற்கும் அணிகளின் எண்ணிக்கை எத்தனை?"
    },
    "questionMath": {
      "en": [
        "2. The number of volleyball games that must be scheduled in a league with n teams is given by ",
        {
          "latex": "G(n)=\\dfrac{n^2-n}{2}",
          "fallback": "G(n) = (n² − n)/2",
          "display": false
        },
        " where each team plays with every other team exactly once. A league schedules 15 games. How many teams are in the league?"
      ],
      "ta": [
        "n அணிகள் பங்குபெறும் ஒரு கைப்பந்து விளையாட்டுப் போட்டியில் ஒவ்வோர் அணியும் மற்ற அனைத்து அணிகளோடும் ஒருமுறை விளையாட வேண்டும். 15 போட்டிகள் கொண்ட தொடரில் மொத்தப் போட்டிகளின் எண்ணிக்கை ",
        {
          "latex": "G(n)=\\dfrac{n^2-n}{2}",
          "fallback": "G(n) = (n² − n)/2",
          "display": false
        },
        " எனில், பங்கேற்கும் அணிகளின் எண்ணிக்கை எத்தனை?"
      ]
    },
    "steps": [
      {
        "en": "Substitute G(n) = 15 into the given formula G(n) = (n² − n)/2. Clear the denominator 2 by multiplying both sides by 2, then subtract 30 from both sides to write standard quadratic form.",
        "eq": "(n² − n)/2 = 15 ⇒ n² − n = 30 ⇒ n² − n − 30 = 0",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{n^2-n}{2}&=15\\\\n^2-n&=30\\\\n^2-n-30&=0\\end{aligned}",
          "fallback": "(n² − n)/2 = 15 ⇒ n² − n = 30 ⇒ n² − n − 30 = 0",
          "display": true
        },
        "ta": "கொடுக்கப்பட்ட சூத்திரத்தில் G(n) = 15 எனப் பிரதியிடுக. இருபுறமும் 2 ஆல் பெருக்கி 30 ஐக் கழித்தால் இருபடிச் சமன்பாடு கிடைக்கும்."
      },
      {
        "en": "Find two numbers whose product is −30 and sum is −1: they are −6 and +5 (since −6 × 5 = −30 and −6 + 5 = −1). Factor n² − n − 30 = 0 and solve.",
        "eq": "(n − 6)(n + 5) = 0 ⇒ n = 6 or n = −5",
        "math": {
          "latex": "(n-6)(n+5)=0\\implies n=6\\text{ or }n=-5",
          "fallback": "(n − 6)(n + 5) = 0 ⇒ n = 6 or n = −5",
          "display": true
        },
        "ta": "பெருக்கற்பலன் −30, கூடுதல் −1 கொண்ட எண்கள் −6 மற்றும் 5. நடு உறுப்பைப் பிரித்துக் காரணிப்படுத்தி n ஐக் காண்க.",
        "mathTa": {
          "latex": "(n-6)(n+5)=0\\implies n=6\\text{ அல்லது }n=-5",
          "fallback": "(n − 6)(n + 5) = 0 ⇒ n = 6 அல்லது n = −5",
          "display": true
        }
      },
      {
        "en": "The number of teams n cannot be negative, so reject n = −5. Check n = 6: G(6) = (6² − 6)/2 = 30/2 = 15 games. Therefore, there are 6 teams in the league.",
        "eq": "n = 6 (since n > 0; check: (36 − 6)/2 = 15)",
        "math": {
          "latex": "n=6\\quad(\\text{reject }n=-5;\\;\\dfrac{6^2-6}{2}=15)",
          "fallback": "n = 6 (since n > 0; check: (36 − 6)/2 = 15)",
          "display": true
        },
        "ta": "அணிகளின் எண்ணிக்கை எதிர்மறையாக இருக்க முடியாது. எனவே −5 ஐ விலக்குக. n = 6 எனில் ஆட்டங்களின் எண்ணிக்கை (36 − 6)/2 = 15. ஆகவே 6 அணிகள்.",
        "mathTa": {
          "latex": "n=6\\quad(\\text{விலக்குக }n=-5;\\;\\dfrac{6^2-6}{2}=15)",
          "fallback": "n = 6 (ஏனெனில் n > 0; சரிபார்ப்பு: (36 − 6)/2 = 15)",
          "display": true
        }
      }
    ],
    "answer": "6",
    "answerMath": {
      "latex": "6",
      "fallback": "6",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.10 Q2; printed p. 111, PDF p. 117; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.10 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
