'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {loadHints}=require('./test_g10_frontier_numbers_hints.cjs');

const chapters={3:['algebra',12],4:['geometry',40],6:['trig',68],7:['mensuration',62],8:['statistics',76]};
const root=path.resolve(__dirname,'..');
const file=(chapter)=>'g10-frontier-'+chapters[chapter][0]+'-hints.js';

function chapterHints(chapter){
  const window=loadHints();
  window.TriggleG10AlgebraTamil?.(window.TRIGGLE_CLASSES[10].items);
  window.TriggleG10GeometryTamil?.(window.TRIGGLE_CLASSES[10].items);
  const set=Object.entries(window.TriggleG10FrontierHints).filter(([id])=>id.startsWith('c10-'+chapter+'-'));
  assert.equal(set.length,chapters[chapter][1]);
  const byId=new Map(window.TRIGGLE_CLASSES[10].items.map(item=>[item.id,item]));
  for(const [id,hint] of set) {
    const item=byId.get(id);
    assert(item&&item.steps[hint.step].en.includes(hint.expected),id);
    assert(item.steps[hint.step].ta&&hint.en&&hint.ta,id+' uses bilingual working and explanation');
    assert.notEqual(hint.en,item.steps[hint.step].en);
    assert.match(hint.ta,/\p{Script=Tamil}/u);
  }
  assert(fs.readFileSync(path.join(root,'service-worker.js'),'utf8').includes('./data/'+file(chapter)));
  return set;
}

if(require.main===module){
  for(const chapter of Object.keys(chapters)) {
    if(!fs.existsSync(path.join(root,'data',file(chapter))))continue;
    console.log('Grade 10 Chapter '+chapter+': '+chapterHints(chapter).length+' bilingual explanations match their current solution steps.');
  }
}
module.exports={chapterHints};
