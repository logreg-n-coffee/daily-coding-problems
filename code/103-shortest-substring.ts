/*
Given a string and a set of characters, 
return the shortest substring containing all the characters in the set.

For example, given the string "figehaeci" and the set of characters {a, e, i}, 
you should return "aeci".

If there is no substring containing all the characters in the set, return null.
 */

/*
Solution:
    1. Initialize two pointers, start and end, and a hashmap to store the count of characters in the set.
    2. Move end pointer until all characters in the set are in the hashmap and their count is greater than 0.
    3. When all characters are in the hashmap, 
        move start pointer to find the shortest substring and decrement the count of characters in the hashmap.
    4. Repeat steps 2 and 3 until end pointer reaches the end of the string.
    5. If the final substring is not found, return null.
 */

const shortestSubstring = (s: string, chars: Set<string>): string | null => { 
    // initialize two pointers, start and end - used to traverse through the string to find the substring
    let start = 0;
    let end = 0;

    // initialize a hashmap to store character and count
    const charCount: { [char: string]: number } = {};

    // populate the hashmap with characters in the set
    for (const char of chars) {
        charCount[char] = 0;
    }

    let minLen = s.length + 1;
    let minStart = 0;

    while (end < s.length) {
        if (chars.has(s[end])) {
            charCount[s[end]] += 1;
        }

        // check if all the characters in the set are present in the current substring
        while (Object.values(charCount).every(count => count > 0)) {
            if (end - start + 1 < minLen) {
                minLen = end - start + 1;
                minStart = start;
            }
            if (chars.has(s[start])) {
                charCount[s[start]] -= 1;
            }
            start++;
        }
        end++;
    }

    if (minLen > s.length) {
        return null;
    }

    return s.slice(minStart, minStart + minLen);
};

(() => { 
    console.log(shortestSubstring('figehaeci', new Set(['a', 'e', 'i'])));
})();