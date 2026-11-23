/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.2 (Q1–Q12, 20 marked slots).
 * Enriches the 8 existing IDs (q2,q3,q5,q6,q7,q8,q9,q11) with full Tamil parity & KaTeX without touching g9-clear-math.js or g9-ch5-ex5-2-en.js.
 * Adds Q1, Q4, Q10, Q12 and sorts Exercise 5.2 items into exact textbook order Q1–Q12.
 * Sources: 2025 EN pp.202-203 (PDF 208-209); TA pp.215-216 (PDF 221-222); Answer Key EN p.321 / TA p.337.
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
    id: `g9-ch5-ex5.2-q${qNum}`,
    classNum: 9,
    chapter: '5',
    exercise: '5.2',
    kind: 'textbook',
    edition: '2025',
    preferItemMath: true,
    conceptId: 'g9-ch5-distance-formula',
    releaseStatus: 'bilingual-2025-source-checked',
    translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
    topic: { en: 'Coordinate Geometry · Distance Formula', ta: 'ஆயத்தொலை வடிவியல் · தொலைவு வாய்ப்பாடு' },
    label: { en: `Exercise 5.2 · Q${qNum}`, ta: `பயிற்சி 5.2 · வினா ${qNum}` },
    title: { en: titleEn, ta: titleTa },
    q: { en: qEn, ta: qTa },
    questionMath: { en: qMathEn, ta: qMathTa },
    steps,
    answer: ansEn,
    answerTa: ansTa,
    answerMath: { en: tex(ansLatex, ansEn, true), ta: tex(ansLatex, ansTa, true) },
    sourceFidelity: {
      status: 'page-visual-checked',
      sourcePdfPage: { en: extra.enPdf || 209, ta: extra.taPdf || 222 },
      sourcePrintedPage: { en: extra.enPrint || 203, ta: extra.taPrint || 216 },
      answerKeyPdfPage: { en: 321, ta: 337 },
      ...(extra.notes ? { notes: extra.notes } : {})
    }
  });

  const all52 = [
    makeEntry(
      1,
      'Distance between pairs of points',
      'இரு புள்ளிகளுக்கு இடையேயான தொலைவு',
      '1. Find the distance between the following pairs of points.\n(i) (1, 2) and (4, 3)   (ii) (3, 4) and (−7, 2)\n(iii) (a, b) and (c, b)   (iv) (3, −9) and (−2, 3)',
      '1. கீழ்க்காணும் புள்ளிகளுக்கு இடையே உள்ள தொலைவைக் காண்க.\n(i) (1, 2) மற்றும் (4, 3)   (ii) (3, 4) மற்றும் (−7, 2)\n(iii) (a, b) மற்றும் (c, b)   (iv) (3, −9) மற்றும் (−2, 3)',
      ['1. Find the distance between the following pairs of points.\n(i) (1, 2) and (4, 3)   (ii) (3, 4) and (−7, 2)\n(iii) (a, b) and (c, b)   (iv) (3, −9) and (−2, 3)'],
      ['1. கீழ்க்காணும் புள்ளிகளுக்கு இடையே உள்ள தொலைவைக் காண்க.\n(i) (1, 2) மற்றும் (4, 3)   (ii) (3, 4) மற்றும் (−7, 2)\n(iii) (a, b) மற்றும் (c, b)   (iv) (3, −9) மற்றும் (−2, 3)'],
      [
        step(
          'Use the distance formula d = √[(x₂ − x₁)² + (y₂ − y₁)²].',
          'இரு புள்ளிகளுக்கு இடையேயான தொலைவு வாய்ப்பாடு d = √[(x₂ − x₁)² + (y₂ − y₁)²]-ஐப் பயன்படுத்துவோம்.',
          'd = √((x₂ − x₁)² + (y₂ − y₁)²)',
          'd = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}'
        ),
        step(
          '(i) Between (1, 2) and (4, 3): subtract x-coordinates (4 − 1 = 3) and y-coordinates (3 − 2 = 1).',
          '(i) (1, 2) மற்றும் (4, 3): x-வேறுபாடு 4 − 1 = 3, y-வேறுபாடு 3 − 2 = 1.',
          'd₁ = √((4−1)² + (3−2)²) = √(9 + 1) = √10 units',
          'd_1 = \\sqrt{(4-1)^2+(3-2)^2} = \\sqrt{3^2+1^2} = \\sqrt{10}\\text{ units}'
        ),
        step(
          '(ii) Between (3, 4) and (−7, 2): compute (−7 − 3)² + (2 − 4)² = 100 + 4 = 104 = 4 × 26.',
          '(ii) (3, 4) மற்றும் (−7, 2): (−7 − 3)² + (2 − 4)² = 100 + 4 = 104 = 4 × 26.',
          'd₂ = √((−7−3)² + (2−4)²) = √104 = 2√26 units',
          'd_2 = \\sqrt{(-7-3)^2+(2-4)^2} = \\sqrt{100+4} = \\sqrt{104} = 2\\sqrt{26}\\text{ units}'
        ),
        step(
          '(iii) Between (a, b) and (c, b): both y-coordinates equal b, so y₂ − y₁ = 0 and distance is |c − a| (written c − a in the textbook key when c ≥ a).',
          '(iii) (a, b) மற்றும் (c, b): y-ஆயத்தொலைவுகள் சமம் (b − b = 0) என்பதால் தொலைவு |c − a| (c ≥ a எனில் c − a).',
          'd₃ = √((c−a)² + (b−b)²) = |c − a| (= c − a)',
          'd_3 = \\sqrt{(c-a)^2+(b-b)^2} = |c-a| \\;(= c-a\\text{ when }c\\ge a)'
        ),
        step(
          '(iv) Between (3, −9) and (−2, 3): compute (−2 − 3)² + (3 − (−9))² = (−5)² + 12² = 25 + 144 = 169.',
          '(iv) (3, −9) மற்றும் (−2, 3): (−2 − 3)² + (3 − (−9))² = (−5)² + 12² = 25 + 144 = 169.',
          'd₄ = √((−2−3)² + (3+9)²) = √169 = 13 units',
          'd_4 = \\sqrt{(-2-3)^2+(3-(-9))^2} = \\sqrt{25+144} = \\sqrt{169} = 13\\text{ units}'
        )
      ],
      '(i) √10 units; (ii) 2√26 units; (iii) |c − a| (c − a); (iv) 13 units',
      '(i) √10 அலகுகள்; (ii) 2√26 அலகுகள்; (iii) |c − a| (c − a); (iv) 13 அலகுகள்',
      '\\begin{aligned}\\text{(i) }\\sqrt{10},&\\quad \\text{(ii) }2\\sqrt{26}\\\\\\text{(iii) }c-a,&\\quad \\text{(iv) }13\\end{aligned}',
      { enPdf: 208, taPdf: 221, enPrint: 202, taPrint: 215, notes: ['2025 English PDF p.208 prints (i),(ii),(ii),(iv); Tamil PDF p.221 prints (i),(ii),(iii),(iv). Canonicalized as (iii).'] }
    ),

    makeEntry(
      2,
      'Testing collinearity',
      'ஒரு கோடமையும் புள்ளிகளா என ஆராய்தல்',
      '2. Determine whether the given set of points in each case are collinear or not.\n(i) (7, −2), (5, 1), (3, 4)   (ii) (a, −2), (a, 3), (a, 0)',
      '2. தரப்பட்டுள்ள புள்ளிகள் ஒரு கோடமையும் புள்ளிகளா என ஆராய்க.\n(i) (7, −2), (5, 1), (3, 4)   (ii) (a, −2), (a, 3), (a, 0)',
      ['2. Determine whether the given set of points in each case are collinear or not.\n(i) ', tex('(7,-2),(5,1),(3,4)', '(7, −2), (5, 1), (3, 4)'), '   (ii) ', tex('(a,-2),(a,3),(a,0)', '(a, −2), (a, 3), (a, 0)')],
      ['2. தரப்பட்டுள்ள புள்ளிகள் ஒரு கோடமையும் புள்ளிகளா என ஆராய்க.\n(i) ', tex('(7,-2),(5,1),(3,4)', '(7, −2), (5, 1), (3, 4)'), '   (ii) ', tex('(a,-2),(a,3),(a,0)', '(a, −2), (a, 3), (a, 0)')],
      [
        step(
          'Three points A, B, C are collinear if the sum of the two shorter distances equals the longest distance (by the distance formula).',
          'தொலைவு வாய்ப்பாட்டின்படி, இரு சிறிய தொலைவுகளின் கூடுதல் மிகப் பெரிய தொலைவிற்குச் சமமாக இருந்தால் அம்மூன்று புள்ளிகளும் ஒரே நேர்க்கோட்டில் அமையும்.',
          'd = √((x₂−x₁)² + (y₂−y₁)²)',
          'PQ = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}'
        ),
        step(
          '(i) Let A(7, −2), B(5, 1), C(3, 4). Find AB, BC, and AC.',
          '(i) A(7, −2), B(5, 1), C(3, 4) என்க. AB, BC, AC தொலைவுகளைக் காண்போம்.',
          'AB = √13; BC = √13; AC = 2√13',
          '\\begin{aligned}AB&=\\sqrt{(5-7)^2+(1-(-2))^2}=\\sqrt{4+9}=\\sqrt{13}\\\\BC&=\\sqrt{(3-5)^2+(4-1)^2}=\\sqrt{4+9}=\\sqrt{13}\\\\AC&=\\sqrt{(3-7)^2+(4-(-2))^2}=\\sqrt{16+36}=\\sqrt{52}=2\\sqrt{13}\\end{aligned}'
        ),
        step(
          'Since AB + BC = √13 + √13 = 2√13 = AC, the points in (i) are collinear.',
          'AB + BC = √13 + √13 = 2√13 = AC என்பதால், (i) ஒரு கோடமையும் புள்ளிகள்.',
          'AB + BC = AC ⇒ Collinear',
          'AB + BC = \\sqrt{13}+\\sqrt{13} = 2\\sqrt{13} = AC \\implies \\text{Collinear}'
        ),
        step(
          '(ii) Let A(a, −2), B(a, 3), C(a, 0). All three have the same x-coordinate a, so find AB, BC, and CA.',
          '(ii) A(a, −2), B(a, 3), C(a, 0) ஆகிய மூன்றிலும் x = a சமம். AB, BC, CA தொலைவுகளைக் காண்போம்.',
          'AB = 5; BC = 3; CA = 2',
          '\\begin{aligned}AB&=\\sqrt{(a-a)^2+(3-(-2))^2}=5\\\\BC&=\\sqrt{(a-a)^2+(0-3)^2}=3\\\\CA&=\\sqrt{(a-a)^2+(-2-0)^2}=2\\end{aligned}'
        ),
        step(
          'Since BC + CA = 3 + 2 = 5 = AB, C lies between A and B on x = a. Thus the points in (ii) are also collinear.',
          'BC + CA = 3 + 2 = 5 = AB என்பதால், (ii) ஒரு கோடமையும் புள்ளிகள்.',
          'BC + CA = AB ⇒ Collinear',
          'BC + CA = 3 + 2 = 5 = AB \\implies \\text{Collinear}'
        )
      ],
      '(i) Collinear; (ii) Collinear',
      '(i) ஒரு கோடமையும்; (ii) ஒரு கோடமையும்',
      '\\text{(i) Collinear; (ii) Collinear}',
      { enPdf: 208, taPdf: 221, enPrint: 202, taPrint: 215, ansLatexTa: '\\text{(i) ஒரு கோடமையும்; (ii) ஒரு கோடமையும்}' }
    ),

    makeEntry(
      3,
      'Verify two isosceles triangles',
      'இரு சமபக்க முக்கோணத்தை நிறுவுதல்',
      '3. Show that the following points taken in order form an isosceles triangle.\n(i) A(5, 4), B(2, 0), C(−2, 3)   (ii) A(6, −4), B(−2, −4), C(2, 10)',
      '3. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஓர் இரு சமபக்க முக்கோணத்தை அமைக்கும் என நிறுவுக.\n(i) A(5, 4), B(2, 0), C(−2, 3)   (ii) A(6, −4), B(−2, −4), C(2, 10)',
      ['3. Show that the following points taken in order form an isosceles triangle.\n(i) ', tex('A(5,4), B(2,0), C(-2,3)', 'A(5, 4), B(2, 0), C(−2, 3)'), '   (ii) ', tex('A(6,-4), B(-2,-4), C(2,10)', 'A(6, −4), B(−2, −4), C(2, 10)')],
      ['3. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஓர் இரு சமபக்க முக்கோணத்தை அமைக்கும் என நிறுவுக.\n(i) ', tex('A(5,4), B(2,0), C(-2,3)', 'A(5, 4), B(2, 0), C(−2, 3)'), '   (ii) ', tex('A(6,-4), B(-2,-4), C(2,10)', 'A(6, −4), B(−2, −4), C(2, 10)')],
      [
        step(
          'A triangle is isosceles if at least two sides have equal length (and the points are not collinear).',
          'ஒரு முக்கோணத்தின் ஏதேனும் இரு பக்கங்கள் சம நீளமுள்ளவையாக (மற்றும் ஒரு கோடமையாதவையாக) இருந்தால் அது இரு சமபக்க முக்கோணம் ஆகும்.',
          'AB² = (x₂−x₁)² + (y₂−y₁)²',
          'd = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}'
        ),
        step(
          '(i) Compute AB, BC, and CA for A(5, 4), B(2, 0), C(−2, 3).',
          '(i) A(5, 4), B(2, 0), C(−2, 3) புள்ளிகளுக்கு AB, BC, CA தொலைவுகளைக் காண்போம்.',
          'AB = 5, BC = 5, CA = 5√2',
          '\\begin{aligned}AB&=\\sqrt{(2-5)^2+(0-4)^2}=\\sqrt{9+16}=5\\\\BC&=\\sqrt{(-2-2)^2+(3-0)^2}=\\sqrt{16+9}=5\\\\CA&=\\sqrt{(5-(-2))^2+(4-3)^2}=\\sqrt{49+1}=\\sqrt{50}=5\\sqrt{2}\\end{aligned}'
        ),
        step(
          'Since AB = BC = 5 and AB + BC = 10 > 5√2 = CA, the points form an isosceles triangle.',
          'AB = BC = 5 மற்றும் AB + BC > CA என்பதால், இவை ஓர் இரு சமபக்க முக்கோணத்தை அமைக்கின்றன.',
          'AB = BC = 5 ⇒ Isosceles triangle',
          'AB = BC = 5 \\implies \\text{Isosceles triangle}'
        ),
        step(
          '(ii) Compute AB, BC, and CA for A(6, −4), B(−2, −4), C(2, 10).',
          '(ii) A(6, −4), B(−2, −4), C(2, 10) புள்ளிகளுக்கு AB, BC, CA தொலைவுகளைக் காண்போம்.',
          'AB = 8, BC = √212, CA = √212',
          '\\begin{aligned}AB&=\\sqrt{(-2-6)^2+(-4-(-4))^2}=\\sqrt{64+0}=8\\\\BC&=\\sqrt{(2-(-2))^2+(10-(-4))^2}=\\sqrt{16+196}=\\sqrt{212}=2\\sqrt{53}\\\\CA&=\\sqrt{(6-2)^2+(-4-10)^2}=\\sqrt{16+196}=\\sqrt{212}=2\\sqrt{53}\\end{aligned}'
        ),
        step(
          'Since BC = CA = 2√53, the second set of points also forms an isosceles triangle.',
          'BC = CA = 2√53 என்பதால், இரண்டாவது புள்ளிகளும் ஓர் இரு சமபக்க முக்கோணத்தை அமைக்கின்றன.',
          'BC = CA = 2√53 ⇒ Isosceles triangle',
          'BC = CA = 2\\sqrt{53} \\implies \\text{Isosceles triangle}'
        )
      ],
      '(i) Isosceles (AB = BC = 5); (ii) Isosceles (BC = CA = 2√53)',
      '(i) இரு சமபக்க முக்கோணம் (AB = BC = 5); (ii) இரு சமபக்க முக்கோணம் (BC = CA = 2√53)',
      '\\text{(i) }AB=BC=5;\\quad \\text{(ii) }BC=CA=2\\sqrt{53}',
      { enPdf: 208, taPdf: 222, enPrint: 202, taPrint: 216 }
    ),

    makeEntry(
      4,
      'Verify equilateral triangles',
      'சமபக்க முக்கோணத்தை நிறுவுதல்',
      '4. Show that the following points taken in order form an equilateral triangle in each case.\n(i) A(2, 2), B(−2, −2), C(−2√3, 2√3)   (ii) A(√3, 2), B(0, 1), C(0, 3)',
      '4. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஒரு சமபக்க முக்கோணத்தை அமைக்கும் என நிறுவுக.\n(i) A(2, 2), B(−2, −2), C(−2√3, 2√3)   (ii) A(√3, 2), B(0, 1), C(0, 3)',
      ['4. Show that the following points taken in order form an equilateral triangle in each case.\n(i) ', tex('A(2,2),\\;B(-2,-2),\\;C(-2\\sqrt{3},2\\sqrt{3})', 'A(2, 2), B(−2, −2), C(−2√3, 2√3)'), '   (ii) ', tex('A(\\sqrt{3},2),\\;B(0,1),\\;C(0,3)', 'A(√3, 2), B(0, 1), C(0, 3)')],
      ['4. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஒரு சமபக்க முக்கோணத்தை அமைக்கும் என நிறுவுக.\n(i) ', tex('A(2,2),\\;B(-2,-2),\\;C(-2\\sqrt{3},2\\sqrt{3})', 'A(2, 2), B(−2, −2), C(−2√3, 2√3)'), '   (ii) ', tex('A(\\sqrt{3},2),\\;B(0,1),\\;C(0,3)', 'A(√3, 2), B(0, 1), C(0, 3)')],
      [
        step(
          '(i) Find AB, BC, and CA for A(2, 2), B(−2, −2), C(−2√3, 2√3). Note that (2 + 2√3)² + (2 − 2√3)² = (4 + 8√3 + 12) + (4 − 8√3 + 12) = 32.',
          '(i) A(2, 2), B(−2, −2), C(−2√3, 2√3) புள்ளிகளுக்கு AB, BC, CA காண்போம். (2 + 2√3)² + (2 − 2√3)² = 16 + 16 = 32.',
          'AB = BC = CA = √32 = 4√2',
          '\\begin{aligned}AB&=\\sqrt{(-2-2)^2+(-2-2)^2}=\\sqrt{16+16}=4\\sqrt{2}\\\\BC&=\\sqrt{(-2\\sqrt{3}+2)^2+(2\\sqrt{3}+2)^2}=\\sqrt{16+16}=4\\sqrt{2}\\\\CA&=\\sqrt{(2+2\\sqrt{3})^2+(2-2\\sqrt{3})^2}=\\sqrt{16+16}=4\\sqrt{2}\\end{aligned}'
        ),
        step(
          'Since AB = BC = CA = 4√2, the triangle in (i) is equilateral.',
          'AB = BC = CA = 4√2 என்பதால், (i) ஒரு சமபக்க முக்கோணம் ஆகும்.',
          'AB = BC = CA ⇒ Equilateral',
          'AB = BC = CA = 4\\sqrt{2} \\implies \\text{Equilateral triangle}'
        ),
        step(
          '(ii) Find AB, BC, and CA for A(√3, 2), B(0, 1), C(0, 3).',
          '(ii) A(√3, 2), B(0, 1), C(0, 3) புள்ளிகளுக்கு AB, BC, CA காண்போம்.',
          'AB = 2, BC = 2, CA = 2',
          '\\begin{aligned}AB&=\\sqrt{(0-\\sqrt{3})^2+(1-2)^2}=\\sqrt{3+1}=2\\\\BC&=\\sqrt{(0-0)^2+(3-1)^2}=\\sqrt{0+4}=2\\\\CA&=\\sqrt{(\\sqrt{3}-0)^2+(2-3)^2}=\\sqrt{3+1}=2\\end{aligned}'
        ),
        step(
          'Since AB = BC = CA = 2, the triangle in (ii) is also equilateral.',
          'AB = BC = CA = 2 என்பதால், (ii) ஒரு சமபக்க முக்கோணம் ஆகும்.',
          'AB = BC = CA = 2 ⇒ Equilateral',
          'AB = BC = CA = 2 \\implies \\text{Equilateral triangle}'
        )
      ],
      '(i) Equilateral (side 4√2); (ii) Equilateral (side 2)',
      '(i) சமபக்க முக்கோணம் (பக்கம் 4√2); (ii) சமபக்க முக்கோணம் (பக்கம் 2)',
      '\\text{(i) }AB=BC=CA=4\\sqrt{2};\\quad \\text{(ii) }AB=BC=CA=2'
    ),

    makeEntry(
      5,
      'Verify vertices of a parallelogram',
      'இணைகரத்தின் உச்சிகளை நிறுவுதல்',
      '5. Show that the following points taken in order form the vertices of a parallelogram.\n(i) A(−3, 1), B(−6, −7), C(3, −9), D(6, −1)   (ii) A(−7, −3), B(5, 10), C(15, 8), D(3, −5)',
      '5. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஓர் இணைகரத்தை அமைக்கும் என நிறுவுக.\n(i) A(−3, 1), B(−6, −7), C(3, −9), D(6, −1)   (ii) A(−7, −3), B(5, 10), C(15, 8), D(3, −5)',
      ['5. Show that the following points taken in order form the vertices of a parallelogram.\n(i) ', tex('A(-3,1), B(-6,-7), C(3,-9), D(6,-1)', 'A(−3, 1), B(−6, −7), C(3, −9), D(6, −1)'), '   (ii) ', tex('A(-7,-3), B(5,10), C(15,8), D(3,-5)', 'A(−7, −3), B(5, 10), C(15, 8), D(3, −5)')],
      ['5. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஓர் இணைகரத்தை அமைக்கும் என நிறுவுக.\n(i) ', tex('A(-3,1), B(-6,-7), C(3,-9), D(6,-1)', 'A(−3, 1), B(−6, −7), C(3, −9), D(6, −1)'), '   (ii) ', tex('A(-7,-3), B(5,10), C(15,8), D(3,-5)', 'A(−7, −3), B(5, 10), C(15, 8), D(3, −5)')],
      [
        step(
          'Use the Class 9 distance formula. In a parallelogram ABCD, both pairs of opposite sides are equal: AB = CD and BC = DA.',
          'தொலைவு வாய்ப்பாட்டைப் பயன்படுத்துவோம். ஒரு நாற்கரம் ABCD இணைகரமாக இருக்க, அதன் எதிர்ப்பக்கங்கள் சமமாக இருக்க வேண்டும்: AB = CD மற்றும் BC = DA.',
          'AB = CD and BC = DA',
          'AB = CD \\quad\\text{and}\\quad BC = DA'
        ),
        step(
          '(i) Compute the four side lengths of A(−3,1), B(−6,−7), C(3,−9), D(6,−1).',
          '(i) A(−3,1), B(−6,−7), C(3,−9), D(6,−1) ஆகியவற்றின் நான்கு பக்க நீளங்களைக் காண்போம்.',
          'AB = CD = √73; BC = DA = √85',
          '\\begin{aligned}AB&=\\sqrt{(-3)^2+(-8)^2}=\\sqrt{73},&\\quad CD&=\\sqrt{3^2+8^2}=\\sqrt{73}\\\\BC&=\\sqrt{9^2+(-2)^2}=\\sqrt{85},&\\quad DA&=\\sqrt{(-9)^2+2^2}=\\sqrt{85}\\end{aligned}'
        ),
        step(
          'Since AB = CD = √73 and BC = DA = √85, (i) forms a parallelogram.',
          'AB = CD = √73 மற்றும் BC = DA = √85 என்பதால் (i) ஓர் இணைகரம்.',
          'AB = CD, BC = DA ⇒ Parallelogram',
          'AB=CD,\\; BC=DA \\implies \\text{Parallelogram}'
        ),
        step(
          '(ii) Compute the four side lengths of A(−7,−3), B(5,10), C(15,8), D(3,−5).',
          '(ii) A(−7,−3), B(5,10), C(15,8), D(3,−5) ஆகியவற்றின் நான்கு பக்க நீளங்களைக் காண்போம்.',
          'AB = CD = √313; BC = DA = √104 = 2√26',
          '\\begin{aligned}AB&=\\sqrt{12^2+13^2}=\\sqrt{313},&\\quad CD&=\\sqrt{(-12)^2+(-13)^2}=\\sqrt{313}\\\\BC&=\\sqrt{10^2+(-2)^2}=\\sqrt{104},&\\quad DA&=\\sqrt{(-10)^2+2^2}=\\sqrt{104}\\end{aligned}'
        ),
        step(
          'Since AB = CD = √313 and BC = DA = √104, (ii) also forms a parallelogram.',
          'AB = CD = √313 மற்றும் BC = DA = √104 என்பதால் (ii) ஓர் இணைகரம்.',
          'AB = CD, BC = DA ⇒ Parallelogram',
          'AB=CD,\\; BC=DA \\implies \\text{Parallelogram}'
        )
      ],
      '(i) Parallelogram; (ii) Parallelogram',
      '(i) இணைகரம்; (ii) இணைகரம்',
      '\\text{(i) Parallelogram; (ii) Parallelogram}',
      { ansLatexTa: '\\text{(i) இணைகரம்; (ii) இணைகரம்}' }
    ),

    makeEntry(
      6,
      'Verify vertices of a rhombus',
      'சாய்சதுரத்தின் உச்சிகளை ஆராய்தல்',
      '6. Verify that the following points taken in order form the vertices of a rhombus.\n(i) A(3, −2), B(7, 6), C(−1, 2), D(−5, −6)   (ii) A(1, 1), B(2, 1), C(2, 2), D(1, 2)',
      '6. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஒரு சாய்சதுரத்தை அமைக்குமா என ஆராய்க.\n(i) A(3, −2), B(7, 6), C(−1, 2), D(−5, −6)   (ii) A(1, 1), B(2, 1), C(2, 2), D(1, 2)',
      ['6. Verify that the following points taken in order form the vertices of a rhombus.\n(i) ', tex('A(3,-2), B(7,6), C(-1,2), D(-5,-6)', 'A(3, −2), B(7, 6), C(−1, 2), D(−5, −6)'), '   (ii) ', tex('A(1, 1), B(2, 1), C(2, 2), D(1, 2)', 'A(1, 1), B(2, 1), C(2, 2), D(1, 2)')],
      ['6. பின்வரும் புள்ளிகள் வரிசைப்படி எடுத்துக்கொள்ளப்பட்டால், அது ஒரு சாய்சதுரத்தை அமைக்குமா என ஆராய்க.\n(i) ', tex('A(3,-2), B(7,6), C(-1,2), D(-5,-6)', 'A(3, −2), B(7, 6), C(−1, 2), D(−5, −6)'), '   (ii) ', tex('A(1, 1), B(2, 1), C(2, 2), D(1, 2)', 'A(1, 1), B(2, 1), C(2, 2), D(1, 2)')],
      [
        step(
          'A quadrilateral is a rhombus if all four sides are equal: AB = BC = CD = DA.',
          'ஒரு நாற்கரத்தின் நான்கு பக்கங்களும் சமமாக (AB = BC = CD = DA) இருந்தால் அது சாய்சதுரம் ஆகும்.',
          'AB = BC = CD = DA',
          'AB = BC = CD = DA'
        ),
        step(
          '(i) Compute all four sides of A(3,−2), B(7,6), C(−1,2), D(−5,−6).',
          '(i) A(3,−2), B(7,6), C(−1,2), D(−5,−6) ஆகியவற்றின் நான்கு பக்கங்களைக் காண்போம்.',
          'AB = BC = CD = DA = √80 = 4√5',
          '\\begin{aligned}AB&=\\sqrt{4^2+8^2}=\\sqrt{80}=4\\sqrt{5},&\\quad BC&=\\sqrt{(-8)^2+(-4)^2}=4\\sqrt{5}\\\\CD&=\\sqrt{(-4)^2+(-8)^2}=4\\sqrt{5},&\\quad DA&=\\sqrt{8^2+4^2}=4\\sqrt{5}\\end{aligned}'
        ),
        step(
          'Check diagonals: AC = √32 = 4√2 and BD = √288 = 12√2 (AC ≠ BD), so (i) is a rhombus (not a square).',
          'மூலைவிட்டங்கள் AC = 4√2, BD = 12√2 (AC ≠ BD); எனவே (i) ஒரு சாய்சதுரம் (சதுரம் அல்ல).',
          'All sides = 4√5, AC ≠ BD ⇒ Rhombus',
          'AB=BC=CD=DA=4\\sqrt{5},\\; AC\\ne BD \\implies \\text{Rhombus}'
        ),
        step(
          '(ii) For A(1,1), B(2,1), C(2,2), D(1,2): all four sides equal 1, and diagonals AC = BD = √2 (with AB ⊥ BC), so it is a square (every square is also a rhombus).',
          '(ii) A(1,1), B(2,1), C(2,2), D(1,2): நான்கு பக்கங்களும் 1 அலகு; மூலைவிட்டங்கள் AC = BD = √2 (AB ⊥ BC). ஆகவே இது ஒரு சதுரம் — ஒவ்வொரு சதுரமும் ஒரு சாய்சதுரமே.',
          'All sides = 1, AC = BD = √2 ⇒ Rhombus (a square)',
          'AB=BC=CD=DA=1,\\; AC=BD=\\sqrt{2} \\implies \\text{Rhombus (square)}'
        )
      ],
      '(i) Rhombus, side 4√5; (ii) Rhombus (a square), side 1',
      '(i) சாய்சதுரம், பக்கம் 4√5; (ii) சாய்சதுரம் (சதுரம்), பக்கம் 1',
      '\\text{(i) Rhombus } (4\\sqrt{5});\\quad \\text{(ii) Rhombus / square } (1)'
    ),

    makeEntry(
      7,
      'Find a when AB = BC',
      'AB = BC எனில் a-இன் மதிப்பு காணுதல்',
      '7. A(−1, 1), B(1, 3) and C(3, a) are points and if AB = BC, then find ‘a’.',
      '7. புள்ளிகள் A(−1, 1), B(1, 3) மற்றும் C(3, a), மேலும் AB = BC எனில் ‘a’ இன் மதிப்பைக் காண்க.',
      ['7. ', tex('A(-1, 1), B(1, 3), C(3, a)', 'A(−1, 1), B(1, 3) and C(3, a)'), ' are points and if ', tex('AB = BC', 'AB = BC'), ', then find ‘a’.'],
      ['7. புள்ளிகள் ', tex('A(-1, 1), B(1, 3)', 'A(−1, 1), B(1, 3)'), ' மற்றும் ', tex('C(3, a)', 'C(3, a)'), ', மேலும் ', tex('AB = BC', 'AB = BC'), ' எனில் ‘a’ இன் மதிப்பைக் காண்க.'],
      [
        step(
          'Since AB = BC, their squares are also equal: AB² = BC².',
          'AB = BC என்பதால், அவற்றின் வர்க்கங்களும் சமம்: AB² = BC².',
          'AB² = BC²',
          'AB^2 = BC^2'
        ),
        step(
          'Substitute A(−1, 1), B(1, 3), C(3, a) into the squared distance formula.',
          'தொலைவு வாய்ப்பாட்டின் வர்க்கத்தில் A(−1, 1), B(1, 3), C(3, a) ஆகியவற்றைப் பிரதியிடுவோம்.',
          '(1−(−1))² + (3−1)² = (3−1)² + (a−3)² ⇒ 8 = 4 + (a−3)²',
          '\\begin{aligned}(1-(-1))^2+(3-1)^2 &= (3-1)^2+(a-3)^2\\\\4+4 &= 4+(a-3)^2\\\\(a-3)^2 &= 4\\end{aligned}'
        ),
        step(
          'Take the square root of both sides: a − 3 = ±2, which gives two values a = 5 or a = 1.',
          'இருபுறமும் வர்க்கமூலம் எடுக்க: a − 3 = ±2 ⇒ a = 5 அல்லது a = 1.',
          'a − 3 = ±2 ⇒ a = 5 or a = 1',
          'a-3 = \\pm 2 \\implies a = 5 \\text{ or } a = 1'
        )
      ],
      '5 or 1',
      '5 அல்லது 1',
      'a = 5 \\text{ or } 1',
      { ansLatexTa: 'a = 5 \\text{ அல்லது } 1' }
    ),

    makeEntry(
      8,
      'Point with equal abscissa and ordinate at distance 10',
      'கிடை மற்றும் செங்குத்து அச்சுத்தொலைவு சமமான புள்ளி',
      '8. The abscissa of a point A is equal to its ordinate, and its distance from the point B(1, 3) is 10 units, What are the coordinates of A?',
      '8. புள்ளி A இன் x அச்சுத் தொலைவு அதன் y அச்சுத் தொலைவிற்குச் சமம். மேலும், B(1, 3) என்ற புள்ளியிலிருந்து அப்புள்ளி A ஆனது 10 அலகு தொலைவில் இருக்கிறது. எனில் A இன் அச்சுத் தொலைவுகளைக் காண்க.',
      ['8. The abscissa of a point A is equal to its ordinate, and its distance from the point ', tex('B(1, 3)', 'B(1, 3)'), ' is 10 units, What are the coordinates of A?'],
      ['8. புள்ளி A இன் x அச்சுத் தொலைவு அதன் y அச்சுத் தொலைவிற்குச் சமம். மேலும், ', tex('B(1, 3)', 'B(1, 3)'), ' என்ற புள்ளியிலிருந்து அப்புள்ளி A ஆனது 10 அலகு தொலைவில் இருக்கிறது. எனில் A இன் அச்சுத் தொலைவுகளைக் காண்க.'],
      [
        step(
          'Let A = (x, x) because its abscissa equals its ordinate. Given AB = 10, so AB² = 100.',
          'A-இன் x மற்றும் y ஆயத்தொலைவுகள் சமம் என்பதால் A = (x, x) என்க. AB = 10 என்பதால் AB² = 100.',
          'A = (x, x), AB = 10 ⇒ AB² = 100',
          'A=(x,x),\\quad AB=10 \\implies AB^2=100'
        ),
        step(
          'Apply the distance formula between A(x, x) and B(1, 3) and simplify into a quadratic equation.',
          'A(x, x) மற்றும் B(1, 3) இடையே தொலைவு வாய்ப்பாட்டைப் பயன்படுத்தி இருபடிச் சமன்பாட்டைப் பெறுவோம்.',
          '(x−1)² + (x−3)² = 100 ⇒ 2x² − 8x − 90 = 0 ⇒ x² − 4x − 45 = 0',
          '\\begin{aligned}(x-1)^2+(x-3)^2&=100\\\\(x^2-2x+1)+(x^2-6x+9)&=100\\\\2x^2-8x-90&=0\\\\x^2-4x-45&=0\\end{aligned}'
        ),
        step(
          'Factorise (x − 9)(x + 5) = 0 to get x = 9 or x = −5. Check both: |(9,9)−(1,3)| = √(64+36) = 10 and |(−5,−5)−(1,3)| = √(36+64) = 10.',
          '(x − 9)(x + 5) = 0 எனக் காரணிப்படுத்த x = 9 அல்லது x = −5 கிடைக்கும். இரு புள்ளிகளும் (1, 3)-லிருந்து 10 அலகு தொலைவில் உள்ளன.',
          '(x−9)(x+5) = 0 ⇒ A = (9, 9) or (−5, −5)',
          '(x-9)(x+5)=0 \\implies x=9 \\text{ or } x=-5 \\implies A=(9,9)\\text{ or }(-5,-5)'
        )
      ],
      '(9, 9) or (−5, −5)',
      '(9, 9) அல்லது (−5, −5)',
      '(9,9)\\text{ or }(-5,-5)',
      { ansLatexTa: '(9,9)\\text{ அல்லது }(-5,-5)' }
    ),

    makeEntry(
      9,
      'Equidistant locus relation between x and y',
      'சம தொலைவில் உள்ள புள்ளியின் x, y உறவு',
      '9. The point (x, y) is equidistant from the points (3, 4) and (−5, 6). Find a relation between x and y.',
      '9. புள்ளி (x, y) ஆனது புள்ளிகள் (3, 4) மற்றும் (−5, 6) என்ற புள்ளிகளிலிருந்து சம தொலைவில் இருக்கிறது. x மற்றும் y இக்கு இடையே உள்ள உறவைக் காண்க.',
      ['9. The point ', tex('(x, y)', '(x, y)'), ' is equidistant from the points ', tex('(3, 4)', '(3, 4)'), ' and ', tex('(-5, 6)', '(−5, 6)'), '. Find a relation between x and y.'],
      ['9. புள்ளி ', tex('(x, y)', '(x, y)'), ' ஆனது புள்ளிகள் ', tex('(3, 4)', '(3, 4)'), ' மற்றும் ', tex('(-5, 6)', '(−5, 6)'), ' என்ற புள்ளிகளிலிருந்து சம தொலைவில் இருக்கிறது. x மற்றும் y இக்கு இடையே உள்ள உறவைக் காண்க.'],
      [
        step(
          'Let P(x, y), A(3, 4), and B(−5, 6). Since P is equidistant from A and B, PA = PB, so PA² = PB².',
          'P(x, y), A(3, 4), B(−5, 6) என்க. P சம தொலைவில் உள்ளதால் PA = PB ⇒ PA² = PB².',
          'PA² = PB²',
          'PA^2 = PB^2'
        ),
        step(
          'Substitute into the distance formula and expand both sides.',
          'தொலைவு வாய்ப்பாட்டில் பிரதியிட்டு இருபுறமும் விரிப்போம்.',
          '(x−3)² + (y−4)² = (x+5)² + (y−6)²',
          '\\begin{aligned}(x-3)^2+(y-4)^2 &= (x+5)^2+(y-6)^2\\\\x^2-6x+9+y^2-8y+16 &= x^2+10x+25+y^2-12y+36\\end{aligned}'
        ),
        step(
          'Cancel x² + y² from both sides and simplify: −16x + 4y = 36 ⇒ 4x − y + 9 = 0 ⇒ y = 4x + 9.',
          'இருபுறமும் உள்ள x² + y²-ஐ நீக்கிச் சுருக்க: −16x + 4y = 36 ⇒ y = 4x + 9.',
          '−16x + 4y = 36 ⇒ y = 4x + 9',
          '-16x + 4y = 36 \\implies 4y = 16x + 36 \\implies y = 4x + 9'
        )
      ],
      'y = 4x + 9',
      'y = 4x + 9',
      'y = 4x + 9'
    ),

    makeEntry(
      10,
      'Point P on x-axis with AP = (3/7) AB',
      'x-அச்சின் மீது AP = (3/7) AB என்ற புள்ளி P',
      '10. Let A(2, 3) and B(2, −4) be two points. If P lies on the x-axis, such that AP = (3/7) AB, find the coordinates of P.',
      '10. புள்ளிகள் A(2, 3) மற்றும் B(2, −4) என்க. x அச்சின் மீது அமைந்துள்ள புள்ளி P ஆனது AP = (3/7) AB என்ற வகையில் அமைந்துள்ளது எனில், புள்ளி P இன் அச்சுத் தொலைவைக் காண்க.',
      ['10. Let ', tex('A(2, 3)', 'A(2, 3)'), ' and ', tex('B(2, -4)', 'B(2, −4)'), ' be two points. If P lies on the x-axis, such that ', tex('AP = \\dfrac{3}{7}AB', 'AP = (3/7) AB'), ', find the coordinates of P.'],
      ['10. புள்ளிகள் ', tex('A(2, 3)', 'A(2, 3)'), ' மற்றும் ', tex('B(2, -4)', 'B(2, −4)'), ' என்க. x அச்சின் மீது அமைந்துள்ள புள்ளி P ஆனது ', tex('AP = \\dfrac{3}{7}AB', 'AP = (3/7) AB'), ' என்ற வகையில் அமைந்துள்ளது எனில், புள்ளி P இன் அச்சுத் தொலைவைக் காண்க.'],
      [
        step(
          'Since P lies on the x-axis, its y-coordinate is 0, so let P = (x, 0).',
          'புள்ளி P ஆனது x-அச்சின் மீது உள்ளதால் அதன் y-ஆயத்தொலைவு 0; எனவே P = (x, 0) என்க.',
          'P = (x, 0)',
          'P = (x, 0)'
        ),
        step(
          'Find AB using the distance formula: both A(2, 3) and B(2, −4) have x = 2, so AB = 7 units.',
          'A(2, 3) மற்றும் B(2, −4) ஆகிய இரு புள்ளிகளிலும் x = 2 என்பதால் AB = 7 அலகுகள்.',
          'AB = √((2−2)² + (−4−3)²) = 7',
          'AB = \\sqrt{(2-2)^2+(-4-3)^2} = \\sqrt{49} = 7'
        ),
        step(
          'Given AP = (3/7) AB = (3/7)(7) = 3. Use the distance formula for AP² = 9.',
          'கொடுக்கப்பட்டது AP = (3/7) AB = (3/7)(7) = 3. AP² = 9 எனப் பிரதியிடுவோம்.',
          '(x−2)² + (0−3)² = 9 ⇒ (x−2)² + 9 = 9 ⇒ (x−2)² = 0 ⇒ x = 2',
          '\\begin{aligned}AP &= \\dfrac{3}{7}\\times 7 = 3\\\\(x-2)^2+(0-3)^2 &= 3^2 = 9\\\\(x-2)^2 &= 0 \\implies x = 2\\end{aligned}'
        )
      ],
      'P(2, 0)',
      'P(2, 0)',
      'P(2, 0)'
    ),

    makeEntry(
      11,
      'Verify circle centre with equal radii',
      'வட்டத்தின் மையத்தை நிறுவுதல்',
      '11. Show that the point (11, 2) is the centre of the circle passing through the points (1, 2), (3, −4) and (5, −6).',
      '11. புள்ளிகள் (1, 2), (3, −4) மற்றும் (5, −6) இன் வழிச் செல்லும் வட்டத்தின் மையம் (11, 2) என நிறுவுக.',
      ['11. Show that the point ', tex('(11, 2)', '(11, 2)'), ' is the centre of the circle passing through the points ', tex('(1, 2), (3, -4)', '(1, 2), (3, −4)'), ' and ', tex('(5, -6)', '(5, −6)'), '.'],
      ['11. புள்ளிகள் ', tex('(1, 2), (3, -4)', '(1, 2), (3, −4)'), ' மற்றும் ', tex('(5, -6)', '(5, −6)'), ' இன் வழிச் செல்லும் வட்டத்தின் மையம் ', tex('(11, 2)', '(11, 2)'), ' என நிறுவுக.'],
      [
        step(
          'Let C(11, 2) be the proposed centre and P(1, 2), Q(3, −4), R(5, −6) be the three points. C is the centre if CP = CQ = CR (all equal to the radius).',
          'C(11, 2), P(1, 2), Q(3, −4), R(5, −6) என்க. CP = CQ = CR (ஆரம்) எனக் காட்டினால் C வட்ட மையம் ஆகும்.',
          'Check CP = CQ = CR',
          '\\text{Verify } CP = CQ = CR'
        ),
        step(
          'Compute all three distances CP, CQ, and CR using the distance formula.',
          'தொலைவு வாய்ப்பாட்டால் CP, CQ, CR ஆகிய மூன்று தொலைவுகளையும் காண்போம்.',
          'CP = 10, CQ = 10, CR = 10',
          '\\begin{aligned}CP&=\\sqrt{(1-11)^2+(2-2)^2}=\\sqrt{100+0}=10\\\\CQ&=\\sqrt{(3-11)^2+(-4-2)^2}=\\sqrt{64+36}=\\sqrt{100}=10\\\\CR&=\\sqrt{(5-11)^2+(-6-2)^2}=\\sqrt{36+64}=\\sqrt{100}=10\\end{aligned}'
        ),
        step(
          'Since CP = CQ = CR = 10 units, (11, 2) is the centre of the circle of radius 10 units.',
          'CP = CQ = CR = 10 அலகுகள் என்பதால், (11, 2) என்பது 10 அலகு ஆரமுள்ள வட்டத்தின் மையமாகும்.',
          'CP = CQ = CR = 10 ⇒ Centre (11, 2), radius 10 units',
          'CP=CQ=CR=10 \\implies \\text{Centre }(11,2),\\; r=10\\text{ units}'
        )
      ],
      'Yes. Centre (11, 2), radius 10 units',
      'ஆம். மையம் (11, 2), ஆரம் 10 அலகுகள்',
      '\\text{Centre }(11,2),\\; r=10\\text{ units}'
    ),

    makeEntry(
      12,
      'Circle intersections with coordinate axes',
      'ஆய அச்சுகளை வெட்டும் வட்டப் புள்ளிகள்',
      '12. The radius of a circle with centre at origin is 30 units. Write the coordinates of the points where the circle intersects the axes. Find the distance between any two such points.',
      '12. ஆதிப் புள்ளியை மையமாக உடைய வட்டத்தின் ஆரம் 30 அலகுகள். அந்த வட்டம் ஆய அச்சுகளை வெட்டும் புள்ளிகளைக் காண்க. இவ்வாறான எந்த இரு புள்ளிகளுக்கும் இடையே உள்ள தொலைவைக் காண்க.',
      ['12. The radius of a circle with centre at origin is ', tex('30', '30'), ' units. Write the coordinates of the points where the circle intersects the axes. Find the distance between any two such points.'],
      ['12. ஆதிப் புள்ளியை மையமாக உடைய வட்டத்தின் ஆரம் ', tex('30', '30'), ' அலகுகள். அந்த வட்டம் ஆய அச்சுகளை வெட்டும் புள்ளிகளைக் காண்க. இவ்வாறான எந்த இரு புள்ளிகளுக்கும் இடையே உள்ள தொலைவைக் காண்க.'],
      [
        step(
          'A circle with centre O(0, 0) and radius 30 intersects the x-axis (y = 0) at (±30, 0) and the y-axis (x = 0) at (0, ±30).',
          'மையம் O(0, 0), ஆரம் 30 உடைய வட்டம் x-அச்சை (30, 0), (−30, 0) ஆகிய புள்ளிகளிலும், y-அச்சை (0, 30), (0, −30) ஆகிய புள்ளிகளிலும் வெட்டும்.',
          'Intersections: (30, 0), (−30, 0), (0, 30), (0, −30)',
          '\\text{Axis points: }(30,0),\\;(-30,0),\\;(0,30),\\;(0,-30)'
        ),
        step(
          'Distance between any two adjacent axis-intersection points (on different axes, e.g. (30, 0) and (0, 30)): √((0 − 30)² + (30 − 0)²) = √(900 + 900) = 30√2 units. (Opposite points on the same axis are a diameter 60 units apart.)',
          'அடுத்துள்ள இரு வெட்டுப் புள்ளிகளுக்கு (எ.கா. (30, 0) மற்றும் (0, 30)) இடையேயான தொலைவு: √((0 − 30)² + (30 − 0)²) = √1800 = 30√2 அலகுகள். (ஒரே அச்சின் எதிரெதிர் புள்ளிகளுக்கு இடைப்பட்ட தொலைவு விட்டம் = 60 அலகுகள்.)',
          'Adjacent distance = 30√2 units (opposite = 60 units)',
          'd_{\\text{adj}} = \\sqrt{(-30)^2+30^2} = \\sqrt{1800} = 30\\sqrt{2}\\text{ units}'
        )
      ],
      'Axes points: (30, 0), (−30, 0), (0, 30), (0, −30); distance between adjacent points = 30√2 units (opposite = 60 units)',
      'வெட்டுப் புள்ளிகள்: (30, 0), (−30, 0), (0, 30), (0, −30); அடுத்துள்ள இரு புள்ளிகளின் தொலைவு = 30√2 அலகுகள் (எதிரெதிர் = 60 அலகுகள்)',
      '(30,0),(-30,0),(0,30),(0,-30);\\quad d = 30\\sqrt{2}\\text{ units}'
    )
  ];

  const overrides = (window.TriggleG9Ch5Overrides = window.TriggleG9Ch5Overrides || new Map());
  const existingIds = new Set(grade.items.map(q => q.id));
  for (const item of all52) {
    if (existingIds.has(item.id)) {
      overrides.set(item.id, item);
    } else {
      grade.items.push(item);
      if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
    }
  }

  if (window.TriggleG9Math && typeof window.TriggleG9Math.get === 'function') {
    const origG9Math = window.TriggleG9Math;
    window.TriggleG9Math = Object.freeze({
      ...origG9Math,
      get: item => (item?.preferItemMath ? undefined : origG9Math.get(item))
    });
  }
})();
