/* Grade 9 Exercise 1.2 Q5(iii) & Q6(i–iv): source-pinned English reasons only. Tamil editorial deferred. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
 "g9-ch1-ex1.2-q5-iii":{
  "step":2,
  "expected":"The intersection symbol ∩ denotes elements belonging to both sets. Because E ∩ F contains the shared numbers 3, 6, 12, and 24 (not empty), sets E and F are overlapping.",
  "en":"Even one common member is enough to make two sets overlapping. Here 3, 6, 12, and 24 each divide 24 and are also multiples of 3 below 30.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q6-i":{
  "step":0,
  "expected":"The curly braces { } enclose the 5 shapes in the parent set S. Check which shapes in S have all 4 sides of equal length: both a square and a rhombus have 4 equal sides.",
  "en":"A rhombus has four equal sides even when its angles are not right angles, while a square has four equal sides and four right angles, so both belong to the subset.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q6-ii":{
  "step":1,
  "expected":"Inspect the 5 shapes inside the curly braces { } of S: square, rectangle, rhombus, and triangle are polygons made of straight sides, so only the circle is defined by a radius.",
  "en":"Polygons are described by their straight sides and vertices, whereas a circle is the set of points at a constant radius from its centre.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q6-iii":{
  "step":0,
  "expected":"In ∠A + ∠B + ∠C = 180°, the symbol ∠ means “angle” and ° means “degrees”. The 3 interior (inside) angles of any triangle always add up to 180°.",
  "en":"For an n-sided polygon, the interior angles sum to (n − 2) × 180 degrees. Setting n = 3 gives 180 degrees for a triangle, while n = 4 gives 360 degrees for quadrilaterals.",
  "concept":"setClassification"
 },
 "g9-ch1-ex1.2-q6-iv":{
  "step":2,
  "expected":"When no element of S satisfies the condition, the subset is the empty (null) set, denoted by the symbol ∅ (or empty braces { }).",
  "en":"Write the empty set as ∅ or { }, never as {∅}. Putting ∅ inside braces would create a one-element set instead of an empty subset.",
  "concept":"setClassification"
 }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Why-step collision: '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
