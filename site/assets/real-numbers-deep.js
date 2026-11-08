/* Real Numbers: hard-problem-only staged Detailed Explanation, preserving existing deep lessons. */
(()=>{'use strict';
 const original=window.TriggleDeep;
 if(!original?.build||!original?.hasLesson)throw Error('Deep lesson base missing');
 const pick=(x,lang)=>typeof x==='string'?x:(x?.[lang]||x?.en||'');
 const isHard=id=>Boolean(window.TRIGGLE_CLASSES?.[9]?.items?.find(x=>x.id===id&&x.chapter==='2'&&x.difficulty==='hard'));
 const concepts={
  rational:{
   reason:{en:'Recurring decimals represent exact rational numbers. Align repeating tails before subtraction; the infinite sequences then cancel exactly.',ta:'தொடர்தசமங்கள் துல்லியமான விகிதமுறு எண்கள். மீளும் பகுதிகளை ஒழுங்குபடுத்திப் பின்னர் கழித்தால் அவை முற்றிலும் நீங்கும்.'},
   error:{en:'Do not treat a repeating decimal as if it ended after three or six digits.',ta:'தொடர்தசமம் சில இலக்கங்களுடன் முடிந்துவிட்டதாகக் கருத வேண்டாம்.'},
   verify:{en:'Multiply the fraction back to recover the recurring digits.',ta:'கிடைத்த பின்னத்தை மீண்டும் தசமமாக மாற்றி மீளும் இலக்கங்களைச் சரிபார்க்கவும்.'}
  },
  surd:{
   reason:{en:'First separate perfect-square or perfect-cube factors. Only like radicals can have coefficients combined; positive powers preserve numerical order.',ta:'முதலில் நிறைவர்க்க/நிறைகனக் காரணிகளைப் பிரிக்கவும். ஒரே முறுடுகளின் கெழுக்களை மட்டுமே சேர்க்கலாம்; நேர்மறை அடுக்குகள் வரிசையை மாற்றாது.'},
   error:{en:'Never use √a+√b=√(a+b). That identity is false in general.',ta:'√a+√b=√(a+b) என்று எழுத வேண்டாம்; இது பொதுவாகத் தவறானது.'},
   verify:{en:'Check the simplified expression numerically against the original without replacing exact forms in the final answer.',ta:'இறுதி விடையைத் துல்லியமாக வைத்தே தொடக்கக் கோவையுடன் தோராய மதிப்பால் ஒப்பிடுக.'}
  },
  rationalise:{
   reason:{en:'Multiplying a fraction by the same nonzero expression above and below preserves its value. A conjugate produces a difference of squares.',ta:'பின்னத்தின் தொகுதி, பகுதியை ஒரே பூச்சியமற்ற கோவையால் பெருக்கினால் மதிப்பு மாறாது. இணைமுறுடு வர்க்கங்களின் வேறுபாட்டைக் கொடுக்கும்.'},
   error:{en:'Do not multiply only the denominator. Check the conjugate sign and that the denominator is not zero.',ta:'பகுதியை மட்டும் பெருக்க வேண்டாம். இணைமுறுடின் குறியையும் பகுதி பூச்சியமல்ல என்பதையும் சரிபார்க்கவும்.'},
   verify:{en:'Substitute an approximate root into both original and simplified expressions; they should agree.',ta:'முறுடின் தோராய மதிப்பை தொடக்க, முடிவுக் கோவைகளில் பதிலிட்டு ஒத்ததா பாருங்கள்.'}
  },
  index:{
   reason:{en:'A fractional exponent encodes a root and a power; a negative exponent means a reciprocal. Apply each operation in the correct order.',ta:'பின்ன அடுக்கு மூலம் மற்றும் அடுக்கைக் குறிக்கும்; எதிர்மறை அடுக்கு தலைகீழ் எண்ணைக் குறிக்கும். செயல்களைச் சரியான வரிசையில் செய்க.'},
   error:{en:'A negative exponent does not mean a negative number. For an even root use the principal nonnegative value.',ta:'எதிர்மறை அடுக்கு என்பது எதிர்மறை எண் அல்ல. இரட்டைப்படை மூலத்தில் எதிர்மறையற்ற முக்கிய மதிப்பையே எடுக்கவும்.'},
   verify:{en:'Raise the proposed root to the indicated power, or multiply by its reciprocal to verify.',ta:'கிடைத்த மூலத்தை உரிய அடுக்கிற்கு உயர்த்தி அல்லது தலைகீழால் பெருக்கிச் சரிபார்க்கவும்.'}
  },
  scientific:{
   reason:{en:'Scientific notation keeps all place-value changes in powers of ten. Multiply by adding exponents; divide by subtracting them.',ta:'அறிவியல் குறியீட்டில் இடமதிப்பு மாற்றங்கள் 10-இன் அடுக்காக எழுதப்படும். பெருக்கலில் அடுக்குகளைக் கூட்டவும்; வகுத்தலில் கழிக்கவும்.'},
   error:{en:'The coefficient must lie from 1 inclusive to 10 exclusive. Moving a decimal right creates a negative exponent.',ta:'கெழு 1 முதல் 10-க்குள் இருக்க வேண்டும். புள்ளியை வலப்புறம் நகர்த்தினால் எதிர்மறை அடுக்கு வரும்.'},
   verify:{en:'Shift the decimal point back using the final exponent to check the original magnitude.',ta:'இறுதி அடுக்கின்படி தசமப் புள்ளியை மீண்டும் நகர்த்தி அசல் அளவுடன் ஒப்பிடுக.'}
  },
  line:{
   reason:{en:'A numerical point belongs at the value of the number, not its radicand. In the semicircle construction, the altitude squared equals the product of the diameter segments.',ta:'எண்கோட்டில் மூல எண்ணின் மதிப்பைக் குறிக்க வேண்டும்; மூலத்தின் கீழுள்ள எண்ணை அல்ல. அரைவட்டக் கட்டமைப்பில் செங்குத்தின் வர்க்கம் விட்டப் பகுதிகளின் பெருக்கலாகும்.'},
   error:{en:'Do not mark √9.3 at 9.3. Construct or approximate the root first and check its interval.',ta:'√9.3 ஐ 9.3-இல் குறிக்க வேண்டாம். முதலில் மூலத்தைக் கட்டமைத்து அதன் இடைவெளியைச் சரிபார்க்கவும்.'},
   verify:{en:'Square the approximate position to see whether it returns the radicand.',ta:'குறித்த தோராய மதிப்பை வர்க்கம் செய்து மூல எண் வருகிறதா பாருங்கள்.'}
  }
 };
 function topic(item){
  const q=item.q?.en||'';
  if(/number line|construct|semicircle|irrational numbers between/.test(q.toLowerCase()))return concepts.line;
  if(/rationalis|conjugate|denominator/.test(q.toLowerCase()))return concepts.rationalise;
  if(/scientific notation|powers of ten/.test(q.toLowerCase())||item.exercise==='2.8')return concepts.scientific;
  if(/recurr|decimal/.test(q.toLowerCase())||item.exercise==='2.2')return concepts.rational;
  if(/index|exponent|root of/.test(q.toLowerCase())||item.exercise==='2.5')return concepts.index;
  return concepts.surd;
 }
 function build(item,lang){
  if(original.hasLesson(item?.id))return original.build(item,lang);
  if(!item||item.chapter!=='2'||item.difficulty!=='hard')return null;
  const ta=lang==='ta';const c=topic(item);
  const stages=[{
   title:ta?'முதலில் திட்டமிடுவோம்':'Plan before calculating',
   objective:ta?'இந்த வகை வினாவிற்கான சரியான விதியைத் தேர்ந்தெடுக்கவும்.':'Choose the rule appropriate for this problem.',
   body:ta?'வினாவின் கொடுக்கப்பட்ட தகவல்களையும் தேவைப்படும் விடையையும் பிரித்தறிக. நேரடியாகத் தோராய மதிப்பைப் பயன்படுத்த வேண்டாம்.':'Identify given values and the requested result before manipulating expressions. Keep exact forms when possible.',
   why:pick(c.reason,lang),eq:''
  }];
  item.steps.forEach((s,i)=>stages.push({
   title:(ta?'படி ':'Step ')+(i+1),
   objective:ta?'ஏன் இந்தக் கணக்கு சரியாகிறது என்பதை அறிக.':'Understand why the calculation is valid.',
   body:pick(s,lang),
   why:pick(c.reason,lang),
   eq:s.eq,
   stepIndex:i
  }));
  stages.push({
   title:ta?'விடையைச் சரிபார்ப்போம்':'Verify and avoid common mistakes',
   objective:ta?'இறுதி விடையைச் சரிபார்க்கவும்.':'Test the final result independently.',
   body:pick(c.verify,lang),
   why:pick(c.error,lang),
   eq:pick(item.answer,lang)
  });
  return {reviewed:false,stages};
 }
 window.TriggleDeep={...original,
   build,hasLesson:id=>original.hasLesson(id)||isHard(id),
   reviewedIds:original.reviewedIds||original.featuredIds
 };
})();
