/* TN SCERT revised 2025, Grade 10 Geometry, Unit Exercise 4. */
(() => {
  'use strict';
  const {register, both, math, step, answer} = window.TriggleGrade10Geometry;
  const tex = String.raw;
  const rows = [];

  function question(number, en, ta, title, concept, steps, result, figure, part) {
    rows.push({number, part, en, ta, title, concept, steps, answer: result, figure,
      pdf: both(number <= 5 ? 206 : 207, number <= 3 ? 213 : 214)});
  }

  const altitude = both('BD is perpendicular to AC at D. CE is perpendicular to AB at E. BD and CE meet at F.',
    'BD என்பது D-யில் AC-க்குச் செங்குத்து. CE என்பது E-யில் AB-க்குச் செங்குத்து. BD, CE ஆகியவை F-இல் சந்திக்கின்றன.');
  const firstEn = 'In the figure, if BD ⟂ AC and CE ⟂ AB, prove that';
  const firstTa = 'கொடுக்கப்பட்ட படத்தில் BD ⟂ AC மற்றும் CE ⟂ AB, எனில்';
  const firstTitle = both('Two right triangles','இரு செங்கோண முக்கோணங்கள்');
  const rightAngles = step('D lies on AC and E lies on AB, so the perpendiculars make right angles at D and E.',
    'D என்பது AC மீதும் E என்பது AB மீதும் உள்ளன. செங்குத்துக் கோடுகள் D, E ஆகியவற்றில் செங்கோணங்களை அமைக்கின்றன.',
    'Use each given perpendicular at its own foot.', 'ஒவ்வொரு செங்குத்துக் கோட்டிற்கும் அதன் அடிப்புள்ளியைப் பயன்படுத்துக.',
    '∠AEC = ∠ADB = 90°', tex`\angle AEC=\angle ADB=90^\circ`);
  const sharedAngle = step('The angle at A is the same in both triangles. The rays AE and AB coincide, as do AC and AD.',
    'இரு முக்கோணங்களிலும் A-யில் உள்ள கோணம் ஒன்றே. AE, AB கதிர்கள் ஒன்றாகவும் AC, AD கதிர்கள் ஒன்றாகவும் அமைகின்றன.',
    'Trace the two rays from A before matching the vertices.', 'ஒத்த முனைகளைப் பொருத்தும்முன் A-யிலிருந்து செல்லும் இரு கதிர்களைக் கவனிக்கவும்.',
    '∠EAC = ∠DAB', tex`\angle EAC=\angle DAB`);
  const aa = step('There are two equal angle pairs. The triangles are similar by AA, in the order A ↔ A, E ↔ D and C ↔ B.',
    'இரு சமக் கோணச் சோடிகள் உள்ளன. கோணம்–கோணம் விதிப்படி A ↔ A, E ↔ D, C ↔ B என்ற வரிசையில் முக்கோணங்கள் வடிவொத்தவை.',
    'Two equal angles also force equality of the third pair.', 'இரு கோணச் சோடிகள் சமமாதலால் மூன்றாவது சோடியும் சமம்.',
    '△AEC ∼ △ADB', tex`\triangle AEC\sim\triangle ADB`);
  const firstRatio = math('CA/AB = CE/DB', tex`\dfrac{CA}{AB}=\dfrac{CE}{DB}`);
  question(1, firstEn+'\n(i) △AEC ∼ △ADB', firstTa+'\n(i) △AEC ∼ △ADB என நிரூபிக்கவும்.',
    firstTitle,'similarity-criteria',[rightAngles,sharedAngle,aa],
    answer('','', '△AEC ∼ △ADB',tex`\triangle AEC\sim\triangle ADB`),altitude,'i');
  question(1, [firstEn+'\n(ii) ',firstRatio],[firstTa+'\n(ii) ',firstRatio,' என நிரூபிக்கவும்.'],
    firstTitle,'similarity-results',[rightAngles,sharedAngle,aa,
      step('Match CA to BA and CE to BD. Corresponding side lengths are proportional, and the order of letters within a segment does not change its length.',
        'CA-க்கு BA-யும் CE-க்கு BD-யும் ஒத்த பக்கங்கள். ஒத்த பக்கங்கள் விகிதச் சமம். கோட்டுத்துண்டின் முனை எழுத்துகளைத் திருப்பினாலும் நீளம் மாறாது.',
        'Match both sides using the vertex order from the similarity.', 'வடிவொப்புமையில் உள்ள முனை வரிசையைப் பயன்படுத்தி இரு பக்கங்களையும் பொருத்துக.',
        firstRatio.fallback,firstRatio.latex)],
    answer('','',firstRatio.fallback,firstRatio.latex),altitude,'ii');

  question(2, 'In the given figure AB ∥ CD ∥ EF. If AB = 6 cm, CD = x cm, EF = 4 cm, BD = 5 cm and DE = y cm. Find x and y.',
    'கொடுக்கப்பட்ட படத்தில் AB ∥ CD ∥ EF. AB = 6 செ.மீ, CD = x செ.மீ, EF = 4 செ.மீ, BD = 5 செ.மீ மற்றும் DE = y செ.மீ எனில், x மற்றும் y-யின் மதிப்பு காண்க.',
    both('Crossing lines between parallels','இணைகோடுகளுக்கிடையே வெட்டும் கோடுகள்'),'similarity-results',[
      step('△ABD and △FED are similar by AA. The vertical angles at D agree, and AB ∥ EF gives equal alternate interior angles.',
        '△ABD, △FED கோணம்–கோணம் விதிப்படி வடிவொத்தவை. D-யில் குத்தெதிர்க் கோணங்கள் சமம். AB ∥ EF என்பதால் ஒன்றுவிட்ட உட்கோணங்கள் சமம்.',
        'The crossing lines are transversals to the two parallel lines.', 'ஒன்றையொன்று வெட்டும் கோடுகள் இரு இணைகோடுகளையும் குறுக்கிடுகின்றன.',
        'BD/ED = AB/FE = 6/4; y = 5 × 4/6 = 10/3',tex`\begin{aligned}\dfrac{BD}{ED}&=\dfrac{AB}{FE}=\dfrac64\\y&=5\cdot\dfrac46=\dfrac{10}{3}\end{aligned}`),
      step('△ECD and △EAB are similar by AA because CD ∥ AB and the angle at E is common. The full side EB is ED + DB.',
        'CD ∥ AB, E-யில் பொது கோணம் என்பதால் △ECD, △EAB கோணம்–கோணம் விதிப்படி வடிவொத்தவை. முழுப் பக்கம் EB என்பது ED + DB.',
        'ED and EB are corresponding lengths in these two triangles.', 'இவ்விரு முக்கோணங்களிலும் ED, EB ஆகியவை ஒத்த பக்கங்கள்.',
        'EB = 5 + 10/3 = 25/3; x/6 = (10/3)/(25/3) = 2/5; x = 12/5',
        tex`\begin{aligned}EB&=5+\dfrac{10}{3}=\dfrac{25}{3}\\\dfrac{x}{6}&=\dfrac{ED}{EB}=\dfrac25\\x&=\dfrac{12}{5}\end{aligned}`)
    ],answer('Lengths in centimetres.','நீளங்கள் சென்டிமீட்டரில்.','x = 12/5, y = 10/3',tex`x=\dfrac{12}{5},\quad y=\dfrac{10}{3}`),
    both('A, C and E are collinear. AF and BE cross at D. The three parallel segments are AB, CD and EF.',
      'A, C, E ஒரே கோட்டில் உள்ளன. AF, BE ஆகியவை D-யில் வெட்டுகின்றன. AB, CD, EF மூன்றும் இணை கோட்டுத்துண்டுகள்.'));

  question(3, 'O is any point inside a triangle ABC. The bisector of ∠AOB, ∠BOC and ∠COA meet the sides AB, BC and CA in point D, E and F respectively. Show that AD × BE × CF = DB × EC × FA',
    'O ஆனது முக்கோணம் ABC-யின் உள்ளே அமைந்த ஒரு புள்ளி ஆகும். ∠AOB, ∠BOC மற்றும் ∠COA-யின் இருசமவெட்டிகள், பக்கங்கள் AB, BC மற்றும் CA-வை முறையே D, E மற்றும் F-ல் சந்திக்கின்றன எனில், AD × BE × CF = DB × EC × FA எனக் காட்டுக.',
    both('Three angle bisectors from O','O-விலிருந்து மூன்று கோண இருசமவெட்டிகள்'),'angle-bisector',[
      step('Apply the angle bisector theorem in △AOB, △BOC and △COA. The ratio of the two segments on each side is the ratio of the adjacent sides from O.',
        '△AOB, △BOC, △COA ஆகியவற்றில் கோண இருசமவெட்டித் தேற்றத்தைப் பயன்படுத்துக. ஒவ்வொரு பக்கத்தின் இரு துண்டுகளின் விகிதம் O-விலிருந்து செல்லும் அடுத்துள்ள பக்கங்களின் விகிதத்திற்குச் சமம்.',
        'Each bisected angle is at O, so the ratios use OA, OB and OC.', 'பிரிக்கப்படும் கோணங்கள் அனைத்தும் O-வில் இருப்பதால் விகிதங்களில் OA, OB, OC இடம்பெறும்.',
        'AD/DB = OA/OB; BE/EC = OB/OC; CF/FA = OC/OA',tex`\begin{aligned}\dfrac{AD}{DB}&=\dfrac{OA}{OB}\\\dfrac{BE}{EC}&=\dfrac{OB}{OC}\\\dfrac{CF}{FA}&=\dfrac{OC}{OA}\end{aligned}`),
      step('Multiply the three equalities. Each length from O occurs once in a numerator and once in a denominator. The resulting product is one, so multiply through by DB × EC × FA.',
        'மூன்று சமன்பாடுகளையும் பெருக்கவும். O-விலிருந்து உள்ள ஒவ்வொரு நீளமும் தொகுதியிலும் பகுதியிலும் ஒருமுறை வருகிறது. பெருக்கற்பலன் ஒன்று. இருபுறத்தையும் DB × EC × FA-ஆல் பெருக்கவும்.',
        'All lengths are positive because the bisectors meet the interiors of the sides.', 'இருசமவெட்டிகள் பக்கங்களின் உட்புறத்தில் சந்திப்பதால் அனைத்து நீளங்களும் மிகையானவை.',
        '(AD/DB)(BE/EC)(CF/FA) = 1',tex`\dfrac{AD}{DB}\cdot\dfrac{BE}{EC}\cdot\dfrac{CF}{FA}=1`)
    ],answer('','','AD × BE × CF = DB × EC × FA',tex`AD\cdot BE\cdot CF=DB\cdot EC\cdot FA`));

  question(4, 'In the figure, ABC is a triangle in which AB = AC. Points D and E are points on the side AB and AC respectively such that AD = AE. Show that the points B, C, E and D lie on a same circle.',
    'கொடுக்கப்பட்ட முக்கோணம் ABC-யில் AB = AC ஆகும். AD = AE என இருக்குமாறு D மற்றும் E என்ற புள்ளிகள் முறையே பக்கங்கள் AB மற்றும் AC-யின் மீது அமைந்துள்ளன. B, C, E மற்றும் D என்ற புள்ளிகள் ஒரே வட்டத்தில் அமையும் எனக் காட்டுக.',
    both('A cyclic quadrilateral','வட்ட நாற்கரம்'),'circles-tangents',[
      step('The given equalities make the two ratios AD/AB and AE/AC equal. By the converse of the basic proportionality theorem, DE ∥ BC.',
        'கொடுத்த சமன்பாடுகளால் AD/AB, AE/AC இரண்டும் சமம். அடிப்படை விகிதசமத் தேற்றத்தின் மறுதலைப்படி DE ∥ BC.',
        'The two side points divide the equal sides in the same ratio.', 'இரு புள்ளிகளும் சம பக்கங்களை ஒரே விகிதத்தில் பிரிக்கின்றன.',
        'AD/AB = AE/AC ⇒ DE ∥ BC',tex`\dfrac{AD}{AB}=\dfrac{AE}{AC}\;\Longrightarrow\;DE\parallel BC`),
      step('Because AB = AC, the isosceles triangle has equal angles at B and C. Hence ∠DBC = ∠BCE. Also, ∠DBC and ∠BDE are on the same side of the transversal BD between parallel lines, so they sum to 180°.',
        'AB = AC என்பதால் இருசமபக்க முக்கோணத்தின் B, C அடிக்கோணங்கள் சமம். ஆகவே ∠DBC = ∠BCE. இணைகோடுகளுக்கிடையே BD குறுக்குக்கோட்டின் ஒரே பக்கத்தில் உள்ள ∠DBC, ∠BDE ஆகியவற்றின் கூடுதல் 180°.',
        'Use parallel sides to obtain a supplementary pair, then use the equal base angles to replace ∠DBC.', 'இணைகோடுகளால் மிகைநிரப்புக் கோணச் சோடியைக் காண்க. பின்னர் சம அடிக்கோணத்தைப் பயன்படுத்தி ∠DBC-க்குப் பதிலிடுக.',
        '∠BDE + ∠BCE = 180°',tex`\angle BDE+\angle BCE=180^\circ`),
      step('The supplementary angles are opposite in BCED. By the converse of the cyclic quadrilateral theorem the four vertices lie on one circle.',
        'BCED-இல் இவை எதிர்க்கோணங்கள். வட்ட நாற்கரத் தேற்றத்தின் மறுதலைப்படி நான்கு முனைகளும் ஒரே வட்டத்தின் மீது உள்ளன.',
        'Supplementary opposite angles characterise a cyclic quadrilateral.', 'எதிர்க்கோணங்களின் கூடுதல் 180° எனில் அது வட்ட நாற்கரம்.')
    ],answer('B, C, E and D lie on one circle.','B, C, E, D ஆகியவை ஒரே வட்டத்தில் உள்ளன.'),
    both('D is on AB and E is on AC. AB and AC are equal, and AD and AE are equal.',
      'D என்பது AB மீதும் E என்பது AC மீதும் உள்ளன. AB, AC சமம். AD, AE சமம்.'));

  question(5, 'Two trains leave a railway station at the same time. The first train travels due west and the second train due north. The first train travels at a speed of 20 km/hr and the second train travels at 30 km/hr. After 2 hours, what is the distance between them?',
    'இரண்டு தொடர்வண்டிகள் ஒரே நேரத்தில் ஒரு தொடர்வண்டி நிலையத்திலிருந்து புறப்படுகின்றன. முதல் வண்டி மேற்கு நோக்கியும், இரண்டாவது வண்டி வடக்கு நோக்கியும் செல்கின்றன. முதல் தொடர்வண்டி 20 கி.மீ/மணி வேகத்திலும், இரண்டாவது வண்டி 30 கி.மீ/மணி வேகத்திலும் செல்கின்றன. இரண்டு மணி நேரத்திற்குப் பின்னர் அவைகளுக்கு இடையேயுள்ள தொலைவு எவ்வளவு?',
    both('Distance between two trains','இரு தொடர்வண்டிகளுக்கு இடையிலான தொலைவு'),'pythagoras',[
      step('Multiply each speed by the travel time. The trains are 40 km west and 60 km north of the station.',
        'ஒவ்வொரு வேகத்தையும் பயண நேரத்தால் பெருக்கவும். நிலையத்திலிருந்து தொடர்வண்டிகள் முறையே 40 கி.மீ மேற்கிலும் 60 கி.மீ வடக்கிலும் உள்ளன.',
        'The time is two hours for both journeys.', 'இரு பயணங்களுக்கும் நேரம் இரண்டு மணி.',
        '20 × 2 = 40; 30 × 2 = 60',tex`20\times2=40,\qquad 30\times2=60`),
      step('West and north are perpendicular directions. The distance between the two trains is the hypotenuse of the right triangle formed by these two legs.',
        'மேற்கு மற்றும் வடக்கு திசைகள் ஒன்றுக்கொன்று செங்குத்து. இந்த இரு பக்கங்களால் அமையும் செங்கோண முக்கோணத்தின் கர்ணம் வண்டிகளுக்கு இடையேயுள்ள தொலைவு.',
        'Pythagoras applies to the direct distance, not the sum along the two tracks.', 'தண்டவாள நீளங்களின் கூடுதலுக்கு அல்லாமல் நேரடித் தொலைவைக் காண பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துக.',
        'd = √(40² + 60²) = √5200 = 20√13',tex`d=\sqrt{40^2+60^2}=\sqrt{5200}=20\sqrt{13}`)
    ],answer('Distance in kilometres.','தொலைவு கிலோமீட்டரில்.','20√13',tex`20\sqrt{13}`));

  const median = math('b² + c² = 2p² + a²/2',tex`b^2+c^2=2p^2+\dfrac{a^2}{2}`);
  question(6, ['D is the mid point of side BC and AE ⟂ BC. If BC = a, AC = b, AB = c, ED = x, AD = p and AE = h, prove that\n(iii) ',median],
    ['BC-யின் மையப்புள்ளி D மற்றும் AE ⟂ BC. BC = a, AC = b, AB = c, ED = x, AD = p மற்றும் AE = h, எனில்\n(iii) ',median,' என நிரூபிக்க'],
    both('Median length identity','நடுக்கோட்டு நீள முற்றொருமை'),'pythagoras',[
      step('Use the line BC as a number line. Put D at zero, B at −a/2 and C at a/2. Let t be the signed position of the foot E. Since A is h units above or below the line, the squared distance to any point on the line is h² plus the squared horizontal difference.',
        'BC கோட்டை எண்கோடாகக் கொள்க. D-க்கு 0, B-க்கு −a/2, C-க்கு a/2 என அமைக்கவும். செங்குத்தின் அடிப்புள்ளி E-யின் குறியுடன் கூடிய இடம் t என்க. A கோட்டிலிருந்து h தொலைவில் இருப்பதால் கோட்டிலுள்ள எந்தப் புள்ளிக்கும் தொலைவின் வர்க்கம் h² மற்றும் கிடைமட்ட வேறுபாட்டின் வர்க்கத்தின் கூடுதல் ஆகும்.',
        'A signed position works whether E falls on BC or its extension.', 'E என்பது BC மீதோ அதன் நீட்சி மீதோ அமைந்தாலும் குறியுடன் கூடிய இடம் பொருந்தும்.',
        'p² = h² + t²; b² = h² + (a/2 − t)²; c² = h² + (a/2 + t)²',
        tex`\begin{aligned}p^2&=h^2+t^2\\b^2&=h^2+\left(\frac a2-t\right)^2\\c^2&=h^2+\left(\frac a2+t\right)^2\end{aligned}`),
      step('Expand and add the equations for b² and c². The terms −at and +at cancel. Then substitute h² + t² = p².',
        'b², c² ஆகியவற்றின் சமன்பாடுகளை விரித்துக் கூட்டுக. −at, +at உறுப்புகள் ஒன்றையொன்று நீக்குகின்றன. பின்னர் h² + t² = p² எனப் பிரதியிடுக.',
        'The sum is independent of which side of D contains E.', 'D-யின் எந்தப் பக்கத்தில் E இருந்தாலும் கூடுதல் மாறாது.',
        'b² + c² = 2(h² + t²) + a²/2 = 2p² + a²/2',tex`\begin{aligned}b^2+c^2&=2(h^2+t^2)+\dfrac{a^2}{2}\\&=2p^2+\dfrac{a^2}{2}\end{aligned}`)
    ],answer('','',median.fallback,median.latex),null,'iii');

  question(7, 'A man whose eye-level is 2 m above the ground wishes to find the height of a tree. He places a mirror horizontally on the ground 20 m from the tree and finds that if he stands at a point C which is 4 m from the mirror B, he can see the reflection of the top of the tree. How height is the tree?',
    '2 மீ உயரமுள்ள மனிதர் ஒரு மரத்தின் உயரத்தைக் கணக்கிட விரும்புகிறார். மரத்தின் அடியிலிருந்து 20 மீ தொலைவில் B என்ற புள்ளியில் ஒரு கண்ணாடி கிடைமட்டமாக மேல் நோக்கி வைக்கப்படுகிறது. கண்ணாடியிலிருந்து 4 மீ தொலைவில் C என்ற புள்ளியில் நிற்கும் மனிதர் மரத்தின் உச்சியின் பிரதிபலிப்பைக் கண்ணாடியில் காண முடிகிறது எனில், மரத்தின் உயரத்தைக் காண்க. (மரத்தின் அடி, கண்ணாடி, மனிதர் ஒரே நேர்க்கோட்டில் உள்ளதாகக் கொள்க).',
    both('A tree reflected in a mirror','கண்ணாடியில் மரத்தின் பிரதிபலிப்பு'),'similarity-criteria',[
      step('The tree and eye height give vertical legs, while the ground gives horizontal legs. The mirror makes the same angle with the incoming and outgoing light rays. The two right triangles are therefore similar by AA.',
        'மரமும் கண் உயரமும் செங்குத்துப் பக்கங்கள். தரை கிடைமட்டப் பக்கங்களைத் தருகிறது. கண்ணாடியில் படும் ஒளிக்கதிரும் எதிரொளிக்கும் ஒளிக்கதிரும் கண்ணாடியுடன் சம கோணங்களை அமைக்கின்றன. எனவே இரு செங்கோண முக்கோணங்களும் கோணம்–கோணம் விதிப்படி வடிவொத்தவை.',
        'Reflection gives equal angles with the normal and hence equal complementary angles with the mirror.', 'படுகோணமும் எதிரொளிப்புக் கோணமும் சமம். எனவே கண்ணாடியுடனான அவற்றின் நிரப்புக் கோணங்களும் சமம்.'),
      step('Match tree height H to eye height 2 m, and the distance 20 m to 4 m. Solve the proportion.',
        'மர உயரம் H-ஐ கண் உயரம் 2 மீ-உடனும், தொலைவு 20 மீ-ஐ 4 மீ-உடனும் பொருத்தி விகிதச் சமன்பாட்டைத் தீர்க்கவும்.',
        'The height and the distance from the mirror scale by the same factor.', 'உயரமும் கண்ணாடியிலிருந்து உள்ள தொலைவும் ஒரே விகிதத்தில் மாறுகின்றன.',
        'H/2 = 20/4 = 5; H = 10',tex`\dfrac{H}{2}=\dfrac{20}{4}=5,\quad H=10`)
    ],answer('Tree height in metres.','மர உயரம் மீட்டரில்.','H = 10','H=10'));

  question(8, 'An Emu which is 8 feet tall is standing at the foot of a pillar which is 30 feet high. It walks away from the pillar. The shadow of the Emu falls beyond Emu. What is the relation between the length of the shadow and the distance from the Emu to the pillar?',
    '30 அடி உயரமுள்ள ஒரு தூணின் அடிப்பகுதியிலிருந்து 8 அடி உயரமுள்ள ஒரு ஈமு கோழி விலகி நடந்து செல்கிறது. ஈமு கோழியின் நிழல் அது நடந்து செல்லும் திசையில் அதற்கு முன் விழுகிறது. ஈமு கோழியின் நிழலின் நீளத்திற்கும், ஈமு தூணிலிருந்து இருக்கும் தொலைவிற்கும் இடையே உள்ள தொடர்பைக் காண்க.',
    both('Shadow length and distance','நிழல் நீளமும் தொலைவும்'),'similarity-results',[
      step('Use the intended point light at the top of the pillar. Let d be the distance from the pillar to the emu and s the shadow length. The distance from the pillar to the shadow tip is d + s.',
        'தூணின் உச்சியில் ஒளிமூலம் உள்ளதாகக் கொள்க. தூணிலிருந்து ஈமு உள்ள தொலைவு d, நிழலின் நீளம் s என்க. தூணிலிருந்து நிழலின் முனை வரை தொலைவு d + s.',
        'Both right triangles end at the same shadow tip.', 'இரு செங்கோண முக்கோணங்களும் ஒரே நிழல் முனையில் முடிகின்றன.'),
      step('The triangles share the angle at the shadow tip and have right angles at their bases. By AA similarity, the height-to-base ratios agree.',
        'நிழலின் முனையில் பொது கோணமும் அடிகளில் செங்கோணங்களும் உள்ளன. கோணம்–கோணம் விதிப்படி வடிவொத்த முக்கோணங்களின் உயரம்–அடிப்பக்க விகிதங்கள் சமம்.',
        'The smaller height corresponds to the shadow length s.', 'சிறிய உயரத்திற்குரிய ஒத்த அடிப்பக்கம் நிழல் நீளம் s.',
        '8/s = 30/(d + s)',tex`\dfrac8s=\dfrac{30}{d+s}`),
      step('Multiply by both denominators and collect the terms in s. The relation also holds at d = 0 by the limiting construction.',
        'பகுதிகளால் குறுக்குப் பெருக்கல் செய்து s உள்ள உறுப்புகளை ஒன்றுசேர்க்கவும். d = 0 என்ற எல்லை நிலையிலும் இத்தொடர்பு பொருந்தும்.',
        'The same multiplier relates the shadow length to any positive walking distance.', 'நடந்து செல்லும் எந்த மிகைத் தொலைவிற்கும் நிழல் நீளம் இதே விகிதத்தில் அமையும்.',
        '8(d + s) = 30s; 22s = 8d; s = 4d/11',tex`\begin{aligned}8(d+s)&=30s\\22s&=8d\\s&=\dfrac4{11}d\end{aligned}`)
    ],answer('Shadow length s in terms of distance d.','தொலைவு d-ஐப் பொறுத்த நிழல் நீளம் s.','s = 4d/11',tex`s=\dfrac4{11}d`));

  question(9, 'Two circles intersect at A and B. From a point P on one of the circles lines PAC and PBD are drawn intersecting the second circle at C and D. Prove that CD is parallel to the tangent at P.',
    'A மற்றும் B என்ற புள்ளிகளில் இரு வட்டங்கள் வெட்டிக்கொள்கின்றன. ஒரு வட்டத்தின் மீதுள்ள புள்ளி P-யிலிருந்து வரையப்படும் PAC மற்றும் PBD என்ற கோடுகள் இரண்டாவது வட்டத்தினை முறையே C மற்றும் D-யில் வெட்டுகின்றன எனில், CD-யானது P வழியே வரையப்படும் தொடுகோட்டிற்கு இணை என நிரூபிக்கவும்.',
    both('Intersecting circles and a parallel tangent','வெட்டும் வட்டங்களும் இணை தொடுகோடும்'),'circles-tangents',[
      step('Write angles between lines modulo 180°. On the second circle, the inscribed angles at C and B standing on chord AD are equal in this convention.',
        'கோடுகளுக்கிடையே உள்ள கோணங்களை 180° வித்தியாசம் வரை ஒன்றாகக் கொள்க. இரண்டாவது வட்டத்தில் AD நாண் தாங்கும் C, B முனைகளிலுள்ள சுற்றுக்கோணங்கள் இம்முறையில் சமம்.',
        'Using angles between lines covers the secant extensions and both circle segments.', 'கோடுகளுக்கு இடையிலான கோணங்களைப் பயன்படுத்துவதால் வெட்டுக்கோட்டின் நீட்சிகளும் இரு வட்டத்துண்டுகளும் பொருந்தும்.',
        '∠(CA, CD) = ∠(BA, BD) mod 180°',tex`\angle(CA,CD)=\angle(BA,BD)\pmod{180^\circ}`),
      step('Let t be the tangent at P on the first circle. The tangent–chord theorem for PA gives the angle from PA to t as the angle from BA to BP.',
        'முதல் வட்டத்தில் P-யில் உள்ள தொடுகோட்டை t என்க. PA நாணுக்கான மாற்று வட்டத்துண்டுத் தேற்றத்தின்படி PA-யிலிருந்து t வரையிலான கோணம் BA-யிலிருந்து BP வரையிலான கோணத்திற்குச் சமம்.',
        'The inscribed angle at B on the first circle is supported by chord PA.', 'முதல் வட்டத்தில் B-யில் உள்ள சுற்றுக்கோணம் PA நாணால் தாங்கப்படுகிறது.',
        '∠(PA, t) = ∠(BA, BP) mod 180°',tex`\angle(PA,t)=\angle(BA,BP)\pmod{180^\circ}`),
      step('CA and PA lie on one line, and BD and BP lie on another. Substituting these common lines, CD and t make the same directed angle with PA, so they are parallel.',
        'CA, PA ஒரே கோட்டில் உள்ளன. BD, BP மற்றொரு கோட்டில் உள்ளன. இவற்றைப் பதிலிட்டால் CD மற்றும் t ஆகியவை PA-யுடன் ஒரே திசைக் கோணத்தை அமைக்கின்றன. ஆகவே அவை இணை.',
        'Two lines with the same direction modulo 180° are parallel.', '180° வித்தியாசம் வரை ஒரே திசையுடைய இரு கோடுகள் இணைகோடுகள்.',
        'CD ∥ t',tex`CD\parallel t`)
    ],answer('CD is parallel to the tangent at P.','CD என்பது P-யில் உள்ள தொடுகோட்டிற்கு இணை.','CD ∥ t',tex`CD\parallel t`));

  register('4.unit', rows);
})();
