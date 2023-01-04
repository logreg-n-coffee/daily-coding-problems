/*
Suppose you have a multiplication table that is N by N. 
That is, a 2D array where the value at the i-th row and j-th column is 
(i + 1) * (j + 1) (if 0-indexed) or i * j (if 1-indexed).

Given integers N and X, write a function that 
returns the number of times X appears as a value in an N by N multiplication table.

For example, given N = 6 and X = 12, you should return 4, 
since the multiplication table looks like this:

| 1 | 2 | 3 | 4 | 5 | 6 |
| 2 | 4 | 6 | 8 | 10 | 12 |
| 3 | 6 | 9 | 12 | 15 | 18 |
| 4 | 8 | 12 | 16 | 20 | 24 |
| 5 | 10 | 15 | 20 | 25 | 30 |
| 6 | 12 | 18 | 24 | 30 | 36 |

And there are 4 12's in the table.
*/

// METHOD 1: Using Native JS/TS methods - O(N * N)
const findNumberOfX = (n: number, x: number) => {
    const multiplicationTable = createMultiplicationTable(n);

    return countXInTwoDTable(multiplicationTable, x);

    function createMultiplicationTable(n: number) {
        return Array(n)
            .fill(null)
            .map((_, i) => Array(n).fill(null).map((_, j) => (j + 1) * (i + 1)));
    }

    function countXInTwoDTable(table: Array<Array<number>>, x: number) {
        return table.flat().filter(v => v === x).length;
    }
};

// driver code 
console.log(findNumberOfX(6, 1));
console.log(findNumberOfX(6, 2));
console.log(findNumberOfX(6, 6));
console.log(findNumberOfX(6, 12));


// METHOD 2: Using counter - O(N * N)
const solveMultiTable = (n: number, x: number): number => {
    let count = 0;

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            if (i * j === x) count++;
        }
    }

    return count;
};

console.log(solveMultiTable(6, 1));
console.log(solveMultiTable(6, 2));
console.log(solveMultiTable(6, 6));
console.log(solveMultiTable(6, 12));

// METHOD 3: Using math observation - O(n)
const findMultitable = (n: number, x: number): number => { 
    let count = 0;

    for (let i = 1; i < n + 1; i++) {
        // a particular row will match X if: 
        // It is a factor of X and its corresponding factor is less than N (so it's still in the matrix).
        if (x % i === 0 && x / i <= n) {
            count++;
        }
    }
    
    return count;
};

console.log(findMultitable(6, 1));
console.log(findMultitable(6, 2));
console.log(findMultitable(6, 6));
console.log(findMultitable(6, 12));