/* Grade 9 Exercise 1.2 Q2: source-pinned English reasons only. Tamil editorial deferred. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
 "g9-ch1-ex1.2-q2-i":{
  "step":1,
  "expected":"Tamil Nadu has a countable administrative list of districts at any fixed time; its number may change, but never becomes unlimited.",
  "en":"The number of districts can change over time, but at any given moment the official list has a limited number of entries. Finite does not mean fixed forever.",
  "concept":"finiteSet"
 },
 "g9-ch1-ex1.2-q2-ii":{
  "step":1,
  "expected":"Each new direction (for example a different slope m) produces another line passing through P.",
  "en":"Imagine turning a ruler around one fixed dot. You can rotate it by as small an angle as you like, so there is no final distinct direction or line.",
  "concept":"infiniteLines"
 },
 "g9-ch1-ex1.2-q2-iii":{
  "step":2,
  "expected":"For any integer x below five, the smaller integer x−1 also lies below five.",
  "en":"Subtract one from any integer smaller than five. The new number still belongs to the set. That gives a way to keep finding another member without ever stopping.",
  "concept":"unboundedIntegers"
 },
 "g9-ch1-ex1.2-q2-iv":{
  "step":1,
  "expected":"Factor the quadratic expression into two linear factors.",
  "en":"A quadratic can have two roots. Factoring here shows precisely which natural numbers make the expression zero; both roots belong to this set.",
  "concept":"quadraticRoots"
 }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Why-step collision: '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
