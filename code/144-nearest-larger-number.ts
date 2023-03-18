/*
Given an array of numbers and an index i, return the index of the nearest larger number of the number at index i, 
where distance is measured in array indices.

For example, given [4, 1, 3, 5, 6] and index 0, you should return 3.

If two distances to larger numbers are the equal, then return any one of them. 
If the array at i doesn't have a nearest larger integer, then return null.

Follow-up: If you can preprocess the array, can you do this in constant time?
 */

// brute force
(() => { 
    const nearestLargeInteger = (arr: number[], i: number) => { 
        for (let j = 1; j < arr.length; j++) {
            const low = i - j;  // low index
            const high = i + j;  // high index
            if (low >= 0 && arr[low] > arr[i]) return low;
            if (high < arr.length && arr[high] > arr[i]) return high;
        }
    };

    console.log(nearestLargeInteger([4, 1, 3, 5, 6], 0));
})();