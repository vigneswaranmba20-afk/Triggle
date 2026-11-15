'use strict';
/* Staging gate only. Original 2025 English printed pp61–62/PDF pp67–68. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const modulePath='site/data/textbook-exercises/g10-ch2-ex2-5-ap-missing-en.js';
const code=fs.readFileSync(modulePath,'utf8');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
assert(!html.includes('g10-ch2-ex2-5-ap-missing-en.js')&&!sw.includes('g10-ch2-ex2-5-ap-missing-en.js'),
  'The source-only PR must not accidentally publish lesson or offline content');
const current=loadRuntime();
const chapters=current.curriculum.grades.find(g=>g.grade===10).chapters;
const ch2=chapters.find(c=>String(c.number)==='2');
const current25=current.classes[10].items.filter(q=>String(q.chapter)==='2'&&q.exercise==='2.5'&&
  q.kind!=='practice'&&/^(?:Exercise|Unit Exercise)\b/.test(q.label?.en||''));
assert.equal(current25.length,15,'Preserve 15 previously published, unique Exercise 2.5 parts');
const expected=['q1-i','q1-v','q2-iii','q3-i','q3-ii','q8'].map(k=>'c10-2-ex2-5-'+k);
for(const id of expected)assert(!current25.some(q=>q.id===id),'No duplicate source ID '+id);
const context={window:{TRIGGLE_CLASSES:current.classes,TRIGGLE_CURRICULUM:current.curriculum}};
vm.runInNewContext(code,context,{filename:modulePath,timeout:6000});
const newRows=context.window.TRIGGLE_CLASSES[10].items.filter(q=>expected.includes(q.id));
assert.deepEqual(Array.from(newRows,q=>q.id),expected);
assert.equal(new Set(newRows.map(q=>q.id)).size,6);
assert.equal(context.window.TRIGGLE_CLASSES[10].items.filter(q=>q.exercise==='2.5').length,current25.length+6);
assert(ch2.textbookQuestionIds.length>0,'Curriculum registered');
const exp={
 'q1-i':'Yes, an A.P. with common difference −2.',
 'q1-v':'No, this is not an A.P.',
 'q2-iii':'3/4, 5/4, 7/4, 9/4, …',
 'q3-i':'First term a = −1; common difference d = 2.',
 'q3-ii':'First term a = −3; common difference d = −7.',
 'q8':'k = 4.'
};
for(const row of newRows){
 const key=row.id.slice('c10-2-ex2-5-'.length);
 assert.equal(row.answer,exp[key],'Exact source-linked result '+key);
 assert.equal(row.chapter,'2');assert.equal(row.exercise,'2.5');assert.equal(row.classNum,10);
 assert.equal(row.kind,'textbook');assert.equal(row.edition,'2025');assert.equal(row.translationReview,'pending');
 assert(row.source.includes('13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of'));
 assert(row.reference.includes('PDF p. ')&&row.reference.includes('printed p. '));
 assert(row.q.en.length>35,'Full question wording');
 assert(row.steps.length>=3&&row.steps.every(step=>step.en.length>30&&step.eq&&step.math?.latex&&step.math?.display&&step.math.fallback===step.eq));
}
const d1=(a)=>(a-5)-(a-3),d2=a=>(a-7)-(a-5);
for(const a of [-103,-2,0,3,19.5,100])assert.equal(d1(a),d2(a));
assert.equal(d1(3),-2);
assert.notEqual(-1-1,1-(-1),'Alternating signs disqualify A.P. Q1(v)');
assert.deepEqual([0,1,2,3].map(j=>3/4+j/2),[3/4,5/4,7/4,9/4]);
assert.deepEqual([1,2,3].map(n=>-3+2*n),[-1,1,3]);
assert.deepEqual([1,2,3].map(n=>4-7*n),[-3,-10,-17]);
const k=4;
assert.equal(2*(18-k),(3+k)+(5*k+1));
assert.deepEqual([3+k,18-k,5*k+1],[7,14,21]);
assert.equal(context.window.TRIGGLE_G10_CH2_EX25_STAGED.count,6);
console.log('PASS Grade 10 Exercise 2.5: six exact-source English tasks independently checked; 15 originals preserved; no premature deployment.');
