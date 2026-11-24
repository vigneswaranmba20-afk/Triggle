// Grade 9 (2025 revised) Mensuration: original, interactive teaching.
// Authoritative scopes: English textbook printed pp.248–249; Tamil pp.262–263.
// Original Triggle practice, NOT an extracted textbook exercise.
// Tamil draft must receive editorial/teacher review before certified bilingual release.
(() => {
  'use strict';

  const math = (latex, fallback, fallbackTa) => ({
    latex, fallback, latexTa: latex.replaceAll('\\text{ cm}', '\\text{ செ.மீ.}').replaceAll('\\text{ m}', '\\text{ மீ.}'),
    fallbackTa, display: true
  });

  window.TRIGGLE_MENSURATION_PATH = Object.freeze({
    chapterId: 'g9-ch7',
    review: { english: 'authored-pending-live-qa', tamil: 'draft-review-pending' },
    stages: [{
      id: 'g9-ch7-heron',
      section: '7.2',
      page: { en: 249, ta: 263 },
      title: { en: 'Heron’s formula: area from three sides', ta: 'ஹெரான் சூத்திரம்: மூன்று பக்கங்களிலிருந்து பரப்பளவு' },
      idea: {
        en: 'A fence measures the length around a garden. Its area measures the ground inside. To find the area of a triangle from three sides, start by finding half its perimeter.',
        ta: 'தோட்டத்தைச் சுற்றி வேலி அமைக்கச் சுற்றளவு தேவை. வேலிக்குள் எவ்வளவு இடம் உள்ளது என்பதைப் பரப்பளவு காட்டும். மூன்று பக்கங்களைக் கொண்டு முக்கோணத்தின் பரப்பளவைக் காண முதலில் சுற்றளவின் பாதியைக் கணக்கிடுங்கள்.'
      },
      rule: { en: 'Find the semiperimeter s, then use Heron’s formula.', ta: 'அரைச் சுற்றளவு s-ஐக் கண்டு ஹெரான் சூத்திரத்தைப் பயன்படுத்துக.' },
      math: math('\\begin{aligned}s&=\\dfrac{a+b+c}{2}\\\\ A&=\\sqrt{s(s-a)(s-b)(s-c)}\\end{aligned}', 's = (a+b+c)/2; area = square root of s(s-a)(s-b)(s-c)', 'அரைச் சுற்றளவு s = (a + b + c)/2. பரப்பளவு A என்பது s(s − a)(s − b)(s − c)-இன் வர்க்கமூலம்.'),
      visual: { kind: 'g9m-heron' },
      example: {
        en: 'For side lengths 3 cm, 4 cm and 5 cm, the perimeter is 12 cm, so the semiperimeter is 6 cm.',
        ta: '3 செ.மீ., 4 செ.மீ., 5 செ.மீ. பக்கங்களின் சுற்றளவு 12 செ.மீ. ஆகும். எனவே அரைச் சுற்றளவு 6 செ.மீ.'
      },
      exampleMath: math('\\begin{aligned}s&=\\dfrac{3+4+5}{2}=6\\text{ cm}\\\\ A&=\\sqrt{6(6-3)(6-4)(6-5)}\\\\ &=\\sqrt{36}=6\\text{ cm}^{2}\\end{aligned}', 's=6 cm; area = sqrt(6 × 3 × 2 × 1) = 6 square centimetres', 'அரைச் சுற்றளவு 6 செ.மீ. பரப்பளவு 6 சதுர செ.மீ.'),
      deepDive: {
        title: { en: 'Understand the idea', ta: 'கருத்தைப் புரிந்துகொள்வோம்' },
        points: {
          en: [
            'The letters a, b and c stand for the three side lengths. The letter A is the area. These names are not measurements by themselves.',
            'Perimeter means the distance all around the triangle. Semi means half, so s is half the perimeter, not the full perimeter.',
            'Before using the formula, check that each pair of side lengths adds to more than the third side. Otherwise no non-flat triangle exists.',
            'Square units are essential: when sides are in centimetres, the final area is in cm². A side length in cm and an area in cm² are different quantities.',
            'The square root symbol √ asks for the nonnegative number whose square gives the expression inside it.',
            'The height is the perpendicular distance to the chosen base. If the base and height are known, multiply them and take half. Some triangles have their height outside the triangle.',
            'The area of a plane shape counts square units inside it. For a solid, surface area counts square units on the outside and volume counts cubic units inside.',
            'For an equilateral triangle of side a, the semiperimeter is three times half of a. The three differences in Heron’s formula are each half of a.'
          ],
          ta: [
            'a, b, c என்பவை மூன்று பக்க நீளங்களைக் குறிக்கின்றன. A என்பது பரப்பளவு.',
            'சுற்றளவு என்பது முக்கோணத்தின் எல்லையைச் சுற்றியுள்ள மொத்த நீளம். அரைச் சுற்றளவு என்பது அதன் பாதி.',
            'எந்த இரண்டு பக்கங்களின் நீளங்களின் கூடுதலும் மூன்றாவது பக்கத்தைவிட அதிகமாக இருக்க வேண்டும்.',
            'பக்க நீளம் செ.மீ. எனில் பரப்பளவு செ.மீ.²-இல் எழுதப்பட வேண்டும்.',
            '√ என்பது வர்க்கமூலக் குறி. உள்ளே உள்ள எண்ணை வர்க்கமாகத் தரும் எதிர்மறையற்ற எண்ணை இது குறிக்கும்.',
            'அடிப்பக்கத்திற்குச் செங்குத்தாக உள்ள தொலைவே குத்துயரம். அடிப்பக்கத்தையும் உயரத்தையும் பெருக்கி, அதில் பாதியை எடுத்தால் பரப்பளவு கிடைக்கும். சில முக்கோணங்களில் குத்துயரம் வெளியே அமையும்.',
            'தள உருவத்தின் பரப்பளவைச் சதுர அலகுகளில் அளக்கிறோம். ஒரு திண்மத்தின் வெளிப்புறப் பரப்பைச் சதுர அலகுகளிலும் உள்ளே அது அடைக்கும் இடத்தைக் கன அலகுகளிலும் அளக்கிறோம்.',
            'பக்கம் a கொண்ட சமபக்க முக்கோணத்தின் அரைச் சுற்றளவு, a-இன் பாதியைப்போல் மூன்று மடங்கு. ஹெரான் சூத்திரத்திலுள்ள மூன்று வித்தியாசங்களும் a-இன் பாதிக்குச் சமம்.'
          ]
        }
      },
      question: {
        en: 'A new triangular garden has side lengths 5 m, 12 m and 13 m. What is its area?',
        ta: 'ஒரு முக்கோணத் தோட்டத்தின் பக்க நீளங்கள் 5 மீ., 12 மீ., 13 மீ. எனில் அதன் பரப்பளவு என்ன?'
      },
      choices: [
        { en: '25 m²', ta: '25 மீ²', math: { latex: '25\\ \\mathrm{m}^{2}', fallback: '25 square metres', latexTa: '25\\ \\text{மீ.}^{2}', fallbackTa: '25 சதுர மீட்டர்' } },
        { en: '30 m²', ta: '30 மீ²', math: { latex: '30\\ \\mathrm{m}^{2}', fallback: '30 square metres', latexTa: '30\\ \\text{மீ.}^{2}', fallbackTa: '30 சதுர மீட்டர்' } },
        { en: '36 m²', ta: '36 மீ²', math: { latex: '36\\ \\mathrm{m}^{2}', fallback: '36 square metres', latexTa: '36\\ \\text{மீ.}^{2}', fallbackTa: '36 சதுர மீட்டர்' } }
      ],
      correct: 1,
      hint: {
        en: 'Take half the perimeter to find s. Subtract each side from s, then multiply those three differences by s under the square root.',
        ta: 'சுற்றளவின் பாதி s. அதிலிருந்து ஒவ்வொரு பக்க நீளத்தையும் தனித்தனியாகக் கழியுங்கள். அந்த மூன்று வித்தியாசங்களையும் s-உடன் பெருக்கி வர்க்கமூலம் காணுங்கள்.'
      },
      why: {
        en: 'The semiperimeter is s = (5 + 12 + 13)/2 = 15 m. Substituting into √(15 × 10 × 3 × 2) = √900 gives 30 m².',
        ta: 'அரைச் சுற்றளவு s = 15 மீ. சூத்திரத்தில் மதிப்புகளைப் பதிலிடும்போது √(15 × 10 × 3 × 2) = √900 = 30 மீ².'
      },
      whyMath: math('\\begin{aligned}s&=15\\text{ m}\\\\ A&=\\sqrt{15(15-5)(15-12)(15-13)}\\\\ &=\\sqrt{900}=30\\text{ m}^{2}\\end{aligned}', 's=15 m; area=sqrt(900)=30 square metres', 'அரைச் சுற்றளவு 15 மீ. பரப்பளவு 30 சதுர மீட்டர்.'),
      quiz: {
        question: {
          en: 'A triangular park has sides 7 m, 24 m and 25 m. What is its area?',
          ta: 'ஒரு முக்கோணப் பூங்காவின் பக்கங்கள் 7 மீ., 24 மீ., 25 மீ. எனில் அதன் பரப்பளவு என்ன?'
        },
        choices: [
          { en: '72 m²', ta: '72 மீ²', math: { latex: '72\\ \\mathrm{m}^{2}', fallback: '72 square metres', latexTa: '72\\ \\text{மீ.}^{2}', fallbackTa: '72 சதுர மீட்டர்' } },
          { en: '84 m²', ta: '84 மீ²', math: { latex: '84\\ \\mathrm{m}^{2}', fallback: '84 square metres', latexTa: '84\\ \\text{மீ.}^{2}', fallbackTa: '84 சதுர மீட்டர்' } },
          { en: '96 m²', ta: '96 மீ²', math: { latex: '96\\ \\mathrm{m}^{2}', fallback: '96 square metres', latexTa: '96\\ \\text{மீ.}^{2}', fallbackTa: '96 சதுர மீட்டர்' } }
        ],
        correct: 1,
        hint: {
          en: 'Compute s = (7 + 24 + 25)/2 first, then evaluate √[s(s−7)(s−24)(s−25)].',
          ta: 'முதலில் s = (7 + 24 + 25)/2 காண்க; பின்னர் √[s(s−7)(s−24)(s−25)] கணக்கிடுக.'
        },
        why: {
          en: 'Here s = 28 m, so A = √(28 × 21 × 4 × 3) = √7056 = 84 m².',
          ta: 'இங்கு s = 28 மீ; A = √(28 × 21 × 4 × 3) = √7056 = 84 மீ².'
        }
      },
      explainAfterAttempt: true,
      practiceId: 'g9-ch7-ex7.1-q1'
    }]
  });

  // Each choice is a deliberately different mathematical case.
  const sides = Object.freeze([
    { id: 'right', a: 3, b: 4, c: 5 },
    { id: 'isosceles', a: 5, b: 5, c: 6 },
    { id: 'scaled', a: 6, b: 8, c: 10 },
    { id: 'impossible', a: 2, b: 3, c: 6 }
  ]);

  function isTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
  }
  function heron(a, b, c) {
    if (!isTriangle(a, b, c)) return null;
    const s = (a + b + c) / 2;
    return { s, area: Math.sqrt(s * (s - a) * (s - b) * (s - c)) };
  }
  const fmt = n => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(3)));

  function svgTriangle(a, b, c, ta) {
    // AB is side c, AC is side b, BC is side a. Scale without distorting lengths.
    const x = (b * b + c * c - a * a) / (2 * c);
    const y = Math.sqrt(Math.max(0, b * b - x * x));
    const scale = Math.min(200 / c, 120 / y);
    const A = { x: 58, y: 164 }, B = { x: 58 + c * scale, y: 164 }, C = { x: 58 + x * scale, y: 164 - y * scale };
    const line = (p, q) => '<line x1="' + fmt(p.x) + '" y1="' + fmt(p.y) + '" x2="' + fmt(q.x) + '" y2="' + fmt(q.y) + '"/>';
    const label = (x, y, name) => '<text x="' + fmt(x) + '" y="' + fmt(y) + '">' + name + '</text>';
    return '<svg class="g9m-triangle" viewBox="0 0 340 205" role="img" aria-label="' +
      (ta ? 'முக்கோணத்தின் பக்கங்கள் ' : 'Triangle sides ') + a + ', ' + b + ', ' + c +
      (ta ? ' செ.மீ. அடிப்பக்கத்திற்குச் செங்குத்தாக உயரம் காட்டப்பட்டுள்ளது.' : ' cm. The height is perpendicular to the base.') + '"> ' +
      '<g class="g9m-edges">' + line(A, B) + line(A, C) + line(B, C) + '</g>' +
      '<line x1="' + fmt(C.x) + '" x2="' + fmt(C.x) + '" y1="' + fmt(C.y) + '" y2="' + A.y +
        '" stroke="currentColor" stroke-dasharray="5 4"/>' +
      label(C.x + 8, (A.y + C.y) / 2, 'h') +
      '<g class="g9m-side-labels">' + label((A.x + C.x) / 2 - 26, (A.y + C.y) / 2 - 7, 'b=' + b) +
      label((B.x + C.x) / 2 + 13, (B.y + C.y) / 2 - 7, 'a=' + a) +
      label((A.x + B.x) / 2, 193, 'c=' + c) + '</g>' +
      '<g class="g9m-vertices">' + label(A.x - 13, A.y + 5, 'A') + label(B.x + 10, B.y + 5, 'B') +
      label(C.x, C.y - 12, 'C') + '</g></svg>';
  }

  function mountHeron(stage, host, lang) {
    if (!host || stage?.visual?.kind !== 'g9m-heron') return false;
    const ta = lang === 'ta';
    host.className = 'g9m-lab';
    const prompt = document.createElement('p');
    prompt.className = 'g9m-instruction';
    prompt.textContent = ta ? 'மூன்று பக்க நீளங்களை அறிந்தால் மட்டும் ஒரு முக்கோணத்தின் பரப்பளவைக் காண முடியுமா?' :
      'Can you measure the area of a triangular garden from its three sides alone?';
    const controls = document.createElement('div');
    controls.className = 'g9m-choices';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', ta ? 'முக்கோணத்தின் பக்கங்கள்' : 'Triangle side-length choices');
    const drawing = document.createElement('div');
    drawing.className = 'g9m-diagram';
    const result = document.createElement('div');
    result.className = 'g9m-result';
    result.setAttribute('role', 'status');
    result.setAttribute('aria-live', 'polite');

    const comparison = document.createElement('p');
    comparison.className = 'g9m-instruction';
    const paint = choice => {
      controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.id === choice.id)));
      const check = heron(choice.a, choice.b, choice.c);
      if (!check) {
        comparison.hidden = true;
        drawing.innerHTML = '<p class="g9m-impossible">' +
          (ta ? 'இந்த மூன்று நீளங்களால் முக்கோணம் உருவாகாது.' : 'These three lengths cannot form a triangle.') + '</p>';
        result.textContent = (ta ? '2 + 3 = 5; இது 6-ஐ விட அதிகமில்லை. முக்கோணம் உருவாக, எந்த இரண்டு பக்கங்களின் கூடுதலும் மூன்றாவது பக்கத்தைவிட அதிகமாக இருக்க வேண்டும்.' :
          '2 + 3 = 5, which is not greater than 6. The sum of any two sides must be greater than the third. There is no triangle—and no area to calculate.');
        return;
      }
      drawing.innerHTML = svgTriangle(choice.a, choice.b, choice.c, ta);
      const description = (ta ? 'அரைச் சுற்றளவு s = ' : 'Semiperimeter s = ') + fmt(check.s) +
        (ta ? ' செ.மீ. ' : ' cm. ') + (ta ? 'பரப்பளவு A = ' : 'Area A = ') + fmt(check.area) +
        (ta ? ' சதுர செ.மீ.' : ' cm².');
      result.textContent = description;
      const height = fmt(2 * check.area / choice.c);
      comparison.hidden = false;
      comparison.textContent = ta
        ? 'அடிப்பக்கம் c = ' + choice.c + ' செ.மீ., குத்துயரம் h = ' + height + ' செ.மீ. இவற்றின் பெருக்கற்பலனில் பாதியை எடுத்தாலும் அதே பரப்பளவு கிடைக்கும்.'
        : 'The base c is ' + choice.c + ' cm and the perpendicular height h is ' + height + ' cm. Half their product gives the same area.';
    };
    sides.forEach(choice => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.id = choice.id;
      button.setAttribute('aria-pressed', 'false');
      button.textContent = choice.a + ', ' + choice.b + ', ' + choice.c;
      button.setAttribute('aria-label', (ta ? 'பக்க நீளங்கள் ' : 'Sides ') + button.textContent + (ta ? ' செ.மீ.' : ' centimetres'));
      button.addEventListener('click', () => paint(choice));
      controls.append(button);
    });
    host.replaceChildren(prompt, controls, drawing, result, comparison);
    paint(sides[0]);
    return true;
  }

  window.TriggleG9MensurationLabs = Object.freeze({ mount: mountHeron, heron, isTriangle });
})();
