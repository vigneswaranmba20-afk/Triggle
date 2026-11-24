// Grade 9 Mensuration: concept-specific, original SVG/CSS illustrations.
// No external runtime, autoplay, persistence, or textbook page scans.
(() => {
  'use strict';
  const previous = window.TriggleG9MensurationLabs;
  if (!previous || !window.TRIGGLE_MENSURATION_PATH) return;
  const n = value => Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
  const button = (text, id) => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.id = id;
    b.textContent = text; b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', text);
    return b;
  };
  const group = label => {
    const g = document.createElement('div'); g.className='g9m-choices';
    g.setAttribute('role', 'group');g.setAttribute('aria-label',label);return g;
  };
  const output = () => {
    const e = document.createElement('div');e.className='g9m-result';
    e.setAttribute('role','status');e.setAttribute('aria-live','polite');return e;
  };
  const active = (g, id) => g.querySelectorAll('button').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.id === id));
  });

  function quadrilateral(host, lang) {
    const ta=lang==='ta', controls=group(ta?'காட்ட வேண்டிய பகுதியைத் தேர்க':'Select an area to reveal');
    const options=[
      {id:'upper',en:'Top triangle',ta:'மேல் முக்கோணம்'},
      {id:'lower',en:'Bottom triangle',ta:'கீழ் முக்கோணம்'},
      {id:'both',en:'Whole rhombus',ta:'முழு சாய்சதுரம்'}
    ];
    options.forEach(o=>controls.append(button(ta?o.ta:o.en,o.id)));
    const diagram=document.createElement('div');diagram.className='g9m-diagram';
    // Scaled construction: diagonal AC=8 (240 px); all four sides=5 (150 px).
    // B and D are 3 units above/below midpoint; A and C 4 units away.
    const unit=ta?'செ.மீ.':'cm';
    diagram.innerHTML='<svg viewBox="0 0 340 222" class="g9m-quad-svg" role="img" aria-label="'+
      (ta?'நான்கு பக்கங்களும் 5 செ.மீ., மூலைவிட்டம் 8 செ.மீ. கொண்ட சாய்சதுரம்':
       'Rhombus with four 5 cm sides and an 8 cm diagonal')+'">'+
      '<polygon points="45,110 165,20 285,110 165,200" class="g9m-quad-outline"/>'+
      '<polygon data-part="upper" points="45,110 165,20 285,110" class="g9m-quad-half"/>'+
      '<polygon data-part="lower" points="45,110 285,110 165,200" class="g9m-quad-half"/>'+
      '<line x1="45" y1="110" x2="285" y2="110" class="g9m-quad-diagonal"/>'+
      '<g class="g9m-quad-labels"><text x="34" y="113">A</text><text x="165" y="12">B</text>'+
      '<text x="300" y="113">C</text><text x="165" y="218">D</text>'+
      '<text x="82" y="53">5 '+unit+'</text><text x="247" y="53">5 '+unit+'</text>'+
      '<text x="165" y="103">8 '+unit+'</text><text x="84" y="181">5 '+unit+'</text><text x="245" y="181">5 '+unit+'</text></g></svg>';
    const result=output();
    const paint = id => {
      active(controls,id);
      diagram.querySelectorAll('[data-part]').forEach(p=>p.classList.toggle('is-active',id==='both'||p.dataset.part===id));
      const same=id!=='both';
      result.textContent=ta
        ?same?'ஒரு முக்கோணத்தின் அரைச் சுற்றளவு 9 செ.மீ.; அதன் பரப்பளவு 12 செ.மீ².':'மேல் 12 செ.மீ² + கீழ் 12 செ.மீ² = மொத்தம் 24 செ.மீ².'
        :same?'Each triangle: semiperimeter 9 cm, area 12 cm².':'Top 12 cm² + bottom 12 cm² = full area 24 cm².';
    };
    controls.addEventListener('click', e => {const b=e.target.closest('button');if(b)paint(b.dataset.id);});
    host.replaceChildren(controls,diagram,result);paint('upper');
    return true;
  }

  function surface(host,lang) {
    const ta=lang==='ta',shape=group(ta?'திண்ம வடிவம்':'Choose the box shape'),mode=group(ta?'எந்த முகங்களை அளப்பது':'Choose which faces to count');
    [['cuboid',ta?'கனசெவ்வகம் · 4×3×2':'Cuboid · 4×3×2'],
     ['cube',ta?'கனசதுரம் · 3×3×3':'Cube · 3×3×3']].forEach(([id,name])=>shape.append(button(name,id)));
    [['tsa',ta?'ஆறு முகங்களும்':'All six faces'],['lsa',ta?'நான்கு சுவர்கள்':'Four walls only']]
      .forEach(([id,name])=>mode.append(button(name,id)));
    const diagram=document.createElement('div');diagram.className='g9m-diagram';
    const result=output();let selectedShape='cuboid',selectedMode='tsa';
    const makeNet = (l,b,h) => {
      const scale=18,x=34,y=91;const L=l*scale,B=b*scale,H=h*scale;
      const box=(xx,yy,ww,hh,name,omit=false)=>{
        const mute=omit&&selectedMode==='lsa';
        return '<g class="g9m-net-face'+(mute?' is-muted':'')+'"><rect x="'+xx+'" y="'+yy+'" width="'+ww+'" height="'+hh+'" rx="2"/>'+
          '<text x="'+(xx+ww/2)+'" y="'+(yy+hh/2+4)+'">'+name+'</text></g>';
      };
      return '<svg viewBox="0 0 340 225" class="g9m-net-svg" role="img" aria-label="'+
        (ta?'விரிக்கப்பட்ட பெட்டியின் ஆறு முகங்கள்':'Unfolded box net with six faces')+'">'+
        box(x,y-B,L,B,l+'×'+b,true)+
        box(x,y+H,L,B,l+'×'+b,true)+
        box(x,y,L,H,l+'×'+h)+box(x+L,y,B,H,b+'×'+h)+
        box(x+L+B,y,L,H,l+'×'+h)+box(x+2*L+B,y,B,H,b+'×'+h)+
        '</svg>';
    };
    const paint=()=>{
      active(shape,selectedShape);active(mode,selectedMode);
      const cube=selectedShape==='cube',l=cube?3:4,b=cube?3:3,h=cube?3:2;
      diagram.innerHTML=makeNet(l,b,h);
      const tsa=2*(l*b+b*h+l*h),lsa=2*h*(l+b),area=selectedMode==='tsa'?tsa:lsa;
      result.textContent = ta
        ?(selectedMode==='tsa'?'ஆறு முகங்களின் பரப்பளவு: ':'நான்கு பக்க முகங்களின் பரப்பளவு: ')+
          area+' சதுர செ.மீ. '+(selectedMode==='lsa'?'மேல் மற்றும் அடிமுகங்கள் சேர்க்கப்படவில்லை.':'')
        :(selectedMode==='tsa'?'All six faces = ':'Four walls only = ')+area+
          ' cm².'+(selectedMode==='lsa'?' Top and bottom do not count.':'');
    };
    shape.addEventListener('click',e=>{const b=e.target.closest('button');if(b){selectedShape=b.dataset.id;paint();}});
    mode.addEventListener('click',e=>{const b=e.target.closest('button');if(b){selectedMode=b.dataset.id;paint();}});
    const how=document.createElement('p');how.className='g9m-instruction';
    how.textContent=ta?'பெட்டியை விரித்த வலையாகப் பாருங்கள்; சாம்பல் நிற முகங்கள் கணக்கில் சேர்க்கப்படவில்லை.':
      'Unfold the box into a net. Pale faces are excluded when measuring only the four walls.';
    host.replaceChildren(how,shape,mode,diagram,result);paint();return true;
  }

  function volume(host,lang) {
    const ta=lang==='ta',controls=group(ta?'பெட்டியின் அளவுகளைத் தேர்க':'Choose length × breadth × height');
    const boxes=[{id:'small',l:2,b:3,h:2},{id:'box',l:4,b:3,h:2},{id:'cube',l:3,b:3,h:3},{id:'large',l:4,b:4,h:4}];
    boxes.forEach(v=>controls.append(button(v.l+' × '+v.b+' × '+v.h,v.id)));
    const picture=document.createElement('div');picture.className='g9m-layers',picture.setAttribute('role','img');
    const result=output();
    const paint=choice=>{
      active(controls,choice.id);
      const count=choice.l*choice.b;
      picture.setAttribute('aria-label',ta?choice.h+' அடுக்குகள், ஒவ்வொன்றிலும் '+count+' அலகுக் கனங்கள்':
        choice.h+' layers, each with '+count+' one-centimetre cubes');
      picture.replaceChildren();
      for(let level=1;level<=choice.h;level++){
        const layer=document.createElement('div');layer.className='g9m-layer';
        const label=document.createElement('span');label.className='g9m-layer-name';
        label.textContent=(ta?'அடுக்கு ':'Layer ')+level;
        const grid=document.createElement('div');grid.className='g9m-cubes';
        grid.style.gridTemplateColumns='repeat('+choice.l+',minmax(0,1fr))';
        grid.style.width=(choice.l*25)+'px';
        grid.setAttribute('aria-hidden','true');
        for(let i=0;i<count;i++){
          const cell=document.createElement('span');cell.className='g9m-unit-cube';grid.append(cell);
        }
        layer.append(label,grid);picture.append(layer);
      }
      result.textContent=ta?('ஒரு அடுக்கில் '+choice.l+' × '+choice.b+' = '+count+
        ' கனங்கள். '+choice.h+' அடுக்குகளில் '+count+' × '+choice.h+' = '+count*choice.h+
        ' கன செ.மீ.'):('One layer has '+choice.l+' × '+choice.b+' = '+count+
        ' unit cubes. '+choice.h+' layers give '+count+' × '+choice.h+' = '+count*choice.h+' cm³.');
    };
    controls.addEventListener('click',e=>{
      const b=e.target.closest('button');if(b){const v=boxes.find(x=>x.id===b.dataset.id);if(v)paint(v);}
    });
    const prompt=document.createElement('p');prompt.className='g9m-instruction';
    prompt.textContent=ta?'ஒவ்வொரு அடுக்கிலும் உள்ள சிறு சதுரங்கள் மேலிருந்து பார்க்கும் அலகுக் கனங்களைக் குறிக்கின்றன. எல்லா அடுக்குகளையும் எண்ணுக.':
      'Each small square is the top view of one 1 cm³ cube. Count the cubes in every layer, not just the visible top layer.';
    host.replaceChildren(prompt,controls,picture,result);paint(boxes[1]);return true;
  }
  window.TriggleG9MensurationLabs=Object.freeze({...previous,mount(stage,host,lang){
    if(previous.mount(stage,host,lang))return true;
    if(!host)return false;
    const kind=stage?.visual?.kind;
    if(kind!=='g9m-quadrilateral'&&kind!=='g9m-surface'&&kind!=='g9m-volume')return false;
    host.className='g9m-lab';
    return kind==='g9m-quadrilateral'?quadrilateral(host,lang):
      kind==='g9m-surface'?surface(host,lang):volume(host,lang);
  }});
})();
