/* Exact-coordinate construction drawings for Grade 9 Exercises 4.5 and 4.6. */
(() => {
  'use strict';
  const midpoint = (a,b) => scale(add(a,b),.5);
  const add = (a,b) => a.map((x,i) => x+b[i]);
  const sub = (a,b) => a.map((x,i) => x-b[i]);
  const scale = (a,k) => a.map(x => x*k);
  const length = a => Math.hypot(...a);
  const unit = a => scale(a,1/length(a));
  const normal = ([x,y]) => [-y,x];
  const dot = (a,b) => a[0]*b[0]+a[1]*b[1];
  const cross = (a,b) => a[0]*b[1]-a[1]*b[0];
  const bearing = a => Math.atan2(a[1],a[0]);
  const vector = rad => [Math.cos(rad),Math.sin(rad)];
  const radians = degree => degree*Math.PI/180;
  const at = (a,r,t) => add(a,scale(vector(t),r));
  const foot = (p,a,b) => {
    const d = unit(sub(b,a));
    return add(a,scale(d,dot(sub(p,a),d)));
  };
  const intersection = ([a,b],[c,d]) => {
    const u = sub(b,a), v = sub(d,c);
    return add(a,scale(u,cross(sub(c,a),v)/cross(u,v)));
  };

  function triangle({mode,length:base,a,b}) {
    const A = [0,0], B = [base,0];
    let C, arcs = [], rays = [];
    if (mode === 'sss') {
      const x = (a*a+base*base-b*b)/(2*base);
      C = [x,Math.sqrt(a*a-x*x)];
      arcs = [[A,a,bearing(C)],[B,b,bearing(sub(C,B))]];
    } else if (mode === 'asa') {
      C = intersection([A,vector(radians(a))],[B,add(B,vector(Math.PI-radians(b)))]);
      rays = [[A,C],[B,C]];
    } else {
      const end = mode.startsWith('end');
      const origin = end ? B : A, opposite = end ? A : B;
      const direction = vector(end ? Math.PI-radians(a) : radians(a));
      const anchoredOpposite = mode.endsWith('opposite');
      let distance = b;
      if (anchoredOpposite) {
        const delta = sub(origin,opposite), along = dot(delta,direction);
        distance = -along+Math.sqrt(b*b-dot(delta,delta)+along*along);
      }
      C = add(origin,scale(direction,distance));
      rays = [[origin,C]];
      const mark = anchoredOpposite ? opposite : origin;
      arcs = [[mark,b,bearing(sub(C,mark))]];
    }
    return {vertices:[A,B,C], arcs, rays};
  }

  function model(spec) {
    const {vertices,arcs,rays} = triangle(spec);
    const pairs = vertices.map((v,i) => [v,vertices[(i+1)%3],vertices[(i+2)%3]]);
    const mid = pairs.map(([,a,b]) => midpoint(a,b));
    const feet = pairs.map(([v,a,b]) => foot(v,a,b));
    const type = spec.centre;
    const guides = pairs.map(([v,a,b],i) => {
      if (type==='G') return [v,mid[i]];
      if (type==='H') return [v,add(v,normal(sub(b,a)))];
      if (type==='S') return [mid[i],add(mid[i],normal(sub(b,a)))];
      return [v,add(v,add(unit(sub(a,v)),unit(sub(b,v))))];
    });
    const centre = intersection(guides[0],guides[1]);
    const landing = type==='G'||type==='S' ? mid :
      type==='H' ? feet :
        pairs.map(([v,a,b],i) => intersection(guides[i],[a,b]));
    const radius = type==='S' ? length(sub(centre,vertices[0])) :
      type==='I' ? length(sub(centre,foot(centre,vertices[0],vertices[1]))) : 0;
    return {vertices,pairs,arcs,rays,centre,landing,radius};
  }

  function mount(host,spec,steps,lang) {
    const {vertices,pairs,arcs,rays,centre,landing,radius} = model(spec);
    const ta = lang === 'ta';
    const all = [...vertices,centre,...landing];
    if (radius) all.push(add(centre,[-radius,-radius]),add(centre,[radius,radius]));
    let collecting = true;
    let project = point => point;
    const coords = p => {
      if (collecting) all.push(p);
      return project(p).map(x=>x.toFixed(2)).join(' ');
    };
    const path = (p, attrs='') => '<path d="M '+p.map(coords).join(' L ')+'" '+attrs+'/>';
    const guide = p => path(p,'stroke="#8a4b69" stroke-dasharray="5 4"');
    const marker = (name,p,shift) => {
      const [x,y] = add(project(p),shift);
      return '<text x="'+x+'" y="'+y+'">'+name+'</text>';
    };
    const arc = ([p,r,theta],span=.15) => {
      const from = at(p,r,theta-span), to = at(p,r,theta+span);
      if (collecting) for (let i=0;i<=8;i++) all.push(at(p,r,theta-span+2*span*i/8));
      const size = length(sub(project(at(p,r,theta)),project(p)));
      return '<path d="M '+coords(from)+' A '+size+' '+size+' 0 0 0 '+coords(to)+'" stroke="#825c26"/>';
    };
    const spot = p => {
      const [x,y] = project(p);
      return '<circle cx="'+x+'" cy="'+y+'" r="3" fill="#8a4b69" stroke="none"/>';
    };
    const samePoint = (p,q) => length(sub(p,q))<1e-8;
    const rightMark = (p,u,v) => {
      const size = spec.length*.045;
      const a = scale(unit(u),size), b = scale(unit(v),size);
      return path([add(p,a),add(add(p,a),b),add(p,b)],'stroke="#825c26"');
    };
    const centreGuide = (i) => {
      const [v,a,b] = pairs[i], m = landing[i];
      const side = sub(b,a), sideLength = length(side), axis = unit(side);
      const middle = midpoint(a,b);
      let result = '';
      if (spec.centre==='G'||spec.centre==='S') {
        const opening = sideLength*.57;
        const reach = Math.sqrt(opening*opening-sideLength*sideLength/4);
        const crossings = [-1,1].map(s => add(middle,scale(normal(axis),s*reach)));
        for (const p of [a,b]) for (const q of crossings) result += arc([p,opening,bearing(sub(q,p))],.08);
        result += guide(crossings)+rightMark(middle,axis,normal(axis));
      }
      if (spec.centre==='H'&&!samePoint(v,m)) {
        const separation = Math.min(sideLength*.15,length(sub(v,m))*.45);
        const cuts = [-1,1].map(s => add(m,scale(axis,s*separation)));
        const crossing = add(m,scale(unit(sub(m,v)),separation*.68));
        for (const q of cuts) result += arc([v,length(sub(q,v)),bearing(sub(q,v))],.06);
        for (const q of cuts) result += arc([q,length(sub(crossing,q)),bearing(sub(crossing,q))],.20);
        if (dot(sub(m,a),axis)<0) result += guide([a,m]);
        if (dot(sub(m,b),axis)>0) result += guide([b,m]);
        result += rightMark(m,axis,sub(v,m));
      }
      if (spec.centre==='I') {
        const opening = Math.min(length(sub(a,v)),length(sub(b,v)))*.28;
        const cuts = [a,b].map(p => add(v,scale(unit(sub(p,v)),opening)));
        const theta = bearing(sub(m,v));
        const q = at(v,opening*1.65,theta);
        for (const p of cuts) {
          result += arc([v,opening,bearing(sub(p,v))],.12);
          result += arc([p,length(sub(q,p)),bearing(sub(q,p))],.12);
        }
      }
      if (spec.centre==='S') return result+guide([m,centre])+spot(m);
      if (spec.centre==='H'&&samePoint(v,m)) return result+guide([v,centre]);
      return result+guide([v,m])+guide([v,centre])+
        (spec.centre==='G'||spec.centre==='H'?spot(m):'');
    };
    const control = (label,cls) => {
      const button = document.createElement('button');
      button.type='button';
      button.className=cls;
      button.textContent=label;
      return button;
    };
    const picture = document.createElement('div');
    const instruction = document.createElement('p');
    instruction.setAttribute('aria-live','polite');
    const controls = document.createElement('div');
    const prev = control(ta?'முந்தைய படி':'Previous step','g10ch2-practice-link');
    const next = control(ta?'அடுத்த படி':'Next step','g10ch2-practice-link');
    const count = document.createElement('span');
    controls.append(prev,document.createTextNode(' '),count,document.createTextNode(' '),next);
    host.replaceChildren(picture,instruction,controls);
    let stage = 0;
    function shapesFor(stage,zoom=1) {
      const [a,b,c] = vertices;
      let shapes = path([a,b]);
      if (stage===1) shapes += rays.map(guide).join('')+arcs.map(mark=>arc(mark)).join('')+spot(c);
      if (stage>=2) shapes += path([a,c,b]);
      if (stage>=3) {
        shapes += centreGuide(0)+centreGuide(1)+spot(centre);
        const rightVertex = vertices.findIndex(v => samePoint(v,centre));
        shapes += marker(spec.centre,centre,rightVertex>=0?[18,6]:[11,-12]);
      }
      if (stage===4) {
        if (radius) {
          const [cx,cy] = project(centre);
          shapes += '<circle cx="'+cx+'" cy="'+cy+'" r="'+radius*zoom+'" stroke="#256987"/>';
          if (spec.centre==='I') {
            const tangentPoint = foot(centre,a,b);
            shapes += guide([centre,tangentPoint])+rightMark(tangentPoint,sub(b,a),sub(centre,tangentPoint));
          }
        } else shapes += centreGuide(2);
      }
      shapes += marker(spec.vertices[0],a,[-10,12])+marker(spec.vertices[1],b,[9,12]);
      if (stage>=1) shapes += marker(spec.vertices[2],c,[7,-10]);
      return shapes;
    }
    for (let i=0;i<steps.length;i++) shapesFor(i);
    collecting = false;
    const low = [0,1].map(i => Math.min(...all.map(p => p[i])));
    const high = [0,1].map(i => Math.max(...all.map(p => p[i])));
    const zoom = Math.min(228/(high[0]-low[0]),150/(high[1]-low[1]));
    const pivot = midpoint(low,high);
    project = p => add([160,104],scale([p[0]-pivot[0],pivot[1]-p[1]],zoom));
    function draw() {
      const shapes = shapesFor(stage,zoom);
      picture.innerHTML='<svg viewBox="0 0 320 208" role="img" aria-labelledby="g9GeometryStageTitle" '+
        'style="display:block;width:100%;max-height:52vh" fill="none" stroke="#284671" stroke-width="1.8">'+
        '<title id="g9GeometryStageTitle"></title><g font-family="system-ui,sans-serif" font-size="12" text-anchor="middle">'+
        '<style>text{fill:#263755;stroke:none;font-weight:600}</style>'+shapes+'</g></svg>';
      instruction.textContent=steps[stage][lang];
      picture.querySelector('title').textContent=instruction.textContent;
      count.textContent=(stage+1)+' / '+steps.length;
      prev.disabled=stage===0;
      next.disabled=stage===steps.length-1;
    }
    prev.onclick=()=>{stage--;draw();};
    next.onclick=()=>{stage++;draw();};
    draw();
  }

  window.TriggleGeometryConstruction = {model,mount};
})();
