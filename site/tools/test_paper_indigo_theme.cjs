'use strict';
/* Paper + Indigo token and offline build contract. No student data. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const css=read('assets/paper-indigo.css');
const html=read('index.html');
const sw=read('service-worker.js');
const colors={
  paper:'#F7F7F4',
  card:'#FFFFFF',
  ink:'#22283B',
  muted:'#566275',
  indigo:'#473D91',
  selected:'#EEEAF8',
  teal:'#13746F',
  answer:'#11645B'
};
for(const [key,hex] of Object.entries(colors))
  assert.ok(css.includes(hex),'Theme token missing: '+key+' '+hex);
function relativeLuminance(hex){
 const c=hex.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)/255);
 return c.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4)
  .reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
}
function contrast(a,b){
 const x=relativeLuminance(a),y=relativeLuminance(b);
 return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
const required=[
 ['primary reading',colors.ink,colors.card,4.5],
 ['muted reading',colors.muted,colors.card,4.5],
 ['primary button',colors.card,colors.indigo,4.5],
 ['navigation',colors.indigo,colors.card,4.5],
 ['selected concept',colors.indigo,colors.selected,4.5],
 ['diagram plot',colors.teal,colors.card,3],
 ['answer label',colors.answer,colors.card,4.5]
];
for(const [name,a,b,min] of required){
 const value=contrast(a,b);
 assert.ok(value>=min,name+' contrast '+value.toFixed(2)+':1 must be ≥'+min+':1');
}
assert.match(html,/assets\/paper-indigo\.css\?v=paper-indigo-20261115-1/,'Theme stylesheet versioned');
const at=html.indexOf('assets/paper-indigo.css');
assert(at>html.indexOf('assets/matrix-concepts.css'),'Color-only layer must follow other styles');
assert(at>html.indexOf('assets/g10-ch2-typography.css'),'Theme must follow Grade 10 typography');
assert(html.indexOf('assets/paper-indigo.css')<html.indexOf('</head>'),'Theme must load in head');
assert.match(sw,/'\.\/assets\/paper-indigo\.css'/,'Theme is cached for offline Android use');
assert.match(sw,/triggle-shell-real-2025-v85-paper-indigo/,'Offline service-worker cache bumped');
assert.doesNotMatch(css,/@import\b|url\(/,'Theme must not download images or external resources');
assert.doesNotMatch(css,/\b(?:font-size|position:\s*(?:fixed|sticky)|grid-template-columns|display:\s*none)\s*:/,'Theme must not change learning layout');
assert.match(css,/forced-colors:\s*active/,'System high-contrast colors must be respected');
assert.match(css,/\.sp2-journey-footer\s+\.sp2-footer-next/,'Primary concept navigation is themed');
assert.match(css,/\.matrix-concepts\s+\.mc-primary/,'Grade 12 matrix interactions are themed');
assert.match(css,/\.question-text/,'Exercise reader is themed');
console.log('PASS Paper + Indigo source tokens, 7 contrast calculations, offline cache, all-grade CSS contract');
