# Grade 9 / Chapter 1 / Exercise 1.2 — source extraction checkpoint (2026-11-09)

Status: **inventory extracted; NOT visually source-certified; NOT student-facing; NOT published**. This is a small incremental checkpoint, not a chapter audit or completion claim.

Source: user-connected English 2025 revised textbook `Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf`, Google Drive ID `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`, printed pages **11–12**. Extracted PDF text, which may corrupt fractions, exponents and inequality symbols. PDF page indices and exact printed typography still require visual verification before a question is copied into the UI. Tamil source Drive ID `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj` has not been checked for this batch. Human editorial approval pending.

## Source-derived question/subpart inventory

| Question | Subparts | Status |
|---|---|---|
| 1 | (i)–(v), five | English text extracted; independent math check below; visual exactness pending |
| 2 | (i)–(iv), four | missing solutions |
| 3 | (i)–(iv), four | missing solutions |
| 4 | (i)–(iv), four | missing solutions |
| 5 | (i)–(iii), three | missing solutions |
| 6 | (i)–(iv), four | missing solutions |
| 7 | no subparts, one | missing solution |
| 8 | (i)–(iv), four | missing solutions |
| 9 | (i)–(ii), two | missing solutions |
| 10 | (i)–(iii), three | missing solutions |
| **Total** | **34** | **0 student-facing verified or published by this checkpoint** |

## Q1 mathematical cross-check (provisional, pending source-page visual check)

- (i) `M={p,q,r,s,t,u}`: six distinct members, hence n(M)=6.
- (ii) `P={x:x=3n+2,n∈W,x<15}`: whole n≥0; n=0,1,2,3,4 yield x=2,5,8,11,14; n=5 gives 17≥15. Thus n(P)=5.
- (iii) extracted fraction `y=3n/4` with natural n and 2<n≤5: n=3,4,5 gives three distinct values 9/4,3,15/4, hence n(Q)=3. **The extracted stacked fraction must be checked visually before publication.**
- (iv) integers -5≤x<5: -5,-4,-3,-2,-1,0,1,2,3,4, hence n(R)=10.
- (v) leap years strictly between 1882 and 1906: 1884,1888,1892,1896,1904; 1900 is not a leap year (century not divisible by 400). Hence n(S)=5.

Second-method checks: integer range cardinality `5-(-5)=10`; leap years divisible by 4 in interval are six candidates (1884–1904 inclusive) minus non-leap century 1900 = five. These match the textbook's separate answer-key extraction (6,5,3,10,5), but the answer key alone is not mathematical validation.

**Next**: visually inspect printed pp. 11–12 (including Q1(iii)), record exact PDF page numbers, transcribe Q1(i–v) verbatim into the existing Grade 9 Exercises UI with complete English steps and explicit Tamil-pending metadata, add source-to-render and arithmetic assertions, run npm test, npm run test:browser (320/390px, keyboard/offline), await green GitHub CI, then preview merge/deploy and verify live. Do not count this checkpoint as new published curriculum coverage.
