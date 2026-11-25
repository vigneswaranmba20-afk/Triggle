'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const manifest=require('../data/textbook-fidelity/g10-frontier-source-tables.json');
const read=name=>fs.readFileSync(path.resolve(__dirname,'..',name),'utf8');
const flatten=parts=>parts.map(part=>part.fallback??part).join('');

function check() {
  const context={window:{}};
  for(const [ ,file] of read('index.html').matchAll(/<script src="\.\/(data\/[^?"]+)[^"]*"/g)) {
    vm.runInNewContext(read(file),context,{filename:file});
  }
  const w=context.window;
  const items=w.TRIGGLE_CLASSES[10].items;
  w.TriggleG10AlgebraTamil?.(items);
  const preserved=new Map(items.map(({id,q,steps,answer})=>[id,JSON.stringify({q,steps,answer})]));
  w.TriggleG10SourceTables(items);
  const updated=items.filter(item=>item.dataTable?.sourcePrompt);
  assert.deepEqual(Array.from(updated,item=>item.id),manifest.items.map(entry=>entry.id));
  for(const {id,q,steps,answer,dataTable} of updated) {
    assert.equal(JSON.stringify({q,steps,answer}),preserved.get(id));
    for(const lang of ['en','ta']) {
      const {before,after}=dataTable.sourcePrompt[lang];
      assert(q[lang].startsWith(flatten(before).trim()));
      for(const cell of [...before,...after,...(dataTable[lang]?.rows??dataTable.rows).flat()]) {
        if(cell?.latex)katex.renderToString(cell.latex,{throwOnError:true,strict:'error'});
      }
    }
  }
  const [relation,first,second]=updated;
  const values=Array.from(relation.dataTable.rows,([x,y])=>[x,y]);
  assert.deepEqual(values,[[35,56],[45,65],[50,69.5],[55,74]]);
  assert.equal(new Set(values.map(([x])=>x)).size,4);
  const [[x1,y1],[x2,y2]]=values;
  const slopeInTenths=10*(y2-y1)/(x2-x1);
  const interceptInTenths=10*y1-slopeInTenths*x1;
  assert.deepEqual([slopeInTenths,interceptInTenths],[9,245]);
  for(const [x,y] of values)assert.equal(slopeInTenths*x+interceptInTenths,10*y);
  assert.equal((slopeInTenths*40+interceptInTenths)/10,60.5);
  assert.equal((533-interceptInTenths)/slopeInTenths,32);
  for(const lang of ['en','ta'])assert.match(flatten(relation.dataTable.sourcePrompt[lang].after),/\(i\).*\(ii\).*\(iii\).*40.*\(iv\).*53\.3/);

  const inputs=([,cell])=>cell.fallback??cell;
  assert.deepEqual(Array.from(first.dataTable.rows,inputs),['a³ − 10a² + 11a + 70','a − 7','a² − 12a + 35','Find this value']);
  assert.deepEqual(Array.from(second.dataTable.rows,inputs),['(x⁴ − y⁴)(x⁴ + x²y² + y⁴)','x² − y²','Find this value','(x⁴ − y⁴)(x² + y² − xy)']);
  // For a degree-d polynomial, identity follows from d+1 independent roots.
  for(const a of [-2,0,3,5,7]) {
    const gcd=a-7,lcm=a**3-10*a*a+11*a+70;
    const p=a*a-12*a+35,q=(a+2)*(a-7);
    assert.equal(lcm-(a-7)*(a-5)*(a+2),0);
    assert.equal(p*q-lcm*gcd,0);
  }
  const sample=[-4,-3,-2,-1,0,1,2,3,4,5,6];
  for(const x of sample)for(const y of sample) {
    const squareDiff=x*x-y*y,quarticDiff=x**4-y**4;
    const plus=x*x+x*y+y*y,minus=x*x-x*y+y*y;
    assert.equal(plus*minus,x**4+x*x*y*y+y**4);
    assert.equal((squareDiff*plus)*(quarticDiff*minus)-quarticDiff*(x**4+x*x*y*y+y**4)*squareDiff,0);
  }
  assert(read('service-worker.js').includes('./data/textbook-exercises/g10-frontier-source-tables.js'));
  console.log('Grade 10 source tables: three exact tables, six checked tasks, unchanged IDs and work, and offline registration.');
}

if(require.main===module)check();
