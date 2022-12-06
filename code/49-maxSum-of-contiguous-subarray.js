/*
Given an array of numbers, find the maximum sum of any contiguous subarray of the array.

For example, given the array [34, -50, 42, 14, -5, 86], the maximum sum would be 137, 
since we would take elements 42, 14, -5, and 86.

Given the array [-5, -1, -8, -9], the maximum sum would be 0, since we would not take any elements.

Do this in O(N) time.
*/

/**
 * Find the maximum sum of any contiguous subarray of the array using brute force - O(n^2)
 * @param {number[]} arr 
 * @returns {number} maximum sum of any contiguous subarray of the array
 */
const maxSumBF = (arr) => {
    const n = arr.length;

    let maxSum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n + 1; j++) {
            const substring = arr.slice(i, j);
            // if (substring.length > 0) {
            //     const potentialMaxSum = substring.reduce((prev, curr) => prev + curr, 0);
            //     if (potentialMaxSum > maxSum) {
            //         maxSum = potentialMaxSum;
            //     }
            // };
            maxSum = Math.max(
                substring.reduce((prev, curr) => prev + curr, 0),
                maxSum
            );
        }
    }
    return maxSum;
};

/**
 * Find the maximum sum of any contiguous subarray of the array by using two variables - 
 * TC: O(n), Extra SC: O(1)
 * @param {number[]} arr 
 * @returns {number} maximum sum of any contiguous subarray of the array
 */
const maxSumSubArray = (arr) => {
    const n = arr.length;

    let maxSum = arr[0];
    let currentSum = arr[0];

    for (let i = 1; i < n; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

// Driver code
const myArr = [34, -50, 42, 14, -5, 86];
console.log('My input array:', myArr);
console.log('Brute force: ', maxSumBF(myArr));
console.log('O(n) approach: ', maxSumSubArray(myArr));
