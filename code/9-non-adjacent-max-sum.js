// house robber in leetcode

function findMaxSum(arr) {
    const n = arr.length;
    console.log(n);

    // dp array - a 2D dp[N][2] array
    // dp[i][0] stores maximum subsequence sum till ith index with arr[i] excluded and
    // dp[i][1] stores the sum when arr[i] is included.
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(2);
    }

    // if there is only one element in the array
    if (n === 1) {
        return arr[0];
    }

    // initialize the values in the array
    dp[0][0] = 0;
    dp[0][1] = arr[0];

    // loop through array to find the maximum possible sum
    for (let i = 1; i < n; i++) {
        dp[i][1] = dp[i - 1][0] + arr[i];
        dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0]);
    }

    // return the maximum possible sum
    return Math.max(dp[n - 1][0], dp[n - 1][1]);
}

let arr = [5, 5, 10, 100, 10, 5];
let n = arr.length;

console.log(findMaxSum(arr));
