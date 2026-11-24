/* Grade 10 Ch 3 Ex 3.7 (Q1(i)-(iii), Q2(i)-(iv)) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 111 (printed p. 105), Tamil PDF p. 113 (printed p. 107),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-7-q1-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q1(i)",
      "ta": "பயிற்சி 3.7 · வினா 1(i)"
    },
    "title": {
      "en": "Find the square root of (400 x⁴ y¹² z¹⁶) / (100 x⁸ y⁴ z⁴)",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "1. Find the square root of the following rational expressions.\n(i) (400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴)",
      "ta": "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (i) (400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴)"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following rational expressions.\n(i) ",
        {
          "latex": "\\dfrac{400x^4y^{12}z^{16}}{100x^8y^4z^4}",
          "fallback": "(400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴)",
          "display": false
        }
      ],
      "ta": [
        "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (i) ",
        {
          "latex": "\\dfrac{400x^4y^{12}z^{16}}{100x^8y^4z^4}",
          "fallback": "(400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "First divide the numerical coefficients (400 ÷ 100 = 4) and cancel the common powers of each variable using aᵐ / aⁿ = aᵐ⁻ⁿ. Because x⁸ in the denominator has a higher power than x⁴ in the numerator, x⁴ remains in the denominator (1 / x⁸⁻⁴ = 1 / x⁴).",
        "eq": "(400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴) = (4y¹²⁻⁴z¹⁶⁻⁴)/(x⁸⁻⁴) = (4y⁸z¹²)/x⁴",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{400x^4y^{12}z^{16}}{100x^8y^4z^4}&=\\dfrac{4y^{12-4}z^{16-4}}{x^{8-4}}\\\\&=\\dfrac{4y^8z^{12}}{x^4}\\end{aligned}",
          "fallback": "(400x⁴y¹²z¹⁶)/(100x⁸y⁴z⁴) = (4y¹²⁻⁴z¹⁶⁻⁴)/(x⁸⁻⁴) = (4y⁸z¹²)/x⁴",
          "display": true
        },
        "ta": "400 ஐ 100 ஆல் வகுக்க. ஒரே அடியுள்ள அடுக்குகளை வகுக்கும்போது அடுக்கெண்களைக் கழிக்க. x இன் அடுக்கு பகுதியில் அதிகமாக இருப்பதால் பகுதியில் x⁴ எஞ்சும்."
      },
      {
        "en": "Now take the square root of both numerator and denominator. Since √4 = 2 and taking the square root of an even power halves its exponent (y⁸ → y⁴, z¹² → z⁶, x⁴ → x²), write absolute value bars around the variable expression because √(a²) = |a|.",
        "eq": "√[(4y⁸z¹²)/x⁴] = 2 |y⁴z⁶ / x²|",
        "math": {
          "latex": "\\sqrt{\\dfrac{4y^8z^{12}}{x^4}}=2\\left|\\dfrac{y^4z^6}{x^2}\\right|",
          "fallback": "√[(4y⁸z¹²)/x⁴] = 2 |y⁴z⁶ / x²|",
          "display": true
        },
        "ta": "தொகுதி மற்றும் பகுதியின் வர்க்கமூலங்களை எடுக்க. 4 இன் வர்க்கமூலம் 2. இரட்டைப்படை அடுக்குகளைப் பாதியாக்கி முதன்மை வர்க்கமூலத்திற்குத் தனிமதிப்புக் குறியைப் பயன்படுத்துக."
      }
    ],
    "answer": "2 |y⁴z⁶ / x²|",
    "answerMath": {
      "latex": "2\\left|\\dfrac{y^4z^6}{x^2}\\right|",
      "fallback": "2 |y⁴z⁶ / x²|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q1(i); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q1-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q1(ii)",
      "ta": "பயிற்சி 3.7 · வினா 1(ii)"
    },
    "title": {
      "en": "Find the square root of (7x² + 2√14 x + 2) / (x² − (1/2)x + 1/16)",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "1. Find the square root of the following rational expressions.\n(ii) (7x² + 2√14 x + 2) / (x² − (1/2)x + 1/16)",
      "ta": "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (ii) (7x² + 2√14 x + 2) / (x² − (1/2)x + 1/16)"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following rational expressions.\n(ii) ",
        {
          "latex": "\\dfrac{7x^2+2\\sqrt{14}\\,x+2}{x^2-\\dfrac{1}{2}x+\\dfrac{1}{16}}",
          "fallback": "(7x² + 2√14 x + 2) / (x² − (1/2)x + 1/16)",
          "display": false
        }
      ],
      "ta": [
        "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (ii) ",
        {
          "latex": "\\dfrac{7x^2+2\\sqrt{14}\\,x+2}{x^2-\\dfrac{1}{2}x+\\dfrac{1}{16}}",
          "fallback": "(7x² + 2√14 x + 2) / (x² − (1/2)x + 1/16)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor the numerator using a² + 2ab + b² = (a + b)². Notice 7 = (√7)², 2 = (√2)², and 2√14 x = 2(√7 x)(√2), so the numerator is a perfect square (√7 x + √2)².",
        "eq": "7x² + 2√14 x + 2 = (√7 x)² + 2(√7 x)(√2) + (√2)² = (√7 x + √2)²",
        "math": {
          "latex": "\\begin{aligned}7x^2+2\\sqrt{14}\\,x+2&=(\\sqrt{7}x)^2+2(\\sqrt{7}x)(\\sqrt{2})+(\\sqrt{2})^2\\\\&=(\\sqrt{7}x+\\sqrt{2})^2\\end{aligned}",
          "fallback": "7x² + 2√14 x + 2 = (√7 x)² + 2(√7 x)(√2) + (√2)² = (√7 x + √2)²",
          "display": true
        },
        "ta": "தொகுதியில் முதல், கடைசி உறுப்புகள் முறையே √7 x மற்றும் √2 இன் வர்க்கங்கள். நடு உறுப்பு அவற்றின் பெருக்கற்பலனின் இருமடங்கு. எனவே தொகுதி (√7 x + √2)²."
      },
      {
        "en": "Factor the denominator using a² − 2ab + b² = (a − b)². Here (1/2)x = 2(x)(1/4) and 1/16 = (1/4)², so x² − (1/2)x + 1/16 = (x − 1/4)². Combining over a common denominator 4 gives [(4x − 1)/4]² = (4x − 1)² / 16.",
        "eq": "x² − (1/2)x + 1/16 = (x − 1/4)² = (4x − 1)² / 16",
        "math": {
          "latex": "\\begin{aligned}x^2-\\dfrac{1}{2}x+\\dfrac{1}{16}&=x^2-2(x)\\left(\\dfrac{1}{4}\\right)+\\left(\\dfrac{1}{4}\\right)^2\\\\&=\\left(x-\\dfrac{1}{4}\\right)^2=\\dfrac{(4x-1)^2}{16}\\end{aligned}",
          "fallback": "x² − (1/2)x + 1/16 = (x − 1/4)² = (4x − 1)² / 16",
          "display": true
        },
        "ta": "பகுதியில் நடு உறுப்பு −2(x)(1/4) என்பதால் அது (x − 1/4)². இதை (4x − 1)²/16 என எழுதுக."
      },
      {
        "en": "Dividing by (4x − 1)² / 16 is the same as multiplying by 16 / (4x − 1)². Take the positive square root of 16 (which is 4) and apply modulus bars |...| around (√7 x + √2)/(4x − 1).",
        "eq": "√[16(√7 x + √2)² / (4x − 1)²] = 4 |(√7 x + √2)/(4x − 1)|",
        "math": {
          "latex": "\\sqrt{\\dfrac{16(\\sqrt{7}x+\\sqrt{2})^2}{(4x-1)^2}}=4\\left|\\dfrac{\\sqrt{7}x+\\sqrt{2}}{4x-1}\\right|",
          "fallback": "√[16(√7 x + √2)² / (4x − 1)²] = 4 |(√7 x + √2)/(4x − 1)|",
          "display": true
        },
        "ta": "பகுதியின் தலைகீழியால் பெருக்குக. 16 இன் வர்க்கமூலம் 4. மீதமுள்ள ஈவின் தனிமதிப்பை எடுத்தால் முதன்மை வர்க்கமூலம் கிடைக்கும்."
      }
    ],
    "answer": "4 |(√7 x + √2)/(4x − 1)|",
    "answerMath": {
      "latex": "4\\left|\\dfrac{\\sqrt{7}x+\\sqrt{2}}{4x-1}\\right|",
      "fallback": "4 |(√7 x + √2)/(4x − 1)|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q1(ii); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q1-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q1(iii)",
      "ta": "பயிற்சி 3.7 · வினா 1(iii)"
    },
    "title": {
      "en": "Find the square root of [121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(b − c)⁴(a − b)¹²(b − c)⁴]",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "1. Find the square root of the following rational expressions.\n(iii) [121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(b − c)⁴(a − b)¹²(b − c)⁴]",
      "ta": "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (iii) [121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(b − c)⁴(a − b)¹²(b − c)⁴]"
    },
    "questionMath": {
      "en": [
        "1. Find the square root of the following rational expressions.\n(iii) ",
        {
          "latex": "\\dfrac{121(a+b)^8(x+y)^8(b-c)^8}{81(b-c)^4(a-b)^{12}(b-c)^4}",
          "fallback": "[121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(b − c)⁴(a − b)¹²(b − c)⁴]",
          "display": false
        }
      ],
      "ta": [
        "பின்வருவனவற்றின் வர்க்கமூலம் காண்க. (iii) ",
        {
          "latex": "\\dfrac{121(a+b)^8(x+y)^8(b-c)^8}{81(b-c)^4(a-b)^{12}(b-c)^4}",
          "fallback": "[121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(b − c)⁴(a − b)¹²(b − c)⁴]",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Notice that (b − c)⁴ appears twice in the denominator. Add their exponents using aᵐ × aⁿ = aᵐ⁺ⁿ: (b − c)⁴ × (b − c)⁴ = (b − c)⁸. Then cancel (b − c)⁸ in the numerator with (b − c)⁸ in the denominator (for b ≠ c).",
        "eq": "[121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(a − b)¹²(b − c)⁸] = [121(a + b)⁸(x + y)⁸] / [81(a − b)¹²]",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{121(a+b)^8(x+y)^8(b-c)^8}{81(b-c)^4(a-b)^{12}(b-c)^4}&=\\dfrac{121(a+b)^8(x+y)^8(b-c)^8}{81(a-b)^{12}(b-c)^8}\\\\&=\\dfrac{121(a+b)^8(x+y)^8}{81(a-b)^{12}}\\end{aligned}",
          "fallback": "[121(a + b)⁸(x + y)⁸(b − c)⁸] / [81(a − b)¹²(b − c)⁸] = [121(a + b)⁸(x + y)⁸] / [81(a − b)¹²]",
          "display": true
        },
        "ta": "பகுதியில் (b − c)⁴ இருமுறை வருவதால் அவற்றின் பெருக்கற்பலன் (b − c)⁸. b ≠ c என்பதால் இக்காரணியைத் தொகுதியிலும் பகுதியிலும் நீக்கலாம்."
      },
      {
        "en": "Take the square root: √121 = 11, √81 = 9, and halve each even exponent: (a + b)⁸ → (a + b)⁴, (x + y)⁸ → (x + y)⁴, and (a − b)¹² → (a − b)⁶. Place absolute value bars around the expression.",
        "eq": "√([121(a + b)⁸(x + y)⁸] / [81(a − b)¹²]) = (11/9) |(a + b)⁴(x + y)⁴ / (a − b)⁶|",
        "math": {
          "latex": "\\sqrt{\\dfrac{121(a+b)^8(x+y)^8}{81(a-b)^{12}}}=\\dfrac{11}{9}\\left|\\dfrac{(a+b)^4(x+y)^4}{(a-b)^6}\\right|",
          "fallback": "√([121(a + b)⁸(x + y)⁸] / [81(a − b)¹²]) = (11/9) |(a + b)⁴(x + y)⁴ / (a − b)⁶|",
          "display": true
        },
        "ta": "121, 81 ஆகியவற்றின் வர்க்கமூலங்கள் 11, 9. எஞ்சிய காரணிகளின் அடுக்குகளைப் பாதியாக்கி ஈவின் தனிமதிப்பை எடுக்க."
      }
    ],
    "answer": "(11/9) |(a + b)⁴(x + y)⁴ / (a − b)⁶|",
    "answerMath": {
      "latex": "\\dfrac{11}{9}\\left|\\dfrac{(a+b)^4(x+y)^4}{(a-b)^6}\\right|",
      "fallback": "(11/9) |(a + b)⁴(x + y)⁴ / (a − b)⁶|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q1(iii); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q2(i)",
      "ta": "பயிற்சி 3.7 · வினா 2(i)"
    },
    "title": {
      "en": "Find the square root of 4x² + 20x + 25",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "2. Find the square root of the following\n(i) 4x² + 20x + 25",
      "ta": "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (i) 4x² + 20x + 25"
    },
    "questionMath": {
      "en": [
        "2. Find the square root of the following\n(i) ",
        {
          "latex": "4x^2+20x+25",
          "fallback": "4x² + 20x + 25",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (i) ",
        {
          "latex": "4x^2+20x+25",
          "fallback": "4x² + 20x + 25",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the first and last terms as squares: 4x² = (2x)² and 25 = 5². Check whether the middle term equals 2 × (2x) × 5 = 20x; since it matches, apply a² + 2ab + b² = (a + b)² with a = 2x and b = 5.",
        "eq": "4x² + 20x + 25 = (2x)² + 2(2x)(5) + 5² = (2x + 5)²",
        "math": {
          "latex": "\\begin{aligned}4x^2+20x+25&=(2x)^2+2(2x)(5)+5^2\\\\&=(2x+5)^2\\end{aligned}",
          "fallback": "4x² + 20x + 25 = (2x)² + 2(2x)(5) + 5² = (2x + 5)²",
          "display": true
        },
        "ta": "முதல் உறுப்பை (2x)² எனவும் கடைசி உறுப்பை 5² எனவும் எழுதுக. நடு உறுப்பு 2 × 2x × 5 என்பதால் இக்கோவை (2x + 5)²."
      },
      {
        "en": "Take the square root using √(a²) = |a| to ensure the principal square root is non-negative.",
        "eq": "√(4x² + 20x + 25) = √[(2x + 5)²] = |2x + 5|",
        "math": {
          "latex": "\\sqrt{4x^2+20x+25}=\\sqrt{(2x+5)^2}=|2x+5|",
          "fallback": "√(4x² + 20x + 25) = √[(2x + 5)²] = |2x + 5|",
          "display": true
        },
        "ta": "முதன்மை வர்க்கமூலம் குறையெண்ணாக இருக்காது. எனவே வர்க்கமூலம் 2x + 5 இன் தனிமதிப்பு."
      }
    ],
    "answer": "|2x + 5|",
    "answerMath": {
      "latex": "|2x+5|",
      "fallback": "|2x + 5|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q2(i); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q2(ii)",
      "ta": "பயிற்சி 3.7 · வினா 2(ii)"
    },
    "title": {
      "en": "Find the square root of 9x² − 24xy + 30xz − 40yz + 25z² + 16y²",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "2. Find the square root of the following\n(ii) 9x² − 24xy + 30xz − 40yz + 25z² + 16y²",
      "ta": "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (ii) 9x² − 24xy + 30xz − 40yz + 25z² + 16y²"
    },
    "questionMath": {
      "en": [
        "2. Find the square root of the following\n(ii) ",
        {
          "latex": "9x^2-24xy+30xz-40yz+25z^2+16y^2",
          "fallback": "9x² − 24xy + 30xz − 40yz + 25z² + 16y²",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (ii) ",
        {
          "latex": "9x^2-24xy+30xz-40yz+25z^2+16y^2",
          "fallback": "9x² − 24xy + 30xz − 40yz + 25z² + 16y²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Group the three square terms together first: 9x² + 16y² + 25z² = (3x)² + (4y)² + (5z)². Look at the cross terms: −24xy and −40yz are both negative (both contain y), while +30xz is positive. This tells us the y-term carries a minus sign (−4y), while 3x and 5z are positive.",
        "eq": "9x² + 16y² + 25z² − 24xy − 40yz + 30xz = (3x)² + (−4y)² + (5z)² + 2(3x)(−4y) + 2(−4y)(5z) + 2(5z)(3x)",
        "math": {
          "latex": "\\begin{aligned}9x^2-24xy+30xz-40yz+25z^2+16y^2&=(3x)^2+(-4y)^2+(5z)^2\\\\&\\quad+2(3x)(-4y)+2(-4y)(5z)+2(5z)(3x)\\end{aligned}",
          "fallback": "9x² + 16y² + 25z² − 24xy − 40yz + 30xz = (3x)² + (−4y)² + (5z)² + 2(3x)(−4y) + 2(−4y)(5z) + 2(5z)(3x)",
          "display": true
        },
        "ta": "வர்க்க உறுப்புகள் (3x)², (4y)², (5z)². y இடம்பெறும் இரண்டு பெருக்கல் உறுப்புகளும் எதிர்க்குறியுடன் இருப்பதால் இடை உறுப்பை −4y என எடுக்க."
      },
      {
        "en": "Apply the identity a² + b² + c² + 2ab + 2bc + 2ca = (a + b + c)² with a = 3x, b = −4y, and c = 5z, then take the square root using modulus bars.",
        "eq": "√[(3x − 4y + 5z)²] = |3x − 4y + 5z|",
        "math": {
          "latex": "\\sqrt{(3x-4y+5z)^2}=|3x-4y+5z|",
          "fallback": "√[(3x − 4y + 5z)²] = |3x − 4y + 5z|",
          "display": true
        },
        "ta": "மூன்று உறுப்புகளின் கூட்டுத்தொகையின் வர்க்க முற்றொருமையை 3x, −4y, 5z க்குப் பயன்படுத்துக. வர்க்கமூலத்தை அவற்றின் கூட்டுத்தொகையின் தனிமதிப்பாக எழுதுக."
      }
    ],
    "answer": "|3x − 4y + 5z|",
    "answerMath": {
      "latex": "|3x-4y+5z|",
      "fallback": "|3x − 4y + 5z|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q2(ii); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q2(iii)",
      "ta": "பயிற்சி 3.7 · வினா 2(iii)"
    },
    "title": {
      "en": "Find the square root of (4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1)",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "2. Find the square root of the following\n(iii) (4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1)",
      "ta": "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (iii) (4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1)"
    },
    "questionMath": {
      "en": [
        "2. Find the square root of the following\n(iii) ",
        {
          "latex": "(4x^2-9x+2)(7x^2-13x-2)(28x^2-3x-1)",
          "fallback": "(4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (iii) ",
        {
          "latex": "(4x^2-9x+2)(7x^2-13x-2)(28x^2-3x-1)",
          "fallback": "(4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor each of the three quadratic polynomials by splitting the middle term. For 4x² − 9x + 2, product = 4 × 2 = 8 and sum = −9 (so −8 and −1). For 7x² − 13x − 2, product = −14 and sum = −13 (so −14 and +1). For 28x² − 3x − 1, product = −28 and sum = −3 (so −7 and +4).",
        "eq": "4x² − 9x + 2 = (4x − 1)(x − 2); 7x² − 13x − 2 = (7x + 1)(x − 2); 28x² − 3x − 1 = (4x − 1)(7x + 1)",
        "math": {
          "latex": "\\begin{aligned}4x^2-9x+2&=4x^2-8x-x+2=(4x-1)(x-2)\\\\7x^2-13x-2&=7x^2-14x+x-2=(7x+1)(x-2)\\\\28x^2-3x-1&=28x^2-7x+4x-1=(4x-1)(7x+1)\\end{aligned}",
          "fallback": "4x² − 9x + 2 = (4x − 1)(x − 2); 7x² − 13x − 2 = (7x + 1)(x − 2); 28x² − 3x − 1 = (4x − 1)(7x + 1)",
          "display": true
        },
        "ta": "நடு உறுப்பைப் பிரித்து மூன்று இருபடிக் கோவைகளையும் காரணிப்படுத்துக. இதற்கான எண் சோடிகள் முறையே −8 மற்றும் −1, −14 மற்றும் 1, −7 மற்றும் 4."
      },
      {
        "en": "Substitute the three factorizations back into the product and pair identical linear factors together.",
        "eq": "(4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1) = (x − 2)²(7x + 1)²(4x − 1)²",
        "math": {
          "latex": "\\begin{aligned}(4x^2-9x+2)(7x^2-13x-2)(28x^2-3x-1)&=(x-2)^2(7x+1)^2(4x-1)^2\\end{aligned}",
          "fallback": "(4x² − 9x + 2)(7x² − 13x − 2)(28x² − 3x − 1) = (x − 2)²(7x + 1)²(4x − 1)²",
          "display": true
        },
        "ta": "மூன்று காரணிப்படுத்தப்பட்ட கோவைகளையும் பெருக்கி ஒரே மாதிரியான நேரியல் காரணிகளைச் சோடிகளாக்குக."
      },
      {
        "en": "Take the square root by dropping each square exponent and enclosing the product in absolute value bars.",
        "eq": "√[(x − 2)²(7x + 1)²(4x − 1)²] = |(x − 2)(7x + 1)(4x − 1)|",
        "math": {
          "latex": "\\sqrt{(x-2)^2(7x+1)^2(4x-1)^2}=|(x-2)(7x+1)(4x-1)|",
          "fallback": "√[(x − 2)²(7x + 1)²(4x − 1)²] = |(x − 2)(7x + 1)(4x − 1)|",
          "display": true
        },
        "ta": "ஒவ்வொரு சோடியிலிருந்தும் ஒரு காரணியை எடுத்துப் பெருக்கி அதன் தனிமதிப்பை எழுதுக."
      }
    ],
    "answer": "|(x − 2)(7x + 1)(4x − 1)|",
    "answerMath": {
      "latex": "|(x-2)(7x+1)(4x-1)|",
      "fallback": "|(x − 2)(7x + 1)(4x − 1)|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q2(iii); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  },
  {
    "id": "c10-3-ex3-7-q2-iv",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.7",
    "topic": {
      "en": "Algebra — Square Root of Polynomials and Rational Expressions",
      "ta": "இயற்கணிதம்"
    },
    "label": {
      "en": "Exercise 3.7 · Q2(iv)",
      "ta": "பயிற்சி 3.7 · வினா 2(iv)"
    },
    "title": {
      "en": "Find the square root of (2x² + (17/6)x + 1)((3/2)x² + 4x + 2)((4/3)x² + (11/3)x + 2)",
      "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்"
    },
    "q": {
      "en": "2. Find the square root of the following\n(iv) (2x² + (17/6)x + 1)((3/2)x² + 4x + 2)((4/3)x² + (11/3)x + 2)",
      "ta": "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (iv) (2x² + (17/6)x + 1)((3/2)x² + 4x + 2)((4/3)x² + (11/3)x + 2)"
    },
    "questionMath": {
      "en": [
        "2. Find the square root of the following\n(iv) ",
        {
          "latex": "\\left(2x^2+\\dfrac{17}{6}x+1\\right)\\left(\\dfrac{3}{2}x^2+4x+2\\right)\\left(\\dfrac{4}{3}x^2+\\dfrac{11}{3}x+2\\right)",
          "fallback": "(2x² + (17/6)x + 1)((3/2)x² + 4x + 2)((4/3)x² + (11/3)x + 2)",
          "display": false
        }
      ],
      "ta": [
        "கீழ்க்காணும் கோவைகளின் வர்க்கமூலம் காண்க. (iv) ",
        {
          "latex": "\\left(2x^2+\\dfrac{17}{6}x+1\\right)\\left(\\dfrac{3}{2}x^2+4x+2\\right)\\left(\\dfrac{4}{3}x^2+\\dfrac{11}{3}x+2\\right)",
          "fallback": "(2x² + (17/6)x + 1)((3/2)x² + 4x + 2)((4/3)x² + (11/3)x + 2)",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Clear the fractions inside each bracket by factoring out 1/6, 1/2, and 1/3 respectively, then factor each resulting integer-coefficient quadratic by splitting the middle term.",
        "eq": "2x² + (17/6)x + 1 = (1/6)(4x + 3)(3x + 2); (3/2)x² + 4x + 2 = (1/2)(3x + 2)(x + 2); (4/3)x² + (11/3)x + 2 = (1/3)(4x + 3)(x + 2)",
        "math": {
          "latex": "\\begin{aligned}2x^2+\\dfrac{17}{6}x+1&=\\dfrac{1}{6}(12x^2+17x+6)=\\dfrac{1}{6}(4x+3)(3x+2)\\\\\\dfrac{3}{2}x^2+4x+2&=\\dfrac{1}{2}(3x^2+8x+4)=\\dfrac{1}{2}(3x+2)(x+2)\\\\\\dfrac{4}{3}x^2+\\dfrac{11}{3}x+2&=\\dfrac{1}{3}(4x^2+11x+6)=\\dfrac{1}{3}(4x+3)(x+2)\\end{aligned}",
          "fallback": "2x² + (17/6)x + 1 = (1/6)(4x + 3)(3x + 2); (3/2)x² + 4x + 2 = (1/2)(3x + 2)(x + 2); (4/3)x² + (11/3)x + 2 = (1/3)(4x + 3)(x + 2)",
          "display": true
        },
        "ta": "மூன்று அடைப்புக்குறிகளிலிருந்தும் முறையே 1/6, 1/2, 1/3 ஐ வெளியே எடுக்க. எஞ்சிய முழு எண் கெழுக்களுள்ள கோவைகளை நடு உறுப்பைப் பிரித்துக் காரணிப்படுத்துக."
      },
      {
        "en": "Multiply the three factored expressions together. Notice that (1/6) × (1/2) × (1/3) = 1/36 = (1/6)², and each linear factor appears twice.",
        "eq": "Product = (1/36)(4x + 3)²(3x + 2)²(x + 2)²",
        "math": {
          "latex": "\\text{Product}=\\dfrac{1}{36}(4x+3)^2(3x+2)^2(x+2)^2",
          "fallback": "Product = (1/36)(4x + 3)²(3x + 2)²(x + 2)²",
          "display": true
        },
        "ta": "எண் காரணிகளின் பெருக்கற்பலன் 1/36. ஒவ்வொரு நேரியல் காரணியும் இருமுறை வருவதால் அவற்றை வர்க்கங்களாக எழுதுக.",
        "mathTa": {
          "latex": "\\text{பெருக்கற்பலன்}=\\dfrac{1}{36}(4x+3)^2(3x+2)^2(x+2)^2",
          "fallback": "பெருக்கற்பலன் = (1/36)(4x + 3)²(3x + 2)²(x + 2)²",
          "display": true
        }
      },
      {
        "en": "Take the square root using √(1/36) = 1/6 and enclose the product of linear factors in absolute value bars.",
        "eq": "√[(1/36)(4x + 3)²(3x + 2)²(x + 2)²] = (1/6)|(4x + 3)(3x + 2)(x + 2)|",
        "math": {
          "latex": "\\sqrt{\\dfrac{1}{36}(4x+3)^2(3x+2)^2(x+2)^2}=\\dfrac{1}{6}|(4x+3)(3x+2)(x+2)|",
          "fallback": "√[(1/36)(4x + 3)²(3x + 2)²(x + 2)²] = (1/6)|(4x + 3)(3x + 2)(x + 2)|",
          "display": true
        },
        "ta": "1/36 இன் வர்க்கமூலம் 1/6. இதனுடன் நேரியல் காரணிகளின் பெருக்கற்பலனின் தனிமதிப்பைப் பெருக்குக."
      }
    ],
    "answer": "(1/6)|(4x + 3)(3x + 2)(x + 2)|",
    "answerMath": {
      "latex": "\\dfrac{1}{6}|(4x+3)(3x+2)(x+2)|",
      "fallback": "(1/6)|(4x + 3)(3x + 2)(x + 2)|",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.7 Q2(iv); printed p. 105, PDF p. 111; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "English and Tamil prompts checked against the 2025 exercise pages; numbered explanations reviewed"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.7 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
