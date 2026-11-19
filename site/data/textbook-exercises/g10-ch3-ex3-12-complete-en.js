/* Grade 10 Ch 3 Ex 3.12 (Q1–Q9) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF pp. 122–123 (printed pp. 116–117), Tamil PDF pp. 124–125 (printed pp. 118–119),
   and Answer Appendix PDF p. 344 (printed p. 338); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-12-q1",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q1",
      "ta": "Exercise 3.12 · Q1 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find a number whose difference from its reciprocal is 24/5"
    },
    "q": {
      "en": "1. If the difference between a number and its reciprocal is 24/5, find the number."
    },
    "questionMath": {
      "en": [
        "1. If the difference between a number and its reciprocal is ",
        {
          "latex": "\\dfrac{24}{5}",
          "fallback": "24/5",
          "display": false
        },
        ", find the number."
      ]
    },
    "steps": [
      {
        "en": "Let the required non-zero number be x; its reciprocal is 1/x. The difference between the number and its reciprocal is 24/5, giving x − 1/x = 24/5 (note x ≠ 0).",
        "eq": "x − 1/x = 24/5",
        "math": {
          "latex": "x-\\dfrac{1}{x}=\\dfrac{24}{5}",
          "fallback": "x − 1/x = 24/5",
          "display": true
        }
      },
      {
        "en": "Multiply every term on both sides by 5x to clear both denominators (x and 5), then rearrange all terms onto the left side in standard quadratic form.",
        "eq": "5x² − 5 = 24x ⇒ 5x² − 24x − 5 = 0",
        "math": {
          "latex": "\\begin{aligned}5x\\left(x-\\dfrac{1}{x}\\right)&=5x\\left(\\dfrac{24}{5}\\right)\\\\5x^2-5&=24x\\\\5x^2-24x-5&=0\\end{aligned}",
          "fallback": "5x² − 5 = 24x ⇒ 5x² − 24x − 5 = 0",
          "display": true
        }
      },
      {
        "en": "Factor 5x² − 24x − 5 = 0: here a × c = 5 × (−5) = −25, and −25 + 1 = −24. Split −24x as −25x + x and factor by grouping.",
        "eq": "5x² − 25x + x − 5 = 0 ⇒ 5x(x − 5) + 1(x − 5) = 0 ⇒ (5x + 1)(x − 5) = 0",
        "math": {
          "latex": "\\begin{aligned}5x^2-25x+x-5&=0\\\\5x(x-5)+1(x-5)&=0\\\\(5x+1)(x-5)&=0\\end{aligned}",
          "fallback": "5x² − 25x + x − 5 = 0 ⇒ 5x(x − 5) + 1(x − 5) = 0 ⇒ (5x + 1)(x − 5) = 0",
          "display": true
        }
      },
      {
        "en": "Set each factor to zero and check both values: 5 − 1/5 = 24/5 and (−1/5) − (−5) = 24/5, so both 5 and −1/5 are valid.",
        "eq": "x = 5 or x = −1/5",
        "math": {
          "latex": "x=5\\quad\\text{or}\\quad x=-\\dfrac{1}{5}",
          "fallback": "x = 5 or x = −1/5",
          "display": true
        }
      }
    ],
    "answer": "5, −1/5",
    "answerMath": {
      "latex": "5,\\;-\\dfrac{1}{5}",
      "fallback": "5, −1/5",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q1; printed p. 116, PDF p. 122; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q2",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q2",
      "ta": "Exercise 3.12 · Q2 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the width w of a uniform pathway around a 12 m × 16 m garden"
    },
    "q": {
      "en": "2. A garden measuring 12m by 16m is to have a pedestrian pathway that is ‘w’ meters wide installed all the way around so that it increases the total area to 285 m². What is the width of the pathway?"
    },
    "questionMath": {
      "en": [
        "2. A garden measuring 12m by 16m is to have a pedestrian pathway that is ‘w’ meters wide installed all the way around so that it increases the total area to ",
        {
          "latex": "285\\text{ m}^2",
          "fallback": "285 m²",
          "display": false
        },
        ". What is the width of the pathway?"
      ]
    },
    "figureSrc": "./assets/grade10-ch3/ex3-12-q2-pathway.svg",
    "figureAlt": {
      "en": "Diagram of a 16 m by 12 m rectangular garden surrounded on all four sides by a uniform pathway of width w metres, giving outer dimensions (16 + 2w) m by (12 + 2w) m and total area 285 m²."
    },
    "figureCaption": {
      "en": "Adding a pathway of width w on every side adds 2w to both length and breadth."
    },
    "steps": [
      {
        "en": "Because the pathway goes all the way around (both left and right, and both top and bottom), each outer dimension increases by w + w = 2w. Thus outer width = (12 + 2w) m and outer length = (16 + 2w) m.",
        "eq": "(12 + 2w)(16 + 2w) = 285",
        "math": {
          "latex": "(12+2w)(16+2w)=285",
          "fallback": "(12 + 2w)(16 + 2w) = 285",
          "display": true
        }
      },
      {
        "en": "Expand (12 + 2w)(16 + 2w) carefully and subtract 285 from both sides so the equation is in standard quadratic form 4w² + 56w − 93 = 0.",
        "eq": "192 + 24w + 32w + 4w² = 285 ⇒ 4w² + 56w − 93 = 0",
        "math": {
          "latex": "\\begin{aligned}192+24w+32w+4w^2&=285\\\\4w^2+56w+192-285&=0\\\\4w^2+56w-93&=0\\end{aligned}",
          "fallback": "192 + 24w + 32w + 4w² = 285 ⇒ 4w² + 56w − 93 = 0",
          "display": true
        }
      },
      {
        "en": "Find two numbers with product 4 × (−93) = −372 and sum +56: they are +62 and −6 (62 × (−6) = −372 and 62 − 6 = 56). Split 56w = 62w − 6w and factor by grouping.",
        "eq": "4w² − 6w + 62w − 93 = 0 ⇒ 2w(2w − 3) + 31(2w − 3) = 0 ⇒ (2w − 3)(2w + 31) = 0",
        "math": {
          "latex": "\\begin{aligned}4w^2-6w+62w-93&=0\\\\2w(2w-3)+31(2w-3)&=0\\\\(2w-3)(2w+31)&=0\\end{aligned}",
          "fallback": "4w² − 6w + 62w − 93 = 0 ⇒ 2w(2w − 3) + 31(2w − 3) = 0 ⇒ (2w − 3)(2w + 31) = 0",
          "display": true
        }
      },
      {
        "en": "Width must be positive, so reject w = −31/2 = −15.5 m and keep w = 3/2 = 1.5 m. Check: (12 + 3)(16 + 3) = 15 × 19 = 285 m².",
        "eq": "w = 3/2 = 1.5 m (reject w = −15.5 m)",
        "math": {
          "latex": "w=\\dfrac{3}{2}=1.5\\text{ m}\\quad(\\text{check: }15\\times 19=285\\text{ m}^2)",
          "fallback": "w = 3/2 = 1.5 m (reject w = −15.5 m)",
          "display": true
        }
      }
    ],
    "answer": "1.5 m",
    "answerMath": {
      "latex": "1.5\\text{ m}",
      "fallback": "1.5 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q2; printed p. 116, PDF p. 122; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q3",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q3",
      "ta": "Exercise 3.12 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the original uniform speed of a bus covering 90 km"
    },
    "q": {
      "en": "3. A bus covers a distance of 90 km at a uniform speed. Had the speed been 15 km/hour more it would have taken 30 minutes less for the journey. Find the original speed of the bus."
    },
    "questionMath": {
      "en": [
        "3. A bus covers a distance of 90 km at a uniform speed. Had the speed been 15 km/hour more it would have taken 30 minutes less for the journey. Find the original speed of the bus."
      ]
    },
    "steps": [
      {
        "en": "Let the original speed be x km/hr (x > 0). Using Time = Distance / Speed, the original time is 90/x hours and the faster time is 90/(x + 15) hours. Convert 30 minutes to hours: 30/60 = 1/2 hour.",
        "eq": "90/x − 90/(x + 15) = 1/2",
        "math": {
          "latex": "\\dfrac{90}{x}-\\dfrac{90}{x+15}=\\dfrac{1}{2}",
          "fallback": "90/x − 90/(x + 15) = 1/2",
          "display": true
        }
      },
      {
        "en": "Combine the two fractions on the left over common denominator x(x + 15). Notice 90x and −90x cancel cleanly in the numerator, leaving 90 × 15 = 1350.",
        "eq": "90[(x + 15) − x] / [x(x + 15)] = 1/2 ⇒ 1350 / (x² + 15x) = 1/2",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{90(x+15)-90x}{x(x+15)}&=\\dfrac{1}{2}\\\\\\dfrac{1350}{x^2+15x}&=\\dfrac{1}{2}\\end{aligned}",
          "fallback": "90[(x + 15) − x] / [x(x + 15)] = 1/2 ⇒ 1350 / (x² + 15x) = 1/2",
          "display": true
        }
      },
      {
        "en": "Cross-multiply to clear denominators, subtract 2700 from both sides, and factor using +60 × (−45) = −2700 and 60 − 45 = +15.",
        "eq": "x² + 15x = 2700 ⇒ x² + 15x − 2700 = 0 ⇒ (x + 60)(x − 45) = 0",
        "math": {
          "latex": "\\begin{aligned}x^2+15x&=2700\\\\x^2+15x-2700&=0\\\\(x+60)(x-45)&=0\\end{aligned}",
          "fallback": "x² + 15x = 2700 ⇒ x² + 15x − 2700 = 0 ⇒ (x + 60)(x − 45) = 0",
          "display": true
        }
      },
      {
        "en": "Speed cannot be negative, so reject x = −60. Keep x = 45 km/hr. Check: 90/45 = 2 hr and 90/(45 + 15) = 90/60 = 1.5 hr, which is 0.5 hr (30 minutes) less.",
        "eq": "x = 45 km/hr (reject x = −60; check: 2 − 1.5 = 0.5 hr)",
        "math": {
          "latex": "x=45\\text{ km/hr}\\quad(\\text{reject }x=-60)",
          "fallback": "x = 45 km/hr (reject x = −60; check: 2 − 1.5 = 0.5 hr)",
          "display": true
        }
      }
    ],
    "answer": "45 km/hr",
    "answerMath": {
      "latex": "45\\text{ km/hr}",
      "fallback": "45 km/hr",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q3; printed p. 116, PDF p. 122; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q4",
      "ta": "Exercise 3.12 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the present ages of a girl and her sister"
    },
    "q": {
      "en": "4. A girl is twice as old as her sister. Five years hence, the product of their ages (in years) will be 375. Find their present ages."
    },
    "questionMath": {
      "en": [
        "4. A girl is twice as old as her sister. Five years hence, the product of their ages (in years) will be 375. Find their present ages."
      ]
    },
    "steps": [
      {
        "en": "Let the sister’s present age be x years; then the girl’s present age is 2x years. Five years hence (after 5 years), their ages will be (x + 5) and (2x + 5).",
        "eq": "(x + 5)(2x + 5) = 375",
        "math": {
          "latex": "(x+5)(2x+5)=375",
          "fallback": "(x + 5)(2x + 5) = 375",
          "display": true
        }
      },
      {
        "en": "Expand the left-hand side and subtract 375 to form a quadratic equation in standard form, then divide every term by 2 to simplify the coefficients.",
        "eq": "2x² + 15x + 25 = 375 ⇒ 2x² + 15x − 350 = 0",
        "math": {
          "latex": "\\begin{aligned}2x^2+5x+10x+25&=375\\\\2x^2+15x-350&=0\\end{aligned}",
          "fallback": "2x² + 15x + 25 = 375 ⇒ 2x² + 15x − 350 = 0",
          "display": true
        }
      },
      {
        "en": "Multiply a × c = 2 × (−350) = −700. Look for two numbers whose product is −700 and sum is +15: they are +35 and −20 (35 × (−20) = −700 and 35 − 20 = 15). Factor by grouping.",
        "eq": "2x² − 20x + 35x − 350 = 0 ⇒ 2x(x − 10) + 35(x − 10) = 0 ⇒ (2x + 35)(x − 10) = 0",
        "math": {
          "latex": "\\begin{aligned}2x^2-20x+35x-350&=0\\\\2x(x-10)+35(x-10)&=0\\\\(2x+35)(x-10)&=0\\end{aligned}",
          "fallback": "2x² − 20x + 35x − 350 = 0 ⇒ 2x(x − 10) + 35(x − 10) = 0 ⇒ (2x + 35)(x − 10) = 0",
          "display": true
        }
      },
      {
        "en": "Age cannot be negative, so reject x = −35/2. Thus sister’s present age x = 10 years, and the girl’s present age 2x = 20 years. Check: 5 years hence they are 15 and 25, and 15 × 25 = 375.",
        "eq": "Sister = 10 years, Girl = 20 years (reject x = −35/2)",
        "math": {
          "latex": "\\text{Girl}=2x=20\\text{ years},\\qquad \\text{Sister}=x=10\\text{ years}",
          "fallback": "Sister = 10 years, Girl = 20 years (reject x = −35/2)",
          "display": true
        }
      }
    ],
    "answer": "20 years, 10 years",
    "answerMath": {
      "latex": "20\\text{ years},\\;10\\text{ years}",
      "fallback": "20 years, 10 years",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q4; printed p. 116, PDF p. 122; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q5",
      "ta": "Exercise 3.12 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Determine whether a pole can be erected on a circular boundary of diameter 20 m"
    },
    "q": {
      "en": "5. A pole has to be erected at a point on the boundary of a circular ground of diameter 20 m in such a way that the difference of its distances from two diametrically opposite fixed gates P and Q on the boundary is 4 m. Is it possible to do so? If answer is yes at what distance from the two gates should the pole be erected?"
    },
    "questionMath": {
      "en": [
        "5. A pole has to be erected at a point on the boundary of a circular ground of diameter 20 m in such a way that the difference of its distances from two diametrically opposite fixed gates P and Q on the boundary is 4 m. Is it possible to do so? If answer is yes at what distance from the two gates should the pole be erected?"
      ]
    },
    "figureSrc": "./assets/grade10-ch3/ex3-12-q5-circle-gates.svg",
    "figureAlt": {
      "en": "Circle with diameter PQ = 20 m and boundary point R where angle PRQ = 90 degrees, with chord lengths x + 4 m and x m."
    },
    "figureCaption": {
      "en": "An angle in a semicircle is 90°, making △PRQ a right-angled triangle with hypotenuse PQ = 20 m."
    },
    "steps": [
      {
        "en": "Let the pole be at point R on the circle boundary. Because PQ is a diameter, the angle in a semicircle is a right angle (∠PRQ = 90°). Let the shorter distance QR = x m; then the longer distance PR = (x + 4) m, and hypotenuse PQ = 20 m.",
        "eq": "PR = x + 4, QR = x, PQ = 20, ∠PRQ = 90°",
        "math": {
          "latex": "PR=x+4,\\qquad QR=x,\\qquad PQ=20,\\qquad \\angle PRQ=90^\\circ",
          "fallback": "PR = x + 4, QR = x, PQ = 20, ∠PRQ = 90°",
          "display": true
        }
      },
      {
        "en": "Apply Pythagoras theorem to right-angled △PRQ: QR² + PR² = PQ². Expand (x + 4)² = x² + 8x + 16, collect terms, and divide every term by 2.",
        "eq": "x² + (x + 4)² = 20² ⇒ 2x² + 8x + 16 = 400 ⇒ 2x² + 8x − 384 = 0 ⇒ x² + 4x − 192 = 0",
        "math": {
          "latex": "\\begin{aligned}x^2+(x+4)^2&=20^2\\\\2x^2+8x+16&=400\\\\2x^2+8x-384&=0\\\\x^2+4x-192&=0\\end{aligned}",
          "fallback": "x² + (x + 4)² = 20² ⇒ 2x² + 8x + 16 = 400 ⇒ 2x² + 8x − 384 = 0 ⇒ x² + 4x − 192 = 0",
          "display": true
        }
      },
      {
        "en": "Check the discriminant Δ = b² − 4ac = 4² − 4(1)(−192) = 16 + 768 = 784 > 0 (a perfect square: 28² = 784), confirming a real solution exists (Yes, it is possible). Factor x² + 4x − 192 = 0 using +16 and −12.",
        "eq": "Δ = 784 > 0; (x + 16)(x − 12) = 0 ⇒ x = 12 or x = −16",
        "math": {
          "latex": "\\begin{aligned}\\Delta&=4^2-4(1)(-192)=784>0\\\\(x+16)(x-12)&=0\\implies x=12\\text{ or }x=-16\\end{aligned}",
          "fallback": "Δ = 784 > 0; (x + 16)(x − 12) = 0 ⇒ x = 12 or x = −16",
          "display": true
        }
      },
      {
        "en": "Distance cannot be negative, so reject x = −16. Keep x = 12 m and x + 4 = 16 m. Check: 12² + 16² = 144 + 256 = 400 = 20².",
        "eq": "Yes; distances are 12 m and 16 m (check: 12² + 16² = 400 = 20²)",
        "math": {
          "latex": "\\text{Yes: }12\\text{ m and }16\\text{ m}\\quad(12^2+16^2=20^2)",
          "fallback": "Yes; distances are 12 m and 16 m (check: 12² + 16² = 400 = 20²)",
          "display": true
        }
      }
    ],
    "answer": "Yes, 12 m, 16 m",
    "answerMath": {
      "latex": "\\text{Yes},\\;12\\text{ m},\\;16\\text{ m}",
      "fallback": "Yes, 12 m, 16 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q5; printed p. 116, PDF p. 122; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q6",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q6",
      "ta": "Exercise 3.12 · Q6 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the total number of black bees in the group"
    },
    "q": {
      "en": "6. From a group of 2x² black bees , square root of half of the group went to a tree. Again eight-ninth of the bees went to the same tree. The remaining two got caught up in a fragrant lotus. How many bees were there in total?"
    },
    "questionMath": {
      "en": [
        "6. From a group of ",
        {
          "latex": "2x^2",
          "fallback": "2x²",
          "display": false
        },
        " black bees , square root of half of the group went to a tree. Again eight-ninth of the bees went to the same tree. The remaining two got caught up in a fragrant lotus. How many bees were there in total?"
      ]
    },
    "steps": [
      {
        "en": "Total number of bees = 2x² (with x > 0 as a positive integer). Half of the group is (2x²)/2 = x², so √(half of the group) = √(x²) = x. Eight-ninth of the group is (8/9)(2x²) = (16/9)x². Adding the 2 remaining bees gives the whole group 2x².",
        "eq": "x + (16/9)x² + 2 = 2x²",
        "math": {
          "latex": "\\sqrt{\\dfrac{2x^2}{2}}+\\dfrac{8}{9}(2x^2)+2=2x^2\\implies x+\\dfrac{16}{9}x^2+2=2x^2",
          "fallback": "x + (16/9)x² + 2 = 2x²",
          "display": true
        }
      },
      {
        "en": "Multiply every term by 9 to clear the fraction 16/9, then move all terms onto one side of the equation.",
        "eq": "9x + 16x² + 18 = 18x² ⇒ 2x² − 9x − 18 = 0",
        "math": {
          "latex": "\\begin{aligned}9x+16x^2+18&=18x^2\\\\18x^2-16x^2-9x-18&=0\\\\2x^2-9x-18&=0\\end{aligned}",
          "fallback": "9x + 16x² + 18 = 18x² ⇒ 2x² − 9x − 18 = 0",
          "display": true
        }
      },
      {
        "en": "Factor 2x² − 9x − 18 = 0: product a × c = 2 × (−18) = −36 and sum −12 + 3 = −9. Group and equate each factor to zero.",
        "eq": "2x² − 12x + 3x − 18 = 0 ⇒ 2x(x − 6) + 3(x − 6) = 0 ⇒ (2x + 3)(x − 6) = 0",
        "math": {
          "latex": "\\begin{aligned}2x^2-12x+3x-18&=0\\\\2x(x-6)+3(x-6)&=0\\\\(2x+3)(x-6)&=0\\end{aligned}",
          "fallback": "2x² − 12x + 3x − 18 = 0 ⇒ 2x(x − 6) + 3(x − 6) = 0 ⇒ (2x + 3)(x − 6) = 0",
          "display": true
        }
      },
      {
        "en": "The count x must be positive (and not negative), so reject x = −3/2 and take x = 6. Remember the question asks for the TOTAL number of bees 2x², not x alone: 2(6²) = 2 × 36 = 72. Check: √36 + (8/9)(72) + 2 = 6 + 64 + 2 = 72.",
        "eq": "x = 6 ⇒ Total bees = 2x² = 2(36) = 72",
        "math": {
          "latex": "x=6\\implies \\text{Total bees}=2x^2=2(6^2)=72",
          "fallback": "x = 6 ⇒ Total bees = 2x² = 2(36) = 72",
          "display": true
        }
      }
    ],
    "answer": "72",
    "answerMath": {
      "latex": "72",
      "fallback": "72",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q6; printed p. 117, PDF p. 123; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q7",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q7",
      "ta": "Exercise 3.12 · Q7 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find where a person should stand between two opposite galleries 70 m apart"
    },
    "q": {
      "en": "7. Music is been played in two opposite galleries with certain group of people. In the first gallery a group of 4 singers were singing and in the second gallery 9 singers were singing. The two galleries are separated by the distance of 70 m. Where should a person stand for hearing the same intensity of the singers voice? (Hint: The ratio of the sound intensity is equal to the square of the ratio of their corresponding distances)."
    },
    "questionMath": {
      "en": [
        "7. Music is been played in two opposite galleries with certain group of people. In the first gallery a group of 4 singers were singing and in the second gallery 9 singers were singing. The two galleries are separated by the distance of 70 m. Where should a person stand for hearing the same intensity of the singers voice? (Hint: The ratio of the sound intensity is equal to the square of the ratio of their corresponding distances)."
      ]
    },
    "figureSrc": "./assets/grade10-ch3/ex3-12-q7-galleries.svg",
    "figureAlt": {
      "en": "Two opposite galleries separated by 70 m, with 4 singers in Gallery 1, 9 singers in Gallery 2, and listener P positioned x m from Gallery 1 and (70 − x) m from Gallery 2."
    },
    "figureCaption": {
      "en": "For equal sound intensity, the ratio of singers 4/9 equals the square of the distance ratio x²/(70 − x)²."
    },
    "steps": [
      {
        "en": "Let the person stand at a distance x m from the first gallery (4 singers); since the galleries are 70 m apart, the distance from the second gallery (9 singers) is (70 − x) m, with 0 < x < 70. Using the hint, equate the ratio of intensities (4 : 9) to the square of the ratio of distances:",
        "eq": "4 / 9 = x² / (70 − x)²",
        "math": {
          "latex": "\\dfrac{4}{9}=\\dfrac{x^2}{(70-x)^2}",
          "fallback": "4 / 9 = x² / (70 − x)²",
          "display": true
        }
      },
      {
        "en": "Expand and rearrange into a quadratic equation by cross-multiplying: 4(70 − x)² = 9x², then divide by 5 to simplify coefficients.",
        "eq": "4(4900 − 140x + x²) = 9x² ⇒ 5x² + 560x − 19600 = 0 ⇒ x² + 112x − 3920 = 0",
        "math": {
          "latex": "\\begin{aligned}4(4900-140x+x^2)&=9x^2\\\\19600-560x+4x^2&=9x^2\\\\5x^2+560x-19600&=0\\\\x^2+112x-3920&=0\\end{aligned}",
          "fallback": "4(4900 − 140x + x²) = 9x² ⇒ 5x² + 560x − 19600 = 0 ⇒ x² + 112x − 3920 = 0",
          "display": true
        }
      },
      {
        "en": "Factor x² + 112x − 3920 = 0 using +140 × (−28) = −3920 and 140 − 28 = 112. Since distance must be positive and between the two galleries, reject x = −140 and keep x = 28 m.",
        "eq": "(x + 140)(x − 28) = 0 ⇒ x = 28 m (reject x = −140)",
        "math": {
          "latex": "(x+140)(x-28)=0\\implies x=28\\text{ m}\\quad(\\text{reject }x=-140)",
          "fallback": "(x + 140)(x − 28) = 0 ⇒ x = 28 m (reject x = −140)",
          "display": true
        }
      },
      {
        "en": "Find the distance from the second gallery: 70 − 28 = 42 m. Check: (28/42)² = (2/3)² = 4/9. So the person should stand 28 m from the first gallery and 42 m from the second gallery.",
        "eq": "70 − x = 70 − 28 = 42 m; distances are 28 m, 42 m",
        "math": {
          "latex": "\\text{Distance from 1st gallery}=28\\text{ m},\\qquad \\text{2nd gallery}=70-28=42\\text{ m}",
          "fallback": "70 − x = 70 − 28 = 42 m; distances are 28 m, 42 m",
          "display": true
        }
      }
    ],
    "answer": "28 m, 42 m",
    "answerMath": {
      "latex": "28\\text{ m},\\;42\\text{ m}",
      "fallback": "28 m, 42 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q7; printed p. 117, PDF p. 123; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q8",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q8",
      "ta": "Exercise 3.12 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the width of a gravel path surrounding a central square flower bed"
    },
    "q": {
      "en": "8. There is a square field whose side is 10 m. A square flower bed is prepared in its centre leaving a gravel path all round the flower bed. The total cost of laying the flower bed and gravelling the path at ₹3 and ₹4 per square metre respectively is ₹364. Find the width of the gravel path."
    },
    "questionMath": {
      "en": [
        "8. There is a square field whose side is 10 m. A square flower bed is prepared in its centre leaving a gravel path all round the flower bed. The total cost of laying the flower bed and gravelling the path at ₹3 and ₹4 per square metre respectively is ₹364. Find the width of the gravel path."
      ]
    },
    "figureSrc": "./assets/grade10-ch3/ex3-12-q8-flowerbed.svg",
    "figureAlt": {
      "en": "Square field of side 10 m containing a concentric square flower bed of side (10 − 2w) m surrounded by a gravel path of uniform width w m."
    },
    "figureCaption": {
      "en": "Removing width w on both opposite sides of the 10 m square leaves flower bed side (10 − 2w) m."
    },
    "steps": [
      {
        "en": "Let the width of the gravel path be w m (with 0 < w < 5). Because the path runs along all four sides, the side of the inner flower bed is 10 − 2w m. Outer field area = 10² = 100 m², flower bed area = (10 − 2w)², and gravel path area = 100 − (10 − 2w)².",
        "eq": "Area(bed) = (10 − 2w)²; Area(path) = 100 − (10 − 2w)²",
        "math": {
          "latex": "\\begin{aligned}\\text{Area}_{\\text{bed}}&=(10-2w)^2\\\\\\text{Area}_{\\text{path}}&=100-(10-2w)^2\\end{aligned}",
          "fallback": "Area(bed) = (10 − 2w)²; Area(path) = 100 − (10 − 2w)²",
          "display": true
        }
      },
      {
        "en": "Multiply each area by its rate (₹3/m² for the flower bed, ₹4/m² for the gravel path) and equate the total cost to ₹364. To make algebra easier, write s = 10 − 2w first or substitute and expand:",
        "eq": "3(10 − 2w)² + 4[100 − (10 − 2w)²] = 364 ⇒ 400 − (10 − 2w)² = 364",
        "math": {
          "latex": "\\begin{aligned}3(10-2w)^2+4\\bigl[100-(10-2w)^2\\bigr]&=364\\\\400-(10-2w)^2&=364\\\\(10-2w)^2&=36\\end{aligned}",
          "fallback": "3(10 − 2w)² + 4[100 − (10 − 2w)²] = 364 ⇒ 400 − (10 − 2w)² = 364",
          "display": true
        }
      },
      {
        "en": "Equivalently, expand (10 − 2w)² = 100 − 40w + 4w² to form the quadratic equation and divide every term by 4.",
        "eq": "100 − 40w + 4w² = 36 ⇒ 4w² − 40w + 64 = 0 ⇒ w² − 10w + 16 = 0",
        "math": {
          "latex": "\\begin{aligned}100-40w+4w^2&=36\\\\4w^2-40w+64&=0\\\\w^2-10w+16&=0\\end{aligned}",
          "fallback": "100 − 40w + 4w² = 36 ⇒ 4w² − 40w + 64 = 0 ⇒ w² − 10w + 16 = 0",
          "display": true
        }
      },
      {
        "en": "Factor w² − 10w + 16 = 0 using (−8) × (−2) = +16 and −8 − 2 = −10: (w − 8)(w − 2) = 0, giving w = 8 or w = 2. If w = 8 m, the path would be wider than the 10 m field (10 − 2(8) = −6 < 0), so reject w = 8 m and keep w = 2 m. Check: bed = 6² = 36 m² (₹108), path = 64 m² (₹256), total = ₹364.",
        "eq": "(w − 8)(w − 2) = 0 ⇒ w = 2 m (reject w = 8 m since 2w < 10)",
        "math": {
          "latex": "(w-8)(w-2)=0\\implies w=2\\text{ m}\\quad(\\text{reject }w=8\\text{ since }10-2w>0)",
          "fallback": "(w − 8)(w − 2) = 0 ⇒ w = 2 m (reject w = 8 m since 2w < 10)",
          "display": true
        }
      }
    ],
    "answer": "2 m",
    "answerMath": {
      "latex": "2\\text{ m}",
      "fallback": "2 m",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q8; printed p. 117, PDF p. 123; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-12-q9",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.12",
    "topic": {
      "en": "Algebra — Word Problems Leading to Quadratic Equations"
    },
    "label": {
      "en": "Exercise 3.12 · Q9",
      "ta": "Exercise 3.12 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the smallest side of a right-angled triangle of hypotenuse 25 cm and perimeter 56 cm"
    },
    "q": {
      "en": "9. The hypotenuse of a right angled triangle is 25 cm and its perimeter 56 cm. Find the length of the smallest side."
    },
    "questionMath": {
      "en": [
        "9. The hypotenuse of a right angled triangle is 25 cm and its perimeter 56 cm. Find the length of the smallest side."
      ]
    },
    "figureSrc": "./assets/grade10-ch3/ex3-12-q9-triangle.svg",
    "figureAlt": {
      "en": "Right-angled triangle with hypotenuse 25 cm and perpendicular legs x cm and (31 − x) cm summing to perimeter 56 cm."
    },
    "figureCaption": {
      "en": "Subtracting the 25 cm hypotenuse from the 56 cm perimeter leaves 31 cm shared by the two legs."
    },
    "steps": [
      {
        "en": "Let one leg of the right triangle be x cm and the other leg be y cm. Because the perimeter is 56 cm and the hypotenuse is 25 cm, the sum of the two legs is x + y = 56 − 25 = 31 cm, so y = (31 − x) cm.",
        "eq": "x + y + 25 = 56 ⇒ y = 31 − x",
        "math": {
          "latex": "x+y+25=56\\implies y=31-x",
          "fallback": "x + y + 25 = 56 ⇒ y = 31 − x",
          "display": true
        }
      },
      {
        "en": "Apply Pythagoras theorem: x² + (31 − x)² = 25². Expand (31 − x)² = 961 − 62x + x² and subtract 25² = 625 from both sides.",
        "eq": "x² + 961 − 62x + x² = 625 ⇒ 2x² − 62x + 336 = 0 ⇒ x² − 31x + 168 = 0",
        "math": {
          "latex": "\\begin{aligned}x^2+(31-x)^2&=25^2\\\\2x^2-62x+961&=625\\\\2x^2-62x+336&=0\\\\x^2-31x+168&=0\\end{aligned}",
          "fallback": "x² + 961 − 62x + x² = 625 ⇒ 2x² − 62x + 336 = 0 ⇒ x² − 31x + 168 = 0",
          "display": true
        }
      },
      {
        "en": "Find two numbers whose product is +168 and sum is −31: they are −7 and −24 (since (−7) × (−24) = +168 and −7 − 24 = −31). Factor x² − 31x + 168 = 0.",
        "eq": "(x − 7)(x − 24) = 0 ⇒ x = 7 or x = 24",
        "math": {
          "latex": "(x-7)(x-24)=0\\implies x=7\\text{ or }x=24",
          "fallback": "(x − 7)(x − 24) = 0 ⇒ x = 7 or x = 24",
          "display": true
        }
      },
      {
        "en": "Thus the three sides of the right-angled triangle are 7 cm, 24 cm, and 25 cm (check: 7² + 24² = 49 + 576 = 625 = 25², perimeter = 7 + 24 + 25 = 56 cm). The length of the smallest side is 7 cm.",
        "eq": "Sides: 7 cm, 24 cm, 25 cm ⇒ smallest side = 7 cm",
        "math": {
          "latex": "\\text{Sides}=7\\text{ cm},\\;24\\text{ cm},\\;25\\text{ cm}\\implies \\text{smallest side}=7\\text{ cm}",
          "fallback": "Sides: 7 cm, 24 cm, 25 cm ⇒ smallest side = 7 cm",
          "display": true
        }
      }
    ],
    "answer": "7 cm",
    "answerMath": {
      "latex": "7\\text{ cm}",
      "fallback": "7 cm",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.12 Q9; printed p. 117, PDF p. 123; Answer Appendix printed p. 338, PDF p. 344; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.12 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
