/* Pure shared public-dashboard logic; no authentication or private data access. */
(function(root){
 'use strict';
 const statuses=['Not started','In progress','Awaiting verification','Blocked','Ready for deployment','Deployed','Awaiting teacher review','Approved'];
 function prompt(task){
  return `Work manually in vigneswaranmba20-afk/Triggle (https://github.com/vigneswaranmba20-afk/Triggle).
Read AGENTS.md and docs/TRIGGLE_MASTER_PROMPT.md, inspect latest main, and use a dedicated reviewable branch.
Scope: Grade ${task.grade}, Chapter ${task.chapter}, textbook Exercise ${task.exercise} ONLY.
Start: ${task.startingQuestion}. Current evidence-based state: ${task.status}.
Existing stable question IDs: ${task.questionIds?.length?task.questionIds.join(', '):'No authored IDs verified for the missing tasks. Inspect existing records; never invent or rename existing IDs.'}
Required source tasks/subparts: ${task.scope?.length?task.scope.join(', '):'Reconcile the full original source inventory first; the exact missing question/subpart is not yet verified. Do not guess.'}
Reason: ${task.reason}
Dependencies: ${(task.dependencies||[]).join(' ')}
Sources: ${(task.sources||[]).map(s=>s.title+' '+s.url).join('; ')||'Use docs/reference-library/2025-user-textbook-manifest.json to locate the matching owner Drive PDFs.'}
Starting source pages: ${task.sourcePages?'printed '+task.sourcePages.printed.join(', ')+'; PDF '+task.sourcePages.pdf.join(', '):'Unknown; verify the actual original pages before authoring.'}
Repository evidence: ${(task.evidence||[]).join(', ')}
Open the actual matching 2025 English AND Tamil textbook page images (correct volume); preserve exact textbook wording, question order, all required subparts, notation, tables and figures. Stop affected items when source access is blocked. Do not claim Tamil editorial certification without review.
Independently solve and mathematically verify every part. Write clear step-by-step How It Works explanations, accurate accessible figures where useful, and a green-highlighted final answer inside How It Works. Preserve existing validated content, IDs, navigation and student progress.
Use the existing guarded curriculum bulk tooling and lightweight content validation, exact-source fidelity checks, and relevant regression/browser tests at 320/390/430px. Run npm test, npm run test:browser and all required CI checks. Repair failures; never weaken security or tests.
Create a reviewable PR, confirm exact-head GitHub CI passes, merge through the existing workflow, and verify the actual GitHub Pages deployed commit and live question navigation before claiming deployment.
Update the relevant durable checkpoint and regenerate npm run status:build. Report completed questions/subparts versus the verified denominator, English/Tamil status, tests, PR, source commit, actual deployed commit, blockers and exact next missing task.
Do not generate worked examples, redesign student UI, perform unrelated curriculum bulk work, or create/read/change/resume recurring automation. Codex execution is manually initiated by the owner. Never publish private teacher feedback, identities, tokens or privileged APIs.`;
 }
 function filter(tasks,f){return tasks.filter(t=>['grade','chapter','exercise','priority','type','status'].every(k=>!f[k]||String(t[k])===String(f[k]))&&(!f.search||[t.id,t.reason,t.startingQuestion,...(t.scope||[])].join(' ').toLowerCase().includes(f.search.toLowerCase())));}
 function age(date,now=Date.now()){const minutes=Math.max(0,Math.floor((now-Date.parse(date))/60000));return Number.isFinite(minutes)?minutes<60?minutes+' min ago':minutes<1440?Math.floor(minutes/60)+' hr ago':Math.floor(minutes/1440)+' days ago':'age unknown';}
 function deployment(data){
  if(!data||data.status!=='built'||!/^([a-f0-9]{40})$/.test(data.commit||'')||!Number.isFinite(Date.parse(data.updated_at)))return null;
  return {commit:data.commit,status:'built',updatedAt:data.updated_at,url:data.url};
 }
 const api={statuses,prompt,filter,age,deployment};root.TriggleProject=Object.freeze(api);
 if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
