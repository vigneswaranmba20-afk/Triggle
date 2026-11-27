/* Shared answer presentation and decorative mathematical glyphs. */
window.TriggleFeedback = Object.freeze({
  evaluate(choice, message, correct) {
    const state = correct ? 'correct' : 'incorrect';
    const previous = choice.parentElement.querySelector('[data-answer-state]');
    if (previous) delete previous.dataset.answerState;
    choice.dataset.answerState = state;
    message.dataset.answerState = state;
  },
  neutral(message, choices) {
    delete message.dataset.answerState;
    const previous = choices?.querySelector('[data-answer-state]');
    if (previous) delete previous.dataset.answerState;
  }
});
(() => {
  'use strict';

  const marks = {
    sets: ['<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>', [12, 12]],
    relations: ['<ellipse cx="5" cy="12" rx="3" ry="7"/><ellipse cx="19" cy="12" rx="3" ry="7"/><path d="m5 9 14 0m-3-2 3 2-3 2M5 15l14-2"/>', [19, 13]],
    numbers: ['<path d="M2 12h20m-3-3 3 3-3 3M5 10v4m5-4v4m5-4v4"/>', [15, 12]],
    algebra: ['<path d="M3 17h18M9 21V3m-5 2c2 12 5 15 8 12s5-3 8-12"/>', [12, 17]],
    geometry: ['<path d="M3 19 10 5l11 14ZM10 5v14" /><path d="M10 16h3v3"/>', [10, 19]],
    coordinates: ['<path d="M3 17h18m-3-3 3 3-3 3M7 21V3M4 6l3-3 3 3m6 3H7m9 0v8" />', [16, 9]],
    trigonometry: ['<circle cx="12" cy="12" r="7.5"/><path d="M2 12h20M12 2v20l0-10 6-4.5V12"/>', [18, 7.5]],
    mensuration: ['<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Zm0 9 8-4.5M12 12 4 7.5M12 12v9"/>', [12, 12]],
    statistics: ['<path d="M3 3v17h18M6 20v-6h3v6m2 0V9h3v11m2 0V5h3v15"/>', [17.5, 5]],
    probability: ['<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h.01M16 16h.01"/>', [12, 12]],
    'statistics-probability': ['<path d="M2 20h20M4 20v-5h3v5m2 0V11h3v9"/><rect x="14" y="4" width="8" height="8" rx="1.5"/>', [18, 8]],
    concept: ['<path d="M3 5h4a5 5 0 0 1 5 5v10a5 5 0 0 0-5-5H3Zm18 0h-4a5 5 0 0 0-5 5v10a5 5 0 0 1 5-5h4Z"/>'],
    hint: ['<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0l-1 2H9Z"/>'],
    figure: ['<path d="M3 19 10 5l11 14ZM10 5v14m0-3h3v3"/>'],
    exercises: ['<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'],
    home: ['<path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9"/>'],
    previous: ['<path d="M20 12H4m6-6-6 6 6 6"/>'],
    next: ['<path d="M4 12h16m-6-6 6 6-6 6"/>'],
    explain: ['<path d="M4 4h16v12h-8l-5 4v-4H4Zm4 5h8m-8 3h5"/>'],
    explore: ['<circle cx="12" cy="12" r="9"/><path d="m8 16 2-6 6-2-2 6Z"/>'],
    solution: ['<path d="M5 9h14M5 15h14"/>'],
    check: ['<path d="m5 12 4 4L19 6"/>']
  };

  const chapters = {
    'g9-ch1': 'sets', 'g9-ch2': 'numbers', 'g9-ch3': 'algebra', 'g9-ch4': 'geometry',
    'g9-ch5': 'coordinates', 'g9-ch6': 'trigonometry', 'g9-ch7': 'mensuration',
    'g9-ch8': 'statistics', 'g9-ch9': 'probability',
    'g10-ch1': 'relations', 'g10-ch2': 'numbers', 'g10-ch3': 'algebra', 'g10-ch4': 'geometry',
    'g10-ch5': 'coordinates', 'g10-ch6': 'trigonometry', 'g10-ch7': 'mensuration',
    'g10-ch8': 'statistics-probability'
  };

  function icon(name) {
    if (!Object.hasOwn(marks, name)) return '';
    const [drawing, point] = marks[name];
    return '<svg class="ver-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
      drawing + (point ? '<circle class="ver-point" cx="' + point[0] + '" cy="' + point[1] + '" r="1.65"/>' : '') + '</svg>';
  }

  function chapter(id) {
    return Object.hasOwn(chapters, id) ? icon(chapters[id]) : '';
  }

  for (const slot of document.querySelectorAll('[data-ver-icon]')) {
    slot.innerHTML = icon(slot.dataset.verIcon);
  }
  window.TriggleGlyph = Object.freeze({icon, chapter});
})();
