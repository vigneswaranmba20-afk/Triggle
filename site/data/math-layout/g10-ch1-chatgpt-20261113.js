/* Source-preserving display annotations for all 74 Grade 10 Relations & Functions question parts. */
/* Compiled and audited against existing step.eq/answer fields; never mutate those source records. */
(()=>{
'use strict';
const LAYOUT={
  "c10-1-ex1-1-q1-i": {
    "steps": [
      [
        "\\begin{aligned}&A \\times  B = \\{(2,1), (2,-4), (-2,1)\\\\&\\quad (-2,-4), (3,1), (3,-4)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&A \\times  A = \\{(2,2), (2,-2), (2,3)\\\\&\\quad (-2,2), (-2,-2), (-2,3)\\\\&\\quad (3,2), (3,-2), (3,3)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&B \\times  A = \\{(1,2), (1,-2), (1,3)\\\\&\\quad (-4,2), (-4,-2), (-4,3)\\}\\end{aligned}"
      ],
      [
        "n(A \\times  B) = 3 \\times  2 = 6",
        "n(A \\times  A) = 3 \\times  3 = 9",
        "n(B \\times  A) = 2 \\times  3 = 6"
      ]
    ],
    "answer": [
      "\\begin{aligned}&A \\times  B = \\{(2,1), (2,-4), (-2,1)\\\\&\\quad (-2,-4), (3,1), (3,-4)\\}\\end{aligned}",
      "\\begin{aligned}&A \\times  A = \\{(2,2), (2,-2), (2,3)\\\\&\\quad (-2,2), (-2,-2), (-2,3)\\\\&\\quad (3,2), (3,-2), (3,3)\\}\\end{aligned}",
      "\\begin{aligned}&B \\times  A = \\{(1,2), (1,-2), (1,3)\\\\&\\quad (-4,2), (-4,-2), (-4,3)\\}\\end{aligned}"
    ]
  },
  "c10-1-ex1-1-q1-ii": {
    "steps": [
      [
        "A = B = \\{p, q\\}"
      ],
      [
        "A \\times  B = \\{(p,p), (p,q), (q,p), (q,q)\\}"
      ],
      [
        "A \\times  B = A \\times  A = B \\times  A = \\{(p,p), (p,q), (q,p), (q,q)\\}"
      ],
      [
        "n(A \\times  B) = 2 \\times  2 = 4"
      ]
    ],
    "answer": [
      "A \\times  B = A \\times  A = B \\times  A = \\{(p,p), (p,q), (q,p), (q,q)\\}"
    ]
  },
  "c10-1-ex1-1-q1-iii": {
    "steps": [
      [
        "B = \\varnothing ",
        "n(B) = 0"
      ],
      [
        "A \\times  B = \\varnothing "
      ],
      [
        "A \\times  A = \\{(m,m), (m,n), (n,m), (n,n)\\}"
      ],
      [
        "B \\times  A = \\varnothing "
      ]
    ],
    "answer": [
      "A \\times  B = \\varnothing ",
      "A \\times  A = \\{(m,m), (m,n), (n,m), (n,n)\\}",
      "B \\times  A = \\varnothing "
    ]
  },
  "c10-1-ex1-1-q2": {
    "steps": [
      [
        "B = \\{2, 3, 5, 7\\}"
      ],
      [
        "\\begin{aligned}&A \\times  B = \\{(1,2), (1,3), (1,5)\\\\&\\quad (1,7), (2,2), (2,3)\\\\&\\quad (2,5), (2,7), (3,2)\\\\&\\quad (3,3), (3,5), (3,7)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&B \\times  A = \\{(2,1), (2,2), (2,3)\\\\&\\quad (3,1), (3,2), (3,3)\\\\&\\quad (5,1), (5,2), (5,3)\\\\&\\quad (7,1), (7,2), (7,3)\\}\\end{aligned}"
      ],
      [
        "n(A \\times  B) = n(B \\times  A) = 12"
      ]
    ],
    "answer": [
      "\\begin{aligned}&A \\times  B = \\{(1,2), (1,3), (1,5)\\\\&\\quad (1,7), (2,2), (2,3)\\\\&\\quad (2,5), (2,7), (3,2)\\\\&\\quad (3,3), (3,5), (3,7)\\}\\end{aligned}",
      "\\begin{aligned}&B \\times  A = \\{(2,1), (2,2), (2,3)\\\\&\\quad (3,1), (3,2), (3,3)\\\\&\\quad (5,1), (5,2), (5,3)\\\\&\\quad (7,1), (7,2), (7,3)\\}\\end{aligned}"
    ]
  },
  "c10-1-ex1-1-q3": {
    "steps": [
      [
        "\\text{First coordinates} = \\{-2, 0, 3\\}"
      ],
      [
        "\\text{Second coordinates} = \\{3, 4\\}"
      ],
      [
        "B = \\{-2, 0, 3\\}",
        "A = \\{3, 4\\}"
      ],
      [
        "\\begin{aligned}&B \\times  A = \\{(-2,3), (-2,4), (0,3)\\\\&\\quad (0,4), (3,3), (3,4)\\}\\end{aligned}"
      ]
    ],
    "answer": [
      "A = \\{3, 4\\}",
      "B = \\{-2, 0, 3\\}"
    ]
  },
  "c10-1-ex1-1-q4": {
    "steps": [
      [
        "A \\times  A = \\{(5,5), (5,6), (6,5), (6,6)\\}"
      ],
      [
        "B \\cap  C = \\{5, 6\\} = A"
      ],
      [
        "(B \\times  B) \\cap  (C \\times  C) = \\{(5,5), (5,6), (6,5), (6,6)\\}"
      ],
      [
        "A \\times  A = (B \\times  B) \\cap  (C \\times  C)"
      ]
    ],
    "answer": [
      "A \\times  A = (B \\times  B) \\cap  (C \\times  C) = \\{(5,5), (5,6), (6,5), (6,6)\\}"
    ]
  },
  "c10-1-ex1-1-q5": {
    "steps": [
      [
        "A \\cap  C = \\{3\\}",
        "B \\cap  D = \\{3, 5\\}"
      ],
      [
        "\\text{LHS} = \\{(3,3), (3,5)\\}"
      ],
      [
        "\\text{RHS} = (A \\times  B) \\cap  (C \\times  D) = \\{(3,3), (3,5)\\}"
      ],
      [
        "\\text{LHS} = \\text{RHS} = \\{(3,3), (3,5)\\}"
      ]
    ],
    "answer": [
      "\\text{True}",
      "\\text{both sides} = \\{(3,3), (3,5)\\}"
    ]
  },
  "c10-1-ex1-1-q6-i": {
    "steps": [
      [
        "A = \\{0, 1\\}",
        "B = \\{2, 3, 4\\}",
        "C = \\{3, 5\\}"
      ],
      [
        "B \\cup  C = \\{2, 3, 4, 5\\}",
        "\\begin{aligned}&\\text{LHS} = \\{(0,2), (0,3), (0,4)\\\\&\\quad (0,5), (1,2), (1,3)\\\\&\\quad (1,4), (1,5)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&A \\times  B = \\{(0,2), (0,3), (0,4)\\\\&\\quad (1,2), (1,3), (1,4)\\}\\end{aligned}",
        "A \\times  C = \\{(0,3), (0,5), (1,3), (1,5)\\}"
      ],
      [
        "\\begin{aligned}&(A \\times  B) \\cup  (A \\times  C) = \\{(0,2), (0,3), (0,4)\\\\&\\quad (0,5), (1,2), (1,3)\\\\&\\quad (1,4), (1,5)\\}\\end{aligned}"
      ]
    ],
    "answer": [
      "\\text{Verified}",
      "\\begin{aligned}&\\text{both sides} = \\{(0,2), (0,3), (0,4)\\\\&\\quad (0,5), (1,2), (1,3)\\\\&\\quad (1,4), (1,5)\\}\\end{aligned}"
    ]
  },
  "c10-1-ex1-1-q6-ii": {
    "steps": [
      [
        "A = \\{0, 1\\}",
        "B = \\{2, 3, 4\\}",
        "C = \\{3, 5\\}"
      ],
      [
        "B \\cap  C = \\{3\\}"
      ],
      [
        "\\text{LHS} = A \\times  \\{3\\} = \\{(0,3), (1,3)\\}"
      ],
      [
        "\\text{RHS} = (A \\times  B) \\cap  (A \\times  C) = \\{(0,3), (1,3)\\}"
      ]
    ],
    "answer": [
      "\\text{Verified}",
      "\\text{both sides} = \\{(0,3), (1,3)\\}"
    ]
  },
  "c10-1-ex1-1-q6-iii": {
    "steps": [
      [
        "A = \\{0, 1\\}",
        "B = \\{2, 3, 4\\}",
        "C = \\{3, 5\\}",
        "A \\cup  B = \\{0, 1, 2, 3, 4\\}"
      ],
      [
        "\\begin{aligned}&\\text{LHS} = \\{(0,3), (0,5), (1,3)\\\\&\\quad (1,5), (2,3), (2,5)\\\\&\\quad (3,3), (3,5), (4,3)\\\\&\\quad (4,5)\\}\\end{aligned}"
      ],
      [
        "A \\times  C = \\{(0,3), (0,5), (1,3), (1,5)\\}",
        "\\begin{aligned}&B \\times  C = \\{(2,3), (2,5), (3,3)\\\\&\\quad (3,5), (4,3), (4,5)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&(A \\times  C) \\cup  (B \\times  C) = \\{(0,3), (0,5), (1,3)\\\\&\\quad (1,5), (2,3), (2,5)\\\\&\\quad (3,3), (3,5), (4,3)\\\\&\\quad (4,5)\\}\\end{aligned}"
      ]
    ],
    "answer": [
      "\\text{Verified}",
      "\\begin{aligned}&\\text{both sides} = \\{(0,3), (0,5), (1,3)\\\\&\\quad (1,5), (2,3), (2,5)\\\\&\\quad (3,3), (3,5), (4,3)\\\\&\\quad (4,5)\\}\\end{aligned}"
    ]
  },
  "c10-1-ex1-1-q7-i": {
    "steps": [
      [
        "A = \\{1, 2, 3, 4, 5, 6, 7\\}",
        "B = \\{2, 3, 5, 7\\}",
        "C = \\{2\\}"
      ],
      [
        "A \\cap  B = \\{2, 3, 5, 7\\}"
      ],
      [
        "\\text{LHS} = \\{(2,2), (3,2), (5,2), (7,2)\\}"
      ],
      [
        "\\text{RHS} = \\{(2,2), (3,2), (5,2), (7,2)\\}"
      ],
      [
        "\\text{LHS} = \\text{RHS}"
      ]
    ],
    "answer": [
      "\\text{Verified}",
      "\\text{both sides} = \\{(2,2), (3,2), (5,2), (7,2)\\}"
    ]
  },
  "c10-1-ex1-1-q7-ii": {
    "steps": [
      [
        "A = \\{1, 2, 3, 4, 5, 6, 7\\}",
        "B = \\{2, 3, 5, 7\\}",
        "C = \\{2\\}",
        "B - C = \\{3, 5, 7\\}"
      ],
      [
        "\\begin{aligned}&\\text{LHS} = \\{(1,3), (1,5), (1,7)\\\\&\\quad (2,3), (2,5), (2,7)\\\\&\\quad (3,3), (3,5), (3,7)\\\\&\\quad (4,3), (4,5), (4,7)\\\\&\\quad (5,3), (5,5), (5,7)\\\\&\\quad (6,3), (6,5), (6,7)\\\\&\\quad (7,3), (7,5), (7,7)\\}\\end{aligned}"
      ],
      [
        "n(A \\times  B) = 7 \\times  4 = 28",
        "\\begin{aligned}&A \\times  C = \\{(1,2), (2,2), (3,2)\\\\&\\quad (4,2), (5,2), (6,2)\\\\&\\quad (7,2)\\}\\end{aligned}"
      ],
      [
        "\\begin{aligned}&\\text{RHS} = (A \\times  B) - (A \\times  C) = \\{(1,3), (1,5), (1,7)\\\\&\\quad (2,3), (2,5), (2,7)\\\\&\\quad (3,3), (3,5), (3,7)\\\\&\\quad (4,3), (4,5), (4,7)\\\\&\\quad (5,3), (5,5), (5,7)\\\\&\\quad (6,3), (6,5), (6,7)\\\\&\\quad (7,3), (7,5), (7,7)\\}\\end{aligned}"
      ]
    ],
    "answer": [
      "\\text{Verified}",
      "\\begin{aligned}&\\text{both sides} = \\{(1,3), (1,5), (1,7)\\\\&\\quad (2,3), (2,5), (2,7)\\\\&\\quad (3,3), (3,5), (3,7)\\\\&\\quad (4,3), (4,5), (4,7)\\\\&\\quad (5,3), (5,5), (5,7)\\\\&\\quad (6,3), (6,5), (6,7)\\\\&\\quad (7,3), (7,5), (7,7)\\}\\end{aligned}"
    ]
  },
  "c10-1-1-2-q1": {
    "steps": [
      [
        "R\\subseteq A\\times B"
      ],
      [
        "R_{1}\\nsubseteq A\\times B"
      ],
      [
        "R_{2}\\nsubseteq A\\times B"
      ],
      [
        "R_{3}\\subseteq A\\times B"
      ],
      [
        "R_{4}\\nsubseteq A\\times B"
      ]
    ],
    "answer": [
      "(i) Not a relation",
      "(ii) not a relation",
      "(iii) relation",
      "(iv) not a relation."
    ]
  },
  "c10-1-1-2-q2": {
    "steps": [
      [
        "y=x^{2}",
        "1\\le x\\le 45",
        "x^{2}\\le 45"
      ],
      [
        "\\begin{aligned}&R=\\{(1,1), (2,4), (3,9)\\\\&\\quad (4,16), (5,25), (6,36)\\}\\end{aligned}"
      ],
      [
        "\\text{Domain}=\\{1,2,3,4,5,6\\}",
        "\\text{Range}=\\{1,4,9,16,25,36\\}"
      ]
    ],
    "answer": [
      "\\begin{aligned}&R=\\{(1,1), (2,4), (3,9)\\\\&\\quad (4,16), (5,25), (6,36)\\}\\end{aligned}",
      "\\text{domain}=\\{1,2,3,4,5,6\\}",
      "\\text{range}=\\{1,4,9,16,25,36\\}."
    ]
  },
  "c10-1-1-2-q3": {
    "steps": [
      [
        "x=0,1,2,3,4,5"
      ],
      [
        "\\begin{aligned}&R=\\{(0,3), (1,4), (2,5)\\\\&\\quad (3,6), (4,7), (5,8)\\}\\end{aligned}"
      ],
      [
        "\\text{Domain}=\\{0,1,2,3,4,5\\}",
        "\\text{Range}=\\{3,4,5,6,7,8\\}"
      ]
    ],
    "answer": [
      "\\text{Domain}=\\{0,1,2,3,4,5\\}",
      "\\text{range}=\\{3,4,5,6,7,8\\}."
    ]
  },
  "c10-1-1-2-q4": {
    "steps": [
      [
        "(2,1),(4,2)"
      ],
      [
        "2\\rightarrow 1",
        "4\\rightarrow 2",
        "\\text{points} (2,1),(4,2)"
      ],
      [
        "x=1,2,3,4,5,6"
      ],
      [
        "(1,4),(2,5),(3,6),(4,7),(5,8),(6,9)"
      ]
    ],
    "answer": [
      "(i) \\{(2,1),(4,2)\\}",
      "arrow connections 2\\rightarrow 1, 4\\rightarrow 2",
      "\\begin{aligned}&\\text{graph points} (2,1),(4,2). (ii) \\{(1,4), (2,5), (3,6)\\\\&\\quad (4,7), (5,8), (6,9)\\}\\end{aligned}",
      "\\text{matching arrows and plotted points.}"
    ]
  },
  "c10-1-1-2-q5": {
    "steps": [
      [
        "(salary, employee)"
      ],
      [
        "10000\\rightarrow A_{1},A_{2},A_{3},A_{4},A_{5}",
        "25000\\rightarrow C_{1},C_{2},C_{3},C_{4}"
      ],
      [
        "50000\\rightarrow M_{1},M_{2},M_{3}",
        "100000\\rightarrow E_{1},E_{2}"
      ],
      [
        "5+4+3+2=14 \\text{ordered pairs}"
      ]
    ],
    "answer": [
      "\\begin{aligned}&R=\\{(10000,A_{1}), (10000,A_{2}), (10000,A_{3})\\\\&\\quad (10000,A_{4}), (10000,A_{5}), (25000,C_{1})\\\\&\\quad (25000,C_{2}), (25000,C_{3}), (25000,C_{4})\\\\&\\quad (50000,M_{1}), (50000,M_{2}), (50000,M_{3})\\\\&\\quad (100000,E_{1}), (100000,E_{2})\\}.\\end{aligned}"
    ]
  },
  "c10-1-1-3-q1": {
    "steps": [
      [
        "\\text{Domain}=\\{1,2,3,4,\\ldots \\}"
      ],
      [
        "\\text{Co-domain}=\\{1,2,3,4,\\ldots \\}"
      ],
      [
        "\\text{Range}=\\{2,4,6,8,\\ldots \\}"
      ],
      [
        "\\text{It is a function.}"
      ]
    ],
    "answer": [
      "\\text{Domain}=\\mathbb{N}",
      "\\text{co-domain}=\\mathbb{N}",
      "\\text{range}=\\{2,4,6,8,\\ldots \\}",
      "\\text{yes, it is a function.}"
    ]
  },
  "c10-1-1-3-q2": {
    "steps": [
      [
        "f(3)=10",
        "f(4)=17",
        "f(6)=37",
        "f(8)=65"
      ],
      [
        "R=\\{(3,10),(4,17),(6,37),(8,65)\\}"
      ],
      [
        "R:X\\rightarrow \\mathbb{N} is a function."
      ]
    ],
    "answer": [
      "\\text{Yes}",
      "R=\\{(3,10),(4,17),(6,37),(8,65)\\}."
    ]
  },
  "c10-1-1-3-q3": {
    "steps": [
      [
        "f(t)=t^{2}-5t+6"
      ],
      [
        "f(-1)=1+5+6=12"
      ],
      [
        "f(2a)=(2a)^{2}-5(2a)+6=4a^{2}-10a+6"
      ],
      [
        "f(2)=4-10+6=0"
      ],
      [
        "f(x-1)=(x-1)^{2}-5(x-1)+6=x^{2}-7x+12"
      ]
    ],
    "answer": [
      "(i) 12",
      "(ii) 4a^{2}-10a+6",
      "(iii) 0",
      "(iv) x^{2}-7x+12."
    ]
  },
  "c10-1-1-3-q4": {
    "steps": [
      [
        "(0,9),(4,3),(7,6),(10,0)"
      ],
      [
        "f(0)=9",
        "f(7)=6",
        "f(2)=6",
        "f(10)=0"
      ],
      [
        "f(9.5)=1"
      ],
      [
        "\\text{Domain}=[0,10]",
        "\\text{Range}=[0,9]"
      ],
      [
        "f(6)=5"
      ]
    ],
    "answer": [
      "(i) (a)9 (b)6 (c)6 (d)0",
      "(ii) x=9.5",
      "(iii) \\text{domain}=[0,10], \\text{range}=[0,9]",
      "(iv) f(6)=5."
    ]
  },
  "c10-1-1-3-q5": {
    "steps": [
      [
        "f(x+2)=2(x+2)+5=2x+9"
      ],
      [
        "f(2)=2\\cdot 2+5=9"
      ],
      [
        "\\dfrac{f(x+2)-f(2)}{x}=\\dfrac{2x+9-9}{x}=2"
      ]
    ],
    "answer": [
      "2"
    ]
  },
  "c10-1-1-3-q6": {
    "steps": [
      [
        "f(0)=-3",
        "f(1)=-1",
        "\\dfrac{-3-1}{2}=-2"
      ],
      [
        "2x-3=0 \\Rightarrow  x=\\dfrac{3}{2}"
      ],
      [
        "2x-3=x \\Rightarrow  x=3"
      ],
      [
        "2x-3=2(1-x)-3 \\Rightarrow  4x=2 \\Rightarrow  x=\\dfrac{1}{2}"
      ]
    ],
    "answer": [
      "(i) -2",
      "(ii) x=\\dfrac{3}{2}",
      "(iii) x=3",
      "(iv) x=\\dfrac{1}{2.}"
    ]
  },
  "c10-1-1-3-q7": {
    "steps": [
      [
        "\\text{Height}=x"
      ],
      [
        "\\text{Base length}=\\text{base width}=24-2x"
      ],
      [
        "V=x(24-2x)(24-2x)=x(24-2x)^{2}"
      ],
      [
        "V(x)=4x^{3}-96x^{2}+576x",
        "0<x<12"
      ]
    ],
    "answer": [
      "V(x)=x(24-2x)^{2}=4x^{3}-96x^{2}+576x cm^{3} (0<x<12)."
    ]
  },
  "c10-1-1-3-q8": {
    "steps": [
      [
        "f(x^{2})=3-2x^{2}"
      ],
      [
        "(f(x))^{2}=(3-2x)^{2}=9-12x+4x^{2}"
      ],
      [
        "3-2x^{2}=9-12x+4x^{2} \\Rightarrow  6(x-1)^{2}=0"
      ],
      [
        "x=1"
      ]
    ],
    "answer": [
      "x=1"
    ]
  },
  "c10-1-1-3-q9": {
    "steps": [
      [
        "d=vt"
      ],
      [
        "d(t)=500t km"
      ],
      [
        "t\\ge 0"
      ]
    ],
    "answer": [
      "d(t)=500t km (t\\ge 0)."
    ]
  },
  "c10-1-1-3-q10": {
    "steps": [
      [
        "\\text{The relation is a function.}"
      ],
      [
        "a=\\dfrac{65-56}{45-35}=\\dfrac{9}{10}=0.9"
      ],
      [
        "56=0.9(35)+b \\Rightarrow  b=24.5"
      ],
      [
        "0.9(50)+24.5=69.5",
        "0.9(55)+24.5=74"
      ]
    ],
    "answer": [
      "(i) Yes. (ii) a=0.9, b=24.5",
      "y=0.9x+24.5."
    ]
  },
  "c10-1-1-4-q1": {
    "steps": [
      [
        "\\text{One x-value must never have two y-values.}"
      ],
      [
        "(i) Not a function."
      ],
      [
        "(ii) Function."
      ],
      [
        "(iii) Not a function."
      ],
      [
        "(iv) Function."
      ]
    ],
    "answer": [
      "(i) Not a \\text{function}",
      "(ii) \\text{function}",
      "(iii) not a \\text{function}",
      "(iv) function."
    ]
  },
  "c10-1-1-4-q2": {
    "steps": [
      [
        "f(2)=0",
        "f(4)=1",
        "f(6)=2",
        "f(10)=4",
        "f(12)=5"
      ],
      [
        "(2,0),(4,1),(6,2),(10,4),(12,5)"
      ],
      [
        "2\\rightarrow 0",
        "4\\rightarrow 1",
        "6\\rightarrow 2",
        "10\\rightarrow 4",
        "12\\rightarrow 5"
      ],
      [
        "(2,0),(4,1),(6,2),(10,4),(12,5)"
      ]
    ],
    "answer": [
      "\\begin{aligned}&\\text{Pairs}=\\{(2,0), (4,1), (6,2)\\\\&\\quad (10,4), (12,5)\\}\\end{aligned}",
      "\\text{table} x:2,4,6,10,12",
      "f(x):0,1,2,4,5",
      "\\text{arrows and graph use the same five pairs.}"
    ]
  },
  "c10-1-1-4-q3": {
    "steps": [
      [
        "1\\rightarrow 2",
        "2\\rightarrow 2",
        "3\\rightarrow 2",
        "4\\rightarrow 3",
        "5\\rightarrow 4"
      ],
      [
        "x:1,2,3,4,5",
        "f(x):2,2,2,3,4"
      ],
      [
        "(1,2),(2,2),(3,2),(4,3),(5,4)"
      ]
    ],
    "answer": [
      "Arrows 1\\rightarrow 2,2\\rightarrow 2,3\\rightarrow 2,4\\rightarrow 3,5\\rightarrow 4",
      "\\text{table} x:1,2,3,4,5",
      "f(x):2,2,2,3,4",
      "\\text{graph points as given.}"
    ]
  },
  "c10-1-1-4-q4": {
    "steps": [
      [
        "2a-1=2b-1 \\Rightarrow  2a=2b \\Rightarrow  a=b"
      ],
      [
        "\\text{f is one-one.}"
      ],
      [
        "\\text{Range}=\\{1,3,5,7,\\ldots \\} \\ne  \\mathbb{N}",
        "\\text{f is not onto.}"
      ]
    ],
    "answer": [
      "\\text{One-one but not onto.}"
    ]
  },
  "c10-1-1-4-q5": {
    "steps": [
      [
        "m^{2}+m+3=n^{2}+n+3"
      ],
      [
        "(m-n)(m+n+1)=0"
      ],
      [
        "m=n \\Rightarrow  f is one-one."
      ]
    ],
    "answer": [
      "\\text{f is one-one.}"
    ]
  },
  "c10-1-1-4-q6": {
    "steps": [
      [
        "1^{3}=1",
        "2^{3}=8",
        "3^{3}=27",
        "4^{3}=64"
      ],
      [
        "\\text{Range}=\\{1,8,27,64\\}"
      ],
      [
        "\\text{One-one into function.}"
      ]
    ],
    "answer": [
      "(i) \\text{Range}=\\{1,8,27,64\\}",
      "(ii) one-one into function."
    ]
  },
  "c10-1-1-4-q7": {
    "steps": [
      [
        "2a+1=2b+1 \\Rightarrow  a=b"
      ],
      [
        "f(\\dfrac{y-1}{2})=y \\Rightarrow  (i) one-one and onto."
      ],
      [
        "f(1)=f(-1)=-1 \\Rightarrow  not one-one"
      ],
      [
        "(ii) Not onto",
        "\\text{not bijective.}"
      ]
    ],
    "answer": [
      "(i) Bijective",
      "(ii) not bijective."
    ]
  },
  "c10-1-1-4-q8": {
    "steps": [
      [
        "\\{-a+b,a+b\\}=\\{0,2\\}"
      ],
      [
        "(-a+b)+(a+b)=0+2 \\Rightarrow  2b=2 \\Rightarrow  b=1"
      ],
      [
        "-a+1=0 and a+1=2 \\Rightarrow  a=1",
        "or -a+1=2 and a+1=0 \\Rightarrow  a=-1"
      ]
    ],
    "answer": [
      "a=1 or -1",
      "b=1."
    ]
  },
  "c10-1-1-4-q9": {
    "steps": [
      [
        "f(3)=3+2=5"
      ],
      [
        "f(0)=2"
      ],
      [
        "f(-1.5)=-1.5-1=-2.5"
      ],
      [
        "f(2)=4",
        "f(-2)=-3",
        "f(2)+f(-2)=1"
      ]
    ],
    "answer": [
      "(i) 5",
      "(ii) 2",
      "(iii) -2.5",
      "(iv) 1."
    ]
  },
  "c10-1-1-4-q10": {
    "steps": [
      [
        "f(-3)=-17",
        "f(1)=7",
        "f(-2)=-11"
      ],
      [
        "f(2)=19",
        "f(4)=79"
      ],
      [
        "f(6)=14",
        "f(7)=17",
        "f(8)=20"
      ],
      [
        "(i) -17+19=2",
        "(ii) 17-7=10",
        "(iii) 2(79)+20=178"
      ],
      [
        "\\dfrac{2(-11)-14}{79-11}=\\dfrac{-36}{68}=\\dfrac{-9}{17}"
      ]
    ],
    "answer": [
      "(i) 2",
      "(ii) 10",
      "(iii) 178",
      "(iv) \\dfrac{-9}{17.}"
    ]
  },
  "c10-1-1-4-q11": {
    "steps": [
      [
        "t\\ge 0",
        "g>0",
        "a>0"
      ],
      [
        "S(t_{2})-S(t_{1})=(t_{2}-t_{1})[½g(t_{2}+t_{1})+a]"
      ],
      [
        "t_{2}>t_{1} \\Rightarrow  S(t_{2})>S(t_{1}) \\Rightarrow  one-one"
      ]
    ],
    "answer": [
      "Yes, for physical time t\\ge 0 and g>0 the \\text{function} is one-one."
    ]
  },
  "c10-1-1-4-q12": {
    "steps": [
      [
        "F=(\\dfrac{9}{5})C+32"
      ],
      [
        "t(0)=32",
        "t(28)=50.4+32=82.4",
        "t(-10)=-18+32=14"
      ],
      [
        "(\\dfrac{9}{5})C=180 \\Rightarrow  C=100"
      ],
      [
        "C=(\\dfrac{9}{5})C+32 \\Rightarrow  -(\\dfrac{4}{5})C=32 \\Rightarrow  C=-40"
      ]
    ],
    "answer": [
      "(i) 32^{\\circ}F",
      "(ii) 82.4^{\\circ}F",
      "(iii) 14^{\\circ}F",
      "(iv) 100^{\\circ}C",
      "(v) -40^{\\circ}."
    ]
  },
  "c10-1-1-5-q1": {
    "steps": [
      [
        "f\\circ g=f(g(x))",
        "g\\circ f=g(f(x))"
      ],
      [
        "f\\circ g=x^{2}-6",
        "g\\circ f=(x-6)^{2}",
        "\\text{unequal}"
      ],
      [
        "f\\circ g=\\dfrac{2}{2x^{2}-1}",
        "g\\circ f=2(\\dfrac{2}{x})^{2}-1=\\dfrac{8}{x^{2}-1}",
        "\\text{unequal}"
      ],
      [
        "f\\circ g=\\dfrac{9-x}{3}",
        "g\\circ f=\\dfrac{3-x}{3}",
        "\\text{unequal}"
      ],
      [
        "f\\circ g=(x-4)+3=x-1",
        "g\\circ f=(3+x)-4=x-1",
        "\\text{equal}"
      ],
      [
        "f\\circ g=4(x+1)^{2}-1=4x^{2}+8x+3",
        "g\\circ f=1+(4x^{2}-1)=4x^{2}",
        "\\text{unequal}"
      ]
    ],
    "answer": [
      "(i) x^{2}-6, (x-6)^{2}",
      "not equal. (ii) \\dfrac{2}{2x^{2}-1}, \\dfrac{8}{x^{2}-1}",
      "not equal. (iii) \\dfrac{9-x}{3}, \\dfrac{3-x}{3}",
      "not equal. (iv) x-1, x-1",
      "equal. (v) 4x^{2}+8x+3, 4x^{2}",
      "\\text{not equal.}"
    ]
  },
  "c10-1-1-5-q2": {
    "steps": [
      [
        "f(g(x))=18x-3k+2",
        "g(f(x))=18x+12-k"
      ],
      [
        "-3k+2=12-k \\Rightarrow  k=-5"
      ],
      [
        "f(g(x))=8x+10-k",
        "g(f(x))=8x-4k+5"
      ],
      [
        "10-k=5-4k \\Rightarrow  3k=-5 \\Rightarrow  k=\\dfrac{-5}{3}"
      ]
    ],
    "answer": [
      "(i) k=-5",
      "(ii) k=\\dfrac{-5}{3.}"
    ]
  },
  "c10-1-1-5-q3": {
    "steps": [
      [
        "f(g(x))=2(\\dfrac{x+1}{2})-1=x+1-1=x"
      ],
      [
        "g(f(x))=\\dfrac{(2x-1)+1}{2}=\\dfrac{2x}{2}=x"
      ],
      [
        "f\\circ g=g\\circ f=x"
      ]
    ],
    "answer": [
      "f\\circ g(x)=g\\circ f(x)=x."
    ]
  },
  "c10-1-1-5-q4": {
    "steps": [
      [
        "g(f(a))=(a^{2}-1)-2=a^{2}-3"
      ],
      [
        "a^{2}-3=1 \\Rightarrow  a^{2}=4"
      ],
      [
        "a=2 or a=-2"
      ]
    ],
    "answer": [
      "a=\\pm 2."
    ]
  },
  "c10-1-1-5-q5": {
    "steps": [
      [
        "f(g(x))=2(x^{2})+1=2x^{2}+1"
      ],
      [
        "Range(f\\circ g)=\\{2x^{2}+1:x\\in \\mathbb{N}\\}"
      ],
      [
        "g(f(x))=(2x+1)^{2}"
      ],
      [
        "Range(g\\circ f)=\\{(2x+1)^{2}:x\\in \\mathbb{N}\\}"
      ],
      [
        "\\text{Use the intended compatible natural-number domains.}"
      ]
    ],
    "answer": [
      "\\text{Range} of f\\circ g=\\{2x^{2}+1 : x\\in \\mathbb{N}\\}",
      "\\text{range} of g\\circ f=\\{(2x+1)^{2} : x\\in \\mathbb{N}\\}, on the intended natural-\\text{number} domains."
    ]
  },
  "c10-1-1-5-q6": {
    "steps": [
      [
        "f(f(x))=(x^{2}-1)^{2}-1"
      ],
      [
        "(x^{4}-2x^{2}+1)-1=x^{4}-2x^{2}"
      ],
      [
        "f(f(f(x)))=(x^{4}-2x^{2})^{2}-1"
      ],
      [
        "x^{8}-4x^{6}+4x^{4}-1"
      ]
    ],
    "answer": [
      "(i) x^{4}-2x^{2}",
      "(ii) (x^{4}-2x^{2})^{2}-1."
    ]
  },
  "c10-1-1-5-q7": {
    "steps": [
      [
        "f(a)=f(b) \\Rightarrow  a^{5}=b^{5} \\Rightarrow  a=b"
      ],
      [
        "g(1)=g(-1)=1 \\Rightarrow  g is not one-one"
      ],
      [
        "f(g(x))=(x^{4})^{5}=x^{20}"
      ],
      [
        "(f\\circ g)(1)=(f\\circ g)(-1)=1 \\Rightarrow  not one-one"
      ]
    ],
    "answer": [
      "\\text{f is one-one}",
      "\\text{g is not one-one}",
      "f\\circ g(x)=x^{20} is not one-one."
    ]
  },
  "c10-1-1-5-q8": {
    "steps": [
      [
        "(f\\circ g)\\circ h=f(g(h(x)))=f\\circ (g\\circ h)"
      ],
      [
        "\\text{Both sides}=3x^{2}"
      ],
      [
        "\\text{Both sides}=(2x+8)^{2}"
      ],
      [
        "\\text{Both sides}=(3x-5)^{2}-4"
      ]
    ],
    "answer": [
      "(i) Both=3x^{2}",
      "(ii) both=(2x+8)^{2}",
      "(iii) both=(3x-5)^{2}-4."
    ]
  },
  "c10-1-1-5-q9": {
    "steps": [
      [
        "f(x)=mx+c"
      ],
      [
        "c=-1"
      ],
      [
        "m=\\dfrac{-1-3}{0-(-1)}=-4"
      ],
      [
        "f(2)=-4(2)-1=-9"
      ]
    ],
    "answer": [
      "f(x)=-4x-1."
    ]
  },
  "c10-1-1-5-q10": {
    "steps": [
      [
        "C(at_{1}+bt_{2})=3(at_{1}+bt_{2})"
      ],
      [
        "3at_{1}+3bt_{2}=a(3t_{1})+b(3t_{2})"
      ],
      [
        "=aC(t_{1})+bC(t_{2})",
        "\\text{superposition holds}"
      ]
    ],
    "answer": [
      "C(t)=3t satisfies superposition",
      "\\text{it is linear.}"
    ]
  },
  "c10-1-1-6-q1": {
    "steps": [
      [
        "n(A\\times B)=n(A)\\cdot n(B)"
      ],
      [
        "n(B)=\\dfrac{6}{2}=3 \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) 3"
    ]
  },
  "c10-1-1-6-q2": {
    "steps": [
      [
        "A\\cup C=\\{a,b,p,q,r,s\\} \\Rightarrow  n=6"
      ],
      [
        "n[(A\\cup C)\\times B]=6\\times 2=12 \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) 12"
    ]
  },
  "c10-1-1-6-q3": {
    "steps": [
      [
        "A\\subset B",
        "C\\subset D"
      ],
      [
        "A\\times C\\subset B\\times D \\Rightarrow  (A)"
      ]
    ],
    "answer": [
      "(A) (A\\times C)\\subset (B\\times D)"
    ]
  },
  "c10-1-1-6-q4": {
    "steps": [
      [
        "2^{5\\cdot n(B)}=1024=2^{10}"
      ],
      [
        "5n(B)=10 \\Rightarrow  n(B)=2 \\Rightarrow  (B)"
      ]
    ],
    "answer": [
      "(B) 2"
    ]
  },
  "c10-1-1-6-q5": {
    "steps": [
      [
        "x\\in \\{2,3,5,7,11\\}"
      ],
      [
        "\\text{Range}=\\{4,9,25,49,121\\} \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) \\{4,9,25,49,121\\}"
    ]
  },
  "c10-1-1-6-q6": {
    "steps": [
      [
        "a+2=5 \\Rightarrow  a=3"
      ],
      [
        "4=2(3)+b \\Rightarrow  b=-2 \\Rightarrow  (D)"
      ]
    ],
    "answer": [
      "(D) (3,-2)"
    ]
  },
  "c10-1-1-6-q7": {
    "steps": [
      [
        "n(A\\times B)=mn"
      ],
      [
        "2^{mn}-1 \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) 2^{mn}-1"
    ]
  },
  "c10-1-1-6-q8": {
    "steps": [
      [
        "(x,x)"
      ],
      [
        "a=8",
        "b=6 \\Rightarrow  (A)"
      ]
    ],
    "answer": [
      "(A) (8,6)"
    ]
  },
  "c10-1-1-6-q9": {
    "steps": [
      [
        "1\\rightarrow 4",
        "2\\rightarrow 8",
        "3\\rightarrow 9",
        "4\\rightarrow 10"
      ],
      [
        "\\text{One-to-one} \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) \\text{One-to-one} \\text{function}"
    ]
  },
  "c10-1-1-6-q10": {
    "steps": [
      [
        "f(g(x))=2(\\dfrac{1}{3x})^{2}"
      ],
      [
        "\\dfrac{2}{9x^{2}} \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) \\dfrac{2}{9x^{2}}"
    ]
  },
  "c10-1-1-6-q11": {
    "steps": [
      [
        "n(A)=n(B)"
      ],
      [
        "n(A)=7 \\Rightarrow  (A)"
      ]
    ],
    "answer": [
      "(A) 7"
    ]
  },
  "c10-1-1-6-q12": {
    "steps": [
      [
        "Range(g)=\\{2,0,4\\}"
      ],
      [
        "f(2)=0",
        "f(0)=1",
        "f(4)=2"
      ],
      [
        "Range(f\\circ g)=\\{0,1,2\\} \\Rightarrow  (D)"
      ]
    ],
    "answer": [
      "(D) \\{0,1,2\\}"
    ]
  },
  "c10-1-1-6-q13": {
    "steps": [
      [
        "[f(x)f(y)]^{2}=(1+x^{2})(1+y^{2})=1+x^{2}+y^{2}+x^{2}y^{2}"
      ],
      [
        "[f(x)f(y)]^{2}-[f(xy)]^{2}=x^{2}+y^{2}\\ge 0",
        "\\text{both sides} nonnegative \\Rightarrow  (C)"
      ]
    ],
    "answer": [
      "(C) f(xy)\\le f(x)f(y)"
    ]
  },
  "c10-1-1-6-q14": {
    "steps": [
      [
        "\\alpha =\\dfrac{3-1}{2-1}=2"
      ],
      [
        "1=2(1)+\\beta  \\Rightarrow  \\beta =-1 \\Rightarrow  (B)"
      ]
    ],
    "answer": [
      "(B) (2,-1)"
    ]
  },
  "c10-1-1-6-q15": {
    "steps": [
      [
        "(x+1)^{3}=x^{3}+3x^{2}+3x+1",
        "(x-1)^{3}=x^{3}-3x^{2}+3x-1"
      ],
      [
        "f(x)=6x^{2}+2 \\Rightarrow  quadratic \\Rightarrow  (D)"
      ]
    ],
    "answer": [
      "(D) quadratic"
    ]
  },
  "c10-1-1-unit-q1": {
    "steps": [
      [
        "x^{2}-3x=-2 \\Rightarrow  x^{2}-3x+2=0"
      ],
      [
        "(x-1)(x-2)=0 \\Rightarrow  x=1 or 2"
      ],
      [
        "y^{2}+4y=5 \\Rightarrow  y^{2}+4y-5=0"
      ],
      [
        "(y+5)(y-1)=0 \\Rightarrow  y=-5 or 1"
      ]
    ],
    "answer": [
      "x=1 or 2",
      "y=1 or -5."
    ]
  },
  "c10-1-1-unit-q2": {
    "steps": [
      [
        "n(A)=3"
      ],
      [
        "-1,0,1\\in A \\Rightarrow  A=\\{-1,0,1\\}"
      ],
      [
        "\\begin{aligned}&\\text{Remaining}=\\{(-1,-1), (-1,1), (0,-1)\\\\&\\quad (0,0), (1,-1), (1,0)\\\\&\\quad (1,1)\\}\\end{aligned}"
      ]
    ],
    "answer": [
      "A=\\{-1,0,1\\}",
      "\\begin{aligned}&\\text{remaining} pairs=\\{(-1,-1), (-1,1), (0,-1)\\\\&\\quad (0,0), (1,-1), (1,0)\\\\&\\quad (1,1)\\}.\\end{aligned}"
    ]
  },
  "c10-1-1-unit-q3": {
    "steps": [
      [
        "f(0)=4"
      ],
      [
        "f(3)=\\sqrt{3-1}=\\sqrt{2}"
      ],
      [
        "f(a+1)=\\sqrt{(a+1)-1}=\\sqrt{a}"
      ]
    ],
    "answer": [
      "(i) 4",
      "(ii) \\sqrt{2}",
      "(iii) \\sqrt{a}."
    ]
  },
  "c10-1-1-unit-q4": {
    "steps": [
      [
        "9\\rightarrow 3",
        "10\\rightarrow 5",
        "12\\rightarrow 3",
        "14\\rightarrow 7",
        "15\\rightarrow 5",
        "16\\rightarrow 2"
      ],
      [
        "11\\rightarrow 11",
        "13\\rightarrow 13",
        "17\\rightarrow 17"
      ],
      [
        "(9,3),(10,5),(11,11),(12,3),(13,13),(14,7),(15,5),(16,2),(17,17)"
      ],
      [
        "\\text{Range}=\\{2,3,5,7,11,13,17\\}"
      ]
    ],
    "answer": [
      "\\begin{aligned}&f=\\{(9,3), (10,5), (11,11)\\\\&\\quad (12,3), (13,13), (14,7)\\\\&\\quad (15,5), (16,2), (17,17)\\}\\end{aligned}",
      "\\text{range}=\\{2,3,5,7,11,13,17\\}."
    ]
  },
  "c10-1-1-unit-q5": {
    "steps": [
      [
        "1-x^{2}\\ge 0"
      ],
      [
        "x^{2}\\le 1 \\Rightarrow  -1\\le x\\le 1"
      ],
      [
        "1-\\sqrt{1-x^{2}}\\ge 0",
        "1+\\sqrt{1-\\sqrt{1-x^{2}}}>0"
      ],
      [
        "\\text{Domain}=[-1,1]"
      ]
    ],
    "answer": [
      "\\text{Domain}=[-1,1]."
    ]
  },
  "c10-1-1-unit-q6": {
    "steps": [
      [
        "(f\\circ g)(x)=f(3x)=9x^{2}"
      ],
      [
        "((f\\circ g)\\circ h)(x)=9(x-2)^{2}"
      ],
      [
        "(g\\circ h)(x)=3(x-2)",
        "f(g(h(x)))=[3(x-2)]^{2}"
      ],
      [
        "(f\\circ g)\\circ h=f\\circ (g\\circ h)=9(x-2)^{2}"
      ]
    ],
    "answer": [
      "\\text{Both sides}=9(x-2)^{2}."
    ]
  },
  "c10-1-1-unit-q7": {
    "steps": [
      [
        "A\\subseteq B and C\\subseteq D"
      ],
      [
        "A\\times C=\\{(1,5),(1,6),(2,5),(2,6)\\}"
      ],
      [
        "A\\times C\\subset B\\times D"
      ]
    ],
    "answer": [
      "\\text{Yes}",
      "A\\times C=\\{(1,5),(1,6),(2,5),(2,6)\\}\\subset B\\times D."
    ]
  },
  "c10-1-1-unit-q8": {
    "steps": [
      [
        "f(f(x))=\\{FRAC1|\\dfrac{x-1}{x+1}-1|\\dfrac{x-1}{x+1}+1\\}"
      ],
      [
        "\\dfrac{x-1}{x+1}-1=\\dfrac{-2}{x+1}"
      ],
      [
        "\\dfrac{x-1}{x+1}+1=\\dfrac{2x}{x+1}"
      ],
      [
        "f(f(x))=\\{FRAC1|\\dfrac{-2}{x+1}|\\dfrac{2x}{x+1}\\}=\\dfrac{-1}{x}"
      ]
    ],
    "answer": [
      "f(f(x))=\\dfrac{-1}{x} for x\\ne -1,0."
    ]
  },
  "c10-1-1-unit-q9": {
    "steps": [
      [
        "g(\\dfrac{1}{2})=\\{FRAC2|\\dfrac{1}{2-2}|3\\}=\\{FRAC4|\\dfrac{-3}{2}|3\\}=\\dfrac{-1}{2}"
      ],
      [
        "g(g(\\dfrac{1}{2}))=g(\\dfrac{-1}{2})=\\{FRAC3|\\dfrac{-1}{2-2}|3\\}=\\dfrac{-5}{6}"
      ],
      [
        "g(f(x))=\\dfrac{(6x+8)-2}{3}"
      ],
      [
        "g(f(x))=\\dfrac{6x+6}{3}=2x+2"
      ]
    ],
    "answer": [
      "(i) \\dfrac{-5}{6}",
      "(ii) 2x+2."
    ]
  },
  "c10-1-1-unit-q10": {
    "steps": [
      [
        "x-9\\ne 0 \\Rightarrow  x\\ne 9"
      ],
      [
        "4x^{2}+1\\ge 1>0 \\Rightarrow  \\text{domain} \\mathbb{R}"
      ],
      [
        "x-2\\ge 0 \\Rightarrow  x\\ge 2"
      ],
      [
        "Domain(h)=\\mathbb{R}"
      ]
    ],
    "answer": [
      "(i) \\mathbb{R}\\setminus \\{9\\}",
      "(ii) \\mathbb{R}",
      "(iii) [2,\\infty )",
      "(iv) \\mathbb{R}."
    ]
  }
};
const item=id=>Object.prototype.hasOwnProperty.call(LAYOUT,id)?LAYOUT[id]:null;
function matchingParts(segments,fallback,label){
  const original=String(fallback||'');
  if(segments.length!==original.split(/;\s+/).length)throw Error('Chapter 1 notation segment mismatch: '+label);
  return segments.map((latex,i)=>({latex,display:true,fallback:original.split(/;\s+/)[i].trim()}));
}
window.TriggleChapter1Math=Object.freeze({
  ids:Object.freeze(Object.keys(LAYOUT)),
  getStep(record,index){
    const entry=item(record?.id);if(!entry)return null;
    if(record.chapter!=='1'||record.classNum!==10)throw Error('Unexpected Chapter 1 maths target');
    const source=record.steps[index];if(!source||!entry.steps[index])throw Error('Missing Chapter 1 step notation '+record.id+'/'+index);
    const segments=matchingParts(entry.steps[index],source.eq,record.id+'/'+index);
    return segments.length===1?segments[0]:segments;
  },
  getAnswer(record){
    const entry=item(record?.id);if(!entry)return null;
    const segments=matchingParts(entry.answer,record.answer,record.id+'/answer');
    return segments.length===1?segments[0]:segments;
  }
});
})();
