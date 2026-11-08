/* Grade 9 Real Numbers · SCERT 2025 Exercises 2.7, printed EN p70 / TA p75. */
(()=>{'use strict';const A=window.TriggleRealCh2.addExercise;
const e=(n,p,q,ta,answer,steps,hard=false)=>A(7,n,p,{page:70,tamilPage:75,q,ta,answer,steps,hard,
 title:'Rationalisation · Exercise 2.7 · Q'+n+(p?' ('+p+')':''),
 titleTa:'விகிதப்படுத்துதல் · பயிற்சி 2.7 · வினா '+n+(p?' ('+p+')':'')});
const basic=[
 ['i','1/√50','√2/10','1/√50=√50/50=(5√2)/50=√2/10'],
 ['ii','5/(3√5)','√5/3','5/(3√5)×√5/√5=5√5/15=√5/3'],
 ['iii','√75/√18','5√6/6','√75/√18=5√3/(3√2)=5√6/6'],
 ['iv','3√5/√6','√30/2','3√5/√6=3√30/6=√30/2']
];
for(const [p,q,answer,eq] of basic)e(1,p,'Rationalise the denominator of '+q+'.',''+q+' இன் பகுதியை விகிதப்படுத்துக.',answer,[
 ['Multiply numerator and denominator by an appropriate radical factor.','தொகுதி, பகுதியைச் சரியான முறுடுக் காரணியால் பெருக்குக.',p==='ii'?'√5/√5':p==='iii'||p==='iv'?'√6/√6':'√50/√50'],
 ['Simplify; there must be no surd remaining in the denominator.','பகுதியில் முறுடு எதுவும் மீதமில்லாமல் சுருக்குக.',eq]
 ]);
const complex=[
 ['i','(√48+√32)/(√27−√18)','(20+8√6)/3',
  '√48=4√3; √32=4√2; √27=3√3; √18=3√2',
  '(4/3)(√3+√2)/(√3−√2)=(4/3)(5+2√6)/(3−2)=(20+8√6)/3'],
 ['ii','(5√3+√2)/(√3+√2)','13−4√6',
  'Denominator conjugate: √3−√2',
  '(5√3+√2)(√3−√2)/(3−2)=15−5√6+√6−2=13−4√6'],
 ['iii','(2√6−√5)/(3√5−2√6)','(9+4√30)/21',
  'Denominator conjugate: 3√5+2√6',
  '(2√6−√5)(3√5+2√6)/(45−24)=(9+4√30)/21'],
 ['iv','√5/(√6+2)−√5/(√6−2)','−2√5',
  'Use a single fraction with common denominator (√6+2)(√6−2).',
  '√5[(√6−2)−(√6+2)]/(6−4)=√5(−4)/2=−2√5']
];
for(const [p,q,answer,why,eq] of complex)e(2,p,'Rationalise and simplify '+q+'.',''+q+' இன் பகுதியை விகிதப்படுத்திச் சுருக்குக.',answer,[
 ['Identify and simplify like radicals, or combine fractions before rationalising.','முதலில் ஒரே முறுடுகளாகச் சுருக்கி அல்லது பின்னங்களை ஒரே பகுதிக்குக் கொண்டு வருக.',why],
 ['Use the difference-of-squares identity and simplify the numerator.','வர்க்கங்களின் வேறுபாட்டுச் சூத்திரத்தைப் பயன்படுத்தித் தொகுதியைச் சுருக்குக.',eq],
 ['Check that the final denominator is rational.','இறுதிப் பகுதியில் முறுடு இல்லை என்பதைச் சரிபார்க்கவும்.',answer]
 ],true);
e(3,'','Given (√7−2)/(√7+2)=a√7+b, find a and b.','(√7−2)/(√7+2)=a√7+b எனில் a மற்றும் b காண்க.','a=−4/3, b=11/3',[
 ['Multiply by the denominator conjugate.','பகுதியின் இணைமுறுடைத் தொகுதி, பகுதியால் பெருக்குக.','(√7−2)²/(7−4)'],
 ['Expand and group the rational and irrational parts.','விரித்து விகிதமுறு, விகிதமுறாப் பகுதிகளைப் பிரிக்கவும்.','(7−4√7+4)/3=(−4/3)√7+11/3'],
 ['Compare with the given coefficients.','கொடுக்கப்பட்ட a√7+b உடன் கெழுக்களை ஒப்பிடுக.','a=−4/3; b=11/3']
 ],true);
e(4,'','If x=√5+2, evaluate x²+1/x².','x=√5+2 எனில் x²+1/x² இன் மதிப்பைக் காண்க.','18',[
 ['Find the reciprocal using the conjugate identity.','இணைமுறுடுச் சூத்திரத்தைப் பயன்படுத்தி தலைகீழ் எண்ணைக் காண்க.','(√5+2)(√5−2)=5−4=1 ⇒ 1/x=√5−2'],
 ['Add x and its reciprocal; the rational parts cancel.','x மற்றும் அதன் தலைகீழ் எண்ணைக் கூட்டினால் விகிதமுறுப் பகுதிகள் நீங்கும்.','x+1/x=(√5+2)+(√5−2)=2√5'],
 ['Use (x+1/x)²=x²+2+1/x².','(x+1/x)²=x²+2+1/x² என்ற முற்றொருமையைப் பயன்படுத்துக.','x²+1/x²=(2√5)²−2=20−2=18']
 ],true);
e(5,'','Using √2=1.414, evaluate (8−5√2)/(3−2√2) to three decimal places.','√2=1.414 எனில் (8−5√2)/(3−2√2) ஐ மூன்று தசம இடங்களுக்குக் காண்க.','5.414',[
 ['Multiply the numerator and denominator by 3+2√2.','3+2√2 என்ற இணைமுறுடால் தொகுதியையும் பகுதியையும் பெருக்குக.','[(8−5√2)(3+2√2)]/(9−8)'],
 ['Expand the numerator and simplify exactly.','தொகுதியை விரித்து சரியாகச் சுருக்குக.','24+16√2−15√2−20=4+√2'],
 ['Substitute the supplied approximation only at the end.','கடைசியில் மட்டும் கொடுக்கப்பட்ட தோராய மதிப்பைப் பதிலிடுக.','4+1.414=5.414']
 ],true);
})();