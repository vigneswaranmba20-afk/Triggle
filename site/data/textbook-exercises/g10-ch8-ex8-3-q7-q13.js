/* TN SCERT revised 2025, Grade 10 Statistics and Probability Ex8.3 Q7–Q13 (20 parts); English and Tamil source pages checked. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[10];const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>String(c.number)==='8');
if(!grade||!chapter)throw Error('Grade 10 Statistics and Probability Ex8.3 dependencies absent');
const SOURCE_EN='https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view';
const REF_Q7='TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 322 / PDF p. 328 (page text and image checked); Tamil stem on printed p. 334 / PDF p. 340 and subparts (i)–(iv) on printed p. 335 / PDF p. 341 (page text and image checked). Answer key checked: English printed p. 342 / PDF p. 348, Tamil printed p. 357 / PDF p. 363. Tamil editorial approval and teacher review pending.';
const REF_323='TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 323 / PDF p. 329 (page text and image checked); Tamil printed p. 335 / PDF p. 341 (page text and image checked). Answer key checked: English printed p. 342 / PDF p. 348, Tamil printed p. 357 / PDF p. 363. Tamil editorial approval and teacher review pending.';
const REF_Q8='TN SCERT Standard Ten Mathematics, revised 2025; English printed p. 323 / PDF p. 329 (page text and image checked); Tamil printed p. 335 / PDF p. 341 (page text and image checked). Source numbering discrepancy preserved: Tamil Q8 prints labels as (i), (ii), (ii), (iv); the second "(ii) அதிகபட்சம் ஒரு தலை கிடைக்க" corresponds to English (iii) "atmost one head" and answer key (iii) 1/2. Answer key checked: English p. 342, Tamil p. 357. Tamil editorial approval and teacher review pending.';

const DICE_SAMPLE_STEP={
  "en": "When two unbiased dice are rolled once, each die shows 1 to 6, giving n(S) = 6 × 6 = 36 equally likely ordered pairs (a, b).",
  "eq": "n(S) = 6 × 6 = 36",
  "math": {
    "latex": "S=\\{(a,b):1\\le a,b\\le 6\\},\\quad n(S)=6\\times 6=36",
    "display": true,
    "fallback": "n(S) = 6 × 6 = 36"
  },
  "ta": "இரண்டு சீரான பகடைகள் ஒரே நேரத்தில் உருட்டப்படும்போது கிடைக்கும் மொத்த விளைவுகள் n(S) = 6 × 6 = 36."
};
const COIN3_SAMPLE_STEP={
  "en": "When three fair coins are tossed together, the sample space has n(S) = 2³ = 8 equally likely outcomes: S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}.",
  "eq": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8",
  "math": {
    "latex": "\\begin{aligned}S&=\\{HHH,\\ HHT,\\ HTH,\\ HTT,\\ THH,\\ THT,\\ TTH,\\ TTT\\}\\\\n(S)&=8\\end{aligned}",
    "display": true,
    "fallback": "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8"
  },
  "ta": "மூன்று சீரான நாணயங்கள் சுண்டப்படும்போது கிடைக்கும் கூறுவெளி S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}, n(S) = 8."
};
const BALLS_SAMPLE_STEP={
  "en": "Count the total number of balls in the bag: 5 red + 6 white + 7 green + 8 black = 26 balls.",
  "eq": "n(S) = 5 + 6 + 7 + 8 = 26",
  "math": {
    "latex": "n(S)=5+6+7+8=26",
    "display": true,
    "fallback": "n(S) = 5 + 6 + 7 + 8 = 26"
  },
  "ta": "பையிலுள்ள மொத்தப் பந்துகள் n(S) = 5 + 6 + 7 + 8 = 26."
};

const entries=[
  {
    "id": "c10-8-ex8-3-q7-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q7(i)", "ta": "பயிற்சி 8.3 · வினா 7(i)"},
    "title": {"en": "Probability of a doublet on two dice", "ta": "இரு பகடைகளில் ஒரே முக மதிப்பு (doublet) கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "7. Two unbiased dice are rolled once. Find the probability of getting (i) a doublet (equal numbers on both dice)",
      "ta": "7. இரண்டு சீரான பகடைகள் முறையாக ஒரே நேரத்தில் உருட்டப்படுகின்றன. (i) இரண்டு பகடைகளிலும் ஒரே முக மதிப்பு கிடைக்க ஆகிய நிகழ்ச்சிகளின் நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      DICE_SAMPLE_STEP,
      {
        "en": "Let A be the event of getting a doublet (equal numbers on both dice): A = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)}, so n(A) = 6.",
        "eq": "A = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)}, n(A) = 6",
        "math": {
          "latex": "A=\\{(1,1),(2,2),(3,3),(4,4),(5,5),(6,6)\\},\\quad n(A)=6",
          "display": true,
          "fallback": "A = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)}, n(A) = 6"
        },
        "ta": "இரண்டு பகடைகளிலும் ஒரே முக மதிப்பு கிடைக்கும் நிகழ்ச்சி A என்க. A = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)}, n(A) = 6."
      },
      {
        "en": "Compute P(A) = n(A)/n(S) = 6/36 = 1/6.",
        "eq": "P(A) = 6/36 = 1/6",
        "math": {"latex": "P(A)=\\dfrac{6}{36}=\\dfrac{1}{6}", "display": true, "fallback": "P(A) = 6/36 = 1/6"},
        "ta": "நிகழ்தகவு P(A) = 6/36 = 1/6."
      }
    ],
    "answer": {"en": "1/6", "ta": "1/6"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{6}}", "display": true, "fallback": "1/6"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_Q7, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q7-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q7(ii)", "ta": "பயிற்சி 8.3 · வினா 7(ii)"},
    "title": {"en": "Probability that product of two dice is prime", "ta": "இரு பகடை முக மதிப்புகளின் பெருக்கற்பலன் பகா எண்ணாக இருக்க நிகழ்தகவு"},
    "q": {
      "en": "7. Two unbiased dice are rolled once. Find the probability of getting (ii) the product as a prime number",
      "ta": "7. இரண்டு சீரான பகடைகள் முறையாக ஒரே நேரத்தில் உருட்டப்படுகின்றன. (ii) முக மதிப்புகளின் பெருக்கற்பலன் பகா எண்ணாகக் கிடைக்க ஆகிய நிகழ்ச்சிகளின் நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      DICE_SAMPLE_STEP,
      {
        "en": "For a product a × b to be prime, one number must be 1 and the other must be a prime number on a die (2, 3, or 5). List all such pairs: B = {(1,2), (1,3), (1,5), (2,1), (3,1), (5,1)}, so n(B) = 6.",
        "eq": "B = {(1,2), (1,3), (1,5), (2,1), (3,1), (5,1)}, n(B) = 6",
        "math": {
          "latex": "B=\\{(1,2),(1,3),(1,5),(2,1),(3,1),(5,1)\\},\\quad n(B)=6",
          "display": true,
          "fallback": "B = {(1,2), (1,3), (1,5), (2,1), (3,1), (5,1)}, n(B) = 6"
        },
        "ta": "பெருக்கற்பலன் பகா எண்ணாக இருக்க, ஒரு பகடையில் 1-உம் மற்றொன்றில் பகா எண் (2, 3, அல்லது 5)-உம் வர வேண்டும். B = {(1,2), (1,3), (1,5), (2,1), (3,1), (5,1)}, n(B) = 6."
      },
      {
        "en": "Compute P(B) = 6/36 = 1/6.",
        "eq": "P(B) = 6/36 = 1/6",
        "math": {"latex": "P(B)=\\dfrac{6}{36}=\\dfrac{1}{6}", "display": true, "fallback": "P(B) = 6/36 = 1/6"},
        "ta": "நிகழ்தகவு P(B) = 6/36 = 1/6."
      }
    ],
    "answer": {"en": "1/6", "ta": "1/6"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{6}}", "display": true, "fallback": "1/6"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_Q7, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q7-iii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q7(iii)", "ta": "பயிற்சி 8.3 · வினா 7(iii)"},
    "title": {"en": "Probability that sum of two dice is prime", "ta": "இரு பகடை முக மதிப்புகளின் கூடுதல் பகா எண்ணாக இருக்க நிகழ்தகவு"},
    "q": {
      "en": "7. Two unbiased dice are rolled once. Find the probability of getting (iii) the sum as a prime number",
      "ta": "7. இரண்டு சீரான பகடைகள் முறையாக ஒரே நேரத்தில் உருட்டப்படுகின்றன. (iii) முக மதிப்புகளின் கூடுதல் பகா எண்ணாகக் கிடைக்க ஆகிய நிகழ்ச்சிகளின் நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      DICE_SAMPLE_STEP,
      {
        "en": "The possible sums from two dice range from 2 to 12. The prime numbers in this range are 2, 3, 5, 7, and 11. List all pairs giving these sums.",
        "eq": "C = {(1,1), (1,2),(2,1), (1,4),(2,3),(3,2),(4,1), (1,6),(2,5),(3,4),(4,3),(5,2),(6,1), (5,6),(6,5)}, n(C) = 15",
        "math": {
          "latex": "\\begin{aligned}\\text{Prime sums: }&2,3,5,7,11\\\\n(C)&=1+2+4+6+2=15\\end{aligned}",
          "display": true,
          "fallback": "C = {(1,1), (1,2),(2,1), (1,4),(2,3),(3,2),(4,1), (1,6),(2,5),(3,4),(4,3),(5,2),(6,1), (5,6),(6,5)}, n(C) = 15"
        },
        "ta": "இரண்டு பகடைகளின் கூடுதல் 2 முதல் 12 வரை இருக்கும். இவற்றுள் பகா எண்கள் 2, 3, 5, 7, 11. இவற்றைத் தரும் சோடிகள் மொத்தம் n(C) = 1 + 2 + 4 + 6 + 2 = 15."
      },
      {
        "en": "Compute P(C) = 15/36 = 5/12.",
        "eq": "P(C) = 15/36 = 5/12",
        "math": {"latex": "P(C)=\\dfrac{15}{36}=\\dfrac{5}{12}", "display": true, "fallback": "P(C) = 15/36 = 5/12"},
        "ta": "நிகழ்தகவு P(C) = 15/36 = 5/12."
      }
    ],
    "answer": {"en": "5/12", "ta": "5/12"},
    "answerMath": {"latex": "\\boxed{\\dfrac{5}{12}}", "display": true, "fallback": "5/12"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_Q7, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q7-iv",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q7(iv)", "ta": "பயிற்சி 8.3 · வினா 7(iv)"},
    "title": {"en": "Probability that sum of two dice is 1 (impossible event)", "ta": "இரு பகடை முக மதிப்புகளின் கூடுதல் 1-ஆக இருக்க நிகழ்தகவு"},
    "q": {
      "en": "7. Two unbiased dice are rolled once. Find the probability of getting (iv) the sum as 1",
      "ta": "7. இரண்டு சீரான பகடைகள் முறையாக ஒரே நேரத்தில் உருட்டப்படுகின்றன. (iv) முக மதிப்புகளின் கூடுதல் 1-ஆக இருக்க ஆகிய நிகழ்ச்சிகளின் நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      DICE_SAMPLE_STEP,
      {
        "en": "The minimum possible sum on two dice is 1 + 1 = 2, so a sum of 1 is impossible: D = ∅ and n(D) = 0.",
        "eq": "D = ∅, n(D) = 0",
        "math": {"latex": "a+b\\ge 1+1=2>1\\implies D=\\varnothing,\\quad n(D)=0", "display": true, "fallback": "D = ∅, n(D) = 0"},
        "ta": "இரு பகடைகளில் கிடைக்கும் குறைந்தபட்சக் கூடுதல் 1 + 1 = 2 என்பதால் கூடுதல் 1 என்பது இயலா நிகழ்ச்சி: D = ∅, n(D) = 0."
      },
      {
        "en": "Compute P(D) = 0/36 = 0.",
        "eq": "P(D) = 0/36 = 0",
        "math": {"latex": "P(D)=\\dfrac{0}{36}=0", "display": true, "fallback": "P(D) = 0/36 = 0"},
        "ta": "நிகழ்தகவு P(D) = 0/36 = 0."
      }
    ],
    "answer": {"en": "0", "ta": "0"},
    "answerMath": {"latex": "\\boxed{0}", "display": true, "fallback": "0"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_Q7, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q8-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q8(i)", "ta": "பயிற்சி 8.3 · வினா 8(i)"},
    "title": {"en": "Three fair coins: probability of all heads", "ta": "மூன்று நாணயங்கள்: அனைத்தும் தலையாகக் கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "8. Three fair coins are tossed together. Find the probability of getting (i) all heads",
      "ta": "8. மூன்று சீரான நாணயங்கள் முறையாக ஒரே நேரத்தில் சுண்டப்படுகின்றன. (i) அனைத்தும் தலையாகக் கிடைக்க ஆகியவற்றிற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "Let A be the event of getting all heads: A = {HHH}, so n(A) = 1.",
        "eq": "A = {HHH}, n(A) = 1",
        "math": {"latex": "A=\\{HHH\\},\\quad n(A)=1", "display": true, "fallback": "A = {HHH}, n(A) = 1"},
        "ta": "அனைத்தும் தலையாகக் கிடைக்கும் நிகழ்ச்சி A = {HHH}, n(A) = 1."
      },
      {
        "en": "Compute P(A) = 1/8.",
        "eq": "P(A) = 1/8",
        "math": {"latex": "P(A)=\\dfrac{1}{8}", "display": true, "fallback": "P(A) = 1/8"},
        "ta": "நிகழ்தகவு P(A) = 1/8."
      }
    ],
    "answer": {"en": "1/8", "ta": "1/8"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{8}}", "display": true, "fallback": "1/8"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q8-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q8(ii)", "ta": "பயிற்சி 8.3 · வினா 8(ii)"},
    "title": {"en": "Three fair coins: probability of at least one tail", "ta": "மூன்று நாணயங்கள்: குறைந்தபட்சம் ஒரு பூ கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "8. Three fair coins are tossed together. Find the probability of getting (ii) atleast one tail",
      "ta": "8. மூன்று சீரான நாணயங்கள் முறையாக ஒரே நேரத்தில் சுண்டப்படுகின்றன. (ii) குறைந்தபட்சம் ஒரு பூ கிடைக்க ஆகியவற்றிற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "Let B be the event of getting at least one tail (all outcomes except HHH): B = {HHT, HTH, HTT, THH, THT, TTH, TTT}, so n(B) = 7.",
        "eq": "B = {HHT, HTH, HTT, THH, THT, TTH, TTT}, n(B) = 7",
        "math": {"latex": "B=\\{HHT,HTH,HTT,THH,THT,TTH,TTT\\},\\quad n(B)=7", "display": true, "fallback": "B = {HHT, HTH, HTT, THH, THT, TTH, TTT}, n(B) = 7"},
        "ta": "குறைந்தபட்சம் ஒரு பூ கிடைக்கும் நிகழ்ச்சி B என்க (HHH தவிர மற்ற அனைத்தும்). n(B) = 7."
      },
      {
        "en": "Compute P(B) = 7/8 (equivalently 1 − 1/8 = 7/8).",
        "eq": "P(B) = 7/8",
        "math": {"latex": "P(B)=\\dfrac{7}{8}", "display": true, "fallback": "P(B) = 7/8"},
        "ta": "நிகழ்தகவு P(B) = 7/8."
      }
    ],
    "answer": {"en": "7/8", "ta": "7/8"},
    "answerMath": {"latex": "\\boxed{\\dfrac{7}{8}}", "display": true, "fallback": "7/8"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q8-iii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q8(iii)", "ta": "பயிற்சி 8.3 · வினா 8(iii)"},
    "title": {"en": "Three fair coins: probability of at most one head", "ta": "மூன்று நாணயங்கள்: அதிகபட்சம் ஒரு தலை கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "8. Three fair coins are tossed together. Find the probability of getting (iii) atmost one head",
      "ta": "8. மூன்று சீரான நாணயங்கள் முறையாக ஒரே நேரத்தில் சுண்டப்படுகின்றன. (ii) அதிகபட்சம் ஒரு தலை கிடைக்க ஆகியவற்றிற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "sourceDiscrepancy": "Tamil textbook printed p. 335 prints this third subpart label as '(ii)' instead of '(iii)'; preserved verbatim in q.ta and mapped to canonical part c10-8-ex8-3-q8-iii matching English (iii) and answer key (iii) 1/2.",
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "Let C be the event of getting at most one head (0 heads or 1 head): C = {TTT, HTT, THT, TTH}, so n(C) = 4.",
        "eq": "C = {TTT, HTT, THT, TTH}, n(C) = 4",
        "math": {"latex": "C=\\{TTT,\\ HTT,\\ THT,\\ TTH\\},\\quad n(C)=4", "display": true, "fallback": "C = {TTT, HTT, THT, TTH}, n(C) = 4"},
        "ta": "அதிகபட்சம் ஒரு தலை (0 அல்லது 1 தலை) கிடைக்கும் நிகழ்ச்சி C = {TTT, HTT, THT, TTH}, n(C) = 4. (குறிப்பு: தமிழ் பாடநூலில் இது '(ii)' என அச்சிடப்பட்டுள்ளது; விடைக் குறிப்பு (iii) 1/2 உடன் பொருந்துகிறது.)"
      },
      {
        "en": "Compute P(C) = 4/8 = 1/2.",
        "eq": "P(C) = 4/8 = 1/2",
        "math": {"latex": "P(C)=\\dfrac{4}{8}=\\dfrac{1}{2}", "display": true, "fallback": "P(C) = 4/8 = 1/2"},
        "ta": "நிகழ்தகவு P(C) = 4/8 = 1/2."
      }
    ],
    "answer": {"en": "1/2", "ta": "1/2"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{2}}", "display": true, "fallback": "1/2"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_Q8, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q8-iv",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q8(iv)", "ta": "பயிற்சி 8.3 · வினா 8(iv)"},
    "title": {"en": "Three fair coins: probability of at most two tails", "ta": "மூன்று நாணயங்கள்: அதிகபட்சம் இரண்டு பூக்கள் கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "8. Three fair coins are tossed together. Find the probability of getting (iv) atmost two tails",
      "ta": "8. மூன்று சீரான நாணயங்கள் முறையாக ஒரே நேரத்தில் சுண்டப்படுகின்றன. (iv) அதிகபட்சம் இரண்டு பூக்கள் கிடைக்க ஆகியவற்றிற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "Let D be the event of getting at most two tails (0, 1, or 2 tails; every outcome except TTT): D = {HHH, HHT, HTH, THH, HTT, THT, TTH}, so n(D) = 7.",
        "eq": "D = {HHH, HHT, HTH, THH, HTT, THT, TTH}, n(D) = 7",
        "math": {"latex": "D=S\\setminus\\{TTT\\},\\quad n(D)=7", "display": true, "fallback": "D = {HHH, HHT, HTH, THH, HTT, THT, TTH}, n(D) = 7"},
        "ta": "அதிகபட்சம் இரண்டு பூக்கள் (0, 1, அல்லது 2 பூக்கள்) கிடைக்கும் நிகழ்ச்சி D என்க (TTT தவிர மற்ற அனைத்தும்). n(D) = 7."
      },
      {
        "en": "Compute P(D) = 7/8.",
        "eq": "P(D) = 7/8",
        "math": {"latex": "P(D)=\\dfrac{7}{8}", "display": true, "fallback": "P(D) = 7/8"},
        "ta": "நிகழ்தகவு P(D) = 7/8."
      }
    ],
    "answer": {"en": "7/8", "ta": "7/8"},
    "answerMath": {"latex": "\\boxed{\\dfrac{7}{8}}", "display": true, "fallback": "7/8"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q9-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q9(i)", "ta": "பயிற்சி 8.3 · வினா 9(i)"},
    "title": {"en": "Ball drawn from bag: probability of white ball", "ta": "பையிலிருந்து எடுக்கும் பந்து: வெள்ளை நிறப்பந்தாக இருக்க நிகழ்தகவு"},
    "q": {
      "en": "9. A bag contains 5 red balls, 6 white balls, 7 green balls, 8 black balls. One ball is drawn at random from the bag. Find the probability that the ball drawn is (i) white",
      "ta": "9. ஒரு பையில் 5 சிவப்பு நிறப் பந்துகளும், 6 வெள்ளை நிறப் பந்துகளும், 7 பச்சை நிறப்பந்துகளும் 8 கருப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் பையிலிருந்து ஒரு பந்து எடுக்கப்படுகிறது. அந்தப் பந்து (i) வெள்ளை இருப்பதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      BALLS_SAMPLE_STEP,
      {
        "en": "There are 6 white balls, so n(W) = 6.",
        "eq": "n(W) = 6",
        "math": {"latex": "n(W)=6", "display": true, "fallback": "n(W) = 6"},
        "ta": "வெள்ளை நிறப் பந்துகளின் எண்ணிக்கை n(W) = 6."
      },
      {
        "en": "Compute P(W) = 6/26 = 3/13.",
        "eq": "P(W) = 6/26 = 3/13",
        "math": {"latex": "P(W)=\\dfrac{6}{26}=\\dfrac{3}{13}", "display": true, "fallback": "P(W) = 6/26 = 3/13"},
        "ta": "நிகழ்தகவு P(W) = 6/26 = 3/13."
      }
    ],
    "answer": {"en": "3/13", "ta": "3/13"},
    "answerMath": {"latex": "\\boxed{\\dfrac{3}{13}}", "display": true, "fallback": "3/13"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q9-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q9(ii)", "ta": "பயிற்சி 8.3 · வினா 9(ii)"},
    "title": {"en": "Ball drawn from bag: probability of black or red ball", "ta": "பையிலிருந்து எடுக்கும் பந்து: கருப்பு அல்லது சிவப்பு"},
    "q": {
      "en": "9. A bag contains 5 red balls, 6 white balls, 7 green balls, 8 black balls. One ball is drawn at random from the bag. Find the probability that the ball drawn is (ii) black or red",
      "ta": "9. ஒரு பையில் 5 சிவப்பு நிறப் பந்துகளும், 6 வெள்ளை நிறப் பந்துகளும், 7 பச்சை நிறப்பந்துகளும் 8 கருப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் பையிலிருந்து ஒரு பந்து எடுக்கப்படுகிறது. அந்தப் பந்து (ii) கருப்பு அல்லது சிவப்பு இருப்பதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      BALLS_SAMPLE_STEP,
      {
        "en": "There are 8 black balls and 5 red balls, so n(B ∪ R) = 8 + 5 = 13.",
        "eq": "n(black or red) = 8 + 5 = 13",
        "math": {"latex": "n(\\text{black or red})=8+5=13", "display": true, "fallback": "n(black or red) = 8 + 5 = 13"},
        "ta": "கருப்பு மற்றும் சிவப்புப் பந்துகளின் எண்ணிக்கை = 8 + 5 = 13."
      },
      {
        "en": "Compute P(black or red) = 13/26 = 1/2.",
        "eq": "P = 13/26 = 1/2",
        "math": {"latex": "P=\\dfrac{13}{26}=\\dfrac{1}{2}", "display": true, "fallback": "P = 13/26 = 1/2"},
        "ta": "நிகழ்தகவு = 13/26 = 1/2."
      }
    ],
    "answer": {"en": "1/2", "ta": "1/2"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{2}}", "display": true, "fallback": "1/2"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q9-iii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q9(iii)", "ta": "பயிற்சி 8.3 · வினா 9(iii)"},
    "title": {"en": "Ball drawn from bag: probability of not white", "ta": "பையிலிருந்து எடுக்கும் பந்து: வெள்ளையாக இல்லாமல் இருக்க நிகழ்தகவு"},
    "q": {
      "en": "9. A bag contains 5 red balls, 6 white balls, 7 green balls, 8 black balls. One ball is drawn at random from the bag. Find the probability that the ball drawn is (iii) not white",
      "ta": "9. ஒரு பையில் 5 சிவப்பு நிறப் பந்துகளும், 6 வெள்ளை நிறப் பந்துகளும், 7 பச்சை நிறப்பந்துகளும் 8 கருப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் பையிலிருந்து ஒரு பந்து எடுக்கப்படுகிறது. அந்தப் பந்து (iii) வெள்ளையாக இல்லாமல் இருப்பதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      BALLS_SAMPLE_STEP,
      {
        "en": "From part (i), P(white) = 3/13. Use the complement rule P(not white) = 1 − P(white) (or count 5 + 7 + 8 = 20 non-white balls out of 26).",
        "eq": "P(not white) = 1 − 3/13 = 10/13",
        "math": {"latex": "P(\\text{not white})=1-\\dfrac{3}{13}=\\dfrac{10}{13}", "display": true, "fallback": "P(not white) = 1 − 3/13 = 10/13"},
        "ta": "பகுதி (i)-லிருந்து P(வெள்ளை) = 3/13. எனவே P(வெள்ளையாக இல்லாமல்) = 1 − 3/13 = 10/13."
      }
    ],
    "answer": {"en": "10/13", "ta": "10/13"},
    "answerMath": {"latex": "\\boxed{\\dfrac{10}{13}}", "display": true, "fallback": "10/13"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q9-iv",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q9(iv)", "ta": "பயிற்சி 8.3 · வினா 9(iv)"},
    "title": {"en": "Ball drawn from bag: neither white nor black", "ta": "பையிலிருந்து எடுக்கும் பந்து: வெள்ளையாகவும் கருப்பாகவும் இல்லாமல் இருக்க நிகழ்தகவு"},
    "q": {
      "en": "9. A bag contains 5 red balls, 6 white balls, 7 green balls, 8 black balls. One ball is drawn at random from the bag. Find the probability that the ball drawn is (iv) neither white nor black",
      "ta": "9. ஒரு பையில் 5 சிவப்பு நிறப் பந்துகளும், 6 வெள்ளை நிறப் பந்துகளும், 7 பச்சை நிறப்பந்துகளும் 8 கருப்பு நிறப்பந்துகளும் உள்ளன. சமவாய்ப்பு முறையில் பையிலிருந்து ஒரு பந்து எடுக்கப்படுகிறது. அந்தப் பந்து (iv) வெள்ளையாகவும், கருப்பாகவும் இல்லாமல் இருப்பதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      BALLS_SAMPLE_STEP,
      {
        "en": "Balls that are neither white nor black are red or green: 5 + 7 = 12 balls.",
        "eq": "n(neither white nor black) = 5 + 7 = 12",
        "math": {"latex": "n(\\text{red or green})=5+7=12", "display": true, "fallback": "n(neither white nor black) = 5 + 7 = 12"},
        "ta": "வெள்ளையாகவும் கருப்பாகவும் இல்லாத பந்துகள் சிவப்பு மற்றும் பச்சைப் பந்துகள் ஆகும்: 5 + 7 = 12."
      },
      {
        "en": "Compute P = 12/26 = 6/13.",
        "eq": "P = 12/26 = 6/13",
        "math": {"latex": "P=\\dfrac{12}{26}=\\dfrac{6}{13}", "display": true, "fallback": "P = 12/26 = 6/13"},
        "ta": "நிகழ்தகவு = 12/26 = 6/13."
      }
    ],
    "answer": {"en": "6/13", "ta": "6/13"},
    "answerMath": {"latex": "\\boxed{\\dfrac{6}{13}}", "display": true, "fallback": "6/13"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q10",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q10", "ta": "பயிற்சி 8.3 · வினா 10"},
    "title": {"en": "Find number of defective bulbs from probability 3/8", "ta": "குறைபாடுடைய விளக்குகளின் எண்ணிக்கை காணல்"},
    "q": {
      "en": "10. In a box there are 20 non-defective and some defective bulbs. If the probability that a bulb selected at random from the box found to be defective is 3/8 then, find the number of defective bulbs.",
      "ta": "10. ஒரு பெட்டியில் 20 குறைபாடில்லாத விளக்குகளும் ஒரு சில குறைபாடுடைய விளக்குகளும் உள்ளன. பெட்டியிலிருந்து சமவாய்ப்பு முறையில் தேர்ந்தெடுக்கப்படும் ஒரு விளக்கானது குறைபாடுடையதாக இருப்பதற்கான வாய்ப்பு 3/8 எனில், குறைபாடுடைய விளக்குகளின் எண்ணிக்கையைக் காண்க."
    },
    "questionMath": {
      "en": [
        "10. In a box there are 20 non-defective and some defective bulbs. If the probability that a bulb selected at random from the box found to be defective is ",
        {"latex": "\\dfrac{3}{8}", "display": false, "fallback": "3/8"},
        " then, find the number of defective bulbs."
      ],
      "ta": [
        "10. ஒரு பெட்டியில் 20 குறைபாடில்லாத விளக்குகளும் ஒரு சில குறைபாடுடைய விளக்குகளும் உள்ளன. பெட்டியிலிருந்து சமவாய்ப்பு முறையில் தேர்ந்தெடுக்கப்படும் ஒரு விளக்கானது குறைபாடுடையதாக இருப்பதற்கான வாய்ப்பு ",
        {"latex": "\\dfrac{3}{8}", "display": false, "fallback": "3/8"},
        " எனில், குறைபாடுடைய விளக்குகளின் எண்ணிக்கையைக் காண்க."
      ]
    },
    "steps": [
      {
        "en": "Let x be the number of defective bulbs. Since there are 20 non-defective bulbs, the total number of bulbs is n(S) = 20 + x.",
        "eq": "n(D) = x, n(S) = 20 + x",
        "math": {"latex": "n(D)=x,\\quad n(S)=20+x", "display": true, "fallback": "n(D) = x, n(S) = 20 + x"},
        "ta": "குறைபாடுடைய விளக்குகளின் எண்ணிக்கை x என்க. மொத்த விளக்குகள் n(S) = 20 + x."
      },
      {
        "en": "Equate P(D) = x/(20 + x) to the given probability 3/8 and cross-multiply to solve for x.",
        "eq": "x/(20 + x) = 3/8 ⇒ 8x = 60 + 3x ⇒ 5x = 60 ⇒ x = 12",
        "math": {
          "latex": "\\begin{aligned}\\dfrac{x}{20+x}&=\\dfrac{3}{8}\\\\8x&=3(20+x)=60+3x\\\\5x&=60\\implies x=12\\end{aligned}",
          "display": true,
          "fallback": "x/(20 + x) = 3/8 ⇒ 8x = 60 + 3x ⇒ 5x = 60 ⇒ x = 12"
        },
        "ta": "குறைபாடுடைய விளக்கு எடுப்பதற்கான நிகழ்தகவு x/(20 + x) = 3/8 எனச் சமப்படுத்தி x மதிப்பைக் காண்க."
      }
    ],
    "answer": {"en": "12", "ta": "12"},
    "answerMath": {
      "en": {
        "latex": "\\boxed{12\\text{ defective bulbs}}",
        "display": true,
        "fallback": "12"
      },
      "ta": {
        "latex": "\\boxed{12\\text{ பழுதடைந்த மின்விளக்குகள்}}",
        "display": true,
        "fallback": "12"
      }
    },
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q11",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q11", "ta": "பயிற்சி 8.3 · வினா 11"},
    "title": {"en": "Geometric probability: stone landing in a circular region", "ta": "வடிவியல் நிகழ்தகவு: வட்டப்பரிதிக்குள் கல் விழும் நிகழ்தகவு"},
    "q": {
      "en": "11. Some boys are playing a game, in which the stone thrown by them landing in a circular region (given in the figure) is considered as win and landing other than the circular region is considered as loss. What is the probability to win the game? (π = 3.14)",
      "ta": "11. மாணவர்கள் விளையாடும் ஒரு விளையாட்டில் அவர்களால் எறியப்படும் கல்லானது வட்டப்பரிதிக்குள் விழுந்தால் அதை வெற்றியாகவும், வட்டப்பரிதிக்கு வெளியே செவ்வகத்திற்குள் விழுந்தால் அதைத் தோல்வியாகவும் கருதப்படுகிறது. விளையாட்டில் வெற்றி கொள்வதற்கான நிகழ்தகவு என்ன? (π = 3.14)"
    },
    "figureSrc": "assets/grade10-ch8/ex8-3-q11-target.svg",
    "figureSrcTa": "assets/grade10-ch8/ta/ex8-3-q11-target.svg",
    "figureAlt": {
      "en": "A 4 feet by 3 feet rectangular target region containing a centered circular winning region of radius 1 foot.",
      "ta": "4 அடி நீளமும் 3 அடி அகலமும் கொண்ட செவ்வகப் பகுதியின் உள்ளே 1 அடி ஆரமுள்ள வட்ட வெற்றிப் பகுதி."
    },
    "figureCaption": {
      "en": "4 ft × 3 ft rectangular region with a 1 ft radius winning circle",
      "ta": "4 அடி × 3 அடி செவ்வகப் பகுதியில் 1 அடி ஆரமுள்ள வெற்றி வட்டம்"
    },
    "steps": [
      {
        "en": "Assume the thrown stone lands uniformly at random anywhere inside the 4 ft × 3 ft rectangular region. Find the total area of the rectangle.",
        "eq": "Area of rectangle = 4 × 3 = 12 sq. feet",
        "math": {"latex": "\\text{Area of rectangle}=4\\times 3=12\\text{ sq. feet}", "display": true, "fallback": "Area of rectangle = 4 × 3 = 12 sq. feet"},
        "ta": "எறியப்படும் கல் 4 அடி × 3 அடி செவ்வகப் பகுதிக்குள் எங்கும் சமவாய்ப்பு முறையில் சமமாக விழும் எனக் கொள்க. செவ்வகத்தின் பரப்பளவு = 4 × 3 = 12 சதுர அடி."
      },
      {
        "en": "Find the area of the circular winning region of radius r = 1 foot using π = 3.14.",
        "eq": "Area of circle = πr² = 3.14 × 1² = 3.14 sq. feet",
        "math": {"latex": "\\text{Area of circle}=\\pi r^2=3.14\\times 1^2=3.14\\text{ sq. feet}", "display": true, "fallback": "Area of circle = πr² = 3.14 × 1² = 3.14 sq. feet"},
        "ta": "ஆரம் r = 1 அடி கொண்ட வட்டத்தின் பரப்பளவு = πr² = 3.14 × 1² = 3.14 சதுர அடி."
      },
      {
        "en": "Divide the winning area by the total area and simplify the fraction.",
        "eq": "P(win) = 3.14/12 = 314/1200 = 157/600",
        "math": {
          "latex": "P(\\text{win})=\\dfrac{3.14}{12}=\\dfrac{314}{1200}=\\dfrac{157}{600}",
          "display": true,
          "fallback": "P(win) = 3.14/12 = 314/1200 = 157/600"
        },
        "ta": "வெற்றி பெறுவதற்கான நிகழ்தகவு = வட்டத்தின் பரப்பளவு / செவ்வகத்தின் பரப்பளவு = 3.14 / 12 = 314 / 1200 = 157 / 600."
      }
    ],
    "answer": {"en": "157/600", "ta": "157/600"},
    "answerMath": {"latex": "\\boxed{\\dfrac{157}{600}}", "display": true, "fallback": "157/600"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q12-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q12(i)", "ta": "பயிற்சி 8.3 · வினா 12(i)"},
    "title": {"en": "Shop visits (Mon–Sat): probability of visiting on the same day", "ta": "அங்காடிக்குச் செல்லுதல் (திங்கள்–சனி): ஒரே நாளில் செல்ல நிகழ்தகவு"},
    "q": {
      "en": "12. Two customers Priya and Amuthan are visiting a particular shop in the same week (Monday to Saturday). Each is equally likely to visit the shop on any one day as on another day. What is the probability that both will visit the shop on (i) the same day",
      "ta": "12. இரண்டு நுகர்வோர்கள், பிரியா மற்றும் அமுதன் ஒரு குறிப்பிட்ட அங்காடிக்கு, குறிப்பிட்ட வாரத்தில் (திங்கள் முதல் சனி வரை) செல்கிறார்கள். அவர்கள் அங்காடிக்குச் சமவாய்ப்பு முறையில் ஒவ்வொரு நாளும் செல்கிறார்கள். இருவரும் அங்காடிக்கு, (i) ஒரே நாளில் செல்வதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      {
        "en": "There are six days from Monday to Saturday. Use the textbook answer’s model: each customer chooses one day uniformly and independently of the other. Then all 36 ordered pairs are equally likely.",
        "eq": "n(S) = 6 × 6 = 36",
        "math": {"latex": "n(S)=6\\times 6=36", "display": true, "fallback": "n(S) = 6 × 6 = 36"},
        "ta": "திங்கள் முதல் சனி வரை ஆறு நாட்கள் உள்ளன. பாடநூல் விடையின் மாதிரிப்படி இருவரும் ஒருவரை ஒருவர் சாராமல் சமவாய்ப்பில் ஒரு நாளைத் தேர்ந்தெடுக்கிறார்கள் எனக் கொள்க. எனவே 36 வரிசைச் சோடிகளும் சமவாய்ப்புடையவை."
      },
      {
        "en": "Both visit on the same day in 6 ways: {(Mon, Mon), (Tue, Tue), (Wed, Wed), (Thu, Thu), (Fri, Fri), (Sat, Sat)}, so n(A) = 6.",
        "eq": "n(A) = 6",
        "math": {"latex": "A=\\{(\\text{M},\\text{M}),(\\text{Tu},\\text{Tu}),(\\text{W},\\text{W}),(\\text{Th},\\text{Th}),(\\text{F},\\text{F}),(\\text{Sa},\\text{Sa})\\},\\quad n(A)=6", "display": true, "fallback": "n(A) = 6"},
        "ta": "இருவரும் ஒரே நாளில் செல்லும் வாய்ப்புகள் 6: {(திங்கள், திங்கள்), ..., (சனி, சனி)}. எனவே n(A) = 6."
      },
      {
        "en": "Compute P(A) = 6/36 = 1/6.",
        "eq": "P(A) = 6/36 = 1/6",
        "math": {"latex": "P(A)=\\dfrac{6}{36}=\\dfrac{1}{6}", "display": true, "fallback": "P(A) = 6/36 = 1/6"},
        "ta": "நிகழ்தகவு P(A) = 6/36 = 1/6."
      }
    ],
    "answer": {"en": "1/6", "ta": "1/6"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{6}}", "display": true, "fallback": "1/6"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q12-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q12(ii)", "ta": "பயிற்சி 8.3 · வினா 12(ii)"},
    "title": {"en": "Shop visits (Mon–Sat): probability of visiting on different days", "ta": "அங்காடிக்குச் செல்லுதல்: வெவ்வேறு நாட்களில் செல்ல நிகழ்தகவு"},
    "q": {
      "en": "12. Two customers Priya and Amuthan are visiting a particular shop in the same week (Monday to Saturday). Each is equally likely to visit the shop on any one day as on another day. What is the probability that both will visit the shop on (ii) different days",
      "ta": "12. இரண்டு நுகர்வோர்கள், பிரியா மற்றும் அமுதன் ஒரு குறிப்பிட்ட அங்காடிக்கு, குறிப்பிட்ட வாரத்தில் (திங்கள் முதல் சனி வரை) செல்கிறார்கள். அவர்கள் அங்காடிக்குச் சமவாய்ப்பு முறையில் ஒவ்வொரு நாளும் செல்கிறார்கள். இருவரும் அங்காடிக்கு, (ii) வெவ்வேறு நாட்களில் செல்வதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      {
        "en": "Visiting on different days is the complement of visiting on the same day. Use the independent and equally likely day choices from part (i), which give P(same day) = 1/6.",
        "eq": "P(same day) = 1/6",
        "math": {"latex": "P(\\text{same day})=\\dfrac{1}{6}", "display": true, "fallback": "P(same day) = 1/6"},
        "ta": "வெவ்வேறு நாட்களில் செல்வது ஒரே நாளில் செல்வதன் நிரப்பு நிகழ்ச்சி. பகுதி (i)-இல் பயன்படுத்திய சாராத சமவாய்ப்புத் தேர்வுகளின்படி ஒரே நாளில் செல்வதற்கான நிகழ்தகவு 1/6."
      },
      {
        "en": "Compute P(different days) = 1 − 1/6 = 5/6.",
        "eq": "P(different days) = 1 − 1/6 = 5/6",
        "math": {"latex": "P(\\text{different days})=1-\\dfrac{1}{6}=\\dfrac{5}{6}", "display": true, "fallback": "P(different days) = 1 − 1/6 = 5/6"},
        "ta": "P(வெவ்வேறு நாட்கள்) = 1 − 1/6 = 5/6."
      }
    ],
    "answer": {"en": "5/6", "ta": "5/6"},
    "answerMath": {"latex": "\\boxed{\\dfrac{5}{6}}", "display": true, "fallback": "5/6"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q12-iii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q12(iii)", "ta": "பயிற்சி 8.3 · வினா 12(iii)"},
    "title": {"en": "Shop visits (Mon–Sat): probability of visiting on consecutive days", "ta": "அங்காடிக்குச் செல்லுதல்: அடுத்தடுத்த நாட்களில் செல்ல நிகழ்தகவு"},
    "q": {
      "en": "12. Two customers Priya and Amuthan are visiting a particular shop in the same week (Monday to Saturday). Each is equally likely to visit the shop on any one day as on another day. What is the probability that both will visit the shop on (iii) consecutive days?",
      "ta": "12. இரண்டு நுகர்வோர்கள், பிரியா மற்றும் அமுதன் ஒரு குறிப்பிட்ட அங்காடிக்கு, குறிப்பிட்ட வாரத்தில் (திங்கள் முதல் சனி வரை) செல்கிறார்கள். அவர்கள் அங்காடிக்குச் சமவாய்ப்பு முறையில் ஒவ்வொரு நாளும் செல்கிறார்கள். இருவரும் அங்காடிக்கு, (iii) அடுத்தடுத்த நாட்களில் செல்வதற்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      {
        "en": "With independent, equally likely choices from Monday through Saturday as in part (i), the 36 ordered pairs all have equal probability.",
        "eq": "n(S) = 36",
        "math": {"latex": "n(S)=36", "display": true, "fallback": "n(S) = 36"},
        "ta": "பகுதி (i)-இல் போலத் திங்கள் முதல் சனி வரை ஒவ்வொரு நாளையும் இருவரும் சாராமல் சமவாய்ப்பில் தேர்ந்தெடுப்பதாகக் கொண்டால், 36 வரிசைச் சோடிகளும் சமவாய்ப்புடையவை."
      },
      {
        "en": "List the 5 adjacent-day pairs in forward order (Mon–Tue, Tue–Wed, Wed–Thu, Thu–Fri, Fri–Sat) and the 5 in reverse order (Tue–Mon, Wed–Tue, Thu–Wed, Fri–Thu, Sat–Fri), giving 10 ordered pairs.",
        "eq": "n(C) = 5 + 5 = 10",
        "math": {
          "latex": "\\begin{aligned}C=\\{&(\\text{M},\\text{Tu}),(\\text{Tu},\\text{W}),(\\text{W},\\text{Th}),(\\text{Th},\\text{F}),(\\text{F},\\text{Sa}),\\\\&(\\text{Tu},\\text{M}),(\\text{W},\\text{Tu}),(\\text{Th},\\text{W}),(\\text{F},\\text{Th}),(\\text{Sa},\\text{F})\\}\\\\n(C)&=10\\end{aligned}",
          "display": true,
          "fallback": "n(C) = 5 + 5 = 10"
        },
        "ta": "அடுத்தடுத்த நாட்களுக்கான வரிசைச் சோடிகள்: (திங்கள், செவ்வாய்) முதல் (வெள்ளி, சனி) வரை 5-உம், அவற்றின் எதிர் வரிசையில் 5-உம் என மொத்தம் n(C) = 10."
      },
      {
        "en": "Compute P(C) = 10/36 = 5/18.",
        "eq": "P(C) = 10/36 = 5/18",
        "math": {"latex": "P(C)=\\dfrac{10}{36}=\\dfrac{5}{18}", "display": true, "fallback": "P(C) = 10/36 = 5/18"},
        "ta": "நிகழ்தகவு P(C) = 10/36 = 5/18."
      }
    ],
    "answer": {"en": "5/18", "ta": "5/18"},
    "answerMath": {"latex": "\\boxed{\\dfrac{5}{18}}", "display": true, "fallback": "5/18"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q13-i",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q13(i)", "ta": "பயிற்சி 8.3 · வினா 13(i)"},
    "title": {"en": "Coin game: probability of getting double entry fee", "ta": "நாணய விளையாட்டு: நுழைவுக் கட்டணம் இரண்டு மடங்காகக் கிடைக்க நிகழ்தகவு"},
    "q": {
      "en": "13. In a game, the entry fee is ₹150. The game consists of tossing a coin 3 times. Dhana bought a ticket for entry. If one or two heads show, she gets her entry fee back. If she throws 3 heads, she receives double the entry fees. Otherwise she will lose. Find the probability that she (i) gets double entry fee",
      "ta": "13. ஒரு விளையாட்டிற்கான, நுழைவுக் கட்டணம் ₹ 150. அந்த விளையாட்டில் ஒரு நாணயம் மூன்று முறை சுண்டப்படுகிறது. தனா, ஒரு நுழைவுச் சீட்டு வாங்கினாள். அவ்விளையாட்டில் ஒன்று அல்லது இரண்டு தலைகள் விழுந்தால் அவள் செலுத்திய நுழைவுக் கட்டணம் திரும்பக் கிடைத்துவிடும். மூன்று தலைகள் கிடைத்தால் அவளது நுழைவுக் கட்டணம் இரண்டு மடங்காகக் கிடைக்கும். இல்லையென்றால் அவளுக்கு எந்தக் கட்டணமும் திரும்பக் கிடைக்காது. இவ்வாறெனில், (i) இரண்டு மடங்காக ஆகிய நிகழ்ச்சிகளுக்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "Dhana receives double the entry fee when she throws 3 heads: A = {HHH}, so n(A) = 1.",
        "eq": "A = {HHH}, n(A) = 1",
        "math": {"latex": "A=\\{HHH\\},\\quad n(A)=1", "display": true, "fallback": "A = {HHH}, n(A) = 1"},
        "ta": "மூன்று தலைகள் கிடைத்தால் மட்டுமே இரண்டு மடங்கு கட்டணம் கிடைக்கும்: A = {HHH}, n(A) = 1."
      },
      {
        "en": "Compute P(A) = 1/8.",
        "eq": "P(A) = 1/8",
        "math": {"latex": "P(A)=\\dfrac{1}{8}", "display": true, "fallback": "P(A) = 1/8"},
        "ta": "நிகழ்தகவு P(A) = 1/8."
      }
    ],
    "answer": {"en": "1/8", "ta": "1/8"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{8}}", "display": true, "fallback": "1/8"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q13-ii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q13(ii)", "ta": "பயிற்சி 8.3 · வினா 13(ii)"},
    "title": {"en": "Coin game: probability of just getting entry fee back", "ta": "நாணய விளையாட்டு: நுழைவுக் கட்டணம் திரும்பப் பெற நிகழ்தகவு"},
    "q": {
      "en": "13. In a game, the entry fee is ₹150. The game consists of tossing a coin 3 times. Dhana bought a ticket for entry. If one or two heads show, she gets her entry fee back. If she throws 3 heads, she receives double the entry fees. Otherwise she will lose. Find the probability that she (ii) just gets her entry fee",
      "ta": "13. ஒரு விளையாட்டிற்கான, நுழைவுக் கட்டணம் ₹ 150. அந்த விளையாட்டில் ஒரு நாணயம் மூன்று முறை சுண்டப்படுகிறது. தனா, ஒரு நுழைவுச் சீட்டு வாங்கினாள். அவ்விளையாட்டில் ஒன்று அல்லது இரண்டு தலைகள் விழுந்தால் அவள் செலுத்திய நுழைவுக் கட்டணம் திரும்பக் கிடைத்துவிடும். மூன்று தலைகள் கிடைத்தால் அவளது நுழைவுக் கட்டணம் இரண்டு மடங்காகக் கிடைக்கும். இல்லையென்றால் அவளுக்கு எந்தக் கட்டணமும் திரும்பக் கிடைக்காது. இவ்வாறெனில், (ii) நுழைவுக் கட்டணம் திரும்பப்பெற ஆகிய நிகழ்ச்சிகளுக்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "She just gets her entry fee back if 1 or 2 heads show: B = {HHT, HTH, THH, HTT, THT, TTH}, so n(B) = 6.",
        "eq": "B = {HHT, HTH, THH, HTT, THT, TTH}, n(B) = 6",
        "math": {"latex": "B=\\{HHT,HTH,THH,HTT,THT,TTH\\},\\quad n(B)=6", "display": true, "fallback": "B = {HHT, HTH, THH, HTT, THT, TTH}, n(B) = 6"},
        "ta": "ஒன்று அல்லது இரண்டு தலைகள் விழும் நிகழ்ச்சி B = {HHT, HTH, THH, HTT, THT, TTH}, n(B) = 6."
      },
      {
        "en": "Compute P(B) = 6/8 = 3/4.",
        "eq": "P(B) = 6/8 = 3/4",
        "math": {"latex": "P(B)=\\dfrac{6}{8}=\\dfrac{3}{4}", "display": true, "fallback": "P(B) = 6/8 = 3/4"},
        "ta": "நிகழ்தகவு P(B) = 6/8 = 3/4."
      }
    ],
    "answer": {"en": "3/4", "ta": "3/4"},
    "answerMath": {"latex": "\\boxed{\\dfrac{3}{4}}", "display": true, "fallback": "3/4"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  },
  {
    "id": "c10-8-ex8-3-q13-iii",
    "classNum": 10,
    "chapter": "8",
    "exercise": "8.3",
    "topic": {"en": "Statistics and Probability", "ta": "புள்ளியியலும் நிகழ்தகவும்"},
    "label": {"en": "Exercise 8.3 · Q13(iii)", "ta": "பயிற்சி 8.3 · வினா 13(iii)"},
    "title": {"en": "Coin game: probability of losing entry fee", "ta": "நாணய விளையாட்டு: நுழைவுக் கட்டணத்தை இழப்பதற்கு நிகழ்தகவு"},
    "q": {
      "en": "13. In a game, the entry fee is ₹150. The game consists of tossing a coin 3 times. Dhana bought a ticket for entry. If one or two heads show, she gets her entry fee back. If she throws 3 heads, she receives double the entry fees. Otherwise she will lose. Find the probability that she (iii) loses the entry fee.",
      "ta": "13. ஒரு விளையாட்டிற்கான, நுழைவுக் கட்டணம் ₹ 150. அந்த விளையாட்டில் ஒரு நாணயம் மூன்று முறை சுண்டப்படுகிறது. தனா, ஒரு நுழைவுச் சீட்டு வாங்கினாள். அவ்விளையாட்டில் ஒன்று அல்லது இரண்டு தலைகள் விழுந்தால் அவள் செலுத்திய நுழைவுக் கட்டணம் திரும்பக் கிடைத்துவிடும். மூன்று தலைகள் கிடைத்தால் அவளது நுழைவுக் கட்டணம் இரண்டு மடங்காகக் கிடைக்கும். இல்லையென்றால் அவளுக்கு எந்தக் கட்டணமும் திரும்பக் கிடைக்காது. இவ்வாறெனில், (iii) நுழைவுக் கட்டணத்தை இழப்பதற்கு, ஆகிய நிகழ்ச்சிகளுக்கான நிகழ்தகவுகளைக் காண்க."
    },
    "steps": [
      COIN3_SAMPLE_STEP,
      {
        "en": "She loses the entry fee when 0 heads show (all tails): C = {TTT}, so n(C) = 1. Together the three outcomes partition the 8 sequences as 1 + 6 + 1 = 8.",
        "eq": "C = {TTT}, n(C) = 1",
        "math": {"latex": "C=\\{TTT\\},\\quad n(C)=1\\quad (1+6+1=8)", "display": true, "fallback": "C = {TTT}, n(C) = 1"},
        "ta": "தலை எதுவும் விழாதபோது (அனைத்தும் பூ) கட்டணத்தை இழப்பாள்: C = {TTT}, n(C) = 1. (மொத்த 8 விளைவுகளும் 1 + 6 + 1 எனப் பிரிகின்றன.)"
      },
      {
        "en": "Compute P(C) = 1/8.",
        "eq": "P(C) = 1/8",
        "math": {"latex": "P(C)=\\dfrac{1}{8}", "display": true, "fallback": "P(C) = 1/8"},
        "ta": "நிகழ்தகவு P(C) = 1/8."
      }
    ],
    "answer": {"en": "1/8", "ta": "1/8"},
    "answerMath": {"latex": "\\boxed{\\dfrac{1}{8}}", "display": true, "fallback": "1/8"},
    "kind": "textbook", "source": SOURCE_EN, "reference": REF_323, "edition": "2025",
    "translationReview": "pending", "tamilQuestionSourceVerified": true, "tamilWorkedSolutionReview": "pending"
  }
];
const ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));
for(const item of entries){if(ids.has(item.id))throw Error('Duplicate textbook ID '+item.id);ids.add(item.id);}
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const item of entries){grade.items.push(item);if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}
})();
