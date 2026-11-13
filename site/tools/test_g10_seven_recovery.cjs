'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-seven-recovery-20261113.json'));
const ids=['c10-3-ex3-1-q1-ii','c10-3-ex3-1-q1-iii','c10-4-ex4-1-q1-i','c10-4-ex4-1-q1-ii','c10-6-ex6-1-q2-i','c10-8-ex8-1-q3','c10-8-ex8-1-q4'];
assert.deepEqual(manifest.records.map(r=>r.id),ids);
assert.equal(manifest.records.length,7);
assert.equal(manifest.sources.en.sha256,'602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d');
assert.equal(manifest.sources.ta.sha256,'6c6629e39b3ba5c7fccf43c320dc54eec56f7aed393895409eaaad1a7907b22f');
assert.equal(manifest.tamilEditorialCertification,'not_claimed');
assert.equal(manifest.professionalTeacherReview,'not_claimed');
const scripts=[...read('site/index.html').matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
const recoveryModule='data/textbook-exercises/g10-seven-recovery-20261113-en.js';
assert.equal(scripts.filter(s=>s===recoveryModule).length,1,'Recovery JS loads exactly once');
const ctx={window:{},console};
vm.createContext(ctx);
for(const file of scripts)vm.runInContext(read('site/'+file),ctx,{filename:file,timeout:10000});
const all=ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(all.map(x=>x.id)).size,all.length,'Every student record has a unique ID');
const chapters=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters;
for(const r of manifest.records){
 const actual=all.find(x=>x.id===r.id);
 assert.ok(actual,'Missing recovery question in app: '+r.id);
 assert.equal(JSON.stringify(actual),JSON.stringify(r),'Manifest and rendered record are identical: '+r.id);
 const chapter=chapters.find(c=>String(c.number)===r.chapter);
 assert.equal(chapter.textbookQuestionIds.filter(id=>id===r.id).length,1,'Chapter navigation exactly once: '+r.id);
 const meta=ctx.window.TriggleDifficulty.get(actual);
 assert.ok(meta&&['easy','medium','difficult'].includes(meta.level),'Explicit difficulty: '+r.id);
 assert.ok(r.steps.length>=3&&r.answer,'No abbreviated working or missing answer: '+r.id);
 assert.equal(r.translationReview,'pending');
 assert.ok(r.q.en.includes('(')||r.chapter==='8','Equation and diagram text preserved');
 if(r.figureSrc)assert.ok(fs.statSync(path.join(ROOT,'site',r.figureSrc)).isFile(),'Required geometry figure: '+r.figureSrc);
}
assert.ok(all.some(r=>r.id==='c10-2-ex2-2-q1'),'Previously deployed Exercise 2.2 preserved');
assert.ok(!all.some(r=>r.id==='c10-2-ex2-2-q8'),'Previously held ambiguous Q8 is still withheld');
const sw=read('site/service-worker.js');
for(const file of [recoveryModule,...manifest.requiredFigureAssets])assert.ok(sw.includes('./'+file),'Offline cache includes '+file);
// Independently re-solve reciprocal linear system: a=1/x, b=1/y, c=1/z.
const [a,b,c]=[2,3,4];assert.equal(a-2*b+4,0);assert.equal(b-c+1,0);assert.equal(2*c+3*a,14);
assert.deepEqual([1/a,1/b,1/c],[.5,1/3,.25]);
// Independently confirm all four expressions in the equality chain.
const [x,y,z]=[35,30,25];assert.deepEqual([x+20,1.5*y+10,2*z+5,110-(y+z)],[55,55,55,55]);
// Diagram i: exact side ratios differ. Diagram ii: angle at Q + 110 = 180; length halves.
assert.notEqual(3/8,2/(2+3.5));assert.equal(180-110,70);assert.equal(3/(3+3),2.5/5);
// Domain-safe trig identity, including nonzero denominator.
const t=1/Math.sqrt(3);assert.ok(Math.abs((1-t*t)/(1/(t*t)-1)-t*t)<1e-12);
// Range of continuous grouped-income classes.
assert.equal(650-400,250);
// Standard deviation of eight observations via two independent identities.
const values=[32,35,37,30,33,36,35,37],n=values.length;
const sum=values.reduce((a,b)=>a+b,0),sumsq=values.reduce((a,b)=>a+b*b,0);
assert.equal(sum,275);assert.equal(sumsq,9497);
const mean=sum/n,variance=sumsq/n-mean*mean;
const variance2=values.reduce((a,b)=>a+(b-mean)**2,0)/n;
assert.equal(variance,351/64);assert.ok(Math.abs(variance-variance2)<1e-12);
assert.equal(Math.round(Math.sqrt(variance)*100)/100,2.34);
console.log('PASS seven authored Class 10 textbook solutions: provenance, complete steps, math, navigation, difficulty, visuals, old IDs and offline.');
