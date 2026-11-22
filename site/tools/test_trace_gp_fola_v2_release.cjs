#!/usr/bin/env node
'use strict';
// Prevent stale video metadata and accidentally published wrong-G.P. media.
const assert=require('node:assert/strict');
const fs=require('node:fs'), path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=read('site/data/g10-ch2-concepts.js');
const start=data.indexOf('"id": "g10-ch2-gp-sum"');
const end=data.indexOf('"section": "2.10"',start);
assert.ok(start>=0&&end>start,'G.P. sum concept exists');
const gp=data.slice(start,end);
const sha='fa50e19cc4795e55839fedd37a9cb49bff499bbf05ad7ffc6d2772ef9f981977';
assert.ok(gp.includes('trace-videos/g10-ch2-gp-sum/'+sha+'.mp4'),'Reviewed immutable R2 video URL');
assert.match(gp,/"durationSeconds":\s*108\.62(?!\d)/);
assert.doesNotMatch(gp,/b89073380f066247805c5b1ba5def43522c6424c36d731bc26973120c5438ab3/);
assert.equal((gp.match(/"video"/g)||[]).length,1,'Exactly one video reference');
const index=read('site/index.html');
assert.match(index,/g10-ch2-concepts\.js\?v=gp-fola-fa50e19c-20261120/);
const sw=read('site/service-worker.js');
assert.match(sw,/const CACHE='triggle-[^']+-gpfola-v2-fa50e19c-g9ex32-aud14-02-tables-20261122-q46-20261122-aud14-03-choices-20261122(?:-[^']+)?'/,'G.P. Fola cache milestone must survive later valid cache revisions');
console.log('PASS G.P. Fola v2 immutable URL, runtime, single reference, HTML revision and PWA cache');
