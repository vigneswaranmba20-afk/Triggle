'use strict';
// Invariant guard: essential learning and navigation need no touch. Touch reveals
// additional controls while preserving the complete question and full solution.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=f=>fs.readFileSync('site/'+f,'utf8');
const js=read('assets/quiet-reader.js'),css=read('assets/quiet-reader.css'),html=read('index.html'),sw=read('service-worker.js');
new vm.Script(js,{filename:'quiet-reader.js'});
assert.match(js,/pointerdown/,'Touch-down must reveal controls');
assert.match(js,/reader-options-visible/,'Reader must toggle options visibility');
assert.match(js,/triggle:lessonchange/,'Every new question resets to quiet mode');
assert.match(js,/event\.key==='Tab'/,'Keyboard must reveal options');
assert.match(js,/dialog\[open\]/,'Dialog must not be obscured by hiding controls');
const hiddenBlock=css.slice(0,css.indexOf('display:none!important'));
for(const essential of ['.lesson-card>#stepsRegion','.lesson-card>.question-top',
  '.lesson-card>.lesson-title-row','#questionNavDock']){
 assert.ok(!hiddenBlock.includes(essential),essential+' must not be hidden in the default view');
}
for(const essential of ['.lesson-card>#stepsRegion','#questionNavDock']){
 assert.ok(css.includes(essential),essential+' must be explicitly visible on mobile');
}
assert.ok(!js.slice(js.indexOf('const surfaces=['),js.indexOf('].map(selector')).includes("'#questionNavDock'"),
 'Essential navigation must never become inert');
assert.ok(!js.slice(js.indexOf('const surfaces=['),js.indexOf('].map(selector')).includes("'#stepsRegion'"),
 'Worked steps must never become inert');
assert.doesNotMatch(css,/display:none[^}]*#questionText/,'Do not hide textbook question');
assert.doesNotMatch(css,/display:none[^}]*#answerBox/,'Do not hide answer');
assert.match(html,/quiet-reader\.css\?v=essential-1/,'Stylesheet must be linked');
assert.match(html,/quiet-reader\.js\?v=essential-1/,'Reader controller must be linked');
assert.match(sw,/quiet-reader\.js/,'Controller must work offline');
assert.match(sw,/quiet-reader\.css/,'Styles must work offline');
console.log('PASS: mobile reader always shows exercise, question, answer, steps and navigation, with touch for extras.');
