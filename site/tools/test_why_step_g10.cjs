'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
const html=read('site/index.html'),sw=read('site/service-worker.js');
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>'site/'+m[1]);
const context={window:{},console};vm.createContext(context);
for(const file of scripts)vm.runInContext(read(file),context,{filename:file,timeout:10000});
const lessons=new Map(context.window.TRIGGLE_CLASSES[10].items.map(item=>[item.id,item]));
const hints=context.window.TriggleWhyStepG10.hints,ids=Object.keys(hints);
assert.ok(lessons.size>=136,'Grade 10 baseline authored catalogue');
assert.equal(ids.length,136,'Every existing authored Grade 10 problem has a curated, source-matched bridge');
const pages=['data/why-step-g10.js','data/why-step-g10-coverage.js','assets/why-step-g10.js','assets/why-step-g10.css'];
for(const asset of pages){assert.ok(html.includes('./'+asset),'HTML missing '+asset);assert.ok(sw.includes('./'+asset),'Offline cache missing '+asset);}
assert.ok(html.indexOf('data/why-step-g10.js')<html.indexOf('data/why-step-g10-coverage.js'),'Base must load before extension');
assert.ok(html.indexOf('data/why-step-g10-coverage.js')<html.indexOf('assets/app.js'),'Extension must load before first render');
assert.equal(context.window.TriggleWhyStepG10.review.ta,'editorial-pending');
const katex=require('../assets/vendor/katex/katex.min.js');
const chapters=new Set();let total=0,withVisual=0;
for(const id of ids){
 const item=lessons.get(id);assert.ok(item,'Unknown Class 10 item '+id);
 assert.equal(item.classNum,10);
 chapters.add(String(item.chapter));
 const entries=Array.isArray(hints[id])?hints[id]:[hints[id]];
 assert.ok(entries.length>=1&&entries.length<=3,'Keep disclosure sparse '+id);
 const seenSteps=new Set();
 for(const entry of entries){
  assert.ok(Number.isInteger(entry.step)&&entry.step>=0&&entry.step<item.steps.length,'Bad step index '+id);
  assert.ok(!seenSteps.has(entry.step),'Do not double-attach to a step '+id);
  seenSteps.add(entry.step);
  assert.ok(entry.expected.length>=10&&item.steps[entry.step].en.includes(entry.expected),'Stale explanation '+id);
  for(const lang of ['en','ta']){
   assert.ok(typeof entry[lang]==='string'&&entry[lang].length>=35,'Missing '+lang+' note '+id);
   assert.ok(!/<[A-Za-z][^>]*>/.test(entry[lang]),'No HTML tags in hint '+id);
  }
  if(entry.math){
   assert.equal(entry.math.display,true);
   assert.ok(entry.math.latex&&entry.math.fallback);
   const formula=katex.renderToString(entry.math.latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error'});
   assert.ok(formula.includes('<math')&&formula.includes('katex'),'Math markup failed '+id);
  }
  if(entry.diagram){
   const v=entry.diagram;
   assert.ok(['grid','venn','mapping','flow','triangle','interval'].includes(v.type),'Unknown drawing '+id);
   if(v.type==='grid')assert.ok(v.rows.length&&v.cols.length);
   if(v.type==='venn')assert.ok(v.both.length,'No overlap shown '+id);
   if(v.type==='mapping')assert.ok(v.pairs.length>=2);
   if(v.type==='flow')assert.ok(v.nodes.length>=2);
   if(v.type==='interval')assert.ok(Number(v.start)<Number(v.mid)&&Number(v.mid)<Number(v.end));
   withVisual++;
  }
  total++;
 }
}
assert.deepEqual([...chapters].sort(),['1','2','3','4','5','6','8'],'No fabricated Grade 7 questions');
const q4=hints['c10-1-ex1-1-q4'];
assert.ok(Array.isArray(q4)&&q4.length===2,'Screenshot question must have TWO source-specific explanations');
assert.equal(q4[0].step,0);assert.equal(q4[0].diagram.type,'grid');
assert.deepEqual(Array.from(q4[0].diagram.rows),['5','6']);
assert.deepEqual(Array.from(q4[0].diagram.cols),['5','6']);
assert.equal(q4[1].step,1);assert.equal(q4[1].diagram.type,'venn');
assert.deepEqual(Array.from(q4[1].diagram.both),['5','6']);
const source=read('site/assets/why-step-g10.js');
assert.ok(source.includes('triggle:lessonchange')&&source.includes('original.en.includes(hint.expected)'),'Stale source guard is mandatory');
assert.ok(source.includes("document.createElementNS")&&source.includes("details"),'Native accessible diagrams/disclosures required');
assert.ok(withVisual>=18,'Expected useful diagrams across the selected mathematical concepts');
console.log('PASS Class 10 Why: '+ids.length+' questions, '+total+' source-matched explanations, '+withVisual+' optional diagrams, '+chapters.size+' authored chapters, bilingual and no unverified maths alteration.');
