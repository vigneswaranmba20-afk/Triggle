/* Optional English hints for Exercise 3.2. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;
const additions={
  "g9-ch3-ex3.2-q1-ii": {
    "step": 1,
    "expected": "Square the entire negative input first. The square is positive, and the coefficient of that square is negative.",
    "en": "The parentheses make the square act on the whole input. Multiplying negative one by itself gives positive one. The minus sign before three is outside the square."
  },
  "g9-ch3-ex3.2-q2": {
    "step": 1,
    "expected": "Squaring two times the square root of two gives eight. The product in the second term is the same square.",
    "en": "The square root of two times itself is two. Both products have two factors of two as well, so both products equal eight."
  },
  "g9-ch3-ex3.2-q3-vi": {
    "step": 2,
    "expected": "The coefficient a is nonzero, so divide both sides by a.",
    "en": "The symbol ≠ means “is not equal to.” Dividing both sides by the same nonzero number preserves the equality and leaves just x on the left."
  },
  "g9-ch3-ex3.2-q5-iii": {
    "step": 1,
    "expected": "Substitute the fraction for x. The factor a cancels with the nonzero denominator a.",
    "en": "The cancellation is valid because a divided by a is one when a is nonzero. If a is zero, the proposed input itself is undefined."
  },
  "g9-ch3-ex3.2-q6-v": {
    "step": 0,
    "expected": "A zero occurs where the curve meets the horizontal x-axis. The height y at any point on that axis is zero.",
    "en": "A curve can meet the axis by touching it. At the touch point its height is zero, and the two arms share that one point."
  }
};
for(const id of Object.keys(additions)){
  if(Object.hasOwn(previous.hints,id))throw Error('Duplicate Why-step '+id);
}
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
