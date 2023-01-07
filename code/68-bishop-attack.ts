/*
On our special chessboard, two bishops attack each other if they share the same diagonal. 
This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.

You are given N bishops, represented as (row, column) tuples on a M by M chessboard. 
Write a function to count the number of pairs of bishops that attack each other. 
The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).

For example, given M = 5 and the list of bishops:

(0, 0)
(1, 2)
(2, 2)
(4, 0)

The board would look like this:

[b 0 0 0 0]
[0 0 b 0 0]
[0 0 b 0 0]
[0 0 0 0 0]
[b 0 0 0 0]
You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.
*/

// METHOD 1: iterate each bishop and count the number of pairs of bishops that attack each other.

/**
 * count the number of pairs of bishops that attack each other with O(n ^ 2) time complexity
 * @param bishops pair of bishops
 * @returns count of pairs of bishops that attack each other
 */
const countBishopPairs = (bishops: Array<Array<number>>) => {
    return pairs(bishops);

    function isAttacking(bishopA: Array<number>, bishopB: Array<number>) {
        const [rowA, colA] = bishopA;
        const [rowB, colB] = bishopB;

        return Number(Math.abs(rowA - rowB) === Math.abs(colA - colB));
    }

    function pairs(bishops: Array<Array<number>>) {
        const len = bishops.length;
        let count = 0;
        
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                count += isAttacking(bishops[i], bishops[j]);
            }
        }

        return count;
    }
};


// METHOD 2: go through each bishop and group them into each separate diagonal,
// we can just run (b choose 2) on the number of bishops on each diagonal and sum them up

/**
 * count the number of pairs of bishops that attack each other with O(n) time complexity
 * @param bishops pair of bishops
 * @param m size of the chessboard
 * @returns count of pairs of bishops that attack each other
 */
const countBishopAttack = (bishops: Array<Array<number>>, m: number) => { 
    const TopLeftToBottomRight = 0;
    const TopRightToBottomLeft = 1;

    const numChooseTwo = (num: number) => num * (num - 1) / 2;

    return pairs(bishops, m);

    function pairs(bishops: Array<Array<number>>, m: number) {
        const counts = new Map();
        let sum = 0;

        for (const [r, c] of bishops) {
            const [topLeftRow, topLeftCol] = [r - Math.min(r, c), c - Math.min(r, c)];
            const [topRightRow, topRightCol] = [r - Math.min(r, m - c), c + Math.min(r, m - c)];

            // convert the array into string as in JS/TS, a = [0, 0, 0], b = [0, 0, 0], a is not equal to b
            const topLeft = [topLeftRow, topLeftCol, TopLeftToBottomRight].join(); 
            const topRight = [topRightRow, topRightCol, TopRightToBottomLeft].join();

            // 
            counts.set(topLeft, (counts.get(topLeft) ? counts.get(topLeft) : 0) + 1);
            counts.set(topRight, (counts.get(topRight) ? counts.get(topRight) : 0) + 1);

        }
        counts.forEach((c) => sum += numChooseTwo(c));
        return sum;
    }
};

// driver code
const myBishops = [
    [0, 0],
    [1, 2],
    [2, 2],
    [4, 0],
];

const myM = 5;

console.log('N ** 2 method:', countBishopPairs(myBishops));

console.log('N method: ', countBishopAttack(myBishops, myM));