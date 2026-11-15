/* Grade 10 Ex 2.3: selective, source-matched teaching bridges.
 * Not every question needs extra scaffolding; no unverified question mutation.
 * Tamil is draft pedagogical support, not Tamil textbook source verification.
 */
(()=>{'use strict';
const hints=window.TriggleWhyStepG10?.hints;
if(!hints)throw Error('Load Grade 10 Why-step base before Exercise 2.3 extensions');
const map={
  "c10-2-ex2-3-q1-ii": {
    "step": 2,
    "expected": "Zero itself is not positive",
    "en": "The equation x ≡ 0 (mod 5) allows 0, 5, 10, 15, and so on. The question adds a separate condition—x must be positive—so we must skip 0 and choose 5.",
    "ta": "x ≡ 0 (mod 5) என்பதற்கு 0, 5, 10, 15 போன்ற மதிப்புகள் உள்ளன. ஆனால் கேள்வியில் x நேர்ம எண்ணாக இருக்க வேண்டும். ஆகவே 0-ஐத் தவிர்த்து 5-ஐ எடுக்க வேண்டும்."
  },
  "c10-2-ex2-3-q1-iii": {
    "step": 1,
    "expected": "The expression x + 3 therefore must have remainder 1",
    "en": "A negative remainder representative can be replaced by adding the modulus: −2 and 2 differ by 4, so they represent the same position in the modulo-4 cycle.",
    "ta": "மாடுலோ 4-இல் −2 மற்றும் 2 ஆகியவை 4 வேறுபாடு கொண்டவை. எனவே அவை ஒரே மீதி வகுப்பைச் சேர்ந்தவை. எதிர்ம மதிப்புடன் 4-ஐக் கூட்டி நேர்ம மதிப்பைப் பெறலாம்."
  },
  "c10-2-ex2-3-q1-iv": {
    "step": 0,
    "expected": "This textbook question compares integers modulo 5",
    "en": "Standard integer congruence compares whole numbers. The textbook reads x/7 as an integer, so x must be divisible by 7. This is an important assumption when the expression contains a fraction.",
    "ta": "முழு எண் மாடுலோ ஒப்பீட்டில் இருபுறமும் முழு எண்களாக இருக்க வேண்டும். பாடநூல் x/7 முழு எண்ணாக இருப்பதாக எடுத்துக்கொள்கிறது. எனவே x என்பது 7-ஆல் வகுபட வேண்டும். இது ஒரு முக்கிய நிபந்தனை."
  },
  "c10-2-ex2-3-q1-v": {
    "step": 0,
    "expected": "Modulo 6, multiplying by 5 is the same as multiplying by −1",
    "en": "Imagine a six-position clock. Moving forward five places lands at the same position as moving backward one place. That is why 5x and −x leave the same remainder modulo 6.",
    "ta": "ஆறு இடங்களுள்ள கடிகாரத்தில் முன்னோக்கி 5 இடங்கள் நகர்வதும் பின்னோக்கி 1 இடம் நகர்வதும் ஒரே இடத்திற்குக் கொண்டு செல்லும். அதனால் மாடுலோ 6-இல் 5x மற்றும் −x ஒரே மீதியைக் குறிக்கின்றன."
  },
  "c10-2-ex2-3-q2": {
    "step": 0,
    "expected": "Congruent numbers have the same remainder",
    "en": "If x = 13 + 17k for any integer k, then 7x − 3 = 88 + 119k. Since 119 is divisible by 17, every possible x gives the same remainder as 88. This is why substituting 13 is valid.",
    "ta": "x = 13 + 17k என வைத்தால் 7x − 3 = 88 + 119k. இங்கு 119 என்பது 17-ஆல் வகுபடும். எனவே எந்த அனுமதிக்கப்பட்ட x-ஐ எடுத்தாலும் 88-இன் மீதியே கிடைக்கும்."
  },
  "c10-2-ex2-3-q3": {
    "step": 2,
    "expected": "A congruence represents infinitely many integers",
    "en": "Two solutions represent the same modulo-6 remainder if they differ by a multiple of 6. So 2, 8 and 14 all work. Writing x = 2 + 6k captures every integer solution, including negative ones.",
    "ta": "இரு தீர்வுகள் 6-இன் மடங்கால் வேறுபட்டால் மாடுலோ 6-இல் ஒரே மீதியைக் கொடுக்கும். அதனால் 2, 8, 14 அனைத்தும் தீர்வுகள். x = 2 + 6k என்பது எதிர்ம மதிப்புகள் உட்பட எல்லா முழு எண் தீர்வுகளையும் குறிக்கிறது."
  },
  "c10-2-ex2-3-q4": {
    "step": 1,
    "expected": "Because 3 × 4 = 12 leaves remainder 1",
    "en": "In ordinary equations we divide by 3. In modulo 11, we instead multiply by 4, because 3 × 4 differs from 1 by 11. This undoes the factor 3 without introducing fractions.",
    "ta": "சாதாரண சமன்பாட்டில் 3-ஆல் வகுப்போம். மாடுலோ 11-இல் 4-ஆல் பெருக்கலாம்; ஏனெனில் 3 × 4 = 12 என்பது 1-ஐவிட 11 அதிகம். இதனால் பின்னம் பயன்படுத்தாமல் 3 என்ற காரணியை நீக்கலாம்."
  },
  "c10-2-ex2-3-q8": {
    "step": 0,
    "expected": "9 differs from 2 by exactly 7",
    "en": "Since 9 = 2 + 7, each factor 9 can be replaced by a factor 2 when calculating the remainder modulo 7. The equality of remainders survives multiplication n times, so it proves the statement for every n.",
    "ta": "9 = 2 + 7. எனவே மாடுலோ 7-இல் ஒவ்வொரு 9 காரணிக்கும் பதிலாக 2-ஐ பயன்படுத்தலாம். இந்த மீதி சமம் n முறை பெருக்கினாலும் மாறாது; அதனால் எல்லா n-க்கும் கூற்று நிரூபிக்கப்படுகிறது."
  }
};
for(const [id,entry] of Object.entries(map)){
 if(Object.hasOwn(hints,id))throw Error('Duplicate optional Ex 2.3 hint '+id);
 hints[id]=entry;
}
window.TRIGGLE_EX23_SOURCE_HELP=Object.freeze({count:Object.keys(map).length,optional:true});
})();
