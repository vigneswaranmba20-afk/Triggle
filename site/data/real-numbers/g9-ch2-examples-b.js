/* Source-checked: 2025 SCERT Grade 9 Mathematics, Real Numbers, Examples 2.18–2.31. */
(()=>{'use strict';const A=window.TriggleRealCh2.addExample;
const e=(n,page,q,ta,answer,steps,hard=false,diagram=null)=>A(n,{page,q,ta,answer,steps,hard,diagram,title:'Real Numbers · Worked Example 2.'+n,titleTa:'மெய்யெண்கள் · எடுத்துக்காட்டு 2.'+n});
e(18,62,'Rewrite √3, ⁴√3 and ∛3 as surds of the same order.','√3, ⁴√3, ∛3 ஆகியவற்றை ஒரே வரிசை முறுடுகளாக எழுதுக.','¹²√729; ¹²√27; ¹²√81',[
 ['Take the least common multiple of radical indices 2, 4 and 3.','மூலக் குறியீடுகள் 2,4,3-இன் மீச்சிறு பொது மடங்கைக் காண்க.','LCM(2,4,3)=12'],
 ['Convert √3 into a twelfth root.','√3 ஐ 12-ஆம் மூலமாக எழுதுக.','3^(1/2)=3^(6/12)=¹²√729'],
 ['Rewrite the other roots using the same index.','மற்ற இரு மூலங்களையும் அதே வரிசையில் எழுதுக.','3^(1/4)=¹²√27; 3^(1/3)=¹²√81']
 ]);
e(19,62,'(i) Simplify √8 and ∛192. (ii) Show that ∛7 > ⁴√5.','(i) √8, ∛192 ஐச் சுருக்குக. (ii) ∛7 > ⁴√5 என நிரூபிக்கவும்.','(i) 2√2; 4∛3. (ii) ∛7 > ⁴√5',[
 ['Extract perfect powers from each radical.','ஒவ்வொரு முறுடிலும் உள்ள நிறைவர்க்க/நிறைகன காரணிகளை வெளியே எடுக்கவும்.','√8=√(4×2)=2√2; ∛192=∛(64×3)=4∛3'],
 ['Raise both positive surds to a common twelfth power.','நேர்மறை முறுடுகளைப் பொதுவான 12-ஆம் அடுக்கிற்கு உயர்த்துக.','(∛7)^12=7⁴=2401; (⁴√5)^12=5³=125'],
 ['Because 2401>125, the original order is preserved.','2401>125 என்பதால் மூல எண்களின் வரிசையும் அதே.','∛7 > ⁴√5']
 ],true);
e(20,63,'Arrange ∛2, √4 and ⁴√3 in ascending order.','∛2, √4, ⁴√3 ஆகிய முறுடுகளை ஏறுவரிசையில் அமைக்கவும்.','∛2 < ⁴√3 < √4',[
 ['The radical indices are 3, 2 and 4; use a common index of 12.','மூலக் குறியீடுகள் 3,2,4; பொது வரிசை 12 ஆகும்.','LCM(3,2,4)=12'],
 ['Rewrite each positive surd as a twelfth root.','ஒவ்வொரு நேர்மறை முறுடையும் பன்னிரண்டாம் மூலமாக எழுதுக.','∛2=¹²√16; √4=¹²√4096; ⁴√3=¹²√27'],
 ['Compare their radicands to get the order.','மூலத்தின் கீழுள்ள எண்களை ஒப்பிடுக.','16 < 27 < 4096 ⇒ ∛2 < ⁴√3 < √4']
 ],true);
e(21,63,'Simplify (i) ∛108 and (ii) (∛1024)^(−2). State order, radicand and coefficient.','(i) ∛108, (ii) (∛1024)^(−2) ஆகியவற்றைச் சுருக்கி வரிசை, மூல எண், கெழு காண்க.','(i) 3∛4: order 3, radicand 4, coefficient 3. (ii) (1/64)∛(1/4): order 3, radicand 1/4, coefficient 1/64',[
 ['Factor 108 into a perfect cube and a remainder.','108-ஐ நிறைகனம் மற்றும் மீதியாகக் காரணிப்படுத்துக.','108=27×4 ⇒ ∛108=3∛4'],
 ['Write 1024 as a power of two.','1024-ஐ 2-இன் அடுக்காக எழுதுக.','1024=2¹⁰'],
 ['Apply the cube root and negative square exponent.','கனமூலத்தையும் எதிர்மறை இரண்டாம் அடுக்கையும் பயன்படுத்துக.','(∛1024)^(−2)=2^(−20/3)=2⁻⁶×2^(−2/3)'],
 ['Extract 2⁻⁶ and retain a cube root of 1/4.','2⁻⁶ ஐ வெளியே எடுத்து 1/4 இன் கனமூலத்தை வைத்துக் கொள்க.','(1/64)∛(1/4)']
 ],true);
e(22,65,'(i) Add 3√7 and 5√7. (ii) Subtract 4√5 from 7√5. State whether each result is rational.','(i) 3√7 + 5√7, (ii) 7√5 − 4√5 காண்க; முடிவுகள் விகிதமுறா எண்களா?','8√7 (irrational); 3√5 (irrational)',[
 ['Like square-root terms can be combined by their coefficients.','ஒரே முறுடு கொண்ட உறுப்புகளின் கெழுக்களைக் கூட்டுக.','3√7+5√7=(3+5)√7=8√7'],
 ['Subtract the coefficients in the second expression.','இரண்டாவது கோவையில் கெழுக்களைக் கழிக்கவும்.','7√5−4√5=(7−4)√5=3√5'],
 ['Nonzero rational multiples of these irrational roots stay irrational.','பூச்சியமல்லாத விகிதமுறு கெழுவுடன் வரும் இவ்விரு முறுடுகளும் விகிதமுறாதவை.','8√7, 3√5: irrational']
 ]);
e(23,65,'Simplify (i) √63 − √175 + √28 and (ii) 2∛40 + 3∛625 − 4∛320.','(i) √63 − √175 + √28 மற்றும் (ii) 2∛40 + 3∛625 − 4∛320 ஆகியவற்றைச் சுருக்குக.','(i) 0; (ii) 3∛5',[
 ['Factor perfect squares in the first expression.','முதல் கோவையில் நிறைவர்க்கக் காரணிகளைப் பிரிக்கவும்.','√63=3√7; √175=5√7; √28=2√7'],
 ['Combine the coefficients of √7.','√7-இன் கெழுக்களைக் கூட்டவும் கழிக்கவும்.','3√7−5√7+2√7=(3−5+2)√7=0'],
 ['Extract perfect cubes from the second expression.','இரண்டாவது கோவையில் நிறைகனக் காரணிகளை வெளியே எடுக்கவும்.','∛40=2∛5; ∛625=5∛5; ∛320=4∛5'],
 ['Combine like cube-root terms.','ஒரே கனமூலம் கொண்ட உறுப்புகளின் கெழுக்களைச் சுருக்குக.','2(2∛5)+3(5∛5)−4(4∛5)=(4+15−16)∛5=3∛5']
 ],true);
e(24,66,'Multiply ∛40 and ∛16 and simplify.','∛40 மற்றும் ∛16 இவற்றைப் பெருக்கிச் சுருக்குக.','4∛10',[
 ['The product of cube roots is the cube root of the product.','கனமூலங்களின் பெருக்கல் பெருக்கலின் கனமூலத்திற்குச் சமம்.','∛40×∛16=∛640'],
 ['Extract the perfect cube 64 from the radicand.','640 இல் உள்ள நிறைகனம் 64-ஐப் பிரிக்கவும்.','640=64×10'],
 ['Take the cube root of 64.','64-இன் கனமூலம் 4.','∛640=∛64·∛10=4∛10']
 ]);
e(25,66,'Calculate 2√72 × 5√32 × 3√50 in simplest form.','2√72 × 5√32 × 3√50 ஐ எளிய வடிவில் காண்க.','7200√2',[
 ['Extract the largest square factor from each radical.','ஒவ்வொரு முறுடிலும் உள்ள மிகப்பெரிய நிறைவர்க்கக் காரணியைப் பிரிக்கவும்.','√72=6√2; √32=4√2; √50=5√2'],
 ['Multiply rational coefficients.','விகிதமுறு கெழுக்களைப் பெருக்குக.','2×5×3×6×4×5=3600'],
 ['Combine three copies of √2.','மூன்று √2 முறுடுகளின் பெருக்கலைக் காண்க.','√2×√2×√2=2√2'],
 ['Multiply the results.','இரு முடிவுகளையும் பெருக்குக.','3600×2√2=7200√2']
 ],true);
e(26,66,'Simplify ⁹√8 ÷ ⁶√6.','⁹√8 ÷ ⁶√6 ஐச் சுருக்குக.','⁶√(2/3)',[
 ['Use fractional exponents and common denominator 18.','பின்ன அடுக்குகளைப் பயன்படுத்தி பொதுப் பகுதி 18 ஆக மாற்றுக.','8^(1/9) / 6^(1/6)=(8²/6³)^(1/18)'],
 ['Simplify the fraction inside the eighteenth root.','18-ஆம் மூலத்துக்குள் உள்ள பின்னத்தைச் சுருக்குக.','8²/6³=64/216=8/27=(2/3)³'],
 ['Cancel exponent 3 against index 18.','3-ஆம் அடுக்கையும் 18-ஆம் மூலக் குறியீட்டையும் சுருக்குக.','[(2/3)³]^(1/18)=(2/3)^(1/6)=⁶√(2/3)']
 ],true);
e(27,69,'Rationalise (i) 7/√14 and (ii) (5+√3)/(5−√3).','(i) 7/√14, (ii) (5+√3)/(5−√3) ஆகியவற்றின் பகுதியை விகிதப்படுத்துக.','(i) √14/2; (ii) (14+5√3)/11',[
 ['Multiply the first fraction by √14/√14.','முதல் பின்னத்தின் தொகுதி, பகுதியை √14-ஆல் பெருக்குக.','7/√14 = 7√14/14 = √14/2'],
 ['For the second fraction use the denominator conjugate 5+√3.','இரண்டாவது பின்னத்தின் பகுதிக்குரிய இணைமுறுடு 5+√3 பயன்படுத்துக.','(5+√3)/(5−√3) × (5+√3)/(5+√3)'],
 ['Use the difference of squares in the denominator.','பகுதியில் வர்க்கங்களின் வேறுபாட்டுச் சூத்திரத்தைப் பயன்படுத்துக.','(5−√3)(5+√3)=25−3=22'],
 ['Expand and simplify the numerator.','தொகுதியை விரித்து சுருக்குக.','(5+√3)²/22=(28+10√3)/22=(14+5√3)/11']
 ],true);
e(28,71,'Write (i) 9768854, (ii) 0.04567891, and (iii) 72006865.48 in scientific notation.','9768854, 0.04567891, 72006865.48 ஆகியவற்றை அறிவியல் குறியீட்டில் எழுதுக.','9.768854×10⁶; 4.567891×10⁻²; 7.200686548×10⁷',[
 ['Move the point six places left for the first integer.','முதல் எண்ணின் தசமப் புள்ளியை ஆறு இடங்கள் இடப்புறம் நகர்த்துக.','9768854=9.768854×10⁶'],
 ['Move the point two places right for the small decimal.','சிறிய தசம எண்ணில் புள்ளியை இரண்டு இடங்கள் வலப்புறம் நகர்த்துக.','0.04567891=4.567891×10⁻²'],
 ['Move the point seven places left for the final number.','இறுதி எண்ணில் புள்ளியை ஏழு இடங்கள் இடப்புறம் நகர்த்துக.','72006865.48=7.200686548×10⁷']
 ]);
e(29,72,'Write (i) 6.34×10⁴ and (ii) 2.00367×10⁻⁵ in ordinary decimal form.','6.34×10⁴ மற்றும் 2.00367×10⁻⁵ ஐ சாதாரண தசம வடிவில் எழுதுக.','63400; 0.0000200367',[
 ['A positive power of ten shifts the point right.','நேர்மறை 10-இன் அடுக்கு புள்ளியை வலப்புறம் நகர்த்தும்.','6.34×10⁴=63400'],
 ['A negative power shifts the point left, inserting zeros if needed.','எதிர்மறை அடுக்கு புள்ளியை இடப்புறம் நகர்த்தும்; தேவையான பூச்சியங்களைச் சேர்க்கவும்.','2.00367×10⁻⁵=0.0000200367']
 ]);
e(30,72,'Earth has mass 5.97×10²⁴ kg and Moon 0.073×10²⁴ kg. Find their combined mass.','பூமியின் நிறை 5.97×10²⁴ kg, நிலவின் நிறை 0.073×10²⁴ kg; மொத்த நிறையைக் காண்க.','6.043×10²⁴ kg',[
 ['The powers of ten are the same, so combine the coefficients.','10-இன் அடுக்குகள் சமமாக இருப்பதால் கெழுக்களைக் கூட்டுக.','(5.97+0.073)×10²⁴ kg'],
 ['Add accurately and retain the common scale.','துல்லியமாகக் கூட்டி பொதுவான அடுக்கை வைத்துக் கொள்க.','6.043×10²⁴ kg']
 ]);
e(31,72,'Compute in scientific notation: (i) (50,000,000)⁴; (ii) (0.00000005)³; (iii) (300,000)³×(2,000)⁴; (iv) (4,000,000)³÷(0.00002)⁴.','(i) (50,000,000)⁴, (ii) (0.00000005)³, (iii) (300,000)³×(2,000)⁴, (iv) (4,000,000)³÷(0.00002)⁴ ஆகியவற்றை அறிவியல் குறியீட்டில் காண்க.','(i) 6.25×10³⁰; (ii) 1.25×10⁻²²; (iii) 4.32×10²⁹; (iv) 4×10³⁸',[
 ['Write each base as a coefficient times a power of ten.','ஒவ்வொரு எண்ணையும் கெழு × 10-இன் அடுக்கு என எழுதுக.','50,000,000=5×10⁷; 0.00000005=5×10⁻⁸'],
 ['Apply each outside power to coefficient and exponent.','வெளி அடுக்கை கெழுவிற்கும் 10-இன் அடுக்கிற்கும் பயன்படுத்துக.','(5×10⁷)⁴=625×10²⁸=6.25×10³⁰; (5×10⁻⁸)³=125×10⁻²⁴=1.25×10⁻²²'],
 ['In the product, add exponents of ten.','பெருக்கலில் 10-இன் அடுக்குகளைக் கூட்டுக.','(3×10⁵)³(2×10³)⁴=27×16×10^(15+12)=4.32×10²⁹'],
 ['In the quotient, subtract exponents of ten.','வகுத்தலில் 10-இன் அடுக்குகளைக் கழிக்கவும்.','(4×10⁶)³/(2×10⁻⁵)⁴=(64/16)×10^(18−(−20))=4×10³⁸']
 ],true);
})();
