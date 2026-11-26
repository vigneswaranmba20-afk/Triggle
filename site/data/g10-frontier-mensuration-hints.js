/* Source-matched Grade 10 Chapter 7 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-7-ex7-1-q1","Let k be the common scale factor of the 5:7 ratio."],
    ["c10-7-ex7-1-q7","Choose a convenient symbol x for the smaller radius."]
  ],
    "A ratio fixes relative lengths. Write the lengths as the given ratio numbers multiplied by one common positive scale, then use the area condition to find that scale.",
    "விகிதம் நீளங்களின் ஒப்பீட்டு அளவைத் தீர்மானிக்கிறது. விகித எண்களை ஒரே நேர்ம அளவுக் காரணியால் பெருக்கி நீளங்களை எழுதுக. பரப்பு நிபந்தனையைக் கொண்டு அந்தக் காரணியைக் காண்க.");

  add([
    ["c10-7-ex7-1-q2","The curved area is five-sixths of the total area."],
    ["c10-7-ex7-5-q5","Total area consists of the curved surface and both circular ends."]
  ],
    "The total surface includes the curved part plus the two circular ends. The difference between total and curved area therefore accounts for those two ends exactly.",
    "மொத்தப் புறப்பரப்பில் வளைபரப்பும் இரண்டு வட்ட முனைகளும் அடங்கும். மொத்தப் புறப்பரப்பிலிருந்து வளைபரப்பைக் கழித்தால் அந்த இரு முனைகளின் பரப்பு மட்டும் கிடைக்கும்.");

  add([
    ["c10-7-ex7-1-q3","The 4 cm thickness is radial."],
    ["c10-7-ex7-1-q9","The given measurements are diameters, not radii."],
    ["c10-7-ex7-2-q9","Let R be the outer radius and r be the inner radius of the spherical she"],
    ["c10-7-ex7-4-q6","The outer shell radius is 5 cm, inner radius 3 cm, and new cylinder radi"],
    ["c10-7-ex7-4-q7","Find the sphere volume, which is the available material."],
    ["c10-7-ex7-5-q6","Let R be the outer radius and r the inner radius."],
    ["c10-7-unit-q6","The metal volume is the outer cylinder volume minus the inner cylindrica"],
    ["c10-7-unit-q8","The external diameter is 14 cm, so the outer radius is 7 cm."]
  ],
    "Measure thickness radially. The outer and inner radii differ by one thickness. The shell material is the region between the two surfaces.",
    "தடிமனை ஆரத் திசையில் அளவிடுக. வெளி ஆரத்திற்கும் உள் ஆரத்திற்கும் உள்ள வித்தியாசம் ஒரு தடிமன். இரு பரப்புகளுக்கும் இடையிலுள்ள பகுதியே பொருள் இருக்கும் பகுதி.");

  add([
    ["c10-7-ex7-1-q4","The triangle is right-angled at Q."],
    ["c10-7-ex7-2-q5","Since 6² + 8² = 36 + 64 = 100 = 10², the hypotenuse is 10 cm and the two"]
  ],
    "The leg used as the rotation axis becomes the height. The other leg sweeps a circular base, and the hypotenuse sweeps the sloping surface.",
    "சுழற்சி அச்சாகப் பயன்படுத்தும் பக்கம் உயரமாகிறது. மற்றொரு செங்கோணப் பக்கம் வட்ட அடியை உருவாக்குகிறது. கர்ணம் வளைபரப்பை உருவாக்குகிறது.");

  add([
    ["c10-7-ex7-1-q5","Four people each require 22 m² of floor area."]
  ],
    "The floor is a flat circle. Multiply the area required per person by the number of people, and use that total as the base area.",
    "தரை ஒரு தட்டையான வட்டம். ஒருவருக்குத் தேவையான பரப்பைப் பேர்களின் எண்ணிக்கையால் பெருக்கி, கிடைக்கும் கூடுதலை அடிப்பரப்பாகப் பயன்படுத்துக.");

  add([
    ["c10-7-ex7-1-q6","A birthday cap is an open cone, so only its curved surface needs paper."],
    ["c10-7-ex7-5-q1","The radius is half of the diameter."]
  ],
    "The cone’s slant height measures travel across its material. Use it for curved area, and include a base circle only if the object has one to cover.",
    "சாயுயரம் கூம்பின் பொருள்மேல் அளவிடும் நீளம். வளைபரப்புக்கு அதைப் பயன்படுத்துக. பொருளில் மூடவேண்டிய வட்ட அடி இருந்தால் மட்டுமே அடிப்பரப்பைச் சேர்க்கவும்.");

  add([
    ["c10-7-ex7-1-q8","The surface area of a sphere of radius r is 4πr²."],
    ["c10-7-ex7-5-q4","Write the new and old volumes using the same height h."],
    ["c10-7-ex7-5-q7","The cone volume contains the square of its radius and the first power of"]
  ],
    "An area with two radius factors scales with the square of the radius change. For volume also include the scale of the perpendicular height when it changes.",
    "இரு ஆரக் காரணிகள் உள்ள பரப்பு, ஆர மாற்றக் காரணியின் வர்க்கத்தால் மாறும். கனஅளவுக்குச் செங்குத்து உயரமும் மாறினால் அதன் மாற்றக் காரணியையும் சேர்க்கவும்.");

  add([
    ["c10-7-ex7-1-q10","Read our labelled diagram, redrawn from the verified 2025 textbook figur"],
    ["c10-7-unit-q4","The cylindrical radius is 4 cm, the frustum's top radius is 9 cm, and th"],
    ["c10-7-unit-q7","The two circular perimeters are 2πR and 2πr."]
  ],
    "A frustum has two circular radii. Curved area uses the slant height and the sum of the radii. Open ends or shared joins contribute no extra painted area.",
    "இடைக்கண்டத்திற்கு இரண்டு வட்ட ஆரங்கள் உண்டு. வளைபரப்புக்குச் சாயுயரமும் இரு ஆரங்களின் கூடுதலும் தேவை. திறந்த முனையோ இணைப்பில் மறைந்த பகுதியோ வண்ணம் பூசும் பரப்பில் சேராது.");

  add([
    ["c10-7-ex7-2-q1","The well is a right circular cylinder."],
    ["c10-7-ex7-2-q2","Identify the dimensions."],
    ["c10-7-ex7-2-q4","The conical container has radius r = 10 m and height h = 15 m."],
    ["c10-7-ex7-3-q4","Check that the solid fits completely inside the cylinder: total height o"],
    ["c10-7-ex7-4-q1","All the aluminium is retained."],
    ["c10-7-ex7-4-q3","Let H be the new water height."],
    ["c10-7-ex7-4-q4","Halve the given diameters."],
    ["c10-7-ex7-4-q5","Convert the sump dimensions to centimetres: 200, 150 and 100."],
    ["c10-7-ex7-4-q8","Let r be the common radius and h the cylinder height."],
    ["c10-7-ex7-5-q9","Assume no material is lost."],
    ["c10-7-unit-q2","A hemisphere has half the volume of a sphere."],
    ["c10-7-unit-q5","A coin is a thin cylinder."]
  ],
    "When material or liquid is transferred with no loss, its volume stays constant. Link the old and new shapes through their volumes, using consistent units.",
    "பொருளையோ திரவத்தையோ இழப்பின்றி மாற்றும்போது கனஅளவு மாறாது. ஒரே அளவலகைப் பயன்படுத்திப் பழைய, புதிய வடிவங்களின் கனஅளவுகளைச் சமப்படுத்துக.");

  add([
    ["c10-7-ex7-2-q3","The circular base has circumference C = 2πr = 484 cm, and the cone's ver"]
  ],
    "Circumference measures the distance around the base. First get the radius from the circumference, then use the circle area in the cone volume formula.",
    "சுற்றளவு அடியைச் சுற்றிய நீளம். சுற்றளவிலிருந்து முதலில் ஆரத்தைக் காண்க. பிறகு வட்டப் பரப்பைக் கூம்பின் கனஅளவு வாய்பாட்டில் பயன்படுத்துக.");

  add([
    ["c10-7-ex7-2-q10","Identify the dimensions of the frustum: height h = 16 cm, lower radius r"],
    ["c10-7-ex7-5-q10","For a frustum, use its perpendicular height and the radii of both circul"]
  ],
    "Capacity uses perpendicular height and both end radii. The result in cubic centimetres can be divided by one thousand to convert it to litres when needed.",
    "கொள்ளளவுக்குச் செங்குத்து உயரத்தையும் இரு முனை ஆரங்களையும் பயன்படுத்துக. கன சென்டிமீட்டரில் கிடைக்கும் விடையைத் தேவையெனில் ஆயிரத்தால் வகுத்து லிட்டராக மாற்றலாம்.");

  add([
    ["c10-7-ex7-2-q6","Let r be the common base radius of both cones, and let h₁ and h₂ be thei"]
  ],
    "Equal base radii give equal base areas. These factors cancel in the volume ratio, leaving the ratio of the perpendicular heights.",
    "சமமான அடியாரங்கள் சம அடிப்பரப்பைக் கொடுக்கும். கனஅளவு விகிதத்தில் இந்தக் காரணிகள் நீங்குவதால் செங்குத்து உயரங்களின் விகிதம் மட்டும் எஞ்சும்.");

  add([
    ["c10-7-ex7-2-q7","Let r₁ and r₂ be the radii of the two spheres."],
    ["c10-7-ex7-5-q12","The original sphere's volume equals the combined volume of eight new sph"]
  ],
    "Scaling any sphere by a radius factor scales its volume by the cube of that factor. To recover a radius factor from a volume factor, take the cube root.",
    "ஒரு கோளத்தின் ஆரம் ஒரு காரணியால் மாறினால் அதன் கனஅளவு அந்தக் காரணியின் கனத்தால் மாறும். கனஅளவுக் காரணியிலிருந்து ஆரக் காரணியைக் காணக் கனமூலம் எடுக்கவும்.");

  add([
    ["c10-7-ex7-2-q8","Let R be the radius of the solid sphere and r be the radius of the solid"],
    ["c10-7-ex7-5-q8","The curved part has area 2πr², and its flat circular base has area πr²."]
  ],
    "A solid hemisphere has a curved half-sphere and one flat circular base. Count both before comparing its total surface with a sphere.",
    "திண்ம அரைக்கோளத்தில் அரைக் கோள வளைபரப்பும் ஒரு தட்டையான வட்ட அடியும் உள்ளன. அதன் மொத்தப் புறப்பரப்பைக் கோளத்துடன் ஒப்பிடும்முன் இரண்டையும் சேர்க்கவும்.");

  add([
    ["c10-7-ex7-3-q1","Let r be the common radius of both the hemispherical bowl and the hollow"],
    ["c10-7-ex7-3-q2","Let r be the common radius of the cylinder and each cone."],
    ["c10-7-ex7-3-q5","All measurements are in millimetres (mm)."],
    ["c10-7-ex7-3-q6","Let a = 7 cm be the side of the cube."],
    ["c10-7-ex7-5-q2","Joining the circular bases creates one sphere."],
    ["c10-7-ex7-5-q11","The rounded cork tip is modelled as a hemisphere."]
  ],
    "When components join, add the needed parts of each shape. Count a shared face only if it is exposed. For volume, the non-overlapping pieces can be added directly.",
    "வடிவங்கள் இணையும்போது ஒவ்வொரு வடிவத்தின் தேவையான பகுதிகளைச் சேர்க்கவும். இணைந்த முகம் வெளியே தெரிந்தால் மட்டுமே அதைப் பரப்பில் சேர்க்கவும். ஒன்றின்மேல் ஒன்று படாத பகுதிகளின் கனஅளவுகளை நேரடியாகக் கூட்டலாம்.");

  add([
    ["c10-7-ex7-3-q3","Let r be the common radius and h = 2.4 cm be the common height of both t"]
  ],
    "The removed cone and original cylinder share a base radius and perpendicular height. Subtract the cone’s volume from the cylinder’s volume to obtain the remaining solid.",
    "அகற்றப்பட்ட கூம்புக்கும் முதற் உருளைக்கும் ஒரே அடியாரமும் செங்குத்து உயரமும் உள்ளன. உருளையின் கனஅளவிலிருந்து கூம்பின் கனஅளவைக் கழித்தால் எஞ்சிய திண்மத்தின் கனஅளவு கிடைக்கும்.");

  add([
    ["c10-7-ex7-3-q7-i","Let the radius of the sphere be r units."],
    ["c10-7-ex7-3-q7-ii","Because the cylinder just encloses the sphere of radius r, the cylinder'"],
    ["c10-7-ex7-3-q7-iii","From parts (i) and (ii), both the surface area of the sphere and the cur"]
  ],
    "A tight cylinder has the same radius as the sphere and height equal to its diameter. That fixes the two dimensions needed to compare their requested surfaces.",
    "கோளத்தை இறுக்கமாகச் சுற்றியுள்ள உருளையின் ஆரம் கோளத்தின் ஆரத்திற்குச் சமம். அதன் உயரம் கோளத்தின் விட்டம். கேட்ட பரப்புகளை ஒப்பிட இந்த இரு அளவுகள் போதும்.");

  add([
    ["c10-7-ex7-4-q2","Convert all lengths to metres."]
  ],
    "In one interval the water fills a length of pipe equal to speed times time. Multiplying that length by the cross-sectional area gives the volume delivered.",
    "ஒரு நேர இடைவெளியில் வேகத்தையும் நேரத்தையும் பெருக்கிய அளவு நீளமுள்ள குழாயை நீர் நிரப்பும். அந்த நீளத்தை குறுக்குவெட்டுப் பரப்பால் பெருக்கினால் பாய்ந்த நீரின் கனஅளவு கிடைக்கும்.");

  add([
    ["c10-7-ex7-5-q3","Use the Pythagorean relation between the slant height, vertical height a"]
  ],
    "The radius and perpendicular height are the two legs of a right triangle. The slant height is the hypotenuse, so subtract the known leg’s square to find the other.",
    "ஆரமும் செங்குத்து உயரமும் செங்கோண முக்கோணத்தின் இரு பக்கங்கள். சாயுயரம் கர்ணம். தெரியாத பக்கத்தைக் காண கர்ண வர்க்கத்திலிருந்து தெரிந்த பக்கத்தின் வர்க்கத்தைக் கழிக்கவும்.");

  add([
    ["c10-7-ex7-5-q13","A sphere must fit across the cylinder and along its height."]
  ],
    "The sphere’s diameter must satisfy both the width limit and the height limit. The smaller of those two limits determines the largest possible sphere.",
    "கோளத்தின் விட்டம் அகல எல்லைக்கும் உயர எல்லைக்கும் உட்பட்டிருக்க வேண்டும். அந்த இரு எல்லைகளில் சிறியது வெட்டக்கூடிய மிகப்பெரிய கோளத்தை நிர்ணயிக்கிறது.");

  add([
    ["c10-7-ex7-5-q14","The original cone has height h₁."]
  ],
    "The removed small cone and the original cone are similar. Their radius ratio equals their height ratio, because both lengths scale together.",
    "அகற்றப்பட்ட சிறிய கூம்பும் முதற் கூம்பும் வடிவொத்தவை. இரு நீளங்களும் ஒரே காரணியால் மாறுவதால் ஆரங்களின் விகிதம் உயரங்களின் விகிதத்திற்குச் சமம்.");

  add([
    ["c10-7-ex7-5-q15","All three solids have the same radius r."]
  ],
    "Use a common radius for all three solids. Substitute the shared height where applicable, and cancel the common volume factor before comparing the ratio.",
    "மூன்று திண்மங்களுக்கும் ஒரே ஆரத்தைப் பயன்படுத்துக. பொருந்தும் இடத்தில் ஒரே உயரத்தைப் பிரதியிடுக. விகிதத்தை ஒப்பிடும்முன் பொதுக் கனஅளவுக் காரணியைச் சுருக்கவும்.");

  add([
    ["c10-7-unit-q1","Convert the diameter from millimetres to centimetres, then halve it."]
  ],
    "The ink occupies only the filled fraction of the barrel. Keep its radius and length in the same units before finding that fraction of the volume.",
    "எழுதுகோலில் மை நிரம்பிய பகுதியை மட்டும் எடுக்க வேண்டும். கனஅளவின் அந்தப் பகுதியைக் காணும்முன் ஆரத்தையும் நீளத்தையும் ஒரே அலகில் மாற்றுக.");

  add([
    ["c10-7-unit-q3","In the standard textbook construction, place the right circular cone wit"]
  ],
    "For the shown axial construction, the cone uses the flat circular face as its base. Both the largest base radius and the largest perpendicular height can then equal the hemisphere radius.",
    "அச்சை ஒட்டிய இந்த அமைப்பில் அரைக்கோளத்தின் தட்டையான வட்ட முகமே கூம்பின் அடி. அப்போது கூம்பின் மிகப் பெரிய அடியாரமும் செங்குத்து உயரமும் அரைக்கோளத்தின் ஆரத்திற்குச் சமமாகலாம்.");

  add([
    ["c10-7-unit-q9","Convert the mixed numbers to improper fractions."]
  ],
    "The given base area already includes the radius. Rearrange the volume formula to isolate perpendicular height without recalculating the radius.",
    "கொடுக்கப்பட்ட அடிப்பரப்பில் ஆரத்தின் பங்கு ஏற்கெனவே அடங்கியுள்ளது. ஆரத்தை மீண்டும் கணக்கிடாமல் கனஅளவு வாய்பாட்டை மாற்றியமைத்துச் செங்குத்து உயரத்தைத் தனியாக்குக.");

  add([
    ["c10-7-unit-q10","When the sector is rolled, its radius becomes the cone's slant height."]
  ],
    "Rolling the sector does not stretch its edges. Its straight radius becomes the cone’s slant height, and its curved arc becomes the circumference of the cone base.",
    "வட்டக்கோணப் பகுதியை உருட்டும்போது அதன் விளிம்புகள் நீளுவதில்லை. அதன் நேரான ஆரம் கூம்பின் சாயுயரமாகவும், அதன் வளைவு கூம்பின் அடிச்சுற்றளவாகவும் மாறுகிறது.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
