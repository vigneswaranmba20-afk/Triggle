/* Explicit mathematical complexity metadata, independent of solution presentation.
 * New IDs have no implicit label. Existing reviewed decisions are retained.
 * Implementation-audit records are editorial assignments, not human certification.
 */
(()=>{'use strict';
const metadata={
  "schemaVersion": 1,
  "criteria": {
    "easy": "Direct formula application, definitions and basic calculations.",
    "medium": "Multiple calculation steps, linked concepts and moderate reasoning.",
    "difficult": "Complex reasoning, proof, case analysis, multi-stage calculations or advanced connections."
  },
  "entries": {
    "c10-4-ex4-1-q4": {"grade": 10, "level": "medium", "basis": "Prove the product of segments", "review": "implementation-audit"},
    "c10-4-ex4-1-q5": {"grade": 10, "level": "medium", "basis": "Use a right triangle inside another", "review": "implementation-audit"},
    "c10-4-ex4-1-q6": {"grade": 10, "level": "easy", "basis": "Pair the matching sides", "review": "implementation-audit"},
    "c10-4-ex4-1-q7-i": {"grade": 10, "level": "medium", "basis": "Compare the top and left triangles", "review": "implementation-audit"},
    "c10-4-ex4-1-q7-ii": {"grade": 10, "level": "medium", "basis": "Compare the top and right triangles", "review": "implementation-audit"},
    "c10-4-ex4-1-q7-iii": {"grade": 10, "level": "medium", "basis": "Compare the left and right triangles", "review": "implementation-audit"},
    "c10-4-ex4-1-q7-iv": {"grade": 10, "level": "medium", "basis": "Relate the square to the base segments", "review": "implementation-audit"},
    "c10-4-ex4-1-q8": {"grade": 10, "level": "medium", "basis": "Convert an area ratio to a side ratio", "review": "implementation-audit"},
    "c10-4-ex4-1-q9": {"grade": 10, "level": "medium", "basis": "Find where the crossing sits above the ground", "review": "implementation-audit"},
    "c10-4-ex4-1-q10": {"grade": 10, "level": "medium", "basis": "Reduce a triangle by 2/3", "review": "implementation-audit"},
    "c10-4-ex4-1-q11": {"grade": 10, "level": "medium", "basis": "Reduce a triangle by 4/5", "review": "implementation-audit"},
    "c10-4-ex4-1-q12": {"grade": 10, "level": "medium", "basis": "Enlarge a triangle by 6/5", "review": "implementation-audit"},
    "c10-4-ex4-1-q13": {"grade": 10, "level": "medium", "basis": "Enlarge a triangle by 7/3", "review": "implementation-audit"},
    "c10-4-ex4-2-q1-i": {"grade": 10, "level": "medium", "basis": "Divide a side in a given ratio", "review": "implementation-audit"},
    "c10-4-ex4-2-q1-ii": {"grade": 10, "level": "difficult", "basis": "Solve the proportion and check the lengths", "review": "implementation-audit"},
    "c10-4-ex4-2-q2": {"grade": 10, "level": "medium", "basis": "Transfer a ratio across a trapezium", "review": "implementation-audit"},
    "c10-4-ex4-2-q3": {"grade": 10, "level": "easy", "basis": "Prove that the cut is parallel", "review": "implementation-audit"},
    "c10-4-ex4-2-q4-i": {"grade": 10, "level": "medium", "basis": "Compare the fractions of the whole sides", "review": "implementation-audit"},
    "c10-4-ex4-2-q4-ii": {"grade": 10, "level": "medium", "basis": "Compare the remaining segments", "review": "implementation-audit"},
    "c10-4-ex4-2-q5": {"grade": 10, "level": "medium", "basis": "Find the side length of the rhombus", "review": "implementation-audit"},
    "c10-4-ex4-2-q6": {"grade": 10, "level": "medium", "basis": "Show that three parallels split both sides alike", "review": "implementation-audit"},
    "c10-4-ex4-2-q7": {"grade": 10, "level": "medium", "basis": "Link two similarity ratios", "review": "implementation-audit"},
    "c10-4-ex4-2-q8-i": {"grade": 10, "level": "easy", "basis": "Test the bisector in the first triangle", "review": "implementation-audit"},
    "c10-4-ex4-2-q8-ii": {"grade": 10, "level": "easy", "basis": "Test the bisector in the second triangle", "review": "implementation-audit"},
    "c10-4-ex4-2-q9": {"grade": 10, "level": "difficult", "basis": "Use the bisector and the right triangles", "review": "implementation-audit"},
    "c10-4-ex4-2-q10": {"grade": 10, "level": "difficult", "basis": "Use both bisectors to prove parallelism", "review": "implementation-audit"},
    "c10-4-ex4-2-q11": {"grade": 10, "level": "difficult", "basis": "Construct from a base, angle and median", "review": "implementation-audit"},
    "c10-4-ex4-2-q12": {"grade": 10, "level": "difficult", "basis": "Construct the median and find the altitude", "review": "implementation-audit"},
    "c10-4-ex4-2-q13": {"grade": 10, "level": "difficult", "basis": "Construct from a base, angle and altitude", "review": "implementation-audit"},
    "c10-4-ex4-2-q14": {"grade": 10, "level": "difficult", "basis": "Construct an altitude to the extended base", "review": "implementation-audit"},
    "c10-4-ex4-2-q15": {"grade": 10, "level": "difficult", "basis": "Construct the triangle from a known bisector point", "review": "implementation-audit"},
    "c10-4-ex4-2-q16": {"grade": 10, "level": "difficult", "basis": "Construct the triangle with the apex at R", "review": "implementation-audit"},
    "g9-ch3-ex3.1-q1-i": {"grade":9,"level":"easy","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q1-ii": {"grade":9,"level":"easy","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q1-iii": {"grade":9,"level":"easy","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q1-iv": {"grade":9,"level":"medium","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q1-v": {"grade":9,"level":"easy","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q1-vi": {"grade":9,"level":"medium","basis":"Classify polynomial forms using integer powers and valid algebraic simplification","review":"implementation-audit"},
    "g9-ch3-ex3.1-q2-i": {"grade":9,"level":"easy","basis":"Read signed x-squared and x coefficients, including irrational constants","review":"implementation-audit"},
    "g9-ch3-ex3.1-q2-ii": {"grade":9,"level":"easy","basis":"Read signed x-squared and x coefficients, including irrational constants","review":"implementation-audit"},
    "g9-ch3-ex3.1-q2-iii": {"grade":9,"level":"easy","basis":"Read signed x-squared and x coefficients, including irrational constants","review":"implementation-audit"},
    "g9-ch3-ex3.1-q2-iv": {"grade":9,"level":"easy","basis":"Read signed x-squared and x coefficients, including irrational constants","review":"implementation-audit"},
    "g9-ch3-ex3.1-q2-v": {"grade":9,"level":"easy","basis":"Read signed x-squared and x coefficients, including irrational constants","review":"implementation-audit"},
    "g9-ch1-ex1.2-q3-i": {"grade":9,"level":"medium","basis":"Distinguish equivalent sets by cardinality from equal sets with identical members","review":"implementation-audit"},
    "g9-ch1-ex1.2-q3-ii": {"grade":9,"level":"easy","basis":"Enumerate whole-number values between strict bounds and compare membership","review":"implementation-audit"},
    "g9-ch1-ex1.2-q3-iii": {"grade":9,"level":"easy","basis":"Recognize equality of sets regardless of the ordering of their elements","review":"implementation-audit"},
    "g9-ch1-ex1.2-q3-iv": {"grade":9,"level":"medium","basis":"Independently enumerate prime numbers and divisors before counting two equivalent sets","review":"implementation-audit"},
    "g9-ch1-ex1.2-q4-i": {"grade":9,"level":"easy","basis":"Identify an empty natural-number interval with both endpoints excluded","review":"implementation-audit"},
    "g9-ch1-ex1.2-q4-ii": {"grade":9,"level":"easy","basis":"Use even-number definition to reject an impossible membership condition","review":"implementation-audit"},
    "g9-ch1-ex1.2-q4-iii": {"grade":9,"level":"easy","basis":"Distinguish the singleton set containing zero from the empty set","review":"implementation-audit"},
    "g9-ch1-ex1.2-q4-iv": {"grade":9,"level":"easy","basis":"Apply the defining number of sides of a triangle to identify an empty set","review":"implementation-audit"},
    "g9-ch1-ex1.2-q5-i": {"grade":9,"level":"easy","basis":"Find explicit common letter elements and decide the intersection is nonempty","review":"implementation-audit"},
    "g9-ch1-ex1.2-q5-ii": {"grade":9,"level":"medium","basis":"Recognize the unique even prime and strict greater-than-two constraint","review":"implementation-audit"},
    "g9-ch1-ex1.2-q7": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q7: Treat the nested set {a, b} as one element of A = {a, {a, b}} and list all 2² = 4 subsets.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q8-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q8(i): List all four subsets of the two-element set A = {a, b} to form P(A).","review":"implementation-audit"},
    "g9-ch1-ex1.2-q8-ii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q8(ii): Enumerate all eight subsets of B = {1, 2, 3} by subset size to write P(B).","review":"implementation-audit"},
    "g9-ch1-ex1.2-q8-iii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q8(iii): Systematically enumerate all sixteen subsets of the four-element set D = {p, q, r, s} by size 0, 1, 2, 3, and 4.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q8-iv": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q8(iv): Recognise that the empty set E = ∅ has exactly one subset, giving P(E) = {∅}.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q9-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q9(i): Calculate 2³ = 8 subsets and 2³ − 1 = 7 proper subsets for a 3-element set W.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q9-ii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q9(ii): Identify the 10 natural-number squares up to 100 in X, then compute 2¹⁰ = 1024 subsets and 1023 proper subsets.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q10-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q10(i): Apply n[P(A)] = 2^{n(A)} directly for n(A) = 4 to obtain 16.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q10-ii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q10(ii): Evaluate n[P(A)] = 2⁰ = 1 when n(A) = 0.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q10-iii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q10(iii): Solve 2^{n(A)} = 256 = 2⁸ by matching exponents to find n(A) = 8.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q2-i": {"grade":9,"level":"easy","basis":"Classify a current finite administrative list without asserting a fixed district count","review":"implementation-audit"},
    "g9-ch1-ex1.2-q2-ii": {"grade":9,"level":"medium","basis":"Demonstrate arbitrarily many lines through one point","review":"implementation-audit"},
    "g9-ch1-ex1.2-q2-iii": {"grade":9,"level":"medium","basis":"Show that all integers below a bound are unbounded to the left","review":"implementation-audit"},
    "g9-ch1-ex1.2-q2-iv": {"grade":9,"level":"medium","basis":"Factor a quadratic and count its natural-number roots","review":"implementation-audit"},
    "g9-ch1-ex1.2-q1-i": {"grade":9,"level":"easy","basis":"Direct count of distinct set members","review":"implementation-audit"},
    "g9-ch1-ex1.2-q1-ii": {"grade":9,"level":"medium","basis":"Whole-number domain enumeration with strict upper bound","review":"implementation-audit"},
    "g9-ch1-ex1.2-q1-iii": {"grade":9,"level":"medium","basis":"Natural-number domain and exact fractional set evaluation","review":"implementation-audit"},
    "g9-ch1-ex1.2-q1-iv": {"grade":9,"level":"easy","basis":"Integer enumeration across one inclusive and one strict endpoint","review":"implementation-audit"},
    "g9-ch1-ex1.2-q1-v": {"grade":9,"level":"medium","basis":"Leap-year rule including exclusion of century year 1900","review":"implementation-audit"},
        "c9-example-6-1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-example-6-2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-example-6-3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-example-6-4": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q4": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q5": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q6": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q8": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q9": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-1-q10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q2-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q2-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q2-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-3-q-i": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-3-q-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-3-q-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-3-q-iv": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-v": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q1-vi": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q4": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-4-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q8": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q9": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-exercise-6-5-q10": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-1-1-practice-1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-2-2-practice-2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-3-3-practice-3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-3-3-practice-4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-4-4-practice-5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-5-5-practice-6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-7-7-practice-7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-8-8-practice-8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-9-9-practice-9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch2-example-1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-3": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-5": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-8": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-11": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-12": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-13": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-14": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-15": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-16": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-17": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-18": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-19": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-20": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-21": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-22": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-23": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-24": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-25": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-26": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-27": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-example-28": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-29": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-30": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-example-31": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex1-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex1-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex1-q3-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex1-q3-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex1-q3-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q3": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex2-q4-i": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q4-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q4-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q4-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q4-v": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q4-vi": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q5-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q5-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q5-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex2-q5-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex3-q1-i": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex3-q1-ii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex3-q1-iii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex3-q2-i": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex3-q2-ii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex3-q2-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex3-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex4-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex4-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex4-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q2-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q2-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q2-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q3-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q3-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q3-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q3-iv": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex5-q4-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q4-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q4-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q4-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q5-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q5-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q5-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex5-q5-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q1-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q1-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q2-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q2-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q2-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q2-iv": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex6-q2-v": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex6-q3-i": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q3-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q4-i": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex6-q4-ii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex6-q5-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q5-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q5-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q5-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q6-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q6-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q6-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex6-q6-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex7-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex7-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex7-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex7-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex7-q2-i": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q2-ii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q2-iii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q2-iv": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q3": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q4": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex7-q5": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex8-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q2-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q2-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q2-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q2-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q3-i": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex8-q3-ii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex8-q3-iii": {
      "grade": 9,
      "level": "difficult",
      "basis": "Existing hard classification retained; multi-stage reasoning or calculation.",
      "review": "preserved-real-numbers-review",
      "priorClassification": "hard"
    },
    "g9-ch2-ex8-q4-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q4-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q4-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q5-i": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q5-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q5-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex8-q5-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q8": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q9": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q11": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q12": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q13": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q14": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q15": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q16": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q17": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q18": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q19": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "g9-ch2-ex9-q20": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit",
      "priorClassification": "standard"
    },
    "c9-textbook-example-1-1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-4": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-10": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-11": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-12": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-13": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-14": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-15": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-16": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-17": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-18": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-19": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-20": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-21": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-22": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-23": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-24": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-25": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-26": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-27": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-28": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-29": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-30": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-31": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-32": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-33": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-34": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c9-textbook-example-1-35": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q1-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q2-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q2-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q2-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q2-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-v": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-a-vi": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-b-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-b-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-b-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q3-b-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q4-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q4-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q4-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q4-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q5-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q5-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q5-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q5-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q6-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q6-ii": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q6-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch1-ex1.1-q6-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.1-q10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.1-q11": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.1-q12": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.1-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.1-q4": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.2-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.2-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.2-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.2-q6": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.3-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.3-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.3-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch4-ex4.3-q6": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q3": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q5": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q6": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q8": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q9": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch5-ex5.2-q11": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q7": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q8": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q9": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.1-q10": {
      "grade": 9,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.2-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q8": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.3-q9": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch7-ex7.4-q10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.1-q8": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.2-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q1": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.3-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q4": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q7": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch8-ex8.4-q10": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q6": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.2-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.2-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.2-q3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.2-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.2-q5": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q3": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q6": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q7": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q8": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.3-q10": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q9": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-ex9.1-q10": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch9-example-9.1": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-example-9.2": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-example-9.3": {
      "grade": 9,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "g9-ch9-example-9.4": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "g9-ch9-example-9.5": {
      "grade": 9,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-1-1": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-1-2": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-1-3": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-2-4": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-2-5": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-2-6": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-3-7": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-3-8": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-3-9": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-4-10": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-4-11": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-4-12": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-5-13": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-5-14": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-5-15": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-6-6-5-16": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-6-6-unit-17": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-3-3-practice-18": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-2-2-practice-19": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-5-5-practice-20": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q6-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q6-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q6-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q7-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-ex1-1-q7-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-2-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-2-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-2-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-2-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-2-q5": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q4": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q5": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q6": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q8": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q9": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-3-q10": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q4": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q6": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q7": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q9": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q10": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q11": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-4-q12": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q1": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q2": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q7": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q8": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-5-q10": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q4": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q5": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q6": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q7": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q8": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q9": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q10": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q11": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q12": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q13": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q14": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-6-q15": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q1": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q4": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q7": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-1-1-unit-q10": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q3": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q4": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-1-q10": {
      "grade": 10,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q1-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c10-4-ex4-1-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-4-ex4-1-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-1-1": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-1-2": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-1-3": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-2-4": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-2-5": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-2-6": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-3-7": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-3-8": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-3-9": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-4-10": {
      "grade": 11,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c11-3-3-4-11": {
      "grade": 11,
      "level": "medium",
      "basis": "Several calculations or linked concepts with moderate reasoning.",
      "review": "implementation-audit"
    },
    "c11-3-3-5-12": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-5-13": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-8-14": {
      "grade": 11,
      "level": "difficult",
      "basis": "Proof, case analysis, non-obvious connection or multi-stage reasoning.",
      "review": "implementation-audit"
    },
    "c11-3-3-11-15": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c11-3-3-11-16": {
      "grade": 11,
      "level": "easy",
      "basis": "Direct definition, formula or routine calculation.",
      "review": "implementation-audit"
    },
    "c12-4-4-1-1": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-1-2": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-1-3": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-1-4": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-3-5": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-3-6": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-3-7": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-3-8": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-3-9": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-4-10": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-4-11": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-4-12": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-4-13": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-2-14": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-5-15": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "c12-4-4-6-16": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse-trig classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse-trig",
        "source": "legacy-existing"
      }
    },
    "g12-ch1-ex1.1-q1-i": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q1-ii": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q1-iii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q2-i": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q2-ii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q2-iii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q3": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed matrix-identity classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "matrix-identity",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q4": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q5": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed matrix-identity classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "matrix-identity",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q6": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q7": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q8": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed matrix-identity classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "matrix-identity",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q9": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q10": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed adjoint classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "adjoint",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q11": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed matrix-identity classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "matrix-identity",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q12": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed matrix-equation classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "matrix-equation",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q13": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed matrix-equation classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "matrix-equation",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q14": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed inverse classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "inverse",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.1-q15": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed encryption classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "encryption",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q1-i": {
      "grade": 12,
      "level": "easy",
      "basis": "Reviewed rank classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "easy",
        "family": "rank",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q1-ii": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed rank classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "rank",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q1-iii": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed rank classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "rank",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q1-iv": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed rank classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "rank",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q1-v": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed rank classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "rank",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q2-i": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed row-reduction classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "row-reduction",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q2-ii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed row-reduction classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "row-reduction",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q2-iii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed row-reduction classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "row-reduction",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q3-i": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed gauss-jordan classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "gauss-jordan",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q3-ii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed gauss-jordan classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "gauss-jordan",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.2-q3-iii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed gauss-jordan classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "gauss-jordan",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q1-i": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed linear-system classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "linear-system",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q1-ii": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed linear-system classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "linear-system",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q1-iii": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed linear-system classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "linear-system",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q1-iv": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed linear-system classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "linear-system",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q2": {
      "grade": 12,
      "level": "medium",
      "basis": "Reviewed matrix-equation classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "medium",
        "family": "matrix-equation",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q3": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed word-problem classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "word-problem",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q4": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed word-problem classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "word-problem",
        "source": "audited-ch1-batch"
      }
    },
    "g12-ch1-ex1.3-q5": {
      "grade": 12,
      "level": "difficult",
      "basis": "Reviewed word-problem classification retained.",
      "review": "preserved-grade12-review",
      "priorClassification": {
        "difficulty": "hard",
        "family": "word-problem",
        "source": "audited-ch1-batch"
      }
    },
    "c10-3-ex3-1-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Reciprocal substitution and elimination in three variables.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q1-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Set multiple equal expressions equal and eliminate variables.",
      "review": "implementation-audit"
    },
    "c10-4-ex4-1-q1-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Compare exact side ratios in a figure-dependent similarity test.",
      "review": "implementation-audit"
    },
    "c10-4-ex4-1-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "AA similarity and corresponding scale factor from the diagram.",
      "review": "implementation-audit"
    },
    "c10-6-ex6-1-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Prove identity by reciprocal substitution and domain restrictions.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q3": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct grouped-data class-boundary range calculation.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Calculate mean, sum of squares, variance and standard deviation.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Nine-value wage variance and standard deviation with independent check",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Two 12-hour cycles; 24 observations and squared-deviation computation",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Consecutive natural-number sum-of-squares identity and variance",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q8": {
      "grade": 10,
      "level": "easy",
      "basis": "Translation invariance of standard deviation",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q9": {
      "grade": 10,
      "level": "easy",
      "basis": "Scaling rule for variance and standard deviation",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q10": {
      "grade": 10,
      "level": "medium",
      "basis": "Frequency-weighted mean, variance and standard deviation",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q1": {
      "grade": 10,
      "level": "easy",
      "basis": "Two-step periodic units-digit pattern with even exponents.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q2": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct factor of ten makes the units digit zero.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor common repeated-number multiplier and test coprimality.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q4": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct prime factorisation into powers of 2 and 3.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Multistage prime factorisation and matching four exponents.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Use HCF and LCM prime exponents and verify product identity.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Find a three-number LCM and bound a six-digit multiple.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Three-number prime-factor LCM, remainder verification, and distinguishing the textbook's positive-quotient convention from the zero-quotient literal minimum.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-2-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Prime-power LCM reasoning for the first ten natural numbers.",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q11": {
      "grade": 10,
      "level": "medium",
      "basis": "Seven-class weighted grouped-data standard deviation using midpoints",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q12": {
      "grade": 10,
      "level": "medium",
      "basis": "Inclusive grouped-diameter midpoints and weighted variance",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q13": {
      "grade": 10,
      "level": "medium",
      "basis": "Five-bin grouped race-time variance and square root",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q14": {
      "grade": 10,
      "level": "difficult",
      "basis": "Correct both first and second moments after two data-entry substitutions",
      "review": "implementation-audit"
    },
    "c10-8-ex8-1-q15": {
      "grade": 10,
      "level": "difficult",
      "basis": "Recover two observations from both sum and sum of squares",
      "review": "implementation-audit"
    },
    "c10-2-ex2-3-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.3 · Q5: Clock arithmetic; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-3-q6": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.3 · Q6: Count backwards on a clock; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-3-q7": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.3 · Q7: Days repeat every seven; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-3-q10": {"grade":10,"level":"medium","basis":"Grade 10 Chapter 2, Exercise 2.3 · Q10: International time offset; 2-step original solution and multi-step application.","review":"implementation-audit"},
    "c10-2-ex2-4-q1": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.4 · Q1: Next terms of three sequences; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q1-i": {"grade":10,"level":"medium","basis":"Variable-expression AP test with a general constant-difference argument","review":"implementation-audit"},
    "c10-2-ex2-5-q1-v": {"grade":10,"level":"easy","basis":"Compare two consecutive differences of an alternating sequence","review":"implementation-audit"},
    "c10-2-ex2-5-q2-iii": {"grade":10,"level":"easy","basis":"Add a common fractional difference to construct an arithmetic progression","review":"implementation-audit"},
    "c10-2-ex2-5-q3-i": {"grade":10,"level":"medium","basis":"Find first and second terms from a linear nth-term rule","review":"implementation-audit"},
    "c10-2-ex2-5-q3-ii": {"grade":10,"level":"medium","basis":"Identify negative difference from linear nth-term rule","review":"implementation-audit"},
    "c10-2-ex2-5-q8": {"grade":10,"level":"medium","basis":"Form and solve the middle-term equation and verify the result","review":"implementation-audit"},
    "c10-2-ex2-5-q4": {"grade":10,"level":"medium","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q4: Find the 19th A.P. term; 2-step original solution and multi-step application.","review":"implementation-audit"},
    "c10-2-ex2-5-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q5: Identify the term number; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q6": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q6: The two middle terms; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q7": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q7: Find and explain the reason; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-5-q9": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q9: Five terms in an A.P.; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q10": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q10: The last theatre row; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q11": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q11: Three A.P. terms from sum and product; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-5-q12": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q12: Ratio of A.P. terms; 2-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-5-q13": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q13: Five days of A.P. temperatures; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-5-q14": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q14: Salary minus expenses; 2-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-6-q1": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q1: Sum of two arithmetic series; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-6-q2": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q2: How many odd terms sum to 480?; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-6-q5": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q5: Sum from two given A.P. terms; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-6-q6": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q6: Sum of odd numbers below 450; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-6-q7": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q7: Find and explain the reason; 4-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-6-q8": {"grade":10,"level":"medium","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q8: Laptop instalments as an A.P.; 3-step original solution and multi-step application.","review":"implementation-audit"},
    "c10-2-ex2-6-q9": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q9: Pay off a loan with increasing instalments; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-6-q10": {"grade":10,"level":"medium","basis":"Grade 10 Chapter 2, Exercise 2.6 · Q10: Bricks in a staircase; 2-step original solution and multi-step application.","review":"implementation-audit"},
    "c10-2-ex2-7-q2": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q2: Write G.P. terms from a and r; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q3": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q3: Seventh G.P. term; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q4": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q4: Three consecutive G.P. terms; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-7-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q5: Number of terms in a G.P.; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q6": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q6: Use two G.P. terms to find a third; 2-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-7-q7": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q7: Tenth term from eighth term; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q8": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q8: Find and explain the reason; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-7-q11": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q11: Compare two annual-growth salary offers; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-8-q2": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.8 · Q2: First six terms of a G.P. sum; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-8-q3": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.8 · Q3: Find a missing first G.P. term; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-8-q4": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.8 · Q4: Sum two infinite G.P. series; 3-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-8-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.8 · Q5: Ratio from infinite G.P. sum; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-8-q7": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.8 · Q7: Sum a geometric series with known last term; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-9-q2": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.9 · Q2: Convert a natural-number sum into cubes; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-9-q3": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.9 · Q3: Natural-number sum from a cube sum; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-9-q4": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.9 · Q4: Number of terms in a cube sum; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-9-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.9 · Q5: Recognise a triangular-number square; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-9-q6": {"grade":10,"level":"difficult","basis":"Grade 10 Chapter 2, Exercise 2.9 · Q6: Area of square papers; 2-step original solution and nonroutine linked reasoning.","review":"implementation-audit"},
    "c10-2-ex2-10-q1": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q1: Euclid remainder rule; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q2": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q2: Cube remainders modulo 9; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q3": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q3: Express an HCF as a difference; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q4": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q4: Count prime exponents; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q5": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q5: LCM of 1 through 10; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q7": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q7: A recursive sequence; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q8": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q8: Which number belongs to the A.P.?; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q9": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q9: An A.P. identity from two terms; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q10": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q10: Odd-length A.P. sum; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q11": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q11: How many terms sum to 120?; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q12": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q12: Find and explain the reason; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-10-q14": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.10 · Q14: Every sixth term of an A.P.; 2-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q1-ii": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q1(ii): Not every decreasing sequence is an A.P.; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q1-iii": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q1(iii): Recognise a constant difference; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q1-iv": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q1(iv): Fractional arithmetic progression; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q2-i": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q2(i): Build an A.P. from its first term; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-5-q2-ii": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.5 · Q2(ii): Decreasing arithmetic progression; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q1-i": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q1(i): Recognise a doubling or tripling pattern; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q1-ii": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q1(ii): Repeated digits do not guarantee a common ratio; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q1-iii": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q1(iii): Decimal G.P. decreasing by a tenth; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q1-iv": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q1(iv): Halving a fraction at each step; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-7-q1-vi": {"grade":10,"level":"easy","basis":"Grade 10 Chapter 2, Exercise 2.7 · Q1(vi): Test every visible ratio, not just the first two; 3-step original solution and direct pattern/formula work.","review":"implementation-audit"},
    "c10-2-ex2-3-q1-i": {"grade":10,"level":"easy","basis":"Compute the remainder of 71 modulo 8 and read least positive representative","review":"implementation-audit"},
    "c10-2-ex2-3-q1-ii": {"grade":10,"level":"medium","basis":"Distinguish zero remainder from least positive solution after simplifying congruence","review":"implementation-audit"},
    "c10-2-ex2-3-q1-iii": {"grade":10,"level":"medium","basis":"Solve an additive congruence with a negative intermediate residue","review":"implementation-audit"},
    "c10-2-ex2-3-q1-iv": {"grade":10,"level":"difficult","basis":"Interpret the x/7 fraction as an integer inside a modular expression","review":"implementation-audit"},
    "c10-2-ex2-3-q1-v": {"grade":10,"level":"medium","basis":"Use 5 congruent to negative one modulo 6 to reverse multiplication","review":"implementation-audit"},
    "c10-2-ex2-3-q2": {"grade":10,"level":"medium","basis":"Transfer a given congruence through an affine expression and reduce the remainder","review":"implementation-audit"},
    "c10-2-ex2-3-q3": {"grade":10,"level":"medium","basis":"Express all integer solutions of 5x congruent 4 modulo 6","review":"implementation-audit"},
    "c10-2-ex2-3-q4": {"grade":10,"level":"difficult","basis":"Find a modular multiplicative inverse rather than divide as ordinary arithmetic","review":"implementation-audit"},
    "c10-2-ex2-3-q8": {"grade":10,"level":"difficult","basis":"Prove a congruence for every positive integer power using equal residues","review":"implementation-audit"},
    "c10-2-ex2-3-q9": {"grade":10,"level":"medium","basis":"Use periodic powers of two to compute the huge 81st exponent modulo 17","review":"implementation-audit"},
    "c10-2-ex2-4-q2-i": {"grade":10,"level":"easy","basis":"Straight substitution into a cubic nth-term rule","review":"implementation-audit"},
    "c10-2-ex2-4-q2-ii": {"grade":10,"level":"medium","basis":"Alternating-sign exponent before nth-term multiplication","review":"implementation-audit"},
    "c10-2-ex2-4-q2-iii": {"grade":10,"level":"easy","basis":"Square, multiply then subtract in a given nth-term formula","review":"implementation-audit"},
    "c10-2-ex2-4-q3-i": {"grade":10,"level":"medium","basis":"Infer the square-plus-one pattern from consecutive terms","review":"implementation-audit"},
    "c10-2-ex2-4-q3-ii": {"grade":10,"level":"medium","basis":"Recognise numerator n minus one and denominator n, including first zero term","review":"implementation-audit"},
    "c10-2-ex2-4-q3-iii": {"grade":10,"level":"easy","basis":"Generalize a constant-difference arithmetic sequence","review":"implementation-audit"},
    "c10-2-ex2-4-q4-i": {"grade":10,"level":"easy","basis":"Evaluate and simplify a rational formula at two indices","review":"implementation-audit"},
    "c10-2-ex2-4-q4-ii": {"grade":10,"level":"easy","basis":"Apply the outer minus sign after evaluating the bracket","review":"implementation-audit"},
    "c10-2-ex2-4-q5": {"grade":10,"level":"difficult","basis":"Select even versus odd branch before substituting in piecewise nth term","review":"implementation-audit"},
    "c10-2-ex2-4-q6": {"grade":10,"level":"medium","basis":"Use two previous terms in the correct recurrence order","review":"implementation-audit"},
    "g9-ch1-ex1.2-q5-iii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q5(iii): List positive factors of 24 and multiples of 3 below 30, then test whether their intersection is nonempty.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q6-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q6(i): Identify the four-equal-sided shapes (square and rhombus) from a 5-element parent set S.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q6-ii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q6(ii): Select the circle as the only shape defined by a radius in the given parent set S.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q6-iii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q6(iii): Use the 180-degree interior-angle sum property to select the triangle from S.","review":"implementation-audit"},
    "g9-ch1-ex1.2-q6-iv": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 1, Exercise 1.2 · Q6(iv): Recognise that no shape in S has 5 sides and write the subset as the empty set ∅.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q3-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q3(i): Identify the highest power of y in 1 − √2 y² + y⁷.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q3-ii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q3(ii): Divide each term in (x³ − x⁴ + 6x⁶)/x² for x ≠ 0 before finding the degree.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q3-iii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q3(iii): Expand x³(x² + x) by adding exponents and read the highest power.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q3-iv": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q3(iv): Identify the greatest exponent in 3x⁴ + 9x² + 27x⁶.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q3-v": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q3(v): Distinguish radical/fractional coefficients from variable exponents to read degree 4.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q4-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q4(i): Arrange polynomial terms in descending and ascending powers of x.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q4-ii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q4(ii): Arrange polynomial terms with fractional and radical coefficients in standard order.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q4-iii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q4(iii): Verify descending order and reverse terms for ascending standard form.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q4-iv": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q4(iv): Order a 5-term degree-4 polynomial in y in descending and ascending powers.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q5-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q5(i): Add two polynomials by combining like powers and state the degree of the sum.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q5-ii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q5(ii): Align and add cubic and quadratic polynomials and read degree 3.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q5-iii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q5(iii): Add degree-4 and degree-3 polynomials with distinct variable powers and constant terms.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q6-i": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q6(i): Distribute subtraction across q(x), cancel linear terms, and state the resulting degree.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q6-ii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q6(ii): Subtract a cubic polynomial from a quadratic polynomial and order in descending powers of y.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q6-iii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q6(iii): Subtract a quadratic polynomial in z from a degree-5 polynomial and combine linear terms.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q7": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q7: Subtract the starting cubic polynomial from the target cubic polynomial to find the missing addend.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q8": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q8: Solve A(x) − P(x) = B(x) by subtracting the target polynomial from the degree-4 starting polynomial.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q9-i": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q9(i): Multiply a quadratic binomial by a quadratic trinomial, collect like x² terms, and find the degree.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q9-ii": {"grade":9,"level":"easy","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q9(ii): Multiply two linear binomials using the distributive law and state the degree.","review":"implementation-audit"},
    "g9-ch3-ex3.1-q9-iii": {"grade":9,"level":"medium","basis":"Grade 9 Chapter 3, Exercise 3.1 · Q9(iii): Multiply a quadratic trinomial by a linear binomial, combine like terms, and state degree 3.","review":"implementation-audit"},
    "c10-2-ex2-6-q1-iii": {"grade":10,"level":"easy","basis":"Find the number of terms from the last term and apply the A.P. sum formula","review":"implementation-audit"},
    "c10-2-ex2-6-q3": {"grade":10,"level":"easy","basis":"Evaluate first and 28th terms from linear nth-term formula and sum the A.P.","review":"implementation-audit"},
    "c10-2-ex2-6-q4": {"grade":10,"level":"medium","basis":"Recover t_n = S_n - S_{n-1} from quadratic partial sum and prove constant difference","review":"implementation-audit"},
    "c10-2-ex2-6-q11": {"grade":10,"level":"difficult","basis":"Generalize n-term sum across m arithmetic progressions and sum over k = 1..m","review":"implementation-audit"},
    "c10-2-ex2-6-q12": {"grade":10,"level":"medium","basis":"Sum 12 fractional algebraic terms with common denominator a + b in A.P.","review":"implementation-audit"},
    "c10-2-ex2-8-q1-i": {"grade":10,"level":"medium","basis":"Find the n-term sum of an alternating G.P. with negative fractional ratio r = -3/5","review":"implementation-audit"},
    "c10-2-ex2-8-q1-ii": {"grade":10,"level":"easy","basis":"Find the n-term sum of a decreasing G.P. with ratio r = 1/4","review":"implementation-audit"},
    "c10-2-ex2-8-q6-i": {"grade":10,"level":"medium","basis":"Rewrite repeating decimal series 0.4 + 0.44 + ... using 4/9 and powers of 1/10","review":"implementation-audit"},
    "c10-2-ex2-8-q6-ii": {"grade":10,"level":"medium","basis":"Rewrite repunit series 3 + 33 + 333 + ... using powers of 10 minus 1","review":"implementation-audit"},
    "c10-2-ex2-8-q8": {"grade":10,"level":"medium","basis":"Sum 8 sets of geometric chain letters and multiply by unit postage cost","review":"implementation-audit"},
    "c10-2-ex2-8-q9": {"grade":10,"level":"easy","basis":"Convert a 3-digit repeating decimal into a rational fraction using infinite G.P. sum","review":"implementation-audit"},
    "c10-2-ex2-8-q10": {"grade":10,"level":"difficult","basis":"Multiply homogeneous polynomial terms by (x - y) and sum two resulting geometric series","review":"implementation-audit"},
    "c10-2-ex2-9-q1-i": {"grade":10,"level":"easy","basis":"Sum the first 60 natural numbers using n(n + 1)/2","review":"implementation-audit"},
    "c10-2-ex2-9-q1-ii": {"grade":10,"level":"easy","basis":"Factor out 3 and sum the first 32 natural numbers","review":"implementation-audit"},
    "c10-2-ex2-9-q1-iii": {"grade":10,"level":"easy","basis":"Subtract the sum of 1..50 from the sum of 1..92","review":"implementation-audit"},
    "c10-2-ex2-9-q1-iv": {"grade":10,"level":"easy","basis":"Recognise perfect squares 1^2..15^2 and apply n(n + 1)(2n + 1)/6","review":"implementation-audit"},
    "c10-2-ex2-9-q1-v": {"grade":10,"level":"medium","basis":"Subtract the sum of squares 1^2..5^2 from the sum of squares 1^2..21^2","review":"implementation-audit"},
    "c10-2-ex2-9-q1-vi": {"grade":10,"level":"medium","basis":"Subtract the sum of cubes 1^3..9^3 from the sum of cubes 1^3..20^3","review":"implementation-audit"},
    "c10-2-ex2-9-q1-vii": {"grade":10,"level":"easy","basis":"Find the number of odd terms up to 71 and apply n^2","review":"implementation-audit"},
    "c10-2-ex2-9-q7-i": {"grade":10,"level":"difficult","basis":"Expand the kth difference of cubes (2k)^3 - (2k - 1)^3 = 12k^2 - 6k + 1 and sum over k = 1..n","review":"implementation-audit"},
    "c10-2-ex2-9-q7-ii": {"grade":10,"level":"medium","basis":"Evaluate the n-term special-series formula 4n^3 + 3n^2 at n = 8","review":"implementation-audit"},
    "c10-2-ex2-7-q1-v": {"grade":10,"level":"easy","basis":"Check consecutive ratios of an alternating-sign geometric sequence with r = -5","review":"implementation-audit"},
    "c10-2-ex2-7-q1-vii": {"grade":10,"level":"easy","basis":"Check consecutive ratios of a decreasing geometric sequence with r = 1/4","review":"implementation-audit"},
    "c10-2-ex2-7-q2-ii": {"grade":10,"level":"easy","basis":"Write first three G.P. terms when a = sqrt(2) and r = sqrt(2)","review":"implementation-audit"},
    "c10-2-ex2-7-q9": {"grade":10,"level":"difficult","basis":"Use symmetric G.P. representation a/r, a, ar and solve quadratic for common ratio","review":"implementation-audit"},
    "c10-2-ex2-7-q10": {"grade":10,"level":"medium","basis":"Model 5% annual salary increments over 5 years using compound G.P. factor 1.05^5","review":"implementation-audit"},
    "c10-2-ex2-7-q12": {"grade":10,"level":"difficult","basis":"Combine A.P. exponent differences with G.P. middle-term property y^2 = xz","review":"implementation-audit"},
    "g9-ch3-ex3.2-q1-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Substitute a given integer and evaluate using order of operations.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q1-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Substitute a given integer and evaluate using order of operations.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q1-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Substitute a given integer and evaluate using order of operations.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q2": {
      "grade": 9,
      "level": "medium",
      "basis": "Combines substitution and simplification of a product with radicals.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Set a linear polynomial to zero and isolate the input.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Set a linear polynomial to zero and isolate the input.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Set a linear polynomial to zero and isolate the input.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-iv": {
      "grade": 9,
      "level": "easy",
      "basis": "Set a linear polynomial to zero and isolate the input.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-v": {
      "grade": 9,
      "level": "easy",
      "basis": "Set a linear polynomial to zero and isolate the input.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q3-vi": {
      "grade": 9,
      "level": "medium",
      "basis": "Isolate the variable using a symbolic nonzero coefficient.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q5-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Test the proposed input by substitution and compare the output with zero.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q5-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Test the proposed input by substitution and compare the output with zero.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q5-iii": {
      "grade": 9,
      "level": "medium",
      "basis": "Verify a symbolic substitution and state its domain.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q5-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Check two inputs and identify the zero factor in each product.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q6-i": {
      "grade": 9,
      "level": "easy",
      "basis": "Identify the horizontal-axis intersections in the given figure.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q6-ii": {
      "grade": 9,
      "level": "easy",
      "basis": "Identify the horizontal-axis intersections in the given figure.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q6-iii": {
      "grade": 9,
      "level": "easy",
      "basis": "Identify the horizontal-axis intersections in the given figure.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q6-iv": {
      "grade": 9,
      "level": "medium",
      "basis": "Identify the horizontal-axis intersections in the given figure.",
      "review": "implementation-audit"
    },
    "g9-ch3-ex3.2-q6-v": {
      "grade": 9,
      "level": "medium",
      "basis": "Identify the horizontal-axis intersections in the given figure.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-10-q6": {
      "grade": 10,
      "level": "easy",
      "basis": "Compute 7⁴ = 2401 ≡ 1 (mod 100) and raise to power k.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-10-q13": {
      "grade": 10,
      "level": "easy",
      "basis": "Identify the common ratio r = 2/3 of the G.P. and multiply the fourth term.",
      "review": "implementation-audit"
    },
    "c10-2-ex2-10-q15": {
      "grade": 10,
      "level": "easy",
      "basis": "Apply the sum of first n cubes and first n natural numbers for n = 15 and subtract.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q1": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor n² − n = n(n − 1) and prove divisibility by 2 across even and odd cases.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Compute HCF(175, 105) = 35 litres using Euclid's division algorithm.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q2-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Divide 175 litres of cow's milk by the 35-litre can capacity.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q2-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Divide 105 litres of buffalo's milk by the 35-litre can capacity.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Combine given remainders modulo 13 into a + 2b + 3c and reduce 53 modulo 13.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q4": {
      "grade": 10,
      "level": "easy",
      "basis": "Apply Euclid's division lemma to express 107 as 4(26) + 3.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Express the first term a in terms of m, n, d from t_{m+1} = 2t_{n+1} and prove t_{3m+1} = 2t_{m+n+1}.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q6": {
      "grade": 10,
      "level": "easy",
      "basis": "Use l − (k − 1)d to find the 12th term from the end of a finite A.P.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Compare nth-term expressions of two A.P.s sharing a common difference d.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q8": {
      "grade": 10,
      "level": "medium",
      "basis": "Model 10-year increasing savings as an A.P. sum and solve for the first term a.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Determine r and a from the ratio of the 6th and 2nd G.P. terms with radicals.",
      "review": "implementation-audit"
    },
    "c10-2-unit-q10": {
      "grade": 10,
      "level": "medium",
      "basis": "Compute 3-year compound depreciation at 15% per year from ₹45,000.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Eliminate variables in a 3-variable linear system to reach the identity 0 = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Rewrite equations in standard form and eliminate to expose an inconsistent contradiction.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q2-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Convert a chain of equal ratios with x + y + z = 27 into a unique 3-variable solution.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q3": {
      "grade": 10,
      "level": "difficult",
      "basis": "Translate a 3-generation age problem with fractional sums into a 3-variable linear system.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q4": {
      "grade": 10,
      "level": "difficult",
      "basis": "Formulate place-value digit-reversal equations in three variables and solve for the three-digit number.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-1-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Model currency counts and interchanged denominations as a 3-variable linear system.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q1-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Use Euclid's division algorithm for polynomials to find the GCD of degree-4 and degree-3 polynomials.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Perform polynomial long division on degree-4 polynomials and factor out numerical constants to find the GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q1-iii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Extract common monomial factors 3x and 6x first, then apply polynomial long division to find the full GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Find the numerical GCD of 3 and 6 alongside polynomial long division for degree-3 polynomials.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Compute the LCM of two monomials by taking the numerical LCM and highest powers of each variable.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor out −12 from −12(a² − b²) and apply the difference of squares identity to find the LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor out common monomial factors and use x² − 16 = (x − 4)(x + 4) to find the LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor a quadratic trinomial and a difference of cubes p³ − 27 to determine the polynomial LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-v": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor three quadratic trinomials with leading coefficients 2, 3, and 6 to find their LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-2-q2-vi": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor homogeneous two-variable polynomials using a perfect square and difference of cubes to find the LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q1-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor three homogeneous cubic polynomials in x and y and verify f(x) × g(x) = LCM × GCD for pairs.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor sum of cubes x³ + y³ and x⁴ + x²y² + y⁴ and verify the product identity f(x) × g(x) = LCM × GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor out common monomials and verify the product relation f(x) × g(x) = LCM × GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor two polynomials and divide their product by the given GCD (a − 2) to find the LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor a difference/sum of cubes with a monomial factor and divide by the given GCD to find the LCM.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q3-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor cubic polynomials and divide their product by the given LCM to find the GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q3-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor degree-4 polynomials using sum and difference of cubes and divide by the LCM to find the GCD.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q4-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor f(x), LCM, and GCD by grouping and use g(x) = (LCM × GCD) / f(x) to find the missing polynomial.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-3-q4-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Use f(x) = (LCM × GCD) / g(x) with cubic and quadratic factors to determine the unknown polynomial f(x).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor difference of squares and a common factor to reduce a rational expression to lowest form.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor numerator and denominator quadratics and cancel the common binomial factor (x − 5).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor out 9 in the numerator and factor the denominator quadratic to cancel (x + 2).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor a cubic polynomial by grouping and cancel common linear factors with a difference of cubes.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Set the denominator 8y = 0 to determine the excluded value of a rational expression.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q2-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor the quadratic denominator p² + 6p + 8 = 0 to find the two excluded values.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q2-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Solve x² − 25 = 0 to identify the excluded values where the denominator vanishes.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-4-q2-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor the cubic denominator x³ + x² − 6x = x(x + 3)(x − 2) to find all three excluded values.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Cancel common numerical coefficients and variable powers when multiplying rational expressions.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor a difference of fourth powers p⁴ − 16 and quadratic trinomials to multiply rational expressions.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor out common monomial factors in two variables and cancel shared binomials.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor quadratic trinomials and a difference of squares to multiply two rational expressions.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q2-ii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Factor a sum and difference of cubes along with homogeneous quadratics in x and y to simplify the product.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q3-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Invert the divisor fraction and factor quadratic, square, and difference-of-cubes expressions.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q3-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Multiply by the reciprocal and cancel common binomial factors after factoring quadratics.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q3-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Factor two quadratic trinomials and divide the rational expressions by multiplying by the reciprocal.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q3-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor leading-coefficient quadratics and a sum of cubes to simplify rational division.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Evaluate x² + y² by factoring rational expressions for x and y first and using (x − y)² + 2xy.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-5-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Substitute P(x) and Q(x) into [P² − Q²] / [P² + Q²] and simplify via difference of squares.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Rewrite x − 2 as −(2 − x) to combine rational expressions over a common denominator.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Use x − 3 = −(3 − x) to combine fractions and simplify using the difference of squares.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Subtract numerators over the common denominator x − y and factor the difference of cubes.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Combine fractions over (x + 1)(x − 2) and cancel the common factor after simplifying the numerator.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q2-ii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Combine two rational expressions in x and y over (x + y)(x − y) and factor the degree-3 numerator by grouping.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Recognize x² + 2 = (x² + 1) + 1 to split and cancel terms when subtracting from a rational expression.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Solve for the subtracted rational expression Q(x) by factoring the quadratic denominator and simplifying.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Evaluate 1/A + 1/B − 2B/(A² − B²) by substituting the given rational expressions for A and B.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q6": {
      "grade": 10,
      "level": "difficult",
      "basis": "Prove (A + B)² + (A − B)² = 2(x² + 1)/(x² − 1) using the algebraic identity 2(A² + B²).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q7": {
      "grade": 10,
      "level": "medium",
      "basis": "Model combined work rates as 1/4 + 1/6, solve for total hours, and convert to hours and minutes.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-6-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Formulate and solve a rational equation for fruit prices per kg and compute the weight of each fruit bought.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Cancel monomial powers in numerator and denominator and take the square root with absolute value bars.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Recognize quadratic perfect squares with radical and fractional coefficients in numerator and denominator.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q1-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Combine repeated denominator binomial factors, cancel common powers, and apply square root exponent halving.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct application of (a + b)² identity to extract the square root with modulus bars.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Match a six-term quadratic to (a + b + c)² by determining the negative cross-term variable.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q2-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor three quadratic trinomials into paired linear factors before extracting the square root.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-7-q2-iv": {
      "grade": 10,
      "level": "difficult",
      "basis": "Clear rational coefficients from three quadratics, factor each integer polynomial, and extract the paired square root.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q1-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Standard polynomial long division for square root of a degree-4 polynomial.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Reorder polynomial terms in descending degree before applying polynomial square-root division.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Polynomial square-root division with missing odd-degree terms handled via zero placeholders.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Multi-step polynomial square-root division with larger coefficients and negative middle/constant terms.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Use division method on a degree-4 polynomial with unknown trailing coefficients and equate remainder to zero.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q2-ii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Rearrange polynomial in ascending order because unknowns sit on highest-degree terms before applying division.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q3-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Apply division method and match negative linear coefficient −mx with zero remainder.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-8-q3-ii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Determine unknown middle coefficients m and n in a perfect-square quartic via division method.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct substitution of sum and product of roots into x² − (sum)x + product = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Substitute fractional sum of roots and clear denominator to obtain integer coefficients.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Handle negative fractional sum and negative product in x² − (α + β)x + αβ = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Form a quadratic equation from symbolic algebraic expressions for sum and product of roots.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Read coefficients a, b, c directly and evaluate −b/a and c/a.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q2-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Recognize missing constant term c = 0 before computing −b/a and c/a.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q2-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Clear fractional denominators to write 3 + 1/a = 10/a² in standard quadratic form before finding sum and product.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-9-q2-iv": {
      "grade": 10,
      "level": "easy",
      "basis": "Identify negative coefficients b = −1, c = −4 and evaluate −b/a and c/a carefully.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Split the middle term of 4x² − 7x − 2 = 0 with a × c = −8 and factor by grouping.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Expand both sides of 3(p² − 6) = p(p + 5), rearrange with careful signs, and factor.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q1-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Square √(a(a − 7)) = 3√2, factor the quadratic, and verify both roots in the original radical equation.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Split the middle term of √2 x² + 7x + 5√2 = 0 and factor out irrational common factors cleanly.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q1-v": {
      "grade": 10,
      "level": "easy",
      "basis": "Clear the fraction 1/8 by multiplying by 8 and factor the repeated-root perfect square trinomial.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-10-q2": {
      "grade": 10,
      "level": "medium",
      "basis": "Solve G(n) = (n² − n)/2 = 15 for positive integer team count and reject the negative root.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Normalize leading coefficient 9 to 1 and complete the square for 9x² − 12x + 4 = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q1-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Clear denominator (x − 1) with x ≠ 1, reduce to standard form, and complete the square.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Substitute coefficients with b = −5 carefully into the quadratic formula.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Apply the quadratic formula with irrational coefficients √2 and 3√2 and simplify the radical quotient.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q2-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Handle −4ac with c = −23 inside the discriminant and simplify fractions.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q2-iv": {
      "grade": 10,
      "level": "difficult",
      "basis": "Solve a literal-coefficient quadratic equation cleanly via discriminant cancellation 144a² − 144a² + 144b².",
      "review": "implementation-audit"
    },
    "c10-3-ex3-11-q3": {
      "grade": 10,
      "level": "medium",
      "basis": "Convert decimals in t² − 0.75t = 11.25 to integers, apply the formula, and keep positive time t > 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q1": {
      "grade": 10,
      "level": "medium",
      "basis": "Translate reciprocal difference into x − 1/x = 24/5, clear denominators, and factor.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q2": {
      "grade": 10,
      "level": "medium",
      "basis": "Model uniform 2w border additions in (12 + 2w)(16 + 2w) = 285 and reject negative width.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q3": {
      "grade": 10,
      "level": "difficult",
      "basis": "Convert 30 minutes to 1/2 hour in a rational time-difference equation and reject negative speed.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Express ages five years hence as (x + 5)(2x + 5) = 375 and solve for positive present ages.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Use semicircle right angle, Pythagoras theorem x² + (x + 4)² = 20², and discriminant check for feasibility.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q6": {
      "grade": 10,
      "level": "difficult",
      "basis": "Translate √(2x²/2) + (8/9)(2x²) + 2 = 2x² and remember to report 2x² rather than x alone.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q7": {
      "grade": 10,
      "level": "difficult",
      "basis": "Form the sound-intensity distance ratio 4/9 = x²/(70 − x)² and verify position lies in (0, 70).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q8": {
      "grade": 10,
      "level": "difficult",
      "basis": "Model inner square (10 − 2w)², outer path cost ₹364, and reject w = 8 > 5.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-12-q9": {
      "grade": 10,
      "level": "medium",
      "basis": "Use perimeter 56 cm to express legs x and 31 − x, apply Pythagoras theorem, and select the smallest side.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct evaluation of discriminant Δ = b² − 4ac with integer coefficients.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Direct evaluation of discriminant Δ = b² − 4ac handling negative b and c signs.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q1-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Evaluate Δ = b² − 4ac with irrational radical coefficients √2 and 3√2.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Square −6√2 accurately inside Δ = b² − 4ac to verify Δ = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q1-v": {
      "grade": 10,
      "level": "medium",
      "basis": "Relabel quadratic coefficients A, B, C to avoid symbol collision and simplify literal Δ = B² − 4AC.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q2-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Set Δ = 0 to form a quadratic equation in k, factor, and check 5k − 6 ≠ 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Expand (6k + 2)² − 64k = 0, factor, and check k ≠ 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q3": {
      "grade": 10,
      "level": "difficult",
      "basis": "Prove b, a, c are in A.P. by expanding Δ = 0 and completing ((b + c) − 2a)² = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q4": {
      "grade": 10,
      "level": "difficult",
      "basis": "Show Δ = 36[(a + b)² + (a − b)²] > 0 using non-negativity of real squares and a − b ≠ 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-13-q5": {
      "grade": 10,
      "level": "difficult",
      "basis": "Expand literal discriminant, cancel b²c², and factor a(a³ + b³ + c³ − 3abc) = 0.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q1-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Combine fractions over 3αβ and apply α² + β² = (α + β)² − 2αβ.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q1-ii": {
      "grade": 10,
      "level": "easy",
      "basis": "Combine reciprocals over (αβ)² in terms of α + β and αβ.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q1-iii": {
      "grade": 10,
      "level": "easy",
      "basis": "Expand (3α − 1)(3β − 1) and factor −3 from −3α − 3β.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q1-iv": {
      "grade": 10,
      "level": "medium",
      "basis": "Combine fractions over αβ and rewrite α² + β² + 3(α + β) using α + β and αβ.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q2-i": {
      "grade": 10,
      "level": "easy",
      "basis": "Extract α + β and αβ from 2x² − 7x + 5 = 0 and evaluate (α + β)/(αβ).",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q2-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Express α/β + β/α via α + β and αβ and simplify the compound fraction.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q2-iii": {
      "grade": 10,
      "level": "difficult",
      "basis": "Expand both numerator and denominator of (α + 2)/(β + 2) + (β + 2)/(α + 2) in symmetric sums and reduce.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q3-i": {
      "grade": 10,
      "level": "medium",
      "basis": "Compute new sum α² + β² and product (αβ)² from x² + 6x − 4 = 0 to construct the quadratic equation.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q3-ii": {
      "grade": 10,
      "level": "medium",
      "basis": "Compute new sum 2/α + 2/β and product 4/(αβ) to construct the quadratic equation.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q3-iii": {
      "grade": 10,
      "level": "medium",
      "basis": "Factor α²β + β²α = αβ(α + β), compute (αβ)³, and construct the quadratic equation.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q4": {
      "grade": 10,
      "level": "medium",
      "basis": "Use (β − α)² = (α + β)² − 4αβ with α + β = −a/7 and αβ = 2/7 to solve a² = 225.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q5": {
      "grade": 10,
      "level": "medium",
      "basis": "Represent roots as α and 2α, solve 2α² = 32 for both signs ±4, and compute a = 6α.",
      "review": "implementation-audit"
    },
    "c10-3-ex3-14-q6": {
      "grade": 10,
      "level": "medium",
      "basis": "Represent real roots as α and α², obtain α = 3 from α³ = 27, and evaluate k = −3(α + α²).",
      "review": "implementation-audit"
    }
,
    "c10-4-ex4-3-q1": {"grade":10,"level":"easy","basis":"Use perpendicular east/north distances as legs of a right triangle and take their hypotenuse.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q2": {"grade":10,"level":"easy","basis":"Compare the sum of the two perpendicular street lengths with their direct Pythagorean diagonal.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q3": {"grade":10,"level":"medium","basis":"Calculate the direct pond crossing with the Pythagoras theorem and reconcile two-decimal textbook answer with nearest-metre wording.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q4": {"grade":10,"level":"medium","basis":"Use equal diagonals, a+b=17 and Pythagoras to solve rectangle length and breadth.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q5": {"grade":10,"level":"medium","basis":"Translate side-length relationships into a quadratic equation, factor it and reject the negative root.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q6": {"grade":10,"level":"medium","basis":"Solve two right triangles before and after shifting the ladder foot toward the wall.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q7": {"grade":10,"level":"difficult","basis":"Prove the altitude identity by applying Pythagoras to triangles PQS and PRS, then substitute QS=3 SR.","review":"2025-textbook-ex43-source-audit"},
    "c10-4-ex4-3-q8": {"grade":10,"level":"difficult","basis":"Prove the trisected-side identity by expressing three squared hypotenuses in terms of AB² and a common segment.","review":"2025-textbook-ex43-source-audit"},
    "c10-5-ex5-1-q1-i": {"grade":10,"level":"easy","basis":"Direct substitution of three given points into the coordinate triangle area formula.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q1-ii": {"grade":10,"level":"easy","basis":"Direct substitution of negative coordinate vertices into the triangle area formula.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q2-i": {"grade":10,"level":"easy","basis":"Check collinearity by verifying that the coordinate triangle area evaluates to zero.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q2-ii": {"grade":10,"level":"medium","basis":"Expand symbolic coordinate products and verify identical terms cancel to area zero.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q3-i": {"grade":10,"level":"easy","basis":"Equate the oriented triangle area expression to 20 and solve the resulting linear equation.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q3-ii": {"grade":10,"level":"medium","basis":"Evaluate the oriented area formula with (p,p) equal to 32 and solve for p.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q4-i": {"grade":10,"level":"easy","basis":"Set triangle area with unknown coordinate a to zero and solve the linear equation.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q4-ii": {"grade":10,"level":"difficult","basis":"Expand symbolic collinearity equation into a quadratic in a and factor to recover both roots.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q5-i": {"grade":10,"level":"medium","basis":"Plot vertices to establish counterclockwise boundary order, then apply the 4-vertex area formula.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q5-ii": {"grade":10,"level":"medium","basis":"Order four vertices counterclockwise from their coordinates and evaluate the quadrilateral area.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q6": {"grade":10,"level":"medium","basis":"Set the 4-vertex shoelace determinant for ordered vertices equal to 56 and solve for k.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q7": {"grade":10,"level":"medium","basis":"Derive 2a+b=3 from zero triangle area and solve simultaneously with a+b=1.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q8": {"grade":10,"level":"difficult","basis":"Recover triangle vertices from three midpoint equations, compute ΔABC and ΔPQR areas, and verify ratio 4.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q9": {"grade":10,"level":"medium","basis":"Compute outer and inner quadrilateral areas from figure coordinates and subtract.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q10": {"grade":10,"level":"easy","basis":"Find triangular glass area and divide by 6 sq. ft per bucket.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q11-i": {"grade":10,"level":"medium","basis":"Read polygon coordinates A, G, F from the figure and compute triangle area.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q11-ii": {"grade":10,"level":"medium","basis":"Read coordinates F, E, D from the figure and compute triangle area.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-1-q11-iii": {"grade":10,"level":"medium","basis":"Read coordinates B, C, E, G counterclockwise from the figure and compute quadrilateral area.","review":"2025-textbook-ex51-source-audit"},
    "c10-5-ex5-2-q1-i": {"grade":10,"level":"easy","basis":"Identify tan 90° is undefined for a vertical line.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q1-ii": {"grade":10,"level":"easy","basis":"Identify tan 0° = 0 for a horizontal line.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q2-i": {"grade":10,"level":"easy","basis":"Solve tan θ = 0 for θ in [0°, 180°).","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q2-ii": {"grade":10,"level":"easy","basis":"Solve tan θ = 1 for θ = 45°.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q3-i": {"grade":10,"level":"easy","basis":"Apply the two-point slope formula with the origin and rationalize.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q3-ii": {"grade":10,"level":"medium","basis":"Apply two-point slope formula to trigonometric coordinates and simplify to −cot θ.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q4": {"grade":10,"level":"medium","basis":"Find midpoint P, calculate slope AP, and take its negative reciprocal.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q5": {"grade":10,"level":"easy","basis":"Compare slopes of consecutive segments sharing a point.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q6": {"grade":10,"level":"easy","basis":"Equate slopes of collinear segments to solve for a.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q7": {"grade":10,"level":"easy","basis":"Set two-point slope formula equal to −1/2 and solve for a.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q8": {"grade":10,"level":"medium","basis":"Apply perpendicular slope condition m₁m₂ = −1 to solve for x.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q9-i": {"grade":10,"level":"medium","basis":"Check side slopes and confirm m(AB)m(AC) = −1.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q9-ii": {"grade":10,"level":"medium","basis":"Check side slopes and confirm m(MN)m(LN) = −1.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q10": {"grade":10,"level":"medium","basis":"Verify both opposite side pairs share equal slopes.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q11": {"grade":10,"level":"medium","basis":"Equate diagonal midpoints of parallelogram ABCD to solve x and y.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q12": {"grade":10,"level":"medium","basis":"Show one opposite side pair is parallel (slope 0) and the other pair has unequal slopes.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-2-q13": {"grade":10,"level":"difficult","basis":"Compute four side midpoints of a general quadrilateral and prove opposite midpoint sides share equal slopes.","review":"2025-textbook-ex52-source-audit"},
    "c10-5-ex5-3-q1-i": {"grade":10,"level":"easy","basis":"Compute midpoint y-coordinate and write horizontal line y = k.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q1-ii": {"grade":10,"level":"easy","basis":"Compute midpoint x-coordinate and write vertical line x = k.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q2": {"grade":10,"level":"easy","basis":"Rearrange 2(x − y) + 5 = 0 to y = mx + c and find arctan(m).","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q3": {"grade":10,"level":"easy","basis":"Use m = tan 30° and y = mx + c with c = −3.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q4": {"grade":10,"level":"medium","basis":"Isolate y and rationalize the irrational denominator (1 − √3).","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q5": {"grade":10,"level":"easy","basis":"Find slope between two points and apply m1·m2 = −1.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q6": {"grade":10,"level":"easy","basis":"Use inclination 45° for slope 1 and apply point-slope form at (19, 3).","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q7-i": {"grade":10,"level":"medium","basis":"Apply two-point line formula with fractional coordinates and clear denominators.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q7-ii": {"grade":10,"level":"easy","basis":"Apply two-point line formula with integer coordinates.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q8": {"grade":10,"level":"easy","basis":"Recognize shortest path as the straight line between (−6, −4) and (5, 11).","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q9-i": {"grade":10,"level":"medium","basis":"Find midpoint D of BC then find line equation AD.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q9-ii": {"grade":10,"level":"medium","basis":"Find slope of BC, take negative reciprocal for altitude through A.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q10": {"grade":10,"level":"easy","basis":"Direct point-slope form with slope −5/4 through (−1, 2).","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q11-i": {"grade":10,"level":"easy","basis":"Evaluate remaining decimal MB at x = 0.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q11-ii": {"grade":10,"level":"medium","basis":"Set remaining fraction y = 0.25 (after 75% downloaded) and solve for x.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q11-iii": {"grade":10,"level":"easy","basis":"Set remaining fraction y = 0 and solve for x.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q12-i": {"grade":10,"level":"easy","basis":"Substitute integer intercepts a = 4, b = −6 into x/a + y/b = 1.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q12-ii": {"grade":10,"level":"medium","basis":"Substitute fractional y-intercept 3/4 into x/a + y/b = 1 and simplify.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q13-i": {"grade":10,"level":"easy","basis":"Divide 3x − 2y = 6 by 6 to read x/a + y/b = 1.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q13-ii": {"grade":10,"level":"easy","basis":"Divide 4x + 3y = −12 by −12 to read intercepts.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q14-i": {"grade":10,"level":"medium","basis":"Parameterize intercepts 2k and 5k, substitute (1, −4) to find k.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-3-q14-ii": {"grade":10,"level":"easy","basis":"Set a = b in x/a + y/a = 1 and substitute (−8, 4) to get x + y = −4.","review":"2025-textbook-ex53-source-audit"},
    "c10-5-ex5-4-q1-i": {"grade":10,"level":"easy","basis":"Recognize missing x-term means a = 0 and slope is 0.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q1-ii": {"grade":10,"level":"easy","basis":"Recognize missing y-term gives vertical line with undefined slope.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q2-i": {"grade":10,"level":"easy","basis":"Read coefficient of x from y = 0.7x − 11 directly.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q2-ii": {"grade":10,"level":"easy","basis":"Perpendicular to vertical line x = −11 is horizontal with slope 0.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q3-i": {"grade":10,"level":"medium","basis":"Compute m = −a/b for fractional coefficients and verify m1 = m2 = −4/3.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q3-ii": {"grade":10,"level":"easy","basis":"Check m1·m2 = (−5/23)(23/5) = −1 for perpendicularity.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q4": {"grade":10,"level":"easy","basis":"Set m1·m2 = −1 to solve linear equation for p.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q5": {"grade":10,"level":"easy","basis":"Find slope QR then apply point-slope form at P(−5, 2).","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q6": {"grade":10,"level":"medium","basis":"Find segment slope, take negative reciprocal, then apply point-slope form.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q7": {"grade":10,"level":"difficult","basis":"Compute two opposite-side slopes, negative reciprocals, and point-slope equations for altitudes from A and B.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q8": {"grade":10,"level":"medium","basis":"Combine midpoint of AB and negative reciprocal slope of AB.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q9": {"grade":10,"level":"medium","basis":"Solve 2×2 intersection (1, 1) and keep parallel line form 13x + 5y + k = 0.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q10": {"grade":10,"level":"difficult","basis":"Solve fractional intersection (16/7, 11/7) and substitute into perpendicular form 7x + 4y + k = 0.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q11": {"grade":10,"level":"difficult","basis":"Solve two separate intersections including fractions and apply two-point line formula.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-4-q12": {"grade":10,"level":"difficult","basis":"Find intersection (9/4, 0), midpoint (−1, 1), and two-point line equation.","review":"2025-textbook-ex54-source-audit"},
    "c10-5-ex5-5-q1": {"grade":10,"level":"easy","basis":"Use base 10 along X-axis and height 5 to find area 25 sq.units.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q2": {"grade":10,"level":"easy","basis":"Recognize constant distance 10 from Y-axis is vertical line x = 10.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q3": {"grade":10,"level":"easy","basis":"Identify x = 11 as parallel to Y-axis.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q4": {"grade":10,"level":"easy","basis":"Equate slopes between collinear points to solve p = 9.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q5": {"grade":10,"level":"easy","basis":"Add linear equations to get (3, 5).","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q6": {"grade":10,"level":"easy","basis":"Plug slope 1/8 into slope formula for (12, 3) and (4, a).","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q7": {"grade":10,"level":"easy","basis":"Compute slope −1 and negative reciprocal 1.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q8": {"grade":10,"level":"easy","basis":"Negative reciprocal of 1/√3 is −√3.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q9": {"grade":10,"level":"easy","basis":"Plug intercepts a = 5, b = 8 into intercept form.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q10": {"grade":10,"level":"easy","basis":"Perpendicular to 7x − 3y + 4 = 0 through origin gives 3x + 7y = 0.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q11": {"grade":10,"level":"medium","basis":"Compute slopes of four lines and check m2·m4 = −1.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q12": {"grade":10,"level":"easy","basis":"Divide 8y = 4x + 21 by 8 to match slope 0.5 and intercept 2.6.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q13": {"grade":10,"level":"easy","basis":"Recall definition of trapezium (two parallel and two non-parallel sides).","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q14": {"grade":10,"level":"easy","basis":"Recall parallelogram slope criterion needs both pairs of opposite sides.","review":"2025-textbook-ex55-source-audit"},
    "c10-5-ex5-5-q15": {"grade":10,"level":"easy","basis":"Substitute (2, 1) into candidate pairs to identify (B).","review":"2025-textbook-ex55-source-audit"},
    "c10-5-unit-q1": {"grade":10,"level":"medium","basis":"Compute four side midpoints of PQRS, compare side lengths and slopes/diagonals.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q2": {"grade":10,"level":"difficult","basis":"Use triangle area 5 with constraint y = x + 3 to solve (7/2, 13/2).","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q3": {"grade":10,"level":"medium","basis":"Show all three lines are concurrent at (1, −1) so enclosed area is 0.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q4": {"grade":10,"level":"medium","basis":"Apply quadrilateral shoelace area 72 to solve linear equation for k.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q5": {"grade":10,"level":"easy","basis":"Verify both opposite pairs have equal slopes without distance formula.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q6": {"grade":10,"level":"medium","basis":"Solve a + b = 1 and ab = −6 for intercept pairs {3, −2} to write two lines.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q7": {"grade":10,"level":"medium","basis":"Build linear price-demand equation from (14, 980) and (16, 1220) to predict at ₹17.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q8": {"grade":10,"level":"difficult","basis":"Find perpendicular foot M(1, 2) on x + 3y = 7 and double via midpoint to get (−1, −4).","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q9": {"grade":10,"level":"medium","basis":"Find intersection (1/13, 5/13) and impose equal intercepts x + y = a.","review":"2025-textbook-unit5-source-audit"},
    "c10-5-unit-q10": {"grade":10,"level":"difficult","basis":"Find intersection (−1/17, 22/17) and perpendicular path 7x + 6y + k = 0 to target line.","review":"2025-textbook-unit5-source-audit"},
    "c10-6-ex6-1-q1-i": {"grade":10,"level":"easy","basis":"Convert cot θ and tan θ to sin θ and cos θ and apply sin²θ + cos²θ = 1.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q1-ii": {"grade":10,"level":"easy","basis":"Factor tan²θ and substitute 1 + tan²θ = sec²θ twice.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q2-ii": {"grade":10,"level":"easy","basis":"Multiply by conjugate (1 − sin θ) and simplify using cos²θ = 1 − sin²θ.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q3-i": {"grade":10,"level":"medium","basis":"Rationalise inside the radical by (1 + sin θ) to extract (1 + sin θ)/cos θ.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q3-ii": {"grade":10,"level":"medium","basis":"Rationalise both conjugate radicals over cos θ so ±tan θ terms cancel.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q4-i": {"grade":10,"level":"medium","basis":"Cube sec²θ − tan²θ = 1 and simplify the middle factor.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q4-ii": {"grade":10,"level":"medium","basis":"Expand both squares, group sin²θ + cos²θ = 1, and recognise 2 sec θ cosec θ.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q5-i": {"grade":10,"level":"medium","basis":"Factor 1 − sin⁴θ = cos²θ(1 + sin²θ) and combine with −2 tan²θ.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q5-ii": {"grade":10,"level":"easy","basis":"Factor common cos θ from numerator and denominator of (cot θ ∓ cos θ).","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q6-i": {"grade":10,"level":"medium","basis":"Cross-multiply fractions using (a − b)(a + b) = a² − b² to get 1 − 1 = 0.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q6-ii": {"grade":10,"level":"medium","basis":"Factor sin³A ± cos³A via sum and difference of cubes and cancel denominators.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q7-i": {"grade":10,"level":"medium","basis":"Square sin θ + cos θ = √3 to obtain sin θ cos θ = 1 and substitute into tan θ + cot θ.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q7-ii": {"grade":10,"level":"medium","basis":"Solve tan θ = 1/√3 giving θ = 30° and show both sides are not defined at 3θ = 90°.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q8-i": {"grade":10,"level":"medium","basis":"Substitute m and n in (m² + n²)cos²β and apply sin²β + cos²β = 1.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q8-ii": {"grade":10,"level":"difficult","basis":"Simplify x = sec θ cosec θ and y = sin²θ/cos θ so (x²y)^(2/3) − (xy²)^(2/3) = sec²θ − tan²θ = 1.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q9-i": {"grade":10,"level":"medium","basis":"Express p² − 1 = 2 sin θ cos θ and q = p/(sin θ cos θ) to obtain q(p² − 1) = 2p.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q9-ii": {"grade":10,"level":"difficult","basis":"Convert sin²θ to 1 − cos²θ, square both sides, and expand to the degree-6 cosine polynomial.","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-1-q10": {"grade":10,"level":"medium","basis":"Write a² = (1 + sin θ)/(1 − sin θ) from a = (1 + sin θ)/cos θ and simplify (a² − 1)/(a² + 1).","review":"2025-textbook-ex61-source-audit"},
    "c10-6-ex6-2-q1": {"grade":10,"level":"easy","basis":"Use tan θ = 10√3 / 30 = 1/√3 to get 30°.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q2": {"grade":10,"level":"easy","basis":"Compute half road width 4√3 / tan 30° = 12 m and double to 24 m.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q3": {"grade":10,"level":"medium","basis":"Subtract 5 tan 45° from 5 tan 60° above eye level to find window height 3.66 m.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q4": {"grade":10,"level":"medium","basis":"Equate distance d = h/tan 40° = (h + 1.6)/tan 60° and solve pedestal height.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q5-i": {"grade":10,"level":"medium","basis":"Use tan 45° = (r + h)/(r + 7) = 1 to cancel dome radius r directly and get h = 7 m.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q5-ii": {"grade":10,"level":"difficult","basis":"Solve tan 30° = r/(r + 12) by rationalising 12/(√3 − 1) to find r ≈ 16.39 m.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-2-q6": {"grade":10,"level":"medium","basis":"Find distance 15/√3 = 5√3 m and subtract 5√3·tan 30° = 5 m from 15 m tower.","review":"2025-textbook-ex62-source-audit"},
    "c10-6-ex6-3-q1": {"grade":10,"level":"easy","basis":"Convert 30° depression to ground elevation 30° and compute 50√3·√3 = 150 m.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-3-q2": {"grade":10,"level":"easy","basis":"Compute vertical drop 70 tan 45° = 70 m below 120 m roof to get 50 m.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-3-q3": {"grade":10,"level":"medium","basis":"Find gap 60/√3 m then subtract drop d tan 38° from 60 m to get 32.93 m.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-3-q4": {"grade":10,"level":"medium","basis":"Subtract same-side ship distances 1800√3 − 600√3 = 1200√3 = 2078.4 m.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-3-q5": {"grade":10,"level":"medium","basis":"Add opposite-side ship distances h√3 + h/√3 = 4h/√3 m.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-3-q6": {"grade":10,"level":"medium","basis":"Compute lift heights 90 ft and 30 ft from 30√3 ft away and divide 60 ft drop by 2 min.","review":"2025-textbook-ex63-source-audit"},
    "c10-6-ex6-4-q1": {"grade":10,"level":"medium","basis":"Find horizontal separation 13√3 m from 30° depression then add 13√3 tan 45° above 13 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q2": {"grade":10,"level":"medium","basis":"Find ship distance 40√3 ≈ 69.28 m via tan 30°, then rise 120 m via tan 60° for total 160 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q3": {"grade":10,"level":"difficult","basis":"Equate horizontal distance d = x/tan θ₁ = (2h+x)/tan θ₂ and add h to solve cloud height.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q4": {"grade":10,"level":"medium","basis":"Compute apartment-to-tower distance 50√3 m from 30°, multiply by tan 60° = √3 for 150 m > 120 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q5-i": {"grade":10,"level":"medium","basis":"Find horizontal separation 66√3 m, then compute top section 198 m and add 66 m = 264 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q5-ii": {"grade":10,"level":"easy","basis":"Subtract apartment height 66 m from lamp post height 264 m to obtain 198 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q5-iii": {"grade":10,"level":"easy","basis":"Evaluate d = 66√3 using √3 = 1.732 to get 114.31 m.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q6-i": {"grade":10,"level":"easy","basis":"Multiply 8 km horizontal separation by tan 20° = 0.3640 to obtain 2.91 km.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-4-q6-ii": {"grade":10,"level":"easy","basis":"Multiply 12 km by tan 30° = 1/√3 = 4√3 ≈ 6.93 km.","review":"2025-textbook-ex64-source-audit"},
    "c10-6-ex6-5-q1": {"grade":10,"level":"easy","basis":"Replace 1 + tan²θ with sec²θ so 1/sec²θ = cos²θ and sin²θ + cos²θ = 1.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q2": {"grade":10,"level":"easy","basis":"Factor tan θ, apply cosec²θ − 1 = cot²θ, and cancel one tan θ·cot θ = 1.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q3": {"grade":10,"level":"medium","basis":"Expand both binomials, combine sin²+cos²=1, 2+2=4, and convert cosec²+sec²=2+cot²+tan² to get k=7.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q4": {"grade":10,"level":"medium","basis":"Square sin θ + cos θ = a to find a² − 1 = 2 sin θ cos θ and rewrite b = a/(sin θ cos θ).","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q5": {"grade":10,"level":"easy","basis":"Substitute sec²θ − tan²θ = 25x² − 25/y² = 1 and divide by 25.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q6": {"grade":10,"level":"easy","basis":"sin θ = cos θ implies θ = 45°, so tan²θ = 1 and sin²θ = 1/2, yielding 3/2.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q7": {"grade":10,"level":"easy","basis":"Write tan θ = x/a and sec θ = y/b and substitute into sec²θ − tan²θ = 1.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q8": {"grade":10,"level":"medium","basis":"Convert all terms to sin θ and cos θ so numerators form (sin θ + cos θ)² − 1 = 2 sin θ cos θ.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q9": {"grade":10,"level":"medium","basis":"Square p and q, cancel 2ab cot θ cosec θ, and group (b² − a²)(cosec²θ − cot²θ) = b² − a².","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q10": {"grade":10,"level":"easy","basis":"tan θ = height / shadow = √3/1 gives θ = 60°.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q11": {"grade":10,"level":"medium","basis":"Find horizontal distance d = b/√3 from 60° depression then pole height h = d/√3 = b/3.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q12": {"grade":10,"level":"easy","basis":"Subtract 45° shadow (60 m) from 30° shadow (60√3 m): 60(1.732 − 1) = 43.92 m.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q13": {"grade":10,"level":"medium","basis":"Solve H = d√3 and H − 20 = d/√3 simultaneously to get d = 10√3 m and H = 30 m.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q14": {"grade":10,"level":"medium","basis":"Multiply complementary ratios tan θ = 4h/x and tan(90°−θ) = 2h/x to get 8h²/x² = 1.","review":"2025-textbook-ex65-source-audit"},
    "c10-6-ex6-5-q15": {"grade":10,"level":"difficult","basis":"Apply Exercise 6.4 Q3 formula with θ₁ = β and θ₂ = 45° (tan 45° = 1).","review":"2025-textbook-ex65-source-audit"},
    "c10-6-unit-q1-i": {"grade":10,"level":"medium","basis":"Combine fractions over (1 + sin A)(1 + sec A) so (sec²A − 1) and (sin²A − 1) cancel to 1 − 1 = 0.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q1-ii": {"grade":10,"level":"easy","basis":"Replace tan²θ + 1 with 1/cos²θ and tan²θ with sin²θ/cos²θ, cancel cos²θ, then convert sin²θ to 1 − cos²θ.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q2": {"grade":10,"level":"medium","basis":"Group (1 + sin θ) as A, expand (A ∓ cos θ)², apply sin²θ + cos²θ = 1, and cancel 2(1 + sin θ).","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q3": {"grade":10,"level":"medium","basis":"Substitute y cos θ = x sin θ into x sin³θ + (y cos θ)cos²θ to obtain x = cos θ and y = sin θ.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q4": {"grade":10,"level":"medium","basis":"Add squares of (a cos θ − b sin θ) and (a sin θ + b cos θ) to cancel cross terms and obtain a² + b².","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q5": {"grade":10,"level":"medium","basis":"Find horizontal distance travelled 80(√3 − 1) = 58.56 m and divide by 2 seconds.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q6": {"grade":10,"level":"difficult","basis":"Compute 600/0.7536 − 600/1.3270 ≈ 344.03 m distance travelled and divide by 175 m/s.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q7-i": {"grade":10,"level":"medium","basis":"Convert 35° West of North into 55° above West line and compute 30 sin 55° = 24.58 km.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q7-ii": {"grade":10,"level":"medium","basis":"Adjacent leg along West axis at 55° gives 30 cos 55° = 17.21 km.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q7-iii": {"grade":10,"level":"medium","basis":"Bearing 48° East of North leaves 42° above East horizontal, so North component = 32 sin 42° = 21.41 km.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q7-iv": {"grade":10,"level":"medium","basis":"Adjacent leg along East axis at 42° gives 32 cos 42° = 23.78 km.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q8": {"grade":10,"level":"medium","basis":"Equate total distance h/√3 + h = 200(√3 + 1)/√3 to cancel (√3 + 1)/√3 and obtain h = 200 m.","review":"2025-textbook-unit6-source-audit"},
    "c10-6-unit-q9": {"grade":10,"level":"medium","basis":"Add upper section 35 tan 24° and lower section 35 tan 34° across 35 m street width to get 39.19 m.","review":"2025-textbook-unit6-source-audit"}
  },
  "solutionReviews": {
    "g12-ch1-ex1.1-q8": "Canonical answer and both-sign verification are correct. Retired pilot contains the intermediate cofactor matrix and transpose absent from canonical working. Mathematical editor should assess exam-mark completeness before supplementing; no content replaced."
  }
};
for(const entry of Object.values(metadata.entries))Object.freeze(entry);
window.TriggleDifficulty=Object.freeze({
 entries:Object.freeze(metadata.entries),criteria:Object.freeze(metadata.criteria),
 solutionReviews:Object.freeze(metadata.solutionReviews),
 get(item){const value=metadata.entries[item?.id];return value&&item.classNum===value.grade?value:null;}
});
})();
