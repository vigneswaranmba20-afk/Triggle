'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '../grade-12/inverse-method-lab.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'Grade 12 lab script must be present');
const fields = {a:{value:'2'},b:{value:'1'},c:{value:'3'},d:{value:'2'},result:{textContent:''}};
let submit;
const context = {document:{getElementById(id){
 if(id==='matrix-form')return {addEventListener(event,handler){assert.equal(event,'submit');submit=handler;}};
 assert.ok(Object.hasOwn(fields,id), 'Unexpected DOM id '+id);
 return fields[id];
}}};
vm.runInNewContext(match[1],context);
assert.equal(typeof submit,'function');
function check(values,pattern){
 for(const [key,value] of Object.entries(values))fields[key].value=value;
 let prevented=false;
 submit({preventDefault(){prevented=true;}});
 assert.ok(prevented,'submission must not navigate');
 assert.match(fields.result.textContent,pattern);
}
check({a:'2',b:'1',c:'3',d:'2'},/A⁻¹ = adj\(A\)\/det\(A\)/);
check({a:'',b:'1',c:'3',d:'2'},/Enter four whole-number entries/);
check({a:'  ',b:'1',c:'3',d:'2'},/Enter four whole-number entries/);
check({a:'2.5',b:'1',c:'3',d:'2'},/Enter four whole-number entries/);
check({a:'Infinity',b:'1',c:'3',d:'2'},/Enter four whole-number entries/);
check({a:'2e1',b:'1',c:'3',d:'2'},/Enter four whole-number entries/);
check({a:'9007199254740992',b:'1',c:'3',d:'2'},/Enter safe integers/);
check({a:'-2',b:'1',c:'3',d:'2'},/det\(A\)/);
assert.match(html,/aria-live="polite"/);
assert.match(html,/supplementary practice calculator/);
assert.match(html,/Tamil human editorial review pending/);
console.log('Grade 12 inverse form validation and source-safety regression passed');
