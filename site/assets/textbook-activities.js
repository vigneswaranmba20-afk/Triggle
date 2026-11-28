/* Minimal bilingual textbook activity cards; source text is never rewritten.
   No added network libraries; works offline and on low-memory Android devices. */
(()=>{'use strict';
 const words={
  en:{heading:'Thinking Corner & Activities',source:'Textbook page',review:'Source / review',answer:'Worked answer',verify:'Figure or typesetting still needs source checking',partial:'Some source-table entries still need checking',pending:'Independent Tamil editorial review pending'},
  ta:{heading:'சிந்தனை மூலை & செயல்பாடுகள்',source:'பாடநூல் பக்கம்',review:'ஆதாரம் / மீளாய்வு',answer:'விளக்க விடை',verify:'படம் அல்லது குறியீடு சரிபார்க்கப்பட வேண்டும்',partial:'அட்டவணையின் சில பதிவுகள் சரிபார்க்கப்பட வேண்டும்',pending:'சுயாதீனத் தமிழ் ஆசிரியர் மீளாய்வு நிலுவையில் உள்ளது'}
 };
 const pick=(value,lang)=>typeof value==='string'?value:(value?.[lang]||value?.en||'');
 function paragraph(parent,text,cls){
  if(!text?.trim())return;
  const p=document.createElement('p');p.className=cls;p.textContent=text.trim();if(window.TriggleNotation)p.innerHTML=window.TriggleNotation.render(window.TriggleG9Math?.text(text.trim())??text.trim());parent.append(p);
 }
 // An actual table is much easier to compare than six numbers inside each
 // sentence. Extract only rows already written in the reviewed answer string.
 function cardinalityTable(answer,worked,language){
  const rowStart=/(?:\b[Rr]ow|வரி)\s*\d+\s*\[/g;
  const matches=[...answer.matchAll(/(?:\b[Rr]ow|வரி)\s*(\d+)\s*\[([\d\s,]+)\]/g)];
  if(matches.length<3||matches.length!==[...answer.matchAll(rowStart)].length||matches.some((m,i)=>Number(m[1])!==i+1||m[2].split(',').length!==6||m[2].split(',').some(v=>!/^\d+$/.test(v.trim()))))return false;
  const table=document.createElement('table');table.className='activity-cardinality-table';
  const caption=document.createElement('caption');caption.textContent=language==='ta'?'கணங்களின் உறுப்புகள் அட்டவணை':'Completed cardinality table';table.append(caption);
  const thead=document.createElement('thead'),hrow=document.createElement('tr');
  for(const title of [language==='ta'?'வரி':'Row','n(A)','n(B)','n(A∪B)','n(A∩B)','n(A−B)','n(B−A)']){
   const th=document.createElement('th');th.scope='col';th.innerHTML=window.TriggleNotation.render(window.TriggleG9Math?.text(title)??title);hrow.append(th);
  }
  thead.append(hrow);table.append(thead);
  const tbody=document.createElement('tbody');
  for(const m of matches){
   const tr=document.createElement('tr');
   for(const value of [m[1],...m[2].split(',').map(x=>x.trim())]){const td=document.createElement('td');td.textContent=value;tr.append(td);}
   tbody.append(tr);
  }
  table.append(tbody);
  paragraph(worked,answer.slice(0,matches[0].index).replace(/(?:Completed table|முழு அட்டவணை)\s*\[n\(A\),\s*n\(B\),\s*n\(A∪B\),\s*n\(A∩B\),\s*n\(A−B\),\s*n\(B−A\)\]\s*:\s*$/i,''),'task-answer-lead');
  const viewport=document.createElement('div');viewport.className='activity-table-scroll';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label',caption.textContent);
  viewport.append(table);worked.append(viewport);
  for(let i=0;i<matches.length;i++){
   const m=matches[i];
   const remainder=answer.slice(m.index+m[0].length,matches[i+1]?.index??answer.length).trim().replace(/;\s*$/,'').trim();
   if(!remainder||/^[.;]$/.test(remainder))continue;
   const rowLabel=m[0].slice(0,m[0].indexOf('[')).trim();
   paragraph(worked,remainder.startsWith('(')?rowLabel+' '+remainder:remainder,'task-answer-check');
  }
  return true;
 }
 function mount(container,chapter,language){
  if(!container||!chapter?.id)return false;
  const entries=window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id];
  if(!Array.isArray(entries)||!entries.length)return false;
  const lang=language==='ta'?'ta':'en',t=words[lang];
  const section=document.createElement('section');section.className='textbook-extras';section.setAttribute('aria-label',t.heading);
  const heading=document.createElement('h3');heading.className='activity-index-heading';heading.textContent=t.heading;
  section.append(heading);
  const marks={activity:'◇',thinking:'✦',progress:'✓',other:'•'};
  const pendingTitle='English version only — Tamil editorial content pending. ';
  entries.forEach((item,index)=>{
   const card=document.createElement('details');card.className='textbook-extra';
   card.dataset.textbookItem=String(index+1);
   card.dataset.textbookReview=item.review||'source-matched';
   card.open=index===0; // The first question and its answer are immediately visible.
   const kind=Object.hasOwn(marks,item.kind)?item.kind:'other';
   card.dataset.activityKind=kind;
   const summary=document.createElement('summary');
   const original=pick(item.title,lang);
   const fallback=original.startsWith(pendingTitle);
   const title=fallback?original.slice(pendingTitle.length):original;
   const split=title.indexOf(' · ');
   const mark=document.createElement('span');mark.className='activity-mark';mark.setAttribute('aria-hidden','true');mark.textContent=marks[kind];
   const copy=document.createElement('span');copy.className='activity-copy';
   if(split>=0){
    const category=document.createElement('span');category.className='activity-kicker';category.textContent=title.slice(0,split);
    copy.append(category);
   }
   const name=document.createElement('span');name.className='activity-title';name.textContent=split>=0?title.slice(split+3):title;copy.append(name);
   if(fallback){
    const notice=document.createElement('span');notice.className='activity-translation-note';notice.textContent=pendingTitle.trim();copy.append(notice);
   }
   const toggle=document.createElement('span');toggle.className='activity-toggle';toggle.setAttribute('aria-hidden','true');
   summary.append(mark,copy,toggle);
   const question=document.createElement('p');question.className='task-question';question.innerHTML=window.TriggleNotation.render(window.TriggleG9Math?.text(pick(item.question,lang))??pick(item.question,lang));
   const worked=document.createElement('section');worked.className='task-solution';
   const label=document.createElement('h4');label.className='task-solution-label';label.textContent=t.answer;worked.append(label);
   const body=document.createElement('div');body.className='task-answer';
   const raw=pick(item.answer,lang);
   if(!cardinalityTable(raw,body,lang))paragraph(body,raw,'task-answer-text');
   worked.append(body);
   const source=document.createElement('details');source.className='task-source-details';
   const sourceToggle=document.createElement('summary');sourceToggle.textContent=t.review;
   const provenance=document.createElement('p');provenance.textContent=t.source+' '+item.page+' · '+t.pending;
   source.append(sourceToggle,provenance);
   if(item.review==='needs-visual-source-check'||item.review==='partially-checked'){
    paragraph(source,item.review==='partially-checked'?t.partial:t.verify,'task-source-warning');
   }
   card.append(summary,question,worked,source);
   section.append(card);
  });
  container.append(section);return true;
 }
 window.TriggleTextbookActivities=Object.freeze({mount});
})();
