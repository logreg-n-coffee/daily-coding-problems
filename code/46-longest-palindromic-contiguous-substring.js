/*
Given a string, find the longest palindromic contiguous substring. If there are more than one with the maximum length, return any one.

For example, the longest palindromic substring of "aabcdcb" is "bcdcb". The longest palindromic substring of "bananas" is "anana".
*/

// brute force: iterate over each substring of the array and check if it is a palindrome O(n^3)
const findLongestPalindromeBF = (s) => {
    return longestPalidrome(s);

    function isPalindrome(s) {
        return [...s].reverse().join('') === s;
    }

    function longestPalidrome(s) {
        const length = s.length;
        let longest = '';
        
        for (let i = 0; i < length; i++) {
            for (let j = 1; j < length + 1; j++) {
                const substring = s.slice(i, j);
                if (isPalindrome(substring) && substring.length > longest.length) {
                    longest = substring;
                }
            }
        }

        return longest;
    }
};

// dynamic programming: store any repeated computations - O(n^2)
const findLongestPalindrome = (s) => {
    const n = s.length;

    if (n === 0) {
        return '';
    }

    let longest = '';
    const dp = Array(n).fill().map(() => Array(n).fill(null));

    // set all substrings of length 1 to be true
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // try all substrings of length 2
    for (let i = 0; i < n - 1; i++) {
        dp[i][i + 1] = s[i] === s[i + 1];
    }

    let i = 0;
    let k = 3;
    while (k < n) {
        while (i < n - k + 1) {
            j = i + k - 1;
            dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j];
            // update longest whenever found 
            if (dp[i][j] && s.slice(i, j + 1).length > longest.length) {
                longest = s.slice(i, j + 1);
            }
            i++;
        }
        k++;
        i = 0;
    }

    return longest;
};

// driver code:
console.log(findLongestPalindromeBF('aabcdcb'));
console.log(findLongestPalindromeBF('bananas'));

console.log(findLongestPalindrome('aabcdcb'));
console.log(findLongestPalindrome('bananas'));

/*
rationale: 
1. keep a dp array of n by n, where n is the length of the input string
2. at each index dp[i][j] - keep whether or not the substring made from s.slice(i, j) is a palindrome using the following relationships

relationships:
1. all strings of length 1 are palindromes 
2. s is a palindrome if s[1:-1] is a palindrome and the first and last character of s are the same

implementation:
1. First, set each item along the diagonal `dp[i][i] to true, since strings of length 1 are always palindromes
2. Then, check dp[i][i+1] and set it to true if s[i] == s[i + 1] and false otherwise (check all strings of length 2)
3. Finally, iterate over the matrix from top to bottom, left to right, only examining the upper diagonal. 
Note that it doesn't make sense for j to be smaller than i, so that's why we only need to deal with half of the matrix. 
Set A[i][j] to true only if A[i + 1][j - 1] is true and s[i] == s[j].
Keep track of the longest palindromic substring we've seen so far.

example: 

    b	a	n	a	n	a	s
b	t	f	f	f	f	f	f
a		t	f	t	f	t	f
n			t	f	t	f	f
a				t	f	f	f
n					t	f	f
a						t	f
s							t

*/
