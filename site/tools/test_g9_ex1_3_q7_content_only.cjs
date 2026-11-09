'use strict';
const assert=require('node:assert/strict');
const data=require('../data/g9-ex1-3-q7-content-only.json');
assert.equal(data.entries.length,7);
assert.equal(new Set(data.entries.map(e=>e.id)).size,7);
assert.equal(data.source.printedPage,19);
assert.equal(data.source.driveFileId,'1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
const regions=[[true,false],[true,true],[false,true],[false,false]];
const rules={
i:(a,b)=>a||b,ii:(a,b)=>a&&b,iii:(a,b)=>!(a&&b),
iv:(a,b)=>!(b&&!a),v:(a,b)=>!a||!b,vi:(a,b)=>!a&&!b,
vii:(a,b)=>!(a&&b)
};
for(const e of data.entries){
assert.match(e.id,/^g9-ch1-ex1-3-q7-(i|ii|iii|iv|v|vi|vii)$/);
assert.ok(e.steps.length>=3);
assert.equal(e.tamilStatus,'pending');
const actual=regions.flatMap(([a,b],i)=>rules[e.part](a,b)?[i]:[]);
assert.deepEqual(e.expectedRegionIndices,actual,e.id);
}
assert.deepEqual(data.entries[2].expectedRegionIndices,data.entries[4].expectedRegionIndices);
console.log('Exercise 1.3 Q7: 7 IDs, schemas and independent Boolean-region checks passed');
