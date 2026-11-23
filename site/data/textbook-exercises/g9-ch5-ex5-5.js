/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.5 (Q1–Q7, 8 marked slots).
 * Bilingual English & Tamil — page-visual-checked against 2025 EN pp.217-218 (PDF 223-224) & TA pp.231-232 (PDF 237-238); Answer Key EN p.321 / TA p.337.
 * Note: Q6 and Q7 appear at the top of EN p.218 (PDF 224) / TA p.232 (PDF 238) before Exercise 5.6.
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
    id: `g9-ch5-ex5.5-q${qNum}`,
    classNum: 9,
    chapter: '5',
    exercise: '5.5',
    kind: 'textbook',
    edition: '2025',
    preferItemMath: true,
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
    topic: { en: 'Coordinate Geometry · Centroid of a Triangle', ta: 'ஆயத்தொலை வடிவியல் · முக்கோணத்தின் நடுக்கோட்டு மையம்' },
    label: { en: `Exercise 5.5 · Q${qNum}`, ta: `பயிற்சி 5.5 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: { en: qMathEn, ta: qMathTa },
    steps,
    answer: ansEn,
    answerTa: ansTa,
    answerMath: { en: tex(ansLatex, ansEn, true), ta: tex(ansLatex, ansTa, true) },
    ...(extra.figureSrc ? { figureSrc: extra.figureSrc, figureAlt: extra.figureAlt, figureCaption: extra.figureCaption } : {}),
    sourceFidelity: {
      status: 'page-visual-checked',
      sourcePdfPage: { en: extra.enPdf || 223, ta: extra.taPdf || 237 },
      sourcePrintedPage: { en: extra.enPrint || 217, ta: extra.taPrint || 231 },
      answerKeyPdfPage: { en: 321, ta: 337 }
    }
  });

  const entries = [
    makeEntry(
      1,
      'Centroids of two triangles',
      'இரு முக்கோணங்களின் நடுக்கோட்டு மையங்கள்',
      '1. Find the centroid of the triangle whose vertices are\n(i) (2, −4), (−3, −7) and (7, 2)   (ii) (−5, −5), (1, −4) and (−4, −2)',
      '1. பின்வரும் புள்ளிகளை முனைப் புள்ளிகளாகக் கொண்ட முக்கோணத்தின் நடுக்கோட்டு மையம் காண்க.\n(i) (2, −4), (−3, −7) மற்றும் (7, 2)   (ii) (−5, −5), (1, −4) மற்றும் (−4, −2)',
      ['1. Find the centroid of the triangle whose vertices are\n(i) (2, −4), (−3, −7) and (7, 2)   (ii) (−5, −5), (1, −4) and (−4, −2)'],
      ['1. பின்வரும் புள்ளிகளை முனைப் புள்ளிகளாகக் கொண்ட முக்கோணத்தின் நடுக்கோட்டு மையம் காண்க.\n(i) (2, −4), (−3, −7) மற்றும் (7, 2)   (ii) (−5, −5), (1, −4) மற்றும் (−4, −2)'],
      [
        step(
          'Use the centroid formula G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3).',
          'நடுக்கோட்டு மையம் G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3) என்ற சூத்திரத்தைப் பயன்படுத்துவோம்.',
          'G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)',
          'G = \\left(\\dfrac{x_1+x_2+x_3}{3},\\; \\dfrac{y_1+y_2+y_3}{3}\\right)'
        ),
        step(
          '(i) Substitute (2, −4), (−3, −7), and (7, 2).',
          '(i) (2, −4), (−3, −7), (7, 2) ஆகியவற்றைப் பிரதியிடுக.',
          'G₁ = ((2 − 3 + 7)/3, (−4 − 7 + 2)/3) = (6/3, −9/3) = (2, −3)',
          'G_1 = \\left(\\dfrac{2+(-3)+7}{3},\\; \\dfrac{-4+(-7)+2}{3}\\right) = \\left(\\dfrac{6}{3},\\; \\dfrac{-9}{3}\\right) = (2, -3)'
        ),
        step(
          '(ii) Substitute (−5, −5), (1, −4), and (−4, −2).',
          '(ii) (−5, −5), (1, −4), (−4, −2) ஆகியவற்றைப் பிரதியிடுக.',
          'G₂ = ((−5 + 1 − 4)/3, (−5 − 4 − 2)/3) = (−8/3, −11/3)',
          'G_2 = \\left(\\dfrac{-5+1+(-4)}{3},\\; \\dfrac{-5+(-4)+(-2)}{3}\\right) = \\left(\\dfrac{-8}{3},\\; \\dfrac{-11}{3}\\right)'
        )
      ],
      '(i) (2, −3); (ii) (−8/3, −11/3)',
      '(i) (2, −3); (ii) (−8/3, −11/3)',
      '\\text{(i) }(2,-3);\\quad \\text{(ii) }\\left(\\dfrac{-8}{3},\\; \\dfrac{-11}{3}\\right)'
    ),

    makeEntry(
      2,
      'Find third vertex using centroid',
      'நடுக்கோட்டு மையத்திலிருந்து மூன்றாவது உச்சியைக் காணுதல்',
      '2. If the centroid of a triangle is at (4, −2) and two of its vertices are (3, −2) and (5, 2) then find the third vertex of the triangle.',
      '2. ஒரு முக்கோணத்தின் நடுக்கோட்டு மையம் (4, −2) மற்றும் அதன் இரு முனைப்புள்ளிகள் (3, −2) மற்றும் (5, 2) எனில் மூன்றாவது முனைப் புள்ளியைக் காண்க.',
      ['2. If the centroid of a triangle is at ', tex('(4, -2)', '(4, −2)'), ' and two of its vertices are ', tex('(3, -2)', '(3, −2)'), ' and ', tex('(5, 2)', '(5, 2)'), ' then find the third vertex of the triangle.'],
      ['2. ஒரு முக்கோணத்தின் நடுக்கோட்டு மையம் ', tex('(4, -2)', '(4, −2)'), ' மற்றும் அதன் இரு முனைப்புள்ளிகள் ', tex('(3, -2)', '(3, −2)'), ' மற்றும் ', tex('(5, 2)', '(5, 2)'), ' எனில் மூன்றாவது முனைப் புள்ளியைக் காண்க.'],
      [
        step(
          'Let the third vertex be C(x, y). Equate the centroid of (3, −2), (5, 2), and (x, y) to (4, −2).',
          'மூன்றாவது முனைப்புள்ளி C(x, y) என்க. (3, −2), (5, 2), (x, y) ஆகியவற்றின் நடுக்கோட்டு மையத்தை (4, −2)-க்குச் சமப்படுத்துவோம்.',
          '((3 + 5 + x)/3, (−2 + 2 + y)/3) = (4, −2)',
          '\\left(\\dfrac{3+5+x}{3},\\; \\dfrac{-2+2+y}{3}\\right) = (4, -2)'
        ),
        step(
          'Solve each coordinate equation for x and y.',
          'x மற்றும் y சமன்பாடுகளைத் தீர்த்து x, y மதிப்புகளைக் காண்க.',
          '8 + x = 12 ⇒ x = 4; 0 + y = −6 ⇒ y = −6 ⇒ C(4, −6)',
          '\\begin{aligned}\\dfrac{8+x}{3}&=4 \\implies x=12-8=4\\\\\\dfrac{y}{3}&=-2 \\implies y=-6\\end{aligned}'
        )
      ],
      '(4, −6)',
      '(4, −6)',
      '(4, -6)'
    ),

    makeEntry(
      3,
      'Length of median through A',
      'உச்சி A வழியே செல்லும் நடுக்கோட்டின் நீளம்',
      '3. Find the length of median through A of a triangle whose vertices are A(−1, 3), B(1, −1) and C(5, 1).',
      '3. A(−1, 3), B(1, −1) மற்றும் C(5, 1) ஆகியன ஒரு முக்கோணத்தின் முனைப்புள்ளிகள் எனில் A வழியே செல்லக் கூடிய நடுக்கோட்டின் நீளத்தைக் காண்க.',
      ['3. Find the length of median through ', tex('A', 'A'), ' of a triangle whose vertices are ', tex('A(-1, 3), B(1, -1)', 'A(−1, 3), B(1, −1)'), ' and ', tex('C(5, 1)', 'C(5, 1)'), '.'],
      ['3. ', tex('A(-1, 3), B(1, -1)', 'A(−1, 3), B(1, −1)'), ' மற்றும் ', tex('C(5, 1)', 'C(5, 1)'), ' ஆகியன ஒரு முக்கோணத்தின் முனைப்புள்ளிகள் எனில் ', tex('A', 'A'), ' வழியே செல்லக் கூடிய நடுக்கோட்டின் நீளத்தைக் காண்க.'],
      [
        step(
          'The median through A joins vertex A(−1, 3) to the mid-point D of the opposite side BC.',
          'A வழியே செல்லும் நடுக்கோடு AD, உச்சி A(−1, 3)-ஐயும் எதிர்ப்பக்கம் BC-இன் நடுப்புள்ளி D-ஐயும் இணைக்கும்.',
          'D = mid-point of B(1, −1) and C(5, 1) = (3, 0)',
          'D = \\left(\\dfrac{1+5}{2},\\; \\dfrac{-1+1}{2}\\right) = (3, 0)'
        ),
        step(
          'Find the length AD using the distance formula between A(−1, 3) and D(3, 0).',
          'A(−1, 3) மற்றும் D(3, 0) இடையே தொலைவு வாய்ப்பாட்டைப் பயன்படுத்தி AD-இன் நீளம் காண்க.',
          'AD = √((3 − (−1))² + (0 − 3)²) = √(16 + 9) = √25 = 5 units',
          'AD = \\sqrt{(3-(-1))^2+(0-3)^2} = \\sqrt{4^2+(-3)^2} = \\sqrt{25} = 5\\text{ units}'
        )
      ],
      '5 units',
      '5 அலகுகள்',
      '5\\text{ units}',
      { ansLatexTa: '5\\text{ அலகுகள்}' }
    ),

    makeEntry(
      4,
      'Centroid algebra with unknown h and k',
      'நடுக்கோட்டு மையம் கொண்டு h, k மதிப்பு காணுதல்',
      '4. The vertices of a triangle are (1, 2), (h, −3) and (−4, k). If the centroid of the triangle is at the point (5, −1) then find the value of √((h + k)² + (h + 3k)²).',
      '4. (1, 2), (h, −3) மற்றும் (−4, k) ஆகியன ஒரு முக்கோணத்தின் முனைப்புள்ளிகள். மேலும் புள்ளி (5, −1) ஆனது அந்த முக்கோணத்தின் நடுக்கோட்டு மையம் எனில், √((h + k)² + (h + 3k)²) இன் மதிப்பைக் காண்க.',
      ['4. The vertices of a triangle are ', tex('(1, 2), (h, -3)', '(1, 2), (h, −3)'), ' and ', tex('(-4, k)', '(−4, k)'), '. If the centroid of the triangle is at the point ', tex('(5, -1)', '(5, −1)'), ' then find the value of ', tex('\\sqrt{(h+k)^2+(h+3k)^2}', '√((h + k)² + (h + 3k)²)'), '.'],
      ['4. ', tex('(1, 2), (h, -3)', '(1, 2), (h, −3)'), ' மற்றும் ', tex('(-4, k)', '(−4, k)'), ' ஆகியன ஒரு முக்கோணத்தின் முனைப்புள்ளிகள். மேலும் புள்ளி ', tex('(5, -1)', '(5, −1)'), ' ஆனது அந்த முக்கோணத்தின் நடுக்கோட்டு மையம் எனில், ', tex('\\sqrt{(h+k)^2+(h+3k)^2}', '√((h + k)² + (h + 3k)²)'), ' இன் மதிப்பைக் காண்க.'],
      [
        step(
          'Equate the centroid of (1, 2), (h, −3), (−4, k) to (5, −1) to find h and k.',
          '(1, 2), (h, −3), (−4, k) ஆகியவற்றின் நடுக்கோட்டு மையத்தை (5, −1)-க்குச் சமப்படுத்தி h மற்றும் k காண்க.',
          'h = 18, k = −2',
          '\\begin{aligned}\\dfrac{1+h-4}{3}&=5 \\implies h-3=15 \\implies h=18\\\\\\dfrac{2-3+k}{3}&=-1 \\implies k-1=-3 \\implies k=-2\\end{aligned}'
        ),
        step(
          'Compute h + k = 18 + (−2) = 16 and h + 3k = 18 + 3(−2) = 12, then substitute into √((h + k)² + (h + 3k)²).',
          'h + k = 16 மற்றும் h + 3k = 12 எனக் கணக்கிட்டு √((h + k)² + (h + 3k)²)-இல் பிரதியிடவும்.',
          '√(16² + 12²) = √(256 + 144) = √400 = 20',
          '\\sqrt{(16)^2+(12)^2} = \\sqrt{256+144} = \\sqrt{400} = 20'
        )
      ],
      '20',
      '20',
      '20'
    ),

    makeEntry(
      5,
      'Orthocentre, centroid and circumcentre (Euler line)',
      'செங்கோட்டு மையம், நடுக்கோட்டு மையம், சுற்றுவட்ட மையம்',
      '5. Orthocentre and centroid of a triangle are A(−3, 5) and B(3, 3) respectively. If C is the circumcentre and AC is the diameter of this circle, then find the radius of the circle.',
      '5. A(−3, 5) மற்றும் B(3, 3) ஆகியன முறையே ஒரு முக்கோணத்தின் செங்கோட்டு மையம் மற்றும் நடுக்கோட்டு மையம் ஆகும். C ஆனது இந்த முக்கோணத்தின் சுற்று வட்ட மையம் எனில், கோட்டுத் துண்டு AC ஐ விட்டமாகக் கொண்ட வட்டத்தின் ஆரம் காண்க.',
      ['5. Orthocentre and centroid of a triangle are ', tex('A(-3, 5)', 'A(−3, 5)'), ' and ', tex('B(3, 3)', 'B(3, 3)'), ' respectively. If ', tex('C', 'C'), ' is the circumcentre and ', tex('AC', 'AC'), ' is the diameter of this circle, then find the radius of the circle.'],
      ['5. ', tex('A(-3, 5)', 'A(−3, 5)'), ' மற்றும் ', tex('B(3, 3)', 'B(3, 3)'), ' ஆகியன முறையே ஒரு முக்கோணத்தின் செங்கோட்டு மையம் மற்றும் நடுக்கோட்டு மையம் ஆகும். ', tex('C', 'C'), ' ஆனது இந்த முக்கோணத்தின் சுற்று வட்ட மையம் எனில், கோட்டுத் துண்டு ', tex('AC', 'AC'), ' ஐ விட்டமாகக் கொண்ட வட்டத்தின் ஆரம் காண்க.'],
      [
        step(
          'On the Euler line of a triangle, the centroid B divides the segment joining orthocentre A and circumcentre C internally in the ratio 2 : 1 (AB : BC = 2 : 1).',
          'ஒரு முக்கோணத்தின் ஆய்லரின் கோட்டில், நடுக்கோட்டு மையம் B ஆனது செங்கோட்டு மையம் A மற்றும் சுற்றுவட்ட மையம் C-ஐ இணைக்கும் கோட்டுத்துண்டை 2 : 1 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும்.',
          'B(3, 3) divides AC in 2 : 1',
          'AB:BC = 2:1'
        ),
        step(
          'Let C = (x, y). Use the section formula with A(−3, 5), C(x, y), and ratio 2 : 1 to find C.',
          'C = (x, y) என்க. பிரிவுச் சூத்திரத்தில் A(−3, 5), B(3, 3) மற்றும் 2 : 1 விகிதம் பிரதியிட்டு C-ஐக் காண்க.',
          'C = (6, 2)',
          '\\begin{aligned}\\dfrac{2x+1(-3)}{3}&=3 \\implies 2x-3=9 \\implies x=6\\\\\\dfrac{2y+1(5)}{3}&=3 \\implies 2y+5=9 \\implies y=2 \\implies C(6,2)\\end{aligned}'
        ),
        step(
          'Find the diameter AC using the distance formula, then divide by 2 to get the radius.',
          'தொலைவு வாய்ப்பாட்டால் விட்டம் AC-ஐக் கண்டு, அதை 2-ஆல் வகுத்து ஆரம் காண்க.',
          'AC = √(9² + (−3)²) = √90 = 3√10; Radius = (3√10)/2 = 3√(5/2) units',
          '\\begin{aligned}AC &= \\sqrt{(6-(-3))^2+(2-5)^2} = \\sqrt{81+9} = \\sqrt{90} = 3\\sqrt{10}\\\\r &= \\dfrac{AC}{2} = \\dfrac{3\\sqrt{10}}{2} = 3\\sqrt{\\dfrac{5}{2}}\\text{ units}\\end{aligned}'
        )
      ],
      '3√(5/2) units (or (3√10)/2 units)',
      '3√(5/2) அலகுகள் (அல்லது (3√10)/2 அலகுகள்)',
      '3\\sqrt{\\dfrac{5}{2}}\\text{ units}',
      {
        ansLatexTa: '3\\sqrt{\\dfrac{5}{2}}\\text{ அலகுகள்}',
        figureSrc: 'assets/grade9-ch5/ex5-5-q5.svg',
        figureAlt: {
          en: 'Euler line showing orthocentre A(-3,5), centroid B(3,3) dividing AC in 2:1, circumcentre C(6,2), and circle with diameter AC',
          ta: 'செங்கோட்டு மையம் A(-3,5), நடுக்கோட்டு மையம் B(3,3), சுற்றுவட்ட மையம் C(6,2) மற்றும் விட்டம் AC கொண்ட வட்டம்'
        },
        figureCaption: {
          en: 'Euler line AB : BC = 2 : 1 gives C(6, 2), diameter AC = 3√10, radius = 3√(5/2)',
          ta: 'ஆய்லர் கோடு AB : BC = 2 : 1 ⇒ C(6, 2), விட்டம் AC = 3√10, ஆரம் = 3√(5/2)'
        }
      }
    ),

    makeEntry(
      6,
      'Fourth vertex D of parallelogram BDCG',
      'இணைகரம் BDCG-இன் முனைப்புள்ளி D காணுதல்',
      '6. ABC is a triangle whose vertices are A(3, 4), B(−2, −1) and C(5, 3). If G is the centroid and BDCG is a parallelogram then find the coordinates of the vertex D.',
      '6. A(3, 4), B(−2, −1) மற்றும் C(5, 3) என்பன முக்கோணம் ABC-இன் முனைப் புள்ளிகள். G ஆனது அதன் நடுக்கோட்டு மையம் மற்றும் BDCG ஆனது ஓர் இணைகரம் எனில் முனைப்புள்ளி D-இன் ஆயத் தொலைவுகளைக் காண்க.',
      ['6. ', tex('ABC', 'ABC'), ' is a triangle whose vertices are ', tex('A(3, 4), B(-2, -1)', 'A(3, 4), B(−2, −1)'), ' and ', tex('C(5, 3)', 'C(5, 3)'), '. If ', tex('G', 'G'), ' is the centroid and ', tex('BDCG', 'BDCG'), ' is a parallelogram then find the coordinates of the vertex ', tex('D', 'D'), '.'],
      ['6. ', tex('A(3, 4), B(-2, -1)', 'A(3, 4), B(−2, −1)'), ' மற்றும் ', tex('C(5, 3)', 'C(5, 3)'), ' என்பன முக்கோணம் ', tex('ABC', 'ABC'), '-இன் முனைப் புள்ளிகள். ', tex('G', 'G'), ' ஆனது அதன் நடுக்கோட்டு மையம் மற்றும் ', tex('BDCG', 'BDCG'), ' ஆனது ஓர் இணைகரம் எனில் முனைப்புள்ளி ', tex('D', 'D'), '-இன் ஆயத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'First find the centroid G of △ABC with vertices A(3, 4), B(−2, −1), C(5, 3).',
          'முதலில் A(3, 4), B(−2, −1), C(5, 3) முனைகளைக் கொண்ட △ABC-இன் நடுக்கோட்டு மையம் G-ஐக் காண்க.',
          'G = ((3 − 2 + 5)/3, (4 − 1 + 3)/3) = (6/3, 6/3) = (2, 2)',
          'G = \\left(\\dfrac{3+(-2)+5}{3},\\; \\dfrac{4+(-1)+3}{3}\\right) = (2, 2)'
        ),
        step(
          'In parallelogram BDCG, the diagonals BC and DG bisect each other, so Mid-point of BC = Mid-point of DG. Let D = (x, y).',
          'இணைகரம் BDCG-இல் மூலைவிட்டங்கள் BC மற்றும் DG ஒன்றையொன்று இருசமக் கூறிடும். D = (x, y) என்க.',
          '((−2+5)/2, (−1+3)/2) = ((x+2)/2, (y+2)/2) ⇒ x = 1, y = 0 ⇒ D(1, 0)',
          '\\begin{aligned}\\left(\\dfrac{-2+5}{2},\\; \\dfrac{-1+3}{2}\\right) &= \\left(\\dfrac{x+2}{2},\\; \\dfrac{y+2}{2}\\right)\\\\x+2 = 3 \\implies x &= 1\\\\y+2 = 2 \\implies y &= 0 \\implies D(1, 0)\\end{aligned}'
        )
      ],
      '(1, 0)',
      '(1, 0)',
      '(1, 0)',
      { enPdf: 224, taPdf: 238, enPrint: 218, taPrint: 232 }
    ),

    makeEntry(
      7,
      'Centroid from side mid-points of a triangle',
      'பக்கங்களின் நடுப்புள்ளிகளிலிருந்து நடுக்கோட்டு மையம் காணுதல்',
      '7. If (3/2, 5), (7, −9/2) and (13/2, −13/2) are mid-points of the sides of a triangle, then find the centroid of the triangle.',
      '7. முக்கோணத்தின் பக்கங்களின் நடுப்புள்ளிகள் (3/2, 5), (7, −9/2) மற்றும் (13/2, −13/2) எனில் அந்த முக்கோணத்தின் நடுக்கோட்டு மையம் காண்க.',
      ['7. If ', tex('\\left(\\dfrac{3}{2}, 5\\right),\\; \\left(7, \\dfrac{-9}{2}\\right)', '(3/2, 5), (7, −9/2)'), ' and ', tex('\\left(\\dfrac{13}{2}, \\dfrac{-13}{2}\\right)', '(13/2, −13/2)'), ' are mid-points of the sides of a triangle, then find the centroid of the triangle.'],
      ['7. முக்கோணத்தின் பக்கங்களின் நடுப்புள்ளிகள் ', tex('\\left(\\dfrac{3}{2}, 5\\right),\\; \\left(7, \\dfrac{-9}{2}\\right)', '(3/2, 5), (7, −9/2)'), ' மற்றும் ', tex('\\left(\\dfrac{13}{2}, \\dfrac{-13}{2}\\right)', '(13/2, −13/2)'), ' எனில் அந்த முக்கோணத்தின் நடுக்கோட்டு மையம் காண்க.'],
      [
        step(
          'The centroid of a triangle coincides with the centroid of the triangle formed by joining the mid-points of its three sides.',
          'ஒரு முக்கோணத்தின் நடுக்கோட்டு மையமும், அதன் பக்கங்களின் நடுப்புள்ளிகளை இணைத்து உருவாகும் முக்கோணத்தின் நடுக்கோட்டு மையமும் ஒன்றே.',
          'G = centroid of mid-points D, E, F',
          'G = \\left(\\dfrac{x_D+x_E+x_F}{3},\\; \\dfrac{y_D+y_E+y_F}{3}\\right)'
        ),
        step(
          'Average the three mid-points (3/2, 5), (7, −9/2), and (13/2, −13/2).',
          'மூன்று நடுப்புள்ளிகள் (3/2, 5), (7, −9/2), (13/2, −13/2) ஆகியவற்றின் சராசரியைக் காண்க.',
          'x = (3/2 + 7 + 13/2)/3 = 15/3 = 5; y = (5 − 9/2 − 13/2)/3 = −6/3 = −2',
          '\\begin{aligned}x &= \\dfrac{\\frac{3}{2}+7+\\frac{13}{2}}{3} = \\dfrac{8+7}{3} = \\dfrac{15}{3} = 5\\\\y &= \\dfrac{5-\\frac{9}{2}-\\frac{13}{2}}{3} = \\dfrac{5-11}{3} = \\dfrac{-6}{3} = -2\\end{aligned}'
        )
      ],
      '(5, −2)',
      '(5, −2)',
      '(5, -2)',
      { enPdf: 224, taPdf: 238, enPrint: 218, taPrint: 232 }
    )
  ];

  for (const item of entries) {
    if (grade.items.some(q => q.id === item.id)) throw Error('Duplicate textbook ID: ' + item.id);
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
