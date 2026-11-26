/* Source-matched explanations for the remaining Grade 9 exercise cards. */
(() => {
  'use strict';
  const hints={};
  function add(ids,step,expected,en,ta){
    for(const id of ids)hints[id]={step,expected,en,ta};
  }
  const algebra=parts=>parts.map(part=>'g9-ch3-ex3.2-'+part);
  const coordinate=n=>['g9-ch5-ex5.2-q'+n];

  add(algebra(['q1-i','q1-iii']),0,'Replace every y with the given input.',
    'The same input replaces every occurrence of y, including the y under the square. Put the input in parentheses before you square it.',
    'வர்க்கத்தில் உள்ள y உட்பட எல்லா இடங்களிலும் ஒரே உள்ளீட்டு மதிப்பைப் பிரதியிடுக. அந்த மதிப்பை அடைப்புக்குறிக்குள் இட்டு வர்க்கப்படுத்துக.');
  add(algebra(['q3-i','q3-iii']),1,'Add three to both sides.',
    'Adding three cancels the constant −3 on the left. Adding the same amount to the right keeps the equality true.',
    'இடப்புறத்தில் உள்ள −3 ஐ நீக்க மூன்றைக் கூட்டுகிறோம். சமத்துவம் மாறாமல் இருக்க வலப்புறத்திலும் அதே எண்ணைக் கூட்ட வேண்டும்.');
  add(algebra(['q3-ii']),1,'Subtract five from both sides.',
    'Subtracting five cancels the constant +5. Applying the same operation on both sides keeps the solution set unchanged.',
    'ஐந்தைக் கழித்தால் +5 நீங்கும். இருபுறமும் ஒரே செயலைச் செய்வதால் சமன்பாட்டின் தீர்வு மாறாது.');
  add(algebra(['q3-iv']),1,'Divide both sides by eight.',
    'Dividing by eight reverses multiplication by eight. Because eight is nonzero, this gives exactly the same solutions.',
    'எட்டால் வகுப்பது எட்டால் பெருக்கும் செயலுக்கு எதிர்ச்செயல். எட்டு பூச்சியம் அல்ல என்பதால் இந்த வகுத்தலால் தீர்வுகள் மாறாது.');
  add(algebra(['q3-v']),1,'The coefficient a is nonzero,',
    'The assumption a ≠ 0 is what permits division by a. Otherwise every input would give zero.',
    'a ≠ 0 என்ற நிபந்தனை இருப்பதால் a ஆல் வகுக்கலாம். a = 0 எனில் எந்த உள்ளீட்டிற்கும் கோவையின் மதிப்பு பூச்சியமாகும்.');
  add(algebra(['q5-i']),0,'A proposed input is a zero',
    'A fraction is a zero of this polynomial only if the whole expression becomes zero. Evaluate the product before subtracting one.',
    'கொடுக்கப்பட்ட பின்னத்தைப் பிரதியிடும்போது முழுக் கோவையின் மதிப்பு பூச்சியமானால் மட்டுமே அது பூச்சியமாகும். ஒன்றைக் கழிப்பதற்கு முன் பெருக்கலைச் செய்க.');
  add(algebra(['q5-ii']),0,'Substitute the proposed input for x.',
    'Testing one proposed zero only requires one substitution. Compute the cube first, then subtract one and check the result.',
    'கொடுக்கப்பட்ட ஒரு மதிப்பைப் பரிசோதிக்க அதை ஒருமுறை பிரதியிட்டாலே போதும். முதலில் கனத்தைக் கண்டு, பிறகு ஒன்றைக் கழித்து விடையைச் சரிபார்க்கவும்.');
  add(algebra(['q5-iv']),0,'Substitute four.',
    'A product can be zero when either factor is zero. Substitute each proposed value separately to see which factor vanishes.',
    'இரு காரணிகளில் ஏதேனும் ஒன்று பூச்சியமானால் பெருக்கற்பலனும் பூச்சியமாகும். ஒவ்வொரு மதிப்பையும் தனித்தனியாகப் பிரதியிட்டு எந்தக் காரணி பூச்சியமாகிறது எனப் பார்க்கவும்.');
  add(algebra(['q6-i','q6-ii','q6-iii','q6-iv']),0,'A zero occurs where the curve meets the horizontal x-axis.',
    'Count distinct points where the graph meets or touches the horizontal axis. A point on the vertical axis contributes only if it is also on the horizontal axis.',
    'வரைபடம் x அச்சை வெட்டும் அல்லது தொடும் வெவ்வேறு புள்ளிகளை எண்ணுக. y அச்சில் உள்ள புள்ளி x அச்சிலும் இருந்தால் மட்டுமே அதை எண்ண வேண்டும்.');

  add(coordinate(2),0,'Three points A, B, C are collinear',
    'The direct path between the end points is shortest. A route through the middle point has exactly the same length when that point lies on the segment.',
    'இரு முனைப்புள்ளிகளுக்கு இடையேயான நேர்வழி மிகக் குறுகியது. இடைப்பட்ட புள்ளி அந்தக் கோட்டுத்துண்டில் இருந்தால்தான் அதன் வழியாகச் செல்லும் பாதையும் அதே நீளத்தைக் கொண்டிருக்கும்.');
  add(coordinate(3),0,'A triangle is isosceles',
    'Side lengths are nonnegative, so equality can be checked by comparing their squares. Also verify that the three points do form a triangle.',
    'பக்க நீளங்கள் குறையற்றவை. அவற்றின் வர்க்கங்களை ஒப்பிட்டு நீளங்கள் சமமா என அறியலாம். மூன்று புள்ளிகளும் ஒரு முக்கோணத்தை அமைப்பதையும் சரிபார்க்க வேண்டும்.');
  add(coordinate(6),0,'A quadrilateral is a rhombus',
    'Use the given order of the vertices when comparing side lengths. Once all sides are equal, the diagonals help determine whether this rhombus is also a square.',
    'பக்க நீளங்களை ஒப்பிடும்போது கொடுக்கப்பட்ட உச்சிகளின் வரிசையைப் பின்பற்றுக. எல்லாப் பக்கங்களும் சமம் எனக் கண்டபின், மூலைவிட்டங்களைக் கொண்டு சாய்சதுரம் சதுரமாகவும் உள்ளதா என அறியலாம்.');
  add(coordinate(7),0,'Since AB = BC,',
    'Both distances are nonnegative, so comparing their squares introduces no new distance solutions. When solving the squared coordinate difference, check both signs.',
    'இரு தொலைவுகளும் குறையற்றவை. அவற்றின் வர்க்கங்களை ஒப்பிடுவதால் புதிய தொலைவுத் தீர்வுகள் உருவாகாது. ஆயங்களின் வேறுபாட்டிற்கு வர்க்கமூலம் எடுக்கும்போது இரு குறிகளையும் கருதுக.');
  add(coordinate(8),0,'Let A = (x, x)',
    'Both coordinates of A are the same unknown. Reuse that unknown in the horizontal and vertical differences when applying the distance formula.',
    'A இன் இரண்டு ஆயங்களும் ஒரே தெரியாத மதிப்பு. தொலைவுச் சூத்திரத்தில் கிடைமட்ட, செங்குத்து வேறுபாடுகளுக்கு அதே மதிப்பைப் பயன்படுத்துக.');
  add(coordinate(9),0,'Let P(x, y),',
    'Equating squared distances removes the radicals. The squares of x and y occur on both sides and cancel, leaving a linear relation.',
    'தொலைவுகளின் வர்க்கங்களைச் சமப்படுத்தினால் வர்க்கமூலக் குறிகள் நீங்கும். இருபுறமும் உள்ள x, y ஆகியவற்றின் வர்க்கங்கள் நீங்கி ஒரு நேரியல் தொடர்பு கிடைக்கும்.');
  add(coordinate(11),1,'Compute all three distances',
    'Every point on a circle is one radius from the centre. Checking the three distances shows whether one circle with this centre passes through all three points.',
    'வட்டத்தின் மேல் உள்ள ஒவ்வொரு புள்ளியும் மையத்திலிருந்து ஓர் ஆரத் தொலைவில் இருக்கும். மூன்று தொலைவுகளையும் ஒப்பிட்டால் இந்த மையமுள்ள ஒரே வட்டம் மூன்று புள்ளிகள் வழியாகச் செல்கிறதா என்று அறியலாம்.');

  window.TriggleG9FrontierHints=Object.freeze(hints);
})();
