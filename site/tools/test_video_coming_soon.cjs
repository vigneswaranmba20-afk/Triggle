// Test video availability gating without a network or a browser. Not a substitute for Android testing.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/video-lessons.json'),'utf8'));
const plan=JSON.parse(fs.readFileSync(path.join(root,'data/video-production-plan.json'),'utf8'));
assert.equal(manifest.lessons.length,1,'Exactly one reviewed Gemini lesson should be published');
assert.equal(manifest.lessons[0].questionId,'c12-4-4-1-2');
assert.equal(manifest.lessons[0].provider,'github-pages');
assert.equal(manifest.lessons[0].video,'./videos/triggle-class12-ex4-1-q1-ii.mp4');
assert.equal(manifest.lessons[0].language,'en');
assert.equal(plan.plans.length,15,'Keep the selected future video shortlist');
function run(catalog, label){
 return new Promise((resolve,reject)=>{
  const listeners=new Map(),els=new Map();
  class FakeEl{
   constructor(id){this.id=id;this.hidden=id==='visualLessonAction'||id==='visualLessonComingSoon';this.open=false;this.textContent='';this.playbackRate=1;this.src='';this.href='';this.dataset={};this.events=new Map();this.style={};this.isConnected=true;}
   addEventListener(event,cb){this.events.set(event,cb)}
   dispatch(event,props={}){let cb=this.events.get(event);if(cb)cb({target:this,preventDefault(){},...props});}
   setAttribute(k,v){this[k]=v}
   removeAttribute(k){this[k]=''}
   showModal(){this.open=true}
   close(){this.open=false}
   pause(){this.paused=true}
   load(){this.loaded=(this.loaded||0)+1}
   focus(){this.focused=true}
   querySelector(){return this}
   closest(){return this}
  }
  const $=id=>{if(!els.has(id))els.set(id,new FakeEl(id));return els.get(id)};
  const location=new URL('https://example.test/Triggle/index.html?class=12&question=c12-4-4-1-2');
  const item={id:'c12-4-4-1-2',q:{en:'Find x if sin x = −1.',ta:'சைன் −1'}};
  const win={TRIGGLE_CLASSES:{12:{items:[item]}},addEventListener:(k,cb)=>{let arr=listeners.get(k)||[];arr.push(cb);listeners.set(k,arr)},dispatchEvent(e){for(const cb of listeners.get(e.type)||[])cb(e)},scrollTo(){},scrollY:310};
  const history={state:{},pushState(s){this.state=s},back(){this.state={};let stopped=false;for(const cb of listeners.get('popstate')||[]){if(stopped)break;cb({stopImmediatePropagation(){stopped=true}})}}};
  const document={baseURI:location.href,getElementById:$,activeElement:$('visualLessonBtn')};
  const sandbox={window:win,document,location,history,HTMLElement:FakeEl,URL,console,fetch:async uri=>({ok:true,json:async()=>uri.includes('video-production-plan')?plan:catalog}),localStorage:{getItem(){return 'en'}},requestAnimationFrame:f=>f()};
  vm.runInNewContext(fs.readFileSync(path.join(root,'assets/visual-lessons.js'),'utf8'),sandbox,{filename:'visual-lessons.js'});
  setTimeout(()=>{
   try{
    assert.equal($('visualLessonAction').hidden,false,label+': planned question displays status');
    assert.equal($('visualLessonBtn').hidden,label!=='drive',label+': native player displays inline rather than requiring modal');
    assert.equal($('vlInlinePanel').hidden,label==='coming'||label==='drive',label+': inline panel gating');
    assert.equal($('visualLessonComingSoon').hidden,label!=='coming',label+': coming soon gating');
    if(label==='coming'){
     assert.match($('visualLessonComingSoonText').textContent,/Coming soon/);
     assert.equal($('vlVideo').src,'','No MP4 should be loaded');
     win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'ta',item}});
     assert.match($('visualLessonComingSoonText').textContent,/விரைவில்/,'Tamil placeholder');
    }else{
     if(label!=='drive'){
       assert.match($('vlInlineVideo').src,/\/videos\/triggle-class12-ex4-1-q1-ii\.mp4$/);
       assert.match($('vlInlineDownload').href,/\/videos\/triggle-class12-ex4-1-q1-ii\.mp4$/);
       assert.equal($('vlInlineVideo').paused,true,'inline video does not autoplay');
       assert.equal($('vlInlineVideo').loaded>0,true,'inline video is initialized');
       $('vlInlineFull').dispatch('click');
     }else $('visualLessonBtn').dispatch('click');
     assert.equal($('visualLessonDialog').open,true);
     assert.equal($('vlVideo').paused,true,'no autoplay');
     if(label==='drive'){
       const fileId='1zBG7dqiwPnwaIe6EqcZKutlqniGiq78i';
       assert.equal($('vlVideo').src,'','Drive is never interpreted as native MP4');
       assert.equal($('vlDriveFrame').src,'https://drive.google.com/file/d/'+fileId+'/preview');
       assert.equal($('vlDownload').href,'https://drive.google.com/file/d/'+fileId+'/view');
       assert.equal($('vlSpeed').hidden,true,'Drive player owns playback-speed controls');
       assert.equal($('vlFullscreen').hidden,true,'Drive player owns fullscreen');
       assert.equal($('vlDownloadHelp').hidden,true,'Native MP4 download tip must be hidden');
     }else{
       assert.match($('vlVideo').src,/triggle-class12-ex4-1-q1-ii\.mp4$/);
       assert.match($('vlDownload').href,/triggle-class12-ex4-1-q1-ii\.mp4$/);
     }
     $('vlClose').dispatch('click');
     assert.equal($('visualLessonDialog').open,false);
     if(label==='drive')assert.equal($('vlDriveFrame').src,'','Close must stop Drive playback');
    }
    win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'en',item:{id:'unplanned',q:{en:'other'}}}});
    assert.equal($('visualLessonAction').hidden,true,'Other questions remain uncluttered');
    resolve();
   }catch(e){reject(e)}
  },0)
 })
}
(async()=>{
 await run({lessons:[]},'coming');
 const ready={...plan.plans[0],status:'ready'};
 await run({lessons:[ready]},'native');
 await run(manifest,'published');
 await run({lessons:[{...manifest.lessons[0],provider:'google-drive',fileId:'1zBG7dqiwPnwaIe6EqcZKutlqniGiq78i',video:undefined}]},'drive');
 console.log('PASS: missing-video fallback, native inline MP4, bigger viewer, download link, legacy Drive support, no autoplay and route gating');
})().catch(e=>{console.error(e);process.exitCode=1});
