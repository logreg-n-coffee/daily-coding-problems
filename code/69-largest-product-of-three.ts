/*
Given a list of integers, return the largest product that can be made by multiplying any three integers.

For example, if the list is [-10, -10, 5, 2], we should return 500, since that's -10 * -10 * 5.

You can assume the list has at least three integers.
*/

// Intuition: 
// Max product = smallest * second smallest * largest, or 
// Max product = largest * second largest * third largest 

// METHOD 1: With Sorting - (O(n * log(n)) TC and SC)
const largestProductOfThree = (nums: Array<number>) => { 
    const n = nums.length;
    const sorted = nums.sort((a, b) => a - b);
    return (
        Math.max(
            sorted[0] * sorted[1] * sorted[n - 1],
            sorted[n - 1] * sorted[n - 2] * sorted[n - 3]
        )
    );
};

// METHOD 2: With one take - O(n) TC and O(1) SC
const maxProductOfThree = (nums: Array<number>) => { 
    let min1 = Number.MAX_SAFE_INTEGER,
        min2 = Number.MAX_SAFE_INTEGER;

    let max1 = Number.MIN_SAFE_INTEGER,
        max2 = Number.MIN_SAFE_INTEGER,
        max3 = Number.MIN_SAFE_INTEGER;

    for (const n of nums) {
        if (n <= min1) {
            min2 = min1;
            min1 = n;
        } else if (n <= min2) {
            min2 = n;
        }

        if (n >= max1) {
            max3 = max2;
            max2 = max1;
            max1 = n;
        } else if (n >= max2) {
            max3 = max2;
            max2 = n;
        } else if (n >= max3) {
            max3 = n;
        }
    }

    return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};

// driver code 
(() => { 
    let nums = [-10, -10, 5, 2];
    console.log('METHOD 1: With Sorting - (O(n * log(n)) TC and SC): ', largestProductOfThree(nums));
    console.log('METHOD 2: With one take - O(n) TC and O(1) SC: ', maxProductOfThree(nums));
})();
