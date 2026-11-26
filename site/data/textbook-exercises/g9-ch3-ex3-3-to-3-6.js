/* Grade 9 Algebra Chapter 3 — Exercises 3.3, 3.4, 3.5, 3.6 (2025 EN + TA complete).
 * Sources: G9_Algebra_English_2025_Chapter3.pdf pp. 19–30; G9_Algebra_Tamil_2025_Chapter3.pdf pp. 21–33.
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
      eq,
      en,
      ta,
      math: tex(mLatex || eq, eq, false)
    })),
    answer: ansEn,
    answerTa: ansTa,
    answerMath: tex(`\\boxed{${ansTex}}`, ansEn, false),
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending'
  });

  const entries = [
    // ==================== EXERCISE 3.3 (15 items) ====================
    item('g9-ch3-ex3.3-q1', '3.3', 1, '', 'Remainder & Factor Theorem', 'மீதி மற்றும் காரணித் தேற்றம்',
      'Check if p(x) is a multiple of g(x)', 'p(x) என்பது g(x)-இன் மடங்கா எனச் சரிபார்த்தல்',
      '1. Check whether p(x) is a multiple of g(x) or not.\np(x) = x³ − 5x² + 4x − 3; g(x) = x − 2',
      '1. p(x) = x³ − 5x² + 4x − 3 என்ற பல்லுறுப்புக் கோவை g(x) = x − 2 என்ற பல்லுறுப்புக் கோவையின் மடங்கா எனச் சரிபார்க்க.',
      'p(x) = x^3 - 5x^2 + 4x - 3,\\quad g(x) = x - 2',
      'No, p(x) is not a multiple of g(x) (remainder = −7)', 'இல்லை, p(x) என்பது g(x)-இன் மடங்கல்ல (மீதி = −7)',
      '\\text{Not a multiple } (p(2) = -7 \\ne 0)', [
        ['x - 2 = 0 ⇒ x = 2', 'Set g(x) = 0 to find the zero of the divisor x − 2.', 'வகுத்தி g(x) = 0 என வைத்து பூச்சியம் காண்க.', 'x - 2 = 0 \\implies x = 2'],
        ['p(2) = 2³ − 5(2)² + 4(2) − 3 = 8 − 20 + 8 − 3 = −7', 'By Remainder Theorem, evaluate p(2).', 'மீதித் தேற்றப்படி p(2) மதிப்பைக் காண்க.', 'p(2) = 8 - 20 + 8 - 3 = -7 \\ne 0'],
        ['p(2) ≠ 0 ⇒ Not a multiple', 'Since remainder ≠ 0, p(x) is not a multiple of g(x).', 'மீதி பூச்சியமல்ல என்பதால் மடங்கல்ல.', 'p(2) \\ne 0 \\implies \\text{Not a multiple}']
      ], 'easy'),

    item('g9-ch3-ex3.3-q2-i', '3.3', 2, 'i', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Find remainder when p(x) is divided by x + 1', 'மீதி காண்க: p(x) ÷ (x + 1)',
      '2. By remainder theorem, find the remainder when p(x) is divided by g(x) where\n(i) p(x) = x³ − 2x² − 4x − 1; g(x) = x + 1',
      '2. மீதித் தேற்றத்தைப் பயன்படுத்தி, p(x)-ஐ g(x)-ஆல் வகுக்கக் கிடைக்கும் மீதியைக் காண்க.\n(i) p(x) = x³ − 2x² − 4x − 1; g(x) = x + 1',
      'p(x) = x^3 - 2x^2 - 4x - 1,\\quad g(x) = x + 1',
      'Remainder = 0', 'மீதி = 0', '0', [
        ['x + 1 = 0 ⇒ x = −1', 'Find the zero of g(x) = x + 1.', 'g(x) = x + 1-இன் பூச்சியம் காண்க.', 'x + 1 = 0 \\implies x = -1'],
        ['p(−1) = (−1)³ − 2(−1)² − 4(−1) − 1', 'Substitute x = −1 into p(x).', 'p(x)-இல் x = −1 எனப் பிரதியிட.', 'p(-1) = (-1)^3 - 2(-1)^2 - 4(-1) - 1'],
        ['= −1 − 2 + 4 − 1 = 0', 'Simplify to get the remainder 0.', 'சுருக்கக் கிடைக்கும் மீதி 0.', '-1 - 2 + 4 - 1 = 0']
      ], 'easy'),

    item('g9-ch3-ex3.3-q2-ii', '3.3', 2, 'ii', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Find remainder when p(x) is divided by 2x − 1', 'மீதி காண்க: p(x) ÷ (2x − 1)',
      '2. By remainder theorem, find the remainder when p(x) is divided by g(x) where\n(ii) p(x) = 4x³ − 12x² + 14x − 3; g(x) = 2x − 1',
      '2. மீதித் தேற்றத்தைப் பயன்படுத்தி, p(x)-ஐ g(x)-ஆல் வகுக்கக் கிடைக்கும் மீதியைக் காண்க.\n(ii) p(x) = 4x³ − 12x² + 14x − 3; g(x) = 2x − 1',
      'p(x) = 4x^3 - 12x^2 + 14x - 3,\\quad g(x) = 2x - 1',
      'Remainder = 3/2', 'மீதி = 3/2', '\\dfrac{3}{2}', [
        ['2x − 1 = 0 ⇒ x = 1/2', 'Find the zero of g(x) = 2x − 1.', 'g(x) = 2x − 1-இன் பூச்சியம் காண்க.', '2x - 1 = 0 \\implies x = \\dfrac{1}{2}'],
        ['p(1/2) = 4(1/2)³ − 12(1/2)² + 14(1/2) − 3', 'Substitute x = 1/2 into p(x).', 'p(x)-இல் x = 1/2 எனப் பிரதியிட.', 'p\\!\\left(\\dfrac{1}{2}\\right) = 4\\left(\\dfrac{1}{8}\\right) - 12\\left(\\dfrac{1}{4}\\right) + 14\\left(\\dfrac{1}{2}\\right) - 3'],
        ['= 1/2 − 3 + 7 − 3 = 3/2', 'Combine terms to get remainder 3/2.', 'சுருக்கக் கிடைக்கும் மீதி 3/2.', '\\dfrac{1}{2} - 3 + 7 - 3 = \\dfrac{3}{2}']
      ], 'medium'),

    item('g9-ch3-ex3.3-q2-iii', '3.3', 2, 'iii', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Find remainder when p(x) is divided by x − 3', 'மீதி காண்க: p(x) ÷ (x − 3)',
      '2. By remainder theorem, find the remainder when p(x) is divided by g(x) where\n(iii) p(x) = x³ − 3x² + 4x + 50; g(x) = x − 3',
      '2. மீதித் தேற்றத்தைப் பயன்படுத்தி, p(x)-ஐ g(x)-ஆல் வகுக்கக் கிடைக்கும் மீதியைக் காண்க.\n(iii) p(x) = x³ − 3x² + 4x + 50; g(x) = x − 3',
      'p(x) = x^3 - 3x^2 + 4x + 50,\\quad g(x) = x - 3',
      'Remainder = 62', 'மீதி = 62', '62', [
        ['x − 3 = 0 ⇒ x = 3', 'Find the zero of g(x) = x − 3.', 'g(x) = x − 3-இன் பூச்சியம் காண்க.', 'x - 3 = 0 \\implies x = 3'],
        ['p(3) = 3³ − 3(3)² + 4(3) + 50', 'Substitute x = 3 into p(x).', 'p(x)-இல் x = 3 எனப் பிரதியிட.', 'p(3) = 27 - 27 + 12 + 50'],
        ['= 62', 'Simplify to get remainder 62.', 'சுருக்கக் கிடைக்கும் மீதி 62.', '62']
      ], 'easy'),

    item('g9-ch3-ex3.3-q3', '3.3', 3, '', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Find remainder when 3x³ − 4x² + 7x − 5 is divided by (x + 3)', '(x + 3)-ஆல் வகுக்கக் கிடைக்கும் மீதி',
      '3. Find the remainder when 3x³ − 4x² + 7x − 5 is divided by (x + 3).',
      '3. 3x³ − 4x² + 7x − 5 என்ற பல்லுறுப்புக் கோவையை (x + 3)-ஆல் வகுக்கக் கிடைக்கும் மீதியைக் காண்க.',
      '(3x^3 - 4x^2 + 7x - 5) \\div (x + 3)',
      'Remainder = −143', 'மீதி = −143', '-143', [
        ['x + 3 = 0 ⇒ x = −3', 'Zero of (x + 3) is x = −3.', '(x + 3)-இன் பூச்சியம் x = −3.', 'x + 3 = 0 \\implies x = -3'],
        ['p(−3) = 3(−3)³ − 4(−3)² + 7(−3) − 5', 'Evaluate p(−3).', 'p(−3) மதிப்பைக் காண்க.', 'p(-3) = 3(-27) - 4(9) + 7(-3) - 5'],
        ['= −81 − 36 − 21 − 5 = −143', 'Add the terms carefully.', 'உறுப்புகளைக் கூட்ட மீதி −143.', '-81 - 36 - 21 - 5 = -143']
      ], 'easy'),

    item('g9-ch3-ex3.3-q4', '3.3', 4, '', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Find remainder when x²⁰¹⁸ + 2018 is divided by (x − 1)', 'x²⁰¹⁸ + 2018-ஐ (x − 1)-ஆல் வகுக்கக் கிடைக்கும் மீதி',
      '4. What is the remainder when x²⁰¹⁸ + 2018 is divided by x − 1?',
      '4. x²⁰¹⁸ + 2018 என்ற பல்லுறுப்புக் கோவையை x − 1-ஆல் வகுக்கக் கிடைக்கும் மீதியைக் காண்க.',
      '(x^{2018} + 2018) \\div (x - 1)',
      'Remainder = 2019', 'மீதி = 2019', '2019', [
        ['x − 1 = 0 ⇒ x = 1', 'Zero of (x − 1) is x = 1.', '(x − 1)-இன் பூச்சியம் x = 1.', 'x - 1 = 0 \\implies x = 1'],
        ['p(1) = 1²⁰¹⁸ + 2018 = 1 + 2018 = 2019', 'Evaluate p(1) since 1²⁰¹⁸ = 1.', '1²⁰¹⁸ = 1 என்பதால் p(1) = 2019.', 'p(1) = 1^{2018} + 2018 = 2019']
      ], 'easy'),

    item('g9-ch3-ex3.3-q5', '3.3', 5, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Find k when p(x) is divisible by (x − 2)', '(x − 2)-ஆல் மீதியின்றி வகுத்தால் k மதிப்பு காண்க',
      '5. For what value of k is the polynomial p(x) = 2x³ − kx² + 3x + 10 exactly divisible by (x − 2)?',
      '5. p(x) = 2x³ − kx² + 3x + 10 என்ற பல்லுறுப்புக் கோவையை (x − 2)-ஆல் மீதியின்றி வகுத்தால் k-இன் மதிப்பைக் காண்க.',
      'p(x) = 2x^3 - kx^2 + 3x + 10,\\quad (x - 2) \\mid p(x)',
      'k = 8', 'k = 8', 'k = 8', [
        ['p(2) = 0', 'Since (x − 2) divides p(x) exactly, remainder p(2) = 0.', '(x − 2) மீதியின்றி வகுப்பதால் p(2) = 0.', 'p(2) = 0'],
        ['2(2)³ − k(2)² + 3(2) + 10 = 0', 'Substitute x = 2.', 'x = 2 எனப் பிரதியிட.', '16 - 4k + 6 + 10 = 0'],
        ['32 − 4k = 0 ⇒ k = 8', 'Solve for k.', 'k-இன் மதிப்பு காண்க.', '32 - 4k = 0 \\implies k = 8']
      ], 'medium'),

    item('g9-ch3-ex3.3-q6', '3.3', 6, '', 'Remainder Theorem', 'மீதித் தேற்றம்',
      'Equal remainders when divided by (x − 3)', 'சம மீதிகள் எனில் a மற்றும் மீதி காண்க',
      '6. If two polynomials 2x³ + ax² + 4x − 12 and x³ + x² − 2x + a leave the same remainder when divided by (x − 3), find the value of a and also find the remainder.',
      '6. 2x³ + ax² + 4x − 12 மற்றும் x³ + x² − 2x + a என்ற இரு பல்லுறுப்புக் கோவைகளை (x − 3)-ஆல் வகுக்கக் கிடைக்கும் மீதிகள் சமமானால், a-இன் மதிப்பைக் காண்க. மேலும் அதன் மீதியைக் காண்க.',
      'p(x) = 2x^3 + ax^2 + 4x - 12,\\; q(x) = x^3 + x^2 - 2x + a,\\; p(3) = q(3)',
      'a = −3; remainder = 27', 'a = −3; மீதி = 27', 'a = -3,\\; \\text{Remainder} = 27', [
        ['p(3) = 2(27) + 9a + 12 − 12 = 54 + 9a', 'Find remainder of first polynomial at x = 3.', 'முதல் கோவைக்கு x = 3-இல் மீதி காண்க.', 'p(3) = 54 + 9a'],
        ['q(3) = 27 + 9 − 6 + a = 30 + a', 'Find remainder of second polynomial at x = 3.', 'இரண்டாவது கோவைக்கு x = 3-இல் மீதி காண்க.', 'q(3) = 30 + a'],
        ['54 + 9a = 30 + a ⇒ 8a = −24 ⇒ a = −3', 'Equate p(3) = q(3) and solve for a.', 'p(3) = q(3) எனச் சமப்படுத்தி a காண்க.', '8a = -24 \\implies a = -3'],
        ['Remainder = 30 + (−3) = 27', 'Substitute a = −3 to get the common remainder.', 'a = −3 எனப் பிரதியிட மீதி 27.', '\\text{Remainder} = 27']
      ], 'medium'),

    item('g9-ch3-ex3.3-q7-i', '3.3', 7, 'i', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Check if (x − 1) is a factor of x³ + 5x² − 10x + 4', '(x − 1) காரணியா எனச் சரிபார்க்க',
      '7. Determine whether (x − 1) is a factor of the following polynomials:\n(i) x³ + 5x² − 10x + 4',
      '7. கீழ்க்காணும் பல்லுறுப்புக் கோவைகளுக்கு (x − 1) என்பது காரணியா எனக் காண்க.\n(i) x³ + 5x² − 10x + 4',
      'p(x) = x^3 + 5x^2 - 10x + 4',
      'Yes, (x − 1) is a factor', 'ஆம், (x − 1) ஒரு காரணி', '\\text{Yes, } (x - 1) \\text{ is a factor}', [
        ['p(1) = 1³ + 5(1)² − 10(1) + 4', 'By Factor Theorem, check p(1).', 'காரணித் தேற்றப்படி p(1) காண்க.', 'p(1) = 1 + 5 - 10 + 4'],
        ['= 0 ⇒ (x − 1) is a factor', 'Since p(1) = 0, (x − 1) is a factor.', 'p(1) = 0 என்பதால் (x − 1) ஒரு காரணி.', 'p(1) = 0']
      ], 'easy'),

    item('g9-ch3-ex3.3-q7-ii', '3.3', 7, 'ii', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Check if (x − 1) is a factor of x⁴ + 5x² − 5x + 1', '(x − 1) காரணியா எனச் சரிபார்க்க',
      '7. Determine whether (x − 1) is a factor of the following polynomials:\n(ii) x⁴ + 5x² − 5x + 1',
      '7. கீழ்க்காணும் பல்லுறுப்புக் கோவைகளுக்கு (x − 1) என்பது காரணியா எனக் காண்க.\n(ii) x⁴ + 5x² − 5x + 1',
      'p(x) = x^4 + 5x^2 - 5x + 1',
      'No, (x − 1) is not a factor', 'இல்லை, (x − 1) காரணி அல்ல', '\\text{No, } p(1) = 2 \\ne 0', [
        ['p(1) = 1⁴ + 5(1)² − 5(1) + 1', 'Evaluate p(1).', 'p(1) மதிப்பைக் காண்க.', 'p(1) = 1 + 5 - 5 + 1'],
        ['= 2 ≠ 0 ⇒ (x − 1) is not a factor', 'Since p(1) ≠ 0, (x − 1) is not a factor.', 'p(1) ≠ 0 என்பதால் (x − 1) காரணி அல்ல.', 'p(1) = 2 \\ne 0']
      ], 'easy'),

    item('g9-ch3-ex3.3-q8', '3.3', 8, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Show that (x − 5) is a factor of 2x³ − 5x² − 28x + 15', '(x − 5) ஒரு காரணி எனக் காட்டுக',
      '8. Using factor theorem, show that (x − 5) is a factor of the polynomial 2x³ − 5x² − 28x + 15.',
      '8. காரணித் தேற்றத்தைப் பயன்படுத்தி 2x³ − 5x² − 28x + 15 என்ற பல்லுறுப்புக் கோவைக்கு (x − 5) என்பது ஒரு காரணி எனக் காட்டுக.',
      'p(x) = 2x^3 - 5x^2 - 28x + 15',
      '(x − 5) is a factor (since p(5) = 0)', '(x − 5) ஒரு காரணி (p(5) = 0)', 'p(5) = 0 \\implies (x - 5) \\text{ is a factor}', [
        ['p(5) = 2(5)³ − 5(5)² − 28(5) + 15', 'Evaluate p(5) for divisor (x − 5).', 'x = 5 எனப் பிரதியிட்டு p(5) காண்க.', 'p(5) = 2(125) - 5(25) - 140 + 15'],
        ['= 250 − 125 − 140 + 15 = 0', 'Simplify; p(5) = 0 proves (x − 5) is a factor.', 'p(5) = 0 என்பதால் (x − 5) ஒரு காரணி.', '250 - 125 - 140 + 15 = 0']
      ], 'easy'),

    item('g9-ch3-ex3.3-q9', '3.3', 9, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Determine m if (x + 3) is a factor', '(x + 3) காரணி எனில் m மதிப்பு காண்க',
      '9. Determine the value of m, if (x + 3) is a factor of x³ − 3x² − mx + 24.',
      '9. x³ − 3x² − mx + 24 என்ற பல்லுறுப்புக் கோவைக்கு (x + 3) என்பது ஒரு காரணி எனில், m-இன் மதிப்பைக் காண்க.',
      'p(x) = x^3 - 3x^2 - mx + 24,\\quad p(-3) = 0',
      'm = 10', 'm = 10', 'm = 10', [
        ['x + 3 = 0 ⇒ x = −3; p(−3) = 0', 'By Factor Theorem, p(−3) = 0.', 'காரணித் தேற்றப்படி p(−3) = 0.', 'p(-3) = 0'],
        ['(−3)³ − 3(−3)² − m(−3) + 24 = 0', 'Substitute x = −3.', 'x = −3 எனப் பிரதியிட.', '-27 - 27 + 3m + 24 = 0'],
        ['3m − 30 = 0 ⇒ m = 10', 'Solve for m.', 'm மதிப்பு காண்க.', '3m = 30 \\implies m = 10']
      ], 'medium'),

    item('g9-ch3-ex3.3-q10', '3.3', 10, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Show that a = b when (x − 2) and (x − 1/2) are factors', 'a = b என நிறுவுக',
      '10. If both (x − 2) and (x − 1/2) are the factors of ax² + 5x + b, then show that a = b.',
      '10. ax² + 5x + b என்ற பல்லுறுப்புக் கோவைக்கு (x − 2) மற்றும் (x − 1/2) ஆகியவை காரணிகள் எனில், a = b எனக் காட்டுக.',
      'p(x) = ax^2 + 5x + b,\\quad p(2) = 0,\\; p\\!\\left(\\dfrac{1}{2}\\right) = 0',
      'a = b (and a = b = −2)', 'a = b என நிரூபிக்கப்பட்டது (a = b = −2)', 'a = b', [
        ['p(2) = 0 ⇒ 4a + 10 + b = 0', 'Use factor (x − 2).', '(x − 2) காரணி என்பதால் p(2) = 0.', '4a + 10 + b = 0'],
        ['p(1/2) = 0 ⇒ a/4 + 5/2 + b = 0 ⇒ a + 10 + 4b = 0', 'Use factor (x − 1/2) and multiply by 4.', '(x − 1/2) காரணி என்பதால் p(1/2) = 0.', 'a + 10 + 4b = 0'],
        ['4a + b = a + 4b ⇒ 3a = 3b ⇒ a = b', 'Equate −10 = 4a + b = a + 4b and simplify.', 'இரு சமன்பாடுகளையும் சமப்படுத்த a = b கிடைக்கும்.', '3a = 3b \\implies a = b']
      ], 'difficult'),

    item('g9-ch3-ex3.3-q11', '3.3', 11, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Find k when (x − 1) divides kx³ − 2x² + 25x − 26', '(x − 1) மீதியின்றி வகுத்தால் k காண்க',
      '11. If (x − 1) divides the polynomial kx³ − 2x² + 25x − 26 without remainder, then find the value of k.',
      '11. (x − 1) என்பது kx³ − 2x² + 25x − 26-ஐ மீதியின்றி வகுக்குமெனில் k-இன் மதிப்பைக் காண்க.',
      'p(x) = kx^3 - 2x^2 + 25x - 26,\\quad p(1) = 0',
      'k = 3', 'k = 3', 'k = 3', [
        ['p(1) = 0', 'Zero remainder means p(1) = 0.', 'மீதியின்றி வகுப்பதால் p(1) = 0.', 'p(1) = 0'],
        ['k(1)³ − 2(1)² + 25(1) − 26 = 0', 'Substitute x = 1.', 'x = 1 எனப் பிரதியிட.', 'k - 2 + 25 - 26 = 0'],
        ['k − 3 = 0 ⇒ k = 3', 'Solve for k.', 'k = 3.', 'k = 3']
      ], 'easy'),

    item('g9-ch3-ex3.3-q12', '3.3', 12, '', 'Factor Theorem', 'காரணித் தேற்றம்',
      'Check if (x + 2) and (x − 4) are sides of rectangle', 'செவ்வகத்தின் பக்கங்களா எனச் சரிபார்க்க',
      '12. Check if (x + 2) and (x − 4) are the sides of a rectangle whose area is x² − 2x − 8 by using factor theorem.',
      '12. x² − 2x − 8 என்பது ஒரு செவ்வகத்தின் பரப்பு எனில், (x + 2) மற்றும் (x − 4) என்பன அவற்றின் பக்கங்களா என்பதைக் காரணித் தேற்றத்தைப் பயன்படுத்திச் சரிபார்க்க.',
      'A(x) = x^2 - 2x - 8',
      'Yes, (x + 2) and (x − 4) are the sides (for x > 4)', 'ஆம், (x + 2) மற்றும் (x − 4) பக்கங்கள் ஆகும் (x > 4)', '(x + 2) \\text{ and } (x - 4) \\text{ are factors}', [
        ['A(−2) = (−2)² − 2(−2) − 8 = 4 + 4 − 8 = 0', 'Check if (x + 2) is a factor.', '(x + 2) காரணியா எனச் சரிபார்க்க.', 'A(-2) = 4 + 4 - 8 = 0'],
        ['A(4) = 4² − 2(4) − 8 = 16 − 8 − 8 = 0', 'Check if (x − 4) is a factor.', '(x − 4) காரணியா எனச் சரிபார்க்க.', 'A(4) = 16 - 8 - 8 = 0'],
        ['(x + 2)(x − 4) = x² − 2x − 8', 'Both are factors whose product equals the area (with x > 4 for positive lengths).', 'இரண்டும் காரணிகள்; பெருக்கற்பலன் பரப்புக்குச் சமம் (x > 4).', '(x+2)(x-4) = x^2 - 2x - 8']
      ], 'medium'),

    // ==================== EXERCISE 3.4 (25 items) ====================
    item('g9-ch3-ex3.4-q1-i', '3.4', 1, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (x + 2y + 3z)²', 'விரிவாக்குக: (x + 2y + 3z)²',
      '1. Expand the following:\n(i) (x + 2y + 3z)²',
      '1. கீழ்க்காண்பனவற்றை விரிவாக்குக:\n(i) (x + 2y + 3z)²',
      '(x + 2y + 3z)^2',
      'x² + 4y² + 9z² + 4xy + 12yz + 6xz', 'x² + 4y² + 9z² + 4xy + 12yz + 6xz',
      'x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6xz', [
        ['(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca', 'Use the trinomial square identity with a = x, b = 2y, c = 3z.', 'a = x, b = 2y, c = 3z என முற்றொருமையைப் பயன்படுத்த.', '(a+b+c)^2 = a^2+b^2+c^2+2ab+2bc+2ca'],
        ['= x² + (2y)² + (3z)² + 2(x)(2y) + 2(2y)(3z) + 2(3z)(x)', 'Substitute and expand.', 'பிரதியிட்டு விரித்தெழுத.', 'x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6xz']
      ], 'easy'),

    item('g9-ch3-ex3.4-q1-ii', '3.4', 1, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (−p + 2q + 3r)²', 'விரிவாக்குக: (−p + 2q + 3r)²',
      '1. Expand the following:\n(ii) (−p + 2q + 3r)²',
      '1. கீழ்க்காண்பனவற்றை விரிவாக்குக:\n(ii) (−p + 2q + 3r)²',
      '(-p + 2q + 3r)^2',
      'p² + 4q² + 9r² − 4pq + 12qr − 6pr', 'p² + 4q² + 9r² − 4pq + 12qr − 6pr',
      'p^2 + 4q^2 + 9r^2 - 4pq + 12qr - 6pr', [
        ['a = −p, b = 2q, c = 3r', 'Apply (a + b + c)² keeping the minus sign on −p.', 'a = −p, b = 2q, c = 3r எனப் பிரதியிட.', 'a = -p,\\; b = 2q,\\; c = 3r'],
        ['= (−p)² + (2q)² + (3r)² + 2(−p)(2q) + 2(2q)(3r) + 2(3r)(−p)', 'Simplify each term.', 'சுருக்க.', 'p^2 + 4q^2 + 9r^2 - 4pq + 12qr - 6pr']
      ], 'easy'),

    item('g9-ch3-ex3.4-q1-iii', '3.4', 1, 'iii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (2p + 3)(2p − 4)(2p − 5)', 'விரிவாக்குக: (2p + 3)(2p − 4)(2p − 5)',
      '1. Expand the following:\n(iii) (2p + 3)(2p − 4)(2p − 5)',
      '1. கீழ்க்காண்பனவற்றை விரிவாக்குக:\n(iii) (2p + 3)(2p − 4)(2p − 5)',
      '(2p + 3)(2p - 4)(2p - 5)',
      '8p³ − 24p² − 14p + 60', '8p³ − 24p² − 14p + 60',
      '8p^3 - 24p^2 - 14p + 60', [
        ['(x + a)(x + b)(x + c) = x³ + (a+b+c)x² + (ab+bc+ca)x + abc', 'Use x = 2p, a = 3, b = −4, c = −5.', 'x = 2p, a = 3, b = −4, c = −5 எனப் பிரதியிட.', 'x = 2p,\\; a=3,\\; b=-4,\\; c=-5'],
        ['(2p)³ + (−6)(2p)² + (−12 + 20 − 15)(2p) + 3(−4)(−5)', 'Compute each coefficient.', 'ஒவ்வொரு கெழுவையும் கணக்கிட.', '8p^3 - 24p^2 - 14p + 60']
      ], 'medium'),

    item('g9-ch3-ex3.4-q1-iv', '3.4', 1, 'iv', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (3a + 1)(3a − 2)(3a + 4)', 'விரிவாக்குக: (3a + 1)(3a − 2)(3a + 4)',
      '1. Expand the following:\n(iv) (3a + 1)(3a − 2)(3a + 4)',
      '1. கீழ்க்காண்பனவற்றை விரிவாக்குக:\n(iv) (3a + 1)(3a − 2)(3a + 4)',
      '(3a + 1)(3a - 2)(3a + 4)',
      '27a³ + 27a² − 18a − 8', '27a³ + 27a² − 18a − 8',
      '27a^3 + 27a^2 - 18a - 8', [
        ['x = 3a, a₁ = 1, b₁ = −2, c₁ = 4', 'Apply (x+a₁)(x+b₁)(x+c₁).', 'x = 3a, a₁=1, b₁=−2, c₁=4 எனப் பிரதியிட.', 'x = 3a,\\; 1+(-2)+4=3,\\; (-2-8+4)=-6,\\; 1(-2)(4)=-8'],
        ['= (3a)³ + 3(3a)² − 6(3a) − 8 = 27a³ + 27a² − 18a − 8', 'Simplify.', 'சுருக்க.', '27a^3 + 27a^2 - 18a - 8']
      ], 'medium'),

    item('g9-ch3-ex3.4-q2-i', '3.4', 2, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Coefficients of (x + 5)(x + 6)(x + 7) without expansion', 'விரிவாக்காமல் கெழுக்கள் காண்க: (x+5)(x+6)(x+7)',
      '2. Using algebraic identity, find the coefficients of x², x and constant term without actual expansion.\n(i) (x + 5)(x + 6)(x + 7)',
      '2. முழுவதும் விரிவாக்காமல் x²-இன் கெழு, x-இன் கெழு மற்றும் மாறிலி உறுப்புகளை இயற்கணித முற்றொருமையைப் பயன்படுத்திக் காண்க.\n(i) (x + 5)(x + 6)(x + 7)',
      '(x + 5)(x + 6)(x + 7)',
      'x² coeff: 18; x coeff: 107; constant: 210', 'x² கெழு: 18; x கெழு: 107; மாறிலி: 210',
      '\\text{coeff}(x^2)=18,\\; \\text{coeff}(x)=107,\\; \\text{const}=210', [
        ['coeff(x²) = a + b + c = 5 + 6 + 7 = 18', 'Sum of constants gives x² coefficient.', 'a + b + c என்பது x²-இன் கெழு.', '5 + 6 + 7 = 18'],
        ['coeff(x) = ab + bc + ca = 30 + 42 + 35 = 107', 'Sum of pairwise products gives x coefficient.', 'ab + bc + ca என்பது x-இன் கெழு.', '30 + 42 + 35 = 107'],
        ['constant = abc = 5 × 6 × 7 = 210', 'Product gives the constant term.', 'abc என்பது மாறிலி உறுப்பு.', '5 \\times 6 \\times 7 = 210']
      ], 'easy'),

    item('g9-ch3-ex3.4-q2-ii', '3.4', 2, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Coefficients of (2x + 3)(2x − 5)(2x − 6) without expansion', 'விரிவாக்காமல் கெழுக்கள் காண்க: (2x+3)(2x−5)(2x−6)',
      '2. Using algebraic identity, find the coefficients of x², x and constant term without actual expansion.\n(ii) (2x + 3)(2x − 5)(2x − 6)',
      '2. முழுவதும் விரிவாக்காமல் x²-இன் கெழு, x-இன் கெழு மற்றும் மாறிலி உறுப்புகளை இயற்கணித முற்றொருமையைப் பயன்படுத்திக் காண்க.\n(ii) (2x + 3)(2x − 5)(2x − 6)',
      '(2x + 3)(2x - 5)(2x - 6)',
      'x² coeff: −32; x coeff: −6; constant: 90', 'x² கெழு: −32; x கெழு: −6; மாறிலி: 90',
      '\\text{coeff}(x^2)=-32,\\; \\text{coeff}(x)=-6,\\; \\text{const}=90', [
        ['Let u = 2x: (u+3)(u−5)(u−6)', 'Identify a = 3, b = −5, c = −6.', 'u = 2x என்க; a=3, b=−5, c=−6.', 'a=3,\\; b=-5,\\; c=-6'],
        ['coeff(x²) = (a+b+c)·2² = (−8)(4) = −32', 'Multiply (a+b+c) by 2² = 4.', '(a+b+c) × 4 = −32.', '(-8)(4) = -32'],
        ['coeff(x) = (ab+bc+ca)·2 = (−15+30−18)(2) = −6; const = 3(−5)(−6) = 90', 'Multiply (ab+bc+ca) by 2; constant = abc.', '(ab+bc+ca) × 2 = −6; மாறிலி = 90.', '(-3)(2)=-6,\\; 3(-5)(-6)=90']
      ], 'medium'),

    item('g9-ch3-ex3.4-q3-i', '3.4', 3, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find a + b + c', 'a + b + c மதிப்பு காண்க',
      '3. If (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70, find the value of\n(i) a + b + c',
      '3. (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70 எனில், கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(i) a + b + c',
      '(x+a)(x+b)(x+c) = x^3 + 14x^2 + 59x + 70',
      '14', '14', '14', [
        ['(x+a)(x+b)(x+c) = x³ + (a+b+c)x² + (ab+bc+ca)x + abc', 'Compare coefficients of x².', 'x²-இன் கெழுவை ஒப்பிட.', 'a + b + c = 14'],
        ['a + b + c = 14', 'Direct match with coefficient of x².', 'x²-இன் கெழு 14.', '14']
      ], 'easy'),

    item('g9-ch3-ex3.4-q3-ii', '3.4', 3, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find 1/a + 1/b + 1/c', '1/a + 1/b + 1/c மதிப்பு காண்க',
      '3. If (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70, find the value of\n(ii) 1/a + 1/b + 1/c',
      '3. (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70 எனில், கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(ii) 1/a + 1/b + 1/c',
      '\\dfrac{1}{a} + \\dfrac{1}{b} + \\dfrac{1}{c}',
      '59/70', '59/70', '\\dfrac{59}{70}', [
        ['ab + bc + ca = 59, abc = 70', 'Read x coefficient and constant term.', 'ab + bc + ca = 59 மற்றும் abc = 70.', 'ab+bc+ca = 59,\\; abc = 70'],
        ['1/a + 1/b + 1/c = (bc + ca + ab)/(abc) = 59/70', 'Combine fractions over abc.', 'பொதுப் பகுதி abc எடுத்துக் கூட்ட 59/70.', '\\dfrac{ab+bc+ca}{abc} = \\dfrac{59}{70}']
      ], 'medium'),

    item('g9-ch3-ex3.4-q3-iii', '3.4', 3, 'iii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find a² + b² + c²', 'a² + b² + c² மதிப்பு காண்க',
      '3. If (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70, find the value of\n(iii) a² + b² + c²',
      '3. (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70 எனில், கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(iii) a² + b² + c²',
      'a^2 + b^2 + c^2',
      '78', '78', '78', [
        ['a² + b² + c² = (a + b + c)² − 2(ab + bc + ca)', 'Use the trinomial square identity.', 'முற்றொருமையைப் பயன்படுத்த.', 'a^2+b^2+c^2 = (a+b+c)^2 - 2(ab+bc+ca)'],
        ['= 14² − 2(59) = 196 − 118 = 78', 'Substitute 14 and 59.', '14 மற்றும் 59 எனப் பிரதியிட.', '196 - 118 = 78']
      ], 'medium'),

    item('g9-ch3-ex3.4-q3-iv', '3.4', 3, 'iv', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find a/(bc) + b/(ac) + c/(ab)', 'a/(bc) + b/(ac) + c/(ab) மதிப்பு காண்க',
      '3. If (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70, find the value of\n(iv) a/(bc) + b/(ac) + c/(ab)',
      '3. (x + a)(x + b)(x + c) = x³ + 14x² + 59x + 70 எனில், கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(iv) a/(bc) + b/(ac) + c/(ab)',
      '\\dfrac{a}{bc} + \\dfrac{b}{ac} + \\dfrac{c}{ab}',
      '39/35', '39/35', '\\dfrac{39}{35}', [
        ['a/(bc) + b/(ac) + c/(ab) = (a² + b² + c²)/(abc)', 'Take common denominator abc.', 'பொதுப் பகுதி abc எடுக்க.', '\\dfrac{a^2+b^2+c^2}{abc}'],
        ['= 78/70 = 39/35', 'Substitute 78 and 70 and simplify.', '78/70 = 39/35.', '\\dfrac{78}{70} = \\dfrac{39}{35}']
      ], 'medium'),

    item('g9-ch3-ex3.4-q4-i', '3.4', 4, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (3a − 4b)³', 'விரிவுபடுத்துக: (3a − 4b)³',
      '4. Expand:\n(i) (3a − 4b)³',
      '4. விரிவுபடுத்துக:\n(i) (3a − 4b)³',
      '(3a - 4b)^3',
      '27a³ − 108a²b + 144ab² − 64b³', '27a³ − 108a²b + 144ab² − 64b³',
      '27a^3 - 108a^2b + 144ab^2 - 64b^3', [
        ['(x − y)³ = x³ − 3x²y + 3xy² − y³', 'Use x = 3a, y = 4b.', 'x = 3a, y = 4b எனப் பிரதியிட.', '(3a)^3 - 3(3a)^2(4b) + 3(3a)(4b)^2 - (4b)^3'],
        ['= 27a³ − 108a²b + 144ab² − 64b³', 'Simplify each term.', 'சுருக்க.', '27a^3 - 108a^2b + 144ab^2 - 64b^3']
      ], 'easy'),

    item('g9-ch3-ex3.4-q4-ii', '3.4', 4, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Expand (x + 1/y)³', 'விரிவுபடுத்துக: (x + 1/y)³',
      '4. Expand:\n(ii) (x + 1/y)³',
      '4. விரிவுபடுத்துக:\n(ii) (x + 1/y)³',
      '\\left(x + \\dfrac{1}{y}\\right)^3',
      'x³ + 3x²/y + 3x/y² + 1/y³', 'x³ + 3x²/y + 3x/y² + 1/y³',
      'x^3 + \\dfrac{3x^2}{y} + \\dfrac{3x}{y^2} + \\dfrac{1}{y^3}', [
        ['(a + b)³ = a³ + 3a²b + 3ab² + b³', 'Use a = x, b = 1/y (y ≠ 0).', 'a = x, b = 1/y எனப் பிரதியிட (y ≠ 0).', 'x^3 + 3x^2\\left(\\dfrac{1}{y}\\right) + 3x\\left(\\dfrac{1}{y}\\right)^2 + \\left(\\dfrac{1}{y}\\right)^3'],
        ['= x³ + 3x²/y + 3x/y² + 1/y³', 'Simplify.', 'சுருக்க.', 'x^3 + \\dfrac{3x^2}{y} + \\dfrac{3x}{y^2} + \\dfrac{1}{y^3}']
      ], 'easy'),

    item('g9-ch3-ex3.4-q5-i', '3.4', 5, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Evaluate 98³ using identity', 'முற்றொருமை மூலம் 98³ காண்க',
      '5. Evaluate the following by using identities:\n(i) 98³',
      '5. இயற்கணித முற்றொருமைகளைப் பயன்படுத்திப் பின்வருவனவற்றின் மதிப்பு காண்க.\n(i) 98³',
      '98^3',
      '941192', '941192', '941192', [
        ['98³ = (100 − 2)³', 'Rewrite 98 as 100 − 2.', '98 = 100 − 2 என எழுதுக.', '98^3 = (100 - 2)^3'],
        ['= 100³ − 3(100)²(2) + 3(100)(2)² − 2³', 'Apply (a − b)³.', '(a − b)³ முற்றொருமையைப் பயன்படுத்த.', '1000000 - 60000 + 1200 - 8'],
        ['= 941192', 'Compute final value.', 'சுருக்க 941192.', '941192']
      ], 'easy'),

    item('g9-ch3-ex3.4-q5-ii', '3.4', 5, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Evaluate 1001³ using identity', 'முற்றொருமை மூலம் 1001³ காண்க',
      '5. Evaluate the following by using identities:\n(ii) 1001³',
      '5. இயற்கணித முற்றொருமைகளைப் பயன்படுத்திப் பின்வருவனவற்றின் மதிப்பு காண்க.\n(ii) 1001³',
      '1001^3',
      '1003003001', '1003003001', '1003003001', [
        ['1001³ = (1000 + 1)³', 'Rewrite 1001 as 1000 + 1.', '1001 = 1000 + 1 என எழுதுக.', '1001^3 = (1000 + 1)^3'],
        ['= 10⁹ + 3(10⁶) + 3(10³) + 1 = 1003003001', 'Apply (a + b)³ and add.', '(a + b)³ முற்றொருமையைப் பயன்படுத்தி கூட்ட.', '1000000000 + 3000000 + 3000 + 1 = 1003003001']
      ], 'easy'),

    item('g9-ch3-ex3.4-q6', '3.4', 6, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find x² + y² + z²', 'x² + y² + z² மதிப்பு காண்க',
      '6. If (x + y + z) = 9 and (xy + yz + zx) = 26, then find the value of x² + y² + z².',
      '6. (x + y + z) = 9 மற்றும் (xy + yz + zx) = 26 எனில், x² + y² + z²-இன் மதிப்பைக் காண்க.',
      'x+y+z = 9,\\quad xy+yz+zx = 26',
      '29', '29', '29', [
        ['x² + y² + z² = (x + y + z)² − 2(xy + yz + zx)', 'Use the trinomial square identity.', 'முற்றொருமையைப் பயன்படுத்த.', '(x+y+z)^2 - 2(xy+yz+zx)'],
        ['= 9² − 2(26) = 81 − 52 = 29', 'Substitute and subtract.', '81 − 52 = 29.', '81 - 52 = 29']
      ], 'easy'),

    item('g9-ch3-ex3.4-q7', '3.4', 7, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find 27a³ + 64b³', '27a³ + 64b³ மதிப்பு காண்க',
      '7. Find 27a³ + 64b³, if 3a + 4b = 10 and ab = 2.',
      '7. 3a + 4b = 10 மற்றும் ab = 2 எனில், 27a³ + 64b³-இன் மதிப்பு காண்க.',
      '3a + 4b = 10,\\quad ab = 2',
      '280', '280', '280', [
        ['27a³ + 64b³ = (3a)³ + (4b)³ = (3a + 4b)³ − 3(3a)(4b)(3a + 4b)', 'Use x³ + y³ = (x + y)³ − 3xy(x + y).', 'x³ + y³ = (x + y)³ − 3xy(x + y) முற்றொருமையைப் பயன்படுத்த.', '(3a+4b)^3 - 36ab(3a+4b)'],
        ['= 10³ − 36(2)(10) = 1000 − 720 = 280', 'Substitute 3a + 4b = 10 and ab = 2.', 'பிரதியிட 1000 − 720 = 280.', '1000 - 720 = 280']
      ], 'medium'),

    item('g9-ch3-ex3.4-q8', '3.4', 8, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find x³ − y³', 'x³ − y³ மதிப்பு காண்க',
      '8. Find x³ − y³, if x − y = 5 and xy = 14.',
      '8. x − y = 5 மற்றும் xy = 14 எனில், x³ − y³-இன் மதிப்பு காண்க.',
      'x - y = 5,\\quad xy = 14',
      '335', '335', '335', [
        ['x³ − y³ = (x − y)³ + 3xy(x − y)', 'Use cube difference identity.', 'x³ − y³ = (x − y)³ + 3xy(x − y) முற்றொருமையைப் பயன்படுத்த.', '(x-y)^3 + 3xy(x-y)'],
        ['= 5³ + 3(14)(5) = 125 + 210 = 335', 'Substitute x − y = 5 and xy = 14.', '125 + 210 = 335.', '125 + 210 = 335']
      ], 'easy'),

    item('g9-ch3-ex3.4-q9', '3.4', 9, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find a³ + 1/a³', 'a³ + 1/a³ மதிப்பு காண்க',
      '9. If a + 1/a = 6, then find the value of a³ + 1/a³.',
      '9. a + 1/a = 6 எனில், a³ + 1/a³-இன் மதிப்பு காண்க.',
      'a + \\dfrac{1}{a} = 6',
      '198', '198', '198', [
        ['a³ + 1/a³ = (a + 1/a)³ − 3(a + 1/a)', 'Apply cube identity with x = a, y = 1/a.', 'முற்றொருமையைப் பயன்படுத்த.', '\\left(a+\\dfrac{1}{a}\\right)^3 - 3\\left(a+\\dfrac{1}{a}\\right)'],
        ['= 6³ − 3(6) = 216 − 18 = 198', 'Substitute a + 1/a = 6.', '216 − 18 = 198.', '216 - 18 = 198']
      ], 'easy'),

    item('g9-ch3-ex3.4-q10', '3.4', 10, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find x + 1/x and x³ + 1/x³', 'x + 1/x மற்றும் x³ + 1/x³ காண்க',
      '10. If x² + 1/x² = 23, then find the value of x + 1/x and x³ + 1/x³.',
      '10. x² + 1/x² = 23 எனில், x + 1/x மற்றும் x³ + 1/x³ ஆகியவற்றின் மதிப்புகளைக் காண்க.',
      'x^2 + \\dfrac{1}{x^2} = 23',
      'x + 1/x = ±5; x³ + 1/x³ = ±110', 'x + 1/x = ±5; x³ + 1/x³ = ±110',
      'x + \\dfrac{1}{x} = \\pm 5,\\; x^3 + \\dfrac{1}{x^3} = \\pm 110', [
        ['(x + 1/x)² = x² + 1/x² + 2 = 23 + 2 = 25', 'Square (x + 1/x).', '(x + 1/x)² = 23 + 2 = 25.', '\\left(x+\\dfrac{1}{x}\\right)^2 = 25'],
        ['x + 1/x = ±5', 'Take square root (both +5 and −5 are valid).', 'வர்க்கமூலம் காண ±5.', 'x+\\dfrac{1}{x} = \\pm 5'],
        ['x³ + 1/x³ = (±5)³ − 3(±5) = ±(125 − 15) = ±110', 'Compute x³ + 1/x³ for both signs.', '±110.', 'x^3+\\dfrac{1}{x^3} = \\pm 110']
      ], 'medium'),

    item('g9-ch3-ex3.4-q11', '3.4', 11, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find y³ − 1/y³', 'y³ − 1/y³ மதிப்பு காண்க',
      '11. If (y − 1/y)³ = 27, then find the value of y³ − 1/y³.',
      '11. (y − 1/y)³ = 27 எனில், y³ − 1/y³-இன் மதிப்பு காண்க.',
      '\\left(y - \\dfrac{1}{y}\\right)^3 = 27',
      '36', '36', '36', [
        ['y − 1/y = ∛27 = 3', 'Take cube root of both sides.', 'கனமூலம் எடுக்க y − 1/y = 3.', 'y - \\dfrac{1}{y} = 3'],
        ['y³ − 1/y³ = (y − 1/y)³ + 3(y − 1/y) = 27 + 3(3) = 36', 'Apply cube difference identity.', '27 + 9 = 36.', '27 + 9 = 36']
      ], 'easy'),

    item('g9-ch3-ex3.4-q12-i', '3.4', 12, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Simplify (2a+3b+4c)(4a²+9b²+16c²−6ab−12bc−8ca)', 'சுருக்குக: (2a+3b+4c)(...)',
      '12. Simplify:\n(i) (2a + 3b + 4c)(4a² + 9b² + 16c² − 6ab − 12bc − 8ca)',
      '12. சுருக்குக:\n(i) (2a + 3b + 4c)(4a² + 9b² + 16c² − 6ab − 12bc − 8ca)',
      '(2a+3b+4c)(4a^2+9b^2+16c^2-6ab-12bc-8ca)',
      '8a³ + 27b³ + 64c³ − 72abc', '8a³ + 27b³ + 64c³ − 72abc',
      '8a^3 + 27b^3 + 64c^3 - 72abc', [
        ['(x+y+z)(x²+y²+z²−xy−yz−zx) = x³ + y³ + z³ − 3xyz', 'Identify x = 2a, y = 3b, z = 4c.', 'x = 2a, y = 3b, z = 4c என்க.', 'x=2a,\\; y=3b,\\; z=4c'],
        ['= (2a)³ + (3b)³ + (4c)³ − 3(2a)(3b)(4c) = 8a³ + 27b³ + 64c³ − 72abc', 'Substitute and simplify.', 'பிரதியிட்டுச் சுருக்க.', '8a^3 + 27b^3 + 64c^3 - 72abc']
      ], 'medium'),

    item('g9-ch3-ex3.4-q12-ii', '3.4', 12, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Simplify (x−2y+3z)(x²+4y²+9z²+2xy+6yz−3xz)', 'சுருக்குக: (x−2y+3z)(...)',
      '12. Simplify:\n(ii) (x − 2y + 3z)(x² + 4y² + 9z² + 2xy + 6yz − 3xz)',
      '12. சுருக்குக:\n(ii) (x − 2y + 3z)(x² + 4y² + 9z² + 2xy + 6yz − 3xz)',
      '(x-2y+3z)(x^2+4y^2+9z^2+2xy+6yz-3xz)',
      'x³ − 8y³ + 27z³ + 18xyz', 'x³ − 8y³ + 27z³ + 18xyz',
      'x^3 - 8y^3 + 27z^3 + 18xyz', [
        ['a = x, b = −2y, c = 3z', 'Apply (a+b+c)(a²+b²+c²−ab−bc−ca) = a³+b³+c³−3abc.', 'a = x, b = −2y, c = 3z என்க.', 'a=x,\\; b=-2y,\\; c=3z'],
        ['= x³ + (−2y)³ + (3z)³ − 3(x)(−2y)(3z) = x³ − 8y³ + 27z³ + 18xyz', 'Watch the signs: −3(−2) = +6.', 'குறிகளைக் கவனிக்க: −3(−2) = +6.', 'x^3 - 8y^3 + 27z^3 + 18xyz']
      ], 'medium'),

    item('g9-ch3-ex3.4-q13-i', '3.4', 13, 'i', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Evaluate 7³ − 10³ + 3³ using identity', 'முற்றொருமை மூலம் 7³ − 10³ + 3³ காண்க',
      '13. By using identity evaluate the following:\n(i) 7³ − 10³ + 3³',
      '13. முற்றொருமைகளைப் பயன்படுத்தி மதிப்பு காண்க.\n(i) 7³ − 10³ + 3³',
      '7^3 - 10^3 + 3^3',
      '−630', '−630', '-630', [
        ['a = 7, b = −10, c = 3; a + b + c = 7 − 10 + 3 = 0', 'Check the sum a + b + c.', 'a + b + c = 7 − 10 + 3 = 0.', 'a+b+c = 0'],
        ['a³ + b³ + c³ = 3abc = 3(7)(−10)(3) = −630', 'Since a+b+c=0, sum of cubes = 3abc.', 'a+b+c = 0 என்பதால் 3abc = −630.', '3(7)(-10)(3) = -630']
      ], 'easy'),

    item('g9-ch3-ex3.4-q13-ii', '3.4', 13, 'ii', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Evaluate 1 + 1/8 − 27/8 using identity', 'முற்றொருமை மூலம் 1 + 1/8 − 27/8 காண்க',
      '13. By using identity evaluate the following:\n(ii) 1 + 1/8 − 27/8',
      '13. முற்றொருமைகளைப் பயன்படுத்தி மதிப்பு காண்க.\n(ii) 1 + 1/8 − 27/8',
      '1 + \\dfrac{1}{8} - \\dfrac{27}{8}',
      '−9/4', '−9/4', '-\\dfrac{9}{4}', [
        ['1³ + (1/2)³ + (−3/2)³; 1 + 1/2 − 3/2 = 0', 'Write as cubes: a=1, b=1/2, c=−3/2.', 'கனங்களாக எழுத: a=1, b=1/2, c=−3/2; கூடுதல் 0.', '1 + \\dfrac{1}{2} - \\dfrac{3}{2} = 0'],
        ['3abc = 3(1)(1/2)(−3/2) = −9/4', 'Apply a³+b³+c³ = 3abc.', '3abc = −9/4.', '3(1)\\left(\\dfrac{1}{2}\\right)\\left(-\\dfrac{3}{2}\\right) = -\\dfrac{9}{4}']
      ], 'medium'),

    item('g9-ch3-ex3.4-q14', '3.4', 14, '', 'Algebraic Identities', 'இயற்கணித முற்றொருமைகள்',
      'Find 8x³ − 27y³ − 64z³ when 2x − 3y − 4z = 0', '2x − 3y − 4z = 0 எனில் 8x³ − 27y³ − 64z³ காண்க',
      '14. If 2x − 3y − 4z = 0, then find 8x³ − 27y³ − 64z³.',
      '14. 2x − 3y − 4z = 0 எனில், 8x³ − 27y³ − 64z³-ஐக் காண்க.',
      '2x - 3y - 4z = 0',
      '72xyz', '72xyz', '72xyz', [
        ['a = 2x, b = −3y, c = −4z; a + b + c = 0', 'Rewrite 8x³ − 27y³ − 64z³ as a³ + b³ + c³.', 'a = 2x, b = −3y, c = −4z; கூடுதல் 0.', 'a+b+c = 0'],
        ['3abc = 3(2x)(−3y)(−4z) = 72xyz', 'Since a+b+c = 0, result = 3abc = 72xyz.', '3(2x)(−3y)(−4z) = 72xyz.', '3(2x)(-3y)(-4z) = 72xyz']
      ], 'easy'),

    // ==================== EXERCISE 3.5 (15 items) ====================
    item('g9-ch3-ex3.5-q1-i', '3.5', 1, 'i', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 2a² + 4a²b + 8a²c', 'காரணிப்படுத்துக: 2a² + 4a²b + 8a²c',
      '1. Factorise the following expressions:\n(i) 2a² + 4a²b + 8a²c',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) 2a² + 4a²b + 8a²c',
      '2a^2 + 4a^2b + 8a^2c',
      '2a²(1 + 2b + 4c)', '2a²(1 + 2b + 4c)', '2a^2(1 + 2b + 4c)', [
        ['Common factor = 2a²', 'Identify the GCD of all three terms.', 'மூன்று உறுப்புகளின் பொதுக் காரணி 2a².', '\\text{GCF} = 2a^2'],
        ['= 2a²(1 + 2b + 4c)', 'Factor out 2a².', '2a²-ஐ வெளியே எடுக்க.', '2a^2(1 + 2b + 4c)']
      ], 'easy'),

    item('g9-ch3-ex3.5-q1-ii', '3.5', 1, 'ii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise ab − ac − mb + mc', 'காரணிப்படுத்துக: ab − ac − mb + mc',
      '1. Factorise the following expressions:\n(ii) ab − ac − mb + mc',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) ab − ac − mb + mc',
      'ab - ac - mb + mc',
      '(a − m)(b − c)', '(a − m)(b − c)', '(a - m)(b - c)', [
        ['= a(b − c) − m(b − c)', 'Group in pairs and take common factors.', 'ஈரிணையாகப் பிரித்து பொதுக் காரணி எடுக்க.', 'a(b - c) - m(b - c)'],
        ['= (a − m)(b − c)', 'Factor out (b − c).', '(b − c)-ஐ வெளியே எடுக்க.', '(a - m)(b - c)']
      ], 'easy'),

    item('g9-ch3-ex3.5-q2-i', '3.5', 2, 'i', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise x² + 4x + 4', 'காரணிப்படுத்துக: x² + 4x + 4',
      '2. Factorise the following:\n(i) x² + 4x + 4',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) x² + 4x + 4',
      'x^2 + 4x + 4',
      '(x + 2)²', '(x + 2)²', '(x + 2)^2', [
        ['x² + 2(x)(2) + 2²', 'Match with a² + 2ab + b².', 'a² + 2ab + b² வடிவில் எழுத.', 'x^2 + 2(x)(2) + 2^2'],
        ['= (x + 2)²', 'Apply (a + b)².', '(x + 2)².', '(x + 2)^2']
      ], 'easy'),

    item('g9-ch3-ex3.5-q2-ii', '3.5', 2, 'ii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 3a² − 24ab + 48b²', 'காரணிப்படுத்துக: 3a² − 24ab + 48b²',
      '2. Factorise the following:\n(ii) 3a² − 24ab + 48b²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) 3a² − 24ab + 48b²',
      '3a^2 - 24ab + 48b^2',
      '3(a − 4b)²', '3(a − 4b)²', '3(a - 4b)^2', [
        ['= 3(a² − 8ab + 16b²)', 'Take common factor 3 out first.', 'முதலில் 3-ஐப் பொதுவாக எடுக்க.', '3(a^2 - 8ab + 16b^2)'],
        ['= 3(a − 4b)²', 'Recognize (a − 4b)².', 'a² − 8ab + 16b² = (a − 4b)².', '3(a - 4b)^2']
      ], 'easy'),

    item('g9-ch3-ex3.5-q2-iii', '3.5', 2, 'iii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise x⁵ − 16x', 'காரணிப்படுத்துக: x⁵ − 16x',
      '2. Factorise the following:\n(iii) x⁵ − 16x',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) x⁵ − 16x',
      'x^5 - 16x',
      'x(x² + 4)(x + 2)(x − 2)', 'x(x² + 4)(x + 2)(x − 2)', 'x(x^2 + 4)(x + 2)(x - 2)', [
        ['= x(x⁴ − 16) = x((x²)² − 4²)', 'Factor out x and use difference of squares.', 'x-ஐ வெளியே எடுத்து a² − b² பயன்படுத்த.', 'x(x^2 + 4)(x^2 - 4)'],
        ['= x(x² + 4)(x + 2)(x − 2)', 'Factor x² − 4 = (x + 2)(x − 2).', 'x² − 4 = (x + 2)(x − 2).', 'x(x^2 + 4)(x + 2)(x - 2)']
      ], 'medium'),

    item('g9-ch3-ex3.5-q2-iv', '3.5', 2, 'iv', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise m² + 1/m² − 23', 'காரணிப்படுத்துக: m² + 1/m² − 23',
      '2. Factorise the following:\n(iv) m² + 1/m² − 23',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iv) m² + 1/m² − 23',
      'm^2 + \\dfrac{1}{m^2} - 23',
      '(m + 1/m + 5)(m + 1/m − 5)', '(m + 1/m + 5)(m + 1/m − 5)',
      '\\left(m + \\dfrac{1}{m} + 5\\right)\\left(m + \\dfrac{1}{m} - 5\\right)', [
        ['m² + 1/m² + 2 − 25 = (m + 1/m)² − 5²', 'Rewrite −23 as +2 − 25 to complete the square.', '−23 என்பதை +2 − 25 என எழுத.', '\\left(m + \\dfrac{1}{m}\\right)^2 - 5^2'],
        ['= (m + 1/m + 5)(m + 1/m − 5)', 'Apply a² − b² = (a + b)(a − b).', 'a² − b² முற்றொருமையைப் பயன்படுத்த.', '\\left(m + \\dfrac{1}{m} + 5\\right)\\left(m + \\dfrac{1}{m} - 5\\right)']
      ], 'difficult'),

    item('g9-ch3-ex3.5-q2-v', '3.5', 2, 'v', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 6 − 216x²', 'காரணிப்படுத்துக: 6 − 216x²',
      '2. Factorise the following:\n(v) 6 − 216x²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(v) 6 − 216x²',
      '6 - 216x^2',
      '6(1 + 6x)(1 − 6x)', '6(1 + 6x)(1 − 6x)', '6(1 + 6x)(1 - 6x)', [
        ['= 6(1 − 36x²) = 6(1² − (6x)²)', 'Take 6 common and apply difference of squares.', '6-ஐ வெளியே எடுத்து a² − b² பயன்படுத்த.', '6(1 - 36x^2)'],
        ['= 6(1 + 6x)(1 − 6x)', 'Factorise completely.', '6(1 + 6x)(1 − 6x).', '6(1 + 6x)(1 - 6x)']
      ], 'easy'),

    item('g9-ch3-ex3.5-q2-vi', '3.5', 2, 'vi', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise a² + 1/a² − 18', 'காரணிப்படுத்துக: a² + 1/a² − 18',
      '2. Factorise the following:\n(vi) a² + 1/a² − 18',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(vi) a² + 1/a² − 18',
      'a^2 + \\dfrac{1}{a^2} - 18',
      '(a − 1/a + 4)(a − 1/a − 4)', '(a − 1/a + 4)(a − 1/a − 4)',
      '\\left(a - \\dfrac{1}{a} + 4\\right)\\left(a - \\dfrac{1}{a} - 4\\right)', [
        ['a² + 1/a² − 2 − 16 = (a − 1/a)² − 4²', 'Rewrite −18 as −2 − 16.', '−18 என்பதை −2 − 16 என எழுத.', '\\left(a - \\dfrac{1}{a}\\right)^2 - 4^2'],
        ['= (a − 1/a + 4)(a − 1/a − 4)', 'Apply a² − b².', 'a² − b² முற்றொருமையைப் பயன்படுத்த.', '\\left(a - \\dfrac{1}{a} + 4\\right)\\left(a - \\dfrac{1}{a} - 4\\right)']
      ], 'difficult'),

    item('g9-ch3-ex3.5-q3-i', '3.5', 3, 'i', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 4x² + 9y² + 25z² + 12xy + 30yz + 20xz', 'காரணிப்படுத்துக: 4x²+9y²+25z²+12xy+30yz+20xz',
      '3. Factorise the following:\n(i) 4x² + 9y² + 25z² + 12xy + 30yz + 20xz',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) 4x² + 9y² + 25z² + 12xy + 30yz + 20xz',
      '4x^2 + 9y^2 + 25z^2 + 12xy + 30yz + 20xz',
      '(2x + 3y + 5z)²', '(2x + 3y + 5z)²', '(2x + 3y + 5z)^2', [
        ['= (2x)² + (3y)² + (5z)² + 2(2x)(3y) + 2(3y)(5z) + 2(5z)(2x)', 'Match with (a + b + c)².', '(a + b + c)² வடிவில் எழுத.', '(2x)^2 + (3y)^2 + (5z)^2 + 2(2x)(3y) + 2(3y)(5z) + 2(5z)(2x)'],
        ['= (2x + 3y + 5z)²', 'Write as a square.', '(2x + 3y + 5z)².', '(2x + 3y + 5z)^2']
      ], 'medium'),

    item('g9-ch3-ex3.5-q3-ii', '3.5', 3, 'ii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 25x² + 4y² + 9z² − 20xy + 12yz − 30xz', 'காரணிப்படுத்துக: 25x²+4y²+9z²−20xy+12yz−30xz',
      '3. Factorise the following:\n(ii) 25x² + 4y² + 9z² − 20xy + 12yz − 30xz',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) 25x² + 4y² + 9z² − 20xy + 12yz − 30xz',
      '25x^2 + 4y^2 + 9z^2 - 20xy + 12yz - 30xz',
      '(−5x + 2y + 3z)² or (5x − 2y − 3z)²', '(5x − 2y − 3z)²', '(5x - 2y - 3z)^2', [
        ['yz term (+12yz) is positive while xy and xz are negative', 'So 2y and 3z share the same sign, opposite to 5x.', '12yz மிகை; xy, xz குறை என்பதால் 5x மட்டும் எதிர் குறி.', '(-5x)^2 + (2y)^2 + (3z)^2 + 2(-5x)(2y) + 2(2y)(3z) + 2(3z)(-5x)'],
        ['= (5x − 2y − 3z)²', 'Equivalently (−5x + 2y + 3z)².', '(5x − 2y − 3z)².', '(5x - 2y - 3z)^2']
      ], 'medium'),

    item('g9-ch3-ex3.5-q4-i', '3.5', 4, 'i', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 8x³ + 125y³', 'காரணிப்படுத்துக: 8x³ + 125y³',
      '4. Factorise the following:\n(i) 8x³ + 125y³',
      '4. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) 8x³ + 125y³',
      '8x^3 + 125y^3',
      '(2x + 5y)(4x² − 10xy + 25y²)', '(2x + 5y)(4x² − 10xy + 25y²)',
      '(2x + 5y)(4x^2 - 10xy + 25y^2)', [
        ['= (2x)³ + (5y)³', 'Write as sum of cubes a³ + b³.', '(2x)³ + (5y)³ என எழுதுக.', '(2x)^3 + (5y)^3'],
        ['= (2x + 5y)(4x² − 10xy + 25y²)', 'Apply a³ + b³ = (a + b)(a² − ab + b²).', 'a³ + b³ முற்றொருமையைப் பயன்படுத்த.', '(2x + 5y)(4x^2 - 10xy + 25y^2)']
      ], 'easy'),

    item('g9-ch3-ex3.5-q4-ii', '3.5', 4, 'ii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise 27x³ − 8y³', 'காரணிப்படுத்துக: 27x³ − 8y³',
      '4. Factorise the following:\n(ii) 27x³ − 8y³',
      '4. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) 27x³ − 8y³',
      '27x^3 - 8y^3',
      '(3x − 2y)(9x² + 6xy + 4y²)', '(3x − 2y)(9x² + 6xy + 4y²)',
      '(3x - 2y)(9x^2 + 6xy + 4y^2)', [
        ['= (3x)³ − (2y)³', 'Write as difference of cubes.', '(3x)³ − (2y)³ என எழுதுக.', '(3x)^3 - (2y)^3'],
        ['= (3x − 2y)(9x² + 6xy + 4y²)', 'Apply a³ − b³ = (a − b)(a² + ab + b²).', 'a³ − b³ முற்றொருமையைப் பயன்படுத்த.', '(3x - 2y)(9x^2 + 6xy + 4y^2)']
      ], 'easy'),

    item('g9-ch3-ex3.5-q4-iii', '3.5', 4, 'iii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise a⁶ − 64', 'காரணிப்படுத்துக: a⁶ − 64',
      '4. Factorise the following:\n(iii) a⁶ − 64',
      '4. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) a⁶ − 64',
      'a^6 - 64',
      '(a + 2)(a − 2)(a² − 2a + 4)(a² + 2a + 4)', '(a + 2)(a − 2)(a² − 2a + 4)(a² + 2a + 4)',
      '(a + 2)(a - 2)(a^2 - 2a + 4)(a^2 + 2a + 4)', [
        ['a⁶ − 64 = (a³)² − 8² = (a³ + 8)(a³ − 8)', 'Factor first as difference of squares.', 'முதலில் a² − b² மூலம் பிரிக்க.', '(a^3 + 8)(a^3 - 8)'],
        ['= (a + 2)(a² − 2a + 4)(a − 2)(a² + 2a + 4)', 'Factor each cube sum/difference.', 'கன முற்றொருமைகளைப் பயன்படுத்த.', '(a+2)(a-2)(a^2-2a+4)(a^2+2a+4)']
      ], 'difficult'),

    item('g9-ch3-ex3.5-q5-i', '3.5', 5, 'i', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise x³ + 8y³ + 6xy − 1', 'காரணிப்படுத்துக: x³ + 8y³ + 6xy − 1',
      '5. Factorise the following:\n(i) x³ + 8y³ + 6xy − 1',
      '5. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) x³ + 8y³ + 6xy − 1',
      'x^3 + 8y^3 + 6xy - 1',
      '(x + 2y − 1)(x² + 4y² + 1 − 2xy + 2y + x)', '(x + 2y − 1)(x² + 4y² + 1 − 2xy + 2y + x)',
      '(x + 2y - 1)(x^2 + 4y^2 + 1 - 2xy + 2y + x)', [
        ['x³ + (2y)³ + (−1)³ − 3(x)(2y)(−1)', 'Match with a³ + b³ + c³ − 3abc where a=x, b=2y, c=−1.', 'a=x, b=2y, c=−1 எனக் கொள்க.', 'x^3 + (2y)^3 + (-1)^3 - 3(x)(2y)(-1)'],
        ['= (x + 2y − 1)(x² + 4y² + 1 − 2xy + 2y + x)', 'Apply the 3-cube identity.', 'முற்றொருமையைப் பயன்படுத்த.', '(x + 2y - 1)(x^2 + 4y^2 + 1 - 2xy + 2y + x)']
      ], 'difficult'),

    item('g9-ch3-ex3.5-q5-ii', '3.5', 5, 'ii', 'Factorisation', 'காரணிப்படுத்துதல்',
      'Factorise l³ − 8m³ − 27n³ − 18lmn', 'காரணிப்படுத்துக: l³ − 8m³ − 27n³ − 18lmn',
      '5. Factorise the following:\n(ii) l³ − 8m³ − 27n³ − 18lmn',
      '5. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) l³ − 8m³ − 27n³ − 18lmn',
      'l^3 - 8m^3 - 27n^3 - 18lmn',
      '(l − 2m − 3n)(l² + 4m² + 9n² + 2lm − 6mn + 3nl)', '(l − 2m − 3n)(l² + 4m² + 9n² + 2lm − 6mn + 3nl)',
      '(l - 2m - 3n)(l^2 + 4m^2 + 9n^2 + 2lm - 6mn + 3nl)', [
        ['l³ + (−2m)³ + (−3n)³ − 3(l)(−2m)(−3n)', 'Identify a = l, b = −2m, c = −3n.', 'a = l, b = −2m, c = −3n என்க.', 'l^3 + (-2m)^3 + (-3n)^3 - 3(l)(-2m)(-3n)'],
        ['= (l − 2m − 3n)(l² + 4m² + 9n² + 2lm − 6mn + 3nl)', 'Apply a³ + b³ + c³ − 3abc.', 'முற்றொருமையைப் பயன்படுத்த.', '(l - 2m - 3n)(l^2 + 4m^2 + 9n^2 + 2lm - 6mn + 3nl)']
      ], 'difficult'),

    // ==================== EXERCISE 3.6 (18 items) ====================
    item('g9-ch3-ex3.6-q1-i', '3.6', 1, 'i', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise x² + 10x + 24', 'காரணிப்படுத்துக: x² + 10x + 24',
      '1. Factorise the following:\n(i) x² + 10x + 24',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) x² + 10x + 24',
      'x^2 + 10x + 24', '(x + 4)(x + 6)', '(x + 4)(x + 6)', '(x + 4)(x + 6)', [
        ['Sum = 10, Product = 24 ⇒ 4 and 6', 'Split 10x = 4x + 6x.', 'கூடுதல் 10, பெருக்கல் 24 தரும் எண்கள் 4, 6.', 'x^2 + 4x + 6x + 24'],
        ['= x(x + 4) + 6(x + 4) = (x + 4)(x + 6)', 'Group and factor.', 'குழுவாக்க (x + 4)(x + 6).', '(x + 4)(x + 6)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q1-ii', '3.6', 1, 'ii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise z² + 4z − 12', 'காரணிப்படுத்துக: z² + 4z − 12',
      '1. Factorise the following:\n(ii) z² + 4z − 12',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) z² + 4z − 12',
      'z^2 + 4z - 12', '(z + 6)(z − 2)', '(z + 6)(z − 2)', '(z + 6)(z - 2)', [
        ['Sum = 4, Product = −12 ⇒ 6 and −2', 'Split 4z = 6z − 2z.', 'கூடுதல் 4, பெருக்கல் −12 தரும் எண்கள் 6, −2.', 'z^2 + 6z - 2z - 12'],
        ['= (z + 6)(z − 2)', 'Group and factor.', '(z + 6)(z − 2).', '(z + 6)(z - 2)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q1-iii', '3.6', 1, 'iii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise p² − 6p − 16', 'காரணிப்படுத்துக: p² − 6p − 16',
      '1. Factorise the following:\n(iii) p² − 6p − 16',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) p² − 6p − 16',
      'p^2 - 6p - 16', '(p − 8)(p + 2)', '(p − 8)(p + 2)', '(p - 8)(p + 2)', [
        ['Sum = −6, Product = −16 ⇒ −8 and 2', 'Split −6p = −8p + 2p.', 'கூடுதல் −6, பெருக்கல் −16 ⇒ −8, 2.', 'p^2 - 8p + 2p - 16'],
        ['= (p − 8)(p + 2)', 'Group and factor.', '(p − 8)(p + 2).', '(p - 8)(p + 2)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q1-iv', '3.6', 1, 'iv', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise t² + 72 − 17t', 'காரணிப்படுத்துக: t² + 72 − 17t',
      '1. Factorise the following:\n(iv) t² + 72 − 17t',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iv) t² + 72 − 17t',
      't^2 + 72 - 17t', '(t − 8)(t − 9)', '(t − 8)(t − 9)', '(t - 8)(t - 9)', [
        ['t² − 17t + 72; Sum = −17, Product = 72 ⇒ −8, −9', 'Write in standard form first.', 'திட்ட வடிவில் எழுத t² − 17t + 72.', 't^2 - 8t - 9t + 72'],
        ['= (t − 8)(t − 9)', 'Group and factor.', '(t − 8)(t − 9).', '(t - 8)(t - 9)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q1-v', '3.6', 1, 'v', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise y² − 16y − 80', 'காரணிப்படுத்துக: y² − 16y − 80',
      '1. Factorise the following:\n(v) y² − 16y − 80',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(v) y² − 16y − 80',
      'y^2 - 16y - 80', '(y − 20)(y + 4)', '(y − 20)(y + 4)', '(y - 20)(y + 4)', [
        ['Sum = −16, Product = −80 ⇒ −20 and 4', 'Split −16y = −20y + 4y.', 'கூடுதல் −16, பெருக்கல் −80 ⇒ −20, 4.', 'y^2 - 20y + 4y - 80'],
        ['= (y − 20)(y + 4)', 'Group and factor.', '(y − 20)(y + 4).', '(y - 20)(y + 4)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q1-vi', '3.6', 1, 'vi', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise a² + 10a − 600', 'காரணிப்படுத்துக: a² + 10a − 600',
      '1. Factorise the following:\n(vi) a² + 10a − 600',
      '1. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(vi) a² + 10a − 600',
      'a^2 + 10a - 600', '(a + 30)(a − 20)', '(a + 30)(a − 20)', '(a + 30)(a - 20)', [
        ['Sum = 10, Product = −600 ⇒ 30 and −20', 'Split 10a = 30a − 20a.', 'கூடுதல் 10, பெருக்கல் −600 ⇒ 30, −20.', 'a^2 + 30a - 20a - 600'],
        ['= (a + 30)(a − 20)', 'Group and factor.', '(a + 30)(a − 20).', '(a + 30)(a - 20)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q2-i', '3.6', 2, 'i', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 2a² + 9a + 10', 'காரணிப்படுத்துக: 2a² + 9a + 10',
      '2. Factorise the following:\n(i) 2a² + 9a + 10',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) 2a² + 9a + 10',
      '2a^2 + 9a + 10', '(a + 2)(2a + 5)', '(a + 2)(2a + 5)', '(a + 2)(2a + 5)', [
        ['ac = 20, b = 9 ⇒ 4 and 5', 'Split 9a = 4a + 5a.', 'ac = 20, b = 9 ⇒ 4, 5.', '2a^2 + 4a + 5a + 10'],
        ['= 2a(a + 2) + 5(a + 2) = (a + 2)(2a + 5)', 'Group and factor.', '(a + 2)(2a + 5).', '(a + 2)(2a + 5)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q2-ii', '3.6', 2, 'ii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 5x² − 29xy − 42y²', 'காரணிப்படுத்துக: 5x² − 29xy − 42y²',
      '2. Factorise the following:\n(ii) 5x² − 29xy − 42y²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) 5x² − 29xy − 42y²',
      '5x^2 - 29xy - 42y^2', '(x − 7y)(5x + 6y)', '(x − 7y)(5x + 6y)', '(x - 7y)(5x + 6y)', [
        ['ac = −210, b = −29 ⇒ −35 and 6', 'Split −29xy = −35xy + 6xy.', 'ac = −210, b = −29 ⇒ −35, 6.', '5x^2 - 35xy + 6xy - 42y^2'],
        ['= 5x(x − 7y) + 6y(x − 7y) = (x − 7y)(5x + 6y)', 'Group and factor.', '(x − 7y)(5x + 6y).', '(x - 7y)(5x + 6y)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q2-iii', '3.6', 2, 'iii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 9 − 18x + 8x²', 'காரணிப்படுத்துக: 9 − 18x + 8x²',
      '2. Factorise the following:\n(iii) 9 − 18x + 8x²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) 9 − 18x + 8x²',
      '9 - 18x + 8x^2', '(2x − 3)(4x − 3)', '(2x − 3)(4x − 3)', '(2x - 3)(4x - 3)', [
        ['8x² − 18x + 9; ac = 72, b = −18 ⇒ −12, −6', 'Write in standard form.', 'திட்ட வடிவில் எழுதுக: 8x² − 18x + 9.', '8x^2 - 12x - 6x + 9'],
        ['= 4x(2x − 3) − 3(2x − 3) = (2x − 3)(4x − 3)', 'Group and factor.', '(2x − 3)(4x − 3).', '(2x - 3)(4x - 3)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q2-iv', '3.6', 2, 'iv', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 6x² + 16xy + 8y²', 'காரணிப்படுத்துக: 6x² + 16xy + 8y²',
      '2. Factorise the following:\n(iv) 6x² + 16xy + 8y²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iv) 6x² + 16xy + 8y²',
      '6x^2 + 16xy + 8y^2', '2(3x + 2y)(x + 2y)', '2(3x + 2y)(x + 2y)', '2(3x + 2y)(x + 2y)', [
        ['= 2(3x² + 8xy + 4y²)', 'Take common factor 2 out first.', 'முதலில் 2-ஐப் பொதுவாக எடுக்க.', '2(3x^2 + 8xy + 4y^2)'],
        ['= 2(3x² + 6xy + 2xy + 4y²) = 2(3x + 2y)(x + 2y)', 'Factorise the quadratic.', '2(3x + 2y)(x + 2y).', '2(3x + 2y)(x + 2y)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q2-v', '3.6', 2, 'v', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 12x² + 36x²y + 27y²x²', 'காரணிப்படுத்துக: 12x² + 36x²y + 27y²x²',
      '2. Factorise the following:\n(v) 12x² + 36x²y + 27y²x²',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(v) 12x² + 36x²y + 27y²x²',
      '12x^2 + 36x^2y + 27y^2x^2', '3x²(2 + 3y)²', '3x²(2 + 3y)²', '3x^2(2 + 3y)^2', [
        ['= 3x²(4 + 12y + 9y²)', 'Take common factor 3x² out first.', 'பொதுக் காரணி 3x²-ஐ வெளியே எடுக்க.', '3x^2(4 + 12y + 9y^2)'],
        ['= 3x²(2 + 3y)²', 'Recognize (2 + 3y)².', '3x²(2 + 3y)².', '3x^2(2 + 3y)^2']
      ], 'medium'),

    item('g9-ch3-ex3.6-q2-vi', '3.6', 2, 'vi', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise (a + b)² + 9(a + b) + 18', 'காரணிப்படுத்துக: (a + b)² + 9(a + b) + 18',
      '2. Factorise the following:\n(vi) (a + b)² + 9(a + b) + 18',
      '2. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(vi) (a + b)² + 9(a + b) + 18',
      '(a + b)^2 + 9(a + b) + 18', '(a + b + 3)(a + b + 6)', '(a + b + 3)(a + b + 6)', '(a + b + 3)(a + b + 6)', [
        ['Let u = a + b: u² + 9u + 18 = (u + 3)(u + 6)', 'Substitute u = a + b.', 'u = a + b எனக் கொள்க.', '(u + 3)(u + 6)'],
        ['= (a + b + 3)(a + b + 6)', 'Replace u with a + b.', 'u = a + b எனப் பிரதியிட.', '(a + b + 3)(a + b + 6)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q3-i', '3.6', 3, 'i', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise (p − q)² − 6(p − q) − 16', 'காரணிப்படுத்துக: (p − q)² − 6(p − q) − 16',
      '3. Factorise the following:\n(i) (p − q)² − 6(p − q) − 16',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(i) (p − q)² − 6(p − q) − 16',
      '(p - q)^2 - 6(p - q) - 16', '(p − q − 8)(p − q + 2)', '(p − q − 8)(p − q + 2)', '(p - q - 8)(p - q + 2)', [
        ['Let u = p − q: u² − 6u − 16 = (u − 8)(u + 2)', 'Substitute u = p − q.', 'u = p − q எனக் கொள்க.', '(u - 8)(u + 2)'],
        ['= (p − q − 8)(p − q + 2)', 'Replace u with p − q.', 'u = p − q எனப் பிரதியிட.', '(p - q - 8)(p - q + 2)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q3-ii', '3.6', 3, 'ii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise m² + 2mn − 24n²', 'காரணிப்படுத்துக: m² + 2mn − 24n²',
      '3. Factorise the following:\n(ii) m² + 2mn − 24n²',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(ii) m² + 2mn − 24n²',
      'm^2 + 2mn - 24n^2', '(m + 6n)(m − 4n)', '(m + 6n)(m − 4n)', '(m + 6n)(m - 4n)', [
        ['Sum = 2, Product = −24 ⇒ 6 and −4', 'Split 2mn = 6mn − 4mn.', 'கூடுதல் 2, பெருக்கல் −24 ⇒ 6, −4.', 'm^2 + 6mn - 4mn - 24n^2'],
        ['= (m + 6n)(m − 4n)', 'Group and factor.', '(m + 6n)(m − 4n).', '(m + 6n)(m - 4n)']
      ], 'easy'),

    item('g9-ch3-ex3.6-q3-iii', '3.6', 3, 'iii', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise √5 a² + 2a − 3√5', 'காரணிப்படுத்துக: √5 a² + 2a − 3√5',
      '3. Factorise the following:\n(iii) √5 a² + 2a − 3√5',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iii) √5 a² + 2a − 3√5',
      '\\sqrt{5}\\,a^2 + 2a - 3\\sqrt{5}', '(a + √5)(√5 a − 3)', '(a + √5)(√5 a − 3)', '(a + \\sqrt{5})(\\sqrt{5}\\,a - 3)', [
        ['ac = (√5)(−3√5) = −15, b = 2 ⇒ 5 and −3', 'Split 2a = 5a − 3a.', 'ac = −15, b = 2 ⇒ 5, −3.', '\\sqrt{5}\\,a^2 + 5a - 3a - 3\\sqrt{5}'],
        ['= √5 a(a + √5) − 3(a + √5) = (a + √5)(√5 a − 3)', 'Note 5 = √5·√5.', '5 = √5·√5 என்பதால் (a + √5)(√5 a − 3).', '(a + \\sqrt{5})(\\sqrt{5}\\,a - 3)']
      ], 'difficult'),

    item('g9-ch3-ex3.6-q3-iv', '3.6', 3, 'iv', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise a⁴ − 3a² + 2', 'காரணிப்படுத்துக: a⁴ − 3a² + 2',
      '3. Factorise the following:\n(iv) a⁴ − 3a² + 2',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(iv) a⁴ − 3a² + 2',
      'a^4 - 3a^2 + 2', '(a + 1)(a − 1)(a² − 2)', '(a + 1)(a − 1)(a² − 2)', '(a + 1)(a - 1)(a^2 - 2)', [
        ['Let u = a²: u² − 3u + 2 = (u − 1)(u − 2) = (a² − 1)(a² − 2)', 'Factor in terms of a².', 'u = a² எனக் கொண்டு காரணிப்படுத்த.', '(a^2 - 1)(a^2 - 2)'],
        ['= (a + 1)(a − 1)(a² − 2)', 'Factor a² − 1 = (a + 1)(a − 1).', 'a² − 1 = (a + 1)(a − 1).', '(a + 1)(a - 1)(a^2 - 2)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q3-v', '3.6', 3, 'v', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 8m³ − 2m²n − 15mn²', 'காரணிப்படுத்துக: 8m³ − 2m²n − 15mn²',
      '3. Factorise the following:\n(v) 8m³ − 2m²n − 15mn²',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(v) 8m³ − 2m²n − 15mn²',
      '8m^3 - 2m^2n - 15mn^2', 'm(4m + 5n)(2m − 3n)', 'm(4m + 5n)(2m − 3n)', 'm(4m + 5n)(2m - 3n)', [
        ['= m(8m² − 2mn − 15n²)', 'Take m common; ac = −120, b = −2 ⇒ −12, 10.', 'm பொதுக் காரணி; ac = −120, b = −2 ⇒ −12, 10.', 'm(8m^2 - 12mn + 10mn - 15n^2)'],
        ['= m(4m + 5n)(2m − 3n)', 'Group and factor.', 'm(4m + 5n)(2m − 3n).', 'm(4m + 5n)(2m - 3n)']
      ], 'medium'),

    item('g9-ch3-ex3.6-q3-vi', '3.6', 3, 'vi', 'Factorising Quadratics', 'இருபடிக் கோவை காரணிப்படுத்தல்',
      'Factorise 1/x² + 1/y² + 2/(xy)', 'காரணிப்படுத்துக: 1/x² + 1/y² + 2/(xy)',
      '3. Factorise the following:\n(vi) 1/x² + 1/y² + 2/(xy)',
      '3. பின்வருவனவற்றைக் காரணிப்படுத்துக:\n(vi) 1/x² + 1/y² + 2/(xy)',
      '\\dfrac{1}{x^2} + \\dfrac{1}{y^2} + \\dfrac{2}{xy}', '(1/x + 1/y)²', '(1/x + 1/y)²', '\\left(\\dfrac{1}{x} + \\dfrac{1}{y}\\right)^2', [
        ['(1/x)² + 2(1/x)(1/y) + (1/y)²', 'Recognize a² + 2ab + b² with x, y ≠ 0.', 'a = 1/x, b = 1/y எனக் கொள்க (x, y ≠ 0).', '\\left(\\dfrac{1}{x}\\right)^2 + 2\\left(\\dfrac{1}{x}\\right)\\left(\\dfrac{1}{y}\\right) + \\left(\\dfrac{1}{y}\\right)^2'],
        ['= (1/x + 1/y)²', 'Write as square.', '(1/x + 1/y)².', '\\left(\\dfrac{1}{x} + \\dfrac{1}{y}\\right)^2']
      ], 'easy')
  ];

  const square = entries.find(entry => entry.id === 'g9-ch3-ex3.5-q3-ii');
  square.answerMath = {
    en: square.answerMath,
    ta: {...square.answerMath,fallback:square.answerTa}
  };

  for (const entry of entries) {
    if (grade.items.some(q => q.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Algebra source ID ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
