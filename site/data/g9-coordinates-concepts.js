/* Original bilingual lessons for the 2025 Tamil Nadu Grade 9 textbooks.
 * Section 5.3 retains its own lesson data, route and video.
 */
(() => {
  'use strict';

  const copy = (en, ta) => ({en, ta});
  const pages = (enPrinted, enPdf, taPrinted, taPdf) => ({
    en: {printed: enPrinted, pdf: enPdf},
    ta: {printed: taPrinted, pdf: taPdf}
  });
  const option = (label, result, diagram, math) => ({label, result, diagram, math});
  const answer = (label, feedback, correct = false) => ({label, feedback, correct});
  const detail = (text, math) => ({text, math});
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const choose = (value, lang) => value[lang === 'ta' ? 'ta' : 'en'];
  const signed = n => String(n).replace('-', '−');
  const pair = ([x, y]) => `(${signed(x)}, ${signed(y)})`;
  const between = (a, b, fraction) => a.map((value, i) => value + (b[i] - value) * fraction);
  const positiveGrid = {minX: 0, maxX: 8, minY: 0, maxY: 5};
  const centeredGrid = {minX: -5, maxX: 5, minY: -4, maxY: 4};

  // Use the same scale on both axes, including diagrams with negative coordinates.
  function drawGrid(lang, {description, bounds = centeredGrid, points, lines = [], quadrants = false}) {
    const {minX, maxX, minY, maxY} = bounds;
    const step = Math.min(28, 248 / (maxX - minX));
    const x = value => 170 + step * (value - (minX + maxX) / 2);
    const y = value => 24 + step * (maxY - value);
    const bottom = y(minY);
    const width = 340;
    const height = bottom + 27;
    const desc = escape(choose(description, lang));
    const path = (a, b) => `M${x(a[0])} ${y(a[1])}L${x(b[0])} ${y(b[1])}`;
    const grid = [];
    const ticks = [];
    for (let i = minX; i <= maxX; i++) {
      grid.push(path([i, minY], [i, maxY]));
      if (i !== 0) ticks.push(`<text x="${x(i)}" y="${bottom + 15}" text-anchor="middle">${signed(i)}</text>`);
    }
    for (let i = minY; i <= maxY; i++) {
      grid.push(path([minX, i], [maxX, i]));
      if (i !== 0) ticks.push(`<text x="${x(minX) - 9}" y="${y(i) + 4}" text-anchor="end">${signed(i)}</text>`);
    }
    const quadrantLabels = quadrants
      ? [[3.75, 3, 'I'], [-3.75, 3, 'II'], [-3.75, -3, 'III'], [3.75, -3, 'IV']]
        .map(([a, b, label]) => `<text x="${x(a)}" y="${y(b)}" text-anchor="middle">${label}</text>`).join('')
      : '';
    const marks = points.map(({at, name, active = false, dx = 8, dy = -9, anchor = 'start'}) => {
      const [a, b] = at;
      const color = active ? '#13594e' : '#23416b';
      return `<circle cx="${x(a)}" cy="${y(b)}" r="${active ? 5 : 4}" fill="${color}" stroke="white" stroke-width="1.3"/>` +
        `<text x="${x(a) + dx}" y="${y(b) + dy}" text-anchor="${anchor}" fill="${color}" font-weight="650" stroke="#f8fafc" stroke-width="3" paint-order="stroke">${escape(name)}</text>`;
    }).join('');
    const edges = lines.map(({from, to, color = '#33698b', dashed = false}) =>
      `<path d="${path(from, to)}" fill="none" stroke="${color}" stroke-width="${dashed ? 1.8 : 2.8}"${dashed ? ' stroke-dasharray="4 3"' : ''}/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="display:block;max-width:100%;height:auto;margin-inline:auto" role="img" aria-label="${desc}">` +
      `<title>${desc}</title><rect width="${width}" height="${height}" rx="10" fill="#f8fafc"/>` +
      `<path d="${grid.join(' ')}" fill="none" stroke="#dce5ed"/>` +
      `<path d="${path([minX, 0], [maxX, 0])} ${path([0, minY], [0, maxY])}" fill="none" stroke="#475b74" stroke-width="1.5"/>` +
      `<g fill="#475b74" font-family="system-ui,sans-serif" font-size="13">${ticks.join('')}${quadrantLabels}` +
      `<text x="${x(maxX) + 9}" y="${y(0) + 4}">x</text><text x="${x(0) + 6}" y="17">y</text>` +
      `<text x="${x(0) - 6}" y="${y(0) + 15}" text-anchor="end">O</text>${edges}${marks}</g></svg>`;
  }

  function mapOption(label, at, description) {
    return option(label, description, lang => drawGrid(lang, {
      description, bounds: positiveGrid,
      points: [{at, name: `P${pair(at)}`, active: true}],
      lines: [
        {from: [0, 0], to: [at[0], 0], color: '#13594e'},
        {from: [at[0], 0], to: at, color: '#13594e', dashed: true}
      ]
    }));
  }

  function plotOption(label, at, description) {
    return option(label, description, lang => drawGrid(lang, {
      description, quadrants: true,
      points: [{
        at, name: `P${pair(at)}`, active: true,
        dx: at[0] > 0 ? 8 : -8, anchor: at[0] > 0 ? 'start' : 'end'
      }],
      lines: [
        {from: [0, 0], to: [at[0], 0], color: '#13594e'},
        {from: [at[0], 0], to: at, color: '#13594e', dashed: true}
      ]
    }));
  }

  function midpointOption(label, b, description, math) {
    const a = [-4, 2];
    const mid = between(a, b, 1 / 2);
    return option(label, description, lang => drawGrid(lang, {
      description,
      points: [
        {at: a, name: `A${pair(a)}`, dx: -4, anchor: 'end'},
        {at: b, name: `B${pair(b)}`, dx: 6, dy: 17},
        {at: mid, name: `M${pair(mid)}`, active: true}
      ],
      lines: [{from: a, to: mid}, {from: mid, to: b, color: '#13594e'}]
    }), math);
  }

  function trisectionOption(first, label, description, math) {
    const a = [-4, -3], b = [5, 3];
    const p = between(a, b, 1 / 3), q = between(a, b, 2 / 3);
    return option(label, description, lang => drawGrid(lang, {
      description,
      points: [
        {at: a, name: `A${pair(a)}`, dx: -3, anchor: 'end'},
        {at: p, name: `P${pair(p)}`, active: first},
        {at: q, name: `Q${pair(q)}`, dy: 18, active: !first},
        {at: b, name: `B${pair(b)}`, dx: 3, anchor: 'end'}
      ],
      lines: [
        {from: a, to: p}, {from: p, to: q, color: '#13594e'},
        {from: q, to: b}
      ]
    }), math);
  }

  function ratioOption(m, n, description, math) {
    const a = [-4, -2], b = [4, 2];
    const p = between(a, b, m / (m + n));
    return option(copy(`${m} : ${n}`, `${m} : ${n}`), description, lang => drawGrid(lang, {
      description,
      points: [
        {at: a, name: `A${pair(a)}`, dx: -4, anchor: 'end'},
        {at: b, name: `B${pair(b)}`, dx: 4, anchor: 'end'},
        {at: p, name: `P${pair(p)}`, active: true, dy: 18}
      ],
      lines: [{from: a, to: p}, {from: p, to: b, color: '#13594e'}]
    }), math);
  }

  function centroidOption(c, description, math) {
    const a = [1, 1], b = [7, 1];
    const vertices = [a, b, c];
    const midpoints = [between(b, c, 1 / 2), between(c, a, 1 / 2), between(a, b, 1 / 2)];
    const g = a.map((value, i) => (value + b[i] + c[i]) / 3);
    return option(copy(`C${pair(c)}`, `C${pair(c)}`), description, lang => drawGrid(lang, {
      description, bounds: {...positiveGrid, maxY: 8},
      points: [
        {at: a, name: 'A', dx: -9, anchor: 'end'}, {at: b, name: 'B'},
        {at: c, name: 'C'}, {at: midpoints[2], name: 'D', dy: 17},
        {at: g, name: `G${pair(g)}`, active: true}
      ],
      lines: [
        {from: a, to: b}, {from: b, to: c}, {from: c, to: a},
        ...vertices.map((from, i) => ({from, to: midpoints[i], dashed: true, color: '#13594e'}))
      ]
    }), math);
  }

  window.TRIGGLE_COORDINATE_LESSONS = [
    {
      section: '5.1',
      title: copy('Mapping the plane', 'தளத்தினை வரைபடமாகக் குறித்தல்'),
      intro: copy(
        'A friend says the meeting point is 4 blocks east. Which junction do they mean?',
        'சந்திக்கும் இடம் கிழக்கே 4 கட்டங்கள் தள்ளி இருப்பதாக நண்பர் சொல்கிறார். அவர் குறிப்பிடும் சந்திப்பு எது?'
      ),
      explanation: copy(
        'Start at the marked junction O and count along the grid. A number line needs one number to locate a point. A flat map needs two directions from the same starting point. For this map read east first, then north.',
        'குறிக்கப்பட்டுள்ள O என்ற சந்திப்பிலிருந்து கட்டங்களை எண்ணுங்கள். ஓர் எண்ணுக்கோட்டில் புள்ளியைக் குறிக்க ஓர் எண் போதும். தள வரைபடத்தில் ஒரே தொடக்க இடத்திலிருந்து இரண்டு திசைகளில் எவ்வளவு நகர வேண்டும் என்று சொல்ல வேண்டும். இந்த வரைபடத்தில் முதலில் கிழக்கிலும் பிறகு வடக்கிலும் எண்ணுங்கள்.'
      ),
      activity: {
        label: copy('Keep 4 blocks east. Change the northward count.', 'கிழக்கே 4 கட்டங்கள் செல்லுங்கள். வடக்கே செல்லும் கட்டங்களின் எண்ணிக்கையை மாற்றுங்கள்.'),
        options: [
          mapOption(copy('1 block north', 'வடக்கே 1 கட்டம்'), [4, 1], copy(
            'P is at (4, 1). From O, go 4 blocks east and 1 block north.',
            'P இன் இடம் (4, 1). O-இலிருந்து கிழக்கே 4 கட்டங்களும் வடக்கே 1 கட்டமும் செல்லுங்கள்.'
          )),
          mapOption(copy('3 blocks north', 'வடக்கே 3 கட்டங்கள்'), [4, 3], copy(
            'P is at (4, 3). Both locations are 4 blocks east. Changing the second number moves the point north.',
            'P இன் இடம் (4, 3). இரண்டு இடங்களும் கிழக்கே 4 கட்டங்கள் தள்ளி உள்ளன. இரண்டாவது எண்ணை உயர்த்தும்போது புள்ளி வடக்கு நோக்கி நகர்கிறது.'
          ))
        ]
      },
      details: [detail(copy(
        'Maps use two references to pinpoint a place. City maps can use a street and an avenue. On Earth, latitude and longitude give two references. A grid lets us give locations to points on geometric shapes in the same way.',
        'வரைபடத்தில் ஓர் இடத்தைத் துல்லியமாகக் குறிக்க இரண்டு குறிப்புகள் உதவுகின்றன. நகர வரைபடத்தில் ஒரு தெருவும் அதைக் கடக்கும் சாலையும் இடத்தைக் காட்டலாம். புவியில் அட்சரேகையும் தீர்க்கரேகையும் இடத்தைக் காட்டுகின்றன. இதேபோல், கட்ட வரைபடத்தில் வடிவங்களின் புள்ளிகளைக் குறிக்கலாம்.'
      ))],
      check: {
        question: copy('Which instruction would let a friend find exactly one marked junction?', 'எந்த வழிகாட்டுதலைப் பின்பற்றினால் நண்பரால் ஒரே ஒரு சந்திப்பைத் துல்லியமாகக் கண்டுபிடிக்க முடியும்?'),
        hint: copy('What must your friend know before taking the first step? What two counts identify a crossing?', 'முதல் படி நகரும் முன் நண்பருக்கு என்ன தெரிய வேண்டும்? சந்திப்பைக் கண்டுபிடிக்க எந்த இரண்டு எண்ணிக்கைகள் தேவை?'),
        options: [
          answer(copy('From O, go 2 east and 3 north.', 'O-இலிருந்து கிழக்கே 2 கட்டங்களும் வடக்கே 3 கட்டங்களும் செல்லுங்கள்.'), copy(
            'Both counts are given from O, so they pick one crossing.',
            'இரண்டு திசைகளிலும் O-இலிருந்து எத்தனை கட்டங்கள் எண்ண வேண்டும் என்று தெரிகிறது. அதனால் ஒரே சந்திப்பைக் கண்டுபிடிக்கலாம்.'
          ), true),
          answer(copy('From O, go 2 east.', 'O-இலிருந்து கிழக்கே 2 கட்டங்கள் செல்லுங்கள்.'), copy(
            'Several crossings can be 2 blocks east. Give the northward count too.',
            'கிழக்கே 2 கட்டங்கள் தள்ளிப் பல சந்திப்புகள் இருக்கலாம். வடக்கே எத்தனை கட்டங்கள் என்பதையும் சொல்ல வேண்டும்.'
          )),
          answer(copy('Go 2 east and 3 north, starting anywhere.', 'எந்த இடத்திலிருந்தும் கிழக்கே 2 கட்டங்களும் வடக்கே 3 கட்டங்களும் செல்லுங்கள்.'), copy(
            'Moving the start moves the destination. Say which junction is the start.',
            'வேறொரு இடத்திலிருந்து தொடங்கினால் சென்றடையும் இடமும் மாறும். எந்தச் சந்திப்பிலிருந்து தொடங்க வேண்டும் என்று சொல்லுங்கள்.'
          ))
        ]
      },
      exercise: 'g9-ch5-ex5.1-q2',
      pages: pages('185–187', '191–193', '197–199', '203–205')
    },
    {
      section: '5.2',
      title: copy('Setting up a coordinate system', 'ஆயத் தொலைவைக் கண்டறிதல்'),
      intro: copy(
        'A point is 3 steps left and 2 steps up. How do its coordinates show both directions?',
        'ஒரு புள்ளி இடப்புறம் 3 அலகுகளும் மேலே 2 அலகுகளும் தள்ளி உள்ளது. அதன் ஆயத்தொலைவுகள் இந்த இரண்டு திசைகளையும் எப்படிக் காட்டுகின்றன?'
      ),
      explanation: copy(
        'On the Cartesian plane, two perpendicular number lines meet at the origin O(0, 0). In (x, y), x is the abscissa on the horizontal x-axis and y is the ordinate on the vertical y-axis. Right and up are positive. Left and down are negative.',
        'கார்ட்டீசியன் தளத்தில் ஒன்றுக்கொன்று செங்குத்தான இரண்டு எண்ணுக்கோடுகள் ஆதிப்புள்ளி O(0, 0)-இல் சந்திக்கின்றன. (x, y) என்ற வரிசைச்சோடியில் x என்பது கிடை அச்சுத் தொலைவு, y என்பது செங்குத்து அச்சுத் தொலைவு. வலப்புறமும் மேல்புறமும் மிகைத் திசைகள். இடப்புறமும் கீழ்ப்புறமும் குறைத் திசைகள்.'
      ),
      activity: {
        label: copy('Choose where to plot P. Follow x first, then y.', 'P-ஐக் குறிக்க ஓர் இடத்தைத் தேர்ந்தெடுங்கள். முதலில் x-இன் படியும் பின்னர் y-இன் படியும் நகருங்கள்.'),
        options: [
          plotOption(copy('(−3, 2)', '(−3, 2)'), [-3, 2], copy(
            'Go 3 left and 2 up. P is in quadrant II because x is negative and y is positive.',
            'இடப்புறம் 3 அலகுகளும் மேலே 2 அலகுகளும் செல்லுங்கள். x குறை எண், y மிகை எண் என்பதால் P இரண்டாம் காற்பகுதியில் உள்ளது.'
          )),
          plotOption(copy('(3, 2)', '(3, 2)'), [3, 2], copy(
            'Go 3 right and 2 up. Both coordinates are positive, so P is in quadrant I.',
            'வலப்புறம் 3 அலகுகளும் மேலே 2 அலகுகளும் செல்லுங்கள். இரண்டும் மிகை எண்கள் என்பதால் P முதலாம் காற்பகுதியில் உள்ளது.'
          )),
          plotOption(copy('(−3, −2)', '(−3, −2)'), [-3, -2], copy(
            'Go 3 left and 2 down. Both coordinates are negative, so P is in quadrant III.',
            'இடப்புறம் 3 அலகுகளும் கீழே 2 அலகுகளும் செல்லுங்கள். இரண்டும் குறை எண்கள் என்பதால் P மூன்றாம் காற்பகுதியில் உள்ளது.'
          )),
          plotOption(copy('(3, −2)', '(3, −2)'), [3, -2], copy(
            'Go 3 right and 2 down. P is in quadrant IV because x is positive and y is negative.',
            'வலப்புறம் 3 அலகுகளும் கீழே 2 அலகுகளும் செல்லுங்கள். x மிகை எண், y குறை எண் என்பதால் P நான்காம் காற்பகுதியில் உள்ளது.'
          )),
          plotOption(copy('(−3, 0)', '(−3, 0)'), [-3, 0], copy(
            'There is no vertical movement. The point is on the x-axis.',
            'செங்குத்துத் திசையில் நகர வேண்டியதில்லை. புள்ளி x அச்சின் மீது உள்ளது.'
          )),
          plotOption(copy('(0, 2)', '(0, 2)'), [0, 2], copy(
            'There is no horizontal movement. The point is on the y-axis.',
            'கிடைத் திசையில் நகர வேண்டியதில்லை. புள்ளி y அச்சின் மீது உள்ளது.'
          ))
        ]
      },
      details: [
        detail(copy(
          'An axis point belongs to neither adjoining quadrant. The origin lies on both axes. On graph paper label the origin, both axes and the scale before plotting.',
          'அச்சின் மீதுள்ள புள்ளி அருகிலுள்ள எந்தக் காற்பகுதியிலும் சேராது. ஆதிப்புள்ளி இரண்டு அச்சுகளிலும் உள்ளது. வரைபடத் தாளில் புள்ளிகளைக் குறிக்கும் முன் ஆதிப்புள்ளி, இரண்டு அச்சுகள், அளவுத்திட்டம் ஆகியவற்றைக் குறியுங்கள்.'
        )),
        detail(copy(
          'Points with the same x-coordinate line up vertically. Points with the same y-coordinate line up horizontally.',
          'ஒரே x ஆயத்தொலைவைக் கொண்ட புள்ளிகள் செங்குத்துக் கோட்டில் அமையும். ஒரே y ஆயத்தொலைவைக் கொண்ட புள்ளிகள் கிடைக்கோட்டில் அமையும்.'
        ))
      ],
      check: {
        question: copy('Where is the point (0, −4)?', '(0, −4) என்ற புள்ளி எங்கு உள்ளது?'),
        hint: copy('From O, move horizontally by the first coordinate before using the second coordinate.', 'O-இலிருந்து முதலில் முதல் ஆயத்தொலைவின்படி கிடைத் திசையில் நகருங்கள். பிறகு இரண்டாம் ஆயத்தொலைவைப் பயன்படுத்துங்கள்.'),
        options: [
          answer(copy('On the x-axis', 'x அச்சின் மீது'), copy('A point on the x-axis has y = 0. Here the first coordinate is zero.', 'x அச்சின் மீதுள்ள புள்ளிக்கு y = 0. இங்கு முதல் ஆயத்தொலைவு பூச்சியம்.')),
          answer(copy('In quadrant III', 'மூன்றாம் காற்பகுதியில்'), copy('Quadrant III needs two negative coordinates. Here x = 0.', 'மூன்றாம் காற்பகுதியில் இரு ஆயத்தொலைவுகளும் குறை எண்கள். இங்கு x = 0.')),
          answer(copy('On the y-axis', 'y அச்சின் மீது'), copy('x = 0 keeps the point on the vertical axis. y = −4 places it 4 units below O.', 'x = 0 என்பதால் புள்ளி செங்குத்து அச்சில் உள்ளது. y = −4 என்பதால் அது O-க்குக் கீழே 4 அலகுகள் தள்ளி உள்ளது.'), true)
        ]
      },
      exercise: 'g9-ch5-ex5.1-q1',
      pages: pages('187–193', '193–199', '200–206', '206–212')
    },
    {
      section: '5.4',
      title: copy('Midpoint of a line segment', 'ஒரு கோட்டுத்துண்டின் நடுப்புள்ளி'),
      intro: copy(
        'Two friends start at the same time from A and B. They walk toward each other along a straight path at the same speed. Where will they meet?',
        'இரண்டு நண்பர்கள் A, B ஆகிய இடங்களிலிருந்து ஒரே நேரத்தில் புறப்படுகிறார்கள். நேரான பாதையில் ஒருவரை நோக்கி ஒருவர் ஒரே வேகத்தில் நடக்கிறார்கள். அவர்கள் எங்கே சந்திப்பார்கள்?'
      ),
      explanation: copy(
        'M is the midpoint of segment AB. From A, it takes half the horizontal change and half the vertical change to reach M. This is the same as averaging the two x-coordinates and averaging the two y-coordinates. The subscripts 1 and 2 name endpoints A and B.',
        'AB கோட்டுத்துண்டின் நடுப்புள்ளி M. A-இலிருந்து M-ஐ அடையக் கிடைத் திசை மாற்றத்திலும் செங்குத்துத் திசை மாற்றத்திலும் பாதி நகர வேண்டும். அதாவது, இரண்டு x ஆயத்தொலைவுகளின் சராசரியையும் இரண்டு y ஆயத்தொலைவுகளின் சராசரியையும் காண வேண்டும். கீழ்க்குறிகள் 1, 2 முறையே A, B முனைப்புள்ளிகளைக் குறிக்கின்றன.'
      ),
      math: String.raw`M=\left(\dfrac{x_1+x_2}{2},\dfrac{y_1+y_2}{2}\right)`,
      activity: {
        label: copy('Keep A fixed. Move endpoint B.', 'A-ஐ நிலையாக வையுங்கள். B முனைப்புள்ளியை மாற்றுங்கள்.'),
        options: [
          midpointOption(copy('B(4, −2)', 'B(4, −2)'), [4, -2], copy(
            'From A to B the changes are 8 right and 4 down. Halve them to get 4 right and 2 down from A. M is (0, 0).',
            'A-இலிருந்து B-க்கு வலப்புறம் 8 அலகுகளும் கீழே 4 அலகுகளும் நகர வேண்டும். அந்த மாற்றங்களைப் பாதியாக்கினால் A-இலிருந்து வலப்புறம் 4 அலகுகளும் கீழே 2 அலகுகளும் நகர வேண்டும். எனவே M என்பது (0, 0).'
          )),
          midpointOption(copy('B(3, 2)', 'B(3, 2)'), [3, 2], copy(
            'The endpoints have the same y-coordinate. M stays on that horizontal line and lies halfway along the 7-unit segment.',
            'முனைப்புள்ளிகளின் y ஆயத்தொலைவுகள் சமம். அதே கிடைக்கோட்டில், 7 அலகு நீளமுள்ள கோட்டுத்துண்டின் சரிபாதியில் M உள்ளது.'
          ), String.raw`M=\left(-\dfrac{1}{2},2\right)`)
        ]
      },
      details: [
        detail(copy(
          'A midpoint can give you a missing endpoint. Solve the average for each missing coordinate. A circle’s centre is the midpoint of a diameter. The diagonals of a parallelogram share a midpoint because they bisect one another.',
          'நடுப்புள்ளி தெரிந்தால் தெரியாத முனைப்புள்ளியைக் காணலாம். ஒவ்வோர் ஆயத்தொலைவுக்கும் சராசரிச் சமன்பாட்டைத் தீருங்கள். வட்டத்தின் மையம் அதன் விட்டத்தின் நடுப்புள்ளி. இணைகரத்தின் மூலைவிட்டங்கள் ஒன்றையொன்று இருசமக்கூறிடுவதால் அவற்றுக்கு ஒரே நடுப்புள்ளி உண்டு.'
        )),
        detail(copy(
          'Two successive halvings locate the quarter points. In a triangle, the line joining the midpoints of two sides is parallel to the third side and half its length.',
          'இருமுறை அடுத்தடுத்துச் சரிபாதியாகப் பிரித்தால் நான்கு சமப்பகுதிகளின் பிரிப்புப் புள்ளிகளைக் காணலாம். முக்கோணத்தின் இரு பக்கங்களின் நடுப்புள்ளிகளை இணைக்கும் கோட்டுத்துண்டு மூன்றாவது பக்கத்துக்கு இணையானது. அதன் நீளம் மூன்றாவது பக்கத்தின் நீளத்தில் பாதி.'
        ))
      ],
      check: {
        question: copy('What is the midpoint of A(−2, 6) and B(4, 0)?', 'A(−2, 6), B(4, 0) ஆகியவற்றை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி எது?'),
        hint: copy('Find one average from the two horizontal coordinates and another from the two vertical coordinates.', 'இரண்டு கிடை அச்சுத் தொலைவுகளின் சராசரியையும் இரண்டு செங்குத்து அச்சுத் தொலைவுகளின் சராசரியையும் தனித்தனியே காணுங்கள்.'),
        options: [
          answer(copy('(2, 6)', '(2, 6)'), copy('These are the sums. Divide each sum by 2 to get the two averages.', 'இவை கூட்டுத்தொகைகள். இரு சராசரிகளைக் காண ஒவ்வொரு கூட்டுத்தொகையையும் 2-ஆல் வகுக்குங்கள்.')),
          answer(copy('(1, 3)', '(1, 3)'), copy('Average −2 and 4 for x. Average 6 and 0 for y.', 'x-க்கு −2, 4 ஆகியவற்றின் சராசரியைக் காணுங்கள். y-க்கு 6, 0 ஆகியவற்றின் சராசரியைக் காணுங்கள்.'), true),
          answer(copy('(3, 3)', '(3, 3)'), copy('The horizontal half-change is 3. Start at x = −2 and move 3 units right to x = 1.', 'கிடைத் திசை மாற்றத்தில் பாதி 3 அலகுகள். x = −2-இலிருந்து வலப்புறம் 3 அலகுகள் நகர்ந்தால் x = 1 கிடைக்கும்.'))
        ]
      },
      exercise: 'g9-ch5-ex5.3-q1',
      pages: pages('203–208', '209–214', '216–222', '222–228')
    },
    {
      section: '5.5',
      title: copy('Trisecting a line segment', 'ஒரு கோட்டுத்துண்டை மூன்று சமக்கூறிடும் புள்ளிகள்'),
      intro: copy('Where should two markers go to divide AB into three equal lengths?', 'AB-ஐ மூன்று சம நீளங்களாகப் பிரிக்க இரண்டு குறிகளை எங்கே வைக்க வேண்டும்?'),
      explanation: copy(
        'From A toward B, P marks one third of the way and Q marks two thirds. Take that fraction of both the horizontal and vertical changes from A to B. The three segments AP, PQ and QB then have equal lengths.',
        'A-இலிருந்து B நோக்கிச் செல்லும்போது மூன்றில் ஒரு பங்கில் P-யும் மூன்றில் இரண்டு பங்கில் Q-வும் அமையும். A-க்கும் B-க்கும் இடையிலான கிடை மற்றும் செங்குத்து மாற்றங்கள் இரண்டுக்கும் அந்தப் பின்னத்தைப் பயன்படுத்துங்கள். அப்போது AP, PQ, QB ஆகிய மூன்று கோட்டுத்துண்டுகளும் சம நீளமுடையவை.'
      ),
      activity: {
        label: copy('Choose a marker. Count the same-sized steps from A.', 'ஒரு குறியைத் தேர்ந்தெடுங்கள். A-இலிருந்து சம அளவிலான படிகளை எண்ணுங்கள்.'),
        options: [
          trisectionOption(true, copy('First marker P', 'முதல் குறி P'), copy(
            'Each step moves 3 right and 2 up. One step from A gives P(−1, −1). AP is one part and PB is two parts.',
            'ஒவ்வொரு படியிலும் வலப்புறம் 3 அலகுகளும் மேலே 2 அலகுகளும் நகர்கிறோம். A-இலிருந்து ஒரு படி நகர்ந்தால் P(−1, −1) கிடைக்கும். AP ஒரு பகுதி, PB இரண்டு பகுதிகள்.'
          ), String.raw`AP:PB=1:2`),
          trisectionOption(false, copy('Second marker Q', 'இரண்டாம் குறி Q'), copy(
            'Two steps from A move 6 right and 4 up, giving Q(2, 1). AQ is two parts and QB is one part.',
            'A-இலிருந்து இரண்டு படிகள் நகர்ந்தால் வலப்புறம் 6 அலகுகளும் மேலே 4 அலகுகளும் செல்கிறோம். அதனால் Q(2, 1) கிடைக்கும். AQ இரண்டு பகுதிகள், QB ஒரு பகுதி.'
          ), String.raw`AQ:QB=2:1`)
        ]
      },
      details: [
        detail(copy(
          'The subscript 1 marks A’s coordinates and subscript 2 marks B’s. P is closer to A, so A’s coordinates have twice the weight in P. Q is closer to B, so B’s coordinates have twice the weight in Q.',
          'கீழ்க்குறி 1, A-இன் ஆயத்தொலைவுகளையும் கீழ்க்குறி 2, B-இன் ஆயத்தொலைவுகளையும் குறிக்கின்றது. P, A-க்கு அருகில் இருப்பதால் P-ஐக் கணக்கிடும்போது A-இன் ஆயத்தொலைவுகளுக்கு இருமடங்கு எடை தருகிறோம். Q, B-க்கு அருகில் இருப்பதால் Q-வுக்கு B-இன் ஆயத்தொலைவுகளுக்கு இருமடங்கு எடை தருகிறோம்.'
        ), String.raw`\begin{aligned}
          P&=\left(\dfrac{2x_1+x_2}{3},\dfrac{2y_1+y_2}{3}\right)\\
          Q&=\left(\dfrac{x_1+2x_2}{3},\dfrac{y_1+2y_2}{3}\right)
        \end{aligned}`)
      ],
      check: {
        question: copy('Walking from A(0, 0) to B(12, 6), which is the second trisection point?', 'A(0, 0)-இலிருந்து B(12, 6) நோக்கிச் செல்லும்போது இரண்டாவது சமக்கூறிடும் புள்ளி எது?'),
        hint: copy('Divide each coordinate change from A to B into three equal steps. How many steps reach the second marker?', 'A-இலிருந்து B வரையிலான ஒவ்வோர் ஆயத்தொலைவு மாற்றத்தையும் மூன்று சம படிகளாகப் பிரியுங்கள். இரண்டாம் குறியை அடைய எத்தனை படிகள் நகர வேண்டும்?'),
        options: [
          answer(copy('(4, 2)', '(4, 2)'), copy('That is one third of the way, the first marker. Take one more equal step.', 'அது மூன்றில் ஒரு பங்கில் உள்ள முதல் குறி. அதே அளவு இன்னொரு படி நகருங்கள்.')),
          answer(copy('(6, 3)', '(6, 3)'), copy('That calculation halves the changes. Trisection needs three equal parts.', 'அந்தக் கணக்கு மாற்றங்களைச் சரிபாதியாக்குகிறது. இங்கு மூன்று சமப் பகுதிகளாகப் பிரிக்க வேண்டும்.')),
          answer(copy('(8, 4)', '(8, 4)'), copy('Each third moves 4 right and 2 up. The second marker is two such steps from A.', 'ஒவ்வொரு மூன்றில் ஒரு பங்குக்கும் வலப்புறம் 4 அலகுகளும் மேலே 2 அலகுகளும் நகர வேண்டும். A-இலிருந்து இப்படிப்பட்ட இரண்டு படிகள் நகர்ந்தால் இரண்டாம் குறி கிடைக்கும்.'), true)
        ]
      },
      exercise: 'g9-ch5-ex5.4-q4',
      pages: pages('208–210', '214–216', '222–224', '228–230')
    },
    {
      section: '5.6',
      title: copy('Section formula', 'பிரிவுச் சூத்திரம்'),
      intro: copy('Place P so that AP is three times as long as PB. Which endpoint should P be nearer?', 'AP-இன் நீளம் PB-இன் நீளத்தைப் போல் மூன்று மடங்காக இருக்க வேண்டும். P எந்த முனைப்புள்ளிக்கு அருகில் இருக்க வேண்டும்?'),
      explanation: copy(
        'For P inside AB, AP : PB = m : n means the whole segment has m + n equal parts, and AP takes m of them. Move that fraction of the way from A to B along each axis. In the formula the subscripts 1 and 2 refer to A and B, and m and n are positive.',
        'AB-இன் உட்புறத்தில் P அமையும்போது AP : PB = m : n எனில், AB-ஐ m + n சமப் பகுதிகளாகப் பிரிக்கலாம். அவற்றில் m பகுதிகள் AP-க்கு உரியவை. அதே பின்னத்தைக் கிடை மற்றும் செங்குத்து மாற்றங்களுக்கும் பயன்படுத்துங்கள். சூத்திரத்தில் கீழ்க்குறிகள் 1, 2 முறையே A, B-ஐக் குறிக்கின்றன. m, n இரண்டும் மிகை எண்கள்.'
      ),
      math: String.raw`P=\left(\dfrac{nx_1+mx_2}{m+n},\dfrac{ny_1+my_2}{m+n}\right)`,
      activity: {
        label: copy('Choose the ratio AP : PB.', 'AP : PB விகிதத்தைத் தேர்ந்தெடுங்கள்.'),
        options: [
          ratioOption(3, 1, copy(
            'Move through 3 of the 4 equal parts from A. AP is longer than PB, so P(2, 1) is nearer B.',
            'A-இலிருந்து 4 சமப் பகுதிகளில் 3 பகுதிகள் நகருங்கள். AP, PB-ஐவிட நீளமானது. எனவே P(2, 1), B-க்கு அருகில் உள்ளது.'
          ), String.raw`x_P=\dfrac{1(-4)+3(4)}{4}=2`),
          ratioOption(1, 1, copy(
            'Move through 1 of the 2 equal parts from A. P(0, 0) is the midpoint.',
            'A-இலிருந்து 2 சமப் பகுதிகளில் ஒரு பகுதி நகருங்கள். P(0, 0) நடுப்புள்ளியாகும்.'
          ), String.raw`x_P=\dfrac{1(-4)+1(4)}{2}=0`),
          ratioOption(1, 3, copy(
            'Move through just 1 of the 4 equal parts from A. AP is shorter than PB, so P(−2, −1) is nearer A.',
            'A-இலிருந்து 4 சமப் பகுதிகளில் ஒரு பகுதி மட்டும் நகருங்கள். AP, PB-ஐவிடக் குறுகியது. எனவே P(−2, −1), A-க்கு அருகில் உள்ளது.'
          ), String.raw`x_P=\dfrac{3(-4)+1(4)}{4}=-2`)
        ]
      },
      details: [
        detail(copy(
          'Think of P as A plus a fraction of the change toward B. The x calculation below simplifies to the x-coordinate in the section formula. The y calculation works the same way.',
          'A-இன் ஆயத்தொலைவுடன் B நோக்கிய மாற்றத்தின் ஒரு பின்னத்தைக் கூட்டினால் P-இன் ஆயத்தொலைவு கிடைக்கும். கீழுள்ள கணக்கைச் சுருக்கினால் பிரிவுச் சூத்திரத்தின் x ஆயத்தொலைவு கிடைக்கும். y ஆயத்தொலைவுக்கும் இதே முறை பொருந்தும்.'
        ), String.raw`\begin{aligned}
          x_P&=x_1+\dfrac{m}{m+n}(x_2-x_1)\\
             &=\dfrac{nx_1+mx_2}{m+n}
        \end{aligned}`),
        detail(copy(
          'The ratio 1 : 1 gives the midpoint. The ratios 1 : 2 and 2 : 1 give the two trisection points.',
          '1 : 1 என்ற விகிதம் நடுப்புள்ளியைக் காட்டுகிறது. 1 : 2, 2 : 1 ஆகிய விகிதங்கள் மூன்று சமக்கூறிடும் இரு புள்ளிகளைக் காட்டுகின்றன.'
        )),
        detail(copy(
          'To find an unknown ratio when P is given, compare the changes from A to P and from P to B along an axis where the endpoint coordinates differ. If P lies on the x-axis use its y-coordinate of zero. On the y-axis use its x-coordinate of zero. To recover a missing endpoint, solve the section formula for each missing coordinate.',
          'P தெரிந்து விகிதம் தெரியாவிட்டால், முனைப்புள்ளிகளின் ஆயத்தொலைவுகள் வேறுபடும் ஓர் அச்சில் A-இலிருந்து P வரையிலான மாற்றத்தையும் P-இலிருந்து B வரையிலான மாற்றத்தையும் ஒப்பிடுங்கள். P, x அச்சில் இருந்தால் அதன் y மதிப்பு பூச்சியம். y அச்சில் இருந்தால் அதன் x மதிப்பு பூச்சியம். தெரியாத முனைப்புள்ளியைக் காண, ஒவ்வோர் ஆயத்தொலைவுக்கும் பிரிவுச் சூத்திரத்தைத் தீருங்கள்.'
        ))
      ],
      check: {
        question: copy('P divides A(0, 0) to B(10, 5) internally in the ratio AP : PB = 2 : 3. Where is P?', 'A(0, 0), B(10, 5) ஆகியவற்றை இணைக்கும் கோட்டுத்துண்டை P உட்புறமாக AP : PB = 2 : 3 என்ற விகிதத்தில் பிரிக்கிறது. P எங்கு உள்ளது?'),
        hint: copy('Add the two terms of the ratio for the total number of parts. Use the first term for the parts from A to P.', 'விகிதத்தின் இரு உறுப்புகளையும் கூட்டி மொத்தப் பகுதிகளின் எண்ணிக்கையைக் காணுங்கள். A-இலிருந்து P வரை உள்ள பகுதிகளுக்கு முதல் உறுப்பைப் பயன்படுத்துங்கள்.'),
        options: [
          answer(copy('(4, 2)', '(4, 2)'), copy('There are 5 parts in the whole segment. Take 2 of them from A in both coordinates.', 'முழுக் கோட்டுத்துண்டில் 5 சமப் பகுதிகள் உள்ளன. இரண்டு ஆயத்தொலைவுகளிலும் A-இலிருந்து அவற்றில் 2 பகுதிகள் நகர வேண்டும்.'), true),
          answer(copy('(6, 3)', '(6, 3)'), copy('That takes 3 parts from A. AP is the first term of the ratio, so take 2 parts from A.', 'அந்தப் புள்ளியை அடைய A-இலிருந்து 3 பகுதிகள் நகர வேண்டும். விகிதத்தில் AP முதலில் வருவதால் A-இலிருந்து 2 பகுதிகள் நகருங்கள்.')),
          answer(copy('(5, 2.5)', '(5, 2.5)'), copy('This midpoint makes AP and PB equal. Here the ratio is 2 : 3.', 'இந்த நடுப்புள்ளிக்கு AP, PB இரண்டும் சமம். இங்கு கொடுத்துள்ள விகிதம் 2 : 3.'))
        ]
      },
      exercise: 'g9-ch5-ex5.4-q1',
      pages: pages('210–214', '216–220', '224–228', '230–234')
    },
    {
      section: '5.7',
      title: copy('Coordinates of the centroid', 'நடுக்கோட்டு மையத்தின் ஆயத்தொலைவுகள்'),
      intro: copy('Move one vertex of this triangle. How far does the meeting point of the medians move?', 'இந்த முக்கோணத்தின் ஓர் உச்சியை நகர்த்துங்கள். நடுக்கோடுகள் சந்திக்கும் புள்ளி எவ்வளவு நகர்கிறது?'),
      explanation: copy(
        'A median joins a vertex to the midpoint of the opposite side. The three medians meet at the centroid G. Average the three x-coordinates and the three y-coordinates separately. The subscripts 1, 2 and 3 refer to the three vertices.',
        'ஓர் உச்சியையும் அதன் எதிர்ப்பக்கத்தின் நடுப்புள்ளியையும் இணைப்பது நடுக்கோடு. மூன்று நடுக்கோடுகளும் நடுக்கோட்டு மையம் G-இல் சந்திக்கின்றன. மூன்று x ஆயத்தொலைவுகளின் சராசரியையும் மூன்று y ஆயத்தொலைவுகளின் சராசரியையும் தனித்தனியே காணுங்கள். கீழ்க்குறிகள் 1, 2, 3 மூன்று உச்சிகளைக் குறிக்கின்றன.'
      ),
      math: String.raw`G=\left(\dfrac{x_1+x_2+x_3}{3},\dfrac{y_1+y_2+y_3}{3}\right)`,
      activity: {
        label: copy('Keep A and B fixed. Move vertex C.', 'A, B ஆகியவற்றை நிலையாக வையுங்கள். C உச்சியை நகர்த்துங்கள்.'),
        options: [
          centroidOption([1, 4], copy(
            'A(1, 1), B(7, 1) and C(1, 4) give G(3, 2). The dashed medians pass through G.',
            'A(1, 1), B(7, 1), C(1, 4) ஆகியவற்றின் நடுக்கோட்டு மையம் G(3, 2). இடைவிட்ட கோடுகளாகக் காட்டப்பட்டுள்ள நடுக்கோடுகள் G வழியாகச் செல்கின்றன.'
          ), String.raw`y_G=\dfrac{1+1+4}{3}=2`),
          centroidOption([1, 7], copy(
            'Raising C by 3 raises G by 1. Only one of the three y-coordinates changed. D, the midpoint of AB, stays fixed.',
            'C-ஐ 3 அலகுகள் உயர்த்தினால் G ஓர் அலகு உயர்கிறது. மூன்று y ஆயத்தொலைவுகளில் ஒன்று மட்டுமே மாறியது. AB-இன் நடுப்புள்ளி D அதே இடத்தில் உள்ளது.'
          ), String.raw`y_G=\dfrac{1+1+7}{3}=3`)
        ]
      },
      details: [
        detail(copy(
          'Let D be the midpoint of AB. Apply the section formula to C and D with CG : GD = 2 : 1. Use the midpoint formula for D to obtain the average of the three vertex coordinates. Starting from either of the other vertices gives the same average. So all three medians meet at the same point G.',
          'D என்பது AB-இன் நடுப்புள்ளி. CG : GD = 2 : 1 என்ற விகிதத்தை வைத்து C, D ஆகியவற்றுக்குப் பிரிவுச் சூத்திரத்தைப் பயன்படுத்துங்கள். D-க்கு நடுப்புள்ளிச் சூத்திரத்தைப் பயன்படுத்தினால் மூன்று உச்சிகளின் ஆயத்தொலைவுகளின் சராசரி கிடைக்கும். மற்ற இரு உச்சிகளிலிருந்து தொடங்கினாலும் அதே சராசரிகள் கிடைக்கும். எனவே மூன்று நடுக்கோடுகளும் ஒரே புள்ளி G-இல் சந்திக்கின்றன.'
        ), String.raw`\begin{aligned}
          x_G&=\dfrac{x_3+2x_D}{3}\\
             &=\dfrac{x_1+x_2+x_3}{3}
        \end{aligned}`),
        detail(copy(
          'Apply the same averaging rule to the three side midpoints and you get the same centroid. If the centroid and two vertices are given, multiply the centroid coordinates by 3 and subtract the two known vertex coordinates.',
          'மூன்று பக்கங்களின் நடுப்புள்ளிகளுக்கும் இதே சராசரி முறையைப் பயன்படுத்தினால் அதே நடுக்கோட்டு மையம் கிடைக்கும். நடுக்கோட்டு மையமும் இரண்டு உச்சிகளும் தெரிந்தால், மையத்தின் ஆயத்தொலைவுகளை 3-ஆல் பெருக்கி, தெரிந்த இரண்டு உச்சிகளின் ஆயத்தொலைவுகளைக் கழியுங்கள்.'
        )),
        detail(copy(
          'When the centres are distinct, the Euler line passes through the orthocentre H (where the altitudes meet), centroid G and circumcentre S (centre of the circle through the vertices). G lies between H and S, with HG : GS = 2 : 1. For an equilateral triangle these centres coincide.',
          'மையங்கள் வெவ்வேறு புள்ளிகளாக இருக்கும்போது ஆய்லர் கோடு செங்கோட்டு மையம் H, நடுக்கோட்டு மையம் G, சுற்றுவட்ட மையம் S வழியே செல்கிறது. குத்துக்கோடுகள் சந்திக்கும் புள்ளி H. மூன்று உச்சிகள் வழியாகச் செல்லும் வட்டத்தின் மையம் S. H-க்கும் S-க்கும் இடையில் G அமைகிறது. HG : GS = 2 : 1. சமபக்க முக்கோணத்தில் இந்த மையங்கள் ஒரே புள்ளியில் அமையும்.'
        ))
      ],
      check: {
        question: copy('What is the centroid of the triangle with A(0, 0), B(6, 0) and C(0, 9)?', 'A(0, 0), B(6, 0), C(0, 9) ஆகிய உச்சிகளைக் கொண்ட முக்கோணத்தின் நடுக்கோட்டு மையம் எது?'),
        hint: copy('Include the zero coordinates when finding each average. There are three vertices.', 'ஒவ்வொரு சராசரியைக் காணும்போதும் பூச்சிய ஆயத்தொலைவுகளையும் சேர்த்துக் கொள்ளுங்கள். மூன்று உச்சிகள் உள்ளன.'),
        options: [
          answer(copy('(3, 0)', '(3, 0)'), copy('This is the midpoint of AB. Include all three vertices to find the centroid.', 'இது AB-இன் நடுப்புள்ளி. நடுக்கோட்டு மையத்தைக் காண மூன்று உச்சிகளையும் பயன்படுத்துங்கள்.')),
          answer(copy('(2, 3)', '(2, 3)'), copy('The x-values total 6 and the y-values total 9. Divide both totals by 3.', 'x மதிப்புகளின் கூட்டுத்தொகை 6. y மதிப்புகளின் கூட்டுத்தொகை 9. இரண்டு கூட்டுத்தொகைகளையும் 3-ஆல் வகுக்குங்கள்.'), true),
          answer(copy('(6, 9)', '(6, 9)'), copy('These are the coordinate sums. The centroid uses their averages.', 'இவை ஆயத்தொலைவுகளின் கூட்டுத்தொகைகள். நடுக்கோட்டு மையத்துக்கு அவற்றின் சராசரிகள் தேவை.'))
        ]
      },
      exercise: 'g9-ch5-ex5.5-q1',
      pages: pages('214–217', '220–223', '228–231', '234–237')
    }
  ];
})();
