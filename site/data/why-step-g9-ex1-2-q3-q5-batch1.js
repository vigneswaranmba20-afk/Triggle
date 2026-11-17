/* TRACE G9 Ex1.2 Q3–Q5 first English batch: source-linked optional explanations; no Tamil translation. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;
if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
  "g9-ch1-ex1.2-q3-i": {
    "step": 1,
    "expected": "Each set has five elements, but the members differ.",
    "en": "Equivalent only means the sets contain the same number of different elements. The letters themselves can be completely different, so the sets need not be equal.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q3-ii": {
    "step": 1,
    "expected": "Compare D with the given set C.",
    "en": "Write out every whole number strictly between 1 and 5 before comparing. The number 5 appears in C but the strict inequality excludes it from D.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q3-iii": {
    "step": 1,
    "expected": "Compare those members with Y; order does not matter in a set.",
    "en": "In set notation, order does not matter. Both sets contain the same four distinct letters L, I, F and E, so they are equal.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q3-iv": {
    "step": 1,
    "expected": "List the positive divisors of 18.",
    "en": "Count the primes in G and the positive divisors of 18 in H. Their members differ, but both counts are six, so the sets are equivalent.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q4-i": {
    "step": 1,
    "expected": "So the membership condition has no solution.",
    "en": "There is no natural number between 1 and 2. Both endpoints are excluded by the strict signs, so the set has no elements.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q4-ii": {
    "step": 1,
    "expected": "The question requires an even number that is not divisible by two.",
    "en": "Even numbers are defined as multiples of 2. Requiring an even number that is not divisible by 2 is impossible.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q4-iii": {
    "step": 1,
    "expected": "This is not the empty set: it contains one element.",
    "en": "The braces enclose a genuine element, zero. The empty set has no elements, but {0} has exactly one element.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q4-iv": {
    "step": 1,
    "expected": "No triangle has four sides.",
    "en": "A triangle has exactly three sides. A four-sided figure could be a quadrilateral, but never a triangle.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q5-i": {
    "step": 1,
    "expected": "Their common elements are a, f, and s.",
    "en": "To test for overlap, look for elements that belong to both sets. The letters a, f and s are in both; a nonempty intersection means overlapping.",
    "concept": "setClassification"
  },
  "g9-ch1-ex1.2-q5-ii": {
    "step": 1,
    "expected": "C contains only prime numbers greater than 2, so it excludes 2.",
    "en": "The only even prime number is 2. Set C excludes 2 because it requires primes greater than 2, so the two sets cannot share an element.",
    "concept": "setClassification"
  }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Why-step collision: '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
