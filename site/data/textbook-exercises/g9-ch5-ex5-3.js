/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.3 (Q1–Q8, 11 marked slots).
 * Bilingual English & Tamil — page-visual-checked against 2025 EN p.208 (PDF 214) & TA p.222 (PDF 228); Answer Key EN p.321 / TA p.337.
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

  const makeEntry = (qNum, titleEn, titleTa, qEn, qTa, qMathEn, qMathTa, steps, ansEn, ansTa, ansLatex, extra = {}) => ({
    id: `g9-ch5-ex5.3-q${qNum}`,
    classNum: 9,
    chapter: '5',
    exercise: '5.3',
    kind: 'textbook',
    edition: '2025',
    preferItemMath: true,
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
    topic: { en: 'Coordinate Geometry · Mid-point Formula', ta: 'ஆயத்தொலை வடிவியல் · நடுப்புள்ளி வாய்ப்பாடு' },
    label: { en: `Exercise 5.3 · Q${qNum}`, ta: `பயிற்சி 5.3 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: { en: qMathEn, ta: qMathTa },
    steps,
    answer: ansEn,
    answerTa: ansTa,
    answerMath: { en: tex(ansLatex, ansEn, true), ta: tex(extra.ansLatexTa??ansLatex, ansTa, true) },
    ...(extra.figureSrc ? { figureSrc: extra.figureSrc, figureAlt: extra.figureAlt, figureCaption: extra.figureCaption } : {}),
    sourceFidelity: {
      status: 'page-visual-checked',
      sourcePdfPage: { en: 214, ta: 228 },
      sourcePrintedPage: { en: 208, ta: 222 },
      answerKeyPdfPage: { en: 321, ta: 337 }
    }
  });

  const entries = [
    makeEntry(
      1,
      'Mid-points of four line segments',
      'நான்கு கோட்டுத்துண்டுகளின் நடுப்புள்ளிகள்',
      '1. Find the mid-points of the line segment joining the points\n(i) (−2, 3) and (−6, −5)   (ii) (8, −2) and (−8, 0)\n(iii) (a, b) and (a + 2b, 2a − b)   (iv) (1/2, −3/7) and (3/2, −11/7)',
      '1. கீழ்க்காணும் புள்ளிகளை இணைத்து உருவாகும் கோட்டுத் துண்டின் நடுப்புள்ளிகளைக் காண்க.\n(i) (−2, 3) மற்றும் (−6, −5)   (ii) (8, −2) மற்றும் (−8, 0)\n(iii) (a, b) மற்றும் (a + 2b, 2a − b)   (iv) (1/2, −3/7) மற்றும் (3/2, −11/7)',
      [
        '1. Find the mid-points of the line segment joining the points\n(i) (−2, 3) and (−6, −5)   (ii) (8, −2) and (−8, 0)\n(iii) (a, b) and (a + 2b, 2a − b)   (iv) ',
        tex('\\left(\\dfrac{1}{2}, -\\dfrac{3}{7}\\right)\\text{ and }\\left(\\dfrac{3}{2}, \\dfrac{-11}{7}\\right)', '(1/2, −3/7) and (3/2, −11/7)')
      ],
      [
        '1. கீழ்க்காணும் புள்ளிகளை இணைத்து உருவாகும் கோட்டுத் துண்டின் நடுப்புள்ளிகளைக் காண்க.\n(i) (−2, 3) மற்றும் (−6, −5)   (ii) (8, −2) மற்றும் (−8, 0)\n(iii) (a, b) மற்றும் (a + 2b, 2a − b)   (iv) ',
        tex('\\left(\\dfrac{1}{2}, -\\dfrac{3}{7}\\right)\\text{ மற்றும் }\\left(\\dfrac{3}{2}, \\dfrac{-11}{7}\\right)', '(1/2, −3/7) மற்றும் (3/2, −11/7)')
      ],
      [
        step(
          'Use the mid-point formula M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
          'நடுப்புள்ளி வாய்ப்பாடு M = ((x₁ + x₂)/2, (y₁ + y₂)/2)-ஐப் பயன்படுத்துவோம்.',
          'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
          'M = \\left(\\dfrac{x_1+x_2}{2},\\; \\dfrac{y_1+y_2}{2}\\right)'
        ),
        step(
          '(i) Average the coordinates of (−2, 3) and (−6, −5): x = (−2 − 6)/2 = −4, y = (3 − 5)/2 = −1.',
          '(i) (−2, 3) மற்றும் (−6, −5): x = (−2 − 6)/2 = −4, y = (3 − 5)/2 = −1.',
          'M₁ = (−4, −1)',
          'M_1 = \\left(\\dfrac{-2+(-6)}{2},\\; \\dfrac{3+(-5)}{2}\\right) = \\left(\\dfrac{-8}{2},\\; \\dfrac{-2}{2}\\right) = (-4,-1)'
        ),
        step(
          '(ii) Average (8, −2) and (−8, 0): x = (8 − 8)/2 = 0, y = (−2 + 0)/2 = −1.',
          '(ii) (8, −2) மற்றும் (−8, 0): x = (8 − 8)/2 = 0, y = (−2 + 0)/2 = −1.',
          'M₂ = (0, −1)',
          'M_2 = \\left(\\dfrac{8+(-8)}{2},\\; \\dfrac{-2+0}{2}\\right) = (0,-1)'
        ),
        step(
          '(iii) Average (a, b) and (a + 2b, 2a − b): x = (2a + 2b)/2 = a + b, y = 2a/2 = a.',
          '(iii) (a, b) மற்றும் (a + 2b, 2a − b): x = (2a + 2b)/2 = a + b, y = 2a/2 = a.',
          'M₃ = (a + b, a)',
          'M_3 = \\left(\\dfrac{a+a+2b}{2},\\; \\dfrac{b+2a-b}{2}\\right) = \\left(\\dfrac{2a+2b}{2},\\; \\dfrac{2a}{2}\\right) = (a+b,\\; a)'
        ),
        step(
          '(iv) Average (1/2, −3/7) and (3/2, −11/7): x = (4/2)/2 = 1, y = (−14/7)/2 = −1.',
          '(iv) (1/2, −3/7) மற்றும் (3/2, −11/7): x = (4/2)/2 = 1, y = (−14/7)/2 = −1.',
          'M₄ = (1, −1)',
          'M_4 = \\left(\\dfrac{\\frac{1}{2}+\\frac{3}{2}}{2},\\; \\dfrac{-\\frac{3}{7}+\\frac{-11}{7}}{2}\\right) = \\left(\\dfrac{2}{2},\\; \\dfrac{-2}{2}\\right) = (1,-1)'
        )
      ],
      '(i) (−4, −1); (ii) (0, −1); (iii) (a + b, a); (iv) (1, −1)',
      '(i) (−4, −1); (ii) (0, −1); (iii) (a + b, a); (iv) (1, −1)',
      '\\begin{aligned}\\text{(i) }(-4,-1),&\\quad\\text{(ii) }(0,-1)\\\\\\text{(iii) }(a+b,a),&\\quad\\text{(iv) }(1,-1)\\end{aligned}'
    ),

    makeEntry(
      2,
      'Find the other end of a diameter',
      'விட்டத்தின் மற்றொரு முனையைக் காணுதல்',
      '2. The centre of a circle is (−4, 2). If one end of the diameter of the circle is (−3, 7), then find the other end.',
      '2. ஒரு வட்டத்தின் மையம் (−4, 2). அந்த வட்டத்தில் (−3, 7) என்பது விட்டத்தின் ஒரு முனை எனில், மற்றொரு முனையைக் காண்க.',
      ['2. The centre of a circle is ', tex('(-4, 2)', '(−4, 2)'), '. If one end of the diameter of the circle is ', tex('(-3, 7)', '(−3, 7)'), ', then find the other end.'],
      ['2. ஒரு வட்டத்தின் மையம் ', tex('(-4, 2)', '(−4, 2)'), '. அந்த வட்டத்தில் ', tex('(-3, 7)', '(−3, 7)'), ' என்பது விட்டத்தின் ஒரு முனை எனில், மற்றொரு முனையைக் காண்க.'],
      [
        step(
          'The centre C(−4, 2) is the mid-point of the diameter joining A(−3, 7) and the unknown end B(x, y).',
          'வட்டத்தின் மையம் C(−4, 2) என்பது A(−3, 7) மற்றும் B(x, y) முனைகளை இணைக்கும் விட்டத்தின் நடுப்புள்ளியாகும்.',
          'C(−4, 2) = mid-point of A(−3, 7) and B(x, y)',
          '\\left(\\dfrac{-3+x}{2},\\; \\dfrac{7+y}{2}\\right) = (-4, 2)'
        ),
        step(
          'Equate x-coordinates and y-coordinates separately and solve for x and y.',
          'x மற்றும் y ஆயத்தொலைவுகளைத் தனித்தனியே சமப்படுத்தி x, y மதிப்புகளைக் காண்க.',
          'x = −5, y = −3 ⇒ B = (−5, −3)',
          '\\begin{aligned}\\dfrac{-3+x}{2}&=-4 &\\quad \\dfrac{7+y}{2}&=2\\\\-3+x&=-8 &\\quad 7+y&=4\\\\x&=-5 &\\quad y&=-3\\end{aligned}'
        )
      ],
      '(−5, −3)',
      '(−5, −3)',
      '(-5, -3)'
    ),

    makeEntry(
      3,
      'Mid-point lying on a given line',
      'கொடுக்கப்பட்ட கோட்டின் மேல் அமையும் நடுப்புள்ளி',
      '3. If the mid-point (x, y) of the line joining (3, 4) and (p, 7) lies on 2x + 2y + 1 = 0, then what will be the value of p?',
      '3. (3, 4) மற்றும் (p, 7)-ஐ இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி (x, y) ஆனது 2x + 2y + 1 = 0-இன் மேல் அமைந்துள்ளது எனில், p-இன் மதிப்பு காண்க.',
      ['3. If the mid-point ', tex('(x, y)', '(x, y)'), ' of the line joining ', tex('(3, 4)', '(3, 4)'), ' and ', tex('(p, 7)', '(p, 7)'), ' lies on ', tex('2x + 2y + 1 = 0', '2x + 2y + 1 = 0'), ', then what will be the value of ', tex('p', 'p'), '?'],
      ['3. ', tex('(3, 4)', '(3, 4)'), ' மற்றும் ', tex('(p, 7)', '(p, 7)'), '-ஐ இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி ', tex('(x, y)', '(x, y)'), ' ஆனது ', tex('2x + 2y + 1 = 0', '2x + 2y + 1 = 0'), '-இன் மேல் அமைந்துள்ளது எனில், ', tex('p', 'p'), '-இன் மதிப்பு காண்க.'],
      [
        step(
          'Find the mid-point (x, y) of (3, 4) and (p, 7).',
          '(3, 4) மற்றும் (p, 7) ஆகியவற்றின் நடுப்புள்ளி (x, y)-ஐக் காண்போம்.',
          'x = (3 + p)/2, y = (4 + 7)/2 = 11/2',
          '(x, y) = \\left(\\dfrac{3+p}{2},\\; \\dfrac{4+7}{2}\\right) = \\left(\\dfrac{3+p}{2},\\; \\dfrac{11}{2}\\right)'
        ),
        step(
          'Since (x, y) lies on 2x + 2y + 1 = 0, substitute x and y into the line equation.',
          '(x, y) ஆனது 2x + 2y + 1 = 0-இன் மேல் உள்ளதால், x மற்றும் y-ஐச் சமன்பாட்டில் பிரதியிடுவோம்.',
          '2((3+p)/2) + 2(11/2) + 1 = 0 ⇒ (3 + p) + 11 + 1 = 0 ⇒ p = −15',
          '\\begin{aligned}2\\left(\\dfrac{3+p}{2}\\right)+2\\left(\\dfrac{11}{2}\\right)+1 &= 0\\\\(3+p)+11+1 &= 0\\\\p+15 &= 0 \\implies p = -15\\end{aligned}'
        )
      ],
      'p = −15',
      'p = −15',
      'p = -15'
    ),

    makeEntry(
      4,
      'Find triangle vertices from side mid-points',
      'பக்கங்களின் நடுப்புள்ளிகளிலிருந்து முக்கோண உச்சிகளைக் காணுதல்',
      '4. The mid-point of the sides of a triangle are (2, 4), (−2, 3) and (5, 2). Find the coordinates of the vertices of the triangle.',
      '4. ஒரு முக்கோணத்தின் பக்கங்களின் நடுப்புள்ளிகள் (2, 4), (−2, 3) மற்றும் (5, 2) எனில் அந்த முக்கோணத்தின் முனைகளின் ஆயத்தொலைவுகளைக் காண்க.',
      ['4. The mid-point of the sides of a triangle are ', tex('(2, 4), (-2, 3)', '(2, 4), (−2, 3)'), ' and ', tex('(5, 2)', '(5, 2)'), '. Find the coordinates of the vertices of the triangle.'],
      ['4. ஒரு முக்கோணத்தின் பக்கங்களின் நடுப்புள்ளிகள் ', tex('(2, 4), (-2, 3)', '(2, 4), (−2, 3)'), ' மற்றும் ', tex('(5, 2)', '(5, 2)'), ' எனில் அந்த முக்கோணத்தின் முனைகளின் ஆயத்தொலைவுகளைக் காண்க.'],
      [
        step(
          'Let the vertices be A(x₁, y₁), B(x₂, y₂), C(x₃, y₃), with mid-points D(2, 4) of AB, E(−2, 3) of BC, and F(5, 2) of CA.',
          'முக்கோணத்தின் உச்சிகள் A(x₁, y₁), B(x₂, y₂), C(x₃, y₃) என்க. AB-இன் நடுப்புள்ளி D(2, 4), BC-இன் நடுப்புள்ளி E(−2, 3), CA-இன் நடுப்புள்ளி F(5, 2) என்க.',
          'x₁+x₂=4, x₂+x₃=−4, x₃+x₁=10; y₁+y₂=8, y₂+y₃=6, y₃+y₁=4',
          '\\begin{aligned}x_1+x_2&=4,\\; x_2+x_3=-4,\\; x_3+x_1=10\\\\y_1+y_2&=8,\\; y_2+y_3=6,\\; y_3+y_1=4\\end{aligned}'
        ),
        step(
          'Add all three x-equations: 2(x₁ + x₂ + x₃) = 4 − 4 + 10 = 10 ⇒ x₁ + x₂ + x₃ = 5. Subtract each pair to find x₁, x₂, x₃.',
          'மூன்று x-சமன்பாடுகளையும் கூட்ட: 2(x₁ + x₂ + x₃) = 10 ⇒ x₁ + x₂ + x₃ = 5. இதிலிருந்து x₁, x₂, x₃ காண்க.',
          'x₁ = 5−(−4) = 9, x₂ = 5−10 = −5, x₃ = 5−4 = 1',
          '\\begin{aligned}x_1+x_2+x_3 &= 5\\\\x_1 &= 5-(-4)=9,\\; x_2=5-10=-5,\\; x_3=5-4=1\\end{aligned}'
        ),
        step(
          'Similarly, 2(y₁ + y₂ + y₃) = 8 + 6 + 4 = 18 ⇒ y₁ + y₂ + y₃ = 9. Subtract each pair to find y₁, y₂, y₃.',
          'இதேபோல், 2(y₁ + y₂ + y₃) = 18 ⇒ y₁ + y₂ + y₃ = 9. இதிலிருந்து y₁, y₂, y₃ காண்க.',
          'y₁ = 9−6 = 3, y₂ = 9−4 = 5, y₃ = 9−8 = 1 ⇒ A(9,3), B(−5,5), C(1,1)',
          '\\begin{aligned}y_1+y_2+y_3 &= 9\\\\y_1 &= 9-6=3,\\; y_2=9-4=5,\\; y_3=9-8=1\\end{aligned}'
        )
      ],
      '(9, 3), (−5, 5) and (1, 1)',
      '(9, 3), (−5, 5) மற்றும் (1, 1)',
      '(9,3),\\;(-5,5)\\text{ and }(1,1)',
      { ansLatexTa: '(9,3),\\;(-5,5)\\text{ மற்றும் }(1,1)' }
    ),

    makeEntry(
      5,
      'Mid-point of perpendicular OD from centre to chord',
      'நாணுக்கு வரையப்பட்ட செங்குத்து OD-இன் மையப்புள்ளி',
      '5. O(0, 0) is the centre of a circle whose one chord is AB, where the points A and B are (8, 6) and (10, 0) respectively. OD is the perpendicular from the centre to the chord AB. Find the coordinates of the mid-point of OD.',
      '5. AB ஐ ஒரு நாணாக உடைய வட்டத்தின் மையம் O(0, 0). இங்கு, புள்ளிகள் A மற்றும் B முறையே (8, 6) மற்றும் (10, 0) ஆகும். வட்டத்தின் மையத்திலிருந்து நாண் AB-க்கு வரையப்படும் செங்குத்து OD எனில், OD-இன் மையப்புள்ளியின் ஆயத் தொலைவுகளைக் காண்க.',
      ['5. ', tex('O(0, 0)', 'O(0, 0)'), ' is the centre of a circle whose one chord is ', tex('AB', 'AB'), ', where the points ', tex('A', 'A'), ' and ', tex('B', 'B'), ' are ', tex('(8, 6)', '(8, 6)'), ' and ', tex('(10, 0)', '(10, 0)'), ' respectively. ', tex('OD', 'OD'), ' is the perpendicular from the centre to the chord ', tex('AB', 'AB'), '. Find the coordinates of the mid-point of ', tex('OD', 'OD'), '.'],
      ['5. ', tex('AB', 'AB'), ' ஐ ஒரு நாணாக உடைய வட்டத்தின் மையம் ', tex('O(0, 0)', 'O(0, 0)'), '. இங்கு, புள்ளிகள் ', tex('A', 'A'), ' மற்றும் ', tex('B', 'B'), ' முறையே ', tex('(8, 6)', '(8, 6)'), ' மற்றும் ', tex('(10, 0)', '(10, 0)'), ' ஆகும். வட்டத்தின் மையத்திலிருந்து நாண் ', tex('AB', 'AB'), '-க்கு வரையப்படும் செங்குத்து ', tex('OD', 'OD'), ' எனில், ', tex('OD', 'OD'), '-இன் மையப்புள்ளியின் ஆயத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'A perpendicular drawn from the centre of a circle to a chord bisects the chord. Therefore, D is the mid-point of AB.',
          'வட்டத்தின் மையத்திலிருந்து ஒரு நாணுக்கு வரையப்படும் செங்குத்து அந்த நாணை இருசமக் கூறிடும். எனவே D என்பது AB-இன் நடுப்புள்ளியாகும்.',
          'D = mid-point of A(8, 6) and B(10, 0) = (9, 3)',
          'D = \\left(\\dfrac{8+10}{2},\\; \\dfrac{6+0}{2}\\right) = (9, 3)'
        ),
        step(
          'Now find the mid-point M of OD joining O(0, 0) and D(9, 3).',
          'இப்போது O(0, 0) மற்றும் D(9, 3)-ஐ இணைக்கும் OD-இன் மையப்புள்ளி M-ஐக் காண்போம்.',
          'M = ((0+9)/2, (0+3)/2) = (9/2, 3/2)',
          'M = \\left(\\dfrac{0+9}{2},\\; \\dfrac{0+3}{2}\\right) = \\left(\\dfrac{9}{2},\\; \\dfrac{3}{2}\\right)'
        )
      ],
      '(9/2, 3/2)',
      '(9/2, 3/2)',
      '\\left(\\dfrac{9}{2},\\; \\dfrac{3}{2}\\right)',
      {
        figureSrc: 'assets/grade9-ch5/ex5-3-q5.svg',
        figureAlt: {
          en: 'Chord AB from (8,6) to (10,0), perpendicular OD from origin O(0,0) to D(9,3), and midpoint M(9/2, 3/2)',
          ta: 'நாண் AB, மையத்திலிருந்து செங்குத்து OD மற்றும் OD-இன் நடுப்புள்ளி M(9/2, 3/2) ஆகியவற்றைக் காட்டும் படம்'
        },
        figureCaption: {
          en: 'Perpendicular OD bisects chord AB at D(9, 3); mid-point of OD is (9/2, 3/2)',
          ta: 'செங்குத்து OD நாண் AB-ஐ D(9, 3)-இல் இருசமக் கூறிடுகிறது; OD-இன் நடுப்புள்ளி (9/2, 3/2)'
        }
      }
    ),

    makeEntry(
      6,
      'Fourth vertex D of a square ABCD',
      'சதுரம் ABCD-இன் நான்காவது உச்சி D',
      '6. The points A(−5, 4), B(−1, −2) and C(5, 2) are the vertices of an isosceles right-angled triangle where the right angle is at B. Find the coordinates of D so that ABCD is a square.',
      '6. புள்ளிகள் A(−5, 4), B(−1, −2) மற்றும் C(5, 2) என்பன இரு சமபக்கச் செங்கோண முக்கோணத்தின் உச்சிகள், இதில் B இல் செங்கோணம் அமைந்துள்ளது. மேலும் ABCD ஒரு சதுரம் எனில் D-இன் ஆயத்தொலைவுகளைக் காண்க.',
      ['6. The points ', tex('A(-5, 4), B(-1, -2)', 'A(−5, 4), B(−1, −2)'), ' and ', tex('C(5, 2)', 'C(5, 2)'), ' are the vertices of an isosceles right-angled triangle where the right angle is at ', tex('B', 'B'), '. Find the coordinates of ', tex('D', 'D'), ' so that ', tex('ABCD', 'ABCD'), ' is a square.'],
      ['6. புள்ளிகள் ', tex('A(-5, 4), B(-1, -2)', 'A(−5, 4), B(−1, −2)'), ' மற்றும் ', tex('C(5, 2)', 'C(5, 2)'), ' என்பன இரு சமபக்கச் செங்கோண முக்கோணத்தின் உச்சிகள், இதில் ', tex('B', 'B'), ' இல் செங்கோணம் அமைந்துள்ளது. மேலும் ', tex('ABCD', 'ABCD'), ' ஒரு சதுரம் எனில் ', tex('D', 'D'), '-இன் ஆயத்தொலைவுகளைக் காண்க.'],
      [
        step(
          'In a square ABCD, the diagonals AC and BD bisect each other, so their mid-points coincide.',
          'சதுரம் ABCD-இல் மூலைவிட்டங்கள் AC மற்றும் BD ஒன்றையொன்று இருசமக் கூறிடும்; எனவே அவற்றின் நடுப்புள்ளிகள் சமம்.',
          'Mid-point of AC = Mid-point of BD',
          '\\text{Mid-point of }AC = \\text{Mid-point of }BD'
        ),
        step(
          'Let D = (x, y). Equate the mid-point of A(−5, 4), C(5, 2) with the mid-point of B(−1, −2), D(x, y).',
          'D = (x, y) என்க. AC-இன் நடுப்புள்ளியையும் BD-இன் நடுப்புள்ளியையும் சமப்படுத்துவோம்.',
          '((−5+5)/2, (4+2)/2) = ((−1+x)/2, (−2+y)/2) ⇒ (0, 3) = ((−1+x)/2, (−2+y)/2)',
          '\\begin{aligned}\\left(\\dfrac{-5+5}{2},\\; \\dfrac{4+2}{2}\\right) &= \\left(\\dfrac{-1+x}{2},\\; \\dfrac{-2+y}{2}\\right)\\\\-1+x &= 0 \\implies x = 1\\\\-2+y &= 6 \\implies y = 8\\end{aligned}'
        )
      ],
      'D(1, 8)',
      'D(1, 8)',
      'D(1, 8)'
    ),

    makeEntry(
      7,
      'Mid-point quadrilateral proof (parallelogram)',
      'நடுப்புள்ளி நாற்கரம் ஒரு இணைகரம் என நிறுவுதல்',
      '7. The points A(−3, 6), B(0, 7) and C(1, 9) are the mid-points of the sides DE, EF and FD of a triangle DEF. Show that the quadrilateral ABCD is a parallelogram.',
      '7. முக்கோணம் DEF-இன் பக்கங்கள் DE, EF மற்றும் FD-களின் நடுப்புள்ளிகள் முறையே A(−3, 6), B(0, 7) மற்றும் C(1, 9) எனில், நாற்கரம் ABCD ஓர் இணைகரம் என நிறுவுக.',
      ['7. The points ', tex('A(-3, 6), B(0, 7)', 'A(−3, 6), B(0, 7)'), ' and ', tex('C(1, 9)', 'C(1, 9)'), ' are the mid-points of the sides ', tex('DE, EF', 'DE, EF'), ' and ', tex('FD', 'FD'), ' of a triangle ', tex('DEF', 'DEF'), '. Show that the quadrilateral ', tex('ABCD', 'ABCD'), ' is a parallelogram.'],
      ['7. முக்கோணம் ', tex('DEF', 'DEF'), '-இன் பக்கங்கள் ', tex('DE, EF', 'DE, EF'), ' மற்றும் ', tex('FD', 'FD'), '-களின் நடுப்புள்ளிகள் முறையே ', tex('A(-3, 6), B(0, 7)', 'A(−3, 6), B(0, 7)'), ' மற்றும் ', tex('C(1, 9)', 'C(1, 9)'), ' எனில், நாற்கரம் ', tex('ABCD', 'ABCD'), ' ஓர் இணைகரம் என நிறுவுக.'],
      [
        step(
          'First find vertex D(x₁, y₁) of △DEF from the side mid-points A(−3, 6) of DE, B(0, 7) of EF, and C(1, 9) of FD.',
          'முக்கோணம் DEF-இன் பக்க நடுப்புள்ளிகள் A(−3, 6), B(0, 7), C(1, 9)-லிருந்து உச்சி D(x₁, y₁)-ஐக் காண்போம்.',
          'D = A + C − B = (−3 + 1 − 0, 6 + 9 − 7) = (−2, 8)',
          '\\begin{aligned}x_1 &= (-3)+1-0 = -2\\\\y_1 &= 6+9-7 = 8 \\implies D(-2, 8)\\end{aligned}'
        ),
        step(
          'To show ABCD is a parallelogram, check that the diagonals AC and BD have the same mid-point.',
          'ABCD ஒரு இணைகரம் எனக் காட்ட, மூலைவிட்டங்கள் AC மற்றும் BD-இன் நடுப்புள்ளிகள் சமம் எனக் காண்போம்.',
          'Mid(AC) = (−1, 15/2); Mid(BD) = (−1, 15/2)',
          '\\begin{aligned}\\text{Mid}(AC) &= \\left(\\dfrac{-3+1}{2},\\; \\dfrac{6+9}{2}\\right) = \\left(-1,\\; \\dfrac{15}{2}\\right)\\\\\\text{Mid}(BD) &= \\left(\\dfrac{0+(-2)}{2},\\; \\dfrac{7+8}{2}\\right) = \\left(-1,\\; \\dfrac{15}{2}\\right)\\end{aligned}'
        ),
        step(
          'Since the diagonals AC and BD bisect each other at (−1, 15/2), ABCD is a parallelogram.',
          'மூலைவிட்டங்கள் AC மற்றும் BD (−1, 15/2) என்ற புள்ளியில் ஒன்றையொன்று இருசமக் கூறிடுவதால், ABCD ஓர் இணைகரம் ஆகும்.',
          'Mid(AC) = Mid(BD) ⇒ ABCD is a parallelogram',
          '\\text{Mid}(AC)=\\text{Mid}(BD) \\implies ABCD\\text{ is a parallelogram}'
        )
      ],
      'Proved: D(−2, 8) and diagonals AC, BD bisect each other at (−1, 15/2), so ABCD is a parallelogram',
      'நிறுவப்பட்டது: D(−2, 8); AC மற்றும் BD-இன் நடுப்புள்ளி (−1, 15/2) சமம் என்பதால் ABCD ஓர் இணைகரம்',
      '\\text{Mid}(AC)=\\text{Mid}(BD)=\\left(-1,\\dfrac{15}{2}\\right)\\implies\\text{Parallelogram}',
      { ansLatexTa: '\\begin{gathered}D(-2,8)\\\\AC,BD\\text{-இன் நடுப்புள்ளி }\\left(-1,\\dfrac{15}{2}\\right)\\\\\\implies ABCD\\text{ ஓர் இணைகரம்}\\end{gathered}' }
    ),

    makeEntry(
      8,
      'Hypotenuse mid-point equidistant from vertices',
      'கர்ணத்தின் நடுப்புள்ளி உச்சிகளிலிருந்து சம தொலைவில் உள்ளது',
      '8. A(−3, 2), B(3, 2) and C(−3, −2) are the vertices of the right triangle, right angled at A. Show that the mid-point of the hypotenuse is equidistant from the vertices.',
      '8. A(−3, 2), B(3, 2) மற்றும் C(−3, −2) என்பன A-இல் செங்கோணத்தைக் கொண்டுள்ள செங்கோண முக்கோணத்தின் உச்சிகள் எனில், கர்ணத்தின் நடுப்புள்ளியானது உச்சிகளிலிருந்து சமத் தொலைவில் உள்ளது என்பதை நிறுவுக.',
      ['8. ', tex('A(-3, 2), B(3, 2)', 'A(−3, 2), B(3, 2)'), ' and ', tex('C(-3, -2)', 'C(−3, −2)'), ' are the vertices of the right triangle, right angled at ', tex('A', 'A'), '. Show that the mid-point of the hypotenuse is equidistant from the vertices.'],
      ['8. ', tex('A(-3, 2), B(3, 2)', 'A(−3, 2), B(3, 2)'), ' மற்றும் ', tex('C(-3, -2)', 'C(−3, −2)'), ' என்பன ', tex('A', 'A'), '-இல் செங்கோணத்தைக் கொண்டுள்ள செங்கோண முக்கோணத்தின் உச்சிகள் எனில், கர்ணத்தின் நடுப்புள்ளியானது உச்சிகளிலிருந்து சமத் தொலைவில் உள்ளது என்பதை நிறுவுக.'],
      [
        step(
          'Since the right angle is at A, the hypotenuse is BC. Find the mid-point M of BC joining B(3, 2) and C(−3, −2).',
          'செங்கோணம் A-இல் உள்ளதால் கர்ணம் BC ஆகும். B(3, 2) மற்றும் C(−3, −2)-இன் நடுப்புள்ளி M-ஐக் காண்போம்.',
          'M = ((3−3)/2, (2−2)/2) = (0, 0)',
          'M = \\left(\\dfrac{3+(-3)}{2},\\; \\dfrac{2+(-2)}{2}\\right) = (0, 0)'
        ),
        step(
          'Compute the distances MA, MB, and MC using the distance formula.',
          'M(0, 0)-லிருந்து A, B, C ஆகிய உச்சிகளுக்கு உள்ள தொலைவுகளைக் காண்போம்.',
          'MA = √13, MB = √13, MC = √13',
          '\\begin{aligned}MA &= \\sqrt{(-3-0)^2+(2-0)^2} = \\sqrt{9+4} = \\sqrt{13}\\\\MB &= \\sqrt{(3-0)^2+(2-0)^2} = \\sqrt{9+4} = \\sqrt{13}\\\\MC &= \\sqrt{(-3-0)^2+(-2-0)^2} = \\sqrt{9+4} = \\sqrt{13}\\end{aligned}'
        ),
        step(
          'Since MA = MB = MC = √13, the mid-point M(0, 0) of the hypotenuse is equidistant from all three vertices.',
          'MA = MB = MC = √13 என்பதால், கர்ணத்தின் நடுப்புள்ளி M(0, 0) மூன்று உச்சிகளிலிருந்தும் சமத் தொலைவில் உள்ளது.',
          'MA = MB = MC = √13 ⇒ Equidistant',
          'MA = MB = MC = \\sqrt{13}'
        )
      ],
      'Proved: M(0, 0) satisfies MA = MB = MC = √13',
      'நிறுவப்பட்டது: M(0, 0) உச்சிகளிலிருந்து √13 அலகு சம தொலைவில் உள்ளது',
      'MA = MB = MC = \\sqrt{13}'
    )
  ];

  for (const item of entries) {
    if (grade.items.some(q => q.id === item.id)) throw Error('Duplicate textbook ID: ' + item.id);
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
