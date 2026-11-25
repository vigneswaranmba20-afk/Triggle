/* Source-matched Grade 10 Chapter 6 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-6-ex6-1-q1-i","Quick Solution Plan: Rewrite cot θ = cos θ / sin θ and tan θ = sin θ / c"],
    ["c10-6-ex6-1-q5-ii","Quick Solution Plan: Substitute cot θ = cos θ / sin θ = cos θ cosec θ, f"],
    ["c10-6-ex6-5-q8","Quick Solution Plan: Convert every function into sin θ and cos θ."]
  ],
    "Writing the ratios in sine and cosine exposes common factors and denominators. Keep track of where the original ratios are defined before cancelling.",
    "விகிதங்களை சைன், கோசைன் வடிவில் எழுதினால் பொதுக் காரணிகளும் பொதுப் பகுதிகளும் தெரியும். சுருக்குவதற்கு முன் முதலில் கொடுத்த விகிதங்கள் எந்தக் கோணங்களில் வரையறுக்கப்படுகின்றன எனப் பார்க்கவும்.");

  add([
    ["c10-6-ex6-1-q1-ii","Quick Solution Plan: Factor out tan²θ from the left-hand side to get tan"],
    ["c10-6-ex6-1-q5-i","Quick Solution Plan: Factor 1 − sin⁴θ = (1 − sin²θ)(1 + sin²θ) = cos²θ(1"],
    ["c10-6-ex6-5-q1","Quick Solution Plan: Substitute 1 + tan²θ = sec²θ and turn 1/sec²θ into"],
    ["c10-6-ex6-5-q2","Quick Solution Plan: Factor out tan θ to get tan θ(cosec²θ − 1) = tan θ"],
    ["c10-6-unit-q1-ii","Quick Solution Plan: Write tan²θ as sin²θ/cos²θ (or replace tan²θ + 1 wi"]
  ],
    "Look for the square terms that fit a Pythagorean identity. Replacing the whole group together reduces the expression while keeping it equal on its domain.",
    "பித்தாகரஸ் முற்றொருமைக்குப் பொருந்தும் வர்க்க உறுப்புகளைப் பாருங்கள். அந்தத் தொகுதியை ஒன்றாக மாற்றினால், வரையறுக்கப்பட்ட மதிப்புகளுக்குக் கோவையின் மதிப்பு மாறாமல் சுருங்கும்.");

  add([
    ["c10-6-ex6-1-q2-ii","Quick Solution Plan: Multiply numerator and denominator by the conjugate"],
    ["c10-6-ex6-1-q3-i","Quick Solution Plan: Rationalise inside the square root by multiplying n"],
    ["c10-6-ex6-1-q3-ii","Quick Solution Plan: Rationalise each radical term separately (or combin"],
    ["c10-6-unit-q2","Quick Solution Plan: Group A = 1 + sin θ so the numerator becomes (A − c"]
  ],
    "Multiplying by the conjugate creates a difference of squares. For a square root, keep the principal nonnegative root and justify any sign removed in simplification.",
    "இணைகோவையால் பெருக்கினால் இரு வர்க்கங்களின் வித்தியாசம் உருவாகும். வர்க்கமூலத்தின் குறையற்ற மதிப்பையே எடுத்துக்கொள்ளவும். சுருக்கத்தில் குறியை நீக்கினால் அதற்கான காரணத்தைச் சரிபார்க்கவும்.");

  add([
    ["c10-6-ex6-1-q4-i","Quick Solution Plan: Begin with the Pythagorean identity sec²θ − tan²θ ="]
  ],
    "The difference of the squared ratios is one. Cubing that difference connects the sixth powers to the mixed terms without testing individual angles.",
    "இரு விகிதங்களின் வர்க்கங்களின் வித்தியாசம் ஒன்று. அந்த வித்தியாசத்தைக் கனப்படுத்தினால் தனித்தனிக் கோணங்களைச் சோதிக்காமல் ஆறாம் அடுக்குகளையும் கலப்பு உறுப்புகளையும் தொடர்புபடுத்தலாம்.");

  add([
    ["c10-6-ex6-1-q4-ii","Quick Solution Plan: Expand both squares using (a + b)² = a² + 2ab + b²,"],
    ["c10-6-ex6-5-q3","Quick Solution Plan: Expand both squares using (a + b)² = a² + 2ab + b²."],
    ["c10-6-ex6-5-q9","Quick Solution Plan: Square both p and q."],
    ["c10-6-unit-q4","Quick Solution Plan: Square the known expression (a cos θ − b sin θ) = c"]
  ],
    "Expand the squares before combining them. Look at how the cross terms pair up, then group the squared trigonometric functions using the basic identities.",
    "வர்க்கங்களைக் கூட்டவோ கழிக்கவோ முன் அவற்றை விரிக்கவும். கலப்பு உறுப்புகள் எவ்வாறு சோடியாகின்றன என்று பார்த்து, அடிப்படை முற்றொருமைகளைப் பயன்படுத்தி திரிகோண விகிதங்களின் வர்க்கங்களைத் தொகுக்கவும்.");

  add([
    ["c10-6-ex6-1-q6-i","Quick Solution Plan: Combine over the common denominator (cos A + cos B)"],
    ["c10-6-unit-q1-i","Quick Solution Plan: Bring both terms over the common denominator (1 + s"]
  ],
    "A common denominator lets you combine all numerator terms. Expand the combined numerator and cancel only factors shared by the entire numerator and denominator.",
    "பொதுப் பகுதி கிடைத்தால் எல்லாத் தொகுதி உறுப்புகளையும் சேர்க்கலாம். சேர்ந்த தொகுதியை விரித்தபின், முழுத் தொகுதிக்கும் பகுதிக்கும் பொதுவாக உள்ள காரணிகளை மட்டுமே சுருக்கவும்.");

  add([
    ["c10-6-ex6-1-q6-ii","Quick Solution Plan: Factor both numerators with a³ + b³ = (a + b)(a² −"]
  ],
    "The sum of two cubes contains the sum of the bases as a factor. This matches the denominator and leaves a quadratic expression wherever the denominator is nonzero.",
    "இரு கனங்களின் கூட்டுத்தொகையில் அடிமானங்களின் கூட்டுத்தொகை ஒரு காரணி. அது பகுதியுடன் பொருந்துவதால், பகுதி பூச்சியமற்ற இடங்களில் ஓர் இருபடிக் கோவை எஞ்சும்.");

  add([
    ["c10-6-ex6-1-q7-i","Quick Solution Plan: Square both sides of sin θ + cos θ = √3 to find sin"]
  ],
    "For real angles, the sine and cosine squares sum to one. The square of their sum is at most two, so check that the printed premise can occur before using it.",
    "மெய்க் கோணங்களில் சைன், கோசைன் வர்க்கங்களின் கூடுதல் ஒன்று. அவற்றின் கூட்டுத்தொகையின் வர்க்கம் இரண்டை மீறாது. எனவே அச்சிட்ட நிபந்தனை சாத்தியமா என முதலில் பார்க்கவும்.");

  add([
    ["c10-6-ex6-1-q7-ii","Quick Solution Plan: Rearrange √3 sin θ = cos θ to get tan θ = 1/√3, whi"]
  ],
    "Before treating the two expressions as equal, check both are defined. Here the denominator in the ratio is zero and the triple angle has undefined tangent.",
    "இரு கோவைகளையும் சமம் எனக் கருதும்முன் இரண்டுக்கும் மதிப்பு உள்ளதா எனச் சரிபார்க்கவும். இங்கு விகிதத்தின் பகுதி பூச்சியம். மும்மடங்குக் கோணத்தின் டேன்ஜன்டும் வரையறுக்கப்படவில்லை.");

  add([
    ["c10-6-ex6-1-q8-i","Quick Solution Plan: Substitute m = cos α / cos β and n = cos α / sin β"],
    ["c10-6-ex6-1-q8-ii","Quick Solution Plan: Simplify x = 1/(sin θ cos θ) and y = sin²θ/cos θ."],
    ["c10-6-ex6-1-q9-i","Quick Solution Plan: Simplify q = (sin θ + cos θ)/(sin θ cos θ) = p/(sin"],
    ["c10-6-ex6-1-q9-ii","Quick Solution Plan: Replace sin²θ inside the bracket by 1 − cos²θ to ge"],
    ["c10-6-ex6-1-q10","Quick Solution Plan: Take reciprocals to get a = (1 + sin θ)/cos θ, squa"],
    ["c10-6-ex6-5-q4","Quick Solution Plan: Square sin θ + cos θ = a to see a² − 1 = 2 sin θ co"]
  ],
    "Rewrite the given relation using the same sine and cosine terms that appear in the target. This lets you replace an entire product or square in one step.",
    "நிறுவ வேண்டிய கோவையில் உள்ள அதே சைன், கோசைன் உறுப்புகளால் கொடுக்கப்பட்ட தொடர்பை எழுதுக. அப்போது ஒரு முழுப் பெருக்கலையோ வர்க்கத்தையோ ஒரே படியில் மாற்றிப் பிரதியிடலாம்.");

  add([
    ["c10-6-ex6-5-q5","Quick Solution Plan: Square both equations and subtract them using sec²θ"],
    ["c10-6-ex6-5-q7","Quick Solution Plan: Isolate tan θ = x/a and sec θ = y/b, then plug into"]
  ],
    "Isolate tangent and secant before squaring. The difference of their squares is one, so using the same scale for each ratio matters.",
    "வர்க்கப்படுத்துவதற்கு முன் டேன்ஜன்ட், சீகன்ட் ஆகியவற்றைத் தனியாக எழுதுக. அவற்றின் வர்க்கங்களின் வித்தியாசம் ஒன்று. எனவே ஒவ்வொரு விகிதத்திற்கும் உரிய அளவுக் காரணியைப் பயன்படுத்த வேண்டும்.");

  add([
    ["c10-6-ex6-5-q6","Quick Solution Plan: Dividing sin θ = cos θ by cos θ gives tan θ = 1 (θ"]
  ],
    "If sine equals cosine at a real angle, neither can be zero because their squares sum to one. Dividing by cosine is therefore valid.",
    "ஒரு மெய்க் கோணத்தில் சைனும் கோசைனும் சமமெனில் இரண்டில் எதுவும் பூச்சியமாகாது. அவற்றின் வர்க்கங்களின் கூட்டுத்தொகை ஒன்று. எனவே கோசைனால் வகுக்கலாம்.");

  add([
    ["c10-6-unit-q3","Quick Solution Plan: Split y cos³θ as (y cos θ)cos²θ and substitute y co"]
  ],
    "Use the second equation first to express both cubic terms with the same linear factor. The remaining sine and cosine squares then add to one.",
    "இரண்டாவது சமன்பாட்டைப் பயன்படுத்தி இரு கன உறுப்புகளுக்கும் ஒரே நேரியல் காரணியை உருவாக்குக. பின் எஞ்சிய சைன், கோசைன் வர்க்கங்கள் ஒன்றாகக் கூடுகின்றன.");

  add([
    ["c10-6-ex6-2-q1","Quick Solution Plan: In the right triangle formed by the ground distance"],
    ["c10-6-ex6-2-q4","Quick Solution Plan: Let pedestal height be h and horizontal distance be"],
    ["c10-6-ex6-2-q6","Quick Solution Plan: Find horizontal gap d from the bottom 60° triangle:"],
    ["c10-6-ex6-3-q2","Quick Solution Plan: Across the 70 m horizontal gap at 45° depression, t"],
    ["c10-6-ex6-4-q1","Quick Solution Plan: First use the 30° angle of depression from the 13 m"],
    ["c10-6-ex6-4-q4","Quick Solution Plan: Use the 30° depression from the 50 m apartment top"],
    ["c10-6-ex6-4-q5-i","Quick Solution Plan: First use the 30° depression from the 66 m roof to"],
    ["c10-6-ex6-4-q5-iii","Quick Solution Plan: From the lower triangle with vertical height 66 m a"],
    ["c10-6-ex6-4-q6-i","Quick Solution Plan: The horizontal leg between A and B is 8 km and the"],
    ["c10-6-ex6-4-q6-ii","Quick Solution Plan: Between B and C the horizontal leg is 12 km and ang"],
    ["c10-6-ex6-5-q10","Quick Solution Plan: In the right triangle made by vertical tower (oppos"],
    ["c10-6-ex6-5-q11","Quick Solution Plan: From the second point b m high, the 60° depression"],
    ["c10-6-ex6-5-q13","Quick Solution Plan: Let H be the tall building’s height and d the spaci"],
    ["c10-6-ex6-5-q14","Quick Solution Plan: From the midpoint, each person is x/2 metres away."],
    ["c10-6-unit-q9","Quick Solution Plan: Across the 35 m street, split the statue at the roo"]
  ],
    "Use the angle measured from the horizontal observer line. For tangent, the opposite side is the vertical difference in level and the adjacent side is the horizontal distance.",
    "பார்ப்பவரின் கிடைமட்டக் கோட்டிலிருந்து அளவிட்ட கோணத்தைப் பயன்படுத்துக. டேன்ஜன்ட் விகிதத்தில் எதிர்ப்பக்கம் செங்குத்து மட்ட வேறுபாடு. அடுத்த பக்கம் கிடைமட்டத் தொலைவு.");

  add([
    ["c10-6-ex6-2-q2","Quick Solution Plan: Let the half-width from the road median (centre) to"]
  ],
    "In the diagram the same horizontal width relates the two rows of houses. Mark the half-width from the middle before forming either tangent ratio.",
    "படத்தில் இரு வீட்டுவரிசைகளையும் ஒரே கிடைமட்ட அகலம் தொடர்புபடுத்துகிறது. டேன்ஜன்ட் விகிதங்களை அமைக்கும்முன் சாலையின் நடுவிலிருந்து அரை அகலத்தைக் குறிக்கவும்.");

  add([
    ["c10-6-ex6-2-q3","Quick Solution Plan: Measure heights above the man's eye level (180 cm ="]
  ],
    "The angles are measured at eye level. Use the rise above the eyes in the triangles and add the observer’s eye height only when converting to height above ground.",
    "கோணங்கள் கண் மட்டத்திலிருந்து அளவிடப்படுகின்றன. முக்கோணங்களில் கண்களுக்கு மேலுள்ள உயரத்தைப் பயன்படுத்துக. தரையிலிருந்து மொத்த உயரம் தேவைப்படும்போது மட்டும் கண் மட்ட உயரத்தைக் கூட்டவும்.");

  add([
    ["c10-6-ex6-2-q5-i","Quick Solution Plan: Because the dome has radius r, its center is horizo"],
    ["c10-6-ex6-2-q5-ii","Quick Solution Plan: Moving 5 m farther away places the man 7 + 5 = 12 m"]
  ],
    "A hemispherical dome rises one radius above its flat base. Use the dome’s vertical rise and the ground distance from its centre as separate quantities.",
    "அரைக்கோளக் குவிமாடம் அதன் தட்டையான அடியிலிருந்து ஓர் ஆரம் உயர்கிறது. குவிமாடத்தின் செங்குத்து உயரத்தையும் மையத்திலிருந்து கிடைமட்டத் தொலைவையும் தனித்தனி அளவுகளாகப் பயன்படுத்துக.");

  add([
    ["c10-6-ex6-3-q1","Quick Solution Plan: By alternate interior angles with the horizontal ey"]
  ],
    "The horizontal at the observer and the horizontal at ground level are parallel. The line of sight forms equal alternate angles with them, so the depression angle can be used in the lower triangle.",
    "பார்ப்பவரின் கிடைக்கோடும் தரைக் கிடைக்கோடும் இணை. பார்வைக்கோடு அவற்றுடன் சமமான மாற்றுக் கோணங்களை உருவாக்குகிறது. எனவே இறக்கக் கோணத்தைக் கீழுள்ள முக்கோணத்தில் பயன்படுத்தலாம்.");

  add([
    ["c10-6-ex6-3-q3","Quick Solution Plan: First find horizontal distance d = 60 / tan 60° = 6"],
    ["c10-6-ex6-3-q4","Quick Solution Plan: Because both boats sail on the same side below the"],
    ["c10-6-ex6-3-q5","Quick Solution Plan: Compute the distance from the lighthouse foot to ea"],
    ["c10-6-ex6-5-q12","Quick Solution Plan: At 30°, the shadow length is 60 / tan 30° = 60√3 m."],
    ["c10-6-unit-q5","Quick Solution Plan: Find the bird’s first horizontal distance d₁ = 80/t"],
    ["c10-6-unit-q6","Quick Solution Plan: As elevation increases from 37° to 53°, the plane f"]
  ],
    "Compute both horizontal distances from the same reference point. For positions on the same side, their separation is the absolute difference of those distances.",
    "இரு கிடைமட்டத் தொலைவுகளையும் அதே குறிப்பு இடத்திலிருந்து கணக்கிடுக. இடங்கள் ஒரே பக்கத்தில் இருந்தால், அவற்றின் இடைவெளி அத்தொலைவுகளின் வித்தியாசத்தின் தனிமதிப்பு.");

  add([
    ["c10-6-ex6-3-q6","Quick Solution Plan: At height h₁ = 90 ft (where tan 60° = 90/(30√3) = √"],
    ["c10-6-ex6-4-q5-ii","Quick Solution Plan: The difference between the two heights is simply th"]
  ],
    "When both elevations are measured on the same vertical line, subtract their vertical levels to obtain the difference in height.",
    "இரு உயரங்களும் ஒரே செங்குத்துக் கோட்டில் அளவிடப்படும்போது, உயர வேறுபாட்டைப் பெற அவற்றின் செங்குத்து மட்டங்களைக் கழிக்கவும்.");

  add([
    ["c10-6-ex6-4-q2","Quick Solution Plan: From the 40 m ship deck, use the 30° angle of depre"],
    ["c10-6-unit-q8","Quick Solution Plan: With ships on opposite sides of a lighthouse of hei"]
  ],
    "Find each distance from the foot of the observer’s vertical line. If the objects are on opposite sides, the path between them crosses that foot, so add the distances.",
    "பார்ப்பவரின் செங்குத்துக் கோட்டின் அடியிலிருந்து ஒவ்வொரு தொலைவையும் காண்க. பொருள்கள் எதிரெதிர் பக்கங்களில் இருந்தால் அவற்றுக்கிடையேயான பாதை அந்த அடியைக் கடக்கும். எனவே தொலைவுகளைக் கூட்டவும்.");

  add([
    ["c10-6-ex6-4-q3","Quick Solution Plan: Let the cloud sit x metres above the observer’s hor"],
    ["c10-6-ex6-5-q15","Quick Solution Plan: Apply the lake-cloud height formula h(tan θ₁ + tan"]
  ],
    "Reflecting across the water keeps the horizontal distance unchanged and reverses the cloud’s height about the water level. Compare both vertical distances from the observer’s line.",
    "நீர்மட்டத்தில் பிரதிபலிக்கும்போது கிடைமட்டத் தொலைவு மாறாது. மேகத்தின் உயரம் நீர்மட்டத்தைப் பொறுத்து எதிர்த் திசையாக மாறும். பார்ப்பவரின் மட்டத்திலிருந்து இரு செங்குத்துத் தொலைவுகளையும் ஒப்பிடுக.");

  add([
    ["c10-6-unit-q7-i","Quick Solution Plan: Flying 35° West of North puts path AB at 90° − 35°"],
    ["c10-6-unit-q7-ii","Quick Solution Plan: Along the West horizontal axis at angle 55°, the ad"],
    ["c10-6-unit-q7-iii","Quick Solution Plan: Bearing 48° means 48° East of North, which makes 90"],
    ["c10-6-unit-q7-iv","Quick Solution Plan: Along the East horizontal axis at angle 42°, the ad"]
  ],
    "A bearing begins at north. If the right triangle uses an east or west horizontal side, redraw the reference direction and use the complementary angle before choosing sine or cosine.",
    "திசைக்கோணம் வடக்கிலிருந்து தொடங்குகிறது. செங்கோண முக்கோணத்தின் கிடைப்பக்கம் கிழக்கு அல்லது மேற்கு திசையில் இருந்தால், குறிப்புத் திசையை வரைந்து, சைன் அல்லது கோசைனைத் தேர்ந்தெடுக்கும் முன் நிரப்புக் கோணத்தைப் பயன்படுத்துக.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
