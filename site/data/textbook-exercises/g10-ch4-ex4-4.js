/* TN SCERT revised 2025, Grade 10 Geometry, Exercise 4.4. */
(() => {
  'use strict';
  const {register, both, step, answer} = window.TriggleGrade10Geometry;
  const tex = String.raw;
  const tangents = both('Tangents to a circle', 'வட்டத்தின் தொடுகோடுகள்');
  const rows = [];

  function question(number, en, ta, steps, result, figure, note, concept = 'circles-tangents') {
    rows.push({
      number, en, ta, title: number === 9 ? both('Concurrent angle bisectors','ஒருங்கிசையும் கோண இருசமவெட்டிகள்')
        : number === 10 ? both('Ceva’s theorem','சீவாஸ் தேற்றம்') : tangents, concept, steps, answer: result, figure, note,
      pdf: both(number === 16 ? 205 : 204, number < 15 ? 211 : 212)
    });
  }

  question(1, 'The length of the tangent to a circle from a point P, which is 25 cm away from the centre is 24 cm. What is the radius of the circle?',
    'வட்டத்தின் மையத்திலிருந்து 25 செ.மீ தொலைவில் உள்ள P என்ற புள்ளியிலிருந்து வட்டத்திற்கு வரையப்பட்ட தொடுகோட்டின் நீளம் 24 செ.மீ எனில், வட்டத்தின் ஆரம் என்ன?', [
      step('Call the centre O and the point of contact T. Join O to T. OT is perpendicular to PT, so OP is the hypotenuse.',
        'மையத்தை O எனவும், தொடுபுள்ளியை T எனவும் கொள்க. O-வை T-யுடன் இணைக்கவும். OT என்பது PT-க்குச் செங்குத்து. எனவே OP கர்ணம்.',
        'The radius to the point of contact is perpendicular to the tangent.', 'தொடுபுள்ளியில் ஆரம் தொடுகோட்டிற்குச் செங்குத்து.'),
      step('Apply Pythagoras in △OTP and take the positive square root.',
        '△OTP-யில் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தி மிகை வர்க்கமூலத்தை எடுக்கவும்.',
        'Subtract the square of the known leg from the square of the hypotenuse.', 'கர்ணத்தின் வர்க்கத்திலிருந்து தெரிந்த பக்கத்தின் வர்க்கத்தைக் கழிக்கவும்.',
        'OT² = 25² − 24² = 625 − 576 = 49; OT = 7', tex`\begin{aligned}OT^2&=25^2-24^2=49\\OT&=7\end{aligned}`)
    ], answer('Radius in centimetres.','ஆரம் சென்டிமீட்டரில்.', 'OT = 7', 'OT=7'));

  question(2, '△LMN is a right angled triangle with ∠L = 90°. A circle is inscribed in it. The lengths of the sides containing the right angle are 6 cm and 8 cm. Find the radius of the circle.',
    'செங்கோண முக்கோணம் LMN-யில் ∠L = 90° ஆகும். ஒரு வட்டமானது செங்கோண முக்கோணத்தின் உள்ளே அதன் பக்கங்களைத் தொடுமாறு வரையப்படுகிறது. செங்கோணத்தைத் தாங்கும் பக்கங்களின் நீளங்கள் 6 செ.மீ மற்றும் 8 செ.மீ எனில், வட்டத்தின் ஆரம் காண்க.', [
      step('The hypotenuse MN is 10 cm by Pythagoras. The triangle’s area is half the product of its perpendicular legs.',
        'பிதாகரஸ் தேற்றத்தின்படி கர்ணம் MN 10 செ.மீ. செங்குத்துப் பக்கங்களின் பெருக்கற்பலனில் பாதி முக்கோணத்தின் பரப்பளவு ஆகும்.',
        'The right-angle sides can be used as base and height.', 'செங்கோணத்தைத் தாங்கும் பக்கங்களை அடிப்பக்கமாகவும் உயரமாகவும் பயன்படுத்தலாம்.',
        'MN = √(36 + 64) = 10; [LMN] = 24', tex`MN=\sqrt{6^2+8^2}=10,\quad [LMN]=24`),
      step('Join the in-centre to all three vertices. Each resulting triangle has height r to its base, the corresponding side of LMN, because a radius to a tangent is perpendicular.',
        'உள்வட்ட மையத்தை மூன்று முனைகளுடனும் இணைக்கவும். உருவாகும் ஒவ்வொரு முக்கோணத்திற்கும் LMN-இன் ஒரு பக்கம் அடிப்பக்கமாகவும், அதற்குச் செங்குத்தான ஆரம் r உயரமாகவும் அமையும்.',
        'The three smaller triangles fill the original triangle.', 'மூன்று சிறிய முக்கோணங்களும் சேர்ந்து முழு முக்கோணத்தை உருவாக்குகின்றன.',
        '24 = r(6 + 8 + 10)/2 = 12r; r = 2', tex`\begin{aligned}24&=\dfrac{r(6+8+10)}{2}=12r\\r&=2\end{aligned}`)
    ], answer('Radius in centimetres.','ஆரம் சென்டிமீட்டரில்.', 'r = 2', 'r=2'));

  question(3, 'A circle is inscribed in △ABC having sides 8 cm, 10 cm and 12 cm as shown in figure, Find AD, BE and CF.',
    'படத்தில் காட்டியுள்ளபடி, 8 செ.மீ, 10 செ.மீ மற்றும் 12 செ.மீ பக்கங்கள் உடைய முக்கோணத்தினுள் ஒரு வட்டம் அமைந்துள்ளது எனில், AD, BE மற்றும் CF ஐக் காண்க.', [
      step('Tangents from each vertex have the same length. Write AD = AF = x, BD = BE = y and CE = CF = z. Read the lengths AB, BC and CA from the diagram.',
        'ஒவ்வொரு முனையிலிருந்தும் வரையப்பட்ட இரு தொடுகோட்டுத் துண்டுகளின் நீளங்கள் சமம். AD = AF = x, BD = BE = y, CE = CF = z என்க. படத்திலிருந்து AB, BC, CA நீளங்களை எடுக்கவும்.',
        'Each side is the sum of two tangent segments.', 'ஒவ்வொரு பக்கமும் இரு தொடுகோட்டுத் துண்டுகளின் கூடுதலாகும்.',
        'x + y = 12; y + z = 8; z + x = 10', tex`\begin{aligned}x+y&=12\\y+z&=8\\z+x&=10\end{aligned}`),
      step('Add all three equations and divide by two. Then subtract each pair sum from 15 to recover the missing variable.',
        'மூன்று சமன்பாடுகளையும் கூட்டி இரண்டால் வகுக்கவும். பின்னர் ஒவ்வோர் இரட்டைத் தொகையையும் 15-லிருந்து கழித்து மீதமுள்ள மாறியைக் காண்க.',
        'Each variable appears twice in the sum of the three equations.', 'மூன்று சமன்பாடுகளின் கூடுதலில் ஒவ்வொரு மாறியும் இருமுறை வருகிறது.',
        'x + y + z = 15; x = 15 − 8 = 7; y = 15 − 10 = 5; z = 15 − 12 = 3',
        tex`\begin{aligned}x+y+z&=15\\x&=15-8=7\\y&=15-10=5\\z&=15-12=3\end{aligned}`)
    ], answer('Lengths in centimetres.','நீளங்கள் சென்டிமீட்டரில்.', 'AD = 7, BE = 5, CF = 3', 'AD=7,\\ BE=5,\\ CF=3'),
    both('The circle touches AB at D, BC at E and CA at F. AB = 12 cm, BC = 8 cm and CA = 10 cm.',
      'வட்டம் AB-ஐ D-யிலும் BC-ஐ E-யிலும் CA-ஐ F-இலும் தொடுகிறது. AB = 12 செ.மீ, BC = 8 செ.மீ, CA = 10 செ.மீ.'));

  question(4, 'PQ is a tangent drawn from a point P to a circle with centre O and QOR is a diameter of the circle such that ∠POR = 120°. Find ∠OPQ.',
    'O-வை மையமாக உடைய வட்டத்திற்கு P-யிலிருந்து வரையப்பட்ட தொடுகோடு PQ. QOR ஆனது விட்டம் ஆகும். வட்டத்தில் ∠POR = 120° எனில், ∠OPQ-ஐக் காண்க.', [
      step('OQ and OR are opposite rays. The two angles with OP therefore form a straight angle.',
        'OQ, OR எதிரெதிர்க் கதிர்கள். எனவே OP-யுடன் அவை அமைக்கும் இரு கோணங்களின் கூடுதல் ஒரு நேர்க்கோணம்.',
        'A diameter passes through its centre.', 'விட்டம் மையத்தின் வழியாகச் செல்கிறது.',
        '∠POQ = 180° − 120° = 60°', tex`\angle POQ=180^\circ-120^\circ=60^\circ`),
      step('The radius OQ is perpendicular to PQ. Subtract the two known angles of △OPQ from 180°.',
        'ஆரம் OQ என்பது PQ-க்குச் செங்குத்து. △OPQ-யின் தெரிந்த இரு கோணங்களை 180°-இலிருந்து கழிக்கவும்.',
        'The point of contact Q supplies the right angle.', 'தொடுபுள்ளி Q-வில் செங்கோணம் அமைகிறது.',
        '∠OPQ = 180° − 90° − 60° = 30°', tex`\angle OPQ=180^\circ-90^\circ-60^\circ=30^\circ`)
    ], answer('','', '∠OPQ = 30°', tex`\angle OPQ=30^\circ`));

  question(5, 'A tangent ST to a circle touches it at B. AB is a chord such that ∠ABT = 65°. Find ∠AOB, where “O” is the centre of the circle.',
    'தொடுகோடு ST வட்டத்தினை B என்ற புள்ளியில் தொடுகிறது. ∠ABT = 65°. AB என்பது ஒரு நாண் எனில், ∠AOB-ஐக் காண்க. இதில் ‘O’ என்பது வட்டத்தின் மையம் ஆகும்.', [
      step('OB is perpendicular to BT. The chord lies within that right angle, so subtract the given 65°.',
        'OB என்பது BT-க்குச் செங்குத்து. நாண் அந்தச் செங்கோணத்திற்குள் அமைகிறது. எனவே கொடுத்த 65°-ஐக் கழிக்கவும்.',
        'The angle from the radius to the tangent ray is 90°.', 'ஆரத்திற்கும் தொடுகோட்டுக் கதிருக்கும் இடைப்பட்ட கோணம் 90°.',
        '∠ABO = 90° − 65° = 25°', tex`\angle ABO=90^\circ-65^\circ=25^\circ`),
      step('OA and OB are equal radii, so ∠OAB equals ∠ABO. Use the angle sum of △AOB.',
        'OA, OB சம ஆரங்கள். ஆகவே ∠OAB என்பது ∠ABO-க்குச் சமம். △AOB-யின் கோணங்களின் கூடுதலைப் பயன்படுத்துக.',
        'The angles opposite the equal radii are equal.', 'சம ஆரங்களுக்கு எதிரான கோணங்கள் சமம்.',
        '∠AOB = 180° − 2 × 25° = 130°', tex`\angle AOB=180^\circ-2\times25^\circ=130^\circ`)
    ], answer('','', '∠AOB = 130°', tex`\angle AOB=130^\circ`));

  question(6, 'In figure, O is the centre of the circle with radius 5 cm. T is a point such that OT = 13 cm and OT intersects the circle E, if AB is the tangent to the circle at E, find the lenght of AB.',
    'கொடுக்கப்பட்ட படத்தில் O-வை மையமாக உடைய வட்டத்தின் ஆரம் 5 செ.மீ ஆகும். T-யானது OT = 13 செ.மீ என அமைந்த ஒரு புள்ளி மற்றும் OT-யானது வட்டத்தை E-யில் வெட்டுகிறது. வட்டத்தில் E என்ற புள்ளியின் வழியாகச் செல்லும் ஒரு தொடுகோடு AB எனில், AB-யின் நீளம் காண்க.', [
      step('TP and TQ are the two tangents from T shown in the figure. OP is perpendicular to TP. Also E lies between O and T.',
        'படத்தில் T-யிலிருந்து வரையப்பட்ட இரு தொடுகோடுகள் TP, TQ. OP என்பது TP-க்குச் செங்குத்து. O, T இடையே E உள்ளது.',
        'Find TP in the right triangle OPT and subtract OE from OT to obtain ET.', 'செங்கோண முக்கோணம் OPT-யில் TP-ஐக் காண்க. ET-ஐக் காண OT-இலிருந்து OE-ஐக் கழிக்கவும்.',
        'TP = √(13² − 5²) = 12; ET = 13 − 5 = 8', tex`\begin{aligned}TP&=\sqrt{13^2-5^2}=12\\ET&=13-5=8\end{aligned}`),
      step('△TEA and △TPO share the angle at T and have right angles at E and P. They are similar by AA. Match EA with PO and TE with TP.',
        '△TEA, △TPO ஆகியவற்றில் T-யில் பொது கோணமும் E, P-யில் செங்கோணங்களும் உள்ளன. கோணம்–கோணம் விதிப்படி அவை வடிவொத்தவை. EA-க்கு PO-வும் TE-க்கு TP-யும் ஒத்த பக்கங்கள்.',
        'Match vertices by their equal angles before forming the proportion.', 'விகிதத்தை அமைக்கும்முன் சம கோணங்களைக் கொண்ட முனைகளைப் பொருத்துக.',
        'EA/5 = 8/12; EA = 10/3', tex`\dfrac{EA}{5}=\dfrac{8}{12},\quad EA=\dfrac{10}{3}`),
      step('Reflection across OT interchanges TP and TQ and fixes the line AB, so E is the midpoint of AB.',
        'OT-ஐப் பொறுத்த எதிரொளிப்பு TP, TQ-ஐ ஒன்றுக்கொன்று மாற்றுகிறது. AB கோடு மாறாது. எனவே AB-யின் நடுப்புள்ளி E.',
        'The two tangents from T are mirror images about OT.', 'T-யிலிருந்து வரையப்படும் இரு தொடுகோடுகளும் OT-ஐப் பொறுத்து சமச்சீரானவை.',
        'AB = 2EA = 20/3', tex`AB=2EA=\dfrac{20}{3}`)
    ], answer('Length in centimetres.','நீளம் சென்டிமீட்டரில்.', 'AB = 20/3', tex`AB=\dfrac{20}{3}`),
    both('The external tangents TP and TQ meet the tangent through E at A and B respectively. OP = 5 cm and OT = 13 cm.',
      'வெளிப்புறத் தொடுகோடுகள் TP, TQ முறையே E வழிச் செல்லும் தொடுகோட்டை A, B-யில் சந்திக்கின்றன. OP = 5 செ.மீ, OT = 13 செ.மீ.'));

  question(7, 'In two concentric circles, a chord of length 16 cm of larger circle becomes a tangent to the smaller circle whose radius is 6 cm. Find the radius of the larger circle.',
    'இரண்டு பொது மைய வட்டங்களில், 16 செ.மீ நீளமுடைய பெரிய வட்டத்தின் நாணானது 6 செ.மீ ஆரமுள்ள சிறிய வட்டத்திற்குத் தொடுகோடாக அமைந்தால், பெரிய வட்டத்தின் ஆரம் காண்க.', [
      step('Let AB be the chord, T the point of contact and O the common centre. OT is perpendicular to AB, so it bisects the larger circle’s chord.',
        'AB நாண் எனவும், T தொடுபுள்ளி எனவும், O பொது மையம் எனவும் கொள்க. OT என்பது AB-க்குச் செங்குத்து. எனவே அது பெரிய வட்டத்தின் நாணை இரு சம பகுதிகளாகப் பிரிக்கிறது.',
        'A perpendicular from the centre of a circle to a chord bisects the chord.', 'வட்ட மையத்திலிருந்து நாணுக்கு வரையப்படும் செங்குத்து நாணை இருசமப் பகுதிகளாகப் பிரிக்கும்.',
        'AT = 16/2 = 8', tex`AT=\dfrac{16}{2}=8`),
      step('In right triangle OTA the legs are 6 cm and 8 cm. The hypotenuse OA is the larger radius.',
        'செங்கோண முக்கோணம் OTA-யின் செங்குத்துப் பக்கங்கள் 6 செ.மீ, 8 செ.மீ. கர்ணம் OA பெரிய வட்டத்தின் ஆரம்.',
        'The endpoint A lies on the larger circle.', 'முனைப்புள்ளி A பெரிய வட்டத்தின் மீது உள்ளது.',
        'OA = √(6² + 8²) = 10', tex`OA=\sqrt{6^2+8^2}=10`)
    ], answer('Larger radius in centimetres.','பெரிய வட்டத்தின் ஆரம் சென்டிமீட்டரில்.', 'OA = 10', 'OA=10'));

  question(8, 'Two circles with centres O and O′ of radii 3 cm and 4 cm, respectively intersect at two points P and Q, such that OP and O′P are tangents to the two circles. Find the length of the common chord PQ.',
    'O மற்றும் O′-ஐ மையப் புள்ளிகளாகக் கொண்ட இரு வட்டங்களின் ஆரங்கள் முறையே 3 செ.மீ மற்றும் 4 செ.மீ ஆகும். இவை இரண்டும் P, Q என்ற புள்ளிகளில் வெட்டிக்கொள்கின்றன. OP மற்றும் O′P ஆகியவை வட்டங்களின் இரு தொடுகோடுகள் எனில், பொது நாண் PQ-யின் நீளம் காண்க.', [
      step('OP is a tangent to the circle with centre O′ at P, so OP is perpendicular to O′P. Apply Pythagoras to find OO′.',
        'OP என்பது O′-ஐ மையமாக உடைய வட்டத்திற்கு P-யில் தொடுகோடு. எனவே OP, O′P-க்குச் செங்குத்து. பிதாகரஸ் தேற்றத்தால் OO′-ஐக் காண்க.',
        'The two radii are the perpendicular legs of △OPO′.', 'இரு ஆரங்களும் △OPO′-இன் செங்குத்துப் பக்கங்கள்.',
        'OO′ = √(3² + 4²) = 5', tex`OO'=\sqrt{3^2+4^2}=5`),
      step('Both centres are equidistant from P and Q, so their joining line is the perpendicular bisector of PQ. Let M be the intersection. Compute the area of △OPO′ using the legs and then using base OO′ and height PM.',
        'இரு மையங்களும் P, Q-விலிருந்து சம தொலைவில் உள்ளன. எனவே மையங்களை இணைக்கும் கோடு PQ-க்கு மையக்குத்துக்கோடு. வெட்டுப்புள்ளியை M என்க. △OPO′-இன் பரப்பளவை முதலில் இரு செங்குத்துப் பக்கங்களாலும் பின்னர் அடிப்பக்கம் OO′, உயரம் PM ஆகியவற்றாலும் கணக்கிடுக.',
        'Changing the base does not change the area of the same triangle.', 'ஒரே முக்கோணத்திற்கு அடிப்பக்கம் மாறினாலும் பரப்பளவு மாறாது.',
        '3 × 4 = 5 × PM; PQ = 2PM = 24/5 = 4.8', tex`\begin{aligned}3\times4&=5PM\\PQ&=2PM=\dfrac{24}{5}=4.8\end{aligned}`)
    ], answer('Common chord in centimetres.','பொது நாணின் நீளம் சென்டிமீட்டரில்.', 'PQ = 4.8', 'PQ=4.8'));

  question(9, 'Show that the angle bisectors of a triangle are concurrent.',
    'ஒரு முக்கோணத்தின் கோண இருசம வெட்டிகள் ஒரு புள்ளியின் வழியாகச் செல்லும் எனக் காட்டுக.', [
      step('Let the internal bisectors from A, B and C meet the opposite sides at D, E and F respectively. Apply the angle bisector theorem at each vertex.',
        'A, B, C முனைகளிலிருந்து உள்கோண இருசமவெட்டிகள் எதிர்ப்பக்கங்களை முறையே D, E, F-இல் சந்திக்கட்டும். ஒவ்வொரு முனைக்கும் கோண இருசமவெட்டித் தேற்றத்தைப் பயன்படுத்துக.',
        'Each bisector divides the opposite side in the ratio of the sides adjacent to its angle.', 'ஒவ்வொரு இருசமவெட்டியும் எதிர்ப்பக்கத்தை அக்கோணத்தை ஒட்டிய பக்கங்களின் விகிதத்தில் பிரிக்கிறது.',
        'BD/DC = AB/AC; CE/EA = BC/BA; AF/FB = CA/CB', tex`\begin{aligned}\dfrac{BD}{DC}&=\dfrac{AB}{AC}\\\dfrac{CE}{EA}&=\dfrac{BC}{BA}\\\dfrac{AF}{FB}&=\dfrac{CA}{CB}\end{aligned}`),
      step('Multiply in cyclic order. Each side length cancels with itself, so the product is one. The converse of Ceva’s theorem gives concurrency.',
        'சுற்றுவரிசையில் விகிதங்களைப் பெருக்குக. ஒவ்வொரு பக்க நீளமும் தொகுதியிலும் பகுதியிலும் வருவதால் பெருக்கற்பலன் ஒன்று. சீவாஸ் தேற்றத்தின் மறுதலைப்படி இருசமவெட்டிகள் ஒருங்கிசைகின்றன.',
        'All three points are on sides of the triangle, so the internal form of Ceva applies.', 'மூன்று புள்ளிகளும் முக்கோணத்தின் பக்கங்களில் உள்ளன. எனவே சீவாஸ் தேற்றத்தின் உட்புற வடிவத்தைப் பயன்படுத்தலாம்.',
        '(BD/DC)(CE/EA)(AF/FB) = 1', tex`\dfrac{BD}{DC}\cdot\dfrac{CE}{EA}\cdot\dfrac{AF}{FB}=1`)
    ], answer('The three internal angle bisectors meet at one point.', 'மூன்று உள்கோண இருசமவெட்டிகளும் ஒரே புள்ளியில் சந்திக்கின்றன.'), null, null, 'concurrency');

  question(10, 'An artist has created a triangular stained glass window and has one strip of small length left before completing the window. She needs to figure out the length of left out portion based on the lengths of the other sides as shown in the figure.',
    'படத்தில் உள்ளவாறு ஒரு முக்கோண வடிவக் கண்ணாடி ஜன்னலை முழுமையாக உருவாக்க ஒரு சிறிய கண்ணாடித் துண்டு ஒரு கலை நிபுணருக்குத் தேவைப்படும். மற்ற கண்ணாடி துண்டுகளின் நீளங்களைப் பொருத்து அவருக்குத் தேவையான கண்ணாடித் துண்டின் நீளத்தைக் கணக்கிடவும்.', [
      step('The unknown strip is BF. The lines AD, BE and CF meet at one point in the diagram. Apply Ceva’s theorem to the side divisions.',
        'காண வேண்டிய துண்டு BF. படத்தில் AD, BE, CF ஒரே புள்ளியில் சந்திக்கின்றன. பக்கப் பிரிவுகளுக்குச் சீவாஸ் தேற்றத்தைப் பயன்படுத்துக.',
        'Use one ratio on each side, in a consistent direction around the triangle.', 'முக்கோணத்தை ஒரே திசையில் சுற்றி ஒவ்வொரு பக்கத்திலிருந்தும் ஒரு விகிதத்தை எடுக்கவும்.',
        '(AF/FB)(BD/DC)(CE/EA) = 1', tex`\dfrac{AF}{FB}\cdot\dfrac{BD}{DC}\cdot\dfrac{CE}{EA}=1`),
      step('Substitute the lengths from the diagram and solve for FB.',
        'படத்தில் கொடுத்த நீளங்களைப் பிரதியிட்டு FB-ஐக் காண்க.',
        'The factors of 3 cancel, leaving FB as the only unknown.', '3 என்ற காரணிகள் சுருங்குகின்றன. FB மட்டுமே தெரியாததாக உள்ளது.',
        '(5/FB)(3/10)(4/3) = 2/FB = 1; FB = 2', tex`\begin{aligned}\dfrac5{FB}\cdot\dfrac3{10}\cdot\dfrac43&=\dfrac2{FB}=1\\FB&=2\end{aligned}`)
    ], answer('Missing length in centimetres.','விடுபட்ட நீளம் சென்டிமீட்டரில்.', 'BF = 2', 'BF=2'),
    both('AD, BE and CF meet inside the triangle. AF = 5 cm, BD = 3 cm, DC = 10 cm, AE = 3 cm and EC = 4 cm. BF is unknown.',
      'AD, BE, CF முக்கோணத்திற்குள் ஒரே புள்ளியில் சந்திக்கின்றன. AF = 5 செ.மீ, BD = 3 செ.மீ, DC = 10 செ.மீ, AE = 3 செ.மீ, EC = 4 செ.மீ. BF தெரியவில்லை.'), null, 'concurrency');

  question(11, 'Draw a tangent at any point R on the circle of radius 3.4 cm and centre at P?',
    'P ஐ மையமாகக் கொண்ட 3.4 செ.மீ ஆரமுள்ள ஒரு வட்டத்திற்கு R என்ற புள்ளியில் தொடுகோடு வரைக.', [
      step('Set a compass to 3.4 cm and draw a circle centred at P. Mark any point R on it and draw the line PR.',
        'கவராயத்தை 3.4 செ.மீ அளவுக்குத் திறந்து P-ஐ மையமாகக் கொண்டு வட்டம் வரைக. வட்டத்தின் மீது R என்ற புள்ளியைக் குறித்துக் கோடு PR வரைக.',
        'PR is a radius because R lies on the circle.', 'R வட்டத்தின் மீது இருப்பதால் PR ஓர் ஆரம்.'),
      step('Mark two points a common distance from R on the line PR, one on each side of R. With the same compass opening, greater than that distance, draw intersecting arcs from the two points. Join the arc intersections to form the perpendicular through R.',
        'PR கோட்டில் R-இன் இருபுறமும் R-லிருந்து சம தொலைவில் இரு புள்ளிகளைக் குறிக்கவும். அத்தொலைவைவிட அதிகமான ஒரே கவராயத் திறப்பில் இரு புள்ளிகளிலிருந்தும் வெட்டும் விற்களை வரைக. விற்களின் இரு வெட்டுப்புள்ளிகளை இணைத்தால் R வழிச் செல்லும் செங்குத்து கிடைக்கும்.',
        'The intersection of two equal-radius arcs is equidistant from their centres, so the joining line is the perpendicular bisector.', 'சம ஆர விற்களின் வெட்டுப்புள்ளி இரு மையங்களிலிருந்தும் சம தொலைவில் இருக்கும். எனவே வெட்டுப்புள்ளிகளை இணைக்கும் கோடு மையக்குத்துக்கோடு.')
    ], answer('The perpendicular to PR at R is the required tangent.','R-இல் PR-க்குச் செங்குத்தாக வரையப்பட்ட கோடே தேவையான தொடுகோடு.'),
    both('Circle centred at P with the marked point R on its circumference.','P-ஐ மையமாகக் கொண்ட வட்டத்தின் மீது R குறிக்கப்பட்டுள்ளது.'));

  question(12, 'Draw a circle of radius 4.5 cm. Take a point on the circle. Draw the tangent at that point using the alternate segment theorem.',
    '4.5 செ.மீ ஆரமுள்ள வட்டம் வரைக. வட்டத்தின் மீது ஏதேனும் ஒரு புள்ளிக்கு மாற்று வட்டத்துண்டு தேற்றத்தினைப் பயன்படுத்தித் தொடுகோடு வரைக.', [
      step('Draw a circle with radius 4.5 cm and mark the chosen point P. Pick a second point Q so PQ is not a diameter. Mark R on the major arc PQ and draw the chords PQ, RP and RQ.',
        '4.5 செ.மீ ஆரமுள்ள வட்டம் வரைந்து தேர்ந்தெடுத்த புள்ளியை P எனக் குறிக்கவும். PQ விட்டமாக அமையாதவாறு மற்றொரு புள்ளி Q-ஐத் தேர்க. PQ பெருவில்லில் R-ஐக் குறித்துப் PQ, RP, RQ நாண்களை வரைக.',
        'The angle at R is an inscribed angle standing on chord PQ.', 'R-இல் உள்ள சுற்றுக்கோணம் PQ நாணால் தாங்கப்படுகிறது.'),
      step('At P, use PQ as one arm and copy ∠PRQ on the side of line PQ opposite R. Extend the resulting ray PX to a line.',
        'P-யில் PQ-ஐ ஒரு கரமாகக் கொண்டு PQ கோட்டின் R-க்கு எதிர்ப்புறத்தில் ∠PRQ-க்குச் சமமான கோணத்தை அமைக்கவும். கிடைக்கும் PX கதிரைக் கோடாக நீட்டிக்கவும்.',
        'Use the alternate segment of the circle to choose the correct side of the chord.', 'நாணின் சரியான பக்கத்தைத் தேர்ந்தெடுக்க மாற்று வட்டத்துண்டைப் பயன்படுத்துக.',
        '∠QPX = ∠PRQ', tex`\angle QPX=\angle PRQ`),
      step('By the alternate segment theorem the actual tangent ray on that side makes exactly this angle with PQ. A ray with that angle on that side is unique, so line PX is the tangent.',
        'மாற்று வட்டத்துண்டுத் தேற்றத்தின்படி உண்மையான தொடுகோட்டுக் கதிர் அப்புறத்தில் PQ-உடன் இதே கோணத்தை அமைக்கும். அப்புறத்தில் அக்கோணத்தை அமைக்கும் கதிர் ஒன்றே. ஆகவே PX தொடுகோடு.',
        'Copying the angle determines the tangent uniquely at P.', 'கோணத்தை நகலெடுப்பதால் P-யில் தொடுகோடு உறுதியாகிறது.')
    ], answer('Line PX is the tangent at P.', 'PX கோடு P-யில் தொடுகோடாகும்.'),
    both('Circle with the chosen contact point P marked on it.','வட்டத்தின் மீது தேர்ந்தெடுத்த புள்ளி P குறிக்கப்பட்டுள்ளது.'));

  function externalConstruction(number, en, ta, radius, distance, exact, approx) {
    const diameter = number === 15;
    const r = diameter ? both('First halve the diameter: the radius is 3 cm. ', 'முதலில் விட்டத்தை இரண்டால் வகுக்கவும். ஆரம் 3 செ.மீ. ') : both('', '');
    question(number, en, ta, [
      step(r.en + `Draw a circle of radius ${radius} cm centred at O. Draw the segment OP of length ${distance} cm.`,
        r.ta + `O-வை மையமாகக் கொண்டு ${radius} செ.மீ ஆரமுள்ள வட்டம் வரைக. ${distance} செ.மீ நீளமுடைய OP கோட்டுத்துண்டை வரைக.`,
        'The given distance from the centre is greater than the radius, so P lies outside.', 'மையத்திலிருந்து கொடுத்த தொலைவு ஆரத்தைவிட அதிகம். எனவே P வெளிப்புறத்தில் உள்ளது.'),
      step('Construct the perpendicular bisector of OP to mark its midpoint M. With centre M and radius MO, draw the circle with diameter OP. Mark its intersections with the original circle as A and B.',
        'OP-க்கு மையக்குத்துக்கோடு வரைந்து நடுப்புள்ளி M-ஐக் குறிக்கவும். M-ஐ மையமாகவும் MO-வை ஆரமாகவும் கொண்டு OP விட்டமுள்ள வட்டத்தை வரைக. முதல் வட்டத்துடன் வெட்டும் புள்ளிகளை A, B எனக் குறிக்கவும்.',
        'The auxiliary circle gives points from which OP subtends a right angle.', 'துணை வட்டத்தின் புள்ளிகளில் OP விட்டம் செங்கோணத்தைத் தாங்கும்.'),
      step(number === 16 ? 'Join P to A for one tangent. Joining P to B gives the other tangent, as requested in the Tamil edition.'
        : 'Join P to A and B. Both angles OAP and OBP are right angles since they stand on the diameter OP of the auxiliary circle. Thus PA and PB are perpendicular to the original radii and are tangents.',
        'P-ஐ A, B உடன் இணைக்கவும். துணை வட்டத்தின் விட்டம் OP தாங்கும் ∠OAP, ∠OBP இரண்டும் செங்கோணங்கள். ஆகவே PA, PB முதல் வட்டத்தின் ஆரங்களுக்குச் செங்குத்தான தொடுகோடுகள்.',
        'A line perpendicular to a radius at its endpoint on the circle is a tangent.', 'வட்டத்தின் மீது உள்ள ஆர முனையில் ஆரத்திற்குச் செங்குத்தான கோடு தொடுகோடாகும்.',
        '∠OAP = ∠OBP = 90°', tex`\angle OAP=\angle OBP=90^\circ`),
      step('Check the measured length by Pythagoras in △OAP. PB is the same length because both are tangents from P.',
        '△OAP-யில் பிதாகரஸ் தேற்றத்தால் அளந்த நீளத்தைச் சரிபார்க்கவும். P என்ற ஒரே புள்ளியிலிருந்து வரையப்பட்டதால் PB-யும் அதே நீளம்.',
        'OP is the hypotenuse of each right triangle.', 'ஒவ்வொரு செங்கோண முக்கோணத்திற்கும் OP கர்ணமாகும்.',
        `PA = PB = √(${distance}² − ${radius}²) ${exact === approx ? '=' : '≈'} ${approx}`,
        tex`\begin{aligned}PA=PB&=\sqrt{${distance}^2-${radius}^2}\\&${exact===approx?'=':tex`= ${exact}\approx`}${approx}\end{aligned}`)
    ], answer('Tangent lengths in centimetres.', 'தொடுகோட்டுத் துண்டுகளின் நீளங்கள் சென்டிமீட்டரில்.',
      `PA = PB ${exact === approx ? '=' : '≈'} ${approx}`, tex`PA=PB${exact===approx?'=':tex`\approx`}${approx}`),
    both(`The circle is centred at O with radius ${radius} cm, and point P is ${distance} cm from O.`,
      `O-வை மையமாகக் கொண்ட வட்டத்தின் ஆரம் ${radius} செ.மீ. P புள்ளி O-விலிருந்து ${distance} செ.மீ தொலைவில் உள்ளது.`),
    ({
      14: 'Both keys print 10.3 cm. The exact length is √105 cm, which rounds to 10.2 cm.',
      16: 'English requests one tangent and Tamil requests both. Both keys print 6.3 cm. The exact length 3.6√3 cm rounds to 6.2 cm.'
    })[number]);
  }

  externalConstruction(13,
    'Draw the two tangents from a point which is 10 cm away from the centre of a circle of radius 5 cm. Also, measure the lengths of the tangents.',
    '5 செ.மீ ஆரமுள்ள வட்டத்தின் மையத்திலிருந்து 10 செ.மீ தொலைவிலுள்ள புள்ளியிலிருந்து வட்டத்திற்குத் தொடுகோடுகள் வரையவும். மேலும் தொடுகோட்டின் நீளங்களைக் கணக்கிடுக.',
    5, 10, tex`5\sqrt3`, 8.7);
  externalConstruction(14,
    'Take a point which is 11 cm away from the centre of a circle of radius 4 cm and draw the two tangents to the circle from that point.',
    '4 செ.மீ ஆரமுள்ள வட்டம் வரைந்து அதன் மையத்திலிருந்து 11 செ.மீ தொலைவிலுள்ள ஒரு புள்ளியைக் குறித்து, அப்புள்ளியிலிருந்து வட்டத்திற்கு இரண்டு தொடுகோடுகள் வரைக.',
    4, 11, tex`\sqrt{105}`, 10.2);
  externalConstruction(15,
    'Draw the two tangents from a point which is 5 cm away from the centre of a circle of diameter 6 cm. Also, measure the lengths of the tangents.',
    '6 செ.மீ விட்டமுள்ள வட்டம் வரைந்து வட்டத்தின் மையத்திலிருந்து 5 செ.மீ தொலைவிலுள்ள ஒரு புள்ளியைக் குறிக்கவும். அப்புள்ளியிலிருந்து வட்டத்திற்குத் தொடுகோடுகள் வரைந்து, தொடுகோட்டின் நீளங்களைக் கணக்கிடுக.',
    3, 5, 4, 4);
  externalConstruction(16,
    'Draw a tangent to the circle from the point P having radius 3.6 cm, and centre at O. Point P is at a distance 7.2 cm from the centre.',
    'O-வை மையமாகக் கொண்ட 3.6 செ.மீ ஆரமுள்ள வட்டம் வரைக. வட்டத்தின் மையத்திலிருந்து 7.2 செ.மீ தொலைவிலுள்ள P என்ற புள்ளியைக் குறித்து அப்புள்ளியிலிருந்து வட்டத்திற்குத் தொடுகோடுகள் வரைக.',
    3.6, 7.2, tex`3.6\sqrt3`, 6.2);
  register('4.4', rows);
})();
