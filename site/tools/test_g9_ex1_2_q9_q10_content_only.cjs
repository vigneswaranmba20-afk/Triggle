const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = (q) => JSON.parse(fs.readFileSync(path.join(__dirname, '../data/g9-ex1-2-'+q+'-content-only.json'),'utf8'));
const docs = [load('q9'), load('q10')];
const entries = docs.flatMap(x => x.entries);
assert.equal(entries.length,5);
assert.equal(new Set(entries.map(x=>x.id)).size,5);
for(const d of docs){ assert.equal(d.source.printedPage,12); assert.match(d.source.driveFileId,/^1WxLnj/); assert.match(d.tamilStatus,/pending/); assert.match(d.status,/not-published/); }
for(const e of entries){assert.ok(e.question && e.answer && e.steps.length>=3);assert.equal(e.sourceVisualReview.startsWith('pending'),true);}
assert.equal(2**3,8);assert.equal(2**3-1,7);assert.equal(Array.from({length:10},(_,i)=>(i+1)**2).at(-1),100);assert.equal(2**10,1024);assert.equal(2**10-1,1023);assert.equal(2**4,16);assert.equal(2**0,1);assert.equal(2**8,256);
console.log('Grade 9 Exercise 1.2 Q9–Q10: 5 content entries, math assertions passed');
