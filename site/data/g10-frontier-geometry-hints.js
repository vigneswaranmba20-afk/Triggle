/* Source-matched Grade 10 Chapter 4 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-4-ex4-1-q4","Focus on the two small triangles QPT and RST."],
    ["c10-4-ex4-1-q7-i","L is the right-angle vertex of MLN."],
    ["c10-4-ex4-1-q7-ii","L is the right-angle vertex of MLN."],
    ["c10-4-ex4-1-q9","The triangles CBQ and CAP are right triangles with the same angle at C,"]
  ],
    "Match equal angles before comparing sides. Two equal angle pairs determine the third pair automatically and give similar triangles.",
    "பக்கங்களை ஒப்பிடும்முன் சமமான கோணங்களை இணைக்கவும். இரண்டு சோடி கோணங்கள் சமமானால் மூன்றாவது சோடியும் சமமாகும். எனவே முக்கோணங்கள் வடிவொத்தவை.");

  add([
    ["c10-4-ex4-1-q5","Add AD and DC to get AC."]
  ],
    "The hypotenuse lies opposite the right angle. Use that fact to choose which length is squared on its own in the Pythagorean equation.",
    "கர்ணம் செங்கோணத்திற்கு எதிரில் உள்ளது. பித்தாகரஸ் சமன்பாட்டில் எந்த நீளத்தின் வர்க்கம் தனியாக இருக்க வேண்டும் என்பதை இதைக் கொண்டு தீர்மானிக்கவும்.");

  add([
    ["c10-4-ex4-1-q6","Read the similarity statement in order."],
    ["c10-4-ex4-1-q7-iii","The top triangle is similar to the left triangle by part (i)."],
    ["c10-4-ex4-1-q7-iv","Use the similarity from part (iii)."]
  ],
    "Read the corresponding angles in the order given by the similarity statement. Matching those vertices first prevents dividing one side by an unrelated side.",
    "வடிவொத்த முக்கோணங்கள் கூறப்பட்ட வரிசையில் ஒத்த கோணங்களைப் படிக்கவும். முனைகளை முதலில் பொருத்தினால் தொடர்பில்லாத பக்கங்களைக் கொண்டு விகிதம் அமைப்பதைத் தவிர்க்கலாம்.");

  add([
    ["c10-4-ex4-1-q8","In the given similarity order, B matches E and C matches F."]
  ],
    "A scale factor acts on both the base and the perpendicular height of similar triangles. The area factor is the square of the length factor.",
    "வடிவொத்த முக்கோணங்களில் அடியும் செங்குத்து உயரமும் ஒரே அளவுக் காரணியால் மாறும். பரப்புக் காரணி நீளக் காரணியின் வர்க்கம்.");

  add([
    ["c10-4-ex4-1-q10","Start with the given triangle PQR."],
    ["c10-4-ex4-1-q11","Start with the given triangle LMN."],
    ["c10-4-ex4-1-q12","Start with the given triangle ABC."],
    ["c10-4-ex4-1-q13","Start with the given triangle PQR."]
  ],
    "Mark equally spaced steps on the auxiliary ray. A parallel through the chosen division point transfers the same fraction to the triangle side by Thales’ theorem.",
    "துணைக்கதிரில் சம இடைவெளிகளைப் பிரிக்கவும். தேர்ந்தெடுத்த பிரிப்புப் புள்ளி வழியாக வரையும் இணைக்கோடு தேல்ஸ் தேற்றத்தின்படி அதே பின்னத்தை முக்கோணப் பக்கத்துக்கு மாற்றுகிறது.");

  add([
    ["c10-4-ex4-2-q1-i","Thales’ theorem, also called the Basic Proportionality Theorem, applies"],
    ["c10-4-ex4-2-q1-ii","The parallel DE cuts AB and AC, so Thales’ theorem gives AD/DB = AE/EC."],
    ["c10-4-ex4-2-q4-i","In △ABC, AQ lies along AB and AP lies along AC."],
    ["c10-4-ex4-2-q4-ii","In triangle ABC, the parallel PQ divides AB and AC in the same ratio by"],
    ["c10-4-ex4-2-q7","In triangle ABC, DE is parallel to BC."]
  ],
    "Parallel lines produce matching angles. The resulting similar triangles give proportional sides, or equivalently equal cut ratios on the two sides.",
    "இணைகோடுகள் ஒத்த கோணங்களை உருவாக்குகின்றன. அதனால் கிடைக்கும் வடிவொத்த முக்கோணங்களின் பக்கங்கள் விகிதத்தில் அமையும். இரு பக்கங்களிலும் வெட்டப்படும் பகுதிகளின் விகிதங்களும் சமம்.");

  add([
    ["c10-4-ex4-2-q2","A trapezium here has parallel bases AB and DC."],
    ["c10-4-ex4-2-q6","Draw diagonal AC and name its intersection with EF point X."]
  ],
    "A diagonal divides the trapezium into two triangles. The parallel across it divides that same diagonal in one ratio, so both triangles use the same ratio.",
    "மூலைவிட்டம் சரிவகத்தை இரு முக்கோணங்களாகப் பிரிக்கிறது. அதைக் கடக்கும் இணைக்கோடு அதே மூலைவிட்டத்தை ஒரு விகிதத்தில் பிரிப்பதால் இரு முக்கோணங்களிலும் அந்த விகிதமே பொருந்தும்.");

  add([
    ["c10-4-ex4-2-q3","Subtract the given part from each whole side."]
  ],
    "Subtract each inner segment from its full side before comparing the two ratios. The converse of Thales’ theorem applies when the corresponding ratios agree.",
    "இரு விகிதங்களையும் ஒப்பிடும்முன் ஒவ்வொரு முழுப் பக்கத்திலிருந்தும் உட்பகுதியைக் கழிக்கவும். ஒத்த விகிதங்கள் சமமானால் தேல்ஸ் தேற்றத்தின் மறுதலை பொருந்தும்.");

  add([
    ["c10-4-ex4-2-q5","A rhombus has four equal sides and parallel opposite sides."]
  ],
    "Opposite sides of the rhombus are parallel. That gives a smaller similar triangle inside the larger one, while all four rhombus sides share one length.",
    "சாய்சதுரத்தின் எதிர்ப்பக்கங்கள் இணை. இதனால் பெரிய முக்கோணத்துக்குள் ஒரு சிறிய வடிவொத்த முக்கோணம் கிடைக்கும். சாய்சதுரத்தின் நான்கு பக்கங்களுக்கும் ஒரே நீளம்.");

  add([
    ["c10-4-ex4-2-q8-i","An angle bisector divides an angle into two equal parts."]
  ],
    "Check that the lengths can form a nondegenerate triangle before applying the bisector theorem. A longest side equal to the sum of the other two gives collinear points.",
    "கோண இருசமவெட்டித் தேற்றத்தைப் பயன்படுத்தும்முன் கொடுக்கப்பட்ட நீளங்கள் உண்மையான முக்கோணத்தை அமைக்குமா எனச் சரிபார்க்கவும். மிக நீண்ட பக்கம் மற்ற இரு பக்கங்களின் கூடுதலுக்குச் சமமெனில் புள்ளிகள் ஒரே கோட்டில் அமையும்.");

  add([
    ["c10-4-ex4-2-q8-ii","An angle bisector divides an angle into equal halves."],
    ["c10-4-ex4-2-q9","Since PS halves the angle at P and meets the opposite side at S, the ang"],
    ["c10-4-ex4-2-q10","In triangle ABC, AE bisects the angle at A and meets the opposite side a"]
  ],
    "An internal angle bisector divides the opposite side in the ratio of the adjacent sides. Keep the order of adjacent sides matched to the corresponding pieces.",
    "உட்கோண இருசமவெட்டி எதிர்ப்பக்கத்தை அடுத்துள்ள இரு பக்கங்களின் விகிதத்தில் பிரிக்கிறது. அடுத்துள்ள பக்கங்களை அவற்றுக்கு ஒத்த பிரிவுகளின் அதே வரிசையில் எழுதுக.");

  add([
    ["c10-4-ex4-2-q11","Draw PQ = 4.5 cm."],
    ["c10-4-ex4-2-q12","Draw QR = 5 cm and its perpendicular bisector through midpoint G."]
  ],
    "The chord and the fixed vertex angle determine a circular arc. The median condition picks a point on that arc at the required distance from the base midpoint.",
    "நாணும் நிர்ணயிக்கப்பட்ட முனைக் கோணமும் ஒரு வட்டவில்லைக் காட்டுகின்றன. நடுக்கோட்டின் நீளம், அடியின் நடுப்புள்ளியிலிருந்து தேவையான தொலைவில் அந்த வில்லிலுள்ள புள்ளியைத் தேர்ந்தெடுக்கிறது.");

  add([
    ["c10-4-ex4-2-q13","Draw QR = 6.5 cm and its perpendicular bisector."],
    ["c10-4-ex4-2-q14","Draw AB = 5.5 cm and its perpendicular bisector."]
  ],
    "The fixed vertex angle locates a circular arc. The fixed altitude locates a line parallel to the base. Their intersection satisfies both requirements.",
    "நிர்ணயிக்கப்பட்ட முனைக் கோணம் ஒரு வட்டவில்லைக் காட்டுகிறது. நிர்ணயிக்கப்பட்ட குத்துக்கோட்டு உயரம் அடிக்கு இணையான கோட்டைக் காட்டுகிறது. அவற்றின் வெட்டுப்புள்ளி இரண்டு நிபந்தனைகளையும் நிறைவேற்றும்.");

  add([
    ["c10-4-ex4-2-q15","Draw BC = 5.6 cm."],
    ["c10-4-ex4-2-q16","Draw base PQ = 6.8 cm."]
  ],
    "Find the vertex using the angle arc and the angle-bisector condition together. At the end check that the constructed line through the marked base point makes two equal angles.",
    "கோண வில்லையும் கோண இருசமவெட்டி நிபந்தனையையும் சேர்த்து முனையைக் காண்க. இறுதியில் குறித்த அடிப்புள்ளி வழிச் செல்லும் கோடு இரு சமக் கோணங்களை அமைக்கிறதா எனச் சரிபார்க்கவும்.");

  add([
    ["c10-4-ex4-3-q1","Draw an imaginary right triangle: one side is the 18 m eastward walk and"],
    ["c10-4-ex4-3-q2","The two streets A and B meet at a right angle."],
    ["c10-4-ex4-3-q3","The existing path first travels south and then east, so the two lengths"],
    ["c10-4-ex4-3-q6","The ladder, wall and ground make a right triangle."]
  ],
    "Perpendicular horizontal and vertical distances form the legs of a right triangle. The direct segment is its diagonal, found by taking the square root of the sum of the squared legs.",
    "ஒன்றுக்கொன்று செங்குத்தான கிடைமட்ட, செங்குத்துத் தொலைவுகள் செங்கோண முக்கோணத்தின் இரு பக்கங்கள். அவற்றின் வர்க்கங்களைக் கூட்டி வர்க்கமூலம் எடுத்தால் நேரடிக் கோட்டுத்துண்டின் நீளம் கிடைக்கும்.");

  add([
    ["c10-4-ex4-3-q4","Call the rectangle's length a and breadth b."],
    ["c10-4-ex4-3-q5","Let the shortest side be x metres."]
  ],
    "Use the right-triangle equation together with the stated relationship between the lengths. A candidate for a side length must be positive and satisfy the original conditions.",
    "செங்கோண முக்கோணச் சமன்பாட்டுடன் நீளங்களுக்கு இடையே கொடுக்கப்பட்ட தொடர்பையும் பயன்படுத்துக. பக்க நீளத்திற்கான மதிப்பு நேர்மமாகவும் முதற் நிபந்தனைகளுக்குப் பொருந்துவதாகவும் இருக்க வேண்டும்.");

  add([
    ["c10-4-ex4-3-q7","Let SR = t. Because QS is three times SR, QS = 3t. Adding the two pieces"],
    ["c10-4-ex4-3-q8","Trisect means divide into three equal pieces."]
  ],
    "Splitting the base creates shorter right triangles with a common perpendicular leg. Writing the base pieces using one variable lets the common square terms cancel when equations are compared.",
    "அடியைப் பிரித்தால் ஒரு பொதுச் செங்குத்துப் பக்கத்தைக் கொண்ட சிறிய செங்கோண முக்கோணங்கள் கிடைக்கும். அடிப்பகுதிகளை ஒரே மாறியால் எழுதினால் சமன்பாடுகளை ஒப்பிடும்போது பொது வர்க்க உறுப்புகள் நீங்கும்.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
