(() => {
  'use strict';

  const SUPPLEMENTS = {
    // AUD08-02. TN 2025: method EN p. 312 / TA pp. 320–321; exercises EN pp. 313–314 / TA p. 323.
    // The keys (EN p. 342 / TA p. 357) round the four deviations to different precisions.
    'c10-8-ex8-1-q10': {
      title: { en: 'Step-deviation method', ta: 'படி விலக்க முறை' },
      note: {
        en: 'Take 55 mm as the assumed mean A. Rainfall values rise in steps of c = 5 mm. Divide each difference from 55 by 5 to get dᵢ. Multiply dᵢ and its square by the number of places fᵢ. The standard deviation is in millimetres.',
        ta: 'ஊகச் சராசரி A = 55 மி.மீ. அடுத்தடுத்த மழையளவுகளின் வேறுபாடு c = 5 மி.மீ. ஒவ்வொரு மழையளவிலிருந்தும் 55-ஐக் கழித்து 5-ஆல் வகுத்தால் dᵢ கிடைக்கும். dᵢ மற்றும் அதன் வர்க்கத்தை இடங்களின் எண்ணிக்கை fᵢ ஆல் தனித்தனியே பெருக்குக. திட்ட விலக்கத்தின் அலகு மி.மீ.'
      },
      table: {
        headers: ['Rainfall xᵢ (mm)', 'Places fᵢ', 'dᵢ = (xᵢ − 55)/5', 'fᵢdᵢ', 'fᵢdᵢ²'],
        headersTa: ['மழையளவு xᵢ (மி.மீ.)', 'இடங்களின் எண்ணிக்கை fᵢ', 'dᵢ = (xᵢ − 55)/5', 'fᵢdᵢ', 'fᵢdᵢ²'],
        rows: [
          ['45', '5', '−2', '−10', '20'],
          ['50', '13', '−1', '−13', '13'],
          ['55', '4', '0', '0', '0'],
          ['60', '9', '1', '9', '9'],
          ['65', '5', '2', '10', '20'],
          ['70', '4', '3', '12', '36']
        ],
        footer: ['Total', '40', '—', '8', '98'],
        footerTa: ['மொத்தம்', '40', '—', '8', '98']
      },
      latex: '\\begin{aligned}\\sigma &= c\\sqrt{\\frac{\\sum f_i d_i^2}{N}-\\left(\\frac{\\sum f_i d_i}{N}\\right)^2}\\\\ &=5\\sqrt{\\frac{98}{40}-\\left(\\frac{8}{40}\\right)^2}\\\\ &=\\frac{\\sqrt{241}}{2}\\approx 7.76\\end{aligned}'
    },
    'c10-8-ex8-1-q11': {
      title: { en: 'Step-deviation method', ta: 'படி விலக்க முறை' },
      note: {
        en: 'Use the midpoint xᵢ of each age interval, so 0–10 is represented by 5 years. Take A = 35 years and c = 10 years. The 65 people are the full group, so divide both column sums by 65. The standard deviation is in years.',
        ta: 'ஒவ்வொரு வயது இடைவெளிக்கும் அதன் மைய மதிப்பு xᵢ-ஐப் பயன்படுத்துக. 0–10 வயது இடைவெளியின் மையம் 5 ஆண்டுகள். ஊகச் சராசரி A = 35 ஆண்டுகள், இடைவெளியின் அகலம் c = 10 ஆண்டுகள். மொத்தம் 65 பேர் என்பதால் இரு நெடுவரிசைகளின் கூட்டுத்தொகைகளையும் 65-ஆல் வகுக்கிறோம். திட்ட விலக்கத்தின் அலகு ஆண்டு.'
      },
      table: {
        headers: ['Age (years)', 'Midpoint xᵢ', 'People affected fᵢ', 'dᵢ = (xᵢ − 35)/10', 'fᵢdᵢ', 'fᵢdᵢ²'],
        headersTa: ['வயது (ஆண்டுகள்)', 'மைய மதிப்பு xᵢ', 'பாதிக்கப்பட்டோர் எண்ணிக்கை fᵢ', 'dᵢ = (xᵢ − 35)/10', 'fᵢdᵢ', 'fᵢdᵢ²'],
        rows: [
          ['0–10', '5', '3', '−3', '−9', '27'],
          ['10–20', '15', '5', '−2', '−10', '20'],
          ['20–30', '25', '16', '−1', '−16', '16'],
          ['30–40', '35', '18', '0', '0', '0'],
          ['40–50', '45', '12', '1', '12', '12'],
          ['50–60', '55', '7', '2', '14', '28'],
          ['60–70', '65', '4', '3', '12', '36']
        ],
        footer: ['Total', '—', '65', '—', '3', '139'],
        footerTa: ['மொத்தம்', '—', '65', '—', '3', '139']
      },
      latex: '\\begin{aligned}\\sigma &= c\\sqrt{\\frac{\\sum f_i d_i^2}{N}-\\left(\\frac{\\sum f_i d_i}{N}\\right)^2}\\\\ &=10\\sqrt{\\frac{139}{65}-\\left(\\frac{3}{65}\\right)^2}\\\\ &=\\frac{\\sqrt{36104}}{13}\\approx 14.6\\end{aligned}'
    },
    'c10-8-ex8-1-q12': {
      title: { en: 'Step deviation with inclusive intervals', ta: 'உள்ளடக்கிய இடைவெளிகளுக்கான படி விலக்க முறை' },
      note: {
        en: 'For the 21–24 cm interval, the continuous boundaries are 20.5 and 24.5 cm. Its midpoint is 22.5 cm and its width is 4 cm. Use the same width for each interval and take A = 30.5 cm. Round only at the end, to the nearest centimetre.',
        ta: '21–24 செ.மீ. இடைவெளியின் தொடர் எல்லைகள் 20.5 மற்றும் 24.5 செ.மீ. எனவே அதன் மைய மதிப்பு 22.5 செ.மீ., அகலம் 4 செ.மீ. எல்லா இடைவெளிகளுக்கும் இதே அகலத்தைப் பயன்படுத்தி, ஊகச் சராசரி A = 30.5 செ.மீ. எனக் கொள்க. இறுதியில் அருகிலுள்ள முழு செ.மீ.க்கு விடையை முழுமையாக்குக.'
      },
      table: {
        headers: ['Diameter (cm)', 'Midpoint xᵢ', 'Plates fᵢ', 'dᵢ = (xᵢ − 30.5)/4', 'fᵢdᵢ', 'fᵢdᵢ²'],
        headersTa: ['விட்டம் (செ.மீ.)', 'மைய மதிப்பு xᵢ', 'தட்டுகளின் எண்ணிக்கை fᵢ', 'dᵢ = (xᵢ − 30.5)/4', 'fᵢdᵢ', 'fᵢdᵢ²'],
        rows: [
          ['21–24', '22.5', '15', '−2', '−30', '60'],
          ['25–28', '26.5', '18', '−1', '−18', '18'],
          ['29–32', '30.5', '20', '0', '0', '0'],
          ['33–36', '34.5', '16', '1', '16', '16'],
          ['37–40', '38.5', '8', '2', '16', '32'],
          ['41–44', '42.5', '7', '3', '21', '63']
        ],
        footer: ['Total', '—', '84', '—', '5', '189'],
        footerTa: ['மொத்தம்', '—', '84', '—', '5', '189']
      },
      latex: '\\begin{aligned}\\sigma &= c\\sqrt{\\frac{\\sum f_i d_i^2}{N}-\\left(\\frac{\\sum f_i d_i}{N}\\right)^2}\\\\ &=4\\sqrt{\\frac{189}{84}-\\left(\\frac{5}{84}\\right)^2}\\\\ &=\\frac{\\sqrt{15851}}{21}\\approx 6\\end{aligned}'
    },
    'c10-8-ex8-1-q13': {
      title: { en: 'Step-deviation method', ta: 'படி விலக்க முறை' },
      note: {
        en: 'The first time interval, 8.5–9.5 seconds, has midpoint 9 seconds. Use A = 11 seconds and interval width c = 1 second. Here dᵢ = xᵢ − 11. The frequency column counts all 50 students. The standard deviation is in seconds.',
        ta: 'முதல் நேர இடைவெளி 8.5–9.5 வினாடிகள். அதன் மைய மதிப்பு 9 வினாடிகள். ஊகச் சராசரி A = 11 வினாடிகள், இடைவெளியின் அகலம் c = 1 வினாடி. எனவே dᵢ = xᵢ − 11. நிகழ்வெண்களின் கூட்டுத்தொகை 50 மாணவர்கள். திட்ட விலக்கத்தின் அலகு வினாடி.'
      },
      table: {
        headers: ['Time (s)', 'Midpoint xᵢ', 'Students fᵢ', 'dᵢ = xᵢ − 11', 'fᵢdᵢ', 'fᵢdᵢ²'],
        headersTa: ['நேரம் (வினாடி)', 'மைய மதிப்பு xᵢ', 'மாணவர்களின் எண்ணிக்கை fᵢ', 'dᵢ = xᵢ − 11', 'fᵢdᵢ', 'fᵢdᵢ²'],
        rows: [
          ['8.5–9.5', '9', '6', '−2', '−12', '24'],
          ['9.5–10.5', '10', '8', '−1', '−8', '8'],
          ['10.5–11.5', '11', '17', '0', '0', '0'],
          ['11.5–12.5', '12', '10', '1', '10', '10'],
          ['12.5–13.5', '13', '9', '2', '18', '36']
        ],
        footer: ['Total', '—', '50', '—', '8', '78'],
        footerTa: ['மொத்தம்', '—', '50', '—', '8', '78']
      },
      latex: '\\begin{aligned}\\sigma &= c\\sqrt{\\frac{\\sum f_i d_i^2}{N}-\\left(\\frac{\\sum f_i d_i}{N}\\right)^2}\\\\ &=\\sqrt{\\frac{78}{50}-\\left(\\frac{8}{50}\\right)^2}\\\\ &=\\frac{\\sqrt{959}}{25}\\approx 1.24\\end{aligned}'
    },

    // AUD15-01 and AUD15-02: nine Grade 9 distributions and their textbook methods.
    'g9-ch8-ex8.1-q4': {
      title: { en: 'Mean tumour volume', ta: 'கட்டிகளின் சராசரி கனஅளவு' },
      note: {
        en: 'Each mouse contributes one measurement. Add the six volumes, then divide by 6. The answer is in cubic millimetres.',
        ta: 'ஒவ்வொரு எலிக்கும் ஒரு கனஅளவு கொடுக்கப்பட்டுள்ளது. ஆறு அளவுகளின் கூடுதலை 6 ஆல் வகுத்தால் சராசரி கனஅளவு கிடைக்கும்.'
      },
      table: {
        headers: ['Mouse number', 'Tumour volume (mm³)'],
        headersTa: ['எலி எண்', 'கட்டியின் கனஅளவு (மி.மீ³)'],
        rows: [['1', '145'], ['2', '148'], ['3', '142'], ['4', '141'], ['5', '139'], ['6', '140']],
        footer: ['Total volume', '855'],
        footerTa: ['மொத்தக் கனஅளவு', '855']
      },
      latex: '\\bar X=\\dfrac{145+148+142+141+139+140}{6}=\\dfrac{855}{6}=142.5\\,\\mathrm{mm}^3'
    },
    'g9-ch8-ex8.1-q5': {
      title: { en: 'Find the missing frequency', ta: 'விடுபட்ட நிகழ்வெண்ணைக் காண்க' },
      note: {
        en: 'The unknown p counts the students who scored 20 marks. Their contribution to the total marks is 20p. Divide total marks by total students and use the given mean of 20.2.',
        ta: '20 மதிப்பெண் பெற்ற மாணவர்களின் எண்ணிக்கை p. அவர்களின் மொத்த மதிப்பெண் 20p. மொத்த மதிப்பெண்ணை மாணவர்களின் மொத்த எண்ணிக்கையால் வகுத்தால் கொடுக்கப்பட்ட சராசரி 20.2 கிடைக்கும்.'
      },
      table: {
        headers: ['Marks x', 'Students f', 'Total marks fx'],
        headersTa: ['மதிப்பெண் x', 'மாணவர்கள் f', 'மொத்த மதிப்பெண் fx'],
        rows: [['10', '6', '60'], ['15', '8', '120'], ['20', 'p', '20p'], ['25', '10', '250'], ['30', '6', '180']],
        footer: ['Total', '30 + p', '610 + 20p'],
        footerTa: ['மொத்தம்', '30 + p', '610 + 20p']
      },
      latex: '\\begin{aligned}\\dfrac{610+20p}{30+p}&=20.2\\\\610+20p&=606+20.2p\\\\4&=0.2p\\\\p&=20\\end{aligned}'
    },
    'g9-ch8-ex8.1-q6': {
      title: { en: 'Mean weight by the direct method', ta: 'நேரடி முறையில் சராசரி எடை' },
      note: {
        en: 'Represent each group by its midpoint x. For example, the midpoint of 15–25 is 20 kg. Multiply each midpoint by its frequency f, add the products, and divide by the number of students.',
        ta: 'ஒவ்வொரு பிரிவிற்கும் அதன் மைய மதிப்பு x ஐப் பயன்படுத்துக. 15–25 பிரிவின் மைய மதிப்பு 20 கி.கி. ஒவ்வொரு மைய மதிப்பையும் அதன் நிகழ்வெண் f ஆல் பெருக்கி, பெருக்கற்பலன்களின் கூடுதலை மொத்த மாணவர் எண்ணிக்கையால் வகுக்க.'
      },
      table: {
        headers: ['Weight (kg)', 'Midpoint x', 'Students f', 'fx'],
        headersTa: ['எடை (கி.கி)', 'மைய மதிப்பு x', 'மாணவர்கள் f', 'fx'],
        rows: [['15–25', '20', '4', '80'], ['25–35', '30', '11', '330'], ['35–45', '40', '19', '760'], ['45–55', '50', '14', '700'], ['55–65', '60', '0', '0'], ['65–75', '70', '2', '140']],
        footer: ['Total', '—', '50', '2010'],
        footerTa: ['மொத்தம்', '—', '50', '2010']
      },
      latex: '\\bar X=\\dfrac{\\sum fx}{\\sum f}=\\dfrac{2010}{50}=40.2\\,\\mathrm{kg}'
    },
    'g9-ch8-ex8.1-q7': {
      title: { en: 'Find the mean using an assumed mean', ta: 'ஊகச் சராசரி முறையில் சராசரி' },
      note: {
        en: 'Choose A = 25. The deviation d = x − A measures how far each midpoint x lies above or below 25. Add the weighted average deviation to 25.',
        ta: 'ஊகச் சராசரியாக A = 25 எனத் தேர்ந்தெடுக்க. ஒவ்வொரு மைய மதிப்பு x உம் 25 இலிருந்து எவ்வளவு விலகியுள்ளது என்பதை d = x − A காட்டுகிறது. விலக்கங்களின் எடையிட்ட சராசரியை 25 உடன் கூட்டுக.'
      },
      table: {
        headers: ['Class interval', 'Midpoint x', 'Frequency f', 'd = x − 25', 'fd'],
        headersTa: ['பிரிவு இடைவெளி', 'மைய மதிப்பு x', 'நிகழ்வெண் f', 'd = x − 25', 'fd'],
        rows: [['0–10', '5', '5', '−20', '−100'], ['10–20', '15', '7', '−10', '−70'], ['20–30', '25', '15', '0', '0'], ['30–40', '35', '28', '10', '280'], ['40–50', '45', '8', '20', '160']],
        footer: ['Total', '—', '63', '—', '270'],
        footerTa: ['மொத்தம்', '—', '63', '—', '270']
      },
      latex: '\\bar X=A+\\dfrac{\\sum fd}{\\sum f}=25+\\dfrac{270}{63}=\\dfrac{205}{7}\\approx29.29'
    },
    'g9-ch8-ex8.1-q8': {
      title: { en: 'Mean age by the step-deviation method', ta: 'படிவிலக்க முறையில் சராசரி வயது' },
      note: {
        en: 'The gap between 19 and 20 has midpoint 19.5. Subtract 0.5 from each lower limit and add 0.5 to each upper limit to obtain touching class boundaries. Each class is c = 5 years wide. Choose A = 27 years and count steps of 5 from it.',
        ta: '19 மற்றும் 20 இன் நடுப்புள்ளி 19.5. ஒவ்வொரு கீழ் வரம்பிலிருந்தும் 0.5 ஐக் கழித்து, மேல் வரம்புடன் 0.5 ஐக் கூட்டினால் இடைவெளியற்ற பிரிவு எல்லைகள் கிடைக்கும். ஒவ்வொரு பிரிவின் அகலம் c = 5 ஆண்டுகள். ஊகச் சராசரி A = 27 ஆண்டுகள் எனக் கொண்டு, அதிலிருந்து ஒவ்வொரு மைய மதிப்பும் எத்தனை ஐந்தாண்டுப் படிகள் விலகியுள்ளது எனக் காண்க.'
      },
      table: {
        headers: ['Age (years)', 'Boundaries', 'Midpoint x', 'People f', 'd = (x − 27)/5', 'fd'],
        headersTa: ['வயது (ஆண்டுகள்)', 'பிரிவு எல்லைகள்', 'மைய மதிப்பு x', 'நபர்கள் f', 'd = (x − 27)/5', 'fd'],
        rows: [['15–19', '14.5–19.5', '17', '4', '−2', '−8'], ['20–24', '19.5–24.5', '22', '20', '−1', '−20'], ['25–29', '24.5–29.5', '27', '38', '0', '0'], ['30–34', '29.5–34.5', '32', '24', '1', '24'], ['35–39', '34.5–39.5', '37', '10', '2', '20'], ['40–44', '39.5–44.5', '42', '9', '3', '27']],
        footer: ['Total', '—', '—', '105', '—', '43'],
        footerTa: ['மொத்தம்', '—', '—', '105', '—', '43']
      },
      latex: '\\bar X=A+c\\dfrac{\\sum fd}{\\sum f}=27+5\\left(\\dfrac{43}{105}\\right)=\\dfrac{610}{21}\\approx29.05'
    },
    'g9-ch8-ex8.2-q5': {
      title: { en: 'Locate the median class', ta: 'இடைநிலை அளவுப் பிரிவைக் காண்க' },
      note: {
        en: 'Cumulative frequency is the running total. The 25th observation lies in 30–40 because 24 < 25 ≤ 34. Its lower boundary is l = 30, the preceding cumulative frequency is m = 24, its frequency is f = 10, and its width is c = 10. The estimated median is 31 marks.',
        ta: 'குவிவு நிகழ்வெண் என்பது படிப்படியாகக் கூட்டிய மொத்தம். 24 < 25 ≤ 34 என்பதால் 25 ஆம் மதிப்பு 30–40 பிரிவில் உள்ளது. அதன் கீழ் எல்லை l = 30, முந்தைய பிரிவின் குவிவு நிகழ்வெண் m = 24, இடைநிலைப் பிரிவின் நிகழ்வெண் f = 10, அகலம் c = 10. இடைநிலை அளவு 31 மதிப்பெண்கள்.'
      },
      table: {
        headers: ['Marks', 'Number of students', 'Cumulative frequency'],
        headersTa: ['மதிப்பெண்கள்', 'மாணவர்களின் எண்ணிக்கை', 'குவிவு நிகழ்வெண்'],
        rows: [['0–10', '2', '2'], ['10–20', '7', '9'], ['20–30', '15', '24'], ['30–40', '10', '34'], ['40–50', '11', '45'], ['50–60', '5', '50']],
        footer: ['Total', '50', '—'],
        footerTa: ['மொத்தம்', '50', '—']
      },
      latex: '\\ell+\\dfrac{N/2-m}{f}\\,c=30+\\dfrac{25-24}{10}\\times10=31'
    },
    'g9-ch8-ex8.3-q4': {
      title: { en: 'Which tracksuit size is in greatest demand?', ta: 'எந்த அளவு விளையாட்டு உடைக்கு அதிகத் தேவை?' },
      note: {
        en: 'Read down the number of people. The greatest count is 37, in the row for size 40. The mode is the size, so the answer is size 40.',
        ta: 'நபர்களின் எண்ணிக்கையில் மிகப்பெரிய மதிப்பு 37. இது அளவு 40 க்குரியது. எனவே அதிகமானோர் விரும்பிய உடையின் அளவு, அதாவது முகடு, 40.'
      },
      table: {
        headers: ['Tracksuit size', 'Number of people'],
        headersTa: ['விளையாட்டு உடையின் அளவு', 'நபர்களின் எண்ணிக்கை'],
        rows: [['38', '36'], ['39', '15'], ['40', '37'], ['41', '13'], ['42', '26'], ['43', '8'], ['44', '6'], ['45', '2']]
      }
    },
    'g9-ch8-ex8.3-q5': {
      title: { en: 'Estimate the modal mark', ta: 'மதிப்பெண்களின் முகடு' },
      note: {
        en: 'The highest frequency is 46, so 20–30 is the modal class. In textbook notation f = 46 is its frequency, f₁ = 38 precedes it, and f₂ = 34 follows it. Its lower boundary is l = 20 and its width is c = 10. The estimated mode is 24 marks.',
        ta: 'மிக அதிக நிகழ்வெண் 46 என்பதால் 20–30 என்பது முகட்டுப் பிரிவு. பாடநூல் குறியீட்டில் இப்பிரிவின் நிகழ்வெண் f = 46, முந்தைய பிரிவின் நிகழ்வெண் f₁ = 38, அடுத்த பிரிவின் நிகழ்வெண் f₂ = 34. கீழ் எல்லை l = 20, பிரிவின் அகலம் c = 10. முகடு 24 மதிப்பெண்கள்.'
      },
      table: {
        headers: ['Marks', 'Number of students'],
        headersTa: ['மதிப்பெண்கள்', 'மாணவர்களின் எண்ணிக்கை'],
        rows: [['0–10', '22'], ['10–20', '38'], ['20–30', '46'], ['30–40', '34'], ['40–50', '20']]
      },
      latex: '\\ell+\\dfrac{f-f_1}{2f-f_1-f_2}\\,c=20+\\dfrac{46-38}{92-38-34}\\times10=24'
    },
    'g9-ch8-ex8.3-q6': {
      title: { en: 'Estimate the modal weight', ta: 'எடைகளின் முகடு' },
      note: {
        en: 'Use continuous boundaries for weights recorded in whole kilograms. The highest count, 14, is in 55–64 kg, with boundaries 54.5 and 64.5. Thus l = 54.5, c = 10, f = 14, f₁ = 10 and f₂ = 8. The estimated mode is 58.5 kg.',
        ta: 'முழுக் கிலோகிராமில் கொடுக்கப்பட்ட எடைகளுக்குத் தொடர் பிரிவு எல்லைகளைப் பயன்படுத்துக. மிக அதிக நிகழ்வெண் 14 என்பது 55–64 கி.கி பிரிவிற்குரியது. அதன் எல்லைகள் 54.5, 64.5. எனவே l = 54.5, c = 10, f = 14, f₁ = 10, f₂ = 8. முகடு 58.5 கி.கி.'
      },
      table: {
        headers: ['Weight (kg)', 'Continuous boundaries (kg)', 'Number of students'],
        headersTa: ['எடை (கி.கி)', 'தொடர் பிரிவு எல்லைகள் (கி.கி)', 'மாணவர்களின் எண்ணிக்கை'],
        rows: [['25–34', '24.5–34.5', '4'], ['35–44', '34.5–44.5', '8'], ['45–54', '44.5–54.5', '10'], ['55–64', '54.5–64.5', '14'], ['65–74', '64.5–74.5', '8'], ['75–84', '74.5–84.5', '6']]
      },
      latex: '\\ell+\\dfrac{f-f_1}{2f-f_1-f_2}\\,c=54.5+\\dfrac{14-10}{28-10-8}\\times10=58.5\\,\\mathrm{kg}'
    },

    // AUD20-01: Grade 9 Exercise 2.9. The 2025 EN/TA page images and answer
    // appendices agree on Q8: option 2 has the bar; option 4 has none.
    'g9-ch2-ex9-q18': {
      title: { en: 'Combine equal powers first', ta: 'சம அடுக்குகளை முதலில் இணைப்போம்' },
      note: {
        en: 'Both positive factors have the same exponent. Multiply the bases first, then multiply the exponents. The result is option (4).',
        ta: 'இரு மிகை எண்களுக்கும் அடுக்கு ஒன்றே. முதலில் அடிமானங்களைப் பெருக்கி, பின்னர் அடுக்குகளைப் பெருக்குவோம். விடை (4).'
      },
      latex: '\\begin{aligned}a^m b^m&=(ab)^m\\\\(0.000729\\times0.09)^{-3/4}&=\\left[\\left(\\tfrac3{10}\\right)^6\\left(\\tfrac3{10}\\right)^2\\right]^{-3/4}\\\\&=\\left[\\left(\\tfrac3{10}\\right)^8\\right]^{-3/4}\\\\&=\\left(\\tfrac3{10}\\right)^{-6}=\\dfrac{10^6}{3^6}\\end{aligned}'
    },
    'g9-ch2-ex9-q8': {
      title: { en: 'Which digits repeat?', ta: 'எந்த இலக்கங்கள் மீண்டும் வருகின்றன?' },
      note: {
        en: 'The bar in option (2) covers all six digits. They repeat forever. Option (4) ends after six decimal places.',
        ta: 'விடை (2)-இல் மேல்கோடு ஆறு இலக்கங்களின் மீதும் உள்ளது. அந்த ஆறு இலக்கங்களும் தொடர்ந்து மீண்டும் வருகின்றன. விடை (4)-இல் ஆறாவது தசம இடத்துடன் எண் முடிகிறது.'
      },
      latex: '\\begin{aligned}\\dfrac57&=5\\times0.\\overline{142857}\\\\&=0.714285714285\\ldots\\\\&=0.\\overline{714285}\\end{aligned}'
    },
    'g9-ch2-ex9-q10': {
      title: { en: 'Check the repeating sum', ta: 'சுழல் தசமங்களின் கூட்டலைச் சரிபார்ப்போம்' },
      note: {
        en: 'Align the decimal points. In the sum the first 6 occurs once, then 87 repeats. Converting to fractions gives the same result, option (1).',
        ta: 'தசமப் புள்ளிகளை ஒரே நேர்க்கோட்டில் வைத்துக் கூட்டுவோம். விடையில் முதல் இலக்கம் 6 ஒரு முறை வருகிறது. அதன்பின் 87 மீண்டும் மீண்டும் வருகிறது. பின்னங்களாக மாற்றிக் கூட்டினாலும் விடை (1) கிடைக்கும்.'
      },
      latex: '\\begin{aligned}&0.343434\\ldots\\\\+{}&0.344444\\ldots\\\\={}&0.687878\\ldots\\\\\\dfrac{34}{99}+\\dfrac{31}{90}&=\\dfrac{340+341}{990}\\\\&=\\dfrac{681}{990}=0.6\\overline{87}\\end{aligned}'
    },

    // AUD20-02: The 2025 answer appendices (EN PDF 314, TA PDF 330) give
    // sample answers; the prompts allow other numbers within the intervals.
    'g9-ch2-ex1-q3-i': {
      title: { en: 'Five rational numbers using midpoints', ta: 'நடுப்புள்ளிகளைக் கொண்டு ஐந்து விகிதமுறு எண்கள்' },
      note: {
        en: 'Start halfway between the two bounds. Then take the midpoint of each new number and the upper bound, one quarter. Each result stays strictly inside the interval.',
        ta: 'முதலில் இரு எல்லைகளின் சராசரியைக் காண்போம். பின்னர் கிடைக்கும் ஒவ்வோர் எண்ணுக்கும் மேல் எல்லையான கால் பங்குக்கும் இடையிலான சராசரியைக் காண்போம். கிடைக்கும் எண்கள் அனைத்தும் இரு எல்லைகளுக்கும் இடையில் உள்ளன.'
      },
      latex: '\\begin{aligned}q_1&=\\tfrac12\\left(\\tfrac15+\\tfrac14\\right)=\\dfrac9{40}\\\\q_2&=\\tfrac12\\left(\\tfrac9{40}+\\tfrac14\\right)=\\dfrac{19}{80}\\\\q_3&=\\dfrac{39}{160},\\quad q_4=\\dfrac{79}{320}\\\\q_5&=\\dfrac{159}{640}\\end{aligned}'
    },
    'g9-ch2-ex1-q3-iii': {
      title: { en: 'Five rational numbers using midpoints', ta: 'நடுப்புள்ளிகளைக் கொண்டு ஐந்து விகிதமுறு எண்கள்' },
      note: {
        en: 'Start halfway between −2 and −1. Repeatedly take the midpoint of the new number and −1. Each fraction is greater than −2 and less than −1.',
        ta: 'முதலில் −2 மற்றும் −1 இன் சராசரியைக் காண்போம். பின்னர் கிடைக்கும் ஒவ்வோர் எண்ணுக்கும் −1 க்கும் இடையிலான சராசரியைக் காண்போம். ஒவ்வொரு பின்னமும் −2 ஐ விடப் பெரியது, −1 ஐ விடச் சிறியது.'
      },
      latex: '\\begin{aligned}q_1&=\\dfrac{-2+(-1)}{2}=-\\dfrac32\\\\q_2&=\\tfrac12\\left(-\\tfrac32-1\\right)=-\\dfrac54\\\\q_3&=-\\dfrac98,\\quad q_4=-\\dfrac{17}{16}\\\\q_5&=-\\dfrac{33}{32}\\end{aligned}'
    },
    'g9-ch2-ex3-q2-ii': {
      title: { en: 'Two irrational decimals between the fractions', ta: 'இரு பின்னங்களுக்கு இடையிலான விகிதமுறா தசம எண்கள்' },
      note: {
        en: 'After the initial 8, write one 6 and one 1, then two 6s and two 1s, then three of each, and keep increasing. For the second number use 7 in place of 6. The growing blocks prevent a repeating period.',
        ta: 'தசமப் புள்ளிக்குப் பின் 8 ஐ எழுதி, ஒரு 6, ஒரு 1, பின்னர் இரண்டு 6, இரண்டு 1 என ஒவ்வொரு முறையும் எண்ணிக்கையை அதிகரிப்போம். இரண்டாவது எண்ணில் 6 க்குப் பதிலாக 7 ஐ எழுதுவோம். இலக்கக் குழுக்களின் நீளம் அதிகரிப்பதால் நிலையான சுழற்சி ஏற்படாது.'
      },
      latex: '\\begin{aligned}\\dfrac67=0.\\overline{857142}&<0.8616611666111\\ldots\\\\&<0.8717711777111\\ldots\\\\&<0.\\overline{923076}=\\dfrac{12}{13}\\end{aligned}'
    },
    'g9-ch2-ex3-q2-iii': {
      title: { en: 'Two irrational decimals between the square roots', ta: 'இரு வர்க்கமூலங்களுக்கு இடையிலான விகிதமுறா தசம எண்கள்' },
      note: {
        en: 'After the decimal point, write one 5 and one 1, then two 5s and two 1s, then three of each, and continue. Build the second decimal the same way with 6 and 1. The blocks keep growing, so neither decimal is periodic.',
        ta: 'தசமப் புள்ளிக்குப் பின் ஒரு 5, ஒரு 1, பின்னர் இரண்டு 5, இரண்டு 1 என எண்ணிக்கையை அதிகரித்துக்கொண்டே செல்வோம். இரண்டாவது எண்ணை 6, 1 ஆகியவற்றைக் கொண்டு அதே முறையில் எழுதுவோம். இலக்கக் குழுக்களின் நீளம் அதிகரிப்பதால் இரு எண்களிலும் நிலையான சுழற்சி ஏற்படாது.'
      },
      latex: '\\begin{aligned}\\sqrt2=1.4142\\ldots&<1.515511555\\ldots\\\\&<1.616611666\\ldots\\\\&<1.7320\\ldots=\\sqrt3\\end{aligned}'
    },
    'g9-ch2-ex3-q3': {
      title: { en: 'Two rational numbers inside the interval', ta: 'இரு எல்லைகளுக்கு இடையிலான விகிதமுறு எண்கள்' },
      note: {
        en: 'The answer key gives 2.2362 and 2.2363. Each is between the given bounds and terminates after four decimal places, so it can be written as an integer divided by 10,000.',
        ta: 'விடைப் பகுதியில் 2.2362, 2.2363 கொடுக்கப்பட்டுள்ளன. இவை இரண்டும் கொடுக்கப்பட்ட எல்லைகளுக்கு இடையில் உள்ளன. நான்கு தசம இடங்களுடன் முடிவதால் ஒவ்வொன்றையும் 10000 ஐப் பகுதியாகக் கொண்ட பின்னமாக எழுதலாம்.'
      },
      latex: '\\begin{aligned}2.2360679\\ldots&<2.2362<2.2363\\\\&<2.236505500\\ldots\\\\2.2362&=\\dfrac{22362}{10000}\\\\2.2363&=\\dfrac{22363}{10000}\\end{aligned}'
    }
  };

  window.TriggleP0Supplements = Object.freeze({
    get(id) {
      return SUPPLEMENTS[id] || null;
    },
    ids: Object.keys(SUPPLEMENTS)
  });
})();
