/* Registration for source-checked Grade 9 Geometry exercise tasks. */
(() => {
  'use strict';
  const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 9).chapters.find(c => c.id === 'g9-ch4');
  const grade = window.TRIGGLE_CLASSES[9];
  const enSource = 'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view';
  const taSource = 'https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view';
  const both = (en, ta) => ({en, ta});
  const formula = (fallback, latex) => ({fallback, latex, display: true});
  const step = (en, ta, whyEn, whyTa, eq, latex) => ({
    en, ta, why: both(whyEn, whyTa), ...(eq ? {eq, math: formula(eq, latex)} : {})
  });
  function batch(section, concept, enPage, taPage) {
    const exercise = '4.' + section;
    return function add(number, q, steps, result, options = {}) {
      const {part, figure, pages = [enPage, taPage], note, choices, correct, construction,
        related = concept, questionMath, solutionChoice, difficulty = 'medium'} = options;
      const suffix = number + (part ? '-' + part : '');
      const id = 'g9-ch4-ex' + exercise + '-q' + suffix;
      if (grade.items.some(item => item.id === id)) throw Error('Duplicate textbook ID ' + id);
      const labelNumber = number + (part ? '(' + part + ')' : '');
      const [answer, answerTa, fallback, latex] = result;
      const math = fallback ? [formula(fallback, latex)] : [];
      const fig = figure ? 'assets/grade9-ch4/ex4-' + section + '-q' + suffix + '.svg' : null;
      grade.items.push({
        id, classNum: 9, chapter: '4', exercise, kind: 'textbook', topic: chapter.title,
        label: both('Exercise ' + exercise + ' · Q' + labelNumber, 'பயிற்சி ' + exercise + ' · வினா ' + labelNumber),
        title: both('Question ' + labelNumber, 'வினா ' + labelNumber), q: both(...q), steps,
        answer: [answer, fallback].filter(Boolean).join(' '),
        answerTa: [answerTa, fallback].filter(Boolean).join(' '),
        answerMath: solutionChoice ? both(
          ['Option '+(correct+1)+' · ', ...[].concat(solutionChoice.en)],
          ['விடை '+(correct+1)+' · ', ...[].concat(solutionChoice.ta)]
        ) : both([answer && fallback ? answer+' ' : answer, ...math], [answerTa && fallback ? answerTa+' ' : answerTa, ...math]),
        ...(questionMath ? {questionMath: both(...questionMath)} : {}),
        geometryConcept: related, hint: steps[0].why, translationReview: 'pending',
        edition: '2025', tamilQuestionSourceVerified: true, tamilWorkedSolutionReview: 'pending',
        source: enSource, page: pages[0], reference: 'TN SCERT Grade 9 Mathematics, revised 2025. EN printed p. ' + (pages[0]-6) + ' / PDF p. ' + pages[0] + '. TA printed p. ' + (pages[1]-6) + ' / PDF p. ' + pages[1] + '.',
        sourceFidelity: {status: 'page-images-checked-en-ta', enPrintedPage: pages[0]-6, enPdfPage: pages[0],
          taPrintedPage: pages[1]-6, taPdfPage: pages[1], taSource, tamilEditorial: 'textbook-question-checked',
          ...(note ? {notes: [note]} : {})},
        ...(fig ? {figureSrc: fig, figureAlt: both(...figure), figureCaption: both(...figure)} : {}),
        ...(choices ? {choices, correctIndex: correct} : {}),
        ...(construction ? {geometryConstruction: construction} : {})
      });
      chapter.textbookQuestionIds.push(id);
      window.TriggleGrade9Geometry.difficulty[id] = difficulty;
    };
  }
  const preservedHints = {
    '4.1-q2': both('Use one common multiplier for the three parts of the ratio.', 'விகிதத்தின் மூன்று உறுப்புகளுக்கும் ஒரே பெருக்கியைப் பயன்படுத்துக.'),
    '4.1-q4': both('Use the angle sum to find the angle at A and the angle at F.', 'கோணக் கூடுதலால் A, F கோணங்களைக் காண்க.'),
    '4.2-q1': both('Share the angle sum of a quadrilateral in the given ratio.', 'நாற்கரக் கோணங்களின் கூடுதலைக் கொடுத்த விகிதத்தில் பகிர்க.'),
    '4.2-q2': both('First use the supplementary relationship between A and C.', 'முதலில் A, C கோணங்களின் மிகை நிரப்பு உறவைப் பயன்படுத்துக.'),
    '4.2-q3': both('Compare the two half-diagonals OA and OB.', 'OA, OB ஆகிய அரை மூலைவிட்டங்களை ஒப்பிடுக.'),
    '4.2-q4': both('Use the perpendicular half-diagonals as the legs of a right triangle.', 'செங்குத்தாக வெட்டும் அரை மூலைவிட்டங்களைச் செங்கோண முக்கோணத்தின் கால்களாகக் கொள்க.'),
    '4.2-q6': both('Compare the heights measured between the same parallels.', 'ஒரே இணைகோடுகளுக்கு இடையில் அளக்கப்படும் உயரங்களை ஒப்பிடுக.'),
    '4.3-q1': both('Bisect the diameter and the chord before applying Pythagoras.', 'பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துவதற்கு முன் விட்டத்தையும் நாணையும் பாதியாக்குக.'),
    '4.3-q2': both('A perpendicular from the centre splits the chord into equal lengths.', 'மையத்திலிருந்து வரையும் செங்குத்து நாணை இரு சம நீளங்களாகப் பிரிக்கும்.'),
    '4.3-q4': both('The perpendicular distance and the half-chord are the two legs.', 'செங்குத்துத் தொலைவும் அரை நாணும் செங்கோண முக்கோணத்தின் இரு கால்கள்.'),
    '4.3-q6': both('Compare the two right triangles formed at the midpoint of the common chord.', 'பொது நாணின் நடுப்புள்ளியில் உருவாகும் செங்கோண முக்கோணங்களை ஒப்பிடுக.')
  };
  window.TriggleGrade9Geometry = {batch, step, both, formula, difficulty: {}, preservedHints};
})();
