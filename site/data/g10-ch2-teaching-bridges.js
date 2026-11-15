/* Grade 10 Chapter 2, TRACE: optional, source-preserving teaching bridges.
 * Do not mutate the canonical textbook item or its independently checked math.
 * An original intuitive route complements rather than replaces Euclid's algorithm. */
(()=>{'use strict';
const map={
 "c10-2-ex2-1-q8":{
  en:{
   title:"First, understand the goal",
   explain:"The HCF is 4. We want to make 4 by multiplying 32 and 60 by integers and combining them. Spot 64 − 60 = 4, and notice 64 = 32 × 2. The solution below shows the reliable method for numbers where this shortcut is hard to spot.",
   math:{latex:String.raw`4=32(2)+60(-1)`,fallback:"4 = 32 × 2 + 60 × (−1)",display:true}
  },
  ta:{
   title:"முதலில் நோக்கத்தைப் புரிந்துகொள்வோம்",
   explain:"மீ.பொ.வ = 4. 32, 60 ஆகிய எண்களை முழு எண்களால் பெருக்கி 4-ஐ உருவாக்க வேண்டும். 64 − 60 = 4; மேலும் 64 = 32 × 2. கீழே பெரிய எண்களுக்கும் பொருந்தும் முறையான வழி உள்ளது.",
   math:{latex:String.raw`4=32(2)+60(-1)`,fallback:"4 = 32 × 2 + 60 × (−1)",display:true}
  }
 }
};
window.TriggleG10Ch2Bridge=Object.freeze({
 get(record,lang){if(record?.classNum!==10||String(record?.chapter)!=='2')return null;
  return map[record?.id]?.[lang==='ta'?'ta':'en']||null;}
});
})();