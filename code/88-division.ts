/*
Implement division of two positive integers without using 
the division, multiplication, or modulus operators. 

Return the quotient as an integer, ignoring the remainder.
 */

const divide = (a: number, b: number): number => { 
    if (b === 0) console.error('division by zero');

    let quotient = 0;
    let power = 32;  // 32-bit integer
    let bPower = b << power;
    let remainder = a;

    while (remainder >= b) {
        while (bPower > remainder) {
            bPower = bPower >> 1;
            power--;
        }

        quotient += 1 << power;
        remainder -= bPower;
    }

    return quotient;
};

// driver code
(() => { 
    console.log(30, '/', 5, '=', divide(30, 5));
    console.log(82, '/', 9, '=', divide(82, 9));
})();


// TC: O(n)
/*
Intuition:
long division of two positive integers and bit shift operations
 */