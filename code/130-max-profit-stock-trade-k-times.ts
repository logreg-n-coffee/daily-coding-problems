/*
    Given an array of numbers representing the stock prices of a company in chronological order and an integer k, 
    return the maximum profit you can make from k buys and sells. 
    You must buy the stock before you can sell it, 
    and you must sell the stock before you can buy it again.

    For example, given k = 2 and the array [5, 2, 4, 0, 1], you should return 3.
 */

(() => { 
    function maxProfit(prices: number[], k: number): number {
        const n: number = prices.length;

        // dp[i][j] represent the maximum profit using at most i transactions up to day j (inclusive).
        const dp: number[][] = Array(k + 1)
            .fill(0)
            .map(() => Array(n).fill(0));

        // base cases:
        // for (let i = 0; i <= k; i++) {
        //     dp[i][0] = 0;  // If no prices then no way to profit
        // }

        // for (let j = 0; j < n; j++) {
        //     dp[0][j] = 0;  // If k = 0 then no way to profit
        // }

        for (let i = 1; i < k + 1; i++) {
            let bestSoFar: number = -Infinity;
            for (let j = 1; j < n; j++) {
                bestSoFar = Math.max(bestSoFar, dp[i - 1][j - 1] - prices[j - 1]);
                dp[i][j] = Math.max(dp[i][j - 1], prices[j] + bestSoFar);
            }
        }

        return dp[k][n - 1];
}

    console.log(maxProfit([5, 2, 4, 0, 1], 3));
})();