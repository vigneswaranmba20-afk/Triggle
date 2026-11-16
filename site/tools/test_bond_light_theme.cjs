'use strict';
/* Midnight Precision: static, accessible, mobile-first style contract. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const css=read('assets/bond-light.css');
const html=read('index.html');
const sw=read('service-worker.js');
const manifest=JSON.parse(read('manifest.webmanifest'));
const C={
 graphite:'#181B20',white:'#FFFFFF',ivory:'#F7F6F2',
 brass:'#B79253',burgundy:'#6E2933',selected:'#F6EDE7',
 emerald:'#166353',answer:'#EFF8F4',muted:'#525B62'
};
for(const [name,value] of Object.entries(C))assert.ok(css.includes(value),'Missing '+name+' palette token');
function light(hex){
 const rgb=hex.slice(1).match(/.{2}/g).map(x=>parseInt(x,16)/255);
 return rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4)
  .reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
}
const contrast=(a,b)=>(Math.max(light(a),light(b))+.05)/(Math.min(light(a),light(b))+.05);
for(const [name,a,b,min] of [
 ['reading ink',C.graphite,C.ivory,4.5],
 ['header navigation ink',C.graphite,C.white,4.5],
 ['white on primary',C.white,C.graphite,4.5],
 ['muted on paper',C.muted,C.white,4.5],
 ['brass on graphite',C.brass,C.graphite,4.5],
 ['selected burgundy',C.burgundy,C.selected,4.5],
 ['answer emerald',C.emerald,C.answer,4.5]
]){
 const actual=contrast(a,b);
 assert.ok(actual>=min,name+' contrast '+actual.toFixed(2)+':1 is below '+min+':1');
}
const b=html.indexOf('assets/bond-light.css');
assert.ok(b>html.indexOf('assets/paper-indigo.css')&&b<html.indexOf('</head>'),'Bond layer must load last');
assert.match(html,/assets\/bond-light\.css\?v=bond-light-20261115-2/,'Versioned theme link');
assert.match(sw,/'\.\/assets\/bond-light\.css'/,'Android offline theme cache');
assert.match(sw,/^const CACHE=['"]triggle-[a-z0-9-]*[0-9][a-z0-9-]*['"];?/m,'Versioned PWA cache');
assert.equal(manifest.background_color,C.ivory,'Android launch surface matches reading page');
assert.equal(manifest.theme_color,C.white,'Android browser chrome matches white header');
assert.match(html,/<meta name="theme-color" content="#FFFFFF">/,'Browser chrome matches white header');
assert.match(css,/\.appbar\s*\{\s*background:\s*var\(--bond-white\)/,'Shared header must be white');
assert.match(css,/\.appbar \.lang-switch\s*\{\s*background:\s*var\(--bond-tint\)/,'Language toggle must be light');
assert.match(css,/\.appbar \.browse-button/,'Exercises navigation themed');
assert.match(css,/\.appbar \.basics-link/,'Home navigation themed');
assert.match(css,/\.hub-exercise-link/,'Exercise 2.1 / 2.2 index themed');
assert.match(css,/\.discover-class-header h1/,'Grade 10 Relations and Functions directory themed');
assert.match(css,/\.chapter-overview h2/,'Chapter pages themed');
assert.doesNotMatch(css,/@import\b|url\(/,'No remote style/font/image downloads');
assert.doesNotMatch(css,/\b(?:font-size|line-height|position\s*:|grid-template-columns|display\s*:|overflow\s*:|transform\s*:)/,'Color layer may not move, hide or resize lessons');
assert.match(css,/forced-colors:\s*active/,'Respect high contrast preferences');
assert.match(css,/\.question-text/,'Exercise reader styled');
assert.match(css,/\.hub-section-card/,'Chapter index styled');
assert.match(css,/\.matrix-concepts/,'Grade 12 concepts styled');
assert.match(css,/\.sp2-journey-footer/,'Concept navigation styled');
assert.match(css,/Mathematics plot colors/,'Graph diagrams remain distinct');
console.log('PASS Midnight Precision palette: seven contrast pairs, mobile PWA, all-grade source contract');
