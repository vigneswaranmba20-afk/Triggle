(() => {
 'use strict';
 const $=id=>document.getElementById(id),model=window.TriggleProject;
 const repo='https://github.com/vigneswaranmba20-afk/Triggle',api='https://api.github.com/repos/vigneswaranmba20-afk/Triggle';
 let data, activePrompt='', githubBusy=false;
 function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=String(text);if(cls)n.className=cls;return n;}
 function link(text,url){const a=el('a',text);a.href=url;return a;}
 function evidence(file){return link(file.split('/').slice(-2).join('/'),repo+'/blob/'+data.sourceCommit+'/'+file);}
 async function json(url){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);try{const r=await fetch(url,{cache:'no-store',signal:controller.signal,credentials:'omit',headers:{Accept:'application/json'}});if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}finally{clearTimeout(timer);}}
 async function copy(){try{await navigator.clipboard.writeText(activePrompt);$('copy-status').textContent='Copied. Paste into Codex to start this task manually.';}catch{$('prompt-text').focus();$('prompt-text').select();$('copy-status').textContent='Clipboard unavailable. The complete prompt is selected; use your browser’s Copy action.';}}
 function openPrompt(task){activePrompt=model.prompt(task);$('prompt-text').value=activePrompt;$('prompt-panel').hidden=false;$('copy-status').textContent='Copy and manually submit this prompt to Codex.';$('prompt-panel').scrollIntoView({block:'start'});void copy();}
 function taskCard(task){
  const card=el('article',null,'task'),head=el('div',null,'task-head');
  head.append(el('span','P'+task.priority,'pill'),el('h3',`Grade ${task.grade} · Chapter ${task.chapter} · Exercise ${task.exercise}`));
  card.append(head,el('p',`Start: ${task.startingQuestion} · ${task.status} · ${task.type}`),el('p',task.reason),el('p','Dependencies: '+task.dependencies.join(' '),'muted'));
  if(task.scope.length)card.append(el('p','Missing source tasks: '+task.scope.join(', '),'muted'));
  const links=el('p',null,'links');task.evidence.forEach(p=>links.append(evidence(p)));task.sources.forEach(s=>links.append(link('Textbook source ↗',s.url)));card.append(links);
  const btn=el('button','Copy Codex Prompt');btn.type='button';btn.addEventListener('click',()=>openPrompt(task));card.append(btn);return card;
 }
 function summary(){
  const s=data.summary;
  const cards=[[s.verifiedDeployedTasks,'Verified and deployed exercise tasks','Strict validated batches; inherited evidence shown separately.'],[s.knownRemainingTasks+'+','Remaining exercise tasks','Known Grade 12 gaps only. Other grade denominators unknown.'],[s.blockers.length,'Known evidence blockers','Grade-level inventory / Tamil review gaps; public issues shown below.'],[s.recommendedActions,'Manual development actions','Prioritized from repository evidence. No automatic execution.']];
  $('summary').replaceChildren(...cards.map(([count,title,note])=>{const c=el('article',null,'summary-card');c.append(el('strong',count),el('p',title),el('small',note));return c;}));
  $('recommendations').replaceChildren(...data.actions.slice(0,3).map(taskCard));
  $('grade-cards').replaceChildren(...data.grades.map(g=>{
   const c=el('article',null,'grade-card');c.append(el('h3','Grade '+g.grade));const p=el('progress');p.max=g.totalChapters;p.value=g.completedEnglishChapters;p.setAttribute('aria-label',`Grade ${g.grade}: ${g.completedEnglishChapters} of ${g.totalChapters} English chapters complete`);c.append(p);
   const dl=el('dl');for(const [k,v] of [['Textbook chapters',g.totalChapters],['Completed English chapters',g.completedEnglishChapters],['Partial chapters',g.partialChapters],['Pending chapters',g.pendingChapters],['Available exercise records',g.exerciseRecords],['Strict verified questions',g.verifiedNumberedQuestions],['Strict verified tasks/subparts',g.verifiedTasks],['English verified records',g.englishVerifiedRecords],['Whole-grade coverage','Unknown'],['Missing questions / subparts','Unknown'],['Tamil editorial review','Pending'],['Teacher approval','Private / unknown']])dl.append(el('dt',k),el('dd',v));c.append(dl);
   if(g.inheritedVisualEvidence)c.append(el('p',`Additional inherited source evidence: ${g.inheritedVisualEvidence.records} records / ${g.inheritedVisualEvidence.tasks} tasks. See audit; excluded from strict batch totals.`,'muted'));
   c.append(el('p',g.mathematicsState,'muted'),el('p','Next: '+g.nextAction,'muted'));
   if(g.lastVerifiedDeployment)c.append(link('Last verified scoped deployment '+g.lastVerifiedDeployment.commit.slice(0,7)+' ↗',g.lastVerifiedDeployment.url),el('p',g.lastVerifiedDeployment.scope,'muted'));else c.append(el('p','Scoped live verification: unknown','muted'));
   c.append(link('Explore chapters →','#grade='+g.grade));return c;
  }));
 }
 function filters(){
  for(const [key,title,values] of [['grade','Grade',data.grades.map(g=>g.grade)],['chapter','Chapter',[...new Set(data.actions.map(t=>t.chapter))].sort((a,b)=>Number(a)-Number(b))],['exercise','Exercise',[...new Set(data.actions.map(t=>t.exercise))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))],['priority','Priority',[1,2,3,4,5]],['type','Task type',[...new Set(data.actions.map(t=>t.type))]],['status','Current status',model.statuses]]){
   const label=el('label',title),select=el('select');select.id='filter-'+key;select.append(new Option('All '+title.toLowerCase(),''));values.forEach(v=>select.append(new Option(String(v),String(v))));select.addEventListener('change',renderTasks);label.append(select);$('filters').append(label);
  }$('search').addEventListener('input',renderTasks);renderTasks();
 }
 function renderTasks(){const f={search:$('search').value};for(const k of ['grade','chapter','exercise','priority','type','status'])f[k]=$('filter-'+k)?.value||'';const rows=model.filter(data.actions,f);$('task-count').textContent=`${rows.length} of ${data.actions.length} evidence-backed tasks`;$('task-list').replaceChildren(...rows.map(taskCard));if(!rows.length)$('task-list').append(el('p','No tasks match these filters.'));}
 function drill(){
  const params=new URLSearchParams(location.hash.slice(1)),grade=data.grades.find(g=>String(g.grade)===params.get('grade')),panel=$('drilldown');
  if(!grade){panel.hidden=true;return;}panel.hidden=false;panel.replaceChildren();
  const crumbs=el('nav',null,'breadcrumbs');crumbs.setAttribute('aria-label','Curriculum breadcrumb');crumbs.append(link('All grades','#grades'),link('Grade '+grade.grade,'#grade='+grade.grade));panel.append(crumbs);
  const chapter=grade.chapters.find(c=>c.number===params.get('chapter'));if(!chapter){panel.append(el('h2','Grade '+grade.grade+' chapters'));const list=el('div',null,'chapter-list');grade.chapters.forEach(c=>list.append(link(`Chapter ${c.number} · ${c.title} · ${c.completeEnglish?'English reference complete':c.exerciseRecords?'Partial':'Pending'}`,`#grade=${grade.grade}&chapter=${c.number}`)));[...list.children].forEach(c=>c.className='chapter-link');panel.append(list);return;}
  const base=`#grade=${grade.grade}&chapter=${chapter.number}`;crumbs.append(link('Chapter '+chapter.number,base));panel.append(el('h2',chapter.title),el('p',chapter.completionBasis));
  panel.append(el('p',`Verified: ${chapter.verifiedNumberedQuestions} numbered questions / ${chapter.verifiedTasks} tasks. Source totals: ${chapter.totalNumberedQuestions??'unknown'} questions / ${chapter.totalTasks??'unknown'} tasks. Missing tasks: ${chapter.missingTasks??'unknown'}.`));
  if(chapter.totalTasks){const bar=el('progress');bar.max=chapter.totalTasks;bar.value=chapter.verifiedTasks;bar.setAttribute('aria-label',`${chapter.verifiedTasks} of ${chapter.totalTasks} inventoried tasks verified`);panel.append(bar);}
  const exercise=chapter.exercises.find(e=>e.id===params.get('exercise'));
  if(!exercise){
   if(!chapter.exercises.length){panel.append(el('p','No complete exercise source inventory is available. Inspect the original textbook before choosing a question.'));const task=data.actions.find(t=>t.grade===grade.grade&&t.chapter===chapter.number&&t.type==='Source reconciliation');if(task)panel.append(taskCard(task));}
   const list=el('div',null,'chapter-list');chapter.exercises.forEach(e=>list.append(link(`Exercise ${e.id} · ${e.status} · ${e.verifiedTasks} / ${e.totalTasks??'?'} verified tasks`,base+'&exercise='+encodeURIComponent(e.id))));[...list.children].forEach(c=>c.className='chapter-link');panel.append(list);return;
  }
  const exBase=base+'&exercise='+encodeURIComponent(exercise.id);crumbs.append(link('Exercise '+exercise.id,exBase));panel.append(el('h3','Exercise '+exercise.id),el('p',`State: ${exercise.status}. Tamil: ${exercise.tamilReview}. Teacher approval: ${exercise.teacherApproval}.`));
  panel.append(el('p','Stages: '+Object.entries(exercise.stages).map(([k,v])=>`${k}: ${v===null?'unknown':v?'yes':'no evidence'}`).join(' · '),'muted'));
  const record=exercise.records.find(r=>r.id===params.get('question'));
  if(record){panel.append(el('h3',record.label),el('p','Stable ID: '+record.id),el('p','Content SHA-256: '+record.recordSha256,'muted'),el('p',record.verified?'Validated source and mathematics batch.':'Available in the app; source/math reconciliation pending.'),link('Open live student question ↗',record.url));}
  else{const list=el('ul',null,'evidence-list');exercise.records.forEach(r=>{const li=el('li');li.append(link(r.label,exBase+'&question='+encodeURIComponent(r.id)));list.append(li);});panel.append(list);}
  const missing=exercise.tasks.filter(t=>!t.verified);if(missing.length)panel.append(el('p','Exact missing source tasks: '+missing.map(t=>'Q'+t.question+(t.part==='whole'?'':'('+t.part+')')).join(', ')));else if(exercise.totalTasks===null)panel.append(el('p','Exact missing question/subpart: unknown; source reconciliation required.'));
  const task=data.actions.find(t=>t.grade===grade.grade&&t.chapter===chapter.number&&t.exercise===exercise.id);if(task)panel.append(taskCard(task));
 }
 function renderGithub(snapshot,live=false){
  const out=$('github-data');out.replaceChildren();
  const checked=snapshot.checkedAt; $('github-status').textContent=(live?'Public GitHub data checked ':'Last checked snapshot: ')+new Date(checked).toLocaleString()+' · '+model.age(checked)+'. Build status is separate from live browser verification.';
  const deployed=snapshot.pages;if(deployed){const d=el('div',null,'release');d.append(el('h3','Last successful Pages build'),el('code',deployed.commit),el('p',new Date(deployed.updatedAt).toLocaleString()+' · '+model.age(deployed.updatedAt)),link('GitHub build record ↗',deployed.url));out.append(d);}else out.append(el('p','A successful Pages build could not be established.'));
  if(snapshot.liveVerification)out.append(el('p',`Last recorded live HTTP verification: ${snapshot.liveVerification.checkedAt} · ${snapshot.liveVerification.commit.slice(0,7)} · ${snapshot.liveVerification.note}`,'muted'));
  for(const [title,rows] of [['Latest commits',snapshot.commits||[]],['Open pull requests',snapshot.pulls||[]],['Recent CI and deployment history',snapshot.runs||[]],['Open public issues',snapshot.issues||[]]]){
   out.append(el('h3',title));const list=el('ul');rows.forEach(r=>{const li=el('li');li.append(link(r.title,r.url),el('span',' · '+(r.conclusion||r.status||'')+' · '+new Date(r.updatedAt).toLocaleString(),'muted'));list.append(li);});if(!rows.length)list.append(el('li','No records in this checked snapshot.'));out.append(list);
  }
  const failures=(snapshot.runs||[]).filter(r=>['failure','cancelled','timed_out'].includes(r.conclusion));out.append(el('p',failures.length?`${failures.length} unsuccessful runs in this history. Open their records to inspect whether a later run resolved them.`:'No failed runs in this checked history. Older failures and unlisted checks are unknown.','muted'));
 }
 async function refreshGithub(){
  if(githubBusy)return;githubBusy=true;$('refresh-github').disabled=true;
  try{
   const [pages,commits,pulls,runs,issues]=await Promise.all([json(api+'/pages/builds/latest'),json(api+'/commits?per_page=5'),json(api+'/pulls?state=open&per_page=8'),json(api+'/actions/runs?per_page=12'),json(api+'/issues?state=open&per_page=20')]);
   const snapshot={checkedAt:new Date().toISOString(),pages:model.deployment(pages),commits:commits.map(c=>({title:c.sha.slice(0,7)+' '+c.commit.message.split('\n')[0],url:c.html_url,updatedAt:c.commit.committer.date})),pulls:pulls.map(p=>({title:'#'+p.number+' '+p.title,url:p.html_url,status:p.draft?'draft':'open',updatedAt:p.updated_at})),runs:runs.workflow_runs.map(r=>({title:r.name+' · '+r.head_sha.slice(0,7),url:r.html_url,status:r.status,conclusion:r.conclusion,updatedAt:r.updated_at})),issues:issues.filter(i=>!i.pull_request).map(i=>({title:'#'+i.number+' '+i.title,url:i.html_url,status:i.state,updatedAt:i.updated_at}))};renderGithub(snapshot,true);
  }catch{$('github-status').textContent+=' Refresh unavailable (network, API permissions or rate limit). The last checked values above remain; their timestamps are not current.';}finally{githubBusy=false;$('refresh-github').disabled=false;}
 }
 $('retry').addEventListener('click',()=>location.reload());$('copy-prompt').addEventListener('click',copy);$('close-prompt').addEventListener('click',()=>{$('prompt-panel').hidden=true;});$('refresh-github').addEventListener('click',refreshGithub);
 (async()=>{try{data=await json('../data/project-status.json');if(data.schemaVersion!==1||data.grades.length!==4)throw Error('invalid manifest');$('snapshot').textContent='Evidence updated '+new Date(data.updatedAt).toLocaleString()+' · '+model.age(data.updatedAt)+' · source '+data.sourceCommit.slice(0,7);$('content').hidden=false;summary();filters();drill();window.addEventListener('hashchange',()=>{drill();if(!$('drilldown').hidden)$('drilldown').scrollIntoView({block:'start'});});try{renderGithub(await json('../data/deployment-status.json'));}catch{$('github-status').textContent='Deployment snapshot unavailable. Refresh public GitHub data to check.';}}catch{$('load-error').hidden=false;$('snapshot').textContent='Project status unavailable.';}})();
})();
