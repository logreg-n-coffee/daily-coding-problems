/*
Given an array of integers where every integer occurs three times except for one integer, 
which only occurs once, find and return the non-duplicated integer.

For example, given [6, 1, 3, 3, 3, 6, 6], return 1. Given [13, 19, 13, 13], return 19.

Do this in O(N) time and O(1) space.
*/

const nonDuplicatedInt = (array) => {
    // suppose all ints fit in 32 bits, initialize an array with length of 32 and fill it with 0's
    const resultArr = Array(32).fill(0);

    // for each num in the array, add all the bits to its bit spot
    for (const num of array) {
        for (let i = 0; i < 32; i++) {
            // convert a decimal into a binary bit (num >> i is the same dividing num by 2**i) and keep that single digit (with &1)
            const bit = (num >> i) & 1;
            // 'stack' all bits in their respective spots and make it equal to itself modulo 3
            resultArr[i] = (resultArr[i] + bit) % 3; // any bit that has been set some multiple of 3 times will effectively be cleared
        }
    }

    let result = 0;
    for (const [i, bit] of Object.entries(resultArr)) {
        if (bit) {
            // convert the binary bits stored in the resultArr back to its decimal form
            result += 2 ** i;
        }
    }

    return result;
};


// driver code 
console.log(nonDuplicatedInt([6, 1, 3, 3, 3, 6, 6]));  // returns 1
console.log(nonDuplicatedInt([13, 19, 13, 13]));  // returns 19


/* 
intution question: 

Given an array of integers where every integer occurs TWO times except for one integer, 
which only occurs once, find and return the non-duplicated integer.

For example, given [1, 1, 2, 2, 3, 3, 4, 4, 7, 7, 100, 200, 200], return 100. Given [12, 12, 15, 15, 50], return 50.

solution: using xor (^) to cancel out the duplicates
*/

const nonDuplicateNum = (array) => array.reduce((prev, curr) => prev ^ curr, 0);

console.log(nonDuplicateNum([1, 1, 2, 2, 3, 3, 4, 4, 7, 7, 100, 200, 200]));
console.log(nonDuplicateNum([12, 12, 15, 15, 50]));
