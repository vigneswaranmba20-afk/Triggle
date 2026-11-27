/* Responsive exact drawings for Grade 9 exercise and practice figures. */
(() => {
  'use strict';
  const radians = degrees => degrees * Math.PI / 180;
  const options = {axes: false, key: false, pointMarkers: false, caption: ''};
  const angleSumHeight = 1 / (1 / Math.tan(radians(55)) + 1 / Math.tan(radians(65)));
  const givenAngle = radians(24 + 24 / 60);
  const adjacent = 10 * Math.cos(givenAngle);
  const opposite = 10 * Math.sin(givenAngle);
  const lengths = {en: 'Side lengths', ta: 'பக்க நீளங்கள்'};
  const indigo = '#443878';
  const altitude = '#166353';
  const altitudeFoot = {bottomInset: 1.8, labelOffsets: {D: [[0,.9], [0,1.02], [0,1.14]]}};

  window.TriggleCoordinateFigures.register('', {
    'c9-4-4-practice-5': {
      ...options,
      points: {A: [0, 0], B: [1, 0], C: [angleSumHeight / Math.tan(radians(55)), angleSumHeight]},
      outlines: [['ABC', '#443878', .07]],
      pointLabels: {A: '55°', B: '65°', C: '60°'},
      directions: {A: [[-.3, 1], [1, 1]], B: [[.3, 1], [-1, 1]], C: [[0, -1], [1, -.5], [-1, -.5]]},
      description: {
        en: 'Triangle with angles 55°, 65° and 60°',
        ta: '55°, 65°, 60° கோணங்களைக் கொண்ட முக்கோணம்'
      },
      annotationLabel: {en: 'Angle sum', ta: 'கோணங்களின் கூடுதல்'},
      annotations: ['55° + 65° + 60° = 180°']
    },
    'c9-exercise-6-1-q2': {
      ...options, ...altitudeFoot,
      points: {A: [5, 12], B: [0, 0], C: [21, 0], D: [5, 0]},
      outlines: [['ABC', indigo, .07]], segments: ['AD'], segmentColors: {AD: altitude},
      directions: {A: [0,-1], B: [-1,1], C: [1,1]}, rightAngle: 'ADB',
      description: {
        en: 'Triangle ABC. D is on BC and AD is perpendicular to BC. AB = 13, BD = 5 and DC = 16.',
        ta: 'முக்கோணம் ABC. BC மீது D உள்ளது. AD ஆனது BC-க்குச் செங்குத்து. AB = 13, BD = 5, DC = 16.'
      },
      annotationLabel: lengths,
      annotations: ['AB = 13', 'BD = 5', 'DC = 16']
    },
    'c9-exercise-6-1-q9': {
      ...options, ...altitudeFoot,
      points: {A: [0, 0], B: [25, 0], C: [9, 12], D: [9, 0]},
      outlines: [['ABC', indigo, .07]], segments: ['CD'], segmentColors: {CD: altitude},
      directions: {A: [-1,1], B: [1,1], C: [0,-1]}, rightAngle: 'CDA',
      angleMarks: [{vertices:'CAB',label:'α'}, {vertices:'CBA',label:'β'},
        {vertices:'ACD',label:'θ'}, {vertices:'DCB',label:'φ'}],
      description: {
        en: 'Triangle ACB with altitude CD. Alpha is at A, beta is at B. At C, theta is left of CD and phi is right of CD.',
        ta: 'முக்கோணம் ACB-இன் குத்துயரம் CD. α ஆனது A-இலும் β ஆனது B-இலும் உள்ளது. C-இல் CD-க்கு இடப்புறம் θ, வலப்புறம் φ.'
      },
      annotationLabel: {en: 'Sides and angles', ta: 'பக்கங்களும் கோணங்களும்'},
      annotations: ['AC = 15', 'BC = 20', 'CD = 12', 'AD = 9', 'DB = 16',
        'α = ∠CAB', 'β = ∠CBA', 'θ = ∠ACD', 'φ = ∠DCB']
    },
    'c9-exercise-6-4-q4': {
      ...options,
      points: {A: [0, 0], B: [adjacent, 0], C: [adjacent, opposite]},
      outlines: [['ABC', '#443878', .07]],
      pointLabels: {A: '24°24′', B: null, C: null},
      directions: {A: [[1, 1], [0, 1], [1, .5]]},
      rightAngle: ['A', 'B', 'C'],
      description: {
        en: 'Right triangle with a 10 cm hypotenuse and an acute angle of 24°24′',
        ta: '10 செ.மீ கர்ணமும் 24°24′ குறுங்கோணமும் கொண்ட செங்கோண முக்கோணம்'
      },
      annotationLabel: lengths,
      annotations: [
        {en: 'Adjacent ≈ 9.105 cm', ta: 'அடுத்துள்ள பக்கம் ≈ 9.105 செ.மீ'},
        {en: 'Opposite ≈ 4.131 cm', ta: 'எதிர்ப்பக்கம் ≈ 4.131 செ.மீ'},
        {en: 'Hypotenuse = 10 cm', ta: 'கர்ணம் = 10 செ.மீ'}
      ]
    }
  });
})();
