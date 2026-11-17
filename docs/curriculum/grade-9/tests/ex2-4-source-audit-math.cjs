'use strict';
// SCERT 2025 Grade 9 Real Numbers Exercise 2.4.
// Enforce the protected original source records while distinguishing a mathematical
// uncertainty on Q1(iii) from the two source-and-math-verified subparts.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../../../');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const rows=[],env={window:{TriggleRealCh2:{addExercise(ex,n,part,data){
 if(ex===4)rows.push({id:'g9-ch2-ex4-q'+n+'-'+part,n,part,...data});
}}}};
vm.runInNewContext(read('site/data/real-numbers/g9-ch2-exercises-b.js'),env);
const ids=['g9-ch2-ex4-q1-i','g9-ch2-ex4-q1-ii','g9-ch2-ex4-q1-iii'];
assert.deepEqual(rows.map(r=>r.id),ids);
assert.deepEqual(rows.map(r=>r.page),[57,57,57]);
// Protected existing answers and diagrams are PRESERVED, not silently rewritten.
assert.deepEqual(rows.map(r=>r.answer),['5.348','6.444','4.7373']);
assert.deepEqual(rows.map(r=>r.diagram.kind),['real-number-line','real-number-line','real-number-line']);
assert.equal(rows[0].diagram.target,5.348);
assert.equal(rows[1].diagram.target,6.444);
assert.equal(rows[2].diagram.target,4.7373);
// Independent exact rational arithmetic for bar 4 and bar 73.
// BigInt protects the rounding inference from floating-point error.
const nearest=(n,d,dp)=>{
 n=BigInt(n);d=BigInt(d);const scale=10n**BigInt(dp);
 return (2n*n*scale+d)/(2n*d);
};
const truncated=(n,d,dp)=>BigInt(n)*10n**BigInt(dp)/BigInt(d);
assert.equal(nearest(58,9,3),6444n);
assert.equal(truncated(58,9,3),6444n);
assert.equal(truncated(469,99,4),47373n);
assert.equal(nearest(469,99,4),47374n);
assert.equal(469n*10000n>47373n*99n,true);
assert.equal(469n*10000n<47374n*99n,true);
// Source question "up to 4 decimals" is not a declaration of nearest rounding.
// Record the pending interpretation instead of falsely certifying legacy Q1(iii).
const notesEnv={window:{}};
vm.runInNewContext(read('site/data/why-step-g9.js'),notesEnv);
const notes=notesEnv.window.TriggleWhyStepG9.hints;
for(const [i,id] of ids.entries()){
 assert(notes[id],id+': source-pinned optional hint is missing');
 assert(notes[id].en.length>160,id+': teaching context too shallow');
 assert.equal(notes[id].expected,rows[i].steps[notes[id].step][0],
   id+': optional hint must point at the ORIGINAL source step');
}
assert(notes[ids[2]].en.includes('469/99'));
assert(notes[ids[2]].en.includes('4.7374'));
assert(notes[ids[2]].en.includes('truncation'));
assert(notes[ids[2]].en.includes('independently reviewed'));
const m=JSON.parse(read('site/data/g9-english-completeness-manifest.json'));
const ex=m.chapters.find(c=>c.chapter==='2').exercises.find(e=>e.id==='2.4');
assert.equal(ex.expectedQuestionCount,1);
assert.equal(ex.expectedSubquestionCount,3);
assert.equal(ex.verifiedInThisWorkstream,2);
assert.equal(ex.unresolvedCount,1);
assert.deepEqual(Array.from(ex.verifiedIds),ids.slice(0,2));
assert(ex.inventoryStatus.includes('awaiting-independent-review'));
const audit=read('docs/curriculum/grade-9/exercise-2-4-source-audit-20261117.md');
for(const token of [
 'e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037',
 '45f1dcd5b071146393c61b5f5d09c67dd257aadc24c8a64c182ea0f6d0f05c97',
 'no standalone printed answer section',
 'independent Gemini'
])assert(audit.includes(token),'missing source evidence '+token);
console.log('PASS G9 Ex2.4 source: 3/3 present, 2/3 verified, Q1(iii) interpretation pending, no protected answer records changed.');
