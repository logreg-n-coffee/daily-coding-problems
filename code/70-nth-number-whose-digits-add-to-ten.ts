/*
A number is considered perfect if its digits sum up to exactly 10.

Given a positive integer n, return the n-th perfect number.

For example, given 1, you should return 19. Given 2, you should return 28.
[
    0, 19, 28, 37, 46, 55, 64, 73, 82, 91, 109, 118, 127, 136, 145, 154, 
    163, 172, 181, 190, 208, 217, 226, 235, 244, 253, 262, 271, 280, 307
]
*/

// METHOD 1: O(n) Time Complexity 
const findPerfect = (n: number) => {
    const sumOfDigits = (number: number) => 
        String(number).
            split('').
            reduce((prev, curr) => prev + parseInt(curr), 0);
    
    const perfect = (n: number) => { 
        let i = 0;
        let current = 0;

        while (current < n) {
            i++;
            if (sumOfDigits(i) === 10) {
                current++;
            }
        }

        return i;
    };

    return perfect(n);
};

// METHOD 2: O(1) Time Complexity
const findNth = (n: number) => { 
    if (n <= 0) return 0;

    let count = 0;
  
    for (let curr = 19; ;curr += 9) {
  
        // Find sum of digits in
        // current no.
        let sum = 0;
        for (let x = curr; x > 0; x = Math.floor(x / 10)) {
            sum = sum + x % 10;
        }
            
        // If sum is 10, we increment
        // count
        if (sum === 10) count++;
  
        // If count becomes n, we return
        // current number.
        if (count === n) return curr;
    
    }
};

// driver code
(() => { 
    // METHOD 1:
    console.log(Array(10).fill(0).map((_, i) => findPerfect(i)));

    // METHOD 2:
    console.log(Array(10).fill(0).map((_, i) => findNth(i)));

})();

