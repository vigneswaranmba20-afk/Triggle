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
  const p=document.createElement('p');p.className=cls;p.textContent=text.trim();parent.append(p);
 }
 // An actual table is much easier to compare than six numbers inside each
 // sentence. Extract only rows already written in the reviewed answer string.
 function cardinalityTable(answer,worked,language){
  const matches=[...answer.matchAll(/\b[Rr]ow\s*(\d+)\s*\[([\d\s,]+)\]/g)];
  if(matches.length<3||matches.some(m=>m[2].split(',').length!==6))return false;
  const table=document.createElement('table');table.className='activity-cardinality-table';
  const caption=document.createElement('caption');caption.textContent=language==='ta'?'கணங்களின் உறுப்புகள் அட்டவணை':'Completed cardinality table';table.append(caption);
  const thead=document.createElement('thead'),hrow=document.createElement('tr');
  for(const title of [language==='ta'?'வரி':'Row','n(A)','n(B)','n(A∪B)','n(A∩B)','n(A−B)','n(B−A)']){
   const th=document.createElement('th');th.scope='col';th.textContent=title;hrow.append(th);
  }
  thead.append(hrow);table.append(thead);
  const tbody=document.createElement('tbody');
  for(const m of matches){
   const tr=document.createElement('tr');
   for(const value of [m[1],...m[2].split(',').map(x=>x.trim())]){const td=document.createElement('td');td.textContent=value;tr.append(td);}
   tbody.append(tr);
  }
  table.append(tbody);
  paragraph(worked,answer.slice(0,matches[0].index).replace(/Completed table\s*\[[^\]]+\]\s*:?/i,''),'task-answer-lead');
  const viewport=document.createElement('div');viewport.className='activity-table-scroll';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label',caption.textContent);
  viewport.append(table);worked.append(viewport);
  const end=answer.lastIndexOf('Verify each row');
  if(end>=0)paragraph(worked,answer.slice(end),'task-answer-check');
  return true;
 }
 function mount(container,chapter,language){
  if(!container||!chapter?.id)return false;
  const entries=window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id];
  if(!Array.isArray(entries)||!entries.length)return false;
  const lang=language==='ta'?'ta':'en',t=words[lang];
  const section=document.createElement('section');section.className='textbook-extras';section.setAttribute('aria-label',t.heading);
  entries.forEach((item,index)=>{
   const card=document.createElement('details');card.className='textbook-extra';
   card.dataset.textbookItem=String(index+1);
   card.dataset.textbookReview=item.review||'source-matched';
   card.open=index===0; // The first question and its answer are immediately visible.
   const summary=document.createElement('summary');summary.textContent=(index+1)+'. '+pick(item.title,lang);
   const question=document.createElement('p');question.className='task-question';question.textContent=pick(item.question,lang);
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
