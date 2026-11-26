/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.4 (Q1–Q7, 7 marked slots).
 * Bilingual English & Tamil — page-visual-checked against 2025 EN p.214 (PDF 220) & TA p.228 (PDF 234); Answer Key EN p.321 / TA p.337.
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
    id: `g9-ch5-ex5.4-q${qNum}`,
    classNum: 9,
    chapter: '5',
    exercise: '5.4',
    kind: 'textbook',
    edition: '2025',
    preferItemMath: true,
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
    topic: { en: 'Coordinate Geometry · Section Formula', ta: 'ஆயத்தொலை வடிவியல் · பிரிவுச் சூத்திரம்' },
    label: { en: `Exercise 5.4 · Q${qNum}`, ta: `பயிற்சி 5.4 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: { en: qMathEn, ta: qMathTa },
    steps,
    answer: ansEn,
    answerTa: ansTa,
    answerMath: { en: tex(ansLatex, ansEn, true), ta: tex(extra.ansLatexTa??ansLatex, ansTa, true) },
    sourceFidelity: {
      status: 'page-visual-checked',
      sourcePdfPage: { en: 220, ta: 234 },
      sourcePrintedPage: { en: 214, ta: 228 },
      answerKeyPdfPage: { en: 321, ta: 337 }
    }
  });

  const entries = [
    makeEntry(
      1,
      'Internal division in ratio 3:2',
      '3:2 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளி',
      '1. Find the coordinates of the point which divides the line segment joining the points A(4, −3) and B(9, 7) in the ratio 3:2.',
      '1. A(4, −3) மற்றும் B(9, 7) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டை 3:2 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளியின் ஆயத் தொலைவுகளைக் காண்க.',
      ['1. Find the coordinates of the point which divides the line segment joining the points ', tex('A(4, -3)', 'A(4, −3)'), ' and ', tex('B(9, 7)', 'B(9, 7)'), ' in the ratio ', tex('3:2', '3:2'), '.'],
      ['1. ', tex('A(4, -3)', 'A(4, −3)'), ' மற்றும் ', tex('B(9, 7)', 'B(9, 7)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டை ', tex('3:2', '3:2'), ' என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளியின் ஆயத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'Use the section formula for internal division in the ratio m : n = 3 : 2 with A(4, −3) and B(9, 7).',
          'm : n = 3 : 2 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் பிரிவுச் சூத்திரத்தை A(4, −3), B(9, 7) புள்ளிகளுக்குப் பயன்படுத்துவோம்.',
          'P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))',
          'P\\left(\\dfrac{mx_2+nx_1}{m+n},\\; \\dfrac{my_2+ny_1}{m+n}\\right)'
        ),
        step(
          'Substitute x₁ = 4, y₁ = −3, x₂ = 9, y₂ = 7, m = 3, n = 2 and simplify.',
          'x₁ = 4, y₁ = −3, x₂ = 9, y₂ = 7, m = 3, n = 2 எனப் பிரதியிட்டுச் சுருக்குக.',
          'P = ((27+8)/5, (21−6)/5) = (35/5, 15/5) = (7, 3)',
          'P = \\left(\\dfrac{3(9)+2(4)}{3+2},\\; \\dfrac{3(7)+2(-3)}{3+2}\\right) = \\left(\\dfrac{35}{5},\\; \\dfrac{15}{5}\\right) = (7, 3)'
        )
      ],
      '(7, 3)',
      '(7, 3)',
      '(7, 3)'
    ),

    makeEntry(
      2,
      'Find internal division ratio',
      'உட்புறப் பிரிவு விகிதத்தைக் காணுதல்',
      '2. In what ratio does the point P(2, −5) divide the line segment joining A(−3, 5) and B(4, −9).',
      '2. A(−3, 5) மற்றும் B(4, −9) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டைப் புள்ளி P(2, −5) என்ன விகிதத்தில் பிரிக்கும்?',
      ['2. In what ratio does the point ', tex('P(2, -5)', 'P(2, −5)'), ' divide the line segment joining ', tex('A(-3, 5)', 'A(−3, 5)'), ' and ', tex('B(4, -9)', 'B(4, −9)'), '.'],
      ['2. ', tex('A(-3, 5)', 'A(−3, 5)'), ' மற்றும் ', tex('B(4, -9)', 'B(4, −9)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டைப் புள்ளி ', tex('P(2, -5)', 'P(2, −5)'), ' என்ன விகிதத்தில் பிரிக்கும்?'],
      [
        step(
          'Let P(2, −5) divide AB in the ratio m : n. By the section formula, equate the x-coordinate to 2.',
          'P(2, −5) ஆனது AB-ஐ m : n என்ற விகிதத்தில் பிரிக்கிறது என்க. பிரிவுச் சூத்திரத்தில் x-ஆயத்தொலைவை 2-க்குச் சமப்படுத்துவோம்.',
          '(4m − 3n)/(m + n) = 2 ⇒ 4m − 3n = 2m + 2n ⇒ 2m = 5n ⇒ m : n = 5 : 2',
          '\\begin{aligned}\\dfrac{m(4)+n(-3)}{m+n} &= 2\\\\4m-3n &= 2m+2n\\\\2m &= 5n \\implies \\dfrac{m}{n} = \\dfrac{5}{2}\\end{aligned}'
        ),
        step(
          'Verify with the y-coordinate: (5(−9) + 2(5))/(5 + 2) = (−45 + 10)/7 = −35/7 = −5, which matches P(2, −5).',
          'y-ஆயத்தொலைவைச் சரிபார்க்க: (5(−9) + 2(5))/(5 + 2) = −35/7 = −5, இது P(2, −5)-உடன் பொருந்துகிறது.',
          'y = (−45 + 10)/7 = −5 (verified); ratio = 5 : 2',
          'y = \\dfrac{5(-9)+2(5)}{5+2} = \\dfrac{-35}{7} = -5 \\;(\\text{verified}) \\implies 5:2'
        )
      ],
      '5:2',
      '5:2',
      '5:2'
    ),

    makeEntry(
      3,
      'Point P on AB with AP = (2/5) AB',
      'AP = (2/5) AB என்ற வகையில் புள்ளி P காணுதல்',
      '3. Find the coordinates of a point P on the line segment joining A(1, 2) and B(6, 7) in such a way that AP = (2/5) AB.',
      '3. A(1, 2) மற்றும் B(6, 7) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டில் AP = (2/5) AB என்றவாறு அமையும் புள்ளி P-இன் ஆயத் தொலைவுகளைக் காண்க.',
      ['3. Find the coordinates of a point ', tex('P', 'P'), ' on the line segment joining ', tex('A(1, 2)', 'A(1, 2)'), ' and ', tex('B(6, 7)', 'B(6, 7)'), ' in such a way that ', tex('AP = \\dfrac{2}{5}AB', 'AP = (2/5) AB'), '.'],
      ['3. ', tex('A(1, 2)', 'A(1, 2)'), ' மற்றும் ', tex('B(6, 7)', 'B(6, 7)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டில் ', tex('AP = \\dfrac{2}{5}AB', 'AP = (2/5) AB'), ' என்றவாறு அமையும் புள்ளி ', tex('P', 'P'), '-இன் ஆயத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'Since AP = (2/5) AB and P lies on segment AB, PB = AB − AP = (3/5) AB. Therefore, AP : PB = 2 : 3.',
          'AP = (2/5) AB என்பதால் PB = AB − AP = (3/5) AB. ஆகவே P ஆனது AB-ஐ AP : PB = 2 : 3 என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கிறது.',
          'AP : PB = 2 : 3',
          'PB = AB - \\dfrac{2}{5}AB = \\dfrac{3}{5}AB \\implies AP:PB = 2:3'
        ),
        step(
          'Apply the section formula with m = 2, n = 3, A(1, 2), and B(6, 7).',
          'm = 2, n = 3, A(1, 2), B(6, 7) ஆகியவற்றைப் பிரிவுச் சூத்திரத்தில் பிரதியிடுவோம்.',
          'P = ((2×6 + 3×1)/5, (2×7 + 3×2)/5) = (15/5, 20/5) = (3, 4)',
          'P = \\left(\\dfrac{2(6)+3(1)}{2+3},\\; \\dfrac{2(7)+3(2)}{2+3}\\right) = \\left(\\dfrac{15}{5},\\; \\dfrac{20}{5}\\right) = (3, 4)'
        )
      ],
      '(3, 4)',
      '(3, 4)',
      '(3, 4)'
    ),

    makeEntry(
      4,
      'Points of trisection of a line segment',
      'கோட்டுத்துண்டை மூன்று சமபாகங்களாகப் பிரிக்கும் புள்ளிகள்',
      '4. Find the coordinates of the points of trisection of the line segment joining the points A(−5, 6) and B(4, −3).',
      '4. A(−5, 6) மற்றும் B(4, −3) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டை மூன்று சமப் பாகங்களாகப் பிரிக்கும் புள்ளிகளின் ஆயத் தொலைவுகளைக் காண்க.',
      ['4. Find the coordinates of the points of trisection of the line segment joining the points ', tex('A(-5, 6)', 'A(−5, 6)'), ' and ', tex('B(4, -3)', 'B(4, −3)'), '.'],
      ['4. ', tex('A(-5, 6)', 'A(−5, 6)'), ' மற்றும் ', tex('B(4, -3)', 'B(4, −3)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டை மூன்று சமப் பாகங்களாகப் பிரிக்கும் புள்ளிகளின் ஆயத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'Let P and Q be the points of trisection of AB so that AP = PQ = QB. Then P divides AB in the ratio 1 : 2, and Q divides AB in the ratio 2 : 1.',
          'P மற்றும் Q ஆகியவை AB-ஐ மூன்று சமபாகங்களாக்கும் புள்ளிகள் என்க (AP = PQ = QB). எனவே P ஆனது 1 : 2 விகிதத்திலும், Q ஆனது 2 : 1 விகிதத்திலும் பிரிக்கும்.',
          'P divides AB in 1:2; Q divides AB in 2:1',
          'AP:PB = 1:2,\\qquad AQ:QB = 2:1'
        ),
        step(
          'Find P using ratio 1 : 2 for A(−5, 6) and B(4, −3).',
          'A(−5, 6) மற்றும் B(4, −3)-ஐ 1 : 2 விகிதத்தில் பிரிக்கும் புள்ளி P-ஐக் காண்க.',
          'P = ((1×4 + 2×(−5))/3, (1×(−3) + 2×6)/3) = (−6/3, 9/3) = (−2, 3)',
          'P = \\left(\\dfrac{1(4)+2(-5)}{1+2},\\; \\dfrac{1(-3)+2(6)}{1+2}\\right) = \\left(\\dfrac{-6}{3},\\; \\dfrac{9}{3}\\right) = (-2, 3)'
        ),
        step(
          'Find Q using ratio 2 : 1 (or as the mid-point of P(−2, 3) and B(4, −3)).',
          '2 : 1 விகிதத்தில் பிரிக்கும் புள்ளி Q-ஐக் காண்க (அல்லது P(−2, 3), B(4, −3)-இன் நடுப்புள்ளி).',
          'Q = ((2×4 + 1×(−5))/3, (2×(−3) + 1×6)/3) = (3/3, 0/3) = (1, 0)',
          'Q = \\left(\\dfrac{2(4)+1(-5)}{2+1},\\; \\dfrac{2(-3)+1(6)}{2+1}\\right) = \\left(\\dfrac{3}{3},\\; \\dfrac{0}{3}\\right) = (1, 0)'
        )
      ],
      '(−2, 3), (1, 0)',
      '(−2, 3), (1, 0)',
      '(-2, 3),\\; (1, 0)'
    ),

    makeEntry(
      5,
      'Extend segment by half its length at each end',
      'கோட்டுத்துண்டின் இரு முனைகளிலும் பாதி அளவு நீட்டுதல்',
      '5. The line segment joining A(6, 3) and B(−1, −4) is doubled in length by adding half of AB to each end. Find the coordinates of the new end points.',
      '5. A(6, 3) மற்றும் B(−1, −4) ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டானது, AB-இன் நீளத்தில் பாதி அளவினை இரு முனைகளிலும் இணைத்து இரு மடங்காக ஆக்கப்படுகிறது எனில் புதிய முனைகளின் ஆயத்தொலைவுகளைக் காண்க.',
      ['5. The line segment joining ', tex('A(6, 3)', 'A(6, 3)'), ' and ', tex('B(-1, -4)', 'B(−1, −4)'), ' is doubled in length by adding half of ', tex('AB', 'AB'), ' to each end. Find the coordinates of the new end points.'],
      ['5. ', tex('A(6, 3)', 'A(6, 3)'), ' மற்றும் ', tex('B(-1, -4)', 'B(−1, −4)'), ' ஆகிய புள்ளிகளை இணைக்கும் கோட்டுத்துண்டானது, ', tex('AB', 'AB'), '-இன் நீளத்தில் பாதி அளவினை இரு முனைகளிலும் இணைத்து இரு மடங்காக ஆக்கப்படுகிறது எனில் புதிய முனைகளின் ஆயத்தொலைவுகளைக் காண்க.'],
      [
        step(
          'Let P and Q be the new endpoints beyond A and B respectively, so PA = (1/2)AB and BQ = (1/2)AB. Note that M, the mid-point of AB, is ((6−1)/2, (3−4)/2) = (5/2, −1/2), and A is the mid-point of P and M? Wait: PA = AM = MB = BQ = (1/2)AB.',
          'புதிய முனைகள் P (A-க்கு அப்பால்) மற்றும் Q (B-க்கு அப்பால்) என்க. இங்கு PA = BQ = (1/2) AB. ஆகவே P–A–B வரிசையில் A என்பது P மற்றும் M-இன் நடுப்புள்ளியல்ல; PA : AB = 1 : 2 என்பதால் A என்பது P மற்றும் B-ஐ 1 : 2 விகிதத்தில் பிரிக்கும்!',
          'PA : AB = 1 : 2 and AB : BQ = 2 : 1',
          'PA:AB = 1:2 \\quad\\text{and}\\quad AB:BQ = 2:1'
        ),
        step(
          'Since A(6, 3) divides PB in the ratio 1 : 2, find P(x₁, y₁) using the section formula.',
          'A(6, 3) என்பது P(x₁, y₁) மற்றும் B(−1, −4)-ஐ 1 : 2 விகிதத்தில் பிரிப்பதால் P-ஐக் காண்போம்.',
          '(1(−1) + 2x₁)/3 = 6 ⇒ x₁ = 19/2; (1(−4) + 2y₁)/3 = 3 ⇒ y₁ = 13/2',
          '\\begin{aligned}\\dfrac{1(-1)+2x_1}{3}&=6 \\implies 2x_1=19 \\implies x_1=\\dfrac{19}{2}\\\\\\dfrac{1(-4)+2y_1}{3}&=3 \\implies 2y_1=13 \\implies y_1=\\dfrac{13}{2}\\end{aligned}'
        ),
        step(
          'Similarly, B(−1, −4) divides AQ in the ratio 2 : 1, so find Q(x₂, y₂).',
          'இதேபோல், B(−1, −4) என்பது A(6, 3) மற்றும் Q(x₂, y₂)-ஐ 2 : 1 விகிதத்தில் பிரிப்பதால் Q-ஐக் காண்போம்.',
          '(2x₂ + 1(6))/3 = −1 ⇒ x₂ = −9/2; (2y₂ + 1(3))/3 = −4 ⇒ y₂ = −15/2',
          '\\begin{aligned}\\dfrac{2x_2+1(6)}{3}&=-1 \\implies 2x_2=-9 \\implies x_2=-\\dfrac{9}{2}\\\\\\dfrac{2y_2+1(3)}{3}&=-4 \\implies 2y_2=-15 \\implies y_2=-\\dfrac{15}{2}\\end{aligned}'
        )
      ],
      '(19/2, 13/2), (−9/2, −15/2)',
      '(19/2, 13/2), (−9/2, −15/2)',
      '\\left(\\dfrac{19}{2},\\; \\dfrac{13}{2}\\right),\\; \\left(-\\dfrac{9}{2},\\; -\\dfrac{15}{2}\\right)'
    ),

    makeEntry(
      6,
      'Show collinearity using section formula',
      'பிரிவுச் சூத்திரத்தைப் பயன்படுத்தி ஒரு கோடமையும் புள்ளிகள் என நிறுவுதல்',
      '6. Using section formula, show that the points A(7, −5), B(9, −3) and C(13, 1) are collinear.',
      '6. பிரிவுச் சூத்திரத்தைப் பயன்படுத்திப் புள்ளிகள் A(7, −5), B(9, −3) மற்றும் C(13, 1) ஆகியன ஒரே கோட்டில் அமையும் என நிரூபிக்க.',
      ['6. Using section formula, show that the points ', tex('A(7, -5), B(9, -3)', 'A(7, −5), B(9, −3)'), ' and ', tex('C(13, 1)', 'C(13, 1)'), ' are collinear.'],
      ['6. பிரிவுச் சூத்திரத்தைப் பயன்படுத்திப் புள்ளிகள் ', tex('A(7, -5), B(9, -3)', 'A(7, −5), B(9, −3)'), ' மற்றும் ', tex('C(13, 1)', 'C(13, 1)'), ' ஆகியன ஒரே கோட்டில் அமையும் என நிரூபிக்க.'],
      [
        step(
          'Assume B(9, −3) divides the segment joining A(7, −5) and C(13, 1) in the ratio k : 1. Find k from the x-coordinate.',
          'A(7, −5) மற்றும் C(13, 1)-ஐ இணைக்கும் கோட்டுத்துண்டை B(9, −3) ஆனது k : 1 என்ற விகிதத்தில் பிரிக்கிறது எனக் கருதி x-ஆயத்தொலைவிலிருந்து k காண்போம்.',
          '(13k + 7)/(k + 1) = 9 ⇒ 13k + 7 = 9k + 9 ⇒ 4k = 2 ⇒ k = 1/2',
          '\\dfrac{k(13)+1(7)}{k+1}=9 \\implies 13k+7=9k+9 \\implies 4k=2 \\implies k=\\dfrac{1}{2}'
        ),
        step(
          'Substitute k = 1/2 into the y-coordinate formula: ((1/2)(1) + 1(−5)) / (1/2 + 1) = (−9/2) / (3/2) = −3, which equals the y-coordinate of B.',
          'k = 1/2-ஐ y-ஆயத்தொலைவில் பிரதியிட: ((1/2)(1) + (−5))/(3/2) = −3, இது B-இன் y-ஆயத்தொலைவிற்குச் சமம்.',
          'y = −3 (matches B); ratio 1:2 ⇒ A, B, C are collinear',
          'y = \\dfrac{\\frac{1}{2}(1)+1(-5)}{\\frac{1}{2}+1} = \\dfrac{-9/2}{3/2} = -3 \\implies \\text{A, B, C are collinear}'
        )
      ],
      'Proved: B divides AC internally in the ratio 1:2, so A, B, C are collinear',
      'நிறுவப்பட்டது: B ஆனது AC-ஐ 1:2 விகிதத்தில் பிரிப்பதால் A, B, C ஒரே கோட்டில் அமையும்',
      'AB:BC = 1:2 \\implies \\text{Collinear}',
      { ansLatexTa: 'AB:BC=1:2\\implies A,B,C\\text{ ஒரே கோட்டில் அமையும்}' }
    ),

    makeEntry(
      7,
      '25% extension of a line segment',
      'கோட்டுத்துண்டை 25% நீட்டுதல்',
      '7. A line segment AB is increased along its length by 25% by producing it to C on the side of B. If A and B have the coordinates (−2, −3) and (2, 1) respectively, then find the coordinates of C.',
      '7. கோட்டுத்துண்டு AB ஆனது முனை B இலிருந்து C இக்கு அதன் நீளம் 25% அதிகரிக்குமாறு நீட்டப்படுகிறது. புள்ளிகள் A மற்றும் B இன் ஆயத் தொலைவுகள் முறையே (−2, −3) மற்றும் (2, 1) எனில் C இன் ஆயத்தொலைவுகளைக் காண்க.',
      ['7. A line segment ', tex('AB', 'AB'), ' is increased along its length by ', tex('25\\%', '25%'), ' by producing it to ', tex('C', 'C'), ' on the side of ', tex('B', 'B'), '. If ', tex('A', 'A'), ' and ', tex('B', 'B'), ' have the coordinates ', tex('(-2, -3)', '(−2, −3)'), ' and ', tex('(2, 1)', '(2, 1)'), ' respectively, then find the coordinates of ', tex('C', 'C'), '.'],
      ['7. கோட்டுத்துண்டு ', tex('AB', 'AB'), ' ஆனது முனை ', tex('B', 'B'), ' இலிருந்து ', tex('C', 'C'), ' இக்கு அதன் நீளம் ', tex('25\\%', '25%'), ' அதிகரிக்குமாறு நீட்டப்படுகிறது. புள்ளிகள் ', tex('A', 'A'), ' மற்றும் ', tex('B', 'B'), ' இன் ஆயத் தொலைவுகள் முறையே ', tex('(-2, -3)', '(−2, −3)'), ' மற்றும் ', tex('(2, 1)', '(2, 1)'), ' எனில் ', tex('C', 'C'), ' இன் ஆயத்தொலைவுகளைக் காண்க.'],
      [
        step(
          'AB is increased by 25% beyond B to C, so BC = 25% of AB = (1/4) AB. Hence AB : BC = 4 : 1, meaning B divides AC internally in the ratio 4 : 1.',
          'AB-இன் நீளம் B-க்கு அப்பால் C வரை 25% அதிகரிக்கிறது; எனவே BC = (25/100) AB = (1/4) AB. ஆகவே AB : BC = 4 : 1, அதாவது B ஆனது AC-ஐ 4 : 1 விகிதத்தில் உட்புறமாகப் பிரிக்கிறது.',
          'BC = 0.25 AB = (1/4)AB ⇒ AB : BC = 4 : 1',
          'BC = \\dfrac{25}{100}AB = \\dfrac{1}{4}AB \\implies AB:BC = 4:1'
        ),
        step(
          'Let C = (x, y). Using the section formula for B(2, 1) dividing A(−2, −3) and C(x, y) in ratio 4 : 1, solve for x and y.',
          'C = (x, y) என்க. B(2, 1) என்பது A(−2, −3) மற்றும் C(x, y)-ஐ 4 : 1 விகிதத்தில் பிரிப்பதால் பிரிவுச் சூத்திரத்தில் பிரதியிட்டு x, y காண்க.',
          '(4x − 2)/5 = 2 ⇒ x = 3; (4y − 3)/5 = 1 ⇒ y = 2 ⇒ C(3, 2)',
          '\\begin{aligned}\\left(\\dfrac{4x+1(-2)}{4+1},\\; \\dfrac{4y+1(-3)}{4+1}\\right) &= (2, 1)\\\\4x-2 = 10 \\implies x &= 3\\\\4y-3 = 5 \\implies y &= 2 \\implies C(3, 2)\\end{aligned}'
        )
      ],
      'C(3, 2)',
      'C(3, 2)',
      'C(3, 2)'
    )
  ];

  for (const item of entries) {
    if (grade.items.some(q => q.id === item.id)) throw Error('Duplicate textbook ID: ' + item.id);
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
