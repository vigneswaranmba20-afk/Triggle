# Grade 9 · Chapter 1 — Set Language: bilingual subskill and worked-example checkpoint
Date: 2026-11-07. **Draft, not approved for publication.** Original Triggle practice; not copied from or falsely numbered as a 2025 textbook exercise.

## Scope and evidence
The 2025 SCERT English/Tamil chapter contents map sections 1.1–1.8 to the seven stages already in `site/data/set-language-path.js`. This checkpoint supplements those stages; it does **not** establish that the numbered textbook exercises, examples, and unit exercise are fully covered. Confirm against the actual 2025 English and Tamil textbook pages before assigning question numbers. 2026–27 edition equivalence is unverified.

| Section | Subskill and assessment still needed | Draft checkpoint |
|---|---|---|
| 1.1–1.2 | Membership, subjective vs well-defined descriptions, duplicate elements | Example A |
| 1.3 | Roster ↔ set-builder ↔ description, finite/infinite forms | Example B |
| 1.4 | Empty, singleton, finite/infinite, subset/proper subset, universal set | Example C |
| 1.5 | Union, intersection, difference, complement, 2/3-set Venn regions | Example D |
| 1.6 | Commutative, associative, distributive, identity, absorption laws | Example E |
| 1.7 | Both De Morgan laws, complement relative to a specified universe | Example F |
| 1.8 | Two- and three-set cardinality, exactly one/two, neither, consistency checks | Example G |

## Original bilingual worked examples and self-checks

### A — Well-defined sets and duplicates
**EN problem:** Let A be the distinct positive even integers below 9 listed as `{2,4,4,6,8}`. Find n(A), and say whether 5 belongs to A.
**TA கேள்வி:** `A={2,4,4,6,8}` என்பது 9-ஐ விடச் சிறிய நேர்ம இரட்டைப்படை எண்களின் கணம். n(A) மற்றும் 5 ∈ A என்பதன் உண்மை மதிப்பைக் காண்க.
**EN reasoning:** Repeating 4 does not create a new member; A={2,4,6,8}, so n(A)=4 and 5∉A.
**TA விளக்கம்:** 4 இருமுறை எழுதப்பட்டாலும் அது ஒரே உறுப்பு. எனவே A={2,4,6,8}; n(A)=4; 5∉A.
**Self-check:** Is `{1,1,2}` a 2-element or 3-element set? **Answer: 2.** Hint: Count unique members, not commas.

### B — Representations
**EN problem:** Convert `B={3,6,9,12}` to set-builder form, with an explicit domain.
**TA கேள்வி:** `B={3,6,9,12}` என்ற கணத்தை உறுப்பின் வரம்புடன் கணக்கட்டமைப்பு முறையில் எழுதுக.
**EN reasoning:** `B={3n | n∈ℕ, 1≤n≤4}`. Specifying n∈ℕ and the bounds prevents unintended members.
**TA விளக்கம்:** `B={3n | n∈ℕ, 1≤n≤4}`. n-இன் வரம்பு கொடுக்கப்பட்டதால் உறுப்புகள் 3,6,9,12 மட்டுமே.
**Self-check:** Does `{3n | n∈ℕ, n≤4}` always equal B if 0∈ℕ by convention? **Answer: No; it would include 0.** Hint: State the lower bound explicitly.

### C — Subsets and proper subsets
**EN problem:** For `C={a,b}`, list all subsets and proper subsets.
**TA கேள்வி:** `C={a,b}` என்ற கணத்தின் அனைத்து உட்கணங்களையும் தகு உட்கணங்களையும் எழுதுக.
**EN reasoning:** Subsets: ∅, {a}, {b}, {a,b}; there are 2²=4. Proper subsets exclude C itself: ∅, {a}, {b}. The empty set is a subset of every set.
**TA விளக்கம்:** உட்கணங்கள்: ∅, {a}, {b}, {a,b}; மொத்தம் 2²=4. தகு உட்கணங்கள்: ∅, {a}, {b}; C தன்னுடைய தகு உட்கணம் அல்ல.
**Self-check:** Is `C⊆C` true, and is `C⊂C` true when ⊂ means proper subset? **Answer: true, false.** Hint: Equality is allowed only for ⊆.

### D — Operations with a declared universe
**EN problem:** `U={1,2,3,4,5,6}`, `A={1,2,4}`, `B={2,3,4}`. Find A∪B, A∩B, A−B, and (A∪B)′ relative to U.
**TA கேள்வி:** `U={1,2,3,4,5,6}`, `A={1,2,4}`, `B={2,3,4}`. A∪B, A∩B, A−B மற்றும் U-ஐப் பொறுத்த (A∪B)′ காண்க.
**EN reasoning:** Union collects all members: {1,2,3,4}. Intersection keeps shared members: {2,4}. A−B keeps A-only: {1}. Complement of union within U: {5,6}.
**TA விளக்கம்:** சேர்ப்பு {1,2,3,4}; வெட்டு {2,4}; A-இல் மட்டும் உள்ள உறுப்பு {1}; U-இல் சேர்ப்புக்கு வெளியே உள்ளவை {5,6}.
**Self-check:** Is A−B necessarily equal to B−A? **Answer: No**; B−A={3}. Hint: Set difference has a direction.

### E — Distributive property
**EN problem:** Verify `A∩(B∪C)=(A∩B)∪(A∩C)` for `A={1,2,3}`, `B={2,4}`, `C={1,4}`.
**TA கேள்வி:** கொடுக்கப்பட்ட A, B, C கணங்களுக்கு `A∩(B∪C)=(A∩B)∪(A∩C)` என்பதைச் சரிபார்க்கவும்.
**EN reasoning:** B∪C={1,2,4}; A∩(B∪C)={1,2}. A∩B={2}; A∩C={1}; their union={1,2}. Both sides agree.
**TA விளக்கம்:** B∪C={1,2,4}; இடப்பக்கம் {1,2}. A∩B={2}, A∩C={1}; வலப்பக்கம் {1,2}. இருபக்கமும் சமம்.
**Self-check:** Does checking one numerical example prove the identity for every set? **Answer: No.** Hint: A general proof must use membership reasoning or a universally valid diagram.

### F — De Morgan with universe
**EN problem:** With U, A and B from Example D, verify `(A∪B)′=A′∩B′`.
**TA கேள்வி:** D-இல் உள்ள U, A, B கணங்களுக்கு `(A∪B)′=A′∩B′` என்பதைச் சரிபார்க்கவும்.
**EN reasoning:** (A∪B)′={5,6}; A′={3,5,6}, B′={1,5,6}; A′∩B′={5,6}.
**TA விளக்கம்:** (A∪B)′={5,6}; A′={3,5,6}; B′={1,5,6}; A′∩B′={5,6}.
**Self-check:** Does `(A∩B)′` equal `A′∩B′`? **Answer: Not generally**; the correct identity is `A′∪B′`. Hint: De Morgan swaps ∩ and ∪.

### G — Cardinality and consistency
**EN problem:** In a class of 40, 23 like mathematics, 18 like science and 9 like both. How many like at least one, exactly one, and neither?
**TA கேள்வி:** 40 மாணவர்களில் 23 பேர் கணிதத்தையும், 18 பேர் அறிவியலையும், 9 பேர் இரண்டையும் விரும்புகின்றனர். குறைந்தது ஒன்றை, சரியாக ஒன்றை, எதையும் விரும்பாதவர்களின் எண்ணிக்கைகளைக் காண்க.
**EN reasoning:** At least one=23+18−9=32. Exactly one=(23−9)+(18−9)=23. Neither=40−32=8. Check: math only 14 + science only 9 + both 9 + neither 8 =40.
**TA விளக்கம்:** குறைந்தது ஒன்று=23+18−9=32; சரியாக ஒன்று=(23−9)+(18−9)=23; எதுவுமில்லை=40−32=8. சரிபார்ப்பு: 14+9+9+8=40.
**Self-check:** If 'both' were 25 while math total were 23, could the data be valid? **Answer: No.** Hint: An intersection cannot exceed either of its sets.

## Release gates
- These seven examples are independently constructed, with arithmetic and set results explicitly derived above; they are not yet integrated into the student-facing runtime.
- Before integration: validate English/Tamil phrasing with a qualified educator, check against textbook exercises and their printed pages, add accessible interactive feedback and automated tests, test 320px/390px Android layout and offline reload.
- Do not alter `terminology.ta`, chapter publication flags, existing 105 question IDs or video infrastructure on the strength of this draft.
