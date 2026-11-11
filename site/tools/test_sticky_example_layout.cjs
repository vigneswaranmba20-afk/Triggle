'use strict';
// Shared Grades 9–12 layout contract, with the Grade 9 Example 2.12
// regression that originally revealed the redundant two-button row.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync('site/'+p,'utf8');
const html=read('index.html'),app=read('assets/app.js');
const css=read('assets/quiet-reader.css'),reader=read('assets/quiet-reader.js');
for(const [name,source] of [['app.js',app],['quiet-reader.js',reader]])new vm.Script(source,{filename:name});
const pos={heading:html.indexOf('id="questionHead"'),question:html.indexOf('id="questionText"'),steps:html.indexOf('id="stepsRegion"')};
assert.ok(pos.heading<pos.question&&pos.question<pos.steps,'Question precedes the complete standard solution');
assert.doesNotMatch(html,/id="(?:tabGuided|solutionModeRow|g12ModeChooser|guidedDialog)"/,'No additional explanation control');
assert.match(html,/id="quickSteps"/,'Retain written solution');
assert.doesNotMatch(app,/openGuided|renderMode|TriggleG12Explain/,'No obsolete switching handlers');
assert.match(css,/body\.textbook-reader \.status-row\{[\s\S]*position:sticky!important/,
  'Chapter breadcrumb must be sticky while scrolling');
assert.match(css,/body\.textbook-reader \.question-return,[\s\S]*display:none!important/,
  'Remove duplicate back row across all question types');
assert.doesNotMatch(reader,/['"]\.appbar['"]\s*,/,'Header must not be touch-hidden');
assert.doesNotMatch(reader,/['"]\.status-row['"]\s*,/,'Breadcrumb must not be touch-hidden');
assert.doesNotMatch(reader,/['"]#solutionModeRow['"]\s*,/,'Details must be visible before touch');
assert.match(html,/quiet-reader\.css\?v=standard-20261111/);
assert.match(html,/quiet-reader\.js\?v=adaptive-reader-1/);
assert.match(read('assets/reader-pin.css'),/#lessonCard>#questionText\{[\s\S]*?order:3!important/,'Question takes priority in the continuous reader');
console.log('PASS: one standard solution, question-first continuous reader and uncluttered navigation.');
