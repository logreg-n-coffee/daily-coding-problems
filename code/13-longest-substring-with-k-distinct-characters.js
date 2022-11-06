// Given an integer k and a string s, 
// find the length of the longest substring that contains at most k distinct characters.

// For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
// Video solution: https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/solution/

// Return 0 if the string is empty or k is equal to zero.
// Set both pointers to the beginning of the string left = 0 and right = 0 and initialize max substring length max_len = 1.
// While right pointer is less than N:
    // If the current character s[right] is already in the ordered dictionary hashmap -- delete it, to ensure that the first key in hashmap is the leftmost character.
    // Add the current character s[right] in the ordered dictionary and move right pointer to the right.
    // If ordered dictionary hashmap contains k + 1 distinct characters, remove the leftmost one and move the left pointer so that sliding window contains again k distinct characters only.
    // Update max_len.

const lengthOfLongestSubstringKDistinct = (s, k) => {
    const n = s.length;
    if (n * k === 0) {
        // if n or k is zero
        return 0;
    }

    let l = 0; // left pointer starts at index 0
    let r = 0; // right pointer starts at index 0

    let maxLen = 1;

    const bound = new Map();

    while (r < n) {
        bound.set(s.charAt(r), r++); // bound.set(s.charAt(r), r); r = r + 1;

        if (bound.size === k + 1) {
            let lowestIndex = Math.min(...bound.values());  // bound.values() gives iterables; so we use spreads
            bound.delete(s.charAt(lowestIndex));
            l = lowestIndex + 1;
        }

        maxLen = Math.max(maxLen, r - l);
    }

    return maxLen;
};

// Time: O(n) - Space: O(k)
console.log(lengthOfLongestSubstringKDistinct('eceba', 2));  // 3
console.log(lengthOfLongestSubstringKDistinct('aa', 1));  // 2
