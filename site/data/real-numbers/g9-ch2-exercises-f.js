/* Grade 9 Real Numbers · SCERT 2025 Exercise 2.9, 20 textbook MCQs.
 * Each item includes all four choices, a mathematical reason and explicit answer.
 */
(()=>{'use strict'; const A=window.TriggleRealCh2.addExercise;
const make=(n,page,base,ta,choices,answerIndex,reason,reasonTa,work,extraTa)=>{
 const letters=['(1)','(2)','(3)','(4)'];
 const q=base+'\n'+choices.map((c,i)=>letters[i]+' '+c[0]).join('  ');
 const qt=ta+'\n'+choices.map((c,i)=>letters[i]+' '+c[1]).join('  ');
 A(9,n,'',{page,tamilPage:page+6,q,ta:qt,
   answer:'Option ('+answerIndex+') — '+choices[answerIndex-1][0],kind:'textbook-mcq',
   title:'Real Numbers · MCQ '+n,titleTa:'மெய்யெண்கள் · பலவுள் தெரிவு '+n,
   steps:[
     ['Read the mathematical property, not just the form of the expression.','கோவையின் வடிவம் மட்டுமின்றி அதன் கணிதப் பண்பையும் கவனிக்கவும்.',reason],
     [work,extraTa||reasonTa,'Option ('+answerIndex+'): '+choices[answerIndex-1][0]]
   ]});
};
make(1,74,'If n is a natural number, what can √n be?','n இயல் எண் எனில் √n எவ்வகையான எண்ணாக இருக்கலாம்?',
 [['Always natural','எப்போதும் இயல் எண்'],['Always irrational','எப்போதும் விகிதமுறா எண்'],['Always rational','எப்போதும் விகிதமுறு எண்'],['Rational or irrational','விகிதமுறு அல்லது விகிதமுறா எண்']],4,'√4=2; √2 is irrational.','√4=2, √2 விகிதமுறா எண்.','A perfect-square n yields a rational square root; others may be irrational.');
make(2,74,'Which statement is NOT true?','கீழ்க்கண்டவற்றுள் உண்மையல்லாத கூற்று எது?',
 [['Every rational number is real','ஒவ்வொரு விகிதமுறு எண்ணும் மெய்யெண்'],['Every integer is rational','ஒவ்வொரு முழு எண்ணும் விகிதமுறு எண்'],['Every real number is irrational','ஒவ்வொரு மெய்யெண்ணும் விகிதமுறா எண்'],['Every natural number is whole','ஒவ்வொரு இயல் எண்ணும் முழு எண்']],3,'Real numbers include both rational and irrational numbers.','மெய்யெண்களில் விகிதமுறு, விகிதமுறா எண்கள் இரண்டும் உள்ளன.','The rational real number 2 disproves statement (3).');
make(3,74,'The sum of two irrational numbers is:','இரு விகிதமுறா எண்களின் கூடுதல் எவ்வகையாக இருக்கலாம்?',
 [['Always irrational','எப்போதும் விகிதமுறா எண்'],['Rational or irrational','விகிதமுறு அல்லது விகிதமுறா எண்'],['Always rational','எப்போதும் விகிதமுறு எண்'],['Always an integer','எப்போதும் முழு எண்']],2,'√2+(−√2)=0, but √2+√3 is irrational.','√2+(−√2)=0; ஆனால் √2+√3 விகிதமுறா எண்.','Different irrational pairs can have different types of sums.');
make(4,74,'Which fraction has a terminating decimal?','எந்தப் பின்னம் முடிவுறும் தசம விரிவைக் கொண்டுள்ளது?',
 [['5/64','5/64'],['8/9','8/9'],['14/15','14/15'],['1/12','1/12']],1,'A denominator containing only primes 2 or 5 gives a terminating decimal.','பகுதியில் 2,5 தவிர வேறு பகா காரணி இல்லாவிட்டால் தசமம் முடிவுறும்.','64=2⁶, whereas 9,15,12 include factor 3.');
make(5,75,'Which one is irrational?','எது விகிதமுறா எண்?',
 [['√25','√25'],['√(9/4)','√(9/4)'],['7/11','7/11'],['π','π']],4,'√25=5; √(9/4)=3/2; 7/11 is rational.','√25=5; √(9/4)=3/2; 7/11 விகிதமுறு.','π is irrational.');
make(6,75,'Which irrational number lies between 2 and 2.5?','2 மற்றும் 2.5 இடையே உள்ள விகிதமுறா எண் எது?',
 [['√11','√11'],['√5','√5'],['√2.5','√2.5'],['√8','√8']],2,'4<5<6.25, so 2<√5<2.5.','4<5<6.25 என்பதால் 2<√5<2.5.','√5≈2.236 and 5 is not a square.');
make(7,75,'Choose the smallest listed rational multiplier for 1/3 to give a decimal terminating after one place.','1/3 ஐ எந்த விகிதமுறு எண்ணால் பெருக்கினால் ஒரு தசம இடத்துடன் முடியும்?',
 [['1/10','1/10'],['3/10','3/10'],['3','3'],['30','30']],2,'(1/3)(3/10)=1/10=0.1.','(1/3)(3/10)=0.1 என்பது ஒரு தசம இடத்தில் முடியும்.','3 and 30 yield integers; 1/10 gives 1/30 (recurring).');
make(8,75,'Given 1/7=0.(142857), find 5/7.','1/7=0.(142857) எனில் 5/7-இன் மதிப்பு என்ன?',
 [['0.(142857)','0.(142857)'],['0.(714285)','0.(714285)'],['0.(571428)','0.(571428)'],['0.714285','0.714285']],2,'5/7=0.714285714285…, with the same six-digit period rotated.','5/7=0.714285714285… என்ற ஆறு இலக்கச் சுழற்சி கிடைக்கிறது.','The overline repeats 714285 indefinitely.');
make(9,75,'Find the irrational result among these four expressions (the odd one out).','கீழ்காணும் கோவைகளில் விகிதமுறா மதிப்பைக் கொடுப்பது எது?',
 [['√32 × √2','√32 × √2'],['√27 / √3','√27 / √3'],['√72 × √8','√72 × √8'],['√54 / √18','√54 / √18']],4,'The first three simplify to 8,3,24.','முதல் மூன்றின் மதிப்புகள் முறையே 8,3,24.','√54/√18=√3 is irrational.');
make(10,75,'Compute 0.(34) + 0.3(4); parentheses indicate recurring digits.','0.(34)+0.3(4) இன் தொடர்தசமக் கூட்டலைக் காண்க.',
 [['0.6(87)','0.6(87)'],['0.(68)','0.(68)'],['0.6(8)','0.6(8)'],['0.68(7)','0.68(7)']],1,'0.(34)=34/99; 0.3(4)=31/90.','0.(34)=34/99; 0.3(4)=31/90.','34/99+31/90=227/330=0.68787878…=0.6(87).');
make(11,75,'Which statement about √25 is false?','√25 பற்றிய எந்தக் கூற்று தவறு?',
 [['The square roots of 25 are ±5','25-இன் வர்க்கமூலங்கள் ±5'],['−√25=−5','−√25=−5'],['√25=5','√25=5'],['√25=±5','√25=±5']],4,'The principal square root symbol gives only the nonnegative value.','வர்க்கமூலக் குறியீடு நேர்மறை முக்கிய மதிப்பை மட்டுமே தரும்.','The two solutions to x²=25 are ±5, but √25=5 only.');
make(12,75,'Which expression is NOT rational?','கீழே உள்ளவற்றுள் விகிதமுறு எண் அல்லாதது எது?',
 [['√(8/18)','√(8/18)'],['7/3','7/3'],['√0.01','√0.01'],['√13','√13']],4,'√(8/18)=2/3 and √0.01=0.1.','√(8/18)=2/3; √0.01=0.1.','√13 is irrational because 13 is not a perfect square.');
make(13,75,'Simplify √27 + √12.','√27 + √12 ஐச் சுருக்குக.',
 [['√39','√39'],['5√6','5√6'],['5√3','5√3'],['3√5','3√5']],3,'√27=3√3; √12=2√3.','√27=3√3; √12=2√3.','3√3+2√3=5√3.');
make(14,75,'If √80=k√5, find k.','√80=k√5 எனில் k காண்க.',
 [['2','2'],['4','4'],['8','8'],['16','16']],2,'√80=√(16×5)=4√5.','√80=√(16×5)=4√5.','k=4.');
make(15,75,'Calculate 4√7 × 2√3.','4√7 × 2√3 இன் மதிப்பு என்ன?',
 [['6√10','6√10'],['8√21','8√21'],['8√10','8√10'],['6√21','6√21']],2,'Multiply coefficients and radicands separately.','கெழுக்களையும் மூல எண்களையும் தனித்தனியாகப் பெருக்குக.','4×2√(7×3)=8√21.');
make(16,75,'Rationalise 2√3/(3√2).','2√3/(3√2) இன் பகுதியை விகிதப்படுத்துக.',
 [['√2/3','√2/3'],['√3/2','√3/2'],['√6/3','√6/3'],['2/3','2/3']],3,'Multiply numerator and denominator by √2.','தொகுதியையும் பகுதியையும் √2-ஆல் பெருக்குக.','2√3·√2/(3×2)=√6/3.');
make(17,76,'Expand (2√5−√2)².','(2√5−√2)² ஐ விரிக்கவும்.',
 [['4√5+2√2','4√5+2√2'],['22−4√10','22−4√10'],['8−4√10','8−4√10'],['2√10−2','2√10−2']],2,'Use (a−b)²=a²−2ab+b².','(a−b)²=a²−2ab+b² என்ற முற்றொருமையைப் பயன்படுத்துக.','20−4√10+2=22−4√10.');
make(18,76,'Simplify (0.000729)^(−3/4) × (0.09)^(−3/4).','(0.000729)^(−3/4) × (0.09)^(−3/4) ஐச் சுருக்குக.',
 [['10³/3³','10³/3³'],['10⁵/3⁵','10⁵/3⁵'],['10²/3²','10²/3²'],['10⁶/3⁶','10⁶/3⁶']],4,'0.000729=(3/10)⁶ and 0.09=(3/10)².','0.000729=(3/10)⁶, 0.09=(3/10)².','(3/10)^(−18/4−6/4)=(3/10)⁻⁶=(10/3)⁶.');
make(19,76,'If √(9ˣ) = ∛(9²), find x.','√(9ˣ)=∛(9²) எனில் x காண்க.',
 [['2/3','2/3'],['4/3','4/3'],['1/3','1/3'],['5/3','5/3']],2,'Equate exponents of the same positive base 9.','ஒரே நேர்மறை அடிப்படை 9-இன் அடுக்குகளை ஒப்பிடுக.','9^(x/2)=9^(2/3) ⇒ x/2=2/3 ⇒ x=4/3.');
make(20,76,'A rectangle measures 5×10⁵ m by 4×10⁴ m. Find its area.','செவ்வக நிலத்தின் நீளம் 5×10⁵ மீ; அகலம் 4×10⁴ மீ. பரப்பளவு காண்க.',
 [['9×10¹ m²','9×10¹ மீ²'],['9×10⁹ m²','9×10⁹ மீ²'],['2×10¹⁰ m²','2×10¹⁰ மீ²'],['20×10²⁰ m²','20×10²⁰ மீ²']],3,'Area equals length times breadth.','பரப்பளவு = நீளம் × அகலம்.','(5×4)×10^(5+4)=20×10⁹=2×10¹⁰ m².');
})();
