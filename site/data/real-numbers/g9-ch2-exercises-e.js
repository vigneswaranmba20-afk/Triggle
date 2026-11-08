/* Grade 9 Real Numbers · SCERT 2025 Exercise 2.8 (scientific notation).
 * Original teaching steps. Printed English pp73–74, Tamil p79.
 */
(()=>{'use strict';const A=window.TriggleRealCh2.addExercise;
const e=(n,p,page,q,ta,answer,steps,hard=false)=>A(8,n,p,{page,tamilPage:79,q,ta,answer,steps,hard,
 title:'Scientific Notation · Exercise 2.8 · Q'+n+' ('+p+')',
 titleTa:'அறிவியல் குறியீடு · பயிற்சி 2.8 · வினா '+n+' ('+p+')'});
const sci=[
 ['i','569430000000','5.6943×10¹¹','Move the decimal point 11 places left.','தசமப் புள்ளியை 11 இடங்கள் இடப்புறம் நகர்த்துக.'],
 ['ii','2000.57','2.00057×10³','Move the decimal point 3 places left.','தசமப் புள்ளியை 3 இடங்கள் இடப்புறம் நகர்த்துக.'],
 ['iii','0.0000006000','6.000×10⁻⁷','Move the decimal point 7 places right; the coefficient is 6.000.','தசமப் புள்ளியை 7 இடங்கள் வலப்புறம் நகர்த்துக; கெழு 6.000.'],
 ['iv','0.0009000002','9.000002×10⁻⁴','Move the decimal point 4 places right.','தசமப் புள்ளியை 4 இடங்கள் வலப்புறம் நகர்த்துக.']
];
for(const [p,q,answer,why,taWhy] of sci)e(1,p,73,'Write '+q+' in scientific notation.',''+q+' ஐ அறிவியல் குறியீட்டில் எழுதுக.',answer,[
 ['Scientific notation requires a coefficient at least 1 and less than 10.','அறிவியல் குறியீட்டின் கெழு 1 அல்லது அதற்கு மேல், 10-க்குக் கீழ் இருக்க வேண்டும்.','1 ≤ |a| < 10'],
 [why,taWhy,q+' = '+answer]
 ]);
const decimals=[
 ['i','3.459×10⁶','3459000','Shift the decimal point six places right.','தசமப் புள்ளியை ஆறு இடங்கள் வலப்புறம் நகர்த்துக.'],
 ['ii','5.678×10⁴','56780','Shift the decimal point four places right.','தசமப் புள்ளியை நான்கு இடங்கள் வலப்புறம் நகர்த்துக.'],
 ['iii','1.00005×10⁻⁵','0.0000100005','Shift the decimal point five places left.','தசமப் புள்ளியை ஐந்து இடங்கள் இடப்புறம் நகர்த்துக.'],
 ['iv','2.530009×10⁻⁷','0.0000002530009','Shift the decimal point seven places left.','தசமப் புள்ளியை ஏழு இடங்கள் இடப்புறம் நகர்த்துக.']
];
for(const [p,q,answer,why,taWhy] of decimals)e(2,p,73,'Express '+q+' in ordinary decimal form.',''+q+' ஐ சாதாரண தசம வடிவில் எழுதுக.',answer,[
 ['Positive powers of 10 move the decimal right; negative powers move it left.','10-இன் நேர்மறை அடுக்கு தசமப் புள்ளியை வலப்புறமும் எதிர்மறை அடுக்கு இடப்புறமும் நகர்த்தும்.','10^n'],
 [why,taWhy,q+' = '+answer]
 ]);
e(3,'i',73,'Write (300000)² × (20000)⁴ in scientific notation.','(300000)² × (20000)⁴ ஐ அறிவியல் குறியீட்டில் எழுதுக.','1.44×10²⁸',[
 ['Express both numbers in scientific notation.','இரு எண்களையும் அறிவியல் குறியீட்டில் எழுதுக.','300000=3×10⁵; 20000=2×10⁴'],
 ['Apply powers to the coefficients and powers of ten.','கெழுக்களுக்கும் 10-இன் அடுக்குகளுக்கும் கொடுக்கப்பட்ட அடுக்குகளைப் பயன்படுத்துக.','(3×10⁵)²(2×10⁴)⁴=9×16×10^(10+16)'],
 ['Normalize the coefficient to between one and ten.','கெழுவை 1 முதல் 10-க்கு இடையில் அமைக்கவும்.','144×10²⁶=1.44×10²⁸']
 ],true);
e(3,'ii',73,'Write (0.000001)¹¹ ÷ (0.005)³ in scientific notation.','(0.000001)¹¹ ÷ (0.005)³ ஐ அறிவியல் குறியீட்டில் எழுதுக.','8×10⁻⁶⁰',[
 ['Convert each base to powers of ten.','ஒவ்வொரு எண்ணையும் 10-இன் அடுக்குடன் எழுதுக.','0.000001=10⁻⁶; 0.005=5×10⁻³'],
 ['Apply powers and divide, subtracting the exponents.','அடுக்குகளைப் பயன்படுத்தி வகுக்கவும்; அடுக்குகளைக் கழிக்கவும்.','10⁻⁶⁶/(125×10⁻⁹)=(1/125)×10⁻⁵⁷'],
 ['Normalize the coefficient.','கெழுவை அறிவியல் குறியீட்டு வடிவில் மாற்றுக.','0.008×10⁻⁵⁷=8×10⁻⁶⁰']
 ],true);
e(3,'iii',73,'Write [(0.00003)⁶ × (0.00005)⁴] ÷ [(0.009)³ × (0.05)²] in scientific notation.','[(0.00003)⁶ × (0.00005)⁴] ÷ [(0.009)³ × (0.05)²] ஐ அறிவியல் குறியீட்டில் எழுதுக.','2.5×10⁻³⁶',[
 ['Express all four bases in scientific notation.','நான்கு எண்களையும் அறிவியல் குறியீட்டில் மாற்றுக.','3×10⁻⁵; 5×10⁻⁵; 9×10⁻³; 5×10⁻²'],
 ['Separate coefficient multiplication from powers of ten.','கெழுக்களையும் 10-இன் அடுக்குகளையும் தனித்தனியாகக் கணக்கிடுக.','(3⁶×5⁴)/(9³×5²) ×10^(−30−20+9+4)'],
 ['Simplify the numerical coefficient and exponent.','எண் கெழுவையும் அடுக்கையும் சுருக்குக.','25×10⁻³⁷=2.5×10⁻³⁶']
 ],true);
const information=[
 ['i','The textbook states the world population is nearly 7,000,000,000.','பாடநூலில் உலக மக்கள் தொகை ஏறத்தாழ 7,000,000,000 என்று கொடுக்கப்பட்டுள்ளது.','7×10⁹','7,000,000,000=7×10⁹'],
 ['ii','One light year is given as 9460528400000000 km.','ஒரு ஒளியாண்டு 9460528400000000 கி.மீ எனக் கொடுக்கப்பட்டுள்ளது.','9.4605284×10¹⁵ km','9460528400000000=9.4605284×10¹⁵'],
 ['iii','The mass of an electron is given as 0.00000000000000000000000000000091093822 kg.','எலக்ட்ரானின் நிறை 0.00000000000000000000000000000091093822 கிலோ எனக் கொடுக்கப்பட்டுள்ளது.','9.1093822×10⁻³¹ kg','0.00000000000000000000000000000091093822=9.1093822×10⁻³¹']
];
for(const [p,q,ta,answer,eq] of information)e(4,p,74,'Convert this textbook quantity into scientific notation: '+q,'இந்தப் பாடநூல் அளவை அறிவியல் குறியீட்டில் எழுதுக: '+ta,answer,[
 ['Find the first nonzero digit and move the decimal point there.','முதல் பூச்சியமல்லாத இலக்கத்தைக் கண்டறிந்து தசமப் புள்ளியை அங்கு நகர்த்துக.','1 ≤ |a| < 10'],
 ['Count decimal shifts and apply the correct sign of the exponent.','தசமப் புள்ளி நகர்ந்த இடங்களை எண்ணி சரியான குறியுடன் அடுக்கை எழுதுக.',eq]
 ]);
const arithmetic=[
 ['i','(2.75×10⁷)+(1.23×10⁸)','1.505×10⁸','0.275×10⁸+1.23×10⁸=(0.275+1.23)×10⁸=1.505×10⁸','Align both terms to the same power of ten before adding.','கூட்டுவதற்கு முன் இரு உறுப்புகளையும் ஒரே 10-இன் அடுக்காக மாற்றுக.'],
 ['ii','(1.598×10¹⁷)−(4.58×10¹⁵)','1.5522×10¹⁷','(1.598−0.0458)×10¹⁷=1.5522×10¹⁷','Align the exponents and subtract the coefficients.','அடுக்குகளைச் சமமாக்கி கெழுக்களைக் கழிக்கவும்.'],
 ['iii','(1.02×10¹⁰)×(1.20×10⁻³)','1.224×10⁷','(1.02×1.20)×10^(10−3)=1.224×10⁷','Multiply coefficients and add exponents.','கெழுக்களைப் பெருக்கி அடுக்குகளைக் கூட்டவும்.'],
 ['iv','(8.41×10⁴)÷(4.3×10⁵)','≈1.956×10⁻¹','(8.41/4.3)×10^(4−5)=1.955813953…×10⁻¹','Divide coefficients and subtract the denominator exponent.','கெழுக்களை வகுத்து பகுதியின் அடுக்கைக் கழிக்கவும்.']
];
for(const [p,q,answer,eq,why,taWhy] of arithmetic)e(5,p,74,'Simplify '+q+' in scientific notation.',''+q+' ஐ அறிவியல் குறியீட்டில் சுருக்குக.',answer,[
 ['Apply the appropriate rule for powers of ten.','10-இன் அடுக்குகளுக்கான சரியான விதியைப் பயன்படுத்துக.',why],
 [why,taWhy,eq]
 ]);
})();
