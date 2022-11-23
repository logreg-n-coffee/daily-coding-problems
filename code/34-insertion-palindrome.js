/*
Minimum insertions to form a palindrome - LeetCode: 1312
https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/

Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

Example 1:

Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.
Example 2:

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
Example 3:

Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".

1 <= s.length <= 500
s consists of lowercase English letters.
*/

/*
1. Intuition
Split the string s into to two parts,
and we try to make them symmetrical by adding letters.

The more common symmetrical subsequence they have,
the less letters we need to add.

Now we change the problem to find the length of **longest common sequence**.
This is a typical dynamic problem.

2. Explanation
- Step 1.
Initialize dp[n+1][n+1],
where dp[i][j] means the length of longest common sequence between
i first letters in s1 and j first letters in s2.

- Step 2.
Find the the longest common sequence between s1 and s2,
where s1 = s and s2 = reversed(s)

- Step 3.
return n - dp[n][n]

3. Complexity
Time O(N^2)
Space O(N^2)
*/


/**
 * @param {string} s
 * @return {number}
 */
const minInsertions = (s) => {
    const n = s.length;
    // fill up the dp array - both of the following methods work
    // const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
    const dp = Array(n + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            dp[i + 1][j + 1] =
                s.charAt(i) == s.charAt(n - 1 - j)
                    ? dp[i][j] + 1
                    : Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
    }

    return n - dp[n][n];
};


// Test code: 
const s1 = 'zzazz';
const s2 = 'mbadm';
const s3 = 'leetcode';

console.log('s1: ', minInsertions(s1));
console.log('s2: ', minInsertions(s2));
console.log('s3: ', minInsertions(s3));

// Leetcode: 11/23/2022 12:11	Accepted	141 ms	49.3 MB	javascript
