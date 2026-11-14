#!/usr/bin/env node
'use strict';
/*
 * Generate source-pinned Grade 9 "Why this step?" micro-explanations.
 * Reads authored app items only. No textbook question, step, or answer is changed.
 * Original teaching text is selected from a manually reviewed concept bank;
 * only chapter/step-matched principles are eligible.
 * Tamil explanations are original provisional teaching copy, not certified textbook translations.
 */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('site/index.html');
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
const ctx={window:{},console};vm.createContext(ctx);
for(const script of scripts)vm.runInContext(read('site/'+script),ctx,{filename:script,timeout:15000});
const grade=ctx.window.TRIGGLE_CLASSES?.[9];
if(!grade)throw Error('Grade 9 runtime missing');
const eligible=grade.items.filter(item=>{
 if(!item?.id||!item?.steps?.length||!item?.q?.en)return false;
 if(/example/i.test(item.id)||/example/i.test(item.label?.en||''))return false;
 if(item.kind==='textbook-example')return false;
 return /^(?:g9-ch\d+-ex|c9-exercise-|c9-\d+-\d+-practice-)/.test(item.id);
});
const BANK={
 membership:['A set requires an exact rule for membership. For each proposed element, the answer to “Does it belong?” must not depend on personal opinion.','ஒரு கணத்தில் உறுப்பு இருக்கிறதா என்பதைத் தெளிவான விதியால் முடிவு செய்ய வேண்டும்; தனிப்பட்ட கருத்தால் அல்ல.'],
 prime:['A prime number has exactly two positive factors: 1 and itself. Check divisibility to decide whether each number belongs in the prime-number set.','ஒரு பகா எண்ணுக்கு 1 மற்றும் அந்த எண்ணே ஆகிய இரு நேர்ம காரணிகள் மட்டுமே இருக்கும். இதன் மூலம் உறுப்பினைச் சரிபார்க்கலாம்.'],
 roster:['Roster form lists each distinct member explicitly. If two descriptions identify the same number, write it only once because a set has no duplicate elements.','பட்டியல் வடிவில் ஒவ்வொரு தனித்த உறுப்பையும் வெளிப்படையாக எழுத வேண்டும். ஒரே உறுப்பு மீண்டும் வந்தாலும் கணத்தில் ஒருமுறை மட்டுமே வரும்.'],
 setBuilder:['A set-builder description supplies a membership test. Translate the words or inequality into values that satisfy every condition simultaneously.','கணக் கட்டமைப்பு வடிவம் உறுப்பினைச் சோதிக்கும் நிபந்தனையைத் தருகிறது. எல்லா நிபந்தனைகளையும் ஒரே நேரத்தில் நிறைவேற்றும் மதிப்புகளைத் தேர்வு செய்ய வேண்டும்.'],
 finite:['A finite set ends after a definite number of distinct members. An infinite set cannot be completed by writing a final element.','முடிவுறு கணத்தில் உறுப்புகளைத் தெளிவான எண்ணிக்கையில் எண்ண முடியும். முடிவுறா கணத்திற்கு இறுதி உறுப்பு கிடையாது.'],
 subset:['A is a subset of B only when every member of A is also a member of B. Finding just one member of A outside B disproves the claim.','A இன் ஒவ்வோர் உறுப்பும் B இலும் இருந்தால்தான் A, B இன் உட்கணம். A இல் இருந்து ஒரு உறுப்பு B இல் இல்லாவிட்டாலே அது பொய்யாகும்.'],
 union:['A union keeps every distinct member that belongs to either set. The overlap is counted once, not twice.','ஒன்றியம் இரு கணங்களில் ஏதேனும் ஒன்றில் உள்ள தனித்த உறுப்புகளை எல்லாம் கொண்டிருக்கும். பொதுவான உறுப்பை ஒருமுறை மட்டுமே எழுத வேண்டும்.'],
 intersection:['An intersection contains only the members present in both sets. In a Venn picture, check the overlapping region rather than either full circle.','வெட்டுக் கணத்தில் இரு கணங்களிலும் உள்ள உறுப்புகள் மட்டுமே இடம்பெறும். வென் படத்தில் பொதுப் பகுதியைப் பார்க்க வேண்டும்.'],
 complement:['The complement is taken relative to the stated universal set. Keep the universal-set members that do not lie in the specified set.','நிரப்புக் கணத்தை குறிப்பிட்ட அனைத்துக் கணத்தைப் பொறுத்தே காண வேண்டும். கொடுத்த கணத்தில் இல்லாத அனைத்துக் கண உறுப்புகளைத் தேர்வு செய்க.'],
 difference:['A minus B retains members of A that are not in B. Reversing the order usually changes the result.','A−B என்பது A இல் இருந்து B இல் இல்லாத உறுப்புகளை வைத்திருக்கும். வரிசையை மாற்றினால் பொதுவாக விடை மாறும்.'],
 venn:['A Venn diagram separates “only first”, “both”, and “only second” regions. Put shared elements in the overlap before filling exclusive regions.','வென் படம் முதல் கணத்தில் மட்டும், இரண்டிலும், இரண்டாவது கணத்தில் மட்டும் எனப் பகுதிகளைப் பிரிக்கிறது. பொதுவான உறுப்புகளை முதலில் நடுப்பகுதியில் இடுக.'],
 cardinality:['When two sets overlap, adding their sizes counts the common elements twice. Subtract the overlap once to get the correct union size.','இரு கணங்களின் எண்ணிக்கைகளைக் கூட்டினால் பொதுவான உறுப்புகள் இருமுறை எண்ணப்படும். ஒன்றியத்தின் சரியான எண்ணிக்கைக்குப் பொதுப் பகுதியை ஒருமுறை கழிக்க வேண்டும்.'],
 realLine:['A number line represents numbers by their order and distance. Values increase to the right; zooming an interval preserves their relative order.','எண்கோட்டில் வலப்பக்கம் செல்லச் செல்ல மதிப்பு அதிகரிக்கும். ஓர் இடைவெளியைப் பெரிதாக்கினாலும் எண்களின் வரிசை மாறாது.'],
 irrational:['A non-terminating decimal is irrational only if it is also non-repeating. Terminating decimals and repeating decimals are rational because they equal fractions.','முடிவில்லாத தசமம் திரும்பத் திரும்ப மாறாத முறையில் வந்தால்தான் விகிதமுறா எண். முடிவுறும் அல்லது சுழற்சியுள்ள தசமம் பின்னமாக எழுதலாம்.'],
 rational:['To show a number is rational, write it as a fraction of two integers with a nonzero denominator. This includes terminating and repeating decimals.','ஒரு எண்ணை பூஜ்ஜியமற்ற பகுதியுள்ள இரு முழு எண்களின் பின்னமாக எழுத முடிந்தால் அது விகிதமுறு எண். முடிவுறும், சுழற்சி தசமங்களும் இதில் அடங்கும்.'],
 between:['To find numbers strictly between two bounds, choose values larger than the lower bound and smaller than the upper bound. Check both inequalities.','இரு எல்லைகளுக்கு இடையில் உள்ள எண்ணைத் தேர்வுசெய்ய அது கீழ் எல்லையைவிடப் பெரியதும் மேல் எல்லையைவிடச் சிறியதும் ஆக வேண்டும்.'],
 rounding:['Locate the place value requested, then inspect the next digit. Rounding changes the chosen digit only when that next digit is 5 or more.','கேட்கப்பட்ட தசம இடத்தைக் கண்டபின் அதன் அடுத்த இலக்கத்தைப் பார்க்கவும். அது 5 அல்லது அதற்கு மேல் இருந்தால்தான் இலக்கத்தை உயர்த்த வேண்டும்.'],
 radical:['A perfect-square factor can move outside a square root. For example, the square root of 9 times a number equals three times the root of that number.','வர்க்கமூலத்தின் உள்ளேயுள்ள நிறைவர்க்கக் காரணியை வெளியே எடுக்கலாம். 9 மடங்கின் வர்க்கமூலம் அந்த எண்ணின் மூலத்தை 3-ஆல் பெருக்கியதற்குச் சமம்.'],
 likeSurds:['Only radicals of the same index with the same radicand are like terms. Simplify each radical first, then combine their coefficients.','ஒரே மூல அடுக்கும் ஒரே மூல எண்ணும் உள்ள முறுடுகளை மட்டுமே ஒரே மாதிரியான உறுப்புகளாகச் சேர்க்கலாம். முதலில் மூலங்களை எளிமைப்படுத்தவும்.'],
 conjugate:['Multiplying by the conjugate changes a sum-and-difference product into a difference of squares. The numerator and denominator must be multiplied by the same nonzero value.','இணைக் கோவையால் பெருக்கினால் கூட்டல்–கழித்தல் பெருக்கல் வர்க்கங்களின் வித்தியாசமாகும். தொகுதியையும் பகுதியையும் ஒரே பூஜ்ஜியமற்ற கோவையால் பெருக்க வேண்டும்.'],
 rootPower:['Taking an nth root reverses taking the nth power on the permitted number domain. Identify a complete nth power before simplifying.','n-ஆவது மூலத்தை எடுப்பது அனுமதிக்கப்பட்ட எண்களில் n-ஆவது அடுக்கை நீக்கும். முதலில் முழுமையான n-ஆவது அடுக்கைக் கண்டறியவும்.'],
 exponent:['When multiplying powers with the same base, their exponents add. When dividing nonzero powers with the same base, their exponents subtract.','ஒரே அடிமானத்தின் அடுக்குகளைப் பெருக்கும்போது அடுக்குகள் கூடும். பூஜ்ஜியமற்ற அதே அடிமான அடுக்குகளை வகுக்கும்போது அடுக்குகள் கழிக்கப்படும்.'],
 scientific:['Scientific notation separates a number into a coefficient between 1 and 10 and a power of ten. The exponent records how far the decimal point moved.','அறிவியல் குறியீட்டில் 1 முதல் 10-க்கு இடைப்பட்ட கெழுவையும் பத்தின் அடுக்கையும் பயன்படுத்துகிறோம். தசமப் புள்ளி எத்தனை இடம் நகர்ந்தது என்பதை அடுக்கு காட்டும்.'],
 identity:['An algebraic identity holds for every allowed value. Expand the factors carefully and combine like terms to see why both sides are equal.','ஒரு இயற்கணித முற்றொருமை எல்லா அனுமதிக்கப்பட்ட மதிப்புகளுக்கும் பொருந்தும். காரணிகளை விரித்து ஒத்த உறுப்புகளைச் சேர்த்துப் பார்க்கலாம்.'],
 distributive:['Each term inside brackets must be multiplied by the factor outside. The sign before each term travels with that term during expansion.','அடைப்புக்குறிக்கு வெளியுள்ள காரணி உள்ளேயுள்ள ஒவ்வோர் உறுப்புடனும் பெருக்கப்பட வேண்டும். ஒவ்வோர் உறுப்பின் முன்குறியையும் பாதுகாக்க வேண்டும்.'],
 factor:['Factorisation reverses expansion: look for factors whose product gives the original expression. Multiplying back verifies the result.','காரணிப்படுத்தல் என்பது விரித்தலின் எதிர்ச் செயல். காரணிகளை மீண்டும் பெருக்கினால் மூலக் கோவை கிடைக்க வேண்டும்.'],
 equation:['An equation stays balanced when the same operation is performed on both sides. Isolate the unknown without changing equality.','சமன்பாட்டின் இரு பக்கங்களிலும் ஒரே செயலைச் செய்தால் சமம் மாறாது. தெரியாத மாறியைத் தனியாக்க வேண்டும்.'],
 squareSum:['The square of a sum includes two cross-terms. Squaring each part separately misses the middle term.','கூட்டலின் வர்க்கத்தில் நடுவிலுள்ள இரட்டை பெருக்கல் உறுப்பும் வரும். ஒவ்வொன்றையும் தனியாக வர்க்கமிட்டால் அந்த உறுப்பு தவறிவிடும்.'],
 wordModel:['Translate the real-world wording into a mathematical operation first. Keep the units and identify whether the question asks for a total, difference, area or rate.','வார்த்தை வினாவை முதலில் கணிதச் செயலாக மாற்ற வேண்டும். அலகுகளையும் மொத்தம், வித்தியாசம், பரப்பளவு, விகிதம் போன்ற நோக்கத்தையும் கவனிக்கவும்.'],
 angles:['Angles around a straight line total 180°, while the interior angles of a triangle total 180°. Use the relation that matches the figure.','ஒரு நேர்கோட்டில் அருகருகே உள்ள கோணங்களின் கூடுதல் 180°. முக்கோணத்தின் உட்கோணங்களின் கூடுதலும் 180°. படத்திற்குப் பொருத்தமானதைப் பயன்படுத்தவும்.'],
 parallel:['When a transversal cuts parallel lines, certain alternate or corresponding angles are equal. Identify the matching angle positions before substituting numbers.','இணைக் கோடுகளை ஒரு குறுக்குக்கோடு வெட்டும்போது சில மாற்றுக் கோணங்களும் ஒத்த கோணங்களும் சமம். எண்களைப் பதிலிடுமுன் இடங்களைப் பொருத்திப் பார்க்கவும்.'],
 congruence:['Congruent triangles match in both shape and size. A valid criterion compares corresponding sides and angles in the same order.','சர்வசம முக்கோணங்கள் வடிவமும் அளவும் ஒன்றே. பொருத்தமான பக்கங்கள், கோணங்களை ஒரே வரிசையில் ஒப்பிட வேண்டும்.'],
 theorem:['State exactly which geometric fact connects the given measurements to the unknown. A diagram suggests a relation but does not prove it by appearance alone.','கொடுக்கப்பட்ட அளவுகளையும் தேடப்படும் மதிப்பையும் இணைக்கும் வடிவியல் உண்மையைக் குறிப்பிட வேண்டும். படம் பார்த்து மட்டும் முடிவு செய்யக் கூடாது.'],
 pythagoras:['Pythagoras applies only to right triangles. The longest side opposite the right angle is the hypotenuse; its square equals the sum of the other two squares.','பிதாகரஸ் தேற்றம் செங்கோண முக்கோணத்திற்கே பொருந்தும். செங்கோணத்திற்கு எதிரே உள்ள கர்ணத்தின் வர்க்கம் மற்ற இரு பக்கங்களின் வர்க்கக் கூட்டலுக்குச் சமம்.'],
 coordinates:['An ordered pair lists horizontal position first, then vertical position. Negative values go left or down respectively; do not swap the coordinates.','வரிசைச் சோடியில் முதலில் கிடைமட்ட இடமும் பின்னர் செங்குத்து இடமும் வரும். எதிர்ம மதிப்புகள் முறையே இடப்பக்கம் அல்லது கீழ்ப்பக்கம் செல்லும்.'],
 midpoint:['A midpoint lies halfway between two endpoints. Average their x-coordinates and their y-coordinates separately.','நடுப்புள்ளி இரு முனைகளுக்கும் நடுவில் இருக்கும். x ஆயங்களையும் y ஆயங்களையும் தனித்தனியே சராசரியாகக் காணவும்.'],
 distance:['The horizontal and vertical changes form the two legs of a right triangle. Use Pythagoras to calculate the straight-line distance.','கிடைமட்ட, செங்குத்து மாற்றங்கள் செங்கோண முக்கோணத்தின் இரு பக்கங்களாகும். பிதாகரஸ் தேற்றத்தால் நேர்கோட்டுத் தொலைவை காணலாம்.'],
 trigSides:['Opposite and adjacent sides are named relative to the marked angle; the hypotenuse is always opposite the right angle. Identify them before forming ratios.','எதிர்ப்பக்கம், அடுத்த பக்கம் ஆகியவை குறிக்கப்பட்ட கோணத்தைப் பொறுத்தவை. கர்ணம் எப்போதும் செங்கோணத்திற்கு எதிரே இருக்கும். விகிதம் காணும்முன் பக்கங்களை அறியவும்.'],
 trigRatio:['Sine compares opposite with hypotenuse; cosine compares adjacent with hypotenuse; tangent compares opposite with adjacent. The angle determines the naming.','சைன் எதிர்ப்பக்கம்/கர்ணம்; கோசைன் அடுத்த பக்கம்/கர்ணம்; டேன்ஜென்ட் எதிர்ப்பக்கம்/அடுத்த பக்கம். குறிக்கப்பட்ட கோணமே பக்கப் பெயரை நிர்ணயிக்கிறது.'],
 reciprocal:['The reciprocal trigonometric ratio swaps numerator and denominator. This is valid only when the original denominator and ratio are nonzero.','தலைகீழ் முக்கோணவியல் விகிதத்தில் தொகுதியும் பகுதியும் இடம் மாறும். பூஜ்ஜியத்தால் வகுக்க முடியாத வரம்பில் மட்டுமே இதைப் பயன்படுத்தவும்.'],
 triangleArea:['Triangle area is half the area of a rectangle or parallelogram with the same base and perpendicular height. Use a perpendicular height, not an arbitrary slanted side.','ஒரே அடிப்பக்கமும் செங்குத்து உயரமும் கொண்ட இணைகரத்தின் பரப்பளவில் பாதியே முக்கோணத்தின் பரப்பளவு. சாய்ந்த பக்கத்தைக் உயரமாக எடுக்கக் கூடாது.'],
 heron:['Heron’s formula uses only the three side lengths. First find the semiperimeter, then substitute s, s−a, s−b, and s−c under one square root.','ஹெரான் சூத்திரத்தில் மூன்று பக்க நீளங்கள் போதும். முதலில் அரைச் சுற்றளவைக் கண்டு s, s−a, s−b, s−c மதிப்புகளை ஒரே வர்க்கமூலத்தில் இடவும்.'],
 perimeter:['Perimeter measures the distance around a shape, so add boundary lengths. Area measures the region inside, so its units are squared.','சுற்றளவு என்பது வடிவத்தின் எல்லையைச் சுற்றிய நீளம்; எல்லைப் பக்கங்களை கூட்ட வேண்டும். பரப்பளவு என்பது உட்பகுதி; அதன் அலகு வர்க்க அலகாகும்.'],
 cylinder:['A cylinder’s curved surface unwraps into a rectangle whose width is the circular circumference and whose height is the cylinder height.','உருளையின் வளைபரப்பை விரித்தால் ஒரு செவ்வகம் கிடைக்கும். அதன் அகலம் வட்டத்தின் சுற்றளவாகவும் உயரம் உருளையின் உயரமாகவும் இருக்கும்.'],
 cone:['A cone has a circular base and a sloping side. Its curved area uses slant height; its volume uses perpendicular height. Keep the two heights distinct.','கூம்பின் வளைபரப்பிற்கு சாயுயரமும் கனஅளவிற்கு செங்குத்து உயரமும் தேவை. இரண்டையும் ஒன்றாகக் கருதக் கூடாது.'],
 sphere:['Every point on a sphere lies at the same radius from its centre. Check whether the question gives radius or diameter before using an area or volume formula.','ஒரு கோளத்தின் மேற்பரப்பிலுள்ள எல்லா புள்ளிகளும் மையத்திலிருந்து ஒரே ஆரத்தில் இருக்கும். சூத்திரத்தில் இடும்முன் ஆரமா விட்டமா எனச் சரிபார்க்கவும்.'],
 volume:['Volume counts three-dimensional space, so its units are cubic. Convert all lengths to one common unit before multiplying dimensions.','கனஅளவு முப்பரிமாண இடத்தை அளக்கும்; அதன் அலகு கன அலகு. நீளங்களைப் பெருக்கும்முன் ஒரே அலகாக மாற்ற வேண்டும்.'],
 conversion:['Unit conversions must happen before substituting into a formula. For area, the conversion factor is squared; for volume, it is cubed.','சூத்திரத்தில் பதிலிடுமுன் அலகுகளை மாற்ற வேண்டும். பரப்பளவில் மாற்றுக் காரணி வர்க்கமாகவும் கனஅளவில் கனமாகவும் மாறும்.'],
 grouped:['A frequency shows how many observations fall in a group. Count each group according to its frequency rather than treating every row as one observation.','ஒரு வகுப்பில் எத்தனை தரவுகள் உள்ளன என்பதை நிகழ்வெண் காட்டுகிறது. ஒவ்வொரு வரியையும் ஒரு தரவாக எடுத்துக்கொள்ளாமல் நிகழ்வெண்ணைப் பயன்படுத்தவும்.'],
 mean:['The arithmetic mean is the total of all observations divided by how many observations there are. Repeated values count each time they appear.','கூட்டுச் சராசரி என்பது எல்லா மதிப்புகளின் கூட்டலை தரவுகளின் எண்ணிக்கையால் வகுத்ததாகும். மீண்டும் வரும் மதிப்புகளையும் ஒவ்வொரு முறையும் எண்ண வேண்டும்.'],
 median:['The median is the middle value after ordering the data. With an even number of observations, average the two central values.','தரவுகளை வரிசைப்படுத்திய பின் நடுவில் உள்ள மதிப்பே இடைநிலை. எண்ணிக்கை இரட்டையாக இருந்தால் நடுவிலுள்ள இரு மதிப்புகளின் சராசரியை எடுக்க வேண்டும்.'],
 mode:['The mode is the value that occurs most frequently. The largest numerical value is not necessarily the most common value.','அதிக முறை தோன்றும் மதிப்பே முகடு. மிகப் பெரிய எண்ணே எப்போதும் முகடாக இருக்காது.'],
 chart:['A graph or chart must use the correct scale. The frequency or measurement determines the height; the label tells what the bar represents.','வரைபடத்தில் சரியான அளவுகோலை பயன்படுத்த வேண்டும். பட்டையின் உயரம் நிகழ்வெண் அல்லது அளவைக் காட்டும்; பெயர் அதன் பொருளைக் குறிக்கும்.'],
 probability:['Probability is favourable equally likely outcomes divided by all equally likely outcomes. Define the sample space before counting favourable results.','நிகழ்தகவு என்பது சாதகமான சமவாய்ப்பு முடிவுகளின் எண்ணிக்கையை எல்லா சமவாய்ப்பு முடிவுகளின் எண்ணிக்கையால் வகுத்த விகிதம். முதலில் முடிவுக் கணத்தை அறியவும்.'],
 complementP:['An event and its complement together cover all outcomes without overlap. Their probabilities therefore add up to one.','ஒரு நிகழ்ச்சியும் அதன் நிரப்புநிகழ்ச்சியும் எல்லா முடிவுகளையும் ஒன்றுக்கொன்று மீளாமல் கொண்டிருக்கும். எனவே அவற்றின் நிகழ்தகவுகளின் கூடுதல் ஒன்று.'],
 countOutcomes:['List all possible outcomes systematically, not just the outcomes you hope for. For two independent choices, count every ordered combination.','விரும்பிய முடிவுகளை மட்டும் அல்லாமல் சாத்தியமான எல்லா முடிவுகளையும் முறையாக எண்ண வேண்டும். இரு சுதந்திரத் தேர்வுகளின் ஒவ்வொரு வரிசைச் சேர்க்கையையும் கணக்கிட வேண்டும்.'],
 experimentalP:['Experimental probability uses observed frequency divided by the total number of trials. It can differ from the ideal equally likely theoretical model.','சோதனை நிகழ்தகவு என்பது நிகழ்ந்த எண்ணிக்கையை மொத்தச் சோதனைகளால் வகுத்ததாகும். இது கோட்பாட்டு சமவாய்ப்பு மதிப்பிலிருந்து மாறலாம்.'],
 mutuallyExclusive:['Two mutually exclusive events cannot occur together in one trial. If outcomes overlap, subtract the overlap before adding their probabilities.','ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் ஒரே முயற்சியில் சேர்ந்து நிகழாது. பொதுவான முடிவுகள் இருந்தால் நிகழ்தகவுகளைக் கூட்டும்முன் அந்தப் பகுதியைக் கழிக்க வேண்டும்.']
};
const R={
  '1':[
  [/prime|divisor/i,'prime'],[/well-defined|clearly|subjective|objective|rich|beautiful|intelligent/i,'membership'],
  [/roster|list the elements|enumerate|distinct members/i,'roster'],[/set-builder|condition|x\s*[∈<>=]|belongs to/i,'setBuilder'],
  [/finite|infinite/i,'finite'],[/subset|subsets|contained in/i,'subset'],
  [/union|∪|either set/i,'union'],[/intersection|∩|common to both/i,'intersection'],
  [/complement|not in|outside|universal/i,'complement'],[/difference|A\s*−\s*B|remove from/i,'difference'],
  [/Venn|diagram|overlap|region/i,'venn'],[/number of elements|cardinal|count|both sets/i,'cardinality']],
  '2':[
  [/rationalis|conjugate/i,'conjugate'],[/scientific notation|standard form|power of ten|decimal point.*move/i,'scientific'],
  [/like surds|combine.*surds|coefficients of like/i,'likeSurds'],[/square[- ]root|perfect[- ]square|radicand|simplify.*surd|extract.*root|factor.*radical/i,'radical'],
  [/fifth root|cube root|nth root|perfect.*power/i,'rootPower'],[/exponent|indices|powers|same base/i,'exponent'],
  [/number line|arrow|between|zoom|mark.*point/i,'realLine'],[/round|decimal places|nearest/i,'rounding'],
  [/irrational|non[- ]repeating|non[- ]terminating/i,'irrational'],[/rational|terminating|fraction/i,'rational'],
  [/between|bounds|interval|greater than.*less than/i,'between']],
  '3':[
  [/difference of squares|factoris|factors/i,'factor'],[/square of|identity|expand the square/i,'squareSum'],
  [/expand|multiply.*bracket|distribut/i,'distributive'],[/equation|solve for|isolate|both sides/i,'equation'],
  [/total cost|price|amount|distance|area|word problem/i,'wordModel']],
  '4':[
  [/Pythagor|right triangle|hypotenuse/i,'pythagoras'],[/parallel|transversal|alternate|corresponding angle/i,'parallel'],
  [/congruen|SSS|SAS|ASA|RHS/i,'congruence'],[/triangle.*angle|angle sum|straight line|180/i,'angles'],
  [/theorem|proof|prove|property|diagonal|bisect/i,'theorem']],
  '5':[
  [/midpoint|middle of|average.*coordinate/i,'midpoint'],[/distance|Pythagor/i,'distance'],
  [/coordinate|origin|quadrant|plot|x-axis|y-axis/i,'coordinates']],
  '6':[
  [/Pythagor|missing side/i,'pythagoras'],[/opposite|adjacent|hypotenuse|side.*angle/i,'trigSides'],
  [/reciprocal|secant|cosecant|cotangent/i,'reciprocal'],[/sin|cos|tan|ratio/i,'trigRatio']],
  '7':[
  [/Heron|semiperimeter|s\s*=\s*\(/i,'heron'],[/slant height|cone/i,'cone'],
  [/cylinder|curved surface/i,'cylinder'],[/sphere|hemisphere/i,'sphere'],
  [/unit|convert|cm.*m|metre.*centimetre/i,'conversion'],
  [/volume|capacity|cubic/i,'volume'],[/perimeter|boundary/i,'perimeter'],
  [/triangle|base.*height|area/i,'triangleArea']],
  '8':[
  [/median|central|middle value/i,'median'],[/mode|most frequent/i,'mode'],[/bar graph|histogram|chart|scale|graph/i,'chart'],
  [/mean|average|sum.*observations/i,'mean'],[/frequency|group|class interval|tally/i,'grouped']],
  '9':[
  [/complement|not|neither|at least one/i,'complementP'],
  [/mutually exclusive|both.*categories|overlap|union of events/i,'mutuallyExclusive'],
  [/experimental|recorded|observed|frequency|survey/i,'experimentalP'],
  [/sample space|list.*outcomes|possib.*outcomes|total.*outcomes|dice|die|coin|card/i,'countOutcomes'],
  [/probability|favourable|equally likely/i,'probability']]
};
const DEF={'1':'membership','2':'realLine','3':'identity','4':'theorem','5':'coordinates','6':'trigSides','7':'triangleArea','8':'grouped','9':'probability'};
function choose(item){
 const ch=String(item.chapter),steps=item.steps||[],candidates=[];
 for(const [re,key] of (R[ch]||[])){
  for(let i=0;i<steps.length;i++){
   const s=String(steps[i]?.en||'');
   if(re.test(s))candidates.push({key,step:i,score:3.5-(i*0.07)});
  }
  const title=String(item.title?.en||'');
  if(re.test(title))candidates.push({key,step:0,score:2.2});
 }
 if(candidates.length){
  // Prefer the highest-priority subject-specific matched step; not blindly the first line.
  candidates.sort((a,b)=>b.score-a.score);
  return {...candidates[0],fallback:false};
 }
 return {key:DEF[ch]||'wordModel',step:0,fallback:true};
}
function picture(item,choice){
 const ch=String(item.chapter),q=String(item.q?.en||''),title=String(item.title?.en||'').toLowerCase();
 // Only generic conceptual sketches, never invented textbook measurements.
 if(ch==='1'&&choice.key==='venn')return {type:'venn',left:'A',right:'B'};
 if(ch==='1'&&choice.key==='intersection')return {type:'venn',left:'A',right:'B'};
 if(ch==='2'&&['between','realLine','rounding'].includes(choice.key))
   return {type:'numberline',labels:['smaller','between','larger']};
 if(ch==='4'&&['pythagoras','triangleArea'].includes(choice.key))
   return {type:'triangle',generic:true};
 if(ch==='5'&&['coordinates','midpoint','distance'].includes(choice.key))
   return {type:'coordinates',generic:true};
 if(ch==='6'&&['trigSides','trigRatio','pythagoras'].includes(choice.key))
   return {type:'triangle',generic:true};
 if(ch==='7'&&['heron','triangleArea'].includes(choice.key))
   return {type:'triangle',generic:true};
 if(ch==='9'&&/fair\s+(?:die|dice)|rolling? a die|throw.*die|die is thrown/i.test(q)&&choice.key==='countOutcomes')
   return {type:'dice',outcomes:[1,2,3,4,5,6]};
 return null;
}
const hints={},audit={generatedAt:'2026-11-14',grade:9,source:'existing authored student-facing content',totalAuthored:grade.items.length,eligible:eligible.length,byChapter:{},byConcept:{},fallbacks:[],diagrams:0,excluded:grade.items.filter(x=>!eligible.includes(x)).map(x=>({id:x.id,kind:x.kind}))};
for(const item of eligible){
 if(hints[item.id])throw Error('Duplicate '+item.id);
 const choice=choose(item),step=item.steps[choice.step],pair=BANK[choice.key];
 if(!pair||!step?.en)throw Error('Cannot explain '+item.id);
 const expected=step.en.slice(0,Math.min(step.en.length,80)),entry={step:choice.step,expected,en:pair[0],ta:pair[1],concept:choice.key};
 const diagram=picture(item,choice);if(diagram){entry.diagram=diagram;audit.diagrams++;}
 hints[item.id]=entry;
 audit.byChapter[item.chapter]=(audit.byChapter[item.chapter]||0)+1;
 audit.byConcept[choice.key]=(audit.byConcept[choice.key]||0)+1;
 if(choice.fallback)audit.fallbacks.push({id:item.id,chapter:item.chapter,title:item.title?.en,step:step.en});
}
const output='/* Source-pinned Grade 9 optional explanations. Original textbook questions and answers unchanged.\\n'+
' * Generated from existing authored source and pedagogically authored concept library.\\n'+
' * Tamil editor review pending. Run node site/tools/generate_why_step_g9.cjs after source updates. */\\n'+
'(()=>{\\'use strict\\';window.TriggleWhyStepG9=Object.freeze('+JSON.stringify({version:'2026-11-14-g9',grade:9,review:{ta:'editorial-pending'},hints},null,2)+');})();\\n';
fs.writeFileSync(path.join(root,'site/data/why-step-g9.js'),output);
fs.mkdirSync(path.join(root,'docs/curriculum/grade-9'),{recursive:true});
fs.writeFileSync(path.join(root,'docs/curriculum/grade-9/why-step-audit.json'),JSON.stringify(audit,null,2)+'\n');
console.log('Grade 9 Why: '+eligible.length+' eligible / '+grade.items.length+' authored; '+audit.fallbacks.length+' broad-concept fallbacks; '+audit.diagrams+' useful generic diagrams.');
console.log('Chapter counts',audit.byChapter,'concepts',audit.byConcept);
if(audit.fallbacks.length)console.log('Review generic fallbacks:',audit.fallbacks.slice(0,40));
