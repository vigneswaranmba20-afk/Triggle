'use strict';
// Mandatory baseline on phone: the entire lesson and key navigation never
// disappear, including immediately after a new question or language change.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync('site/'+p,'utf8');
const js=read('assets/quiet-reader.js'),css=read('assets/quiet-reader.css'),html=read('index.html'),sw=read('service-worker.js');
new vm.Script(js,{filename:'quiet-reader.js'});
assert.match(js,/pointerdown/,'First touch reveals supplemental actions');
assert.match(js,/reader-options-visible/,'Reader toggles supplemental tools');
assert.match(js,/triggle:lessonchange/,'New question reinitializes the reader');
assert.doesNotMatch(js,/['"]\\.appbar['"]\\s*,/,'Fixed header cannot be inert');
assert.doesNotMatch(js,/['"]\\.status-row['"]\\s*,/,'Sticky breadcrumbs cannot be inert');
assert.doesNotMatch(js,/['"]#solutionModeRow['"]\\s*,/,'Detailed explanation must not require touch');
assert.match(js,/event\.key==='Tab'/,'Keyboard supports optional actions');
assert.match(js,/dialog\[open\]/,'Dialogs must not vanish');
assert.doesNotMatch(js,/['"]#questionNavDock['"]\s*,/,'Navigation dock must never be inert');
assert.doesNotMatch(js,/['"]#stepsRegion['"]\s*,/,'Worked steps must never be inert');
assert.doesNotMatch(js,/['"]\.question-top['"]\s*,/,'Exercise number must never be inert');
assert.doesNotMatch(js,/['"]\.lesson-title-row['"]\s*,/,'Question heading must never be inert');
for(const selector of ['#questionNavDock','.lesson-card>.question-top',
  '.lesson-card>.lesson-title-row','.lesson-card>#questionText',
  '.lesson-card>#answerBox','.lesson-card>#stepsRegion']){
 assert.ok(css.includes(selector),'Always-visible region missing from stylesheet: '+selector);
}
assert.match(css,/#questionNavDock\{[\s\S]*visibility:visible!important/,'Dock stays visible');
assert.match(css,/reader-options-visible \.lesson-card>\.lesson-bottom\{\s*display:flex!important/,
  'Touch must override older mobile CSS hiding optional Mark learned controls');
assert.doesNotMatch(css,/not\(\.reader-options-visible\)[^\{]*#stepsRegion/,'Do not hide steps before first touch');
assert.doesNotMatch(css,/not\(\.reader-options-visible\)[^\{]*#questionNavDock/,'Do not hide bottom navigation');
assert.match(html,/quiet-reader\.css\?v=sticky-lesson-1/);
assert.match(html,/quiet-reader\.js\?v=sticky-lesson-1/);
assert.match(sw,/quiet-reader\.js/);
assert.match(sw,/quiet-reader\.css/);
console.log('PASS: fixed header, breadcrumbs, worked solution and navigation remain visible; optional tools reveal on touch.');
