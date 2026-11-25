'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=name=>fs.readFileSync(path.resolve(__dirname,'..',name),'utf8');

function loadHints(){
  const context={window:{}};
  const index=read('index.html');
  for(const [ ,file] of index.matchAll(/<script src="\.\/(data\/[^?"]+)[^"]*"/g)) {
    vm.runInNewContext(read(file),context,{filename:file});
  }
  return context.window;
}

function check(){
  const w=loadHints();
  const entries=Object.entries(w.TriggleG9FrontierHints);
  assert.equal(entries.length,21);
  assert.equal(entries.filter(([id])=>id.startsWith('g9-ch3-')).length,14);
  assert.equal(entries.filter(([id])=>id.startsWith('g9-ch5-')).length,7);
  for(const [id,hint] of entries) {
    const row=w.TriggleG9Ch5Overrides.get(id)||w.TRIGGLE_CLASSES[9].items.find(q=>q.id===id);
    assert(row.steps[hint.step].en.includes(hint.expected),id);
    assert(row.q.en&&row.q.ta);
    assert.match(hint.ta,/\p{Script=Tamil}/u);
    assert(hint.en.length>50&&hint.ta.length>50);
    assert.notEqual(hint.en,row.steps[hint.step].en);
  }
  assert(read('service-worker.js').includes('./data/why-step-g9-frontier.js'));
  console.log('Grade 9 why-step explanations: 21 stable Algebra and Coordinate Geometry IDs, exact step anchors, and offline registration.');
}

if(require.main===module)check();
module.exports={loadHints};
