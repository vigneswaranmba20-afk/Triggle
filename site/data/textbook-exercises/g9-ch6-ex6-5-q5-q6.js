/* Grade 9 Exercise 6.5 Q5 & Q6 — 2025 English & Tamil source-checked MCQs. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES?.[9];
  const curriculum = window.TRIGGLE_CURRICULUM;
  if (!grade || !Array.isArray(grade.items)) {
    throw Error('Grade 9 core must load first');
  }

  const entries = [
    {
      id: 'c9-exercise-6-5-q5',
      classNum: 9,
      chapter: '6',
      exercise: '6.5',
      topic: { en: 'Trigonometry', ta: 'முக்கோணவியல்' },
      label: { en: 'Exercise 6.5 · Q5', ta: 'பயிற்சி 6.5 · வினா 5' },
      title: {
        en: 'Find θ from 2 sin 2θ = √3',
        ta: '2 sin 2θ = √3 எனில் θ மதிப்பைக் காண்க'
      },
      q: {
        en: 'If 2 sin 2θ = √3, then the value of θ is\n(1) 90°   (2) 30°\n(3) 45°   (4) 60°',
        ta: '2 sin 2θ = √3 எனில், θ இன் மதிப்பு\n(1) 90°   (2) 30°\n(3) 45°   (4) 60°'
      },
      questionMath: {
        en: [
          'If ',
          { latex: '2\\sin 2\\theta = \\sqrt{3}', fallback: '2 sin 2θ = √3' },
          ', then the value of ',
          { latex: '\\theta', fallback: 'θ' },
          ' is\n(1) 90°   (2) 30°\n(3) 45°   (4) 60°'
        ],
        ta: [
          { latex: '2\\sin 2\\theta = \\sqrt{3}', fallback: '2 sin 2θ = √3' },
          ' எனில், ',
          { latex: '\\theta', fallback: 'θ' },
          ' இன் மதிப்பு\n(1) 90°   (2) 30°\n(3) 45°   (4) 60°'
        ]
      },
      steps: [
        {
          en: 'Divide both sides of the equation by 2 to isolate sin 2θ.',
          ta: 'சமன்பாட்டின் இருபுறமும் 2-ஆல் வகுத்து sin 2θ மதிப்பைப் பெறுக.',
          eq: 'sin 2θ = √3 / 2',
          math: { latex: String.raw`\sin 2\theta = \dfrac{\sqrt{3}}{2}`, fallback: 'sin 2θ = √3 / 2', display: true }
        },
        {
          en: 'Recall the standard trigonometric value: sin 60° = √3 / 2.',
          ta: 'அடிப்படை முக்கோணவியல் மதிப்பின்படி, sin 60° = √3 / 2.',
          eq: 'sin 2θ = sin 60°',
          math: { latex: String.raw`\sin 2\theta = \sin 60^{\circ}`, fallback: 'sin 2θ = sin 60°', display: true }
        },
        {
          en: 'In Grade 9 right-triangle trigonometry, the angle 2θ is acute (0° < 2θ < 90°), so 2θ = 60° gives θ = 30° (Option 2, the textbook answer). Note: without restricting 2θ to be acute, 2θ = 120° (θ = 60°, Option 4) also satisfies sin 2θ = √3 / 2.',
          ta: '9-ஆம் வகுப்பு செங்கோண முக்கோணவியலில் 2θ ஒரு குறுங்கோணமாக (0° < 2θ < 90°) கருதப்படுவதால் 2θ = 60° ⇒ θ = 30° (பாடநூல் விடை (2)) கிடைக்கிறது. குறிப்பு: 2θ குறுங்கோணம் என்ற நிபந்தனை இல்லையெனில் 2θ = 120° (θ = 60°, விருப்பம் 4) என்பதும் sin 2θ = √3 / 2 ஐ நிறைவு செய்யும்.',
          eq: '0° < 2θ < 90° ⇒ 2θ = 60° ⇒ θ = 30° (if 2θ ≤ 180°, θ = 60° also satisfies sin 120° = √3/2)',
          math: { latex: String.raw`0^{\circ} < 2\theta < 90^{\circ} \implies 2\theta = 60^{\circ} \implies \theta = \dfrac{60^{\circ}}{2} = 30^{\circ}`, fallback: '0° < 2θ < 90° ⇒ 2θ = 60° ⇒ θ = 30° (if 2θ ≤ 180°, θ = 60° also satisfies sin 120° = √3/2)', display: true }
        }
      ],
      answer: '(2) 30° (under Grade 9 acute-angle scope 0° < 2θ < 90°; without it, θ = 60° also satisfies 2 sin 2θ = √3)',
      answerTa: '(2) 30° (குறுங்கோண வரம்பில் 0° < 2θ < 90°; வரம்பின்றி θ = 60° என்பதும் சமன்பாட்டை நிறைவு செய்யும்)',
      answerMath: {
        en: [{ latex: '\\text{(2) } 30^{\\circ}', fallback: '(2) 30° (under Grade 9 acute-angle scope 0° < 2θ < 90°; without it, θ = 60° also satisfies 2 sin 2θ = √3)', display: false }],
        ta: [{ latex: '\\text{(2) } 30^{\\circ}', fallback: '(2) 30° (குறுங்கோண வரம்பில் 0° < 2θ < 90°; வரம்பின்றி θ = 60° என்பதும் சமன்பாட்டை நிறைவு செய்யும்)', display: false }]
      },
      kind: 'reference',
      reference: 'TN SCERT Grade 9 Mathematics, revised 2025. Exercise 6.5 Q5. English PDF p.246 (printed p.240), Tamil PDF p.260 (printed p.254).',
      source: 'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      page: 246,
      translationReview: 'pending'
    },
    {
      id: 'c9-exercise-6-5-q6',
      classNum: 9,
      chapter: '6',
      exercise: '6.5',
      topic: { en: 'Trigonometry', ta: 'முக்கோணவியல்' },
      label: { en: 'Exercise 6.5 · Q6', ta: 'பயிற்சி 6.5 · வினா 6' },
      title: {
        en: 'Evaluate 3 sin 70° sec 20° + 2 sin 49° sec 51°',
        ta: '3 sin 70° sec 20° + 2 sin 49° sec 51° இன் மதிப்பு காண்க'
      },
      q: {
        en: 'The value of 3 sin 70° sec 20° + 2 sin 49° sec 51° is\n(1) 2   (2) 3\n(3) 5   (4) 6',
        ta: '3 sin 70° sec 20° + 2 sin 49° sec 51° இன் மதிப்பு\n(1) 2   (2) 3\n(3) 5   (4) 6'
      },
      questionMath: {
        en: [
          'The value of ',
          { latex: '3\\sin 70^{\\circ}\\sec 20^{\\circ} + 2\\sin 49^{\\circ}\\sec 51^{\\circ}', fallback: '3 sin 70° sec 20° + 2 sin 49° sec 51°' },
          ' is\n(1) 2   (2) 3\n(3) 5   (4) 6'
        ],
        ta: [
          { latex: '3\\sin 70^{\\circ}\\sec 20^{\\circ} + 2\\sin 49^{\\circ}\\sec 51^{\\circ}', fallback: '3 sin 70° sec 20° + 2 sin 49° sec 51°' },
          ' இன் மதிப்பு\n(1) 2   (2) 3\n(3) 5   (4) 6'
        ]
      },
      steps: [
        {
          en: 'Use the complementary-angle identity on the first term: sec 20° = cosec(90° − 20°) = cosec 70°, so 3 sin 70° sec 20° = 3(sin 70° cosec 70°) = 3.',
          ta: 'முதல் உறுப்பில் நிரப்புக்கோண முற்றொருமையைப் பயன்படுத்துக: sec 20° = cosec(90° − 20°) = cosec 70°, எனவே 3 sin 70° sec 20° = 3.',
          eq: 'sec 20° = cosec 70° ⇒ 3 sin 70° sec 20° = 3',
          math: {
            latex: String.raw`\sec 20^{\circ} = \operatorname{cosec}(90^{\circ} - 20^{\circ}) = \operatorname{cosec} 70^{\circ} \implies 3\sin 70^{\circ}\sec 20^{\circ} = 3`,
            fallback: 'sec 20° = cosec 70° ⇒ 3 sin 70° sec 20° = 3',
            display: true
          }
        },
        {
          en: 'Check the second term: 90° − 51° = 39° ≠ 49°, so sec 51° = cosec 39° (not cosec 49°). Literally, 3 sin 70° sec 20° + 2 sin 49° sec 51° ≈ 3 + 2.3985 = 5.3985.',
          ta: 'இரண்டாம் உறுப்பைச் சரிபார்க்க: 90° − 51° = 39° ≠ 49°, எனவே sec 51° = cosec 39° ஆகும் (cosec 49° அல்ல). நேரடிக் கணக்கீட்டில் 3 + 2.3985 ≈ 5.3985 கிடைக்கும்.',
          eq: 'sec 51° = cosec 39° ⇒ 3 + 2 sin 49° / sin 39° ≈ 5.3985',
          math: {
            latex: String.raw`\sec 51^{\circ} = \operatorname{cosec} 39^{\circ} \implies 3 + \dfrac{2\sin 49^{\circ}}{\sin 39^{\circ}} \approx 5.3985`,
            fallback: 'sec 51° = cosec 39° ⇒ 3 + 2 sin 49° / sin 39° ≈ 5.3985',
            display: true
          }
        },
        {
          en: 'Textbook key note: the printed answer key (3) 5 assumes the complementary pair 2 sin 49° sec 41° (or 2 sin 39° sec 51°), which gives 3 + 2 = 5.',
          ta: 'பாடநூல் விடைக் குறிப்பு: விடை (3) 5 என்பது 2 sin 49° sec 41° (அல்லது 2 sin 39° sec 51°) என்ற நிரப்புக்கோண இணையைக் கருதி 3 + 2 = 5 எனத் தரப்பட்டுள்ளது.',
          eq: 'If 2 sin 49° sec 41°: 3 + 2 = 5',
          math: { latex: String.raw`\text{Intended complementary pair: } 3 + 2 = 5`, fallback: 'If 2 sin 49° sec 41°: 3 + 2 = 5', display: true }
        }
      ],
      answer: '(3) 5 (textbook key assumes complementary 49° and 41°; literal 3 sin 70° sec 20° + 2 sin 49° sec 51° ≈ 5.3985)',
      answerTa: '(3) 5 (49° மற்றும் 41° நிரப்புக்கோண இணை அடிப்படையில்; நேரடி மதிப்பு ≈ 5.3985)',
      answerMath: {
        en: [{ latex: '\\text{(3) } 5', fallback: '(3) 5 (textbook key assumes complementary 49° and 41°; literal 3 sin 70° sec 20° + 2 sin 49° sec 51° ≈ 5.3985)', display: false }],
        ta: [{ latex: '\\text{(3) } 5', fallback: '(3) 5 (49° மற்றும் 41° நிரப்புக்கோண இணை அடிப்படையில்; நேரடி மதிப்பு ≈ 5.3985)', display: false }]
      },
      kind: 'reference',
      reference: 'TN SCERT Grade 9 Mathematics, revised 2025. Exercise 6.5 Q6. English PDF p.246 (printed p.240), Tamil PDF p.260 (printed p.254).',
      source: 'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
      page: 246,
      translationReview: 'pending'
    }
  ];

  const seen = new Set(grade.items.map(item => item.id));
  for (const entry of entries) {
    if (!seen.has(entry.id)) {
      grade.items.push(entry);
      seen.add(entry.id);
    }
  }

  const ch6 = curriculum?.grades?.find(g => g.grade === 9)?.chapters?.find(c => c.number === 6);
  if (ch6) {
    ch6.textbookQuestionIds = ch6.textbookQuestionIds || [];
    for (const entry of entries) {
      if (!ch6.textbookQuestionIds.includes(entry.id)) {
        ch6.textbookQuestionIds.push(entry.id);
      }
    }
  }
})();
