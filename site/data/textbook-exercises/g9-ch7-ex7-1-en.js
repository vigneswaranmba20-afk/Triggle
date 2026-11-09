// Grade 9 English 2025 textbook, Exercise 7.1. Questions from user-provided SCERT PDF;
// original step-by-step solutions, mathematical source checks; Tamil and final visual review pending.
(()=>{'use strict';
const entries=[
  {
    "id": "g9-ch7-ex7.1-q1",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q1",
      "ta": "Exercise 7.1 · Q1 (English only)"
    },
    "title": {
      "en": "Heron’s formula for two triangles",
      "ta": "Heron’s formula for two triangles (English only)"
    },
    "q": {
      "en": "Using Heron’s formula, find the area of a triangle whose sides are\n(i) 10 cm, 24 cm, 26 cm         (ii) 1.8m, 8 m, 8.2 m",
      "ta": "English-language question; Tamil version pending. Using Heron’s formula, find the area of a triangle whose sides are\n(i) 10 cm, 24 cm, 26 cm         (ii) 1.8m, 8 m, 8.2 m"
    },
    "steps": [
      {
        "en": "For both triangles use the semiperimeter s=(a+b+c)/2 and Heron’s formula.",
        "ta": "English explanation (Tamil version pending): For both triangles use the semiperimeter s=(a+b+c)/2 and Heron’s formula.",
        "eq": "A = √[s(s−a)(s−b)(s−c)]"
      },
      {
        "en": "Part (i): the semiperimeter is 30 cm.",
        "ta": "English explanation (Tamil version pending): Part (i): the semiperimeter is 30 cm.",
        "eq": "s = (10+24+26)/2 = 30 cm"
      },
      {
        "en": "Substitute each side into Heron’s expression.",
        "ta": "English explanation (Tamil version pending): Substitute each side into Heron’s expression.",
        "eq": "A₁ = √(30×20×6×4) = √14400 = 120 cm²"
      },
      {
        "en": "Part (ii): the semiperimeter is 9 m.",
        "ta": "English explanation (Tamil version pending): Part (ii): the semiperimeter is 9 m.",
        "eq": "s = (1.8+8+8.2)/2 = 9 m"
      },
      {
        "en": "Find the second area and keep its unit in square metres.",
        "ta": "English explanation (Tamil version pending): Find the second area and keep its unit in square metres.",
        "eq": "A₂ = √(9×7.2×1×0.8) = √51.84 = 7.2 m²"
      }
    ],
    "answer": "(i) 120 cm²; (ii) 7.2 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q2",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q2",
      "ta": "Exercise 7.1 · Q2 (English only)"
    },
    "title": {
      "en": "Triangular ground levelling cost",
      "ta": "Triangular ground levelling cost (English only)"
    },
    "q": {
      "en": "The sides of the triangular ground are 22 m, 120 m and 122 m. Find the area and cost of levelling the ground at the rate of ₹ 20 per m².",
      "ta": "English-language question; Tamil version pending. The sides of the triangular ground are 22 m, 120 m and 122 m. Find the area and cost of levelling the ground at the rate of ₹ 20 per m²."
    },
    "steps": [
      {
        "en": "Find the semiperimeter.",
        "ta": "English explanation (Tamil version pending): Find the semiperimeter.",
        "eq": "s = (22+120+122)/2 = 132 m"
      },
      {
        "en": "Apply Heron’s formula to the three side lengths.",
        "ta": "English explanation (Tamil version pending): Apply Heron’s formula to the three side lengths.",
        "eq": "A = √(132×110×12×10) = 1320 m²"
      },
      {
        "en": "Multiply the area by ₹20 per square metre.",
        "ta": "English explanation (Tamil version pending): Multiply the area by ₹20 per square metre.",
        "eq": "Cost = 1320×20 = ₹26,400"
      }
    ],
    "answer": "Area = 1320 m²; cost = ₹26,400",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q3",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q3",
      "ta": "Exercise 7.1 · Q3 (English only)"
    },
    "title": {
      "en": "Triangle with side ratio 5:12:13",
      "ta": "Triangle with side ratio 5:12:13 (English only)"
    },
    "q": {
      "en": "The perimeter of a triangular plot is 600 m. If the sides are in the ratio 5:12:13, then find the area of the plot.",
      "ta": "English-language question; Tamil version pending. The perimeter of a triangular plot is 600 m. If the sides are in the ratio 5:12:13, then find the area of the plot."
    },
    "steps": [
      {
        "en": "Set the three sides to 5k, 12k and 13k.",
        "ta": "English explanation (Tamil version pending): Set the three sides to 5k, 12k and 13k.",
        "eq": "5k + 12k + 13k = 600"
      },
      {
        "en": "Determine the scale k and actual side lengths.",
        "ta": "English explanation (Tamil version pending): Determine the scale k and actual side lengths.",
        "eq": "k = 20; sides = 100, 240, 260 m"
      },
      {
        "en": "Because 5²+12²=13², the scaled triangle is right-angled.",
        "ta": "English explanation (Tamil version pending): Because 5²+12²=13², the scaled triangle is right-angled.",
        "eq": "A = (100×240)/2 = 12,000 m²"
      }
    ],
    "answer": "12,000 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q4",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q4",
      "ta": "Exercise 7.1 · Q4 (English only)"
    },
    "title": {
      "en": "Equilateral triangular area",
      "ta": "Equilateral triangular area (English only)"
    },
    "q": {
      "en": "Find the area of an equilateral triangle whose perimeter is 180 cm.",
      "ta": "English-language question; Tamil version pending. Find the area of an equilateral triangle whose perimeter is 180 cm."
    },
    "steps": [
      {
        "en": "All three sides are equal; divide the perimeter by three.",
        "ta": "English explanation (Tamil version pending): All three sides are equal; divide the perimeter by three.",
        "eq": "a = 180/3 = 60 cm"
      },
      {
        "en": "Use the equilateral triangle area formula.",
        "ta": "English explanation (Tamil version pending): Use the equilateral triangle area formula.",
        "eq": "A = (√3/4)a²"
      },
      {
        "en": "Substitute 60 cm and simplify.",
        "ta": "English explanation (Tamil version pending): Substitute 60 cm and simplify.",
        "eq": "A = (√3/4)×60² = 900√3 cm²"
      }
    ],
    "answer": "900√3 cm² ≈ 1558.8 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q5",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q5",
      "ta": "Exercise 7.1 · Q5 (English only)"
    },
    "title": {
      "en": "Painting isosceles advertisement board",
      "ta": "Painting isosceles advertisement board (English only)"
    },
    "q": {
      "en": "An advertisement board is in the form of an isosceles triangle with perimeter 36m and each of the equal sides are 13 m. Find the cost of painting it at ₹ 17.50 per square metre.",
      "ta": "English-language question; Tamil version pending. An advertisement board is in the form of an isosceles triangle with perimeter 36m and each of the equal sides are 13 m. Find the cost of painting it at ₹ 17.50 per square metre."
    },
    "steps": [
      {
        "en": "The remaining base is perimeter minus the two equal sides.",
        "ta": "English explanation (Tamil version pending): The remaining base is perimeter minus the two equal sides.",
        "eq": "Base = 36 − 13 − 13 = 10 m"
      },
      {
        "en": "The altitude bisects the base: use Pythagoras in either right triangle.",
        "ta": "English explanation (Tamil version pending): The altitude bisects the base: use Pythagoras in either right triangle.",
        "eq": "h = √(13²−5²) = √144 = 12 m"
      },
      {
        "en": "Calculate the full triangular area.",
        "ta": "English explanation (Tamil version pending): Calculate the full triangular area.",
        "eq": "A = (10×12)/2 = 60 m²"
      },
      {
        "en": "Multiply area by the given paint rate.",
        "ta": "English explanation (Tamil version pending): Multiply area by the given paint rate.",
        "eq": "Cost = 60×₹17.50 = ₹1050"
      }
    ],
    "answer": "₹1050",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q6",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q6",
      "ta": "Exercise 7.1 · Q6 (English only)"
    },
    "title": {
      "en": "Shaded triangle inside another triangle",
      "ta": "Shaded triangle inside another triangle (English only)"
    },
    "q": {
      "en": "Find the area of the unshaded region.",
      "ta": "English-language question; Tamil version pending. Find the area of the unshaded region."
    },
    "steps": [
      {
        "en": "Read the textbook diagram: BC=42 cm, CA=34 cm, BD=16 cm, AD=12 cm, with ∠BDA=90°.",
        "ta": "English explanation (Tamil version pending): Read the textbook diagram: BC=42 cm, CA=34 cm, BD=16 cm, AD=12 cm, with ∠BDA=90°.",
        "eq": "BC=42, CA=34, BD=16, AD=12 cm"
      },
      {
        "en": "First find AB from right triangle ADB.",
        "ta": "English explanation (Tamil version pending): First find AB from right triangle ADB.",
        "eq": "AB = √(12²+16²) = 20 cm"
      },
      {
        "en": "Outer triangle ABC has sides 20, 34 and 42 cm, so s=48 cm.",
        "ta": "English explanation (Tamil version pending): Outer triangle ABC has sides 20, 34 and 42 cm, so s=48 cm.",
        "eq": "s = (20+34+42)/2 = 48 cm"
      },
      {
        "en": "Calculate the outer triangle area using Heron’s formula.",
        "ta": "English explanation (Tamil version pending): Calculate the outer triangle area using Heron’s formula.",
        "eq": "A(ABC) = √(48×28×14×6) = 336 cm²"
      },
      {
        "en": "The coloured triangle ADB has area half its perpendicular-leg product.",
        "ta": "English explanation (Tamil version pending): The coloured triangle ADB has area half its perpendicular-leg product.",
        "eq": "A(ADB) = (12×16)/2 = 96 cm²"
      },
      {
        "en": "Subtract the coloured region from the outer triangle.",
        "ta": "English explanation (Tamil version pending): Subtract the coloured region from the outer triangle.",
        "eq": "Unshaded area = 336 − 96 = 240 cm²"
      }
    ],
    "answer": "240 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 252 / PDF p. 258; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 258,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 258,
      "enPrintedPage": 252,
      "tamilEditorial": "pending",
      "notes": [
        "The original Fig. 7.8 has a shaded right triangle ABD. Exact diagram was visually checked from PDF page 258. An original cropped reference figure is included for Codex to connect without redesign."
      ],
      "figureAsset": "assets/textbook-figures/g9-ch7-ex7-1-q6-reference.png"
    }
  },
  {
    "id": "g9-ch7-ex7.1-q7",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q7",
      "ta": "Exercise 7.1 · Q7 (English only)"
    },
    "title": {
      "en": "Quadrilateral split by diagonal",
      "ta": "Quadrilateral split by diagonal (English only)"
    },
    "q": {
      "en": "Find the area of a quadrilateral ABCD whose sides are AB =13 cm, BC =12 cm, CD = 9 cm, AD =14 cm and diagonal BD =15 cm.",
      "ta": "English-language question; Tamil version pending. Find the area of a quadrilateral ABCD whose sides are AB =13 cm, BC =12 cm, CD = 9 cm, AD =14 cm and diagonal BD =15 cm."
    },
    "steps": [
      {
        "en": "Diagonal BD forms triangles ABD and BCD; calculate each separately.",
        "ta": "English explanation (Tamil version pending): Diagonal BD forms triangles ABD and BCD; calculate each separately.",
        "eq": "BD = 15 cm"
      },
      {
        "en": "For triangle ABD, sides are 13,14,15 and semiperimeter 21.",
        "ta": "English explanation (Tamil version pending): For triangle ABD, sides are 13,14,15 and semiperimeter 21.",
        "eq": "A(ABD)=√(21×8×7×6)=84 cm²"
      },
      {
        "en": "For triangle BCD, sides are 12,9,15 and semiperimeter 18.",
        "ta": "English explanation (Tamil version pending): For triangle BCD, sides are 12,9,15 and semiperimeter 18.",
        "eq": "A(BCD)=√(18×6×9×3)=54 cm²"
      },
      {
        "en": "Add the two triangular areas.",
        "ta": "English explanation (Tamil version pending): Add the two triangular areas.",
        "eq": "A(ABCD)=84+54=138 cm²"
      }
    ],
    "answer": "138 cm²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q8",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q8",
      "ta": "Exercise 7.1 · Q8 (English only)"
    },
    "title": {
      "en": "Area of quadrilateral-shaped park",
      "ta": "Area of quadrilateral-shaped park (English only)"
    },
    "q": {
      "en": "A park is in the shape of a quadrilateral. The sides of the park are 15 m, 20 m, 26 m and 17 m and the angle between the first two sides is a right angle. Find the area of the park.",
      "ta": "English-language question; Tamil version pending. A park is in the shape of a quadrilateral. The sides of the park are 15 m, 20 m, 26 m and 17 m and the angle between the first two sides is a right angle. Find the area of the park."
    },
    "steps": [
      {
        "en": "The two perpendicular sides 15 and 20 m form a right triangle and a diagonal of the quadrilateral.",
        "ta": "English explanation (Tamil version pending): The two perpendicular sides 15 and 20 m form a right triangle and a diagonal of the quadrilateral.",
        "eq": "Diagonal = √(15²+20²)=25 m"
      },
      {
        "en": "Find the right triangle area.",
        "ta": "English explanation (Tamil version pending): Find the right triangle area.",
        "eq": "A₁=(15×20)/2=150 m²"
      },
      {
        "en": "The other triangle has sides 25,26,17 m and semiperimeter 34 m.",
        "ta": "English explanation (Tamil version pending): The other triangle has sides 25,26,17 m and semiperimeter 34 m.",
        "eq": "s=(25+26+17)/2=34 m"
      },
      {
        "en": "Use Heron’s formula for its area.",
        "ta": "English explanation (Tamil version pending): Use Heron’s formula for its area.",
        "eq": "A₂=√(34×9×8×17)=204 m²"
      },
      {
        "en": "Add the two parts of the park.",
        "ta": "English explanation (Tamil version pending): Add the two parts of the park.",
        "eq": "Total=150+204=354 m²"
      }
    ],
    "answer": "354 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q9",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q9",
      "ta": "Exercise 7.1 · Q9 (English only)"
    },
    "title": {
      "en": "Area of rhombus with one diagonal",
      "ta": "Area of rhombus with one diagonal (English only)"
    },
    "q": {
      "en": "A land is in the shape of rhombus. The perimeter of the land is 160 m and one of the diagonal is 48 m. Find the area of the land.",
      "ta": "English-language question; Tamil version pending. A land is in the shape of rhombus. The perimeter of the land is 160 m and one of the diagonal is 48 m. Find the area of the land."
    },
    "steps": [
      {
        "en": "Each of the four equal sides is 160/4 m.",
        "ta": "English explanation (Tamil version pending): Each of the four equal sides is 160/4 m.",
        "eq": "Side = 40 m"
      },
      {
        "en": "Rhombus diagonals bisect at right angles, so half the known diagonal is 24 m.",
        "ta": "English explanation (Tamil version pending): Rhombus diagonals bisect at right angles, so half the known diagonal is 24 m.",
        "eq": "48/2=24 m"
      },
      {
        "en": "Pythagoras gives half the second diagonal.",
        "ta": "English explanation (Tamil version pending): Pythagoras gives half the second diagonal.",
        "eq": "Half d₂ = √(40²−24²)=32 m, so d₂=64 m"
      },
      {
        "en": "Use half the product of diagonals.",
        "ta": "English explanation (Tamil version pending): Use half the product of diagonals.",
        "eq": "A=(48×64)/2=1536 m²"
      }
    ],
    "answer": "1536 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": []
    }
  },
  {
    "id": "g9-ch7-ex7.1-q10",
    "classNum": 9,
    "chapter": "7",
    "exercise": "7.1",
    "topic": {
      "en": "Mensuration",
      "ta": "Mensuration (English version only)"
    },
    "label": {
      "en": "Exercise 7.1 · Q10",
      "ta": "Exercise 7.1 · Q10 (English only)"
    },
    "title": {
      "en": "Area of parallelogram from sides and diagonal",
      "ta": "Area of parallelogram from sides and diagonal (English only)"
    },
    "q": {
      "en": "The adjacent sides of a parallelogram measures 34 m, 20 m and the measure of one of the diagonal is 42 m. Find the area of parallelogram.",
      "ta": "English-language question; Tamil version pending. The adjacent sides of a parallelogram measures 34 m, 20 m and the measure of one of the diagonal is 42 m. Find the area of parallelogram."
    },
    "steps": [
      {
        "en": "A diagonal divides the parallelogram into two congruent triangles with sides 34,20,42.",
        "ta": "English explanation (Tamil version pending): A diagonal divides the parallelogram into two congruent triangles with sides 34,20,42.",
        "eq": "s=(34+20+42)/2=48 m"
      },
      {
        "en": "Use Heron’s formula for one triangle.",
        "ta": "English explanation (Tamil version pending): Use Heron’s formula for one triangle.",
        "eq": "A△=√(48×14×28×6)=336 m²"
      },
      {
        "en": "Double for the parallelogram.",
        "ta": "English explanation (Tamil version pending): Double for the parallelogram.",
        "eq": "A▱=2×336=672 m²"
      }
    ],
    "answer": "672 m²",
    "kind": "reference",
    "reference": "Tamil Nadu SCERT 2025 revised Standard Nine Mathematics English · Exercise 7.1 · printed p. 253 / PDF p. 259; mathematical solutions by Triggle; original PDF page-image review required for diagrams and tables.",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view?usp=drivesdk",
    "page": 259,
    "sourceFidelity": {
      "status": "pdf-text-checked-en-visual-pending",
      "enPdfPage": 259,
      "enPrintedPage": 253,
      "tamilEditorial": "pending",
      "notes": []
    }
  }
];
const grade=window.TRIGGLE_CLASSES?.[9];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>c.id==='g9-ch7');
if(!grade||!chapter)throw Error('Grade 9 chapter registration missing');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){if(grade.items.some(q=>q.id===item.id))throw Error('Duplicate content '+item.id);grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
window.TRIGGLE_G9_CH7_EX7_1_EN=entries.map(x=>x.id);
})();
