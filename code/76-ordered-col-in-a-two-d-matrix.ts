/*
You are given an N by M 2D matrix of lowercase letters.
Determine the minimum number of columns that can be removed to 
ensure that each row is ordered from top to bottom lexicographically. 

That is, the letter at each column is lexicographically later as you go down each row. 
It does not matter whether each row itself is ordered lexicographically.

For example, given the following table:
cba
daf
ghi
This is not ordered because of the a in the center. We can remove the second column to make it ordered:

ca
df
gi
So your function should return 1, since we only needed to remove 1 column.


As another example, given the following table:
abcdef
Your function should return 0, since the rows are already ordered (there's only one row).

As another example, given the following table:

zyx
wvu
tsr
Your function should return 3, since we would need to remove all the columns to order it.
 */

const getNumberOfColumns = (matrix: string[][]): number => { 
    // build the transposed matrix
    const transposed: string[][] = matrix[0].map((_, i) => matrix.map(x => x[i]));

    // counter of the unsorted columns (rows in the new transposed matrix)
    let count = 0;

    // go through each row of the transposed matrix (that was the columns of original matrix)
    for (let i = 0; i < transposed.length; i++) {
        if (!isSorted(transposed[i])) {
            count++;
            console.log('this column is not sorted and should be removed.', transposed[i]);
        }
    }

    return count;
    
    /**
     * Check if the array of the letters are sorted lexicographically
     * @param array the columns in the matrix (before matrix transposition)
     * @returns if the columns (before matrix transposition) is sorted
     */
    function isSorted(array: string[]): boolean {
        for (let i = 1; i < array.length; i++) { 
            if (array[i - 1] > array[i]) {
                return false;
            }
        }
        return true;
    }
};

(() => { 
    const myMatrixOne = [
        ['c', 'b', 'a'],
        ['d', 'a', 'f'],
        ["g", "h", "i"],
    ];

    const myMatrixTwo = [
        ['c', 'a'],
        ['d', 'f'],
        ['g', 'i'],
    ];

    const myMatrixThree = [
        ['a', 'b', 'c', 'd', 'e', 'f']
    ];

    const myMatrixFour = [
        ['z', 'y', 'x'],
        ['w', 'v', 'u'],
        ['t', 's', 'r'],
    ];

    console.log(getNumberOfColumns(myMatrixOne));
    console.log(getNumberOfColumns(myMatrixTwo));
    console.log(getNumberOfColumns(myMatrixThree));
    console.log(getNumberOfColumns(myMatrixFour));
})();

// TC: O(M * N) - 1 M * N for matrix transposition and 1 M * N for checking if it sorted
// SC: O(M * N) - matrix transposition
