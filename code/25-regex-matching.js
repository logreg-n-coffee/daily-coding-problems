/*
Implement regular expression matching with the following special characters:

1. . (period) which matches any single character
2. * (asterisk) which matches zero or more of the preceding element
That is, implement a function that takes in a string and a valid regular expression 
and returns whether or not the string matches the regular expression.

For example, given the regular expression "ra." and the string "ray", 
your function should return true. 
The same regular expression on the string "raymond" should return false.

Given the regular expression ".*at" and the string "chat", 
your function should return true. 
The same regular expression on the string "chats" should return false.

LeetCode Question 10:
Given an input string s and a pattern p, implement regular expression matching with support 
for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

*/

/*
Intuition:
If there were no Kleene stars (the * wildcard character for regular expressions), 
the problem would be easier - 
we simply check from left to right if each character of the text matches the pattern.

When a star is present, 
we may need to check many different suffixes of the text and see if they match the rest of the pattern. 
A recursive solution is a straightforward way to represent this relationship. 
*/

// Solution 1: Using Recursion 
/**
 * Find whether string s matches the regular expression pattern using Recursion
 * @param {String} s string to match
 * @param {String} p pattern to match
 * @return {Boolean} whether or not the string matches the pattern
 */
function isMatchRec(s, p) {
    // if pattern is empty, check if string is empty - if not return true
    if (p.length === 0) return Boolean(s.length);

    // dot: consider the first character of the string and pattern - boolean
    const firstMatch =
        !s.length && (p.charAt(0) === s.charAt(0) || p.charAt(0) === '.');

    // kleene: consider the kleen star - it appears in the second charater of the pattern: p[1]
    if (p.length >=  2 && p.charAt(1) === '*') {
        return (
            isMatchRec(s, p.substring(2)) ||
            (firstMatch && isMatchRec(s.substring(1), p.substring(1)))
        );
    } else {
        return firstMatch && isMatchRec(s.substring(1), p.substring(1));
    }
}

// time and space complexity: O((T + P) * 2 ** (T + P/2)) - T is s.length, P is p.length

// driver code: 
s1 = 'aa';
p1 = 'a';  // false

s2 = 'aa';
p2 = 'a*';  // true

s3 = 'ab';
p3 = '.*';  // true

console.log(isMatchRec(s1, p1));
console.log(isMatchRec(s2, p2));
console.log(isMatchRec(s3, p3));

// Solution 2: Dynamic Programming - bottom up approach
/**
 * Find whether string s matches the regular expression pattern using Dynamic Programming
 * @param {String} s string to match
 * @param {String} p pattern to match
 * @return {Boolean} whether or not the string matches the pattern
 */
function isMatch(s, p) {
    const dp = Array(s.length + 1)
        .fill(false)
        .map(() => Array(p.length + 1).fill(false));
    dp[s.length][p.length] = true;

    for (let i = s.length; i >= 0; i--) {
        for (let j = p.length - 1; j >= 0; j--) {
            const firstMatch =
                i < s.length &&
                (p.charAt(j) == s.charAt(i) || p.charAt(j) == '.');
            if (j + 1 < p.length && p.charAt(j + 1) == '*') {
                dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
            } else {
                dp[i][j] = firstMatch && dp[i + 1][j + 1];
            }
        }
    }
    return dp[0][0];
}

console.log(isMatch(s1, p1));
console.log(isMatch(s2, p2));
console.log(isMatch(s3, p3));

// Time/Space complexity: O(T * P) 

// Solution 3: https://www.youtube.com/watch?v=l3hda49XcDE&list=PLrmLmBdmIlpuE5GEMDXWf0PWbBD9Ga1lO