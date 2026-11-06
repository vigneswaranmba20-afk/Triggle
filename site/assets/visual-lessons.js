/* Triggle Visual Lessons v1.27 — human-narrated MP4s uploaded later; no placeholder playback */
(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const modal=$('visualLessonDialog'),launcher=$('visualLessonAction'),video=$('vlVideo');
 if(!modal||!launcher||!video)return;
 let catalog=[],plannedIds=new Set(),selected=null,item=null,lang='en',launcherFocus=null,scrollAtOpen=0,openedEntry=false;
 const copy={
  en:{watch:'Watch Visual Lesson',comingSoon:'Visual lessons · Coming soon · Human narration on the way',title:'Watch Visual Lesson',back:'Back to question',question:'View original question',speed:'Playback speed',full:'Fullscreen',download:'Download Lesson',error:'Video could not load',errorText:'Please check your connection and try again. The written solution is still available.',preparing:'Preparing your lesson…',help:'On Android Chrome, if the MP4 opens instead of saving, long-press “Download Lesson” and choose Download link.'},
  ta:{watch:'காட்சி வழிப் பாடம்',comingSoon:'காட்சிப் பாடங்கள் · விரைவில் · மனிதக் குரல் விளக்கத்துடன்',title:'காட்சி வழிப் பாடம்',back:'கேள்விக்குத் திரும்பு',question:'அசல் கேள்வியைக் காண்க',speed:'வேகம்',full:'முழுத்திரை',download:'பாடத்தைப் பதிவிறக்கு',error:'காணொளியை ஏற்ற முடியவில்லை',errorText:'இணையத்தைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும். எழுத்துத் தீர்வு தொடர்ந்து கிடைக்கும்.',preparing:'பாடம் தயாராகிறது…',help:'Android Chrome-ல் காணொளி திறந்தால், பதிவிறக்க இணைப்பை நீண்ட நேரம் அழுத்தி Download link தேர்வு செய்க.'}
 };
 const ui=k=>copy[lang]?.[k]||copy.en[k];
 const mediaUrl=p=>typeof p==='string'&&((p.startsWith('./videos/')&&!p.includes('..')&&!p.includes('\\'))||/^https:\/\/[^\s]+$/.test(p));
 const validRec=r=>r&&r.questionId&&r.status&&r.status==='ready'&&mediaUrl(r.video)&&/\.mp4(?:[?#].*)?$/i.test(r.video);
 function refresh(){
   selected=catalog.find(r=>r.questionId===item?.id&&validRec(r)&&(r.language===lang||r.language==='visual'))||catalog.find(r=>r.questionId===item?.id&&validRec(r)&&r.language==='en')||null;
   const isPlanned=!!item&&plannedIds.has(item.id);
   launcher.hidden=!selected&&!isPlanned;
   $('visualLessonBtn').hidden=!selected;
   $('visualLessonAvailability').hidden=!selected;
   $('visualLessonComingSoon').hidden=!!selected||!isPlanned;
   $('visualLessonComingSoonText').textContent=ui('comingSoon');
   if(!selected)return;
   $('visualLessonBtnLabel').textContent=ui('watch');
   $('visualLessonAvailability').textContent=lang==='ta'&&selected.language==='en'?'ஆங்கிலக் குரல் விளக்கம்':'';
 }
 function sync(d){item=d?.item||null;lang=d?.lang==='ta'?'ta':'en';refresh();}
 window.addEventListener('triggle:lessonchange',e=>sync(e.detail));
 function hideError(){ $('vlError').hidden=true; $('vlVideoWrap').hidden=false; }
 function showError(){ $('vlLoading').hidden=true; $('vlError').hidden=false;$('vlVideoWrap').hidden=true;$('vlErrorTitle').textContent=ui('error');$('vlErrorText').textContent=ui('errorText'); }
 function configure(){
   $('vlTitle').textContent=selected.title?.[lang]||selected.title?.en||ui('title');
   $('vlEyebrow').textContent=(lang==='ta'?'வகுப்பு ':'CLASS ')+selected.class+' · EXERCISE '+selected.exercise+' · '+selected.question;
   $('vlCloseLabel').textContent=ui('back');
   $('vlQuestionSummary').textContent=ui('question');
   $('vlQuestion').textContent=item.q?.[lang]||item.q?.en||'';
   $('vlSpeedLabel').textContent=ui('speed');$('vlFullscreenLabel').textContent=ui('full');
   $('vlDownloadLabel').textContent=ui('download');$('vlErrorTitle').textContent=ui('error');$('vlErrorText').textContent=ui('errorText');
   $('vlLoading').textContent=ui('preparing');$('vlDownloadHelp').textContent=ui('help');
   $('vlNotice').textContent='';
   $('vlDownload').hidden=!selected.downloadAllowed;
   const u=new URL(selected.downloadUrl&&mediaUrl(selected.downloadUrl)?selected.downloadUrl:selected.video,document.baseURI);
   $('vlDownload').href=u.href;
   // HTML download is reliable for same-origin links. Cross-origin CDNs need Content-Disposition: attachment.
   if(u.origin===location.origin){$('vlDownload').download=u.pathname.split('/').at(-1);$('vlDownload').removeAttribute('target');}
   else{$('vlDownload').removeAttribute('download');$('vlDownload').target='_blank';$('vlDownload').rel='noopener noreferrer';}
 }
 function beginLoad(){
   if(!selected)return;
   hideError();$('vlLoading').hidden=false;
   video.pause();video.removeAttribute('src');video.load();
   if(selected.poster&&mediaUrl(selected.poster))video.poster=new URL(selected.poster,document.baseURI).href;
   else video.removeAttribute('poster');
   video.src=new URL(selected.video,document.baseURI).href;
   video.playbackRate=Number($('vlSpeed').value)||1;
   video.load();
 }
 function open(){
   if(!selected||!item)return;
   launcherFocus=document.activeElement instanceof HTMLElement?document.activeElement:$('visualLessonBtn');
   scrollAtOpen=window.scrollY;
   configure();
   $('vlQuestionDetails').open=false;
   if(!modal.open)modal.showModal();
   // A separate history entry means Android Back dismisses the player instead of leaving the question.
   try{history.pushState({triggleVisual:true},'',location.href);openedEntry=true;}catch{openedEntry=false;}
   beginLoad();$('vlClose').focus({preventScroll:true});
 }
 function cleanup(){
   video.pause();video.removeAttribute('src');video.removeAttribute('poster');video.load();
   $('vlLoading').hidden=true;hideError();
   if(modal.open)modal.close();
   requestAnimationFrame(()=>{window.scrollTo(0,scrollAtOpen);(launcherFocus?.isConnected?launcherFocus:$('visualLessonBtn')).focus({preventScroll:true});});
 }
 function close(){
   if(!modal.open)return;
   if(openedEntry&&history.state?.triggleVisual){history.back();return;}
   openedEntry=false;cleanup();
 }
 $('visualLessonBtn').addEventListener('click',open);
 $('vlClose').addEventListener('click',close);
 modal.addEventListener('cancel',e=>{e.preventDefault();close();});
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 // Registered capture-phase: prevents the existing exercise navigator treating Video Back as an exercise change.
 window.addEventListener('popstate',e=>{
   if(!modal.open)return;
   openedEntry=false;cleanup();e.stopImmediatePropagation();
 },true);
 $('vlRetry').addEventListener('click',beginLoad);
 $('vlSpeed').addEventListener('change',()=>{video.playbackRate=Number($('vlSpeed').value)||1;});
 $('vlFullscreen').addEventListener('click',async()=>{try{if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();else if(video.requestFullscreen)await video.requestFullscreen();}catch{}});
 video.addEventListener('loadedmetadata',()=>{$('vlLoading').hidden=true;});
 video.addEventListener('canplay',()=>{$('vlLoading').hidden=true;});
 video.addEventListener('error',()=>{if(video.src)showError();});
 video.addEventListener('waiting',()=>{$('vlLoading').hidden=false;});
 video.addEventListener('playing',()=>{$('vlLoading').hidden=true;});
 // Use the production shortlist for a quiet Coming Soon indicator. It is NOT a playable video.
 Promise.all([
   fetch('./data/video-lessons.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('manifest '+r.status);return r.json()}).catch(err=>{console.warn('Triggle: no video manifest yet',err);return {lessons:[]}}),
   fetch('./data/video-production-plan.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('plan '+r.status);return r.json()}).catch(err=>{console.warn('Triggle: no video production plan',err);return {plans:[]}})
 ]).then(([d,plan])=>{
   catalog=(d.lessons||[]).filter(validRec);
   plannedIds=new Set((plan.plans||[]).map(r=>r.questionId).filter(Boolean));
   const params=new URL(location.href).searchParams,g=Number(params.get('class'))||9;
   item=(window.TRIGGLE_CLASSES?.[g]?.items||[]).find(i=>i.id===params.get('question'))||null;
   try{const v=localStorage.getItem('triggle-language');lang=v==='ta'||v==='"ta"'?'ta':'en'}catch{}
   refresh();
 });
 window.TriggleVisualPlayer={get status(){return {active:!!selected,questionId:selected?.questionId||null,open:modal.open}}};
})();
