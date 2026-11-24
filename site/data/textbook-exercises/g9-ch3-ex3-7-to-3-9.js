/* Grade 9 Algebra Chapter 3 — Exercises 3.7, 3.8, 3.9 (2025 EN + TA complete).
 * Sources: G9_Algebra_English_2025_Chapter3.pdf pp. 34–38; G9_Algebra_Tamil_2025_Chapter3.pdf pp. 37–41.
 */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES?.[9];
  const chapter = window.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 9)?.chapters?.find(c => c.id === 'g9-ch3');
  if (!grade || !chapter) throw Error('Missing Grade 9 Algebra registration');
  chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];

  const tex = (latex, fallback, display = false) => ({ latex, fallback, ...(display ? { display: true } : {}) });
  const item = (id, ex, qNum, labelPart, topicEn, topicTa, titleEn, titleTa, qEn, qTa, qTex, ansEn, ansTa, ansTex, steps, diff = 'medium') => ({
    id,
    classNum: 9,
    chapter: '3',
    exercise: ex,
    kind: 'textbook',
    difficulty: diff,
    topic: { en: topicEn, ta: topicTa },
    label: {
      en: `Exercise ${ex} · Q${qNum}${labelPart ? `(${labelPart})` : ''}`,
      ta: `பயிற்சி ${ex} · வினா ${qNum}${labelPart ? `(${labelPart})` : ''}`
    },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: {
      en: qEn.includes('\n')
        ? [qEn.slice(0, qEn.indexOf('\n') + 1), tex(qTex, qEn.slice(qEn.indexOf('\n') + 1), true)]
        : null,
      ta: qTa.includes('\n')
        ? [qTa.slice(0, qTa.indexOf('\n') + 1), tex(qTex, qTa.slice(qTa.indexOf('\n') + 1), true)]
        : null
    },
    steps: steps.map(([eq, en, ta, mLatex]) => ({
      eq, en, ta, math: tex(mLatex || eq, eq, false)
    })),
    answer: ansEn,
    answerTa: ansTa,
    answerMath: tex(`\\boxed{${ansTex}}`, ansEn, false),
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending'
  });

  const entries = [
    // ==================== EXERCISE 3.7 (12 items) ====================
    item('g9-ch3-ex3.7-q1-i', '3.7', 1, 'i', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Divide (4x³ + 6x² − 23x + 18) by (x + 3)', '(4x³ + 6x² − 23x + 18) ÷ (x + 3)',
      '1. Find the quotient and remainder of the following.\n(i) (4x³ + 6x² − 23x + 18) ÷ (x + 3)',
      '1. பின்வரும் பல்லுறுப்புக் கோவைகளை வகுத்து ஈவு மற்றும் மீதியைக் காண்க.\n(i) (4x³ + 6x² − 23x + 18) ÷ (x + 3)',
      '(4x^3 + 6x^2 - 23x + 18) \\div (x + 3)',
      'Quotient: 4x² − 6x − 5; Remainder: 33', 'ஈவு: 4x² − 6x − 5; மீதி: 33',
      'q(x) = 4x^2 - 6x - 5,\\; r = 33', [
        ['Divisor zero: x + 3 = 0 ⇒ x = −3; coefficients: 4, 6, −23, 18', 'Set up synthetic division with x = −3.', 'x = −3 கொண்டு தொகுமுறை வகுத்தல் அமைக்க.', 'x = -3;\\; [4,\\; 6,\\; -23,\\; 18]'],
        ['4, (6 − 12) = −6, (−23 + 18) = −5, (18 + 15) = 33', 'Bring down 4, multiply by −3 and add down.', 'படிப்படியாக −3-ஆல் பெருக்கிக் கூட்ட.', '4,\\; -6,\\; -5 \\mid 33'],
        ['Quotient = 4x² − 6x − 5, Remainder = 33', 'Read quotient of degree 2 and remainder.', 'ஈவு = 4x² − 6x − 5, மீதி = 33.', 'q(x) = 4x^2 - 6x - 5,\\; r = 33']
      ], 'medium'),

    item('g9-ch3-ex3.7-q1-ii', '3.7', 1, 'ii', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Divide (8y³ − 16y² + 16y − 15) by (2y − 1)', '(8y³ − 16y² + 16y − 15) ÷ (2y − 1)',
      '1. Find the quotient and remainder of the following.\n(ii) (8y³ − 16y² + 16y − 15) ÷ (2y − 1)',
      '1. பின்வரும் பல்லுறுப்புக் கோவைகளை வகுத்து ஈவு மற்றும் மீதியைக் காண்க.\n(ii) (8y³ − 16y² + 16y − 15) ÷ (2y − 1)',
      '(8y^3 - 16y^2 + 16y - 15) \\div (2y - 1)',
      'Quotient: 4y² − 6y + 5; Remainder: −10', 'ஈவு: 4y² − 6y + 5; மீதி: −10',
      'q(y) = 4y^2 - 6y + 5,\\; r = -10', [
        ['2y − 1 = 0 ⇒ y = 1/2; coefficients: 8, −16, 16, −15', 'Use y = 1/2 in synthetic division.', 'y = 1/2 கொண்டு தொகுமுறை வகுத்தல் செய்க.', 'y = \\dfrac{1}{2};\\; [8,\\; -16,\\; 16,\\; -15]'],
        ['8, (−16 + 4) = −12, (16 − 6) = 10, (−15 + 5) = −10', 'Row yields 8, −12, 10 and remainder −10.', 'கெழுக்கள் 8, −12, 10 மற்றும் மீதி −10.', '8,\\; -12,\\; 10 \\mid -10'],
        ['Divide quotient by 2: 4y² − 6y + 5; Remainder = −10', 'Because divisor is 2(y − 1/2), divide quotient by 2.', 'வகுத்தி 2y−1 என்பதால் ஈவை 2-ஆல் வகுக்க 4y² − 6y + 5; மீதி = −10.', 'q(y) = 4y^2 - 6y + 5,\\; r = -10']
      ], 'medium'),

    item('g9-ch3-ex3.7-q1-iii', '3.7', 1, 'iii', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Divide (8x³ − 1) by (2x − 1)', '(8x³ − 1) ÷ (2x − 1)',
      '1. Find the quotient and remainder of the following.\n(iii) (8x³ − 1) ÷ (2x − 1)',
      '1. பின்வரும் பல்லுறுப்புக் கோவைகளை வகுத்து ஈவு மற்றும் மீதியைக் காண்க.\n(iii) (8x³ − 1) ÷ (2x − 1)',
      '(8x^3 - 1) \\div (2x - 1)',
      'Quotient: 4x² + 2x + 1; Remainder: 0', 'ஈவு: 4x² + 2x + 1; மீதி: 0',
      'q(x) = 4x^2 + 2x + 1,\\; r = 0', [
        ['8x³ − 1 = (2x)³ − 1³ = (2x − 1)(4x² + 2x + 1)', 'Factor using a³ − b³ or use synthetic division with [8, 0, 0, −1] at x = 1/2.', 'a³ − b³ முற்றொருமை அல்லது தொகுமுறை வகுத்தல் மூலம்.', '(2x - 1)(4x^2 + 2x + 1)'],
        ['Quotient = 4x² + 2x + 1, Remainder = 0', 'Exact division.', 'ஈவு = 4x² + 2x + 1, மீதி = 0.', 'q(x) = 4x^2 + 2x + 1,\\; r = 0']
      ], 'easy'),

    item('g9-ch3-ex3.7-q1-iv', '3.7', 1, 'iv', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Divide (−18z + 14z² + 24z³ + 18) by (3z + 4)', '(−18z + 14z² + 24z³ + 18) ÷ (3z + 4)',
      '1. Find the quotient and remainder of the following.\n(iv) (−18z + 14z² + 24z³ + 18) ÷ (3z + 4)',
      '1. பின்வரும் பல்லுறுப்புக் கோவைகளை வகுத்து ஈவு மற்றும் மீதியைக் காண்க.\n(iv) (−18z + 14z² + 24z³ + 18) ÷ (3z + 4)',
      '(-18z + 14z^2 + 24z^3 + 18) \\div (3z + 4)',
      'Quotient: 8z² − 6z + 2; Remainder: 10', 'ஈவு: 8z² − 6z + 2; மீதி: 10',
      'q(z) = 8z^2 - 6z + 2,\\; r = 10', [
        ['Standard form: 24z³ + 14z² − 18z + 18; z = −4/3', 'Order terms in descending powers first.', 'திட்ட வடிவில் எழுதி z = −4/3 என்க.', '24z^3 + 14z^2 - 18z + 18,\\; z = -\\dfrac{4}{3}'],
        ['24, (14 − 32) = −18, (−18 + 24) = 6, (18 − 8) = 10', 'Synthetic division gives [24, −18, 6] and remainder 10.', 'தொகுமுறை வகுத்தலில் 24, −18, 6 மற்றும் மீதி 10.', '24,\\; -18,\\; 6 \\mid 10'],
        ['Divide quotient by 3: 8z² − 6z + 2; Remainder = 10', 'Divide quotient by 3 (from 3z + 4).', 'ஈவை 3-ஆல் வகுக்க 8z² − 6z + 2; மீதி = 10.', 'q(z) = 8z^2 - 6z + 2,\\; r = 10']
      ], 'medium'),

    item('g9-ch3-ex3.7-q2', '3.7', 2, '', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Length of rectangle given area and breadth', 'செவ்வகத்தின் நீளம் காண்க',
      '2. The area of a rectangle is x² + 7x + 12. If its breadth is (x + 3), then find its length.',
      '2. செவ்வகத்தின் பரப்பு x² + 7x + 12. அதன் அகலம் (x + 3) எனில், அதன் நீளம் காண்க.',
      '\\text{Length} = \\dfrac{x^2 + 7x + 12}{x + 3}',
      'x + 4', 'x + 4', 'x + 4', [
        ['x² + 7x + 12 = (x + 3)(x + 4)', 'Factorise the area.', 'பரப்பைக் காரணிப்படுத்தவும்.', 'x^2 + 7x + 12 = (x + 3)(x + 4)'],
        ['Length = Area ÷ Breadth = x + 4 (for x ≠ −3)', 'Divide by (x + 3).', 'நீளம் = (x + 4) (x ≠ −3).', '\\text{Length} = x + 4']
      ], 'easy'),

    item('g9-ch3-ex3.7-q3', '3.7', 3, '', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Height of parallelogram given area and base', 'இணைகரத்தின் உயரம் காண்க',
      '3. The base of a parallelogram is (5x + 4). Find its height, if the area is 25x² − 16.',
      '3. இணைகரத்தின் பரப்பு 25x² − 16. அதன் அடிப்பக்கம் (5x + 4) எனில், அதன் உயரம் காண்க.',
      '\\text{Height} = \\dfrac{25x^2 - 16}{5x + 4}',
      '5x − 4', '5x − 4', '5x - 4', [
        ['25x² − 16 = (5x)² − 4² = (5x + 4)(5x − 4)', 'Factorise using difference of squares.', 'a² − b² மூலம் காரணிப்படுத்தவும்.', '(5x + 4)(5x - 4)'],
        ['Height = Area ÷ Base = 5x − 4 (for x ≠ −4/5)', 'Divide by (5x + 4).', 'உயரம் = 5x − 4.', '\\text{Height} = 5x - 4']
      ], 'easy'),

    item('g9-ch3-ex3.7-q4', '3.7', 4, '', 'Division of Polynomials', 'பல்லுறுப்புக் கோவைகளின் வகுத்தல்',
      'Mean of (x + 5) observations with sum (x³ + 125)', 'விவரங்களின் சராசரி காண்க',
      '4. The sum of (x + 5) observations is (x³ + 125). Find the mean of the observations.',
      '4. (x + 5) விவரங்களின் கூடுதல் (x³ + 125) எனில், விவரங்களின் சராசரியைக் காண்க.',
      '\\text{Mean} = \\dfrac{x^3 + 125}{x + 5}',
      'x² − 5x + 25', 'x² − 5x + 25', 'x^2 - 5x + 25', [
        ['x³ + 125 = x³ + 5³ = (x + 5)(x² − 5x + 25)', 'Factorise using a³ + b³.', 'a³ + b³ முற்றொருமை மூலம் காரணிப்படுத்தவும்.', '(x + 5)(x^2 - 5x + 25)'],
        ['Mean = (x³ + 125)/(x + 5) = x² − 5x + 25 (for x ≠ −5)', 'Divide sum by count (x + 5).', 'சராசரி = x² − 5x + 25.', '\\text{Mean} = x^2 - 5x + 25']
      ], 'easy'),

    item('g9-ch3-ex3.7-q5-i', '3.7', 5, 'i', 'Synthetic Division', 'தொகுமுறை வகுத்தல்',
      'Synthetic division: (x³ + x² − 7x − 3) ÷ (x − 3)', 'தொகுமுறை வகுத்தல்: (x³ + x² − 7x − 3) ÷ (x − 3)',
      '5. Find the quotient and remainder for the following using synthetic division:\n(i) (x³ + x² − 7x − 3) ÷ (x − 3)',
      '5. தொகுமுறை வகுத்தலைப் பயன்படுத்தி ஈவு மற்றும் மீதி காண்க:\n(i) (x³ + x² − 7x − 3) ÷ (x − 3)',
      '(x^3 + x^2 - 7x - 3) \\div (x - 3)',
      'Quotient: x² + 4x + 5; Remainder: 12', 'ஈவு: x² + 4x + 5; மீதி: 12',
      'q(x) = x^2 + 4x + 5,\\; r = 12', [
        ['x − 3 = 0 ⇒ x = 3; coefficients: 1, 1, −7, −3', 'Set up synthetic division with x = 3.', 'x = 3 கொண்டு தொகுமுறை வகுத்தல் அமைக்க.', 'x = 3;\\; [1,\\; 1,\\; -7,\\; -3]'],
        ['1, (1 + 3) = 4, (−7 + 12) = 5, (−3 + 15) = 12', 'Multiply by 3 and add across.', 'படிப்படியாக 3-ஆல் பெருக்கிக் கூட்ட.', '1,\\; 4,\\; 5 \\mid 12'],
        ['Quotient = x² + 4x + 5, Remainder = 12', 'Read quotient and remainder.', 'ஈவு = x² + 4x + 5, மீதி = 12.', 'q(x) = x^2 + 4x + 5,\\; r = 12']
      ], 'easy'),

    item('g9-ch3-ex3.7-q5-ii', '3.7', 5, 'ii', 'Synthetic Division', 'தொகுமுறை வகுத்தல்',
      'Synthetic division: (x³ + 2x² − x − 4) ÷ (x + 2)', 'தொகுமுறை வகுத்தல்: (x³ + 2x² − x − 4) ÷ (x + 2)',
      '5. Find the quotient and remainder for the following using synthetic division:\n(ii) (x³ + 2x² − x − 4) ÷ (x + 2)',
      '5. தொகுமுறை வகுத்தலைப் பயன்படுத்தி ஈவு மற்றும் மீதி காண்க:\n(ii) (x³ + 2x² − x − 4) ÷ (x + 2)',
      '(x^3 + 2x^2 - x - 4) \\div (x + 2)',
      'Quotient: x² − 1; Remainder: −2', 'ஈவு: x² − 1; மீதி: −2',
      'q(x) = x^2 - 1,\\; r = -2', [
        ['x + 2 = 0 ⇒ x = −2; coefficients: 1, 2, −1, −4', 'Set up synthetic division with x = −2.', 'x = −2 கொண்டு தொகுமுறை வகுத்தல் அமைக்க.', 'x = -2;\\; [1,\\; 2,\\; -1,\\; -4]'],
        ['1, (2 − 2) = 0, (−1 + 0) = −1, (−4 + 2) = −2', 'Compute synthetic row.', 'கெழுக்கள் 1, 0, −1 மற்றும் மீதி −2.', '1,\\; 0,\\; -1 \\mid -2'],
        ['Quotient = x² − 1, Remainder = −2', 'Read quotient and remainder.', 'ஈவு = x² − 1, மீதி = −2.', 'q(x) = x^2 - 1,\\; r = -2']
      ], 'easy'),

    item('g9-ch3-ex3.7-q5-iii', '3.7', 5, 'iii', 'Synthetic Division', 'தொகுமுறை வகுத்தல்',
      'Synthetic division: (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1)', 'தொகுமுறை வகுத்தல்: (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1)',
      '5. Find the quotient and remainder for the following using synthetic division:\n(iii) (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1)',
      '5. தொகுமுறை வகுத்தலைப் பயன்படுத்தி ஈவு மற்றும் மீதி காண்க:\n(iii) (8x⁴ − 2x² + 6x + 5) ÷ (4x + 1)',
      '(8x^4 - 2x^2 + 6x + 5) \\div (4x + 1)',
      'Quotient: 2x³ − (1/2)x² − (3/8)x + 51/32; Remainder: 109/32',
      'ஈவு: 2x³ − (1/2)x² − (3/8)x + 51/32; மீதி: 109/32',
      'q(x) = 2x^3 - \\dfrac{1}{2}x^2 - \\dfrac{3}{8}x + \\dfrac{51}{32},\\; r = \\dfrac{109}{32}', [
        ['4x + 1 = 0 ⇒ x = −1/4; coefficients: 8, 0, −2, 6, 5', 'Insert 0 for missing x³ term.', 'x³ உறுப்பு இல்லாததால் 0 சேர்க்க: [8, 0, −2, 6, 5].', 'x = -\\dfrac{1}{4};\\; [8,\\; 0,\\; -2,\\; 6,\\; 5]'],
        ['8, −2, −3/2, 51/8, remainder = 5 − 51/32 = 109/32', 'Run synthetic division with −1/4.', '−1/4 கொண்டு தொகுமுறை வகுத்தல் செய்க.', '8,\\; -2,\\; -\\dfrac{3}{2},\\; \\dfrac{51}{8} \\mid \\dfrac{109}{32}'],
        ['Divide quotient by 4: 2x³ − (1/2)x² − (3/8)x + 51/32; Remainder = 109/32', 'Divide quotient by 4 (not the remainder).', 'ஈவை மட்டும் 4-ஆல் வகுக்கவும்; மீதி = 109/32.', 'q(x) = 2x^3 - \\dfrac{1}{2}x^2 - \\dfrac{3}{8}x + \\dfrac{51}{32},\\; r = \\dfrac{109}{32}']
      ], 'difficult'),

    item('g9-ch3-ex3.7-q6', '3.7', 6, '', 'Synthetic Division', 'தொகுமுறை வகுத்தல்',
      'Find p, q and remainder on dividing 8x⁴ − 2x² + 6x − 7 by (2x + 1)', 'p, q மற்றும் மீதி காண்க',
      '6. If the quotient obtained on dividing (8x⁴ − 2x² + 6x − 7) by (2x + 1) is (4x³ + px² − qx + 3), then find p, q and also the remainder.',
      '6. (8x⁴ − 2x² + 6x − 7)-ஐ (2x + 1)-ஆல் வகுக்கக் கிடைக்கும் ஈவு (4x³ + px² − qx + 3) எனில், p, q மற்றும் மீதியைக் காண்க.',
      '(8x^4 - 2x^2 + 6x - 7) \\div (2x + 1)',
      'p = −2, q = 0; Remainder = −10', 'p = −2, q = 0; மீதி = −10',
      'p = -2,\\; q = 0,\\; r = -10', [
        ['2x + 1 = 0 ⇒ x = −1/2; coefficients: 8, 0, −2, 6, −7', 'Include 0 for missing x³.', 'கெழுக்கள் 8, 0, −2, 6, −7; x = −1/2.', 'x = -\\dfrac{1}{2};\\; [8,\\; 0,\\; -2,\\; 6,\\; -7]'],
        ['8, −4, 0, 6 | −10 ⇒ quotient ÷ 2 = 4x³ − 2x² + 0x + 3, r = −10', 'Divide synthetic quotient [8, −4, 0, 6] by 2.', 'ஈவை 2-ஆல் வகுக்க 4x³ − 2x² + 3; மீதி = −10.', '4x^3 - 2x^2 + 3,\\; r = -10'],
        ['Compare with 4x³ + px² − qx + 3 ⇒ p = −2, q = 0, remainder = −10', 'Match coefficients.', 'ஒப்பிட p = −2, q = 0, மீதி = −10.', 'p = -2,\\; q = 0,\\; r = -10']
      ], 'medium'),

    item('g9-ch3-ex3.7-q7', '3.7', 7, '', 'Synthetic Division', 'தொகுமுறை வகுத்தல்',
      'Find a, b and remainder on dividing 3x³ + 11x² + 34x + 106 by (x − 3)', 'a, b மற்றும் மீதி காண்க',
      '7. If the quotient obtained on dividing 3x³ + 11x² + 34x + 106 by x − 3 is 3x² + ax + b, then find a, b and also the remainder.',
      '7. 3x³ + 11x² + 34x + 106-ஐ x − 3-ஆல் வகுக்கக் கிடைக்கும் ஈவு 3x² + ax + b எனில், a, b மற்றும் மீதி ஆகியவற்றைக் காண்க.',
      '(3x^3 + 11x^2 + 34x + 106) \\div (x - 3)',
      'a = 20, b = 94; Remainder = 388', 'a = 20, b = 94; மீதி = 388',
      'a = 20,\\; b = 94,\\; r = 388', [
        ['x − 3 = 0 ⇒ x = 3; coefficients: 3, 11, 34, 106', 'Run synthetic division with x = 3.', 'x = 3 கொண்டு தொகுமுறை வகுத்தல் செய்க.', 'x = 3;\\; [3,\\; 11,\\; 34,\\; 106]'],
        ['3, (11 + 9) = 20, (34 + 60) = 94, (106 + 282) = 388', 'Compute each cell.', 'கெழுக்கள் 3, 20, 94 மற்றும் மீதி 388.', '3,\\; 20,\\; 94 \\mid 388'],
        ['Compare with 3x² + ax + b ⇒ a = 20, b = 94, remainder = 388', 'Match coefficients.', 'a = 20, b = 94, மீதி = 388.', 'a = 20,\\; b = 94,\\; r = 388']
      ], 'medium'),

    // ==================== EXERCISE 3.8 (6 items) ====================
    item('g9-ch3-ex3.8-q1-i', '3.8', 1, 'i', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise x³ − 3x² − 10x + 24', 'காரணிப்படுத்துக: x³ − 3x² − 10x + 24',
      '1. Factorise each of the following polynomials using synthetic division:\n(i) x³ − 3x² − 10x + 24',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) x³ − 3x² − 10x + 24',
      'x^3 - 3x^2 - 10x + 24',
      '(x − 2)(x − 4)(x + 3)', '(x − 2)(x − 4)(x + 3)', '(x - 2)(x - 4)(x + 3)', [
        ['p(2) = 8 − 12 − 20 + 24 = 0 ⇒ (x − 2) is a factor', 'Test x = 2.', 'x = 2 எனப் பிரதியிட p(2) = 0; எனவே (x − 2) காரணி.', 'p(2) = 0 \\implies (x - 2) \\text{ is a factor}'],
        ['Synthetic division by x = 2 gives quotient x² − x − 12', 'Divide [1, −3, −10, 24] by 2 → [1, −1, −12].', 'தொகுமுறை வகுத்தலால் ஈவு x² − x − 12.', 'x^2 - x - 12 = (x - 4)(x + 3)'],
        ['= (x − 2)(x − 4)(x + 3)', 'Combine all three linear factors.', '(x − 2)(x − 4)(x + 3).', '(x - 2)(x - 4)(x + 3)']
      ], 'medium'),

    item('g9-ch3-ex3.8-q1-ii', '3.8', 1, 'ii', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise 2x³ − 3x² − 3x + 2', 'காரணிப்படுத்துக: 2x³ − 3x² − 3x + 2',
      '1. Factorise each of the following polynomials using synthetic division:\n(ii) 2x³ − 3x² − 3x + 2',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) 2x³ − 3x² − 3x + 2',
      '2x^3 - 3x^2 - 3x + 2',
      '(x + 1)(x − 2)(2x − 1)', '(x + 1)(x − 2)(2x − 1)', '(x + 1)(x - 2)(2x - 1)', [
        ['p(−1) = −2 − 3 + 3 + 2 = 0 ⇒ (x + 1) is a factor', 'Sum of even-power coeffs = −3 + 2 = −1; odd-power = 2 − 3 = −1.', 'p(−1) = 0 என்பதால் (x + 1) ஒரு காரணி.', 'p(-1) = 0 \\implies (x + 1) \\text{ is a factor}'],
        ['Synthetic division by −1 gives 2x² − 5x + 2', 'Factorise 2x² − 5x + 2 = (x − 2)(2x − 1).', 'ஈவு 2x² − 5x + 2 = (x − 2)(2x − 1).', '2x^2 - 5x + 2 = (x - 2)(2x - 1)'],
        ['= (x + 1)(x − 2)(2x − 1)', 'Write product of all factors.', '(x + 1)(x − 2)(2x − 1).', '(x + 1)(x - 2)(2x - 1)']
      ], 'medium'),

    item('g9-ch3-ex3.8-q1-iii', '3.8', 1, 'iii', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise −7x + 3 + 4x³', 'காரணிப்படுத்துக: −7x + 3 + 4x³',
      '1. Factorise each of the following polynomials using synthetic division:\n(iii) −7x + 3 + 4x³',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) −7x + 3 + 4x³',
      '4x^3 - 7x + 3',
      '(x − 1)(2x − 1)(2x + 3)', '(x − 1)(2x − 1)(2x + 3)', '(x - 1)(2x - 1)(2x + 3)', [
        ['Standard form: 4x³ + 0x² − 7x + 3; sum of coeffs = 4 − 7 + 3 = 0', 'So (x − 1) is a factor.', 'கெழுக்களின் கூடுதல் 0 என்பதால் (x − 1) காரணி.', '4 + 0 - 7 + 3 = 0 \\implies (x - 1)'],
        ['Synthetic division by 1 gives 4x² + 4x − 3', 'Factorise 4x² + 4x − 3 = (2x − 1)(2x + 3).', 'ஈவு 4x² + 4x − 3 = (2x − 1)(2x + 3).', '4x^2 + 4x - 3 = (2x - 1)(2x + 3)'],
        ['= (x − 1)(2x − 1)(2x + 3)', 'Complete factorisation.', '(x − 1)(2x − 1)(2x + 3).', '(x - 1)(2x - 1)(2x + 3)']
      ], 'medium'),

    item('g9-ch3-ex3.8-q1-iv', '3.8', 1, 'iv', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise x³ + x² − 14x − 24', 'காரணிப்படுத்துக: x³ + x² − 14x − 24',
      '1. Factorise each of the following polynomials using synthetic division:\n(iv) x³ + x² − 14x − 24',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iv) x³ + x² − 14x − 24',
      'x^3 + x^2 - 14x - 24',
      '(x + 2)(x + 3)(x − 4)', '(x + 2)(x + 3)(x − 4)', '(x + 2)(x + 3)(x - 4)', [
        ['p(−2) = −8 + 4 + 28 − 24 = 0 ⇒ (x + 2) is a factor', 'Test x = −2.', 'p(−2) = 0 என்பதால் (x + 2) ஒரு காரணி.', 'p(-2) = 0 \\implies (x + 2)'],
        ['Synthetic division by −2 gives x² − x − 12 = (x − 4)(x + 3)', 'Factorise the quadratic quotient.', 'ஈவு x² − x − 12 = (x − 4)(x + 3).', 'x^2 - x - 12 = (x - 4)(x + 3)'],
        ['= (x + 2)(x + 3)(x − 4)', 'Write all factors.', '(x + 2)(x + 3)(x − 4).', '(x + 2)(x + 3)(x - 4)']
      ], 'medium'),

    item('g9-ch3-ex3.8-q1-v', '3.8', 1, 'v', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise x³ − 7x + 6', 'காரணிப்படுத்துக: x³ − 7x + 6',
      '1. Factorise each of the following polynomials using synthetic division:\n(v) x³ − 7x + 6',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(v) x³ − 7x + 6',
      'x^3 - 7x + 6',
      '(x − 1)(x − 2)(x + 3)', '(x − 1)(x − 2)(x + 3)', '(x - 1)(x - 2)(x + 3)', [
        ['1 + 0 − 7 + 6 = 0 ⇒ (x − 1) is a factor', 'Standard form x³ + 0x² − 7x + 6.', 'x³ + 0x² − 7x + 6; கெழுக்களின் கூடுதல் 0.', 'p(1) = 0 \\implies (x - 1)'],
        ['Synthetic division by 1 gives x² + x − 6 = (x − 2)(x + 3)', 'Factorise the quadratic.', 'ஈவு x² + x − 6 = (x − 2)(x + 3).', 'x^2 + x - 6 = (x - 2)(x + 3)'],
        ['= (x − 1)(x − 2)(x + 3)', 'Write all factors.', '(x − 1)(x − 2)(x + 3).', '(x - 1)(x - 2)(x + 3)']
      ], 'easy'),

    item('g9-ch3-ex3.8-q1-vi', '3.8', 1, 'vi', 'Factorisation by Synthetic Division', 'தொகுமுறை வகுத்தல் காரணிப்படுத்தல்',
      'Factorise x³ − 10x² − x + 10', 'காரணிப்படுத்துக: x³ − 10x² − x + 10',
      '1. Factorise each of the following polynomials using synthetic division:\n(vi) x³ − 10x² − x + 10',
      '1. தொகுமுறை வகுத்தல் முறையினைப் பயன்படுத்திப் பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(vi) x³ − 10x² − x + 10',
      'x^3 - 10x^2 - x + 10',
      '(x − 1)(x + 1)(x − 10)', '(x − 1)(x + 1)(x − 10)', '(x - 1)(x + 1)(x - 10)', [
        ['1 − 10 − 1 + 10 = 0 ⇒ (x − 1) is a factor', 'Sum of coefficients is 0.', 'கெழுக்களின் கூடுதல் 0 என்பதால் (x − 1) காரணி.', 'p(1) = 0 \\implies (x - 1)'],
        ['Synthetic division by 1 gives x² − 9x − 10 = (x + 1)(x − 10)', 'Factorise x² − 9x − 10.', 'ஈவு x² − 9x − 10 = (x + 1)(x − 10).', 'x^2 - 9x - 10 = (x + 1)(x - 10)'],
        ['= (x − 1)(x + 1)(x − 10)', 'Write all factors.', '(x − 1)(x + 1)(x − 10).', '(x - 1)(x + 1)(x - 10)']
      ], 'easy'),

    // ==================== EXERCISE 3.9 (14 items) ====================
    item('g9-ch3-ex3.9-q1-i', '3.9', 1, 'i', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of p⁵, p¹¹, p⁹', 'மீ.பொ.வ காண்க: p⁵, p¹¹, p⁹',
      '1. Find the GCD for the following:\n(i) p⁵, p¹¹, p⁹',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(i) p⁵, p¹¹, p⁹',
      'p^5,\\; p^{11},\\; p^9', 'p⁵', 'p⁵', 'p^5', [
        ['Common base is p; exponents are 5, 11, 9', 'GCD takes the lowest common power.', 'பொது அடிமானம் p; மிகக் குறைந்த அடுக்கு 5.', '\\min(5, 11, 9) = 5'],
        ['GCD = p⁵', 'Result.', 'மீ.பொ.வ = p⁵.', 'p^5']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-ii', '3.9', 1, 'ii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 4x³, y³, z³', 'மீ.பொ.வ காண்க: 4x³, y³, z³',
      '1. Find the GCD for the following:\n(ii) 4x³, y³, z³',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(ii) 4x³, y³, z³',
      '4x^3,\\; y^3,\\; z^3', '1', '1', '1', [
        ['No common numerical or variable factor across all three', 'GCD(4, 1, 1) = 1 and x, y, z are distinct.', 'மூன்றிற்கும் பொதுக் காரணி இல்லை.', '\\text{No common factor other than } 1'],
        ['GCD = 1', 'Result.', 'மீ.பொ.வ = 1.', '1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-iii', '3.9', 1, 'iii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 9a²b²c³, 15a³b²c⁴', 'மீ.பொ.வ காண்க: 9a²b²c³, 15a³b²c⁴',
      '1. Find the GCD for the following:\n(iii) 9a²b²c³, 15a³b²c⁴',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(iii) 9a²b²c³, 15a³b²c⁴',
      '9a^2b^2c^3,\\; 15a^3b^2c^4', '3a²b²c³', '3a²b²c³', '3a^2b^2c^3', [
        ['GCD(9, 15) = 3', 'Numerical GCD.', '9 மற்றும் 15-இன் மீ.பொ.வ 3.', '\\gcd(9, 15) = 3'],
        ['Lowest powers: a², b², c³ ⇒ GCD = 3a²b²c³', 'Multiply by lowest powers of a, b, c.', 'குறைந்த அடுக்குகளைப் பெருக்க 3a²b²c³.', '3a^2b^2c^3']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-iv', '3.9', 1, 'iv', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 64x⁸, 240x⁶', 'மீ.பொ.வ காண்க: 64x⁸, 240x⁶',
      '1. Find the GCD for the following:\n(iv) 64x⁸, 240x⁶',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(iv) 64x⁸, 240x⁶',
      '64x^8,\\; 240x^6', '16x⁶', '16x⁶', '16x^6', [
        ['64 = 16 × 4, 240 = 16 × 15 ⇒ GCD(64, 240) = 16', 'Find numerical GCD.', '64 மற்றும் 240-இன் மீ.பொ.வ 16.', '\\gcd(64, 240) = 16'],
        ['Lowest power of x is x⁶ ⇒ GCD = 16x⁶', 'Combine with x⁶.', 'x-இன் குறைந்த அடுக்கு x⁶; மீ.பொ.வ = 16x⁶.', '16x^6']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-v', '3.9', 1, 'v', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of ab²c³, a²b³c, a³bc²', 'மீ.பொ.வ காண்க: ab²c³, a²b³c, a³bc²',
      '1. Find the GCD for the following:\n(v) ab²c³, a²b³c, a³bc²',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(v) ab²c³, a²b³c, a³bc²',
      'ab^2c^3,\\; a^2b^3c,\\; a^3bc^2', 'abc', 'abc', 'abc', [
        ['min power of a = 1, b = 1, c = 1', 'Take lowest exponent of each variable.', 'a, b, c ஆகியவற்றின் குறைந்த அடுக்கு 1.', 'a^1 b^1 c^1'],
        ['GCD = abc', 'Result.', 'மீ.பொ.வ = abc.', 'abc']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-vi', '3.9', 1, 'vi', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 35x⁵y³z⁴, 49x²yz³, 14xy²z²', 'மீ.பொ.வ காண்க: 35x⁵y³z⁴, 49x²yz³, 14xy²z²',
      '1. Find the GCD for the following:\n(vi) 35x⁵y³z⁴, 49x²yz³, 14xy²z²',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(vi) 35x⁵y³z⁴, 49x²yz³, 14xy²z²',
      '35x^5y^3z^4,\\; 49x^2yz^3,\\; 14xy^2z^2', '7xyz²', '7xyz²', '7xyz^2', [
        ['GCD(35, 49, 14) = 7', 'All three are multiples of 7.', '35, 49, 14-இன் மீ.பொ.வ 7.', '\\gcd(35, 49, 14) = 7'],
        ['Lowest powers: x¹, y¹, z² ⇒ GCD = 7xyz²', 'Combine with lowest variable powers.', 'குறைந்த அடுக்குகள் x, y, z²; மீ.பொ.வ = 7xyz².', '7xyz^2']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-vii', '3.9', 1, 'vii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 25ab³c, 100a²bc, 125ab', 'மீ.பொ.வ காண்க: 25ab³c, 100a²bc, 125ab',
      '1. Find the GCD for the following:\n(vii) 25ab³c, 100a²bc, 125ab',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(vii) 25ab³c, 100a²bc, 125ab',
      '25ab^3c,\\; 100a^2bc,\\; 125ab', '25ab', '25ab', '25ab', [
        ['GCD(25, 100, 125) = 25', 'Numerical GCD is 25.', 'எண்களின் மீ.பொ.வ 25.', '\\gcd(25, 100, 125) = 25'],
        ['c is absent in 125ab; lowest powers of a, b are 1, 1 ⇒ GCD = 25ab', 'Only a and b are common to all three.', 'மூன்றாவது உறுப்பில் c இல்லை; எனவே மீ.பொ.வ = 25ab.', '25ab']
      ], 'easy'),

    item('g9-ch3-ex3.9-q1-viii', '3.9', 1, 'viii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 3abc, 5xyz, 7pqr', 'மீ.பொ.வ காண்க: 3abc, 5xyz, 7pqr',
      '1. Find the GCD for the following:\n(viii) 3abc, 5xyz, 7pqr',
      '1. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(viii) 3abc, 5xyz, 7pqr',
      '3abc,\\; 5xyz,\\; 7pqr', '1', '1', '1', [
        ['3, 5, 7 are primes and variables are all distinct', 'No common factor other than 1.', 'பொதுக் காரணி 1 மட்டுமே.', '\\gcd(3, 5, 7) = 1'],
        ['GCD = 1', 'Result.', 'மீ.பொ.வ = 1.', '1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-i', '3.9', 2, 'i', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of (2x + 5), (5x + 2)', 'மீ.பொ.வ காண்க: (2x + 5), (5x + 2)',
      '2. Find the GCD of the following:\n(i) (2x + 5), (5x + 2)',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(i) (2x + 5), (5x + 2)',
      '(2x + 5),\\; (5x + 2)', '1', '1', '1', [
        ['(2x + 5) and (5x + 2) are distinct linear polynomials', 'They share no common factor other than 1.', 'பொதுக் காரணி இல்லை.', '\\text{No common factor other than } 1'],
        ['GCD = 1', 'Result.', 'மீ.பொ.வ = 1.', '1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-ii', '3.9', 2, 'ii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of aᵐ⁺¹, aᵐ⁺², aᵐ⁺³', 'மீ.பொ.வ காண்க: aᵐ⁺¹, aᵐ⁺², aᵐ⁺³',
      '2. Find the GCD of the following:\n(ii) aᵐ⁺¹, aᵐ⁺², aᵐ⁺³',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(ii) aᵐ⁺¹, aᵐ⁺², aᵐ⁺³',
      'a^{m+1},\\; a^{m+2},\\; a^{m+3}', 'aᵐ⁺¹', 'aᵐ⁺¹', 'a^{m+1}', [
        ['aᵐ⁺² = aᵐ⁺¹ · a, aᵐ⁺³ = aᵐ⁺¹ · a²', 'Lowest power of a is m + 1.', 'மிகக் குறைந்த அடுக்கு m + 1.', 'a^{m+1}'],
        ['GCD = aᵐ⁺¹', 'Result.', 'மீ.பொ.வ = aᵐ⁺¹.', 'a^{m+1}']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-iii', '3.9', 2, 'iii', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 2a² + a, 4a² − 1', 'மீ.பொ.வ காண்க: 2a² + a, 4a² − 1',
      '2. Find the GCD of the following:\n(iii) 2a² + a, 4a² − 1',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(iii) 2a² + a, 4a² − 1',
      '2a^2 + a,\\; 4a^2 - 1', '2a + 1', '2a + 1', '2a + 1', [
        ['2a² + a = a(2a + 1); 4a² − 1 = (2a + 1)(2a − 1)', 'Factorise both polynomials.', 'இரு கோவைகளையும் காரணிப்படுத்தவும்.', 'a(2a+1),\\; (2a+1)(2a-1)'],
        ['GCD = 2a + 1', 'Common factor is (2a + 1).', 'பொதுக் காரணி (2a + 1).', '2a + 1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-iv', '3.9', 2, 'iv', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of 3a², 5b³, 7c⁴', 'மீ.பொ.வ காண்க: 3a², 5b³, 7c⁴',
      '2. Find the GCD of the following:\n(iv) 3a², 5b³, 7c⁴',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(iv) 3a², 5b³, 7c⁴',
      '3a^2,\\; 5b^3,\\; 7c^4', '1', '1', '1', [
        ['GCD(3, 5, 7) = 1 and variables a, b, c are distinct', 'No common factor other than 1.', 'பொதுக் காரணி 1 மட்டுமே.', '1'],
        ['GCD = 1', 'Result.', 'மீ.பொ.வ = 1.', '1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-v', '3.9', 2, 'v', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of x⁴ − 1, x² − 1', 'மீ.பொ.வ காண்க: x⁴ − 1, x² − 1',
      '2. Find the GCD of the following:\n(v) x⁴ − 1, x² − 1',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(v) x⁴ − 1, x² − 1',
      'x^4 - 1,\\; x^2 - 1', 'x² − 1', 'x² − 1', 'x^2 - 1', [
        ['x⁴ − 1 = (x² + 1)(x² − 1)', 'Factorise x⁴ − 1.', 'x⁴ − 1 = (x² + 1)(x² − 1).', '(x^2 + 1)(x^2 - 1)'],
        ['GCD(x⁴ − 1, x² − 1) = x² − 1', 'Common factor is x² − 1 = (x + 1)(x − 1).', 'பொதுக் காரணி x² − 1.', 'x^2 - 1']
      ], 'easy'),

    item('g9-ch3-ex3.9-q2-vi', '3.9', 2, 'vi', 'GCD of Polynomials', 'பல்லுறுப்புக் கோவைகளின் மீ.பொ.வ',
      'GCD of a³ − 9ax², (a − 3x)²', 'மீ.பொ.வ காண்க: a³ − 9ax², (a − 3x)²',
      '2. Find the GCD of the following:\n(vi) a³ − 9ax², (a − 3x)²',
      '2. கீழ்க்காண்பனவற்றிற்கு மீ.பொ.வ காண்க.\n(vi) a³ − 9ax², (a − 3x)²',
      'a^3 - 9ax^2,\\; (a - 3x)^2', 'a − 3x', 'a − 3x', 'a - 3x', [
        ['a³ − 9ax² = a(a² − 9x²) = a(a + 3x)(a − 3x)', 'Factorise first expression.', 'முதல் கோவையைக் காரணிப்படுத்தவும்.', 'a(a + 3x)(a - 3x)'],
        ['Common factor with (a − 3x)² is (a − 3x)', 'Lowest power of (a − 3x) is 1.', 'பொதுக் காரணி (a − 3x).', 'a - 3x']
      ], 'medium')
  ];

  for (const entry of entries) {
    if (grade.items.some(q => q.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Algebra source ID ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
