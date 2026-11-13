'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-ch8-ex8-1-q11-q15-20261113.json'));
const ids=[11,12,13,14,15].map(n=>'c10-8-ex8-1-q'+n);
assert.deepEqual(manifest.records.map(r=>r.id),ids);
assert.equal(manifest.source.en.printedPage,314);
assert.equal(manifest.source.en.pdfPage,320);
assert.equal(manifest.source.ta.printedPage,323);
assert.equal(manifest.source.ta.pdfPage,329);
assert.equal(manifest.source.en.visuallyChecked,true);
assert.equal(manifest.source.ta.visuallyChecked,true);
assert.equal(manifest.tamilStatus,'pending');
assert.equal(manifest.professionalReview,'not_claimed');
assert.equal(manifest.records.length,5);
const html=read('site/index.html'),cache=read('site/service-worker.js');
const studentModule='data/textbook-exercises/g10-ch8-ex8-1-q11-q15-en.js';
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
assert.equal(scripts.filter(s=>s===studentModule).length,1,'new module must load exactly once');
assert.ok(cache.includes('./'+studentModule),'new module cached offline');
const ctx={window:{},console};vm.createContext(ctx);
for(const file of scripts)vm.runInContext(read('site/'+file),ctx,{filename:file,timeout:10000});
const all=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(all.map(x=>x.id)).size,all.length,'question IDs unique');
const ch8=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='8');
for(const source of manifest.records){
 const item=all.find(x=>x.id===source.id);
 assert.ok(item,'missing student record: '+source.id);
 assert.equal(JSON.stringify(item),JSON.stringify(source),'source/student mismatch: '+source.id);
 assert.equal(ch8.textbookQuestionIds.filter(x=>x===source.id).length,1,'chapter menu ID exactly once');
 assert.ok(source.q.en.includes(source.id.split('-').at(-1).substring(1)+'.'),'textbook question number must appear');
 assert.equal(source.q.ta,undefined,'unreviewed Tamil wording must not be fabricated');
 assert.equal(source.translationReview,'pending');
 assert.ok(source.steps.length>=6,'complete exam working: '+source.id);
 assert.ok(source.answer&&source.answerMath?.latex,'visible final answer and KaTeX: '+source.id);
 for(const step of source.steps){
  assert.ok(step.en&&step.eq,'narrative and accessible equation: '+source.id);
  assert.equal(step.math?.fallback,step.eq,'math fallback must match the saved equation');
  assert.ok(step.math.latex,'authored KaTeX equation must exist');
  assert.ok(!step.math.latex.includes('\\begin{matrix}'),'avoid nonresponsive table arrays');
 }
 const meta=ctx.window.TriggleDifficulty.get(item);
 assert.equal(meta?.grade,10,'explicit Grade 10 difficulty');
 assert.ok(['easy','medium','difficult'].includes(meta.level));
 assert.equal(meta.review,'implementation-audit');
}
for(const id of [
 'c10-8-ex8-1-q1-i','c10-8-ex8-1-q1-ii','c10-8-ex8-1-q2','c10-8-ex8-1-q3','c10-8-ex8-1-q4',
 ...[5,6,7,8,9,10].map(n=>'c10-8-ex8-1-q'+n)
])assert.ok(all.some(x=>x.id===id),'existing item preserved: '+id);
assert.match(manifest.records[0].q.en,/0-10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70/);
assert.match(manifest.records[1].q.en,/21-24, 25-28, 29-32, 33-36, 37-40, 41-44/);
assert.match(manifest.records[2].q.en,/8.5-9.5, 9.5-10.5, 10.5-11.5, 11.5-12.5, 12.5-13.5/);
function weighted(xs,fs){
 const n=fs.reduce((a,b)=>a+b,0),sx=xs.reduce((a,x,i)=>a+x*fs[i],0),ss=xs.reduce((a,x,i)=>a+x*x*fs[i],0);
 const mean=sx/n,variance=ss/n-mean*mean;
 const alternative=xs.reduce((a,x,i)=>a+fs[i]*(x-mean)**2,0)/n;
 assert.ok(Math.abs(variance-alternative)<1e-10,'two independent grouped-variance computations agree');
 return {n,sx,ss,mean,variance,sd:Math.sqrt(variance)};
}
const q11=weighted([5,15,25,35,45,55,65],[3,5,16,18,12,7,4]);
assert.deepEqual([q11.n,q11.sx,q11.ss],[65,2305,95625]);
assert.ok(Math.abs(q11.variance-36104/169)<1e-10);
assert.equal(Math.round(q11.sd*10)/10,14.6);
const q12=weighted([22.5,26.5,30.5,34.5,38.5,42.5],[15,18,20,16,8,7]);
assert.deepEqual([q12.n,q12.sx,q12.ss],[84,2582,82385]);
assert.ok(Math.abs(q12.variance-15851/441)<1e-10);
assert.equal(Math.round(q12.sd),6);
const q13=weighted([9,10,11,12,13],[6,8,17,10,9]);
assert.deepEqual([q13.n,q13.sx,q13.ss],[50,558,6304]);
assert.ok(Math.abs(q13.variance-1.5344)<1e-12);
assert.equal(Math.round(q13.sd*100)/100,1.24);
const oldSum=100*60,oldSumSquares=100*(15**2+60**2);
const correctedSum=oldSum-40-27+45+72;
const correctedSquares=oldSumSquares-40**2-27**2+45**2+72**2;
assert.equal(correctedSum,6050);assert.equal(correctedSquares,387380);
const correctedMean=correctedSum/100;
const correctedVariance=correctedSquares/100-correctedMean**2;
assert.equal(correctedMean,60.5);
assert.ok(Math.abs(correctedVariance-213.55)<1e-9);
assert.equal(Math.round(Math.sqrt(correctedVariance)*100)/100,14.61);
const known=[2,4,10,12,14],missing=[6,8],values=[...known,...missing];
assert.equal(values.reduce((a,b)=>a+b,0)/7,8);
assert.equal(values.reduce((a,b)=>a+b*b,0)/7-8**2,16);
assert.equal(6+8,14);assert.equal(6*8,48);
console.log('PASS Grade 10 Ex8.1 Q11-Q15: exact 2025 source, mobile KaTeX annotations, complete math, preserved IDs, difficulty, navigation and offline assets.');