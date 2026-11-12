'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const app=read('site/assets/app.js'),html=read('site/index.html'),css=read('site/assets/g10-ch2-typography.css'),sw=read('site/service-worker.js');
assert.match(app,/const typographyChapter=homeView\|\|classIndex\?null:\(chapterOverview\?\.number\?\?chapterForItem\(current\)\?\.number\)/);
assert.match(app,/classList\.toggle\('g10-ch2-type',grade===10&&String\(typographyChapter\)==='2'\)/);
assert(html.includes('g10-ch2-typography.css?v=20261112b-scroll'));
assert(css.includes('body.g10-ch2-type.textbook-reader .lesson-container{'));
assert(css.includes('overflow:visible!important;'),'Chapter 2 must inherit the document scroll');
assert(!/body\.g10-ch2-type\.textbook-reader \.lesson-container\{[^}]*overflow-y:auto/i.test(css),'Do not re-enable nested scroll');
assert(sw.includes("./assets/g10-ch2-typography.css"));
assert(sw.includes('g10ex22-type1-scroll2'));
assert(css.includes('body.g10-ch2-type .lesson-card .question-text'));
assert(css.includes('body.g10-ch2-type .lesson-card .worked-step .step-reason'));
assert(css.includes('body.g10-ch2-type .lesson-card .worked-step .step-equation'));
assert(css.includes('STIX Two Math'));
assert(css.includes('KaTeX_Main'));
assert(!/@import|https?:\/\//.test(css),'Typography may not require a font CDN');
for(const rule of css.split('}').filter(s=>s.includes('{'))){
  const selector=rule.split('{')[0].trim().replace(/\/\*[\s\S]*?\*\//g,'').trim();
  if(selector.startsWith('@')||!selector)continue;
  assert(selector.includes('body.g10-ch2-type'),'No unscoped font change: '+selector);
}
console.log('PASS Grade 10 Chapter 2 font styling scoped, offline, clear text/maths and navigation-safe');
