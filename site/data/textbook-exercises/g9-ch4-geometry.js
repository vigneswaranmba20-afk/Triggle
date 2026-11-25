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
        related = concept, difficulty = 'medium'} = options;
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
        answerMath: both([answer, ...math], [answerTa, ...math]),
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
  window.TriggleGrade9Geometry = {batch, step, both, formula, difficulty: {}};
})();
