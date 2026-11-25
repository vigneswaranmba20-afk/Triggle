'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {load}=require('./build_g9_math.cjs');
const manifest=require('../data/textbook-fidelity/g9-ch8-frontier-tables.json');

function applyStatisticsTables(items) {
  const window={};
  const file=path.join(__dirname,'../data/textbook-exercises/g9-ch8-frontier-tables.js');
  vm.runInNewContext(fs.readFileSync(file,'utf8'),{window});
  window.TriggleG9StatisticsTables(items);
  return items;
}

function check() {
  const original=structuredClone(load());
  const revised=applyStatisticsTables(structuredClone(load()));
  const get=suffix=>revised.find(q=>q.id==='g9-ch8-ex'+suffix);
  const affected=revised.filter(q=>q.dataTable?.sourcePrompt);
  assert.deepEqual(affected.map(q=>q.id),manifest.items.map(row=>row.id));
  assert.deepEqual(revised.map(q=>q.id),original.map(q=>q.id));

  for(const q of affected) {
    assert.deepEqual(q.q,original.find(row=>row.id===q.id).q);
    for(const lang of ['en','ta']) {
      const labels=q.dataTable[lang]?.headers||q.dataTable.headers;
      assert.equal(labels.length,2);
      const data=q.q[lang].split('\n');
      assert.equal(q.dataTable.sourcePrompt[lang].before,data[0]);
      assert.equal(q.dataTable.sourcePrompt[lang].after,data[3]);
      const printed=data.slice(1,3).map((row,column)=>{
        const pattern=column===0?/\d+[–-]\d+|\d+/g:/\d+|\bp\b/g;
        const matches=row.match(pattern);
        return matches.slice(-q.dataTable.rows.length).map(cell=>cell.replace('-','–'));
      });
      const rows=Array.from(q.dataTable.rows,row=>Array.from(row,cell=>String(cell?.fallback??cell)));
      assert.deepEqual(rows,printed[0].map((cell,index)=>[cell,printed[1][index]]),q.id+' '+lang);
    }
  }

  const frequencies=q=>Array.from(q.dataTable.rows,row=>row[1]);
  const sum=values=>values.reduce((total,value)=>total+value,0);
  const weighted=(midpoints,f)=>sum(midpoints.map((point,index)=>point*f[index]));
  assert.equal(sum(frequencies(get('8.1-q4')))/6,142.5);
  const marks=get('8.1-q5');
  const fixed=marks.dataTable.rows.filter(row=>Number.isInteger(row[1]));
  assert.equal((202*sum(fixed.map(row=>row[1]))-10*sum(fixed.map(row=>row[0]*row[1])))/(200-202),20);
  const continuous=f=>Array.from(f.dataTable.rows,([interval])=>sum(interval.split('–').map(Number))/2);
  for(const [suffix,count,twiceSum] of [['8.1-q6',50,4020],['8.1-q7',63,3690],['8.1-q8',105,6100]]) {
    const row=get(suffix),frequency=frequencies(row);
    assert.equal(sum(frequency),count);
    assert.equal(2*weighted(continuous(row),frequency),twiceSum);
  }
  const marksMedian=frequencies(get('8.2-q5'));
  assert.equal(30+(sum(marksMedian)/2-sum(marksMedian.slice(0,3)))*10/marksMedian[3],31);
  const sizes=get('8.3-q4');
  assert.equal(sizes.dataTable.rows.find(([,f])=>f===Math.max(...frequencies(sizes)))[0],40);
  const modeOffset=([previous,peak,next],width)=>(peak-previous)*width/(2*peak-previous-next);
  assert.equal(20+modeOffset(frequencies(get('8.3-q5')).slice(1,4),10),24);
  const distribution=get('8.3-q6');
  const f=frequencies(distribution);
  const doubledMeanWeight=weighted(continuous(distribution).map(midpoint=>2*midpoint),f);
  assert.equal(doubledMeanWeight,5590);
  assert.equal(doubledMeanWeight/(2*sum(f)),55.9);
  assert.deepEqual(f.map((_,index)=>sum(f.slice(0,index+1))),[4,12,22,36,44,50]);
  const medianNumerator=109*7+(sum(f)/2-sum(f.slice(0,3)))*10;
  assert.equal(medianNumerator,793);
  assert.equal((medianNumerator/14).toFixed(2),'56.64');
  assert.equal(54.5+modeOffset(f.slice(2,5),10),58.5);
  assert.equal(distribution.steps.length,8);
  assert(distribution.steps.slice(4).every(step=>step.why?.en&&step.why?.ta));
  for(const lang of ['en','ta'])
    assert.deepEqual(Array.from(distribution.answerMath[lang].filter(part=>part.latex),part=>part.fallback).sort(),['55.9','58.5','793/14 ≈ 56.64']);
  console.log('Grade 9 Statistics: nine source tables, all original prompts and IDs, eleven independently checked tasks, and bilingual edition-specific working.');
}

if(require.main===module)check();
module.exports={applyStatisticsTables};
