// Test video availability gating without a network or a browser. Not a substitute for Android testing.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/video-lessons.json'),'utf8'));
const plan=JSON.parse(fs.readFileSync(path.join(root,'data/video-production-plan.json'),'utf8'));
assert.equal(manifest.lessons.length,0,'Must not ship silent pilot or prerecorded videos');
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
    assert.equal($('visualLessonBtn').hidden,label==='coming',label+': actionable button gating');
    assert.equal($('visualLessonComingSoon').hidden,label!=='coming',label+': coming soon gating');
    if(label==='coming'){
     assert.match($('visualLessonComingSoonText').textContent,/Coming soon/);
     assert.equal($('vlVideo').src,'','No MP4 should be loaded');
     win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'ta',item}});
     assert.match($('visualLessonComingSoonText').textContent,/விரைவில்/,'Tamil placeholder');
    }else{
     $('visualLessonBtn').dispatch('click');
     assert.equal($('visualLessonDialog').open,true);
     assert.equal($('vlVideo').paused,true,'no autoplay');
     assert.match($('vlVideo').src,/triggle-class12-ex4-1-q1-ii\.mp4$/);
     assert.match($('vlDownload').href,/triggle-class12-ex4-1-q1-ii\.mp4$/);
     $('vlClose').dispatch('click');
     assert.equal($('visualLessonDialog').open,false);
    }
    win.dispatchEvent({type:'triggle:lessonchange',detail:{lang:'en',item:{id:'unplanned',q:{en:'other'}}}});
    assert.equal($('visualLessonAction').hidden,true,'Other questions remain uncluttered');
    resolve();
   }catch(e){reject(e)}
  },0)
 })
}
(async()=>{
 await run(manifest,'coming');
 const ready={...plan.plans[0],status:'ready'};
 await run({lessons:[ready]},'ready');
 console.log('PASS: empty library, 15 coming-soon questions, Tamil, no MP4, ready-upload opens video, download, nonplanned hidden');
})().catch(e=>{console.error(e);process.exitCode=1});
