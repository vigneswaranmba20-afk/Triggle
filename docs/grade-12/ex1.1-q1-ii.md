# Grade 12 · Chapter 1 · Exercise 1.1 · Q1(ii)

**2025 revised source:** English Volume I, printed p. 15 (PDF p. 23); Tamil Volume I, printed p. 16 (PDF p. 24). Both editions explicitly ask for the adjugate of the same 3×3 matrix. Original instructional restatement, not a reproduced textbook page.

**Question / கேள்வி:** Find the adjugate (சேர்ப்பு அணி) of

\[
A=\begin{bmatrix}2&3&1\\3&4&1\\3&7&2\end{bmatrix}.
\]

## English: worked derivation

1. For each position \\(i,j\\), form the cofactor \\(C_{ij}=(-1)^{i+j}M_{ij}\\), where \\(M_{ij}\\) is the 2×2 minor determinant after deleting row \\(i\\) and column \\(j\\).
2. First row: \\(C_{11}=4(2)-1(7)=1\\); \\(C_{12}=-[3(2)-1(3)]=-3\\); \\(C_{13}=3(7)-4(3)=9\\).
3. Second row: \\(C_{21}=-[3(2)-1(7)]=1\\); \\(C_{22}=2(2)-1(3)=1\\); \\(C_{23}=-[2(7)-3(3)]=-5\\).
4. Third row: \\(C_{31}=3(1)-1(4)=-1\\); \\(C_{32}=-[2(1)-1(3)]=1\\); \\(C_{33}=2(4)-3(3)=-1\\).
5. Therefore the cofactor matrix is \\(C=\begin{bmatrix}1&-3&9\\1&1&-5\\-1&1&-1\end{bmatrix}\\). Transpose it to obtain \\(\boxed{\operatorname{adj}(A)=C^T=\begin{bmatrix}1&1&-1\\-3&1&1\\9&-5&-1\end{bmatrix}}\\).
6. Independent check: expanding the first row, \\(\det A=2(1)+3(-3)+1(9)=2\\). Direct multiplication gives \\(A\operatorname{adj}(A)=\operatorname{adj}(A)A=\begin{bmatrix}2&0&0\\0&2&0\\0&0&2\end{bmatrix}=2I_3\\).

## தமிழ்: படிப்படியான விளக்கம்

*மனித ஆசிரியரின் தமிழ் மொழித்திருத்தம் நிலுவையில் உள்ளது.*

1. \\(C_{ij}=(-1)^{i+j}M_{ij}\\) என்ற வாய்ப்பாட்டைப் பயன்படுத்தி ஒவ்வோர் உறுப்பிற்கும் இணைக்காரணி காண்க. இங்கு \\(M_{ij}\\) என்பது உரிய வரிசையையும் நிரலையும் நீக்கிக் கிடைக்கும் 2×2 அணிக்கோவையின் மதிப்பு.
2. முதல் வரிசை: \\(C_{11}=4(2)-1(7)=1\\), \\(C_{12}=-[3(2)-1(3)]=-3\\), \\(C_{13}=3(7)-4(3)=9\\).
3. இரண்டாம் வரிசை: \\(C_{21}=-[3(2)-1(7)]=1\\), \\(C_{22}=2(2)-1(3)=1\\), \\(C_{23}=-[2(7)-3(3)]=-5\\).
4. மூன்றாம் வரிசை: \\(C_{31}=3(1)-1(4)=-1\\), \\(C_{32}=-[2(1)-1(3)]=1\\), \\(C_{33}=2(4)-3(3)=-1\\).
5. இணைக்காரணி அணியை நிரை-நிரலாக மாற்றுவதால் சேர்ப்பு அணி கிடைக்கும்: \\(\operatorname{adj}(A)=\begin{bmatrix}1&1&-1\\-3&1&1\\9&-5&-1\end{bmatrix}\\).
6. சரிபார்ப்பு: \\(\lvert A\rvert=2\\). மேலும் \\(A\operatorname{adj}(A)=\operatorname{adj}(A)A=2I_3\\). எனவே விடை சரியானது.

**QA status:** The matrix and subpart label were cross-checked against both 2025 textbook extracts. All nine cofactors and both matrix identities were independently calculated. Source text is paraphrased; Tamil human editorial review, test execution, browser integration, CI, merge and deployment remain pending.
