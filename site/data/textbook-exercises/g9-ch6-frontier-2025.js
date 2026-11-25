/* Grade 9 Trigonometry. Registered 2025 English and Tamil source locators. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES[9];
  const englishBook = 'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view';
  const prompts = {
    'c9-exercise-6-1-q5': {
      en: 'If cos A = [[2x|1 + x²]], then find the values of sin A and tan A in terms of x.',
      ta: 'cos A = [[2x|1 + x²]] எனில், sin A மற்றும் tan A இன் மதிப்புகளை x இல் காண்க.'
    },
    'c9-exercise-6-1-q6': {
      en: 'If sin θ = [[a|√(a² + b²)]], then show that b sin θ = a cos θ.',
      ta: 'sin θ = [[a|√(a² + b²)]] எனில், b sin θ = a cos θ என நிறுவுக.'
    },
    'c9-exercise-6-1-q9': {
      en: 'From the given figure, prove that θ + φ = 90°. Also prove that there are two other right angled triangles. Find sin α, cos β and tan φ.',
      ta: 'கொடுக்கப்பட்டுள்ள படத்தில் θ + φ = 90° என மெய்ப்பிக்க. இப்படத்தில் மேலும் இரு செங்கோண முக்கோணங்கள் உள்ளன என்பதை மெய்ப்பித்து, sin α, cos β மற்றும் tan φ ஆகியவற்றின் மதிப்புகளையும் காண்க.'
    }
  };
  const conditionId = 'c9-exercise-6-1-q6';
  const counterexample = {
    en: 'The proof uses a and b as positive lengths. The printed equation also allows b to be negative if a and b are treated as signed numbers. Take a = 3 and b = −4. For the acute angle with sine 3/5, the cosine is 4/5, so the two products have opposite signs.',
    ta: 'நிறுவலில் a, b ஆகியவை நேர்ம நீளங்கள். a, b ஆகியவற்றைக் குறியுள்ள எண்களாக எடுத்தால், கொடுக்கப்பட்ட சமன்பாட்டில் b எதிர்மமாகவும் இருக்கலாம். a = 3, b = −4 என்க. சைன் 3/5 உள்ள குறுங்கோணத்தின் கொசைன் 4/5. எனவே இரு பெருக்கற்பலன்களும் எதிரெதிர்க் குறிகளைக் கொண்டவை.',
    eq: 'b sin θ = −12/5 ≠ 12/5 = a cos θ',
    math: {latex:String.raw`b\sin\theta=-\dfrac{12}{5}\neq\dfrac{12}{5}=a\cos\theta`,fallback:'b sin θ = −12/5 ≠ 12/5 = a cos θ',display:true}
  };
  grade.items = grade.items.map(item => {
    if (!/^c9-exercise-6-[123]-q/.test(item.id) || item.id === 'c9-exercise-6-1-q2') return item;
    const question = Number(item.id.match(/-q(\d+)/)?.[1]);
    const laterTamilPage = question >= 3 || /-q2-(ii|iii)$/.test(item.id);
    const pages = {
      '6.1': [question === 10 ? 234 : 233, question >= 8 ? 248 : 247],
      '6.2': [238,laterTamilPage ? 253 : 252],
      '6.3': [241,255]
    }[item.exercise];
    const [enPage,taPage] = pages;
    const source = {
      source: englishBook,
      page: enPage,
      reference: `TN SCERT Grade 9 Mathematics, revised 2025. Exercise ${item.exercise}. English PDF p.${enPage} (printed p.${enPage-6}), Tamil PDF p.${taPage} (printed p.${taPage-6}).`
    };
    const questionText = prompts[item.id];
    const worked = item.id === conditionId ? {
      steps: [...item.steps,counterexample],
      answer: 'For positive side lengths, b sin θ = a cos θ. The printed equation alone does not ensure equality.',
      answerTa: 'நேர்மப் பக்க நீளங்களுக்கு b sin θ = a cos θ. கொடுக்கப்பட்ட சமன்பாடு மட்டும் சமத்துவத்தை உறுதி செய்யாது.'
    } : {};
    return {...item,...source,...(questionText ? {q:questionText} : {}),...worked};
  });
})();
