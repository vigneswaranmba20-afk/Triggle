'use strict';
// Question-specific original Venn diagram regression and mathematical checks.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'assets/set-venn-figures.js'),'utf8');
const context={window:{}};
vm.runInNewContext(source,context,{filename:'set-venn-figures.js'});
const V=context.window.TriggleSetVenn;
assert(V,'Venn renderer must be available locally');
const item=n=>({id:'c9-textbook-example-1-'+n,classNum:9});
const cases=[11,12,13,14,15,16,17,18,25,27,28,29,30,31];
for(const n of cases){
 assert(V.supports(item(n)),'Source-checked original diagram '+n);
 for(const lang of ['en','ta']){
  const graphic=V.render(item(n),lang);
  assert(graphic?.html.includes('role="img"'),'Accessible SVG for example 1.'+n);
  assert(!graphic.html.includes('g9-venn-text-alternative'),
   'Non-colour text is kept in SVG <desc>, not visible as a duplicated paragraph for '+n);
  assert.equal(graphic.caption,'','Source metadata remains in data, not a distracting modal caption for '+n);
  assert(!graphic.html.includes('undefined')&&!graphic.html.includes('NaN'),'No missing values for '+n);
  assert(graphic.html.includes('<desc'),'Accessible region description for '+n);
 }
}
assert(!V.supports(item(22))&&!V.supports(item(23)),'Never substitute a two-set diagram for an unverified three-set law');
assert(!V.supports({id:'c10-example',classNum:10}),'Grade-specific renderer');
assert(V.needsInline(item(17))&&V.needsInline(item(18)),
 'Diagram-dependent data stay identified; UI now uses the single Figure button instead of a mini preview');
assert.equal((V.render(item(18),'en').html.match(/class="g9-venn-svg"/g)||[]).length,3,
 'Example 1.18 must show three distinct complement regions');
for(const [n,fragments] of [
 [11,['n','m','i, j']],
 [12,['2, 4, 8, 10','6, 12','3, 9']],
 [14,['−3, −2','1, 4','0, 2']],
 [15,['6, 7, 9','8','10, 12']],
 [17,['a, i, u','e, o','b, c','d, g']],
 [27,['5, 15','10, 20','30, 40, 50']],
 [28,['30','6','4','23']],
 [29,['b, d, g','e, h','a, c']],
 [30,['190','110','140']],
 [31,['30','5','25']]
]){
 const alt=V.render(item(n),'en').html;
 for(const value of fragments)
  assert(alt.includes(value),'Example '+n+' must label '+value+' in its mathematical regions');
}
assert.equal(36+27,63,'Example 1.28 universal set size');
assert.equal(36+10-40,6,'Example 1.28 intersection');
assert.equal(63-40,23,'Example 1.28 outside both');
assert.equal(300-110,190);
assert.equal(250-110,140);
assert.equal(190+110+140,440);
assert.equal(35+30-60,5);
assert(!/XMLHttpRequest|\bfetch\s*\(|\bimportScripts\s*\(|new\s+WebSocket\s*\(/.test(source),'Diagrams work offline without outbound network requests');
assert(source.includes('xmlns="http://www.w3.org/2000/svg"'),'SVG namespace is a document identifier, not a network request');
assert(source.includes('rx=160,ry=180'),'More of the figure region should be filled by Venn ellipses');
assert(source.includes('viewBox="0 0 560 420"'),'All diagrams have fuller vertical viewBox');
assert(source.includes('<ellipse cx=')&&!source.includes('<circle cx='),
 'Clips, masks and shading must all use the same ellipse geometry');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
for(const s of [html,sw])assert(s.includes('set-venn-figures.js'),'Bundled and cached for offline use');
assert(app.includes('window.TriggleSetVenn?.supports(item)'),'Figure icon only appears for a supported set example');
assert(app.includes('window.TriggleSetVenn?.render(current,lang)'),'Rendered question-specific diagrams in figure viewer');
console.log('PASS: 14 original bilingual Venn diagrams, uncluttered enlarged figures, region values, accessibility and offline delivery');
