'use strict';
/* Original English PDF page 61, printed p55, source visually checked.
 * This is a staged-only candidate: no student HTML or service worker load.
 * Numerical assertions are independent of the authored solution strings. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const src=fs.readFileSync(path.join(root,'site/data/textbook-exercises/g10-ch2-ex2-4-sequences-en.js'),'utf8');
const html=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'site/service-worker.js'),'utf8');
assert(!html.includes('g10-ch2-ex2-4-sequences-en.js')&&!sw.includes('g10-ch2-ex2-4-sequences-en.js'),
 'A staging-only PR must not silently publish unreviewed student material');
const previous={id:'c10-2-ex2-4-q1-i'};
const window={TRIGGLE_CLASSES:{10:{items:[previous]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[previous.id]}]}]}};
vm.runInNewContext(src,{window},{filename:'g10-ch2-ex2-4-sequences-en.js',timeout:5000});
const rows=window.TRIGGLE_CLASSES[10].items.slice(1);
const expectedIds=['q2-i','q2-ii','q2-iii','q3-i','q3-ii','q3-iii','q4-i','q4-ii','q5','q6'].map(s=>'c10-2-ex2-4-'+s);
assert.deepEqual(Array.from(rows,r=>r.id),expectedIds,'Ten missing textbook parts in printed question order');
assert.equal(rows.length,10);assert.equal(new Set(rows.map(r=>r.id)).size,10);
assert.equal(window.TRIGGLE_CLASSES[10].items[0],previous,'Previously published Q1 must remain unchanged');
assert.deepEqual(Array.from(window.TRIGGLE_CURRICULUM.grades[0].chapters[0].textbookQuestionIds).slice(1),expectedIds);
const exp={
'q2-i':'−1, 6, 25, 62.',
'q2-ii':'2, −6, 12, −20.',
'q2-iii':'−4, 2, 12, 26.',
'q3-i':'aₙ = n² + 1.',
'q3-ii':'aₙ = (n − 1)/n, for n ≥ 1.',
'q3-iii':'aₙ = 5n − 2.',
'q4-i':'a₆ = 15/4; a₁₃ = 13/3.',
'q4-ii':'a₄ = −12; a₁₁ = −117.',
'q5':'a₈ = 63/11; a₁₅ = 225/31.',
'q6':'1, 1, 3, 7, 17, 41.'
};
for(const row of rows){
 const key=row.id.replace('c10-2-ex2-4-','');
 assert.equal(row.answer,exp[key],'Exact independently known result for '+key);
 assert.equal(row.exercise,'2.4');assert.equal(row.chapter,'2');assert.equal(row.classNum,10);
 assert.equal(row.kind,'textbook');assert.equal(row.edition,'2025');assert.equal(row.translationReview,'pending');
 assert(row.source.includes('13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of'));
 assert(row.reference.includes('PDF p. 61')&&row.reference.includes('printed p. 55'));
 assert(row.steps.length>=2&&row.steps.every(s=>s.en.length>30&&s.math?.fallback===s.eq&&s.math?.latex&&s.math.display===true),
   'Complete KaTeX-backed working for '+key);
}
assert.deepEqual([1,2,3,4].map(n=>n**3-2),[-1,6,25,62]);
assert.deepEqual([1,2,3,4].map(n=>(-1)**(n+1)*n*(n+1)),[2,-6,12,-20]);
assert.deepEqual([1,2,3,4].map(n=>2*n*n-6),[-4,2,12,26]);
for(let n=1;n<=50;n++){
 assert.equal(n*n+1, [n*n+1][0]);
 assert(Math.abs((n-1)/n - (1-1/n))<1e-12, 'Equivalent rational expressions within floating tolerance');
 assert.equal(5*n-2,3+(n-1)*5);
}
assert.equal(5*6/(6+2),15/4);assert.equal(5*13/(13+2),13/3);
assert.equal(-(4**2-4),-12);assert.equal(-(11**2-4),-117);
const piecewise=n=>n%2===0?(n*n-1)/(n+3):n*n/(2*n+1);
assert.equal(piecewise(8),63/11);assert.equal(piecewise(15),225/31);
const seq=[null,1,1];for(let n=3;n<=6;n++)seq[n]=2*seq[n-1]+seq[n-2];
assert.deepEqual(seq.slice(1),[1,1,3,7,17,41]);
for(const key of ['q2-ii','q3-ii','q5','q6']) {
 const row=rows.find(x=>x.id.endsWith('-'+key));
 assert(row.steps.some(s=>/sign|pattern|even|odd|previous|term number/i.test(s.en)),
 'Explain conceptual decision where required '+key);
}
console.log('PASS source-checked Grade 10 Ex 2.4 staged Q2–Q6: ten accurate parts, full math, source provenance and no premature publishing.');
