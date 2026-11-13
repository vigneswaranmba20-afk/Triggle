/* TN SCERT revised 2025, Grade 10 Statistics Ex8.1 Q11–Q15; textbook pages visually inspected. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='8');
if(!grade||!chapter)throw Error('Grade 10 Statistics Ex8.1 dependencies absent');
const entries=[
  {
    "id": "c10-8-ex8-1-q11",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q11",
      "ta": "Exercise 8.1 · Q11 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Viral-fever age groups: grouped standard deviation"
    },
    "q": {
      "en": "11. In a study about viral fever, the number of people affected in a town were noted as Find its standard deviation. Age in years: 0-10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70. Number of people affected: 3, 5, 16, 18, 12, 7, 4."
    },
    "steps": [
      {
        "en": "Find the class midpoints x. The frequency f tells how many people belong to each age interval.",
        "eq": "x: 5, 15, 25, 35, 45, 55, 65; f: 3, 5, 16, 18, 12, 7, 4",
        "math": {
          "latex": "\\begin{aligned}x&:5,15,25,35,45,55,65\\\\f&:3,5,16,18,12,7,4\\end{aligned}",
          "display": true,
          "fallback": "x: 5, 15, 25, 35, 45, 55, 65; f: 3, 5, 16, 18, 12, 7, 4"
        }
      },
      {
        "en": "Add the frequencies to find the total number of people.",
        "eq": "N = Σf = 3 + 5 + 16 + 18 + 12 + 7 + 4 = 65",
        "math": {
          "latex": "\\begin{aligned}N=\\sum f&=3+5+16+18\\\\&\\quad+12+7+4=65\\end{aligned}",
          "display": true,
          "fallback": "N = Σf = 3 + 5 + 16 + 18 + 12 + 7 + 4 = 65"
        }
      },
      {
        "en": "Multiply each midpoint by its frequency, then add the products.",
        "eq": "Σfx = 5×3 + 15×5 + 25×16 + 35×18 + 45×12 + 55×7 + 65×4 = 2305",
        "math": {
          "latex": "\\begin{aligned}\\sum fx&=5(3)+15(5)+25(16)\\\\&\\quad+35(18)+45(12)\\\\&\\quad+55(7)+65(4)\\\\&=2305\\end{aligned}",
          "display": true,
          "fallback": "Σfx = 5×3 + 15×5 + 25×16 + 35×18 + 45×12 + 55×7 + 65×4 = 2305"
        }
      },
      {
        "en": "Find the frequency-weighted mean.",
        "eq": "x̄ = Σfx/N = 2305/65 = 461/13 ≈ 35.46 years",
        "math": {
          "latex": "\\bar{x}=\\dfrac{\\sum fx}{N}=\\dfrac{2305}{65}=\\dfrac{461}{13}",
          "display": true,
          "fallback": "x̄ = Σfx/N = 2305/65 = 461/13 ≈ 35.46 years"
        }
      },
      {
        "en": "Compute the weighted sum of the squares of the midpoints.",
        "eq": "Σfx² = 5²×3 + 15²×5 + 25²×16 + 35²×18 + 45²×12 + 55²×7 + 65²×4 = 95625",
        "math": {
          "latex": "\\begin{aligned}\\sum fx^2&=5^2(3)+15^2(5)+25^2(16)\\\\&\\quad+35^2(18)+45^2(12)\\\\&\\quad+55^2(7)+65^2(4)\\\\&=95625\\end{aligned}",
          "display": true,
          "fallback": "Σfx² = 5²×3 + 15²×5 + 25²×16 + 35²×18 + 45²×12 + 55²×7 + 65²×4 = 95625"
        }
      },
      {
        "en": "Use the population grouped-data variance formula.",
        "eq": "σ² = (95625/65) − (2305/65)² = 36104/169 ≈ 213.63",
        "math": {
          "latex": "\\begin{aligned}\\sigma^2&=\\dfrac{\\sum fx^2}{N}-\\bar{x}^2\\\\&=\\dfrac{95625}{65}-\\left(\\dfrac{2305}{65}\\right)^2\\\\&=\\dfrac{36104}{169}\\approx213.63\\end{aligned}",
          "display": true,
          "fallback": "σ² = (95625/65) − (2305/65)² = 36104/169 ≈ 213.63"
        }
      },
      {
        "en": "Take the positive square root and round to the textbook precision.",
        "eq": "σ = √(36104/169) ≈ 14.616 ≈ 14.6 years",
        "math": {
          "latex": "\\sigma=\\sqrt{\\dfrac{36104}{169}}\\approx14.616\\approx14.6",
          "display": true,
          "fallback": "σ = √(36104/169) ≈ 14.616 ≈ 14.6 years"
        }
      }
    ],
    "answer": "Standard deviation ≈ 14.6 years.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 314 / PDF p. 320; Tamil printed p. 323 / PDF p. 329. Both source page images inspected. English question source checked; Tamil editorial approval and teacher review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-13",
    "answerMath": {
      "latex": "\\sigma=\\sqrt{\\dfrac{36104}{169}}\\approx14.6\\ \\text{years}",
      "display": true,
      "fallback": "Standard deviation ≈ 14.6 years."
    }
  },
  {
    "id": "c10-8-ex8-1-q12",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q12",
      "ta": "Exercise 8.1 · Q12 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Standard deviation of plate diameters"
    },
    "q": {
      "en": "12. The measurements of the diameters (in cms) of the plates prepared in a factory are given below. Find its standard deviation. Diameter (cm): 21-24, 25-28, 29-32, 33-36, 37-40, 41-44. Number of plates: 15, 18, 20, 16, 8, 7."
    },
    "steps": [
      {
        "en": "Replace each diameter interval by its midpoint x, and copy its frequency f.",
        "eq": "x: 22.5, 26.5, 30.5, 34.5, 38.5, 42.5; f: 15, 18, 20, 16, 8, 7",
        "math": {
          "latex": "\\begin{aligned}x&:22.5,26.5,30.5,\\\\&\\quad34.5,38.5,42.5\\\\f&:15,18,20,16,8,7\\end{aligned}",
          "display": true,
          "fallback": "x: 22.5, 26.5, 30.5, 34.5, 38.5, 42.5; f: 15, 18, 20, 16, 8, 7"
        }
      },
      {
        "en": "Add the number of plates in every interval.",
        "eq": "N = Σf = 15 + 18 + 20 + 16 + 8 + 7 = 84",
        "math": {
          "latex": "N=\\sum f=15+18+20+16+8+7=84",
          "display": true,
          "fallback": "N = Σf = 15 + 18 + 20 + 16 + 8 + 7 = 84"
        }
      },
      {
        "en": "Multiply each midpoint by its frequency and add.",
        "eq": "Σfx = 22.5×15 + 26.5×18 + 30.5×20 + 34.5×16 + 38.5×8 + 42.5×7 = 2582",
        "math": {
          "latex": "\\begin{aligned}\\sum fx&=22.5(15)+26.5(18)\\\\&\\quad+30.5(20)+34.5(16)\\\\&\\quad+38.5(8)+42.5(7)\\\\&=2582\\end{aligned}",
          "display": true,
          "fallback": "Σfx = 22.5×15 + 26.5×18 + 30.5×20 + 34.5×16 + 38.5×8 + 42.5×7 = 2582"
        }
      },
      {
        "en": "Find the grouped mean diameter.",
        "eq": "x̄ = 2582/84 = 1291/42 ≈ 30.74 cm",
        "math": {
          "latex": "\\bar{x}=\\dfrac{2582}{84}=\\dfrac{1291}{42}\\approx30.74\\ \\mathrm{cm}",
          "display": true,
          "fallback": "x̄ = 2582/84 = 1291/42 ≈ 30.74 cm"
        }
      },
      {
        "en": "Square each midpoint, multiply by frequency, and add.",
        "eq": "Σfx² = 22.5²×15 + 26.5²×18 + 30.5²×20 + 34.5²×16 + 38.5²×8 + 42.5²×7 = 82385",
        "math": {
          "latex": "\\begin{aligned}\\sum fx^2&=22.5^2(15)+26.5^2(18)\\\\&\\quad+30.5^2(20)+34.5^2(16)\\\\&\\quad+38.5^2(8)+42.5^2(7)\\\\&=82385\\end{aligned}",
          "display": true,
          "fallback": "Σfx² = 22.5²×15 + 26.5²×18 + 30.5²×20 + 34.5²×16 + 38.5²×8 + 42.5²×7 = 82385"
        }
      },
      {
        "en": "Use the grouped population variance identity.",
        "eq": "σ² = 82385/84 − (2582/84)² = 15851/441 ≈ 35.94 cm²",
        "math": {
          "latex": "\\begin{aligned}\\sigma^2&=\\dfrac{82385}{84}-\\left(\\dfrac{2582}{84}\\right)^2\\\\&=\\dfrac{15851}{441}\\approx35.94\\ \\mathrm{cm}^2\\end{aligned}",
          "display": true,
          "fallback": "σ² = 82385/84 − (2582/84)² = 15851/441 ≈ 35.94 cm²"
        }
      },
      {
        "en": "Square-root the variance and round as in the answer key.",
        "eq": "σ = √(15851/441) ≈ 5.995 ≈ 6 cm",
        "math": {
          "latex": "\\sigma=\\sqrt{\\dfrac{15851}{441}}\\approx5.995\\approx6\\ \\mathrm{cm}",
          "display": true,
          "fallback": "σ = √(15851/441) ≈ 5.995 ≈ 6 cm"
        }
      }
    ],
    "answer": "Standard deviation ≈ 6 cm.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 314 / PDF p. 320; Tamil printed p. 323 / PDF p. 329. Both source page images inspected. English question source checked; Tamil editorial approval and teacher review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-13",
    "answerMath": {
      "latex": "\\sigma=\\sqrt{\\dfrac{15851}{441}}\\approx6\\ \\mathrm{cm}",
      "display": true,
      "fallback": "Standard deviation ≈ 6 cm."
    }
  },
  {
    "id": "c10-8-ex8-1-q13",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q13",
      "ta": "Exercise 8.1 · Q13 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Standard deviation of 100-metre race times"
    },
    "q": {
      "en": "13. The time taken by 50 students to complete a 100 meter race are given below. Find its standard deviation. Time taken (sec): 8.5-9.5, 9.5-10.5, 10.5-11.5, 11.5-12.5, 12.5-13.5. Number of students: 6, 8, 17, 10, 9."
    },
    "steps": [
      {
        "en": "For each time interval use its midpoint in seconds; retain the frequencies.",
        "eq": "x: 9, 10, 11, 12, 13; f: 6, 8, 17, 10, 9",
        "math": {
          "latex": "\\begin{aligned}x&:9,10,11,12,13\\\\f&:6,8,17,10,9\\end{aligned}",
          "display": true,
          "fallback": "x: 9, 10, 11, 12, 13; f: 6, 8, 17, 10, 9"
        }
      },
      {
        "en": "Verify that the frequencies total the stated 50 students.",
        "eq": "N = 6 + 8 + 17 + 10 + 9 = 50",
        "math": {
          "latex": "N=6+8+17+10+9=50",
          "display": true,
          "fallback": "N = 6 + 8 + 17 + 10 + 9 = 50"
        }
      },
      {
        "en": "Compute the weighted sum of times.",
        "eq": "Σfx = 9×6 + 10×8 + 11×17 + 12×10 + 13×9 = 558",
        "math": {
          "latex": "\\begin{aligned}\\sum fx&=9(6)+10(8)+11(17)\\\\&\\quad+12(10)+13(9)=558\\end{aligned}",
          "display": true,
          "fallback": "Σfx = 9×6 + 10×8 + 11×17 + 12×10 + 13×9 = 558"
        }
      },
      {
        "en": "Divide by 50 to find the mean.",
        "eq": "x̄ = 558/50 = 11.16 sec",
        "math": {
          "latex": "\\bar{x}=\\dfrac{558}{50}=11.16\\ \\mathrm{s}",
          "display": true,
          "fallback": "x̄ = 558/50 = 11.16 sec"
        }
      },
      {
        "en": "Find the sum of weighted squares.",
        "eq": "Σfx² = 9²×6 + 10²×8 + 11²×17 + 12²×10 + 13²×9 = 6304",
        "math": {
          "latex": "\\begin{aligned}\\sum fx^2&=9^2(6)+10^2(8)+11^2(17)\\\\&\\quad+12^2(10)+13^2(9)\\\\&=6304\\end{aligned}",
          "display": true,
          "fallback": "Σfx² = 9²×6 + 10²×8 + 11²×17 + 12²×10 + 13²×9 = 6304"
        }
      },
      {
        "en": "Calculate the grouped variance.",
        "eq": "σ² = 6304/50 − (11.16)² = 1.5344 sec²",
        "math": {
          "latex": "\\sigma^2=\\dfrac{6304}{50}-(11.16)^2=1.5344\\ \\mathrm{s}^2",
          "display": true,
          "fallback": "σ² = 6304/50 − (11.16)² = 1.5344 sec²"
        }
      },
      {
        "en": "Take the square root to get the standard deviation.",
        "eq": "σ = √1.5344 ≈ 1.2387 ≈ 1.24 sec",
        "math": {
          "latex": "\\sigma=\\sqrt{1.5344}\\approx1.2387\\approx1.24\\ \\mathrm{s}",
          "display": true,
          "fallback": "σ = √1.5344 ≈ 1.2387 ≈ 1.24 sec"
        }
      }
    ],
    "answer": "Standard deviation ≈ 1.24 seconds.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 314 / PDF p. 320; Tamil printed p. 323 / PDF p. 329. Both source page images inspected. English question source checked; Tamil editorial approval and teacher review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-13",
    "answerMath": {
      "latex": "\\sigma=\\sqrt{1.5344}\\approx1.24\\ \\mathrm{s}",
      "display": true,
      "fallback": "Standard deviation ≈ 1.24 seconds."
    }
  },
  {
    "id": "c10-8-ex8-1-q14",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q14",
      "ta": "Exercise 8.1 · Q14 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Corrected mean and standard deviation after data-entry errors"
    },
    "q": {
      "en": "14. For a group of 100 candidates the mean and standard deviation of their marks were found to be 60 and 15 respectively. Later on it was found that the scores 45 and 72 were wrongly entered as 40 and 27. Find the correct mean and standard deviation."
    },
    "steps": [
      {
        "en": "The erroneous mean gives the total of the 100 entries before correction.",
        "eq": "Old Σx = 100 × 60 = 6000",
        "math": {
          "latex": "\\sum x_{\\text{old}}=100\\times60=6000",
          "display": true,
          "fallback": "Old Σx = 100 × 60 = 6000"
        }
      },
      {
        "en": "Subtract the incorrect scores and add the true scores.",
        "eq": "Corrected Σx = 6000 − 40 − 27 + 45 + 72 = 6050",
        "math": {
          "latex": "\\begin{aligned}\\sum x_{\\text{new}}&=6000-40-27+45+72\\\\&=6050\\end{aligned}",
          "display": true,
          "fallback": "Corrected Σx = 6000 − 40 − 27 + 45 + 72 = 6050"
        }
      },
      {
        "en": "Compute the corrected mean, keeping all 100 candidates.",
        "eq": "Corrected mean = 6050/100 = 60.5 marks",
        "math": {
          "latex": "\\bar{x}_{\\text{new}}=\\dfrac{6050}{100}=60.5",
          "display": true,
          "fallback": "Corrected mean = 6050/100 = 60.5 marks"
        }
      },
      {
        "en": "Use the original variance relation to recover the erroneous sum of squares.",
        "eq": "Old Σx² = 100 × (15² + 60²) = 382500",
        "math": {
          "latex": "\\begin{aligned}\\sum x_{\\text{old}}^2&=100\\bigl(15^2+60^2\\bigr)\\\\&=382500\\end{aligned}",
          "display": true,
          "fallback": "Old Σx² = 100 × (15² + 60²) = 382500"
        }
      },
      {
        "en": "Correct the two squared marks, not just their linear values.",
        "eq": "Corrected Σx² = 382500 − 40² − 27² + 45² + 72² = 387380",
        "math": {
          "latex": "\\begin{aligned}\\sum x_{\\text{new}}^2&=382500-40^2-27^2\\\\&\\quad+45^2+72^2\\\\&=387380\\end{aligned}",
          "display": true,
          "fallback": "Corrected Σx² = 382500 − 40² − 27² + 45² + 72² = 387380"
        }
      },
      {
        "en": "Compute the corrected population variance from the new totals.",
        "eq": "Corrected σ² = 387380/100 − (60.5)² = 213.55",
        "math": {
          "latex": "\\begin{aligned}\\sigma_{\\text{new}}^2&=\\dfrac{387380}{100}-(60.5)^2\\\\&=213.55\\end{aligned}",
          "display": true,
          "fallback": "Corrected σ² = 387380/100 − (60.5)² = 213.55"
        }
      },
      {
        "en": "Take the square root and round at the final stage.",
        "eq": "Corrected σ = √213.55 ≈ 14.613 ≈ 14.61 marks",
        "math": {
          "latex": "\\sigma_{\\text{new}}=\\sqrt{213.55}\\approx14.61",
          "display": true,
          "fallback": "Corrected σ = √213.55 ≈ 14.613 ≈ 14.61 marks"
        }
      }
    ],
    "answer": "Correct mean = 60.5 marks; correct standard deviation ≈ 14.61 marks.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 314 / PDF p. 320; Tamil printed p. 323 / PDF p. 329. Both source page images inspected. English question source checked; Tamil editorial approval and teacher review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-13",
    "answerMath": {
      "latex": "\\begin{aligned}\\bar{x}_{\\text{new}}&=60.5\\\\\\sigma_{\\text{new}}&\\approx14.61\\end{aligned}",
      "display": true,
      "fallback": "Correct mean = 60.5 marks; correct standard deviation ≈ 14.61 marks."
    }
  },
  {
    "id": "c10-8-ex8-1-q15",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.1",
    "topic": {
      "en": "Statistics and Probability"
    },
    "label": {
      "en": "Exercise 8.1 · Q15",
      "ta": "Exercise 8.1 · Q15 (English only; Tamil review pending)"
    },
    "title": {
      "en": "Recover two missing observations from mean and variance"
    },
    "q": {
      "en": "15. The mean and variance of seven observations are 8 and 16 respectively. If five of these are 2, 4, 10, 12 and 14, then find the remaining two observations."
    },
    "steps": [
      {
        "en": "Let the two unknown observations be a and b. Seven observations have mean 8.",
        "eq": "Σx = 7 × 8 = 56",
        "math": {
          "latex": "\\sum x=7\\times8=56",
          "display": true,
          "fallback": "Σx = 7 × 8 = 56"
        }
      },
      {
        "en": "Subtract the five known values to find the sum of the unknowns.",
        "eq": "a + b = 56 − (2 + 4 + 10 + 12 + 14) = 14",
        "math": {
          "latex": "\\begin{aligned}a+b&=56-(2+4+10+12+14)\\\\&=14\\end{aligned}",
          "display": true,
          "fallback": "a + b = 56 − (2 + 4 + 10 + 12 + 14) = 14"
        }
      },
      {
        "en": "The variance formula gives the total sum of squares.",
        "eq": "Σx² = 7 × (variance + mean²) = 7 × (16 + 8²) = 560",
        "math": {
          "latex": "\\begin{aligned}\\sum x^2&=7\\bigl(\\sigma^2+\\bar{x}^2\\bigr)\\\\&=7(16+8^2)=560\\end{aligned}",
          "display": true,
          "fallback": "Σx² = 7 × (variance + mean²) = 7 × (16 + 8²) = 560"
        }
      },
      {
        "en": "Remove the squares of the known five observations.",
        "eq": "a² + b² = 560 − (2² + 4² + 10² + 12² + 14²) = 100",
        "math": {
          "latex": "\\begin{aligned}a^2+b^2&=560-(2^2+4^2+10^2\\\\&\\quad+12^2+14^2)=100\\end{aligned}",
          "display": true,
          "fallback": "a² + b² = 560 − (2² + 4² + 10² + 12² + 14²) = 100"
        }
      },
      {
        "en": "Use (a + b)² = a² + b² + 2ab to find the product.",
        "eq": "ab = (14² − 100)/2 = 48",
        "math": {
          "latex": "\\begin{aligned}2ab&=(a+b)^2-(a^2+b^2)\\\\&=14^2-100=96\\\\ab&=48\\end{aligned}",
          "display": true,
          "fallback": "ab = (14² − 100)/2 = 48"
        }
      },
      {
        "en": "The unknown values are roots of a quadratic with sum 14 and product 48.",
        "eq": "t² − 14t + 48 = (t − 6)(t − 8) = 0",
        "math": {
          "latex": "\\begin{aligned}t^2-14t+48&=0\\\\(t-6)(t-8)&=0\\\\t&=6\\ \\text{or}\\ 8\\end{aligned}",
          "display": true,
          "fallback": "t² − 14t + 48 = (t − 6)(t − 8) = 0"
        }
      },
      {
        "en": "Verify both conditions: the seven values sum to 56 and their squares sum to 560.",
        "eq": "Known five + 6 + 8 = 56; sum of squares = 560; mean = 8, variance = 16",
        "math": {
          "latex": "\\begin{aligned}\\bar{x}&=\\dfrac{56}{7}=8\\\\\\sigma^2&=\\dfrac{560}{7}-8^2=16\\end{aligned}",
          "display": true,
          "fallback": "Known five + 6 + 8 = 56; sum of squares = 560; mean = 8, variance = 16"
        }
      }
    ],
    "answer": "The remaining observations are 6 and 8.",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 314 / PDF p. 320; Tamil printed p. 323 / PDF p. 329. Both source page images inspected. English question source checked; Tamil editorial approval and teacher review not claimed.",
    "edition": "2025",
    "translationReview": "pending",
    "checkpoint": "2026-11-13",
    "answerMath": {
      "latex": "\\boxed{6\\ \\text{and}\\ 8}",
      "display": true,
      "fallback": "The remaining observations are 6 and 8."
    }
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
for(const item of entries){if(ids.has(item.id))throw Error('Duplicate textbook ID '+item.id);ids.add(item.id);}
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
