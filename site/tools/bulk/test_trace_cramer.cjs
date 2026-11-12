'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {compile,render}=require('./trace_cramer.cjs'),{verify}=require('./trace_cramer_verify.cjs'),{build}=require('./trace_g12_ex1_4.cjs'),bulk=require('../curriculum_bulk.cjs');
const data=require('../../../docs/trace/candidates/g12-ex1-4-models.json');
let checks=0;const test=(name,fn)=>{fn();checks++;console.log('PASS TRACE Cramer '+name);};
const model=(A,B,transforms)=>({schemaVersion:1,method:'cramer',variables:A.map((_,i)=>({name:['x','y','z'][i],transform:transforms?.[i]||'identity'})),A,B});
test('all eight source models and reciprocal domains independently verified',()=>{
 for(const item of data.models){const ir=compile(item.model);verify(ir);assert.deepEqual(ir.values,item.expectedValues.map(x=>typeof x==='number'?{n:x,d:1}:x));const p=render(ir);assert(p.steps.length>=12);assert(p.steps.every(s=>s.en&&s.eq&&s.math.length));}
 const qiv=data.models.find(i=>i.id.endsWith('q1-iv'));assert.equal(qiv.model.A[0][2],-2,'Original EN/TA close-ups show a minus, not a plus');
 assert.deepEqual(compile(qiv.model).values,[{n:1,d:1},{n:3,d:1},{n:3,d:1}]);
 const qii=compile(data.models.find(i=>i.id.endsWith('q1-ii')).model);assert.deepEqual(qii.domain,[{variable:'x',excludedValue:{n:0,d:1}}]);
 const text=render(qii).steps.map(s=>s.en+' '+s.eq).join('\n');assert(text.includes('x ≠ 0'));assert(text.includes('x = 1/(2) = 1/2'));
});
test('singular, reciprocal-zero, invalid shape, constraints and overflow quarantine',()=>{
 assert.throws(()=>compile(model([[1,2],[2,4]],[[3],[6]])),/SINGULAR_REVIEW_REQUIRED/);
 assert.throws(()=>compile(model([[1,0],[0,1]],[[0],[1]],['reciprocal','identity'])),/NO_FINITE_RECIPROCAL/);
 assert.throws(()=>compile(model([[1,0],[0,1]],[[1,2],[2,3]])),/DIMENSIONS/);
 const m=model([[1,0],[0,1]],[[-1],[2]]);m.variables[0].constraint='positive';assert.throws(()=>compile(m),/CONSTRAINT_FAILED/);
 const integer=model([[2,0],[0,1]],[[1],[2]]);integer.variables[0].constraint='nonnegative-integer';assert.throws(()=>compile(integer),/CONSTRAINT_FAILED/);
 assert.throws(()=>compile(model([[Number.MAX_SAFE_INTEGER,2],[2,3]],[[1],[2]])),/range exceeded/);
});
test('independent critic rejects altered arithmetic, cofactor signs and domain omissions',()=>{
 const ir=compile(data.models.find(i=>i.id.endsWith('q1-iv')).model);
 for(const mutate of [r=>{r.determinant.value.n++;},r=>{r.determinants[1].terms[1].sign=1;},r=>{r.values[2].n++;},r=>{r.domain=[];},r=>{r.model.A[0][2]=2;},r=>{r.substitution[0].n++;}]){
  const altered=structuredClone(ir);mutate(altered);assert.throws(()=>verify(altered));
 }
});
test('240 seeded systems, row-swap and equation-scaling metamorphic checks',()=>{
 let seed=192026,checked=0;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed%7-3;};
 for(const n of [2,3])for(let sample=0;sample<120;sample++){
  let A,ir;const wanted=Array.from({length:n},random);
  for(let retry=0;retry<100;retry++){
   A=Array.from({length:n},()=>Array.from({length:n},random));const B=A.map(row=>[row.reduce((s,a,j)=>s+a*wanted[j],0)]);
   try{ir=compile(model(A,B));}catch(e){if(/SINGULAR/.test(e.message))continue;throw e;}break;
  }
  assert(ir);verify(ir);assert.deepEqual(ir.values,wanted.map(n=>({n,d:1})));
  const swap=structuredClone(ir.model);[swap.A[0],swap.A[1]]=[swap.A[1],swap.A[0]];[swap.B[0],swap.B[1]]=[swap.B[1],swap.B[0]];
  const swapped=compile(swap);verify(swapped);assert.deepEqual(swapped.values,ir.values);assert.equal(swapped.determinant.value.n,-ir.determinant.value.n);
  const scaled=structuredClone(ir.model);scaled.A[0]=scaled.A[0].map(n=>n*-3);scaled.B[0][0]*=-3;const sc=compile(scaled);verify(sc);assert.deepEqual(sc.values,ir.values);checked++;
 }
 assert.equal(checked,240);
});
test('existing bulk gate accepts staged evidence and rejects changed answers/working/source labels',()=>{
 const {batch}=build(),result=bulk.validateBatch(batch);assert.equal(result.passed,true,result.errors.join('\n'));assert.equal(result.metrics.solvedSubparts,8);assert.equal(result.metrics.tamilSourceVerifiedRecords,0);
 for(const mutate of [b=>{b.records[0].answer='x = 2, y = 3.';},b=>{b.records[0].steps[2].eq='Δ = 0';},b=>{b.records[3].q.en=b.records[3].q.en.replace('− 2/z','+ 2/z');},b=>{b.mapping[0].parts=['ii'];}]){
  const changed=structuredClone(batch);mutate(changed);assert.equal(bulk.validateBatch(changed).passed,false);
 }
 assert(batch.records.every(r=>!r.q.ta),'No generated Tamil masquerades as editorial review');
 assert.equal(fs.existsSync(path.join(bulk.ROOT,'site',batch.module)),false,'Candidate module is not student-registered');
});
console.log(`PASS ${checks} Cramer compiler groups; no student content published`);
