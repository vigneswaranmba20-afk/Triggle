'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {load}=require('./build_g9_math.cjs');
const manifest=require('../data/textbook-fidelity/g9-frontier-graphs.json');
const read=filename=>fs.readFileSync(path.resolve(__dirname,'..',filename),'utf8');

function applyFrontierGraphs(items) {
  const window={};
  vm.runInNewContext(read('data/textbook-exercises/g9-frontier-graphs.js'),{window});
  window.TriggleG9FrontierGraphs(items);
  return items;
}

function check() {
  const original=structuredClone(load());
  const candidate=applyFrontierGraphs(structuredClone(load()));
  const checked=candidate.filter(q=>q.graphSolution);
  assert.deepEqual(checked.map(q=>q.id).sort(),manifest.items.map(row=>row.id).sort());
  const satisfies=([a,b,c],[x,y])=>a*x+b*y===c;
  const rational=value=>{
    const [numerator,denominator='1']=value.split('/');
    return [BigInt(numerator),BigInt(denominator)];
  };
  for(const record of manifest.items) {
    const q=checked.find(item=>item.id===record.id);
    const baseline=original.find(item=>item.id===record.id);
    assert.deepEqual(q.q,baseline.q);
    assert.equal(q.answer,baseline.answer);
    assert.equal(q.figureSrc,record.figureFiles[0]);
    assert(q.figureInSolution);
    assert(q.steps.at(-1).why.en&&q.steps.at(-1).why.ta);
    const raw=read(q.figureSrc);
    assert.match(raw,/<svg[^>]*viewBox="0 0 360 370"/);
    assert.equal((raw.match(/class="axis"/g)||[]).length,2);
    const lines=[...raw.matchAll(/data-line="([^"]+)" data-start="([^"]+)" data-end="([^"]+)"/g)];
    assert.equal(lines.length,record.equations.length);
    for(const [index,[ ,coefficients,start,end]] of lines.entries()) {
      const [a,b,c]=coefficients.split(',').map(BigInt);
      assert.deepEqual([a,b,c].map(Number),record.equations[index]);
      assert.notEqual(start,end);
      for(const point of [start,end]) {
        const [[x,dx],[y,dy]]=point.split(',').map(rational);
        assert.equal(a*x*dy+b*y*dx,c*dx*dy,q.id+' exact plotted segment');
      }
    }
    const dots=[...raw.matchAll(/data-point="([^"]+)"( data-intersection="true")?/g)];
    assert.deepEqual(dots.filter(dot=>!dot[2]).map(dot=>dot[1].split(',').map(Number)),record.points);
    if(record.equations.length)for(const point of record.points)assert(record.equations.some(eq=>satisfies(eq,point)));
    if(record.equations.length===2) {
      const [[a,b,c],[d,e,f]]=record.equations;
      const det=a*e-b*d;
      if(det===0) {
        const coincident=a*f===c*d&&b*f===c*e;
        assert.match(q.answer,coincident?/Infinitely many solutions/:/No solution/);
        assert.equal(dots.filter(dot=>dot[2]).length,0);
        if(coincident)assert.equal(lines[0][2]+'|'+lines[0][3],lines[1][2]+'|'+lines[1][3]);
      } else {
        const intersection=[(c*e-b*f)/det,(a*f-c*d)/det];
        assert.deepEqual(intersection,record.intersection);
        assert(record.equations.every(eq=>satisfies(eq,intersection)));
        assert.deepEqual(dots.filter(dot=>dot[2]).map(dot=>dot[1]),[intersection.join(',')]);
        assert(q.answer.replace(/−/g,'-').includes(intersection.join(', '))||intersection.join(',')==='75,25'&&q.answer.includes('75 miles/hr and 25 miles/hr'));
      }
    }
    if(q.exercise==='5.6') {
      const quadrant4=record.points.flatMap(([x,y],i)=>x>0&&y<0?['PQRST'[i]]:[]);
      assert.deepEqual(quadrant4,['Q','R']);
      assert.equal(q.answer,'(2) Q and R');
    }
    assert(read('service-worker.js').includes(q.figureSrc));
  }
  console.log('Grade 9 graphical solutions: 12 checked plots, exact line segments, all intersections and quadrants, bilingual accessibility and offline assets.');
}

if(require.main===module)check();
module.exports={applyFrontierGraphs};
