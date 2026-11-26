/* TN SCERT 2025, Set Language, Exercise 1.3. Bilingual visual source evidence
 * and the mapping from seven question cards to 42 tasks are in textbook-fidelity. */
(() => {
  'use strict';

  const exercise = '1.3';
  const source = 'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view';
  const evidence = 'site/data/textbook-fidelity/g9-ch1-ex1-3.json';
  const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
  const labels = ['Fig. 1.26', 'Fig. 1.27', 'Fig. 1.28'];
  const bilingual = (en, ta) => ({en, ta});
  const formula = (fallback, latex, display = false) => ({fallback, latex, display});
  const plain = fragments => fragments.map(value => value.fallback ?? value).join('');
  const roster = values => formula(
    values.length ? '{' + values.join(', ') + '}' : '∅',
    values.length ? '\\{' + values.join(',\\,') + '\\}' : '\\varnothing'
  );
  const unique = values => [...new Set(values)].sort((a, b) => typeof a === 'number' ? a - b : a.localeCompare(b));
  const union = (a, b) => unique([...a, ...b]);
  const intersection = (a, b) => a.filter(value => b.includes(value));
  const difference = (a, b) => a.filter(value => !b.includes(value));
  const equation = (lhs, rhs) => formula(lhs.fallback + ' = ' + rhs.fallback, lhs.latex + '=' + rhs.latex, true);
  const lines = rows => formula(rows.map(row => row.fallback).join('\n'),
    '\\begin{aligned}' + rows.map(row => '&' + row.latex).join('\\\\') + '\\end{aligned}', true);
  const set = (label, values) => equation(formula(label, label), roster(values));
  const part = (label, row) => formula('(' + label + ') ' + row.fallback, '\\text{(' + label + ')}\\quad ' + row.latex);
  const step = (text, why, math, mathTa) => ({
    ...text, why, ...(math && {eq: math.fallback, math}), ...(mathTa && {mathTa})
  });
  const mark = ops => ops.flatMap((op, i) => [i === 0 ? '\n' : '   ', '(' + roman[i] + ') ', op]);
  const rosterPair = (number, aName, a, bName, b, lang) => [
    '\n(' + roman[number] + ') ', set(aName, a), lang === 'ta' ? ' மற்றும் ' : ' and ', set(bName, b)
  ].map(value => value?.latex ? {...value, display: false} : value);
  const joinSets = (names, values, lang) => names.flatMap((name, i) => [
    ...(i ? [lang === 'ta' && i === names.length - 1 ? ' மற்றும் ' : ', '] : []),
    {...set(name, values[i]), display: false}
  ]);

  const ops = [
    formula('A', 'A'), formula('B', 'B'), formula('A∪B', 'A\\cup B'),
    formula('A∩B', 'A\\cap B'), formula('A–B', 'A-B'), formula('B–A', 'B-A'),
    formula('A′', 'A^{\\prime}'), formula('B′', 'B^{\\prime}'), formula('U', 'U')
  ];
  const complements = [ops[6], ops[7], formula('A′∪B′', 'A^{\\prime}\\cup B^{\\prime}'),
    formula('A′∩B′', 'A^{\\prime}\\cap B^{\\prime}'), formula('(A∪B)′', '(A\\cup B)^{\\prime}'),
    formula('(A∩B)′', '(A\\cap B)^{\\prime}'), formula('(A′)′', '(A^{\\prime})^{\\prime}'),
    formula('(B′)′', '(B^{\\prime})^{\\prime}')];

  const joinWhy = bilingual(
    'A union keeps each distinct member found in either set. An intersection keeps only the members found in both sets.',
    'ஏதேனும் ஒரு கணத்தில் உள்ள உறுப்பைச் சேர்ப்பில் ஒருமுறை எழுத வேண்டும். இரண்டு கணங்களிலும் உள்ள உறுப்பை மட்டுமே வெட்டில் எழுத வேண்டும்.'
  );
  const differenceWhy = bilingual(
    'In a set difference the order matters. Start with the first set and remove members that also belong to the second.',
    'கண வித்தியாசத்தில் கணங்களின் வரிசை முக்கியம். முதல் கணத்திலிருந்து தொடங்கி, இரண்டாம் கணத்திலும் உள்ள உறுப்புகளை நீக்க வேண்டும்.'
  );
  const complementWhy = bilingual(
    'A complement is taken within the given universal set. An element can belong to the set or its complement, never both.',
    'கொடுக்கப்பட்ட அனைத்துக் கணத்திற்குள்தான் நிரப்புக் கணத்தைக் காண வேண்டும். ஓர் உறுப்பு கணத்திலோ அதன் நிரப்புக் கணத்திலோ இருக்கும். இரண்டிலும் இருக்க முடியாது.'
  );
  const fourRegions = bilingual(
    'Every member of U is in exactly one of four regions: A only, B only, both, or outside both.',
    'U இன் ஒவ்வோர் உறுப்பும் நான்கு பகுதிகளில் ஏதேனும் ஒன்றில் மட்டுமே இருக்கும். அவை A மட்டும், B மட்டும், இரண்டிலும், இரண்டிற்கும் வெளியே ஆகியவை.'
  );
  const fig = (name, alt, caption, options = {}) => ({
    figureSrc: './assets/grade9-ch1/' + name + '.svg', figureAlt: alt, figureCaption: caption, ...options
  });
  const entries = [];

  function add(number, title, prompts, steps, answer, hint, options = {}) {
    const answerEn = answer.en ?? answer;
    entries.push({
      id: 'g9-ch1-ex1.3-q' + number, classNum: 9, chapter: '1', exercise, kind: 'textbook',
      topic: bilingual('Set Language', 'கண மொழி'),
      label: bilingual('Exercise 1.3 · Q' + number, 'பயிற்சி 1.3 · வினா ' + number),
      title, q: bilingual(plain(prompts.en), plain(prompts.ta)), questionMath: prompts,
      steps, answer: answerEn.fallback, answerMath: answer, ...(answer.ta && {answerTa: answer.ta.fallback}),
      hint, setConcept: 'operations', ...options,
      source, edition: '2025', notationSource: 'authored', reference: 'TN SCERT Grade 9 Mathematics, revised 2025, Exercise 1.3 Q' + number,
      sourceFidelity: {status: 'page-visual-checked', manifest: evidence},
      review: {tamilEditorial: 'pending', teacher: 'pending'}
    });
  }

  const diagramA = [2, 4, 7, 8, 10];
  const diagramB = [3, 4, 6, 7, 9, 11];
  const diagramU = union(union(diagramA, diagramB), [1, 12]);
  const diagramAnswers = [
    diagramA, diagramB, union(diagramA, diagramB), intersection(diagramA, diagramB),
    difference(diagramA, diagramB), difference(diagramB, diagramA),
    difference(diagramU, diagramA), difference(diagramU, diagramB), diagramU
  ].map((values, i) => part(roman[i], equation(ops[i], roster(values))));
  add(1, bilingual('Read the Venn diagram', 'வென் படத்தைப் படித்தல்'), bilingual(
    ['1. Using the given Venn diagram, write the elements of', ...mark(ops)],
    ['1. கொடுக்கப்பட்ட வென்படத்தில் இருந்து கீழேயுள்ள கணங்களின் உறுப்புகளை எழுதுக.', ...mark(ops)]
  ), [
    step(bilingual('Read the circles. Include the overlap in both A and B.', 'வட்டங்களில் உள்ள எண்களைப் படிக்க. பொதுப் பகுதியின் எண்களை A, B ஆகிய இரண்டு கணங்களிலும் சேர்க்க.'), fourRegions, lines(diagramAnswers.slice(0, 2))),
    step(bilingual('Read both circles together for the union and only their overlap for the intersection.', 'சேர்ப்புக்கு இரண்டு வட்டங்களிலும் உள்ள எண்களை எழுதுக. வெட்டுக்கு அவற்றின் பொதுப் பகுதியை மட்டும் படிக்க.'), joinWhy, lines(diagramAnswers.slice(2, 4))),
    step(bilingual('Read the left-only and the right-only regions for the differences.', 'கண வித்தியாசங்களைக் காண இடப்புற வட்டத்தின் தனிப்பகுதியையும் வலப்புற வட்டத்தின் தனிப்பகுதியையும் தனித்தனியாகப் படிக்க.'), differenceWhy, lines(diagramAnswers.slice(4, 6))),
    step(bilingual('For each complement, use everything in the rectangle outside that circle. The whole rectangle gives U.', 'ஒவ்வொரு நிரப்புக் கணத்திற்கும் அந்த வட்டத்திற்கு வெளியே செவ்வகத்திற்குள் உள்ள எண்களை எழுதுக. செவ்வகத்திலுள்ள அனைத்து எண்களும் U இன் உறுப்புகள்.'), complementWhy, lines(diagramAnswers.slice(6)))
  ], lines(diagramAnswers), bilingual(
    'Sort the numbers by region before deciding which regions each operation needs.',
    'எண்களைப் பகுதி வாரியாகப் பிரித்த பிறகு, ஒவ்வொரு கணச் செயலுக்கும் எந்தப் பகுதிகள் தேவை எனக் காண்க.'
  ), fig('ex1-3-q1', bilingual(
    'In U, A only contains 2, 8, 10. The overlap contains 4, 7. B only contains 3, 6, 9, 11. The rectangle outside both circles contains 1 and 12.',
    'U இல் A மட்டும் உள்ள பகுதியில் 2, 8, 10 உள்ளன. பொதுப் பகுதியில் 4, 7 உள்ளன. B மட்டும் உள்ள பகுதியில் 3, 6, 9, 11 உள்ளன. இரு வட்டங்களுக்கும் வெளியே செவ்வகத்தில் 1, 12 உள்ளன.'
  ), bilingual('Fig. 1.25', 'படம் 1.25')));

  const pairs = [
    [[2, 6, 10, 14], [2, 5, 14, 16]],
    [['a', 'b', 'c', 'e', 'u'], ['a', 'e', 'i', 'o', 'u']],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0, 1, 2, 3, 4, 5]],
    [unique([...'mathematics']), unique([...'geometry'])]
  ];
  const q2Prompts = bilingual(
    ['2. Find ', ops[2], ', ', ops[3], ', ', ops[4], ' and ', ops[5], ' for the following sets.',
      ...rosterPair(0, 'A', pairs[0][0], 'B', pairs[0][1], 'en'),
      ...rosterPair(1, 'A', pairs[1][0], 'B', pairs[1][1], 'en'),
      '\n(iii) ', formula('A = {x : x ∈ N, x ≤ 10}', 'A=\\{x:x\\in N,\\ x\\le10\\}'), ' and ',
      formula('B = {x : x ∈ W, x < 6}', 'B=\\{x:x\\in W,\\ x<6\\}'),
      '\n(iv) A = Set of all letters in the word “mathematics” and\nB = Set of all letters in the word “geometry”'],
    ['2. பின்வரும் கணங்களுக்கு ', ops[2], ', ', ops[3], ', ', ops[4], ' மற்றும் ', ops[5], ' காண்க.',
      ...rosterPair(0, 'A', pairs[0][0], 'B', pairs[0][1], 'ta'),
      ...rosterPair(1, 'A', pairs[1][0], 'B', pairs[1][1], 'ta'),
      '\n(iii) ', formula('A = {x : x ∈ N, x ≤ 10}', 'A=\\{x:x\\in N,\\ x\\le10\\}'), ' மற்றும் ',
      formula('B = {x : x ∈ W, x < 6}', 'B=\\{x:x\\in W,\\ x<6\\}'),
      '\n(iv) A = “mathematics” என்ற சொல்லில் உள்ள எழுத்துகளின் கணம்\nB = “geometry” என்ற சொல்லில் உள்ள எழுத்துகளின் கணம்']
  );
  const pairAnswers = pairs.map(([a, b]) => [union(a, b), intersection(a, b), difference(a, b), difference(b, a)]
    .map((values, j) => equation(ops[j + 2], roster(values))));
  const q2Reasons = [
    bilingual('Mark the common numbers first. Put the remaining numbers into their own set differences and collect all distinct numbers in the union.',
      'முதலில் பொது எண்களைக் குறிக்க. மீதமுள்ள எண்களை அந்தந்த கண வித்தியாசத்தில் எழுதுக. வேறுபட்ட அனைத்து எண்களையும் சேர்ப்பில் எழுதுக.'),
    bilingual('Compare the letters individually. Shared letters stay in the intersection and the union.',
      'எழுத்துகளை ஒவ்வொன்றாக ஒப்பிடுக. பொது எழுத்துகள் வெட்டிலும் சேர்ப்பிலும் இடம்பெறும்.'),
    bilingual('List the natural numbers from 1 through 10 and the whole numbers from 0 through 5.',
      '1 முதல் 10 வரையிலான இயல் எண்களையும், 0 முதல் 5 வரையிலான முழு எண்களையும் பட்டியலிடுக.'),
    bilingual('List each distinct letter from each word exactly once.',
      'ஒவ்வொரு சொல்லிலும் உள்ள வேறுபட்ட எழுத்துகளை ஒருமுறை மட்டும் பட்டியலிடுக.')
  ];
  add(2, bilingual('Compare four pairs of sets', 'நான்கு கணச் சோடிகளை ஒப்பிடுதல்'), q2Prompts,
    pairs.flatMap(([a, b], i) => [
      step(bilingual('(' + roman[i] + ') ' + q2Reasons[i].en, '(' + roman[i] + ') ' + q2Reasons[i].ta),
        i === 2 ? bilingual('The natural numbers start at 1 in this book. The whole numbers also include 0.',
          'இப்பாடநூலில் இயல் எண்கள் 1 இல் தொடங்குகின்றன. முழு எண்களில் 0 உம் அடங்கும்.') : joinWhy,
        lines([set('A', a), set('B', b)])),
      step(bilingual('Use the shared members for the intersection and remove them from each set to get its difference.',
        'வெட்டில் பொது உறுப்புகளை எழுதுக. ஒவ்வொரு கணத்திலிருந்தும் அவற்றை நீக்கினால் அந்தக் கணத்தின் வித்தியாசம் கிடைக்கும்.'),
        differenceWhy, lines(pairAnswers[i]))
    ]),
    lines(pairAnswers.flatMap((rows, i) => [part(roman[i], rows[0]), ...rows.slice(1)])),
    bilingual('For each pair, list the members of the sets before applying the four operations.',
      'ஒவ்வொரு சோடிக்கும் நான்கு கணச் செயல்களைச் செய்யும் முன் கணங்களின் உறுப்புகளைப் பட்டியலிடுக.'));

  const complementSets = [
    [[...'abcdefgh'], [...'bdfh'], [...'adeh']],
    [[0, 1, 2, 3, 4, 5, 6, 7], [1, 3, 5, 7], [0, 2, 3, 5, 7]]
  ];
  complementSets.forEach(([u, a, b], i) => {
    const number = i + 3;
    const aPrime = difference(u, a), bPrime = difference(u, b);
    const answers = [aPrime, bPrime, union(aPrime, bPrime), intersection(aPrime, bPrime),
      difference(u, union(a, b)), difference(u, intersection(a, b)),
      difference(u, aPrime), difference(u, bPrime)]
      .map((values, j) => part(roman[j], equation(complements[j], roster(values))));
    add(number, bilingual('Work with complements', 'நிரப்புக் கணங்களைக் காணுதல்'), bilingual(
      [i === 0 ? '3. If ' : '4. Let ', ...joinSets(['U', 'A', 'B'], [u, a, b], 'en'), ', find the following sets.', ...mark(complements)],
      [number + '. ', ...joinSets(['U', 'A', 'B'], [u, a, b], 'ta'), ' எனில் பின்வரும் கணங்களைக் காண்க.', ...mark(complements)]
    ), [
      step(bilingual('Remove A from U and then remove B from U to get their complements.',
        'U இலிருந்து A இன் உறுப்புகளை நீக்கி A இன் நிரப்புக் கணத்தைக் காண்க. U இலிருந்து B இன் உறுப்புகளை நீக்கி B இன் நிரப்புக் கணத்தைக் காண்க.'),
      complementWhy, lines(answers.slice(0, 2))),
      step(bilingual('Now combine the complements for their union and keep only their common members for their intersection.',
        'நிரப்புக் கணங்களின் சேர்ப்புக்கு இரண்டையும் ஒன்றாகச் சேர்க்க. அவற்றின் வெட்டுக்குப் பொதுவான உறுப்புகளை மட்டும் எடுக்க.'),
      joinWhy, lines(answers.slice(2, 4))),
      step(bilingual('Find the union and intersection of the original sets before taking their complements.',
        'முதலில் தொடக்கக் கணங்களின் சேர்ப்பையும் வெட்டையும் காண்க. பிறகு அவற்றின் நிரப்புக் கணங்களைக் காண்க.'),
      complementWhy, lines([equation(ops[2], roster(union(a, b))), equation(ops[3], roster(intersection(a, b))), ...answers.slice(4, 6)])),
      step(bilingual('Complement each of the first two results. The second complement returns the original set.',
        'முதல் இரண்டு விடைகளுக்கும் மீண்டும் நிரப்புக் கணம் காண்க. இருமுறை நிரப்புக் கணம் காணும்போது தொடக்கக் கணமே கிடைக்கும்.'),
      fourRegions, lines(answers.slice(6)))
    ], lines(answers), bilingual('Use the same universal set for every complement.',
      'எல்லா நிரப்புக் கணங்களுக்கும் ஒரே அனைத்துக் கணத்தைப் பயன்படுத்துக.'));
  });

  const symmetric = [
    ['P', [2, 3, 5, 7, 11], 'Q', [1, 3, 5, 11]],
    ['R', [...'lmnop'], 'S', [...'jlnq']],
    ['X', [5, 6, 7], 'Y', [5, 7, 9, 10]]
  ];
  const symmetricSteps = [], symmetricAnswers = [];
  symmetric.forEach(([x, a, y, b], i) => {
    const subtract = (m, n) => formula(m + '−' + n, m + '-' + n);
    const left = difference(a, b), right = difference(b, a);
    const result = part(roman[i], equation(formula(x + '∆' + y, x + '\\mathbin{\\Delta}' + y), roster(union(left, right))));
    symmetricAnswers.push(result);
    symmetricSteps.push(step(bilingual(
      '(' + roman[i] + ') Remove the common elements to find both set differences, then take their union.',
      '(' + roman[i] + ') பொது உறுப்புகளை நீக்கி இரண்டு கண வித்தியாசங்களையும் காண்க. பின்னர் அவற்றின் சேர்ப்பைக் காண்க.'
    ), bilingual('Symmetric difference keeps members in exactly one set, whichever of the two sets it is.',
      'இரண்டு கணங்களில் ஏதேனும் ஒன்றில் மட்டும் உள்ள உறுப்புகளே சமச்சீர் வித்தியாசத்தில் இருக்கும்.'),
    lines([equation(subtract(x, y), roster(left)), equation(subtract(y, x), roster(right)), result])));
  });
  add(5, bilingual('Symmetric difference', 'சமச்சீர் வித்தியாசம்'), bilingual(
    ['5. Find the symmetric difference between the following sets.', ...symmetric.flatMap((entry, i) => rosterPair(i, ...entry, 'en'))],
    ['5. கொடுக்கப்பட்ட கணங்களின் சமச்சீர் வித்தியாசம் காண்க.', ...symmetric.flatMap((entry, i) => rosterPair(i, ...entry, 'ta'))]
  ), symmetricSteps, lines(symmetricAnswers), bilingual('In each pair, cross out members that occur in both sets.',
    'ஒவ்வொரு சோடியிலும் இரண்டு கணங்களுக்கும் பொதுவான உறுப்புகளை நீக்கிப் பார்க்க.'));

  const shadedEn = [
    formula('Y−X', 'Y-X'), formula('(X∪Y)′', '(X\\cup Y)^{\\prime}'),
    formula('(X−Y) ∪ (Y−X)', '(X-Y)\\cup(Y-X)')
  ];
  const shadedTa = [
    formula('B−A', 'B-A'), formula('(A∪B)′', '(A\\cup B)^{\\prime}'),
    formula('(A−B) ∪ (B−A)', '(A-B)\\cup(B-A)')
  ];
  const shadeReasons = [
    bilingual('In Fig. 1.26, the shaded region is inside Y and outside X.', 'படம் 1.26 இல் B இன் உள்ளேயும் A இன் வெளியேயும் உள்ள பகுதி நிழலிடப்பட்டுள்ளது.'),
    bilingual('In Fig. 1.27, the shaded region is outside both circles and inside U.', 'படம் 1.27 இல் இரு வட்டங்களுக்கும் வெளியேயும் U இன் உள்ளேயும் உள்ள பகுதி நிழலிடப்பட்டுள்ளது.'),
    bilingual('In Fig. 1.28, both side regions are shaded, leaving the common region unshaded.', 'படம் 1.28 இல் பொதுப் பகுதியைத் தவிர வட்டங்களின் தனிப்பகுதிகள் இரண்டும் நிழலிடப்பட்டுள்ளன.')
  ];
  add(6, bilingual('Name the shaded regions', 'நிழலிட்ட பகுதிகளைக் குறிப்பிடுதல்'), bilingual(
    ['6. Using the set symbols, write down the expressions for the shaded region in the following\n' + labels.join('   ')],
    ['6. கணக் குறியீடுகளைக் கொண்டு பின்வரும் நிழலிட்ட பகுதியினைக் குறிப்பிடவும்.\nபடம் 1.26   படம் 1.27   படம் 1.28']
  ), shadeReasons.map((reason, i) => step(reason, [differenceWhy, complementWhy, fourRegions][i],
    {...shadedEn[i], display: true}, {...shadedTa[i], display: true})),
  bilingual(lines(shadedEn.map((row, i) => part('1.' + (26 + i), row))), lines(shadedTa.map((row, i) => part('1.' + (26 + i), row)))),
  bilingual('First name the shaded regions in words, then choose the symbols for those regions.',
    'முதலில் நிழலிட்ட பகுதிகளைச் சொற்களால் விளக்கிப் பிறகு அவற்றுக்குரிய கணக் குறியீடுகளைத் தேர்ந்தெடுக்க.'),
  fig('ex1-3-q6-en', bilingual('All three frames contain overlapping sets X and Y. Fig. 1.26 shades the right crescent. Fig. 1.27 shades outside both circles. Fig. 1.28 shades both crescents.',
    'மூன்று படங்களிலும் A, B வட்டங்கள் ஒன்றையொன்று வெட்டுகின்றன. படம் 1.26 இல் வலப்புறத் தனிப்பகுதி, படம் 1.27 இல் வட்டங்களுக்கு வெளியிலுள்ள பகுதி, படம் 1.28 இல் வட்டங்களின் இரு தனிப்பகுதிகளும் நிழலிடப்பட்டுள்ளன.'),
    bilingual('Figs. 1.26, 1.27 and 1.28', 'படங்கள் 1.26, 1.27, 1.28'),
    {figureSrcTa: './assets/grade9-ch1/ex1-3-q6-ta.svg'}));

  const drawingOps = [ops[2], ops[3], complements[5], formula('(B–A)′', '(B-A)^{\\prime}'), complements[2], complements[3]];
  const drawingReasons = [
    bilingual('Shade all of both circles, including their overlap.', 'பொதுப் பகுதி உட்பட இரண்டு வட்டங்களையும் முழுமையாக நிழலிடுக.'),
    bilingual('Shade only the part common to the two circles.', 'இரண்டு வட்டங்களின் பொதுப் பகுதியை மட்டும் நிழலிடுக.'),
    bilingual('Leave the overlap clear. Shade the rest of the rectangle, including the region outside the circles.', 'பொதுப் பகுதியைத் தவிர்த்து, வட்டங்களுக்கு வெளியேயுள்ள பகுதி உட்பட செவ்வகத்தின் மீதிப் பகுதிகளை நிழலிடுக.'),
    bilingual('Leave the right-only crescent clear. Shade the left-only region, the overlap and the outside region.', 'வலப்புறத் தனிப்பகுதியைத் தவிர்த்து, இடப்புறத் தனிப்பகுதி, பொதுப் பகுதி, வெளிப்பகுதி ஆகியவற்றை நிழலிடுக.'),
    bilingual('Shade points outside at least one of the two circles. Only the overlap stays clear.', 'குறைந்தது ஒரு வட்டத்திற்கு வெளியே உள்ள பகுதிகளை நிழலிடுக. பொதுப் பகுதி மட்டும் நிழலிடப்படாமல் இருக்கும்.'),
    bilingual('Shade points outside both circles. Leave all parts within the circles clear.', 'இரண்டு வட்டங்களுக்கும் வெளியிலுள்ள பகுதியை மட்டும் நிழலிடுக. வட்டங்களின் உள்ளே நிழலிட வேண்டாம்.')
  ];
  const deMorgan = equation(complements[5], complements[2]);
  add(7, bilingual('Draw six Venn diagrams', 'ஆறு வென் படங்களை வரைதல்'), bilingual(
    ['7. Let A and B be two overlapping sets and the universal set be U. Draw appropriate Venn diagram for each of the following,',
      ...mark(drawingOps), '\n(vii) What do you observe from the Venn diagram (iii) and (v)?'],
    ['7. A, B என்பன வெட்டும் கணங்கள் மற்றும் U என்பது அனைத்துக் கணம் எனில், பின்வருவனவற்றை வென்படத்தில் குறிக்கவும்,',
      ...mark(drawingOps), '\n(vii) வினா எண் (iii) மற்றும் (v)-ன் வென்படங்களை உற்று நோக்கி உன்னுடைய கருத்தை எழுதுக.']
  ), [
    step(bilingual('Draw a rectangle for U and two overlapping circles within it. Label the left circle A and the right circle B.',
      'U ஐக் குறிக்க ஒரு செவ்வகம் வரைக. அதனுள் ஒன்றையொன்று வெட்டும் இரு வட்டங்களை வரைந்து, இடப்புற வட்டத்திற்கு A என்றும் வலப்புற வட்டத்திற்கு B என்றும் பெயரிடுக.'),
    fourRegions),
    ...drawingReasons.map((reason, i) => step(reason, [joinWhy, joinWhy, complementWhy, differenceWhy, complementWhy, complementWhy][i],
      {...part(roman[i], drawingOps[i]), display: true})),
    step(bilingual('The shading in (iii) and (v) is identical in each of the four regions. Therefore the two sets are equal.',
      '(iii), (v) ஆகிய இரண்டு படங்களிலும் நான்கு பகுதிகளின் நிழலிடலும் ஒரே மாதிரியாக உள்ளது. எனவே இரண்டு கணங்களும் சமம்.'),
    bilingual('A point is outside the overlap exactly when it is outside A or outside B.',
      'ஒரு புள்ளி பொதுப் பகுதிக்கு வெளியே இருந்தால், அது A க்கு வெளியேயோ B க்கு வெளியேயோ இருக்கும். இதன் மறுதலையும் உண்மை.'), deMorgan)
  ], {...part('vii', deMorgan), display: true}, bilingual(
    'For every diagram ask whether points in each of the four regions belong to the required set.',
    'ஒவ்வொரு படத்திலும் நான்கு பகுதிகளைத் தனித்தனியாகப் பார்த்து, அப்பகுதியின் புள்ளிகள் கேட்ட கணத்தில் சேருமா எனக் காண்க.'
  ), fig('ex1-3-q7', bilingual(
    'Six solution diagrams. (i) both circles, (ii) only the overlap, (iii) everything but the overlap, (iv) everything but the right crescent, (v) everything but the overlap, (vi) outside both circles.',
    'ஆறு தீர்வுப் படங்கள். (i) இரு வட்டங்கள், (ii) பொதுப் பகுதி மட்டும், (iii) பொதுப் பகுதி தவிர அனைத்தும், (iv) வலப்புறத் தனிப்பகுதி தவிர அனைத்தும், (v) பொதுப் பகுதி தவிர அனைத்தும், (vi) இரு வட்டங்களுக்கும் வெளிப்புறம்.'
  ), bilingual('Construction for parts (i)–(vi)', 'பகுதிகள் (i)–(vi) இன் வரைபடங்கள்'), {figureInSolution: true}));

  const grade = window.TRIGGLE_CLASSES?.[9];
  const chapter = window.TRIGGLE_CURRICULUM?.grades.find(entry => entry.grade === 9)?.chapters.find(entry => entry.id === 'g9-ch1');
  if (!grade || !chapter) throw Error('Grade 9 Set Language registration is unavailable.');
  chapter.textbookQuestionIds ??= [];
  for (const entry of entries) {
    if (grade.items.some(item => item.id === entry.id) || chapter.textbookQuestionIds.includes(entry.id)) {
      throw Error('Duplicate Set Language record: ' + entry.id);
    }
    grade.items.push(entry);
    chapter.textbookQuestionIds.push(entry.id);
  }
})();
