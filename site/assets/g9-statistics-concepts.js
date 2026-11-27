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
  const t = (en, ta) => ({en, ta});

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

  function tiles(label, values, tr, selected = []) {
    return '<ul class="statistics-tiles" role="list" aria-label="' + esc(label) + '">' +
      values.map((value, index) => '<li' + (selected.includes(index) ? ' class="statistics-highlight" aria-label="' +
        esc(tr(value + ', middle position ' + (index + 1), value + ', நடு இடம் ' + (index + 1))) + '"' : '') + '>' + esc(value) +
        (selected.includes(index) ? ' <span aria-hidden="true">✓</span>' : '') + '</li>').join('') + '</ul>';
  }

  const discrete = [[4, 2], [7, 1], [11, 3]];
  const bins = [0, 10, 20];
  const range = (lower, tr) => tr(lower + ' to under ' + (lower + 10), lower + ' முதல் ' + (lower + 10) + '-க்குக் கீழ்');
  const groups = [2, 5, 3];

  function introduction(_view, choice, tr) {
    const numeric = choice === 0;
    return {
      visual: numeric
        ? table(tr('Library log', 'நூலகப் பதிவு'), [tr('Pupil', 'மாணவர்'), tr('Books borrowed', 'இரவல் வாங்கிய புத்தகங்கள்')],
          [[tr('Asha', 'ஆஷா'), 2], [tr('Bala', 'பாலா'), 1], [tr('Devi', 'தேவி'), 3], [tr('Kavi', 'கவி'), 2]])
        : table(tr('Genres pupils chose', 'மாணவர்கள் தேர்ந்தெடுத்த புத்தக வகைகள்'), [tr('Genre', 'புத்தக வகை'), tr('Pupils', 'மாணவர் எண்ணிக்கை')],
          [[tr('Adventure', 'சாகசம்'), 2], [tr('History', 'வரலாறு'), 1], [tr('Science', 'அறிவியல்'), 1]]),
      equation: numeric ? display('2+1+3+2=8', tr('Two plus one plus three plus two equals eight.', '2, 1, 3, 2 ஆகியவற்றைக் கூட்டினால் 8.')) : '',
      conclusion: numeric ? tr('The four pupils borrowed eight books in total.', 'நான்கு மாணவர்களும் மொத்தம் எட்டுப் புத்தகங்களை இரவல் வாங்கினர்.') :
        tr('Adventure was the most common genre, chosen by two of the four pupils.', 'நான்கு பேரில் இருவர் சாகச வகையைத் தேர்ந்தெடுத்தனர். அதுவே அதிகம் தேர்ந்தெடுக்கப்பட்ட வகை.')
    };
  }

  function collection(_view, choice, tr) {
    const data = [18, 5, 10, 18, 27, 7, 10];
    const ordered = [...data].sort((a, b) => a - b);
    if (choice <= 1) return {
      visual: tiles(choice ? tr('Ordered journey times in minutes', 'பயண நேரங்கள் ஏறுவரிசையில், நிமிடங்களில்') :
        tr('Recorded journey times in minutes', 'பதிவு செய்த பயண நேரங்கள், நிமிடங்களில்'), choice ? ordered : data, tr),
      conclusion: choice ? tr('The shortest trip was 5 minutes and the longest was 27 minutes.', 'மிகக் குறுகிய பயணம் 5 நிமிடங்கள். மிக நீண்ட பயணம் 27 நிமிடங்கள்.') :
        tr('These are seven journey times in the order the cyclists reported them.', 'ஏழு பயண நேரங்களும் அவை பதிவு செய்யப்பட்ட வரிசையில் உள்ளன.')
    };
    const rows = choice === 2 ? frequency(ordered) :
      bins.map(lower => [range(lower, tr), ordered.filter(value => value >= lower && value < lower + 10).length]);
    const tally = count => '𝍸 '.repeat(Math.floor(count / 5)) + '| '.repeat(count % 5).trimEnd();
    return {
      visual: table(tr('Journey times in minutes', 'பயண நேரம் (நிமிடங்களில்)'),
        [choice === 2 ? tr('Time', 'நேரம்') : tr('Time class', 'பிரிவு'), tr('Tally', 'நேர்க்கோட்டுக் குறிகள்'), tr('Count', 'நிகழ்வெண்')],
        rows.map(([label, count]) => [label, tally(count), count])),
      conclusion: choice === 2 ? tr('Both 10 and 18 occur twice. All seven trips are counted.', '10, 18 ஆகிய இரு நேரங்களும் தலா இரண்டு முறை வந்துள்ளன. ஏழு பயணங்களும் கணக்கில் உள்ளன.') :
        tr('Four trips took 10 to under 20 minutes. A time of exactly 10 goes in that class.',
          '10 நிமிடம் முதல் 20 நிமிடத்துக்குக் குறைவான வகுப்பில் நான்கு பயணங்கள் உள்ளன. சரியாக 10 நிமிடம் எடுத்த பயணமும் இதில் சேரும்.')
    };
  }

  function centre(_view, choice, tr) {
    const data = [2, 3, 3, 4, choice ? 41 : 6];
    const stats = summarize(frequency(data));
    return {
      visual: tiles(tr('Sorted waits in minutes', 'காத்திருப்பு நேரங்கள் ஏறுவரிசையில், நிமிடங்களில்'), data, tr) +
        table(tr('Three summaries in minutes', 'மூன்று அளவைகள் (நிமிடங்களில்)'), [tr('Measure', 'அளவை'), tr('Value', 'மதிப்பு')], [
          [tr('Mean', 'சராசரி'), format(stats.mean)], [tr('Median', 'இடைநிலை அளவு'), stats.median], [tr('Mode', 'முகடு'), stats.modes[0]]
        ]),
      conclusion: choice ? tr('The longer wait raises the mean from 3.6 to 10.6 minutes. The median and mode stay at 3 minutes.',
        'நீண்ட காத்திருப்பால் சராசரி 3.6 நிமிடத்திலிருந்து 10.6 நிமிடமாக உயர்கிறது. இடைநிலை அளவும் முகடும் 3 நிமிடங்களாகவே உள்ளன.') :
        tr('The mean is 3.6 minutes. Both the middle wait and most common wait are 3 minutes.',
          'சராசரி 3.6 நிமிடங்கள். வரிசையின் நடுவிலுள்ள நேரமும் அதிக முறை வந்த நேரமும் 3 நிமிடங்கள்.')
    };
  }

  function arithmeticMean(view, choice, tr) {
    if (view === 0) {
      const data = [2, 4, 5, [4, 6, 9][choice]];
      const {count, total, mean} = summarize(frequency(data));
      return {
        visual: tiles(tr('Four scores', 'நான்கு மதிப்பெண்கள்'), data, tr),
        equation: display(tex`\dfrac{${data.join('+')}}{${count}}=\dfrac{${total}}{${count}}=${mean}`,
          tr('The total ' + total + ' divided by ' + count + ' gives ' + mean + '.',
            'மொத்தம் ' + total + '. அதை ' + count + '-ஆல் வகுத்தால் ' + mean + ' கிடைக்கும்.')),
        conclusion: tr('Four equal shares of ' + mean + ' points give the same total as these four scores.',
          'மொத்தத்தை நான்கு பேருக்கும் சமமாகப் பகிர்ந்தால் தலா ' + mean + ' மதிப்பெண்கள் கிடைக்கும்.')
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
      [tex`\dfrac{${total}}{${count}}=${mean}`, tr('Add the products and divide by the total count.', 'பெருக்கற்பலன்களைக் கூட்டி, மொத்த நிகழ்வெண்ணால் வகு.')],
      [tex`${reference}+\dfrac{${deviation}}{${count}}=${mean}`,
        tr('Find the signed difference d from 15 for each value. Add the mean difference to 15.',
          'ஒவ்வொரு மதிப்பிலிருந்தும் 15-ஐக் கழித்தால் விலக்கம் d கிடைக்கும். விலக்குகளின் சராசரியை 15 உடன் கூட்டு.')],
      [tex`${reference}+${step}\times\dfrac{${deviation / step}}{${count}}=${mean}`,
        tr('Divide each signed difference by 10 to get the step u. Convert the mean step back to minutes, then add it to 15.',
          'ஒவ்வொரு விலக்கத்தையும் 10-ஆல் வகுத்தால் படிவிலக்கம் u கிடைக்கும். படிவிலக்கங்களின் சராசரியை மீண்டும் நிமிடங்களாக மாற்றி, 15 உடன் கூட்டு.')]
    ];
    const header = ['f × x', 'f × d', 'f × u'][method];
    const weighted = ([value, f]) => f * (method === 0 ? value : (value - reference) / (method === 1 ? 1 : step));
    const shown = rows.map(([value, f], index) => grouped
      ? [range(bins[index], tr), value, f, weighted([value, f])] : [value, f, weighted([value, f])]);
    const result = grouped ? tr(' The midpoint-based estimate is ' + mean + ' minutes.',
      ' பிரிவின் மைய மதிப்புகளைக் கொண்டு மதிப்பிட்ட சராசரி ' + mean + ' நிமிடங்கள்.') :
      tr(' The mean score is ' + mean + '.', ' சராசரி மதிப்பெண் ' + mean + '.');
    return {
      visual: table(grouped ? tr('Trips in minutes', 'பயண நேரம் (நிமிடங்களில்)') : tr('Scores and counts', 'மதிப்பெண்களும் நிகழ்வெண்களும்'),
        grouped ? [tr('Time class', 'பிரிவு'), tr('Midpoint x', 'மைய மதிப்பு x'), tr('Count f', 'நிகழ்வெண் f'), header] :
          [tr('Score x', 'மதிப்பெண் x'), tr('Count f', 'நிகழ்வெண் f'), header], shown),
      equation: display(methods[method][0], methods[method][1] + result),
      conclusion: methods[method][1] + result
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

  function median(view, choice, tr) {
    if (view <= 1) {
      const data = choice ? [12, 4, 9, 6] : [12, 4, 9, 6, 4];
      const ordered = [...data].sort((a, b) => a - b);
      const rows = view === 1 ? discrete : frequency(ordered);
      const st = summarize(rows);
      const highlight = st.positions.map(pos => st.cumulative.findIndex(cf => cf >= pos));
      const [first, last] = st.middle;
      return {
        visual: view === 1 ? table(tr('Running count of scores', 'மதிப்பெண்களின் குவிவு நிகழ்வெண்'),
          [tr('Score', 'மதிப்பெண்'), tr('Count', 'நிகழ்வெண்'), 'CF'],
          rows.map(([v, f], i) => [v, f, st.cumulative[i]]), highlight) :
          '<p>' + tr('Recorded order', 'பதிவு செய்த வரிசை') + ' · ' + data.join(', ') + '</p>' +
          tiles(tr('Sorted scores with middle positions marked', 'ஏறுவரிசையில் உள்ள மதிப்பெண்களின் நடு இடங்கள் குறிக்கப்பட்டுள்ளன'),
            ordered, tr, st.positions.map(pos => pos - 1)),
        equation: last === undefined ? '' :
          display(tex`\dfrac{${first}+${last}}{2}=${st.median}`,
            tr('The mean of the two middle values is ' + st.median + '.', 'நடுவிலுள்ள இரு மதிப்புகளின் சராசரி ' + st.median + '.')),
        conclusion: last === undefined ? tr('Position ' + st.positions[0] + ' is in the middle. The median is ' + st.median + '.',
          st.positions[0] + '-ஆவது இடம் நடுவில் உள்ளது. அதன் மதிப்பு ' + st.median + '. அதுவே இடைநிலை அளவு.') :
          tr('The middle positions are ' + st.positions.join(' and ') + '. Their values give a median of ' + st.median + '.',
            st.positions.join(', ') + ' ஆகியவை நடு இடங்கள். அவற்றின் மதிப்புகளைச் சராசரி எடுத்தால் இடைநிலை அளவு ' + st.median + ' கிடைக்கும்.')
      };
    }
    const counts = choice ? [5, 2, 3] : groups;
    const {n, previous, index, value} = groupedMedian(counts);
    let running = 0;
    const f = counts[index];
    const lower = bins[index];
    return {
      visual: table(tr('Running count of trips', 'பயணங்களின் குவிவு நிகழ்வெண்'), [tr('Time class', 'பிரிவு'), tr('Count', 'நிகழ்வெண்'), 'CF'],
        bins.map((start, i) => [range(start, tr), counts[i], running += counts[i]]), [index]),
      equation: display(tex`${lower}+\dfrac{${n / 2}-${previous}}{${f}}\times10=${value}`,
        tr('Start at ' + lower + ' and use the halfway count ' + n / 2 + '. Estimated median ' + value + ' minutes.',
          'கீழ் எல்லை ' + lower + ', பாதி எண்ணிக்கை ' + n / 2 + '. மதிப்பிடப்பட்ட இடைநிலை அளவு ' + value + ' நிமிடங்கள்.')),
      conclusion: tr('The halfway count is ' + n / 2 + '. ', 'பாதி எண்ணிக்கை ' + n / 2 + '. ') +
        (choice ? tr('It falls exactly at a class boundary. ', 'அது சரியாக ஒரு பிரிவின் எல்லையில் அமைகிறது. ') :
          tr('The marked interval contains the halfway count. ', 'பாதி எண்ணிக்கையை எட்டும் பிரிவு குறிக்கப்பட்டுள்ளது. ')) +
        tr('The estimated median is ' + value + ' minutes.', 'மதிப்பிடப்பட்ட இடைநிலை அளவு ' + value + ' நிமிடங்கள்.')
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

  function mode(view, choice, tr) {
    if (view === 3) {
      const mean = choice ? 26 : 20;
      const given = choice ? 29 : 19;
      const estimate = choice ? (given + 2 * mean) / 3 : 3 * given - 2 * mean;
      const explanation = choice
        ? tr('Adding twice the mean to the mode gives three times the estimated median. Divide by 3 to get ' + estimate + '.',
          'முகட்டுடன் சராசரியின் இரு மடங்கைக் கூட்டினால் மதிப்பிடப்பட்ட இடைநிலை அளவின் மூன்று மடங்கு கிடைக்கும். 3-ஆல் வகுத்தால் ' + estimate + ' கிடைக்கும்.')
        : tr('The empirical relationship gives an approximate mode of ' + estimate + '.',
          'அனுபவத் தொடர்பின்படி முகட்டின் தோராய மதிப்பு ' + estimate + '.');
      return {
        visual: table(tr('Given averages', 'கொடுக்கப்பட்ட அளவைகள்'), [tr('Measure', 'அளவை'), tr('Value', 'மதிப்பு')],
          [[tr('Mean', 'சராசரி'), mean], [choice ? tr('Mode', 'முகடு') : tr('Median', 'இடைநிலை அளவு'), given]]),
        equation: display(choice ? tex`\dfrac{${given}+2\times${mean}}{3}=${estimate}` :
          tex`3\times${given}-2\times${mean}=${estimate}`, explanation),
        conclusion: explanation
      };
    }
    const data = [[2, 5, 2, 9, 2, 5], [2, 5, 2, 9, 5], [2, 5, 9]][choice];
    const counts = choice ? [3, 5, 2] : groups;
    const grouped = view === 2 ? groupedMode(counts) : null;
    const rows = view === 0 ? frequency(data) : view === 1 ? discrete : bins.map((lower, i) => [range(lower, tr), counts[i]]);
    const modes = grouped ? [rows[grouped.index][0]] : summarize(rows).modes;
    const chart = '<ul class="statistics-bars" role="list" aria-label="' + tr('Frequency bars', 'நிகழ்வெண் பட்டைகள்') + '">' + rows.map(([value, f]) =>
      '<li' + (modes.includes(value) ? ' class="statistics-highlight"' : '') + '><span>' + esc(value) +
      '</span><meter min="0" max="5" value="' + f +
      '" aria-label="' + esc(tr('Frequency for ' + value, value + ' என்பதன் நிகழ்வெண்')) + '"></meter><strong>' + f + '</strong></li>').join('') + '</ul>';
    if (grouped) {
      const {index, left, right, value} = grouped;
      const start = bins[index];
      return {visual: chart, equation: display(tex`${start}+\dfrac{${left}}{${left}+${right}}\times 10=${value}`,
        tr('The two neighbour differences are ' + left + ' and ' + right + '. Estimated mode ' + value + '.',
          'அண்டை வகுப்புகளுடனான நிகழ்வெண் வேறுபாடுகள் ' + left + ', ' + right + '. மதிப்பிடப்பட்ட முகடு ' + value + '.')),
      conclusion: tr('The modal class is ' + rows[index][0] + ' minutes. The estimated mode is ' + value + ' minutes.',
        start + ' நிமிடத்திலிருந்து ' + (start + 10) + ' நிமிடத்துக்குக் குறைவான நேரங்களைக் கொண்டது முகட்டுப் பிரிவு. மதிப்பிடப்பட்ட முகடு ' + value + ' நிமிடங்கள்.')};
    }
    return {
      visual: (view === 0 ? '<p>' + tr('Readings', 'பதிவு செய்த மதிப்புகள்') + ' · ' + data.join(', ') + '</p>' : '') + chart,
      conclusion: modes.length === 2 ? tr('The modes are ' + modes.join(' and ') + '. Both repeat equally often.',
        modes.join(', ') + ' ஆகிய இரு மதிப்புகளும் அதிக முறை வருகின்றன. எனவே இரண்டுமே முகடுகள்.') :
        modes.length ? tr('The mode is ' + modes[0] + '. This value has the highest count.',
          modes[0] + ' மிக அதிக முறை வருகிறது. அதுவே முகடு.') :
          tr('Every value occurs once, so there is no mode.', 'ஒவ்வொரு மதிப்பும் ஒரே ஒரு முறை வருகிறது. எனவே முகடு இல்லை.')
    };
  }

  const dataFormats = [
    t('Raw data', 'செப்பனிடப்படாத தரவு'),
    t('Frequency table', 'நிகழ்வெண் அட்டவணை'),
    t('Grouped classes', 'வகைப்படுத்தப்பட்ட தரவு')
  ];
  const demonstrations = [
    {run: introduction, controls: [[t('Book counts', 'புத்தக எண்ணிக்கை'), t('Genres', 'புத்தக வகைகள்')]]},
    {run: collection, controls: [[t('Recorded', 'பதிவு'), t('Sort', 'வரிசை'), t('Tally', 'குறியிட்டு எண்ணு'), t('Group', 'வகைப்படுத்து')]]},
    {run: centre, controls: [[t('Longest wait is 6', 'நீண்ட நேரம் 6'), t('Change it to 41', '41 ஆக மாற்று')]]},
    {run: arithmeticMean, formats: dataFormats,
      controls: [
        [4, 6, 9].map(score => t('Last score ' + score, 'கடைசி மதிப்பெண் ' + score)),
        [],
        [t('Direct', 'நேரடி முறை'), t('Assumed mean', 'ஊகச் சராசரி'), t('Step deviation', 'படிவிலக்க முறை')]
      ]},
    {run: median, formats: dataFormats,
      controls: [[t('Five readings', 'ஐந்து பதிவுகள்'), t('Four readings', 'நான்கு பதிவுகள்')], [],
        [t('Halfway within a class', 'பாதி எண்ணிக்கை பிரிவுக்குள்'), t('Halfway at a boundary', 'பாதி எண்ணிக்கை எல்லையில்')]]},
    {run: mode, formats: [...dataFormats, t('Empirical rule', 'அனுபவத் தொடர்பு')],
      controls: [
        [t('One mode', 'ஒரு முகடு'), t('Two modes', 'இரண்டு முகடுகள்'), t('No mode', 'முகடு இல்லை')], [],
        [t('Higher count after the peak', 'அடுத்த பிரிவில் எண்ணிக்கை அதிகம்'),
          t('Higher count before the peak', 'முந்தைய பிரிவில் எண்ணிக்கை அதிகம்')],
        [t('Find the mode', 'முகட்டைக் காண்'), t('Find the median', 'இடைநிலை அளவைக் காண்')]
      ]}
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
    const tr = lang === 'ta' ? (_en, ta) => ta : en => en;
    const pick = value => typeof value === 'string' ? value : value[lang];
    panel.innerHTML = '<div class="sp2-concept-heading" tabindex="-1"><h4>' + esc(stage.section) + ' ' +
      esc(pick(stage.title)) + '</h4></div>' +
      '<div class="statistics-studio" lang="' + esc(lang) + '">' +
      '<p>' + esc(pick(stage.intro)) + '</p>' +
      '<div class="statistics-options" data-stats-format role="group" aria-label="' + tr('Data format', 'தரவுகளின் வடிவம்') + '"></div>' +
      '<div class="statistics-options" data-stats-controls role="group" aria-label="' + tr('Change the demonstration', 'காட்சியை மாற்று') + '"></div>' +
      '<div data-stats-visual></div><div data-stats-result role="status" aria-atomic="true"></div>' +
      '<details><summary>' + tr('Understand the idea', 'கருத்தைப் புரிந்துகொள்') + '</summary><div data-stats-notes></div></details>' +
      '<section class="sp2-recall"><h5>' + tr('Try it yourself', 'நீயே முயன்று பார்') + '</h5><p data-stats-question></p>' +
      '<div class="statistics-options statistics-answers" data-answers role="group" aria-label="' + tr('Answer choices', 'விடைத் தேர்வுகள்') + '"></div>' +
      '<p data-stats-feedback role="status" aria-atomic="true"></p></section>' +
      '<button type="button" class="statistics-exercise" hidden></button></div>';
    const lesson = panel.querySelector('.statistics-studio');
    const find = selector => lesson.querySelector(selector);
    const result = find('[data-stats-result]');
    const exerciseButton = find('.statistics-exercise');
    function selectView(view) {
      const detail = stage.views[view];
      const exercise = questions.find(item => item.id === (detail.exercise || stage.exercise));
      exerciseButton.hidden = !exercise || !onQuestion;
      if (exercise && onQuestion) {
        exerciseButton.dataset.exerciseId = exercise.id;
        const number = exercise.id.match(/-q(\d+)$/)?.[1];
        const tamilLabel = /\p{Script=Tamil}/u.test(exercise.label.ta || '') ? exercise.label.ta :
          'பயிற்சி ' + exercise.exercise + (number ? ' · வினா ' + number : '') + ' (ஆங்கிலத்தில்)';
        exerciseButton.textContent = tr('Connect · ' + exercise.label.en, 'தொடர்புடைய ' + tamilLabel);
        exerciseButton.onclick = () => onQuestion(exercise);
      }
      const practice = detail.practice || stage.practice;
      const notes = find('[data-stats-notes]');
      notes.innerHTML = detail.notes.map(note => '<p>' + esc(pick(note)) + '</p>').join('') +
        (detail.formula ? notation.render({...detail.formula, fallback: pick(detail.formula.fallback)}) : '') +
        '<p><strong>' + tr('Why it works', 'இது ஏன் சரியாகிறது?') + '</strong></p><p>' + esc(pick(detail.why)) + '</p>';
      notation.prepare(notes);
      find('[data-stats-question]').textContent = pick(practice.question);
      const feedback = find('[data-stats-feedback]');
      window.TriggleFeedback.neutral(feedback);
      feedback.textContent = '';
      const answers = find('[data-answers]');
      buttons(answers, practice.choices.map(pick), answer => {
        const correct = answer === practice.correct;
        window.TriggleFeedback.evaluate(answers.children[answer], feedback, correct);
        feedback.textContent = (correct ? tr('Correct. ', 'சரி. ') : tr('Try again. ', 'மீண்டும் முயல். ')) +
          pick(practice.feedback[answer]);
      });
      answers.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', 'false'));

      function update(choice) {
        const shown = demo.run(view, choice, tr);
        find('[data-stats-visual]').innerHTML = shown.visual;
        result.innerHTML = (shown.equation || '') + '<p>' + esc(shown.conclusion) + '</p>';
        notation.prepare(result);
      }
      buttons(find('[data-stats-controls]'), demo.controls[view].map(pick), update);
      update(0);
    }
    buttons(find('[data-stats-format]'), (demo.formats || []).map(pick), selectView);
    selectView(0);
  }

  window.TriggleStatisticsConcepts = Object.freeze({mount, frequency, summarize, groupedMedian, groupedMode});
})();
