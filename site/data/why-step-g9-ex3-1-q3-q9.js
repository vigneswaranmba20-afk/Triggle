/* English-only Algebra Ex3.1 Q3–Q9 source-backed Why-step hints. */
(()=>{'use strict';
const previous=window.TriggleWhyStepG9;if(!previous?.hints)throw Error('Grade 9 Why-step data must load first');
const additions={
  "g9-ch3-ex3.1-q3-i": {
    "step": 0,
    "expected": "The degree of a polynomial is the largest exponent of its variable with a nonzero coefficient.",
    "en": "The degree of a polynomial in one variable is the greatest exponent on that variable among all nonzero terms after simplifying products or common variable factors; numerical radicals and denominators in coefficients do not affect the variable exponent.",
    "concept": "polynomialDegree"
  },
  "g9-ch3-ex3.1-q3-ii": {
    "step": 0,
    "expected": "Divide each term in the numerator by x squared; this calculation requires x to be nonzero.",
    "en": "The degree of a polynomial in one variable is the greatest exponent on that variable among all nonzero terms after simplifying products or common variable factors; numerical radicals and denominators in coefficients do not affect the variable exponent.",
    "concept": "polynomialDegree"
  },
  "g9-ch3-ex3.1-q3-iii": {
    "step": 0,
    "expected": "Distribute x cubed across both terms inside the bracket.",
    "en": "The degree of a polynomial in one variable is the greatest exponent on that variable among all nonzero terms after simplifying products or common variable factors; numerical radicals and denominators in coefficients do not affect the variable exponent.",
    "concept": "polynomialDegree"
  },
  "g9-ch3-ex3.1-q3-iv": {
    "step": 0,
    "expected": "A polynomial's degree comes from the greatest exponent after collecting any like terms.",
    "en": "The degree of a polynomial in one variable is the greatest exponent on that variable among all nonzero terms after simplifying products or common variable factors; numerical radicals and denominators in coefficients do not affect the variable exponent.",
    "concept": "polynomialDegree"
  },
  "g9-ch3-ex3.1-q3-v": {
    "step": 0,
    "expected": "The radicals and denominators are numbers only; they are coefficients, not powers of the variable p.",
    "en": "The degree of a polynomial in one variable is the greatest exponent on that variable among all nonzero terms after simplifying products or common variable factors; numerical radicals and denominators in coefficients do not affect the variable exponent.",
    "concept": "polynomialDegree"
  },
  "g9-ch3-ex3.1-q4-i": {
    "step": 1,
    "expected": "Place the x-cubed term first, followed by x-squared, x, and the constant; keep each coefficient and sign.",
    "en": "Writing a polynomial in standard form means ordering its terms systematically by the exponent of the variable—either from highest power to lowest (descending order) or from lowest power to highest (ascending order)—while keeping each term's sign attached to its coefficient.",
    "concept": "polynomialStandardForm"
  },
  "g9-ch3-ex3.1-q4-ii": {
    "step": 1,
    "expected": "Keep each coefficient, including its minus sign, while arranging from greatest power to least.",
    "en": "Writing a polynomial in standard form means ordering its terms systematically by the exponent of the variable—either from highest power to lowest (descending order) or from lowest power to highest (ascending order)—while keeping each term's sign attached to its coefficient.",
    "concept": "polynomialStandardForm"
  },
  "g9-ch3-ex3.1-q4-iii": {
    "step": 1,
    "expected": "So its descending standard form is unchanged; preserve the negative fraction and constant.",
    "en": "Writing a polynomial in standard form means ordering its terms systematically by the exponent of the variable—either from highest power to lowest (descending order) or from lowest power to highest (ascending order)—while keeping each term's sign attached to its coefficient.",
    "concept": "polynomialStandardForm"
  },
  "g9-ch3-ex3.1-q4-iv": {
    "step": 1,
    "expected": "Place the highest-degree term first; retain the minus sign in front of the y term and the constant.",
    "en": "Writing a polynomial in standard form means ordering its terms systematically by the exponent of the variable—either from highest power to lowest (descending order) or from lowest power to highest (ascending order)—while keeping each term's sign attached to its coefficient.",
    "concept": "polynomialStandardForm"
  },
  "g9-ch3-ex3.1-q5-i": {
    "step": 0,
    "expected": "Write the sum p(x) + q(x) and group like powers of x in descending order from x³ down to the constant term.",
    "en": "Only like terms—terms with the exact same variable and exponent—can have their numerical coefficients added together; terms with different exponents stay separate, and the degree of the sum is the highest power that remains with a nonzero coefficient.",
    "concept": "polynomialAddition"
  },
  "g9-ch3-ex3.1-q5-ii": {
    "step": 0,
    "expected": "Write the sum h(x) + f(x) and align like powers of x from highest to lowest.",
    "en": "Only like terms—terms with the exact same variable and exponent—can have their numerical coefficients added together; terms with different exponents stay separate, and the degree of the sum is the highest power that remains with a nonzero coefficient.",
    "concept": "polynomialAddition"
  },
  "g9-ch3-ex3.1-q5-iii": {
    "step": 0,
    "expected": "Write the sum f(x) + g(x) in descending powers of x and group the two constant terms together.",
    "en": "Only like terms—terms with the exact same variable and exponent—can have their numerical coefficients added together; terms with different exponents stay separate, and the degree of the sum is the highest power that remains with a nonzero coefficient.",
    "concept": "polynomialAddition"
  },
  "g9-ch3-ex3.1-q6-i": {
    "step": 0,
    "expected": "Distribute the minus sign across every term of the second polynomial q(x) = 6x − 9.",
    "en": "Subtracting a polynomial requires distributing the minus sign to every term of the second polynomial before combining like powers; forgetting to flip the sign of later terms is the most common beginner error.",
    "concept": "polynomialSubtraction"
  },
  "g9-ch3-ex3.1-q6-ii": {
    "step": 0,
    "expected": "Subtract g(y) from f(y) by changing the sign of every term in g(y) = 7y + y³.",
    "en": "Subtracting a polynomial requires distributing the minus sign to every term of the second polynomial before combining like powers; forgetting to flip the sign of later terms is the most common beginner error.",
    "concept": "polynomialSubtraction"
  },
  "g9-ch3-ex3.1-q6-iii": {
    "step": 0,
    "expected": "Distribute the subtraction sign across all three terms of f(z) = 6z² + 10z − 7.",
    "en": "Subtracting a polynomial requires distributing the minus sign to every term of the second polynomial before combining like powers; forgetting to flip the sign of later terms is the most common beginner error.",
    "concept": "polynomialSubtraction"
  },
  "g9-ch3-ex3.1-q7": {
    "step": 0,
    "expected": "Let P(x) be the required polynomial; to find what must be added, subtract the starting polynomial from the target polynomial.",
    "en": "Finding what polynomial P(x) must be added to A(x) to get B(x) is the inverse of addition: solve A(x) + P(x) = B(x) by subtracting every term of A(x) from B(x).",
    "concept": "polynomialAddition"
  },
  "g9-ch3-ex3.1-q8": {
    "step": 0,
    "expected": "If A − P(x) = B, then P(x) = A − B; subtract the target polynomial from the starting polynomial.",
    "en": "Finding what polynomial P(x) must be subtracted from A(x) to get B(x) means solving A(x) − P(x) = B(x), which rearranges to P(x) = A(x) − B(x): subtract the target polynomial from the starting polynomial.",
    "concept": "polynomialSubtraction"
  },
  "g9-ch3-ex3.1-q9-i": {
    "step": 0,
    "expected": "Distribute each term of p(x) = x² − 9 across the trinomial q(x) = 6x² + 7x − 2.",
    "en": "By the distributive law, every term of the first polynomial multiplies every term of the second polynomial, adding exponents of like bases (x^m · x^n = x^(m+n)) before collecting like terms.",
    "concept": "polynomialMultiplication"
  },
  "g9-ch3-ex3.1-q9-ii": {
    "step": 0,
    "expected": "Multiply each term of f(x) = 7x + 2 by each term of g(x) = 15x − 9 using the distributive law.",
    "en": "By the distributive law, every term of the first polynomial multiplies every term of the second polynomial, adding exponents of like bases (x^m · x^n = x^(m+n)) before collecting like terms.",
    "concept": "polynomialMultiplication"
  },
  "g9-ch3-ex3.1-q9-iii": {
    "step": 0,
    "expected": "Distribute each term of h(x) = 6x² − 7x + 1 across f(x) = 5x − 7.",
    "en": "By the distributive law, every term of the first polynomial multiplies every term of the second polynomial, adding exponents of like bases (x^m · x^n = x^(m+n)) before collecting like terms.",
    "concept": "polynomialMultiplication"
  }
};
for(const id of Object.keys(additions))if(Object.prototype.hasOwnProperty.call(previous.hints,id))throw Error('Duplicate Why-step '+id);
window.TriggleWhyStepG9=Object.freeze({...previous,hints:Object.freeze({...previous.hints,...additions})});
})();
