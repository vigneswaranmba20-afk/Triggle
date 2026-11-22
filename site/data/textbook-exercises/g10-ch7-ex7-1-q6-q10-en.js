/* Grade 10 Mensuration Exercise 7.1 Q6–Q10: English-first 2025 source-page verified records; do not imply Tamil authoring approval. */
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
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, revised 2025. English Exercise 7.1 printed p.282/PDF p.288, Tamil printed p.290/PDF p.296; answer keys EN printed p.341/PDF p.347, TA printed p.356/PDF p.362. Original textbook question, figure and answer page images checked; Tamil authored teaching copy pending.",
    "id": "c10-7-ex7-1-q6",
    "label": {
      "en": "Exercise 7.1 · Q6",
      "ta": "பயிற்சி 7.1 · வினா 6 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Birthday caps from a sheet of paper"
    },
    "q": {
      "en": "6. A girl wishes to prepare birthday caps in the form of right circular cones for her birthday party, using a sheet of paper whose area is 5720 cm², how many caps can be made with radius 5 cm and height 12 cm."
    },
    "steps": [
      {
        "en": "A birthday cap is an open cone, so only its curved surface needs paper. First find the slant height ℓ from the given vertical height and radius.",
        "eq": "ℓ² = r² + h² = 5² + 12² = 169",
        "math": {
          "latex": "\\ell=\\sqrt{r^2+h^2}=\\sqrt{5^2+12^2}=13\\,\\mathrm{cm}",
          "fallback": "ℓ² = r² + h² = 5² + 12² = 169",
          "display": true
        }
      },
      {
        "en": "Use the curved surface area formula of a cone. Do not include πr², because a birthday cap has no paper base.",
        "eq": "Area of one cap = πrℓ = π×5×13 = 65π cm²",
        "math": {
          "latex": "A_{\\mathrm{cap}}=\\pi r\\ell=\\pi(5)(13)=65\\pi\\,\\mathrm{cm}^2",
          "fallback": "Area of one cap = πrℓ = π×5×13 = 65π cm²",
          "display": true
        }
      },
      {
        "en": "To find the number of whole caps, divide the available paper area by the area required for one cap.",
        "eq": "Number of caps = 5720/(65π)",
        "math": {
          "latex": "N=\\dfrac{5720}{65\\pi}",
          "fallback": "Number of caps = 5720/(65π)",
          "display": true
        }
      },
      {
        "en": "Substitute π = 22/7. The result is a whole number, so no paper remains unused in this idealised calculation.",
        "eq": "N = 5720 ÷ [65×22/7] = 28",
        "math": {
          "latex": "N=\\dfrac{5720\\times7}{65\\times22}=28",
          "fallback": "N = 5720 ÷ [65×22/7] = 28",
          "display": true
        }
      }
    ],
    "answer": "28 birthday caps.",
    "answerMath": {
      "latex": "\\boxed{28\\text{ birthday caps}}",
      "fallback": "28 birthday caps.",
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
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, revised 2025. English Exercise 7.1 printed p.282/PDF p.288, Tamil printed p.290/PDF p.296; answer keys EN printed p.341/PDF p.347, TA printed p.356/PDF p.362. Original textbook question, figure and answer page images checked; Tamil authored teaching copy pending.",
    "id": "c10-7-ex7-1-q7",
    "label": {
      "en": "Exercise 7.1 · Q7",
      "ta": "பயிற்சி 7.1 · வினா 7 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Curved surface area ratio of two cones"
    },
    "q": {
      "en": "7. The ratio of the radii of two right circular cones of same height is 1:3. Find the ratio of their curved surface area when the height of each cone is 3 times the radius of the smaller cone."
    },
    "steps": [
      {
        "en": "Choose a convenient symbol x for the smaller radius. Because the radii are in the ratio 1:3, they are x and 3x. Both cones have height 3x.",
        "eq": "r₁ = x, r₂ = 3x, h₁ = h₂ = 3x",
        "math": {
          "latex": "r_1=x,\\quad r_2=3x,\\quad h_1=h_2=3x",
          "fallback": "r₁ = x, r₂ = 3x, h₁ = h₂ = 3x",
          "display": true
        }
      },
      {
        "en": "Use the Pythagorean rule to find the slant height of the smaller cone.",
        "eq": "ℓ₁ = √(x²+(3x)²) = x√10",
        "math": {
          "latex": "\\ell_1=\\sqrt{x^2+(3x)^2}=x\\sqrt{10}",
          "fallback": "ℓ₁ = √(x²+(3x)²) = x√10",
          "display": true
        }
      },
      {
        "en": "For the larger cone, its radius is 3x and its height is also 3x.",
        "eq": "ℓ₂ = √((3x)²+(3x)²) = 3x√2",
        "math": {
          "latex": "\\ell_2=\\sqrt{(3x)^2+(3x)^2}=3x\\sqrt2",
          "fallback": "ℓ₂ = √((3x)²+(3x)²) = 3x√2",
          "display": true
        }
      },
      {
        "en": "The curved surface area of a cone is πrℓ. Form the ratio and cancel the common π and x² factors.",
        "eq": "CSA₁ : CSA₂ = π(x)(x√10) : π(3x)(3x√2) = √10 : 9√2",
        "math": {
          "latex": "\\mathrm{CSA}_1:\\mathrm{CSA}_2=\\pi x(x\\sqrt{10}):\\pi(3x)(3x\\sqrt2)=\\sqrt{10}:9\\sqrt2",
          "fallback": "CSA₁ : CSA₂ = π(x)(x√10) : π(3x)(3x√2) = √10 : 9√2",
          "display": true
        }
      },
      {
        "en": "Divide both parts by √2 to simplify the radical. Keep the square-root sign: the textbook answer is √5 : 9, not 5 : 9.",
        "eq": "√10 : 9√2 = √5 : 9",
        "math": {
          "latex": "\\dfrac{\\sqrt{10}}{\\sqrt2}:\\dfrac{9\\sqrt2}{\\sqrt2}=\\sqrt5:9",
          "fallback": "√10 : 9√2 = √5 : 9",
          "display": true
        }
      }
    ],
    "answer": "Curved surface area ratio = √5 : 9.",
    "answerMath": {
      "latex": "\\boxed{\\sqrt5:9}",
      "fallback": "Ratio = √5 : 9.",
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
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, revised 2025. English Exercise 7.1 printed p.282/PDF p.288, Tamil printed p.290/PDF p.296; answer keys EN printed p.341/PDF p.347, TA printed p.356/PDF p.362. Original textbook question, figure and answer page images checked; Tamil authored teaching copy pending.",
    "id": "c10-7-ex7-1-q8",
    "label": {
      "en": "Exercise 7.1 · Q8",
      "ta": "பயிற்சி 7.1 · வினா 8 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Percentage increase in a sphere's surface area"
    },
    "q": {
      "en": "8. The radius of a sphere increases by 25%. Find the percentage increase in its surface area."
    },
    "steps": [
      {
        "en": "The surface area of a sphere of radius r is 4πr². This means area changes with the square of its radius.",
        "eq": "A = 4πr²",
        "math": {
          "latex": "A=4\\pi r^2",
          "fallback": "A = 4πr²",
          "display": true
        }
      },
      {
        "en": "A 25% increase makes the new radius 125% of the original, or 1.25r.",
        "eq": "New radius = r + (25/100)r = 1.25r",
        "math": {
          "latex": "r_{\\mathrm{new}}=\\left(1+\\dfrac{25}{100}\\right)r=1.25r",
          "fallback": "New radius = r + (25/100)r = 1.25r",
          "display": true
        }
      },
      {
        "en": "Substitute the new radius into the surface area formula and compare it with the old area.",
        "eq": "A_new = 4π(1.25r)² = 1.5625 A",
        "math": {
          "latex": "A_{\\mathrm{new}}=4\\pi(1.25r)^2=1.5625(4\\pi r^2)=1.5625A",
          "fallback": "A_new = 4π(1.25r)² = 1.5625 A",
          "display": true
        }
      },
      {
        "en": "The extra area is 0.5625 times the original area. Multiply by 100 to express this as a percentage.",
        "eq": "Increase % = (1.5625 − 1)×100 = 56.25%",
        "math": {
          "latex": "\\%\\ \\mathrm{increase}=(1.5625-1)\\times100=56.25\\%",
          "fallback": "Increase % = (1.5625 − 1)×100 = 56.25%",
          "display": true
        }
      }
    ],
    "answer": "The sphere's surface area increases by 56.25%.",
    "answerMath": {
      "latex": "\\boxed{56.25\\%\\text{ increase}}",
      "fallback": "Surface area increases by 56.25%.",
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
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, revised 2025. English Exercise 7.1 printed p.282/PDF p.288, Tamil printed p.290/PDF p.296; answer keys EN printed p.341/PDF p.347, TA printed p.356/PDF p.362. Original textbook question, figure and answer page images checked; Tamil authored teaching copy pending.",
    "id": "c10-7-ex7-1-q9",
    "label": {
      "en": "Exercise 7.1 · Q9",
      "ta": "பயிற்சி 7.1 · வினா 9 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Cost of painting a hollow hemispherical vessel"
    },
    "q": {
      "en": "9. The internal and external diameters of a hollow hemispherical vessel are 20 cm and 28 cm respectively. Find the cost to paint the vessel all over at ₹0.14 per cm²."
    },
    "steps": [
      {
        "en": "The given measurements are diameters, not radii. Divide each by 2 to obtain the inner and outer radii.",
        "eq": "Inner radius r = 20/2 = 10 cm; outer radius R = 28/2 = 14 cm",
        "math": {
          "latex": "r=\\dfrac{20}{2}=10\\,\\mathrm{cm},\\quad R=\\dfrac{28}{2}=14\\,\\mathrm{cm}",
          "fallback": "Inner radius r = 20/2 = 10 cm; outer radius R = 28/2 = 14 cm",
          "display": true
        }
      },
      {
        "en": "Paint covers the outside curved hemisphere, the inside curved hemisphere, and the flat ring around the rim. There is no solid circular base.",
        "eq": "Painted area = 2πR² + 2πr² + π(R² − r²)",
        "math": {
          "latex": "A=2\\pi R^2+2\\pi r^2+\\pi(R^2-r^2)",
          "fallback": "Painted area = 2πR² + 2πr² + π(R² − r²)",
          "display": true
        }
      },
      {
        "en": "Insert the radii and simplify the total area. All three exposed surfaces matter.",
        "eq": "A = 2π(14²) + 2π(10²) + π(14²−10²) = 688π cm²",
        "math": {
          "latex": "A=2\\pi(196)+2\\pi(100)+\\pi(196-100)=688\\pi\\,\\mathrm{cm}^2",
          "fallback": "A = 2π(14²) + 2π(10²) + π(14²−10²) = 688π cm²",
          "display": true
        }
      },
      {
        "en": "Multiply the full painted area by the stated rate of ₹0.14 for every square centimetre.",
        "eq": "Cost = 0.14×688×(22/7) = ₹302.72",
        "math": {
          "latex": "C=0.14\\times688\\times\\dfrac{22}{7}=\\text{₹}\\,302.72",
          "fallback": "Cost = 0.14×688×(22/7) = ₹302.72",
          "display": true
        }
      }
    ],
    "answer": "Total painting cost = ₹302.72.",
    "answerMath": {
      "latex": "\\boxed{\\text{₹}\\,302.72}",
      "fallback": "Total painting cost = ₹302.72.",
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
      "status": "page-visual-checked",
      "sourcePdfPage": {
        "en": 288,
        "ta": 296
      },
      "sourcePrintedPage": {
        "en": 282,
        "ta": 290
      }
    },
    "reference": "Tamil Nadu SCERT Standard Ten Mathematics, revised 2025. English Exercise 7.1 printed p.282/PDF p.288, Tamil printed p.290/PDF p.296; answer keys EN printed p.341/PDF p.347, TA printed p.356/PDF p.362. Original textbook question, figure and answer page images checked; Tamil authored teaching copy pending.",
    "id": "c10-7-ex7-1-q10",
    "label": {
      "en": "Exercise 7.1 · Q10",
      "ta": "பயிற்சி 7.1 · வினா 10 (English solution; Tamil review pending)"
    },
    "title": {
      "en": "Painted area and cost of a frustum-shaped lampshade"
    },
    "q": {
      "en": "10. The frustum shaped outer portion of the table lamp has to be painted including the top part. Find the total cost of painting the lamp if the cost of painting 1 sq.cm is ₹2."
    },
    "steps": [
      {
        "en": "Read the attached textbook figure carefully. The top radius is 6 cm, the bottom radius is 12 cm and the vertical height is 8 cm. These labels represent radii, not diameters.",
        "eq": "r = 6 cm, R = 12 cm, h = 8 cm",
        "math": {
          "latex": "r=6\\,\\mathrm{cm},\\quad R=12\\,\\mathrm{cm},\\quad h=8\\,\\mathrm{cm}",
          "fallback": "r = 6 cm, R = 12 cm, h = 8 cm",
          "display": true
        }
      },
      {
        "en": "For a frustum, the difference in radii and the vertical height form a right triangle. Use Pythagoras to find slant height.",
        "eq": "ℓ = √[8²+(12−6)²] = √100 = 10 cm",
        "math": {
          "latex": "\\ell=\\sqrt{h^2+(R-r)^2}=\\sqrt{8^2+(12-6)^2}=10\\,\\mathrm{cm}",
          "fallback": "ℓ = √[8²+(12−6)²] = √100 = 10 cm",
          "display": true
        }
      },
      {
        "en": "Paint only the outer sloping surface and the circular top. The bottom opening and the inside are not part of the stated painted surface.",
        "eq": "A = π(R+r)ℓ + πr²",
        "math": {
          "latex": "A=\\pi(R+r)\\ell+\\pi r^2",
          "fallback": "A = π(R+r)ℓ + πr²",
          "display": true
        }
      },
      {
        "en": "Substitute the radii and slant height to find the total painted area.",
        "eq": "A = π(12+6)×10 + π×6² = 216π cm²",
        "math": {
          "latex": "A=\\pi(12+6)(10)+\\pi(6^2)=216\\pi\\,\\mathrm{cm}^2",
          "fallback": "A = π(12+6)×10 + π×6² = 216π cm²",
          "display": true
        }
      },
      {
        "en": "Following the textbook's intermediate-area rounding convention, first use π=22/7 and round painted area to two decimal places.",
        "eq": "A = 216×22/7 = 678.857… ≈ 678.86 cm²",
        "math": {
          "latex": "A=216\\times\\dfrac{22}{7}=678.857\\ldots\\approx678.86\\,\\mathrm{cm}^2",
          "fallback": "A = 216×22/7 = 678.857… ≈ 678.86 cm²",
          "display": true
        }
      },
      {
        "en": "Multiply the rounded painted area by ₹2 per cm². This gives the printed textbook answer. Keeping all digits until the very end would instead round to ₹1357.71; the one-paise difference is a rounding-order choice, not a new formula.",
        "eq": "Cost = 678.86×₹2 = ₹1357.72",
        "math": {
          "latex": "C=678.86\\times\\text{₹}\\,2=\\text{₹}\\,1357.72",
          "fallback": "Cost = 678.86×₹2 = ₹1357.72",
          "display": true
        }
      }
    ],
    "answer": "Total cost = ₹1357.72 (using the textbook's intermediate-area rounding).",
    "answerMath": {
      "latex": "\\boxed{\\text{₹}\\,1357.72}",
      "fallback": "Cost = ₹1357.72 (textbook rounding).",
      "display": true
    },
    "figureSrc": "assets/grade10-ch7/ex7-1-q10.svg",
    "figureAlt": {
      "en": "Original schematic of a lampshade frustum. The top radius is 6 cm, the bottom radius 12 cm, and the perpendicular height 8 cm. Painted surfaces are the exterior sloping surface and the top disk, not the open bottom."
    },
    "figureCaption": {
      "en": "Measurements read from the 2025 textbook illustration. Paint the outer wall and circular top only."
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[10];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>c.number===7);
if(!grade||!chapter)throw Error('Missing Grade 10 Chapter 7 dependencies');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const e of entries){
 if(grade.items.some(x=>x.id===e.id))throw Error('Duplicate Mensuration record '+e.id);
 grade.items.push(e);
 if(!chapter.textbookQuestionIds.includes(e.id))chapter.textbookQuestionIds.push(e.id);
}
})();
