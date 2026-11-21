/* Grade 10 Exercise 8.2 Q4-Q8; verified EN source, Tamil review pending. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='8');
if(!grade||!chapter)throw Error('Grade 10 Statistics Ex8.2 dependencies absent');
const entries=[
  {
    "id": "c10-8-ex8-2-q4",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.2 · Q4",
      "ta": "Exercise 8.2 · Q4 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Variation from summary data"
    },
    "q": {
      "en": "4. If n = 5, x̄ = 6, Σx² = 765, then calculate the coefficient of variation."
    },
    "steps": [
      {
        "en": "Here n means the number of values, x̄ the mean and Σx² the sum of squared values. Use the population variance formula.",
        "eq": "n = 5; x̄ = 6; Σx² = 765; σ² = Σx²/n − x̄²",
        "math": {
          "latex": "\\sigma^2=\\dfrac{\\sum x^2}{n}-\\bar{x}^{\\,2}",
          "display": true,
          "fallback": "n = 5; x̄ = 6; Σx² = 765; σ² = Σx²/n − x̄²"
        }
      },
      {
        "en": "Substitute the given data before taking the square root.",
        "eq": "σ² = 765/5 − 6² = 117",
        "math": {
          "latex": "\\sigma^2=\\dfrac{765}{5}-6^2=117",
          "display": true,
          "fallback": "σ² = 765/5 − 6² = 117"
        }
      },
      {
        "en": "Standard deviation is the nonnegative square root of variance.",
        "eq": "σ = √117 = 3√13",
        "math": {
          "latex": "\\sigma=\\sqrt{117}=3\\sqrt{13}",
          "display": true,
          "fallback": "σ = √117 = 3√13"
        }
      },
      {
        "en": "The coefficient of variation is standard deviation divided by the mean, multiplied by 100%. Keep exact values until the end.",
        "eq": "C.V. = 3√13/6 × 100% = 50√13%",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{3\\sqrt{13}}{6}\\times100\\%=50\\sqrt{13}\\%",
          "display": true,
          "fallback": "C.V. = 3√13/6 × 100% = 50√13%"
        }
      },
      {
        "en": "Round once at the final step. A coefficient above 100% is possible when spread exceeds the mean.",
        "eq": "C.V. ≈ 180.28%",
        "math": {
          "latex": "\\text{C.V.}\\approx180.28\\%",
          "display": true,
          "fallback": "C.V. ≈ 180.28%"
        }
      }
    ],
    "answer": "The coefficient of variation is 180.28%.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Grade 10 Mathematics revised 2025, English printed p.316 / PDF p.322, answer key printed p.342 / PDF p.348, visually inspected; Tamil printed pp.325-326 / PDF pp.331-332 visually inspected for source data and intent. Full Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{C.V.}\\approx180.28\\%}",
      "display": true,
      "fallback": "The coefficient of variation is 180.28%."
    },
    "questionMath": {
      "latex": "\\text{4. If }n=5,\\ \\bar{x}=6,\\ \\sum x^2=765,\\ \\text{calculate the coefficient of variation.}",
      "display": true,
      "fallback": "4. If n = 5, x̄ = 6, Σx² = 765, then calculate the coefficient of variation."
    }
  },
  {
    "id": "c10-8-ex8-2-q5",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.2 · Q5",
      "ta": "Exercise 8.2 · Q5 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Variation of six observations"
    },
    "q": {
      "en": "5. Find the coefficient of variation of 24, 26, 33, 37, 29, 31."
    },
    "steps": [
      {
        "en": "Add all six observations. The mean x̄ is their sum divided by the count n.",
        "eq": "Σx = 180; n = 6; x̄ = 180/6 = 30",
        "math": {
          "latex": "\\bar{x}=\\dfrac{24+26+33+37+29+31}{6}=30",
          "display": true,
          "fallback": "Σx = 180; n = 6; x̄ = 180/6 = 30"
        }
      },
      {
        "en": "Subtract the mean 30 from each observation. The deviations d sum to zero.",
        "eq": "d = −6, −4, 3, 7, −1, 1; Σd = 0",
        "math": {
          "latex": "d_i=x_i-30:\\ -6,-4,3,7,-1,1;\\quad\\sum d_i=0",
          "display": true,
          "fallback": "d = −6, −4, 3, 7, −1, 1; Σd = 0"
        }
      },
      {
        "en": "Square the deviations and add. For population standard deviation divide by n, not n−1.",
        "eq": "Σd² = 36 + 16 + 9 + 49 + 1 + 1 = 112",
        "math": {
          "latex": "\\sum d_i^2=36+16+9+49+1+1=112",
          "display": true,
          "fallback": "Σd² = 36 + 16 + 9 + 49 + 1 + 1 = 112"
        }
      },
      {
        "en": "The variance is the average squared deviation. Its positive square root is σ.",
        "eq": "σ = √(112/6) = √(56/3) ≈ 4.32049",
        "math": {
          "latex": "\\sigma=\\sqrt{\\dfrac{112}{6}}=\\sqrt{\\dfrac{56}{3}}\\approx4.32049",
          "display": true,
          "fallback": "σ = √(112/6) = √(56/3) ≈ 4.32049"
        }
      },
      {
        "en": "Divide standard deviation by the mean and multiply by 100%. This ratio is a percentage without units.",
        "eq": "C.V. ≈ (4.32049/30) × 100% ≈ 14.4%",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{\\sqrt{56/3}}{30}\\times100\\%\\approx14.4\\%",
          "display": true,
          "fallback": "C.V. ≈ (4.32049/30) × 100% ≈ 14.4%"
        }
      }
    ],
    "answer": "The coefficient of variation is approximately 14.4%.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Grade 10 Mathematics revised 2025, English printed p.316 / PDF p.322, answer key printed p.342 / PDF p.348, visually inspected; Tamil printed pp.325-326 / PDF pp.331-332 visually inspected for source data and intent. Full Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{C.V.}\\approx14.4\\%}",
      "display": true,
      "fallback": "The coefficient of variation is approximately 14.4%."
    }
  },
  {
    "id": "c10-8-ex8-2-q6",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.2 · Q6",
      "ta": "Exercise 8.2 · Q6 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Variation in homework completion times"
    },
    "q": {
      "en": "6. The time taken (in minutes) to complete a homework by 8 students in a day are given by 38, 40, 47, 44, 46, 43, 49, 53. Find the coefficient of variation."
    },
    "steps": [
      {
        "en": "There are 8 completion times. Add them and divide by 8 to find the mean x̄, in minutes.",
        "eq": "Σx = 360; n = 8; x̄ = 45 minutes",
        "math": {
          "latex": "\\bar{x}=\\dfrac{360}{8}=45\\text{ minutes}",
          "display": true,
          "fallback": "Σx = 360; n = 8; x̄ = 45 minutes"
        }
      },
      {
        "en": "Subtract 45 from each value. The deviations must sum to zero.",
        "eq": "d = −7, −5, 2, −1, 1, −2, 4, 8; Σd = 0",
        "math": {
          "latex": "d_i:\\ -7,-5,2,-1,1,-2,4,8;\\quad\\sum d_i=0",
          "display": true,
          "fallback": "d = −7, −5, 2, −1, 1, −2, 4, 8; Σd = 0"
        }
      },
      {
        "en": "Add squared deviations and divide by the total number n=8 (population variance).",
        "eq": "Σd² = 164; σ² = 164/8 = 20.5",
        "math": {
          "latex": "\\sigma^2=\\dfrac{164}{8}=20.5",
          "display": true,
          "fallback": "Σd² = 164; σ² = 164/8 = 20.5"
        }
      },
      {
        "en": "Keep σ = √20.5 unrounded to calculate an accurate coefficient of variation. Minutes cancel out.",
        "eq": "σ = √20.5 ≈ 4.52769; C.V. ≈ 10.06154%",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{\\sqrt{20.5}}{45}\\times100\\%\\approx10.06154\\%",
          "display": true,
          "fallback": "σ = √20.5 ≈ 4.52769; C.V. ≈ 10.06154%"
        }
      },
      {
        "en": "Full-precision rounding gives 10.06%. The 2025 textbook key prints 10.07% because it first rounds σ to 4.53, then computes 4.53/45 × 100 ≈ 10.0667%. This difference is explained, not concealed.",
        "eq": "Full precision → 10.06%; textbook's intermediate-rounding method → 10.07%",
        "math": {
          "latex": "\\begin{aligned}\\text{Exact final rounding}&:\\ 10.06\\%\\\\\\text{Rounded }\\sigma=4.53&:\\ \\dfrac{4.53}{45}\\times100\\%\\approx10.07\\%\\end{aligned}",
          "display": true,
          "fallback": "Full precision → 10.06%; textbook's intermediate-rounding method → 10.07%"
        }
      }
    ],
    "answer": "Textbook convention: 10.07%; retaining full precision until the final step gives 10.06%.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Grade 10 Mathematics revised 2025, English printed p.316 / PDF p.322, answer key printed p.342 / PDF p.348, visually inspected; Tamil printed pp.325-326 / PDF pp.331-332 visually inspected for source data and intent. Full Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{C.V.}\\approx10.07\\%\\ \\text{(textbook rounding)}}",
      "display": true,
      "fallback": "Textbook convention: 10.07%; retaining full precision until the final step gives 10.06%."
    }
  },
  {
    "id": "c10-8-ex8-2-q7",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.2 · Q7",
      "ta": "Exercise 8.2 · Q7 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Comparing two students' consistency"
    },
    "q": {
      "en": "7. The total marks scored by two students Sathya and Vidhya in 5 subjects are 460 and 480 with standard deviation 4.6 and 2.4 respectively. Who is more consistent in performance?"
    },
    "steps": [
      {
        "en": "Mean means total marks divided by the number of subjects; do not use the total directly.",
        "eq": "Sathya mean = 460/5 = 92; Vidhya mean = 480/5 = 96",
        "math": {
          "latex": "\\bar{x}_{S}=\\dfrac{460}{5}=92,\\quad\\bar{x}_{V}=\\dfrac{480}{5}=96",
          "display": true,
          "fallback": "Sathya mean = 460/5 = 92; Vidhya mean = 480/5 = 96"
        }
      },
      {
        "en": "Use each student's given standard deviation σ and the formula C.V. = (σ/mean) × 100%.",
        "eq": "σS = 4.6, σV = 2.4; C.V. = σ/x̄ × 100%",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{\\sigma}{\\bar{x}}\\times100\\%",
          "display": true,
          "fallback": "σS = 4.6, σV = 2.4; C.V. = σ/x̄ × 100%"
        }
      },
      {
        "en": "Sathya's coefficient of variation is based on mean 92, not total 460.",
        "eq": "C.V. (Sathya) = 4.6/92 × 100% = 5%",
        "math": {
          "latex": "\\text{C.V.}_{S}=\\dfrac{4.6}{92}\\times100\\%=5\\%",
          "display": true,
          "fallback": "C.V. (Sathya) = 4.6/92 × 100% = 5%"
        }
      },
      {
        "en": "Vidhya's coefficient of variation is based on mean 96, not total 480.",
        "eq": "C.V. (Vidhya) = 2.4/96 × 100% = 2.5%",
        "math": {
          "latex": "\\text{C.V.}_{V}=\\dfrac{2.4}{96}\\times100\\%=2.5\\%",
          "display": true,
          "fallback": "C.V. (Vidhya) = 2.4/96 × 100% = 2.5%"
        }
      },
      {
        "en": "The smaller C.V. indicates more consistent scores relative to the mean. Vidhya has the smaller C.V.",
        "eq": "2.5% < 5% → Vidhya is more consistent",
        "math": {
          "latex": "2.5\\%<5\\%\\quad\\Longrightarrow\\quad\\text{Vidhya is more consistent}",
          "display": true,
          "fallback": "2.5% < 5% → Vidhya is more consistent"
        }
      }
    ],
    "answer": "Vidhya is more consistent in performance.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Grade 10 Mathematics revised 2025, English printed p.316 / PDF p.322, answer key printed p.342 / PDF p.348, visually inspected; Tamil printed pp.325-326 / PDF pp.331-332 visually inspected for source data and intent. Full Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{Vidhya is more consistent}}",
      "display": true,
      "fallback": "Vidhya is more consistent in performance."
    }
  },
  {
    "id": "c10-8-ex8-2-q8",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.2",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.2 · Q8",
      "ta": "Exercise 8.2 · Q8 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Comparing consistency across three subjects"
    },
    "q": {
      "en": "8. The mean and standard deviation of marks obtained by 40 students of a class in three subjects Mathematics, Science and Social Science are given below. Which of the three subjects shows more consistent and which shows less consistent in marks?"
    },
    "steps": [
      {
        "en": "The table gives each mean x̄ and standard deviation σ. The 40 students are already reflected in these values, so do not divide again by 40.",
        "eq": "C.V. = σ/x̄ × 100%",
        "math": {
          "latex": "\\text{C.V.}=\\dfrac{\\sigma}{\\bar{x}}\\times100\\%",
          "display": true,
          "fallback": "C.V. = σ/x̄ × 100%"
        }
      },
      {
        "en": "Compute the coefficient of variation for Mathematics.",
        "eq": "12/56 × 100% ≈ 21.43%",
        "math": {
          "latex": "\\text{C.V.}_{M}=\\dfrac{12}{56}\\times100\\%\\approx21.43\\%",
          "display": true,
          "fallback": "12/56 × 100% ≈ 21.43%"
        }
      },
      {
        "en": "Compute the coefficient of variation for Science.",
        "eq": "14/65 × 100% ≈ 21.54%",
        "math": {
          "latex": "\\text{C.V.}_{S}=\\dfrac{14}{65}\\times100\\%\\approx21.54\\%",
          "display": true,
          "fallback": "14/65 × 100% ≈ 21.54%"
        }
      },
      {
        "en": "Compute the coefficient of variation for Social Science.",
        "eq": "10/60 × 100% ≈ 16.67%",
        "math": {
          "latex": "\\text{C.V.}_{SS}=\\dfrac{10}{60}\\times100\\%\\approx16.67\\%",
          "display": true,
          "fallback": "10/60 × 100% ≈ 16.67%"
        }
      },
      {
        "en": "The smallest C.V. means most consistent, and the largest means least consistent. Both textbook editions ask for the same comparison.",
        "eq": "16.67% < 21.43% < 21.54%; Social Science most, Science least",
        "math": {
          "latex": "16.67\\%<21.43\\%<21.54\\%",
          "display": true,
          "fallback": "16.67% < 21.43% < 21.54%; Social Science most, Science least"
        }
      }
    ],
    "answer": "Social Science is most consistent and Science is least consistent.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Grade 10 Mathematics revised 2025, English printed p.316 / PDF p.322, answer key printed p.342 / PDF p.348, visually inspected; Tamil printed pp.325-326 / PDF pp.331-332 visually inspected for source data and intent. Full Tamil editorial review pending.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-21",
    "answerMath": {
      "latex": "\\boxed{\\text{Most: Social Science; least: Science}}",
      "display": true,
      "fallback": "Social Science is most consistent and Science is least consistent."
    },
    "dataTable": {
      "headers": [
        "Subject",
        "Mean",
        "SD"
      ],
      "rows": [
        [
          "Mathematics",
          56,
          12
        ],
        [
          "Science",
          65,
          14
        ],
        [
          "Social Science",
          60,
          10
        ]
      ],
      "caption": "Exercise 8.2 Q8 data for 40 students",
      "replaceRegex": "(?=Which of the three subjects shows)"
    }
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
for(const item of entries){if(ids.has(item.id))throw Error('Duplicate textbook ID '+item.id);ids.add(item.id);}
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
