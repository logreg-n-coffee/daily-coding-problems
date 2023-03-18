/*
Given an array of numbers and an index i, return the index of the nearest larger number of the number at index i, 
where distance is measured in array indices.

For example, given [4, 1, 3, 5, 6] and index 0, you should return 3.

If two distances to larger numbers are the equal, then return any one of them. 
If the array at i doesn't have a nearest larger integer, then return null.

Follow-up: If you can preprocess the array, can you do this in constant time?
 */

// brute force - O(n) time | O(1) space
(() => { 
    const nearestLargerInteger = (arr: number[], i: number) => { 
        for (let j = 1; j < arr.length; j++) {
            const low = i - j;  // low index
            const high = i + j;  // high index
            if (low >= 0 && arr[low] > arr[i]) return low;
            if (high < arr.length && arr[high] > arr[i]) return high;
        }
    };

    console.log(nearestLargerInteger([4, 1, 3, 5, 6], 0));
})();

// pre-process - O(n) time - after pre-processing O(1) time | O(n) space
(() => { 
    const nearestLargerInteger = (arr: number[], i: number) => { 
        const [leftNearestLarger, rightNearestLarger] = preprocess(arr);

        const leftIndex = leftNearestLarger[i];
        const rightIndex = rightNearestLarger[i];

        if (leftIndex === -1 && rightIndex === -1) return null;
        if (leftIndex === -1) return rightIndex;
        if (rightIndex === -1) return leftIndex;

        // return the nearest largest number
        if (i - leftIndex < rightIndex - 1) return leftIndex;

        return rightIndex;

        function preprocess(arr: number[]): number[][] {
            let stack: number[];

            // create an array to store nearest larger number to the left of each element
            const leftNearestLarger: number[] = Array(arr.length).fill(-1);
            stack = [];
            for (let i = 0; i < arr.length; i++) { 
                while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
                    stack.pop();
                }

                if (stack.length > 0) {
                    leftNearestLarger[i] = stack[stack.length - 1];
                }

                stack.push(i);
            }

            // create an array to store nearest larger number to the right of each element
            const rightNearestLarger: number[] = Array(arr.length).fill(-1);
            stack = [];
            for (let i = arr.length - 1; i >= 0; i--) { 
                while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
                    stack.pop();
                }

                if (stack.length > 0) {
                    rightNearestLarger[i] = stack[stack.length - 1];
                }

                stack.push(i);
            }

            // return two result arrays
            return [leftNearestLarger, rightNearestLarger];
        }
    };

    console.log(nearestLargerInteger([4, 1, 3, 5, 6], 0));
})();