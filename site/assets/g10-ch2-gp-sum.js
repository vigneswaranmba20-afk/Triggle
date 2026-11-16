/* Triggle Grade 10 Chapter 2: geometric-series discovery lab.
   Offline, bilingual, student-paced, no autoplay or third-party dependencies. */
(() => {
  'use strict';
  const translations={
    en:{
      title:'See why the shortcut works',
      double:'2S (double)',original:'S (original)',
      notes:[
        'Call the sum S. We want its value without adding each term.',
        'Multiply every term by 2. The new row is 2S, lined up by powers of 2.',
        'Subtract the original S from 2S. The shared 2, 4 and 8 cancel in matching columns.',
        'Only 16 minus 1 is left. Since 2S − S = S, our sum is 15.',
        'For any first term a, ratio r and number of terms n, the same cancellation gives the rule below.'
      ],
      detail:'When r = 1, the terms are all a, so Sₙ = na. The division formula is only for r ≠ 1.',
      previous:'Previous step',next:'Next step',replay:'Start again',step:'Step',of:'of',
      formula:'General rule',live:'S is the name of the sum.'
    },
    ta:{
      title:'சுருக்குவழி ஏன் வேலை செய்கிறது?',
      double:'2S (இருமடங்கு)',original:'S (மூலத் தொகை)',
      notes:[
        'கூட்டுத்தொகைக்கு S என்று பெயரிடுவோம். ஒவ்வொன்றாகக் கூட்டாமல் மதிப்பைக் காண்போம்.',
        'ஒவ்வொரு உறுப்பையும் 2-ஆல் பெருக்குங்கள். கிடைக்கும் 2S வரி, 2-இன் அடுக்குகளுக்கு நேராக அமைந்துள்ளது.',
        '2S-இலிருந்து S-ஐக் கழியுங்கள். இரு வரிகளிலும் உள்ள 2, 4, 8 ஆகியவை நீங்குகின்றன.',
        '16 − 1 மட்டும் மீதமுள்ளது. 2S − S = S என்பதால் கூட்டுத்தொகை 15.',
        'முதல் உறுப்பு a, பொது விகிதம் r, உறுப்புகளின் எண்ணிக்கை n எனில் இதே முறையால் கீழுள்ள சூத்திரம் கிடைக்கும்.'
      ],
      detail:'r = 1 எனில் எல்லா உறுப்புகளும் a. ஆகவே Sₙ = na. வகுத்தல் சூத்திரம் r ≠ 1 என்பதற்கு மட்டுமே.',
      previous:'முந்தைய படி',next:'அடுத்த படி',replay:'மீண்டும் தொடங்கு',step:'படி',of:'இல்',
      formula:'பொது விதி',live:'S என்பது கூட்டுத்தொகையைக் குறிக்கும்.'
    }
  };
  function model(a,r,n){
    if(![a,r,n].every(Number.isInteger)||n<1||n>10||Math.abs(r)>10||Math.abs(a)>100)
      throw new RangeError('Use small integer terms and 1–10 positions.');
    const terms=Array.from({length:n},(_,i)=>a*Math.pow(r,i));
    const sum=terms.reduce((x,y)=>x+y,0);
    const difference=a*(Math.pow(r,n)-1);
    return {terms,sum,shifted:terms.map(x=>r*x),difference,coefficient:r-1,
      formula:r===1?a*n:difference/(r-1)};
  }
  const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function showMath(el,latex,fallback){
    el.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
      ?window.TriggleNotation.renderLatex(latex,{displayMode:true,fallback}):safe(fallback);
  }
  function mount(host,language){
    if(!host)return false;
    const t=translations[language==='ta'?'ta':'en'];
    const example=model(1,2,4);
    let step=0;
    host.className='g10ch2-visual g10ch2-gp-lab';
    host.setAttribute('role','group');
    host.setAttribute('aria-label',t.title);
    const heading=document.createElement('h5');heading.className='gp-lab-heading';heading.textContent=t.title;
    const stage=document.createElement('div');stage.className='gp-lab-stage';
    const makeRow=(label,numbers,kind)=>{
      const row=document.createElement('div');row.className='gp-lab-row';row.dataset.row=kind;
      const name=document.createElement('strong');name.className='gp-lab-row-label';name.textContent=label;
      const cells=document.createElement('div');cells.className='gp-lab-cells';
      const targets=numbers.map((number,i)=>{
        const cell=document.createElement('span');cell.className='gp-lab-term';
        if(number===null){cell.classList.add('is-gap');cell.setAttribute('aria-hidden','true');}
        else cell.textContent=String(number);
        cells.append(cell);return cell;
      });
      row.setAttribute('aria-label',label+': '+numbers.filter(n=>n!==null).join(' + '));
      row.append(name,cells);stage.append(row);
      return {row,targets};
    };
    const doubled=makeRow(t.double,[null,...example.shifted],'doubled');
    const original=makeRow(t.original,[...example.terms,null],'original');
    const worked=document.createElement('div');worked.className='gp-lab-math';
    const general=document.createElement('div');general.className='gp-lab-general';general.hidden=true;
    const label=document.createElement('p');label.className='gp-lab-general-label';label.textContent=t.formula;
    const derivation=document.createElement('div');derivation.className='gp-lab-derivation';
    const formula=document.createElement('div');formula.className='gp-lab-final';
    const edge=document.createElement('p');edge.className='gp-lab-edge';edge.textContent=t.detail;
    general.append(label,derivation,formula,edge);
    const note=document.createElement('p');note.className='gp-lab-note';
    note.setAttribute('role','status');note.setAttribute('aria-live','polite');
    const actions=document.createElement('div');actions.className='gp-lab-actions';
    const previous=document.createElement('button');previous.type='button';previous.textContent='← '+t.previous;
    const counter=document.createElement('span');counter.className='gp-lab-counter';
    const next=document.createElement('button');next.type='button';
    actions.append(previous,counter,next);
    host.append(heading,stage,worked,general,note,actions);
    const equations=[
      ['S=1+2+4+8','S = 1 + 2 + 4 + 8'],
      ['2S=2+4+8+16','2S = 2 + 4 + 8 + 16'],
      ['2S-S=16-1','2S − S = 16 − 1'],
      ['S=16-1=15','S = 16 − 1 = 15'],
      ['(r-1)S_n=a(r^n-1)','(r − 1)Sₙ = a(rⁿ − 1)']
    ];
    function draw(){
      host.dataset.step=String(step);
      doubled.row.hidden=step===0;
      doubled.targets.forEach((cell,i)=>{
        cell.classList.toggle('is-cancelled',step>=2&&i>=1&&i<=3);
        cell.classList.toggle('is-remaining',step>=2&&i===4);
      });
      original.targets.forEach((cell,i)=>{
        cell.classList.toggle('is-cancelled',step>=2&&i>=1&&i<=3);
        cell.classList.toggle('is-subtracted',step>=2&&i===0);
      });
      const [latex,fallback]=equations[step];
      showMath(worked,latex,fallback);
      general.hidden=step!==4;
      if(step===4){
        showMath(derivation,'(r-1)S_n=ar^n-a','(r − 1)Sₙ = arⁿ − a');
        showMath(formula,'S_n=\\dfrac{a(r^n-1)}{r-1},\\quad r\\ne1','Sₙ = a(rⁿ − 1)/(r − 1), r ≠ 1');
      }
      note.textContent=t.notes[step];
      counter.textContent=t.step+' '+(step+1)+' '+t.of+' 5';
      previous.disabled=step===0;
      next.textContent=(step===4?t.replay+' ↻':t.next+' →');
    }
    previous.addEventListener('click',()=>{if(step>0){step--;draw();}});
    next.addEventListener('click',()=>{step=(step+1)%5;draw();});
    draw();
    return true;
  }
  window.TriggleGPSumLab=Object.freeze({mount,model});
})();
