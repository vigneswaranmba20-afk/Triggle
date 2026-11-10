'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const source = fs.readFileSync(path.join(root,'assets/teacher-portal.js'),'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)].map(m=>m[1]);
const selected = scripts.filter(src=>/^\.?\/?data\/(class-|curriculum\.js|textbook-exercises\/)/.test(src));
const mustLoad = ['class-9.js','class-10.js','class-11.js','class-12.js','curriculum.js','g10-ch2-ex2-1-en.js'];
for(const name of mustLoad) assert(selected.some(src=>src.includes(name)), 'Teacher loader excludes required module: '+name);
assert(selected.findIndex(src=>src.includes('curriculum.js')) < selected.findIndex(src=>src.includes('g10-ch2-ex2-1-en.js')), 'Bulk batch loaded before its curriculum dependency');
for(const src of selected){
 const relative=src.split(/[?#]/)[0].replace(/^\.\//,'');
 assert(fs.existsSync(path.join(root,relative)), 'Teacher loader references missing lesson data: '+src);
}
assert(source.includes('curriculum\\.js|textbook-exercises'), 'Teacher portal must include the curriculum registry in its loader selection');
assert(source.includes('Loading textbook modules'), 'Teacher portal must surface loading progress');
assert(source.includes('Your teacher account is authorized, but the questions could not load'), 'Loading errors must not be mistaken for unauthorized teacher access');
assert(source.includes('catch (loadError)'), 'Teacher permissions must be separated from lesson loading failures');
execFileSync(process.execPath,['--input-type=module','--check'], {input:source,encoding:'utf8'});
// Reproduce real exercise records, including the older Grade 9 "reference"
// classification. The Grade 9 chooser must show genuine exercise entries
// without accidentally treating worked examples or extra practice as exercises.
const helper=source.match(/function isReviewableExercise\(item\) \{[\s\S]*?\n\}/);
assert(helper,'Teacher portal must expose its exercise filter for regression checks');
const isReviewableExercise=vm.runInNewContext('('+helper[0]+')');
const context={window:{}};
for(const pathName of [
  'data/class-9.js',
  'data/class-10.js',
  'data/curriculum.js',
  'data/textbook-exercises/g9-ch1-ex1-1-view.js',
  'data/textbook-exercises/g9-ch9-ex9-1-en.js'
]){
  const moduleSource=fs.readFileSync(path.join(root,pathName),'utf8');
  vm.runInNewContext(moduleSource,context,{filename:pathName,timeout:1000});
}
const nine=context.window.TRIGGLE_CLASSES[9].items;
const ten=context.window.TRIGGLE_CLASSES[10].items;
const nineExercise=nine.filter(isReviewableExercise);
assert(nineExercise.length>=30,'Grade 9 reference exercises excluded from teacher review');
assert(nineExercise.some(i=>i.chapter==='1'),'Grade 9 chapter 1 exercises must be selectable');
assert(nineExercise.some(i=>i.chapter==='9'),'Grade 9 chapter 9 exercises must be selectable');
assert(nine.some(i=>(i.label?.en||'').startsWith('Example')&&!isReviewableExercise(i)), 'Worked examples should not enter exercise review');
assert(nine.some(i=>i.kind==='practice'&&!isReviewableExercise(i)), 'Non-textbook practice should not enter exercise review');
assert(ten.some(i=>i.kind==='textbook'&&isReviewableExercise(i)), 'Grade 10 textbook exercises must remain available');
assert(source.includes('Source verification pending:'),'Reference records must warn about textbook edition fidelity');

console.log('PASS: Teacher portal Grade 9 exercise eligibility, data module dependency order, local asset paths, loading/error states and ES module syntax');
