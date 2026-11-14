/* English-only, source-pinned Grade 9 Ex1.2 Q1 learning bridges; no Tamil translation is claimed. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
  "g9-ch1-ex1.2-q1-i": {
    "step": 0,
    "expected": "The cardinal number counts the distinct elements of a set.",
    "en": "Cardinality counts different members, not how often a member is written. Each distinct letter contributes one.",
    "concept": "cardinality"
  },
  "g9-ch1-ex1.2-q1-ii": {
    "step": 0,
    "expected": "Whole numbers start at zero; use x=3n+2 and the upper limit.",
    "en": "Whole numbers include zero. First list the allowed input values, then compute the outputs; the strict upper limit does not include its endpoint.",
    "concept": "wholeNumbers"
  },
  "g9-ch1-ex1.2-q1-iii": {
    "step": 0,
    "expected": "The printed expression is four divided by the whole product 3n, not (4/3)n.",
    "en": "The denominator is the entire product of three and the chosen number. Evaluate that product before dividing to avoid changing the original fraction.",
    "concept": "rationalSet"
  },
  "g9-ch1-ex1.2-q1-iv": {
    "step": 0,
    "expected": "The lower endpoint −5 is included, but the upper endpoint 5 is excluded.",
    "en": "An inclusive boundary allows the first integer, but a strict upper bound rejects its endpoint. Listing the integers prevents an off-by-one error.",
    "concept": "integerInterval"
  },
  "g9-ch1-ex1.2-q1-v": {
    "step": 0,
    "expected": "Check multiples of four between the stated years.",
    "en": "Multiples of four are only candidates. A century year also has to be divisible by four hundred, so nineteen hundred must be excluded.",
    "concept": "leapYear"
  }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Why-step collision: '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
