/*

Given two strings A and B, return whether or not A can be shifted some number of times to get B.

For example, if A is abcde and B is cdeab, return true. If A is abc and B is acb, return false.

 */


const canShift = (a: string, b: string): boolean => (
    // check if all the letters in a and b are the same and a and b have the same length - using charCode
    ([...a].reduce((acc, cur) => acc + cur.charCodeAt(0), 0)
        === [...b].reduce((acc, cur) => acc + cur.charCodeAt(0), 0)) &&
    // see b exists in a + a
    ((a + a).includes(b))
);

(() => { 
    console.log(canShift('abcde', 'cdeab'));
    console.log(canShift('abc', 'acb'));
})();

// Complexity analysis:
// Time complexity: O(n)
// Space complexity: O(1) - assuming the addition of the strings do not take extra space
