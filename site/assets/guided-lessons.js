/* Triggle's on-device guided explanations: no API requests, no invented answers. */
(()=>{'use strict';
const bilingual=(en,ta)=>({en,ta});
const fields={
 triangle:{
  formula:'sin θ = [[opposite|hypotenuse]] ; cos θ = [[adjacent|hypotenuse]] ; tan θ = [[opposite|adjacent]]',
  intro:bilingual('A right triangle has one 90° corner. Before you calculate anything, point to the angle named in the question. Every side name depends on where you are looking from.','ஒரு செங்கோண முக்கோணத்தில் 90° கோணம் இருக்கும். முதலில் கேள்வியில் கேட்ட கோணத்தைத் தேர்ந்தெடுக்கவும். அந்தக் கோணத்தைப் பொறுத்தே பக்கங்களின் பெயர் மாறும்.'),
  identify:bilingual('The hypotenuse is always across from the 90° corner. The opposite side is across from the chosen angle. The adjacent side touches that angle but is not the hypotenuse.','கர்ணம் எப்போதும் 90° கோணத்திற்கு எதிரே இருக்கும். எதிர்ப்பக்கம் தேர்ந்தெடுத்த கோணத்திற்கு எதிரே இருக்கும். அடுத்துள்ள பக்கம் அந்தக் கோணத்தைத் தொடும்; ஆனால் கர்ணம் அல்ல.'),
  check:bilingual('Make sure the hypotenuse is the longest side. For any right triangle, adjacent² + opposite² = hypotenuse². Then check that sine and cosine lie between −1 and 1.','கர்ணம் நீளமான பக்கமா என்று பார்க்கவும். செங்கோண முக்கோணத்தில் (அடுத்துள்ள பக்கம்)² + (எதிர்ப்பக்கம்)² = கர்ணம்². sin, cos மதிப்புகள் −1 முதல் 1 வரை இருக்கும்.')
 },
 identity:{
  formula:'sin²θ + cos²θ = 1 ; 1 + tan²θ = sec²θ ; 1 + cot²θ = cosec²θ',
  intro:bilingual('An identity is an equality that works for every angle where both sides are defined. We transform one side using known rules rather than guessing the answer.','முக்கோணவியல் முற்றொருமை என்பது வரையறுக்கப்பட்ட எல்லா பொருத்தமான கோணங்களுக்கும் சரியாகும் சமன்பாடு. தெரிந்த சூத்திரங்கள் மூலம் ஒரு பக்கத்தை மாற்றுவோம்.'),
  identify:bilingual('Look for squared sine/cosine or tangent/secant. Replace the matching group with the identity above. If there is a fraction, first write everything using sine and cosine, then simplify.','sin², cos² அல்லது tan², sec² போன்ற உறுப்புகளைத் தேடுங்கள். பொருத்தமான முற்றொருமையைப் பயன்படுத்தி மாற்றுங்கள். பின்னங்கள் இருந்தால் sin மற்றும் cos ஆக மாற்றி எளிமைப்படுத்துங்கள்.'),
  check:bilingual('The last line must have the same value as the target expression, for all angles where the original expression makes sense. Avoid cancelling anything that might be zero.','கடைசி வரி இலக்கு வெளிப்பாட்டுடன் சமமாக இருக்க வேண்டும். பூஜ்ஜியமாகக் கூடும் உறுப்புகளைத் தவறாகக் குறைக்காதீர்கள்.')
 },
 height:{
  formula:'tan θ = [[vertical height|horizontal distance]] ; sin θ = [[height|line-of-sight length]]',
  intro:bilingual('A sightline, the level ground, and a vertical object make a right triangle. The angle of elevation is measured up from a horizontal line; depression is measured down from it.','பார்வைக் கோடு, சமமான தரை, செங்குத்தான பொருள் ஆகியவை ஒரு செங்கோண முக்கோணத்தை உருவாக்கும். ஏற்றக் கோணம் கிடைமட்டத்திலிருந்து மேலே; இறக்கக் கோணம் கீழே அளக்கப்படும்.'),
  identify:bilingual('Draw the ground horizontal and the tower or tree vertical. Label only measurements supplied in the question. If an observer’s eye has a height, use the difference in vertical levels before adding it back.','தரையை கிடைமட்டமாகவும் உயரத்தை செங்குத்தாகவும் வரையுங்கள். கேள்வியில் உள்ள அளவுகளை மட்டும் குறியுங்கள். கண் உயரம் கொடுக்கப்பட்டிருந்தால் நிலைகளின் வித்தியாசத்தைக் கணக்கிட்டு பின்னர் சேர்க்கவும்.'),
  check:bilingual('Keep lengths in the same unit. At 45°, the vertical height and horizontal distance are equal, which can be a useful reasonableness check.','அனைத்து நீளங்களும் ஒரே அலகில் இருக்க வேண்டும். 45°-இல் செங்குத்து உயரமும் கிடைமட்டத் தூரமும் சமமாக இருப்பது ஒரு சரிபார்ப்பு வழி.')
 },
 angle:{
  formula:'1 complete turn = 360° ; θ in radians = θ in degrees × [[π|180]]',
  intro:bilingual('A positive angle turns counterclockwise from the positive x-axis. A negative angle turns clockwise. One full turn brings you back to the same direction.','நேர்மறைக் கோணம் +x அச்சிலிருந்து இடப்பக்கம் சுற்றும்; எதிர்மறைக் கோணம் வலப்பக்கம் சுற்றும். ஒரு முழுச் சுற்றுக்குப் பிறகு அதே திசை வரும்.'),
  identify:bilingual('For quadrants: I is 0°–90°, II is 90°–180°, III is 180°–270°, IV is 270°–360°. First reduce large angles by removing complete 360° turns. Axis angles do not belong to any quadrant.','கால்பகுதிகள்: I = 0°–90°, II = 90°–180°, III = 180°–270°, IV = 270°–360°. பெரிய கோணங்களில் 360° முழுச்சுற்றுகளை நீக்குங்கள். அச்சின் மீதுள்ள கோணங்கள் எந்தக் கால்பகுதியிலும் இல்லை.'),
  check:bilingual('If converting to radians, 180° should become π and 90° should become π/2. If locating a quadrant, check the angle falls strictly inside its two boundaries.','ரேடியனாக மாற்றும்போது 180° = π, 90° = π/2 ஆக வேண்டும். கால்பகுதிக்கான கோணம் இரண்டு எல்லைகளுக்குள் உள்ளதா என்று பார்க்கவும்.')
 },
 evaluations:{
  formula:'sin(90° − θ) = cos θ ; cos(90° − θ) = sin θ ; tan(90° − θ) = cot θ',
  intro:bilingual('To find a trigonometric value, first check whether there is a known standard angle or a complementary-angle pair. Use exact values before rounding.','முக்கோணவியல் மதிப்பைக் காணும்போது சிறப்புக் கோணமா அல்லது நிரப்புக் கோணமா என முதலில் பாருங்கள். வட்டமிடுவதற்கு முன் துல்லிய மதிப்புகளைப் பயன்படுத்துங்கள்.'),
  identify:bilingual('Useful facts: sin 30° = 1/2, cos 60° = 1/2, sin 45° = cos 45° = 1/√2. Also tan 45° = 1. Negative signs depend on the quadrant.','சில மதிப்புகள்: sin 30° = 1/2, cos 60° = 1/2, sin 45° = cos 45° = 1/√2, tan 45° = 1. கால்பகுதியைச் சார்ந்து குறி மாறும்.'),
  check:bilingual('When the question asks for four decimal places, round only at the final step. When a complementary pair occurs, verify their two angles add to 90°.','நான்கு தசம இடங்கள் கேட்டால் இறுதியில் மட்டும் வட்டமிடுங்கள். நிரப்புக் கோணங்களில் இரண்டு கோணங்களின் கூட்டுத்தொகை 90° என்பதைச் சரிபார்க்கவும்.')
 },
 wave:{
  formula:'y = a sin(bx) or a cos(bx) ; amplitude = |a| ; period = [[2π| |b| ]]',
  intro:bilingual('Amplitude describes how far the wave rises or falls from its middle line. Period describes how far we travel along x before the pattern repeats.','வீச்சு என்பது நடுக்கோட்டிலிருந்து அலையின் அதிகபட்ச உயரம். கால அளவு என்பது அலை மீண்டும் அதே வடிவத்துக்கு வருவதற்கான x-தூரம்.'),
  identify:bilingual('Find the multiplier before sine or cosine: that is a. Find the multiplier inside the parentheses, beside x: that is b. The minus sign may reflect the wave without changing its amplitude.','sin அல்லது cos-க்கு முன்னால் உள்ள பெருக்கி a. அடைப்புக்குறிக்குள் x-க்கு அருகிலுள்ள பெருக்கி b. எதிர்மறைக் குறி அலையைப் புரட்டலாம்; வீச்சை மாற்றாது.'),
  check:bilingual('A bigger positive |b| means a shorter period. For example, b=2 halves the usual 2π period to π.','|b| பெரிதானால் அலை விரைவாக மீண்டும் தோன்றும். b=2 எனில் 2π கால அளவு பாதியாகி π ஆகும்.')
 },
 inverse:{
  formula:'If y = sin⁻¹(x), then sin(y) = x, with −π/2 ≤ y ≤ π/2',
  intro:bilingual('An inverse trig function asks for an ANGLE, not another ratio. Each inverse function picks an angle from a prescribed principal range.','நேர்மாறு முக்கோணவியல் செயல்பாடு ஒரு கோணத்தைக் கேட்கிறது; புதிய விகிதத்தை அல்ல. ஒவ்வொரு நேர்மாறு செயல்பாடுக்கும் முதன்மைக் கோண இடைவெளி உள்ளது.'),
  identify:bilingual('First check the input is allowed. For sin⁻¹ or cos⁻¹ it must lie between −1 and 1. For expressions involving a square root, its inside must be at least zero. Then use the correct principal-angle range.','உள்ளீடு பொருத்தமானதா என பார்க்கவும். sin⁻¹, cos⁻¹-க்கு −1 முதல் 1 வரை வேண்டும். வர்க்கமூலத்தின் உள்ளே பூஜ்ஜியம் அல்லது அதற்கு அதிகம் இருக்க வேண்டும். பின்னர் முதன்மைக் கோண எல்லையைப் பயன்படுத்துங்கள்.'),
  check:bilingual('Apply the forward trig function to your chosen angle. It should reproduce the input. Check the resulting angle is in the inverse function’s principal range.','கண்ட கோணத்திற்கு நேரடி முக்கோணவியல் செயல்பாட்டைப் பயன்படுத்துங்கள். ஆரம்ப உள்ளீடு கிடைக்க வேண்டும்; கோணம் முதன்மை இடைவெளியில் இருக்க வேண்டும்.')
 },
 algebra:{
  formula:'Use a matching algebra rule, then perform the same valid operation on both sides when solving an equation.',
  intro:bilingual('Algebra is about keeping expressions equal while making them simpler. A formula tells us which change is allowed.','இயற்கணிதத்தில் சமத்துவத்தைப் பாதுகாத்தபடி வெளிப்பாடுகளை எளிமைப்படுத்துகிறோம். சூத்திரம் எந்த மாற்றம் சரி என்பதைச் சொல்கிறது.'),
  identify:bilingual('Copy the original expression carefully. Look for a common factor, square, or matching terms. Solve one small part at a time.','அசல் வெளிப்பாட்டை கவனமாக எழுதுங்கள். பொதுக்காரணி, வர்க்கம், ஒத்த உறுப்புகள் ஆகியவற்றைக் கண்டறியுங்கள். ஒவ்வொரு சிறு பகுதியையும் தனித்தனியாகக் கணக்கிடுங்கள்.'),
  check:bilingual('Substitute the result into the original expression or equation, not only the simplified one. Both sides should agree.','பதிலை அசல் வெளிப்பாடு அல்லது சமன்பாட்டில் இடுங்கள். இரு பக்கங்களும் சமமாக வேண்டும்.')
 },
 generic:{
  formula:'Start with the relationship named in the question. Substitute only the known values, then simplify one operation at a time.',
  intro:bilingual('We will start with the rule that connects the given information to the unknown value. Each transformation should have a reason.','கொடுக்கப்பட்ட தகவலுக்கும் கேட்கப்பட்ட மதிப்புக்கும் தொடர்பான விதியிலிருந்து தொடங்குவோம். ஒவ்வொரு மாற்றத்திற்கும் ஒரு காரணம் இருக்க வேண்டும்.'),
  identify:bilingual('Read the question twice. Underline what is given and circle exactly what needs to be found. Keep the supplied units or angle notation unchanged.','கேள்வியை இருமுறை வாசியுங்கள். கொடுக்கப்பட்டவற்றை அடிக்கோடிடுங்கள்; கண்டுபிடிக்க வேண்டியதை வட்டமிடுங்கள். அளவுகளையும் கோணக் குறியீடுகளையும் மாற்றாதீர்கள்.'),
  check:bilingual('Check arithmetic, units, and any restrictions on allowed values. Compare your last expression with the requested answer.','கணக்குகள், அலகுகள், மதிப்பு வரம்புகளைச் சரிபார்க்கவும். இறுதி வெளிப்பாடு கேட்ட விடைக்கு பொருந்துகிறதா என்று பார்க்கவும்.')
 }
};
function key(item){const q=item.q?.en||'',kind=item.diagram && typeof item.diagram==='object'?item.diagram.kind:(item.diagram||'');
 if(item.classNum===12&&/sin|cos|period|amplitude/i.test(q)&&/period|amplitude/i.test(q))return 'wave';
 if(/⁻¹|inverse|principal value|domain of f\(/i.test(q)||item.classNum===12&&kind==='inverse')return 'inverse';
 if(/quadrant|radians|sin 480|cos 300|tan 1050|825°|−55°/i.test(q))return 'angle';
 if(/height|elevation|depression|tower|ladder|kite string|boat|window|tree|ship|plane|car is seen/i.test(q))return 'height';
 if(item.classNum===10&&/prove|simplify|show that|given sin/i.test(q))return 'identity';
 if(/verify|identity|prove|show that|sin²|cos²|tan²|sec²/i.test(q) && !/right triangle/i.test(q))return 'identity';
 if(/right triangle|all six|ratios|sin θ, cos θ|cot A|cos A =|tan A =|sec θ =|sin α|cos β/.test(q)||['triangle','two-triangles','two-right','symbolic','symbolic-x'].includes(kind))return 'triangle';
 if(item.classNum===11||item.classNum===9&&item.chapter==='6')return 'evaluations';
 if(/Solve|Factorise|sequence|x²|midpoint/i.test(q))return 'algebra';
 return 'generic';
}
const additional={
 'c9-example-6-1':{
  formula:'sin θ = [[opposite|hypotenuse]] ; cos θ = [[adjacent|hypotenuse]] ; tan θ = [[opposite|adjacent]]',
  identify:bilingual('Stand at the corner marked θ in the figure. The opposite side is 35, the adjacent side is 12, and the longest side (hypotenuse) is 37. Check: 35² + 12² = 37².','படத்தில் θ கோணத்தில் இருந்து பாருங்கள். எதிர்ப்பக்கம் 35, அடுத்துள்ள பக்கம் 12, கர்ணம் 37. சரிபார்: 35² + 12² = 37².'),
  check:bilingual('The three results must use the correct denominator: sine and cosine use 37; tangent uses 12. Therefore sin θ = 35/37, cos θ = 12/37, tan θ = 35/12.','sin, cos விகிதங்களின் பகுதி 37; tan விகிதத்தின் பகுதி 12. ஆகவே sin θ = 35/37, cos θ = 12/37, tan θ = 35/12.')
 },
 'c9-exercise-6-1-q1':{
  identify:bilingual('At B, the opposite side is AC=9, the adjacent side is AB=40, and the hypotenuse is BC=41. Pythagoras checks the lengths: 9² + 40² = 41².','B கோணத்தில் எதிர்ப்பக்கம் AC=9, அடுத்துள்ள பக்கம் AB=40, கர்ணம் BC=41. 9² + 40² = 41² என்று சரிபார்க்கவும்.')
 },
 'c9-exercise-6-1-q2':{
  identify:bilingual('There are TWO right triangles sharing height AD. In ABD, hypotenuse AB=13 and ground BD=5, so AD=√(13²−5²)=12. Then in ADC, the legs are 12 and 16, so AC=20.','AD என்ற பொதுவான உயரத்தைப் பகிரும் இரண்டு செங்கோண முக்கோணங்கள் உள்ளன. ABD-இல் AB=13, BD=5; ஆகவே AD=12. ADC-இல் பக்கங்கள் 12,16; ஆகவே AC=20.')
 },
 'c11-3-3-1-1':{
  formula:'Quadrant I: 0° < θ < 90° ; Quadrant II: 90° < θ < 180°',
  identify:bilingual('The question gives θ=25°. It is positive, so turn counterclockwise from the right-pointing x-axis. The first quadrant covers angles strictly between 0° and 90°.','θ=25° என்ற நேர்மறைக் கோணத்துக்கு +x அச்சிலிருந்து இடப்பக்கம் திரும்புங்கள். 0° முதல் 90° வரையிலான கோணங்கள் முதல் கால்பகுதியில் இருக்கும்.'),
  check:bilingual('25 is greater than 0 and less than 90, so it belongs to Quadrant I, not an axis.','25 என்பது 0-ஐ விட அதிகம்; 90-ஐ விட குறைவு. ஆகவே முதல் கால்பகுதி.')
 },
 'c10-6-6-1-1':{
  formula:'cot θ = [[cos θ|sin θ]] ; tan θ = [[sin θ|cos θ]] ; sin² θ + cos² θ = 1',
  identify:bilingual('Do not start by assuming the two sides are equal. Begin with cot θ + tan θ and convert each ratio into sine/cosine. Their common denominator becomes sin θ cos θ.','இரு பக்கங்களும் சமம் என்று தொடக்கத்தில் கருத வேண்டாம். cot θ + tan θ என்ற இடப்பக்கத்தை sin/cos ஆக மாற்றுங்கள். பொதுவான பகுதி sin θ cos θ ஆகும்.'),
  check:bilingual('After using sin²θ + cos²θ = 1, the result is 1/(sin θ cos θ), which equals cosec θ sec θ. Both expressions require sin θ and cos θ nonzero.','sin²θ + cos²θ = 1 என்பதால் 1/(sin θ cos θ) கிடைக்கும். இது cosec θ sec θ-க்கு சமம். sin θ மற்றும் cos θ பூஜ்ஜியம் அல்லாத போது மட்டும் வரையறுக்கப்படும்.')
 }
};
function why(eq,group,lang){const tamil=lang==='ta';const s=eq||'';
 const t=(en,ta)=>tamil?ta:en;
 if(/\[\[.+\|.+\]\]/.test(s))return t('The top of each fraction is divided by the bottom. Double-check which quantity belongs in the numerator and which belongs in the denominator.','ஒவ்வொரு பின்னத்திலும் மேலிருக்கும் தொகுதியை கீழிருக்கும் பகுதியாக வகுக்கிறோம். தொகுதி மற்றும் பகுதி சரியான இடத்தில் உள்ளதா பாருங்கள்.');
 if(/√/.test(s))return t('The square root reverses a square. Use Pythagoras when a right triangle has a missing side; keep the positive length.','வர்க்கமூலம் என்பது வர்க்கத்தின் தலைகீழ் செயல். செங்கோண முக்கோணத்தில் பக்கம் காண பிதாகரஸ் தேற்றம் பயன்படும்; நீளம் நேர்மறையாக இருக்கும்.');
 if(/π|360|180°/.test(s))return t('Angles separated by a full turn point in the same direction. π radians equals 180 degrees.','முழுச் சுற்று வேறுபாடுள்ள கோணங்கள் ஒரே திசையில் இருக்கும். π ரேடியன் என்பது 180°.');
 if(/sin²|cos²|tan²|sec²/.test(s))return t('This uses a squared trigonometric ratio. Substitute a known identity only after confirming the symbols match.','இது வர்க்க முக்கோணவியல் விகிதம். சரியான குறியீடுகள் உள்ளதா பார்த்த பிறகே முற்றொருமையைப் பயன்படுத்தவும்.');
 if(/=/.test(s))return t('Each equal sign means the expression on its right has the same value as the expression on its left. Follow the calculation without skipping lines.','சமக்குறியின் இருபுறமும் ஒரே மதிப்பு இருக்கும். எந்தக் கணக்குப் படியையும் தவிர்க்காமல் கவனியுங்கள்.');
 return t('Work on this small part first. Use the stated relationship, then compare the result with what the question asks.','இந்தச் சிறு பகுதியை முதலில் முடிக்கவும். கொடுக்கப்பட்ட உறவைப் பயன்படுத்தி, கேள்வி கேட்கும் விடையுடன் ஒப்பிடுங்கள்.');
}
function inverseFormula(item){
 const q=item.q?.en||'';
 if(/sec⁻¹/.test(q))return 'If θ = sec⁻¹(u), then sec θ = u, with 0 ≤ θ ≤ π and θ ≠ π/2';
 if(/cosec⁻¹/.test(q))return 'If θ = cosec⁻¹(u), then cosec θ = u, with −π/2 ≤ θ ≤ π/2 and θ ≠ 0';
 if(/cot⁻¹/.test(q))return 'If θ = cot⁻¹(u), then cot θ = u, with 0 < θ < π';
 if(/cos⁻¹/.test(q))return 'If θ = cos⁻¹(u), then cos θ = u, with 0 ≤ θ ≤ π';
 if(/tan⁻¹/.test(q))return 'If θ = tan⁻¹(u), then tan θ = u, with −π/2 < θ < π/2';
 return fields.inverse.formula;
}
function localizeFormula(value,lang){
 if(lang!=='ta')return value;
 const names={
  'horizontal distance':'கிடைமட்டத் தூரம்','vertical height':'செங்குத்து உயரம்',
  'line-of-sight length':'பார்வைக்கோட்டு நீளம்',
  'opposite':'எதிர்ப்பக்கம்','adjacent':'அடுத்துள்ள பக்கம்',
  'hypotenuse':'கர்ணம்'
 };
 let text=value;
 for(const [key,v] of Object.entries(names))text=text.split(key).join(v);
 return text;
}
function build(item,lang){const ta=lang==='ta',kk=key(item),f=fields[kk],special=additional[item.id]||{};
 const get=o=>typeof o==='string'?o:o?.[lang]||o?.en||'';
 const steps=(item.steps||[]).map((s,i)=>({
  heading:ta?`படி ${i+1} — மெதுவாகப் பார்ப்போம்`:`Step ${i+1} — work one piece at a time`,
  reason:get(s),eq:s.eq||'',help:why(s.eq,kk,lang)
 }));
 return {eyebrow:ta?'நிதானமாகக் கற்போம்':'GUIDED WALKTHROUGH',title:ta?'சூத்திரத்திலிருந்து விடை வரை':'From the formula to the final answer',intro:get(f.intro),
  formula:localizeFormula(special.formula||(kk==='inverse'?inverseFormula(item):f.formula),lang),identifyLabel:ta?'முதலில் என்ன தெரியும்?':'First, identify what is given',identify:get(special.identify||f.identify),
  stepsLabel:ta?'இப்போது ஒவ்வொரு படியும்':'NOW FOLLOW EVERY STEP',steps,whyLabel:ta?'ஏன்?':'Why?',checkLabel:ta?'சரிபார்ப்போம்':'How can we check?',check:get(special.check||f.check),lastLabel:ta?'கிடைத்த விடை:':'We reached this answer:'};
}
window.TriggleGuide={build};
})();
