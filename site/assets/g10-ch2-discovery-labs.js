/* VER Triggle · Grade 10 Ch2 · focused mathematical discovery labs.
   Self-contained, offline, bilingual, no autoplay and no external requests. */
(()=>{'use strict';
 const translations={
  en:{previous:'← Previous',next:'Next →',replay:'Replay ↻',step:'Step',of:'of',
   bezout:{title:'Find the HCF, then reverse the steps',notes:[
    'Divide 60 by 32. The remainder is 28.',
    'Continue: dividing 32 by 28 leaves 4.',
    'Now the remainder is zero. The last nonzero remainder, 4, is the HCF.',
    'Reverse the second division: write 4 using 32 and 28.',
    'From the first division, 28 = 60 − 32. Replace 28. Now only the original numbers remain.',
    'Collect the 32s. This produces the two integer multipliers: x = 2 and y = −1.'
   ],labels:['Divide','Continue','Stop','Reverse','Substitute','Collect'],conclusion:'We did not guess x and y: we found them by reversing Euclid’s divisions.'},
   infinite:{title:'Can infinitely many pieces have a finite total?',ratio:'Common ratio',terms:'Terms shown',partial:'Sum so far',target:'Limit',missing:'Gap to limit',
    converges:'Each new piece shrinks; the sum approaches a fixed number.',
    alternating:'The signs alternate and the sum moves above and below its limit, but the gap shrinks.',
    diverges:'This sum does not approach a finite number. The infinite-sum shortcut cannot be used.',
    insight:'For a = 1, a finite limit exists here only when |r| < 1.'},
   special:{title:'Choose the shape of the sum',terms:'How many terms?',kind:'Type of terms',ordinary:'Numbers',squares:'Squares',cubes:'Cubes',sum:'Sum',formula:'Rule for n terms',
    insight:'Notice the pattern first. Different powers need different rules.',
    meanings:['Add the positions from 1 to n.','Square every position, then add.','Cube every position, then add.']}
  },
  ta:{previous:'← முந்தையது',next:'அடுத்து →',replay:'மீண்டும் ↻',step:'படி',of:'இல்',
   bezout:{title:'மீ.பொ.வைக் கண்டு, படிகளைப் பின்னோக்கிச் செல்வோம்',notes:[
    '60-ஐ 32-ஆல் வகுக்கும்போது மீதி 28.',
    '32-ஐ 28-ஆல் வகுக்கும்போது மீதி 4.',
    'அடுத்த மீதி பூச்சியம். கடைசி பூச்சியமற்ற மீதி 4 தான் மீ.பொ.வ.',
    'இரண்டாவது வகுத்தலைப் பின்னோக்கி எழுதுங்கள்: 4-ஐ 32, 28 மூலம் எழுதலாம்.',
    'முதல் வகுத்தலின்படி 28 = 60 − 32. அதைப் பதிலிடுங்கள்.',
    '32 உள்ள உறுப்புகளைச் சேர்க்கவும். x = 2, y = −1 கிடைக்கும்.'
   ],labels:['வகுத்தல்','தொடர்ச்சி','முடிவு','பின்செல்','பதிலீடு','சேர்'],conclusion:'x, y-ஐ ஊகிக்கவில்லை; யூக்ளிட் வகுத்தல்களைப் பின்னோக்கி மாற்றிக் கண்டோம்.'},
   infinite:{title:'முடிவில்லா உறுப்புகளின் கூட்டுத்தொகை முடிவுடையதா?',ratio:'பொது விகிதம்',terms:'காட்டும் உறுப்புகள்',partial:'இதுவரை கூட்டுத்தொகை',target:'எல்லை மதிப்பு',missing:'எல்லைக்கான இடைவெளி',
    converges:'ஒவ்வொரு புதிய உறுப்பும் சிறிதாகிறது; கூட்டுத்தொகை ஒரு நிலையான மதிப்பை நெருங்கும்.',
    alternating:'குறியீடுகள் மாறுகின்றன; கூட்டுத்தொகை எல்லை மதிப்பைச் சுற்றி மாறினாலும் இடைவெளி குறைகிறது.',
    diverges:'இந்தக் கூட்டுத்தொகை ஒரு முடிவுள்ள மதிப்பை நெருங்காது. முடிவிலிக் கூட்டுத்தொகைச் சூத்திரத்தைப் பயன்படுத்தக் கூடாது.',
    insight:'a = 1 எனில் இங்கே |r| < 1 ஆகும் போது மட்டுமே முடிவுள்ள எல்லை மதிப்பு உண்டு.'},
   special:{title:'கூட்டுத்தொகையின் வடிவத்தைத் தேர்ந்தெடு',terms:'எத்தனை உறுப்புகள்?',kind:'உறுப்புகளின் வகை',ordinary:'எண்கள்',squares:'வர்க்கங்கள்',cubes:'கனங்கள்',sum:'கூட்டுத்தொகை',formula:'n உறுப்புகளுக்கான விதி',
    insight:'முதலில் வடிவத்தைக் கவனி. வெவ்வேறு அடுக்குகளுக்கு வெவ்வேறு விதிகள் தேவை.',
    meanings:['1 முதல் n வரையுள்ள எண்களைக் கூட்டவும்.','ஒவ்வொரு இட எண்ணையும் வர்க்கப்படுத்திக் கூட்டவும்.','ஒவ்வொரு இட எண்ணையும் கனப்படுத்திக் கூட்டவும்.']}
  }
 };
 const math=(el,latex,fallback)=>{el.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
   ?window.TriggleNotation.renderLatex(latex,{displayMode:true,fallback}):'';
   if(!el.innerHTML)el.textContent=fallback;
 };
 const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;};
 const heading=(host,title)=>{host.className='g10ch2-visual g10ch2-discovery';host.setAttribute('role','group');host.setAttribute('aria-label',title);
   host.append(make('h5','g10ch2-discovery-title',title));};
 const fmt=n=>String(Math.round(n*100000)/100000).replace(/\.0+$/,'');
 function bezout(host,t){const copy=t.bezout;heading(host,copy.title);
   const trail=make('div','g10ch2-discovery-trail');const formula=make('div','g10ch2-discovery-math');
   const note=make('p','g10ch2-discovery-note');note.setAttribute('role','status');note.setAttribute('aria-live','polite');
   const complete=make('p','g10ch2-discovery-complete',copy.conclusion);complete.hidden=true;
   const controls=make('div','g10ch2-discovery-controls');const prev=make('button','',t.previous);
   const progress=make('span','g10ch2-discovery-progress');const next=make('button');
   prev.type=next.type='button';controls.append(prev,progress,next);host.append(trail,formula,note,complete,controls);
   const equations=[
    ['60=32(1)+28','60 = 32 × 1 + 28'],
    ['32=28(1)+4','32 = 28 × 1 + 4'],
    ['28=4(7)+0','28 = 4 × 7 + 0'],
    ['4=32-28','4 = 32 − 28'],
    ['4=32-(60-32)','4 = 32 − (60 − 32)'],
    ['4=32(2)+60(-1)','4 = 32(2) + 60(−1)']
   ];let step=0;
   function draw(){trail.replaceChildren();copy.labels.forEach((text,i)=>{
     if(i>step)return;const chip=make('span','g10ch2-discovery-chip'+(i===step?' is-active':''),(i+1)+'. '+text);trail.append(chip);
   });math(formula,...equations[step]);note.textContent=copy.notes[step];progress.textContent=t.step+' '+(step+1)+' '+t.of+' 6';
     prev.disabled=step===0;next.textContent=step===5?t.replay:t.next;complete.hidden=step!==5;}
   prev.addEventListener('click',()=>{step=Math.max(0,step-1);draw();});
   next.addEventListener('click',()=>{step=(step+1)%6;draw();});draw();return true;}
 function geometricPartial(a,r,n){if(!Number.isFinite(a)||!Number.isFinite(r)||!Number.isInteger(n)||n<1||n>100)throw new RangeError('Invalid geometric series');
   return r===1?a*n:a*(1-Math.pow(r,n))/(1-r);}
 function infinite(host,t){const copy=t.infinite;heading(host,copy.title);
   const label=make('p','g10ch2-discovery-label',copy.ratio);const choices=make('div','g10ch2-discovery-choices');
   const options=[{r:0.5,label:'½'},{r:-0.5,label:'−½'},{r:1/3,label:'⅓'},{r:1,label:'1'},{r:2,label:'2'}];
   let ratio=0.5,n=1;const buttons=options.map(o=>{const b=make('button','',o.label);b.type='button';
     b.addEventListener('click',()=>{ratio=o.r;draw();});choices.append(b);return b;});
   const row=make('div','g10ch2-discovery-range-row');const rangeLabel=make('label','',copy.terms);
   const slider=make('input');slider.type='range';slider.min='1';slider.max='8';slider.step='1';slider.value='1';slider.setAttribute('aria-label',copy.terms);
   const count=make('strong');row.append(rangeLabel,slider,count);
   const formula=make('div','g10ch2-discovery-math');const track=make('div','g10ch2-discovery-track');
   track.setAttribute('role','img');const filled=make('div','g10ch2-discovery-filled');track.append(filled);
   const feedback=make('p','g10ch2-discovery-note');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
   const insight=make('p','g10ch2-discovery-subnote',copy.insight);
   host.append(label,choices,row,formula,track,feedback,insight);
   function draw(){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(options[i].r===ratio)));count.textContent=String(n);
     const partial=geometricPartial(1,ratio,n),converges=Math.abs(ratio)<1,target=converges?1/(1-ratio):null;
     math(formula,'S_{'+n+'}='+fmt(partial),'S'+n+' = '+fmt(partial));
     track.hidden=!converges||ratio<0;if(converges&&ratio>=0){filled.style.width=Math.max(0,Math.min(100,(partial/target)*100))+'%';
       track.setAttribute('aria-label',copy.partial+' '+fmt(partial)+' / '+copy.target+' '+fmt(target));}
     feedback.textContent=copy.partial+': '+fmt(partial)+(converges?' · '+copy.target+': '+fmt(target)+' · '+copy.missing+': '+fmt(Math.abs(target-partial))+'. '+(ratio<0?copy.alternating:copy.converges):'. '+copy.diverges);
   }
   slider.addEventListener('input',()=>{n=Number(slider.value);draw();});draw();return true;}
 function specialSum(power,n){if(![1,2,3].includes(power)||!Number.isInteger(n)||n<1||n>50)throw new RangeError('Invalid special sum');
   if(power===1)return n*(n+1)/2;if(power===2)return n*(n+1)*(2*n+1)/6;return Math.pow(n*(n+1)/2,2);}
 function special(host,t){const copy=t.special;heading(host,copy.title);
   let power=2,n=4;const kind=make('p','g10ch2-discovery-label',copy.kind),choices=make('div','g10ch2-discovery-choices');
   const buttons=[1,2,3].map((p,i)=>{const b=make('button','',[copy.ordinary,copy.squares,copy.cubes][i]);b.type='button';
     b.addEventListener('click',()=>{power=p;draw();});choices.append(b);return b;});
   const row=make('div','g10ch2-discovery-range-row'),label=make('label','',copy.terms),slider=make('input');
   slider.type='range';slider.min='2';slider.max='8';slider.step='1';slider.value=String(n);slider.setAttribute('aria-label',copy.terms);
   const counter=make('strong');row.append(label,slider,counter);
   const terms=make('div','g10ch2-discovery-trail'),rule=make('div','g10ch2-discovery-math'),sum=make('p','g10ch2-discovery-note');
   const meaning=make('p','g10ch2-discovery-subnote');
   sum.setAttribute('role','status');sum.setAttribute('aria-live','polite');host.append(kind,choices,row,terms,rule,sum,meaning);
   const formulas={1:'\\frac{n(n+1)}{2}',2:'\\frac{n(n+1)(2n+1)}{6}',3:'\\left(\\frac{n(n+1)}{2}\\right)^2'};
   function draw(){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i+1===power)));counter.textContent=String(n);
     terms.replaceChildren();for(let i=1;i<=n;i++){const term=make('span','g10ch2-discovery-chip',power===1?String(i):power===2?i+'²':i+'³');terms.append(term);}
     math(rule,'S_{'+n+'}='+formulas[power].replaceAll('n',String(n))+'='+specialSum(power,n),'S'+n+' = '+specialSum(power,n));
     sum.textContent=copy.sum+': '+specialSum(power,n);
     meaning.textContent=copy.meanings[power-1]+' '+copy.insight;
   }
   slider.addEventListener('input',()=>{n=Number(slider.value);draw();});draw();return true;}
 function mount(stage,host,lang){if(!host)return false;const t=translations[lang==='ta'?'ta':'en'];
   if(stage?.id==='g10-ch2-bezout')return bezout(host,t);
   if(stage?.id==='g10-ch2-gp-infinite')return infinite(host,t);
   if(stage?.id==='g10-ch2-special')return special(host,t);
   return false;}
 window.TriggleG10ConceptLabs=Object.freeze({mount,geometricPartial,specialSum});
})();
