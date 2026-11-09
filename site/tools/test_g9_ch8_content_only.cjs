'use strict';
// Math/data validation only: intentionally no browser or UI checks.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');const chapter={id:'g9-ch8',textbookQuestionIds:[]};const window={TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[chapter]}]}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch8-ex8-1-en.js'),'utf8'),{window});
const a=window.TRIGGLE_CLASSES[9].items,b=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g9-ch8-ex8-1-en.json'),'utf8')).items;
assert.equal(a.length,8);assert.equal(b.length,8);assert.equal(chapter.textbookQuestionIds.length,8);
for(let i=0;i<8;i++){assert.equal(a[i].id,b[i].id);assert.equal(a[i].q.en,b[i].q);assert.equal(a[i].answer,b[i].answer);assert.ok(a[i].steps.length>=3);assert.equal(a[i].sourceFidelity.status,'pdf-text-checked-en-visual-pending')}
assert.equal(189/7,27);assert.equal(240-56-68-72,44);
assert.equal((10*75+12*60+8*40+3*30)/33,1880/33);
assert.equal((145+148+142+141+139+140)/6,142.5);
assert.equal((610+20*20)/(30+20),20.2);assert.equal(2010/50,40.2);
assert.equal(1845/63,205/7);assert.equal(3050/105,610/21);
console.log('PASS: Grade 9 Ex8.1 (8 questions) arithmetic and 2025 source records; UI deferred.');
