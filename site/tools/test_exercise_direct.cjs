'use strict';
// Direct-to-textbook Exercises is a shared route contract, not a chapter-9 hack.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=path=>fs.readFileSync('site/'+path,'utf8');
const chapterHub=read('assets/chapter-hub.js');
const app=read('assets/app.js');
const html=read('index.html');
const context={window:{}};
vm.runInNewContext(chapterHub,context,{filename:'chapter-hub.js'});
new vm.Script(app,{filename:'app.js'});
const select=context.window.TriggleChapterHub.textbookExercises;
const fixtures=[
 {id:'practice-first',kind:'practice',label:{en:'Triggle Practice · Chance A'}},
 {id:'ex9-1-q1',kind:'reference',label:{en:'Exercise 9.1 · Q1'}},
 {id:'ex9-1-q2',kind:'reference',label:{en:'Exercise 9.1 · Q2'}},
 {id:'example',kind:'textbook',label:{en:'Example 9.1'}},
 {id:'unit',kind:'textbook',label:{en:'Unit Exercise · Q1'}},
 {id:'practice-last',kind:'practice',label:{en:'Exercise 9.1 · Triggle original practice'}}
];
assert.deepEqual(Array.from(select(fixtures),item=>item.id),['ex9-1-q1','ex9-1-q2','unit']);
assert.equal(select([fixtures[0],fixtures[3],fixtures[5]]).length,0);
assert.equal(context.window.TriggleChapterHub.categorized(fixtures).exercises.length,3);
assert.match(app,/chapterSection=section/,'Exercises stays a chapter section first');
assert.doesNotMatch(app,/current=exercises\[0\]/,'No automatic jump into Question 1');
assert.match(app,/exercises\.filter\(item=>item\.exercise===current\.exercise\)/,'Previous and Next remain inside one exercise');
assert.match(app,/exerciseIndexLink/,'Visible return-to-index button is wired');
assert.match(chapterHub,/hub-exercise-index/,'Shared chapter UI shows exercise numbers');
assert.match(chapterHub,/onQuestion\(items\[0\]\)/,'Selecting an exercise opens its first question');
assert.match(app,/b\.id='exerciseIndexLink'/,'The exercise breadcrumb supports the Exercises link');
assert.match(html,/chapter-hub\.js\?v=/,'Shared route helper must load');
console.log('PASS: exercises index first, one-exercise navigation boundary, linked return to index, and textbook/practice separation.');
