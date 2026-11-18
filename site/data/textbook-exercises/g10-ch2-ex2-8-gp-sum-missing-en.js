/* Grade 10 Ch 2 Ex 2.8 source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF p. 82 (printed p. 76) and Answer Appendix PDF p. 343 (printed p. 337);
   Tamil textbook verification and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='2');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-2-ex2-8-q1-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q1(i)",
      "ta": "Exercise 2.8 · Q1(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of first n terms of an alternating G.P."
    },
    "q": {
      "en": "Find the sum of first n terms of the G.P. (i) 5, −3, 9/5, −27/25, ..."
    },
    "questionMath": {
      "en": [
        "Find the sum of first ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of the G.P. (i) ",
        {
          "latex": "5,\\ -3,\\ \\dfrac{9}{5},\\ -\\dfrac{27}{25},\\ \\dots",
          "fallback": "5, −3, 9/5, −27/25, ...",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Identify the first term a = 5 and the common ratio r = t₂/t₁ = −3/5. Since r < 1, use the formula Sₙ = a(1 − rⁿ)/(1 − r).",
        "eq": "a = 5, r = −3/5 < 1, Sₙ = a(1 − rⁿ)/(1 − r)",
        "math": {
          "latex": "a=5,\\quad r=-\\dfrac{3}{5}<1,\\quad S_n=\\dfrac{a(1-r^n)}{1-r}",
          "fallback": "a = 5, r = −3/5 < 1, Sₙ = a(1 − rⁿ)/(1 − r)",
          "display": true
        }
      },
      {
        "en": "Substitute a = 5 and r = −3/5 into the sum formula and evaluate the denominator 1 − (−3/5) = 8/5.",
        "eq": "Sₙ = 5[1 − (−3/5)ⁿ] / (1 − (−3/5)) = 5[1 − (−3/5)ⁿ] / (8/5)",
        "math": {
          "latex": "S_n=\\dfrac{5\\left[1-\\left(-\\dfrac{3}{5}\\right)^n\\right]}{1-\\left(-\\dfrac{3}{5}\\right)}=\\dfrac{5\\left[1-\\left(-\\dfrac{3}{5}\\right)^n\\right]}{\\dfrac{8}{5}}",
          "fallback": "Sₙ = 5[1 − (−3/5)ⁿ] / (1 − (−3/5)) = 5[1 − (−3/5)ⁿ] / (8/5)",
          "display": true
        }
      },
      {
        "en": "Multiply by the reciprocal 5/8 of the denominator to obtain the simplified sum of the first n terms.",
        "eq": "Sₙ = (25/8)[1 − (−3/5)ⁿ]",
        "math": {
          "latex": "S_n=\\dfrac{25}{8}\\left[1-\\left(-\\dfrac{3}{5}\\right)^n\\right]",
          "fallback": "Sₙ = (25/8)[1 − (−3/5)ⁿ]",
          "display": true
        }
      }
    ],
    "answer": "(25/8)[1 − (−3/5)ⁿ].",
    "answerMath": {
      "latex": "\\dfrac{25}{8}\\left[1-\\left(-\\dfrac{3}{5}\\right)^n\\right].",
      "fallback": "(25/8)[1 − (−3/5)ⁿ].",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q1(i); printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q1-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q1(ii)",
      "ta": "Exercise 2.8 · Q1(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum of first n terms of a decreasing G.P."
    },
    "q": {
      "en": "Find the sum of first n terms of the G.P. (ii) 256, 64, 16, ..."
    },
    "questionMath": {
      "en": [
        "Find the sum of first ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of the G.P. (ii) ",
        {
          "latex": "256,\\ 64,\\ 16,\\ \\dots",
          "fallback": "256, 64, 16, ...",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Identify the first term a = 256 and the common ratio r = 64/256 = 1/4. Since r < 1, use Sₙ = a(1 − rⁿ)/(1 − r).",
        "eq": "a = 256, r = 64/256 = 1/4 < 1",
        "math": {
          "latex": "a=256,\\quad r=\\dfrac{64}{256}=\\dfrac{1}{4}<1",
          "fallback": "a = 256, r = 64/256 = 1/4 < 1",
          "display": true
        }
      },
      {
        "en": "Substitute a = 256 and r = 1/4 into Sₙ = a(1 − rⁿ)/(1 − r), noting that 1 − 1/4 = 3/4.",
        "eq": "Sₙ = 256[1 − (1/4)ⁿ] / (1 − 1/4) = 256[1 − (1/4)ⁿ] / (3/4)",
        "math": {
          "latex": "S_n=\\dfrac{256\\left[1-\\left(\\dfrac{1}{4}\\right)^n\\right]}{1-\\dfrac{1}{4}}=\\dfrac{256\\left[1-\\left(\\dfrac{1}{4}\\right)^n\\right]}{\\dfrac{3}{4}}",
          "fallback": "Sₙ = 256[1 − (1/4)ⁿ] / (1 − 1/4) = 256[1 − (1/4)ⁿ] / (3/4)",
          "display": true
        }
      },
      {
        "en": "Multiply 256 by 4/3 to get 1024/3 and write the closed-form sum of the first n terms.",
        "eq": "Sₙ = (1024/3)[1 − (1/4)ⁿ]",
        "math": {
          "latex": "S_n=\\dfrac{1024}{3}\\left[1-\\left(\\dfrac{1}{4}\\right)^n\\right]",
          "fallback": "Sₙ = (1024/3)[1 − (1/4)ⁿ]",
          "display": true
        }
      }
    ],
    "answer": "(1024/3)[1 − (1/4)ⁿ].",
    "answerMath": {
      "latex": "\\dfrac{1024}{3}\\left[1-\\left(\\dfrac{1}{4}\\right)^n\\right].",
      "fallback": "(1024/3)[1 − (1/4)ⁿ].",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q1(ii); printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q6-i",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q6(i)",
      "ta": "Exercise 2.8 · Q6(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum to n terms of the repeating decimal series 0.4 + 0.44 + 0.444 + ..."
    },
    "q": {
      "en": "Find the sum to n terms of the series (i) 0.4 + 0.44 + 0.444 + ... to n terms"
    },
    "questionMath": {
      "en": [
        "Find the sum to ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of the series (i) ",
        {
          "latex": "0.4+0.44+0.444+\\dots\\text{ to }n\\text{ terms}",
          "fallback": "0.4 + 0.44 + 0.444 + ... to n terms",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out 4 and multiply and divide by 9 so each term can be written as 1 minus a power of 1/10.",
        "eq": "Sₙ = (4/9)(0.9 + 0.99 + 0.999 + ... to n terms)",
        "math": {
          "latex": "S_n=\\dfrac{4}{9}(0.9+0.99+0.999+\\dots\\text{ to }n\\text{ terms})",
          "fallback": "Sₙ = (4/9)(0.9 + 0.99 + 0.999 + ... to n terms)",
          "display": true
        }
      },
      {
        "en": "Rewrite 0.9 = 1 − 1/10, 0.99 = 1 − 1/10², ..., up to the nth term 1 − 1/10ⁿ, and group the n ones separately from the G.P. in 1/10.",
        "eq": "Sₙ = (4/9)[n − (1/10 + 1/10² + ... + 1/10ⁿ)]",
        "math": {
          "latex": "S_n=\\dfrac{4}{9}\\left[n-\\left(\\dfrac{1}{10}+\\dfrac{1}{10^2}+\\dots+\\dfrac{1}{10^n}\\right)\\right]",
          "fallback": "Sₙ = (4/9)[n − (1/10 + 1/10² + ... + 1/10ⁿ)]",
          "display": true
        }
      },
      {
        "en": "Sum the geometric progression with a = 1/10 and r = 1/10 using a(1 − rⁿ)/(1 − r), then distribute 4/9.",
        "eq": "Sₙ = (4/9)[n − (1/9)(1 − (1/10)ⁿ)] = (4/9)n − (4/81)[1 − (1/10)ⁿ]",
        "math": {
          "latex": "\\begin{aligned}S_n&=\\dfrac{4}{9}\\left[n-\\dfrac{\\dfrac{1}{10}\\left(1-\\left(\\dfrac{1}{10}\\right)^n\\right)}{1-\\dfrac{1}{10}}\\right]\\\\&=\\dfrac{4}{9}n-\\dfrac{4\\left[1-\\left(\\dfrac{1}{10}\\right)^n\\right]}{81}\\end{aligned}",
          "fallback": "Sₙ = (4/9)[n − (1/9)(1 − (1/10)ⁿ)] = (4/9)n − (4/81)[1 − (1/10)ⁿ]",
          "display": true
        }
      }
    ],
    "answer": "(4/9)n − (4/81)[1 − (1/10)ⁿ].",
    "answerMath": {
      "latex": "\\dfrac{4}{9}n-\\dfrac{4\\left[1-\\left(\\dfrac{1}{10}\\right)^n\\right]}{81}.",
      "fallback": "(4/9)n − (4/81)[1 − (1/10)ⁿ].",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q6(i); printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q6-ii",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q6(ii)",
      "ta": "Exercise 2.8 · Q6(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Sum to n terms of the repunit series 3 + 33 + 333 + ..."
    },
    "q": {
      "en": "Find the sum to n terms of the series (ii) 3 + 33 + 333 + ... to n terms"
    },
    "questionMath": {
      "en": [
        "Find the sum to ",
        {
          "latex": "n",
          "fallback": "n",
          "display": false
        },
        " terms of the series (ii) ",
        {
          "latex": "3+33+333+\\dots\\text{ to }n\\text{ terms}",
          "fallback": "3 + 33 + 333 + ... to n terms",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Factor out 3 and multiply and divide by 9 so each term becomes a power of 10 minus 1.",
        "eq": "Sₙ = (3/9)(9 + 99 + 999 + ... to n terms) = (1/3)[(10 − 1) + (10² − 1) + ... + (10ⁿ − 1)]",
        "math": {
          "latex": "\\begin{aligned}S_n&=\\dfrac{3}{9}(9+99+999+\\dots\\text{ to }n\\text{ terms})\\\\&=\\dfrac{1}{3}\\left[(10-1)+(10^2-1)+\\dots+(10^n-1)\\right]\\end{aligned}",
          "fallback": "Sₙ = (3/9)(9 + 99 + 999 + ... to n terms) = (1/3)[(10 − 1) + (10² − 1) + ... + (10ⁿ − 1)]",
          "display": true
        }
      },
      {
        "en": "Separate the geometric progression 10 + 10² + ... + 10ⁿ (with a = 10, r = 10 > 1) from the n subtracted ones.",
        "eq": "Sₙ = (1/3)[(10 + 10² + ... + 10ⁿ) − n] = (1/3)[10(10ⁿ − 1)/(10 − 1) − n]",
        "math": {
          "latex": "S_n=\\dfrac{1}{3}\\left[(10+10^2+\\dots+10^n)-n\\right]=\\dfrac{1}{3}\\left[\\dfrac{10(10^n-1)}{10-1}-n\\right]",
          "fallback": "Sₙ = (1/3)[(10 + 10² + ... + 10ⁿ) − n] = (1/3)[10(10ⁿ − 1)/(10 − 1) − n]",
          "display": true
        }
      },
      {
        "en": "Simplify 10 − 1 = 9 and distribute 1/3 across both terms.",
        "eq": "Sₙ = 10(10ⁿ − 1)/27 − n/3",
        "math": {
          "latex": "S_n=\\dfrac{10(10^n-1)}{27}-\\dfrac{n}{3}",
          "fallback": "Sₙ = 10(10ⁿ − 1)/27 − n/3",
          "display": true
        }
      }
    ],
    "answer": "10(10ⁿ − 1)/27 − n/3.",
    "answerMath": {
      "latex": "\\dfrac{10(10^n-1)}{27}-\\dfrac{n}{3}.",
      "fallback": "10(10ⁿ − 1)/27 − n/3.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q6(ii); printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q8",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q8",
      "ta": "Exercise 2.8 · Q8 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Total postage spent across 8 sets of chain letters"
    },
    "q": {
      "en": "Kumar writes a letter to four of his friends. He asks each one of them to copy the letter and mail to four different persons with the instruction that they continue the process similarly. Assuming that the process is unaltered and it costs ₹2 to mail one letter, find the amount spent on postage when 8th set of letters is mailed."
    },
    "steps": [
      {
        "en": "The number of letters mailed in the 1st, 2nd, 3rd, ..., 8th sets forms a G.P.: 4, 16, 64, ... with first term a = 4, common ratio r = 4, and n = 8 sets.",
        "eq": "a = 4, r = 4, n = 8",
        "math": {
          "latex": "a=4,\\quad r=4,\\quad n=8",
          "fallback": "a = 4, r = 4, n = 8",
          "display": true
        }
      },
      {
        "en": "Find the total number of letters mailed up to the 8th set using Sₙ = a(rⁿ − 1)/(r − 1).",
        "eq": "S₈ = 4(4⁸ − 1)/(4 − 1) = 4(65536 − 1)/3 = 4 × 21845 = 87380 letters",
        "math": {
          "latex": "S_8=\\dfrac{4(4^8-1)}{4-1}=\\dfrac{4(65536-1)}{3}=4\\times 21845=87380\\text{ letters}",
          "fallback": "S₈ = 4(4⁸ − 1)/(4 − 1) = 4(65536 − 1)/3 = 4 × 21845 = 87380 letters",
          "display": true
        }
      },
      {
        "en": "Multiply the total number of letters (87,380) by the postage cost of ₹2 per letter.",
        "eq": "Total postage cost = 87380 × ₹2 = ₹174760",
        "math": {
          "latex": "\\text{Total postage cost}=87380\\times 2=\\text{Rs. }174760",
          "fallback": "Total postage cost = 87380 × ₹2 = ₹174760",
          "display": true
        }
      }
    ],
    "answer": "₹174760.",
    "answerMath": {
      "latex": "\\text{Rs. }174760.",
      "fallback": "₹174760.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q8; printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q9",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q9",
      "ta": "Exercise 2.8 · Q9 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Rational form of repeating decimal 0.123123... via infinite G.P."
    },
    "q": {
      "en": "Find the rational form of the number 0.123̅."
    },
    "questionMath": {
      "en": [
        "Find the rational form of the number ",
        {
          "latex": "0.\\overline{123}.",
          "fallback": "0.123̅.",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Expand the repeating decimal 0.123̅ as an infinite geometric series where each block of three digits shifts three decimal places.",
        "eq": "0.123̅ = 0.123123123... = 0.123 + 0.000123 + 0.000000123 + ...",
        "math": {
          "latex": "0.\\overline{123}=0.123123123\\dots=0.123+0.000123+0.000000123+\\dots",
          "fallback": "0.123̅ = 0.123123123... = 0.123 + 0.000123 + 0.000000123 + ...",
          "display": true
        }
      },
      {
        "en": "Identify the first term a = 0.123 = 123/1000 and the common ratio r = 0.001 = 1/1000 (with |r| < 1).",
        "eq": "a = 123/1000, r = 1/1000",
        "math": {
          "latex": "a=\\dfrac{123}{1000},\\quad r=\\dfrac{1}{1000}",
          "fallback": "a = 123/1000, r = 1/1000",
          "display": true
        }
      },
      {
        "en": "Apply the sum to infinity formula S_∞ = a/(1 − r) and reduce the fraction by dividing numerator and denominator by 3.",
        "eq": "0.123̅ = (123/1000) / (1 − 1/1000) = 123/999 = 41/333",
        "math": {
          "latex": "0.\\overline{123}=\\dfrac{\\dfrac{123}{1000}}{1-\\dfrac{1}{1000}}=\\dfrac{123}{999}=\\dfrac{41}{333}",
          "fallback": "0.123̅ = (123/1000) / (1 − 1/1000) = 123/999 = 41/333",
          "display": true
        }
      }
    ],
    "answer": "41/333.",
    "answerMath": {
      "latex": "\\dfrac{41}{333}.",
      "fallback": "41/333.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q9; printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-2-ex2-8-q10",
    "classNum": 10,
    "chapter": "2",
    "exercise": "2.8",
    "topic": {
      "en": "Numbers and Sequences — Geometric Series"
    },
    "label": {
      "en": "Exercise 2.8 · Q10",
      "ta": "Exercise 2.8 · Q10 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Telescoping each homogeneous polynomial term by (x − y)"
    },
    "q": {
      "en": "If Sₙ = (x + y) + (x² + xy + y²) + (x³ + x²y + xy² + y³) + ... n terms then prove that (x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)]."
    },
    "questionMath": {
      "en": [
        "If ",
        {
          "latex": "S_n=(x+y)+(x^2+xy+y^2)+(x^3+x^2y+xy^2+y^3)+\\dots\\ n\\text{ terms}",
          "fallback": "Sₙ = (x + y) + (x² + xy + y²) + (x³ + x²y + xy² + y³) + ... n terms",
          "display": false
        },
        " then prove that ",
        {
          "latex": "(x-y)S_n=\\left[\\dfrac{x^2(x^n-1)}{x-1}-\\dfrac{y^2(y^n-1)}{y-1}\\right].",
          "fallback": "(x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)].",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Multiply both sides of Sₙ by (x − y) and use the algebraic identity (x − y)(x^(k−1) + x^(k−2)y + ... + y^(k−1)) = x^k − y^k on each bracket.",
        "eq": "(x − y)Sₙ = (x² − y²) + (x³ − y³) + (x⁴ − y⁴) + ... to n terms",
        "math": {
          "latex": "(x-y)S_n=(x^2-y^2)+(x^3-y^3)+(x^4-y^4)+\\dots\\text{ to }n\\text{ terms}",
          "fallback": "(x − y)Sₙ = (x² − y²) + (x³ − y³) + (x⁴ − y⁴) + ... to n terms",
          "display": true
        }
      },
      {
        "en": "Group all powers of x together and all powers of y together into two separate geometric series of n terms each.",
        "eq": "(x − y)Sₙ = (x² + x³ + x⁴ + ... to n terms) − (y² + y³ + y⁴ + ... to n terms)",
        "math": {
          "latex": "(x-y)S_n=(x^2+x^3+x^4+\\dots\\text{ to }n\\text{ terms})-(y^2+y^3+y^4+\\dots\\text{ to }n\\text{ terms})",
          "fallback": "(x − y)Sₙ = (x² + x³ + x⁴ + ... to n terms) − (y² + y³ + y⁴ + ... to n terms)",
          "display": true
        }
      },
      {
        "en": "Apply the finite G.P. sum formula a(rⁿ − 1)/(r − 1) to the first series (a = x², r = x) and the second series (a = y², r = y).",
        "eq": "(x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)]",
        "math": {
          "latex": "(x-y)S_n=\\left[\\dfrac{x^2(x^n-1)}{x-1}-\\dfrac{y^2(y^n-1)}{y-1}\\right]",
          "fallback": "(x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)]",
          "display": true
        }
      }
    ],
    "answer": "(x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)] (proved).",
    "answerMath": {
      "latex": "(x-y)S_n=\\left[\\dfrac{x^2(x^n-1)}{x-1}-\\dfrac{y^2(y^n-1)}{y-1}\\right]\\text{ (proved)}.",
      "fallback": "(x − y)Sₙ = [x²(xⁿ − 1)/(x − 1) − y²(yⁿ − 1)/(y − 1)] (proved).",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 2.8 Q10; printed p. 76, PDF p. 82; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 2.8 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
