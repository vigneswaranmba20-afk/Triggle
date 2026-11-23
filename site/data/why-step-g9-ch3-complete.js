/* Bilingual Why-step hints for Grade 9 Chapter 3 Exercises 3.3–3.15 (170 items). */
(() => {
  'use strict';
  const db = window.TriggleWhyStepG9;
  if (!db || !db.hints) return;
  const additions = {
  "g9-ch3-ex3.3-q1": {
    "step": 0,
    "expected": "Set g(x) = 0 to find the zero of the divisor x − 2.",
    "en": "Set g(x) = 0 to find the zero of the divisor x − 2. (Check if p(x) is a multiple of g(x): No, p(x) is not a multiple of g(x) (remainder = −7))",
    "ta": "வகுத்தி g(x) = 0 என வைத்து பூச்சியம் காண்க. (p(x) என்பது g(x)-இன் மடங்கா எனச் சரிபார்த்தல்: இல்லை, p(x) என்பது g(x)-இன் மடங்கல்ல (மீதி = −7))"
  },
  "g9-ch3-ex3.3-q2-i": {
    "step": 0,
    "expected": "Find the zero of g(x) = x + 1.",
    "en": "Find the zero of g(x) = x + 1. (Find remainder when p(x) is divided by x + 1: Remainder = 0)",
    "ta": "g(x) = x + 1-இன் பூச்சியம் காண்க. (மீதி காண்க: p(x) ÷ (x + 1): மீதி = 0)"
  },
  "g9-ch3-ex3.3-q2-ii": {
    "step": 0,
    "expected": "Find the zero of g(x) = 2x − 1.",
    "en": "Find the zero of g(x) = 2x − 1. (Find remainder when p(x) is divided by 2x − 1: Remainder = 3/2)",
    "ta": "g(x) = 2x − 1-இன் பூச்சியம் காண்க. (மீதி காண்க: p(x) ÷ (2x − 1): மீதி = 3/2)"
  },
  "g9-ch3-ex3.3-q2-iii": {
    "step": 0,
    "expected": "Find the zero of g(x) = x − 3.",
    "en": "Find the zero of g(x) = x − 3. (Find remainder when p(x) is divided by x − 3: Remainder = 62)",
    "ta": "g(x) = x − 3-இன் பூச்சியம் காண்க. (மீதி காண்க: p(x) ÷ (x − 3): மீதி = 62)"
  },
  "g9-ch3-ex3.3-q3": {
    "step": 0,
    "expected": "Zero of (x + 3) is x = −3.",
    "en": "Zero of (x + 3) is x = −3. (Find remainder when 3x³ − 4x² + 7x − 5 is divided by (x + 3): Remainder = −143)",
    "ta": "(x + 3)-இன் பூச்சியம் x = −3. ((x + 3)-ஆல் வகுக்கக் கிடைக்கும் மீதி: மீதி = −143)"
  },
  "g9-ch3-ex3.3-q4": {
    "step": 0,
    "expected": "Zero of (x − 1) is x = 1.",
    "en": "Zero of (x − 1) is x = 1. (Find remainder when x²⁰¹⁸ + 2018 is divided by (x − 1): Remainder = 2019)",
    "ta": "(x − 1)-இன் பூச்சியம் x = 1. (x²⁰¹⁸ + 2018-ஐ (x − 1)-ஆல் வகுக்கக் கிடைக்கும் மீதி: மீதி = 2019)"
  },
  "g9-ch3-ex3.3-q5": {
    "step": 0,
    "expected": "Since (x − 2) divides p(x) exactly, remainder p(2) = 0.",
    "en": "Since (x − 2) divides p(x) exactly, remainder p(2) = 0. (Find k when p(x) is divisible by (x − 2): k = 8)",
    "ta": "(x − 2) மீதியின்றி வகுப்பதால் p(2) = 0. ((x − 2)-ஆல் மீதியின்றி வகுத்தால் k மதிப்பு காண்க: k = 8)"
  },
  "g9-ch3-ex3.3-q6": {
    "step": 0,
    "expected": "Find remainder of first polynomial at x = 3.",
    "en": "Find remainder of first polynomial at x = 3. (Equal remainders when divided by (x − 3): a = −3; remainder = 27)",
    "ta": "முதல் கோவைக்கு x = 3-இல் மீதி காண்க. (சம மீதிகள் எனில் a மற்றும் மீதி காண்க: a = −3; மீதி = 27)"
  },
  "g9-ch3-ex3.3-q7-i": {
    "step": 0,
    "expected": "By Factor Theorem, check p(1).",
    "en": "By Factor Theorem, check p(1). (Check if (x − 1) is a factor of x³ + 5x² − 10x + 4: Yes, (x − 1) is a factor)",
    "ta": "காரணித் தேற்றப்படி p(1) காண்க. ((x − 1) காரணியா எனச் சரிபார்க்க: ஆம், (x − 1) ஒரு காரணி)"
  },
  "g9-ch3-ex3.3-q7-ii": {
    "step": 0,
    "expected": "Evaluate p(1).",
    "en": "Evaluate p(1). (Check if (x − 1) is a factor of x⁴ + 5x² − 5x + 1: No, (x − 1) is not a factor)",
    "ta": "p(1) மதிப்பைக் காண்க. ((x − 1) காரணியா எனச் சரிபார்க்க: இல்லை, (x − 1) காரணி அல்ல)"
  },
  "g9-ch3-ex3.3-q8": {
    "step": 0,
    "expected": "Evaluate p(5) for divisor (x − 5).",
    "en": "Evaluate p(5) for divisor (x − 5). (Show that (x − 5) is a factor of 2x³ − 5x² − 28x + 15: (x − 5) is a factor (since p(5) = 0))",
    "ta": "x = 5 எனப் பிரதியிட்டு p(5) காண்க. ((x − 5) ஒரு காரணி எனக் காட்டுக: (x − 5) ஒரு காரணி (p(5) = 0))"
  },
  "g9-ch3-ex3.3-q9": {
    "step": 0,
    "expected": "By Factor Theorem, p(−3) = 0.",
    "en": "By Factor Theorem, p(−3) = 0. (Determine m if (x + 3) is a factor: m = 10)",
    "ta": "காரணித் தேற்றப்படி p(−3) = 0. ((x + 3) காரணி எனில் m மதிப்பு காண்க: m = 10)"
  },
  "g9-ch3-ex3.3-q10": {
    "step": 0,
    "expected": "Use factor (x − 2).",
    "en": "Use factor (x − 2). (Show that a = b when (x − 2) and (x − 1/2) are factors: a = b (and a = b = −2))",
    "ta": "(x − 2) காரணி என்பதால் p(2) = 0. (a = b என நிறுவுக: a = b என நிரூபிக்கப்பட்டது (a = b = −2))"
  },
  "g9-ch3-ex3.3-q11": {
    "step": 0,
    "expected": "Zero remainder means p(1) = 0.",
    "en": "Zero remainder means p(1) = 0. (Find k when (x − 1) divides kx³ − 2x² + 25x − 26: k = 3)",
    "ta": "மீதியின்றி வகுப்பதால் p(1) = 0. ((x − 1) மீதியின்றி வகுத்தால் k காண்க: k = 3)"
  },
  "g9-ch3-ex3.3-q12": {
    "step": 0,
    "expected": "Check if (x + 2) is a factor.",
    "en": "Check if (x + 2) is a factor. (Check if (x + 2) and (x − 4) are sides of rectangle: Yes, (x + 2) and (x − 4) are the sides (for x > 4))",
    "ta": "(x + 2) காரணியா எனச் சரிபார்க்க. (செவ்வகத்தின் பக்கங்களா எனச் சரிபார்க்க: ஆம், (x + 2) மற்றும் (x − 4) பக்கங்கள் ஆகும் (x > 4))"
  },
  "g9-ch3-ex3.4-q1-i": {
    "step": 0,
    "expected": "Use the trinomial square identity with a = x, b = 2y, c = 3z.",
    "en": "Use the trinomial square identity with a = x, b = 2y, c = 3z. (Expand (x + 2y + 3z)²: x² + 4y² + 9z² + 4xy + 12yz + 6xz)",
    "ta": "a = x, b = 2y, c = 3z என முற்றொருமையைப் பயன்படுத்த. (விரிவாக்குக: (x + 2y + 3z)²: x² + 4y² + 9z² + 4xy + 12yz + 6xz)"
  },
  "g9-ch3-ex3.4-q1-ii": {
    "step": 0,
    "expected": "Apply (a + b + c)² keeping the minus sign on −p.",
    "en": "Apply (a + b + c)² keeping the minus sign on −p. (Expand (−p + 2q + 3r)²: p² + 4q² + 9r² − 4pq + 12qr − 6pr)",
    "ta": "a = −p, b = 2q, c = 3r எனப் பிரதியிட. (விரிவாக்குக: (−p + 2q + 3r)²: p² + 4q² + 9r² − 4pq + 12qr − 6pr)"
  },
  "g9-ch3-ex3.4-q1-iii": {
    "step": 0,
    "expected": "Use x = 2p, a = 3, b = −4, c = −5.",
    "en": "Use x = 2p, a = 3, b = −4, c = −5. (Expand (2p + 3)(2p − 4)(2p − 5): 8p³ − 24p² − 14p + 60)",
    "ta": "x = 2p, a = 3, b = −4, c = −5 எனப் பிரதியிட. (விரிவாக்குக: (2p + 3)(2p − 4)(2p − 5): 8p³ − 24p² − 14p + 60)"
  },
  "g9-ch3-ex3.4-q1-iv": {
    "step": 0,
    "expected": "Apply (x+a₁)(x+b₁)(x+c₁).",
    "en": "Apply (x+a₁)(x+b₁)(x+c₁). (Expand (3a + 1)(3a − 2)(3a + 4): 27a³ + 27a² − 18a − 8)",
    "ta": "x = 3a, a₁=1, b₁=−2, c₁=4 எனப் பிரதியிட. (விரிவாக்குக: (3a + 1)(3a − 2)(3a + 4): 27a³ + 27a² − 18a − 8)"
  },
  "g9-ch3-ex3.4-q2-i": {
    "step": 0,
    "expected": "Sum of constants gives x² coefficient.",
    "en": "Sum of constants gives x² coefficient. (Coefficients of (x + 5)(x + 6)(x + 7) without expansion: x² coeff: 18; x coeff: 107; constant: 210)",
    "ta": "a + b + c என்பது x²-இன் கெழு. (விரிவாக்காமல் கெழுக்கள் காண்க: (x+5)(x+6)(x+7): x² கெழு: 18; x கெழு: 107; மாறிலி: 210)"
  },
  "g9-ch3-ex3.4-q2-ii": {
    "step": 0,
    "expected": "Identify a = 3, b = −5, c = −6.",
    "en": "Identify a = 3, b = −5, c = −6. (Coefficients of (2x + 3)(2x − 5)(2x − 6) without expansion: x² coeff: −32; x coeff: −6; constant: 90)",
    "ta": "u = 2x என்க; a=3, b=−5, c=−6. (விரிவாக்காமல் கெழுக்கள் காண்க: (2x+3)(2x−5)(2x−6): x² கெழு: −32; x கெழு: −6; மாறிலி: 90)"
  },
  "g9-ch3-ex3.4-q3-i": {
    "step": 0,
    "expected": "Compare coefficients of x².",
    "en": "Compare coefficients of x². (Find a + b + c: 14)",
    "ta": "x²-இன் கெழுவை ஒப்பிட. (a + b + c மதிப்பு காண்க: 14)"
  },
  "g9-ch3-ex3.4-q3-ii": {
    "step": 0,
    "expected": "Read x coefficient and constant term.",
    "en": "Read x coefficient and constant term. (Find 1/a + 1/b + 1/c: 59/70)",
    "ta": "ab + bc + ca = 59 மற்றும் abc = 70. (1/a + 1/b + 1/c மதிப்பு காண்க: 59/70)"
  },
  "g9-ch3-ex3.4-q3-iii": {
    "step": 0,
    "expected": "Use the trinomial square identity.",
    "en": "Use the trinomial square identity. (Find a² + b² + c²: 78)",
    "ta": "முற்றொருமையைப் பயன்படுத்த. (a² + b² + c² மதிப்பு காண்க: 78)"
  },
  "g9-ch3-ex3.4-q3-iv": {
    "step": 0,
    "expected": "Take common denominator abc.",
    "en": "Take common denominator abc. (Find a/(bc) + b/(ac) + c/(ab): 39/35)",
    "ta": "பொதுப் பகுதி abc எடுக்க. (a/(bc) + b/(ac) + c/(ab) மதிப்பு காண்க: 39/35)"
  },
  "g9-ch3-ex3.4-q4-i": {
    "step": 0,
    "expected": "Use x = 3a, y = 4b.",
    "en": "Use x = 3a, y = 4b. (Expand (3a − 4b)³: 27a³ − 108a²b + 144ab² − 64b³)",
    "ta": "x = 3a, y = 4b எனப் பிரதியிட. (விரிவுபடுத்துக: (3a − 4b)³: 27a³ − 108a²b + 144ab² − 64b³)"
  },
  "g9-ch3-ex3.4-q4-ii": {
    "step": 0,
    "expected": "Use a = x, b = 1/y (y ≠ 0).",
    "en": "Use a = x, b = 1/y (y ≠ 0). (Expand (x + 1/y)³: x³ + 3x²/y + 3x/y² + 1/y³)",
    "ta": "a = x, b = 1/y எனப் பிரதியிட (y ≠ 0). (விரிவுபடுத்துக: (x + 1/y)³: x³ + 3x²/y + 3x/y² + 1/y³)"
  },
  "g9-ch3-ex3.4-q5-i": {
    "step": 0,
    "expected": "Rewrite 98 as 100 − 2.",
    "en": "Rewrite 98 as 100 − 2. (Evaluate 98³ using identity: 941192)",
    "ta": "98 = 100 − 2 என எழுதுக. (முற்றொருமை மூலம் 98³ காண்க: 941192)"
  },
  "g9-ch3-ex3.4-q5-ii": {
    "step": 0,
    "expected": "Rewrite 1001 as 1000 + 1.",
    "en": "Rewrite 1001 as 1000 + 1. (Evaluate 1001³ using identity: 1003003001)",
    "ta": "1001 = 1000 + 1 என எழுதுக. (முற்றொருமை மூலம் 1001³ காண்க: 1003003001)"
  },
  "g9-ch3-ex3.4-q6": {
    "step": 0,
    "expected": "Use the trinomial square identity.",
    "en": "Use the trinomial square identity. (Find x² + y² + z²: 29)",
    "ta": "முற்றொருமையைப் பயன்படுத்த. (x² + y² + z² மதிப்பு காண்க: 29)"
  },
  "g9-ch3-ex3.4-q7": {
    "step": 0,
    "expected": "Use x³ + y³ = (x + y)³ − 3xy(x + y).",
    "en": "Use x³ + y³ = (x + y)³ − 3xy(x + y). (Find 27a³ + 64b³: 280)",
    "ta": "x³ + y³ = (x + y)³ − 3xy(x + y) முற்றொருமையைப் பயன்படுத்த. (27a³ + 64b³ மதிப்பு காண்க: 280)"
  },
  "g9-ch3-ex3.4-q8": {
    "step": 0,
    "expected": "Use cube difference identity.",
    "en": "Use cube difference identity. (Find x³ − y³: 335)",
    "ta": "x³ − y³ = (x − y)³ + 3xy(x − y) முற்றொருமையைப் பயன்படுத்த. (x³ − y³ மதிப்பு காண்க: 335)"
  },
  "g9-ch3-ex3.4-q9": {
    "step": 0,
    "expected": "Apply cube identity with x = a, y = 1/a.",
    "en": "Apply cube identity with x = a, y = 1/a. (Find a³ + 1/a³: 198)",
    "ta": "முற்றொருமையைப் பயன்படுத்த. (a³ + 1/a³ மதிப்பு காண்க: 198)"
  },
  "g9-ch3-ex3.4-q10": {
    "step": 0,
    "expected": "Square (x + 1/x).",
    "en": "Square (x + 1/x). (Find x + 1/x and x³ + 1/x³: x + 1/x = ±5; x³ + 1/x³ = ±110)",
    "ta": "(x + 1/x)² = 23 + 2 = 25. (x + 1/x மற்றும் x³ + 1/x³ காண்க: x + 1/x = ±5; x³ + 1/x³ = ±110)"
  },
  "g9-ch3-ex3.4-q11": {
    "step": 0,
    "expected": "Take cube root of both sides.",
    "en": "Take cube root of both sides. (Find y³ − 1/y³: 36)",
    "ta": "கனமூலம் எடுக்க y − 1/y = 3. (y³ − 1/y³ மதிப்பு காண்க: 36)"
  },
  "g9-ch3-ex3.4-q12-i": {
    "step": 0,
    "expected": "Identify x = 2a, y = 3b, z = 4c.",
    "en": "Identify x = 2a, y = 3b, z = 4c. (Simplify (2a+3b+4c)(4a²+9b²+16c²−6ab−12bc−8ca): 8a³ + 27b³ + 64c³ − 72abc)",
    "ta": "x = 2a, y = 3b, z = 4c என்க. (சுருக்குக: (2a+3b+4c)(...): 8a³ + 27b³ + 64c³ − 72abc)"
  },
  "g9-ch3-ex3.4-q12-ii": {
    "step": 0,
    "expected": "Apply (a+b+c)(a²+b²+c²−ab−bc−ca) = a³+b³+c³−3abc.",
    "en": "Apply (a+b+c)(a²+b²+c²−ab−bc−ca) = a³+b³+c³−3abc. (Simplify (x−2y+3z)(x²+4y²+9z²+2xy+6yz−3xz): x³ − 8y³ + 27z³ + 18xyz)",
    "ta": "a = x, b = −2y, c = 3z என்க. (சுருக்குக: (x−2y+3z)(...): x³ − 8y³ + 27z³ + 18xyz)"
  },
  "g9-ch3-ex3.4-q13-i": {
    "step": 0,
    "expected": "Check the sum a + b + c.",
    "en": "Check the sum a + b + c. (Evaluate 7³ − 10³ + 3³ using identity: −630)",
    "ta": "a + b + c = 7 − 10 + 3 = 0. (முற்றொருமை மூலம் 7³ − 10³ + 3³ காண்க: −630)"
  },
  "g9-ch3-ex3.4-q13-ii": {
    "step": 0,
    "expected": "Write as cubes: a=1, b=1/2, c=−3/2.",
    "en": "Write as cubes: a=1, b=1/2, c=−3/2. (Evaluate 1 + 1/8 − 27/8 using identity: −9/4)",
    "ta": "கனங்களாக எழுத: a=1, b=1/2, c=−3/2; கூடுதல் 0. (முற்றொருமை மூலம் 1 + 1/8 − 27/8 காண்க: −9/4)"
  },
  "g9-ch3-ex3.4-q14": {
    "step": 0,
    "expected": "Rewrite 8x³ − 27y³ − 64z³ as a³ + b³ + c³.",
    "en": "Rewrite 8x³ − 27y³ − 64z³ as a³ + b³ + c³. (Find 8x³ − 27y³ − 64z³ when 2x − 3y − 4z = 0: 72xyz)",
    "ta": "a = 2x, b = −3y, c = −4z; கூடுதல் 0. (2x − 3y − 4z = 0 எனில் 8x³ − 27y³ − 64z³ காண்க: 72xyz)"
  },
  "g9-ch3-ex3.5-q1-i": {
    "step": 0,
    "expected": "Identify the GCD of all three terms.",
    "en": "Identify the GCD of all three terms. (Factorise 2a² + 4a²b + 8a²c: 2a²(1 + 2b + 4c))",
    "ta": "மூன்று உறுப்புகளின் பொதுக் காரணி 2a². (காரணிப்படுத்துக: 2a² + 4a²b + 8a²c: 2a²(1 + 2b + 4c))"
  },
  "g9-ch3-ex3.5-q1-ii": {
    "step": 0,
    "expected": "Group in pairs and take common factors.",
    "en": "Group in pairs and take common factors. (Factorise ab − ac − mb + mc: (a − m)(b − c))",
    "ta": "ஈரிணையாகப் பிரித்து பொதுக் காரணி எடுக்க. (காரணிப்படுத்துக: ab − ac − mb + mc: (a − m)(b − c))"
  },
  "g9-ch3-ex3.5-q2-i": {
    "step": 0,
    "expected": "Match with a² + 2ab + b².",
    "en": "Match with a² + 2ab + b². (Factorise x² + 4x + 4: (x + 2)²)",
    "ta": "a² + 2ab + b² வடிவில் எழுத. (காரணிப்படுத்துக: x² + 4x + 4: (x + 2)²)"
  },
  "g9-ch3-ex3.5-q2-ii": {
    "step": 0,
    "expected": "Take common factor 3 out first.",
    "en": "Take common factor 3 out first. (Factorise 3a² − 24ab + 48b²: 3(a − 4b)²)",
    "ta": "முதலில் 3-ஐப் பொதுவாக எடுக்க. (காரணிப்படுத்துக: 3a² − 24ab + 48b²: 3(a − 4b)²)"
  },
  "g9-ch3-ex3.5-q2-iii": {
    "step": 0,
    "expected": "Factor out x and use difference of squares.",
    "en": "Factor out x and use difference of squares. (Factorise x⁵ − 16x: x(x² + 4)(x + 2)(x − 2))",
    "ta": "x-ஐ வெளியே எடுத்து a² − b² பயன்படுத்த. (காரணிப்படுத்துக: x⁵ − 16x: x(x² + 4)(x + 2)(x − 2))"
  },
  "g9-ch3-ex3.5-q2-iv": {
    "step": 0,
    "expected": "Rewrite −23 as +2 − 25 to complete the square.",
    "en": "Rewrite −23 as +2 − 25 to complete the square. (Factorise m² + 1/m² − 23: (m + 1/m + 5)(m + 1/m − 5))",
    "ta": "−23 என்பதை +2 − 25 என எழுத. (காரணிப்படுத்துக: m² + 1/m² − 23: (m + 1/m + 5)(m + 1/m − 5))"
  },
  "g9-ch3-ex3.5-q2-v": {
    "step": 0,
    "expected": "Take 6 common and apply difference of squares.",
    "en": "Take 6 common and apply difference of squares. (Factorise 6 − 216x²: 6(1 + 6x)(1 − 6x))",
    "ta": "6-ஐ வெளியே எடுத்து a² − b² பயன்படுத்த. (காரணிப்படுத்துக: 6 − 216x²: 6(1 + 6x)(1 − 6x))"
  },
  "g9-ch3-ex3.5-q2-vi": {
    "step": 0,
    "expected": "Rewrite −18 as −2 − 16.",
    "en": "Rewrite −18 as −2 − 16. (Factorise a² + 1/a² − 18: (a − 1/a + 4)(a − 1/a − 4))",
    "ta": "−18 என்பதை −2 − 16 என எழுத. (காரணிப்படுத்துக: a² + 1/a² − 18: (a − 1/a + 4)(a − 1/a − 4))"
  },
  "g9-ch3-ex3.5-q3-i": {
    "step": 0,
    "expected": "Match with (a + b + c)².",
    "en": "Match with (a + b + c)². (Factorise 4x² + 9y² + 25z² + 12xy + 30yz + 20xz: (2x + 3y + 5z)²)",
    "ta": "(a + b + c)² வடிவில் எழுத. (காரணிப்படுத்துக: 4x²+9y²+25z²+12xy+30yz+20xz: (2x + 3y + 5z)²)"
  },
  "g9-ch3-ex3.5-q3-ii": {
    "step": 0,
    "expected": "So 2y and 3z share the same sign, opposite to 5x.",
    "en": "So 2y and 3z share the same sign, opposite to 5x. (Factorise 25x² + 4y² + 9z² − 20xy + 12yz − 30xz: (−5x + 2y + 3z)² or (5x − 2y − 3z)²)",
    "ta": "12yz மிகை; xy, xz குறை என்பதால் 5x மட்டும் எதிர் குறி. (காரணிப்படுத்துக: 25x²+4y²+9z²−20xy+12yz−30xz: (5x − 2y − 3z)²)"
  },
  "g9-ch3-ex3.5-q4-i": {
    "step": 0,
    "expected": "Write as sum of cubes a³ + b³.",
    "en": "Write as sum of cubes a³ + b³. (Factorise 8x³ + 125y³: (2x + 5y)(4x² − 10xy + 25y²))",
    "ta": "(2x)³ + (5y)³ என எழுதுக. (காரணிப்படுத்துக: 8x³ + 125y³: (2x + 5y)(4x² − 10xy + 25y²))"
  },
  "g9-ch3-ex3.5-q4-ii": {
    "step": 0,
    "expected": "Write as difference of cubes.",
    "en": "Write as difference of cubes. (Factorise 27x³ − 8y³: (3x − 2y)(9x² + 6xy + 4y²))",
    "ta": "(3x)³ − (2y)³ என எழுதுக. (காரணிப்படுத்துக: 27x³ − 8y³: (3x − 2y)(9x² + 6xy + 4y²))"
  },
  "g9-ch3-ex3.5-q4-iii": {
    "step": 0,
    "expected": "Factor first as difference of squares.",
    "en": "Factor first as difference of squares. (Factorise a⁶ − 64: (a + 2)(a − 2)(a² − 2a + 4)(a² + 2a + 4))",
    "ta": "முதலில் a² − b² மூலம் பிரிக்க. (காரணிப்படுத்துக: a⁶ − 64: (a + 2)(a − 2)(a² − 2a + 4)(a² + 2a + 4))"
  },
  "g9-ch3-ex3.5-q5-i": {
    "step": 0,
    "expected": "Match with a³ + b³ + c³ − 3abc where a=x, b=2y, c=−1.",
    "en": "Match with a³ + b³ + c³ − 3abc where a=x, b=2y, c=−1. (Factorise x³ + 8y³ + 6xy − 1: (x + 2y − 1)(x² + 4y² + 1 − 2xy + 2y + x))",
    "ta": "a=x, b=2y, c=−1 எனக் கொள்க. (காரணிப்படுத்துக: x³ + 8y³ + 6xy − 1: (x + 2y − 1)(x² + 4y² + 1 − 2xy + 2y + x))"
  },
  "g9-ch3-ex3.5-q5-ii": {
    "step": 0,
    "expected": "Identify a = l, b = −2m, c = −3n.",
    "en": "Identify a = l, b = −2m, c = −3n. (Factorise l³ − 8m³ − 27n³ − 18lmn: (l − 2m − 3n)(l² + 4m² + 9n² + 2lm − 6mn + 3nl))",
    "ta": "a = l, b = −2m, c = −3n என்க. (காரணிப்படுத்துக: l³ − 8m³ − 27n³ − 18lmn: (l − 2m − 3n)(l² + 4m² + 9n² + 2lm − 6mn + 3nl))"
  },
  "g9-ch3-ex3.6-q1-i": {
    "step": 0,
    "expected": "Split 10x = 4x + 6x.",
    "en": "Split 10x = 4x + 6x. (Factorise x² + 10x + 24: (x + 4)(x + 6))",
    "ta": "கூடுதல் 10, பெருக்கல் 24 தரும் எண்கள் 4, 6. (காரணிப்படுத்துக: x² + 10x + 24: (x + 4)(x + 6))"
  },
  "g9-ch3-ex3.6-q1-ii": {
    "step": 0,
    "expected": "Split 4z = 6z − 2z.",
    "en": "Split 4z = 6z − 2z. (Factorise z² + 4z − 12: (z + 6)(z − 2))",
    "ta": "கூடுதல் 4, பெருக்கல் −12 தரும் எண்கள் 6, −2. (காரணிப்படுத்துக: z² + 4z − 12: (z + 6)(z − 2))"
  },
  "g9-ch3-ex3.6-q1-iii": {
    "step": 0,
    "expected": "Split −6p = −8p + 2p.",
    "en": "Split −6p = −8p + 2p. (Factorise p² − 6p − 16: (p − 8)(p + 2))",
    "ta": "கூடுதல் −6, பெருக்கல் −16 ⇒ −8, 2. (காரணிப்படுத்துக: p² − 6p − 16: (p − 8)(p + 2))"
  },
  "g9-ch3-ex3.6-q1-iv": {
    "step": 0,
    "expected": "Write in standard form first.",
    "en": "Write in standard form first. (Factorise t² + 72 − 17t: (t − 8)(t − 9))",
    "ta": "திட்ட வடிவில் எழுத t² − 17t + 72. (காரணிப்படுத்துக: t² + 72 − 17t: (t − 8)(t − 9))"
  },
  "g9-ch3-ex3.6-q1-v": {
    "step": 0,
    "expected": "Split −16y = −20y + 4y.",
    "en": "Split −16y = −20y + 4y. (Factorise y² − 16y − 80: (y − 20)(y + 4))",
    "ta": "கூடுதல் −16, பெருக்கல் −80 ⇒ −20, 4. (காரணிப்படுத்துக: y² − 16y − 80: (y − 20)(y + 4))"
  },
  "g9-ch3-ex3.6-q1-vi": {
    "step": 0,
    "expected": "Split 10a = 30a − 20a.",
    "en": "Split 10a = 30a − 20a. (Factorise a² + 10a − 600: (a + 30)(a − 20))",
    "ta": "கூடுதல் 10, பெருக்கல் −600 ⇒ 30, −20. (காரணிப்படுத்துக: a² + 10a − 600: (a + 30)(a − 20))"
  },
  "g9-ch3-ex3.6-q2-i": {
    "step": 0,
    "expected": "Split 9a = 4a + 5a.",
    "en": "Split 9a = 4a + 5a. (Factorise 2a² + 9a + 10: (a + 2)(2a + 5))",
    "ta": "ac = 20, b = 9 ⇒ 4, 5. (காரணிப்படுத்துக: 2a² + 9a + 10: (a + 2)(2a + 5))"
  },
  "g9-ch3-ex3.6-q2-ii": {
    "step": 0,
    "expected": "Split −29xy = −35xy + 6xy.",
    "en": "Split −29xy = −35xy + 6xy. (Factorise 5x² − 29xy − 42y²: (x − 7y)(5x + 6y))",
    "ta": "ac = −210, b = −29 ⇒ −35, 6. (காரணிப்படுத்துக: 5x² − 29xy − 42y²: (x − 7y)(5x + 6y))"
  },
  "g9-ch3-ex3.6-q2-iii": {
    "step": 0,
    "expected": "Write in standard form.",
    "en": "Write in standard form. (Factorise 9 − 18x + 8x²: (2x − 3)(4x − 3))",
    "ta": "திட்ட வடிவில் எழுதுக: 8x² − 18x + 9. (காரணிப்படுத்துக: 9 − 18x + 8x²: (2x − 3)(4x − 3))"
  },
  "g9-ch3-ex3.6-q2-iv": {
    "step": 0,
    "expected": "Take common factor 2 out first.",
    "en": "Take common factor 2 out first. (Factorise 6x² + 16xy + 8y²: 2(3x + 2y)(x + 2y))",
    "ta": "முதலில் 2-ஐப் பொதுவாக எடுக்க. (காரணிப்படுத்துக: 6x² + 16xy + 8y²: 2(3x + 2y)(x + 2y))"
  },
  "g9-ch3-ex3.6-q2-v": {
    "step": 0,
    "expected": "Take common factor 3x² out first.",
    "en": "Take common factor 3x² out first. (Factorise 12x² + 36x²y + 27y²x²: 3x²(2 + 3y)²)",
    "ta": "பொதுக் காரணி 3x²-ஐ வெளியே எடுக்க. (காரணிப்படுத்துக: 12x² + 36x²y + 27y²x²: 3x²(2 + 3y)²)"
  },
  "g9-ch3-ex3.6-q2-vi": {
    "step": 0,
    "expected": "Substitute u = a + b.",
    "en": "Substitute u = a + b. (Factorise (a + b)² + 9(a + b) + 18: (a + b + 3)(a + b + 6))",
    "ta": "u = a + b எனக் கொள்க. (காரணிப்படுத்துக: (a + b)² + 9(a + b) + 18: (a + b + 3)(a + b + 6))"
  },
  "g9-ch3-ex3.6-q3-i": {
    "step": 0,
    "expected": "Substitute u = p − q.",
    "en": "Substitute u = p − q. (Factorise (p − q)² − 6(p − q) − 16: (p − q − 8)(p − q + 2))",
    "ta": "u = p − q எனக் கொள்க. (காரணிப்படுத்துக: (p − q)² − 6(p − q) − 16: (p − q − 8)(p − q + 2))"
  },
  "g9-ch3-ex3.6-q3-ii": {
    "step": 0,
    "expected": "Split 2mn = 6mn − 4mn.",
    "en": "Split 2mn = 6mn − 4mn. (Factorise m² + 2mn − 24n²: (m + 6n)(m − 4n))",
    "ta": "கூடுதல் 2, பெருக்கல் −24 ⇒ 6, −4. (காரணிப்படுத்துக: m² + 2mn − 24n²: (m + 6n)(m − 4n))"
  },
  "g9-ch3-ex3.6-q3-iii": {
    "step": 0,
    "expected": "Split 2a = 5a − 3a.",
    "en": "Split 2a = 5a − 3a. (Factorise √5 a² + 2a − 3√5: (a + √5)(√5 a − 3))",
    "ta": "ac = −15, b = 2 ⇒ 5, −3. (காரணிப்படுத்துக: √5 a² + 2a − 3√5: (a + √5)(√5 a − 3))"
  },
  "g9-ch3-ex3.6-q3-iv": {
    "step": 0,
    "expected": "Factor in terms of a².",
    "en": "Factor in terms of a². (Factorise a⁴ − 3a² + 2: (a + 1)(a − 1)(a² − 2))",
    "ta": "u = a² எனக் கொண்டு காரணிப்படுத்த. (காரணிப்படுத்துக: a⁴ − 3a² + 2: (a + 1)(a − 1)(a² − 2))"
  },
  "g9-ch3-ex3.6-q3-v": {
    "step": 0,
    "expected": "Take m common; ac = −120, b = −2 ⇒ −12, 10.",
    "en": "Take m common; ac = −120, b = −2 ⇒ −12, 10. (Factorise 8m³ − 2m²n − 15mn²: m(4m + 5n)(2m − 3n))",
    "ta": "m பொதுக் காரணி; ac = −120, b = −2 ⇒ −12, 10. (காரணிப்படுத்துக: 8m³ − 2m²n − 15mn²: m(4m + 5n)(2m − 3n))"
  },
  "g9-ch3-ex3.6-q3-vi": {
    "step": 0,
    "expected": "Recognize a² + 2ab + b² with x, y ≠ 0.",
    "en": "Recognize a² + 2ab + b² with x, y ≠ 0. (Factorise 1/x² + 1/y² + 2/(xy): (1/x + 1/y)²)",
    "ta": "a = 1/x, b = 1/y எனக் கொள்க (x, y ≠ 0). (காரணிப்படுத்துக: 1/x² + 1/y² + 2/(xy): (1/x + 1/y)²)"
  },
  "g9-ch3-ex3.7-q1-i": {
    "step": 0,
    "expected": "Set up synthetic division with x = −3.",
    "en": "Set up synthetic division with x = −3. (Divide (4x³ + 6x² − 23x + 18) by (x + 3): Quotient: 4x² − 6x − 5; Remainder: 33)",
    "ta": "x = −3 கொண்டு தொகுமுறை வகுத்தல் அமைக்க. ((4x³ + 6x² − 23x + 18) ÷ (x + 3): ஈவு: 4x² − 6x − 5; மீதி: 33)"
  },
  "g9-ch3-ex3.7-q1-ii": {
    "step": 0,
    "expected": "Use y = 1/2 in synthetic division.",
    "en": "Use y = 1/2 in synthetic division. (Divide (8y³ − 16y² + 16y − 15) by (2y − 1): Quotient: 4y² − 6y + 5; Remainder: −10)",
    "ta": "y = 1/2 கொண்டு தொகுமுறை வகுத்தல் செய்க. ((8y³ − 16y² + 16y − 15) ÷ (2y − 1): ஈவு: 4y² − 6y + 5; மீதி: −10)"
  },
  "g9-ch3-ex3.7-q1-iii": {
    "step": 0,
    "expected": "Factor using a³ − b³ or use synthetic division with [8, 0, 0, −1] at x = 1/2.",
    "en": "Factor using a³ − b³ or use synthetic division with [8, 0, 0, −1] at x = 1/2. (Divide (8x³ − 1) by (2x − 1): Quotient: 4x² + 2x + 1; Remainder: 0)",
    "ta": "a³ − b³ முற்றொருமை அல்லது தொகுமுறை வகுத்தல் மூலம். ((8x³ − 1) ÷ (2x − 1): ஈவு: 4x² + 2x + 1; மீதி: 0)"
  },
  "g9-ch3-ex3.7-q1-iv": {
    "step": 0,
    "expected": "Order terms in descending powers first.",
    "en": "Order terms in descending powers first. (Divide (−18z + 14z² + 24z³ + 18) by (3z + 4): Quotient: 8z² − 6z + 2; Remainder: 10)",
    "ta": "திட்ட வடிவில் எழுதி z = −4/3 என்க. ((−18z + 14z² + 24z³ + 18) ÷ (3z + 4): ஈவு: 8z² − 6z + 2; மீதி: 10)"
  },
  "g9-ch3-ex3.7-q2": {
    "step": 0,
    "expected": "Factorise the area.",
    "en": "Factorise the area. (Length of rectangle given area and breadth: x + 4)",
    "ta": "பரப்பைக் காரணிப்படுத்தவும். (செவ்வகத்தின் நீளம் காண்க: x + 4)"
  },
  "g9-ch3-ex3.7-q3": {
    "step": 0,
    "expected": "Factorise using difference of squares.",
    "en": "Factorise using difference of squares. (Height of parallelogram given area and base: 5x − 4)",
    "ta": "a² − b² மூலம் காரணிப்படுத்தவும். (இணைகரத்தின் உயரம் காண்க: 5x − 4)"
  },
  "g9-ch3-ex3.7-q4": {
    "step": 0,
    "expected": "Factorise using a³ + b³.",
    "en": "Factorise using a³ + b³. (Mean of (x + 5) observations with sum (x³ + 125): x² − 5x + 25)",
    "ta": "a³ + b³ முற்றொருமை மூலம் காரணிப்படுத்தவும். (விவரங்களின் சராசரி காண்க: x² − 5x + 25)"
  },
  "g9-ch3-ex3.7-q5-i": {
    "step": 0,
    "expected": "Set up synthetic division with x = 3.",
    "en": "Set up synthetic division with x = 3. (Synthetic division: (x³ + x² − 7x − 3) ÷ (x − 3): Quotient: x² + 4x + 5; Remainder: 12)",
    "ta": "x = 3 கொண்டு தொகுமுறை வகுத்தல் அமைக்க. (தொகுமுறை வகுத்தல்: (x³ + x² − 7x − 3) ÷ (x − 3): ஈவு: x² + 4x + 5; மீதி: 12)"
  },
  "g9-ch3-ex3.7-q5-ii": {
    "step": 0,
    "expected": "Set up synthetic division with x = −2.",
    "en": "Set up synthetic division with x = −2. (Synthetic division: (x³ + 2x² − x − 4) ÷ (x + 2): Quotient: x² − 1; Remainder: −2)",
    "ta": "x = −2 கொண்டு தொகுமுறை வகுத்தல் அமைக்க. (தொகுமுறை வகுத்தல்: (x³ + 2x² − x − 4) ÷ (x + 2): ஈவு: x² − 1; மீதி: −2)"
  },
  "g9-ch3-ex3.7-q5-iii": {
    "step": 0,
    "expected": "Insert 0 for missing x³ term.",
    "en": "Insert 0 for missing x³ term. (Synthetic division: (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1): Quotient: 2x³ − (1/2)x² − (3/8)x + 51/32; Remainder: 109/32)",
    "ta": "x³ உறுப்பு இல்லாததால் 0 சேர்க்க: [8, 0, −2, 6, 5]. (தொகுமுறை வகுத்தல்: (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1): ஈவு: 2x³ − (1/2)x² − (3/8)x + 51/32; மீதி: 109/32)"
  },
  "g9-ch3-ex3.7-q6": {
    "step": 0,
    "expected": "Include 0 for missing x³.",
    "en": "Include 0 for missing x³. (Find p, q and remainder on dividing 8x⁴ − 2x² + 6x − 7 by (2x + 1): p = −2, q = 0; Remainder = −10)",
    "ta": "கெழுக்கள் 8, 0, −2, 6, −7; x = −1/2. (p, q மற்றும் மீதி காண்க: p = −2, q = 0; மீதி = −10)"
  },
  "g9-ch3-ex3.7-q7": {
    "step": 0,
    "expected": "Run synthetic division with x = 3.",
    "en": "Run synthetic division with x = 3. (Find a, b and remainder on dividing 3x³ + 11x² + 34x + 106 by (x − 3): a = 20, b = 94; Remainder = 388)",
    "ta": "x = 3 கொண்டு தொகுமுறை வகுத்தல் செய்க. (a, b மற்றும் மீதி காண்க: a = 20, b = 94; மீதி = 388)"
  },
  "g9-ch3-ex3.8-q1-i": {
    "step": 1,
    "expected": "Divide [1, −3, −10, 24] by 2 → [1, −1, −12].",
    "en": "Divide [1, −3, −10, 24] by 2 → [1, −1, −12]. (Factorise x³ − 3x² − 10x + 24: (x − 2)(x − 4)(x + 3))",
    "ta": "தொகுமுறை வகுத்தலால் ஈவு x² − x − 12. (காரணிப்படுத்துக: x³ − 3x² − 10x + 24: (x − 2)(x − 4)(x + 3))"
  },
  "g9-ch3-ex3.8-q1-ii": {
    "step": 0,
    "expected": "Sum of even-power coeffs = −3 + 2 = −1; odd-power = 2 − 3 = −1.",
    "en": "Sum of even-power coeffs = −3 + 2 = −1; odd-power = 2 − 3 = −1. (Factorise 2x³ − 3x² − 3x + 2: (x + 1)(x − 2)(2x − 1))",
    "ta": "p(−1) = 0 என்பதால் (x + 1) ஒரு காரணி. (காரணிப்படுத்துக: 2x³ − 3x² − 3x + 2: (x + 1)(x − 2)(2x − 1))"
  },
  "g9-ch3-ex3.8-q1-iii": {
    "step": 0,
    "expected": "So (x − 1) is a factor.",
    "en": "So (x − 1) is a factor. (Factorise −7x + 3 + 4x³: (x − 1)(2x − 1)(2x + 3))",
    "ta": "கெழுக்களின் கூடுதல் 0 என்பதால் (x − 1) காரணி. (காரணிப்படுத்துக: −7x + 3 + 4x³: (x − 1)(2x − 1)(2x + 3))"
  },
  "g9-ch3-ex3.8-q1-iv": {
    "step": 1,
    "expected": "Factorise the quadratic quotient.",
    "en": "Factorise the quadratic quotient. (Factorise x³ + x² − 14x − 24: (x + 2)(x + 3)(x − 4))",
    "ta": "ஈவு x² − x − 12 = (x − 4)(x + 3). (காரணிப்படுத்துக: x³ + x² − 14x − 24: (x + 2)(x + 3)(x − 4))"
  },
  "g9-ch3-ex3.8-q1-v": {
    "step": 0,
    "expected": "Standard form x³ + 0x² − 7x + 6.",
    "en": "Standard form x³ + 0x² − 7x + 6. (Factorise x³ − 7x + 6: (x − 1)(x − 2)(x + 3))",
    "ta": "x³ + 0x² − 7x + 6; கெழுக்களின் கூடுதல் 0. (காரணிப்படுத்துக: x³ − 7x + 6: (x − 1)(x − 2)(x + 3))"
  },
  "g9-ch3-ex3.8-q1-vi": {
    "step": 0,
    "expected": "Sum of coefficients is 0.",
    "en": "Sum of coefficients is 0. (Factorise x³ − 10x² − x + 10: (x − 1)(x + 1)(x − 10))",
    "ta": "கெழுக்களின் கூடுதல் 0 என்பதால் (x − 1) காரணி. (காரணிப்படுத்துக: x³ − 10x² − x + 10: (x − 1)(x + 1)(x − 10))"
  },
  "g9-ch3-ex3.9-q1-i": {
    "step": 0,
    "expected": "GCD takes the lowest common power.",
    "en": "GCD takes the lowest common power. (GCD of p⁵, p¹¹, p⁹: p⁵)",
    "ta": "பொது அடிமானம் p; மிகக் குறைந்த அடுக்கு 5. (மீ.பொ.வ காண்க: p⁵, p¹¹, p⁹: p⁵)"
  },
  "g9-ch3-ex3.9-q1-ii": {
    "step": 0,
    "expected": "GCD(4, 1, 1) = 1 and x, y, z are distinct.",
    "en": "GCD(4, 1, 1) = 1 and x, y, z are distinct. (GCD of 4x³, y³, z³: 1)",
    "ta": "மூன்றிற்கும் பொதுக் காரணி இல்லை. (மீ.பொ.வ காண்க: 4x³, y³, z³: 1)"
  },
  "g9-ch3-ex3.9-q1-iii": {
    "step": 0,
    "expected": "Numerical GCD.",
    "en": "Numerical GCD. (GCD of 9a²b²c³, 15a³b²c⁴: 3a²b²c³)",
    "ta": "9 மற்றும் 15-இன் மீ.பொ.வ 3. (மீ.பொ.வ காண்க: 9a²b²c³, 15a³b²c⁴: 3a²b²c³)"
  },
  "g9-ch3-ex3.9-q1-iv": {
    "step": 0,
    "expected": "Find numerical GCD.",
    "en": "Find numerical GCD. (GCD of 64x⁸, 240x⁶: 16x⁶)",
    "ta": "64 மற்றும் 240-இன் மீ.பொ.வ 16. (மீ.பொ.வ காண்க: 64x⁸, 240x⁶: 16x⁶)"
  },
  "g9-ch3-ex3.9-q1-v": {
    "step": 0,
    "expected": "Take lowest exponent of each variable.",
    "en": "Take lowest exponent of each variable. (GCD of ab²c³, a²b³c, a³bc²: abc)",
    "ta": "a, b, c ஆகியவற்றின் குறைந்த அடுக்கு 1. (மீ.பொ.வ காண்க: ab²c³, a²b³c, a³bc²: abc)"
  },
  "g9-ch3-ex3.9-q1-vi": {
    "step": 0,
    "expected": "All three are multiples of 7.",
    "en": "All three are multiples of 7. (GCD of 35x⁵y³z⁴, 49x²yz³, 14xy²z²: 7xyz²)",
    "ta": "35, 49, 14-இன் மீ.பொ.வ 7. (மீ.பொ.வ காண்க: 35x⁵y³z⁴, 49x²yz³, 14xy²z²: 7xyz²)"
  },
  "g9-ch3-ex3.9-q1-vii": {
    "step": 0,
    "expected": "Numerical GCD is 25.",
    "en": "Numerical GCD is 25. (GCD of 25ab³c, 100a²bc, 125ab: 25ab)",
    "ta": "எண்களின் மீ.பொ.வ 25. (மீ.பொ.வ காண்க: 25ab³c, 100a²bc, 125ab: 25ab)"
  },
  "g9-ch3-ex3.9-q1-viii": {
    "step": 0,
    "expected": "No common factor other than 1.",
    "en": "No common factor other than 1. (GCD of 3abc, 5xyz, 7pqr: 1)",
    "ta": "பொதுக் காரணி 1 மட்டுமே. (மீ.பொ.வ காண்க: 3abc, 5xyz, 7pqr: 1)"
  },
  "g9-ch3-ex3.9-q2-i": {
    "step": 0,
    "expected": "They share no common factor other than 1.",
    "en": "They share no common factor other than 1. (GCD of (2x + 5), (5x + 2): 1)",
    "ta": "பொதுக் காரணி இல்லை. (மீ.பொ.வ காண்க: (2x + 5), (5x + 2): 1)"
  },
  "g9-ch3-ex3.9-q2-ii": {
    "step": 0,
    "expected": "Lowest power of a is m + 1.",
    "en": "Lowest power of a is m + 1. (GCD of aᵐ⁺¹, aᵐ⁺², aᵐ⁺³: aᵐ⁺¹)",
    "ta": "மிகக் குறைந்த அடுக்கு m + 1. (மீ.பொ.வ காண்க: aᵐ⁺¹, aᵐ⁺², aᵐ⁺³: aᵐ⁺¹)"
  },
  "g9-ch3-ex3.9-q2-iii": {
    "step": 0,
    "expected": "Factorise both polynomials.",
    "en": "Factorise both polynomials. (GCD of 2a² + a, 4a² − 1: 2a + 1)",
    "ta": "இரு கோவைகளையும் காரணிப்படுத்தவும். (மீ.பொ.வ காண்க: 2a² + a, 4a² − 1: 2a + 1)"
  },
  "g9-ch3-ex3.9-q2-iv": {
    "step": 0,
    "expected": "No common factor other than 1.",
    "en": "No common factor other than 1. (GCD of 3a², 5b³, 7c⁴: 1)",
    "ta": "பொதுக் காரணி 1 மட்டுமே. (மீ.பொ.வ காண்க: 3a², 5b³, 7c⁴: 1)"
  },
  "g9-ch3-ex3.9-q2-v": {
    "step": 0,
    "expected": "Factorise x⁴ − 1.",
    "en": "Factorise x⁴ − 1. (GCD of x⁴ − 1, x² − 1: x² − 1)",
    "ta": "x⁴ − 1 = (x² + 1)(x² − 1). (மீ.பொ.வ காண்க: x⁴ − 1, x² − 1: x² − 1)"
  },
  "g9-ch3-ex3.9-q2-vi": {
    "step": 0,
    "expected": "Factorise first expression.",
    "en": "Factorise first expression. (GCD of a³ − 9ax², (a − 3x)²: a − 3x)",
    "ta": "முதல் கோவையைக் காரணிப்படுத்தவும். (மீ.பொ.வ காண்க: a³ − 9ax², (a − 3x)²: a − 3x)"
  },
  "g9-ch3-ex3.10-q1-i": {
    "step": 0,
    "expected": "Compute at least three ordered pairs.",
    "en": "Compute at least three ordered pairs. (Draw the graph of y = 2x: Straight line through (−1, −2), (0, 0), (1, 2), (2, 4))",
    "ta": "x-க்கு மதிப்புகள் கொடுத்து y காண்க. (வரைபடம் வரைக: y = 2x: (−1, −2), (0, 0), (1, 2), (2, 4) வழியே செல்லும் நேர்க்கோடு)"
  },
  "g9-ch3-ex3.10-q1-ii": {
    "step": 0,
    "expected": "Evaluate y = 4x − 1 at x = 0, 1, 2.",
    "en": "Evaluate y = 4x − 1 at x = 0, 1, 2. (Draw the graph of y = 4x − 1: Straight line through (0, −1), (1, 3), (2, 7))",
    "ta": "x = 0, 1, 2 எனப் பிரதியிட. (வரைபடம் வரைக: y = 4x − 1: (0, −1), (1, 3), (2, 7) வழியே செல்லும் நேர்க்கோடு)"
  },
  "g9-ch3-ex3.10-q1-iii": {
    "step": 0,
    "expected": "Pick even x values to get integer y.",
    "en": "Pick even x values to get integer y. (Draw the graph of y = (3/2)x + 3: Straight line through (−2, 0), (0, 3), (2, 6))",
    "ta": "முழு எண் புள்ளிகள் பெற x = −2, 0, 2 எடுக்க. (வரைபடம் வரைக: y = (3/2)x + 3: (−2, 0), (0, 3), (2, 6) வழியே செல்லும் நேர்க்கோடு)"
  },
  "g9-ch3-ex3.10-q1-iv": {
    "step": 0,
    "expected": "Express y in terms of x.",
    "en": "Express y in terms of x. (Draw the graph of 3x + 2y = 14: Straight line through (0, 7), (2, 4), (4, 1))",
    "ta": "y = (14 − 3x)/2 என மாற்றிப் புள்ளிகள் காண்க. (வரைபடம் வரைக: 3x + 2y = 14: (0, 7), (2, 4), (4, 1) வழியே செல்லும் நேர்க்கோடு)"
  },
  "g9-ch3-ex3.10-q2-i": {
    "step": 0,
    "expected": "Tabulate points for line 1.",
    "en": "Tabulate points for line 1. (Solve graphically: x + y = 7; x − y = 3: (5, 2) i.e. x = 5, y = 2)",
    "ta": "முதல் கோட்டின் புள்ளிகள் காண்க. (வரைபட முறையில் தீர்க்க: x + y = 7; x − y = 3: (5, 2) அதாவது x = 5, y = 2)"
  },
  "g9-ch3-ex3.10-q2-ii": {
    "step": 0,
    "expected": "Both equations represent the exact same line through (0, 2) and (2, −1).",
    "en": "Both equations represent the exact same line through (0, 2) and (2, −1). (Solve graphically: 3x + 2y = 4; 9x + 6y − 12 = 0: Infinitely many solutions (coinciding lines))",
    "ta": "இரு சமன்பாடுகளும் ஒரே கோட்டைக் குறிக்கின்றன. (வரைபட முறையில் தீர்க்க: 3x + 2y = 4; 9x + 6y − 12 = 0: எண்ணற்ற தீர்வுகள் (ஒன்றிய கோடுகள்))"
  },
  "g9-ch3-ex3.10-q2-iii": {
    "step": 0,
    "expected": "Clear denominators by multiplying by 4.",
    "en": "Clear denominators by multiplying by 4. (Solve graphically: x/2 + y/4 = 1; x/2 + y/4 = 2: No solution (parallel lines))",
    "ta": "4-ஆல் பெருக்க 2x + y = 4 மற்றும் 2x + y = 8. (வரைபட முறையில் தீர்க்க: x/2 + y/4 = 1; x/2 + y/4 = 2: தீர்வு இல்லை (இணை கோடுகள்))"
  },
  "g9-ch3-ex3.10-q2-iv": {
    "step": 1,
    "expected": "Read intersection.",
    "en": "Read intersection. (Solve graphically: x − y = 0; y + 3 = 0: (−3, −3) i.e. x = −3, y = −3)",
    "ta": "வெட்டும் புள்ளி (−3, −3). (வரைபட முறையில் தீர்க்க: x − y = 0; y + 3 = 0: (−3, −3) அதாவது x = −3, y = −3)"
  },
  "g9-ch3-ex3.10-q2-v": {
    "step": 0,
    "expected": "Points for line 1.",
    "en": "Points for line 1. (Solve graphically: y = 2x + 1; y + 3x − 6 = 0: (1, 3) i.e. x = 1, y = 3)",
    "ta": "முதல் கோடு: (0, 1), (1, 3), (2, 5). (வரைபட முறையில் தீர்க்க: y = 2x + 1; y + 3x − 6 = 0: (1, 3) அதாவது x = 1, y = 3)"
  },
  "g9-ch3-ex3.10-q2-vi": {
    "step": 0,
    "expected": "They meet perpendicularly at (−3, 3).",
    "en": "They meet perpendicularly at (−3, 3). (Solve graphically: x = −3; y = 3: (−3, 3) i.e. x = −3, y = 3)",
    "ta": "x = −3 (குத்துக்கோடு), y = 3 (கிடைக்கோடு) வெட்டும் புள்ளி (−3, 3). (வரைபட முறையில் தீர்க்க: x = −3; y = 3: (−3, 3) அதாவது x = −3, y = 3)"
  },
  "g9-ch3-ex3.10-q3": {
    "step": 0,
    "expected": "Relative speed towards each other is x + y.",
    "en": "Relative speed towards each other is x + y. (Speed of two cars by graphical method: 75 miles/hr and 25 miles/hr)",
    "ta": "எதிர் திசை: x + y = 100. (இரு மகிழுந்துகளின் வேகங்கள் காண்க: மணிக்கு 75 மைல்கள் மற்றும் 25 மைல்கள்)"
  },
  "g9-ch3-ex3.11-q1-i": {
    "step": 0,
    "expected": "Express y from 5x + y = 9.",
    "en": "Express y from 5x + y = 9. (Solve by substitution: 2x − 3y = 7; 5x + y = 9: x = 2, y = −1)",
    "ta": "5x + y = 9-இலிருந்து y = 9 − 5x. (பிரதியிடல் முறையில் தீர்க்க: 2x−3y=7; 5x+y=9: x = 2, y = −1)"
  },
  "g9-ch3-ex3.11-q1-ii": {
    "step": 0,
    "expected": "Clear decimals.",
    "en": "Clear decimals. (Solve by substitution: 1.5x + 0.1y = 6.2; 3x − 0.4y = 11.2: x = 4, y = 2)",
    "ta": "10-ஆல் பெருக்க y = 62 − 15x. (பிரதியிடல் முறையில் தீர்க்க: 1.5x+0.1y=6.2; 3x−0.4y=11.2: x = 4, y = 2)"
  },
  "g9-ch3-ex3.11-q1-iii": {
    "step": 0,
    "expected": "Multiply first by 10; solve second for y.",
    "en": "Multiply first by 10; solve second for y. (Solve by substitution: 10% of x + 20% of y = 24; 3x − y = 20: x = 40, y = 100)",
    "ta": "முதல் சமன்பாட்டை 10-ஆல் பெருக்க x + 2y = 240; y = 3x − 20. (பிரதியிடல் முறையில் தீர்க்க: x-இன் 10%+y-இன் 20%=24; 3x−y=20: x = 40, y = 100)"
  },
  "g9-ch3-ex3.11-q1-iv": {
    "step": 0,
    "expected": "Express y from √3 x = √8 y.",
    "en": "Express y from √3 x = √8 y. (Solve by substitution: √2 x − √3 y = 1; √3 x − √8 y = 0: x = 2√2, y = √3)",
    "ta": "y = (√3 / √8)x. (பிரதியிடல் முறையில் தீர்க்க: √2 x − √3 y = 1; √3 x − √8 y = 0: x = 2√2, y = √3)"
  },
  "g9-ch3-ex3.11-q2": {
    "step": 0,
    "expected": "First condition.",
    "en": "First condition. (Find Raman’s age: 45 years)",
    "ta": "இராமனின் வயது x, இரு மகன்களின் வயதுக் கூடுதல் y என்க; x = 3y. (இராமனின் தற்போதைய வயது காண்க: 45 ஆண்டுகள்)"
  },
  "g9-ch3-ex3.11-q3": {
    "step": 0,
    "expected": "Let hundreds digit = x, units digit = y.",
    "en": "Let hundreds digit = x, units digit = y. (Find the three-digit number: 409)",
    "ta": "நூறாம் இலக்கம் x, ஒன்றாம் இலக்கம் y என்க. (மூன்றிலக்க எண் காண்க: 409)"
  },
  "g9-ch3-ex3.12-q1-i": {
    "step": 0,
    "expected": "Eliminate y by adding.",
    "en": "Eliminate y by adding. (Solve by elimination: 2x − y = 3; 3x + y = 7: x = 2, y = 1)",
    "ta": "இரு சமன்பாடுகளையும் கூட்ட y நீங்கும்: 5x = 10. (நீக்கல் முறையில் தீர்க்க: 2x−y=3; 3x+y=7: x = 2, y = 1)"
  },
  "g9-ch3-ex3.12-q1-ii": {
    "step": 0,
    "expected": "Eliminate y by scaling (1).",
    "en": "Eliminate y. (Solve by elimination: x − y = 5; 3x + 2y = 25: x = 7, y = 2)",
    "ta": "முதல் சமன்பாட்டை 2-ஆல் பெருக்கிக் கூட்ட 5x = 35 ⇒ x = 7. (நீக்கல் முறையில் தீர்க்க: x−y=5; 3x+2y=25: x = 7, y = 2)"
  },
  "g9-ch3-ex3.12-q1-iii": {
    "step": 0,
    "expected": "Clear fractions (×10 and ×24).",
    "en": "Clear fractions (×10 and ×24). (Solve by elimination: x/10 + y/5 = 14; x/8 + y/6 = 15: x = 80, y = 30)",
    "ta": "பின்னங்களை நீக்க x + 2y = 140; 3x + 4y = 360. (நீக்கல் முறையில் தீர்க்க: x/10 + y/5 = 14; x/8 + y/6 = 15: x = 80, y = 30)"
  },
  "g9-ch3-ex3.12-q1-iv": {
    "step": 0,
    "expected": "Put u = 1/x, v = 1/y: 3u + 6v = 7 and 9u + 3v = 11.",
    "en": "Put u = 1/x, v = 1/y: 3u + 6v = 7 and 9u + 3v = 11. (Solve by elimination: 3(2x + y) = 7xy; 3(x + 3y) = 11xy: (1, 3/2) and (0, 0))",
    "ta": "(0, 0) ஒரு தீர்வு. x, y ≠ 0 எனில் u = 1/x, v = 1/y என்க. (நீக்கல் முறையில் தீர்க்க: 3(2x+y)=7xy; 3(x+3y)=11xy: (1, 3/2) மற்றும் (0, 0))"
  },
  "g9-ch3-ex3.12-q1-v": {
    "step": 0,
    "expected": "Substitute u = 1/x.",
    "en": "Substitute u = 1/x. (Solve by elimination: 4/x + 5y = 7; 3/x + 4y = 5: x = 1/3, y = −1)",
    "ta": "u = 1/x (x ≠ 0) என்க. (நீக்கல் முறையில் தீர்க்க: 4/x + 5y = 7; 3/x + 4y = 5: x = 1/3, y = −1)"
  },
  "g9-ch3-ex3.12-q1-vi": {
    "step": 0,
    "expected": "Add and subtract the symmetric equations.",
    "en": "Add and subtract the symmetric equations. (Solve by elimination: 13x + 11y = 70; 11x + 13y = 74: x = 2, y = 4)",
    "ta": "கூட்ட x + y = 6; கழிக்க x − y = −2. (நீக்கல் முறையில் தீர்க்க: 13x+11y=70; 11x+13y=74: x = 2, y = 4)"
  },
  "g9-ch3-ex3.12-q2": {
    "step": 0,
    "expected": "Income − Expenditure = Savings.",
    "en": "Income − Expenditure = Savings. (Monthly income of A and B: A: ₹30,000; B: ₹40,000)",
    "ta": "வருமானம் − செலவு = சேமிப்பு. (A மற்றும் B-இன் மாத வருமானம் காண்க: A: ₹30,000; B: ₹40,000)"
  },
  "g9-ch3-ex3.12-q3": {
    "step": 0,
    "expected": "Set up equations from 5 years ago and 5 years hence.",
    "en": "Set up equations from 5 years ago and 5 years hence. (Present age of man and his son: Man: 75 years; Son: 15 years)",
    "ta": "x − 7y = −30; x − 4y = 15. (தந்தை மற்றும் மகனின் தற்போதைய வயது: தந்தை: 75 ஆண்டுகள்; மகன்: 15 ஆண்டுகள்)"
  },
  "g9-ch3-ex3.13-q1-i": {
    "step": 0,
    "expected": "Write in standard form a₁x + b₁y + c₁ = 0.",
    "en": "Write in standard form a₁x + b₁y + c₁ = 0. (Solve by cross-multiplication: 8x − 3y = 12; 5x = 2y + 7: x = 3, y = 4)",
    "ta": "திட்ட வடிவில் எழுத. (குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 8x−3y=12; 5x=2y+7: x = 3, y = 4)"
  },
  "g9-ch3-ex3.13-q1-ii": {
    "step": 0,
    "expected": "Standard form.",
    "en": "Standard form. (Solve by cross-multiplication: 6x + 7y − 11 = 0; 5x + 2y = 13: x = 3, y = −1)",
    "ta": "திட்ட வடிவம். (குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 6x+7y−11=0; 5x+2y=13: x = 3, y = −1)"
  },
  "g9-ch3-ex3.13-q1-iii": {
    "step": 0,
    "expected": "Substitute u, v.",
    "en": "Substitute u, v. (Solve by cross-multiplication: 2/x + 3/y = 5; 3/x − 1/y + 9 = 0: x = −1/2, y = 1/3)",
    "ta": "u = 1/x, v = 1/y என்க. (குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 2/x + 3/y = 5; 3/x − 1/y + 9 = 0: x = −1/2, y = 1/3)"
  },
  "g9-ch3-ex3.13-q2": {
    "step": 0,
    "expected": "Let ₹2 coins = x, ₹5 coins = y.",
    "en": "Let ₹2 coins = x, ₹5 coins = y. (Count ₹2 and ₹5 coins in Akshaya’s purse: 60 two-rupee coins and 20 five-rupee coins)",
    "ta": "₹2 நாணயங்கள் x, ₹5 நாணயங்கள் y என்க. (₹2 மற்றும் ₹5 நாணயங்களின் எண்ணிக்கை: 60 இரண்டு ரூபாய் நாணயங்கள் மற்றும் 20 ஐந்து ரூபாய் நாணயங்கள்)"
  },
  "g9-ch3-ex3.13-q3": {
    "step": 0,
    "expected": "Work rates per hour.",
    "en": "Work rates per hour. (Time for each pipe to fill a swimming pool: Larger pipe: 40 hours; Smaller pipe: 60 hours)",
    "ta": "u = 1/x, v = 1/y என்க. (குழாய்கள் நீச்சல் குளத்தை நிரப்பும் நேரம்: பெரிய குழாய்: 40 மணி நேரம்; சிறிய குழாய்: 60 மணி நேரம்)"
  },
  "g9-ch3-ex3.14-q1": {
    "step": 0,
    "expected": "First condition.",
    "en": "First condition. (Find the two-digit number: 64)",
    "ta": "முதல் நிபந்தனை: x + y = 10. (ஈரிலக்க எண் காண்க: 64)"
  },
  "g9-ch3-ex3.14-q2": {
    "step": 0,
    "expected": "Form two linear equations.",
    "en": "Form two linear equations. (Find the fraction: 5/7)",
    "ta": "x + y = 12 மற்றும் 2x − y = 3. (பின்னம் காண்க: 5/7)"
  },
  "g9-ch3-ex3.14-q3": {
    "step": 0,
    "expected": "Use ∠A + ∠C = 180° and ∠B + ∠D = 180°.",
    "en": "Use ∠A + ∠C = 180° and ∠B + ∠D = 180°. (Angles of cyclic quadrilateral ABCD: ∠A = 120°, ∠B = 70°, ∠C = 60°, ∠D = 110°)",
    "ta": "எதிர்க் கோணங்களின் கூடுதல் 180°. (வட்ட நாற்கரம் ABCD-இன் கோணங்கள் காண்க: ∠A = 120°, ∠B = 70°, ∠C = 60°, ∠D = 110°)"
  },
  "g9-ch3-ex3.14-q4": {
    "step": 0,
    "expected": "Multiply both equations by 20.",
    "en": "Multiply both equations by 20. (Actual price of T.V. and fridge: T.V.: ₹20,000; Fridge: ₹10,000)",
    "ta": "20-ஆல் பெருக்க x + 2y = 40000; 2x − y = 30000. (தொலைக்காட்சிப் பெட்டி மற்றும் குளிர்சாதனப் பெட்டியின் விலை: தொலைக்காட்சிப் பெட்டி: ₹20,000; குளிர்சாதனப் பெட்டி: ₹10,000)"
  },
  "g9-ch3-ex3.14-q5": {
    "step": 0,
    "expected": "Cross-multiply both proportions.",
    "en": "Cross-multiply both proportions. (Find two numbers in ratio 5:6: 40 and 48)",
    "ta": "குறுக்குப் பெருக்கல்: 6x − 5y = 0; 5x − 4y = 8. (5:6 விகிதத்தில் உள்ள இரு எண்கள் காண்க: 40 மற்றும் 48)"
  },
  "g9-ch3-ex3.14-q6": {
    "step": 0,
    "expected": "Set up 1-day work equations.",
    "en": "Set up 1-day work equations. (Days for 1 Indian or 1 Chinese alone to finish work: 1 Indian: 18 days; 1 Chinese: 36 days)",
    "ta": "ஒரு நாள் வேலை: 4u + 4v = 1/3; 2u + 5v = 1/4. (தனித்தனியாக வேலையை முடிக்கும் நாட்கள்: 1 இந்தியர்: 18 நாள்கள்; 1 சீனர்: 36 நாள்கள்)"
  },
  "g9-ch3-ex3.15-q1": {
    "step": 0,
    "expected": "By Factor Theorem, p(−2) = 0.",
    "en": "By Factor Theorem, p(−2) = 0. (MCQ 1 · Factor Theorem: (4) 11)",
    "ta": "காரணித் தேற்றப்படி p(−2) = 0. (வினா 1 · காரணித் தேற்றம்: (4) 11)"
  },
  "g9-ch3-ex3.15-q2": {
    "step": 0,
    "expected": "Solve 2x + 3 = 0; option (3) is correct.",
    "en": "Solve 2x + 3 = 0; option (3) is correct. (MCQ 2 · Root of polynomial equation: (3) −3/2)",
    "ta": "2x = −3 ⇒ x = −3/2; விருப்பம் (3). (வினா 2 · பல்லுறுப்புக் கோவைச் சமன்பாட்டின் மூலம்: (3) −3/2)"
  },
  "g9-ch3-ex3.15-q3": {
    "step": 0,
    "expected": "Highest power of x is 3 ⇒ cubic polynomial; option (4).",
    "en": "Highest power of x is 3 ⇒ cubic polynomial; option (4). (MCQ 3 · Type of polynomial: (4) cubic polynomial)",
    "ta": "மிக உயர்ந்த அடுக்கு 3 என்பதால் முப்படி பல்லுறுப்புக் கோவை; விருப்பம் (4). (வினா 3 · பல்லுறுப்புக் கோவையின் வகை: (4) முப்படி பல்லுறுப்புக் கோவை)"
  },
  "g9-ch3-ex3.15-q4": {
    "step": 0,
    "expected": "51 is odd, so (−1)⁵¹ = −1; option (4).",
    "en": "51 is odd, so (−1)⁵¹ = −1; option (4). (MCQ 4 · Remainder Theorem: (4) 50)",
    "ta": "p(−1) = −1 + 51 = 50; விருப்பம் (4). (வினா 4 · மீதித் தேற்றம்: (4) 50)"
  },
  "g9-ch3-ex3.15-q5": {
    "step": 0,
    "expected": "Set 2x + 5 = 0; option (2).",
    "en": "Set 2x + 5 = 0; option (2). (MCQ 5 · Zero of polynomial: (2) −5/2)",
    "ta": "2x + 5 = 0 ⇒ x = −5/2; விருப்பம் (2). (வினா 5 · பல்லுறுப்புக் கோவையின் பூச்சியம்: (2) −5/2)"
  },
  "g9-ch3-ex3.15-q6": {
    "step": 0,
    "expected": "The −x² and +x² cancel; option (1).",
    "en": "The −x² and +x² cancel; option (1). (MCQ 6 · Sum of polynomials: (1) x³ − 3x − 1)",
    "ta": "−x² மற்றும் +x² நீங்கி x³ − 3x − 1 கிடைக்கும்; விருப்பம் (1). (வினா 6 · பல்லுறுப்புக் கோவைகளின் கூடுதல்: (1) x³ − 3x − 1)"
  },
  "g9-ch3-ex3.15-q7": {
    "step": 0,
    "expected": "Leading term is y³ · y³ = y⁶; option (4).",
    "en": "Leading term is y³ · y³ = y⁶; option (4). (MCQ 7 · Degree of product: (4) 6)",
    "ta": "மிக உயர்ந்த அடுக்கு 3 + 3 = 6; விருப்பம் (4). (வினா 7 · பெருக்கலின் படி: (4) 6)"
  },
  "g9-ch3-ex3.15-q8": {
    "step": 0,
    "expected": "Order from smallest degree to largest: 4 < 5 < 8 < 12; option (4).",
    "en": "Order from smallest degree to largest: 4 < 5 < 8 < 12; option (4). (MCQ 8 · Ascending order of degrees: (4) B,A,C,D)",
    "ta": "படிகள்: B(4) < A(5) < C(8) < D(12); விருப்பம் (4). (வினா 8 · படிகளின் ஏறு வரிசை: (4) B,A,C,D)"
  },
  "g9-ch3-ex3.15-q9": {
    "step": 0,
    "expected": "Option (4) is correct.",
    "en": "Option (4) is correct. (MCQ 9 · Factor Theorem definition: (4) factor)",
    "ta": "p(a) = 0 எனில் (x − a) ஒரு காரணி; விருப்பம் (4). (வினா 9 · காரணித் தேற்றம்: (4) காரணி)"
  },
  "g9-ch3-ex3.15-q10": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 10 · Zero of (2 − 3x): (3) 2/3)",
    "ta": "2 − 3x = 0 ⇒ x = 2/3; விருப்பம் (3). (வினா 10 · (2 − 3x)-இன் பூச்சியம்: (3) 2/3)"
  },
  "g9-ch3-ex3.15-q11": {
    "step": 0,
    "expected": "Test x = 1 in each choice; only 3x − 3 = 3(x − 1) gives 0; option (2).",
    "en": "Test x = 1 in each choice; only 3x − 3 = 3(x − 1) gives 0; option (2). (MCQ 11 · Which has (x − 1) as factor: (2) 3x − 3)",
    "ta": "x = 1 எனப் பிரதியிட 3(1) − 3 = 0; விருப்பம் (2). (வினா 11 · (x − 1) எதன் காரணி: (2) 3x − 3)"
  },
  "g9-ch3-ex3.15-q12": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 12 · Remainder when (x − 3) is factor: (3) p(3))",
    "ta": "மீதித் தேற்றப்படி (x − 3)-ஆல் வகுக்க மீதி p(3); விருப்பம் (3). (வினா 12 · (x − 3) காரணி எனில் மீதி: (3) p(3))"
  },
  "g9-ch3-ex3.15-q13": {
    "step": 0,
    "expected": "Standard sum of cubes identity; option (3).",
    "en": "Standard sum of cubes identity; option (3). (MCQ 13 · Sum of cubes identity: (3) x³ + y³)",
    "ta": "x³ + y³ முற்றொருமை; விருப்பம் (3). (வினா 13 · கனங்களின் கூடுதல் முற்றொருமை: (3) x³ + y³)"
  },
  "g9-ch3-ex3.15-q14": {
    "step": 0,
    "expected": "Negating an expression does not change its square; option (2).",
    "en": "Negating an expression does not change its square; option (2). (MCQ 14 · Square of trinomial: (2) (−a − b + c)²)",
    "ta": "எதிர்க் கோவையின் வர்க்கம் சமம்; விருப்பம் (2). (வினா 14 · மூவுறுப்பு வர்க்கம்: (2) (−a − b + c)²)"
  },
  "g9-ch3-ex3.15-q15": {
    "step": 0,
    "expected": "Expand and compare; option (3).",
    "en": "Expand and compare; option (3). (MCQ 15 · Quadratic from factors: (3) 1, 2, −15)",
    "ta": "விரித்தெழுத x² + 2x − 15 ⇒ 1, 2, −15; விருப்பம் (3). (வினா 15 · காரணிகளிலிருந்து கெழுக்கள்: (3) 1, 2, −15)"
  },
  "g9-ch3-ex3.15-q16": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 16 · Linear factors of cubic: (3) 3)",
    "ta": "படி 3 என்பதால் அதிகபட்சம் 3 நேரிய காரணிகள்; விருப்பம் (3). (வினா 16 · முப்படி கோவையின் நேரிய காரணிகள்: (3) 3)"
  },
  "g9-ch3-ex3.15-q17": {
    "step": 0,
    "expected": "Option (4) is correct (note: zero polynomial 0 has undefined degree).",
    "en": "Option (4) is correct (note: zero polynomial 0 has undefined degree). (MCQ 17 · Degree of constant polynomial: (4) 0)",
    "ta": "பூச்சியமற்ற மாறிலிக் கோவையின் படி 0; விருப்பம் (4). (வினா 17 · மாறிலிக் கோவையின் படி: (4) 0)"
  },
  "g9-ch3-ex3.15-q18": {
    "step": 0,
    "expected": "Substitute x = 2, y = −2; option (2).",
    "en": "Substitute x = 2, y = −2; option (2). (MCQ 18 · Solution of 2x + 3y = m: (2) −2)",
    "ta": "m = 4 − 6 = −2; விருப்பம் (2). (வினா 18 · 2x + 3y = m தீர்வு: (2) −2)"
  },
  "g9-ch3-ex3.15-q19": {
    "step": 0,
    "expected": "All other options have x⁻¹, x², or x³; option (3).",
    "en": "All other options have x⁻¹, x², or x³; option (3). (MCQ 19 · Identify linear equation: (3) 3x + 5 = 2/3)",
    "ta": "3x + 5 = 2/3 மட்டுமே படி 1 கொண்ட நேரிய சமன்பாடு; விருப்பம் (3). (வினா 19 · நேரிய சமன்பாட்டைக் கண்டறிக: (3) 3x + 5 = 2/3)"
  },
  "g9-ch3-ex3.15-q20": {
    "step": 0,
    "expected": "Substitute (4, 2) into 2x − y = 6; option (2).",
    "en": "Substitute (4, 2) into 2x − y = 6; option (2). (MCQ 20 · Solution of 2x − y = 6: (2) (4, 2))",
    "ta": "x = 4, y = 2 எனில் 2(4) − 2 = 6; விருப்பம் (2). (வினா 20 · 2x − y = 6-இன் தீர்வு: (2) (4, 2))"
  },
  "g9-ch3-ex3.15-q21": {
    "step": 0,
    "expected": "Option (4) is correct.",
    "en": "Option (4) is correct. (MCQ 21 · Find k from (2, 3): (4) 13)",
    "ta": "k = 4 + 9 = 13; விருப்பம் (4). (வினா 21 · (2, 3) தீர்வு எனில் k காண்க: (4) 13)"
  },
  "g9-ch3-ex3.15-q22": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 22 · Condition for linear equation: (3) a = 0, b = 0)",
    "ta": "a = 0, b = 0 எனில் மாறிகள் இருக்காது; விருப்பம் (3). (வினா 22 · நேரிய சமன்பாட்டு நிபந்தனை: (3) a = 0, b = 0)"
  },
  "g9-ch3-ex3.15-q23": {
    "step": 0,
    "expected": "Option (2) is correct.",
    "en": "Option (2) is correct. (MCQ 23 · Not a linear equation in two variables: (2) 0x + 0y + c = 0)",
    "ta": "இரு மாறிகளின் கெழுக்களும் 0; விருப்பம் (2). (வினா 23 · இரு மாறிகளில் நேரிய சமன்பாடு அல்லாதது: (2) 0x + 0y + c = 0)"
  },
  "g9-ch3-ex3.15-q24": {
    "step": 0,
    "expected": "Parallel lines require a₁/a₂ = b₁/b₂ ≠ c₁/c₂; option (1).",
    "en": "Parallel lines require a₁/a₂ = b₁/b₂ ≠ c₁/c₂; option (1). (MCQ 24 · Parallel lines condition: (1) k = 3)",
    "ta": "4/2 = 6/k ⇒ k = 3; விருப்பம் (1). (வினா 24 · இணை கோடுகள் நிபந்தனை: (1) k = 3)"
  },
  "g9-ch3-ex3.15-q25": {
    "step": 0,
    "expected": "Option (2) shows parallel lines.",
    "en": "Option (2) shows parallel lines. (MCQ 25 · Graph with no solution: (2) Parallel lines)",
    "ta": "இணை கோடுகள் வெட்டிக்கொள்ளாது; விருப்பம் (2). (வினா 25 · தீர்வு இல்லாத வரைபடம்: (2) இணை கோடுகள்)"
  },
  "g9-ch3-ex3.15-q26": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 26 · Unique solution ratio: (3) unique)",
    "ta": "வெட்டும் கோடுகள் ⇒ ஒரு தீர்வு; விருப்பம் (3). (வினா 26 · ஒரே தீர்வு விகிதம்: (3) ஒரு தீர்வு)"
  },
  "g9-ch3-ex3.15-q27": {
    "step": 0,
    "expected": "Option (1) is correct.",
    "en": "Option (1) is correct. (MCQ 27 · No solution ratio: (1) no solution)",
    "ta": "இணை கோடுகள் ⇒ தீர்வு இல்லை; விருப்பம் (1). (வினா 27 · தீர்வு இல்லை விகிதம்: (1) தீர்வு இல்லை)"
  },
  "g9-ch3-ex3.15-q28": {
    "step": 0,
    "expected": "Option (3) is correct.",
    "en": "Option (3) is correct. (MCQ 28 · GCD of two primes: (3) 1)",
    "ta": "பகா எண்களின் பொது வகுத்தி 1; விருப்பம் (3). (வினா 28 · இரண்டு பகா எண்களின் மீ.பொ.வ: (3) 1)"
  },
  "g9-ch3-ex3.15-q29": {
    "step": 0,
    "expected": "Common factor is x² − y²; option (2).",
    "en": "Common factor is x² − y²; option (2). (MCQ 29 · GCD of x⁴ − y⁴ and x² − y²: (2) x² − y²)",
    "ta": "பொதுக் காரணி x² − y²; விருப்பம் (2). (வினா 29 · x⁴ − y⁴ மற்றும் x² − y² மீ.பொ.வ: (2) x² − y²)"
  }
};
  const tamilPatches = {
    "g9-ch3-ex3.1-q6-iii": {
      ...db.hints["g9-ch3-ex3.1-q6-iii"],
      ta: "இரண்டாவது பல்லுறுப்புக் கோவையைக் கழிக்கும்போது அதன் ஒவ்வொரு உறுப்பின் குறியையும் மாற்றி ஒத்த உறுப்புகளைச் சேர்க்க வேண்டும்; பின்வரும் உறுப்புகளின் குறியை மாற்ற மறப்பது பொதுவான பிழையாகும்."
    },
    "g9-ch3-ex3.1-q8": {
      ...db.hints["g9-ch3-ex3.1-q8"],
      ta: "A(x)-இலிருந்து எந்தப் பல்லுறுப்புக் கோவை P(x)-ஐக் கழித்தால் B(x) கிடைக்கும் என்பது A(x) − P(x) = B(x) என்பதாகும்; எனவே P(x) = A(x) − B(x) எனத் தொடக்கக் கோவையிலிருந்து இலக்குக் கோவையைக் கழிக்க வேண்டும்."
    },
    "g9-ch3-ex3.1-q9-ii": {
      ...db.hints["g9-ch3-ex3.1-q9-ii"],
      ta: "பங்கீட்டு விதியின்படி முதல் பல்லுறுப்புக் கோவையின் ஒவ்வொரு உறுப்பும் இரண்டாவது கோவையின் ஒவ்வொரு உறுப்புடன் பெருக்கப்பட்டு, ஒத்த அடிமானங்களின் அடுக்குகள் கூட்டப்படும் (x^m · x^n = x^(m+n))."
    }
  };
  window.TriggleWhyStepG9 = Object.freeze({
    ...db,
    hints: Object.freeze({ ...db.hints, ...tamilPatches, ...additions })
  });
})();
