'use strict';
// TRACE Grade 9 Exercise 1.2 Q3 English source and arithmetic gate; NOT student-facing.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const m=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q3-source.json'));
const old=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
assert.equal(m.release,'staged-not-live');assert.equal(m.grade,9);assert.equal(m.chapter,'1');assert.equal(m.exercise,'1.2');assert.equal(m.question,'3');
assert.equal(m.evidence.english.printedPage,12);assert.equal(m.evidence.english.pdfPage,18);
assert.equal(m.evidence.tamil.printedPage,13);assert.equal(m.evidence.tamil.pdfPage,19);
assert.equal(m.review.tamilEditorial,'deferred');assert.equal(m.review.teacherReview,'deferred');
assert.equal(m.review.studentRegistration,'not registered');assert.equal(m.review.sourceFigures,'none');
assert.equal(m.rows.length,4);assert.equal(new Set(m.rows.map(x=>x.id)).size,4);
assert.deepEqual(m.rows.map(x=>x.classification),['Equivalent sets','Unequal sets','Equal sets','Equivalent sets']);
const html=read('site/index.html'),sw=read('site/service-worker.js');
assert(!html.includes('g9-ch1-ex1-2-q3-en.js'),'Q3 source proof must not automatically publish four student records');
assert(!sw.includes('g9-ch1-ex1-2-q3-en.js'),'Q3 is not in offline student cache yet');
for(const row of m.rows){
 const oldItem=old.rows.find(x=>x.id===row.id);
 assert(oldItem,'Missing historically audited source candidate '+row.id);
 assert.equal(row.classification,oldItem.answer,'Independent classification must match 34-part archive '+row.id);
 assert(row.sourceEnglish&&row.reason&&oldItem.steps.length>=3,'Full source evidence and working remain staged');
}
const eq=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
const a=['a','e','i','o','u'],b=[...'VOWEL'],c=[2,3,4,5],d=[2,3,4],
 x=[...'LIFE'],y=['F','I','L','E'],g=Array.from({length:19},(_,i)=>i+4).filter(n=>n>3&&n<23&&n>1&&!Array.from({length:Math.floor(Math.sqrt(n))-1},(_,i)=>i+2).some(k=>n%k===0)),
 h=Array.from({length:18},(_,i)=>i+1).filter(n=>18%n===0);
assert.equal(a.length,5);assert.equal(new Set(b).size,5);assert.equal(eq(a,b),false);
assert.equal(c.length,4);assert.deepEqual(d,[2,3,4]);assert.equal(eq(c,d),false);
assert.equal(eq(x,y),true,'Sets LIFE and {F,I,L,E} must be equal, regardless of order');
assert.deepEqual(g,[5,7,11,13,17,19]);assert.deepEqual(h,[1,2,3,6,9,18]);
assert.equal(g.length,h.length);assert.equal(eq(g,h),false,'Equal cardinality does not imply equal sets');
console.log('PASS Grade 9 Exercise 1.2 Q3 source: 4 English tasks and independent set reasoning, 2025 bilingual source locators, Tamil pending, no premature student publication.');
