/*
Given an array of numbers, find the length of the longest increasing subsequence in the array. 
The subsequence does not necessarily have to be contiguous.

For example, given the array [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], 
the longest increasing subsequence has length 6: it is 0, 2, 6, 9, 11, 15.
 */

const lengthLongestIncreasingSubsequence = (arr: number[]) => { 
    const length = arr.length;

    if (length === 0) return 0;

    // cache
    const dp = Array(length).fill(1);

    for (let i = 1; i < length; i++) { 
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
    
};

// driver code - O(N * N) time and O(N) space
(() => {
    const myArr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

    console.log(lengthLongestIncreasingSubsequence(myArr));
})();
