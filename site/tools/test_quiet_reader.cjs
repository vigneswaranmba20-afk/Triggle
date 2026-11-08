'use strict';
// Invariant guard: the quiet state must leave the complete question and answer
// visible, while navigation and worked steps remain reachable on a first touch.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=f=>fs.readFileSync('site/'+f,'utf8');
const js=read('assets/quiet-reader.js'),css=read('assets/quiet-reader.css'),html=read('index.html'),sw=read('service-worker.js');
new vm.Script(js,{filename:'quiet-reader.js'});
assert.match(js,/pointerdown/,'Touch-down must reveal controls');
assert.match(js,/reader-options-visible/,'Reader must toggle options visibility');
assert.match(js,/triggle:lessonchange/,'Every new question resets to quiet mode');
assert.match(js,/event\.key==='Tab'/,'Keyboard must reveal options');
assert.match(js,/dialog\[open\]/,'Dialog must not be obscured by hiding controls');
assert.match(css,/\.lesson-card>#stepsRegion/,'Steps must be hidden at rest');
assert.match(css,/\.lesson-card>\.lesson-title-row/,'Question chrome must be hidden at rest');
assert.doesNotMatch(css,/display:none[^}]*#questionText/,'Do not hide textbook question');
assert.doesNotMatch(css,/display:none[^}]*#answerBox/,'Do not hide answer');
assert.match(html,/quiet-reader\.css\?v=quiet-1/,'Stylesheet must be linked');
assert.match(html,/quiet-reader\.js\?v=quiet-1/,'Reader controller must be linked');
assert.match(sw,/quiet-reader\.js/,'Controller must work offline');
assert.match(sw,/quiet-reader\.css/,'Styles must work offline');
console.log('PASS: reader opens with question/answer only and has touch, keyboard, dialog, route and offline guards.');
