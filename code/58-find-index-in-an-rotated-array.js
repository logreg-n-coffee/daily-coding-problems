/*
An sorted array of integers was rotated an unknown number of times.

Given such an array, find the index of the element in the array in faster than linear time. 
If the element doesn't exist in the array, return null.

For example, given the array [13, 18, 25, 2, 8, 10] and 
the element 8, return 4 (the index of 8 in the array).

You can assume all the integers in the array are unique.
*/
/**
 * Find the index of the element in an rotated array that was previously sorted in O(log n) time
 * @param {number[]} array 
 * @param {number} target 
 * @returns {number} index of the target element in the array
 */
const findIndex = (array, target) => {
    
    return search(array, target);

    function search(array, target) {
        // initialize the search scope
        let start = 0;
        let end = array.length - 1;

        while (start <= end) {
            // take an index in the middle mid as a pivot
            let mid = start + ((end - start) >> 1);

            // job is done when array[mid] is the target
            if (array[mid] === target) {
                return mid;
            } else if (array[mid] >= array[start]) {
                // pivot element is larger than or equal to the first element in the array
                // subarray from the first element to the pivot is non-rotated
                if (target >= array[start] && target < array[mid]) {
                    // if the target is located in the non-rotated array: go left
                    end = mid - 1;
                } else {
                    // if the target is outside of the non-rotated array: go right
                    start = mid + 1;
                }
            } else {
                // pivot element is smaller than or equal to the first element in the array
                // subarray from the pivot element to the last element is non-rotated
                if (target <= array[end] && target > array[mid]) {
                    // if the target is located in the non-rotated array: go right
                    start = mid + 1;
                } else {
                    // if the target is outside of the non-rotated array: go left
                    end = mid - 1;
                }
            }
        }

        // if nothing can be found
        return -1;
    }
};

// driver code
const myArr = [13, 18, 25, 2, 8, 10];
const myTargetOne = 18;
const myTargetTwo = 2;
const myTargetThree = 10;

console.log(myTargetOne, myTargetTwo, myTargetThree);
console.log(
    findIndex(myArr, myTargetOne),
    findIndex(myArr, myTargetTwo),
    findIndex(myArr, myTargetThree)
);

/*
leetcode 33.
Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) 
such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). 

For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, 
return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

intution:
if the array is already sorted, then we can perform binary search on the array and find the index at O(log n).
*/
