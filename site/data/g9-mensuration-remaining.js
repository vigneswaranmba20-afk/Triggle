// Grade 9 Mensuration 2025: original Triggle concepts for textbook §§7.3–7.5.
// English printed pp.251, 253–256, 258–261; Tamil printed pp.266–274.
// Tamil explanatory copy is a draft. This file contains no textbook worked-example questions.
(() => {
'use strict';
const prior = window.TRIGGLE_MENSURATION_PATH;
if(!prior || prior.chapterId!=='g9-ch7') return;
const more = [
  {
    "id": "g9-ch7-quadrilateral",
    "section": "7.3",
    "page": {
      "en": 251,
      "ta": 266
    },
    "title": {
      "en": "A quadrilateral is two triangles",
      "ta": "ஒரு நாற்கரம் — இரண்டு முக்கோணங்கள்"
    },
    "idea": {
      "en": "Draw one diagonal across a four-sided field. It makes two triangles, so the whole area is the sum of their areas.",
      "ta": "நாற்கரத்தில் ஒரு மூலைவிட்டத்தை வரையவும். அது இரண்டு முக்கோணங்களாகப் பிரியும். மொத்தப் பரப்பளவு அவற்றின் பரப்பளவுகளின் கூடுதலாகும்."
    },
    "rule": {
      "en": "Use Heron’s formula for each triangle when its three side lengths are known, then add their areas.",
      "ta": "ஒவ்வொரு முக்கோணத்தின் மூன்று பக்கங்களும் தெரிந்தால் ஹெரான் சூத்திரத்தைப் பயன்படுத்தி, பிறகு பரப்பளவுகளைக் கூட்டுக."
    },
    "math": {
      "latex": "A_{\\text{quadrilateral}}=A_{\\triangle ABC}+A_{\\triangle ACD}",
      "fallback": "Whole area = area of first triangle + area of second triangle",
      "display": true
    },
    "visual": {
      "kind": "g9m-quadrilateral"
    },
    "example": {
      "en": "A rhombus has four sides of 5 cm and a diagonal of 8 cm. Both halves are triangles with sides 5, 5 and 8 cm.",
      "ta": "நான்கு பக்கங்களும் 5 செ.மீ., மூலைவிட்டம் 8 செ.மீ. கொண்ட சாய்சதுரம் இரண்டு 5, 5, 8 செ.மீ. முக்கோணங்களாகப் பிரியும்."
    },
    "exampleMath": {
      "latex": "\\begin{aligned}s&=\\dfrac{5+5+8}{2}=9\\text{ cm}\\\\A_{\\triangle}&=\\sqrt{9(9-5)(9-5)(9-8)}\\\\&=12\\text{ cm}^{2}\\\\A_{\\text{whole}}&=12+12=24\\text{ cm}^{2}\\end{aligned}",
      "fallback": "Each triangle area is 12 square centimetres, so the rhombus area is 24 square centimetres.",
      "display": true
    },
    "deepDive": {
      "title": {
        "en": "Understand the idea",
        "ta": "கருத்தைப் புரிந்துகொள்வோம்"
      },
      "points": {
        "en": [
          "A quadrilateral has four sides. A diagonal joins two non-neighbouring vertices (corners).",
          "The diagonal belongs to both triangles but is not part of the outer perimeter.",
          "Do not double one triangle unless you know the other has equal area. Our rhombus has two equal triangles because all four sides match and they share a diagonal.",
          "A, B, C and D name corners. Area is measured in square units such as cm²."
        ],
        "ta": [
          "நாற்கரத்தில் நான்கு பக்கங்கள் உள்ளன. மூலைவிட்டம் என்பது எதிரான இரண்டு உச்சிகளை இணைக்கும் கோடு.",
          "மூலைவிட்டம் இரு முக்கோணங்களுக்கும் பொதுவாக இருக்கும்; வெளிப்புறச் சுற்றளவின் பகுதி அல்ல.",
          "இரு பரப்பளவுகளும் சமமாக இருக்கும் போது மட்டுமே ஒரு முக்கோணத்தின் பரப்பளவை இரட்டிப்பாக்கலாம்.",
          "A, B, C, D என்பவை உச்சிகள்; பரப்பளவின் அலகு சதுர செ.மீ. ஆகும்."
        ]
      }
    },
    "question": {
      "en": "A rhombus has sides of 13 cm and a diagonal of 10 cm. Its halves have sides 13, 13 and 10 cm each. What is its full area?",
      "ta": "ஒரு சாய்சதுரத்தின் ஒவ்வொரு பக்கமும் 13 செ.மீ., ஒரு மூலைவிட்டம் 10 செ.மீ. எனில் மொத்தப் பரப்பளவு எவ்வளவு?"
    },
    "choices": [
      {
        "en": "60 cm²",
        "ta": "60 செ.மீ²"
      },
      {
        "en": "120 cm²",
        "ta": "120 செ.மீ²"
      },
      {
        "en": "130 cm²",
        "ta": "130 செ.மீ²"
      }
    ],
    "correct": 1,
    "hint": {
      "en": "For each half, s=(13+13+10)/2=18. Find one area using Heron’s formula, then add both halves.",
      "ta": "ஒவ்வொரு பாதிக்கும் s=(13+13+10)/2=18. ஒரு பகுதியின் பரப்பளவைக் கண்டு, இரண்டையும் கூட்டுக."
    },
    "why": {
      "en": "Each 13–13–10 triangle has area 60 cm²; the whole rhombus has 60+60=120 cm².",
      "ta": "ஒவ்வொரு 13–13–10 முக்கோணத்தின் பரப்பளவு 60 செ.மீ². மொத்தம் 120 செ.மீ²."
    },
    "whyMath": {
      "latex": "\\begin{aligned}s&=18\\text{ cm}\\\\A_{\\triangle}&=\\sqrt{18\\cdot5\\cdot5\\cdot8}=60\\text{ cm}^{2}\\\\A_{\\text{whole}}&=2(60)=120\\text{ cm}^{2}\\end{aligned}",
      "fallback": "One triangle 60 square centimetres; two triangles 120 square centimetres.",
      "display": true
    },
    "practiceId": "g9-ch7-ex7.1-q7"
  },
  {
    "id": "g9-ch7-surface",
    "section": "7.4",
    "page": {
      "en": 253,
      "ta": 267
    },
    "title": {
      "en": "Surface area: wrapping a box",
      "ta": "புறப்பரப்பு: பெட்டியின் முகங்களை அளப்போம்"
    },
    "idea": {
      "en": "Imagine unfolding a box. Total Surface Area (TSA) counts all six faces. Lateral Surface Area (LSA) counts its four side walls without the top or bottom.",
      "ta": "ஒரு பெட்டியை விரித்துப் பாருங்கள். மொத்தப் புறப்பரப்பு (TSA) ஆறு முகங்களையும் உள்ளடக்கும். பக்கப்பரப்பு (LSA) மேல், அடிமுகங்களைத் தவிர்த்து நான்கு பக்க முகங்களைக் கொண்டது."
    },
    "rule": {
      "en": "For a cuboid, l is length, b is breadth and h is height. For a cube all three are equal to a.",
      "ta": "கனசெவ்வகத்தில் l = நீளம், b = அகலம், h = உயரம்; கனசதுரத்தில் மூன்றும் a என்ற ஒரே அளவு."
    },
    "math": {
      "latex": "\\begin{aligned}\\mathrm{TSA}_{\\text{cuboid}}&=2(lb+bh+lh)\\\\\\mathrm{LSA}_{\\text{cuboid}}&=2h(l+b)\\\\\\mathrm{TSA}_{\\text{cube}}&=6a^{2}\\\\\\mathrm{LSA}_{\\text{cube}}&=4a^{2}\\end{aligned}",
      "fallback": "Cuboid total = 2(lb+bh+lh); lateral = 2h(l+b); cube total = 6a²; lateral = 4a².",
      "display": true
    },
    "visual": {
      "kind": "g9m-surface"
    },
    "example": {
      "en": "For a 4×3×2 cm cuboid, top and bottom each cover 12 cm², front and back each cover 8 cm², and the remaining walls each cover 6 cm².",
      "ta": "4×3×2 செ.மீ. கனசெவ்வகத்தில் மேல், அடிமுகங்கள் தலா 12 செ.மீ²; முன், பின் முகங்கள் தலா 8 செ.மீ²; மற்ற முகங்கள் தலா 6 செ.மீ²."
    },
    "exampleMath": {
      "latex": "\\begin{aligned}\\mathrm{TSA}&=2(12+8+6)=52\\text{ cm}^{2}\\\\\\mathrm{LSA}&=2(8+6)=28\\text{ cm}^{2}\\end{aligned}",
      "fallback": "All six faces = 52 square centimetres. Four walls = 28 square centimetres.",
      "display": true
    },
    "deepDive": {
      "title": {
        "en": "Understand the idea",
        "ta": "கருத்தைப் புரிந்துகொள்வோம்"
      },
      "points": {
        "en": [
          "A face is one flat side of a solid. A cuboid has six rectangular faces in three matching pairs.",
          "TSA means Total Surface Area; LSA means Lateral Surface Area. The net below lays every face flat so you can count them.",
          "Two faces are the top and bottom, each with area l×b. Therefore, LSA = TSA − 2lb.",
          "A cube is a special cuboid: l=b=h=a. Each of its six equal square faces has area a².",
          "Surface area uses square units, not cubic units. It measures covering, not the space inside."
        ],
        "ta": [
          "முகம் என்பது ஒரு திண்மத்தின் தட்டையான பகுதி. கனசெவ்வகத்தில் மூன்று ஜோடிகளாக ஆறு செவ்வக முகங்கள் உள்ளன.",
          "TSA = மொத்தப் புறப்பரப்பு; LSA = நான்கு பக்க முகங்களின் பரப்பு. விரிக்கப்பட்ட வலைப்பகுதியில் ஒவ்வொரு முகத்தையும் எண்ணலாம்.",
          "மேல், அடிமுகங்கள் ஒவ்வொன்றும் l×b. ஆகவே LSA = TSA − 2lb.",
          "கனசதுரத்தில் l=b=h=a; ஒவ்வொரு சதுர முகத்தின் பரப்பளவு a².",
          "புறப்பரப்பு சதுர அலகுகளில் அளக்கப்படும்; கன அலகுகளில் அல்ல."
        ]
      }
    },
    "question": {
      "en": "A roofless room is 5 m long, 4 m broad and 2 m high. What is the combined area of its four walls, excluding floor and ceiling?",
      "ta": "5 மீ நீளம், 4 மீ அகலம், 2 மீ உயரம் கொண்ட அறையின் நான்கு சுவர்களின் பரப்பளவு என்ன? தரை, கூரை சேர்க்க வேண்டாம்."
    },
    "choices": [
      {
        "en": "36 m²",
        "ta": "36 மீ²"
      },
      {
        "en": "52 m²",
        "ta": "52 மீ²"
      },
      {
        "en": "80 m²",
        "ta": "80 மீ²"
      }
    ],
    "correct": 0,
    "hint": {
      "en": "Use only the four walls: LSA=2h(l+b).",
      "ta": "நான்கு சுவர்களை மட்டும் அளக்க LSA=2h(l+b)."
    },
    "why": {
      "en": "The four walls cover 2×2×(5+4)=36 square metres. No top or bottom is included.",
      "ta": "நான்கு சுவர்களின் மொத்தப் பரப்பு 2×2×(5+4)=36 சதுர மீட்டர். தரை, கூரை சேர்க்கப்படவில்லை."
    },
    "whyMath": {
      "latex": "\\mathrm{LSA}=2h(l+b)=2\\cdot2(5+4)=36\\text{ m}^{2}",
      "fallback": "The four walls cover 36 square metres.",
      "display": true
    },
    "practiceId": "g9-ch7-ex7.2-q1"
  },
  {
    "id": "g9-ch7-volume",
    "section": "7.5",
    "page": {
      "en": 258,
      "ta": 273
    },
    "title": {
      "en": "Volume: filling a box with cubes",
      "ta": "கனஅளவு: அலகுக் கனங்களால் பெட்டியை நிரப்புதல்"
    },
    "idea": {
      "en": "Volume measures the space inside a 3-D solid. A 1 cm by 1 cm by 1 cm cube occupies one cubic centimetre. Count the cubes in one layer, then the layers.",
      "ta": "கனஅளவு என்பது ஒரு முப்பரிமாண திண்மம் அடைக்கும் இடத்தின் அளவு. 1 செ.மீ. பக்கம் கொண்ட ஒரு அலகுக் கனத்தின் கனஅளவு 1 கன செ.மீ. முதலில் ஒரு அடுக்கிலுள்ள கனங்களை எண்ணி, பிறகு அடுக்குகளைக் கணக்கிடுக."
    },
    "rule": {
      "en": "One layer has l×b unit cubes and there are h layers. A cube has l=b=h=a.",
      "ta": "ஒரு அடுக்கில் l×b அலகுக் கனங்கள், மொத்தம் h அடுக்குகள். கனசதுரத்தில் l=b=h=a."
    },
    "math": {
      "latex": "\\begin{aligned}V_{\\text{cuboid}}&=l\\times b\\times h\\\\V_{\\text{cube}}&=a^{3}\\end{aligned}",
      "fallback": "Volume of a cuboid = length × breadth × height; cube = side cubed.",
      "display": true
    },
    "visual": {
      "kind": "g9m-volume"
    },
    "example": {
      "en": "A 4 cm × 3 cm × 2 cm box has 12 unit cubes per layer, and 2 layers, so it holds 24 cm³.",
      "ta": "4 × 3 × 2 செ.மீ. பெட்டியில் ஒரு அடுக்கில் 12 அலகுக் கனங்கள்; 2 அடுக்குகளில் மொத்தம் 24 கன செ.மீ."
    },
    "exampleMath": {
      "latex": "\\begin{aligned}\\text{One layer}&=4\\times3=12\\\\\\text{Two layers}&=12\\times2=24\\text{ cm}^{3}\\end{aligned}",
      "fallback": "Each layer has 12 cubes; 2 layers contain 24 unit cubes.",
      "display": true
    },
    "deepDive": {
      "title": {
        "en": "Understand the idea",
        "ta": "கருத்தைப் புரிந்துகொள்வோம்"
      },
      "points": {
        "en": [
          "Volume is measured in cubic units such as cm³ or m³; area is measured in square units such as cm² or m².",
          "A base layer contains length×breadth cubes. Multiply by height (the number of unit-thick layers).",
          "For a cube all edge lengths are a, so V=a×a×a=a³. The power 3 means multiply a by itself three times, not 3×a.",
          "Convert all dimensions to the same unit first. In capacity, 1 cm³ = 1 mL and 1000 cm³ = 1 litre.",
          "Even if only the top cubes are visible, the total volume counts cubes in every layer."
        ],
        "ta": [
          "கனஅளவு கன செ.மீ. (cm³) போன்ற கன அலகுகளில் அளக்கப்படுகிறது; பரப்பளவு சதுர அலகுகளில் அளக்கப்படுகிறது.",
          "ஒரு அடுக்கில் நீளம்×அகலம் அலகுக் கனங்கள் உள்ளன. உயரத்திற்கு ஏற்ப அடுக்குகளைப் பெருக்குக.",
          "கனசதுரத்தின் கனஅளவு a×a×a=a³; a³ என்பது 3×a அல்ல.",
          "அனைத்து நீளங்களையும் ஒரே அலகில் மாற்றுக. 1 cm³ = 1 mL; 1000 cm³ = 1 லிட்டர்.",
          "மேல் அடுக்கில் தெரியும் கனங்கள் மட்டும் அல்ல; எல்லா அடுக்குகளும் கனஅளவில் சேர்க்கப்படும்."
        ]
      }
    },
    "question": {
      "en": "A cube-shaped tank has an inner side length of 5 cm. How much space does it hold?",
      "ta": "ஒரு கனசதுர வடிவத் தொட்டியின் உள் பக்க நீளம் 5 செ.மீ. எனில் அதன் கனஅளவு என்ன?"
    },
    "choices": [
      {
        "en": "16 cm³",
        "ta": "16 செ.மீ³"
      },
      {
        "en": "12 cm³",
        "ta": "12 செ.மீ³"
      },
      {
        "en": "64 cm³",
        "ta": "64 செ.மீ³"
      }
    ],
    "correct": 2,
    "hint": {
      "en": "For a cube, V = a³. Multiply 5 × 5 × 5, not 3 × 5.",
      "ta": "கனசதுரத்திற்கு V = a³. 5 × 5 × 5 என பெருக்குக; 3 × 5 அல்ல."
    },
    "why": {
      "en": "A cube with side 4 cm contains 4 rows, 4 columns and 4 layers of unit cubes: 4×4×4=64 cm³.",
      "ta": "4 செ.மீ. பக்கமுள்ள கனசதுரத்தில் 4×4×4=64 அலகுக் கனங்கள் உள்ளன. கனஅளவு 64 கன செ.மீ."
    },
    "whyMath": {
      "latex": "V=a^{3}=4\\times4\\times4=64\\text{ cm}^{3}",
      "fallback": "Four cubed is 64 cubic centimetres.",
      "display": true
    },
    "practiceId": "g9-ch7-ex7.3-q1",
    "secondaryPracticeId": "g9-ch7-ex7.4-q1"
  }
];
window.TRIGGLE_MENSURATION_PATH=Object.freeze({...prior, stages:Object.freeze([...prior.stages,...more])});
})();
