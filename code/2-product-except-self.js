/**
 * Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i
 * input [1, 2, 3, 4, 5] - output [120, 60, 40, 30, 24]
 * input [3, 2, 1] - output [2, 3, 6]
 */


// solution 1: with division; no zero values
const productExceptSelfDivision = (nums) => {
  const result = [];
  const product = nums.reduce((prev, curr) => prev * curr, 1);
  nums.forEach((num) => {
    result.push(product / num);
  });
  return result;
};

console.log(
  'productExceptSelfDivision',
  productExceptSelfDivision([1, 2, 3, 4, 5])
);

// solution 2: splitting the array into left and right arrays - Time: O(n) / Space: O(n)
const productExceptSelfSplitting = (nums) => {
  const length = nums.length;
  const answer = [];
  const left = [];
  const right = [];

  left[0] = 1;
  for (let i = 1; i < length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  right[length - 1] = 1;
  for (let i = length - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < length; i++) {
    answer[i] = left[i] * right[i];
  }

  return answer;
};

console.log('productExceptSelfSplitting', productExceptSelfSplitting([1, 3, 5, 7, 8]));
