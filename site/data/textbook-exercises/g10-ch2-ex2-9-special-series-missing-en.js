/* Grade 10 Ch 2 Ex 2.9 source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 87 (printed p. 81) and Answer Appendix PDF p. 343 (printed p. 337);
   Tamil textbook verification and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-2-ex2-9-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(i)",
      "ta": "Exercise 2.9 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of the first 60 natural numbers"
    },
    "q": {
      "en": "Find the sum of the following series: (i) 1 + 2 + 3 + ... + 60"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (i) ",
        {
          "latex": "1+2+3+\\dots+60",
          "fallback": "1 + 2 + 3 + ... + 60",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Use the formula for the sum of the first n natural numbers: 1 + 2 + 3 + ... + n = n(n + 1)/2.",
        "eq": "1 + 2 + 3 + ... + n = n(n + 1)/2",
        "math": {
          "latex": "1+2+3+\\dots+n=\\dfrac{n(n+1)}{2}",
          "fallback": "1 + 2 + 3 + ... + n = n(n + 1)/2",
          "display": true
        }
      },
      {
        "en": "Substitute n = 60 into the formula.",
        "eq": "1 + 2 + 3 + ... + 60 = 60 × (60 + 1) / 2 = (60 × 61) / 2",
        "math": {
          "latex": "1+2+3+\\dots+60=\\dfrac{60(60+1)}{2}=\\dfrac{60\\times 61}{2}",
          "fallback": "1 + 2 + 3 + ... + 60 = 60 × (60 + 1) / 2 = (60 × 61) / 2",
          "display": true
        }
      },
      {
        "en": "Simplify 60 / 2 = 30 and multiply by 61.",
        "eq": "30 × 61 = 1830",
        "math": {
          "latex": "30\\times 61=1830",
          "fallback": "30 × 61 = 1830",
          "display": true
        }
      }
    ],
    "answer": "1830.",
    "answerMath": {
      "latex": "1830.",
      "fallback": "1830.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(i); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(ii)",
      "ta": "Exercise 2.9 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of multiples of 3 from 3 to 96"
    },
    "q": {
      "en": "Find the sum of the following series: (ii) 3 + 6 + 9 + ... + 96"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (ii) ",
        {
          "latex": "3+6+9+\\dots+96",
          "fallback": "3 + 6 + 9 + ... + 96",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out the common factor 3 from every term to obtain 3 times the sum of the first 32 natural numbers.",
        "eq": "3 + 6 + 9 + ... + 96 = 3(1 + 2 + 3 + ... + 32)",
        "math": {
          "latex": "3+6+9+\\dots+96=3(1+2+3+\\dots+32)",
          "fallback": "3 + 6 + 9 + ... + 96 = 3(1 + 2 + 3 + ... + 32)",
          "display": true
        }
      },
      {
        "en": "Apply the natural-number sum formula n(n + 1)/2 with n = 32.",
        "eq": "3 × [32 × (32 + 1) / 2] = 3 × (32 × 33) / 2",
        "math": {
          "latex": "3\\times\\dfrac{32(32+1)}{2}=3\\times\\dfrac{32\\times 33}{2}",
          "fallback": "3 × [32 × (32 + 1) / 2] = 3 × (32 × 33) / 2",
          "display": true
        }
      },
      {
        "en": "Evaluate 3 × 16 × 33 = 3 × 528 = 1584.",
        "eq": "3 × 16 × 33 = 1584",
        "math": {
          "latex": "3\\times 16\\times 33=1584",
          "fallback": "3 × 16 × 33 = 1584",
          "display": true
        }
      }
    ],
    "answer": "1584.",
    "answerMath": {
      "latex": "1584.",
      "fallback": "1584.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(ii); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-iii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(iii)",
      "ta": "Exercise 2.9 · Q1(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of consecutive integers from 51 to 92"
    },
    "q": {
      "en": "Find the sum of the following series: (iii) 51 + 52 + 53 + ... + 92"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (iii) ",
        {
          "latex": "51+52+53+\\dots+92",
          "fallback": "51 + 52 + 53 + ... + 92",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Express the sum from 51 to 92 as the sum of the first 92 natural numbers minus the sum of the first 50 natural numbers.",
        "eq": "51 + 52 + ... + 92 = (1 + 2 + ... + 92) − (1 + 2 + ... + 50)",
        "math": {
          "latex": "51+52+\\dots+92=(1+2+\\dots+92)-(1+2+\\dots+50)",
          "fallback": "51 + 52 + ... + 92 = (1 + 2 + ... + 92) − (1 + 2 + ... + 50)",
          "display": true
        }
      },
      {
        "en": "Apply n(n + 1)/2 to both parts with n = 92 and n = 50.",
        "eq": "(92 × 93)/2 − (50 × 51)/2 = 46 × 93 − 25 × 51",
        "math": {
          "latex": "\\dfrac{92\\times 93}{2}-\\dfrac{50\\times 51}{2}=46\\times 93-25\\times 51",
          "fallback": "(92 × 93)/2 − (50 × 51)/2 = 46 × 93 − 25 × 51",
          "display": true
        }
      },
      {
        "en": "Compute 4278 − 1275 = 3003.",
        "eq": "4278 − 1275 = 3003",
        "math": {
          "latex": "4278-1275=3003",
          "fallback": "4278 − 1275 = 3003",
          "display": true
        }
      }
    ],
    "answer": "3003.",
    "answerMath": {
      "latex": "3003.",
      "fallback": "3003.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(iii); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-iv",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(iv)",
      "ta": "Exercise 2.9 · Q1(iv) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of squares from 1 to 225"
    },
    "q": {
      "en": "Find the sum of the following series: (iv) 1 + 4 + 9 + 16 + ... + 225"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (iv) ",
        {
          "latex": "1+4+9+16+\\dots+225",
          "fallback": "1 + 4 + 9 + 16 + ... + 225",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Recognise each term as a perfect square: 1² + 2² + 3² + 4² + ... + 15², since 15² = 225.",
        "eq": "1 + 4 + 9 + 16 + ... + 225 = 1² + 2² + 3² + ... + 15² (n = 15)",
        "math": {
          "latex": "1+4+9+16+\\dots+225=1^2+2^2+3^2+\\dots+15^2\\quad(n=15)",
          "fallback": "1 + 4 + 9 + 16 + ... + 225 = 1² + 2² + 3² + ... + 15² (n = 15)",
          "display": true
        }
      },
      {
        "en": "Use the sum of squares formula n(n + 1)(2n + 1)/6 with n = 15.",
        "eq": "S₁₅ = 15 × (15 + 1) × (2 × 15 + 1) / 6 = (15 × 16 × 31) / 6",
        "math": {
          "latex": "S_{15}=\\dfrac{15(15+1)(2\\times 15+1)}{6}=\\dfrac{15\\times 16\\times 31}{6}",
          "fallback": "S₁₅ = 15 × (15 + 1) × (2 × 15 + 1) / 6 = (15 × 16 × 31) / 6",
          "display": true
        }
      },
      {
        "en": "Cancel common factors (15/3 = 5 and 16/2 = 8) and multiply 5 × 8 × 31 = 1240.",
        "eq": "5 × 8 × 31 = 1240",
        "math": {
          "latex": "5\\times 8\\times 31=1240",
          "fallback": "5 × 8 × 31 = 1240",
          "display": true
        }
      }
    ],
    "answer": "1240.",
    "answerMath": {
      "latex": "1240.",
      "fallback": "1240.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(iv); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-v",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(v)",
      "ta": "Exercise 2.9 · Q1(v) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of squares from 6² to 21²"
    },
    "q": {
      "en": "Find the sum of the following series: (v) 6² + 7² + 8² + ... + 21²"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (v) ",
        {
          "latex": "6^2+7^2+8^2+\\dots+21^2",
          "fallback": "6² + 7² + 8² + ... + 21²",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the partial sum of squares from 6² to 21² by subtracting 1² + 2² + ... + 5² from 1² + 2² + ... + 21².",
        "eq": "6² + 7² + ... + 21² = (1² + 2² + ... + 21²) − (1² + 2² + ... + 5²)",
        "math": {
          "latex": "6^2+7^2+\\dots+21^2=(1^2+2^2+\\dots+21^2)-(1^2+2^2+\\dots+5^2)",
          "fallback": "6² + 7² + ... + 21² = (1² + 2² + ... + 21²) − (1² + 2² + ... + 5²)",
          "display": true
        }
      },
      {
        "en": "Apply n(n + 1)(2n + 1)/6 with n = 21 and n = 5.",
        "eq": "(21 × 22 × 43)/6 − (5 × 6 × 11)/6 = 3311 − 55",
        "math": {
          "latex": "\\dfrac{21\\times 22\\times 43}{6}-\\dfrac{5\\times 6\\times 11}{6}=3311-55",
          "fallback": "(21 × 22 × 43)/6 − (5 × 6 × 11)/6 = 3311 − 55",
          "display": true
        }
      },
      {
        "en": "Subtract 55 from 3311 to obtain the final sum.",
        "eq": "3311 − 55 = 3256",
        "math": {
          "latex": "3311-55=3256",
          "fallback": "3311 − 55 = 3256",
          "display": true
        }
      }
    ],
    "answer": "3256.",
    "answerMath": {
      "latex": "3256.",
      "fallback": "3256.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(v); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-vi",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(vi)",
      "ta": "Exercise 2.9 · Q1(vi) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of cubes from 10³ to 20³"
    },
    "q": {
      "en": "Find the sum of the following series: (vi) 10³ + 11³ + 12³ + ... + 20³"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (vi) ",
        {
          "latex": "10^3+11^3+12^3+\\dots+20^3",
          "fallback": "10³ + 11³ + 12³ + ... + 20³",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Express the sum from 10³ to 20³ as the sum of the first 20 cubes minus the sum of the first 9 cubes.",
        "eq": "10³ + 11³ + ... + 20³ = (1³ + 2³ + ... + 20³) − (1³ + 2³ + ... + 9³)",
        "math": {
          "latex": "10^3+11^3+\\dots+20^3=(1^3+2^3+\\dots+20^3)-(1^3+2^3+\\dots+9^3)",
          "fallback": "10³ + 11³ + ... + 20³ = (1³ + 2³ + ... + 20³) − (1³ + 2³ + ... + 9³)",
          "display": true
        }
      },
      {
        "en": "Apply the sum of cubes formula [n(n + 1)/2]² for n = 20 and n = 9.",
        "eq": "[(20 × 21)/2]² − [(9 × 10)/2]² = 210² − 45²",
        "math": {
          "latex": "\\left[\\dfrac{20\\times 21}{2}\\right]^2-\\left[\\dfrac{9\\times 10}{2}\\right]^2=210^2-45^2",
          "fallback": "[(20 × 21)/2]² − [(9 × 10)/2]² = 210² − 45²",
          "display": true
        }
      },
      {
        "en": "Evaluate 44100 − 2025 = 42075.",
        "eq": "44100 − 2025 = 42075",
        "math": {
          "latex": "44100-2025=42075",
          "fallback": "44100 − 2025 = 42075",
          "display": true
        }
      }
    ],
    "answer": "42075.",
    "answerMath": {
      "latex": "42075.",
      "fallback": "42075.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(vi); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q1-vii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q1(vii)",
      "ta": "Exercise 2.9 · Q1(vii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of odd natural numbers from 1 to 71"
    },
    "q": {
      "en": "Find the sum of the following series: (vii) 1 + 3 + 5 + ... + 71"
    },
    "questionMath": {
      "en": [
        "Find the sum of the following series: (vii) ",
        {
          "latex": "1+3+5+\\dots+71",
          "fallback": "1 + 3 + 5 + ... + 71",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Find the number of odd terms n from 1 to 71 using 2n − 1 = 71 (or n = (l − a)/d + 1).",
        "eq": "2n − 1 = 71 ⇒ 2n = 72 ⇒ n = 36",
        "math": {
          "latex": "2n-1=71\\implies 2n=72\\implies n=36",
          "fallback": "2n − 1 = 71 ⇒ 2n = 72 ⇒ n = 36",
          "display": true
        }
      },
      {
        "en": "The sum of the first n odd natural numbers is n².",
        "eq": "1 + 3 + 5 + ... + (2n − 1) = n²",
        "math": {
          "latex": "1+3+5+\\dots+(2n-1)=n^2",
          "fallback": "1 + 3 + 5 + ... + (2n − 1) = n²",
          "display": true
        }
      },
      {
        "en": "Substitute n = 36 to get 36² = 1296.",
        "eq": "S₃₆ = 36² = 1296",
        "math": {
          "latex": "S_{36}=36^2=1296",
          "fallback": "S₃₆ = 36² = 1296",
          "display": true
        }
      }
    ],
    "answer": "1296.",
    "answerMath": {
      "latex": "1296.",
      "fallback": "1296.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q1(vii); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q7-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q7(i)",
      "ta": "Exercise 2.9 · Q7(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of (2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ... to n terms"
    },
    "q": {
      "en": "Find the sum of the series (2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ... to (i) n terms"
    },
    "questionMath": {
      "en": [
        "Find the sum of the series ",
        {
          "latex": "(2^3-1^3)+(4^3-3^3)+(6^3-5^3)+\\dots",
          "fallback": "(2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ...",
          "display": false
        },
        " to (i) ",
        {
          "latex": "n\\text{ terms}",
          "fallback": "n terms",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Write the kth term t_k = (2k)³ − (2k − 1)³ and expand (2k − 1)³ = 8k³ − 12k² + 6k − 1.",
        "eq": "t_k = (2k)³ − (2k − 1)³ = 8k³ − (8k³ − 12k² + 6k − 1) = 12k² − 6k + 1",
        "math": {
          "latex": "t_k=(2k)^3-(2k-1)^3=8k^3-(8k^3-12k^2+6k-1)=12k^2-6k+1",
          "fallback": "t_k = (2k)³ − (2k − 1)³ = 8k³ − (8k³ − 12k² + 6k − 1) = 12k² − 6k + 1",
          "display": true
        }
      },
      {
        "en": "Sum t_k from k = 1 to n using the standard formulas for Σk², Σk, and Σ1.",
        "eq": "Sₙ = 12[n(n + 1)(2n + 1)/6] − 6[n(n + 1)/2] + n = 2n(n + 1)(2n + 1) − 3n(n + 1) + n",
        "math": {
          "latex": "\\begin{aligned}S_n&=12\\cdot\\dfrac{n(n+1)(2n+1)}{6}-6\\cdot\\dfrac{n(n+1)}{2}+n\\\\&=2n(n+1)(2n+1)-3n(n+1)+n\\end{aligned}",
          "fallback": "Sₙ = 12[n(n + 1)(2n + 1)/6] − 6[n(n + 1)/2] + n = 2n(n + 1)(2n + 1) − 3n(n + 1) + n",
          "display": true
        }
      },
      {
        "en": "Expand and combine like powers of n: (4n³ + 6n² + 2n) − (3n² + 3n) + n = 4n³ + 3n².",
        "eq": "Sₙ = 4n³ + 6n² + 2n − 3n² − 3n + n = 4n³ + 3n²",
        "math": {
          "latex": "S_n=4n^3+6n^2+2n-3n^2-3n+n=4n^3+3n^2",
          "fallback": "Sₙ = 4n³ + 6n² + 2n − 3n² − 3n + n = 4n³ + 3n²",
          "display": true
        }
      }
    ],
    "answer": "4n³ + 3n².",
    "answerMath": {
      "latex": "4n^3+3n^2.",
      "fallback": "4n³ + 3n².",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q7(i); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-9-q7-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.9",
    "topic": {
      "en": "Numbers and Sequences — Special Series"
    },
    "label": {
      "en": "Exercise 2.9 · Q7(ii)",
      "ta": "Exercise 2.9 · Q7(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of (2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ... to 8 terms"
    },
    "q": {
      "en": "Find the sum of the series (2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ... to (ii) 8 terms"
    },
    "questionMath": {
      "en": [
        "Find the sum of the series ",
        {
          "latex": "(2^3-1^3)+(4^3-3^3)+(6^3-5^3)+\\dots",
          "fallback": "(2³ − 1³) + (4³ − 3³) + (6³ − 5³) + ...",
          "display": false
        },
        " to (ii) ",
        {
          "latex": "8\\text{ terms}",
          "fallback": "8 terms",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "From part (i), the kth term is t_k = (2k)³ − (2k − 1)³ = 12k² − 6k + 1 and the sum of the first n terms is Sₙ = 4n³ + 3n².",
        "eq": "Sₙ = 4n³ + 3n²",
        "math": {
          "latex": "S_n=4n^3+3n^2",
          "fallback": "Sₙ = 4n³ + 3n²",
          "display": true
        }
      },
      {
        "en": "Substitute n = 8 into Sₙ = 4n³ + 3n².",
        "eq": "S₈ = 4(8)³ + 3(8)² = 4 × 512 + 3 × 64",
        "math": {
          "latex": "S_8=4(8)^3+3(8)^2=4\\times 512+3\\times 64",
          "fallback": "S₈ = 4(8)³ + 3(8)² = 4 × 512 + 3 × 64",
          "display": true
        }
      },
      {
        "en": "Add 2048 + 192 = 2240.",
        "eq": "2048 + 192 = 2240",
        "math": {
          "latex": "2048+192=2240",
          "fallback": "2048 + 192 = 2240",
          "display": true
        }
      }
    ],
    "answer": "2240.",
    "answerMath": {
      "latex": "2240.",
      "fallback": "2240.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.9 Q7(ii); printed p. 81, PDF p. 87; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 2.9 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
