/* Solution plots for the revised 2025 Grade 9 exercise cards. */
(() => {
  'use strict';
  const plots = [
  {
    "id": "g9-ch3-ex3.10-q1-i",
    "figure": "./assets/grade9-ch3/ex3-10-q1-i.svg",
    "alt": {
      "en": "The line rises by two units every time x increases by one.",
      "ta": "x ஒரு அலகு அதிகரிக்கும்போதெல்லாம் y இரண்டு அலகு அதிகரிக்கிறது."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q1-ii",
    "figure": "./assets/grade9-ch3/ex3-10-q1-ii.svg",
    "alt": {
      "en": "The line crosses the vertical axis at −1 and rises four units for every unit to the right.",
      "ta": "நேர்க்கோடு y அச்சை −1-இல் வெட்டுகிறது. வலப்புறம் ஓர் அலகு நகர்ந்தால் நான்கு அலகு மேலே செல்கிறது."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q1-iii",
    "figure": "./assets/grade9-ch3/ex3-10-q1-iii.svg",
    "alt": {
      "en": "The line crosses the horizontal axis at −2 and the vertical axis at 3.",
      "ta": "நேர்க்கோடு x அச்சை −2-இலும் y அச்சை 3-இலும் வெட்டுகிறது."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q1-iv",
    "figure": "./assets/grade9-ch3/ex3-10-q1-iv.svg",
    "alt": {
      "en": "The line slopes downward through the three plotted points.",
      "ta": "குறிக்கப்பட்ட மூன்று புள்ளிகள் வழியாக நேர்க்கோடு இறங்குகிறது."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-i",
    "figure": "./assets/grade9-ch3/ex3-10-q2-i.svg",
    "alt": {
      "en": "The two lines cross once, at (5, 2).",
      "ta": "இரண்டு நேர்க்கோடுகளும் (5, 2) என்ற ஒரே புள்ளியில் வெட்டுகின்றன."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-ii",
    "figure": "./assets/grade9-ch3/ex3-10-q2-ii.svg",
    "alt": {
      "en": "A dashed line lies directly on the solid line. Every point on the shared line satisfies both equations.",
      "ta": "இடைவெளியிட்ட கோடு திடக்கோட்டின் மீதே அமைகிறது. அந்த ஒரே நேர்க்கோட்டில் உள்ள ஒவ்வொரு புள்ளியும் இரு சமன்பாடுகளுக்கும் பொருந்துகிறது."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-iii",
    "figure": "./assets/grade9-ch3/ex3-10-q2-iii.svg",
    "alt": {
      "en": "The two parallel lines have different vertical intercepts and never cross.",
      "ta": "இணையான இரண்டு நேர்க்கோடுகள் y அச்சை வெவ்வேறு புள்ளிகளில் வெட்டுகின்றன. அவை ஒன்றையொன்று வெட்டுவதில்லை."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-iv",
    "figure": "./assets/grade9-ch3/ex3-10-q2-iv.svg",
    "alt": {
      "en": "The diagonal and horizontal lines cross at (−3, −3).",
      "ta": "சாய்வுக்கோடும் கிடைக்கோடும் (−3, −3)-இல் வெட்டுகின்றன."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-v",
    "figure": "./assets/grade9-ch3/ex3-10-q2-v.svg",
    "alt": {
      "en": "The rising and falling lines cross at (1, 3).",
      "ta": "ஏறுமுக நேர்க்கோடும் இறங்குமுக நேர்க்கோடும் (1, 3)-இல் வெட்டுகின்றன."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q2-vi",
    "figure": "./assets/grade9-ch3/ex3-10-q2-vi.svg",
    "alt": {
      "en": "The vertical and horizontal lines cross at (−3, 3).",
      "ta": "குத்துக்கோடும் கிடைக்கோடும் (−3, 3)-இல் வெட்டுகின்றன."
    }
  },
  {
    "id": "g9-ch3-ex3.10-q3",
    "figure": "./assets/grade9-ch3/ex3-10-q3.svg",
    "alt": {
      "en": "The speed equations cross at (75, 25). Both axes measure miles per hour.",
      "ta": "வேகச் சமன்பாடுகளின் நேர்க்கோடுகள் (75, 25)-இல் வெட்டுகின்றன. இரு அச்சுகளிலும் அலகு மைல்/மணி."
    }
  },
  {
    "id": "g9-ch5-ex5.6-q4",
    "figure": "./assets/grade9-ch5/ex5-6-q4.svg",
    "alt": {
      "en": "P and T are in quadrant II. S is in quadrant III. Q and R are in quadrant IV.",
      "ta": "P மற்றும் T இரண்டாம் காற்பகுதியிலும், S மூன்றாம் காற்பகுதியிலும், Q மற்றும் R நான்காம் காற்பகுதியிலும் உள்ளன."
    }
  }
];
  const lineHint={
    en:'Two distinct points determine a straight line. A third point lets you check the line before extending it.',
    ta:'இரு வெவ்வேறு புள்ளிகள் ஒரு நேர்க்கோட்டைத் தீர்மானிக்கின்றன. கோட்டை நீட்டிக்கும் முன், மூன்றாவது புள்ளியும் அதில் உள்ளதா எனச் சரிபார்க்கலாம்.'
  };
  const systemHint={
    en:'A point solves both equations only if it belongs to both lines. Compare where the two lines meet.',
    ta:'இரண்டு நேர்க்கோடுகளிலும் அமையும் புள்ளி இரு சமன்பாடுகளுக்கும் தீர்வாகும். கோடுகள் சந்திக்கும் இடத்தைப் பார்.'
  };
  const quadrantHint={
    en:'Start at the origin. Move by the horizontal coordinate first and then by the vertical coordinate. Right and down places the point in quadrant IV.',
    ta:'ஆதியிலிருந்து முதலில் x ஆயத்தின்படி கிடைமட்டமாகவும், பிறகு y ஆயத்தின்படி செங்குத்தாகவும் நகர்க. வலப்புறமும் கீழ்ப்புறமும் நகர்ந்தால் புள்ளி நான்காம் காற்பகுதியில் அமையும்.'
  };
  const captions=[
    ['y = 2x','y = 2x'],['y = 4x − 1','y = 4x − 1'],['y = 3x/2 + 3','y = 3x/2 + 3'],['3x + 2y = 14','3x + 2y = 14'],
    ['One intersection','ஒரு வெட்டுப்புள்ளி'],['Coincident lines','ஒன்றிய நேர்க்கோடுகள்'],['Parallel lines','இணை நேர்க்கோடுகள்'],
    ['Diagonal and horizontal lines','சாய்வுக்கோடும் கிடைக்கோடும்'],['Intersecting lines','வெட்டிக்கொள்ளும் நேர்க்கோடுகள்'],
    ['Perpendicular lines','செங்குத்தாக வெட்டும் கோடுகள்'],['Graph of the two speeds','இரு வேகங்களின் வரைபடம்'],
    ['Points on the coordinate plane','ஆயத்தளத்தில் புள்ளிகள்']
  ];
  const byId = new Map(plots.map((plot,index) => [plot.id,{...plot,caption:{en:captions[index][0],ta:captions[index][1]}}]));
  window.TriggleG9FrontierGraphs = items => {
    for(const item of items) {
      const plot = byId.get(item.id);
      if(!plot)continue;
      item.figureSrc = plot.figure;
      item.figureAlt = plot.alt;
      item.figureCaption = plot.caption;
      item.figureInSolution = true;
      item.graphSolution = true;
      const hint=item.exercise==='5.6'?quadrantHint:item.id.includes('-q1-')?lineHint:systemHint;
      const last=item.steps.at(-1);
      last.why=hint;
    }
  };
})();
