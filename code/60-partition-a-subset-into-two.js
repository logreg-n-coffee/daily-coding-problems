/*
Given a multiset of integers, 
return whether it can be partitioned into two subsets whose sums are the same.

For example, given the multiset {15, 5, 20, 10, 35, 15, 10}, 
it would return true, since we can split it up into {15, 5, 10, 15, 10} and {20, 35}, which both add up to 55.

Given the multiset {15, 5, 20, 10, 35}, it would return false, 
since we can't split it up into two subsets that add up to the same sum.
*/

// METHOD 1: Using powersets and half of the sum - Similar to question #37

/**
 * get powersets from a set of integer
 * @param {number} array 
 * @returns {number[][]} powersets of a set
 */
const getPowerset = (array) => {
    const subsets = [[]];
    for (const num of array) {
        subsets.forEach((subset) => subsets.push([...subset, num]));
    }
    return subsets;
};

/**
 * solve partitioning problem with powerset and sum operations at O(n * 2^n)
 * @param {number} array 
 * @returns {boolean} true if a set can be partitioned into two subsets whose sums are the same
 */
const canPartition = (array) => {
    const k = array.reduce((acc, val) => acc + val, 0);

    if (k % 2 !== 0) {
        return false;
    }

    const powerset = getPowerset(array); 

    for (const subset of powerset) {
        if (subset.reduce((acc, val) => acc + val, 0) === k / 2) {
            return true;
        }
    }

    return false;
};

// METHOD 2: dynamic programming - problem can come down to the problem that is similar to question 42
// find a subset of integers that sum up to k / 2 (target value)

/**
 * solve partitioning problem with dynamic programming at O(k * n)
 * @param {number} array 
 * @returns {boolean} true if a set can be partitioned into two subsets whose sums are the same
 */
const partition = (array) => {
    const k = array.reduce((acc, val) => acc + val, 0);
    
    if (k % 2 !== 0 ) {
        return false;
    }

    const target = k >> 1;

    const n = array.length;
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(target + 1).fill(null));

    for (let i = 0; i < n + 1; i++) {
        dp[i][0] = [];
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < target + 1; j++) {
            const last = array[i - 1];
            
            if (last > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                if (dp[i - 1][j] !== null) {
                    dp[i][j] = dp[i - 1][j];
                } else if (dp[i - 1][j - last] !== null) {
                    dp[i][j] = dp[i - 1][j - last].concat(last);
                } else {
                    dp[i][j] = null;
                }
            }
        }
    }

    const result = dp[n][target].reduce((acc, val) => acc + val, 0);

    if (result === target) return true;
    else return false;
};


// driver code
const mySetOne = [15, 5, 20, 10, 35, 15, 10];
console.log(partition(mySetOne));

const mySetTwo = [15, 5, 20, 10, 35];
console.log(partition(mySetTwo));

/*
Intuition: 
1. brute force: get every subset of the set and check the sum 
2. faster than brute force: to find a subset that adds up to half of the total sum of all the integers:
generate the powerset of our set and check if any of them sum to k / 2, where k is the sum of the set. 
We know immediately that if k is odd, then we can't partition the sets, so we can immediately return False
3. dynamic programming
*/