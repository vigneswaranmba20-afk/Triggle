/* Grade 9 Statistics uses local data, shared concept navigation and offline KaTeX. */
(() => {
  'use strict';
  const tex = String.raw;
  const notation = window.TriggleNotation;
  const esc = value => String(value).replace(/[&<>"']/g, c =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const sum = values => values.reduce((total, value) => total + value, 0);
  const format = value => String(Number(value.toFixed(2)));
  const display = (latex, fallback) => notation.render({latex, fallback, display: true});

  function frequency(values) {
    const counts = new Map();
    for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
    return Array.from(counts).sort(([a], [b]) => a - b);
  }

  function midpointPositions(count) {
    return count % 2 ? [(count + 1) / 2] : [count / 2, count / 2 + 1];
  }

  function summarize(rows) {
    let count = 0;
    const cumulative = rows.map(([, f]) => count += f);
    const total = sum(rows.map(([value, f]) => value * f));
    const positions = count ? midpointPositions(count) : [];
    const middle = positions.map(position => rows[cumulative.findIndex(cf => cf >= position)][0]);
    const max = Math.max(0, ...rows.map(([, f]) => f));
    const modes = max > 1 ? rows.filter(([, f]) => f === max).map(([value]) => value) : [];
    return {count, cumulative, total, positions, middle, modes,
      mean: count ? total / count : null,
      median: count ? sum(middle) / middle.length : null};
  }

  function table(caption, headers, rows, marked = []) {
    return '<table class="statistics-table"><caption>' + esc(caption) + '</caption><thead><tr>' +
      headers.map(label => '<th scope="col">' + esc(label) + '</th>').join('') + '</tr></thead><tbody>' +
      rows.map(([head, ...cells], i) => '<tr' + (marked.includes(i) ? ' class="statistics-highlight"' : '') +
        '><th scope="row">' + esc(head) + (marked.includes(i) ? ' <span aria-hidden="true">✓</span>' : '') +
        '</th>' + cells.map(cell => '<td>' + esc(cell) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  }

  function tiles(label, values, selected = []) {
    return '<ul class="statistics-tiles" role="list" aria-label="' + esc(label) + '">' +
      values.map((value, index) => '<li' + (selected.includes(index) ? ' class="statistics-highlight" aria-label="' +
        esc(value) + ', middle position ' + (index + 1) + '"' : '') + '>' + esc(value) +
        (selected.includes(index) ? ' <span aria-hidden="true">✓</span>' : '') + '</li>').join('') + '</ul>';
  }

  const discrete = [[4, 2], [7, 1], [11, 3]];
  const bins = [0, 10, 20];
  const range = lower => lower + ' to under ' + (lower + 10);
  const groups = [2, 5, 3];

  function introduction(_view, choice) {
    const numeric = choice === 0;
    return {
      visual: numeric
        ? table('Library log', ['Pupil', 'Books borrowed'], [['Asha', 2], ['Bala', 1], ['Devi', 3], ['Kavi', 2]])
        : table('Genre chosen by each pupil', ['Genre', 'Pupils'], [['Adventure', 2], ['History', 1], ['Science', 1]]),
      equation: numeric ? display('2+1+3+2=8', 'Two plus one plus three plus two equals eight.') : '',
      conclusion: numeric ? 'The four pupils borrowed eight books in total.' : 'Adventure was the most common genre, chosen by two of the four pupils.'
    };
  }

  function collection(_view, choice) {
    const data = [18, 5, 10, 18, 27, 7, 10];
    const ordered = [...data].sort((a, b) => a - b);
    if (choice <= 1) return {
      visual: tiles(choice ? 'Ordered journey times in minutes' : 'Recorded journey times in minutes', choice ? ordered : data),
      conclusion: choice ? 'The shortest trip was 5 minutes and the longest was 27 minutes.' : 'These are seven journey times in the order the cyclists reported them.'
    };
    const rows = choice === 2 ? frequency(ordered) :
      bins.map(lower => [range(lower), ordered.filter(value => value >= lower && value < lower + 10).length]);
    const tally = count => '𝍸 '.repeat(Math.floor(count / 5)) + '| '.repeat(count % 5).trimEnd();
    return {
      visual: table('Journey times in minutes', [choice === 2 ? 'Time' : 'Time class', 'Tally', 'Count'],
        rows.map(([label, count]) => [label, tally(count), count])),
      conclusion: choice === 2 ? 'Both 10 and 18 occur twice. All seven trips are counted.' :
        'Four trips took 10 to under 20 minutes. A time of exactly 10 goes in that class.'
    };
  }

  function centre(_view, choice) {
    const data = [2, 3, 3, 4, choice ? 41 : 6];
    const stats = summarize(frequency(data));
    return {
      visual: tiles('Sorted waits in minutes', data) +
        table('Three summaries in minutes', ['Measure', 'Value'], [
          ['Mean', format(stats.mean)], ['Median', stats.median], ['Mode', stats.modes[0]]
        ]),
      conclusion: choice ? 'The longer wait raises the mean from 3.6 to 10.6 minutes. The median and mode stay at 3 minutes.' :
        'The mean is 3.6 minutes. Both the middle wait and most common wait are 3 minutes.'
    };
  }

  function arithmeticMean(view, choice) {
    if (view === 0) {
      const data = [2, 4, 5, [4, 6, 9][choice]];
      const {count, total, mean} = summarize(frequency(data));
      return {
        visual: tiles('Four scores', data),
        equation: display(tex`\dfrac{${data.join('+')}}{${count}}=\dfrac{${total}}{${count}}=${mean}`,
          'The total ' + total + ' divided by ' + count + ' gives ' + mean + '.'),
        conclusion: 'Four equal shares of ' + mean + ' points give the same total as these four scores.'
      };
    }
    const grouped = view === 2;
    const rows = grouped ? bins.map((lower, i) => [lower + 5, groups[i]]) : discrete;
    const {count, total, mean} = summarize(rows);
    const method = grouped ? choice : 0;
    const reference = 15;
    const step = 10;
    const deviation = sum(rows.map(([value, f]) => (value - reference) * f));
    const methods = [
      [tex`\dfrac{${total}}{${count}}=${mean}`, 'Add the products and divide by the total count.'],
      [tex`${reference}+\dfrac{${deviation}}{${count}}=${mean}`, 'Add the average signed difference to the reference 15.'],
      [tex`${reference}+${step}\times\dfrac{${deviation / step}}{${count}}=${mean}`, 'Convert the average step back to minutes, then add it to 15.']
    ];
    const header = ['f × x', 'f × d', 'f × u'][method];
    const weighted = ([value, f]) => f * (method === 0 ? value : (value - reference) / (method === 1 ? 1 : step));
    const shown = rows.map(([value, f], index) => grouped
      ? [range(bins[index]), value, f, weighted([value, f])] : [value, f, weighted([value, f])]);
    return {
      visual: table(grouped ? 'Trips in minutes' : 'Scores and counts', grouped ? ['Time class', 'Midpoint x', 'Count f', header] :
        ['Score x', 'Count f', header], shown),
      equation: display(methods[method][0], methods[method][1] + ' The mean is ' + mean + '.'),
      conclusion: methods[method][1] + (grouped ? ' The midpoint-based estimate is ' : ' The mean score is ') + mean +
        (grouped ? ' minutes.' : '.')
    };
  }

  function groupedMedian(counts) {
    const n = sum(counts);
    if (!n) return null;
    const target = n / 2;
    let previous = 0;
    const index = counts.findIndex(f => {
      if (previous + f >= target) return true;
      previous += f;
      return false;
    });
    return {n, previous, index, value: bins[index] + (target - previous) / counts[index] * 10};
  }

  function median(view, choice) {
    if (view <= 1) {
      const data = choice ? [12, 4, 9, 6] : [12, 4, 9, 6, 4];
      const ordered = [...data].sort((a, b) => a - b);
      const rows = view === 1 ? discrete : frequency(ordered);
      const st = summarize(rows);
      const highlight = st.positions.map(pos => st.cumulative.findIndex(cf => cf >= pos));
      const [first, last] = st.middle;
      return {
        visual: view === 1 ? table('Running count of scores', ['Score', 'Count', 'CF'],
          rows.map(([v, f], i) => [v, f, st.cumulative[i]]), highlight) :
          '<p>Recorded order · ' + data.join(', ') + '</p>' +
          tiles('Sorted scores with middle positions marked', ordered, st.positions.map(pos => pos - 1)),
        equation: last === undefined ? '' :
          display(tex`\dfrac{${first}+${last}}{2}=${st.median}`, 'The mean of the two middle values is ' + st.median + '.'),
        conclusion: last === undefined ? 'Position ' + st.positions[0] + ' is in the middle. The median is ' + st.median + '.' :
          'The middle positions are ' + st.positions.join(' and ') + '. Their values give a median of ' + st.median + '.'
      };
    }
    const counts = choice ? [5, 2, 3] : groups;
    const {n, previous, index, value} = groupedMedian(counts);
    let running = 0;
    const f = counts[index];
    const lower = bins[index];
    return {
      visual: table('Running count of trips', ['Time class', 'Count', 'CF'],
        bins.map((start, i) => [range(start), counts[i], running += counts[i]]), [index]),
      equation: display(tex`${lower}+\dfrac{${n / 2}-${previous}}{${f}}\times10=${value}`,
        'Start at ' + lower + ' and use the halfway count ' + n / 2 + '. Estimated median ' + value + ' minutes.'),
      conclusion: 'The halfway count is ' + n / 2 + '. ' + (choice ? 'It falls exactly at a class boundary. ' :
        'The marked interval contains the halfway count. ') + 'The estimated median is ' + value + ' minutes.'
    };
  }

  function groupedMode(counts) {
    const max = Math.max(...counts);
    const index = counts.indexOf(max);
    if (index < 1 || index === counts.length - 1 || counts.lastIndexOf(max) !== index) return null;
    const left = counts[index] - counts[index - 1];
    const right = counts[index] - counts[index + 1];
    return {index, left, right, value: bins[index] + left / (left + right) * 10};
  }

  function mode(view, choice) {
    if (view === 3) {
      const [mean, median] = choice ? [26, 27] : [20, 19];
      const estimate = 3 * median - 2 * mean;
      return {
        visual: table('Given averages', ['Measure', 'Value'], [['Mean', mean], ['Median', median]]),
        equation: display(tex`3\times${median}-2\times${mean}=${estimate}`, 'The estimated mode is ' + estimate + '.'),
        conclusion: 'The empirical relationship gives an approximate mode of ' + estimate + '.'
      };
    }
    const data = [[2, 5, 2, 9, 2, 5], [2, 5, 2, 9, 5], [2, 5, 9]][choice];
    const counts = choice ? [3, 5, 2] : groups;
    const grouped = view === 2 ? groupedMode(counts) : null;
    const rows = view === 0 ? frequency(data) : view === 1 ? discrete : bins.map((lower, i) => [range(lower), counts[i]]);
    const modes = grouped ? [rows[grouped.index][0]] : summarize(rows).modes;
    const chart = '<ul class="statistics-bars" role="list" aria-label="Frequency bars">' + rows.map(([value, f]) =>
      '<li' + (modes.includes(value) ? ' class="statistics-highlight"' : '') + '><span>' + esc(value) +
      '</span><meter min="0" max="' + 5 + '" value="' + f +
      '" aria-label="Frequency for ' + esc(value) + '"></meter><strong>' + f + '</strong></li>').join('') + '</ul>';
    if (grouped) {
      const {index, left, right, value} = grouped;
      const start = bins[index];
      return {visual: chart, equation: display(tex`${start}+\dfrac{${left}}{${left}+${right}}\times 10=${value}`,
        'The two neighbour differences are ' + left + ' and ' + right + '. Estimated mode ' + value + '.'),
      conclusion: 'The modal class is ' + rows[index][0] + ' minutes. The estimated mode is ' + value + ' minutes.'};
    }
    return {
      visual: (view === 0 ? '<p>Readings · ' + data.join(', ') + '</p>' : '') + chart,
      conclusion: modes.length === 2 ? 'The modes are ' + modes.join(' and ') + '. Both repeat equally often.' :
        modes.length ? 'The mode is ' + modes[0] + '. This value has the highest count.' : 'Every value occurs once, so there is no mode.'
    };
  }

  const demonstrations = [
    {run: introduction, controls: [['Book counts', 'Genres']]},
    {run: collection, controls: [['Recorded', 'Sort', 'Tally', 'Group']]},
    {run: centre, controls: [['Longest wait is 6', 'Change it to 41']]},
    {run: arithmeticMean, formats: ['Raw data', 'Frequency table', 'Grouped classes'],
      controls: [['Last score 4', 'Last score 6', 'Last score 9'], [], ['Direct', 'Assumed mean', 'Step deviation']]},
    {run: median, formats: ['Raw data', 'Frequency table', 'Grouped classes'],
      controls: [['Five readings', 'Four readings'], [], ['Halfway within a class', 'Halfway at a boundary']]},
    {run: mode, formats: ['Raw data', 'Frequency table', 'Grouped classes', 'Empirical rule'],
      controls: [['One mode', 'Two modes', 'No mode'], [], ['Right neighbour taller', 'Left neighbour taller'], ['Mean 20, median 19', 'Mean 26, median 27']]}
  ];

  function buttons(host, labels, change) {
    const controls = labels.map((label, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.setAttribute('aria-pressed', String(index === 0));
      button.onclick = () => {
        controls.forEach((control, i) => control.setAttribute('aria-pressed', String(i === index)));
        change(index);
      };
      return button;
    });
    host.replaceChildren(...controls);
    host.hidden = labels.length === 0;
  }

  function mount(panel, stage, index, lang, questions, onQuestion) {
    const demo = demonstrations[index];
    panel.innerHTML = '<div class="sp2-concept-heading" tabindex="-1"><h4>' + esc(stage.section) + ' ' +
      esc(stage.title[lang] || stage.title.en) + '</h4></div>' +
      '<div class="statistics-studio" lang="en">' +
      (lang === 'ta' ? '<p>Concept lesson in English · Tamil editorial review pending</p>' : '') +
      '<p>' + esc(stage.intro) + '</p>' +
      '<div class="statistics-options" data-stats-format role="group" aria-label="Data format"></div>' +
      '<div class="statistics-options" data-stats-controls role="group" aria-label="Change the demonstration"></div>' +
      '<div data-stats-visual></div><div data-stats-result role="status" aria-atomic="true"></div>' +
      '<details><summary>Understand the idea</summary><div data-stats-notes></div></details>' +
      '<section class="sp2-recall"><h5>Try it yourself</h5><p data-stats-question></p>' +
      '<div class="statistics-options statistics-answers" data-answers role="group" aria-label="Answer choices"></div>' +
      '<p data-stats-feedback role="status" aria-atomic="true"></p></section>' +
      '<button type="button" class="statistics-exercise" hidden></button></div>';
    const lesson = panel.querySelector('.statistics-studio');
    const find = selector => lesson.querySelector(selector);
    const result = find('[data-stats-result]');
    const exerciseButton = find('.statistics-exercise');
    function selectView(view) {
      const detail = stage.views[view];
      const exercise = questions.find(item => item.id === (detail.exercise || stage.exercise));
      if (exercise && onQuestion) {
        exerciseButton.hidden = false;
        exerciseButton.dataset.exerciseId = exercise.id;
        exerciseButton.textContent = 'Connect · ' + exercise.label.en;
        exerciseButton.onclick = () => onQuestion(exercise);
      }
      const practice = detail.practice || stage.practice;
      exerciseButton.hidden = !exercise || !onQuestion;
      const notes = find('[data-stats-notes]');
      notes.innerHTML = detail.notes.map(note => '<p>' + esc(note) + '</p>').join('') +
        (detail.formula ? notation.render(detail.formula) : '') +
        '<p><strong>Why it works</strong></p><p>' + esc(detail.why) + '</p>';
      find('[data-stats-question]').textContent = practice.question;
      const feedback = find('[data-stats-feedback]');
      feedback.textContent = '';
      const answers = find('[data-answers]');
      buttons(answers, practice.choices, answer => {
        feedback.textContent = (answer === practice.correct ? 'Correct. ' : 'Try again. ') + practice.feedback[answer];
      });
      answers.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', 'false'));

      function update(choice) {
        const shown = demo.run(view, choice);
        find('[data-stats-visual]').innerHTML = shown.visual;
        result.innerHTML = (shown.equation || '') + '<p>' + esc(shown.conclusion) + '</p>';
        notation.prepare(result);
      }
      buttons(find('[data-stats-controls]'), demo.controls[view], update);
      update(0);
    }
    buttons(find('[data-stats-format]'), demo.formats || [], selectView);
    selectView(0);
  }

  window.TriggleStatisticsConcepts = Object.freeze({mount, frequency, summarize, groupedMedian, groupedMode});
})();
