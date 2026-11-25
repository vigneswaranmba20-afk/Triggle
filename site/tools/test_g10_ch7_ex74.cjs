'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.resolve(__dirname,'..'), read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ctx={window:{}};
for(const file of ['data/class-10.js','data/curriculum.js','data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js','data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js','data/textbook-exercises/g10-ch7-ex7-2.js','data/textbook-exercises/g10-ch7-ex7-3.js','data/textbook-exercises/g10-ch7-ex7-4.js','data/problem-difficulty.js'])vm.runInNewContext(read(file),ctx,{filename:file,timeout:15000});
const manifest=JSON.parse(read('data/textbook-fidelity/g10-ch7-ex7-4.json'));
const all=ctx.window.TRIGGLE_CLASSES[10].items,ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>c.number===7);
const ids=Array.from({length:8},(_,i)=>'c10-7-ex7-4-q'+(i+1));
assert.equal(manifest.items.length,8);
assert.equal(all.filter(x=>x.chapter==='7'&&x.exercise==='7.4').length,8);
assert.equal(new Set(manifest.items.map(x=>x.id)).size,8);
for(const [i,id] of ids.entries()){
 const matches=all.filter(x=>x.id===id), e=matches[0], f=manifest.items[i];
 assert.equal(matches.length,1);assert.equal(ch.textbookQuestionIds.filter(x=>x===id).length,1);
 assert.equal(f.id,id);assert.equal(e.sourceFidelity.status,'page-visual-checked');
 for(const lang of ['en','ta']){
  assert.equal(e.q[lang],f.textbookPrompt[lang]);assert.equal(e.sourceFidelity.sourcePdfPage[lang],f.sourcePages[lang].pdf);
  assert.equal(f.visualStatus[lang],'page-checked');assert.ok(e.title[lang]);assert.ok(e.answerMath[lang].fallback);
  katex.renderToString(e.answerMath[lang].latex,{throwOnError:true});
 }
 assert.match(e.q.ta,/[\u0B80-\u0BFF]/);assert.ok(e.answerTa);assert.ok(e.steps.length>=3);
 for(const step of e.steps){assert.ok(step.en);assert.match(step.ta,/[\u0B80-\u0BFF]/);assert.ok(step.eq&&step.math.fallback);katex.renderToString(step.math.latex,{throwOnError:true});}
 assert.ok(ctx.window.TriggleDifficulty.entries[id]);
 assert.equal(e.review.tamilEditorial,'pending');assert.ok(!e.figureSrc);
}
assert.match(read('index.html'),/g10-ch7-ex7-4\.js/);assert.match(read('service-worker.js'),/g10-ch7-ex7-4\.js/);
const approx=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
approx(4*12**3/(3*8**2),36);
approx(50*44*0.21/((22/7)*0.07**2*15000),2);
for(let r=1;r<=10;r++)for(let x=1;x<=10;x++){const h=17/3;approx(r*r*h/3,(x*r)**2*h/(3*x*x));}
approx(7**2*8/3,4*(5**3-3**3)/3);
approx(200*150*100-(22/7)*60**2*105,1812000);
approx(2*(5**3-3**3)/(3*7**2),4/3);
approx(4*6**3/3,32*(5**2-4**2));
for(let r=1;r<=10;r++)approx(r*r*2*r/3,2*r**3/3);
console.log('PASS Grade 10 Exercise 7.4: eight unique bilingual IDs, source pages, math rendering, registration and independent calculations.');
