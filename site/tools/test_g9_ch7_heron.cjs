'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const site = path.resolve(__dirname, '..');
const load = p => fs.readFileSync(path.join(site, p), 'utf8');

const sandbox = {window: {}, Math};
for (const filename of ['data/g9-mensuration-chapter.js','data/g9-mensuration-remaining.js']) {
  vm.runInNewContext(load(filename), sandbox, {filename});
}
new vm.Script(load('assets/g9-mensuration-remaining.js'), {filename:'g9-mensuration-remaining.js'});
const unit = sandbox.window.TriggleG9MensurationLabs;
const course = sandbox.window.TRIGGLE_MENSURATION_PATH;
assert.equal(course.chapterId, 'g9-ch7');
assert.equal(course.review.tamil, 'draft-review-pending');
assert.equal(course.stages.length, 4);
assert.deepEqual(course.stages.map(s=>s.id).join(','), [
 'g9-ch7-heron','g9-ch7-quadrilateral','g9-ch7-surface','g9-ch7-volume'
].join(','));

for(const stage of course.stages){
  assert.ok(stage.title.en && stage.title.ta);
  assert.ok(stage.idea.en && stage.idea.ta);
  assert.ok(stage.math.latex && stage.math.fallback);
  assert.ok(stage.deepDive.points.en.length >= 4);
  assert.equal(stage.choices.length, 3);
  assert.ok([0,1,2].includes(stage.correct));
  assert.ok(stage.whyMath.latex && stage.hint.en);
  assert.match(stage.visual.kind, /^g9m-/);
  assert.match(stage.practiceId, /^g9-ch7-ex7\.[123]-q[0-9]+$/);
}
assert.equal(course.stages[0].section,'7.2');
assert.deepEqual([course.stages[0].page.en,course.stages[0].page.ta],[249,263]);
assert.equal(course.stages.map(s=>s.section).join(','),'7.2,7.3,7.4,7.5');
assert.match(course.stages[0].math.latex, /\\sqrt\{/);
assert.match(course.stages[0].math.latex, /\\dfrac\{/);
assert.match(course.stages[0].whyMath.latex, /12\\text\{ m\}\^\{2\}/);

for (const [a,b,c,expected] of [[3,4,5,6],[5,5,6,12],[6,8,10,24],[5,12,13,30],[5,5,8,12],[13,13,10,60]]) {
  assert.equal(unit.isTriangle(a,b,c), true, 'valid triangle ' + [a,b,c].join(','));
  assert.ok(Math.abs(unit.heron(a,b,c).area - expected) < 1e-10);
  for(const perm of [[a,c,b],[b,a,c],[c,b,a]]){
    assert.ok(Math.abs(unit.heron(...perm).area - expected) < 1e-10);
  }
}
for (const tri of [[2,3,6],[1,1,2],[0,3,4],[-1,4,5]]) {
  assert.equal(unit.isTriangle(...tri),false);
  assert.equal(unit.heron(...tri),null);
}
const cuboid = (l,b,h) => ({
 total:2*(l*b+b*h+l*h), lateral:2*h*(l+b), volume:l*b*h
});
assert.deepEqual(cuboid(4,3,2),{total:52,lateral:28,volume:24});
assert.deepEqual(cuboid(3,3,3),{total:54,lateral:36,volume:27});
assert.equal(cuboid(5,4,2).lateral,36,'four-wall transfer check');
assert.equal(4*4*4,64,'volume transfer check');

const hub=load('assets/chapter-hub.js'),html=load('index.html'),sw=load('service-worker.js');
assert.match(hub,/chapter\.id==='g9-ch7'\?\(window\.TRIGGLE_MENSURATION_PATH\?\.stages\|\|\[\]\)/);
assert.match(hub,/TriggleG9MensurationLabs\?\.mount\(stage,host,lang\)/);
assert.match(hub,/chapter\.id==='g9-ch7'\|\|chapter\.id==='g9-ch9'/);
assert.match(hub,/stageQuestions,chapter\.id==='g9-ch5'\|\|chapter\.id==='g9-ch7'/,'Ch5 addition must preserve Ch7 top Next control');
for(const p of ['data/g9-mensuration-chapter.js','data/g9-mensuration-remaining.js','assets/g9-mensuration-remaining.js','assets/g9-mensuration-concepts.css']){
  assert.ok(html.includes(p),'missing HTML asset '+p);
  assert.ok(sw.includes('./'+p),'missing offline asset '+p);
}
assert.match(sw,/g9-mensuration-20261121-3/);
console.log('PASS Grade 9 Mensuration: four textbook-aligned topics, independent area and volume arithmetic, connected route and offline assets.');
