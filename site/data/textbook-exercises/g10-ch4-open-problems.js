/* Shared registration for the open-response Grade 10 Geometry exercises. */
(() => {
  'use strict';
  const both = (en, ta) => ({en, ta});
  const math = (fallback, latex, display = false) => ({fallback, latex, display});

  function register(exercise, rows) {
    const grade = window.TRIGGLE_CLASSES[10];
    const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 4);
    const ids = new Set(grade.items.map(item => item.id));
    const unit = exercise === '4.unit';
    chapter.textbookQuestionIds ||= [];
    for (const row of rows) {
      const {number, part, en, ta, pdf, title, concept, figure, steps, answer, note} = row;
      const id = 'c10-4-' + (unit ? 'unit' : 'ex4-4') + '-q' + number + (part ? '-' + part : '');
      if (ids.has(id)) throw Error('Duplicate textbook ID ' + id);
      const labelNumber = number + (part ? '(' + part + ')' : '');
      const prefix = number + '. ';
      const questionMath = both([prefix].concat(en), [prefix].concat(ta));
      const literal = values => values.map(value => value.fallback ?? value).join('');
      const result = answer.en.map(value => value.fallback ?? value).join('');
      const label = both(
        (unit ? 'Unit Exercise 4' : 'Exercise 4.4') + ' · Q' + labelNumber,
        (unit ? 'அலகு பயிற்சி 4' : 'பயிற்சி 4.4') + ' · வினா ' + labelNumber
      );
      const figureFile = 'assets/grade10-geometry/' + (unit ? 'unit' : 'ex4-4') + '-q' + number + '.svg';
      grade.items.push({
        id, classNum: 10, chapter: '4', exercise, kind: 'textbook', topic: chapter.title,
        label, title, q: both(literal(questionMath.en), literal(questionMath.ta)), questionMath, steps,
        answer: result, answerTa: literal(answer.ta), answerMath: answer,
        conceptId: 'g10-ch4-' + concept, hint: steps[0].why,
        edition: '2025', translationReview: 'pending', tamilQuestionSourceVerified: true, tamilWorkedSolutionReview: 'pending',
        source: 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view',
        reference: `TN SCERT Grade 10 Mathematics, revised 2025. EN printed p. ${pdf.en - 6} / PDF p. ${pdf.en}. TA printed p. ${pdf.ta - 6} / PDF p. ${pdf.ta}.`,
        sourceFidelity: {status: 'page-visual-checked', sourcePdfPage: pdf, ...(note ? {note} : {})},
        ...(figure ? {figureSrc: figureFile, figureAlt: figure, figureCaption: figure} : {})
      });
      ids.add(id);
      chapter.textbookQuestionIds.push(id);
    }
  }

  window.TriggleGrade10Geometry = {
    register, both, math,
    step(en, ta, whyEn, whyTa, eq, latex) {
      return {en, ta, why: both(whyEn, whyTa), ...(eq ? {eq, math: math(eq, latex, true)} : {})};
    },
    answer(en, ta, fallback, latex) {
      const formula = fallback ? [math(fallback, latex, true)] : [];
      return both([en, ...formula], [ta, ...formula]);
    }
  };
})();
