#!/usr/bin/env node
'use strict';
// Source-reconciled Grade 9 Real Numbers (2025 revised EN/TA): non-destructive release gate.
// The mathematical assertions below use independently evaluated identities/numerics,
// not the lesson's own stored worked steps.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const code=p=>fs.readFileSync(path.join(root,p),'utf8');
const lessons=[
 'data/real-numbers/g9-ch2-core.js',
 'data/real-numbers/g9-ch2-examples-a.js',
 'data/real-numbers/g9-ch2-examples-b.js',
 'data/real-numbers/g9-ch2-exercises-a.js',
 'data/real-numbers/g9-ch2-exercises-b.js',
 'data/real-numbers/g9-ch2-exercises-c.js',
 'data/real-numbers/g9-ch2-exercises-d.js',
 'data/real-numbers/g9-ch2-exercises-e.js',
 'data/real-numbers/g9-ch2-exercises-f.js'
];
const context={window:{}};vm.createContext(context);
for(const p of ['data/class-9.js','data/curriculum.js',...lessons]){
 vm.runInContext(code(p),context,{filename:p,timeout:2000});
}
const all=context.window.TRIGGLE_CLASSES[9].items.filter(x=>x.chapter==='2');
const book=all.filter(x=>x.kind==='textbook-example'||x.kind==='textbook-exercise');
const examples=book.filter(x=>x.kind==='textbook-example');
const exercises=book.filter(x=>x.kind==='textbook-exercise');
assert.equal(examples.length,31,'2025 printed textbook contains Examples 2.1–2.31');
assert.equal(exercises.length,120,'all 2025 textbook Exercise 2.1–2.9 subparts');
assert.equal(new Set(book.map(x=>x.id)).size,151,'duplicate lesson IDs');
for(const n of Array.from({length:31},(_,i)=>i+1)){
 assert.ok(examples.some(x=>x.id==='g9-ch2-example-'+n),'missing Example 2.'+n);
}
for(const [e,count] of Object.entries({'2.1':5,'2.2':16,'2.3':7,'2.4':3,'2.5':19,'2.6':21,'2.7':11,'2.8':18,'2.9':20})){
 assert.equal(exercises.filter(x=>x.exercise===e).length,count,'incorrect coverage for Exercise '+e);
}
const chapter=context.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===9).chapters.find(x=>x.id==='g9-ch2');
const linked=new Set(chapter.legacyQuestionIds);
for(const x of book){
 assert.ok(linked.has(x.id),x.id+': not accessible via chapter navigation');
 assert.equal(x.sourceEdition,'2025 revised',x.id+': wrong edition');
 assert.ok(x.source.includes('1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J'),x.id+': wrong EN PDF');
 assert.ok(x.tamilSource.includes('1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj'),x.id+': wrong TA PDF');
 assert.ok(Number.isInteger(x.printedPage)&&x.printedPage>=43&&x.printedPage<=76,x.id+': missing EN printed-page evidence');
 assert.ok(x.q?.en?.trim()&&x.q?.ta?.trim(),x.id+': missing bilingual prompt');
 assert.ok(typeof x.answer==='string'&&x.answer.trim(),x.id+': missing final answer');
 assert.ok(Array.isArray(x.steps)&&x.steps.length>=2,x.id+': incomplete steps');
 for(const [i,s] of x.steps.entries()){
  assert.ok(s.en?.trim()&&s.ta?.trim()&&s.eq?.trim(),x.id+': incomplete bilingual step '+i);
 }
 assert.ok(x.difficulty==='hard'||x.difficulty==='standard',x.id+': invalid difficulty');
 if(x.difficulty==='standard')assert.equal(x.detailed,null,x.id+': detailed explanations are for hard problems only');
}
for(let n=1;n<=20;n++){
 const item=exercises.find(x=>x.id==='g9-ch2-ex9-q'+n);
 assert.ok(item,'missing textbook MCQ '+n);
 for(let c=1;c<=4;c++)assert.ok(item.q.en.includes('('+c+')')&&item.q.ta.includes('('+c+')'),'MCQ '+n+' lacks choice '+c);
}
const expectedMCQ=[4,3,2,1,4,2,2,2,4,1,4,4,3,2,2,3,2,4,2,3];
for(const [n,choice] of expectedMCQ.entries())assert.ok(
 exercises.find(x=>x.id==='g9-ch2-ex9-q'+(n+1)).answer.startsWith('Option ('+choice+')'),
 'MCQ '+(n+1)+' answer differs from independent 2025 textbook/answer check'
);
function near(actual,expected,name,tol=1e-9){assert.ok(Math.abs(actual-expected)<=tol,name+': '+actual+' != '+expected);}
near((Math.sqrt(48)+Math.sqrt(32))/(Math.sqrt(27)-Math.sqrt(18)),(20+8*Math.sqrt(6))/3,'Ex2.7 Q2(i)');
near((2*Math.sqrt(6)-Math.sqrt(5))/(3*Math.sqrt(5)-2*Math.sqrt(6)),(9+4*Math.sqrt(30))/21,'Ex2.7 Q2(iii)');
near(Math.sqrt(5)/(Math.sqrt(6)+2)-Math.sqrt(5)/(Math.sqrt(6)-2),-2*Math.sqrt(5),'Ex2.7 Q2(iv)');
near(10*Math.sqrt(3)+3*Math.sqrt(10)-2*Math.sqrt(2),23.978,'Ex2.6 Q3(ii)',0.0008);
near((Math.pow(0.00003,6)*Math.pow(0.00005,4))/(Math.pow(0.009,3)*Math.pow(0.05,2)),2.5e-36,'Ex2.8 Q3(iii)',1e-45);
near(Math.pow(0.000001,11)/Math.pow(0.005,3),8e-60,'Ex2.8 Q3(ii)',1e-68);
near(Math.pow(300000,2)*Math.pow(20000,4),1.44e28,'Ex2.8 Q3(i)',1e17);
near(Math.pow(0.000729,-0.75)*Math.pow(0.09,-0.75),Math.pow(10/3,6),'Ex2.9 Q18',1e-8);
near((8-5*Math.sqrt(2))/(3-2*Math.sqrt(2)),4+Math.sqrt(2),'Ex2.7 Q5');
const html=code('index.html'),sw=code('service-worker.js');
let last=html.indexOf('./data/curriculum.js');
assert.ok(last>=0,'Curriculum must load before Real Numbers');
for(const file of lessons){
 const idx=html.indexOf('./'+file);
 assert.ok(idx>last,'bad script order / missing '+file);
 last=idx;
 assert.ok(sw.includes('./'+file),'offline cache missing '+file);
}
assert.ok(html.indexOf('./assets/app.js')>last,'app must load after complete Real Numbers dataset');
console.log('PASS: Real Numbers 31 examples, 120 exercise entries, all 20 MCQs, bilingual steps, source anchors, math spot-checks, UI script order and offline assets.');
