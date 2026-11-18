/* Grade 10 Ch 3 Ex 3.1 (Q2(i)-(iii), Q3, Q4, Q5) source-image-checked English additions (TN SCERT 2025).
   Every record is checked against PDF pp. 98-99 (printed pp. 92-93), Tamil PDF p. 100 (printed p. 94),
   and Answer Appendix PDF p. 343 (printed p. 337); Tamil student lesson editorial review and teacher sign-off remain pending. */
(function(){
'use strict';
const root=typeof window!=='undefined'?window:globalThis;
const grade=root.TRIGGLE_CLASSES&&root.TRIGGLE_CLASSES[10];
const chapter=root.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='3');
if(!grade||!chapter)return;
const entries=[
  {
    "id": "c10-3-ex3-1-q2-i",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q2(i)",
      "ta": "Exercise 3.1 · Q2(i) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Nature of solutions: system reducing to 0 = 0"
    },
    "q": {
      "en": "Discuss the nature of solutions of the following system of equations (i) x + 2y − z = 6 ; −3x − 2y + 5z = −12 ; x − 2z = 3"
    },
    "questionMath": {
      "en": [
        "Discuss the nature of solutions of the following system of equations (i) ",
        {
          "latex": "x+2y-z=6\\,;\\quad -3x-2y+5z=-12\\,;\\quad x-2z=3",
          "fallback": "x + 2y − z = 6 ; −3x − 2y + 5z = −12 ; x − 2z = 3",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Label the three linear equations as (1), (2), and (3).",
        "eq": "(1) x + 2y − z = 6; (2) −3x − 2y + 5z = −12; (3) x − 2z = 3",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &x+2y-z=6\\\\(2)\\quad &-3x-2y+5z=-12\\\\(3)\\quad &x-2z=3\\end{aligned}",
          "fallback": "(1) x + 2y − z = 6; (2) −3x − 2y + 5z = −12; (3) x − 2z = 3",
          "display": true
        }
      },
      {
        "en": "Add equations (1) and (2) to eliminate y, then divide both sides by −2 to get equation (4).",
        "eq": "(1) + (2): −2x + 4z = −6 ⇒ x − 2z = 3 ... (4)",
        "math": {
          "latex": "(1)+(2):\\;-2x+4z=-6\\implies x-2z=3\\quad\\dots(4)",
          "fallback": "(1) + (2): −2x + 4z = −6 ⇒ x − 2z = 3 ... (4)",
          "display": true
        }
      },
      {
        "en": "Subtract equation (3) from equation (4). Because we obtain the true identity 0 = 0, the system has infinitely many solutions.",
        "eq": "(4) − (3): (x − 2z) − (x − 2z) = 3 − 3 ⇒ 0 = 0",
        "math": {
          "latex": "(4)-(3):\\;(x-2z)-(x-2z)=3-3\\implies 0=0",
          "fallback": "(4) − (3): (x − 2z) − (x − 2z) = 3 − 3 ⇒ 0 = 0",
          "display": true
        }
      }
    ],
    "answer": "infinitely many solutions.",
    "answerMath": {
      "latex": "\\text{Infinitely many solutions.}",
      "fallback": "infinitely many solutions.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q2(i); printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-1-q2-ii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q2(ii)",
      "ta": "Exercise 3.1 · Q2(ii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Nature of solutions: inconsistent system"
    },
    "q": {
      "en": "Discuss the nature of solutions of the following system of equations (ii) 2y + z = 3(−x + 1) ; −x + 3y − z = −4 ; 3x + 2y + z = −1/2"
    },
    "questionMath": {
      "en": [
        "Discuss the nature of solutions of the following system of equations (ii) ",
        {
          "latex": "2y+z=3(-x+1)\\,;\\quad -x+3y-z=-4\\,;\\quad 3x+2y+z=-\\dfrac{1}{2}",
          "fallback": "2y + z = 3(−x + 1) ; −x + 3y − z = −4 ; 3x + 2y + z = −1/2",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Expand the first equation 2y + z = −3x + 3 and write all three equations in standard form.",
        "eq": "(1) 3x + 2y + z = 3; (2) −x + 3y − z = −4; (3) 3x + 2y + z = −1/2",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &3x+2y+z=3\\\\(2)\\quad &-x+3y-z=-4\\\\(3)\\quad &3x+2y+z=-\\dfrac{1}{2}\\end{aligned}",
          "fallback": "(1) 3x + 2y + z = 3; (2) −x + 3y − z = −4; (3) 3x + 2y + z = −1/2",
          "display": true
        }
      },
      {
        "en": "Subtract equation (3) from equation (1) (or eliminate z via equation (2) and subtract).",
        "eq": "(1) − (3): (3x + 2y + z) − (3x + 2y + z) = 3 − (−1/2)",
        "math": {
          "latex": "(1)-(3):\\;(3x+2y+z)-(3x+2y+z)=3-\\left(-\\dfrac{1}{2}\\right)",
          "fallback": "(1) − (3): (3x + 2y + z) − (3x + 2y + z) = 3 − (−1/2)",
          "display": true
        }
      },
      {
        "en": "This simplifies to the contradiction 0 = 7/2, so the system is inconsistent and has no solution.",
        "eq": "0 = 7/2 (contradiction) ⇒ no solution",
        "math": {
          "latex": "0=\\dfrac{7}{2}\\quad(\\text{contradiction})\\implies \\text{no solution}",
          "fallback": "0 = 7/2 (contradiction) ⇒ no solution",
          "display": true
        }
      }
    ],
    "answer": "no solution.",
    "answerMath": {
      "latex": "\\text{No solution.}",
      "fallback": "no solution.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q2(ii); printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-1-q2-iii",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q2(iii)",
      "ta": "Exercise 3.1 · Q2(iii) (English source; Tamil review pending)"
    },
    "title": {
      "en": "Nature of solutions: system with a unique solution"
    },
    "q": {
      "en": "Discuss the nature of solutions of the following system of equations (iii) (y + z)/4 = (z + x)/3 = (x + y)/2 ; x + y + z = 27"
    },
    "questionMath": {
      "en": [
        "Discuss the nature of solutions of the following system of equations (iii) ",
        {
          "latex": "\\dfrac{y+z}{4}=\\dfrac{z+x}{3}=\\dfrac{x+y}{2}\\,;\\quad x+y+z=27",
          "fallback": "(y + z)/4 = (z + x)/3 = (x + y)/2 ; x + y + z = 27",
          "display": false
        }
      ]
    },
    "steps": [
      {
        "en": "Cross-multiply the first pair (y + z)/4 = (z + x)/3 and the second pair (z + x)/3 = (x + y)/2 to form standard linear equations.",
        "eq": "(1) 4x − 3y + z = 0; (2) x + 3y − 2z = 0; (3) x + y + z = 27",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &4x-3y+z=0\\\\(2)\\quad &x+3y-2z=0\\\\(3)\\quad &x+y+z=27\\end{aligned}",
          "fallback": "(1) 4x − 3y + z = 0; (2) x + 3y − 2z = 0; (3) x + y + z = 27",
          "display": true
        }
      },
      {
        "en": "Add equations (1) and (2) to eliminate y, then substitute z = 5x back into equation (1) to express y in terms of x.",
        "eq": "5x − z = 0 ⇒ z = 5x; 4x − 3y + 5x = 0 ⇒ y = 3x",
        "math": {
          "latex": "5x-z=0\\implies z=5x,\\quad 4x-3y+5x=0\\implies y=3x",
          "fallback": "5x − z = 0 ⇒ z = 5x; 4x − 3y + 5x = 0 ⇒ y = 3x",
          "display": true
        }
      },
      {
        "en": "Substitute y = 3x and z = 5x into equation (3) x + y + z = 27. Since we obtain a single solution triple (x, y, z) = (3, 9, 15), the system has a unique solution.",
        "eq": "x + 3x + 5x = 27 ⇒ 9x = 27 ⇒ x = 3, y = 9, z = 15",
        "math": {
          "latex": "x+3x+5x=27\\implies 9x=27\\implies x=3,\\;y=9,\\;z=15",
          "fallback": "x + 3x + 5x = 27 ⇒ 9x = 27 ⇒ x = 3, y = 9, z = 15",
          "display": true
        }
      }
    ],
    "answer": "unique solution.",
    "answerMath": {
      "latex": "\\text{Unique solution }(x=3,\\,y=9,\\,z=15).",
      "fallback": "unique solution.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q2(iii); printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-1-q3",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q3",
      "ta": "Exercise 3.1 · Q3 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Present ages of Vani, her father, and her grandfather"
    },
    "q": {
      "en": "Vani, her father and her grand father have an average age of 53. One-half of her grand father’s age plus one-third of her father’s age plus one fourth of Vani’s age is 65. Four years ago if Vani’s grandfather was four times as old as Vani then how old are they all now ?"
    },
    "questionMath": {
      "en": [
        "Vani, her father and her grand father have an average age of 53. One-half of her grand father’s age plus one-third of her father’s age plus one fourth of Vani’s age is 65. Four years ago if Vani’s grandfather was four times as old as Vani then how old are they all now ?"
      ]
    },
    "steps": [
      {
        "en": "Let the present ages of Vani, her father, and her grandfather be x, y, and z years respectively. Write the three given conditions as equations.",
        "eq": "(1) (x + y + z)/3 = 53 ⇒ x + y + z = 159; (2) z/2 + y/3 + x/4 = 65; (3) z − 4 = 4(x − 4)",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &\\dfrac{x+y+z}{3}=53\\implies x+y+z=159\\\\(2)\\quad &\\dfrac{z}{2}+\\dfrac{y}{3}+\\dfrac{x}{4}=65\\\\(3)\\quad &z-4=4(x-4)\\end{aligned}",
          "fallback": "(1) (x + y + z)/3 = 53 ⇒ x + y + z = 159; (2) z/2 + y/3 + x/4 = 65; (3) z − 4 = 4(x − 4)",
          "display": true
        }
      },
      {
        "en": "Clear fractions in (2) by multiplying by 12, and simplify (3).",
        "eq": "(2) 3x + 4y + 6z = 780; (3) 4x − z = 12 ⇒ z = 4x − 12",
        "math": {
          "latex": "3x+4y+6z=780,\\quad 4x-z=12\\implies z=4x-12",
          "fallback": "(2) 3x + 4y + 6z = 780; (3) 4x − z = 12 ⇒ z = 4x − 12",
          "display": true
        }
      },
      {
        "en": "Eliminate y by subtracting equation (2) from 4 times equation (1).",
        "eq": "4(x + y + z) − (3x + 4y + 6z) = 636 − 780 ⇒ x − 2z = −144",
        "math": {
          "latex": "4(x+y+z)-(3x+4y+6z)=636-780\\implies x-2z=-144",
          "fallback": "4(x + y + z) − (3x + 4y + 6z) = 636 − 780 ⇒ x − 2z = −144",
          "display": true
        }
      },
      {
        "en": "Substitute z = 4x − 12 into x − 2z = −144 to solve for x, then find z and y.",
        "eq": "x − 2(4x − 12) = −144 ⇒ −7x = −168 ⇒ x = 24; z = 84; y = 159 − 108 = 51",
        "math": {
          "latex": "x-2(4x-12)=-144\\implies -7x=-168\\implies x=24,\\;z=84,\\;y=51",
          "fallback": "x − 2(4x − 12) = −144 ⇒ −7x = −168 ⇒ x = 24; z = 84; y = 159 − 108 = 51",
          "display": true
        }
      }
    ],
    "answer": "24 years, 51 years, 84 years.",
    "answerMath": {
      "latex": "24\\text{ years},\\;51\\text{ years},\\;84\\text{ years.}",
      "fallback": "24 years, 51 years, 84 years.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q3; printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-1-q4",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q4",
      "ta": "Exercise 3.1 · Q4 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Find the original three-digit number from digit conditions"
    },
    "q": {
      "en": "The sum of the digits of a three-digit number is 11. If the digits are reversed, the new number is 46 more than five times the former number. If the hundreds digit plus twice the tens digit is equal to the units digit, then find the original three digit number ?"
    },
    "questionMath": {
      "en": [
        "The sum of the digits of a three-digit number is 11. If the digits are reversed, the new number is 46 more than five times the former number. If the hundreds digit plus twice the tens digit is equal to the units digit, then find the original three digit number ?"
      ]
    },
    "steps": [
      {
        "en": "Let the hundreds, tens, and units digits be x, y, and z. Then the original number is 100x + 10y + z and the reversed number is 100z + 10y + x. Write the three given equations.",
        "eq": "(1) x + y + z = 11; (2) 100z + 10y + x = 5(100x + 10y + z) + 46; (3) x + 2y = z",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &x+y+z=11\\\\(2)\\quad &100z+10y+x=5(100x+10y+z)+46\\\\(3)\\quad &x+2y=z\\end{aligned}",
          "fallback": "(1) x + y + z = 11; (2) 100z + 10y + x = 5(100x + 10y + z) + 46; (3) x + 2y = z",
          "display": true
        }
      },
      {
        "en": "Simplify equation (2) by collecting like terms.",
        "eq": "499x + 40y − 95z = −46 ... (2')",
        "math": {
          "latex": "499x+40y-95z=-46\\quad\\dots(2')",
          "fallback": "499x + 40y − 95z = −46 ... (2')",
          "display": true
        }
      },
      {
        "en": "Substitute z = x + 2y from (3) into both (1) and (2').",
        "eq": "x + y + (x + 2y) = 11 ⇒ 2x + 3y = 11; 499x + 40y − 95(x + 2y) = −46 ⇒ 404x − 150y = −46",
        "math": {
          "latex": "2x+3y=11,\\quad 404x-150y=-46\\implies 202x-75y=-23",
          "fallback": "x + y + (x + 2y) = 11 ⇒ 2x + 3y = 11; 499x + 40y − 95(x + 2y) = −46 ⇒ 404x − 150y = −46",
          "display": true
        }
      },
      {
        "en": "Multiply 2x + 3y = 11 by 25 and add to 202x − 75y = −23 to find x, y, and z.",
        "eq": "25(2x + 3y) + (202x − 75y) = 275 − 23 ⇒ 252x = 252 ⇒ x = 1, y = 3, z = 7",
        "math": {
          "latex": "25(2x+3y)+(202x-75y)=275-23\\implies 252x=252\\implies x=1,\\;y=3,\\;z=7",
          "fallback": "25(2x + 3y) + (202x − 75y) = 275 − 23 ⇒ 252x = 252 ⇒ x = 1, y = 3, z = 7",
          "display": true
        }
      }
    ],
    "answer": "137.",
    "answerMath": {
      "latex": "137.",
      "fallback": "137.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q4; printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  },
  {
    "id": "c10-3-ex3-1-q5",
    "classNum": 10,
    "chapter": "3",
    "exercise": "3.1",
    "topic": {
      "en": "Algebra — System of Linear Equations in Three Variables"
    },
    "label": {
      "en": "Exercise 3.1 · Q5",
      "ta": "Exercise 3.1 · Q5 (English source; Tamil review pending)"
    },
    "title": {
      "en": "Count five, ten, and twenty rupee currency notes"
    },
    "q": {
      "en": "There are 12 pieces of five, ten and twenty rupee currencies whose total value is ₹105. When first 2 sorts are interchanged in their numbers its value will be increased by ₹20. Find the number of currencies in each sort."
    },
    "questionMath": {
      "en": [
        "There are 12 pieces of five, ten and twenty rupee currencies whose total value is ",
        {
          "latex": "\\text{Rs. }105.",
          "fallback": "₹105.",
          "display": false
        },
        " When first 2 sorts are interchanged in their numbers its value will be increased by ",
        {
          "latex": "\\text{Rs. }20.",
          "fallback": "₹20.",
          "display": false
        },
        " Find the number of currencies in each sort."
      ]
    },
    "steps": [
      {
        "en": "Let x, y, and z be the numbers of ₹5, ₹10, and ₹20 currency notes respectively. Form the three equations from the problem statement.",
        "eq": "(1) x + y + z = 12; (2) 5x + 10y + 20z = 105; (3) 10x + 5y + 20z = 125",
        "math": {
          "latex": "\\begin{aligned}(1)\\quad &x+y+z=12\\\\(2)\\quad &5x+10y+20z=105\\\\(3)\\quad &10x+5y+20z=125\\end{aligned}",
          "fallback": "(1) x + y + z = 12; (2) 5x + 10y + 20z = 105; (3) 10x + 5y + 20z = 125",
          "display": true
        }
      },
      {
        "en": "Divide equations (2) and (3) by 5 to simplify the coefficients.",
        "eq": "(2') x + 2y + 4z = 21; (3') 2x + y + 4z = 25",
        "math": {
          "latex": "(2')\\;x+2y+4z=21,\\qquad (3')\\;2x+y+4z=25",
          "fallback": "(2') x + 2y + 4z = 21; (3') 2x + y + 4z = 25",
          "display": true
        }
      },
      {
        "en": "Subtract (2') from (3') to get x − y = 4, and subtract (2') from 4 times (1) to get 3x + 2y = 27.",
        "eq": "(3') − (2'): x − y = 4; 4(1) − (2'): 3x + 2y = 27",
        "math": {
          "latex": "x-y=4,\\qquad 3x+2y=27",
          "fallback": "(3') − (2'): x − y = 4; 4(1) − (2'): 3x + 2y = 27",
          "display": true
        }
      },
      {
        "en": "Solve the two-variable system for x and y, then substitute into x + y + z = 12 to find z.",
        "eq": "2(x − y) + (3x + 2y) = 8 + 27 ⇒ 5x = 35 ⇒ x = 7, y = 3, z = 2",
        "math": {
          "latex": "2(x-y)+(3x+2y)=8+27\\implies 5x=35\\implies x=7,\\;y=3,\\;z=2",
          "fallback": "2(x − y) + (3x + 2y) = 8 + 27 ⇒ 5x = 35 ⇒ x = 7, y = 3, z = 2",
          "display": true
        }
      }
    ],
    "answer": "7, 3, 2.",
    "answerMath": {
      "latex": "7,\\,3,\\,2\\quad(\\text{Rs. 5 notes}=7,\\;\\text{Rs. 10 notes}=3,\\;\\text{Rs. 20 notes}=2).",
      "fallback": "7, 3, 2.",
      "display": true
    },
    "kind": "textbook",
    "edition": "2025",
    "source": "https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
    "reference": "TN SCERT Standard Ten Mathematics revised 2025, English, Exercise 3.1 Q5; printed p. 93, PDF p. 99; source image checked.",
    "translationReview": "pending",
    "traceStatus": "source-image-checked; independently solved; Tamil editorial pending"
  }
];
const seen=new Set((grade.items||[]).map(x=>x.id));
for(const row of entries){
  if(seen.has(row.id))throw Error('Duplicate Grade 10 Exercise 3.1 student ID: '+row.id);
  seen.add(row.id);
  grade.items.push(row);
  if(!chapter.textbookQuestionIds.includes(row.id))chapter.textbookQuestionIds.push(row.id);
}
})();
