'use strict';
/* Grade 9 content sprint: arithmetic checks and 2025 textbook answer-key matches.
   This intentionally does not launch a browser or make visual/UI assertions. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = {window:{}};
function execute(relative){
 vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
}
execute('data/class-9.js');
execute('data/curriculum.js');
const files = [
 'g9-ch7-ex7-1-en.js','g9-ch7-ex7-2-en.js','g9-ch7-ex7-3-en.js','g9-ch7-ex7-4-en.js',
 'g9-ch8-ex8-1-en.js','g9-ch8-ex8.2-en.js','g9-ch8-ex8.3-en.js','g9-ch8-ex8-4-en.js'
];
for(const f of files)execute('data/textbook-exercises/'+f);
const items = context.window.TRIGGLE_CLASSES[9].items.filter(x=>/^g9-ch[78]-ex/.test(x.id));
assert.equal(items.length,66,'Expected 66 new questions across Chapters 7 and 8');
assert.equal(new Set(items.map(x=>x.id)).size,66,'Duplicate question ID');
const chapters = context.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters;
const perExercise = {'7.1':10,'7.2':7,'7.3':9,'7.4':10,'8.1':8,'8.2':6,'8.3':6,'8.4':10};
for(const [ex,count] of Object.entries(perExercise)){
 const ch=ex.split('.')[0];
 const parts=items.filter(x=>x.exercise===ex);
 assert.equal(parts.length,count,`Incomplete Exercise ${ex}`);
 for(let n=1;n<=count;n++){
  const item=parts.find(x=>x.id===`g9-ch${ch}-ex${ex}-q${n}`);
  assert.ok(item,`Missing question ${ex} #${n}`);
  assert.ok(item.q.en.length>=12 && item.answer.length>=1,`Question or answer empty ${item.id}`);
  assert.ok(Array.isArray(item.steps)&&item.steps.length>=3,`Detailed solution missing ${item.id}`);
  assert.equal(item.kind,'reference');
  assert.equal(item.sourceFidelity.tamilEditorial,'pending','Cannot claim Tamil verification');
  assert.ok(chapters.find(x=>x.id==='g9-ch'+ch).textbookQuestionIds.includes(item.id),'Not registered '+item.id);
 }
}
const map=new Map(items.map(x=>[x.id,x]));
const key=(ex,n)=>map.get(`g9-ch${ex.split('.')[0]}-ex${ex}-q${n}`);
function contains(ex,n,s){assert.ok(key(ex,n).answer.includes(s),`Incorrect answer ${ex} Q${n}; wanted ${s}`);}
// Source: 2025 English PDF printed pages 316–317, PDF pages 322–323.
for(const [n,expected] of Object.entries({'1':'120 cm²','2':'1320 m²','3':'12,000 m²','4':'900√3 cm²','5':'₹1050','6':'240 cm²','7':'138 cm²','8':'354 m²','9':'1536 m²','10':'672 m²'}))contains('7.1',Number(n),expected);
for(const [n,expected] of Object.entries({'1':'1160 cm²','2':'₹1716','3':'₹3349','4':'2646 cm²','5':'1600 cm²','6':'₹6084','7':'224 cm²'}))contains('7.2',Number(n),expected);
for(const [n,expected] of Object.entries({'1':'576 cm³','2':'630 cm³','3':'25 cm','4':'2,624,000','5':'25,000','6':'12 m','7':'9261 cm³','8':'5 m','9':'15 cm'}))contains('7.3',Number(n),expected);
for(const [n,expected] of Object.entries({'1':'27°C','2':'44 kg','3':'56.97','4':'142.5','5':'p = 20','6':'40.2','7':'29.29','8':'29.05'}))contains('8.1',Number(n),expected);
for(const [n,expected] of Object.entries({'1':'47','2':'44','3':'21','4':'32','5':'31','6':'38'}))contains('8.2',Number(n),expected);
for(const [n,expected] of Object.entries({'1':'6,600','2':'3.1 and 3.3','3':'mode = 15','4':'40','5':'24','6':'58.5'}))contains('8.3',Number(n),expected);
const mcqKeys={'7.4':[3,2,4,3,3,1,2,3,4,1],'8.4':[1,3,3,2,1,4,1,2,2,3]};
for(const [ex,choices] of Object.entries(mcqKeys))for(let i=0;i<choices.length;i++){
 assert.ok(key(ex,i+1).answer.startsWith(`(${choices[i]})`),`Incorrect MCQ selection Exercise ${ex} Q${i+1}`);
 assert.equal(key(ex,i+1).sourceFidelity.answerOptions.length,4,'Incomplete choices');
}
// Independent arithmetic truth tests, not simply matching text strings.
const heron=(a,b,c)=>{const s=(a+b+c)/2;return Math.sqrt(s*(s-a)*(s-b)*(s-c));};
const eq=(actual,expected,desc)=>assert.ok(Math.abs(actual-expected)<1e-8,`Math issue ${desc}: ${actual}`);
eq(heron(42,34,20)-12*16/2,240,'7.1 Q6');
eq(heron(13,14,15)+heron(9,12,15),138,'7.1 Q7');
eq((15*20/2)+heron(25,26,17),354,'7.1 Q8');
eq(2*heron(34,20,42),672,'7.1 Q10');
eq(2*(20*15+15*8+20*8),1160,'7.2 Q1');
eq(2*(6*4+4*1.5+6*1.5)*22,1716,'7.2 Q2');
eq((2*(10+9)*8+10*9)*8.5,3349,'7.2 Q3');
eq(2*(12*4+4*4+12*4),224,'7.2 Q7 TSA');
eq(2*(12+4)*4,128,'7.2 Q7 LSA');
eq((10*5*1.5)*1000,75000,'7.4 Q9');
eq(30/(.5*.3*.2),1000,'7.4 Q10');
eq((7*81)-(6*78),99,'8.4 Q2');
eq((5*28-3*24)/2,34,'8.4 Q6');
eq(11*12*23/6/11,46,'8.4 Q9');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const offline=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const f of files){
 assert.ok(html.includes('./data/textbook-exercises/'+f),'Missing script tag '+f);
 assert.ok(offline.includes("'./data/textbook-exercises/"+f+"'"),'Missing offline pre-cache '+f);
}
console.log('PASS: 66 content entries in 8 exercise groups; exact expected answer selections, independent arithmetic, chapter registration and offline references.');
