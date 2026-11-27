/* VER Triggle | Grade 10 Chapter 4 Geometry — Interactive Concept Studio Labs.
 * Self-contained, offline, bilingual (EN + TA draft), zero external assets or tracking.
 * Supports smooth pointer dragging + accessible keyboard/button controls across 320–430px viewports. */
(()=>{'use strict';
  const SVG_NS='http://www.w3.org/2000/svg';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n;};
  const svgEl=(tag,attrs={},txt)=>{
    const n=document.createElementNS(SVG_NS,tag);
    for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));
    if(txt!=null)n.textContent=txt;
    return n;
  };
  const fmt=(v,d=2)=>Number.isFinite(v)?Number(v.toFixed(d)).toString():'—';
  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
  const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
  const angleDeg=(p,a,b)=>{
    const ux=a[0]-p[0],uy=a[1]-p[1],vx=b[0]-p[0],vy=b[1]-p[1];
    const m=Math.hypot(ux,uy)*Math.hypot(vx,vy);
    if(m<1e-9)return 0;
    const c=Math.max(-1,Math.min(1,(ux*vx+uy*vy)/m));
    return Math.acos(c)*180/Math.PI;
  };
  const lineIntersect=(p1,p2,p3,p4)=>{
    const a1=p2[1]-p1[1],b1=p1[0]-p2[0],c1=a1*p1[0]+b1*p1[1];
    const a2=p4[1]-p3[1],b2=p3[0]-p4[0],c2=a2*p3[0]+b2*p3[1];
    const det=a1*b2-a2*b1;
    if(Math.abs(det)<1e-8)return null;
    return [(b2*c1-b1*c2)/det,(a1*c2-a2*c1)/det];
  };

  function tex(node,latex,fallback,displayMode=true){
    if(!node)return;
    node.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
      ?window.TriggleNotation.renderLatex(latex,{displayMode,fallback})
      :e(fallback);
    window.TriggleNotation?.prepare?.(node);
  }

  function makeTabs(items,activeIdx,onSelect,ariaLabel){
    const bar=el('div','g10ch4-tabs');bar.setAttribute('role','group');bar.setAttribute('aria-label',ariaLabel);
    const buttons=items.map((label,i)=>{
      const b=el('button','g10ch4-tab',label);b.type='button';
      b.setAttribute('aria-pressed',String(i===activeIdx));
      b.addEventListener('click',()=>onSelect(i));
      bar.append(b);return b;
    });
    const sync=idx=>buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===idx)));
    return {bar,sync};
  }

  function svgPoint(svg,evt){
    const r=svg.getBoundingClientRect();
    const vb=svg.viewBox.baseVal;
    if(r.width>0&&r.height>0&&vb&&vb.width>0){
      return [(evt.clientX-r.left)*(vb.width/r.width)+vb.x,(evt.clientY-r.top)*(vb.height/r.height)+vb.y];
    }
    return [160,95];
  }

  function attachDrag(svg,onMove){
    let dragging=false;
    const handleMove=evt=>{if(!dragging)return;evt.preventDefault();onMove(svgPoint(svg,evt));};
    svg.addEventListener('pointerdown',evt=>{
      if(evt.target.closest('[data-drag-handle]')||svg.dataset.dragAll==='true'){
        dragging=true;
        try{svg.setPointerCapture(evt.pointerId);}catch{}
        evt.preventDefault();
        onMove(svgPoint(svg,evt));
      }
    });
    svg.addEventListener('pointermove',handleMove);
    const end=evt=>{if(dragging){dragging=false;try{svg.releasePointerCapture(evt.pointerId);}catch{}}};
    svg.addEventListener('pointerup',end);
    svg.addEventListener('pointercancel',end);
  }

  function makeSlider(labelText,min,max,step,val,onInput){
    const row=el('div','g10ch4-slider-row');
    const id='g10ch4-s-'+Math.random().toString(36).slice(2,8);
    const lab=el('label','g10ch4-slider-label',labelText);lab.htmlFor=id;
    const input=document.createElement('input');
    input.type='range';input.id=id;input.min=String(min);input.max=String(max);input.step=String(step);input.value=String(val);
    input.className='g10ch4-slider';
    const out=el('span','g10ch4-slider-val',String(val));
    input.addEventListener('input',()=>{const v=Number(input.value);out.textContent=fmt(v,2);onInput(v);});
    row.append(lab,input,out);
    return {row,input,out};
  }

  /* Pure mathematical helpers exported for independent regression verification */
  const mathAPI={
    scaleTriangle(k){
      const base=[6,8,10];
      const scaled=base.map(s=>s*k);
      return {
        k,base,scaled,
        perimeterRatio:k,
        areaRatio:k*k,
        isCongruent:Math.abs(k-1)<1e-9
      };
    },
    ssaAmbiguous(c=8,b=5.5,degB=35){
      const rad=degB*Math.PI/180;
      const h=c*Math.sin(rad);
      if(b<=h||b>=c)return null;
      const dx=Math.sqrt(b*b-h*h);
      const xc=c*Math.cos(rad);
      return {a1:xc+dx,a2:xc-dx,h,b,c,degB};
    },
    bptCut(A,B,C,t){
      const D=lerp(A,B,t),E=lerp(A,C,t);
      const AD=dist(A,D),DB=dist(D,B),AE=dist(A,E),EC=dist(E,C);
      const AB=dist(A,B),AC=dist(A,C);
      return {
        D,E,AD,DB,AE,EC,AB,AC,
        ratioPart:AD/DB,ratioPartRight:AE/EC,
        ratioWhole:AB/AD,ratioWholeRight:AC/AE
      };
    },
    converseBptState(A,B,C,tD,tE){
      const D=lerp(A,B,tD),E=lerp(A,C,tE),F=lerp(A,C,tD);
      const rL=tD/(1-tD),rR=tE/(1-tE);
      const isParallel=Math.abs(tD-tE)<=1e-9;
      return {D,E,F,rL,rR,isParallel,gap:dist(E,F)};
    },
    angleBisectorPoint(A,B,C){
      const ab=dist(A,B),ac=dist(A,C);
      const t=ab/(ab+ac);
      const D=lerp(B,C,t);
      const bd=dist(B,D),dc=dist(D,C);
      const ang1=angleDeg(A,B,D),ang2=angleDeg(A,D,C);
      return {D,ab,ac,bd,dc,ratioSides:ab/ac,ratioSegs:bd/dc,ang1,ang2};
    },
    converseAbtCheck(ab,ac,bd,dc){
      const bc=bd+dc;
      const validTriangle=(ab+bc>ac+1e-9)&&(ab+ac>bc+1e-9)&&(ac+bc>ab+1e-9);
      const ratioL=ab/ac,ratioR=bd/dc;
      const ratioMatches=Math.abs(ratioL-ratioR)<1e-6;
      return {validTriangle,ratioMatches,isBisector:validTriangle&&ratioMatches,bc,ratioL,ratioR};
    },
    circumcircleArc(Q,R,thetaDeg){
      const base=dist(Q,R);
      const rad=thetaDeg*Math.PI/180;
      const radius=base/(2*Math.sin(rad));
      const mid=[(Q[0]+R[0])/2,(Q[1]+R[1])/2];
      const dy=Math.sqrt(Math.max(0,radius*radius-(base/2)*(base/2)));
      const O=[mid[0],thetaDeg<90?mid[1]-dy:mid[1]+dy];
      const I=[mid[0],O[1]+radius];
      return {O,R:radius,I,mid,thetaDeg};
    },
    pythagorasCheck(a,b,c){
      const sumSq=a*a+b*b,cSq=c*c;
      const cosC=(sumSq-cSq)/(2*a*b);
      const degC=Math.acos(Math.max(-1,Math.min(1,cosC)))*180/Math.PI;
      const kind=Math.abs(sumSq-cSq)<1e-6?'right':cSq<sumSq?'acute':'obtuse';
      return {sumSq,cSq,degC,kind};
    },
    tangentLengths(r,d){
      if(d<r-1e-9)return {count:0,len:null};
      if(Math.abs(d-r)<=1e-9)return {count:1,len:0};
      return {count:2,len:Math.sqrt(d*d-r*r)};
    },
    cevaPoints(A,B,C,rD,rE,rF){
      const D=lerp(B,C,rD/(1+rD));
      const E=lerp(C,A,rE/(1+rE));
      const F=lerp(A,B,rF/(1+rF));
      const prod=rD*rE*rF;
      const p1=lineIntersect(A,D,B,E);
      const p2=lineIntersect(B,E,C,F);
      const p3=lineIntersect(C,F,A,D);
      const spread=(p1&&p2&&p3)?Math.max(dist(p1,p2),dist(p2,p3),dist(p3,p1)):999;
      return {D,E,F,prod,concurrent:Math.abs(prod-1)<0.03,p1,p2,p3,spread};
    }
  };

  /* 1. Similarity vs Congruence & Scale Factor */
  function labSimilarityScale(host,ta){
    const copy=ta?{
      title:'அளவுக் காரணி k-ஐ மாற்றி ஒப்பிடுங்கள்',
      slider:'அளவுக் காரணி k',
      congruentBtn:'k = 1 (சர்வசமம் ≅)',
      sim:'வடிவொத்தவை (∼)',
      cong:'சர்வசமம் (≅) மற்றும் வடிவொத்தவை (∼)',
      ratioLbl:'பக்க விகிதம்',
      angLbl:'கோணங்கள்'
    }:{
      title:'Scale △PQR and compare side ratios & angles',
      slider:'Scale factor k',
      congruentBtn:'Set k = 1 (Congruent ≅)',
      sim:'Similar (∼) — same angles, scaled sides',
      cong:'Congruent (≅) AND Similar (∼) — scale factor is 1!',
      ratioLbl:'Side ratios',
      angLbl:'Angles'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let k=1.25;
    const maxFactor=1.5;
    const diagram=window.TriggleG10DiagramGuard.scaleLab(copy.title,ta?'ta':'en',maxFactor,()=>mathAPI.scaleTriangle(k));
    const metrics=el('div','g10ch4-metrics');
    const slider=makeSlider(copy.slider,0.5,maxFactor,0.05,k,v=>{k=v;paint();});
    const presetRow=el('div','g10ch4-preset-row');
    [0.6,1.0,1.4].forEach(val=>{
      const b=el('button','g10ch4-chip-btn',val===1?copy.congruentBtn:'k = '+val);b.type='button';
      b.onclick=()=>{k=val;slider.input.value=String(val);slider.out.textContent=fmt(val,2);paint();};
      presetRow.append(b);
    });
    const status=el('p','g10ch4-status');status.setAttribute('aria-live','polite');
    host.append(diagram.svg,diagram.key,metrics,slider.row,presetRow,status);
    const redraw=diagram.observe();

    function paint(){
      const s=mathAPI.scaleTriangle(k);
      const leftAngle=Math.atan2(s.base[1],s.base[0])*180/Math.PI;
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>PQ/AB = QR/BC = RP/CA</span><strong>${fmt(k,2)}</strong></div>
        <div class="g10ch4-metric"><span>${e(copy.angLbl)}</span><strong>≈ ${fmt(leftAngle,1)}° · 90° · ≈ ${fmt(90-leftAngle,1)}°</strong></div>`;
      status.className='g10ch4-status'+(s.isCongruent?' is-match':'');
      status.textContent=s.isCongruent?copy.cong:copy.sim+` (k = ${fmt(k,2)})`;
      redraw();
    }
    paint();
  }

  /* 2. Similarity Criteria (AA, SAS, SSS, SSA Trap) */
  function labSimilarityCriteria(host,ta){
    const copy=ta?{
      title:'வடிவொத்த விதிகளைச் சோதியுங்கள் (மற்றும் SSA பொறி!)',
      tabs:['AA விதி','SAS விதி','SSS விதி','SSA பொறி!'],
      flip:'இரண்டாவது நிலையைக் காண்க (AC வில்)',
      notes:[
        'இரண்டு கோணங்கள் சமமெனில் (50°, 65°), மூன்றாவது கோணம் தானாகவே 65° ஆகும் ⇒ AA விதிப்படி வடிவொத்தவை ✓',
        'உள்ளடங்கிய கோணம் 50° சமம் மற்றும் அதைச் சுற்றியுள்ள பக்கங்களின் விகிதம் 4/6 = 6/9 = 2/3 ⇒ SAS விதிப்படி வடிவொத்தவை ✓',
        'மூன்று பக்கங்களின் விகிதங்களும் 3/6 = 4/8 = 5/10 = 1/2 ⇒ SSS விதிப்படி வடிவொத்தவை ✓',
        'எச்சரிக்கை! கோணம் B = 35° இரு பக்கங்களுக்கு இடையில் இல்லை. AC = 5.5 ஆரம் கொண்ட வில் அடிப்பக்கத்தை C₁, C₂ என இரு இடங்களில் வெட்டுகிறது — இரு வேறு வடிவங்கள் (SSA தோல்வி ✗)'
      ]
    }:{
      title:'Test AA, SAS, SSS — and watch why SSA fails!',
      tabs:['AA','SAS','SSS','SSA Trap!'],
      flip:'Swing side AC to alternate point C₂',
      notes:[
        'Matching two angles (50° and 65°) forces the third angle to be 180° − 115° = 65° in both triangles ⇒ AA guarantees similarity ✓',
        'Equal angle 50° sits BETWEEN proportional sides (4/6 = 6/9 = 2/3) ⇒ SAS guarantees similarity ✓',
        'All three pairs of corresponding sides share ratio 3/6 = 4/8 = 5/10 = 1/2 ⇒ SSS guarantees similarity ✓',
        'Trap! ∠B = 35° is NOT between AB = 8 and AC = 5.5. Swinging AC cuts the base ray at TWO points C₁ and C₂ — completely different shapes (SSA fails ✗)!'
      ]
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,ssaIdx=0;
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const diagram=window.TriggleG10DiagramGuard.lab(copy.title,()=>({
      mode,active:ssaIdx,ssa:mathAPI.ssaAmbiguous(8,5.5,35)
    }));
    const flipBtn=el('button','g10ch4-chip-btn',copy.flip);flipBtn.type='button';
    flipBtn.onclick=()=>{ssaIdx=1-ssaIdx;paint();};
    const angles=['∠A = ∠P = 50° · ∠B = ∠Q = ∠C = ∠R = 65°','∠A = ∠P = 50°','','∠B = 35°'];
    const key=el('p','diagramguard-annotation');
    const note=el('p','g10ch4-status');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,diagram.svg,key,flipBtn,note);
    const draw=diagram.observe();

    function paint(){
      flipBtn.hidden=mode!==3;
      key.textContent=angles[mode];
      key.hidden=!angles[mode];
      note.className='g10ch4-status '+(mode===3?'is-warn':'is-match');
      note.textContent=copy.notes[mode];
      draw();
    }
    paint();
  }

  /* 3. Right-Triangle Altitude, Perimeter & Area-Squared */
  function labSimilarityResults(host,ta){
    const copy=ta?{
      title:'பரப்பளவு k² மடங்கும், செங்கோணக் குத்துயரமும்',
      tabs:['பரப்பளவு = k²','செங்கோணக் குத்துயரம்'],
      perimeter:'சுற்றளவு விகிதம்',area:'பரப்பளவு விகிதம்',rightAngles:'செங்கோணங்கள்',order:'ஒத்த முனைகளின் வரிசை',
      areaNote:(k)=>`பக்கங்களும் சுற்றளவும் ${k} மடங்காகும்போது, உள்ளே ${k*k} சிறிய முக்கோணங்கள் பொருந்துகின்றன — பரப்பளவு = ${k}² = ${k*k} மடங்கு!`,
      altBtns:['முழு △ABC','இடது △ADB','வலது △BDC'],
      altNotes:[
        '∠B = 90°, ∠A = 37°, ∠C = 53°. குத்துக்கோடு BD ⟂ AC.',
        '△ADB-இல் ∠D = 90°, ∠A = 37°, ∠ABD = 53° ⇒ △ADB ∼ △ABC!',
        '△BDC-இல் ∠D = 90°, ∠C = 53°, ∠CBD = 37° ⇒ △BDC ∼ △ADB ∼ △ABC!'
      ]
    }:{
      title:'Why Area scales as k² & Right-Triangle Altitude Similarity',
      tabs:['Area = k² Tiling','Right-Angle Altitude'],
      perimeter:'Perimeter ratio',area:'Area ratio (tiles)',rightAngles:'Right angles',order:'Corresponding vertex order',
      areaNote:(k)=>`Scaling each side by ${k} scales the perimeter by ${k}, while ${k*k} unit triangles tile the interior — Area ratio = ${k}² = ${k*k}!`,
      altBtns:['Full △ABC','Left △ADB','Right △BDC'],
      altNotes:[
        '∠B = 90°, ∠A = 37°, ∠C = 53°. Drop altitude BD ⟂ AC.',
        'In △ADB: ∠D = 90°, ∠A = 37°, so ∠ABD = 53° ⇒ △ADB ∼ △ABC (AA).',
        'In △BDC: ∠D = 90°, ∠C = 53°, so ∠CBD = 37° ⇒ △BDC ∼ △ADB ∼ △ABC!'
      ]
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,k=2,triIdx=0;
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const diagram=window.TriggleG10DiagramGuard.similarityResultsLab(copy.title,()=>({mode,k,selected:triIdx}));
    const controls=el('div','g10ch4-preset-row');
    const metrics=el('div','g10ch4-metrics');
    const note=el('p','g10ch4-status is-match');note.setAttribute('aria-live','polite');
    const areaButtons=[1,2,3,4].map(value=>{
      const button=el('button','g10ch4-chip-btn',`k = ${value}`);
      button.type='button';
      button.onclick=()=>{k=value;paint();};
      return button;
    });
    const altitudeButtons=copy.altBtns.map((name,index)=>{
      const button=el('button','g10ch4-chip-btn',name);
      button.type='button';
      button.onclick=()=>{triIdx=index;paint();};
      return button;
    });
    host.append(tabs.bar,diagram.svg,controls,metrics,note);
    const redraw=diagram.observe();

    function paint(){
      const buttons=mode===0?areaButtons:altitudeButtons;
      if(controls.firstChild!==buttons[0])controls.replaceChildren(...buttons);
      buttons.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===(mode===0?k-1:triIdx))));
      if(mode===0){
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>${e(copy.perimeter)}</span><strong>${k}×</strong></div>
          <div class="g10ch4-metric"><span>${e(copy.area)}</span><strong>${k*k}× (${k}²)</strong></div>`;
        note.textContent=copy.areaNote(k);
      }else{
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>${e(copy.rightAngles)}</span><strong>∠B = ∠ADB = ∠BDC = 90°</strong></div>
          <div class="g10ch4-metric"><span>${e(copy.order)}</span><strong>△ADB ∼ △BDC ∼ △ABC</strong></div>`;
        note.textContent=copy.altNotes[triIdx];
      }
      redraw();
    }
    paint();
  }

  /* 4. Constructing a Similar Triangle (m/n) */
  function labSimilarConstruction(host,ta){
    const copy=ta?{
      title:'அளவுக் காரணி m/n வரைபடப் படிகளைப் பாருங்கள்',
      ratios:[{m:2,n:3,lbl:'2/3 (< 1)'},{m:4,n:5,lbl:'4/5 (< 1)'},{m:6,n:5,lbl:'6/5 (> 1)'},{m:7,n:3,lbl:'7/3 (> 1)'}],
      prev:'← முந்தைய படி',next:'அடுத்த படி →',replay:'மீண்டும் ↻',
      steps:(m,n)=>[
        `படி 1: மூல முக்கோணம் △PQR வரைக.`,
        `படி 2: Q-விலிருந்து QR-உடன் குறுங்கோணம் உருவாக்கும் கதிர் QX வரைக.`,
        `படி 3: QX-இல் max(${m}, ${n}) = ${Math.max(m,n)} சம புள்ளிகள் Q₁…Q${Math.max(m,n)} குறிக்க.`,
        `படி 4: பகுதி (denominator) Q${n}-ஐ R உடன் இணைக்க; தொகுதி Q${m} வழியே இணைகோடு வரைக (${m<n?'உள்ளே':'வெளியே நீண்டு'} R' கிடைக்கும்).`,
        `படி 5: R' வழியே RP-க்கு இணைகோடு வரைந்து P'-ஐக் காண்க. △P'QR'-இன் பக்கங்கள் ${m}/${n} பங்காகும்!`
      ]
    }:{
      title:'Step through similar-triangle construction (m/n < 1 and > 1)',
      ratios:[{m:2,n:3,lbl:'2/3 (< 1)'},{m:4,n:5,lbl:'4/5 (< 1)'},{m:6,n:5,lbl:'6/5 (> 1)'},{m:7,n:3,lbl:'7/3 (> 1)'}],
      prev:'← Prev step',next:'Next step →',replay:'Replay ↻',
      steps:(m,n)=>[
        `Step 1: Draw the original triangle △PQR.`,
        `Step 2: Draw an acute ray QX below the base QR.`,
        `Step 3: Mark max(${m}, ${n}) = ${Math.max(m,n)} equal compass steps Q₁…Q${Math.max(m,n)} along QX.`,
        `Step 4: Join denominator Q${n} to R, then draw a parallel through numerator Q${m} to locate R' (${m<n?'inside QR':'beyond R'}).`,
        `Step 5: Draw R'P' ∥ RP to finish △P'QR' with scale factor ${m}/${n}!`
      ]
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let rIdx=0,step=4;
    const ratioTabs=makeTabs(copy.ratios.map(r=>r.lbl),0,i=>{rIdx=i;ratioTabs.sync(i);paint();},copy.title);
    const svg=svgEl('svg',{viewBox:'0 -32 320 222',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const nav=el('div','g10ch4-step-nav');
    const prev=el('button','g10ch4-chip-btn',copy.prev);prev.type='button';
    const prog=el('span','g10ch4-progress','5 / 5');
    const next=el('button','g10ch4-chip-btn g10ch4-btn-primary',copy.replay);next.type='button';
    nav.append(prev,prog,next);
    const note=el('p','g10ch4-status is-match');note.setAttribute('aria-live','polite');
    host.append(ratioTabs.bar,svg,nav,note);

    prev.onclick=()=>{if(step>0){step--;paint();}};
    next.onclick=()=>{step=(step+1)%5;paint();};

    function paint(){
      svg.replaceChildren();
      const {m,n}=copy.ratios[rIdx];
      const maxN=Math.max(m,n),f=m/n;
      const Q=[36,104];
      const baseLen=m>n?90:155;
      const R=[Q[0]+baseLen,104];
      const P=[Q[0]+baseLen*0.38,104-(m>n?46:72)];
      const R2=[Q[0]+baseLen*f,104];
      const P2=[Q[0]+(P[0]-Q[0])*f,Q[1]+(P[1]-Q[1])*f];
      const rayEnd=[Q[0]+180,176];
      const qPts=Array.from({length:maxN},(_,i)=>lerp(Q,rayEnd,(i+1)/(maxN+0.5)));

      if(step>=1){
        svg.append(svgEl('line',{x1:Q[0],y1:Q[1],x2:rayEnd[0],y2:rayEnd[1],stroke:'#8A6728','stroke-width':'1.5'}));
        if(m>n)svg.append(svgEl('line',{x1:R[0],y1:R[1],x2:R2[0]+14,y2:R2[1],stroke:'#D7D4CC','stroke-width':'1.4','stroke-dasharray':'3 3'}));
        if(m>n)svg.append(svgEl('line',{x1:P[0],y1:P[1],x2:P2[0]+(P2[0]-Q[0])*0.1,y2:P2[1]-8,stroke:'#D7D4CC','stroke-width':'1.4','stroke-dasharray':'3 3'}));
      }
      svg.append(
        svgEl('polygon',{points:`${P} ${Q} ${R}`,fill:'rgba(24,27,32,0.05)',stroke:'#181B20','stroke-width':'2'}),
        svgEl('text',{x:P[0]-4,y:P[1]-6,'font-size':'10.5','font-weight':'700'},'P'),
        svgEl('text',{x:Q[0]-12,y:Q[1]+4,'font-size':'10.5','font-weight':'700'},'Q'),
        svgEl('text',{x:R[0]+3,y:R[1]+13,'font-size':'10.5','font-weight':'700'},'R')
      );
      if(step>=2){
        qPts.forEach((pt,i)=>{
          const isDen=(i+1===n),isNum=(i+1===m);
          svg.append(
            svgEl('circle',{cx:pt[0],cy:pt[1],r:isDen||isNum?3.5:2.2,fill:isNum?'#6E2933':isDen?'#166353':'#8A6728'}),
            svgEl('text',{x:pt[0]-10,y:pt[1]+12,'font-size':'9','font-weight':isDen||isNum?'700':'400',fill:isNum?'#6E2933':isDen?'#166353':'#525B62'},`Q${i+1}`)
          );
        });
      }
      if(step>=3){
        const qDen=qPts[n-1],qNum=qPts[m-1];
        svg.append(
          svgEl('line',{x1:qDen[0],y1:qDen[1],x2:R[0],y2:R[1],stroke:'#166353','stroke-width':'1.6','stroke-dasharray':'4 3'}),
          svgEl('line',{x1:qNum[0],y1:qNum[1],x2:R2[0],y2:R2[1],stroke:'#6E2933','stroke-width':'2'}),
          svgEl('circle',{cx:R2[0],cy:R2[1],r:3.6,fill:'#6E2933'}),
          svgEl('text',{x:R2[0]+2,y:R2[1]+13,'font-size':'10.5','font-weight':'700',fill:'#6E2933'},"R'")
        );
      }
      if(step>=4){
        svg.append(
          svgEl('line',{x1:R2[0],y1:R2[1],x2:P2[0],y2:P2[1],stroke:'#6E2933','stroke-width':'2.2'}),
          svgEl('polygon',{points:`${P2} ${Q} ${R2}`,fill:'rgba(110,41,51,0.11)',stroke:'#6E2933','stroke-width':'2'}),
          svgEl('circle',{cx:P2[0],cy:P2[1],r:3.6,fill:'#6E2933'}),
          svgEl('text',{x:P2[0]-5,y:P2[1]-7,'font-size':'10.5','font-weight':'700',fill:'#6E2933'},"P'")
        );
      }
      prev.disabled=step===0;
      next.textContent=step===4?copy.replay:copy.next;
      prog.textContent=`${step+1} / 5`;
      note.textContent=copy.steps(m,n)[step];
    }
    paint();
  }

  /* 5. Basic Proportionality Theorem (Thales Theorem) */
  function labBptThales(host,ta){
    const copy=ta?{
      title:'இணைக்கோடு DE-ஐ மேலே/கீழே நகர்த்தி விகிதங்களைப் பாருங்கள்',
      slider:'கோடு DE-யின் நிலை (t)',
      hint:'புள்ளி D அல்லது A-ஐ இழுக்கலாம், அல்லது கீழுள்ள நகர்த்தியைப் பயன்படுத்தலாம்.',
      status:'DE ∥ BC என்பதால் AD/DB மற்றும் AE/EC எப்போதும் சமம்!'
    }:{
      title:'Slide parallel line DE (or drag vertex A) and watch both ratios stay equal',
      slider:'Position of parallel cut DE',
      hint:'Drag the burgundy handle D (or apex A), or use the slider below.',
      status:'Because DE ∥ BC, AD/DB and AE/EC stay identically equal!'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let ax=154,t=0.45;
    const B=[38,154],C=[282,154];
    const svg=svgEl('svg',{viewBox:'0 0 320 178',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const slider=makeSlider(copy.slider,0.20,0.80,0.01,t,v=>{t=v;paint();});
    const note=el('p','g10ch4-status is-match',copy.status);note.setAttribute('aria-live','polite');
    host.append(svg,metrics,slider.row,el('p','g10ch4-hint',copy.hint),note);

    let dragTarget=null;
    svg.addEventListener('pointerdown',evt=>{
      const h=evt.target.closest('[data-handle]');
      if(h){dragTarget=h.dataset.handle;try{svg.setPointerCapture(evt.pointerId);}catch{}evt.preventDefault();}
    });
    svg.addEventListener('pointermove',evt=>{
      if(!dragTarget)return;
      evt.preventDefault();
      const [px,py]=svgPoint(svg,evt);
      if(dragTarget==='A'){ax=Math.max(70,Math.min(250,px));paint();}
      else if(dragTarget==='D'){
        const Ay=24;
        t=Math.max(0.20,Math.min(0.80,(py-Ay)/(B[1]-Ay)));
        slider.input.value=fmt(t,2);slider.out.textContent=fmt(t,2);
        paint();
      }
    });
    const stop=evt=>{if(dragTarget){dragTarget=null;try{svg.releasePointerCapture(evt.pointerId);}catch{}}};
    svg.addEventListener('pointerup',stop);svg.addEventListener('pointercancel',stop);

    function paint(){
      svg.replaceChildren();
      const A=[ax,24];
      const s=mathAPI.bptCut(A,B,C,t);
      const scale=1/18; // readable cm-like units
      svg.append(
        svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
        svgEl('polygon',{points:`${A} ${s.D} ${s.E}`,fill:'rgba(22,99,83,0.10)',stroke:'none'}),
        svgEl('line',{x1:s.D[0],y1:s.D[1],x2:s.E[0],y2:s.E[1],stroke:'#166353','stroke-width':'2.5'}),
        svgEl('text',{x:A[0]-4,y:A[1]-7,'font-size':'11','font-weight':'700'},'A'),
        svgEl('text',{x:B[0]-12,y:B[1]+14,'font-size':'11','font-weight':'700'},'B'),
        svgEl('text',{x:C[0]+4,y:C[1]+14,'font-size':'11','font-weight':'700'},'C'),
        svgEl('text',{x:s.D[0]-16,y:s.D[1]+3,'font-size':'11','font-weight':'700',fill:'#6E2933'},'D'),
        svgEl('text',{x:s.E[0]+8,y:s.E[1]+3,'font-size':'11','font-weight':'700',fill:'#166353'},'E'),
        svgEl('circle',{cx:A[0],cy:A[1],r:7,fill:'#181B20',stroke:'#fff','stroke-width':'2',class:'g10ch4-handle','data-handle':'A'}),
        svgEl('circle',{cx:s.D[0],cy:s.D[1],r:8,fill:'#6E2933',stroke:'#fff','stroke-width':'2',class:'g10ch4-handle','data-handle':'D'})
      );
      const AD=s.AD*scale,DB=s.DB*scale,AE=s.AE*scale,EC=s.EC*scale;
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>AD / DB = ${fmt(AD)} / ${fmt(DB)}</span><strong>${fmt(s.ratioPart,2)}</strong></div>
        <div class="g10ch4-metric"><span>AE / EC = ${fmt(AE)} / ${fmt(EC)}</span><strong>${fmt(s.ratioPartRight,2)}</strong></div>`;
    }
    paint();
  }

  /* 6. Converse of BPT */
  function labConverseBpt(host,ta){
    const copy=ta?{
      title:'D மற்றும் E-ஐ தனித்தனியாக நகர்த்தி எப்போது DE ∥ BC ஆகிறது எனப் பாருங்கள்',
      sliderD:'D-யின் நிலை (AD/AB)',
      sliderE:'E-யின் நிலை (AE/AC)',
      snap:'E-ஐ சரியான விகிதத்திற்கு பொருத்து (E = F)',
      parallel:'AD/DB = AE/EC என்பதால் E = F ⇒ DE ∥ BC ✓',
      notParallel:(gap)=>`விகிதங்கள் சமமில்லை! உண்மையான இணைக்கோடு DF, AC-ஐ வேறு புள்ளி F-இல் வெட்டுகிறது ⇒ DE ∦ BC`
    }:{
      title:'Move D and E independently to see when equal ratios force DE ∥ BC',
      sliderD:'Point D along AB',
      sliderE:'Point E along AC',
      snap:'Match ratios (Snap E onto F)',
      parallel:'Ratios match! Point E lands right on F, forcing DE ∥ BC ✓',
      notParallel:()=>'Ratios differ! Dashed parallel DF hits F instead of E, so DE is NOT parallel to BC.'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    const A=[160,34],B=[50,148],C=[270,148];
    let tD=0.40,tE=0.62;
    const svg=svgEl('svg',{viewBox:'0 0 320 192',class:'g10ch4-svg diagramguard-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const sD=makeSlider(copy.sliderD,0.20,0.80,0.01,tD,v=>{tD=v;paint();});
    const sE=makeSlider(copy.sliderE,0.20,0.80,0.01,tE,v=>{tE=v;paint();});
    const snapBtn=el('button','g10ch4-chip-btn',copy.snap);snapBtn.type='button';
    snapBtn.onclick=()=>{tE=tD;sE.input.value=fmt(tE,2);sE.out.textContent=fmt(tE,2);paint();};
    const status=el('p','g10ch4-status');status.setAttribute('aria-live','polite');
    host.append(svg,metrics,sD.row,sE.row,snapBtn,status);
    const guard=window.TriggleDiagramGuard;
    let font=0;
    guard.responsive(svg,(width,rem)=>{
      const unit=320*rem/width;
      const extra=Math.max(0,1.8*unit-36);
      svg.setAttribute('viewBox',`0 ${-extra} 320 ${192+extra*2}`);
      const matrix=svg.getScreenCTM();
      font=.9375*rem/Math.hypot(matrix.c,matrix.d);
      paint();
    });

    function paint(){
      svg.replaceChildren();
      const st=mathAPI.converseBptState(A,B,C,tD,tE);
      const col=st.isParallel?'#166353':'#6E2933';
      const dot=(point,id,fill)=>svgEl('circle',{cx:point[0],cy:point[1],r:4.5,fill,
        'data-dg-obstacle':'point-'+id,'data-dg-fill':''});
      svg.append(
        svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2','data-dg-obstacle':'triangle'}),
        svgEl('line',{x1:st.D[0],y1:st.D[1],x2:st.E[0],y2:st.E[1],stroke:col,'stroke-width':'2.4','data-dg-obstacle':'DE'}),
        dot(st.D,'D','#181B20'),dot(st.E,'E',col)
      );
      if(!st.isParallel)svg.append(svgEl('line',{x1:st.D[0],y1:st.D[1],x2:st.F[0],y2:st.F[1],stroke:'#166353',
        'stroke-width':'1.6','stroke-dasharray':'4 3','data-dg-obstacle':'DF'}),dot(st.F,'F','#166353'));
      if(font){
        const order=st.E[1]>=st.F[1]?1:-1;
        const pointLabels=[['A',A,[0,-1]],['B',B,[-1,1]],['C',C,[1,1]],['D',st.D,[-1,0]],
          ['E',st.E,[1,st.isParallel?0:order],col],
          ...(!st.isParallel?[['F',st.F,[1,-order],'#166353']]:[])];
        guard.place(svg,pointLabels.map(([id,anchor,direction,fill='#181B20'])=>({
          label:svgEl('text',{'data-dg-label':id,'text-anchor':'middle',dy:'.35em','font-size':font,fill},id),anchor,direction,
          neighborPoints:pointLabels.filter(([,other])=>other!==anchor).map(([,other])=>other)
        })));
      }
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>AD / DB</span><strong>${fmt(st.rL,2)}</strong></div>
        <div class="g10ch4-metric"><span>AE / EC</span><strong>${fmt(st.rR,2)}</strong></div>`;
      status.className='g10ch4-status '+(st.isParallel?'is-match':'is-warn');
      status.textContent=st.isParallel?copy.parallel:copy.notParallel(st.gap);
    }
    paint();
  }

  /* 7. Angle Bisector Theorem */
  function labAngleBisector(host,ta){
    const copy=ta?{
      title:'உச்சி A-ஐ நகர்த்தி AB/AC = BD/DC சமமாக இருப்பதைப் பாருங்கள்',
      slider:'உச்சி A-யின் இட/வல நகர்வு',
      isosceles:'சம பக்கங்கள் (AB = AC ⇒ BD = DC)',
      skew:'சாய்வான முக்கோணம் (AB ≠ AC)',
      hint:'உச்சி A-ஐ இழுக்கவும் அல்லது நகர்த்தியைப் பயன்படுத்தவும்.'
    }:{
      title:'Move vertex A while AD bisects ∠A — compare AB/AC with BD/DC',
      slider:'Horizontal position of vertex A',
      isosceles:'Isosceles (AB = AC ⇒ BD = DC)',
      skew:'Scalene (AB ≠ AC ⇒ BD ≠ DC)',
      hint:'Drag apex A left or right to watch BD shift toward the shorter side.'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let ax=110;
    const B=[36,154],C=[284,154];
    const svg=svgEl('svg',{viewBox:'0 0 320 178',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const slider=makeSlider(copy.slider,65,255,1,ax,v=>{ax=v;paint();});
    const presetRow=el('div','g10ch4-preset-row');
    [[160,copy.isosceles],[102,copy.skew]].forEach(([val,lbl])=>{
      const b=el('button','g10ch4-chip-btn',lbl);b.type='button';
      b.onclick=()=>{ax=val;slider.input.value=String(val);slider.out.textContent=String(val);paint();};
      presetRow.append(b);
    });
    const status=el('p','g10ch4-status is-match');status.setAttribute('aria-live','polite');
    host.append(svg,metrics,slider.row,presetRow,el('p','g10ch4-hint',copy.hint),status);

    svg.dataset.dragAll='true';
    attachDrag(svg,([px])=>{
      ax=Math.max(65,Math.min(255,Math.round(px)));
      slider.input.value=String(ax);slider.out.textContent=String(ax);paint();
    });

    function paint(){
      svg.replaceChildren();
      const A=[ax,24];
      const st=mathAPI.angleBisectorPoint(A,B,C);
      const sc=1/24;
      svg.append(
        svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
        svgEl('line',{x1:A[0],y1:A[1],x2:st.D[0],y2:st.D[1],stroke:'#6E2933','stroke-width':'2.4'}),
        svgEl('circle',{cx:st.D[0],cy:st.D[1],r:4.5,fill:'#6E2933'}),
        svgEl('circle',{cx:A[0],cy:A[1],r:8,fill:'#166353',stroke:'#fff','stroke-width':'2',class:'g10ch4-handle','data-drag-handle':'true'}),
        svgEl('text',{x:A[0]-4,y:A[1]-10,'font-size':'11','font-weight':'700',fill:'#166353'},'A'),
        svgEl('text',{x:B[0]-12,y:B[1]+13,'font-size':'11','font-weight':'700'},'B'),
        svgEl('text',{x:C[0]+4,y:C[1]+13,'font-size':'11','font-weight':'700'},'C'),
        svgEl('text',{x:st.D[0]-4,y:st.D[1]+14,'font-size':'11','font-weight':'700',fill:'#6E2933'},'D'),
        svgEl('text',{x:(A[0]+B[0])/2-26,y:92,'font-size':'10',fill:'#525B62'},`AB ${fmt(st.ab*sc,1)}`),
        svgEl('text',{x:(A[0]+C[0])/2+8,y:92,'font-size':'10',fill:'#525B62'},`AC ${fmt(st.ac*sc,1)}`),
        svgEl('text',{x:(B[0]+st.D[0])/2-14,y:168,'font-size':'10','font-weight':'700',fill:'#6E2933'},`BD ${fmt(st.bd*sc,1)}`),
        svgEl('text',{x:(st.D[0]+C[0])/2-10,y:168,'font-size':'10','font-weight':'700',fill:'#166353'},`DC ${fmt(st.dc*sc,1)}`)
      );
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>AB / AC</span><strong>${fmt(st.ratioSides,2)}</strong></div>
        <div class="g10ch4-metric"><span>BD / DC</span><strong>${fmt(st.ratioSegs,2)}</strong></div>
        <div class="g10ch4-metric"><span>∠BAD &amp; ∠DAC</span><strong>${fmt(st.ang1,1)}° = ${fmt(st.ang2,1)}°</strong></div>`;
      const iso=Math.abs(st.ab-st.ac)<3;
      status.textContent=iso
        ?(ta?'AB = AC என்பதால் BD = DC (நடுக்கோடும் கோண இருசமவெட்டியும் ஒன்றே!)':'AB = AC, so BD = DC here — only in an isosceles triangle does the bisector meet the midpoint!')
        :(ta?'∠BAD = ∠DAC சமம்; ஆனால் AB ≠ AC என்பதால் BD ≠ DC, விகிதங்கள் மட்டுமே சமம்!':'Notice BD ≠ DC because AB ≠ AC, yet AB/AC and BD/DC are equal!');
    }
    paint();
  }

  /* 8. Converse of Angle Bisector Theorem & Triangle Validity */
  function labConverseAbt(host,ta){
    const copy=ta?{
      title:'D-ஐ BC-இன் மீது நகர்த்தி கோணங்களை ஒப்பிடுங்கள் (மற்றும் 4.2 வினா 8(i) பொறி)',
      presets:[
        {lbl:'சம விகிதம் (4, 6, BD=2, DC=3)',mode:'bisect'},
        {lbl:'சமமற்ற விகிதம் (4, 6, BD=3, DC=2)',mode:'skew'},
        {lbl:'4.2 Q8(i) பொறி: (5, 10, 1.5+3.5)',mode:'degenerate'}
      ],
      slider:'BD-யின் நீளம் (BC = 5 இல்)',
      ok:'AB/AC = BD/DC மற்றும் முக்கோணம் அமைகிறது ⇒ ∠BAD = ∠DAC ✓',
      mismatch:'விகிதங்கள் சமமில்லை ⇒ ∠BAD ≠ ∠DAC (AD இருசமவெட்டி அல்ல ✗)',
      degen:'முக்கோணச் சமனிலி தோல்வி! AB + BC = 5 + 5 = 10 = AC ⇒ A, B, C ஒரே நேர்க்கோட்டில் சரிந்துவிட்டன!'
    }:{
      title:'Slide D along BC to test Converse ABT — plus the Exercise 4.2 Q8(i) line trap!',
      presets:[
        {lbl:'Bisector match (AB=4, AC=6, BD=2)',mode:'bisect'},
        {lbl:'Mismatch (AB=4, AC=6, BD=3.2)',mode:'skew'},
        {lbl:'4.2 Q8(i) Trap (5, 10, 1.5+3.5)',mode:'degenerate'}
      ],
      slider:'Length BD along BC = 5',
      ok:'Valid triangle AND AB/AC = BD/DC ⇒ ∠BAD = ∠DAC (bisector ✓)',
      mismatch:'AB/AC ≠ BD/DC, so ∠BAD ≠ ∠DAC (NOT an angle bisector ✗)',
      degen:'Degenerate trap! BC = 1.5 + 3.5 = 5, so AB + BC = 5 + 5 = 10 = AC — no triangle can form!'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let bd=2.0,degenerate=false;
    const svg=svgEl('svg',{viewBox:'0 0 320 188',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const slider=makeSlider(copy.slider,1.0,4.0,0.1,bd,v=>{degenerate=false;bd=v;paint();});
    const row=el('div','g10ch4-preset-row');
    copy.presets.forEach(p=>{
      const b=el('button','g10ch4-chip-btn',p.lbl);b.type='button';
      b.onclick=()=>{
        if(p.mode==='bisect'){degenerate=false;bd=2.0;}
        else if(p.mode==='skew'){degenerate=false;bd=3.2;}
        else degenerate=true;
        slider.input.value=fmt(bd,1);slider.out.textContent=fmt(bd,1);paint();
      };
      row.append(b);
    });
    const status=el('p','g10ch4-status');status.setAttribute('aria-live','polite');
    host.append(svg,metrics,slider.row,row,status);

    function paint(){
      svg.replaceChildren();
      if(degenerate){
        const A=[28,108],B=[160,108],C=[292,108],D=lerp(B,C,1.5/5);
        svg.append(
          svgEl('line',{x1:B[0],y1:B[1],x2:C[0],y2:C[1],stroke:'#6E2933','stroke-width':'3'}),
          svgEl('circle',{cx:B[0],cy:B[1],r:4.5,fill:'#181B20'}),
          svgEl('circle',{cx:D[0],cy:D[1],r:4.5,fill:'#6E2933'}),
          svgEl('circle',{cx:A[0],cy:A[1],r:4.5,fill:'#6E2933'}),
          svgEl('circle',{cx:C[0],cy:C[1],r:4.5,fill:'#181B20'}),
          svgEl('text',{x:B[0]-4,y:B[1]-12,'font-size':'11','font-weight':'700'},'B'),
          svgEl('text',{x:D[0]-4,y:D[1]+18,'font-size':'11','font-weight':'700',fill:'#6E2933'},'D (1.5)'),
          svgEl('text',{x:A[0]-4,y:A[1]-12,'font-size':'11','font-weight':'700',fill:'#6E2933'},'A'),
          svgEl('text',{x:C[0]-4,y:C[1]-12,'font-size':'11','font-weight':'700'},'C')
        );
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>Triangle inequality</span><strong>5 + 5 = 10 (Fails!)</strong></div>
          <div class="g10ch4-metric"><span>AB/AC vs BD/DC</span><strong>0.50 vs 0.43</strong></div>`;
        status.className='g10ch4-status is-warn';
        status.textContent=copy.degen;
        return;
      }
      // Valid triangle AB=4, BC=5, AC=6 -> solve exact coords
      const B=[60,158],C=[225,158];
      const sc=33; // 5 units = 165 SVG units
      // x = (25 + 16 - 36)/10 = 0.5 units from B, y = sqrt(16 - 0.25) = 3.9686 units
      const A=[B[0]+0.5*sc,B[1]-Math.sqrt(16-0.25)*sc];
      const dc=5-bd;
      const D=lerp(B,C,bd/5);
      const ang1=angleDeg(A,B,D),ang2=angleDeg(A,D,C);
      const chk=mathAPI.converseAbtCheck(4,6,bd,dc);
      const isBis=Math.abs(bd-2.0)<0.06;
      const col=isBis?'#166353':'#6E2933';
      svg.append(
        svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
        svgEl('line',{x1:A[0],y1:A[1],x2:D[0],y2:D[1],stroke:col,'stroke-width':'2.4'}),
        svgEl('circle',{cx:D[0],cy:D[1],r:5,fill:col}),
        svgEl('text',{x:A[0]-4,y:A[1]-7,'font-size':'11','font-weight':'700'},'A'),
        svgEl('text',{x:B[0]-12,y:B[1]+13,'font-size':'11','font-weight':'700'},'B'),
        svgEl('text',{x:C[0]+4,y:C[1]+13,'font-size':'11','font-weight':'700'},'C'),
        svgEl('text',{x:D[0]-4,y:D[1]+14,'font-size':'11','font-weight':'700',fill:col},'D')
      );
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>AB/AC vs BD/DC</span><strong>${fmt(4/6,2)} vs ${fmt(chk.ratioR,2)}</strong></div>
        <div class="g10ch4-metric"><span>∠BAD vs ∠DAC</span><strong>${fmt(ang1,1)}° vs ${fmt(ang2,1)}°</strong></div>`;
      status.className='g10ch4-status '+(isBis?'is-match':'is-warn');
      status.textContent=isBis?copy.ok:copy.mismatch;
    }
    paint();
  }

  /* 9. Triangle Construction (Vertical angle arc + Median / Altitude / Bisector) */
  function labTriangleConstruction(host,ta){
    const copy=ta?{
      title:'பெரிய வட்டவில்லில் P-ஐ நகர்த்தி ∠QPR = 40° மாறாமல் இருப்பதைப் பாருங்கள்',
      tabs:['நடுக்கோடு (PG)','குத்துயரம் (PM)','கோண இருசமவெட்டி (ID)'],
      slider:'வில்லின் மீது P-யின் கோண நிலை',
      notes:[
        'நடுக்கோடு PG: அடிப்பக்க நடுப்புள்ளி G-யிலிருந்து நிலையான ஆர வட்டம் மேல் வில்லை P-இல் வெட்டுகிறது; ∠P = 40° மாறாது!',
        'குத்துயரம் PM: QR-க்கு h உயரத்தில் வரையப்பட்ட இணைக்கோடு மேல் வில்லை P-இல் வெட்டுகிறது; ∠P = 40° மாறாது!',
        'இருசமவெட்டி PD: கீழ் வில்லின் நடுப்புள்ளி I-யையும் D-யையும் இணைத்து நீட்டினால் மேல் வில்லை P-இல் வெட்டும்; ∠QPD = ∠DPR = 20°!'
      ]
    }:{
      title:'Slide P along the circumcircle arc — ∠QPR stays 40° while the second locus pins P!',
      tabs:['Median PG','Altitude PM','Angle Bisector ID'],
      slider:'Move P along major arc',
      notes:[
        'Median locus: a circle centred at base midpoint G of radius PG cuts the major arc at P, keeping ∠QPR = 40°!',
        'Altitude locus: a parallel line at height h above QR cuts the major arc at P, keeping ∠QPR = 40°!',
        'Angle Bisector locus: connecting lower minor-arc midpoint I through D always hits P with ∠QPD = ∠DPR = 20°!'
      ]
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,phiDeg=-52;
    const Q=[102,126],R=[218,126],theta=40;
    const arc=mathAPI.circumcircleArc(Q,R,theta);
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const svg=svgEl('svg',{viewBox:'-12 -54 344 260',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const slider=makeSlider(copy.slider,-135,-45,1,phiDeg,v=>{phiDeg=v;paint();});
    const note=el('p','g10ch4-status is-match');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,svg,metrics,slider.row,note);

    function paint(){
      svg.replaceChildren();
      const rad=phiDeg*Math.PI/180;
      const P=[arc.O[0]+arc.R*Math.cos(rad),arc.O[1]+arc.R*Math.sin(rad)];
      const angP=angleDeg(P,Q,R);
      const G=arc.mid,I=arc.I;
      // Tangent QX below QR at 40 deg
      const qx=[Q[0]+95*Math.cos(40*Math.PI/180),Q[1]+95*Math.sin(40*Math.PI/180)];
      svg.append(
        svgEl('circle',{cx:arc.O[0],cy:arc.O[1],r:arc.R,fill:'none',stroke:'#D7D4CC','stroke-width':'1.5'}),
        svgEl('line',{x1:Q[0],y1:Q[1],x2:qx[0],y2:qx[1],stroke:'#8A6728','stroke-width':'1.4','stroke-dasharray':'4 3'}),
        svgEl('line',{x1:G[0],y1:16,x2:G[0],y2:I[1]+10,stroke:'#D7D4CC','stroke-width':'1','stroke-dasharray':'3 3'}),
        svgEl('polygon',{points:`${P} ${Q} ${R}`,fill:'rgba(22,99,83,0.10)',stroke:'#181B20','stroke-width':'2'})
      );
      if(mode===0){
        const rMed=dist(P,G);
        svg.append(
          svgEl('path',{d:`M ${G[0]-rMed} ${G[1]} A ${rMed} ${rMed} 0 0 1 ${G[0]+rMed} ${G[1]}`,fill:'none',stroke:'#6E2933','stroke-width':'1.4','stroke-dasharray':'4 3'}),
          svgEl('line',{x1:P[0],y1:P[1],x2:G[0],y2:G[1],stroke:'#6E2933','stroke-width':'2'}),
          svgEl('circle',{cx:G[0],cy:G[1],r:3.2,fill:'#6E2933'}),
          svgEl('text',{x:G[0]-4,y:G[1]+13,'font-size':'10','font-weight':'700',fill:'#6E2933'},'G')
        );
      }else if(mode===1){
        const M=[P[0],Q[1]];
        svg.append(
          svgEl('line',{x1:36,y1:P[1],x2:284,y2:P[1],stroke:'#6E2933','stroke-width':'1.4','stroke-dasharray':'4 3'}),
          svgEl('line',{x1:P[0],y1:P[1],x2:M[0],y2:M[1],stroke:'#6E2933','stroke-width':'2'}),
          svgEl('text',{x:M[0]-4,y:M[1]+13,'font-size':'10','font-weight':'700',fill:'#6E2933'},'M')
        );
      }else{
        const D=lineIntersect(P,I,Q,R)||G;
        svg.append(
          svgEl('line',{x1:P[0],y1:P[1],x2:I[0],y2:I[1],stroke:'#6E2933','stroke-width':'2'}),
          svgEl('circle',{cx:I[0],cy:I[1],r:3.5,fill:'#166353'}),
          svgEl('circle',{cx:D[0],cy:D[1],r:3.5,fill:'#6E2933'}),
          svgEl('text',{x:I[0]+5,y:I[1]+10,'font-size':'10','font-weight':'700',fill:'#166353'},'I'),
          svgEl('text',{x:D[0]+4,y:D[1]+12,'font-size':'10','font-weight':'700',fill:'#6E2933'},'D')
        );
      }
      svg.append(
        svgEl('circle',{cx:arc.O[0],cy:arc.O[1],r:2.8,fill:'#181B20'}),
        svgEl('circle',{cx:P[0],cy:P[1],r:5,fill:'#6E2933',stroke:'#fff','stroke-width':'1.5'}),
        svgEl('text',{x:arc.O[0]+5,y:arc.O[1]+4,'font-size':'10',fill:'#525B62'},'O'),
        svgEl('text',{x:P[0]-4,y:P[1]-8,'font-size':'11','font-weight':'700',fill:'#6E2933'},'P'),
        svgEl('text',{x:Q[0]-13,y:Q[1]+4,'font-size':'11','font-weight':'700'},'Q'),
        svgEl('text',{x:R[0]+5,y:R[1]+4,'font-size':'11','font-weight':'700'},'R'),
        svgEl('text',{x:qx[0]+2,y:qx[1]+3,'font-size':'10',fill:'#8A6728'},'X')
      );
      metrics.innerHTML=`
        <div class="g10ch4-metric"><span>Vertical angle ∠QPR</span><strong>${fmt(angP,1)}° (locked!)</strong></div>
        <div class="g10ch4-metric"><span>Tangent angle ∠RQX</span><strong>40.0°</strong></div>`;
      note.textContent=copy.notes[mode];
    }
    paint();
  }

  /* 10. Pythagoras Theorem (Area Proof + Converse Tester) */
  function labPythagoras(host,ta){
    const copy=ta?{
      title:'பரப்பளவு நிரூபணம்: c² மற்றும் a² + b²; மறுதலைச் சோதனை',
      tabs:['அமைப்பு A: c² சதுரம்','அமைப்பு B: a² + b²','மறுதலைச் சோதனை'],
      sliderA:'பக்கம் a',sliderC:'பக்கம் c (a=3, b=4 உடன்)',
      notes:[
        '(a + b)² சதுரத்தில் 4 செங்கோண முக்கோணங்களை மூலைகளில் வைக்க நடுவில் c² பரப்பளவுள்ள சதுரம் மிஞ்சுகிறது.',
        'அதே 4 முக்கோணங்களை இணைத்து இரு செவ்வகங்களாக்கினால், மிஞ்சும் பரப்பளவு a² + b² என இரு சதுரங்களாகத் தெரிகிறது ⇒ c² = a² + b²!',
        'பக்கம் c-ஐ மாற்றி c² vs a² + b² ஒப்பிடுங்கள்: சமமெனில் மட்டுமே ∠C = 90°!'
      ]
    }:{
      title:'Visual Area Proof (c² vs a² + b²) & Converse Angle Tester',
      tabs:['Layout A: c²','Layout B: a² + b²','Converse Check'],
      sliderA:'Leg a (with a + b = 7)',sliderC:'Third side c (with legs a = 3, b = 4)',
      notes:[
        'Four identical (a, b, c) triangles leave a single tilted square of area c² inside the (a + b)² frame.',
        'Sliding the exact same four triangles into two rectangles leaves two squares of areas a² and b² — so c² = a² + b²!',
        'Vary side c against legs a = 3 and b = 4: ∠C = 90° happens ONLY when c² = 3² + 4² = 25 (c = 5).'
      ]
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,a=3,cTest=5;
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const svg=svgEl('svg',{viewBox:'0 0 320 184',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const sliderA=makeSlider(copy.sliderA,1.5,5.0,0.5,a,v=>{a=v;paint();});
    const sliderC=makeSlider(copy.sliderC,3.0,6.5,0.5,cTest,v=>{cTest=v;paint();});
    const note=el('p','g10ch4-status');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,svg,metrics,sliderA.row,sliderC.row,note);

    function paint(){
      svg.replaceChildren();
      sliderA.row.hidden=mode===2;
      sliderC.row.hidden=mode!==2;
      if(mode<2){
        const b=7-a,S=140,x0=90,y0=20,sc=S/7;
        const ap=a*sc,bp=b*sc;
        svg.append(svgEl('rect',{x:x0,y:y0,width:S,height:S,fill:'#FAF9F6',stroke:'#181B20','stroke-width':'2'}));
        if(mode===0){
          const p1=[x0+ap,y0],p2=[x0+S,y0+ap],p3=[x0+bp,y0+S],p4=[x0,y0+bp];
          const tris=[
            `${x0},${y0} ${p1} ${p4}`,
            `${p1} ${x0+S},${y0} ${p2}`,
            `${p2} ${x0+S},${y0+S} ${p3}`,
            `${p4} ${p3} ${x0},${y0+S}`
          ];
          svg.append(svgEl('polygon',{points:`${p1} ${p2} ${p3} ${p4}`,fill:'rgba(110,41,51,0.14)',stroke:'#6E2933','stroke-width':'2'}));
          tris.forEach(pts=>svg.append(svgEl('polygon',{points:pts,fill:'rgba(22,99,83,0.18)',stroke:'#166353','stroke-width':'1.4'})));
          svg.append(svgEl('text',{x:x0+S/2-18,y:y0+S/2+4,'font-size':'13','font-weight':'700',fill:'#6E2933'},`c² = ${fmt(a*a+b*b,1)}`));
        }else{
          svg.append(
            svgEl('rect',{x:x0,y:y0,width:ap,height:ap,fill:'rgba(110,41,51,0.14)',stroke:'#6E2933','stroke-width':'2'}),
            svgEl('rect',{x:x0+ap,y:y0+ap,width:bp,height:bp,fill:'rgba(183,146,83,0.18)',stroke:'#8A6728','stroke-width':'2'}),
            svgEl('polygon',{points:`${x0+ap},${y0} ${x0+S},${y0} ${x0+S},${y0+ap}`,fill:'rgba(22,99,83,0.18)',stroke:'#166353','stroke-width':'1.4'}),
            svgEl('polygon',{points:`${x0+ap},${y0} ${x0+ap},${y0+ap} ${x0+S},${y0+ap}`,fill:'rgba(22,99,83,0.18)',stroke:'#166353','stroke-width':'1.4'}),
            svgEl('polygon',{points:`${x0},${y0+ap} ${x0+ap},${y0+ap} ${x0+ap},${y0+S}`,fill:'rgba(22,99,83,0.18)',stroke:'#166353','stroke-width':'1.4'}),
            svgEl('polygon',{points:`${x0},${y0+ap} ${x0},${y0+S} ${x0+ap},${y0+S}`,fill:'rgba(22,99,83,0.18)',stroke:'#166353','stroke-width':'1.4'}),
            svgEl('text',{x:x0+ap/2-12,y:y0+ap/2+4,'font-size':'11','font-weight':'700',fill:'#6E2933'},`a²=${fmt(a*a,1)}`),
            svgEl('text',{x:x0+ap+bp/2-14,y:y0+ap+bp/2+4,'font-size':'11','font-weight':'700',fill:'#8A6728'},`b²=${fmt(b*b,1)}`)
          );
        }
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>a² + b²</span><strong>${fmt(a*a,2)} + ${fmt(b*b,2)} = ${fmt(a*a+b*b,2)}</strong></div>
          <div class="g10ch4-metric"><span>c² (remaining area)</span><strong>${fmt(a*a+b*b,2)}</strong></div>`;
        note.className='g10ch4-status is-match';
        note.textContent=copy.notes[mode];
      }else{
        const chk=mathAPI.pythagorasCheck(3,4,cTest);
        const radC=chk.degC*Math.PI/180,sc=26;
        const C=[130,146],B=[C[0]+4*sc,146],A=[C[0]+3*sc*Math.cos(radC),146-3*sc*Math.sin(radC)];
        const col=chk.kind==='right'?'#166353':'#6E2933';
        svg.append(
          svgEl('polygon',{points:`${A} ${B} ${C}`,fill:chk.kind==='right'?'rgba(22,99,83,0.12)':'rgba(110,41,51,0.08)',stroke:col,'stroke-width':'2.2'}),
          svgEl('text',{x:C[0]-8,y:C[1]+14,'font-size':'11','font-weight':'700',fill:col},`C (${fmt(chk.degC,1)}°)`),
          svgEl('text',{x:B[0]+4,y:B[1]+14,'font-size':'11','font-weight':'700'},'B'),
          svgEl('text',{x:A[0]-4,y:A[1]-8,'font-size':'11','font-weight':'700'},'A'),
          svgEl('text',{x:176,y:160,'font-size':'10'},'b = 4'),
          svgEl('text',{x:(A[0]+B[0])/2+8,y:(A[1]+B[1])/2,'font-size':'10','font-weight':'700',fill:col},`c = ${fmt(cTest,1)}`)
        );
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>a² + b²</span><strong>9 + 16 = 25</strong></div>
          <div class="g10ch4-metric"><span>c²</span><strong>${fmt(chk.cSq,2)} (${chk.kind})</strong></div>`;
        note.className='g10ch4-status '+(chk.kind==='right'?'is-match':'is-warn');
        note.textContent=copy.notes[2];
      }
    }
    paint();
  }

  /* 11. Circles, Tangents & Alternate Segment Theorem */
  function labCirclesTangents(host,ta){
    const copy=ta?{
      title:'வெளித் தொடுகோடுகள் (PA = PB) மற்றும் ஒன்றுவிட்ட துண்டுத் தேற்றம்',
      tabs:['PA = PB & OA ⟂ PA','ஒன்றுவிட்ட துண்டுத் தேற்றம்'],
      sliderD:'மையத்திலிருந்து P-யின் தொலைவு',
      sliderQ:'நாண் புள்ளி Q-வை நகர்த்தவும்',
      noteExt:(len,d,r)=>d<r?'P வட்டத்திற்கு உள்ளே உள்ளது — 0 தொடுகோடுகள்!':d===r?'P வட்டத்தின் மேல் உள்ளது — 1 தொடுகோடு.':'OA ⟂ PA (90°) மற்றும் இரு தொடுகோடுகளும் சமம்: PA = PB ✓',
      noteAlt:'தொடுகோடு–நாண் கோணம் ∠QPB எப்போதும் எதிர் துண்டுக் கோணம் ∠PSQ-க்குச் சமம்!'
    }:{
      title:'Equal Tangents (PA = PB) & Alternate Segment Theorem (∠QPB = ∠PSQ)',
      tabs:['Tangents PA = PB','Alternate Segment'],
      sliderD:'Distance OP from centre O (r = 45)',
      sliderQ:'Move chord point Q around the circle',
      noteExt:(len,d,r)=>d<r?'P is INSIDE the circle — 0 tangents possible!':d===r?'P is ON the circle — exactly 1 tangent.':`OT ⟂ PT (90°) and both exterior tangents match: PA = PB = ${fmt(len,1)} ✓`,
      noteAlt:'The tangent-chord angle ∠QPB stays identical to the alternate-segment angle ∠PSQ!'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,d=108,qDeg=-38;
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const svg=svgEl('svg',{viewBox:'0 0 320 184',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const sliderD=makeSlider(copy.sliderD,30,135,1,d,v=>{d=v;paint();});
    const sliderQ=makeSlider(copy.sliderQ,-70,15,1,qDeg,v=>{qDeg=v;paint();});
    const note=el('p','g10ch4-status is-match');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,svg,metrics,sliderD.row,sliderQ.row,note);

    function paint(){
      svg.replaceChildren();
      sliderD.row.hidden=mode!==0;
      sliderQ.row.hidden=mode!==1;
      if(mode===0){
        const O=[102,92],r=48,P=[O[0]+d,92];
        const info=mathAPI.tangentLengths(r,d);
        svg.append(
          svgEl('circle',{cx:O[0],cy:O[1],r,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
          svgEl('line',{x1:O[0],y1:O[1],x2:P[0],y2:P[1],stroke:'#8A6728','stroke-width':'1.4','stroke-dasharray':'3 3'}),
          svgEl('circle',{cx:O[0],cy:O[1],r:3,fill:'#181B20'}),
          svgEl('text',{x:O[0]-12,y:O[1]+4,'font-size':'11','font-weight':'700'},'O')
        );
        if(info.count===2){
          const cosA=r/d,sinA=Math.sqrt(1-cosA*cosA);
          const A=[O[0]+r*cosA,O[1]-r*sinA],B=[O[0]+r*cosA,O[1]+r*sinA];
          svg.append(
            svgEl('line',{x1:O[0],y1:O[1],x2:A[0],y2:A[1],stroke:'#166353','stroke-width':'1.6'}),
            svgEl('line',{x1:O[0],y1:O[1],x2:B[0],y2:B[1],stroke:'#166353','stroke-width':'1.6'}),
            svgEl('line',{x1:A[0],y1:A[1],x2:P[0],y2:P[1],stroke:'#6E2933','stroke-width':'2.2'}),
            svgEl('line',{x1:B[0],y1:B[1],x2:P[0],y2:P[1],stroke:'#6E2933','stroke-width':'2.2'}),
            svgEl('circle',{cx:A[0],cy:A[1],r:3.5,fill:'#166353'}),
            svgEl('circle',{cx:B[0],cy:B[1],r:3.5,fill:'#166353'}),
            svgEl('text',{x:A[0]-2,y:A[1]-8,'font-size':'10.5','font-weight':'700',fill:'#166353'},'A (90°)'),
            svgEl('text',{x:B[0]-2,y:B[1]+14,'font-size':'10.5','font-weight':'700',fill:'#166353'},'B (90°)')
          );
          metrics.innerHTML=`
            <div class="g10ch4-metric"><span>Tangents from P</span><strong>2 (PA = PB = ${fmt(info.len,1)})</strong></div>
            <div class="g10ch4-metric"><span>Radius ⟂ Tangent</span><strong>∠OAP = ∠OBP = 90°</strong></div>`;
          note.className='g10ch4-status is-match';
        }else{
          metrics.innerHTML=`
            <div class="g10ch4-metric"><span>Tangents from P</span><strong>${info.count}</strong></div>
            <div class="g10ch4-metric"><span>Position</span><strong>${info.count===0?'Inside circle':'On circle'}</strong></div>`;
          note.className='g10ch4-status '+(info.count===0?'is-warn':'is-match');
        }
        svg.append(
          svgEl('circle',{cx:P[0],cy:P[1],r:4.5,fill:'#6E2933'}),
          svgEl('text',{x:P[0]+7,y:P[1]+4,'font-size':'11','font-weight':'700',fill:'#6E2933'},'P')
        );
        note.textContent=copy.noteExt(info.len,d,r);
      }else{
        const O=[160,84],r=64,P=[160,O[1]+r],A=[42,P[1]],B=[278,P[1]];
        const rad=qDeg*Math.PI/180;
        const Q=[O[0]+r*Math.cos(rad),O[1]+r*Math.sin(rad)];
        const S=[O[0]+r*Math.cos(-145*Math.PI/180),O[1]+r*Math.sin(-145*Math.PI/180)];
        const angTan=angleDeg(P,Q,B),angAlt=angleDeg(S,P,Q);
        svg.append(
          svgEl('circle',{cx:O[0],cy:O[1],r,fill:'rgba(24,27,32,0.03)',stroke:'#181B20','stroke-width':'2'}),
          svgEl('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:'#181B20','stroke-width':'2'}),
          svgEl('polygon',{points:`${P} ${Q} ${S}`,fill:'rgba(22,99,83,0.10)',stroke:'#166353','stroke-width':'1.8'}),
          svgEl('line',{x1:P[0],y1:P[1],x2:Q[0],y2:Q[1],stroke:'#6E2933','stroke-width':'2.2'}),
          svgEl('circle',{cx:P[0],cy:P[1],r:3.8,fill:'#6E2933'}),
          svgEl('circle',{cx:Q[0],cy:Q[1],r:4.5,fill:'#6E2933'}),
          svgEl('circle',{cx:S[0],cy:S[1],r:3.8,fill:'#166353'}),
          svgEl('text',{x:A[0]-12,y:A[1]+4,'font-size':'10.5','font-weight':'700'},'A'),
          svgEl('text',{x:B[0]+5,y:B[1]+4,'font-size':'10.5','font-weight':'700'},'B'),
          svgEl('text',{x:P[0]-4,y:P[1]+14,'font-size':'11','font-weight':'700',fill:'#6E2933'},'P'),
          svgEl('text',{x:Q[0]+6,y:Q[1]+2,'font-size':'11','font-weight':'700',fill:'#6E2933'},'Q'),
          svgEl('text',{x:S[0]-14,y:S[1]-4,'font-size':'11','font-weight':'700',fill:'#166353'},'S')
        );
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>Tangent–chord ∠QPB</span><strong>${fmt(angTan,1)}°</strong></div>
          <div class="g10ch4-metric"><span>Alternate segment ∠PSQ</span><strong>${fmt(angAlt,1)}°</strong></div>`;
        note.className='g10ch4-status is-match';
        note.textContent=copy.noteAlt;
      }
    }
    paint();
  }

  /* 12. Concurrency Theorems: Ceva & Menelaus */
  function labConcurrency(host,ta){
    const copy=ta?{
      title:'சீவாஸ் (ஒருங்கிசைவு = 1) மற்றும் மெனிலாஸ் (நேர்க்கோட்டமைவு = −1)',
      tabs:['சீவாஸ் தேற்றம்','மெனிலாஸ் தேற்றம்'],
      sliderF:'AF / FB விகிதம்',
      medians:'நடுக்கோடுகள் (1 × 1 × 1 = 1)',
      concurrent:'பெருக்கல் = 1.00 ⇒ மூன்று சீவியன்களும் ஒரே புள்ளியில் சந்திக்கின்றன ✓',
      notConcurrent:(p)=>`பெருக்கல் = ${fmt(p,2)} ≠ 1 ⇒ நடுவில் ஒரு முக்கோண இடைவெளி தோன்றுகிறது (ஒருங்கிசையவில்லை ✗)`,
      menelausNote:'R (AB மீது), Q (AC மீது), மற்றும் P (நீட்டப்பட்ட BC மீது) ஒரே கோட்டில் உள்ளதால் திசை விகிதப் பெருக்கல் = −1!'
    }:{
      title:"Ceva's Concurrency Product (= 1) & Menelaus's Collinearity (= −1)",
      tabs:["Ceva's Theorem","Menelaus's Theorem"],
      sliderF:'Adjust ratio AF / FB (with BD/DC = 2/3, CE/EA = 3/4)',
      medians:'Medians preset (1 × 1 × 1 = 1)',
      concurrent:'Product = 1.00! The three cevians collapse onto ONE concurrency point ✓',
      notConcurrent:(p)=>`Product = ${fmt(p,2)} ≠ 1 — notice the three cevians miss each other, forming a gap triangle ✗`,
      menelausNote:'Because P lies on extended BC while Q and R lie on AC and AB, directed ratio (BP/PC)(CQ/QA)(AR/RB) = −1!'
    };
    host.append(el('h5','g10ch4-lab-title',copy.title));
    let mode=0,rD=2/3,rE=3/4,rF=2.0;
    const tabs=makeTabs(copy.tabs,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const svg=svgEl('svg',{viewBox:'0 0 320 184',class:'g10ch4-svg',role:'img','aria-label':copy.title});
    const metrics=el('div','g10ch4-metrics');
    const sliderF=makeSlider(copy.sliderF,0.4,3.0,0.05,rF,v=>{rD=2/3;rE=3/4;rF=v;paint();});
    const medBtn=el('button','g10ch4-chip-btn',copy.medians);medBtn.type='button';
    medBtn.onclick=()=>{rD=1;rE=1;rF=1;sliderF.input.value='1';sliderF.out.textContent='1';paint();};
    const note=el('p','g10ch4-status');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,svg,metrics,sliderF.row,medBtn,note);

    function paint(){
      svg.replaceChildren();
      sliderF.row.hidden=mode!==0;
      medBtn.hidden=mode!==0;
      if(mode===0){
        const A=[160,22],B=[42,158],C=[278,158];
        const st=mathAPI.cevaPoints(A,B,C,rD,rE,rF);
        const col=st.concurrent?'#166353':'#6E2933';
        svg.append(
          svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
          svgEl('line',{x1:A[0],y1:A[1],x2:st.D[0],y2:st.D[1],stroke:col,'stroke-width':'1.8'}),
          svgEl('line',{x1:B[0],y1:B[1],x2:st.E[0],y2:st.E[1],stroke:col,'stroke-width':'1.8'}),
          svgEl('line',{x1:C[0],y1:C[1],x2:st.F[0],y2:st.F[1],stroke:col,'stroke-width':'1.8'}),
          svgEl('text',{x:A[0]-4,y:A[1]-6,'font-size':'11','font-weight':'700'},'A'),
          svgEl('text',{x:B[0]-12,y:B[1]+13,'font-size':'11','font-weight':'700'},'B'),
          svgEl('text',{x:C[0]+4,y:C[1]+13,'font-size':'11','font-weight':'700'},'C'),
          svgEl('text',{x:st.D[0]-4,y:st.D[1]+14,'font-size':'10','font-weight':'700',fill:col},'D'),
          svgEl('text',{x:st.E[0]+6,y:st.E[1]+2,'font-size':'10','font-weight':'700',fill:col},'E'),
          svgEl('text',{x:st.F[0]-14,y:st.F[1]-2,'font-size':'10','font-weight':'700',fill:col},'F')
        );
        if(st.concurrent&&st.p1){
          svg.append(svgEl('circle',{cx:st.p1[0],cy:st.p1[1],r:5,fill:'#166353',stroke:'#fff','stroke-width':'1.5'}));
        }else if(st.p1&&st.p2&&st.p3){
          svg.append(svgEl('polygon',{points:`${st.p1} ${st.p2} ${st.p3}`,fill:'rgba(110,41,51,0.35)',stroke:'#6E2933','stroke-width':'1.5'}));
        }
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>(BD/DC)·(CE/EA)·(AF/FB)</span><strong>${fmt(rD,2)} × ${fmt(rE,2)} × ${fmt(rF,2)} = ${fmt(st.prod,2)}</strong></div>`;
        note.className='g10ch4-status '+(st.concurrent?'is-match':'is-warn');
        note.textContent=st.concurrent?copy.concurrent:copy.notConcurrent(st.prod);
      }else{
        const A=[154,48],B=[88,150],C=[256,150];
        const R=lerp(A,B,0.45),Q=lerp(A,C,0.80);
        const P=lineIntersect(R,Q,B,C)||[40,150];
        svg.append(
          svgEl('line',{x1:26,y1:150,x2:P[0]+12,y2:150,stroke:'#D7D4CC','stroke-width':'1.5','stroke-dasharray':'4 3'}),
          svgEl('polygon',{points:`${A} ${B} ${C}`,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'2'}),
          svgEl('line',{x1:P[0],y1:P[1],x2:R[0],y2:R[1],stroke:'#6E2933','stroke-width':'2.2'}),
          svgEl('circle',{cx:P[0],cy:P[1],r:4,fill:'#6E2933'}),
          svgEl('circle',{cx:Q[0],cy:Q[1],r:4,fill:'#6E2933'}),
          svgEl('circle',{cx:R[0],cy:R[1],r:4,fill:'#6E2933'}),
          svgEl('text',{x:A[0]-4,y:A[1]-7,'font-size':'11','font-weight':'700'},'A'),
          svgEl('text',{x:B[0]-4,y:B[1]+14,'font-size':'11','font-weight':'700'},'B'),
          svgEl('text',{x:C[0]+3,y:C[1]+14,'font-size':'11','font-weight':'700'},'C'),
          svgEl('text',{x:P[0]-4,y:P[1]+14,'font-size':'11','font-weight':'700',fill:'#6E2933'},'P'),
          svgEl('text',{x:Q[0]+6,y:Q[1]-4,'font-size':'11','font-weight':'700',fill:'#6E2933'},'Q'),
          svgEl('text',{x:R[0]-14,y:R[1]-3,'font-size':'11','font-weight':'700',fill:'#6E2933'},'R')
        );
        metrics.innerHTML=`
          <div class="g10ch4-metric"><span>Directed product</span><strong>(BP/PC)(CQ/QA)(AR/RB) = −1</strong></div>`;
        note.className='g10ch4-status is-match';
        note.textContent=copy.menelausNote;
      }
    }
    paint();
  }

  /* Compact First-Glance Static Preview Diagrams (Section 1 of each concept) */
  function renderGlance(stage,host,lang){
    const id=stage.glanceVisual||stage.visual?.id;
    const label=(lang==='ta'?stage.firstGlance?.ta:stage.firstGlance?.en)||'Geometry overview diagram';
    if(['similarity-scale','similarity-criteria','similarity-results'].includes(id)){
      window.TriggleG10DiagramGuard.preview(host,label,id,lang);
      return;
    }
    const viewBox=id==='bpt-thales'?'0 -7 300 111':
      ['angle-bisector','converse-abt'].includes(id)?'0 -20 300 144':'0 0 300 104';
    const svg=svgEl('svg',{viewBox,class:'g10ch4-glance-svg',role:'img','aria-label':label});
    if(id==='similar-construction'){
      svg.append(
        svgEl('polygon',{points:'96,18 42,72 198,72',fill:'rgba(24,27,32,0.05)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:42,y1:72,x2:232,y2:98,stroke:'#8A6728','stroke-width':'1.5'}),
        svgEl('line',{x1:146,y1:86,x2:146,y2:72,stroke:'#6E2933','stroke-width':'1.8'}),
        svgEl('line',{x1:146,y1:72,x2:78,y2:36,stroke:'#6E2933','stroke-width':'1.8'})
      );
    }else if(id==='bpt-thales'){
      svg.append(
        svgEl('polygon',{points:'150,12 64,92 236,92',fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:107,y1:52,x2:193,y2:52,stroke:'#166353','stroke-width':'2.2'}),
        svgEl('text',{x:144,y:10,'font-size':'10','font-weight':'700'},'A'),
        svgEl('text',{x:92,y:54,'font-size':'10','font-weight':'700',fill:'#166353'},'D'),
        svgEl('text',{x:198,y:54,'font-size':'10','font-weight':'700',fill:'#166353'},'E'),
        svgEl('text',{x:122,y:82,'font-size':'10','font-weight':'700',fill:'#166353'},'DE ∥ BC')
      );
    }else if(id==='converse-bpt'){
      svg.append(
        svgEl('polygon',{points:'150,12 64,92 236,92',fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:107,y1:52,x2:193,y2:52,stroke:'#166353','stroke-width':'2'})
      );
    }else if(id==='angle-bisector'||id==='converse-abt'){
      const A=[124,14],B=[58,90],C=[242,90];
      const {D}=mathAPI.angleBisectorPoint(A,B,C);
      svg.append(
        svgEl('polygon',{points:[A,B,C].map(p=>p.join(',')).join(' '),fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:A[0],y1:A[1],x2:D[0],y2:D[1],stroke:'#6E2933','stroke-width':'2'}),
        svgEl('text',{x:A[0],y:0,'text-anchor':'middle','font-size':'10','font-weight':'700'},'A'),
        svgEl('text',{x:48,y:110,'font-size':'10','font-weight':'700'},'B'),
        svgEl('text',{x:244,y:110,'font-size':'10','font-weight':'700'},'C'),
        svgEl('text',{x:D[0],y:110,'text-anchor':'middle','font-size':'10','font-weight':'700',fill:'#6E2933'},'D')
      );
    }else if(id==='triangle-construction'){
      svg.append(
        svgEl('circle',{cx:150,cy:56,r:38,fill:'none',stroke:'#D7D4CC','stroke-width':'1.6'}),
        svgEl('polygon',{points:'132,22 116,74 184,74',fill:'rgba(22,99,83,0.10)',stroke:'#166353','stroke-width':'1.8'}),
        svgEl('text',{x:196,y:56,'font-size':'10','font-weight':'700',fill:'#166353'},'∠P fixed on arc')
      );
    }else if(id==='pythagoras'){
      svg.append(
        svgEl('polygon',{points:'96,26 96,82 170,82',fill:'rgba(22,99,83,0.14)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('rect',{x:62,y:26,width:34,height:56,fill:'rgba(110,41,51,0.12)',stroke:'#6E2933','stroke-width':'1.4'}),
        svgEl('text',{x:184,y:58,'font-size':'12','font-weight':'700',fill:'#6E2933'},'a² + b² = c²')
      );
    }else if(id==='circles-tangents'){
      svg.append(
        svgEl('circle',{cx:100,cy:50,r:32,fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:40,y1:82,x2:200,y2:82,stroke:'#6E2933','stroke-width':'2'}),
        svgEl('line',{x1:100,y1:50,x2:100,y2:82,stroke:'#166353','stroke-width':'1.8'}),
        svgEl('text',{x:150,y:48,'font-size':'10.5','font-weight':'700',fill:'#166353'},'OT ⟂ PT · ∠QPB = ∠PSQ')
      );
    }else{
      svg.append(
        svgEl('polygon',{points:'150,12 72,90 228,90',fill:'rgba(24,27,32,0.04)',stroke:'#181B20','stroke-width':'1.8'}),
        svgEl('line',{x1:150,y1:12,x2:150,y2:90,stroke:'#166353','stroke-width':'1.6'}),
        svgEl('line',{x1:72,y1:90,x2:189,y2:51,stroke:'#166353','stroke-width':'1.6'}),
        svgEl('line',{x1:228,y1:90,x2:111,y2:51,stroke:'#166353','stroke-width':'1.6'}),
        svgEl('circle',{cx:150,cy:64,r:3.8,fill:'#6E2933'})
      );
    }
    host.append(svg);
    if(id==='angle-bisector'||id==='converse-abt'){
      const caption=el('span','diagramguard-annotation');
      tex(caption,'\\dfrac{AB}{AC}=\\dfrac{BD}{DC}','AB/AC = BD/DC',false);
      host.append(caption);
    }
    if(id==='converse-bpt'){
      const caption=el('span','diagramguard-annotation');
      tex(caption,'\\begin{aligned}\\dfrac{AD}{DB}&=\\dfrac{AE}{EC}\\\\ &\\implies DE\\parallel BC\\end{aligned}',
        'AD/DB = AE/EC ⇒ DE ∥ BC',true);
      host.append(caption);
    }
  }

  const REGISTRY={
    'similarity-scale':labSimilarityScale,
    'similarity-criteria':labSimilarityCriteria,
    'similarity-results':labSimilarityResults,
    'similar-construction':labSimilarConstruction,
    'bpt-thales':labBptThales,
    'converse-bpt':labConverseBpt,
    'angle-bisector':labAngleBisector,
    'converse-abt':labConverseAbt,
    'triangle-construction':labTriangleConstruction,
    'pythagoras':labPythagoras,
    'circles-tangents':labCirclesTangents,
    'concurrency':labConcurrency
  };

  function mount(stage,host,lang){
    const id=stage?.visual?.id;
    const fn=REGISTRY[id];
    if(!fn||!host)return false;
    host.className='g10ch4-lab';
    host.replaceChildren();
    fn(host,lang==='ta');
    return true;
  }

  window.TriggleG10Ch4Labs=Object.freeze({
    mount,
    renderGlance,
    math:mathAPI,
    ids:Object.freeze(Object.keys(REGISTRY))
  });
})();
