/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.6 Multiple Choice Questions (Q1–Q20).
 * Bilingual English & Tamil — page-visual-checked against 2025 EN pp.218-219 (PDF 224-225) & TA pp.232-234 (PDF 238-240); Answer Key EN p.321 / TA p.337.
 * Includes structured choices + correctIndex for interactive accessible MCQ checking.
 * Tamil professional editorial review remains pending.
 */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES?.[9];
  const chapter = window.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 9)?.chapters?.find(c => c.id === 'g9-ch5');
  if (!grade || !chapter) throw Error('Grade 9 Chapter 5 registration missing');
  chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];

  const tex = (latex, fallback, display = false) => ({ latex, fallback, ...(display ? { display: true } : {}) });
  const step = (en, ta, eq, latex) => ({
    en,
    ta,
    eq,
    math: tex(latex || eq, eq, true)
  });

  const mcq = (qNum, titleEn, titleTa, qEn, qTa, qMathEn, qMathTa, choices, correctIndex, steps, ansEn, ansTa, ansLatex, extra = {}) => ({
    id: `g9-ch5-ex5.6-q${qNum}`,
    classNum: 9,
    chapter: '5',
    exercise: '5.6',
    kind: 'textbook',
    edition: '2025',
    preferItemMath: true,
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
    topic: { en: 'Coordinate Geometry · Multiple Choice', ta: 'ஆயத்தொலை வடிவியல் · பலவுள் தெரிவு வினாக்கள்' },
    label: { en: `Exercise 5.6 · Q${qNum}`, ta: `பயிற்சி 5.6 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: { en: qMathEn, ta: qMathTa },
    choices,
    correctIndex,
    steps,
    answer: ansEn,
    answerTa: ansTa,
    answerMath: { en: tex(ansLatex, ansEn, false), ta: tex(ansLatex, ansTa, false) },
    ...(extra.figureSrc ? { figureSrc: extra.figureSrc, figureAlt: extra.figureAlt, figureCaption: extra.figureCaption } : {}),
    sourceFidelity: {
      status: 'page-visual-checked',
      sourcePdfPage: { en: extra.enPdf || (qNum <= 10 ? 224 : 225), ta: extra.taPdf || (qNum <= 5 ? 238 : qNum <= 18 ? 239 : 240) },
      sourcePrintedPage: { en: qNum <= 10 ? 218 : 219, ta: qNum <= 5 ? 232 : qNum <= 18 ? 233 : 234 },
      answerKeyPdfPage: { en: 321, ta: 337 }
    }
  });

  const entries = [
    mcq(1, 'Point with y-coordinate zero', 'y-ஆயத்தொலைவு பூச்சியம் எனில் புள்ளி',
      '1. If the y-coordinate of a point is zero, then the point always lies ______\n(1) in the I quadrant   (2) in the II quadrant   (3) on x-axis   (4) on y-axis',
      '1. ஒரு புள்ளியின் y-அச்சுத் தொலைவு பூச்சியம் எனில் அது எப்பொழுதும் ______ அமையும்\n(1) முதலாம் காற்பகுதியில்   (2) இரண்டாம் காற்பகுதியில்   (3) x-அச்சின் மீது   (4) y-அச்சின் மீது',
      ['1. If the y-coordinate of a point is zero, then the point always lies ______\n(1) in the I quadrant   (2) in the II quadrant   (3) on x-axis   (4) on y-axis'],
      ['1. ஒரு புள்ளியின் y-அச்சுத் தொலைவு பூச்சியம் எனில் அது எப்பொழுதும் ______ அமையும்\n(1) முதலாம் காற்பகுதியில்   (2) இரண்டாம் காற்பகுதியில்   (3) x-அச்சின் மீது   (4) y-அச்சின் மீது'],
      [
        { en: '(1) in the I quadrant', ta: '(1) முதலாம் காற்பகுதியில்' },
        { en: '(2) in the II quadrant', ta: '(2) இரண்டாம் காற்பகுதியில்' },
        { en: '(3) on x-axis', ta: '(3) x-அச்சின் மீது' },
        { en: '(4) on y-axis', ta: '(4) y-அச்சின் மீது' }
      ],
      2,
      [step('Every point on the x-axis has the form (x, 0), so its y-coordinate is 0. Correct option: (3).', 'x-அச்சின் மீதுள்ள ஒவ்வொரு புள்ளியும் (x, 0) என்ற வடிவில் இருக்கும்; எனவே y = 0 எனில் புள்ளி x-அச்சின் மீது அமையும். சரியான விடை: (3).', 'y = 0 ⇒ point (x, 0) lies on the x-axis', 'y=0 \\implies (x,0)\\text{ lies on the }x\\text{-axis}')],
      '(3) on x-axis', '(3) x-அச்சின் மீது', '\\text{(3) on }x\\text{-axis}', { ansLatexTa: '\\text{(3) }x\\text{-அச்சின் மீது}' }
    ),

    mcq(2, 'Quadrants of (−5, 2) and (2, −5)', '(−5, 2) மற்றும் (2, −5) அமையும் காற்பகுதிகள்',
      '2. The points (−5, 2) and (2, −5) lie in the ______\n(1) same quadrant   (2) II and III quadrant respectively   (3) II and IV quadrant respectively   (4) IV and II quadrant respectively',
      '2. (−5, 2) மற்றும் (2, −5) என்ற புள்ளிகள் ______ அமையும்\n(1) ஒரே காற்பகுதியில்   (2) முறையே II, III காற்பகுதியில்   (3) முறையே II, IV காற்பகுதியில்   (4) முறையே IV, II காற்பகுதியில்',
      ['2. The points ', tex('(-5, 2)', '(−5, 2)'), ' and ', tex('(2, -5)', '(2, −5)'), ' lie in the ______\n(1) same quadrant   (2) II and III quadrant respectively   (3) II and IV quadrant respectively   (4) IV and II quadrant respectively'],
      ['2. ', tex('(-5, 2)', '(−5, 2)'), ' மற்றும் ', tex('(2, -5)', '(2, −5)'), ' என்ற புள்ளிகள் ______ அமையும்\n(1) ஒரே காற்பகுதியில்   (2) முறையே II, III காற்பகுதியில்   (3) முறையே II, IV காற்பகுதியில்   (4) முறையே IV, II காற்பகுதியில்'],
      [
        { en: '(1) same quadrant', ta: '(1) ஒரே காற்பகுதியில்' },
        { en: '(2) II and III quadrant respectively', ta: '(2) முறையே II, III காற்பகுதியில்' },
        { en: '(3) II and IV quadrant respectively', ta: '(3) முறையே II, IV காற்பகுதியில்' },
        { en: '(4) IV and II quadrant respectively', ta: '(4) முறையே IV, II காற்பகுதியில்' }
      ],
      2,
      [step('(−5, 2) has signs (−, +) → II quadrant; (2, −5) has signs (+, −) → IV quadrant. Correct option: (3).', '(−5, 2) என்பது (−, +) குறியுடன் II காற்பகுதியிலும், (2, −5) என்பது (+, −) குறியுடன் IV காற்பகுதியிலும் அமையும். சரியான விடை: (3).', '(−5, 2) ∈ II; (2, −5) ∈ IV', '(-5,2)\\in\\text{II},\\quad (2,-5)\\in\\text{IV}')],
      '(3) II and IV quadrant respectively', '(3) முறையே II, IV காற்பகுதியில்', '\\text{(3) II and IV}', { ansLatexTa: '\\text{(3) முறையே II, IV}' }
    ),

    mcq(3, 'Shape formed by O(0,0), A(3,−4), B(3,4), C(0,4)', 'O, A, B, C புள்ளிகளால் உருவாகும் வடிவம்',
      '3. On plotting the points O(0, 0), A(3, −4), B(3, 4) and C(0, 4) and joining OA, AB, BC and CO, which of the following figure is obtained?\n(1) Square   (2) Rectangle   (3) Trapezium   (4) Rhombus',
      '3. புள்ளிகள் O(0, 0), A(3, −4), B(3, 4) மற்றும் C(0, 4) ஐக் குறித்து அவற்றை OA, AB, BC மற்றும் CO என இணைத்தால் கிடைக்கும் உருவம் ______.\n(1) சதுரம்   (2) செவ்வகம்   (3) சரிவகம்   (4) சாய்சதுரம்',
      ['3. On plotting the points ', tex('O(0,0), A(3,-4), B(3,4)', 'O(0, 0), A(3, −4), B(3, 4)'), ' and ', tex('C(0, 4)', 'C(0, 4)'), ' and joining OA, AB, BC and CO, which of the following figure is obtained?\n(1) Square   (2) Rectangle   (3) Trapezium   (4) Rhombus'],
      ['3. புள்ளிகள் ', tex('O(0,0), A(3,-4), B(3,4)', 'O(0, 0), A(3, −4), B(3, 4)'), ' மற்றும் ', tex('C(0, 4)', 'C(0, 4)'), ' ஐக் குறித்து அவற்றை OA, AB, BC மற்றும் CO என இணைத்தால் கிடைக்கும் உருவம் ______.\n(1) சதுரம்   (2) செவ்வகம்   (3) சரிவகம்   (4) சாய்சதுரம்'],
      [
        { en: '(1) Square', ta: '(1) சதுரம்' },
        { en: '(2) Rectangle', ta: '(2) செவ்வகம்' },
        { en: '(3) Trapezium', ta: '(3) சரிவகம்' },
        { en: '(4) Rhombus', ta: '(4) சாய்சதுரம்' }
      ],
      2,
      [step('CO lies on x = 0 (length 4) and AB lies on x = 3 (length 8). Since AB ∥ CO with unequal lengths (and OA = 5, BC = 3 are not parallel), OABC is a trapezium. Correct option: (3).', 'CO (x = 0, நீளம் 4) மற்றும் AB (x = 3, நீளம் 8) ஆகிய இரண்டும் செங்குத்துப் பக்கங்களாக இணையாக உள்ளன (நீளம் சமமல்ல). எனவே OABC ஒரு சரிவகம். சரியான விடை: (3).', 'CO ∥ AB (4 ≠ 8) ⇒ Trapezium', 'CO \\parallel AB,\\; CO=4\\ne 8=AB \\implies \\text{Trapezium}')],
      '(3) Trapezium', '(3) சரிவகம்', '\\text{(3) Trapezium}', {
        ansLatexTa: '\\text{(3) சரிவகம்}',
        figureSrc: 'assets/grade9-ch5/ex5-6-q3.svg',
        figureAlt: { en: 'Trapezium OABC with vertices (0,0), (3,-4), (3,4), (0,4)', ta: 'சரிவகம் OABC வரைபடம்' },
        figureCaption: { en: 'OABC has one pair of parallel vertical sides OC and AB', ta: 'OC மற்றும் AB இணையாக உள்ள சரிவகம் OABC' }
      }
    ),

    mcq(4, 'Points in the fourth quadrant', 'நான்காவது காற்பகுதியில் அமையும் புள்ளிகள்',
      '4. If P(−1, 1), Q(3, −4), R(1, −1), S(−2, −3) and T(−4, 4) are plotted on a graph paper, then the points in the fourth quadrant are ______\n(1) P and T   (2) Q and R   (3) only S   (4) P and Q',
      '4. புள்ளிகள் P(−1, 1), Q(3, −4), R(1, −1), S(−2, −3) மற்றும் T(−4, 4) என்பன ஒரு வரைபடத் தாளில் குறிக்கப்பட்டால் நான்காவது காற்பகுதியில் அமையும் புள்ளிகள் ______\n(1) P மற்றும் T   (2) Q மற்றும் R   (3) S மட்டும்   (4) P மற்றும் Q',
      ['4. If ', tex('P(-1,1), Q(3,-4), R(1,-1), S(-2,-3)', 'P(−1, 1), Q(3, −4), R(1, −1), S(−2, −3)'), ' and ', tex('T(-4,4)', 'T(−4, 4)'), ' are plotted on a graph paper, then the points in the fourth quadrant are ______\n(1) P and T   (2) Q and R   (3) only S   (4) P and Q'],
      ['4. புள்ளிகள் ', tex('P(-1,1), Q(3,-4), R(1,-1), S(-2,-3)', 'P(−1, 1), Q(3, −4), R(1, −1), S(−2, −3)'), ' மற்றும் ', tex('T(-4,4)', 'T(−4, 4)'), ' என்பன ஒரு வரைபடத் தாளில் குறிக்கப்பட்டால் நான்காவது காற்பகுதியில் அமையும் புள்ளிகள் ______\n(1) P மற்றும் T   (2) Q மற்றும் R   (3) S மட்டும்   (4) P மற்றும் Q'],
      [
        { en: '(1) P and T', ta: '(1) P மற்றும் T' },
        { en: '(2) Q and R', ta: '(2) Q மற்றும் R' },
        { en: '(3) only S', ta: '(3) S மட்டும்' },
        { en: '(4) P and Q', ta: '(4) P மற்றும் Q' }
      ],
      1,
      [step('Fourth quadrant points have (+, −) signs: Q(3, −4) and R(1, −1). Correct option: (2).', 'நான்காவது காற்பகுதியில் (+, −) குறிகள் இருக்கும்: Q(3, −4) மற்றும் R(1, −1). சரியான விடை: (2).', 'Q(3, −4), R(1, −1) have (+, −)', 'Q(3,-4),\\; R(1,-1)\\in\\text{IV}')],
      '(2) Q and R', '(2) Q மற்றும் R', '\\text{(2) }Q\\text{ and }R', { ansLatexTa: '\\text{(2) }Q\\text{ மற்றும் }R' }
    ),

    mcq(5, 'Point with ordinate 4 on the y-axis', 'y-அச்சில் அமையும் புள்ளி',
      '5. The point whose ordinate is 4 and which lies on the y-axis is ______\n(1) (4, 0)   (2) (0, 4)   (3) (1, 4)   (4) (4, 2)',
      '5. ஒரு புள்ளியின் y அச்சுத் தொலைவு 4 மற்றும் அப்புள்ளி y அச்சில் அமைந்தால் அப்புள்ளி ______ ஆகும்\n(1) (4, 0)   (2) (0, 4)   (3) (1, 4)   (4) (4, 2)',
      ['5. The point whose ordinate is 4 and which lies on the y-axis is ______\n(1) (4, 0)   (2) (0, 4)   (3) (1, 4)   (4) (4, 2)'],
      ['5. ஒரு புள்ளியின் y அச்சுத் தொலைவு 4 மற்றும் அப்புள்ளி y அச்சில் அமைந்தால் அப்புள்ளி ______ ஆகும்\n(1) (4, 0)   (2) (0, 4)   (3) (1, 4)   (4) (4, 2)'],
      [
        { en: '(1) (4, 0)', ta: '(1) (4, 0)' },
        { en: '(2) (0, 4)', ta: '(2) (0, 4)' },
        { en: '(3) (1, 4)', ta: '(3) (1, 4)' },
        { en: '(4) (4, 2)', ta: '(4) (4, 2)' }
      ],
      1,
      [step('Any point on the y-axis has x = 0, and its ordinate is y = 4, so the point is (0, 4). Correct option: (2).', 'y-அச்சின் மீதுள்ள புள்ளியில் x = 0, y = 4 என்பதால் புள்ளி (0, 4) ஆகும். சரியான விடை: (2).', 'x = 0, y = 4 ⇒ (0, 4)', '(0, 4)')],
      '(2) (0, 4)', '(2) (0, 4)', '\\text{(2) }(0, 4)'
    ),

    mcq(6, 'Distance between (2, 3) and (1, 4)', '(2, 3) மற்றும் (1, 4) இடையே தொலைவு',
      '6. The distance between the two points (2, 3) and (1, 4) is ______\n(1) 2   (2) √56   (3) √10   (4) √2',
      '6. (2, 3) மற்றும் (1, 4) என்ற புள்ளிகளுக்கு இடையே உள்ள தொலைவு ______\n(1) 2   (2) √56   (3) √10   (4) √2',
      ['6. The distance between the two points ', tex('(2, 3)', '(2, 3)'), ' and ', tex('(1, 4)', '(1, 4)'), ' is ______\n(1) 2   (2) √56   (3) √10   (4) √2'],
      ['6. ', tex('(2, 3)', '(2, 3)'), ' மற்றும் ', tex('(1, 4)', '(1, 4)'), ' என்ற புள்ளிகளுக்கு இடையே உள்ள தொலைவு ______\n(1) 2   (2) √56   (3) √10   (4) √2'],
      [
        { en: '(1) 2', ta: '(1) 2' },
        { en: '(2) √56', ta: '(2) √56' },
        { en: '(3) √10', ta: '(3) √10' },
        { en: '(4) √2', ta: '(4) √2' }
      ],
      3,
      [step('d = √((1 − 2)² + (4 − 3)²) = √(1 + 1) = √2. Correct option: (4).', 'd = √((1 − 2)² + (4 − 3)²) = √(1 + 1) = √2. சரியான விடை: (4).', 'd = √((1−2)² + (4−3)²) = √2', 'd = \\sqrt{(1-2)^2+(4-3)^2} = \\sqrt{1+1} = \\sqrt{2}')],
      '(4) √2', '(4) √2', '\\text{(4) }\\sqrt{2}'
    ),

    mcq(7, 'Points on x-axis and value of a', 'x-அச்சில் அமையும் புள்ளியும் a மதிப்பும்',
      '7. If the points A(2, 0), B(−6, 0), C(3, a − 3) lie on the x-axis then the value of a is ______\n(1) 0   (2) 2   (3) 3   (4) −6',
      '7. புள்ளிகள் A(2, 0), B(−6, 0), C(3, a − 3) ஆனது x-அச்சின் மீது அமைந்தால் a இன் மதிப்பு ______\n(1) 0   (2) 2   (3) 3   (4) −6',
      ['7. If the points ', tex('A(2, 0), B(-6, 0), C(3, a-3)', 'A(2, 0), B(−6, 0), C(3, a − 3)'), ' lie on the x-axis then the value of ', tex('a', 'a'), ' is ______\n(1) 0   (2) 2   (3) 3   (4) −6'],
      ['7. புள்ளிகள் ', tex('A(2, 0), B(-6, 0), C(3, a-3)', 'A(2, 0), B(−6, 0), C(3, a − 3)'), ' ஆனது x-அச்சின் மீது அமைந்தால் ', tex('a', 'a'), ' இன் மதிப்பு ______\n(1) 0   (2) 2   (3) 3   (4) −6'],
      [
        { en: '(1) 0', ta: '(1) 0' },
        { en: '(2) 2', ta: '(2) 2' },
        { en: '(3) 3', ta: '(3) 3' },
        { en: '(4) −6', ta: '(4) −6' }
      ],
      2,
      [step('Since C(3, a − 3) lies on the x-axis, its y-coordinate is 0: a − 3 = 0 ⇒ a = 3. Correct option: (3).', 'C(3, a − 3) ஆனது x-அச்சின் மீது உள்ளதால் y = 0 ⇒ a − 3 = 0 ⇒ a = 3. சரியான விடை: (3).', 'a − 3 = 0 ⇒ a = 3', 'a - 3 = 0 \\implies a = 3')],
      '(3) 3', '(3) 3', '\\text{(3) }3'
    ),

    mcq(8, 'Equality of ordered pairs', 'வரிசைச் சோடிகளின் சமத்துவம்',
      '8. If (x + 2, 4) = (5, y − 2), then the coordinates (x, y) are ______\n(1) (7, 12)   (2) (6, 3)   (3) (3, 6)   (4) (2, 1)',
      '8. (x + 2, 4) = (5, y − 2) எனில், (x, y) இன் மதிப்பு ______\n(1) (7, 12)   (2) (6, 3)   (3) (3, 6)   (4) (2, 1)',
      ['8. If ', tex('(x+2, 4) = (5, y-2)', '(x + 2, 4) = (5, y − 2)'), ', then the coordinates ', tex('(x, y)', '(x, y)'), ' are ______\n(1) (7, 12)   (2) (6, 3)   (3) (3, 6)   (4) (2, 1)'],
      ['8. ', tex('(x+2, 4) = (5, y-2)', '(x + 2, 4) = (5, y − 2)'), ' எனில், ', tex('(x, y)', '(x, y)'), ' இன் மதிப்பு ______\n(1) (7, 12)   (2) (6, 3)   (3) (3, 6)   (4) (2, 1)'],
      [
        { en: '(1) (7, 12)', ta: '(1) (7, 12)' },
        { en: '(2) (6, 3)', ta: '(2) (6, 3)' },
        { en: '(3) (3, 6)', ta: '(3) (3, 6)' },
        { en: '(4) (2, 1)', ta: '(4) (2, 1)' }
      ],
      2,
      [step('Equating corresponding coordinates: x + 2 = 5 ⇒ x = 3 and 4 = y − 2 ⇒ y = 6. Correct option: (3).', 'ஒத்த ஆயத்தொலைவுகளைச் சமப்படுத்த: x + 2 = 5 ⇒ x = 3 மற்றும் 4 = y − 2 ⇒ y = 6. சரியான விடை: (3).', 'x = 3, y = 6 ⇒ (3, 6)', 'x+2=5 \\implies x=3;\\quad y-2=4 \\implies y=6')],
      '(3) (3, 6)', '(3) (3, 6)', '\\text{(3) }(3, 6)'
    ),

    mcq(9, 'Intersection of quadrants Q₂ ∩ Q₃', 'காற்பகுதிகள் Q₂ ∩ Q₃',
      '9. If Q₁, Q₂, Q₃, Q₄ are the quadrants in a Cartesian plane then Q₂ ∩ Q₃ is ______\n(1) Q₁ ∪ Q₂   (2) Q₂ ∪ Q₃   (3) Null set   (4) Negative x-axis.',
      '9. Q₁, Q₂, Q₃, Q₄ என்பன கார்ட்டீசியன் தளத்தின் நான்கு காற்பகுதிகள் எனில், Q₂ ∩ Q₃ என்பது ______\n(1) Q₁ ∪ Q₂   (2) Q₂ ∪ Q₃   (3) வெற்றுக் கணம்   (4) x-அச்சின் குறைப் பகுதி.',
      ['9. If ', tex('Q_1, Q_2, Q_3, Q_4', 'Q₁, Q₂, Q₃, Q₄'), ' are the quadrants in a Cartesian plane then ', tex('Q_2 \\cap Q_3', 'Q₂ ∩ Q₃'), ' is ______\n(1) Q₁ ∪ Q₂   (2) Q₂ ∪ Q₃   (3) Null set   (4) Negative x-axis.'],
      ['9. ', tex('Q_1, Q_2, Q_3, Q_4', 'Q₁, Q₂, Q₃, Q₄'), ' என்பன கார்ட்டீசியன் தளத்தின் நான்கு காற்பகுதிகள் எனில், ', tex('Q_2 \\cap Q_3', 'Q₂ ∩ Q₃'), ' என்பது ______\n(1) Q₁ ∪ Q₂   (2) Q₂ ∪ Q₃   (3) வெற்றுக் கணம்   (4) x-அச்சின் குறைப் பகுதி.'],
      [
        { en: '(1) Q₁ ∪ Q₂', ta: '(1) Q₁ ∪ Q₂' },
        { en: '(2) Q₂ ∪ Q₃', ta: '(2) Q₂ ∪ Q₃' },
        { en: '(3) Null set', ta: '(3) வெற்றுக் கணம்' },
        { en: '(4) Negative x-axis.', ta: '(4) x-அச்சின் குறைப் பகுதி.' }
      ],
      2,
      [step('The four quadrants are open regions that exclude the coordinate axes. Points in Q₂ have y > 0 while points in Q₃ have y < 0, so they share no common points: Q₂ ∩ Q₃ = ∅ (Null set). Correct option: (3).', 'நான்கு காற்பகுதிகளும் அச்சுகளை உள்ளடக்காத தனித்தனிப் பகுதிகளாகும். Q₂-இல் y > 0 மற்றும் Q₃-இல் y < 0 என்பதால் பொதுப் புள்ளிகள் இல்லை: Q₂ ∩ Q₃ = ∅ (வெற்றுக் கணம்). சரியான விடை: (3).', 'Q₂ ∩ Q₃ = ∅ (Null set)', 'Q_2 \\cap Q_3 = \\varnothing\\;(\\text{Null set})')],
      '(3) Null set', '(3) வெற்றுக் கணம்', '\\text{(3) Null set}', { ansLatexTa: '\\text{(3) வெற்றுக் கணம்}' }
    ),

    mcq(10, 'Distance from origin to (5, −1)', 'ஆதிப்புள்ளியிலிருந்து (5, −1) தொலைவு',
      '10. The distance between the point (5, −1) and the origin is ______\n(1) √24   (2) √37   (3) √26   (4) √17',
      '10. (5, −1) என்ற புள்ளிக்கும் ஆதிப் புள்ளிக்கும் இடையே உள்ள தொலைவு ______\n(1) √24   (2) √37   (3) √26   (4) √17',
      ['10. The distance between the point ', tex('(5, -1)', '(5, −1)'), ' and the origin is ______\n(1) √24   (2) √37   (3) √26   (4) √17'],
      ['10. ', tex('(5, -1)', '(5, −1)'), ' என்ற புள்ளிக்கும் ஆதிப் புள்ளிக்கும் இடையே உள்ள தொலைவு ______\n(1) √24   (2) √37   (3) √26   (4) √17'],
      [
        { en: '(1) √24', ta: '(1) √24' },
        { en: '(2) √37', ta: '(2) √37' },
        { en: '(3) √26', ta: '(3) √26' },
        { en: '(4) √17', ta: '(4) √17' }
      ],
      2,
      [step('Distance from origin (0, 0) to (5, −1) is √(5² + (−1)²) = √(25 + 1) = √26. Correct option: (3).', 'ஆதிப்புள்ளி (0, 0)-லிருந்து (5, −1)-க்கு உள்ள தொலைவு √(5² + (−1)²) = √26. சரியான விடை: (3).', 'd = √(5² + (−1)²) = √26', 'd = \\sqrt{5^2+(-1)^2} = \\sqrt{26}')],
      '(3) √26', '(3) √26', '\\text{(3) }\\sqrt{26}'
    ),

    mcq(11, 'Section formula in ratio 2:1', '2:1 விகிதத்தில் பிரிக்கும் புள்ளி',
      '11. The coordinates of the point C dividing the line segment joining the points P(2, 4) and Q(5, 7) internally in the ratio 2:1 is\n(1) (7/2, 11/2)   (2) (3, 5)   (3) (4, 4)   (4) (4, 6)',
      '11. P(2, 4) மற்றும் Q(5, 7) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை 2:1 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளி C-இன் ஆயத்தொலைவுகள்\n(1) (7/2, 11/2)   (2) (3, 5)   (3) (4, 4)   (4) (4, 6)',
      ['11. The coordinates of the point C dividing the line segment joining the points ', tex('P(2, 4)', 'P(2, 4)'), ' and ', tex('Q(5, 7)', 'Q(5, 7)'), ' internally in the ratio ', tex('2:1', '2:1'), ' is\n(1) (7/2, 11/2)   (2) (3, 5)   (3) (4, 4)   (4) (4, 6)'],
      ['11. ', tex('P(2, 4)', 'P(2, 4)'), ' மற்றும் ', tex('Q(5, 7)', 'Q(5, 7)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை ', tex('2:1', '2:1'), ' என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளி C-இன் ஆயத்தொலைவுகள்\n(1) (7/2, 11/2)   (2) (3, 5)   (3) (4, 4)   (4) (4, 6)'],
      [
        { en: '(1) (7/2, 11/2)', ta: '(1) (7/2, 11/2)' },
        { en: '(2) (3, 5)', ta: '(2) (3, 5)' },
        { en: '(3) (4, 4)', ta: '(3) (4, 4)' },
        { en: '(4) (4, 6)', ta: '(4) (4, 6)' }
      ],
      3,
      [step('C = ((2×5 + 1×2)/3, (2×7 + 1×4)/3) = (12/3, 18/3) = (4, 6). Correct option: (4).', 'C = ((2×5 + 1×2)/3, (2×7 + 1×4)/3) = (12/3, 18/3) = (4, 6). சரியான விடை: (4).', 'C = (4, 6)', 'C = \\left(\\dfrac{2(5)+1(2)}{3},\\; \\dfrac{2(7)+1(4)}{3}\\right) = (4, 6)')],
      '(4) (4, 6)', '(4) (4, 6)', '\\text{(4) }(4, 6)'
    ),

    mcq(12, 'Mid-point with algebraic parameters (a/3, b/2)', 'நடுப்புள்ளியிலிருந்து (a, b) காணுதல்',
      '12. If P(a/3, b/2) is the mid-point of the line segment joining A(−4, 3) and B(−2, 4) then (a, b) is\n(1) (−9, 7)   (2) (−3, 7/2)   (3) (9, −7)   (4) (3, −7/2)',
      '12. A(−4, 3) மற்றும் B(−2, 4) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி P(a/3, b/2) எனில் (a, b) ஆனது\n(1) (−9, 7)   (2) (−3, 7/2)   (3) (9, −7)   (4) (3, −7/2)',
      ['12. If ', tex('P\\left(\\dfrac{a}{3}, \\dfrac{b}{2}\\right)', 'P(a/3, b/2)'), ' is the mid-point of the line segment joining ', tex('A(-4, 3)', 'A(−4, 3)'), ' and ', tex('B(-2, 4)', 'B(−2, 4)'), ' then ', tex('(a, b)', '(a, b)'), ' is\n(1) (−9, 7)   (2) (−3, 7/2)   (3) (9, −7)   (4) (3, −7/2)'],
      ['12. ', tex('A(-4, 3)', 'A(−4, 3)'), ' மற்றும் ', tex('B(-2, 4)', 'B(−2, 4)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி ', tex('P\\left(\\dfrac{a}{3}, \\dfrac{b}{2}\\right)', 'P(a/3, b/2)'), ' எனில் ', tex('(a, b)', '(a, b)'), ' ஆனது\n(1) (−9, 7)   (2) (−3, 7/2)   (3) (9, −7)   (4) (3, −7/2)'],
      [
        { en: '(1) (−9, 7)', ta: '(1) (−9, 7)' },
        { en: '(2) (−3, 7/2)', ta: '(2) (−3, 7/2)' },
        { en: '(3) (9, −7)', ta: '(3) (9, −7)' },
        { en: '(4) (3, −7/2)', ta: '(4) (3, −7/2)' }
      ],
      0,
      [step('Mid-point of (−4, 3) and (−2, 4) is (−3, 7/2). Equating a/3 = −3 ⇒ a = −9, and b/2 = 7/2 ⇒ b = 7. Correct option: (1).', 'நடுப்புள்ளி (−3, 7/2). எனவே a/3 = −3 ⇒ a = −9, மற்றும் b/2 = 7/2 ⇒ b = 7. சரியான விடை: (1).', 'a/3 = −3 ⇒ a = −9; b/2 = 7/2 ⇒ b = 7', '\\dfrac{a}{3}=-3\\implies a=-9,\\quad \\dfrac{b}{2}=\\dfrac{7}{2}\\implies b=7')],
      '(1) (−9, 7)', '(1) (−9, 7)', '\\text{(1) }(-9, 7)'
    ),

    mcq(13, 'Ratio in which Q(1, 6) divides PR', 'Q(1, 6) பிரிக்கும் விகிதம்',
      '13. In what ratio does the point Q(1, 6) divide the line segment joining the points P(2, 7) and R(−2, 3)\n(1) 1:2   (2) 2:1   (3) 1:3   (4) 3:1',
      '13. P(2, 7) மற்றும் R(−2, 3) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை Q(1, 6) என்ற புள்ளியானது என்ன விகிதத்தில் பிரிக்கும்?\n(1) 1:2   (2) 2:1   (3) 1:3   (4) 3:1',
      ['13. In what ratio does the point ', tex('Q(1, 6)', 'Q(1, 6)'), ' divide the line segment joining the points ', tex('P(2, 7)', 'P(2, 7)'), ' and ', tex('R(-2, 3)', 'R(−2, 3)'), '\n(1) 1:2   (2) 2:1   (3) 1:3   (4) 3:1'],
      ['13. ', tex('P(2, 7)', 'P(2, 7)'), ' மற்றும் ', tex('R(-2, 3)', 'R(−2, 3)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை ', tex('Q(1, 6)', 'Q(1, 6)'), ' என்ற புள்ளியானது என்ன விகிதத்தில் பிரிக்கும்?\n(1) 1:2   (2) 2:1   (3) 1:3   (4) 3:1'],
      [
        { en: '(1) 1:2', ta: '(1) 1:2' },
        { en: '(2) 2:1', ta: '(2) 2:1' },
        { en: '(3) 1:3', ta: '(3) 1:3' },
        { en: '(4) 3:1', ta: '(4) 3:1' }
      ],
      2,
      [step('Let ratio be k : 1. Equate x-coordinate: (−2k + 2)/(k + 1) = 1 ⇒ −2k + 2 = k + 1 ⇒ 3k = 1 ⇒ k = 1/3 (ratio 1:3). Correct option: (3).', 'விகிதம் k : 1 என்க. (−2k + 2)/(k + 1) = 1 ⇒ 3k = 1 ⇒ k = 1/3 (1:3). சரியான விடை: (3).', '(−2k + 2)/(k + 1) = 1 ⇒ 1:3', '\\dfrac{-2k+2}{k+1}=1 \\implies 3k=1 \\implies k=\\dfrac{1}{3}\\;(1:3)')],
      '(3) 1:3', '(3) 1:3', '\\text{(3) }1:3'
    ),

    mcq(14, 'Other end of circle diameter', 'விட்டத்தின் மற்றொரு முனை',
      '14. If the coordinates of one end of a diameter of a circle is (3, 4) and the coordinates of its centre is (−3, 2), then the coordinate of the other end of the diameter is\n(1) (0, −3)   (2) (0, 9)   (3) (3, 0)   (4) (−9, 0)',
      '14. (−3, 2) என்ற புள்ளியை மையமாகக் கொண்ட வட்டத்தில் (3, 4) ஐ ஒரு முனையாகக் கொண்ட விட்டத்தின் மற்றொரு முனையைக் காண்க\n(1) (0, −3)   (2) (0, 9)   (3) (3, 0)   (4) (−9, 0)',
      ['14. If the coordinates of one end of a diameter of a circle is ', tex('(3, 4)', '(3, 4)'), ' and the coordinates of its centre is ', tex('(-3, 2)', '(−3, 2)'), ', then the coordinate of the other end of the diameter is\n(1) (0, −3)   (2) (0, 9)   (3) (3, 0)   (4) (−9, 0)'],
      ['14. ', tex('(-3, 2)', '(−3, 2)'), ' என்ற புள்ளியை மையமாகக் கொண்ட வட்டத்தில் ', tex('(3, 4)', '(3, 4)'), ' ஐ ஒரு முனையாகக் கொண்ட விட்டத்தின் மற்றொரு முனையைக் காண்க\n(1) (0, −3)   (2) (0, 9)   (3) (3, 0)   (4) (−9, 0)'],
      [
        { en: '(1) (0, −3)', ta: '(1) (0, −3)' },
        { en: '(2) (0, 9)', ta: '(2) (0, 9)' },
        { en: '(3) (3, 0)', ta: '(3) (3, 0)' },
        { en: '(4) (−9, 0)', ta: '(4) (−9, 0)' }
      ],
      3,
      [step('Other end = (2(−3) − 3, 2(2) − 4) = (−9, 0). Correct option: (4).', 'மற்றொரு முனை = (2(−3) − 3, 2(2) − 4) = (−9, 0). சரியான விடை: (4).', '(3+x)/2 = −3 ⇒ x = −9; (4+y)/2 = 2 ⇒ y = 0', '\\dfrac{3+x}{2}=-3\\implies x=-9,\\quad \\dfrac{4+y}{2}=2\\implies y=0')],
      '(4) (−9, 0)', '(4) (−9, 0)', '\\text{(4) }(-9, 0)'
    ),

    mcq(15, 'Symbolic ratio of x-axis division', 'x-அச்சு பிரிக்கும் விகிதம் (குறியீட்டு வடிவம்)',
      '15. The ratio in which the x-axis divides the line segment joining the points A(a₁, b₁) and B(a₂, b₂) is\n(1) b₁ : b₂   (2) −b₁ : b₂   (3) a₁ : a₂   (4) −a₁ : a₂',
      '15. A(a₁, b₁) மற்றும் B(a₂, b₂) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை X-அச்சு எந்த விகிதத்தில் பிரிக்கும்?\n(1) b₁ : b₂   (2) −b₁ : b₂   (3) a₁ : a₂   (4) −a₁ : a₂',
      ['15. The ratio in which the x-axis divides the line segment joining the points ', tex('A(a_1, b_1)', 'A(a₁, b₁)'), ' and ', tex('B(a_2, b_2)', 'B(a₂, b₂)'), ' is\n(1) ', tex('b_1 : b_2', 'b₁ : b₂'), '   (2) ', tex('-b_1 : b_2', '−b₁ : b₂'), '   (3) ', tex('a_1 : a_2', 'a₁ : a₂'), '   (4) ', tex('-a_1 : a_2', '−a₁ : a₂')],
      ['15. ', tex('A(a_1, b_1)', 'A(a₁, b₁)'), ' மற்றும் ', tex('B(a_2, b_2)', 'B(a₂, b₂)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை X-அச்சு எந்த விகிதத்தில் பிரிக்கும்?\n(1) ', tex('b_1 : b_2', 'b₁ : b₂'), '   (2) ', tex('-b_1 : b_2', '−b₁ : b₂'), '   (3) ', tex('a_1 : a_2', 'a₁ : a₂'), '   (4) ', tex('-a_1 : a_2', '−a₁ : a₂')],
      [
        { en: '(1) b₁ : b₂', ta: '(1) b₁ : b₂' },
        { en: '(2) −b₁ : b₂', ta: '(2) −b₁ : b₂' },
        { en: '(3) a₁ : a₂', ta: '(3) a₁ : a₂' },
        { en: '(4) −a₁ : a₂', ta: '(4) −a₁ : a₂' }
      ],
      1,
      [step('On the x-axis, y = 0. Let the ratio be k : 1, so (k b₂ + b₁)/(k + 1) = 0 ⇒ k = −b₁/b₂, i.e., −b₁ : b₂. Correct option: (2).', 'x-அச்சில் y = 0. விகிதம் k : 1 எனில் (kb₂ + b₁)/(k + 1) = 0 ⇒ k = −b₁/b₂, அதாவது −b₁ : b₂. சரியான விடை: (2).', 'kb₂ + b₁ = 0 ⇒ k = −b₁/b₂ ⇒ −b₁ : b₂', 'kb_2+b_1=0 \\implies k = -\\dfrac{b_1}{b_2} \\implies -b_1:b_2')],
      '(2) −b₁ : b₂', '(2) −b₁ : b₂', '\\text{(2) }-b_1:b_2'
    ),

    mcq(16, 'Ratio in which x-axis divides (6, 4) and (1, −7)', 'x-அச்சு (6, 4) மற்றும் (1, −7)-ஐ பிரிக்கும் விகிதம்',
      '16. The ratio in which the x-axis divides the line segment joining the points (6, 4) and (1, −7) is\n(1) 2:3   (2) 3:4   (3) 4:7   (4) 4:3',
      '16. (6, 4) மற்றும் (1, −7) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை X-அச்சு எந்த விகிதத்தில் பிரிக்கும்?\n(1) 2:3   (2) 3:4   (3) 4:7   (4) 4:3',
      ['16. The ratio in which the x-axis divides the line segment joining the points ', tex('(6, 4)', '(6, 4)'), ' and ', tex('(1, -7)', '(1, −7)'), ' is\n(1) 2:3   (2) 3:4   (3) 4:7   (4) 4:3'],
      ['16. ', tex('(6, 4)', '(6, 4)'), ' மற்றும் ', tex('(1, -7)', '(1, −7)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத் துண்டை X-அச்சு எந்த விகிதத்தில் பிரிக்கும்?\n(1) 2:3   (2) 3:4   (3) 4:7   (4) 4:3'],
      [
        { en: '(1) 2:3', ta: '(1) 2:3' },
        { en: '(2) 3:4', ta: '(2) 3:4' },
        { en: '(3) 4:7', ta: '(3) 4:7' },
        { en: '(4) 4:3', ta: '(4) 4:3' }
      ],
      2,
      [step('Ratio = −y₁ : y₂ = −4 : (−7) = 4 : 7. Correct option: (3).', 'விகிதம் = −y₁ : y₂ = −4 : (−7) = 4 : 7. சரியான விடை: (3).', 'k = −4/(−7) = 4/7 ⇒ 4:7', 'k = -\\dfrac{4}{-7} = \\dfrac{4}{7} \\implies 4:7')],
      '(3) 4:7', '(3) 4:7', '\\text{(3) }4:7'
    ),

    mcq(17, 'Vertices A and B from side mid-points', 'பக்க நடுப்புள்ளிகளிலிருந்து உச்சிகள் A, B',
      '17. If the coordinates of the mid-points of the sides AB, BC and CA of a triangle are (3, 4), (1, 1) and (2, −3) respectively, then the vertices A and B of the triangle are\n(1) (3, 2), (2, 4)   (2) (4, 0), (2, 8)   (3) (3, 4), (2, 0)   (4) (4, 3), (2, 4)',
      '17. ஒரு முக்கோணத்தின் பக்கங்கள் AB, BC மற்றும் CA ஆகியவற்றின் நடுப் புள்ளிகளின் ஆயத் தொலைவுகள் முறையே (3, 4), (1, 1) மற்றும் (2, −3) எனில் A மற்றும் B இன் ஆயத்தொலைவுகள் யாவை?\n(1) (3, 2), (2, 4)   (2) (4, 0), (2, 8)   (3) (3, 4), (2, 0)   (4) (4, 3), (2, 4)',
      ['17. If the coordinates of the mid-points of the sides ', tex('AB, BC', 'AB, BC'), ' and ', tex('CA', 'CA'), ' of a triangle are ', tex('(3, 4), (1, 1)', '(3, 4), (1, 1)'), ' and ', tex('(2, -3)', '(2, −3)'), ' respectively, then the vertices ', tex('A', 'A'), ' and ', tex('B', 'B'), ' of the triangle are\n(1) (3, 2), (2, 4)   (2) (4, 0), (2, 8)   (3) (3, 4), (2, 0)   (4) (4, 3), (2, 4)'],
      ['17. ஒரு முக்கோணத்தின் பக்கங்கள் ', tex('AB, BC', 'AB, BC'), ' மற்றும் ', tex('CA', 'CA'), ' ஆகியவற்றின் நடுப் புள்ளிகளின் ஆயத் தொலைவுகள் முறையே ', tex('(3, 4), (1, 1)', '(3, 4), (1, 1)'), ' மற்றும் ', tex('(2, -3)', '(2, −3)'), ' எனில் ', tex('A', 'A'), ' மற்றும் ', tex('B', 'B'), ' இன் ஆயத்தொலைவுகள் யாவை?\n(1) (3, 2), (2, 4)   (2) (4, 0), (2, 8)   (3) (3, 4), (2, 0)   (4) (4, 3), (2, 4)'],
      [
        { en: '(1) (3, 2), (2, 4)', ta: '(1) (3, 2), (2, 4)' },
        { en: '(2) (4, 0), (2, 8)', ta: '(2) (4, 0), (2, 8)' },
        { en: '(3) (3, 4), (2, 0)', ta: '(3) (3, 4), (2, 0)' },
        { en: '(4) (4, 3), (2, 4)', ta: '(4) (4, 3), (2, 4)' }
      ],
      1,
      [step('A = mid(AB) + mid(CA) − mid(BC) = (3 + 2 − 1, 4 − 3 − 1) = (4, 0); B = mid(AB) + mid(BC) − mid(CA) = (3 + 1 − 2, 4 + 1 + 3) = (2, 8). Correct option: (2).', 'A = (3 + 2 − 1, 4 − 3 − 1) = (4, 0); B = (3 + 1 − 2, 4 + 1 + 3) = (2, 8). சரியான விடை: (2).', 'A = (4, 0), B = (2, 8)', '\\begin{aligned}A &= (3+2-1,\\; 4-3-1) = (4, 0)\\\\B &= (3+1-2,\\; 4+1+3) = (2, 8)\\end{aligned}')],
      '(2) (4, 0), (2, 8)', '(2) (4, 0), (2, 8)', '\\text{(2) }(4,0),\\;(2,8)'
    ),

    mcq(18, 'Mid-point of (−a, 2b) and (−3a, −4b)', '(−a, 2b) மற்றும் (−3a, −4b)-இன் நடுப்புள்ளி',
      '18. The mid-point of the line joining (−a, 2b) and (−3a, −4b) is\n(1) (2a, 3b)   (2) (−2a, −b)   (3) (2a, b)   (4) (−2a, −3b)',
      '18. (−a, 2b) மற்றும் (−3a, −4b) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப் புள்ளியானது\n(1) (2a, 3b)   (2) (−2a, −b)   (3) (2a, b)   (4) (−2a, −3b)',
      ['18. The mid-point of the line joining ', tex('(-a, 2b)', '(−a, 2b)'), ' and ', tex('(-3a, -4b)', '(−3a, −4b)'), ' is\n(1) (2a, 3b)   (2) (−2a, −b)   (3) (2a, b)   (4) (−2a, −3b)'],
      ['18. ', tex('(-a, 2b)', '(−a, 2b)'), ' மற்றும் ', tex('(-3a, -4b)', '(−3a, −4b)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப் புள்ளியானது\n(1) (2a, 3b)   (2) (−2a, −b)   (3) (2a, b)   (4) (−2a, −3b)'],
      [
        { en: '(1) (2a, 3b)', ta: '(1) (2a, 3b)' },
        { en: '(2) (−2a, −b)', ta: '(2) (−2a, −b)' },
        { en: '(3) (2a, b)', ta: '(3) (2a, b)' },
        { en: '(4) (−2a, −3b)', ta: '(4) (−2a, −3b)' }
      ],
      1,
      [step('M = ((−a − 3a)/2, (2b − 4b)/2) = (−4a/2, −2b/2) = (−2a, −b). Correct option: (2).', 'M = ((−a − 3a)/2, (2b − 4b)/2) = (−2a, −b). சரியான விடை: (2).', 'M = (−2a, −b)', 'M = \\left(\\dfrac{-4a}{2},\\; \\dfrac{-2b}{2}\\right) = (-2a, -b)')],
      '(2) (−2a, −b)', '(2) (−2a, −b)', '\\text{(2) }(-2a, -b)'
    ),

    mcq(19, 'Ratio in which y-axis divides (−5, 1) and (2, 3)', 'y-அச்சு பிரிக்கும் விகிதம்',
      '19. In what ratio does the y-axis divides the line joining the points (−5, 1) and (2, 3) internally\n(1) 1:3   (2) 2:5   (3) 3:1   (4) 5:2',
      '19. (−5, 1) மற்றும் (2, 3) ஆகிய புள்ளிகளை இணைக்கும் கோட்டை Y-அச்சு உட்புறமாக என்ன விகிதத்தில் பிரிக்கும்?\n(1) 1:3   (2) 2:5   (3) 3:1   (4) 5:2',
      ['19. In what ratio does the y-axis divides the line joining the points ', tex('(-5, 1)', '(−5, 1)'), ' and ', tex('(2, 3)', '(2, 3)'), ' internally\n(1) 1:3   (2) 2:5   (3) 3:1   (4) 5:2'],
      ['19. ', tex('(-5, 1)', '(−5, 1)'), ' மற்றும் ', tex('(2, 3)', '(2, 3)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டை Y-அச்சு உட்புறமாக என்ன விகிதத்தில் பிரிக்கும்?\n(1) 1:3   (2) 2:5   (3) 3:1   (4) 5:2'],
      [
        { en: '(1) 1:3', ta: '(1) 1:3' },
        { en: '(2) 2:5', ta: '(2) 2:5' },
        { en: '(3) 3:1', ta: '(3) 3:1' },
        { en: '(4) 5:2', ta: '(4) 5:2' }
      ],
      3,
      [step('On the y-axis, x = 0. Let the ratio be k : 1: (2k − 5)/(k + 1) = 0 ⇒ k = 5/2 ⇒ 5 : 2. Correct option: (4).', 'Y-அச்சில் x = 0. (2k − 5)/(k + 1) = 0 ⇒ k = 5/2 ⇒ 5 : 2. சரியான விடை: (4).', '2k − 5 = 0 ⇒ k = 5/2 ⇒ 5:2', '2k-5=0 \\implies k = \\dfrac{5}{2} \\implies 5:2')],
      '(4) 5:2', '(4) 5:2', '\\text{(4) }5:2'
    ),

    mcq(20, 'Find x for vertices of a parallelogram', 'இணைகரத்தின் உச்சிகளில் x-இன் மதிப்பு',
      '20. If (1, −2), (3, 6), (x, 10) and (3, 2) are the vertices of the parallelogram taken in order, then the value of x is\n(1) 6   (2) 5   (3) 4   (4) 3',
      '20. (1, −2), (3, 6), (x, 10) மற்றும் (3, 2) ஆகியன ஓர் இணைகரத்தின் வரிசையாக எடுக்கப்பட்ட முனைப் புள்ளிகள் எனில், x-இன் மதிப்பானது\n(1) 6   (2) 5   (3) 4   (4) 3',
      ['20. If ', tex('(1, -2), (3, 6), (x, 10)', '(1, −2), (3, 6), (x, 10)'), ' and ', tex('(3, 2)', '(3, 2)'), ' are the vertices of the parallelogram taken in order, then the value of ', tex('x', 'x'), ' is\n(1) 6   (2) 5   (3) 4   (4) 3'],
      ['20. ', tex('(1, -2), (3, 6), (x, 10)', '(1, −2), (3, 6), (x, 10)'), ' மற்றும் ', tex('(3, 2)', '(3, 2)'), ' ஆகியன ஓர் இணைகரத்தின் வரிசையாக எடுக்கப்பட்ட முனைப் புள்ளிகள் எனில், ', tex('x', 'x'), '-இன் மதிப்பானது\n(1) 6   (2) 5   (3) 4   (4) 3'],
      [
        { en: '(1) 6', ta: '(1) 6' },
        { en: '(2) 5', ta: '(2) 5' },
        { en: '(3) 4', ta: '(3) 4' },
        { en: '(4) 3', ta: '(4) 3' }
      ],
      1,
      [step('Diagonals bisect each other: (1 + x)/2 = (3 + 3)/2 ⇒ 1 + x = 6 ⇒ x = 5. Correct option: (2).', 'மூலைவிட்டங்கள் ஒன்றையொன்று இருசமக் கூறிடும்: (1 + x)/2 = (3 + 3)/2 ⇒ x = 5. சரியான விடை: (2).', '1 + x = 3 + 3 ⇒ x = 5', '\\dfrac{1+x}{2} = \\dfrac{3+3}{2} \\implies 1+x=6 \\implies x=5')],
      '(2) 5', '(2) 5', '\\text{(2) }5'
    )
  ];

  for (const item of entries) {
    if (grade.items.some(q => q.id === item.id)) throw Error('Duplicate textbook ID: ' + item.id);
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
