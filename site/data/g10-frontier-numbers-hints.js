/* Source-matched explanations for Grade 10 Numbers and Sequences. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-2-ex2-3-q1-i","The symbol ≡ (mod 8) means these two integers must give the same rem"],
    ["c10-2-unit-q3","By Euclid's division lemma, express a, b, and c in terms of multiple"]
  ],
    "Write each number as a multiple of the divisor plus a remainder. The multiples contribute zero to the new remainder.",
    "ஒவ்வொரு எண்ணையும் வகுப்பியின் மடங்கும் மீதியும் சேர்ந்த வடிவில் எழுதுக. வகுப்பியின் மடங்குகள் புதிய மீதியில் எந்த மாற்றமும் செய்யாது.");

  add([
    ["c10-2-ex2-3-q5","First remove complete 24-hour days."],
    ["c10-2-ex2-3-q6","11 p.m. is 23:00 in the 24-hour clock."]
  ],
    "A 24-hour interval returns to the same clock reading. Use a 24-hour clock before you add or subtract, and wrap at midnight if needed.",
    "24 மணி நேரம் கழித்து கடிகாரம் அதே நேரத்தைக் காட்டும். கூட்டுவதற்கும் கழிப்பதற்கும் முன் 24 மணி நேர முறைக்கு மாற்றுக. நள்ளிரவைக் கடந்தால் நாளின் தொடக்கத்திலிருந்து தொடர்க.");

  add([
    ["c10-2-ex2-3-q7","Every seven days we return to Tuesday; count the leftover days only."]
  ],
    "A complete week returns to the original weekday. For the weekday alone, count only the days left after whole weeks.",
    "ஒரு முழு வாரம் கழித்து அதே கிழமை மீண்டும் வரும். கிழமையை மட்டும் அறிய, முழு வாரங்களுக்குப் பின் மீதமுள்ள நாள்களை எண்ணுக.");

  add([
    ["c10-2-ex2-3-q9","Look for a short power of 2 that gives a convenient remainder modulo"],
    ["c10-2-ex2-10-q6","Evaluate the first four powers of 7 to spot a simple remainder when"]
  ],
    "When a small power has remainder 1, every power of that block also has remainder 1. Split the exponent into complete blocks and a leftover power.",
    "ஒரு சிறிய அடுக்கின் மீதி 1 எனில், அந்த அடுக்கை மீண்டும் மீண்டும் பெருக்கினாலும் மீதி 1. அடுக்கை முழுத் தொகுதிகளாகவும் எஞ்சிய அடுக்காகவும் பிரிக்கவும்.");

  add([
    ["c10-2-ex2-3-q10","Add the 11-hour flight duration to departure time in Chennai."]
  ],
    "Compute arrival on one clock first. Then subtract the stated time difference once to convert that same arrival instant to London time.",
    "முதலில் ஒரே நேர மண்டலத்தில் வருகை நேரத்தைக் கணக்கிடுக. பிறகு அதே வருகை நேரத்தை இலண்டன் நேரமாக மாற்ற, கொடுக்கப்பட்ட நேர வேறுபாட்டை ஒருமுறை கழிக்கவும்.");

  add([
    ["c10-2-ex2-4-q1","In (i) each term is multiplied by 3."]
  ],
    "A sequence can change by addition, multiplication, or a position rule. Test a proposed rule on all the displayed steps before continuing it.",
    "ஒரு தொடர்வரிசை கூட்டல், பெருக்கல் அல்லது உறுப்பு நிலையைக் கொண்ட விதிப்படி அமையலாம். அடுத்த உறுப்பை எழுதுமுன், கொடுக்கப்பட்ட எல்லா உறுப்புகளுக்கும் விதி பொருந்துகிறதா எனப் பார்க்கவும்.");

  add([
    ["c10-2-ex2-4-q2-i","Use n = 1 in the given formula."],
    ["c10-2-ex2-4-q2-iii","Square n, multiply by 2, and only then subtract 6."],
    ["c10-2-ex2-4-q4-i","Substitute n = 6 in numerator and denominator together, then simplif"]
  ],
    "The subscript gives the input position. Replace every occurrence of n with that position before doing arithmetic.",
    "கீழ்க்குறியீடு உறுப்பின் நிலையைக் குறிக்கிறது. கணக்கிடுவதற்கு முன் எல்லா இடங்களிலும் n-க்குப் பதிலாக அந்த நிலையெண்ணைப் பிரதியிடுக.");

  add([
    ["c10-2-ex2-4-q2-ii","First decide the sign: (−1) raised to an even power is +1, and to an"]
  ],
    "An odd number of factors equal to −1 gives −1 and an even number gives +1. Work out the sign before multiplying by the other factor.",
    "−1 ஐ ஒற்றை எண்ணிக்கையில் பெருக்கினால் −1 கிடைக்கும். இரட்டை எண்ணிக்கையில் பெருக்கினால் +1 கிடைக்கும். மற்ற காரணியால் பெருக்கும் முன் குறியைத் தீர்மானிக்கவும்.");

  add([
    ["c10-2-ex2-4-q3-i","Compare each term with the squares 1, 4, 9, 16."],
    ["c10-2-ex2-4-q3-ii","Write the first term as 0/1; then compare numerator and denominator"]
  ],
    "Compare the terms with their position numbers. Check that the proposed formula reproduces the first term as well as the later displayed terms.",
    "உறுப்புகளை அவற்றின் நிலையெண்களுடன் ஒப்பிடுக. கண்ட விதி முதல் உறுப்பையும் அடுத்து கொடுக்கப்பட்ட உறுப்புகளையும் தருகிறதா எனச் சரிபார்க்கவும்.");

  add([
    ["c10-2-ex2-4-q3-iii","The difference between each pair of neighbouring terms is 5."],
    ["c10-2-ex2-5-q4","Identify the first term and common difference."],
    ["c10-2-ex2-5-q5","The progression begins at 16 and decreases by 5 each step."],
    ["c10-2-ex2-5-q7","Write the 9th and 15th terms using the first term a and difference d"],
    ["c10-2-ex2-5-q10","The first row has 20 seats."],
    ["c10-2-ex2-10-q9","Write the 6th and 7th terms using first term a and difference d."],
    ["c10-2-unit-q5","Let the A.P."]
  ],
    "The first term is already the starting position. To reach position n, add the common difference exactly n−1 times.",
    "முதல் உறுப்பே தொடக்க நிலை. n-ஆம் உறுப்பை அடையப் பொது வித்தியாசத்தை n−1 முறை மட்டுமே கூட்ட வேண்டும்.");

  add([
    ["c10-2-ex2-4-q4-ii","The minus sign is outside the whole bracket."]
  ],
    "A minus sign before a bracket changes the sign of the complete value in the bracket. Keep it outside until the bracket is evaluated.",
    "அடைப்புக்குறிக்கு முன் உள்ள கழித்தல் குறி, அடைப்புக்குறிக்குள் கிடைக்கும் முழு மதிப்பின் குறியை மாற்றும். உள்ளே கணக்கிட்டு முடித்தபின் அதைப் பயன்படுத்துக.");

  add([
    ["c10-2-ex2-4-q5","A piecewise rule gives two different formulas."]
  ],
    "Choose the formula by the parity of the position, not by whether the resulting term is odd or even.",
    "உறுப்பின் நிலையெண் ஒற்றையா இரட்டையா என்பதைப் பார்த்து சூத்திரத்தைத் தேர்ந்தெடுக்க வேண்டும். கிடைக்கும் உறுப்பின் மதிப்பை வைத்து சூத்திரத்தைத் தேர்ந்தெடுக்கக் கூடாது.");

  add([
    ["c10-2-ex2-4-q6","The first two terms are already given."],
    ["c10-2-ex2-10-q7","Each new term is the sum of the previous two terms."]
  ],
    "A recurrence uses terms already known. Record each new result before moving to the next position, so you use the correct two predecessors.",
    "மீளுறவுச் சூத்திரம் ஏற்கெனவே தெரிந்த உறுப்புகளைப் பயன்படுத்துகிறது. அடுத்த நிலைக்குச் செல்லும்முன் புதிய மதிப்பை எழுதினால் அதற்கு முந்தைய சரியான இரு உறுப்புகளைப் பயன்படுத்தலாம்.");

  add([
    ["c10-2-ex2-5-q1-i","In an A.P., each next term minus the preceding term must be the same"],
    ["c10-2-ex2-5-q1-ii","An arithmetic progression needs one constant difference between each"],
    ["c10-2-ex2-5-q1-iii","Find the differences between successive terms."],
    ["c10-2-ex2-5-q1-iv","Subtract each term from the next term."],
    ["c10-2-ex2-5-q1-v","Find the change from the first term to the second."]
  ],
    "Always subtract the earlier term from the later term. Matching one gap is insufficient. All consecutive differences must be the same.",
    "பின் உறுப்பிலிருந்து முன் உறுப்பைக் கழிக்கவும். ஒரே ஒரு வித்தியாசத்தைப் பார்த்தால் போதாது. அடுத்தடுத்த எல்லா உறுப்புகளின் வித்தியாசங்களும் சமமாக இருக்க வேண்டும்.");

  add([
    ["c10-2-ex2-5-q2-i","The first term is already known."],
    ["c10-2-ex2-5-q2-ii","A negative common difference means each following term is smaller."],
    ["c10-2-ex2-5-q2-iii","Write the first term exactly as given."]
  ],
    "Start with the given first term. Adding the same signed difference at each step generates the progression, even when the values decrease.",
    "கொடுக்கப்பட்ட முதல் உறுப்பிலிருந்து தொடங்குக. ஒவ்வொரு படியிலும் பொதுவித்தியாசத்தை அதன் குறியுடன் கூட்டினால், மதிப்புகள் குறைந்தாலும் அதே கூட்டுத் தொடர்வரிசை கிடைக்கும்.");

  add([
    ["c10-2-ex2-5-q3-i","The first term means n = 1."],
    ["c10-2-ex2-5-q3-ii","At n = 1, the formula gives the first term."]
  ],
    "Use the formula at positions one and two and subtract in order. In an arithmetic progression that first difference is the same at every position.",
    "முதல், இரண்டாம் நிலைகளுக்குச் சூத்திரத்தைப் பயன்படுத்தி, இரண்டிலிருந்து முதலாவதைக் கழிக்கவும். கூட்டுத் தொடர்வரிசை முழுவதும் இந்த வித்தியாசமே இருக்கும்.");

  add([
    ["c10-2-ex2-5-q6","Calculate how many terms the A.P."]
  ],
    "Count the endpoint positions as well as the gaps. An even number of terms has two central positions. An odd number has one.",
    "இடைவெளிகளுடன் முனை உறுப்புகளையும் கணக்கில் கொள்க. உறுப்புகளின் எண்ணிக்கை இரட்டையெனில் இரு நடு உறுப்புகள். ஒற்றையெனில் ஒரு நடு உறுப்பு.");

  add([
    ["c10-2-ex2-5-q8","For any three numbers in A.P., the middle number is the average of t"],
    ["c10-2-ex2-5-q11","Represent the consecutive A.P."],
    ["c10-2-ex2-10-q10","For an odd number of A.P."]
  ],
    "The outer terms lie equally far on either side of the middle position. Their positive and negative offsets cancel when added.",
    "நடு உறுப்பிலிருந்து இருபுறமும் சம எண்ணிக்கையிலான இடைவெளியில் முனை உறுப்புகள் உள்ளன. அவற்றின் நேர்ம, எதிர்ம விலகல்களைக் கூட்டினால் அவை நீங்கும்.");

  add([
    ["c10-2-ex2-5-q9","Terms 10 and 24 are two positions apart; divide the change by two."],
    ["c10-2-ex2-6-q5","Subtract the two term equations to eliminate the first term."]
  ],
    "The difference between two terms equals the number of gaps between their positions times the common difference. Subtract the positions to count the gaps.",
    "இரு உறுப்புகளின் வித்தியாசம், அவற்றின் நிலைகளுக்கு இடையேயான இடைவெளிகளின் எண்ணிக்கையையும் பொதுவித்தியாசத்தையும் பெருக்கக் கிடைக்கும். நிலையெண்களைக் கழித்து இடைவெளிகளை எண்ணுக.");

  add([
    ["c10-2-ex2-5-q12","Write a₆=a+5d and a₈=a+7d, then cross multiply."]
  ],
    "Express both terms in the ratio using the first term and common difference. Cross multiplication turns the ratio into an equation between those two unknowns.",
    "விகிதத்திலுள்ள இரு உறுப்புகளையும் முதல் உறுப்பு, பொதுவித்தியாசம் மூலம் எழுதுக. குறுக்குப் பெருக்கல் அவ்விகிதத்தை இரு தெரியாத மதிப்புகளைக் கொண்ட சமன்பாடாக மாற்றும்.");

  add([
    ["c10-2-ex2-5-q13","Let Monday be a and the daily change be d."]
  ],
    "Two sums of equal length contain equally many copies of the starting term. Subtracting those sums eliminates that unknown and leaves the daily change.",
    "சம எண்ணிக்கையிலான உறுப்புகளைக் கொண்ட இரு கூடுதல்களிலும் தொடக்க உறுப்பு அதே எண்ணிக்கையில் இடம்பெறும். கூடுதல்களைக் கழித்தால் தொடக்க உறுப்பு நீங்கி, தினசரி மாற்றம் மட்டும் எஞ்சும்.");

  add([
    ["c10-2-ex2-5-q14","Monthly savings begin at 15,000−13,000=2,000 and grow by 1,500−900=6"]
  ],
    "Monthly savings equal income minus expenses. Since both grow by fixed amounts each year, subtract their increases to obtain the yearly change in savings.",
    "மாதச் சேமிப்பு என்பது வருமானத்திலிருந்து செலவைக் கழித்த தொகை. இரண்டும் ஆண்டுதோறும் நிலையான தொகைகளால் உயர்வதால், அந்த உயர்வுகளைக் கழித்து சேமிப்பின் ஆண்டு மாற்றத்தைக் காணலாம்.");

  add([
    ["c10-2-ex2-6-q1","For (i), use a=3, d=4, n=40 in the sum formula."],
    ["c10-2-ex2-6-q3","Substitute n = 1 into tₙ = 4n − 3 to find the first term a = t₁."],
    ["c10-2-ex2-6-q8","Payments form an A.P."],
    ["c10-2-ex2-6-q10","There are 29 decreases between the bottom and the 30th step."],
    ["c10-2-ex2-6-q11","For the kth A.P."],
    ["c10-2-ex2-6-q12","For a + b ≠ 0, identify the first term T₁ and the constant common di"],
    ["c10-2-unit-q8","Let the savings in the first year be ₹a."]
  ],
    "Pair the first and last terms, then the second and second-last. Each pair has the same sum, so the average of the first and last gives the average of all terms.",
    "முதல் உறுப்பைக் கடைசி உறுப்புடனும், இரண்டாம் உறுப்பைக் கடைசியிலிருந்து இரண்டாம் உறுப்புடனும் இணைக்கவும். ஒவ்வொரு சோடியின் கூடுதலும் சமம். எனவே முதல், கடைசி உறுப்புகளின் சராசரியே எல்லா உறுப்புகளின் சராசரி.");

  add([
    ["c10-2-ex2-6-q1-iii","Identify the first term a = 6, the common difference d = 13 − 6 = 7,"]
  ],
    "Subtract the first term from the last and divide by the common difference to count the gaps. Add one to include the starting term.",
    "கடைசி உறுப்பிலிருந்து முதல் உறுப்பைக் கழித்து பொதுவித்தியாசத்தால் வகுத்தால் இடைவெளிகளின் எண்ணிக்கை கிடைக்கும். முதல் உறுப்பையும் சேர்க்க அதனுடன் ஒன்றைக் கூட்டுக.");

  add([
    ["c10-2-ex2-6-q2","The terms are 5, 7, 9, … with first term 5 and common difference 2."],
    ["c10-2-ex2-6-q9","Payments form an A.P."],
    ["c10-2-ex2-10-q11","Set the A.P."]
  ],
    "The number of terms is a count. After solving the equation from the series sum, keep the positive whole-number solution.",
    "உறுப்புகளின் எண்ணிக்கை ஒரு எண்ணிக்கை மதிப்பு. தொடரின் கூடுதலிலிருந்து கிடைக்கும் சமன்பாட்டைத் தீர்த்தபின், நேர்ம முழு எண்ணாக உள்ள தீர்வை எடுத்துக்கொள்க.");

  add([
    ["c10-2-ex2-6-q4","Write the partial sum Sₙ = 2n² − 3n and evaluate S₁ to find the firs"]
  ],
    "The sum of the first n terms differs from the sum through position n−1 by exactly the new term. Subtract the two sums before finding the difference between consecutive terms.",
    "முதல் n உறுப்புகளின் கூடுதலுக்கும் முதல் n−1 உறுப்புகளின் கூடுதலுக்கும் உள்ள வித்தியாசமே புதிய உறுப்பு. அடுத்தடுத்த உறுப்புகளை ஒப்பிடும்முன் இந்த இரு கூடுதல்களையும் கழிக்கவும்.");

  add([
    ["c10-2-ex2-6-q6","The odd positive numbers below 450 run from 1 to 449."],
    ["c10-2-ex2-9-q1-vii","Find the number of odd terms n from 1 to 71 using 2n − 1 = 71 (or n"]
  ],
    "Count the odd terms using the last term 2n−1. The sum is n². For example, adding each new odd number extends a square by one row and one column.",
    "கடைசி ஒற்றை உறுப்பு 2n−1 என்பதால் உறுப்புகளின் எண்ணிக்கையைப் பெறலாம். கூடுதல் n². ஒவ்வொரு புதிய ஒற்றை எண்ணையும் சேர்க்கும்போது ஒரு வரிசையும் ஒரு நிரலும் சேர்ந்து சதுரம் பெரிதாகிறது.");

  add([
    ["c10-2-ex2-6-q7","The integers strictly between 602 and 902 are 603 to 901."]
  ],
    "Summing every integer in the interval and then removing the sum of its multiples of four counts each permitted integer once.",
    "இடைவெளியில் உள்ள எல்லா முழு எண்களையும் கூட்டி, அதிலிருந்து நான்கின் மடங்குகளின் கூடுதலைக் கழிக்கவும். அனுமதிக்கப்பட்ட ஒவ்வொரு எண்ணும் ஒருமுறை மட்டும் கணக்கிடப்படும்.");

  add([
    ["c10-2-ex2-7-q1-i","A geometric progression (G.P.) requires a single constant ratio betw"],
    ["c10-2-ex2-7-q1-ii","Check the ratio instead of assuming that a visual pattern is geometr"],
    ["c10-2-ex2-7-q1-iii","The terms are shrinking by the same multiplicative factor."],
    ["c10-2-ex2-7-q1-iv","Dividing the second fraction by the first reveals the multiplicative"],
    ["c10-2-ex2-7-q1-v","Divide the second term by the first term to find the first consecuti"],
    ["c10-2-ex2-7-q1-vi","Check the first pair of successive ratios."],
    ["c10-2-ex2-7-q1-vii","Find the ratio of the second term to the first term."],
    ["c10-2-ex2-10-q13","Divide the second term by the first term to find the ratio between c"]
  ],
    "Divide each later term by the preceding nonzero term. The ratios must agree, including their signs. A constant difference tests a different kind of progression.",
    "பின் உறுப்பை அதற்கு முந்தைய பூச்சியமற்ற உறுப்பால் வகுக்கவும். விகிதங்களும் அவற்றின் குறிகளும் ஒன்றாக இருக்க வேண்டும். பொதுவித்தியாசம் என்பது வேறு வகைத் தொடருக்கான சோதனை.");

  add([
    ["c10-2-ex2-7-q2","For a G.P. write a, ar, ar²; each term multiplies by the same ratio."],
    ["c10-2-ex2-7-q2-ii","The first three terms of a geometric progression are a, ar, and ar²."],
    ["c10-2-ex2-7-q3","The ratio is one third, as each term is divided by 3."],
    ["c10-2-ex2-7-q7","From term 8 to term 10 there are exactly two multiplications by 2."]
  ],
    "Each gap means one multiplication by the ratio. The power of the ratio counts gaps between the known position and the requested position.",
    "ஒவ்வொரு இடைவெளிக்கும் பொதுவிகிதத்தால் ஒருமுறை பெருக்க வேண்டும். தெரிந்த நிலையிலிருந்து கேட்ட நிலைவரை உள்ள இடைவெளிகளைப் பொதுவிகிதத்தின் அடுக்கு குறிக்கிறது.");

  add([
    ["c10-2-ex2-7-q4","The middle term squared equals the product of its two neighbours."]
  ],
    "For nonzero neighbouring terms, equating the two consecutive ratios and cross multiplying gives the square of the middle term. Check the resulting terms in the original ratio condition.",
    "அடுத்தடுத்த உறுப்புகள் பூச்சியமற்றவை எனில், அவற்றின் இரு விகிதங்களைச் சமப்படுத்திக் குறுக்குப் பெருக்கும்போது நடு உறுப்பின் வர்க்கம் கிடைக்கும். கிடைத்த உறுப்புகளை முதலில் கொடுத்த விகித நிபந்தனையில் சரிபார்க்கவும்.");

  add([
    ["c10-2-ex2-7-q5","For (i), both the first and last terms are powers of 2."],
    ["c10-2-ex2-8-q7","The common ratio is 2."]
  ],
    "Compare the last term to the first. Their ratio is a power of the common ratio, and its exponent counts the gaps, which is one fewer than the number of terms.",
    "கடைசி உறுப்பை முதல் உறுப்பால் வகுக்கவும். கிடைக்கும் விகிதம் பொதுவிகிதத்தின் ஓர் அடுக்கு. அந்த அடுக்கு இடைவெளிகளை எண்ணுவதால், உறுப்புகளின் எண்ணிக்கையைவிட ஒன்று குறைவாக இருக்கும்.");

  add([
    ["c10-2-ex2-7-q6","Divide the terms three positions apart to find r cubed."]
  ],
    "The terms are three positions apart. Their quotient cancels the first-term factor and leaves exactly three multiplications by the common ratio.",
    "இரு உறுப்புகளுக்கும் இடையில் மூன்று இடைவெளிகள் உள்ளன. அவற்றை வகுக்கும்போது முதல் உறுப்புக் காரணி நீங்கும். பொதுவிகிதத்தின் மூன்று காரணிகள் மட்டும் எஞ்சும்.");

  add([
    ["c10-2-unit-q9","Write the 2nd and 6th terms of the G.P."]
  ],
    "Dividing terms cancels their common first-term factor and subtracts their exponents. An even exponent can give both a positive and a negative real ratio.",
    "இரு உறுப்புகளை வகுக்கும்போது முதல் உறுப்புக் காரணி நீங்கும். அடுக்குகள் கழிக்கப்படும். கிடைக்கும் அடுக்கு இரட்டையெனில், பொதுவிகிதத்திற்கு நேர்ம, எதிர்ம மதிப்புகள் இரண்டும் இருக்கலாம்.");

  add([
    ["c10-2-ex2-7-q8","For three terms in A.P., the middle term is the average of its neigh"]
  ],
    "Equal additive gaps in the exponents become equal multiplicative ratios for powers of the same positive base.",
    "ஒரே நேர்ம அடிமானத்தின் அடுக்குகளில் சமமான கூட்டல் வித்தியாசங்கள் இருந்தால், அந்த அடுக்குகளின் மதிப்புகளுக்கிடையில் சமமான பெருக்கல் விகிதங்கள் கிடைக்கும்.");

  add([
    ["c10-2-ex2-7-q9","Let the three consecutive terms in G.P."]
  ],
    "Writing the neighbours as the middle term divided and multiplied by the same ratio makes the ratio cancel in their product.",
    "நடு உறுப்பை ஒரே பொதுவிகிதத்தால் வகுத்தும் பெருக்கியும் அதன் இரு அண்டை உறுப்புகளை எழுதலாம். அவற்றைப் பெருக்கும்போது பொதுவிகிதம் நீங்கிவிடும்.");

  add([
    ["c10-2-ex2-7-q10","The starting salary is a = ₹60,000."],
    ["c10-2-ex2-7-q11","The fourth year follows three raises; do not apply four raises."],
    ["c10-2-unit-q10","Given initial value P = ₹45,000, annual rate of depreciation r = 15%"]
  ],
    "Apply the percentage to the current value each year. This repeats multiplication by one fixed factor, and the starting value comes before the first change.",
    "ஒவ்வோர் ஆண்டும் அப்போதுள்ள மதிப்பிற்குச் சதவீதத்தைப் பயன்படுத்தவும். இதனால் ஒரே காரணியால் மீண்டும் மீண்டும் பெருக்குகிறோம். முதல் மாற்றத்திற்கு முன் தொடக்க மதிப்பு உள்ளது.");

  add([
    ["c10-2-ex2-7-q12","Since a, b, c are in A.P."]
  ],
    "Use the equal differences in the exponents and the relation y² = xz. For arbitrary real exponents, use positive bases so the real power laws are valid.",
    "அடுக்குகளின் சம வித்தியாசங்களையும் y² = xz என்ற தொடர்பையும் பயன்படுத்துக. அடுக்குகள் மெய்யெண்களாக இருக்கும்போது மெய்யெண் அடுக்கு விதிகள் பொருந்த நேர்ம அடிமானங்களைப் பயன்படுத்த வேண்டும்.");

  add([
    ["c10-2-ex2-8-q1-i","Identify the first term a = 5 and the common ratio r = t₂/t₁ = −3/5."],
    ["c10-2-ex2-8-q1-ii","Identify the first term a = 256 and the common ratio r = 64/256 = 1/"],
    ["c10-2-ex2-8-q2","The first term is 5, common ratio 3, and n=6."],
    ["c10-2-ex2-8-q3","Apply the geometric sum formula with the first term a unknown."],
    ["c10-2-ex2-8-q8","The number of letters mailed in the 1st, 2nd, 3rd, ..., 8th sets for"],
    ["c10-2-ex2-10-q12","B is a finite geometric series with first term 1 and powers through"]
  ],
    "Multiplying the finite sum by the ratio and subtracting cancels the middle terms. The formula with a denominator applies when the ratio differs from 1.",
    "முடிவுறு கூடுதலைப் பொதுவிகிதத்தால் பெருக்கிக் கழிக்கும்போது இடைப்பட்ட உறுப்புகள் நீங்கும். பொதுவிகிதம் 1 அல்லாதபோது வகுத்தல் உள்ள சூத்திரத்தைப் பயன்படுத்தலாம்.");

  add([
    ["c10-2-ex2-8-q4","Both ratios have absolute value less than 1, so finite limits exist."],
    ["c10-2-ex2-8-q5","Use S∞=a/(1−r), valid only for |r|<1."]
  ],
    "The higher powers of the ratio approach zero only when its absolute value is less than one. Check this condition before taking the infinite sum.",
    "பொதுவிகிதத்தின் தனிமதிப்பு ஒன்றைவிடக் குறைந்தால் அதன் அடுக்குகள் பூச்சியத்தை நெருங்கும். முடிவிலாத் தொடரின் கூடுதலைக் காணும்முன் இந்நிபந்தனையைச் சரிபார்க்கவும்.");

  add([
    ["c10-2-ex2-8-q6-i","Factor out 4 and multiply and divide by 9 so each term can be writte"],
    ["c10-2-ex2-8-q6-ii","Factor out 3 and multiply and divide by 9 so each term becomes a pow"]
  ],
    "After taking out the repeated digit as a factor, multiply the remaining run of ones by nine. The result is a difference involving a power of ten, which makes the separate sums easier.",
    "திரும்பத் திரும்ப வரும் இலக்கத்தைக் காரணியாகப் பிரித்தெடுக்கவும். எஞ்சிய ஒன்றுகளின் தொடரை ஒன்பதால் பெருக்கும்போது பத்தின் அடுக்கைக் கொண்ட ஒரு வித்தியாசம் கிடைக்கும். இதனால் கூடுதல்களைத் தனித்தனியாகக் கணக்கிடுவது எளிதாகும்.");

  add([
    ["c10-2-ex2-8-q9","Expand the repeating decimal 0.123̅ as an infinite geometric series"]
  ],
    "One cycle has three digits. Moving it one block to the right divides its value by 1000, which gives the ratio of the geometric series.",
    "ஒரு சுழற்சியில் மூன்று இலக்கங்கள் உள்ளன. ஓர் இலக்கத் தொகுதியை வலப்புறம் நகர்த்தும்போது அதன் மதிப்பு 1000 ஆல் வகுபடும். இதுவே பெருக்குத் தொடரின் பொதுவிகிதம்.");

  add([
    ["c10-2-ex2-8-q10","Multiply both sides of Sₙ by (x − y) and use the algebraic identity"]
  ],
    "Multiplying by x−y makes the mixed terms cancel in each bracket. The separate power sums can then be evaluated, using the quotient form only when each denominator is nonzero.",
    "x−y ஆல் பெருக்கும்போது ஒவ்வோர் அடைப்புக்குறியிலும் கலப்பு உறுப்புகள் நீங்கும். பிறகு தனித்தனி அடுக்குக் கூடுதல்களைக் காணலாம். வகுத்தல் வடிவத்தைப் பயன்படுத்த அதன் பகுதி பூச்சியமாக இருக்கக் கூடாது.");

  add([
    ["c10-2-ex2-9-q1-i","Use the formula for the sum of the first n natural numbers: 1 + 2 +"]
  ],
    "Pair the numbers from opposite ends. Each pair has the same sum, which leads to the formula for the sum of the first n positive integers.",
    "எதிரெதிர் முனைகளிலுள்ள எண்களைச் சோடியாக இணைக்கவும். ஒவ்வொரு சோடியின் கூடுதலும் சமம். இதிலிருந்து முதல் n மிகை முழு எண்களின் கூடுதல் சூத்திரம் கிடைக்கிறது.");

  add([
    ["c10-2-ex2-9-q1-ii","Factor out the common factor 3 from every term to obtain 3 times the"]
  ],
    "Every term contains the same factor. Taking it outside the sum leaves consecutive natural numbers, to which the standard sum formula applies.",
    "ஒவ்வொரு உறுப்பிலும் ஒரே காரணி உள்ளது. அதை வெளியே எடுத்தால் அடுத்தடுத்த இயல் எண்கள் எஞ்சும். அவற்றுக்குப் பொதுவான கூடுதல் சூத்திரத்தைப் பயன்படுத்தலாம்.");

  add([
    ["c10-2-ex2-9-q1-iii","Express the sum from 51 to 92 as the sum of the first 92 natural num"],
    ["c10-2-ex2-9-q1-v","Write the partial sum of squares from 6² to 21² by subtracting 1² +"],
    ["c10-2-ex2-9-q1-vi","Express the sum from 10³ to 20³ as the sum of the first 20 cubes min"],
    ["c10-2-ex2-9-q6","Each sheet of side k has area k²; sum the squares from 10 to 24."]
  ],
    "Subtract the sum ending just before the required starting index from the sum ending at the final index. The initial terms cancel completely.",
    "தேவையான தொடக்க நிலைக்கு முந்தைய உறுப்புவரை உள்ள கூடுதலை, இறுதி உறுப்புவரை உள்ள கூடுதலிலிருந்து கழிக்கவும். தொடக்கத்திற்கு முன் உள்ள எல்லா உறுப்புகளும் நீங்கும்.");

  add([
    ["c10-2-ex2-9-q1-iv","Recognise each term as a perfect square: 1² + 2² + 3² + 4² + ..."]
  ],
    "The square root of the last displayed square gives the last base and therefore the number of consecutive squares starting at 1².",
    "கடைசி வர்க்கத்தின் வர்க்கமூலமே அதன் அடிமானம். எனவே 1² முதல் உள்ள அடுத்தடுத்த வர்க்கங்களின் எண்ணிக்கையும் அதுவே.");

  add([
    ["c10-2-ex2-9-q2","Use the identity: the sum of the first k cubes is the square of the"],
    ["c10-2-ex2-9-q3","The sum of first k cubes equals the square of the sum of first k int"],
    ["c10-2-ex2-9-q4","The cube-sum identity gives a perfect square."],
    ["c10-2-ex2-9-q5","Convert the cube sum into the square of a triangular number."],
    ["c10-2-ex2-10-q15","First evaluate the sum of the first 15 natural numbers using n(n + 1"]
  ],
    "The sum of the cubes of the first positive integers equals the square of their ordinary sum. If working backward, take the positive square root for that ordinary sum.",
    "முதல் மிகை முழு எண்களின் கனங்களின் கூடுதல், அந்த எண்களின் சாதாரண கூடுதலின் வர்க்கமாகும். பின்னோக்கிக் கணக்கிடும்போது அந்தக் கூடுதலுக்கு நேர்ம வர்க்கமூலத்தை எடுத்துக்கொள்ள வேண்டும்.");

  add([
    ["c10-2-ex2-9-q7-i","Write the kth term t_k = (2k)³ − (2k − 1)³ and expand (2k − 1)³ = 8k"],
    ["c10-2-ex2-9-q7-ii","From part (i), the kth term is t_k = (2k)³ − (2k − 1)³ = 12k² − 6k +"]
  ],
    "Expand both cubes for a general position. The highest-degree terms cancel, so summing the remaining pieces only needs the square, linear and constant sum formulas.",
    "பொது நிலையெண்ணுக்கு இரு கனங்களையும் விரிக்கவும். மிக உயர்ந்த படியுள்ள உறுப்புகள் நீங்கும். எஞ்சியவற்றைக் கூட்ட வர்க்க, நேரியல், மாறிலி உறுப்புகளுக்கான கூடுதல் சூத்திரங்கள் போதும்.");

  add([
    ["c10-2-ex2-10-q1","The remainder cannot be negative, and it must be smaller than the di"],
    ["c10-2-unit-q4","Apply Euclid's division lemma a = bq + r (0 ≤ r < b) to divide a = 1"]
  ],
    "A remainder must fit below one full copy of the divisor. This gives a unique quotient and remainder, and zero is allowed for exact division.",
    "மீதி வகுப்பியைவிடச் சிறியதாக இருக்க வேண்டும். இதனால் ஒரு தனித்த ஈவும் மீதியும் கிடைக்கின்றன. முழுமையாக வகுபட்டால் மீதி பூச்சியமாகலாம்.");

  add([
    ["c10-2-ex2-10-q2","Check residue classes 0,1,2,…,8 before cubing modulo 9."]
  ],
    "Numbers with the same remainder have cubes with the same remainder. Checking the complete set of residues is therefore enough.",
    "ஒரே மீதியைக் கொண்ட எண்களின் கனங்களும் ஒரே மீதியைக் கொடுக்கும். எனவே சாத்தியமான எல்லா மீதிகளையும் ஒருமுறை பரிசோதித்தால் போதும்.");

  add([
    ["c10-2-ex2-10-q3","Find HCF of 65 and 117."],
    ["c10-2-unit-q2-i","The Tamil edition asks for the greatest capacity. The English wording permits smaller equal capacities as well. Find the greatest one by the Euclidean algorithm."]
  ],
    "The highest common factor divides both quantities. Dividing both by it leaves coprime quotients, confirming that no larger common factor remains.",
    "மீப்பெரு பொது வகுத்தி இரு அளவுகளையும் வகுக்கும். இரண்டையும் அதனால் வகுத்தபின் கிடைக்கும் எண்கள் சார்பகா எண்களாக இருந்தால் பெரிய பொது வகுத்தி எஞ்சவில்லை.");

  add([
    ["c10-2-ex2-10-q4","Factor 1729 into primes."]
  ],
    "Factor the number into primes first. An exponent counts the number of occurrences of its prime factor, including an unwritten exponent of one.",
    "முதலில் எண்ணைப் பகாக் காரணிகளாகப் பிரிக்கவும். ஓர் அடுக்கு, அதற்குரிய பகா காரணி எத்தனை முறை வருகிறது என்பதைக் குறிக்கும். எழுதப்படாத ஒன்றாம் அடுக்கையும் எண்ணுக.");

  add([
    ["c10-2-ex2-10-q5","Use the highest prime powers needed among 1 to 10."]
  ],
    "A common multiple needs every prime power demanded by any input. Taking the highest required power of each prime gives the smallest positive common multiple.",
    "பொது மடங்கில் கொடுக்கப்பட்ட எந்த எண்ணுக்கும் தேவையான பகா அடுக்குகள் இருக்க வேண்டும். ஒவ்வொரு பகா எண்ணிற்கும் மிக உயர்ந்த தேவையான அடுக்கை எடுத்தால் மிகச்சிறிய மிகைப் பொது மடங்கு கிடைக்கும்.");

  add([
    ["c10-2-ex2-10-q8","Every term in this A.P."]
  ],
    "The difference between any term and the first is a multiple of four. A proposed value must therefore leave the same remainder as the first term.",
    "எந்த உறுப்பிற்கும் முதல் உறுப்பிற்கும் இடையேயான வித்தியாசம் நான்கின் மடங்கு. எனவே கொடுக்கப்பட்ட மதிப்பு முதல் உறுப்பின் அதே மீதியைக் கொடுக்க வேண்டும்.");

  add([
    ["c10-2-ex2-10-q14","Write the nth A.P."]
  ],
    "Choosing every sixth position means making exactly six equal jumps between chosen terms. Their successive difference is therefore constant.",
    "ஒவ்வோர் ஆறாம் நிலையையும் தேர்ந்தெடுக்கும்போது தேர்ந்தெடுத்த இரு உறுப்புகளுக்கிடையில் ஆறு சம இடைவெளிகள் உண்டு. எனவே தேர்ந்த உறுப்புகளின் அடுத்தடுத்த வித்தியாசம் நிலையானது.");

  add([
    ["c10-2-unit-q1","Factor n² − n into the product of two consecutive integers."]
  ],
    "Consecutive integers have opposite parity. One must be even, so the product contains a factor of two.",
    "அடுத்தடுத்த இரு முழு எண்களில் ஒன்று ஒற்றை, மற்றொன்று இரட்டை. எனவே அவற்றின் பெருக்கற்பலனில் இரண்டென்ற காரணி இருக்கும்.");

  add([
    ["c10-2-unit-q2-ii","Use the greatest capacity from part (i), as requested in the Tamil edition."],
    ["c10-2-unit-q2-iii","Use the greatest capacity from part (i), as requested in the Tamil edition."]
  ],
    "Divide the volume of the requested type of milk by the capacity of one can. The quotient is a whole number because the capacity divides that volume exactly.",
    "கேட்ட பால் வகையின் மொத்த அளவை ஒரு கலனின் கொள்ளளவால் வகுக்கவும். கொள்ளளவு அந்த அளவை மீதியின்றி வகுப்பதால் கலன்களின் எண்ணிக்கை முழு எண்ணாக இருக்கும்.");

  add([
    ["c10-2-unit-q6","Identify the first term a, common difference d, and last term l of t"]
  ],
    "Counting from the end reverses the direction of the progression. The last term is the first position in this reversed count.",
    "கடைசியிலிருந்து எண்ணுவது தொடர்வரிசையின் திசையை மாற்றுகிறது. இவ்வாறு பின்னோக்கி எண்ணும்போது கடைசி உறுப்பே முதல் நிலை.");

  add([
    ["c10-2-unit-q7","Let the two A.P.s have first terms a₁ = 2 and b₁ = 7, and let their"]
  ],
    "The same common difference is added the same number of times to both starting values. These equal increments cancel when the terms are subtracted.",
    "இரு தொடக்க உறுப்புகளுக்கும் ஒரே பொதுவித்தியாசத்தைச் சம எண்ணிக்கையில் கூட்டுகிறோம். உறுப்புகளைக் கழிக்கும்போது இச்சமமான உயர்வுகள் நீங்கும்.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
