'use strict';
// GitHub Pages serves site/ directly: validate the same source tree, without a bundle.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const target=path.join(dir,entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
let scripts=0, links=0;
for (const file of walk(root)) {
  const ext=path.extname(file);
  if (ext==='.js') { new vm.Script(fs.readFileSync(file,'utf8'),{filename:file}); scripts++; }
  if (ext==='.json'||ext==='.webmanifest') JSON.parse(fs.readFileSync(file,'utf8'));
  if (ext!=='.html') continue;
  const html=fs.readFileSync(file,'utf8');
  for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
    const href=match[1];
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) continue;
    const pathname=decodeURIComponent(href.split(/[?#]/)[0]);
    if (!pathname) continue;
    const target=path.resolve(path.dirname(file),pathname);
    assert(target.startsWith(root+path.sep),`${file}: link escapes site/: ${href}`);
    assert(fs.existsSync(target),`${file}: broken local link ${href}`); links++;
  }
}
for (const file of ['index.html','grades.html','playground.html']) assert(fs.statSync(path.join(root,file)).size>0);
// Keep the live UI dictionary bilingual as chapter navigation grows.
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const dictionaryStart=app.indexOf(' const dictionary={');
const dictionaryEnd=app.indexOf(' const ui=');
assert(dictionaryStart>=0&&dictionaryEnd>dictionaryStart,'UI dictionary not found');
const dictionary=vm.runInNewContext(app.slice(dictionaryStart,dictionaryEnd)+'\ndictionary;');
assert.deepEqual(Object.keys(dictionary.en).sort(),Object.keys(dictionary.ta).sort(),'Missing UI translation key');
for (const [language,entries] of Object.entries(dictionary)) {
  for (const [key,value] of Object.entries(entries)) assert(typeof value==='string'&&value.trim(),`Missing ${language} UI translation: ${key}`);
}
// Seasonal celebration markup/scripts must not return to the production learning app.
const liveHtml=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(!/diwaliGreeting|diwaliEffects|assets\\/diwali\\.js|fireworks-js|canvas-confetti/i.test(liveHtml), 'Removed Diwali celebration reappeared in live HTML');
// The offline shell must contain every script/style used by the live app.
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const core=/const CORE=(\[[^;]+\]);/.exec(sw);
assert(core,'Service worker CORE manifest missing');
const assets=vm.runInNewContext(sw.slice(0,sw.indexOf('self.addEventListener'))+'\nCORE;');
for (const asset of assets) assert(fs.existsSync(path.join(root,asset)),`Missing cached asset: ${asset}`);
assert(assets.includes('./data/curriculum.js'),'Curriculum must remain available offline');
assert(!assets.some(asset=>/diwali/i.test(asset)), 'Diwali assets must not be precached');
console.log(`PASS: static Pages source, ${scripts} JavaScript files, ${links} local HTML links, bilingual UI, JSON and offline assets`);
