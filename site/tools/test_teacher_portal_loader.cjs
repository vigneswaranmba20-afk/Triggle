'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
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
console.log('PASS: Teacher portal data module dependency order, local asset paths, loading/error states and ES module syntax');
