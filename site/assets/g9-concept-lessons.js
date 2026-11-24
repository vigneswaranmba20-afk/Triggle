/* Short, original bilingual concept investigations for Grade 9. */
(() => {
  'use strict';

  function mount(panel, lesson, lang, exercise, onQuestion) {
    const ta = lang === 'ta';
    const pick = value => value[lang];
    const copy = ta ? {
      check: 'நீங்களே முயற்சி செய்யுங்கள்', details: 'மேலும் அறிக', hint: 'குறிப்பு', reset: 'மீண்டும் தொடங்கு',
      correct: 'சரி! ', retry: 'மீண்டும் முயலுங்கள். ', source: 'பாடநூல்',
      mathUnavailable: 'கணிதக் கோவையைக் காட்ட இயலவில்லை', printed: 'அச்சுப் பக்கம்', pdf: 'PDF பக்கம்', exercise: 'பயிற்சி'
    } : {
      check: 'Try it yourself', details: 'Explore further', hint: 'Hint', reset: 'Reset',
      correct: 'Correct! ', retry: 'Try again. ', source: 'Textbook',
      mathUnavailable: 'Mathematical expression unavailable', printed: 'printed page', pdf: 'PDF page', exercise: 'Exercise'
    };
    const element = (tag, text, className) => {
      const node = document.createElement(tag);
      if (text) node.textContent = text;
      if (className) node.className = className;
      return node;
    };
    const addMath = (parent, latex) => {
      if (!latex) return;
      const formula = element('div', '', 'g9-investigation-math');
      if (window.TriggleNotation) {
        formula.innerHTML = window.TriggleNotation.renderLatex(latex, {displayMode: true, fallback: copy.mathUnavailable});
        window.TriggleNotation.prepare(formula);
      } else {
        formula.textContent = copy.mathUnavailable;
      }
      parent.append(formula);
    };

    const lessonHeading = element('div', '', 'sp2-concept-heading');
    lessonHeading.tabIndex = -1;
    lessonHeading.append(element('h4', lesson.section + ' ' + pick(lesson.title)));
    const body = element('div', '', 'g9-investigation');
    body.append(element('p', pick(lesson.intro)));

    const activity = element('fieldset', '', 'g9-investigation-activity');
    const activityLabel = element('legend', pick(lesson.activity.label));
    const controls = element('div', '', 'sp2-answers');
    const diagram = element('div', '', 'g9-investigation-diagram');
    const result = element('div', '', 'g9-investigation-result');
    result.setAttribute('aria-live', 'polite');
    const activityButtons = lesson.activity.options.map(option => {
      const button = element('button', pick(option.label));
      button.type = 'button';
      button.addEventListener('click', () => select(option));
      controls.append(button);
      return button;
    });
    function select(option) {
      activityButtons.forEach((button, index) => {
        button.setAttribute('aria-pressed', String(lesson.activity.options[index] === option));
      });
      diagram.innerHTML = option.diagram?.(lang) || '';
      diagram.hidden = !option.diagram;
      result.replaceChildren(element('p', pick(option.result)));
      addMath(result, option.math);
    }
    activity.append(activityLabel, controls, diagram, result);
    body.append(activity, element('p', pick(lesson.explanation)));
    addMath(body, lesson.math);
    if (lesson.details?.length) {
      const more = element('details', '', 'g9-investigation-more');
      more.append(element('summary', copy.details));
      for (const detail of lesson.details) {
        more.append(element('p', pick(detail.text)));
        addMath(more, detail.math);
      }
      body.append(more);
    }

    const check = element('fieldset', '', 'sp2-recall g9-investigation-check');
    const answers = element('div', '', 'sp2-answers');
    const feedback = element('p', '', 'g9-investigation-feedback');
    feedback.setAttribute('role', 'status');
    const answerButtons = lesson.check.options.map(option => {
      const button = element('button', pick(option.label));
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        answerButtons.forEach(answer => answer.setAttribute('aria-pressed', String(answer === button)));
        feedback.textContent = (option.correct ? copy.correct : copy.retry) + pick(option.feedback);
      });
      answers.append(button);
      return button;
    });
    const reset = element('button', copy.reset, 'g9-investigation-reset');
    reset.type = 'button';
    reset.addEventListener('click', () => {
      select(lesson.activity.options[0]);
      answerButtons.forEach(answer => answer.setAttribute('aria-pressed', 'false'));
      feedback.textContent = '';
    });
    check.append(element('legend', copy.check), element('p', pick(lesson.check.question)), answers);
    const checkActions = element('div', '', 'sp2-recall-actions');
    if (lesson.check.hint) {
      const hint = element('button', copy.hint);
      hint.type = 'button';
      hint.addEventListener('click', () => { feedback.textContent = pick(lesson.check.hint); });
      checkActions.append(hint);
    }
    checkActions.append(reset);
    check.append(checkActions, feedback);
    body.append(check);

    if (exercise && typeof onQuestion === 'function') {
      const medium = ta && !exercise.q?.ta ? ' (ஆங்கிலத்தில் மட்டும்)' : '';
      const link = element('button', copy.exercise + ' ' + exercise.exercise + medium + ' →', 'g10ch2-practice-link');
      link.type = 'button';
      link.addEventListener('click', () => onQuestion(exercise));
      body.append(link);
    }
    const pages = lesson.pages?.[lang];
    if (pages?.printed && pages.pdf) {
      const reference = copy.source + ' §' + lesson.section + ' · ' +
        copy.printed + ' ' + pages.printed + ' · ' + copy.pdf + ' ' + pages.pdf;
      body.append(element('small', reference, 'sp2-stage-reference'));
    }

    panel.replaceChildren(lessonHeading, body);
    select(lesson.activity.options[0]);
  }

  window.TriggleG9ConceptLessons = Object.freeze({mount});
})();
