/* STAGED ONLY: optional, source-matched Grade 10 Ex 2.4 learning bridges.
 * Intentionally not linked by site/index.html or service worker until verified release.
 */
(()=>{'use strict';
const hints=window.TriggleWhyStepG10?.hints;if(!hints)throw Error('Missing Grade 10 why-step base');
const map={
  "c10-2-ex2-4-q2-ii": {
    "step": 0,
    "expected": "The power of −1 alternates between +1 and −1.",
    "en": "The sign comes from the exponent, not from the size of n. When n+1 is even, the sign is +; when n+1 is odd, the sign is −. Work out this sign before multiplying n(n+1).",
    "ta": "குறி (−1) இன் அடுக்கைப் பொறுத்தது. n+1 இரட்டையாக இருந்தால் குறி +; ஒற்றையாக இருந்தால் −. n(n+1)-ஐப் பெருக்குவதற்கு முன் குறியைத் தீர்மானிக்க வேண்டும்."
  },
  "c10-2-ex2-4-q3-ii": {
    "step": 0,
    "expected": "Rewrite the first zero as a fraction",
    "en": "Rewrite zero as 0/1. Now look at each position: first numerator 0 and denominator 1, second 1/2, third 2/3. The denominator equals position n; the numerator is one less. That is why the formula is (n−1)/n rather than just n/(n+1).",
    "ta": "பூஜ்ஜியத்தை 0/1 என்று எழுதுங்கள். முதல் இடம் 0/1, இரண்டாம் இடம் 1/2, மூன்றாம் இடம் 2/3. பகுதி n என்ற இடத்துடன் சமம்; தொகுதி அதைவிட ஒன்று குறைவு. எனவே விதி (n−1)/n."
  },
  "c10-2-ex2-4-q5": {
    "step": 0,
    "expected": "A piecewise rule is a choice",
    "en": "The two fractions are not added together. The test 'even or odd?' tells you which one formula to use: n=8 is even and uses (n²−1)/(n+3); n=15 is odd and uses n²/(2n+1). The same n never follows both rules.",
    "ta": "இரு பின்னங்களையும் கூட்ட வேண்டாம். n இரட்டையா ஒற்றையா என்பதைப் பார்த்து ஒரு விதியை மட்டும் தேர்ந்தெடுக்க வேண்டும். n=8 இரட்டை; n=15 ஒற்றை. ஒரு மதிப்புக்கு இரு விதிகளையும் பயன்படுத்தக்கூடாது.",
    "transfer": {
      "prompt": {
        "en": "If n = 6, which formula should you use?",
        "ta": "n = 6 எனில் எந்த விதியைத் தேர்ந்தெடுப்பீர்கள்?"
      },
      "choices": [
        {
          "en": "(n²−1)/(n+3)",
          "ta": "(n²−1)/(n+3)"
        },
        {
          "en": "n²/(2n+1)",
          "ta": "n²/(2n+1)"
        },
        {
          "en": "Add both",
          "ta": "இரண்டையும் கூட்டவும்"
        }
      ],
      "correct": 0,
      "wrong": {
        "en": "Six is even. Choose the formula labelled for even n; never add both formulas.",
        "ta": "6 இரட்டை எண். இரட்டைக்கான விதியை மட்டும் எடுக்கவும்; இரண்டையும் கூட்ட வேண்டாம்."
      },
      "success": {
        "en": "Correct: n=6 is even, so a₆=(36−1)/(6+3)=35/9.",
        "ta": "சரி! 6 இரட்டை. எனவே a₆=(36−1)/(6+3)=35/9."
      }
    }
  },
  "c10-2-ex2-4-q6": {
    "step": 0,
    "expected": "This is a recursive rule.",
    "en": "A recursive formula looks backwards: aₙ depends on aₙ₋₁ (the previous term) and aₙ₋₂ (the term before that). To compute a₄ you must already know a₃ and a₂; you cannot simply replace n with 4 and calculate without them.",
    "ta": "மீளுரு விதி முந்தைய உறுப்புகளைப் பயன்படுத்தும். aₙ₋₁ என்பது உடனடியான முந்தைய உறுப்பு; aₙ₋₂ என்பது அதற்கு முன்புள்ள உறுப்பு. a₄-ஐக் காண a₃, a₂ இரண்டும் தெரிந்திருக்க வேண்டும்.",
    "transfer": {
      "prompt": {
        "en": "If the first three terms are 1, 1, 3, what is a₄ = 2a₃ + a₂?",
        "ta": "முதல் மூன்று உறுப்புகள் 1, 1, 3 எனில் a₄ = 2a₃ + a₂ என்ன?"
      },
      "choices": [
        {
          "en": "5",
          "ta": "5"
        },
        {
          "en": "7",
          "ta": "7"
        },
        {
          "en": "9",
          "ta": "9"
        }
      ],
      "correct": 1,
      "wrong": {
        "en": "Use the immediate preceding terms: twice a₃ (=3) plus a₂ (=1).",
        "ta": "உடனடியான முந்தைய உறுப்புகளைப் பயன்படுத்துங்கள்: 2×a₃(=3)+a₂(=1)."
      },
      "success": {
        "en": "Correct: 2×3+1=7. Each new term then becomes available for the next calculation.",
        "ta": "சரி! 2×3+1=7. அடுத்த உறுப்பைக் காண இந்த 7-ஐயும் பயன்படுத்தலாம்."
      }
    }
  }
};
for(const [id,entry] of Object.entries(map)){
 if(Object.hasOwn(hints,id))throw Error('Duplicate Grade 10 sequence bridge '+id);
 hints[id]=entry;
}
window.TRIGGLE_EX24_STAGED_WHY=Object.freeze({count:Object.keys(map).length,notDeployed:true});
})();
