'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
const html=read('site/index.html'),sw=read('site/service-worker.js');
const files=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>'site/'+m[1]);
const context={window:{},console};vm.createContext(context);
for(const file of files)vm.runInContext(read(file),context,{filename:file,timeout:10000});
vm.runInContext(read('site/data/why-step-g10.js'),context,{filename:'why-step-g10.js'});
const lessons=new Map(context.window.TRIGGLE_CLASSES[10].items.map(item=>[item.id,item]));
const h=context.window.TriggleWhyStepG10.hints,ids=Object.keys(h);
assert.ok(ids.length>=35,'At least 35 curated explanations across the grade');
const coverage=new Set();
const katex=require('../assets/vendor/katex/katex.min.js');
for(const id of ids){
 const hint=h[id],item=lessons.get(id);
 assert.ok(item,'A hint may only attach to an existing Class 10 question: '+id);
 assert.equal(item.classNum,10,'Never mutate other grades: '+id);
 assert.ok(Number.isInteger(hint.step)&&hint.step>=0&&hint.step<item.steps.length,'Invalid step index '+id);
 assert.ok(item.steps[hint.step].en.includes(hint.expected),'Source edit invalidates hint '+id);
 for(const lang of ['en','ta']){
  assert.ok(typeof hint[lang]==='string'&&hint[lang].trim().length>30,'Incomplete '+lang+' bridge '+id);
  assert.ok(!/<[^>]*>/.test(hint[lang]),'No raw markup in explanation '+id);
 }
 if(hint.math) {
  assert.equal(hint.math.display,true,'Display math must be explicit');
  assert.ok(hint.math.fallback&&hint.math.latex,'Math requires accessible source fallback');
  const rich=katex.renderToString(hint.math.latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error',macros:{}});
  assert.ok(rich.includes('katex')&&rich.includes('<math'),'Invalid semantic KaTeX '+id);
 }
 coverage.add(item.chapter);
}
assert.deepEqual([...coverage].sort(),['1','2','3','4','5','6','8'],'Only currently authored Grade 10 chapters');
assert.equal(context.window.TriggleWhyStepG10.review.ta,'editorial-pending','Do not imply teacher-certified Tamil');
for(const asset of ['data/why-step-g10.js','assets/why-step-g10.js','assets/why-step-g10.css']){
 assert.ok(html.includes('./'+asset),'Index missing '+asset);
 assert.ok(sw.includes('./'+asset),'Offline cache missing '+asset);
}
assert.ok(html.indexOf('assets/why-step-g10.js')<html.indexOf('assets/app.js'),'Listener must mount before first lesson render');
const module=read('site/assets/why-step-g10.js');
assert.ok(module.includes('triggle:lessonchange')&&module.includes('original.en.includes(hint.expected)'),'No generic, stale or incorrect fallback hint');
assert.ok(module.includes('document.createElement(\'details\')')&&module.includes('textContent='),'Accessible native disclosure and text-safe hints required');
console.log('PASS Class 10 Why: '+ids.length+' exact-step original bilingual bridges across '+coverage.size+' active chapters, source guards, offline assets, KaTeX and untouched authored maths.');
