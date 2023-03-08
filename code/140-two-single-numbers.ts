/*
Given an array of integers in which two elements appear exactly once and all other elements appear exactly twice, 
find the two elements that appear only once.

For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.

Follow-up: Can you do this in linear time and constant space?
 */

(() => {
    const findTwoSingleNumbers = (arr: number[]): number[] => {
        // compute xor of all the numbers - duplicates will be canceled out
        // Since x has at least one bit set to 1 we can use this fact to partition the array into two subarrays:
        const xor = arr.reduce((acc, cur) => acc ^ cur, 0);

        // find the two elements that produce the xor result

        // Find a bit that is set in the XOR result
        let bit = 0;
        while (((xor >> bit) & 1) === 0) {
            // (xor >> bit) & 1 extracts the bit-th bit from the binary representation of xor
            bit++;
        }

        // partition the array into two sub arrays based on the selected bit
        let xor1 = 0;
        let xor2 = 0;

        for (const num of arr) {
            // One subarray contains all the elements that have that bit set to 1.
            if (((num >> bit) & 1) === 1) {
                xor1 ^= num;
            } else {
                // The other subarray contains all the elements that have that bit set to 0.
                xor2 ^= num;
            }
        }

        return [xor1, xor2];
    };

    console.log(findTwoSingleNumbers([2, 4, 6, 8, 10, 2, 6, 10]));
})();