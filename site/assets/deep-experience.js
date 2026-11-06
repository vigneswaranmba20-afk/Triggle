/* Triggle v1.23 interactive learning components. Requires TriggleDeep data above. */
(()=>{'use strict';
// Never coerce a localized data object into a DOM string: it becomes '[object Object]'.
// This resolver also supports legacy stages whose title/objective/body were not
// converted to the selected language when the stages were created.
function textFor(value, lang) {
 if(value == null || value === false) return '';
 if(typeof value === 'string' || typeof value === 'number') return String(value);
 if(Array.isArray(value)) return value.map(v => textFor(v,lang)).filter(Boolean).join(' ');
 if(typeof value === 'object') return textFor(value[lang] ?? value.en ?? value.ta ?? value.text ?? '',lang);
 return '';
}
const pick=(v,l)=>textFor(v,l);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const rads=x=>x*Math.PI/180;
const t=(l,en,ta)=>l==='ta'?ta:en;
function unitSVG(angle){
 const a=rads(angle),c=210,y=167,R=111,x=c+R*Math.cos(a),py=y-R*Math.sin(a);
 const X=Math.abs(Math.cos(a))<1e-10?0:Math.cos(a),Y=Math.abs(Math.sin(a))<1e-10?0:Math.sin(a);
 return `<svg class="deep-circle-svg" viewBox="0 0 520 330" role="img" aria-label="Unit circle with angle ${angle} degrees, cosine ${X.toFixed(3)}, sine ${Y.toFixed(3)}">
 <rect width="520" height="330" rx="18" fill="#fbfaff"/>
 <g stroke="#e6e2f0" stroke-width="1">${Array.from({length:14},(_,i)=>`<line x1="${35+i*34}" y1="20" x2="${35+i*34}" y2="310"/>`).join('')}${Array.from({length:9},(_,i)=>`<line x1="32" y1="${30+i*34}" x2="480" y2="${30+i*34}"/>`).join('')}</g>
 <circle cx="${c}" cy="${y}" r="${R}" fill="#f0ecff" fill-opacity=".6" stroke="#9b88d9" stroke-width="3"/>
 <g stroke="#9596b3" stroke-width="2.4"><line x1="65" y1="${y}" x2="355" y2="${y}"/><line x1="${c}" y1="20" x2="${c}" y2="310"/></g>
 <g font-family="system-ui" font-size="15" font-weight="700" fill="#6c6985"><text x="352" y="160">+x</text><text x="219" y="28">+y</text><text x="55" y="160">−x</text><text x="218" y="317">−y</text><text x="${c+67}" y="${y-70}">I</text><text x="${c-77}" y="${y-70}">II</text><text x="${c-77}" y="${y+80}">III</text><text x="${c+67}" y="${y+80}">IV</text></g>
 <line x1="${c}" y1="${y}" x2="${x}" y2="${y}" stroke="#4b83e9" stroke-width="7" stroke-linecap="round"/>
 <line x1="${x}" y1="${y}" x2="${x}" y2="${py}" stroke="#ec699c" stroke-width="7" stroke-linecap="round"/>
 <line x1="${c}" y1="${y}" x2="${x}" y2="${py}" stroke="#f9b54c" stroke-width="6" stroke-linecap="round"/>
 <circle cx="${x}" cy="${py}" r="9" fill="#ffc75c" stroke="#fff" stroke-width="3"/>
 <g font-family="system-ui" font-weight="700"><text x="376" y="76" font-size="16" fill="#555276">Angle</text><text x="376" y="108" font-size="24" fill="#5d48a9">${angle}°</text><text x="376" y="161" font-size="15" fill="#3f79de">cos x</text><text x="376" y="184" font-size="22" fill="#3f79de">${X.toFixed(3)}</text><text x="376" y="235" font-size="15" fill="#de5089">sin x</text><text x="376" y="258" font-size="22" fill="#de5089">${Y.toFixed(3)}</text></g></svg>`;
}
function triangleSVG(item,lang,selected='hyp'){
 // Exact 7-24-25 or 12-35-37 side lengths, scaled uniformly.
 const d=item.diagram&&typeof item.diagram==='object'?item.diagram:{};
 const opp=Number(d.opp),adj=Number(d.adj);
 // Never supply fabricated measurements. Draw only from this lesson's own side data.
 if(d.kind!=='triangle'||!Number.isFinite(opp)||!Number.isFinite(adj)||opp<=0||adj<=0)return '';
 const hyp=d.hyp||Math.hypot(opp,adj).toFixed(2);
 const scale=210/Math.max(adj,opp);const x0=100,y0=269,x1=x0+adj*scale,y1=y0-opp*scale;
 const selectedStroke=(s)=>selected===s?'#5645a4':'#bec1cf';
 const selectedWidth=(s)=>selected===s?9:5;
 return `<svg viewBox="0 0 540 335" role="img" aria-label="Right triangle showing opposite ${opp}, adjacent ${adj}, hypotenuse ${hyp}">
 <rect width="540" height="335" rx="18" fill="#fbfaff"/>
 <path d="M${x0} ${y0}L${x1} ${y0}L${x1} ${y1}Z" fill="#f5eaff" stroke="none"/>
 <path d="M${x0} ${y0}L${x1} ${y0}" stroke="${selectedStroke('adj')}" stroke-width="${selectedWidth('adj')}" stroke-linecap="round"/>
 <path d="M${x1} ${y0}L${x1} ${y1}" stroke="${selectedStroke('opp')}" stroke-width="${selectedWidth('opp')}" stroke-linecap="round"/>
 <path d="M${x0} ${y0}L${x1} ${y1}" stroke="${selectedStroke('hyp')}" stroke-width="${selectedWidth('hyp')}" stroke-linecap="round"/>
 <path d="M${x1-18} ${y0}v-18h18" fill="none" stroke="#7c75a5" stroke-width="2"/>
 <circle cx="${x0}" cy="${y0}" r="4" fill="#6652ae"/>
 <g font-size="19" font-weight="750" font-family="system-ui" fill="#383c64">
 <text x="${x0+9}" y="${y0-9}">θ</text>
 <text x="${(x0+x1)/2}" y="${y0+28}" text-anchor="middle">${adj}</text>
 <text x="${x1+14}" y="${(y0+y1)/2}">${opp}</text>
 <text x="${(x0+x1)/2-35}" y="${(y0+y1)/2-13}">${hyp}</text>
 <text x="370" y="85" font-size="14" fill="#665e85">${lang==='ta'?'எதிர்':'Opposite'}</text><text x="370" y="111" fill="#e45b92">${opp}</text>
 <text x="370" y="162" font-size="14" fill="#665e85">${lang==='ta'?'அடுத்து':'Adjacent'}</text><text x="370" y="188" fill="#437cd9">${adj}</text>
 <text x="370" y="239" font-size="14" fill="#665e85">${lang==='ta'?'கர்ணம்':'Hypotenuse'}</text><text x="370" y="265" fill="#6b52ac">${hyp}</text>
 </g></svg>`;
}
function domainSVG(x,lang){
 const y=91,xx=40+(x+5)/10*440,r=9-x*x,allowed=r>=-1e-9;
 const labels=t(lang,'Allowed: −3 ≤ x ≤ 3','அனுமதிக்கப்பட்டது: −3 ≤ x ≤ 3');
 return `<svg viewBox="0 0 520 210" role="img" aria-label="Number line with valid domain from minus three to plus three; selected value ${x}"><rect width="520" height="210" rx="14" fill="#fbfaff"/><line x1="40" x2="480" y1="${y}" y2="${y}" stroke="#a5a4b8" stroke-width="5" stroke-linecap="round"/><line x1="128" x2="392" y1="${y}" y2="${y}" stroke="#2c9e73" stroke-width="9" stroke-linecap="round"/>${[-5,-3,0,3,5].map(n=>`<line x1="${40+(n+5)*44}" x2="${40+(n+5)*44}" y1="${y-11}" y2="${y+11}" stroke="#7d769c" stroke-width="2"/><text x="${40+(n+5)*44}" y="123" text-anchor="middle" font-size="15" font-family="system-ui" font-weight="750" fill="#675f80">${n}</text>`).join('')}<circle cx="${xx}" cy="${y}" r="12" fill="${allowed?'#27a77a':'#d46b64'}" stroke="white" stroke-width="3"/><text x="260" y="165" font-size="16" font-family="system-ui" font-weight="700" fill="#327e67" text-anchor="middle">${labels}</text><text x="260" y="192" font-size="15" font-family="system-ui" font-weight="700" fill="${allowed?'#327e67':'#be6057'}" text-anchor="middle">9 − (${x.toFixed(1)})² = ${r.toFixed(2)} ${allowed?'✓':'✕'}</text></svg>`;
}
function waveSVG(b){
 const n=240,pts=Array.from({length:n+1},(_,i)=>{const x=i/n,px=40+x*450,py=143-Math.sin(b*x*2*Math.PI)*69;return (i?'L':'M')+px.toFixed(2)+' '+py.toFixed(2)}).join(' ');
 return `<svg viewBox="0 0 525 295" role="img" aria-label="Sine wave y equals sin of ${b} times x from 0 to 2 pi"><rect width="525" height="295" rx="14" fill="#fbfaff"/><g stroke="#e9e5f1" stroke-width="1">${[53,98,143,188,233].map(y=>`<line x1="40" x2="490" y1="${y}" y2="${y}"/>`).join('')}${[40,152.5,265,377.5,490].map(x=>`<line x1="${x}" x2="${x}" y1="40" y2="235"/>`).join('')}</g><line x1="40" x2="490" y1="143" y2="143" stroke="#85849c" stroke-width="2"/><path d="${pts}" fill="none" stroke="#d75d99" stroke-width="4" stroke-linejoin="round"/><g font-size="14" font-family="system-ui" font-weight="700" fill="#6c6381"><text x="40" y="263" text-anchor="middle">0</text><text x="265" y="263" text-anchor="middle">π</text><text x="490" y="263" text-anchor="middle">2π</text><text x="20" y="80">1</text><text x="12" y="212">−1</text></g><line x1="40" x2="${40+450/b}" y1="37" y2="37" stroke="#7050b7" stroke-width="4"/><text x="${40+225/b}" y="28" text-anchor="middle" font-size="12" fill="#7050b7" font-family="system-ui" font-weight="850">one cycle</text></svg>`;
}
function visualHTML(s,item,lang){if(!s.visual)return '';
 const directions=t(lang,'Move the angle; the algebra updates with the geometry.','கோணத்தை மாற்றும்போது படமும் கணக்கும் மாறும்.');
 if(s.visual==='unitcircle'||s.visual==='identity'){
  let a=Number.isFinite(s.angle)?s.angle:25;
  return `<section class="deep-visual" data-visual="circle" data-mode="${s.visual}"><p class="deep-visual-label">${esc(directions)}</p><div class="deep-svg" data-svg>${unitSVG(a)}</div><div class="deep-slider"><label for="deepAngleControl">${esc(t(lang,'Angle','கோணம்'))}</label><input id="deepAngleControl" type="range" min="-360" max="360" step="1" value="${a}" aria-label="${esc(t(lang,'Angle in degrees','டிகிரி கோணம்'))}"><output data-angle-value>${a}°</output></div>${s.visual==='identity'?`<div class="deep-live-proof" data-proof>cos²x + sin²x = 1.000</div>`:''}</section>`;
 }
 if(s.visual==='domain')return `<section class="deep-visual" data-visual="domain"><p class="deep-visual-label">${esc(t(lang,'Move x. A real square root needs 9 − x² ≥ 0.','x-ஐ நகர்த்துங்கள். மெய் வர்க்கமூலத்திற்கு 9 − x² ≥ 0 வேண்டும்.'))}</p><div class="deep-svg" data-svg>${domainSVG(0,lang)}</div><div class="deep-slider"><label for="deepDomainControl">x</label><input id="deepDomainControl" type="range" min="-5" max="5" step="0.1" value="0"><output data-x-value>0.0</output></div></section>`;
 if(s.visual==='wave')return `<section class="deep-visual" data-visual="wave"><p class="deep-visual-label">${esc(t(lang,'Change b in y = sin(bx). Watch how many cycles fit between 0 and 2π.','y = sin(bx)-இல் b-ஐ மாற்றி 0 முதல் 2π வரை அலை எண்ணிக்கையைப் பாருங்கள்.'))}</p><div class="deep-svg" data-svg>${waveSVG(7)}</div><div class="deep-slider"><label for="deepWaveControl">b</label><input id="deepWaveControl" type="range" min="1" max="9" step="1" value="7"><output data-wave-value>7</output></div><div class="deep-live-proof" data-wave-period>Period = 2π/7</div></section>`;
 if(s.visual==='triangle')return `<section class="deep-visual" data-visual="triangle"><p class="deep-visual-label">${esc(t(lang,'Tap a side name to highlight it.','பக்கத்தின் பெயரைத் தொட்டு தனியாகப் பாருங்கள்.'))}</p><div class="deep-svg" data-svg>${triangleSVG(item,lang)}</div><div class="deep-side-switch" role="group" aria-label="Triangle sides"><button type="button" data-side="opp">${esc(t(lang,'Opposite','எதிர்'))}</button><button type="button" data-side="adj">${esc(t(lang,'Adjacent','அடுத்து'))}</button><button type="button" class="is-active" data-side="hyp">${esc(t(lang,'Hypotenuse','கர்ணம்'))}</button></div></section>`;
 if(s.visual==='k')return `<section class="deep-visual" data-visual="k"><p class="deep-visual-label">${esc(t(lang,'Change k. Every click is one complete 2π rotation.','k-ஐ மாற்றுங்கள்; ஒவ்வொரு சொடுக்கிலும் 2π முழுச் சுற்று.'))}</p><div class="deep-k-row"><button type="button" data-k-change="-1" aria-label="Decrease k">−</button><output data-k-value>${s.k??0}</output><button type="button" data-k-change="1" aria-label="Increase k">+</button><span>k ∈ ℤ</span></div><div class="deep-k-equation" data-k-equation>x = −π/2 + 2kπ</div><div data-k-range class="deep-k-range"></div><div class="deep-svg" data-svg>${unitSVG(-90)}</div></section>`;
 return '';
}
function content(item,lang,stage,index,total,renderer){
 const title=textFor(stage.title,lang) || t(lang,'Learning stage','கற்றல் நிலை');
 const objective=textFor(stage.objective,lang);
 let html=`<div class="deep-stage-header"><span class="deep-stage-kicker">${esc(t(lang,'LEARNING STAGE','கற்றல் நிலை'))} ${index+1} / ${total}</span><h3>${esc(title)}</h3>${objective?`<p class="deep-stage-objective">${esc(objective)}</p>`:''}</div>`;
 const paragraphs=Array.isArray(stage.body)?stage.body:[stage.body];
 // Strong, authored conceptual remarks belong in the explanation itself, not
 // behind an always-open green "Why does this work?" box. Generic fallback
 // stages deliberately do not fabricate an extra explanation.
 const explanation=textFor(stage.why,lang);
 const prose=[...paragraphs.map(p=>textFor(p,lang)),explanation].filter(Boolean);
 if(prose.length)html+='<div class="deep-stage-body">'+prose.map(p=>`<p>${esc(p)}</p>`).join('')+'</div>';
 const eq=textFor(stage.eq,lang);
 if(eq)html+=`<div class="deep-stage-math" aria-label="Mathematical expression">${renderer(eq)}</div>`;
 html+=visualHTML(stage,item,lang);
 if(stage.checkpoint){
  const cp=stage.checkpoint,options=Array.isArray(cp.options)?cp.options:[];
  html+=`<div class="deep-checkpoint" data-correct="${Number(cp.correct)}" data-explain="${esc(textFor(cp.why,lang))}"><div class="deep-check-heading">${esc(t(lang,'Try it yourself · optional','நீங்களே முயலுங்கள் · விருப்பம்'))}</div><p>${esc(textFor(cp.question,lang))}</p><div class="deep-choices">${options.map((x,i)=>`<button type="button" data-choice="${i}">${esc(textFor(x,lang))}</button>`).join('')}</div><div class="deep-check-feedback" role="status" aria-live="polite"></div><button class="deep-skip" type="button" data-skip>${esc(t(lang,'Skip this check','இந்த வினாவைத் தவிர்க்கவும்'))}</button></div>`;
 }
 return html;
}
function attach(root,item,lang){
 const v=root.querySelector('[data-visual]');if(v){
  if(v.dataset.visual==='circle'){
   const slider=v.querySelector('input');const update=()=>{const a=Number(slider.value);v.querySelector('[data-svg]').innerHTML=unitSVG(a);v.querySelector('[data-angle-value]').textContent=a+'°';const proof=v.querySelector('[data-proof]');if(proof){const c=Math.cos(rads(a)),s=Math.sin(rads(a));proof.textContent=`cos²(${a}°) + sin²(${a}°) = ${(c*c+s*s).toFixed(3)}`;}};slider.addEventListener('input',update);update();
  }else if(v.dataset.visual==='domain'){
   const input=v.querySelector('input');const update=()=>{const x=Number(input.value);v.querySelector('[data-svg]').innerHTML=domainSVG(x,lang);v.querySelector('[data-x-value]').textContent=x.toFixed(1);};input.addEventListener('input',update);update();
  }else if(v.dataset.visual==='wave'){
   const input=v.querySelector('input');const update=()=>{const b=Number(input.value);v.querySelector('[data-svg]').innerHTML=waveSVG(b);v.querySelector('[data-wave-value]').textContent=b;v.querySelector('[data-wave-period]').textContent=t(lang,'Period = 2π/','கால அளவு = 2π/')+b;};input.addEventListener('input',update);update();
  }else if(v.dataset.visual==='triangle'){
   v.querySelectorAll('[data-side]').forEach(b=>b.onclick=()=>{v.querySelector('[data-svg]').innerHTML=triangleSVG(item,lang,b.dataset.side);v.querySelectorAll('[data-side]').forEach(x=>x.classList.toggle('is-active',x===b));});
  }else if(v.dataset.visual==='k'){
   let k=Number.isFinite(Number(root.dataset.k))?Number(root.dataset.k):0;
   const update=()=>{v.querySelector('[data-k-value]').textContent=k;const numerator=4*k-1;const expression=Number.isInteger(numerator/2)?`${numerator/2}π`:`${numerator}π/2`;v.querySelector('[data-k-equation]').textContent=`x = −π/2 + 2(${k})π = ${expression}`;
    const yes=(-3<=numerator/2&&numerator/2<=3);v.querySelector('[data-k-range]').className='deep-k-range '+(yes?'inside':'outside');v.querySelector('[data-k-range]').textContent=t(lang,yes?'✓ This angle is inside −3π to 3π.':'This is a valid sine solution, but OUTSIDE the interval.',yes?'✓ இந்தக் கோணம் −3π முதல் 3π வரை உள்ளது.':'இது சரியான சைன் தீர்வு, ஆனால் கேள்வியின் வரம்பிற்கு வெளியே உள்ளது.');};
   v.querySelectorAll('[data-k-change]').forEach(b=>b.onclick=()=>{k=clamp(k+Number(b.dataset.kChange),-6,6);update();});update();
  }
 }
 const cp=root.querySelector('.deep-checkpoint');if(cp){const feedback=cp.querySelector('.deep-check-feedback');cp.querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{const yes=Number(btn.dataset.choice)===Number(cp.dataset.correct);cp.querySelectorAll('[data-choice]').forEach(x=>{x.classList.remove('is-correct','is-wrong');x.setAttribute('aria-pressed',String(x===btn));});btn.classList.add(yes?'is-correct':'is-wrong');feedback.textContent=(yes?t(lang,'✓ Exactly. ','✓ சரி. '):t(lang,'Not quite. ','மீண்டும் முயலுங்கள். '))+cp.dataset.explain;});cp.querySelector('[data-skip]').onclick=()=>{cp.querySelector('.deep-choices').hidden=true;cp.querySelector('[data-skip]').hidden=true;feedback.textContent=t(lang,'Skipped. Continue whenever you are ready.','தவிர்க்கப்பட்டது. தொடரலாம்.');};}
}
window.TriggleDeepUI={content,attach};
})();
