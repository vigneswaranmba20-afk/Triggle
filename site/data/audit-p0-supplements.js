(() => {
  'use strict';

  const SUPPLEMENTS = {
    // AUD08-02: G10 Ch 8 Ex 8.1 Q10-Q13 Step-Deviation Method (2025 TN Textbook)
    'c10-8-ex8-1-q10': {
      title: {
        en: 'Textbook Step-Deviation Method (No Calculator)',
        ta: 'பாடநூல் படி-விலக்க முறை (கணக்கி இன்றி)'
      },
      note: {
        en: 'Choose assumed mean A = 55 and class width c = 5 so d_i = (x_i − 55)/5 reduces to small integers:',
        ta: 'ஊகச் சராசரி A = 55 மற்றும் பிரிவு இடைவெளி c = 5 என எடுத்துக் கொண்டால் d_i = (x_i − 55)/5 சிறிய முழு எண்களாகும்:'
      },
      table: {
        headers: ['Rainfall (x_i)', 'f_i', 'd_i = (x_i−55)/5', 'f_i d_i', 'f_i d_i²'],
        rows: [
          ['45', '5', '−2', '−10', '20'],
          ['50', '13', '−1', '−13', '13'],
          ['55', '4', '0', '0', '0'],
          ['60', '9', '1', '9', '9'],
          ['65', '5', '2', '10', '20'],
          ['70', '4', '3', '12', '36']
        ],
        footer: ['Total', 'N = 40', '—', 'Σf_i d_i = 8', 'Σf_i d_i² = 98']
      },
      latex: '\\sigma = c\\sqrt{\\dfrac{\\sum f_i d_i^2}{N}-\\left(\\dfrac{\\sum f_i d_i}{N}\\right)^2} = 5\\sqrt{\\dfrac{98}{40}-\\left(\\dfrac{8}{40}\\right)^2} = 5\\sqrt{2.45-0.04} = 5\\sqrt{2.41} \\approx 7.76'
    },
    'c10-8-ex8-1-q11': {
      title: {
        en: 'Textbook Step-Deviation Method (No Calculator)',
        ta: 'பாடநூல் படி-விலக்க முறை (கணக்கி இன்றி)'
      },
      note: {
        en: 'Take class midpoints x_i, assumed mean A = 35, and c = 10:',
        ta: 'மைய மதிப்புகள் x_i, ஊகச் சராசரி A = 35 மற்றும் c = 10 எனக் கொள்க:'
      },
      latex: 'd_i = \\dfrac{x_i - 35}{10}, \\qquad \\sigma = 10\\sqrt{\\dfrac{\\sum f_i d_i^2}{N}-\\left(\\dfrac{\\sum f_i d_i}{N}\\right)^2} \\approx 14.58'
    },
    'c10-8-ex8-1-q12': {
      title: {
        en: 'Textbook Step-Deviation Method (Inclusive Classes 21–24 … 41–44)',
        ta: 'பாடநூல் படி-விலக்க முறை (உள்ளடக்கிய பிரிவுகள் 21–24 … 41–44)'
      },
      note: {
        en: 'Convert inclusive classes to continuous boundaries (20.5–24.5, …) with class width c = 4 and assumed mean A = 30.5:',
        ta: 'உள்ளடக்கிய பிரிவுகளைத் தொடர் பிரிவுகளாக (20.5–24.5, …) மாற்ற c = 4 மற்றும் A = 30.5 கிடைக்கும்:'
      },
      table: {
        headers: ['Diameter (x_i)', 'f_i', 'd_i = (x_i−30.5)/4', 'f_i d_i', 'f_i d_i²'],
        rows: [
          ['22.5', '15', '−2', '−30', '60'],
          ['26.5', '18', '−1', '−18', '18'],
          ['30.5', '20', '0', '0', '0'],
          ['34.5', '16', '1', '16', '16'],
          ['38.5', '8', '2', '16', '32'],
          ['42.5', '7', '3', '21', '63']
        ],
        footer: ['Total', 'N = 84', '—', 'Σf_i d_i = 5', 'Σf_i d_i² = 189']
      },
      latex: '\\sigma = 4\\sqrt{\\dfrac{189}{84}-\\left(\\dfrac{5}{84}\\right)^2} = 4\\sqrt{2.25 - 0.0035} \\approx 5.99'
    },
    'c10-8-ex8-1-q13': {
      title: {
        en: 'Textbook Step-Deviation Method (No Calculator)',
        ta: 'பாடநூல் படி-விலக்க முறை (கணக்கி இன்றி)'
      },
      note: {
        en: 'Use midpoints x_i ∈ {9, 10, 11, 12, 13}, assumed mean A = 11, and c = 1 so d_i = x_i − 11 ∈ {−2, −1, 0, 1, 2}:',
        ta: 'மைய மதிப்புகள் {9, 10, 11, 12, 13}, A = 11 மற்றும் c = 1 எனில் d_i ∈ {−2, −1, 0, 1, 2}:'
      },
      latex: '\\sigma = 1\\cdot\\sqrt{\\dfrac{\\sum f_i d_i^2}{N}-\\left(\\dfrac{\\sum f_i d_i}{N}\\right)^2} \\approx 1.07\\text{ s}'
    },

    // AUD15-01 & AUD15-02: G9 Ch 8 Tabular Distributions & 2025 TN Textbook Notation
    'g9-ch8-ex8.1-q4': {
      title: { en: 'Structured Data Table', ta: 'தரவு அட்டவணை' },
      table: {
        headers: ['Mouse marking', '1', '2', '3', '4', '5', '6'],
        rows: [['Tumor Volume (mm³)', '145', '148', '142', '141', '139', '140']]
      },
      latex: '\\bar{X} = \\dfrac{145+148+142+141+139+140}{6} = \\dfrac{855}{6} = 142.5\\text{ mm}^3'
    },
    'g9-ch8-ex8.1-q5': {
      title: { en: 'Structured Frequency Table', ta: 'நிகழ்வெண் அட்டவணை' },
      table: {
        headers: ['Marks (x)', 'f', 'fx'],
        rows: [
          ['10', '6', '60'],
          ['15', '8', '120'],
          ['20', 'p', '20p'],
          ['25', '10', '250'],
          ['30', '6', '180']
        ],
        footer: ['Total', 'N = 30 + p', 'Σfx = 610 + 20p']
      }
    },
    'g9-ch8-ex8.1-q6': {
      title: { en: 'Direct Method Frequency Table', ta: 'நேரடி முறை நிகழ்வெண் அட்டவணை' },
      table: {
        headers: ['Weight (kg)', 'Mid x', 'f', 'fx'],
        rows: [
          ['15–25', '20', '4', '80'],
          ['25–35', '30', '11', '330'],
          ['35–45', '40', '19', '760'],
          ['45–55', '50', '14', '700'],
          ['55–65', '60', '0', '0'],
          ['65–75', '70', '2', '140']
        ],
        footer: ['Total', '—', 'N = 50', 'Σfx = 2010']
      }
    },
    'g9-ch8-ex8.1-q7': {
      title: { en: 'Assumed Mean Frequency Table (A = 25)', ta: 'ஊகச் சராசரி அட்டவணை (A = 25)' },
      table: {
        headers: ['Class', 'Mid x', 'f', 'd = x − 25', 'fd'],
        rows: [
          ['0–10', '5', '5', '−20', '−100'],
          ['10–20', '15', '7', '−10', '−70'],
          ['20–30', '25', '15', '0', '0'],
          ['30–40', '35', '28', '10', '280'],
          ['40–50', '45', '8', '20', '160']
        ],
        footer: ['Total', '—', 'N = 63', '—', 'Σfd = 270']
      }
    },
    'g9-ch8-ex8.1-q8': {
      title: {
        en: '2025 TN Textbook Step-Deviation & Continuous Boundaries (c = 5)',
        ta: '2025 பாடநூல் படி-விலக்க முறை & தொடர் எல்லைகள் (c = 5)'
      },
      note: {
        en: 'Convert inclusive classes (15–19, 20–24, …) to continuous boundaries (14.5–19.5, 19.5–24.5, …) using L − 0.5 and U + 0.5, giving class width c = 5 and d = (x − A)/c with A = 27:',
        ta: 'உள்ளடக்கிய பிரிவுகளை L − 0.5 முதல் U + 0.5 வரை தொடர் பிரிவுகளாக மாற்றினால் c = 5 மற்றும் A = 27 எனில் d = (x − 27)/5 கிடைக்கும்:'
      },
      table: {
        headers: ['Age (Continuous)', 'Mid x', 'f', 'd = (x−27)/5', 'fd'],
        rows: [
          ['14.5–19.5', '17', '4', '−2', '−8'],
          ['19.5–24.5', '22', '20', '−1', '−20'],
          ['24.5–29.5', '27', '38', '0', '0'],
          ['29.5–34.5', '32', '24', '1', '24'],
          ['34.5–39.5', '37', '10', '2', '20'],
          ['39.5–44.5', '42', '9', '3', '27']
        ],
        footer: ['Total', '—', 'N = 105', '—', 'Σfd = 43']
      },
      latex: '\\bar{X} = A + \\dfrac{\\sum fd}{N}\\times c = 27 + \\dfrac{43}{105}\\times 5 = \\dfrac{610}{21} \\approx 29.05'
    },
    'g9-ch8-ex8.2-q5': {
      title: {
        en: '2025 TN Textbook Median Notation & Cumulative Frequency Table',
        ta: '2025 பாடநூல் இடைநிலை குறியீடு மற்றும் குவி நிகழ்வெண் அட்டவணை'
      },
      note: {
        en: '2025 TN Class 9 textbook (EN p. 280 / TA p. 296) writes Median = l + [(N/2 − m)/f] × c, where l = 30, N/2 = 25, m = 24, f = 10, c = 10:',
        ta: '2025 பாடநூல் சூத்திரம்: இடைநிலை = l + [(N/2 − m)/f] × c (இங்கு l = 30, N/2 = 25, m = 24, f = 10, c = 10):'
      },
      table: {
        headers: ['Class', 'f', 'cf'],
        rows: [
          ['0–10', '2', '2'],
          ['10–20', '7', '9'],
          ['20–30', '15', '24 (m)'],
          ['30–40', '10 (f)', '34'],
          ['40–50', '11', '45'],
          ['50–60', '5', '50']
        ],
        footer: ['Total', 'N = 50', 'N/2 = 25']
      },
      latex: '\\text{Median} = l + \\left(\\dfrac{\\frac{N}{2}-m}{f}\\right)\\times c = 30 + \\left(\\dfrac{25-24}{10}\\right)\\times 10 = 31'
    },
    'g9-ch8-ex8.3-q4': {
      title: { en: 'Structured Demand Table', ta: 'தேவை அட்டவணை' },
      table: {
        headers: ['Size', '38', '39', '40', '41', '42', '43', '44', '45'],
        rows: [['No. of Persons', '36', '15', '37', '13', '26', '8', '6', '2']]
      }
    },
    'g9-ch8-ex8.3-q5': {
      title: {
        en: '2025 TN Textbook Mode Formula & Table (Sec. 8.6.1)',
        ta: '2025 பாடநூல் முகடு சூத்திரம் மற்றும் அட்டவணை'
      },
      note: {
        en: '2025 TN Class 9 textbook (EN p. 285 / TA p. 302) uses f for modal class frequency, f₁ for preceding, and f₂ for succeeding: Mode = l + [(f − f₁)/(2f − f₁ − f₂)] × c.',
        ta: '2025 பாடநூல் குறியீடு: முகடு வகுப்பு நிகழ்வெண் f = 46, முந்தைய f₁ = 38, அடுத்த f₂ = 34:'
      },
      table: {
        headers: ['Marks', '0–10', '10–20', '20–30 (Modal)', '30–40', '40–50'],
        rows: [['Students (f)', '22', '38 (f₁)', '46 (f)', '34 (f₂)', '20']]
      },
      latex: '\\text{Mode} = l + \\left(\\dfrac{f - f_1}{2f - f_1 - f_2}\\right)\\times c = 20 + \\left(\\dfrac{46-38}{92-38-34}\\right)\\times 10 = 24'
    },
    'g9-ch8-ex8.3-q6': {
      title: {
        en: '2025 TN Textbook Mode Formula & Continuous Boundaries',
        ta: '2025 பாடநூல் முகடு சூத்திரம் & தொடர் எல்லைகள்'
      },
      note: {
        en: 'Convert inclusive weights (55–64 → 54.5–64.5) so l = 54.5, c = 10, f = 14, f₁ = 10, f₂ = 8:',
        ta: 'தொடர் எல்லைகளாக மாற்ற l = 54.5, c = 10, f = 14, f₁ = 10, f₂ = 8:'
      },
      table: {
        headers: ['Weight (Continuous)', '24.5–34.5', '34.5–44.5', '44.5–54.5', '54.5–64.5 (Modal)', '64.5–74.5', '74.5–84.5'],
        rows: [['Students', '4', '8', '10 (f₁)', '14 (f)', '8 (f₂)', '6']]
      },
      latex: '\\text{Mode} = l + \\left(\\dfrac{f - f_1}{2f - f_1 - f_2}\\right)\\times c = 54.5 + \\left(\\dfrac{14-10}{28-10-8}\\right)\\times 10 = 58.5\\text{ kg}'
    },

    // AUD20-01: G9 Ch 2 Ex 2.9 Q18, Q8, Q10
    'g9-ch2-ex9-q18': {
      title: { en: 'Equal-Exponent Product Identity', ta: 'சம அடுக்கு பெருக்கல் முற்றொருமை' },
      note: {
        en: 'Apply a^(−3/4) × b^(−3/4) = (ab)^(−3/4) directly:',
        ta: 'a^(−3/4) × b^(−3/4) = (ab)^(−3/4) என்ற விதியைப் பயன்படுத்துக:'
      },
      latex: '\\left[(0.000729)\\times(0.09)\\right]^{-3/4} = \\left[\\left(\\dfrac{3}{10}\\right)^6\\times\\left(\\dfrac{3}{10}\\right)^2\\right]^{-3/4} = \\left[\\left(\\dfrac{3}{10}\\right)^8\\right]^{-3/4} = \\left(\\dfrac{3}{10}\\right)^{-6} = \\dfrac{10^6}{3^6}'
    },
    'g9-ch2-ex9-q8': {
      title: { en: '2025 Textbook Print Note (5/7 Recurring Bar)', ta: '2025 பாடநூல் அச்சுக் குறிப்பு (5/7 சுழல் கோடு)' },
      note: {
        en: '5/7 = 0.714285714285… = 0.\\overline{714285} is a non-terminating recurring decimal (Option 4 in the English PDF print layer; listed as Option 2 in printed p. 309 Answer Appendix where the overbar shifted).',
        ta: '5/7 = 0.714285… என்பது முடிவுறாச் சுழல் தசம எண் ஆகும்.'
      },
      latex: '\\dfrac{5}{7} = 0.\\overline{714285}'
    },
    'g9-ch2-ex9-q10': {
      title: { en: 'Fraction-Sum Verification', ta: 'பின்னக் கூட்டல் சரிபார்ப்பு' },
      latex: '0.\\overline{34} + 0.3\\overline{4} = \\dfrac{34}{99} + \\dfrac{31}{90} = \\dfrac{340 + 341}{990} = \\dfrac{681}{990} = 0.6\\overline{87}'
    },

    // AUD20-02: G9 Ch 2 Ex 2.1 Q3 & Ex 2.3 Q2, Q3 Answer-Appendix Methods
    'g9-ch2-ex1-q3-i': {
      title: { en: '2025 Textbook Answer Appendix Midpoint Chain q = (a + b)/2', ta: '2025 பாடநூல் நடுப்புள்ளி பின்னத் தொடர் q = (a + b)/2' },
      latex: 'q_1 = \\dfrac{\\frac{1}{4}+\\frac{1}{5}}{2} = \\dfrac{9}{40},\\quad q_2 = \\dfrac{19}{80},\\quad q_3 = \\dfrac{39}{160},\\quad q_4 = \\dfrac{79}{320},\\quad q_5 = \\dfrac{159}{640}'
    },
    'g9-ch2-ex1-q3-iii': {
      title: { en: '2025 Textbook Answer Appendix Midpoint Chain q = (a + b)/2', ta: '2025 பாடநூல் நடுப்புள்ளி பின்னத் தொடர் q = (a + b)/2' },
      latex: 'q_1 = \\dfrac{-1+(-2)}{2} = -\\dfrac{3}{2},\\quad q_2 = -\\dfrac{5}{4},\\quad q_3 = -\\dfrac{9}{8},\\quad q_4 = -\\dfrac{17}{16},\\quad q_5 = -\\dfrac{33}{32}'
    },
    'g9-ch2-ex3-q2-ii': {
      title: { en: 'Textbook Non-Terminating Non-Recurring Decimal Method', ta: 'பாடநூல் முடிவுறாச் சுழலற்ற தசம முறை' },
      latex: '\\dfrac{6}{7} = 0.\\overline{857142},\\; \\dfrac{12}{13} = 0.\\overline{923076} \\implies 0.8616611666111\\ldots,\\; 0.8717711777111\\ldots'
    },
    'g9-ch2-ex3-q2-iii': {
      title: { en: 'Textbook Non-Terminating Non-Recurring Decimal Method', ta: 'பாடநூல் முடிவுறாச் சுழலற்ற தசம முறை' },
      latex: '\\sqrt{2} \\approx 1.414\\ldots,\\; \\sqrt{3} \\approx 1.732\\ldots \\implies 1.515511555\\ldots,\\; 1.616611666\\ldots'
    },
    'g9-ch2-ex3-q3': {
      title: { en: 'Textbook Non-Terminating Non-Recurring Decimal Method', ta: 'பாடநூல் முடிவுறாச் சுழலற்ற தசம முறை' },
      note: {
        en: 'Any two non-terminating, non-repeating decimals between the given bounds (such as 0.12010010001… and 0.12020020002…) are valid irrational numbers.',
        ta: 'கொடுக்கப்பட்ட எல்லைகளுக்கு இடைப்பட்ட எந்த இரு முடிவுறாச் சுழலற்ற தசம எண்களும் விகிதமுறா எண்களாகும்.'
      }
    }
  };

  window.TriggleP0Supplements = Object.freeze({
    get(id) {
      return SUPPLEMENTS[id] || null;
    },
    ids: Object.keys(SUPPLEMENTS)
  });
})();
