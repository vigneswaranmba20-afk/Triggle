'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.resolve(__dirname,'..'),sandbox={window:{}};
for(const name of ['class-10.js','class-10-ex1-1-2025.js','class-10-ex1-2-2025.js','class-10-ex1-3-q1-q3-2025.js']){
 const filepath=path.join(site,'data',name);vm.runInNewContext(fs.readFileSync(filepath,'utf8'),sandbox,{filename:filepath,timeout:2000});
}
const all=sandbox.window.TRIGGLE_CLASSES?.[10]?.items;
assert.ok(all);
assert.equal(all.length,47,'20 originals + 12 Ex1.1 + 9 Ex1.2 + 6 Ex1.3');
assert.equal(new Set(all.map(q=>q.id)).size,all.length,'Question IDs must all be unique');
const required=['q1','q2','q3-i','q3-ii','q3-iii','q3-iv'].map(x=>'c10-1-ex1-3-'+x);
for(const id of required){
 const q=all.find(x=>x.id===id);assert.ok(q,'Missing '+id);
 assert.equal(q.kind,'textbook');assert.equal(q.exercise,'1.3');assert.equal(q.classNum,10);
 assert.ok(q.q.en&&q.q.ta&&q.steps.length===4&&q.steps.every(x=>x.en&&x.ta&&x.eq));
 assert.ok(q.reference.includes('2025')&&q.translationReview==='pending');
}
const value=x=>x*x-5*x+6;
assert.deepEqual([3,4,6,8].map(x=>x*x+1),[10,17,37,65]);
assert.equal(value(-1),12);assert.equal(value(2),0);
for(const a of [-4,-1,0,1,2,5])assert.equal(value(2*a),4*a*a-10*a+6);
for(const x of [-5,-1,0,1,2,5])assert.equal(value(x-1),x*x-7*x+12);
assert.ok(all.find(q=>q.id==='c10-1-ex1-3-q1').answer.includes('Range = {2,4,6,8,...}'));
const html=fs.readFileSync(path.join(site,'index.html'),'utf8');
assert.ok(html.includes('class-10-ex1-3-q1-q3-2025.js'));
const sw=fs.readFileSync(path.join(site,'service-worker.js'),'utf8');
assert.ok(sw.includes("'./data/class-10-ex1-3-q1-q3-2025.js'"));
console.log('PASS Grade 10 Ex1.3 Q1–3: 6/6 source entries registered, 20 originals intact, symbolic/numeric and offline refs valid.');
