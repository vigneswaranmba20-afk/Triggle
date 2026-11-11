/* Grade 12 difficulty catalogue: 54 already-authored question IDs as of 2026-11-11.
 * Editorial screening (NOT IQ scoring, psychometrics, textbook teacher approval).
 * Original batch JSON, arithmetic and immutable IDs are not changed.
 * Add only a verified record ID when new content becomes available.
 */
(()=>{'use strict';
const entries={
  "g12-ch1-ex1.1-q1-i": {
    "difficulty": "easy",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q1-ii": {
    "difficulty": "medium",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q1-iii": {
    "difficulty": "hard",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q2-i": {
    "difficulty": "easy",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q2-ii": {
    "difficulty": "hard",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q2-iii": {
    "difficulty": "hard",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q3": {
    "difficulty": "medium",
    "family": "matrix-identity",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q4": {
    "difficulty": "medium",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q5": {
    "difficulty": "medium",
    "family": "matrix-identity",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q6": {
    "difficulty": "easy",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q7": {
    "difficulty": "hard",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q8": {
    "difficulty": "hard",
    "family": "matrix-identity",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q9": {
    "difficulty": "hard",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q10": {
    "difficulty": "medium",
    "family": "adjoint",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q11": {
    "difficulty": "hard",
    "family": "matrix-identity",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q12": {
    "difficulty": "medium",
    "family": "matrix-equation",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q13": {
    "difficulty": "hard",
    "family": "matrix-equation",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q14": {
    "difficulty": "hard",
    "family": "inverse",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.1-q15": {
    "difficulty": "hard",
    "family": "encryption",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q1-i": {
    "difficulty": "easy",
    "family": "rank",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q1-ii": {
    "difficulty": "medium",
    "family": "rank",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q1-iii": {
    "difficulty": "medium",
    "family": "rank",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q1-iv": {
    "difficulty": "hard",
    "family": "rank",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q1-v": {
    "difficulty": "hard",
    "family": "rank",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q2-i": {
    "difficulty": "medium",
    "family": "row-reduction",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q2-ii": {
    "difficulty": "hard",
    "family": "row-reduction",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q2-iii": {
    "difficulty": "hard",
    "family": "row-reduction",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q3-i": {
    "difficulty": "medium",
    "family": "gauss-jordan",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q3-ii": {
    "difficulty": "hard",
    "family": "gauss-jordan",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.2-q3-iii": {
    "difficulty": "hard",
    "family": "gauss-jordan",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q1-i": {
    "difficulty": "medium",
    "family": "linear-system",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q1-ii": {
    "difficulty": "medium",
    "family": "linear-system",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q1-iii": {
    "difficulty": "hard",
    "family": "linear-system",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q1-iv": {
    "difficulty": "hard",
    "family": "linear-system",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q2": {
    "difficulty": "medium",
    "family": "matrix-equation",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q3": {
    "difficulty": "hard",
    "family": "word-problem",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q4": {
    "difficulty": "hard",
    "family": "word-problem",
    "source": "audited-ch1-batch"
  },
  "g12-ch1-ex1.3-q5": {
    "difficulty": "hard",
    "family": "word-problem",
    "source": "audited-ch1-batch"
  },
  "c12-4-4-1-1": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-1-2": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-1-3": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-1-4": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-3-5": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-3-6": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-3-7": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-3-8": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-3-9": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-4-10": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-4-11": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-4-12": {
    "difficulty": "medium",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-4-13": {
    "difficulty": "hard",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-2-14": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-5-15": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  },
  "c12-4-4-6-16": {
    "difficulty": "easy",
    "family": "inverse-trig",
    "source": "legacy-existing"
  }
};
const focus={
 "adjoint":{goal:"Find or use the adjoint without losing cofactor signs or the transpose.",prerequisite:"An adjoint comes from signed cofactors followed by a transpose.",watch:"Keep cofactor signs and row–column positions consistent.",analogy:"The cofactor matrix is your draft; the transpose is the final seat swap. 🔁",
 check:{prompt:"What is the usual final operation when forming an adjoint from a cofactor matrix?",choices:["Transpose the cofactor matrix","Square every entry","Add the diagonal"],correct:0,why:"The adjoint is the transpose of the cofactor matrix."}},
 "inverse":{goal:"Use the correct inverse identity and check that inversion is valid.",prerequisite:"A square matrix is invertible only if its determinant is nonzero.",watch:"A zero determinant means an inverse does not exist; do not divide by zero.",analogy:"The inverse is the undo button — but it only works if the matrix is invertible. ↩️",
 check:{prompt:"When does a square matrix have an inverse?",choices:["When the determinant is nonzero","Whenever its entries are integers","Whenever it has a zero entry"],correct:0,why:"The determinant must be nonzero."}},
 "rank":{goal:"Find how many independent rows or columns remain.",prerequisite:"Rank counts linearly independent rows or columns; nonzero minors can certify rank.",watch:"A zero larger minor alone does not prove every smaller minor is zero.",analogy:"Rank counts independent team members — repeated work is not an extra member. 🧩",
 check:{prompt:"What does matrix rank count?",choices:["The number of independent rows or columns","The sum of all entries","Only the number of rows"],correct:0,why:"Row rank and column rank both equal the number of independent directions."}},
 "row-reduction":{goal:"Reduce rows by valid operations and count the nonzero pivots.",prerequisite:"Swapping, scaling a row by a nonzero number and adding a multiple of another row preserve rank.",watch:"Apply each operation to every entry in the row, not a single cell.",analogy:"Row operations are legal rearrangements — the team's independence stays the same. 🔧",
 check:{prompt:"Which row operation preserves rank?",choices:["Add a multiple of one row to another","Replace a row with zeros arbitrarily","Delete every nonzero entry"],correct:0,why:"Elementary row operations preserve rank."}},
 "gauss-jordan":{goal:"Find an inverse by transforming an augmented matrix.",prerequisite:"For invertible A, row-reduce [A | I] to [I | A⁻¹].",watch:"Whatever operation changes the left block must change the right block too.",analogy:"Two sides of one balance sheet: every row move must happen on both sides. ⚖️",
 check:{prompt:"In [A | I], which part receives each elementary row operation?",choices:["Both the left and right blocks","Only the left block","Only the right block"],correct:0,why:"Each operation acts on the entire augmented row."}},
 "linear-system":{goal:"Translate equations into AX = B and solve using a valid inverse.",prerequisite:"In the inversion method, AX=B becomes X=A⁻¹B only when A is invertible.",watch:"Keep the coefficient order and variable order aligned.",analogy:"The coefficient matrix is a map; the variable order tells you where each destination lives. 🗺️",
 check:{prompt:"For invertible A, what solves AX = B?",choices:["X = A⁻¹B","X = BA⁻¹ for every A","X = A + B"],correct:0,why:"Multiply AX=B on the left by A⁻¹."}},
 "word-problem":{goal:"Turn quantities into equations and interpret the solved unknowns with units.",prerequisite:"Define each variable and align its coefficient with the correct quantity.",watch:"Check units, meaning and order of variables in the final answer.",analogy:"Words are the puzzle clues; equations are the map. Don’t lose the units on the way. 🔎",
 check:{prompt:"What should you check after solving a matrix word problem?",choices:["The original conditions and units","Only whether the numbers are big","Whether every quantity is positive"],correct:0,why:"A solution is meaningful only if it fits the stated quantities and units."}},
 "inverse-trig":{goal:"Respect principal-value intervals when evaluating inverse trigonometric expressions.",prerequisite:"Inverse trigonometric functions return values in specified principal branches.",watch:"A trigonometric function is periodic; the inverse returns its principal value.",analogy:"The principal branch is the official address — many angles may share a trig value. 🧭",
 check:{prompt:"Why can tan⁻¹(tan θ) differ from θ?",choices:["The inverse tangent returns a principal value","Tangent is never periodic","Every angle is in the principal interval"],correct:0,why:"Angles differing by multiples of π can have the same tangent."}},
 "matrix-identity":{goal:"Verify the matrix identity by carefully matching both sides.",prerequisite:"Matrix products generally depend on order: AB need not equal BA.",watch:"Never swap matrix factors without a proved reason.",analogy:"Matrix multiplication is like a recipe: switching steps can change the outcome. 🧪",
 check:{prompt:"Can you always swap A and B in a matrix product?",choices:["No, AB and BA can differ","Yes, multiplication always commutes","Only if the matrices contain zeros"],correct:0,why:"In general matrix multiplication is not commutative."}},
 "matrix-equation":{goal:"Isolate the unknown matrix using valid multiplication and inverse order.",prerequisite:"Multiply by inverses on the correct side; order generally matters.",watch:"If AXB=C, the valid isolation is X=A⁻¹CB⁻¹ when A and B are invertible.",analogy:"Unlock both sides in the right order, like a two-lock safe. 🔐",
 check:{prompt:"If A and B are invertible and AXB=C, which expression gives X?",choices:["A⁻¹CB⁻¹","B⁻¹CA⁻¹","ABC"],correct:0,why:"Undo multiplication on the left and right in the correct order."}},
 "encryption":{goal:"Use matrix inverses to reverse a stated encoding rule.",prerequisite:"An invertible encoding matrix can be undone by multiplying by its inverse on the correct side.",watch:"Read the original encoding multiplication order before decrypting.",analogy:"A matrix key scrambles a message; the inverse key unlocks it. 🔑",
 check:{prompt:"What reverses an invertible matrix encoding step?",choices:["The matching inverse applied on the correct side","Squaring every code entry","Changing all signs at random"],correct:0,why:"The inverse operation undoes the stated matrix multiplication."}}
};
const eligibleCount=Object.values(entries).filter(x=>x.difficulty!=='easy').length;
window.TriggleG12Catalog=Object.freeze({
 entries:Object.freeze(entries),focus:Object.freeze(focus),eligibleCount,
 get(item){if(item?.classNum!==12)return null;const cfg=entries[item.id];return cfg&&cfg.difficulty!=='easy'?{...cfg,...focus[cfg.family],id:item.id}:null;}
});
})();
