(() => {
  'use strict';

  const words = (en, ta) => ({en, ta});
  const read = (value, lang) => value[lang] || value.en;
  const opposite = words('Opposite', 'எதிர்ப்பக்கம்');
  const adjacent = words('Adjacent', 'அடுத்துள்ள பக்கம்');
  const hypotenuse = words('Hypotenuse', 'கர்ணம்');
  const undefinedValue = words('Undefined', 'வரையறுக்கப்படவில்லை');

  function rightTriangle(angle, lang) {
    const selectsA = angle === 'A';
    const horizontal = read(selectsA ? adjacent : opposite, lang);
    const vertical = read(selectsA ? opposite : adjacent, lang);
    const verticalLabel = lang === 'ta' && !selectsA
      ? '<tspan x="223">அடுத்துள்ள</tspan><tspan x="223" dy="17">பக்கம்</tspan>'
      : vertical;
    const hyp = read(hypotenuse, lang);
    const description = lang === 'ta'
      ? `B செங்கோணம். தேர்ந்தெடுத்த கோணம் ${angle}. AB = 12 (${horizontal}), BC = 5 (${vertical}), AC = 13 (${hyp}).`
      : `Right angle at B. Selected angle ${angle}. AB = 12 (${horizontal}), BC = 5 (${vertical}), AC = 13 (${hyp}).`;
    const marker = selectsA ? 'M60 132 A24 24 0 0 0 58 123' : 'M194 66 A23 23 0 0 0 216 80';
    return `<svg viewBox="0 0 340 174" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 132 H216 V57 Z" fill="#edf6ff" stroke="#23486e" stroke-width="2"/>
      <path d="M203 132 V119 H216 ${marker}" fill="none" stroke="#a44315" stroke-width="2"/>
      <circle cx="${selectsA ? 36 : 216}" cy="${selectsA ? 132 : 57}" r="4" fill="#a44315"/>
      <g font-size="14" fill="#153653">
        <text x="19" y="139">A</text>
        <text x="219" y="149">B</text>
        <text x="218" y="46">C</text>
        <text x="125" y="158" text-anchor="middle">${horizontal} · 12</text>
        <text x="223" y="82">${verticalLabel}</text>
        <text x="223" y="119">5</text>
        <text x="104" y="82" text-anchor="middle">${hyp} · 13</text>
      </g>
    </svg>`;
  }

  const trigOperators = ['\\sin', '\\cos', '\\tan', '\\operatorname{cosec}', '\\sec', '\\cot'];
  const exactValues = {
    0: ['0', '1', '0', null, '1', null],
    30: ['\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\dfrac{1}{\\sqrt{3}}', '2', '\\dfrac{2}{\\sqrt{3}}', '\\sqrt{3}'],
    45: ['\\dfrac{1}{\\sqrt{2}}', '\\dfrac{1}{\\sqrt{2}}', '1', '\\sqrt{2}', '\\sqrt{2}', '1'],
    60: ['\\dfrac{\\sqrt{3}}{2}', '\\dfrac{1}{2}', '\\sqrt{3}', '\\dfrac{2}{\\sqrt{3}}', '2', '\\dfrac{1}{\\sqrt{3}}'],
    90: ['1', '0', null, '1', null, '0']
  };

  function unitCircle(angle, lang) {
    const radius = 86;
    const radians = angle * Math.PI / 180;
    const x = Math.round(50 + radius * Math.cos(radians));
    const y = Math.round(117 - radius * Math.sin(radians));
    const description = lang === 'ta'
      ? `ஆரம் 1 அலகு கொண்ட வட்டத்தின் முதல் காற்பகுதி. தேர்ந்தெடுத்த கோணம் ${angle} பாகை. P புள்ளியின் x ஆயத்தொலைவு cos மதிப்பு, y ஆயத்தொலைவு sin மதிப்பு.`
      : `First quadrant of a circle of radius 1. The selected angle is ${angle} degrees. The x-coordinate of P gives cosine and the y-coordinate gives sine.`;
    return `<svg viewBox="0 0 178 145" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 117 L50 31 A86 86 0 0 1 136 117 Z" fill="#eef6ff" stroke="#286093" stroke-width="1.6"/>
      <path d="M50 117 H152 M50 117 V17" fill="none" stroke="#286093" stroke-width="1.6"/>
      <path d="M${x} ${y} V117" fill="none" stroke="#286093" stroke-width="1.6" stroke-dasharray="3 3"/>
      <path d="M50 117 L${x} ${y}" stroke="#a44315" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y}" r="3.5" fill="#a44315"/>
      <g fill="#153653" font-size="12">
        <text x="37" y="132">O</text><text x="155" y="121">x</text><text x="46" y="13">y</text>
        <text x="${x + 7}" y="${y - 5}">P</text><text x="110" y="136">${angle}°</text>
      </g>
    </svg>`;
  }

  function specialTriangle(angle, lang) {
    if (angle === 45) {
      const description = lang === 'ta'
        ? 'பக்க நீளம் 1 கொண்ட சதுரத்தின் மூலைவிட்டத்தின் நீளம் 2-இன் வர்க்கமூலம். அது சதுரத்தை இரு செங்கோண முக்கோணங்களாகப் பிரிக்கிறது. தேர்ந்தெடுத்த கோணம் 45 பாகை.'
        : 'The diagonal of a square of side 1 has length square root of 2. It splits the square into two right triangles. The selected angle is 45 degrees.';
      return `<svg viewBox="0 0 178 145" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">
        <path d="M39 23 H125 V109 H39 Z" fill="none" stroke="#286093" stroke-width="1.6"/>
        <path d="M39 109 H125 V23 Z" fill="#eef6ff" stroke="#286093" stroke-width="1.6"/>
        <path d="M114 109 V98 H125 M56 109 A17 17 0 0 0 51 97" fill="none" stroke="#a44315" stroke-width="2"/>
        <g fill="#153653" font-size="13">
          <text x="79" y="129">1</text><text x="135" y="71">1</text><text x="67" y="58">√2</text>
          <text x="59" y="100">45°</text>
        </g>
      </svg>`;
    }
    const description = lang === 'ta'
      ? `பக்க நீளம் 2 கொண்ட சமபக்க முக்கோணத்தை அதன் குத்துக்கோடு இரு செங்கோண முக்கோணங்களாகப் பிரிக்கிறது. ஒவ்வொன்றின் அடிப்பக்கம் 1, உயரம் 3-இன் வர்க்கமூலம், கர்ணம் 2. தேர்ந்தெடுத்த கோணம் ${angle} பாகை.`
      : `The altitude splits an equilateral triangle of side 2 into two right triangles. Each has base 1, height square root of 3, and hypotenuse 2. The selected angle is ${angle} degrees.`;
    const marker = angle === 30 ? 'M90 40 A19 19 0 0 0 100 38' : 'M139 139 A19 19 0 0 1 148.5 122.5';
    return `<svg viewBox="0 0 178 161" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 139 H158 L90 21.22 Z" fill="none" stroke="#286093" stroke-width="1.6"/>
      <path d="M90 21.22 V139 H158 Z" fill="#eef6ff" stroke="#286093" stroke-width="1.6"/>
      <path d="M90 130 H99 V139 ${marker}" fill="none" stroke="#a44315" stroke-width="2"/>
      <g fill="#153653" font-size="13">
        <text x="122" y="156">1</text><text x="69" y="90">√3</text><text x="132" y="76">2</text>
        <text x="${angle === 30 ? 92 : 119}" y="${angle === 30 ? 54 : 132}">${angle}°</text>
      </g>
    </svg>`;
  }

  function specialAngle(angle, result) {
    const values = exactValues[angle].map((value, i) => value && `${trigOperators[i]}${angle}^{\\circ}=${value}`);
    const lines = [values.slice(0, 2), values.slice(2, 4), values.slice(4)]
      .map(pair => pair.filter(Boolean).join('\\quad '))
      .filter(Boolean);
    return {
      label: words(`${angle}°`, `${angle}°`),
      result,
      math: '\\begin{gathered}' + lines.join('\\\\') + '\\end{gathered}',
      diagram: lang => angle === 0 || angle === 90 ? unitCircle(angle, lang) : specialTriangle(angle, lang)
    };
  }

  function complementTriangle(lang) {
    const description = lang === 'ta'
      ? 'B செங்கோணம். A-இல் α கோணம், C-இல் β கோணம். AB = 4, BC = 3, AC = 5.'
      : 'Right angle at B. Angle α is at A and angle β is at C. AB = 4, BC = 3, AC = 5.';
    return `<svg viewBox="0 0 240 196" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 165 H200 V39 Z" fill="#edf6ff" stroke="#23486e" stroke-width="2"/>
      <path d="M188 165 V153 H200 M56 165 A24 24 0 0 0 51 151 M182 52 A22 22 0 0 0 200 61" fill="none" stroke="#a44315" stroke-width="2"/>
      <g fill="#153653" font-size="15">
        <text x="16" y="177">A</text><text x="203" y="181">B</text><text x="204" y="37">C</text>
        <text x="62" y="155">α</text><text x="184" y="78">β</text>
        <text x="114" y="184">4</text><text x="210" y="105">3</text><text x="101" y="100">5</text>
      </g>
    </svg>`;
  }

  // Each mode shows a small original layout of entries and corrections from the printed table.
  function tableExcerpt(lang, {name, degrees, columns, values, extra, printedDifference, correction, selected}) {
    const degreeHeading = lang === 'ta' ? 'பாகை' : 'Degrees';
    const tableCaption = lang === 'ta' ? `${name} அட்டவணைப் பகுதி` : `${name} table excerpt`;
    const differenceCaption = lang === 'ta' ? 'பொது வித்தியாசம்' : 'Mean difference';
    const extraHeading = lang === 'ta' ? 'மீதி நிமிடம்' : 'Extra minutes';
    const printedHeading = lang === 'ta' ? 'அச்சிட்ட எண்' : 'Printed';
    const correctionHeading = lang === 'ta' ? 'தசம மதிப்பு' : 'Decimal value';
    return `<div class="g9-concept-table">
      <table>
        <caption>${tableCaption}</caption>
        <thead><tr><th scope="col">${degreeHeading}</th>${columns.map(column => `<th scope="col">${column}′</th>`).join('')}</tr></thead>
        <tbody><tr><th scope="row">${degrees}°</th>${values.map((value, i) => `<td>${i === selected ? `<strong>${value}</strong>` : value}</td>`).join('')}</tr></tbody>
      </table>
      <table>
        <caption>${differenceCaption}</caption>
        <thead><tr><th scope="col">${extraHeading}</th><th scope="col">${printedHeading}</th><th scope="col">${correctionHeading}</th></tr></thead>
        <tbody><tr><th scope="row">${extra}′</th><td>${printedDifference}</td><td>${correction}</td></tr></tbody>
      </table>
    </div>`;
  }

  const option = (label, result, math, diagram) => ({label, result, math, diagram});
  const answer = (label, feedback, correct = false) => ({label, feedback, correct});
  const detail = (text, math) => ({text, math});

  window.TRIGGLE_TRIGONOMETRY_LESSONS = [
    {
      section: '6.1',
      pages: {en:{printed:'222–227',pdf:'228–233'}, ta:{printed:'236–241',pdf:'242–247'}},
      title: words('Introduction to trigonometric ratios', 'முக்கோணவியல் விகிதங்கள்: அறிமுகம்'),
      intro: words('Look at the same ramp from its two ends. Which side is across from the angle you choose?', 'ஒரே சாய்வுப் பாதையை அதன் இரு முனைகளிலிருந்தும் பாருங்கள். நீங்கள் தேர்ந்தெடுக்கும் கோணத்திற்கு எதிரே எந்தப் பக்கம் உள்ளது?'),
      explanation: words('The hypotenuse is always across from the right angle. Opposite and adjacent describe the two shorter sides relative to the chosen acute angle. A ratio divides one length by another.', 'கர்ணம் எப்போதும் செங்கோணத்திற்கு எதிரே இருக்கும். தேர்ந்தெடுத்த குறுங்கோணத்தைப் பொறுத்து மற்ற இரு பக்கங்களின் பெயர்கள் எதிர்ப்பக்கம், அடுத்துள்ள பக்கம் என அமையும். ஒரு நீளத்தை மற்றொரு நீளத்தால் வகுத்தால் விகிதம் கிடைக்கும்.'),
      activity: {
        label: words('Choose the reference angle', 'எந்தக் கோணத்தைப் பொறுத்துப் பார்க்கலாம்?'),
        options: [
          option(words('Angle A', 'கோணம் A'),
            words('From A, the side across the triangle is BC. AB is the leg that touches A. AC stays opposite the right angle at B.', 'A-க்கு எதிரே BC உள்ளது. A-ஐத் தொடும் மற்ற பக்கம் AB. B-இல் உள்ள செங்கோணத்திற்கு எதிரே AC உள்ளது.'),
            '\\begin{gathered}\\sin A=\\dfrac{5}{13}\\quad\\cos A=\\dfrac{12}{13}\\\\\\tan A=\\dfrac{5}{12}\\end{gathered}',
            lang => rightTriangle('A', lang)),
          option(words('Angle C', 'கோணம் C'),
            words('From C, AB is across the triangle and BC is the leg that touches C. The two labels switch. AC still measures 13.', 'C-க்கு எதிரே AB உள்ளது. C-ஐத் தொடும் மற்ற பக்கம் BC. இரு பக்கங்களின் பெயர்கள் இப்போது இடம் மாறுகின்றன. AC-இன் நீளம் 13 ஆகவே உள்ளது.'),
            '\\begin{gathered}\\sin C=\\dfrac{12}{13}\\quad\\cos C=\\dfrac{5}{13}\\\\\\tan C=\\dfrac{12}{5}\\end{gathered}',
            lang => rightTriangle('C', lang))
        ]
      },
      details: [
        detail(words('Sine (sin) divides the opposite side by the hypotenuse. Cosine (cos) divides the adjacent side by the hypotenuse. Tangent (tan) divides the opposite side by the adjacent side.', 'சைன் (sin) என்பது எதிர்ப்பக்கத்தைக் கர்ணத்தால் வகுத்த விகிதம். கோசைன் (cos) என்பது அடுத்துள்ள பக்கத்தைக் கர்ணத்தால் வகுத்த விகிதம். டேன்ஜென்ட் (tan) என்பது எதிர்ப்பக்கத்தை அடுத்துள்ள பக்கத்தால் வகுத்த விகிதம்.')),
        detail(words('The reciprocals swap the top and bottom. Cosecant (cosec), secant (sec), and cotangent (cot) are the reciprocals of sine, cosine, and tangent, in that order.', 'தலைகீழ் விகிதம் காணத் தொகுதியையும் பகுதியையும் இடம் மாற்றுங்கள். cosec, sec, cot என்பவை முறையே sin, cos, tan ஆகியவற்றின் தலைகீழ் விகிதங்கள்.'),
          '\\begin{gathered}\\operatorname{cosec} A=\\dfrac{13}{5}\\quad\\sec A=\\dfrac{13}{12}\\\\\\cot A=\\dfrac{12}{5}\\end{gathered}'),
        detail(words('Enlarge the ramp without changing its angle. All sides grow by the same factor, so the ratios stay the same. If a side is missing, use Pythagoras first. Here the squares of the two shorter sides add to the square of AC.', 'கோணம் மாறாமல் சாய்வுப் பாதையைப் பெரிதாக்கினால், எல்லாப் பக்கங்களும் ஒரே மடங்கில் பெரிதாகும். எனவே விகிதங்கள் மாறாது. ஒரு பக்கத்தின் நீளம் தெரியாவிட்டால் முதலில் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துங்கள். இங்கு குறுகிய இரு பக்கங்களின் வர்க்கங்களைக் கூட்டினால் AC-இன் வர்க்கம் கிடைக்கும்.'),
          '5^2+12^2=13^2'),
        detail(words('If you know a ratio, you can also work backward to find a missing side. Here h is the height of a larger ramp with the same angle A and a horizontal side of length 24.', 'விகிதம் தெரிந்தால், தெரியாத பக்க நீளத்தையும் கண்டறியலாம். இங்கு அதே A கோணத்துடன் கிடைமட்டப் பக்கத்தின் நீளம் 24 கொண்ட பெரிய சாய்வுப் பாதையின் உயரம் h.'),
          '\\begin{gathered}\\dfrac{h}{24}=\\tan A=\\dfrac{5}{12}\\\\h=24\\times\\dfrac{5}{12}=10\\end{gathered}')
      ],
      check: {
        question: words('In a new right triangle, the side opposite the angle θ (theta) is 8, the side next to it is 15, and the hypotenuse is 17. What length goes below 8 in the fraction for sin θ?', 'ஒரு புதிய செங்கோண முக்கோணத்தில் θ (தீட்டா) என்ற கோணத்திற்கு எதிர்ப்பக்கம் 8, அடுத்துள்ள பக்கம் 15, கர்ணம் 17. sin θ-க்கான பின்னத்தில் 8-க்குக் கீழே எந்த நீளம் வர வேண்டும்?'),
        hint: words('First find the side directly across from the right angle.', 'முதலில் செங்கோணத்திற்கு நேரெதிரே உள்ள பக்கத்தைக் கண்டறியுங்கள்.'),
        options: [
          answer(words('15', '15'), words('Dividing 8 by 15 gives tangent. Sine compares the opposite side with the hypotenuse.', '8-ஐ 15-ஆல் வகுத்தால் tan θ கிடைக்கும். sin θ காண எதிர்ப்பக்கத்தைக் கர்ணத்தால் வகுக்க வேண்டும்.')),
          answer(words('17', '17'), words('Sine divides the opposite side, 8, by the hypotenuse, 17.', 'sin θ காண எதிர்ப்பக்கம் 8-ஐக் கர்ணம் 17-ஆல் வகுக்க வேண்டும்.'), true),
          answer(words('8', '8'), words('8 is the opposite side. Keep it on top and put the hypotenuse below it.', '8 என்பது எதிர்ப்பக்கத்தின் நீளம். அதைத் தொகுதியில் வைத்து, கர்ணத்தின் நீளத்தைப் பகுதியில் எழுதுங்கள்.'))
        ]
      },
      exercise: 'c9-exercise-6-1-q1'
    },
    {
      section: '6.2',
      pages: {en:{printed:'228–232',pdf:'234–238'}, ta:{printed:'242–246',pdf:'248–252'}},
      title: words('Trigonometric ratios of special angles', 'சில சிறப்புக் கோணங்களின் முக்கோணவியல் விகிதங்கள்'),
      intro: words('If you cut a square in half along a diagonal, why do sine and cosine match at 45°?', 'ஒரு சதுரத்தை மூலைவிட்டத்தின் வழியே இரண்டாக வெட்டினால், 45°-க்கான sin, cos மதிப்புகள் ஏன் சமமாகின்றன?'),
      explanation: words('For a circle of radius 1 centred at O, P is the point where the selected ray meets the circle. The horizontal coordinate x gives cosine and the vertical coordinate y gives sine. The right triangle may collapse at an endpoint, but the coordinates still make sense.', 'O-வை மையமாகக் கொண்ட ஓரலகு வட்டத்தில், தேர்ந்தெடுத்த கதிர் வட்டத்தைச் சந்திக்கும் புள்ளி P. கிடைமட்ட ஆயத்தொலைவு x என்பது cos மதிப்பு. செங்குத்து ஆயத்தொலைவு y என்பது sin மதிப்பு. 0°, 90° ஆகிய கோணங்களில் முக்கோணம் உருவாகாவிட்டாலும், ஆயத்தொலைவுகளுக்குப் பொருள் உண்டு.'),
      activity: {
        label: words('Select a special angle', 'ஒரு சிறப்புக் கோணத்தைத் தேர்ந்தெடுங்கள்'),
        options: [
          specialAngle(45, words('The square gives a right triangle with equal legs. Both are divided by the same hypotenuse, so sine and cosine are equal. Tangent is the ratio of the equal legs.', 'சதுரத்திலிருந்து சம நீளமுள்ள இரு குறுகிய பக்கங்களைக் கொண்ட செங்கோண முக்கோணம் கிடைக்கிறது. அவற்றை ஒரே கர்ணத்தால் வகுப்பதால் sin, cos சமம். சம நீளமுள்ள பக்கங்களின் விகிதம் என்பதால் tan மதிப்பு 1.')),
          specialAngle(30, words('Halve an equilateral triangle of side 2 through its altitude. The side opposite 30° has length 1 and the hypotenuse is 2. Pythagoras gives the adjacent side as the square root of 3.', 'பக்க நீளம் 2 கொண்ட சமபக்க முக்கோணத்தை அதன் குத்துக்கோட்டால் இரண்டாகப் பிரியுங்கள். 30°-க்கு எதிர்ப்பக்கம் 1, கர்ணம் 2. பிதாகரஸ் தேற்றப்படி அடுத்துள்ள பக்கத்தின் நீளம் 3-இன் வர்க்கமூலம்.')),
          specialAngle(60, words('Take the other acute angle of the same half-triangle. Now 1 is adjacent and the square root of 3 is opposite. The hypotenuse is still 2.', 'அதே முக்கோணத்தின் மற்ற குறுங்கோணத்தை எடுத்துக்கொள்ளுங்கள். இப்போது அடுத்துள்ள பக்கம் 1, எதிர்ப்பக்கம் 3-இன் வர்க்கமூலம். கர்ணம் 2 ஆகவே உள்ளது.')),
          specialAngle(0, words('P is at (1, 0). Cosecant and cotangent are undefined because each would divide by the vertical coordinate, which is zero.', 'P என்பது (1, 0) என்ற புள்ளி. cosec, cot இரண்டையும் காண செங்குத்து ஆயத்தொலைவால் வகுக்க வேண்டும். அது பூச்சியம் என்பதால் இரு விகிதங்களும் வரையறுக்கப்படவில்லை.')),
          specialAngle(90, words('P is at (0, 1). Tangent and secant are undefined because each would divide by the horizontal coordinate, which is zero.', 'P என்பது (0, 1) என்ற புள்ளி. tan, sec இரண்டையும் காண கிடைமட்ட ஆயத்தொலைவால் வகுக்க வேண்டும். அது பூச்சியம் என்பதால் இரு விகிதங்களும் வரையறுக்கப்படவில்லை.'))
        ]
      },
      details: [
        detail(words('At 45°, a square of side 1 gives a diagonal of length square root of 2. The same right-triangle ratios also describe the unit-circle diagram after scaling.', 'பக்க நீளம் 1 கொண்ட சதுரத்தின் மூலைவிட்ட நீளம் 2-இன் வர்க்கமூலம். கர்ணத்தின் நீளத்தை 1 அலகாக மாற்றி வரைந்தாலும் முக்கோணவியல் விகிதங்கள் மாறாது.'),
          '\\sin45^{\\circ}=\\cos45^{\\circ}=\\dfrac{1}{\\sqrt{2}}'),
        detail(words('A power on a ratio squares the value, not the angle. In the unit circle the two coordinate squares add to 1.', 'விகிதத்தின் மேல் வர்க்கக் குறி இருந்தால் அந்த விகிதத்தின் மதிப்பையே வர்க்கப்படுத்த வேண்டும். ஓரலகு வட்டத்தில் இரு ஆயத்தொலைவுகளின் வர்க்கங்களின் கூட்டுத்தொகை 1.'),
          '\\begin{gathered}\\sin^2\\theta=(\\sin\\theta)^2\\\\\\sin^2\\theta+\\cos^2\\theta=1\\end{gathered}')
      ],
      check: {
        question: words('The radius points straight up at 90°. What happens to tan 90°?', 'ஆரம் 90°-இல் நேராக மேல்நோக்கி உள்ளது. tan 90°-இன் மதிப்பு என்ன?'),
        hint: words('Tangent divides y by x. What is the x-coordinate when the point is on the vertical axis?', 'tan மதிப்பைக் காண y-ஐ x-ஆல் வகுக்க வேண்டும். புள்ளி செங்குத்து அச்சில் இருந்தால் x-இன் மதிப்பு என்ன?'),
        options: [
          answer(words('0', '0'), words('The zero is the horizontal coordinate. Tangent divides by it, so the result is undefined.', 'கிடைமட்ட ஆயத்தொலைவு பூச்சியம். tan காண அதனால் வகுக்க வேண்டும். எனவே மதிப்பு வரையறுக்கப்படவில்லை.')),
          answer(words('1', '1'), words('The vertical coordinate 1 gives sine. Tangent would divide 1 by the horizontal coordinate 0.', 'செங்குத்து ஆயத்தொலைவு 1 என்பது sin மதிப்பு. tan காண 1-ஐக் கிடைமட்ட ஆயத்தொலைவு 0-ஆல் வகுக்க வேண்டும்.')),
          answer(undefinedValue, words('The denominator of tangent is x. At 90°, x is zero and division by zero is undefined.', 'tan மதிப்பைக் காண x-ஆல் வகுக்க வேண்டும். 90°-இல் x பூச்சியம். பூச்சியத்தால் வகுத்தல் வரையறுக்கப்படவில்லை.'), true)
        ]
      },
      exercise: 'c9-exercise-6-2-q1-i'
    },
    {
      section: '6.3',
      pages: {en:{printed:'233–235',pdf:'239–241'}, ta:{printed:'247–250',pdf:'253–256'}},
      title: words('Complementary angle ratios', 'நிரப்புக் கோணங்களுக்கான முக்கோணவியல் விகிதங்கள்'),
      intro: words('Can different ratios at the two acute corners of one right triangle give the same number?', 'ஒரே செங்கோண முக்கோணத்தில் உள்ள இரு குறுங்கோணங்களின் வெவ்வேறு விகிதங்கள் ஒரே மதிப்பைக் கொடுக்குமா?'),
      explanation: words('The angles α (alpha) and β (beta) add to 90°, so each is the complement of the other. A side that is opposite α is adjacent to β. Look for ratios that divide the same two lengths in the same order.', 'α (ஆல்பா), β (பீட்டா) கோணங்களின் கூட்டுத்தொகை 90°. எனவே அவை ஒன்றுக்கொன்று நிரப்புக் கோணங்கள். α-க்கு எதிர்ப்பக்கமாக இருப்பது β-க்கு அடுத்துள்ள பக்கம். ஒரே இரு நீளங்களை ஒரே வரிசையில் வகுக்கும் விகிதங்களைக் கண்டறியுங்கள்.'),
      math: '\\alpha+\\beta=90^{\\circ}',
      activity: {
        label: words('Choose a pair of ratios', 'ஒரு விகித இணையைத் தேர்ந்தெடுங்கள்'),
        options: [
          option(words('sin and cos', 'sin மற்றும் cos'), words('BC is opposite α and adjacent to β. Both ratios divide BC by AC, so both have the same value.', 'BC என்பது α-க்கு எதிர்ப்பக்கம், β-க்கு அடுத்துள்ள பக்கம். இரு விகிதங்களிலும் BC-ஐ AC-ஆல் வகுப்பதால் ஒரே மதிப்பு கிடைக்கிறது.'),
            '\\sin\\alpha=\\dfrac{3}{5}=\\cos\\beta', complementTriangle),
          option(words('tan and cot', 'tan மற்றும் cot'), words('Tangent at α divides opposite BC by adjacent AB. Cotangent at β divides adjacent BC by opposite AB. The order of lengths is the same.', 'α-க்கான tan மதிப்பில் எதிர்ப்பக்கம் BC-ஐ அடுத்துள்ள பக்கம் AB-ஆல் வகுக்கிறோம். β-க்கான cot மதிப்பில் அடுத்துள்ள பக்கம் BC-ஐ எதிர்ப்பக்கம் AB-ஆல் வகுக்கிறோம். நீளங்களின் வரிசை ஒன்றே.'),
            '\\tan\\alpha=\\dfrac{3}{4}=\\cot\\beta', complementTriangle),
          option(words('sec and cosec', 'sec மற்றும் cosec'), words('AB is adjacent to α and opposite β. Both ratios divide AC by AB.', 'AB என்பது α-க்கு அடுத்துள்ள பக்கம், β-க்கு எதிர்ப்பக்கம். இரு விகிதங்களிலும் AC-ஐ AB-ஆல் வகுக்கிறோம்.'),
            '\\sec\\alpha=\\dfrac{5}{4}=\\operatorname{cosec}\\beta', complementTriangle)
        ]
      },
      details: [
        detail(words('These pairings also work in reverse. Find the complement by subtracting the given acute angle from 90°. For example, when the angle is 28°, use its complement 62°.', 'கோணங்களை இடம் மாற்றியும் இதே இணைகளைப் பயன்படுத்தலாம். கொடுத்த குறுங்கோணத்தை 90°-இலிருந்து கழித்தால் அதன் நிரப்புக் கோணம் கிடைக்கும். எடுத்துக்காட்டாக, 28°-இன் நிரப்புக் கோணம் 62°.'),
          '\\cos 28^{\\circ}=\\sin 62^{\\circ}'),
        detail(words('Use a complementary pair to simplify a product. Replace one tangent with the cotangent of the other angle, then use the reciprocal relation.', 'ஒரு பெருக்கலை எளிமைப்படுத்த நிரப்புக் கோண இணையைப் பயன்படுத்தலாம். ஒரு கோணத்தின் tan விகிதத்தை மற்ற கோணத்தின் cot விகிதமாக மாற்றி, தலைகீழ் விகித உறவைப் பயன்படுத்துங்கள்.'),
          '\\begin{gathered}\\tan 34^{\\circ}\\tan 56^{\\circ}\\\\=\\tan 34^{\\circ}\\cot 34^{\\circ}=1\\end{gathered}'),
        detail(words('Find an unknown acute angle the same way. If sine of θ equals cosine of 26°, θ is the angle that completes 90°.', 'தெரியாத குறுங்கோணத்தையும் இதே முறையில் காணலாம். θ-இன் sin மதிப்பு 26°-இன் cos மதிப்புக்குச் சமம் என்றால், θ என்பது 26° உடன் சேர்ந்து 90° தரும் கோணம்.'),
          '\\theta=90^{\\circ}-26^{\\circ}=64^{\\circ}'),
        detail(words('From 0° to 90° in the unit circle, the vertical coordinate rises from 0 to 1 while the horizontal coordinate falls from 1 to 0. Sine and cosine each have minimum 0 and maximum 1 in this interval.', 'ஓரலகு வட்டத்தில் 0° முதல் 90° வரை செல்லும்போது செங்குத்து ஆயத்தொலைவு 0-லிருந்து 1 வரை அதிகரிக்கிறது. கிடைமட்ட ஆயத்தொலைவு 1-லிருந்து 0 வரை குறைகிறது. இந்தக் கோண இடைவெளியில் sin, cos இரண்டிற்கும் குறைந்த மதிப்பு 0, அதிக மதிப்பு 1.'))
      ],
      check: {
        question: words('Which cosine has the same value as sin 37°?', 'எந்தக் கோணத்தின் cos மதிப்பு sin 37°-க்குச் சமம்?'),
        hint: words('What must you add to 37° to make a right angle?', '37° உடன் எதைக் கூட்டினால் செங்கோணம் கிடைக்கும்?'),
        options: [
          answer(words('cos 53°', 'cos 53°'), words('37° and 53° add to 90°. The opposite side for 37° becomes the adjacent side for 53°.', '37° மற்றும் 53° இன் கூட்டுத்தொகை 90°. 37°-க்கு எதிர்ப்பக்கமாக இருப்பது 53°-க்கு அடுத்துள்ள பக்கம்.'), true),
          answer(words('cos 37°', 'cos 37°'), words('At one angle, sine and cosine use different legs. Switch to the angle that completes 90°.', 'ஒரே கோணத்தின் sin, cos விகிதங்கள் வெவ்வேறு பக்கங்களைப் பயன்படுத்துகின்றன. 37° உடன் சேர்ந்து 90° தரும் கோணத்தைத் தேர்ந்தெடுங்கள்.')),
          answer(words('cos 143°', 'cos 143°'), words('37° and 143° add to 180°. The two acute angles in a right triangle add to 90°.', '37° மற்றும் 143° இன் கூட்டுத்தொகை 180°. செங்கோண முக்கோணத்தின் இரு குறுங்கோணங்களின் கூட்டுத்தொகை 90°.'))
        ]
      },
      exercise: 'c9-exercise-6-3-q-ii'
    },
    {
      section: '6.4',
      pages: {en:{printed:'235–239, 242–247',pdf:'241–245, 248–253'}, ta:{printed:'250–253, 256–261',pdf:'256–259, 262–267'}},
      title: words('Using printed trigonometric tables', 'முக்கோணவியல் அட்டவணையைப் பயன்படுத்தும் முறை'),
      intro: words('A printed table has a 6′ column and a 12′ column. How can it tell you a value for 9′?', 'அச்சிட்ட அட்டவணையில் 6′, 12′ ஆகிய நிரல்கள் உள்ளன. 9′-க்கான மதிப்பை எப்படிக் கண்டறிவீர்கள்?'),
      explanation: words('The symbol ° marks degrees, ′ marks minutes of angle, and ″ marks seconds of angle. Find the degree row and the largest printed minute column that does not exceed the given minutes. Use the remaining minutes to read the mean difference. The table gives approximate values to four decimal places.', '° என்பது பாகையையும், ′ என்பது கோண நிமிடத்தையும், ″ என்பது கோண நொடியையும் குறிக்கும். முதலில் பாகைக்குரிய வரிசையைப் பாருங்கள். கொடுத்த நிமிடத்தைவிட அதிகமாகாத மிகப்பெரிய நிமிட நிரலைத் தேர்ந்தெடுங்கள். மீதமுள்ள நிமிடத்திற்குப் பொது வித்தியாசத்தைப் படியுங்கள். அட்டவணை நான்கு தசம இடங்களுக்குத் தோராய மதிப்பைத் தருகிறது.'),
      math: '1^{\\circ}=60^{\\prime},\\quad 1^{\\prime}=60^{\\prime\\prime}',
      activity: {
        label: words('Choose a table-reading task', 'அட்டவணையைப் படிக்கும் முறையைத் தேர்ந்தெடுங்கள்'),
        options: [
          option(words('Find a sine', 'sin மதிப்பைக் காண்க'),
            words('For 11°9′, start in row 11° and column 6′. The extra 3′ gives a correction of 0.0009. Sine increases as the acute angle increases, so add.', '11°9′-க்கு, 11° வரிசையிலும் 6′ நிரலிலும் உள்ள மதிப்பைப் படியுங்கள். மீதி 3′-க்குரிய திருத்தம் 0.0009. குறுங்கோணம் அதிகரிக்கும்போது sin மதிப்பும் அதிகரிப்பதால் இதைக் கூட்டுங்கள்.'),
            '\\begin{gathered}\\sin(11^{\\circ}9^{\\prime})\\approx0.1925+0.0009\\\\=0.1934\\end{gathered}',
            lang => tableExcerpt(lang, {name:'sin', degrees:11, columns:[0,6,12], values:['0.1908','0.1925','0.1942'], extra:3, printedDifference:9, correction:'0.0009', selected:1})),
          option(words('Find a cosine', 'cos மதிப்பைக் காண்க'),
            words('For 19°50′, start at 19°48′. The extra 2′ gives a correction of 0.0002. Cosine decreases as the acute angle increases, so subtract.', '19°50′-க்கு 19°48′-இல் தொடங்குங்கள். மீதி 2′-க்குரிய திருத்தம் 0.0002. குறுங்கோணம் அதிகரிக்கும்போது cos மதிப்பு குறைவதால் இதைக் கழியுங்கள்.'),
            '\\begin{gathered}\\cos(19^{\\circ}50^{\\prime})\\approx0.9409-0.0002\\\\=0.9407\\end{gathered}',
            lang => tableExcerpt(lang, {name:'cos', degrees:19, columns:[42,48,54], values:['0.9415','0.9409','0.9403'], extra:2, printedDifference:2, correction:'0.0002', selected:1})),
          option(words('Find a tangent', 'tan மதிப்பைக் காண்க'),
            words('For 12°16′, read row 12° and column 12′. The extra 4′ gives 12 units in the fourth decimal place. Add that correction because tangent increases with the angle.', '12°16′-க்கு 12° வரிசையையும் 12′ நிரலையும் பாருங்கள். மீதி 4′-க்குரிய பொது வித்தியாசம் நான்காவது தசம இடத்தின் 12 அலகுகள். கோணம் அதிகரிக்கும்போது tan அதிகரிப்பதால் அந்தத் திருத்தத்தைக் கூட்டுங்கள்.'),
            '\\begin{gathered}\\tan(12^{\\circ}16^{\\prime})\\approx0.2162+0.0012\\\\=0.2174\\end{gathered}',
            lang => tableExcerpt(lang, {name:'tan', degrees:12, columns:[0,6,12], values:['0.2126','0.2144','0.2162'], extra:4, printedDifference:12, correction:'0.0012', selected:2})),
          option(words('Find the angle', 'கோணத்தைக் காண்க'),
            words('Suppose the cosine is 0.7654. As cosine decreases, start at the nearest higher entry, 0.7660 at 40°0′. The difference 0.0006 matches 3′. Add those minutes to 40°0′ to get θ (theta).', 'cos மதிப்பு 0.7654 எனக் கொள்வோம். கோணம் அதிகரிக்கும்போது cos குறைகிறது. எனவே இதைவிடச் சற்று அதிகமான அட்டவணை மதிப்பு 0.7660-ஐத் தேர்ந்தெடுங்கள். அது 40°0′-க்குரியது. வித்தியாசம் 0.0006 என்பது 3′-க்குப் பொருந்துகிறது. 40°0′ உடன் 3′-ஐக் கூட்டினால் கோணம் θ (தீட்டா) கிடைக்கும்.'),
            '\\begin{gathered}0.7660-0.7654=0.0006\\\\\\theta\\approx40^{\\circ}3^{\\prime}\\end{gathered}',
            lang => tableExcerpt(lang, {name:'cos', degrees:40, columns:[0,6,12], values:['0.7660','0.7649','0.7638'], extra:3, printedDifference:6, correction:'0.0006', selected:0}))
        ]
      },
      details: [
        detail(words('The full table has minute columns 0′, 6′, 12′, …, 54′ and mean-difference columns for 1′ through 5′. A printed difference of 9 means 9 units in the fourth decimal place, or 0.0009.', 'முழு அட்டவணையில் 0′, 6′, 12′, …, 54′ ஆகிய நிமிட நிரல்களும் 1′ முதல் 5′ வரை பொது வித்தியாச நிரல்களும் உள்ளன. பொது வித்தியாசம் 9 என அச்சிடப்பட்டிருந்தால் அது நான்காவது தசம இடத்தில் 9, அதாவது 0.0009.')),
        detail(words('For reverse lookup in a sine or tangent table, start at the nearest lower tabulated value. Find the correction that reaches the target, then add the corresponding minutes to the base angle. An exact match needs no correction.', 'sin அல்லது tan மதிப்பிலிருந்து கோணத்தைக் காணும்போது, கொடுத்த மதிப்பிற்கு உடனடியாகக் கீழுள்ள அட்டவணை மதிப்பில் தொடங்குங்கள். கொடுத்த மதிப்பை அடைய வேண்டிய திருத்தத்தைக் கண்டறிந்து, அதற்குரிய நிமிடங்களைக் கோணத்துடன் கூட்டுங்கள். மதிப்பு சரியாகப் பொருந்தினால் திருத்தம் தேவையில்லை.')),
        detail(words('Use the same method to find heights and distances. If the angle of elevation is θ and the horizontal distance to the foot of an object is d, multiply d by tan θ to find the vertical rise h above the observation level.', 'உயரம், தொலைவு காணவும் இந்த முறையைப் பயன்படுத்தலாம். ஏற்றக்கோணம் θ, பொருளின் அடிப்பகுதி வரையிலான கிடைமட்டத் தொலைவு d எனில், d-ஐ tan θ-ஆல் பெருக்குங்கள். பார்க்கும் மட்டத்திலிருந்து மேலுள்ள உயரம் h கிடைக்கும்.'),
          'h=d\\tan\\theta'),
        detail(words('To find the area when the hypotenuse is r, find the two legs first. The height is r times sine and the base is r times cosine. Multiply base and height and divide by 2.', 'கர்ணம் r எனத் தெரிந்தால் பரப்பளவைக் காண முதலில் மற்ற இரு பக்கங்களைக் கணக்கிடுங்கள். r-ஐ sin மதிப்பால் பெருக்கினால் உயரமும், cos மதிப்பால் பெருக்கினால் அடிப்பக்கமும் கிடைக்கும். இரண்டையும் பெருக்கி 2-ஆல் வகுக்கவும்.'),
          '\\dfrac{(r\\sin\\theta)(r\\cos\\theta)}{2}')
      ],
      check: {
        question: words('For cos 52°15′, which column and correction should you use in the 52° row?', 'cos 52°15′ மதிப்பைக் காண 52° வரிசையில் எந்த நிரலையும் எந்தத் திருத்தத்தையும் பயன்படுத்துவீர்கள்?'),
        hint: words('Start with the earlier minute column. Think about whether cosine rises or falls as the angle grows.', 'முந்தைய நிமிட நிரலில் தொடங்குங்கள். கோணம் அதிகரிக்கும்போது cos மதிப்பு கூடுமா, குறையுமா என்று சிந்தியுங்கள்.'),
        options: [
          answer(words('12′ column; add the 3′ correction', '12′ நிரல்; 3′-க்கான திருத்தத்தைக் கூட்டுக'), words('12′ is the correct starting column. Cosine decreases as the angle increases, so subtract the correction.', '12′ தொடங்க வேண்டிய சரியான நிரல். கோணம் அதிகரிக்கும்போது cos குறைவதால் திருத்தத்தைக் கழியுங்கள்.')),
          answer(words('12′ column; subtract the 3′ correction', '12′ நிரல்; 3′-க்கான திருத்தத்தைக் கழிக்கவும்'), words('The earlier column is 12′ and the difference is 3′. Subtract the correction because cosine decreases.', '15′-க்கு முந்தைய நிரல் 12′. மீதி 3′. cos மதிப்பு குறைவதால் திருத்தத்தைக் கழிக்க வேண்டும்.'), true),
          answer(words('18′ column; subtract the 3′ correction', '18′ நிரல்; 3′-க்கான திருத்தத்தைக் கழிக்கவும்'), words('The printed method starts at the earlier minute column. The 18′ column is already past 15′.', 'அச்சிட்ட அட்டவணை முறையில் முந்தைய நிமிட நிரலில் தொடங்க வேண்டும். 18′ என்பது 15′-ஐ விட அதிகம்.'))
        ]
      },
      exercise: 'c9-exercise-6-4-q1-ii'
    }
  ];
})();
