// Check opt-in full-screen lesson player without network. The Android browser is tested separately.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/video-lessons.json'),'utf8'));
const plan=JSON.parse(fs.readFileSync(path.join(root,'data/video-production-plan.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.equal(manifest.lessons.length,1);
assert.equal(manifest.lessons[0].questionId,'c12-4-4-1-2');
assert.equal(manifest.lessons[0].provider,'cloudflare-r2');
assert.equal(manifest.lessons[0].video,'https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/triggle-class12-ex4-1-q1-ii%20(1).mp4');
assert.equal(manifest.lessons[0].webm,'./videos/triggle-class12-ex4-1-q1-ii.webm');
assert.equal(manifest.lessons[0].downloadAllowed,false);
assert.equal(manifest.lessons[0].language,'en');
assert.equal(plan.plans.length,15);
assert.match(html,/id="visualLessonBtn"[^>]+aria-haspopup="dialog"/);
assert.doesNotMatch(html,/id="vlInlinePanel"/,'Video must not expand inside the scrolled lesson');
assert.doesNotMatch(html,/id="vlFullscreen"/,'There must be no redundant fullscreen button');
assert.match(html,/<section class="vl-question-details" id="vlQuestionDetails" aria-labelledby="vlQuestionSummary">/,
  'Full question must be in a permanently displayed semantic section');
function run(catalog,label){
 return new Promise((resolve,reject)=>{
  const listeners=new Map(),els=new Map();
  class FakeEl{
   constructor(id){this.id=id;this.hidden=id==='visualLessonAction'||id==='visualLessonComingSoon';this.open=false;this.textContent='';this.playbackRate=1;this.src='';this.href='';this.dataset={};this.events=new Map();this.isConnected=true;}
   addEventListener(name,cb){this.events.set(name,cb)}
   dispatch(name){const fn=this.events.get(name);if(fn)fn({target:this,preventDefault(){}})}
   setAttribute(k,v){this[k]=v}
   removeAttribute(k){this[k]=''}
   showModal(){this.open=true}
   close(){this.open=false}
   pause(){this.paused=true}
   load(){this.loaded=(this.loaded||0)+1}
   focus(){this.focused=true}
   closest(){return this}
  }
  const $=id=>{if(!els.has(id))els.set(id,new FakeEl(id));return els.get(id)};
  const location=new URL('https://example.test/Triggle/index.html?class=12&question=c12-4-4-1-2');
  const item={id:'c12-4-4-1-2',q:{
    en:'Find x in −3π ≤ x ≤ 3π for which sin x = −1.',
    ta:'−3π ≤ x ≤ 3π வரம்பில் sin x = −1 ஆகும் x மதிப்புகளைக் காண்க.'
  }};
  const win={TRIGGLE_CLASSES:{12:{items:[item]}},addEventListener:(k,cb)=>{const a=listeners.get(k)||[];a.push(cb);listeners.set(k,a);},dispatchEvent(e){for(const cb of listeners.get(e.type)||[])cb(e)}};
  const history={state:{},pushState(s){this.state=s},back(){this.state={};for(const cb of listeners.get('popstate')||[])cb({stopImmediatePropagation(){}})}};
  const document={baseURI:location.href,getElementById:$};
  const sandbox={window:win,document,location,history,URL,console,
    fetch:async uri=>({ok:true,json:async()=>uri.includes('video-production-plan')?plan:catalog}),
    localStorage:{getItem(){return'en'}},requestAnimationFrame:fn=>fn()};
  vm.runInNewContext(fs.readFileSync(path.join(root,'assets/visual-lessons.js'),'utf8'),sandbox,{filename:'visual-lessons.js'});
  setTimeout(()=>{
   try{
    assert.equal($('visualLessonAction').hidden,false,label+': planned question has a status');
    assert.equal($('visualLessonBtn').hidden,label==='coming',label+': only ready videos offer a button');
    assert.equal($('visualLessonComingSoon').hidden,label!=='coming',label+': coming soon is truthful');
    if(label==='coming'){
      assert.equal($('vlMp4Source').src,'','No media is loaded without a verified video');
      win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'ta',item}});
      assert.match($('visualLessonComingSoonText').textContent,/விரைவில்/);
    }else{
      assert.equal($('vlMp4Source').src,'','Media must not load before the button is pressed');
      assert.match($('visualLessonBtnLabel').textContent,/video explanation/);
      $('visualLessonBtn').dispatch('click');
      assert.equal($('visualLessonDialog').open,true,'Click opens the lesson dialog directly');
      assert.equal($('vlQuestion').textContent,item.q.en,'The original question is displayed in full');
      assert.equal($('vlQuestionSummary').textContent,'Full question','Question is visibly labelled');
      assert.equal($('vlDownloadHelp').hidden,
        label==='drive'||label==='published'||label==='r2',
        'No misleading download instructions for non-downloadable lessons');
      assert.equal($('vlVideo').paused,true,'Never autoplay');
      if(label==='drive'){
        const id='1zBG7dqiwPnwaIe6EqcZKutlqniGiq78i';
        assert.equal($('vlDriveFrame').src,'https://drive.google.com/file/d/'+id+'/preview');
        assert.equal($('vlDownload').href,'https://drive.google.com/file/d/'+id+'/view');
        assert.equal($('vlSpeed').hidden,true,'Drive manages speed');
      }else{
        assert.match($('vlMp4Source').src,/\.mp4$/);
        if(label==='published')assert.equal($('vlMp4Source').src,manifest.lessons[0].video);
        if(label==='published'||label==='r2')assert.match($('vlWebmSource').src,/\.webm$/);
        assert.match($('vlDownload').href,/\.mp4$/);
        assert.equal($('vlDownload').hidden,label!=='native','Cross-origin downloads stay disabled');
      }
      $('vlClose').dispatch('click');
      assert.equal($('visualLessonDialog').open,false,'Close returns immediately to the question');
      assert.equal($('vlVideo').paused,true,'Close pauses playback');
      assert.equal($('vlMp4Source').src,'','Close unloads the MP4');
      assert.match($('visualLessonBtnLabel').textContent,/video explanation/,'Button resets on close');
      $('visualLessonBtn').dispatch('click');
      assert.equal($('visualLessonDialog').open,true,'Video can be reopened with one tap');
      $('vlClose').dispatch('click');
    }
    win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'en',item:{id:'unplanned'}}});
    assert.equal($('visualLessonAction').hidden,true,'No video action on an unrelated question');
    resolve();
   }catch(err){reject(err)}
  },0);
 });
}
(async()=>{
 await run({lessons:[]},'coming');
 await run({lessons:[{...plan.plans[0],status:'ready'}]},'native');
 await run(manifest,'published');
 const r2={...manifest.lessons[0],provider:'cloudflare-r2',video:'https://videos.triggle.example/grade-12/chapter-4/en.mp4',webm:'https://videos.triggle.example/grade-12/chapter-4/en.webm',downloadAllowed:false};
 await run({lessons:[r2]},'r2');
 await run({lessons:[{...r2,video:'http://videos.triggle.example/grade-12/chapter-4/en.mp4'}]},'coming');
 await run({lessons:[{...r2,webm:'https://other.invalid/chapter-4/en.webm'}]},'coming');
 await run({lessons:[{...manifest.lessons[0],provider:'google-drive',fileId:'1zBG7dqiwPnwaIe6EqcZKutlqniGiq78i',video:undefined}]},'drive');
 console.log('PASS: direct dialog, no fullscreen clutter, video close/reset, R2/WebM and Drive, no autoplay');
})().catch(err=>{console.error(err);process.exitCode=1});
