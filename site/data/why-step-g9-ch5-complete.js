/* Bilingual Why-step hints for Grade 9 Chapter 5 Exercises 5.1–5.6 (50 new items). */
(() => {
  'use strict';
  const db = window.TriggleWhyStepG9;
  if (!db || !db.hints) return;
  const additions = {
  "g9-ch5-ex5.1-q1": {
    "step": 0,
    "expected": "Recall the sign rules of the four quadrants: I is (+, +), II is (−, +), III is (−, −), and IV is (+, −), where the first number is the x-coordinate (abscissa) and the second is the y-coordinate (ordinate).",
    "en": "The two signs describe independent movements from the origin: x controls left or right, and y controls up or down. Combine the two directions to locate the quadrant.",
    "ta": "இரு குறிகளும் ஆதியிலிருந்து இரண்டு தனித்தனி நகர்வுகளைக் குறிக்கின்றன. x இடம் அல்லது வலத்தையும், y மேல் அல்லது கீழையும் குறிக்கும். இரு திசைகளையும் இணைத்துக் காற்பகுதியைக் கண்டறியலாம்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.1-q2": {
    "step": 0,
    "expected": "To read a point (x, y) from the graph, move vertically to the X-axis to read the abscissa (x-coordinate) and horizontally to the Y-axis to read the ordinate (y-coordinate).",
    "en": "Projecting a point onto an axis keeps only its coordinate in that direction. Read the horizontal displacement first and the vertical displacement second, using the graph scale.",
    "ta": "ஒரு புள்ளியை ஓர் அச்சின் மீது வீழ்த்தும்போது அந்தத் திசைக்குரிய ஆயத்தொலைவு மட்டும் கிடைக்கும். வரைபட அளவுகோலைப் பயன்படுத்தி முதலில் கிடைமட்ட நகர்வையும் பின்னர் செங்குத்து நகர்வையும் படிக்க வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.1-q3": {
    "step": 0,
    "expected": "(i) In (−5, 3), (−1, 3), (0, 3), (5, 3), every point has the same y-coordinate y = 3, which is 3 units above the x-axis.",
    "en": "When one coordinate stays fixed, motion is possible only in the other direction. This is why a constant coordinate describes a straight line parallel to an axis.",
    "ta": "ஓர் ஆயத்தொலைவு மாறாமல் இருந்தால் மற்ற திசையில் மட்டுமே நகர முடியும். எனவே மாறாத ஆயத்தொலைவு ஓர் அச்சிற்கு இணையான நேர்க்கோட்டைக் குறிக்கிறது.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.1-q4": {
    "step": 0,
    "expected": "(i) Joining (0,0) → (−4,0) → (−4,−4) → (0,−4) → (0,0) gives two horizontal sides of length 4 and two vertical sides of length 4 meeting at 90° angles. Hence it is a square.",
    "en": "The graph lets us compare the directions and lengths of the sides. Equal lengths and right angles, or pairs of parallel sides, distinguish the possible quadrilaterals.",
    "ta": "வரைபடத்தின் மூலம் பக்கங்களின் திசைகளையும் நீளங்களையும் ஒப்பிடலாம். சம நீளங்கள், செங்கோணங்கள், இணைப் பக்கங்கள் ஆகியவற்றைக் கொண்டு நாற்கரத்தின் வகையைத் தீர்மானிக்கலாம்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.2-q1": {
    "step": 0,
    "expected": "Use the distance formula d = √[(x₂ − x₁)² + (y₂ − y₁)²].",
    "en": "The horizontal and vertical differences are perpendicular legs of a right triangle. Pythagoras combines their squares to give the straight-line distance, regardless of the signs of the differences.",
    "ta": "கிடைமட்ட மற்றும் செங்குத்து ஆயத்தொலைவு வேறுபாடுகள் செங்கோண முக்கோணத்தின் செங்குத்தான இரு பக்கங்களாகும். அவற்றின் வர்க்கங்களைக் கூட்டிப் பிதாகரஸ் தேற்றத்தால் நேர்க்கோட்டுத் தொலைவைக் காணலாம்.",
    "concept": "distance"
  },
  "g9-ch5-ex5.2-q4": {
    "step": 0,
    "expected": "(i) Find AB, BC, and CA for A(2, 2), B(−2, −2), C(−2√3, 2√3). Note that (2 + 2√3)² + (2 − 2√3)² = (4 + 8√3 + 12) + (4 − 8√3 + 12) = 32.",
    "en": "Compare the squared distances for the three sides before taking square roots. Equal squared lengths mean equal actual lengths, so this is enough to test whether the triangle is equilateral.",
    "ta": "வர்க்கமூலம் எடுப்பதற்கு முன் மூன்று பக்கங்களின் தொலைவுகளது வர்க்கங்களை ஒப்பிடலாம். வர்க்கங்கள் சமமாக இருந்தால் நீளங்களும் சமம்; சமபக்க முக்கோணமா என்பதை இதனால் அறியலாம்.",
    "concept": "distance"
  },
  "g9-ch5-ex5.2-q10": {
    "step": 0,
    "expected": "Since P lies on the x-axis, its y-coordinate is 0, so let P = (x, 0).",
    "en": "A point constrained to the horizontal axis has no vertical displacement from the origin. This leaves just one unknown coordinate; the distance condition then supplies an equation for it.",
    "ta": "கிடைமட்ட அச்சில் உள்ள புள்ளிக்கு ஆதியிலிருந்து செங்குத்து நகர்வு இல்லை. ஆகவே ஒரே ஓர் ஆயத்தொலைவு தெரியாததாக இருக்கும்; தொலைவு நிபந்தனை அதன் சமன்பாட்டைத் தருகிறது.",
    "concept": "distance"
  },
  "g9-ch5-ex5.2-q12": {
    "step": 0,
    "expected": "A circle with centre O(0, 0) and radius 30 intersects the x-axis (y = 0) at (±30, 0) and the y-axis (x = 0) at (0, ±30).",
    "en": "Every point on a circle is one radius from its centre. For points on different axes, the two radii are perpendicular, whereas opposite points on the same axis are separated by a diameter.",
    "ta": "வட்டத்தின் ஒவ்வொரு புள்ளியும் மையத்திலிருந்து ஓர் ஆரத் தொலைவில் இருக்கும். வெவ்வேறு அச்சுகளில் உள்ள புள்ளிகளுக்கான ஆரங்கள் செங்குத்தானவை; ஒரே அச்சில் எதிரெதிரே உள்ள புள்ளிகளை விட்டம் இணைக்கிறது.",
    "concept": "distance"
  },
  "g9-ch5-ex5.3-q1": {
    "step": 0,
    "expected": "Use the mid-point formula M = ((x₁ + x₂)/2, (y₁ + y₂)/2).",
    "en": "A midpoint is halfway along the displacement from either endpoint. Taking the average of the two horizontal coordinates and separately of the two vertical coordinates places the point halfway in both directions.",
    "ta": "நடுப்புள்ளி இரு முனைப்புள்ளிகளிலிருந்தும் பாதித் தொலைவில் உள்ளது. கிடைமட்ட ஆயத்தொலைவுகளின் சராசரியையும் செங்குத்து ஆயத்தொலைவுகளின் சராசரியையும் தனித்தனியாகக் கண்டால் இரு திசைகளிலும் பாதியில் உள்ள புள்ளி கிடைக்கும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q2": {
    "step": 0,
    "expected": "The centre C(−4, 2) is the mid-point of the diameter joining A(−3, 7) and the unknown end B(x, y).",
    "en": "The endpoints of a diameter lie on opposite sides of the centre at equal distances. Their coordinate displacements from the centre are therefore equal and opposite.",
    "ta": "விட்டத்தின் முனைப்புள்ளிகள் மையத்தின் எதிரெதிர்ப் பக்கங்களில் சம தொலைவில் இருக்கும். எனவே மையத்திலிருந்து அவற்றின் ஆயத்தொலைவு மாற்றங்கள் சம அளவிலும் எதிர்த் திசைகளிலும் இருக்கும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q3": {
    "step": 0,
    "expected": "Find the mid-point (x, y) of (3, 4) and (p, 7).",
    "en": "First express the midpoint in terms of the unknown coordinate. Since the midpoint also lies on the specified line, those coordinates must satisfy its equation.",
    "ta": "முதலில் தெரியாத ஆயத்தொலைவைக் கொண்டு நடுப்புள்ளியை எழுத வேண்டும். அந்த நடுப்புள்ளி கொடுக்கப்பட்ட கோட்டிலும் இருப்பதால் அதன் ஆயத்தொலைவுகள் அக்கோட்டின் சமன்பாட்டை நிறைவு செய்ய வேண்டும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q4": {
    "step": 0,
    "expected": "Let the vertices be A(x₁, y₁), B(x₂, y₂), C(x₃, y₃), with mid-points D(2, 4) of AB, E(−2, 3) of BC, and F(5, 2) of CA.",
    "en": "Each known side midpoint gives the sum of two vertex coordinates after multiplying by two. Combining the three pairwise sums isolates each unknown vertex.",
    "ta": "ஒவ்வொரு பக்கத்தின் நடுப்புள்ளி ஆயத்தொலைவையும் இரண்டால் பெருக்கினால் இரண்டு உச்சிகளின் ஆயத்தொலைவுக் கூட்டுத்தொகை கிடைக்கும். மூன்று கூட்டுத்தொகைகளையும் இணைத்துத் தெரியாத உச்சிகளைக் காணலாம்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q5": {
    "step": 0,
    "expected": "A perpendicular drawn from the centre of a circle to a chord bisects the chord. Therefore, D is the mid-point of AB.",
    "en": "The radii to both ends of a chord are equal. The perpendicular from the centre forms two congruent right triangles sharing one leg, so it cuts the chord into equal halves.",
    "ta": "நாணின் இரு முனைகளுக்கும் வரையப்பட்ட ஆரங்கள் சமம். மையத்திலிருந்து வரையப்படும் செங்குத்துக்கோடு ஒரு பொதுப் பக்கத்துடன் இரண்டு சர்வசம செங்கோண முக்கோணங்களை உருவாக்குவதால் நாணை இருசமமாகப் பிரிக்கிறது.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q6": {
    "step": 0,
    "expected": "In a square ABCD, the diagonals AC and BD bisect each other, so their mid-points coincide.",
    "en": "A square is also a parallelogram. Its diagonals cross at their common midpoint, so averaging the endpoints of either diagonal must produce the same coordinates.",
    "ta": "சதுரம் ஓர் இணைகரமும் ஆகும். அதன் மூலைவிட்டங்கள் பொதுவான நடுப்புள்ளியில் வெட்டுகின்றன. எனவே எந்த மூலைவிட்டத்தின் முனைப்புள்ளிகளின் சராசரியைக் கண்டாலும் ஒரே ஆயத்தொலைவுகள் கிடைக்கும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q7": {
    "step": 0,
    "expected": "First find vertex D(x₁, y₁) of △DEF from the side mid-points A(−3, 6) of DE, B(0, 7) of EF, and C(1, 9) of FD.",
    "en": "Recover the missing vertex using the side midpoint relations, then compare the midpoints of the quadrilateral's diagonals. A common midpoint establishes that the diagonals bisect one another.",
    "ta": "பக்க நடுப்புள்ளித் தொடர்புகளால் தெரியாத உச்சியைக் காணலாம். பின்னர் நாற்கரத்தின் மூலைவிட்டங்களின் நடுப்புள்ளிகளை ஒப்பிட வேண்டும். பொதுவான நடுப்புள்ளி இருந்தால் அவை ஒன்றையொன்று இருசமமாகப் பிரிக்கின்றன.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.3-q8": {
    "step": 0,
    "expected": "Since the right angle is at A, the hypotenuse is BC. Find the mid-point M of BC joining B(3, 2) and C(−3, −2).",
    "en": "In a right triangle, the midpoint of the hypotenuse is the centre of the circumcircle. All three vertices are therefore the same distance from it; the distance formula can verify this.",
    "ta": "செங்கோண முக்கோணத்தில் கர்ணத்தின் நடுப்புள்ளி சுற்றுவட்ட மையமாகும். எனவே மூன்று உச்சிகளும் அதிலிருந்து சம தொலைவில் இருக்கும். இதைத் தொலைவு வாய்ப்பாட்டால் சரிபார்க்கலாம்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.4-q1": {
    "step": 0,
    "expected": "Use the section formula for internal division in the ratio m : n = 3 : 2 with A(4, −3) and B(9, 7).",
    "en": "The ratio describes how far along the segment the point lies. Each coordinate is a weighted average of the endpoints, with the weight of an endpoint equal to the opposite part of the ratio.",
    "ta": "விகிதம் கோட்டுத்துண்டின் எந்தப் பகுதியில் புள்ளி உள்ளது என்பதைக் குறிக்கிறது. ஒவ்வோர் ஆயத்தொலைவும் முனைப்புள்ளிகளின் எடையிட்ட சராசரி; ஒவ்வொரு முனையின் எடை விகிதத்தின் எதிர்ப்பகுதி ஆகும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q2": {
    "step": 0,
    "expected": "Let P(2, −5) divide AB in the ratio m : n. By the section formula, equate the x-coordinate to 2.",
    "en": "The same division ratio governs both coordinate directions. Solve the weighted-average equation in one direction and use the other coordinate to confirm that the ratio is consistent.",
    "ta": "இரு ஆயத்தொலைவுத் திசைகளிலும் ஒரே பிரிப்பு விகிதம் பொருந்தும். ஒரு திசையின் எடையிட்ட சராசரிச் சமன்பாட்டால் விகிதத்தைக் கண்டு மற்ற ஆயத்தொலைவால் சரிபார்க்கலாம்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q3": {
    "step": 0,
    "expected": "Since AP = (2/5) AB and P lies on segment AB, PB = AB − AP = (3/5) AB. Therefore, AP : PB = 2 : 3.",
    "en": "A fraction of the whole segment is not yet the section ratio. Subtract it from the whole to obtain the remaining fraction, then compare the two parts using a common denominator.",
    "ta": "முழுக் கோட்டுத்துண்டின் ஒரு பின்னம் இன்னும் பிரிப்பு விகிதம் அல்ல. முழுவதிலிருந்து அப்பின்னத்தைக் கழித்து மீதிப் பின்னத்தைக் காண வேண்டும்; பின்னர் இரு பகுதிகளையும் பொது பகுதியுடன் ஒப்பிடலாம்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q4": {
    "step": 0,
    "expected": "Let P and Q be the points of trisection of AB so that AP = PQ = QB. Then P divides AB in the ratio 1 : 2, and Q divides AB in the ratio 2 : 1.",
    "en": "Trisection splits the segment into three equal lengths. Count how many equal lengths lie on either side of each division point before applying the section formula.",
    "ta": "முப்பிரிப்பு கோட்டுத்துண்டை மூன்று சம நீளங்களாகப் பிரிக்கிறது. பிரிப்பு வாய்ப்பாட்டைப் பயன்படுத்துவதற்கு முன் ஒவ்வொரு பிரிப்புப் புள்ளியின் இருபுறமும் எத்தனை சம பகுதிகள் உள்ளன என்று எண்ண வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q5": {
    "step": 0,
    "expected": "Let P and Q be the new endpoints beyond A and B respectively, so PA = (1/2)AB and BQ = (1/2)AB. Note that M, the mid-point of AB, is ((6−1)/2, (3−4)/2) = (5/2, −1/2), and A is the mid-point of P and M? Wait: PA = AM = MB = BQ = (1/2)AB.",
    "en": "Extending the segment by half its original length at both ends creates four equal half-length pieces. Compare the lengths on either side of a known endpoint to use internal division in the extended segment.",
    "ta": "கோட்டுத்துண்டின் இரு முனைகளிலும் அதன் பழைய நீளத்தின் பாதியைச் சேர்த்தால் நான்கு சம அரை நீளப் பகுதிகள் கிடைக்கும். நீட்டிய கோட்டுத்துண்டில் தெரிந்த முனைப்புள்ளியின் இருபுற நீளங்களையும் ஒப்பிட்டு உட்பிரிப்பு வாய்ப்பாட்டைப் பயன்படுத்தலாம்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q6": {
    "step": 0,
    "expected": "Assume B(9, −3) divides the segment joining A(7, −5) and C(13, 1) in the ratio k : 1. Find k from the x-coordinate.",
    "en": "If the middle point lies on the segment joining the other two, one positive internal ratio must reproduce both its coordinates. Checking both directions establishes collinearity.",
    "ta": "நடுவிலுள்ள புள்ளி மற்ற இரு புள்ளிகளை இணைக்கும் கோட்டுத்துண்டில் இருந்தால் ஒரே நேர் உட்பிரிப்பு விகிதம் அதன் இரு ஆயத்தொலைவுகளையும் தர வேண்டும். இரு திசைகளையும் சரிபார்த்தால் ஒருகோடமைவு உறுதியாகும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.4-q7": {
    "step": 0,
    "expected": "AB is increased by 25% beyond B to C, so BC = 25% of AB = (1/4) AB. Hence AB : BC = 4 : 1, meaning B divides AC internally in the ratio 4 : 1.",
    "en": "A percentage extension is measured relative to the original length, not the new total length. Convert the percentage to a fraction and compare the original segment with the extra part.",
    "ta": "நீட்டிப்பின் சதவீதம் புதிய மொத்த நீளத்தை அல்ல, பழைய நீளத்தையே அடிப்படையாகக் கொண்டது. சதவீதத்தைப் பின்னமாக மாற்றி பழைய கோட்டுத்துண்டையும் கூடுதல் பகுதியையும் ஒப்பிட வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.5-q1": {
    "step": 0,
    "expected": "Use the centroid formula G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3).",
    "en": "The medians meet at the balance point of the triangle. It is two thirds of the way from any vertex towards the opposite midpoint, which leads to averaging the three vertex coordinates.",
    "ta": "முக்கோணத்தின் நடுக்கோடுகள் சமநிலைப் புள்ளியில் சந்திக்கின்றன. எந்த உச்சியிலிருந்தும் எதிர்ப்பக்க நடுப்புள்ளியை நோக்கி மூன்றில் இரண்டு பங்கு தொலைவில் அப்புள்ளி அமையும்; இதனால் மூன்று உச்சிகளின் ஆயத்தொலைவுச் சராசரி கிடைக்கிறது.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q2": {
    "step": 0,
    "expected": "Let the third vertex be C(x, y). Equate the centroid of (3, −2), (5, 2), and (x, y) to (4, −2).",
    "en": "Multiplying the centroid coordinates by three recovers the coordinate sums of all three vertices. Subtract the two known vertex coordinates to isolate the missing ones.",
    "ta": "நடுக்கோட்டு மையத்தின் ஆயத்தொலைவுகளை மூன்றால் பெருக்கினால் மூன்று உச்சிகளின் ஆயத்தொலைவுக் கூட்டுத்தொகை கிடைக்கும். தெரிந்த இரு உச்சிகளின் ஆயத்தொலைவுகளைக் கழித்துத் தெரியாதவற்றைக் காணலாம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q3": {
    "step": 0,
    "expected": "The median through A joins vertex A(−1, 3) to the mid-point D of the opposite side BC.",
    "en": "A median joins a vertex to the midpoint of its opposite side, not necessarily at a right angle. Once that midpoint is found, use the distance formula to measure the median.",
    "ta": "நடுக்கோடு ஓர் உச்சியையும் எதிர்ப்பக்க நடுப்புள்ளியையும் இணைக்கிறது; அது கட்டாயமாகச் செங்குத்தாக இருக்க வேண்டியதில்லை. நடுப்புள்ளியைக் கண்ட பிறகு தொலைவு வாய்ப்பாட்டால் நடுக்கோட்டின் நீளத்தைக் காணலாம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q4": {
    "step": 0,
    "expected": "Equate the centroid of (1, 2), (h, −3), (−4, k) to (5, −1) to find h and k.",
    "en": "A centroid gives two separate averages, one for each coordinate direction. The unknown horizontal coordinate is determined from the horizontal sum and the unknown vertical coordinate from the vertical sum.",
    "ta": "நடுக்கோட்டு மையம் இரு திசைகளுக்கும் தனித்தனி சராசரியைத் தருகிறது. கிடைமட்டக் கூட்டுத்தொகையால் தெரியாத கிடைமட்ட ஆயத்தொலைவையும் செங்குத்துக் கூட்டுத்தொகையால் தெரியாத செங்குத்து ஆயத்தொலைவையும் காணலாம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q5": {
    "step": 0,
    "expected": "On the Euler line of a triangle, the centroid B divides the segment joining orthocentre A and circumcentre C internally in the ratio 2 : 1 (AB : BC = 2 : 1).",
    "en": "The Euler line connects the orthocentre, centroid and circumcentre. When they are distinct, the centroid lies between the other centres and is twice as far from the orthocentre as from the circumcentre; this relation gives the section formula.",
    "ta": "ஆய்லர் கோடு செங்கோட்டு மையம், நடுக்கோட்டு மையம், சுற்றுவட்ட மையம் ஆகியவற்றை இணைக்கிறது. இவை வேறுபட்ட புள்ளிகளாக இருந்தால் நடுக்கோட்டு மையம் மற்ற இரண்டுக்கும் இடையில் இருக்கும்; செங்கோட்டு மையத்திலிருந்து அதன் தொலைவு சுற்றுவட்ட மையத்திலிருந்து உள்ளதைவிட இருமடங்கு. இதனால் பிரிப்பு வாய்ப்பாட்டைப் பயன்படுத்தலாம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q6": {
    "step": 0,
    "expected": "First find the centroid G of △ABC with vertices A(3, 4), B(−2, −1), C(5, 3).",
    "en": "The centroid is found by averaging the triangle vertices. In the parallelogram, opposite vertices then share a common diagonal midpoint, allowing the fourth vertex to be recovered.",
    "ta": "முக்கோண உச்சிகளின் ஆயத்தொலைவுச் சராசரியால் நடுக்கோட்டு மையம் கிடைக்கும். இணைகரத்தில் எதிரெதிர் உச்சிகளை இணைக்கும் மூலைவிட்டங்களுக்குப் பொதுவான நடுப்புள்ளி இருப்பதால் நான்காவது உச்சியைக் காணலாம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.5-q7": {
    "step": 0,
    "expected": "The centroid of a triangle coincides with the centroid of the triangle formed by joining the mid-points of its three sides.",
    "en": "When the three side midpoints are averaged, every original vertex contributes twice, each time with half weight. The resulting average is exactly the average of the original three vertices.",
    "ta": "மூன்று பக்க நடுப்புள்ளிகளின் சராசரியைக் காணும்போது ஒவ்வொரு பழைய உச்சியும் இருமுறை அரை எடையுடன் இடம்பெறுகிறது. ஆகவே கிடைக்கும் சராசரி பழைய மூன்று உச்சிகளின் சராசரிக்குச் சமம்.",
    "concept": "centroid"
  },
  "g9-ch5-ex5.6-q1": {
    "step": 0,
    "expected": "Every point on the x-axis has the form (x, 0), so its y-coordinate is 0. Correct option: (3).",
    "en": "Points on an axis have no displacement in the perpendicular direction. Ask which coordinate measures that perpendicular displacement before choosing an option.",
    "ta": "ஓர் அச்சில் உள்ள புள்ளிகளுக்கு அதற்குச் செங்குத்தான திசையில் நகர்வு இல்லை. விடையைத் தேர்ந்தெடுப்பதற்கு முன் எந்த ஆயத்தொலைவு அந்த நகர்வைக் குறிக்கிறது என்று சிந்திக்க வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q2": {
    "step": 0,
    "expected": "(−5, 2) has signs (−, +) → II quadrant; (2, −5) has signs (+, −) → IV quadrant. Correct option: (3).",
    "en": "Treat the two signs independently: one locates the point to the left or right of the vertical axis, the other above or below the horizontal axis.",
    "ta": "இரு குறிகளையும் தனித்தனியாகக் கருத வேண்டும். ஒன்று செங்குத்து அச்சின் இடம் அல்லது வலப்பக்கத்தையும் மற்றொன்று கிடைமட்ட அச்சின் மேல் அல்லது கீழ்ப்பக்கத்தையும் குறிக்கிறது.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q3": {
    "step": 0,
    "expected": "CO lies on x = 0 (length 4) and AB lies on x = 3 (length 8). Since AB ∥ CO with unequal lengths (and OA = 5, BC = 3 are not parallel), OABC is a trapezium. Correct option: (3).",
    "en": "Check the directions of opposite sides on the coordinate plane, then compare their lengths. The number of parallel pairs and the angles identify the type of quadrilateral.",
    "ta": "ஆயத்தளத்தில் எதிரெதிர்ப் பக்கங்களின் திசைகளைச் சரிபார்த்து அவற்றின் நீளங்களை ஒப்பிட வேண்டும். இணைப் பக்கச் சோடிகளின் எண்ணிக்கையும் கோணங்களும் நாற்கரத்தின் வகையைக் காட்டுகின்றன.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q4": {
    "step": 0,
    "expected": "Fourth quadrant points have (+, −) signs: Q(3, −4) and R(1, −1). Correct option: (2).",
    "en": "Locate the requested quadrant on an axis sketch first. Then test the horizontal and vertical signs of each candidate point against that region.",
    "ta": "முதலில் கேட்கப்பட்ட காற்பகுதியை ஆய அச்சுப் படத்தில் கண்டறிய வேண்டும். பின்னர் ஒவ்வொரு புள்ளியின் கிடைமட்ட, செங்குத்துக் குறிகளும் அப்பகுதிக்கு பொருந்துகின்றனவா எனச் சரிபார்க்க வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q5": {
    "step": 0,
    "expected": "Any point on the y-axis has x = 0, and its ordinate is y = 4, so the point is (0, 4). Correct option: (2).",
    "en": "An ordinate measures vertical displacement. A point restricted to the vertical axis has no horizontal displacement; combine these two facts when reading the ordered pair.",
    "ta": "செங்குத்து ஆயத்தொலைவு செங்குத்து நகர்வைக் குறிக்கிறது. செங்குத்து அச்சில் உள்ள புள்ளிக்குக் கிடைமட்ட நகர்வு இல்லை. வரிசைச் சோடியைப் படிக்கும்போது இரு உண்மைகளையும் இணைக்க வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q6": {
    "step": 0,
    "expected": "d = √((1 − 2)² + (4 − 3)²) = √(1 + 1) = √2. Correct option: (4).",
    "en": "The distance formula is Pythagoras applied to perpendicular coordinate differences. Square each difference before adding them, and take the nonnegative square root only at the end.",
    "ta": "தொலைவு வாய்ப்பாடு என்பது செங்குத்தான ஆயத்தொலைவு வேறுபாடுகளுக்குப் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துவதாகும். ஒவ்வொரு வேறுபாட்டையும் வர்க்கப்படுத்திக் கூட்டிய பின் இறுதியில் எதிர்மமில்லா வர்க்கமூலம் எடுக்க வேண்டும்.",
    "concept": "distance"
  },
  "g9-ch5-ex5.6-q7": {
    "step": 0,
    "expected": "Since C(3, a − 3) lies on the x-axis, its y-coordinate is 0: a − 3 = 0 ⇒ a = 3. Correct option: (3).",
    "en": "A point on the horizontal axis cannot have any vertical displacement. Translate this geometric restriction into an equation involving its unknown coordinate.",
    "ta": "கிடைமட்ட அச்சில் உள்ள புள்ளிக்கு செங்குத்து நகர்வு இருக்க முடியாது. இந்த வடிவியல் நிபந்தனையை அதன் தெரியாத ஆயத்தொலைவைக் கொண்ட சமன்பாடாக மாற்ற வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q8": {
    "step": 0,
    "expected": "Equating corresponding coordinates: x + 2 = 5 ⇒ x = 3 and 4 = y − 2 ⇒ y = 6. Correct option: (3).",
    "en": "Ordered pairs are equal only when corresponding entries agree. Match horizontal with horizontal and vertical with vertical to obtain separate equations.",
    "ta": "ஒத்த இடங்களில் உள்ள உறுப்புகள் சமமானால் மட்டுமே வரிசைச் சோடிகள் சமமாகும். கிடைமட்ட உறுப்பையும் கிடைமட்ட உறுப்புடனும் செங்குத்து உறுப்பையும் செங்குத்து உறுப்புடனும் ஒப்பிட்டு தனிச் சமன்பாடுகளை அமைக்க வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q9": {
    "step": 0,
    "expected": "The four quadrants are open regions that exclude the coordinate axes. Points in Q₂ have y > 0 while points in Q₃ have y < 0, so they share no common points: Q₂ ∩ Q₃ = ∅ (Null set). Correct option: (3).",
    "en": "A quadrant is a region between the axes; its boundary axes are not included. Intersection means membership in both regions, so compare their sign conditions.",
    "ta": "காற்பகுதி என்பது அச்சுகளுக்கு இடையிலான பகுதி; எல்லைகளான அச்சுகள் அதில் சேராது. வெட்டுக்கணம் என்றால் இரு பகுதிகளுக்கும் பொதுவான உறுப்புகள்; எனவே அவற்றின் குறி நிபந்தனைகளை ஒப்பிட வேண்டும்.",
    "concept": "coordinates"
  },
  "g9-ch5-ex5.6-q10": {
    "step": 0,
    "expected": "Distance from origin (0, 0) to (5, −1) is √(5² + (−1)²) = √(25 + 1) = √26. Correct option: (3).",
    "en": "When one endpoint is the origin, the horizontal and vertical displacements are simply the coordinates of the other point. The usual distance formula still applies.",
    "ta": "ஒரு முனைப்புள்ளி ஆதியாக இருந்தால் கிடைமட்ட, செங்குத்து நகர்வுகள் மற்ற புள்ளியின் ஆயத்தொலைவுகளே ஆகும். வழக்கமான தொலைவு வாய்ப்பாடு இங்கும் பொருந்தும்.",
    "concept": "distance"
  },
  "g9-ch5-ex5.6-q11": {
    "step": 0,
    "expected": "C = ((2×5 + 1×2)/3, (2×7 + 1×4)/3) = (12/3, 18/3) = (4, 6). Correct option: (4).",
    "en": "Internal division is a weighted average. Assign each endpoint the weight of the opposite segment, add the weighted coordinates and divide by the total weight.",
    "ta": "உட்பிரிப்பு என்பது எடையிட்ட சராசரி. ஒவ்வொரு முனைப்புள்ளிக்கும் எதிர்ப்பகுதியின் நீள விகிதத்தை எடையாக அளித்து எடையிட்ட ஆயத்தொலைவுகளைக் கூட்டி மொத்த எடையால் வகுக்க வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.6-q12": {
    "step": 0,
    "expected": "Mid-point of (−4, 3) and (−2, 4) is (−3, 7/2). Equating a/3 = −3 ⇒ a = −9, and b/2 = 7/2 ⇒ b = 7. Correct option: (1).",
    "en": "A midpoint is determined by averaging the corresponding coordinates of the endpoints. If its coordinates contain parameters, equate them to those averages separately.",
    "ta": "முனைப்புள்ளிகளின் ஒத்த ஆயத்தொலைவுகளின் சராசரியால் நடுப்புள்ளி தீர்மானிக்கப்படுகிறது. அதன் ஆயத்தொலைவுகளில் மாறிகள் இருந்தால் அவற்றை அந்தச் சராசரிகளுக்குத் தனித்தனியாகச் சமப்படுத்த வேண்டும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.6-q13": {
    "step": 0,
    "expected": "Let ratio be k : 1. Equate x-coordinate: (−2k + 2)/(k + 1) = 1 ⇒ −2k + 2 = k + 1 ⇒ 3k = 1 ⇒ k = 1/3 (ratio 1:3). Correct option: (3).",
    "en": "The section formula expresses the position as a weighted average of the endpoints. Use one coordinate to solve for the ratio and check it against the other coordinate.",
    "ta": "பிரிப்பு வாய்ப்பாடு புள்ளியின் இடத்தை முனைப்புள்ளிகளின் எடையிட்ட சராசரியாகக் காட்டுகிறது. ஓர் ஆயத்தொலைவால் விகிதத்தைக் கண்டு மற்ற ஆயத்தொலைவுடன் சரிபார்க்க வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.6-q14": {
    "step": 0,
    "expected": "Other end = (2(−3) − 3, 2(2) − 4) = (−9, 0). Correct option: (4).",
    "en": "The circle centre is halfway between the endpoints of any diameter. Reflect the given endpoint across the centre by reversing its displacement in each coordinate direction.",
    "ta": "எந்த விட்டத்தின் முனைப்புள்ளிகளுக்கும் நடுவில் வட்ட மையம் இருக்கும். ஒவ்வொரு ஆயத்தொலைவுத் திசையிலும் கொடுக்கப்பட்ட முனையின் நகர்வை எதிர்த் திசையில் மாற்றி மற்ற முனையைக் காணலாம்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.6-q15": {
    "step": 0,
    "expected": "On the x-axis, y = 0. Let the ratio be k : 1, so (k b₂ + b₁)/(k + 1) = 0 ⇒ k = −b₁/b₂, i.e., −b₁ : b₂. Correct option: (2).",
    "en": "Where the segment crosses the horizontal axis, its vertical coordinate vanishes. Use the vertical component of the section formula to relate the signed endpoint ordinates.",
    "ta": "கோட்டுத்துண்டு கிடைமட்ட அச்சை வெட்டும் இடத்தில் செங்குத்து ஆயத்தொலைவு மறைகிறது. பிரிப்பு வாய்ப்பாட்டின் செங்குத்துக் கூறைப் பயன்படுத்தி முனைப்புள்ளிகளின் குறியுடன் கூடிய செங்குத்து ஆயத்தொலைவுகளைத் தொடர்புபடுத்த வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.6-q16": {
    "step": 0,
    "expected": "Ratio = −y₁ : y₂ = −4 : (−7) = 4 : 7. Correct option: (3).",
    "en": "A crossing of the horizontal axis balances vertical displacements of opposite signs. Set the weighted vertical coordinate to zero and solve for the positive division ratio.",
    "ta": "கிடைமட்ட அச்சை வெட்டும்போது எதிர்க் குறியுள்ள செங்குத்து நகர்வுகள் சமனாகின்றன. எடையிட்ட செங்குத்து ஆயத்தொலைவைப் பூச்சியத்திற்குச் சமப்படுத்தி நேர் பிரிப்பு விகிதத்தைக் காண வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.6-q17": {
    "step": 0,
    "expected": "A = mid(AB) + mid(CA) − mid(BC) = (3 + 2 − 1, 4 − 3 − 1) = (4, 0); B = mid(AB) + mid(BC) − mid(CA) = (3 + 1 − 2, 4 + 1 + 3) = (2, 8). Correct option: (2).",
    "en": "Twice each side midpoint gives a pairwise vertex sum. Adding two such sums and subtracting the third isolates twice the common vertex, which can then be halved.",
    "ta": "ஒவ்வொரு பக்க நடுப்புள்ளியையும் இரண்டால் பெருக்கினால் இரு உச்சிகளின் கூட்டுத்தொகை கிடைக்கும். இரண்டு கூட்டுத்தொகைகளைக் கூட்டி மூன்றாவதைக் கழித்தால் பொதுவான உச்சியின் இருமடங்கு கிடைக்கும்; அதைப் பாதியாக்க வேண்டும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.6-q18": {
    "step": 0,
    "expected": "M = ((−a − 3a)/2, (2b − 4b)/2) = (−4a/2, −2b/2) = (−2a, −b). Correct option: (2).",
    "en": "Average horizontal coordinates with one another and vertical coordinates with one another. Preserve their signs when collecting like algebraic terms.",
    "ta": "கிடைமட்ட ஆயத்தொலைவுகளை ஒன்றுடனொன்றும் செங்குத்து ஆயத்தொலைவுகளை ஒன்றுடனொன்றும் சராசரி காண வேண்டும். ஒத்த இயற்கணித உறுப்புகளைச் சேர்க்கும்போது அவற்றின் குறிகளைப் பாதுகாக்க வேண்டும்.",
    "concept": "midpoint"
  },
  "g9-ch5-ex5.6-q19": {
    "step": 0,
    "expected": "On the y-axis, x = 0. Let the ratio be k : 1: (2k − 5)/(k + 1) = 0 ⇒ k = 5/2 ⇒ 5 : 2. Correct option: (4).",
    "en": "At a crossing of the vertical axis, the horizontal coordinate is zero. Insert that condition into the horizontal part of the section formula before solving for the ratio.",
    "ta": "செங்குத்து அச்சை வெட்டும் இடத்தில் கிடைமட்ட ஆயத்தொலைவு பூச்சியம். விகிதத்தைக் காணும் முன் பிரிப்பு வாய்ப்பாட்டின் கிடைமட்டக் கூறில் அந்த நிபந்தனையைப் பயன்படுத்த வேண்டும்.",
    "concept": "section"
  },
  "g9-ch5-ex5.6-q20": {
    "step": 0,
    "expected": "Diagonals bisect each other: (1 + x)/2 = (3 + 3)/2 ⇒ 1 + x = 6 ⇒ x = 5. Correct option: (2).",
    "en": "The diagonals of a parallelogram bisect each other. Equate their corresponding midpoint coordinates to obtain an equation for the unknown coordinate.",
    "ta": "இணைகரத்தின் மூலைவிட்டங்கள் ஒன்றையொன்று இருசமமாகப் பிரிக்கின்றன. அவற்றின் ஒத்த நடுப்புள்ளி ஆயத்தொலைவுகளைச் சமப்படுத்தித் தெரியாத ஆயத்தொலைவிற்கான சமன்பாட்டைப் பெற வேண்டும்.",
    "concept": "midpoint"
  }
};
  window.TriggleWhyStepG9 = Object.freeze({
    ...db,
    hints: Object.freeze({ ...db.hints, ...additions })
  });
})();
