# Grade 12 · Chapter 1 · Exercise 1.1 · Q1(iii)

**2025 revised primary-source evidence:** English Mathematics Volume I, printed p.15/PDF p.23; Tamil Mathematics Volume I, printed p.16/PDF p.24. Both *page images* independently inspected on 2026-11-08. The question asks for the adjugate of the displayed matrix. This is an original concise restatement.

\[
A=\frac13\begin{pmatrix}2&2&1\\-2&1&2\\1&-2&2\end{pmatrix}.
\]

## English: worked derivation

1. Write \(M=3A\). For any \(3\times3\) matrix, each cofactor is a signed \(2\times2\) minor. Scaling all entries by \(1/3\) scales every minor by \(1/9\). Thus \(\operatorname{cof}(A)=\operatorname{cof}(M)/9\).
2. The first row of cofactors of \(M\) is \(C_{11}=1\cdot2-2(-2)=6\), \(C_{12}=-[(-2)\cdot2-2\cdot1]=6\), and \(C_{13}=(-2)(-2)-1\cdot1=3\).
3. The remaining cofactors of \(M\) are \(C_{21}=-[2\cdot2-1(-2)]=-6\), \(C_{22}=2\cdot2-1\cdot1=3\), \(C_{23}=-[2(-2)-2\cdot1]=6\), \(C_{31}=2\cdot2-1\cdot1=3\), \(C_{32}=-[2\cdot2-1(-2)]=-6\), and \(C_{33}=2\cdot1-2(-2)=6\).
4. Consequently \(\operatorname{cof}(M)=\begin{pmatrix}6&6&3\\-6&3&6\\3&-6&6\end{pmatrix}\). Transpose and divide by 9:
\[
\boxed{\operatorname{adj}(A)=\frac13\begin{pmatrix}2&-2&1\\2&1&-2\\1&2&2\end{pmatrix}}.
\]
5. Independently, \(\det(M)=2(6)+2(6)+1(3)=27\), so \(\det(A)=27/27=1\). Direct multiplication in **both** orders gives \(A\operatorname{adj}(A)=\operatorname{adj}(A)A=I_3\). This also establishes that the adjugate equals \(A^{-1}\).

## தமிழ்: படிப்படியான விளக்கம்

**மனிதத் தமிழ் ஆசிரியரின் மொழித்திருத்தம் நிலுவையில் உள்ளது.**

1. \(M=3A\) எனக் கொள்க. ஒவ்வொரு இணைக்காரணியும் \(2\times2\) சிற்றணிக்கோவையிலிருந்து கணக்கிடப்படுகிறது. \(A=M/3\) என்பதால் \(\operatorname{cof}(A)=\operatorname{cof}(M)/9\).
2. \(M\) அணியின் முதல் வரிசை இணைக்காரணிகள்: \(C_{11}=6\), \(C_{12}=6\), \(C_{13}=3\). இங்கு குறிகள் \((-1)^{i+j}\) என்ற விதிப்படி அமைக்கப்படுகின்றன.
3. மற்ற இணைக்காரணிகள்: \(C_{21}=-6\), \(C_{22}=3\), \(C_{23}=6\), \(C_{31}=3\), \(C_{32}=-6\), \(C_{33}=6\). ஒவ்வொரு மதிப்பும் தொடர்புடைய வரிசையையும் நிரலையும் நீக்கி எடுக்கப்படும் \(2\times2\) அணிக்கோவையிலிருந்து பெறப்படுகிறது.
4. இணைக்காரணி அணியை நிரை-நிரலாக மாற்றி 9-ஆல் வகுத்தால் \(\operatorname{adj}(A)=\frac13\begin{pmatrix}2&-2&1\\2&1&-2\\1&2&2\end{pmatrix}\) கிடைக்கிறது.
5. தனியாகச் சரிபார்க்க: \(|M|=27\), ஆகவே \(|A|=1\). மேலும் \(A\operatorname{adj}(A)=\operatorname{adj}(A)A=I_3\). எனவே விடை சரியானது.

**Quality gate:** Both source page images checked; all nine cofactor values and both matrix products independently recomputed with exact rational arithmetic. Tamil human editorial approval pending. Not merged or live verified.
