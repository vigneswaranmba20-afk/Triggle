/* Grade 9 Geometry, original bilingual concept activities. See the chapter source map. */
(() => {
  'use strict';

  const pair = (en, ta) => ({ en, ta });
  const at = (text, lang) => text[lang === 'ta' ? 'ta' : 'en'];
  const primary = '#236fcb';
  const accent = '#a94417';
  const guide = '#68788c';
  const wash = '#e6f1ff';

  function figure(description, draw) {
    return lang => `<svg viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${at(description, lang)}"><title>${at(description, lang)}</title>${draw(lang)}</svg>`;
  }

  const point = (x, y) => [x, y];
  const line = (a, b, color = primary, dashed = false) =>
    `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="2.5"${dashed ? ' stroke-dasharray="5 4"' : ''}/>`;
  const path = (d, fill = 'none', stroke = primary) =>
    `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const poly = (points, fill = wash) =>
    path(`M ${points.map(p => p.join(' ')).join(' L ')} Z`, fill);
  const dot = ([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#243850"/>`;
  const label = (text, x, y, color = '#243850') =>
    `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="15" font-family="system-ui, sans-serif">${text}</text>`;
  const circle = ([x, y], radius, color = primary) =>
    `<circle cx="${x}" cy="${y}" r="${radius}" stroke="${color}" stroke-width="2.5" fill="none"/>`;
  const spot = (name, p, dx = 0, dy = -8) => dot(p) + label(name, p[0] + dx, p[1] + dy);
  const mid = (a, b) => point((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
  const ray = ([x, y], r, degree) => {
    const a = degree * Math.PI / 180;
    return point(x + r * Math.cos(a), y - r * Math.sin(a));
  };
  const arcTo = (r, to, large, sweep) => `A ${r} ${r} 0 ${large ? 1 : 0} ${sweep} ${to.join(' ')}`;
  const angleArc = (vertex, r, start, end, color = accent) =>
    path(`M ${ray(vertex, r, start).join(' ')} ${arcTo(r, ray(vertex, r, end), end - start > 180, 0)}`, 'none', color);

  function gate(degrees, description) {
    const hinge = point(138, 132);
    const end = point(252, 132);
    const tip = ray(hinge, 82, degrees);
    const [x, y] = ray(hinge, 57, degrees / 2);
    return figure(description, () => line(hinge, end) + line(hinge, tip, accent) +
      angleArc(hinge, 29, 0, degrees) + spot('O', hinge, 0, 20) +
      spot('A', end, 14, 5) + spot('B', tip, 0, -9) + label(`${degrees}°`, x, y + 3, accent));
  }

  function crossing(degrees, description) {
    const o = point(160, 96);
    const other = 180 - degrees;
    return figure(description, () => line(point(49, 96), point(271, 96)) +
      line(ray(o, 78, degrees), ray(o, 78, degrees + 180), accent) + dot(o) +
      [0, degrees, 180, degrees + 180].map((start, i) => {
        const size = i % 2 ? other : degrees;
        const [x, y] = ray(o, 55, start + size / 2);
        return angleArc(o, 30, start, start + size) + label(`${size}°`, x, y + 5);
      }).join(''));
  }

  function quadrilateral(shear, description, height = 76) {
    const a = point(70, 149);
    const b = point(203, 149);
    const c = point(203 + shear, 149 - height);
    const d = point(70 + shear, 149 - height);
    const o = mid(a, c);
    return figure(description, () => poly([a, b, c, d]) + line(a, c, accent, true) + line(b, d, guide, true) +
      spot('A', a, -12, 17) + spot('B', b, 12, 17) + spot('C', c, 12, -7) + spot('D', d, -12, -7) +
      spot('O', o, 0, -11));
  }

  const center = point(160, 96);
  const radius = 71;
  const onCircle = degrees => ray(center, radius, degrees);

  function circlePart(part, description) {
    const a = onCircle(145);
    const b = onCircle(35);
    const arc = arcTo(radius, b, false, 1);
    const topArc = `M ${a.join(' ')} ${arc}`;
    return figure(description, lang => {
      const pieces = {
        radius: line(center, b, accent) + spot('B', b, 13),
        diameter: line(onCircle(180), onCircle(0), accent) +
          spot('A', onCircle(180), -14, 4) + spot('B', onCircle(0), 14, 4),
        chord: line(a, b, accent) + spot('A', a, -13) + spot('B', b, 13),
        arc: path(topArc, 'none', accent) + spot('A', a, -13) + spot('B', b, 13),
        segment: path(`${topArc} Z`, '#ffe9cf', accent) + label(at(pair('segment', 'வட்டத்துண்டு'), lang), 160, 48),
        sector: path(`M ${center.join(' ')} L ${a.join(' ')} ${arc} Z`, '#ffe9cf', accent) +
          label(at(pair('sector', 'வட்டக்கோணப் பகுதி'), lang), 160, 52),
      };
      return circle(center, radius) + pieces[part] + spot('O', center, 0, 20);
    });
  }

  function chordDistance(radiusUnits, distance, description) {
    const factor = radius / radiusUnits;
    const y = center[1] + distance * factor;
    const half = Math.sqrt(radiusUnits ** 2 - distance ** 2);
    const a = point(center[0] - half * factor, y);
    const b = point(center[0] + half * factor, y);
    const m = point(center[0], y);
    return figure(description, () => circle(center, radius) + line(a, b, accent) + line(center, a) +
      line(center, m, guide, true) + path(`M 160 ${y - 9} h 9 v 9`, 'none', guide) +
      spot('A', a, -10, -9) + spot('B', b, 10, -9) + spot('O', center, 0, -10) + spot('M', m, 0, 18) +
      label(String(distance), 174, (y + center[1]) / 2 + 4) +
      label(String(half), (a[0] + m[0]) / 2, y + 19) + label(String(half), (b[0] + m[0]) / 2, y + 19));
  }

  function cyclic(dAngle, description) {
    const a = onCircle(95);
    const b = onCircle(190);
    const c = onCircle(275);
    const d = onCircle(dAngle);
    const angleA = (dAngle - 190) / 2;
    const angleC = 180 - angleA;
    const interceptA = dAngle - 190;
    return figure(description, () => poly([a, b, c, d]) +
      path(`M ${b.join(' ')} ${arcTo(radius, d, interceptA > 180, 0)}`, 'none', accent) +
      path(`M ${d.join(' ')} ${arcTo(radius, b, interceptA < 180, 0)}`, 'none', primary) +
      spot('A', a, 0, -7) + spot('B', b, -14, 3) + spot('C', c, 0, 19) + spot('D', d, 15, 4) +
      label(`${angleA}°`, a[0] - (a[0] - center[0]) * 0.43, a[1] + 29, accent) +
      label(`${angleC}°`, c[0], c[1] - 19, accent));
  }

  function triangleCentre(kind, description) {
    const a = point(92, 45);
    const b = point(92, 141);
    const c = point(220, 141);
    const bc = mid(b, c);
    const ab = mid(a, b);
    const ac = mid(a, c);
    const g = point((a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3);
    const i = point(124, 109);
    const altitudeFoot = point(138.08, 79.56);
    const parts = {
      centroid: () => line(a, bc, accent) + line(c, ab, accent) + line(b, ac, guide, true) + spot('G', g, 11, -8),
      orthocentre: () => line(a, b, accent) + line(c, b, accent) + line(b, altitudeFoot, guide, true) + label('H = B', 67, 160),
      circumcentre: () => circle(ac, 80, guide) + line(bc, point(bc[0], 55), accent, true) +
        line(ab, point(194, ab[1]), accent, true) + spot('S', ac, 0, -10),
      incentre: () => circle(i, 32, guide) + line(a, i, accent) + line(b, i, accent) +
        line(c, i, accent) + line(i, point(i[0], b[1]), guide, true) + spot('I', i, 0, -9),
    };
    return figure(description, () => poly([a, b, c]) +
      path('M 92 131 h 10 v 10', 'none', guide) +
      spot('A', a, -14, -5) + (kind === 'orthocentre' ? dot(b) : spot('B', b, -14, 15)) +
      spot('C', c, 12, 15) + parts[kind]());
  }

  const option = (en, ta, resultEn, resultTa, diagram, math) => ({
    label: pair(en, ta), result: pair(resultEn, resultTa), diagram, math,
  });
  const answer = (en, ta, feedbackEn, feedbackTa, correct = false) => ({
    label: pair(en, ta), feedback: pair(feedbackEn, feedbackTa), correct,
  });
  const detail = (en, ta, math) => ({ text: pair(en, ta), math });
  const pages = (enPrinted, enPdf, taPrinted, taPdf) => ({
    en: { printed: enPrinted, pdf: enPdf }, ta: { printed: taPrinted, pdf: taPdf },
  });

  window.TRIGGLE_GEOMETRY_LESSONS = [
    {
      section: '4.1',
      title: pair('Geometry starts with a question', 'வடிவியல் அறிமுகம்'),
      intro: pair('A gate swings on its hinge. How can you describe how far it opens without measuring the gate’s length?',
        'ஒரு கதவு அதன் கீலில் சுழல்கிறது. கதவின் நீளத்தை அளக்காமலேயே அது எவ்வளவு திறந்துள்ளது என்று எப்படிச் சொல்வாய்?'),
      explanation: pair('Geometry helps us draw, compare and measure shapes. An angle measures a turn between two rays. The rays share a vertex. Read ∠AOB as “angle AOB”. The middle letter O names its vertex.',
        'வடிவங்களை வரையவும், ஒப்பிடவும், அளக்கவும் வடிவியல் உதவுகிறது. இரு கதிர்களுக்கு இடையே உள்ள திருப்பத்தின் அளவே கோணம். கதிர்களின் பொதுவான தொடக்கப்புள்ளி கோணத்தின் முனை. ∠AOB என்பதை “கோணம் AOB” என்று படி. நடுவிலுள்ள O அதன் முனையைக் குறிக்கிறது.'),
      activity: {
        label: pair('Open the gate', 'கதவைத் திற'),
        options: [
          option('Small turn', 'சிறிய திருப்பம்', 'The gate turned 30 degrees. The hinge is the vertex O.', 'கதவு 30 பாகை சுழன்றது. கீல் இருக்கும் இடமே முனைப்புள்ளி O.',
            gate(30, pair('The gate turns 30 degrees about the hinge O.', 'கதவு, கீல் O-வைச் சுற்றி 30 பாகை சுழன்றுள்ளது.'))),
          option('Quarter turn', 'கால் சுற்று', 'A quarter of a full turn is 90 degrees. The same gate now makes a right angle.', 'ஒரு முழுச் சுற்றின் கால் பகுதி 90 பாகை. இப்போது அதே கதவு ஒரு செங்கோணத்தை உருவாக்குகிறது.',
            gate(90, pair('The gate turns 90 degrees about the hinge O.', 'கதவு, கீல் O-வைச் சுற்றி 90 பாகை சுழன்றுள்ளது.'))),
        ],
      },
      details: [
        detail('Open curves have ends that do not meet. A closed curve forms a boundary. A simple closed curve does not cross itself. A polygon is a simple closed figure made of straight line segments.',
          'திறந்த வளைவரையின் முனைகள் சந்திப்பதில்லை. மூடிய வளைவரை ஓர் எல்லையை உருவாக்கும். எளிய மூடிய வளைவரை தன்னைத்தானே வெட்டுவதில்லை. நேர்கோட்டுத் துண்டுகளால் ஆன எளிய மூடிய வடிவம் பலகோணம்.'),
        detail('Length measures a segment. Perimeter measures the length around a closed figure. Area measures the region it encloses. Degrees measure turn.',
          'கோட்டுத்துண்டுக்கு நீளத்தை அளக்கிறோம். மூடிய வடிவத்தின் எல்லையின் நீளம் சுற்றளவு. அது அடைக்கும் பகுதியின் அளவு பரப்பளவு. திருப்பத்தைக் கோணப் பாகையில் அளக்கிறோம்.'),
      ],
      check: {
        hint: pair('Think about what the two gates share. Their lengths differ, but compare how far each one turns at its hinge.',
          'கதவுகளின் நீளங்கள் வேறு. ஆனால் ஒவ்வொரு கதவும் அதன் கீலில் எவ்வளவு சுழன்றது என்பதை ஒப்பிட்டுப் பார்.'),
        question: pair('Two gates of different lengths have both turned 40 degrees. Compare their angles.',
          'வெவ்வேறு நீளமுள்ள இரு கதவுகளும் 40 பாகை சுழன்றன. அவற்றின் கோணங்களை ஒப்பிடு.'),
        options: [
          answer('The angles are equal', 'கோணங்கள் சமம்', 'Both turns are 40 degrees, so both angles have the same measure.', 'இரு திருப்பங்களும் 40 பாகை என்பதால் இரு கோணங்களின் அளவும் சமம்.', true),
          answer('The longer gate makes a larger angle', 'நீளமான கதவு பெரிய கோணத்தை உருவாக்கும்', 'A long gate sweeps farther at its tip. Its angle still measures only the turn at the hinge.', 'நீளமான கதவின் முனை அதிகத் தொலைவு நகரும். ஆனால் கோண அளவு கீலில் ஏற்பட்ட திருப்பத்தை மட்டுமே குறிக்கிறது.'),
        ],
      },
      exercise: 'g9-ch4-ex4.7-q1',
      pages: pages('138–139', '144–145', '150', '156'),
    },
    {
      section: '4.2',
      title: pair('Angles, crossing lines and triangles', 'கோணங்களின் வகைகள், தொடர்புகள், முக்கோணங்கள்'),
      intro: pair('Two paths cross. If one angle gets larger, what happens to the angle directly across from it?',
        'இரு பாதைகள் வெட்டிக்கொள்கின்றன. ஒரு கோணம் பெரிதானால் அதற்கு நேர் எதிரேயுள்ள கோணம் என்ன ஆகும்?'),
      explanation: pair('The two angles beside a straight line form a linear pair and add to 180°. When lines cross, both angles opposite each other complete the same straight angle with a shared neighbour. This makes the vertically opposite angles equal.',
        'ஒரே நேர்க்கோட்டின் மீது அடுத்தடுத்து அமையும் நேரிய கோணச் சோடியின் கூடுதல் 180°. இரு கோடுகள் வெட்டும்போது, எதிரெதிராக உள்ள இரு கோணங்களும் ஒரே அடுத்த கோணத்துடன் சேர்ந்து 180° தருகின்றன. எனவே குத்தெதிர்க் கோணங்கள் சமம்.'),
      activity: {
        label: pair('Rotate the orange line', 'ஆரஞ்சு நிறக் கோட்டைச் சுழற்று'),
        options: [
          option('35°', '35°', 'Both narrow angles are 35°. Their neighbours are 145° because they complete a straight angle.',
            'குறுகிய இரு கோணங்களும் 35°. அடுத்த கோணங்கள் தலா 145°. ஒவ்வொரு சோடியும் ஒரு நேர்க்கோணத்தை நிறைவு செய்கிறது.',
            crossing(35, pair('Crossing lines make opposite angles of 35 degrees and opposite angles of 145 degrees.',
              'வெட்டும் கோடுகளில் ஒரு குத்தெதிர்ச் சோடி 35 பாகை, மற்ற சோடி 145 பாகை.')),
            '180^\\circ-35^\\circ=145^\\circ'),
          option('65°', '65°', 'Now both vertically opposite acute angles are 65°. Each adjacent obtuse angle falls to 115°.',
            'இப்போது குத்தெதிர்க் குறுங்கோணங்கள் தலா 65°. அடுத்துள்ள விரிகோணங்கள் தலா 115° ஆகக் குறைகின்றன.',
            crossing(65, pair('Crossing lines make opposite angles of 65 degrees and opposite angles of 115 degrees.',
              'வெட்டும் கோடுகளில் ஒரு குத்தெதிர்ச் சோடி 65 பாகை, மற்ற சோடி 115 பாகை.')),
            '180^\\circ-65^\\circ=115^\\circ'),
        ],
      },
      details: [
        detail('A turn between 0° and 90° is acute, 90° is right, between 90° and 180° is obtuse, 180° is straight, and between 180° and 360° is reflex. Adjacent angles share a vertex and a ray without overlapping.',
          '0°-க்கும் 90°-க்கும் இடையே அமைவது குறுங்கோணம். 90° என்பது செங்கோணம். 90°-க்கும் 180°-க்கும் இடையே அமைவது விரிகோணம். 180° என்பது நேர்க்கோணம். 180°-க்கும் 360°-க்கும் இடையே அமைவது பின்வளைக்கோணம். அடுத்துள்ள கோணங்கள் ஒரே முனையையும் கதிரையும் பகிர்ந்துகொள்ளும்; அவற்றின் உட்பகுதிகள் ஒன்றின் மீது ஒன்று படியாது.'),
        detail('Complementary angles add to 90°. Supplementary angles add to 180°. Neither pair has to be adjacent. A transversal crosses at least two lines, each at a different point.',
          'நிரப்புக் கோணங்களின் கூடுதல் 90°. மிகை நிரப்புக் கோணங்களின் கூடுதல் 180°. இச்சோடிகளின் கோணங்கள் அடுத்தடுத்து அமைய வேண்டியதில்லை. இரண்டு அல்லது அதற்கு மேற்பட்ட கோடுகளை வெவ்வேறு புள்ளிகளில் வெட்டும் கோடு குறுக்குவெட்டி.'),
        detail('When the two crossed lines are parallel, corresponding angles and alternate interior or exterior angles are equal. Interior angles on the same side of the transversal add to 180°.',
          'குறுக்குவெட்டி வெட்டும் இரு கோடுகள் இணையாக இருந்தால், ஒத்த கோணங்கள் சமம். ஒன்றுவிட்ட உள் அல்லது வெளிக் கோணங்களும் சமம். குறுக்குவெட்டியின் ஒரே பக்கத்திலுள்ள உள் கோணங்களின் கூடுதல் 180°.'),
        detail('A triangle’s angles add to 180°. Its exterior angle equals the sum of its two remote interior angles. Through a vertex, draw a line parallel to the opposite side. The other two angles fit beside the vertex angle along that straight line.',
          'ஒரு முக்கோணத்தின் உட்கோணங்களின் கூடுதல் 180°. அதன் வெளிக்கோணம், அதற்கு அடுத்திராத இரு உட்கோணங்களின் கூடுதலுக்குச் சமம். ஒரு முனை வழியாக எதிர்ப்பக்கத்துக்கு இணைக்கோடு வரைந்தால், மற்ற இரு கோணங்களும் அந்த முனைக் கோணத்தின் இருபுறமும் நேர்க்கோட்டில் பொருந்தும்.',
          '\\angle A+\\angle B+\\angle C=180^\\circ'),
        detail('Triangles can be classified by equal sides or by their angles. To prove two triangles congruent, match corresponding vertices and use SSS (three sides), SAS (two sides and included angle), ASA (two angles and included side), or RHS (right angle, hypotenuse and one other side). AAS follows from the angle sum. The symbol ≅ means congruent.',
          'சமமான பக்கங்களின் எண்ணிக்கையை வைத்தோ கோணங்களின் அளவை வைத்தோ முக்கோணங்களை வகைப்படுத்தலாம். சர்வசமத்தை நிறுவ, ஒத்த முனைகளைப் பொருத்தி ப–ப–ப (மூன்று பக்கங்கள்), ப–கோ–ப (இரு பக்கங்கள், இடைப்பட்ட கோணம்), கோ–ப–கோ (இரு கோணங்கள், இடைப்பட்ட பக்கம்), அல்லது செ–க–ப (செங்கோணம், கர்ணம், மற்றொரு பக்கம்) விதியைப் பயன்படுத்து. கோ–கோ–ப விதியில் (இரு கோணங்கள், இடையில் அமையாத ஒரு பக்கம்) கோணங்களின் கூடுதலைப் பயன்படுத்தி மூன்றாம் கோணத்தைக் காணலாம். ≅ என்பது சர்வசமத்தைக் குறிக்கும்.'),
      ],
      check: {
        hint: pair('Add the two given angles first. All three together must make a straight angle.',
          'முதலில் கொடுத்த இரு கோணங்களைக் கூட்டு. மூன்றையும் சேர்த்தால் ஒரு நேர்க்கோணம் கிடைக்க வேண்டும்.'),
        question: pair('Two angles of a triangle measure 48° and 67°. What is the third angle?',
          'ஒரு முக்கோணத்தின் இரு கோணங்கள் 48°, 67° எனில், மூன்றாவது கோணம் என்ன?'),
        options: [
          answer('65°', '65°', '48° and 67° add to 115°. The missing 65° brings the triangle’s total to 180°.',
            '48°, 67° ஆகியவற்றின் கூடுதல் 115°. எஞ்சிய 65°-ஐச் சேர்த்தால் முக்கோணத்தின் கோணங்களின் கூடுதல் 180° ஆகும்.', true),
          answer('115°', '115°', '115° is the sum of the two given angles. Subtract it from 180° to find the missing angle.',
            '115° என்பது கொடுத்த இரு கோணங்களின் கூடுதல். விடுபட்ட கோணத்தைக் காண அதை 180°-லிருந்து கழி.'),
        ],
      },
      exercise: 'g9-ch4-ex4.1-q2',
      pages: pages('139–144', '145–150', '150–155', '156–161'),
    },
    {
      section: '4.3',
      title: pair('Quadrilaterals and their diagonals', 'நாற்கரங்களும் அவற்றின் மூலைவிட்டங்களும்'),
      intro: pair('Imagine pushing sideways on the top of a rectangular frame. Which facts about its diagonals survive the tilt?',
        'ஒரு செவ்வகச் சட்டத்தின் மேற்பக்கத்தைப் பக்கவாட்டில் தள்ளுவதாகக் கருது. சாய்ந்த பிறகும் அதன் மூலைவிட்டங்களின் எந்தப் பண்பு மாறாது?'),
      explanation: pair('A quadrilateral is a polygon with four sides. A diagonal joins two vertices that are not neighbours. In a parallelogram, both pairs of opposite sides are parallel. Its diagonals meet at the midpoint of each diagonal.',
        'நான்கு பக்கங்கள் கொண்ட பலகோணம் நாற்கரம். அடுத்தடுத்து அமையாத இரு முனைகளை இணைக்கும் கோட்டுத்துண்டு மூலைவிட்டம். இணைகரத்தின் இரு சோடி எதிர்ப்பக்கங்களும் இணையானவை. அதன் மூலைவிட்டங்கள் இரண்டின் நடுப்புள்ளியும் அவை சந்திக்கும் ஒரே புள்ளியாகும்.'),
      activity: {
        label: pair('Change the frame', 'சட்டத்தின் வடிவத்தை மாற்று'),
        options: [
          option('Rectangle', 'செவ்வகம்', 'The crossing O is the midpoint of both diagonals. Here the two diagonals also have equal lengths.',
            'மூலைவிட்டங்கள் சந்திக்கும் புள்ளி O, இரண்டுக்கும் நடுப்புள்ளி. இந்தச் செவ்வகத்தில் மூலைவிட்டங்களின் நீளங்களும் சமம்.',
            quadrilateral(0, pair('Rectangle ABCD. Diagonals AC and BD are equal and bisect each other at O.',
              'செவ்வகம் ABCD. சம நீளமுள்ள மூலைவிட்டங்கள் AC, BD ஆகியவை O-இல் ஒன்றையொன்று இருசமக்கூறிடுகின்றன.')),
            'AO=OC,\\quad BO=OD,\\quad AC=BD'),
          option('Tilt the top', 'மேற்பக்கத்தைச் சாய்', 'The parallelogram keeps both pairs of sides parallel. O is still the midpoint of both diagonals, but now AC is longer than BD.',
            'சாய்த்த இணைகரத்திலும் இரு சோடி எதிர்ப்பக்கங்களும் இணையாகவே உள்ளன. O இரு மூலைவிட்டங்களுக்கும் நடுப்புள்ளியாகவே இருக்கிறது. இப்போது BD-ஐ விட AC நீளமானது.',
            quadrilateral(36, pair('Slanted parallelogram ABCD. The diagonals bisect each other, but AC is longer than BD.',
              'சாய்ந்த இணைகரம் ABCD. மூலைவிட்டங்கள் ஒன்றையொன்று இருசமக்கூறிடுகின்றன. BD-ஐ விட AC நீளமானது.')),
            'AO=OC,\\quad BO=OD,\\quad AC>BD'),
        ],
      },
      details: [
        detail('A convex polygon has every interior angle below 180°. A concave polygon has an interior angle above 180°. Splitting a quadrilateral into two triangles along an interior diagonal gives an interior angle sum of 360°. A convex polygon’s exterior angles, one per vertex taken in the same direction, add to 360°.',
          'குவிவுப் பலகோணத்தில் எல்லா உட்கோணங்களும் 180°-ஐ விடச் சிறியவை. குழிவுப் பலகோணத்தில் ஓர் உட்கோணம் 180°-ஐ விடப் பெரியது. நாற்கரத்தை அதன் உட்பகுதியில் அமைந்த மூலைவிட்டத்தால் இரு முக்கோணங்களாகப் பிரித்தால், உட்கோணங்களின் கூடுதல் 360° என்று தெரியும். ஒரு குவிவுப் பலகோணத்தில் ஒவ்வொரு முனையிலும் ஒரே திசையில் எடுக்கும் வெளிக்கோணங்களின் கூடுதலும் 360°.',
          '2\\times180^\\circ=360^\\circ'),
        detail('A trapezium has a pair of parallel opposite sides. In the textbook’s classification this includes parallelograms. In an isosceles trapezium the two non-parallel sides are equal and each pair of angles on a base is equal. A kite has two pairs of equal adjacent sides. Its symmetry diagonal is the perpendicular bisector of the other.',
          'ஒரு சோடி எதிர்ப்பக்கங்கள் இணையாக உள்ள நாற்கரம் சரிவகம். பாடநூலின் வகைப்பாட்டில் இணைகரங்களும் இதில் அடங்கும். இருசமபக்கச் சரிவகத்தில் இணையாக இல்லாத இரு பக்கங்களும் சமம்; ஒவ்வொரு அடிப்பக்கத்திலும் உள்ள இரு கோணங்களும் சமம். பட்டத்தில் அடுத்துள்ள சமப் பக்கங்கள் இரு சோடிகள் உள்ளன. அதன் சமச்சீர் மூலைவிட்டம் மற்ற மூலைவிட்டத்தின் மையக்குத்துக்கோடு.'),
        detail('A rectangle is a parallelogram with four right angles. A rhombus is a parallelogram with all sides equal and perpendicular diagonals. A square is both a rectangle and a rhombus.',
          'நான்கு செங்கோணங்கள் உடைய இணைகரம் செவ்வகம். எல்லாப் பக்கங்களும் சமமாகவும் மூலைவிட்டங்கள் செங்குத்தாகவும் உள்ள இணைகரம் சாய்சதுரம். சதுரம் செவ்வகமாகவும் சாய்சதுரமாகவும் இருக்கும்.'),
        detail('A diagonal cuts a parallelogram into two congruent triangles. The diagonal is a common side and each pair of opposite sides produces equal alternate angles, giving ASA. Corresponding parts give equal opposite sides and equal opposite angles. Adjacent angles are supplementary.',
          'ஒரு மூலைவிட்டம் இணைகரத்தை இரு சர்வசம முக்கோணங்களாகப் பிரிக்கிறது. மூலைவிட்டம் பொதுப்பக்கம்; இணையான எதிர்ப்பக்கங்கள் சமமான ஒன்றுவிட்ட கோணங்களைத் தருகின்றன. கோணம்–பக்கம்–கோணம் விதியால் சர்வசமம் கிடைக்கிறது. ஒத்த உறுப்புகளிலிருந்து எதிர்ப்பக்கங்களும் எதிர்க்கோணங்களும் சமம் என்று அறியலாம். அடுத்தடுத்த கோணங்கள் மிகை நிரப்புக் கோணங்கள்.'),
        detail('To recognise a parallelogram, it is enough to find a pair of opposite sides that are both parallel and equal. Joining their opposite ends as a diagonal gives two congruent triangles by SAS. Their equal alternate angles show that the other pair of opposite sides is parallel as well.',
          'ஓர் எதிர்ப்பக்கச் சோடி இணையாகவும் சமமாகவும் இருந்தாலே அது இணைகரம் என்று அறியலாம். ஒரு மூலைவிட்டத்தை வரைந்தால் பக்கம்–கோணம்–பக்கம் விதியால் இரு சர்வசம முக்கோணங்கள் கிடைக்கும். அவற்றின் சமமான ஒன்றுவிட்ட கோணங்கள் மற்ற எதிர்ப்பக்கச் சோடியும் இணை என்று காட்டுகின்றன.'),
        detail('Parallelograms with the same base and between the same parallel lines have the same perpendicular height, hence the same area. This also applies to two such triangles, each half the area of its corresponding parallelogram.',
          'ஒரே அடிப்பக்கத்தையும் ஒரே இணைக்கோடுகளுக்கு இடைப்பட்ட நிலையையும் கொண்ட இணைகரங்களுக்கு ஒரே செங்குத்து உயரம் இருப்பதால் அவற்றின் பரப்பளவுகள் சமம். அதே அமைப்பிலுள்ள இரு முக்கோணங்களின் பரப்பளவுகளும் சமம்; ஒவ்வொன்றும் அதற்குரிய இணைகரத்தின் பாதிப் பரப்பளவு.'),
      ],
      check: {
        hint: pair('Follow the diagonal that contains AO. What does its midpoint do to its length?',
          'AO அமைந்துள்ள அதே மூலைவிட்டத்தைக் கவனி. அதன் நடுப்புள்ளி அதை எப்படி இரண்டாகப் பிரிக்கிறது?'),
        question: pair('Diagonals AC and BD of a parallelogram meet at O. If AO is 7 cm, which segment must also measure 7 cm?',
          'ஓர் இணைகரத்தின் மூலைவிட்டங்கள் AC, BD ஆகியவை O-இல் சந்திக்கின்றன. AO = 7 செ.மீ எனில், எந்தக் கோட்டுத்துண்டின் நீளம் உறுதியாக 7 செ.மீ?'),
        options: [
          answer('OC', 'OC', 'O bisects AC, so OC and AO are the two equal halves of AC.',
            'O ஆனது AC-ஐ இருசமக்கூறிடுகிறது. எனவே OC, AO இரண்டும் AC-இன் சமமான பாதிகள்.', true),
          answer('BO', 'BO', 'BO equals OD. The two different diagonals need not have equal lengths in a parallelogram.',
            'BO-வும் OD-வும் சமம். ஓர் இணைகரத்தின் இரு வேறு மூலைவிட்டங்களும் சம நீளத்தில் அமைய வேண்டியதில்லை.'),
        ],
      },
      exercise: 'g9-ch4-ex4.2-q1',
      pages: pages('144–158', '150–164', '155–169', '161–175'),
    },
    {
      section: '4.4',
      title: pair('Parts of a circle', 'வட்டத்தின் பகுதிகள்'),
      intro: pair('Imagine cutting a round dosa. How is a piece bounded by one straight cut different from a piece cut from the centre?',
        'ஒரு வட்டத் தோசையை வெட்டுவதாகக் கருது. ஒரே நேர்க்கோட்டு வெட்டினால் கிடைக்கும் துண்டுக்கும் மையத்திலிருந்து இரு வெட்டுகளால் கிடைக்கும் துண்டுக்கும் என்ன வேறுபாடு?'),
      explanation: pair('Every point of a circle sits at the same distance from its centre O. That distance is the radius. A chord is straight and joins two points on the circle. An arc follows the circular boundary between those points.',
        'வட்டத்தின் மேல் உள்ள எல்லாப் புள்ளிகளும் அதன் மையம் O-விலிருந்து சம தொலைவில் உள்ளன. அந்தத் தொலைவு ஆரம். வட்டத்தின் மேல் உள்ள இரு புள்ளிகளை இணைக்கும் நேர்க்கோட்டுத் துண்டு நாண். அந்த இரு புள்ளிகளுக்கிடையில் வட்டத்தின் எல்லை வழியாகச் செல்லும் வளைவு வட்டவில்.'),
      activity: {
        label: pair('Highlight a part', 'ஒரு பகுதியைத் தேர்ந்தெடு'),
        options: [
          option('Radius', 'ஆரம்', 'OB runs from the centre to the circle. All such segments have the same length.',
            'OB மையத்திலிருந்து வட்டத்தின் மேல் உள்ள புள்ளியைச் சேர்கிறது. இத்தகைய எல்லாக் கோட்டுத்துண்டுகளும் சம நீளமுடையவை.',
            circlePart('radius', pair('Radius OB joins centre O to point B on the circle.', 'ஆரம் OB, மையம் O-வையும் வட்டத்தின் மேலுள்ள B-யையும் இணைக்கிறது.'))),
          option('Diameter', 'விட்டம்', 'AB joins two boundary points and passes through O. It is the longest chord and is twice the radius.',
            'வட்டத்தின் மேல் உள்ள இரு புள்ளிகளை இணைக்கும் AB, மையம் O வழியாகச் செல்கிறது. அது மிக நீளமான நாண். அதன் நீளம் ஆரத்தின் இருமடங்கு.',
            circlePart('diameter', pair('Diameter AB passes through centre O and joins opposite points of the circle.',
              'விட்டம் AB மையம் O வழியாகச் சென்று வட்டத்தின் எதிரெதிர்ப் புள்ளிகளை இணைக்கிறது.')),
            'AB=2\\times OB'),
          option('Chord', 'நாண்', 'AB is a straight segment joining two points on the circle. This chord does not pass through the centre.',
            'வட்டத்தின் மேலுள்ள இரு புள்ளிகளை AB என்ற நேர்க்கோட்டுத் துண்டு இணைக்கிறது. இந்த நாண் மையம் வழியாகச் செல்லவில்லை.',
            circlePart('chord', pair('Chord AB joins two points of the circle and does not pass through centre O.',
              'நாண் AB, வட்டத்தின் மேலுள்ள இரு புள்ளிகளை இணைக்கிறது. அது மையம் O வழியாகச் செல்லவில்லை.'))),
          option('Arc', 'வட்டவில்', 'The orange arc follows the shorter way around the circle from A to B. The longer route is the major arc.',
            'ஆரஞ்சு நிற வட்டவில், A முதல் B வரை வட்டத்தின் குறுகிய வழியைப் பின்பற்றுகிறது. நீளமான வழியே பெரிய வில்.',
            circlePart('arc', pair('The shorter circular arc between A and B is highlighted.', 'A, B இடையில் உள்ள சிறிய வட்டவில் தனித்துக் காட்டப்பட்டுள்ளது.'))),
          option('Segment', 'வட்டத்துண்டு', 'A chord and an arc bound the shaded segment. The chord also bounds a larger segment on the other side.',
            'ஒரு நாணும் ஒரு வில்லும் வண்ணமிட்ட வட்டத்துண்டை அடைக்கின்றன. அதே நாணின் மறுபுறத்தில் பெரிய வட்டத்துண்டு அமைகிறது.',
            circlePart('segment', pair('The shaded segment is bounded by the minor arc and its chord.', 'சிறிய வில்லும் அதன் நாணும் வண்ணமிட்ட வட்டத்துண்டை அடைக்கின்றன.'))),
          option('Sector', 'வட்டக்கோணப் பகுதி', 'Two radii and an arc enclose the shaded sector. The two radii meet at the centre.',
            'இரு ஆரங்களும் ஒரு வில்லும் வண்ணமிட்ட வட்டக்கோணப் பகுதியை அடைக்கின்றன. அந்த இரு ஆரங்களும் மையத்தில் சந்திக்கின்றன.',
            circlePart('sector', pair('The shaded sector is bounded by two radii from O and the arc between their ends.',
              'O-இலிருந்து வரையும் இரு ஆரங்களும் அவற்றின் முனைகளுக்கு இடையே உள்ள வில்லும் வண்ணமிட்ட பகுதியை அடைக்கின்றன.'))),
        ],
      },
      details: [
        detail('A line that crosses a circle in two points is a secant. The part of that line between the crossings is a chord. Circumference names the circular boundary.',
          'வட்டத்தை இரு புள்ளிகளில் வெட்டும் கோடு வெட்டும்கோடு. அந்த இரு வெட்டுப் புள்ளிகளுக்கு இடையில் உள்ள கோட்டுத்துண்டு நாண். வட்டத்தின் எல்லை பரிதி எனப்படும்.'),
        detail('The textbook uses a curved mark above arc names. Naming a point in the middle distinguishes two arcs with the same endpoints. Arc ACB goes from A to B via C.',
          'பாடநூலில் வில்லின் பெயருக்கு மேலே வளைவுக் குறி இருக்கும். ஒரே முனைகளைக் கொண்ட இரு வில்களை வேறுபடுத்த, நடுவில் ஒரு புள்ளியின் பெயரையும் எழுதலாம். வில் ACB என்பது A-இலிருந்து C வழியாக B வரை செல்கிறது.'),
        detail('A diameter gives two semicircles. In the same circle, arcs with equal central angles are congruent. Concentric circles share a centre. Circles with equal radii are congruent.',
          'விட்டம் இரு அரைவட்டங்களை உருவாக்குகிறது. ஒரே வட்டத்தில் மையத்தில் சம கோணங்களைத் தாங்கும் வில்கள் ஒருங்கிசைவு வில்கள். பொது மைய வட்டங்களுக்கு ஒரே மையம் உண்டு. சம ஆரங்களைக் கொண்ட வட்டங்கள் சர்வசம வட்டங்கள்.'),
        detail('For a point P, compare the distance OP with the radius r to tell whether P is inside, on, or outside. The symbol OP denotes the distance from O to P.',
          'P என்ற புள்ளி வட்டத்தின் உள்ளேயா, மேலா, வெளியேயா என அறிய OP தொலைவை ஆரம் r உடன் ஒப்பிடு. OP என்பது O-விலிருந்து P வரையிலான தொலைவு.',
          'OP<r,\\qquad OP=r,\\qquad OP>r'),
        detail('Many circles can pass through one or two points. Exactly one passes through three non-collinear points. The point where two side perpendicular bisectors meet is equally far from all three vertices and is the centre. A straight line can meet a circle in at most two points, so three collinear points cannot lie on one circle.',
          'ஒன்று அல்லது இரண்டு புள்ளிகள் வழியாகப் பல வட்டங்கள் செல்லலாம். ஒரே கோட்டில் அமையாத மூன்று புள்ளிகள் வழியாக ஒரே ஒரு வட்டம் செல்லும். முக்கோணத்தின் இரு பக்க மையக்குத்துக்கோடுகள் சந்திக்கும் புள்ளி மூன்று முனைகளிலிருந்தும் சம தொலைவில் இருக்கும். அதுவே வட்டத்தின் மையம். ஒரு நேர்க்கோடு ஒரு வட்டத்தை அதிகபட்சம் இரு புள்ளிகளில் சந்திக்கும்; எனவே ஒரே நேர்க்கோட்டிலுள்ள மூன்று புள்ளிகள் ஒரு வட்டத்தின் மீது அமைய முடியாது.'),
      ],
      check: {
        hint: pair('Look for the shape whose straight edges meet at the centre.',
          'நேரான இரு எல்லைகளும் மையத்தில் சந்திக்கும் பகுதியைத் தேடு.'),
        question: pair('Which term describes a region bounded by two radii and the arc between them?',
          'இரு ஆரங்களும் அவற்றுக்கு இடையிலுள்ள வில்லும் அடைக்கும் பகுதியின் பெயர் என்ன?'),
        options: [
          answer('Sector', 'வட்டக்கோணப் பகுதி', 'The two straight boundaries of a sector start at the centre.',
            'வட்டக்கோணப் பகுதியின் இரு நேரான எல்லைகளும் வட்ட மையத்திலிருந்து தொடங்குகின்றன.', true),
          answer('Segment', 'வட்டத்துண்டு', 'A segment has one straight boundary: a chord from one point on the circle to another.',
            'வட்டத்துண்டுக்கு ஒரே ஒரு நேரான எல்லை உண்டு. அது வட்டத்தின் மேல் உள்ள இரு புள்ளிகளை இணைக்கும் நாண்.'),
        ],
      },
      exercise: 'g9-ch4-ex4.3-q3',
      pages: pages('159–162', '165–168', '170–174', '176–180'),
    },
    {
      section: '4.5',
      title: pair('Chords, distances and angles', 'நாண்கள், தொலைவுகள், கோணங்கள்'),
      intro: pair('Move a chord toward the edge of its circle. Why does it get shorter even though the radius stays the same?',
        'ஒரு நாணை வட்டத்தின் விளிம்பை நோக்கி நகர்த்து. ஆரம் மாறாதபோதும் நாண் ஏன் குறுகுகிறது?'),
      explanation: pair('Draw OM from the centre O perpendicular to chord AB. Its foot M bisects AB: right triangles OMA and OMB have equal hypotenuses (radii) and a common leg OM. The perpendicular distance OM controls the chord length.',
        'வட்ட மையம் O-விலிருந்து நாண் AB-க்குச் செங்குத்தாக OM-ஐ வரை. அது நாணைச் சந்திக்கும் புள்ளி M, நாணின் நடுப்புள்ளி. OMA, OMB ஆகிய செங்கோண முக்கோணங்களின் கர்ணங்கள் ஆரங்கள் என்பதால் சமம்; OM பொதுப்பக்கம். மையத்துக்கும் நாணுக்கும் இடையிலான செங்குத்துத் தொலைவு OM, நாணின் நீளத்தை நிர்ணயிக்கிறது.'),
      math: '\\begin{aligned}AM&=MB\\\\AM^2+OM^2&=OA^2\\end{aligned}',
      activity: {
        label: pair('Set the distance OM from the centre', 'மையத்திலிருந்து நாணுக்கான செங்குத்துத் தொலைவு OM-ஐ மாற்று'),
        options: [
          option('3 units', '3 அலகுகள்', 'The radius is 5. The perpendicular makes two right triangles. Each half-chord has length 4, so AB is 8.',
            'ஆரம் 5 அலகுகள். செங்குத்துக்கோடு இரு செங்கோண முக்கோணங்களை உருவாக்குகிறது. நாணின் ஒவ்வொரு பாதியும் 4 அலகுகள்; எனவே AB-இன் நீளம் 8 அலகுகள்.',
            chordDistance(5, 3, pair('Radius OA is 5, OM is 3, and the two halves AM and MB are 4 each.',
              'ஆரம் OA 5 அலகுகள், OM 3 அலகுகள்; AM, MB ஆகியவை தலா 4 அலகுகள்.')),
            'AM=\\sqrt{5^2-3^2}=4,\\qquad AB=8'),
          option('4 units', '4 அலகுகள்', 'Now the same radius leaves only 3 units for each half-chord. The new chord is 6 units long.',
            'ஆரம் மாறவில்லை. இப்போது நாணின் ஒவ்வொரு பாதியும் 3 அலகுகள். புதிய நாணின் நீளம் 6 அலகுகள்.',
            chordDistance(5, 4, pair('Radius OA is 5, OM is 4, and the two halves AM and MB are 3 each.',
              'ஆரம் OA 5 அலகுகள், OM 4 அலகுகள்; AM, MB ஆகியவை தலா 3 அலகுகள்.')),
            'AM=\\sqrt{5^2-4^2}=3,\\qquad AB=6'),
        ],
      },
      details: [
        detail('The converse uses a chord whose midpoint M differs from O. The two triangles have three equal corresponding sides, so their equal angles at M add up to 180° and are each right angles. For a diameter the midpoint is O itself, so the segment OM cannot determine a line.',
          'மறுதலையில் நாணின் நடுப்புள்ளி M, மையம் O-விலிருந்து வேறுபட்டிருக்க வேண்டும். இரு முக்கோணங்களின் மூன்று ஒத்த பக்கங்களும் சமம். M-இல் உள்ள சம கோணங்களின் கூடுதல் 180° என்பதால் அவை இரண்டும் செங்கோணங்கள். விட்டத்தின் நடுப்புள்ளியே O என்பதால், அப்போது OM எந்தத் திசையையும் காட்டாது.'),
        detail('In the same circle, equal chords subtend equal smaller central angles and are at equal perpendicular distances from the centre. Both converses hold. The results also hold in congruent circles because their radii are equal. Chords from circles with different radii require separate comparisons.',
          'ஒரே வட்டத்தில் சம நாண்கள் மையத்தில் சமமான சிறிய கோணங்களைத் தாங்கும். அவை மையத்திலிருந்து சமமான செங்குத்துத் தொலைவில் அமையும். இரு கூற்றுகளின் மறுதலைகளும் உண்மை. ஆரங்கள் சமமாக இருப்பதால் சர்வசம வட்டங்களுக்கும் இவை பொருந்தும். ஆரங்கள் மாறினால் நாண்களைத் தனித்தனியாக ஒப்பிட வேண்டும்.'),
        detail('An arc subtends an angle when its endpoints are joined to the vertex. For the arc AB that does not contain P, the angle at O along that arc is twice ∠APB. Use the reflex central angle when the intercepted arc is the major arc.',
          'வில்லின் இரு முனைகளையும் ஒரு முனைப்புள்ளியுடன் இணைக்கும்போது, அந்த வில் அங்கு ஒரு கோணத்தைத் தாங்குகிறது. P அடங்காத AB வில்லை எடுத்தால், அந்த வில்லுக்கு உரிய மையக் கோணம் ∠APB-ஐப் போல இருமடங்கு. அது பெரிய வில் எனில், மையத்தில் உள்ள பின்வளைக்கோணத்தைப் பயன்படுத்து.'),
        detail('Angles standing on the same chord from the same segment are equal. A semicircle gives a right angle. In the major segment the angle is acute (it intercepts the minor arc). In the minor segment it is obtuse.',
          'ஒரே நாணின் ஒரே வட்டத்துண்டில் அமையும் கோணங்கள் சமம். அரைவட்டத்தில் அமையும் கோணம் செங்கோணம். பெரிய வட்டத்துண்டின் கோணம் சிறிய வில்லைத் தாங்குவதால் அது குறுங்கோணம். சிறிய வட்டத்துண்டில் அமைவது விரிகோணம்.'),
      ],
      check: {
        hint: pair('Draw the radius to one end of the chord. Identify the hypotenuse and the leg that is half the chord.',
          'நாணின் ஒரு முனைக்கு ஆரம் வரை. அப்போது உருவாகும் செங்கோண முக்கோணத்தின் கர்ணத்தையும் நாணின் பாதியாக அமையும் பக்கத்தையும் கண்டுபிடி.'),
        question: pair('A chord lies 5 cm from the centre of a circle of radius 13 cm. How long is the chord?',
          '13 செ.மீ ஆரமுள்ள வட்டத்தில் ஒரு நாண் மையத்திலிருந்து 5 செ.மீ செங்குத்துத் தொலைவில் உள்ளது. நாணின் நீளம் என்ன?'),
        options: [
          answer('24 cm', '24 செ.மீ', 'Pythagoras gives 12 cm for one half. The perpendicular bisects the chord, so double 12.',
            'பிதாகரஸ் தேற்றத்தால் நாணின் ஒரு பாதி 12 செ.மீ. செங்குத்துக்கோடு நாணை இருசமக்கூறிடுவதால் 12-ஐ இருமடங்காக்கு.', true),
          answer('12 cm', '12 செ.மீ', 'The right triangle reaches from the midpoint to just one endpoint. Its 12 cm leg is only half the chord.',
            'செங்கோண முக்கோணத்தில் உள்ள 12 செ.மீ பக்கம், நடுப்புள்ளியிலிருந்து ஒரு முனை வரையே செல்கிறது. அது நாணின் பாதி மட்டுமே.'),
        ],
      },
      exercise: 'g9-ch4-ex4.3-q4',
      pages: pages('162–170', '168–176', '174–181', '180–187'),
    },
    {
      section: '4.6',
      title: pair('Cyclic quadrilaterals', 'வட்ட நாற்கரங்கள்'),
      intro: pair('Four pegs sit on the rim of a circle. Move one peg. What happens to the sum of two opposite angles?',
        'ஒரு வட்டத்தின் விளிம்பில் நான்கு ஆணிகள் உள்ளன. ஓர் ஆணியை நகர்த்து. இரு எதிர்க்கோணங்களின் கூடுதல் என்ன ஆகும்?'),
      explanation: pair('A quadrilateral is cyclic when all four vertices lie on one circle. The arcs intercepted by opposite angles together make the whole circle. The vertex angles measure half their intercepted arcs, so opposite angles add to 180°.',
        'ஒரு நாற்கரத்தின் நான்கு முனைகளும் ஒரே வட்டத்தின் மேல் அமைந்தால் அது வட்ட நாற்கரம். எதிர்க்கோணங்கள் தாங்கும் வில்கள் சேர்ந்து முழு வட்டத்தை உருவாக்குகின்றன. ஒவ்வொரு பரிதிக் கோணமும் அது தாங்கும் வில்லுக்கு உரிய மையக் கோணத்தின் பாதி. ஆகவே எதிர்க்கோணங்களின் கூடுதல் 180°.'),
      math: '\\angle A+\\angle C=180^\\circ',
      activity: {
        label: pair('Move peg D along the circle', 'ஆணி D-ஐ வட்டத்தின் மீது நகர்த்து'),
        options: [
          option('First position', 'முதல் இடம்', 'Angle A intercepts the 160° arc through B, C and D. Angle C intercepts the other 200°. Halving gives 80° and 100°.',
            '∠A தாங்கும் B, C, D வழியிலான வில்லுக்கு உரிய மையக் கோணம் 160°. ∠C தாங்கும் மறுபுற வில்லுக்கு 200°. பாதி எடுத்தால் முறையே 80°, 100° கிடைக்கும்.',
            cyclic(350, pair('Cyclic quadrilateral ABCD with opposite angles A of 80 degrees and C of 100 degrees.',
              'வட்ட நாற்கரம் ABCD-இன் எதிர்க்கோணங்களில் A 80 பாகை, C 100 பாகை.')),
            '80^\\circ+100^\\circ=180^\\circ'),
          option('Move D upward', 'D-ஐ மேலே நகர்த்து', 'Angle A grows to 95° and angle C falls to 85°. The intercepted arcs still account for the full circle.',
            '∠A 95° ஆக அதிகரிக்கிறது. ∠C 85° ஆகக் குறைகிறது. அவை தாங்கும் வில்கள் சேர்ந்து முழு வட்டமாகவே இருக்கின்றன.',
            cyclic(380, pair('D has moved upward on the circle. A is now 95 degrees and C is 85 degrees.',
              'D வட்டத்தின் மீது மேலே நகர்ந்துள்ளது. இப்போது A 95 பாகை, C 85 பாகை.')),
            '95^\\circ+85^\\circ=180^\\circ'),
        ],
      },
      details: [
        detail('The converse holds for a simple convex quadrilateral. If one pair of opposite angles is supplementary, its four vertices lie on a circle.',
          'குவிவு நாற்கரத்தில் மறுதலையும் உண்மை. ஒரு சோடி எதிர்க்கோணங்கள் மிகை நிரப்புக் கோணங்களாக இருந்தால், அதன் நான்கு முனைகளும் ஒரே வட்டத்தில் அமையும்.'),
        detail('Extend one side of a cyclic quadrilateral. The exterior angle and the adjacent interior angle are a linear pair. The opposite interior angle also adds to 180° with that same interior angle. Thus the exterior angle equals the opposite interior angle.',
          'வட்ட நாற்கரத்தின் ஒரு பக்கத்தை நீட்டு. உருவாகும் வெளிக்கோணமும் அடுத்துள்ள உட்கோணமும் நேரிய கோணச் சோடி. அந்த உட்கோணத்துடன் எதிர் உட்கோணத்தைச் சேர்த்தாலும் 180° கிடைக்கும். எனவே வெளிக்கோணம் உள்ளெதிர்க் கோணத்துக்குச் சமம்.'),
      ],
      check: {
        hint: pair('Opposite angles of a cyclic quadrilateral complete a straight angle.',
          'வட்ட நாற்கரத்தின் எதிர்க்கோணங்கள் சேர்ந்து ஒரு நேர்க்கோணத்தை நிறைவு செய்கின்றன.'),
        question: pair('A cyclic quadrilateral has an interior angle of 118°. What is the opposite interior angle?',
          'ஒரு வட்ட நாற்கரத்தின் ஓர் உட்கோணம் 118°. அதன் எதிர் உட்கோணம் என்ன?'),
        options: [
          answer('62°', '62°', 'The two opposite angles are supplementary, so subtract 118° from 180°.',
            'இரு எதிர்க்கோணங்களும் மிகை நிரப்புக் கோணங்கள். எனவே 180°-லிருந்து 118°-ஐக் கழிக்க வேண்டும்.', true),
          answer('118°', '118°', 'In a cyclic quadrilateral, opposite angles add to 180°. Equal opposite angles are a parallelogram property.',
            'வட்ட நாற்கரத்தின் எதிர்க்கோணங்களின் கூடுதல் 180°. எதிர்க்கோணங்கள் சமம் என்பது இணைகரத்தின் பண்பு.'),
        ],
      },
      exercise: 'g9-ch4-ex4.4-q1',
      pages: pages('170–173', '176–179', '181–184', '187–190'),
    },
    {
      section: '4.7',
      title: pair('Construct four triangle centres', 'முக்கோணத்தின் நான்கு மையங்களை வரைதல்'),
      intro: pair('How would you find where a triangle balances, or draw a circle through all three corners? Try four different pairs of construction lines on one triangle.',
        'ஒரு முக்கோணத்தைச் சமநிலையில் வைக்கும் புள்ளியை எப்படிக் காண்பாய்? அதன் மூன்று முனைகள் வழியாக ஒரு வட்டத்தை எப்படி வரைவாய்? ஒரே முக்கோணத்தில் வெவ்வேறு கோடுகளை வரைந்து பார்.'),
      explanation: pair('Two lines of the same construction type locate each centre. A third line of that type passes through the same point and checks the construction. A dashed line in the diagram shows a check or guide.',
        'ஒரே முறையில் வரையப்படும் இரு கோடுகள் சந்திக்கும் இடமே அதற்குரிய மையம். அதே முறையில் வரையும் மூன்றாவது கோடும் அந்தப் புள்ளி வழியாகச் செல்லும். அதைக் கொண்டு வரைந்ததைச் சரிபார்க்கலாம். படத்தில் இடைவெளியிட்ட கோடுகள் வழிகாட்டுகின்றன அல்லது வரைதலைச் சரிபார்க்க உதவுகின்றன.'),
      activity: {
        label: pair('Choose a pair of construction lines', 'வரைய வேண்டிய கோட்டுச் சோடியைத் தேர்ந்தெடு'),
        options: [
          option('Medians', 'நடுக்கோடுகள்', 'Join A and C to the midpoints of their opposite sides. Their medians meet at centroid G. Each median divides at G in the ratio 2:1 measured from the vertex.',
            'A, C ஆகிய முனைகளை அவற்றின் எதிர்ப்பக்க நடுப்புள்ளிகளுடன் இணை. அந்த நடுக்கோடுகள் நடுக்கோட்டு மையம் G-இல் சந்திக்கும். முனையிலிருந்து அளக்கும்போது G ஒவ்வொரு நடுக்கோட்டையும் 2:1 விகிதத்தில் பிரிக்கிறது.',
            triangleCentre('centroid', pair('Medians of triangle ABC, drawn from vertices to opposite side midpoints, meet at centroid G.',
              'முக்கோணம் ABC-இன் முனைகளிலிருந்து எதிர்ப்பக்க நடுப்புள்ளிகளுக்கு வரையும் நடுக்கோடுகள் நடுக்கோட்டு மையம் G-இல் சந்திக்கின்றன.'))),
          option('Altitudes', 'குத்துக்கோடுகள்', 'Through A and C, draw lines perpendicular to their opposite sides. In this right triangle they are the sides AB and CB. They meet at the right-angle vertex B, which is the orthocentre H.',
            'A, C வழியாக அவற்றின் எதிர்ப்பக்கங்களுக்குச் செங்குத்துக் கோடுகளை வரை. இந்தச் செங்கோண முக்கோணத்தில் அவை AB, CB ஆகிய பக்கங்களே. அவை செங்கோண முனை B-இல் சந்திக்கும். அப்புள்ளியே குத்துக்கோட்டு மையம் H.',
            triangleCentre('orthocentre', pair('Two altitudes are the legs of the right triangle. The orthocentre H is vertex B.',
              'செங்கோண முக்கோணத்தின் இரு செங்குத்துப் பக்கங்களே இரு குத்துக்கோடுகள். குத்துக்கோட்டு மையம் H, முனை B-இல் உள்ளது.'))),
          option('Perpendicular bisectors', 'மையக்குத்துக்கோடுகள்', 'Draw perpendicular lines through the midpoints of AB and BC. They meet at circumcentre S. Put the compass point at S and open it to a vertex. That circle passes through all three vertices.',
            'AB, BC ஆகியவற்றின் நடுப்புள்ளிகளில் செங்குத்துக் கோடுகளை வரை. அவை சுற்றுவட்டமையம் S-இல் சந்திக்கும். கவராயத்தின் முள்ளை S-இல் வைத்து, ஒரு முனை வரை விரித்து வட்டம் வரை. அது மூன்று முனைகள் வழியாகவும் செல்லும்.',
            triangleCentre('circumcentre', pair('Perpendicular bisectors meet at S, the midpoint of the hypotenuse. The circle centred at S passes through all vertices.',
              'மையக்குத்துக்கோடுகள் கர்ணத்தின் நடுப்புள்ளி S-இல் சந்திக்கின்றன. S-ஐ மையமாகக் கொண்ட சுற்றுவட்டம் மூன்று முனைகள் வழியாகவும் செல்கிறது.'))),
          option('Angle bisectors', 'கோண இருசமவெட்டிகள்', 'Bisect angles A and B. Their bisectors meet at incentre I. Drop a perpendicular from I to a side. Use that distance as the radius of the incircle, which touches all three sides.',
            'A, B ஆகிய கோணங்களை இரு சமபாகங்களாகப் பிரிக்கும் கோடுகளை வரை. அவை உள்வட்டமையம் I-இல் சந்திக்கும். I-இலிருந்து ஒரு பக்கத்துக்குச் செங்குத்துக் கோடு வரை. I-ஐ மையமாகவும் அந்தத் தொலைவை ஆரமாகவும் கொண்டு வரையும் உள்வட்டம் மூன்று பக்கங்களையும் தொடும்.',
            triangleCentre('incentre', pair('The angle bisectors meet at I. The incircle centred at I touches all three sides.',
              'கோண இருசமவெட்டிகள் I-இல் சந்திக்கின்றன. I-ஐ மையமாகக் கொண்ட உள்வட்டம் மூன்று பக்கங்களையும் தொடுகிறது.'))),
        ],
      },
      details: [
        detail('On paper, use equal compass arcs from the ends of a side, with an opening greater than half that side. Join the two arc crossings to draw the perpendicular bisector. The line meets the side at its midpoint. For an altitude, make a perpendicular through a vertex to the opposite side or its extension.',
          'தாளில் ஒரு பக்கத்தின் இரு முனைகளிலிருந்தும் சம ஆரத்துடன் கவராய வில்களை வரை. கவராயத் திறப்பு அந்தப் பக்கத்தின் பாதிக்கு மேல் இருக்க வேண்டும். வில்கள் சந்திக்கும் இரு புள்ளிகளை இணைத்தால் மையக்குத்துக்கோடு கிடைக்கும். அது பக்கத்தை அதன் நடுப்புள்ளியில் சந்திக்கும். குத்துக்கோட்டுக்கு, ஒரு முனை வழியாக எதிர்ப்பக்கத்துக்கோ அதன் நீட்சிக்கோ செங்குத்துக் கோடு வரை.'),
        detail('To bisect an angle, draw an arc centred at the vertex that cuts both rays. From those two cut points draw equal arcs that meet inside the angle, then join that meeting point to the vertex.',
          'ஒரு கோணத்தை இருசமமாகப் பிரிக்க, அதன் முனையை மையமாகக் கொண்டு இரு கதிர்களையும் வெட்டும் வில்லை வரை. வெட்டிய இரு புள்ளிகளிலிருந்து சம ஆரமுள்ள வில்களை வரை. அவை கோணத்தின் உள்ளே சந்திக்கும் புள்ளியை முனையுடன் இணை.'),
        detail('The centroid and incentre are always inside. For acute triangles the orthocentre and circumcentre are inside, and for obtuse triangles they are outside. For a right triangle they sit at the right-angle vertex and hypotenuse midpoint, respectively.',
          'நடுக்கோட்டு மையமும் உள்வட்டமையமும் எப்போதும் முக்கோணத்தின் உள்ளே இருக்கும். குறுங்கோண முக்கோணத்தில் குத்துக்கோட்டு மையமும் சுற்றுவட்டமையமும் உள்ளே இருக்கும்; விரிகோண முக்கோணத்தில் இரண்டும் வெளியே இருக்கும். செங்கோண முக்கோணத்தில் அவை முறையே செங்கோண முனையிலும் கர்ணத்தின் நடுப்புள்ளியிலும் அமையும்.'),
      ],
      check: {
        hint: pair('The circle touches sides, so its radius is a perpendicular distance to a side. Where are points equally far from the sides of an angle?',
          'வட்டம் பக்கங்களைத் தொடுவதால், ஆரம் என்பது மையத்திலிருந்து ஒரு பக்கத்துக்குள்ள செங்குத்துத் தொலைவு. ஒரு கோணத்தின் இரு பக்கங்களிலிருந்தும் சம தொலைவிலுள்ள புள்ளிகள் எங்கு அமையும்?'),
        question: pair('You want to draw a circle touching all three sides of a triangle. Which lines locate its centre?',
          'முக்கோணத்தின் மூன்று பக்கங்களையும் தொடும் வட்டத்தை வரைய விரும்புகிறாய். அதன் மையத்தைக் காண எந்தக் கோடுகளை வரைய வேண்டும்?'),
        options: [
          answer('Angle bisectors', 'கோண இருசமவெட்டிகள்', 'An angle-bisector point is equally far from the two sides of the angle. At the incentre the distances to all three sides match.',
            'கோண இருசமவெட்டியில் உள்ள புள்ளி அந்தக் கோணத்தின் இரு பக்கங்களிலிருந்தும் சம தொலைவில் இருக்கும். உள்வட்டமையம் மூன்று பக்கங்களிலிருந்தும் சம தொலைவில் உள்ளது.', true),
          answer('Perpendicular bisectors', 'மையக்குத்துக்கோடுகள்', 'Their crossing is equally far from the vertices. It locates the centre for a circle through the vertices.',
            'அவை சந்திக்கும் புள்ளி மூன்று முனைகளிலிருந்தும் சம தொலைவில் இருக்கும். அது முனைகள் வழியாகச் செல்லும் சுற்றுவட்டத்தின் மையத்தைக் காட்டும்.'),
        ],
      },
      exercise: 'g9-ch4-ex4.5-q1',
      additionalExercises: ['g9-ch4-ex4.6-q1'],
      pages: pages('174–180', '180–186', '185–192', '191–198'),
    },
  ];
})();
