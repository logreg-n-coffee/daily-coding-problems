/**
 * Given an array of integers and a number k, where 1 <= k <= length of the array, 
 * compute the maximum values of each subarray of length k.
 * 
 * For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10, 7, 8, 8], since:
 * 
 * 10 = max(10, 5, 2)
 * 7 = max(5, 2, 7)
 * 8 = max(2, 7, 8)
 * 8 = max(7, 8, 7)
 * 
 * Do this in O(n) time and O(k) space. 
 * You can modify the input array in-place and you do not need to store the results. 
 * You can simply print them out as you compute them.
 * 
 * You are given an array of integers nums, there is a sliding window of size k 
 * which is moving from the very left of the array to the very right. 
 * You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 * Return the max sliding window.
 * 
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 * 
 * Explanation: 
 * 
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 * 
 * https://leetcode.com/problems/sliding-window-maximum/solution/
 */


// solution using dynamic programming
function maxSlidingWindow(nums, k) {
    const n = nums.length;
    if (n * k === 0) return [0];
    if (k === 1) return nums;

    let left = [];
    left[0] = nums[0];

    let right = [];
    right[n - 1] = nums[n - 1];

    // build the left and right arrays
    for (let i = 1; i < n; i++) {
        // from left to right
        if (i % k === 0) left[i] = nums[i];  // block start
        else left[i] = Math.max(left[i - 1], nums[i]);

        // from right to left
        let j = n - i - 1;
        if ((j + 1) % k === 0) right[j] = nums[j]; // block end
        else right[j] = Math.max(right[j + 1], nums[j]);
    }

    // calculate output
    let output = new Array(n - k + 1);
    for (let i = 0; i < n - k + 1; i++) {
        output[i] = Math.max(left[i + k - 1], right[i]);
    }

    return output;
}

// complexity analysis:

// time complexity: O(n) - all we do is 3 passes along the array of length N
// space complexity: O(n) - keep left and right arrays of length N, and output array of length N - k + 1.

// driver code:
const array = [10, 5, 2, 7, 8, 7];
const k = 3;

console.log(maxSlidingWindow(array, 3));
