(() => {
  'use strict';

  // Original starting strategies for the registered 2025 textbook exercises.
  // The reader uses a card's authored hint first when one is available.
  const hints = {
    9: {
      '1.1': [
        'Decide whether every possible object has a clear membership rule. In roster form, list each distinct member once.',
        'ஒவ்வொரு பொருளும் அந்தக் கணத்தில் உறுப்பா என்பதைத் தெளிவாகத் தீர்மானிக்க முடியுமா எனப் பார். பட்டியல் முறையில் ஒவ்வோர் உறுப்பையும் ஒருமுறை மட்டும் எழுது.',
      ],
      '1.2': [
        'Write the distinct members first. To check a subset, test every member of the smaller set in the other set.',
        'வெவ்வேறான உறுப்புகளை முதலில் எழுது. உட்கணம் என்பதை அறிய, சிறிய கணத்தின் ஒவ்வோர் உறுப்பும் மற்ற கணத்தில் உள்ளதா எனப் பார்.',
      ],
      '1.3': [
        'Decide which Venn regions the operation includes. Read the elements from those regions.',
        'செயல்பாட்டில் சேரும் வென் படப் பகுதிகளைத் தீர்மானி. அந்தப் பகுதிகளிலுள்ள உறுப்புகளைப் படித்து எழுது.',
      ],
      '1.4': [
        'Work out each bracket first. Write the sets on both sides in roster form and compare their members.',
        'முதலில் அடைப்புக்குறிக்குள் உள்ள செயல்பாட்டைச் செய். இரு பக்கக் கணங்களையும் பட்டியல் முறையில் எழுதி உறுப்புகளை ஒப்பிடு.',
      ],
      '1.5': [
        'Choose one Venn region at a time and test whether it satisfies the membership conditions on each side.',
        'வென் படத்தில் ஒவ்வொரு பகுதியையும் தனித்தனியாக எடு. இரு பக்கங்களிலும் உள்ள உறுப்பாக இருப்பதற்கான நிபந்தனைகளுக்கு அது பொருந்துகிறதா எனச் சரிபார்.',
      ],
      '1.6': [
        'Fill overlapping Venn regions first. In a count of the union, each person or element must be counted once.',
        'வென் படத்தில் பொதுப்பகுதிகளை முதலில் நிரப்பு. சேர்ப்பைக் கணக்கிடும்போது ஒவ்வொரு நபரையும் உறுப்பையும் ஒருமுறை மட்டுமே எண்ணு.',
      ],
      '1.7': [
        'For a claim about sets, try a small example or a Venn region. For counts, check whether an overlap has been counted twice.',
        'கணங்களைப் பற்றிய கூற்றை ஒரு சிறிய எடுத்துக்காட்டிலோ வென் படப் பகுதியிலோ சோதித்துப் பார். எண்ணும்போது பொதுப்பகுதி இருமுறை சேர்க்கப்பட்டதா எனக் கவனி.',
      ],
      '2.1': [
        'Use a common denominator to compare fractions. If there are too few numerators between them, scale the denominator and numerators up.',
        'பின்னங்களை ஒப்பிடப் பொது பகுதியைப் பயன்படுத்து. இடையில் போதுமான தொகுதிகள் இல்லாவிட்டால், தொகுதிகளையும் பகுதியையும் ஒரே எண்ணால் பெருக்கு.',
      ],
      '2.2': [
        'Track the remainders in long division. A zero remainder ends the decimal, and a repeated remainder begins a repeating block.',
        'நீண்ட வகுத்தலில் வரும் மீதிகளைக் கவனி. மீதி பூச்சியமானால் தசமம் முடியும். ஒரு மீதி மீண்டும் வந்தால் தசம இலக்கங்கள் சுழலும்.',
      ],
      '2.3': [
        'Use a right triangle or a semicircle construction to obtain the required square-root length. Transfer that length to the number line.',
        'செங்கோண முக்கோணம் அல்லது அரைவட்ட அமைப்பு மூலம் வேண்டிய வர்க்கமூல நீளத்தைப் பெறு. அந்நீளத்தை எண் கோட்டில் குறி.',
      ],
      '2.4': [
        'Locate the number between two integers first. Subdivide the interval by ten for each decimal place.',
        'எண் எந்த இரு முழு எண்களுக்கு இடையில் உள்ளது என முதலில் காண். ஒவ்வொரு தசம இடத்திற்கும் அந்த இடைவெளியைப் பத்துச் சமப் பகுதிகளாகப் பிரி.',
      ],
      '2.5': [
        'Write the terms with the same base when possible. Then apply the index law for the operation shown.',
        'முடிந்தால் உறுப்புகளை ஒரே அடிமானத்துடன் எழுது. பிறகு கொடுக்கப்பட்ட செயலுக்குரிய அடுக்குவிதியைப் பயன்படுத்து.',
      ],
      '2.6': [
        'Take perfect powers out of the radicals first. Combine only terms with the same root index and radicand.',
        'மூலக்குறிக்குள் உள்ள முழு அடுக்குக் காரணிகளை முதலில் வெளியே எடு. ஒரே மூலப் படியும் ஒரே மூலக்குறி உள்ளெண்ணும் உள்ள உறுப்புகளை மட்டும் சேர்.',
      ],
      '2.7': [
        'Find a factor that turns the denominator into a rational number. Multiply the numerator and denominator by that same factor.',
        'பகுதியை விகிதமுறு எண்ணாக மாற்றும் காரணியைக் காண். தொகுதியையும் பகுதியையும் அதே காரணியால் பெருக்கு.',
      ],
      '2.8': [
        'Shift the decimal point until one nonzero digit is to its left. Use the number and direction of moves to determine the power of ten.',
        'தசமப் புள்ளிக்கு இடப்புறம் பூச்சியமல்லாத ஓர் இலக்கம் மட்டும் இருக்கும்வரை நகர்த்து. நகர்த்திய இடங்களையும் திசையையும் கொண்டு பத்தின் அடுக்கைத் தீர்மானி.',
      ],
      '2.9': [
        'Simplify an expression before selecting an option. For a claim that must always hold, try a perfect square and a non-square.',
        'விடையைத் தேர்ந்தெடுப்பதற்கு முன் கோவையைச் சுருக்கு. எப்போதும் உண்மை எனக் கூறுவதை ஒரு முழு வர்க்கத்திலும் ஒரு முழு வர்க்கமல்லாத எண்ணிலும் சோதித்துப் பார்.',
      ],
      '3.1': [
        'Translate the question into a polynomial expression. Combine like terms before checking its degree or evaluating it.',
        'வினாவைப் பல்கோவையாக எழுது. அதன் படியைக் காண்பதற்கோ மதிப்பைக் கணக்கிடுவதற்கோ முன் ஒத்த உறுப்புகளைச் சேர்.',
      ],
      '3.2': [
        'For a given input, substitute it with brackets. To find a zero, set the polynomial equal to zero and solve.',
        'கொடுக்கப்பட்ட மதிப்பை அடைப்புக்குறியிட்டு பிரதியிடு. பூச்சியத்தைக் காணப் பல்கோவையைப் பூச்சியத்துக்குச் சமமாக்கிச் சமன்பாட்டைத் தீர்.',
      ],
      '3.3': [
        'Set a linear divisor equal to zero. Evaluate the dividend at that value to find the remainder.',
        'ஒருபடி வகுக்கும் கோவையைப் பூச்சியத்துக்குச் சமமாக்கு. கிடைத்த மதிப்பைப் பல்கோவையில் பிரதியிட்டு மீதியைக் காண்.',
      ],
      '3.4': [
        'Look for an algebraic identity that matches the expression. When expanding, include every product and check its sign.',
        'கோவைக்குப் பொருந்தும் முற்றொருமையைத் தேடு. விரிவாக்கும்போது ஒவ்வொரு பெருக்கலையும் சேர்த்து அதன் குறியைச் சரிபார்.',
      ],
      '3.5': [
        'Take out a common factor first. Then check whether the remaining terms can be grouped or match a familiar identity.',
        'முதலில் பொதுக் காரணியை வெளியே எடு. எஞ்சிய உறுப்புகளைத் தொகுக்க முடியுமா அல்லது அவை முற்றொருமைக்குப் பொருந்துமா எனப் பார்.',
      ],
      '3.6': [
        'For a quadratic, look for two numbers with the required product and sum. Use them to split the middle term.',
        'இருபடிக் கோவைக்குத் தேவையான பெருக்கற்பலனும் கூட்டற்பலனும் தரும் இரு எண்களைத் தேடு. அவற்றைப் பயன்படுத்தி நடு உறுப்பைப் பிரி.',
      ],
      '3.7': [
        'Arrange the dividend in descending powers and put a zero coefficient in any gap. After dividing, check quotient times divisor plus remainder.',
        'வகுபடும் பல்கோவையை இறங்கு அடுக்குவரிசையில் எழுது. விடுபட்ட உறுப்புக்கு பூச்சியக் கெழு இடு. வகுத்தபின் ஈவை வகுக்கும் கோவையால் பெருக்கி மீதியைக் கூட்டிச் சரிபார்.',
      ],
      '3.8': [
        'Test a possible zero before using synthetic division. A zero remainder lets you factor the quotient next.',
        'தொகுப்பு வகுத்தலுக்கு முன் சாத்தியமான பூச்சிய மதிப்பைச் சோதித்துப் பார். மீதி பூச்சியமானால் அடுத்து ஈவைக் காரணிப்படுத்து.',
      ],
      '3.9': [
        'Factor the coefficients and variables. For the GCD use the least shared powers, and for the LCM use the greatest required powers.',
        'கெழுக்களையும் மாறிகளையும் காரணிப்படுத்து. மீ.பொ.வ. காண பொதுக் காரணிகளின் சிறிய அடுக்குகளையும், மீ.சி.ம. காண தேவையான பெரிய அடுக்குகளையும் எடு.',
      ],
      '3.10': [
        'Make a table of coordinate pairs for each line. For simultaneous equations, look for the point on both lines.',
        'ஒவ்வொரு நேர்க்கோட்டுக்கும் ஆயத்தொலை இணைகளின் அட்டவணை அமை. ஒருங்கமை சமன்பாடுகளுக்கு இரு கோடுகளிலும் உள்ள புள்ளியைத் தேடு.',
      ],
      '3.11': [
        'In one equation isolate the variable with the simplest coefficient. Substitute that expression into the other equation.',
        'எளிய கெழுவுள்ள மாறியை ஒரு சமன்பாட்டில் தனிமைப்படுத்து. கிடைத்த கோவையை மற்ற சமன்பாட்டில் பிரதியிடு.',
      ],
      '3.12': [
        'Clear denominators if needed. Make one variable have matching coefficients so it disappears when the equations are added or subtracted.',
        'தேவைப்பட்டால் பகுதிகளை நீக்கு. கூட்டும்போதோ கழிக்கும்போதோ ஒரு மாறி நீங்குமாறு அதன் கெழுக்களைச் சமமாக்கு.',
      ],
      '3.13': [
        'Put both equations in the same standard form and identify their signed coefficients. If reciprocals occur, start with variables for them.',
        'இரு சமன்பாடுகளையும் ஒரே திட்ட வடிவில் எழுதி கெழுக்களின் குறிகளைக் கவனி. தலைகீழிகள் இருந்தால் அவற்றுக்குத் தனி மாறிகளை அமை.',
      ],
      '3.14': [
        'Name the two unknown quantities and translate each given condition into an equation. Check that the result meets the original conditions.',
        'தெரியாத இரு அளவுகளுக்கும் மாறிகளை அமைத்து, ஒவ்வொரு நிபந்தனையையும் சமன்பாடாக எழுது. கிடைத்த விடை தொடக்க நிபந்தனைகளுக்குப் பொருந்துகிறதா எனச் சரிபார்.',
      ],
      '3.15': [
        'Identify the relevant rule from the question. For roots and factors, substitute the candidate value before comparing options.',
        'வினாவுக்குப் பொருந்தும் விதியைக் கண்டறி. மூலங்கள் அல்லது காரணிகள் இருந்தால், தெரிவுகளை ஒப்பிடுவதற்கு முன் சாத்தியமான மதிப்பைப் பிரதியிடு.',
      ],
      '4.1': [
        'Mark known angles and equal sides first. Look for an angle sum, parallel-line angle pair or congruence condition.',
        'தெரிந்த கோணங்களையும் சமப் பக்கங்களையும் முதலில் குறி. கோணக் கூடுதல், இணைகோட்டுக் கோண இணை அல்லது சர்வசம நிபந்தனையைத் தேடு.',
      ],
      '4.2': [
        'Use the angle sum of a quadrilateral and mark its parallel sides. Check which diagonal properties apply to the given shape.',
        'நாற்கரத்தின் கோணக் கூடுதலைப் பயன்படுத்தி இணைப் பக்கங்களைக் குறி. கொடுக்கப்பட்ட வடிவத்துக்குப் பொருந்தும் மூலைவிட்டப் பண்புகளைத் தேர்ந்தெடு.',
      ],
      '4.3': [
        'Draw the perpendicular from the centre to the chord. It bisects the chord and forms a right triangle with a radius.',
        'வட்ட மையத்திலிருந்து நாணுக்குச் செங்குத்துக்கோடு வரை. அது நாணை இருசமமாகப் பிரித்து ஆரத்துடன் ஒரு செங்கோண முக்கோணத்தை உருவாக்கும்.',
      ],
      '4.4': [
        'Mark the arcs and the angles that stand on them. If a diameter is given, check the angle it subtends at the circle.',
        'வில்களையும் அவற்றால் வட்டத்தில் தாங்கப்படும் கோணங்களையும் குறி. விட்டம் கொடுக்கப்பட்டால் அது வட்டத்தில் தாங்கும் கோணத்தைக் கவனி.',
      ],
      '4.5': [
        'Construct the triangle first. Mark side midpoints and draw medians from the opposite vertices to locate the centroid.',
        'முதலில் முக்கோணத்தை அமை. பக்கங்களின் நடுப்புள்ளிகளைக் குறி. எதிர் உச்சிகளிலிருந்து நடுக்கோடுகளை வரைந்து நடுக்கோட்டு மையத்தைக் காண்.',
      ],
      '4.6': [
        'After constructing the triangle, draw perpendicular bisectors of sides for the circumcentre, or altitudes for the orthocentre.',
        'முக்கோணத்தை அமைத்தபின் சுற்றுவட்ட மையத்தை அறியப் பக்கங்களின் செங்குத்து இருசமவெட்டிகளையும், செங்கோட்டு மையத்தை அறியக் குத்துக்கோடுகளையும் வரை.',
      ],
      '4.7': [
        'Mark the given lengths and angles on a quick sketch. Use the applicable theorem before testing the choices.',
        'ஒரு சிறு படத்தில் கொடுக்கப்பட்ட நீளங்களையும் கோணங்களையும் குறி. தெரிவுகளைச் சோதிக்கும் முன் பொருந்தும் தேற்றத்தைப் பயன்படுத்து.',
      ],
      '5.1': [
        'Read the horizontal coordinate first. Plot every point before joining them in the order requested.',
        'முதலில் கிடைமட்ட ஆயத்தொலைவைப் படி. கொடுக்கப்பட்ட வரிசையில் இணைப்பதற்கு முன் எல்லாப் புள்ளிகளையும் குறி.',
      ],
      '5.2': [
        'Label each endpoint and calculate horizontal and vertical changes. Squared distances can be compared without taking square roots.',
        'ஒவ்வொரு முனைப்புள்ளியையும் குறித்துக் கிடைமட்ட, செங்குத்து மாற்றங்களைக் கணக்கிடு. வர்க்கமூலம் காணாமலேயே தொலைவுகளின் வர்க்கங்களை ஒப்பிடலாம்.',
      ],
      '5.3': [
        'The midpoint takes the average of the two horizontal coordinates and the average of the two vertical coordinates separately.',
        'நடுப்புள்ளியைக் காணக் கிடைமட்ட ஆயத்தொலைவுகளின் சராசரியையும் செங்குத்து ஆயத்தொலைவுகளின் சராசரியையும் தனித்தனியாகக் காண்.',
      ],
      '5.4': [
        'Sketch the endpoints and the dividing point. Keep the ratio in the same order as the endpoints when applying the section formula.',
        'முனைப்புள்ளிகளையும் பிரிக்கும் புள்ளியையும் வரைந்து பார். பிரிவு வாய்பாட்டைப் பயன்படுத்தும்போது விகிதத்தையும் முனைப்புள்ளிகளையும் ஒரே வரிசையில் எடு.',
      ],
      '5.5': [
        'For a centroid, average each coordinate of the three vertices. For a median, first find the midpoint of the opposite side.',
        'நடுக்கோட்டு மையத்துக்கு மூன்று உச்சிகளின் ஆயத்தொலைவுகளைத் தனித்தனியாகச் சராசரி செய். நடுக்கோட்டுக்கு எதிர்ப்பக்க நடுப்புள்ளியை முதலில் காண்.',
      ],
      '5.6': [
        'Use the signs of the coordinates to locate the point. For a question about a shape, plot before comparing distances or midpoints.',
        'ஆயத்தொலைவுகளின் குறிகளைக் கொண்டு புள்ளியின் இடத்தைக் காண். வடிவம் பற்றிய வினாவில் தொலைவுகளையோ நடுப்புள்ளிகளையோ ஒப்பிடும்முன் புள்ளிகளைக் குறி.',
      ],
      '6.1': [
        'Choose the angle first. Then label its opposite side, adjacent side and the hypotenuse before selecting a ratio.',
        'முதலில் கோணத்தைத் தேர்ந்தெடு. விகிதத்தை எடுப்பதற்கு முன் அதன் எதிர்ப்பக்கம், அடுத்துள்ள பக்கம், கர்ணம் ஆகியவற்றைக் குறி.',
      ],
      '6.2': [
        'Write the exact standard-angle values and substitute them into the two sides of the identity separately.',
        'திட்டக் கோணங்களின் துல்லிய மதிப்புகளை எழுது. முற்றொருமையின் இரு பக்கங்களிலும் அவற்றைத் தனித்தனியாகப் பிரதியிடு.',
      ],
      '6.3': [
        'Look for angles adding to a right angle. Rewrite complementary ratios in a common form before simplifying.',
        'கூட்டினால் செங்கோணம் வரும் கோண இணைகளைத் தேடு. சுருக்குவதற்கு முன் நிரப்புக் கோண விகிதங்களை ஒரே வடிவில் எழுது.',
      ],
      '6.4': [
        'For a table lookup, separate degrees and minutes. Choose the correct trigonometric table and use its mean-difference column when needed.',
        'அட்டவணையைப் பயன்படுத்தப் பாகைகளையும் நிமிடங்களையும் பிரி. உரிய முக்கோணவியல் அட்டவணையைத் தேர்ந்தெடுத்து, தேவைப்பட்டால் சராசரி வேறுபாட்டுப் பத்தியைப் பயன்படுத்து.',
      ],
      '6.5': [
        'Try exact special-angle values or complementary-angle identities before comparing the listed options.',
        'கொடுக்கப்பட்ட தெரிவுகளை ஒப்பிடும்முன் சிறப்புக் கோணங்களின் துல்லிய மதிப்புகளையோ நிரப்புக் கோண முற்றொருமைகளையோ பயன்படுத்து.',
      ],
      '7.1': [
        'Find the semi-perimeter first. Keep the three differences from it separate until applying Heron’s formula.',
        'முதலில் அரைச்சுற்றளவைக் காண். ஹீரோன் வாய்பாட்டைப் பயன்படுத்தும்வரை அதிலிருந்து ஒவ்வொரு பக்கத்தையும் கழித்த அளவுகளைத் தனியாக வைத்திரு.',
      ],
      '7.2': [
        'Convert all lengths to a common unit. Mark the faces that are actually painted, covered or left open.',
        'எல்லா நீளங்களையும் ஒரே அலகுக்கு மாற்று. பூசப்படும் முகங்கள், மூடப்படும் முகங்கள், திறந்த முகங்கள் ஆகியவற்றைக் குறி.',
      ],
      '7.3': [
        'Write all dimensions in the same unit and distinguish volume from the count of objects that fit.',
        'அனைத்து பரிமாணங்களையும் ஒரே அலகில் எழுது. கனஅளவையும் உள்ளே அடங்கும் பொருள்களின் எண்ணிக்கையையும் தனித்தனியாகக் கவனி.',
      ],
      '7.4': [
        'Decide whether the question asks for length, area, surface area or volume. Use the units to check the formula you choose.',
        'வினா நீளம், பரப்பளவு, புறப்பரப்பு அல்லது கனஅளவு இவற்றில் எதைக் கேட்கிறது எனத் தீர்மானி. தேர்ந்தெடுத்த வாய்பாட்டை அலகுகளால் சரிபார்.',
      ],
      '8.1': [
        'For a mean, find the total value and the total number of observations. In a frequency table, each value contributes once per occurrence.',
        'சராசரியைக் காண மதிப்புகளின் கூட்டுத்தொகையையும் தரவுகளின் மொத்த எண்ணிக்கையையும் காண். நிகழ்வெண் அட்டவணையில் ஒவ்வொரு மதிப்பும் அதன் நிகழ்வெண்ணுக்கு ஏற்ப சேரும்.',
      ],
      '8.2': [
        'Order the data first. For grouped data, use cumulative frequency to identify where the middle observation lies.',
        'தரவுகளை முதலில் வரிசைப்படுத்து. தொகுக்கப்பட்ட தரவுகளில் நடுவிலுள்ள மதிப்பின் வகுப்பைக் காணக் குவிவு நிகழ்வெண்ணைப் பயன்படுத்து.',
      ],
      '8.3': [
        'Make a tally or read the frequency column. For grouped mode, identify the modal class before looking at its neighbours.',
        'குறிகளிட்டு எண்ணு அல்லது நிகழ்வெண் பத்தியைப் படி. தொகுக்கப்பட்ட தரவின் முகடுக்காக முதலில் முகட்டு வகுப்பைக் கண்டு அடுத்துள்ள வகுப்புகளைப் பார்.',
      ],
      '8.4': [
        'Identify the measure being asked for. A mean uses the total, a median uses position, and a mode uses frequency.',
        'கேட்கப்பட்ட அளவையைக் கண்டறி. சராசரிக்குக் கூட்டுத்தொகையும், இடைநிலைக்கு இடமும், முகட்டுக்கு நிகழ்வெண்ணும் பயன்படும்.',
      ],
      '9.1': [
        'List all equally likely outcomes. Mark the ones that satisfy the event before counting them.',
        'சமவாய்ப்புள்ள முடிவுகள் அனைத்தையும் பட்டியலிடு. எண்ணுவதற்கு முன் நிகழ்ச்சிக்குச் சாதகமான முடிவுகளைக் குறி.',
      ],
      '9.2': [
        'Use the recorded event count and the total trial count. For “not”, identify the complementary event.',
        'பதிவான நிகழ்ச்சி எண்ணிக்கையையும் மொத்தச் சோதனைகளின் எண்ணிக்கையையும் பயன்படுத்து. “நிகழாது” எனக் கேட்டால் நிரப்பு நிகழ்ச்சியைக் காண்.',
      ],
      '9.3': [
        'Check that a probability lies between zero and one. Decide whether the question uses counted outcomes or observed frequencies.',
        'நிகழ்தகவு பூச்சியத்துக்கும் ஒன்றுக்கும் இடையில் உள்ளதா எனச் சரிபார். வினா முடிவுகளின் எண்ணிக்கையையா அல்லது சோதனையில் பதிவான நிகழ்வெண்ணையா பயன்படுத்துகிறது எனக் கவனி.',
      ],
    },
    10: {
      '1.1': [
        'For each element of the first set, pair it with every element of the second set. Keep the two positions in order.',
        'முதல் கணத்தின் ஒவ்வோர் உறுப்பையும் இரண்டாம் கணத்தின் எல்லா உறுப்புகளுடனும் இணை. வரிசைச் சோடியின் இரு இடங்களையும் மாற்றாதே.',
      ],
      '1.2': [
        'For a relation from one set to another, check the two entries of each ordered pair. Read the domain from the first entries.',
        'ஒரு கணத்திலிருந்து மற்றொரு கணத்துக்கான உறவுக்கு, ஒவ்வொரு வரிசைச் சோடியின் இரு உறுப்புகளையும் சரிபார். முதல் உறுப்புகளிலிருந்து சார்பகத்தை அறி.',
      ],
      '1.3': [
        'Use the given input set. Check that each input has exactly one permitted output, then collect the outputs to find the range.',
        'கொடுக்கப்பட்ட உள்ளீட்டுக் கணத்தைப் பயன்படுத்து. ஒவ்வோர் உள்ளீட்டுக்கும் ஒரே ஓர் அனுமதிக்கப்பட்ட வெளியீடு உள்ளதா எனப் பார். வெளியீடுகளைச் சேர்த்து வீச்சகத்தைக் காண்.',
      ],
      '1.4': [
        'From a graph, check how many points share an input. From a rule, make an input–output table before drawing arrows or plotting.',
        'வரைபடத்தில் ஓர் உள்ளீட்டுக்கு எத்தனை புள்ளிகள் உள்ளன எனப் பார். விதி கொடுக்கப்பட்டால் அம்புக்குறியிடுவதற்கோ புள்ளிகளைக் குறிக்கவோ முன் உள்ளீடு–வெளியீட்டு அட்டவணை அமை.',
      ],
      '1.5': [
        'Apply the inner function first. Check that its output belongs to the domain of the outer function before applying that function.',
        'உள்ளே உள்ள சார்பை முதலில் செயற்படுத்து. அதன் வெளியீடு வெளிச் சார்பின் சார்பகத்தில் உள்ளதா எனச் சரிபார்த்த பின் வெளிச் சார்பைச் செயற்படுத்து.',
      ],
      '1.6': [
        'For products and relations check the order and number of pairs. For a function, test one input at a time.',
        'கார்டீசியன் பெருக்கல் மற்றும் உறவுகளில் சோடிகளின் வரிசையையும் எண்ணிக்கையையும் கவனி. சார்பில் ஒவ்வோர் உள்ளீட்டையும் தனியாகச் சோதி.',
      ],
      '1.unit': [
        'Write the allowed input set beside the rule. For ordered pairs compare corresponding entries, and for a piecewise rule choose the case first.',
        'விதிக்கு அருகில் அனுமதிக்கப்பட்ட உள்ளீட்டுக் கணத்தை எழுது. வரிசைச் சோடிகளின் ஒத்த இடங்களை ஒப்பிடு. பகுதிவாரிச் சார்பில் முதலில் உரிய நிபந்தனையைத் தேர்ந்தெடு.',
      ],
      '2.1': [
        'Write the integer as divisor times quotient plus remainder. Keep the remainder nonnegative and smaller than the divisor.',
        'வகுக்கும் எண், ஈவு ஆகியவற்றைப் பெருக்கி மீதியைக் கூட்டும் வடிவில் முழு எண்ணை எழுது. மீதி எதிர்மறையாக இருக்கக் கூடாது, வகுக்கும் எண்ணைவிடச் சிறியதாக இருக்க வேண்டும்.',
      ],
      '2.2': [
        'For a last-digit question, look for a repeating cycle. For an HCF or LCM, compare prime powers or use successive divisions.',
        'கடைசி இலக்கத்துக்கு மீண்டும் வரும் சுழற்சியைத் தேடு. மீ.பெ.வ. அல்லது மீ.சி.ம. காண பகா எண் அடுக்குகளை ஒப்பிடு அல்லது தொடர்ச்சியாக வகு.',
      ],
      '2.3': [
        'Identify the cycle length first. Replace a large shift by its remainder around that cycle.',
        'முதலில் சுழற்சியின் நீளத்தைக் காண். பெரிய மாற்றத்தைச் சுழற்சி நீளத்தால் வகுத்து மீதியைப் பயன்படுத்து.',
      ],
      '2.4': [
        'Compare consecutive terms and look for a difference, ratio or position rule. Use the same rule to check more than one term.',
        'அடுத்தடுத்த உறுப்புகளை ஒப்பிட்டு வேறுபாடு, விகிதம் அல்லது உறுப்பு இடத்துக்கான விதியைத் தேடு. அதே விதியை ஒன்றுக்கு மேற்பட்ட உறுப்புகளில் சோதி.',
      ],
      '2.5': [
        'Identify the first term and the common difference. Count how many steps separate the given term from the first.',
        'முதல் உறுப்பையும் பொது வித்தியாசத்தையும் காண். முதல் உறுப்பிலிருந்து கொடுக்கப்பட்ட உறுப்புவரை எத்தனை இடைவெளி உள்ளது என எண்ணு.',
      ],
      '2.6': [
        'For an arithmetic sum, find the number of terms and the first and last terms. You can pair the two ends of the sequence.',
        'கூட்டுத் தொடரின் கூடுதலுக்கு உறுப்புகளின் எண்ணிக்கை, முதல் உறுப்பு, கடைசி உறுப்பு ஆகியவற்றைக் காண். இரு முனைகளிலிருந்தும் உறுப்புகளைச் சோடியாக இணைத்துப் பார்.',
      ],
      '2.7': [
        'Check that consecutive nonzero terms have a common ratio. Keep track of how many times that ratio is applied.',
        'அடுத்தடுத்த பூச்சியமல்லாத உறுப்புகளுக்கு ஒரே பொது விகிதம் உள்ளதா எனச் சரிபார். அந்த விகிதம் எத்தனை முறை பயன்படுத்தப்படுகிறது எனக் கவனி.',
      ],
      '2.8': [
        'Decide whether the sum is finite or infinite. For an infinite geometric series, check that the common ratio has magnitude less than one.',
        'தொடர் கூடுதல் முடிவுள்ளதா முடிவிலாததா எனத் தீர்மானி. முடிவிலாப் பெருக்குத் தொடரில் பொது விகிதத்தின் தனிமதிப்பு ஒன்றைவிடச் சிறியதா எனப் பார்.',
      ],
      '2.9': [
        'Match the terms to the sum of integers, squares or cubes. For a segment of a series, subtract the sum before its first term.',
        'உறுப்புகள் இயல் எண்களா, வர்க்கங்களா, கனங்களா எனக் கண்டு உரிய கூடுதல் வாய்பாட்டைப் பயன்படுத்து. தொடரின் ஒரு பகுதியின் கூடுதலுக்கு அதன் முன்புள்ள கூடுதலைக் கழி.',
      ],
      '2.10': [
        'Distinguish divisibility from a sequence pattern. Test the given remainders or consecutive terms before choosing an option.',
        'வகுபடும் தன்மையையும் தொடர் வடிவத்தையும் வேறுபடுத்திக் காண். தெரிவைத் தேர்ந்தெடுக்கும் முன் கொடுக்கப்பட்ட மீதிகளையோ அடுத்தடுத்த உறுப்புகளையோ சோதி.',
      ],
      '2.unit': [
        'Decide whether to model the problem with a divisor, a cycle, or a sequence. Write the condition on the unknown before solving.',
        'வினாவை வகுத்தல், சுழற்சி அல்லது தொடர் மூலம் அமைக்க வேண்டுமா எனத் தீர்மானி. தீர்ப்பதற்கு முன் தெரியாத அளவுக்கான நிபந்தனையை எழுது.',
      ],
      '3.1': [
        'Choose one variable to eliminate twice. Solve the two resulting equations, then substitute back into one of the originals.',
        'ஒரே மாறியை இருமுறை நீக்கும் வகையில் சமன்பாடுகளை இணை. கிடைக்கும் இரு சமன்பாடுகளைத் தீர்த்து, தொடக்கச் சமன்பாடொன்றில் மதிப்புகளைப் பிரதியிடு.',
      ],
      '3.2': [
        'Factor each polynomial if possible. A factor can be in the GCD only if it occurs in both polynomials.',
        'முடிந்தால் ஒவ்வொரு பல்கோவையையும் காரணிப்படுத்து. இரு பல்கோவைகளிலும் உள்ள காரணிகள் மட்டுமே மீ.பெ.வ. இல் இடம்பெறும்.',
      ],
      '3.3': [
        'Factor both expressions. Take the least required powers for the common divisor and the greatest required powers for the common multiple.',
        'இரு கோவைகளையும் காரணிப்படுத்து. பொது வகுத்திக்கு பொதுக் காரணிகளின் சிறிய அடுக்குகளையும், பொது மடங்குக்குத் தேவையான பெரிய அடுக்குகளையும் எடு.',
      ],
      '3.4': [
        'Record the zeros of the original denominator. Factor the numerator and denominator, then cancel common factors.',
        'தொடக்கப் பகுதியைப் பூச்சியமாக்கும் மதிப்புகளைக் குறி. தொகுதியையும் பகுதியையும் காரணிப்படுத்திப் பொதுக் காரணிகளை நீக்கு.',
      ],
      '3.5': [
        'Factor first and record excluded values. For division of rational expressions, multiply by the reciprocal of the divisor.',
        'முதலில் காரணிப்படுத்தி அனுமதிக்கப்படாத மதிப்புகளைக் குறி. விகிதமுறு கோவைகளை வகுக்க, வகுக்கும் கோவையின் தலைகீழியால் பெருக்கு.',
      ],
      '3.6': [
        'Factor the denominators and check for opposite signs. Find a common denominator before combining numerators.',
        'பகுதிகளைக் காரணிப்படுத்து, எதிர்க்குறிகள் உள்ளனவா எனக் கவனி. தொகுதிகளை இணைப்பதற்கு முன் பொது பகுதியைக் காண்.',
      ],
      '3.7': [
        'Look for perfect-square factors in the numerator and denominator. Check where the original expression is defined.',
        'தொகுதியிலும் பகுதியிலும் முழு வர்க்கக் காரணிகளைத் தேடு. தொடக்கக் கோவை எந்த மதிப்புகளுக்கு வரையறுக்கப்பட்டுள்ளது எனச் சரிபார்.',
      ],
      '3.8': [
        'Arrange the polynomial by descending powers and identify the square root of its leading term. Square your result to check it.',
        'பல்கோவையை இறங்கு அடுக்குவரிசையில் எழுதி முதல் உறுப்பின் வர்க்கமூலத்தைக் காண். கிடைத்த விடையை வர்க்கப்படுத்திச் சரிபார்.',
      ],
      '3.9': [
        'Use the sum and product of the roots to choose the coefficients of a monic quadratic. Clear fractions at the end if needed.',
        'மூலங்களின் கூடுதல், பெருக்கற்பலன் மூலம் தலைமைக் கெழு ஒன்று கொண்ட இருபடிச் சமன்பாட்டின் கெழுக்களைக் காண். தேவைப்பட்டால் இறுதியில் பின்னங்களை நீக்கு.',
      ],
      '3.10': [
        'Put every term on one side. Factor the quadratic, then apply the zero-product rule and check any original restrictions.',
        'எல்லா உறுப்புகளையும் ஒரு பக்கத்திற்குக் கொண்டு வா. இருபடிக் கோவையைக் காரணிப்படுத்தி பெருக்கற்பலன் பூச்சியம் என்ற விதியைப் பயன்படுத்து. தொடக்க நிபந்தனைகளைச் சரிபார்.',
      ],
      '3.11': [
        'First put the equation in standard form. For completing the square, use half the linear coefficient after making the leading coefficient one.',
        'முதலில் சமன்பாட்டைத் திட்ட வடிவில் எழுது. வர்க்கம் நிறைவு செய்யத் தலைமைக் கெழுவை ஒன்றாக்கி, ஒருபடி உறுப்பின் கெழுவில் பாதியைப் பயன்படுத்து.',
      ],
      '3.12': [
        'Give the unknown a unit and write an equation from the stated condition. After solving, check which roots fit the situation.',
        'தெரியாத அளவுக்கு ஓர் அலகை அமைத்துக் கொடுக்கப்பட்ட நிபந்தனையிலிருந்து சமன்பாடு எழுது. தீர்த்தபின் சூழலுக்குப் பொருந்தும் மூலங்களைச் சரிபார்.',
      ],
      '3.13': [
        'Collect the coefficients in standard form. Use the sign of the discriminant to decide the nature of the roots.',
        'திட்ட வடிவின் கெழுக்களைக் குறி. மூலங்களின் தன்மையைத் தீர்மானிக்க மூலத்தின் தன்மை காட்டியின் குறியைப் பயன்படுத்து.',
      ],
      '3.14': [
        'Rearrange the expression to expose sums and products of the roots. If there are fractions, start with a common denominator.',
        'மூலங்களின் கூடுதலும் பெருக்கற்பலனும் தெரியுமாறு கோவையை மாற்றி எழுது. பின்னங்கள் இருந்தால் பொதுப் பகுதியிலிருந்து தொடங்கு.',
      ],
      '3.15': [
        'Decide whether the quantities have a constant ratio or a constant product. Then choose convenient values for a graph table.',
        'அளவுகளுக்கு மாறாத விகிதமா மாறாத பெருக்கற்பலனா எனத் தீர்மானி. பிறகு வரைபட அட்டவணைக்கு ஏற்ற மதிப்புகளைத் தேர்ந்தெடு.',
      ],
      '3.16': [
        'Find the axis of symmetry and choose points on both sides of it. Count the intersections with the horizontal axis to locate real roots.',
        'சமச்சீர் அச்சைக் கண்டு அதன் இரு பக்கங்களிலும் புள்ளிகளைத் தேர்ந்தெடு. மெய் மூலங்களைக் காண கிடைமட்ட அச்சை வெட்டும் புள்ளிகளை எண்ணு.',
      ],
      '3.17': [
        'Read the row index before the column index. Write the order as number of rows by number of columns.',
        'நிரல் இடத்துக்கு முன் நிரை இடத்தைப் படி. அணியின் வரிசையை நிரைகளின் எண்ணிக்கை, நிரல்களின் எண்ணிக்கை என்ற வரிசையில் எழுது.',
      ],
      '3.18': [
        'Check the orders of the matrices. For addition or subtraction, combine only entries in the same position.',
        'அணிகளின் வரிசைகளைச் சரிபார். கூட்டல் அல்லது கழித்தலுக்கு ஒரே இடத்திலுள்ள உறுப்புகளை மட்டும் இணை.',
      ],
      '3.19': [
        'Check that the first matrix has as many columns as the second has rows. Form each entry from a row and a column.',
        'முதல் அணியின் நிரல்களின் எண்ணிக்கையும் இரண்டாம் அணியின் நிரைகளின் எண்ணிக்கையும் சமமா எனச் சரிபார். ஒவ்வோர் உறுப்பையும் ஒரு நிரை, ஒரு நிரல் கொண்டு அமை.',
      ],
      '3.20': [
        'Identify whether the question uses a polynomial, a quadratic, a system or a matrix. Check the defining condition before selecting a choice.',
        'வினா பல்கோவை, இருபடிச் சமன்பாடு, ஒருங்கமை சமன்பாடு, அணி இவற்றில் எதைப் பற்றியது எனக் காண். தெரிவை எடுப்பதற்கு முன் அதற்குரிய நிபந்தனையைச் சரிபார்.',
      ],
      '3.unit': [
        'Write the given relationships in symbols first. Check restrictions on variables and make sure any result satisfies the original problem.',
        'கொடுக்கப்பட்ட தொடர்புகளை முதலில் குறியீடுகளில் எழுது. மாறிகளின் கட்டுப்பாடுகளைக் கவனி. கிடைத்த விடை தொடக்க வினாவுக்குப் பொருந்துகிறதா எனச் சரிபார்.',
      ],
      '4.1': [
        'Match the vertices and sides of the triangles in the same order. Then use a similarity test or a ratio of corresponding sides.',
        'முக்கோணங்களின் உச்சிகளையும் பக்கங்களையும் ஒரே வரிசையில் பொருத்து. பிறகு வடிவொப்புமை நிபந்தனையையோ ஒத்த பக்கங்களின் விகிதத்தையோ பயன்படுத்து.',
      ],
      '4.2': [
        'Mark the parallel lines and the segments they cut off. Write a proportion using corresponding segments on the two transversals.',
        'இணைகோடுகளையும் அவை பிரிக்கும் துண்டுகளையும் குறி. இரு குறுக்குவெட்டிகளிலும் ஒத்த துண்டுகளைப் பயன்படுத்தி விகிதச் சமத்தை எழுது.',
      ],
      '4.3': [
        'Draw the right triangle and mark the hypotenuse. Use the relationship between the squares of its three sides.',
        'செங்கோண முக்கோணத்தை வரைந்து கர்ணத்தைக் குறி. அதன் மூன்று பக்கங்களின் வர்க்கங்களுக்கு இடையிலான தொடர்பைப் பயன்படுத்து.',
      ],
      '4.4': [
        'Join the centre to each point of tangency. Mark the right angles and any equal tangent lengths from the same external point.',
        'மையத்தையும் ஒவ்வொரு தொடுபுள்ளியையும் இணை. செங்கோணங்களையும் ஒரே வெளிப்புள்ளியிலிருந்து வரும் சமத் தொடுகோட்டு நீளங்களையும் குறி.',
      ],
      '4.5': [
        'Match corresponding vertices before choosing a similarity, right-triangle or tangent fact. Check options against that fact.',
        'வடிவொப்புமை, செங்கோண முக்கோணம் அல்லது தொடுகோட்டுப் பண்பைப் பயன்படுத்தும் முன் ஒத்த உச்சிகளைப் பொருத்து. அந்தப் பண்பைக் கொண்டு தெரிவுகளைச் சோதி.',
      ],
      '4.unit': [
        'Mark known angles and parallel or perpendicular lines. Look for triangles that share an angle or have corresponding sides.',
        'தெரிந்த கோணங்களையும் இணைகோடுகள் அல்லது செங்குத்துக் கோடுகளையும் குறி. பொதுக் கோணம் அல்லது ஒத்த பக்கங்கள் உள்ள முக்கோணங்களைத் தேடு.',
      ],
      '5.1': [
        'Keep the vertices in a fixed order for the signed area. Use its magnitude for area and check whether it becomes zero for collinearity.',
        'குறியுடன் கூடிய பரப்பளவைக் காண உச்சிகளை ஒரே வரிசையில் எடு. பரப்பளவுக்குத் தனிமதிப்பைப் பயன்படுத்து. புள்ளிகள் ஒரே கோட்டில் இருந்தால் அது பூச்சியமாகுமா எனப் பார்.',
      ],
      '5.2': [
        'Use vertical change over horizontal change for slope. Check whether the horizontal change is zero before dividing.',
        'சாய்வைக் காணச் செங்குத்து மாற்றத்தைக் கிடைமட்ட மாற்றத்தால் வகு. வகுப்பதற்கு முன் கிடைமட்ட மாற்றம் பூச்சியமா எனச் சரிபார்.',
      ],
      '5.3': [
        'Identify the available point, slope or intercepts. Choose a line equation form that uses those pieces of information directly.',
        'கொடுக்கப்பட்ட புள்ளி, சாய்வு அல்லது அச்சு வெட்டுத்துண்டுகளைக் குறி. அவற்றை நேரடியாகப் பயன்படுத்தக்கூடிய நேர்க்கோட்டுச் சமன்பாட்டு வடிவத்தைத் தேர்ந்தெடு.',
      ],
      '5.4': [
        'Find the slopes first. Compare them for parallelism or use the perpendicularity condition, taking care with vertical lines.',
        'முதலில் சாய்வுகளைக் காண். இணைகோடுகளா என அவற்றை ஒப்பிடு. செங்குத்துக் கோடுகளா எனச் சோதிக்கும்போது செங்குத்து அச்சுக்கு இணையான கோடுகளைக் கவனி.',
      ],
      '5.5': [
        'Sketch the points or lines. Use coordinates, area or slope according to the property named in the question.',
        'புள்ளிகளையோ கோடுகளையோ வரைந்து பார். வினாவில் கேட்கப்படும் பண்புக்கேற்ப ஆயத்தொலைவு, பரப்பளவு அல்லது சாய்வைப் பயன்படுத்து.',
      ],
      '5.unit': [
        'Label the vertices and list what is known about each line. Find any missing intersection or endpoint before working with area.',
        'உச்சிகளைக் குறித்துக் கோடுகளைப் பற்றி அறிந்தவற்றை எழுது. பரப்பளவைக் கணக்கிடும்முன் தெரியாத வெட்டுப்புள்ளியையோ முனைப்புள்ளியையோ காண்.',
      ],
      '6.1': [
        'Rewrite ratios in sine and cosine if the identity is hard to see. Check that each denominator is nonzero.',
        'முற்றொருமையைக் காணக் கடினமாக இருந்தால் விகிதங்களை சைன், கோசைன் மூலம் எழுது. ஒவ்வொரு பகுதியும் பூச்சியமல்ல என்பதைச் சரிபார்.',
      ],
      '6.2': [
        'Draw a horizontal from the observer and mark the angle above it. Identify the height difference and horizontal distance.',
        'பார்ப்பவரிடமிருந்து கிடைமட்டக் கோடு வரை. அதற்கு மேலுள்ள ஏற்றக் கோணத்தைக் குறி. உயர வேறுபாட்டையும் கிடைமட்டத் தொலைவையும் காண்.',
      ],
      '6.3': [
        'Draw the horizontal through the observer. Use parallel horizontals to transfer the angle of depression into the right triangle.',
        'பார்ப்பவரின் வழியே கிடைமட்டக் கோடு வரை. இணையான கிடைமட்டக் கோடுகளைப் பயன்படுத்தி இறக்கக் கோணத்தைச் செங்கோண முக்கோணத்தில் குறி.',
      ],
      '6.4': [
        'Draw a right triangle for each line of sight. Find the horizontal distance shared by the triangles before combining heights.',
        'ஒவ்வொரு பார்வைக் கோட்டுக்கும் செங்கோண முக்கோணம் வரை. உயரங்களை இணைப்பதற்கு முன் அவற்றுக்குப் பொதுவான கிடைமட்டத் தொலைவைக் காண்.',
      ],
      '6.5': [
        'For a ratio expression, simplify with identities and check its domain. For a sight-line problem, draw the right triangle first.',
        'விகிதக் கோவையை முற்றொருமைகளால் சுருக்கி அதன் சார்பகத்தைச் சரிபார். பார்வைக் கோட்டு வினாவுக்குச் செங்கோண முக்கோணத்தை முதலில் வரை.',
      ],
      '6.unit': [
        'Choose between an identity and a right-triangle model. Label the angle and the available side lengths before using a ratio.',
        'முற்றொருமையா செங்கோண முக்கோண அமைப்பா பொருந்தும் எனத் தேர்ந்தெடு. விகிதத்தைப் பயன்படுத்தும்முன் கோணத்தையும் தெரிந்த பக்க நீளங்களையும் குறி.',
      ],
      '7.1': [
        'Identify whether the given measure is radius, diameter, height or slant height. Count only surfaces exposed in the problem.',
        'கொடுக்கப்பட்ட அளவு ஆரமா, விட்டமா, உயரமா, சாயுயரமா எனக் காண். வினாவில் வெளிப்படும் பரப்புகளை மட்டும் கணக்கில் எடு.',
      ],
      '7.2': [
        'Write dimensions in common units. If material or water moves between shapes, identify the equal volumes.',
        'பரிமாணங்களை ஒரே அலகில் எழுது. பொருள் அல்லது நீர் ஒரு வடிவத்திலிருந்து மற்றொன்றுக்கு மாறினால் சமமான கனஅளவுகளைக் கண்டறி.',
      ],
      '7.3': [
        'Split the composite object into familiar solids. Add volumes or subtract removed parts, and exclude joined faces from surface area.',
        'கூட்டு வடிவத்தைத் தெரிந்த திண்மங்களாகப் பிரி. கனஅளவுகளைச் சேர் அல்லது நீக்கப்பட்ட பகுதிகளைக் கழி. புறப்பரப்பில் இணைக்கப்பட்ட முகங்களைச் சேர்க்காதே.',
      ],
      '7.4': [
        'Keep volume unchanged when material is remoulded. For flow, use the cross-sectional area and the distance travelled in the given time.',
        'பொருள் உருமாற்றம் அடையும்போது கனஅளவு மாறாது. பாய்வில் குறுக்கு வெட்டுப் பரப்பையும் கொடுக்கப்பட்ட நேரத்தில் கடக்கும் தொலைவையும் பயன்படுத்து.',
      ],
      '7.5': [
        'Work out which dimensions and surfaces the question uses. A slant height, an ordinary height and a radius can form a right triangle.',
        'வினாவுக்குத் தேவையான பரிமாணங்களையும் பரப்புகளையும் காண். சாயுயரம், செங்குத்து உயரம், ஆரம் ஆகியவை செங்கோண முக்கோணத்தை உருவாக்கலாம்.',
      ],
      '7.unit': [
        'Draw the object and convert dimensions to common units. Work out whether to conserve volume or count exposed surfaces.',
        'வடிவத்தை வரைந்து பரிமாணங்களை ஒரே அலகுக்கு மாற்று. கனஅளவு மாறாமையைப் பயன்படுத்த வேண்டுமா, வெளிப்படும் பரப்புகளைக் கணக்கிட வேண்டுமா எனத் தீர்மானி.',
      ],
      '8.1': [
        'Use the smallest and largest values for range. For standard deviation, use distances from the mean or an equivalent table method.',
        'வீச்சைக் காண மிகச் சிறிய, மிகப் பெரிய மதிப்புகளைப் பயன்படுத்து. திட்ட விலக்கத்துக்குச் சராசரியிலிருந்து விலக்கங்களையோ அதற்கு இணையான அட்டவணை முறையையோ பயன்படுத்து.',
      ],
      '8.2': [
        'The coefficient of variation compares standard deviation with the mean as a percentage. Use the same units for those two quantities.',
        'மாறுபாட்டுக் கெழு திட்ட விலக்கத்தைச் சராசரியுடன் சதவீதமாக ஒப்பிடுகிறது. இரு அளவுகளையும் ஒரே அலகில் எழுது.',
      ],
      '8.3': [
        'Write the sample space systematically. In a selection problem decide whether order matters before counting.',
        'கூறுவெளியை முறையாக எழுது. தேர்ந்தெடுக்கும் வினாவில் எண்ணுவதற்கு முன் வரிசை முக்கியமா எனத் தீர்மானி.',
      ],
      '8.4': [
        'Mark each event and its overlap on a Venn diagram. Check whether the question asks for a union, intersection or complement.',
        'நிகழ்ச்சிகளையும் அவற்றின் பொதுப்பகுதியையும் வென் படத்தில் குறி. வினா சேர்ப்பு, வெட்டு அல்லது நிரப்பு இவற்றில் எதைக் கேட்கிறது எனக் கவனி.',
      ],
      '8.5': [
        'Choose the relevant statistic or event rule first. For probability options, check the bounds and whether any overlap was counted twice.',
        'முதலில் பொருந்தும் புள்ளியியல் அளவை அல்லது நிகழ்ச்சி விதியைத் தேர்ந்தெடு. நிகழ்தகவுத் தெரிவுகளில் எல்லைகளையும் பொதுப்பகுதி இருமுறை எண்ணப்பட்டதா என்பதையும் சரிபார்.',
      ],
      '8.unit': [
        'For a frequency table, check the total frequency and the values or class midpoints. For probability, write the event in terms of the sample space.',
        'நிகழ்வெண் அட்டவணையில் மொத்த நிகழ்வெண்ணையும் மதிப்புகளையோ வகுப்பு நடுமதிப்புகளையோ சரிபார். நிகழ்தகவுக்கு கூறுவெளியைப் பயன்படுத்தி நிகழ்ச்சியை எழுது.',
      ],
    },
  };

  window.TriggleExerciseHints = {
    forExercise(grade, exercise) {
      const hint = hints[grade]?.[exercise];
      return hint ? {en: hint[0], ta: hint[1]} : undefined;
    },
  };
})();
