(() => {
  'use strict';

  // These are authored Tamil equivalents for text inside worked formulas.
  // Unit symbols, point names, Roman numerals and operators keep their notation.
  const labels = {
    'A, B, C are collinear': 'A, B, C ஒரே கோட்டில் உள்ளன',
    'Adjacent': 'அடுத்த பக்கம்',
    'After 2nd coin:': 'இரண்டாம் சுண்டலுக்குப் பின்',
    'Answer': 'விடை',
    'Area': 'பரப்பளவு',
    'Area (i)': 'பரப்பளவு (i)',
    'Area (ii)': 'பரப்பளவு (ii)',
    'Area of circle': 'வட்டத்தின் பரப்பளவு',
    'Area of rectangle': 'செவ்வகத்தின் பரப்பளவு',
    'Cost': 'செலவு',
    'Exact final rounding': 'இறுதியில் சுற்றுதல்',
    'Exact:': 'துல்லிய மதிப்பு',
    'First coordinates': 'முதல் ஆயத்தொலைவுகள்',
    'GCF': 'மீ.பொ.வ.',
    'Height': 'உயரம்',
    'Hypotenuse': 'கர்ணம்',
    'I Quadrant': 'முதல் காற்பகுதி',
    'II Quadrant': 'இரண்டாம் காற்பகுதி',
    'III Quadrant': 'மூன்றாம் காற்பகுதி',
    'IV Quadrant': 'நான்காம் காற்பகுதி',
    'Infinitely many solutions': 'எண்ணற்ற தீர்வுகள்',
    'Length': 'நீளம்',
    'Mean': 'சராசரி',
    'Mid': 'நடுப்புள்ளி',
    'Mid-point of': 'நடுப்புள்ளி',
    'No solution': 'தீர்வு இல்லை',
    'Not a multiple': 'மடங்கல்ல',
    'Null set': 'வெற்றுக் கணம்',
    'Opposite': 'எதிர்ப்பக்கம்',
    'Parallel lines': 'இணைகோடுகள்',
    'Point': 'புள்ளி',
    'Points:': 'புள்ளிகள்',
    'Prime sums:': 'பகா எண் கூடுதல்கள்',
    'Radius': 'ஆரம்',
    'Ratio': 'விகிதம்',
    'Remainder': 'மீதி',
    'Rounded': 'சுற்றிய மதிப்பு',
    'Second coordinates': 'இரண்டாம் ஆயத்தொலைவுகள்',
    'Straight line lying on': 'அச்சின் மீது அமைந்த நேர்க்கோடு',
    'Straight line parallel to': 'அச்சுக்கு இணையான நேர்க்கோடு',
    'Time': 'நேரம்',
    'Total postage cost': 'மொத்த அஞ்சல் செலவு',
    'Trapezium': 'சரிவகம்',
    'Unique solution': 'ஒரே ஒரு தீர்வு',
    'Unrounded:': 'சுற்றாத மதிப்பு',
    'Vidhya is more consistent': 'வித்யாவின் செயல்திறன் அதிக நிலைத்தன்மை கொண்டது',
    '(not possible)': '(சாத்தியமில்லை)',
    '-abscissa': '-ஆயத்தொலைவு',
    '-axis': '-அச்சு',
    '-ordinate': '-ஆயத்தொலைவு',
    '1st coin:': 'முதல் சுண்டல்',
    '1st pick:': 'முதல் தேர்வு',
    '2nd pick:': 'இரண்டாம் தேர்வு',
    'and': 'மற்றும்',
    'base': 'அடிப்பக்கம்',
    'black or red': 'கருப்பு அல்லது சிவப்பு',
    'branches': 'கிளைகள்',
    'choices': 'தேர்வுகள்',
    'columns': 'நிரல்கள்',
    'cone': 'கூம்பு',
    'constant': 'மாறிலி',
    'cyl': 'உருளை',
    'deg': 'படி',
    'different days': 'வெவ்வேறு நாள்கள்',
    'displaced': 'இடம்பெயர்ந்த',
    'earth': 'மண்',
    'for all points': 'அனைத்துப் புள்ளிகளுக்கும்',
    'height': 'உயரம்',
    'hemi': 'அரைக்கோளம்',
    'hemisphere': 'அரைக்கோளம்',
    'is a factor': 'ஒரு காரணி',
    'is a parallelogram': 'ஓர் இணைகரம்',
    'letters': 'கடிதங்கள்',
    'lies on the': 'அமைவது',
    'minutes': 'நிமிடங்கள்',
    'minutes (approx)': 'நிமிடங்கள் (தோராயமாக)',
    'new': 'புதிய',
    'not white': 'வெள்ளை அல்லாதது',
    'or': 'அல்லது',
    'ord': 'வரிசை',
    'pipes': 'குழாய்கள்',
    'radicand': 'மூலக்குறியுள்',
    'red or green': 'சிவப்பு அல்லது பச்சை',
    'rem': 'எஞ்சியது',
    'remaining choices': 'எஞ்சிய தேர்வுகள்',
    'rows': 'நிரைகள்',
    'same day': 'ஒரே நாள்',
    'solid': 'திண்மம்',
    'sph': 'கோளம்',
    'sphere': 'கோளம்',
    'sq. feet': 'சதுர அடிகள்',
    'sq. units': 'சதுர அலகுகள்',
    'terms': 'உறுப்புகள்',
    'units': 'அலகுகள்',
    'verified': 'சரிபார்க்கப்பட்டது',
    'when': 'எனில்',
    'win': 'வெற்றி',
    'with': 'உடன்',
  };

  const axisEndings = {
    'Straight line parallel to': '-அச்சுக்கு இணையான நேர்க்கோடு',
    'Straight line lying on': '-அச்சின் மீதுள்ள நேர்க்கோடு',
    'lies on the': '-அச்சில் உள்ளது',
  };
  const axisLabel = /(Straight line parallel to|Straight line lying on|lies on the)\s+([xy])-axis/g;
  const texAxisLabel = /\\text\{\s*(Straight line parallel to|Straight line lying on|lies on the)\s*\}\s*([xy])\\text\{-axis\}/g;
  const seriesRange = /\\text\{\s*to\s*\}\s*n\s*\\text\{\s*terms\s*\}/g;
  const commonFactor = /^\\text\{\s*No common factor other than\s*\}\s*1$/;
  const texMidpoint = /\\text\{\s*Mid-point of\s*\}([A-Z]{2})/g;
  const textCommand = /\\(?:text|textrm|mathrm|operatorname)\s*\{([^{}]*)\}/g;
  const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function translate(value) {
    if (Array.isArray(value)) return value.map(translate);
    if (!value?.latex) return value;
    if (commonFactor.test(value.latex)) {
      return {...value,latex:'1\\text{ தவிர வேறு பொதுக் காரணி இல்லை}',fallback:'1 தவிர வேறு பொதுக் காரணி இல்லை'};
    }

    const replacements = new Map();
    const latex = value.latex
      .replace(seriesRange, ' n\\text{ உறுப்புகள் வரை}')
      .replace(texAxisLabel, (_, description, axis) => ' ' + axis + '\\text{' + axisEndings[description] + '}')
      .replace(texMidpoint, (_, segment) => ' ' + segment + '\\text{-இன் நடுப்புள்ளி}')
      .replace(textCommand, (literal, label) => {
        const phrase = label.trim();
        if (!Object.hasOwn(labels, phrase)) return literal;
        const tamil = labels[phrase];
        replacements.set(phrase, tamil);
        return '\\text{' + label.replace(phrase, tamil) + '}';
      });

    if (latex === value.latex) return value;
    let fallback = value.fallback;
    if (typeof fallback === 'string') {
      fallback = fallback.replace(/\bto n terms\b/g, 'n உறுப்புகள் வரை')
        .replace(axisLabel, (_, description, axis) => axis + axisEndings[description])
        .replace(/\bMid-point of ([A-Z]{2})\b/g,'$1-இன் நடுப்புள்ளி');
      for (const [english, tamil] of [...replacements].sort((first, second) => second[0].length - first[0].length)) {
        const word = new RegExp('(^|[^A-Za-z])' + escapePattern(english) + '(?![A-Za-z])', 'g');
        fallback = fallback.replace(word, (_, prefix) => prefix + tamil);
      }
    }
    return {...value,latex,fallback};
  }

  window.TriggleTamilFormulaLabels = {translate};
})();
