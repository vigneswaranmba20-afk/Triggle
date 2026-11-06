'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const filename=path.join(root,'data/set-language-path.js');
const source=fs.readFileSync(filename,'utf8');
const context={window:{}};
vm.runInNewContext(source,context,{filename});
const book=context.window.TRIGGLE_SET_PATH;
assert.equal(book.chapterId,'g9-ch1');
assert.equal(book.stages.length,7);
const ids=['set','forms','types','operations','properties','demorgan','cardinality'];
const sections=['1.1–1.2','1.3','1.4','1.5','1.6','1.7','1.8'];
const english=[1,3,6,12,19,24,29];
const tamil=[1,3,6,14,22,26,30];
book.stages.forEach((stage,i)=>{
  assert.equal(stage.id,ids[i]);
  assert.equal(stage.section,sections[i]);
  assert.equal(stage.page.en,english[i]);
  assert.equal(stage.page.ta,tamil[i]);
  assert.equal(stage.choices.length,3);
  assert(stage.correct>=0&&stage.correct<3,'Valid answer index for '+stage.id);
  for(const field of ['title','idea','example','question','hint','why','paper'])
    for(const lang of ['en','ta'])
      assert.equal(typeof stage[field][lang],'string',field+' '+lang+' '+stage.id);
  for(const choice of stage.choices)
    assert(choice.en&&choice.ta,'Every answer bilingual '+stage.id);
  assert(stage.rule,'Mathematical expression exists '+stage.id);
});
assert.deepEqual(Array.from(book.stages.map(x=>x.visual)),['membership','forms','types','venn','properties','demorgan','count']);
assert.equal(new Set(book.stages.map(x=>x.id)).size,7);
// Independent arithmetic reference checks for both two-set and three-set examples.
const nA=14,nB=11,overlap=6,U=30;
assert.equal(nA+nB-overlap,19);
assert.equal(U-(nA+nB-overlap),11);
assert.equal((nA-overlap)+overlap+(nB-overlap)+11,U);
const H=book.hard.answers;
const union=12+10+9-4-3-5+2;
assert.equal(union,H.atLeastOne);
assert.equal(30-union,H.none);
assert.equal((4-2)+(3-2)+(5-2),H.exactlyTwo);
assert.equal(7+3+3+2+1+3+2,union,'Seven Venn regions check');
assert.equal(book.hard.steps.length,6);
assert(book.hard.steps.every(step=>step.en&&step.ta),'Hard reasoning must be bilingual');
const engine=fs.readFileSync(path.join(root,'assets/set-language-journey.js'),'utf8');
new vm.Script(engine,{filename:'set-language-journey.js'});
assert(!/\bfetch\s*\(|XMLHttpRequest|https?:\/\//.test(engine),'All learning must work without remote APIs');
assert(engine.includes('localStorage')&&engine.includes('sp2-paper')&&engine.includes('data-hard-next'),'Offline progress, paper tasks and staged explanation included');
console.log('PASS: seven bilingual Grade 9 sections, page crosswalk, arithmetic, offline delivery and staged advanced reasoning');
