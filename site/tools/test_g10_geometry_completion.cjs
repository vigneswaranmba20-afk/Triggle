'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const katex = require('../assets/vendor/katex/katex.min.js');
const {loadRuntime} = require('./curriculum_bulk.cjs');

const evidence = [
  ...require('../data/textbook-fidelity/g10-ch4-ex4-4.json').items,
  ...require('../data/textbook-fidelity/g10-ch4-ex4-5.json').items,
  ...require('../data/textbook-fidelity/g10-ch4-unit.json').items
];
const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(item => item.chapter === '4' && item.kind === 'textbook');
const byId = new Map(rows.map(item => [item.id, item]));
const cache = fs.readFileSync('site/service-worker.js', 'utf8');
const literal = parts => parts.map(value => value.fallback ?? value).join('');
const checkMath = parts => {
  for (const value of parts) if (value?.latex) katex.renderToString(value.latex, {throwOnError:true});
};
const cases = {
  '4.4': Array.from({length:16},(_,i)=>'c10-4-ex4-4-q'+(i+1)),
  '4.5': Array.from({length:15},(_,i)=>'c10-4-ex4-5-q'+(i+1)),
  '4.unit': ['1-i','1-ii','2','3','4','5','6-iii','7','8','9'].map(n=>'c10-4-unit-q'+n)
};
assert.equal(byId.size,rows.length,'Geometry IDs must be unique');
assert.equal(rows.length,85);
assert.equal(evidence.length,41);
for (const [exercise, ids] of Object.entries(cases)) {
  assert.deepEqual(rows.filter(row=>row.exercise===exercise).map(row=>row.id),ids);
}
for (const record of evidence) {
  const row = byId.get(record.id);
  assert.equal(row.translationReview,'pending');
  assert.ok(row.conceptId.startsWith('g10-ch4-'));
  for (const lang of ['en','ta']) {
    assert.equal(literal(row.questionMath[lang]),record.textbookPrompt[lang]);
    assert.equal(row.q[lang],record.textbookPrompt[lang]);
    assert.equal(row.sourceFidelity.sourcePdfPage[lang],record.sourcePages[lang].pdf);
    assert.equal(record.sourcePages[lang].pdf - record.sourcePages[lang].printed,6);
    assert.equal(record.visualStatus[lang],'page-checked');
    const answer = Array.isArray(row.answerMath) ? row.answerMath : row.answerMath[lang];
    checkMath(answer);
    checkMath(row.questionMath[lang]);
    if (row.choices) {
      assert.deepEqual(Array.from(row.choices,choice=>literal(choice[lang])),record.textbookChoices[lang]);
      row.choices.forEach(choice=>checkMath(choice[lang]));
    }
  }
  if (row.figureSrc) {
    assert.ok(cache.includes('./'+row.figureSrc),row.id+' offline figure');
    assert.match(fs.readFileSync('site/'+row.figureSrc,'utf8'),/viewBox="0 0 320 220"/);
    assert.ok(row.figureAlt.en && /[அ-ஹ]/.test(row.figureAlt.ta));
  }
  assert.ok(row.steps.length && row.steps.every(s=>s.en && /[அ-ஹ]/.test(s.ta) && s.why.en && /[அ-ஹ]/.test(s.why.ta)),row.id);
  for (const step of row.steps) if (step.math) {
    assert.equal(step.eq,step.math.fallback);
    checkMath([step.math]);
  }
}

const answer = (exercise,n,expected) => {
  const row = byId.get('c10-4-'+exercise+'-q'+n);
  assert.ok(row.answer.includes(expected),row.id+' final answer');
};
const near = (a,b) => assert.ok(Math.abs(a-b)<1e-9,`${a} differs from ${b}`);
const tangent = (d,r) => Math.sqrt((d-r)*(d+r));
answer('ex4-4',1,String(tangent(25,24)));
answer('ex4-4',2,String((6+8-Math.hypot(6,8))/2));
const semiperimeter = (8+10+12)/2;
answer('ex4-4',3,`AD = ${semiperimeter-8}, BE = ${semiperimeter-10}, CF = ${semiperimeter-12}`);
answer('ex4-4',4,String(120-90)+'°');
answer('ex4-4',5,String(2*65)+'°');
near(2*5*(13-5)/tangent(13,5),20/3);
answer('ex4-4',6,'20/3');
answer('ex4-4',7,String(Math.hypot(16/2,6)));
answer('ex4-4',8,String(2*3*4/Math.hypot(3,4)));
answer('ex4-4',10,'BF = '+5*(3/10)*(4/3));
for (const [q,d,r,expected] of [[13,10,5,8.7],[14,11,4,10.2],[15,5,3,4],[16,7.2,3.6,6.2]]) {
  assert.equal(Number(tangent(d,r).toFixed(1)),expected);
  answer('ex4-4',q,String(expected));
  const x=r*r/d;
  const y=Math.sqrt(r*r-x*x);
  near(x*(x-d)+y*y,0);       // Radius is perpendicular to the constructed tangent.
  near((x-d/2)**2+y*y,d*d/4); // Point is on the constructed diameter circle.
}

const indices = cases['4.5'].map(id=>byId.get(id).correctIndex);
assert.deepEqual(indices,[2,1,3,0,3,0,1,2,0,3,1,1,1,3,0]);
const selected = n => literal(byId.get(cases['4.5'][n-1]).choices[indices[n-1]].en).slice(4);
assert.equal(selected(1),'∠B = ∠D');
assert.equal(selected(2),String(180-60-50)+'°');
near(Math.hypot(5,5),5*Math.sqrt(2));
assert.equal(selected(3),'5√2 cm');
assert.equal(selected(4),(2+3)**2+' : '+2**2);
assert.equal(selected(5),36/24*10+' cm');
assert.equal(selected(6),1.4+' cm');
near(2.1*2.4/3.6,1.4);
assert.equal(selected(7),8*3/6+' cm');
assert.equal(selected(8),'BD · CD = AD²');
assert.equal(selected(9),Math.hypot(12,11-6)+' m');
assert.equal(Math.hypot(Math.hypot(6,8),24),26);
assert.equal(selected(10),'90°');
assert.equal(selected(11),'point of contact');
assert.equal(selected(12),'two');
assert.equal(selected(13),360-180-70+'°');
assert.equal(selected(14),11-7+' cm');
assert.equal(selected(15),2*60+'°');

answer('unit',2,'x = 12/5, y = 10/3');
near(6*4/(6+4),12/5);
near(5*4/6,10/3);
answer('unit',5,'20√13');
near(Math.hypot(20*2,30*2),20*Math.sqrt(13));
answer('unit',7,'H = 10');
near(2*20/4,10);
answer('unit',8,'s = 4d/11');
near(8/(30-8),4/11);
for (const t of [-8,-1,0,2,7]) {
  const a=10,h=3;
  const p2=h*h+t*t,b2=h*h+(a/2-t)**2,c2=h*h+(a/2+t)**2;
  near(b2+c2,2*p2+a*a/2);
}
// Because the source omits the orientation, the two separate Unit Q6 identities can fail.
assert.notEqual(3**2+(5-2)**2,3**2+2**2+10*2+25);
assert.notEqual(3**2+(5+2)**2,3**2+2**2-10*2+25);
for (const id of ['c10-4-unit-q6-i','c10-4-unit-q6-ii','c10-4-unit-q10']) assert.ok(!byId.has(id),id);
console.log('PASS Grade 10 Geometry: 85 unique records, 41 new bilingual prompts and solutions, 15 MCQ answers, 17 original figures and deterministic checks.');
