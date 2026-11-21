// Grade 9 Probability (2025): original concepts, self-checks and worked activity answers.
// Source: user-connected 2025 English/Tamil textbooks; Tamil student-facing copy pending.
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
window.TRIGGLE_PROB_LESSONS = [
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
    intro: 'A robot sends two flashes. Each flash can be red (R) or blue (B). Read the letters in flash order.',
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
window.TRIGGLE_PROB_PATH.stages.forEach((stage, i) => {
  stage.page.ta = [307, 309, 311, 312, 316][i];
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
