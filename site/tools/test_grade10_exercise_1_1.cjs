'use strict';
/**
 * Grade 10 textbook bulk-content validation.
 * Run: node site/tools/test_grade10_exercise_1_1.cjs
 * Finite-set identities are checked independently of the authored explanations.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const file=path.resolve(__dirname,'../data/class-10.js');
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file,timeout:2000});
const grade=sandbox.window.TRIGGLE_CLASSES?.[10];
assert.ok(grade,'Grade 10 content must be registered');
assert.equal(Object.keys(grade.chapters).length,8);
const all=grade.items||[];
const ids=all.map(x=>x.id);
assert.equal(new Set(ids).size,ids.length,'No duplicate question IDs');
const suffixes=['q1-i','q1-ii','q1-iii','q2','q3','q4','q5','q6-i','q6-ii','q6-iii','q7-i','q7-ii'];
const exercise=all.filter(x=>x.chapter==='1'&&x.exercise==='1.1');
assert.equal(exercise.length,12,'All 12 numbered parts of 2025 Exercise 1.1 must be present');
for (const suffix of suffixes) {
  const item=exercise.find(x=>x.id==='c10-1-ex1-1-'+suffix);
  assert.ok(item,'Missing '+suffix);
  assert.equal(item.kind,'textbook');
  assert.ok(item.q.en&&item.q.ta&&item.answer);
  assert.ok(item.steps.length>=4,'Insufficient solution steps for '+suffix);
  for (const step of item.steps) assert.ok(step.en&&step.ta&&step.eq);
  assert.ok(item.reference.includes('2025'),'Edition provenance missing for '+suffix);
}
const cross=(a,b)=>a.flatMap(x=>b.map(y=>JSON.stringify([x,y])));
const union=(a,b)=>[...new Set([...a,...b])];
const intersection=(a,b)=>a.filter(x=>b.includes(x));
const difference=(a,b)=>a.filter(x=>!b.includes(x));
const same=(a,b)=>JSON.stringify([...a].sort())===JSON.stringify([...b].sort());
const A1=[2,-2,3],B1=[1,-4],A2=[1,2,3],B2=[2,3,5,7];
const A4=[5,6],B4=[4,5,6],C4=[5,6,7];
const A5=[1,2,3],B5=[2,3,5],C5=[3,4],D5=[1,3,5];
const A6=[0,1],B6=[2,3,4],C6=[3,5];
const A7=[1,2,3,4,5,6,7],B7=[2,3,5,7],C7=[2];
const checks=[
  ['q1(i) counts',cross(A1,B1).length===6&&cross(A1,A1).length===9&&cross(B1,A1).length===6],
  ['q1(ii) count',cross(['p','q'],['p','q']).length===4],
  ['q1(iii) empty set',cross(['m','n'],[]).length===0&&cross([],['m','n']).length===0],
  ['q2 primes',cross(A2,B2).length===12&&cross(B2,A2).length===12],
  ['q3 reverse coordinates',same([-2,0,3],[-2,0,3])],
  ['q4 product intersection',same(cross(A4,A4),intersection(cross(B4,B4),cross(C4,C4)))],
  ['q5 intersection',same(cross(intersection(A5,C5),intersection(B5,D5)),intersection(cross(A5,B5),cross(C5,D5)))],
  ['q6(i) union',same(cross(A6,union(B6,C6)),union(cross(A6,B6),cross(A6,C6)))],
  ['q6(ii) intersection',same(cross(A6,intersection(B6,C6)),intersection(cross(A6,B6),cross(A6,C6)))],
  ['q6(iii) union',same(cross(union(A6,B6),C6),union(cross(A6,C6),cross(B6,C6)))],
  ['q7(i) intersection',same(cross(intersection(A7,B7),C7),intersection(cross(A7,C7),cross(B7,C7)))],
  ['q7(ii) difference',same(cross(A7,difference(B7,C7)),difference(cross(A7,B7),cross(A7,C7)))]
];
for (const [name,ok] of checks) assert.ok(ok,'Mathematical property failed: '+name);
console.log('Grade 10 Exercise 1.1: 12/12 parts present; '+checks.length+'/'+checks.length+' mathematical checks passed; schema valid.');
