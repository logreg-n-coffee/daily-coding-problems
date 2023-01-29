/*

Given a list of integers and a number K, 
return which contiguous (sharing a common border) elements of the list sum to K.

For example, if the list is [1, 2, 3, 4, 5] and K is 9, 
then it should return [2, 3, 4], since 2 + 3 + 4 = 9.

 */

// solve this problem with two-pointer approach - TC: O(n), SC: O(1)
const findContiguousElementsSumToK = (lst: number[], k: number): number[] | null => { 
    let left = 0;
    let right = 0;
    let currentSum = lst[0];

    while (right < lst.length) {
        if (currentSum === k) {
            return lst.slice(left, right + 1);
        } else if (currentSum < k) {
            right++;
            if (right < lst.length) {
                currentSum += lst[right];
            }
        } else {
            currentSum -= lst[left];
            left++;
        }
    }

    return null;
};

/* limitation:
if there are negative values in the input, this technique will not work. When there are negative values, 
it's no longer obvious how to move the index pointers. 

One path may be to increase the range to compensate, another path may be to omit the negative element. 
With the logic branching, a linear solution can no longer work.
 */

(() => { 
    console.log(
        findContiguousElementsSumToK(
            [1, 2, 3, 4, 5], 3)
    );

    console.log(
        findContiguousElementsSumToK(
            [2, 3, 5, 8, 13], 8)
    );
})();