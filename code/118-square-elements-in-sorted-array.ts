/*
Given a sorted list of integers, square the elements and give the output in sorted order.

For example, given [-9, -2, 0, 2, 3], return [0, 4, 4, 9, 81].
 */

const squareElements = (nums: number[]): number[] => { 
    const n = nums.length;
    const squares = Array(n).fill(0);

    // left and right pointers
    let left = 0;
    let right = n - 1;

    for (let i = n - 1; i >= 0; i--) {   // equivalent in python: for i in range(n-1, -1, -1):
        if (Math.abs(nums[left]) > nums[right]) {
            squares[i] = nums[left] ** 2;
            left++;
        } else {
            squares[i] = nums[right] ** 2;
            right--;
        }
    }

    return squares;
};

(() => { 
    const inputList = [-9, -2, 0, 2, 3];
    const outputList = squareElements(inputList);
    console.log(outputList);
})();