/* 
 Given a string which we can delete at most k, return whether you can make a palindrome.
 For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.
 */


(() => { 
    // solve the problem with recursion - O(2^(min(n, k))) - n is the length of the original string
    const kPalindrome = (s: string, k: number): boolean => { 
        // if s is already a palindrome, return true
        if (s.length <= 1) return true;

        // get rid of the matching pair (head and tail)
        while (s[0] === s[s.length - 1]) {
            s = s.slice(1, s.length - 1);
            if (s.length <= 1) return true;
        }

        if (k === 0) return false;

        // Try getting rid of the first or last character to see if we
        // can make a palindrome by removing k - 1 chars.
        return kPalindrome(s.slice(1), k - 1) || kPalindrome(s.slice(0, s.length - 1), k - 1);
    };

    // If the string is already a palindrome, then we can just return true.
    // If the string is not already a palindrome, then try getting rid of the first or last character
    // that does not contribute to its palindromicity.
    
    console.log(kPalindrome('waterrfetawx', 2));
})();

(() => { 
    // solve the problem with dp - O(n ^ 2) time and space
    const kPalindrome = (s: string, k: number): boolean => { 
        return s.length - findLongestPalindromeLen(s) <= k;

        function findLongestPalindromeLen(s: string): number {
            if (s === s.split('').reverse().join('')) {
                return s.length;
            }

            const n = s.length;
            const dp: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

            for (let i = n - 1; i >= 0; i--) { 
                dp[i][i] = 1;
                
                for (let j = i + 1; j < n; j++) { 
                    if (s[i] === s[j]) {
                        dp[i][j] = 2 + dp[i + 1][j - 1];
                    } else {
                        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                    }
                }
            }

            return dp[0][n - 1];
        }
    };

    console.log(kPalindrome('waterrfetawx', 2));
})();