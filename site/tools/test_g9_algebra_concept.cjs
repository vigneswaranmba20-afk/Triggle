'use strict';
// Source registration and grade-scope regression tests for the isolated polynomial pilot.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const data=fs.readFileSync(path.join(root,'data/g9-algebra-chapter.js'),'utf8');
const ctx={window:{}};
vm.runInNewContext(data,ctx,{filename:'g9-algebra-chapter.js'});
const p=ctx.window.TRIGGLE_ALGEBRA_PATH;
assert.equal(p.chapterId,'g9-ch3');
assert.equal(p.stages.length,1,'A pilot is not a claim of complete algebra coverage');
assert.equal(p.stages[0].id,'g9-ch3-what-is-polynomial');
assert.equal(p.stages[0].section,'3.2');
assert.equal(p.stages[0].page.en,81);
assert.equal(p.stages[0].page.ta,88);
assert.match(p.review.tamil,/pending/);
const js=fs.readFileSync(path.join(root,'assets/g9-algebra-concepts.js'),'utf8');
const hub=fs.readFileSync(path.join(root,'assets/chapter-hub.js'),'utf8');
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const name of ['g9-algebra-chapter.js','g9-algebra-concepts.js','g9-algebra-concepts.css']){
  assert.ok(html.includes(name),'Missing browser module: '+name);
  assert.ok(sw.includes(name),'Missing offline asset: '+name);
}
for(const required of ['TRIGGLE_ALGEBRA_PATH','g9-ch3']){
  assert.ok(hub.includes(required));
  assert.ok(app.includes(required));
}
assert.match(js,/3x\^2\+2x\+5/);
assert.match(js,/x\^\{-1\}\+2/);
assert.match(js,/\\\\sqrt\{x\}/);
assert.match(js,/degree of the zero polynomial is undefined/);
assert.match(js,/x ≠ 0/);
assert.doesNotMatch(js,/0\^0\s*=\s*1/);
assert.match(js,/aria-live/);
assert.match(js,/aria-pressed/);
assert.match(js,/TriggleNotation/);
assert.ok(!/fetch\(|XMLHttpRequest|https?:\/\//.test(js),'Purely local learning interaction');
console.log('PASS: G9 Ch3 polynomial pilot: stage, review flags, isolated registration, math guards, offline assets.');
