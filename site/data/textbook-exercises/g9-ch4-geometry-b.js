/* TN SCERT revised 2025, Grade 9, Exercise 4.4. */
(() => {
  'use strict';
  const {batch,step} = window.TriggleGrade9Geometry;
  const add = batch(4,5,179,190);
  const tex = String.raw;
  const degrees = (name,value) => ['', '', name+' = '+value+'°', name.replace('∠','\\angle ')+'='+value+'^\\circ'];
  add(1,['Find the value of x in the given figure.','கொடுக்கப்பட்ட படத்தில் x° இன் மதிப்பு காண்க.'],[
    step('In cyclic quadrilateral ADCB, ∠ADC = 120°, so its opposite angle ∠ABC is 60°. As AB is the diameter, ∠ACB is 90°.',
      'வட்ட நாற்கரம் ADCB இல் ∠ADC = 120°. எனவே அதன் எதிர்க்கோணம் ∠ABC = 60°. AB விட்டம் என்பதால் ∠ACB = 90°.',
      'Cyclic opposite angles are supplementary, and an angle in a semicircle is a right angle.',
      'வட்ட நாற்கரத்தின் எதிர்க்கோணங்கள் மிகை நிரப்புக் கோணங்கள். அரைவட்டத்தில் அமையும் கோணம் செங்கோணம்.'),
    step('Find the remaining angle of triangle ABC.','ABC முக்கோணத்தின் எஞ்சிய கோணத்தைக் காண்க.',
      'The marked x is the angle at A between AC and AB.','A இல் AC, AB இடையே குறிக்கப்பட்ட கோணம் x.',
      'x = 180° − 90° − 60° = 30°',tex`x=180^\circ-90^\circ-60^\circ=30^\circ`)
  ],degrees('x',30),{figure:['AB is a diameter through O. D and C lie above AB. The angle ADC is 120° and CAB is x.', 'AB என்பது O வழியாகச் செல்லும் விட்டம். AB க்கு மேலே D, C உள்ளன. ADC கோணம் 120°; CAB கோணம் x.']});

  const q2 = ['In the given figure, AC is the diameter of the circle with centre O. If ∠ADE = 30°; ∠DAC = 35° and ∠CAB = 40°. Find',
    'கொடுக்கப்பட்டுள்ள படத்தில் O வை மையமாகக் கொண்ட வட்டத்தின் விட்டம் AC. இங்கு, ∠ADE = 30°; ∠DAC = 35° மற்றும் ∠CAB = 40° எனில்,'];
  const f2 = ['Circle with diameter AC through O and points A, E, D, C, B in that order on the circle. The angles ADE, DAC and CAB are 30°, 35° and 40°.',
    'O வழியாகச் செல்லும் AC விட்டத்துடன் வட்டம். A, E, D, C, B ஆகியவை பரிதியில் வரிசையாக உள்ளன. ADE, DAC, CAB கோணங்கள் முறையே 30°, 35°, 40°.'];
  function part(number, i, q, target, steps, value, figure) {
    add(number,[q[0]+' ('+i+') '+target,q[1]+' ('+i+') '+target+' காண்க.'],steps,degrees(target,value),{part:i,figure});
  }
  part(2,'i',q2,'∠ACD',[
    step('AC is the diameter, so ∠ADC = 90°. Subtract 90° and the given 35° from the angle sum for △ACD.',
      'AC விட்டம் என்பதால் ∠ADC = 90°. △ACD இன் கோணக் கூடுதலிலிருந்து 90°, 35° ஆகியவற்றைக் கழிக்கவும்.',
      'The angle subtended by a diameter at a point on the circle is 90°.',
      'விட்டம் பரிதியிலுள்ள ஒரு புள்ளியில் தாங்கும் கோணம் 90°.',
      '∠ACD = 180° − 90° − 35° = 55°',tex`\angle ACD=180^\circ-90^\circ-35^\circ=55^\circ`)
  ],55,f2);
  part(2,'ii',q2,'∠ACB',[
    step('AC is the diameter, so ∠ABC = 90°. Subtract 90° and the given 40° from the angle sum for △ACB.',
      'AC விட்டம் என்பதால் ∠ABC = 90°. △ACB இன் கோணக் கூடுதலிலிருந்து 90°, 40° ஆகியவற்றைக் கழிக்கவும்.',
      'The right angle is at B, the point subtending AC on the circle.',
      'AC விட்டத்தைத் தாங்கும் பரிதிப் புள்ளி B என்பதால் அங்கு செங்கோணம்.',
      '∠ACB = 180° − 90° − 40° = 50°',tex`\angle ACB=180^\circ-90^\circ-40^\circ=50^\circ`)
  ],50,f2);
  part(2,'iii',q2,'∠DAE',[
    step('Since ∠ADC = 90° and ∠DAC = 35°, ∠ACD = 55°. The opposite angle AED in cyclic quadrilateral AEDC is 125°.',
      '∠ADC = 90°, ∠DAC = 35° என்பதால் ∠ACD = 55°. AEDC வட்ட நாற்கரத்தில் அதன் எதிர்க்கோணம் AED = 125°.',
      'Opposite angles in AEDC sum to 180°.', 'AEDC வட்ட நாற்கரத்தின் எதிர்க்கோணங்களின் கூடுதல் 180°.'),
    step('In △ADE use ∠ADE = 30° and ∠AED = 125° to obtain ∠DAE.',
      '△ADE இல் ∠ADE = 30°, ∠AED = 125° ஆகியவற்றிலிருந்து ∠DAE ஐக் காண்க.',
      'The three interior angles sum to 180°.', 'மூன்று உட்கோணங்களின் கூடுதல் 180°.',
      '∠DAE = 180° − 30° − 125° = 25°',tex`\angle DAE=180^\circ-30^\circ-125^\circ=25^\circ`)
  ],25,f2);
  add(3,['Find all the angles of the given cyclic quadrilateral ABCD in the figure.',
    'படத்தில் கொடுக்கப்பட்டுள்ள வட்ட நாற்கரம் ABCD இன் அனைத்துக் கோணங்களையும் காண்க.'],[
    step('Set each pair of opposite angles equal to 180°. Solve for x and y.',
      'எதிரெதிர்க் கோணங்கள் ஒவ்வொரு சோடியின் கூடுதலையும் 180° என அமைத்து x, y காண்க.',
      'A and C involve y, and B and D involve x. Each pair is supplementary.',
      'A, C என்பன y ஐயும் B, D என்பன x ஐயும் கொண்டவை. ஒவ்வொரு சோடியும் மிகை நிரப்புக் கோணங்கள்.',
      '(2y + 4) + (4y − 4) = 180, y = 30; (6x − 4) + (7x + 2) = 180, x = 14',
      tex`\begin{aligned}(2y+4)+(4y-4)&=180\ y&=30\\(6x-4)+(7x+2)&=180\ x&=14\end{aligned}`),
    step('Substitute y = 30 in A and C and x = 14 in B and D.',
      'A, C இல் y = 30 ஐயும் B, D இல் x = 14 ஐயும் பதிலிடுக.',
      'Both opposite pairs should sum to 180°.', 'இரு எதிர்க்கோணச் சோடிகளின் கூடுதலும் 180° ஆக வேண்டும்.')
  ],['','','∠A = 64°, ∠B = 80°, ∠C = 116°, ∠D = 100°',
    tex`\begin{aligned}\angle A&=64^\circ,\quad\angle B=80^\circ\\\angle C&=116^\circ,\quad\angle D=100^\circ\end{aligned}`],
  {figure:['Cyclic quadrilateral with angles A = (2y + 4)°, B = (6x − 4)°, C = (4y − 4)°, D = (7x + 2)°.',
    'வட்ட நாற்கரத்தின் கோணங்கள் A = (2y + 4)°, B = (6x − 4)°, C = (4y − 4)°, D = (7x + 2)°.']});
  const q4 = ['In the given figure, ABCD is a cyclic quadrilateral where diagonals intersect at P such that ∠DBC = 40° and ∠BAC = 60° find',
    'கொடுக்கப்பட்டுள்ள படத்தில் வட்ட நாற்கரம் ABCD இன் விட்டங்கள் வெட்டும் புள்ளி P மேலும், ∠DBC = 40° மற்றும் ∠BAC = 60° எனில்,'];
  const f4 = ['Diagonals AC and BD cross at P inside cyclic quadrilateral ABCD. ∠DBC = 40° and ∠BAC = 60°.',
    'ABCD வட்ட நாற்கரத்தில் AC, BD மூலைவிட்டங்கள் P இல் வெட்டுகின்றன. ∠DBC = 40°, ∠BAC = 60°.'];
  part(4,'i',q4,'∠CAD',[
    step('Angles CAD and CBD are on the same side of chord CD and intercept the same arc. Hence ∠CAD = ∠CBD = 40°.',
      'CAD, CBD கோணங்கள் CD நாணின் ஒரே பக்கத்தில் அமைந்து ஒரே வில்லைத் தாங்குகின்றன. எனவே ∠CAD = ∠CBD = 40°.',
      'Inscribed angles in the same segment are equal.', 'ஒரே வட்டத்துண்டில் அமையும் பரிதிக் கோணங்கள் சமம்.')
  ],40,f4);
  part(4,'ii',q4,'∠BCD',[
    step('∠CAD = 40° because it intercepts the same arc CD as ∠DBC. ∠BAD is therefore 60° + 40° = 100°.',
      'DBC, CAD ஆகியவை ஒரே CD வில்லைத் தாங்குவதால் ∠CAD = 40°. ஆகவே ∠BAD = 60° + 40° = 100°.',
      'AC lies inside ∠BAD.', 'AC என்பது ∠BAD இன் உட்புறம் செல்கிறது.'),
    step('BCD is opposite BAD in the cyclic quadrilateral. Subtract 100° from 180°.',
      'வட்ட நாற்கரத்தில் BCD கோணம் BAD கோணத்திற்கு எதிரில் உள்ளது. 180° இலிருந்து 100° ஐக் கழிக்கவும்.',
      'The opposite angles of a cyclic quadrilateral are supplementary.', 'வட்ட நாற்கரத்தின் எதிர்க்கோணங்கள் மிகை நிரப்புக் கோணங்கள்.')
  ],80,f4);
  add(5,['In the given figure, AB and CD are the parallel chords of a circle with centre O. Such that AB = 8 cm and CD = 6 cm. If OM ⟂ AB and OL ⟂ CD distance between LM is 7 cm. Find the radius of the circle?',
    'படத்தில் AB மற்றும் CD ஆனது O வை மையமாகக் கொண்ட வட்டத்தின் இரு இணையான நாண்கள். மேலும், AB = 8 செமீ, CD = 6 செமீ, OM ⟂ AB, OL ⟂ CD இடைப்பட்ட தூரம் LM ஆனது 7 செமீ எனில், வட்டத்தின் ஆரம் காண்க?'],[
    step('The perpendiculars bisect the chords. Set OM = u and OL = v, measured in centimetres. Since O is between the chords, u + v = 7. Applying Pythagoras on each side gives equal squared radii.',
      'செங்குத்துகள் நாண்களை இருசமமாகப் பிரிக்கின்றன. OM = u, OL = v என செமீ அலகில் கொள்க. O இரு நாண்களுக்கு இடையில் உள்ளதால் u + v = 7. இருபுறமும் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தினால் ஆரத்தின் வர்க்கங்கள் சமம்.',
      'The half-chords are 4 cm and 3 cm, and both hypotenuses are radii.',
      'அரை நாண்களின் நீளங்கள் 4 செமீ, 3 செமீ. இரு கர்ணங்களும் ஆரங்கள்.',
      'u² + 16 = v² + 9; (v − u)(v + u) = 7',tex`\begin{aligned}u^2+16&=v^2+9\\(v-u)(v+u)&=7\end{aligned}`),
    step('Divide by v + u = 7. Solving v − u = 1 and u + v = 7 gives u = 3 and v = 4. Use the right triangle at M for the radius.',
      'v + u = 7 ஆல் வகுக்கவும். v − u = 1, u + v = 7 ஆகியவற்றைத் தீர்க்க u = 3, v = 4. M இல் செங்கோணமுள்ள முக்கோணத்தைக் கொண்டு ஆரத்தைக் காண்க.',
      'The two leg lengths at M are 3 cm and 4 cm.', 'M இல் உள்ள செங்குத்துப் பக்கங்களின் நீளங்கள் 3 செமீ, 4 செமீ.',
      'r = √(3² + 4²) = 5',tex`r=\sqrt{3^2+4^2}=5`)
  ],['The radius is 5 cm.','ஆரம் 5 செமீ.'],{related:4,figure:['Parallel chords AB = 8 cm and CD = 6 cm lie on opposite sides of O. Perpendicular segment ML is 7 cm.',
    'AB = 8 செமீ, CD = 6 செமீ என்ற இணை நாண்கள் O இன் எதிரெதிர்ப் பக்கங்களில் உள்ளன. செங்குத்துத் துண்டு ML = 7 செமீ.']});
  add(6,['The arch of a bridge has dimensions as shown, where the arch measure 2 m at its highest point and its width is 6 m. What is the radius of the circle that contains the arch?',
    'பாலத்தின் வளைவின் அளவுகள் கொடுக்கப்பட்டுள்ளன. இங்கு வளைவின் அகலம் 6 மீ மற்றும் வளைவின் அதிகளவு உயரம் 2 மீ எனில், வளைவை உள்ளடக்கிய வட்டத்தின் ஆரம் என்ன?'],[
    step('D is the midpoint of chord AB. The centre lies on the line through C and D. The circle’s radius exceeds 2 m because half the chord is already 3 m. Thus OD = r − 2.',
      'D என்பது AB நாணின் நடுப்புள்ளி. மையம் C, D வழியாகச் செல்லும் கோட்டில் உள்ளது. அரை நாண் 3 மீ என்பதால் ஆரம் 2 மீ விட அதிகம். எனவே OD = r − 2.',
      'The centre lies on the perpendicular bisector of AB, below D in this minor segment.',
      'மையம் AB இன் மையக்குத்துக்கோட்டில் D க்குக் கீழே உள்ளது.'),
    step('Use the right triangle with legs 3 and r − 2. Expand, cancel the squared term and solve.',
      '3, r − 2 ஆகிய செங்குத்துப் பக்கங்களைக் கொண்ட முக்கோணத்தைப் பயன்படுத்துக. விரித்து வர்க்க உறுப்புகளை நீக்கித் தீர்க்கவும்.',
      'The hypotenuse is the radius.', 'கர்ணமே ஆரம்.',
      'r² = 9 + (r − 2)²; 4r = 13; r = 3.25',tex`\begin{aligned}r^2&=9+(r-2)^2\\4r&=13\\r&=3.25\end{aligned}`)
  ],['The radius is 3.25 m.','ஆரம் 3.25 மீ.'],{pages:[179,191],related:4,figure:['A circular arc rises from A and B to C, 2 m vertically above the midpoint D of the 6 m chord AB.',
    '6 மீ நீளமுள்ள AB நாணின் நடுப்புள்ளி D. D இலிருந்து செங்குத்தாக 2 மீ உயரத்தில் வட்டவில் C ஐ அடைகிறது.']});
  add(7,['In figure, ∠ABC = 120°, where A, B and C are points on the circle with centre O. Find ∠OAC?',
    'படத்தில் ∠ABC = 120°, Oவை மையமாகக் கொண்ட வட்டத்தின் மேல் உள்ள புள்ளிகள் A, B மற்றும் C எனில் ∠OAC காண்க.'],[
    step('The angle ABC intercepts the arc AC excluding B. That major arc has measure 240°, so the smaller angle AOC is 360° − 240° = 120°.',
      'ABC கோணம் B இல்லாத AC வில்லைத் தாங்குகிறது. அந்தப் பெரிய வில்லின் அளவு 240°. எனவே சிறிய AOC கோணம் 360° − 240° = 120°.',
      'The angle at the centre over the same arc is twice the inscribed angle.', 'ஒரே வில்லின் மையக்கோணம் பரிதிக் கோணத்தின் இருமடங்கு.'),
    step('OA = OC because both are radii. Divide the remaining 60° equally between the two base angles.',
      'OA, OC இரண்டும் ஆரங்கள் என்பதால் சமம். எஞ்சிய 60° ஐ இரு அடிக்கோணங்களுக்கும் சமமாகப் பகிர்க.',
      'The base angles in an isosceles triangle are equal.', 'இருசமபக்க முக்கோணத்தின் அடிக்கோணங்கள் சமம்.')
  ],degrees('∠OAC',30),{pages:[179,191],related:4,figure:['A, B and C lie on the circle, with B on the minor arc AC and ∠ABC = 120°. OA and OC are drawn.',
    'A, B, C பரிதியில் உள்ளன. B சிறிய AC வில்லின் மீது உள்ளது. ∠ABC = 120°; OA, OC இணைக்கப்பட்டுள்ளன.']});
  add(8,['A school wants to conduct tree plantation programme. For this a teacher allotted a circle of radius 6 m ground to nineth standard students for planting sapplings. Four students plant trees at the points A, B, C and D as shown in figure. Here AB = 8 m, CD = 10 m and AB ⟂ CD. If another student places a flower pot at the point P, the intersection of AB and CD, then find the distance from the centre to P.',
    'ஒரு பள்ளியில் மரம் நடும் விழா நிகழ்ச்சி நடக்கிறது. இதற்காக ஆசிரியர் ஒன்பதாம் வகுப்பு மாணவர்கள் மரக்கன்று நடுவதற்காக 6 மீ ஆரமுள்ள மைதானத்தை ஒதுக்குகின்றார். நான்கு மாணவர்கள் படத்தில் காட்டியுள்ளவாறு A, B, C மற்றும் D என்ற புள்ளிகளில் மரக்கன்று நடுகின்றனர். இங்கு AB = 8 மீ, CD = 10 மீ AB ⟂ CD. மற்றொரு மாணவர் AB மற்றும் CD வெட்டும் புள்ளியான Pஇல் பூந்தொட்டியை வைக்கின்றார் எனில், மையத்திலிருந்து P இக்கு உள்ள தூரம் காண்க.'],[
    step('Drop perpendiculars from O to the chord midpoints M on AB and N on CD. The half-chords are 4 m and 5 m. Using the radius 6 m, Pythagoras gives OM² = 20 and ON² = 11.',
      'O இலிருந்து AB இன் நடுப்புள்ளி M, CD இன் நடுப்புள்ளி N ஆகியவற்றுக்குச் செங்குத்துகள் வரைக. அரை நாண்கள் 4 மீ, 5 மீ. ஆரம் 6 மீ கொண்டு பிதாகரஸ் தேற்றத்தால் OM² = 20, ON² = 11.',
      'A perpendicular from the centre bisects a chord.', 'மையத்திலிருந்து நாணுக்கு வரையும் செங்குத்து நாணை இருசமமாகப் பிரிக்கும்.'),
    step('OMPN is a rectangle because AB ⟂ CD. Its diagonal OP follows by applying Pythagoras to the adjacent lengths OM and ON. Round to one decimal place if required.',
      'AB ⟂ CD என்பதால் OMPN ஒரு செவ்வகம். அடுத்தடுத்த பக்க நீளங்கள் OM, ON கொண்டு பிதாகரஸ் தேற்றத்தால் அதன் மூலைவிட்டம் OP ஐக் காண்க. தேவைப்பட்டால் ஒரு தசம இடத்திற்கு முழுமையாக்குக.',
      'The perpendicular centre-to-chord distances are the two dimensions of the rectangle.', 'மையத்திலிருந்து நாண்களுக்குள்ள செங்குத்துத் தொலைவுகள் செவ்வகத்தின் இரு பக்க நீளங்கள்.',
      'OP = √(20 + 11) = √31 ≈ 5.6',tex`OP=\sqrt{20+11}=\sqrt{31}\approx5.6`)
  ],['The distance is √31 m, approximately 5.6 m.','தொலைவு √31 மீ, தோராயமாக 5.6 மீ.','OP = √31 ≈ 5.6',tex`OP=\sqrt{31}\approx5.6`],
  {pages:[180,191],related:4,figure:['A circle of radius 6 m has perpendicular chords AB = 8 m and CD = 10 m crossing at P. O is the centre.',
    '6 மீ ஆரமுள்ள வட்டத்தில் AB = 8 மீ, CD = 10 மீ என்ற நாண்கள் P இல் செங்குத்தாக வெட்டுகின்றன. O வட்ட மையம்.']});
  add(9,['In the given figure, ∠POQ = 100° and ∠PQR = 30°, then find ∠RPO.',
    'கொடுக்கப்பட்டுள்ள படத்தில், ∠POQ = 100° மற்றும் ∠PQR = 30° எனில், ∠RPO காண்க.'],[
    step('The inscribed angle PQR intercepts minor arc PR. Thus ∠POR = 2 × 30° = 60°.',
      'PQR பரிதிக் கோணம் சிறிய PR வில்லைத் தாங்குகிறது. எனவே ∠POR = 2 × 30° = 60°.',
      'The central angle over the same arc is twice the inscribed angle.', 'ஒரே வில்லின் மையக்கோணம் பரிதிக் கோணத்தின் இருமடங்கு.'),
    step('OP = OR. In △POR the remaining 120° is shared equally between the two base angles, giving ∠RPO = 60°.',
      'OP = OR. △POR இன் எஞ்சிய 120° இரு சம அடிக்கோணங்களுக்கும் சமமாகப் பகிரப்படும். எனவே ∠RPO = 60°.',
      'The two equal radii give an isosceles triangle.', 'சம ஆரங்கள் இருசமபக்க முக்கோணத்தை அமைக்கின்றன.')
  ],degrees('∠RPO',60),{pages:[180,191],related:4,figure:['P, Q and R lie on a circle with centre O. The angles POQ and PQR are 100° and 30°.',
    'O மையமுள்ள வட்டத்தின் பரிதியில் P, Q, R உள்ளன. POQ, PQR கோணங்கள் முறையே 100°, 30°.']});
})();
