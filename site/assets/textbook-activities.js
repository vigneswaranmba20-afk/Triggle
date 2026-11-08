/* Reusable, offline textbook-prompt renderer for future Triggle chapters.
   The registry is loaded separately; missing or unverified material is not invented. */
(()=>{'use strict';
 const L=(en,ta)=>({en,ta});
 const words={
  en:{heading:'Textbook Thinking Corners & Activities',intro:'Try the question first, then open its worked answer. Answers are original explanations based on the 2025 SCERT Grade 9 textbook; independent Tamil editorial review is still pending.',source:'2025 textbook · printed page',thinking:'Thinking Corner',activity:'Activity',answer:'Show worked answer',verify:'Verify textbook figure / typesetting before treating this item as final',partial:'Some source-table entries still require checking',empty:'No textbook activities have been verified for this chapter yet.'},
  ta:{heading:'பாடநூல் சிந்தனை மூலைகளும் செயல்பாடுகளும்',intro:'முதலில் வினாவை நீங்களே முயலுங்கள்; பிறகு விரிவான விடையைத் திறக்கவும். 2025 பாடநூலை அடிப்படையாகக் கொண்ட விளக்கங்கள் இவை. தனித்த தமிழ் ஆசிரியர் மீளாய்வு இன்னும் நடைபெறவில்லை.',source:'2025 பாடநூல் · அச்சுப் பக்கம்',thinking:'சிந்தனை மூலை',activity:'செயல்பாடு',answer:'விளக்கத்துடன் விடை',verify:'பாடநூல் படம் / குறியீடு சரிபார்ப்பு இன்னும் தேவை',partial:'அட்டவணையின் சில மதிப்புகள் மீண்டும் சரிபார்க்கப்பட வேண்டும்',empty:'இந்த அத்தியாயத்துக்கான பாடநூல் செயல்பாடுகள் இன்னும் சரிபார்க்கப்படவில்லை.'}
 };
 const pick=(value,lang)=>typeof value==='string'?value:(value?.[lang]||value?.en||'');
 function mount(container,chapter,language){
  if(!container||!chapter?.id)return false;
  const entries=window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id];
  if(!Array.isArray(entries)||!entries.length)return false;
  const lang=language==='ta'?'ta':'en',t=words[lang];
  const section=document.createElement('section');
  section.className='textbook-extras';
  section.setAttribute('aria-label',t.heading);
  const h=document.createElement('h3');h.textContent=t.heading;
  const intro=document.createElement('p');intro.textContent=t.intro;
  section.append(h,intro);
  entries.forEach((item,index)=>{
   const card=document.createElement('details');card.className='textbook-extra';
   card.dataset.textbookItem=String(index+1);
   card.dataset.textbookReview=item.review||'source-matched';
   const summary=document.createElement('summary');
   summary.textContent=(index+1)+'. '+pick(item.title,lang);
   const source=document.createElement('p');source.className='source';
   source.textContent=t.source+' '+item.page+' · '+(item.kind==='thinking'?t.thinking:t.activity);
   const question=document.createElement('p');question.className='task-question';
   question.textContent=pick(item.question,lang);
   const answer=document.createElement('details');
   const answerSummary=document.createElement('summary');answerSummary.textContent=t.answer;
   const worked=document.createElement('div');worked.className='task-answer';
   worked.textContent=pick(item.answer,lang);
   answer.append(answerSummary,worked);card.append(summary,source,question,answer);
   if(item.review==='needs-visual-source-check'||item.review==='partially-checked'){
    const note=document.createElement('p');note.className='source';
    note.textContent=item.review==='partially-checked'?t.partial:t.verify;
    card.append(note);
   }
   section.append(card);
  });
  container.append(section);
  return true;
 }
 window.TriggleTextbookActivities=Object.freeze({mount});
})();
