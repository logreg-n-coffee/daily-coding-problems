/*
We can determine how "out of order" an array A is by counting the number of inversions it has. 
Two elements A[i] and A[j] form an inversion if A[i] > A[j] but i < j. 
That is, a smaller element appears after a larger element.

Given an array, count the number of inversions it has. 
Do this faster than O(N^2) time.

You may assume each element in the array is distinct.

For example, a sorted list has zero inversions. 
The array [2, 4, 1, 3, 5] has three inversions: (2, 1), (4, 1), and (4, 3). 

The array [5, 4, 3, 2, 1] has ten inversions: every distinct pair forms an inversion. (in this case, C(5, 2) = 10)
*/

// brute force solution - O(n^2)
const countInversionsBruteForce = (array) => {
    const n = array.length;
    let count = 0;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (array[i] > array[j]) {
                count++;
            }
        }
    }
};

// TC: O(n)
const countInversions = (array) => {
    const count = helper(array);

    return count;

    function helper(array) {
        if (array.length <= 1) {
            return [0, array];
        }

        const mid = Math.floor(array.length / 2);

        const a = array.slice(0, mid); // beginning (inclusive) to mid (exclusive)
        const b = array.slice(mid); // mid (inclusive) to end

        const [leftCount, leftSortedArr] = helper(a);
        const [rightCount, rightSortedArr] = helper(b);
        const [betweenCount, sortedArr] = mergeAndSort(leftSortedArr, rightSortedArr);

        return [leftCount + rightCount + betweenCount, sortedArr];
    }

    function mergeAndSort(a, b) {
        let count = 0;
        let sortedArr = [];
        let i = 0;
        let j = 0;
        while (i < a.length && j < b.length) {
            if (a[i] < b[j]) {
                sortedArr.push(a[i]);
                i++;
            } else if (a[i] > b[j]) {
                sortedArr.push(b[j]);
                count += a.length - i;
                j++;
            }
        }

        sortedArr = [...sortedArr, ...a.slice(i)];
        sortedArr = [...sortedArr, ...b.slice(j)];

        return [count, sortedArr];
    }

};

// Driver code:
const myArray = [5, 4, 3, 2, 1];
const [result, sortedArray] = countInversions(myArray)
console.log('There are', result, 'inversions and the sorted array is:', sortedArray);
