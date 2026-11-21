/* Grade 9 Probability demonstrations. All trials and rendering run locally. */
(() => {
  'use strict';

  const tex = String.raw;
  const renderMath = (latex, fallback) => window.TriggleNotation.render({latex, fallback, display: true});
  const percent = fraction => Number((fraction * 100).toFixed(1)) + '%';

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

  function mark(cells, matches) {
    cells.forEach((cell, i) => {
      cell.classList.toggle('probability-match', matches.includes(i));
      const old = cell.querySelector('span');
      if (old) old.remove();
      if (matches.includes(i)) {
        const tick = document.createElement('span');
        tick.textContent = ' ✓';
        tick.setAttribute('aria-label', 'matches');
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

  function chance(host, result) {
    const {grid, cells} = outcomeGrid(['Star', 'Star', 'Star', 'Moon']);
    const events = [
      [[0, 1, 2], tex`\dfrac{3}{4}`, 'Three quarters', 'Three of the four envelopes have stars. A star is likely.'],
      [[], '0', 'Zero', 'No envelope has a sun. A sun is impossible.'],
      [[0, 1, 2, 3], '1', 'One', 'Every envelope has a star or a moon. One of them is certain.']
    ];
    select(host, 'Which event are you looking for?', ['A star', 'A sun', 'A star or moon'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches);
      showResult(result, latex, fallback, summary);
    });
    grid.setAttribute('aria-label', 'All four envelopes');
    host.append(grid);
  }

  function sampleSpace(host, result) {
    const signals = ['RR', 'RB', 'BR', 'BB'];
    const {grid, cells} = outcomeGrid(signals);
    grid.setAttribute('aria-label', 'All four ordered signals');
    const events = [
      [[], tex`S=\{\mathrm{RR},\mathrm{RB},\mathrm{BR},\mathrm{BB}\}`, 'The sample space contains RR, RB, BR and BB.', 'S is the whole sample space. Each pair is one complete outcome (ordered pairs also give n(S)=6×6=36 for two dice).'],
      [[1, 2], tex`E=\{\mathrm{RB},\mathrm{BR}\}`, 'The event has outcomes RB and BR.', 'The event E matches both marked signals. They differ in which flash is blue.'],
      [[1, 2, 3], tex`\begin{aligned}E&=\{\mathrm{RB},\mathrm{BR},\mathrm{BB}\}\\P(E)&=\dfrac{3}{4}\end{aligned}`, 'Three out of four signals have at least one blue.', 'Order matters: RB, BR, and BB all count (3/4), just like HH, HT, TH for two coins.']
    ];
    select(host, 'View possible signals', ['All signals', 'Exactly one blue', 'At least one blue'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches);
      showResult(result, latex, fallback, summary);
    });
    host.append(grid);
  }

  function classical(host, result) {
    const {grid, cells} = outcomeGrid(['1', '2', '3', '4', '5', '6']);
    grid.setAttribute('aria-label', 'All six die faces');
    const events = [
      [[3, 4, 5], tex`\dfrac{3}{6}=\dfrac{1}{2}`, 'Three out of six is one half.', 'Three faces match. There is a one-half chance of a page above 3.'],
      [[2, 5], tex`\dfrac{2}{6}=\dfrac{1}{3}`, 'Two out of six is one third.', 'Only 3 and 6 match. There is a one-third chance of a multiple of 3.'],
      [[1, 2, 4], tex`\{2,3,5\},\;P=\dfrac{3}{6}=\dfrac{1}{2}`, 'Three out of six faces (2, 3, 5) are prime.', 'Primes on a die are {2, 3, 5}: 1 is neither prime nor composite.']
    ];
    select(host, 'Which pages count?', ['Above 3', 'Multiples of 3', 'Prime numbers'], index => {
      const [matches, latex, fallback, summary] = events[index];
      mark(cells, matches);
      showResult(result, latex, fallback, summary);
    });
    host.append(grid);
  }

  function empirical(host, result) {
    let tosses = 0;
    let heads = 0;
    const controls = document.createElement('div');
    controls.className = 'probability-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Coin toss simulation');
    const comparisons = document.createElement('dl');
    comparisons.className = 'probability-comparison';
    comparisons.innerHTML = '<dt>Fair coin · 50%</dt><dd><meter min="0" max="1" value="0.5" aria-label="Theoretical chance of heads">50%</meter></dd>' +
      '<dt data-observed-label>Observed · awaiting tosses</dt><dd><meter min="0" max="1" aria-label="Observed share of heads" hidden></meter></dd>';
    const observed = comparisons.querySelector('dd:last-child meter');
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
      observedLabel.textContent = 'Observed · ' + percent(share);
      const comparison = share === 0.5 ? 'equal to' : share > 0.5 ? 'above' : 'below';
      const recap = batch === 1 ? 'This toss was ' + (latest ? 'heads' : 'tails') + '. ' : '';
      const total = heads + (heads === 1 ? ' head' : ' heads') + ' in ' +
        tosses + (tosses === 1 ? ' toss' : ' tosses');
      showResult(result, tex`\dfrac{${heads}}{${tosses}}`, heads + ' out of ' + tosses,
        recap + total + ', ' + comparison + ' the model’s one-half chance.');
    }
    const reset = button('Reset', () => {
      tosses = 0;
      heads = 0;
      observed.value = 0;
      observed.hidden = true;
      observedLabel.textContent = 'Observed · awaiting tosses';
      result.textContent = 'Toss the coin to start counting heads.';
    });
    controls.append(button('Toss once', () => run(1)), button('Toss 20', () => run(20)), button('Toss 100', () => run(100)), reset);
    host.append(controls, comparisons);
    result.textContent = 'Toss the coin to start counting heads.';
  }

  function eventTypes(host, result) {
    host.classList.add('probability-event-pairs');
    const {grid, cells} = outcomeGrid(['1', '2', '3', '4']);
    grid.setAttribute('aria-label', 'All four museum tickets');
    const pairs = [
      ['Any ticket', [0, 1, 2, 3], 'Ticket 5', [], 'The first rule is sure and the second is impossible.'],
      ['Ticket 1', [0], 'Ticket 2', [1], 'The rules have equal chances and share no ticket. Tickets 3 and 4 are outside both.'],
      ['Ticket 1', [0], 'Any other ticket', [1, 2, 3], 'These rules are complements. Every ticket matches exactly one rule.'],
      ['Even number', [1, 3], 'Above 2', [2, 3], 'The rules have equal chances. Ticket 4 matches both, so they can occur together.']
    ];
    const key = document.createElement('p');
    key.className = 'probability-event-key';
    select(host, 'Compare event types', ['All or none', 'No overlap', 'Complements', 'Overlap'], index => {
      const [aLabel, a, bLabel, b, summary] = pairs[index];
      key.textContent = 'A: ' + aLabel + '. B: ' + bLabel + '.';
      cells.forEach((cell, i) => {
        const inA = a.includes(i), inB = b.includes(i);
        cell.dataset.matches = inA && inB ? 'A and B' : inA ? 'A' : inB ? 'B' : 'Neither';
        cell.textContent = (i + 1) + ' · ' + cell.dataset.matches;
      });
      const unionCount = new Set([...a, ...b]).size;
      const overlapCount = a.filter(v => b.includes(v)).length;
      const formula = tex`\begin{aligned}
        P(A)&=\dfrac{${a.length}}{4},\quad P(B)=\dfrac{${b.length}}{4} \\
        P(A\text{ or }B)&=\dfrac{${unionCount}}{4}${overlapCount ? tex`\neq\dfrac{${a.length}+${b.length}}{4}` : ''}
      \end{aligned}`;
      const unionNote = overlapCount
        ? ' Shared outcome (' + overlapCount + ') is counted once, so P(A or B) = ' + unionCount + '/4 instead of ' + (a.length + b.length) + '/4.'
        : ' Since they do not overlap, P(A or B) = ' + a.length + '/4 + ' + b.length + '/4 = ' + unionCount + '/4.';
      showResult(result, formula,
        'Chance of A is ' + a.length + ' out of 4. Chance of B is ' + b.length + ' out of 4. Chance of A or B is ' + unionCount + ' out of 4.',
        summary + unionNote);
    });
    host.append(key, grid);
  }

  const demos = [chance, sampleSpace, classical, empirical, eventTypes];

  function mount(panel, section, lesson, index, lang) {
    panel.innerHTML = '<div class="sp2-concept-heading" tabindex="-1" lang="en"><h4></h4></div>' +
      (lang === 'ta' ? '<p class="probability-language" lang="en">Concept lesson in English · Tamil editorial review pending</p>' : '') +
      '<div class="probability-lesson" lang="en"><p data-probability-intro></p>' +
      '<div class="probability-demo" data-probability-demo></div>' +
      '<div class="probability-result" role="status" aria-atomic="true"></div>' +
      '<details class="probability-detail"><summary>Understand the idea</summary><div data-probability-reason></div></details>' +
      '<section class="sp2-recall" aria-labelledby="probability-practice-title">' +
      '<h5 id="probability-practice-title">Try it yourself</h5><p data-probability-question></p>' +
      '<div class="probability-controls probability-answers" data-answers role="group" aria-label="Answer choices"></div>' +
      '<div class="probability-feedback" role="status" aria-atomic="true"></div></section></div>';
    panel.querySelector('h4').textContent = section + ' ' + lesson.heading;
    panel.querySelector('[data-probability-intro]').textContent = lesson.intro;

    const demo = panel.querySelector('[data-probability-demo]');
    const result = panel.querySelector('.probability-result');
    demos[index](demo, result);

    const notes = panel.querySelector('[data-probability-reason]');
    const paragraph = text => {
      const p = document.createElement('p');
      p.textContent = text;
      notes.append(p);
    };
    lesson.detail.forEach(paragraph);
    notes.insertAdjacentHTML('beforeend', window.TriggleNotation.render(lesson.math));
    paragraph(lesson.conclusion);
    paragraph(lesson.mistake);

    panel.querySelector('[data-probability-question]').textContent = lesson.question;
    const holder = panel.querySelector('.probability-answers');
    const feedback = panel.querySelector('.probability-feedback');
    const choices = lesson.choices.map((choice, i) => {
      const control = button(choice, () => {
        choices.forEach(option => option.setAttribute('aria-pressed', String(option === control)));
        const correct = i === lesson.correct;
        feedback.textContent = correct ? 'Correct.' : 'Try again.';
        if (correct && lesson.practiceMath) {
          feedback.insertAdjacentHTML('beforeend', window.TriggleNotation.render(lesson.practiceMath));
        }
        const reason = document.createElement('p');
        reason.textContent = lesson.feedback[i];
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
