/* Tamil Nadu Grade 10 Mathematics, revised 2025, Chapter 8.
 * Original bilingual instruction. Independent Tamil editorial review is pending. */
(() => {
  'use strict';
  const tex = String.raw;
  const both = (en, ta) => ({en, ta});
  const same = value => both(value, value);
  const math = (fallback, latex) => ({fallback, latex});
  const symbol = (fallback, latex, en, ta) => ({symbol: math(fallback, latex), en, ta});
  const proof = (title, reason, equation) => ({title, reason, math: equation});

  function lesson({id, section, pages, title, glance, intro, rule, symbols, proofs, visual, check, practices}) {
    const [question, choices, correct, hint, why, whyMath] = check;
    return {
      id: 'g10-ch8-' + id,
      section,
      page: both(...pages),
      title,
      firstGlance: glance,
      math: rule,
      understand: {intro, symbols},
      proof: {steps: proofs},
      visual,
      question,
      choices,
      correct,
      hint,
      why,
      whyMath,
      practiceId: practices[0],
      secondaryPracticeId: practices[1],
      tertiaryPracticeId: practices[2]
    };
  }

  const observationSymbols = [
    symbol('xᵢ', 'x_i', 'Observation at position i.', 'i-ஆம் இடத்திலுள்ள தரவு மதிப்பு.'),
    symbol('n', 'n', 'Number of observations.', 'தரவுப் புள்ளிகளின் எண்ணிக்கை.'),
    symbol('Σ', tex`\sum`, 'Add the indicated terms over all observations.', 'எல்லாத் தரவுப் புள்ளிகளுக்கும் குறிக்கப்பட்டுள்ள உறுப்புகளைக் கூட்டுக.'),
    symbol('x̄', tex`\bar x`, 'Arithmetic mean.', 'கூட்டுச் சராசரி.')
  ];
  const frequencySymbols = [
    symbol('fᵢ, N', 'f_i,N', 'Frequency of row i and the total of all frequencies.', 'i-ஆம் வரியின் நிகழ்வெண் மற்றும் எல்லா நிகழ்வெண்களின் கூடுதல்.'),
    symbol('xᵢ', 'x_i', 'Value for a discrete frequency or class midpoint for an interval.', 'தனித்தனி நிகழ்வெண்ணுக்குரிய மதிப்பு அல்லது பிரிவு இடைவெளியின் மைய மதிப்பு.')
  ];
  const deviation = symbol('dᵢ', 'd_i', 'Coded or ordinary deviation, as defined in the displayed formula.', 'சூத்திரத்தில் வரையறுக்கப்பட்ட விலக்கம் அல்லது படி விலக்கம்.');
  const variances = [
    symbol('σ²', tex`\sigma^2`, 'Population variance in squared units.', 'தரவுத் தொகுப்பின் விலக்க வர்க்கச் சராசரி, வர்க்க அலகுகளில்.'),
    symbol('σ', tex`\sigma`, 'Population standard deviation in the original units.', 'தரவுத் தொகுப்பின் திட்ட விலக்கம், தரவின் அலகிலேயே.')
  ];
  const events = [
    symbol('S', 'S', 'Sample space, the set of all possible outcomes.', 'கூறுவெளி, அதாவது சாத்தியமான எல்லா விளைவுகளின் கணம்.'),
    symbol('A, B, C', 'A,B,C', 'Events, each a subset of S.', 'நிகழ்ச்சிகள், ஒவ்வொன்றும் S-இன் உட்கணம்.'),
    symbol('P(A)', 'P(A)', 'Probability that event A occurs.', 'A நிகழ்வதற்கான நிகழ்தகவு.')
  ];
  const eventOperations = [
    symbol('A ∪ B', tex`A\cup B`, 'A or B occurs, including the possibility that both occur.', 'A அல்லது B நிகழும். இரண்டும் நிகழ்வதும் இதில் அடங்கும்.'),
    symbol('A ∩ B', tex`A\cap B`, 'Both A and B occur.', 'A மற்றும் B இரண்டும் நிகழும்.'),
    symbol('Ā', tex`\overline A`, 'A does not occur.', 'A நிகழாத நிரப்பு நிகழ்ச்சி.')
  ];
  const stages = [
    lesson({
      id: 'mean', section: '8.1', pages: ['301–303','309–311'],
      title: both('Arithmetic mean and frequency', 'கூட்டுச் சராசரியும் நிகழ்வெண்ணும்'),
      glance: both('The mean is the value each observation would have if the total were shared equally.', 'மொத்தத்தைச் சமமாகப் பகிர்ந்தால் ஒவ்வொரு தரவுக்கும் கிடைக்கும் மதிப்பே சராசரி.'),
      intro: both('For raw data, add every value once. In a frequency table, multiply each value by its frequency. For grouped intervals, first use each class midpoint as a representative value.',
        'தொகுக்கப்படாத தரவுகளில் ஒவ்வொரு மதிப்பையும் ஒருமுறை கூட்டுக. நிகழ்வெண் அட்டவணையில் மதிப்பை அதன் நிகழ்வெண்ணால் பெருக்குக. தொகுக்கப்பட்ட பிரிவுகளுக்கு முதலில் ஒவ்வொரு பிரிவின் மைய மதிப்பைப் பயன்படுத்துக.'),
      rule: math('x̄ = Σxᵢ/n = Σfᵢxᵢ/N (with frequencies)', tex`\bar x=\dfrac{\sum x_i}{n},\qquad\bar x=\dfrac{\sum f_ix_i}{N}`),
      symbols: [...observationSymbols, frequencySymbols[0]],
      proofs: [
        proof(both('Recover the total', 'மொத்தத்தைக் காண்க'), both('A value appearing four times makes four equal contributions. Multiplication records those contributions in one term.',
          'நான்கு முறை வரும் மதிப்பு மொத்தத்தில் நான்கு சம பங்குகளைச் சேர்க்கிறது. பெருக்கலால் அவற்றை ஒரே உறுப்பாக எழுதலாம்.'), math('xᵢ + xᵢ + xᵢ + xᵢ = 4xᵢ', 'x_i+x_i+x_i+x_i=4x_i')),
        proof(both('Choose a convenient origin and scale', 'ஊகச் சராசரியையும் படி அளவையும் தேர்ந்தெடுக்கவும்'), both('For values coded as deviations from an assumed mean a, add the average deviation back. If you divide deviations by a common positive width c, multiply back by c first.',
          'ஊகச் சராசரி a-இலிருந்து விலக்கங்களைக் கணக்கிட்டால், அவற்றின் சராசரியை மீண்டும் a-உடன் கூட்டுக. விலக்கங்களைப் பொது அகலம் c-ஆல் வகுத்திருந்தால் முதலில் மீண்டும் c-ஆல் பெருக்குக.'),
          math('uᵢ = (xᵢ − a)/c ⇒ x̄ = a + cΣfᵢuᵢ/N', tex`u_i=\dfrac{x_i-a}{c}\quad\Longrightarrow\quad \bar x=a+c\dfrac{\sum f_iu_i}{N}`))
      ],
      visual: 'frequency',
      check: [both('The values 2 and 8 have frequencies 3 and 1. What is their mean?', '2 மற்றும் 8-க்குரிய நிகழ்வெண்கள் 3 மற்றும் 1. அவற்றின் சராசரி என்ன?'),
        [same('3.5'), same('5'), same('7')], 0, both('There are four observations.', 'நான்கு தரவுப் புள்ளிகள் உள்ளன.'),
        both('Add three copies of 2 and one copy of 8, then divide by four.', '2-ஐ மூன்று முறையும் 8-ஐ ஒரு முறையும் கூட்டி நான்கால் வகுக்கவும்.'),
        math('(3 × 2 + 8)/4 = 3.5', tex`\dfrac{3\times2+8}{4}=3.5`)],
      practices: ['c10-8-unit-q1','c10-8-ex8-1-q10']
    }),
    lesson({
      id: 'range', section: '8.2–8.2.1', pages: ['303–304','311–312'],
      title: both('Dispersion, range and coefficient of range', 'பரவல், வீச்சு மற்றும் வீச்சுக்கெழு'),
      glance: both('Two data sets can have the same mean and very different spread. Range compares the two extremes.',
        'இரு தரவுத் தொகுப்புகளுக்கு ஒரே சராசரி இருந்தாலும் அவற்றின் பரவல் வேறுபடலாம். வீச்சு இரு எல்லை மதிப்புகளையும் ஒப்பிடுகிறது.'),
      intro: both('In raw data, find the actual largest and smallest observations. With grouped intervals, use the outer class boundaries as the textbook range. The coefficient is a unitless ratio when the sum of the two extremes is nonzero.',
        'தொகுக்கப்படாத தரவில் மிகப்பெரிய, மிகச்சிறிய மதிப்புகளைக் காண்க. தொகுக்கப்பட்ட தரவில் பாடநூல் முறையின்படி வெளிப் பிரிவு எல்லைகளைப் பயன்படுத்துக. இரண்டு எல்லை மதிப்புகளின் கூடுதல் பூச்சியமில்லாதபோது வீச்சுக்கெழு ஓர் அலகற்ற விகிதம்.'),
      rule: math('Range = L − S; coefficient of range = (L − S)/(L + S)', tex`L-S,\qquad\dfrac{L-S}{L+S}`),
      symbols: [symbol('L, S','L,S','Largest and smallest values or outer boundaries.','மிகப்பெரிய மற்றும் மிகச்சிறிய மதிப்புகள் அல்லது வெளிப் பிரிவு எல்லைகள்.')],
      proofs: [proof(both('Measure the endpoint gap', 'இரு எல்லைகளுக்கும் இடையேயான தொலைவு'), both('The distance on the number line from S to L is their difference. Multiplying both extremes by the same positive scale multiplies both parts of the coefficient by that scale, so it cancels.',
        'எண் கோட்டில் S முதல் L வரையிலான தொலைவு அவற்றின் வித்தியாசம். இரு எல்லைகளையும் ஒரே மிகை எண்ணால் பெருக்கும்போது வீச்சுக்கெழுவின் தொகுதியும் பகுதியும் அதே எண்ணால் பெருகுவதால் அந்தப் பெருக்கி நீங்கும்.'),
        math('(kL − kS)/(kL + kS) = (L − S)/(L + S)', tex`\dfrac{kL-kS}{kL+kS}=\dfrac{L-S}{L+S}`))],
      visual: 'spread',
      check: [both('The smallest value is 4 and the largest is 12. What is the coefficient of range?', 'மிகச்சிறிய மதிப்பு 4, மிகப்பெரிய மதிப்பு 12. வீச்சுக்கெழு என்ன?'),
        [same('8'),same('0.5'),same('2')], 1, both('Divide the difference by the sum.', 'வித்தியாசத்தைக் கூடுதலால் வகுக்கவும்.'),
        both('The range is 8 and the sum of the extremes is 16.', 'வீச்சு 8. இரு எல்லை மதிப்புகளின் கூடுதல் 16.'),
        math('(12 − 4)/(12 + 4) = 0.5', tex`\dfrac{12-4}{12+4}=0.5`)],
      practices: ['c10-8-ex8-1-q1-i','c10-8-ex8-1-q3','c10-8-unit-q7']
    }),
    lesson({
      id: 'deviations', section: '8.2.2–8.2.3', pages: ['304','313'],
      title: both('Deviations and squared deviations', 'விலக்கங்களும் விலக்க வர்க்கங்களும்'),
      glance: both('Deviations tell how far above or below the mean each observation lies.', 'ஒவ்வொரு மதிப்பும் சராசரிக்கு எவ்வளவு மேலே அல்லது கீழே உள்ளது என்பதை விலக்கம் காட்டுகிறது.'),
      intro: both('Subtract the same mean from each value. Values below the mean give negative deviations, above it give positive ones. Squaring keeps both contributions nonnegative and gives large deviations greater weight.',
        'ஒவ்வொரு மதிப்பிலிருந்தும் ஒரே சராசரியைக் கழிக்கவும். சராசரிக்குக் கீழே உள்ள மதிப்புகள் குறை விலக்கங்களையும் மேலே உள்ளவை மிகை விலக்கங்களையும் தரும். வர்க்கப்படுத்தும்போது அனைத்தும் குறையற்றவை. பெரிய விலக்கங்களுக்கு அதிகப் பங்கு கிடைக்கும்.'),
      rule: math('dᵢ = xᵢ − x̄; Σdᵢ = 0; dᵢ² ≥ 0', tex`d_i=x_i-\bar x,\qquad\sum d_i=0,\qquad d_i^2\ge0`),
      symbols: [...observationSymbols, deviation, symbol('dᵢ²','d_i^2','Square of the deviation.','விலக்கத்தின் வர்க்கம்.')],
      proofs: [proof(both('Why signed deviations cancel', 'ஏன் குறியுடன் கூடிய விலக்கங்கள் நீங்குகின்றன?'),
        both('Subtracting the mean n times removes the whole original total. Squaring prevents this cancellation.',
          'சராசரியை n முறை கழித்தால் தரவுகளின் மொத்தக் கூடுதல் நீங்கிவிடும். வர்க்கப்படுத்துவதால் இவ்வாறு நீங்குவதைத் தவிர்க்கலாம்.'),
        math('Σ(xᵢ − x̄) = Σxᵢ − n x̄ = 0', tex`\sum(x_i-\bar x)=\sum x_i-n\bar x=0`))],
      visual: 'spread',
      check: [both('A value is 3 below the mean. What is its squared deviation?', 'ஒரு மதிப்பு சராசரியைவிட 3 குறைவு. அதன் விலக்க வர்க்கம் என்ன?'),
        [same('−3'),same('−9'),same('9')],2,both('First find the signed deviation.', 'முதலில் குறியுடன் கூடிய விலக்கத்தைக் காண்க.'),
        both('The deviation is negative, and its square is positive.', 'விலக்கம் குறை எண். அதன் வர்க்கம் மிகை எண்.'),
        math('(−3)² = 9', '(-3)^2=9')],
      practices: ['c10-8-ex8-5-q3','c10-8-ex8-1-q4']
    }),
    lesson({
      id: 'variance', section: '8.2.4', pages: ['305','313'],
      title: both('Population variance', 'விலக்க வர்க்கச் சராசரி'),
      glance: both('Variance is the average of the squared distances from the mean.', 'சராசரியிலிருந்து உள்ள விலக்கங்களின் வர்க்கச் சராசரியே விலக்க வர்க்கச் சராசரி.'),
      intro: both('This chapter treats the observations as the full data set, so divide by n. The variance is zero exactly when every observation equals the mean.',
        'இப்பாடத்தில் கொடுக்கப்பட்டவற்றை முழுத் தரவுத் தொகுப்பாகக் கொள்வதால் n-ஆல் வகுக்கவும். எல்லா மதிப்புகளும் சராசரிக்குச் சமமாக இருந்தால் மட்டுமே விலக்க வர்க்கச் சராசரி பூச்சியமாகும்.'),
      rule: math('σ² = Σ(xᵢ − x̄)²/n = Σxᵢ²/n − x̄²',
        tex`\sigma^2=\dfrac{\sum(x_i-\bar x)^2}{n}=\dfrac{\sum x_i^2}{n}-\bar x^2`),
      symbols: [...observationSymbols,variances[0]],
      proofs: [proof(both('Expand, then use the mean', 'விரித்து சராசரியைப் பயன்படுத்துக'),
        both('Expansion creates one cross term for each point. Since the sum of observations is n times the mean, the average of the cross terms is minus twice the squared mean.',
          'விரிக்கும்போது ஒவ்வொரு தரவிற்கும் ஒரு குறுக்குப் பெருக்கல் உறுப்பு கிடைக்கும். மொத்தம் சராசரியின் n மடங்கு என்பதால் குறுக்குப் பெருக்கல்களின் சராசரி சராசரி வர்க்கத்தின் குறை இருமடங்காகும்.'),
        math('Σ(xᵢ − x̄)² = Σxᵢ² − 2x̄Σxᵢ + nx̄² = Σxᵢ² − nx̄²',
          tex`\begin{aligned}\sum(x_i-\bar x)^2&=\sum x_i^2-2\bar x\sum x_i+n\bar x^2\\&=\sum x_i^2-n\bar x^2\end{aligned}`))],
      visual: 'spread',
      check: [both('What is the population variance of 2 and 6?', '2 மற்றும் 6-இன் விலக்க வர்க்கச் சராசரி என்ன?'),
        [same('2'),same('4'),same('8')],1,both('The mean is 4.', 'சராசரி 4.'),
        both('The deviations are −2 and 2. Both squares are 4.', 'விலக்கங்கள் −2, 2. இரண்டின் வர்க்கங்களும் 4.'),
        math('(4 + 4)/2 = 4', tex`\dfrac{4+4}{2}=4`)],
      practices: ['c10-8-ex8-5-q4','c10-8-unit-q3']
    }),
    lesson({
      id: 'standard-deviation', section: '8.2.5', pages: ['305–307','313–315'],
      title: both('Standard deviation and changes of scale', 'திட்ட விலக்கமும் அளவுமாற்றமும்'),
      glance: both('Standard deviation expresses spread in the same units as the data.', 'திட்ட விலக்கம் பரவலைத் தரவின் அலகிலேயே அளக்கிறது.'),
      intro: both('Take the nonnegative square root of variance. Adding the same constant to all values moves the mean and the observations together. Scaling all values changes the distances by the absolute scale factor.',
        'விலக்க வர்க்கச் சராசரியின் குறையற்ற வர்க்கமூலத்தை எடுக்கவும். எல்லா மதிப்புகளுக்கும் ஒரே மாறிலியைக் கூட்டினால் சராசரியும் மதிப்புகளும் ஒன்றாக நகரும். பெருக்கலுக்குப் பின் விலக்கங்களின் தொலைவு பெருக்கியின் தனி மதிப்பின்படி மாறும்.'),
      rule: math('σ = √σ²; if y = ax + b, then σᵧ = |a|σₓ',
        tex`\sigma=\sqrt{\sigma^2},\qquad y=ax+b\implies \sigma_y=\lvert a\rvert\sigma_x`),
      symbols: [...variances,symbol('a, b','a,b','Scale factor and constant shift.','பெருக்கியும் நகர்த்தும் மாறிலியும்.'),symbol('x̄, ȳ',tex`\bar x,\bar y`,'Old and new means.','பழைய மற்றும் புதிய சராசரிகள்.')],
      proofs: [proof(both('Track one deviation', 'ஒரு விலக்கம் எவ்வாறு மாறுகிறது?'),
        both('The shift cancels. Squaring all deviations scales the variance by the square of the factor, so standard deviation scales by its absolute value.',
          'கூட்டிய மாறிலி நீங்குகிறது. விலக்கங்களை வர்க்கப்படுத்தும்போது விலக்க வர்க்கச் சராசரி பெருக்கியின் வர்க்கத்தால் பெருகும். எனவே திட்ட விலக்கம் அதன் தனி மதிப்பால் பெருகும்.'),
        math('yᵢ − ȳ = (axᵢ + b) − (ax̄ + b) = a(xᵢ − x̄)', tex`y_i-\bar y=(ax_i+b)-(a\bar x+b)=a(x_i-\bar x)`))],
      visual: 'scale',
      check: [both('The standard deviation is 4. Each value is multiplied by −2, then increased by 7. What is the new standard deviation?',
        'திட்ட விலக்கம் 4. ஒவ்வொரு மதிப்பையும் −2-ஆல் பெருக்கி 7-ஐக் கூட்டினால் புதிய திட்ட விலக்கம் என்ன?'),
        [same('−8'),same('8'),same('15')],1,both('Use the magnitude of the multiplier.', 'பெருக்கியின் தனி மதிப்பைப் பயன்படுத்துக.'),
        both('The shift cancels, and the absolute multiplier is 2.', 'கூட்டிய மாறிலி நீங்கும். பெருக்கியின் தனி மதிப்பு 2.'),
        math('|−2| × 4 = 8', tex`\lvert-2\rvert\times4=8`)],
      practices: ['c10-8-ex8-1-q8','c10-8-ex8-1-q9','c10-8-unit-q4']
    }),
    lesson({
      id: 'ungrouped-methods', section: '8.2.5', pages: ['305–309','313–317'],
      title: both('Standard deviation methods for ungrouped data', 'தொகுக்கப்படாத தரவுக்கான திட்ட விலக்க முறைகள்'),
      glance: both('All four methods measure the same spread. Choose convenient numbers before doing the arithmetic.',
        'நான்கு முறைகளும் ஒரே பரவலை அளக்கின்றன. கணக்கிற்கு எளிதான மதிப்புகளைத் தேர்ந்தெடுக்கவும்.'),
      intro: both('The direct method uses raw squares. The mean method uses deviations from the exact mean. The assumed-mean method shifts by a convenient value. The step-deviation method then divides the shifted values by a common positive scale.',
        'நேரடி முறை தரவுகளின் வர்க்கங்களைப் பயன்படுத்தும். சராசரி முறை உண்மையான சராசரியிலிருந்து விலக்கங்களைப் பயன்படுத்தும். ஊகச் சராசரி முறை வசதியான மதிப்பைத் தேர்ந்தெடுக்கும். படி விலக்க முறையில் நகர்த்திய மதிப்புகளை ஒரு பொதுவான மிகை எண்ணால் வகுக்கிறோம்.'),
      rule: math('For dᵢ = (xᵢ − a)/c, σ = c√[Σdᵢ²/n − (Σdᵢ/n)²]',
        tex`d_i=\dfrac{x_i-a}{c},\qquad\sigma=c\sqrt{\dfrac{\sum d_i^2}{n}-\left(\dfrac{\sum d_i}{n}\right)^2}`),
      symbols: [...observationSymbols,...variances,deviation,symbol('a, c','a,c','Assumed mean and positive scale.','ஊகச் சராசரி மற்றும் மிகைப் பெருக்கி.')],
      proofs: [
        proof(both('Special cases of the coded formula', 'படி விலக்கச் சூத்திரத்தின் சிறப்பு நிலைகள்'),
          both('Choose a = 0 and c = 1 for the direct method. Use any convenient a with c = 1 for assumed mean. Choose a equal to the actual mean with c = 1 and the correction term vanishes.',
            'நேரடி முறைக்கு a = 0, c = 1 என்க. ஊகச் சராசரி முறைக்கு ஏற்ற a-ஐயும் c = 1-ஐயும் பயன்படுத்துக. சராசரி முறையில் a உண்மையான சராசரி, c = 1 என்பதால் திருத்த உறுப்பு பூச்சியமாகும்.'),
          math('a = x̄, c = 1 ⇒ Σdᵢ = 0 ⇒ σ = √(Σdᵢ²/n)', tex`a=\bar x,\ c=1\implies\sum d_i=0\implies\sigma=\sqrt{\dfrac{\sum d_i^2}{n}}`)),
        proof(both('First n natural numbers', 'முதல் n இயல் எண்கள்'),
          both('The mean of 1 through n is the average of the endpoints. Insert that mean and the sum-of-squares formula in the direct method.',
            '1 முதல் n வரையிலான எண்களின் சராசரி இரு எல்லைகளின் சராசரி. அதை வர்க்கக் கூடுதல் சூத்திரத்துடன் நேரடி முறையில் பிரதியிடுக.'),
          math('σ² = (n + 1)(2n + 1)/6 − ((n + 1)/2)² = (n² − 1)/12',
            tex`\begin{aligned}\sigma^2&=\dfrac{(n+1)(2n+1)}6-\left(\dfrac{n+1}2\right)^2\\&=\dfrac{n^2-1}{12}\end{aligned}`))
      ],
      visual: 'scale',
      check: [both('What is the standard deviation of the first five natural numbers?', 'முதல் ஐந்து இயல் எண்களின் திட்ட விலக்கம் என்ன?'),
        [same('2'),{...same('√2'),math:math('√2',tex`\sqrt2`)},same('5')],1,
        both('Compute the variance using n = 5, then take its square root.', 'n = 5 என வைத்து விலக்க வர்க்கச் சராசரியைக் கணக்கிட்டு வர்க்கமூலம் எடுக்கவும்.'),
        both('The variance is 2, so the standard deviation is the square root of 2.', 'விலக்க வர்க்கச் சராசரி 2. அதன் வர்க்கமூலமே திட்ட விலக்கம்.'),
        math('σ = √((25 − 1)/12) = √2', tex`\sigma=\sqrt{\dfrac{25-1}{12}}=\sqrt2`)],
      practices: ['c10-8-ex8-1-q7','c10-8-unit-q5']
    }),
    lesson({
      id: 'grouped-data', section: '8.2.5', pages: ['305–312','313–321'],
      title: both('Standard deviation of frequency distributions', 'நிகழ்வெண் பரவல்களின் திட்ட விலக்கம்'),
      glance: both('A frequency says how many times a value contributes. Every deviation and squared deviation must carry that weight.',
        'ஒரு மதிப்பு எத்தனை முறை இடம்பெறுகிறது என்பதை நிகழ்வெண் காட்டும். விலக்கத்தையும் விலக்க வர்க்கத்தையும் அந்த நிகழ்வெண்ணால் பெருக்க வேண்டும்.'),
      intro: both('A discrete row uses its listed value. An interval row uses the average of its endpoints. Use the weighted mean method, assumed-mean method or step-deviation method. Grouping into intervals approximates the original observations by their midpoints.',
        'தனித்தனி மதிப்புகளுக்கு கொடுக்கப்பட்ட மதிப்பைப் பயன்படுத்துக. பிரிவு இடைவெளிக்கு அதன் இரு எல்லைகளின் சராசரியைப் பயன்படுத்துக. நிகழ்வெண்ணுடன் சராசரி முறை, ஊகச் சராசரி முறை அல்லது படி விலக்க முறையைப் பயன்படுத்தலாம். இடைவெளியாகத் தொகுக்கும்போது மைய மதிப்புகள் மூலத் தரவுகளுக்கான தோராய மதிப்புகளாகும்.'),
      rule: math('dᵢ = (xᵢ − a)/c; σ = c√[Σfᵢdᵢ²/N − (Σfᵢdᵢ/N)²]',
        tex`\begin{aligned}d_i&=\dfrac{x_i-a}{c}\\\sigma&=c\sqrt{\dfrac{\sum f_id_i^2}{N}-\left(\dfrac{\sum f_id_i}{N}\right)^2}\end{aligned}`),
      symbols: [...frequencySymbols,...observationSymbols.slice(2),...variances,deviation,symbol('a, c','a,c','Assumed mean and positive scale (often the common class width).','ஊகச் சராசரியும் மிகைப் படி அளவும். ஒரே அகலமுள்ள பிரிவுகளில் பிரிவு அகலத்தைப் பயன்படுத்தலாம்.')],
      proofs: [
        proof(both('Use frequency as a weight', 'நிகழ்வெண்ணை எடையாகப் பயன்படுத்துக'),
          both('Imagine writing each row value as many times as its frequency. Adding the expanded data is equivalent to weighting each row by its frequency.',
            'ஒவ்வொரு வரியின் மதிப்பையும் அதன் நிகழ்வெண் அளவு முறை எழுதியதாகக் கருதுக. விரித்த தரவுகளைக் கூட்டுவது ஒவ்வொரு வரிக்கும் அதன் நிகழ்வெண்ணை எடையாகக் கொடுப்பதற்குச் சமம்.'),
          math('N = Σfᵢ; x̄ = Σfᵢxᵢ/N', tex`N=\sum f_i,\qquad\bar x=\dfrac{\sum f_ix_i}{N}`)),
        proof(both('Recover the original scale', 'தரவின் அளவிற்கு மீண்டும் மாற்றுக'),
          both('If a is the weighted mean and c = 1, the weighted deviations sum to zero. For any assumed mean with c = 1, keep the correction term. With coded deviations, multiply the resulting standard deviation by c.',
            'a நிகழ்வெண்ணுடன் கணக்கிட்ட சராசரி, c = 1 எனில் நிகழ்வெண்ணுடன் கூடிய விலக்கங்களின் கூடுதல் பூச்சியம். வேறு ஊகச் சராசரிக்கு c = 1 எனில் திருத்த உறுப்பை வைத்திருக்கவும். படி விலக்கங்களின் திட்ட விலக்கத்தை c-ஆல் பெருக்கினால் பழைய அளவு கிடைக்கும்.'),
          math('a = x̄, c = 1 ⇒ σ = √(Σfᵢdᵢ²/N)', tex`a=\bar x,\ c=1\implies\sigma=\sqrt{\dfrac{\sum f_id_i^2}{N}}`))
      ],
      visual: 'frequency',
      check: [both('Which value represents the grouped interval 30–40 in these formulas?', 'இந்தச் சூத்திரங்களில் 30–40 பிரிவு இடைவெளியைக் குறிக்கும் மதிப்பு எது?'),
        [same('30'),same('35'),same('40')],1,both('Average the two endpoints.', 'இரு எல்லைகளின் சராசரியைக் காண்க.'),
        both('The midpoint is halfway between the two endpoints.', 'மைய மதிப்பு இரு எல்லைகளுக்கும் சம தொலைவில் உள்ளது.'),
        math('(30 + 40)/2 = 35', tex`\dfrac{30+40}{2}=35`)],
      practices: ['c10-8-ex8-1-q11','c10-8-ex8-1-q12','c10-8-unit-q2']
    }),
    lesson({
      id: 'coefficient-of-variation', section: '8.3', pages: ['314–316','323–325'],
      title: both('Coefficient of variation and consistency', 'மாறுபாட்டுக் கெழுவும் நிலைத்தன்மையும்'),
      glance: both('Compare standard deviations relative to their means when the data have different scales.',
        'வெவ்வேறு அளவுகளிலுள்ள தரவுகளை ஒப்பிட, திட்ட விலக்கங்களை அவற்றின் சராசரியுடன் ஒப்பிட்டுப் பாருங்கள்.'),
      intro: both('For positive means and measurements with a meaningful zero, the coefficient of variation compares spread as a percentage of the mean. A smaller coefficient means more consistency relative to that mean.',
        'மிகைச் சராசரியும் பொருளுள்ள பூச்சியமும் கொண்ட அளவுகளில், மாறுபாட்டுக் கெழு திட்ட விலக்கத்தைச் சராசரியின் சதவீதமாகக் காட்டுகிறது. குறைந்த கெழு அதிகச் சார்பு நிலைத்தன்மையைக் குறிக்கும்.'),
      rule: math('CV = (σ/x̄) × 100%', tex`\mathrm{CV}=\dfrac{\sigma}{\bar x}\times100\%`),
      symbols: [variances[1],observationSymbols[3],symbol('CV',tex`\mathrm{CV}`,'Coefficient of variation in percent.','சதவீதத்தில் அளவிடப்படும் மாறுபாட்டுக் கெழு.')],
      proofs: [proof(both('A change of units cancels', 'அலகு மாற்றத்தின் பெருக்கி நீங்கும்'),
        both('For a positive conversion factor k, both the standard deviation and the mean are multiplied by k. Their ratio is unchanged. A shift, unlike a multiplicative unit conversion, can change the ratio.',
          'அலகு மாற்றத்தின் மிகைப் பெருக்கி k எனில், திட்ட விலக்கமும் சராசரியும் k-ஆல் பெருகுகின்றன. அவற்றின் விகிதம் மாறாது. ஒரு மாறிலியைக் கூட்டுவது விகிதத்தை மாற்றலாம்.'),
        math('(kσ)/(kx̄) = σ/x̄', tex`\dfrac{k\sigma}{k\bar x}=\dfrac{\sigma}{\bar x}`))],
      visual: 'cv',
      check: [both('A has mean 20 and standard deviation 4. B has mean 8 and standard deviation 2. Which is more consistent?', 'A-இன் சராசரி 20, திட்ட விலக்கம் 4. B-இன் சராசரி 8, திட்ட விலக்கம் 2. எது அதிக நிலைத்தன்மையுடையது?'),
        [same('A'),same('B'),both('Equal consistency','சம நிலைத்தன்மை')],0,both('Compare the two ratios.', 'இரு விகிதங்களையும் ஒப்பிடுக.'),
        both('A has the smaller coefficient, even though its standard deviation is larger.', 'A-இன் திட்ட விலக்கம் பெரியதாக இருந்தாலும் அதன் மாறுபாட்டுக் கெழு குறைவு.'),
        math('CVₐ = 20%, CVᵦ = 25%', tex`\mathrm{CV}_A=20\%,\qquad\mathrm{CV}_B=25\%`)],
      practices: ['c10-8-ex8-2-q7','c10-8-ex8-2-q8','c10-8-unit-q6']
    }),
    lesson({
      id: 'sample-space', section: '8.4', pages: ['316–317','326–327'],
      title: both('Random experiments and sample spaces', 'சமவாய்ப்புச் சோதனைகளும் கூறுவெளிகளும்'),
      glance: both('You can list what may happen in a random experiment before you know which outcome will occur.',
        'சமவாய்ப்புச் சோதனையில் எந்த விளைவு வரும் என்பது தெரியாவிட்டாலும், சாத்தியமான விளைவுகளை முன்பே பட்டியலிடலாம்.'),
      intro: both('Each possible result is a sample point. The sample space lists each possible result once. When a result has more than one stage, record the order if the stages are distinguished.',
        'ஒவ்வொரு சாத்திய விளைவும் ஒரு கூறு. கூறுவெளியில் ஒவ்வொரு விளைவும் ஒருமுறை இடம்பெறும். பல நிலைகள் கொண்ட விளைவில், நிலைகளைத் தனித்தனியாக அடையாளம் காண முடிந்தால் அவற்றின் வரிசையையும் குறிக்கவும்.'),
      rule: math('S = {all possible outcomes}; ω ∈ S', tex`\omega\in S`),
      symbols: [events[0],symbol('ω',tex`\omega`,'One outcome, also called a sample point.','ஒரு விளைவு. இது கூறு என்றும் அழைக்கப்படுகிறது.'),symbol('n(S)','n(S)','Number of distinct outcomes in a finite sample space.','முடிவுறு கூறுவெளியில் உள்ள வெவ்வேறு விளைவுகளின் எண்ணிக்கை.')],
      proofs: [proof(both('Check that nothing is missing', 'எந்த விளைவும் விடுபடவில்லை எனச் சரிபார்க்கவும்'),
        both('A standard die has six labelled faces. A roll lands on one of those faces, so the six face labels are the complete sample space.',
          'ஒரு வழக்கமான பகடைக்கு எண்களிட்ட ஆறு முகங்கள் உள்ளன. உருட்டும்போது அவற்றுள் ஒரு முகம் கிடைப்பதால் ஆறு முக எண்களும் கூறுவெளியை முழுமையாக்குகின்றன.'),
        math('S = {1, 2, 3, 4, 5, 6}; n(S) = 6', tex`S=\{1,2,3,4,5,6\},\quad n(S)=6`))],
      visual: 'sample',
      check: [both('How many sample points are there when two ordinary dice are distinguished as first and second?', 'இரு வழக்கமான பகடைகளை முதல், இரண்டாம் பகடைகள் என வேறுபடுத்தினால் எத்தனை கூறுகள் கிடைக்கும்?'),
        [same('6'),same('12'),same('36')],2,both('Every first result can go with any second result.', 'முதல் பகடையின் ஒவ்வொரு விளைவுடனும் இரண்டாம் பகடையின் எந்த விளைவும் சேரலாம்.'),
        both('There are six choices for each of two ordered positions.', 'வரிசையிலுள்ள இரண்டு இடங்களில் ஒவ்வொன்றுக்கும் ஆறு வாய்ப்புகள் உள்ளன.'),
        math('6 × 6 = 36', tex`6\times6=36`)],
      practices: ['c10-8-ex8-3-q7-i','c10-8-unit-q8']
    }),
    lesson({
      id: 'tree-diagrams', section: '8.4.1', pages: ['317–318','327–328'],
      title: both('Tree diagrams and ordered outcomes', 'மர வரைபடங்களும் வரிசையான விளைவுகளும்'),
      glance: both('A branch records one result at one stage. Read the entire path to obtain one outcome.', 'ஒரு கிளை ஒரு நிலையின் விளைவைக் காட்டும். ஒரு முழுப் பாதையைப் படித்தால் ஒரு முழு விளைவு கிடைக்கும்.'),
      intro: both('At each node, add all allowed next branches. If drawing without replacement, omit the item already drawn. In other settings the same branches can appear at every node.',
        'ஒவ்வொரு கணுவிலிருந்தும் அடுத்து சாத்தியமான எல்லாக் கிளைகளையும் வரைக. எடுத்த பொருளைத் திரும்ப வைக்காமல் தேர்ந்தெடுத்தால் ஏற்கெனவே எடுத்ததை அடுத்த கிளைகளில் சேர்க்க வேண்டாம். மற்ற சோதனைகளில் ஒரே கிளைகள் ஒவ்வொரு கணுவிலிருந்தும் வரலாம்.'),
      rule: math('S = {HH, HT, TH, TT}, n(S) = 2 × 2 = 4', tex`S=\{HH,HT,TH,TT\},\qquad n(S)=2\times2=4`),
      symbols: [events[0],symbol('H, T','H,T','Head and tail in coin outcomes.','நாணயம் சுண்டும்போது கிடைக்கும் தலை, பூ.'),symbol('n(S)','n(S)','Number of complete paths.','முழுப் பாதைகளின் எண்ணிக்கை.')],
      proofs: [proof(both('Extend each partial path', 'ஒவ்வொரு பாதையையும் நீட்டிக்கவும்'),
        both('For two tosses, the first H makes HH and HT. The first T makes TH and TT. Reading heads and tails in order distinguishes HT from TH.',
          'இருமுறை சுண்டும்போது முதலில் H வந்தால் HH, HT கிடைக்கும். முதலில் T வந்தால் TH, TT கிடைக்கும். தலை, பூ வந்த வரிசையால் HT, TH ஆகியவை வேறுபடுகின்றன.'),
        math('H → {HH, HT}; T → {TH, TT}', tex`H\to\{HH,HT\},\qquad T\to\{TH,TT\}`))],
      visual: 'tree',
      check: [both('You draw two numbered cards in order without replacement, from three distinct cards. How many paths are possible?', 'மூன்று வெவ்வேறு எண் அட்டைகளிலிருந்து இரு அட்டைகளை வரிசையாக, திரும்ப வைக்காமல் எடுக்கிறீர்கள். எத்தனை பாதைகள் சாத்தியம்?'),
        [same('3'),same('6'),same('9')],1,both('After the first choice, two cards remain.', 'முதல் தேர்வுக்குப் பின் இரண்டு அட்டைகள் எஞ்சும்.'),
        both('Each of the three first choices has two second branches.', 'மூன்று முதல் தேர்வுகளில் ஒவ்வொன்றுக்கும் இரண்டு அடுத்த கிளைகள் உள்ளன.'),
        math('3 × 2 = 6', tex`3\times2=6`)],
      practices: ['c10-8-ex8-3-q1','c10-8-ex8-3-q2']
    }),
    lesson({
      id: 'event-types', section: '8.4.1–8.4.2', pages: ['318–319','328–329'],
      title: both('Events and their relationships', 'நிகழ்ச்சிகளும் அவற்றின் தொடர்புகளும்'),
      glance: both('An event collects every outcome that meets a condition.', 'ஒரு நிபந்தனையை நிறைவேற்றும் எல்லா விளைவுகளும் சேர்ந்ததே ஒரு நிகழ்ச்சி.'),
      intro: both('A simple event has one outcome. A compound event has more than one. Equally likely events have the same probability. Mutually exclusive events share no outcome. Exhaustive events together cover the sample space. An event and its complement are both disjoint and exhaustive.',
        'ஓர் எளிய நிகழ்ச்சியில் ஒரு விளைவு உள்ளது. கூட்டு நிகழ்ச்சியில் ஒன்றுக்கு மேற்பட்ட விளைவுகள் உள்ளன. சமவாய்ப்பு நிகழ்ச்சிகளுக்கு ஒரே நிகழ்தகவு. ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகளுக்குப் பொது விளைவு இல்லை. முழுமையான நிகழ்ச்சிகள் சேர்ந்து கூறுவெளியை நிறைவு செய்கின்றன. ஒரு நிகழ்ச்சியும் அதன் நிரப்பு நிகழ்ச்சியும் ஒன்றையொன்று விலக்குவதோடு கூறுவெளி முழுவதையும் உள்ளடக்குகின்றன.'),
      rule: math('Disjoint: A ∩ B = ∅. Exhaustive pair: A ∪ B = S.',
        tex`A\cap B=\varnothing,\qquad A\cup B=S`),
      symbols: [...events.slice(0,2),...eventOperations,symbol('∅',tex`\varnothing`,'Empty set, the impossible event.','வெற்றுக் கணம், அதாவது இயலாத நிகழ்ச்சி.')],
      proofs: [proof(both('A complement partitions the sample space', 'நிரப்பு நிகழ்ச்சி கூறுவெளியைப் பிரிக்கிறது'),
        both('Each outcome is either in A or outside A. Since it cannot be in both places, the two groups are disjoint and exhaustive.',
          'ஒவ்வொரு விளைவும் A-க்குள் அல்லது A-க்கு வெளியே உள்ளது. ஒரே விளைவு இரண்டிலும் இருக்க முடியாது. அவை ஒன்றையொன்று விலக்கி கூறுவெளியை முழுமையாக்குகின்றன.'),
        math('A ∩ Ā = ∅; A ∪ Ā = S', tex`A\cap\overline A=\varnothing,\qquad A\cup\overline A=S`))],
      visual: 'venn',
      check: [both('On a die, is “even” mutually exclusive with “greater than 3”?', 'ஒரு பகடையில் “இரட்டைப்படை எண்”, “3-ஐ விடப் பெரிய எண்” ஆகிய நிகழ்ச்சிகள் ஒன்றையொன்று விலக்குமா?'),
        [both('Yes','ஆம்'),both('No','இல்லை')],1,both('Check the results 4 and 6.', '4 மற்றும் 6 ஆகிய விளைவுகளைச் சரிபார்க்கவும்.'),
        both('The two events share 4 and 6.', '4, 6 ஆகியவை இரு நிகழ்ச்சிகளுக்கும் பொதுவானவை.'),
        math('{2, 4, 6} ∩ {4, 5, 6} = {4, 6}', tex`\{2,4,6\}\cap\{4,5,6\}=\{4,6\}`)],
      practices: ['c10-8-ex8-4-q3','c10-8-ex8-4-q5']
    }),
    lesson({
      id: 'probability', section: '8.4.2', pages: ['319–322','329–334'],
      title: both('Probability of an event and its complement', 'ஒரு நிகழ்ச்சியின் நிகழ்தகவும் அதன் நிரப்பும்'),
      glance: both('When all outcomes are equally likely, divide the favourable count by the total count.', 'எல்லா விளைவுகளும் சமவாய்ப்புடையவை எனில், சாதகமான விளைவுகளின் எண்ணிக்கையை மொத்த எண்ணிக்கையால் வகுக்கவும்.'),
      intro: both('A finite equally likely sample space gives the classical counting formula. The impossible event has probability zero, the certain event has probability one, and all other probabilities lie between those endpoints.',
        'முடிவுறு சமவாய்ப்புக் கூறுவெளிக்கு எண்ணிக்கைச் சூத்திரத்தைப் பயன்படுத்தலாம். இயலாத நிகழ்ச்சிக்கு நிகழ்தகவு பூச்சியம். உறுதி நிகழ்ச்சிக்கு நிகழ்தகவு ஒன்று. மற்ற நிகழ்தகவுகள் இவற்றுக்கு இடையில் அமையும்.'),
      rule: math('P(A) = n(A)/n(S); 0 ≤ P(A) ≤ 1; P(Ā) = 1 − P(A)',
        tex`\begin{aligned}P(A)&=\dfrac{n(A)}{n(S)},\qquad 0\le P(A)\le1\\P(\overline A)&=1-P(A)\end{aligned}`),
      symbols: [...events.slice(0,2),events[2],eventOperations[2],
        symbol('n(A), n(S)','n(A),n(S)','Favourable count and total count.','சாதகமான விளைவுகளின் எண்ணிக்கையும் மொத்த விளைவுகளின் எண்ணிக்கையும்.')],
      proofs: [proof(both('Count the outcomes outside A', 'A-க்கு வெளியிலுள்ள விளைவுகளை எண்ணுக'),
        both('The favourable count is at most the total count. The complement consists of every remaining outcome, so its probability is the remaining part of one.',
          'சாதகமான விளைவுகளின் எண்ணிக்கை மொத்த விளைவுகளின் எண்ணிக்கையை விட அதிகமாகாது. மீதமுள்ள எல்லா விளைவுகளும் நிரப்பு நிகழ்ச்சியில் இருப்பதால் அதன் நிகழ்தகவு ஒன்றில் எஞ்சிய பங்கு.'),
        math('P(Ā) = [n(S) − n(A)]/n(S) = 1 − P(A)',
          tex`P(\overline A)=\dfrac{n(S)-n(A)}{n(S)}=1-P(A)`))],
      visual: 'sample',
      check: [both('A fair die is rolled. What is the probability of getting a value other than 6?', 'சீரான பகடை உருட்டப்படுகிறது. 6 தவிர வேறு மதிப்பு கிடைப்பதற்கான நிகழ்தகவு என்ன?'),
        [{...same('1/6'),math:math('1/6',tex`\dfrac16`)},{...same('5/6'),math:math('5/6',tex`\dfrac56`)},same('1')],1,
        both('Only one face is excluded.', 'ஒரு முகம் மட்டுமே விலக்கப்படுகிறது.'),
        both('There are five favourable results out of six.', 'ஆறு விளைவுகளில் ஐந்து சாதகமானவை.'),
        math('1 − 1/6 = 5/6', tex`1-\dfrac16=\dfrac56`)],
      practices: ['c10-8-ex8-3-q9-iii','c10-8-ex8-4-q2-i','c10-8-unit-q9']
    }),
    lesson({
      id: 'event-algebra', section: '8.5', pages: ['323–324','336–337'],
      title: both('Union, intersection and “only”', 'சேர்ப்பு, வெட்டு மற்றும் “மட்டும்”'),
      glance: both('Separate the sample space into only A, both, only B, and neither.', 'கூறுவெளியை A மட்டும், இரண்டும், B மட்டும், இரண்டும் இல்லை என நான்கு பகுதிகளாகப் பிரிக்கவும்.'),
      intro: both('The union covers both circles including their overlap. The intersection is just the overlap. For “only A”, remove the overlap from A. “Neither” is the complement of the union.',
        'சேர்ப்பு இரு வட்டங்களையும் அவற்றின் பொதுப் பகுதியையும் உள்ளடக்கும். வெட்டு என்பது பொதுப் பகுதி. “A மட்டும்” பெற A-இலிருந்து பொதுப் பகுதியை நீக்குக. “இரண்டும் இல்லை” என்பது சேர்ப்பின் நிரப்பு நிகழ்ச்சி.'),
      rule: math('P(only A) = P(A) − P(A ∩ B); P(only B) = P(B) − P(A ∩ B)',
        tex`\begin{aligned}P(A\cap\overline B)&=P(A)-P(A\cap B)\\P(\overline A\cap B)&=P(B)-P(A\cap B)\end{aligned}`),
      symbols: [...events.slice(0,3),...eventOperations],
      proofs: [proof(both('Split A into two disjoint parts', 'A-ஐ ஒன்றையொன்று விலக்கும் இரு பகுதிகளாகப் பிரிக்கவும்'),
        both('Every result in A either belongs to B or lies outside B. Add the disjoint probabilities to recover P(A). The same reasoning applies to B.',
          'A-இல் உள்ள ஒவ்வொரு விளைவும் B-க்குள் அல்லது B-க்கு வெளியே உள்ளது. ஒன்றையொன்று விலக்கும் இந்த இரு பகுதிகளின் நிகழ்தகவுகளைக் கூட்டினால் P(A) கிடைக்கும். B-க்கும் இதே காரணம் பொருந்தும்.'),
        math('P(A) = P(A ∩ B) + P(A ∩ B̄)', tex`P(A)=P(A\cap B)+P(A\cap\overline B)`)),
        proof(both('Neither means outside the union', 'இரண்டும் இல்லை என்பது சேர்ப்பிற்கு வெளியே உள்ள பகுதி'),
        both('An outcome is outside both circles exactly when it is outside their union.', 'ஒரு விளைவு இரு வட்டங்களுக்கும் வெளியே இருப்பதும் அவற்றின் சேர்ப்பிற்கு வெளியே இருப்பதும் ஒன்றே.'),
        math('Ā ∩ B̄ = complement of A ∪ B', tex`\overline A\cap\overline B=\overline{A\cup B}`))],
      visual: 'venn',
      check: [both('P(A) = 0.6 and P(A ∩ B) = 0.2. What is the probability of only A?', 'P(A) = 0.6, P(A ∩ B) = 0.2 எனில், A மட்டும் நிகழ்வதற்கான நிகழ்தகவு என்ன?'),
        [same('0.2'),same('0.4'),same('0.8')],1,both('Remove the probability of both.', 'இரண்டும் நிகழும் நிகழ்தகவைக் கழிக்கவும்.'),
        both('The overlap was included in A, so subtract it once.', 'பொதுப் பகுதி A-இல் அடங்கியுள்ளது. எனவே அதை ஒருமுறை கழிக்கவும்.'),
        math('0.6 − 0.2 = 0.4', '0.6-0.2=0.4')],
      practices: ['c10-8-ex8-4-q2-iii','c10-8-ex8-4-q5']
    }),
    lesson({
      id: 'addition-two', section: '8.6', pages: ['325–328','337–341'],
      title: both('Addition theorem for two events', 'இரு நிகழ்ச்சிகளுக்கான கூட்டல் தேற்றம்'),
      glance: both('To find the probability of “A or B”, add the individual probabilities and subtract the shared part once.',
        '“A அல்லது B” நிகழ்வதற்கான நிகழ்தகவைக் காண இரு நிகழ்தகவுகளையும் கூட்டிப் பொதுப் பகுதியை ஒருமுறை கழிக்கவும்.'),
      intro: both('If the events are disjoint, the overlap has probability zero and no subtraction is needed. A proposed union must be at least as likely as either event, and an intersection can be no more likely than either event.',
        'ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகளின் வெட்டின் நிகழ்தகவு பூச்சியம். எனவே கழிக்க வேண்டியதில்லை. சேர்ப்பின் நிகழ்தகவு ஒவ்வொரு நிகழ்ச்சியின் நிகழ்தகவுக்கும் குறையாமல் இருக்க வேண்டும். வெட்டின் நிகழ்தகவு ஒவ்வொன்றின் நிகழ்தகவுக்கும் மிகாமல் இருக்க வேண்டும்.'),
      rule: math('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', tex`P(A\cup B)=P(A)+P(B)-P(A\cap B)`),
      symbols: [...events,...eventOperations],
      proofs: [proof(both('Count all three inside regions once', 'உள்ளிருக்கும் மூன்று பகுதிகளையும் ஒருமுறை எண்ணுக'),
        both('Adding the two event probabilities counts the middle in each addend. Subtracting the middle once leaves each region counted exactly once.',
          'இரு நிகழ்தகவுகளையும் கூட்டும்போது நடுப்பகுதி இரண்டு உறுப்புகளிலும் கணக்கிடப்படுகிறது. அதை ஒருமுறை கழித்தால் ஒவ்வொரு பகுதியும் சரியாக ஒருமுறை கணக்கிடப்படும்.'),
        math('P(A) + P(B) = P(A ∪ B) + P(A ∩ B)', tex`P(A)+P(B)=P(A\cup B)+P(A\cap B)`))],
      visual: 'venn',
      check: [both('P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2. Find P(A ∪ B).', 'P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2 எனில், P(A ∪ B) காண்க.'),
        [same('0.7'),same('0.9'),same('1.1')],0,both('Subtract the overlap once.', 'பொதுப் பகுதியை ஒருமுறை கழிக்கவும்.'),
        both('Add 0.5 and 0.4, then subtract the shared 0.2.', '0.5, 0.4 ஆகியவற்றைக் கூட்டி, பொதுப் பகுதியான 0.2-ஐக் கழிக்கவும்.'),
        math('0.5 + 0.4 − 0.2 = 0.7', '0.5+0.4-0.2=0.7')],
      practices: ['c10-8-ex8-4-q6','c10-8-ex8-4-q7','c10-8-unit-q11']
    }),
    lesson({
      id: 'addition-three', section: '8.6', pages: ['325–329','337–342'],
      title: both('Addition theorem for three events', 'மூன்று நிகழ்ச்சிகளுக்கான கூட்டல் தேற்றம்'),
      glance: both('Add the three individual probabilities, subtract the three pairwise overlaps, and add the triple overlap back.',
        'மூன்று நிகழ்தகவுகளைக் கூட்டுக. இரண்டிரண்டு நிகழ்ச்சிகளின் மூன்று வெட்டுகளைக் கழிக்கவும். மூன்றுக்கும் பொதுவான வெட்டை மீண்டும் கூட்டுக.'),
      intro: both('The probability of any region must be nonnegative. After computing a union, you can check the result by adding all the disjoint regions inside it. Adding the outside region gives exactly one.',
        'எந்தப் பகுதியின் நிகழ்தகவும் குறையற்றதாக இருக்க வேண்டும். சேர்ப்பைக் கணக்கிட்ட பின், அதனுள் உள்ள ஒன்றையொன்று விலக்கும் பகுதிகளைச் சேர்த்துச் சரிபார்க்கலாம். வெளியிலுள்ள பகுதியையும் சேர்த்தால் மொத்தம் ஒன்று.'),
      rule: math('P(A ∪ B ∪ C) = P(A) + P(B) + P(C) − P(A ∩ B) − P(A ∩ C) − P(B ∩ C) + P(A ∩ B ∩ C)',
        tex`\begin{aligned}P(A\cup B\cup C)&=P(A)+P(B)+P(C)\\&\quad-P(A\cap B)-P(A\cap C)-P(B\cap C)\\&\quad+P(A\cap B\cap C)\end{aligned}`),
      symbols: [...events,...eventOperations.slice(0,2),symbol('A ∩ B ∩ C',tex`A\cap B\cap C`,'All three events occur.','மூன்று நிகழ்ச்சிகளும் நிகழும் பகுதி.')],
      proofs: [proof(both('Count membership by region', 'ஒவ்வொரு பகுதியும் எத்தனை முறை கணக்கிடப்படுகிறது?'),
        both('An outcome in just one event is counted once. An outcome in two events is counted twice and subtracted once. An outcome in all three is counted three times and subtracted three times. It needs one final addition.',
          'ஒரு நிகழ்ச்சியில் மட்டும் உள்ள விளைவு ஒருமுறை எண்ணப்படும். இரண்டில் உள்ள விளைவு இருமுறை எண்ணப்பட்டு ஒருமுறை கழிக்கப்படும். மூன்றிலும் உள்ள விளைவு மூன்று முறை எண்ணப்பட்டு மூன்று முறை கழிக்கப்படும். எனவே அதை மீண்டும் ஒருமுறை சேர்க்க வேண்டும்.'),
        math('1 = 1; 2 − 1 = 1; 3 − 3 + 1 = 1', tex`1=1,\qquad2-1=1,\qquad3-3+1=1`))],
      visual: 'three',
      check: [both('After adding all three individual probabilities and subtracting all three pairwise overlaps, how many times has the triple overlap been counted?', 'மூன்று தனித்தனி நிகழ்தகவுகளைக் கூட்டி, இரண்டிரண்டு நிகழ்ச்சிகளின் மூன்று வெட்டுகளைக் கழித்த பின், மூன்றுக்கும் பொதுவான பகுதி எத்தனை முறை கணக்கில் உள்ளது?'),
        [same('0'),same('1'),same('3')],0,both('The triple overlap is part of every pairwise overlap.', 'மூன்றுக்கும் பொதுவான பகுதி இரண்டிரண்டின் ஒவ்வொரு வெட்டிலும் உள்ளது.'),
        both('The three additions and the three subtractions cancel. Add the triple overlap once to recover it.', 'மூன்று கூட்டல்களும் மூன்று கழித்தல்களும் ஒன்றையொன்று நீக்குகின்றன. மூன்றுக்கும் பொதுவான பகுதியை மீண்டும் ஒருமுறை கூட்டுக.'),
        math('3 − 3 = 0', '3-3=0')],
      practices: ['c10-8-ex8-4-q11','c10-8-ex8-4-q12','c10-8-ex8-4-q13']
    })
  ];

  const exerciseConcepts = {
    '8.1': ['range','range','range','standard-deviation','variance','standard-deviation','ungrouped-methods',
      'standard-deviation','standard-deviation','grouped-data','grouped-data','grouped-data','grouped-data','variance','variance'],
    '8.2': ['coefficient-of-variation'],
    '8.3': ['tree-diagrams','tree-diagrams','probability'],
    '8.4': ['addition-two','probability','event-types','addition-two','event-algebra','addition-two',
      'addition-two','event-algebra','addition-two','addition-two','addition-three','addition-three','addition-three'],
    '8.5': ['range','range','deviations','variance','ungrouped-methods','standard-deviation','standard-deviation',
      'coefficient-of-variation','probability'],
    '8.unit': ['mean','grouped-data','grouped-data','standard-deviation','ungrouped-methods','coefficient-of-variation',
      'range','addition-two','probability','probability','addition-two']
  };

  function conceptForQuestion(item) {
    if (item.classNum !== 10 || item.chapter !== '8') return -1;
    const concepts = exerciseConcepts[item.exercise];
    const number = Number(item.id.match(/-q(\d+)/)?.[1]);
    const id = concepts?.[number - 1] || concepts?.at(-1);
    return stages.findIndex(stage => stage.id === 'g10-ch8-' + id);
  }

  window.TRIGGLE_G10_CH8_PATH = {chapterId: 'g10-ch8', stages, conceptForQuestion};
})();
