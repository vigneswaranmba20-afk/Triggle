// Grade 9 Algebra §§3.1–3.8 (revised 2025): original interactive concepts in textbook order.
// Grounded in 2025 Tamil Nadu State Board Class 9 Mathematics (English pp. 78–137, Tamil pp. 84–148).
// Keep source exercise IDs and archived worked examples unchanged.
(() => {
  'use strict';
  const freeze = Object.freeze;

  window.TRIGGLE_ALGEBRA_PATH = freeze({
    chapterId: 'g9-ch3',
    source: '2025 revised Tamil Nadu State Board Class 9 Mathematics, Chapter 3 §§3.1–3.8',
    review: {
      english: '2025-source-pages-checked',
      tamil: 'draft-2025-textbook-terms-teacher-review-pending'
    },
    stages: freeze([
      freeze({
        id: 'g9-ch3-intro-expressions',
        section: '3.1',
        page: { en: 78, ta: 85 },
        title: {
          en: 'Variables, constants, terms and coefficients',
          ta: 'மாறிகள், மாறிலிகள், உறுப்புகள் மற்றும் கெழுக்கள்'
        },
        rule: {
          en: 'An algebraic expression combines constants and variables using +, −, ×, ÷.',
          ta: 'மாறிலிகளையும் மாறிகளையும் +, −, ×, ÷ கொண்டு இணைப்பது இயற்கணிதக் கோவை.'
        },
        math: {
          latex: '4x^2 - 7x + 5 = (4)\\cdot x^2 + (-7)\\cdot x + 5',
          fallback: '4x² − 7x + 5: terms 4x², −7x, 5; coefficients 4, −7; constant 5'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: '4x² − 7x + 5',
            spoken: 'four x squared minus seven x plus five',
            spokenTa: 'நான்கு எக்ஸ் வர்க்கம் கழித்தல் ஏழு எக்ஸ் கூட்டல் ஐந்து',
            math: '4x^2 - 7x + 5',
            chips: [
              ['4x²', 'coeff 4', 'கெழு 4', true],
              ['−7x', 'coeff −7', 'கெழு −7', true],
              ['+5', 'constant', 'மாறிலி', true]
            ],
            en: 'Three terms: 4x² (coefficient 4), −7x (coefficient −7, keep the minus sign!), and constant 5.',
            ta: 'மூன்று உறுப்புகள்: 4x² (கெழு 4), −7x (கெழு −7; குறை குறியைச் சேர்க்கவும்), மாறிலி 5.'
          },
          {
            label: 'x² − 7/2 x + 8',
            spoken: 'x squared minus seven halves x plus eight',
            spokenTa: 'எக்ஸ் வர்க்கம் கழித்தல் ஏழு பை இரண்டு எக்ஸ் கூட்டல் எட்டு',
            math: 'x^2 - \\dfrac{7}{2}x + 8',
            chips: [
              ['x²', 'coeff 1', 'கெழு 1', true],
              ['−(7/2)x', 'coeff −7/2', 'கெழு −7/2', true],
              ['+8', 'constant', 'மாறிலி', true]
            ],
            en: 'When no number is written before x², its coefficient is 1. Fractions like −7/2 can be coefficients.',
            ta: 'x²-க்கு முன் எண் இல்லாவிடில் கெழு 1. −7/2 போன்ற பின்னங்களும் கெழுவாக வரலாம்.'
          },
          {
            label: '6 − 2x² + 3x³',
            spoken: 'six minus two x squared plus three x cubed',
            spokenTa: 'ஆறு கழித்தல் இரண்டு எக்ஸ் வர்க்கம் கூட்டல் மூன்று எக்ஸ் கனம்',
            math: '6 - 2x^2 + 3x^3',
            chips: [
              ['3x³', 'coeff 3', 'கெழு 3', true],
              ['−2x²', 'coeff −2', 'கெழு −2', true],
              ['0·x', 'coeff 0', 'கெழு 0', true]
            ],
            en: 'The x term is missing, so the coefficient of x is 0. Always check signs and missing terms.',
            ta: 'இங்கு x உறுப்பு இல்லை; எனவே x-இன் கெழு 0. குறிகளையும் இல்லாத உறுப்புகளையும் கவனிக்கவும்.'
          }
        ],
        transfers: [
          {
            math: '5x^2 - 3x + 2',
            fallback: '5x² − 3x + 2: Is the coefficient of x equal to −3?',
            promptEn: 'In 5x² − 3x + 2, is the coefficient of x equal to −3?',
            promptTa: '5x² − 3x + 2-இல் x-இன் கெழு −3 ஆகுமா?',
            yesEn: 'Yes, −3', yesTa: 'ஆம், −3', noEn: 'No, +3', noTa: 'இல்லை, +3',
            answer: true,
            en: 'The term is −3x, so the coefficient of x includes the minus sign: −3.',
            ta: 'உறுப்பு −3x என்பதால் x-இன் கெழு −3 ஆகும்.'
          },
          {
            math: '4 + \\dfrac{2}{5}x^2',
            fallback: '4 + (2/5)x²: Is the coefficient of x equal to 0?',
            promptEn: 'In 4 + (2/5)x², is the coefficient of x equal to 0?',
            promptTa: '4 + (2/5)x²-இல் x-இன் கெழு 0 ஆகுமா?',
            yesEn: 'Yes, 0', yesTa: 'ஆம், 0', noEn: 'No, 2/5', noTa: 'இல்லை, 2/5',
            answer: true,
            en: 'There is no x term (2/5 is the coefficient of x²), so the coefficient of x is 0.',
            ta: 'இதில் x உறுப்பு இல்லை (2/5 என்பது x²-இன் கெழு). எனவே x-இன் கெழு 0.'
          }
        ],
        deepDive: {
          en: [
            'A variable (like x, y, z) represents an unknown or changing number; a constant (like 5, −9, π) has a fixed value.',
            'Terms are separated by + or − signs. Always attach the sign immediately to the left of a term to its coefficient.',
            'Like terms have the exact same variable raised to the exact same power (for example, 3x² and −5x²).'
          ],
          ta: [
            'மாறி (x, y, z) என்பது மாறும் மதிப்பைக் குறிக்கும்; மாறிலி (5, −9, π) என்பது நிலையான மதிப்பைக் கொண்டது.',
            'உறுப்புகள் + அல்லது − குறிகளால் பிரிக்கப்படுகின்றன. உறுப்புக்கு இடப்புறம் உள்ள குறியை எப்போதும் கெழுவுடன் சேர்க்கவும்.',
            'ஒத்த உறுப்புகள் ஒரே மாறியையும் ஒரே அடுக்கையும் பெற்றிருக்கும் (எ.கா: 3x², −5x²).'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.1-q2-i', 'g9-ch3-ex3.1-q2-ii', 'g9-ch3-ex3.1-q2-v']
      }),

      freeze({
        id: 'g9-ch3-what-is-polynomial',
        section: '3.2',
        page: { en: 81, ta: 88 },
        title: {
          en: 'Which expressions are polynomials?',
          ta: 'எவை பல்லுறுப்புக் கோவைகள்?'
        },
        lesson: 'powers-highlighter',
        relatedQuestionIds: ['g9-ch3-ex3.1-q1-i', 'g9-ch3-ex3.1-q1-iii', 'g9-ch3-ex3.1-q1-vi']
      }),

      freeze({
        id: 'g9-ch3-degree-standard-form',
        section: '3.2.1',
        page: { en: 83, ta: 90 },
        title: {
          en: 'Degree, types, standard form and operations',
          ta: 'படி, வகைகள், திட்ட வடிவம் மற்றும் செயல்பாடுகள்'
        },
        rule: {
          en: 'Degree is the highest power of the variable with a nonzero coefficient.',
          ta: 'பூச்சியமற்ற கெழுவைக் கொண்ட மாறியின் மிக உயர்ந்த அடுக்கே பல்லுறுப்புக் கோவையின் படி.'
        },
        math: {
          latex: 'p(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0 \\quad (a_n \\ne 0)',
          fallback: 'p(x) = aₙxⁿ + … + a₁x + a₀ (aₙ ≠ 0), degree = n'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'x − 9 + √7 x³ + 6x²',
            spoken: 'x minus nine plus root seven x cubed plus six x squared',
            spokenTa: 'எக்ஸ் கழித்தல் ஒன்பது கூட்டல் வர்க்கமூலம் ஏழு எக்ஸ் கனம் கூட்டல் ஆறு எக்ஸ் வர்க்கம்',
            math: '\\sqrt{7}x^3 + 6x^2 + x - 9',
            chips: [
              ['deg 3', 'cubic', 'முப்படி', true],
              ['4 terms', 'standard form', 'திட்ட வடிவம்', true]
            ],
            en: 'Standard form orders powers from highest to lowest: √7 x³ + 6x² + x − 9. Degree is 3 (cubic).',
            ta: 'திட்ட வடிவம் அடுக்குகளை இறங்கு வரிசையில் எழுதும்: √7 x³ + 6x² + x − 9. படி 3 (முப்படி).'
          },
          {
            label: '(x³ − x⁴ + 6x⁶) / x²',
            spoken: 'x cubed minus x to the fourth plus six x to the sixth, all over x squared',
            spokenTa: 'எக்ஸ் கனம் கழித்தல் எக்ஸ் அடுக்கு நான்கு கூட்டல் ஆறு எக்ஸ் அடுக்கு ஆறு வகுத்தல் எக்ஸ் வர்க்கம்',
            math: 'x - x^2 + 6x^4 \\quad (x \\ne 0)',
            chips: [
              ['6x⁴ − x² + x', 'simplify first', 'முதலில் சுருக்கவும்', true],
              ['deg 4', 'highest power 4', 'உயர் அடுக்கு 4', true]
            ],
            en: 'For x ≠ 0, divide each term by x² to get 6x⁴ − x² + x. The highest power is 4, not 6.',
            ta: 'x ≠ 0 எனில் ஒவ்வொரு உறுப்பையும் x²-ஆல் வகுக்க 6x⁴ − x² + x கிடைக்கும். படி 4.'
          },
          {
            label: 'deg(p) + deg(q)',
            spoken: 'degree of p times q equals degree of p plus degree of q',
            spokenTa: 'பி பெருக்கல் க்யூ-வின் படி சமம் பி-இன் படி கூட்டல் க்யூ-வின் படி',
            math: '\\deg(p \\cdot q) = \\deg(p) + \\deg(q)',
            chips: [
              ['deg 1 × deg 2', '→ deg 3', '→ படி 3', true],
              ['nonzero p, q', 'cubic product', 'முப்படிப் பெருக்கல்', true]
            ],
            en: 'Multiplying a degree-1 and degree-2 polynomial adds exponents: 1 + 2 = 3 (a cubic polynomial).',
            ta: 'படி 1 மற்றும் படி 2 கோவைகளைப் பெருக்க அடுக்குகள் கூடும்: 1 + 2 = 3 (முப்படி).'
          }
        ],
        transfers: [
          {
            math: '4 - 3x^3',
            fallback: '4 − 3x³: Is this a cubic polynomial (degree 3)?',
            promptEn: 'Is 4 − 3x³ a cubic polynomial (degree 3)?',
            promptTa: '4 − 3x³ என்பது முப்படிப் பல்லுறுப்புக் கோவையா (படி 3)?',
            yesEn: 'Yes, cubic (deg 3)', yesTa: 'ஆம், முப்படி (படி 3)', noEn: 'No, linear', noTa: 'இல்லை, ஒருபடி',
            answer: true,
            en: 'The highest power of x is 3 (in −3x³), so its degree is 3 — a cubic polynomial.',
            ta: 'x-இன் மிக உயர்ந்த அடுக்கு 3 என்பதால் இது படி 3 கொண்ட முப்படிப் பல்லுறுப்புக் கோவை.'
          },
          {
            math: '0',
            fallback: 'Zero polynomial 0: Is its degree equal to 0?',
            promptEn: 'Is the degree of the zero polynomial (0) equal to 0?',
            promptTa: 'பூச்சியப் பல்லுறுப்புக் கோவை 0-இன் படி 0 ஆகுமா?',
            yesEn: 'Yes, degree is 0', yesTa: 'ஆம், படி 0', noEn: 'No, undefined', noTa: 'இல்லை, வரையறுக்கப்படவில்லை',
            answer: false,
            en: 'Only a NONZERO constant (like 7) has degree 0. The degree of the zero polynomial is undefined.',
            ta: 'பூச்சியமற்ற மாறிலியின் படி மட்டுமே 0. பூச்சியப் பல்லுறுப்புக் கோவையின் படி வரையறுக்கப்படவில்லை.'
          }
        ],
        deepDive: {
          en: [
            'By degree: 0 (nonzero constant), 1 (linear), 2 (quadratic), 3 (cubic).',
            'By number of terms: 1 term (monomial), 2 terms (binomial), 3 terms (trinomial).',
            'When adding or subtracting polynomials, combine only like terms; when multiplying, distribute every term and add exponents.'
          ],
          ta: [
            'படியின் அடிப்படையில்: 0 (பூச்சியமற்ற மாறிலி), 1 (ஒருபடி), 2 (இருபடி), 3 (முப்படி).',
            'உறுப்புகளின் எண்ணிக்கையில்: 1 உறுப்பு (ஓருறுப்பு), 2 உறுப்பு (ஈருறுப்பு), 3 உறுப்பு (மூவுறுப்பு).',
            'கூட்டல்/கழித்தலில் ஒத்த உறுப்புகளை மட்டும் இணைக்கவும்; பெருக்கலில் ஒவ்வொரு உறுப்பையும் பெருக்கி அடுக்குகளைக் கூட்டவும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.1-q3-ii', 'g9-ch3-ex3.1-q4-i', 'g9-ch3-ex3.1-q5-i', 'g9-ch3-ex3.1-q12']
      }),

      freeze({
        id: 'g9-ch3-zeros-roots',
        section: '3.2.2',
        page: { en: 88, ta: 95 },
        title: {
          en: 'Value, zeros and roots of a polynomial',
          ta: 'பல்லுறுப்புக் கோவையின் மதிப்பு, பூச்சியங்கள் மற்றும் மூலங்கள்'
        },
        rule: {
          en: 'a is a zero of p(x) if and only if p(a) = 0 (graphically, an x-intercept).',
          ta: 'p(a) = 0 எனில் மட்டுமே a என்பது p(x)-இன் பூச்சியம் ஆகும் (வரைபடத்தில் x-அச்சு வெட்டுப்புள்ளி).'
        },
        math: {
          latex: 'p(a) = 0 \\iff a \\text{ is a zero of } p(x) \\iff a \\text{ is a root of } p(x) = 0',
          fallback: 'p(a) = 0 ⇔ a is a zero of p(x) ⇔ a is a root of p(x) = 0'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'p(x) = 2x + 5',
            spoken: 'p of x equals two x plus five',
            spokenTa: 'பி ஆஃப் எக்ஸ் சமம் இரண்டு எக்ஸ் கூட்டல் ஐந்து',
            math: '2x + 5 = 0 \\implies x = -\\dfrac{5}{2}',
            chips: [
              ['p(−5/2) = 0', 'zero is −5/2', 'பூச்சியம் −5/2', true],
              ['1 x-intercept', 'linear graph', 'நேர்க்கோடு', true]
            ],
            en: 'Set p(x) = 0 to find the zero: 2x + 5 = 0 gives x = −5/2. On the graph, the line crosses the x-axis once.',
            ta: 'பூச்சியம் காண p(x) = 0 என வைக்கவும்: 2x + 5 = 0 ⇒ x = −5/2. கோடு x-அச்சை ஒரு புள்ளியில் வெட்டும்.'
          },
          {
            label: 'y = x² − x − 2',
            spoken: 'y equals x squared minus x minus two',
            spokenTa: 'ஒய் சமம் எக்ஸ் வர்க்கம் கழித்தல் எக்ஸ் கழித்தல் இரண்டு',
            math: 'x^2 - x - 2 = (x-2)(x+1) = 0 \\implies x = -1,\\; 2',
            chips: [
              ['x = −1, 2', '2 zeros', '2 பூச்சியங்கள்', true],
              ['cuts x-axis twice', 'parabola', 'பரவளையம்', true]
            ],
            en: 'The curve crosses the x-axis at (−1, 0) and (2, 0), so it has 2 real zeros.',
            ta: 'வளைவரை x-அச்சை (−1, 0) மற்றும் (2, 0)-இல் வெட்டுகிறது; எனவே 2 பூச்சியங்கள் உள்ளன.'
          },
          {
            label: 'y = 7 (constant)',
            spoken: 'y equals seven, a nonzero constant',
            spokenTa: 'ஒய் சமம் ஏழு, பூச்சியமற்ற மாறிலி',
            math: 'p(x) = 7 \\ne 0 \\text{ for all } x',
            chips: [
              ['0 zeros', 'never hits x-axis', 'x-அச்சை வெட்டாது', true]
            ],
            en: 'A nonzero constant polynomial has NO zero. (By convention, every real number is a zero of the zero polynomial 0.)',
            ta: 'பூச்சியமற்ற மாறிலிப் பல்லுறுப்புக் கோவைக்குப் பூச்சியம் இல்லை.'
          }
        ],
        transfers: [
          {
            math: 'p(x) = 2x - 1,\\quad x = \\dfrac{1}{2}',
            fallback: 'Is x = 1/2 a zero of p(x) = 2x − 1?',
            promptEn: 'Is x = 1/2 a zero of p(x) = 2x − 1?',
            promptTa: 'p(x) = 2x − 1 என்ற கோவைக்கு x = 1/2 என்பது பூச்சியமா?',
            yesEn: 'Yes, p(1/2) = 0', yesTa: 'ஆம், p(1/2) = 0', noEn: 'No, p(1/2) ≠ 0', noTa: 'இல்லை, p(1/2) ≠ 0',
            answer: true,
            en: 'Substitute x = 1/2: p(1/2) = 2(1/2) − 1 = 1 − 1 = 0. So x = 1/2 is a zero.',
            ta: 'x = 1/2 எனப் பிரதியிட p(1/2) = 2(1/2) − 1 = 0. எனவே x = 1/2 ஒரு பூச்சியம்.'
          },
          {
            math: 'p(x) = ax + b \\quad (a \\ne 0)',
            fallback: 'What is the zero of p(x) = ax + b (a ≠ 0)?',
            promptEn: 'Is the zero of p(x) = ax + b (a ≠ 0) equal to −b/a?',
            promptTa: 'p(x) = ax + b (a ≠ 0)-இன் பூச்சியம் −b/a ஆகுமா?',
            yesEn: 'Yes, −b/a', yesTa: 'ஆம், −b/a', noEn: 'No, b/a', noTa: 'இல்லை, b/a',
            answer: true,
            en: 'Setting ax + b = 0 gives ax = −b, so x = −b/a (since a ≠ 0).',
            ta: 'ax + b = 0 ⇒ ax = −b ⇒ x = −b/a (a ≠ 0).'
          }
        ],
        deepDive: {
          en: [
            'A zero of a polynomial p(x) need not be 0 itself — it is any input value a that makes the output p(a) = 0.',
            'In a graph y = p(x), count how many times the curve intersects or touches the x-axis (horizontal axis), NOT the y-axis.',
            'A curve that fails the vertical line test (like a sideways parabola) does not represent a polynomial function y = p(x).'
          ],
          ta: [
            'பூச்சியம் என்பது 0 ஆகவே இருக்க வேண்டியதில்லை; p(a) = 0 எனத் தரும் எந்த மெய்யெண் a-வும் பூச்சியமே.',
            'y = p(x) வரைபடத்தில் வளைவரை x-அச்சை எத்தனை புள்ளிகளில் வெட்டுகிறது/தொடுகிறது என்பதே பூச்சியங்களின் எண்ணிக்கை.',
            'குத்துக்கோடு x-அச்சை வெட்டும் புள்ளிகளை எண்ணக் கூடாது; x-அச்சு வெட்டுப்புள்ளிகளை மட்டுமே எண்ண வேண்டும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.2-q1-i', 'g9-ch3-ex3.2-q3-ii', 'g9-ch3-ex3.2-q5-i', 'g9-ch3-ex3.2-q6-i']
      }),

      freeze({
        id: 'g9-ch3-remainder-factor',
        section: '3.3',
        page: { en: 92, ta: 100 },
        title: {
          en: 'Remainder Theorem and Factor Theorem',
          ta: 'மீதித் தேற்றம் மற்றும் காரணித் தேற்றம்'
        },
        rule: {
          en: 'Dividing p(x) by (x − a) leaves remainder p(a); (x − a) is a factor iff p(a) = 0.',
          ta: 'p(x)-ஐ (x − a)-ஆல் வகுக்கக் கிடைக்கும் மீதி p(a); p(a) = 0 எனில் மட்டுமே (x − a) ஒரு காரணி.'
        },
        math: {
          latex: '\\begin{aligned}p(x) \\div (x - a) &\\implies \\text{Remainder} = p(a) \\\\ p(a) = 0 &\\iff (x - a) \\text{ is a factor of } p(x)\\end{aligned}',
          fallback: 'p(x) ÷ (x − a) ⇒ Remainder = p(a); p(a) = 0 ⇔ (x − a) is a factor'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'Divisor (x − a)',
            spoken: 'Divisor x minus a gives remainder p of a',
            spokenTa: 'வகுத்தி x கழித்தல் a எனில் மீதி p of a',
            math: 'x - 3 = 0 \\implies x = 3 \\implies R = p(3)',
            chips: [
              ['x − 3 → p(3)', 'flip sign!', 'குறியை மாற்று!', true],
              ['p(3) = 0 → factor', 'exact divisor', 'மீதியின்றி வகுக்கும்', true]
            ],
            en: 'Always set the linear divisor to 0 first: x − 3 = 0 gives x = 3, so evaluate p(3).',
            ta: 'முதலில் வகுத்தியை 0-க்குச் சமப்படுத்தவும்: x − 3 = 0 ⇒ x = 3; எனவே p(3) காண்க.'
          },
          {
            label: 'Divisor (x + a)',
            spoken: 'Divisor x plus a gives remainder p of negative a',
            spokenTa: 'வகுத்தி x கூட்டல் a எனில் மீதி p of minus a',
            math: 'x + 3 = 0 \\implies x = -3 \\implies R = p(-3)',
            chips: [
              ['x + 3 → p(−3)', 'negative a', 'குறை மதிப்பு', true],
              ['watch (−3)² = +9', 'even vs odd power', 'இரட்டை/ஒற்றை அடுக்கு', true]
            ],
            en: 'For (x + 3), substitute x = −3. Be careful with signs: (−3)² = +9 while (−3)³ = −27.',
            ta: '(x + 3) எனில் x = −3 எனப் பிரதியிடவும். (−3)² = +9, (−3)³ = −27 எனக் குறியைக் கவனிக்கவும்.'
          },
          {
            label: 'Divisor (ax − b)',
            spoken: 'Divisor a x minus b gives remainder p of b over a',
            spokenTa: 'வகுத்தி a x கழித்தல் b எனில் மீதி p of b by a',
            math: '2x - 1 = 0 \\implies x = \\dfrac{1}{2} \\implies R = p\\!\\left(\\dfrac{1}{2}\\right)',
            chips: [
              ['2x − 1 → p(1/2)', 'fractional zero', 'பின்னப் பூச்சியம்', true]
            ],
            en: 'When the divisor is 2x − 1, its zero is x = 1/2, so the remainder is p(1/2).',
            ta: 'வகுத்தி 2x − 1 எனில் அதன் பூச்சியம் x = 1/2; எனவே மீதி p(1/2) ஆகும்.'
          }
        ],
        transfers: [
          {
            math: 'p(x) = x^{2018} + 2018 \\div (x - 1)',
            fallback: 'What is the remainder when x²⁰¹⁸ + 2018 is divided by (x − 1)?',
            promptEn: 'When x²⁰¹⁸ + 2018 is divided by (x − 1), is the remainder 2019?',
            promptTa: 'x²⁰¹⁸ + 2018-ஐ (x − 1)-ஆல் வகுக்கக் கிடைக்கும் மீதி 2019 ஆகுமா?',
            yesEn: 'Yes, 2019', yesTa: 'ஆம், 2019', noEn: 'No, 2018', noTa: 'இல்லை, 2018',
            answer: true,
            en: 'By the Remainder Theorem, remainder = p(1) = 1²⁰¹⁸ + 2018 = 1 + 2018 = 2019.',
            ta: 'மீதித் தேற்றப்படி, மீதி = p(1) = 1²⁰¹⁸ + 2018 = 1 + 2018 = 2019.'
          },
          {
            math: 'p(x) = 3x - 3,\\quad (x - 1)',
            fallback: 'Is (x − 1) a factor of 3x − 3?',
            promptEn: 'Is (x − 1) a factor of p(x) = x³ + 5x² − 10x + 4?',
            promptTa: 'p(x) = x³ + 5x² − 10x + 4-க்கு (x − 1) ஒரு காரணியா?',
            yesEn: 'Yes, p(1) = 0', yesTa: 'ஆம், p(1) = 0', noEn: 'No, p(1) ≠ 0', noTa: 'இல்லை, p(1) ≠ 0',
            answer: true,
            en: 'p(1) = 1 + 5 − 10 + 4 = 0. Since p(1) = 0, (x − 1) is a factor.',
            ta: 'p(1) = 1 + 5 − 10 + 4 = 0. எனவே (x − 1) ஒரு காரணியாகும்.'
          }
        ],
        deepDive: {
          en: [
            'Remainder Theorem works for any polynomial p(x) of degree ≥ 1 and any linear divisor (x − a) or (ax + b).',
            'Factor Theorem is the special case where the remainder is 0: p(a) = 0 ⇔ (x − a) is a factor.',
            'Quick shortcut: (x − 1) is a factor iff the sum of all coefficients is 0; (x + 1) is a factor iff sum of even-power coefficients equals sum of odd-power coefficients.'
          ],
          ta: [
            'படி ≥ 1 கொண்ட எந்தப் பல்லுறுப்புக் கோவைக்கும் மீதித் தேற்றம் பொருந்தும்.',
            'மீதி 0 ஆகும் சிறப்பு நிலையே காரணித் தேற்றம்: p(a) = 0 ⇔ (x − a) ஒரு காரணி.',
            'குறுக்குவழி: அனைத்துக் கெழுக்களின் கூடுதல் 0 எனில் (x − 1) காரணி; இரட்டைப் படை மற்றும் ஒற்றைப் படை அடுக்குகளின் கெழுக்களின் கூடுதல் சமமெனில் (x + 1) காரணி.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.3-q2-i', 'g9-ch3-ex3.3-q4', 'g9-ch3-ex3.3-q5', 'g9-ch3-ex3.3-q7-i']
      }),

      freeze({
        id: 'g9-ch3-algebraic-identities',
        section: '3.4',
        page: { en: 97, ta: 105 },
        title: {
          en: 'Algebraic Identities (squares, cubes & trinomials)',
          ta: 'இயற்கணித முற்றொருமைகள் (வர்க்கம் மற்றும் கனம்)'
        },
        rule: {
          en: 'An identity holds true for ALL values of its variables.',
          ta: 'மாறிகளின் எல்லா மதிப்புகளுக்கும் மெய்யாகும் சமன்பாடே முற்றொருமை.'
        },
        math: {
          latex: '\\begin{aligned}(a+b+c)^2 &= a^2+b^2+c^2+2(ab+bc+ca) \\\\ (a+b)^3 &= a^3+b^3+3ab(a+b) \\\\ a^3+b^3+c^3-3abc &= (a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\end{aligned}',
          fallback: '(a+b+c)² = a²+b²+c²+2(ab+bc+ca); (a+b)³ = a³+b³+3ab(a+b); a³+b³+c³−3abc = (a+b+c)(a²+b²+c²−ab−bc−ca)'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: '(a + b + c)²',
            spoken: 'a plus b plus c whole squared',
            spokenTa: 'ஏ கூட்டல் பி கூட்டல் சி முழு வர்க்கம்',
            math: '(x + 2y + 3z)^2 = x^2 + 4y^2 + 9z^2 + 4xy + 12yz + 6xz',
            chips: [
              ['3 squares', 'x² + 4y² + 9z²', 'மூன்று வர்க்கங்கள்', true],
              ['3 cross terms', '2ab + 2bc + 2ca', 'இருமடங்கு பெருக்கல்', true]
            ],
            en: 'Square each term, then add twice each pairwise product. Keep negative signs inside parentheses!',
            ta: 'ஒவ்வொரு உறுப்பையும் வர்க்கப்படுத்தி, இரு உறுப்புகளின் பெருக்கலின் இருமடங்கைக் கூட்டவும்.'
          },
          {
            label: '(a ± b)³',
            spoken: 'a plus or minus b whole cubed',
            spokenTa: 'ஏ கூட்டல் அல்லது கழித்தல் பி முழு கனம்',
            math: '98^3 = (100 - 2)^3 = 100^3 - 2^3 - 3(100)(2)(98) = 941192',
            chips: [
              ['(100 − 2)³', 'mental arithmetic', 'எளிய கணக்கீடு', true],
              ['alternating signs', '+ − + −', 'குறி மாற்றம்', true]
            ],
            en: 'Write 98 as (100 − 2) and apply (a − b)³ = a³ − b³ − 3ab(a − b) for fast exact calculation.',
            ta: '98 என்பதை (100 − 2) என எழுதி (a − b)³ முற்றொருமையைப் பயன்படுத்தலாம்.'
          },
          {
            label: 'a + b + c = 0',
            spoken: 'if a plus b plus c equals zero then a cubed plus b cubed plus c cubed equals 3abc',
            spokenTa: 'ஏ கூட்டல் பி கூட்டல் சி பூச்சியம் எனில் ஏ கனம் கூட்டல் பி கனம் கூட்டல் சி கனம் சமம் 3abc',
            math: 'a + b + c = 0 \\implies a^3 + b^3 + c^3 = 3abc',
            chips: [
              ['7 − 10 + 3 = 0', '7³−10³+3³ = 3(7)(−10)(3)', '−630', true]
            ],
            en: 'Whenever three numbers add to 0, the sum of their cubes equals 3 times their product!',
            ta: 'மூன்று எண்களின் கூடுதல் 0 எனில், அவற்றின் கனங்களின் கூடுதல் 3abc-க்குச் சமம்!'
          }
        ],
        transfers: [
          {
            math: 'a + \\dfrac{1}{a} = 6 \\implies a^3 + \\dfrac{1}{a^3} = \\;?',
            fallback: 'If a + 1/a = 6, is a³ + 1/a³ = 198?',
            promptEn: 'If a + 1/a = 6, does a³ + 1/a³ equal 198?',
            promptTa: 'a + 1/a = 6 எனில், a³ + 1/a³ = 198 ஆகுமா?',
            yesEn: 'Yes, 6³ − 3(6) = 198', yesTa: 'ஆம், 216 − 18 = 198', noEn: 'No, 216', noTa: 'இல்லை, 216',
            answer: true,
            en: 'Using (a + 1/a)³ = a³ + 1/a³ + 3(a + 1/a), we get 6³ − 3(6) = 216 − 18 = 198.',
            ta: '(a + 1/a)³ = a³ + 1/a³ + 3(a + 1/a) ⇒ 216 − 18 = 198.'
          },
          {
            math: '(x+a)(x+b)(x+c)',
            fallback: 'In (x+a)(x+b)(x+c), is the x² coefficient a+b+c?',
            promptEn: 'In (x + a)(x + b)(x + c), is the coefficient of x² equal to (a + b + c)?',
            promptTa: '(x + a)(x + b)(x + c)-இல் x²-இன் கெழு (a + b + c) ஆகுமா?',
            yesEn: 'Yes, a + b + c', yesTa: 'ஆம், a + b + c', noEn: 'No, abc', noTa: 'இல்லை, abc',
            answer: true,
            en: '(x+a)(x+b)(x+c) = x³ + (a+b+c)x² + (ab+bc+ca)x + abc.',
            ta: '(x+a)(x+b)(x+c) = x³ + (a+b+c)x² + (ab+bc+ca)x + abc.'
          }
        ],
        deepDive: {
          en: [
            'Never forget the cross terms: (a + b)² ≠ a² + b² and (a + b)³ ≠ a³ + b³.',
            'For (a − b)³, keep the signs straight: a³ − 3a²b + 3ab² − b³ = a³ − b³ − 3ab(a − b).',
            'When a + b + c = 0, the right-hand side of a³ + b³ + c³ − 3abc = (a+b+c)(...) becomes 0, giving a³ + b³ + c³ = 3abc.'
          ],
          ta: [
            'நடு உறுப்புகளை மறக்காதீர்கள்: (a + b)² ≠ a² + b², (a + b)³ ≠ a³ + b³.',
            '(a − b)³ = a³ − 3a²b + 3ab² − b³ = a³ − b³ − 3ab(a − b).',
            'a + b + c = 0 எனும்போது a³ + b³ + c³ = 3abc என்பது நேரடியாகக் கிடைக்கும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.4-q1-i', 'g9-ch3-ex3.4-q4-i', 'g9-ch3-ex3.4-q9', 'g9-ch3-ex3.4-q13-i']
      }),

      freeze({
        id: 'g9-ch3-factorisation',
        section: '3.5',
        page: { en: 102, ta: 110 },
        title: {
          en: 'Factorisation (common factors, identities & trinomials)',
          ta: 'காரணிப்படுத்துதல் (பொதுக் காரணி, முற்றொருமை, மூவுறுப்பு)'
        },
        rule: {
          en: 'Factorising reverses multiplication: write a polynomial as a product of lower-degree factors.',
          ta: 'காரணிப்படுத்துதல் என்பது பெருக்கலின் திருப்புகை: கோவையைப் படிக் குறைந்த காரணிகளின் பெருக்கற்பலனாக எழுதுதல்.'
        },
        math: {
          latex: 'ax^2 + bx + c = (kx + m)(lx + n) \\quad \\text{where } p+q = b,\\; p\\cdot q = ac',
          fallback: 'ax² + bx + c: split b into p + q where p·q = a·c'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'Common factor + grouping',
            spoken: 'Common factor and grouping',
            spokenTa: 'பொதுக் காரணி மற்றும் குழுவாக்கல்',
            math: 'ab - ac - mb + mc = a(b-c) - m(b-c) = (a-m)(b-c)',
            chips: [
              ['take GCD out first', 'always check step 1', 'முதலில் பொதுக் காரணி', true],
              ['group in pairs', 'matching bracket', 'இரு இணைகள்', true]
            ],
            en: 'Always pull out any common factor first! For 4 terms, group in pairs to expose a shared binomial.',
            ta: 'முதலில் பொதுக் காரணியை வெளியே எடுக்கவும்! 4 உறுப்புகள் இருப்பின் ஈரிணையாகப் பிரித்துப் பார்க்கவும்.'
          },
          {
            label: 'x² + 10x + 24',
            spoken: 'x squared plus ten x plus twenty four',
            spokenTa: 'எக்ஸ் வர்க்கம் கூட்டல் பத்து எக்ஸ் கூட்டல் இருபத்து நான்கு',
            math: 'x^2 + 10x + 24 = x^2 + 4x + 6x + 24 = (x+4)(x+6)',
            chips: [
              ['sum = 10', '4 + 6 = 10', 'கூடுதல் = 10', true],
              ['product = 24', '4 × 6 = 24', 'பெருக்கல் = 24', true]
            ],
            en: 'Find two numbers whose sum is b = 10 and product is ac = 24: 4 and 6. Split 10x = 4x + 6x and group.',
            ta: 'கூடுதல் 10 மற்றும் பெருக்கல் 24 தரும் எண்கள் 4, 6. நடு உறுப்பைப் பிரித்து (x+4)(x+6) எனப் பெறலாம்.'
          },
          {
            label: 'a³ ± b³ identities',
            spoken: 'sum and difference of cubes',
            spokenTa: 'கனங்களின் கூடுதல் மற்றும் வித்தியாசம்',
            math: '8x^3 + 125y^3 = (2x)^3 + (5y)^3 = (2x+5y)(4x^2 - 10xy + 25y^2)',
            chips: [
              ['a³+b³', '(a+b)(a²−ab+b²)', 'சூத்திரம்', true],
              ['a³−b³', '(a−b)(a²+ab+b²)', 'சூத்திரம்', true]
            ],
            en: 'Rewrite 8x³ + 125y³ as (2x)³ + (5y)³, then apply a³ + b³ = (a + b)(a² − ab + b²).',
            ta: '8x³ + 125y³ = (2x)³ + (5y)³ என எழுதி a³ + b³ முற்றொருமையைப் பயன்படுத்தவும்.'
          }
        ],
        transfers: [
          {
            math: '2a^2 + 9a + 10',
            fallback: 'To factorise 2a² + 9a + 10, split 9a into 4a + 5a?',
            promptEn: 'To factorise 2a² + 9a + 10, do we split 9a into 4a + 5a?',
            promptTa: '2a² + 9a + 10-ஐக் காரணிப்படுத்த 9a-ஐ 4a + 5a எனப் பிரிக்க வேண்டுமா?',
            yesEn: 'Yes (4+5=9, 4×5=20)', yesTa: 'ஆம் (4+5=9, 4×5=20)', noEn: 'No (2 and 5)', noTa: 'இல்லை (2 மற்றும் 5)',
            answer: true,
            en: 'Here ac = 2 × 10 = 20 and b = 9. Since 4 + 5 = 9 and 4 × 5 = 20, split 9a = 4a + 5a → (a + 2)(2a + 5).',
            ta: 'இங்கு ac = 2 × 10 = 20, b = 9. 4 + 5 = 9, 4 × 5 = 20 என்பதால் (a + 2)(2a + 5) கிடைக்கும்.'
          },
          {
            math: 'x^5 - 16x',
            fallback: 'Can x⁵ − 16x be factored as x(x²+4)(x+2)(x−2)?',
            promptEn: 'Does x⁵ − 16x factorise completely into x(x² + 4)(x + 2)(x − 2)?',
            promptTa: 'x⁵ − 16x = x(x² + 4)(x + 2)(x − 2) என முழுமையாகக் காரணிப்படுத்தலாமா?',
            yesEn: 'Yes, factor completely', yesTa: 'ஆம், முழுக் காரணி', noEn: 'No, stop at x(x⁴−16)', noTa: 'இல்லை, x(x⁴−16) போதும்',
            answer: true,
            en: 'Take x common: x(x⁴ − 16) = x(x² + 4)(x² − 4) = x(x² + 4)(x + 2)(x − 2).',
            ta: 'x(x⁴ − 16) = x(x² + 4)(x² − 4) = x(x² + 4)(x + 2)(x − 2).'
          }
        ],
        deepDive: {
          en: [
            'Check every factorisation by multiplying the factors back together (expansion check).',
            'Don’t stop halfway! Expressions like (x² − 4) can still factorise as (x + 2)(x − 2) using a² − b².',
            'Remember: sum of squares (x² + 4) does NOT factorise over real numbers.'
          ],
          ta: [
            'காரணிப்படுத்திய பின் காரணிகளை மீண்டும் பெருக்கி அசல் கோவை வருகிறதா எனச் சரிபார்க்கவும்.',
            'பாதியில் நிறுத்தாதீர்கள்: (x² − 4) போன்றவற்றை (x + 2)(x − 2) என மேலும் காரணிப்படுத்த வேண்டும்.',
            'x² + 4 போன்ற வர்க்கங்களின் கூடுதலை மெய்யெண்களில் காரணிப்படுத்த இயலாது.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.5-q1-i', 'g9-ch3-ex3.5-q4-i', 'g9-ch3-ex3.6-q1-i', 'g9-ch3-ex3.6-q2-i']
      }),

      freeze({
        id: 'g9-ch3-polynomial-division',
        section: '3.6',
        page: { en: 108, ta: 116 },
        title: {
          en: 'Division of polynomials & synthetic division',
          ta: 'பல்லுறுப்புக் கோவைகளின் வகுத்தல் மற்றும் தொகுமுறை வகுத்தல்'
        },
        rule: {
          en: 'Dividend = Divisor × Quotient + Remainder, where deg(r) < deg(d) or r(x) = 0.',
          ta: 'வகுபடும் கோவை = (வகுத்தி × ஈவு) + மீதி; படி(மீதி) < படி(வகுத்தி) அல்லது மீதி = 0.'
        },
        math: {
          latex: 'p(x) = d(x)\\,q(x) + r(x) \\quad (r(x)=0 \\text{ or } \\deg r < \\deg d)',
          fallback: 'p(x) = d(x)·q(x) + r(x)'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'Standard form & 0-placeholders',
            spoken: 'Standard form with zero placeholders',
            spokenTa: 'திட்ட வடிவம் மற்றும் பூச்சியக் கெழுக்கள்',
            math: '8x^3 - 1 = 8x^3 + 0x^2 + 0x - 1',
            chips: [
              ['8, 0, 0, −1', 'insert 0 for missing terms', 'இல்லா உறுப்புக்கு 0', true]
            ],
            en: 'Before synthetic division, write p(x) in descending powers and insert 0 for every missing power!',
            ta: 'தொகுமுறை வகுத்தலுக்கு முன் கோவையைத் திட்ட வடிவில் எழுதி, இல்லாத உறுப்புகளுக்கு 0 கெழு இடவும்.'
          },
          {
            label: 'Dividing by (ax + b)',
            spoken: 'Dividing by a x plus b',
            spokenTa: 'a x கூட்டல் b-ஆல் வகுத்தல்',
            math: '(8x^4 - 2x^2 + 6x + 5) \\div (4x + 1) \\implies x = -\\dfrac{1}{4},\\; q(x) = \\dfrac{q_0(x)}{4}',
            chips: [
              ['zero x = −1/4', 'divide quotient by 4', 'ஈவை 4-ஆல் வகுக்கவும்', true],
              ['remainder stays same', 'do not divide R', 'மீதியை வகுக்காதே', true]
            ],
            en: 'When dividing by (ax + b) with a ≠ 1, use x = −b/a, then divide the synthetic quotient by a (keep the remainder unchanged!).',
            ta: '(ax + b)-ஆல் வகுக்கும்போது, கிடைக்கும் ஈவை a-ஆல் வகுக்க வேண்டும்; ஆனால் மீதியை மாற்றக் கூடாது!'
          },
          {
            label: 'Factoring cubics',
            spoken: 'Factoring cubic polynomials using synthetic division',
            spokenTa: 'முப்படிப் பல்லுறுப்புக் கோவையைக் காரணிப்படுத்தல்',
            math: 'x^3 - 3x^2 - 10x + 24 = (x-2)(x^2 - x - 12) = (x-2)(x-4)(x+3)',
            chips: [
              ['find 1 root', 'reduce to quadratic', 'இருபடி ஆகக் குறை', true],
              ['factor quadratic', '3 linear factors', '3 நேரிய காரணிகள்', true]
            ],
            en: 'Find one linear factor (e.g. x − 2), use synthetic division to get the quadratic quotient, then factorise the quadratic.',
            ta: 'ஒரு காரணியைக் கண்டறிந்து, தொகுமுறை வகுத்தலால் இருபடி ஈவைப் பெற்று, அதையும் காரணிப்படுத்தவும்.'
          }
        ],
        transfers: [
          {
            math: 'x^3 - 7x + 6 \\text{ coefficients}',
            fallback: 'In synthetic division of x³ − 7x + 6, should the coefficients be [1, 0, −7, 6]?',
            promptEn: 'In synthetic division of x³ − 7x + 6, must you write coefficients as [1, 0, −7, 6]?',
            promptTa: 'x³ − 7x + 6-ஐத் தொகுமுறை வகுத்தல் செய்ய கெழுக்களை [1, 0, −7, 6] என எழுத வேண்டுமா?',
            yesEn: 'Yes, include 0 for x²', yesTa: 'ஆம், x²-க்கு 0 சேர்க்கவும்', noEn: 'No, [1, −7, 6]', noTa: 'இல்லை, [1, −7, 6]',
            answer: true,
            en: 'The x² term is missing, so its coefficient 0 must be included: 1, 0, −7, 6.',
            ta: 'x² உறுப்பு இல்லாததால் அதன் கெழு 0 கட்டாயம் சேர்க்கப்பட வேண்டும்: 1, 0, −7, 6.'
          },
          {
            math: 'p(x) \\div (2x - 1)',
            fallback: 'When dividing by (2x−1) using x=1/2, do you divide the remainder by 2?',
            promptEn: 'When dividing p(x) by (2x − 1) using x = 1/2, do you divide the REMAINDER by 2?',
            promptTa: 'p(x)-ஐ (2x − 1)-ஆல் வகுக்கும்போது, மீதியையும் 2-ஆல் வகுக்க வேண்டுமா?',
            yesEn: 'Yes, divide remainder', yesTa: 'ஆம், மீதியை வகுக்கவும்', noEn: 'No, only divide quotient', noTa: 'இல்லை, ஈவை மட்டும் வகுக்கவும்',
            answer: false,
            en: 'Only the quotient is divided by 2 (because 2x − 1 = 2(x − 1/2)); the remainder is unchanged!',
            ta: 'ஈவை மட்டுமே 2-ஆல் வகுக்க வேண்டும்; மீதி மாறாது!'
          }
        ],
        deepDive: {
          en: [
            'Always verify division with the Division Algorithm: multiply Divisor × Quotient + Remainder and check it equals the Dividend.',
            'Synthetic division works directly for linear divisors (x − a) or (ax + b). For higher-degree divisors, use polynomial long division.'
          ],
          ta: [
            'வகுத்தலை எப்போதும் (வகுத்தி × ஈவு + மீதி = வகுபடும் கோவை) எனச் சரிபார்க்கவும்.',
            'தொகுமுறை வகுத்தல் நேரிய வகுத்திகளுக்கு மட்டுமே நேரடியாகப் பயன்படும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.7-q1-i', 'g9-ch3-ex3.7-q5-i', 'g9-ch3-ex3.8-q1-i']
      }),

      freeze({
        id: 'g9-ch3-gcd',
        section: '3.7',
        page: { en: 114, ta: 123 },
        title: {
          en: 'Greatest Common Divisor (GCD) of polynomials',
          ta: 'பல்லுறுப்புக் கோவைகளின் மீப்பெரு பொது வகுத்தி (மீ.பொ.வ)'
        },
        rule: {
          en: 'Factorise each polynomial completely; take the product of common factors with their lowest powers.',
          ta: 'ஒவ்வொரு கோவையையும் காரணிப்படுத்தி, பொதுக் காரணிகளின் குறைந்த அடுக்குகளின் பெருக்கற்பலனை எடுக்கவும்.'
        },
        math: {
          latex: '\\gcd(a^m, a^n) = a^{\\min(m,n)}',
          fallback: 'GCD takes the minimum power of each common factor'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: '64x⁸, 240x⁶',
            spoken: '64 x to the 8 and 240 x to the 6',
            spokenTa: '64 எக்ஸ் அடுக்கு 8 மற்றும் 240 எக்ஸ் அடுக்கு 6',
            math: '\\gcd(64, 240) = 16,\\; \\gcd(x^8, x^6) = x^6 \\implies \\text{GCD} = 16x^6',
            chips: [
              ['GCD(64,240) = 16', 'numeric GCD', 'எண்களின் மீ.பொ.வ', true],
              ['min(8,6) = 6', 'lowest power x⁶', 'குறைந்த அடுக்கு x⁶', true]
            ],
            en: 'Find the GCD of the numerical coefficients (16) and multiply by the lowest common power of each variable (x⁶).',
            ta: 'எண் கெழுக்களின் மீ.பொ.வ (16) மற்றும் பொது மாறியின் குறைந்த அடுக்கு (x⁶) ஆகியவற்றைப் பெருக்கவும்.'
          },
          {
            label: '2a² + a, 4a² − 1',
            spoken: '2 a squared plus a and 4 a squared minus 1',
            spokenTa: '2 a வர்க்கம் கூட்டல் a மற்றும் 4 a வர்க்கம் கழித்தல் 1',
            math: 'a(2a+1) \\text{ and } (2a+1)(2a-1) \\implies \\text{GCD} = 2a + 1',
            chips: [
              ['factor first', 'common factor (2a+1)', 'பொதுக் காரணி (2a+1)', true]
            ],
            en: 'Factorise each polynomial first: 2a² + a = a(2a + 1) and 4a² − 1 = (2a + 1)(2a − 1). Common factor is (2a + 1).',
            ta: '2a² + a = a(2a + 1), 4a² − 1 = (2a + 1)(2a − 1). பொதுக் காரணி (2a + 1).'
          },
          {
            label: '4x³, y³, z³',
            spoken: '4 x cubed, y cubed, z cubed',
            spokenTa: '4 x கனம், y கனம், z கனம்',
            math: '\\gcd(4x^3, y^3, z^3) = 1',
            chips: [
              ['no common variable', 'GCD = 1', 'மீ.பொ.வ = 1', true]
            ],
            en: 'When polynomials share no common prime or variable factor, their GCD is 1 (never 0!).',
            ta: 'பொதுக் காரணிகள் இல்லையெனில் மீ.பொ.வ 1 ஆகும் (0 அல்ல!).'
          }
        ],
        transfers: [
          {
            math: '\\gcd(a^{m+1}, a^{m+2}, a^{m+3})',
            fallback: 'What is the GCD of a^(m+1), a^(m+2), a^(m+3)?',
            promptEn: 'Is the GCD of aᵐ⁺¹, aᵐ⁺², and aᵐ⁺³ equal to aᵐ⁺¹?',
            promptTa: 'aᵐ⁺¹, aᵐ⁺², aᵐ⁺³ ஆகியவற்றின் மீ.பொ.வ aᵐ⁺¹ ஆகுமா?',
            yesEn: 'Yes, lowest power aᵐ⁺¹', yesTa: 'ஆம், குறைந்த அடுக்கு aᵐ⁺¹', noEn: 'No, aᵐ⁺³', noTa: 'இல்லை, aᵐ⁺³',
            answer: true,
            en: 'Since m + 1 < m + 2 < m + 3, the smallest exponent is m + 1, so GCD = aᵐ⁺¹.',
            ta: 'மிகக் குறைந்த அடுக்கு m + 1 என்பதால் மீ.பொ.வ = aᵐ⁺¹.'
          },
          {
            math: '\\gcd(p^5, p^{11}, p^9)',
            fallback: 'Is the GCD of p⁵, p¹¹, p⁹ equal to p¹¹?',
            promptEn: 'Is the GCD of p⁵, p¹¹, and p⁹ equal to p¹¹?',
            promptTa: 'p⁵, p¹¹, p⁹ ஆகியவற்றின் மீ.பொ.வ p¹¹ ஆகுமா?',
            yesEn: 'Yes, p¹¹', yesTa: 'ஆம், p¹¹', noEn: 'No, p⁵', noTa: 'இல்லை, p⁵',
            answer: false,
            en: 'GCD takes the LOWEST common power (p⁵), not the highest (p¹¹ is the LCM).',
            ta: 'மீ.பொ.வ குறைந்த அடுக்கை (p⁵) மட்டுமே எடுக்கும்; p¹¹ என்பது மீ.சி.ம.'
          }
        ],
        deepDive: {
          en: [
            'Always factorise completely before picking common factors.',
            'Remember: GCD(any co-prime expressions) = 1. Watch out for sign-reversed factors like (a − 3x) and (3x − a) = −(a − 3x), which share (a − 3x)!'
          ],
          ta: [
            'பொதுக் காரணிகளைத் தேர்ந்தெடுக்கும் முன் முழுமையாகக் காரணிப்படுத்தவும்.',
            '(3x − a) = −(a − 3x) போன்ற குறி மாறிய காரணிகளிலும் பொதுக் காரணி உள்ளது என்பதைக் கவனிக்கவும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.9-q1-i', 'g9-ch3-ex3.9-q1-iv', 'g9-ch3-ex3.9-q2-iii', 'g9-ch3-ex3.9-q2-vi']
      }),

      freeze({
        id: 'g9-ch3-linear-two-vars',
        section: '3.8',
        page: { en: 116, ta: 125 },
        title: {
          en: 'Linear equations in two variables & solving systems',
          ta: 'இரு மாறிகளில் நேரிய சமன்பாடுகள் மற்றும் தீர்வு முறைகள்'
        },
        rule: {
          en: 'ax + by + c = 0 (a, b not both 0) graphs as a straight line; two lines can intersect, be parallel, or coincide.',
          ta: 'ax + by + c = 0 (a, b இரண்டும் பூச்சியமல்ல) ஒரு நேர்க்கோட்டைக் குறிக்கும்; இரு கோடுகள் வெட்டலாம், இணையாகலாம் அல்லது ஒன்றலாம்.'
        },
        math: {
          latex: '\\begin{aligned} \\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2} &\\implies \\text{Unique solution (Consistent)} \\\\ \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} &\\implies \\text{Infinite solutions (Consistent)} \\\\ \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2} &\\implies \\text{No solution (Inconsistent)} \\end{aligned}',
          fallback: 'a₁/a₂ ≠ b₁/b₂: unique; a₁/a₂ = b₁/b₂ = c₁/c₂: infinite; a₁/a₂ = b₁/b₂ ≠ c₁/c₂: no solution'
        },
        lesson: 'interactive-explorer',
        examples: [
          {
            label: 'Graphical & Substitution',
            spoken: 'Graphical and Substitution methods',
            spokenTa: 'வரைபட மற்றும் பிரதியிடல் முறைகள்',
            math: 'x+y=7,\\; x-y=3 \\implies (5, 2)',
            chips: [
              ['1/1 ≠ 1/(−1)', 'intersecting lines', 'வெட்டும் கோடுகள்', true],
              ['unique (5, 2)', 'consistent', 'ஒருங்கமைவுடையது', true]
            ],
            en: 'In substitution, express one variable from an equation (y = 7 − x) and substitute into the other.',
            ta: 'பிரதியிடல் முறையில் ஒரு மாறியை மற்றதன் வடிவில் எழுதி இரண்டாவது சமன்பாட்டில் பிரதியிடவும்.'
          },
          {
            label: 'Elimination & Cross-mult',
            spoken: 'Elimination and Cross multiplication',
            spokenTa: 'நீக்கல் மற்றும் குறுக்குப் பெருக்கல் முறைகள்',
            math: '\\dfrac{x}{b_1 c_2 - b_2 c_1} = \\dfrac{y}{c_1 a_2 - c_2 a_1} = \\dfrac{1}{a_1 b_2 - a_2 b_1}',
            chips: [
              ['standard form first', 'a₁x + b₁y + c₁ = 0', 'திட்ட வடிவம்', true],
              ['a₁b₂ − a₂b₁ ≠ 0', 'unique solution', 'ஒரே தீர்வு', true]
            ],
            en: 'For cross-multiplication, always rewrite both equations with = 0 on the right before reading a, b, c!',
            ta: 'குறுக்குப் பெருக்கலுக்கு முன் சமன்பாடுகளை ax + by + c = 0 வடிவில் மாற்றவும்.'
          },
          {
            label: 'Parallel vs Coinciding',
            spoken: 'Parallel versus coinciding lines',
            spokenTa: 'இணை கோடுகள் மற்றும் ஒன்றிய கோடுகள்',
            math: '3x+2y=4,\\; 9x+6y=12 \\implies \\dfrac{3}{9}=\\dfrac{2}{6}=\\dfrac{4}{12}',
            chips: [
              ['all ratios equal', 'infinite solutions', 'எண்ணற்ற தீர்வுகள்', true]
            ],
            en: 'If a₁/a₂ = b₁/b₂ = c₁/c₂, the two equations represent the exact same line (infinitely many solutions).',
            ta: 'மூன்று விகிதங்களும் சமமெனில் அவை ஒரே நேர்க்கோடு (எண்ணற்ற தீர்வுகள்).'
          }
        ],
        transfers: [
          {
            math: '4x+6y-1=0,\\; 2x+ky-7=0',
            fallback: 'For parallel lines 4x+6y−1=0 and 2x+ky−7=0, is k = 3?',
            promptEn: 'If 4x + 6y − 1 = 0 and 2x + ky − 7 = 0 are parallel lines, is k = 3?',
            promptTa: '4x + 6y − 1 = 0 மற்றும் 2x + ky − 7 = 0 இணை கோடுகளெனில் k = 3 ஆகுமா?',
            yesEn: 'Yes, 4/2 = 6/k ⇒ k = 3', yesTa: 'ஆம், 4/2 = 6/k ⇒ k = 3', noEn: 'No, k = 4', noTa: 'இல்லை, k = 4',
            answer: true,
            en: 'For parallel lines, a₁/a₂ = b₁/b₂ ≠ c₁/c₂. Here 4/2 = 6/k ⇒ k = 3 (and 2 ≠ −1/−7).',
            ta: 'இணை கோடுகளுக்கு 4/2 = 6/k ⇒ k = 3 (மற்றும் c₁/c₂ ≠ 2).'
          },
          {
            math: '2x - y = 6',
            fallback: 'Is (4, 2) a solution of 2x − y = 6?',
            promptEn: 'Is (4, 2) a solution of 2x − y = 6?',
            promptTa: '2x − y = 6 என்ற சமன்பாட்டின் ஒரு தீர்வு (4, 2) ஆகுமா?',
            yesEn: 'Yes, 2(4) − 2 = 6', yesTa: 'ஆம், 2(4) − 2 = 6', noEn: 'No', noTa: 'இல்லை',
            answer: true,
            en: 'Substitute x = 4, y = 2: 2(4) − 2 = 8 − 2 = 6. True!',
            ta: 'x = 4, y = 2 எனப் பிரதியிட 2(4) − 2 = 6. சரி!'
          }
        ],
        deepDive: {
          en: [
            'A single linear equation in two variables (like 2x − y = 6) has infinitely many solutions.',
            'For equations with 1/x and 1/y (like 4/x + 5y = 7), substitute u = 1/x (with x ≠ 0) to turn them into linear equations.',
            'Always check your solution (x, y) by substituting back into BOTH original equations.'
          ],
          ta: [
            'இரு மாறிகளில் அமைந்த ஒரு நேரிய சமன்பாட்டிற்கு எண்ணற்ற தீர்வுகள் உண்டு.',
            '1/x, 1/y உள்ள சமன்பாடுகளில் u = 1/x எனப் பிரதியிட்டு நேரிய சமன்பாடுகளாக மாற்றவும்.',
            'தீர்வு (x, y)-ஐ எப்போதும் இரு அசல் சமன்பாடுகளிலும் பிரதியிட்டுச் சரிபார்க்கவும்.'
          ]
        },
        relatedQuestionIds: ['g9-ch3-ex3.10-q2-i', 'g9-ch3-ex3.11-q1-i', 'g9-ch3-ex3.12-q1-i', 'g9-ch3-ex3.13-q1-i']
      })
    ])
  });
})();