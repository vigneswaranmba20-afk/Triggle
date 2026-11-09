(function(){
'use strict';
// Additive Grade 10 renderer; shared diagram renderer remains byte-identical.
const original=window.TriggleDraw&&window.TriggleDraw.drawClassic;
if(typeof original!=='function')throw new Error('Base Triggle diagrams must be loaded first');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const line=(x1,y1,x2,y2,color,width=2)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"/>';
const label=(x,y,value,color='#494872',size=17)=>'<text x="'+x+'" y="'+y+'" font-size="'+size+'" text-anchor="middle" fill="'+color+'" font-family="Arial, sans-serif" font-weight="700">'+esc(value)+'</text>';
window.TriggleDraw.drawClassic=function(s){
 const d=s&&s.demo;
 if(!d||!['relation-arrows-plot','salary-arrows'].includes(d.kind))return original(s);
 let t='';
      if(d.kind==='relation-arrows-plot'){
        const pairs=Array.isArray(d.pairs)?d.pairs:[];
        const domain=Array.isArray(d.domain)?d.domain:[...new Set(pairs.map(p=>p[0]))];
        const codomain=Array.isArray(d.codomain)?d.codomain:[...new Set(pairs.map(p=>p[1]))];
        t='<text x="160" y="25" font-size="17" text-anchor="middle" fill="#405889" font-weight="700">Arrow diagram</text>'+
          '<text x="500" y="25" font-size="17" text-anchor="middle" fill="#405889" font-weight="700">Coordinate graph</text>'+
          '<text x="82" y="46" text-anchor="middle" font-size="14">x</text><text x="216" y="46" text-anchor="middle" font-size="14">y</text>';
        const pos=(a,val)=>60+a.indexOf(val)*34;
        domain.forEach(x=>{const y=pos(domain,x);t+='<circle cx="83" cy="'+y+'" r="16" fill="#e1eaff" stroke="#5b85c2"/>'+label(83,y+5,String(x),'#264878',15);});
        codomain.forEach(y=>{const yy=pos(codomain,y);t+='<circle cx="218" cy="'+yy+'" r="16" fill="#ffe3ee" stroke="#bf6b92"/>'+label(218,yy+5,String(y),'#85405c',15);});
        pairs.forEach(([x,y])=>{const y1=pos(domain,x),y2=pos(codomain,y);t+=line(102,y1,198,y2,'#60a07a',2)+
          '<path d="M190 '+(y2-4)+' L198 '+y2+' L190 '+(y2+4)+'" fill="none" stroke="#36875c" stroke-width="2"/>';});
        const ox=401,oy=236,sx=18,sy=18;
        t+=line(ox,oy,ox+182,oy,'#6e7792',2)+line(ox,oy,ox,oy-184,'#6e7792',2);
        for(let n=0;n<=10;n+=2){
          t+=line(ox+n*sx,oy,ox+n*sx,oy-180,'#dce7f1',1);
          t+=line(ox,oy-n*sy,ox+180,oy-n*sy,'#dce7f1',1);
          t+=label(ox+n*sx,oy+20,n,'#596985',12)+label(ox-18,oy-n*sy+5,n,'#596985',12);
        }
        pairs.forEach(([x,y])=>{const px=ox+x*sx,py=oy-y*sy;t+='<circle cx="'+px+'" cy="'+py+'" r="5" fill="#de5d8a" stroke="#ffffff" stroke-width="1"/>';});
        t+=label(ox+193,oy+5,'x','#475777',14)+label(ox-8,oy-193,'y','#475777',14);
      }else if(d.kind==='salary-arrows'){
        const groups=Array.isArray(d.groups)?d.groups:[];
        t='<text x="108" y="20" font-size="18" text-anchor="middle" fill="#405889" font-weight="700">Salary (₹)</text>'+
          '<text x="524" y="20" font-size="18" text-anchor="middle" fill="#405889" font-weight="700">Employees</text>';
        let offset=0;
        for(const group of groups){
          const people=group.employees||[];
          const centre=39+(offset+(people.length-1)/2)*24;
          t+='<rect x="42" y="'+(centre-19)+'" width="137" height="38" rx="11" fill="#e7edff" stroke="#758fca"/>'+
             label(111,centre+5,Number(group.salary).toLocaleString('en-IN'),'#365781',17);
          for(let i=0;i<people.length;i++){
            const y=39+(offset+i)*24;
            t+=line(180,centre,447,y,'#7badd7',1.7)+
              '<path d="M438 '+(y-3)+' L447 '+y+' L438 '+(y+3)+'" fill="none" stroke="#548ab7" stroke-width="1.7"/>'+
              '<circle cx="475" cy="'+y+'" r="13" fill="#fbe4ed" stroke="#d39bb6"/>'+
              label(475,y+4,String(people[i]),'#854a69',13);
          }
          offset+=people.length;
        }
      }
 const view=d.kind==='salary-arrows'?'0 0 650 385':'0 0 650 275';
 const title=String(s.ref||'')+' — '+String(s.title||'');
 return '<div class="diagram-wrap"><svg viewBox="'+view+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+esc(title)+' Grade 10 relation diagram"><title>'+esc(title)+'</title>'+t+'</svg></div>';
};
})();
