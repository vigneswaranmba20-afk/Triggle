'use strict';

// Assemble the public student entry point in a staged copy. Authoring scripts
// remain the inputs to the curriculum, teacher portal, and fidelity tools.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const prepareRecords = require('../assets/student-records.js');
const source = path.resolve(__dirname, '..');
const mathFile = 'data/g9-clear-math.js';
const appFile = 'assets/app.js';
const pwaFile = 'assets/triggle-pwa.js';
const workerFile = path.join(__dirname, 'student_service_worker.js');
const publicUrl = 'https://vigneswaranmba20-afk.github.io/Triggle/site/index.html';
const lessonScripts = new Set([
  'diagrams.js', 'probability-spinner.js', 'real-number-line.js', 'concept-figures.js',
  'katex.min.js', 'math-notation.js', 'phase2-lab.js', 'textbook-activities.js',
  'living-concepts.js', 'set-venn-figures.js', 'diagramguard.js',
  'worked-example-display.js', 'quiet-reader.js', 'visual-lessons.js',
  'frontier-figure-tamil.js', 'frontier-exercise-hints.js', 'textbook-tamil-formula-labels.js',
]);
const classicTag = /<script(?: defer)? src="\.\/([^"?]+)(?:\?[^"<>]*)?"><\/script>/g;
const cssTag = /<link rel="stylesheet" href="\.\/assets\/([^"/?]+)(?:\?[^"<>]*)?">/g;
const grades = [9, 10];
const catalogFields = ['id', 'classNum', 'chapter', 'exercise', 'kind', 'duplicateOf', 'topic', 'label', 'title'];
const json = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const read = file => fs.readFileSync(path.join(source, file), 'utf8');
const digest = input => crypto.createHash('sha256').update(input).digest('hex').slice(0, 16);

function sourceData(files, js) {
  const window = {};
  const context = vm.createContext({window, console});
  const changes = new Map();
  for (const file of files.filter(file => file.startsWith('data/'))) {
    const prior = JSON.stringify(window.TRIGGLE_CLASSES);
    const globals = new Map(Object.entries(window));
    new vm.Script(js.get(file), {filename:file}).runInContext(context, {timeout:5000});
    changes.set(file, {
      writesRecords: prior !== JSON.stringify(window.TRIGGLE_CLASSES),
      exports: Object.keys(window).filter(key => !['TRIGGLE_CLASSES', 'TRIGGLE_CURRICULUM'].includes(key) && globals.get(key) !== window[key]),
    });
  }
  // Match the source app's student-facing data, including its Tamil overlays.
  const classes = prepareRecords(window);
  const curriculum = window.TRIGGLE_CURRICULUM;
  assert(curriculum?.grades, 'Missing source curriculum');
  return {classes, curriculum, changes, window};
}

function lessonScopes(classes, curriculum) {
  const ids = {};
  const first = {};
  const chapterKeys = [];
  const lessons = new Map();
  for (const grade of grades) {
    const chapters = curriculum.grades.find(row => row.grade === grade).chapters;
    ids[grade] = {};
    first[grade] = classes[grade].items[0]?.id;
    for (const chapter of chapters) {
      chapterKeys.push(chapter.id);
      lessons.set(chapter.id, []);
    }
    for (const item of classes[grade].items) {
      const chapter = chapters.find(row => row.legacyQuestionIds.includes(item.id)) ||
        chapters.find(row => String(row.number) === String(item.chapter));
      assert(chapter, 'Missing chapter for ' + item.id);
      ids[grade][item.id] = chapter.id;
      lessons.get(chapter.id).push(item);
    }
  }
  return {ids, first, chapterKeys, lessons};
}

const grade9Topics = {
  algebra:3, geometry:4, coordinates:5, trigonometry:6, mensuration:7, statistics:8, probability:9,
};
const grade10Topics = {
  relations:1, numbers:2, algebra:3, geometry:4, coordinate:5, trig:6, mensuration:7, statistics:8,
};

function supportScope(file) {
  const name = path.basename(file);
  if (/^class-(?:9|10)\.js$/.test(name)) return 'g'+name.match(/\d+/)[0];
  if (lessonScripts.has(name)) return 'lesson';
  // These viewers capture their chapter's data as the script initializes.
  if (file.startsWith('assets/')) {
    if (/^real-numbers-(?:journey|foundations)\.js$/.test(name)) return 'g9-ch2';
    if (name === 'set-language-journey.js') return 'g9-ch1';
    if (!/^g(?:9|10)-(?:ch\d|algebra|geometry|mensuration|statistics|probability)/.test(name) &&
        !/^why-step-g(?:9|10)\.js$/.test(name)) return 'common';
  }
  if (file.includes('/real-numbers/')) return 'g9-ch2';
  if (name === 'set-language-path.js') return 'g9-ch1';
  if (/^class-10-(?:ex1|chapter-1)/.test(name)) return 'g10-ch1';
  if (name.includes('g10-ch2-ch8-')) return 'g10';
  const chapter = name.match(/(?:^|-)g(9|10)-ch([1-9])(?:-|\.)/);
  if (chapter) return 'g'+chapter[1]+'-ch'+chapter[2];
  const explanation = name.match(/^why-step-g(9|10)-ex([1-9])/);
  if (explanation) return 'g'+explanation[1]+'-ch'+explanation[2];
  const grade9 = name.match(/^g9-([a-z]+)-/);
  const grade10 = name.match(/^g10-(?:frontier-)?([a-z]+)-/);
  if (grade9 && grade9Topics[grade9[1]]) return 'g9-ch'+grade9Topics[grade9[1]];
  if (grade10 && grade10Topics[grade10[1]]) return 'g10-ch'+grade10Topics[grade10[1]];
  const grade = name.match(/(?:^|-)g(9|10|12)(?:-|\.)/);
  return grade ? 'g'+grade[1] : 'common';
}

function counts(scope) {
  const stages = {
    'g9-ch1':scope.TRIGGLE_SET_PATH?.stages, 'g9-ch2':scope.TRIGGLE_REAL_PATH?.stages,
    'g9-ch3':scope.TRIGGLE_ALGEBRA_PATH?.stages, 'g9-ch4':scope.TRIGGLE_GEOMETRY_LESSONS,
    'g9-ch5':[...(scope.TRIGGLE_COORDINATE_LESSONS||[]),...(scope.TRIGGLE_G9_CH5_PATH?.stages||[])],
    'g9-ch6':scope.TRIGGLE_TRIGONOMETRY_LESSONS, 'g9-ch7':scope.TRIGGLE_MENSURATION_PATH?.stages,
    'g9-ch8':scope.TRIGGLE_STATISTICS_LESSONS, 'g9-ch9':scope.TRIGGLE_PROB_PATH?.stages,
    'g10-ch1':scope.TRIGGLE_RELATIONS_LESSONS,
  };
  for (let n=2; n<=8; n++) stages['g10-ch'+n]=scope['TRIGGLE_G10_CH'+n+'_PATH']?.stages;
  return Object.fromEntries(Object.entries(stages).map(([key,list])=>[key,list?.length||0]));
}

function grade9Math(code) {
  const shape = /\bconst records=(\[[\s\S]*?\]);\r?\nconst texts=(\{[\s\S]*?\});\r?\nconst diagramLabels=/;
  const data = code.match(shape);
  assert(data, 'Grade 9 math source format changed');
  return {
    records: JSON.parse(data[1]),
    script: code.replace(shape, () => 'const records=window.TriggleChapterPayload.math;\nconst texts=JSON.parse('+json(JSON.stringify(JSON.parse(data[2])))+');\nconst diagramLabels='),
  };
}

function bootSource(index) {
  return `(()=>{
  const index=${json(index)};
  const params=new URLSearchParams(location.search);
  const grade=params.get('class')==='10'?10:9;
  const has=(g,id)=>Object.prototype.hasOwnProperty.call(index.ids[g]||{},id);
  const chapter=(g,id)=>has(g,id)?index.ids[g][id]:null;
  function initialChapter(){
    if(params.has('class')&&!['9','10'].includes(params.get('class')))return null;
    const question=params.get('question');
    const chosen=params.get('chapter');
    if(!params.has('question')&&chosen&&index.chapters.includes(chosen)&&chosen.startsWith('g'+grade+'-'))return chosen;
    if(!params.has('question')&&!params.has('chapter'))return null;
    let last;
    try{last=JSON.parse(localStorage.getItem('triggle.lastByGrade.v119'))?.[grade];}catch{}
    return chapter(grade,question)||chapter(grade,last)||chapter(grade,index.first[grade]);
  }
  const current=initialChapter();
  const keys=current?['common','lesson','g'+grade,current]:['common','directory'];
  const home=!params.has('class')&&!params.has('chapter')&&!params.has('question');
  if(home){
    const preload=document.createElement('link');
    preload.rel='preload';preload.as='image';
    preload.href=matchMedia('(max-width: 680px)').matches?'./assets/home-studio-mobile.webp':'./assets/home-studio.webp';
    preload.fetchPriority='high';document.head.append(preload);
  }
  const inputs=keys.map(key=>index.packs[key]);
  const searched=new Set();
  const pending=new Map();
  const offlineAssets=new Set();
  const savedAssets=new Set();
  let savedChapter=false;
  let offlineTimer;
  function showUnavailable(){
    document.body.classList.remove('ver-starting','ver-static-home','home-active','discovery-active');
    document.querySelector('.app-shell').hidden=true;
    document.querySelector('.app-shell').style.display='none';
    document.querySelector('#triggleUnavailable').hidden=false;
  }
  function saveOffline(){
    const worker=navigator.serviceWorker?.controller;
    if(!worker||!navigator.onLine||document.body.classList.contains('ver-starting'))return;
    const resources=[...new Set([...offlineAssets,...performance.getEntriesByType('resource').map(entry=>entry.name)])]
      .filter(address=>!savedAssets.has(address));
    if(savedChapter&&!resources.length)return;
    const channel=new MessageChannel();
    const timeout=setTimeout(()=>channel.port1.close(),20000);
    channel.port1.onmessage=event=>{
      clearTimeout(timeout);
      channel.port1.close();
      if(event.data?.saved){
        savedChapter=true;
        for(const address of resources)savedAssets.add(address);
        document.documentElement.dataset.offlineReady='true';
      }
    };
    worker.postMessage({
      type:'triggle-save-offline',version:document.documentElement.dataset.studentRelease,
      chapter:current,resources
    },[channel.port2]);
  }
  for(const href of navigator.onLine&&!home?inputs:[]){
    const preload=document.createElement('link');
    preload.rel='preload';preload.as='script';preload.href=href;document.head.append(preload);
  }
  window.TriggleStudentRelease={
    chapter:current,
    saveOffline,
    rememberOfflineAssets(files){
      for(const file of files)if(file)offlineAssets.add(new URL(file,location.href).href);
      clearTimeout(offlineTimer);
      offlineTimer=setTimeout(saveOffline,500);
    },
    home,
    conceptCounts:index.conceptCounts,
    searchReady:g=>searched.has(g),
    loadSearch(g,items){
      if(!pending.has(g))pending.set(g,fetch(index.search[g]).then(response=>{
        if(!response.ok)throw Error('Search index '+response.status);
        return response.json();
      }).then(records=>{
        for(const item of items)if(!Object.prototype.hasOwnProperty.call(item,'q'))item.q=records[item.id];
        searched.add(g);
      }).finally(()=>pending.delete(g)));
      return pending.get(g);
    },
    open(g,route){
      const target=route.chapter||chapter(g,route.question);
      if(!target||target===current)return false;
      const next=new URL(location.href);
      for(const key of ['class','chapter','question','browse','section','concept'])next.searchParams.delete(key);
      next.searchParams.set('class',g);
      for(const [key,value] of Object.entries(route))if(value!=null)next.searchParams.set(key,value);
      location.assign(next.href);
      return true;
    },
    start(){
      const read=src=>new Promise((resolve,reject)=>{
        const script=document.createElement('script');script.src=src;
        if(home)script.fetchPriority='low';
        script.onload=resolve;script.onerror=reject;document.head.append(script);
      });
      const available=async()=>{
        if(navigator.onLine||!window.caches)return true;
        const name='triggle-lightspeed-'+document.documentElement.dataset.studentRelease;
        if(!(await caches.has(name)))return false;
        const cache=await caches.open(name);
        return (await Promise.all(inputs.map(input=>cache.match(input)))).every(Boolean);
      };
      available().then(ok=>ok?Promise.all(inputs.map(read)):Promise.reject()).then(()=>{
        const scripts=Object.assign({},...keys.map(key=>window.TriggleStudentInputs[key]));
        for(const script of Object.values(scripts))script.call(window);
        delete window.TriggleStudentInputs;
        delete window.TriggleChapterPayload;
        document.body.classList.remove('ver-static-home');
        window.dispatchEvent(new Event('triggle:ready'));
      }).catch(error=>{
        if(error && navigator.onLine)console.error('Triggle startup',error);
        showUnavailable();
      });
    }
  };
})();`;
}

const escape = value => String(value).replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[char]);
function staticHome(html,curriculum,discovery) {
  const window = {};
  vm.runInNewContext(discovery,{window});
  const templates = ['en','ta'].map(lang=>{
    const root = {querySelector:()=>null,querySelectorAll:()=>[]};
    window.TriggleDiscovery.mount(root,{mode:'home',lang,curriculum,classes:{}});
    const content = root.innerHTML.replace('class="discover-home-minimal"','class="discover-home-minimal" data-static-home').replace(/<button type="button" data-grade="(9|10)" ([^>]+)>([\s\S]*?)<\/button>/g,
      (_,grade,attrs,label)=>'<a href="./index.html?class='+grade+'&amp;lang='+lang+'" '+attrs+'>'+label+'</a>');
    return '<template id="startup-'+lang+'">'+content+'</template>';
  }).join('');
  const chapters = curriculum.grades.map(row=>'<h2>Grade '+row.grade+' · '+row.grade+' ஆம் வகுப்பு</h2><ul>'+
    row.chapters.map(chapter=>'<li><a href="./index.html?class='+row.grade+'&amp;chapter='+chapter.id+'">'+
      escape(chapter.title.en)+'</a> · <a lang="ta" href="./index.html?class='+row.grade+'&amp;chapter='+chapter.id+'&amp;lang=ta">'+
      escape(chapter.title.ta)+'</a></li>').join('')+'</ul>').join('');
  return html.replace('tabindex="-1" hidden></main>','tabindex="-1" hidden></main>'+templates+`
      <script>
      if(window.TriggleStudentRelease.home){
        const main=document.getElementById('discoveryView');
        main.append(document.getElementById('startup-'+document.documentElement.lang).content.cloneNode(true));
        main.hidden=false;
        document.body.classList.add('home-active','discovery-active','ver-static-home');
        document.querySelector('.app-shell').inert=false;
        for(const id of ['browseBtn','langEn','langTa'])document.getElementById(id).setAttribute('inert','');
        window.addEventListener('triggle:ready',()=>{
          for(const id of ['browseBtn','langEn','langTa'])document.getElementById(id).removeAttribute('inert');
        },{once:true});
      }
      </script>
      <noscript><style>.ver-starting .app-shell,.ver-loading{display:none}</style>
      <main class="triggle-unavailable"><h1>Samacheer Kalvi Mathematics — Grades 9 &amp; 10</h1>
      <p lang="ta">சமச்சீர் கல்வி கணிதம் — 9 மற்றும் 10 ஆம் வகுப்புகள்</p><p>Enable JavaScript to open interactive lessons.</p>
      ${chapters}</main></noscript>`);
}

function writeSitemap(out,curriculum) {
  const routes = [''];
  for(const row of curriculum.grades){
    routes.push('?class='+row.grade);
    for(const chapter of row.chapters)routes.push('?class='+row.grade+'&chapter='+chapter.id);
  }
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
    routes.flatMap(route=>[route,route+(route?'&':'?')+'lang=ta']).map(route=>'  <url><loc>'+escape(publicUrl+route)+'</loc></url>').join('\n')+'\n</urlset>\n';
  fs.writeFileSync(path.join(out,'sitemap.xml'),xml);
}

function buildStudentRelease(out) {
  assert(out !== source, 'Build into a staged copy of site, separate from authoring source');
  const html = read('index.html');
  const files = [...html.matchAll(classicTag)].map(match => match[1]);
  assert(files.includes(mathFile) && files.includes(appFile) && files.includes('assets/visual-lessons.js'), 'Incomplete student script roster');
  const js = new Map(files.map(file => [file, read(file)]));
  const {classes, curriculum: fullCurriculum, changes, window} = sourceData(files, js);
  const curriculum = {...fullCurriculum, grades:fullCurriculum.grades.filter(row => grades.includes(row.grade))};
  const {ids, first, chapterKeys, lessons} = lessonScopes(classes, curriculum);
  const catalog = Object.fromEntries(Object.entries(classes).filter(([grade])=>grades.includes(Number(grade))).map(([grade, info]) => [grade, {
    ...info, items: info.items.map(item => catalogFields.map(key => item[key] ?? null)),
  }]));
  const assets = [];
  fs.mkdirSync(path.join(out, 'assets'), {recursive:true});
  function writeAsset(label, ext, content) {
    if (ext === 'js') new vm.Script(content, {filename:label});
    const file = `assets/student-${label}.${digest(content)}.${ext}`;
    fs.writeFileSync(path.join(out,file),content);
    assets.push('./'+file);
    return './'+file;
  }
  const styles = [...html.matchAll(cssTag)].map(match => 'assets/'+match[1]);
  const css = styles.map(read).join('\n');
  assert(!/^\s*@import\b/m.test(css), 'CSS imports require separate files');
  const style = writeAsset('styles','css',css);
  const math = grade9Math(js.get(mathFile));
  const parts = new Map(['common','directory','lesson','g9','g10',...chapterKeys].map(key=>[key,[]]));
  const consumers = files.filter(file=>file.startsWith('assets/')&&file!=='assets/student-records.js').map(file=>js.get(file)).join('\n');
  const difficultyFile = 'data/problem-difficulty.js';
  const difficultySource = js.get(difficultyFile);
  const difficultyShape = /const metadata=(\{[\s\S]*?\n\});/;
  const difficulty = JSON.parse(difficultySource.match(difficultyShape)[1]);
  const activeChapters = new Map(Object.entries(ids).flatMap(([,rows])=>Object.entries(rows)));
  const reducedCurriculum = 'window.TRIGGLE_CURRICULUM=JSON.parse('+json(JSON.stringify(curriculum))+');';
  files.forEach((file, slot) => {
    if (file === 'assets/student-records.js' || file === pwaFile ||
        /^data\/class-1[12]\.js$/.test(file) || /^assets\/matrix-(?:core|concepts)\.js$/.test(file)) return;
    if (file === difficultyFile) {
      for (const chapter of chapterKeys) {
        const filter = values => Object.fromEntries(Object.entries(values).filter(([id]) => activeChapters.get(id) === chapter));
        const metadata = {...difficulty, entries:filter(difficulty.entries), solutionReviews:filter(difficulty.solutionReviews)};
        const code = difficultySource.replace(difficultyShape, () => 'const metadata='+json(metadata)+';');
        parts.get(chapter).push(slot+':function(){\n'+code+'\n}');
      }
      return;
    }
    const effect = changes.get(file);
    // Keep initial class objects for supporting scripts. Materialize the exact
    // prepared records below in place of batches that only register questions.
    if (effect?.writesRecords && !/^data\/class-(?:9|10|11|12)\.js$/.test(file) &&
        effect.exports.every(key => !consumers.includes(key))) return;
    if (file === 'assets/diagramguard-coordinate-plot.js') {
      for (const chapter of ['g9-ch5','g10-ch5']) parts.get(chapter).push(slot+':function(){\n'+js.get(file)+'\n}');
      return;
    }
    const key = supportScope(file);
    if (key === 'g12') return;
    assert(parts.has(key), 'Unknown student script scope '+key+' for '+file);
    let code = file === mathFile ? math.script : file === 'data/curriculum.js' ? reducedCurriculum : js.get(file);
    if (file === appFile) {
      code = 'window.TRIGGLE_CLASSES=JSON.parse('+json(JSON.stringify(catalog))+');\n'+
        'const fields='+json(catalogFields)+';\n'+
        'for(const grade of [9,10])window.TRIGGLE_CLASSES[grade].items=window.TRIGGLE_CLASSES[grade].items.map(row=>{const item={};row.forEach((value,i)=>{if(value!==null)item[fields[i]]=value;});return item;});\n'+
        'const completeRecords=new Map(window.TriggleChapterPayload.items.map(item=>[item.id,item]));\n'+
        'if(window.TriggleChapterPayload.overrides)window.TriggleG9Ch5Overrides=new Map(window.TriggleChapterPayload.overrides);\n'+
        'for(const grade of [9,10])window.TRIGGLE_CLASSES[grade].items=window.TRIGGLE_CLASSES[grade].items.map(item=>completeRecords.get(item.id)||item);\n'+code;
    }
    parts.get(key).push(slot+':function(){\n// '+file+'\n'+code+'\n}');
  });
  const packs = {};
  for (const [key, scripts] of parts) {
    const items = lessons.get(key) || [];
    const ids = new Set(items.map(item=>item.id));
    const records = key.startsWith('g9-ch') ? math.records.filter(record=>ids.has(record.id)) : [];
    // Exercise 5.2 distinguishes legacy records from its authored overlay
    // using IDs installed by earlier batches. Carry forward the resolved map.
    const overrides = key==='g9-ch5' ? [...window.TriggleG9Ch5Overrides] : undefined;
    const payload = key==='directory'||lessons.has(key) ?
      'window.TriggleChapterPayload=JSON.parse('+json(JSON.stringify({items,math:records,overrides}))+');\n' : '';
    const code = 'window.TriggleStudentInputs=window.TriggleStudentInputs||{};\nwindow.TriggleStudentInputs['+json(key)+']={\n'+scripts.join(',\n')+'\n};\n';
    packs[key] = writeAsset(key,'js',payload+code);
  }
  const pwa = writeAsset('pwa','js',js.get(pwaFile));
  const search = Object.fromEntries(grades.map(grade=>[grade,writeAsset('search-g'+grade,'json',json(
    Object.fromEntries(classes[grade].items.map(item=>[item.id,item.q]))))]));
  const index = {ids,first,chapters:chapterKeys,conceptCounts:counts(window),packs,search};
  const boot = bootSource(index);
  new vm.Script(boot,{filename:'student bootstrap'});
  let stylesInserted = false;
  let scriptsInserted = false;
  const staged = staticHome(html, curriculum, js.get('assets/discovery.js'))
    .replace('</head>','<link rel="sitemap" type="application/xml" href="./sitemap.xml">\n<script>\n'+boot+'\n</script>\n</head>')
    .replace(cssTag,()=>{if(stylesInserted)return '';stylesInserted=true;return '<link rel="stylesheet" href="'+style+'">';})
    .replace(classicTag,(_tag,file)=>{
      if(file===pwaFile)return '<script defer src="'+pwa+'"></script>';
      if(scriptsInserted)return '';
      scriptsInserted=true;
      return '<script>window.TriggleStudentRelease.start();</script>';
    });
  const manifest = JSON.parse(read('manifest.webmanifest'));
  const fonts = fs.readdirSync(path.join(source,'assets/vendor/katex/fonts')).map(name=>'./assets/vendor/katex/fonts/'+name);
  const media = fs.readdirSync(path.join(source,'assets'),{recursive:true})
    .filter(file=>/\.(?:svg|png|webp|jpe?g|woff2?)$/i.test(file))
    .map(file=>'./assets/'+file).sort();
  const stylesAndIcons = ['./assets/vendor/katex/katex.min.css?v=0.16.22','./manifest.webmanifest',
    './icons/favicon.ico','./icons/icon-80.png', ...manifest.icons.map(icon=>icon.src)];
  const shell = [style,pwa,packs.common,packs.directory,'./assets/home-studio.webp','./assets/home-studio-mobile.webp',
    './assets/vendor/katex/fonts/KaTeX_Main-Regular.woff2','./assets/vendor/noto-sans-tamil/tamil.woff2',...stylesAndIcons];
  const chapterAssets = Object.fromEntries(chapterKeys.map(key=>[key,[packs.lesson,packs[key.split('-')[0]],packs[key]]]));
  const worker = fs.readFileSync(workerFile,'utf8');
  const stamp = digest(staged+assets.join('')+worker+[...stylesAndIcons,...media].map(file=>digest(
    fs.readFileSync(path.join(source,file.split('?')[0])))).join(''));
  fs.writeFileSync(path.join(out,'index.html'),staged.replace('<html lang="en">','<html lang="en" data-student-release="'+stamp+'">'));
  const workerConfig = {version:stamp, shell, immutable:[...assets,...stylesAndIcons], media, chapters:chapterAssets, fonts, ids};
  fs.writeFileSync(path.join(out,'service-worker.js'),worker.replace('/* STUDENT_RELEASE */ null',()=>json(workerConfig)));
  writeSitemap(out,curriculum);
  return assets;
}

if (require.main === module) {
  const target = process.argv[2];
  assert(target, 'Usage: node site/tools/build_student_release.cjs PATH_TO_STAGED_SITE');
  const files = buildStudentRelease(path.resolve(target));
  console.log('Prepared '+files.length+' versioned student assets');
}
module.exports = {buildStudentRelease};
