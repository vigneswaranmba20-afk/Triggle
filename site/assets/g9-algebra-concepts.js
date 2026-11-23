/* Original, local-only Grade 9 Algebra interactive concepts (§§3.1–3.8) + concept↔exercise links. */
(() => {
  'use strict';

  const memory = { demo: {}, transfer: {} };
  const text = (en, ta, lang) => (lang === 'ta' ? ta : en);
  const make = (tag, cls, copy) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (copy !== undefined) el.textContent = copy;
    return el;
  };
  const latex = (expr, fallback, display = false) => {
    const engine = window.TriggleNotation;
    if (!engine || typeof engine.renderLatex !== 'function') {
      const fallbackSpan = make('span', 'g9a-math-fallback', fallback);
      return fallbackSpan.outerHTML;
    }
    return engine.renderLatex(expr, { displayMode: display, fallback });
  };

  const polyExamples = [
    {
      label: '3x² + 2x + 5',
      spoken: 'three x squared plus two x plus five',
      spokenTa: 'மூன்று எக்ஸ் வர்க்கம் கூட்டல் இரண்டு எக்ஸ் கூட்டல் ஐந்து',
      math: '3x^2+2x+5',
      rewrite: null,
      powers: [['3x²', '2', true], ['2x', '1', true], ['5', '0', true]],
      en: 'Polynomial. Every power of x is a whole number: 2, 1 and 0.',
      ta: 'பல்லுறுப்புக் கோவை. x-இன் அடுக்குகள் 2, 1, 0 ஆகிய அனைத்தும் முழு எண்கள்.'
    },
    {
      label: 'x⁻¹ + 2',
      spoken: 'x to the negative first power plus two',
      spokenTa: 'எக்ஸின் அடுக்கு குறை ஒன்று கூட்டல் இரண்டு',
      math: 'x^{-1}+2',
      rewrite: null,
      powers: [['x⁻¹', '−1', false], ['2', '0', true]],
      en: 'Not a polynomial in x. The exponent −1 is negative, not a whole number.',
      ta: 'x-இல் பல்லுறுப்புக் கோவை அல்ல. −1 என்பது முழு எண் அல்ல; அது குறை முழு.'
    },
    {
      label: '√x + 1',
      spoken: 'square root of x plus one',
      spokenTa: 'எக்ஸின் வர்க்கமூலம் கூட்டல் ஒன்று',
      math: '\\sqrt{x}+1',
      rewrite: '\\sqrt{x}=x^{\\frac{1}{2}}\\quad(x\\ge 0)',
      powers: [['√x', '½', false], ['1', '0', true]],
      en: 'Not a polynomial in x. The exponent ½ is a fraction, not a whole number.',
      ta: 'x-இல் பல்லுறுப்புக் கோவை அல்ல. ½ என்பது பின்ன அடுக்கு; முழு எண் அல்ல.'
    }
  ];

  const polyTransfers = [
    {
      math: '7',
      fallback: '7',
      answer: true,
      en: '7 is a nonzero constant polynomial. Its degree is 0.',
      ta: '7 என்பது பூச்சியமற்ற மாறிலிப் பல்லுறுப்புக் கோவை. அதன் படி 0.'
    },
    {
      math: '-2x^3+\\dfrac{1}{2}',
      fallback: '−2x³ + ½',
      answer: true,
      en: 'The powers are 3 and 0. Negative and fractional coefficients are allowed.',
      ta: 'அடுக்குகள் 3 மற்றும் 0. குறை எண்களும் பின்னங்களும் கெழுக்களாக வரலாம்.'
    },
    {
      math: '\\dfrac{5}{x}',
      fallback: '5/x',
      answer: false,
      en: 'For x ≠ 0, 5/x = 5x⁻¹. The exponent −1 is not a whole number.',
      ta: 'x ≠ 0 எனில் 5/x = 5x⁻¹. அடுக்கு −1 என்பது முழு எண் அல்ல.'
    }
  ];

  function renderPracticeLinks(panel, stage, lang, opts) {
    const ids = Array.isArray(stage.relatedQuestionIds) ? stage.relatedQuestionIds : [];
    const questions = Array.isArray(opts?.chapterQuestions) ? opts.chapterQuestions : [];
    const onQuestion = opts?.onQuestion;
    if (!ids.length || !questions.length || typeof onQuestion !== 'function') return;
    const matched = ids.map(id => questions.find(q => q.id === id)).filter(Boolean);
    if (!matched.length) return;

    const block = make('section', 'g9a-practice-links');
    block.setAttribute('aria-label', text('Practice this idea', 'இந்தக் கருத்துக்கான பயிற்சி', lang));
    block.append(make('h5', '', text('Practice this idea', 'இந்தக் கருத்துக்கான பயிற்சி', lang)));
    const row = make('div', 'g9a-practice-row');
    matched.forEach(qItem => {
      const btn = make('button', 'g9a-practice-btn', (qItem.label?.[lang] || qItem.label?.en || qItem.id) + ' →');
      btn.type = 'button';
      btn.addEventListener('click', () => onQuestion(qItem));
      row.append(btn);
    });
    block.append(row);
    panel.append(block);
  }

  function mountPowersHighlighter(panel, stage, lang, opts) {
    const ta = lang === 'ta';
    const stageNum = Number.isInteger(opts?.index) ? opts.index + 1 : 1;
    const demoKey = stage.id;
    if (memory.demo[demoKey] === undefined) memory.demo[demoKey] = 0;

    const heading = make('div', 'sp2-concept-heading');
    heading.tabIndex = -1;
    heading.append(make('h4', '', stageNum + '. ' + text(stage.title.en, stage.title.ta, lang)));
    panel.append(heading);

    const root = make('section', 'g9a-lab');
    root.setAttribute('aria-label', text('Polynomial powers highlighter', 'பல்லுறுப்புக் கோவையின் அடுக்குகளை அறிதல்', lang));
    root.append(make('p', 'g9a-rule', text('Every power of x must be a whole number: 0, 1, 2, 3, … .', 'x-இன் ஒவ்வோர் அடுக்கும் முழு எண்ணாக இருக்க வேண்டும்: 0, 1, 2, 3, … .', lang)));

    const group = make('div', 'g9a-choices');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', text('Choose an expression', 'ஒரு கோவையைத் தேர்ந்தெடுக்கவும்', lang));
    const buttons = polyExamples.map((example, i) => {
      const b = make('button', 'g9a-option', example.label);
      b.type = 'button';
      b.setAttribute('aria-label', ta ? example.spokenTa : example.spoken);
      b.addEventListener('click', () => { memory.demo[demoKey] = i; draw(); });
      group.append(b);
      return b;
    });
    root.append(group);

    const output = make('div', 'g9a-stage');
    output.setAttribute('role', 'status');
    output.setAttribute('aria-live', 'polite');
    output.setAttribute('aria-atomic', 'true');
    const expression = make('div', 'g9a-expression');
    const rewrite = make('div', 'g9a-rewrite');
    const chipGroup = make('div', 'g9a-powers');
    const verdict = make('p', 'g9a-verdict');
    output.append(expression, rewrite, chipGroup, verdict);
    root.append(output);

    function draw() {
      const idx = memory.demo[demoKey] || 0;
      const example = polyExamples[idx];
      buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(idx === i)));
      expression.innerHTML = latex(example.math, example.label, true);
      rewrite.hidden = !example.rewrite;
      rewrite.innerHTML = example.rewrite ? latex(example.rewrite, '√x = x^(1/2), for x ≥ 0', false) : '';
      chipGroup.replaceChildren();
      example.powers.forEach(([term, power, valid]) => {
        const chip = make('span', 'g9a-chip ' + (valid ? 'g9a-valid' : 'g9a-invalid'));
        const icon = make('span', 'g9a-icon', valid ? '✓' : '✕');
        icon.setAttribute('aria-hidden', 'true');
        chip.append(icon, document.createTextNode(term + ' → ' + text('power ', 'அடுக்கு ', lang) + power));
        chipGroup.append(chip);
      });
      verdict.textContent = ta ? example.ta : example.en;
      verdict.classList.toggle('g9a-incorrect', example.powers.some(x => !x[2]));
    }
    draw();
    panel.append(root);

    const practice = make('section', 'g9a-practice');
    practice.append(make('h5', '', text('Try three new expressions', 'மூன்று புதிய கோவைகளை முயற்சிக்கவும்', lang)));
    practice.append(make('p', 'g9a-small', text('Is each expression a polynomial in x?', 'ஒவ்வொரு கோவையும் x-இல் பல்லுறுப்புக் கோவையா?', lang)));
    polyTransfers.forEach((item, i) => {
      const tKey = demoKey + ':' + i;
      const row = make('div', 'g9a-transfer');
      const formula = make('div', 'g9a-transfer-math');
      formula.innerHTML = latex(item.math, item.fallback, false);
      const answers = make('div', 'g9a-answer-options');
      answers.setAttribute('role', 'group');
      answers.setAttribute('aria-label', text('Classify expression ' + (i + 1), 'கோவை ' + (i + 1) + '-ஐ வகைப்படுத்து', lang));
      const feedback = make('p', 'g9a-feedback');
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      const yes = make('button', '', text('Polynomial', 'பல்லுறுப்புக் கோவை', lang));
      const no = make('button', '', text('Not a polynomial', 'பல்லுறுப்புக் கோவை அல்ல', lang));
      [yes, no].forEach((btn, j) => {
        btn.type = 'button';
        btn.addEventListener('click', () => { memory.transfer[tKey] = j === 0; refresh(); });
        answers.append(btn);
      });
      function refresh() {
        const selection = memory.transfer[tKey];
        [yes, no].forEach((b, j) => b.setAttribute('aria-pressed', String(selection === (j === 0))));
        if (typeof selection === 'boolean') {
          const correct = selection === item.answer;
          feedback.textContent = (correct ? text('Correct. ', 'சரி. ', lang) : text('Check again. ', 'மீண்டும் சரிபார். ', lang)) + (ta ? item.ta : item.en);
          feedback.classList.toggle('g9a-incorrect', !correct);
        }
      }
      row.append(formula, answers, feedback);
      practice.append(row);
      refresh();
    });
    panel.append(practice);

    const details = make('details', 'g9a-deep');
    details.append(make('summary', '', text('Understand the idea', 'கருத்தைப் புரிந்துகொள்வோம்', lang)));
    const list = make('ul', '');
    const ideas = ta ? [
      'மாறி x-இன் அடுக்குகள் 0, 1, 2, ... என்ற முழு எண்களாக இருக்க வேண்டும்.',
      'கெழு என்பது x-க்கு முன்னுள்ள எண். −2, ½ போன்ற மெய்யெண்களும் கெழுக்களாக வரலாம்.',
      'x-இன் அடுக்கு எழுதப்படாவிட்டால் அது 1. பூச்சியமற்ற மாறிலியின் படி 0.',
      '0 என்பதும் ஒரு பல்லுறுப்புக் கோவை. ஆனால் பூச்சியப் பல்லுறுப்புக் கோவையின் படி வரையறுக்கப்படவில்லை.',
      'x ≠ 0 எனும்போது x⁰ = 1. 0⁰ பற்றிய விதியை இங்கு பயன்படுத்த வேண்டாம்.'
    ] : [
      'The powers of variable x must be whole numbers: 0, 1, 2, ... .',
      'A coefficient is a number multiplying a power of x. Real coefficients such as −2 or ½ are allowed.',
      'When x has no written exponent, its exponent is 1. A nonzero constant polynomial has degree 0.',
      'The expression 0 is also a polynomial, but the degree of the zero polynomial is undefined.',
      'For x ≠ 0, x⁰ = 1. Do not use this statement to assign a value to 0⁰.'
    ];
    ideas.forEach(s => list.append(make('li', '', s)));
    details.append(list);
    panel.append(details);

    renderPracticeLinks(panel, stage, lang, opts);

    panel.append(make('small', 'g9a-source', text('2025 State Board Mathematics · §3.2 · English printed p. 81 · Tamil printed p. 88', '2025 கணிதப் பாடநூல் · §3.2 · ஆங்கிலம் ப. 81 · தமிழ் ப. 88', lang)));
    if (ta) panel.append(make('p', 'g9a-review', 'தமிழ் கற்றல் உரை · 2025 பாடநூல் கலைச்சொற்களுடன் உருவாக்கப்பட்டது (ஆசிரியர் மீளாய்வு நிலுவையில்).'));
  }

  function mountExplorer(panel, stage, lang, opts) {
    const ta = lang === 'ta';
    const stageNum = Number.isInteger(opts?.index) ? opts.index + 1 : 1;
    const demoKey = stage.id;
    if (memory.demo[demoKey] === undefined) memory.demo[demoKey] = 0;

    const heading = make('div', 'sp2-concept-heading');
    heading.tabIndex = -1;
    heading.append(make('h4', '', stageNum + '. ' + text(stage.title.en, stage.title.ta, lang)));
    panel.append(heading);

    const root = make('section', 'g9a-lab');
    root.setAttribute('aria-label', text(stage.title.en, stage.title.ta, lang));
    if (stage.rule) {
      root.append(make('p', 'g9a-rule', text(stage.rule.en, stage.rule.ta, lang)));
    }
    if (stage.math?.latex) {
      const ruleMath = make('div', 'g9a-rule-math');
      ruleMath.innerHTML = latex(stage.math.latex, stage.math.fallback || '', true);
      root.append(ruleMath);
    }

    const examples = Array.isArray(stage.examples) ? stage.examples : [];
    if (examples.length) {
      const group = make('div', 'g9a-choices');
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', text('Choose an example', 'ஒரு எடுத்துக்காட்டைத் தேர்ந்தெடுக்கவும்', lang));
      const buttons = examples.map((ex, i) => {
        const b = make('button', 'g9a-option', ex.label);
        b.type = 'button';
        b.setAttribute('aria-label', ta ? (ex.spokenTa || ex.label) : (ex.spoken || ex.label));
        b.addEventListener('click', () => { memory.demo[demoKey] = i; draw(); });
        group.append(b);
        return b;
      });
      root.append(group);

      const output = make('div', 'g9a-stage');
      output.setAttribute('role', 'status');
      output.setAttribute('aria-live', 'polite');
      output.setAttribute('aria-atomic', 'true');
      const expression = make('div', 'g9a-expression');
      const chipGroup = make('div', 'g9a-powers');
      const verdict = make('p', 'g9a-verdict');
      output.append(expression, chipGroup, verdict);
      root.append(output);

      function draw() {
        const idx = memory.demo[demoKey] || 0;
        const ex = examples[idx];
        buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(idx === i)));
        expression.innerHTML = latex(ex.math, ex.label, true);
        chipGroup.replaceChildren();
        (ex.chips || []).forEach(([head, enTxt, taTxt, valid]) => {
          const chip = make('span', 'g9a-chip ' + (valid ? 'g9a-valid' : 'g9a-invalid'));
          const icon = make('span', 'g9a-icon', valid ? '✓' : '✕');
          icon.setAttribute('aria-hidden', 'true');
          chip.append(icon, document.createTextNode(head + ' · ' + (ta ? taTxt : enTxt)));
          chipGroup.append(chip);
        });
        verdict.textContent = ta ? ex.ta : ex.en;
      }
      draw();
    }
    panel.append(root);

    const transfers = Array.isArray(stage.transfers) ? stage.transfers : [];
    if (transfers.length) {
      const practice = make('section', 'g9a-practice');
      practice.append(make('h5', '', text('Quick check', 'உடனடிச் சரிபார்ப்பு', lang)));
      transfers.forEach((item, i) => {
        const tKey = demoKey + ':' + i;
        const row = make('div', 'g9a-transfer');
        if (item.promptEn || item.promptTa) {
          row.append(make('p', 'g9a-small', text(item.promptEn, item.promptTa, lang)));
        }
        const formula = make('div', 'g9a-transfer-math');
        formula.innerHTML = latex(item.math, item.fallback, false);
        const answers = make('div', 'g9a-answer-options');
        answers.setAttribute('role', 'group');
        answers.setAttribute('aria-label', text('Check ' + (i + 1), 'சரிபார்ப்பு ' + (i + 1), lang));
        const feedback = make('p', 'g9a-feedback');
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        const yes = make('button', '', text(item.yesEn || 'Yes', item.yesTa || 'ஆம்', lang));
        const no = make('button', '', text(item.noEn || 'No', item.noTa || 'இல்லை', lang));
        [yes, no].forEach((btn, j) => {
          btn.type = 'button';
          btn.addEventListener('click', () => { memory.transfer[tKey] = j === 0; refresh(); });
          answers.append(btn);
        });
        function refresh() {
          const selection = memory.transfer[tKey];
          [yes, no].forEach((b, j) => b.setAttribute('aria-pressed', String(selection === (j === 0))));
          if (typeof selection === 'boolean') {
            const correct = selection === item.answer;
            feedback.textContent = (correct ? text('Correct. ', 'சரி. ', lang) : text('Check again. ', 'மீண்டும் சரிபார். ', lang)) + (ta ? item.ta : item.en);
            feedback.classList.toggle('g9a-incorrect', !correct);
          }
        }
        row.append(formula, answers, feedback);
        practice.append(row);
        refresh();
      });
      panel.append(practice);
    }

    const deepItems = stage.deepDive?.[lang] || stage.deepDive?.en || [];
    if (deepItems.length) {
      const details = make('details', 'g9a-deep');
      details.append(make('summary', '', text('Understand the idea', 'கருத்தைப் புரிந்துகொள்வோம்', lang)));
      const list = make('ul', '');
      deepItems.forEach(s => list.append(make('li', '', s)));
      details.append(list);
      panel.append(details);
    }

    renderPracticeLinks(panel, stage, lang, opts);

    const srcStr = text(
      '2025 State Board Mathematics · §' + stage.section + ' · English printed p. ' + stage.page.en + ' · Tamil printed p. ' + stage.page.ta,
      '2025 கணிதப் பாடநூல் · §' + stage.section + ' · ஆங்கிலம் ப. ' + stage.page.en + ' · தமிழ் ப. ' + stage.page.ta,
      lang
    );
    panel.append(make('small', 'g9a-source', srcStr));
    if (ta) panel.append(make('p', 'g9a-review', 'தமிழ் கற்றல் உரை · 2025 பாடநூல் கலைச்சொற்களுடன் உருவாக்கப்பட்டது (ஆசிரியர் மீளாய்வு நிலுவையில்).'));
  }

  function mount(panel, stage, lang, opts = {}) {
    panel.replaceChildren();
    if (stage.lesson === 'powers-highlighter') {
      mountPowersHighlighter(panel, stage, lang, opts);
    } else {
      mountExplorer(panel, stage, lang, opts);
    }
  }

  // Contextual "Understand this idea" link from any Grade 9 Ch 3 exercise back to its concept stage.
  function conceptIndexForItem(item) {
    if (!item || String(item.chapter) !== '3' || Number(item.classNum) !== 9) return null;
    const stages = window.TRIGGLE_ALGEBRA_PATH?.stages || [];
    const direct = stages.findIndex(s => Array.isArray(s.relatedQuestionIds) && s.relatedQuestionIds.includes(item.id));
    if (direct >= 0) return direct;
    const ex = String(item.exercise || '');
    const map = {
      '3.1': 1, '3.2': 3, '3.3': 4, '3.4': 5, '3.5': 6, '3.6': 6,
      '3.7': 7, '3.8': 7, '3.9': 8,
      '3.10': 9, '3.11': 9, '3.12': 9, '3.13': 9, '3.14': 9, '3.15': 1
    };
    return map[ex] ?? 0;
  }

  function syncExerciseReturnLink(detail) {
    const card = document.getElementById('lessonCard');
    if (!card) return;
    let wrap = card.querySelector('.g9a-concept-return-wrap');
    const item = detail?.item;
    const lang = detail?.lang || 'en';
    const idx = conceptIndexForItem(item);
    if (idx === null || !item) {
      if (wrap) wrap.hidden = true;
      return;
    }
    if (!wrap) {
      wrap = make('div', 'g9a-concept-return-wrap');
      const btn = make('button', 'g9a-concept-return', '');
      btn.type = 'button';
      wrap.append(btn);
      const qText = document.getElementById('questionText');
      if (qText && qText.parentElement === card) qText.insertAdjacentElement('afterend', wrap);
      else card.append(wrap);
    }
    wrap.hidden = false;
    const btn = wrap.querySelector('button');
    const stage = (window.TRIGGLE_ALGEBRA_PATH?.stages || [])[idx];
    const title = stage ? (stage.title?.[lang] || stage.title?.en || '') : '';
    btn.textContent = text('Understand this idea: ', 'இந்தக் கருத்தைத் தெரிந்துகொள்ளுங்கள்: ', lang) + title + ' →';
    btn.onclick = () => {
      const url = new URL(location.href);
      url.searchParams.set('class', '9');
      url.searchParams.set('chapter', 'g9-ch3');
      url.searchParams.set('section', 'concepts');
      url.searchParams.set('concept', String(idx));
      url.searchParams.delete('question');
      location.href = url.toString();
    };
  }

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('triggle:lessonchange', e => syncExerciseReturnLink(e.detail));
  }

  window.TriggleG9AlgebraConcepts = Object.freeze({ mount, conceptIndexForItem });
})();