/* Grade 9 Probability demonstrations. All trials and rendering run locally. */
(() => {
  'use strict';

  const tex = String.raw;
  const renderMath = (latex, fallback) => window.TriggleNotation.render({latex, fallback, display: true});
  const percent = fraction => Number((fraction * 100).toFixed(1)) + '%';
  const copy = {
    en: {matches: 'matches', details: 'Understand the idea', practice: 'Try it yourself',
      answers: 'Answer choices', hint: 'Hint', correct: 'Correct.', retry: 'Try again.'},
    ta: {matches: 'பொருந்துகிறது', details: 'கருத்தைப் புரிந்துகொள்ளுங்கள்', practice: 'நீங்களே முயலுங்கள்',
      answers: 'விடைத் தேர்வுகள்', hint: 'குறிப்பு', correct: 'சரி.', retry: 'மீண்டும் முயலுங்கள்.'}
  };

  function outcomeGrid(labels) {
    const grid = document.createElement('ul');
    grid.className = 'probability-outcomes';
    grid.setAttribute('role', 'list');
    const cells = labels.map(label => {
      const cell = document.createElement('li');
      cell.textContent = label;
      grid.append(cell);
      return cell;
    });
    return {grid, cells};
  }

  function mark(cells, matches, matchLabel) {
    cells.forEach((cell, i) => {
      cell.classList.toggle('probability-match', matches.includes(i));
      const old = cell.querySelector('span');
      if (old) old.remove();
      if (matches.includes(i)) {
        const tick = document.createElement('span');
        tick.textContent = ' ✓';
        tick.setAttribute('aria-label', matchLabel);
        cell.append(tick);
      }
    });
  }

  function button(label, onClick) {
    const control = document.createElement('button');
    control.type = 'button';
    control.textContent = label;
    control.addEventListener('click', onClick);
    return control;
  }

  function select(host, label, options, change) {
    const group = document.createElement('div');
    group.className = 'probability-controls';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', label);
    function selectOption(index) {
      controls.forEach((control, i) => control.setAttribute('aria-pressed', String(i === index)));
      change(index);
    }
    const controls = options.map((option, index) => button(option, () => selectOption(index)));
    group.append(...controls);
    host.append(group);
    selectOption(0);
  }

  function showResult(result, latex, fallback, conclusion) {
    result.innerHTML = renderMath(latex, fallback);
    const summary = document.createElement('p');
    summary.textContent = conclusion;
    result.append(summary);
    window.TriggleNotation.prepare(result);
  }

  function chance(host, result, lang) {
    const ta = lang === 'ta';
    const star = ta ? 'நட்சத்திரம்' : 'Star';
    const {grid, cells} = outcomeGrid([star, star, star, ta ? 'நிலவு' : 'Moon']);
    grid.classList.toggle('probability-wide-outcomes', ta);
    const events = [
      [[0, 1, 2], tex`\dfrac{3}{4}`, ta ? 'நான்கில் மூன்று' : 'Three quarters',
        ta ? 'நான்கு உறைகளில் மூன்றில் நட்சத்திரம் உள்ளது. நட்சத்திரம் கிடைக்க அதிக வாய்ப்பு உண்டு.' : 'Three of the four envelopes have stars. A star is likely.'],
      [[], '0', ta ? 'பூச்சியம்' : 'Zero',
        ta ? 'எந்த உறையிலும் சூரியன் இல்லை. சூரியன் கிடைக்க இயலாது.' : 'No envelope has a sun. A sun is impossible.'],
      [[0, 1, 2, 3], '1', ta ? 'ஒன்று' : 'One',
        ta ? 'ஒவ்வொரு உறையிலும் நட்சத்திரம் அல்லது நிலவு உள்ளது. இரண்டில் ஒன்று கிடைப்பது உறுதி.' : 'Every envelope has a star or a moon. One of them is certain.']
    ];
    select(host, ta ? 'எந்த நிகழ்ச்சியைத் தேடுகிறீர்கள்?' : 'Which event are you looking for?',
      ta ? ['நட்சத்திரம்', 'சூரியன்', 'நட்சத்திரம் அல்லது நிலவு'] : ['A star', 'A sun', 'A star or moon'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches, copy[lang].matches);
      showResult(result, latex, fallback, summary);
    });
    grid.setAttribute('aria-label', ta ? 'நான்கு உறைகளும்' : 'All four envelopes');
    host.append(grid);
  }

  function sampleSpace(host, result, lang) {
    const ta = lang === 'ta';
    const signals = ['RR', 'RB', 'BR', 'BB'];
    const colors = {R: 'சிவப்பு', B: 'நீலம்'};
    const {grid, cells} = outcomeGrid(ta
      ? signals.map(signal => [...signal].map(code => colors[code]).join(', ') + ' (' + signal + ')')
      : signals);
    grid.classList.toggle('probability-wide-outcomes', ta);
    grid.setAttribute('aria-label', ta ? 'வரிசைப்படுத்தப்பட்ட நான்கு விளைவுகள்' : 'All four ordered signals');
    const events = [
      [[], tex`S=\{\mathrm{RR},\mathrm{RB},\mathrm{BR},\mathrm{BB}\}`,
        ta ? 'கூறுவெளியில் RR, RB, BR, BB உள்ளன.' : 'The sample space contains RR, RB, BR and BB.',
        ta ? 'S என்பது முழுக் கூறுவெளி. ஒவ்வொரு சோடியும் ஒரு முழு விளைவு. இதேபோல் இரண்டு பகடைகளை உருட்டினால் வரிசையுடன் 36 சோடிகள் கிடைக்கும்.' : 'S is the whole sample space. Each pair is one complete outcome (ordered pairs also give n(S)=6×6=36 for two dice).'],
      [[1, 2], tex`E=\{\mathrm{RB},\mathrm{BR}\}`,
        ta ? 'நிகழ்ச்சி E-இல் RB, BR ஆகிய விளைவுகள் உள்ளன.' : 'The event has outcomes RB and BR.',
        ta ? 'குறியிடப்பட்ட இரண்டு விளைவுகளும் E-க்குப் பொருந்தும். ஒன்றில் முதல் ஒளி நீலம், மற்றொன்றில் இரண்டாம் ஒளி நீலம்.' : 'The event E matches both marked signals. They differ in which flash is blue.'],
      [[1, 2, 3], tex`\begin{aligned}E&=\{\mathrm{RB},\mathrm{BR},\mathrm{BB}\}\\P(E)&=\dfrac{3}{4}\end{aligned}`,
        ta ? 'நான்கு விளைவுகளில் மூன்றில் குறைந்தது ஒரு நீல ஒளி வரும்.' : 'Three out of four signals have at least one blue.',
        ta ? 'வரிசை முக்கியம். RB, BR, BB ஆகிய மூன்றிலும் குறைந்தது ஒரு நீல ஒளி உண்டு. நான்கு விளைவுகளுக்கும் சம வாய்ப்பு இருப்பதால் நிகழ்தகவு முக்கால்.' : 'Order matters: all three marked signals count. The four signals are equally likely, giving a probability of three quarters.']
    ];
    select(host, ta ? 'எந்த விளைவுகளைப் பார்க்க விரும்புகிறீர்கள்?' : 'View possible signals',
      ta ? ['எல்லா விளைவுகளும்', 'ஒரே ஒரு நீல ஒளி', 'குறைந்தது ஒரு நீல ஒளி'] : ['All signals', 'Exactly one blue', 'At least one blue'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches, copy[lang].matches);
      showResult(result, latex, fallback, summary);
    });
    host.append(grid);
  }

  function classical(host, result, lang) {
    const ta = lang === 'ta';
    const {grid, cells} = outcomeGrid(['1', '2', '3', '4', '5', '6']);
    grid.setAttribute('aria-label', ta ? 'பகடையின் ஆறு முகங்கள்' : 'All six die faces');
    const events = [
      [[3, 4, 5], tex`\dfrac{3}{6}=\dfrac{1}{2}`, ta ? 'ஆறில் மூன்று என்பது பாதி.' : 'Three out of six is one half.',
        ta ? 'மூன்று முகங்கள் பொருந்துகின்றன. 3-ஐ விடப் பெரிய எண் கிடைக்கும் வாய்ப்பு பாதி.' : 'Three faces match. There is a one-half chance of a page above 3.'],
      [[2, 5], tex`\dfrac{2}{6}=\dfrac{1}{3}`, ta ? 'ஆறில் இரண்டு என்பது மூன்றில் ஒன்று.' : 'Two out of six is one third.',
        ta ? '3, 6 ஆகிய இரண்டும் மட்டுமே பொருந்துகின்றன. 3-இன் மடங்கு கிடைக்கும் வாய்ப்பு மூன்றில் ஒன்று.' : 'Only 3 and 6 match. There is a one-third chance of a multiple of 3.'],
      [[1, 2, 4], tex`\{2,3,5\},\;P=\dfrac{3}{6}=\dfrac{1}{2}`, ta ? 'ஆறு முகங்களில் 2, 3, 5 ஆகிய மூன்றும் பகா எண்கள்.' : 'Three out of six faces (2, 3, 5) are prime.',
        ta ? 'பகடையில் 2, 3, 5 ஆகியவை பகா எண்கள். 1 பகா எண்ணும் அல்ல, பகு எண்ணும் அல்ல.' : 'Primes on a die are {2, 3, 5}: 1 is neither prime nor composite.']
    ];
    select(host, ta ? 'எந்தப் பக்கங்கள் பொருந்தும்?' : 'Which pages count?',
      ta ? ['3-ஐ விடப் பெரியவை', '3-இன் மடங்குகள்', 'பகா எண்கள்'] : ['Above 3', 'Multiples of 3', 'Prime numbers'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches, copy[lang].matches);
      showResult(result, latex, fallback, summary);
    });
    host.append(grid);
  }

  function empirical(host, result, lang) {
    const ta = lang === 'ta';
    const waiting = ta ? 'சுண்டிய பின் முடிவு தெரியும்' : 'Observed · awaiting tosses';
    const start = ta ? 'தலை விழும் எண்ணிக்கையைப் பார்க்க நாணயத்தைச் சுண்டுங்கள்.' : 'Toss the coin to start counting heads.';
    let tosses = 0;
    let heads = 0;
    const controls = document.createElement('div');
    controls.className = 'probability-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', ta ? 'நாணயத்தைச் சுண்டும் சோதனை' : 'Coin toss simulation');
    const comparisons = document.createElement('dl');
    comparisons.className = 'probability-comparison';
    comparisons.innerHTML = '<dt></dt><dd><meter min="0" max="1" value="0.5">50%</meter></dd>' +
      '<dt data-observed-label></dt><dd><meter min="0" max="1" hidden></meter></dd>';
    const [theoretical, observed] = comparisons.querySelectorAll('meter');
    comparisons.querySelector('dt').textContent = ta ? 'சீரான நாணயம் · 50%' : 'Fair coin · 50%';
    theoretical.setAttribute('aria-label', ta ? 'தலை விழும் கோட்பாட்டு நிகழ்தகவு' : 'Theoretical chance of heads');
    observed.setAttribute('aria-label', ta ? 'சோதனையில் தலை விழுந்த விகிதம்' : 'Observed share of heads');
    const observedLabel = comparisons.querySelector('[data-observed-label]');
    function run(batch) {
      let latest;
      for (let i = 0; i < batch; i++) {
        latest = Math.random() < 0.5;
        if (latest) heads++;
      }
      tosses += batch;
      const share = heads / tosses;
      observed.hidden = false;
      observed.value = share;
      observedLabel.textContent = (ta ? 'கண்ட விகிதம் · ' : 'Observed · ') + percent(share);
      const fallback = ta ? tosses + ' முறைகளில் ' + heads + ' முறை' : heads + ' out of ' + tosses;
      let summary;
      if (ta) {
        const comparison = share === 0.5 ? '50%-க்குச் சமம்' : share > 0.5 ? '50%-ஐ விட அதிகம்' : '50%-ஐ விடக் குறைவு';
        const recap = batch === 1 ? (latest ? 'தலை' : 'பூ') + ' விழுந்தது. ' : '';
        summary = recap + fallback + ' தலை விழுந்தது. இந்த விகிதம் ' + comparison + '.';
      } else {
        const comparison = share === 0.5 ? 'equal to' : share > 0.5 ? 'above' : 'below';
        const recap = batch === 1 ? 'This toss was ' + (latest ? 'heads' : 'tails') + '. ' : '';
        const total = heads + (heads === 1 ? ' head' : ' heads') + ' in ' +
          tosses + (tosses === 1 ? ' toss' : ' tosses');
        summary = recap + total + ', ' + comparison + ' the model’s one-half chance.';
      }
      showResult(result, tex`\dfrac{${heads}}{${tosses}}`, fallback, summary);
    }
    function reset() {
      tosses = 0;
      heads = 0;
      observed.value = 0;
      observed.hidden = true;
      observedLabel.textContent = waiting;
      result.textContent = start;
    }
    controls.append(
      button(ta ? '1 முறை சுண்டு' : 'Toss once', () => run(1)),
      button(ta ? '20 முறை சுண்டு' : 'Toss 20', () => run(20)),
      button(ta ? '100 முறை சுண்டு' : 'Toss 100', () => run(100)),
      button(ta ? 'மீட்டமை' : 'Reset', reset)
    );
    host.append(controls, comparisons);
    reset();
  }

  function eventTypes(host, result, lang) {
    const ta = lang === 'ta';
    host.classList.add('probability-event-pairs');
    const {grid, cells} = outcomeGrid(['1', '2', '3', '4']);
    grid.classList.toggle('probability-wide-outcomes', ta);
    grid.setAttribute('aria-label', ta ? 'அருங்காட்சியகத்தின் நான்கு சீட்டுகள்' : 'All four museum tickets');
    const labels = ta ? [
      ['ஏதேனும் ஒரு சீட்டு', 'சீட்டு 5', 'முதல் நிகழ்ச்சி உறுதியான நிகழ்ச்சி. இரண்டாவது இயலா நிகழ்ச்சி.'],
      ['சீட்டு 1', 'சீட்டு 2', 'இரண்டுக்கும் சம வாய்ப்பு. பொதுவான சீட்டு எதுவும் இல்லை. சீட்டுகள் 3, 4 இரண்டிலும் இல்லை.'],
      ['சீட்டு 1', 'மற்ற சீட்டுகள்', 'இவை நிரப்பு நிகழ்ச்சிகள். ஒவ்வொரு சீட்டும் ஒரே ஒரு விதிக்குப் பொருந்தும்.'],
      ['இரட்டை எண்', '2-ஐ விடப் பெரிய எண்', 'இரண்டுக்கும் சம வாய்ப்பு. சீட்டு 4 இரண்டுக்கும் பொருந்துவதால், இரண்டு நிகழ்ச்சிகளும் ஒரே முயற்சியில் நடக்கலாம்.']
    ] : [
      ['Any ticket', 'Ticket 5', 'The first rule is sure and the second is impossible.'],
      ['Ticket 1', 'Ticket 2', 'The rules have equal chances and share no ticket. Tickets 3 and 4 are outside both.'],
      ['Ticket 1', 'Any other ticket', 'These rules are complements. Every ticket matches exactly one rule.'],
      ['Even number', 'Above 2', 'The rules have equal chances. Ticket 4 matches both, so they can occur together.']
    ];
    const pairs = [
      [[0, 1, 2, 3], []],
      [[0], [1]],
      [[0], [1, 2, 3]],
      [[1, 3], [2, 3]]
    ];
    const membership = ta ? {'A and B': 'A, B இரண்டும்', Neither: 'இரண்டிலும் இல்லை'} :
      {'A and B': 'A and B', Neither: 'Neither'};
    const key = document.createElement('p');
    key.className = 'probability-event-key';
    select(host, ta ? 'நிகழ்ச்சிகளின் வகைகளை ஒப்பிடுங்கள்' : 'Compare event types',
      ta ? ['அனைத்தும் அல்லது எதுவுமில்லை', 'பொதுவானவை இல்லை', 'நிரப்பு நிகழ்ச்சிகள்', 'பொதுவானவை உண்டு'] : ['All or none', 'No overlap', 'Complements', 'Overlap'], index => {
      const [a, b] = pairs[index];
      const [aLabel, bLabel, summary] = labels[index];
      key.textContent = 'A: ' + aLabel + '. B: ' + bLabel + '.';
      cells.forEach((cell, i) => {
        const inA = a.includes(i), inB = b.includes(i);
        cell.dataset.matches = inA && inB ? 'A and B' : inA ? 'A' : inB ? 'B' : 'Neither';
        cell.textContent = (i + 1) + ' · ' + (membership[cell.dataset.matches] ?? cell.dataset.matches);
      });
      const unionCount = new Set([...a, ...b]).size;
      const overlapCount = a.filter(v => b.includes(v)).length;
      const formula = tex`\begin{aligned}
        P(A)&=\dfrac{${a.length}}{4},\quad P(B)=\dfrac{${b.length}}{4} \\
        P(A\cup B)&=\dfrac{${unionCount}}{4}${overlapCount ? tex`\neq\dfrac{${a.length}+${b.length}}{4}` : ''}
      \end{aligned}`;
      const unionNote = overlapCount
        ? (ta ? ' பொதுவான சீட்டை ஒருமுறை மட்டும் எண்ணுங்கள்.' : ' Count the shared ticket only once.')
        : (ta ? ' பொதுவான சீட்டு இல்லாததால் இரண்டு எண்ணிக்கைகளையும் கூட்டுங்கள்.' : ' Add the two counts because the rules share no tickets.');
      const symbol = ta ? ' ∪ என்பது A அல்லது B அல்லது இரண்டும் என்பதைச் சுட்டுகிறது.' : ' The symbol ∪ means A or B or both.';
      const fallback = ta
        ? 'நான்கு சீட்டுகளில் A-க்கு ' + a.length + ', B-க்கு ' + b.length + ', A அல்லது B-க்கு ' + unionCount + ' பொருந்துகின்றன.'
        : 'Chance of A is ' + a.length + ' out of 4. Chance of B is ' + b.length + ' out of 4. Chance of A or B is ' + unionCount + ' out of 4.';
      showResult(result, formula, fallback, summary + symbol + unionNote);
    });
    host.append(key, grid);
  }

  const demos = [chance, sampleSpace, classical, empirical, eventTypes];

  function mount(panel, section, lesson, index, lang) {
    const content = lesson[lang];
    const labels = copy[lang];
    panel.innerHTML = '<div class="sp2-concept-heading" tabindex="-1"><h4></h4></div>' +
      '<div class="probability-lesson"><p data-probability-intro></p>' +
      '<div class="probability-demo"></div>' +
      '<div class="probability-result" role="status" aria-atomic="true"></div>' +
      '<details class="probability-detail"><summary></summary><div data-probability-reason></div></details>' +
      '<section class="sp2-recall" aria-labelledby="probability-practice-title">' +
      '<h5 id="probability-practice-title"></h5><p data-probability-question></p>' +
      '<div class="probability-controls probability-answers" data-answers role="group"></div>' +
      '<div class="probability-controls" data-probability-actions></div>' +
      '<div class="probability-feedback" role="status" aria-atomic="true"></div></section></div>';
    panel.querySelector('h4').textContent = section + ' ' + content.heading;
    panel.querySelector('.probability-lesson').lang = lang;
    panel.querySelector('[data-probability-intro]').textContent = content.intro;
    panel.querySelector('summary').textContent = labels.details;
    panel.querySelector('#probability-practice-title').textContent = labels.practice;

    const demo = panel.querySelector('.probability-demo');
    const result = panel.querySelector('.probability-result');
    demos[index](demo, result, lang);

    const notes = panel.querySelector('[data-probability-reason]');
    const paragraph = text => {
      const p = document.createElement('p');
      p.textContent = text;
      notes.append(p);
    };
    content.detail.forEach(paragraph);
    notes.insertAdjacentHTML('beforeend', window.TriggleNotation.render(content.math));
    paragraph(content.conclusion);
    paragraph(content.mistake);

    panel.querySelector('[data-probability-question]').textContent = content.question;
    const holder = panel.querySelector('.probability-answers');
    holder.setAttribute('aria-label', labels.answers);
    const feedback = panel.querySelector('.probability-feedback');
    panel.querySelector('[data-probability-actions]').append(button(labels.hint, () => {
      window.TriggleFeedback.neutral(feedback);
      feedback.textContent = content.hint;
    }));
    const choices = content.choices.map((choice, i) => {
      const control = button(choice, () => {
        choices.forEach(option => option.setAttribute('aria-pressed', String(option === control)));
        const correct = i === lesson.correct;
        window.TriggleFeedback.evaluate(control, feedback, correct);
        feedback.textContent = correct ? labels.correct : labels.retry;
        if (correct && content.practiceMath) {
          feedback.insertAdjacentHTML('beforeend', window.TriggleNotation.render(content.practiceMath));
        }
        const reason = document.createElement('p');
        reason.textContent = content.feedback[i];
        feedback.append(reason);
        window.TriggleNotation.prepare(feedback);
      });
      control.setAttribute('aria-pressed', 'false');
      return control;
    });
    holder.append(...choices);
  }

  window.TriggleProbabilityConcepts = Object.freeze({mount});
})();
