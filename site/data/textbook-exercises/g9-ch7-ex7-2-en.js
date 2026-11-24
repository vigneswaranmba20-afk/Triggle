// Grade 9 English 2025 textbook, Exercise 7.2. Questions from user-provided SCERT PDF;
// original step-by-step solutions, mathematical source checks; Tamil and final visual review pending.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch7-ex7.2-q1",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q1",
      "ta": "பயிற்சி 7.2 · வினா 1"
    },
    "title": {
      "en": "Cuboid total and lateral areas",
      "ta": "கனசெவ்வகத்தின் பரப்புகள்"
    },
    "q": {
      "en": "Find the Total Surface Area and the Lateral Surface Area of a cuboid whose dimensions are: length = 20 cm, breadth = 15 cm and height = 8 cm",
      "ta": "பின்வரும் அளவுகளைக் கொண்ட கனசெவ்வகத்தின் மொத்தப்பரப்பு மற்றும் பக்கப் பரப்பைக் காண்க.\n(i) நீளம் = 20 செமீ, அகலம் = 15 செமீ மற்றும் உயரம் = 8 செமீ"
    },
    "steps": [
      {
        "en": "Use l=20,b=15,h=8 centimetres and the total surface area formula.",
        "ta": "நீளம் 20 செமீ, அகலம் 15 செமீ, உயரம் 8 செமீ. கனசெவ்வகத்தின் மொத்தப்பரப்புக்கான சூத்திரத்தை எழுதுக.",
        "eq": "TSA = 2(lb+bh+lh)",
        "mathTa": [
          "மொத்தப்பரப்பு = ",
          {
            "latex": "2 \\left(lb + bh + lh\\right)",
            "fallback": "2(lb+bh+lh)"
          }
        ]
      },
      {
        "en": "Substitute the dimensions.",
        "ta": "கொடுக்கப்பட்ட அளவுகளைப் பிரதியிட்டு ஆறு முகங்களின் மொத்தப்பரப்பைக் காண்க.",
        "eq": "TSA = 2(300+120+160) = 1160 cm²",
        "mathTa": [
          "மொத்தப்பரப்பு = ",
          {
            "latex": "2 \\left(300 + 120 + 160\\right) = 1160\\,\\mathrm{cm}^{2}",
            "fallback": "2(300+120+160) = 1160 cm²",
            "display": true
          }
        ]
      },
      {
        "en": "Find the four side faces without the top and bottom.",
        "ta": "மேல் மற்றும் கீழ் முகங்களை நீக்கி, நான்கு பக்கவாட்டு முகங்களின் பரப்பைக் காண்க.",
        "eq": "LSA = 2(l+b)h = 2(20+15)×8 = 560 cm²",
        "mathTa": [
          "பக்கப்பரப்பு = ",
          {
            "latex": "\\begin{aligned}&2 \\left(l + b\\right) h = 2 \\left(20 + 15\\right) \\times 8  \\\\ &= 560\\,\\mathrm{cm}^{2}\\end{aligned}",
            "fallback": "2(l+b)h = 2(20+15)×8 = 560 cm²",
            "display": true
          }
        ]
      }
    ],
    "answer": "TSA = 1160 cm²; LSA = 560 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "மொத்தப்பரப்பு = 1160 cm²; பக்கப்பரப்பு = 560 cm²",
    "answerMath": {
      "en": {
        "latex": "\\begin{aligned}&\\text{TSA} = 1160\\,\\mathrm{cm}^{2} \\\\ &\\text{LSA} = 560\\,\\mathrm{cm}^{2}\\end{aligned}",
        "fallback": "TSA = 1160 cm²; LSA = 560 cm²",
        "display": true
      },
      "ta": [
        "மொத்தப்பரப்பு = ",
        {
          "latex": "1160\\,\\mathrm{cm}^{2}",
          "fallback": "1160 cm²"
        },
        "; பக்கப்பரப்பு = ",
        {
          "latex": "560\\,\\mathrm{cm}^{2}",
          "fallback": "560 cm²"
        }
      ]
    }
  },
  {
    "id": "g9-ch7-ex7.2-q2",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q2",
      "ta": "பயிற்சி 7.2 · வினா 2"
    },
    "title": {
      "en": "Painting outer cuboid",
      "ta": "பெட்டிக்கு வண்ணம் பூசும் செலவு"
    },
    "q": {
      "en": "The dimensions of a cuboidal box are 6 m × 400 cm × 1.5 m. Find the cost of painting its entire outer surface at the rate of ₹22 per m².",
      "ta": "ஒரு கனசெவ்வக வடிவப் பெட்டியின் அளவுகளானது 6 மீ × 400 செமீ × 1.5 மீ ஆகும். அப்பெட்டியின் வெளிப்புறம் முழுவதும் வண்ணம் பூசுவதற்கு 1 சதுர மீட்டருக்கு ₹22 வீதம் ஆகும் எனில், மொத்தச் செலவைக் காண்க."
    },
    "steps": [
      {
        "en": "Convert all the dimensions to metres.",
        "ta": "எல்லா அளவுகளையும் மீட்டரில் எழுதுக. 400 செமீ என்பது 4 மீ.",
        "eq": "400 cm = 4 m"
      },
      {
        "en": "Painting the entire outer box means all six faces.",
        "ta": "முழு வெளிப்புறத்திற்கும் வண்ணம் பூசுவதால் ஆறு முகங்களின் பரப்புகளையும் சேர்க்கவும்.",
        "eq": "TSA = 2(6×4+4×1.5+6×1.5) = 78 m²",
        "mathTa": [
          "மொத்தப்பரப்பு = ",
          {
            "latex": "2 \\left(6 \\times 4 + 4 \\times 1.5 + 6 \\times 1.5\\right) = 78\\,\\mathrm{m}^{2}",
            "fallback": "2(6×4+4×1.5+6×1.5) = 78 m²",
            "display": true
          }
        ]
      },
      {
        "en": "Multiply by painting cost per square metre.",
        "ta": "அந்தப் பரப்பை ஒரு சதுர மீட்டருக்கான செலவால் பெருக்குக.",
        "eq": "Cost = 78×22 = ₹1716",
        "mathTa": [
          "செலவு = ",
          {
            "latex": "78 \\times 22",
            "fallback": "78×22"
          },
          " = ₹",
          {
            "latex": "1716",
            "fallback": "1716"
          }
        ]
      }
    ],
    "answer": "₹1716",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.2-q3",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q3",
      "ta": "பயிற்சி 7.2 · வினா 3"
    },
    "title": {
      "en": "Whitewashing walls and ceiling",
      "ta": "கூடத்திற்கு வெள்ளையடிக்கும் செலவு"
    },
    "q": {
      "en": "The dimensions of a hall is 10 m × 9 m × 8 m. Find the cost of white washing the walls and ceiling at the rate of ₹8.50 per m².",
      "ta": "ஒரு கூடத்தின் அளவு 10 மீ × 9 மீ × 8 மீ என்றவாறு உள்ளது. அக்கூடத்தின் சுவர்கள் மற்றும் மேற்கூரைக்கு வெள்ளையடிக்க ஒரு சதுர மீட்டருக்கு ₹8.50 வீதம் ஆகும் மொத்தச் செலவைக் காண்க."
    },
    "steps": [
      {
        "en": "The hall has length 10 m, breadth 9 m, height 8 m.",
        "ta": "கூடத்தின் நீளம் 10 மீ, அகலம் 9 மீ, உயரம் 8 மீ.",
        "eq": "l=10, b=9, h=8"
      },
      {
        "en": "Whitewash the four walls, excluding the floor.",
        "ta": "தரையை விலக்கி நான்கு சுவர்களின் பரப்பைக் காண்க.",
        "eq": "Wall area = 2(10+9)×8=304 m²",
        "mathTa": [
          "சுவர்களின் பரப்பு = ",
          {
            "latex": "2 \\left(10 + 9\\right) \\times 8 = 304\\,\\mathrm{m}^{2}",
            "fallback": "2(10+9)×8=304 m²",
            "display": true
          }
        ]
      },
      {
        "en": "Add the ceiling area once.",
        "ta": "மேற்கூரையின் பரப்பை ஒரு முறை கூட்டுக.",
        "eq": "Ceiling = 10×9=90 m²; total 394 m²",
        "mathTa": [
          "மேற்கூரை = ",
          {
            "latex": "10 \\times 9 = 90\\,\\mathrm{m}^{2}",
            "fallback": "10×9=90 m²"
          },
          "; மொத்தம் ",
          {
            "latex": "394\\,\\mathrm{m}^{2}",
            "fallback": "394 m²"
          }
        ]
      },
      {
        "en": "Apply the prescribed rate.",
        "ta": "மொத்தப் பரப்பை ஒரு சதுர மீட்டருக்கான வெள்ளையடிக்கும் செலவால் பெருக்குக.",
        "eq": "Cost = 394×₹8.50 = ₹3349",
        "mathTa": [
          "செலவு = ",
          {
            "latex": "394",
            "fallback": "394"
          },
          "×₹",
          {
            "latex": "8.50",
            "fallback": "8.50"
          },
          " = ₹",
          {
            "latex": "3349",
            "fallback": "3349"
          }
        ]
      }
    ],
    "answer": "₹3349",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.2-q4",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q4",
      "ta": "பயிற்சி 7.2 · வினா 4"
    },
    "title": {
      "en": "Cube TSA and LSA for three sides",
      "ta": "கனசதுரங்களின் பரப்புகள்"
    },
    "q": {
      "en": "Find the TSA and LSA of the cube whose side is (i) 8 m (ii) 21 cm  (iii) 7.5 cm",
      "ta": "கீழ்க்காணும் பக்க அளவைக் கொண்ட கனசதுரங்களின் மொத்தப்பரப்பு மற்றும் பக்கப்பரப்பைக் காண்க. (i) 8 மீ   (ii) 21 செமீ   (iii) 7.5 செமீ"
    },
    "steps": [
      {
        "en": "For a cube of side a, calculate all six faces and four lateral faces.",
        "ta": "பக்க நீளம் a உள்ள கனசதுரத்தில் மொத்தப்பரப்புக்கு ஆறு முகங்களையும் பக்கப்பரப்புக்கு நான்கு முகங்களையும் எடுத்துக்கொள்க.",
        "eq": "TSA=6a²; LSA=4a²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "6 a^{2}",
            "fallback": "6a²"
          },
          "; பக்கப்பரப்பு=",
          {
            "latex": "4 a^{2}",
            "fallback": "4a²"
          }
        ]
      },
      {
        "en": "Part (i): a=8 metres.",
        "ta": "(i) பக்க நீளம் 8 மீ எனப் பிரதியிடுக.",
        "eq": "TSA=6×64=384 m²; LSA=4×64=256 m²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "6 \\times 64 = 384\\,\\mathrm{m}^{2}",
            "fallback": "6×64=384 m²"
          },
          "; பக்கப்பரப்பு=",
          {
            "latex": "4 \\times 64 = 256\\,\\mathrm{m}^{2}",
            "fallback": "4×64=256 m²"
          }
        ]
      },
      {
        "en": "Part (ii): a=21 centimetres.",
        "ta": "(ii) பக்க நீளம் 21 செமீ எனப் பிரதியிடுக.",
        "eq": "TSA=6×441=2646 cm²; LSA=4×441=1764 cm²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "6 \\times 441 = 2646\\,\\mathrm{cm}^{2}",
            "fallback": "6×441=2646 cm²",
            "display": true
          },
          "; பக்கப்பரப்பு=",
          {
            "latex": "4 \\times 441 = 1764\\,\\mathrm{cm}^{2}",
            "fallback": "4×441=1764 cm²",
            "display": true
          }
        ]
      },
      {
        "en": "Part (iii): a=7.5 centimetres.",
        "ta": "(iii) பக்க நீளம் 7.5 செமீ எனப் பிரதியிடுக.",
        "eq": "TSA=6×56.25=337.5 cm²; LSA=4×56.25=225 cm²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "6 \\times 56.25 = 337.5\\,\\mathrm{cm}^{2}",
            "fallback": "6×56.25=337.5 cm²",
            "display": true
          },
          "; பக்கப்பரப்பு=",
          {
            "latex": "4 \\times 56.25 = 225\\,\\mathrm{cm}^{2}",
            "fallback": "4×56.25=225 cm²",
            "display": true
          }
        ]
      }
    ],
    "answer": "(i) 384 m², 256 m²; (ii) 2646 cm², 1764 cm²; (iii) 337.5 cm², 225 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.2-q5",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q5",
      "ta": "பயிற்சி 7.2 · வினா 5"
    },
    "title": {
      "en": "Lateral area from total cube area",
      "ta": "மொத்தப்பரப்பிலிருந்து பக்கப்பரப்பு"
    },
    "q": {
      "en": "If the total surface area of a cube is 2400 cm² then, find its lateral surface area.",
      "ta": "(i) ஒரு கனசதுரத்தின் மொத்தப்பரப்பு 2400 செமீ² எனில், அதன் பக்கப்பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "The total area is six congruent square faces.",
        "ta": "மொத்தப்பரப்பு ஆறு சர்வசமச் சதுர முகங்களின் பரப்புகளின் கூடுதல்.",
        "eq": "6a²=2400 cm²"
      },
      {
        "en": "Divide by six to find the area of one face.",
        "ta": "ஆறால் வகுத்து ஒரு முகத்தின் பரப்பைக் காண்க.",
        "eq": "a²=400 cm²"
      },
      {
        "en": "Lateral area comprises four such faces.",
        "ta": "நான்கு முகங்களின் பரப்பே பக்கப்பரப்பு.",
        "eq": "LSA=4a²=4×400=1600 cm²",
        "mathTa": [
          "பக்கப்பரப்பு=",
          {
            "latex": "\\begin{aligned}&4 a^{2} = 4 \\times 400  \\\\ &= 1600\\,\\mathrm{cm}^{2}\\end{aligned}",
            "fallback": "4a²=4×400=1600 cm²",
            "display": true
          }
        ]
      }
    ],
    "answer": "1600 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.2-q6",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q6",
      "ta": "பயிற்சி 7.2 · வினா 6"
    },
    "title": {
      "en": "Painting all faces of cubical container",
      "ta": "கொள்கலனுக்கு வண்ணம் பூசும் செலவு"
    },
    "q": {
      "en": "A cubical container of side 6.5 m is to be painted on the entire outer surface. Find the area to be painted and the total cost of painting it at the rate of ₹24 per m².",
      "ta": "6.5 மீ பக்க அளவுள்ள ஒரு கனசதுரக் கொள்கலனின் மேற்புறம் முழுவதும் வண்ணம் பூசப்படுகிறது. இதற்கு வண்ணம் பூச வேண்டிய பரப்பு மற்றும் 1 சதுர மீட்டருக்கு ₹24 வீதம் வண்ணம் பூச ஆகும் மொத்தச் செலவு ஆகியவற்றைக் காண்க."
    },
    "steps": [
      {
        "en": "Outer surface of a cube includes six square faces.",
        "ta": "கனசதுரத்தின் வெளிப்பரப்பில் ஆறு சதுர முகங்களும் அடங்கும்.",
        "eq": "TSA=6a²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "6 a^{2}",
            "fallback": "6a²"
          }
        ]
      },
      {
        "en": "Calculate painted area at a=6.5 metres.",
        "ta": "பக்க நீளம் 6.5 மீ எனப் பிரதியிட்டு வண்ணம் பூச வேண்டிய பரப்பைக் காண்க.",
        "eq": "A=6×6.5²=6×42.25=253.5 m²"
      },
      {
        "en": "Multiply by the ₹24/m² rate.",
        "ta": "பரப்பை ஒரு சதுர மீட்டருக்கான செலவான ₹24 ஆல் பெருக்குக.",
        "eq": "Cost=253.5×24=₹6084",
        "mathTa": [
          "செலவு=",
          {
            "latex": "253.5 \\times 24",
            "fallback": "253.5×24"
          },
          "=₹",
          {
            "latex": "6084",
            "fallback": "6084"
          }
        ]
      }
    ],
    "answer": "Area = 253.5 m²; cost = ₹6084",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "பரப்பு = 253.5 m²; செலவு = ₹6084",
    "answerMath": {
      "en": [
        {
          "latex": "\\begin{aligned}&\\text{Area} = 253.5\\,\\mathrm{m}^{2} \\\\ &\\text{cost}\\end{aligned}",
          "fallback": "Area = 253.5 m²; cost",
          "display": true
        },
        " = ₹",
        {
          "latex": "6084",
          "fallback": "6084"
        }
      ],
      "ta": [
        "பரப்பு = ",
        {
          "latex": "253.5\\,\\mathrm{m}^{2}",
          "fallback": "253.5 m²"
        },
        "; செலவு = ₹",
        {
          "latex": "6084",
          "fallback": "6084"
        }
      ]
    }
  },
  {
    "id": "g9-ch7-ex7.2-q7",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.2 · Q7",
      "ta": "பயிற்சி 7.2 · வினா 7"
    },
    "title": {
      "en": "Three cubes joined end to end",
      "ta": "கனசதுரங்களை இணைத்தல்"
    },
    "q": {
      "en": "Three identical cubes of side 4 cm are joined end to end. Find the total surface area and lateral surface area of the new resulting cuboid.",
      "ta": "4 செமீ பக்க அளவு உடைய ஒரே மாதிரியான மூன்று கனசதுரங்கள் ஒன்றோடு ஒன்று பக்கவாட்டில் இணைக்கப்படும்போது கிடைக்கும் புதிய கனசெவ்வகத்தின் மொத்தப் பரப்பு மற்றும் பக்கப் பரப்பு ஆகியவற்றைக் காண்க."
    },
    "steps": [
      {
        "en": "Joining three 4 cm cubes end to end makes dimensions 12×4×4 cm.",
        "ta": "4 செமீ பக்கமுள்ள மூன்று கனசதுரங்களை வரிசையாக இணைத்தால் நீளம் 12 செமீ, அகலம் 4 செமீ, உயரம் 4 செமீ.",
        "eq": "l=3×4=12 cm; b=h=4 cm"
      },
      {
        "en": "Compute the surface area of all six outer faces.",
        "ta": "ஆறு வெளி முகங்களின் மொத்தப்பரப்பைக் கணக்கிடுக.",
        "eq": "TSA=2(12×4+4×4+12×4)=224 cm²",
        "mathTa": [
          "மொத்தப்பரப்பு=",
          {
            "latex": "2 \\left(12 \\times 4 + 4 \\times 4 + 12 \\times 4\\right) = 224\\,\\mathrm{cm}^{2}",
            "fallback": "2(12×4+4×4+12×4)=224 cm²",
            "display": true
          }
        ]
      },
      {
        "en": "Compute the area of the four lateral faces of the resulting cuboid.",
        "ta": "புதிய கனசெவ்வகத்தின் நான்கு பக்கவாட்டு முகங்களின் பரப்பைக் கணக்கிடுக.",
        "eq": "LSA=2(12+4)×4=128 cm²",
        "mathTa": [
          "பக்கப்பரப்பு=",
          {
            "latex": "2 \\left(12 + 4\\right) \\times 4 = 128\\,\\mathrm{cm}^{2}",
            "fallback": "2(12+4)×4=128 cm²",
            "display": true
          }
        ]
      }
    ],
    "answer": "TSA = 224 cm²; LSA = 128 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.2 · printed p. 257 / PDF p. 263; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 263,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 263,
      "enPrintedPage": 257,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 278,
      "taPrintedPage": 272,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "மொத்தப்பரப்பு = 224 cm²; பக்கப்பரப்பு = 128 cm²",
    "answerMath": {
      "en": {
        "latex": "\\begin{aligned}&\\text{TSA} = 224\\,\\mathrm{cm}^{2} \\\\ &\\text{LSA} = 128\\,\\mathrm{cm}^{2}\\end{aligned}",
        "fallback": "TSA = 224 cm²; LSA = 128 cm²",
        "display": true
      },
      "ta": [
        "மொத்தப்பரப்பு = ",
        {
          "latex": "224\\,\\mathrm{cm}^{2}",
          "fallback": "224 cm²"
        },
        "; பக்கப்பரப்பு = ",
        {
          "latex": "128\\,\\mathrm{cm}^{2}",
          "fallback": "128 cm²"
        }
      ]
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch7');
if(!grade||!chapter)throw Error('Grade 9 chapter registration missing');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate content '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G9_CH7_EX7_2_EN=entries.map(x=>x.id);
})();
