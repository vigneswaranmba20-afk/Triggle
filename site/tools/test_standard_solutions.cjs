'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=p=>fs.readFileSync('site/'+p,'utf8'),html=read('index.html'),ctx={window:{}};
for(const m of html.matchAll(/<script src="\.\/(data\/[^?\"]+)[^\"]*"/g))vm.runInNewContext(read(m[1]),ctx,{filename:m[1]});
const {TRIGGLE_CLASSES:classes,TriggleDifficulty:registry}=ctx.window;
const preserved=require('../../docs/standard-solution-preservation.json');
assert.match(preserved.baselineCommit,/^[a-f0-9]{40}$/);
const old={window:{}};vm.runInNewContext(fs.readFileSync('docs/history/discontinued-explanation-modes/g12-explanation-catalog.js','utf8'),old);
let count=0,reviewed=0;
for(const [grade,data] of Object.entries(classes)){
 assert.equal(JSON.stringify(data.items.map(i=>i.id)),JSON.stringify(preserved.grades[grade]),'Original ordering/IDs');
 for(const item of data.items){
  const hash=crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');
  assert.equal(hash,preserved.sha256[item.id],'Entire original question, mathematical working, notation, answer and metadata: '+item.id);
  const meta=registry.get(item);assert.ok(meta,'Explicit difficulty '+item.id);
  assert.ok(['easy','medium','difficult'].includes(meta.level));assert.ok(meta.basis&&meta.review);
  assert.equal(meta.grade,item.classNum);assert.ok(item.steps.length&&item.answer);
  if(grade==='12'){
   const prior=old.window.TriggleG12Catalog.entries[item.id];
   assert.equal(meta.level,prior.difficulty==='hard'?'difficult':prior.difficulty);
   assert.equal(JSON.stringify(meta.priorClassification),JSON.stringify(prior));reviewed++;
  }
  if(item.difficulty==='hard'){assert.equal(meta.level,'difficult');reviewed++;}
  count++;
 }
}
const classic=read('class9-classic.html');
const classicRecords=JSON.parse(classic.match(/const SOLUTIONS=(\[[^\n]+\]);/)[1]);
assert.equal(classicRecords.length,44);
for(const record of classicRecords){
 const item=classes[9].items.find(i=>i.id==='c9-'+record.id);
 assert.ok(item&&registry.get(item),'Legacy bookmark has the canonical difficulty '+record.id);
 assert.equal(item.q.en,record.prompt,'Classic question matches canonical question');
 assert.equal(item.answer,record.final,'Classic final answer matches canonical answer');
}
assert.ok(classic.includes('id="classicDifficulty"')&&classic.includes('./data/problem-difficulty.js'));
assert.equal(count,568);assert.equal(reviewed,88);assert.equal(Object.keys(registry.entries).length,count);
assert.equal(registry.get({id:'unavailable',classNum:12}),null);
assert.equal(registry.get({id:classes[12].items[0].id,classNum:11}),null);
assert.ok(registry.solutionReviews['g12-ch1-ex1.1-q8'],'Flag cofactor completeness for review');
const app=read('assets/app.js'),sw=read('service-worker.js');
assert.doesNotMatch(html+app,/g12ModeChooser|TriggleG12Explain|tabGuided|solutionModeRow|guidedDialog|role="tab(?:list|panel)?"/);
for(const file of ['g12-explain-modes.js','g12-explain-modes.css','matrix-pilot.js','deep-lessons.js','deep-experience.js','guided-lessons.js','real-numbers-deep.js']){
 assert.ok(!fs.existsSync('site/assets/'+file),'Remove orphaned '+file);
 assert.ok(!sw.includes('./assets/'+file),'Do not cache retired '+file);
}
assert.ok(sw.includes('./data/problem-difficulty.js'));
assert.ok(html.indexOf('data/problem-difficulty.js')<html.indexOf('assets/app.js'));
assert.doesNotMatch(app,/localStorage\.clear|removeItem/,'Student progress is never cleared');
console.log('PASS all 568 complete original records and ordering unchanged; 568 explicit difficulties, 88 reviewed classifications retained, no explanation switches, offline metadata.');
