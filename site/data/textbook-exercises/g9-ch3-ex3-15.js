/* Grade 9 Algebra Chapter 3 — Exercise 3.15 Multiple Choice Questions (29/29, 2025 EN + TA complete).
 * Sources: G9_Algebra_English_2025_Chapter3.pdf pp. 57–59; G9_Algebra_Tamil_2025_Chapter3.pdf pp. 61–63.
 */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES?.[9];
  const chapter = window.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 9)?.chapters?.find(c => c.id === 'g9-ch3');
  if (!grade || !chapter) throw Error('Missing Grade 9 Algebra registration');
  chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];

  const tex = (latex, fallback, display = false) => ({ latex, fallback, ...(display ? { display: true } : {}) });
  const mcq = (qNum, titleEn, titleTa, qEn, qTa, ansEn, ansTa, ansTex, steps, diff = 'easy') => ({
    id: `g9-ch3-ex3.15-q${qNum}`,
    classNum: 9,
    chapter: '3',
    exercise: '3.15',
    kind: 'textbook',
    difficulty: diff,
    topic: { en: 'Algebra · Multiple Choice', ta: 'இயற்கணிதம் · பலவுள் தெரிவு வினாக்கள்' },
    label: { en: `Exercise 3.15 · Q${qNum}`, ta: `பயிற்சி 3.15 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: {
      en: [qEn],
      ta: [qTa]
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
    mcq(1, 'MCQ 1 · Factor Theorem', 'வினா 1 · காரணித் தேற்றம்',
      '1. If x³ + 6x² + kx + 6 is exactly divisible by (x + 2), then k = ?\n(1) −6  (2) −7  (3) −8  (4) 11',
      '1. x³ + 6x² + kx + 6 என்பது (x + 2)-ஆல் மீதியின்றி வகுபடும் எனில், k-இன் மதிப்பு என்ன?\n(1) −6  (2) −7  (3) −8  (4) 11',
      '(4) 11', '(4) 11', '\\text{(4) } 11', [
        ['p(−2) = (−2)³ + 6(−2)² + k(−2) + 6 = 0', 'By Factor Theorem, p(−2) = 0.', 'காரணித் தேற்றப்படி p(−2) = 0.', 'p(-2) = -8 + 24 - 2k + 6 = 0'],
        ['22 − 2k = 0 ⇒ k = 11', 'Solve for k; option (4) is correct.', 'k = 11; விருப்பம் (4) சரி.', 'k = 11']
      ]),
    mcq(2, 'MCQ 2 · Root of polynomial equation', 'வினா 2 · பல்லுறுப்புக் கோவைச் சமன்பாட்டின் மூலம்',
      '2. The root of the polynomial equation 2x + 3 = 0 is\n(1) 1/3  (2) −1/3  (3) −3/2  (4) −2/3',
      '2. 2x + 3 = 0 என்ற பல்லுறுப்புக் கோவைச் சமன்பாட்டின் மூலம்\n(1) 1/3  (2) −1/3  (3) −3/2  (4) −2/3',
      '(3) −3/2', '(3) −3/2', '\\text{(3) } -\\dfrac{3}{2}', [
        ['2x + 3 = 0 ⇒ 2x = −3 ⇒ x = −3/2', 'Solve 2x + 3 = 0; option (3) is correct.', '2x = −3 ⇒ x = −3/2; விருப்பம் (3).', 'x = -\\dfrac{3}{2}']
      ]),
    mcq(3, 'MCQ 3 · Type of polynomial', 'வினா 3 · பல்லுறுப்புக் கோவையின் வகை',
      '3. The type of the polynomial 4 − 3x³ is\n(1) constant polynomial  (2) linear polynomial  (3) quadratic polynomial  (4) cubic polynomial',
      '3. 4 − 3x³ என்ற பல்லுறுப்புக் கோவையின் வகை\n(1) மாறிலி பல்லுறுப்புக் கோவை  (2) ஒருபடி பல்லுறுப்புக் கோவை  (3) இருபடி பல்லுறுப்புக் கோவை  (4) முப்படி பல்லுறுப்புக் கோவை',
      '(4) cubic polynomial', '(4) முப்படி பல்லுறுப்புக் கோவை', '\\text{(4) cubic polynomial}', [
        ['Degree of 4 − 3x³ is 3', 'Highest power of x is 3 ⇒ cubic polynomial; option (4).', 'மிக உயர்ந்த அடுக்கு 3 என்பதால் முப்படி பல்லுறுப்புக் கோவை; விருப்பம் (4).', '\\deg(4 - 3x^3) = 3']
      ]),
    mcq(4, 'MCQ 4 · Remainder Theorem', 'வினா 4 · மீதித் தேற்றம்',
      '4. If x⁵¹ + 51 is divided by x + 1, then the remainder is\n(1) 0  (2) 1  (3) 49  (4) 50',
      '4. x⁵¹ + 51 என்பது x + 1-ஆல் வகுக்கப்பட்டால் கிடைக்கும் மீதி\n(1) 0  (2) 1  (3) 49  (4) 50',
      '(4) 50', '(4) 50', '\\text{(4) } 50', [
        ['p(−1) = (−1)⁵¹ + 51 = −1 + 51 = 50', '51 is odd, so (−1)⁵¹ = −1; option (4).', 'p(−1) = −1 + 51 = 50; விருப்பம் (4).', 'p(-1) = -1 + 51 = 50']
      ]),
    mcq(5, 'MCQ 5 · Zero of polynomial', 'வினா 5 · பல்லுறுப்புக் கோவையின் பூச்சியம்',
      '5. The zero of the polynomial 2x + 5 is\n(1) 5/2  (2) −5/2  (3) 2/5  (4) −2/5',
      '5. 2x + 5 என்ற பல்லுறுப்புக் கோவையின் பூச்சியம்\n(1) 5/2  (2) −5/2  (3) 2/5  (4) −2/5',
      '(2) −5/2', '(2) −5/2', '\\text{(2) } -\\dfrac{5}{2}', [
        ['2x + 5 = 0 ⇒ x = −5/2', 'Set 2x + 5 = 0; option (2).', '2x + 5 = 0 ⇒ x = −5/2; விருப்பம் (2).', 'x = -\\dfrac{5}{2}']
      ]),
    mcq(6, 'MCQ 6 · Sum of polynomials', 'வினா 6 · பல்லுறுப்புக் கோவைகளின் கூடுதல்',
      '6. The sum of the polynomials p(x) = x³ − x² − 2, q(x) = x² − 3x + 1\n(1) x³ − 3x − 1  (2) x³ + 2x² − 1  (3) x³ − 2x² − 3x  (4) x³ − 2x² + 3x − 1',
      '6. p(x) = x³ − x² − 2, q(x) = x² − 3x + 1 ஆகிய பல்லுறுப்புக் கோவைகளின் கூடுதல்\n(1) x³ − 3x − 1  (2) x³ + 2x² − 1  (3) x³ − 2x² − 3x  (4) x³ − 2x² + 3x − 1',
      '(1) x³ − 3x − 1', '(1) x³ − 3x − 1', '\\text{(1) } x^3 - 3x - 1', [
        ['(x³ − x² − 2) + (x² − 3x + 1) = x³ − 3x − 1', 'The −x² and +x² cancel; option (1).', '−x² மற்றும் +x² நீங்கி x³ − 3x − 1 கிடைக்கும்; விருப்பம் (1).', 'x^3 - 3x - 1']
      ]),
    mcq(7, 'MCQ 7 · Degree of product', 'வினா 7 · பெருக்கலின் படி',
      '7. Degree of the polynomial (y³ − 2)(y³ + 1) is\n(1) 9  (2) 2  (3) 3  (4) 6',
      '7. (y³ − 2)(y³ + 1) என்ற பல்லுறுப்புக் கோவையின் படி\n(1) 9  (2) 2  (3) 3  (4) 6',
      '(4) 6', '(4) 6', '\\text{(4) } 6', [
        ['deg((y³ − 2)(y³ + 1)) = 3 + 3 = 6', 'Leading term is y³ · y³ = y⁶; option (4).', 'மிக உயர்ந்த அடுக்கு 3 + 3 = 6; விருப்பம் (4).', '3 + 3 = 6']
      ]),
    mcq(8, 'MCQ 8 · Ascending order of degrees', 'வினா 8 · படிகளின் ஏறு வரிசை',
      '8. Let the polynomials be (A) −13q⁵ + 4q² + 12q, (B) (x² + 4)(x² + 9), (C) 4q⁸ − q⁶ + q², (D) −(5/7)y¹² + y³ + y⁵. Then ascending order of their degree is\n(1) A,B,D,C  (2) A,B,C,D  (3) B,C,D,A  (4) B,A,C,D',
      '8. கீழ்க்காணும் பல்லுறுப்புக் கோவைகளின் படிகளின் ஏறு வரிசை (A) −13q⁵+4q²+12q, (B) (x²+4)(x²+9), (C) 4q⁸−q⁶+q², (D) −(5/7)y¹²+y³+y⁵\n(1) A,B,D,C  (2) A,B,C,D  (3) B,C,D,A  (4) B,A,C,D',
      '(4) B,A,C,D', '(4) B,A,C,D', '\\text{(4) B, A, C, D}', [
        ['deg(B) = 4, deg(A) = 5, deg(C) = 8, deg(D) = 12', 'Order from smallest degree to largest: 4 < 5 < 8 < 12; option (4).', 'படிகள்: B(4) < A(5) < C(8) < D(12); விருப்பம் (4).', '4 < 5 < 8 < 12']
      ], 'medium'),
    mcq(9, 'MCQ 9 · Factor Theorem definition', 'வினா 9 · காரணித் தேற்றம்',
      '9. If p(a) = 0 then (x − a) is a ________ of p(x)\n(1) divisor  (2) quotient  (3) remainder  (4) factor',
      '9. p(a) = 0 எனில், (x − a) என்பது p(x)-இன் ஒரு ________\n(1) வகுத்தி  (2) ஈவு  (3) மீதி  (4) காரணி',
      '(4) factor', '(4) காரணி', '\\text{(4) factor}', [
        ['By Factor Theorem, p(a) = 0 ⇒ (x − a) is a factor', 'Option (4) is correct.', 'p(a) = 0 எனில் (x − a) ஒரு காரணி; விருப்பம் (4).', 'p(a)=0 \\implies (x-a)\\text{ is a factor}']
      ]),
    mcq(10, 'MCQ 10 · Zero of (2 − 3x)', 'வினா 10 · (2 − 3x)-இன் பூச்சியம்',
      '10. Zeros of (2 − 3x) is ________\n(1) 3  (2) 2  (3) 2/3  (4) 3/2',
      '10. (2 − 3x)-இன் பூச்சியம் ________\n(1) 3  (2) 2  (3) 2/3  (4) 3/2',
      '(3) 2/3', '(3) 2/3', '\\text{(3) } \\dfrac{2}{3}', [
        ['2 − 3x = 0 ⇒ 3x = 2 ⇒ x = 2/3', 'Option (3) is correct.', '2 − 3x = 0 ⇒ x = 2/3; விருப்பம் (3).', 'x = \\dfrac{2}{3}']
      ]),
    mcq(11, 'MCQ 11 · Which has (x − 1) as factor', 'வினா 11 · (x − 1) எதன் காரணி',
      '11. Which of the following has x − 1 as a factor?\n(1) 2x − 1  (2) 3x − 3  (3) 4x − 3  (4) 3x − 4',
      '11. x − 1 என்பது ________-இன் ஒரு காரணி.\n(1) 2x − 1  (2) 3x − 3  (3) 4x − 3  (4) 3x − 4',
      '(2) 3x − 3', '(2) 3x − 3', '\\text{(2) } 3x - 3', [
        ['3(1) − 3 = 0 ⇒ (x − 1) is a factor of 3x − 3', 'Test x = 1 in each choice; only 3x − 3 = 3(x − 1) gives 0; option (2).', 'x = 1 எனப் பிரதியிட 3(1) − 3 = 0; விருப்பம் (2).', '3(1) - 3 = 0']
      ]),
    mcq(12, 'MCQ 12 · Remainder when (x − 3) is factor', 'வினா 12 · (x − 3) காரணி எனில் மீதி',
      '12. If x − 3 is a factor of p(x), then the remainder is\n(1) 3  (2) −3  (3) p(3)  (4) p(−3)',
      '12. x − 3 என்பது p(x)-இன் ஒரு காரணி எனில், மீதி ________\n(1) 3  (2) −3  (3) p(3)  (4) p(−3)',
      '(3) p(3)', '(3) p(3)', '\\text{(3) } p(3)', [
        ['By Remainder Theorem, dividing p(x) by (x − 3) gives remainder p(3)', 'Option (3) is correct.', 'மீதித் தேற்றப்படி (x − 3)-ஆல் வகுக்க மீதி p(3); விருப்பம் (3).', '\\text{Remainder} = p(3)']
      ]),
    mcq(13, 'MCQ 13 · Sum of cubes identity', 'வினா 13 · கனங்களின் கூடுதல் முற்றொருமை',
      '13. (x + y)(x² − xy + y²) is equal to\n(1) (x + y)³  (2) (x − y)³  (3) x³ + y³  (4) x³ − y³',
      '13. (x + y)(x² − xy + y²) = ________\n(1) (x + y)³  (2) (x − y)³  (3) x³ + y³  (4) x³ − y³',
      '(3) x³ + y³', '(3) x³ + y³', '\\text{(3) } x^3 + y^3', [
        ['(x + y)(x² − xy + y²) = x³ + y³', 'Standard sum of cubes identity; option (3).', 'x³ + y³ முற்றொருமை; விருப்பம் (3).', 'x^3 + y^3']
      ]),
    mcq(14, 'MCQ 14 · Square of trinomial', 'வினா 14 · மூவுறுப்பு வர்க்கம்',
      '14. (a + b − c)² is equal to ________\n(1) (a − b + c)²  (2) (−a − b + c)²  (3) (a + b + c)²  (4) (a − b − c)²',
      '14. (a + b − c)² = ________\n(1) (a − b + c)²  (2) (−a − b + c)²  (3) (a + b + c)²  (4) (a − b − c)²',
      '(2) (−a − b + c)²', '(2) (−a − b + c)²', '\\text{(2) } (-a - b + c)^2', [
        ['(−a − b + c)² = [−(a + b − c)]² = (a + b − c)²', 'Negating an expression does not change its square; option (2).', 'எதிர்க் கோவையின் வர்க்கம் சமம்; விருப்பம் (2).', '[-(a+b-c)]^2 = (a+b-c)^2']
      ]),
    mcq(15, 'MCQ 15 · Quadratic from factors', 'வினா 15 · காரணிகளிலிருந்து கெழுக்கள்',
      '15. If (x + 5) and (x − 3) are the factors of ax² + bx + c, then values of a, b and c are\n(1) 1,2,3  (2) 1,2,15  (3) 1,2,−15  (4) 1,−2,15',
      '15. ax² + bx + c என்ற ஈருறுப்புக் கோவையின் காரணிகள் (x + 5) மற்றும் (x − 3) எனில், a, b மற்றும் c-இன் மதிப்புகள் ________\n(1) 1,2,3  (2) 1,2,15  (3) 1,2,−15  (4) 1,−2,15',
      '(3) 1, 2, −15', '(3) 1, 2, −15', '\\text{(3) } 1,\\; 2,\\; -15', [
        ['(x + 5)(x − 3) = x² + 2x − 15 ⇒ a = 1, b = 2, c = −15', 'Expand and compare; option (3).', 'விரித்தெழுத x² + 2x − 15 ⇒ 1, 2, −15; விருப்பம் (3).', 'a=1,\\; b=2,\\; c=-15']
      ]),
    mcq(16, 'MCQ 16 · Linear factors of cubic', 'வினா 16 · முப்படி கோவையின் நேரிய காரணிகள்',
      '16. Cubic polynomial may have maximum of ________ linear factors\n(1) 1  (2) 2  (3) 3  (4) 4',
      '16. முப்படிப் பல்லுறுப்புக் கோவைக்கு அதிகபட்சம் ________ நேரிய காரணிகள் இருக்கலாம்.\n(1) 1  (2) 2  (3) 3  (4) 4',
      '(3) 3', '(3) 3', '\\text{(3) } 3', [
        ['Degree 3 means at most 3 linear factors', 'Option (3) is correct.', 'படி 3 என்பதால் அதிகபட்சம் 3 நேரிய காரணிகள்; விருப்பம் (3).', '3']
      ]),
    mcq(17, 'MCQ 17 · Degree of constant polynomial', 'வினா 17 · மாறிலிக் கோவையின் படி',
      '17. Degree of the constant polynomial is ________\n(1) 3  (2) 2  (3) 1  (4) 0',
      '17. மாறிலிக் கோவையின் படி\n(1) 3  (2) 2  (3) 1  (4) 0',
      '(4) 0', '(4) 0', '\\text{(4) } 0', [
        ['A nonzero constant c = c·x⁰ has degree 0', 'Option (4) is correct (note: zero polynomial 0 has undefined degree).', 'பூச்சியமற்ற மாறிலிக் கோவையின் படி 0; விருப்பம் (4).', '0']
      ]),
    mcq(18, 'MCQ 18 · Solution of 2x + 3y = m', 'வினா 18 · 2x + 3y = m தீர்வு',
      '18. Find the value of m from the equation 2x + 3y = m. If its one solution is x = 2 and y = −2.\n(1) 2  (2) −2  (3) 10  (4) 0',
      '18. 2x + 3y = m என்ற சமன்பாட்டிற்கு x = 2, y = −2 என்பது ஒரு தீர்வு எனில், m-இன் மதிப்பு\n(1) 2  (2) −2  (3) 10  (4) 0',
      '(2) −2', '(2) −2', '\\text{(2) } -2', [
        ['m = 2(2) + 3(−2) = 4 − 6 = −2', 'Substitute x = 2, y = −2; option (2).', 'm = 4 − 6 = −2; விருப்பம் (2).', 'm = -2']
      ]),
    mcq(19, 'MCQ 19 · Identify linear equation', 'வினா 19 · நேரிய சமன்பாட்டைக் கண்டறிக',
      '19. Which of the following is a linear equation\n(1) x + 1/x = 2  (2) x(x − 1) = 2  (3) 3x + 5 = 2/3  (4) x³ − x = 5',
      '19. கீழ்க்காண்பவற்றுள் எது நேரிய சமன்பாடு\n(1) x + 1/x = 2  (2) x(x − 1) = 2  (3) 3x + 5 = 2/3  (4) x³ − x = 5',
      '(3) 3x + 5 = 2/3', '(3) 3x + 5 = 2/3', '\\text{(3) } 3x + 5 = \\dfrac{2}{3}', [
        ['3x + 5 = 2/3 has variable x with degree 1', 'All other options have x⁻¹, x², or x³; option (3).', '3x + 5 = 2/3 மட்டுமே படி 1 கொண்ட நேரிய சமன்பாடு; விருப்பம் (3).', '3x + 5 = \\dfrac{2}{3}']
      ]),
    mcq(20, 'MCQ 20 · Solution of 2x − y = 6', 'வினா 20 · 2x − y = 6-இன் தீர்வு',
      '20. Which of the following is a solution of the equation 2x − y = 6\n(1) (2, 4)  (2) (4, 2)  (3) (3, −1)  (4) (0, 6)',
      '20. கீழ்க்காண்பனவற்றில் 2x − y = 6-இன் தீர்வு எது?\n(1) (2, 4)  (2) (4, 2)  (3) (3, −1)  (4) (0, 6)',
      '(2) (4, 2)', '(2) (4, 2)', '\\text{(2) } (4, 2)', [
        ['2(4) − 2 = 8 − 2 = 6', 'Substitute (4, 2) into 2x − y = 6; option (2).', 'x = 4, y = 2 எனில் 2(4) − 2 = 6; விருப்பம் (2).', '2(4) - 2 = 6']
      ]),
    mcq(21, 'MCQ 21 · Find k from (2, 3)', 'வினா 21 · (2, 3) தீர்வு எனில் k காண்க',
      '21. If (2, 3) is a solution of linear equation 2x + 3y = k then, the value of k is\n(1) 12  (2) 6  (3) 0  (4) 13',
      '21. 2x + 3y = k என்பதன் தீர்வு (2, 3) எனில், k-இன் மதிப்பைக் காண்க.\n(1) 12  (2) 6  (3) 0  (4) 13',
      '(4) 13', '(4) 13', '\\text{(4) } 13', [
        ['k = 2(2) + 3(3) = 4 + 9 = 13', 'Option (4) is correct.', 'k = 4 + 9 = 13; விருப்பம் (4).', 'k = 13']
      ]),
    mcq(22, 'MCQ 22 · Condition for linear equation', 'வினா 22 · நேரிய சமன்பாட்டு நிபந்தனை',
      '22. Which condition does not satisfy the linear equation ax + by + c = 0\n(1) a ≠ 0, b = 0  (2) a = 0, b ≠ 0  (3) a = 0, b = 0  (4) a ≠ 0, b ≠ 0',
      '22. ax + by + c = 0 என்ற சமன்பாட்டினை எந்த நிபந்தனை நிறைவு செய்யாது?\n(1) a ≠ 0, b = 0  (2) a = 0, b ≠ 0  (3) a = 0, b = 0  (4) a ≠ 0, b ≠ 0',
      '(3) a = 0, b = 0', '(3) a = 0, b = 0', '\\text{(3) } a = 0,\\; b = 0', [
        ['If a = 0 and b = 0, both variables vanish (c = 0 is not a linear equation)', 'Option (3) is correct.', 'a = 0, b = 0 எனில் மாறிகள் இருக்காது; விருப்பம் (3).', 'a = 0,\\; b = 0']
      ]),
    mcq(23, 'MCQ 23 · Not a linear equation in two variables', 'வினா 23 · இரு மாறிகளில் நேரிய சமன்பாடு அல்லாதது',
      '23. Which of the following is not a linear equation in two variable\n(1) ax + by + c = 0  (2) 0x + 0y + c = 0  (3) 0x + by + c = 0  (4) ax + 0y + c = 0',
      '23. கீழ்க்காண்பனவற்றில் எது நேரிய சமன்பாடு அல்ல\n(1) ax + by + c = 0  (2) 0x + 0y + c = 0  (3) 0x + by + c = 0  (4) ax + 0y + c = 0',
      '(2) 0x + 0y + c = 0', '(2) 0x + 0y + c = 0', '\\text{(2) } 0x + 0y + c = 0', [
        ['0x + 0y + c = 0 has both variable coefficients equal to 0', 'Option (2) is correct.', 'இரு மாறிகளின் கெழுக்களும் 0; விருப்பம் (2).', '0x + 0y + c = 0']
      ]),
    mcq(24, 'MCQ 24 · Parallel lines condition', 'வினா 24 · இணை கோடுகள் நிபந்தனை',
      '24. The value of k for which the pair of linear equations 4x + 6y − 1 = 0 and 2x + ky − 7 = 0 represents parallel lines is\n(1) k = 3  (2) k = 2  (3) k = 4  (4) k = −3',
      '24. 4x + 6y − 1 = 0 மற்றும் 2x + ky − 7 = 0 ஆகியவை இணை கோடுகளாக அமையும் எனில், k-இன் மதிப்பு காண்க\n(1) k = 3  (2) k = 2  (3) k = 4  (4) k = −3',
      '(1) k = 3', '(1) k = 3', '\\text{(1) } k = 3', [
        ['4/2 = 6/k ≠ (−1)/(−7) ⇒ 2 = 6/k ⇒ k = 3', 'Parallel lines require a₁/a₂ = b₁/b₂ ≠ c₁/c₂; option (1).', '4/2 = 6/k ⇒ k = 3; விருப்பம் (1).', 'k = 3']
      ]),
    mcq(25, 'MCQ 25 · Graph with no solution', 'வினா 25 · தீர்வு இல்லாத வரைபடம்',
      '25. A pair of linear equations has no solution then the graphical representation is\n(1) Intersecting lines  (2) Parallel lines  (3) Coinciding lines  (4) Perpendicular lines',
      '25. கீழ்க்காணும் நேரிய சமன்பாடுகளுக்கான வரைபடங்களில் எதற்குத் தீர்வு இல்லை?\n(1) வெட்டும் கோடுகள்  (2) இணை கோடுகள்  (3) ஒன்றிய கோடுகள்  (4) செங்குத்து கோடுகள்',
      '(2) Parallel lines', '(2) இணை கோடுகள்', '\\text{(2) Parallel lines}', [
        ['Parallel lines never intersect, so no solution', 'Option (2) shows parallel lines.', 'இணை கோடுகள் வெட்டிக்கொள்ளாது; விருப்பம் (2).', '\\text{Parallel lines}']
      ]),
    mcq(26, 'MCQ 26 · Unique solution ratio', 'வினா 26 · ஒரே தீர்வு விகிதம்',
      '26. If a₁/a₂ ≠ b₁/b₂ where a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 then the given pair of linear equation has ________ solution(s)\n(1) no solution  (2) two solutions  (3) unique  (4) infinite',
      '26. a₁/a₂ ≠ b₁/b₂ எனில், இங்கு a₁x + b₁y + c₁ = 0 மற்றும் a₂x + b₂y + c₂ = 0 ஆகிய நேரிய சமன்பாடுகளுக்கு ________\n(1) தீர்வு இல்லை  (2) இரண்டு தீர்வுகள்  (3) ஒரு தீர்வு  (4) எண்ணற்ற தீர்வுகள்',
      '(3) unique', '(3) ஒரு தீர்வு', '\\text{(3) unique}', [
        ['a₁/a₂ ≠ b₁/b₂ ⇒ lines intersect at one point (unique solution)', 'Option (3) is correct.', 'வெட்டும் கோடுகள் ⇒ ஒரு தீர்வு; விருப்பம் (3).', '\\text{Unique solution}']
      ]),
    mcq(27, 'MCQ 27 · No solution ratio', 'வினா 27 · தீர்வு இல்லை விகிதம்',
      '27. If a₁/a₂ = b₁/b₂ ≠ c₁/c₂ where a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 then the given pair of linear equation has ________ solution(s)\n(1) no solution  (2) two solutions  (3) infinite  (4) unique',
      '27. a₁/a₂ = b₁/b₂ ≠ c₁/c₂ எனில், a₁x + b₁y + c₁ = 0 மற்றும் a₂x + b₂y + c₂ = 0 ஆகிய நேரிய சமன்பாடுகளுக்கு ________\n(1) தீர்வு இல்லை  (2) இரண்டு தீர்வுகள்  (3) ஒரு தீர்வு  (4) எண்ணற்ற தீர்வுகள்',
      '(1) no solution', '(1) தீர்வு இல்லை', '\\text{(1) no solution}', [
        ['a₁/a₂ = b₁/b₂ ≠ c₁/c₂ ⇒ parallel lines (no solution)', 'Option (1) is correct.', 'இணை கோடுகள் ⇒ தீர்வு இல்லை; விருப்பம் (1).', '\\text{No solution}']
      ]),
    mcq(28, 'MCQ 28 · GCD of two primes', 'வினா 28 · இரண்டு பகா எண்களின் மீ.பொ.வ',
      '28. GCD of any two prime numbers is ________\n(1) −1  (2) 0  (3) 1  (4) 2',
      '28. இரண்டு பகா எண்களின் மீ.பொ.வ\n(1) −1  (2) 0  (3) 1  (4) 2',
      '(3) 1', '(3) 1', '\\text{(3) } 1', [
        ['Distinct primes share only 1 (and equal primes are not meant here; standard TN answer is 1)', 'Option (3) is correct.', 'பகா எண்களின் பொது வகுத்தி 1; விருப்பம் (3).', '1']
      ]),
    mcq(29, 'MCQ 29 · GCD of x⁴ − y⁴ and x² − y²', 'வினா 29 · x⁴ − y⁴ மற்றும் x² − y² மீ.பொ.வ',
      '29. The GCD of x⁴ − y⁴ and x² − y² is\n(1) x⁴ − y⁴  (2) x² − y²  (3) (x + y)²  (4) (x + y)⁴',
      '29. x⁴ − y⁴ மற்றும் x² − y²-இன் மீ.பொ.வ\n(1) x⁴ − y⁴  (2) x² − y²  (3) (x + y)²  (4) (x + y)⁴',
      '(2) x² − y²', '(2) x² − y²', '\\text{(2) } x^2 - y^2', [
        ['x⁴ − y⁴ = (x² + y²)(x² − y²)', 'Common factor is x² − y²; option (2).', 'பொதுக் காரணி x² − y²; விருப்பம் (2).', 'x^2 - y^2']
      ])
  ];

  for (const entry of entries) {
    if (grade.items.some(q => q.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Algebra source ID ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
