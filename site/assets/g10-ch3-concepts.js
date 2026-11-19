/* VER Triggle | Grade 10 Chapter 3 Algebra — Purposeful Interactive Concept Labs.
 * Self-contained, offline, bilingual (EN + TA draft), zero external assets or tracking.
 * Every interaction reveals the defining mathematical mechanism without generic sliders. */
(()=>{'use strict';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n;};
  function tex(node,latex,fallback,displayMode=true){
    if(!node)return;
    node.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
      ?window.TriggleNotation.renderLatex(latex,{displayMode,fallback})
      :e(fallback);
    window.TriggleNotation?.prepare?.(node);
  }
  function makeTabs(items,activeIdx,onSelect,ariaLabel){
    const bar=el('div','g10ch3-tabs');bar.setAttribute('role','group');bar.setAttribute('aria-label',ariaLabel);
    const buttons=items.map((label,i)=>{
      const b=el('button','g10ch3-tab',label);b.type='button';
      b.setAttribute('aria-pressed',String(i===activeIdx));
      b.addEventListener('click',()=>onSelect(i));
      bar.append(b);return b;
    });
    const sync=idx=>buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===idx)));
    return {bar,sync};
  }

  /* Pure mathematical helpers exported for independent unit verification. */
  const mathAPI={
    solve3VarDemo(x,y,z){return [x+y+z,2*x-y+z,x-2*y+3*z];},
    evalRationalDemo(x){
      const num=x*x-9,den=x*x+5*x+6,redNum=x-3,redDen=x+2;
      return {num,den,redNum,redDen,reducedValue:redDen===0?null:redNum/redDen,originalDefined:den!==0};
    },
    polySqrtDivSteps(){
      // Verify (3x^2 - 2x + 1)^2 = 9x^4 - 12x^3 + 10x^2 - 4x + 1
      const c=[3,-2,1],sq=[0,0,0,0,0];
      for(let i=0;i<3;i++)for(let j=0;j<3;j++)sq[i+j]+=c[i]*c[j];
      return sq; // [9, -12, 10, -4, 1]
    },
    quadFromRoots(a,b){return {sum:a+b,product:a*b,evalAt:(x)=>x*x-(a+b)*x+a*b};},
    discriminantC(c){return 16-4*c;},
    rootsCoeff5x6(){
      const s=5,p=6,a=3,b=2;
      return {
        sumSq:{byId:s*s-2*p,byRoots:a*a+b*b},
        diffSq:{byId:s*s-4*p,byRoots:(a-b)*(a-b)},
        recipSum:{byId:s/p,byRoots:1/a+1/b},
        sumCube:{byId:s*s*s-3*p*s,byRoots:a*a*a+b*b*b}
      };
    },
    variationPoint(mode,x){return mode==='direct'?{x,y:2*x,invariant:2}:{x,y:12/x,invariant:12};},
    matMul2x2(A,B){
      return [
        [A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
        [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]
      ];
    }
  };

  /* 1. Linear Equations in Three Variables */
  function renderLinear3Vars(host,ta){
    const copy=ta?{
      title:'ஒரே மாறியை இருமுறை நீக்கிப் பாருங்கள்',
      modes:['நீக்கல் படிநிலை','மூன்று முடிவுகள் (தளங்கள்)'],
      steps:[
        ['படி 1 · சமன்பாடுகள்','மூன்று சமன்பாடுகளிலும் y-ஐ எளிதாக நீக்கலாம். (1) மற்றும் (2)-ஐ முதல் இணையாக எடுப்போம்.'],
        ['படி 2 · (1) + (2) ⇒ y நீக்கம்','(x+y+z) + (2x−y+z) = 5+9 ⇒ 3x + 2z = 14 (சமன்பாடு 4). இப்போது 2 மாறிகள் மட்டுமே!'],
        ['படி 3 · −2×(2) + (3) ⇒ மீண்டும் y நீக்கம்','இரண்டாவது இணையில் இருந்தும் அதே y-ஐ நீக்க −4x+2y−2z = −18 மற்றும் x−2y+3z = 16 கூட்ட −3x + z = −2 (சமன்பாடு 5).'],
        ['படி 4 · தீர்வும் சரிபார்ப்பும்','(4)+(5) ⇒ 3z = 12 ⇒ z = 4. பின் x = 2, y = −1. சரிபார்த்தல்: 2+(−1)+4 = 5 ✓']
      ],
      prev:'← முந்தையது',next:'அடுத்த படி →',replay:'மீண்டும் ↻',
      outcomes:[
        {btn:'ஒரே தீர்வு',head:'ஒரே தீர்வு: வரிசை மூன்றடுக்கு (x, y, z)',desc:'மூன்று தளங்களும் ஒரே ஒரு பொதுப் புள்ளியில் சந்திக்கின்றன.',eq:'\\begin{aligned}3z&=12\\\\\\implies (x,y,z)&=(2,-1,4)\\end{aligned}'},
        {btn:'எண்ணற்ற தீர்வுகள் (0 = 0)',head:'எண்ணற்ற தீர்வுகள்: 0 = 0 (உண்மை)',desc:'நீக்கலின்போது 0 = 0 கிடைத்தால், தளங்கள் ஒரு பொதுக் கோட்டில் வெட்டுகின்றன அல்லது ஒன்றின் மீது ஒன்று அமைகின்றன.',eq:'\\begin{aligned}0&=0\\;(\\text{always true})\\\\&\\implies\\text{infinitely many solutions}\\end{aligned}'},
        {btn:'தீர்வு இல்லை (0 = k)',head:'தீர்வு இல்லை: 0 = 5 (முரண்பாடு)',desc:'நீக்கலின்போது 0 = 5 போன்ற சாத்தியமற்ற சமன்பாடு வந்தால், தளங்கள் அனைத்தும் ஒரே புள்ளியில் சந்திக்கவில்லை.',eq:'\\begin{aligned}0&=5\\;(\\text{impossible})\\\\&\\implies\\text{no solution}\\end{aligned}'}
      ]
    }:{
      title:'Eliminate the same variable twice & geometric outcomes',
      modes:['Elimination Flow','Three Outcomes'],
      steps:[
        ['Step 1 · Set up system','Notice y has simple coefficients (+1, −1, −2). We will eliminate y twice from two different pairs.'],
        ['Step 2 · Add (1) + (2) → y drops','Adding eliminates y: 3x + 2z = 14 (Eq. 4). Only x and z remain!'],
        ['Step 3 · Add −2×(2) + (3) → same y drops','Eliminating y again gives −3x + z = −2 (Eq. 5). Now Eq. (4) & (5) share the exact same 2 variables.'],
        ['Step 4 · Solve & verify','(4)+(5) gives 3z = 12 ⇒ z = 4. Back-substitute: x = 2, y = −1. Verify: 2 + (−1) + 4 = 5 ✓']
      ],
      prev:'← Previous',next:'Next step →',replay:'Replay ↻',
      outcomes:[
        {btn:'Unique (x, y, z)',head:'Unique solution: ordered triple (x, y, z)',desc:'Three independent planes intersect at exactly one point in space.',eq:'\\begin{aligned}3z&=12\\\\\\implies (x,y,z)&=(2,-1,4)\\end{aligned}'},
        {btn:'Infinitely many (0 = 0)',head:'Infinitely many solutions: identity 0 = 0',desc:'When elimination leaves 0 = 0, the equations share a whole line (or plane) of solutions.',eq:'\\begin{aligned}0&=0\\;(\\text{identity})\\\\&\\implies\\text{infinitely many solutions}\\end{aligned}'},
        {btn:'No solution (0 = k)',head:'No solution: contradiction 0 = 5',desc:'When elimination gives an impossible statement like 0 = 5, at least two planes are parallel or inconsistent.',eq:'\\begin{aligned}0&=5\\;(\\text{contradiction})\\\\&\\implies\\text{no solution}\\end{aligned}'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0,step=0,outcome=0;
    const body=el('div','g10ch3-stage');
    const modeTabs=makeTabs(copy.modes,0,i=>{mode=i;modeTabs.sync(i);paint();},copy.title);
    host.append(modeTabs.bar,body);
    const stepMath=[
      '\\begin{aligned}(1)\\;x+y+z&=5\\\\(2)\\;2x-y+z&=9\\\\(3)\\;x-2y+3z&=16\\end{aligned}',
      '\\begin{aligned}(1)\\;x+y+z&=5\\\\+(2)\\;2x-y+z&=9\\\\\\hline(4)\\;3x+2z&=14\\end{aligned}',
      '\\begin{aligned}-2\\times(2)\\;-4x+2y-2z&=-18\\\\+(3)\\;x-2y+3z&=16\\\\\\hline(5)\\;-3x+z&=-2\\end{aligned}',
      '\\begin{aligned}(4)+(5):\\;3z&=12\\implies z=4\\\\3x+2(4)=14\\implies x&=2,\\quad y=5-2-4=-1\\end{aligned}'
    ];
    const outcomeSvgs=[
      `<svg viewBox="0 0 280 128" class="g10ch3-svg" role="img" aria-label="Three planes intersecting at one point">
        <polygon points="35,95 140,72 245,95 140,118" fill="#EFEAE2" stroke="#181B20" stroke-width="1.5"/>
        <polygon points="75,20 155,32 155,108 75,92" fill="rgba(22,99,83,0.16)" stroke="#166353" stroke-width="1.6"/>
        <polygon points="205,22 125,34 125,108 205,94" fill="rgba(110,41,51,0.15)" stroke="#6E2933" stroke-width="1.6"/>
        <circle cx="140" cy="83" r="5.5" fill="#6E2933" stroke="#fff" stroke-width="1.5"/>
        <text x="150" y="79" font-size="11" font-weight="700" fill="#181B20">(2, −1, 4)</text>
      </svg>`,
      `<svg viewBox="0 0 280 128" class="g10ch3-svg" role="img" aria-label="Three planes meeting along a shared line">
        <polygon points="36,36 140,66 140,110 36,78" fill="rgba(44,75,139,0.14)" stroke="#2C4B8B" stroke-width="1.5"/>
        <polygon points="244,36 140,66 140,110 244,78" fill="rgba(22,99,83,0.15)" stroke="#166353" stroke-width="1.5"/>
        <polygon points="65,18 140,66 140,110 65,62" fill="rgba(183,146,83,0.18)" stroke="#8A6728" stroke-width="1.5"/>
        <line x1="140" y1="54" x2="140" y2="116" stroke="#6E2933" stroke-width="3"/>
        <text x="148" y="54" font-size="11" font-weight="700" fill="#6E2933">0 = 0</text>
      </svg>`,
      `<svg viewBox="0 0 280 128" class="g10ch3-svg" role="img" aria-label="Parallel planes never meeting at one point">
        <polygon points="50,36 220,24 245,42 75,54" fill="#F3F0E9" stroke="#181B20" stroke-width="1.5"/>
        <polygon points="50,64 220,52 245,70 75,82" fill="rgba(44,75,139,0.12)" stroke="#2C4B8B" stroke-width="1.5"/>
        <polygon points="50,92 220,80 245,98 75,110" fill="rgba(110,41,51,0.13)" stroke="#6E2933" stroke-width="1.5"/>
        <text x="195" y="118" font-size="11" font-weight="700" fill="#6E2933">0 = 5 (✗)</text>
      </svg>`
    ];
    function paint(){
      body.replaceChildren();
      if(mode===0){
        const badge=el('p','g10ch3-step-badge',copy.steps[step][0]);
        const mathBox=el('div','g10ch3-math-box');
        tex(mathBox,stepMath[step],copy.steps[step][1],true);
        const note=el('p','g10ch3-note',copy.steps[step][1]);note.setAttribute('aria-live','polite');
        const nav=el('div','g10ch3-step-nav');
        const prev=el('button','g10ch3-btn',copy.prev);prev.type='button';prev.disabled=step===0;
        const prog=el('span','g10ch3-progress',(step+1)+' / 4');
        const next=el('button','g10ch3-btn g10ch3-btn-primary',step===3?copy.replay:copy.next);next.type='button';
        prev.onclick=()=>{if(step>0){step--;paint();}};
        next.onclick=()=>{step=(step+1)%4;paint();};
        nav.append(prev,prog,next);
        body.append(badge,mathBox,note,nav);
      }else{
        const sub=makeTabs(copy.outcomes.map(o=>o.btn),outcome,i=>{outcome=i;paint();},copy.modes[1]);
        const card=el('div','g10ch3-svg-card');card.innerHTML=outcomeSvgs[outcome];
        const eq=el('div','g10ch3-math-box');tex(eq,copy.outcomes[outcome].eq,copy.outcomes[outcome].head,true);
        const desc=el('p','g10ch3-note',copy.outcomes[outcome].desc);desc.setAttribute('aria-live','polite');
        body.append(sub.bar,card,eq,desc);
      }
    }
    paint();
  }

  /* 2. Polynomial GCD */
  function renderPolyGcd(host,ta){
    const copy=ta?{
      title:'யூக்ளிட் பல்லுறுப்புக் கோவை வகுத்தல் படிகள்',
      steps:[
        'படி 1 · f(x) ÷ g(x)',
        'படி 2 · −5-ஐ நீக்கு',
        'படி 3 · g(x) ÷ r₁(x)'
      ],
      bodies:[
        {note:'படி 3 சமம்; தலையாயக் கெழு 2x³ ÷ x³ = 2. மீதி −5x² + 5x − 5 = −5(x² − x + 1).',eq:'\\begin{aligned}&2x^3-3x^2+3x-1\\\\&=(x^3+x^2-x+2)(2)\\\\&\\quad+\\underbrace{(-5)(x^2-x+1)}_{r_1(x)\\neq 0}\\end{aligned}',fb:'f(x) = g(x)(2) − 5(x² − x + 1)'},
        {note:'−5 என்பது x இல்லாத பூச்சியமற்ற மாறிலி. இரு அசல் கோவைகளிலும் பொது எண் காரணி இல்லாததால் −5-ஐ விட்டுவிட்டு x² − x + 1-ஐ வகுத்தியாக எடுக்கிறோம்.',eq:'\\begin{aligned}r_1(x)&=-5(x^2-x+1)\\\\\\text{Omit }-5&\\implies\\text{next divisor}\\\\&=x^2-x+1\\end{aligned}',fb:'Omit constant −5 → next divisor = x² − x + 1'},
        {note:'இப்போது g(x) = x³ + x² − x + 2-ஐ x² − x + 1-ஆல் வகுக்க ஈவு (x + 2), மீதி 0. எனவே மீ.பெ.வ = x² − x + 1.',eq:'\\begin{aligned}&x^3+x^2-x+2\\\\&=(x^2-x+1)(x+2)+0\\\\&\\implies\\gcd=x^2-x+1\\end{aligned}',fb:'g(x) = (x² − x + 1)(x + 2) + 0 ⇒ GCD = x² − x + 1'}
      ],
      constToggle:'இரு அசல் கோவைகளிலும் பொது எண் காரணி இருந்தால் என்ன செய்வது?'
      ,constNote:'எடுத்துக்காட்டாக 6(...) மற்றும் 9(...) எனில், முதலில் gcd(6, 9) = 3 என்பதைத் தனியே எடுத்து, இறுதிப் பல்லுறுப்புக் காரணியுடன் 3-ஐப் பெருக்க வேண்டும்.'
    }:{
      title:'Euclid division steps & dropping a non-zero constant factor',
      steps:['Step 1 · Divide f ÷ g','Step 2 · Drop constant −5','Step 3 · Divide g ÷ r₁'],
      bodies:[
        {note:'Both polynomials have degree 3; dividing 2x³ by x³ gives quotient 2 and remainder −5x² + 5x − 5 = −5(x² − x + 1).',eq:'\\begin{aligned}&2x^3-3x^2+3x-1\\\\&=(x^3+x^2-x+2)(2)\\\\&\\quad+\\underbrace{(-5)(x^2-x+1)}_{r_1(x)\\neq 0}\\end{aligned}',fb:'f(x) = g(x)(2) − 5(x² − x + 1)'},
        {note:'−5 is a non-zero constant without x, and it does not divide g(x) = x³ + x² − x + 2. Drop −5 and use x² − x + 1 as the next divisor.',eq:'\\begin{aligned}r_1(x)&=-5(x^2-x+1)\\\\\\text{Drop }-5&\\implies\\text{next divisor}\\\\&=x^2-x+1\\end{aligned}',fb:'Drop −5 → next divisor = x² − x + 1'},
        {note:'Divide g(x) by x² − x + 1: quotient is x + 2 and remainder is 0! The last divisor x² − x + 1 is the GCD.',eq:'\\begin{aligned}&x^3+x^2-x+2\\\\&=(x^2-x+1)(x+2)+0\\\\&\\implies\\gcd=x^2-x+1\\end{aligned}',fb:'GCD = x² − x + 1'}
      ],
      constToggle:'What if both starting polynomials share a numeric factor?',
      constNote:'Factor out numeric coefficients first! For instance, for 6(x³...) and 9(x³...), take gcd(6, 9) = 3 first and multiply 3 onto the final polynomial GCD.'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let active=0,showConst=false;
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    const extraBtn=el('button','g10ch3-chip-toggle',copy.constToggle);extraBtn.type='button';
    const extraNote=el('p','g10ch3-callout',copy.constNote);extraNote.hidden=true;
    extraBtn.onclick=()=>{showConst=!showConst;extraBtn.setAttribute('aria-pressed',String(showConst));extraNote.hidden=!showConst;};
    extraBtn.setAttribute('aria-pressed','false');
    const tabs=makeTabs(copy.steps,0,i=>{active=i;tabs.sync(i);paint();},copy.title);
    function paint(){
      tex(mathBox,copy.bodies[active].eq,copy.bodies[active].fb,true);
      note.textContent=copy.bodies[active].note;
    }
    host.append(tabs.bar,mathBox,note,extraBtn,extraNote);
    paint();
  }

  /* 3. LCM vs GCD & Product Law */
  function renderLcmGcd(host,ta){
    const copy=ta?{
      title:'காரணி அடுக்குகளை ஒப்பிடுங்கள்: மீ.பெ.வ vs மீ.சி.ம',
      modes:['மீ.பெ.வ (குறைந்த அடுக்கு)','மீ.சி.ம (உயர்ந்த அடுக்கு)','f(x)·g(x) = மீ.சி.ம·மீ.பெ.வ'],
      cols:['எண் 2','எண் 3','(x − 2)','(x + 3)'],
      fRow:['2²','3¹','(x−2)²','(x+3)¹'],
      gRow:['2¹','3²','(x−2)¹','(x+3)³'],
      out:[
        {vals:['2¹ = 2','3¹ = 3','(x−2)¹','(x+3)¹'],badge:'min',eq:'\\begin{aligned}\\gcd&=2^1\\cdot 3^1\\cdot(x-2)^1(x+3)^1\\\\&=6(x-2)(x+3)\\end{aligned}',fb:'GCD = 6(x − 2)(x + 3)',note:'மீ.பெ.வ: இரு கோவைகளிலும் பொதுவான சிறிய அடுக்குகளை மட்டுமே எடுக்கிறது.'},
        {vals:['2² = 4','3² = 9','(x−2)²','(x+3)³'],badge:'max',eq:'\\begin{aligned}\\operatorname{LCM}&=2^2\\cdot 3^2\\cdot(x-2)^2(x+3)^3\\\\&=36(x-2)^2(x+3)^3\\end{aligned}',fb:'LCM = 36(x − 2)²(x + 3)³',note:'மீ.சி.ம: ஒவ்வொரு காரணியின் உயர்ந்த அடுக்கையும் எடுத்துக்கொள்கிறது.'},
        {vals:['2³ = 8','3³ = 27','(x−2)³','(x+3)⁴'],badge:'sum',eq:'\\begin{aligned}f\\cdot g&=12(x-2)^2(x+3)\\\\&\\quad\\times 18(x-2)(x+3)^3\\\\&=216(x-2)^3(x+3)^4\\\\&=\\operatorname{LCM}\\cdot\\gcd\\end{aligned}',fb:'f·g = 216(x−2)³(x+3)⁴ = LCM·GCD',note:'ஒவ்வொரு நெடுவரிசையிலும் min(a,b) + max(a,b) = a + b. (கவனம்: இது 2 கோவைகளுக்கு மட்டுமே; 3 கோவைகளுக்கு அல்ல!)'}
      ]
    }:{
      title:'Compare factor powers: GCD vs LCM & Product Law',
      modes:['GCD (Lowest powers)','LCM (Highest powers)','Verify f · g = LCM · GCD'],
      cols:['Prime 2','Prime 3','Factor (x−2)','Factor (x+3)'],
      fRow:['2²','3¹','(x−2)²','(x+3)¹'],
      gRow:['2¹','3²','(x−2)¹','(x+3)³'],
      out:[
        {vals:['2¹ = 2','3¹ = 3','(x−2)¹','(x+3)¹'],badge:'min',eq:'\\begin{aligned}\\gcd&=2^1\\cdot 3^1\\cdot(x-2)^1(x+3)^1\\\\&=6(x-2)(x+3)\\end{aligned}',fb:'GCD = 6(x − 2)(x + 3)',note:'GCD picks the LOWER power of each factor shared by both polynomials.'},
        {vals:['2² = 4','3² = 9','(x−2)²','(x+3)³'],badge:'max',eq:'\\begin{aligned}\\operatorname{LCM}&=2^2\\cdot 3^2\\cdot(x-2)^2(x+3)^3\\\\&=36(x-2)^2(x+3)^3\\end{aligned}',fb:'LCM = 36(x − 2)²(x + 3)³',note:'LCM picks the HIGHER power of every factor present in either polynomial.'},
        {vals:['2³ = 8','3³ = 27','(x−2)³','(x+3)⁴'],badge:'sum',eq:'\\begin{aligned}f\\cdot g&=12(x-2)^2(x+3)\\\\&\\quad\\times 18(x-2)(x+3)^3\\\\&=216(x-2)^3(x+3)^4\\\\&=\\operatorname{LCM}\\cdot\\gcd\\end{aligned}',fb:'f · g = 216(x−2)³(x+3)⁴ = LCM · GCD',note:'In every column, min(a,b) + max(a,b) = a + b! Note: this product law holds for TWO polynomials only, not three.'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0;
    const tabs=makeTabs(copy.modes,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const grid=el('div','g10ch3-factor-grid');
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,grid,mathBox,note);
    function paint(){
      const cur=copy.out[mode];
      grid.innerHTML='';
      const header=el('div','g10ch3-fg-row is-head');
      [el('span','',''),...copy.cols.map(c=>el('span','',c))].forEach(c=>header.append(c));
      const rowF=el('div','g10ch3-fg-row');
      rowF.append(el('strong','','f(x)'));copy.fRow.forEach(v=>rowF.append(el('span','',v)));
      const rowG=el('div','g10ch3-fg-row');
      rowG.append(el('strong','','g(x)'));copy.gRow.forEach(v=>rowG.append(el('span','',v)));
      const rowR=el('div','g10ch3-fg-row is-result is-'+cur.badge);
      rowR.append(el('strong','',cur.badge==='min'?'GCD':cur.badge==='max'?'LCM':'f·g'));
      cur.vals.forEach(v=>rowR.append(el('span','',v)));
      grid.append(header,rowF,rowG,rowR);
      tex(mathBox,cur.eq,cur.fb,true);
      note.textContent=cur.note;
    }
    paint();
  }

  /* 4. Rational Expressions & Excluded Values */
  function renderRationalExcluded(host,ta){
    const copy=ta?{
      title:'x மதிப்புகளைச் சோதிக்கவும்: சுருக்கிய பின் விலக்கப்பட்ட மதிப்பு',
      probeLabel:'சோதனை மதிப்பைத் தேர்ந்தெடுக்கவும்',
      trapBtn:'(x² − 9) / (x² + 5x + 6)-இல் x²-ஐ ஏன் நேரடியாக நீக்கக் கூடாது?',
      trapNote:'x = 1 எனில் (1−9)/(1+5+6) = −8/12 = −2/3. ஆனால் x²-ஐத் தவறாக நீக்கினால் −9/(5+6) = −9/11 எனத் தவறான விடை வரும்! கூட்டல்/கழித்தல் உறுப்புகளை அல்ல, பெருக்கல் காரணிகளை மட்டுமே நீக்க வேண்டும்.',
      probes:[
        {x:1,lbl:'x = 1',eq:'\\dfrac{1-3}{1+2}=\\dfrac{-2}{3}',fb:'At x = 1: value is −2/3',msg:'சாதாரண மதிப்பு: பகுதி 3 ≠ 0 என்பதால் கோவை −2/3 என வரையறுக்கப்படுகிறது.'},
        {x:3,lbl:'x = 3',eq:'\\dfrac{3-3}{3+2}=\\dfrac{0}{5}=0',fb:'At x = 3: value is 0 (valid!)',msg:'x = 3 தொகுதியை மட்டுமே 0 ஆக்குகிறது! 0 ÷ 5 = 0 என்பது செல்லுபடியாகும்; விலக்கப்பட்ட மதிப்பு அல்ல.'},
        {x:-2,lbl:'x = −2',eq:'\\dfrac{-2-3}{-2+2}=\\dfrac{-5}{0}\\;(\\text{undefined})',fb:'At x = −2: −5/0 is undefined (excluded!)',msg:'விலக்கப்பட்ட மதிப்பு x = −2! எளிய வடிவில் பகுதி x + 2 = 0 ஆகிறது.'},
        {x:-3,lbl:'x = −3',eq:'\\begin{aligned}\\text{Original: }&\\dfrac{0}{0}\\\\\\text{Lowest form: }&\\dfrac{x-3}{x+2}\\end{aligned}',fb:'At x = −3: (x+3) cancelled before finding excluded value',msg:'அசல் கோவையில் x+3 பொதுக் காரணி; பாடநூல் விதிப்படி எளிய வடிவம் (x−3)/(x+2)-இல் பகுதி 0 ஆகும் x = −2 விலக்கப்பட்ட மதிப்பாகும்.'}
      ]
    }:{
      title:'Test x-values on R(x) = (x² − 9)/(x² + 5x + 6) = (x − 3)/(x + 2)',
      probeLabel:'Pick an x value to test',
      trapBtn:'Why can we NOT cancel x² straight across the fraction?',
      trapNote:'Test x = 1: true value is (1 − 9)/(1 + 5 + 6) = −8/12 = −2/3. Wrongly cancelling x² gives −9/(5x + 6) = −9/11 ≠ −2/3! Factor first; only shared multiplicative factors cancel.',
      probes:[
        {x:1,lbl:'x = 1',eq:'R(1)=\\dfrac{1-3}{1+2}=-\\dfrac{2}{3}',fb:'R(1) = −2/3 (defined)',msg:'Valid output: the denominator 3 ≠ 0, so the rational expression evaluates cleanly to −2/3.'},
        {x:3,lbl:'x = 3',eq:'R(3)=\\dfrac{3-3}{3+2}=\\dfrac{0}{5}=0',fb:'R(3) = 0/5 = 0 (NOT excluded!)',msg:'Zero in the NUMERATOR is totally allowed! 0 ÷ 5 = 0, so x = 3 is a zero, NOT an excluded value.'},
        {x:-2,lbl:'x = −2',eq:'\\dfrac{-2-3}{-2+2}=\\dfrac{-5}{0}\\quad(\\text{undefined!})',fb:'At x = −2: −5/0 is undefined (excluded value!)',msg:'Excluded value x = −2! Dividing by zero is undefined, so x + 2 = 0 identifies the excluded value.'},
        {x:-3,lbl:'x = −3',eq:'\\begin{aligned}\\text{Original: }&\\dfrac{0}{0}\\\\\\text{Lowest form: }&\\dfrac{x-3}{x+2}\\end{aligned}',fb:'Original has (x+3); lowest form denominator x+2=0 gives −2',msg:'At x = −3 the factor (x + 3) cancels cleanly. Following the TN textbook rule, excluded values are found from the denominator of the lowest form (x + 2 = 0 ⇒ x = −2).'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let idx=0,showTrap=false;
    const tabs=makeTabs(copy.probes.map(p=>p.lbl),0,i=>{idx=i;tabs.sync(i);paint();},copy.probeLabel);
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    const trapBtn=el('button','g10ch3-chip-toggle',copy.trapBtn);trapBtn.type='button';trapBtn.setAttribute('aria-pressed','false');
    const trapNote=el('p','g10ch3-callout',copy.trapNote);trapNote.hidden=true;
    trapBtn.onclick=()=>{showTrap=!showTrap;trapBtn.setAttribute('aria-pressed',String(showTrap));trapNote.hidden=!showTrap;};
    function paint(){
      const p=copy.probes[idx];
      tex(mathBox,p.eq,p.fb,true);
      note.textContent=p.msg;
      note.classList.toggle('is-danger',p.x===-2);
    }
    host.append(tabs.bar,mathBox,note,trapBtn,trapNote);
    paint();
  }

  /* 5. Rational Operations */
  function renderRationalOps(host,ta){
    const copy=ta?{
      title:'நான்கு செயல்களின் விதியை மாற்றிக் காண்க',
      ops:['× பெருக்கல்','÷ வகுத்தல் (தலைகீழ்)','− கழித்தல் (அடைப்புக்குறி)'],
      data:[
        {eq:'\\begin{aligned}&\\dfrac{x^2-4}{x+1}\\times\\dfrac{x+1}{x+2}\\\\&=\\dfrac{(x-2)\\cancel{(x+2)}}{\\cancel{x+1}}\\times\\dfrac{\\cancel{x+1}}{\\cancel{x+2}}\\\\&=x-2\\end{aligned}',fb:'(x² − 4)/(x + 1) × (x + 1)/(x + 2) = x − 2',note:'முதலில் தொகுதி மற்றும் பகுதியைக் காரணிப்படுத்தி பொதுக் காரணிகளை மட்டும் நீக்கவும்.'},
        {eq:'\\begin{aligned}&\\dfrac{x-1}{x+4}\\div\\dfrac{x^2-1}{x+4}\\\\&=\\dfrac{\\cancel{x-1}}{\\cancel{x+4}}\\times\\dfrac{\\cancel{x+4}}{\\cancel{(x-1)}(x+1)}\\\\&=\\dfrac{1}{x+1}\\end{aligned}',fb:'Flip ONLY the second fraction: answer = 1/(x + 1)',note:'கவனம்: முதல் பின்னத்தைத் திருப்பக் கூடாது! இரண்டாவது பின்னத்தை (வகுத்தியை) மட்டும் தலைகீழாக மாற்றிப் பெருக்கவும்.'},
        {eq:'\\begin{aligned}&\\dfrac{3x}{x^2-9}-\\dfrac{x-2}{x+3}\\\\&=\\dfrac{3x-(x-2)(x-3)}{(x-3)(x+3)}\\\\&=\\dfrac{-x^2+8x-6}{(x-3)(x+3)}\\end{aligned}',fb:'Bracket the subtracted numerator: 3x − (x − 2)(x − 3)',note:'பகுதிகளின் மீ.சி.ம (x − 3)(x + 3) எடுத்த பின், கழிக்கப்படும் தொகுதியை அடைப்புக்குறிக்குள் இட்டால் குறியீட்டுப் பிழை வராது.'}
      ]
    }:{
      title:'Switch mechanisms across ×, ÷, and − of rational expressions',
      ops:['× Multiply','÷ Divide (Flip 2nd)','− Subtract (Bracket!)'],
      data:[
        {eq:'\\begin{aligned}&\\dfrac{x^2-4}{x+1}\\times\\dfrac{x+1}{x+2}\\\\&=\\dfrac{(x-2)\\cancel{(x+2)}}{\\cancel{x+1}}\\times\\dfrac{\\cancel{x+1}}{\\cancel{x+2}}\\\\&=x-2\\end{aligned}',fb:'(x² − 4)/(x + 1) × (x + 1)/(x + 2) = x − 2',note:'Factor every polynomial completely BEFORE cancelling any factor shared between numerator and denominator.'},
        {eq:'\\begin{aligned}&\\dfrac{x-1}{x+4}\\div\\dfrac{x^2-1}{x+4}\\\\&=\\dfrac{\\cancel{x-1}}{\\cancel{x+4}}\\times\\dfrac{\\cancel{x+4}}{\\cancel{(x-1)}(x+1)}\\\\&=\\dfrac{1}{x+1}\\end{aligned}',fb:'Flip ONLY the second fraction: answer = 1/(x + 1)',note:'Convert ÷ to × by flipping ONLY the second fraction (the divisor), then factor and cancel.'},
        {eq:'\\begin{aligned}&\\dfrac{3x}{x^2-9}-\\dfrac{x-2}{x+3}\\\\&=\\dfrac{3x-(x-2)(x-3)}{(x-3)(x+3)}\\\\&=\\dfrac{-x^2+8x-6}{(x-3)(x+3)}\\end{aligned}',fb:'Bracket the subtracted numerator: [3x − (x − 2)(x − 3)]/[(x − 3)(x + 3)]',note:'Find the LCM denominator (x − 3)(x + 3), then put parentheses around the entire subtracted product before expanding!'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let active=0;
    const tabs=makeTabs(copy.ops,0,i=>{active=i;tabs.sync(i);paint();},copy.title);
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    function paint(){tex(mathBox,copy.data[active].eq,copy.data[active].fb,true);note.textContent=copy.data[active].note;}
    host.append(tabs.bar,mathBox,note);
    paint();
  }

  /* 6. Square Root of Polynomials */
  function renderPolySqrt(host,ta){
    const copy=ta?{
      title:'காரணிப்படுத்தல் (பாதி அடுக்கு) vs வகுத்தல் (இருமடங்கு ஈவு)',
      modes:['காரணி முறை','வகுத்தல் முறை (3 படிகள்)'],
      factTitle:'√[16(x − 2)⁴(x + 1)²] = |4(x − 2)²(x + 1)|',
      factCards:[
        ['எண்: √16','→ 4'],
        ['(x − 2)⁴','அடுக்கு 4 ÷ 2 = 2 → (x − 2)²'],
        ['(x + 1)²','அடுக்கு 2 ÷ 2 = 1 → (x + 1)'],
        ['மட்டு |…|','வர்க்கமூலம் குறையற்றது → |4(x−2)²(x+1)|']
      ],
      divSteps:[
        {lbl:'படி 1: முதல் உறுப்பு',eq:'\\begin{aligned}\\sqrt{9x^4}&=3x^2\\\\\\text{Rem.}&=-12x^3+10x^2-4x+1\\end{aligned}',fb:'First term 3x²; remainder −12x³ + 10x² − 4x + 1',note:'முதலில் இறங்கு வரிசையில் (x⁴, x³, x², x, மாறிலி) அமைக்கவும். முதல் உறுப்பு 9x⁴-இன் வர்க்கமூலம் 3x².'},
        {lbl:'படி 2: ஈவை இருமடங்காக்கு',eq:'\\begin{aligned}2(3x^2)&=6x^2,\\\\\\dfrac{-12x^3}{6x^2}&=-2x\\\\(-2x)(6x^2-2x)&=-12x^3+4x^2\\end{aligned}',fb:'Double 3x² → 6x²; next term −2x; remainder 6x² − 4x + 1',note:'தற்போதைய ஈவு 3x²-ஐ 2-ஆல் பெருக்கி 6x² ஆக்குகிறோம்! அடுத்த உறுப்பு −2x; கழித்தால் மீதி 6x² − 4x + 1.'},
        {lbl:'படி 3: மீண்டும் இருமடங்காக்கு',eq:'\\begin{aligned}2(3x^2-2x)&=6x^2-4x,\\\\\\dfrac{6x^2}{6x^2}&=+1\\\\\\text{Rem.}=0&\\implies|3x^2-2x+1|\\end{aligned}',fb:'Double → 6x² − 4x; next term +1; remainder 0 ⇒ |3x² − 2x + 1|',note:'இப்போது (3x² − 2x)-ஐ இருமடங்காக்க 6x² − 4x. +1 சேர்த்துக் கழித்தால் மீதி 0! விடை: |3x² − 2x + 1|.'}
      ]
    }:{
      title:'Factorization (halve powers) vs Division (double the quotient)',
      modes:['Factoring Method','Division Method (3 steps)'],
      factTitle:'√[16(x − 2)⁴(x + 1)²] = |4(x − 2)²(x + 1)|',
      factCards:[
        ['Coefficient √16','→ 4'],
        ['Power (x − 2)⁴','Half of 4 is 2 → (x − 2)²'],
        ['Power (x + 1)²','Half of 2 is 1 → (x + 1)'],
        ['Bars |…|','Non-negative root → |4(x−2)²(x+1)|']
      ],
      divSteps:[
        {lbl:'Step 1 · Leading root',eq:'\\begin{aligned}\\sqrt{9x^4}&=3x^2\\\\\\text{Rem.}&=-12x^3+10x^2-4x+1\\end{aligned}',fb:'First term 3x²; remainder −12x³ + 10x² − 4x + 1',note:'Verify terms are in descending powers of x. Take √(9x⁴) = 3x² as the first term of the quotient, and subtract 9x⁴.'},
        {lbl:'Step 2 · Double 3x²',eq:'\\begin{aligned}2(3x^2)&=6x^2,\\\\\\dfrac{-12x^3}{6x^2}&=-2x\\\\(-2x)(6x^2-2x)&=-12x^3+4x^2\\end{aligned}',fb:'Double 3x² → 6x²; next quotient term −2x; remainder 6x² − 4x + 1',note:'Why double 3x² to 6x²? From (A+B)² = A² + (2A+B)B! Subtract (−2x)(6x² − 2x) to leave 6x² − 4x + 1.'},
        {lbl:'Step 3 · Double 3x²−2x',eq:'\\begin{aligned}2(3x^2-2x)&=6x^2-4x,\\\\\\dfrac{6x^2}{6x^2}&=+1\\\\\\text{Rem.}=0&\\implies|3x^2-2x+1|\\end{aligned}',fb:'Final quotient |3x² − 2x + 1|, remainder 0',note:'Double the current quotient again to 6x² − 4x; next term is +1. Subtract 1(6x² − 4x + 1) → remainder 0! Answer: |3x² − 2x + 1|.'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0,step=0;
    const tabs=makeTabs(copy.modes,0,i=>{mode=i;tabs.sync(i);paint();},copy.title);
    const body=el('div','g10ch3-stage');
    host.append(tabs.bar,body);
    function paint(){
      body.replaceChildren();
      if(mode===0){
        const grid=el('div','g10ch3-card-grid');
        copy.factCards.forEach(([k,v])=>{
          const card=el('div','g10ch3-mini-card');
          card.append(el('strong','',k),el('span','',v));grid.append(card);
        });
        const m=el('div','g10ch3-math-box');
        tex(m,'\\begin{aligned}&\\sqrt{16(x-2)^4(x+1)^2}\\\\&=\\left|4(x-2)^2(x+1)\\right|\\end{aligned}',copy.factTitle,true);
        body.append(grid,m);
      }else{
        const sub=makeTabs(copy.divSteps.map(s=>s.lbl),step,i=>{step=i;paint();},copy.modes[1]);
        const poly=el('div','g10ch3-math-box');
        tex(poly,copy.divSteps[step].eq,copy.divSteps[step].fb,true);
        const note=el('p','g10ch3-note',copy.divSteps[step].note);note.setAttribute('aria-live','polite');
        body.append(sub.bar,poly,note);
      }
    }
    paint();
  }

  /* 7. Forming a Quadratic Equation */
  function renderQuadForm(host,ta){
    const pairs=[[2,5],[-3,4],[-2,-6],[3,3]];
    const copy=ta?{
      title:'மூல இணைகளைத் தேர்ந்தெடுத்துச் சமன்பாட்டை உருவாக்கவும்',
      warn:'கூடுதலுக்கு முன் உள்ள கழித்தல் (−) குறியைக் கவனியுங்கள்!',
      check:'சரிபார்ப்பு: இரு மூலங்களும் p(x) = 0 தருகின்றனவா?'
    }:{
      title:'Pick a root pair (α, β) and watch how signs build the equation',
      warn:'Watch the MINUS sign in front of (α + β)!',
      check:'Check: plugging both α and β back in gives 0'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let idx=1; // default (-3, 4) to immediately teach negative+positive root signs
    const tabs=makeTabs(pairs.map(([a,b])=>`α = ${a}, β = ${b}`.replace(/-/g,'−')),idx,i=>{idx=i;tabs.sync(i);paint();},copy.title);
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,mathBox,note);
    const fmtCoef=(n)=>n===0?'':n===1?'+x':n===-1?'-x':(n>0?'+'+n+'x':n+'x');
    const fmtConst=(n)=>n===0?'':(n>0?'+'+n:String(n));
    function paint(){
      const [a,b]=pairs[idx];
      const {sum,product,evalAt}=mathAPI.quadFromRoots(a,b);
      const midTerm=sum===0?'':(-sum===1?'+x':-sum===-1?'-x':(-sum>0?'+'+(-sum)+'x':(-sum)+'x'));
      const expanded=`x^2${midTerm}${fmtConst(product)}=0`;
      const f1=a===0?'x':(a>0?`(x-${a})`:`(x+${-a})`);
      const f2=b===0?'x':(b>0?`(x-${b})`:`(x+${-b})`);
      const latex=`\\begin{aligned}&${f1}${f2}=0\\\\&x^2-(${a}${b>=0?'+'+b:b})x+(${a})(${b})=0\\\\&${expanded}\\end{aligned}`;
      const fb=`(x − ${a})(x − ${b}) = 0 ⇒ sum = ${sum}, product = ${product} ⇒ x² − (${sum})x + (${product}) = 0`;
      tex(mathBox,latex,fb,true);
      note.textContent=`${copy.warn} α + β = ${sum}, αβ = ${product}. ${copy.check}: p(${a}) = ${evalAt(a)}, p(${b}) = ${evalAt(b)}.`.replace(/-/g,'−');
    }
    paint();
  }

  /* 8. Solving Quadratics: 3 Methods + Geometric Completing-the-Square SVG */
  function renderQuadSolve(host,ta){
    const copy=ta?{
      title:'மூன்று முறைகளும் ஒரே தீர்வைத் தருகின்றன; வர்க்கப் பூர்த்திப் படம்',
      eqs:['x² + 6x − 7 = 0','x² − 3x − 2 = 0 (சூத்திரம் தேவை)'],
      tabs:['காரணிப்படுத்தல்','வர்க்கப் பூர்த்தி (படம்)','இருபடிச் சூத்திரம்'],
      halfLbl:'நடுக் கெழுவில் பாதி வர்க்கம்:'
    }:{
      title:'Three methods compared + completing the square geometry',
      eqs:['x² + 6x − 7 = 0','x² − 3x − 2 = 0 (irrational roots)'],
      tabs:['Factoring','Completing Square (Visual)','Quadratic Formula'],
      halfLbl:'Add half-coeff squared:'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let eqIdx=0,mIdx=1; // Open on Completing Square visual immediately!
    const eqTabs=makeTabs(copy.eqs,0,i=>{eqIdx=i;eqTabs.sync(i);paint();},copy.title);
    const mTabs=makeTabs(copy.tabs,1,i=>{mIdx=i;mTabs.sync(i);paint();},copy.title);
    const body=el('div','g10ch3-stage');
    host.append(eqTabs.bar,mTabs.bar,body);
    const squareSvg=`<svg viewBox="0 0 320 154" class="g10ch3-svg" role="img" aria-label="Square of side x plus two 3 by x rectangles plus missing 3 by 3 corner equals 9">
      <rect x="16" y="18" width="76" height="76" fill="#EFEAE2" stroke="#181B20" stroke-width="1.6"/>
      <text x="54" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="#181B20">x²</text>
      <rect x="92" y="18" width="38" height="76" fill="rgba(22,99,83,0.16)" stroke="#166353" stroke-width="1.5"/>
      <text x="111" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="#166353">3x</text>
      <rect x="16" y="94" width="76" height="38" fill="rgba(22,99,83,0.16)" stroke="#166353" stroke-width="1.5"/>
      <text x="54" y="117" text-anchor="middle" font-size="12" font-weight="700" fill="#166353">3x</text>
      <rect x="92" y="94" width="38" height="38" fill="rgba(110,41,51,0.16)" stroke="#6E2933" stroke-width="1.8" stroke-dasharray="4 3"/>
      <text x="111" y="117" text-anchor="middle" font-size="12" font-weight="750" fill="#6E2933">+9</text>
      <text x="142" y="52" font-size="11" font-weight="700" fill="#181B20">(x + 3)² = 7 + 9 = 16</text>
      <text x="142" y="75" font-size="10.5" fill="#525B62">${copy.halfLbl}</text>
      <text x="142" y="94" font-size="11" font-weight="700" fill="#6E2933">(6 ÷ 2)² = 3² = 9</text>
      <text x="142" y="118" font-size="11" font-weight="700" fill="#166353">x + 3 = ±4 ⇒ x = 1, −7</text>
    </svg>`;
    function paint(){
      body.replaceChildren();
      const box=el('div','g10ch3-math-box');
      const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
      if(eqIdx===0){
        if(mIdx===0){
          tex(box,'\\begin{aligned}x^2+6x-7&=(x-1)(x+7)=0\\\\&\\implies x=1,\\;-7\\end{aligned}','(x − 1)(x + 7) = 0 ⇒ x = 1, −7',true);
          note.textContent=ta?'−1 + 7 = +6 மற்றும் (−1)(7) = −7 என்பதால் எளிதில் காரணிப்படுத்தலாம்.':'Factoring works cleanly here because −1 + 7 = 6 and (−1)(7) = −7.';
        }else if(mIdx===1){
          const svgWrap=el('div','g10ch3-svg-card');svgWrap.innerHTML=squareSvg;body.append(svgWrap);
          tex(box,'\\begin{aligned}x^2+6x+9&=7+9\\\\(x+3)^2&=16\\implies x=1,\\;-7\\end{aligned}','(x + 3)² = 16 ⇒ x = 1, −7',true);
          note.textContent=ta?'6x-ஐ இரு 3x செவ்வகங்களாகப் பிரித்தால் மூலைக்கு 3² = 9 தேவைப்படுகிறது!':'Splitting 6x into two 3x strips leaves a 3 × 3 = 9 corner to complete the square!';
        }else{
          tex(box,'\\begin{aligned}x&=\\dfrac{-6\\pm\\sqrt{6^2-4(1)(-7)}}{2(1)}\\\\&=\\dfrac{-6\\pm 8}{2}\\implies x=1,\\;-7\\end{aligned}','x = (−6 ± √64)/2 ⇒ 1, −7',true);
          note.textContent=ta?'a = 1, b = 6, c = −7 எனப் பிரதியிட அதே 1, −7 தீர்வுகள் கிடைக்கின்றன.':'Substituting a = 1, b = 6, c = −7 yields the exact same roots 1 and −7.';
        }
      }else{
        if(mIdx===0){
          tex(box,'\\begin{aligned}&x^2-3x-2=0\\\\&\\text{(no integer split for }-2)\\end{aligned}','No integer factor pair for x² − 3x − 2 = 0',true);
          note.textContent=ta?'முழு எண் காரணிகள் இல்லாதபோது வர்க்கப் பூர்த்தி அல்லது இருபடிச் சூத்திரத்தைப் பயன்படுத்த வேண்டும்.':'Factoring stalls over integers here — this is where Completing the Square or the Quadratic Formula shines!';
        }else if(mIdx===1){
          tex(box,'\\begin{aligned}\\left(x-\\dfrac{3}{2}\\right)^2&=2+\\dfrac{9}{4}=\\dfrac{17}{4}\\\\&\\implies x=\\dfrac{3\\pm\\sqrt{17}}{2}\\end{aligned}','(x − 3/2)² = 17/4 ⇒ x = (3 ± √17)/2',true);
          note.textContent=ta?'நடுக் கெழு −3-இன் பாதி −3/2; (−3/2)² = 9/4-ஐ இருபுறமும் கூட்டுகிறோம்.':'Half of −3 is −3/2; adding (−3/2)² = 9/4 to both sides builds the square (x − 3/2)².';
        }else{
          tex(box,'\\begin{aligned}x&=\\dfrac{-(-3)\\pm\\sqrt{(-3)^2-4(1)(-2)}}{2(1)}\\\\&=\\dfrac{3\\pm\\sqrt{17}}{2}\\end{aligned}','x = (3 ± √17)/2',true);
          note.textContent=ta?'a = 1, b = −3, c = −2: √(9 + 8) = √17 என்ற விகிதமுறா மூலம் உடனே கிடைக்கிறது.':'Directly handles irrational roots without guessing!';
        }
      }
      body.append(box,note);
    }
    paint();
  }

  /* 9. Discriminant & SVG Parabola Crossing Count */
  function renderDiscriminant(host,ta){
    const cs=[0,3,4,5,7];
    const copy=ta?{
      title:'y = x² − 4x + c பரவளையத்தில் c மதிப்பை மாற்றினால் Δ எவ்வாறு மாறுகிறது?',
      pos:'Δ > 0 → 2 வெவ்வேறு மெய் மூலங்கள் (பரவளையம் x-அச்சை 2 புள்ளிகளில் வெட்டும்)',
      zero:'Δ = 0 → 2 சம மெய் மூலங்கள் (பரவளையம் x-அச்சை ஒரே புள்ளியில் தொடும்)',
      neg:'Δ < 0 → மெய் மூலங்கள் இல்லை (பரவளையம் x-அச்சைத் தொடாது)'
    }:{
      title:'Change c in y = x² − 4x + c to see Δ move the parabola across the x-axis',
      pos:'Δ > 0 → 2 distinct real roots (parabola crosses x-axis twice)',
      zero:'Δ = 0 → 2 equal real roots (parabola touches x-axis at 1 tangent point)',
      neg:'Δ < 0 → No real roots (parabola misses the x-axis completely)'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let idx=1;
    const tabs=makeTabs(cs.map(c=>`c = ${c}`),idx,i=>{idx=i;tabs.sync(i);paint();},copy.title);
    const svgWrap=el('div','g10ch3-svg-card');
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,svgWrap,mathBox,note);
    function paint(){
      const c=cs[idx],delta=mathAPI.discriminantC(c);
      // Coordinate mapping: x in [-1, 5] -> [30, 270] (scale 40px/unit), y in [-4.5, 6] -> [150, 15]
      const mapX=x=>30+(x+1)*40, mapY=y=>105-y*14;
      let pts='';
      for(let x=-0.6;x<=4.61;x+=0.15){
        const y=x*x-4*x+c;
        if(y>=-5&&y<=7)pts+=(pts?' ':'')+mapX(x).toFixed(1)+','+mapY(y).toFixed(1);
      }
      let rootsSvg='';
      if(delta>0){
        const r1=2-Math.sqrt(delta)/2,r2=2+Math.sqrt(delta)/2;
        rootsSvg=`<circle cx="${mapX(r1).toFixed(1)}" cy="${mapY(0)}" r="5" fill="#166353" stroke="#fff" stroke-width="1.5"/>`+
          `<circle cx="${mapX(r2).toFixed(1)}" cy="${mapY(0)}" r="5" fill="#166353" stroke="#fff" stroke-width="1.5"/>`;
      }else if(delta===0){
        rootsSvg=`<circle cx="${mapX(2)}" cy="${mapY(0)}" r="5.5" fill="#B79253" stroke="#181B20" stroke-width="1.5"/>`;
      }
      svgWrap.innerHTML=`<svg viewBox="0 0 280 165" class="g10ch3-svg" role="img" aria-label="Parabola y = x squared minus 4x plus ${c}, discriminant ${delta}">
        <line x1="20" y1="${mapY(0)}" x2="265" y2="${mapY(0)}" stroke="#181B20" stroke-width="1.4"/>
        <line x1="${mapX(0)}" y1="12" x2="${mapX(0)}" y2="155" stroke="#B6B1A6" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="256" y="${mapY(0)-5}" font-size="10" font-weight="700" fill="#181B20">x</text>
        <polyline fill="none" stroke="#6E2933" stroke-width="2.4" points="${pts}"/>
        ${rootsSvg}
        <rect x="8" y="8" width="108" height="36" rx="6" fill="rgba(255,255,255,0.94)"/>
        <text x="14" y="22" font-size="11" font-weight="750" fill="#181B20">y = x² − 4x + ${c}</text>
        <text x="14" y="38" font-size="11" font-weight="750" fill="${delta>0?'#166353':delta===0?'#8A6728':'#6E2933'}">Δ = ${delta}</text>
      </svg>`;
      tex(mathBox,`\\begin{aligned}\\Delta&=(-4)^2-4(1)(${c})\\\\&=16-${4*c}=${delta}\\end{aligned}`,`Δ = 16 − 4(${c}) = ${delta}`,true);
      note.textContent=delta>0?copy.pos:delta===0?copy.zero:copy.neg;
    }
    paint();
  }

  /* 10. Roots and Coefficients Symmetric Rewriter */
  function renderRootsCoeff(host,ta){
    const copy=ta?{
      title:'α, β தனித்தனியே இல்லாமல் x² − 5x + 6 = 0-க்கு மதிப்பு காண்க (α + β = 5, αβ = 6)',
      items:[
        {lbl:'α² + β²',idEq:'\\begin{aligned}\\alpha^2+\\beta^2&=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\&=5^2-2(6)=13\\end{aligned}',fb:'(5)² − 2(6) = 13',chk:'சரிபார்த்தல் (மூலங்கள் 3, 2): 3² + 2² = 9 + 4 = 13 ✓'},
        {lbl:'(α − β)²',idEq:'\\begin{aligned}(\\alpha-\\beta)^2&=(\\alpha+\\beta)^2-4\\alpha\\beta\\\\&=5^2-4(6)=1\\end{aligned}',fb:'(5)² − 4(6) = 1',chk:'சரிபார்த்தல் (மூலங்கள் 3, 2): (3 − 2)² = 1² = 1 ✓'},
        {lbl:'1/α + 1/β',idEq:'\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{5}{6}',fb:'(α + β)/(αβ) = 5/6',chk:'சரிபார்த்தல் (மூலங்கள் 3, 2): 1/3 + 1/2 = 5/6 ✓'},
        {lbl:'α³ + β³',idEq:'\\begin{aligned}\\alpha^3+\\beta^3&=(\\alpha+\\beta)^3\\\\&\\quad-3\\alpha\\beta(\\alpha+\\beta)\\\\&=5^3-3(6)(5)=35\\end{aligned}',fb:'5³ − 3(6)(5) = 35',chk:'சரிபார்த்தல் (மூலங்கள் 3, 2): 3³ + 2³ = 27 + 8 = 35 ✓'}
      ]
    }:{
      title:'Rewrite using ONLY α + β = 5 and αβ = 6 for x² − 5x + 6 = 0',
      items:[
        {lbl:'α² + β²',idEq:'\\begin{aligned}\\alpha^2+\\beta^2&=(\\alpha+\\beta)^2-2\\alpha\\beta\\\\&=5^2-2(6)=13\\end{aligned}',fb:'α² + β² = 5² − 2(6) = 13',chk:'Independent check with roots 3, 2: 3² + 2² = 9 + 4 = 13 ✓'},
        {lbl:'(α − β)²',idEq:'\\begin{aligned}(\\alpha-\\beta)^2&=(\\alpha+\\beta)^2-4\\alpha\\beta\\\\&=5^2-4(6)=1\\end{aligned}',fb:'(α − β)² = 5² − 4(6) = 1',chk:'Independent check with roots 3, 2: (3 − 2)² = 1² = 1 ✓'},
        {lbl:'1/α + 1/β',idEq:'\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta}=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac{5}{6}',fb:'1/α + 1/β = (α + β)/(αβ) = 5/6',chk:'Independent check with roots 3, 2: 1/3 + 1/2 = 5/6 ✓'},
        {lbl:'α³ + β³',idEq:'\\begin{aligned}\\alpha^3+\\beta^3&=(\\alpha+\\beta)^3\\\\&\\quad-3\\alpha\\beta(\\alpha+\\beta)\\\\&=5^3-3(6)(5)=35\\end{aligned}',fb:'α³ + β³ = 5³ − 3(6)(5) = 35',chk:'Independent check with roots 3, 2: 3³ + 2³ = 27 + 8 = 35 ✓'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let idx=0;
    const tabs=makeTabs(copy.items.map(it=>it.lbl),0,i=>{idx=i;tabs.sync(i);paint();},copy.title);
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    host.append(tabs.bar,mathBox,note);
    function paint(){
      tex(mathBox,copy.items[idx].idEq,copy.items[idx].fb,true);
      note.textContent=copy.items[idx].chk;
    }
    paint();
  }

  /* 11. Direct vs Inverse Variations */
  function renderVariations(host,ta){
    const xs=[1,2,3,4,6];
    const copy=ta?{
      title:'நேர் மாறுபாடு (y/x = 2) vs எதிர் மாறுபாடு (xy = 12)',
      modes:['நேர் மாறுபாடு (y = 2x)','எதிர் மாறுபாடு (xy = 12)'],
      xPrompt:'அட்டவணையில் x-ஐத் தேர்க:',
      dirLbl:'(0, 0) வழிக் கோடு',
      invLbl:'அதிபரவளையம் xy = 12'
    }:{
      title:'Compare constant ratio (y = 2x) vs constant product (xy = 12)',
      modes:['Direct (y = 2x)','Inverse (xy = 12)'],
      xPrompt:'Select an x-value:',
      dirLbl:'Line through (0, 0)',
      invLbl:'Hyperbola xy = 12'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0,xIdx=2;
    const modeTabs=makeTabs(copy.modes,0,i=>{mode=i;modeTabs.sync(i);paint();},copy.title);
    const xTabs=makeTabs(xs.map(x=>'x = '+x),xIdx,i=>{xIdx=i;xTabs.sync(i);paint();},copy.xPrompt);
    const svgWrap=el('div','g10ch3-svg-card');
    const mathBox=el('div','g10ch3-math-box');
    const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
    host.append(modeTabs.bar,xTabs.bar,svgWrap,mathBox,note);
    function paint(){
      const xVal=xs[xIdx],direct=mode===0;
      const yVal=direct?2*xVal:12/xVal;
      // SVG plot x in [0, 7] -> [32, 260], y in [0, 14] -> [142, 16]
      const mx=x=>32+x*32,my=y=>142-y*9;
      let path='';
      if(direct){
        path=`<line x1="${mx(0)}" y1="${my(0)}" x2="${mx(6.5)}" y2="${my(13)}" stroke="#166353" stroke-width="2.4"/>`;
      }else{
        let pts='';
        for(let t=0.9;t<=6.6;t+=0.2)pts+=(pts?' ':'')+mx(t).toFixed(1)+','+my(12/t).toFixed(1);
        path=`<polyline fill="none" stroke="#6E2933" stroke-width="2.4" points="${pts}"/>`;
      }
      const dots=xs.map(x=>{
        const y=direct?2*x:12/x,cur=x===xVal;
        return `<circle cx="${mx(x)}" cy="${my(y)}" r="${cur?6:3.5}" fill="${cur?'#181B20':'#fff'}" stroke="${direct?'#166353':'#6E2933'}" stroke-width="2"/>`;
      }).join('');
      const ptX=direct?(xVal===1?mx(xVal)+9:mx(xVal)-38):Math.min(218,mx(xVal)+9);
      const ptY=Math.max(24,my(yVal)-9);
      const capX=direct?42:142;
      svgWrap.innerHTML=`<svg viewBox="0 0 280 160" class="g10ch3-svg" role="img" aria-label="${direct?'Direct variation line y=2x':'Inverse variation curve xy=12'} highlighted at (${xVal}, ${yVal})">
        <line x1="32" y1="142" x2="266" y2="142" stroke="#181B20" stroke-width="1.3"/>
        <line x1="32" y1="12" x2="32" y2="142" stroke="#181B20" stroke-width="1.3"/>
        ${path}${dots}
        <text x="${ptX}" y="${ptY}" font-size="11" font-weight="750" fill="#181B20">(${xVal}, ${yVal})</text>
        <text x="${capX}" y="22" font-size="11" font-weight="750" fill="${direct?'#166353':'#6E2933'}">${direct?copy.dirLbl:copy.invLbl}</text>
      </svg>`;
      if(direct){
        tex(mathBox,`\\begin{aligned}\\dfrac{y}{x}&=\\dfrac{${yVal}}{${xVal}}=2\\\\\\text{constant }k&=2\\end{aligned}`,`y/x = ${yVal}/${xVal} = 2`,true);
        note.textContent=ta?`x = ${xVal} எனில் y = ${yVal}; விகிதம் y/x எப்போதும் 2 ஆகவும் கோடு (0, 0) வழியாகவும் செல்கிறது.`:`At x = ${xVal}, y = ${yVal}. Scaling x scales y identically; y/x = 2 stays constant and the line passes through (0, 0).`;
      }else{
        tex(mathBox,`\\begin{aligned}x\\cdot y&=${xVal}\\times${yVal}=12\\\\\\text{constant }k&=12\\end{aligned}`,`${xVal} × ${yVal} = 12`,true);
        note.textContent=ta?`x = ${xVal} எனில் y = ${yVal}; x அதிகரிக்கும்போது y குறைந்து பெருக்கல் x·y = 12 மாறாது.`:`At x = ${xVal}, y = ${yVal}. As x grows, y shrinks so their product xy = 12 stays invariant.`;
      }
    }
    paint();
  }

  /* 12. Quadratic Graphs: Parabola Width & Intersection Solving */
  function renderQuadGraphs(host,ta){
    const copy=ta?{
      title:'பரவளையத்தின் வடிவமும் நேர்க்கோடு வெட்டுவதால் கிடைக்கும் தீர்வும்',
      modes:['a-மதிப்பு & அகலம்','வெட்டுக் கோடு: x² − x − 2 = 0'],
      curves:[
        {lbl:'y = x²',a:1,desc:'அடிப்படை மேல்நோக்குப் பரவளையம்; முனை (0, 0).'},
        {lbl:'y = 3x² (குறுகியது)',a:3,desc:'|a| பெரியதாகும்போது பரவளையம் y-அச்சை நோக்கிக் குறுகும்.'},
        {lbl:'y = ¼x² (அகலமானது)',a:0.25,desc:'|a| சிறியதாகும்போது பரவளையம் அகலமாகத் திறக்கும்.'},
        {lbl:'y = −x² (கீழ்நோக்கியது)',a:-1,desc:'a < 0 எனில் பரவளையம் கீழ்நோக்கித் திறந்திருக்கும்.'}
      ],
      interNote:'y = x² இலிருந்து x² − x − 2 = 0-ஐக் கழிக்க y = x + 2 கிடைக்கும். வெட்டுப் புள்ளிகள் (−1, 1) மற்றும் (2, 4): தீர்வுகள் x-அச்சில் உள்ள −1 மற்றும் 2 மட்டுமே (y = 1, 4 அல்ல!).'
    }:{
      title:'Parabola width |a| and solving x² − x − 2 = 0 by line intersection',
      modes:['Shape & |a|','Solve by Intersection'],
      curves:[
        {lbl:'y = x²',a:1,desc:'Standard upward parabola with vertex at (0, 0).'},
        {lbl:'y = 3x² (narrow)',a:3,desc:'Larger |a| stretches vertically, making the parabola narrower.'},
        {lbl:'y = ¼x² (wide)',a:0.25,desc:'Smaller |a| opens the parabola wider.'},
        {lbl:'y = −x² (down)',a:-1,desc:'Negative a flips the parabola to open downward.'}
      ],
      interNote:'Subtracting x² − x − 2 = 0 from y = x² gives the straight line y = x + 2. They intersect at (−1, 1) and (2, 4) — drop vertically to read roots x = −1 and x = 2 (NOT y-values 1, 4!).'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=1,cIdx=0; // Default to Intersection mode or switch freely! Wait: let's open on mode 0 or 1? Let's make mode 1 (intersection) super clear, or mode 0 first in logical order: let's check both! Actually mode 1 is the signature skill of Sec 3.8.2; let's keep mode 0 first so progression is Shape -> Solve by Intersection, tabs both visible!
    mode=0;
    const modeTabs=makeTabs(copy.modes,mode,i=>{mode=i;modeTabs.sync(i);paint();},copy.title);
    const body=el('div','g10ch3-stage');
    host.append(modeTabs.bar,body);
    function paint(){
      body.replaceChildren();
      const svgWrap=el('div','g10ch3-svg-card');
      const mathBox=el('div','g10ch3-math-box');
      const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
      if(mode===0){
        const sub=makeTabs(copy.curves.map(c=>c.lbl),cIdx,i=>{cIdx=i;paint();},copy.modes[0]);
        const cur=copy.curves[cIdx];
        const mx=x=>140+x*35,my=y=>105-y*14;
        let pts='';
        for(let x=-2.8;x<=2.85;x+=0.15){
          const y=cur.a*x*x;
          if(y>=-5&&y<=6.8)pts+=(pts?' ':'')+mx(x).toFixed(1)+','+my(y).toFixed(1);
        }
        svgWrap.innerHTML=`<svg viewBox="0 0 280 165" class="g10ch3-svg" role="img" aria-label="${cur.lbl} parabola">
          <line x1="20" y1="${my(0)}" x2="260" y2="${my(0)}" stroke="#181B20" stroke-width="1.3"/>
          <line x1="${mx(0)}" y1="10" x2="${mx(0)}" y2="155" stroke="#181B20" stroke-width="1.3"/>
          <polyline fill="none" stroke="#6E2933" stroke-width="2.5" points="${pts}"/>
          <circle cx="${mx(0)}" cy="${my(0)}" r="4" fill="#166353"/>
          <rect x="8" y="8" width="124" height="22" rx="6" fill="rgba(255,255,255,0.94)"/>
          <text x="14" y="23" font-size="11" font-weight="750" fill="#6E2933">${cur.lbl}</text>
        </svg>`;
        tex(mathBox,`y=${cur.a===1?'':cur.a===-1?'-':cur.a===0.25?'\\tfrac{1}{4}':cur.a}x^2`,cur.lbl,true);
        note.textContent=cur.desc;
        body.append(sub.bar,svgWrap,mathBox,note);
      }else{
        const mx=x=>125+x*38,my=y=>132-y*19;
        let pts='';
        for(let x=-2.4;x<=2.65;x+=0.12)pts+=(pts?' ':'')+mx(x).toFixed(1)+','+my(x*x).toFixed(1);
        svgWrap.innerHTML=`<svg viewBox="0 0 280 165" class="g10ch3-svg" role="img" aria-label="Intersection of y = x squared and y = x + 2 at (-1, 1) and (2, 4)">
          <line x1="20" y1="${my(0)}" x2="265" y2="${my(0)}" stroke="#181B20" stroke-width="1.4"/>
          <line x1="${mx(0)}" y1="12" x2="${mx(0)}" y2="155" stroke="#9EA2AA" stroke-width="1"/>
          <polyline fill="none" stroke="#6E2933" stroke-width="2.3" points="${pts}"/>
          <line x1="${mx(-2.2)}" y1="${my(-0.2)}" x2="${mx(2.7)}" y2="${my(4.7)}" stroke="#2C4B8B" stroke-width="2.2"/>
          <line x1="${mx(-1)}" y1="${my(1)}" x2="${mx(-1)}" y2="${my(0)}" stroke="#166353" stroke-width="1.8" stroke-dasharray="3 3"/>
          <line x1="${mx(2)}" y1="${my(4)}" x2="${mx(2)}" y2="${my(0)}" stroke="#166353" stroke-width="1.8" stroke-dasharray="3 3"/>
          <circle cx="${mx(-1)}" cy="${my(1)}" r="4.5" fill="#166353" stroke="#fff" stroke-width="1.4"/>
          <circle cx="${mx(2)}" cy="${my(4)}" r="4.5" fill="#166353" stroke="#fff" stroke-width="1.4"/>
          <text x="${mx(-1)-32}" y="${my(1)-8}" font-size="10.5" font-weight="750" fill="#181B20">(−1, 1)</text>
          <text x="${mx(2)+7}" y="${my(4)+4}" font-size="10.5" font-weight="750" fill="#181B20">(2, 4)</text>
          <text x="${mx(-1)-12}" y="${my(0)+14}" font-size="11" font-weight="800" fill="#166353">x=−1</text>
          <text x="${mx(2)-10}" y="${my(0)+14}" font-size="11" font-weight="800" fill="#166353">x=2</text>
        </svg>`;
        tex(mathBox,'\\begin{aligned}y&=x^2-(x^2-x-2)=x+2\\\\&\\implies x=-1,\\;2\\end{aligned}','y = x + 2 intersects y = x² ⇒ x = −1, 2',true);
        note.textContent=copy.interNote;
        body.append(svgWrap,mathBox,note);
      }
    }
    paint();
  }

  /* 13. Matrix Order, Indexing & Types */
  function renderMatrixTypes(host,ta){
    const A=[[4,7,-1],[2,0,5]];
    const copy=ta?{
      title:'உறுப்பைத் தட்டி aᵢⱼ இடத்தையும் நிரை நிரல் மாற்று அணி Aᵀ-ஐயும் பாருங்கள்',
      modes:['வரிசை & உறுப்புகள் (aᵢⱼ)','அணிகளின் வகைகள்'],
      transBtn:'நிரை நிரல் மாற்று Aᵀ காட்டு (3 × 2)',
      types:[
        {lbl:'சமனி I₂',eq:'I_2=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}',desc:'முதன்மை மூலைவிட்ட உறுப்புகள் அனைத்தும் 1, மற்றவை 0 (சதுர அணி).'},
        {lbl:'திசையிலி',eq:'\\begin{pmatrix}5&0\\\\0&5\\end{pmatrix}',desc:'மூலைவிட்ட உறுப்புகள் அனைத்தும் சமம்; மற்றவை 0.'},
        {lbl:'மூலைவிட்ட',eq:'\\begin{pmatrix}3&0\\\\0&-2\\end{pmatrix}',desc:'சதுர அணியில் முதன்மை மூலைவிட்டம் தவிர மற்ற உறுப்புகள் 0.'},
        {lbl:'நிரை (1×3)',eq:'\\begin{pmatrix}2&-1&8\\end{pmatrix}',desc:'ஒரே ஒரு நிரை (row) மட்டுமே கொண்ட அணி.'},
        {lbl:'நிரல் (3×1)',eq:'\\begin{pmatrix}2\\\\-1\\\\8\\end{pmatrix}',desc:'ஒரே ஒரு நிரல் (column) மட்டுமே கொண்ட அணி.'},
        {lbl:'மேல் முக்கோண',eq:'\\begin{pmatrix}1&4&-2\\\\0&3&5\\\\0&0&6\\end{pmatrix}',desc:'முதன்மை மூலைவிட்டத்திற்குக் கீழே உள்ள உறுப்புகள் அனைத்தும் 0.'}
      ]
    }:{
      title:'Tap any matrix entry for index aᵢⱼ, toggle transpose Aᵀ, or explore types',
      modes:['Order & Index aᵢⱼ','Matrix Types'],
      transBtn:'Toggle Transpose Aᵀ (3 × 2)',
      types:[
        {lbl:'Identity I₂',eq:'I_2=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}',desc:'Square matrix with 1s on the main diagonal and 0s elsewhere.'},
        {lbl:'Scalar',eq:'\\begin{pmatrix}5&0\\\\0&5\\end{pmatrix}',desc:'Diagonal matrix whose diagonal entries are all equal (here 5).'},
        {lbl:'Diagonal',eq:'\\begin{pmatrix}3&0\\\\0&-2\\end{pmatrix}',desc:'Square matrix where every entry off the main diagonal is 0.'},
        {lbl:'Row (1×3)',eq:'\\begin{pmatrix}2&-1&8\\end{pmatrix}',desc:'Has only 1 row and any number of columns (order 1 × n).'},
        {lbl:'Column (3×1)',eq:'\\begin{pmatrix}2\\\\-1\\\\8\\end{pmatrix}',desc:'Has only 1 column and multiple rows (order m × 1).'},
        {lbl:'Upper Triangular',eq:'\\begin{pmatrix}1&4&-2\\\\0&3&5\\\\0&0&6\\end{pmatrix}',desc:'All entries strictly below the main diagonal are 0.'}
      ]
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0,selR=0,selC=1,transposed=false,tIdx=0;
    const modeTabs=makeTabs(copy.modes,0,i=>{mode=i;modeTabs.sync(i);paint();},copy.title);
    const body=el('div','g10ch3-stage');
    host.append(modeTabs.bar,body);
    function paint(){
      body.replaceChildren();
      if(mode===0){
        const mat=transposed?[[4,2],[7,0],[-1,5]]:A;
        const rows=mat.length,cols=mat[0].length;
        const grid=el('div','g10ch3-mat-grid');
        grid.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;
        mat.forEach((row,r)=>row.forEach((val,c)=>{
          const b=el('button','g10ch3-mat-cell'+(r===selR&&c===selC?' is-selected':'')+(r===selR||c===selC?' is-cross':''),String(val).replace(/-/g,'−'));
          b.type='button';
          b.setAttribute('aria-pressed',String(r===selR&&c===selC));
          b.setAttribute('aria-label',`${transposed?'A transpose':'A'} row ${r+1} column ${c+1}: ${val}`);
          b.onclick=()=>{selR=r;selC=c;paint();};
          grid.append(b);
        }));
        const toggle=el('button','g10ch3-chip-toggle',copy.transBtn);toggle.type='button';
        toggle.setAttribute('aria-pressed',String(transposed));
        toggle.onclick=()=>{transposed=!transposed;selR=0;selC=0;paint();};
        const mathBox=el('div','g10ch3-math-box');
        const name=transposed?'(A^T)':'a';
        const val=mat[selR][selC];
        tex(mathBox,`\\text{Order }=${rows}\\times${cols},\\qquad ${name}_{${selR+1}${selC+1}}=${val}`,`Order = ${rows}×${cols}, entry (${selR+1},${selC+1}) = ${val}`,true);
        const note=el('p','g10ch3-note',ta?`நிரை ${selR+1}, நிரல் ${selC+1} (முதலில் நிரை, அடுத்து நிரல்!).`:`Row ${selR+1}, Column ${selC+1} — always count rows first, columns second!`);
        note.setAttribute('aria-live','polite');
        body.append(grid,toggle,mathBox,note);
      }else{
        const sub=makeTabs(copy.types.map(t=>t.lbl),tIdx,i=>{tIdx=i;paint();},copy.modes[1]);
        const mathBox=el('div','g10ch3-math-box');
        tex(mathBox,copy.types[tIdx].eq,copy.types[tIdx].lbl,true);
        const note=el('p','g10ch3-note',copy.types[tIdx].desc);note.setAttribute('aria-live','polite');
        body.append(sub.bar,mathBox,note);
      }
    }
    paint();
  }

  /* 14. Matrix Operations: Row × Column Dot Product & AB ≠ BA & AB = O */
  function renderMatrixOps(host,ta){
    const A=[[1,2],[3,0]],B=[[4,1],[2,5]];
    const copy=ta?{
      title:'அணிப் பெருக்கல் AB vs BA மற்றும் AB = O எச்சரிக்கை',
      modes:['AB பெருக்கல் (நிரை × நிரல்)','BA பெருக்கல் (AB ≠ BA!)','AB = O (ஆனால் A, B ≠ O)'],
      pickCell:'தீர்வு அணியில் எந்த உறுப்பையும் தட்டி நிரை × நிரல் பெருக்கலைப் பாருங்கள்:'
    }:{
      title:'Tap any result cell to trace Row × Column & test AB vs BA',
      modes:['Compute AB','Compute BA (AB ≠ BA)','Surprise: AB = O'],
      pickCell:'Tap any entry of the product matrix to highlight its Row × Column:'
    };
    host.append(el('h5','g10ch3-lab-title',copy.title));
    let mode=0,cellR=0,cellC=1;
    const modeTabs=makeTabs(copy.modes,0,i=>{mode=i;modeTabs.sync(i);paint();},copy.title);
    const body=el('div','g10ch3-stage');
    host.append(modeTabs.bar,body);
    function renderMiniMat(M,hlRow,hlCol,lbl){
      const wrap=el('div','g10ch3-op-mat');
      wrap.append(el('small','g10ch3-op-lbl',lbl));
      const g=el('div','g10ch3-mat-grid is-compact');
      g.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
      M.forEach((row,r)=>row.forEach((v,c)=>{
        const sp=el('span','g10ch3-mat-static'+((hlRow===r||hlCol===c)?' is-hi':''),String(v));
        g.append(sp);
      }));
      wrap.append(g);return wrap;
    }
    function paint(){
      body.replaceChildren();
      const mathBox=el('div','g10ch3-math-box');
      const note=el('p','g10ch3-note');note.setAttribute('aria-live','polite');
      if(mode<2){
        const L=mode===0?A:B, R=mode===0?B:A, prod=mathAPI.matMul2x2(L,R);
        const prompt=el('p','g10ch3-subprompt',copy.pickCell);
        const rowFlex=el('div','g10ch3-op-row');
        const outWrap=el('div','g10ch3-op-mat');
        outWrap.append(el('small','g10ch3-op-lbl',mode===0?'AB':'BA'));
        const outGrid=el('div','g10ch3-mat-grid is-compact');
        outGrid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
        prod.forEach((row,r)=>row.forEach((v,c)=>{
          const b=el('button','g10ch3-mat-cell'+(r===cellR&&c===cellC?' is-selected':''),String(v));
          b.type='button';b.setAttribute('aria-pressed',String(r===cellR&&c===cellC));
          b.setAttribute('aria-label',`${mode===0?'AB':'BA'} row ${r+1} col ${c+1} = ${v}`);
          b.onclick=()=>{cellR=r;cellC=c;paint();};
          outGrid.append(b);
        }));
        outWrap.append(outGrid);
        rowFlex.append(renderMiniMat(L,cellR,-1,mode===0?'A':'B'),el('span','g10ch3-op-sym','×'),renderMiniMat(R,-1,cellC,mode===0?'B':'A'),el('span','g10ch3-op-sym','='),outWrap);
        const l0=L[cellR][0],l1=L[cellR][1],r0=R[0][cellC],r1=R[1][cellC],ans=prod[cellR][cellC];
        tex(mathBox,`\\begin{aligned}(${mode===0?'AB':'BA'})_{${cellR+1}${cellC+1}}&=(${l0})(${r0})+(${l1})(${r1})\\\\&=${l0*r0}+${l1*r1}=${ans}\\end{aligned}`,`Entry (${cellR+1},${cellC+1}) = ${l0}×${r0} + ${l1}×${r1} = ${ans}`,true);
        note.textContent=mode===0
          ?(ta?'AB = [[8,11],[12,3]]. BA-ஐப் பார்க்க மேலே இரண்டாம் பொத்தானைத் தட்டி ஒப்பிடுங்கள்!':'Compare with BA above: AB = [[8, 11], [12, 3]] whereas BA = [[7, 8], [17, 4]], so AB ≠ BA!')
          :(ta?'BA = [[7,8],[17,4]] ≠ AB! அணிப் பெருக்கலில் வரிசை மாறினால் விடை மாறும்.':'Notice BA = [[7, 8], [17, 4]] ≠ [[8, 11], [12, 3]] = AB. Matrix multiplication is NOT commutative!');
        body.append(prompt,rowFlex,mathBox,note);
      }else{
        tex(mathBox,'\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\begin{pmatrix}0&0\\\\2&0\\end{pmatrix}=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}=O','P ≠ O and Q ≠ O yet PQ = O',true);
        note.textContent=ta?'இரு பூச்சியமற்ற அணிகளைப் பெருக்கினாலும் பூச்சிய அணி O வரலாம்! இது சாதாரண எண்களில் சாத்தியமில்லை.':'Unlike ordinary numbers where ab = 0 forces a = 0 or b = 0, two non-zero matrices can multiply to the zero matrix O!';
        body.append(mathBox,note);
      }
    }
    paint();
  }

  function mount(stage,host,lang){
    if(!stage||!host||stage.visual?.kind!=='ch3-lab')return false;
    const ta=lang==='ta';
    host.replaceChildren();
    host.className='g10ch2-visual g10ch3-lab';
    host.setAttribute('role','group');
    host.setAttribute('aria-label',typeof stage.title==='string'?stage.title:(stage.title?.[lang]||stage.title?.en||'Algebra concept activity'));
    const map={
      'linear-3vars':renderLinear3Vars,
      'poly-gcd':renderPolyGcd,
      'lcm-gcd':renderLcmGcd,
      'rational-excluded':renderRationalExcluded,
      'rational-ops':renderRationalOps,
      'poly-sqrt':renderPolySqrt,
      'quad-form':renderQuadForm,
      'quad-solve':renderQuadSolve,
      'discriminant':renderDiscriminant,
      'roots-coeff':renderRootsCoeff,
      'variations':renderVariations,
      'quad-graphs':renderQuadGraphs,
      'matrix-types':renderMatrixTypes,
      'matrix-ops':renderMatrixOps
    };
    const fn=map[stage.visual.id];
    if(!fn)return false;
    fn(host,ta);
    return true;
  }

  window.TriggleG10Ch3Labs=Object.freeze({mount,math:mathAPI});
})();
