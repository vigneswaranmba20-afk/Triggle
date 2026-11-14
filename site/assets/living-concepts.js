/* Living Concepts — bilingual, local-only interactive mathematical visuals. */
(() => {
  'use strict';
  const words={
    en:{test:'Try a number. Does it belong to A?',detective:'RULE DETECTIVE',question:'Which description gives a well-defined set?',subjective:'All beautiful numbers',objective:'Even natural numbers less than 10',right:'Exactly. Anyone can check if a number is even and below 10.',wrong:'“Beautiful” is an opinion. Membership in a set must be decidable.',in:'belongs to A',out:'does not belong to A',members:'The oval contains 2, 4, 6 and 8.',groups:'WATCH THE OVERLAP',neither:'Neither',regions:'SEE THE REGIONS',union:'Outside both sets',intersection:'Outside the shared part'},
    ta:{test:'ஓர் எண்ணைத் தொடுங்கள். அது A கணத்தில் உள்ளதா?',detective:'விதியைக் கண்டறி',question:'எது நன்கு வரையறுக்கப்பட்ட கணம்?',subjective:'அழகான எண்கள் அனைத்தும்',objective:'10-ஐ விடக் குறைவான இரட்டை இயல் எண்கள்',right:'சரி! எண் இரட்டையா, 10-ஐ விடக் குறைவா என்பதைச் சரிபார்க்கலாம்.',wrong:'“அழகான” என்பது தனிப்பட்ட கருத்து. உறுப்பைத் தெளிவாக முடிவு செய்ய இயல வேண்டும்.',in:'A கணத்தில் உள்ளது',out:'A கணத்தில் இல்லை',members:'நீள்வட்டத்திற்குள் 2, 4, 6, 8 உள்ளன.',groups:'பொதுவானவர்களை மாற்றிப் பாருங்கள்',neither:'எதுவுமில்லை',regions:'பகுதிகளைப் பாருங்கள்',union:'இரு கணங்களுக்கும் வெளியே',intersection:'பொதுப்பகுதிக்கு வெளியே'}
  };
  const el=(tag,cls,text)=>{
    const node=document.createElement(tag);
    node.className=cls||'';
    if(text)node.textContent=text;
    return node;
  };
  function decorate(stage,panel,language,math){
    const t=words[language==='ta'?'ta':'en'];
    const lab=panel.querySelector('[data-demo]');
    if(!lab)return;
    lab.classList.add('lc-lab');
    const controls=lab.querySelector('[data-demo-controls]');
    if(stage.visual==='membership'){
      const wrap=el('div','lc-membership');
      const prompt=el('p','lc-instruction',t.test);
      wrap.append(prompt);
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 330 208');
      svg.setAttribute('class','lc-scene');
      svg.setAttribute('aria-hidden','true');
      svg.innerHTML='<ellipse class="lc-boundary" cx="132" cy="107" rx="113" ry="92"/>'+
        '<text class="lc-set-label" x="28" y="32">A</text>'+
        [[2,90,65],[4,176,65],[6,90,147],[8,176,147]].map(a=>
          '<g data-lc-member="'+a[0]+'"><circle cx="'+a[1]+'" cy="'+a[2]+'" r="25" class="lc-node"/>'+
          '<text x="'+a[1]+'" y="'+(a[2]+7)+'" class="lc-number">'+a[0]+'</text></g>'
        ).join('')+
        '<g data-lc-outsider><circle cx="286" cy="107" r="26" class="lc-outsider"/>'+
        '<text x="286" y="114" class="lc-number" data-lc-out-number>3</text></g>';
      wrap.append(svg,el('p','lc-vis-description',t.members));
      lab.insertBefore(wrap,controls);
      const feedback=lab.querySelector('[data-demo-output]');
      feedback.classList.add('lc-equation');
      const paint=()=>{
        const selected=controls.querySelector('[data-demo-mode][aria-pressed="true"]');
        const n=Number(selected?.dataset.demoMode||2);
        const belongs=[2,4,6,8].includes(n);
        wrap.querySelectorAll('[data-lc-member]').forEach(item=>{
          item.classList.toggle('lc-selected',Number(item.dataset.lcMember)===n);
        });
        wrap.querySelector('[data-lc-outsider]').setAttribute('visibility',belongs?'hidden':'visible');
        wrap.querySelector('[data-lc-out-number]').textContent=String(n);
        feedback.innerHTML=math({latex:String(n)+(belongs?'\\in A':'\\notin A'),fallback:String(n)+(belongs?' ∈ A':' ∉ A')});
        feedback.append(el('span','lc-meaning',belongs?t.in:t.out));
      };
      controls.addEventListener('click',e=>{if(e.target.closest('[data-demo-mode]'))paint()});
      paint();
      // The canonical textbook quick check below doubles as Rule Detective:
      // no duplicate quiz, and successful answers still update saved progress.
      panel.querySelector('.sp2-recall')?.classList.add('lc-detective');

    }else if(stage.visual==='count'){
      const wrap=el('div','lc-count');
      wrap.innerHTML='<p class="lc-tag">'+t.groups+'</p>'+
        '<svg viewBox="0 0 330 195" class="lc-scene" role="img" aria-label="Two overlapping groups, counts update with slider">'+
        '<circle class="lc-count-a" cx="133" cy="94" r="71"/><circle class="lc-count-b" cx="200" cy="94" r="71"/>'+
        '<text class="lc-count-label" x="96" y="29">A</text><text class="lc-count-label" x="237" y="29">B</text>'+
        '<text class="lc-count-value" x="99" y="105" data-lc-only-a>8</text>'+
        '<text class="lc-count-value" x="166" y="105" data-lc-both>6</text>'+
        '<text class="lc-count-value" x="230" y="105" data-lc-only-b>5</text>'+
        '<text class="lc-count-caption" x="165" y="184" data-lc-neither></text></svg>';
      lab.insertBefore(wrap,controls);
      const input=controls.querySelector('input[type=range]');
      const paint=()=>{
        const n=Number(input?.value||6);
        wrap.querySelector('[data-lc-only-a]').textContent=String(14-n);
        wrap.querySelector('[data-lc-both]').textContent=String(n);
        wrap.querySelector('[data-lc-only-b]').textContent=String(11-n);
        wrap.querySelector('[data-lc-neither]').textContent=t.neither+': '+String(5+n);
      };
      input?.addEventListener('input',paint);
      controls.addEventListener('click',paint);
      paint();
    }else if(stage.visual==='demorgan'){
      const wrap=el('div','lc-demorgan');
      wrap.innerHTML='<p class="lc-tag">'+t.regions+'</p>'+
        '<svg viewBox="0 0 330 198" class="lc-scene" role="img" aria-label="Universe with Venn regions and highlighted members">'+
        '<rect class="lc-universe" x="8" y="7" width="314" height="182" rx="13"/>'+
        '<circle class="lc-d-circle" cx="131" cy="90" r="62"/><circle class="lc-d-circle" cx="199" cy="90" r="62"/>'+
        '<text class="lc-count-label" x="25" y="30">U</text><text class="lc-count-label" x="93" y="44">A</text>'+
        '<text class="lc-count-label" x="244" y="44">B</text>'+
        [[1,96,85],[2,98,117],[3,165,100],[4,235,99],[5,49,163],[6,279,163]].map(a=>
          '<g data-lc-venn="'+a[0]+'"><circle class="lc-d-member" cx="'+a[1]+'" cy="'+a[2]+'" r="16"/>'+
          '<text class="lc-d-number" x="'+a[1]+'" y="'+(a[2]+5)+'">'+a[0]+'</text></g>'
        ).join('')+'</svg><p class="lc-d-legend" data-lc-legend></p>';
      lab.insertBefore(wrap,controls);
      const paint=()=>{
        const mode=controls.querySelector('[aria-pressed="true"]')?.dataset.demoMode||'union';
        const answers=mode==='union'?[5,6]:[1,2,4,5,6];
        wrap.querySelectorAll('[data-lc-venn]').forEach(g=>g.classList.toggle('lc-highlight',answers.includes(Number(g.dataset.lcVenn))));
        wrap.querySelector('[data-lc-legend]').textContent=(mode==='union'?t.union:t.intersection)+' = {'+answers.join(', ')+'}';
      };
      controls.addEventListener('click',paint);
      paint();
    }
    panel.dataset.livingConcept=stage.visual;
  }
  window.TriggleLivingConcepts=Object.freeze({decorate});
})();