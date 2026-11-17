/* English-only Algebra Ex3.1 Q1/Q2 source-backed Why-step hints. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
  "g9-ch3-ex3.1-q1-i": {
    "step": 1,
    "expected": "Rewrite the reciprocal as a negative power; dividing by x squared is the same as multiplying by x to the power minus two, wherever x is nonzero.",
    "en": "To classify an expression, look at each variable exponent after valid simplification; the coefficient itself may be irrational, but a fractional or negative variable power is the key warning sign.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q1-ii": {
    "step": 1,
    "expected": "Add exponents when multiplying powers of the same base, giving x cubed minus x squared.",
    "en": "To classify an expression, look at each variable exponent after valid simplification; the coefficient itself may be irrational, but a fractional or negative variable power is the key warning sign.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q1-iii": {
    "step": 1,
    "expected": "Simplify x/x to one and rewrite 5/x with exponent −1.",
    "en": "To classify an expression, look at each variable exponent after valid simplification; the coefficient itself may be irrational, but a fractional or negative variable power is the key warning sign.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q1-iv": {
    "step": 1,
    "expected": "Similarly, the reciprocal of x to the power −1 equals x, so simplify both fractions before checking powers.",
    "en": "This is a good exception to remember: dividing by a negative power turns into a positive power. The book calls the simplified result a polynomial, but the original fractions still exclude x=0.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q1-v": {
    "step": 1,
    "expected": "The powers of x in the three terms are 2, 1, and 0; a constant term has power zero.",
    "en": "To classify an expression, look at each variable exponent after valid simplification; the coefficient itself may be irrational, but a fractional or negative variable power is the key warning sign.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q1-vi": {
    "step": 1,
    "expected": "Rewrite the expression with that exponent to check whether each variable power is a whole number.",
    "en": "To classify an expression, look at each variable exponent after valid simplification; the coefficient itself may be irrational, but a fractional or negative variable power is the key warning sign.",
    "concept": "polynomialRecognition"
  },
  "g9-ch3-ex3.1-q2-i": {
    "step": 2,
    "expected": "The x term is −3x, so its coefficient is negative three. The separate constant 4 is not part of either requested coefficient.",
    "en": "A coefficient is the signed number immediately multiplying that particular power of x. Ignore the constant term and any x-cubed term when asked only for x-squared and x.",
    "concept": "coefficientIdentification"
  },
  "g9-ch3-ex3.1-q2-ii": {
    "step": 2,
    "expected": "The term with x to the first power is −√7 x, so its coefficient is negative square-root seven, not the constant six or the x-cubed coefficient.",
    "en": "A coefficient is the signed number immediately multiplying that particular power of x. Ignore the constant term and any x-cubed term when asked only for x-squared and x.",
    "concept": "coefficientIdentification"
  },
  "g9-ch3-ex3.1-q2-iii": {
    "step": 2,
    "expected": "A bare −x means −1 times x, so its coefficient is negative one.",
    "en": "A coefficient is the signed number immediately multiplying that particular power of x. Ignore the constant term and any x-cubed term when asked only for x-squared and x.",
    "concept": "coefficientIdentification"
  },
  "g9-ch3-ex3.1-q2-iv": {
    "step": 2,
    "expected": "The term √2 x has coefficient square-root two; 0.5 is a separate constant.",
    "en": "A coefficient is the signed number immediately multiplying that particular power of x. Ignore the constant term and any x-cubed term when asked only for x-squared and x.",
    "concept": "coefficientIdentification"
  },
  "g9-ch3-ex3.1-q2-v": {
    "step": 2,
    "expected": "The x term is negative seven-halves times x, so the second coefficient is −7/2.",
    "en": "A coefficient is the signed number immediately multiplying that particular power of x. Ignore the constant term and any x-cubed term when asked only for x-squared and x.",
    "concept": "coefficientIdentification"
  }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Duplicate Why-step '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
