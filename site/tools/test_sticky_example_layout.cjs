'use strict';
// Shared Grades 9–12 layout contract, with the Grade 9 Example 2.12
// regression that originally revealed the redundant two-button row.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync('site/'+p,'utf8');
const html=read('index.html'),app=read('assets/app.js');
const css=read('assets/quiet-reader.css'),reader=read('assets/quiet-reader.js');
for(const [name,source] of [['app.js',app],['quiet-reader.js',reader]])new vm.Script(source,{filename:name});
const pos={heading:html.indexOf('id="questionHead"'),
  details:html.indexOf('id="solutionModeRow"'),question:html.indexOf('id="questionText"'),
  answer:html.indexOf('id="answerBox"'),steps:html.indexOf('id="stepsRegion"')};
assert.ok(pos.heading<pos.details&&pos.details<pos.question&&pos.question<pos.answer&&pos.answer<pos.steps,
  'Detailed explanation must immediately follow the title; question, answer, and steps must remain');
assert.equal((html.match(/id="tabGuided"/g)||[]).length,1,'One optional Detailed explanation action');
assert.doesNotMatch(html,/id="tabQuick"/,'Remove Quick solution button, not content');
assert.match(html,/id="quickSteps"/,'Retain the complete written quick solution');
assert.doesNotMatch(app,/\$\('tabQuick'\)/,'No dereferences to the removed button');
assert.match(app,/\$\('quickSteps'\)\.hidden=false/,'Never hide the default solution');
assert.match(app,/\$\('solutionModeRow'\)\.hidden=!hasDeepLesson\(current\)/,
  'Only difficult questions get Detailed explanation');
assert.match(css,/body\.textbook-reader \.status-row\{[\s\S]*position:sticky!important/,
  'Chapter breadcrumb must be sticky while scrolling');
assert.match(css,/body\.textbook-reader \.question-return,[\s\S]*display:none!important/,
  'Remove duplicate back row across all question types');
assert.match(css,/body\.textbook-reader #solutionModeRow\{[\s\S]*display:flex/,
  'One self-sized details action');
assert.doesNotMatch(reader,/['"]\.appbar['"]\s*,/,'Header must not be touch-hidden');
assert.doesNotMatch(reader,/['"]\.status-row['"]\s*,/,'Breadcrumb must not be touch-hidden');
assert.doesNotMatch(reader,/['"]#solutionModeRow['"]\s*,/,'Details must be visible before touch');
assert.match(html,/quiet-reader\.css\?v=static-reader-1/);
assert.match(html,/quiet-reader\.js\?v=static-reader-1/);
console.log('PASS: single Detailed explanation after title, quick solution preserved, fixed headers, redundant back removed.');
