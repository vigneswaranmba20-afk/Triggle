/* Grade 10 Ch 3 Ex 3.4 (Q1(i)-(iv), Q2(i)-(iv)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 105 (printed p. 99), Tamil PDF p. 107 (printed p. 101),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-4-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(i)",
      "ta": "பயிற்சி 3.4 · வினா 1(i)"
    },
    "title": {
      "en": "Reduce (x² − 1) / (x² + x) to its lowest form",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (i) (x² − 1)/(x² + x)",
      "ta": "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (i) (x² − 1)/(x² + x)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (i) ",
        {
          "latex": "\\dfrac{x^2-1}{x^2+x}",
          "fallback": "(x² − 1)/(x² + x)",
          "display": false
        }
      ],
      "ta": [
        "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (i) ",
        {
          "latex": "\\dfrac{x^2-1}{x^2+x}",
          "fallback": "(x² − 1)/(x² + x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x² − 1 using the difference of squares identity (x − 1)(x + 1), and factor out x from the denominator x² + x.",
        "eq": "(x² − 1)/(x² + x) = [(x − 1)(x + 1)] / [x(x + 1)]",
        "math": {
          "latex": "\\dfrac{x^2-1}{x^2+x}=\\dfrac{(x-1)(x+1)}{x(x+1)}",
          "fallback": "(x² − 1)/(x² + x) = [(x − 1)(x + 1)] / [x(x + 1)]",
          "display": true
        },
        "ta": "தொகுதியை வர்க்கங்களின் வித்தியாசமாக (x − 1)(x + 1) எனவும் பகுதியை x(x + 1) எனவும் காரணிப்படுத்துக."
      },
      {
        "en": "Cancel the common factor (x + 1) from the numerator and denominator. Therefore, the rational expression in its lowest form is (x − 1)/x.",
        "eq": "= (x − 1)/x",
        "math": {
          "latex": "=\\dfrac{x-1}{x}",
          "fallback": "= (x − 1)/x",
          "display": true
        },
        "ta": "தொகுதியிலும் பகுதியிலும் உள்ள பொதுக்காரணி x + 1 ஐ நீக்கினால் எளிய வடிவம் கிடைக்கும்."
      }
    ],
    "answer": "(x − 1)/x",
    "answerMath": {
      "latex": "\\dfrac{x-1}{x}",
      "fallback": "(x − 1)/x",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(i); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(ii)",
      "ta": "பயிற்சி 3.4 · வினா 1(ii)"
    },
    "title": {
      "en": "Reduce (x² − 11x + 18) / (x² − 4x + 4) to its lowest form",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (ii) (x² − 11x + 18)/(x² − 4x + 4)",
      "ta": "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (ii) (x² − 11x + 18)/(x² − 4x + 4)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (ii) ",
        {
          "latex": "\\dfrac{x^2-11x+18}{x^2-4x+4}",
          "fallback": "(x² − 11x + 18)/(x² − 4x + 4)",
          "display": false
        }
      ],
      "ta": [
        "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (ii) ",
        {
          "latex": "\\dfrac{x^2-11x+18}{x^2-4x+4}",
          "fallback": "(x² − 11x + 18)/(x² − 4x + 4)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x² − 11x + 18 into (x − 9)(x − 2) and the denominator x² − 4x + 4 into (x − 2)².",
        "eq": "(x² − 11x + 18)/(x² − 4x + 4) = [(x − 9)(x − 2)] / [(x − 2)(x − 2)]",
        "math": {
          "latex": "\\dfrac{x^2-11x+18}{x^2-4x+4}=\\dfrac{(x-9)(x-2)}{(x-2)(x-2)}",
          "fallback": "(x² − 11x + 18)/(x² − 4x + 4) = [(x − 9)(x − 2)] / [(x − 2)(x − 2)]",
          "display": true
        },
        "ta": "தொகுதி (x − 9)(x − 2) என்றும் பகுதி (x − 2)² என்றும் காரணிப்படும்."
      },
      {
        "en": "Cancel the common factor (x − 2) from the numerator and denominator. Therefore, the expression in its lowest form is (x − 9)/(x − 2).",
        "eq": "= (x − 9)/(x − 2)",
        "math": {
          "latex": "=\\dfrac{x-9}{x-2}",
          "fallback": "= (x − 9)/(x − 2)",
          "display": true
        },
        "ta": "தொகுதியிலும் பகுதியிலும் உள்ள பொதுக்காரணி x − 2 ஐ நீக்கி எளிய வடிவத்தை எழுதுக."
      }
    ],
    "answer": "(x − 9)/(x − 2)",
    "answerMath": {
      "latex": "\\dfrac{x-9}{x-2}",
      "fallback": "(x − 9)/(x − 2)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(ii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(iii)",
      "ta": "பயிற்சி 3.4 · வினா 1(iii)"
    },
    "title": {
      "en": "Reduce (9x² + 81x) / (x³ + 8x² − 9x) to its lowest form",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (iii) (9x² + 81x)/(x³ + 8x² − 9x)",
      "ta": "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (iii) (9x² + 81x)/(x³ + 8x² − 9x)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (iii) ",
        {
          "latex": "\\dfrac{9x^2+81x}{x^3+8x^2-9x}",
          "fallback": "(9x² + 81x)/(x³ + 8x² − 9x)",
          "display": false
        }
      ],
      "ta": [
        "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (iii) ",
        {
          "latex": "\\dfrac{9x^2+81x}{x^3+8x^2-9x}",
          "fallback": "(9x² + 81x)/(x³ + 8x² − 9x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out 9x from the numerator 9x² + 81x and factor out x from the denominator x³ + 8x² − 9x.",
        "eq": "(9x² + 81x)/(x³ + 8x² − 9x) = [9x(x + 9)] / [x(x² + 8x − 9)]",
        "math": {
          "latex": "\\dfrac{9x^2+81x}{x^3+8x^2-9x}=\\dfrac{9x(x+9)}{x(x^2+8x-9)}",
          "fallback": "(9x² + 81x)/(x³ + 8x² − 9x) = [9x(x + 9)] / [x(x² + 8x − 9)]",
          "display": true
        },
        "ta": "தொகுதியிலிருந்து 9x ஐயும் பகுதியிலிருந்து x ஐயும் பொதுக்காரணியாக வெளியே எடுக்க."
      },
      {
        "en": "Factorize the quadratic x² + 8x − 9 into (x + 9)(x − 1), then cancel the common factors x and (x + 9). Therefore, the rational expression in its lowest form is 9/(x − 1).",
        "eq": "= [9x(x + 9)] / [x(x + 9)(x − 1)] = 9/(x − 1)",
        "math": {
          "latex": "=\\dfrac{9x(x+9)}{x(x+9)(x-1)}=\\dfrac{9}{x-1}",
          "fallback": "= [9x(x + 9)] / [x(x + 9)(x − 1)] = 9/(x − 1)",
          "display": true
        },
        "ta": "x² + 8x − 9 ஐ (x + 9)(x − 1) எனக் காரணிப்படுத்துக. பொதுக் காரணிகளான x மற்றும் x + 9 ஐ நீக்குக."
      }
    ],
    "answer": "9/(x − 1)",
    "answerMath": {
      "latex": "\\dfrac{9}{x-1}",
      "fallback": "9/(x − 1)",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(iii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q1-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q1(iv)",
      "ta": "பயிற்சி 3.4 · வினா 1(iv)"
    },
    "title": {
      "en": "Reduce (p² − 3p − 40) / (2p³ − 24p² + 64p) to its lowest form",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Reduce each of the following rational expressions to its lowest form. (iv) (p² − 3p − 40)/(2p³ − 24p² + 64p)",
      "ta": "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (iv) (p² − 3p − 40)/(2p³ − 24p² + 64p)"
    },
    "questionMath": {
      "en": [
        "Reduce each of the following rational expressions to its lowest form. (iv) ",
        {
          "latex": "\\dfrac{p^2-3p-40}{2p^3-24p^2+64p}",
          "fallback": "(p² − 3p − 40)/(2p³ − 24p² + 64p)",
          "display": false
        }
      ],
      "ta": [
        "பின்வரும் விகிதமுறு கோவைகளை எளிய வடிவிற்குச் சுருக்குக. (iv) ",
        {
          "latex": "\\dfrac{p^2-3p-40}{2p^3-24p^2+64p}",
          "fallback": "(p² − 3p − 40)/(2p³ − 24p² + 64p)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator p² − 3p − 40 into (p − 8)(p + 5) and factor out 2p from the denominator 2p³ − 24p² + 64p.",
        "eq": "(p² − 3p − 40)/(2p³ − 24p² + 64p) = [(p − 8)(p + 5)] / [2p(p² − 12p + 32)]",
        "math": {
          "latex": "\\dfrac{p^2-3p-40}{2p^3-24p^2+64p}=\\dfrac{(p-8)(p+5)}{2p(p^2-12p+32)}",
          "fallback": "(p² − 3p − 40)/(2p³ − 24p² + 64p) = [(p − 8)(p + 5)] / [2p(p² − 12p + 32)]",
          "display": true
        },
        "ta": "தொகுதியை (p − 8)(p + 5) எனக் காரணிப்படுத்துக. பகுதியிலிருந்து 2p ஐ வெளியே எடுக்க."
      },
      {
        "en": "Factorize p² − 12p + 32 into (p − 8)(p − 4) and cancel the common factor (p − 8). Therefore, the rational expression in its lowest form is (p + 5)/[2p(p − 4)].",
        "eq": "= [(p − 8)(p + 5)] / [2p(p − 8)(p − 4)] = (p + 5)/[2p(p − 4)]",
        "math": {
          "latex": "=\\dfrac{(p-8)(p+5)}{2p(p-8)(p-4)}=\\dfrac{p+5}{2p(p-4)}",
          "fallback": "= [(p − 8)(p + 5)] / [2p(p − 8)(p − 4)] = (p + 5)/[2p(p − 4)]",
          "display": true
        },
        "ta": "p² − 12p + 32 ஐ (p − 8)(p − 4) எனக் காரணிப்படுத்தி பொதுக்காரணி p − 8 ஐ நீக்குக."
      }
    ],
    "answer": "(p + 5)/[2p(p − 4)]",
    "answerMath": {
      "latex": "\\dfrac{p+5}{2p(p-4)}",
      "fallback": "(p + 5)/[2p(p − 4)]",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q1(iv); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(i)",
      "ta": "பயிற்சி 3.4 · வினா 2(i)"
    },
    "title": {
      "en": "Find the excluded values of y / (y² − 25)",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (i) y/(y² − 25)",
      "ta": "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (i) y/(y² − 25)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (i) ",
        {
          "latex": "\\dfrac{y}{y^2-25}",
          "fallback": "y/(y² − 25)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (i) ",
        {
          "latex": "\\dfrac{y}{y^2-25}",
          "fallback": "y/(y² − 25)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The rational expression y/(y² − 25) is already in its lowest form. It is undefined when the denominator equals zero, so set y² − 25 = 0.",
        "eq": "y² − 25 = 0 ⇒ (y + 5)(y − 5) = 0",
        "math": {
          "latex": "y^2-25=0\\implies(y+5)(y-5)=0",
          "fallback": "y² − 25 = 0 ⇒ (y + 5)(y − 5) = 0",
          "display": true
        },
        "ta": "இக்கோவை எளிய வடிவில் உள்ளது. பகுதி பூச்சியமாகும்போது கோவை வரையறுக்கப்படாது. எனவே y² − 25 = 0 என்க."
      },
      {
        "en": "Solve for y. Therefore, the excluded values are −5 and 5.",
        "eq": "y = −5, 5",
        "math": {
          "latex": "y=-5,\\;5",
          "fallback": "y = −5, 5",
          "display": true
        },
        "ta": "இச்சமன்பாட்டைத் தீர்த்தால் விலக்கப்பட்ட மதிப்புகள் −5 மற்றும் 5."
      }
    ],
    "answer": "−5, 5",
    "answerMath": {
      "latex": "-5,\\;5",
      "fallback": "−5, 5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(i); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(ii)",
      "ta": "பயிற்சி 3.4 · வினா 2(ii)"
    },
    "title": {
      "en": "Find the excluded values of t / (t² − 5t + 6)",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (ii) t/(t² − 5t + 6)",
      "ta": "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (ii) t/(t² − 5t + 6)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (ii) ",
        {
          "latex": "\\dfrac{t}{t^2-5t+6}",
          "fallback": "t/(t² − 5t + 6)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (ii) ",
        {
          "latex": "\\dfrac{t}{t^2-5t+6}",
          "fallback": "t/(t² − 5t + 6)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "The rational expression t/(t² − 5t + 6) is in lowest form. Set the denominator equal to zero and factorize the quadratic trinomial.",
        "eq": "t² − 5t + 6 = 0 ⇒ (t − 2)(t − 3) = 0",
        "math": {
          "latex": "t^2-5t+6=0\\implies(t-2)(t-3)=0",
          "fallback": "t² − 5t + 6 = 0 ⇒ (t − 2)(t − 3) = 0",
          "display": true
        },
        "ta": "இக்கோவை எளிய வடிவில் உள்ளது. பகுதியைப் பூச்சியத்திற்குச் சமப்படுத்தி இருபடிக் கோவையைக் காரணிப்படுத்துக."
      },
      {
        "en": "Solve each linear factor for t. Therefore, the excluded values are 2 and 3.",
        "eq": "t = 2, 3",
        "math": {
          "latex": "t=2,\\;3",
          "fallback": "t = 2, 3",
          "display": true
        },
        "ta": "ஒவ்வொரு காரணியையும் பூச்சியத்திற்குச் சமப்படுத்தினால் விலக்கப்பட்ட மதிப்புகள் 2 மற்றும் 3."
      }
    ],
    "answer": "2, 3",
    "answerMath": {
      "latex": "2,\\;3",
      "fallback": "2, 3",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(ii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(iii)",
      "ta": "பயிற்சி 3.4 · வினா 2(iii)"
    },
    "title": {
      "en": "Find the excluded values of (x² + 6x + 8) / (x² + x − 2)",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (iii) (x² + 6x + 8)/(x² + x − 2)",
      "ta": "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (iii) (x² + 6x + 8)/(x² + x − 2)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (iii) ",
        {
          "latex": "\\dfrac{x^2+6x+8}{x^2+x-2}",
          "fallback": "(x² + 6x + 8)/(x² + x − 2)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (iii) ",
        {
          "latex": "\\dfrac{x^2+6x+8}{x^2+x-2}",
          "fallback": "(x² + 6x + 8)/(x² + x − 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor the original denominator and set each factor equal to zero. The given expression is undefined at x = −2 and x = 1.",
        "eq": "x² + x − 2 = (x + 2)(x − 1); (x + 2)(x − 1) = 0 at x = −2 or x = 1",
        "math": {
          "latex": "\\begin{aligned}x^2+x-2&=(x+2)(x-1)\\\\(x+2)(x-1)=0&\\quad\\text{at }x=-2\\text{ or }x=1\\end{aligned}",
          "fallback": "x² + x − 2 = (x + 2)(x − 1); (x + 2)(x − 1) = 0 at x = −2 or x = 1",
          "display": true
        },
        "ta": "கொடுக்கப்பட்ட கோவையின் பகுதியைக் காரணிப்படுத்தி ஒவ்வொரு காரணியையும் பூச்சியத்திற்குச் சமப்படுத்துக. x = −2 மற்றும் x = 1 ஆகிய இரு மதிப்புகளிலும் மூலக் கோவை வரையறுக்கப்படாது."
      },
      {
        "en": "For values in the original domain, factor the numerator and cancel x + 2. The textbook key lists 1 because it uses the denominator of the reduced form. Cancelling x + 2 does not give the original expression a value at x = −2.",
        "eq": "[(x + 4)(x + 2)]/[(x + 2)(x − 1)] = (x + 4)/(x − 1) for x ≠ −2, 1",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{(x+4)(x+2)}{(x+2)(x-1)}&=\\dfrac{x+4}{x-1}\\\\x&\\notin\\{-2,1\\}\\end{aligned}",
          "fallback": "[(x + 4)(x + 2)]/[(x + 2)(x − 1)] = (x + 4)/(x − 1) for x ≠ −2, 1",
          "display": true
        },
        "ta": "மூலக் கோவை வரையறுக்கப்படும் மதிப்புகளுக்கு, தொகுதியைக் காரணிப்படுத்திப் பொதுக்காரணி x + 2 ஐ நீக்கலாம். எளிய வடிவின் பகுதியை மட்டும் கொண்டு பாடநூல் விடைக்குறிப்பு 1 எனத் தருகிறது. x = −2 இல் மூலக் கோவை தொடர்ந்து வரையறுக்கப்படாது."
      }
    ],
    "answer": "Original expression: x = −2, 1 are excluded. Reduced form (textbook key): x = 1 only.",
    "answerMath": {
      "en": {
        "latex": "\\begin{aligned}\\text{Original exclusions: }&x=-2,\\,1\\\\\\text{Reduced form: }&x=1\\end{aligned}",
        "fallback": "Original expression: x = −2, 1 are excluded. Reduced form (textbook key): x = 1 only.",
        "display": true
      },
      "ta": {
        "latex": "\\begin{aligned}\\text{மூலக் கோவையின் விலக்குகள்: }&x=-2,\\,1\\\\\\text{எளிய வடிவம்: }&x=1\\end{aligned}",
        "fallback": "மூலக் கோவையின் விலக்கப்பட்ட மதிப்புகள்: x = −2, 1. எளிய வடிவில் (பாடநூல் விடைக்குறிப்பு): x = 1 மட்டும்.",
        "display": true
      }
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(iii); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-4-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.4",
    "topic": {
      "en": "Algebra — Excluded Values of Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.4 · Q2(iv)",
      "ta": "பயிற்சி 3.4 · வினா 2(iv)"
    },
    "title": {
      "en": "Find the excluded values of (x³ − 27) / (x³ + x² − 6x)",
      "ta": "விகிதமுறு கோவைகள்"
    },
    "q": {
      "en": "Find the excluded values, if any of the following expressions. (iv) (x³ − 27)/(x³ + x² − 6x)",
      "ta": "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (iv) (x³ − 27)/(x³ + x² − 6x)"
    },
    "questionMath": {
      "en": [
        "Find the excluded values, if any of the following expressions. (iv) ",
        {
          "latex": "\\dfrac{x^3-27}{x^3+x^2-6x}",
          "fallback": "(x³ − 27)/(x³ + x² − 6x)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளுக்கு விலக்கப்பட்ட மதிப்புகள் இருப்பின் அவற்றைக் காண்க. (iv) ",
        {
          "latex": "\\dfrac{x^3-27}{x^3+x^2-6x}",
          "fallback": "(x³ − 27)/(x³ + x² − 6x)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factorize the numerator x³ − 27 = (x − 3)(x² + 3x + 9) and factorize the denominator x³ + x² − 6x = x(x² + x − 6) = x(x + 3)(x − 2). Since there are no common factors, the expression is already in its lowest form.",
        "eq": "(x³ − 27)/(x³ + x² − 6x) = [(x − 3)(x² + 3x + 9)] / [x(x + 3)(x − 2)]",
        "math": {
          "latex": "\\dfrac{x^3-27}{x^3+x^2-6x}=\\dfrac{(x-3)(x^2+3x+9)}{x(x+3)(x-2)}",
          "fallback": "(x³ − 27)/(x³ + x² − 6x) = [(x − 3)(x² + 3x + 9)] / [x(x + 3)(x − 2)]",
          "display": true
        },
        "ta": "தொகுதியைக் கனங்களின் வித்தியாசமாகக் காரணிப்படுத்துக. பகுதி x(x + 3)(x − 2). பொதுக்காரணி இல்லாததால் இதுவே எளிய வடிவம்."
      },
      {
        "en": "Set the factored denominator equal to zero: x(x + 3)(x − 2) = 0. Therefore, the excluded values are 0, −3, and 2.",
        "eq": "x(x + 3)(x − 2) = 0 ⇒ x = 0, −3, 2",
        "math": {
          "latex": "x(x+3)(x-2)=0\\implies x=0,\\;-3,\\;2",
          "fallback": "x(x + 3)(x − 2) = 0 ⇒ x = 0, −3, 2",
          "display": true
        },
        "ta": "பகுதியிலுள்ள ஒவ்வொரு காரணியையும் பூச்சியத்திற்குச் சமப்படுத்தினால் விலக்கப்பட்ட மதிப்புகள் 0, −3 மற்றும் 2."
      }
    ],
    "answer": "0, −3, 2",
    "answerMath": {
      "latex": "0,\\;-3,\\;2",
      "fallback": "0, −3, 2",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.4 Q2(iv); printed p. 99, PDF p. 105; Answer Appendix printed p. 337, PDF p. 343; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.4 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
