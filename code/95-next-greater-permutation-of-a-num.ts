/*
Given a number represented by a list of digits, 
find the next greater permutation of a number, in terms of lexicographic ordering. 
If there is not greater permutation possible, return the permutation with the lowest value/ordering.

For example, the list [1,2,3] should return [1,3,2]. 
The list [1,3,2] should return [2,1,3]. The list [3,2,1] should return [1,2,3].

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: 
[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is 
the next lexicographically greater permutation of its integer. 
More formally, if all the permutations of the array are sorted in one container 
according to their lexicographical order, then the next permutation of that array is 
the permutation that follows it in the sorted container. 
If such arrangement is not possible, the array must be rearranged as the lowest possible order 
(i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not 
have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.
 */

const nextPermutation = (nums: number[]): number[] => {
    let i = nums.length - 2;

    // start on the end of the array (right to left) 
    // ** find the first decreasing element (searched portion of array) **
    while (i >= 0 && nums[i + 1] <= nums[i]) {
        i--;
    }

    // pointer move from right to left in the searched portion of the array
    // ** find the number that is just greater than the number at nums[i] **
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) { 
            j--;
        }
        // after while loop is complete, we know nums[j] is just greater than nums[i]
        swap(nums, i, j);
    }

    // reverse the numbers following nums[i] to get the next smallest lexicographic permutation
    reverse(nums, i + 1);

    return nums;

    function reverse(nums: number[], start: number): void {
        let i = start;
        let j = nums.length - 1;

        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }

    function swap(nums: number[], i: number, j: number): void { 
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
};

// drive code
(() => { 
    console.log(nextPermutation([1, 2, 3])); 
    console.log(nextPermutation([3, 2, 1]));
    console.log(nextPermutation([1, 1, 5]));
    console.log(nextPermutation([9, 5, 4, 3, 1]));
    console.log(nextPermutation([1, 5, 8, 4, 7, 6, 5, 3, 1]));
})();

// complexity analysis: TC: O(n) - worst case: two scans; SC: O(1)
