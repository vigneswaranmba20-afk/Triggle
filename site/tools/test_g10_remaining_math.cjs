'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const katex=require('../assets/vendor/katex/katex.min.js');
const n={window:{katex}};vm.runInNewContext(read('assets/math-notation.js'),n);
const render=n.window.TriggleNotation.render;
const sourceFiles=[
 'data/class-10.js',
 'data/textbook-exercises/g10-ch2-ex2-1-en.js',
 'data/textbook-exercises/g10-ch2-ex2-2-en.js',
 'data/textbook-exercises/g10-checkpoint-20261110-en.js'
];
function extract(path){
 const source=read(path);
 if(path==='data/class-10.js'){
  const raw=source.slice(source.indexOf('window.TRIGGLE_CLASSES[10]=')+27).trim().replace(/;$/,'');
  return JSON.parse(raw).items;
 }
 const at=source.indexOf('const entries=')+14;assert.ok(at>13,'Missing entries '+path);
 let end=source.indexOf('];',at);
 while(end>=0){try{return JSON.parse(source.slice(at,end+1))}catch{end=source.indexOf('];',end+2)}}
 throw Error('Unable to parse '+path);
}
const records=sourceFiles.flatMap(extract),ids=records.map(r=>r.id);
assert.equal(records.length,44,'Every legacy Class 10 record in Chapters 2–8 must be annotated');
assert.equal(new Set(ids).size,44,'No duplicate legacy records');
const approvedHash=crypto.createHash('sha256').update(JSON.stringify(records)).digest('hex');
const ctx={window:{}};vm.runInNewContext(read('data/math-layout/g10-ch2-ch8-chatgpt-20261113.js'),ctx);
const layout=ctx.window.TriggleG10RemainingMath;
assert.ok(layout,'Grade 10 math display layer missing');
assert.equal(layout.ids.length,44,'All existing legacy records must be included');
assert.equal(JSON.stringify(Array.from(layout.ids).sort()),JSON.stringify(ids.sort()),'No unapproved or missing math overlays');
let steps=0,answers=0,formulas=0,fractions=0,roots=0,exponents=0;
for(const item of records){
 assert.equal(String(item.chapter)==='1',false,'Chapter 1 has its own rich maths migration');
 for(let i=0;i<item.steps.length;i++){
  const source=item.steps[i],math=layout.getStep(item,i);
  assert.equal(math.fallback,source.eq,'Original mathematical step must remain exact: '+item.id+'/'+i);
  assert.equal(math.display,true);
  assert.ok(math.latex&&math.latex.length>0);
  assert.ok(!math.latex.includes('FRAC'),'Unfinished TeX placeholder '+item.id+'/'+i);
  assert.ok(!math.latex.includes('undefined'),'Unreviewed TeX '+item.id+'/'+i);
  const html=render(math);
  assert.ok(!html.includes('data-math-error'),'Invalid TeX '+item.id+'/'+i+': '+math.latex);
  assert.ok(html.includes('<math'),'Semantic MathML required '+item.id+'/'+i);
  fractions+=(html.match(/<mfrac>/g)||[]).length;
  roots+=(html.match(/<msqrt>/g)||[]).length;
  exponents+=(html.match(/<msup>/g)||[]).length;
  steps++;formulas++;
 }
 const math=layout.getAnswer(item);
 assert.equal(math.fallback,item.answer,'Original final answer must remain exact: '+item.id);
 assert.ok(!render(math).includes('data-math-error'),'Invalid answer TeX '+item.id);
 assert.ok(render(math).includes('<math'),'Answer should use accessible MathML '+item.id);
 formulas++;answers++;
 const q=layout.getQuestion(item,'en');
 if(q){
  assert.equal(q.en.map(x=>typeof x==='string'?x:x.fallback).join(''),item.q.en,'Exact question text changed: '+item.id);
  for(const span of q.en)if(typeof span==='object'){
   assert.ok(!render(span).includes('data-math-error'),'Invalid question TeX '+item.id+': '+span.latex);
   assert.ok(render(span).includes('<math'),'Question math lacks semantic MathML '+item.id);
  }
 }
 if(item.q.ta){
  const tq=layout.getQuestion(item,'ta');
  if(tq)assert.equal(tq.ta.map(x=>typeof x==='string'?x:x.fallback).join(''),item.q.ta,'Tamil question text changed: '+item.id);
 }
}
assert.equal(steps,148,'No worked mathematical step removed');
assert.equal(answers,44);
assert.ok(formulas>=190,'Insufficient mathematical display coverage');
assert.ok(fractions>=20,'Rendered true stacked fractions must appear in statistics and trigonometry');
assert.ok(roots>=8,'Rendered radicals must be visible in height-distance trigonometry');
assert.ok(exponents>=20,'Real superscripts must be visible in powers/identities');
assert.ok(layout.questionIds.length>=25,'Formula-heavy textbook questions should be enhanced too');
assert.equal(crypto.createHash('sha256').update(JSON.stringify(records)).digest('hex'),approvedHash,'Original authored textbook records were mutated');
const outsider={id:'c10-1-ex1-1-q1-i',chapter:'1',classNum:10,steps:[],answer:'1'};
assert.equal(layout.getStep(outsider,0),null,'Never touch already migrated Chapter 1');
assert.equal(layout.getAnswer(outsider),null,'Never touch already migrated Chapter 1');
const preserved={id:'c10-8-ex8-1-q5',classNum:10,chapter:'8',steps:[],answer:'1'};
assert.equal(layout.getStep(preserved,0),null,'Retain prior rich KaTeX content without override');
const html=read('index.html'),app=read('assets/app.js'),sw=read('service-worker.js');
const module='data/math-layout/g10-ch2-ch8-chatgpt-20261113.js';
assert.ok(html.includes(module),'New module must load in student app');
assert.ok(sw.includes('./'+module),'New module must work offline');
assert.ok(html.indexOf(module)<html.indexOf('assets/app.js'),'Notation layer must load before app');
assert.ok(app.includes('TriggleG10RemainingMath?.getStep'),'Exercise steps must use new notation layer');
assert.ok(app.includes('TriggleG10RemainingMath?.getAnswer'),'Final answer must use rich notation');
assert.ok(app.includes('TriggleG10RemainingMath?.getQuestion'),'Source-exact question maths must be rendered');
console.log('PASS Grade 10 Chapters 2–8 rich maths: 44 immutable source records, 148 complete steps, 44 final answers, 29 formula-heavy questions, '+fractions+' stacked fractions, '+roots+' radicals, '+exponents+' powers, offline cache and Tamil preservation.');
