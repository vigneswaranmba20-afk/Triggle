/* TN SCERT revised 2025, Grade 9, Exercise 4.7. */
(() => {
  'use strict';
  const {batch,step,both,formula} = window.TriggleGrade9Geometry;
  const add = batch(7,1,187,199);
  const tex = String.raw;
  const choices = (values, unit) => values.map(v => both(v+(unit==='cm'?' cm':unit),v+(unit==='cm'?' செமீ':unit)));
  const same = values => values.map(v => both(v,v));
  function mcq(n,q,options,correct,steps,related,figure,note) {
    const choice = options[correct-1];
    const literal = v => Array.isArray(v) ? v.map(x=>x.fallback ?? x).join('') : v;
    const pages = [n<=6?187:n<=17?188:189,n<=7?199:n<=18?200:201];
    add(n,q,steps,['Option '+correct+' · '+literal(choice.en),'விடை '+correct+' · '+literal(choice.ta)],{
      choices:options,correct:correct-1,related,pages,figure,note,difficulty:[4,7,15,16,18].includes(n)?'medium':'easy'
    });
  }

  mcq(1,['The exterior angle of a triangle is equal to the sum of two','முக்கோணத்தின் வெளிக்கோணம் எந்த இரு கோணங்களின் கூடுதலுக்குச் சமம்?'],
    [both('Exterior angles','வெளிக்கோணங்கள்'),both('Interior opposite angles','உள்ளெதிர்க்கோணங்கள்'),
      both('Alternate angles','ஒன்றுவிட்ட கோணங்கள்'),both('Interior angles','உள் கோணங்கள்')],2,[
    step('The exterior angle and the adjacent interior angle sum to 180°. All three interior angles also sum to 180°. Subtract the adjacent interior angle from both totals.',
      'வெளிக்கோணமும் அதை அடுத்துள்ள உட்கோணமும் சேர்ந்து 180°. மூன்று உட்கோணங்களின் கூடுதலும் 180°. இரு கூடுதல்களிலிருந்தும் அடுத்துள்ள உட்கோணத்தைக் கழிக்கவும்.',
      'The two interior angles left are opposite the exterior angle.','எஞ்சிய இரு உட்கோணங்களும் வெளிக்கோணத்திற்கு உள்ளெதிர்க் கோணங்கள்.')
  ],1);

  mcq(2,['In the quadrilateral ABCD, AB = BC and AD = DC. Measure of ∠BCD is',
    'நாற்கரம் ABCD இல் AB = BC மற்றும் AD = DC எனில், கோணம் ∠BCD இன் அளவு'],choices([150,30,105,72],'°'),3,[
    step('Join B and D. AB = CB, AD = CD and BD is common. Therefore △ABD ≅ △CBD by SSS and ∠BAD = ∠BCD.',
      'B, D ஆகியவற்றை இணைக்கவும். AB = CB, AD = CD; BD பொதுப்பக்கம். எனவே ப–ப–ப விதிப்படி △ABD ≅ △CBD; ∠BAD = ∠BCD.',
      'Corresponding angles of congruent triangles are equal.', 'சர்வசம முக்கோணங்களின் ஒத்த கோணங்கள் சமம்.'),
    step('Use the given angles B = 108° and D = 42° and divide the remainder of the quadrilateral angle sum equally between A and C.',
      'கொடுக்கப்பட்ட B = 108°, D = 42° ஆகியவற்றை நாற்கரக் கோணக் கூடுதலிலிருந்து கழித்து, மீதியை A, C ஆகியவற்றுக்குச் சமமாகப் பகிர்க.',
      'The interior angles of a quadrilateral sum to 360°.', 'நாற்கரத்தின் உட்கோணங்களின் கூடுதல் 360°.',
      '∠BCD = (360° − 108° − 42°)/2 = 105°',tex`\angle BCD=\dfrac{360^\circ-108^\circ-42^\circ}{2}=105^\circ`)
  ],2,['Kite ABCD with marked equal sides AB and BC, AD and DC, and angles 108° at B and 42° at D.',
    'AB, BC மற்றும் AD, DC ஆகிய சமப் பக்கங்கள் குறிக்கப்பட்ட ABCD பட்டம். B இல் 108°, D இல் 42°.']);

  mcq(3,['ABCD is a square, diagonals AC and BD meet at O. The number of pairs of congruent triangles with vertex O are',
    'சதுரம் ABCD இல் மூலை விட்டங்கள் AC மற்றும் BD ஆனது O இல் சந்திக்கின்றன எனில், Oவை முனையாகக் கொண்ட சர்வசம முக்கோணச் சோடிகளின் எண்ணிக்கை'],
    same(['6','8','4','12']),1,[
    step('The four triangles AOB, BOC, COD and DOA have equal outer sides and two equal half-diagonals each. They are all congruent by SSS. AOC and BOD are collinear triples.',
      'AOB, BOC, COD, DOA முக்கோணங்களில் வெளிப்பக்கங்களும் அரை மூலைவிட்டங்களும் சமம். அனைத்தும் ப–ப–ப விதிப்படி சர்வசமம். AOC, BOD ஆகியவை ஒரே கோட்டிலுள்ள புள்ளிகள்.',
      'A square’s diagonals are equal and bisect each other.', 'சதுரத்தின் மூலைவிட்டங்கள் சமம்; அவை ஒன்றையொன்று இருசமமாக வெட்டுகின்றன.'),
    step('Pair the first triangle with three others, the second with the two unused partners and the third with the remaining partner.',
      'முதல் முக்கோணத்துடன் மற்ற மூன்றையும், இரண்டாவதுடன் இன்னும் சேர்க்கப்படாத இரண்டையும், மூன்றாவதுடன் எஞ்சிய ஒன்றையும் சேர்க்கவும்.',
      'Count each unordered pair once.', 'ஒவ்வொரு சோடியையும் ஒருமுறை மட்டும் எண்ணுக.', '3 + 2 + 1 = 6','3+2+1=6')
  ],2,['A square whose diagonals intersect at O.','மூலைவிட்டங்கள் O இல் வெட்டுகின்ற சதுரம்.']);

  mcq(4,['In the given figure CE ∥ DB then the value of x is','கொடுக்கப்பட்டுள்ள படத்தில் CE ∥ DB எனில், x இன் மதிப்பு'],
    choices([45,30,75,85],'°'),4,[
    step('In △ADB the angles at A and B are 110° and 30°, so ∠ADB = 40°. The full ∠ADC is 75°, leaving ∠BDC = 35°.',
      '△ADB இல் A, B கோணங்கள் 110°, 30° என்பதால் ∠ADB = 40°. முழு ∠ADC = 75°. எஞ்சிய ∠BDC = 35°.',
      'DB lies inside ∠ADC and splits it into its two adjacent angles.', 'DB என்பது ∠ADC இன் உள்ளே சென்று அதை இரு அடுத்தடுத்த கோணங்களாகப் பிரிக்கிறது.'),
    step('In △DBC the angles at D and C are 35° and 60°. Thus ∠DBC = 85°. With BC as transversal, ∠BCE equals ∠DBC.',
      '△DBC இல் D, C கோணங்கள் 35°, 60°. எனவே ∠DBC = 85°. BC குறுக்குவெட்டியாக உள்ளதால் ∠BCE = ∠DBC.',
      'CE ∥ DB makes the two angles alternate interior angles.', 'CE ∥ DB என்பதால் இரண்டும் ஒன்றுவிட்ட உட்கோணங்கள்.')
  ],1,['ABCD with diagonal DB and ray CE parallel to DB. The angles DAB, ABD, ADC and DCB are 110°, 30°, 75° and 60°. x is BCE.',
    'DB மூலைவிட்டத்துடன் ABCD நாற்கரம். CE ∥ DB. DAB, ABD, ADC, DCB கோணங்கள் முறையே 110°, 30°, 75°, 60°. BCE கோணம் x.']);

  mcq(5,['The correct statement out of the following is','கொடுக்கப்பட்டுள்ள கூற்றுகளில் சரியானது எது?'],
    [both('△ABC ≅ △DEF','△ABC ≅ △DEF'),both('△ABC ≅ △DEF','△ABC = △DEF'),
      both('△ABC ≅ △FDE','△ABC ≅ △FDE'),both('△ABC ≅ △FED','△ABC ≅ △FED')],4,[
    step('The 50° angles pair A with F, the 70° angles pair B with E, and the 60° angles pair C with D. The marked sides BC and ED are equal.',
      '50° கோணங்கள் A, F ஐயும், 70° கோணங்கள் B, E ஐயும், 60° கோணங்கள் C, D ஐயும் இணைக்கின்றன. குறிக்கப்பட்ட BC, ED பக்கங்கள் சமம்.',
      'The marked side lies between the 70° and 60° angles in each triangle.', 'ஒவ்வொரு முக்கோணத்திலும் குறிக்கப்பட்ட பக்கம் 70°, 60° கோணங்களுக்கு இடையில் உள்ளது.'),
    step('Use ASA and write the vertices in matching order: △ABC ≅ △FED.',
      'கோ–ப–கோ விதியைப் பயன்படுத்தி ஒத்த முனைகளை வரிசையாக எழுதுக: △ABC ≅ △FED.',
      'The vertex order in a congruence statement identifies corresponding parts.', 'சர்வசமக் கூற்றின் முனை வரிசை ஒத்த உறுப்புகளைக் குறிக்கிறது.')
  ],1,['Two triangles with A and F labelled 50°, B and E 70°, C and D 60°, and matching ticks on BC and ED.',
    'இரு முக்கோணங்களில் A, F இல் 50°, B, E இல் 70°, C, D இல் 60°. BC, ED இல் சமக் குறிகள் உள்ளன.'],
    'English options 1 and 2 are printed identically. Tamil option 2 uses equality. Option 4 is the unique correct correspondence in both.');

  mcq(6,['If the diagonal of a rhombus are equal, then the rhombus is a','சாய்சதுரத்தின் மூலைவிட்டங்கள் சமமெனில் அந்தச் சாய்சதுரம் ஒரு'],
    [both('Parallelogram but not a rectangle','இணைகரம் ஆனால் செவ்வகம் அல்ல'),both('Rectangle but not a square','செவ்வகம் ஆனால் சதுரம் அல்ல'),
      both('Square','சதுரம்'),both('Parallelogram but not a square','இணைகரம் ஆனால் சதுரம் அல்ல')],3,[
    step('In rhombus ABCD with AC = BD, compare △ABC and △BAD. AB is common and BC = AD. The diagonals give the third equal side pair, so SSS makes ∠ABC = ∠BAD.',
      'AC = BD உள்ள ABCD சாய்சதுரத்தில் △ABC, △BAD ஆகியவற்றை ஒப்பிடுக. AB பொதுப்பக்கம்; BC = AD. சம மூலைவிட்டங்கள் மூன்றாவது சமப் பக்கச் சோடி. ப–ப–ப விதியால் ∠ABC = ∠BAD.',
      'The angles at B and A correspond under this congruence.', 'இந்தச் சர்வசமத்தில் B, A கோணங்கள் ஒன்றுக்கொன்று ஒத்தவை.'),
    step('Adjacent angles of a parallelogram total 180°. Since these two are equal, each is 90°, and the other two are their opposite angles. A rhombus with four right angles is a square.',
      'இணைகரத்தின் அடுத்தடுத்த கோணங்களின் கூடுதல் 180°. இவை சமம் என்பதால் ஒவ்வொன்றும் 90°. மற்ற இரண்டும் அவற்றின் எதிர்க்கோணங்கள். நான்கு செங்கோணங்களுள்ள சாய்சதுரம் சதுரம்.',
      'The sides are already all equal by the definition of a rhombus.', 'சாய்சதுரத்தின் வரையறைப்படி நான்கு பக்கங்களும் ஏற்கெனவே சமம்.')
  ],2);

  const fractions = [
    ['∠C + ∠D',tex`\angle C+\angle D`],
    ['½(∠C + ∠D)',tex`\dfrac12(\angle C+\angle D)`],
    ['½∠C + ⅓∠D',tex`\dfrac12\angle C+\dfrac13\angle D`],
    ['⅓∠C + ½∠D',tex`\dfrac13\angle C+\dfrac12\angle D`]
  ].map(([fallback,latex])=>both([{...formula(fallback,latex),display:false}],[{...formula(fallback,latex),display:false}]));
  mcq(7,['If bisectors of ∠A and ∠B of a quadrilateral ABCD meet at O, then ∠AOB is',
    'நாற்கரம் ABCD இல் ∠A மற்றும் ∠B இன் இருசமவெட்டிகள் O இல் சந்திக்கின்றன, எனில், ∠AOB இன் மதிப்பு'],fractions,2,[
    step('The angles at A and B in triangle AOB are half the corresponding quadrilateral angles. Subtract their sum from 180°.',
      'AOB முக்கோணத்தில் A, B கோணங்கள் நாற்கரத்தின் அதற்குரிய கோணங்களில் பாதி. அவற்றின் கூடுதலை 180° இலிருந்து கழிக்கவும்.',
      'AO and BO bisect the respective interior angles.', 'AO, BO ஆகியவை அதற்குரிய உட்கோணங்களை இருசமமாகப் பிரிக்கின்றன.'),
    step('Replace 360° − (∠A + ∠B) by ∠C + ∠D.', '360° − (∠A + ∠B) என்பதற்குப் பதிலாக ∠C + ∠D ஐப் பயன்படுத்துக.',
      'The four interior angles of a quadrilateral add to 360°.', 'நாற்கரத்தின் நான்கு உட்கோணங்களின் கூடுதல் 360°.',
      '∠AOB = 180° − ½(∠A + ∠B) = ½(∠C + ∠D)',
      tex`\begin{aligned}\angle AOB&=180^\circ-\dfrac{\angle A+\angle B}{2}\\&=\dfrac{\angle C+\angle D}{2}\end{aligned}`)
  ],2);

  mcq(8,['The interior angle made by the side in a parallelogram is 90° then the parallelogram is a',
    'ஓர் இணைகரத்தின் உள் கோணங்கள் 90° எனில், அந்த இணைகரம் ஒரு'],
    [both('rhombus','சாய் சதுரம்'),both('rectangle','செவ்வகம்'),both('trapezium','சரிவகம்'),both('kite','பட்டம்')],2,[
    step('An angle adjacent to a right angle in a parallelogram is also 90°, since the two add to 180°. The opposite angles are equal, so all four are right angles.',
      'இணைகரத்தில் செங்கோணத்தை அடுத்த கோணமும் 90°. ஏனெனில் அவற்றின் கூடுதல் 180°. எதிர்க்கோணங்கள் சமம் என்பதால் நான்கும் செங்கோணங்கள்.',
      'Four right angles give a rectangle.', 'நான்கு செங்கோணங்கள் செவ்வகத்தைத் தருகின்றன.')
  ],2);

  mcq(9,['Which of the following statement is correct?','பின்வருவனவற்றுள் எந்தக் கூற்று சரியானது?'],
    [both('Opposite angles of a parallelogram are not equal.','இணைகரத்தின் எதிர்க் கோணங்கள் சமமல்ல.'),
      both('Adjacent angles of a parallelogram are complementary.','இணைகரத்தின் அடுத்துள்ள கோணங்கள் நிரப்பிகள்.'),
      both('Diagonals of a parallelogram are always equal.','இணைகரத்தின் மூலைவிட்டங்கள் எப்பொழுதும் சமம்.'),
      both('Both pairs of opposite sides of a parallelogram are always equal.','இணைகரத்தின் இரு சோடி எதிர்ப்பக்கங்கள் எப்பொழுதும் சமம்.')],4,[
    step('Draw diagonal AC in parallelogram ABCD. The parallel sides give two equal alternate angle pairs, and AC is common. By ASA, triangles ABC and CDA are congruent.',
      'ABCD இணைகரத்தில் AC மூலைவிட்டத்தை வரைக. இணைப்பக்கங்களால் இரு ஒன்றுவிட்ட உட்கோணச் சோடிகள் சமம்; AC பொதுப்பக்கம். கோ–ப–கோ விதிப்படி ABC, CDA முக்கோணங்கள் சர்வசமம்.',
      'The common diagonal lies between the two equal angles in each triangle.', 'இரு சமக் கோணங்களுக்கு இடையில் பொதுவான மூலைவிட்டம் உள்ளது.'),
    step('The corresponding opposite sides are AB = CD and BC = DA.', 'ஒத்த எதிர்ப்பக்கங்கள் AB = CD, BC = DA.',
      'Corresponding sides of congruent triangles are equal.', 'சர்வசம முக்கோணங்களின் ஒத்த பக்கங்கள் சமம்.')
  ],2);

  mcq(10,['The angles of the triangle are 3x−40, x+20 and 2x−10 then the value of x is',
    'முக்கோணத்தின் கோணங்கள் (3x−40)°, (x+20)° மற்றும் (2x−10)° எனில் x இன் மதிப்பு'],choices([40,35,50,45],'°'),2,[
    step('Set the sum of the three angle measures to 180 and solve for x. The resulting angles 65°, 55° and 60° are positive and total 180°.',
      'மூன்று கோண அளவுகளின் கூடுதலை 180 என அமைத்து x ஐக் காண்க. கிடைக்கும் 65°, 55°, 60° ஆகிய கோணங்கள் நேர்மமானவை; அவற்றின் கூடுதல் 180°.',
      'All three interior angles belong to the same triangle.', 'மூன்று உட்கோணங்களும் ஒரே முக்கோணத்தைச் சேர்ந்தவை.',
      '(3x − 40) + (x + 20) + (2x − 10) = 180; x = 35',
      tex`\begin{aligned}6x-30&=180\\x&=35\end{aligned}`)
  ],1);

  mcq(11,['PQ and RS are two equal chords of a circle with centre O such that ∠POQ = 70°, then ∠ORS =',
    'O வை மையமாகக் கொண்ட வட்டத்தில் சம நீளமுள்ள நாண்கள் PQ மற்றும் RS. மேலும், ∠POQ = 70° எனில், ∠ORS = _______'],
    choices([60,70,55,80],'°'),3,[
    step('Equal chords subtend equal central angles. Thus ∠ROS = ∠POQ = 70°. In isosceles △ORS, both base angles share the remaining 110°.',
      'சம நாண்கள் சம மையக்கோணங்களைத் தாங்குகின்றன. எனவே ∠ROS = ∠POQ = 70°. இருசமபக்க △ORS இன் அடிக்கோணங்கள் எஞ்சிய 110° ஐச் சமமாகப் பகிர்கின்றன.',
      'OR and OS are equal radii.', 'OR, OS சம ஆரங்கள்.')
  ],4);

  mcq(12,['A chord is at a distance of 15 cm from the centre of the circle of radius 25 cm. The length of the chord is',
    'ஆரம் 25 செமீ உள்ள வட்டத்தின் மையத்திலிருந்து 15 செமீ தூரத்தில் உள்ள நாணின் நீளம் _________'],
    choices([25,20,40,18],'cm'),3,[
    step('The centre-to-chord perpendicular bisects the chord. Use the radius 25 as hypotenuse and distance 15 as one leg. Double the other leg.',
      'மையத்திலிருந்து நாணுக்கு வரையும் செங்குத்து நாணை இருசமமாகப் பிரிக்கிறது. ஆரம் 25 கர்ணம்; தொலைவு 15 ஒரு செங்குத்துப் பக்கம். மற்ற பக்கத்தின் நீளத்தை இரட்டிக்கவும்.',
      'The second leg is only half the chord.', 'மற்ற செங்குத்துப் பக்கம் நாணின் பாதி நீளம்.',
      '2√(25² − 15²) = 2 × 20 = 40',tex`2\sqrt{25^2-15^2}=2\cdot20=40`)
  ],4);

  mcq(13,['In the figure, O is the centre of the circle and ∠ACB = 40° then ∠AOB =',
    'படத்தில் வட்டமையம் O மற்றும் ∠ACB = 40° எனில், ∠AOB = ______'],choices([80,85,70,65],'°'),1,[
    step('AOB is the central angle over the arc AB intercepted by ACB. Its measure is twice 40°.',
      'ACB பரிதிக் கோணம் தாங்கும் AB வில்லின் மையக்கோணம் AOB. அதன் அளவு 40° இன் இருமடங்கு.',
      'The two angles subtend the same arc, which omits C.', 'இரு கோணங்களும் C இல்லாத ஒரே வில்லைத் தாங்குகின்றன.')
  ],4,['A, B and C lie on a circle with centre O. ∠ACB = 40°. OA and OB are drawn.',
    'A, B, C ஆகியவை O மையமுள்ள வட்டத்தின் பரிதியில் உள்ளன. ∠ACB = 40°. OA, OB இணைக்கப்பட்டுள்ளன.']);

  mcq(14,['In a cyclic quadrilaterals ABCD, ∠A = 4x, ∠C = 2x the value of x is',
    'வட்ட நாற்கரம் ABCDயில், ∠A = 4x, ∠C = 2x எனில், x இன் மதிப்பு'],choices([30,20,15,25],'°'),1,[
    step('Add the opposite angle measures, set their sum to 180° and solve.',
      'எதிர்க்கோணங்களைக் கூட்டி, கூடுதலை 180° என அமைத்துத் தீர்க்கவும்.',
      'Opposite angles in a cyclic quadrilateral are supplementary.', 'வட்ட நாற்கரத்தின் எதிர்க்கோணங்கள் மிகை நிரப்புக் கோணங்கள்.',
      '4x + 2x = 180°; x = 30°',tex`4x+2x=180^\circ,\quad x=30^\circ`)
  ],5);

  mcq(15,['In the figure, O is the centre of a circle and diameter AB bisects the chord CD at a point E such that CE = ED = 8 cm and EB = 4 cm. The radius of the circle is',
    'படத்தில் வட்டமையம் O மற்றும் விட்டம் AB ஆகியன, நாண் CD ஐப் புள்ளி E இல் இருசமக் கூறிடுகின்றன. மேலும், CE = ED = 8 செமீ மற்றும் EB = 4 செமீ எனில், வட்டத்தின் ஆரம்'],
    choices([8,4,6,10],'cm'),4,[
    step('AB passes through O and the midpoint E of CD, so it is perpendicular to CD. Let the radius be r. Since E lies between O and B in the figure, OE = r − 4.',
      'AB என்பது O வழியாகவும் CD இன் நடுப்புள்ளி E வழியாகவும் செல்கிறது. எனவே AB ⟂ CD. ஆரம் r என்க. படத்தில் E ஆனது O, B இடையில் உள்ளதால் OE = r − 4.',
      'A line from the centre to the midpoint of a chord is perpendicular to the chord.', 'மையத்தையும் நாணின் நடுப்புள்ளியையும் இணைக்கும் கோடு நாணுக்குச் செங்குத்து.'),
    step('Apply Pythagoras in right triangle OEC, then expand and cancel the squared radius.',
      'OEC செங்கோண முக்கோணத்தில் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துக. விரித்து ஆரத்தின் வர்க்கத்தை நீக்கவும்.',
      'OC is the radius and EC = 8 cm.', 'OC ஆரம்; EC = 8 செமீ.',
      'r² = (r − 4)² + 64; 8r = 80; r = 10',
      tex`\begin{aligned}r^2&=(r-4)^2+64\\8r&=80\\r&=10\end{aligned}`)
  ],4,['Horizontal diameter AB through O meets chord CD at its midpoint E. CE = ED = 8 cm and EB = 4 cm.',
    'O வழியான கிடைமட்ட விட்டம் AB, CD நாணை அதன் நடுப்புள்ளி E இல் வெட்டுகிறது. CE = ED = 8 செமீ; EB = 4 செமீ.']);

  mcq(16,['In the figure, PQRS and PTVS are two cyclic quadrilaterals, If ∠QRS = 100°, then ∠TVS =',
    'படத்தில் PQRS மற்றும் PTVS என்ற இரண்டு வட்ட நாற்கரங்களில் ∠QRS = 100° எனில், ∠TVS ='],
    choices([80,100,70,90],'°'),2,[
    step('In cyclic PQRS, ∠QPS = 180° − ∠QRS = 80°. In the figure, Q lies on ray PT, so ∠TPS is the same 80°.',
      'PQRS வட்ட நாற்கரத்தில் ∠QPS = 180° − ∠QRS = 80°. படத்தில் Q ஆனது PT கதிரின் மீது உள்ளதால் ∠TPS உம் 80°.',
      'The two quadrilaterals share the angle at P.', 'இரு நாற்கரங்களுக்கும் P இல் உள்ள கோணம் பொதுவானது.'),
    step('In cyclic PTVS, ∠TVS is opposite ∠TPS, so ∠TVS = 180° − 80° = 100°.',
      'PTVS வட்ட நாற்கரத்தில் ∠TVS என்பது ∠TPS இன் எதிர்க்கோணம். எனவே ∠TVS = 180° − 80° = 100°.',
      'Apply the supplementary opposite angle property once in each circle.', 'ஒவ்வொரு வட்டத்திலும் எதிர்க்கோணங்கள் மிகை நிரப்பிகள் என்ற பண்பைப் பயன்படுத்துக.')
  ],5,['Two circles meet at P and S. P, Q, T lie in that order on one line, and S, R, V on another. In cyclic PQRS the angle at R is 100°.',
    'இரு வட்டங்கள் P, S இல் வெட்டுகின்றன. P, Q, T ஒரு கோட்டிலும் S, R, V மற்றொரு கோட்டிலும் வரிசையாக உள்ளன. PQRS வட்ட நாற்கரத்தில் R கோணம் 100°.']);

  mcq(17,['If one angle of a cyclic quadrilateral is 75°, then the opposite angle is',
    'வட்ட நாற்கரத்தின் ஒரு கோண அளவு 75° எனில், எதிர் கோணத்தின் அளவு'],choices([100,105,85,90],'°'),2,[
    step('Subtract 75° from 180° to get 105°.','180° இலிருந்து 75° ஐக் கழிக்க 105° கிடைக்கும்.',
      'Opposite angles of an inscribed quadrilateral add to 180°.', 'வட்ட நாற்கரத்தின் எதிர்க்கோணங்களின் கூடுதல் 180°.')
  ],5);

  mcq(18,['In the figure, ABCD is a cyclic quadrilateral in which DC produced to E and CF is drawn parallel to AB such that ∠ADC = 80° and ∠ECF = 20°, then ∠BAD = ?',
    'படத்தில் வட்ட நாற்கரம் ABCD இல் பக்கம் DC ஆனது E வரை நீட்டப்பட்டுள்ளது. மேலும் AB இக்கு இணையாக CF வரைக. இங்கு ∠ADC = 80° மற்றும் ∠ECF = 20° எனில், ∠BAD = ?'],
    choices([100,20,120,110],'°'),3,[
    step('Through A draw ray AX parallel to and in the same direction as DC. Since AD is a transversal, ∠DAX = 180° − ∠ADC = 100°.',
      'A வழியாக DC க்கு இணையாக அதே திசையில் AX கதிர் வரைக. AD குறுக்குவெட்டி என்பதால் ∠DAX = 180° − ∠ADC = 100°.',
      'The two angles lie on the same side of the transversal between parallel lines.', 'இவை இணைகோடுகளுக்கு இடையே குறுக்குவெட்டியின் ஒரே பக்கத்தில் அமையும் உட்கோணங்கள்.'),
    step('Because AX ∥ CE and AB ∥ CF, ∠XAB = ∠ECF = 20°. Ray AX lies inside ∠BAD in this configuration, so ∠BAD = 100° + 20° = 120°.',
      'AX ∥ CE, AB ∥ CF என்பதால் ∠XAB = ∠ECF = 20°. இந்தப் படத்தில் AX கதிர் ∠BAD இன் உட்புறத்தில் இருப்பதால் ∠BAD = 100° + 20° = 120°.',
      'AX transfers the angle between the two line directions to vertex A.', 'AX மூலம் இரு கோட்டுத் திசைகளுக்கு இடைப்பட்ட கோணத்தை A முனைக்குக் கொண்டு வரலாம்.')
  ],5,['A cyclic quadrilateral with DC extended through C to E and CF parallel to AB. ∠ADC = 80°, ∠ABC = 100° and ∠ECF = 20°.',
    'வட்ட நாற்கரத்தில் DC ஆனது C வழியாக E வரை நீள்கிறது. CF ∥ AB. ∠ADC = 80°, ∠ABC = 100°, ∠ECF = 20°.']);

  mcq(19,['AD is a diameter of a circle and AB is a chord. If AD = 30 cm and AB = 24 cm then the distance of AB from the centre of the circle is',
    'AD ஐ விட்டமாகக் கொண்ட ஒரு வட்டத்தின் ஒரு நாண் AB. இங்கு, AD = 30 செமீ மற்றும் AB = 24 செமீ எனில், வட்ட மையத்திலிருந்து AB அமைந்துள்ள தூரம் _______'],
    choices([10,9,8,6],'cm'),2,[
    step('The radius is 15 cm and the centre-to-chord perpendicular cuts AB into two 12 cm halves. Find the missing leg of the right triangle.',
      'ஆரம் 15 செமீ. மையத்திலிருந்து நாணுக்கு வரையும் செங்குத்து AB ஐ 12 செமீ நீளமுள்ள இரு பகுதிகளாகப் பிரிக்கிறது. செங்கோண முக்கோணத்தின் தேவைப்படும் பக்க நீளத்தைக் காண்க.',
      'The radius to A is the hypotenuse.', 'A க்கு வரையும் ஆரமே கர்ணம்.',
      '√(15² − 12²) = √81 = 9',tex`\sqrt{15^2-12^2}=\sqrt{81}=9`)
  ],4);

  mcq(20,['In the given figure, If OP = 17 cm, PQ = 30 cm and OS is perpendicular to PQ, then RS is',
    'படத்தில் OP = 17 செமீ, PQ = 30 செமீ மற்றும் OS ஆனது PQ இக்குச் செங்குத்து எனில், RS இன் மதிப்பு.'],
    choices([10,6,7,9],'cm'),4,[
    step('OP and OS are radii. The perpendicular from O bisects PQ at R, so PR = 15 cm. Use Pythagoras to find OR.',
      'OP, OS ஆரங்கள். O இலிருந்து வரையும் செங்குத்து PQ ஐ R இல் இருசமமாகப் பிரிக்கும். எனவே PR = 15 செமீ. பிதாகரஸ் தேற்றத்தால் OR ஐக் காண்க.',
      'The right triangle OPR has hypotenuse 17 cm and one leg 15 cm.', 'OPR செங்கோண முக்கோணத்தின் கர்ணம் 17 செமீ; ஒரு செங்குத்துப் பக்கம் 15 செமீ.',
      'OR = √(17² − 15²) = 8',tex`OR=\sqrt{17^2-15^2}=8`),
    step('Since R is between O and S, subtract OR from OS.', 'R ஆனது O, S இடையில் உள்ளதால் OS இலிருந்து OR ஐக் கழிக்கவும்.',
      'The whole segment OS is one radius.', 'முழு OS துண்டும் ஓர் ஆரம்.',
      'RS = 17 − 8 = 9','RS=17-8=9')
  ],4,['A circle with centre O, chord PQ = 30 cm and radius OP = 17 cm. Radius OS crosses PQ perpendicularly at R.',
    'O மையமுள்ள வட்டத்தில் PQ = 30 செமீ என்ற நாணும் OP = 17 செமீ என்ற ஆரமும் உள்ளன. OS ஆரம் PQ ஐ R இல் செங்குத்தாக வெட்டுகிறது.']);
})();
