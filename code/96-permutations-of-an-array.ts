/*
Given a number in the form of a list of digits, return all possible permutations.

For example, given [1, 2, 3],
return [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]].
 */

const permute = (nums: number[]): number[][] => { 
    if (nums.length === 1) return Array(nums);

    const output = [];

    for (const arr of permute(nums.slice(1))) {  
        for (let i = 0; i < nums.length; i++) {
            output.push([...arr.slice(0, i), nums[0], ...arr.slice(i)]);
        }
    }
    // slice(n) returns the subarray starting at n (incl.) to the end
    // slice(a, b) returns the subarray starting at a (incl.) to b (excl.)

    return output;
};

(() => { 
    console.log(permute([1, 2, 3]));
    console.log(permute([9, 8, 7, 6]));
})();

// TC & SC: O(n!)