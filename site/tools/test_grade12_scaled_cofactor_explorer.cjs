'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../grade-12/adjugate-preview.html'),'utf8');
assert.match(html,/<select id="cofactor-matrix">/);
assert.match(html,/<option value="iii">Q1\(iii\)/);
assert.match(html,/for\(const id of \['cofactor-matrix','cofactor-row','cofactor-column'\]\)/);
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const controls={
 'cofactor-matrix':{value:'ii',addEventListener(){}},
 'cofactor-row':{value:'0',addEventListener(){}},
 'cofactor-column':{value:'0',addEventListener(){}},
 'cofactor-result':{textContent:''},
 'show-cofactor':{addEventListener(){}},
 'verify-matrix':{addEventListener(){}},
 en:{setAttribute(){},addEventListener(){}},
 ta:{setAttribute(){},addEventListener(){}}
};
const document={documentElement:{lang:'en'},getElementById(id){return controls[id]},querySelectorAll(){return []}};
const sandbox={document,console};vm.createContext(sandbox);
vm.runInContext(script,sandbox);
const source={
 ii:[[2,3,1],[3,4,1],[3,7,2]],
 iii:[[2,2,1],[-2,1,2],[1,-2,2]]
};
for(const [key,m] of Object.entries(source)){
 for(let i=0;i<3;i++)for(let j=0;j<3;j++){
  controls['cofactor-matrix'].value=key;
  controls['cofactor-row'].value=String(i);
  controls['cofactor-column'].value=String(j);
  vm.runInContext('showCofactor()',sandbox);
  const rows=[0,1,2].filter(x=>x!==i),cols=[0,1,2].filter(x=>x!==j);
  const minor=m[rows[0]][cols[0]]*m[rows[1]][cols[1]]-m[rows[0]][cols[1]]*m[rows[1]][cols[0]];
  const numerator=((i+j)%2?-1:1)*minor;
  const expected=key==='iii'?numerator+'/9':String(numerator);
  assert.ok(controls['cofactor-result'].textContent.endsWith(' = '+expected),key+' C'+(i+1)+(j+1));
 }
}
document.documentElement.lang='ta';
controls['cofactor-matrix'].value='iii';controls['cofactor-row'].value='1';controls['cofactor-column'].value='2';
vm.runInContext('showCofactor()',sandbox);
assert.match(controls['cofactor-result'].textContent,/சிற்றணி/);
assert.match(controls['cofactor-result'].textContent,/\/ 9/);
console.log('PASS 18 source-verified Q1(ii)/(iii) cofactor positions, scaling, English/Tamil output and selectors');
