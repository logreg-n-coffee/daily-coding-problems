// Time exceeded in LeetCode
const findLowestPositiveInteger = (nums) => {
    const length = nums.length;
    let l = 0;
    let r = length - 1;
    let res = 1;
    // if 1 is not in the array return 1
    if (nums.indexOf(res) === -1) {
        return res;
    }
    // replace - data cleanup
    for (let i = 0; i < length; i++)
      if (nums[i] <= 0 || nums[i] > length) nums[i] = 1;

    // find the smallest number in the nums array
    while (l < r) {
        if (nums[l] <= nums[r]) {
            if (nums[l] < res) {
                res = nums[l];
            }
            l++;
        } else {
            if (nums[r] < res) {
                res = nums[r];
            }
            r--;
        }
    }
    // test if the target number already exist - also make sure it is positive
    if (res <= 0) {
        res = 1;
    }
    while (res > 0) {
        if (nums.indexOf(res) > -1) {
            res++;
        } else {
            return res;
        }
    }
};
