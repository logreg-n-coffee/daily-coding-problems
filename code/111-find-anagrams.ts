/*
Given a word W and a string S, find all starting indices in S which are anagrams of W.

For example, given that W is "ab", and S is "abxaba", return 0, 3, and 4.
 */

const findAnagrams = (w: string, s: string): number[] => { 
    // Result array to store starting indices of anagrams
    const result: number[] = [];

    // Edge cases: return empty array if either W or S is empty, 
    // or if the length of S is less than the length of W
    if (!w || !s || w.length > s.length) {
        return result;
    }

    // Initialize two arrays to keep track of character frequencies
    const wCount = Array(26).fill(0);
    const sCount = Array(26).fill(0);

    // Fill wCount with the frequencies of characters in W
    for (let i = 0; i < w.length; i++) { 
        wCount[w.charCodeAt(i) - 97]++;
        sCount[s.charCodeAt(i) - 97]++;
    }

    // Use a sliding window approach to check for anagrams
    for (let i = 0; i < s.length - w.length; i++) { 
        // If the frequency arrays match, we have found an anagram
        if (wCount.toString() === sCount.toString()) { 
            result.push(i);
        }
        // Decrement the frequency of the character that is about to leave the window
        sCount[s.charCodeAt(i) - 97]--;
        // Increment the frequency of the character that is about to enter the window
        sCount[s.charCodeAt(i + w.length) - 97]++;
    }

    // Check for anagrams one last time after the loop has finished
    if (wCount.toString() === sCount.toString()) {
        result.push(s.length - w.length);
    }

    return result;
};

// complexity: time complexity - O(n), where n is the length of string s; space complexity - O(1) - arrays are constant 
(() => { n
    console.log(findAnagrams('ab', 'abxaba'));
})();

/*
rationale:
Use a sliding window technique and check if the characters in the current window match the characters in the word W. 
If the characters match, we can increment a counter. If the counter equals the length of W, 
we have found an anagram and can add the starting index of the window to our result list. 
Then, we can slide the window to the right by one position and repeat the process until the end of the string S is reached.
 */