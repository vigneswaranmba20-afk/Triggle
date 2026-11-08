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

// Regression: a quiz card must contain the sets it needs, even when the lesson
// explanation is off-screen on a mobile device.
const questionById=Object.fromEntries(book.stages.map(stage=>[stage.id,stage]));
for(const id of ['operations','demorgan']){
  const stage=questionById[id];
  for(const lang of ['en','ta']){
    const question=stage.question[lang];
    for(const name of (id==='demorgan'?['U','A','B']:['A','B']))
      assert(question.includes(name+'={'),id+' '+lang+' must define '+name+' within the question');
    assert(!/sets above|for these sets|மேற்கண்ட கணங்களுக்கு|இந்தக் கணங்களில்/i.test(question),
      id+' '+lang+' must not rely on context above the card');
  }
}
const givenSet=(question,name)=>{
  const match=question.match(new RegExp('\\b'+name+'=\\{([^}]+)\\}'));
  assert(match,'Explicit '+name+' set');
  return new Set(match[1].split(',').map(Number));
};
const operations=questionById.operations;
const OA=givenSet(operations.question.en,'A');
const OB=givenSet(operations.question.en,'B');
const intersection=[...OA].filter(value=>OB.has(value)).sort((a,b)=>a-b);
assert.equal(operations.choices[operations.correct].en,'{'+intersection.join(', ')+'}',
  'Operation answer must match the sets printed on the question');
const demorgan=questionById.demorgan;
const universe=givenSet(demorgan.question.en,'U');
const DA=givenSet(demorgan.question.en,'A');
const DB=givenSet(demorgan.question.en,'B');
const outside=[...universe].filter(value=>!DA.has(value)&&!DB.has(value)).sort((a,b)=>a-b);
for(const lang of ['en','ta'])
  assert.equal(demorgan.choices[demorgan.correct][lang],'{'+outside.join(', ')+'}',
    'De Morgan answer must match the sets printed in '+lang);

const extra=book.extraPractice;
assert.equal(extra.length,7,'One independent follow-up question per section');
assert.deepEqual(Array.from(extra.map(x=>x.stageId)),ids);
for(const item of extra){
  assert.equal(item.choices.length,3,'Three answer choices '+item.stageId);
  assert(item.correct>=0&&item.correct<item.choices.length,'Valid extra answer '+item.stageId);
  for(const lang of ['en','ta']){
    assert(item.question[lang]&&item.hint[lang]&&item.why[lang],'Bilingual follow-up '+item.stageId+' '+lang);
    assert(item.choices.every(x=>x[lang]),'Bilingual choices '+item.stageId+' '+lang);
  }
}
assert.equal(extra.find(x=>x.stageId==='types').correct,1,'Empty set is proper subset of nonempty set');
assert.equal(extra.find(x=>x.stageId==='demorgan').correct,1,'De Morgan second law');
assert.equal(21+18+17-7-6-5+2,40,'Three-set union checked independently');
assert.equal(50-40,10,'Complement in the universe of 50');
assert.equal(extra.find(x=>x.stageId==='cardinality').correct,1,'Correct three-set answer index');
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
assert(engine.includes('data-extra-practice')&&engine.includes('data-extra-answers'),'Extra practice is rendered and answered locally');
assert(engine.includes('localStorage')&&engine.includes('sp2-paper')&&engine.includes('data-hard-next'),'Offline progress, paper tasks and staged explanation included');
console.log('PASS: seven bilingual Grade 9 sections, page crosswalk, arithmetic, offline delivery and staged advanced reasoning');
