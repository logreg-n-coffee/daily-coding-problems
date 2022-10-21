/**
 * Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
 * For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
 */

/**
 * Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
 * @param {Array} nums 
 * @param {number} k
 * @return {boolean} if two numbers from the list add up to k
 */
export const twoSum = (nums, k) => {
  const comp = [];
  for (let i = 0; i < nums.length; i++) {  // for loop 
    if (comp[nums[i]] >= 0) {
      return true;
    }
    comp[k - nums[i]] = i;
  }
  return false;
};

/**
 * Given a list of numbers and a number k, return the indices if any two numbers from the list add up to k.
 * @param {Array} nums 
 * @param {number} k
 * @return {Array|undefined} if two numbers from the list add up to k, return the indices of the two numbers from the list
 */
export const twoSumIndex = (nums, k) => {
  const comp = [];
  for (let i = 0; i < nums.length; i++) {
    if (comp[nums[i]] >= 0) {
      return [comp[nums[i]], i];
    }
    comp[k - nums[i]] = i;
  }
};

// test cases
console.log('Test cases')
console.log('two sum existence', twoSum([10, 15, 3, 7], 17));
console.log('two sum index', twoSumIndex([10, 15, 3, 7], 17));

console.log('two sum existence', twoSum([1, 2, 3, 4, 5], 10));
console.log('two sum index', twoSumIndex([1, 2, 3, 4, 5], 10));