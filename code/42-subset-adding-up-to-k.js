/*
Given a list of integers s and a target number k, 
write a function that returns a subset of s that adds up to k. 
If such a subset cannot be made, then return null.

Integers can appear more than once in the list. You may assume all numbers in the list are positive.

For example, given nums = [12, 1, 61, 5, 9, 2] and k = 24, return [12, 9, 2, 1] since it sums up to 24.
*/

const subsetSum = (nums, k) => {
    const n = nums.length;
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(k + 1).fill(null)); // 2d array: dp[n + 1][k + 1]

    // initialize first element in each row as an empty array - first column as an empty array
    for (let i = 0; i < n + 1; i++) {
        dp[i][0] = [];
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < k + 1; j++) {
            // get the last element in the nums array we are looking at nums[i - 1]
            const last = nums[i - 1];
            // IF last is greater than j (current k value), for sure we can't make j with the nums.slice(j) (j included)
            if (last > j) {
                // copy whatever we have from dp[i - 1][j]
                dp[i][j] = dp[i - 1][j];
            } else {
                // ELSE we can still make j using the last value
                // if we can make j without last and dp[i - 1][j] is not null
                if (dp[i - 1][j] !== null) {
                    dp[i][j] = dp[i - 1][j];
                } else if (dp[i - 1][j - last] !== null) {
                    // if we can't make j without last,
                    // then check if we can make j with last value by looking at (possible) array at dp[i - 1][j - last]
                    // if we can: copy over the array and append the last element to the array
                    dp[i][j] = dp[i - 1][j - last].concat(last);
                } else {
                    // we can't make it with or without j
                    dp[i][j] = null;
                }
            }
        }
    }

    return dp[n][k];
};

// Driver Code
console.log(subsetSum([12, 1, 61, 5, 9, 2], 24));
console.log(subsetSum([1, 2, 4], 3));

// Complexities: TC & SC: O(k * n)

/*
Examples:
s1 = [3, 34, 4, 12, 5, 2]
k1 = 9
There is a subset (4, 5) with sum 9.

s2 = []
k2 = 30
There is no subset that add up to 30.

Solutions: 
    0) Brute force: 
        selecting all subsets, summing them, and checking if they equal k - TC: O(2^N * N)
    1) Recursive approach:
        1. Consider the last element and now: the required sum = target sum – value of ‘last’ element; number of elements = total elements – 1
        2. Leave the ‘last’ element and now: the required sum = target sum;  number of elements = total elements – 1

        Formula: 
        isSubsetSum(set, n, sum) 
            = isSubsetSum(set, n-1, sum) || 
            isSubsetSum(set, n-1, sum-set[n-1])
        
        Base Cases:
        isSubsetSum(set, n, sum) = false, if sum > 0 and n == 0
        isSubsetSum(set, n, sum) = true, if sum == 0 

        Simulation:
            set = [3, 4, 5, 2]
            sum = 9
            (x, y): 'x' is the number of elements left in the set,
                    'y' is the required sum
            
                        (4, 9)
                        {True}
                    /        \  
                    (3, 6)       (3, 9)
                        
                    /    \        /   \ 
                (2, 2)  (2, 6)   (2, 5)  (2, 9)
                {True}  
                /   \ 
            (1, -3) (1, 2)  
            {False}  {True} 
                    /    \
                (0, 0)  (0, 2)
                {True} {False}    
    2) Dynamic programming
        See above solution.
*/
