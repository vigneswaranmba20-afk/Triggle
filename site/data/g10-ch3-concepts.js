/* VER Triggle | Grade 10 Chapter 3 | Algebra — textbook-order concept foundations.
 * Original learning explanations, demonstrations, and transfer checks; NOT copied textbook Worked Examples.
 * Grounded in Tamil Nadu Standard Ten Mathematics, revised 2025, Chapter 3 (pp. 85–160 EN / pp. 86–164 TA).
 * Tamil copy is an initial authored draft using 2025 textbook terms; independent Tamil editorial review pending.
 * No network, tracking, account, or external media. */
(()=>{'use strict';
window.TRIGGLE_G10_CH3_PATH={
  "chapterId": "g10-ch3",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 3 pp. 85–160 (EN) & pp. 86–164 (TA)",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch3-linear-3vars",
      "practiceId": "c10-3-ex3-1-q1-i",
      "section": "3.1–3.2",
      "title": {
        "en": "Simultaneous linear equations in three variables",
        "ta": "மூன்று மாறிகளில் அமைந்த நேரிய ஒருங்கமை சமன்பாடுகள்"
      },
      "rule": {
        "en": "ax + by + cz + d = 0 — eliminate the same variable from two pairs",
        "ta": "ax + by + cz + d = 0 — இரு இணைகளிலிருந்து ஒரே மாறியை நீக்கவும்"
      },
      "math": {
        "latex": "\\begin{aligned}&ax+by+cz+d=0\\\\&3\\text{ vars}\\xrightarrow{\\text{drop }1}2\\text{ vars}\\xrightarrow{\\text{drop }1}1\\text{ var}\\end{aligned}",
        "fallback": "ax + by + cz + d = 0: reduce 3 variables → 2 variables → 1 variable by eliminating the same variable twice."
      },
      "visual": { "kind": "ch3-lab", "id": "linear-3vars" },
      "idea": {
        "en": "Each linear equation ax + by + cz + d = 0 represents a flat plane in 3D space; x, y, z are unknown numbers and a, b, c are their coefficients (not all zero). To solve three equations together, eliminate the same variable from two different pairs so you get a clean two-variable system.",
        "ta": "ax + by + cz + d = 0 என்ற ஒவ்வொரு சமன்பாடும் முப்பரிமாண வெளியில் ஒரு தளத்தைக் குறிக்கும்; x, y, z என்பன மாறிகள், a, b, c என்பன அவற்றின் கெழுக்கள். மூன்று சமன்பாடுகளைத் தீர்க்க, இரு வேறு இணைகளிலிருந்து ஒரே மாறியை நீக்கி இரு மாறிச் சமன்பாடுகளாக மாற்ற வேண்டும்."
      },
      "example": {
        "en": "Watch why removing the same variable twice matters: adding (1) and (2) removes y to leave 3x + 2z = 14, and adding −2×(2) to (3) also removes y to leave −3x + z = −2. Adding those two results solves z = 4 immediately, giving the unique ordered triple (2, −1, 4).",
        "ta": "இரு முறையும் ஒரே மாறியை ஏன் நீக்க வேண்டும் என்பதைப் பாருங்கள்: (1)+(2) மூலம் y நீங்கி 3x + 2z = 14 கிடைக்கும்; −2×(2)+(3) மூலமும் y நீங்கி −3x + z = −2 கிடைக்கும். இவ்விரண்டையும் கூட்ட z = 4 கிடைத்து, ஒரே தீர்வான வரிசை மூன்றடுக்கு (2, −1, 4) கிடைக்கும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}x+y+z&=5,\\\\2x-y+z&=9,\\\\x-2y+3z&=16\\\\(1)+(2)&\\Rightarrow 3x+2z=14\\\\-2(2)+(3)&\\Rightarrow -3x+z=-2\\\\3z=12&\\Rightarrow (x,y,z)=(2,-1,4)\\end{aligned}",
        "fallback": "x+y+z=5, 2x−y+z=9, x−2y+3z=16 ⇒ z=4, x=2, y=−1"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why eliminate the SAME variable twice? If you eliminate y from equations (1) and (2), but eliminate z from equations (2) and (3), you still end up with three different variables (x, z) and (x, y) — you haven't reduced the problem!",
            "Three possible outcomes in 3D geometry: (a) a unique ordered triple (x, y, z) where three planes meet at one point; (b) infinitely many solutions when elimination yields an identity like 0 = 0 (planes meet along a line or coincide); (c) no solution when elimination yields a false statement like 0 = 5 (parallel or inconsistent planes).",
            "Real-world check: splitting total cost across three ticket types (adult, student, child) gives three linear balance equations that must all hold at once."
          ],
          "ta": [
            "ஏன் இரு முறையும் ஒரே மாறியை நீக்க வேண்டும்? (1), (2)-இலிருந்து y-ஐயும், (2), (3)-இலிருந்து z-ஐயும் நீக்கினால், x, y, z மூன்றும் மீண்டும் இருக்கும்; மாறிகள் குறையாது.",
            "மூன்று தளங்களின் மூன்று முடிவுகள்: (அ) ஒரே புள்ளியில் வெட்டினால் ஒரே தீர்வு (x, y, z); (ஆ) நீக்கும்போது 0 = 0 என வந்தால் எண்ணற்ற தீர்வுகள்; (இ) 0 = 5 போன்ற தவறான சமன்பாடு வந்தால் தீர்வு இல்லை.",
            "கட்டண வகைகள் அல்லது கலவைக் கணக்குகளில் மூன்று நிபந்தனைகளும் ஒரே நேரத்தில் பொருந்த வரிசை மூன்றடுக்கு (x, y, z) உதவுகிறது."
          ]
        }
      },
      "question": {
        "en": "Given x + y = 5, y + z = 7, and z + x = 6, what is the value of x + y + z?",
        "ta": "x + y = 5, y + z = 7, z + x = 6 எனில், x + y + z-இன் மதிப்பு என்ன?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}x+y=5,\\;y+z&=7,\\;z+x=6\\\\x+y+z&=\\;?\\end{aligned}",
        "fallback": "x + y = 5, y + z = 7, z + x = 6 ⇒ x + y + z = ?"
      },
      "choices": [
        { "en": "18", "ta": "18" },
        { "en": "9", "ta": "9" },
        { "en": "6", "ta": "6" }
      ],
      "correct": 1,
      "hint": {
        "en": "Add all three equations together. How many times does each variable appear on the left?",
        "ta": "மூன்று சமன்பாடுகளையும் கூட்டுங்கள். இடப்பக்கத்தில் ஒவ்வொரு மாறியும் எத்தனை முறை வருகிறது?"
      },
      "incorrectFeedback": [
        {
          "en": "18 is the sum 2(x + y + z), because each variable appeared twice. Divide by 2 to get x + y + z.",
          "ta": "18 என்பது 2(x + y + z)-இன் மதிப்பு; ஒவ்வொரு மாறியும் இரு முறை வந்துள்ளது. 2-ஆல் வகுக்கவும்."
        },
        null,
        {
          "en": "Adding the three right-hand sides gives 5 + 7 + 6 = 18, which equals 2(x + y + z), not 3(x + y + z).",
          "ta": "வலப்பக்கங்களின் கூடுதல் 5 + 7 + 6 = 18. இது 2(x + y + z)-க்கு சமம்; 3(x + y + z)-க்கு அல்ல."
        }
      ],
      "why": {
        "en": "Adding all three equations gives 2x + 2y + 2z = 18. Factoring out 2 gives 2(x + y + z) = 18, so x + y + z = 9.",
        "ta": "மூன்று சமன்பாடுகளையும் கூட்டினால் 2x + 2y + 2z = 18 கிடைக்கும். 2-ஆல் வகுத்தால் x + y + z = 9."
      },
      "whyMath": {
        "latex": "\\begin{aligned}(x+y)+(y+z)+(z+x)&=5+7+6\\\\2(x+y+z)&=18\\\\x+y+z&=9\\end{aligned}",
        "fallback": "2(x + y + z) = 18 ⇒ x + y + z = 9"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-poly-gcd",
      "practiceId": "c10-3-ex3-2-q1-i",
      "section": "3.3.1",
      "title": {
        "en": "Polynomial GCD by Euclid's division",
        "ta": "யூக்ளிடின் வகுத்தல் முறையில் பல்லுறுப்புக் கோவைகளின் மீ.பெ.வ"
      },
      "rule": {
        "en": "f(x) = g(x)q(x) + r(x), with deg r(x) < deg g(x) or r(x) = 0",
        "ta": "f(x) = g(x)q(x) + r(x); படி r(x) < படி g(x) அல்லது r(x) = 0"
      },
      "math": {
        "latex": "\\begin{aligned}f(x)&=g(x)q(x)+r(x)\\\\r(x)&=0\\text{ or }\\deg r(x)<\\deg g(x)\\end{aligned}",
        "fallback": "f(x) = g(x)q(x) + r(x), with r(x) = 0 or deg r(x) < deg g(x)"
      },
      "visual": { "kind": "ch3-lab", "id": "poly-gcd" },
      "idea": {
        "en": "Just like integers, the Greatest Common Divisor (GCD / HCF) of two polynomials f(x) and g(x) is the highest-degree polynomial dividing both with zero remainder. Keep dividing the divisor by the non-zero remainder until the remainder becomes 0.",
        "ta": "முழு எண்களைப் போலவே, f(x) மற்றும் g(x) ஆகிய இரு பல்லுறுப்புக் கோவைகளின் மீப்பெரு பொது வகுத்தி (மீ.பெ.வ / மீ.பொ.வ) என்பது இரண்டையும் மீதியின்றி வகுக்கும் மிக உயர்ந்த படியுள்ள கோவையாகும். மீதி 0 ஆகும் வரை வகுத்தியை மீதியால் தொடர்ந்து வகுக்கவும்."
      },
      "example": {
        "en": "For f(x) = 2x³ − 3x² + 3x − 1 and g(x) = x³ + x² − x + 2, dividing gives quotient 2 and remainder −5x² + 5x − 5 = −5(x² − x + 1). Since the non-zero constant −5 contains no x, drop −5 and divide g(x) by x² − x + 1; the new remainder is 0, so GCD = x² − x + 1.",
        "ta": "f(x) = 2x³ − 3x² + 3x − 1-ஐ g(x) = x³ + x² − x + 2-ஆல் வகுத்தால் ஈவு 2, மீதி −5(x² − x + 1) கிடைக்கும். மாறிலி −5-இல் x இல்லாததால் அதைத் தவிர்த்து, g(x)-ஐ x² − x + 1-ஆல் வகுக்க மீதி 0 கிடைக்கிறது; எனவே மீ.பெ.வ = x² − x + 1."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}&2x^3-3x^2+3x-1\\\\&=(x^3+x^2-x+2)(2)\\\\&\\quad-5(x^2-x+1)\\\\&x^3+x^2-x+2\\\\&=(x^2-x+1)(x+2)+0\\end{aligned}",
        "fallback": "f(x) = g(x)(2) − 5(x² − x + 1); g(x) = (x² − x + 1)(x + 2) + 0 ⇒ GCD = x² − x + 1"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why compare leading degrees first? Always arrange both polynomials in descending powers of x. Divide the higher-degree polynomial by the lower-degree one; if their degrees are equal, divide the larger leading coefficient by the smaller.",
            "Why can we drop a non-zero constant like −5? A common divisor in algebra only tracks polynomial factors containing the variable unless both original polynomials shared a numerical factor first (for example, if f(x) = 6(...) and g(x) = 9(...), first take gcd(6, 9) = 3 and multiply 3 back at the end).",
            "Do not forget: if the leading coefficient doesn't divide evenly during a step, you may multiply the dividend by a suitable positive constant to avoid messy fractions."
          ],
          "ta": [
            "படிகளை ஏன் முதலில் ஒப்பிட வேண்டும்? எப்போதும் x-இன் இறங்கு வரிசையில் எழுதி, அதிக படியுள்ள கோவையைக் குறைந்த படியுள்ள கோவையால் வகுக்க வேண்டும். படிகள் சமமெனில், பெரிய தலையாயக் கெழுவுள்ள கோவையை வகுபடும் கோவையாக எடுக்கவும்.",
            "மீதியிலிருந்து பூச்சியமற்ற மாறிலி (−5 போன்றவை) ஏன் நீக்கப்படுகிறது? x இல்லாத மாறிலி பல்லுறுப்புக் காரணிகளை மாற்றாது. ஆனால் தொடக்கக் கோவைகளில் பொது எண் காரணி (எ.கா. gcd(6, 9) = 3) இருந்தால், அதைத் தனியே எடுத்து இறுதியில் பெருக்க வேண்டும்.",
            "வகுத்தலின்போது பின்னம் வராமல் தவிர்க்க, வகுபடும் கோவையைத் தேவையான மிகை மாறிலியால் பெருக்கலாம்."
          ]
        }
      },
      "question": {
        "en": "While finding the polynomial GCD of f(x) and g(x), the first division leaves the remainder r(x) = −4(x² − 1). What should you use as the next divisor for g(x)?",
        "ta": "f(x) மற்றும் g(x)-இன் மீ.பெ.வ காணும்போது முதல் வகுத்தலில் மீதி r(x) = −4(x² − 1) கிடைக்கிறது. அடுத்து g(x)-ஐ எதால் வகுக்க வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}r(x)&=-4(x^2-1)\\neq 0\\\\\\text{Next divisor for }g(x)&=\\;?\\end{aligned}",
        "fallback": "r(x) = −4(x² − 1) ⇒ next divisor for g(x) = ?"
      },
      "choices": [
        { "en": "−4", "ta": "−4", "math": { "latex": "-4", "fallback": "−4" } },
        { "en": "x² + 1", "ta": "x² + 1", "math": { "latex": "x^2+1", "fallback": "x² + 1" } },
        { "en": "x² − 1", "ta": "x² − 1", "math": { "latex": "x^2-1", "fallback": "x² − 1" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Drop the non-zero constant factor in front, and keep the polynomial factor containing x.",
        "ta": "முன்னால் உள்ள பூச்சியமற்ற மாறிலிக் காரணியை விட்டுவிட்டு, x கொண்ட பல்லுறுப்புக் காரணியை எடுத்துக்கொள்ளுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "−4 is the non-zero constant factor that we leave out; dividing by −4 alone ignores the x² − 1 expression.",
          "ta": "−4 என்பது நாம் தவிர்க்கும் மாறிலிக் காரணி; −4-ஆல் வகுத்தால் x² − 1 கோவை விடுபட்டுவிடும்."
        },
        {
          "en": "Check the sign inside the bracket of −4(x² − 1): omitting −4 keeps x² − 1 unchanged.",
          "ta": "−4(x² − 1) அடைப்புக்குறிக்குள் உள்ள குறியைச் சரிபாருங்கள்: −4-ஐ நீக்கினால் x² − 1 மாறாது."
        },
        null
      ],
      "why": {
        "en": "Since −4 is a non-zero constant factor without any variable x, we omit −4 and divide g(x) by the polynomial factor x² − 1.",
        "ta": "−4 என்பது மாறி x இல்லாத பூச்சியமற்ற மாறிலி என்பதால் அதை நீக்கி, g(x)-ஐ x² − 1-ஆல் வகுக்க வேண்டும்."
      },
      "whyMath": {
        "latex": "\\begin{aligned}-4(x^2-1)&\\xrightarrow{\\text{drop }-4}\\text{divisor }=x^2-1\\end{aligned}",
        "fallback": "−4(x² − 1) → omit constant −4 → divisor = x² − 1"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-poly-lcm-law",
      "practiceId": "c10-3-ex3-3-q2-i",
      "section": "3.3.2–3.3.3",
      "title": {
        "en": "LCM of polynomials and LCM × GCD = f(x) × g(x)",
        "ta": "பல்லுறுப்புக் கோவைகளின் மீ.சி.ம மற்றும் மீ.சி.ம × மீ.பெ.வ தொடர்பு"
      },
      "rule": {
        "en": "LCM uses highest powers; GCD uses lowest shared powers; f(x) × g(x) = LCM × GCD",
        "ta": "மீ.சி.ம: உயர்ந்த படிகள்; மீ.பெ.வ: பொதுவான குறைந்த படிகள்; f(x) × g(x) = மீ.சி.ம × மீ.பெ.வ"
      },
      "math": {
        "latex": "\\begin{aligned}&\\operatorname{LCM}(f,g)\\times\\operatorname{GCD}(f,g)\\\\&=f(x)\\cdot g(x)\\end{aligned}",
        "fallback": "LCM(f(x), g(x)) × GCD(f(x), g(x)) = f(x) × g(x)"
      },
      "visual": { "kind": "ch3-lab", "id": "lcm-gcd" },
      "idea": {
        "en": "Factor both polynomials completely into numbers and irreducible algebraic factors. The GCD takes the smallest exponent of factors common to both, while the LCM takes the largest exponent of every factor that appears in either polynomial.",
        "ta": "இரு பல்லுறுப்புக் கோவைகளையும் எண் மற்றும் எளிய இயற்கணிதக் காரணிகளாகப் பிரிக்கவும். மீ.பெ.வ இரு கோவைகளிலும் உள்ள பொதுக் காரணிகளின் குறைந்த அடுக்கையும், மீ.சி.ம தோன்றும் அனைத்துக் காரணிகளின் உயர்ந்த அடுக்கையும் எடுத்துக்கொள்ளும்."
      },
      "example": {
        "en": "Compare 12(x − 2)²(x + 3) and 18(x − 2)(x + 3)³. Shared lowest powers give GCD = 6(x − 2)(x + 3), while highest powers give LCM = 36(x − 2)²(x + 3)³. Multiplying confirms f(x) × g(x) = 216(x − 2)³(x + 3)⁴ = LCM × GCD.",
        "ta": "12(x − 2)²(x + 3) மற்றும் 18(x − 2)(x + 3)³ ஆகியவற்றை ஒப்பிடுவோம். பொதுவான குறைந்த அடுக்குகள் மீ.பெ.வ = 6(x − 2)(x + 3); உயர்ந்த அடுக்குகள் மீ.சி.ம = 36(x − 2)²(x + 3)³. பெருக்கினால் f(x)·g(x) = மீ.சி.ம·மீ.பெ.வ = 216(x − 2)³(x + 3)⁴ எனச் சமமாகும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}\\gcd&=6(x-2)(x+3)\\\\\\operatorname{lcm}&=36(x-2)^2(x+3)^3\\\\f\\cdot g&=216(x-2)^3(x+3)^4\\\\&=\\operatorname{lcm}\\cdot\\gcd\\end{aligned}",
        "fallback": "GCD = 6(x−2)(x+3), LCM = 36(x−2)²(x+3)³ ⇒ f·g = LCM·GCD"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why does f(x)·g(x) = LCM·GCD hold? For every factor p with exponents a and b in f and g, min(a, b) + max(a, b) = a + b — so combining lowest and highest exponents gives the exact total exponent in the product!",
            "Important warning: this product identity holds ONLY for two polynomials f(x) and g(x). For three polynomials f, g, h, the product f·g·h is generally NOT equal to LCM(f, g, h)·GCD(f, g, h).",
            "To find an unknown polynomial g(x) when f(x), LCM and GCD are given, divide: g(x) = (LCM × GCD) ÷ f(x)."
          ],
          "ta": [
            "f(x)·g(x) = மீ.சி.ம × மீ.பெ.வ ஏன் எப்போதும் உண்மை? ஒவ்வொரு காரணியின் அடுக்குகளும் a, b எனில், min(a, b) + max(a, b) = a + b என்பதால் இரு பெருக்கல்களின் அடுக்குகள் சமமாகும்.",
            "முக்கிய எச்சரிக்கை: இந்தச் சமன்பாடு இரண்டு கோவைகளுக்கு மட்டுமே பொருந்தும்; மூன்று கோவைகளுக்கு f·g·h ≠ மீ.சி.ம × மீ.பெ.வ.",
            "f(x), மீ.சி.ம, மீ.பெ.வ தெரிந்தால் g(x) = (மீ.சி.ம × மீ.பெ.வ) ÷ f(x) மூலம் காணலாம்."
          ]
        }
      },
      "question": {
        "en": "Two polynomials have GCD = (x − 1) and LCM = (x − 1)(x + 2)(x − 3). If f(x) = (x − 1)(x + 2), find the other polynomial g(x).",
        "ta": "இரு பல்லுறுப்புக் கோவைகளின் மீ.பெ.வ = (x − 1) மற்றும் மீ.சி.ம = (x − 1)(x + 2)(x − 3). f(x) = (x − 1)(x + 2) எனில் g(x) யாது?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}g(x)&=\\dfrac{\\operatorname{LCM}\\times\\operatorname{GCD}}{f(x)}\\\\&=\\dfrac{(x-1)(x+2)(x-3)(x-1)}{(x-1)(x+2)}\\\\&=\\;?\\end{aligned}",
        "fallback": "g(x) = [(x − 1)(x + 2)(x − 3) · (x − 1)] ÷ [(x − 1)(x + 2)] = ?"
      },
      "choices": [
        { "en": "(x − 1)(x − 3)", "ta": "(x − 1)(x − 3)", "math": { "latex": "(x-1)(x-3)", "fallback": "(x − 1)(x − 3)" } },
        { "en": "(x + 2)(x − 3)", "ta": "(x + 2)(x − 3)", "math": { "latex": "(x+2)(x-3)", "fallback": "(x + 2)(x − 3)" } },
        { "en": "(x − 1)²(x − 3)", "ta": "(x − 1)²(x − 3)", "math": { "latex": "(x-1)^2(x-3)", "fallback": "(x − 1)²(x − 3)" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Multiply LCM by GCD, then cancel one factor of (x − 1) and (x + 2) belonging to f(x).",
        "ta": "மீ.சி.ம-ஐ மீ.பெ.வ-உடன் பெருக்கி, f(x)-இன் காரணிகளான (x − 1), (x + 2) ஆகியவற்றை நீக்குங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "If g(x) = (x + 2)(x − 3), then f(x) and g(x) would share (x + 2), not (x − 1). Remember to keep the GCD factor (x − 1).",
          "ta": "(x + 2)(x − 3) என்றால் பொதுக் காரணி (x + 2) ஆகிவிடும். மீ.பெ.வ காரணியான (x − 1) வேண்டும்."
        },
        {
          "en": "Notice f(x) cancels one (x − 1) factor from the numerator, leaving only (x − 1) to the first power.",
          "ta": "f(x)-இல் உள்ள ஒரு (x − 1) காரணி தொகுதியிலுள்ள ஒரு (x − 1)-ஐ நீக்கிவிடும்; அடுக்கு 1 மட்டுமே மிஞ்சும்."
        }
      ],
      "why": {
        "en": "Using g(x) = (LCM × GCD) / f(x), cancelling (x − 1)(x + 2) leaves g(x) = (x − 1)(x − 3). Notice both share GCD = (x − 1).",
        "ta": "g(x) = (மீ.சி.ம × மீ.பெ.வ) ÷ f(x) சூத்திரத்தில் (x − 1)(x + 2)-ஐ நீக்கினால் g(x) = (x − 1)(x − 3) கிடைக்கும்."
      },
      "whyMath": {
        "latex": "\\begin{aligned}g(x)&=\\dfrac{\\cancel{(x-1)(x+2)}(x-3)(x-1)}{\\cancel{(x-1)(x+2)}}\\\\&=(x-1)(x-3)\\end{aligned}",
        "fallback": "g(x) = (x − 1)(x − 3)"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-rational-excluded",
      "practiceId": "c10-3-ex3-4-q1-i",
      "section": "3.4.1–3.4.2",
      "title": {
        "en": "Rational expressions: factor to reduce & excluded values",
        "ta": "விகிதமுறு கோவைகளைச் சுருக்குதலும் விலக்கப்பட்ட மதிப்பும்"
      },
      "rule": {
        "en": "p(x)/q(x) with q(x) ≠ 0; factor numerator and denominator before cancelling",
        "ta": "p(x)/q(x), இங்கு q(x) ≠ 0; நீக்குவதற்கு முன் தொகுதி, பகுதியைக் காரணிப்படுத்தவும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\dfrac{p(x)}{q(x)},\\quad q(x)\\neq 0\\\\&\\text{Excluded: reduce first,}\\\\&\\text{then solve }q(x)=0\\end{aligned}",
        "fallback": "p(x)/q(x), q(x) ≠ 0; solve reduced q(x) = 0 for excluded values"
      },
      "visual": { "kind": "ch3-lab", "id": "rational-excluded" },
      "idea": {
        "en": "A rational expression is a ratio p(x)/q(x) of two polynomials where q(x) ≠ 0. Only common multiplicative factors can be cancelled (never individual added terms!). In lowest form, any value of x making the denominator zero makes the expression undefined and is called an excluded value.",
        "ta": "p(x), q(x) என்பன பல்லுறுப்புக் கோவைகள் மற்றும் q(x) ≠ 0 எனில், p(x)/q(x) ஒரு விகிதமுறு கோவை ஆகும். பொதுப் பெருக்கல் காரணிகளை மட்டுமே நீக்கலாம் (கூட்டப்படும் உறுப்புகளை அல்ல!). சுருக்கிய எளிய வடிவில் பகுதியை 0 ஆக்கும் மதிப்பு விலக்கப்பட்ட மதிப்பு எனப்படும்."
      },
      "example": {
        "en": "Reduce (x² − 9)/(x² + 5x + 6): factor numerator as (x − 3)(x + 3) and denominator as (x + 2)(x + 3), then cancel (x + 3) to obtain (x − 3)/(x + 2). Here x = 3 makes the numerator 0 (result is 0, completely valid!), while x = −2 makes the denominator 0, so −2 is the excluded value.",
        "ta": "(x² − 9)/(x² + 5x + 6)-ஐக் காரணிப்படுத்தினால் [(x−3)(x+3)] / [(x+2)(x+3)] = (x−3)/(x+2) கிடைக்கும். இங்கு x = 3 எனில் கோவையின் மதிப்பு 0 (செல்லுபடியாகும்); ஆனால் x = −2 எனில் பகுதி 0 ஆகி வரையறுக்கப்படாததால் −2 என்பது விலக்கப்பட்ட மதிப்பாகும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}&\\dfrac{x^2-9}{x^2+5x+6}\\\\&=\\dfrac{(x-3)\\cancel{(x+3)}}{(x+2)\\cancel{(x+3)}}\\\\&=\\dfrac{x-3}{x+2}\\\\x+2&=0\\implies\\text{excluded }x=-2\\end{aligned}",
        "fallback": "(x² − 9)/(x² + 5x + 6) = (x − 3)/(x + 2); excluded value: x = −2"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Classic trap — cancelling terms across + or −: in (x + 3)/(x + 2), you CANNOT cancel x to get 3/2! Check with x = 1: (1+3)/(1+2) = 4/3 ≠ 3/2. Factoring converts sums into products so cancellation is legal.",
            "Textbook convention (Section 3.4.2): reduce the rational expression to its lowest form first, then set the remaining denominator equal to zero to identify excluded values.",
            "Can an expression have NO real excluded value? Yes! For example, in x / (x² + 1), x² + 1 ≥ 1 > 0 for all real numbers x, so it is never zero."
          ],
          "ta": [
            "பொதுவான தவறு: (x + 3)/(x + 2) என்பதில் x-ஐ நீக்கக் கூடாது (x=1 எனில் 4/3 ≠ 3/2). முதலில் காரணிப்படுத்தி பெருக்கல் வடிவமாக்கிய பின்னரே பொதுக் காரணிகளை நீக்க வேண்டும்.",
            "பாடநூல் விதி (பகுதி 3.4.2): முதலில் கோவையை எளிய வடிவிற்குச் சுருக்கி, பின் பகுதியை 0-க்குச் சமப்படுத்தி விலக்கப்பட்ட மதிப்பைக் காண்க.",
            "எப்போதும் விலக்கப்பட்ட மதிப்பு இருக்குமா? இல்லை: x/(x² + 1) என்பதில் எல்லா மெய் எண்களுக்கும் x² + 1 ≥ 1 > 0 என்பதால் மெய் விலக்கப்பட்ட மதிப்பு இல்லை."
          ]
        }
      },
      "question": {
        "en": "Find the excluded value(s) of the rational expression (x + 5) / (x² − 16).",
        "ta": "(x + 5) / (x² − 16) என்ற விகிதமுறு கோவையின் விலக்கப்பட்ட மதிப்பு(கள்) யாவை?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}\\dfrac{x+5}{x^2-16}\\quad\\text{is undefined when}\\;?\\end{aligned}",
        "fallback": "(x + 5)/(x² − 16) is undefined when ?"
      },
      "choices": [
        { "en": "−5", "ta": "−5", "math": { "latex": "-5", "fallback": "−5" } },
        { "en": "4 and −4", "ta": "4 மற்றும் −4", "math": { "latex": "4\\text{ and }-4", "fallback": "4 and −4" } },
        { "en": "4 only", "ta": "4 மட்டும்", "math": { "latex": "4\\text{ only}", "fallback": "4 only" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Factor the denominator x² − 16 as a difference of squares and solve for when it equals zero.",
        "ta": "பகுதி x² − 16-ஐ வர்க்க வித்தியாசமாகக் காரணிப்படுத்தி 0-க்குச் சமப்படுத்துங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "x = −5 makes the numerator 0, so the fraction equals 0. Excluded values come from making the denominator 0.",
          "ta": "x = −5 என்பது தொகுதியை 0 ஆக்கும் (விடை 0 ஆகும்). விலக்கப்பட்ட மதிப்பு பகுதியை 0 ஆக்க வேண்டும்."
        },
        null,
        {
          "en": "Both 4² − 16 = 0 and (−4)² − 16 = 0 make the denominator zero, so don't forget the negative root!",
          "ta": "4² − 16 = 0 போலவே (−4)² − 16 = 0 ஆகும்; எனவே எதிர் மூலத்தை மறக்காதீர்கள்."
        }
      ],
      "why": {
        "en": "The fraction is already in lowest form. Setting denominator x² − 16 = (x − 4)(x + 4) = 0 gives x = 4 and x = −4.",
        "ta": "கோவை எளிய வடிவிலேயே உள்ளது. பகுதி x² − 16 = (x − 4)(x + 4) = 0 எனில் x = 4 மற்றும் x = −4."
      },
      "whyMath": {
        "latex": "\\begin{aligned}x^2-16&=0\\\\(x-4)(x+4)&=0\\implies x=4,\\,-4\\end{aligned}",
        "fallback": "x² − 16 = (x − 4)(x + 4) = 0 ⇒ x = 4, −4"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-rational-ops",
      "practiceId": "c10-3-ex3-5-q1-i",
      "secondaryPracticeId": "c10-3-ex3-6-q1-i",
      "section": "3.4.3",
      "title": {
        "en": "Operations on rational expressions (+, −, ×, ÷)",
        "ta": "விகிதமுறு கோவைகள் மீதான செயல்கள் (+, −, ×, ÷)"
      },
      "rule": {
        "en": "Multiply: factor & cancel; Divide: multiply by reciprocal of divisor; Add/Subtract: use LCM denominator",
        "ta": "பெருக்கல்: காரணிப்படுத்தி நீக்கு; வகுத்தல்: தலைகீழால் பெருக்கு; கூட்டல்/கழித்தல்: மீ.சி.ம பகுதி"
      },
      "math": {
        "latex": "\\begin{aligned}\\dfrac{p}{q}\\div\\dfrac{r}{s}&=\\dfrac{p}{q}\\times\\dfrac{s}{r}\\\\\\dfrac{a}{m}-\\dfrac{b-c}{m}&=\\dfrac{a-(b-c)}{m}\\\\&=\\dfrac{a-b+c}{m}\\end{aligned}",
        "fallback": "(p/q) ÷ (r/s) = (p/q) × (s/r); subtraction puts brackets around the numerator: a − (b − c) = a − b + c"
      },
      "visual": { "kind": "ch3-lab", "id": "rational-ops" },
      "idea": {
        "en": "Algebraic fractions follow the exact same arithmetic rules as numerical fractions. For multiplication and division, factor every polynomial first (flipping the second fraction when dividing). For addition and subtraction, find a common LCM denominator and put brackets around any subtracted numerator.",
        "ta": "விகிதமுறு எண்களின் விதிகளே இயற்கணிதப் பின்னங்களுக்கும் பொருந்தும். பெருக்கல் மற்றும் வகுத்தலில் முதலில் எல்லாக் கோவைகளையும் காரணிப்படுத்தவும் (வகுத்தலில் இரண்டாவது பின்னத்தைத் தலைகீழாக மாற்றவும்). கூட்டல், கழித்தலில் பொதுப் பகுதி (மீ.சி.ம) அமைத்து கழிக்கப்படும் தொகுதியை அடைப்புக்குறிக்குள் எழுதவும்."
      },
      "example": {
        "en": "In division (x − 1)/(x + 4) ÷ (x² − 1)/(x + 4), flip only the second expression to get [(x − 1)/(x + 4)] × [(x + 4)/((x − 1)(x + 1))] = 1/(x + 1). In subtraction, 3x/(x² − 9) − (x − 2)/(x + 3) turns into [3x − (x − 2)(x − 3)] / [(x − 3)(x + 3)].",
        "ta": "வகுத்தலில் [(x−1)/(x+4)] ÷ [(x²−1)/(x+4)] = [(x−1)/(x+4)] × [(x+4)/((x−1)(x+1))] = 1/(x+1). கழித்தலில் இரண்டாவது தொகுதிக்கு அடைப்புக்குறி இடுவதால் குறியீட்டுப் பிழை தவிர்க்கப்படுகிறது."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}&\\dfrac{x-1}{x+4}\\div\\dfrac{x^2-1}{x+4}\\\\&=\\dfrac{\\cancel{x-1}}{\\cancel{x+4}}\\times\\dfrac{\\cancel{x+4}}{\\cancel{(x-1)}(x+1)}=\\dfrac{1}{x+1}\\end{aligned}",
        "fallback": "(x−1)/(x+4) ÷ (x²−1)/(x+4) = 1/(x+1)"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why never cancel before flipping in division? Cancellation only works across multiplication (numerator against denominator). Convert ÷ into × reciprocal first!",
            "Why bracket the numerator during subtraction? Writing a/m − (b − c)/m as (a − b − c)/m is the single most common error: the minus sign belongs to the whole fraction bar, so −(b − c) = −b + c.",
            "When denominators are already opposites like (x − 3) and (3 − x), factor out −1 since 3 − x = −(x − 3) instead of building a quadratic denominator."
          ],
          "ta": [
            "வகுத்தலில் தலைகீழாக்கும் முன் ஏன் நீக்கக் கூடாது? பெருக்கல் வடிவத்தில் மட்டுமே தொகுதியும் பகுதியும் நீக்கப்படும்; எனவே ÷-ஐ ×-ஆக மாற்றிய பின்னரே நீக்கவும்.",
            "கழித்தலில் தொகுதிக்கு அடைப்புக்குறி ஏன் அவசியம்? பின்னக் கோடு ஒரு தொகுப்புக் குறியீடு போலச் செயல்படுவதால் −(b − c) = −b + c ஆகும்.",
            "பகுதிகள் (x − 3) மற்றும் (3 − x) என எதிர் அடையாளத்துடன் இருந்தால், 3 − x = −(x − 3) என எழுதுவது எளிது."
          ]
        }
      },
      "question": {
        "en": "Simplify 2x / (x − 3) − (x − 5) / (x − 3).",
        "ta": "2x / (x − 3) − (x − 5) / (x − 3) என்பதைச் சுருக்குக."
      },
      "questionMath": {
        "latex": "\\dfrac{2x}{x-3}-\\dfrac{x-5}{x-3}=\\;?",
        "fallback": "2x/(x − 3) − (x − 5)/(x − 3) = ?"
      },
      "choices": [
        { "en": "(x − 5) / (x − 3)", "ta": "(x − 5) / (x − 3)", "math": { "latex": "\\dfrac{x-5}{x-3}", "fallback": "(x − 5)/(x − 3)" } },
        { "en": "(3x − 5) / (x − 3)", "ta": "(3x − 5) / (x − 3)", "math": { "latex": "\\dfrac{3x-5}{x-3}", "fallback": "(3x − 5)/(x − 3)" } },
        { "en": "(x + 5) / (x − 3)", "ta": "(x + 5) / (x − 3)", "math": { "latex": "\\dfrac{x+5}{x-3}", "fallback": "(x + 5)/(x − 3)" } }
      ],
      "correct": 2,
      "hint": {
        "en": "The denominators are already equal. Write the numerator as 2x − (x − 5) and distribute the minus sign carefully.",
        "ta": "பகுதிகள் ஏற்கெனவே சமம். தொகுதியை 2x − (x − 5) என அடைப்புக்குறியுடன் எழுதி கழித்தலைச் செய்யுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "Careful: 2x − (x − 5) flips both signs inside the parentheses, so −(−5) becomes +5, not −5.",
          "ta": "கவனம்: 2x − (x − 5) என்பதில் −(−5) என்பது +5 ஆகும்; −5 அல்ல."
        },
        {
          "en": "We are subtracting x, not adding it: 2x − x = x.",
          "ta": "x-ஐக் கூட்டவில்லை, கழிக்கிறோம்: 2x − x = x."
        },
        null
      ],
      "why": {
        "en": "With the common denominator x − 3, put brackets around the second numerator: 2x − (x − 5) = 2x − x + 5 = x + 5.",
        "ta": "பொதுப் பகுதி x − 3 என்பதால் 2x − (x − 5) = 2x − x + 5 = x + 5. எனவே விடை (x + 5)/(x − 3)."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{2x-(x-5)}{x-3}&=\\dfrac{2x-x+5}{x-3}=\\dfrac{x+5}{x-3}\\end{aligned}",
        "fallback": "[2x − (x − 5)]/(x − 3) = (x + 5)/(x − 3)"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-poly-sqrt",
      "section": "3.5",
      "relatedExercise": "3.7–3.8",
      "title": {
        "en": "Square root of polynomials: factoring & division",
        "ta": "பல்லுறுப்புக் கோவையின் வர்க்கமூலம்: காரணி & வகுத்தல் முறை"
      },
      "rule": {
        "en": "√(q(x))² = |q(x)|; division method doubles the current quotient at every new step",
        "ta": "√(q(x))² = |q(x)|; வகுத்தல் முறையில் ஒவ்வொரு புதிய படியிலும் ஈவை இருமடங்காக்கவும்"
      },
      "math": {
        "latex": "\\sqrt{\\bigl(q(x)\\bigr)^2}=\\left|q(x)\\right|",
        "fallback": "√[q(x)²] = |q(x)|"
      },
      "visual": { "kind": "ch3-lab", "id": "poly-sqrt" },
      "idea": {
        "en": "Finding √p(x) asks for a polynomial q(x) whose square equals p(x); absolute-value bars |q(x)| show the non-negative square root. When p(x) is already factored, take square roots of coefficients and halve every exponent. For expanded polynomials, sort terms in descending powers and use long division.",
        "ta": "√p(x) என்பது எந்தக் கோவையை வர்க்கப்படுத்தினால் p(x) கிடைக்குமோ அந்தக் கோவை; அதன் மிகை மதிப்பை |q(x)| எனக் குறிப்போம். காரணிப்படுத்தப்பட்ட கோவையில் எண்களின் வர்க்கமூலத்தையும் காரணிகளின் அடுக்குகளில் பாதியையும் எடுக்கவும்; விரித்த கோவைகளில் இறங்கு வரிசையில் வகுத்தல் முறையைப் பயன்படுத்தவும்."
      },
      "example": {
        "en": "By factoring, √[16(x − 2)⁴(x + 1)²] = |4(x − 2)²(x + 1)|. By division on 9x⁴ − 12x³ + 10x² − 4x + 1: first root term is 3x²; doubling 3x² gives trial divisor 6x² to find −2x; doubling 3x² − 2x gives 6x² − 4x to find +1, leaving remainder 0 and answer |3x² − 2x + 1|.",
        "ta": "காரணி முறையில் √[16(x − 2)⁴(x + 1)²] = |4(x − 2)²(x + 1)|. வகுத்தல் முறையில் 9x⁴ − 12x³ + 10x² − 4x + 1 என்பதன் முதல் ஈவு உறுப்பு 3x²; அதை இருமடங்காக்கி 6x² மூலம் −2x கிடைக்கும்; மீண்டும் இருமடங்காக்கி +1 கிடைக்க மீதி 0 ஆகி விடை |3x² − 2x + 1|."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}&\\sqrt{9x^4-12x^3+10x^2-4x+1}\\\\&=\\left|3x^2-2x+1\\right|\\end{aligned}",
        "fallback": "√(9x⁴ − 12x³ + 10x² − 4x + 1) = |3x² − 2x + 1|"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why double the quotient in long division? Look at (A + B)² = A² + (2A + B)B. After subtracting A², the next slice we remove is (2A + B) × B — literally twice the quotient so far plus the new term B, all multiplied by B!",
            "Always check power order first: if a term is out of order (or a power is missing, insert 0x³ etc.), reorder in descending powers before starting division — just like polynomial GCD/Remainder steps where each subtraction must cancel the leading term until the final remainder reaches 0.",
            "Finding unknown constants a and b in a perfect-square polynomial: carry out the division until the final remainder, then equate both remaining terms to 0."
          ],
          "ta": [
            "வகுத்தல் முறையில் ஈவை ஏன் இருமடங்காக்குகிறோம்? (A + B)² = A² + (2A + B)B என்பதால், A²-ஐக் கழித்த பின் மீதியை (2A + B) × B வடிவில் அமைக்க 2A தேவைப்படுகிறது.",
            "எப்போதும் அடுக்குகள் இறங்கு வரிசையில் உள்ளதா எனப் பார்க்கவும்; இடையில் உறுப்பு விடுபட்டால் 0-கெழுவுடன் சேர்க்கலாம்.",
            "முழு வர்க்கக் கோவையில் தெரியாத மாறிலிகள் a, b காண இறுதி மீதியை 0-க்குச் சமப்படுத்தவும்."
          ]
        }
      },
      "question": {
        "en": "Find the square root of 25(x + 4)²(x − 1)⁴.",
        "ta": "25(x + 4)²(x − 1)⁴ என்பதன் வர்க்கமூலம் காண்க."
      },
      "questionMath": {
        "latex": "\\sqrt{25(x+4)^2(x-1)^4}=\\;?",
        "fallback": "√[25(x + 4)²(x − 1)⁴] = ?"
      },
      "choices": [
        { "en": "|5(x + 4)(x − 1)⁴|", "ta": "|5(x + 4)(x − 1)⁴|", "math": { "latex": "\\left|5(x+4)(x-1)^4\\right|", "fallback": "|5(x + 4)(x − 1)⁴|" } },
        { "en": "|5(x + 4)(x − 1)²|", "ta": "|5(x + 4)(x − 1)²|", "math": { "latex": "\\left|5(x+4)(x-1)^2\\right|", "fallback": "|5(x + 4)(x − 1)²|" } },
        { "en": "|25(x + 4)(x − 1)²|", "ta": "|25(x + 4)(x − 1)²|", "math": { "latex": "\\left|25(x+4)(x-1)^2\\right|", "fallback": "|25(x + 4)(x − 1)²|" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Take √25 for the number, and divide the exponent of EVERY polynomial factor by 2.",
        "ta": "எண் 25-க்கு வர்க்கமூலம் எடுத்து, ஒவ்வொரு காரணியின் அடுக்கையும் 2-ஆல் வகுக்கவும்."
      },
      "incorrectFeedback": [
        {
          "en": "Don't forget to halve the second exponent as well: half of 4 is 2, not 4.",
          "ta": "இரண்டாவது காரணியின் அடுக்கையும் பாதியாக்க மறக்காதீர்கள்: 4-இன் பாதி 2."
        },
        null,
        {
          "en": "You halved the polynomial exponents correctly, but forgot to take √25 = 5.",
          "ta": "கோவை அடுக்குகளைச் சரியாகப் பாதியாக்கினீர்கள், ஆனால் √25 = 5 எடுக்க மறந்துவிட்டீர்கள்."
        }
      ],
      "why": {
        "en": "Since √25 = 5, half of exponent 2 is 1, and half of exponent 4 is 2, the square root is |5(x + 4)(x − 1)²|.",
        "ta": "√25 = 5, அடுக்கு 2-இன் பாதி 1, அடுக்கு 4-இன் பாதி 2 என்பதால் விடை |5(x + 4)(x − 1)²|."
      },
      "whyMath": {
        "latex": "\\begin{aligned}&\\sqrt{25}\\cdot\\sqrt{(x+4)^2}\\cdot\\sqrt{(x-1)^4}\\\\&=\\left|5(x+4)(x-1)^2\\right|\\end{aligned}",
        "fallback": "√25 · |x+4| · (x−1)² = |5(x + 4)(x − 1)²|"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-quad-form",
      "section": "3.6.1–3.6.3",
      "relatedExercise": "3.9",
      "title": {
        "en": "Zeroes, roots, and forming a quadratic equation",
        "ta": "பூச்சியங்கள், மூலங்கள் மற்றும் இருபடிச் சமன்பாட்டை அமைத்தல்"
      },
      "rule": {
        "en": "α + β = −b/a and αβ = c/a; equation with roots α, β is x² − (α + β)x + αβ = 0",
        "ta": "α + β = −b/a மற்றும் αβ = c/a; சமன்பாடு: x² − (α + β)x + αβ = 0"
      },
      "math": {
        "latex": "\\begin{aligned}x^2-(\\alpha+\\beta)x+\\alpha\\beta&=0\\\\\\alpha+\\beta=-\\dfrac{b}{a},\\quad\\alpha\\beta&=\\dfrac{c}{a}\\end{aligned}",
        "fallback": "x² − (α + β)x + αβ = 0, with α + β = −b/a and αβ = c/a"
      },
      "visual": { "kind": "ch3-lab", "id": "quad-form" },
      "idea": {
        "en": "A number α is a zero of polynomial p(x) = ax² + bx + c (a ≠ 0) and a root of ax² + bx + c = 0 if substituting x = α gives 0. The Greek letters α (alpha) and β (beta) name the two roots. Expanding (x − α)(x − β) = 0 produces the standard construction template with a minus sign before the sum of roots.",
        "ta": "p(x) = ax² + bx + c (a ≠ 0) கோவையை பூச்சியமாக்கும் α என்ற எண் அதன் பூச்சியம் எனவும், ax² + bx + c = 0 சமன்பாட்டின் மூலம் எனவும் அழைக்கப்படுகிறது. α, β என்பன இரு மூலங்கள். (x − α)(x − β) = 0 என்பதை விரிக்கும்போது மூலங்களின் கூடுதலுக்கு முன் கழித்தல் குறி வருகிறது."
      },
      "example": {
        "en": "For roots α = −3 and β = 4, expanding (x + 3)(x − 4) = 0 gives x² − 1x − 12 = 0. Notice sum α + β = +1 appears with a minus sign (−1x), and product αβ = −12 appears directly as the constant term.",
        "ta": "மூலங்கள் α = −3, β = 4 எனில், கூடுதல் α + β = 1, பெருக்கற்பலன் αβ = −12. எனவே x² − (1)x + (−12) = x² − x − 12 = 0."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}(x-(-3))(x-4)&=0\\\\x^2-(1)x+(-12)&=0\\\\x^2-x-12&=0\\end{aligned}",
        "fallback": "(x + 3)(x − 4) = x² − x − 12 = 0"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Zeroes vs Roots: We say 'zeroes of the quadratic polynomial p(x)' and 'roots of the quadratic equation p(x) = 0'. They have the exact same numerical values!",
            "Why is there a minus sign in x² − (sum)x + (product) = 0? Look at (x − α)(x − β) = x² − αx − βx + αβ = x² − (α + β)x + αβ.",
            "Remember a ≠ 0: if a = 0, ax² vanishes and the equation drops to linear bx + c = 0. Also notice in 2x² − 6x + 5 = 0, divide by a = 2 so sum = −(−6)/2 = 3 and product = 5/2."
          ],
          "ta": [
            "பூச்சியங்கள் vs மூலங்கள்: p(x) என்ற பல்லுறுப்புக் கோவைக்கு 'பூச்சியங்கள்' என்றும், p(x) = 0 என்ற சமன்பாட்டிற்கு 'மூலங்கள்' என்றும் கூறுகிறோம்; இரண்டின் எண் மதிப்புகளும் ஒன்றே.",
            "x² − (கூடுதல்)x + (பெருக்கற்பலன்) = 0-இல் கழித்தல் குறி ஏன் வருகிறது? (x − α)(x − β) = x² − αx − βx + αβ என்பதால்தான்.",
            "சமன்பாட்டில் x²-இன் கெழு a ≠ 1 எனில் (எ.கா. 2x² − 6x + 5 = 0), முதலில் a-ஆல் வகுக்க மறக்காதீர்கள்: கூடுதல் = −b/a, பெருக்கல் = c/a."
          ]
        }
      },
      "question": {
        "en": "Form the quadratic equation whose roots are −2 and 5.",
        "ta": "−2 மற்றும் 5 ஆகியவற்றை மூலங்களாகக் கொண்ட இருபடிச் சமன்பாட்டை அமைக்கவும்."
      },
      "questionMath": {
        "latex": "\\begin{aligned}\\alpha=-2,\\;&\\beta=5\\\\x^2-(\\alpha+\\beta)x+\\alpha\\beta&=0\\implies\\;?\\end{aligned}",
        "fallback": "α = −2, β = 5 ⇒ x² − (α + β)x + αβ = 0 is ?"
      },
      "choices": [
        { "en": "x² − 3x − 10 = 0", "ta": "x² − 3x − 10 = 0", "math": { "latex": "x^2-3x-10=0", "fallback": "x² − 3x − 10 = 0" } },
        { "en": "x² + 3x − 10 = 0", "ta": "x² + 3x − 10 = 0", "math": { "latex": "x^2+3x-10=0", "fallback": "x² + 3x − 10 = 0" } },
        { "en": "x² − 3x + 10 = 0", "ta": "x² − 3x + 10 = 0", "math": { "latex": "x^2-3x+10=0", "fallback": "x² − 3x + 10 = 0" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Compute sum = −2 + 5 = 3 and product = (−2)(5) = −10, then substitute into x² − (sum)x + (product) = 0.",
        "ta": "கூடுதல் −2 + 5 = 3, பெருக்கல் (−2)(5) = −10 எனக் கணக்கிட்டு x² − (கூடுதல்)x + (பெருக்கல்) = 0-இல் பிரதியிடவும்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Watch the formula's minus sign: since α + β = +3, the middle term is −3x, not +3x. (Checking x = 5: 25 + 15 − 10 ≠ 0.)",
          "ta": "சூத்திரத்தில் உள்ள கழித்தல் குறியைக் கவனியுங்கள்: கூடுதல் +3 என்பதால் நடு உறுப்பு −3x ஆக இருக்க வேண்டும்."
        },
        {
          "en": "Check the product of −2 and 5: a negative times a positive is −10, not +10.",
          "ta": "−2 மற்றும் 5-இன் பெருக்கற்பலன் −10 ஆகும்; +10 அல்ல."
        }
      ],
      "why": {
        "en": "Sum α + β = −2 + 5 = 3 and product αβ = −10. Substituting gives x² − 3x − 10 = 0; check (x + 2)(x − 5) = 0.",
        "ta": "கூடுதல் 3, பெருக்கல் −10 என்பதால் x² − 3x − 10 = 0. சரிபார்த்தல்: (x + 2)(x − 5) = 0."
      },
      "whyMath": {
        "latex": "x^2-(3)x+(-10)=x^2-3x-10=0",
        "fallback": "x² − (3)x + (−10) = x² − 3x − 10 = 0"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-quad-solve",
      "section": "3.6.4–3.6.5",
      "relatedExercise": "3.10–3.12",
      "title": {
        "en": "Solving quadratic equations: three methods",
        "ta": "இருபடிச் சமன்பாட்டைத் தீர்க்கும் மூன்று முறைகள்"
      },
      "rule": {
        "en": "Factoring, Completing the Square, and the Formula x = (−b ± √(b² − 4ac)) / (2a)",
        "ta": "காரணிப்படுத்தல், வர்க்கப் பூர்த்தி முறை மற்றும் சூத்திரம் x = (−b ± √(b² − 4ac)) / (2a)"
      },
      "math": {
        "latex": "\\begin{aligned}&ax^2+bx+c=0\\quad(a\\neq 0)\\\\&x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\end{aligned}",
        "fallback": "x = (−b ± √(b² − 4ac)) / (2a)"
      },
      "visual": { "kind": "ch3-lab", "id": "quad-solve" },
      "idea": {
        "en": "Every quadratic equation can be solved by three connected methods: (1) Factorization when rational factors split easily, (2) Completing the Square by dividing by a and adding (b/2a)² to both sides to form a literal geometric square, and (3) the Quadratic Formula, which applies completing the square once and for all.",
        "ta": "ஒவ்வொரு இருபடிச் சமன்பாட்டையும் மூன்று தொடர்புடைய முறைகளில் தீர்க்கலாம்: (1) எளிதில் பிரியுமெனில் காரணிப்படுத்தல், (2) a-ஆல் வகுத்து இருபுறமும் (b/2a)² கூட்டிக் கட்டமைக்கும் வர்க்கப் பூர்த்தி முறை, (3) எல்லா சமன்பாடுகளுக்கும் பொருந்தும் இருபடிச் சமன்பாட்டுச் சூத்திரம்."
      },
      "example": {
        "en": "For x² + 6x − 7 = 0, write x² + 6x = 7. Splitting 6x into two 3x rectangles leaves a 3 × 3 = 9 corner missing. Adding 9 to both sides completes the square (x + 3)² = 16, giving x + 3 = ±4, so x = 1 or −7 — matching factoring (x − 1)(x + 7) = 0 and the quadratic formula.",
        "ta": "x² + 6x − 7 = 0-ஐ x² + 6x = 7 என எழுதினால், இரு 3x செவ்வகங்களுக்கு இடையே 3 × 3 = 9 என்ற மூலைச் சதுரம் தேவைப்படுகிறது. இருபுறமும் 9 கூட்டினால் (x + 3)² = 16 ⇒ x = 1 அல்லது −7 கிடைக்கும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}x^2+6x&=7\\;\\xrightarrow{+3^2}\\;(x+3)^2=16\\\\x+3&=\\pm 4\\implies x=1,\\;-7\\end{aligned}",
        "fallback": "x² + 6x = 7 ⇒ (x + 3)² = 16 ⇒ x = 1, −7"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why divide by a BEFORE completing the square? Adding (half of x-coefficient)² only builds a clean square if the coefficient of x² is 1.",
            "Where does the Quadratic Formula come from? Divide ax² + bx + c = 0 by a, complete the square by adding (b/2a)², and take the square root of both sides!",
            "Word problems (Section 3.6.5): always test both mathematical roots against physical reality — lengths, ages, counts, and speeds cannot be negative."
          ],
          "ta": [
            "வர்க்கப் பூர்த்தி செய்வதற்கு முன் ஏன் a-ஆல் வகுக்க வேண்டும்? x²-இன் கெழு 1 ஆக இருந்தால் மட்டுமே (x-கெழு / 2)² கூட்டும்போது முழு சதுரம் உருவாகும்.",
            "இருபடிச் சூத்திரம் எங்கிருந்து வந்தது? ax² + bx + c = 0 என்பதை a-ஆல் வகுத்து வர்க்கப் பூர்த்தி செய்தால் சூத்திரம் பிறக்கிறது.",
            "வாழ்வியல் கணக்குகளில் (பகுதி 3.6.5) கிடைக்கும் இரு மூலங்களில் நீளம், வயது, வேகம் போன்றவை எதிர் எண்ணாக இருக்க முடியாது என்பதைச் சரிபார்க்கவும்."
          ]
        }
      },
      "question": {
        "en": "When solving x² − 8x + 3 = 0 by completing the square, rewrite it as x² − 8x = −3. What number must be added to both sides to make the left side a perfect square?",
        "ta": "x² − 8x + 3 = 0-ஐ வர்க்கப் பூர்த்தி முறையில் தீர்க்க x² − 8x = −3 என மாற்றுகிறோம். இடப்பக்கத்தை முழு வர்க்கமாக்க இருபுறமும் எந்த எண்ணைக் கூட்ட வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}x^2-8x+\\square&=-3+\\square\\\\&\\longrightarrow\\;(x-4)^2\\end{aligned}",
        "fallback": "x² − 8x + □ = −3 + □ → (x − 4)²"
      },
      "choices": [
        { "en": "4", "ta": "4" },
        { "en": "64", "ta": "64" },
        { "en": "16", "ta": "16" }
      ],
      "correct": 2,
      "hint": {
        "en": "Take half of −8, then square that number: (−8 ÷ 2)².",
        "ta": "−8-இன் பாதியை எடுத்து, பின்னர் அதை வர்க்கப்படுத்தவும்: (−8 ÷ 2)²."
      },
      "incorrectFeedback": [
        {
          "en": "4 is only half of 8. In (x − 4)² = x² − 8x + 16, you must square 4 to get the corner piece 16.",
          "ta": "4 என்பது 8-இன் பாதி மட்டுமே. (x − 4)² = x² − 8x + 16 என்பதால் 4-ஐ வர்க்கப்படுத்தி 16 கூட்ட வேண்டும்."
        },
        {
          "en": "64 squares −8 directly without halving it first.",
          "ta": "−8-ஐப் பாதியாக்காமல் நேரடியாக வர்க்கப்படுத்தினால் 64 வரும்; முதலில் பாதியாக்க வேண்டும்."
        },
        null
      ],
      "why": {
        "en": "Half of −8 is −4, and (−4)² = 16. Adding 16 gives (x − 4)² = 13, so x = 4 ± √13.",
        "ta": "−8-இன் பாதி −4; (−4)² = 16. இருபுறமும் 16 கூட்டினால் (x − 4)² = 13 ⇒ x = 4 ± √13."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\left(\\dfrac{-8}{2}\\right)^2&=(-4)^2=16\\\\(x-4)^2&=13\\end{aligned}",
        "fallback": "(−8/2)² = 16 ⇒ (x − 4)² = 13"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-discriminant",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch3-discriminant/4c692aa75bad331a6d1f859f3c8be79da3d621af15259ac5e79ebadb79eef890.mp4", "language": "en", "durationSeconds": 152.44},
      "section": "3.6.6",
      "relatedExercise": "3.13",
      "title": {
        "en": "Nature of roots and the discriminant (Δ = b² − 4ac)",
        "ta": "தன்மைக்காட்டி (Δ = b² − 4ac) மற்றும் மூலங்களின் தன்மை"
      },
      "rule": {
        "en": "Δ = b² − 4ac: Δ > 0 gives real & unequal, Δ = 0 gives real & equal, Δ < 0 gives no real roots",
        "ta": "Δ = b² − 4ac: Δ > 0 மெய் & சமமற்றவை, Δ = 0 மெய் & சமம், Δ < 0 மெய் மூலங்கள் இல்லை"
      },
      "math": {
        "latex": "\\Delta=b^2-4ac\\;\\begin{cases}>0&\\text{real, unequal}\\\\=0&\\text{real, equal}\\\\<0&\\text{no real roots}\\end{cases}",
        "fallback": "Δ = b² − 4ac: Δ > 0 (real & unequal), Δ = 0 (real & equal), Δ < 0 (no real roots)"
      },
      "visual": { "kind": "ch3-lab", "id": "discriminant" },
      "idea": {
        "en": "Inside the quadratic formula sits √(b² − 4ac). Because that part alone decides whether the square root exists as two numbers, collapses to zero, or cannot be taken over real numbers, the Greek letter Δ (Delta = b² − 4ac) is called the discriminant.",
        "ta": "இருபடிச் சூத்திரத்தில் உள்ள √(b² − 4ac) பகுதியே மூலங்களின் வகையைத் தீர்மானிப்பதால், Δ = b² − 4ac (டெல்டா) என்பது 'தன்மைக்காட்டி' எனப்படுகிறது. √Δ மிகை எனில் இரு வெவ்வேறு மெய் மூலங்கள், 0 எனில் சம மூலங்கள், குறை எனில் மெய் மூலங்கள் இல்லை."
      },
      "example": {
        "en": "In y = x² − 4x + c, raising c shifts the parabola upward: at c = 3, Δ = 4 > 0 is a perfect square, giving rational unequal roots (1, 3); at c = 2, Δ = 8 > 0 is not a perfect square, giving irrational roots; at c = 4, Δ = 0 touches (2, 0) (equal); at c = 5, Δ = −4 < 0 gives no real roots.",
        "ta": "y = x² − 4x + c பரவளையத்தில்: c = 3 எனில் Δ = 4 > 0 முழு வர்க்கம் என்பதால் விகிதமுறு வெவ்வேறு மூலங்கள் (1, 3); c = 2 எனில் Δ = 8 > 0 முழு வர்க்கம் அல்லாததால் விகிதமுறா மூலங்கள்; c = 4 எனில் Δ = 0 (சம மூலங்கள்); c = 5 எனில் Δ = −4 < 0 (மெய் மூலங்கள் இல்லை)."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}x^2-4x+4&=0\\\\\\Delta=(-4)^2-4(1)(4)&=0\\\\\\implies\\text{equal }(x&=2)\\end{aligned}",
        "fallback": "x² − 4x + 4 = 0: Δ = 16 − 16 = 0 ⇒ real and equal roots (x = 2)"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why must coefficients a, b, c be real (a ≠ 0)? The test 'Δ < 0 means no real roots' relies on a real number squared never being negative.",
            "Splitting the Δ > 0 case (when a, b, c are rational, TN p. 119): if Δ > 0 is a perfect square (such as Δ = 4 or 16 in x² − 4x + c), √Δ is rational so the two unequal roots are rational; if Δ > 0 is not a perfect square (such as Δ = 8), √Δ stays a surd so the roots are irrational.",
            "When a problem says 'has real roots' (without saying unequal), include BOTH Δ > 0 and Δ = 0, i.e., Δ ≥ 0.",
            "Always rearrange into standard form ax² + bx + c = 0 before reading a, b, c — watch the signs of b and c!"
          ],
          "ta": [
            "a, b, c விகிதமுறு எண்களாக இருந்து Δ > 0 முழு வர்க்கமாக (எ.கா. 4, 16) இருந்தால் மூலங்கள் விகிதமுறு எண்களாகவும், முழு வர்க்கமாக இல்லாவிட்டால் (எ.கா. 8) விகிதமுறா எண்களாகவும் இருக்கும்.",
            "மெய் மூலங்கள் (real roots) என்று மட்டும் கேட்டால் Δ > 0 மற்றும் Δ = 0 ஆகிய இரண்டையும் சேர்த்து Δ ≥ 0 என எடுக்க வேண்டும்.",
            "a, b, c மதிப்புகளை எடுக்கும் முன் சமன்பாடு ax² + bx + c = 0 என்ற திட்ட வடிவில் உள்ளதா என்பதையும் குறிகளையும் சரிபார்க்கவும்."
          ]
        }
      },
      "question": {
        "en": "Determine the nature of roots of 2x² − 6x + 5 = 0.",
        "ta": "2x² − 6x + 5 = 0 என்ற சமன்பாட்டின் மூலங்களின் தன்மையைக் காண்க."
      },
      "questionMath": {
        "latex": "\\begin{aligned}2x^2-6x+5&=0\\\\\\Delta=b^2-4ac&=\\;?\\end{aligned}",
        "fallback": "2x² − 6x + 5 = 0, Δ = b² − 4ac = ?"
      },
      "choices": [
        { "en": "Real and unequal roots", "ta": "மெய் மற்றும் சமமற்ற மூலங்கள்" },
        { "en": "No real roots", "ta": "மெய் மூலங்கள் இல்லை" },
        { "en": "Real and equal roots", "ta": "மெய் மற்றும் சமமான மூலங்கள்" }
      ],
      "correct": 1,
      "hint": {
        "en": "Identify a = 2, b = −6, c = 5 and compute Δ = (−6)² − 4(2)(5).",
        "ta": "a = 2, b = −6, c = 5 என எடுத்து Δ = (−6)² − 4(2)(5) மதிப்பைக் கணக்கிடுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "Check the sign of Δ: (−6)² = 36, while 4ac = 4 × 2 × 5 = 40, so Δ = 36 − 40 is negative.",
          "ta": "Δ-இன் குறியைச் சரிபாருங்கள்: 36 − 40 = −4 என்பது குறை எண்."
        },
        null,
        {
          "en": "Equal roots require Δ = 0, whereas here b² − 4ac = 36 − 40 = −4 ≠ 0.",
          "ta": "சம மூலங்களுக்கு Δ = 0 ஆக இருக்க வேண்டும்; ஆனால் இங்கு Δ = 36 − 40 = −4."
        }
      ],
      "why": {
        "en": "With a = 2, b = −6, c = 5, Δ = (−6)² − 4(2)(5) = 36 − 40 = −4 < 0. Since Δ < 0, √(−4) is not real, so there are no real roots.",
        "ta": "a = 2, b = −6, c = 5 என்பதால் Δ = 36 − 40 = −4 < 0. எனவே சமன்பாட்டிற்கு மெய் மூலங்கள் இல்லை."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\Delta&=(-6)^2-4(2)(5)=36-40=-4<0\\\\&\\implies\\text{no real roots}\\end{aligned}",
        "fallback": "Δ = (−6)² − 4(2)(5) = 36 − 40 = −4 < 0 ⇒ no real roots"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-roots-coeff",
      "section": "3.6.7",
      "relatedExercise": "3.14",
      "title": {
        "en": "Relation between roots and coefficients",
        "ta": "மூலங்களுக்கும் கெழுக்களுக்கும் இடையேயுள்ள தொடர்பு"
      },
      "rule": {
        "en": "Express symmetric formulas using only α + β = −b/a and αβ = c/a",
        "ta": "சமச்சீர் கோவைகளை α + β = −b/a மற்றும் αβ = c/a வழியாக மட்டும் மாற்றி எழுதுங்கள்"
      },
      "math": {
        "latex": "\\begin{aligned}\\alpha^2+\\beta^2&=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\(\\alpha-\\beta)^2&=(\\alpha+\\beta)^2-4\\alpha\\beta\\\\\\alpha^3+\\beta^3&=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)\\end{aligned}",
        "fallback": "α² + β² = (α + β)² − 2αβ; (α − β)² = (α + β)² − 4αβ; α³ + β³ = (α + β)³ − 3αβ(α + β)"
      },
      "visual": { "kind": "ch3-lab", "id": "roots-coeff" },
      "idea": {
        "en": "Even when the roots α and β are messy irrational numbers, you never have to compute them one by one to evaluate symmetric expressions like α² + β² or 1/α + 1/β. Rewrite every expression purely in terms of α + β and αβ, which you read straight from the coefficients.",
        "ta": "மூலங்கள் α, β ஆகியவை சிக்கலான விகிதமுறா எண்களாக இருந்தாலும், α² + β², 1/α + 1/β போன்ற சமச்சீர் கோவைகளின் மதிப்பு காண மூலங்களைத் தனித்தனியாகக் கண்டுபிடிக்கத் தேவையில்லை. கெழுக்களிலிருந்து நேரடியாகக் கிடைக்கும் α + β, αβ ஆகியவற்றின் மூலம் மட்டும் மாற்றினால் போதும்."
      },
      "example": {
        "en": "For x² − 5x + 6 = 0, read α + β = 5 and αβ = 6 immediately. Then α² + β² = 5² − 2(6) = 13, and 1/α + 1/β = (α + β)/(αβ) = 5/6 (matching individual roots 3 and 2: 3² + 2² = 13 and 1/3 + 1/2 = 5/6).",
        "ta": "x² − 5x + 6 = 0-இல் α + β = 5, αβ = 6. எனவே α² + β² = 5² − 2(6) = 13; 1/α + 1/β = (α + β)/(αβ) = 5/6."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}\\alpha+\\beta&=5,\\quad\\alpha\\beta=6\\\\\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}&=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{5}{6}\\end{aligned}",
        "fallback": "α + β = 5, αβ = 6 ⇒ 1/α + 1/β = (α + β)/(αβ) = 5/6"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Most common identity error: thinking (α + β)² = α² + β². Remember (α + β)² = α² + 2αβ + β², so you MUST subtract 2αβ!",
            "Why subtract 4αβ in (α − β)²? Expanding (α + β)² − 4αβ = α² + 2αβ + β² − 4αβ = α² − 2αβ + β² = (α − β)². Taking the square root gives |α − β| = √((α + β)² − 4αβ).",
            "To build a new quadratic equation with transformed roots (say 2α and 2β, or α² and β²), simply compute the new sum and new product from the original α + β and αβ."
          ],
          "ta": [
            "மிகப் பொதுவான தவறு: (α + β)² = α² + β² என நினைப்பது. (α + β)² = α² + 2αβ + β² என்பதால் 2αβ-ஐக் கட்டாயம் கழிக்க வேண்டும்.",
            "(α − β)² = (α + β)² − 4αβ சமன்பாட்டிலிருந்து |α − β| = √[(α + β)² − 4αβ] கிடைக்கும்.",
            "2α, 2β போன்ற புதிய மூலங்களைக் கொண்ட சமன்பாட்டை அமைக்க, புதிய மூலங்களின் கூடுதல் மற்றும் பெருக்கலைப் பழைய α + β, αβ மூலம் கணக்கிடுங்கள்."
          ]
        }
      },
      "question": {
        "en": "If α and β are the roots of x² − 7x + 10 = 0, evaluate α² + β² using roots-and-coefficients identities.",
        "ta": "x² − 7x + 10 = 0-இன் மூலங்கள் α, β எனில், α² + β²-இன் மதிப்பு யாது?"
      },
      "questionMath": {
        "latex": "x^2-7x+10=0\\quad\\Longrightarrow\\quad\\alpha^2+\\beta^2=\\;?",
        "fallback": "x² − 7x + 10 = 0 ⇒ α² + β² = ?"
      },
      "choices": [
        { "en": "49", "ta": "49" },
        { "en": "39", "ta": "39" },
        { "en": "29", "ta": "29" }
      ],
      "correct": 2,
      "hint": {
        "en": "Read α + β = 7 and αβ = 10, then apply α² + β² = (α + β)² − 2αβ.",
        "ta": "α + β = 7 மற்றும் αβ = 10 என எடுத்து, α² + β² = (α + β)² − 2αβ சூத்திரத்தைப் பயன்படுத்துங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "49 is (α + β)². Because (α + β)² includes +2αβ, subtract 2αβ = 20 to isolate α² + β².",
          "ta": "49 என்பது (α + β)² மட்டுமே. அதிலிருந்து 2αβ = 20-ஐக் கழிக்க வேண்டும்."
        },
        {
          "en": "You subtracted αβ = 10 once instead of 2αβ = 20.",
          "ta": "2αβ = 20-க்குப் பதிலாக αβ = 10 மட்டுமே கழித்துள்ளீர்கள்."
        },
        null
      ],
      "why": {
        "en": "Here α + β = 7 and αβ = 10, so α² + β² = 7² − 2(10) = 49 − 20 = 29. (Verify with roots 5 and 2: 5² + 2² = 29.)",
        "ta": "α + β = 7, αβ = 10 என்பதால் α² + β² = 7² − 2(10) = 49 − 20 = 29."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\alpha^2+\\beta^2&=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\&=7^2-2(10)=29\\end{aligned}",
        "fallback": "α² + β² = 7² − 2(10) = 29"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-variations",
      "section": "3.7",
      "relatedExercise": "3.15",
      "title": {
        "en": "Graphs of direct and inverse variations",
        "ta": "நேர் மற்றும் எதிர் மாறுபாடுகளின் வரைபடங்கள்"
      },
      "rule": {
        "en": "Direct variation: y = kx (y/x = k, line through origin); Inverse variation: xy = k (curve)",
        "ta": "நேர் மாறுபாடு: y = kx (நேர்க்கோடு); எதிர் மாறுபாடு: xy = k (செவ்வக அதிபரவளையம்)"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Direct: }y&=kx\\;\\left(\\dfrac{y}{x}=k\\right)\\\\\\text{Inverse: }xy&=k\\;\\left(y=\\dfrac{k}{x}\\right)\\quad(k>0)\\end{aligned}",
        "fallback": "Direct: y = kx (y/x = k); Inverse: xy = k (k > 0)"
      },
      "visual": { "kind": "ch3-lab", "id": "variations" },
      "idea": {
        "en": "Two quantities x and y stand in direct variation when scaling x scales y by the same factor, keeping the ratio y/x = k constant (a straight line through (0, 0)). They stand in inverse variation when doubling x halves y, keeping the product xy = k constant (a smooth curve approaching both axes).",
        "ta": "x அதிகரிக்கும்போது y-உம் அதே விகிதத்தில் அதிகரித்தால் (y/x = k மாறிலி, ஆதிப்புள்ளி வழியே செல்லும் நேர்க்கோடு) அது நேர் மாறுபாடு. x இருமடங்காகும்போது y பாதியாகக் குறைந்தால் (பெருக்கற்பலன் xy = k மாறிலி, வளைவரை) அது எதிர் மாறுபாடு."
      },
      "example": {
        "en": "In direct variation y = 2x, x = 1, 2, 3, 4 gives y = 2, 4, 6, 8 with y/x = 2 at every point. In inverse variation xy = 12, x = 1, 2, 3, 4 gives y = 12, 6, 4, 3 with x × y = 12 at every point.",
        "ta": "y = 2x நேர் மாறுபாட்டில் y/x = 2 எப்போதும் மாறாது. xy = 12 எதிர் மாறுபாட்டில் x = 1, 2, 3, 4 எனில் y = 12, 6, 4, 3 ஆகக் குறைந்து x × y = 12 எப்போதும் சமமாக இருக்கும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}&\\text{Direct }(y=2x):\\quad\\dfrac{2}{1}=\\dfrac{4}{2}=\\dfrac{6}{3}=2\\\\&\\text{Inverse }(xy=12):\\\\&1\\times 12=2\\times 6=3\\times 4=12\\end{aligned}",
        "fallback": "Direct: 2/1 = 4/2 = 6/3 = 2; Inverse: 1×12 = 2×6 = 3×4 = 12"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "How to recognize the type from a table quickly: compute y/x for two columns — if equal, it is direct (y = kx). Otherwise compute x·y — if equal, it is inverse (xy = k).",
            "Here k is the constant of proportionality (for real-world quantities in Grade 10 graphs, k > 0, x > 0, y > 0).",
            "Watch out for non-proportional linear lines like y = 2x + 3: both x and y rise together, yet y/x is NOT constant and it misses (0, 0), so it is not direct variation."
          ],
          "ta": [
            "அட்டவணையிலிருந்து உடனடியாகக் கண்டறிய: முதலில் y/x விகிதம் சமமா எனப் பாருங்கள் (நேர் மாறுபாடு); இல்லையெனில் x·y பெருக்கற்பலன் சமமா எனப் பாருங்கள் (எதிர் மாறுபாடு).",
            "இங்கு k என்பது விகிதசம மாறிலி (k > 0).",
            "y = 2x + 3 போன்ற கோடுகளில் x, y இரண்டும் கூடினாலும் (0, 0) வழியே செல்லாததால் அது நேர் மாறுபாடு அல்ல."
          ]
        }
      },
      "question": {
        "en": "Four identical pumps fill a water tank in 6 hours. At the same rate, how many hours will 3 pumps take?",
        "ta": "ஒரே திறனுடைய 4 குழாய்கள் ஒரு தொட்டியை 6 மணி நேரத்தில் நிரப்பும் எனில், 3 குழாய்கள் அதே தொட்டியை எத்தனை மணி நேரத்தில் நிரப்பும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&x=4,\\;y=6\\quad(xy=k)\\\\&x=3\\implies y=\\;?\\end{aligned}",
        "fallback": "4 × 6 = 3 × y ⇒ y = ?"
      },
      "choices": [
        { "en": "8 hours", "ta": "8 மணி நேரம்" },
        { "en": "4.5 hours", "ta": "4.5 மணி நேரம்" },
        { "en": "7 hours", "ta": "7 மணி நேரம்" }
      ],
      "correct": 0,
      "hint": {
        "en": "Fewer pumps need MORE time to do the same work, so the product (pumps × hours) stays constant.",
        "ta": "குழாய்களின் எண்ணிக்கை குறையும்போது நேரம் அதிகரிக்கும்; எனவே (குழாய்கள் × நேரம்) என்ற பெருக்கல் மாறாது."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "4.5 hours assumes direct variation (fewer pumps taking less time!), which is backwards for filling a tank.",
          "ta": "குறைவான குழாய்கள் குறைந்த நேரத்தில் நிரப்பாது! இது நேர் மாறுபாடு அல்ல, எதிர் மாறுபாடு."
        },
        {
          "en": "Inverse variation keeps the product xy = 4 × 6 = 24 constant, not the sum x + y.",
          "ta": "இங்கு x + y கூடுதல் மாறிலியல்ல; xy = 4 × 6 = 24 என்ற பெருக்கற்பலன் தான் மாறிலி."
        }
      ],
      "why": {
        "en": "Pumps (x) and time (y) vary inversely: k = xy = 4 × 6 = 24 pump-hours. For 3 pumps, y = 24 ÷ 3 = 8 hours.",
        "ta": "இது எதிர் மாறுபாடு என்பதால் xy = 4 × 6 = 24. ஆகவே 3 குழாய்களுக்கு நேரம் y = 24 ÷ 3 = 8 மணி நேரம்."
      },
      "whyMath": {
        "latex": "\\begin{aligned}xy&=4\\times 6=24\\\\3y&=24\\implies y=\\dfrac{24}{3}=8\\text{ hours}\\end{aligned}",
        "fallback": "xy = 24 ⇒ 3y = 24 ⇒ y = 8 hours"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-quad-graphs",
      "section": "3.8",
      "relatedExercise": "3.16",
      "title": {
        "en": "Quadratic graphs: parabolas & solving by intersection",
        "ta": "இருபடிச் சமன்பாடுகளின் வரைபடங்கள்: பரவளையம் & வெட்டுக் கோடுகள்"
      },
      "rule": {
        "en": "Graph y = ax² + bx + c (parabola) and intersect with the line obtained by subtraction",
        "ta": "பரவளையத்தையும் சமன்பாடுகளைக் கழித்துக் கிடைக்கும் நேர்க்கோட்டையும் வெட்டச் செய்து x-மதிப்புகளைப் படியுங்கள்"
      },
      "math": {
        "latex": "\\begin{aligned}y&=x^2\\quad\\text{and}\\quad x^2-x-2=0\\\\\\text{Line: }y&=x^2-(x^2-x-2)=x+2\\end{aligned}",
        "fallback": "Intersect y = x² with y = x + 2; the x-coordinates of intersection give the roots"
      },
      "visual": { "kind": "ch3-lab", "id": "quad-graphs" },
      "idea": {
        "en": "The graph of y = ax² + bx + c is a U-shaped curve called a parabola (opening upward if a > 0, downward if a < 0; larger |a| makes it narrower). To solve a second quadratic equation using a parabola you already drew, subtract the target equation from your parabola's y-equation to find a straight line y = mx + c, then read the x-coordinates where the line crosses the parabola.",
        "ta": "y = ax² + bx + c-இன் வரைபடம் 'பரவளையம்' எனும் வளைவரையாகும் (a > 0 மேல்நோக்கியும், a < 0 கீழ்நோக்கியும் திறந்திருக்கும்). ஒரு பரவளையத்தைப் பயன்படுத்தி மற்றொரு இருபடிச் சமன்பாட்டைத் தீர்க்க, பரவளையச் சமன்பாட்டிலிருந்து தீர்க்க வேண்டிய சமன்பாட்டைக் கழித்தால் கிடைக்கும் நேர்க்கோட்டை வரைந்து, அவை வெட்டும் புள்ளிகளின் x-அச்சுத் தொலைவுகளைத் தீர்வாக எழுத வேண்டும்."
      },
      "example": {
        "en": "To solve x² − x − 2 = 0 from the graph of y = x², subtract: y = x² − (x² − x − 2) = x + 2. The line y = x + 2 cuts the parabola y = x² at (−1, 1) and (2, 4). Dropping perpendiculars down to the x-axis reads the roots x = −1 and x = 2 (never the y-values 1 and 4!).",
        "ta": "y = x² வரைபடத்திலிருந்து x² − x − 2 = 0-ஐத் தீர்க்கக் கழிக்கவும்: y = x + 2. இக்கோடு பரவளையத்தை (−1, 1) மற்றும் (2, 4) புள்ளிகளில் வெட்டும். வெட்டுப் புள்ளிகளின் x-மதிப்புகளான −1 மற்றும் 2 ஆகியவையே தீர்வுகள் (y-மதிப்புகளான 1, 4 அல்ல!)."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}y&=x^2\\;\\cap\\;(y=x+2)\\\\&\\text{at }(-1,1)\\text{ and }(2,4)\\\\&\\implies x=-1,\\;2\\end{aligned}",
        "fallback": "Intersections (−1, 1) and (2, 4) ⇒ roots x = −1, 2"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why do the x-coordinates of intersection solve the new equation? At any point (x, y) on BOTH y = P(x) and y = P(x) − Q(x), setting the y's equal forces P(x) = P(x) − Q(x), which simplifies straight to Q(x) = 0!",
            "Why read ONLY the x-coordinates? Because the equation ax² + bx + c = 0 contains only one variable, x. The y-axis is just a helper axis used to draw the curves.",
            "No intersection between line and parabola means the target equation has no real roots; touching at one single point means real and equal roots."
          ],
          "ta": [
            "வெட்டுப் புள்ளிகளின் x-ஆயத்தொலைவுகள் ஏன் தீர்வாகின்றன? இரு வரைபடங்களிலும் y சமம் என்பதால் P(x) = P(x) − Q(x) ஆகி Q(x) = 0 கிடைக்கிறது.",
            "ஏன் x-மதிப்புகளை மட்டும் எழுதுகிறோம்? கொடுக்கப்பட்ட சமன்பாட்டில் x என்ற ஒரே மாறி மட்டுமே உள்ளது; y-அச்சு வரைவதற்கான துணை அச்சு மட்டுமே.",
            "கோடும் பரவளையமும் வெட்டவில்லை எனில் மெய் மூலங்கள் இல்லை; ஒரே புள்ளியில் தொட்டால் மெய் மற்றும் சம மூலங்கள் கிடைக்கும்."
          ]
        }
      },
      "question": {
        "en": "You already drew the parabola y = x². Which straight line must you draw to solve x² − 5x + 6 = 0?",
        "ta": "y = x² என்ற பரவளையத்தை வரைந்த பின், x² − 5x + 6 = 0 என்பதைத் தீர்க்க எந்த நேர்க்கோட்டை வரைய வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}y&=x^2\\\\0&=x^2-5x+6\\end{aligned}\\;\\xrightarrow{\\text{subtract}}\\;y=\\;?",
        "fallback": "Subtract 0 = x² − 5x + 6 from y = x² ⇒ y = ?"
      },
      "choices": [
        { "en": "y = −5x + 6", "ta": "y = −5x + 6", "math": { "latex": "y=-5x+6", "fallback": "y = −5x + 6" } },
        { "en": "y = 5x + 6", "ta": "y = 5x + 6", "math": { "latex": "y=5x+6", "fallback": "y = 5x + 6" } },
        { "en": "y = 5x − 6", "ta": "y = 5x − 6", "math": { "latex": "y=5x-6", "fallback": "y = 5x − 6" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Subtract the entire expression (x² − 5x + 6) from x², flipping every sign inside the brackets.",
        "ta": "x²-இலிருந்து (x² − 5x + 6) முழுவதையும் கழிக்கும்போது அடைப்புக்குறிக்குள் உள்ள ஒவ்வொரு குறியையும் மாற்றவும்."
      },
      "incorrectFeedback": [
        {
          "en": "Here you didn't subtract x² − 5x + 6 from x²; remember y = x² − (x² − 5x + 6) flips −5x to +5x and +6 to −6.",
          "ta": "x²-இலிருந்து x² − 5x + 6-ஐக் கழிக்க மறந்துவிட்டீர்கள்: கழிக்கும்போது −5x என்பது +5x ஆகவும் +6 என்பது −6 ஆகவும் மாறும்."
        },
        {
          "en": "Check the constant sign: subtracting +6 gives −6, not +6.",
          "ta": "மாறிலியின் குறியைச் சரிபாருங்கள்: −(+6) = −6."
        },
        null
      ],
      "why": {
        "en": "Subtracting 0 = x² − 5x + 6 from y = x² gives y = x² − x² + 5x − 6 = 5x − 6. Intersecting y = x² and y = 5x − 6 gives roots x = 2 and x = 3.",
        "ta": "y = x² சமன்பாட்டிலிருந்து x² − 5x + 6 = 0-ஐக் கழிக்க y = 5x − 6 கிடைக்கும். இவை x = 2 மற்றும் x = 3-இல் வெட்டும்."
      },
      "whyMath": {
        "latex": "y=x^2-(x^2-5x+6)=5x-6",
        "fallback": "y = x² − (x² − 5x + 6) = 5x − 6"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-matrix-types",
      "section": "3.9.1–3.9.2",
      "relatedExercise": "3.17",
      "title": {
        "en": "Order, elements, types & transpose of a matrix",
        "ta": "அணியின் வரிசை, உறுப்புகள், வகைகள் மற்றும் நிரை நிரல் மாற்று அணி"
      },
      "rule": {
        "en": "Order m × n means m rows by n columns; element aᵢⱼ is in row i, column j; Aᵀ swaps rows and columns",
        "ta": "வரிசை m × n என்பது m நிரைகள் × n நிரல்கள்; aᵢⱼ என்பது i-ஆவது நிரை, j-ஆவது நிரல் உறுப்பு; Aᵀ நிரை நிரலை மாற்றும்"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Order}&=\\text{rows}\\times\\text{cols}=m\\times n\\\\A\\;(m\\times n)&\\xrightarrow{\\text{transpose}}A^T\\;(n\\times m)\\end{aligned}",
        "fallback": "Order = rows × columns = m × n; transpose Aᵀ has order n × m"
      },
      "visual": { "kind": "ch3-lab", "id": "matrix-types" },
      "idea": {
        "en": "A matrix is a rectangular array of numbers arranged in horizontal rows and vertical columns. Always state rows first and columns second: m × n (read 'm by n' or 'm cross n'), and entry aᵢⱼ lives in row i, column j. Transposing A (written Aᵀ) turns every row into a column.",
        "ta": "அணி என்பது எண்களைக் கிடைமட்ட நிரைகளிலும் செங்குத்து நிரல்களிலும் அமைத்த செவ்வக அடுக்கு ஆகும். எப்போதும் முதலில் நிரைகள் (rows), இரண்டாவதாக நிரல்கள் (columns) என m × n வரிசையாக எழுத வேண்டும். aᵢⱼ என்பது i-ஆவது நிரை, j-ஆவது நிரலில் உள்ள உறுப்பு. Aᵀ என்பது நிரைகளை நிரல்களாக மாற்றிக் கிடைக்கும் அணி."
      },
      "example": {
        "en": "In the 2 × 3 matrix A with rows [4, 7, −1] and [2, 0, 5], entry a₁₂ = 7 (row 1, col 2) is completely different from a₂₁ = 2 (row 2, col 1). Its transpose Aᵀ becomes a 3 × 2 matrix. Textbook matrix types include row, column, square, diagonal, scalar, identity (Iₙ), zero (O), and upper/lower triangular matrices.",
        "ta": "2 × 3 அணி A-இல் முதல் நிரை [4, 7, −1] மற்றும் இரண்டாம் நிரை [2, 0, 5] எனில், a₁₂ = 7 ஆனால் a₂₁ = 2. இதன் நிரை நிரல் மாற்று அணி Aᵀ, 3 × 2 வரிசையைக் கொண்டிருக்கும்."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}A&=\\begin{pmatrix}4&7&-1\\\\2&0&5\\end{pmatrix}_{2\\times 3}\\\\A^T&=\\begin{pmatrix}4&2\\\\7&0\\\\-1&5\\end{pmatrix}_{3\\times 2}\\end{aligned}",
        "fallback": "A (2×3) has rows [4,7,−1] and [2,0,5]; Aᵀ (3×2) has columns [4,7,−1] and [2,0,5]"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "How diagonal, scalar, and identity matrices nest: Every identity matrix Iₙ (1s on main diagonal, 0s elsewhere) is a scalar matrix (all main-diagonal entries equal), and every scalar matrix is a diagonal matrix (all non-diagonal entries 0 in a square matrix)!",
            "What does equality A = B require? First, EXACT same order m × n; second, every corresponding entry aᵢⱼ = bᵢⱼ must be equal.",
            "Double transpose restores the original matrix: (Aᵀ)ᵀ = A."
          ],
          "ta": [
            "சிறப்பு சதுர அணிகளின் தொடர்பு: ஒவ்வொரு சமனி அணியும் (Iₙ — முதன்மை மூலைவிட்டத்தில் 1) ஒரு திசையிலி அணியாகும்; ஒவ்வொரு திசையிலி அணியும் (மூலைவிட்ட உறுப்புகள் சமம்) ஒரு மூலைவிட்ட அணியாகும்.",
            "இரு அணிகள் சமம் (A = B) எனில் அவற்றின் வரிசைகள் சமமாகவும், ஒத்த உறுப்புகள் அனைத்தும் சமமாகவும் இருக்க வேண்டும்.",
            "(Aᵀ)ᵀ = A என்பது எப்போதும் உண்மை."
          ]
        }
      },
      "question": {
        "en": "If matrix A has order 3 × 4, what is the order of its transpose Aᵀ?",
        "ta": "அணி A-இன் வரிசை 3 × 4 எனில், அதன் நிரை நிரல் மாற்று அணி Aᵀ-இன் வரிசை என்ன?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}A\\text{ has order }3\\times 4\\implies\\text{order }(A^T)=\\;?\\end{aligned}",
        "fallback": "Order of A = 3 × 4 ⇒ order of Aᵀ = ?"
      },
      "choices": [
        { "en": "3 × 4", "ta": "3 × 4", "math": { "latex": "3\\times 4", "fallback": "3 × 4" } },
        { "en": "4 × 3", "ta": "4 × 3", "math": { "latex": "4\\times 3", "fallback": "4 × 3" } },
        { "en": "12 × 1", "ta": "12 × 1", "math": { "latex": "12\\times 1", "fallback": "12 × 1" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Transposing turns each row into a column, so rows and columns exchange counts.",
        "ta": "நிரை நிரல் மாற்றத்தில் நிரைகளும் நிரல்களும் இடம் மாறும்."
      },
      "incorrectFeedback": [
        {
          "en": "3 × 4 is the original order of A; taking the transpose swaps the number of rows and columns.",
          "ta": "3 × 4 என்பது A-இன் வரிசை. Aᵀ-க்கு நிரை, நிரல் எண்ணிக்கைகளை மாற்ற வேண்டும்."
        },
        null,
        {
          "en": "Do not multiply 3 × 4 together — 12 is the total number of elements, not the row count of Aᵀ.",
          "ta": "3-ஐயும் 4-ஐயும் பெருக்கக் கூடாது; 12 என்பது மொத்த உறுப்புகளின் எண்ணிக்கை மட்டுமே."
        }
      ],
      "why": {
        "en": "Writing the 3 rows of length 4 as 3 columns of height 4 produces 4 rows and 3 columns, so the order of Aᵀ is 4 × 3.",
        "ta": "3 நிரைகள் × 4 நிரல்கள் கொண்ட A-இன் நிரைகளை நிரல்களாக எழுதினால், 4 நிரைகள் × 3 நிரல்கள் கிடைக்கும்; எனவே வரிசை 4 × 3."
      },
      "whyMath": {
        "latex": "A_{3\\times 4}\\xrightarrow{\\text{transpose}}(A^T)_{4\\times 3}",
        "fallback": "Order(A) = 3 × 4 ⇒ Order(Aᵀ) = 4 × 3"
      },
      "explainAfterAttempt": true
    },
    {
      "id": "g10-ch3-matrix-ops",
      "section": "3.9.3",
      "relatedExercise": "3.18–3.20",
      "title": {
        "en": "Operations on matrices (+, −, scalar & multiplication)",
        "ta": "அணிகளின் மீதான செயல்கள் (+, −, திசையிலி & அணிப் பெருக்கல்)"
      },
      "rule": {
        "en": "Add/subtract only with equal order; multiply A(m×n)·B(n×p) to get m×p (and AB ≠ BA in general)",
        "ta": "கூட்டல்/கழித்தலுக்கு சம வரிசை தேவை; A(m×n)·B(n×p) பெருக்கல் m×p தரும் (பொதுவாக AB ≠ BA)"
      },
      "math": {
        "latex": "\\begin{aligned}A_{m\\times n}\\cdot B_{n\\times p}&=(AB)_{m\\times p}\\\\AB&\\neq BA\\text{ in general}\\end{aligned}",
        "fallback": "A(m×n) · B(n×p) = (AB)(m×p); in general AB ≠ BA"
      },
      "visual": { "kind": "ch3-lab", "id": "matrix-ops" },
      "idea": {
        "en": "Adding, subtracting, or scalar-multiplying matrices works element by element and requires identical order. Matrix multiplication AB is completely different: it is defined ONLY when columns of A equal rows of B, multiplying each row of A across each column of B.",
        "ta": "அணிகளைக் கூட்டவோ கழிக்கவோ ஒரே வரிசை இருக்க வேண்டும் (ஒத்த உறுப்புகளைக் கூட்ட/கழிக்கவும்). ஆனால் அணிப் பெருக்கல் AB சாத்தியமாக, A-இன் நிரல்களின் எண்ணிக்கையும் B-இன் நிரைகளின் எண்ணிக்கையும் சமமாக இருக்க வேண்டும்; A-இன் நிரையை B-இன் நிரலால் பெருக்கிக் கூட்ட வேண்டும்."
      },
      "example": {
        "en": "For 2 × 2 matrices A = [[1, 2], [3, 0]] and B = [[4, 1], [2, 5]], row 1 × col 2 of AB gives 1(1) + 2(5) = 11, yielding AB = [[8, 11], [12, 3]], whereas BA = [[7, 8], [17, 4]] — proving AB ≠ BA!",
        "ta": "2 × 2 அணிகள் A = [[1, 2], [3, 0]], B = [[4, 1], [2, 5]] எனில், AB = [[8, 11], [12, 3]] ஆனால் BA = [[7, 8], [17, 4]]. எனவே அணிப் பெருக்கல் பரிமாற்றுப் பண்பு உடையதல்ல (AB ≠ BA)."
      },
      "exampleMath": {
        "latex": "\\begin{aligned}AB=\\begin{pmatrix}8&11\\\\12&3\\end{pmatrix}\\neq\\begin{pmatrix}7&8\\\\17&4\\end{pmatrix}=BA\\end{aligned}",
        "fallback": "AB = [[8, 11], [12, 3]] ≠ [[7, 8], [17, 4]] = BA"
      },
      "deepDive": {
        "title": { "en": "Understand the idea", "ta": "கருத்தை ஆழமாகப் புரிந்துகொள்ளுங்கள்" },
        "points": {
          "en": [
            "Why doesn't matrix multiplication work element-by-element? Matrices represent linear transformations (e.g. rotations, systems of equations, computer graphics projections); multiplying AB composes two transformations one after the other.",
            "Important matrix surprises compared to ordinary numbers: (1) AB ≠ BA in general; (2) AB = O does NOT force A = O or B = O! Try multiplying [[1, 0], [0, 0]] by [[0, 0], [2, 0]] — you get the zero matrix from two non-zero matrices.",
            "Check matrix distributivity and transpose reversal: A(B + C) = AB + AC and (A + B)C = AC + BC always hold whenever sizes match, and transposing a product reverses the order: (AB)ᵀ = BᵀAᵀ (for (p×n)·(n×q)ᵀ = (q×p))."
          ],
          "ta": [
            "அணிப் பெருக்கல் ஏன் உறுப்புக்கு உறுப்பு அல்ல? அணிகள் நேரியல் உருமாற்றங்களையும் சமன்பாட்டுத் தொகுப்புகளையும் குறிப்பதால், நிரை × நிரல் பெருக்கல் இரு செயல்பாடுகளை இணைக்கிறது.",
            "சாதாரண எண்களிலிருந்து மாறுபட்ட இரு பண்புகள்: (1) பொதுவாக AB ≠ BA; (2) A ≠ O, B ≠ O ஆக இருந்தாலும் AB = O வரலாம்!",
            "பங்கீட்டுப் பண்பும் நிரை நிரல் மாற்றின் பெருக்கல் விதியும்: A(B + C) = AB + AC, (A + B)C = AC + BC, மற்றும் (AB)ᵀ = BᵀAᵀ (பெருக்கலில் வரிசை தலைகீழாகும்)."
          ]
        }
      },
      "question": {
        "en": "Matrix P has order 2 × 3 and matrix Q has order 3 × 4. What is the order of the product matrix PQ?",
        "ta": "அணி P-இன் வரிசை 2 × 3 மற்றும் அணி Q-இன் வரிசை 3 × 4 எனில், பெருக்கல் அணி PQ-இன் வரிசை என்ன?"
      },
      "questionMath": {
        "latex": "P_{2\\times 3}\\cdot Q_{3\\times 4}\\implies\\text{order }(PQ)=\\;?",
        "fallback": "P(2×3) · Q(3×4) ⇒ order of PQ = ?"
      },
      "choices": [
        { "en": "2 × 4", "ta": "2 × 4", "math": { "latex": "2\\times 4", "fallback": "2 × 4" } },
        { "en": "3 × 3", "ta": "3 × 3", "math": { "latex": "3\\times 3", "fallback": "3 × 3" } },
        { "en": "Product PQ is not defined", "ta": "PQ பெருக்கல் வரையறுக்கப்படாது" }
      ],
      "correct": 0,
      "hint": {
        "en": "Check whether the inner dimensions match (3 = 3), then read the outer dimensions.",
        "ta": "உள் பரிமாணங்கள் (3 = 3) சமமா எனப் பார்த்து, வெளிப் பரிமாணங்களைப் படியுங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "The shared inner number 3 only checks compatibility — the outer dimensions (2 rows from P, 4 columns from Q) give the size of PQ.",
          "ta": "உள்ளே உள்ள 3 பெருக்க முடியுமா எனச் சரிபார்க்க மட்டுமே; வெளி எண்களான 2 மற்றும் 4 தான் PQ-இன் வரிசையைத் தரும்."
        },
        {
          "en": "PQ IS defined because columns of P (3) equals rows of Q (3). Only P + Q (addition) would be undefined here.",
          "ta": "P-இன் நிரல் எண்ணிக்கையும் (3) Q-இன் நிரை எண்ணிக்கையும் (3) சமம் என்பதால் PQ வரையறுக்கப்படுகிறது (P + Q மட்டுமே இயலாது)."
        }
      ],
      "why": {
        "en": "Since P is 2 × 3 and Q is 3 × 4, the inner numbers match (3 = 3), so PQ is defined with the outer order 2 × 4.",
        "ta": "உள் பரிமாணங்கள் 3 = 3 சமம் என்பதால் பெருக்கல் சாத்தியம்; வெளிப் பரிமாணங்களான 2 × 4 என்பது PQ-இன் வரிசையாகும்."
      },
      "whyMath": {
        "latex": "(2\\times\\mathbf{3})\\cdot(\\mathbf{3}\\times 4)\\implies 2\\times 4",
        "fallback": "(2 × 3) · (3 × 4) ⇒ 2 × 4"
      },
      "explainAfterAttempt": true
    }
  ]
};
})();
