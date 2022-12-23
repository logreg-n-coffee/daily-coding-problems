/*
Implement integer exponentiation. 
That is, implement the pow(x, y) function, where x and y are integers and returns x ** y.

Do this faster than the naive method of repeated multiplication.

For example, pow(2, 10) should return 1024.
*/

// METHOD 1: Naive Method
const pow = (x, y) => {
    let base, exponent;
    if (y < 0) {
        base = 1 / x;
        exponent = -y;
    } else {
        base = x;
        exponent = y;
    }

    let result = 1;

    for (let i = 0; i < exponent; i++) {
        result *= base;
    }

    return result;
};

// METHOD 2: O(log y)
// If y is even, then x^y = (x^2) ^ (y/2)
// If y is odd, then x^y = x * ((x^2) ^ ((y - 1) / 2))
// 2^20 = 4^10 = 16^5 = 16 * (256)^2 = 16 * 256 * 256

/**
 * integer exponentiation in O(log y) time
 * @param {number} x base
 * @param {number} y exponent
 * @returns {number} x**y
 */
const power = (x, y) => {
    let base = x;
    let exponent = y;

    if (y < 0) {
        base = 1 / x;
        exponent = y;
    }

    let coefficient = 1;

    while (y > 1) {
        if (y % 2 === 0) {
            base *= base;
            y >>= 1;  // y === Math.floor(y / 2);
        } else {
            coefficient *= base;
            base *= base;
            y = (y - 1) >> 1;
        }
    }

    return coefficient * base;
};

// driver code 
console.log(pow(2, 10));
console.log(power(2, 10));
