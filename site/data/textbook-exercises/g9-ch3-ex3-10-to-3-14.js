/* Grade 9 Algebra Chapter 3 — Exercises 3.10, 3.11, 3.12, 3.13, 3.14 (2025 EN + TA complete).
 * Sources: G9_Algebra_English_2025_Chapter3.pdf pp. 47–56; G9_Algebra_Tamil_2025_Chapter3.pdf pp. 50–61.
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
    // ==================== EXERCISE 3.10 (11 items) ====================
    item('g9-ch3-ex3.10-q1-i', '3.10', 1, 'i', 'Linear Graphs', 'நேரிய சமன்பாட்டு வரைபடம்',
      'Draw the graph of y = 2x', 'வரைபடம் வரைக: y = 2x',
      '1. Draw the graph for the following\n(i) y = 2x',
      '1. கீழ்க்காண்பவற்றிற்கு வரைபடம் வரைக\n(i) y = 2x',
      'y = 2x',
      'Straight line through (−1, −2), (0, 0), (1, 2), (2, 4)',
      '(−1, −2), (0, 0), (1, 2), (2, 4) வழியே செல்லும் நேர்க்கோடு',
      '\\text{Line through } (0,0),\\; (1,2),\\; (2,4)', [
        ['x = −1 ⇒ y = −2; x = 0 ⇒ y = 0; x = 1 ⇒ y = 2; x = 2 ⇒ y = 4', 'Compute at least three ordered pairs.', 'x-க்கு மதிப்புகள் கொடுத்து y காண்க.', '(-1,-2),\\; (0,0),\\; (1,2),\\; (2,4)'],
        ['Plot the points and join with a straight line', 'The graph passes through the origin (0, 0) with slope 2.', 'புள்ளிகளைக் குறித்து நேர்க்கோட்டால் இணைக்கவும்.', 'y = 2x']
      ], 'easy'),

    item('g9-ch3-ex3.10-q1-ii', '3.10', 1, 'ii', 'Linear Graphs', 'நேரிய சமன்பாட்டு வரைபடம்',
      'Draw the graph of y = 4x − 1', 'வரைபடம் வரைக: y = 4x − 1',
      '1. Draw the graph for the following\n(ii) y = 4x − 1',
      '1. கீழ்க்காண்பவற்றிற்கு வரைபடம் வரைக\n(ii) y = 4x − 1',
      'y = 4x - 1',
      'Straight line through (0, −1), (1, 3), (2, 7)',
      '(0, −1), (1, 3), (2, 7) வழியே செல்லும் நேர்க்கோடு',
      '\\text{Line through } (0,-1),\\; (1,3),\\; (2,7)', [
        ['x = 0 ⇒ y = −1; x = 1 ⇒ y = 3; x = 2 ⇒ y = 7', 'Evaluate y = 4x − 1 at x = 0, 1, 2.', 'x = 0, 1, 2 எனப் பிரதியிட.', '(0,-1),\\; (1,3),\\; (2,7)'],
        ['Plot and draw the straight line', 'Connect the collinear points.', 'புள்ளிகளை இணைத்து நேர்க்கோடு வரைக.', 'y = 4x - 1']
      ], 'easy'),

    item('g9-ch3-ex3.10-q1-iii', '3.10', 1, 'iii', 'Linear Graphs', 'நேரிய சமன்பாட்டு வரைபடம்',
      'Draw the graph of y = (3/2)x + 3', 'வரைபடம் வரைக: y = (3/2)x + 3',
      '1. Draw the graph for the following\n(iii) y = (3/2)x + 3',
      '1. கீழ்க்காண்பவற்றிற்கு வரைபடம் வரைக\n(iii) y = (3/2)x + 3',
      'y = \\left(\\dfrac{3}{2}\\right)x + 3',
      'Straight line through (−2, 0), (0, 3), (2, 6)',
      '(−2, 0), (0, 3), (2, 6) வழியே செல்லும் நேர்க்கோடு',
      '\\text{Line through } (-2,0),\\; (0,3),\\; (2,6)', [
        ['Choose multiples of 2: x = −2 ⇒ y = 0; x = 0 ⇒ y = 3; x = 2 ⇒ y = 6', 'Pick even x values to get integer y.', 'முழு எண் புள்ளிகள் பெற x = −2, 0, 2 எடுக்க.', '(-2,0),\\; (0,3),\\; (2,6)'],
        ['Plot and join with a straight line', 'The line cuts x-axis at (−2, 0) and y-axis at (0, 3).', 'புள்ளிகளை இணைக்க நேர்க்கோடு கிடைக்கும்.', 'y = \\dfrac{3}{2}x + 3']
      ], 'easy'),

    item('g9-ch3-ex3.10-q1-iv', '3.10', 1, 'iv', 'Linear Graphs', 'நேரிய சமன்பாட்டு வரைபடம்',
      'Draw the graph of 3x + 2y = 14', 'வரைபடம் வரைக: 3x + 2y = 14',
      '1. Draw the graph for the following\n(iv) 3x + 2y = 14',
      '1. கீழ்க்காண்பவற்றிற்கு வரைபடம் வரைக\n(iv) 3x + 2y = 14',
      '3x + 2y = 14',
      'Straight line through (0, 7), (2, 4), (4, 1)',
      '(0, 7), (2, 4), (4, 1) வழியே செல்லும் நேர்க்கோடு',
      '\\text{Line through } (0,7),\\; (2,4),\\; (4,1)', [
        ['y = (14 − 3x)/2; x = 0 ⇒ y = 7; x = 2 ⇒ y = 4; x = 4 ⇒ y = 1', 'Express y in terms of x.', 'y = (14 − 3x)/2 என மாற்றிப் புள்ளிகள் காண்க.', '(0,7),\\; (2,4),\\; (4,1)'],
        ['Plot and draw the straight line', 'Join the points.', 'புள்ளிகளை நேர்க்கோட்டால் இணைக்க.', '3x + 2y = 14']
      ], 'easy'),

    item('g9-ch3-ex3.10-q2-i', '3.10', 2, 'i', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: x + y = 7; x − y = 3', 'வரைபட முறையில் தீர்க்க: x + y = 7; x − y = 3',
      '2. Solve graphically\n(i) x + y = 7; x − y = 3',
      '2. வரைபட முறையில் தீர்க்க\n(i) x + y = 7; x − y = 3',
      'x + y = 7;\\quad x - y = 3',
      '(5, 2) i.e. x = 5, y = 2', '(5, 2) அதாவது x = 5, y = 2', '(x, y) = (5, 2)', [
        ['x + y = 7 passes through (0, 7), (3, 4), (5, 2), (7, 0)', 'Tabulate points for line 1.', 'முதல் கோட்டின் புள்ளிகள் காண்க.', 'y = 7 - x'],
        ['x − y = 3 passes through (0, −3), (3, 0), (5, 2), (6, 3)', 'Tabulate points for line 2.', 'இரண்டாவது கோட்டின் புள்ளிகள் காண்க.', 'y = x - 3'],
        ['Lines intersect at (5, 2) ⇒ x = 5, y = 2', 'Check: 5 + 2 = 7 and 5 − 2 = 3.', 'வெட்டும் புள்ளி (5, 2); x = 5, y = 2.', '(5, 2)']
      ], 'easy'),

    item('g9-ch3-ex3.10-q2-ii', '3.10', 2, 'ii', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: 3x + 2y = 4; 9x + 6y − 12 = 0', 'வரைபட முறையில் தீர்க்க: 3x + 2y = 4; 9x + 6y − 12 = 0',
      '2. Solve graphically\n(ii) 3x + 2y = 4; 9x + 6y − 12 = 0',
      '2. வரைபட முறையில் தீர்க்க\n(ii) 3x + 2y = 4; 9x + 6y − 12 = 0',
      '3x + 2y = 4;\\quad 9x + 6y - 12 = 0',
      'Infinitely many solutions (coinciding lines)', 'எண்ணற்ற தீர்வுகள் (ஒன்றிய கோடுகள்)',
      '\\text{Infinitely many solutions (coinciding lines)}', [
        ['9x + 6y − 12 = 0 ÷ 3 gives 3x + 2y = 4', 'Both equations represent the exact same line through (0, 2) and (2, −1).', 'இரு சமன்பாடுகளும் ஒரே கோட்டைக் குறிக்கின்றன.', 'a_1/a_2 = b_1/b_2 = c_1/c_2 = 1/3'],
        ['Lines coincide ⇒ infinitely many solutions', 'Every point on 3x + 2y = 4 is a solution.', 'ஒன்றிய கோடுகள் என்பதால் எண்ணற்ற தீர்வுகள்.', '\\text{Infinitely many solutions}']
      ], 'medium'),

    item('g9-ch3-ex3.10-q2-iii', '3.10', 2, 'iii', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: x/2 + y/4 = 1; x/2 + y/4 = 2', 'வரைபட முறையில் தீர்க்க: x/2 + y/4 = 1; x/2 + y/4 = 2',
      '2. Solve graphically\n(iii) x/2 + y/4 = 1; x/2 + y/4 = 2',
      '2. வரைபட முறையில் தீர்க்க\n(iii) x/2 + y/4 = 1; x/2 + y/4 = 2',
      '\\dfrac{x}{2} + \\dfrac{y}{4} = 1;\\quad \\dfrac{x}{2} + \\dfrac{y}{4} = 2',
      'No solution (parallel lines)', 'தீர்வு இல்லை (இணை கோடுகள்)',
      '\\text{No solution (parallel lines)}', [
        ['2x + y = 4 (through (0, 4), (2, 0)) and 2x + y = 8 (through (0, 8), (4, 0))', 'Clear denominators by multiplying by 4.', '4-ஆல் பெருக்க 2x + y = 4 மற்றும் 2x + y = 8.', '2x + y = 4;\\; 2x + y = 8'],
        ['Lines are parallel (2/2 = 1/1 ≠ 4/8) ⇒ No solution', 'Parallel lines never intersect.', 'இணை கோடுகள் என்பதால் தீர்வு இல்லை.', '\\text{No solution}']
      ], 'medium'),

    item('g9-ch3-ex3.10-q2-iv', '3.10', 2, 'iv', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: x − y = 0; y + 3 = 0', 'வரைபட முறையில் தீர்க்க: x − y = 0; y + 3 = 0',
      '2. Solve graphically\n(iv) x − y = 0; y + 3 = 0',
      '2. வரைபட முறையில் தீர்க்க\n(iv) x − y = 0; y + 3 = 0',
      'x - y = 0;\\quad y + 3 = 0',
      '(−3, −3) i.e. x = −3, y = −3', '(−3, −3) அதாவது x = −3, y = −3', '(x, y) = (-3, -3)', [
        ['y = x passes through (0, 0), (−3, −3), (3, 3)', 'Plot y = x.', 'y = x கோட்டை வரைக.', 'y = x'],
        ['y = −3 is a horizontal line; they intersect at (−3, −3)', 'Read intersection.', 'வெட்டும் புள்ளி (−3, −3).', '(x, y) = (-3, -3)']
      ], 'easy'),

    item('g9-ch3-ex3.10-q2-v', '3.10', 2, 'v', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: y = 2x + 1; y + 3x − 6 = 0', 'வரைபட முறையில் தீர்க்க: y = 2x + 1; y + 3x − 6 = 0',
      '2. Solve graphically\n(v) y = 2x + 1; y + 3x − 6 = 0',
      '2. வரைபட முறையில் தீர்க்க\n(v) y = 2x + 1; y + 3x − 6 = 0',
      'y = 2x + 1;\\quad y + 3x - 6 = 0',
      '(1, 3) i.e. x = 1, y = 3', '(1, 3) அதாவது x = 1, y = 3', '(x, y) = (1, 3)', [
        ['y = 2x + 1 passes through (0, 1), (1, 3), (2, 5)', 'Points for line 1.', 'முதல் கோடு: (0, 1), (1, 3), (2, 5).', 'y = 2x + 1'],
        ['y = 6 − 3x passes through (0, 6), (1, 3), (2, 0)', 'Points for line 2.', 'இரண்டாவது கோடு: (0, 6), (1, 3), (2, 0).', 'y = 6 - 3x'],
        ['Lines intersect at (1, 3) ⇒ x = 1, y = 3', 'Check: 3 = 2(1)+1 and 3+3−6=0.', 'வெட்டும் புள்ளி (1, 3).', '(1, 3)']
      ], 'easy'),

    item('g9-ch3-ex3.10-q2-vi', '3.10', 2, 'vi', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Solve graphically: x = −3; y = 3', 'வரைபட முறையில் தீர்க்க: x = −3; y = 3',
      '2. Solve graphically\n(vi) x = −3; y = 3',
      '2. வரைபட முறையில் தீர்க்க\n(vi) x = −3; y = 3',
      'x = -3;\\quad y = 3',
      '(−3, 3) i.e. x = −3, y = 3', '(−3, 3) அதாவது x = −3, y = 3', '(x, y) = (-3, 3)', [
        ['x = −3 is a vertical line; y = 3 is a horizontal line', 'They meet perpendicularly at (−3, 3).', 'x = −3 (குத்துக்கோடு), y = 3 (கிடைக்கோடு) வெட்டும் புள்ளி (−3, 3).', '(x, y) = (-3, 3)']
      ], 'easy'),

    item('g9-ch3-ex3.10-q3', '3.10', 3, '', 'Graphical Solution', 'வரைபடத் தீர்வு',
      'Speed of two cars by graphical method', 'இரு மகிழுந்துகளின் வேகங்கள் காண்க',
      '3. Two cars are 100 miles apart. If they drive towards each other they will meet in 1 hour. If they drive in the same direction they will meet in 2 hours. Find their speed by using graphical method.',
      '3. இரண்டு மகிழுந்துகளுக்கு இடைப்பட்ட தொலைவு 100 மைல்கள். இரண்டும் ஒன்றையொன்று நோக்கிப் பயணித்தால் ஒரு மணி நேரத்தில் சந்தித்துக்கொள்ளும். இரண்டும் ஒரே திசையில் செல்லும்போது 2 மணி நேரத்தில் ஓரிடத்தில் சந்தித்து ஒன்றாகப் பயணிக்குமெனில், இரண்டு மகிழுந்துகளின் வேகங்களைக் (வரைபட முறையில்) கணக்கிடுக.',
      'x + y = 100;\\quad x - y = 50',
      '75 miles/hr and 25 miles/hr', 'மணிக்கு 75 மைல்கள் மற்றும் 25 மைல்கள்',
      '75\\text{ mph},\\; 25\\text{ mph}', [
        ['Let speeds be x and y mph (x > y). Towards each other: 1(x + y) = 100', 'Relative speed towards each other is x + y.', 'எதிர் திசை: x + y = 100.', 'x + y = 100'],
        ['Same direction in 2 hrs: 2(x − y) = 100 ⇒ x − y = 50', 'Relative speed in same direction is x − y.', 'ஒரே திசை: x − y = 50.', 'x - y = 50'],
        ['Plotting both lines gives intersection (75, 25)', 'Speeds are 75 mph and 25 mph.', 'வெட்டும் புள்ளி (75, 25); வேகங்கள் 75, 25 மைல்/மணி.', '(75, 25)']
      ], 'medium'),

    // ==================== EXERCISE 3.11 (6 items) ====================
    item('g9-ch3-ex3.11-q1-i', '3.11', 1, 'i', 'Substitution Method', 'பிரதியிடல் முறை',
      'Solve by substitution: 2x − 3y = 7; 5x + y = 9', 'பிரதியிடல் முறையில் தீர்க்க: 2x−3y=7; 5x+y=9',
      '1. Solve, using the method of substitution\n(i) 2x − 3y = 7; 5x + y = 9',
      '1. பிரதியிடல் முறையில் தீர்க்க.\n(i) 2x − 3y = 7; 5x + y = 9',
      '2x - 3y = 7;\\quad 5x + y = 9',
      'x = 2, y = −1', 'x = 2, y = −1', 'x = 2,\\; y = -1', [
        ['From (2), y = 9 − 5x', 'Express y from 5x + y = 9.', '5x + y = 9-இலிருந்து y = 9 − 5x.', 'y = 9 - 5x'],
        ['2x − 3(9 − 5x) = 7 ⇒ 17x − 27 = 7 ⇒ 17x = 34 ⇒ x = 2', 'Substitute into (1) and solve.', 'முதல் சமன்பாட்டில் பிரதியிட x = 2.', '17x = 34 \\implies x = 2'],
        ['y = 9 − 5(2) = −1', 'Substitute x = 2 back.', 'y = 9 − 10 = −1.', 'y = -1']
      ], 'easy'),

    item('g9-ch3-ex3.11-q1-ii', '3.11', 1, 'ii', 'Substitution Method', 'பிரதியிடல் முறை',
      'Solve by substitution: 1.5x + 0.1y = 6.2; 3x − 0.4y = 11.2', 'பிரதியிடல் முறையில் தீர்க்க: 1.5x+0.1y=6.2; 3x−0.4y=11.2',
      '1. Solve, using the method of substitution\n(ii) 1.5x + 0.1y = 6.2; 3x − 0.4y = 11.2',
      '1. பிரதியிடல் முறையில் தீர்க்க.\n(ii) 1.5x + 0.1y = 6.2; 3x − 0.4y = 11.2',
      '1.5x + 0.1y = 6.2;\\quad 3x - 0.4y = 11.2',
      'x = 4, y = 2', 'x = 4, y = 2', 'x = 4,\\; y = 2', [
        ['Multiply by 10: 15x + y = 62 ⇒ y = 62 − 15x', 'Clear decimals.', '10-ஆல் பெருக்க y = 62 − 15x.', 'y = 62 - 15x'],
        ['30x − 4(62 − 15x) = 112 ⇒ 90x = 360 ⇒ x = 4', 'Substitute into 30x − 4y = 112.', 'இரண்டாம் சமன்பாட்டில் பிரதியிட x = 4.', '90x = 360 \\implies x = 4'],
        ['y = 62 − 15(4) = 2', 'Find y.', 'y = 62 − 60 = 2.', 'y = 2']
      ], 'medium'),

    item('g9-ch3-ex3.11-q1-iii', '3.11', 1, 'iii', 'Substitution Method', 'பிரதியிடல் முறை',
      'Solve by substitution: 10% of x + 20% of y = 24; 3x − y = 20', 'பிரதியிடல் முறையில் தீர்க்க: x-இன் 10%+y-இன் 20%=24; 3x−y=20',
      '1. Solve, using the method of substitution\n(iii) 10% of x + 20% of y = 24; 3x − y = 20',
      '1. பிரதியிடல் முறையில் தீர்க்க.\n(iii) x-இன் 10% + y-இன் 20% = 24; 3x − y = 20',
      '0.1x + 0.2y = 24;\\quad 3x - y = 20',
      'x = 40, y = 100', 'x = 40, y = 100', 'x = 40,\\; y = 100', [
        ['x + 2y = 240; y = 3x − 20', 'Multiply first by 10; solve second for y.', 'முதல் சமன்பாட்டை 10-ஆல் பெருக்க x + 2y = 240; y = 3x − 20.', 'x + 2y = 240,\\; y = 3x - 20'],
        ['x + 2(3x − 20) = 240 ⇒ 7x = 280 ⇒ x = 40', 'Substitute y.', 'பிரதியிட 7x = 280 ⇒ x = 40.', 'x = 40'],
        ['y = 3(40) − 20 = 100', 'Find y.', 'y = 120 − 20 = 100.', 'y = 100']
      ], 'medium'),

    item('g9-ch3-ex3.11-q1-iv', '3.11', 1, 'iv', 'Substitution Method', 'பிரதியிடல் முறை',
      'Solve by substitution: √2 x − √3 y = 1; √3 x − √8 y = 0', 'பிரதியிடல் முறையில் தீர்க்க: √2 x − √3 y = 1; √3 x − √8 y = 0',
      '1. Solve, using the method of substitution\n(iv) √2 x − √3 y = 1; √3 x − √8 y = 0',
      '1. பிரதியிடல் முறையில் தீர்க்க.\n(iv) √2 x − √3 y = 1; √3 x − √8 y = 0',
      '\\sqrt{2}\\,x - \\sqrt{3}\\,y = 1;\\quad \\sqrt{3}\\,x - \\sqrt{8}\\,y = 0',
      'x = 2√2, y = √3', 'x = 2√2, y = √3', 'x = 2\\sqrt{2},\\; y = \\sqrt{3}', [
        ['From (2), y = (√3 / √8) x', 'Express y from √3 x = √8 y.', 'y = (√3 / √8)x.', 'y = \\dfrac{\\sqrt{3}}{\\sqrt{8}}\\,x'],
        ['√2 x − √3 (√3 / √8) x = 1 ⇒ (4 − 3)x / √8 = 1 ⇒ x = √8 = 2√2', 'Substitute into (1).', 'பிரதியிட x = √8 = 2√2.', 'x = 2\\sqrt{2}'],
        ['y = (√3 / √8)(√8) = √3', 'Find y.', 'y = √3.', 'y = \\sqrt{3}']
      ], 'difficult'),

    item('g9-ch3-ex3.11-q2', '3.11', 2, '', 'Substitution Method', 'பிரதியிடல் முறை',
      'Find Raman’s age', 'இராமனின் தற்போதைய வயது காண்க',
      '2. Raman’s age is three times the sum of the ages of his two sons. After 5 years his age will be twice the sum of the ages of his two sons. Find the age of Raman.',
      '2. இராமனின் வயது அவருடைய இரு மகன்களுடைய வயதுகளின் கூடுதலைப் போல் மூன்று மடங்காகும். ஐந்தாண்டுகள் கழித்து அவரின் வயது தனது மகன்களுடைய வயதுகளின் கூடுதலைப் போல் இரு மடங்காகும் எனில், இராமனின் தற்போதைய வயதைக் காண்க.',
      'x = 3y;\\quad x + 5 = 2(y + 10)',
      '45 years', '45 ஆண்டுகள்', '45\\text{ years}', [
        ['Let Raman’s age = x and sum of two sons’ ages = y. Then x = 3y', 'First condition.', 'இராமனின் வயது x, இரு மகன்களின் வயதுக் கூடுதல் y என்க; x = 3y.', 'x = 3y'],
        ['After 5 years: x + 5 = 2(y + 5 + 5) = 2(y + 10)', 'Each son ages 5 years, so their sum increases by 10.', 'இரு மகன்களுக்கும் 5 வயது கூடுவதால் கூடுதல் y + 10.', 'x + 5 = 2(y + 10)'],
        ['3y + 5 = 2y + 20 ⇒ y = 15 ⇒ x = 45', 'Substitute x = 3y.', '3y + 5 = 2y + 20 ⇒ y = 15 ⇒ x = 45.', 'x = 45']
      ], 'medium'),

    item('g9-ch3-ex3.11-q3', '3.11', 3, '', 'Substitution Method', 'பிரதியிடல் முறை',
      'Find the three-digit number', 'மூன்றிலக்க எண் காண்க',
      '3. The middle digit of a number between 100 and 1000 is zero and the sum of the other digit is 13. If the digits are reversed, the number so formed exceeds the original number by 495. Find the number.',
      '3. 100 மற்றும் 1000-க்கு இடையே அமையும் ஒரு மூன்றிலக்க எண்ணின் நடு இலக்கம் பூச்சியமாகவும் மற்ற இரு இலக்கங்களின் கூடுதல் 13 ஆகவும் இருக்கின்றன. இலக்கங்களை இடம் மாற்றி அமைக்கும்போது கிடைக்கும் எண்ணானது, அந்த எண்ணை விட 495 அதிகம் எனில், அந்த எண்ணைக் காண்க.',
      'x + y = 13;\\quad (100y + x) - (100x + y) = 495',
      '409', '409', '409', [
        ['Original number = 100x + 0·10 + y = 100x + y; x + y = 13', 'Let hundreds digit = x, units digit = y.', 'நூறாம் இலக்கம் x, ஒன்றாம் இலக்கம் y என்க.', 'x + y = 13'],
        ['99y − 99x = 495 ⇒ y − x = 5', 'From reversed − original = 495.', '99(y − x) = 495 ⇒ y − x = 5.', 'y - x = 5'],
        ['y = x + 5 ⇒ 2x + 5 = 13 ⇒ x = 4, y = 9 ⇒ Number = 409', 'Solve for x and y.', 'x = 4, y = 9; எண் = 409.', '409']
      ], 'medium'),

    // ==================== EXERCISE 3.12 (8 items) ====================
    item('g9-ch3-ex3.12-q1-i', '3.12', 1, 'i', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: 2x − y = 3; 3x + y = 7', 'நீக்கல் முறையில் தீர்க்க: 2x−y=3; 3x+y=7',
      '1. Solve by the method of elimination\n(i) 2x − y = 3; 3x + y = 7',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(i) 2x − y = 3; 3x + y = 7',
      '2x - y = 3;\\quad 3x + y = 7',
      'x = 2, y = 1', 'x = 2, y = 1', 'x = 2,\\; y = 1', [
        ['Add both equations: 5x = 10 ⇒ x = 2', 'Eliminate y by adding.', 'இரு சமன்பாடுகளையும் கூட்ட y நீங்கும்: 5x = 10.', '5x = 10 \\implies x = 2'],
        ['3(2) + y = 7 ⇒ y = 1', 'Substitute x = 2.', 'y = 7 − 6 = 1.', 'y = 1']
      ], 'easy'),

    item('g9-ch3-ex3.12-q1-ii', '3.12', 1, 'ii', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: x − y = 5; 3x + 2y = 25', 'நீக்கல் முறையில் தீர்க்க: x−y=5; 3x+2y=25',
      '1. Solve by the method of elimination\n(ii) x − y = 5; 3x + 2y = 25',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(ii) x − y = 5; 3x + 2y = 25',
      'x - y = 5;\\quad 3x + 2y = 25',
      'x = 7, y = 2', 'x = 7, y = 2', 'x = 7,\\; y = 2', [
        ['Multiply (1) by 2: 2x − 2y = 10; add to (2): 5x = 35 ⇒ x = 7', 'Eliminate y by scaling (1).', 'முதல் சமன்பாட்டை 2-ஆல் பெருக்கிக் கூட்ட 5x = 35 ⇒ x = 7.', '5x = 35 \\implies x = 7'],
        ['7 − y = 5 ⇒ y = 2', 'Find y.', 'y = 2.', 'y = 2']
      ], 'easy'),

    item('g9-ch3-ex3.12-q1-iii', '3.12', 1, 'iii', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: x/10 + y/5 = 14; x/8 + y/6 = 15', 'நீக்கல் முறையில் தீர்க்க: x/10 + y/5 = 14; x/8 + y/6 = 15',
      '1. Solve by the method of elimination\n(iii) x/10 + y/5 = 14; x/8 + y/6 = 15',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(iii) x/10 + y/5 = 14; x/8 + y/6 = 15',
      '\\dfrac{x}{10} + \\dfrac{y}{5} = 14;\\quad \\dfrac{x}{8} + \\dfrac{y}{6} = 15',
      'x = 80, y = 30', 'x = 80, y = 30', 'x = 80,\\; y = 30', [
        ['x + 2y = 140 and 3x + 4y = 360', 'Clear fractions (×10 and ×24).', 'பின்னங்களை நீக்க x + 2y = 140; 3x + 4y = 360.', 'x + 2y = 140;\\; 3x + 4y = 360'],
        ['(3x + 4y) − 2(x + 2y) = 360 − 280 ⇒ x = 80; y = 30', 'Eliminate y.', 'y-ஐ நீக்க x = 80, y = 30.', 'x = 80,\\; y = 30']
      ], 'medium'),

    item('g9-ch3-ex3.12-q1-iv', '3.12', 1, 'iv', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: 3(2x + y) = 7xy; 3(x + 3y) = 11xy', 'நீக்கல் முறையில் தீர்க்க: 3(2x+y)=7xy; 3(x+3y)=11xy',
      '1. Solve by the method of elimination\n(iv) 3(2x + y) = 7xy; 3(x + 3y) = 11xy',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(iv) 3(2x + y) = 7xy; 3(x + 3y) = 11xy',
      '3(2x + y) = 7xy;\\quad 3(x + 3y) = 11xy',
      '(1, 3/2) and (0, 0)', '(1, 3/2) மற்றும் (0, 0)', '(1,\\; \\dfrac{3}{2}) \\text{ and } (0, 0)', [
        ['Note (0, 0) satisfies both equations. For x, y ≠ 0, divide by xy:', 'Put u = 1/x, v = 1/y: 3u + 6v = 7 and 9u + 3v = 11.', '(0, 0) ஒரு தீர்வு. x, y ≠ 0 எனில் u = 1/x, v = 1/y என்க.', '3u + 6v = 7;\\; 9u + 3v = 11'],
        ['18u + 6v = 22 ⇒ 15u = 15 ⇒ u = 1, v = 2/3 ⇒ x = 1, y = 3/2', 'Solve for u, v and invert.', 'u = 1, v = 2/3 ⇒ x = 1, y = 3/2.', 'x = 1,\\; y = \\dfrac{3}{2}']
      ], 'difficult'),

    item('g9-ch3-ex3.12-q1-v', '3.12', 1, 'v', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: 4/x + 5y = 7; 3/x + 4y = 5', 'நீக்கல் முறையில் தீர்க்க: 4/x + 5y = 7; 3/x + 4y = 5',
      '1. Solve by the method of elimination\n(v) 4/x + 5y = 7; 3/x + 4y = 5',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(v) 4/x + 5y = 7; 3/x + 4y = 5',
      '\\dfrac{4}{x} + 5y = 7;\\quad \\dfrac{3}{x} + 4y = 5',
      'x = 1/3, y = −1', 'x = 1/3, y = −1', 'x = \\dfrac{1}{3},\\; y = -1', [
        ['Let u = 1/x (x ≠ 0): 4u + 5y = 7; 3u + 4y = 5', 'Substitute u = 1/x.', 'u = 1/x (x ≠ 0) என்க.', '4u + 5y = 7;\\; 3u + 4y = 5'],
        ['16u + 20y = 28; 15u + 20y = 25 ⇒ u = 3 ⇒ x = 1/3, y = −1', 'Eliminate y to find u = 3.', 'y-ஐ நீக்க u = 3 ⇒ x = 1/3, y = −1.', 'x = \\dfrac{1}{3},\\; y = -1']
      ], 'medium'),

    item('g9-ch3-ex3.12-q1-vi', '3.12', 1, 'vi', 'Elimination Method', 'நீக்கல் முறை',
      'Solve by elimination: 13x + 11y = 70; 11x + 13y = 74', 'நீக்கல் முறையில் தீர்க்க: 13x+11y=70; 11x+13y=74',
      '1. Solve by the method of elimination\n(vi) 13x + 11y = 70; 11x + 13y = 74',
      '1. நீக்கல் முறையில் தீர்வு காண்க\n(vi) 13x + 11y = 70; 11x + 13y = 74',
      '13x + 11y = 70;\\quad 11x + 13y = 74',
      'x = 2, y = 4', 'x = 2, y = 4', 'x = 2,\\; y = 4', [
        ['Add: 24(x + y) = 144 ⇒ x + y = 6; Subtract: 2(x − y) = −4 ⇒ x − y = −2', 'Add and subtract the symmetric equations.', 'கூட்ட x + y = 6; கழிக்க x − y = −2.', 'x + y = 6;\\; x - y = -2'],
        ['Add both: 2x = 4 ⇒ x = 2, y = 4', 'Solve the simpler system.', 'x = 2, y = 4.', 'x = 2,\\; y = 4']
      ], 'medium'),

    item('g9-ch3-ex3.12-q2', '3.12', 2, '', 'Elimination Method', 'நீக்கல் முறை',
      'Monthly income of A and B', 'A மற்றும் B-இன் மாத வருமானம் காண்க',
      '2. The monthly income of A and B are in the ratio 3:4 and their monthly expenditures are in the ratio 5:7. If each saves ₹5,000 per month, find the monthly income of each.',
      '2. A மற்றும் B ஆகியோரது மாத வருமானங்களின் விகிதம் 3:4 ஆகவும் அவர்களுடைய செலவுகளின் விகிதம் 5:7 ஆகவும் இருக்கின்றன. ஒவ்வொருவரும் மாதம் ₹5,000 சேமிக்கிறார்கள் எனில், அவர்களுடைய மாத வருமானத்தைக் காண்க.',
      '3x - 5y = 5000;\\quad 4x - 7y = 5000',
      'A: ₹30,000; B: ₹40,000', 'A: ₹30,000; B: ₹40,000',
      'A = \\text{Rs.\\,}30,000,\\; B = \\text{Rs.\\,}40,000', [
        ['Incomes: 3x, 4x; Expenditures: 5y, 7y ⇒ 3x − 5y = 5000; 4x − 7y = 5000', 'Income − Expenditure = Savings.', 'வருமானம் − செலவு = சேமிப்பு.', '3x - 5y = 5000;\\; 4x - 7y = 5000'],
        ['12x − 20y = 20000 and 12x − 21y = 15000 ⇒ y = 5000, x = 10000', 'Eliminate x.', 'x-ஐ நீக்க y = 5000, x = 10000.', 'x = 10000'],
        ['Incomes: 3x = ₹30,000 and 4x = ₹40,000', 'Compute monthly incomes.', 'வருமானங்கள் ₹30,000 மற்றும் ₹40,000.', '3x = \\text{Rs.\\,}30,000,\\; 4x = \\text{Rs.\\,}40,000']
      ], 'medium'),

    item('g9-ch3-ex3.12-q3', '3.12', 3, '', 'Elimination Method', 'நீக்கல் முறை',
      'Present age of man and his son', 'தந்தை மற்றும் மகனின் தற்போதைய வயது',
      '3. Five years ago, a man was seven times as old as his son, while five year hence, the man will be four times as old as his son. Find their present age.',
      '3. 5 வருடங்களுக்கு முன்பு, ஒருவருடைய வயதானது அவருடைய மகனின் வயதைப் போல் 7 மடங்காகும். 5 வருடங்கள் கழித்து அவருடைய வயதானது மகனின் வயதைப் போல் 4 மடங்காக இருக்கும் எனில், அவர்களுடைய தற்போதைய வயது என்ன?',
      'x - 5 = 7(y - 5);\\quad x + 5 = 4(y + 5)',
      'Man: 75 years; Son: 15 years', 'தந்தை: 75 ஆண்டுகள்; மகன்: 15 ஆண்டுகள்',
      '\\text{Man} = 75,\\; \\text{Son} = 15', [
        ['x − 7y = −30 and x − 4y = 15', 'Set up equations from 5 years ago and 5 years hence.', 'x − 7y = −30; x − 4y = 15.', 'x - 7y = -30;\\; x - 4y = 15'],
        ['Subtract: 3y = 45 ⇒ y = 15; x = 75', 'Eliminate x.', 'கழிக்க 3y = 45 ⇒ y = 15, x = 75.', 'x = 75,\\; y = 15']
      ], 'medium'),

    // ==================== EXERCISE 3.13 (5 items) ====================
    item('g9-ch3-ex3.13-q1-i', '3.13', 1, 'i', 'Cross-Multiplication Method', 'குறுக்குப் பெருக்கல் முறை',
      'Solve by cross-multiplication: 8x − 3y = 12; 5x = 2y + 7', 'குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 8x−3y=12; 5x=2y+7',
      '1. Solve by cross-multiplication method\n(i) 8x − 3y = 12; 5x = 2y + 7',
      '1. குறுக்குப் பெருக்கல் முறையைப் பயன்படுத்தித் தீர்க்க\n(i) 8x − 3y = 12; 5x = 2y + 7',
      '8x - 3y - 12 = 0;\\quad 5x - 2y - 7 = 0',
      'x = 3, y = 4', 'x = 3, y = 4', 'x = 3,\\; y = 4', [
        ['8x − 3y − 12 = 0 and 5x − 2y − 7 = 0', 'Write in standard form a₁x + b₁y + c₁ = 0.', 'திட்ட வடிவில் எழுத.', '8x-3y-12=0,\\; 5x-2y-7=0'],
        ['x / (21 − 24) = y / (−60 + 56) = 1 / (−16 + 15) ⇒ x/(−3) = y/(−4) = 1/(−1)', 'Apply cross-multiplication formula.', 'குறுக்குப் பெருக்கல் சூத்திரத்தைப் பயன்படுத்த.', '\\dfrac{x}{-3} = \\dfrac{y}{-4} = \\dfrac{1}{-1}'],
        ['x = 3, y = 4', 'Solve for x and y.', 'x = 3, y = 4.', 'x = 3,\\; y = 4']
      ], 'medium'),

    item('g9-ch3-ex3.13-q1-ii', '3.13', 1, 'ii', 'Cross-Multiplication Method', 'குறுக்குப் பெருக்கல் முறை',
      'Solve by cross-multiplication: 6x + 7y − 11 = 0; 5x + 2y = 13', 'குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 6x+7y−11=0; 5x+2y=13',
      '1. Solve by cross-multiplication method\n(ii) 6x + 7y − 11 = 0; 5x + 2y = 13',
      '1. குறுக்குப் பெருக்கல் முறையைப் பயன்படுத்தித் தீர்க்க\n(ii) 6x + 7y − 11 = 0; 5x + 2y = 13',
      '6x + 7y - 11 = 0;\\quad 5x + 2y - 13 = 0',
      'x = 3, y = −1', 'x = 3, y = −1', 'x = 3,\\; y = -1', [
        ['6x + 7y − 11 = 0 and 5x + 2y − 13 = 0', 'Standard form.', 'திட்ட வடிவம்.', '6x+7y-11=0,\\; 5x+2y-13=0'],
        ['x / (−91 + 22) = y / (−55 + 78) = 1 / (12 − 35) ⇒ x/(−69) = y/23 = 1/(−23)', 'Cross-multiply.', 'குறுக்குப் பெருக்கல் செய்க.', '\\dfrac{x}{-69} = \\dfrac{y}{23} = \\dfrac{1}{-23}'],
        ['x = 3, y = −1', 'Solve for x and y.', 'x = 3, y = −1.', 'x = 3,\\; y = -1']
      ], 'medium'),

    item('g9-ch3-ex3.13-q1-iii', '3.13', 1, 'iii', 'Cross-Multiplication Method', 'குறுக்குப் பெருக்கல் முறை',
      'Solve by cross-multiplication: 2/x + 3/y = 5; 3/x − 1/y + 9 = 0', 'குறுக்குப் பெருக்கல் முறையில் தீர்க்க: 2/x + 3/y = 5; 3/x − 1/y + 9 = 0',
      '1. Solve by cross-multiplication method\n(iii) 2/x + 3/y = 5; 3/x − 1/y + 9 = 0',
      '1. குறுக்குப் பெருக்கல் முறையைப் பயன்படுத்தித் தீர்க்க\n(iii) 2/x + 3/y = 5; 3/x − 1/y + 9 = 0',
      '\\dfrac{2}{x} + \\dfrac{3}{y} - 5 = 0;\\quad \\dfrac{3}{x} - \\dfrac{1}{y} + 9 = 0',
      'x = −1/2, y = 1/3', 'x = −1/2, y = 1/3', 'x = -\\dfrac{1}{2},\\; y = \\dfrac{1}{3}', [
        ['Let u = 1/x, v = 1/y (x, y ≠ 0): 2u + 3v − 5 = 0; 3u − v + 9 = 0', 'Substitute u, v.', 'u = 1/x, v = 1/y என்க.', '2u + 3v - 5 = 0;\\; 3u - v + 9 = 0'],
        ['u / (27 − 5) = v / (−15 − 18) = 1 / (−2 − 9) ⇒ u/22 = v/(−33) = 1/(−11)', 'Cross-multiply.', 'குறுக்குப் பெருக்கல் செய்க.', '\\dfrac{u}{22} = \\dfrac{v}{-33} = \\dfrac{1}{-11}'],
        ['u = −2, v = 3 ⇒ x = −1/2, y = 1/3', 'Invert to get x, y.', 'x = −1/2, y = 1/3.', 'x = -\\dfrac{1}{2},\\; y = \\dfrac{1}{3}']
      ], 'medium'),

    item('g9-ch3-ex3.13-q2', '3.13', 2, '', 'Cross-Multiplication Method', 'குறுக்குப் பெருக்கல் முறை',
      'Count ₹2 and ₹5 coins in Akshaya’s purse', '₹2 மற்றும் ₹5 நாணயங்களின் எண்ணிக்கை',
      '2. Akshaya has 2 rupee coins and 5 rupee coins in her purse. If in all she has 80 coins totalling ₹220, how many coins of each kind does she have.',
      '2. அட்சயா தனது பணப்பையில் (purse) இரண்டு ரூபாய் நாணயங்களையும், ஐந்து ரூபாய் நாணயங்களையும் வைத்திருந்தாள். அவள் மொத்தமாக ₹220 மதிப்புடைய 80 நாணயங்களை வைத்திருந்தாள் எனில், ஒவ்வொன்றிலும் எத்தனை நாணயங்கள் வைத்திருந்தாள்.',
      'x + y - 80 = 0;\\quad 2x + 5y - 220 = 0',
      '60 two-rupee coins and 20 five-rupee coins', '60 இரண்டு ரூபாய் நாணயங்கள் மற்றும் 20 ஐந்து ரூபாய் நாணயங்கள்',
      '60\\text{ (Rs. 2)},\\; 20\\text{ (Rs. 5)}', [
        ['x + y − 80 = 0 and 2x + 5y − 220 = 0', 'Let ₹2 coins = x, ₹5 coins = y.', '₹2 நாணயங்கள் x, ₹5 நாணயங்கள் y என்க.', 'x+y-80=0,\\; 2x+5y-220=0'],
        ['x / (−220 + 400) = y / (−160 + 220) = 1 / (5 − 2) ⇒ x/180 = y/60 = 1/3', 'Apply cross-multiplication.', 'குறுக்குப் பெருக்கல் செய்க.', '\\dfrac{x}{180} = \\dfrac{y}{60} = \\dfrac{1}{3}'],
        ['x = 60, y = 20', '60 ₹2 coins and 20 ₹5 coins.', 'x = 60, y = 20.', 'x = 60,\\; y = 20']
      ], 'easy'),

    item('g9-ch3-ex3.13-q3', '3.13', 3, '', 'Cross-Multiplication Method', 'குறுக்குப் பெருக்கல் முறை',
      'Time for each pipe to fill a swimming pool', 'குழாய்கள் நீச்சல் குளத்தை நிரப்பும் நேரம்',
      '3. It takes 24 hours to fill a swimming pool using two pipes. If the pipe of larger diameter is used for 8 hours and the pipe of the smaller diameter is used for 18 hours. Only half of the pool is filled. How long would each pipe take to fill the swimming pool.',
      '3. இரு வெவ்வேறு அளவு விட்டமுடைய குழாய்கள் மூலம் ஒரு நீச்சல் குளத்தில் முழுமையாக நீர் நிரப்ப 24 மணி நேரம் ஆகும். அதிக விட்டமுடைய குழாயை 8 மணி நேரமும் குறைந்த விட்டமுடைய குழாயை 18 மணி நேரமும் பயன்படுத்தி நீர் நிரப்பினால் நீச்சல் குளத்தில் பாதி அளவு நீர் நிரம்பும் எனில், தனித்தனியாக அந்தக் குழாய்களைக் கொண்டு நீச்சல் குளம் முழுவதிலும் நீர் நிரப்ப ஆகும் கால அளவுகளைக் காண்க.',
      '\\dfrac{24}{x} + \\dfrac{24}{y} = 1;\\quad \\dfrac{8}{x} + \\dfrac{18}{y} = \\dfrac{1}{2}',
      'Larger pipe: 40 hours; Smaller pipe: 60 hours', 'பெரிய குழாய்: 40 மணி நேரம்; சிறிய குழாய்: 60 மணி நேரம்',
      'x = 40\\text{ hrs},\\; y = 60\\text{ hrs}', [
        ['Let u = 1/x, v = 1/y: 24u + 24v − 1 = 0 and 16u + 36v − 1 = 0', 'Work rates per hour.', 'u = 1/x, v = 1/y என்க.', '24u+24v-1=0,\\; 16u+36v-1=0'],
        ['u / (−24 + 36) = v / (−16 + 24) = 1 / (864 − 384) ⇒ u/12 = v/8 = 1/480', 'Cross-multiply.', 'குறுக்குப் பெருக்கல் செய்க.', '\\dfrac{u}{12} = \\dfrac{v}{8} = \\dfrac{1}{480}'],
        ['u = 1/40, v = 1/60 ⇒ x = 40 hrs, y = 60 hrs', 'Invert rates to get fill times.', 'x = 40 மணி நேரம், y = 60 மணி நேரம்.', 'x = 40,\\; y = 60']
      ], 'difficult'),

    // ==================== EXERCISE 3.14 (6 items) ====================
    item('g9-ch3-ex3.14-q1', '3.14', 1, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Find the two-digit number', 'ஈரிலக்க எண் காண்க',
      '1. The sum of a two digit number and the number formed by interchanging the digits is 110. If 10 is subtracted from the first number, the new number is 4 more than 5 times the sums of the digits of the first number. Find the first number.',
      '1. ஓர் ஈரிலக்க எண்ணையும் அதன் இலக்கங்களை மாற்றுவதால் கிடைக்கும் எண்ணையும் கூட்டினால் 110 கிடைக்கும். கொடுக்கப்பட்ட அந்த ஈரிலக்க எண்ணிலிருந்து 10-ஐக் கழித்தால் அது கொடுக்கப்பட்ட ஈரிலக்க எண்ணின் இலக்கங்களின் கூடுதலின் 5 மடங்கை விட 4 அதிகம் எனில், அந்த எண்ணைக் காண்க.',
      '(10x+y)+(10y+x)=110;\\quad (10x+y)-10 = 5(x+y)+4',
      '64', '64', '64', [
        ['11(x + y) = 110 ⇒ x + y = 10', 'First condition.', 'முதல் நிபந்தனை: x + y = 10.', 'x + y = 10'],
        ['10x + y − 10 = 5(10) + 4 = 54 ⇒ 10x + y = 64', 'Substitute x + y = 10 into second condition.', 'இரண்டாம் நிபந்தனையில் x + y = 10 எனப் பிரதியிட 10x + y = 64.', '10x + y = 64']
      ], 'medium'),

    item('g9-ch3-ex3.14-q2', '3.14', 2, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Find the fraction', 'பின்னம் காண்க',
      '2. The sum of the numerator and denominator of a fraction is 12. If the denominator is increased by 3, the fraction becomes 1/2. Find the fraction.',
      '2. ஒரு பின்னத்தின் பகுதி மற்றும் தொகுதியின் கூடுதல் 12. அப்பின்னத்தின் பகுதியுடன் 3-ஐக் கூட்டினால் அதன் மதிப்பு 1/2 ஆகும் எனில், அப்பின்னத்தைக் காண்க.',
      'x + y = 12;\\quad \\dfrac{x}{y + 3} = \\dfrac{1}{2}',
      '5/7', '5/7', '\\dfrac{5}{7}', [
        ['x + y = 12 and 2x = y + 3 ⇒ 2x − y = 3', 'Form two linear equations.', 'x + y = 12 மற்றும் 2x − y = 3.', 'x + y = 12;\\; 2x - y = 3'],
        ['Add: 3x = 15 ⇒ x = 5, y = 7 ⇒ Fraction = 5/7', 'Solve and form x/y.', 'x = 5, y = 7; பின்னம் = 5/7.', '\\dfrac{5}{7}']
      ], 'easy'),

    item('g9-ch3-ex3.14-q3', '3.14', 3, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Angles of cyclic quadrilateral ABCD', 'வட்ட நாற்கரம் ABCD-இன் கோணங்கள் காண்க',
      '3. ABCD is a cyclic quadrilateral such that ∠A = (4y + 20)°, ∠B = (3y − 5)°, ∠C = (4x)° and ∠D = (7x + 5)°. Find the four angles.',
      '3. ABCD என்ற வட்ட நாற்கரத்தில் ∠A = (4y + 20)°, ∠B = (3y − 5)°, ∠C = (4x)° மற்றும் ∠D = (7x + 5)° எனில், நான்கு கோணங்களையும் காண்க.',
      '\\angle A + \\angle C = 180^\\circ;\\quad \\angle B + \\angle D = 180^\\circ',
      '∠A = 120°, ∠B = 70°, ∠C = 60°, ∠D = 110°',
      '∠A = 120°, ∠B = 70°, ∠C = 60°, ∠D = 110°',
      '\\angle A=120^\\circ,\\; \\angle B=70^\\circ,\\; \\angle C=60^\\circ,\\; \\angle D=110^\\circ', [
        ['Opposite angles of cyclic quad sum to 180°: x + y = 40; 7x + 3y = 180', 'Use ∠A + ∠C = 180° and ∠B + ∠D = 180°.', 'எதிர்க் கோணங்களின் கூடுதல் 180°.', 'x + y = 40;\\; 7x + 3y = 180'],
        ['4x = 60 ⇒ x = 15, y = 25', 'Eliminate y.', 'y-ஐ நீக்க x = 15, y = 25.', 'x = 15,\\; y = 25'],
        ['∠A = 120°, ∠B = 70°, ∠C = 60°, ∠D = 110°', 'Substitute x and y into each angle.', 'கோணங்கள்: 120°, 70°, 60°, 110°.', '120^\\circ,\\; 70^\\circ,\\; 60^\\circ,\\; 110^\\circ']
      ], 'medium'),

    item('g9-ch3-ex3.14-q4', '3.14', 4, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Actual price of T.V. and fridge', 'தொலைக்காட்சிப் பெட்டி மற்றும் குளிர்சாதனப் பெட்டியின் விலை',
      '4. On selling a T.V. at 5% gain and a fridge at 10% gain, a shopkeeper gains ₹2000. But if he sells the T.V. at 10% gain and the fridge at 5% loss, he gains Rs.1500 on the transaction. Find the actual price of the T.V. and the fridge.',
      '4. ஒரு தொலைக்காட்சிப் பெட்டியை 5% இலாபத்திற்கும், ஒரு குளிர்சாதனப் பெட்டியை 10% இலாபத்திற்கும் விற்பதால் கடைக்காரருக்கு நிகர இலாபம் ₹2,000 கிடைக்கிறது. ஆனால் அவர் ஒரு தொலைக்காட்சிப் பெட்டியை 10% இலாபத்திற்கும், ஒரு குளிர்சாதனப் பெட்டியை 5% நட்டத்திற்கும் விற்பதால் அவரின் நிகர இலாபம் ₹1,500 கிடைக்கிறது எனில், தொலைக்காட்சிப் பெட்டி மற்றும் குளிர்சாதனப் பெட்டியின் சரியான விலைகளைக் காண்க.',
      '0.05x + 0.10y = 2000;\\quad 0.10x - 0.05y = 1500',
      'T.V.: ₹20,000; Fridge: ₹10,000', 'தொலைக்காட்சிப் பெட்டி: ₹20,000; குளிர்சாதனப் பெட்டி: ₹10,000',
      '\\text{TV} = \\text{Rs.\\,}20,000,\\; \\text{Fridge} = \\text{Rs.\\,}10,000', [
        ['x + 2y = 40000 and 2x − y = 30000', 'Multiply both equations by 20.', '20-ஆல் பெருக்க x + 2y = 40000; 2x − y = 30000.', 'x+2y=40000;\\; 2x-y=30000'],
        ['5x = 100000 ⇒ x = ₹20,000, y = ₹10,000', 'Eliminate y.', 'x = ₹20,000, y = ₹10,000.', 'x = 20000,\\; y = 10000']
      ], 'medium'),

    item('g9-ch3-ex3.14-q5', '3.14', 5, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Find two numbers in ratio 5:6', '5:6 விகிதத்தில் உள்ள இரு எண்கள் காண்க',
      '5. Two numbers are in the ratio 5 : 6. If 8 is subtracted from each of the numbers, the ratio becomes 4 : 5. Find the numbers.',
      '5. இரு எண்கள் 5 : 6 என்ற விகிதத்தில் உள்ளன. அவை ஒவ்வொன்றிலிருந்தும் முறையே 8-ஐக் கழித்தால் அவற்றின் விகிதம் 4 : 5 என மாறும் எனில், அந்த எண்களைக் காண்க.',
      '\\dfrac{x}{y} = \\dfrac{5}{6};\\quad \\dfrac{x - 8}{y - 8} = \\dfrac{4}{5}',
      '40 and 48', '40 மற்றும் 48', '40,\\; 48', [
        ['6x − 5y = 0 and 5x − 4y = 8', 'Cross-multiply both proportions.', 'குறுக்குப் பெருக்கல்: 6x − 5y = 0; 5x − 4y = 8.', '6x-5y=0;\\; 5x-4y=8'],
        ['25x − 24x = 40 ⇒ x = 40, y = 48', 'Eliminate y.', 'x = 40, y = 48.', 'x = 40,\\; y = 48']
      ], 'easy'),

    item('g9-ch3-ex3.14-q6', '3.14', 6, '', 'Linear Word Problems', 'நேரிய சமன்பாட்டுக் கணக்குகள்',
      'Days for 1 Indian or 1 Chinese alone to finish work', 'தனித்தனியாக வேலையை முடிக்கும் நாட்கள்',
      '6. 4 Indians and 4 Chinese can do a piece of work in 3 days. While 2 Indians and 5 Chinese can finish it in 4 days. How long would it take for 1 Indian to do it? How long would it take for 1 Chinese to do it?',
      '6. 4 இந்தியர்கள் மற்றும் 4 சீனர்கள் சேர்ந்து 3 நாள்களில் ஒரு வேலையை முடிக்கிறார்கள். 2 இந்தியர்கள் மற்றும் 5 சீனர்கள் சேர்ந்து அதே வேலையை 4 நாள்களில் முடிக்கிறார்கள் எனில், இப்பணியைத் தனியாக ஒரு இந்தியர் எத்தனை நாள்களில் செய்வார்? ஒரு சீனர் தனியாக எத்தனை நாள்களில் செய்வார்?',
      '\\dfrac{4}{x} + \\dfrac{4}{y} = \\dfrac{1}{3};\\quad \\dfrac{2}{x} + \\dfrac{5}{y} = \\dfrac{1}{4}',
      '1 Indian: 18 days; 1 Chinese: 36 days', '1 இந்தியர்: 18 நாள்கள்; 1 சீனர்: 36 நாள்கள்',
      'x = 18\\text{ days},\\; y = 36\\text{ days}', [
        ['Let u = 1/x, v = 1/y: 4u + 4v = 1/3; 2u + 5v = 1/4', 'Set up 1-day work equations.', 'ஒரு நாள் வேலை: 4u + 4v = 1/3; 2u + 5v = 1/4.', '4u+4v=\\dfrac{1}{3};\\; 2u+5v=\\dfrac{1}{4}'],
        ['6v = 1/2 − 1/3 = 1/6 ⇒ v = 1/36 ⇒ y = 36; u = 1/18 ⇒ x = 18', 'Eliminate u.', 'v = 1/36 ⇒ y = 36; u = 1/18 ⇒ x = 18.', 'x = 18,\\; y = 36']
      ], 'difficult')
  ];

  for (const entry of entries) {
    if (grade.items.some(q => q.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Algebra source ID ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
