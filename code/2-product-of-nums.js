/**
 * Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i
 * input [1, 2, 3, 4, 5] - output [120, 60, 40, 30, 24]
 * input [3, 2, 1] - output [2, 3, 6]
 */

const productOfNums = nums => {
    const result = [];
    const product = nums.reduce((prev, curr) => prev * curr, 1);
    nums.forEach((num) => {
        result.push(product / num);
    });
    return result;
};

console.log(productOfNums([1, 2, 3, 4, 5]));
