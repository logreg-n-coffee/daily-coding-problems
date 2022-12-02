/*
You have an N by N board. 

Write a function that, given N, 
returns the number of possible arrangements of the board where N queens can be placed on the board without threatening each other, 
i.e. no two queens share the same row, column, or diagonal.
*/

/*
- Intuition: 
1. Brute force: expensive to solve the problem with brute force. e.g. 8 by 8 board = 64 spots to place 8 queens -> 64 choose 8 C(64, 8) => O(n!)
2. Optimization: place the queens one by one, and when all possibilities are exhausted, backtrack by removing a queen and placing it elsewhere.
3. Given a board state, and a possible placement for a queen, we need a smart way to determine whether or not that placement will put the queen under attack. 
A queen can be attacked if another queen is on the same row, column, diagonal, or anti-diagonal.

- Solution:
Solve the question by backtracking the board
Recall that to implement backtracking, we implement a backtrack function that makes some changes to the state, calls itself again, 
and then when that call returns it undoes those changes (this last part is why it's called "backtracking").

- Each time our backtrack function is called, we can encode the state in the following manner:
1. To make sure that we only place 1 queen per row, we will pass an integer argument row into backtrack, 
and will only place one queen during each call. Whenever we place a queen, we'll move onto the next row by calling backtrack again with the parameter value row + 1.

2. To make sure we only place 1 queen per column, we will use a set. Whenever we place a queen, we can add the column index to this set.

3. Every time we place a queen, we should calculate the diagonal and the anti-diagonal value it belongs to. 
In the same way we use a set to keep track of which columns have been used, 
we should also have a set to keep track of which diagonals and anti-diagonals have been used. Then, we can add the values for this queen to the corresponding sets.

- Property:
Diagonal and antidiagonal properties: 
1. Diagonal: value at row - value at col is constant
2. Antidiagonal: value at row + value at col is constant

- Algorithm:


*/

let solutions = [];
let SIZE = -1;

const solveNQueens = (n) => {
    solutions = [];
    SIZE = n;

    // fill up the board with '.'
    const emptyBoard = Array(n).fill().map(() => Array(n).fill('.'));

    backtrack(0, new Set(), new Set(), new Set(), emptyBoard, n);

    return solutions;
};

/**
 * 
 * @param {Number} row 
 * @param {Set<Number>} diagonals 
 * @param {Set<Number>} antidiagonals 
 * @param {Set<Number>} cols 
 * @param {String[][]} boardState 
 * @param {Number} n 
 * @returns 
 */
function backtrack(row, diagonals, antidiagonals, cols, boardState) {
    // base case - n queens are placed
    if (row === SIZE) {
        solutions.push(createBoard(boardState));
        return;
    }

    for (let col = 0; col < SIZE; col++) {
        // calculate the current diagonals and antidiagonals' indices
        let currDiagonal = row - col;
        let currAntidiagonal = row + col;

        // if we can't place the queen
        if (
            cols.has(col) ||
            diagonals.has(currDiagonal) ||
            antidiagonals.has(currAntidiagonal)
        ) {
            continue;
        }

        // temp add the queen to the board
        cols.add(col);
        diagonals.add(currDiagonal);
        antidiagonals.add(currAntidiagonal);
        boardState[row][col] = 'Q';

        // move on to the next row with the updated board state
        backtrack(row + 1, diagonals, antidiagonals, cols, boardState);

        // remove the queen from the board
        cols.delete(col);
        diagonals.delete(currDiagonal);
        antidiagonals.delete(currAntidiagonal);
        boardState[row][col] = '.';
    }
}

function createBoard(state) {
    const board = [];
    for (let row = 0; row < SIZE; row++) {
        const currentRow = state[row].join('');
        board.push(currentRow);
    }
    return board;
}

// driver code 
console.log(solveNQueens(1));
console.log(solveNQueens(4));

// Time complexity: O(n!), Space complexity: O(n^2)
// Leetcode: 11/27/2022 23:54	Accepted	138 ms	45 MB	javascript
