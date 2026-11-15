/* Triggle · Grade 9 Real Numbers interactive concept journey (SCERT 2025).
   Original bilingual demonstrations; accessible, self-contained and offline-first. */
(()=>{
'use strict';
const path=window.TRIGGLE_REAL_PATH;
if(!path||path.chapterId!=='g9-ch2')return;
const KEY='triggle.g9.real-journey.v1';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const notation=value=>{value=window.TriggleG9Math?.text(value)??value;return window.TriggleNotation?window.TriggleNotation.render(value):esc(value);};
const pick=(obj,lang)=>typeof obj==='string'?obj:obj?.[lang]||obj?.en||'';
const words={
 en:{kicker:'REAL NUMBERS · INTERACTIVE LAB',title:'See every number come alive',intro:'Move the controls, predict what changes, and test your understanding. Eight small explorations follow Chapter 2 of your 2025 SCERT textbook.',progress:'Concepts checked',source:'Textbook section',explore:'Explore this idea',check:'Now check yourself',hint:'Show a hint',why:'Why this works',right:'Correct! Explain it aloud or on paper.',wrong:'Not yet. Use the hint and try again.',paper:'Try this on paper',saved:'Progress is kept only on this device.',numberLine:'Number-line explorer',category:'Tap a number',move:'Move the point',factor:'Choose the factor',power:'Choose the power',magnitude:'Move the power of ten',next:'Next concept',previousIdea:'Previous idea',nextIdea:'Next idea',position:(n,total)=>'Idea '+n+' of '+total,navTip:'Use the arrows to move through all eight concepts.',detailed:'The picture is a mathematical model, not a copied textbook illustration.'},
 ta:{kicker:'மெய்யெண்கள் · செயல்பாட்டு ஆய்வகம்',title:'எண்களை இயக்கிப் புரிந்துகொள்வோம்',intro:'கட்டுப்பாடுகளை மாற்றி, விளைவைக் கணித்து, புரிதலைச் சோதிக்கவும். 2025 பாடநூலின் இரண்டாம் அத்தியாயத்திற்கான எட்டு சிறு செயல்பாடுகள்.',progress:'சரியாக முடித்த கருத்துகள்',source:'பாடநூல் பகுதி',explore:'இக்கருத்தை ஆராய்க',check:'இப்போது சரிபார்க்கவும்',hint:'குறிப்பைக் காட்டு',why:'இது ஏன் சரி?',right:'சரி! காரணத்தைச் சொல்லிப் பாருங்கள்.',wrong:'இன்னும் சரியில்லை. குறிப்பைப் பார்த்து மீண்டும் முயல்க.',paper:'தாளில் முயற்சி செய்க',saved:'முன்னேற்றம் இந்தச் சாதனத்தில் மட்டுமே சேமிக்கப்படும்.',numberLine:'எண்கோடு ஆய்வகம்',category:'ஓர் எண்ணைத் தேர்ந்தெடுக்கவும்',move:'புள்ளியை நகர்த்துக',factor:'காரணியைத் தேர்ந்தெடுக்கவும்',power:'அடுக்கைத் தேர்ந்தெடுக்கவும்',magnitude:'பத்தின் அடுக்கை மாற்றுக',next:'அடுத்த கருத்து',previousIdea:'முந்தைய கருத்து',nextIdea:'அடுத்த கருத்து',position:(n,total)=>total+' இல் கருத்து '+n,navTip:'எட்டு கருத்துகளையும் கற்க அம்புக்குறிகளைப் பயன்படுத்தவும்.',detailed:'இது பாடநூல் படத்தின் நகல் அல்ல; கணித விளக்கப்படம்.'}
};
const load=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(a)?a.filter(id=>path.stages.some(s=>s.id===id)):[])}catch{return new Set()}};
const save=done=>{try{localStorage.setItem(KEY,JSON.stringify([...done]))}catch{}};
function numberLine(min,max,points,ta){
 const x=v=>40+520*(v-min)/(max-min),y=82;
 let out='<svg class="rnlab-line" viewBox="0 0 600 166" role="img" aria-label="'+esc(ta?'எண்கோடு':'Number line')+'"><title>'+esc(ta?'எண்கோடு':'Number line')+'</title>'+
   '<line x1="38" y1="'+y+'" x2="564" y2="'+y+'" stroke="#697aa0" stroke-width="2.5"/><path d="M558 76L566 82L558 88" stroke="#697aa0" stroke-width="2" fill="none"/>';
 for(let i=0;i<=4;i++){const n=min+(max-min)*i/4;const precision=(max-min)<.01?4:(max-min)<.1?3:(max-min)<1?2:1;out+='<line x1="'+x(n)+'" y1="'+(y-6)+'" x2="'+x(n)+'" y2="'+(y+6)+'" stroke="#697aa0"/>'+
   '<text x="'+x(n)+'" y="113" fill="#5c5b73" font-size="14" text-anchor="middle">'+esc(Number(n.toFixed(precision)).toFixed(precision))+'</text>';}
 points.forEach((p,i)=>{const px=x(p.value);out+='<line x1="'+px+'" y1="'+(y-29)+'" x2="'+px+'" y2="'+y+'" stroke="'+(i===0?'#bf467d':'#527ab2')+'" stroke-width="3"/>'+
  '<circle cx="'+px+'" cy="'+y+'" r="5" fill="'+(i===0?'#bf467d':'#527ab2')+'"/>'+
  '<text x="'+px+'" y="'+(i===0?'32':i%2?'49':'16')+'" font-weight="750" font-size="15" text-anchor="middle" fill="#5c3272">'+esc(p.label)+'</text>';});
 return out+'</svg>';
}
function mount(container,chapter,language,onBack,initialConcept=null,onConcept=null){
 if(!container||chapter?.id!=='g9-ch2')return false;
 const lang=language==='ta'?'ta':'en',ta=lang==='ta',t=words[lang],done=load(),root=document.createElement('section');
 const backLabel=ta?'கருத்துகளுக்குத் திரும்பு':'Back to concepts';
 const explanationLabel=ta?'கருத்தைப் புரிந்துகொள்':'Understand the idea';
 root.className='sp2-journey rnlab';root.dataset.view='index';
 root.setAttribute('aria-label',ta?'மெய்யெண்கள் கருத்துகள்':'Real Numbers concepts');
 root.innerHTML='<div class="sp2-index-view" data-index-view>'+
   '<nav class="sp2-nav" data-nav role="group" aria-label="'+esc(ta?'ஒரு கருத்தைத் தேர்ந்தெடுக்கவும்':'Choose a concept')+'"></nav></div>'+
   '<div class="sp2-detail-view" data-detail-view hidden>'+
   '<div class="sp2-detail-navigation"><button type="button" class="sp2-back-index" data-back-index>← '+esc(backLabel)+'</button></div>'+
   '<div class="sp2-panel" data-panel></div>'+
   '<nav class="sp2-journey-footer" data-adaptive-dock aria-label="'+esc(ta?'கருத்துகளுக்கிடையே நகர்க':'Move between concepts')+'">'+
   '<button type="button" class="sp2-footer-prev" data-footer-prev>← '+esc(t.previousIdea)+'</button>'+
   '<button type="button" class="sp2-footer-next" data-footer-next></button></nav></div>';
 container.append(root);
 const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');
 const indexView=root.querySelector('[data-index-view]'),detailView=root.querySelector('[data-detail-view]');
 let active=-1;
 path.stages.forEach((stage,i)=>{
  const button=document.createElement('button');button.type='button';
  button.className='sp2-nav-button';button.dataset.index=String(i);
  button.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+esc(pick(stage.title,lang))+
   '</span><span class="sp2-done-mark" aria-hidden="true"></span>';
  button.addEventListener('click',()=>show(i,true));nav.append(button);
 });
 function update(){
  nav.querySelectorAll('button').forEach((button,i)=>{
   const selected=active===i,complete=done.has(path.stages[i].id);
   button.classList.toggle('sp2-current',selected);button.classList.toggle('sp2-done',complete);
   button.setAttribute('aria-pressed',String(selected));button.setAttribute('aria-current',selected?'step':'false');
   button.querySelector('.sp2-done-mark').textContent=complete?'✓':'';
  });
  root.querySelector('[data-footer-prev]').disabled=active<=0;
  const next=root.querySelector('[data-footer-next]');
  next.textContent=active===path.stages.length-1?backLabel+' →':t.nextIdea+' →';
  next.classList.toggle('is-return',active===path.stages.length-1);
 }
 function showIndex(focus=false,notify=true){
  active=-1;root.dataset.view='index';indexView.hidden=false;detailView.hidden=true;update();
  if(notify&&typeof onConcept==='function')onConcept(null,true);
  if(focus){nav.querySelector('button')?.focus({preventScroll:true});root.scrollIntoView({behavior:'auto',block:'start'});}
 }
 root.querySelector('[data-back-index]').addEventListener('click',()=>showIndex(true));
 root.querySelector('[data-footer-prev]').addEventListener('click',()=>show(active-1,true));
 root.querySelector('[data-footer-next]').addEventListener('click',()=>{
  if(active===path.stages.length-1){showIndex(true);return;}
  show(active+1,true);
 });
 function controls(label,items,value,onChange){const host=panel.querySelector('[data-demo-controls]');
  const group=document.createElement('div');group.className='rnlab-choices';group.setAttribute('role','group');group.setAttribute('aria-label',label);
  items.forEach(([val,caption])=>{const b=document.createElement('button');b.type='button';b.className='rnlab-choice';b.dataset.demoMode=String(val);if(typeof caption==='object'){b.innerHTML=caption.html;b.setAttribute('aria-label',caption.label);}
   else{b.innerHTML='<span class="rnlab-math-choice">'+notation(caption)+'</span>';b.setAttribute('aria-label',String(caption));}
   b.setAttribute('aria-pressed',String(val===value));b.addEventListener('click',()=>{
    group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    onChange(val);});group.append(b);});host.append(group);onChange(value);
 }
 function slider(label,min,max,step,initial,onChange){const host=panel.querySelector('[data-demo-controls]');
  const wrap=document.createElement('div');wrap.className='rnlab-range';
  const id='rnlab-range-'+active;
  wrap.innerHTML='<label for="'+id+'">'+esc(label)+' <output data-value></output></label>'+
   '<input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+initial+'"/>';
  host.append(wrap);const input=wrap.querySelector('input'),output=wrap.querySelector('output');
  const change=()=>{output.textContent=input.value;onChange(Number(input.value));};input.addEventListener('input',change);change();
 }

 // The textbook method shown as short, explicit equations rather than a
 // slash-filled paragraph. Native MathML keeps entire denominators under
 // their fraction bars on Android and desktop.
 const tag=(name,content)=>'<'+name+'>'+content+'</'+name+'>';
 const mn=value=>tag('mn',esc(value));
 const mo=value=>tag('mo',esc(value));
 const mrow=body=>tag('mrow',body);
 const math=(body,label,display=false)=>'<math xmlns="http://www.w3.org/1998/Math/MathML" class="triggle-math rnlab-rational-math"'+
    (display?' display="block"':'')+' aria-label="'+esc(label)+'">'+body+'</math>';
 const displayMath=(body,label)=>math(body,label,true);
 // Break naturally into two centred pieces on narrow screens; never shrink
 // an entire fraction chain until its numerators become unreadable.
 const equationFlow=(left,operator,right,label)=>
   '<div class="rnlab-equation-flow" role="group" aria-label="'+esc(label)+'">'+
   displayMath(left,label+' first expression')+
   '<span class="rnlab-equation-operator" aria-hidden="true">'+esc(operator)+'</span>'+
   displayMath(right,label+' second expression')+'</div>';
 const sqrt=value=>tag('msqrt',mn(value));
 const pair=(rad,sign)=>mrow(sqrt(rad)+mo(sign)+mn('2'));
 const bracket=body=>mrow(mo('(')+body+mo(')'));
 const fraction=(top,bottom)=>tag('mfrac',top+bottom);
 const product=(num,rad)=>num===1?pair(rad,'−'):mrow(mn(num)+'<mspace width="0.16em"/>'+bracket(pair(rad,'−')));
 function rationalDemo(mode){
   const rad=mode==='seven'?7:5,num=rad-4;
   const label=ta?'இறுதி விடை':'Final answer';
   const start=fraction(mn(num),pair(rad,'+'));
   const conjugate=pair(rad,'−');
   const conjugateFraction=fraction(bracket(conjugate),bracket(conjugate));
   const multiply=start+mo('×')+conjugateFraction;
   const denominator=mrow(mn(rad)+mo('−')+mn(4));
   const simplify=fraction(product(num,rad),denominator);
   const finalAnswer=pair(rad,'−');
   const steps=[
     [ta?'தொடக்கப் பின்னம்':'Start with the fraction',start,
       ta?'வர்க்கமூலம் கீழே உள்ள பகுதியில் உள்ளது.':'The denominator contains a square root.'],
     [ta?'இணை முறுடால் பெருக்குக':'Multiply by the conjugate',multiply,
       ta?'கூட்டல் குறியை கழித்தல் குறியாக மாற்றவும். அதே காரணியால் மேலேயும் கீழேயும் பெருக்குவதால் மதிப்பு மாறாது.':
          'Change + to −. Multiplying top and bottom by the same nonzero expression keeps the value unchanged.'],
     [ta?'கீழ்ப்பகுதியை எளிமைப்படுத்துக':'Simplify the denominator',simplify,
       ta?'(√'+rad+')² − 2² = '+rad+' − 4 = '+num+'. வர்க்கமூலம் கீழே நீங்கிவிட்டது.':
          '(√'+rad+')² − 2² = '+rad+' − 4 = '+num+'. The square root disappears from the bottom.'],
     [ta?'ஒரே காரணியை நீக்குக':'Cancel the common factor',
       fraction(product(num,rad),mn(num))+mo('=')+finalAnswer,
       ta?'மேலேயும் கீழேயும் உள்ள '+num+'-ஐ நீக்கினால் இறுதி விடை கிடைக்கும்.':
          'Divide numerator and denominator by '+num+' to get the final answer.']
   ];
   const visual=panel.querySelector('[data-demo-visual]');
   const output=panel.querySelector('[data-demo-output]');
   panel.querySelector('.sp2-demo').classList.add('rnlab-chatgpt-math');
   visual.innerHTML='<p class="rnlab-rational-goal">'+esc(ta?
     'நோக்கம்: பின்னத்தின் கீழ்ப்பகுதியில் உள்ள வர்க்கமூலத்தை நீக்குவோம்.':
     'Our goal is to remove the square root from the bottom of the fraction.')+'</p>';
   output.innerHTML='<ol class="rnlab-rational-steps">'+steps.map(([title,equation,why],i)=>{
     const displayed=i===1?equationFlow(start,'×',conjugateFraction,title):
       i===3?equationFlow(fraction(product(num,rad),mn(num)),'=',finalAnswer,title):
       displayMath(equation,title);
     return '<li class="rnlab-rational-step">'+
       '<div class="rnlab-step-heading"><span class="rnlab-step-number">'+(i+1)+'</span>'+
       '<strong>'+esc(title)+'</strong></div>'+
       '<div class="rnlab-step-content"><p>'+esc(why)+'</p>'+
       '<div class="rnlab-step-equation triggle-display-equation">'+displayed+'</div></div></li>';
   }).join('')+'</ol>'+
     '<div class="rnlab-rational-result"><strong>'+esc(label)+'</strong>'+
     '<div class="triggle-display-equation">'+displayMath(finalAnswer,'square root of '+rad+' minus 2')+'</div></div>';
   panel.querySelector('.rnlab-source-note').textContent=ta?
     'இந்த விளக்கம் பாடநூலின் விகிதப்படுத்துதல் முறையை அடிப்படையாகக் கொண்டது.':
     'A step-by-step explanation of the textbook rationalisation method.';
 }
 // A short, visible-to-screen-readers foundation path. Each selected beat occupies
 // one compact card, instead of stacking lengthy explanations on an Android screen.
 function foundationMarkup(stage){
  if(!Array.isArray(stage.foundation)||!stage.foundation.length)return '';
  return '<section class="rnlab-foundation" aria-label="'+esc(ta?'கருத்தின் அடிப்படை படிகள்':'Understand the idea step by step')+'">'+
   '<div class="rnlab-foundation-tabs" role="group" aria-label="'+esc(ta?'கற்றல் படிகளைத் தேர்ந்தெடுக்கவும்':'Choose a learning step')+'">'+
   stage.foundation.map((step,i)=>'<button type="button" data-foundation-step="'+i+'" aria-pressed="'+(i===0)+'">'+
     '<span class="rnlab-foundation-num">'+(i+1)+'</span><span>'+esc(pick(step.label,lang))+'</span></button>').join('')+
   '</div><div class="rnlab-foundation-current" data-foundation-current aria-live="polite"></div></section>';
 }
 function bindFoundation(stage){
  if(!Array.isArray(stage.foundation)||!stage.foundation.length)return;
  const host=panel.querySelector('[data-foundation-current]');
  const buttons=[...panel.querySelectorAll('[data-foundation-step]')];
  function select(i){
   const step=stage.foundation[i];
   buttons.forEach((b,index)=>b.setAttribute('aria-pressed',String(i===index)));
   host.innerHTML='<p>'+notation(pick(step.explain,lang))+'</p>'+
    '<div class="rnlab-foundation-equation" role="group" aria-label="'+esc(pick(step.label,lang))+'">'+
    notation(step.math)+'</div>';
  }
  buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
  select(0);
 }
 function renderDemo(index){
  const visual=panel.querySelector('[data-demo-visual]'),output=panel.querySelector('[data-demo-output]');
  const set=(html,answer)=>{visual.innerHTML=html;output.innerHTML=notation(answer);};
  if(index===0){
    slider(t.move,1,19,1,10,n=>{const numerator=60+n,value=numerator/120;
      set(numberLine(.5,2/3,[{value,label:numerator+'/120'},{value:.5,label:'1/2'},{value:2/3,label:'2/3'}],ta),
       {latex:'\\dfrac12 < '+(n===10?'\\underbrace{\\dfrac{'+numerator+'}{120}}_{=\\,\\dfrac7{12}}':'\\dfrac{'+numerator+'}{120}')+' < \\dfrac23',fallback:'1/2 < '+numerator+'/120 < 2/3'+(n===10?'  =  7/12':'')});
    });
  }else if(index===1){
    const options=[['term','1/8'],['repeat','1/3'],['root','√2'],['nonrepeat','0.1010010001…']];
    controls(t.category,options,'root',mode=>{
     const d={term:['0.125',ta?'முடிவுறும் தசமம் · விகிதமுறு':'Terminating · rational'],
       repeat:['0.3333…',ta?'மீளும் தசமம் · விகிதமுறு':'Repeating · rational'],
       root:['1.41421356…',ta?'மீளாத தசமம் · விகிதமுறா':'Non-repeating · irrational'],
       nonrepeat:['0.1010010001…',ta?'மீளாத தசமம் · விகிதமுறா':'Non-repeating · irrational']};
     set('<div class="rnlab-big">'+esc(d[mode][0])+'</div>',d[mode][1]);
    });
  }else if(index===2){
    const zoomLabel=ta?'தசம இடங்களைப் பெரிதாக்குக':'Zoom into decimal places';
    slider(zoomLabel,1,3,1,1,n=>{
      const scale=Math.pow(10,n),base=Math.floor(Math.sqrt(2)*scale)/scale,high=(Math.floor(Math.sqrt(2)*scale)+1)/scale;
      const lo=base.toFixed(n),hi=high.toFixed(n);
      set(numberLine(base,high,[{value:Math.sqrt(2),label:'√2'}],ta),
        {latex:lo+' < \\sqrt{2} < '+hi,fallback:lo+' < √2 < '+hi});
    });
  }else if(index===3){
    const choices=[['0','4^0'],['half','4^(1/2)'],['1','4^1'],['threehalf','4^(3/2)']];
    controls(t.power,choices,'half',key=>{const map={'0':['1','4^0=1'],half:['2','4^(1/2)=√4=2'],'1':['4','4^1=4'],threehalf:['8','4^(3/2)=(√4)^3=8']};
      set('<div class="rnlab-big">'+map[key][0]+'</div>',map[key][1]);});
  }else if(index===4){
    slider(t.factor,1,6,1,3,k=>{
      const rad=2*k*k;
      const side=25,offsetX=(330-k*side)/2,offsetY=15;
      const tiles=Array.from({length:k*k},(_,i)=>{
        const x=offsetX+(i%k)*side,y=offsetY+Math.floor(i/k)*side;
        return '<rect x="'+x+'" y="'+y+'" width="'+side+'" height="'+side+'" stroke="#fff" stroke-width="1.6" fill="#9174c3"/>';
      }).join('');
      const title=ta?'ஒவ்வொரு சிறு சதுரத்தின் பரப்பளவு 2':'Each small square represents area 2';
      set('<svg class="rnlab-line" viewBox="0 0 330 190" role="img" aria-label="'+esc('√'+rad+' = '+k+'√2')+'"><title>'+esc(title)+'</title>'+
        tiles+'<text x="165" y="185" text-anchor="middle" font-size="16" fill="#504078" font-weight="700">'+esc(k+' × '+k+' squares · area '+rad)+'</text></svg>',
        {latex:'\\sqrt{'+rad+'}=\\sqrt{'+k+'^2\\times2}='+k+'\\sqrt2',fallback:'√'+rad+' = √('+k+'²×2) = '+k+'√2'});
    });
  }else if(index===5){
    const labelFor=rad=>ta?
      (rad===5?'1-ஐ (√5+2)-ஆல் வகுத்தல்':'3-ஐ (√7+2)-ஆல் வகுத்தல்'):
      (rad===5?'1 divided by square root of 5 plus 2':'3 divided by square root of 7 plus 2');
    controls(t.category,[
      ['five',{html:math(fraction(mn(1),pair(5,'+')),labelFor(5)),label:labelFor(5)}],
      ['seven',{html:math(fraction(mn(3),pair(7,'+')),labelFor(7)),label:labelFor(7)}]
    ],'five',rationalDemo);
  }else if(index===6){
    slider(t.magnitude,-6,6,1,2,n=>{
      const value=3.2*Math.pow(10,n);
      const expanded=n>=0?Number(value.toPrecision(10)).toLocaleString('en-US',{useGrouping:false,maximumFractionDigits:7}):
         Number(value.toPrecision(10)).toFixed(Math.max(0,-n+1));
      set('<div class="rnlab-big">'+notation('3.2 × 10^'+n)+'</div>',
       '3.2 × 10^'+n+' = '+expanded);
    });
  }else{
    controls(t.category,[['root','√25'],['equation','x²=25']],'root',key=>{
      set('<div class="rnlab-big">'+notation(key==='root'?'√25 = 5':'x = −5 or x = 5')+'</div>',
      key==='root'?(ta?'√25 என்பது எதிர்மறையற்ற வர்க்கமூலம்.':'√25 means the principal nonnegative square root.'):
      (ta?'(−5)² = 25; 5² = 25.':'Both (−5)² and 5² equal 25.'));
    });
  }
 }
 function show(i,focus=false,notify=true){
  if(i<0||i>=path.stages.length)return;
  active=i;root.dataset.view='lesson';indexView.hidden=true;detailView.hidden=false;
  if(notify&&typeof onConcept==='function')onConcept(i);
  const stage=path.stages[i];
  panel.innerHTML=
   '<div class="sp2-concept-heading" tabindex="-1"><h4>'+esc((i+1)+'. '+pick(stage.title,lang))+'</h4></div>'+
   '<div class="sp2-demo" data-demo><h5 class="sp2-demo-title">'+esc(t.explore)+'</h5>'+
   '<div class="sp2-demo-controls" data-demo-controls></div>'+
   '<div class="rnlab-visual" data-demo-visual></div><p class="sp2-demo-output" data-demo-output aria-live="polite"></p></div>'+
   '<details class="sp2-explanation"><summary>'+esc(explanationLabel)+'</summary>'+
   '<div class="sp2-explanation-body">'+
   '<p class="sp2-idea">'+notation(pick(stage.idea,lang))+'</p>'+
   '<p class="sp2-example">'+notation(pick(stage.example,lang))+'</p>'+
   '<div class="sp2-formula">'+notation(pick(stage.rule,lang))+'</div>'+
   foundationMarkup(stage)+
   '<small class="rnlab-source-note">'+esc(t.source)+' '+esc(stage.section)+(stage.page?.en?' · EN p.'+esc(stage.page.en):'')+'</small></div></details>'+
   '<div class="sp2-recall"><h5>'+esc(t.check)+'</h5><p>'+notation(pick(stage.question,lang))+'</p>'+
   '<div class="sp2-answers" data-answers role="group" aria-label="'+esc(pick(stage.question,lang))+'"></div>'+
   '<div class="sp2-recall-actions">'+
   '<button type="button" data-hint>'+esc(t.hint)+'</button><button type="button" data-why>'+esc(t.why)+'</button></div>'+
   '<p data-feedback role="status" aria-live="polite"></p><div class="sp2-why" data-explanation hidden></div></div>'+
   (stage.pitfall?'<details class="rnlab-pitfall"><summary>'+esc(ta?'பொதுவாக ஏற்படும் தவறு':'Avoid this mistake')+
    '</summary><p>'+notation(pick(stage.pitfall,lang))+'</p></details>':'');
  const choices=panel.querySelector('[data-answers]'),feedback=panel.querySelector('[data-feedback]'),explanation=panel.querySelector('[data-explanation]');
  let wrongAttempts=0;
  stage.choices.forEach((opt,j)=>{
   const button=document.createElement('button');button.type='button';button.dataset.choice=String(j);
   button.innerHTML=notation(pick(opt,lang));button.setAttribute('aria-label',pick(opt,lang));
   button.addEventListener('click',()=>{
    const correct=j===stage.correct;
    choices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    if(correct){feedback.textContent=t.right;done.add(stage.id);save(done);update();explanation.innerHTML=notation(pick(stage.why,lang));explanation.hidden=false;}
    else{wrongAttempts++;const clue=wrongAttempts===2?' '+pick(stage.hint,lang):wrongAttempts>=3?' '+pick(stage.why,lang):'';
      feedback.innerHTML=notation(t.wrong+clue);}
   });choices.append(button);
  });
  panel.querySelector('[data-hint]').addEventListener('click',()=>{feedback.innerHTML=notation(pick(stage.hint,lang));});
  panel.querySelector('[data-why]').addEventListener('click',()=>{explanation.innerHTML=notation(pick(stage.why,lang));explanation.hidden=!explanation.hidden;});
  bindFoundation(stage);renderDemo(i);update();
  if(focus){root.scrollIntoView({behavior:'auto',block:'start'});panel.querySelector('.sp2-concept-heading')?.focus({preventScroll:true});}
 }
 if(Number.isInteger(initialConcept)&&initialConcept>=0&&initialConcept<path.stages.length)
  show(initialConcept,false,false);
 else showIndex(false,false);
 return true;
}
window.TriggleRealJourney=Object.freeze({mount});
})();