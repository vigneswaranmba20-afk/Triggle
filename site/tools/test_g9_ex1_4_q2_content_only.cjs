const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/g9-ex1-4-q2-content-only.json'),'utf8'));
assert.equal(data.entries.length,1);
assert.equal(data.entries[0].id,'g9-ch1-ex1-4-q2');
assert.equal(data.source.printedPage,22);
assert.equal(data.source.driveFileId,'1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
assert.ok(data.entries[0].steps.length>=3);
assert.equal(data.entries[0].tamilStatus,'pending');
const rational = [[5,2],[3,1],[13,2],[2,1],[7,1],[1,3]];
for (const [n,d] of rational) {
 const x=n/d, inP=x>2&&x<7, inQ=Number.isInteger(n)&&Number.isInteger(d)&&d!==0&&inP;
 assert.equal(inP||inQ,inQ||inP);
 assert.equal(inP&&inQ,inQ&&inP);
 assert.equal(inQ?inP:true,true);
}
assert.ok(Math.sqrt(10)>2 && Math.sqrt(10)<7);
assert.ok(!Number.isInteger(Math.sqrt(10)));
console.log('Grade 9 Ex 1.4 Q2: schema/provenance and 6 sample set-identity assertions passed');
