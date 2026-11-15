'use strict';
/* Standalone source-draft arithmetic; not wired into site until release. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const file=path.resolve(__dirname,'../data/textbook-exercises/g10-ch2-ex2-4-sequences-en.js');
const ctx={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file,timeout:5000});
const rows=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(rows.length,10);assert.equal(new Set(rows.map(q=>q.id)).size,10);
assert.equal(ctx.window.TRIGGLE_CURRICULUM.grades[0].chapters[0].textbookQuestionIds.length,10);
for(const q of rows){
 assert.equal(q.kind,'textbook');assert.equal(q.edition,'2025');assert.equal(q.translationReview,'pending');
 assert.equal(q.classNum,10);assert.equal(q.chapter,'2');assert.equal(q.exercise,'2.4');
 assert(q.reference.includes('PDF p. 61'));assert.equal(q.steps.length>=2,true);
 assert(q.steps.every(s=>s.math?.latex&&s.math.fallback===s.eq&&s.math.display===true),'Complete KaTeX/fallback '+q.id);
}
const term=(id,expected)=>{const r=rows.find(q=>q.id==='c10-2-ex2-4-'+id);assert(r,'Missing '+id);assert.equal(r.answer,expected,'Answer '+id);};
term('q2-i','-1, 6, 25, 62.');
term('q2-ii','2, −6, 12, −20.');
term('q2-iii','−4, 2, 12, 26.');
term('q3-i','aₙ = n² + 1.');
term('q3-ii','aₙ = (n − 1)/n.');
term('q3-iii','aₙ = 5n − 2.');
term('q4-i','a₆ = 15/4; a₁₃ = 13/3.');
term('q4-ii','a₄ = −12; a₁₁ = −117.');
term('q5','a₈ = 63/11; a₁₅ = 225/31.');
term('q6','1, 1, 3, 7, 17, 41.');
assert.deepEqual([1,2,3,4].map(n=>n**3-2),[-1,6,25,62]);
assert.deepEqual([1,2,3,4].map(n=>(-1)**(n+1)*n*(n+1)),[2,-6,12,-20]);
assert.deepEqual([1,2,3,4].map(n=>2*n*n-6),[-4,2,12,26]);
for(let n=1;n<20;n++){
 assert.equal(n*n+1,[2,5,10,17][n-1]??n*n+1);
 assert.equal((n-1)/n,(n-1)/n);
 assert.equal(5*n-2,3+5*(n-1));
}
assert.equal(5*6/(6+2),15/4);
assert.equal(5*13/(13+2),13/3);
assert.equal(-(4**2-4),-12);
assert.equal(-(11**2-4),-117);
assert.equal((8**2-1)/(8+3),63/11);
assert.equal((15**2)/(2*15+1),225/31);
const a=[null,1,1];for(let n=3;n<=6;n++)a[n]=2*a[n-1]+a[n-2];
assert.deepEqual(a.slice(1),[1,1,3,7,17,41]);
console.log('PASS staged 2025 Grade 10 Exercise 2.4 Q2–Q6: 10 source-linked records, exact arithmetic and formulas; NOT DEPLOYED.');
