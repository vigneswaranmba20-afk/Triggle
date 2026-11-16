'use strict';
// Single-source conservative CI risk classifier. Unknown changes always get the full suite.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const levels=['cosmetic','ui','math','major'];
function normalizeCacheOnly(file,content){
  if(file==='site/index.html')
    return content.replace(/([?&]v=)[A-Za-z0-9._~-]+/g,'$1<cache-revision>');
  if(file==='site/service-worker.js')
    return content.replace(/^(const CACHE\s*=\s*['"])[^'"]+(['"])/m,'$1<cache-revision>$2');
  return content;
}
function tierFor(file,cacheOnly){
  if(file==='.github/workflows/smart-ci.yml'||file.startsWith('.github/')||
     /^package(?:-lock)?\.json$/.test(file)||file.startsWith('teacher-review/')||
     file.startsWith('site/tools/')||file==='site/assets/app.js'||
     file==='site/data/curriculum.js') return 'major';
  if(file==='site/index.html') return cacheOnly(file)?'cosmetic':'ui';
  if(file==='site/service-worker.js') return cacheOnly(file)?'cosmetic':'major';
  if(file==='site/data/project-status.json') return 'cosmetic';
  if(file.startsWith('site/data/')||file.startsWith('docs/curriculum/')||
     file.startsWith('docs/trace/')) return 'math';
  if(file.startsWith('site/assets/')&&/\.js$/.test(file))return 'ui';
  if(file.startsWith('site/')&&/\.html$/.test(file))return 'ui';
  if(file.startsWith('site/')&&/\.(?:css|svg|png|jpg|jpeg|webp|gif|ico|woff2?|ttf|mp4|webm|webmanifest)$/.test(file))return 'cosmetic';
  if(file.startsWith('docs/')||/^(?:README|LICENSE|CHANGELOG)/i.test(file))return 'cosmetic';
  return 'major';
}
function classify(files,cacheOnly=()=>false){
  if(!files.length||files.length>50)return 'major';
  return files.reduce((tier,file)=>levels[Math.max(levels.indexOf(tier),levels.indexOf(tierFor(file,cacheOnly)))],'cosmetic');
}
function git(args){return execFileSync('git',args,{encoding:'utf8',maxBuffer:20*1024*1024});}
function selfTest(){
  const cases=[
    [['site/assets/chapter-hub.css'],'cosmetic'],
    [['site/assets/chapter-hub.css','site/data/project-status.json'],'cosmetic'],
    [['site/index.html','site/service-worker.js','site/assets/chapter-hub.css'],'cosmetic'],
    [['site/assets/chapter-hub.js'],'ui'],
    [['site/index.html'],'ui'],
    [['site/service-worker.js'],'major'],
    [['site/data/g10-ch2-concepts.js'],'math'],
    [['docs/curriculum/grade-10/data.json'],'math'],
    [['site/assets/app.js'],'major'],
    [['site/tools/test_question_navigation.cjs'],'major'],
    [['.github/workflows/validate.yml'],'major'],
    [[], 'major']
  ];
  for(const [files,expected] of cases){
    const actual=classify(files,f=>['site/index.html','site/service-worker.js'].includes(f)&&files.length>1);
    assert.equal(actual,expected,files.join(','));
  }
  assert.equal(normalizeCacheOnly('site/index.html','<link href="a.css?v=1">'),normalizeCacheOnly('site/index.html','<link href="a.css?v=2">'));
  assert.notEqual(normalizeCacheOnly('site/index.html','<script src="a.js?v=1">'),normalizeCacheOnly('site/index.html','<script src="evil.js?v=1">'));
  assert.equal(normalizeCacheOnly('site/service-worker.js',"const CACHE='v1';"),normalizeCacheOnly('site/service-worker.js',"const CACHE='v2';"));
  assert.notEqual(normalizeCacheOnly('site/service-worker.js',"const CACHE='v1';\nCORE.push('a');"),normalizeCacheOnly('site/service-worker.js',"const CACHE='v2';\nCORE.push('b');"));
  console.log('PASS CI risk policy: tiers, unknown-file escalation, cache-only exceptions');
}
function run(){
  if(process.argv.includes('--self-test'))return selfTest();
  const event=process.env.CI_EVENT||'';
  const before=event==='pull_request'?process.env.CI_PR_BASE:process.env.CI_PUSH_BEFORE;
  let tier='major',files=[];
  if(event!=='workflow_dispatch'&&/^[0-9a-f]{40}$/.test(before||'')&&!/^0+$/.test(before)){
    try{
      files=git(['diff','--name-only','-z',before,'HEAD']).split('\0').filter(Boolean);
      const onlyCache=file=>{
        try{
          const previous=git(['show',before+':'+file]);
          const current=fs.readFileSync(file,'utf8');
          return normalizeCacheOnly(file,previous)===normalizeCacheOnly(file,current);
        }catch{return false;}
      };
      tier=classify(files,onlyCache);
    }catch(e){console.error('Conservative full-suite fallback:',e.message);tier='major';}
  }
  console.log('Selected CI tier: '+tier+'; changed files: '+(files.join(', ')||'(unknown/manual)'));
  if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,'tier='+tier+'\n');
  if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
     '### Triggle CI: '+tier+'\n\n'+(files.length?files.map(f=>'- '+f).join('\n'):'Full manual or unknown diff')+'\n');
}
run();
