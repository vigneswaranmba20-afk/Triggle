/* Source-matched Grade 10 Chapter 3 step explanations. */
(() => {
  'use strict';
  const hints = {};
  function add(records,en,ta) {
    for (const [id,expected] of records) hints[id] = {step:0,expected,en,ta};
  }

  add([
    ["c10-3-ex3-15-q1-i","Let x be the Marked Price (in ₹) along the horizontal axis and y be the"],
    ["c10-3-ex3-15-q1-ii","Use the same direct variation line y = (1/2)x, where x is the Marked Pri"],
    ["c10-3-ex3-15-q3-i","The equation y = (1/2)x has the direct variation form y = kx, so the con"],
    ["c10-3-ex3-15-q3-ii","Use the same linear graph y = (1/2)x with constant of variation k = y/x"],
    ["c10-3-ex3-15-q6-i","Compute the ratio y/x (rate per hour) for each column in the table: 60/4"],
    ["c10-3-ex3-15-q6-ii","Use the same direct variation line y = 15x (constant hourly rate ₹15/hr,"]
  ],
    "In direct variation the output per unit of input is constant. This gives a straight line through the origin, and the slope is the output gained for one additional input unit.",
    "நேர்மாறலில் ஓர் உள்ளீட்டு அலகுக்கான வெளியீடு மாறாது. எனவே வரைபடம் ஆதி வழிச் செல்லும் நேர்க்கோடு. ஓர் உள்ளீட்டு அலகைச் சேர்க்கும்போது அதிகரிக்கும் வெளியீடே கோட்டின் சாய்வு.");

  add([
    ["c10-3-ex3-15-q2-i","Since xy = 24 with x, y > 0, we have y = 24/x in inverse variation."],
    ["c10-3-ex3-15-q2-ii","Use the same positive-branch graph of xy = 24 in the first quadrant (x,"]
  ],
    "For inverse variation, the input times the output stays constant. Use the positive branch here and read the requested coordinate by moving from the known axis value to the curve.",
    "எதிர்மாறலில் உள்ளீட்டையும் வெளியீட்டையும் பெருக்கிய மதிப்பு மாறாது. இங்கு நேர்மப் பகுதியைப் பயன்படுத்துக. தெரிந்த அச்சு மதிப்பிலிருந்து வளைவை அடைந்து கேட்ட ஆயத்தைப் படிக்கவும்.");

  add([
    ["c10-3-ex3-15-q4-i","From the table, as the number of pipes x increases, the time y decreases"],
    ["c10-3-ex3-15-q4-ii","Use the same inverse variation graph xy = 90 where x is the whole-number"]
  ],
    "With equal pipes, doubling the number of pipes halves the filling time for a fixed job. Check the product in each table column before drawing the inverse-variation model.",
    "ஒரே திறனுள்ள குழாய்களின் எண்ணிக்கையை இருமடங்காக்கினால், அதே வேலையை முடிக்கும் நேரம் பாதியாகும். எதிர்மாறல் வரைபடத்தை வரையும்முன் அட்டவணையின் ஒவ்வொரு நிரலிலும் பெருக்கற்பலனைச் சரிபார்க்கவும்.");

  add([
    ["c10-3-ex3-15-q5-i","From the table, as the number of participants x increases, each particip"],
    ["c10-3-ex3-15-q5-ii","Plot the table points (2, 180), (4, 90), (6, 60), (8, 45), (10, 36) as s"]
  ],
    "The total prize is fixed. The number of participants times each person’s share equals that total, while only whole-number participant counts are possible.",
    "மொத்தப் பரிசுத்தொகை மாறாது. பங்கேற்பாளர் எண்ணிக்கையையும் ஒருவரின் பங்கையும் பெருக்கினால் அந்தத் தொகை கிடைக்கும். பங்கேற்பாளர் எண்ணிக்கை முழு எண்ணாகவே இருக்க வேண்டும்.");

  window.TriggleG10FrontierHints = Object.freeze({...window.TriggleG10FrontierHints,...hints});
})();
