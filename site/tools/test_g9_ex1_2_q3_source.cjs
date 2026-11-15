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
assert.equal(m.evidence.english.answerKey.printedPage,305);
assert.equal(m.evidence.english.answerKey.textLayerChecked,true,'Inherited English answer-key text transcription must remain explicit');
assert.equal(m.evidence.english.answerKey.pageImageChecked,false,'Do not claim unverified answer-key page-image evidence');
assert.deepEqual(m.evidence.english.answerKey.answers,m.rows.map(x=>x.classification),'Four staged classifications must match the inherited 2025 answer-key transcription');
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
// Validate the source expressions themselves so a changed inequality, word, or divisor
// cannot silently retain a correct-looking answer copied from the answer key.
const normalized=s=>s.replace(/\s+/g,'').toLowerCase();
assert.equal(normalized('3 < x < 23'),'3<x<23','Source normalization must strip actual whitespace');
assert(normalized(m.rows[0].sourceEnglish).includes('vowel'),'Q3(i) must retain the word VOWEL');
assert(normalized(m.rows[1].sourceEnglish).includes('1<x<5'),'Q3(ii) must retain both strict bounds');
assert(normalized(m.rows[2].sourceEnglish).includes('life'),'Q3(iii) must retain LIFE');
assert(normalized(m.rows[3].sourceEnglish).includes('3<x<23'),'Q3(iv) must retain strict prime bounds');
assert(normalized(m.rows[3].sourceEnglish).includes('divisorof18'),'Q3(iv) must retain the divisor condition');
const eq=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
const a=['a','e','i','o','u'],b=[...'VOWEL'],c=[2,3,4,5],d=[2,3,4],
 x=[...'LIFE'],y=['F','I','L','E'],g=Array.from({length:19},(_,i)=>i+4).filter(n=>n>3&&n<23&&n>1&&!Array.from({length:Math.floor(Math.sqrt(n))-1},(_,i)=>i+2).some(k=>n%k===0)),
 h=Array.from({length:18},(_,i)=>i+1).filter(n=>18%n===0);
assert.equal(a.length,5);assert.equal(new Set(b).size,5);assert.equal(eq(a,b),false);
assert.equal(c.length,4);assert.deepEqual(d,[2,3,4]);assert.equal(eq(c,d),false);
assert.equal(eq(x,y),true,'Sets LIFE and {F,I,L,E} must be equal, regardless of order');
assert.deepEqual(g,[5,7,11,13,17,19]);assert.deepEqual(h,[1,2,3,6,9,18]);
assert.equal(g.length,h.length);assert.equal(eq(g,h),false,'Equal cardinality does not imply equal sets');
// Derive classifications from actual set membership and cardinality, not only copied answer strings.
const classify=(left,right)=>eq(left,right)?'Equal sets':left.length===right.length?'Equivalent sets':'Unequal sets';
assert.deepEqual([classify(a,b),classify(c,d),classify(x,y),classify(g,h)],m.rows.map(row=>row.classification),
 'Each source classification must follow from independently enumerated sets');
assert.deepEqual(m.rows.map(row=>row.id),['g9-ch1-ex1.2-q3-i','g9-ch1-ex1.2-q3-ii','g9-ch1-ex1.2-q3-iii','g9-ch1-ex1.2-q3-iv'],
 'Stable textbook part IDs and ordering must not drift');
console.log('PASS Grade 9 Exercise 1.2 Q3 source: 4 English tasks and independent set reasoning, 2025 bilingual source locators, Tamil pending, no premature student publication.');
