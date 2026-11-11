/* Original, English-only teaching scenes. Textbook order; no exercise records. */
(function () {
  'use strict';
  const M=window.TriggleMatrixMath,KEY='triggle-g12-ch1-concepts-v1';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const scenes=[
    {id:'cofactor',title:'Cofactor X-Ray',section:'1.1 · 1.2.1',pages:'1–4',question:'What stays when a row and a column disappear?',check:'A cofactor sits in row 1, column 2. Which sign multiplies its minor?',options:['+','−'],answer:1,feedback:['The signs alternate. At (1, 2), 1 + 2 is odd, so the sign is negative.','Yes. (−1)¹⁺² = −1; multiply the minor by −1.'],proof:'A is a matrix: an arrangement of numbers in rows and columns. Its order is rows × columns. The entry aᵢⱼ is in row i, column j. For a square matrix, det(A), also written |A|, is a number. Delete row i and column j; the determinant of what remains is the minor Mᵢⱼ. The cofactor is Cᵢⱼ = (−1)ⁱ⁺ʲ Mᵢⱼ (the textbook uses Aᵢⱼ). Arrange these in a cofactor matrix, then transpose: row i, column j moves to row j, column i. That transpose is adj(A). Cofactor expansion gives A adj(A) = adj(A) A = det(A) I. Matching rows give det(A); mismatched rows give zero because they correspond to a determinant with repeated rows.'},
    {id:'undo',title:'Undo Machine',section:'1.2.2',pages:'4–5',question:'Can every transformation be undone?',check:'If a square is flattened to a line, can one inverse recover every original point?',options:['Yes','No'],answer:1,feedback:['Several original points now share an output. An inverse cannot know which one to recover.','Exactly. Information was lost, so a matrix inverse does not exist.'],proof:'I is the identity matrix: multiplying by I leaves every input unchanged. A⁻¹ means an inverse matrix, not entry-by-entry reciprocals. It must satisfy both AA⁻¹ = I and A⁻¹A = I. If det(A) ≠ 0, the adjoint identity can be divided by this nonzero number, giving A⁻¹ = adj(A)/det(A). If an inverse existed when det(A) = 0, taking determinants of AA⁻¹ = I would give 0 = 1, a contradiction. In two dimensions |det(A)| is the area scale; a negative determinant reverses orientation. This area picture is specifically a 2D interpretation. To multiply matrices, take each row of the left matrix dotted with each column of the right. Inner dimensions must agree.'},
    {id:'order',title:'Order Matters',section:'1.2.3',pages:'6–11',question:'Which action must Undo reverse first?',check:'For invertible A and B, which matrix undoes AB?',options:['A⁻¹B⁻¹','B⁻¹A⁻¹'],answer:1,feedback:['With column vectors AB applies B first, then A. Undo must remove A first, then B.','Yes. (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = I.'],proof:'Let A and B be nonsingular square matrices of the same order. For a column vector v, ABv applies B, then A. To undo, apply A⁻¹, then B⁻¹: the combined inverse is B⁻¹A⁻¹. Both product orders give I by associativity. Other identities: (A⁻¹)⁻¹ = A; det(A⁻¹) = 1/det(A); (Aᵀ)⁻¹ = (A⁻¹)ᵀ; (λA)⁻¹ = (1/λ)A⁻¹ for λ ≠ 0. Transposing AA⁻¹ = I reverses the factors and proves the transpose identity. For cancellation, AB = AC implies B = C only if A is invertible: multiply on the left by A⁻¹. Similarly BA = CA needs multiplication on the right. A singular zero matrix is a counterexample to cancellation.'},
    {id:'frames',title:'Two Reference Frames',section:'1.2.4',pages:'12–13',question:'Does turning the axes move the point?',check:'Axes turn 90° counterclockwise. A fixed point has old coordinates (2, 0). Its new coordinates are…',options:['(0, 2)','(0, −2)'],answer:1,feedback:['That is the active rotation of the point. With rotated axes, the fixed point lies along the negative new Y-axis.','Yes. Turning the reference frame uses the inverse rotation.'],proof:'Angles here are counterclockwise. Define R(θ) = [[cosθ, −sinθ], [sinθ, cosθ]]. Active rotation: a point moves, fixed axes remain, p′ = R(θ)p. Passive rotation: the point stays fixed and axes turn; new coordinates = R(−θ) old coordinates = R(θ)ᵀ old coordinates. Thus X = x cosθ + y sinθ and Y = −x sinθ + y cosθ. The textbook p12 correctly states old = W new and W⁻¹ = Wᵀ, but the subsequent expanded inverse product repeats the active signs inconsistently. This lesson follows the correct inverse matrix. Since cos²θ + sin²θ = 1, det(R) = 1 and RᵀR = I; R is orthogonal.'},
    {id:'secret',title:'Secret Message',section:'1.2.5',pages:'14–15',question:'How does the same key let us recover letters?',check:'Why must the encoding key be invertible?',options:['To recover every input','To make numbers large'],answer:0,feedback:['Yes. Multiplying each coded row by the inverse restores the original row.','Large numbers do not ensure recovery. The key must have an inverse.'],proof:'This is an original 2×2 classroom model, simplified from the textbook’s 3×3 example. A = 1, …, Z = 26; blank = 0. Pair the letters into a row p. With encoding key K, coded row c = pK. Decoding on the right gives cK⁻¹ = p(KK⁻¹) = p. This row-vector convention matches the textbook’s post-multiplication; it differs from the column-vector convention in the transformation scenes. No modular arithmetic is used. An invertible real key suffices for this exact arithmetic demonstration. This is not modern secure encryption.'},
    {id:'rows',title:'Row Workshop',section:'1.3.1 · 1.3.2',pages:'16–18',question:'Can we simplify without changing the solution set?',check:'Which row scaling is illegal as an elementary operation?',options:['Multiply by −2','Multiply by 0'],answer:1,feedback:['Multiplication by any nonzero scalar can be reversed. It is legal.','Yes. Multiplying by zero destroys the original equation.'],proof:'Allowed elementary row operations: interchange two rows; multiply a row by a nonzero scalar; add a multiple of a different row. Each operation has an inverse, so applying it to every entry of an augmented row preserves the solution set. A pivot is the first nonzero entry in a nonzero row. Echelon form puts zero rows at the bottom and each later pivot strictly to the right of the preceding pivot. The pivot entries need not be 1. Column operations also preserve rank, but generally change the meaning of variables in AX = B; they cannot be used as unchanged-equation row steps. Here all operations are row operations.'},
    {id:'identity',title:'Independence → Inverse',section:'1.3.3 · 1.3.4',pages:'19–27',question:'How many rows contribute a new direction?',check:'A 3-column matrix has two pivots. How many independent rows does it have?',options:['2','3'],answer:0,feedback:['Yes. Rank is the number of pivots, here 2.','Columns do not determine row independence. Count pivots in echelon form.'],proof:'The rank ρ(A) is the order of the largest nonzero minor; equivalently it is the number of pivots after elimination, or the number of independent rows. A nonzero row can still be dependent, so count pivots after reducing. Rank is unchanged by reversible elementary row/column operations. The zero matrix has rank 0. For Gauss–Jordan, put the identity beside A: [A | I]. Apply each entire row operation to both sides. If operations together form E and EA = I, then E = A⁻¹, so [A | I] → [I | A⁻¹]. If A is singular its left side cannot become I; do not label the right block as an inverse.'},
    {id:'systems',title:'Intersection Lab',section:'1.4.1–1.4.3',pages:'27–37',question:'When do two equations agree on one point?',check:'Two distinct parallel lines have…',options:['One solution','No solution','Infinitely many'],answer:1,feedback:['A solution must lie on both lines. Distinct parallel lines never meet.','Yes. No point satisfies both equations.','Coincident lines have infinitely many points in common; distinct parallel lines have none.'],proof:'Choose unknowns x and y, translate each condition into an equation, and put coefficients in A, unknowns into the column X, constants into the column B. The system is AX = B. A solution satisfies every equation, so in 2D it is a common point of the lines. If A is square and det(A) ≠ 0, X = A⁻¹B. Cramer’s rule uses xⱼ = det(Aⱼ)/det(A), replacing column j of A with B; it has the same nonzero-determinant condition for a unique solution. Gaussian elimination applies reversible row operations to [A | B], then back-substitutes; it also detects dependent or contradictory equations. With det(A) = 0, do not use division by the determinant to decide between no solution and infinitely many.'},
    {id:'consistency',title:'Consistency Scanner',section:'1.5.1 · 1.5.2',pages:'38–47',question:'Does the right-hand side add a contradiction?',check:'ρ(A) = ρ([A | B]) = 2 and there are 3 unknowns. The system has…',options:['One solution','Infinitely many','No solution'],answer:1,feedback:['Equal ranks ensure consistency, but rank 2 leaves one of the 3 unknowns free.','Yes. There is one free variable: n − ρ(A) = 3 − 2 = 1.','The ranks agree, so the system is consistent. A free variable gives infinitely many solutions.'],proof:'[A | B] is the augmented matrix: coefficients and constants side by side. The Rouché–Capelli theorem says AX = B is consistent if and only if ρ(A) = ρ([A | B]). A row [0 … 0 | c] with c ≠ 0 asserts 0 = c and causes inconsistency. For n unknowns, equal ranks n give one solution; equal ranks below n give n − ρ(A) free variables and infinitely many real solutions. Homogeneous means B = 0. Then X = 0 is always a solution, so the ranks always agree. Nontrivial (nonzero) solutions exist exactly when ρ(A) < n. This also works for rectangular matrices; a determinant criterion alone is only for square matrices.'}
  ];
  const f=x=>typeof x==='string'?esc(x):(()=>{const a=M.q(x);return a.d===1?esc(a.n):'<math xmlns="http://www.w3.org/1998/Math/MathML" aria-label="'+esc(M.fmt(a))+'"><mfrac><mn>'+a.n+'</mn><mn>'+a.d+'</mn></mfrac></math>';})();
  function mat(A,label='matrix',opts={}) {
    const desc=A.map(r=>r.map(x=>typeof x==='string'?x:M.fmt(x)).join(', ')).join('; ');
    return '<span class="mc-matrix-wrap"><table class="mc-matrix'+(opts.transpose?' mc-transpose':'')+'" aria-label="'+esc(label+': '+desc)+'"><tbody>'+A.map((r,i)=>'<tr>'+r.map((x,j)=>{
      const cls=[opts.split===j?'mc-divider':'',opts.cell&&opts.cell[0]===i&&opts.cell[1]===j?'mc-selected':'',opts.fade&&(opts.cell[0]===i||opts.cell[1]===j)?'mc-cut':'',opts.pivots&&opts.pivots[i]===j?'mc-pivot':''].join(' ');
      return '<td class="'+cls+'" style="--dx:'+((i-j)*44)+'px;--dy:'+((j-i)*44)+'px">'+(opts.tap?'<button type="button" data-cell="'+i+','+j+'" aria-label="Row '+(i+1)+', column '+(j+1)+', value '+esc(M.fmt(x))+'" aria-pressed="'+String(opts.cell[0]===i&&opts.cell[1]===j)+'">'+f(x)+'</button>':f(x))+'</td>';
    }).join('')+'</tr>').join('')+'</tbody></table></span>';
  }
  const point=p=>'('+p.map(x=>typeof x==='object'?M.fmt(x):Math.abs(x)<1e-9?'0':Number(x.toFixed(2))).join(', ')+')';
  function plane(content,label,axes='') {
    let grid='';for(let i=-3;i<=3;i++)grid+='<path d="M'+(160+i*32)+' 22V246 M48 '+(134+i*32)+'H272" stroke="#e6e0ed" stroke-width="1"/>';
    return '<svg class="mc-plane" viewBox="0 0 320 268" role="img" aria-label="'+esc(label)+'"><title>'+esc(label)+'</title>'+grid+'<path d="M42 134H280 M160 252V16" stroke="#716780" stroke-width="1.5"/><text x="285" y="139">x</text><text x="167" y="19">y</text><text x="148" y="150">0</text><text x="190" y="150">1</text>'+axes+content+'</svg>';
  }
  const xy=p=>[160+p[0]*32,134-p[1]*32];
  const dot=(p,label,kind='primary')=>{const [x,y]=xy(p);return '<circle cx="'+x+'" cy="'+y+'" r="5" class="mc-dot-'+kind+'"/><text x="'+(x+8)+'" y="'+(y-9)+'">'+esc(label)+'</text>';};
  const segment=(p,q,cls)=>{const a=xy(p),b=xy(q);return '<path d="M'+a.join(' ')+'L'+b.join(' ')+'" class="'+cls+'"/>';};
  function mount(container,opts={}) {
    const root=document.createElement('section');root.className='matrix-concepts';root.setAttribute('aria-label','Explore matrices and determinants');container.append(root);
    let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
    const states=Array.from({length:scenes.length},(_,i)=>saved.scenes?.[i]&&typeof saved.scenes[i]==='object'?saved.scenes[i]:{});
    let active=Number.isInteger(opts.initialConcept)&&opts.initialConcept>=0&&opts.initialConcept<scenes.length?opts.initialConcept:Number.isInteger(saved.active)&&saved.active>=0&&saved.active<scenes.length?saved.active:0;
    const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify({active,scenes:states}));}catch{}};
    const set=(key,val)=>{states[active][key]=val;persist();};
    const setting=(key,fallback,allowed)=>allowed.includes(states[active][key])?states[active][key]:fallback;
    root.innerHTML='<div class="mc-top"><span data-position></span><button type="button" data-index-toggle aria-expanded="false" aria-controls="mc-index">Find a concept ↓</button></div><nav id="mc-index" class="mc-index" aria-label="Chapter concept index" hidden>'+scenes.map((s,i)=>'<button type="button" data-scene="'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span> '+esc(s.title)+'<small>§'+s.section+'</small></button>').join('')+'</nav><article data-scene-panel></article><nav class="mc-navigation" aria-label="Concept navigation"><button type="button" data-prev>← Back</button><button type="button" data-next>Next →</button></nav><div class="mc-end"><button type="button" data-exercises>Open chapter exercises ↗</button><span>Original Triggle explorations · English</span></div>';
    const panel=root.querySelector('[data-scene-panel]'),index=root.querySelector('#mc-index'),indexButton=root.querySelector('[data-index-toggle]');
    indexButton.onclick=()=>{index.hidden=!index.hidden;indexButton.setAttribute('aria-expanded',String(!index.hidden));};
    root.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>show(+b.dataset.scene,true));
    root.querySelector('[data-prev]').onclick=()=>show(active-1,true);
    root.querySelector('[data-next]').onclick=()=>active===scenes.length-1?opts.onExercises?.():show(active+1,true);
    root.querySelector('[data-exercises]').onclick=()=>opts.onExercises?.();
    function exerciseLink(exercise){
      const available=opts.availableExercises?.includes(exercise),b=root.querySelector('[data-exercises]');
      b.textContent=available?'Practise Exercise '+exercise+' ↗':'Open chapter exercises ↗';
      b.onclick=()=>available?opts.onExercise?.(exercise):opts.onExercises?.();
    }
    function select(label,key,items,initial,callback) {
      const id='mc-'+active+'-'+key,el=document.createElement('label');el.className='mc-control';el.htmlFor=id;
      el.innerHTML='<span>'+esc(label)+'</span><select id="'+id+'" data-control="'+key+'">'+items.map(([v,t])=>'<option value="'+esc(v)+'"'+(String(v)===String(initial)?' selected':'')+'>'+esc(t)+'</option>').join('')+'</select>';
      panel.querySelector('[data-controls]').append(el);el.querySelector('select').onchange=e=>{set(key,e.target.value);callback(e.target.value);};
    }
    function button(label,action,key,primary=false){const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.action=key;if(primary)b.className='mc-primary';b.onclick=action;panel.querySelector('[data-controls]').append(b);return b;}
    const visual=html=>{panel.querySelector('[data-visual]').innerHTML=html;};
    const result=html=>{panel.querySelector('[data-result]').innerHTML=html;};
    const takeaway=text=>{panel.querySelector('[data-takeaway]').textContent=text;};
    function show(i,navigate=false){
      if(i<0||i>=scenes.length)return;active=i;persist();index.hidden=true;indexButton.setAttribute('aria-expanded','false');
      opts.onConcept?.(i,!navigate);const s=scenes[i];root.querySelector('[data-position]').textContent='Explore '+(i+1)+' / '+scenes.length;
      root.querySelectorAll('[data-scene]').forEach((b,j)=>b.setAttribute('aria-current',j===i?'step':'false'));
      root.querySelector('[data-prev]').disabled=i===0;root.querySelector('[data-next]').textContent=i===scenes.length-1?'Try exercises ↗':'Next →';
      panel.innerHTML='<header class="mc-scene-heading"><p>§'+esc(s.section)+' · '+esc(s.title)+'</p><h3 tabindex="-1">'+esc(s.question)+'</h3></header><div class="mc-stage"><div class="mc-visual" data-visual></div><div class="mc-controls" data-controls></div><div class="mc-result" data-result role="status" aria-live="polite" aria-atomic="true"></div></div><p class="mc-takeaway" data-takeaway></p><div class="mc-secondary"><button type="button" data-proof>Understand deeper</button><button type="button" data-check-toggle aria-expanded="false">Predict & check</button></div><div class="mc-check" data-check hidden><p>'+esc(s.check)+'</p><div>'+s.options.map((o,j)=>'<button type="button" data-answer="'+j+'">'+esc(o)+'</button>').join('')+'</div><p data-feedback role="status"></p><button type="button" data-reason>Reveal the reasoning</button></div>';
      panel.querySelector('[data-check-toggle]').onclick=e=>{const el=panel.querySelector('[data-check]');el.hidden=!el.hidden;e.target.setAttribute('aria-expanded',String(!el.hidden));};
      panel.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{set('prediction',+b.dataset.answer);panel.querySelector('[data-feedback]').textContent=s.feedback[+b.dataset.answer];b.setAttribute('aria-pressed','true');panel.querySelectorAll('[data-answer]').forEach(other=>{if(other!==b)other.setAttribute('aria-pressed','false');});});
      panel.querySelector('[data-reason]').onclick=()=>{panel.querySelector('[data-feedback]').textContent=s.feedback[s.answer];};
      panel.querySelector('[data-proof]').onclick=()=>{
        const d=document.createElement('dialog');d.className='mc-dialog';d.setAttribute('aria-labelledby','mc-proof-title');
        d.innerHTML='<form method="dialog"><button type="submit" autofocus>Close ×</button></form><h3 id="mc-proof-title">'+esc(s.title)+' · why it works</h3>'+s.proof.split('. ').map(t=>'<p>'+esc(t)+(t.endsWith('.')?'':'.')+'</p>').join('')+'<small>Book anchor: §'+esc(s.section)+' · printed pp'+esc(s.pages)+'. Original teaching explanation.</small>';
        d.addEventListener('close',()=>d.remove());root.append(d);d.showModal();
      };
      [cofactor,undo,order,frames,secret,rows,identity,systems,consistency][i]();
      if(i!==7)exerciseLink(i<5?'1.1':i<7?'1.2':null);
      if(navigate){panel.querySelector('h3').focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'instant'});}
    }
    function cofactor(){
      const size=setting('size','3',['2','3']),A=size==='3'?[[2,1,0],[1,3,2],[0,1,1]]:[[2,1],[1,3]],n=A.length;
      let cell=Array.isArray(states[active].cell)&&states[active].cell.length===2&&states[active].cell.every(x=>Number.isInteger(x)&&x>=0&&x<n)?states[active].cell:[0,1];
      let step=setting('step',0,[0,1,2,3]);
      select('Matrix order','size',[['2','2 × 2'],['3','3 × 3']],size,()=>{set('cell',[0,1]);set('step',0);show(active);});
      const next=button('Reveal minor →',()=>{step=(step+1)%4;set('step',step);draw();},'cofactor-step',true);
      function draw(){
        const [i,j]=cell,sub=M.minorMatrix(A,i,j),minor=M.det(sub),co=M.cofactor(A,i,j),C=M.cofactors(A),adj=M.adjoint(A);
        const extra=step===0?'<p class="mc-caption">Tap an entry. Rows run across; columns run down.</p>':step<3?'<div class="mc-equation"><span>Surviving matrix</span>'+mat(sub,'Surviving submatrix')+'</div>':'<div class="mc-equation"><span>adj(A) = Cᵀ</span>'+mat(adj,'Adjoint of A',{transpose:true,cell:[j,i]})+'</div>';
        visual('<div class="mc-equation"><b>A =</b>'+mat(A,'Matrix A',{cell,tap:true,fade:step>0})+'</div>'+extra);
        panel.querySelectorAll('[data-cell]').forEach(b=>b.onclick=()=>{cell=b.dataset.cell.split(',').map(Number);set('cell',cell);draw();});
        if(step===0)result('a<sub>'+(i+1)+(j+1)+'</sub> = '+f(A[i][j])+' · row '+(i+1)+', column '+(j+1)+'. Order: '+n+' × '+n+'.');
        if(step===1)result('M<sub>'+(i+1)+(j+1)+'</sub> = '+(n===3?f(sub[0][0])+' × '+f(sub[1][1])+' − '+f(sub[0][1])+' × '+f(sub[1][0])+' = ':'')+f(minor)+'<br><small>A minor is a determinant: one number.</small>');
        if(step===2)result('C<sub>'+(i+1)+(j+1)+'</sub> = '+((i+j)%2?'−1':'1')+' × ('+f(minor)+') = '+f(co)+'<div class="mc-signs" aria-label="Alternating cofactor signs">'+Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>(r+c)%2?'−':'+').join('　')).join('<br>')+'</div>');
        if(step===3)result('<span>C (cofactor matrix) =</span> '+mat(C,'Cofactor matrix',{cell})+'<br>C<sub>'+(i+1)+(j+1)+'</sub> moves to adj(A)<sub>'+(j+1)+(i+1)+'</sub>. det(A) = '+f(M.det(A))+'.');
        next.textContent=['Reveal minor →','Apply cofactor sign →','Transpose into adjoint →','Start again ↺'][step];
        takeaway(['An entry’s two indices tell you its row and column.','Delete the selected row and column; take the surviving determinant.','Cofactor = minor × checkerboard sign: (−1)ⁱ⁺ʲ.','The adjoint is the transpose of the cofactor matrix. A determinant is a number.'][step]);
      }draw();
    }
    function undo(){
      let t=+setting('height','1',['0','1','2']),phase=setting('phase',0,[0,1,2]);if(!t&&phase===2)phase=1;
      select('Vertical scale','height',[['1','1 · invertible'],['2','2 · stretch'],['0','0 · flatten']],String(t),v=>{t=+v;phase=0;set('phase',0);draw();});
      const apply=button('Apply A →',()=>{phase=1;set('phase',phase);draw();},'apply',true),back=button('Undo with A⁻¹',()=>{phase=2;set('phase',phase);draw();},'undo');
      button('Reset',()=>{phase=0;set('phase',0);draw();},'reset');
      function draw(){
        const A=[[2,1],[0,t]],inv=M.inverse(A),square=[[0,0],[1,0],[1,1],[0,1]],current=phase===1?square.map(p=>M.numbers(M.product(A,p.map(x=>[x]))).flat()):square;
        const polygon=arr=>arr.map(x=>xy(x).join(',')).join(' '),P=[1,1],out=M.numbers(M.product(A,[[1],[1]])).flat(),cur=phase===1?out:P;
        visual(plane('<polygon points="'+polygon(square)+'" class="mc-ghost"/><polygon points="'+polygon(current)+'" class="mc-shape"/>'+dot(cur,phase===1?'AP':'P'),'Unit square '+(phase===1?'after A':'at its original position'))+'<div class="mc-equation"><b>A =</b>'+mat(A,'Transformation A')+'<span>det(A) = '+f(M.det(A))+'</span></div>');
        result(phase===0?'P = (1, 1). Predict its output, then apply A.':phase===1?'AP = '+point(out)+'<br><small>(2 × 1 + 1 × 1, 0 × 1 + '+t+' × 1)</small>'+(inv?'<br>The shape has '+(2*t)+' times its original area.':'<br>P = (1, 1) and Q = (2, −1) both map to (3, 0). Recovery is ambiguous.'):'A⁻¹(AP) = (1, 1).<div class="mc-equation"><span>A⁻¹ =</span>'+mat(inv,'Inverse of current A')+'</div><small>AA⁻¹ = '+(M.same(M.product(A,inv),M.identity(2))?'I':'error')+'; A⁻¹A = '+(M.same(M.product(inv,A),M.identity(2))?'I':'error')+'.</small>');
        back.disabled=!inv||phase!==1;apply.disabled=phase===1;
        takeaway(!inv?'det(A) = 0: distinct inputs merge, so no inverse exists.':phase===2?'The inverse restores every input; I is the “do nothing” matrix.':'A⁻¹ = adj(A) / det(A), only when det(A) ≠ 0.');
      }draw();
    }
    function order(){
      let step=setting('step',0,[0,1,2,3,4]);const A=[[1,1],[0,1]],B=[[2,0],[0,1]],v=[[1],[1]],AB=M.product(A,B),stages=[v,M.product(B,v),M.product(AB,v),M.product(B,v),v];
      const next=button('Apply B →',()=>{step=(step+1)%5;set('step',step);draw();},'order-step',true);button('Reset',()=>{step=0;set('step',0);draw();},'reset');
      function draw(){const p=M.numbers(stages[step]).flat();visual(plane(segment([0,0],p,'mc-line-primary')+dot(p,'v'),'Current vector '+point(p))+'<div class="mc-flow">B: stretch x → A: shear<br>A⁻¹: unshear → B⁻¹: unstretch</div>');
        result(['v = (1, 1)','Bv = (2, 1)','A(Bv) = (3, 1)','A⁻¹(ABv) = Bv = (2, 1)','B⁻¹A⁻¹(ABv) = v = (1, 1)'][step]+'<div class="mc-equation"><span>A =</span>'+mat(A,'A shear')+'<span>B =</span>'+mat(B,'B stretch')+'</div>');
        next.textContent=['Apply B →','Apply A →','Undo A first →','Undo B next →','Start again ↺'][step];takeaway('AB applies B first, then A. (AB)⁻¹ = B⁻¹A⁻¹ reverses that order.');}draw();
    }
    function frames(){
      let mode=setting('mode','axes',['axes','point']),angle=+setting('angle','90',['0','30','45','90']);
      select('What turns?','mode',[['axes','Rotate axes'],['point','Rotate point']],mode,v=>{mode=v;draw();});
      select('Counterclockwise angle','angle',[['0','0°'],['30','30°'],['45','45°'],['90','90°']],String(angle),v=>{angle=+v;draw();});
      function draw(){const R=M.rotation(angle),inverse=M.rotation(angle,true),P=[2,0],coords=M.applyFloat(mode==='axes'?inverse:R,P),c=Math.cos(angle*Math.PI/180),s=Math.sin(angle*Math.PI/180);
        const axes=mode==='axes'?segment([-3*c,-3*s],[3*c,3*s],'mc-line-secondary')+segment([3*s,-3*c],[-3*s,3*c],'mc-line-secondary')+dot([2.8*c,2.8*s],'X','secondary')+dot([-2.8*s,2.8*c],'Y','secondary'):'';
        visual(plane(dot(mode==='axes'?P:coords,mode==='axes'?'P fixed':'P′')+(mode==='point'?dot(P,'P','secondary'):''),mode==='axes'?'Point P stays at (2, 0) while the axes turn':'Point P rotates around the origin',axes));
        result((mode==='axes'?'Old (x, y) = (2, 0)<br>New (X, Y) ≈ ':'Original P = (2, 0)<br>Rotated P′ ≈ ')+point(coords)+'<br><small>Graph coordinates rounded to 2 decimals.</small><div class="mc-equation">'+mat(mode==='axes'?[['cosθ','sinθ'],['−sinθ','cosθ']]:[['cosθ','−sinθ'],['sinθ','cosθ']],mode==='axes'?'Passive rotation matrix':'Active rotation matrix')+'</div>');
        takeaway(mode==='axes'?'Axes turn; the point stays. New coordinates use R(−θ).':'Point turns; the axes stay. New point uses R(θ).');}draw();
    }
    function secret(){
      let message=setting('message','HI',['HI','GO','MATH']),key=setting('key','one',['one','two']),phase=setting('phase',0,[0,1,2]);
      select('Message','message',[['HI','HI'],['GO','GO'],['MATH','MATH']],message,v=>{message=v;phase=0;set('phase',0);draw();});
      select('Encoding key','key',[['one','Key 1'],['two','Key 2']],key,v=>{key=v;phase=0;set('phase',0);draw();});
      const next=button('Encode →',()=>{phase=(phase+1)%3;set('phase',phase);draw();},'cipher-step',true);
      function draw(){const K=key==='one'?[[1,1],[1,2]]:[[2,1],[1,1]],e=M.encode(message,K),inv=M.inverse(K),decoded=M.product(e.coded,inv);
        visual('<div class="mc-message">'+esc(message)+'</div><p class="mc-caption">A = 1 … Z = 26 · blank = 0</p><div class="mc-equation"><span>'+['Letter pairs','Coded rows','Recovered rows'][phase]+'</span>'+mat(phase===0?e.plain:phase===1?e.coded:decoded,'Message number rows')+'</div><div class="mc-equation"><span>'+(phase===2?'K⁻¹':'K')+' =</span>'+mat(phase===2?inv:K,'Cipher key')+'</div>');
        result(phase===0?'Each letter pair becomes a row. Multiply each row on the right by K.':phase===1?'First pair: '+mat([e.plain[0]],'First plain pair')+' × K = '+mat([e.coded[0]],'First coded pair'):mat([e.coded[0]],'First coded pair')+' × K⁻¹ = '+mat([decoded[0]],'First decoded pair')+'<br>Recovered message: '+esc(message));
        next.textContent=['Encode →','Decode with K⁻¹ →','Start again ↺'][phase];takeaway('c = pK; cK⁻¹ = p. A classroom model, not modern secure encryption.');}draw();
    }
    function rows(){
      const start=[[1,1,3],[2,3,8],[1,2,5]];let history=[];
      try{if(Array.isArray(states[active].history)&&states[active].history.length<=12)history=states[active].history.map(A=>{if(A.length!==3||A.some(r=>r.length!==3))throw Error();return M.matrix(A);});}catch{history=[];}
      let A=history.length?history[history.length-1]:M.matrix(start),kind=setting('kind','add',['add','swap','scale']),target=setting('target','2',['1','2','3']),source=setting('source','1',['1','2','3']),scalar=setting('scalar','-2',['-2','-1','0','1','2']);
      select('Operation','kind',[['add','Add a row multiple'],['swap','Swap two rows'],['scale','Scale one row']],kind,v=>{kind=v;draw();});
      select('Change row','target',[['1','R₁'],['2','R₂'],['3','R₃']],target,v=>{target=v;draw();});
      select('Other row','source',[['1','R₁'],['2','R₂'],['3','R₃']],source,v=>{source=v;draw();});
      select('Multiplier k','scalar',[['-2','−2'],['-1','−1'],['0','0'],['1','1'],['2','2']],scalar,v=>{scalar=v;draw();});
      const apply=button('Apply row operation',()=>perform({kind,target:+target-1,source:+source-1,k:+scalar}),'row-apply',true);
      button('Undo step',()=>{history.pop();A=history.length?history[history.length-1]:M.matrix(start);set('history',history);draw();},'row-undo');
      button('Reset',()=>{history=[];A=M.matrix(start);set('history',history);draw();},'reset');
      function perform(op){try{A=M.row(A,op);history.push(A);set('history',history);draw();}catch(e){result(esc(e.message));}}
      function draw(){const ec=M.echelon(A),invalid=(kind==='scale'&&+scalar===0)||(kind!=='scale'&&target===source);
        visual('<div class="mc-equation">'+mat(A,'Augmented matrix of three equations',{split:2,pivots:ec.ok?ec.pivots:null})+'</div><p class="mc-caption">Last column = constants. Drag row labels to swap, or use the controls.</p><div class="mc-drag-rows">'+A.map((_,i)=>'<button type="button" draggable="true" data-drag-row="'+i+'" aria-label="Row '+(i+1)+': drag to swap; use Swap controls with keyboard">R'+(i+1)+'</button>').join('')+'</div>');
        let drag=null;panel.querySelectorAll('[data-drag-row]').forEach(b=>{b.setAttribute('aria-label','Row '+(+b.dataset.dragRow+1)+': select as target row, or drag to swap');b.onclick=()=>{target=String(+b.dataset.dragRow+1);set('target',target);panel.querySelector('[data-control="target"]').value=target;draw();};b.ondragstart=e=>{drag=+b.dataset.dragRow;e.dataTransfer.setData('text/plain',String(drag));};b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();const from=drag===null?Number(e.dataTransfer.getData('text/plain')):drag,to=+b.dataset.dragRow;if(from!==to&&Number.isInteger(from)&&from>=0&&from<3&&history.length<12)perform({kind:'swap',target:to,source:from});drag=null;};});
        apply.disabled=invalid||history.length>=12;
        result(invalid?(kind==='scale'?'k must be nonzero. Multiplying by zero would erase an equation.':'Choose two different rows.'):history.length>=12?'12 steps explored. Reset to start a fresh sequence.':(kind==='add'?'R'+target+' ← R'+target+' + ('+scalar+')R'+source:kind==='swap'?'R'+target+' ↔ R'+source:'R'+target+' ← ('+scalar+')R'+target)+'<br>'+(ec.ok?'Echelon form: pivots step right; any zero rows are at the bottom.':'Not yet echelon form. Try R₂ ← R₂ − 2R₁, then R₃ ← R₃ − R₁, then R₃ ← R₃ − R₂.'));
        takeaway('Every legal operation is reversible and changes the whole equation, including its constant.');
      }draw();
    }
    function identity(){
      let mode=setting('mode','rank',['rank','inverse']),caseName=setting('case','dependent',['dependent','independent','singular']),step=setting('step',0,[0,1,2]);
      select('Explore','mode',[['rank','Independence detector'],['inverse','Build an inverse']],mode,v=>{mode=v;show(active);});
      if(mode==='rank')select('Third row','case',[['dependent','R₃ = R₁ + R₂'],['independent','R₃ adds a direction']],caseName==='independent'?'independent':'dependent',v=>{caseName=v;draw();});
      else {select('Matrix A','case',[['independent','Invertible'],['singular','Singular']],caseName==='singular'?'singular':'independent',v=>{caseName=v;step=0;set('step',0);draw();});button('Next row step →',()=>{step=Math.min(2,step+1);set('step',step);draw();},'identity-step',true);button('Reset',()=>{step=0;set('step',0);draw();},'reset');}
      function draw(){
        if(mode==='rank'){const A=[[1,0,1],[0,1,1],caseName==='independent'?[1,1,3]:[1,1,2]],reduced=M.rref(A);
          visual('<div class="mc-equation"><span>A</span>'+mat(A,'Original matrix')+'<span>→</span>'+mat(reduced.matrix,'Reduced matrix',{pivots:reduced.pivots})+'</div><div class="mc-rank-count">'+reduced.rank+'<span>independent rows</span></div>');
          result('ρ(A) = '+reduced.rank+'. '+(reduced.rank===2?'R₃ − R₁ − R₂ = [0, 0, 0]. The third row adds no new information.':'R₃ − R₁ − R₂ = [0, 0, 1]. A third pivot survives.'));
          takeaway('Rank ρ(A) counts pivots, not simply the nonzero rows in the starting matrix.');
        }else {const A=caseName==='singular'?[[1,2],[2,4]]:[[1,2],[1,3]],I=M.identity(2);let aug=A.map((r,i)=>[...r,...I[i]]);
          if(step>=1)aug=M.row(aug,{kind:'add',target:1,source:0,k:caseName==='singular'?-2:-1});
          if(step===2&&caseName!=='singular')aug=M.row(aug,{kind:'add',target:0,source:1,k:-2});
          visual('<p class="mc-caption">Apply the same row operation to both blocks.</p><div class="mc-equation">'+mat(aug,'Gauss–Jordan augmented matrix',{split:2})+'</div><p class="mc-flow">[ A | I ] → [ I | A⁻¹ ]</p>');
          result(step===0?'Start with A beside the identity I.':caseName==='singular'?'R₂ ← R₂ − 2R₁. The left block has a zero row: it cannot become I. No inverse exists.':step===1?'R₂ ← R₂ − R₁. The second pivot is now 1.':'R₁ ← R₁ − 2R₂. Left block = I. Right block = A⁻¹. Check A × '+mat(M.inverse(A),'Computed inverse')+' = I.');
          panel.querySelector('[data-action="identity-step"]').disabled=step===2||(caseName==='singular'&&step>=1);
          takeaway('Row operations multiply both blocks by the same matrix. Once the left is I, the right is the inverse.');
        }
      }draw();
    }
    function systems(){
      let slope=setting('slope','-1',['-1','1']),rhs=setting('rhs','1',['1','3','5']),method=setting('method','inverse',['inverse','cramer','gaussian']);
      select('Second line: y = mx + b','slope',[['-1','m = −1 · intersects'],['1','m = 1 · parallel or same']],slope,v=>{slope=v;draw();});
      select('Intercept b','rhs',[['1','b = 1'],['3','b = 3'],['5','b = 5']],rhs,v=>{rhs=v;draw();});
      select('Solution method','method',[['inverse','Matrix inverse'],['cramer','Cramer’s rule'],['gaussian','Gaussian elimination']],method,v=>{method=v;draw();});
      function draw(){
        const m=+slope,b=+rhs,A=[[-1,1],[-m,1]],B=[[1],[b]],S=M.solve(A,B),X=S.solution,D=M.det(A),line1=[[-3,-2],[3,4]],line2=[[-3,-3*m+b],[3,3*m+b]];
        exerciseLink(method==='inverse'?'1.3':method==='cramer'?'1.4':'1.5');
        let graph=segment(...line1,'mc-line-primary')+segment(...line2,'mc-line-secondary');if(X)graph+=dot(M.numbers(X).flat(),'solution');
        visual(plane(graph,'Line 1 y = x + 1. Line 2 y = '+m+'x + '+b+'. '+S.type+' solution(s).')+'<p class="mc-caption">AX = B · coefficients × unknowns = constants</p><div class="mc-equation">'+mat(A,'Coefficient matrix A')+'<span>×</span>'+mat([['x'],['y']],'Unknown column X')+'<span>=</span>'+mat(B,'Constants B')+'</div>');
        let calculation='';
        if(!D.n&&method!=='gaussian')calculation='det(A) = 0. '+(method==='inverse'?'A⁻¹ does not exist.':'Cramer’s unique-solution formula cannot divide by 0.')+' Compare ranks or use elimination.';
        else if(method==='inverse')calculation='X = A⁻¹B = '+mat(M.inverse(A),'Inverse')+' × '+mat(B,'B')+' = '+mat(X,'Solution X');
        else if(method==='cramer'){const dx=M.det(A.map((r,i)=>[B[i][0],r[1]])),dy=M.det(A.map((r,i)=>[r[0],B[i][0]]));calculation='det(A) = '+f(D)+'; det(Aₓ) = '+f(dx)+'; det(Aᵧ) = '+f(dy)+'<br>x = '+f(M.div(dx,D))+', y = '+f(M.div(dy,D))+'.';}
        else {const E=M.row(A.map((r,i)=>[...r,B[i][0]]),{kind:'add',target:1,source:0,k:-m});calculation='R₂ ← R₂ '+(m===1?'−':'+')+' R₁: '+mat(E,'Eliminated system',{split:2})+(X?'<br>Back-substitute: y = '+f(X[1][0])+', x = y − 1 = '+f(X[0][0])+'.':S.type==='none'?'<br>Last row says 0 = '+(b-1)+': impossible.':'<br>Last row says 0 = 0: one equation is redundant.');}
        result('<b>'+(S.type==='unique'?'One intersection '+point(X.map(r=>r[0])):S.type==='infinite'?'Same line · infinitely many solutions':'Distinct parallel lines · no solution')+'</b><br>'+calculation);
        takeaway('First condition: y = x + 1. Second: y = '+m+'x + '+b+'. Collecting coefficients gives AX = B.');
      }draw();
    }
    function consistency(){
      let caseName=setting('case','dependent',['unique','dependent','conflict','three']),homogeneous=setting('homogeneous','no',['yes','no']);
      select('Coefficient pattern','case',[['unique','Two independent equations'],['dependent','One repeated equation'],['conflict','Repeated coefficients, changed RHS'],['three','Three unknowns, two pivots']],caseName,v=>{caseName=v;draw();});
      select('Right-hand side','homogeneous',[['no','Nonhomogeneous B'],['yes','Homogeneous: B = 0']],homogeneous,v=>{homogeneous=v;draw();});
      function draw(){const A=caseName==='unique'?[[1,1],[1,-1]]:caseName==='three'?[[1,0,1],[0,1,1]]:[[1,1],[2,2]],B=homogeneous==='yes'?[[0],[0]]:caseName==='unique'?[[3],[1]]:caseName==='three'?[[1],[2]]:caseName==='conflict'?[[3],[7]]:[[3],[6]],S=M.solve(A,B),n=A[0].length;
        visual('<p class="mc-caption">A = coefficients · B = constants<br>ρ means rank · n = '+n+' unknowns</p><div class="mc-equation"><span>[A | B]</span>'+mat(A.map((r,i)=>[...r,B[i][0]]),'Augmented starting matrix',{split:n})+'<span>→</span>'+mat(S.reduced,'Reduced augmented matrix',{split:n})+'</div><div class="mc-ranks"><span>ρ(A)<b>'+S.rankA+'</b></span><strong>'+(S.rankA===S.rankAug?'=':'≠')+'</strong><span>ρ([A | B])<b>'+S.rankAug+'</b></span></div>');
        result(S.type==='none'?'Inconsistent: a row says 0 = 1. The augmented column adds a pivot.':S.type==='unique'?'Consistent and unique: rank = n = '+n+'. '+(homogeneous==='yes'?'Only the trivial solution X = 0.':'X = '+mat(S.solution,'Unique solution')):'Consistent: rank '+S.rankA+' < n = '+n+'. '+S.free+' free variable; infinitely many solutions.'+(homogeneous==='yes'?'<br>Zero is one solution; nonzero solutions also exist.':''));
        takeaway(homogeneous==='yes'?'AX = 0 is always consistent. Nonzero solutions exist exactly when ρ(A) < n.':'Equal ranks decide existence. Comparing their common rank with n decides uniqueness.');
      }draw();
    }
    show(active);
    return root;
  }
  window.TriggleMatrixConcepts=Object.freeze({scenes,mount});
})();
