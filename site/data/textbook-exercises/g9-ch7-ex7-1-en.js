// Grade 9 Mensuration, 2025 English and Tamil editions.
// Tamil question text checked against printed 267. Worked explanations translated from the canonical solution.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch7-ex7.1-q1",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q1",
      "ta": "பயிற்சி 7.1 · வினா 1"
    },
    "title": {
      "en": "Heron’s formula for two triangles",
      "ta": "ஹெரான் சூத்திரத்தால் இரு பரப்புகள்"
    },
    "q": {
      "en": "Using Heron’s formula, find the area of a triangle whose sides are\n(i) 10 cm, 24 cm, 26 cm         (ii) 1.8m, 8 m, 8.2 m",
      "ta": "ஹெரான் சூத்திரத்தைப் பயன்படுத்திப் பின்வரும் பக்க அளவுகளைக் கொண்ட முக்கோணத்தின் பரப்பைக் காண்க.\n(i) 10 செமீ, 24 செமீ, 26 செமீ     (ii) 1.8 மீ, 8 மீ, 8.2 மீ"
    },
    "steps": [
      {
        "en": "For both triangles use the semiperimeter s=(a+b+c)/2 and Heron’s formula.",
        "ta": "இரண்டு முக்கோணங்களுக்கும் அரைச் சுற்றளவு s=(a+b+c)/2 ஐக் கணக்கிட்டு, ஹெரான் சூத்திரத்தைப் பயன்படுத்துக.",
        "eq": "A = √[s(s−a)(s−b)(s−c)]"
      },
      {
        "en": "Part (i): the semiperimeter is 30 cm.",
        "ta": "(i) மூன்று பக்கங்களின் கூடுதலில் பாதி 30 செமீ.",
        "eq": "s = (10+24+26)/2 = 30 cm"
      },
      {
        "en": "Substitute each side into Heron’s expression.",
        "ta": "ஹெரான் சூத்திரத்தில் ஒவ்வொரு பக்கத்தின் அளவையும் பிரதியிடுக.",
        "eq": "A₁ = √(30×20×6×4) = √14400 = 120 cm²"
      },
      {
        "en": "Part (ii): the semiperimeter is 9 m.",
        "ta": "(ii) இம்முக்கோணத்தின் அரைச் சுற்றளவு 9 மீ.",
        "eq": "s = (1.8+8+8.2)/2 = 9 m"
      },
      {
        "en": "Find the second area and keep its unit in square metres.",
        "ta": "இரண்டாவது முக்கோணத்தின் பரப்பைக் கணக்கிட்டு, சதுர மீட்டரில் எழுதுக.",
        "eq": "A₂ = √(9×7.2×1×0.8) = √51.84 = 7.2 m²"
      }
    ],
    "answer": "(i) 120 cm²; (ii) 7.2 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q2",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q2",
      "ta": "பயிற்சி 7.1 · வினா 2"
    },
    "title": {
      "en": "Triangular ground levelling cost",
      "ta": "நிலத்தைச் சமப்படுத்தும் செலவு"
    },
    "q": {
      "en": "The sides of the triangular ground are 22 m, 120 m and 122 m. Find the area and cost of levelling the ground at the rate of ₹ 20 per m².",
      "ta": "ஒரு முக்கோண வடிவ நிலத்தின் பக்கங்கள் முறையே 22 மீ, 120 மீ மற்றும் 122 மீ எனில் வயலின் பரப்பளவைக் கணக்கிடுக. மேலும் வயலைச் சமப்படுத்த ஒரு சதுர மீட்டருக்கு ₹ 20 செலவாகும் எனில், வயலைச் சமப்படுத்த ஆகும் மொத்தச் செலவைக் கணக்கிடுக."
    },
    "steps": [
      {
        "en": "Find the semiperimeter.",
        "ta": "மூன்று பக்கங்களின் கூடுதலில் பாதியைக் கண்டு அரைச் சுற்றளவைப் பெறுக.",
        "eq": "s = (22+120+122)/2 = 132 m"
      },
      {
        "en": "Apply Heron’s formula to the three side lengths.",
        "ta": "மூன்று பக்க அளவுகளையும் ஹெரான் சூத்திரத்தில் பிரதியிட்டுப் பரப்பைக் காண்க.",
        "eq": "A = √(132×110×12×10) = 1320 m²"
      },
      {
        "en": "Multiply the area by ₹20 per square metre.",
        "ta": "ஒரு சதுர மீட்டருக்கான செலவு ₹20. பரப்பளவை 20 ஆல் பெருக்கி மொத்தச் செலவைக் காண்க.",
        "eq": "Cost = 1320×20 = ₹26,400",
        "mathTa": [
          "செலவு = ",
          {
            "latex": "1320 \\times 20",
            "fallback": "1320×20"
          },
          " = ₹",
          {
            "latex": "26{,}400",
            "fallback": "26,400"
          }
        ]
      }
    ],
    "answer": "Area = 1320 m²; cost = ₹26,400",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    },
    "answerTa": "பரப்பு = 1320 m²; செலவு = ₹26,400",
    "answerMath": {
      "en": [
        {
          "latex": "\\begin{aligned}&\\text{Area} = 1320\\,\\mathrm{m}^{2} \\\\ &\\text{cost}\\end{aligned}",
          "fallback": "Area = 1320 m²; cost",
          "display": true
        },
        " = ₹",
        {
          "latex": "26{,}400",
          "fallback": "26,400"
        }
      ],
      "ta": [
        "பரப்பு = ",
        {
          "latex": "1320\\,\\mathrm{m}^{2}",
          "fallback": "1320 m²"
        },
        "; செலவு = ₹",
        {
          "latex": "26{,}400",
          "fallback": "26,400"
        }
      ]
    }
  },
  {
    "id": "g9-ch7-ex7.1-q3",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q3",
      "ta": "பயிற்சி 7.1 · வினா 3"
    },
    "title": {
      "en": "Triangle with side ratio 5:12:13",
      "ta": "முக்கோண மனையின் பரப்பு"
    },
    "q": {
      "en": "The perimeter of a triangular plot is 600 m. If the sides are in the ratio 5:12:13, then find the area of the plot.",
      "ta": "ஒரு முக்கோண வடிவிலான மனையின் சுற்றளவு 600 மீ. அதன் பக்கங்கள் 5:12:13 என்ற விகிதத்தில் உள்ளன எனில் அந்த மனையின் பரப்பளவைக் காண்க."
    },
    "steps": [
      {
        "en": "Set the three sides to 5k, 12k and 13k.",
        "ta": "பக்கங்களின் நீளங்களை 5k, 12k, 13k எனக் கொள்க.",
        "eq": "5k + 12k + 13k = 600"
      },
      {
        "en": "Determine the scale k and actual side lengths.",
        "ta": "மூன்று பக்கங்களின் கூடுதல் 600 மீ என்பதால் k இன் மதிப்பையும் பக்கங்களின் நீளங்களையும் காண்க.",
        "eq": "k = 20; sides = 100, 240, 260 m",
        "mathTa": [
          {
            "latex": "k = 20",
            "fallback": "k = 20"
          },
          "; பக்கங்கள் = ",
          {
            "latex": "100, 240, 260\\,\\mathrm{m}",
            "fallback": "100, 240, 260 m",
            "display": true
          }
        ]
      },
      {
        "en": "Because 5²+12²=13², the scaled triangle is right-angled.",
        "ta": "5²+12²=13² என்பதால் இம்முக்கோணம் செங்கோண முக்கோணம். செங்கோணத்தை அமைக்கும் பக்கங்களைக் கொண்டு பரப்பைக் காண்க.",
        "eq": "A = (100×240)/2 = 12,000 m²"
      }
    ],
    "answer": "12,000 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q4",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q4",
      "ta": "பயிற்சி 7.1 · வினா 4"
    },
    "title": {
      "en": "Equilateral triangular area",
      "ta": "சமபக்க முக்கோணத்தின் பரப்பு"
    },
    "q": {
      "en": "Find the area of an equilateral triangle whose perimeter is 180 cm.",
      "ta": "180 செமீ சுற்றளவு கொண்ட ஒரு சமபக்க முக்கோணத்தின் பரப்பளவைக் காண்க."
    },
    "steps": [
      {
        "en": "All three sides are equal; divide the perimeter by three.",
        "ta": "மூன்று பக்கங்களும் சமம். சுற்றளவை மூன்றால் வகுத்து ஒரு பக்கத்தின் நீளத்தைக் காண்க.",
        "eq": "a = 180/3 = 60 cm"
      },
      {
        "en": "Use the equilateral triangle area formula.",
        "ta": "சமபக்க முக்கோணத்தின் பரப்பளவுக்கான சூத்திரத்தைப் பயன்படுத்துக.",
        "eq": "A = (√3/4)a²"
      },
      {
        "en": "Substitute 60 cm and simplify.",
        "ta": "பக்கத்தின் நீளம் 60 செமீ என்பதைப் பிரதியிட்டுச் சுருக்குக.",
        "eq": "A = (√3/4)×60² = 900√3 cm²"
      }
    ],
    "answer": "900√3 cm² ≈ 1558.8 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q5",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q5",
      "ta": "பயிற்சி 7.1 · வினா 5"
    },
    "title": {
      "en": "Painting isosceles advertisement board",
      "ta": "விளம்பரப் பலகைக்கு வண்ணம் பூசும் செலவு"
    },
    "q": {
      "en": "An advertisement board is in the form of an isosceles triangle with perimeter 36m and each of the equal sides are 13 m. Find the cost of painting it at ₹ 17.50 per square metre.",
      "ta": "இரு சமபக்க முக்கோண வடிவிலுள்ள ஒரு விளம்பரப் பலகையின் சுற்றளவு 36 மீ மற்றும் அதன் ஒவ்வொரு சமபக்கத்தின் நீளம் 13 மீ ஆகும். அதற்கு வண்ணம் பூச ஒரு சதுர மீட்டருக்கு ₹ 17.50 வீதம் ஆகும் செலவைக் காண்க."
    },
    "steps": [
      {
        "en": "The remaining base is perimeter minus the two equal sides.",
        "ta": "சுற்றளவிலிருந்து சமமான இரு பக்கங்களின் நீளங்களைக் கழித்து அடிப்பக்கத்தைக் காண்க.",
        "eq": "Base = 36 − 13 − 13 = 10 m",
        "mathTa": [
          "அடிப்பக்கம் = ",
          {
            "latex": "36 - 13 - 13 = 10\\,\\mathrm{m}",
            "fallback": "36 − 13 − 13 = 10 m",
            "display": true
          }
        ]
      },
      {
        "en": "The altitude bisects the base: use Pythagoras in either right triangle.",
        "ta": "உச்சியிலிருந்து வரையப்படும் குத்துயரம் அடிப்பக்கத்தை இரு சம பாகங்களாகப் பிரிக்கிறது. ஒரு செங்கோண முக்கோணத்தில் பிதாகரஸ் தேற்றத்தைப் பயன்படுத்துக.",
        "eq": "h = √(13²−5²) = √144 = 12 m"
      },
      {
        "en": "Calculate the full triangular area.",
        "ta": "முழு அடிப்பக்கத்தையும் குத்துயரத்தையும் கொண்டு முக்கோணத்தின் பரப்பைக் காண்க.",
        "eq": "A = (10×12)/2 = 60 m²"
      },
      {
        "en": "Multiply area by the given paint rate.",
        "ta": "பரப்பை ஒரு சதுர மீட்டருக்கான வண்ணம் பூசும் செலவால் பெருக்குக.",
        "eq": "Cost = 60×₹17.50 = ₹1050",
        "mathTa": [
          "செலவு = ",
          {
            "latex": "60",
            "fallback": "60"
          },
          "×₹",
          {
            "latex": "17.50",
            "fallback": "17.50"
          },
          " = ₹",
          {
            "latex": "1050",
            "fallback": "1050"
          }
        ]
      }
    ],
    "answer": "₹1050",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q6",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q6",
      "ta": "பயிற்சி 7.1 · வினா 6"
    },
    "title": {
      "en": "Shaded triangle inside another triangle",
      "ta": "நிழலிடப்படாத பகுதியின் பரப்பு"
    },
    "q": {
      "en": "Find the area of the unshaded region.",
      "ta": "படத்தில் நிழலிடப்படாத பகுதியின் பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "Read the textbook diagram: BC=42 cm, CA=34 cm, BD=16 cm, AD=12 cm, with ∠BDA=90°.",
        "ta": "படத்தில் BC=42 செமீ, CA=34 செமீ, BD=16 செமீ, AD=12 செமீ மற்றும் ∠BDA=90°.",
        "eq": "BC=42, CA=34, BD=16, AD=12 cm"
      },
      {
        "en": "First find AB from right triangle ADB.",
        "ta": "முதலில் ADB என்ற செங்கோண முக்கோணத்தில் AB ஐக் காண்க.",
        "eq": "AB = √(12²+16²) = 20 cm"
      },
      {
        "en": "Outer triangle ABC has sides 20, 34 and 42 cm, so s=48 cm.",
        "ta": "வெளி முக்கோணம் ABC இன் பக்கங்கள் 20, 34, 42 செமீ. எனவே அதன் அரைச் சுற்றளவு 48 செமீ.",
        "eq": "s = (20+34+42)/2 = 48 cm"
      },
      {
        "en": "Calculate the outer triangle area using Heron’s formula.",
        "ta": "ஹெரான் சூத்திரத்தைப் பயன்படுத்தி வெளி முக்கோணத்தின் பரப்பைக் காண்க.",
        "eq": "A(ABC) = √(48×28×14×6) = 336 cm²"
      },
      {
        "en": "The coloured triangle ADB has area half its perpendicular-leg product.",
        "ta": "நிழலிடப்பட்ட ADB இன் பரப்பு, செங்குத்தாக உள்ள இரு பக்கங்களின் பெருக்கற்பலனில் பாதியாகும்.",
        "eq": "A(ADB) = (12×16)/2 = 96 cm²"
      },
      {
        "en": "Subtract the coloured region from the outer triangle.",
        "ta": "வெளி முக்கோணத்தின் பரப்பிலிருந்து நிழலிடப்பட்ட பகுதியின் பரப்பைக் கழிக்கவும்.",
        "eq": "Unshaded area = 336 − 96 = 240 cm²",
        "mathTa": [
          "நிழலிடப்படாத பரப்பு = ",
          {
            "latex": "336 - 96 = 240\\,\\mathrm{cm}^{2}",
            "fallback": "336 − 96 = 240 cm²",
            "display": true
          }
        ]
      }
    ],
    "answer": "240 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [
        "The original Fig. 7.8 has a shaded right triangle ABD. Exact diagram was visually checked from PDF page 258. An original cropped reference figure is included for Codex to connect without redesign."
      ],
      "figureAsset": "assets/textbook-figures/g9-ch7-ex7-1-q6-reference.png",
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q7",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q7",
      "ta": "பயிற்சி 7.1 · வினா 7"
    },
    "title": {
      "en": "Quadrilateral split by diagonal",
      "ta": "நாற்கரத்தின் பரப்பு"
    },
    "q": {
      "en": "Find the area of a quadrilateral ABCD whose sides are AB =13 cm, BC =12 cm, CD = 9 cm, AD =14 cm and diagonal BD =15 cm.",
      "ta": "AB = 13 செமீ, BC = 12 செமீ, CD = 9 செமீ, AD = 14 செமீ ஆகியவற்றைப் பக்கங்களாகவும் BD = 15 செமீ ஐ மூலைவிட்டமாகவும் கொண்ட நாற்கரம் ABCD இன் பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "Diagonal BD forms triangles ABD and BCD; calculate each separately.",
        "ta": "BD என்ற மூலைவிட்டம் நாற்கரத்தை ABD, BCD என்ற இரு முக்கோணங்களாகப் பிரிக்கிறது. அவற்றின் பரப்புகளைத் தனித்தனியாகக் காண்க.",
        "eq": "BD = 15 cm"
      },
      {
        "en": "For triangle ABD, sides are 13,14,15 and semiperimeter 21.",
        "ta": "ABD இன் பக்கங்கள் 13, 14, 15 செமீ. அரைச் சுற்றளவு 21 செமீ.",
        "eq": "A(ABD)=√(21×8×7×6)=84 cm²"
      },
      {
        "en": "For triangle BCD, sides are 12,9,15 and semiperimeter 18.",
        "ta": "BCD இன் பக்கங்கள் 12, 9, 15 செமீ. அரைச் சுற்றளவு 18 செமீ.",
        "eq": "A(BCD)=√(18×6×9×3)=54 cm²"
      },
      {
        "en": "Add the two triangular areas.",
        "ta": "இரு முக்கோணங்களின் பரப்புகளையும் கூட்டுக.",
        "eq": "A(ABCD)=84+54=138 cm²"
      }
    ],
    "answer": "138 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q8",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q8",
      "ta": "பயிற்சி 7.1 · வினா 8"
    },
    "title": {
      "en": "Area of quadrilateral-shaped park",
      "ta": "பூங்காவின் பரப்பு"
    },
    "q": {
      "en": "A park is in the shape of a quadrilateral. The sides of the park are 15 m, 20 m, 26 m and 17 m and the angle between the first two sides is a right angle. Find the area of the park.",
      "ta": "ஒரு பூங்காவானது நாற்கர வடிவிலுள்ளது. அந்தப் பூங்காவின் பக்க அளவுகள் முறையே 15 மீ, 20 மீ, 26 மீ மற்றும் 17 மீ மற்றும் முதல் இரண்டு பக்கங்களுக்கு இடையேயுள்ள கோணம் செங்கோணம் எனில் பூங்காவின் பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "The two perpendicular sides 15 and 20 m form a right triangle and a diagonal of the quadrilateral.",
        "ta": "15 மீ, 20 மீ பக்கங்கள் ஒன்றுக்கொன்று செங்குத்தானவை. நாற்கரத்தின் ஒரு மூலைவிட்டம் இவை அமைக்கும் செங்கோண முக்கோணத்தின் கர்ணமாகும்.",
        "eq": "Diagonal = √(15²+20²)=25 m",
        "mathTa": [
          "மூலைவிட்டம் = ",
          {
            "latex": "\\sqrt{15^{2} + 20^{2}} = 25\\,\\mathrm{m}",
            "fallback": "√(15²+20²)=25 m",
            "display": true
          }
        ]
      },
      {
        "en": "Find the right triangle area.",
        "ta": "செங்கோண முக்கோணத்தின் பரப்பைக் காண்க.",
        "eq": "A₁=(15×20)/2=150 m²"
      },
      {
        "en": "The other triangle has sides 25,26,17 m and semiperimeter 34 m.",
        "ta": "மற்ற முக்கோணத்தின் பக்கங்கள் 25, 26, 17 மீ. அதன் அரைச் சுற்றளவு 34 மீ.",
        "eq": "s=(25+26+17)/2=34 m"
      },
      {
        "en": "Use Heron’s formula for its area.",
        "ta": "ஹெரான் சூத்திரத்தைப் பயன்படுத்தி அதன் பரப்பைக் காண்க.",
        "eq": "A₂=√(34×9×8×17)=204 m²"
      },
      {
        "en": "Add the two parts of the park.",
        "ta": "பூங்காவின் இரு பகுதிகளின் பரப்புகளையும் கூட்டுக.",
        "eq": "Total=150+204=354 m²",
        "mathTa": [
          "மொத்தப் பரப்பு=",
          {
            "latex": "150 + 204 = 354\\,\\mathrm{m}^{2}",
            "fallback": "150+204=354 m²",
            "display": true
          }
        ]
      }
    ],
    "answer": "354 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q9",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q9",
      "ta": "பயிற்சி 7.1 · வினா 9"
    },
    "title": {
      "en": "Area of rhombus with one diagonal",
      "ta": "சாய்சதுர நிலத்தின் பரப்பு"
    },
    "q": {
      "en": "A land is in the shape of rhombus. The perimeter of the land is 160 m and one of the diagonal is 48 m. Find the area of the land.",
      "ta": "ஒரு நிலமானது சாய்சதுர வடிவில் உள்ளது. நிலத்தின் சுற்றளவு 160 மீ மற்றும் அதன் ஒரு மூலைவிட்டத்தின் அளவு 48 மீ எனில் அந்த நிலத்தின் பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "Each of the four equal sides is 160/4 m.",
        "ta": "நான்கு பக்கங்களும் சமம். ஒவ்வொரு பக்கத்தின் நீளமும் 160 ஐ நான்கால் வகுத்தால் கிடைக்கும்.",
        "eq": "Side = 40 m",
        "mathTa": [
          "பக்கம் = ",
          {
            "latex": "40\\,\\mathrm{m}",
            "fallback": "40 m"
          }
        ]
      },
      {
        "en": "Rhombus diagonals bisect at right angles, so half the known diagonal is 24 m.",
        "ta": "சாய்சதுரத்தின் மூலைவிட்டங்கள் ஒன்றையொன்று செங்குத்தாக இரு சம பாகங்களாகப் பிரிக்கின்றன. கொடுக்கப்பட்ட மூலைவிட்டத்தின் பாதி 24 மீ.",
        "eq": "48/2=24 m"
      },
      {
        "en": "Pythagoras gives half the second diagonal.",
        "ta": "பிதாகரஸ் தேற்றத்தைப் பயன்படுத்தி இரண்டாவது மூலைவிட்டத்தின் பாதி நீளத்தைக் காண்க.",
        "eq": "Half d₂ = √(40²−24²)=32 m, so d₂=64 m",
        "mathTa": [
          "பாதி ",
          {
            "latex": "\\begin{aligned}&d_{2} = \\sqrt{40^{2} - 24^{2}}  \\\\ &= 32\\,\\mathrm{m}\\end{aligned}",
            "fallback": "d₂ = √(40²−24²)=32 m",
            "display": true
          },
          ", எனவே ",
          {
            "latex": "d_{2} = 64\\,\\mathrm{m}",
            "fallback": "d₂=64 m"
          }
        ]
      },
      {
        "en": "Use half the product of diagonals.",
        "ta": "இரு முழு மூலைவிட்டங்களின் பெருக்கற்பலனில் பாதியே சாய்சதுரத்தின் பரப்பு.",
        "eq": "A=(48×64)/2=1536 m²"
      }
    ],
    "answer": "1536 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q10",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "அளவியல்"
    },
    "label": {
      "en": "Exercise 7.1 · Q10",
      "ta": "பயிற்சி 7.1 · வினா 10"
    },
    "title": {
      "en": "Area of parallelogram from sides and diagonal",
      "ta": "இணைகரத்தின் பரப்பு"
    },
    "q": {
      "en": "The adjacent sides of a parallelogram measures 34 m, 20 m and the measure of one of the diagonal is 42 m. Find the area of parallelogram.",
      "ta": "ஓர் இணைகரத்தின் அடுத்தடுத்த பக்கங்களின் அளவுகள் 34 மீ, 20 மீ மற்றும் அதன் ஒரு மூலைவிட்டத்தின் அளவு 42 மீ எனில் அந்த இணைகரத்தின் பரப்பைக் காண்க."
    },
    "steps": [
      {
        "en": "A diagonal divides the parallelogram into two congruent triangles with sides 34,20,42.",
        "ta": "மூலைவிட்டம் இணைகரத்தை இரு சர்வசம முக்கோணங்களாகப் பிரிக்கிறது. ஒவ்வொன்றின் பக்கங்களும் 34, 20, 42 மீ.",
        "eq": "s=(34+20+42)/2=48 m"
      },
      {
        "en": "Use Heron’s formula for one triangle.",
        "ta": "ஹெரான் சூத்திரத்தைப் பயன்படுத்தி ஒரு முக்கோணத்தின் பரப்பைக் காண்க.",
        "eq": "A△=√(48×14×28×6)=336 m²"
      },
      {
        "en": "Double for the parallelogram.",
        "ta": "அந்தப் பரப்பை இரண்டால் பெருக்கி இணைகரத்தின் பரப்பைப் பெறுக.",
        "eq": "A▱=2×336=672 m²"
      }
    ],
    "answer": "672 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": [],
      "taPdfPage": 273,
      "taPrintedPage": 267,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj"
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch7');
if(!grade||!chapter)throw Error('Grade 9 chapter registration missing');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate content '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G9_CH7_EX7_1_EN=entries.map(x=>x.id);
})();
