/* Additive Grade 9 Probability eight-sector spinner (no modification to legacy artwork). */
(()=>{'use strict';
const draw=window.TriggleDraw;
if(!draw||typeof draw.drawClassic!=='function')throw Error('Spinner extension needs TriggleDraw');
const old=draw.drawClassic;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const spinner=s=>{
 const d=s.demo;
 const names=Array.isArray(d.sectors)&&d.sectors.length===8?d.sectors:[1,2,3,4,5,6,7,8];
 const cx=200,cy=130,r=92;
 const at=(distance,a)=>[cx+distance*Math.cos(a),cy+distance*Math.sin(a)];
 let paths='';
 for(let i=0;i<8;i++){
  const a=-Math.PI/2+i*Math.PI/4,b=a+Math.PI/4,mid=(a+b)/2;
  const p=at(r,a),q=at(r,b),lbl=at(r*.69,mid);
  const fill=i%2?'#e6eafb':'#e8f5fd';
  paths+=`<path d="M${cx} ${cy} L${p[0].toFixed(1)} ${p[1].toFixed(1)} A${r} ${r} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)} Z" fill="${fill}" stroke="#746f98" stroke-width="2"/>`+
  `<text x="${lbl[0].toFixed(1)}" y="${(lbl[1]+7).toFixed(1)}" font-size="22" text-anchor="middle" fill="#273751" font-weight="700">${esc(names[i])}</text>`;
 }
 const title=esc((s.ref||'Probability')+' — '+(s.title||'Eight-sector spinner'));
 return `<div class="diagram-wrap"><svg viewBox="0 0 400 270" role="img" aria-label="Spinner with eight equal sectors numbered one to eight" preserveAspectRatio="xMidYMid meet"><title>${title}</title>${paths}<circle cx="${cx}" cy="${cy}" r="7" fill="#6958a0"/><path d="M${cx} ${cy} L${cx+29} ${cy-27}" stroke="#d34876" stroke-width="6" stroke-linecap="round"/><text x="200" y="253" font-size="13" fill="#4c5f78" text-anchor="middle">All 8 outcomes equally likely</text></svg></div>`;
};
draw.drawClassic=s=>s?.demo?.kind==='probability-spinner'?spinner(s):old(s);
})();
