/* Triggle · Grade 9 Real Numbers interactive concept journey (SCERT 2025).
   Original bilingual demonstrations; accessible, self-contained and offline-first. */
(()=>{
'use strict';
const path=window.TRIGGLE_REAL_PATH;
if(!path||path.chapterId!=='g9-ch2')return;
const KEY='triggle.g9.real-journey.v1';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const notation=value=>window.TriggleNotation?window.TriggleNotation.render(value):esc(value);
const pick=(obj,lang)=>typeof obj==='string'?obj:obj?.[lang]||obj?.en||'';
const words={
 en:{kicker:'REAL NUMBERS · INTERACTIVE LAB',title:'See every number come alive',intro:'Move the controls, predict what changes, and test your understanding. Eight small explorations follow Chapter 2 of your 2025 SCERT textbook.',progress:'Concepts checked',source:'Textbook section',explore:'Explore this idea',check:'Now check yourself',hint:'Show a hint',why:'Why this works',right:'Correct! Explain it aloud or on paper.',wrong:'Not yet. Use the hint and try again.',paper:'Try this on paper',saved:'Progress is kept only on this device.',numberLine:'Number-line explorer',category:'Tap a number',move:'Move the point',factor:'Choose the factor',power:'Choose the power',magnitude:'Move the power of ten',next:'Next concept',detailed:'The picture is a mathematical model, not a copied textbook illustration.'},
 ta:{kicker:'மெய்யெண்கள் · செயல்பாட்டு ஆய்வகம்',title:'எண்களை இயக்கிப் புரிந்துகொள்வோம்',intro:'கட்டுப்பாடுகளை மாற்றி, விளைவைக் கணித்து, புரிதலைச் சோதிக்கவும். 2025 பாடநூலின் இரண்டாம் அத்தியாயத்திற்கான எட்டு சிறு செயல்பாடுகள்.',progress:'சரியாக முடித்த கருத்துகள்',source:'பாடநூல் பகுதி',explore:'இக்கருத்தை ஆராய்க',check:'இப்போது சரிபார்க்கவும்',hint:'குறிப்பைக் காட்டு',why:'இது ஏன் சரி?',right:'சரி! காரணத்தைச் சொல்லிப் பாருங்கள்.',wrong:'இன்னும் சரியில்லை. குறிப்பைப் பார்த்து மீண்டும் முயல்க.',paper:'தாளில் முயற்சி செய்க',saved:'முன்னேற்றம் இந்தச் சாதனத்தில் மட்டுமே சேமிக்கப்படும்.',numberLine:'எண்கோடு ஆய்வகம்',category:'ஓர் எண்ணைத் தேர்ந்தெடுக்கவும்',move:'புள்ளியை நகர்த்துக',factor:'காரணியைத் தேர்ந்தெடுக்கவும்',power:'அடுக்கைத் தேர்ந்தெடுக்கவும்',magnitude:'பத்தின் அடுக்கை மாற்றுக',next:'அடுத்த கருத்து',detailed:'இது பாடநூல் படத்தின் நகல் அல்ல; கணித விளக்கப்படம்.'}
};
const load=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(a)?a.filter(id=>path.stages.some(s=>s.id===id)):[])}catch{return new Set()}};
const save=done=>{try{localStorage.setItem(KEY,JSON.stringify([...done]))}catch{}};
function numberLine(min,max,points,ta){
 const x=v=>40+520*(v-min)/(max-min),y=82;
 let out='<svg class="rnlab-line" viewBox="0 0 600 166" role="img" aria-label="'+esc(ta?'எண்கோடு':'Number line')+'"><title>'+esc(ta?'எண்கோடு':'Number line')+'</title>'+
   '<line x1="38" y1="'+y+'" x2="564" y2="'+y+'" stroke="#697aa0" stroke-width="2.5"/><path d="M558 76L566 82L558 88" stroke="#697aa0" stroke-width="2" fill="none"/>';
 for(let i=0;i<=4;i++){const n=min+(max-min)*i/4;out+='<line x1="'+x(n)+'" y1="'+(y-6)+'" x2="'+x(n)+'" y2="'+(y+6)+'" stroke="#697aa0"/>'+
   '<text x="'+x(n)+'" y="113" fill="#5c5b73" font-size="14" text-anchor="middle">'+esc(Number(n.toFixed(3)))+'</text>';}
 points.forEach((p,i)=>{const px=x(p.value);out+='<line x1="'+px+'" y1="'+(y-29)+'" x2="'+px+'" y2="'+y+'" stroke="'+(i===0?'#bf467d':'#527ab2')+'" stroke-width="3"/>'+
  '<circle cx="'+px+'" cy="'+y+'" r="5" fill="'+(i===0?'#bf467d':'#527ab2')+'"/>'+
  '<text x="'+px+'" y="'+(i===0?'32':i%2?'49':'16')+'" font-weight="750" font-size="15" text-anchor="middle" fill="#5c3272">'+esc(p.label)+'</text>';});
 return out+'</svg>';
}
function mount(container,chapter,language){
 if(!container||chapter?.id!=='g9-ch2')return false;
 const lang=language==='ta'?'ta':'en',ta=lang==='ta',t=words[lang],done=load(),root=document.createElement('section');
 root.className='sp2-journey rnlab';root.setAttribute('aria-label',t.title);
 root.innerHTML='<p class="sp2-kicker">'+esc(t.kicker)+'</p><h3>'+esc(t.title)+'</h3>'+
 '<p class="sp2-intro">'+esc(t.intro)+'</p><p class="sp2-progress" data-progress role="status" aria-live="polite"></p>'+
 '<nav class="sp2-nav" data-nav aria-label="'+esc(t.title)+'"></nav><div class="sp2-panel" data-panel></div>'+
 '<p class="sp2-private">'+esc(t.saved)+'</p>';
 container.append(root);
 const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');let active=0;
 path.stages.forEach((stage,i)=>{const b=document.createElement('button');b.type='button';b.className='sp2-nav-button';b.dataset.index=String(i);
  b.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+esc(pick(stage.title,lang))+'</span><span class="sp2-done-mark" aria-hidden="true"></span>';
  b.addEventListener('click',()=>show(i));nav.append(b);
 });
 function update(){root.querySelector('[data-progress]').textContent=t.progress+': '+done.size+' / '+path.stages.length;
   nav.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('sp2-current',i===active);b.classList.toggle('sp2-done',done.has(path.stages[i].id));
    b.setAttribute('aria-pressed',String(i===active));b.querySelector('.sp2-done-mark').textContent=done.has(path.stages[i].id)?'✓':'';});}
 function controls(label,items,value,onChange){const host=panel.querySelector('[data-demo-controls]');
  const group=document.createElement('div');group.className='rnlab-choices';group.setAttribute('role','group');group.setAttribute('aria-label',label);
  items.forEach(([val,caption])=>{const b=document.createElement('button');b.type='button';b.className='rnlab-choice';b.dataset.demoMode=String(val);if(typeof caption==='object'){b.innerHTML=caption.html;b.setAttribute('aria-label',caption.label);}
   else b.innerHTML='<span class="rnlab-math-choice">'+notation(caption)+'</span>';
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
 function renderDemo(index){
  const visual=panel.querySelector('[data-demo-visual]'),output=panel.querySelector('[data-demo-output]');
  const set=(html,answer)=>{visual.innerHTML=html;output.innerHTML=notation(answer);};
  if(index===0){
    slider(t.move,1,19,1,10,n=>{const numerator=60+n,value=numerator/120;
      set(numberLine(.5,2/3,[{value,label:numerator+'/120'},{value:.5,label:'1/2'},{value:2/3,label:'2/3'}],ta),
       '1/2 < '+numerator+'/120 < 2/3'+(n===10?'  =  7/12':''));
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
    slider(t.move,-40,40,1,28,n=>{
      const value=n/20;
      set(numberLine(-2,2,[{value,label:value.toFixed(2)},{value:Math.sqrt(2),label:'√2'}],ta),
       value.toFixed(2)+(ta?' என்ற இடத்தில் புள்ளி உள்ளது.':' is the point on the number line.'));
    });
  }else if(index===3){
    const choices=[['0','4^0'],['half','4^(1/2)'],['1','4^1'],['threehalf','4^(3/2)']];
    controls(t.power,choices,'half',key=>{const map={'0':['1','4^0=1'],half:['2','4^(1/2)=√4=2'],'1':['4','4^1=4'],threehalf:['8','4^(3/2)=(√4)^3=8']};
      set('<div class="rnlab-big">'+map[key][0]+'</div>',map[key][1]);});
  }else if(index===4){
    slider(t.factor,1,6,1,3,k=>{
      const rad=2*k*k;
      const bars=Array.from({length:k},(_,i)=>'<rect x="'+(36+i*40)+'" y="'+(115-(i+1)*8)+'" width="29" height="'+(i+1)*8+'" rx="3" fill="#ad8ad4"/>').join('');
      set('<svg class="rnlab-line" viewBox="0 0 330 146" role="img" aria-label="'+esc('√'+rad+' = '+k+'√2')+'"><title>'+esc('√'+rad+' = '+k+'√2')+'</title>'+bars+'</svg>',
      '√'+rad+' = √('+k+'²×2) = '+k+'√2');
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
 function show(i){
  if(i<0||i>=path.stages.length)return;
  active=i;const stage=path.stages[i];
  panel.innerHTML='<small class="sp2-stage-reference">'+esc(t.source)+' '+esc(stage.section)+(stage.page?.en?' · EN p.'+stage.page.en:'')+'</small>'+
   '<h4>'+esc(pick(stage.title,lang))+'</h4><p class="sp2-idea">'+notation(pick(stage.idea,lang))+'</p>'+
   '<p class="sp2-example">'+notation(pick(stage.example,lang))+'</p><div class="sp2-formula">'+notation(pick(stage.rule,lang))+'</div>'+
   '<div class="sp2-demo"><h5 class="sp2-demo-title">'+esc(t.explore)+'</h5>'+
   '<div class="sp2-demo-controls" data-demo-controls></div>'+
   '<div class="rnlab-visual" data-demo-visual></div><p class="sp2-demo-output" data-demo-output aria-live="polite"></p>'+
   '<small class="rnlab-source-note">'+esc(t.detailed)+'</small></div>'+
   '<div class="sp2-recall"><h5>'+esc(t.check)+'</h5><p>'+notation(pick(stage.question,lang))+'</p>'+
   '<div class="sp2-answers" data-answers></div><div class="sp2-recall-actions">'+
   '<button type="button" data-hint>'+esc(t.hint)+'</button><button type="button" data-why>'+esc(t.why)+'</button></div>'+
   '<p data-feedback role="status" aria-live="polite"></p><div class="sp2-why" data-explanation hidden></div></div>'+
   (i+1<path.stages.length?'<button type="button" class="rnlab-next" data-next>'+esc(t.next)+' →</button>':'');
  const choices=panel.querySelector('[data-answers]'),feedback=panel.querySelector('[data-feedback]'),explanation=panel.querySelector('[data-explanation]');
  stage.choices.forEach((opt,j)=>{const b=document.createElement('button');b.type='button';b.dataset.choice=String(j);b.innerHTML=notation(pick(opt,lang));
   b.addEventListener('click',()=>{const correct=j===stage.correct;
    choices.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    feedback.textContent=correct?t.right:t.wrong;
    if(correct){done.add(stage.id);save(done);update();explanation.innerHTML=notation(pick(stage.why,lang));explanation.hidden=false;}
   });choices.append(b);
  });
  panel.querySelector('[data-hint]').addEventListener('click',()=>{feedback.textContent=pick(stage.hint,lang);});
  panel.querySelector('[data-why]').addEventListener('click',()=>{explanation.innerHTML=notation(pick(stage.why,lang));explanation.hidden=!explanation.hidden;});
  panel.querySelector('[data-next]')?.addEventListener('click',()=>{show(i+1);root.querySelector('[data-panel]').scrollIntoView({block:'nearest'});});
  renderDemo(i);update();
 }
 show(0);return true;
}
window.TriggleRealJourney=Object.freeze({mount});
})();