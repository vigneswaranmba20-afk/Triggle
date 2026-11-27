'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadHints}=require('./test_g10_frontier_numbers_hints.cjs');
const manifest=require('../data/textbook-fidelity/g10-frontier-coordinate.json');

function check(){
  const w=loadHints();
  const hints=Object.entries(w.TriggleG10FrontierHints).filter(([id])=>id.startsWith('c10-5-'));
  assert.equal(hints.length,92);
  for(const [id,hint] of hints) {
    const item=w.TRIGGLE_CLASSES[10].items.find(row=>row.id===id);
    assert(item.steps[hint.step].en.includes(hint.expected),id);
    assert.match(hint.ta,/\p{Script=Tamil}/u);
  }
  const selected=w.TRIGGLE_CLASSES[10].items.filter(q=>manifest.items.some(r=>q.id===r.id));
  const initial=structuredClone(selected);
  w.TriggleG10CoordinateFrontier(selected);
  assert.equal(selected.length,5);
  const byId=id=>selected.find(q=>q.id===id);
  for(const [i,q] of selected.entries()) {
    assert.equal(q.q.en,initial[i].q.en);
    assert.equal(q.q.ta,initial[i].q.ta);
    assert.equal(q.id,initial[i].id);
    for(const value of [...q.steps.map(s=>s.math),...Object.values(q.answerMath).flat()]) {
      if(value?.latex)katex.renderToString(value.latex,{throwOnError:true,strict:'error'});
    }
    assert(q.steps.every(s=>/\p{Script=Tamil}/u.test(s.ta)));
    assert(q.steps.some(s=>s.why?.en&&s.why?.ta));
  }

  const [A,B,C,D]=[[3,-4],[9,-4],[5,-7],[7,-7]];
  const det=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const area2=coords=>coords.reduce((sum,[x,y],i)=>{
    const [xx,yy]=coords[(i+1)%coords.length];
    return sum+x*yy-y*xx;
  },0);
  const crosses=(a,b,c,d)=>det(a,b,c)*det(a,b,d)<0&&det(c,d,a)*det(c,d,b)<0;
  const turns=coords=>coords.map((a,i)=>det(a,coords[(i+1)%4],coords[(i+2)%4]));
  for(const [p,signed] of [[44,40],[4,-40]])assert.equal(area2([[0,0],[p,8],[6,2]]),signed);
  for(const [p,signed] of [[13,64],[-3,-64]])assert.equal(area2([[p,p],[5,6],[5,-2]]),signed);
  assert.match(byId('c10-5-ex5-1-q3-i').answer,/\{44, 4\}/);
  assert.match(byId('c10-5-ex5-1-q3-ii').answer,/\{13, −3\}/);

  const quad1=k=>[[-4,-2],[-3,k],[3,-2],[2,3]];
  const quad2=k=>[[-5,7],[-4,k],[-1,-6],[4,5]];
  for(const [build,rejected,twiceArea,signs,intersection] of [
    [quad1,11,56,[21,33,35,23],[19,18,239,108]],
    [quad2,67,144,[35,38,109,106],[-326,217,4051,651]]
  ]) {
    const accepted=build(-5);
    assert.equal(area2(accepted),twiceArea);
    assert.deepEqual(turns(accepted),signs);
    const [a,b,c,d]=build(rejected);
    assert.equal(area2([a,b,c,d]),-twiceArea);
    assert(crosses(b,c,d,a));
    const [x,dx,y,dy]=intersection;
    for(const [u,v] of [[b,c],[d,a]]) {
      assert((v[0]-u[0])*(y-u[1]*dy)*dx===(v[1]-u[1])*(x-u[0]*dx)*dy);
      assert(x>Math.min(u[0],v[0])*dx&&x<Math.max(u[0],v[0])*dx);
    }
  }
  assert(crosses(B,C,D,A));
  assert(turns([A,B,D,C]).every(n=>n<0));
  assert.equal(det(B,C,[6,-25/4]),0);
  assert.equal(det(D,A,[6,-25/4]),0);
  const trapezium=byId('c10-5-ex5-2-q12');
  assert.match(trapezium.answer,/ABCD gives crossing sides/);
  assert.match(trapezium.answer,/ABDC forms a trapezium/);
  const svg=fs.readFileSync(path.join(__dirname,'../assets/grade10-ch5/ex5-2-q12.svg'),'utf8');
  for (const side of ['BC','DA']) assert.match(svg,new RegExp(`data-dg-edge="${side}" stroke-dasharray="[1-9][0-9]* [1-9][0-9]*"`));
  assert.match(svg,/data-dg-construction-point="crossing"/);
  assert.match(svg,/\(6, −25\/4\)/);
  console.log('Grade 10 Coordinate Geometry: 92 source-matched hints, two orientation cases, two crossed polygon exclusions, and the printed trapezium order checked independently.');
}

check();
