/*
There is an N by M matrix of zeroes. 
Given N and M, write a function to count the number of ways of starting at the top-left corner and 
getting to the bottom-right corner. You can only move right or down.

For example, given a 2 by 2 matrix, you should return 2, 
since there are two ways to get to the bottom-right:
Right, then down
Down, then right

Given a 5 by 5 matrix, there are 70 ways to get to the bottom-right.
*/

/**
 * find the number of ways of starting at the top-left corner and getting to the bottom-right corner with BF
 * @param {number} n 
 * @param {number} m 
 * @returns the number of ways of starting at the top-left corner and getting to the bottom-right corner
 */
const findRoutesBF = (n, m) => {
    if (n === 1 || m === 1) {
        return 1;
    }

    return findRoutesBF(n - 1, m) + findRoutesBF(n, m - 1);
};

/**
 * find the number of ways of starting at the top-left corner and getting to the bottom-right corner with DP
 * @param {number} n 
 * @param {number} m 
 * @returns the number of ways of starting at the top-left corner and getting to the bottom-right corner
 */
const findRoutesDP = (n, m) => {
    // initiate a dp array
    const dp = Array(n).fill().map(() => Array(m).fill(0));  // dp[n][m]
    
    // fill first column - first element in a row with 1s
    for (let i = 0; i < n; i++) {
        dp[i][0] = 1;
    }

    for (let j = 0; j < m; j++) {
        dp[0][j] = 1;
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[n - 1][m - 1];
    
};

const n = 5, m = 5;

console.log(findRoutesDP(n, m));