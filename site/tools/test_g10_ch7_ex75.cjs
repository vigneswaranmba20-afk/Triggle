'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),ctx={window:{}};
for(const f of ['data/class-10.js','data/curriculum.js','data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js','data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js','data/textbook-exercises/g10-ch7-ex7-2.js','data/textbook-exercises/g10-ch7-ex7-3.js','data/textbook-exercises/g10-ch7-ex7-4.js','data/textbook-exercises/g10-ch7-ex7-5.js','data/problem-difficulty.js'])vm.runInNewContext(read(f),ctx,{filename:f,timeout:15000});
const manifest=JSON.parse(read('data/textbook-fidelity/g10-ch7-ex7-5.json')),grade=ctx.window.TRIGGLE_CLASSES[10],ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>c.number===7);
const expectedEn='DAABCBBCCADAABD'.split(''),expectedTa=['ஈ','அ','அ','ஆ','இ','ஆ','ஆ','இ','இ','அ','ஈ','அ','அ','ஆ','ஈ'];
const flatten=a=>a.map(x=>typeof x==='string'?x:x.fallback).join('');
const checkMath=(a)=>{for(const m of a)if(m&&typeof m==='object'){assert.ok(m.fallback&&m.latex);katex.renderToString(m.latex,{throwOnError:true,strict:'error'});}};
const entries=grade.items.filter(e=>e.chapter==='7'&&e.exercise==='7.5');
assert.equal(entries.length,15);assert.equal(manifest.items.length,15);assert.equal(manifest.optionCount,60);
for(let i=0;i<15;i++){
 const id='c10-7-ex7-5-q'+(i+1),e=entries[i],f=manifest.items[i];
 assert.equal(e.id,id);assert.equal(f.id,id);assert.equal(grade.items.filter(x=>x.id===id).length,1);assert.equal(ch.textbookQuestionIds.filter(x=>x===id).length,1);
 assert.equal(e.correctOption.en,expectedEn[i]);assert.equal(e.correctOption.ta,expectedTa[i]);assert.equal(f.answerKey.en,expectedEn[i]);assert.equal(f.answerKey.ta,expectedTa[i]);
 for(const lang of ['en','ta']){
   const labels=lang==='en'?['A','B','C','D']:['அ','ஆ','இ','ஈ'];
   assert.equal(e.q[lang],f.textbookPrompt[lang]);assert.equal(flatten(e.questionMath[lang]),e.q[lang]);
   const options=e.q[lang].split('\n').slice(1);assert.equal(options.length,4);
   for(let k=0;k<4;k++)assert.ok(options[k].startsWith('('+labels[k]+') '));
   checkMath(e.questionMath[lang]);checkMath(e.answerMath[lang]);
   assert.equal(flatten(e.answerMath[lang]),lang==='en'?e.answer:e.answerTa);
   assert.equal(e.sourceFidelity.sourcePdfPage[lang],f.sourcePages[lang].pdf);
   assert.equal(e.sourceFidelity.sourcePdfPage[lang],(i<6?303:304)+(lang==='ta'?8:0));
 }
 assert.match(e.q.ta,/[\u0B80-\u0BFF]/);assert.equal(e.review.tamilEditorial,'pending');assert.ok(ctx.window.TriggleDifficulty.entries[id]);assert.ok(!e.figureSrc);
 assert.ok(e.steps.length>=1);
 for(const s of e.steps){assert.ok(s.en);assert.match(s.ta,/[\u0B80-\u0BFF]/);if(s.math)checkMath([s.math]);else assert.equal(id,'c10-7-ex7-5-q11');}
}
const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
eq(8*Math.hypot(8,15),136);eq(2*2,4);eq(Math.sqrt(13**2-5**2),12);eq((1/2)**2,1/4);
eq(2*(1/3)*(1/3+1),8/9);eq(20*14*4,1120);eq(3**2*2,18);eq(2+1,3);
eq((4/3)/(1/3),4);eq(16*(20**2+20*8+8**2)/3,3328);
assert.equal(expectedEn[10],'D');eq(Math.cbrt(8),2);eq(4/3*Math.min(1,5/2)**3,4/3);eq(1-1/2,1/2);
eq(2/(2/3),3);eq((4/3)/(2/3),2);
assert.match(read('index.html'),/g10-ch7-ex7-5\.js/);assert.match(read('service-worker.js'),/g10-ch7-ex7-5\.js/);
console.log('PASS Exercise 7.5: 15 IDs, 60 choices in both languages, exact key mapping, structured formulas, registration and independent geometry arithmetic.');
