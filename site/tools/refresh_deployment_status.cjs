#!/usr/bin/env node
'use strict';
// Explicit manual refresh only; no schedule, privileged token or private data.
const fs=require('node:fs'),path=require('node:path');
const {deployment}=require('../assets/project-model.js');
const base='https://api.github.com/repos/vigneswaranmba20-afk/Triggle';
async function json(p){const r=await fetch(base+p,{signal:AbortSignal.timeout(20000),headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw Error('GitHub '+r.status+' '+p);return r.json();}
(async()=>{
 const [build,commits,pulls,runs,issues]=await Promise.all([json('/pages/builds/latest'),json('/commits?per_page=5'),json('/pulls?state=open&per_page=8'),json('/actions/runs?per_page=12'),json('/issues?state=open&per_page=20')]);
 const pages=deployment(build);if(!pages)throw Error('Latest Pages build is not a verified successful build; preserve the previous snapshot.');
 const value={schemaVersion:1,checkedAt:new Date().toISOString(),pages,commits:commits.map(c=>({title:c.sha.slice(0,7)+' '+c.commit.message.split('\n')[0],url:c.html_url,updatedAt:c.commit.committer.date})),pulls:pulls.map(p=>({title:'#'+p.number+' '+p.title,url:p.html_url,status:p.draft?'draft':'open',updatedAt:p.updated_at})),runs:runs.workflow_runs.map(r=>({title:r.name+' · '+r.head_sha.slice(0,7),url:r.html_url,status:r.status,conclusion:r.conclusion,updatedAt:r.updated_at})),issues:issues.filter(i=>!i.pull_request).map(i=>({title:'#'+i.number+' '+i.title,url:i.html_url,status:i.state,updatedAt:i.updated_at}))};
 // Compare the canonical live module and teacher page with the built source commit.
 for(const p of ['site/assets/teacher-portal.js','site/teacher-review.html']){
  const responses=await Promise.all([fetch('https://vigneswaranmba20-afk.github.io/Triggle/'+p+'?verify='+Date.now()),fetch('https://raw.githubusercontent.com/vigneswaranmba20-afk/Triggle/'+pages.commit+'/'+p)]);
  if(responses.some(r=>!r.ok))throw Error('Live verification HTTP failure');const bytes=await Promise.all(responses.map(r=>r.text()));if(bytes[0]!==bytes[1])throw Error('Live bytes do not match recorded Pages build: '+p);
 }
 value.liveVerification={checkedAt:new Date().toISOString(),commit:pages.commit,note:'Teacher HTML and application module bytes match the successful Pages build. Interactive login is not verified by this HTTP check.'};
 fs.writeFileSync(path.resolve(__dirname,'../data/deployment-status.json'),JSON.stringify(value,null,2)+'\n');console.log('Stored successful build '+pages.commit+' with matching live teacher assets.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
