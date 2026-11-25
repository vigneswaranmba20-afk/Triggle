/* Source-matched Grade 10 Chapter 8 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-8-ex8-2-q1","Write what is given."],
    ["c10-8-ex8-2-q2","Write what is given."],
    ["c10-8-ex8-2-q3","Write what is given."],
    ["c10-8-ex8-2-q5","Add all six observations."],
    ["c10-8-ex8-2-q6","There are 8 completion times."],
    ["c10-8-ex8-2-q7","Mean means total marks divided by the number of subjects; do not use the"],
    ["c10-8-ex8-2-q8","The table gives each mean x̄ and standard deviation σ."],
    ["c10-8-ex8-5-q8","The coefficient of variation is the standard deviation as a percentage o"],
    ["c10-8-unit-q6","Add the five prices in each city and divide by five to find each city’s"]
  ],
    "The coefficient of variation compares spread to the mean instead of comparing spread alone. A smaller percentage means less spread relative to its own mean.",
    "மாறுபாட்டுக் கெழு பரவலை அதன் சராசரியோடு ஒப்பிடுகிறது. குறைந்த சதவீதம் என்பது அந்தத் தரவின் சராசரியுடன் ஒப்பிடும்போது குறைந்த பரவலைக் குறிக்கும்.");

  add([
    ["c10-8-ex8-2-q4","Here n means the number of values, x̄ the mean and Σx² the sum of square"],
    ["c10-8-ex8-5-q4","The direct variance formula subtracts the square of the mean from the me"],
    ["c10-8-ex8-5-q5","For the values 1 to n, the mean is (n + 1)/2 and the mean of their squar"]
  ],
    "Variance is the mean squared deviation. Expanding the squared deviations leaves the mean of the squared values minus the square of the mean.",
    "மாறுபாடு என்பது விலகல்களின் வர்க்கச் சராசரி. வர்க்க விலகல்களை விரித்துச் சுருக்கினால், மதிப்புகளின் வர்க்கச் சராசரியிலிருந்து சராசரியின் வர்க்கத்தைக் கழித்துக் கிடைக்கும்.");

  add([
    ["c10-8-ex8-3-q1","Each coin toss has 2 possible outcomes: Head (H) or Tail (T)."],
    ["c10-8-ex8-3-q4","List the sample space S for tossing a coin three times; there are n(S) ="],
    ["c10-8-ex8-3-q8-i","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-3-q8-ii","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-3-q8-iii","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-3-q8-iv","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-4-q8","Write H for heads and T for tails."],
    ["c10-8-ex8-4-q11","Let A be exactly two heads, B be at least one tail, and C be a pair of c"]
  ],
    "Keep the toss positions separate. Two strings can have the same number of heads and still be different equally likely outcomes because their heads occupy different positions.",
    "சுண்டல்களின் இடங்களைத் தனித்தனியாக வைத்துக்கொள்ளவும். இரு முடிவுகளில் தலைகளின் எண்ணிக்கை சமமாக இருந்தாலும், அவற்றின் இடங்கள் வேறுபட்டால் அவை வேறு சமவாய்ப்புள்ள முடிவுகள்.");

  add([
    ["c10-8-ex8-3-q2","In the tree diagram, label the first level as the 1st pick (balls 1, 2,"]
  ],
    "When selecting an unordered pair, taking ball 2 then ball 5 gives the same pair as the reverse order. List only one order in the final sample space.",
    "வரிசை கருதாமல் இரு பந்துகளைத் தேர்ந்தெடுக்கும்போது 2, 5 என்ற தேர்வும் 5, 2 என்ற தேர்வும் ஒரே சோடி. இறுதி மாதிரி வெளியில் ஒன்றை மட்டும் எழுதுக.");

  add([
    ["c10-8-ex8-3-q3-i","Write the given ratio using a common positive multiplier k: P(A) = 17k a"],
    ["c10-8-ex8-3-q3-ii","From part (i), P(Ā) = 15/32, so P(A) = 1 − P(Ā) = 17/32 (or directly 17k"]
  ],
    "An event and its complement partition all outcomes. Multiplying the two parts of the given ratio by one common number works because their probabilities add to one.",
    "ஒரு நிகழ்ச்சியும் அதன் நிரப்பு நிகழ்ச்சியும் எல்லா முடிவுகளையும் இரு பகுதிகளாகப் பிரிக்கின்றன. அவற்றின் நிகழ்தகவுகள் ஒன்றாகக் கூடுவதால், விகிதத்தின் இரு உறுப்புகளையும் ஒரே எண்ணால் பெருக்கலாம்.");

  add([
    ["c10-8-ex8-3-q5-i","The box has cards numbered 1 to 1000, so the total number of outcomes fo"]
  ],
    "List the eligible winning labels from among the actual numbered cards. When one card is equally likely, divide that count by the total number of cards.",
    "உள்ள அட்டைகளின் எண்களிலிருந்தே வெற்றி எண்களைப் பட்டியலிடுக. ஒவ்வொரு அட்டைக்கும் சமவாய்ப்பு எனில் வெற்றி அட்டைகளின் எண்ணிக்கையை மொத்த அட்டைகளின் எண்ணிக்கையால் வகுக்கவும்.");

  add([
    ["c10-8-ex8-3-q5-ii","Since the first player drew a winning card and did not replace it, 1000"]
  ],
    "Removing a winning card changes both counts. Reduce the number of winning cards and the total number of remaining cards before taking the ratio.",
    "வெற்றி அட்டையை எடுத்துவிட்டால் இரு எண்ணிக்கைகளும் மாறும். விகிதத்தைக் காணும்முன் வெற்றி அட்டைகளின் எண்ணிக்கையையும் எஞ்சிய மொத்த அட்டைகளின் எண்ணிக்கையையும் குறைக்கவும்.");

  add([
    ["c10-8-ex8-3-q6-i","Find the total number of balls in the bag by adding the 12 blue balls an"],
    ["c10-8-ex8-3-q6-ii","After adding 8 red balls, there are x + 8 red balls and 12 + x + 8 = x +"],
    ["c10-8-ex8-3-q9-i","Count the total number of balls in the bag: 5 red + 6 white + 7 green +"],
    ["c10-8-ex8-3-q9-ii","Count the total number of balls in the bag: 5 red + 6 white + 7 green +"],
    ["c10-8-ex8-3-q9-iii","Count the total number of balls in the bag: 5 red + 6 white + 7 green +"],
    ["c10-8-ex8-3-q9-iv","Count the total number of balls in the bag: 5 red + 6 white + 7 green +"],
    ["c10-8-ex8-3-q10","Let x be the number of defective bulbs."],
    ["c10-8-ex8-5-q10","The colours are disjoint groups of marbles."],
    ["c10-8-ex8-5-q13","With one winning ticket drawn uniformly, Kamalam wins when one of her k"],
    ["c10-8-ex8-5-q15","There are 50 notes in all."],
    ["c10-8-unit-q10","Let x be the number of black balls."]
  ],
    "The denominator counts every available item, even those of an unwanted colour or type. The numerator counts only the items that satisfy the event.",
    "பகுதியில் விரும்பாத நிறம் அல்லது வகையைச் சேர்ந்தவை உட்பட உள்ள எல்லாப் பொருள்களையும் எண்ண வேண்டும். தொகுதியில் நிகழ்ச்சிக்குப் பொருந்தும் பொருள்களை மட்டும் எண்ண வேண்டும்.");

  add([
    ["c10-8-ex8-3-q7-i","When two unbiased dice are rolled once, each die shows 1 to 6, giving n("],
    ["c10-8-ex8-3-q7-ii","When two unbiased dice are rolled once, each die shows 1 to 6, giving n("],
    ["c10-8-ex8-3-q7-iii","When two unbiased dice are rolled once, each die shows 1 to 6, giving n("],
    ["c10-8-ex8-3-q7-iv","When two unbiased dice are rolled once, each die shows 1 to 6, giving n("],
    ["c10-8-ex8-4-q6","Record the first and second dice as an ordered pair."],
    ["c10-8-unit-q8","Assume the fair dice are independent, so all 36 ordered pairs are equall"]
  ],
    "Distinguish the first die from the second. The ordered pairs are equally likely even when their sums are the same. Count whichever pairs satisfy the event condition.",
    "முதல் பகடையையும் இரண்டாம் பகடையையும் வேறுபடுத்துக. கூட்டுத்தொகை சமமாக இருந்தாலும் வரிசைச் சோடிகள் தனித்தனி சமவாய்ப்புள்ள முடிவுகள். நிகழ்ச்சி நிபந்தனைக்குப் பொருந்தும் சோடிகளை எண்ணுக.");

  add([
    ["c10-8-ex8-3-q11","Assume the thrown stone lands uniformly at random anywhere inside the 4"]
  ],
    "With uniform landing throughout the rectangle, two regions of equal area are equally likely. The probability is the target area divided by the entire landing area.",
    "செவ்வகத்தின் அனைத்துப் பகுதிகளிலும் கல் விழச் சமவாய்ப்பு எனில், சமப் பரப்புள்ள பகுதிகளுக்கு ஒரே வாய்ப்பு. வேண்டிய பகுதியின் பரப்பை மொத்தப் பரப்பால் வகுத்தால் நிகழ்தகவு கிடைக்கும்.");

  add([
    ["c10-8-ex8-3-q12-i","There are six days from Monday to Saturday."],
    ["c10-8-ex8-3-q12-ii","Visiting on different days is the complement of visiting on the same day"],
    ["c10-8-ex8-3-q12-iii","With independent, equally likely choices from Monday through Saturday as"]
  ],
    "Under the stated equal-day model, distinguish the two people. A choice by the first can pair with any choice by the second, including the same day.",
    "ஒவ்வொரு நாளுக்கும் சமவாய்ப்பு என்ற மாதிரியில் இருவரையும் வேறுபடுத்துக. முதலாமவர் தேர்ந்தெடுக்கும் நாளுடன், அதே நாள் உட்பட இரண்டாமவரின் எந்த நாளையும் இணைக்கலாம்.");

  add([
    ["c10-8-ex8-3-q13-i","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-3-q13-ii","When three fair coins are tossed together, the sample space has n(S) = 2"],
    ["c10-8-ex8-3-q13-iii","When three fair coins are tossed together, the sample space has n(S) = 2"]
  ],
    "First count heads in each equally likely outcome. Then apply the rule for the game’s payment to decide which of those outcomes belong to the requested event.",
    "முதலில் ஒவ்வொரு சமவாய்ப்புள்ள முடிவிலும் எத்தனை தலைகள் உள்ளன என எண்ணுக. பின்னர் விளையாட்டின் பணவிதியைப் பயன்படுத்தி, கேட்ட நிகழ்ச்சியில் எந்த முடிவுகள் அடங்குகின்றன எனத் தீர்மானிக்கவும்.");

  add([
    ["c10-8-ex8-4-q2-i","An event and its complement cover the whole sample space without overlap"],
    ["c10-8-ex8-4-q2-ii","An event and its complement cover the whole sample space without overlap"],
    ["c10-8-ex8-4-q3","Recover the probability of A from its complement."],
    ["c10-8-ex8-5-q12","Getting and not getting the job are complementary events, so their proba"]
  ],
    "The whole sample space has probability one. To find the probability of an event from its complement, subtract the known complementary probability from one.",
    "முழு மாதிரி வெளியின் நிகழ்தகவு ஒன்று. நிரப்பு நிகழ்ச்சியின் நிகழ்தகவு தெரிந்தால், அதை ஒன்றிலிருந்து கழித்து முதன்மை நிகழ்ச்சியின் நிகழ்தகவைக் காணலாம்.");

  add([
    ["c10-8-ex8-4-q2-iii","When adding the two probabilities, the outcomes common to both events ar"],
    ["c10-8-ex8-4-q4","“At least one” is the union, and “simultaneously” is the intersection."],
    ["c10-8-ex8-4-q7","The cards form an arithmetic progression with common difference 2."],
    ["c10-8-ex8-4-q9","Let A mean getting the electrification contract and B mean getting the p"],
    ["c10-8-ex8-4-q10","Let F represent females and O represent people over 50."],
    ["c10-8-ex8-4-q13","Divide the class into seven equal ratio parts."],
    ["c10-8-unit-q11","Let E and T denote passing English and passing Tamil."]
  ],
    "Adding two event counts includes the overlap twice. Subtract the overlap once so that every outcome in either event is counted exactly once.",
    "இரு நிகழ்ச்சிகளின் எண்ணிக்கைகளைக் கூட்டினால் பொதுப் பகுதி இருமுறை எண்ணப்படும். இரண்டில் ஏதாவது ஒன்றில் உள்ள ஒவ்வொரு முடிவும் ஒருமுறை மட்டும் எண்ணப்பட, பொதுப் பகுதியை ஒருமுறை கழிக்கவும்.");

  add([
    ["c10-8-ex8-4-q12","Write the three event probabilities in terms of x."]
  ],
    "After adding the three event probabilities and subtracting their pairwise overlaps, the region common to all three has been removed entirely. Add that triple overlap once.",
    "மூன்று நிகழ்ச்சிகளின் நிகழ்தகவுகளைக் கூட்டி இரட்டைப் பொதுப் பகுதிகளைக் கழித்தால், மூன்றுக்கும் பொதுவான பகுதி முழுவதும் நீங்கும். அந்த முப்பொதுப் பகுதியை ஒருமுறை மீண்டும் கூட்டவும்.");

  add([
    ["c10-8-ex8-4-q5","The events are mutually exclusive, so their union has probability equal"]
  ],
    "Mutually exclusive events have no common outcomes. Their intersection has probability zero, so the addition rule reduces to a sum.",
    "ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகளுக்குப் பொதுவான முடிவு இல்லை. அவற்றின் வெட்டின் நிகழ்தகவு பூச்சியம். எனவே கூட்டல் விதி இரு நிகழ்தகவுகளின் கூட்டுத்தொகையாக அமையும்.");

  add([
    ["c10-8-ex8-5-q1","A measure of dispersion describes how spread out the data are."]
  ],
    "A measure of centre describes a typical value. A measure of dispersion describes how different the observations are from one another or from the centre.",
    "மைய அளவு பொதுவான ஒரு மதிப்பைக் குறிக்கிறது. சிதறல் அளவு தரவுகள் ஒன்றிலிருந்து ஒன்று அல்லது மைய மதிப்பிலிருந்து எவ்வளவு விலகுகின்றன என்பதைக் குறிக்கிறது.");

  add([
    ["c10-8-ex8-5-q2","Every value is 8, so the largest and smallest values are both 8."],
    ["c10-8-unit-q7","Let L and S be the largest and smallest values."]
  ],
    "The range depends on the largest and smallest values only. When a coefficient of range is also given, its denominator is the sum of those two extremes.",
    "வீச்சு மிகப் பெரிய, மிகச் சிறிய மதிப்புகளை மட்டுமே சாரும். வீச்சுக் கெழுவும் கொடுக்கப்பட்டால், அதன் பகுதி அந்த இரு முனை மதிப்புகளின் கூட்டுத்தொகை.");

  add([
    ["c10-8-ex8-5-q3","If there are n values, the total of the values is n times their mean."]
  ],
    "Subtracting the mean from all n observations subtracts the mean n times. That equals the original total, so the positive and negative deviations balance.",
    "n மதிப்புகள் ஒவ்வொன்றிலிருந்தும் சராசரியைக் கழித்தால் சராசரி n முறை கழிக்கப்படுகிறது. இது முதற்கூட்டுத்தொகைக்குச் சமம். எனவே நேர்ம, எதிர்ம விலகல்கள் சமனாகின்றன.");

  add([
    ["c10-8-ex8-5-q6","Multiplying every value by 5 multiplies the mean and each deviation from"],
    ["c10-8-ex8-5-q7","Let m be the old mean."],
    ["c10-8-unit-q4","The conversion multiplies every Celsius reading by nine fifths and adds"]
  ],
    "Adding a constant shifts the values and mean equally, leaving their deviations unchanged. Multiplying by a factor scales the standard deviation by that factor’s absolute value.",
    "ஒரு மாறிலியைக் கூட்டினால் மதிப்புகளும் சராசரியும் ஒரே அளவு நகரும். விலகல்கள் மாறாது. ஒரு காரணியால் பெருக்கினால் திட்ட விலக்கம் அந்தக் காரணியின் தனிமதிப்பால் பெருகும்.");

  add([
    ["c10-8-ex8-5-q9","An event is within the sample space."]
  ],
    "The empty event has probability zero. The whole sample space has probability one. Every other event must lie between these bounds.",
    "வெற்று நிகழ்ச்சியின் நிகழ்தகவு பூச்சியம். முழு மாதிரி வெளியின் நிகழ்தகவு ஒன்று. மற்ற நிகழ்ச்சிகளின் நிகழ்தகவு இவ்வெல்லைகளுக்குள் இருக்க வேண்டும்.");

  add([
    ["c10-8-ex8-5-q14","Of the 26 letters, x, y and z are excluded."]
  ],
    "Each letter is one outcome. Count the labels satisfying the stated ordering rule, and divide by the total number of letters.",
    "ஒவ்வோர் எழுத்தும் ஒரு முடிவு. கொடுக்கப்பட்ட வரிசை நிபந்தனைக்குப் பொருந்தும் எழுத்துகளை எண்ணி, மொத்த எழுத்துகளின் எண்ணிக்கையால் வகுக்கவும்.");

  add([
    ["c10-8-unit-q1","The known frequencies add to 30."]
  ],
    "One equation comes from the total frequency and the other comes from the weighted mean. The missing frequencies must satisfy both equations.",
    "ஒரு சமன்பாடு மொத்த நிகழ்வெண்ணிலிருந்து வருகிறது. மற்றொன்று நிறையிட்ட சராசரியிலிருந்து வருகிறது. தெரியாத நிகழ்வெண்கள் இரு சமன்பாடுகளையும் நிறைவு செய்ய வேண்டும்.");

  add([
    ["c10-8-unit-q2","Use the class midpoints as representative diameters."],
    ["c10-8-unit-q3","Count both occurrences of k."]
  ],
    "A frequency tells you how many observations a value or midpoint represents. Weight both the value and its square by that same frequency when computing the variance.",
    "ஒரு மதிப்பு அல்லது நடுப்புள்ளி எத்தனை தரவுகளைக் குறிக்கிறது என்பதை நிகழ்வெண் காட்டுகிறது. மாறுபாட்டைக் கணக்கிடும்போது மதிப்பையும் அதன் வர்க்கத்தையும் அதே நிகழ்வெண்ணால் பெருக்கவும்.");

  add([
    ["c10-8-unit-q5","Let d be the deviation from the assumed mean 5."]
  ],
    "Shifting the origin to an assumed mean makes the arithmetic easier. Variance is unchanged by that shift, but the reported mean must be shifted back to the original units.",
    "ஊகச் சராசரியைத் தொடக்கமாக எடுத்தால் கணக்கிடுவது எளிதாகும். இம்மாற்றத்தால் மாறுபாடு மாறாது. ஆனால் உண்மையான சராசரியைப் பெறத் தொடக்க மாற்றத்தைத் திரும்பச் சேர்க்க வேண்டும்.");

  add([
    ["c10-8-unit-q9","Use the equally likely textbook model: each child’s outcome is independe"]
  ],
    "Distinguish the older and younger child in the textbook model. Under independent equally likely outcomes, the two mixed orderings count separately.",
    "பாடநூல் மாதிரியில் மூத்த, இளைய குழந்தைகளை வேறுபடுத்துக. சார்பற்ற சமவாய்ப்புள்ள முடிவுகளில், இரு கலப்பு வரிசைகளையும் தனித்தனியாக எண்ண வேண்டும்.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
