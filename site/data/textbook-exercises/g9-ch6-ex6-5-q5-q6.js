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
          en: 'Equate the acute angles and divide by 2.',
          ta: 'குறுங்கோணங்களைச் சமப்படுத்தி 2-ஆல் வகுக்கவும்.',
          eq: '2θ = 60° ⇒ θ = 30°',
          math: { latex: String.raw`2\theta = 60^{\circ} \implies \theta = \dfrac{60^{\circ}}{2} = 30^{\circ}`, fallback: '2θ = 60° ⇒ θ = 30°', display: true }
        }
      ],
      answer: '(2) 30°',
      answerTa: '(2) 30°',
      answerMath: {
        en: [{ latex: '\\text{(2) } 30^{\\circ}', fallback: '(2) 30°', display: false }],
        ta: [{ latex: '\\text{(2) } 30^{\\circ}', fallback: '(2) 30°', display: false }]
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
          en: 'Use complementary-angle identities: sec 20° = cosec(90° − 20°) = cosec 70°, and sec 51° = cosec(90° − 51°) = cosec 49°.',
          ta: 'நிரப்புக்கோண முற்றொருமைகளின்படி, sec 20° = cosec 70° மற்றும் sec 51° = cosec 49°.',
          eq: 'sec 20° = cosec 70°, sec 51° = cosec 49°',
          math: {
            latex: String.raw`\begin{aligned}\sec 20^{\circ} &= \operatorname{cosec}(90^{\circ} - 20^{\circ}) = \operatorname{cosec} 70^{\circ} \\ \sec 51^{\circ} &= \operatorname{cosec}(90^{\circ} - 51^{\circ}) = \operatorname{cosec} 49^{\circ}\end{aligned}`,
            fallback: 'sec 20° = cosec 70°, sec 51° = cosec 49°',
            display: true
          }
        },
        {
          en: 'Apply the reciprocal identity sin θ · cosec θ = 1 to each term.',
          ta: 'ஒவ்வொரு உறுப்பிலும் sin θ · cosec θ = 1 என்ற தலைகீழி முற்றொருமையைப் பயன்படுத்துக.',
          eq: '3(sin 70° cosec 70°) + 2(sin 49° cosec 49°) = 3(1) + 2(1)',
          math: {
            latex: String.raw`3(\sin 70^{\circ}\operatorname{cosec} 70^{\circ}) + 2(\sin 49^{\circ}\operatorname{cosec} 49^{\circ}) = 3(1) + 2(1)`,
            fallback: '3(sin 70° cosec 70°) + 2(sin 49° cosec 49°) = 3(1) + 2(1)',
            display: true
          }
        },
        {
          en: 'Add the two values to obtain the final answer.',
          ta: 'இரு மதிப்புகளையும் கூட்டவும்.',
          eq: '3 + 2 = 5',
          math: { latex: String.raw`3 + 2 = 5`, fallback: '3 + 2 = 5', display: true }
        }
      ],
      answer: '(3) 5',
      answerTa: '(3) 5',
      answerMath: {
        en: [{ latex: '\\text{(3) } 5', fallback: '(3) 5', display: false }],
        ta: [{ latex: '\\text{(3) } 5', fallback: '(3) 5', display: false }]
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
