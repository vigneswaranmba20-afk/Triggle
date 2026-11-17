/* Grade 9 Exercise 1.2 Q7, Q8(i–iv), Q9(i–ii), and Q10(i–iii): source-pinned English reasons only. Tamil editorial deferred. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
 "g9-ch1-ex1.2-q7":{
  "step":0,
  "expected":"In A = {a, {a, b}}, the outer curly braces { } enclose 2 elements: the single letter a and the entire inner set {a, b} treated as one object, so the cardinal number n(A) is 2.",
  "en":"Treat the inner braces {a, b} as a single sealed package inside A. When forming subsets of A, you either pick that entire package {{a, b}} or leave it out—you do not unpack b as a separate element of A.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q8-i":{
  "step":2,
  "expected":"The power set P(A) is the set whose elements are all the subsets of A, enclosed together inside outer curly braces { }.",
  "en":"Every member of a power set is itself a set. That is why each subset {a}, {b}, and {a, b} keeps its own inner braces inside the outer braces of P(A).",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q8-ii":{
  "step":1,
  "expected":"Group the subsets systematically by size: 1 empty subset (size 0), 3 singletons (size 1), 3 pairs (size 2), and 1 full set (size 3).",
  "en":"Listing subsets in order of size (0, 1, 2, then 3 elements) guarantees that none of the 2³ = 8 subsets is accidentally skipped or written twice.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q8-iii":{
  "step":2,
  "expected":"Next list all 6 two-element subsets in alphabetical pair order so that no pair is missed or repeated.",
  "en":"In a set, order does not matter ({p, q} is the same subset as {q, p}). Moving forward alphabetically from p, then q, then r gives all 6 distinct pairs cleanly.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q8-iv":{
  "step":2,
  "expected":"An empty set has no other subsets, so the power set P(E) contains exactly 1 element—namely ∅ inside curly braces {∅}.",
  "en":"Notice the difference between ∅ and {∅}: ∅ is an empty box with 0 items, whereas P(E) = {∅} is a box containing 1 item (that empty box).",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q9-i":{
  "step":2,
  "expected":"A proper subset of W is any subset except the full set W itself, so subtract 1 from the total number of subsets: 2³ − 1 = 8 − 1 = 7.",
  "en":"Every subset of W is a proper subset except the full set W = {red, blue, yellow} itself, which is why the number of proper subsets is always 2^m − 1.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q9-ii":{
  "step":0,
  "expected":"In X = {x² : x ∈ N, x² ≤ 100}, ∈ means “belongs to”, N is the set of natural numbers {1, 2, 3, …}, and ≤ means “less than or equal to”. The natural numbers whose squares are at most 100 are 1 through 10.",
  "en":"Natural numbers N start at 1 (not 0), and 10² = 100 satisfies x² ≤ 100 while 11² = 121 exceeds 100, so there are exactly 10 elements in X.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q10-i":{
  "step":0,
  "expected":"If a finite set A has n(A) elements, then its power set P(A) (the set of all subsets of A) contains n[P(A)] = 2^{n(A)} elements.",
  "en":"Each of the 4 elements in A has 2 independent possibilities when building a subset (include or exclude), so the total number of subsets multiplies to 2 × 2 × 2 × 2 = 2⁴ = 16.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q10-ii":{
  "step":2,
  "expected":"Any nonzero number raised to the power 0 equals 1, so 2⁰ = 1.",
  "en":"Even when a set has 0 elements, there is still 1 way to choose a subset—by choosing nothing—which gives the single subset ∅ and n[P(A)] = 2⁰ = 1.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q10-iii":{
  "step":1,
  "expected":"Express 256 as a power of 2 by repeated doubling (2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64, 2⁷ = 128, 2⁸ = 256).",
  "en":"Writing both sides with the same base 2 turns the exponential equation 2^{n(A)} = 256 into 2^{n(A)} = 2⁸, so the exponent n(A) must be 8.",
  "concept":"setClassification"
 }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Why-step collision: '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
