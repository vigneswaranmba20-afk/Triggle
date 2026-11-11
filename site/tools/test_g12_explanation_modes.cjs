'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const code=read('data/g12-explanation-catalog.js');
const ctx={window:{}};vm.runInNewContext(code,ctx);
const catalog=ctx.window.TriggleG12Catalog;
assert.ok(catalog);
const batchPaths=['g12-ch1-ex1-1','g12-ch1-ex1-2','g12-ch1-ex1-3'];
const authored=batchPaths.flatMap(f=>require('../../docs/curriculum/grade-12/batches/'+f+'.json').records);
const legacy=require('node:vm').runInNewContext(
  read('data/class-12.js')+';window.TRIGGLE_CLASSES[12].items;', {window:{TRIGGLE_CLASSES:{}}});
const items=[...authored,...legacy];
assert.equal(items.length,54);
assert.equal(Object.keys(catalog.entries).length,54);
assert.equal(catalog.eligibleCount,41);
let enabled=0,hidden=0;
for(const record of items){
 const meta=catalog.entries[record.id];
 assert.ok(meta,'Missing reviewed difficulty '+record.id);
 assert.ok(['easy','medium','hard'].includes(meta.difficulty));
 assert.ok(catalog.focus[meta.family],'No instructional family for '+record.id);
 assert.ok(meta.source=== (record.id.startsWith('g12-')?'audited-ch1-batch':'legacy-existing'));
 if(meta.difficulty==='easy'){hidden++;assert.equal(catalog.get(record),null);}
 else{
  enabled++;
  const focus=catalog.get(record);
  assert.ok(focus,'Eligible Grade 12 question '+record.id);
  assert.ok(focus.goal&&focus.prerequisite&&focus.watch&&focus.analogy);
  assert.equal(focus.check.choices.length,3);
  assert.ok(Number.isInteger(focus.check.correct)&&focus.check.correct>=0&&focus.check.correct<3);
  assert.ok(record.steps.length>=2);
 }
}
assert.equal(enabled,41);assert.equal(hidden,13);
assert.equal(catalog.get({classNum:11,id:authored[7].id}),null,'Other grades never get this feature');
const originalQ8=authored.find(x=>x.id==='g12-ch1-ex1.1-q8');
assert.match(originalQ8.answer,/A = ±\[\[6, 2, 1/);
assert.equal(catalog.get(originalQ8).difficulty,'hard');
assert.equal(catalog.get(authored.find(x=>x.id==='g12-ch1-ex1.1-q1-i')),null);
const index=read('index.html'),app=read('assets/app.js'),script=read('assets/g12-explain-modes.js'),sw=read('service-worker.js');
const before=(needle)=>index.indexOf(needle);
assert.ok(before('data/g12-explanation-catalog.js')<before('assets/app.js'));
assert.ok(before('assets/g12-explain-modes.js')<before('assets/app.js'));
assert.ok(index.includes('id="g12ModeChooser"'));
assert.ok(app.includes('window.TriggleG12Explain?.mount({'));
assert.ok(app.includes("if(g12Modes)$('solutionModeRow').hidden=true"));
assert.ok(sw.includes("'./data/g12-explanation-catalog.js'"));
for(const p of ['assets/g12-explain-modes.js','assets/g12-explain-modes.css'])assert.ok(sw.includes("'./"+p+"'"));
assert.ok(!/fetch\(|sendBeacon|XMLHttpRequest|analytics|localStorage|sessionStorage/i.test(script),'Modes may not transmit or track learners');
for(const s of [
 'quick.hidden=mode!==\'exam\'',
 'buildStep(step,i)',
 'result.innerHTML=answerHTML',
 'aria-selected',
 'ArrowRight',
 'ArrowLeft',
 'aria-live',
 'choose(\'exam\',false)'
])assert.ok(script.includes(s),'Missing important contract: '+s);
assert.ok(!script.includes('Math.random')&&!script.includes('eval('));
console.log('PASS 54 Grade 12 difficulties: 41 medium/hard modes and 13 easy unchanged; one canonical answer, accessible offline tabs, zero learner tracking.');
