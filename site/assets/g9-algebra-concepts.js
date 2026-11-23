/* Original, local-only Grade 9 polynomial powers highlighter. */
(() => {
  'use strict';

  const memory = { demo: 0, transfer: {} };
  const text = (en,ta,lang) => lang === 'ta' ? ta : en;
  const make = (tag,cls,copy) => {
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(copy!==undefined)el.textContent=copy;
    return el;
  };
  const latex = (expr,fallback,display=false) => {
    const engine=window.TriggleNotation;
    if(!engine || typeof engine.renderLatex!=='function'){
      const fallbackSpan=make('span','g9a-math-fallback',fallback);
      return fallbackSpan.outerHTML;
    }
    return engine.renderLatex(expr,{displayMode:display,fallback});
  };
  const examples=[
    {
      label:'3x² + 2x + 5',spoken:'three x squared plus two x plus five',
      math:'3x^2+2x+5',rewrite:null,
      powers:[['3x²','2',true],['2x','1',true],['5','0',true]],
      en:'Polynomial. Every power of x is a whole number: 2, 1 and 0.',
      ta:'பல்லுறுப்புக் கோவை. x-இன் அடுக்குகள் 2, 1, 0 ஆகிய அனைத்தும் முழு எண்கள்.'
    },
    {
      label:'x⁻¹ + 2',spoken:'x to the negative first power plus two',
      math:'x^{-1}+2',rewrite:null,
      powers:[['x⁻¹','−1',false],['2','0',true]],
      en:'Not a polynomial in x. The exponent −1 is negative, not a whole number.',
      ta:'x-இல் பல்லுறுப்புக் கோவை அல்ல. −1 என்பது முழு எண் அல்ல; அது குறை முழு.'
    },
    {
      label:'√x + 1',spoken:'square root of x plus one',
      math:'\\sqrt{x}+1',rewrite:'\\sqrt{x}=x^{\\frac{1}{2}}\\quad(x\\ge 0)',
      powers:[['√x','½',false],['1','0',true]],
      en:'Not a polynomial in x. The exponent ½ is a fraction, not a whole number.',
      ta:'x-இல் பல்லுறுப்புக் கோவை அல்ல. ½ என்பது பின்ன அடுக்கு; முழு எண் அல்ல.'
    }
  ];
  const transfers=[
    {math:'7',fallback:'7',answer:true,
      en:'7 is a nonzero constant polynomial. Its degree is 0.',
      ta:'7 என்பது பூச்சியமற்ற மாறிலிப் பல்லுறுப்புக் கோவை. அதன் படி 0.'},
    {math:'-2x^3+\\dfrac{1}{2}',fallback:'−2x³ + ½',answer:true,
      en:'The powers are 3 and 0. Negative and fractional coefficients are allowed.',
      ta:'அடுக்குகள் 3 மற்றும் 0. குறை எண்களும் பின்னங்களும் கெழுக்களாக வரலாம்.'},
    {math:'\\dfrac{5}{x}',fallback:'5/x',answer:false,
      en:'For x ≠ 0, 5/x = 5x⁻¹. The exponent −1 is not a whole number.',
      ta:'x ≠ 0 எனில் 5/x = 5x⁻¹. அடுக்கு −1 என்பது முழு எண் அல்ல.'}
  ];
  function mount(panel,stage,lang){
    const ta=lang==='ta';
    panel.replaceChildren();
    const heading=make('div','sp2-concept-heading');
    heading.tabIndex=-1;
    heading.append(make('h4','',text('1. Which expressions are polynomials?','1. எவை பல்லுறுப்புக் கோவைகள்?',lang)));
    panel.append(heading);
    const root=make('section','g9a-lab');
    root.setAttribute('aria-label',text('Polynomial powers highlighter','பல்லுறுப்புக் கோவையின் அடுக்குகளை அறிதல்',lang));
    const rule=make('p','g9a-rule',text('Check the power of x: 0, 1, 2, 3, … are allowed.','x-இன் அடுக்கைச் சரிபார்: 0, 1, 2, 3, … ஆகியவை ஏற்கப்படும்.',lang));
    root.append(rule);
    const group=make('div','g9a-choices');
    group.setAttribute('role','group');
    group.setAttribute('aria-label',text('Choose an expression','ஒரு கோவையைத் தேர்ந்தெடுக்கவும்',lang));
    const buttons=examples.map((example,i)=>{
      const b=make('button','g9a-option',example.label);
      b.type='button';
      b.setAttribute('aria-label',example.spoken);
      b.addEventListener('click',()=>{memory.demo=i;draw();});
      group.append(b);return b;
    });
    root.append(group);
    const output=make('div','g9a-stage');
    output.setAttribute('role','status');
    output.setAttribute('aria-live','polite');
    output.setAttribute('aria-atomic','true');
    const expression=make('div','g9a-expression');
    const rewrite=make('div','g9a-rewrite');
    const chipGroup=make('div','g9a-powers');
    const verdict=make('p','g9a-verdict');
    output.append(expression,rewrite,chipGroup,verdict);
    root.append(output);
    function draw(){
      const example=examples[memory.demo];
      buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(memory.demo===i)));
      expression.innerHTML=latex(example.math,example.label,true);
      rewrite.hidden=!example.rewrite;
      rewrite.innerHTML=example.rewrite?latex(example.rewrite,'√x = x^(1/2), for x ≥ 0',false):'';
      chipGroup.replaceChildren();
      example.powers.forEach(([term,power,valid])=>{
        const chip=make('span','g9a-chip '+(valid?'g9a-valid':'g9a-invalid'));
        const icon=make('span','g9a-icon',valid?'✓':'✕');
        icon.setAttribute('aria-hidden','true');
        chip.append(icon,document.createTextNode(term+' → '+text('power ','அடுக்கு ',lang)+power));
        chipGroup.append(chip);
      });
      verdict.textContent=ta?example.ta:example.en;
      verdict.classList.toggle('g9a-incorrect',example.powers.some(x=>!x[2]));
    }
    draw();
    panel.append(root);

    const practice=make('section','g9a-practice');
    practice.append(make('h5','',text('Try three new expressions','மூன்று புதிய கோவைகளை முயற்சிக்கவும்',lang)));
    const prompt=make('p','g9a-small',text('Is each expression a polynomial in x?','ஒவ்வொரு கோவையும் x-இல் பல்லுறுப்புக் கோவையா?',lang));
    practice.append(prompt);
    transfers.forEach((item,i)=>{
      const row=make('div','g9a-transfer');
      const formula=make('div','g9a-transfer-math');
      formula.innerHTML=latex(item.math,item.fallback,false);
      const answers=make('div','g9a-answer-options');
      answers.setAttribute('role','group');
      answers.setAttribute('aria-label',text('Classify expression '+(i+1),'கோவை '+(i+1)+'-ஐ வகைப்படுத்து',lang));
      const feedback=make('p','g9a-feedback');
      feedback.setAttribute('role','status');
      feedback.setAttribute('aria-live','polite');
      const yes=make('button','',text('Polynomial','பல்லுறுப்புக் கோவை',lang));
      const no=make('button','',text('Not a polynomial','பல்லுறுப்புக் கோவை அல்ல',lang));
      [yes,no].forEach((btn,j)=>{
        btn.type='button';
        btn.addEventListener('click',()=>{memory.transfer[i]=j===0;refresh();});
        answers.append(btn);
      });
      function refresh(){
        const selection=memory.transfer[i];
        [yes,no].forEach((b,j)=>b.setAttribute('aria-pressed',String(selection===(j===0))));
        if(typeof selection==='boolean'){
          const correct=selection===item.answer;
          feedback.textContent=(correct?text('Correct. ','சரி. ',lang):text('Check again. ','மீண்டும் சரிபார். ',lang))+(ta?item.ta:item.en);
          feedback.classList.toggle('g9a-incorrect',!correct);
        }
      }
      row.append(formula,answers,feedback);
      practice.append(row);
      refresh();
    });
    panel.append(practice);
    const details=make('details','g9a-deep');
    details.append(make('summary','',text('Understand the idea','கருத்தைப் புரிந்துகொள்வோம்',lang)));
    const list=make('ul','');
    const ideas=ta?[
      'மாறி x-இன் அடுக்குகள் 0, 1, 2, ... என்ற முழு எண்களாக இருக்க வேண்டும்.',
      'கெழு என்பது x-க்கு முன்னுள்ள எண். −2, ½ போன்ற மெய்யெண்களும் கெழுக்களாக வரலாம்.',
      'x-இன் அடுக்கு எழுதப்படாவிட்டால் அது 1. பூச்சியமற்ற மாறிலியின் படி 0.',
      '0 என்பதும் ஒரு பல்லுறுப்புக் கோவை. ஆனால் பூச்சியப் பல்லுறுப்புக் கோவையின் படி வரையறுக்கப்படவில்லை.',
      'x ≠ 0 எனும்போது x⁰ = 1. 0⁰ பற்றிய விதியை இங்கு பயன்படுத்த வேண்டாம்.'
    ]:[
      'The powers of variable x must be whole numbers: 0, 1, 2, ... .',
      'A coefficient is a number multiplying a power of x. Real coefficients such as −2 or ½ are allowed.',
      'When x has no written exponent, its exponent is 1. A nonzero constant polynomial has degree 0.',
      'The expression 0 is also a polynomial, but the degree of the zero polynomial is undefined.',
      'For x ≠ 0, x⁰ = 1. Do not use this statement to assign a value to 0⁰.'
    ];
    ideas.forEach(s=>list.append(make('li','',s)));
    details.append(list);panel.append(details);
    const source=make('small','g9a-source',text('2025 State Board Mathematics · §3.2 · English printed p. 81 · Tamil printed p. 88','2025 கணிதப் பாடநூல் · §3.2 · ஆங்கிலம் ப. 81 · தமிழ் ப. 88',lang));
    panel.append(source);
    if(ta)panel.append(make('p','g9a-review','தமிழ் கற்றல் உரைவு · ஆசிரியர் மீளாய்வு நிலுவையில் உள்ளது.'));
  }
  window.TriggleG9AlgebraConcepts=Object.freeze({mount});
})();