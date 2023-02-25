/* 
    Write a function that rotates a list by k elements. 
    For example, [1, 2, 3, 4, 5, 6] rotated by two becomes [3, 4, 5, 6, 1, 2]. 
    Try solving this without creating a copy of the list. How many swap or move operations do you need?
 */

/*
    Solution:

    We can view this problem as transforming the list into lst[k:] + lst[:k]. 
    By reversing these subarrays and then reversing the whole array we can effectively rotate the array in linear time and without copying.

    Take our example, [1, 2, 3, 4, 5, 6] and k = 2.

    First reverse from 0 to k - 1: [2, 1, 3, 4, 5, 6]
    Then reverse from k to len - 1: [2, 1, 6, 5, 4, 3]
    Then reverse from 0 to len - 1 : [3, 4, 5, 6, 1, 2]
 */

(() => {
    /**
     * a function that rotates a list by k elements. 
     * @param arr 
     * @param k 
     * @returns rotated array
     */
    const rotate = (arr: number[], k: number) => { 
        reverse(arr, 0, k - 1);
        reverse(arr, k, arr.length - 1);
        reverse(arr, 0, arr.length - 1);

        return arr;

        function reverse(arr: number[], i: number, j: number): void { 
            while (i < j) { 
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j--;
            }
        }
    };

    // Time complexity: O(n) - Space complexity: O(1)
    console.log(rotate([1, 2, 3, 4, 5, 6], 2));
})();