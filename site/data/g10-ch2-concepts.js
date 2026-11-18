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
      "practiceId": "c10-2-ex2-9-q1-v",
      "section": "2.11",
      "title": {
        "en": "Special series: numbers, squares or cubes?",
        "ta": "சிறப்புத் தொடர்கள்: எண்கள், வர்க்கங்கள், கனங்கள்"
      },
      "idea": {
        "en": "The natural numbers form an arithmetic progression (A.P.) with common difference 1. The A.P. sum is the number of terms times the average of the first and last terms. Here there are n terms, from 1 to n, so that average is (1 + n) ÷ 2.",
        "ta": "இயல் எண்கள் 1 என்ற பொது வேறுபாடு கொண்ட கூட்டுத் தொடர்வரிசையாக (A.P.) அமைகின்றன. முதல் மற்றும் கடைசி உறுப்புகளின் சராசரியை உறுப்புகளின் எண்ணிக்கையால் பெருக்கினால் கூடுதல் கிடைக்கும். 1 முதல் n வரை n உறுப்புகள் உள்ளன. முதல், கடைசி உறுப்புகளின் சராசரி (1 + n) ÷ 2."
      },
      "example": {
        "en": "An exponent tells you how many copies of a number to multiply. For squares, use two copies of each number. For cubes, use three. Then add the results.",
        "ta": "ஓர் எண்ணை எத்தனை முறை காரணியாகப் பயன்படுத்த வேண்டும் என்பதை அடுக்கு காட்டுகிறது. வர்க்கம் காண ஒரே எண்ணை இரண்டு காரணிகளாகவும், கனம் காண மூன்று காரணிகளாகவும் பெருக்கவும். பிறகு கிடைத்த மதிப்புகளைக் கூட்டவும்."
      },
      "rule": {
        "en": "Sₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2",
        "ta": "Sₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2"
      },
      "math": {
        "latex": "\\begin{aligned}S_n&=\\sum_{k=1}^{n}k=1+2+\\cdots+n\\\\&=\\frac{n(n+1)}{2}\\end{aligned}",
        "fallback": "Sₙ = 1 + 2 + ⋯ + n = [n × (n + 1)] ÷ 2"
      },
      "lesson": {
        "bridgeTitle": {
          "en": "Start with the A.P. sum",
          "ta": "கூட்டுத் தொடர்வரிசையின் கூடுதலிலிருந்து தொடங்குவோம்"
        },
        "notation": {
          "en": "Sₙ means the sum of the first n terms. The symbol ∑ means “add”. Here k takes each value from 1 to n.",
          "ta": "Sₙ என்பது முதல் n உறுப்புகளின் கூடுதல். ∑ என்பது கூட்டலைக் குறிக்கும். இங்கு k என்பது 1 முதல் n வரையிலான ஒவ்வோர் எண்ணையும் குறிக்கும்."
        },
        "powersMath": {
          "latex": "2^2=2\\times2,\\quad 2^3=2\\times2\\times2",
          "fallback": "2² = 2 × 2, 2³ = 2 × 2 × 2"
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
            "en": ["First triangle", "Second triangle", "Third triangle", "Cell totals"],
            "ta": ["முதல் முக்கோணம்", "இரண்டாம் முக்கோணம்", "மூன்றாம் முக்கோணம்", "கட்டங்களில் கிடைத்த கூடுதல்கள்"]
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
            "en": "Find the sum from 1 through the last number. Subtract the extra terms through the number just before the start. For squares from 5 to 10, use the squares rule up to 10 and again up to 4.",
            "ta": "முதலில் 1 முதல் கடைசி எண் வரை கூடுதலைக் காணுங்கள். பிறகு தொடக்க எண்ணுக்கு முந்தைய எண் வரையிலான கூடுதலைக் கழியுங்கள். 5 முதல் 10 வரையிலான வர்க்கங்களின் கூடுதலைக் காண, வர்க்கச் சூத்திரத்தை ஒருமுறை 10 வரையிலும் மறுமுறை 4 வரையிலும் பயன்படுத்துங்கள்."
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
