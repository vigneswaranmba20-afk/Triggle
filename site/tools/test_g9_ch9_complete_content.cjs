'use strict';
// Content/math checks only. No Playwright or visual UI testing in this test.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const paths=[
 'data/class-9.js','data/curriculum.js',
 'data/textbook-exercises/g9-ch9-ex9-1-en.js',
 'data/textbook-exercises/g9-ch9-ex9-2-en.js',
 'data/textbook-exercises/g9-ch9-ex9-2-q5-ex9-3-en.js',
 'data/textbook-exercises/g9-ch9-ex9-1-q9-q10-and-examples-en.js',
 'data/g9-textbook-activities.js','data/g9-probability-chapter.js'
];
const ctx={window:{}};
for(const p of paths)vm.runInNewContext(fs.readFileSync(path.join(root,p),'utf8'),ctx,{filename:p});
const items=ctx.window.TRIGGLE_CLASSES[9].items;
const chapter=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch9');
const exercises=items.filter(x=>/^g9-ch9-ex9\.[123]-q\d+$/.test(x.id));
const examples=items.filter(x=>/^g9-ch9-example-9\.[1-5]$/.test(x.id));
assert.equal(exercises.length,25,'Exercise 9.1 has 10, 9.2 has 5, 9.3 has 10');
assert.equal(examples.length,5,'Every source example 9.1–9.5 must be present');
assert.equal(new Set([...exercises,...examples].map(x=>x.id)).size,30,'No duplicate IDs');
const record=new Map([...exercises,...examples].map(x=>[x.id,x]));
for(const [ex,total] of [['9.1',10],['9.2',5],['9.3',10]])for(let n=1;n<=total;n++){
 const item=record.get('g9-ch9-ex'+ex+'-q'+n);
 assert.ok(item,'Missing Exercise '+ex+' Q'+n);
 assert.ok(item.q.en.length>10&&item.answer.length>0&&item.steps.length>=3,'Missing worked solution '+item.id);
 assert.equal(item.sourceFidelity.tamilEditorial,'pending');
 assert.ok(chapter.textbookQuestionIds.includes(item.id));
}
for(let n=1;n<=5;n++){
 const item=record.get('g9-ch9-example-9.'+n);
 assert.ok(item,'Missing original worked Example 9.'+n);
 assert.match(item.label.en,/^Example 9\./);
 assert.ok(item.steps.length>=3);
}
assert.equal(record.get('g9-ch9-ex9.1-q9').answer,'[[3|4]]');
assert.equal(record.get('g9-ch9-ex9.2-q3').answer,'x = [[15|8]]');
assert.equal(record.get('g9-ch9-example-9.4').answer,'[[9|100]] = 0.09');
assert.equal(record.get('g9-ch9-ex9.2-q5').answer.includes('[[43|75]]'),true);
for(const i of [9,10]){
 const d=record.get('g9-ch9-ex9.1-q'+i).diagram;
 assert.equal(d.kind,'probability-spinner');assert.deepEqual(Array.from(d.sectors),[1,2,3,4,5,6,7,8]);
}
assert.equal(ctx.window.TRIGGLE_PROB_PATH.stages.length,5,'All five numbered chapter concepts');
assert.equal(ctx.window.TRIGGLE_TEXTBOOK_TASKS['g9-ch9'].length,7,'3 activities + 2 thinking corners + 2 progress checks');
assert.equal(6/8,3/4);assert.equal(250/1500,1/6);assert.equal(860/1500,43/75);assert.equal(20/1500,1/75);
assert.ok(Math.abs((1-91/100)-9/100)<1e-12);assert.equal(10/20,0.5);assert.equal(233+106<=1184,true);
const key=[4,2,1,4,1,4,4,4,1,2];for(let n=1;n<=10;n++)assert.ok(record.get('g9-ch9-ex9.3-q'+n).answer.startsWith('('+key[n-1]+')'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const p of paths.slice(2))assert.ok(html.includes('./'+p),'Missing module script registration '+p);
const cache=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const p of paths.slice(2))assert.ok(cache.includes('./'+p),'Missing offline cache registration '+p);
console.log('PASS: Grade 9 Probability English textbook content: 25 exercises, 5 worked examples, 5 concepts, 7 activities/checks, math and source registrations.');
