/* VER Triggle · Grade 10 Ch2 · focused mathematical discovery labs.
   Self-contained, offline, bilingual, no autoplay and no external requests. */
(()=>{'use strict';
 const translations={
  en:{previous:'← Previous',next:'Next →',replay:'Replay ↻',step:'Step',of:'of',restart:'Restart',
   bezout:{title:'Find the HCF, then reverse the steps',notes:[
    'Divide 60 by 32. The remainder is 28.',
    'Continue: dividing 32 by 28 leaves 4.',
    'Now the remainder is zero. The last nonzero remainder, 4, is the HCF.',
    'Reverse the second division: write 4 using 32 and 28.',
    'From the first division, 28 = 60 − 32. Replace 28. Now only the original numbers remain.',
    'Subtracting a bracket reverses both signs: 4 = 32 − 60 + 32.',
     'Collect the two 32s: 4 = 32(2) + 60(−1). Verify: 64 − 60 = 4.'
   ],labels:['Divide','Continue','Stop','Reverse','Substitute','Change signs','Check'],conclusion:'We did not guess x and y: we found them by reversing Euclid’s divisions.'},
   infinite:{title:'Can infinitely many pieces have a finite total?',ratio:'Common ratio',terms:'Terms shown',partial:'Sum so far',target:'Limit',missing:'Gap to limit',
    converges:'Each new piece shrinks; the sum approaches a fixed number.',
    alternating:'The signs alternate and the sum moves above and below its limit, but the gap shrinks.',
    diverges:'This sum does not approach a finite number. The infinite-sum shortcut cannot be used.',
    insight:'A partial sum adds only the first few terms. For a nonzero first term a, the partial sums approach a finite value only if the ratio r lies strictly between −1 and 1.'},
   special:{title:'Compare three sums',terms:'How many terms?',kind:'Type of terms',ordinary:'Natural numbers',squares:'Squares',cubes:'Cubes',sum:'Sum',
    meanings:['Add the natural numbers from 1 to n.','Square each number, then add the squares.','Cube each number, then add the cubes.']}
  },
  ta:{previous:'← முந்தையது',next:'அடுத்து →',replay:'மீண்டும் ↻',step:'படி',of:'இல்',restart:'மீண்டும் தொடங்கு',
   bezout:{title:'மீ.பொ.வைக் கண்டு, படிகளைப் பின்னோக்கிச் செல்வோம்',notes:[
    '60-ஐ 32-ஆல் வகுக்கும்போது மீதி 28.',
    '32-ஐ 28-ஆல் வகுக்கும்போது மீதி 4.',
    'அடுத்த மீதி பூச்சியம். கடைசி பூச்சியமற்ற மீதி 4 தான் மீ.பொ.வ.',
    'இரண்டாவது வகுத்தலைப் பின்னோக்கி எழுதுங்கள்: 4-ஐ 32, 28 மூலம் எழுதலாம்.',
    'முதல் வகுத்தலின்படி 28 = 60 − 32. அதைப் பதிலிடுங்கள்.',
    'அடைப்புக்குறியை கழிக்கும்போது குறிகள் மாறும்: 4 = 32 − 60 + 32.',
     'இரு 32 உறுப்புகளைச் சேர்த்து சரிபார்க்கவும்: 64 − 60 = 4.'
   ],labels:['வகுத்தல்','தொடர்ச்சி','முடிவு','பின்செல்','பதிலீடு','குறி மாற்றம்','சரிபார்'],conclusion:'x, y-ஐ ஊகிக்கவில்லை; யூக்ளிட் வகுத்தல்களைப் பின்னோக்கி மாற்றிக் கண்டோம்.'},
   infinite:{title:'முடிவில்லா உறுப்புகளின் கூட்டுத்தொகை முடிவுடையதா?',ratio:'பொது விகிதம்',terms:'காட்டும் உறுப்புகள்',partial:'இதுவரை கூட்டுத்தொகை',target:'எல்லை மதிப்பு',missing:'எல்லைக்கான இடைவெளி',
    converges:'ஒவ்வொரு புதிய உறுப்பும் சிறிதாகிறது; கூட்டுத்தொகை ஒரு நிலையான மதிப்பை நெருங்கும்.',
    alternating:'குறியீடுகள் மாறுகின்றன; கூட்டுத்தொகை எல்லை மதிப்பைச் சுற்றி மாறினாலும் இடைவெளி குறைகிறது.',
    diverges:'இந்தக் கூட்டுத்தொகை ஒரு முடிவுள்ள மதிப்பை நெருங்காது. முடிவிலிக் கூட்டுத்தொகைச் சூத்திரத்தைப் பயன்படுத்தக் கூடாது.',
    insight:'பகுதிக் கூடுதல் என்பது முதல் சில உறுப்புகளின் கூடுதல். முதல் உறுப்பு a பூச்சியமல்ல எனில், பொது விகிதம் r, −1 மற்றும் 1 ஆகியவற்றுக்கு இடையில் இருந்தால் மட்டுமே பகுதிக் கூடுதல்கள் முடிவுள்ள மதிப்பை நெருங்கும்.'},
   special:{title:'மூன்று கூடுதல்களை ஒப்பிடுங்கள்',terms:'எத்தனை உறுப்புகள்?',kind:'உறுப்புகளின் வகை',ordinary:'இயல் எண்கள்',squares:'வர்க்கங்கள்',cubes:'கனங்கள்',sum:'கூடுதல்',
    meanings:['1 முதல் n வரையிலான இயல் எண்களைக் கூட்டுங்கள்.','ஒவ்வோர் எண்ணையும் வர்க்கப்படுத்திப் பிறகு கூட்டுங்கள்.','ஒவ்வோர் எண்ணையும் கனப்படுத்திப் பிறகு கூட்டுங்கள்.']}
  }
 };
 const math=(el,latex,fallback,displayMode=true)=>{el.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
   ?window.TriggleNotation.renderLatex(latex,{displayMode,fallback}):'';
   if(!el.innerHTML)el.textContent=fallback;
 };
 const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;};
 const heading=(host,title)=>{host.className='g10ch2-visual g10ch2-discovery';host.setAttribute('role','group');host.setAttribute('aria-label',title);
   host.append(make('h5','g10ch2-discovery-title',title));};
 function displayNumber(value){
   const rounded=Math.round(value*100000)/100000;
   const approximate=Math.abs(value-rounded)>Number.EPSILON*Math.max(1,Math.abs(value))*2;
   return {text:String(rounded),approximate};
 }
 function bezout(host,t){const copy=t.bezout;heading(host,copy.title);
    const trail=make('div','g10ch2-discovery-trail'),formula=make('div','g10ch2-discovery-math');
    const note=make('p','g10ch2-discovery-note');note.setAttribute('role','status');note.setAttribute('aria-live','polite');
    const complete=make('p','g10ch2-discovery-complete',copy.conclusion);complete.hidden=true;
    const controls=make('div','g10ch2-discovery-controls'),prev=make('button','',t.previous);
    const progress=make('span','g10ch2-discovery-progress'),next=make('button','',t.next),restart=make('button','',t.restart);
    prev.type=next.type=restart.type='button';controls.append(prev,progress,next,restart);
    host.append(trail,formula,note,complete,controls);
    const equations=[
      ['60=32(1)+28','60 = 32 × 1 + 28'],
      ['32=28(1)+4','32 = 28 × 1 + 4'],
      ['28=4(7)+0','28 = 4 × 7 + 0'],
      ['4=32-28','4 = 32 − 28'],
      ['4=32-(60-32)','4 = 32 − (60 − 32)'],
      ['4=32-60+32','4 = 32 − 60 + 32'],
      ['4=32(2)+60(-1)=64-60','4 = 32(2) + 60(−1) = 64 − 60 = 4']
    ];let step=0;
    function draw(){
      trail.replaceChildren();
      copy.labels.forEach((text,i)=>{if(i<=step)trail.append(make('span','g10ch2-discovery-chip'+(i===step?' is-active':''),(i+1)+'. '+text));});
      math(formula,...equations[step]);note.textContent=copy.notes[step];
      progress.textContent=t.step+' '+(step+1)+' '+t.of+' '+equations.length;
      prev.disabled=step===0;next.disabled=step===equations.length-1;
      next.textContent=step===equations.length-1?t.step+' '+equations.length+'/'+equations.length:t.next;
      restart.hidden=step!==equations.length-1;complete.hidden=step!==equations.length-1;
    }
    prev.addEventListener('click',()=>{step=Math.max(0,step-1);draw();});
    next.addEventListener('click',()=>{step=Math.min(equations.length-1,step+1);draw();});
    restart.addEventListener('click',()=>{step=0;draw();});draw();return true;}
  function geometricPartial(a,r,n){if(!Number.isFinite(a)||!Number.isFinite(r)||!Number.isInteger(n)||n<1||n>100)throw new RangeError('Invalid geometric series');
   return r===1?a*n:a*(1-Math.pow(r,n))/(1-r);}
 function infinite(host,t,stage){const copy=t.infinite;heading(host,copy.title);
   const label=make('p','g10ch2-discovery-label',copy.ratio);const choices=make('div','g10ch2-discovery-choices');
   choices.setAttribute('role','group');choices.setAttribute('aria-label',copy.ratio);
   const options=[{r:0.5,label:'½'},{r:-0.5,label:'−½'},{r:1/3,label:'⅓'},{r:1,label:'1'},{r:2,label:'2'}];
   let ratio=0.5,n=1;const buttons=options.map(o=>{const b=make('button','',o.label);b.type='button';
     b.addEventListener('click',()=>{ratio=o.r;draw();});choices.append(b);return b;});
   const row=make('div','g10ch2-discovery-range-row');const rangeLabel=make('label','',copy.terms);
   const slider=make('input');slider.type='range';slider.min='1';slider.max='8';slider.step='1';slider.value='1';slider.setAttribute('aria-label',copy.terms);
   const count=make('strong');count.setAttribute('aria-hidden','true');row.append(rangeLabel,slider,count);
   const formula=make('div','g10ch2-discovery-math');const track=make('div','g10ch2-discovery-track');
   track.setAttribute('role','img');const filled=make('div','g10ch2-discovery-filled');track.append(filled);
   const feedback=make('p','g10ch2-discovery-note');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
   const insight=make('p','g10ch2-discovery-subnote',copy.insight);
    const ratioPower=make('p','g10ch2-discovery-power');ratioPower.setAttribute('aria-live','polite');
    const bridge=make('div','g10ch2-discovery-bridge');
    const bridgeNote=make('p','g10ch2-discovery-subnote',t===translations.en?'In the finite sum, a is the first term, r is the ratio, n is the term count, and Sₙ is the sum. If |r| < 1, multiplying by r repeatedly makes rⁿ approach zero.':'முதல் உறுப்பு a, பொது விகிதம் r, உறுப்புகளின் எண்ணிக்கை n; |r| < 1 எனில் rⁿ பூச்சியத்தை நெருங்கும்.');
    const bridgeFormula=make('div','g10ch2-discovery-math');
    math(bridgeFormula,'S_n=\\frac{a(1-r^n)}{1-r}\\xrightarrow[|r|<1]{n\\to\\infty}\\frac{a}{1-r}','Sₙ = a(1 − rⁿ)/(1 − r) → a/(1 − r), when |r| < 1');
    bridge.append(bridgeNote,bridgeFormula);
   const rule=make('div','g10ch2-discovery-math');
   math(rule,stage.math.latex,stage.math.fallback);
   host.append(label,choices,row,formula,ratioPower,track,feedback,bridge,insight,rule);
   function draw(){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(options[i].r===ratio)));count.textContent=String(n);
     const partial=geometricPartial(1,ratio,n),converges=Math.abs(ratio)<1,target=converges?1/(1-ratio):null;
      const power=Math.pow(ratio,n),powerLabel=displayNumber(power);
      ratioPower.textContent='r^'+n+' = '+(powerLabel.approximate?'≈ ':'')+powerLabel.text+(converges?' → 0 as n increases':ratio===1?' (stays 1)':' (does not approach 0)');
      bridge.hidden=!converges;
     const shown=displayNumber(partial);
     const describe=value=>{const display=displayNumber(value);return (display.approximate?'≈ ':'')+display.text;};
     math(formula,'S_{'+n+'}'+(shown.approximate?'\\approx ':'=')+shown.text,'S'+n+(shown.approximate?' ≈ ':' = ')+shown.text);
     track.hidden=!converges||ratio<0;if(converges&&ratio>=0){filled.style.width=Math.max(0,Math.min(100,(partial/target)*100))+'%';
       track.setAttribute('aria-label',copy.partial+' '+describe(partial)+' / '+copy.target+' '+describe(target));}
     feedback.textContent=copy.partial+': '+describe(partial)+(converges?' · '+copy.target+': '+describe(target)+' · '+copy.missing+': '+describe(Math.abs(target-partial))+'. '+(ratio<0?copy.alternating:copy.converges):'. '+copy.diverges);
   }
   slider.addEventListener('input',()=>{n=Number(slider.value);draw();});draw();return true;}
 function specialSum(power,n){if(![1,2,3].includes(power)||!Number.isInteger(n)||n<1||n>50)throw new RangeError('Invalid special sum');
   if(power===1)return n*(n+1)/2;if(power===2)return n*(n+1)*(2*n+1)/6;return Math.pow(n*(n+1)/2,2);}
 function specialWorking(power,n,total){
   const next=n+1;
   let substituted,simplified,fallback;
   if(power===1){
     substituted=String.raw`\frac{${n}\times(${n}+1)}{2}`;
     simplified=String.raw`\frac{${n}\times${next}}{2}`;
     fallback=`[${n} × (${n} + 1)] ÷ 2 = (${n} × ${next}) ÷ 2`;
   }else if(power===2){
     const factor=2*n+1;
     substituted=String.raw`\frac{${n}(${n}+1)(2\times${n}+1)}{6}`;
     simplified=String.raw`\frac{${n}\times${next}\times${factor}}{6}`;
     fallback=`[${n} × (${n} + 1) × (2 × ${n} + 1)] ÷ 6 = (${n} × ${next} × ${factor}) ÷ 6`;
   }else{
     const triangular=specialSum(1,n);
     substituted=String.raw`\left(\frac{${n}\times(${n}+1)}{2}\right)^2`;
     simplified=`${triangular}^2`;
     fallback=`{[${n} × (${n} + 1)] ÷ 2}² = ${triangular}²`;
   }
   return [
     String.raw`\begin{aligned}S_{${n}}&=${substituted}\\&=${simplified}\\&=${total}\end{aligned}`,
     `S${n} = ${fallback} = ${total}`
   ];
 }
 function specialDemo(demo,copy){
   heading(demo,copy.title);
   let power=2,n=4;const kind=make('p','g10ch2-discovery-label',copy.kind),choices=make('div','g10ch2-discovery-choices');
   choices.setAttribute('role','group');
   choices.setAttribute('aria-label',copy.kind);
   const buttons=[1,2,3].map((p,i)=>{const b=make('button','',[copy.ordinary,copy.squares,copy.cubes][i]);b.type='button';
     b.addEventListener('click',()=>{power=p;draw();});choices.append(b);return b;});
   const row=make('div','g10ch2-discovery-range-row'),label=make('label','',copy.terms),slider=make('input');
   slider.type='range';slider.min='1';slider.max='8';slider.step='1';slider.value=String(n);
   slider.id='g10ch2-special-terms';label.htmlFor=slider.id;
   const counter=make('strong');counter.setAttribute('aria-hidden','true');row.append(label,slider,counter);
   const terms=make('div','g10ch2-discovery-trail');
   const rule=make('div','g10ch2-discovery-math');
   const sum=make('p','g10ch2-special-status');
   const meaning=make('p','g10ch2-discovery-note');
   sum.setAttribute('role','status');
   demo.append(kind,choices,row,meaning,terms,rule,sum);
   function draw(){
     buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i+1===power)));
     counter.textContent=String(n);
     terms.replaceChildren();
     for(let i=1;i<=n;i++){
       const term=make('span','g10ch2-discovery-chip',String(i));
       if(power>1)math(term,i+'^'+power,i+(power===2?'²':'³'),false);
       terms.append(term);
     }
     const total=specialSum(power,n);
     math(rule,...specialWorking(power,n,total));
     sum.textContent=copy.sum+' '+total;
     meaning.textContent=copy.meanings[power-1];
   }
   slider.addEventListener('input',()=>{n=Number(slider.value);draw();});
   draw();
 }
 function squareTriangleRows(n){
   // Number the rows from each of the three corners to get the three rotations.
   return Array.from({length:n},(_,row)=>
     Array.from({length:row+1},(_,column)=>[row+1,n-column,n-row+column]));
 }
 function svgNode(tag,attributes,label){
   const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
   for(const [name,value] of Object.entries(attributes))node.setAttribute(name,value);
   if(label!=null)node.textContent=label;
   return node;
 }
 function squaresDiagram(copy,pick){
    const rows=squareTriangleRows(3),groups=pick(copy.diagramGroups);
    const triangles=[0,1,2].map(i=>rows.map(row=>row.map(cell=>cell[i])));
    triangles.push(rows.map(row=>row.map(cell=>cell.reduce((sum,value)=>sum+value,0))));
    const figure=make('figure','g10ch2-special-diagram');
    const grid=make('div','g10ch2-tri-grid');
    grid.setAttribute('role','img');
    grid.setAttribute('aria-label',pick(copy.diagramLabel)+'. '+triangles.map((tri,i)=>
      groups[i]+': '+tri.map(row=>row.join(', ')).join('; ')).join('. '));
    triangles.forEach((triangle,i)=>{
      const card=make('div','g10ch2-tri-card'+(i===3?' is-total':''));
      card.append(make('strong','g10ch2-tri-title',groups[i]));
      const body=make('div','g10ch2-tri-rows');
      triangle.forEach(row=>{
        const line=make('div','g10ch2-tri-row');
        row.forEach(value=>line.append(make('span','g10ch2-tri-cell',String(value))));
        body.append(line);
      });
      card.append(body);grid.append(card);
    });
    figure.append(grid,make('figcaption','',pick(copy.caption)));
    return figure;
  }
  function special(host,t,stage,lang){
   const {bridgeTitle,bridgeLink,notationTitle,notation,sigmaMath,powersMath,odd,squares,cubes,range}=stage.lesson;
   const pick=value=>value[lang==='ta'?'ta':'en'];
   const paragraph=value=>make('p','',pick(value));
   const equation=({latex,fallback})=>{
     const block=make('div','g10ch2-special-math');
     math(block,latex,fallback);
     return block;
   };
   const section=(title,...content)=>{
     const block=make('section','g10ch2-special-section');
     block.append(make('h5','g10ch2-discovery-title',pick(title)),...content);
     return block;
   };
   const demo=make('div');
   specialDemo(demo,t.special);
   const bridge=paragraph(stage.idea);
   const prerequisite=make('a','g10ch2-special-prerequisite',pick(bridgeLink));
   prerequisite.href='?class=10&chapter=g10-ch2&section=concepts&concept=10';
   bridge.append(' ',prerequisite,'.');
   const oddSum=make('details','g10ch2-special-odd');
   oddSum.append(make('summary','',pick(odd.title)),paragraph(odd.idea),equation(odd.math));
   const proof=make('details','g10ch2-special-proof');
   proof.append(make('summary','',pick(cubes.proofTitle)),
     paragraph(cubes.proofStart),equation(cubes.triangularMath),
     paragraph(cubes.proofFactors),equation(cubes.factorsMath),
     paragraph(cubes.proofIdentity),equation(cubes.identityMath),
     paragraph(cubes.proofCancel),equation(cubes.cancelMath),paragraph(cubes.proofEnd));
   host.className='g10ch2-special';
    const squaresProof=make('details','g10ch2-special-proof');
    squaresProof.append(make('summary','',pick(squares.title)),
      paragraph(squares.intro),squaresDiagram(squares,pick),equation(squares.exampleMath),
      paragraph(squares.general),equation(squares.math));
    const rangeProof=make('details','g10ch2-special-proof');
    rangeProof.append(make('summary','',pick(range.title)),paragraph(range.intro),
      equation(range.generalMath),equation(range.math));
    const formulaTitle=lang==='ta'?'மூன்று கூடுதல் சூத்திரங்கள்':'Three useful sum formulas';
    host.append(
      section(bridgeTitle,bridge),
      demo,
      section(notationTitle,paragraph(notation),equation(sigmaMath),paragraph(stage.example),equation(powersMath)),
      section({en:formulaTitle,ta:formulaTitle},equation(stage.math),equation(squares.math),equation(cubes.math),
        paragraph(cubes.contrast)),
      squaresProof,proof,rangeProof,oddSum,
      make('small','sp2-stage-reference',(lang==='ta'?'பாடநூல் பகுதி ':'Textbook section ')+stage.section)
    );
    return true;
 }
 
 function congruence(host,t){
   const ta=t===translations.ta;
   heading(host,ta?'இரண்டு எண்களின் ஒரே மீதி':'Compare two remainders');
   const controls=make('div','g10ch2-congruence-controls'),scene=make('div','g10ch2-scene');
   const feedback=make('p','g10ch2-visual-feedback');
   feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
   let a=17,b=5;
   const add=(name,value,onChange)=>{
     const label=make('label','g10ch2-congruence-control');
     const title=make('span','',name+': '+value),input=make('input');
     input.type='range';input.min='0';input.max='30';input.step='1';input.value=String(value);
     input.setAttribute('aria-label',name);input.addEventListener('input',()=>{
       title.textContent=name+': '+input.value;onChange(Number(input.value));draw();
     });
     label.append(title,input);controls.append(label);
   };
   add(ta?'முதல் எண்':'First number',a,x=>{a=x;});
   add(ta?'இரண்டாம் எண்':'Second number',b,x=>{b=x;});
   host.append(controls,scene,feedback);
   function draw(){
     const rA=a%3,rB=b%3;scene.replaceChildren();
     for(let rem=0;rem<3;rem++){
       const nums=[rA===rem?a:null,rB===rem?b:null].filter(x=>x!==null);
       const marker=make('span','g10ch2-chip'+(nums.length?' is-selected':''),rem+(nums.length?' ← '+nums.join(', '):''));
       marker.setAttribute('aria-label',(ta?'மீதி ':'Remainder ')+rem+': '+(nums.join(', ')||'none'));scene.append(marker);
     }
     feedback.textContent=a+' = 3 × '+Math.floor(a/3)+' + '+rA+'; '+b+' = 3 × '+Math.floor(b/3)+' + '+rB+
       (rA===rB?'. '+a+' ≡ '+b+' (mod 3); '+(a-b)+' = 3 × '+((a-b)/3):
        (ta?'. மீதிகள் வேறுபடுகின்றன.':'. Different remainders: not congruent modulo 3.'));
   }
   draw();return true;
 }
 function factors(host,t){
   const ta=t===translations.ta;
   heading(host,ta?'பகா காரணிகளை ஒப்பிடுங்கள்':'Compare prime powers');
   const controls=make('div','g10ch2-factor-controls'),scene=make('div','g10ch2-scene');
   const feedback=make('p','g10ch2-visual-feedback');feedback.setAttribute('role','status');
   let mode='hcf';
   const hcf=make('button','',ta?'மீ.பொ.வ (சிறிய அடுக்கு)':'HCF (smallest powers)');
   const lcm=make('button','',ta?'மீ.பொ.ம (பெரிய அடுக்கு)':'LCM (largest powers)');
   hcf.type=lcm.type='button';controls.append(hcf,lcm);host.append(controls,scene,feedback);
   const card=(number,two,three,pickTwo,pickThree)=>{
     const row=make('div','g10ch2-factor-expression');
     row.append(make('strong','',number+' = '),
       make('span','g10ch2-factor-power'+(pickTwo?' is-picked':''),two),' × ',
       make('span','g10ch2-factor-power'+(pickThree?' is-picked':''),three));
     return row;
   };
   function draw(){
     hcf.setAttribute('aria-pressed',String(mode==='hcf'));
     lcm.setAttribute('aria-pressed',String(mode==='lcm'));
     scene.replaceChildren(
       card('8','2³','3⁰',mode==='lcm',mode==='hcf'),
       card('18','2¹','3²',mode==='hcf',mode==='lcm'),
       make('p','g10ch2-factor-legend',ta?'3⁰ = 1; 8-இல் காரணி 3 இல்லை.':'3⁰ = 1 because 8 has no factor of 3.'));
     feedback.textContent=mode==='hcf'?'HCF(8, 18) = 2¹ × 3⁰ = 2':'LCM(8, 18) = 2³ × 3² = 72';
   }
   hcf.addEventListener('click',()=>{mode='hcf';draw();});
   lcm.addEventListener('click',()=>{mode='lcm';draw();});
   draw();return true;
 }
function mount(stage,host,lang){if(!host)return false;const t=translations[lang==='ta'?'ta':'en'];
   if(stage?.id==='g10-ch2-primes')return factors(host,t);
   if(stage?.id==='g10-ch2-congruence')return congruence(host,t);
   if(stage?.id==='g10-ch2-bezout')return bezout(host,t);
   if(stage?.id==='g10-ch2-gp-infinite')return infinite(host,t,stage);
   if(stage?.id==='g10-ch2-special'&&stage.lesson)return special(host,t,stage,lang);
   return false;}
 window.TriggleG10ConceptLabs=Object.freeze({mount,geometricPartial,specialSum,squareTriangleRows});
})();
