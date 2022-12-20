/*
Given a string s and an integer k, break up the string into 
multiple lines such that each line has a length of k or less. 
You must break it up so that words don't break across lines. 
Each line has to have the maximum possible amount of words. 
If there's no way to break the text up, then return null.

You can assume that there are no spaces at the ends of the string and 
that there is exactly one space between each word.

For example, given the string "the quick brown fox jumps over the lazy dog" and k = 10, 
you should return: ["the quick", "brown fox", "jumps over", "the lazy", "dog"]. 
No string in the list has a length of more than 10.
*/

const breakStringIntoKLines = (s, k) => {
    return breakString(s, k);

    function breakString (s, k) {
        const words = s.split(' ');
        const n = words.length;

        if (n === 0) return [];

        let current = [];
        const all = [];

        for (let i = 0; i < n; i++) {
            if (countLength([...current, words[i]]) <= k) {
                current.push(words[i]);
            } else if (countLength[words[i]] > k) {
                return null;
            } else {
                all.push(current);
                current = [words[i]];
            }
        }

        all.push(current);

        return all.map((line) => line.join(' '));
    }

    function countLength (wordsArr) {
        if (wordsArr.length === 0) return 0;

        // count the length of each word in the array and add 1 blank space1 between each word
        return (
            wordsArr.reduce((acc, word) => acc + word.length, 0) +
            (wordsArr.length - 1)
        );
    }
};

// driver code 
const myS = 'the quick brown fox jumps over the lazy dog';
const myK = 10;

console.log(breakStringIntoKLines(myS, myK));
