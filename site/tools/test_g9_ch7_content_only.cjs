'use strict';
// Content-only arithmetic and registration check; no browser/UI tests.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/textbook-fidelity/g9-ch7-ex7-3-en.json'),'utf8'));
const chapter={id:'g9-ch7',textbookQuestionIds:[]};const window={TRIGGLE_CLASSES:{9:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[chapter]}]}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/textbook-exercises/g9-ch7-ex7-3-en.js'),'utf8'),{window});
const rows=window.TRIGGLE_CLASSES[9].items;
assert.equal(rows.length,9);assert.equal(chapter.textbookQuestionIds.length,9);assert.equal(data.items.length,9);
for(let i=0;i<9;i++){assert.equal(rows[i].id,data.items[i].id);assert.equal(rows[i].q.en,data.items[i].q);assert.equal(rows[i].answer,data.items[i].answer);assert.equal(rows[i].sourceFidelity.status,'pdf-text-checked-en-visual-pending');assert.ok(rows[i].steps.length>=3)}
assert.equal(12*8*6,576);assert.equal(60*25*1.5,2250);assert.equal(6*3.5*2.5*12,630);
assert.equal(25*20*15,7500);assert.equal(20.5*16*8*1000,2624000);
assert.equal((2000*48*600)/(24*12*8),25000);assert.equal(1440/(15*8),12);
assert.equal(5**3,125);assert.equal(3.5**3,42.875);assert.equal(21**3,9261);
assert.equal(Math.cbrt(125),5);assert.equal(15**3/(25*9),15);
console.log('PASS: Grade 9 Mensuration Ex7.3, 9 content records, independently checked arithmetic; no UI testing.');
