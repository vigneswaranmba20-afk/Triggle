/* VER Triggle | Grade 10 Chapter 2 | textbook-order concept foundations.
 * Original learning explanations/checks; NOT recreated textbook worked examples.
 * Grounded in Tamil Nadu Standard Ten Mathematics 2025, chapter sections 2.2–2.11.
 * Tamil copy is an initial authored draft; independent Tamil editorial review pending.
 * No network, tracking, account, or external media. */
(()=>{'use strict';
window.TRIGGLE_G10_CH2_PATH={
  "chapterId": "g10-ch2",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 2 pp. 37–82",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch2-division",
      "practiceId": "c10-2-ex2-1-q1",
      "section": "2.2",
      "title": {
        "en": "Division means groups and leftovers",
        "ta": "வகுத்தல்: குழுக்களும் மீதியும்"
      },
      "idea": {
        "en": "Divide 34 objects into groups of 5. There are six complete groups and four left over. A remainder of 5 would make one more group.",
        "ta": "34 பொருள்களை 5 வீதம் பிரித்தால் 6 முழுக் குழுக்களும் 4 மீதியும் கிடைக்கும். மீதி 5 என்றால் இன்னொரு முழுக் குழுவை அமைக்கலாம்."
      },
      "example": {
        "en": "In the rule, a is the total (dividend), b is the size of each group (divisor), q is the number of complete groups (quotient) and r is the remainder.",
        "ta": "விதியில் a என்பது மொத்தம் (வகுபடும் எண்), b என்பது ஒரு குழுவின் அளவு (வகுக்கும் எண்), q என்பது முழுக் குழுக்களின் எண்ணிக்கை (ஈவு), r என்பது மீதி."
      },
      "rule": {
        "en": "a = bq + r, with b > 0 and 0 ≤ r < b",
        "ta": "a = bq + r; b > 0, 0 ≤ r < b"
      },
      "math": {
        "latex": "a=bq+r,\\quad b>0,\\quad 0\\le r<b",
        "fallback": "a = bq + r, b > 0, 0 ≤ r < b"
      },
      "question": {
        "en": "What is the remainder when 42 is divided by 5?",
        "ta": "42-ஐ 5-ஆல் வகுத்தால் மீதி எவ்வளவு?"
      },
      "choices": [
        {
          "en": "8",
          "ta": "8"
        },
        {
          "en": "5",
          "ta": "5"
        },
        {
          "en": "2",
          "ta": "2"
        }
      ],
      "correct": 2,
      "hint": {
        "en": "Find the largest multiple of five that fits inside 42. How many are left?",
        "ta": "42-ஐ விடாத மிகப் பெரிய 5-இன் மடங்கைக் காணுங்கள். எத்தனை மீதம்?"
      },
      "why": {
        "en": "Eight full groups use 40 objects. The remainder is 2.",
        "ta": "எட்டு முழுக் குழுக்களுக்கு 40 பொருள்கள் தேவை. மீதி 2."
      },
      "visual": {
        "kind": "groups",
        "total": 34,
        "size": 5
      },
      "incorrectFeedback": [
        {
          "en": "Eight counts the full groups. How many objects remain after making them?",
          "ta": "8 என்பது முழுக் குழுக்களின் எண்ணிக்கை. அவற்றை அமைத்த பின் எத்தனை பொருள்கள் மீதம்?"
        },
        {
          "en": "Five more objects would make another full group. The remainder must be smaller than five.",
          "ta": "5 பொருள்கள் மீதமிருந்தால் இன்னொரு முழுக் குழு அமையும். மீதி 5-ஐ விடச் சிறியதாக இருக்க வேண்டும்."
        }
      ],
      "whyMath": {
        "latex": "42=5\\times8+2",
        "fallback": "42 = 5 × 8 + 2"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-gcd",
      "practiceId": "c10-2-ex2-1-q6",
      "section": "2.3",
      "title": {
        "en": "Find the HCF without guessing",
        "ta": "ஊகிக்காமல் மீ.பொ.வ காண்போம்"
      },
      "idea": {
        "en": "Each common factor of the dividend and divisor also divides the remainder. Conversely, each common factor of the divisor and remainder divides the dividend. That is why replacing the pair leaves the HCF unchanged.",
        "ta": "வகுபடும் எண்ணையும் வகுக்கும் எண்ணையும் வகுக்கும் பொதுக் காரணி மீதியையும் வகுக்கும். அதேபோல் வகுக்கும் எண்ணையும் மீதியையும் வகுக்கும் பொதுக் காரணி வகுபடும் எண்ணையும் வகுக்கும். எனவே ஒவ்வொரு படியிலும் மீ.பொ.வ மாறாது."
      },
      "example": {
        "en": "When the remainder is zero, the divisor in that division is the HCF. This also works when the first division is exact.",
        "ta": "மீதி பூச்சியமாகும்போது, அந்தப் படியில் வகுக்கும் எண் தான் மீ.பொ.வ. முதல் வகுத்தலிலேயே மீதி பூச்சியம் வந்தாலும் இது பொருந்தும்."
      },
      "rule": {
        "en": "HCF(60,32) = HCF(32,28) = HCF(28,4) = 4",
        "ta": "HCF(60,32) = HCF(32,28) = HCF(28,4) = 4"
      },
      "math": {
        "latex": "\\gcd(60,32)=\\gcd(32,28)=\\gcd(28,4)=4",
        "fallback": "HCF(60,32) = HCF(32,28) = HCF(28,4) = 4"
      },
      "question": {
        "en": "What is the HCF of 18 and 12?",
        "ta": "18 மற்றும் 12-இன் மீ.பொ.வ என்ன?"
      },
      "choices": [
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "3",
          "ta": "3"
        },
        {
          "en": "12",
          "ta": "12"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "Divide the larger number by the smaller one. Use the remainder as the next divisor.",
        "ta": "பெரிய எண்ணைச் சிறிய எண்ணால் வகுக்கவும். கிடைக்கும் மீதியை அடுத்த வகுக்கும் எண்ணாகப் பயன்படுத்தவும்."
      },
      "why": {
        "en": "The second division leaves zero. Its divisor, 6, is the HCF.",
        "ta": "இரண்டாவது வகுத்தலில் மீதி பூச்சியம். அந்தப் படியில் வகுக்கும் எண் 6 தான் மீ.பொ.வ."
      },
      "visual": {
        "kind": "remainders",
        "values": [
          60,
          32,
          28,
          4
        ]
      },
      "whyMath": {
        "latex": "\\begin{aligned}18&=12\\times1+6\\\\12&=6\\times2+0\\end{aligned}",
        "fallback": "18 = 12 × 1 + 6. 12 = 6 × 2 + 0."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Three divides both numbers. Continue the divisions to find the highest common factor.",
          "ta": "3 இரு எண்களையும் வகுக்கும். மிகப் பெரிய பொதுக் காரணியைக் காண வகுத்தலைத் தொடருங்கள்."
        },
        {
          "en": "Twelve must divide both numbers to be a common factor. What remainder does it leave when dividing 18?",
          "ta": "12 பொதுக் காரணியாக இருக்க இரு எண்களையும் வகுக்க வேண்டும். 18-ஐ 12-ஆல் வகுத்தால் என்ன மீதி?"
        }
      ],
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-bezout",
      "practiceId": "c10-2-ex2-1-q8",
      "section": "2.3",
      "title": {
        "en": "Why we work backwards",
        "ta": "ஏன் பின்னோக்கிக் கணக்கிடுகிறோம்?"
      },
      "idea": {
        "en": "The goal is to build the HCF using just the two original numbers. For small numbers, spot an easy subtraction first. For harder ones, work backwards through the divisions.",
        "ta": "இரண்டு தொடக்க எண்களை மட்டும் பயன்படுத்தி மீ.பொ.வ-ஐ எழுதுவதே நோக்கம். சிறிய எண்களில் கழித்தலைக் கவனியுங்கள்; பெரிய எண்களில் வகுத்தலிலிருந்து பின்னோக்கிச் செல்லுங்கள்."
      },
      "example": {
        "en": "Notice 64 − 60 = 4 and 64 = 2 × 32. Thus 4 = 32 × 2 + 60 × (−1). This directly answers Exercise 2.1, Question 8.",
        "ta": "64 − 60 = 4; மேலும் 64 = 2 × 32. எனவே 4 = 32 × 2 + 60 × (−1). இது பயிற்சி 2.1 வினா 8-க்கான எளிய வழி."
      },
      "rule": {
        "en": "4 = 32(2) + 60(−1); x = 2, y = −1",
        "ta": "4 = 32(2) + 60(−1); x = 2, y = −1"
      },
      "math": {
        "latex": "4=32(2)+60(-1),\\quad x=2,\\ y=-1",
        "fallback": "4 = 32(2) + 60(−1); x = 2, y = −1"
      },
      "question": {
        "en": "Express 3 as 21x + 15y using integers. Which pair works?",
        "ta": "3 = 21x + 15y ஆக அமைய எந்த முழு எண் ஜோடி பொருந்தும்?"
      },
      "choices": [
        {
          "en": "x = −2, y = 3",
          "ta": "x = −2, y = 3"
        },
        {
          "en": "x = 1, y = −1",
          "ta": "x = 1, y = −1"
        },
        {
          "en": "x = 2, y = −3",
          "ta": "x = 2, y = −3"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "The first division leaves 6 and the second leaves 3. Write 3 using 15 and 6, then replace 6 using the first division.",
        "ta": "முதல் வகுத்தலில் 6, இரண்டாவது வகுத்தலில் 3 மீதியாகக் கிடைக்கும். 3-ஐ 15 மற்றும் 6 கொண்டு எழுதுங்கள். பிறகு முதல் வகுத்தலைப் பயன்படுத்தி 6-ஐப் பதிலிடுங்கள்."
      },
      "why": {
        "en": "The divisions are written first. Then substitute for 6 and collect the original numbers. The multiplier of 21 is −2 and the multiplier of 15 is 3. Other integer pairs can also work.",
        "ta": "முதலில் வகுத்தல்களை எழுதுவோம். பிறகு 6-க்குப் பதிலிட்டு தொடக்க எண்களைத் தொகுப்போம். 21-இன் பெருக்கி −2, 15-இன் பெருக்கி 3. வேறு முழு எண் சோடிகளும் பொருந்தலாம்."
      },
      "visual": {
        "kind": "bars",
        "values": [
          32,
          32,
          -60
        ]
      },
      "whyMath": {
        "latex": "\\begin{aligned}21&=15\\times1+6\\\\15&=6\\times2+3\\\\3&=15-2\\times6\\\\&=15-2(21-15)\\\\&=15-2(21)+2(15)\\\\&=21(-2)+15(3)\\end{aligned}",
        "fallback": "21 = 15 × 1 + 6. 15 = 6 × 2 + 3. 3 = 15 − 2 × 6 = 15 − 2(21 − 15) = 15 − 2(21) + 2(15) = 21(−2) + 15(3)."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "This gives 6, the first remainder. Continue to the second nonzero remainder, 3.",
          "ta": "இது முதல் மீதி 6-ஐத் தருகிறது. அடுத்த பூச்சியமல்லாத மீதி 3 வரை தொடருங்கள்."
        },
        {
          "en": "This gives negative 3. Check the signs of both multipliers.",
          "ta": "இது எதிர்மறை 3-ஐத் தருகிறது. இரண்டு பெருக்கிகளின் குறிகளையும் சரிபாருங்கள்."
        }
      ],
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-primes",
      "practiceId": "c10-2-ex2-2-q6",
      "section": "2.4",
      "title": {
        "en": "Prime factors are number fingerprints",
        "ta": "பகா காரணிகள் ஒரு எண்ணின் தனித்த அடையாளம்"
      },
      "idea": {
        "en": "A prime has exactly two positive divisors, 1 and itself. Every whole number greater than 1 has the same prime factors, including repeats, however you break it up. In 2² the small 2 counts two factors of 2.",
        "ta": "பகா எண்ணுக்கு 1 மற்றும் அந்த எண் ஆகிய இரண்டு நேர்ம வகுத்திகள் மட்டுமே உண்டு. 1-ஐ விடப் பெரிய முழு எண்ணை எவ்வாறு பிரித்தாலும், மீண்டும் வரும் காரணிகள் உட்பட ஒரே பகா காரணிகள் கிடைக்கும். 2² என்பது 2 என்ற காரணி இருமுறை வருவதைக் குறிக்கும்."
      },
      "example": {
        "en": "For each prime, use the smaller exponent for the highest common factor (HCF) and the larger for the least common multiple (LCM). If a prime is absent from one number, its exponent for that number is zero.",
        "ta": "ஒவ்வொரு பகா எண்ணுக்கும் சிறிய அடுக்கை மீப்பெரு பொது வகுத்திக்கும் (மீ.பொ.வ), பெரிய அடுக்கை மீச்சிறு பொது மடங்கிற்கும் (மீ.பொ.ம) எடுக்கவும். ஓர் எண்ணின் காரணிகளில் ஒரு பகா எண் இல்லையெனில், அதற்கான அடுக்கு பூச்சியம்."
      },
      "rule": {
        "en": "HCF(12,18) = 6 ; LCM(12,18) = 36",
        "ta": "HCF(12,18) = 6 ; LCM(12,18) = 36"
      },
      "math": {
        "latex": "\\begin{aligned}\\gcd(12,18)&=6\\\\\\operatorname{lcm}(12,18)&=36\\end{aligned}",
        "fallback": "HCF(12,18) = 6 ; LCM(12,18) = 36"
      },
      "question": {
        "en": "Which number is the LCM of 8 and 12?",
        "ta": "8 மற்றும் 12-இன் மீ.பொ.ம எது?"
      },
      "choices": [
        {
          "en": "4",
          "ta": "4"
        },
        {
          "en": "24",
          "ta": "24"
        },
        {
          "en": "96",
          "ta": "96"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Use enough of each prime factor to make both numbers. Where is the factor 3 needed?",
        "ta": "இரு எண்களையும் உருவாக்கத் தேவையான அளவு பகா காரணிகளை எடுங்கள். காரணி 3 எந்த எண்ணுக்குத் தேவை?"
      },
      "why": {
        "en": "Use three factors of 2 and one factor of 3. This makes 24, the smallest number divisible by both 8 and 12.",
        "ta": "2 என்ற காரணியை மூன்று முறையும் 3 என்ற காரணியை ஒரு முறையும் எடுக்கவும். 8 மற்றும் 12 இரண்டாலும் வகுபடும் மிகச் சிறிய எண் 24."
      },
      "visual": {
        "kind": "factors",
        "values": [
          8,
          18
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Four is a common factor. The LCM must be divisible by both 8 and 12.",
          "ta": "4 ஒரு பொதுக் காரணி. மீ.பொ.ம என்பது 8 மற்றும் 12 ஆகிய இரண்டாலும் வகுபட வேண்டும்."
        },
        null,
        {
          "en": "The product is a common multiple. The two numbers share factors of 2, so a smaller common multiple is possible.",
          "ta": "இரு எண்களின் பெருக்கற்பலன் ஒரு பொது மடங்கு. இரண்டிலும் 2 பொதுக் காரணியாக இருப்பதால் சிறிய பொது மடங்கு கிடைக்கும்."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}8&=2^3\\\\12&=2^2\\times3\\\\\\operatorname{lcm}(8,12)&=2^3\\times3=24\\end{aligned}",
        "fallback": "8 = 2³. 12 = 2² × 3. LCM(8, 12) = 2³ × 3 = 24."
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-modulo",
      "section": "2.5",
      "title": {
        "en": "A clock is a number loop",
        "ta": "கடிகாரம் ஒரு எண் சுழற்சி"
      },
      "idea": {
        "en": "Modulo gives the remainder after division. A week repeats every seven days. Start on Tuesday at day zero, skip whole weeks and move forward by the leftover days.",
        "ta": "மட்டு கணக்கில் வகுத்தலின் மீதியைக் காண்கிறோம். ஏழு நாட்களுக்கு ஒரு முறை வாரம் திரும்புகிறது. செவ்வாயை நாள் பூச்சியமாகக் கொண்டு முழு வாரங்களைத் தவிர்த்து மீதமுள்ள நாட்கள் முன்னேறுங்கள்."
      },
      "example": {
        "en": "Today is Tuesday. After 45 days, 45 = 7 × 6 + 3, so move three days: Friday.",
        "ta": "இன்று செவ்வாய் எனில், 45 = 7 × 6 + 3. மூன்று நாட்கள் முன்னேறினால் வெள்ளி."
      },
      "rule": {
        "en": "45 mod 7 = 3",
        "ta": "45 mod 7 = 3"
      },
      "math": {
        "latex": "45\\bmod 7=3",
        "fallback": "45 mod 7 = 3"
      },
      "question": {
        "en": "100 hours after 7 a.m. is what time?",
        "ta": "காலை 7 மணிக்குப் பின் 100 மணி நேரம் என்றால் எத்தனை மணி?"
      },
      "choices": [
        {
          "en": "7 a.m.",
          "ta": "காலை 7 மணி"
        },
        {
          "en": "11 p.m.",
          "ta": "இரவு 11 மணி"
        },
        {
          "en": "11 a.m.",
          "ta": "காலை 11 மணி"
        }
      ],
      "correct": 2,
      "hint": {
        "en": "100 hours is 4 full days and 4 more hours.",
        "ta": "100 மணி = 4 முழு நாட்கள் + 4 மணிநேரம்."
      },
      "why": {
        "en": "100 mod 24 = 4. Four hours after 7 a.m. is 11 a.m.",
        "ta": "100 mod 24 = 4. காலை 7 மணிக்குப் பின் 4 மணி = காலை 11 மணி."
      },
      "visual": {
        "kind": "cycle",
        "size": 7,
        "values": {
          "en": [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Monday"
          ],
          "ta": [
            "செவ்வாய்",
            "புதன்",
            "வியாழன்",
            "வெள்ளி",
            "சனி",
            "ஞாயிறு",
            "திங்கள்"
          ]
        }
      },
      "incorrectFeedback": [
        {
          "en": "After four full days it is 7 a.m. Count the leftover hours too.",
          "ta": "நான்கு முழு நாட்களுக்குப் பின் காலை 7 மணி. மீதமுள்ள மணிநேரங்களையும் எண்ணுங்கள்."
        },
        {
          "en": "Four hours after 7 a.m. is still before noon.",
          "ta": "காலை 7 மணிக்குப் பின் 4 மணி நேரம் சென்றாலும் நண்பகல் ஆகவில்லை."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}100&=24(4)+4\\\\7+4&=11\\text{ a.m.}\\end{aligned}",
        "fallback": "100 = 24 × 4 + 4; four hours after 7 a.m. is 11 a.m."
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-congruence",
      "section": "2.5",
      "title": {
        "en": "Same remainder means congruent",
        "ta": "ஒரே மீதி என்றால் ஒருங்கிசைவு"
      },
      "idea": {
        "en": "The modulus m is a positive whole number. Two integers are congruent modulo m if they leave the same remainder on division by m. The symbol ≡ marks this relationship. Their difference is a multiple of m.",
        "ta": "மட்டு m என்பது ஒரு நேர்ம முழு எண். இரு முழு எண்களை m-ஆல் வகுக்கும்போது ஒரே மீதி கிடைத்தால், அவை மட்டு m-இல் ஒருங்கிசைவானவை. ≡ என்பது இதன் குறி. அவற்றின் வித்தியாசம் m-இன் மடங்கு."
      },
      "example": {
        "en": "17 and 5 both leave remainder 2 on division by 3. Their difference is 12, divisible by 3.",
        "ta": "17, 5 இரண்டையும் 3-ஆல் வகுத்தால் மீதி 2; வித்தியாசம் 12 என்பது 3-இன் மடங்கு."
      },
      "rule": {
        "en": "17 ≡ 5 (mod 3)",
        "ta": "17 ≡ 5 (mod 3)"
      },
      "math": {
        "latex": "17\\equiv5\\pmod3",
        "fallback": "17 ≡ 5 (mod 3)"
      },
      "question": {
        "en": "Which number is congruent to 37 modulo 6?",
        "ta": "37-க்கு மட்டு 6-இல் ஒருங்கிசைவான எண் எது?"
      },
      "choices": [
        {
          "en": "13",
          "ta": "13"
        },
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "2",
          "ta": "2"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "Compare the remainders on division by 6, or check which difference is a multiple of 6.",
        "ta": "6-ஆல் வகுத்துக் கிடைக்கும் மீதிகளை ஒப்பிடுங்கள். அல்லது எந்த வித்தியாசம் 6-இன் மடங்கு எனப் பாருங்கள்."
      },
      "why": {
        "en": "Both 37 and 13 leave remainder 1. Their difference, 24, is four times 6.",
        "ta": "37 மற்றும் 13 இரண்டையும் 6-ஆல் வகுத்தால் மீதி 1. அவற்றின் வித்தியாசம் 24 என்பது 6-இன் நான்கு மடங்கு."
      },
      "visual": {
        "kind": "cycle",
        "size": 3,
        "values": [
          "0",
          "1",
          "2"
        ]
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Six is the modulus. It leaves zero as its own remainder. Compare that with the remainder for 37.",
          "ta": "6 என்பது மட்டு. 6-ஐ 6-ஆல் வகுத்தால் மீதி பூச்சியம். அதை 37-இன் மீதியுடன் ஒப்பிடுங்கள்."
        },
        {
          "en": "Two leaves remainder 2. Check the remainder when 37 is divided by 6.",
          "ta": "2-ஐ 6-ஆல் வகுத்தால் மீதி 2. 37-ஐ 6-ஆல் வகுத்தால் வரும் மீதியைச் சரிபாருங்கள்."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}37-13&=24=6\\times4\\\\37&\\equiv13\\pmod6\\end{aligned}",
        "fallback": "37 − 13 = 24 = 6 × 4. 37 is congruent to 13 modulo 6."
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-sequence",
      "section": "2.6",
      "title": {
        "en": "A sequence is an ordered pattern",
        "ta": "தொடர்வரிசை என்பது வரிசைப்படுத்தப்பட்ட அமைப்பு"
      },
      "idea": {
        "en": "A sequence lists numbers in order. Each number is a term; n counts its position starting at 1. A formula finds a term without listing every earlier term.",
        "ta": "வரிசை என்பது ஒழுங்காக அமைந்த எண்களின் பட்டியல். ஒவ்வொரு எண்ணும் ஓர் உறுப்பு. n என்பது 1-இல் தொடங்கும் இட எண். ஒரு சூத்திரம் முந்தைய எல்லா உறுப்புகளையும் எழுதாமல் தேவையான உறுப்பைக் காண உதவும்."
      },
      "example": {
        "en": "2, 5, 8, 11, ... follows aₙ = 3n − 1. Put n = 4 to find 11.",
        "ta": "2, 5, 8, 11, ... என்பதற்கு aₙ = 3n − 1. n = 4 எனில் 11 கிடைக்கும்."
      },
      "rule": {
        "en": "aₙ = 3n − 1",
        "ta": "aₙ = 3n − 1"
      },
      "math": {
        "latex": "a_n=3n-1",
        "fallback": "aₙ = 3n − 1"
      },
      "question": {
        "en": "A different sequence follows this rule. What is its sixth term?",
        "ta": "வேறொரு தொடர்வரிசையின் விதி கீழே உள்ளது. அதன் ஆறாவது உறுப்பு எது?"
      },
      "choices": [
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "11",
          "ta": "11"
        },
        {
          "en": "13",
          "ta": "13"
        }
      ],
      "correct": 2,
      "hint": {
        "en": "Use six as the position in the new rule.",
        "ta": "புதிய விதியில் இடத்திற்குப் பதிலாக 6-ஐப் பயன்படுத்துங்கள்."
      },
      "why": {
        "en": "Six is the position. Substituting it in the rule gives the term at that position, 13.",
        "ta": "6 என்பது இடம். அதை விதியில் பதிலிட்டால் அந்த இடத்திலுள்ள உறுப்பு 13 கிடைக்கும்."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          2,
          5,
          8,
          11,
          14
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Six is the position. Use the rule to determine the value at that position.",
          "ta": "6 என்பது இடம். அந்த இடத்தின் மதிப்பை விதியைப் பயன்படுத்திக் காணுங்கள்."
        },
        {
          "en": "Eleven is the fifth term. Positions begin at one, so use six for the sixth term.",
          "ta": "11 ஐந்தாவது உறுப்பு. இடங்கள் 1-இல் தொடங்குவதால், ஆறாவது உறுப்புக்கு 6-ஐப் பயன்படுத்துங்கள்."
        }
      ],
      "questionMath": {
        "latex": "a_n=2n+1",
        "fallback": "aₙ = 2n + 1"
      },
      "whyMath": {
        "latex": "a_6=2\\times6+1=13",
        "fallback": "a₆ = 2 × 6 + 1 = 13"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-recursive",
      "section": "2.6",
      "title": {
        "en": "A rule can refer to earlier terms",
        "ta": "முந்தைய உறுப்புகளைப் பயன்படுத்தும் விதி"
      },
      "idea": {
        "en": "Recursive means 'use earlier terms'. First state a₁ = 1 and a₂ = 1. From the third term on, add the previous two. Without the starting terms, the rule alone cannot determine the sequence.",
        "ta": "மீள்வரையறை விதி என்பது முந்தைய உறுப்புகளைப் பயன்படுத்துவது. முதலில் a₁ = 1, a₂ = 1 என்று தர வேண்டும். மூன்றாவது உறுப்பிலிருந்து முந்தைய இரண்டு உறுப்புகளைக் கூட்டவும். தொடக்க உறுப்புகள் இல்லாமல் வரிசையைத் தீர்மானிக்க முடியாது."
      },
      "example": {
        "en": "Start with 1, 1. Each next term is the sum of the previous two: 1, 1, 2, 3, 5, 8.",
        "ta": "1, 1-இல் தொடங்குங்கள். அடுத்த உறுப்பு முந்தைய இரண்டின் கூட்டுத்தொகை: 1, 1, 2, 3, 5, 8."
      },
      "rule": {
        "en": "a₁ = 1, a₂ = 1; aₙ = aₙ₋₁ + aₙ₋₂ for n ≥ 3",
        "ta": "a₁ = 1, a₂ = 1; n ≥ 3 எனில் aₙ = aₙ₋₁ + aₙ₋₂"
      },
      "math": {
        "latex": "\\begin{aligned}a_1&=1,\\quad a_2=1\\\\a_n&=a_{n-1}+a_{n-2},\\quad n\\ge 3\\end{aligned}",
        "fallback": "a₁ = 1, a₂ = 1; aₙ = aₙ₋₁ + aₙ₋₂ for n ≥ 3"
      },
      "question": {
        "en": "Start with 2, 3 and add the previous two terms each time. What is the fifth term?",
        "ta": "2, 3 எனத் தொடங்கி ஒவ்வொரு முறையும் முந்தைய இரு உறுப்புகளைக் கூட்டுங்கள். ஐந்தாவது உறுப்பு எது?"
      },
      "choices": [
        {
          "en": "8",
          "ta": "8"
        },
        {
          "en": "13",
          "ta": "13"
        },
        {
          "en": "16",
          "ta": "16"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Build the third and fourth terms first. Then add those two results.",
        "ta": "முதலில் மூன்றாவது, நான்காவது உறுப்புகளைக் காணுங்கள். பிறகு அவற்றைக் கூட்டுங்கள்."
      },
      "why": {
        "en": "The third and fourth terms are 5 and 8. Adding them gives the fifth term, 13.",
        "ta": "மூன்றாவது, நான்காவது உறுப்புகள் 5 மற்றும் 8. அவற்றைக் கூட்டினால் ஐந்தாவது உறுப்பு 13 கிடைக்கும்."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          1,
          1,
          2,
          3,
          5,
          8
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Eight is the fourth term. Add the third and fourth terms for the next one.",
          "ta": "8 நான்காவது உறுப்பு. அடுத்த உறுப்புக்கு மூன்றாவது, நான்காவது உறுப்புகளைக் கூட்டுங்கள்."
        },
        null,
        {
          "en": "Doubling 8 would count the fourth term twice. Use the third and fourth terms.",
          "ta": "8-ஐ இருமடங்காக்கினால் நான்காவது உறுப்பையே இருமுறை கூட்டுகிறோம். மூன்றாவது, நான்காவது உறுப்புகளைப் பயன்படுத்துங்கள்."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}a_3&=2+3=5\\\\a_4&=3+5=8\\\\a_5&=5+8=13\\end{aligned}",
        "fallback": "a₃ = 2 + 3 = 5. a₄ = 3 + 5 = 8. a₅ = 5 + 8 = 13."
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-ap",
      "section": "2.7",
      "title": {
        "en": "Arithmetic progression: add the same difference",
        "ta": "கூட்டுத்தொடர்: ஒரே வேறுபாட்டைக் கூட்டுதல்"
      },
      "idea": {
        "en": "In an arithmetic progression (A.P.), subtract the previous term from the next term. The result is always the same common difference d, which can be positive, zero or negative. In the formula, a is the first term.",
        "ta": "கூட்டுத்தொடர் வரிசையில் (A.P.) அடுத்த உறுப்பிலிருந்து முந்தைய உறுப்பைக் கழியுங்கள். கிடைக்கும் பொது வித்தியாசம் d எப்போதும் ஒன்றே. அது நேர்மமாகவோ, பூச்சியமாகவோ, எதிர்மமாகவோ இருக்கலாம். விதியில் a என்பது முதல் உறுப்பு."
      },
      "example": {
        "en": "9, 13, 17, 21 has a common difference of 4. The differences 4, 4, 4 confirm it.",
        "ta": "9, 13, 17, 21-இல் பொதுவேறுபாடு 4. வேறுபாடுகள் 4, 4, 4 என்பதால் இது கூட்டுத்தொடர்."
      },
      "rule": {
        "en": "a, a+d, a+2d, a+3d",
        "ta": "a, a+d, a+2d, a+3d"
      },
      "math": {
        "latex": "a,\\ a+d,\\ a+2d,\\ a+3d",
        "fallback": "a, a+d, a+2d, a+3d"
      },
      "question": {
        "en": "Is 11, 8, 5, 2 an A.P.?",
        "ta": "11, 8, 5, 2 ஒரு கூட்டுத்தொடர் வரிசையா?"
      },
      "choices": [
        {
          "en": "Yes, d = −3",
          "ta": "ஆம், d = −3"
        },
        {
          "en": "No, the terms decrease",
          "ta": "இல்லை, உறுப்புகள் குறைகின்றன"
        },
        {
          "en": "Yes, d = 3",
          "ta": "ஆம், d = 3"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "Subtract the previous term from each next term, in that order.",
        "ta": "ஒவ்வொரு அடுத்த உறுப்பிலிருந்தும் அதன் முந்தைய உறுப்பைக் கழியுங்கள்."
      },
      "why": {
        "en": "Each difference is negative three. A constant negative difference still makes an A.P.",
        "ta": "ஒவ்வொரு வித்தியாசமும் எதிர்மறை 3. மாறாத எதிர்ம வித்தியாசமும் கூட்டுத்தொடர் வரிசையை அமைக்கும்."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          9,
          13,
          17,
          21
        ]
      },
      "incorrectFeedback": [
        null,
        {
          "en": "A decreasing sequence can be an A.P. Check whether it decreases by the same amount each time.",
          "ta": "குறையும் தொடர்வரிசையும் கூட்டுத்தொடர் வரிசையாக இருக்கலாம். ஒவ்வொரு முறையும் ஒரே அளவு குறைகிறதா பாருங்கள்."
        },
        {
          "en": "The size of the change is three. Its sign comes from subtracting the earlier term from the later one.",
          "ta": "மாற்றத்தின் அளவு 3. பிந்தைய உறுப்பிலிருந்து முந்தைய உறுப்பைக் கழிக்கும்போது அதன் குறி கிடைக்கும்."
        }
      ],
      "whyMath": {
        "latex": "8-11=5-8=2-5=-3",
        "fallback": "8 − 11 = 5 − 8 = 2 − 5 = −3"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-ap-nth",
      "section": "2.7",
      "title": {
        "en": "Find any A.P. term without writing every term",
        "ta": "எழுதாமலே n-ஆவது கூட்டுத்தொடர் உறுப்பைக் காண்க"
      },
      "idea": {
        "en": "The first term is a, d is the common difference and n is the position. Count from the first term: reaching position n takes one fewer jump than its position number.",
        "ta": "முதல் உறுப்பு a, பொது வித்தியாசம் d, இடம் n. முதல் உறுப்பிலிருந்து எண்ணும்போது n-ஆவது இடத்தை அடைய அதன் இட எண்ணை விட ஒரு படி குறைவாகத் தேவை."
      },
      "example": {
        "en": "For 5, 9, 13, ... the 10th term is 5 + (10−1) × 4 = 41.",
        "ta": "5, 9, 13, ... தொடரின் 10-ஆம் உறுப்பு = 5 + (10−1) × 4 = 41."
      },
      "rule": {
        "en": "aₙ = a + (n−1)d",
        "ta": "aₙ = a + (n−1)d"
      },
      "math": {
        "latex": "a_n=a+(n-1)d",
        "fallback": "aₙ = a + (n−1)d"
      },
      "question": {
        "en": "10th term of 3, 7, 11, ...?",
        "ta": "3, 7, 11, ... தொடரின் 10-ஆம் உறுப்பு?"
      },
      "choices": [
        {
          "en": "39",
          "ta": "39"
        },
        {
          "en": "43",
          "ta": "43"
        },
        {
          "en": "40",
          "ta": "40"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "There are nine jumps from position 1 to 10.",
        "ta": "முதல் இடத்திலிருந்து பத்தாவது இடம் வரை ஒன்பது படிகள்."
      },
      "why": {
        "en": "3 + 9 × 4 = 39.",
        "ta": "3 + 9 × 4 = 39."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          5,
          9,
          13,
          17,
          21
        ]
      },
      "incorrectFeedback": [
        null,
        {
          "en": "This counts ten jumps. Position one is where you start, so count the jumps between positions one and ten.",
          "ta": "இது பத்துப் படிகளைக் கணக்கிடுகிறது. முதல் இடத்திலிருந்து தொடங்குகிறோம். முதல் இடத்துக்கும் பத்தாம் இடத்துக்கும் இடையிலான படிகளை எண்ணுங்கள்."
        },
        {
          "en": "Forty uses ten copies of the difference. Begin with the first term, then add only the jumps needed.",
          "ta": "40 என்பது பொது வித்தியாசத்தின் பத்து மடங்கு. முதல் உறுப்பிலிருந்து தொடங்கித் தேவையான படிகளை மட்டும் கூட்டுங்கள்."
        }
      ],
      "whyMath": {
        "latex": "a_{10}=3+(10-1)\\times4=3+9\\times4=39",
        "fallback": "a₁₀ = 3 + (10 − 1) × 4 = 3 + 9 × 4 = 39"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-ap-sum",
      "video": {
        "src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch2-ap-sum/c3d7df0a9e29b4bb59932525bb4b25be0e84f3c00651ef7dc10feb8042ce4188.mp4",
        "language": "en",
        "durationSeconds": 106.69
      },
      "section": "2.8",
      "title": {
        "en": "An A.P. sum pairs the first and last terms",
        "ta": "கூட்டுத்தொடர் தொகை: முதல், கடைசி உறுப்புகளை இணைத்தல்"
      },
      "idea": {
        "en": "Pair terms from opposite ends: each pair has the same sum. This is why the formula uses n divided by 2.",
        "ta": "முதல், கடைசி உறுப்புகளை இணைத்தால் ஒவ்வொரு ஜோடியின் கூட்டுத்தொகையும் ஒன்றே. அதனால் சூத்திரத்தில் n/2 வருகிறது."
      },
      "example": {
        "en": "For 2 + 4 + 6 + 8 + 10: (2+10) and (4+8) each make 12, with middle 6. Total = 30.",
        "ta": "2 + 4 + 6 + 8 + 10-இல் (2+10), (4+8) ஒவ்வொன்றும் 12; நடுவில் 6. மொத்தம் 30."
      },
      "rule": {
        "en": "Sₙ = n(a + l)/2",
        "ta": "Sₙ = n(a + l)/2"
      },
      "math": {
        "latex": "S_n=\\frac n2(a+l)",
        "fallback": "Sₙ = n(a + l)/2"
      },
      "question": {
        "en": "Find the sum of 4 + 7 + 10 + 13 + 16 + 19 without adding every term one by one.",
        "ta": "ஒவ்வொரு உறுப்பாகக் கூட்டாமல், 4 + 7 + 10 + 13 + 16 + 19 என்ற தொடரின் கூட்டுத்தொகையைக் காண்க."
      },
      "choices": [
        {
          "en": "66",
          "ta": "66"
        },
        {
          "en": "69",
          "ta": "69"
        },
        {
          "en": "72",
          "ta": "72"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Pair the first and last terms: 4 + 19. Work inward to find three equal pairs.",
        "ta": "முதல் உறுப்பையும் கடைசி உறுப்பையும் இணைக்கவும்: 4 + 19. உள்ளே சென்று சமமான மூன்று ஜோடிகளைக் காண்க."
      },
      "why": {
        "en": "4 + 19 = 23, 7 + 16 = 23, and 10 + 13 = 23. There are three pairs, so the sum is 3 × 23 = 69.",
        "ta": "4 + 19 = 23, 7 + 16 = 23, 10 + 13 = 23. மூன்று ஜோடிகள் உள்ளன. எனவே கூட்டுத்தொகை 3 × 23 = 69."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Each end pair should give the same sum. Recheck the first and last terms before multiplying by the number of pairs.",
          "ta": "ஒவ்வொரு முனைச் சோடியும் ஒரே கூடுதலைத் தர வேண்டும். சோடிகளின் எண்ணிக்கையால் பெருக்கும் முன் முதல், கடைசி உறுப்புகளைச் சரிபாருங்கள்."
        },
        null,
        {
          "en": "The final term is 19. Check the sum of the end pair before using it for all three pairs.",
          "ta": "கடைசி உறுப்பு 19. மூன்று சோடிகளுக்கும் பயன்படுத்துவதற்கு முன் முனைச் சோடியின் கூடுதலைச் சரிபாருங்கள்."
        }
      ],
      "whyMath": {
        "latex": "S_6=\\frac62(4+19)=3\\times23=69",
        "fallback": "S₆ = (6 ÷ 2)(4 + 19) = 3 × 23 = 69"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-gp",
      "section": "2.9",
      "title": {
        "en": "Geometric progression: multiply by the same ratio",
        "ta": "பெருக்குத்தொடர்: ஒரே விகிதத்தால் பெருக்குதல்"
      },
      "idea": {
        "en": "A G.P. multiplies each term by the same nonzero common ratio r to reach the next. An A.P. adds the same difference. In the formula, a is the first term, n is the position, and the exponent counts the multiplications from the first term.",
        "ta": "பெருக்குத்தொடர் வரிசையில் (G.P.) அடுத்த உறுப்பைப் பெற அதே பூச்சியமல்லாத பொது விகிதம் r-ஆல் பெருக்குகிறோம். கூட்டுத்தொடர் வரிசையில் ஒரே வித்தியாசத்தைக் கூட்டுகிறோம். விதியில் a முதல் உறுப்பு, n இடம். முதல் உறுப்பிலிருந்து எத்தனை முறை பெருக்குகிறோம் என்பதை அடுக்கு குறிக்கிறது."
      },
      "example": {
        "en": "3, 6, 12, 24 has common ratio 2, because each term is double the previous term.",
        "ta": "3, 6, 12, 24-இன் பொதுவிகிதம் 2. ஒவ்வொரு உறுப்பும் முன் உறுப்பின் இருமடங்கு."
      },
      "rule": {
        "en": "aₙ = ar⁽ⁿ⁻¹⁾",
        "ta": "aₙ = ar⁽ⁿ⁻¹⁾"
      },
      "math": {
        "latex": "a_n=ar^{n-1}",
        "fallback": "aₙ = ar⁽ⁿ⁻¹⁾"
      },
      "question": {
        "en": "The numbers 81, 27, 9, … form a G.P. What is the next term?",
        "ta": "81, 27, 9, … ஒரு பெருக்குத்தொடர் வரிசை. அடுத்த உறுப்பு எது?"
      },
      "choices": [
        {
          "en": "−9",
          "ta": "−9"
        },
        {
          "en": "3",
          "ta": "3"
        },
        {
          "en": "27",
          "ta": "27"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Divide the second term by the first to find the factor that takes you forward.",
        "ta": "முன்னோக்கிச் செல்லும் பெருக்கியைக் காண, இரண்டாம் உறுப்பை முதல் உறுப்பால் வகுக்கவும்."
      },
      "why": {
        "en": "Each term is one third of the previous term. The next term is 3.",
        "ta": "ஒவ்வோர் உறுப்பும் முந்தைய உறுப்பின் மூன்றில் ஒரு பங்கு. அடுத்த உறுப்பு 3."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          5,
          15,
          45,
          135
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Negative nine repeats the last difference of negative eighteen. A G.P. repeats the multiplier.",
          "ta": "கடைசி வித்தியாசமான −18-ஐ மீண்டும் பயன்படுத்தினால் −9 கிடைக்கும். பெருக்குத்தொடர் வரிசையில் பெருக்கி மாறாது."
        },
        null,
        {
          "en": "Multiplying by three goes backwards in this sequence. Find the ratio by dividing a later term by its previous term.",
          "ta": "3-ஆல் பெருக்கினால் இந்தத் தொடர்வரிசையில் பின்னோக்கிச் செல்கிறோம். பிந்தைய உறுப்பை அதன் முந்தைய உறுப்பால் வகுத்து விகிதத்தைக் காணுங்கள்."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}r&=\\frac{27}{81}=\\frac13\\\\a_4&=9\\times\\frac13=3\\end{aligned}",
        "fallback": "r = 27/81 = 1/3. a₄ = 9 × 1/3 = 3."
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-gp-sum",
      "video": {
        "src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch2-gp-sum/fa50e19cc4795e55839fedd37a9cb49bff499bbf05ad7ffc6d2772ef9f981977.mp4",
        "language": "en",
        "durationSeconds": 108.62
      },
      "section": "2.10",
      "title": {
        "en": "Geometric series: a shortcut for repeated growth",
        "ta": "பெருக்குத்தொடர் தொகைக்கான சுருக்குவழி"
      },
      "idea": {
        "en": "Call the geometric sum S, multiply it by the common ratio r, then subtract. The middle terms cancel; the visual shows why using 1 + 2 + 4 + 8.",
        "ta": "பெருக்குத் தொடரின் கூட்டுத்தொகையை S என எழுதி, பொது விகிதம் r-ஆல் பெருக்கி, பிறகு கழித்தால் நடுவிலுள்ள உறுப்புகள் நீங்கும். 1 + 2 + 4 + 8 மூலம் இதைக் காணலாம்."
      },
      "example": {
        "en": "S = 1 + 2 + 4 + 8; 2S = 2 + 4 + 8 + 16. Subtract: 2S − S = 16 − 1 = 15, so S = 15. When r = 1 use Sₙ = na instead.",
        "ta": "S = 1 + 2 + 4 + 8; 2S = 2 + 4 + 8 + 16. கழித்தால் 2S − S = 16 − 1 = 15; எனவே S = 15. r = 1 எனில் Sₙ = na பயன்படுத்தவும்."
      },
      "rule": {
        "en": "Sₙ = a(rⁿ−1)/(r−1), r ≠ 1",
        "ta": "Sₙ = a(rⁿ−1)/(r−1), r ≠ 1"
      },
      "math": {
        "latex": "S_n=a\\frac{r^n-1}{r-1},\\quad r\\ne1",
        "fallback": "Sₙ = a(rⁿ−1)/(r−1), r ≠ 1"
      },
      "question": {
        "en": "If S = 1 + 3 + 9 + 27, what remains after 3S − S?",
        "ta": "S = 1 + 3 + 9 + 27 எனில், 3S − S-இல் எது மீதமிருக்கும்?"
      },
      "choices": [
        {
          "en": "27 − 1",
          "ta": "27 − 1"
        },
        {
          "en": "81 − 1",
          "ta": "81 − 1"
        },
        {
          "en": "81 + 1",
          "ta": "81 + 1"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Write 3S = 3 + 9 + 27 + 81 above S. Which terms occur in both?",
        "ta": "3S = 3 + 9 + 27 + 81 என எழுதுங்கள். இரு வரிகளிலும் உள்ள உறுப்புகளைக் கவனியுங்கள்."
      },
      "why": {
        "en": "3S = 3 + 9 + 27 + 81; subtract S = 1 + 3 + 9 + 27. The middle terms cancel: 3S − S = 81 − 1 = 80, hence 2S = 80 and S = 40.",
        "ta": "3S = 3 + 9 + 27 + 81; S = 1 + 3 + 9 + 27. கழித்தால் நடுவிலுள்ள உறுப்புகள் நீங்கும்: 3S − S = 81 − 1 = 80. எனவே 2S = 80; S = 40."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          1,
          2,
          4,
          8
        ]
      },
      "incorrectFeedback": [
        {
          "en": "Multiplying the original sum by 3 creates a new last term. Recheck the product of 27 and 3.",
          "ta": "மூலக் கூடுதலை 3-ஆல் பெருக்கும்போது புதிய கடைசி உறுப்பு கிடைக்கும். 27-ஐ 3-ஆல் பெருக்கிப் பாருங்கள்."
        },
        null,
        {
          "en": "The first term 1 is in the original sum being subtracted. Keep its minus sign.",
          "ta": "கழிக்கப்படும் மூலக் கூடுதலில் முதல் உறுப்பு 1 உள்ளது. அதன் கழித்தல் குறியைக் கவனியுங்கள்."
        }
      ],
      "whyMath": {
        "latex": "\\begin{aligned}3S-S&=81-1=80\\\\2S&=80\\\\S&=40\\end{aligned}",
        "fallback": "3S − S = 81 − 1 = 80; 2S = 80; S = 40"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-gp-infinite",
      "section": "2.10",
      "title": {
        "en": "When an infinite sum can be finite",
        "ta": "முடிவில்லாத தொகையும் முடிவுள்ள மதிப்பும்"
      },
      "idea": {
        "en": "The infinite G.P. has a finite sum only when |r| < 1, meaning −1 < r < 1. A negative ratio makes signs alternate while the term sizes shrink. If |r| ≥ 1, the infinite-sum shortcut is invalid.",
        "ta": "முடிவிலி பெருக்குத் தொடருக்கு |r| < 1 (அதாவது −1 < r < 1) எனில் மட்டுமே முடிவுள்ள கூட்டுத்தொகை உண்டு. எதிர்மறை விகிதத்தில் உறுப்புகளின் குறியீடு மாறி, அளவில் குறையும். |r| ≥ 1 எனில் இந்தச் சூத்திரம் பொருந்தாது."
      },
      "example": {
        "en": "1 + 1/2 + 1/4 + ... approaches 2. With r = −1/2, the sum 1 − 1/2 + 1/4 − ... approaches 2/3 instead. Compare both ratios in the visual.",
        "ta": "1 + 1/2 + 1/4 + ... என்பது 2-ஐ நெருங்கும். r = −1/2 எனில் 1 − 1/2 + 1/4 − ... என்பது 2/3-ஐ நெருங்கும். இரண்டையும் காட்சியில் ஒப்பிடவும்."
      },
      "rule": {
        "en": "S∞ = a/(1−r), |r| < 1",
        "ta": "S∞ = a/(1−r), |r| < 1"
      },
      "math": {
        "latex": "S_{\\infty}=\\frac a{1-r},\\quad |r|<1",
        "fallback": "S∞ = a/(1−r), |r| < 1"
      },
      "question": {
        "en": "What value does this infinite sum approach?",
        "ta": "இந்த முடிவுறாத் தொடரின் கூடுதல் எந்த மதிப்பை நெருங்குகிறது?"
      },
      "choices": [
        {
          "en": "3",
          "ta": "3"
        },
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "It has no finite limit",
          "ta": "முடிவுள்ள எல்லை மதிப்பு இல்லை"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "The first term is 3 and each later term is half the previous one. Use those values in the infinite sum rule.",
        "ta": "முதல் உறுப்பு 3. அடுத்த ஒவ்வோர் உறுப்பும் முந்தைய உறுப்பின் பாதி. இந்த மதிப்புகளை முடிவுறாத் தொடரின் கூடுதல் விதியில் பயன்படுத்துங்கள்."
      },
      "why": {
        "en": "The ratio is one half. As n grows, rⁿ approaches 0, so Sₙ = a(1 − rⁿ)/(1 − r) approaches a/(1 − r) = 6. This works only when |r| < 1; outside that range partial sums may grow or oscillate without converging.",
        "ta": "பொது விகிதம் அரை. எனவே கூடுதல் 6-ஐ நெருங்குகிறது. இந்த விதியைப் பயன்படுத்த விகிதம் எதிர்மறை ஒன்றுக்கும் ஒன்றுக்கும் இடையில் இருக்க வேண்டும்."
      },
      "visual": {
        "kind": "fractions",
        "values": [
          1,
          0.5,
          0.25,
          0.125
        ]
      },
      "questionMath": {
        "latex": "3+\\frac32+\\frac34+\\cdots",
        "fallback": "3 + 3/2 + 3/4 + …"
      },
      "whyMath": {
        "latex": "S_{\\infty}=\\frac{3}{1-\\frac12}=6",
        "fallback": "S∞ = 3/(1 − 1/2) = 6"
      },
      "incorrectFeedback": [
        {
          "en": "Three is the first term. Include the positive terms that follow it.",
          "ta": "3 முதல் உறுப்பு. அதற்குப் பின் வரும் நேர்ம உறுப்புகளையும் சேர்க்க வேண்டும்."
        },
        null,
        {
          "en": "Infinitely many terms can have a finite sum. Here the common ratio has magnitude less than one.",
          "ta": "முடிவுறா எண்ணிக்கையிலான உறுப்புகளின் கூடுதல் முடிவுள்ள மதிப்பைக் கொண்டிருக்கலாம். இங்கு பொது விகிதத்தின் தனி மதிப்பு ஒன்றை விடக் குறைவு."
        }
      ],
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch2-special",
      "practiceId": "c10-2-ex2-9-q1-v",
      "section": "2.11",
      "title": {
        "en": "Special series: numbers, squares or cubes?",
        "ta": "சிறப்புத் தொடர்கள்: எண்கள், வர்க்கங்கள், கனங்கள்"
      },
      "idea": {
        "en": "The first n natural numbers form an A.P. Their sum, Tₙ, is n times the average of the first and last terms, 1 and n.",
        "ta": "முதல் n இயல் எண்கள் ஒரு கூட்டுத்தொடர் வரிசை. முதல் உறுப்பு 1, கடைசி உறுப்பு n. அவற்றின் சராசரியை n-ஆல் பெருக்கினால் கூடுதல் Tₙ கிடைக்கும்."
      },
      "example": {
        "en": "An exponent tells you how many copies of a number to multiply. For squares, use two copies of each number. For cubes, use three. Then add the results.",
        "ta": "ஓர் எண்ணை எத்தனை முறை காரணியாகப் பயன்படுத்த வேண்டும் என்பதை அடுக்கு காட்டுகிறது. வர்க்கம் காண ஒரே எண்ணை இரண்டு காரணிகளாகவும், கனம் காண மூன்று காரணிகளாகவும் பெருக்கவும். பிறகு கிடைத்த மதிப்புகளைக் கூட்டவும்."
      },
      "rule": {
        "en": "Tₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2",
        "ta": "Tₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2"
      },
      "math": {
        "latex": "\\begin{aligned}T_n&=1+2+\\cdots+n\\\\&=\\frac{n(n+1)}{2}\\end{aligned}",
        "fallback": "Tₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2"
      },
      "lesson": {
        "bridgeTitle": {
          "en": "Start with the A.P. sum",
          "ta": "கூட்டுத் தொடர்வரிசையின் கூடுதலிலிருந்து தொடங்குவோம்"
        },
        "bridgeLink": {
          "en": "Review how an A.P. sum pairs its terms",
          "ta": "கூட்டுத்தொடர் கூடுதல் முறையை மீள்பார்க்கவும்"
        },
        "notationTitle": {
          "en": "Read the symbols",
          "ta": "குறியீடுகளின் பொருள்"
        },
        "notation": {
          "en": "The term count n is a positive whole number. Sₙ means the sum of the first n terms, and Tₙ is specifically the sum of the natural numbers from 1 to n. The symbol ∑ means “add” as k runs through the positions from 1 to n.",
          "ta": "உறுப்புகளின் எண்ணிக்கை n ஒரு நேர்ம முழு எண். Sₙ என்பது முதல் n உறுப்புகளின் கூடுதல். Tₙ என்பது குறிப்பாக 1 முதல் n வரையிலான இயல் எண்களின் கூடுதல். k என்பது 1 முதல் n வரையிலான இடங்களைக் குறிக்கும். ∑ என்பது அந்த உறுப்புகளையெல்லாம் கூட்ட வேண்டும் என்பதைக் குறிக்கும்."
        },
        "sigmaMath": {
          "latex": "\\sum_{k=1}^{n}k=1+2+\\cdots+n=T_n",
          "fallback": "The sum of k from 1 through n is 1 + 2 + ⋯ + n, or Tₙ."
        },
        "powersMath": {
          "latex": "2^2=2\\times2,\\quad 2^3=2\\times2\\times2",
          "fallback": "2² = 2 × 2, 2³ = 2 × 2 × 2"
        },
        "odd": {
          "title": {
            "en": "Why the first odd numbers add to a square",
            "ta": "முதல் ஒற்றை எண்களின் கூடுதல் ஏன் ஒரு வர்க்கம்?"
          },
          "idea": {
            "en": "The odd numbers form an A.P. with common difference 2. The first term is 1 and the nth is 2n − 1. Their average is n, so n terms add to n squared.",
            "ta": "ஒற்றை எண்கள் பொது வித்தியாசம் 2 கொண்ட கூட்டுத்தொடர் வரிசை. முதல் உறுப்பு 1, n-ஆவது உறுப்பு 2n − 1. இவற்றின் சராசரி n. எனவே n உறுப்புகளின் கூடுதல் n-இன் வர்க்கம்."
          },
          "math": {
            "latex": "\\begin{aligned}S_n&=1+3+\\cdots+(2n-1)\\\\&=\\frac n2[1+(2n-1)]=n^2\\\\S_4&=1+3+5+7=16\\end{aligned}",
            "fallback": "Sₙ = 1 + 3 + ⋯ + (2n − 1) = (n ÷ 2)[1 + (2n − 1)] = n². S₄ = 1 + 3 + 5 + 7 = 16."
          }
        },
        "squares": {
          "title": {
            "en": "Why the squares rule works",
            "ta": "வர்க்கங்களின் கூடுதலுக்கான சூத்திரம் எப்படி கிடைக்கிறது?"
          },
          "intro": {
            "en": "In the first triangle, the first row has one 1, the second has two 2s, and the third has three 3s. Each row adds up to its row number squared.",
            "ta": "முதல் முக்கோணத்தில் முதல் வரிசையில் ஒரு 1, இரண்டாம் வரிசையில் இரண்டு 2-கள், மூன்றாம் வரிசையில் மூன்று 3-கள் உள்ளன. ஒவ்வொரு வரிசையின் கூடுதலும் அதன் வரிசை எண்ணின் வர்க்கம்."
          },
          "diagramLabel": {
            "en": "Three rotations of a triangle, added cell by cell",
            "ta": "முக்கோணத்தின் மூன்று சுழற்றிய வடிவங்களிலுள்ள எண்களை இடவாரியாகக் கூட்டுதல்"
          },
          "diagramRows": {
            "en": "Rows from top to bottom.",
            "ta": "மேலிருந்து கீழாக வரிசைகள்."
          },
          "diagramGroups": {
            "en": [
              "First triangle",
              "Second triangle",
              "Third triangle",
              "Cell totals"
            ],
            "ta": [
              "முதல் முக்கோணம்",
              "இரண்டாம் முக்கோணம்",
              "மூன்றாம் முக்கோணம்",
              "கட்டங்களில் கிடைத்த கூடுதல்கள்"
            ]
          },
          "caption": {
            "en": "Rotate two copies of the first triangle and add the three values at each position. The result has six cells, each with value 7.",
            "ta": "முதல் முக்கோணத்தின் இரு நகல்களைச் சுழற்றி, ஒவ்வோர் இடத்திலும் உள்ள மூன்று எண்களைக் கூட்டுங்கள். கிடைக்கும் ஆறு கட்டங்களிலும் மதிப்பு 7."
          },
          "exampleMath": {
            "latex": "\\begin{aligned}3(1^2+2^2+3^2)&=6\\times7\\\\1^2+2^2+3^2&=\\frac{42}{3}=14\\end{aligned}",
            "fallback": "3 × (1² + 2² + 3²) = 6 × 7. So 1² + 2² + 3² = 42 ÷ 3 = 14."
          },
          "general": {
            "en": "With n rows, the top values are 1, n and n. Move to either cell just below and one value gains 1 while another loses 1. So every position adds to 2n + 1. Count the cells with the A.P. sum, multiply by the value per cell, then divide by 3 to get the sum for one triangle.",
            "ta": "n வரிசைகள் இருந்தால், உச்சியில் உள்ள மதிப்புகள் 1, n, n. அடுத்த வரிசையில் நேரடியாகக் கீழுள்ள இரு கட்டங்களில் எதற்குச் சென்றாலும், ஒரு மதிப்பு 1 அதிகரிக்கிறது, மற்றொன்று 1 குறைகிறது. எனவே ஒவ்வோர் இடத்திலும் கூடுதல் 2n + 1. கூட்டுத் தொடர்வரிசைச் சூத்திரத்தால் கட்டங்களின் எண்ணிக்கையைக் காணுங்கள். அதைக் கட்டத்தின் மதிப்பால் பெருக்கி, 3-ஆல் வகுத்தால் ஒரு முக்கோணத்தின் கூடுதல் கிடைக்கும்."
          },
          "math": {
            "latex": "\\begin{aligned}S_n&=1^2+2^2+\\cdots+n^2\\\\&=\\frac{n(n+1)}{2}\\times(2n+1)\\div3\\\\&=\\frac{n(n+1)(2n+1)}{6}\\end{aligned}",
            "fallback": "Sₙ = 1² + 2² + ⋯ + n² = [n × (n + 1) ÷ 2] × (2n + 1) ÷ 3 = [n × (n + 1) × (2n + 1)] ÷ 6"
          }
        },
        "cubes": {
          "title": {
            "en": "Sum of cubes",
            "ta": "கனங்களின் கூடுதல்"
          },
          "intro": {
            "en": "First add the natural numbers from 1 to n using the A.P. rule. Then square that entire sum to get the sum of their cubes.",
            "ta": "முதலில் கூட்டுத் தொடர்வரிசைச் சூத்திரத்தைப் பயன்படுத்தி 1 முதல் n வரையிலான இயல் எண்களின் கூடுதலைக் காணுங்கள். அந்தக் கூடுதலை வர்க்கப்படுத்தினால் அவற்றின் கனங்களின் கூடுதல் கிடைக்கும்."
          },
          "math": {
            "latex": "\\begin{aligned}&1^3+2^3+\\cdots+n^3\\\\&\\quad=(1+2+\\cdots+n)^2\\\\&\\quad=\\left(\\frac{n(n+1)}{2}\\right)^2\\end{aligned}",
            "fallback": "1³ + 2³ + ⋯ + n³ = (1 + 2 + ⋯ + n)² = {[n × (n + 1)] ÷ 2}²"
          },
          "contrast": {
            "en": "For the first three numbers, squaring before adding gives 14. Adding before squaring gives 36, the sum of the cubes.",
            "ta": "முதல் மூன்று எண்களை வர்க்கப்படுத்திப் பிறகு கூட்டினால் 14 கிடைக்கும். முதலில் கூட்டிப் பிறகு வர்க்கப்படுத்தினால் கனங்களின் கூடுதலான 36 கிடைக்கும்."
          },
          "proofTitle": {
            "en": "Why does the cubes rule work?",
            "ta": "கனங்களின் கூடுதலுக்கான சூத்திரம் எப்படி கிடைக்கிறது?"
          },
          "proofStart": {
            "en": "Tₖ is the kth triangular number, the sum from 1 to k. T₀ is zero because there are no terms to add.",
            "ta": "Tₖ என்பது k-ஆவது முக்கோண எண். இது 1 முதல் k வரையிலான எண்களின் கூடுதல். கூட்ட உறுப்புகள் எதுவும் இல்லாததால் T₀-இன் மதிப்பு 0."
          },
          "triangularMath": {
            "latex": "T_k=\\frac{k(k+1)}{2},\\quad T_0=0",
            "fallback": "Tₖ = [k × (k + 1)] ÷ 2, T₀ = 0"
          },
          "proofFactors": {
            "en": "To get the kth triangle from the previous one, add a row of k cells. The two triangular numbers differ by k. Add the formulas at k and k − 1 to find their sum.",
            "ta": "முந்தைய முக்கோணத்துடன் k கட்டங்கள் கொண்ட ஒரு வரிசையைச் சேர்த்தால் k-ஆவது முக்கோணம் கிடைக்கும். இந்த இரு முக்கோண எண்களின் வேறுபாடு k. அவற்றின் கூடுதலைக் காண, சூத்திரத்தில் k மற்றும் k − 1 ஆகியவற்றைப் பதிலிட்டுக் கூட்டுங்கள்."
          },
          "factorsMath": {
            "latex": "\\begin{aligned}T_k-T_{k-1}&=k\\\\T_k+T_{k-1}&=\\frac{k(k+1)+(k-1)k}{2}\\\\&=\\frac{k\\times2k}{2}=k^2\\end{aligned}",
            "fallback": "Tₖ − Tₖ₋₁ = k. Tₖ + Tₖ₋₁ = [k × (k + 1) + (k − 1) × k] ÷ 2 = (k × 2k) ÷ 2 = k²."
          },
          "proofIdentity": {
            "en": "A difference of squares is the difference times the sum. Here the two factors are k and k².",
            "ta": "இரு வர்க்கங்களின் வேறுபாடு என்பது அந்த எண்களின் வேறுபாட்டையும் கூடுதலையும் பெருக்குவதால் கிடைப்பது. இங்கு அந்த இரு காரணிகள் k மற்றும் k²."
          },
          "identityMath": {
            "latex": "\\begin{aligned}&T_k^2-T_{k-1}^2\\\\&=(T_k-T_{k-1})(T_k+T_{k-1})\\\\&=k\\times k^2=k^3\\end{aligned}",
            "fallback": "Tₖ² − Tₖ₋₁² = (Tₖ − Tₖ₋₁) × (Tₖ + Tₖ₋₁) = k × k² = k³"
          },
          "proofCancel": {
            "en": "Add these differences from k = 1 to n. Each middle square is added once and subtracted once, so it cancels. This is what happens for the first three cubes.",
            "ta": "k = 1 முதல் n வரை இந்த வேறுபாடுகளைக் கூட்டுங்கள். இடையிலுள்ள ஒவ்வொரு வர்க்கமும் ஒருமுறை கூட்டப்பட்டு ஒருமுறை கழிக்கப்படுவதால் நீங்கிவிடுகிறது. முதல் மூன்று கனங்களைக் கூட்டும்போது இது எப்படி நடக்கிறது எனப் பாருங்கள்."
          },
          "cancelMath": {
            "latex": "\\begin{aligned}&(T_1^2-T_0^2)+(T_2^2-T_1^2)\\\\&\\qquad+(T_3^2-T_2^2)=T_3^2-T_0^2\\end{aligned}",
            "fallback": "(T₁² − T₀²) + (T₂² − T₁²) + (T₃² − T₂²) = T₃² − T₀²"
          },
          "proofEnd": {
            "en": "For n cubes, only Tₙ² − T₀² is left. Since T₀ = 0, the sum is Tₙ².",
            "ta": "n கனங்களைக் கூட்டும்போது Tₙ² − T₀² மட்டும் மிஞ்சும். T₀ = 0 என்பதால் கூடுதல் Tₙ²."
          }
        },
        "range": {
          "title": {
            "en": "When a sum starts after 1",
            "ta": "தொடர் 1-க்குப் பிறகு தொடங்கும்போது"
          },
          "intro": {
            "en": "For squares from m to n, subtract the squares before m from the sum through n. When m is 1, there are no earlier squares to subtract. From 5 to 10, subtract the sum through 4 from the sum through 10.",
            "ta": "m முதல் n வரையிலான வர்க்கங்களின் கூடுதலைக் காண, n வரையிலான வர்க்கங்களின் கூடுதலிலிருந்து m-க்கு முந்தைய வர்க்கங்களின் கூடுதலைக் கழியுங்கள். m என்பது 1 எனில் கழிக்க முந்தைய வர்க்கங்கள் இல்லை. 5 முதல் 10 வரை காண, 10 வரையிலான கூடுதலிலிருந்து 4 வரையிலான கூடுதலைக் கழியுங்கள்."
          },
          "generalMath": {
            "latex": "\\begin{aligned}m^2+\\cdots+n^2&=S_n-S_{m-1}\\\\1&\\le m\\le n\\\\S_0&=0\\end{aligned}",
            "fallback": "m² + ⋯ + n² = Sₙ − Sₘ₋₁, with 1 ≤ m ≤ n and S₀ = 0."
          },
          "math": {
            "latex": "\\begin{aligned}&5^2+6^2+\\cdots+10^2=S_{10}-S_4\\\\&=\\frac{10\\times11\\times21}{6}-\\frac{4\\times5\\times9}{6}\\\\&=385-30=355\\end{aligned}",
            "fallback": "5² + 6² + ⋯ + 10² = S₁₀ − S₄ = (10 × 11 × 21) ÷ 6 − (4 × 5 × 9) ÷ 6 = 385 − 30 = 355"
          }
        }
      },
      "question": {
        "en": "Find the sum of the first nine squares.",
        "ta": "முதல் ஒன்பது இயல் எண்களின் வர்க்கங்களின் கூடுதலைக் காண்க."
      },
      "questionMath": {
        "latex": "1^2+2^2+\\cdots+9^2=?",
        "fallback": "1² + 2² + ⋯ + 9² = ?"
      },
      "choices": [
        {
          "en": "45",
          "ta": "45"
        },
        {
          "en": "2025",
          "ta": "2025"
        },
        {
          "en": "285",
          "ta": "285"
        }
      ],
      "correct": 2,
      "explainAfterAttempt": true,
      "incorrectFeedback": [
        {
          "en": "That adds the natural numbers. Square each number first, then add.",
          "ta": "அது இயல் எண்களின் கூடுதல். முதலில் ஒவ்வோர் எண்ணையும் வர்க்கப்படுத்திப் பிறகு கூட்டுங்கள்."
        },
        {
          "en": "Squaring the natural-number sum gives the sum of cubes. Use the squares rule here.",
          "ta": "இயல் எண்களின் கூடுதலை வர்க்கப்படுத்தினால் கனங்களின் கூடுதல் கிடைக்கும். இங்கு வர்க்கங்களுக்கான சூத்திரத்தைப் பயன்படுத்துங்கள்."
        }
      ],
      "hint": {
        "en": "Use the squares rule with nine terms. Find the values in the two brackets before multiplying.",
        "ta": "ஒன்பது உறுப்புகளுக்கு வர்க்கச் சூத்திரத்தைப் பயன்படுத்துங்கள். பெருக்குவதற்கு முன் இரு அடைப்புக்குறிகளுக்குள் உள்ள மதிப்புகளைக் காணுங்கள்."
      },
      "why": {
        "en": "There are nine terms, so use 9 for n. The bracketed factors become 10 and 19.",
        "ta": "ஒன்பது உறுப்புகள் உள்ளதால் n-க்குப் பதிலாக 9-ஐ இடுங்கள். அடைப்புக்குறிகளுக்குள் உள்ள காரணிகளின் மதிப்புகள் 10 மற்றும் 19."
      },
      "whyMath": {
        "latex": "\\begin{aligned}S_9&=\\frac{9(9+1)(2\\times9+1)}{6}\\\\&=\\frac{9\\times10\\times19}{6}=285\\end{aligned}",
        "fallback": "S₉ = [9 × (9 + 1) × (2 × 9 + 1)] ÷ 6 = (9 × 10 × 19) ÷ 6 = 285"
      },
      "visual": {
        "kind": "sequence",
        "values": [
          1,
          4,
          9,
          16
        ]
      }
    }
  ]
};
})();
