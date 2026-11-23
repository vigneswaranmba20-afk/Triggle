/* Triggle · Grade 9 Chapter 5 · Distance between any two points.
 * Original, bilingual concept lesson aligned to the 2025 revised
 * Tamil Nadu State Board Mathematics books: EN §5.3 p.193 ff;
 * Tamil §5.3 p.206 ff. The coordinate example and check are original.
 * Tamil professional editorial review remains pending.
 * The approved narrated MP4 streams directly from Cloudflare R2 on a student tap.
 */
(()=>{'use strict';
window.TRIGGLE_G9_CH5_PATH={
  chapterId:'g9-ch5',
  source:'2025 revised Tamil Nadu Standard Nine Mathematics, §5.3 — EN printed pp.193–197; TA printed pp.206–211',
  tamilStatus:'authored translation; independent editorial review pending',
  approvedMedia:{
    file:'Triggle_G9_Distance_Formula_Narrated_Corrected.mp4',
    durationSeconds:75.6,
    sha256:'8ada907f59bf11788bad196fc8e3ec876de4bc5d98caef53fa50368d78277323',
    status:'hosted-on-cloudflare-r2'
  },
  stages:[{
    id:'g9-ch5-distance-formula',
    section:'5.3',
    page:{en:'193–197',ta:'206–211'},
    practiceId:'g9-ch5-ex5.2-q2',
    title:{
      en:'Distance between two points',
      ta:'இரு புள்ளிகளுக்கு இடைப்பட்ட தொலைவு'
    },
    rule:{
      en:'The straight-line distance between two points comes from the horizontal and vertical changes.',
      ta:'இரு புள்ளிகளின் நேர்க்கோட்டுத் தொலைவை, கிடைமட்ட மற்றும் செங்குத்து மாற்றங்களைக் கொண்டு காணலாம்.'
    },
    math:{
      latex:'d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}',
      fallback:'d = √[(x₂ − x₁)² + (y₂ − y₁)²]'
    },
    visual:{kind:'g9-distance-grid'},
    video:{src:'https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g9-ch5-distance-formula/8ada907f59bf11788bad196fc8e3ec876de4bc5d98caef53fa50368d78277323.mp4',durationSeconds:75.6,language:'en',provider:'cloudflare-r2'},
    idea:{
      en:'A straight line is the shortest path between two points on the plane. Moving across and then up forms a right triangle. The direct distance is its hypotenuse.',
      ta:'ஒரு தளத்தில் இரு புள்ளிகளுக்கு இடையேயான மிகக் குறுகிய பாதை அவற்றை இணைக்கும் நேர்க்கோடு. கிடைமட்டமாகவும் பின்னர் செங்குத்தாகவும் நகரும்போது ஒரு செங்கோண முக்கோணம் உருவாகிறது. நேர்க்கோட்டுத் தொலைவே அதன் கர்ணம்.'
    },
    example:{
      en:'For A(1, 2) and B(4, 6), the horizontal change is 4 − 1 = 3 units and the vertical change is 6 − 2 = 4 units. Apply Pythagoras to find the direct distance.',
      ta:'A(1, 2), B(4, 6) எனில் கிடைமட்ட மாற்றம் 4 − 1 = 3 அலகுகள்; செங்குத்து மாற்றம் 6 − 2 = 4 அலகுகள். பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தி நேர்க்கோட்டுத் தொலைவைக் காணலாம்.'
    },
    exampleMath:{
      latex:'\\begin{aligned}AB&=\\sqrt{(4-1)^2+(6-2)^2}\\\\&=\\sqrt{3^2+4^2}\\\\&=\\sqrt{9+16}=5\\text{ units}\\end{aligned}',
      fallback:'AB = √[(4 − 1)² + (6 − 2)²] = √(9 + 16) = 5 units'
    },
    deepDive:{
      title:{en:'Understand why it works',ta:'இது ஏன் சரி என்பதைப் புரிந்துகொள்வோம்'},
      points:{
        en:[
          'The x-values tell us how far apart the points are horizontally; the y-values tell us the vertical separation.',
          'A right triangle has horizontal leg |x₂ − x₁| and vertical leg |y₂ − y₁|. Squaring removes any minus signs.',
          'Pythagoras gives d² = (x₂ − x₁)² + (y₂ − y₁)². Distance is non-negative, so take the positive square root.',
          'If one coordinate is unchanged, this simplifies to the absolute difference of the other coordinates.'
        ],
        ta:[
          'x ஆயத்தொலைவுகளின் வேறுபாடு கிடைமட்ட இடைவெளியையும், y ஆயத்தொலைவுகளின் வேறுபாடு செங்குத்து இடைவெளியையும் காட்டுகின்றன.',
          'செங்கோண முக்கோணத்தின் இரு செங்குத்துப் பக்கங்கள் |x₂ − x₁| மற்றும் |y₂ − y₁|. வர்க்கம் செய்தால் எதிர்மறைக் குறிகள் நீங்குகின்றன.',
          'பிதாகரஸ் தேற்றப்படி d² = (x₂ − x₁)² + (y₂ − y₁)². தொலைவு எதிர்மறையாக இருக்காது; ஆகவே நேர்ம வர்க்கமூலம் எடுக்க வேண்டும்.',
          'இரு புள்ளிகளிலும் ஓர் ஆயத்தொலைவு சமமாக இருந்தால், மற்ற ஆயத்தொலைவுகளின் வேறுபாட்டின் மட்டு மதிப்பே தொலைவு.'
        ]
      }
    },
    question:{
      en:'Your turn: what is the distance between (0, 0) and (6, 8)?',
      ta:'நீங்களே முயற்சிக்கவும்: (0, 0), (6, 8) புள்ளிகளுக்கு இடையேயான தொலைவு என்ன?'
    },
    choices:[
      {en:'10 units',ta:'10 அலகுகள்'},
      {en:'14 units',ta:'14 அலகுகள்'},
      {en:'2 units',ta:'2 அலகுகள்'}
    ],
    correct:0,
    hint:{
      en:'Square the horizontal and vertical changes, add them, then take the square root.',
      ta:'கிடைமட்ட, செங்குத்து மாற்றங்களை வர்க்கம் செய்து கூட்டி, வர்க்கமூலம் காண்க.'
    },
    why:{
      en:'The two perpendicular changes are 6 and 8. The straight-line distance is 10, not the length 14 of the two-step route.',
      ta:'செங்குத்தான இரு மாற்றங்கள் 6 மற்றும் 8. இரு வழிகளில் செல்லும் 14 அலகுகள் அல்ல; நேர்க்கோட்டுத் தொலைவு 10 அலகுகள்.'
    },
    whyMath:{
      latex:'d=\\sqrt{6^2+8^2}=\\sqrt{36+64}=\\sqrt{100}=10',
      fallback:'d = √(6² + 8²) = √100 = 10'
    }
  }]
};
})();