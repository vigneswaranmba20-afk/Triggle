/* Source-matched Grade 10 Chapter 5 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-5-ex5-1-q1-i","Quick Solution Plan: Use the coordinate area formula A = (1/2) |(x₁y₂ +"],
    ["c10-5-ex5-1-q1-ii","Quick Solution Plan: Apply the shoelace triangle area formula A = (1/2)"],
    ["c10-5-ex5-1-q11-i","Quick Solution Plan: Read vertices A(−5, 3), G(−4.5, 0.5), F(−2, 3) coun"],
    ["c10-5-ex5-1-q11-ii","Quick Solution Plan: Read vertices F(−2, 3), E(1.5, 1), D(1, 3) counterc"],
    ["c10-5-unit-q2","Quick Solution Plan: Apply the triangle area formula to (2, 1), (3, −2),"]
  ],
    "The two sets of diagonal products give the signed double area. Take the absolute value at the end, since direction around the triangle can change the sign.",
    "இரு குறுக்குப் பெருக்குத் தொகைகளின் வித்தியாசம் குறியுடன் கூடிய இருமடங்குப் பரப்பு. முக்கோணத்தைச் சுற்றும் திசை குறியை மாற்றலாம். எனவே இறுதியில் தனிமதிப்பை எடுத்துக்கொள்க.");

  add([
    ["c10-5-ex5-1-q2-i","Quick Solution Plan: Three points are collinear (all lie on the same str"],
    ["c10-5-ex5-1-q2-ii","Quick Solution Plan: Substitute the symbolic coordinates into the triang"],
    ["c10-5-ex5-1-q4-i","Quick Solution Plan: Collinear points form a triangle of area 0, which g"],
    ["c10-5-ex5-1-q4-ii","Quick Solution Plan: Set the area determinant equal to 0: x₁y₂ + x₂y₃ +"],
    ["c10-5-ex5-1-q7","Quick Solution Plan: Collinearity of A, B, C means area(ΔABC) = 0, givin"]
  ],
    "Three points on a single line have zero perpendicular height, so their triangle area is zero. This remains true for vertical lines, where ordinary slope division fails.",
    "மூன்று புள்ளிகளும் ஒரே நேர்க்கோட்டில் இருந்தால் செங்குத்து உயரம் பூச்சியம். எனவே அவற்றின் முக்கோணப் பரப்பு பூச்சியம். சாய்வுக்கு வகுத்தல் இயலாத குத்துக்கோடுகளுக்கும் இது பொருந்தும்.");

  add([
    ["c10-5-ex5-1-q5-i","Quick Solution Plan: First plot the four vertices on a grid and trace th"],
    ["c10-5-ex5-1-q5-ii","Quick Solution Plan: Order the vertices counterclockwise from the coordi"],
    ["c10-5-ex5-1-q11-iii","Quick Solution Plan: Read vertices B(−4, −2), C(2, −1), E(1.5, 1), G(−4."]
  ],
    "Trace one circuit around the outside, including the edge back to the first vertex. The shoelace calculation follows that boundary, so swapping adjacent vertices can describe a different shape.",
    "வெளி எல்லையை ஒருமுறை சுற்றி, கடைசி முனையை முதல் முனையுடன் இணைக்கவும். குறுக்குப் பெருக்கல் கணக்கு அந்த எல்லையைப் பின்பற்றுகிறது. அடுத்தடுத்த முனைகளை மாற்றினால் வேறு வடிவம் கிடைக்கலாம்.");

  add([
    ["c10-5-ex5-1-q8","Quick Solution Plan: Use midpoint equations (x₁+x₂)/2 = x_M and (y₁+y₂)/"]
  ],
    "A midpoint fixes the sum of the endpoint coordinates. Each vertex appears in two midpoint equations, so combining the equations isolates that vertex.",
    "ஒரு நடுப்புள்ளி இரு முனைகளின் ஆயக் கூடுதல்களைத் தீர்மானிக்கிறது. ஒவ்வொரு முனையும் இரு நடுப்புள்ளிச் சமன்பாடுகளில் இடம்பெறுகிறது. அவற்றைச் சேர்த்தும் கழித்தும் அம்முனையைத் தனியாகக் காணலாம்.");

  add([
    ["c10-5-ex5-1-q9","Quick Solution Plan: The concrete patio is the shaded ring outside the p"]
  ],
    "The larger outline includes both the pool and the patio. Subtract the area covered by the pool to leave only the surrounding region.",
    "வெளி எல்லைக்குள் நீச்சல் குளமும் அதைச் சுற்றிய பகுதியும் உள்ளன. குளத்தின் பரப்பைக் கழித்தால் சுற்றியுள்ள பகுதியின் பரப்பு மட்டும் எஞ்சும்.");

  add([
    ["c10-5-ex5-1-q10","Quick Solution Plan: First compute the area of triangular glass ΔABC in"]
  ],
    "After finding the available area, divide by the area needed for one shelf as the exercise’s area model directs. The quotient counts whole equal areas.",
    "கிடைக்கும் பரப்பைக் கண்டபின், பயிற்சியில் பயன்படுத்தும் பரப்பு முறையின்படி ஒரு தட்டுக்குத் தேவையான பரப்பால் வகுக்கவும். ஈவு சமமான முழுப் பகுதிகளின் எண்ணிக்கையைக் குறிக்கிறது.");

  add([
    ["c10-5-ex5-2-q1-i","Quick Solution Plan: Use the slope-inclination relation m = tan θ with θ"],
    ["c10-5-ex5-4-q1-ii","Quick Solution Plan: In 7x − 3/17 = 0, the y-term is absent so b = 0."],
    ["c10-5-ex5-5-q3","Quick Solution Plan: Any line of the form x = c (with constant c ≠ 0) fi"]
  ],
    "A vertical line has zero horizontal change and nonzero vertical change. Division by the horizontal change is undefined, and the horizontal coordinate stays fixed.",
    "குத்துக்கோட்டில் கிடைமட்ட மாற்றம் பூச்சியம், செங்குத்து மாற்றம் பூச்சியமல்ல. கிடைமட்ட மாற்றத்தால் வகுக்க இயலாது. x ஆயம் மாறாமல் இருக்கும்.");

  add([
    ["c10-5-ex5-2-q1-ii","Quick Solution Plan: Substitute θ = 0° into the slope-inclination formul"],
    ["c10-5-ex5-2-q2-i","Quick Solution Plan: Set tan θ = m = 0 for θ in [0°, 180°) and solve for"],
    ["c10-5-ex5-4-q1-i","Quick Solution Plan: Compare 5y − 3 = 0 with the general line form ax +"],
    ["c10-5-ex5-4-q2-ii","Quick Solution Plan: The line x = −11 is vertical (parallel to the Y-axi"]
  ],
    "A horizontal line keeps the vertical coordinate fixed. Its rise is zero even though the horizontal distance can be nonzero, so its slope is zero.",
    "கிடைக்கோட்டில் y ஆயம் மாறாது. கிடைமட்டத் தொலைவு பூச்சியமல்லாமல் இருந்தாலும் செங்குத்து மாற்றம் பூச்சியம். எனவே சாய்வு பூச்சியம்.");

  add([
    ["c10-5-ex5-2-q2-ii","Quick Solution Plan: Solve tan θ = 1 within 0° ≤ θ < 180°."]
  ],
    "Inclination is measured anticlockwise from the positive horizontal axis. With positive slope, the angle lies between zero and ninety degrees.",
    "x அச்சின் நேர்த் திசையிலிருந்து கடிகாரச் சுற்றுக்கு எதிர்த்திசையில் சாய்வுக்கோணம் அளவிடப்படுகிறது. நேர்மச் சாய்வுக்கு கோணம் பூச்சியத்திற்கும் தொண்ணூறு பாகைக்கும் இடையில் இருக்கும்.");

  add([
    ["c10-5-ex5-2-q3-i","Quick Solution Plan: Apply m = (y₂ − y₁) / (x₂ − x₁) between (5, √5) and"],
    ["c10-5-ex5-2-q3-ii","Quick Solution Plan: Apply m = (y₂ − y₁) / (x₂ − x₁), simplify to (2 cos"],
    ["c10-5-ex5-2-q7","Quick Solution Plan: Set (y₂ − y₁)/(x₂ − x₁) = −1/2 using (−2, a) and (9"],
    ["c10-5-ex5-5-q6","Quick Solution Plan: Apply the two-point slope formula (a − 3)/(4 − 12)"]
  ],
    "Use the same endpoint order in the numerator and denominator. Reversing both signs leaves the slope unchanged, provided the horizontal difference is nonzero.",
    "தொகுதியிலும் பகுதியிலும் முனைப்புள்ளிகளின் ஒரே வரிசையைப் பயன்படுத்துக. கிடைமட்ட வித்தியாசம் பூச்சியமல்ல எனில் இரு குறிகளையும் மாற்றினாலும் சாய்வு மாறாது.");

  add([
    ["c10-5-ex5-2-q4","Quick Solution Plan: First find midpoint P = ((4+(−6))/2, (2+4)/2) = (−1"],
    ["c10-5-ex5-2-q8","Quick Solution Plan: Compute slope m₁ = 1/3 for the first line, use m₁ ×"],
    ["c10-5-ex5-2-q9-i","Quick Solution Plan: Compute slopes of all three sides AB, BC, AC and ch"],
    ["c10-5-ex5-2-q9-ii","Quick Solution Plan: Compute the three side slopes m(LM), m(MN), m(LN) a"],
    ["c10-5-ex5-3-q5","Quick Solution Plan: Find slope m₁ = 1/5 of the two-point line, read slo"],
    ["c10-5-ex5-3-q9-ii","Quick Solution Plan: An altitude from A passes through A(6, 2) and is pe"],
    ["c10-5-ex5-4-q3-ii","Quick Solution Plan: Use m = −a/b on both lines to get m₁ = −5/23 and m₂"],
    ["c10-5-ex5-4-q4","Quick Solution Plan: Divide the first equation by 12 to read slope m₁ ="],
    ["c10-5-ex5-4-q6","Quick Solution Plan: Find slope m₁ = 5/2 for the line through (6, 7) and"],
    ["c10-5-ex5-4-q7","Quick Solution Plan: An altitude from vertex A is perpendicular to oppos"],
    ["c10-5-ex5-5-q7","Quick Solution Plan: First compute slope of segment joining (0, 0) and ("],
    ["c10-5-ex5-5-q8","Quick Solution Plan: A perpendicular bisector is perpendicular to segmen"],
    ["c10-5-ex5-5-q11","Quick Solution Plan: Find each slope: m₁ = 4/3, m₂ = 3/4, m₃ = −3/4, m₄"]
  ],
    "Perpendicular nonvertical lines have slopes whose product is −1. Rotate a rise-and-run pair through ninety degrees: the changes swap positions and one sign changes.",
    "குத்துக்கோடுகள் அல்லாத இரு செங்குத்துக் கோடுகளின் சாய்வுகளின் பெருக்கற்பலன் −1. செங்குத்து மற்றும் கிடைமட்ட மாற்றங்களைத் தொண்ணூறு பாகை திருப்பும் போது அவை இடம் மாறி ஒன்றின் குறி மட்டும் மாறுகிறது.");

  add([
    ["c10-5-ex5-2-q5","Quick Solution Plan: Label A(−3, −4), B(7, 2), C(12, 5)."],
    ["c10-5-ex5-2-q6","Quick Solution Plan: Label A(3, −1), B(a, 3), C(1, −3)."],
    ["c10-5-ex5-5-q4","Quick Solution Plan: Since the points are collinear, slope from (5, 7) t"]
  ],
    "Two segments sharing a point lie on one straight line when their slopes agree. Compare changes from the same point and check the horizontal differences.",
    "ஒரு பொதுப் புள்ளியுள்ள இரு கோட்டுத்துண்டுகளின் சாய்வுகள் சமமானால் அவை ஒரே நேர்க்கோட்டில் அமையும். அதே புள்ளியிலிருந்து மாற்றங்களை ஒப்பிட்டு கிடைமட்ட வித்தியாசங்களைச் சரிபார்க்கவும்.");

  add([
    ["c10-5-ex5-2-q10","Quick Solution Plan: A quadrilateral is a parallelogram if both pairs of"],
    ["c10-5-ex5-2-q13","Quick Solution Plan: Find the four midpoints P, Q, R, S of sides AB, BC,"],
    ["c10-5-ex5-5-q14","Quick Solution Plan: A parallelogram has both pairs of opposite sides pa"],
    ["c10-5-unit-q5","Quick Solution Plan: Label A(−2, −1), B(4, 0), C(3, 3), D(−3, 2) and use"]
  ],
    "Compare opposite sides as pairs in the given vertex order. A parallelogram needs both pairs to point in parallel directions.",
    "கொடுக்கப்பட்ட முனை வரிசையில் எதிர்ப்பக்கங்களைச் சோடியாக ஒப்பிடுக. இணைகரத்திற்கு இரண்டு சோடி எதிர்ப்பக்கங்களுமே இணையாக இருக்க வேண்டும்.");

  add([
    ["c10-5-ex5-2-q11","Quick Solution Plan: In any parallelogram ABCD, diagonals AC and BD bise"]
  ],
    "Both diagonals of a parallelogram share their midpoint. Equating the horizontal and vertical midpoint coordinates gives two separate equations for the unknown vertex.",
    "இணைகரத்தின் இரண்டு மூலைவிட்டங்களுக்கும் ஒரே நடுப்புள்ளி. அவற்றின் கிடைமட்ட, செங்குத்து நடுப்புள்ளி ஆயங்களைச் சமப்படுத்தினால் தெரியாத முனைக்கு இரு தனிச் சமன்பாடுகள் கிடைக்கும்.");

  add([
    ["c10-5-ex5-3-q1-i","Quick Solution Plan: First compute midpoint M = (5/2, −3/2)."],
    ["c10-5-ex5-3-q1-ii","Quick Solution Plan: Use midpoint M = (5/2, −3/2)."],
    ["c10-5-ex5-5-q2","Quick Solution Plan: Every point at perpendicular distance 10 units to t"]
  ],
    "A line parallel to a coordinate axis has one fixed coordinate. Use the corresponding coordinate of the given point or the required distance to determine that constant.",
    "ஓர் ஆய அச்சுக்கு இணையான நேர்க்கோட்டில் ஓர் ஆயம் மாறாது. கொடுக்கப்பட்ட புள்ளியின் பொருத்தமான ஆயத்தையோ தேவையான தொலைவையோ வைத்து அந்த மாறிலியைத் தீர்மானிக்கவும்.");

  add([
    ["c10-5-ex5-3-q2","Quick Solution Plan: Rearrange 2(x − y) + 5 = 0 into slope-intercept for"],
    ["c10-5-ex5-3-q3","Quick Solution Plan: Compute slope m = tan 30° = 1/√3, plug into y = mx"],
    ["c10-5-ex5-3-q4","Quick Solution Plan: Solve for y to match y = mx + c, then rationalize t"],
    ["c10-5-ex5-4-q2-i","Quick Solution Plan: Match y = 0.7x − 11 with slope-intercept form y = m"],
    ["c10-5-ex5-5-q12","Quick Solution Plan: Divide 8y = 4x + 21 through by 8 to isolate y: y ="]
  ],
    "Isolating y shows which part of the line changes with x. In slope-intercept form the coefficient of x is the slope, and setting x to zero gives the vertical intercept.",
    "y ஐத் தனியாக்கினால் x மாறும் போது எந்த உறுப்பு மாறுகிறது என்பது தெரியும். சாய்வு வடிவில் x இன் கெழு சாய்வு. x = 0 எனப் பிரதியிட்டால் செங்குத்து அச்சு வெட்டுத்துண்டு கிடைக்கும்.");

  add([
    ["c10-5-ex5-3-q6","Quick Solution Plan: Slope is m = tan 45° = 1 and the point is (19, 3)."],
    ["c10-5-ex5-3-q7-i","Quick Solution Plan: Compute slope m = 16/15 between (2, 2/3) and (−1/2,"],
    ["c10-5-ex5-3-q7-ii","Quick Solution Plan: Find slope m = 4/9 between (2, 3) and (−7, −1), the"],
    ["c10-5-ex5-3-q8","Quick Solution Plan: The shortest distance between two points is the str"],
    ["c10-5-ex5-3-q10","Quick Solution Plan: Substitute m = −5/4 and (x₁, y₁) = (−1, 2) into y −"],
    ["c10-5-ex5-4-q5","Quick Solution Plan: First compute the slope of QR as m = −3/4."],
    ["c10-5-unit-q7","Quick Solution Plan: Treat (price x, litres y) as points (14, 980) and ("]
  ],
    "The point-slope form uses coordinate changes from a point already on the line. Substituting that point makes both changes zero, so the equation passes through it automatically.",
    "புள்ளி–சாய்வு வடிவம் ஏற்கெனவே கோட்டில் உள்ள ஒரு புள்ளியிலிருந்து ஆய மாற்றங்களைப் பயன்படுத்துகிறது. அந்தப் புள்ளியைப் பிரதியிட்டால் இரு மாற்றங்களும் பூச்சியம். கோடு அப்புள்ளி வழியாகச் செல்கிறது.");

  add([
    ["c10-5-ex5-3-q9-i","Quick Solution Plan: A median from A connects A(6, 2) to the midpoint D"]
  ],
    "A median joins a vertex to the midpoint of the opposite side. That midpoint supplies the second point needed to determine the line equation.",
    "நடுக்கோடு ஒரு முனையையும் அதன் எதிர்ப்பக்கத்தின் நடுப்புள்ளியையும் இணைக்கிறது. நேர்க்கோட்டுச் சமன்பாட்டை நிர்ணயிக்கத் தேவையான இரண்டாவது புள்ளி அந்த நடுப்புள்ளியே.");

  add([
    ["c10-5-ex5-3-q11-i","Quick Solution Plan: At the start of the download (time x = 0 seconds),"],
    ["c10-5-ex5-3-q11-ii","Quick Solution Plan: When 75% is already downloaded, 25% remains (y = 0."],
    ["c10-5-ex5-3-q11-iii","Quick Solution Plan: Complete download means 0 MB remaining (y = 0, the"]
  ],
    "The graph tracks the fraction still to download. At any time, add the downloaded and remaining fractions to get one whole file.",
    "வரைபடம் பதிவிறக்க எஞ்சிய பகுதியைக் காட்டுகிறது. எந்த நேரத்திலும் பதிவிறங்கிய பகுதியையும் எஞ்சிய பகுதியையும் கூட்டினால் ஒரு முழுக் கோப்பு கிடைக்கும்.");

  add([
    ["c10-5-ex5-3-q12-i","Quick Solution Plan: Substitute x-intercept a = 4 and y-intercept b = −6"],
    ["c10-5-ex5-3-q12-ii","Quick Solution Plan: Substitute a = −5 and b = 3/4 into x/a + y/b = 1, t"],
    ["c10-5-ex5-3-q13-i","Quick Solution Plan: Move −6 to the right and divide by 6 to rewrite 3x"],
    ["c10-5-ex5-3-q13-ii","Quick Solution Plan: Move +12 to the right side as −12 and divide every"],
    ["c10-5-ex5-3-q14-i","Quick Solution Plan: Let intercepts be a = 2k and b = 5k (ratio 2:5)."],
    ["c10-5-ex5-3-q14-ii","Quick Solution Plan: Equal intercepts means a = b, so x/a + y/a = 1 beco"],
    ["c10-5-ex5-5-q9","Quick Solution Plan: Here A = (0, 8) gives y-intercept b = 8 and B = (5,"]
  ],
    "At the horizontal intercept the vertical coordinate is zero, and at the vertical intercept the horizontal coordinate is zero. Substituting either intercept checks the intercept form.",
    "கிடை அச்சு வெட்டில் செங்குத்து ஆயம் பூச்சியம். செங்குத்து அச்சு வெட்டில் கிடை ஆயம் பூச்சியம். இரு வெட்டுப்புள்ளிகளில் ஏதாவது ஒன்றைப் பிரதியிட்டுச் சமன்பாட்டைச் சரிபார்க்கவும்.");

  add([
    ["c10-5-ex5-4-q3-i","Quick Solution Plan: Compute the slope of each line using m = −a/b."]
  ],
    "Equal finite slopes give the same direction. Compare the constants in slope-intercept form to distinguish distinct parallel lines from a single repeated line.",
    "சமமான வரையறுக்கப்பட்ட சாய்வுகள் ஒரே திசையைக் குறிக்கும். சாய்வு வடிவிலுள்ள மாறிலிகளை ஒப்பிட்டு வேறுபட்ட இணைக்கோடுகளையும் ஒன்றிய கோடுகளையும் வேறுபடுத்தவும்.");

  add([
    ["c10-5-ex5-4-q8","Quick Solution Plan: A perpendicular bisector passes through midpoint M"],
    ["c10-5-unit-q8","Quick Solution Plan: Drop a perpendicular from P(3, 8) to mirror x + 3y"]
  ],
    "The perpendicular line meets the original at a right angle. For a bisector its intersection is the segment midpoint. For reflection this midpoint lies between the point and its image.",
    "செங்குத்துக் கோடு முதற் கோட்டை செங்கோணத்தில் சந்திக்கும். இருசமவெட்டிக்கு அச்சந்திப்பு கோட்டுத்துண்டின் நடுப்புள்ளி. பிரதிபலிப்பில் அந்நடுப்புள்ளி புள்ளிக்கும் அதன் பிம்பத்திற்கும் இடையே இருக்கும்.");

  add([
    ["c10-5-ex5-4-q9","Quick Solution Plan: Solve 7x + 3y = 10 and 5x − 4y = 1 simultaneously t"],
    ["c10-5-ex5-4-q10","Quick Solution Plan: Eliminate y between 5x − 6y = 2 and 3x + 2y = 10 to"],
    ["c10-5-ex5-4-q11","Quick Solution Plan: Solve the first pair to get P(0, −2) and the second"],
    ["c10-5-ex5-4-q12","Quick Solution Plan: Solve 8x + 3y = 18 and 4x + 5y = 9 to obtain inters"],
    ["c10-5-ex5-5-q5","Quick Solution Plan: Add the two equations directly to cancel −y and +y:"],
    ["c10-5-ex5-5-q15","Quick Solution Plan: A point of intersection satisfies both line equatio"],
    ["c10-5-unit-q9","Quick Solution Plan: Eliminate x between 4x + 7y − 3 = 0 and 2x − 3y + 1"],
    ["c10-5-unit-q10","Quick Solution Plan: First find the person's standing point by solving 2"]
  ],
    "A point at an intersection satisfies both equations. Eliminate a variable to locate it, then check both original equations before using that point.",
    "வெட்டுப்புள்ளி இரு சமன்பாடுகளையும் நிறைவு செய்கிறது. ஒரு மாறியை நீக்கி அப்புள்ளியைக் கண்டபின், பயன்படுத்துவதற்கு முன் இரு முதற்சமன்பாடுகளிலும் சரிபார்க்கவும்.");

  add([
    ["c10-5-ex5-5-q1","Quick Solution Plan: Base along the X-axis stretches from (−5, 0) to (5,"]
  ],
    "The base lies on the horizontal axis, so the perpendicular height is the absolute vertical distance from the other vertex to that axis.",
    "அடிப்பக்கம் x அச்சில் உள்ளது. மற்ற முனையிலிருந்து அந்த அச்சுவரையிலான செங்குத்துத் தொலைவின் தனிமதிப்பே உயரம்.");

  add([
    ["c10-5-ex5-5-q10","Quick Solution Plan: A line perpendicular to 7x − 3y + 4 = 0 swaps coeff"]
  ],
    "Passing through the origin makes the constant term zero. First determine the perpendicular direction, then use that slope with the origin to fix the new line.",
    "ஆதி வழிச் செல்லும் நேர்க்கோட்டின் மாறிலி உறுப்பு பூச்சியம். முதலில் செங்குத்துத் திசையின் சாய்வைக் காண்க. பின்னர் அந்தச் சாய்வையும் ஆதியையும் கொண்டு புதிய கோட்டைக் காண்க.");

  add([
    ["c10-5-ex5-5-q13","Quick Solution Plan: By definition in Tamil Nadu coordinate geometry, a"]
  ],
    "Check the two pairs of opposite sides. The trapezium definition used here requires one parallel pair and one nonparallel pair of a simple quadrilateral.",
    "எதிர்ப்பக்கங்களின் இரு சோடிகளையும் சரிபார்க்கவும். இங்குள்ள சரிவக வரையறையில் குறுக்கிடாத நாற்கரத்தின் ஒரு சோடி இணையாகவும் மற்றொரு சோடி இணையற்றதாகவும் இருக்க வேண்டும்.");

  add([
    ["c10-5-unit-q1","Quick Solution Plan: Find midpoints A(−1, 3/2), B(2, 4), C(5, 3/2), D(2,"]
  ],
    "Join the midpoints in boundary order. Each midpoint segment is parallel to a rectangle diagonal and half its length. The rectangle diagonals are equal, so the four midpoint sides are equal.",
    "நடுப்புள்ளிகளை எல்லை வரிசையில் இணைக்கவும். ஒவ்வொரு நடுப்புள்ளிக் கோட்டுத்துண்டும் செவ்வகத்தின் ஒரு மூலைவிட்டத்திற்கு இணையாகவும் அதன் நீளத்தில் பாதியாகவும் இருக்கும். இரு மூலைவிட்டங்களும் சமம் என்பதால் நான்கு புதிய பக்கங்களும் சமம்.");

  add([
    ["c10-5-unit-q3","Quick Solution Plan: Find the pairwise intersections of the three lines."]
  ],
    "The pairwise intersections should give three distinct vertices. If all three lines meet at one point there is no enclosed region, and its area is zero.",
    "கோடுகளை இரண்டிரண்டாக வெட்டிப் பார்த்தால் மூன்று வெவ்வேறு முனைகள் கிடைக்க வேண்டும். மூன்று கோடுகளும் ஒரே புள்ளியில் சந்தித்தால் அடைபட்ட பகுதி இல்லை. அதன் பரப்பு பூச்சியம்.");

  add([
    ["c10-5-unit-q6","Quick Solution Plan: Let x-intercept = a and y-intercept = b."]
  ],
    "Two numbers with a given sum and product are roots of a quadratic. Assign each root to each axis in turn because swapping the two intercepts can give a different line.",
    "கொடுக்கப்பட்ட கூடுதல், பெருக்கற்பலன் கொண்ட இரு எண்கள் ஓர் இருபடிச் சமன்பாட்டின் மூலங்கள். அச்சு வெட்டுத்துண்டுகளை இடம் மாற்றினால் வேறு நேர்க்கோடு அமையலாம். எனவே இரு ஒதுக்கீடுகளையும் பரிசோதிக்கவும்.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
