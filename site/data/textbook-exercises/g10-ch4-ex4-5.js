/* TN SCERT revised 2025, Grade 10 Geometry, Exercise 4.5. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES[10];
  const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 4);
  const both = (en, ta) => ({en, ta});
  const tex = String.raw;
  const formula = (fallback, latex, display = false) => ({fallback, latex, display});
  const literal = values => values.map(value => value.fallback ?? value).join('');
  const parts = value => typeof value === 'string' ? [value] : value.latex ? [value] : value;
  const step = (en, ta, eq, latex, whyEn, whyTa) => ({
    en, ta, ...(eq ? {eq, math: formula(eq, latex, true)} : {}), why: both(whyEn, whyTa)
  });

  function question(number, en, ta, options, correctIndex, concept, steps, figure) {
    const id = 'c10-4-ex4-5-q' + number;
    const questionMath = both([number + '. ', ...parts(en)], [number + '. ', ...parts(ta)]);
    const choices = options.map((option, index) => both(
      ['(' + 'ABCD'[index] + ') ', ...parts(option.en ?? option)],
      ['(' + 'அஆஇஈ'[index] + ') ', ...parts(option.ta ?? option)]
    ));
    const pdf = both(number <= 10 ? 205 : 206, number <= 9 ? 212 : 213);
    const answerMath = choices[correctIndex];
    return {
      id, classNum: 10, chapter: '4', exercise: '4.5', kind: 'textbook', topic: chapter.title,
      label: both('Exercise 4.5 · Q' + number, 'பயிற்சி 4.5 · வினா ' + number),
      title: both('Multiple choice', 'பலவுள் தெரிவு'),
      q: both(literal(questionMath.en), literal(questionMath.ta)), questionMath,
      steps, choices, correctIndex, answerMath, answer: literal(answerMath.en), answerTa: literal(answerMath.ta),
      conceptId: 'g10-ch4-' + concept,
      hint: steps[0].why,
      edition: '2025', translationReview: 'pending', tamilQuestionSourceVerified: true, tamilWorkedSolutionReview: 'pending',
      source: 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view',
      reference: `TN SCERT Grade 10 Mathematics, revised 2025. EN printed p. ${pdf.en - 6} / PDF p. ${pdf.en}. TA printed p. ${pdf.ta - 6} / PDF p. ${pdf.ta}.`,
      sourceFidelity: {status: 'page-visual-checked', sourcePdfPage: pdf},
      ...(figure ? {figureSrc: `assets/grade10-geometry/ex4-5-q${number}.svg`, figureAlt: figure, figureCaption: figure} : {})
    };
  }

  const ratio = formula('AB/DE = BC/FD', tex`\dfrac{AB}{DE}=\dfrac{BC}{FD}`);
  const options = [
    question(1, ['If in triangles ABC and EDF, ', ratio, ' then they will be similar, when'],
      [ratio, ' எனில், ABC மற்றும் EDF எப்பொழுது வடிவொத்தவையாக அமையும்.'],
      ['∠B = ∠E','∠A = ∠D','∠B = ∠D','∠A = ∠F'], 2, 'similarity-criteria', [
        step('The proportional sides AB and BC meet at B. Their partners DE and FD meet at D.',
          'விகிதச் சமத்தில் உள்ள AB, BC ஆகிய பக்கங்கள் B-யில் சந்திக்கின்றன. அவற்றின் ஒத்த பக்கங்களான DE, FD ஆகியவை D-யில் சந்திக்கின்றன.',
          '∠ABC, ∠EDF', tex`\angle ABC,\quad\angle EDF`, 'Locate the shared vertex of each pair of sides.', 'ஒவ்வொரு பக்கச் சோடியின் பொது முனையைக் கண்டறிக.'),
        step('The SAS similarity criterion requires these included angles to be equal.',
          'பக்கம்–கோணம்–பக்கம் வடிவொத்த விதிப்படி, பக்கங்களுக்கு இடைப்பட்ட இக்கோணங்கள் சமமாக இருக்க வேண்டும்.',
          '∠B = ∠D', tex`\angle B=\angle D`, 'SAS uses the angle enclosed by the two proportional sides.', 'விகிதச் சமமான இரு பக்கங்களுக்கு இடைப்பட்ட கோணமே இவ்விதிக்குத் தேவை.')
      ]),
    question(2, 'In △LMN, ∠L = 60°, ∠M = 50°. If △LMN ∼ △PQR then the value of ∠R is',
      '△LMN-யில் ∠L = 60°, ∠M = 50° மேலும், △LMN ∼ △PQR எனில், ∠R-யின் மதிப்பு',
      ['40°','70°','30°','110°'], 1, 'similarity-vs-congruence', [
        step('Subtract the two known angles from the angle sum of triangle LMN.',
          'LMN முக்கோணத்தின் கோணங்களின் கூடுதலான 180°-இலிருந்து தெரிந்த இரு கோணங்களைக் கழிக்கவும்.',
          '∠N = 180° − 60° − 50° = 70°', tex`\angle N=180^\circ-60^\circ-50^\circ=70^\circ`, 'A triangle’s interior angles sum to 180°.', 'முக்கோணத்தின் உட்கோணங்களின் கூடுதல் 180° ஆகும்.'),
        step('N and R are both third in the similarity statement, so their angles are equal.',
          'வடிவொப்புமைக் கூற்றில் மூன்றாவது இடத்தில் உள்ள N, R ஆகியவை ஒத்த முனைகள். ஆகவே அவற்றின் கோணங்கள் சமம்.',
          '∠R = ∠N = 70°', tex`\angle R=\angle N=70^\circ`, 'The written vertex order tells you which angles correspond.', 'கூற்றில் முனைகள் எழுதப்பட்ட வரிசை ஒத்த கோணங்களைக் காட்டுகிறது.')
      ]),
    question(3, 'If △ABC is an isosceles triangle with ∠C = 90° and AC = 5 cm, then AB is',
      'இருசமபக்க முக்கோணம் △ABC-யில் ∠C = 90° மற்றும் AC = 5 செ.மீ, எனில் AB ஆனது',
      [both('2.5 cm','2.5 செ.மீ'),both('5 cm','5 செ.மீ'),both('10 cm','10 செ.மீ'),
        both([formula('5√2',tex`5\sqrt2`),' cm'],[formula('5√2',tex`5\sqrt2`),' செ.மீ'])], 3, 'pythagoras', [
        step('The two equal sides must be the legs AC and BC. AB is opposite the right angle.',
          'செங்கோணத்தைத் தாங்கும் AC, BC ஆகிய இரு பக்கங்கள் சமம். செங்கோணத்திற்கு எதிர்ப்பக்கம் AB.',
          'AC = BC = 5', tex`AC=BC=5`, 'The hypotenuse is strictly longer than either leg.', 'கர்ணம் செங்கோணத்தைத் தாங்கும் ஒவ்வொரு பக்கத்தைவிடவும் நீளமானது.'),
        step('Apply Pythagoras and take the positive square root to get the length.',
          'பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தி, நீளத்திற்கான மிகை வர்க்கமூலத்தை எடுக்கவும்.',
          'AB² = 25 + 25 = 50; AB = 5√2', tex`\begin{aligned}AB^2&=5^2+5^2=50\\AB&=5\sqrt2\end{aligned}`, 'The hypotenuse squared is the sum of the squares of the legs.', 'கர்ணத்தின் வர்க்கம் மற்ற இரு பக்கங்களின் வர்க்கக் கூடுதலுக்குச் சமம்.')
      ]),
    question(4, 'In a given figure ST ∥ QR, PS = 2 cm and SQ = 3 cm. Then the ratio of the area of △PQR to the area of △PST is',
      'கொடுக்கப்பட்ட படத்தில் ST ∥ QR, PS = 2 செ.மீ மற்றும் SQ = 3 செ.மீ. எனில், △PQR-யின் பரப்பளவுக்கும் △PST-யின் பரப்பளவுக்கும் உள்ள விகிதம்',
      ['25 : 4','25 : 7','25 : 11','25 : 13'], 0, 'similarity-results', [
        step('Triangles PQR and PST share the angle at P. ST ∥ QR gives equal corresponding angles, so the triangles are similar by AA. The full side PQ is 5 cm.',
          'PQR, PST முக்கோணங்களுக்குப் P-யில் பொது கோணம் உள்ளது. ST ∥ QR என்பதால் ஒத்த கோணங்கள் சமம். எனவே கோணம்–கோணம் விதிப்படி அவை வடிவொத்தவை. முழுப் பக்கம் PQ என்பது 5 செ.மீ.',
          'PQ = PS + SQ = 2 + 3 = 5', tex`PQ=PS+SQ=2+3=5`, 'Compare the full side with the side from the shared vertex.', 'பொது முனையிலிருந்து அளக்கப்படும் இரு ஒத்த பக்கங்களை ஒப்பிடுக.'),
        step('Square the ratio of the corresponding sides to obtain the ratio of areas.',
          'ஒத்த பக்கங்களின் விகிதத்தை வர்க்கப்படுத்தினால் பரப்பளவுகளின் விகிதம் கிடைக்கும்.',
          'area(PQR)/area(PST) = (5/2)² = 25/4', tex`\dfrac{[PQR]}{[PST]}=\left(\dfrac52\right)^2=\dfrac{25}{4}`, 'Both base and altitude scale by the same factor.', 'அடிப்பக்கம், உயரம் ஆகிய இரண்டும் ஒரே விகிதத்தில் மாறுகின்றன.')
      ], both('S lies on PQ, T lies on PR and ST is parallel to QR. PS is 2 cm and SQ is 3 cm.', 'S என்பது PQ மீதும், T என்பது PR மீதும் உள்ளன. ST ∥ QR. PS 2 செ.மீ, SQ 3 செ.மீ.')),
    question(5, 'The perimeters of two similar triangles △ABC and △PQR are 36 cm and 24 cm respectively. If PQ = 10 cm, then the length of AB is',
      'இரு வடிவொத்த முக்கோணங்கள் △ABC மற்றும் △PQR-யின் சுற்றளவுகள் முறையே 36 செ.மீ மற்றும் 24 செ.மீ ஆகும். PQ = 10 செ.மீ எனில், AB-யின் நீளம்',
      [
        both([formula('6 2/3',tex`6\dfrac23`),' cm'],[formula('6 2/3',tex`6\dfrac23`),' செ.மீ']),
        both([formula('10√6/3',tex`\dfrac{10\sqrt6}{3}`),' cm'],[formula('10√6/3',tex`\dfrac{10\sqrt6}{3}`),' செ.மீ']),
        both([formula('66 2/3',tex`66\dfrac23`),' cm'],[formula('66 2/3',tex`66\dfrac23`),' செ.மீ']),
        both('15 cm','15 செ.மீ')
      ], 3, 'similarity-results', [
        step('AB corresponds to PQ. The ratio of their lengths is the ratio of the perimeters.',
          'AB-க்கு ஒத்த பக்கம் PQ. அவற்றின் நீளங்களின் விகிதம் சுற்றளவுகளின் விகிதத்திற்குச் சமம்.',
          'AB/PQ = 36/24 = 3/2', tex`\dfrac{AB}{PQ}=\dfrac{36}{24}=\dfrac32`, 'All sides scale by one common factor, so their sum scales by that factor too.', 'அனைத்துப் பக்கங்களும் ஒரே விகிதத்தில் மாறுவதால் அவற்றின் கூடுதலும் அதே விகிதத்தில் மாறும்.'),
        step('Multiply PQ by the ratio to find AB.',
          'AB-ஐக் காண PQ-ஐ அந்த விகிதத்தால் பெருக்கவும்.',
          'AB = 10 × 3/2 = 15', tex`AB=10\times\dfrac32=15`, 'The larger perimeter belongs to ABC, so its corresponding side is longer.', 'ABC-யின் சுற்றளவு அதிகம். எனவே அதன் ஒத்த பக்கத்தின் நீளமும் அதிகம்.')
      ]),
    question(6, 'If in △ABC, DE ∥ BC. AB = 3.6 cm, AC = 2.4 cm and AD = 2.1 cm then the length of AE is',
      '△ABC-யில் DE ∥ BC. AB = 3.6 செ.மீ, AC = 2.4 செ.மீ மற்றும் AD = 2.1 செ.மீ எனில், AE-யின் நீளம்',
      [both('1.4 cm','1.4 செ.மீ'),both('1.8 cm','1.8 செ.மீ'),both('1.2 cm','1.2 செ.மீ'),both('1.05 cm','1.05 செ.மீ')], 0, 'bpt-thales', [
        step('The angle at A is common and DE is parallel to BC. By AA, △ADE ∼ △ABC, matching AD to AB and AE to AC.',
          'A-யில் பொது கோணம் உள்ளது. DE ∥ BC என்பதால் கோணம்–கோணம் விதிப்படி △ADE ∼ △ABC. AD-க்கு AB-யும் AE-க்கு AC-யும் ஒத்த பக்கங்கள்.',
          'AE/AC = AD/AB', tex`\dfrac{AE}{AC}=\dfrac{AD}{AB}`, 'Parallel lines give the second pair of equal angles.', 'இணைகோடுகள் இரண்டாவது சமக் கோணச் சோடியைத் தருகின்றன.'),
        step('Use the three given lengths and solve for AE.',
          'கொடுக்கப்பட்ட மூன்று நீளங்களைப் பிரதியிட்டு AE-ஐக் காண்க.',
          'AE = 2.4 × 2.1/3.6 = 1.4', tex`AE=2.4\times\dfrac{2.1}{3.6}=1.4`, 'Multiply both sides of the proportion by AC to isolate AE.', 'AE தனியாக இருக்க, சமன்பாட்டின் இருபுறத்தையும் AC-ஆல் பெருக்குக.')
      ]),
    question(7, 'In a △ABC, AD is the bisector of ∠BAC. If AB = 8 cm, BD = 6 cm and DC = 3 cm. The length of the side AC is',
      '△ABC-யில் AD ஆனது, ∠BAC-யின் இருசமவெட்டி. AB = 8 செ.மீ, BD = 6 செ.மீ மற்றும் DC = 3 செ.மீ எனில், பக்கம் AC-யின் நீளம்',
      [both('6 cm','6 செ.மீ'),both('4 cm','4 செ.மீ'),both('3 cm','3 செ.மீ'),both('8 cm','8 செ.மீ')], 1, 'angle-bisector', [
        step('By the angle bisector theorem, the parts of BC are in the same ratio as the adjacent sides AB and AC.',
          'கோண இருசமவெட்டித் தேற்றத்தின்படி, BC-யின் பகுதிகளின் விகிதம் அடுத்துள்ள AB, AC பக்கங்களின் விகிதத்திற்குச் சமம்.',
          'AB/AC = BD/DC = 6/3 = 2', tex`\dfrac{AB}{AC}=\dfrac{BD}{DC}=\dfrac63=2`, 'Match the segment ending at B with the side ending at B.', 'B-யில் முடியும் துண்டை B-யில் முடியும் பக்கத்துடன் பொருத்துக.'),
        step('AB is twice AC, so divide 8 by 2.',
          'AB என்பது AC-யின் இருமடங்கு. எனவே 8-ஐ 2-ஆல் வகுக்கவும்.',
          'AC = 8/2 = 4', tex`AC=\dfrac82=4`, 'The shorter segment DC corresponds to the shorter adjacent side AC.', 'குறைந்த நீளமுள்ள DC-க்கு ஒத்த பக்கம் குறைந்த நீளமுள்ள AC ஆகும்.')
      ]),
    question(8, 'In the adjacent figure ∠BAC = 90° and AD ⟂ BC then',
      'கொடுக்கப்பட்ட படத்தில் ∠BAC = 90° மற்றும் AD ⟂ BC எனில்,',
      [
        formula('BD · CD = BC²',tex`BD\cdot CD=BC^2`),
        formula('AB·AC = BC²',tex`AB\cdot AC=BC^2`),
        formula('BD · CD = AD²',tex`BD\cdot CD=AD^2`),
        formula('AB · AC = AD²',tex`AB\cdot AC=AD^2`)
      ], 2, 'similarity-results', [
        step('Both small triangles have right angles at D. ∠ABD = ∠ABC, and ∠CAD is also equal to ∠ABC because both are complementary to ∠ACB. Thus △BDA ∼ △ADC by AA.',
          'சிறிய இரு முக்கோணங்களிலும் D-யில் செங்கோணம் உள்ளது. ∠ABD = ∠ABC. ∠CAD, ∠ABC ஆகிய இரண்டும் ∠ACB-யின் நிரப்புக் கோணங்கள். எனவே கோணம்–கோணம் விதிப்படி △BDA ∼ △ADC.',
          'BD/AD = AD/CD', tex`\dfrac{BD}{AD}=\dfrac{AD}{CD}`, 'Match the right angles first, then the equal acute angles.', 'முதலில் செங்கோணங்களையும், பின்னர் சமமான குறுங்கோணங்களையும் பொருத்துக.'),
        step('Cross-multiply the corresponding-leg ratios.',
          'ஒத்த பக்கங்களின் விகிதங்களில் குறுக்குப் பெருக்கல் செய்யவும்.',
          'BD · CD = AD²', tex`BD\cdot CD=AD^2`, 'AD occurs once in each ratio on opposite sides of the fraction bar.', 'ஒரு விகிதத்தில் தொகுதியிலும் மற்றொன்றில் பகுதியிலும் AD உள்ளது.')
      ], both('ABC is right-angled at A. The altitude AD meets BC at D.', 'ABC-யில் A செங்கோணம். AD என்ற குத்துக்கோடு BC-ஐ D-யில் சந்திக்கிறது.')),
    question(9, 'Two poles of heights 6 m and 11 m stand vertically on a plane ground. If the distance between their feet is 12 m, what is the distance between their tops?',
      '6 மீ மற்றும் 11 மீ உயரமுள்ள இரு கம்பங்கள் சமதளத் தரையில் செங்குத்தாக உள்ளன. அவற்றின் அடிகளுக்கு இடையேயுள்ள தொலைவு 12 மீ எனில் அவற்றின் உச்சிகளுக்கு இடையே உள்ள தொலைவு என்ன?',
      [both('13 m','13 மீ'),both('14 m','14 மீ'),both('15 m','15 மீ'),both('12.8 m','12.8 மீ')], 0, 'pythagoras', [
        step('Draw a horizontal line from the shorter top to the taller pole. The horizontal gap is 12 m, and the vertical leg is the difference in heights.',
          'குட்டைக் கம்பத்தின் உச்சியிலிருந்து உயரமான கம்பம் வரை கிடைமட்டக் கோடு வரைக. கிடைமட்ட இடைவெளி 12 மீ. செங்குத்துப் பக்கம் உயரங்களின் வேறுபாடு.',
          '11 − 6 = 5', '11-6=5', 'Use the vertical difference between the tops of the poles.', 'கம்பங்களின் உச்சிகளுக்கு இடையேயுள்ள உயர வேறுபாட்டைப் பயன்படுத்துக.'),
        step('The distance d between the tops is the hypotenuse of this right triangle.',
          'உச்சிகளுக்கு இடையிலான தொலைவு d இச்செங்கோண முக்கோணத்தின் கர்ணமாகும்.',
          'd = √(12² + 5²) = √169 = 13', tex`d=\sqrt{12^2+5^2}=\sqrt{169}=13`, 'The horizontal and vertical components meet at a right angle.', 'கிடைமட்டப் பக்கமும் செங்குத்துப் பக்கமும் செங்கோணத்தில் சந்திக்கின்றன.')
      ]),
    question(10, 'In the given figure, PR = 26 cm, QR = 24 cm, ∠PAQ = 90°, PA = 6 cm and QA = 8 cm. Find ∠PQR',
      'கொடுக்கப்பட்ட படத்தில், PR = 26 செ.மீ, QR = 24 செ.மீ, ∠PAQ = 90°, PA = 6 செ.மீ மற்றும் QA = 8 செ.மீ எனில் ∠PQR-ஐக் காண்க.',
      ['80°','85°','75°','90°'], 3, 'pythagoras', [
        step('Use the right angle at A to calculate PQ in triangle PAQ.',
          'PAQ முக்கோணத்தில் A-யில் உள்ள செங்கோணத்தைப் பயன்படுத்தி PQ-ஐக் கணக்கிடுக.',
          'PQ² = 6² + 8² = 100; PQ = 10', tex`PQ^2=6^2+8^2=100,\quad PQ=10`, 'PQ is the side common to both triangles.', 'PQ என்பது இரு முக்கோணங்களுக்கும் பொதுப் பக்கம்.'),
        step('In triangle PQR the squares of the sides meeting at Q add up to the square of PR. By the converse of Pythagoras, the angle at Q is a right angle.',
          'PQR முக்கோணத்தில் Q-யில் சந்திக்கும் பக்கங்களின் வர்க்கக் கூடுதல் PR-யின் வர்க்கத்திற்குச் சமம். பிதாகரஸ் தேற்றத்தின் மறுதலைப்படி Q-யில் உள்ள கோணம் செங்கோணம்.',
          '10² + 24² = 676 = 26²; ∠PQR = 90°', tex`\begin{aligned}10^2+24^2&=676=26^2\\\angle PQR&=90^\circ\end{aligned}`, 'The converse establishes the right angle from the side lengths.', 'பக்க நீளங்களிலிருந்து செங்கோணத்தை நிறுவ மறுதலை உதவுகிறது.')
      ], both('A lies inside PQR. PA and QA meet at a right angle, and PQ is a shared side.', 'A என்பது PQR-இன் உட்புறம் உள்ளது. PA, QA செங்கோணத்தில் சந்திக்கின்றன. PQ பொதுப் பக்கம்.')),
    question(11, 'A tangent is perpendicular to the radius at the', 'வட்டத்தின் தொடுகோடும் அதன் ஆரமும் செங்குத்தாக அமையும் இடம்',
      [both('centre','மையம்'),both('point of contact','தொடு புள்ளி'),both('infinity','முடிவிலி'),both('chord','நாண்')], 1, 'circles-tangents', [
        step('Draw the radius from O to the point of contact T. The tangent line through T is perpendicular to OT at T.',
          'மையம் O-விலிருந்து தொடுபுள்ளி T வரை ஆரம் வரைக. T வழியாகச் செல்லும் தொடுகோடு T-யில் OT-க்குச் செங்குத்தாகும்.',
          null, null, 'Recall where the radius and tangent meet.', 'ஆரமும் தொடுகோடும் எங்கு சந்திக்கின்றன என்பதை நினைவுகூர்க.')
      ]),
    question(12, 'How many tangents can be drawn to the circle from an exterior point?', 'வட்டத்தின் வெளிப்புறப் புள்ளியிலிருந்து வட்டத்திற்கு எத்தனை தொடுகோடுகள் வரையலாம்?',
      [both('one','ஒன்று'),both('two','இரண்டு'),both('infinite','முடிவற்ற எண்ணிக்கை'),both('zero','பூஜ்ஜியம்')], 1, 'circles-tangents', [
        step('Join the external point P to the centre O. The circle with diameter OP intersects the given circle twice. At either intersection T, ∠OTP is a right angle, so PT is a tangent. Every tangent through P has this property, so there are exactly two.',
          'வெளிப்புறப் புள்ளி P-ஐ மையம் O-வுடன் இணைக்கவும். OP-ஐ விட்டமாகக் கொண்ட வட்டம் கொடுத்த வட்டத்தை இரு புள்ளிகளில் வெட்டும். ஒவ்வொரு வெட்டுப்புள்ளி T-யிலும் ∠OTP செங்கோணம். எனவே PT தொடுகோடு. P வழியாகச் செல்லும் ஒவ்வொரு தொடுகோட்டுக்கும் இப்பண்பு இருப்பதால் சரியாக இரு தொடுகோடுகள் கிடைக்கும்.',
          '∠OTP = 90°', tex`\angle OTP=90^\circ`, 'The angle subtended by a diameter at a point on its circle is a right angle.', 'ஒரு வட்டத்தின் விட்டம் அதன் மீதுள்ள புள்ளியில் தாங்கும் கோணம் செங்கோணமாகும்.')
      ]),
    question(13, 'The two tangents from an external points P to a circle with centre at O are PA and PB. If ∠APB = 70° then the value of ∠AOB is',
      'O-வை மையமாக உடைய வட்டத்திற்கு, வெளியேயுள்ள புள்ளி P-யிலிருந்து வரையப்பட்ட தொடுகோடுகள் PA மற்றும் PB ஆகும். ∠APB = 70° எனில், ∠AOB-யின் மதிப்பு',
      ['100°','110°','120°','130°'], 1, 'circles-tangents', [
        step('The radii OA and OB are perpendicular to PA and PB respectively, so angles at A and B of quadrilateral OAPB are right angles.',
          'OA, OB ஆரங்கள் முறையே PA, PB-க்குச் செங்குத்து. எனவே OAPB நாற்கரத்தில் A, B ஆகிய முனைகளில் செங்கோணங்கள் உள்ளன.',
          '∠OAP = ∠OBP = 90°', tex`\angle OAP=\angle OBP=90^\circ`, 'A radius is perpendicular to the tangent at the point of contact.', 'தொடுபுள்ளியில் ஆரமும் தொடுகோடும் செங்குத்து.'),
        step('Subtract the three known interior angles from 360°.',
          'நாற்கரத்தின் கோணக் கூடுதல் 360°-இலிருந்து தெரிந்த மூன்று கோணங்களைக் கழிக்கவும்.',
          '∠AOB = 360° − 90° − 90° − 70° = 110°', tex`\begin{aligned}\angle AOB&=360^\circ-180^\circ-70^\circ\\&=110^\circ\end{aligned}`, 'The two right angles together use half of the quadrilateral’s angle sum.', 'இரு செங்கோணங்களின் கூடுதல் நாற்கரத்தின் கோணக் கூடுதலில் பாதி.')
      ]),
    question(14, 'In figure CP and CQ are tangents to a circle with centre at O. ARB is another tangent touching the circle at R. If CP = 11 cm and BC = 7 cm, then the length of BR is',
      'படத்தில் O-வை மையமாக உடைய வட்டத்தின் தொடுகோடுகள் CP மற்றும் CQ ஆகும். ARB ஆனது வட்டத்தின் மீதுள்ள புள்ளி R வழியாகச் செல்லும் மற்றொரு தொடுகோடு ஆகும். CP = 11 செ.மீ மற்றும் BC = 7 செ.மீ எனில் BR-யின் நீளம்',
      [both('6 cm','6 செ.மீ'),both('5 cm','5 செ.மீ'),both('8 cm','8 செ.மீ'),both('4 cm','4 செ.மீ')], 3, 'circles-tangents', [
        step('CP and CQ are tangents from the same external point C, so their lengths agree. B lies between C and Q.',
          'CP, CQ ஒரே வெளிப்புறப் புள்ளி C-யிலிருந்து வரையப்பட்ட தொடுகோடுகள். எனவே அவற்றின் நீளங்கள் சமம். C, Q இடையே B உள்ளது.',
          'CQ = CP = 11; BQ = 11 − 7 = 4', tex`\begin{aligned}CQ&=CP=11\\BQ&=11-7=4\end{aligned}`, 'Subtract the part CB to leave the part BQ.', 'BQ-ஐக் காண முழு நீளத்திலிருந்து CB பகுதியைக் கழிக்கவும்.'),
        step('The tangents BQ and BR are drawn from the same point B, so BR equals BQ.',
          'BQ, BR ஆகியவை ஒரே புள்ளி B-யிலிருந்து வரையப்பட்ட தொடுகோடுகள். ஆகவே BR என்பது BQ-க்குச் சமம்.',
          'BR = BQ = 4', tex`BR=BQ=4`, 'Apply the equal-tangent rule a second time, now at B.', 'சமத் தொடுகோட்டுத் தேற்றத்தை இம்முறை B-க்குப் பயன்படுத்துக.')
      ], both('CP and CQ touch the circle at P and Q. The tangent at R meets CP at A and CQ at B.', 'CP, CQ ஆகியவை வட்டத்தை P, Q-வில் தொடுகின்றன. R-இல் தொடுகோடு CP-ஐ A-யிலும் CQ-ஐ B-யிலும் சந்திக்கிறது.')),
    question(15, 'In figure if PR is tangent to the circle at P and O is the centre of the circle, then ∠POQ is',
      'படத்தில் உள்ளவாறு O-வை மையமாகக் கொண்ட வட்டத்தின் தொடுகோடு PR எனில், ∠POQ ஆனது',
      ['120°','100°','110°','90°'], 0, 'circles-tangents', [
        step('The tangent PR is perpendicular to OP. The chord PQ makes 60° with PR in the figure, leaving 30° between PO and PQ.',
          'PR தொடுகோடு OP ஆரத்திற்குச் செங்குத்து. படத்தில் PQ நாணும் PR தொடுகோடும் 60° கோணத்தை அமைக்கின்றன. ஆகவே PO-க்கும் PQ-க்கும் இடையேயுள்ள கோணம் 30°.',
          '∠OPQ = 90° − 60° = 30°', tex`\angle OPQ=90^\circ-60^\circ=30^\circ`, 'The chord divides the right angle at P into two angles.', 'P-யில் உள்ள செங்கோணத்தை நாண் இரு கோணங்களாகப் பிரிக்கிறது.'),
        step('OP and OQ are radii, so the two base angles are equal. Subtract both from the triangle’s angle sum.',
          'OP, OQ ஆகிய இரண்டும் ஆரங்கள். எனவே அடிக்கோணங்கள் சமம். முக்கோணத்தின் கோணக் கூடுதலிலிருந்து இரண்டையும் கழிக்கவும்.',
          '∠POQ = 180° − 2 × 30° = 120°', tex`\angle POQ=180^\circ-2\times30^\circ=120^\circ`, 'Equal sides of an isosceles triangle face equal angles.', 'இருசமபக்க முக்கோணத்தில் சம பக்கங்களுக்கு எதிர்க் கோணங்கள் சமம்.')
      ], both('PR is tangent at P. The angle between the chord PQ and ray PR is 60°.', 'PR என்பது P-யில் தொடுகோடு. PQ நாணுக்கும் PR கதிருக்கும் இடைப்பட்ட கோணம் 60°.'))
  ];

  chapter.textbookQuestionIds ||= [];
  const ids = new Set(grade.items.map(item => item.id));
  for (const item of options) {
    if (ids.has(item.id)) throw Error('Duplicate textbook ID ' + item.id);
    ids.add(item.id);
    grade.items.push(item);
    chapter.textbookQuestionIds.push(item.id);
  }
})();
