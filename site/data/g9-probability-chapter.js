// Grade 9 Probability (2025): original concepts, self-checks and worked activity answers.
// Source: 2025 English/Tamil textbooks. The concept lessons are bilingual.
(()=>{'use strict';
window.TRIGGLE_PROB_PATH={chapterId:'g9-ch9',stages:[
  {
    "id": "probability-1",
    "section": "9.1",
    "page": {
      "en": 291,
      "ta": null
    },
    "title": {
      "en": "Understanding probability",
      "ta": "English version only — Tamil editorial content pending. Understanding probability"
    },
    "idea": {
      "en": "Probability measures uncertainty from 0 (impossible) to 1 (certain).",
      "ta": "English version only — Tamil editorial content pending. Probability measures uncertainty from 0 (impossible) to 1 (certain)."
    },
    "example": {
      "en": "A fair six-sided die: rolling 5 has probability 1/6; rolling 7 has probability 0.",
      "ta": "English version only — Tamil editorial content pending. A fair six-sided die: rolling 5 has probability 1/6; rolling 7 has probability 0."
    },
    "rule": {
      "en": "0 ≤ P(E) ≤ 1",
      "ta": "English version only — Tamil editorial content pending. 0 ≤ P(E) ≤ 1"
    },
    "question": {
      "en": "Which value cannot be a probability?",
      "ta": "English version only — Tamil editorial content pending. Which value cannot be a probability?"
    },
    "choices": [
      {
        "en": "0",
        "ta": "English version only — Tamil editorial content pending. 0"
      },
      {
        "en": "0.75",
        "ta": "English version only — Tamil editorial content pending. 0.75"
      },
      {
        "en": "1.2",
        "ta": "English version only — Tamil editorial content pending. 1.2"
      }
    ],
    "correct": 2,
    "hint": {
      "en": "The range includes both zero and one.",
      "ta": "English version only — Tamil editorial content pending. The range includes both zero and one."
    },
    "why": {
      "en": "An impossible event has probability 0, which is allowed. The value 1.2 exceeds the maximum of 1.",
      "ta": "English version only — Tamil editorial content pending. An impossible event has probability 0, which is allowed. The value 1.2 exceeds the maximum of 1."
    }
  },
  {
    "id": "probability-2",
    "section": "9.2",
    "page": {
      "en": 292,
      "ta": null
    },
    "title": {
      "en": "Random experiments and sample spaces",
      "ta": "English version only — Tamil editorial content pending. Random experiments and sample spaces"
    },
    "idea": {
      "en": "A trial is one experiment; an outcome is one result; the sample space S lists every possible result; an event E is a subset of S.",
      "ta": "English version only — Tamil editorial content pending. A trial is one experiment; an outcome is one result; the sample space S lists every possible result; an event E is a subset of S."
    },
    "example": {
      "en": "Two coins: S={HH,HT,TH,TT}. The event of at least one head is {HH,HT,TH}.",
      "ta": "English version only — Tamil editorial content pending. Two coins: S={HH,HT,TH,TT}. The event of at least one head is {HH,HT,TH}."
    },
    "rule": {
      "en": "E ⊆ S; n(S)=4 for two distinguishable coin tosses.",
      "ta": "English version only — Tamil editorial content pending. E ⊆ S; n(S)=4 for two distinguishable coin tosses."
    },
    "question": {
      "en": "How many equally likely outcomes are there for two fair coin tosses?",
      "ta": "English version only — Tamil editorial content pending. How many equally likely outcomes are there for two fair coin tosses?"
    },
    "choices": [
      {
        "en": "2",
        "ta": "English version only — Tamil editorial content pending. 2"
      },
      {
        "en": "3",
        "ta": "English version only — Tamil editorial content pending. 3"
      },
      {
        "en": "4",
        "ta": "English version only — Tamil editorial content pending. 4"
      }
    ],
    "correct": 2,
    "hint": {
      "en": "List HH, HT, TH and TT.",
      "ta": "English version only — Tamil editorial content pending. List HH, HT, TH and TT."
    },
    "why": {
      "en": "There are four ordered outcomes, not three, because HT and TH are distinct. By the same rule, rolling two dice gives 6 × 6 = 36 ordered pairs because (1, 3) and (3, 1) are different outcomes.",
      "ta": "English version only — Tamil editorial content pending. There are four ordered outcomes, not three, because HT and TH are distinct. Rolling two dice gives 6 × 6 = 36 ordered pairs because (1, 3) and (3, 1) are different outcomes."
    }
  },
  {
    "id": "probability-3",
    "section": "9.3",
    "page": {
      "en": 295,
      "ta": null
    },
    "title": {
      "en": "Classical probability",
      "ta": "English version only — Tamil editorial content pending. Classical probability"
    },
    "idea": {
      "en": "When outcomes are equally likely, divide the number of favourable outcomes by the total number of outcomes.",
      "ta": "English version only — Tamil editorial content pending. When outcomes are equally likely, divide the number of favourable outcomes by the total number of outcomes."
    },
    "example": {
      "en": "From a fair die, rolling an even number gives {2,4,6}, so P(even)=3/6=1/2.",
      "ta": "English version only — Tamil editorial content pending. From a fair die, rolling an even number gives {2,4,6}, so P(even)=3/6=1/2."
    },
    "rule": {
      "en": "P(E)=n(E)/n(S), for equally likely outcomes.",
      "ta": "English version only — Tamil editorial content pending. P(E)=n(E)/n(S), for equally likely outcomes."
    },
    "question": {
      "en": "What is the probability of an even number on a fair die?",
      "ta": "English version only — Tamil editorial content pending. What is the probability of an even number on a fair die?"
    },
    "choices": [
      {
        "en": "1/6",
        "ta": "English version only — Tamil editorial content pending. 1/6"
      },
      {
        "en": "1/2",
        "ta": "English version only — Tamil editorial content pending. 1/2"
      },
      {
        "en": "2/3",
        "ta": "English version only — Tamil editorial content pending. 2/3"
      }
    ],
    "correct": 1,
    "hint": {
      "en": "There are three even faces among six faces.",
      "ta": "English version only — Tamil editorial content pending. There are three even faces among six faces."
    },
    "why": {
      "en": "2, 4 and 6 give 3 out of 6 = 1/2.",
      "ta": "English version only — Tamil editorial content pending. 2, 4 and 6 give 3 out of 6 = 1/2."
    }
  },
  {
    "id": "probability-4",
    "section": "9.4",
    "page": {
      "en": 296,
      "ta": null
    },
    "title": {
      "en": "Empirical probability and relative frequency",
      "ta": "English version only — Tamil editorial content pending. Empirical probability and relative frequency"
    },
    "idea": {
      "en": "Use the observed number of successes divided by all trials to estimate probability. Larger samples can often give more stable estimates but do not guarantee an exact result.",
      "ta": "English version only — Tamil editorial content pending. Use the observed number of successes divided by all trials to estimate probability. Larger samples can often give more stable estimates but do not guarantee an exact result."
    },
    "example": {
      "en": "If 25 of 7000 lights are defective, the observed defect rate is 25/7000=1/280.",
      "ta": "English version only — Tamil editorial content pending. If 25 of 7000 lights are defective, the observed defect rate is 25/7000=1/280."
    },
    "rule": {
      "en": "Estimated P(E)=event occurrences/total trials.",
      "ta": "English version only — Tamil editorial content pending. Estimated P(E)=event occurrences/total trials."
    },
    "question": {
      "en": "Of 200 switches, 10 are defective. What is the observed defect rate?",
      "ta": "English version only — Tamil editorial content pending. Of 200 switches, 10 are defective. What is the observed defect rate?"
    },
    "choices": [
      {
        "en": "1/20",
        "ta": "English version only — Tamil editorial content pending. 1/20"
      },
      {
        "en": "1/10",
        "ta": "English version only — Tamil editorial content pending. 1/10"
      },
      {
        "en": "1/200",
        "ta": "English version only — Tamil editorial content pending. 1/200"
      }
    ],
    "correct": 0,
    "hint": {
      "en": "Divide defective switches by total switches.",
      "ta": "English version only — Tamil editorial content pending. Divide defective switches by total switches."
    },
    "why": {
      "en": "10/200=1/20=0.05.",
      "ta": "English version only — Tamil editorial content pending. 10/200=1/20=0.05."
    }
  },
  {
    "id": "probability-5",
    "section": "9.5",
    "page": {
      "en": 299,
      "ta": null
    },
    "title": {
      "en": "Sure, impossible, mutually exclusive and complementary events",
      "ta": "English version only — Tamil editorial content pending. Sure, impossible, mutually exclusive and complementary events"
    },
    "idea": {
      "en": "Sure events have probability 1; impossible events have 0. Complementary events cannot occur together and cover every possibility.",
      "ta": "English version only — Tamil editorial content pending. Sure events have probability 1; impossible events have 0. Complementary events cannot occur together and cover every possibility."
    },
    "example": {
      "en": "If the chance of rain is 0.91, the chance of no rain is 1−0.91=0.09.",
      "ta": "English version only — Tamil editorial content pending. If the chance of rain is 0.91, the chance of no rain is 1−0.91=0.09."
    },
    "rule": {
      "en": "P(E)+P(E′)=1.",
      "ta": "English version only — Tamil editorial content pending. P(E)+P(E′)=1."
    },
    "question": {
      "en": "If P(E)=0.4, what is P(not E)?",
      "ta": "English version only — Tamil editorial content pending. If P(E)=0.4, what is P(not E)?"
    },
    "choices": [
      {
        "en": "0.4",
        "ta": "English version only — Tamil editorial content pending. 0.4"
      },
      {
        "en": "0.6",
        "ta": "English version only — Tamil editorial content pending. 0.6"
      },
      {
        "en": "1.4",
        "ta": "English version only — Tamil editorial content pending. 1.4"
      }
    ],
    "correct": 1,
    "hint": {
      "en": "The event and its complement add up to one.",
      "ta": "English version only — Tamil editorial content pending. The event and its complement add up to one."
    },
    "why": {
      "en": "P(not E)=1−0.4=0.6.",
      "ta": "English version only — Tamil editorial content pending. P(not E)=1−0.4=0.6."
    }
  }
]};

// The chapter quizzes above retain their original wording and order.
const math = (latex, fallback) => ({latex, fallback, display: true});
const tex = String.raw;
const englishLessons = [
  {
    heading: 'Probability measures chance',
    intro: 'A library’s lucky dip has four identical envelopes. Each is equally likely to be picked. Three contain a star and one contains a moon.',
    detail: [
      'Probability is a number that tells how likely something is to happen. An event is what you are looking for, such as picking a star.',
      'In the rule below, E names any event and P(E) means its probability. The symbol ≤ means “is less than or equal to”. Both endpoints are allowed. Percent means “out of 100”, so certainty is 100%.'
    ],
    math: math(tex`0 \le P(E) \le 1`, '0 ≤ P(E) ≤ 1'),
    conclusion: 'A probability closer to 1 means a greater chance. Even a very likely event can fail to happen.',
    mistake: 'A zero chance means the event is impossible in the setup. Zero is a valid probability.',
    question: 'A tide forecast says there is a 90% chance that a beach path will flood this evening. What can you conclude?',
    choices: ['Flooding is certain.', 'Flooding is likely, and the path could stay dry.', 'Flooding and staying dry have equal chances.'],
    correct: 1,
    feedback: [
      'Certainty would require 100%.',
      '90% means 90 out of 100 on the chance scale. There is still a 10% chance the path stays dry.',
      'Equal chances would put both events at 50%.'
    ]
  },
  {
    heading: 'Trials, outcomes and sample spaces',
    intro: 'A robot sends two flashes. It independently chooses red (R) or blue (B) with equal chance for each flash. Read the letters in flash order.',
    detail: [
      'A random experiment has an uncertain result even under the same conditions. A deterministic experiment gives a predictable result under the same conditions, like counting the corners of a square.',
      'One run of the experiment is a trial. Here, one trial gives two flashes. The complete result, like red then blue, is one outcome, also called a sample point.',
      'Matching each first colour with each second colour gives every ordered result. The sample space S is the set of all possible outcomes. Braces enclose the members of a set. The notation n(S) counts its members.',
      'An event E is a subset of S, meaning all its members come from S. A simple event has one outcome. A compound event has more than one. An event can also cover every outcome or be empty.'
    ],
    math: math(tex`\begin{aligned} S &= \{\mathrm{RR},\mathrm{RB},\mathrm{BR},\mathrm{BB}\} \\ n(S) &= 4 \end{aligned}`, 'S = {RR, RB, BR, BB}. S has four outcomes.'),
    conclusion: 'The robot can send four different signals. Exactly one blue matches two of them.',
    mistake: 'Red then blue and blue then red are different outcomes because the order of the flashes is recorded.',
    question: 'A game records a jump or a slide, then a bell rings or stays silent. Which list includes every outcome?',
    choices: ['Jump with bell, slide in silence', 'Jump, slide, bell, silence', 'Jump with bell, jump in silence, slide with bell, slide in silence'],
    correct: 2,
    feedback: [
      'The bell can also stay silent after a jump or ring after a slide.',
      'Each outcome must record both the move and the sound result.',
      'Each of the two moves can be paired with each of the two bell results. That gives four complete outcomes.'
    ]
  },
  {
    heading: 'Classical probability',
    intro: 'A fair six-sided die picks the page of a puzzle. Each face has the same chance. Choose a rule. Ticks mark the matching faces.',
    detail: [
      'Multiples of 3 are numbers you get by multiplying 3 by a whole number. Classical probability works from the setup before you run the experiment. Use this counting rule when each outcome being counted has the same chance.',
      'S is the sample space, the set of all possible results. E names the event and P(E) means its chance. A favourable outcome is any result that matches E. The notation n(E) counts matching outcomes and n(S) counts all possible outcomes.'
    ],
    math: math(tex`P(E)=\dfrac{n(E)}{n(S)}`, 'The probability of E is the number of outcomes in E divided by the number of outcomes in S.'),
    conclusion: 'Count the matching faces for the top of the fraction. All six faces stay in the bottom, whichever rule you choose.',
    mistake: 'Two labels do not guarantee equal chances. On a spinner with one wide region and one narrow region, each colour is a label but the wider region can have a greater chance.',
    question: 'A bag holds three identical-size gold tokens and one silver token. One token is picked fairly. What is the probability of gold?',
    choices: ['One half', 'Three quarters', 'One quarter'],
    correct: 1,
    feedback: [
      'There are two colours. Count the four equally likely tokens to find their chances.',
      'Three of the four equally likely tokens are gold, so the chance of gold is three quarters.',
      'One token out of four is silver. Gold accounts for the other three tokens.'
    ],
    practiceMath: math(tex`\dfrac{3}{4}`, 'Three quarters')
  },
  {
    heading: 'Empirical probability',
    intro: 'Toss a simulated fair coin. Both heads and tails have the same chance. Compare the share of heads you see with the coin’s 50% chance.',
    detail: [
      'Empirical means based on results that were observed. Relative frequency is the share of trials in which the chosen event happened.',
      'Here E is the event “heads”. Let r count heads and n count all tosses. The estimate uses the fraction below after at least one toss. The number of heads can be zero or as high as the total number of tosses, so the fraction lies between zero and one.',
      'The theoretical chance comes from the fair-coin model. The relative frequency comes from this run. With more tosses under the same conditions, estimates typically become more stable. The gap can still grow from one batch to the next.'
    ],
    math: math(tex`\dfrac{r}{n}`, 'Number of times the event occurred divided by the number of trials.'),
    conclusion: 'Use the observed fraction to estimate the chance. Two runs of the same experiment can give different estimates.',
    mistake: 'Zero heads in a short run means no heads were observed. Heads are still possible on the next toss.',
    question: 'A seed tray has 20 seeds. After one week, 15 have sprouted. Which claim does this observation support?',
    choices: ['Exactly 15 seeds must sprout in every tray of 20.', 'A new seed has a 100% chance of sprouting.', 'Three quarters of this tray sprouted. That can estimate the chance under similar conditions.'],
    correct: 2,
    feedback: [
      'The fraction describes this tray. Another tray can give a different result.',
      'Five of the twenty seeds did not sprout in this tray.',
      'Count 15 sprouted seeds out of all 20. That is three quarters of this tray, an estimate for similar conditions.'
    ],
    practiceMath: math(tex`\dfrac{15}{20}=\dfrac{3}{4}`, 'Fifteen out of twenty is three quarters.')
  },
  {
    heading: 'Types of events',
    intro: 'Draw one of four equally likely museum tickets numbered 1 to 4. Compare two ticket rules by seeing which tickets match each one.',
    detail: [
      'A sure event matches every ticket. An impossible event matches none. Equally likely events have the same probability, even if they match different tickets.',
      'Mutually exclusive events share no outcome, so both cannot happen in one draw. Exhaustive events cover all possible outcomes, so at least one must happen.',
      'A complement contains every outcome outside E. The textbook writes it as E′ (read “E prime”) or Eᶜ. Each outcome is in exactly one of E and its complement. P means probability and + means add.'
    ],
    math: math(tex`P(E)+P(E')=1`, 'The probabilities of an event and its complement add to 1.'),
    conclusion: 'The complement gets whatever chance is left after accounting for the original event.',
    mistake: 'Ticket 1 and ticket 2 are mutually exclusive, but tickets 3 and 4 remain possible. For complements, the two groups must cover the whole sample space.',
    question: 'A bus arrives early, on time or late. Which event is the complement of “late”?',
    choices: ['Early only', 'On time only', 'Early or on time'],
    correct: 2,
    feedback: [
      'An on-time bus is also outside the event “late”.',
      'An early bus is also outside the event “late”.',
      'Early and on time together cover every possible arrival outside “late”.'
    ]
  }
];
const tamilLessons = [
  {
    heading: 'நிகழ்தகவு அறிமுகம்',
    intro: 'நூலகத்தில் ஒரே மாதிரியான நான்கு உறைகள் உள்ளன. எந்த உறையை எடுப்பதற்கும் சம வாய்ப்பு உண்டு. மூன்றில் நட்சத்திரமும் ஒன்றில் நிலவும் உள்ளன.',
    detail: [
      'ஒன்று நடப்பதற்கு எவ்வளவு வாய்ப்பு உள்ளது என்பதை ஓர் எண்ணால் குறிப்பிடுவதே நிகழ்தகவு. நட்சத்திரம் உள்ள உறையை எடுப்பது ஒரு நிகழ்ச்சி.',
      'கீழே E என்பது ஒரு நிகழ்ச்சியையும் P(E) என்பது அதன் நிகழ்தகவையும் குறிக்கின்றன. ≤ என்பதற்குக் “குறைவு அல்லது சமம்” என்று பொருள். 0, 1 ஆகிய இரண்டு எல்லைகளும் இதில் அடங்கும். சதவீதம் என்பது நூற்றுக்கு எவ்வளவு என்பதைக் குறிக்கும். உறுதியாக நடக்கும் நிகழ்ச்சியின் வாய்ப்பு 100%.'
    ],
    mathFallback: 'P(E) என்பது 0 முதல் 1 வரை இருக்கும். 0, 1 ஆகியவையும் இதில் அடங்கும்.',
    conclusion: 'நிகழ்தகவு 1-க்கு நெருங்க நெருங்க, நிகழ்ச்சி நடக்கும் வாய்ப்பு அதிகரிக்கும். வாய்ப்பு மிக அதிகமாக இருந்தாலும் அது நடக்காமல் போகலாம்.',
    mistake: 'இந்தச் சூழலில் ஒரு நிகழ்ச்சியின் நிகழ்தகவு 0 எனில் அது நடக்க இயலாது. இயலாத நிகழ்ச்சிக்கு 0 எழுதுவது சரி.',
    question: 'இன்று மாலை கடற்கரைப் பாதை நீரில் மூழ்க 90% வாய்ப்பு உள்ளதாக முன்னறிவிப்பு கூறுகிறது. இதிலிருந்து என்ன முடிவு செய்யலாம்?',
    choices: ['பாதை உறுதியாக நீரில் மூழ்கும்.', 'மூழ்க அதிக வாய்ப்பு உள்ளது. பாதை வறண்டிருக்கவும் வாய்ப்புள்ளது.', 'பாதை மூழ்குவதற்கும் வறண்டிருப்பதற்கும் சம வாய்ப்பு உள்ளது.'],
    feedback: [
      'பாதை மூழ்குவது உறுதி என்று சொல்ல, வாய்ப்பு 100% ஆக இருக்க வேண்டும்.',
      'வாய்ப்பு அளவில் 90% என்பது நூற்றுக்கு 90. பாதை வறண்டிருக்க இன்னும் 10% வாய்ப்பு உள்ளது.',
      'இரண்டுக்கும் சம வாய்ப்பு இருந்தால் ஒவ்வொன்றின் வாய்ப்பும் 50% ஆக இருக்கும்.'
    ]
  },
  {
    heading: 'அடிப்படைக் கருத்துகள்',
    intro: 'ஒரு ரோபோ இருமுறை ஒளிர்கிறது. ஒவ்வொரு முறையும் சிவப்பு (R), நீலம் (B) இரண்டுக்கும் சம வாய்ப்பு உண்டு. முதல் நிறம் இரண்டாம் நிறத்தின் வாய்ப்பை மாற்றாது. எழுத்துகளை ஒளிர்ந்த வரிசையில் படியுங்கள்.',
    detail: [
      'ஒரே சூழலில் மீண்டும் செய்தாலும் முடிவை முன்பே உறுதியாகக் கூற முடியாதது சமவாய்ப்புச் சோதனை. முடிவை முன்கூட்டியே உறுதியாகக் கூற முடிந்தால் அது உறுதியான சோதனை. ஒரு சதுரத்தின் மூலைகளை எண்ணுவது அதற்கு ஓர் எடுத்துக்காட்டு.',
      'சோதனையை ஒருமுறை செய்வது ஒரு முயற்சி. இங்கு ஒரு முயற்சியில் இரண்டு ஒளிகள் கிடைக்கின்றன. “முதலில் சிவப்பு, பிறகு நீலம்” போன்ற முழு முடிவு ஒரு கூறுபுள்ளி.',
      'முதல் ஒளியின் ஒவ்வொரு நிறத்துடனும் இரண்டாம் ஒளியின் ஒவ்வொரு நிறத்தையும் இணைத்தால் எல்லா முடிவுகளும் கிடைக்கும். அனைத்து முடிவுகளின் கணம் கூறுவெளி S. நெளி அடைப்புக்குறிகளுக்குள் கணத்தின் உறுப்புகள் எழுதப்படும். n(S) என்பது S-இன் உறுப்புகளின் எண்ணிக்கை.',
      'நிகழ்ச்சி E என்பது S-இன் உட்கணம். அதாவது E-இன் உறுப்புகள் அனைத்தும் S-இல் இருக்கும். எளிய நிகழ்ச்சியில் ஒரு கூறுபுள்ளி இருக்கும். கூட்டு நிகழ்ச்சியில் ஒன்றுக்கு மேற்பட்ட கூறுபுள்ளிகள் இருக்கும். ஒரு நிகழ்ச்சி எல்லா முடிவுகளையும் கொண்டிருக்கலாம் அல்லது வெற்றுக் கணமாக இருக்கலாம்.'
    ],
    mathFallback: 'S-இல் RR, RB, BR, BB என நான்கு முடிவுகள் உள்ளன.',
    conclusion: 'ரோபோ நான்கு விதமாக ஒளிரலாம். அவற்றில் இரண்டு முடிவுகளில் மட்டும் ஒரே ஒரு நீல ஒளி வருகிறது.',
    mistake: '“சிவப்பு, பிறகு நீலம்” என்பதும் “நீலம், பிறகு சிவப்பு” என்பதும் வெவ்வேறு முடிவுகள். ஒளிர்ந்த வரிசையையும் பதிவு செய்கிறோம்.',
    question: 'ஒரு விளையாட்டில் வீரர் தாவலாம் அல்லது சறுக்கலாம். அதன் பிறகு மணி ஒலிக்கலாம் அல்லது ஒலிக்காமல் இருக்கலாம். எந்தப் பட்டியலில் எல்லா முடிவுகளும் உள்ளன?',
    choices: ['தாவுதல் — மணி ஒலிக்கும், சறுக்குதல் — மணி ஒலிக்காது', 'தாவுதல், சறுக்குதல், மணி ஒலிக்கும், மணி ஒலிக்காது', 'தாவுதல் — மணி ஒலிக்கும் அல்லது ஒலிக்காது. சறுக்குதல் — மணி ஒலிக்கும் அல்லது ஒலிக்காது.'],
    feedback: [
      'தாவிய பிறகும் மணி ஒலிக்காமல் இருக்கலாம். சறுக்கிய பிறகும் மணி ஒலிக்கலாம்.',
      'ஒவ்வொரு முடிவிலும் வீரர் என்ன செய்தார் என்பதையும் மணி ஒலித்ததா என்பதையும் ஒன்றாகப் பதிவு செய்ய வேண்டும்.',
      'இரண்டு செயல்களிலும் மணி ஒலிக்கலாம் அல்லது ஒலிக்காமல் இருக்கலாம். எனவே நான்கு முழுமையான முடிவுகள் கிடைக்கும்.'
    ]
  },
  {
    heading: 'தொன்மை அணுகுமுறை',
    intro: 'புதிர்ப் புத்தகத்தில் எந்தப் பக்கத்தைத் திறப்பது என்பதை ஆறு முகங்கள் கொண்ட சீரான பகடை தீர்மானிக்கிறது. ஒவ்வொரு முகமும் விழச் சம வாய்ப்பு உண்டு. ஒரு விதியைத் தேர்ந்தெடுங்கள். விதிக்குப் பொருந்தும் முகங்களில் குறி தோன்றும்.',
    detail: [
      '3-ஐ முழு எண்களால் பெருக்கினால் 3-இன் மடங்குகள் கிடைக்கும். தொன்மை அணுகுமுறையில் சோதனையைச் செய்யும் முன்பே நிகழ்தகவைக் கணக்கிடுகிறோம். எண்ணப்படும் எல்லா முடிவுகளுக்கும் சம வாய்ப்பு இருக்கும்போது இந்த முறையைப் பயன்படுத்தலாம்.',
      'அனைத்து முடிவுகளின் கணம் S என்பது கூறுவெளி. E என்பது ஒரு நிகழ்ச்சி. P(E) என்பது அதன் நிகழ்தகவு. E-க்குப் பொருந்தும் முடிவு சாதகமான விளைவு. n(E) என்பது சாதகமான விளைவுகளின் எண்ணிக்கை, n(S) என்பது சாத்தியமான அனைத்து முடிவுகளின் எண்ணிக்கை.'
    ],
    mathFallback: 'நிகழ்ச்சி E-க்குச் சாதகமான விளைவுகளின் எண்ணிக்கையை, மொத்த முடிவுகளின் எண்ணிக்கையால் வகுத்தால் P(E) கிடைக்கும்.',
    conclusion: 'விதிக்குப் பொருந்தும் முகங்களின் எண்ணிக்கையைப் பின்னத்தின் தொகுதியில் எழுதுங்கள். எந்த விதியைத் தேர்ந்தெடுத்தாலும் பகுதி ஆறுதான்.',
    mistake: 'இரண்டு நிறங்கள் இருப்பதால் மட்டும் சம வாய்ப்பு கிடைக்காது. சுழற்றும் வட்டத்தில் ஒரு நிறத்தின் பகுதி அகலமாகவும் இன்னொன்று குறுகலாகவும் இருந்தால் அகலமான பகுதியில் முள் நிற்க அதிக வாய்ப்பு இருக்கலாம்.',
    question: 'ஒரு பையில் ஒரே அளவுள்ள மூன்று தங்க வில்லைகளும் ஒரு வெள்ளி வில்லையும் உள்ளன. அனைத்துக்கும் சம வாய்ப்பு இருக்கும்படி ஒரு வில்லையை எடுத்தால், அது தங்க வில்லையாக இருப்பதற்கான நிகழ்தகவு என்ன?',
    choices: ['பாதி', 'முக்கால்', 'கால்'],
    feedback: [
      'இரண்டு நிறங்கள் உள்ளன. அவற்றின் வாய்ப்புகளைக் கணக்கிட, சம வாய்ப்புள்ள நான்கு வில்லைகளையும் எண்ணுங்கள்.',
      'சம வாய்ப்புள்ள நான்கில் மூன்று தங்க வில்லைகள். எனவே தங்க வில்லை கிடைக்கும் வாய்ப்பு முக்கால்.',
      'நான்கில் ஒரு வில்லை வெள்ளி. மற்ற மூன்றும் தங்க வில்லைகள்.'
    ],
    practiceMathFallback: 'நான்கில் மூன்று'
  },
  {
    heading: 'பட்டறி அணுகுமுறை',
    intro: 'தலை, பூ இரண்டுக்கும் சம வாய்ப்புள்ள நாணயத்தைத் திரையில் சுண்டுங்கள். நீங்கள் கண்ட தலைகளின் விகிதத்தை நாணயத்தின் 50% வாய்ப்புடன் ஒப்பிடுங்கள்.',
    detail: [
      'சோதனையில் கண்ட முடிவுகளை வைத்து நிகழ்தகவை மதிப்பிடலாம். தேர்ந்தெடுத்த நிகழ்ச்சி நடந்த எண்ணிக்கையை மொத்த முயற்சிகளின் எண்ணிக்கையால் வகுத்தால் ஒப்பீட்டு நிகழ்வெண் கிடைக்கும்.',
      'இங்கு E என்பது “தலை விழுதல்” என்ற நிகழ்ச்சி. r என்பது தலை விழுந்த எண்ணிக்கை. n என்பது மொத்த முறை. குறைந்தது ஒருமுறை சுண்டிய பின் கீழுள்ள பின்னத்தைக் கணக்கிடலாம். தலை ஒருமுறைகூட விழாமல் இருக்கலாம் அல்லது எல்லா முறையும் விழலாம். எனவே பின்னத்தின் மதிப்பு 0 முதல் 1 வரை இருக்கும்.',
      'கோட்பாட்டு நிகழ்தகவு சம வாய்ப்புள்ள நாணயத்தின் கணித மாதிரியிலிருந்து கிடைக்கிறது. ஒப்பீட்டு நிகழ்வெண் இந்தச் சோதனையில் கிடைத்தது. அதே சூழலில் அதிக முறை சுண்டினால் மதிப்பீடு பொதுவாக நிலையாகும். ஆனாலும் அடுத்த தொகுதியில் இடைவெளி அதிகரிக்கவும் கூடும்.'
    ],
    mathFallback: 'நிகழ்ச்சி நடந்த எண்ணிக்கையை மொத்த முயற்சிகளின் எண்ணிக்கையால் வகுக்கவும்.',
    conclusion: 'சோதனையில் கிடைத்த பின்னத்தை வைத்து வாய்ப்பை மதிப்பிடுங்கள். அதே சோதனையை மீண்டும் செய்தால் வேறு மதிப்பு கிடைக்கலாம்.',
    mistake: 'சில முறை சுண்டியதில் தலை விழவில்லை என்றாலும், அடுத்த முறை தலை விழ இன்னும் வாய்ப்பு உண்டு.',
    question: 'ஒரு விதைத் தட்டில் இருந்த 20 விதைகளில் 15 விதைகள் ஒரு வாரத்தில் முளைத்தன. இதிலிருந்து என்ன கூறலாம்?',
    choices: ['20 விதைகள் உள்ள ஒவ்வொரு தட்டிலும் சரியாக 15 விதைகள் முளைக்கும்.', 'புதிதாக விதைக்கும் ஒரு விதை முளைக்க 100% வாய்ப்பு உள்ளது.', 'இந்தத் தட்டில் முக்கால் பங்கு முளைத்தது. இதே போன்ற சூழலில் முளைக்கும் வாய்ப்பை இந்த அளவைக் கொண்டு மதிப்பிடலாம்.'],
    feedback: [
      'இந்தப் பின்னம் இந்தத் தட்டின் முடிவை மட்டும் காட்டுகிறது. வேறொரு தட்டில் வேறு எண்ணிக்கை கிடைக்கலாம்.',
      'இந்தத் தட்டிலேயே 20 விதைகளில் 5 முளைக்கவில்லை.',
      'மொத்தம் 20 விதைகளில் 15 முளைத்தன. இது முக்கால் பங்கு. இதே போன்ற சூழலுக்கு இதை ஒரு மதிப்பீடாகப் பயன்படுத்தலாம்.'
    ],
    practiceMathFallback: 'இருபதில் பதினைந்து என்பது நான்கில் மூன்றுக்குச் சமம்.'
  },
  {
    heading: 'நிகழ்ச்சிகளின் வகைகள்',
    intro: 'அருங்காட்சியகத்தின் நுழைவுச் சீட்டுகளில் 1 முதல் 4 வரை எண்கள் உள்ளன. ஒவ்வொரு சீட்டும் கிடைக்கச் சம வாய்ப்பு உண்டு. எந்தச் சீட்டுகள் எந்த விதிக்குப் பொருந்துகின்றன என்று பாருங்கள்.',
    detail: [
      'உறுதியான நிகழ்ச்சிக்கு எல்லாச் சீட்டுகளும் பொருந்தும். இயலா நிகழ்ச்சிக்கு ஒரு சீட்டும் பொருந்தாது. சமவாய்ப்பு நிகழ்ச்சிகளுக்கு ஒரே நிகழ்தகவு இருக்கும். அவற்றுக்குப் பொருந்தும் சீட்டுகள் வேறாக இருக்கலாம்.',
      'ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகளுக்குப் பொதுவான முடிவு எதுவும் இல்லை. எனவே இரண்டும் ஒரே முயற்சியில் நிகழாது. நிறைவு செய் நிகழ்ச்சிகள் எல்லா முடிவுகளையும் உள்ளடக்குகின்றன. எனவே அவற்றில் குறைந்தது ஒன்று நிகழும்.',
      'E-இல் இல்லாத எல்லா முடிவுகளும் அதன் நிரப்பு நிகழ்ச்சியில் உள்ளன. பாடநூலில் அதை E′ (“E பிரைம்”) அல்லது Eᶜ எனக் குறிப்பிடுகிறார்கள். ஒவ்வொரு முடிவும் E அல்லது அதன் நிரப்பு நிகழ்ச்சி ஆகிய இரண்டில் ஒன்றில் மட்டுமே இருக்கும். P என்பது நிகழ்தகவையும் + என்பது கூட்டலையும் குறிக்கின்றன.'
    ],
    mathFallback: 'ஒரு நிகழ்ச்சியின் நிகழ்தகவையும் அதன் நிரப்பு நிகழ்ச்சியின் நிகழ்தகவையும் கூட்டினால் 1 கிடைக்கும்.',
    conclusion: '1-இலிருந்து ஒரு நிகழ்ச்சியின் நிகழ்தகவைக் கழித்தால் அதன் நிரப்பு நிகழ்ச்சியின் நிகழ்தகவு கிடைக்கும்.',
    mistake: 'சீட்டு 1 கிடைப்பதும் சீட்டு 2 கிடைப்பதும் ஒன்றையொன்று விலக்கும். ஆனாலும் 3, 4 ஆகிய சீட்டுகளும் கிடைக்கலாம். நிரப்பு நிகழ்ச்சிகளாக இருக்க, இரண்டு நிகழ்ச்சிகளும் சேர்ந்து கூறுவெளி முழுவதையும் உள்ளடக்க வேண்டும்.',
    question: 'ஒரு பேருந்து முன்னதாகவோ, சரியான நேரத்திலோ, தாமதமாகவோ வரலாம். “தாமதமாக வருதல்” என்ற நிகழ்ச்சியின் நிரப்பு நிகழ்ச்சி எது?',
    choices: ['முன்னதாக வருதல் மட்டும்', 'சரியான நேரத்தில் வருதல் மட்டும்', 'முன்னதாக அல்லது சரியான நேரத்தில் வருதல்'],
    feedback: [
      'பேருந்து சரியான நேரத்தில் வந்தாலும் அது தாமதமாக வரவில்லை.',
      'பேருந்து முன்னதாக வந்தாலும் அது தாமதமாக வரவில்லை.',
      'முன்னதாகவும் சரியான நேரத்திலும் வருவது ஆகிய இரண்டையும் சேர்த்தால், தாமதமில்லாத எல்லா முடிவுகளும் கிடைக்கும்.'
    ]
  }
];

window.TRIGGLE_PROB_LESSONS = englishLessons.map((en, index) => {
  const {mathFallback, practiceMathFallback, ...ta} = tamilLessons[index];
  ta.math = {...en.math, fallback: mathFallback};
  if (en.practiceMath) ta.practiceMath = {...en.practiceMath, fallback: practiceMathFallback};
  return {heading: {en: en.heading, ta: ta.heading}, en, ta, correct: en.correct};
});
const probLinks=[['g9-ch9-ex9.1-q1','g9-ch9-ex9.1-q3'],['g9-ch9-ex9.1-q4','g9-ch9-ex9.1-q6'],['g9-ch9-ex9.2-q1','g9-ch9-ex9.2-q2'],['g9-ch9-ex9.1-q7','g9-ch9-ex9.1-q8'],['g9-ch9-ex9.2-q4','g9-ch9-ex9.2-q5']];
window.TRIGGLE_PROB_PATH.stages.forEach((stage, i) => {
  stage.page.ta = [307, 309, 311, 312, 316][i];
  stage.practiceId = probLinks[i][0];
  stage.secondaryPracticeId = probLinks[i][1];
});

const base=window.TRIGGLE_TEXTBOOK_TASKS||{};
window.TRIGGLE_TEXTBOOK_TASKS={...base,'g9-ch9':[
  {
    "kind": "activity",
    "page": 294,
    "title": {
      "en": "Activity 1 · Two coins and two dice",
      "ta": "English version only — Tamil editorial content pending. Activity 1 · Two coins and two dice"
    },
    "question": {
      "en": "Perform the experiment of tossing two coins at a time, then throwing two dice at a time. For each experiment, list the possible outcomes, sample space and any three events.",
      "ta": "English version only — Tamil editorial content pending. Perform the experiment of tossing two coins at a time, then throwing two dice at a time. For each experiment, list the possible outcomes, sample space and any three events."
    },
    "answer": {
      "en": "Two coins: S={HH,HT,TH,TT}. Three example events: {HH}, {HT,TH}, {HH,HT,TH}. Two dice: S={(i,j): i,j∈{1,2,3,4,5,6}}, so n(S)=36. Three example events: {(1,1)}, {(1,2),(2,1)}, and {(i,j):i+j=7}. Every proposed event is a subset of its sample space.",
      "ta": "English version only — Tamil editorial content pending. Two coins: S={HH,HT,TH,TT}. Three example events: {HH}, {HT,TH}, {HH,HT,TH}. Two dice: S={(i,j): i,j∈{1,2,3,4,5,6}}, so n(S)=36. Three example events: {(1,1)}, {(1,2),(2,1)}, and {(i,j):i+j=7}. Every proposed event is a subset of its sample space."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "activity",
    "page": 294,
    "title": {
      "en": "Activity 2 · Record repeated coin tosses",
      "ta": "English version only — Tamil editorial content pending. Activity 2 · Record repeated coin tosses"
    },
    "question": {
      "en": "Flip a coin 10 times, record heads and tails, then repeat for 20, 30, 40 and 50 tosses; calculate both relative frequencies.",
      "ta": "English version only — Tamil editorial content pending. Flip a coin 10 times, record heads and tails, then repeat for 20, 30, 40 and 50 tosses; calculate both relative frequencies."
    },
    "answer": {
      "en": "There is no unique fixed numerical answer because results depend on actual trials. For any n tosses, if H heads and T tails are recorded, H+T=n, relative frequency of heads=H/n and tails=T/n. Illustration ONLY (not claimed to be a performed experiment): at n=10, H=6, T=4, giving 0.6 and 0.4; at n=20, H=11, T=9, giving 0.55 and 0.45. Students should use their own observed counts.",
      "ta": "English version only — Tamil editorial content pending. There is no unique fixed numerical answer because results depend on actual trials. For any n tosses, if H heads and T tails are recorded, H+T=n, relative frequency of heads=H/n and tails=T/n. Illustration ONLY (not claimed to be a performed experiment): at n=10, H=6, T=4, giving 0.6 and 0.4; at n=20, H=11, T=9, giving 0.55 and 0.45. Students should use their own observed counts."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "activity",
    "page": 294,
    "title": {
      "en": "Activity 3 · Pair-work coin experiment",
      "ta": "English version only — Tamil editorial content pending. Activity 3 · Pair-work coin experiment"
    },
    "question": {
      "en": "Work in pairs: one student tosses a coin 50 times, the other records heads and tails; compare group relative frequencies.",
      "ta": "English version only — Tamil editorial content pending. Work in pairs: one student tosses a coin 50 times, the other records heads and tails; compare group relative frequencies."
    },
    "answer": {
      "en": "There is no unique fixed outcome. For each pair/group, record H, T with H+T=50, and calculate H/50 and T/50. As an example only, if a group observes H=27 and T=23, its relative frequencies are 27/50=0.54 and 23/50=0.46. Actual data must come from the students' trials.",
      "ta": "English version only — Tamil editorial content pending. There is no unique fixed outcome. For each pair/group, record H, T with H+T=50, and calculate H/50 and T/50. As an example only, if a group observes H=27 and T=23, its relative frequencies are 27/50=0.54 and 23/50=0.46. Actual data must come from the students' trials."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "thinking",
    "page": 295,
    "title": {
      "en": "Thinking Corner · Probability of failure",
      "ta": "English version only — Tamil editorial content pending. Thinking Corner · Probability of failure"
    },
    "question": {
      "en": "If the probability of success of an experiment is 0.4, what is the probability of failure?",
      "ta": "English version only — Tamil editorial content pending. If the probability of success of an experiment is 0.4, what is the probability of failure?"
    },
    "answer": {
      "en": "Success and failure are complementary events, so P(failure)=1−P(success)=1−0.4=0.6.",
      "ta": "English version only — Tamil editorial content pending. Success and failure are complementary events, so P(failure)=1−P(success)=1−0.4=0.6."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "thinking",
    "page": 296,
    "title": {
      "en": "Thinking Corner · Why 3/2 cannot be probability",
      "ta": "English version only — Tamil editorial content pending. Thinking Corner · Why 3/2 cannot be probability"
    },
    "question": {
      "en": "For a question on probability the student's answer was 3/2. The teacher said it was wrong. Why?",
      "ta": "English version only — Tamil editorial content pending. For a question on probability the student's answer was 3/2. The teacher said it was wrong. Why?"
    },
    "answer": {
      "en": "Every probability must satisfy 0≤P(E)≤1, but 3/2=1.5>1. Therefore 3/2 cannot be the probability of an event.",
      "ta": "English version only — Tamil editorial content pending. Every probability must satisfy 0≤P(E)≤1, but 3/2=1.5>1. Therefore 3/2 cannot be the probability of an event."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "progress",
    "page": 297,
    "title": {
      "en": "Progress Check · Valid probability values",
      "ta": "English version only — Tamil editorial content pending. Progress Check · Valid probability values"
    },
    "question": {
      "en": "Which of these cannot be considered probabilities? (i) 1/5 (ii) −1/7 (iii) 0.40 (iv) −0.52 (v) 0 (vi) 1.3 (vii) 1 (viii) 72% (ix) 107%",
      "ta": "English version only — Tamil editorial content pending. Which of these cannot be considered probabilities? (i) 1/5 (ii) −1/7 (iii) 0.40 (iv) −0.52 (v) 0 (vi) 1.3 (vii) 1 (viii) 72% (ix) 107%"
    },
    "answer": {
      "en": "Invalid: (ii) −1/7, (iv) −0.52, (vi) 1.3 and (ix) 107%=1.07. All are outside [0,1]. Values (i), (iii), (v), (vii) and (viii)=0.72 are valid.",
      "ta": "English version only — Tamil editorial content pending. Invalid: (ii) −1/7, (iv) −0.52, (vi) 1.3 and (ix) 107%=1.07. All are outside [0,1]. Values (i), (iii), (v), (vii) and (viii)=0.72 are valid."
    },
    "review": "source-text-checked"
  },
  {
    "kind": "progress",
    "page": 300,
    "title": {
      "en": "Progress Check · Mutually exclusive events",
      "ta": "English version only — Tamil editorial content pending. Progress Check · Mutually exclusive events"
    },
    "question": {
      "en": "For each pair, determine whether the events are mutually exclusive: (1) die roll 5 and odd; (2) die roll 5 and even; (3) die roll prime and odd; (4) coin toss head and tail; (5) day Sunday and holiday.",
      "ta": "English version only — Tamil editorial content pending. For each pair, determine whether the events are mutually exclusive: (1) die roll 5 and odd; (2) die roll 5 and even; (3) die roll prime and odd; (4) coin toss head and tail; (5) day Sunday and holiday."
    },
    "answer": {
      "en": "(1) No: 5 is odd. (2) Yes: 5 is not even. (3) No: 3 and 5 are both prime and odd. (4) Yes for one toss: the coin cannot show head and tail simultaneously. (5) Not necessarily: Sunday and holiday can coincide; the outcome depends on the definition of holiday.",
      "ta": "English version only — Tamil editorial content pending. (1) No: 5 is odd. (2) Yes: 5 is not even. (3) No: 3 and 5 are both prime and odd. (4) Yes for one toss: the coin cannot show head and tail simultaneously. (5) Not necessarily: Sunday and holiday can coincide; the outcome depends on the definition of holiday."
    },
    "review": "source-text-checked"
  }
]};
})();
