'use strict';
// Grade 9 2025 SCERT Exercise 2.4, PDF p63 / printed p57.
// Exact arithmetic independently checks number-line representations and the
// crucial distinction between truncating and rounding a repeating decimal.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../../../');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const rows=[];
const env={window:{TriggleRealCh2:{addExercise(ex,n,part,data){
 if(ex===4)rows.push({id:'g9-ch2-ex4-q'+n+'-'+part,n,part,...data});
}}}};
vm.runInNewContext(read('site/data/real-numbers/g9-ch2-exercises-b.js'),env);
const ids=['g9-ch2-ex4-q1-i','g9-ch2-ex4-q1-ii','g9-ch2-ex4-q1-iii'];
assert.equal(rows.length,3,'Exercise 2.4 contains one question with three parts');
assert.deepEqual(rows.map(x=>x.id),ids);
assert.deepEqual(rows.map(x=>x.page),[57,57,57]);
assert.deepEqual(rows.map(x=>x.answer),['5.348','6.444','4.7374']);
assert.deepEqual(rows.map(x=>x.diagram.kind),['real-number-line','real-number-line','real-number-line']);
const f=(n,d)=>Number(BigInt(n))/Number(BigInt(d));
// Exact integer rounding to nearest N places for strictly positive rational values.
function nearest(n,d,places){n=BigInt(n);d=BigInt(d);
 const scale=10n**BigInt(places);return (2n*n*scale+d)/(2n*d);
}
function truncate(n,d,places){return BigInt(n)*10n**BigInt(places)/BigInt(d);}
assert.equal(nearest(58,9,3),6444n,'6 repeating 4 rounded at 3 decimals');
assert.equal(truncate(58,9,3),6444n);
assert.equal(truncate(469,99,4),47373n,'4 repeating 73 truncates to 4.7373');
assert.equal(nearest(469,99,4),47374n,'4 repeating 73 rounds to 4.7374, not 4.7373');
const actual=[5.348,f(58,9),f(469,99)];
for(let i=0;i<3;i++){
 const {diagram,steps}=rows[i];
 assert(Math.abs(diagram.target-actual[i])<1e-13,ids[i]+': diagram must show exact number, not rounded tick');
 assert(diagram.min<actual[i]&&actual[i]<diagram.max,ids[i]+': point outside zoom interval');
 assert(steps.length>=2);
}
assert.equal(rows[0].steps[0][2],'5.348 = 5.348','exact decimals need equality');
assert(rows[1].steps[0][2].includes('≈ 6.444'));
assert(rows[2].steps[0][2].includes('≈ 4.7374'));
assert.equal(rows[2].steps[1][2],'4.7373 < 4.(73) < 4.7374','true recurring value must sit between zoom endpoints');
assert(rows[2].steps[0][0].includes('truncation')&&rows[2].steps[0][0].includes('rounding'));
const context={window:{}};
vm.runInNewContext(read('site/data/why-step-g9.js'),context);
const notes=context.window.TriggleWhyStepG9.hints;
for(const [i,id] of ids.entries()){
 assert(notes[id],id+': Why step missing');
 assert(notes[id].en.length>130,id+': need a beginner-focused explanation');
 assert.equal(notes[id].expected,rows[i].steps[notes[id].step][0],id+': hint-to-source step mismatch');
}
assert(notes[ids[2]].en.includes('469/99'));
assert(notes[ids[2]].en.includes('truncation'));
assert(notes[ids[2]].en.includes('rounding'));
const m=JSON.parse(read('site/data/g9-english-completeness-manifest.json'));
const ex=m.chapters.find(c=>c.chapter==='2').exercises.find(e=>e.id==='2.4');
assert.equal(ex.expectedQuestionCount,1);
assert.equal(ex.expectedSubquestionCount,3);
assert.equal(ex.verifiedInThisWorkstream,3);
assert.equal(ex.unresolvedCount,0);
assert.deepEqual(Array.from(ex.verifiedIds),ids);
const doc=read('docs/curriculum/grade-9/exercise-2-4-source-audit-20261117.md');
for(const token of ['e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037','45f1dcd5b071146393c61b5f5d09c67dd257aadc24c8a64c182ea0f6d0f05c97','no standalone printed answer section']){
 assert(doc.includes(token),'source visual evidence or caveat missing '+token);
}
console.log('PASS G9 2025 Exercise 2.4: 3/3 source parts; exact recurring-decimal location; truncation versus rounding; 3 beginner explanations.');
