/**
 * First missing positive - find the lowest positive integer that does not exist in the array
 * note: 1 is the lowest positive integer and 0 is neither positive nor negative
 * @param {Array} nums
 * @returns {number} the lowest positive integer that does not exist in the array
 */
const firstMissingPositive = (nums) => {
  // rationale: 1. the first missing positive integer can only be 1, 2, 3, or n + 1,
  // 2. use the index in nums as the hash key and sign pf the element as a hash value
  // 3. use the index 0 to save information about presence of number of number n, as index n does not exist (n-1 is the limit)
  let n = nums.length;

  // Base case.
  // Check if 1 is in the array. If yes, then return 1 and the program ends
  let contains = 0;
  for (let i = 0; i < n; i++)
    if (nums[i] == 1) {
      contains++;
      break;
    }

  if (contains === 0) return 1;

  // Since 1 does not exist, replace negative numbers, zeros,
  // and numbers larger than n by 1s.
  // After this convertion nums will contain only positive numbers.
  for (let i = 0; i < n; i++) if (nums[i] <= 0 || nums[i] > n) nums[i] = 1;

  // Use index as a hash key and number sign as a presence detector.
  // For example, if nums[1] is negative that means that number `1`
  // is present in the array.
  // If nums[2] is positive - number 2 is missing.
  for (let i = 0; i < n; i++) {
    let a = Math.abs(nums[i]);
    // If you meet number a in the array - change the sign of a-th element.
    // Be careful with duplicates : do it only once.
    if (a === n) nums[0] = -Math.abs(nums[0]);
    else nums[a] = -Math.abs(nums[a]);
  }

  // Now the index of the first positive number
  // is equal to first missing positive.
  for (let i = 1; i < n; i++) {
    if (nums[i] > 0) return i;
  }

  // use the index 0 to save information about presence of number of number n, as index n does not exist (n-1 is the limit)
  if (nums[0] > 0) return n;

  return n + 1;
};

console.log(firstMissingPositive([3, 4, -1, 1]));
console.log(firstMissingPositive([1, 2, 0]));
console.log(firstMissingPositive([7, 8, 9, 11, 12]));