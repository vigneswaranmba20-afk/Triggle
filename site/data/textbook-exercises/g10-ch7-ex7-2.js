/* Grade 10 Mensuration Exercise 7.2 Q1–Q10: Bilingual (English & Tamil) 2025 source-page verified records. */
(() => {
'use strict';
const entries = [
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q1",
    "label": {
      "en": "Exercise 7.2 · Q1",
      "ta": "பயிற்சி 7.2 · வினா 1"
    },
    "title": {
      "en": "Height of embankment around a dug well",
      "ta": "கிணற்றைச் சுற்றி அமைக்கப்படும் மேடையின் உயரம்"
    },
    "q": {
      "en": "1. A 14 m deep well with inner diameter 10 m is dug and the earth taken out is evenly spread all around the well to form an embankment of width 5 m. Find the height of the embankment.",
      "ta": "1. 10 மீ உட்புற விட்டம் மற்றும் 14 மீ ஆழம் கொண்ட ஓர் உருளை வடிவக் கிணற்றிலிருந்து எடுக்கப்பட்ட மண் கொண்டு 5 மீ அகலத்தில் கிணற்றைச் சுற்றி மேடை அமைக்கப்படுகிறது எனில், மேடையின் உயரத்தைக் காண்க."
    },
    "steps": [
      {
        "en": "The well is a right circular cylinder. Half of its inner diameter 10 m gives the inner radius r = 5 m, and its depth is the cylinder height h = 14 m.",
        "ta": "கிணறு ஒரு நேர்வட்ட உருளை வடிவில் உள்ளது. உட்புற விட்டம் 10 மீ என்பதால் உட்புற ஆரம் r = 5 மீ மற்றும் ஆழம் h = 14 மீ ஆகும்.",
        "eq": "r = 10/2 = 5 m, h = 14 m",
        "math": {
          "latex": "\\begin{aligned}r&=\\dfrac{10}{2}=5\\,\\mathrm{m}\\\\h&=14\\,\\mathrm{m}\\end{aligned}",
          "fallback": "r = 10/2 = 5 m, h = 14 m",
          "display": true
        }
      },
      {
        "en": "Find the volume of earth dug out using the volume of a cylinder V = πr²h.",
        "ta": "கிணற்றிலிருந்து தோண்டி எடுக்கப்பட்ட மண்ணின் கன அளவை உருளையின் கன அளவு சூத்திரம் V = πr²h கொண்டு கணக்கிடுவோம்.",
        "eq": "V_earth = (22/7) × 5² × 14 = 1100 m³",
        "math": {
          "latex": "\\begin{aligned}V_{\\mathrm{earth}}&=\\pi r^2 h\\\\&=\\dfrac{22}{7}\\times5^2\\times14\\\\&=1100\\,\\mathrm{m}^3\\end{aligned}",
          "fallback": "V_earth = (22/7) × 5² × 14 = 1100 m³",
          "display": true
        }
      },
      {
        "en": "The embankment forms a hollow circular ring (annulus) around the well with width w = 5 m, so its outer radius is R = r + w = 5 + 5 = 10 m. Find the ring's base area.",
        "ta": "கிணற்றைச் சுற்றி 5 மீ அகலத்தில் அமைக்கப்படும் மேடை ஒரு உள்ளீடற்ற வளைய வடிவில் உள்ளது. அதன் வெளிப்புற ஆரம் R = 5 + 5 = 10 மீ. மேடையின் அடிப்பரப்பைக் காண்போம்.",
        "eq": "R = 5 + 5 = 10 m; Base area = π(R² − r²) = π(10² − 5²) = 75π m²",
        "math": {
          "latex": "\\begin{aligned}R&=5+5=10\\,\\mathrm{m}\\\\A&=\\pi(R^2-r^2)\\\\&=\\pi(10^2-5^2)=75\\pi\\,\\mathrm{m}^2\\end{aligned}",
          "fallback": "R = 5 + 5 = 10 m; Base area = π(R² − r²) = π(10² − 5²) = 75π m²",
          "display": true
        }
      },
      {
        "en": "All the excavated earth forms the embankment, so Volume of embankment = Volume of earth. Divide the volume by the annular base area to get the embankment height H.",
        "ta": "தோண்டி எடுக்கப்பட்ட மண் முழுவதுமே மேடையாக அமைக்கப்படுவதால், மேடையின் கன அளவு = மண்ணின் கன அளவு ஆகும். கன அளவை அடிப்பரப்பால் வகுக்க மேடையின் உயரம் H கிடைக்கும்.",
        "eq": "75π × H = π × 25 × 14 => H = 350/75 = 14/3 m ≈ 4.67 m",
        "math": {
          "latex": "\\begin{aligned}\\pi(75)H&=\\pi(5^2)(14)\\\\H&=\\dfrac{350}{75}=\\dfrac{14}{3}\\,\\mathrm{m}\\\\&\\approx4.67\\,\\mathrm{m}\\end{aligned}",
          "fallback": "75π × H = π × 25 × 14 => H = 350/75 = 14/3 m ≈ 4.67 m",
          "display": true
        }
      }
    ],
    "answer": "Height of the embankment = 4.67 m.",
    "answerTa": "மேடையின் உயரம் = 4.67 மீ.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{4.67\\,\\mathrm{m}}",
        "fallback": "Height of the embankment = 4.67 m.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{4.67\\,\\mathrm{m}}",
        "fallback": "மேடையின் உயரம் = 4.67 மீ.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q2",
    "label": {
      "en": "Exercise 7.2 · Q2",
      "ta": "பயிற்சி 7.2 · வினா 2"
    },
    "title": {
      "en": "Rise in water level from an immersed cylinder",
      "ta": "உலோக உருளை மூழ்கும்போது ஏற்படும் நீரின் உயர்வு"
    },
    "q": {
      "en": "2. A cylindrical glass with diameter 20 cm has water to a height of 9 cm. A small cylindrical metal of radius 5 cm and height 4 cm is immersed completely. Calculate the raise of the water in the glass?",
      "ta": "2. விட்டம் 20 செ.மீ உள்ள ஓர் உருளை வடிவக் கண்ணாடிக் குவளையில் 9 செ.மீ உயரத்திற்கு நீர் உள்ளது. ஆரம் 5 செ.மீ மற்றும் உயரம் 4 செ.மீ உடைய ஓர் சிறிய உலோக உருளை, நீரில் முழுமையாக மூழ்கும்போது ஏற்படும் நீரின் உயர்வைக் கணக்கிடுக."
    },
    "steps": [
      {
        "en": "Identify the dimensions. For the cylindrical glass, diameter is 20 cm so its radius is R = 10 cm. For the immersed metal cylinder, radius r = 5 cm and height h = 4 cm.",
        "ta": "கொடுக்கப்பட்ட அளவுகளைக் குறிப்போம். கண்ணாடிக் குவளையின் விட்டம் 20 செ.மீ என்பதால் அதன் ஆரம் R = 10 செ.மீ. சிறிய உலோக உருளையின் ஆரம் r = 5 செ.மீ மற்றும் உயரம் h = 4 செ.மீ ஆகும்.",
        "eq": "R = 20/2 = 10 cm; r = 5 cm, h = 4 cm",
        "math": {
          "latex": "\\begin{aligned}R&=\\dfrac{20}{2}=10\\,\\mathrm{cm}\\\\r&=5\\,\\mathrm{cm},\\quad h=4\\,\\mathrm{cm}\\end{aligned}",
          "fallback": "R = 20/2 = 10 cm; r = 5 cm, h = 4 cm",
          "display": true
        }
      },
      {
        "en": "Since the metal cylinder is completely immersed, the volume of water displaced equals the volume of the metal cylinder. Let H be the rise in water level in the glass.",
        "ta": "உலோக உருளை நீரில் முழுமையாக மூழ்குவதால், இடம்பெயர்ந்த நீரின் கன அளவு உலோக உருளையின் கன அளவிற்குச் சமம். உயர்ந்த நீரின் அளவை H என்க.",
        "eq": "Volume of displaced water = πR²H = Volume of metal cylinder = πr²h",
        "math": {
          "latex": "\\pi R^2 H=\\pi r^2 h",
          "fallback": "πR²H = πr²h",
          "display": true
        }
      },
      {
        "en": "Cancel π on both sides and substitute R = 10, r = 5, and h = 4 to solve for H. Notice the initial 9 cm water height is sufficient so the metal is submerged without overflowing.",
        "ta": "இருபுறமும் உள்ள π-ஐ நீக்கி, R = 10, r = 5 மற்றும் h = 4 எனப் பிரதியிட்டு H-ஐக் காண்போம். ஆரம்ப நீர் உயரம் 9 செ.மீ போதுமானதாக உள்ளதால் நீர் வழிந்தோடாமல் உலோக உருளை முழுமையாக மூழ்கும்.",
        "eq": "10² × H = 5² × 4 => 100H = 100 => H = 1 cm",
        "math": {
          "latex": "\\begin{aligned}10^2\\cdot H&=5^2\\cdot 4\\\\100H&=100\\\\H&=\\dfrac{100}{100}=1\\,\\mathrm{cm}\\end{aligned}",
          "fallback": "10² × H = 5² × 4 => 100H = 100 => H = 1 cm",
          "display": true
        }
      }
    ],
    "answer": "Raise of the water in the glass = 1 cm.",
    "answerTa": "குவளையில் ஏற்படும் நீரின் உயர்வு = 1 செ.மீ.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{1\\,\\mathrm{cm}}",
        "fallback": "Raise of the water in the glass = 1 cm.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{1\\,\\mathrm{cm}}",
        "fallback": "குவளையில் ஏற்படும் நீரின் உயர்வு = 1 செ.மீ.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q3",
    "label": {
      "en": "Exercise 7.2 · Q3",
      "ta": "பயிற்சி 7.2 · வினா 3"
    },
    "title": {
      "en": "Volume of a cone from its base circumference",
      "ta": "சுற்றளவிலிருந்து கூம்பின் கன அளவு காணல்"
    },
    "q": {
      "en": "3. If the circumference of a conical wooden piece is 484 cm then find its volume when its height is 105 cm.",
      "ta": "3. 484 செ.மீ சுற்றளவுள்ள ஒரு மரக்கூம்பின் உயரம் 105 செ.மீ எனில், கூம்பின் கன அளவைக் காண்க."
    },
    "steps": [
      {
        "en": "The circular base has circumference C = 2πr = 484 cm, and the cone's vertical height is h = 105 cm. First find the base radius r using π = 22/7.",
        "ta": "கூம்பின் அடிப்பகுதி வட்ட வடிவமானது. அதன் சுற்றளவு 2πr = 484 செ.மீ மற்றும் உயரம் h = 105 செ.மீ ஆகும். முதலில் π = 22/7 எனக் கொண்டு ஆரம் r-ஐக் காண்போம்.",
        "eq": "2 × (22/7) × r = 484 => r = (484 × 7) / 44 = 77 cm",
        "math": {
          "latex": "\\begin{aligned}2\\pi r&=484\\\\2\\times\\dfrac{22}{7}\\times r&=484\\\\r&=\\dfrac{484\\times7}{44}=77\\,\\mathrm{cm}\\end{aligned}",
          "fallback": "2 × (22/7) × r = 484 => r = (484 × 7) / 44 = 77 cm",
          "display": true
        }
      },
      {
        "en": "Now use the volume formula for a right circular cone, V = (1/3)πr²h, substituting r = 77 cm and h = 105 cm.",
        "ta": "இப்போது கூம்பின் கன அளவு சூத்திரம் V = (1/3)πr²h-இல் r = 77 செ.மீ மற்றும் h = 105 செ.மீ ஆகியவற்றைப் பிரதியிடுவோம்.",
        "eq": "V = (1/3) × (22/7) × 77 × 77 × 105",
        "math": {
          "latex": "\\begin{aligned}V&=\\dfrac{1}{3}\\pi r^2 h\\\\&=\\dfrac{1}{3}\\times\\dfrac{22}{7}\\times77\\times77\\times105\\end{aligned}",
          "fallback": "V = (1/3) × (22/7) × 77 × 77 × 105",
          "display": true
        }
      },
      {
        "en": "Simplify by dividing 77 by 7 to get 11, and dividing 105 by 3 to get 35, then multiply.",
        "ta": "77-ஐ 7-ஆல் வகுத்தால் 11 என்றும், 105-ஐ 3-ஆல் வகுத்தால் 35 என்றும் சுருக்கிப் பெருக்கினால் கன அளவு கிடைக்கும்.",
        "eq": "V = 22 × 11 × 77 × 35 = 652190 cm³",
        "math": {
          "latex": "\\begin{aligned}V&=22\\times11\\times77\\times35\\\\&=652190\\,\\mathrm{cm}^3\\end{aligned}",
          "fallback": "V = 22 × 11 × 77 × 35 = 652190 cm³",
          "display": true
        }
      }
    ],
    "answer": "Volume of the conical wooden piece = 652190 cm³.",
    "answerTa": "மரக்கூம்பின் கன அளவு = 652190 க. செ.மீ.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{652190\\,\\mathrm{cm}^3}",
        "fallback": "Volume of the conical wooden piece = 652190 cm³.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{652190\\,\\mathrm{cm}^3}",
        "fallback": "மரக்கூம்பின் கன அளவு = 652190 க. செ.மீ.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q4",
    "label": {
      "en": "Exercise 7.2 · Q4",
      "ta": "பயிற்சி 7.2 · வினா 4"
    },
    "title": {
      "en": "Time to empty a conical petrol container",
      "ta": "கூம்பு வடிவக் கொள்கலன் காலியாக ஆகும் நேரம்"
    },
    "q": {
      "en": "4. A conical container is fully filled with petrol. The radius is 10m and the height is 15 m. If the container can release the petrol through its bottom at the rate of 25 cu. meter per minute, in how many minutes the container will be emptied. Round off your answer to the nearest minute.",
      "ta": "4. ஆரம் 10 மீட்டரும், உயரம் 15 மீட்டரும் உடைய ஒரு கூம்பு வடிவக் கொள்கலன் முழுமையாகப் பெட்ரோலால் நிரம்பியுள்ளது. நிமிடத்திற்கு 25 கன மீட்டர் பெட்ரோல் கொள்கலனின் அடிப்புறம் வழியாக வெளியேற்றப்பட்டால் எத்தனை நிமிடங்களில் கொள்கலன் காலியாகும். விடையை நிமிடத் திருத்தமாகத் தருக."
    },
    "steps": [
      {
        "en": "The conical container has radius r = 10 m and height h = 15 m. First compute the total volume of petrol using the cone volume formula V = (1/3)πr²h with π = 22/7.",
        "ta": "கூம்பு வடிவக் கொள்கலனின் ஆரம் r = 10 மீ மற்றும் உயரம் h = 15 மீ ஆகும். முதலில் கூம்பின் கன அளவு சூத்திரம் V = (1/3)πr²h (இங்கு π = 22/7) மூலம் பெட்ரோலின் மொத்த கன அளவைக் காண்போம்.",
        "eq": "V = (1/3) × (22/7) × 10² × 15 = 11000/7 m³ ≈ 1571.43 m³",
        "math": {
          "latex": "\\begin{aligned}V&=\\dfrac{1}{3}\\pi r^2 h\\\\&=\\dfrac{1}{3}\\times\\dfrac{22}{7}\\times10^2\\times15\\\\&=\\dfrac{11000}{7}\\,\\mathrm{m}^3\\approx1571.43\\,\\mathrm{m}^3\\end{aligned}",
          "fallback": "V = (1/3) × (22/7) × 10² × 15 = 11000/7 m³ ≈ 1571.43 m³",
          "display": true
        }
      },
      {
        "en": "Petrol flows out at a steady rate of 25 m³ per minute. Divide the exact total volume by the flow rate to find the time in minutes.",
        "ta": "நிமிடத்திற்கு 25 கன மீட்டர் என்ற வீதத்தில் பெட்ரோல் வெளியேறுகிறது. மொத்த கன அளவை வெளியேற்றும் வீதத்தால் வகுத்தால் காலியாக ஆகும் நேரம் நிமிடங்களில் கிடைக்கும்.",
        "eq": "Time = (11000/7) ÷ 25 = 440/7 ≈ 62.86 minutes",
        "math": {
          "latex": "\\begin{aligned}\\text{Time}&=\\dfrac{11000}{7}\\div25\\\\&=\\dfrac{440}{7}\\approx62.86\\text{ min}\\end{aligned}",
          "fallback": "Time = (11000/7) ÷ 25 = 440/7 ≈ 62.86 minutes",
          "display": true
        }
      },
      {
        "en": "Round 62.86 minutes to the nearest whole minute as instructed by the question.",
        "ta": "வினாவில் கேட்டுள்ளபடி 62.86 நிமிடங்களை அருகிலுள்ள முழு நிமிடத்திற்குத் திருத்தமாக எழுதுவோம்.",
        "eq": "Time ≈ 63 minutes (approx)",
        "math": {
          "latex": "\\text{Time}\\approx63\\text{ minutes (approx)}",
          "fallback": "Time ≈ 63 minutes (approx)",
          "display": true
        }
      }
    ],
    "answer": "63 minutes (approx).",
    "answerTa": "63 நிமிடங்கள் (தோராயமாக).",
    "answerMath": {
      "en": {
        "latex": "\\boxed{63\\text{ minutes (approx)}}",
        "fallback": "63 minutes (approx).",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{63\\text{ நிமிடங்கள் (தோராயமாக)}}",
        "fallback": "63 நிமிடங்கள் (தோராயமாக).",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q5",
    "label": {
      "en": "Exercise 7.2 · Q5",
      "ta": "பயிற்சி 7.2 · வினா 5"
    },
    "title": {
      "en": "Difference in volumes of cones from a revolved right triangle",
      "ta": "செங்கோண முக்கோணத்தைச் சுழற்றுவதால் ஏற்படும் கூம்புகளின் கன அளவு வித்தியாசம்"
    },
    "q": {
      "en": "5. A right angled triangle whose sides are 6 cm, 8 cm and 10 cm is revolved about the sides containing the right angle in two ways. Find the difference in volumes of the two solids so formed.",
      "ta": "5. 6 செ.மீ, 8 செ.மீ மற்றும் 10 செ.மீ பக்க அளவுகள் கொண்ட ஒரு செங்கோண முக்கோணத்தை அதன் செங்கோணத்தைத் தாங்கும் பக்கங்களை மைய அச்சுகளாகக் கொண்டு சுழற்றும்போது ஏற்படும் திண்மங்களின் கன அளவுகளின் வித்தியாசம் காண்க."
    },
    "steps": [
      {
        "en": "Since 6² + 8² = 36 + 64 = 100 = 10², the hypotenuse is 10 cm and the two sides containing the right angle are 6 cm and 8 cm. Revolving a right triangle about a leg forms a right circular cone.",
        "ta": "6² + 8² = 36 + 64 = 100 = 10² என்பதால், கர்ணம் 10 செ.மீ ஆகும். செங்கோணத்தைத் தாங்கும் பக்கங்கள் 6 செ.மீ மற்றும் 8 செ.மீ ஆகும். செங்கோண முக்கோணத்தை ஒரு பக்கத்தை அச்சாகக் கொண்டு சுழற்றினால் நேர்வட்டக் கூம்பு உருவாகும்.",
        "eq": "6² + 8² = 10²; legs are 6 cm and 8 cm",
        "math": {
          "latex": "6^2+8^2=36+64=100=10^2",
          "fallback": "6² + 8² = 10²; legs are 6 cm and 8 cm",
          "display": true
        }
      },
      {
        "en": "Case 1: Revolve about the 8 cm side. Then height h₁ = 8 cm and radius r₁ = 6 cm. Find V₁ using π = 22/7.",
        "ta": "நிலை 1: 8 செ.மீ பக்கத்தை மைய அச்சாகக் கொண்டு சுழற்றும்போது, உயரம் h₁ = 8 செ.மீ மற்றும் ஆரம் r₁ = 6 செ.மீ ஆகும். π = 22/7 எனக் கொண்டு கன அளவு V₁-ஐக் காண்போம்.",
        "eq": "V₁ = (1/3)π(6²)(8) = 96π = 2112/7 ≈ 301.71 cm³",
        "math": {
          "latex": "\\begin{aligned}V_1&=\\dfrac{1}{3}\\pi r_1^2 h_1=\\dfrac{1}{3}\\pi(6^2)(8)\\\\&=96\\pi=96\\times\\dfrac{22}{7}\\\\&=\\dfrac{2112}{7}\\approx301.71\\,\\mathrm{cm}^3\\end{aligned}",
          "fallback": "V₁ = (1/3)π(6²)(8) = 96π = 2112/7 ≈ 301.71 cm³",
          "display": true
        }
      },
      {
        "en": "Case 2: Revolve about the 6 cm side. Then height h₂ = 6 cm and radius r₂ = 8 cm. Find V₂ using π = 22/7.",
        "ta": "நிலை 2: 6 செ.மீ பக்கத்தை மைய அச்சாகக் கொண்டு சுழற்றும்போது, உயரம் h₂ = 6 செ.மீ மற்றும் ஆரம் r₂ = 8 செ.மீ ஆகும். கன அளவு V₂-ஐக் காண்போம்.",
        "eq": "V₂ = (1/3)π(8²)(6) = 128π = 2816/7 ≈ 402.29 cm³",
        "math": {
          "latex": "\\begin{aligned}V_2&=\\dfrac{1}{3}\\pi r_2^2 h_2=\\dfrac{1}{3}\\pi(8^2)(6)\\\\&=128\\pi=128\\times\\dfrac{22}{7}\\\\&=\\dfrac{2816}{7}\\approx402.29\\,\\mathrm{cm}^3\\end{aligned}",
          "fallback": "V₂ = (1/3)π(8²)(6) = 128π = 2816/7 ≈ 402.29 cm³",
          "display": true
        }
      },
      {
        "en": "Subtract V₁ from V₂. Using the textbook's two-decimal intermediate values gives 402.29 − 301.71 = 100.58 cm³ (note: subtracting exact values 128π − 96π = 32π = 704/7 gives 100.57 cm³ if rounded only at the end).",
        "ta": "இரு கன அளவுகளின் வித்தியாசத்தைக் காண V₂-விலிருந்து V₁-ஐக் கழிக்க வேண்டும். பாடநூல் இடைநிலை முழுமையாக்கல் படி 402.29 − 301.71 = 100.58 க. செ.மீ கிடைக்கும் (குறிப்பு: துல்லிய மதிப்புகளைக் கழித்தால் 128π − 96π = 32π = 704/7 ≈ 100.57 க. செ.மீ கிடைக்கும்).",
        "eq": "V₂ − V₁ = 402.29 − 301.71 = 100.58 cm³ (exact: 32π = 704/7 ≈ 100.57 cm³)",
        "math": {
          "latex": "\\begin{aligned}V_2-V_1&=402.29-301.71=100.58\\,\\mathrm{cm}^3\\\\(\\text{Exact: }32\\pi&=\\dfrac{704}{7}\\approx100.57\\,\\mathrm{cm}^3)\\end{aligned}",
          "fallback": "V₂ − V₁ = 402.29 − 301.71 = 100.58 cm³ (exact: 32π = 704/7 ≈ 100.57 cm³)",
          "display": true
        }
      }
    ],
    "answer": "Difference in volumes = 100.58 cm³.",
    "answerTa": "கன அளவுகளின் வித்தியாசம் = 100.58 க. செ.மீ.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{100.58\\,\\mathrm{cm}^3}",
        "fallback": "Difference in volumes = 100.58 cm³.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{100.58\\,\\mathrm{cm}^3}",
        "fallback": "கன அளவுகளின் வித்தியாசம் = 100.58 க. செ.மீ.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q6",
    "label": {
      "en": "Exercise 7.2 · Q6",
      "ta": "பயிற்சி 7.2 · வினா 6"
    },
    "title": {
      "en": "Ratio of heights of two cones with equal base radius",
      "ta": "சம ஆரங்கள் கொண்ட இரு கூம்புகளின் உயரங்களின் விகிதம்"
    },
    "q": {
      "en": "6. The volumes of two cones of same base radius are 3600 cm³ and 5040 cm³. Find the ratio of heights.",
      "ta": "6. சம ஆரங்கள் கொண்ட இரு கூம்புகளின் கன அளவுகள் 3600 க. செ.மீ மற்றும் 5040 க. செ.மீ எனில், உயரங்களின் விகிதம் காண்க."
    },
    "questionMath": {
      "en": [
        "6. The volumes of two cones of same base radius are ",
        {
          "latex": "3600\\,\\mathrm{cm}^3",
          "fallback": "3600 cm³",
          "display": false
        },
        " and ",
        {
          "latex": "5040\\,\\mathrm{cm}^3",
          "fallback": "5040 cm³",
          "display": false
        },
        ". Find the ratio of heights."
      ],
      "ta": [
        "6. சம ஆரங்கள் கொண்ட இரு கூம்புகளின் கன அளவுகள் ",
        {
          "latex": "3600",
          "fallback": "3600",
          "display": false
        },
        " க. செ.மீ மற்றும் ",
        {
          "latex": "5040",
          "fallback": "5040",
          "display": false
        },
        " க. செ.மீ எனில், உயரங்களின் விகிதம் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Let r be the common base radius of both cones, and let h₁ and h₂ be their heights. Write their volumes V₁ and V₂.",
        "ta": "இரு கூம்புகளின் சம ஆரம் r என்க. அவற்றின் உயரங்கள் முறையே h₁ மற்றும் h₂ என்க. இரு கூம்புகளின் கன அளவுகள் V₁ மற்றும் V₂ ஐ எழுதுவோம்.",
        "eq": "V₁ = (1/3)πr²h₁ = 3600 cm³, V₂ = (1/3)πr²h₂ = 5040 cm³",
        "math": {
          "latex": "\\begin{aligned}V_1&=\\dfrac{1}{3}\\pi r^2 h_1=3600\\,\\mathrm{cm}^3\\\\V_2&=\\dfrac{1}{3}\\pi r^2 h_2=5040\\,\\mathrm{cm}^3\\end{aligned}",
          "fallback": "V₁ = (1/3)πr²h₁ = 3600 cm³, V₂ = (1/3)πr²h₂ = 5040 cm³",
          "display": true
        }
      },
      {
        "en": "Divide V₁ by V₂. Because both cones share the same radius r, the common factor (1/3)πr² cancels out, leaving the ratio of heights h₁ : h₂.",
        "ta": "V₁-ஐ V₂-ஆல் வகுப்போம். இரு கூம்புகளுக்கும் ஆரம் r சமம் என்பதால் பொதுவான (1/3)πr² காரணி நீங்கி, உயரங்களின் விகிதம் h₁ : h₂ மட்டும் எஞ்சும்.",
        "eq": "V₁/V₂ = h₁/h₂ = 3600/5040",
        "math": {
          "latex": "\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{1}{3}\\pi r^2 h_1}{\\tfrac{1}{3}\\pi r^2 h_2}=\\dfrac{h_1}{h_2}=\\dfrac{3600}{5040}",
          "fallback": "V₁/V₂ = h₁/h₂ = 3600/5040",
          "display": true
        }
      },
      {
        "en": "Simplify 3600/5040 by dividing numerator and denominator by 10, then by their greatest common divisor 72.",
        "ta": "3600/5040 என்ற பின்னத்தை முதலில் 10-ஆலும் பின்னர் மீ.பொ.வ 72-ஆலும் வகுத்து எளிய விகிதமாக மாற்றுவோம்.",
        "eq": "h₁/h₂ = 360/504 = 5/7 => h₁ : h₂ = 5 : 7",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{h_1}{h_2}&=\\dfrac{360}{504}=\\dfrac{5}{7}\\\\h_1:h_2&=5:7\\end{aligned}",
          "fallback": "h₁/h₂ = 360/504 = 5/7 => h₁ : h₂ = 5 : 7",
          "display": true
        }
      }
    ],
    "answer": "Ratio of heights = 5 : 7.",
    "answerTa": "உயரங்களின் விகிதம் = 5 : 7.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{5:7}",
        "fallback": "Ratio of heights = 5 : 7.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{5:7}",
        "fallback": "உயரங்களின் விகிதம் = 5 : 7.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q7",
    "label": {
      "en": "Exercise 7.2 · Q7",
      "ta": "பயிற்சி 7.2 · வினா 7"
    },
    "title": {
      "en": "Ratio of volumes of two spheres",
      "ta": "இரு கோளங்களின் கன அளவுகளின் விகிதம்"
    },
    "q": {
      "en": "7. If the ratio of radii of two spheres is 4:7, find the ratio of their volumes.",
      "ta": "7. இரு கோளங்களின் ஆரங்களின் விகிதம் 4:7 எனில், அவற்றின் கன அளவுகளின் விகிதம் காண்க."
    },
    "steps": [
      {
        "en": "Let r₁ and r₂ be the radii of the two spheres. We are given r₁ : r₂ = 4 : 7, so r₁/r₂ = 4/7.",
        "ta": "இரு கோளங்களின் ஆரங்கள் முறையே r₁ மற்றும் r₂ என்க. r₁ : r₂ = 4 : 7 எனக் கொடுக்கப்பட்டுள்ளது, அதாவது r₁/r₂ = 4/7.",
        "eq": "r₁ : r₂ = 4 : 7 => r₁/r₂ = 4/7",
        "math": {
          "latex": "\\dfrac{r_1}{r_2}=\\dfrac{4}{7}",
          "fallback": "r₁ : r₂ = 4 : 7 => r₁/r₂ = 4/7",
          "display": true
        }
      },
      {
        "en": "Use the sphere volume formula V = (4/3)πr³ for each sphere and form the ratio V₁ / V₂. The constant factor (4/3)π cancels out.",
        "ta": "கோளத்தின் கன அளவு சூத்திரம் V = (4/3)πr³ கொண்டு இரு கோளங்களின் கன அளவுகளின் விகிதம் V₁ / V₂ ஐ எழுதுவோம். பொதுவான (4/3)π காரணி நீங்கும்.",
        "eq": "V₁/V₂ = [(4/3)πr₁³] / [(4/3)πr₂³] = (r₁/r₂)³",
        "math": {
          "latex": "\\dfrac{V_1}{V_2}=\\dfrac{\\tfrac{4}{3}\\pi r_1^3}{\\tfrac{4}{3}\\pi r_2^3}=\\left(\\dfrac{r_1}{r_2}\\right)^3",
          "fallback": "V₁/V₂ = [(4/3)πr₁³] / [(4/3)πr₂³] = (r₁/r₂)³",
          "display": true
        }
      },
      {
        "en": "Substitute r₁/r₂ = 4/7 and cube both numerator and denominator: 4³ = 64 and 7³ = 343.",
        "ta": "r₁/r₂ = 4/7 எனப் பிரதியிட்டு முப்படி எடுப்போம்: 4³ = 64 மற்றும் 7³ = 343.",
        "eq": "V₁/V₂ = (4/7)³ = 64/343 => V₁ : V₂ = 64 : 343",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{V_1}{V_2}&=\\left(\\dfrac{4}{7}\\right)^3=\\dfrac{64}{343}\\\\V_1:V_2&=64:343\\end{aligned}",
          "fallback": "V₁/V₂ = (4/7)³ = 64/343 => V₁ : V₂ = 64 : 343",
          "display": true
        }
      }
    ],
    "answer": "Ratio of their volumes = 64 : 343.",
    "answerTa": "அவற்றின் கன அளவுகளின் விகிதம் = 64 : 343.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{64:343}",
        "fallback": "Ratio of their volumes = 64 : 343.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{64:343}",
        "fallback": "அவற்றின் கன அளவுகளின் விகிதம் = 64 : 343.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q8",
    "label": {
      "en": "Exercise 7.2 · Q8",
      "ta": "பயிற்சி 7.2 · வினா 8"
    },
    "title": {
      "en": "Volume ratio of sphere and hemisphere with equal TSA",
      "ta": "சம மொத்தப் பரப்பு கொண்ட கோளம் மற்றும் அரைக்கோளத்தின் கன அளவு விகிதம்"
    },
    "q": {
      "en": "8. A solid sphere and a solid hemisphere have equal total surface area. Prove that the ratio of their volume is 3√3 : 4.",
      "ta": "8. ஒரு திண்மக் கோளம் மற்றும் திண்ம அரைக்கோளத்தின் மொத்தப் பரப்பு சமமானதாக இருக்குமானால் அவற்றின் கன அளவுகளின் விகிதம் 3√3 : 4 என நிரூபி."
    },
    "questionMath": {
      "en": [
        "8. A solid sphere and a solid hemisphere have equal total surface area. Prove that the ratio of their volume is ",
        {
          "latex": "3\\sqrt{3}:4",
          "fallback": "3√3 : 4",
          "display": false
        },
        "."
      ],
      "ta": [
        "8. ஒரு திண்மக் கோளம் மற்றும் திண்ம அரைக்கோளத்தின் மொத்தப் பரப்பு சமமானதாக இருக்குமானால் அவற்றின் கன அளவுகளின் விகிதம் ",
        {
          "latex": "3\\sqrt{3}:4",
          "fallback": "3√3 : 4",
          "display": false
        },
        " என நிரூபி."
      ]
    },
    "steps": [
      {
        "en": "Let R be the radius of the solid sphere and r be the radius of the solid hemisphere. Their total surface areas are 4πR² and 3πr² respectively (a solid hemisphere includes its flat circular base πr² in addition to its curved surface 2πr²).",
        "ta": "திண்மக் கோளத்தின் ஆரம் R மற்றும் திண்ம அரைக்கோளத்தின் ஆரம் r என்க. கோளத்தின் மொத்தப் பரப்பு 4πR² மற்றும் திண்ம அரைக்கோளத்தின் மொத்தப் பரப்பு 3πr² ஆகும் (வளைபரப்பு 2πr² உடன் அடிவட்டப் பரப்பு πr² சேரும்).",
        "eq": "TSA_sphere = 4πR², TSA_hemisphere = 3πr²",
        "math": {
          "latex": "\\begin{aligned}\\mathrm{TSA}_{\\mathrm{sphere}}&=4\\pi R^2\\\\\\mathrm{TSA}_{\\mathrm{hemisphere}}&=3\\pi r^2\\end{aligned}",
          "fallback": "TSA_sphere = 4πR², TSA_hemisphere = 3πr²",
          "display": true
        }
      },
      {
        "en": "Equate the two total surface areas, cancel π, and take the positive square root to express the ratio R/r.",
        "ta": "இரு மொத்தப் பரப்புகளும் சமம் எனக் கொண்டு, π-ஐ நீக்கி, இருபுறமும் வர்க்கமூலம் எடுக்க R/r விகிதம் கிடைக்கும்.",
        "eq": "4πR² = 3πr² => R²/r² = 3/4 => R/r = √3 / 2",
        "math": {
          "latex": "\\begin{aligned}4\\pi R^2&=3\\pi r^2\\\\\\dfrac{R^2}{r^2}&=\\dfrac{3}{4}\\\\\\dfrac{R}{r}&=\\dfrac{\\sqrt{3}}{2}\\end{aligned}",
          "fallback": "4πR² = 3πr² => R²/r² = 3/4 => R/r = √3 / 2",
          "display": true
        }
      },
      {
        "en": "Write the ratio of the volume of the sphere to the volume of the hemisphere. Cancel (2/3)π so the ratio simplifies to 2(R/r)³.",
        "ta": "கோளத்தின் கன அளவிற்கும் அரைக்கோளத்தின் கன அளவிற்கும் உள்ள விகிதத்தை எழுதுவோம். பொதுவான (2/3)π காரணியை நீக்க 2(R/r)³ கிடைக்கும்.",
        "eq": "V_sphere / V_hemisphere = [(4/3)πR³] / [(2/3)πr³] = 2(R/r)³",
        "math": {
          "latex": "\\dfrac{V_{\\mathrm{sphere}}}{V_{\\mathrm{hemisphere}}}=\\dfrac{\\tfrac{4}{3}\\pi R^3}{\\tfrac{2}{3}\\pi r^3}=2\\left(\\dfrac{R}{r}\\right)^3",
          "fallback": "V_sphere / V_hemisphere = [(4/3)πR³] / [(2/3)πr³] = 2(R/r)³",
          "display": true
        }
      },
      {
        "en": "Substitute R/r = √3 / 2. Keep the radical intact: (√3)³ = 3√3 and 2³ = 8, so 2 × (3√3 / 8) = 3√3 / 4.",
        "ta": "R/r = √3 / 2 எனப் பிரதியிடுவோம். வர்க்கமூலக் குறியீட்டைத் தக்கவைத்து (√3)³ = 3√3 மற்றும் 2³ = 8 எனப் பெற, 2 × (3√3 / 8) = 3√3 / 4 ஆகும். எனவே விகிதம் 3√3 : 4 என நிரூபிக்கப்பட்டது.",
        "eq": "V_sphere / V_hemisphere = 2(√3/2)³ = 2(3√3/8) = 3√3 / 4 => 3√3 : 4",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{V_{\\mathrm{sphere}}}{V_{\\mathrm{hemisphere}}}&=2\\left(\\dfrac{\\sqrt{3}}{2}\\right)^3\\\\&=2\\left(\\dfrac{3\\sqrt{3}}{8}\\right)=\\dfrac{3\\sqrt{3}}{4}\\\\V_{\\mathrm{sphere}}:V_{\\mathrm{hemisphere}}&=3\\sqrt{3}:4\\end{aligned}",
          "fallback": "V_sphere / V_hemisphere = 2(√3/2)³ = 2(3√3/8) = 3√3 / 4 => 3√3 : 4",
          "display": true
        }
      }
    ],
    "answer": "Ratio of their volumes = 3√3 : 4 (Proved).",
    "answerTa": "அவற்றின் கன அளவுகளின் விகிதம் = 3√3 : 4 (நிரூபிக்கப்பட்டது).",
    "answerMath": {
      "en": {
        "latex": "\\boxed{3\\sqrt{3}:4}",
        "fallback": "Ratio of their volumes = 3√3 : 4 (Proved).",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{3\\sqrt{3}:4}",
        "fallback": "அவற்றின் கன அளவுகளின் விகிதம் = 3√3 : 4 (நிரூபிக்கப்பட்டது).",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q9",
    "label": {
      "en": "Exercise 7.2 · Q9",
      "ta": "பயிற்சி 7.2 · வினா 9"
    },
    "title": {
      "en": "Volume of copper in a spherical shell",
      "ta": "உள்ளீடற்ற தாமிரக் கோளத்தின் கன அளவு"
    },
    "q": {
      "en": "9. The outer and the inner surface areas of a spherical copper shell are 576π cm² and 324π cm² respectively. Find the volume of the material required to make the shell.",
      "ta": "9. ஓர் உள்ளீடற்ற தாமிரக் கோளத்தின் வெளிப்புற, உட்புறப் புறப்பரப்புகள் முறையே 576π ச. செ.மீ மற்றும் 324π ச. செ.மீ எனில், கோளத்தை உருவாக்கத் தேவையான தாமிரத்தின் கனஅளவைக் காண்க."
    },
    "questionMath": {
      "en": [
        "9. The outer and the inner surface areas of a spherical copper shell are ",
        {
          "latex": "576\\pi\\,\\mathrm{cm}^2",
          "fallback": "576π cm²",
          "display": false
        },
        " and ",
        {
          "latex": "324\\pi\\,\\mathrm{cm}^2",
          "fallback": "324π cm²",
          "display": false
        },
        " respectively. Find the volume of the material required to make the shell."
      ],
      "ta": [
        "9. ஓர் உள்ளீடற்ற தாமிரக் கோளத்தின் வெளிப்புற, உட்புறப் புறப்பரப்புகள் முறையே ",
        {
          "latex": "576\\pi",
          "fallback": "576π",
          "display": false
        },
        " ச. செ.மீ மற்றும் ",
        {
          "latex": "324\\pi",
          "fallback": "324π",
          "display": false
        },
        " ச. செ.மீ எனில், கோளத்தை உருவாக்கத் தேவையான தாமிரத்தின் கனஅளவைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Let R be the outer radius and r be the inner radius of the spherical shell. Use the surface area of a sphere 4πR² = 576π to find the outer radius R.",
        "ta": "உள்ளீடற்ற கோளத்தின் வெளிப்புற ஆரம் R மற்றும் உட்புற ஆரம் r என்க. கோளத்தின் புறப்பரப்பு 4πR² = 576π எனக் கொண்டு வெளிப்புற ஆரம் R-ஐக் காண்போம்.",
        "eq": "4πR² = 576π => R² = 144 => R = 12 cm",
        "math": {
          "latex": "\\begin{aligned}4\\pi R^2&=576\\pi\\\\R^2&=\\dfrac{576}{4}=144\\\\R&=12\\,\\mathrm{cm}\\end{aligned}",
          "fallback": "4πR² = 576π => R² = 144 => R = 12 cm",
          "display": true
        }
      },
      {
        "en": "Similarly, use the inner surface area 4πr² = 324π to find the inner radius r.",
        "ta": "அதேபோல், உட்புறப் புறப்பரப்பு 4πr² = 324π எனக் கொண்டு உட்புற ஆரம் r-ஐக் காண்போம்.",
        "eq": "4πr² = 324π => r² = 81 => r = 9 cm",
        "math": {
          "latex": "\\begin{aligned}4\\pi r^2&=324\\pi\\\\r^2&=\\dfrac{324}{4}=81\\\\r&=9\\,\\mathrm{cm}\\end{aligned}",
          "fallback": "4πr² = 324π => r² = 81 => r = 9 cm",
          "display": true
        }
      },
      {
        "en": "The volume of copper in the hollow spherical shell is the outer sphere's volume minus the inner sphere's volume: V = (4/3)π(R³ − r³).",
        "ta": "உள்ளீடற்ற கோளத்தை உருவாக்கத் தேவையான தாமிரத்தின் கன அளவு = வெளிப்புறக் கோளத்தின் கன அளவு − உட்புறக் கோளத்தின் கன அளவு = (4/3)π(R³ − r³).",
        "eq": "V = (4/3)π(12³ − 9³) = (4/3)π(1728 − 729) = (4/3)π(999)",
        "math": {
          "latex": "\\begin{aligned}V&=\\dfrac{4}{3}\\pi(R^3-r^3)\\\\&=\\dfrac{4}{3}\\pi(12^3-9^3)\\\\&=\\dfrac{4}{3}\\pi(1728-729)=\\dfrac{4}{3}\\pi(999)\\end{aligned}",
          "fallback": "V = (4/3)π(12³ − 9³) = (4/3)π(1728 − 729) = (4/3)π(999)",
          "display": true
        }
      },
      {
        "en": "Divide 999 by 3 to get 333, substitute π = 22/7, and simplify to two decimal places.",
        "ta": "999-ஐ 3-ஆல் வகுத்தால் 333 கிடைக்கும். π = 22/7 எனப் பிரதியிட்டு இரு தசம இடங்களுக்குத் திருத்தமாக விடை காண்போம்.",
        "eq": "V = 4 × (22/7) × 333 = 29304/7 ≈ 4186.29 cm³",
        "math": {
          "latex": "\\begin{aligned}V&=4\\times\\dfrac{22}{7}\\times333\\\\&=\\dfrac{29304}{7}\\\\&\\approx4186.29\\,\\mathrm{cm}^3\\end{aligned}",
          "fallback": "V = 4 × (22/7) × 333 = 29304/7 ≈ 4186.29 cm³",
          "display": true
        }
      }
    ],
    "answer": "Volume of the material required = 4186.29 cm³.",
    "answerTa": "தேவையான தாமிரத்தின் கன அளவு = 4186.29 க. செ.மீ.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{4186.29\\,\\mathrm{cm}^3}",
        "fallback": "Volume of the material required = 4186.29 cm³.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{4186.29\\,\\mathrm{cm}^3}",
        "fallback": "தேவையான தாமிரத்தின் கன அளவு = 4186.29 க. செ.மீ.",
        "display": true
      }
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.2",
    "topic": {
      "en": "Mensuration — Volumes",
      "ta": "அளவியல் — கன அளவுகள்"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "2025-tamil-pdf-checked-teacher-review-pending",
    "sourceFidelity": {
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 296,
        "ta": 304
      },
      "sourcePrintedPage": {
        "en": 290,
        "ta": 298
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.2, printed p.290 / PDF p.296 (answers printed p.341 / PDF p347); Tamil Exercise 7.2, printed p.298 / PDF p.304 (answers printed p.356 / PDF p.362).",
    "id": "c10-7-ex7-2-q10",
    "label": {
      "en": "Exercise 7.2 · Q10",
      "ta": "பயிற்சி 7.2 · வினா 10"
    },
    "title": {
      "en": "Cost of milk in a frustum container",
      "ta": "இடைக்கண்ட வடிவக் கொள்கலனில் நிரப்பப்படும் பாலின் விலை"
    },
    "q": {
      "en": "10. A container open at the top is in the form of a frustum of a cone of height 16 cm with radii of its lower and upper ends are 8 cm and 20 cm respectively. Find the cost of milk which can completely fill a container at the rate of ₹40 per litre.",
      "ta": "10. உயரம் 16 செ.மீ உடைய ஒரு கூம்பின் இடைக்கண்ட வடிவில் அமைந்த கொள்கலன் ஒன்றின் மேற்புறம் திறந்த நிலையில் உள்ளது. கீழ்ப்புற ஆரம் 8 செ.மீ மற்றும் மேற்புற ஆரம் 20 செ.மீ கொண்ட கொள்கலனில் முழுமையாகப் பால் நிரப்பப்படுகிறது. ஒரு லிட்டர் பாலின் விலை ₹40 எனில், நிரப்பப்படும் பாலின் மொத்த விலையைக் காண்க."
    },
    "steps": [
      {
        "en": "Identify the dimensions of the frustum: height h = 16 cm, lower radius r = 8 cm, and upper radius R = 20 cm.",
        "ta": "கூம்பின் இடைக்கண்டத்தின் அளவுகள்: உயரம் h = 16 செ.மீ, கீழ்ப்புற ஆரம் r = 8 செ.மீ மற்றும் மேற்புற ஆரம் R = 20 செ.மீ ஆகும்.",
        "eq": "h = 16 cm, r = 8 cm, R = 20 cm",
        "math": {
          "latex": "h=16\\,\\mathrm{cm},\\quad r=8\\,\\mathrm{cm},\\quad R=20\\,\\mathrm{cm}",
          "fallback": "h = 16 cm, r = 8 cm, R = 20 cm",
          "display": true
        }
      },
      {
        "en": "Use the volume formula for a frustum of a cone: V = (1/3)πh(R² + Rr + r²) with π = 22/7.",
        "ta": "கூம்பின் இடைக்கண்டத்தின் கன அளவு சூத்திரம் V = (1/3)πh(R² + Rr + r²) இல் π = 22/7 எனப் பிரதியிட்டுக் கன அளவைக் காண்போம்.",
        "eq": "V = (1/3)(22/7)(16)(20² + 20×8 + 8²) = (1/3)(22/7)(16)(624)",
        "math": {
          "latex": "\\begin{aligned}V&=\\dfrac{1}{3}\\pi h(R^2+Rr+r^2)\\\\&=\\dfrac{1}{3}\\times\\dfrac{22}{7}\\times16\\times(20^2+20\\times8+8^2)\\\\&=\\dfrac{1}{3}\\times\\dfrac{22}{7}\\times16\\times624\\end{aligned}",
          "fallback": "V = (1/3)(22/7)(16)(20² + 20×8 + 8²) = (1/3)(22/7)(16)(624)",
          "display": true
        }
      },
      {
        "en": "Divide 624 by 3 to get 208, then multiply and convert cubic centimetres to litres using 1000 cm³ = 1 litre.",
        "ta": "624-ஐ 3-ஆல் வகுத்தால் 208 கிடைக்கும். பெருக்கி கிடைக்கும் கன சென்டிமீட்டர் அளவை, 1000 க. செ.மீ = 1 லிட்டர் என்ற அடிப்படையில் லிட்டராக மாற்றுவோம்.",
        "eq": "V = 73216/7 ≈ 10459.43 cm³ = 10.4594... L ≈ 10.459 L",
        "math": {
          "latex": "\\begin{aligned}V&=\\dfrac{22\\times16\\times208}{7}=\\dfrac{73216}{7}\\,\\mathrm{cm}^3\\\\&\\approx10459.43\\,\\mathrm{cm}^3\\\\&=10.4594\\ldots\\,\\mathrm{L}\\approx10.459\\,\\mathrm{L}\\end{aligned}",
          "fallback": "V = 73216/7 ≈ 10459.43 cm³ = 10.4594... L ≈ 10.459 L",
          "display": true
        }
      },
      {
        "en": "Multiply the volume in litres by ₹40 per litre. Using the textbook's rounded 10.459 L gives ₹418.36 (keeping all digits unrounded gives ₹418.38).",
        "ta": "லிட்டர் அளவை ஒரு லிட்டரின் விலை ₹40-ஆல் பெருக்குவோம். பாடநூல் முழுமையாக்கல் மதிப்பான 10.459 லிட்டரைப் பயன்படுத்தினால் ₹418.36 கிடைக்கும் (முழுமையாக்காமல் கணக்கிட்டால் ₹418.38 வரும்).",
        "eq": "Cost = 10.459 × ₹40 = ₹418.36 (unrounded: ₹418.38)",
        "math": {
          "latex": "\\begin{aligned}\\text{Cost}&=10.459\\times40=\\text{Rs.}\\,418.36\\\\(\\text{Unrounded: }&\\text{Rs.}\\,418.38)\\end{aligned}",
          "fallback": "Cost = 10.459 × ₹40 = ₹418.36 (unrounded: ₹418.38)",
          "display": true
        }
      }
    ],
    "answer": "Cost of milk = ₹418.36.",
    "answerTa": "பாலின் மொத்த விலை = ₹418.36.",
    "answerMath": {
      "en": {
        "latex": "\\boxed{\\text{Rs.}\\,418.36}",
        "fallback": "Cost of milk = ₹418.36.",
        "display": true
      },
      "ta": {
        "latex": "\\boxed{\\text{Rs.}\\,418.36}",
        "fallback": "பாலின் மொத்த விலை = ₹418.36.",
        "display": true
      }
    }
  }
];
const grade = window.TRIGGLE_CLASSES?.[10];
const chapter = window.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 10)?.chapters?.find(c => c.number === 7);
if (!grade || !chapter) throw Error('Missing Grade 10 Chapter 7 dependencies');
chapter.textbookQuestionIds = chapter.textbookQuestionIds || [];
for (const e of entries) {
  if (grade.items.some(x => x.id === e.id)) throw Error('Duplicate Mensuration record ' + e.id);
  grade.items.push(e);
  if (!chapter.textbookQuestionIds.includes(e.id)) chapter.textbookQuestionIds.push(e.id);
}
})();
