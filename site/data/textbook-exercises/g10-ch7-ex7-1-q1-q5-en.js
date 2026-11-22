/* Grade 10 Mensuration 2025: Ex 7.1 Q1–Q5 pilot. EN/TA source text layers compared; page-image and Tamil editorial audits pending. */
(()=>{'use strict';
const entries=[
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration — Surface Areas",
      "ta": "அளவியல் — புறப்பரப்பு"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-layer-checked-page-image-pending",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.1, printed p.282 / PDF p.288; Tamil Exercise 7.1, printed p.290 / PDF p.296. Both language text layers compared; page-image and Tamil editorial review pending.",
    "id": "c10-7-ex7-1-q1",
    "label": {
      "en": "Exercise 7.1 · Q1",
      "ta": "பயிற்சி 7.1 · வினா 1 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Cylinder radius and height from ratio and curved area"
    },
    "q": {
      "en": "1. The radius and height of a cylinder are in the ratio 5:7 and its curved surface area is 5500 sq.cm. Find its radius and height."
    },
    "steps": [
      {
        "en": "Let k be the common scale factor of the 5:7 ratio. Write the radius r and height h using k.",
        "eq": "r : h = 5 : 7, so r = 5k and h = 7k",
        "math": {
          "latex": "r:h=5:7,\\quad r=5k,\\quad h=7k",
          "fallback": "r : h = 5 : 7, so r = 5k and h = 7k",
          "display": true
        }
      },
      {
        "en": "The curved surface area of a cylinder is 2πrh. Substitute the given area and the two expressions.",
        "eq": "2π × 5k × 7k = 5500",
        "math": {
          "latex": "2\\pi rh=5500\\quad\\Rightarrow\\quad 2\\pi(5k)(7k)=5500",
          "fallback": "2π × 5k × 7k = 5500",
          "display": true
        }
      },
      {
        "en": "Use π = 22/7, as in the textbook, and solve for the positive scale factor.",
        "eq": "220k² = 5500; k² = 25; k = 5",
        "math": {
          "latex": "70\\times\\dfrac{22}{7}k^2=5500\\quad\\Rightarrow\\quad 220k^2=5500\\quad\\Rightarrow\\quad k=5",
          "fallback": "220k² = 5500; k² = 25; k = 5",
          "display": true
        }
      },
      {
        "en": "Calculate both dimensions and check that their ratio remains 5:7.",
        "eq": "r = 5×5 = 25 cm; h = 7×5 = 35 cm",
        "math": {
          "latex": "r=5(5)=25\\,\\mathrm{cm},\\quad h=7(5)=35\\,\\mathrm{cm}",
          "fallback": "r = 5×5 = 25 cm; h = 7×5 = 35 cm",
          "display": true
        }
      }
    ],
    "answer": "Radius = 25 cm; height = 35 cm.",
    "answerMath": {
      "latex": "\\boxed{r=25\\,\\mathrm{cm},\\quad h=35\\,\\mathrm{cm}}",
      "fallback": "Radius = 25 cm; height = 35 cm.",
      "display": true
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration — Surface Areas",
      "ta": "அளவியல் — புறப்பரப்பு"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-layer-checked-page-image-pending",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.1, printed p.282 / PDF p.288; Tamil Exercise 7.1, printed p.290 / PDF p.296. Both language text layers compared; page-image and Tamil editorial review pending.",
    "id": "c10-7-ex7-1-q2",
    "label": {
      "en": "Exercise 7.1 · Q2",
      "ta": "பயிற்சி 7.1 · வினா 2 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Solid iron cylinder: total area and curved area"
    },
    "q": {
      "en": "2. A solid iron cylinder has total surface area of 1848 sq.cm. Its curved surface area is five – sixth of its total surface area. Find the radius and height of the iron cylinder."
    },
    "steps": [
      {
        "en": "The curved area is five-sixths of the total area. Evaluate it before finding the dimensions.",
        "eq": "CSA = (5/6)×1848 = 1540 cm²",
        "math": {
          "latex": "\\mathrm{CSA}=\\dfrac{5}{6}\\times1848=1540\\,\\mathrm{cm}^2",
          "fallback": "CSA = (5/6)×1848 = 1540 cm²",
          "display": true
        }
      },
      {
        "en": "The difference between total and curved surface area is the combined area of the two circular ends.",
        "eq": "TSA − CSA = 2πr² = 1848 − 1540 = 308 cm²",
        "math": {
          "latex": "2\\pi r^2=1848-1540=308",
          "fallback": "TSA − CSA = 2πr² = 1848 − 1540 = 308 cm²",
          "display": true
        }
      },
      {
        "en": "Use π = 22/7 to obtain a positive radius.",
        "eq": "r² = 308/(2π) = 49; r = 7 cm",
        "math": {
          "latex": "r^2=\\dfrac{308}{2\\times\\frac{22}{7}}=49\\quad\\Rightarrow\\quad r=7\\,\\mathrm{cm}",
          "fallback": "r² = 308/(2π) = 49; r = 7 cm",
          "display": true
        }
      },
      {
        "en": "Use the curved area formula 2πrh to calculate height.",
        "eq": "1540 = 2×(22/7)×7×h = 44h; h = 35 cm",
        "math": {
          "latex": "1540=2\\times\\dfrac{22}{7}\\times7h=44h\\quad\\Rightarrow\\quad h=35\\,\\mathrm{cm}",
          "fallback": "1540 = 2×(22/7)×7×h = 44h; h = 35 cm",
          "display": true
        }
      },
      {
        "en": "Check the complete surface area from the dimensions.",
        "eq": "TSA = 2πr(r+h) = 2×(22/7)×7×42 = 1848 cm²",
        "math": {
          "latex": "2\\pi r(r+h)=2\\times\\dfrac{22}{7}\\times7\\times(7+35)=1848",
          "fallback": "TSA = 2πr(r+h) = 2×(22/7)×7×42 = 1848 cm²",
          "display": true
        }
      }
    ],
    "answer": "Radius = 7 cm; height = 35 cm.",
    "answerMath": {
      "latex": "\\boxed{r=7\\,\\mathrm{cm},\\quad h=35\\,\\mathrm{cm}}",
      "fallback": "Radius = 7 cm; height = 35 cm.",
      "display": true
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration — Surface Areas",
      "ta": "அளவியல் — புறப்பரப்பு"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-layer-checked-page-image-pending",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.1, printed p.282 / PDF p.288; Tamil Exercise 7.1, printed p.290 / PDF p.296. Both language text layers compared; page-image and Tamil editorial review pending.",
    "id": "c10-7-ex7-1-q3",
    "label": {
      "en": "Exercise 7.1 · Q3",
      "ta": "பயிற்சி 7.1 · வினா 3 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Total surface area of a hollow wooden log"
    },
    "q": {
      "en": "3. The external radius and the length of a hollow wooden log are 16 cm and 13 cm respectively. If its thickness is 4 cm then find its T.S.A."
    },
    "steps": [
      {
        "en": "The 4 cm thickness is radial. Subtract it from the outer radius R to find the inner radius r.",
        "eq": "R = 16 cm, r = 16 − 4 = 12 cm, h = 13 cm",
        "math": {
          "latex": "R=16\\,\\mathrm{cm},\\quad r=12\\,\\mathrm{cm},\\quad h=13\\,\\mathrm{cm}",
          "fallback": "R = 16 cm, r = 16 − 4 = 12 cm, h = 13 cm",
          "display": true
        }
      },
      {
        "en": "A hollow log has an outer curved wall, an inner curved wall and two flat ring-shaped ends. Add all four exposed surfaces.",
        "eq": "TSA = 2πRh + 2πrh + 2π(R² − r²)",
        "math": {
          "latex": "\\mathrm{TSA}=2\\pi Rh+2\\pi rh+2\\pi(R^2-r^2)",
          "fallback": "TSA = 2πRh + 2πrh + 2π(R² − r²)",
          "display": true
        }
      },
      {
        "en": "Substitute the measured radii and length, then simplify the bracket.",
        "eq": "TSA = 2π[(16+12)×13 + (16²−12²)] = 2π(364+112)",
        "math": {
          "latex": "\\mathrm{TSA}=2\\pi\\left[(16+12)13+(16^2-12^2)\\right]=2\\pi(476)",
          "fallback": "TSA = 2π[(16+12)×13 + (16²−12²)] = 2π(364+112)",
          "display": true
        }
      },
      {
        "en": "Use π = 22/7 and report square centimetres, because we measured surface area.",
        "eq": "TSA = 952×(22/7) = 2992 cm²",
        "math": {
          "latex": "\\mathrm{TSA}=952\\pi=952\\times\\dfrac{22}{7}=2992\\,\\mathrm{cm}^2",
          "fallback": "TSA = 952×(22/7) = 2992 cm²",
          "display": true
        }
      }
    ],
    "answer": "Total surface area = 2992 cm².",
    "answerMath": {
      "latex": "\\boxed{\\mathrm{TSA}=2992\\,\\mathrm{cm}^2}",
      "fallback": "Total surface area = 2992 cm².",
      "display": true
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration — Surface Areas",
      "ta": "அளவியல் — புறப்பரப்பு"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-layer-checked-page-image-pending",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.1, printed p.282 / PDF p.288; Tamil Exercise 7.1, printed p.290 / PDF p.296. Both language text layers compared; page-image and Tamil editorial review pending.",
    "id": "c10-7-ex7-1-q4",
    "label": {
      "en": "Exercise 7.1 · Q4",
      "ta": "பயிற்சி 7.1 · வினா 4 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Compare cones formed by rotating a right triangle"
    },
    "q": {
      "en": "4. A right angled triangle PQR where ∠Q = 90° is rotated about QR and PQ as central axes. If QR = 16 cm and PR = 20 cm, compare the curved surface areas of the right circular cones so formed by the triangle."
    },
    "steps": [
      {
        "en": "The triangle is right-angled at Q. Apply Pythagoras to find the missing side PQ.",
        "eq": "PQ² = PR² − QR² = 20² − 16² = 144; PQ = 12 cm",
        "math": {
          "latex": "PQ=\\sqrt{PR^2-QR^2}=\\sqrt{20^2-16^2}=12\\,\\mathrm{cm}",
          "fallback": "PQ² = PR² − QR² = 20² − 16² = 144; PQ = 12 cm",
          "display": true
        }
      },
      {
        "en": "Rotating about QR makes QR the height (16 cm) and PQ the base radius (12 cm). The slant height is always PR = 20 cm.",
        "eq": "Axis QR: r = 12 cm, h = 16 cm, l = 20 cm",
        "math": {
          "latex": "\\text{Axis }QR:\\quad r=12,\\ h=16,\\ \\ell=20",
          "fallback": "Axis QR: r = 12 cm, h = 16 cm, l = 20 cm",
          "display": true
        }
      },
      {
        "en": "Use curved surface area of a cone, πrℓ, for the rotation about QR.",
        "eq": "CSA around QR = π×12×20 = 240π cm²",
        "math": {
          "latex": "\\mathrm{CSA}_{QR}=\\pi r\\ell=\\pi(12)(20)=240\\pi\\,\\mathrm{cm}^2",
          "fallback": "CSA around QR = π×12×20 = 240π cm²",
          "display": true
        }
      },
      {
        "en": "Rotating about PQ instead makes PQ the height and QR the base radius. The same side PR is the slant height.",
        "eq": "Axis PQ: r = 16 cm, h = 12 cm, l = 20 cm",
        "math": {
          "latex": "\\text{Axis }PQ:\\quad r=16,\\ h=12,\\ \\ell=20",
          "fallback": "Axis PQ: r = 16 cm, h = 12 cm, l = 20 cm",
          "display": true
        }
      },
      {
        "en": "Compare the two curved areas. Rotation about PQ creates the larger curved surface area.",
        "eq": "CSA around PQ = π×16×20 = 320π cm²; QR : PQ = 3 : 4",
        "math": {
          "latex": "\\mathrm{CSA}_{PQ}=320\\pi\\,\\mathrm{cm}^2,\\quad \\mathrm{CSA}_{QR}:\\mathrm{CSA}_{PQ}=3:4",
          "fallback": "CSA around PQ = π×16×20 = 320π cm²; QR : PQ = 3 : 4",
          "display": true
        }
      }
    ],
    "answer": "The cone formed by rotation about PQ has greater curved surface area (ratio QR : PQ = 3 : 4).",
    "answerMath": {
      "latex": "\\boxed{\\mathrm{CSA}_{QR}:\\mathrm{CSA}_{PQ}=3:4}",
      "fallback": "Rotation about PQ gives greater CSA; QR : PQ = 3 : 4.",
      "display": true
    },
    "figureSrc": "assets/grade10-ch7/ex7-1-q4.svg",
    "figureAlt": {
      "en": "Right triangle PQR with angle Q at 90 degrees, PQ 12 cm, QR 16 cm and hypotenuse PR 20 cm. Rotating about either leg produces a cone."
    },
    "figureCaption": {
      "en": "The leg on the axis becomes the height; the other leg becomes the cone's radius."
    }
  },
  {
    "classNum": 10,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration — Surface Areas",
      "ta": "அளவியல் — புறப்பரப்பு"
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "translationReview": "pending",
    "sourceFidelity": {
      "status": "text-layer-checked-page-image-pending",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.1, printed p.282 / PDF p.288; Tamil Exercise 7.1, printed p.290 / PDF p.296. Both language text layers compared; page-image and Tamil editorial review pending.",
    "id": "c10-7-ex7-1-q5",
    "label": {
      "en": "Exercise 7.1 · Q5",
      "ta": "பயிற்சி 7.1 · வினா 5 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Height of a conical tent for four people"
    },
    "q": {
      "en": "5. 4 persons live in a conical tent whose slant height is 19 m. If each person require 22 m² of the floor area, then find the height of the tent."
    },
    "steps": [
      {
        "en": "Four people each require 22 m² of floor area. Multiply to find the circular base area.",
        "eq": "Base area = 4×22 = 88 m²",
        "math": {
          "latex": "A_{\\mathrm{base}}=4\\times22=88\\,\\mathrm{m}^2",
          "fallback": "Base area = 4×22 = 88 m²",
          "display": true
        }
      },
      {
        "en": "The floor is a circle. Set πr² = 88, then use π = 22/7 to calculate the square of the radius.",
        "eq": "πr² = 88; r² = 88×7/22 = 28 m²",
        "math": {
          "latex": "\\pi r^2=88\\quad\\Rightarrow\\quad r^2=\\dfrac{88}{22/7}=28\\,\\mathrm{m}^2",
          "fallback": "πr² = 88; r² = 88×7/22 = 28 m²",
          "display": true
        }
      },
      {
        "en": "In a right cone, the height h, radius r and slant height l form a right triangle. Apply the Pythagorean relationship.",
        "eq": "l² = h² + r²; h² = 19² − 28 = 333",
        "math": {
          "latex": "\\ell^2=h^2+r^2\\quad\\Rightarrow\\quad h^2=19^2-28=333",
          "fallback": "l² = h² + r²; h² = 19² − 28 = 333",
          "display": true
        }
      },
      {
        "en": "Take the positive square root, because the tent's height cannot be negative. Round to two decimal places.",
        "eq": "h = √333 ≈ 18.25 m",
        "math": {
          "latex": "h=\\sqrt{333}\\approx18.25\\,\\mathrm{m}",
          "fallback": "h = √333 ≈ 18.25 m",
          "display": true
        }
      }
    ],
    "answer": "Height of the tent ≈ 18.25 m.",
    "answerMath": {
      "latex": "\\boxed{h=\\sqrt{333}\\,\\mathrm{m}\\approx18.25\\,\\mathrm{m}}",
      "fallback": "Height of the tent ≈ 18.25 m.",
      "display": true
    },
    "figureSrc": "assets/grade10-ch7/ex7-1-q5.svg",
    "figureAlt": {
      "en": "Conical tent with a 19-metre slant height, dashed central vertical height h, base radius r, and circular floor area 88 square metres."
    },
    "figureCaption": {
      "en": "The radius, vertical height and slant height form a right triangle."
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[10];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>c.number===7);
if(!grade||!chapter)throw Error('Missing Grade 10 Mensuration dependencies');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const entry of entries){
  if(grade.items.some(x=>x.id===entry.id))throw Error('Duplicate Mensuration ID: '+entry.id);
  grade.items.push(entry);
  if(!chapter.textbookQuestionIds.includes(entry.id))chapter.textbookQuestionIds.push(entry.id);
}
})();
