/*
Given an array of integers, write a function to determine 
whether the array could become non-decreasing by modifying at most 1 element.

For example, given the array [10, 5, 7], you should return true, 
since we can modify the 10 into a 1 to make the array non-decreasing.

Given the array [10, 5, 1], you should return false, 
since we can't modify any one element to get a non-decreasing array.
 */

/**
 * a function to determine whether the array could become non-decreasing by modifying at most 1 element
 * @param nums 
 * @returns whether the array could become non-decreasing by modifying at most 1 element
 */
const canBeNonDecreasing = (nums: number[]): boolean => { 
    const length = nums.length;

    // count each time an element goes down
    let count = 0;
    
    for (let i = 0; i < length - 1; i++) {
        if (nums[i] > nums[i + 1]) { 
            // if it has went down more than twice
            if (count > 0) {
                return false;
            } 
            // if count is one, and the element is one that cannot be erased 
            // by modifying only one endpoint of that downtick
            if (i - 1 >= 0 &&
                i + 1 < length - 1 &&
                nums[i] > nums[i + 2] &&
                nums[i - 1] > nums[i + 1]
            ) {
                return false;
            }
            count++;
        }
    }

    return true;
};

// driver code 
(() => { 
    console.log(canBeNonDecreasing([10, 5, 7]));
    console.log(canBeNonDecreasing([10, 5, 1]));
})();
