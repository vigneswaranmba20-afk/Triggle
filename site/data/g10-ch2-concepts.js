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
        "en": "Divide 34 objects into positive-size groups of 5: six complete groups and four left over. The remainder is smaller than the group size; it cannot be 5.",
        "ta": "34 பொருள்களை 5 வீதம் குழுக்களாகப் பிரித்தால் 6 முழுக் குழுக்களும் 4 மீதியும் கிடைக்கும். மீதி குழுவின் அளவை விடச் சிறியதாக இருக்கும்; 5 ஆகாது."
      },
      "example": {
        "en": "34 = (5 × 6) + 4. The numbers mean: total = group size × number of groups + leftover.",
        "ta": "34 = (5 × 6) + 4. அதாவது: மொத்தம் = குழுவின் அளவு × குழுக்களின் எண்ணிக்கை + மீதி."
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
        "en": "17 ÷ 5: what is the remainder?",
        "ta": "17-ஐ 5-ஆல் வகுத்தால் மீதி எவ்வளவு?"
      },
      "choices": [
        {
          "en": "3",
          "ta": "3"
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
        "en": "Make groups of five first.",
        "ta": "முதலில் ஐந்து கொண்ட குழுக்களை உருவாக்குங்கள்."
      },
      "why": {
        "en": "17 = 5 × 3 + 2, so the leftover is 2.",
        "ta": "17 = 5 × 3 + 2. ஆகவே மீதி 2."
      },
      "visual": {
        "kind": "groups",
        "total": 17,
        "size": 5
      }
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
        "en": "If two numbers have a common divisor, it also divides their difference. Repeated division keeps the HCF unchanged.",
        "ta": "இரண்டு எண்களை ஒரு எண் வகுத்தால், அவற்றின் வித்தியாசத்தையும் அது வகுக்கும். அடுத்தடுத்த வகுத்தல்களில் மீ.பொ.வ மாறாது."
      },
      "example": {
        "en": "60 = 32 × 1 + 28, then 32 = 28 × 1 + 4, and 28 = 4 × 7. The last nonzero remainder is 4.",
        "ta": "60 = 32 × 1 + 28, அடுத்து 32 = 28 × 1 + 4; 28 = 4 × 7. பூச்சியமல்லாத கடைசி மீதி 4."
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
        "en": "18 = 12 + 6; 12 = 6 × 2.",
        "ta": "18 = 12 + 6; 12 = 6 × 2."
      },
      "why": {
        "en": "The last nonzero remainder is 6.",
        "ta": "பூச்சியமல்லாத கடைசி மீதி 6."
      },
      "visual": {
        "kind": "remainders",
        "values": [
          60,
          32,
          28,
          4
        ]
      }
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
        "en": "Try each pair in 21x + 15y. The result must be 3.",
        "ta": "ஒவ்வொரு ஜோடியையும் 21x + 15y-இல் பதிலிட்டு 3 வருகிறதா பாருங்கள்."
      },
      "why": {
        "en": "21(−2) + 15(3) = −42 + 45 = 3. Other integer pairs may also work; this is one valid pair.",
        "ta": "21(−2) + 15(3) = −42 + 45 = 3. இதுபோன்ற வேறு முழு எண் ஜோடிகளும் இருக்கலாம்."
      },
      "visual": {
        "kind": "bars",
        "values": [
          32,
          32,
          -60
        ]
      }
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
        "en": "A prime number has exactly two positive divisors: 1 and itself. Break each number into prime factors. In 2², the small 2 means two factors of 2. Use the smaller powers for the HCF and the larger powers for the LCM.",
        "ta": "ஒரு பகா எண்ணுக்கு 1 மற்றும் அதே எண் ஆகிய இரண்டு நேர்மறை வகுத்திகள் மட்டுமே உண்டு. ஒவ்வொரு எண்ணையும் பகா காரணிகளாகப் பிரிக்கவும். 2² என்பது 2 × 2. மீ.பொ.வ-க்கு சிறிய அடுக்குகளையும் மீ.சி.ம-க்கு பெரிய அடுக்குகளையும் எடுக்கவும்."
      },
      "example": {
        "en": "12 = 2² × 3 and 18 = 2 × 3². HCF = 2 × 3 = 6 (smaller powers). LCM = 2² × 3² = 36 (larger powers). Check: 36 ÷ 12 = 3 and 36 ÷ 18 = 2.",
        "ta": "12 = 2² × 3; 18 = 2 × 3². மீ.பொ.வ = 2 × 3 = 6 (சிறிய அடுக்குகள்). மீ.சி.ம = 2² × 3² = 36 (பெரிய அடுக்குகள்). 36-ஐ 12 மற்றும் 18 ஆகிய இரண்டும் மீதியின்றி வகுக்கும்."
      },
      "rule": {
        "en": "HCF(12,18) = 6 ; LCM(12,18) = 36",
        "ta": "HCF(12,18) = 6 ; LCM(12,18) = 36"
      },
      "math": {
        "latex": "\\gcd(12,18)=6,\\quad \\operatorname{lcm}(12,18)=36",
        "fallback": "HCF(12,18) = 6 ; LCM(12,18) = 36"
      },
      "question": {
        "en": "Which number is the LCM of 12 and 18?",
        "ta": "12, 18-இன் மீ.சி.ம எது?"
      },
      "choices": [
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "36",
          "ta": "36"
        },
        {
          "en": "24",
          "ta": "24"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Take enough 2s and 3s to contain both factorisations.",
        "ta": "இரண்டு காரணிப் பிரிப்புகளுக்கும் போதுமான 2, 3 காரணிகளை எடுத்துக்கொள்ளுங்கள்."
      },
      "why": {
        "en": "12 = 2² × 3 and 18 = 2 × 3². The larger powers give 2² × 3² = 36. Both 12 and 18 divide 36 exactly.",
        "ta": "12 = 2² × 3; 18 = 2 × 3². பெரிய அடுக்குகளை எடுத்தால் 2² × 3² = 36. இரு எண்களும் 36-ஐ மீதியின்றி வகுக்கும்."
      },
      "visual": {
        "kind": "factors",
        "values": [
          12,
          18
        ]
      }
    },
    {
      "id": "g10-ch2-modulo",
      "section": "2.5",
      "title": {
        "en": "A clock is a number loop",
        "ta": "கடிகாரம் ஒரு எண் சுழற்சி"
      },
      "idea": {
        "en": "Modulo keeps only the remainder. After counting through a full cycle, the position repeats.",
        "ta": "மட்டு கணக்கு என்பது வகுத்த பின் வரும் மீதியைப் பயன்படுத்துவது. ஒரு முழுச் சுற்று முடிந்ததும் அதே இடம் மீண்டும் வரும்."
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
        "values": [
          "Tu",
          "We",
          "Th",
          "Fr",
          "Sa",
          "Su",
          "Mo"
        ]
      }
    },
    {
      "id": "g10-ch2-congruence",
      "section": "2.5",
      "title": {
        "en": "Same remainder means congruent",
        "ta": "ஒரே மீதி என்றால் ஒப்பிசைவு"
      },
      "idea": {
        "en": "Two integers are congruent modulo m if dividing each by m gives the same remainder. Their difference is a multiple of m.",
        "ta": "இரண்டு எண்களையும் m-ஆல் வகுத்தால் ஒரே மீதி வந்தால், அவை m மட்டு ஒப்பிசைவுடையவை. அவற்றின் வித்தியாசம் m-இன் மடங்காகும்."
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
        "en": "Which number is congruent to 14 modulo 5?",
        "ta": "14-க்கு மட்டு 5-இல் ஒப்பிசைவான எண் எது?"
      },
      "choices": [
        {
          "en": "4",
          "ta": "4"
        },
        {
          "en": "5",
          "ta": "5"
        },
        {
          "en": "8",
          "ta": "8"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "14 leaves remainder 4 when divided by 5.",
        "ta": "14-ஐ 5-ஆல் வகுத்தால் மீதி 4."
      },
      "why": {
        "en": "14 and 4 both have remainder 4 (mod 5); the difference is 10.",
        "ta": "14, 4 இரண்டிலும் மீதி 4 (mod 5); வித்தியாசம் 10."
      },
      "visual": {
        "kind": "cycle",
        "size": 5,
        "values": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ]
      }
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
        "en": "What is the 5th term of 2, 5, 8, 11, ...?",
        "ta": "2, 5, 8, 11, ... தொடரின் ஐந்தாம் உறுப்பு என்ன?"
      },
      "choices": [
        {
          "en": "13",
          "ta": "13"
        },
        {
          "en": "15",
          "ta": "15"
        },
        {
          "en": "14",
          "ta": "14"
        }
      ],
      "correct": 2,
      "hint": {
        "en": "Keep adding 3.",
        "ta": "ஒவ்வொரு முறையும் 3-ஐக் கூட்டுங்கள்."
      },
      "why": {
        "en": "11 + 3 = 14. Equivalently, 3 × 5 − 1 = 14.",
        "ta": "11 + 3 = 14. அல்லது 3 × 5 − 1 = 14."
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
      }
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
        "en": "What comes after 1, 1, 2, 3, 5?",
        "ta": "1, 1, 2, 3, 5-க்குப் பின் என்ன?"
      },
      "choices": [
        {
          "en": "6",
          "ta": "6"
        },
        {
          "en": "8",
          "ta": "8"
        },
        {
          "en": "10",
          "ta": "10"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Add the fourth and fifth terms: 3 + 5.",
        "ta": "நான்காவது மற்றும் ஐந்தாவது உறுப்புகளைக் கூட்டவும்: 3 + 5."
      },
      "why": {
        "en": "3 + 5 = 8. This is a sequence rule, not a claim that every pattern adds earlier terms.",
        "ta": "3 + 5 = 8. இது ஒரு குறிப்பிட்ட தொடருக்கான விதி."
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
      }
    },
    {
      "id": "g10-ch2-ap",
      "section": "2.7",
      "title": {
        "en": "Arithmetic progression: add the same difference",
        "ta": "கூட்டுத்தொடர்: ஒரே வேறுபாட்டைக் கூட்டுதல்"
      },
      "idea": {
        "en": "In an arithmetic progression (A.P.), each consecutive difference is the same. That difference d can be positive, zero, or negative.",
        "ta": "கூட்டுத்தொடரில் (A.P.) அடுத்தடுத்த உறுப்புகளின் வேறுபாடு ஒரே அளவில் இருக்கும். பொதுவேறுபாடு d நேர்ம, பூச்சியம் அல்லது எதிர்மமாகலாம்."
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
        "en": "Is 2, 5, 8, 11 an A.P.?",
        "ta": "2, 5, 8, 11 கூட்டுத்தொடரா?"
      },
      "choices": [
        {
          "en": "Yes, d = 3",
          "ta": "ஆம், d = 3"
        },
        {
          "en": "No, gaps change",
          "ta": "இல்லை, வேறுபாடு மாறுகிறது"
        },
        {
          "en": "Yes, d = 2",
          "ta": "ஆம், d = 2"
        }
      ],
      "correct": 0,
      "hint": {
        "en": "Subtract adjacent terms.",
        "ta": "அடுத்தடுத்த உறுப்புகளைக் கழியுங்கள்."
      },
      "why": {
        "en": "The differences are always 3, so this is an A.P.",
        "ta": "எல்லா வேறுபாடுகளும் 3. ஆகவே இது கூட்டுத்தொடர்."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          2,
          5,
          8,
          11
        ]
      }
    },
    {
      "id": "g10-ch2-ap-nth",
      "section": "2.7",
      "title": {
        "en": "Find any A.P. term without writing every term",
        "ta": "எழுதாமலே n-ஆவது கூட்டுத்தொடர் உறுப்பைக் காண்க"
      },
      "idea": {
        "en": "The first term is a. Getting to the nth term takes n−1 jumps of size d, not n jumps.",
        "ta": "முதல் உறுப்பு a. n-ஆவது உறுப்பை அடைய n−1 முறை மட்டுமே d-ஐக் கூட்ட வேண்டும்; n முறை அல்ல."
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
          3,
          7,
          11,
          15,
          19
        ]
      }
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
      }
    },
    {
      "id": "g10-ch2-gp",
      "section": "2.9",
      "title": {
        "en": "Geometric progression: multiply by the same ratio",
        "ta": "பெருக்குத்தொடர்: ஒரே விகிதத்தால் பெருக்குதல்"
      },
      "idea": {
        "en": "A geometric progression (G.P.) multiplies each term by a fixed ratio r. A.P. adds; G.P. multiplies.",
        "ta": "பெருக்குத்தொடரில் (G.P.) ஒவ்வொரு உறுப்பும் நிலையான விகிதம் r-ஆல் பெருக்கப்படுகிறது. கூட்டுத்தொடரில் கூட்டுவோம்; பெருக்குத்தொடரில் பெருக்குவோம்."
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
        "en": "Next term of 5, 15, 45, ...?",
        "ta": "5, 15, 45, ... தொடரின் அடுத்த உறுப்பு?"
      },
      "choices": [
        {
          "en": "90",
          "ta": "90"
        },
        {
          "en": "135",
          "ta": "135"
        },
        {
          "en": "60",
          "ta": "60"
        }
      ],
      "correct": 1,
      "hint": {
        "en": "Multiply 45 by the same ratio 3.",
        "ta": "45-ஐப் பொதுவிகிதம் 3-ஆல் பெருக்குங்கள்."
      },
      "why": {
        "en": "45 × 3 = 135.",
        "ta": "45 × 3 = 135."
      },
      "visual": {
        "kind": "sequence",
        "values": [
          5,
          15,
          45,
          135
        ]
      }
    },
    {
      "id": "g10-ch2-gp-sum",
      "video": {
        "src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch2-gp-sum/b89073380f066247805c5b1ba5def43522c6424c36d731bc26973120c5438ab3.mp4",
        "language": "en",
        "durationSeconds": 93
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
      }
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
        "en": "For 3 + 3/2 + 3/4 + ···, what finite value does the sum approach?",
        "ta": "3 + 3/2 + 3/4 + ··· இன் கூட்டுத்தொகை எந்த மதிப்பை நெருங்கும்?"
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
        "en": "The first term is 3 and each term halves. Compute 3/(1 − 1/2).",
        "ta": "முதல் உறுப்பு 3; ஒவ்வொரு உறுப்பும் பாதியாகும். 3/(1 − 1/2) கணக்கிடுங்கள்."
      },
      "why": {
        "en": "Here a = 3 and r = 1/2, with |r| < 1. Hence S∞ = 3/(1 − 1/2) = 6. Do not use this formula for |r| ≥ 1.",
        "ta": "இங்கே a = 3, r = 1/2; |r| < 1. எனவே S∞ = 3/(1 − 1/2) = 6. |r| ≥ 1 எனில் இந்தச் சூத்திரத்தைப் பயன்படுத்தக்கூடாது."
      },
      "visual": {
        "kind": "fractions",
        "values": [
          1,
          0.5,
          0.25,
          0.125
        ]
      }
    },
    {
      "id": "g10-ch2-special",
      "section": "2.11",
      "title": {
        "en": "Special series: numbers, squares or cubes?",
        "ta": "சிறப்புத் தொடர்கள்: எண்கள், வர்க்கங்கள், கனங்கள்"
      },
      "idea": {
        "en": "Look at what is added: numbers (1 + 2 + ...), squares (1² + 2² + ...), or cubes (1³ + 2³ + ...). Each needs a different rule. Start with squares, then switch the visual to compare.",
        "ta": "எதை கூட்டுகிறோம் எனப் பாருங்கள்: எண்கள் (1 + 2 + ...), வர்க்கங்கள் (1² + 2² + ...), அல்லது கனங்கள் (1³ + 2³ + ...). ஒவ்வொன்றுக்கும் தனித்தனி விதி உண்டு. முதலில் வர்க்கங்களைக் கற்று காட்சியில் மற்றவற்றுடன் ஒப்பிடவும்."
      },
      "example": {
        "en": "For squares, 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. For cubes, 1³ + 2³ + 3³ = (1 + 2 + 3)² = 36. Never use the cubes rule for squares.",
        "ta": "வர்க்கங்களுக்கு: 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. கனங்களுக்கு: 1³ + 2³ + 3³ = (1 + 2 + 3)² = 36. வர்க்கங்களுக்குக் கனங்களின் விதியைப் பயன்படுத்த வேண்டாம்."
      },
      "rule": {
        "en": "1² + 2² + ··· + n² = n(n+1)(2n+1)/6",
        "ta": "1² + 2² + ··· + n² = n(n+1)(2n+1)/6"
      },
      "math": {
        "latex": "\\sum_{k=1}^{n}k^2=\\dfrac{n(n+1)(2n+1)}{6}",
        "fallback": "1² + 2² + ··· + n² = n(n+1)(2n+1)/6"
      },
      "question": {
        "en": "Find 1² + 2² + 3² + 4².",
        "ta": "1² + 2² + 3² + 4² இன் மதிப்பைக் காண்க."
      },
      "choices": [
        {
          "en": "10",
          "ta": "10"
        },
        {
          "en": "100",
          "ta": "100"
        },
        {
          "en": "30",
          "ta": "30"
        }
      ],
      "correct": 2,
      "hint": {
        "en": "Square each number first: 1², 2², 3², 4². Then add.",
        "ta": "முதலில் ஒவ்வொரு எண்ணையும் வர்க்கப்படுத்துங்கள்: 1², 2², 3², 4². பிறகு கூட்டவும்."
      },
      "why": {
        "en": "1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. Using the squares rule: 4 × 5 × 9 ÷ 6 = 30. The cubes rule is different.",
        "ta": "1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. வர்க்கங்களின் விதிப்படி 4 × 5 × 9 ÷ 6 = 30. கனங்களின் விதி வேறு."
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
