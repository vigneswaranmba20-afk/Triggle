/* TN SCERT revised 2025, Grade 9, the remaining tasks in Exercises 4.1–4.3. */
(() => {
  'use strict';
  const {batch, step, formula} = window.TriggleGrade9Geometry;
  const a = batch(1, 1, 149, 160);
  const b = batch(2, 2, 163, 175);
  const c = batch(3, 4, 176, 187);
  const angled = ['In the figure, AB is parallel to CD, find x', 'படத்தில், AB ஆனது CD-க்கு இணை எனில், x இன் மதிப்பு காண்க.'];
  const angle = (label, value) => ['', '', label + ' = ' + value + '°', label + '=' + value + '^\\circ'];

  a(1, angled, [
    step('Draw a line through T parallel to AB and CD. The two rays make angles of 40° and 30° with it, by supplementary interior angles.',
      'T வழியாக AB, CD ஆகியவற்றுக்கு இணைகோடு வரைக. உட்புறக் கோணங்களின் கூடுதல் 180° என்பதால், அதனுடன் இரு கதிர்களும் 40°, 30° கோணங்களை அமைக்கின்றன.',
      'The parallel through T splits the angle into two parts.', 'T வழியான இணைகோடு கோணத்தை இரு பகுதிகளாகப் பிரிக்கிறது.'),
    step('Add the two parts of the angle at T.', 'T-இலுள்ள கோணத்தின் இரு பகுதிகளையும் கூட்டுக.',
      'Both parts lie inside the marked angle.', 'இரு பகுதிகளும் குறிக்கப்பட்ட கோணத்திற்குள் உள்ளன.', 'x = 40° + 30° = 70°', 'x=40^\\circ+30^\\circ=70^\\circ')
  ], angle('x',70), {part:'i', figure:['AB and CD point right from A and C. The segments TA and TC make the given 140° and 150° at A and C. x is the angle at T.', 'A, C இலிருந்து வலப்புறம் செல்லும் AB, CD இணைகோடுகள். TA, TC ஆகியவை A, C இல் 140°, 150° கோணங்களை அமைக்கின்றன. T இல் x குறிக்கப்பட்டுள்ளது.']});
  a(1, angled, [
    step('Through the bend draw a parallel to AB and CD pointing right. The two smaller angles next to this ray are 48° and 24° by alternate interior angles.',
      'வளைவு வழியாக AB, CD ஆகியவற்றுக்கு இணையாக வலப்புறக் கதிர் வரைக. ஒன்று விட்ட உட்கோணங்களால் அதனருகில் 48°, 24° கிடைக்கும்.',
      'A line parallel to both given lines lets us transfer both angles to the bend.', 'புதிய இணைகோட்டால் இரு கோணங்களையும் வளைவுக்கு மாற்றலாம்.'),
    step('The marked angle is the reflex angle. Subtract the smaller angle from a full turn.',
      'குறிக்கப்பட்டது பின்வளைக் கோணம். ஒரு முழுச் சுற்றிலிருந்து சிறிய கோணத்தைக் கழிக்கவும்.',
      'The reflex angle and the smaller angle fill one full turn.', 'பின்வளைக் கோணமும் சிறிய கோணமும் சேர்ந்து ஒரு முழுச் சுற்று.',
      'x = 360° − (48° + 24°) = 288°', 'x=360^\\circ-(48^\\circ+24^\\circ)=288^\\circ')
  ], angle('x',288), {part:'ii', figure:['Two parallel horizontal lines with a bend joining their right ends. The angles at B and D are 48° and 24°. x marks the reflex angle at the bend.', 'B, D ஆகிய வலப்புற முனைகளை வளைவின் வழியாக இணைக்கவும். B, D இல் 48°, 24° கோணங்கள். வளைவில் x பின்வளைக் கோணம்.']});
  a(1, angled, [
    step('In triangle CED, the angle at D is 53° by alternate interior angles along AD. The angle at C is 38°.',
      'AD குறுக்குவெட்டியால் அமையும் ஒன்று விட்ட உட்கோணங்களால் CED முக்கோணத்தில் D கோணம் 53°. C கோணம் 38°.',
      'The given sides AB and CD are parallel.', 'கொடுக்கப்பட்ட AB, CD ஆகியவை இணைகோடுகள்.'),
    step('Subtract these two angles from the angle sum of the triangle.', 'முக்கோணக் கோணங்களின் கூடுதலிலிருந்து இவ்விரு கோணங்களையும் கழிக்கவும்.',
      'The marked angle is at E in triangle CED.', 'குறிக்கப்பட்டது CED முக்கோணத்தின் E கோணம்.',
      'x = 180° − 53° − 38° = 89°', 'x=180^\\circ-53^\\circ-38^\\circ=89^\\circ')
  ], angle('x',89), {part:'iii', figure:['AB and CD are parallel. E lies on AD and is joined to C. The given angles are 53° at A and 38° at C, and x is angle CED.', 'AB, CD இணைகோடுகள். AD மீதுள்ள E உடன் C இணைக்கப்பட்டுள்ளது. A இல் 53°, C இல் 38°, CED கோணம் x.']});

  const compare = ['Consider the given pairs of triangles and say whether each pair is that of congruent triangles. If the triangles are congruent, say ‘how’; if they are not congruent say ‘why’ and also say if a small modification would make them congruent:',
    'கொடுக்கப்பட்டுள்ள முக்கோணச் சோடிகளைக் கருத்தில் கொள்க. மேலும் அவற்றில் ஒவ்வொரு சோடியும் சர்வசம முக்கோணங்களா எனக் காண்க. அவை சர்வசம முக்கோணங்கள் எனில் எப்படி? இல்லையெனில் அவை சர்வசமமாக என்ன செய்ய வேண்டும்?'];
  const triangles = (part, pages, figure, reasoning, conclusion, criterion) => a(3,compare,[
    step(...reasoning,...criterion)
  ],conclusion,{part,pages,figure});
  triangles('i',[149,160],['Two separate triangles ABC and PQR with AB and PQ single-marked, BC and QR double-marked.', 'ABC, PQR முக்கோணங்களில் AB, PQ ஒரு குறியும் BC, QR இரு குறிகளும் கொண்டுள்ளன.'],
    ['Only AB = PQ and BC = QR are marked. The included angles can differ while both pairs of sides remain equal. If AC = PR were also given, SSS would apply.',
     'AB = PQ, BC = QR ஆகிய இரு சமங்கள் மட்டுமே குறிக்கப்பட்டுள்ளன. அப்பக்கங்களுக்கு இடைப்பட்ட கோணங்கள் வெவ்வேறாக இருக்கலாம். AC = PR என்றும் கொடுத்தால் ப–ப–ப விதி பொருந்தும்.'],
    ['Congruence is undetermined. Adding AC = PR would suffice.', 'சர்வசமம் எனத் தீர்மானிக்க இயலாது. AC = PR எனக் கூடுதலாகக் கொடுத்தால் போதும்.'],
    ['Two side pairs alone leave the included angle free.', 'இரு பக்கச் சோடிகளைக் கொண்டு மட்டும் இடைப்பட்ட கோணத்தைத் தீர்மானிக்க முடியாது.']);
  triangles('ii',[149,160],['Quadrilateral ABCD split by DB, with AD and BC single-marked and AB and CD double-marked.', 'DB மூலைவிட்டத்துடன் ABCD நாற்கரம். AD, BC ஒரு குறியும் AB, CD இரு குறிகளும் கொண்டுள்ளன.'],
    ['AD = CB and AB = CD by the marks. DB is a common side, giving three equal corresponding sides.',
     'குறிகளின்படி AD = CB, AB = CD. DB பொதுப்பக்கம் என்பதால் மூன்று ஒத்த பக்கச் சோடிகளும் சமம்.'],
    ['△ADB ≅ △CBD by SSS.', 'ப–ப–ப விதிப்படி △ADB ≅ △CBD.'],
    ['Count DB once in each triangle.', 'DB இரு முக்கோணங்களுக்கும் பொதுப்பக்கம்.']);
  triangles('iii',[149,160],['Y, P and Z are collinear. YP and PZ have two ticks, and YX and ZX one tick. PX is drawn.', 'Y, P, Z ஒரே கோட்டில் உள்ளன. YP, PZ இரு குறிகளையும் YX, ZX ஒரு குறியையும் கொண்டுள்ளன. PX இணைக்கப்பட்டுள்ளது.'],
    ['YP = ZP, YX = ZX and PX is common. The three corresponding side pairs are equal.',
     'YP = ZP, YX = ZX; PX பொதுப்பக்கம். மூன்று ஒத்த பக்கச் சோடிகளும் சமம்.'],
    ['△YPX ≅ △ZPX by SSS.', 'ப–ப–ப விதிப்படி △YPX ≅ △ZPX.'],
    ['The marks identify the two equal pairs, and the shared side provides the third.', 'குறிகள் இரண்டு சமப் பக்கச் சோடிகளையும் பொதுப்பக்கம் மூன்றாவது சோடியையும் தருகின்றன.']);
  triangles('iv',[150,161],['AC and BD intersect at O. AO and OC have equal ticks, and angles ABO and CDO have matching arcs.', 'AC, BD ஆகியவை O இல் வெட்டுகின்றன. AO, OC இல் ஒரே குறியும் ABO, CDO கோணங்களில் ஒரே விற்குறியும் உள்ளன.'],
    ['AO = CO and ∠ABO = ∠CDO are marked. ∠AOB = ∠COD because they are vertically opposite. AO and CO are corresponding sides.',
     'AO = CO, ∠ABO = ∠CDO எனக் குறிக்கப்பட்டுள்ளன. குத்தெதிர்க் கோணங்களான ∠AOB, ∠COD சமம். AO, CO ஆகியவை ஒத்த பக்கங்கள்.'],
    ['△ABO ≅ △CDO by AAS.', 'கோ–கோ–ப விதிப்படி △ABO ≅ △CDO.'],
    ['The equal sides are not between the two given equal angles.', 'கொடுக்கப்பட்ட சமப் பக்கங்கள் அந்த இரு சமக் கோணங்களுக்கு இடையில் இல்லை.']);
  triangles('v',[150,161],['AC and BD meet at O. AO and OC are single-marked, and BO and OD are double-marked.', 'AC, BD ஆகியவை O இல் வெட்டுகின்றன. AO, OC ஒரு குறியும் BO, OD இரு குறிகளும் கொண்டுள்ளன.'],
    ['AO = CO and BO = DO. The included angles ∠AOB and ∠COD are vertically opposite and equal.',
     'AO = CO, BO = DO. இடைப்பட்ட ∠AOB, ∠COD ஆகியவை சமமான குத்தெதிர்க் கோணங்கள்.'],
    ['△AOB ≅ △COD by SAS.', 'ப–கோ–ப விதிப்படி △AOB ≅ △COD.'],
    ['The equal angle lies between the marked sides.', 'சமக் கோணம் குறிக்கப்பட்ட இரு பக்கங்களுக்கு இடையே உள்ளது.']);
  triangles('vi',[150,161],['In ABC, AB and AC have equal ticks, and AM is perpendicular to BC at M.', 'ABC முக்கோணத்தில் AB, AC ஒரே குறியைக் கொண்டுள்ளன. BC இன் மீது M இல் AM செங்குத்து.'],
    ['Triangles AMB and AMC are right at M. Their hypotenuses AB and AC are equal and their leg AM is common.',
     'AMB, AMC இரண்டும் M-இல் செங்கோண முக்கோணங்கள். கர்ணங்கள் AB, AC சமம். AM பொதுவான செங்குத்துப் பக்கம்.'],
    ['△AMB ≅ △AMC by RHS.', 'செ–க–ப விதிப்படி △AMB ≅ △AMC.'],
    ['A right angle, equal hypotenuse and equal leg give congruence.', 'செங்கோணம், சம கர்ணம், சம செங்குத்துப் பக்கம் ஆகியவை சர்வசமத்தைத் தருகின்றன.']);

  a(5,['Find all the three angles of the △ABC','கொடுக்கப்பட்ட △ABC இல் அனைத்துக் கோண அளவுகளையும் காண்க.'],[
    step('At C the exterior angle equals the sum of the remote interior angles at A and B.',
      'C இல் உள்ள வெளிக்கோணம் A, B இல் உள்ள உள்ளெதிர்க் கோணங்களின் கூடுதலுக்குச் சமம்.',
      'CD is the extension of BC through C.', 'CD என்பது BC இன் C வழியான நீட்சி.',
      '4x − 15 = (x + 35) + (2x − 5); x = 45', '\\begin{aligned}4x-15&=(x+35)+(2x-5)\\\\x&=45\\end{aligned}'),
    step('Substitute 45 at A and B. The third interior angle is the remainder of the triangle angle sum.',
      'A, B கோணங்களில் 45 ஐப் பதிலிடுக. முக்கோணக் கோணங்களின் கூடுதலில் மீதமே மூன்றாவது உட்கோணம்.',
      'The exterior angle itself is not the interior angle at C.', 'C இல் உட்கோணமும் வெளிக்கோணமும் சேர்ந்து 180°.',
      '∠A = 80°, ∠B = 85°, ∠C = 180° − 165° = 15°', '\\begin{aligned}\\angle A&=80^\\circ,\\quad\\angle B=85^\\circ\\\\\\angle C&=180^\\circ-165^\\circ=15^\\circ\\end{aligned}')
  ],['','','∠A = 80°, ∠B = 85°, ∠C = 15°','\\angle A=80^\\circ,\\ \\angle B=85^\\circ,\\ \\angle C=15^\\circ'],
  {pages:[150,161],figure:['Triangle ABC with B, C, D collinear. A is labelled (x + 35)°, B (2x − 5)° and exterior ACD (4x − 15)°.', 'ABC முக்கோணத்தில் B, C, D ஒரே கோட்டில் உள்ளன. A இல் (x + 35)°, B இல் (2x − 5)°, வெளிக்கோணம் ACD இல் (4x − 15)° குறிக்கப்பட்டுள்ளன.']});

  b(5,['Show that the bisectors of angles of a parallelogram form a rectangle .','இணைகரத்தின் கோண இரு சம வெட்டிகள் செவ்வகத்தை அமைக்கும் என நிறுவுக..'],[
    step('Each pair of adjacent angles of a parallelogram adds to 180°. Their half angles therefore add to 90°.',
      'இணைகரத்தின் அடுத்தடுத்த இரு கோணங்களின் கூடுதல் 180°. எனவே அவற்றின் அரைக் கோணங்களின் கூடுதல் 90°.',
      'Adjacent angles are same-side interior angles between parallel sides.', 'அடுத்தடுத்த கோணங்கள் இணைப்பக்கங்களுக்கு இடையில் ஒரே பக்க உட்கோணங்கள்.'),
    step('At the intersection of the two adjacent bisectors, the triangle with the adjacent vertices has a right angle. This holds for every adjacent pair. Opposite bisectors are parallel because both are perpendicular to an intervening bisector. When they are distinct they bound a rectangle.',
      'அடுத்தடுத்த இரு இருசமவெட்டிகளின் சந்திப்பையும் அந்த இரு முனைகளையும் இணைக்கும் முக்கோணத்தில் சந்திப்புக் கோணம் செங்கோணம். இது ஒவ்வொரு அடுத்தடுத்த சோடிக்கும் பொருந்தும். எதிரெதிர் இருசமவெட்டிகள் ஒரே இடைப்பட்ட இருசமவெட்டிக்குச் செங்குத்து என்பதால் இணையானவை. அவை வெவ்வேறு கோடுகளாக இருந்தால் செவ்வகம் அமையும்.',
      'The third angle is 180° minus the sum of the two half angles.', '180° இலிருந்து அரைக் கோணங்களின் கூடுதலைக் கழித்தால் மூன்றாம் கோணம் கிடைக்கும்.'),
    step('If two opposite bisectors coincide, their common line is a diagonal that bisects a vertex angle. Parallel sides make the two angles at the ends of this diagonal in either half-triangle equal. The two adjacent sides are therefore equal and the parallelogram is a rhombus. In a rhombus both diagonals bisect the vertex angles, so all four bisectors meet at one point.',
      'இரு எதிரெதிர் இருசமவெட்டிகள் ஒன்றின்மீது ஒன்று அமைந்தால், அவற்றின் பொதுக்கோடான மூலைவிட்டம் ஒரு முனைக்கோணத்தை இருசமமாகப் பிரிக்கிறது. இணைப்பக்கங்களால், மூலைவிட்டத்தால் உருவான ஒரு முக்கோணத்தில் மூலைவிட்டத்தின் இரு முனைக் கோணங்களும் சமம். எனவே அடுத்தடுத்த பக்கங்கள் சமம்; இணைகரம் ஒரு சாய்சதுரம். சாய்சதுரத்தின் இரு மூலைவிட்டங்களும் முனைக்கோணங்களை இருசமமாகப் பிரிப்பதால் நான்கு இருசமவெட்டிகளும் ஒரே புள்ளியில் சந்திக்கின்றன.',
      'A rectangle requires four distinct vertices.', 'செவ்வகத்திற்கு நான்கு தனித்த முனைகள் தேவை.')
  ],['The bisectors form a rectangle when the parallelogram is not a rhombus. In a rhombus they meet at a single point.',
     'சாய்சதுரம் அல்லாத இணைகரத்தின் கோண இருசமவெட்டிகள் செவ்வகத்தை அமைக்கும். சாய்சதுரத்தில் அவை ஒரு புள்ளியில் சந்திக்கும்.'],
  {difficulty:'difficult',note:'Both editions omit the non-rhombus condition. The solution states and proves the corrected result.'});

  const bridge = ['Iron rods a, b, c, d, e, and f are making a design in a bridge as shown in the figure. If a ∥ b, c ∥ d, e ∥ f, find the marked angles between',
    'இரும்புக் கம்பிகள் a, b, c, d, e மற்றும் f ஆனது படத்தில் உள்ளவாறு ஒரு பாலத்தை அமைக்கின்றன. இதில் a ∥ b, c ∥ d, e ∥ f எனில், கொடுக்கப்பட்ட கம்பிகளுக்கு இடைப்பட்ட கோணங்களைக் காண்க.'];
  const bridgeParts = [
    ['b and c','b மற்றும் c',30,'The rods b and c cross. The acute angle opposite the given 30° angle is also 30° by vertically opposite angles.',
      'b, c கம்பிகள் வெட்டுகின்றன. கொடுக்கப்பட்ட 30° கோணத்தின் குத்தெதிர்க் குறுங்கோணமும் 30°.'],
    ['d and e','d மற்றும் e',105,'The acute angle made by d with e is 75° because c and d are parallel. The marked angle is adjacent to it on a straight line.',
      'c, d இணைகோடுகள் என்பதால் d, e அமைக்கும் குறுங்கோணம் 75°. நேர்க்கோட்டில் அதை அடுத்த கோணமே குறிக்கப்பட்டுள்ளது.'],
    ['d and f','d மற்றும் f',75,'Both line directions match those of c and e. The marked angle is the acute angle, equal to the given 75°.',
      'இரு கோடுகளின் திசைகளும் c, e உடன் ஒத்துள்ளன. குறிக்கப்பட்ட குறுங்கோணம் கொடுக்கப்பட்ட 75° கோணத்துக்குச் சமம்.'],
    ['c and f','c மற்றும் f',105,'The acute angle is 75° because e and f are parallel. The marked obtuse angle is its supplement.',
      'e, f இணைகோடுகள் என்பதால் குறுங்கோணம் 75°. குறிக்கப்பட்ட விரிகோணம் அதன் மிகை நிரப்புக் கோணம்.']
  ];
  bridgeParts.forEach(([en,ta,v,sen,sta], index) => {
    const part = ['i','ii','iii','iv'][index];
    b(7,[bridge[0]+' ('+part+') '+en,bridge[1]+' ('+part+') '+ta],[
      step(sen,sta,'Use the given parallel pairs to carry the angle across the bridge.',
        'கொடுக்கப்பட்ட இணைகோட்டுச் சோடிகளால் கோண அளவுகளை மற்ற சந்திப்புகளுக்குப் பயன்படுத்தலாம்.')
    ],angle('x',v),{part,figure:['Bridge rods a ∥ b, c ∥ d and e ∥ f with the given angles 75° and 30°. The target is between '+en+'.',
      'பாலக் கம்பிகள் a ∥ b, c ∥ d, e ∥ f. 75°, 30° கோணங்கள் தரப்பட்டுள்ளன. தேவைப்படும் கோணம் '+ta+' இடையே உள்ளது.']});
  });
  b(8,['In the given Fig. 4.39, ∠A = 64°, ∠ABC = 58°. If BO and CO are the bisectors of ∠ABC and ∠ACB respectively of △ABC, find x° and y°',
    'படம் 4.39 இல் ∠A = 64°, ∠ABC = 58°. BO மற்றும் CO ஆனது ∠ABC மற்றும் ∠ACB இன் இருசம வெட்டிகள் எனில், △ABC இல் x° மற்றும் y° காண்க.'],[
    step('The third angle of ABC is 58°. BO and CO halve the angles at B and C, so the base angles of BOC are each 29°.',
      'ABC இன் மூன்றாவது கோணம் 58°. BO, CO ஆகியவை B, C கோணங்களை இருசமமாகப் பிரிப்பதால் BOC இன் அடிக்கோணங்கள் ஒவ்வொன்றும் 29°.',
      'An angle bisector divides an angle into two equal angles.', 'கோண இருசமவெட்டி ஒரு கோணத்தைச் சமமான இரு கோணங்களாகப் பிரிக்கும்.',
      '∠ACB = 180° − 64° − 58° = 58°', '\\angle ACB=180^\\circ-64^\\circ-58^\\circ=58^\\circ'),
    step('Use the angle sum in BOC for x.', 'x ஐக் காண BOC முக்கோணத்தின் கோணக் கூடுதலைப் பயன்படுத்துக.',
      'x is the angle between BO and CO at O.', 'O இல் BO, CO அமைக்கும் கோணம் x.',
      'x = 180 − 29 − 29 = 122', 'x=180-29-29=122')
  ],['','','x° = 122°, y° = 29°','x^\\circ=122^\\circ,\\quad y^\\circ=29^\\circ'],
  {pages:[164,175],figure:['Triangle ABC with A = 64° and ABC = 58°. Angle bisectors BO and CO meet at O. x marks BOC and y marks ACO.',
    'A = 64°, ABC = 58° கொண்ட முக்கோணம் ABC. BO, CO இருசமவெட்டிகள் O இல் சந்திக்கின்றன. BOC கோணம் x; ACO கோணம் y.']});
  b(9,['In the given Fig. 4.40, if AB = 2, BC = 6, AE = 6, BF = 8, CE = 7, and CF = 7, compute the ratio of the area of quadrilateral ABDE to the area of △CDF. (Use congruent property of triangles).',
    'படம் 4.40 இல் AB = 2, BC = 6, AE = 6, BF = 8, CE = 7 மற்றும் CF = 7, எனில், நாற்கரம் ABDE இன் பரப்பு மற்றும் △CDF இன் பரப்பிற்கும் உள்ள விகிதம் காண்க. (சர்வ சம முக்கோணத்தின் பண்பைப் பயன்படுத்துக)'],[
    step('AC = AB + BC = 8 = BF. Also AE = BC and CE = FC. Therefore △ACE ≅ △BFC by SSS.',
      'AC = AB + BC = 8 = BF. மேலும் AE = BC, CE = FC. எனவே ப–ப–ப விதிப்படி △ACE ≅ △BFC.',
      'The three given side pairs establish equal triangle areas.', 'மூன்று பக்கச் சோடிகளின் சமத்தால் முக்கோணங்களின் பரப்புகள் சமம்.'),
    step('Subtract their common triangle BCD. The pieces left are quadrilateral ABDE and triangle CDF, so their areas are equal.',
      'இரண்டிலிருந்தும் பொதுவான BCD முக்கோணத்தின் பரப்பைக் கழிக்கவும். எஞ்சும் ABDE நாற்கரத்தின் பரப்பும் CDF முக்கோணத்தின் பரப்பும் சமம்.',
      'D is the intersection of CE and BF, so the overlap is precisely BCD.', 'CE, BF சந்திக்கும் புள்ளி D என்பதால் அவற்றின் பொதுப்பகுதி BCD.')
  ],['','','1 : 1','1:1'],{pages:[164,175],figure:['A, B, C lie in order on one line. CE crosses BF at D. The outer sides are AE and CF.',
    'A, B, C வரிசையாக ஒரே கோட்டில் உள்ளன. CE, BF ஆகியவை D இல் சந்திக்கின்றன. AE, CF வெளிப்பக்கங்கள்.']});
  b(10,['In the Fig. 4.41, ABCD is a rectangle and EFGH is a parallelogram. Using the measurements given in the figure, what is the length d of the segment that is perpendicular to HE and FG?',
    'படம் 4.41 இல் செவ்வகம் ABCD மற்றும் இணைகரம் EFGH இல் d ஆனது HE மற்றும் FG-க்குச் செங்குத்து எனில், d இன் நீளம் காண்க.'],[
    step('Subtract the four outer right triangles from the 10 by 8 rectangle. The opposite corner triangles have legs 4 and 3, or 6 and 5.',
      '10 × 8 செவ்வகத்தின் பரப்பிலிருந்து வெளியிலுள்ள நான்கு செங்கோண முக்கோணங்களின் பரப்புகளைக் கழிக்கவும். எதிர் மூலைகளிலுள்ள முக்கோணங்களின் செங்குத்துப் பக்கங்கள் 4, 3 அல்லது 6, 5.',
      'The four corner triangles and EFGH partition the rectangle.', 'நான்கு மூலை முக்கோணங்களும் EFGH இணைகரமும் செவ்வகத்தை முழுவதும் நிரப்புகின்றன.',
      '[EFGH] = 80 − 2(6) − 2(15) = 38','[EFGH]=80-2(6)-2(15)=38'),
    step('By Pythagoras HE is 5. Divide the area by this base to find its perpendicular height d.',
      'பிதாகரஸ் தேற்றத்தின்படி HE = 5. அதற்குரிய செங்குத்து உயரம் d ஐக் காண, பரப்பை இந்த அடிப்பக்கத்தால் வகுக்கவும்.',
      'A parallelogram’s area is base times perpendicular height.', 'இணைகரத்தின் பரப்பு என்பது அடிப்பக்கம் மற்றும் செங்குத்து உயரத்தின் பெருக்கல்.',
      'd = 38/5 = 7.6','d=\\dfrac{38}{5}=7.6')
  ],['','','d = 7.6','d=7.6'],{pages:[164,176],figure:['Rectangle ABCD has side divisions AE = 4, EB = 6, BF = 5, FC = 3, CG = 4, GD = 6, DH = 5 and HA = 3. d is the perpendicular between HE and FG.',
    'ABCD செவ்வகத்தில் AE = 4, EB = 6, BF = 5, FC = 3, CG = 4, GD = 6, DH = 5, HA = 3. HE, FG இடையிலான செங்குத்துத் துண்டு d.']});
  b(11,['In parallelogram ABCD of the accompanying diagram, line DP is drawn bisecting BC at N and meeting AB (extended) at P. From vertex C, line CQ is drawn bisecting side AD at M and meeting AB (extended) at Q. Lines DP and CQ meet at O. Show that the area of triangle QPO is 9/8 of the area of the parallelogram ABCD.',
    'படத்தில் இணைகரம் ABCD இல் முனை D இலிருந்து வரையப்படும் கோடு DP ஆனது BC இன் நடுப்புள்ளியை N இலும், AB இன் நீட்சியை P இலும் சந்திக்கிறது. C இலிருந்து வரையப்படும் கோடு CQ ஆனது, AD இன் நடுப்புள்ளி M இலும், AB இன் நீட்சியை Q விலும் சந்திக்கிறது. கோடுகள் DP மற்றும் CQ ஆனது O இல் சந்திக்கின்றன, எனில் △QPO இன் பரப்பளவானது, இணைகரம் ABCD இன் பரப்பளவில் 9/8 மடங்கு என நிறுவுக.'],[
    step('Since BN = CN, triangles BNP and CND are congruent by ASA: the angles at N are vertically opposite, and AB ∥ DC gives equal angles at B and C. Thus BP = DC. Likewise △AMQ ≅ △DMC, so AQ = DC. Hence QP = 3AB.',
      'BN = CN. N இல் குத்தெதிர்க் கோணங்கள் சமம். AB ∥ DC என்பதால் B, C இல் ஒன்று விட்ட உட்கோணங்கள் சமம். ஆகவே கோ–ப–கோ விதிப்படி △BNP ≅ △CND; BP = DC. அதேபோல் △AMQ ≅ △DMC; AQ = DC. எனவே QP = 3AB.',
      'Each midpoint and the two parallel bases supply an equal included side and two equal angles.', 'ஒவ்வொரு நடுப்புள்ளியும் இரு இணை அடிப்பக்கங்களும் ஒரு சமப் பக்கத்தையும் அதனை ஒட்டிய இரு சமக் கோணங்களையும் தருகின்றன.'),
    step('DM and CN are equal and parallel, so DCNM is a parallelogram. Its diagonals DN and CM bisect each other at O. If the height of ABCD is h, then MN lies at height h/2 and O lies midway between MN and DC, at height 3h/4.',
      'DM, CN சமமான இணைப்பக்கங்கள். எனவே DCNM ஓர் இணைகரம். அதன் மூலைவிட்டங்கள் DN, CM ஆகியவை O இல் ஒன்றையொன்று இருசமமாக வெட்டுகின்றன. ABCD இன் உயரம் h எனில், MN இன் உயரம் h/2; MN, DC ஆகியவற்றின் நடுவில் உள்ள O இன் உயரம் 3h/4.',
      'The midpoint of a segment between two parallel lines is halfway between them.', 'இரு இணைகோடுகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி அவற்றுக்கு நடுவில் இருக்கும்.'),
    step('Use half the base times the height for QPO, and base times height for ABCD.',
      'QPO பரப்பு அடிப்பக்கம் × உயரத்தின் பாதி. ABCD பரப்பு அடிப்பக்கம் × உயரம்.',
      'Both heights are measured perpendicular to the same base line.', 'இரு உயரங்களும் ஒரே அடிக்கோட்டுக்குச் செங்குத்தாக அளக்கப்படுகின்றன.',
      '[QPO] / [ABCD] = (½ × 3AB × ¾h)/(AB × h) = 9/8','\\dfrac{[QPO]}{[ABCD]}=\\dfrac{\\tfrac12\\cdot3AB\\cdot\\tfrac34h}{AB\\cdot h}=\\dfrac98')
  ],['','','[QPO] = 9/8 [ABCD]','[QPO]=\\dfrac98[ABCD]'],
  {pages:[164,176],difficulty:'difficult',questionMath:[
    ['In parallelogram ABCD of the accompanying diagram, line DP is drawn bisecting BC at N and meeting AB (extended) at P. From vertex C, line CQ is drawn bisecting side AD at M and meeting AB (extended) at Q. Lines DP and CQ meet at O. Show that the area of triangle QPO is ',{...formula('9/8','\\dfrac98'),display:false},' of the area of the parallelogram ABCD.'],
    ['படத்தில் இணைகரம் ABCD இல் முனை D இலிருந்து வரையப்படும் கோடு DP ஆனது BC இன் நடுப்புள்ளியை N இலும், AB இன் நீட்சியை P இலும் சந்திக்கிறது. C இலிருந்து வரையப்படும் கோடு CQ ஆனது, AD இன் நடுப்புள்ளி M இலும், AB இன் நீட்சியை Q விலும் சந்திக்கிறது. கோடுகள் DP மற்றும் CQ ஆனது O இல் சந்திக்கின்றன, எனில் △QPO இன் பரப்பளவானது, இணைகரம் ABCD இன் பரப்பளவில் ',{...formula('9/8','\\dfrac98'),display:false},' மடங்கு என நிறுவுக.']
  ],figure:['Parallelogram ABCD with midpoints M on AD and N on BC. DP and CQ cross at O and meet extended AB at P and Q.',
    'ABCD இணைகரத்தின் AD, BC நடுப்புள்ளிகள் M, N. DP, CQ ஆகியவை O இல் வெட்டுகின்றன; AB நீட்சியை P, Q இல் சந்திக்கின்றன.']});

  c(3,['Find the length of the chord AC where AB and CD are the two diameters perpendicular to each other of a circle with radius 4√2 cm and also find ∠OAC and ∠OCA.',
    'ஆரம் 4√2 செமீ உள்ள வட்டத்தில் AB மற்றும் CD என்ற ஒன்றுக்கு ஒன்று செங்குத்தான விட்டங்கள் வரையப்பட்டுள்ளன எனில், நாண் ACஇன் நீளம் காண்க. மேலும், ∠OAC மற்றும் ∠OCA காண்க.'],[
    step('OA and OC are equal radii and meet at a right angle. Apply Pythagoras to find AC.',
      'OA, OC ஆகிய சம ஆரங்கள் செங்குத்தாகச் சந்திக்கின்றன. பிதாகரஸ் தேற்றத்தால் AC காண்க.',
      'The two diameters cross at the centre O.', 'இரு விட்டங்களும் மையம் O இல் வெட்டுகின்றன.',
      'AC = √(32 + 32) = 8','AC=\\sqrt{(4\\sqrt2)^2+(4\\sqrt2)^2}=8'),
    step('The other two angles are equal and share the remaining 90°.', 'ஏனைய இரு கோணங்களும் சமம்; அவற்றின் கூடுதல் 90°.',
      'Angles opposite equal sides of a triangle are equal.', 'முக்கோணத்தில் சம பக்கங்களுக்கு எதிர்க்கோணங்கள் சமம்.',
      '∠OAC = ∠OCA = 45°','\\angle OAC=\\angle OCA=45^\\circ')
  ],['AC is 8 cm.','AC இன் நீளம் 8 செமீ.','∠OAC = ∠OCA = 45°','\\angle OAC=\\angle OCA=45^\\circ'],
  {pages:[175,187],related:3,questionMath:[
    ['Find the length of the chord AC where AB and CD are the two diameters perpendicular to each other of a circle with radius ',{...formula('4√2','4\\sqrt2'),display:false},' cm and also find ∠OAC and ∠OCA.'],
    ['ஆரம் ',{...formula('4√2','4\\sqrt2'),display:false},' செமீ உள்ள வட்டத்தில் AB மற்றும் CD என்ற ஒன்றுக்கு ஒன்று செங்குத்தான விட்டங்கள் வரையப்பட்டுள்ளன எனில், நாண் ACஇன் நீளம் காண்க. மேலும், ∠OAC மற்றும் ∠OCA காண்க.']
  ],figure:['Perpendicular diameters AB and CD cross at O. Chord AC joins their endpoints.', 'செங்குத்து விட்டங்கள் AB, CD ஆகியவை O இல் வெட்டுகின்றன. A, C ஆகியவற்றை நாண் AC இணைக்கிறது.']});
  c(5,['In a circle, AB and CD are two parallel chords with centre O and radius 10 cm such that AB = 16 cm and CD = 12 cm determine the distance between the two chords?',
    'Oஐ மையமாக உடைய வட்டத்தில் AB மற்றும் CD என்பன இரு இணையான நாண்கள் ஆகும். மேலும் ஆரம் 10 செமீ, AB = 16 செமீ மற்றும் CD = 12 செமீ எனில், இரு நாண்களுக்கு இடைப்பட்ட தொலைவைத் தீர்மானிக்க.'],[
    step('Perpendiculars from O bisect the two chords. The half-lengths are 8 cm and 6 cm. Use the radius as hypotenuse to find the two perpendicular distances.',
      'O இலிருந்து நாண்களுக்கு வரையும் செங்குத்துகள் அவற்றை இருசமமாகப் பிரிக்கும். அரை நீளங்கள் 8 செமீ, 6 செமீ. ஆரத்தைக் கர்ணமாகக் கொண்டு செங்குத்துத் தொலைவுகளைக் காண்க.',
      'Pythagoras relates the half-chord, centre distance and radius.', 'அரை நாண், மையத் தொலைவு, ஆரம் ஆகியவற்றை பிதாகரஸ் தேற்றம் தொடர்புபடுத்துகிறது.',
      '√(100 − 64) = 6; √(100 − 36) = 8','\\sqrt{100-64}=6,\\quad\\sqrt{100-36}=8'),
    step('If O lies between the chords, add 6 and 8. If both chords lie on the same side, subtract 6 from 8. Both placements are possible.',
      'O நாண்களுக்கு இடையில் இருந்தால் 6, 8 ஐக் கூட்டுக. இரு நாண்களும் ஒரே பக்கத்தில் இருந்தால் 8 இலிருந்து 6 ஐக் கழிக்கவும். இரு அமைப்புகளும் சாத்தியம்.',
      'The question gives lengths and parallelism, which allow either placement.', 'நாண்களின் நீளங்களும் இணைத்தன்மையும் இரு அமைப்புகளையும் அனுமதிக்கின்றன.')
  ],['14 cm on opposite sides of O, or 2 cm on the same side.',
     'O இன் எதிரெதிர்ப் பக்கங்களில் 14 செமீ; ஒரே பக்கத்தில் 2 செமீ.'],
  {note:'Both answer keys list 14 cm only. The statement permits 2 cm as well.'});

  const circles = ['Find the value of x° in the following figures:', 'பின்வரும் படங்களில் x° இன் மதிப்பைக் காண்க.'];
  const circleParts = [
    [45,'The two central sectors give a 90° angle BOC. Inscribed angle BAC intercepts the same arc BC, so it is half that angle.',
      'மையத்தில் இரு பகுதிகளும் சேர்ந்து ∠BOC = 90°. அதே BC வில்லைத் தாங்கும் பரிதிக் கோணம் BAC அதன் பாதி.',
      'Triangle ABC is inscribed. OB and OC enclose adjacent central angles 30° and 60°. x is BAC.',
      'ABC வட்டத்தில் அமைந்துள்ளது. OB, OC இடையே 30°, 60° மையக்கோணங்கள் அடுத்தடுத்து உள்ளன. BAC கோணம் x.'],
    [10,'',
      '',
      'P, Q and R lie on the circle. ∠QOR is 80°, ∠ORP is 30°, and x is PQO.',
      'P, Q, R பரிதியில் உள்ளன. ∠QOR = 80°, ∠ORP = 30°; PQO கோணம் x.'],
    [55,'OP and ON are radii, so PON is isosceles. Its equal base angles share 180° − 70°.',
      'OP, ON சம ஆரங்கள் என்பதால் PON இருசமபக்க முக்கோணம். 180° − 70° ஐ அதன் இரு சம அடிக்கோணங்களும் பகிர்கின்றன.',
      'MN is a diameter. P is on the circle. ∠PON = 70° and x is OPN.',
      'MN விட்டம். P பரிதியில் உள்ளது. ∠PON = 70°; OPN கோணம் x.'],
    [120,'YXZ intercepts the arc YZ that omits X. Its measure is 240°. x marks the other central angle, so subtract 240° from 360°.',
      'YXZ கோணம் X இல்லாத YZ வில்லைத் தாங்குகிறது. அதன் அளவு 240°. மீதமுள்ள மையக்கோணம் x என்பதால் 360° இலிருந்து 240° ஐக் கழிக்கவும்.',
      'Y, X and Z lie along the upper circle. Angle YXZ is 120°. x marks the smaller angle YOZ.',
      'Y, X, Z பரிதியின் மேற்பகுதியில் உள்ளன. YXZ கோணம் 120°. சிறிய YOZ கோணம் x.'],
    [60,'The central angle BOC facing away from A is 360° − 140° − 100° = 120°. The angle BAC intercepts this arc and is half as large.',
      'A இல்லாத BC வில்லின் மையக்கோணம் BOC = 360° − 140° − 100° = 120°. அந்த வில்லைத் தாங்கும் BAC கோணம் அதன் பாதி.',
      'Radii divide the circle into sectors. ∠BOA = 140° and ∠AOC = 100°. x marks BAC.',
      'ஆரங்கள் வட்டத்தைப் பகுதிகளாகப் பிரிக்கின்றன. ∠BOA = 140°, ∠AOC = 100°; BAC கோணம் x.']
  ];
  circleParts.forEach(([value,en,ta,figEn,figTa],index) => {
    const part = ['i','ii','iii','iv','v'][index];
    const reasons = [
      ['The same-arc angle at the centre is twice the angle at the circumference.','ஒரே வில்லின் மையக்கோணம் பரிதிக் கோணத்தின் இருமடங்கு.'],
      null,
      ['Equal radii give equal angles opposite them.','சம ஆரங்களுக்கு எதிர்ப்புறக் கோணங்கள் சமம்.'],
      ['Use the arc excluding the inscribed vertex.','பரிதிக் கோணத்தின் முனை இல்லாத வில்லைப் பயன்படுத்துக.'],
      ['The full turn at the centre is 360°.','மையத்தின் முழுச் சுற்றுக் கோணம் 360°.']
    ];
    if (index === 1) {
      c(7,circles,[step('Because OQ = OR and ∠QOR = 80°, both base angles of QOR are 50°. Thus ∠QRP = 50° + 30° = 80°.',
        'OQ = OR, ∠QOR = 80° என்பதால் QOR இன் இரு அடிக்கோணங்களும் 50°. எனவே ∠QRP = 50° + 30° = 80°.',
        'OR splits the angle at R into two adjacent parts.','OR என்பது R இல் உள்ள கோணத்தை அடுத்தடுத்த இரு பகுதிகளாகப் பிரிக்கிறது.'),
        step('∠QPR is half ∠QOR, or 40°. So ∠PQR = 60° by the angle sum. Subtract ∠OQR = 50° to find x.',
          '∠QPR என்பது ∠QOR இன் பாதி, அதாவது 40°. கோணக் கூடுதலால் ∠PQR = 60°. அதிலிருந்து ∠OQR = 50° ஐக் கழிக்க x கிடைக்கும்.',
          'At Q, the radius OQ lies between the two chord rays.','Q இல் OQ ஆரம் இரண்டு நாண் கதிர்களுக்கு இடையே உள்ளது.')],
      angle('x',value),{part,figure:[figEn,figTa]});
    } else {
      c(7,circles,[step(en,ta,...reasons[index])],angle('x',value),{part,figure:[figEn,figTa]});
    }
  });
  c(8,['In the given figure, ∠CAB = 25°, find ∠BDC, ∠DBA and ∠COB',
    'கொடுக்கப்பட்டுள்ள படத்தில், ∠CAB = 25° எனில், ∠BDC, ∠DBA மற்றும் ∠COB காண்க.'],[
    step('Draw AC, BD and AD. Angles CAB and BDC stand on arc BC, so ∠BDC = 25°. The central angle COB is twice that.',
      'AC, BD, AD ஆகியவற்றை வரைக. CAB, BDC கோணங்கள் BC வில்லைத் தாங்குகின்றன. எனவே ∠BDC = 25°. COB மையக்கோணம் அதன் இருமடங்கு.',
      'The same arc gives equal inscribed angles and a central angle twice as large.',
      'ஒரே வில்லைத் தாங்கும் பரிதிக் கோணங்கள் சமம்; மையக்கோணம் அவற்றின் இருமடங்கு.'),
    step('P lies on CD, so ∠BDP = 25°. As BP ⟂ DP, triangle BDP gives ∠DBP = 65°. Rays BP and BA coincide, so ∠DBA = 65°.',
      'P ஆனது CD இல் உள்ளதால் ∠BDP = 25°. BP ⟂ DP எனவே BDP முக்கோணத்தில் ∠DBP = 65°. BP, BA ஒரே கதிர் என்பதால் ∠DBA = 65°.',
      'The acute angles of a right triangle are complementary.','செங்கோண முக்கோணத்தின் குறுங்கோணங்கள் நிரப்புக் கோணங்கள்.')
  ],['','','∠BDC = 25°, ∠DBA = 65°, ∠COB = 50°','\\begin{aligned}\\angle BDC&=25^\\circ,\\quad\\angle DBA=65^\\circ\\\\\\angle COB&=50^\\circ\\end{aligned}'],
  {figure:['Chords AB and CD meet perpendicularly at P. O is the centre and ∠CAB is 25°.', 'AB, CD நாண்கள் P இல் செங்குத்தாக வெட்டுகின்றன. O வட்ட மையம், ∠CAB = 25°.']});
})();
