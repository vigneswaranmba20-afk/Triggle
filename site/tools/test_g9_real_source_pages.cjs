#!/usr/bin/env node
'use strict';
// Independently transcribed printed-page anchors from the 2025 revised EN & TA PDFs.
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const site=path.resolve(__dirname,'..'),context={window:{}};
vm.createContext(context);
const scripts=['data/class-9.js','data/curriculum.js','data/real-numbers/g9-ch2-core.js',
'data/real-numbers/g9-ch2-examples-a.js','data/real-numbers/g9-ch2-examples-b.js',
'data/real-numbers/g9-ch2-exercises-a.js','data/real-numbers/g9-ch2-exercises-b.js',
'data/real-numbers/g9-ch2-exercises-c.js','data/real-numbers/g9-ch2-exercises-d.js',
'data/real-numbers/g9-ch2-exercises-e.js','data/real-numbers/g9-ch2-exercises-f.js'];
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(site,f),'utf8'),context,{filename:f,timeout:2500});
const items=context.window.TRIGGLE_CLASSES[9].items;
const en=[null,44,47,48,49,50,51,51,52,53,53,54,54,54,56,56,59,59,62,62,63,63,65,65,66,66,66,69,71,72,72,72];
const ta=[null,46,50,51,52,53,54,54,56,56,56,57,57,58,60,61,63,64,66,67,68,69,70,70,71,71,71,74,76,77,77,78];
assert.equal(en.length,32);assert.equal(ta.length,32);
for(let n=1;n<=31;n++){
 const item=items.find(x=>x.id==='g9-ch2-example-'+n);
 assert.ok(item,'Missing textbook example 2.'+n);
 assert.equal(item.printedPage,en[n],'English printed page for Example 2.'+n);
 assert.equal(item.tamilPrintedPage,ta[n],'Tamil printed page for Example 2.'+n);
}
const ex=(id,page)=>{const item=items.find(x=>x.id===id);assert.ok(item,id+' missing');assert.equal(item.tamilPrintedPage,page,id+' Tamil printed page mismatch');};
for(const item of items.filter(x=>x.id?.startsWith('g9-ch2-ex6-')))assert.equal(item.tamilPrintedPage,72,item.id);
for(const item of items.filter(x=>x.id?.startsWith('g9-ch2-ex8-')))assert.equal(item.tamilPrintedPage,79,item.id);
console.log('PASS: 31 examples have independently checked EN/TA printed pages; Exercises 2.6 and 2.8 Tamil references corrected.');
