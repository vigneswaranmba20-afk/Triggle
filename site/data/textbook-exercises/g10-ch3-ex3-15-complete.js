/* TN SCERT revised 2025, Grade 10 Algebra Ex 3.15 Q1–Q6 (12 labelled parts: Q1(i)–Q6(ii)); English and Tamil source pages checked. */
(() => {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const grade = root.TRIGGLE_CLASSES?.[10];
  const chapter = root.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 10)?.chapters?.find(c => String(c.number) === '3');
  if (!grade || !chapter) throw Error('Grade 10 Algebra Ex 3.15 dependencies absent');

  const SOURCE_EN = 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view';
  const REF_315 = 'TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 129 / PDF p. 135; Tamil printed p. 131 / PDF p. 137. Answer key checked: English printed p. 339 / PDF p. 345, Tamil printed p. 353 / PDF p. 359. Tamil editorial approval and teacher review pending.';

  const TOPIC = {
    en: 'Algebra — Graphs of Variation',
    ta: 'இயற்கணிதம் — மாறுபாடுகளின் வரைபடங்கள்'
  };

  const entries = [
    {
      id: 'c10-3-ex3-15-q1-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q1(i)',
        ta: 'பயிற்சி 3.15 · வினா 1(i)'
      },
      title: {
        en: 'Marked price for a ₹3250 discount (50% flat discount graph)',
        ta: '₹3250 தள்ளுபடிக்கான குறித்த விலை (50% தள்ளுபடி வரைபடம்)'
      },
      q: {
        en: '1. A garment shop announces a flat 50% discount on every purchase of items for their customers. Draw the graph for the relation between the Marked Price and the Discount. Hence find\n(i) the marked price when a customer gets a discount of ₹3250 (from graph)',
        ta: '1. ஒரு துணிக்கடையானது தனது வாடிக்கையாளர்களுக்கு வாங்கும் ஒவ்வொரு பொருளின் மீதும் 50 % தள்ளுபடியை அறிவிக்கிறது. குறித்த விலைக்கும் தள்ளுபடிக்குமான வரைபடம் வரைக. மேலும்,\n(i) வரைபடத்திலிருந்து, ஒரு வாடிக்கையாளர் ₹3250 –ஐ தள்ளுபடியாகப் பெற்றால், குறித்த விலையைக் காண்க.'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q1-discount.svg',
      figureAlt: {
        en: 'Graph of Discount y (vertical axis, ₹) versus Marked Price x (horizontal axis, ₹) for y = x/2. Dashed red reading lines start at y = 3250 on the vertical axis, meet the line at (6500, 3250), and drop to x = 6500 on the horizontal axis.',
        ta: 'குறித்த விலை x (கிடை அச்சு, ₹) மற்றும் தள்ளுபடித் தொகை y (செங்குத்து அச்சு, ₹) ஆகியவற்றுக்கான y = x/2 வரைபடம். செங்குத்து அச்சில் y = 3250-இலிருந்து கோட்டிற்கு (6500, 3250) சென்று கிடை அச்சில் x = 6500 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q1: Marked Price (x) vs Discount Amount (y = x/2)',
        ta: 'பயிற்சி 3.15 வினா 1: குறித்த விலை (x) மற்றும் தள்ளுபடி (y = x/2) வரைபடம்'
      },
      steps: [
        {
          en: 'Let x be the Marked Price (in ₹) along the horizontal axis and y be the Discount amount (in ₹) along the vertical axis. A 50% discount means y is half of x, which is a direct variation.',
          ta: 'கிடை அச்சில் (x) குறித்த விலையையும் (₹), செங்குத்து அச்சில் (y) தள்ளுபடித் தொகையையும் (₹) எடுத்துக்கொள்வோம். 50% தள்ளுபடி என்பது y = x/2 என்ற நேர் மாறுபாடாகும்.',
          eq: 'y = (50/100)x = (1/2)x',
          math: {
            latex: 'y = \\dfrac{50}{100}x = \\dfrac{1}{2}x',
            fallback: 'y = (50/100)x = (1/2)x',
            display: true
          }
        },
        {
          en: 'Compute points to plot the line: (1000, 500), (2000, 1000), (3000, 1500), (4000, 2000), (5000, 2500), (6000, 3000), and (7000, 3500). Plot these points and join them with a straight line through the origin.',
          ta: 'புள்ளிகளைக் கணக்கிடுவோம்: (1000, 500), (2000, 1000), (3000, 1500), (4000, 2000), (5000, 2500), (6000, 3000), (7000, 3500). இவற்றைக் குறித்து ஆதிப்புள்ளி வழிச் செல்லும் நேர்க்கோடு வரைக.',
          eq: 'Points: (1000, 500), (2000, 1000), (4000, 2000), (6000, 3000)',
          math: {
            latex: '\\text{Points: }(1000, 500),\\ (2000, 1000),\\ (4000, 2000),\\ (6000, 3000)',
            fallback: 'Points: (1000, 500), (2000, 1000), (4000, 2000), (6000, 3000)',
            display: true
          }
        },
        {
          en: 'To read (i) from the graph: locate y = 3250 on the vertical Discount axis, move horizontally right until you meet the line at (6500, 3250), then move straight down to the horizontal Marked Price axis to read x = 6500.',
          ta: 'வரைபடத்திலிருந்து (i) காண: செங்குத்துத் தள்ளுபடி அச்சில் y = 3250-ஐக் கண்டறிந்து, கிடைமட்டமாக வலதுபுறம் நேர்க்கோட்டை (6500, 3250)-இல் சந்தித்து, அங்கிருந்து செங்குத்தாகக் கீழே கிடை அச்சில் x = 6500 எனப் படிக்கவும்.',
          eq: 'y = 3250 -> (6500, 3250) -> x = ₹6500',
          math: {
            latex: 'y = 3250 \\longrightarrow (6500,\\ 3250) \\longrightarrow x = \\text{Rs.\\,}6500',
            fallback: 'y = 3250 -> (6500, 3250) -> x = ₹6500',
            display: true
          }
        }
      ],
      answer: {
        en: '₹6500',
        ta: '₹6500'
      },
      answerMath: {
        latex: '\\boxed{\\text{Rs.\\,}6500}',
        fallback: '₹6500',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q1-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q1(ii)',
        ta: 'பயிற்சி 3.15 · வினா 1(ii)'
      },
      title: {
        en: 'Discount for a ₹2500 marked price (50% flat discount graph)',
        ta: '₹2500 குறித்த விலைக்கான தள்ளுபடி (50% தள்ளுபடி வரைபடம்)'
      },
      q: {
        en: '1. A garment shop announces a flat 50% discount on every purchase of items for their customers. Draw the graph for the relation between the Marked Price and the Discount. Hence find\n(ii) the discount when the marked price is ₹2500',
        ta: '1. ஒரு துணிக்கடையானது தனது வாடிக்கையாளர்களுக்கு வாங்கும் ஒவ்வொரு பொருளின் மீதும் 50 % தள்ளுபடியை அறிவிக்கிறது. குறித்த விலைக்கும் தள்ளுபடிக்குமான வரைபடம் வரைக. மேலும்,\n(ii) குறித்த விலையானது ₹2500 எனில், தள்ளுபடியைக் காண்க.'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q1-discount.svg',
      figureAlt: {
        en: 'Graph of Discount y (vertical axis, ₹) versus Marked Price x (horizontal axis, ₹) for y = x/2. Dashed green reading lines start at x = 2500 on the horizontal axis, rise to (2500, 1250), and move left to y = 1250 on the vertical axis.',
        ta: 'குறித்த விலை x மற்றும் தள்ளுபடி y ஆகியவற்றுக்கான y = x/2 வரைபடம். கிடை அச்சில் x = 2500-இலிருந்து மேலே (2500, 1250)-க்குச் சென்று செங்குத்து அச்சில் y = 1250 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q1: Marked Price (x) vs Discount Amount (y = x/2)',
        ta: 'பயிற்சி 3.15 வினா 1: குறித்த விலை (x) மற்றும் தள்ளுபடி (y = x/2) வரைபடம்'
      },
      steps: [
        {
          en: 'Use the same direct variation line y = (1/2)x, where x is the Marked Price (horizontal axis) and y is the Discount amount (vertical axis).',
          ta: 'அதே y = (1/2)x என்ற நேர் மாறுபாடு நேர்க்கோட்டைப் பயன்படுத்துவோம்; இங்கு x என்பது குறித்த விலை (கிடை அச்சு) மற்றும் y என்பது தள்ளுபடி (செங்குத்து அச்சு).',
          eq: 'y = (1/2)x',
          math: {
            latex: 'y = \\dfrac{1}{2}x',
            fallback: 'y = (1/2)x',
            display: true
          }
        },
        {
          en: 'To read (ii) from the graph: locate x = 2500 on the horizontal Marked Price axis (halfway between 2000 and 3000). Move vertically up to meet the line at (2500, 1250), then move horizontally left to the vertical Discount axis.',
          ta: 'வரைபடத்திலிருந்து (ii) காண: கிடை அச்சில் x = 2500 (2000 மற்றும் 3000-க்கு நடுவே) என்ற இடத்திலிருந்து செங்குத்தாக மேலே நேர்க்கோட்டை (2500, 1250)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் மதிப்பைப் படிக்கவும்.',
          eq: 'x = 2500 -> (2500, 1250) -> y = 1250',
          math: {
            latex: 'x = 2500 \\longrightarrow (2500,\\ 1250) \\longrightarrow y = 1250',
            fallback: 'x = 2500 -> (2500, 1250) -> y = 1250',
            display: true
          }
        },
        {
          en: 'Check algebraically: y = (1/2) × 2500 = 1250. So the discount is ₹1250.',
          ta: 'கணக்கீட்டுச் சரிபார்ப்பு: y = (1/2) × 2500 = 1250. எனவே தள்ளுபடி ₹1250 ஆகும்.',
          eq: 'Discount = ₹1250',
          math: {
            latex: 'y = \\dfrac{1}{2}(2500) = \\text{Rs.\\,}1250',
            fallback: 'Discount = ₹1250',
            display: true
          }
        }
      ],
      answer: {
        en: '₹1250',
        ta: '₹1250'
      },
      answerMath: {
        latex: '\\boxed{\\text{Rs.\\,}1250}',
        fallback: '₹1250',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q2-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q2(i)',
        ta: 'பயிற்சி 3.15 · வினா 2(i)'
      },
      title: {
        en: 'Graph of xy = 24 (x, y > 0): find y when x = 3',
        ta: 'xy = 24, x, y > 0 வரைபடம்: x = 3 எனில் y காண்க'
      },
      q: {
        en: '2. Draw the graph of xy = 24, x, y > 0. Using the graph find,\n(i) y when x = 3',
        ta: '2. xy = 24, x, y > 0 என்ற வரைபடத்தை வரைக. வரைபடத்தைப் பயன்படுத்தி,\n(i) x = 3 எனில் y –ஐக் காண்க'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q2-hyperbola.svg',
      figureAlt: {
        en: 'Positive branch of the rectangular hyperbola xy = 24 in the first quadrant, staying clear of both axes. Dashed red reading lines rise from x = 3 to (3, 8) and go left to y = 8.',
        ta: 'முதல் கால்பகுதியில் உள்ள xy = 24 மிகை அதிபரவளையக் கிளை (அச்சுகளைத் தொடாமல்). x = 3-இலிருந்து மேலே (3, 8)-க்குச் சென்று இடதுபுறம் y = 8 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q2: Positive branch of xy = 24 (x, y > 0)',
        ta: 'பயிற்சி 3.15 வினா 2: xy = 24 (x, y > 0) மிகை கிளை வரைபடம்'
      },
      steps: [
        {
          en: 'Since xy = 24 with x, y > 0, we have y = 24/x in inverse variation. Because x and y are strictly positive, draw only the positive branch in the first quadrant, keeping the curve clear of both axes (it approaches the axes without touching them).',
          ta: 'xy = 24, x, y > 0 என்பதால் y = 24/x என்பது எதிர் மாறுபாடாகும். x, y > 0 என்பதால் முதல் கால்பகுதியில் மட்டும் வரைபடத்தை வரைய வேண்டும்; வளைவரை அச்சுகளைத் தொடாமல் செல்லும்.',
          eq: 'y = 24/x (x > 0, y > 0)',
          math: {
            latex: 'y = \\dfrac{24}{x}, \\quad x > 0,\\ y > 0',
            fallback: 'y = 24/x (x > 0, y > 0)',
            display: true
          }
        },
        {
          en: 'Choose positive factors of 24 to form points: (1, 24), (2, 12), (3, 8), (4, 6), (6, 4), (8, 3), (12, 2). Plot them and join with a smooth curve.',
          ta: '24-ன் மிகைக் காரணிகளைக் கொண்டு புள்ளிகளை அமைப்போம்: (1, 24), (2, 12), (3, 8), (4, 6), (6, 4), (8, 3), (12, 2). இவற்றைக் குறித்து வழுவழுப்பான வளைவரையால் இணைக்கவும்.',
          eq: 'Points: (1, 24), (2, 12), (3, 8), (4, 6), (6, 4), (8, 3), (12, 2)',
          math: {
            latex: '(1,24),\\ (2,12),\\ (3,8),\\ (4,6),\\ (6,4),\\ (8,3),\\ (12,2)',
            fallback: 'Points: (1, 24), (2, 12), (3, 8), (4, 6), (6, 4), (8, 3), (12, 2)',
            display: true
          }
        },
        {
          en: 'To find y when x = 3: start at x = 3 on the horizontal x-axis, move straight up to the curve at (3, 8), and then move horizontally left to the vertical y-axis to read y = 8.',
          ta: 'x = 3 எனில் y காண: கிடை அச்சில் x = 3-இலிருந்து செங்குத்தாக மேலே வளைவரையை (3, 8)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் y = 8 எனப் படிக்கவும்.',
          eq: 'x = 3 -> (3, 8) -> y = 8',
          math: {
            latex: 'x = 3 \\longrightarrow (3,\\ 8) \\longrightarrow y = 8',
            fallback: 'x = 3 -> (3, 8) -> y = 8',
            display: true
          }
        }
      ],
      answer: {
        en: 'y = 8',
        ta: 'y = 8'
      },
      answerMath: {
        latex: '\\boxed{y = 8}',
        fallback: 'y = 8',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q2-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q2(ii)',
        ta: 'பயிற்சி 3.15 · வினா 2(ii)'
      },
      title: {
        en: 'Graph of xy = 24 (x, y > 0): find x when y = 6',
        ta: 'xy = 24, x, y > 0 வரைபடம்: y = 6 எனில் x காண்க'
      },
      q: {
        en: '2. Draw the graph of xy = 24, x, y > 0. Using the graph find,\n(ii) x when y = 6.',
        ta: '2. xy = 24, x, y > 0 என்ற வரைபடத்தை வரைக. வரைபடத்தைப் பயன்படுத்தி,\n(ii) y = 6 எனில் x –ஐக் காண்க.'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q2-hyperbola.svg',
      figureAlt: {
        en: 'Positive branch of xy = 24 in the first quadrant. Dashed green reading lines start at y = 6 on the vertical axis, meet the curve at (4, 6), and drop down to x = 4 on the horizontal axis.',
        ta: 'xy = 24 வரைபடம். செங்குத்து அச்சில் y = 6-இலிருந்து வளைவரையை (4, 6)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 4 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q2: Positive branch of xy = 24 (x, y > 0)',
        ta: 'பயிற்சி 3.15 வினா 2: xy = 24 (x, y > 0) மிகை கிளை வரைபடம்'
      },
      steps: [
        {
          en: 'Use the same positive-branch graph of xy = 24 in the first quadrant (x, y > 0).',
          ta: 'முதல் கால்பகுதியில் உள்ள அதே xy = 24 (x, y > 0) வரைபடத்தைப் பயன்படுத்துவோம்.',
          eq: 'xy = 24 (x, y > 0)',
          math: {
            latex: 'xy = 24 \\quad (x,\\ y > 0)',
            fallback: 'xy = 24 (x, y > 0)',
            display: true
          }
        },
        {
          en: 'To find x when y = 6: locate y = 6 on the vertical y-axis, move horizontally right to meet the curve at (4, 6), and then drop straight down to the horizontal x-axis to read x = 4.',
          ta: 'y = 6 எனில் x காண: செங்குத்து அச்சில் y = 6-இலிருந்து கிடைமட்டமாக வலதுபுறம் வளைவரையை (4, 6)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 4 எனப் படிக்கவும்.',
          eq: 'y = 6 -> (4, 6) -> x = 4',
          math: {
            latex: 'y = 6 \\longrightarrow (4,\\ 6) \\longrightarrow x = 4',
            fallback: 'y = 6 -> (4, 6) -> x = 4',
            display: true
          }
        },
        {
          en: 'Check: 4 × 6 = 24, confirming x = 4.',
          ta: 'சரிபார்ப்பு: 4 × 6 = 24. எனவே x = 4.',
          eq: 'x = 24/6 = 4',
          math: {
            latex: 'x = \\dfrac{24}{6} = 4',
            fallback: 'x = 24/6 = 4',
            display: true
          }
        }
      ],
      answer: {
        en: 'x = 4',
        ta: 'x = 4'
      },
      answerMath: {
        latex: '\\boxed{x = 4}',
        fallback: 'x = 4',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q3-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q3(i)',
        ta: 'பயிற்சி 3.15 · வினா 3(i)'
      },
      title: {
        en: 'Linear function y = (1/2)x: constant of variation and y when x = 9',
        ta: 'y = (1/2)x நேரிய சார்பு: விகிதசம மாறிலி மற்றும் x = 9 எனில் y'
      },
      q: {
        en: '3. Graph the following linear function y = (1/2)x. Identify the constant of variation and verify it with the graph. Also (i) find y when x = 9',
        ta: '3. y = (1/2)x என்ற நேரிய சமன்பாட்டின் / சார்பின் வரைபடம் வரைக. விகிதசம மாறிலியை அடையாளம் கண்டு, அதனை வரைபடத்துடன் சரிபார்க்க. மேலும், (i) x = 9 எனில் y ஐக் காண்க.'
      },
      questionMath: {
        en: [
          '3. Graph the following linear function ',
          { latex: 'y = \\dfrac{1}{2}x', fallback: 'y = (1/2)x', display: false },
          '. Identify the constant of variation and verify it with the graph. Also (i) find ',
          { latex: 'y', fallback: 'y', display: false },
          ' when ',
          { latex: 'x = 9', fallback: 'x = 9', display: false }
        ],
        ta: [
          '3. ',
          { latex: 'y = \\dfrac{1}{2}x', fallback: 'y = (1/2)x', display: false },
          ' என்ற நேரிய சமன்பாட்டின் / சார்பின் வரைபடம் வரைக. விகிதசம மாறிலியை அடையாளம் கண்டு, அதனை வரைபடத்துடன் சரிபார்க்க. மேலும், (i) ',
          { latex: 'x = 9', fallback: 'x = 9', display: false },
          ' எனில் ',
          { latex: 'y', fallback: 'y', display: false },
          ' ஐக் காண்க.'
        ]
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q3-linear.svg',
      figureAlt: {
        en: 'Straight line y = (1/2)x through the origin with plotted points (2,1), (4,2), (6,3), (12,6) verifying k = y/x = 1/2. Dashed red reading lines rise from x = 9 to (9, 4.5) and go left to y = 4.5.',
        ta: 'ஆதிப்புள்ளி வழிச் செல்லும் y = (1/2)x நேர்க்கோடு. (2,1), (4,2), (6,3) புள்ளிகள் k = 1/2 என்பதைச் சரிபார்க்கின்றன. x = 9-இலிருந்து (9, 4.5) வழியாக y = 4.5 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q3: Linear function y = (1/2)x with constant k = 1/2',
        ta: 'பயிற்சி 3.15 வினா 3: y = (1/2)x நேரிய சார்பு (விகிதசம மாறிலி k = 1/2)'
      },
      steps: [
        {
          en: 'The equation y = (1/2)x has the direct variation form y = kx, so the constant of variation is k = 1/2.',
          ta: 'y = (1/2)x என்பது y = kx என்ற நேர் மாறுபாட்டு வடிவில் உள்ளது. எனவே விகிதசம மாறிலி k = 1/2 ஆகும்.',
          eq: 'k = 1/2',
          math: {
            latex: 'y = kx \\quad \\text{with} \\quad k = \\dfrac{1}{2}',
            fallback: 'k = 1/2',
            display: true
          }
        },
        {
          en: 'Plot points for y = (1/2)x: (2, 1), (4, 2), (6, 3), (8, 4), (12, 6). Verify k from any nonzero plotted point on the line: y/x = 1/2 = 2/4 = 3/6 = 6/12 = 1/2.',
          ta: 'y = (1/2)x-க்கான புள்ளிகள்: (2, 1), (4, 2), (6, 3), (8, 4), (12, 6). கோட்டின் மீதுள்ள எந்தப் புள்ளியிலிருந்தும் y/x = 1/2 = 2/4 = 3/6 = 1/2 எனச் சரிபார்க்கலாம்.',
          eq: 'k = 1/2 = 2/4 = 3/6 = 6/12 = 1/2',
          math: {
            latex: 'k = \\dfrac{y}{x} = \\dfrac{1}{2} = \\dfrac{2}{4} = \\dfrac{3}{6} = \\dfrac{6}{12} = \\dfrac{1}{2}',
            fallback: 'k = 1/2 = 2/4 = 3/6 = 6/12 = 1/2',
            display: true
          }
        },
        {
          en: 'To read (i) from the graph: locate x = 9 on the horizontal axis (midway between 8 and 10), move vertically up to meet the line at (9, 4.5), and move horizontally left to read y = 4.5 on the vertical axis.',
          ta: 'வரைபடத்திலிருந்து (i) காண: கிடை அச்சில் x = 9-இலிருந்து செங்குத்தாக மேலே கோட்டை (9, 4.5)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் y = 4.5 எனப் படிக்கவும்.',
          eq: 'x = 9 -> (9, 4.5) -> y = 4.5',
          math: {
            latex: 'x = 9 \\longrightarrow (9,\\ 4.5) \\longrightarrow y = 4.5',
            fallback: 'x = 9 -> (9, 4.5) -> y = 4.5',
            display: true
          }
        }
      ],
      answer: {
        en: 'k = 1/2; y = 4.5',
        ta: 'k = 1/2; y = 4.5'
      },
      answerMath: {
        latex: '\\boxed{k = \\dfrac{1}{2},\\quad y = 4.5}',
        fallback: 'k = 1/2; y = 4.5',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q3-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q3(ii)',
        ta: 'பயிற்சி 3.15 · வினா 3(ii)'
      },
      title: {
        en: 'Linear function y = (1/2)x: find x when y = 7.5',
        ta: 'y = (1/2)x நேரிய சார்பு: y = 7.5 எனில் x காண்க'
      },
      q: {
        en: '3. Graph the following linear function y = (1/2)x. Identify the constant of variation and verify it with the graph. Also (ii) find x when y = 7.5.',
        ta: '3. y = (1/2)x என்ற நேரிய சமன்பாட்டின் / சார்பின் வரைபடம் வரைக. விகிதசம மாறிலியை அடையாளம் கண்டு, அதனை வரைபடத்துடன் சரிபார்க்க. மேலும், (ii) y = 7.5 எனில் x ஐக் காண்க.'
      },
      questionMath: {
        en: [
          '3. Graph the following linear function ',
          { latex: 'y = \\dfrac{1}{2}x', fallback: 'y = (1/2)x', display: false },
          '. Identify the constant of variation and verify it with the graph. Also (ii) find ',
          { latex: 'x', fallback: 'x', display: false },
          ' when ',
          { latex: 'y = 7.5', fallback: 'y = 7.5', display: false },
          '.'
        ],
        ta: [
          '3. ',
          { latex: 'y = \\dfrac{1}{2}x', fallback: 'y = (1/2)x', display: false },
          ' என்ற நேரிய சமன்பாட்டின் / சார்பின் வரைபடம் வரைக. விகிதசம மாறிலியை அடையாளம் கண்டு, அதனை வரைபடத்துடன் சரிபார்க்க. மேலும், (ii) ',
          { latex: 'y = 7.5', fallback: 'y = 7.5', display: false },
          ' எனில் ',
          { latex: 'x', fallback: 'x', display: false },
          ' ஐக் காண்க.'
        ]
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q3-linear.svg',
      figureAlt: {
        en: 'Straight line y = (1/2)x through the origin. Dashed green reading lines start at y = 7.5 on the vertical axis, meet the line at (15, 7.5), and drop down to x = 15 on the horizontal axis.',
        ta: 'y = (1/2)x நேர்க்கோடு. செங்குத்து அச்சில் y = 7.5-இலிருந்து கோட்டை (15, 7.5)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 15 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q3: Linear function y = (1/2)x with constant k = 1/2',
        ta: 'பயிற்சி 3.15 வினா 3: y = (1/2)x நேரிய சார்பு (விகிதசம மாறிலி k = 1/2)'
      },
      steps: [
        {
          en: 'Use the same linear graph y = (1/2)x with constant of variation k = y/x = 1/2 (verified by points such as (6, 3) and (12, 6)).',
          ta: 'k = y/x = 1/2 என்ற விகிதசம மாறிலி கொண்ட அதே y = (1/2)x நேர்க்கோட்டு வரைபடத்தைப் பயன்படுத்துவோம்.',
          eq: 'y = (1/2)x, k = 1/2',
          math: {
            latex: 'y = \\dfrac{1}{2}x,\\quad k = \\dfrac{1}{2}',
            fallback: 'y = (1/2)x, k = 1/2',
            display: true
          }
        },
        {
          en: 'To read (ii) from the graph: locate y = 7.5 on the vertical axis (midway between 7 and 8), move horizontally right to meet the line at (15, 7.5), and drop vertically down to the horizontal axis to read x = 15.',
          ta: 'வரைபடத்திலிருந்து (ii) காண: செங்குத்து அச்சில் y = 7.5 (7 மற்றும் 8-க்கு நடுவே) என்ற புள்ளியிலிருந்து கிடைமட்டமாக வலதுபுறம் கோட்டை (15, 7.5)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 15 எனப் படிக்கவும்.',
          eq: 'y = 7.5 -> (15, 7.5) -> x = 15',
          math: {
            latex: 'y = 7.5 \\longrightarrow (15,\\ 7.5) \\longrightarrow x = 15',
            fallback: 'y = 7.5 -> (15, 7.5) -> x = 15',
            display: true
          }
        },
        {
          en: 'Verify algebraically: 7.5 = (1/2)x gives x = 2 × 7.5 = 15.',
          ta: 'சரிபார்ப்பு: 7.5 = (1/2)x என்பதால் x = 2 × 7.5 = 15.',
          eq: 'x = 2 × 7.5 = 15',
          math: {
            latex: 'x = 2 \\times 7.5 = 15',
            fallback: 'x = 2 × 7.5 = 15',
            display: true
          }
        }
      ],
      answer: {
        en: 'x = 15',
        ta: 'x = 15'
      },
      answerMath: {
        latex: '\\boxed{x = 15}',
        fallback: 'x = 15',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q4-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q4(i)',
        ta: 'பயிற்சி 3.15 · வினா 4(i)'
      },
      title: {
        en: 'Pipes and time: time taken when 5 pipes are used',
        ta: 'குழாய்களும் நேரமும்: 5 குழாய்கள் எடுத்துக் கொள்ளும் நேரம்'
      },
      q: {
        en: '4. The following table shows the data about the number of pipes and the time taken to fill the same tank.\nDraw the graph for the above data and hence\n(i) find the time taken to fill the tank when five pipes are used',
        ta: '4. ஒரு தொட்டியை நிரப்பத் தேவையான குழாய்களின் எண்ணிக்கையும் அவை எடுத்துக் கொள்ளும் நேரமும் பின்வரும் அட்டவணையில் கொடுக்கப்பட்டுள்ளது.\nமேற்கண்ட தரவுகளுக்கு வரைபடம் வரைந்து,\n(i) 5 குழாய்களை பயன்படுத்தினால், தொட்டி நிரம்ப எடுத்துக் கொள்ளப்பட்ட நேரத்தைக் காண்க.'
      },
      dataTable: {
        headers: ['No. of pipes (x)', '2', '3', '6', '9'],
        rows: [['Time Taken (in min) (y)', '45', '30', '15', '10']],
        caption: 'Exercise 3.15 Q4: Number of pipes (x) and time taken in minutes (y)',
        replaceRegex: '(?=Draw the graph for the above data)',
        ta: {
          headers: ['குழாய்களின் எண்ணிக்கை (x)', '2', '3', '6', '9'],
          rows: [['எடுத்துக் கொள்ளும் நேரம் (y) நிமிடங்களில்', '45', '30', '15', '10']],
          caption: 'பயிற்சி 3.15 வினா 4: குழாய்களின் எண்ணிக்கை (x) மற்றும் நேரம் (y)'
        },
        replaceRegexTa: '(?=மேற்கண்ட தரவுகளுக்கு வரைபடம்)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q4-pipes.svg',
      figureAlt: {
        en: 'Graph of pipes x versus time y (min) with solid dots at integer pipe counts (2,45), (3,30), (6,15), (9,10) and dashed inverse guide curve xy = 90. Red reading lines rise from x = 5 to (5, 18) and go left to y = 18 min.',
        ta: 'குழாய்கள் x மற்றும் நேரம் y (நிமிடங்கள்) வரைபடம். முழு எண் குழாய்களுக்கான புள்ளிகளும் xy = 90 வழிகாட்டி வளைவரையும் உள்ளன. x = 5-இலிருந்து (5, 18) வழியாக y = 18 நிமிடங்கள் எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q4: Pipes (x) vs Time (y), inverse variation xy = 90',
        ta: 'பயிற்சி 3.15 வினா 4: குழாய்கள் (x) மற்றும் நேரம் (y), எதிர் மாறுபாடு xy = 90'
      },
      steps: [
        {
          en: 'From the table, as the number of pipes x increases, the time y decreases, and the product xy is constant: 2 × 45 = 3 × 30 = 6 × 15 = 9 × 10 = 90. This is inverse variation with xy = 90.',
          ta: 'அட்டவணையிலிருந்து x அதிகரிக்க y குறைகிறது; மேலும் xy மாறிலியாக உள்ளது: 2 × 45 = 3 × 30 = 6 × 15 = 9 × 10 = 90. இது xy = 90 என்ற எதிர் மாறுபாடு ஆகும்.',
          eq: 'xy = 2 × 45 = 3 × 30 = 6 × 15 = 9 × 10 = 90',
          math: {
            latex: 'xy = 2\\times 45 = 3\\times 30 = 6\\times 15 = 9\\times 10 = 90',
            fallback: 'xy = 2 × 45 = 3 × 30 = 6 × 15 = 9 × 10 = 90',
            display: true
          }
        },
        {
          en: 'Plot the table points (2, 45), (3, 30), (6, 15), (9, 10) as solid dots (physically meaningful whole-number pipe counts), and draw a smooth dashed guide curve for xy = 90 to read intermediate values.',
          ta: 'அட்டவணைப் புள்ளிகள் (2, 45), (3, 30), (6, 15), (9, 10) ஆகியவற்றை முழு எண் குழாய் எண்ணிக்கைகளாகக் குறித்து, இடைமதிப்புகளைப் படிக்க xy = 90 வளைவரையை வழிகாட்டியாக வரைக.',
          eq: 'Points: (2, 45), (3, 30), (6, 15), (9, 10)',
          math: {
            latex: '(2,45),\\ (3,30),\\ (6,15),\\ (9,10)',
            fallback: 'Points: (2, 45), (3, 30), (6, 15), (9, 10)',
            display: true
          }
        },
        {
          en: 'To read (i) from the graph: locate x = 5 on the horizontal pipes axis (midway between 4 and 6), move vertically up to the curve at (5, 18), and move horizontally left to the vertical time axis to read y = 18 minutes.',
          ta: 'வரைபடத்திலிருந்து (i) காண: கிடை அச்சில் x = 5 (4 மற்றும் 6-க்கு நடுவே) என்ற இடத்திலிருந்து செங்குத்தாக மேலே வளைவரையை (5, 18)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் y = 18 நிமிடங்கள் எனப் படிக்கவும்.',
          eq: 'x = 5 -> (5, 18) -> y = 18 minutes',
          math: {
            latex: 'x = 5 \\longrightarrow (5,\\ 18) \\longrightarrow y = 18\\text{ minutes}',
            fallback: 'x = 5 -> (5, 18) -> y = 18 minutes',
            display: true
          }
        }
      ],
      answer: {
        en: 'y = 18 minutes',
        ta: 'y = 18 நிமிடங்கள்'
      },
      answerMath: {
        en: {
          latex: '\\boxed{y = 18\\text{ minutes}}',
          fallback: 'y = 18 minutes',
          display: true
        },
        ta: {
          latex: '\\boxed{y = 18\\text{ நிமிடங்கள்}}',
          fallback: 'y = 18 நிமிடங்கள்',
          display: true
        }
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q4-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q4(ii)',
        ta: 'பயிற்சி 3.15 · வினா 4(ii)'
      },
      title: {
        en: 'Pipes and time: number of pipes when time is 9 minutes',
        ta: 'குழாய்களும் நேரமும்: 9 நிமிடங்களில் நிரப்பத் தேவையான குழாய்கள்'
      },
      q: {
        en: '4. The following table shows the data about the number of pipes and the time taken to fill the same tank.\nDraw the graph for the above data and hence\n(ii) Find the number of pipes when the time is 9 minutes.',
        ta: '4. ஒரு தொட்டியை நிரப்பத் தேவையான குழாய்களின் எண்ணிக்கையும் அவை எடுத்துக் கொள்ளும் நேரமும் பின்வரும் அட்டவணையில் கொடுக்கப்பட்டுள்ளது.\nமேற்கண்ட தரவுகளுக்கு வரைபடம் வரைந்து,\n(ii) 9 நிமிடங்களில் தொட்டி நிரம்பினால், பயன்படுத்தப்பட்ட குழாய்களின் எண்ணிக்கையைக் காண்க.'
      },
      dataTable: {
        headers: ['No. of pipes (x)', '2', '3', '6', '9'],
        rows: [['Time Taken (in min) (y)', '45', '30', '15', '10']],
        caption: 'Exercise 3.15 Q4: Number of pipes (x) and time taken in minutes (y)',
        replaceRegex: '(?=Draw the graph for the above data)',
        ta: {
          headers: ['குழாய்களின் எண்ணிக்கை (x)', '2', '3', '6', '9'],
          rows: [['எடுத்துக் கொள்ளும் நேரம் (y) நிமிடங்களில்', '45', '30', '15', '10']],
          caption: 'பயிற்சி 3.15 வினா 4: குழாய்களின் எண்ணிக்கை (x) மற்றும் நேரம் (y)'
        },
        replaceRegexTa: '(?=மேற்கண்ட தரவுகளுக்கு வரைபடம்)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q4-pipes.svg',
      figureAlt: {
        en: 'Graph of pipes x versus time y (min) for xy = 90. Dashed green reading lines start at y = 9 on the vertical axis, meet the curve at (10, 9), and drop down to x = 10 on the horizontal axis.',
        ta: 'xy = 90 குழாய்கள் மற்றும் நேரம் வரைபடம். செங்குத்து அச்சில் y = 9-இலிருந்து (10, 9) வழியாகக் கிடை அச்சில் x = 10 குழாய்கள் எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q4: Pipes (x) vs Time (y), inverse variation xy = 90',
        ta: 'பயிற்சி 3.15 வினா 4: குழாய்கள் (x) மற்றும் நேரம் (y), எதிர் மாறுபாடு xy = 90'
      },
      steps: [
        {
          en: 'Use the same inverse variation graph xy = 90 where x is the whole-number pipe count and y is the time in minutes.',
          ta: 'அதே xy = 90 என்ற எதிர் மாறுபாடு வரைபடத்தைப் பயன்படுத்துவோம்; x என்பது குழாய்களின் முழு எண் எண்ணிக்கை மற்றும் y என்பது நிமிடங்கள் ஆகும்.',
          eq: 'xy = 90',
          math: {
            latex: 'xy = 90',
            fallback: 'xy = 90',
            display: true
          }
        },
        {
          en: 'To read (ii) from the graph: locate y = 9 on the vertical time axis (just below 10), move horizontally right to meet the curve at (10, 9), and drop straight down to the horizontal axis to read x = 10 pipes.',
          ta: 'வரைபடத்திலிருந்து (ii) காண: செங்குத்து அச்சில் y = 9-இலிருந்து கிடைமட்டமாக வலதுபுறம் வளைவரையை (10, 9)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 10 குழாய்கள் எனப் படிக்கவும்.',
          eq: 'y = 9 -> (10, 9) -> x = 10 pipes',
          math: {
            latex: 'y = 9 \\longrightarrow (10,\\ 9) \\longrightarrow x = 10\\text{ pipes}',
            fallback: 'y = 9 -> (10, 9) -> x = 10 pipes',
            display: true
          }
        },
        {
          en: 'Check: 10 × 9 = 90, and 10 is a physically meaningful whole number of pipes.',
          ta: 'சரிபார்ப்பு: 10 × 9 = 90; மேலும் 10 என்பது முழு எண் குழாய்களின் எண்ணிக்கையாகும்.',
          eq: 'x = 90/9 = 10 pipes',
          math: {
            latex: 'x = \\dfrac{90}{9} = 10\\text{ pipes}',
            fallback: 'x = 90/9 = 10 pipes',
            display: true
          }
        }
      ],
      answer: {
        en: '10 pipes',
        ta: '10 குழாய்கள்'
      },
      answerMath: {
        en: {
          latex: '\\boxed{10\\text{ pipes}}',
          fallback: '10 pipes',
          display: true
        },
        ta: {
          latex: '\\boxed{10\\text{ குழாய்கள்}}',
          fallback: '10 குழாய்கள்',
          display: true
        }
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q5-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q5(i)',
        ta: 'பயிற்சி 3.15 · வினா 5(i)'
      },
      title: {
        en: 'Equal prize shares: find the constant of variation',
        ta: 'சமமாகப் பிரிக்கும் பரிசுத் தொகை: விகிதசம மாறிலி காண்க'
      },
      q: {
        en: '5. A school announces that for a certain competitions, the cash price will be distributed for all the participants equally as show below\n(i) Find the constant of variation.',
        ta: '5. ஒரு பள்ளியானது, குறிப்பிட்ட சில போட்டிகளுக்கு, பரிசுத் தொகையினை எல்லா பங்கேற்பாளர்களுக்கும் பின்வருமாறு சமமாக பிரித்து வழங்குவதாக அறிவிக்கிறது.\n(i) விகிதசம மாறிலியைக் காண்க.'
      },
      dataTable: {
        headers: ['No. of participants (x)', '2', '4', '6', '8', '10'],
        rows: [['Amount for each participant in ₹ (y)', '180', '90', '60', '45', '36']],
        caption: 'Exercise 3.15 Q5: Participants (x) and amount per participant in ₹ (y)',
        replaceRegex: '(?=\\(i\\) Find the constant)',
        ta: {
          headers: ['பங்கேற்பாளர்களின் எண்ணிக்கை (x)', '2', '4', '6', '8', '10'],
          rows: [['ஒவ்வொரு பங்கேற்பாளரின் தொகை ₹ (y)', '180', '90', '60', '45', '36']],
          caption: 'பயிற்சி 3.15 வினா 5: பங்கேற்பாளர்கள் (x) மற்றும் தொகை ₹ (y)'
        },
        replaceRegexTa: '(?=\\(i\\) விகிதசம மாறிலியைக்)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q5-shares.svg',
      figureAlt: {
        en: 'Inverse variation graph xy = 360 showing whole-number participant counts (2,180), (4,90), (6,60), (8,45), (10,36) and (12,30).',
        ta: 'xy = 360 எதிர் மாறுபாடு வரைபடம்: பங்கேற்பாளர்கள் x மற்றும் தொகை y புள்ளிகள் (2,180), (4,90), (6,60), (8,45), (10,36), (12,30) காட்டப்பட்டுள்ளன.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q5: Participants (x) vs Share per Participant (y), xy = 360',
        ta: 'பயிற்சி 3.15 வினா 5: பங்கேற்பாளர்கள் (x) மற்றும் பங்குத் தொகை (y), xy = 360'
      },
      steps: [
        {
          en: 'From the table, as the number of participants x increases, each participant’s share y decreases. This indicates inverse variation, where xy = k (the fixed total cash prize pool).',
          ta: 'அட்டவணையிலிருந்து பங்கேற்பாளர்களின் எண்ணிக்கை x அதிகரிக்க, ஒவ்வொருவரின் தொகை y குறைகிறது. எனவே இது எதிர் மாறுபாடு (xy = k, மொத்தப் பரிசுத் தொகை) ஆகும்.',
          eq: 'xy = k',
          math: {
            latex: 'xy = k',
            fallback: 'xy = k',
            display: true
          }
        },
        {
          en: 'Compute the product xy for every column in the supplied table to verify that the prize total is constant.',
          ta: 'அட்டவணையின் ஒவ்வொரு நெடுவரிசைக்கும் xy பெருக்கற்பலனைக் கணக்கிட்டு மொத்தப் பரிசுத் தொகை மாறிலி என்பதைச் சரிபார்ப்போம்.',
          eq: 'k = 2×180 = 4×90 = 6×60 = 8×45 = 10×36 = 360',
          math: {
            latex: '\\begin{aligned} k &= 2 \\times 180 = 360 \\\\ &= 4 \\times 90 = 6 \\times 60 = 8 \\times 45 = 10 \\times 36 = 360 \\end{aligned}',
            fallback: 'k = 2×180 = 4×90 = 6×60 = 8×45 = 10×36 = 360',
            display: true
          }
        },
        {
          en: 'Hence the constant of variation is k = 360 (the total prize pool is ₹360).',
          ta: 'எனவே விகிதசம மாறிலி k = 360 (மொத்தப் பரிசுத் தொகை ₹360) ஆகும்.',
          eq: 'k = 360',
          math: {
            latex: 'k = 360',
            fallback: 'k = 360',
            display: true
          }
        }
      ],
      answer: {
        en: '360',
        ta: '360'
      },
      answerMath: {
        latex: '\\boxed{360}',
        fallback: '360',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q5-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q5(ii)',
        ta: 'பயிற்சி 3.15 · வினா 5(ii)'
      },
      title: {
        en: 'Equal prize shares: share for each of 12 participants',
        ta: 'சமமாகப் பிரிக்கும் பரிசுத் தொகை: 12 பங்கேற்பாளர்களில் ஒவ்வொருவரின் தொகை'
      },
      q: {
        en: '5. A school announces that for a certain competitions, the cash price will be distributed for all the participants equally as show below\n(ii) Graph the above data and hence, find how much will each participant get if the number of participants are 12.',
        ta: '5. ஒரு பள்ளியானது, குறிப்பிட்ட சில போட்டிகளுக்கு, பரிசுத் தொகையினை எல்லா பங்கேற்பாளர்களுக்கும் பின்வருமாறு சமமாக பிரித்து வழங்குவதாக அறிவிக்கிறது.\n(ii) மேற்கண்ட தரவுகளுக்கு வரைபடம் வரைந்து, 12 பங்கேற்பாளர்கள் பங்கெடுத்துக் கொண்டால் ஒவ்வொரு பங்கேற்பாளரும் பெறும் பரிசுத் தொகை எவ்வளவு என்பதைக் காண்க.'
      },
      dataTable: {
        headers: ['No. of participants (x)', '2', '4', '6', '8', '10'],
        rows: [['Amount for each participant in ₹ (y)', '180', '90', '60', '45', '36']],
        caption: 'Exercise 3.15 Q5: Participants (x) and amount per participant in ₹ (y)',
        replaceRegex: '(?=\\(ii\\) Graph the above)',
        ta: {
          headers: ['பங்கேற்பாளர்களின் எண்ணிக்கை (x)', '2', '4', '6', '8', '10'],
          rows: [['ஒவ்வொரு பங்கேற்பாளரின் தொகை ₹ (y)', '180', '90', '60', '45', '36']],
          caption: 'பயிற்சி 3.15 வினா 5: பங்கேற்பாளர்கள் (x) மற்றும் தொகை ₹ (y)'
        },
        replaceRegexTa: '(?=\\(ii\\) மேற்கண்ட தரவுகளுக்கு)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q5-shares.svg',
      figureAlt: {
        en: 'Inverse variation graph xy = 360. Solid dots mark whole-number participant counts; dashed green reading lines rise from x = 12 to (12, 30) and go left to y = 30 on the vertical rupee axis.',
        ta: 'xy = 360 வரைபடம். கிடை அச்சில் x = 12-இலிருந்து மேலே (12, 30)-க்குச் சென்று இடதுபுறம் செங்குத்து அச்சில் y = ₹30 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q5: Participants (x) vs Share per Participant (y), xy = 360',
        ta: 'பயிற்சி 3.15 வினா 5: பங்கேற்பாளர்கள் (x) மற்றும் பங்குத் தொகை (y), xy = 360'
      },
      steps: [
        {
          en: 'Plot the table points (2, 180), (4, 90), (6, 60), (8, 45), (10, 36) as solid dots representing whole-number participant counts, and draw the dashed inverse curve xy = 360 as a reading guide.',
          ta: 'அட்டவணைப் புள்ளிகள் (2, 180), (4, 90), (6, 60), (8, 45), (10, 36) ஆகியவற்றை முழு எண் பங்கேற்பாளர் புள்ளிகளாகக் குறித்து, xy = 360 வழிகாட்டி வளைவரையை வரைக.',
          eq: 'xy = 360',
          math: {
            latex: 'xy = 360',
            fallback: 'xy = 360',
            display: true
          }
        },
        {
          en: 'To read (ii) from the graph: locate x = 12 on the horizontal participants axis, move vertically up to meet the curve at (12, 30), and move horizontally left to the vertical rupee axis to read y = 30.',
          ta: 'வரைபடத்திலிருந்து (ii) காண: கிடை அச்சில் x = 12-இலிருந்து செங்குத்தாக மேலே வளைவரையை (12, 30)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் y = 30 எனப் படிக்கவும்.',
          eq: 'x = 12 -> (12, 30) -> y = ₹30',
          math: {
            latex: 'x = 12 \\longrightarrow (12,\\ 30) \\longrightarrow y = \\text{Rs.\\,}30',
            fallback: 'x = 12 -> (12, 30) -> y = ₹30',
            display: true
          }
        },
        {
          en: 'Verify: y = 360 / 12 = 30. Each participant gets ₹30.',
          ta: 'சரிபார்ப்பு: y = 360 / 12 = 30. ஒவ்வொரு பங்கேற்பாளரும் ₹30 பெறுவர்.',
          eq: 'y = 360/12 = ₹30',
          math: {
            latex: 'y = \\dfrac{360}{12} = \\text{Rs.\\,}30',
            fallback: 'y = 360/12 = ₹30',
            display: true
          }
        }
      ],
      answer: {
        en: '₹30',
        ta: '₹30'
      },
      answerMath: {
        latex: '\\boxed{\\text{Rs.\\,}30}',
        fallback: '₹30',
        display: true
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q6-i',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q6(i)',
        ta: 'பயிற்சி 3.15 · வினா 6(i)'
      },
      title: {
        en: 'Parking charges: variation check and amount for 6 hours',
        ta: 'வாகன நிறுத்தக் கட்டணம்: மாறுபாடு மற்றும் 6 மணி நேரக் கட்டணம்'
      },
      q: {
        en: '6. A two wheeler parking zone near bus stand charges as below.\nCheck if the amount charged are in direct variation or in inverse variation to the parking time. Graph the data. Also (i) find the amount to be paid when parking time is 6 hr',
        ta: '6. பேருந்து நிலையம் அருகே உள்ள இரு சக்கர வாகனம் நிறுத்துமிடத்தில் பெறப்படும் கட்டணத் தொகை பின்வருமாறு.\nபெறப்படும் கட்டணத் தொகையானது வாகனம் நிறுத்தப்படும் நேரத்திற்கு நேர் மாறுபாட்டில் உள்ளதா அல்லது எதிர் மாறுபாட்டில் உள்ளதா என ஆராய்க. கொடுக்கப்பட்ட தரவுகளை வரைபடத்தில் குறிக்கவும். மேலும், (i) நிறுத்தப்படும் நேரம் 6 மணி எனில், கட்டணத் தொகையைக் காண்க.'
      },
      dataTable: {
        headers: ['Time (in hours) (x)', '4', '8', '12', '24'],
        rows: [['Amount ₹ (y)', '60', '120', '180', '360']],
        caption: 'Exercise 3.15 Q6: Parking time in hours (x) and amount in ₹ (y)',
        replaceRegex: '(?=Check if the amount)',
        ta: {
          headers: ['நேரம் (மணியில்)(x)', '4', '8', '12', '24'],
          rows: [['கட்டணத் தொகை ₹ (y)', '60', '120', '180', '360']],
          caption: 'பயிற்சி 3.15 வினா 6: நேரம் (மணியில்) (x) மற்றும் கட்டணத் தொகை ₹ (y)'
        },
        replaceRegexTa: '(?=பெறப்படும் கட்டணத் தொகையானது)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q6-parking.svg',
      figureAlt: {
        en: 'Direct variation line y = 15x (₹15/hr) through (4,60), (8,120), (12,180), (24,360). Dashed red reading lines rise from x = 6 to (6, 90) and go left to y = ₹90.',
        ta: 'y = 15x நேர் மாறுபாடு நேர்க்கோடு. x = 6 மணியிலிருந்து மேலே (6, 90)-க்குச் சென்று இடதுபுறம் y = ₹90 எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q6: Parking Time (x) vs Charge (y), direct variation y = 15x',
        ta: 'பயிற்சி 3.15 வினா 6: நேரம் (x) மற்றும் கட்டணம் (y), நேர் மாறுபாடு y = 15x'
      },
      steps: [
        {
          en: 'Compute the ratio y/x (rate per hour) for each column in the table: 60/4 = 15, 120/8 = 15, 180/12 = 15, 360/24 = 15. Since y/x = 15 is constant (₹15 per hour), the amount charged is in direct variation with parking time: y = 15x.',
          ta: 'ஒவ்வொரு நெடுவரிசைக்கும் y/x (மணி நேரக் கட்டணம்) காண்போம்: 60/4 = 15, 120/8 = 15, 180/12 = 15, 360/24 = 15. விகிதம் y/x = 15 (மணிக்கு ₹15) மாறிலி என்பதால் இது நேர் மாறுபாடு (y = 15x) ஆகும்.',
          eq: 'y/x = 60/4 = 120/8 = 180/12 = 360/24 = 15 => y = 15x',
          math: {
            latex: '\\dfrac{y}{x} = \\dfrac{60}{4} = \\dfrac{120}{8} = \\dfrac{180}{12} = \\dfrac{360}{24} = 15 \\quad (y = 15x)',
            fallback: 'y/x = 60/4 = 120/8 = 180/12 = 360/24 = 15 => y = 15x',
            display: true
          }
        },
        {
          en: 'Plot the points (4, 60), (8, 120), (12, 180), (24, 360) and join them with a straight line passing through the origin.',
          ta: '(4, 60), (8, 120), (12, 180), (24, 360) புள்ளிகளைக் குறித்து ஆதிப்புள்ளி வழிச் செல்லும் நேர்க்கோடு வரைக.',
          eq: 'Points: (4, 60), (8, 120), (12, 180), (24, 360)',
          math: {
            latex: '(4,60),\\ (8,120),\\ (12,180),\\ (24,360)',
            fallback: 'Points: (4, 60), (8, 120), (12, 180), (24, 360)',
            display: true
          }
        },
        {
          en: 'To read (i) from the graph: locate x = 6 hr on the horizontal time axis (midway between 4 and 8), move vertically up to meet the line at (6, 90), and move horizontally left to the vertical rupee axis to read y = ₹90.',
          ta: 'வரைபடத்திலிருந்து (i) காண: கிடை அச்சில் x = 6 (4 மற்றும் 8-க்கு நடுவே) என்ற இடத்திலிருந்து செங்குத்தாக மேலே கோட்டை (6, 90)-இல் சந்தித்து, இடதுபுறம் செங்குத்து அச்சில் y = ₹90 எனப் படிக்கவும்.',
          eq: 'x = 6 hr -> (6, 90) -> y = ₹90',
          math: {
            latex: 'x = 6\\text{ hr} \\longrightarrow (6,\\ 90) \\longrightarrow y = \\text{Rs.\\,}90',
            fallback: 'x = 6 hr -> (6, 90) -> y = ₹90',
            display: true
          }
        }
      ],
      answer: {
        en: 'Direct variation; ₹90',
        ta: 'நேர் மாறுபாடு; ₹90'
      },
      answerMath: {
        en: {
          latex: '\\boxed{\\text{Direct variation};\\ \\text{Rs.\\,}90}',
          fallback: 'Direct variation; ₹90',
          display: true
        },
        ta: {
          latex: '\\boxed{\\text{நேர் மாறுபாடு};\\ \\text{Rs.\\,}90}',
          fallback: 'நேர் மாறுபாடு; ₹90',
          display: true
        }
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    },
    {
      id: 'c10-3-ex3-15-q6-ii',
      classNum: 10,
      chapter: '3',
      exercise: '3.15',
      topic: TOPIC,
      label: {
        en: 'Exercise 3.15 · Q6(ii)',
        ta: 'பயிற்சி 3.15 · வினா 6(ii)'
      },
      title: {
        en: 'Parking charges: parking duration when amount paid is ₹150',
        ta: 'வாகன நிறுத்தக் கட்டணம்: ₹150 கட்டணத்திற்கான நிறுத்தப்பட்ட நேரம்'
      },
      q: {
        en: '6. A two wheeler parking zone near bus stand charges as below.\nCheck if the amount charged are in direct variation or in inverse variation to the parking time. Graph the data. Also (ii) find the parking duration when the amount paid is ₹150.',
        ta: '6. பேருந்து நிலையம் அருகே உள்ள இரு சக்கர வாகனம் நிறுத்துமிடத்தில் பெறப்படும் கட்டணத் தொகை பின்வருமாறு.\nபெறப்படும் கட்டணத் தொகையானது வாகனம் நிறுத்தப்படும் நேரத்திற்கு நேர் மாறுபாட்டில் உள்ளதா அல்லது எதிர் மாறுபாட்டில் உள்ளதா என ஆராய்க. கொடுக்கப்பட்ட தரவுகளை வரைபடத்தில் குறிக்கவும். மேலும், (ii) ₹150 ஐ கட்டணத் தொகையாகச் செலுத்தி இருந்தால், நிறுத்தப்பட்ட நேரத்தின் அளவைக் காண்க.'
      },
      dataTable: {
        headers: ['Time (in hours) (x)', '4', '8', '12', '24'],
        rows: [['Amount ₹ (y)', '60', '120', '180', '360']],
        caption: 'Exercise 3.15 Q6: Parking time in hours (x) and amount in ₹ (y)',
        replaceRegex: '(?=Check if the amount)',
        ta: {
          headers: ['நேரம் (மணியில்)(x)', '4', '8', '12', '24'],
          rows: [['கட்டணத் தொகை ₹ (y)', '60', '120', '180', '360']],
          caption: 'பயிற்சி 3.15 வினா 6: நேரம் (மணியில்) (x) மற்றும் கட்டணத் தொகை ₹ (y)'
        },
        replaceRegexTa: '(?=பெறப்படும் கட்டணத் தொகையானது)'
      },
      figureSrc: './assets/grade10-ch3/ex3-15-q6-parking.svg',
      figureAlt: {
        en: 'Direct variation line y = 15x. Dashed green reading lines start at y = ₹150 on the vertical axis, meet the line at (10, 150), and drop down to x = 10 hr on the horizontal axis.',
        ta: 'y = 15x நேர் மாறுபாடு நேர்க்கோடு. செங்குத்து அச்சில் y = ₹150-இலிருந்து (10, 150) வழியாகக் கிடை அச்சில் x = 10 மணிகள் எனப் படிப்பதைக் காட்டுகிறது.'
      },
      figureCaption: {
        en: 'Ex 3.15 Q6: Parking Time (x) vs Charge (y), direct variation y = 15x',
        ta: 'பயிற்சி 3.15 வினா 6: நேரம் (x) மற்றும் கட்டணம் (y), நேர் மாறுபாடு y = 15x'
      },
      steps: [
        {
          en: 'Use the same direct variation line y = 15x (constant hourly rate ₹15/hr, verified by y/x = 15 for all table columns).',
          ta: 'அதே y = 15x (மணிக்கு ₹15 எனும் மாறிலி கட்டணம்) நேர் மாறுபாடு வரைபடத்தைப் பயன்படுத்துவோம்.',
          eq: 'y = 15x',
          math: {
            latex: 'y = 15x',
            fallback: 'y = 15x',
            display: true
          }
        },
        {
          en: 'To read (ii) from the graph: locate y = 150 on the vertical amount axis (midway between 120 and 180), move horizontally right to meet the line at (10, 150), and drop straight down to the horizontal time axis to read x = 10 hours.',
          ta: 'வரைபடத்திலிருந்து (ii) காண: செங்குத்து அச்சில் y = 150 (120 மற்றும் 180-க்கு நடுவே) என்ற இடத்திலிருந்து கிடைமட்டமாக வலதுபுறம் கோட்டை (10, 150)-இல் சந்தித்து, கீழே கிடை அச்சில் x = 10 மணிகள் எனப் படிக்கவும்.',
          eq: 'y = 150 -> (10, 150) -> x = 10 hrs',
          math: {
            latex: 'y = 150 \\longrightarrow (10,\\ 150) \\longrightarrow x = 10\\text{ hrs}',
            fallback: 'y = 150 -> (10, 150) -> x = 10 hrs',
            display: true
          }
        },
        {
          en: 'Check: 15 × 10 = ₹150, confirming 10 hrs.',
          ta: 'சரிபார்ப்பு: 15 × 10 = ₹150. எனவே நிறுத்தப்பட்ட நேரம் 10 மணிகள்.',
          eq: 'x = 150/15 = 10 hrs',
          math: {
            latex: 'x = \\dfrac{150}{15} = 10\\text{ hrs}',
            fallback: 'x = 150/15 = 10 hrs',
            display: true
          }
        }
      ],
      answer: {
        en: '10 hrs',
        ta: '10 மணிகள்'
      },
      answerMath: {
        en: {
          latex: '\\boxed{10\\text{ hrs}}',
          fallback: '10 hrs',
          display: true
        },
        ta: {
          latex: '\\boxed{10\\text{ மணிகள்}}',
          fallback: '10 மணிகள்',
          display: true
        }
      },
      kind: 'textbook',
      source: SOURCE_EN,
      reference: REF_315,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending'
    }
  ];

  const ids = new Set(Object.values(root.TRIGGLE_CLASSES).flatMap(g => g.items.map(q => q.id)));
  for (const item of entries) {
    if (ids.has(item.id)) throw Error('Duplicate textbook ID ' + item.id);
    ids.add(item.id);
  }
  chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];
  for (const item of entries) {
    grade.items.push(item);
    if (!chapter.textbookQuestionIds.includes(item.id)) chapter.textbookQuestionIds.push(item.id);
  }
})();
