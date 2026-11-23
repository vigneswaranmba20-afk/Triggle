/* 2025 revised TN SCERT Grade 9 Coordinate Geometry, Exercise 5.1 (Q1–Q4, 9 marked slots).
 * Bilingual English & Tamil — page-visual-checked against 2025 EN (pp.192-193 / PDF 198-199) & TA (pp.205-206 / PDF 211-212).
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

  const entries = [
    {
      id: 'g9-ch5-ex5.1-q1',
      classNum: 9,
      chapter: '5',
      exercise: '5.1',
      kind: 'textbook',
      edition: '2025',
      preferItemMath: true,
      releaseStatus: 'bilingual-2025-source-checked',
      translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
      topic: { en: 'Coordinate Geometry · Quadrants', ta: 'ஆயத்தொலை வடிவியல் · காற்பகுதிகள்' },
      label: { en: 'Exercise 5.1 · Q1', ta: 'பயிற்சி 5.1 · வினா 1' },
      title: { en: 'Plot points and identify quadrants', ta: 'புள்ளிகளைக் குறித்து காற்பகுதிகளைக் கண்டறிதல்' },
      figureSrc: 'assets/grade9-ch5/ex5-1-q1.svg',
      figureAlt: {
        en: 'Cartesian coordinate plane showing points P(-7,6), Q(7,-2), R(-6,-7), S(3,5) and T(3,9) in their quadrants',
        ta: 'கார்ட்டீசியன் தளத்தில் P(-7,6), Q(7,-2), R(-6,-7), S(3,5), T(3,9) ஆகிய புள்ளிகள் குறிக்கப்பட்ட வரைபடம்'
      },
      figureCaption: {
        en: 'Original coordinate plot of P, Q, R, S and T across Quadrants I–IV',
        ta: 'காற்பகுதிகள் I–IV இல் P, Q, R, S, T புள்ளிகளின் வரைபடம்'
      },
      q: {
        en: '1. Plot the following points in the coordinate system and identify the quadrants\nP(−7, 6), Q(7, −2), R(−6, −7), S(3, 5) and T(3, 9)',
        ta: '1. பின்வரும் புள்ளிகளை ஆய அச்சு வடிவத்தில் குறித்து அது எந்தக் காற்பகுதியில் அமைகிறது எனக் காண்க.\nP(−7, 6), Q(7, −2), R(−6, −7), S(3, 5) மற்றும் T(3, 9)'
      },
      questionMath: {
        en: [
          '1. Plot the following points in the coordinate system and identify the quadrants\n',
          tex('P(-7,6),\\; Q(7,-2),\\; R(-6,-7),\\; S(3,5)\\text{ and }T(3,9)', 'P(−7, 6), Q(7, −2), R(−6, −7), S(3, 5) and T(3, 9)')
        ],
        ta: [
          '1. பின்வரும் புள்ளிகளை ஆய அச்சு வடிவத்தில் குறித்து அது எந்தக் காற்பகுதியில் அமைகிறது எனக் காண்க.\n',
          tex('P(-7,6),\\; Q(7,-2),\\; R(-6,-7),\\; S(3,5)\\text{ மற்றும் }T(3,9)', 'P(−7, 6), Q(7, −2), R(−6, −7), S(3, 5) மற்றும் T(3, 9)')
        ]
      },
      steps: [
        step(
          'Recall the sign rules of the four quadrants: I is (+, +), II is (−, +), III is (−, −), and IV is (+, −), where the first number is the x-coordinate (abscissa) and the second is the y-coordinate (ordinate).',
          'நான்கு காற்பகுதிகளின் குறிகள்: I (+, +), II (−, +), III (−, −), IV (+, −). முதல் எண் x-ஆயத்தொலைவு (கிடை அச்சுத் தொலைவு); இரண்டாவது எண் y-ஆயத்தொலைவு (செங்குத்து அச்சுத் தொலைவு).',
          'I:(+,+), II:(−,+), III:(−,−), IV:(+,−)',
          '\\begin{aligned}\\text{I}:(+,+),\\quad \\text{II}:(-,+)\\\\\\text{III}:(-,-),\\quad \\text{IV}:(+,-)\\end{aligned}'
        ),
        step(
          'For P(−7, 6): x = −7 < 0 and y = 6 > 0 (left 7, up 6) → II Quadrant. For Q(7, −2): x = 7 > 0 and y = −2 < 0 (right 7, down 2) → IV Quadrant.',
          'P(−7, 6): x < 0, y > 0 (இடதுபுறம் 7, மேல் 6) → காற்பகுதி II. Q(7, −2): x > 0, y < 0 (வலதுபுறம் 7, கீழ் 2) → காற்பகுதி IV.',
          'P(-7,6) ∈ II; Q(7,-2) ∈ IV',
          '\\begin{aligned}P(-7,6)&\\rightarrow \\text{II Quadrant}\\\\Q(7,-2)&\\rightarrow \\text{IV Quadrant}\\end{aligned}'
        ),
        step(
          'For R(−6, −7): both coordinates are negative (x < 0, y < 0) → III Quadrant. For S(3, 5) and T(3, 9): both coordinates are positive (x > 0, y > 0) → I Quadrant.',
          'R(−6, −7): இரு ஆயத்தொலைவுகளும் குறை (x < 0, y < 0) → காற்பகுதி III. S(3, 5), T(3, 9): இரு ஆயத்தொலைவுகளும் மிகை (x > 0, y > 0) → காற்பகுதி I.',
          'R(-6,-7) ∈ III; S(3,5), T(3,9) ∈ I',
          '\\begin{aligned}R(-6,-7)&\\rightarrow \\text{III Quadrant}\\\\S(3,5),\\; T(3,9)&\\rightarrow \\text{I Quadrant}\\end{aligned}'
        )
      ],
      answer: 'P(−7, 6) = II Quadrant; Q(7, −2) = IV Quadrant; R(−6, −7) = III Quadrant; S(3, 5) = I Quadrant; T(3, 9) = I Quadrant',
      answerTa: 'P(−7, 6) = காற்பகுதி II; Q(7, −2) = காற்பகுதி IV; R(−6, −7) = காற்பகுதி III; S(3, 5) = காற்பகுதி I; T(3, 9) = காற்பகுதி I',
      answerMath: {
        en: tex('\\begin{aligned}P(-7,6)&=\\text{II},\\; Q(7,-2)=\\text{IV}\\\\R(-6,-7)&=\\text{III},\\; S(3,5)=\\text{I},\\; T(3,9)=\\text{I}\\end{aligned}', 'P(−7, 6) = II Quadrant; Q(7, −2) = IV Quadrant; R(−6, −7) = III Quadrant; S(3, 5) = I Quadrant; T(3, 9) = I Quadrant', true),
        ta: tex('\\begin{aligned}P(-7,6)&=\\text{II},\\; Q(7,-2)=\\text{IV}\\\\R(-6,-7)&=\\text{III},\\; S(3,5)=\\text{I},\\; T(3,9)=\\text{I}\\end{aligned}', 'P(−7, 6) = காற்பகுதி II; Q(7, −2) = காற்பகுதி IV; R(−6, −7) = காற்பகுதி III; S(3, 5) = காற்பகுதி I; T(3, 9) = காற்பகுதி I', true)
      },
      sourceFidelity: {
        status: 'page-visual-checked',
        sourcePdfPage: { en: 198, ta: 211 },
        sourcePrintedPage: { en: 192, ta: 205 },
        answerKeyPdfPage: { en: 321, ta: 337 }
      }
    },
    {
      id: 'g9-ch5-ex5.1-q2',
      classNum: 9,
      chapter: '5',
      exercise: '5.1',
      kind: 'textbook',
      edition: '2025',
      preferItemMath: true,
      releaseStatus: 'bilingual-2025-source-checked',
      translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
      topic: { en: 'Coordinate Geometry · Abscissa & Ordinate', ta: 'ஆயத்தொலை வடிவியல் · கிடை & செங்குத்து அச்சுத் தொலைவுகள்' },
      label: { en: 'Exercise 5.1 · Q2', ta: 'பயிற்சி 5.1 · வினா 2' },
      title: { en: 'Read abscissa and ordinate from Fig. 5.11', ta: 'படம் 5.11-இலிருந்து ஆயத்தொலைவுகளைக் காணுதல்' },
      figureSrc: 'assets/grade9-ch5/ex5-1-q2-fig5-11.svg',
      figureAlt: {
        en: 'Original coordinate grid reproducing Fig. 5.11 with points P(-4,4), Q(3,3), R(4,-2), and S(-5,-3)',
        ta: 'படம் 5.11-ஐப் பிரதிபலிக்கும் கார்ட்டீசியன் தளத்தில் P(-4,4), Q(3,3), R(4,-2), S(-5,-3) புள்ளிகள்'
      },
      figureCaption: {
        en: 'Original coordinate diagram for Fig. 5.11 showing P, Q, R and S',
        ta: 'படம் 5.11: P, Q, R, S புள்ளிகளைக் காட்டும் ஆய அச்சு வரைபடம்'
      },
      q: {
        en: '2. Write down the abscissa and ordinate of the following from fig 5.11.\n(i) P   (ii) Q   (iii) R   (iv) S',
        ta: '2. அருகில் உள்ள படம் 5.11 இல் தரப்பட்டுள்ள கார்ட்டீசியன் தளத்தில் இருந்து, பின்வரும் புள்ளிகளின் கிடை அச்சுத் தொலைவு மற்றும் செங்குத்து அச்சுத் தொலைவை எழுதுக.\n(i) P   (ii) Q   (iii) R   (iv) S'
      },
      questionMath: {
        en: ['2. Write down the abscissa and ordinate of the following from fig 5.11.\n(i) P   (ii) Q   (iii) R   (iv) S'],
        ta: ['2. அருகில் உள்ள படம் 5.11 இல் தரப்பட்டுள்ள கார்ட்டீசியன் தளத்தில் இருந்து, பின்வரும் புள்ளிகளின் கிடை அச்சுத் தொலைவு மற்றும் செங்குத்து அச்சுத் தொலைவை எழுதுக.\n(i) P   (ii) Q   (iii) R   (iv) S']
      },
      steps: [
        step(
          'To read a point (x, y) from the graph, move vertically to the X-axis to read the abscissa (x-coordinate) and horizontally to the Y-axis to read the ordinate (y-coordinate).',
          'வரைபடத்தில் ஒரு புள்ளி (x, y)-ஐப் படிக்க, X-அச்சை நோக்கிச் செங்குத்தாகச் சென்று கிடை அச்சுத் தொலைவையும் (x), Y-அச்சை நோக்கிக் கிடைமட்டமாகச் சென்று செங்குத்து அச்சுத் தொலைவையும் (y) காண்க.',
          'Point = (abscissa x, ordinate y)',
          '\\text{Point} = (x\\text{-abscissa},\\; y\\text{-ordinate})'
        ),
        step(
          '(i) From P, moving down meets X-axis at −4 and moving right meets Y-axis at 4 → P = (−4, 4) (abscissa −4, ordinate 4). (ii) From Q, X-axis is 3 and Y-axis is 3 → Q = (3, 3).',
          '(i) P-லிருந்து X-அச்சில் −4 மற்றும் Y-அச்சில் 4 கிடைக்கிறது → P = (−4, 4) (கிடை −4, செங்குத்து 4). (ii) Q-விற்கு X-அச்சில் 3 மற்றும் Y-அச்சில் 3 → Q = (3, 3).',
          '(i) P=(−4,4); (ii) Q=(3,3)',
          '\\begin{aligned}\\text{(i) }P&=(-4,4)\\;\\Rightarrow x=-4,\\;y=4\\\\\\text{(ii) }Q&=(3,3)\\;\\Rightarrow x=3,\\;y=3\\end{aligned}'
        ),
        step(
          '(iii) From R, X-axis is 4 and Y-axis is −2 → R = (4, −2). (iv) From S, X-axis is −5 and Y-axis is −3 → S = (−5, −3).',
          '(iii) R-லிருந்து X-அச்சில் 4 மற்றும் Y-அச்சில் −2 → R = (4, −2). (iv) S-லிருந்து X-அச்சில் −5 மற்றும் Y-அச்சில் −3 → S = (−5, −3).',
          '(iii) R=(4,−2); (iv) S=(−5,−3)',
          '\\begin{aligned}\\text{(iii) }R&=(4,-2)\\;\\Rightarrow x=4,\\;y=-2\\\\\\text{(iv) }S&=(-5,-3)\\;\\Rightarrow x=-5,\\;y=-3\\end{aligned}'
        )
      ],
      answer: '(i) P = (−4, 4); (ii) Q = (3, 3); (iii) R = (4, −2); (iv) S = (−5, −3)',
      answerTa: '(i) P = (−4, 4); (ii) Q = (3, 3); (iii) R = (4, −2); (iv) S = (−5, −3)',
      answerMath: tex('\\begin{aligned}\\text{(i) }P(-4,4),\\quad \\text{(ii) }Q(3,3)\\\\\\text{(iii) }R(4,-2),\\quad \\text{(iv) }S(-5,-3)\\end{aligned}', '(i) P = (−4, 4); (ii) Q = (3, 3); (iii) R = (4, −2); (iv) S = (−5, −3)', true),
      sourceFidelity: {
        status: 'page-visual-checked',
        sourcePdfPage: { en: 198, ta: 211 },
        sourcePrintedPage: { en: 192, ta: 205 },
        answerKeyPdfPage: { en: 321, ta: 337 }
      }
    },
    {
      id: 'g9-ch5-ex5.1-q3',
      classNum: 9,
      chapter: '5',
      exercise: '5.1',
      kind: 'textbook',
      edition: '2025',
      preferItemMath: true,
      releaseStatus: 'bilingual-2025-source-checked',
      translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
      topic: { en: 'Coordinate Geometry · Lines Parallel to Axes', ta: 'ஆயத்தொலை வடிவியல் · அச்சுகளுக்கு இணையான கோடுகள்' },
      label: { en: 'Exercise 5.1 · Q3', ta: 'பயிற்சி 5.1 · வினா 3' },
      title: { en: 'Plot points and identify resulting lines', ta: 'புள்ளிகளைக் குறித்து இணைத்து கிடைக்கும் கோட்டைக் காணுதல்' },
      figureSrc: 'assets/grade9-ch5/ex5-1-q3.svg',
      figureAlt: {
        en: 'Graph showing horizontal line y=3 through (-5,3), (-1,3), (0,3), (5,3) and vertical points on the y-axis',
        ta: '(-5,3), (-1,3), (0,3), (5,3) வழியே செல்லும் கிடைமட்டக் கோடும் y-அச்சின் மேல் உள்ள புள்ளிகளும்'
      },
      figureCaption: {
        en: 'Plot of (i) y = 3 (parallel to x-axis) and (ii) x = 0 (on y-axis)',
        ta: '(i) x-அச்சுக்கு இணையான கோடு மற்றும் (ii) y-அச்சின் மேல் உள்ள கோடு'
      },
      q: {
        en: '3. Plot the following points in the coordinate plane and join them. What is your conclusion about the resulting figure?\n(i) (−5, 3) (−1, 3) (0, 3) (5, 3)   (ii) (0, −4) (0, −2) (0, 4) (0, 5)',
        ta: '3. பின்வரும் புள்ளிகளை வரைபடத்தாளில் குறித்து அவற்றை இணைக்கவும், கிடைக்கும் வடிவத்தைப் பற்றி தங்களின் கருத்தைக் கூறுக.\n(i) (−5, 3) (−1, 3) (0, 3) (5, 3)   (ii) (0, −4) (0, −2) (0, 4) (0, 5)'
      },
      questionMath: {
        en: [
          '3. Plot the following points in the coordinate plane and join them. What is your conclusion about the resulting figure?\n(i) ',
          tex('(-5,3),\\;(-1,3),\\;(0,3),\\;(5,3)', '(−5, 3) (−1, 3) (0, 3) (5, 3)'),
          '   (ii) ',
          tex('(0,-4),\\;(0,-2),\\;(0,4),\\;(0,5)', '(0, −4) (0, −2) (0, 4) (0, 5)')
        ],
        ta: [
          '3. பின்வரும் புள்ளிகளை வரைபடத்தாளில் குறித்து அவற்றை இணைக்கவும், கிடைக்கும் வடிவத்தைப் பற்றி தங்களின் கருத்தைக் கூறுக.\n(i) ',
          tex('(-5,3),\\;(-1,3),\\;(0,3),\\;(5,3)', '(−5, 3) (−1, 3) (0, 3) (5, 3)'),
          '   (ii) ',
          tex('(0,-4),\\;(0,-2),\\;(0,4),\\;(0,5)', '(0, −4) (0, −2) (0, 4) (0, 5)')
        ]
      },
      steps: [
        step(
          '(i) In (−5, 3), (−1, 3), (0, 3), (5, 3), every point has the same y-coordinate y = 3, which is 3 units above the x-axis.',
          '(i) (−5, 3), (−1, 3), (0, 3), (5, 3) ஆகிய அனைத்துப் புள்ளிகளிலும் y-ஆயத்தொலைவு y = 3 எனச் சமமாக உள்ளது (x-அச்சிற்கு 3 அலகுகள் மேல்).',
          'y = 3 for all points ⇒ straight line parallel to x-axis',
          'y = 3 \\;(\\text{constant}) \\implies \\text{Straight line parallel to }x\\text{-axis}'
        ),
        step(
          '(ii) In (0, −4), (0, −2), (0, 4), (0, 5), every point has x-coordinate x = 0, so every point lies directly on the y-axis.',
          '(ii) (0, −4), (0, −2), (0, 4), (0, 5) ஆகிய அனைத்துப் புள்ளிகளிலும் x-ஆயத்தொலைவு x = 0 ஆகும்; எனவே அவை அனைத்தும் y-அச்சின் மேல் அமைந்துள்ளன.',
          'x = 0 for all points ⇒ straight line lying on y-axis',
          'x = 0 \\;(\\text{for all points}) \\implies \\text{Straight line lying on }y\\text{-axis}'
        )
      ],
      answer: '(i) Straight line parallel to x-axis; (ii) Straight line which lies on y-axis',
      answerTa: '(i) x-அச்சிற்கு இணையான நேர்க்கோடு; (ii) y-அச்சின் மேல் அமைந்துள்ள நேர்க்கோடு',
      answerMath: {
        en: tex('\\text{(i) Parallel to }x\\text{-axis};\\quad \\text{(ii) Lies on }y\\text{-axis}', '(i) Straight line parallel to x-axis; (ii) Straight line which lies on y-axis', true),
        ta: tex('\\text{(i) Parallel to }x\\text{-axis};\\quad \\text{(ii) Lies on }y\\text{-axis}', '(i) x-அச்சிற்கு இணையான நேர்க்கோடு; (ii) y-அச்சின் மேல் அமைந்துள்ள நேர்க்கோடு', true)
      },
      sourceFidelity: {
        status: 'page-visual-checked',
        sourcePdfPage: { en: 199, ta: 212 },
        sourcePrintedPage: { en: 193, ta: 206 },
        answerKeyPdfPage: { en: 321, ta: 337 }
      }
    },
    {
      id: 'g9-ch5-ex5.1-q4',
      classNum: 9,
      chapter: '5',
      exercise: '5.1',
      kind: 'textbook',
      edition: '2025',
      preferItemMath: true,
      releaseStatus: 'bilingual-2025-source-checked',
      translationReview: '2025-tamil-pdf-checked-teacher-review-pending',
      topic: { en: 'Coordinate Geometry · Geometrical Shapes', ta: 'ஆயத்தொலை வடிவியல் · வடிவியல் உருவங்கள்' },
      label: { en: 'Exercise 5.1 · Q4', ta: 'பயிற்சி 5.1 · வினா 4' },
      title: { en: 'Identify shapes formed by plotted points', ta: 'புள்ளிகளை இணைத்து உருவாகும் வடிவத்தைக் காணுதல்' },
      figureSrc: 'assets/grade9-ch5/ex5-1-q4.svg',
      figureAlt: {
        en: 'Coordinate plot showing (i) a 4x4 square in Quadrant III and (ii) a trapezium with horizontal parallel sides y=3 and y=-1',
        ta: '(i) சதுரம் மற்றும் (ii) சரிவகம் ஆகிய வடிவங்களைக் காட்டும் ஆய அச்சு வரைபடம்'
      },
      figureCaption: {
        en: 'Shapes formed: (i) Square of side 4 units; (ii) Trapezium with parallel bases y = 3 and y = −1',
        ta: 'உருவாகும் வடிவங்கள்: (i) சதுரம்; (ii) சரிவகம்'
      },
      q: {
        en: '4. Plot the following points in the coordinate plane. Join them in order. What type of geometrical shape is formed?\n(i) (0, 0) (−4, 0) (−4, −4) (0, −4)   (ii) (−3, 3) (2, 3) (−6, −1) (5, −1)',
        ta: '4. பின்வரும் புள்ளிகளை ஆயத்தொலைத் தளத்தில் குறித்து, வரிசைப்படி அவற்றை இணைக்கவும். எந்த வகையான வடிவியல் உருவம் கிடைக்கும்?\n(i) (0, 0) (−4, 0) (−4, −4) (0, −4)   (ii) (−3, 3) (2, 3) (−6, −1) (5, −1)'
      },
      questionMath: {
        en: [
          '4. Plot the following points in the coordinate plane. Join them in order. What type of geometrical shape is formed?\n(i) ',
          tex('(0,0),\\;(-4,0),\\;(-4,-4),\\;(0,-4)', '(0, 0) (−4, 0) (−4, −4) (0, −4)'),
          '   (ii) ',
          tex('(-3,3),\\;(2,3),\\;(-6,-1),\\;(5,-1)', '(−3, 3) (2, 3) (−6, −1) (5, −1)')
        ],
        ta: [
          '4. பின்வரும் புள்ளிகளை ஆயத்தொலைத் தளத்தில் குறித்து, வரிசைப்படி அவற்றை இணைக்கவும். எந்த வகையான வடிவியல் உருவம் கிடைக்கும்?\n(i) ',
          tex('(0,0),\\;(-4,0),\\;(-4,-4),\\;(0,-4)', '(0, 0) (−4, 0) (−4, −4) (0, −4)'),
          '   (ii) ',
          tex('(-3,3),\\;(2,3),\\;(-6,-1),\\;(5,-1)', '(−3, 3) (2, 3) (−6, −1) (5, −1)')
        ]
      },
      steps: [
        step(
          '(i) Joining (0,0) → (−4,0) → (−4,−4) → (0,−4) → (0,0) gives two horizontal sides of length 4 and two vertical sides of length 4 meeting at 90° angles. Hence it is a square.',
          '(i) (0,0) → (−4,0) → (−4,−4) → (0,−4) → (0,0) என இணைக்கும்போது, 4 அலகு நீளமுள்ள செங்குத்து மற்றும் கிடைமட்டப் பக்கங்கள் 90° கோணத்தில் வெட்டுகின்றன. எனவே இது ஒரு சதுரம்.',
          'All 4 sides = 4 units, angles = 90° ⇒ Square',
          '\\text{All 4 sides}=4\\text{ units},\\;\\text{angles}=90^\\circ \\implies \\text{Square}'
        ),
        step(
          '(ii) Points (−3, 3) and (2, 3) lie on the horizontal line y = 3 (length 5). Points (−6, −1) and (5, −1) lie on the horizontal line y = −1 (length 11). Since one pair of opposite sides is parallel with unequal lengths, the quadrilateral is a trapezium.',
          '(ii) (−3, 3), (2, 3) ஆகியவை y = 3 என்ற கிடைமட்டக் கோட்டிலும் (நீளம் 5), (−6, −1), (5, −1) ஆகியவை y = −1 என்ற கிடைமட்டக் கோட்டிலும் (நீளம் 11) உள்ளன. ஒரு சோடி எதிர்ப்பக்கங்கள் இணையாகவும் சமமற்ற நீளமாகவும் உள்ளதால் இது ஒரு சரிவகம்.',
          'y=3 ∥ y=−1, lengths 5 ≠ 11 ⇒ Trapezium',
          '\\text{One pair of opposite sides parallel } (y=3 \\parallel y=-1) \\implies \\text{Trapezium}'
        )
      ],
      answer: '(i) Square; (ii) Trapezium',
      answerTa: '(i) சதுரம்; (ii) சரிவகம்',
      answerMath: {
        en: tex('\\text{(i) Square};\\quad \\text{(ii) Trapezium}', '(i) Square; (ii) Trapezium', true),
        ta: tex('\\text{(i) Square};\\quad \\text{(ii) Trapezium}', '(i) சதுரம்; (ii) சரிவகம்', true)
      },
      sourceFidelity: {
        status: 'page-visual-checked',
        sourcePdfPage: { en: 199, ta: 212 },
        sourcePrintedPage: { en: 193, ta: 206 },
        answerKeyPdfPage: { en: 321, ta: 337 }
      }
    }
  ];

  for (const item of entries) {
    if (grade.items.some(q => q.id === item.id)) throw Error('Duplicate textbook ID: ' + item.id);
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
