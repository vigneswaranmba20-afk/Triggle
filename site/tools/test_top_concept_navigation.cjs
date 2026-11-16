'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'../assets');
const files=['chapter-hub.js','set-language-journey.js','real-numbers-journey.js','matrix-concepts.js'];
for(const name of files){
 const source=fs.readFileSync(path.join(root,name),'utf8');
 new vm.Script(source,{filename:name});
 assert.match(source,/class="sp2-next-concept" data-top-next/,'Top next button exists in '+name);
 assert.match(source,/querySelector\('\[data-top-next\]'\)/,'Top next control is used in '+name);
 assert.match(source,/root\.querySelector\('\[data-(?:footer-next|next)\]'\)\.click\(\)/,'Top next reuses the existing next/return handler in '+name);
 assert.match(source,/Concept list →/,'Final concept returns to index in '+name);
 assert.match(source,/Next concept →/,'Normal top action explicitly identifies the next concept in '+name);
}
const css=fs.readFileSync(path.join(root,'chapter-hub.css'),'utf8');
assert.match(css,/\.sp2-next-concept\{[^}]*min-height:44px/s,'Top next has accessible touch target');
assert.match(css,/\.sp2-detail-navigation\{flex-wrap:nowrap/,'Top navigation stays on one row');
console.log('Concept top navigation syntax and contract passed');
