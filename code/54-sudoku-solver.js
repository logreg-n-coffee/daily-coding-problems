/*
Problem: Sudoku is a puzzle where you're given a partially-filled 9 by 9 grid with digits. 
The objective is to fill the grid with the constraint that every row, column, 
and box (3 by 3 subgrid) must contain all of the digits from 1 to 9.

Implement an efficient sudoku solver.

Wikipedia Definition: A standard Sudoku contains 81 cells, in a 9×9 grid, and has 9 boxes, 
each box being the intersection of the first, middle, or last 3 rows, and the first, middle, or last 3 columns. 
Each cell may contain a number from one to nine, and each number can only occur once in each row, column, and box.
*/

// place holder for null value
const X = null;

// solution using backtracking
const solveSudoku = (board) => {
    return sudoku(board);

    function sudoku(board) {
        if (isComplete(board)) return board;

        const [r, c] = findFirstEmpty(board);

        // try the numbers (1-9) on board[r][c] 
        for (let i = 0; i < 9; i++) {
            board[r][c] = i;
            // if the board is valid, continue solving
            if (isValidSoFar(board)) {
                const result = sudoku(board);
                if (isComplete(result)) return result;
            }
            board[r][c] = X;
        }

        return board;
    }

    function isComplete(board) {
        // check if the board has any null values (X) in the board
        return !board.flat().some(v => v === X);
    }

    function findFirstEmpty(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === X) {
                    return [i, j];
                }
            }
        }
        return false;
    }

    function isValidSoFar(board) {
        if (!isRowsValid(board)) return false;
        if (!isColsValid(board)) return false;
        if (!isBlockValid(board)) return false;
        return true;
    }

    function isRowsValid(board) {
        for (const row of board) {
            if (hasDuplicates(row)) return false;
        }
        return true;
    }

    function isColsValid(board) {
        // transpose the matrix/board so that we can use hasDuplicates
        const transposedBoard = board[0].map((_, i) => board.map((x) => x[i]));
        for (const col of transposedBoard) {
            if (hasDuplicates(col)) return false;
        }
        return true;
    }

    function isBlockValid(board) {
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const block = [];
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        block.push(board[i + k][j + l]);
                    }
                }
                if (hasDuplicates(block)) return false;
            }
        }
        return true;
    }

    function hasDuplicates(arr) {
        // find duplicated numbers and exclude duplicated nulls
        const duplicates = arr.filter(
            (item, index) => arr.indexOf(item) !== index && item !== null
        );
        if (duplicates.length > 0) {
            return true;
        }
        return false;
    }


};

// driver code
const mySudoku = [
    [5, 3, X, X, 7, X, X, X, X],
    [6, X, X, 1, 9, 5, X, X, X],
    [X, 9, 8, X, X, X, X, 6, X],
    [8, X, X, X, 6, X, X, X, 3],
    [4, X, X, 8, X, 3, X, X, 1],
    [7, X, X, X, 2, X, X, X, 6],
    [X, 6, X, X, X, X, 2, 8, X],
    [X, X, X, 4, 1, 9, X, X, 5],
    [X, X, X, X, 8, X, X, 7, 9],
];

const solvedSudoku = solveSudoku(mySudoku);

// reference solution 
const refSolution = [
    [5, 3, 0, 2, 7, 6, 4, 1, 8],
    [6, 2, 4, 1, 9, 5, 3, 0, 7],
    [1, 9, 8, 3, 4, 0, 5, 6, 2],
    [8, 1, 2, 7, 6, 4, 0, 5, 3],
    [4, 0, 6, 8, 5, 3, 7, 2, 1],
    [7, 5, 3, 0, 2, 1, 8, 4, 6],
    [0, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 6, 8, 2, 1, 7, 9],
];

console.log('Here is the solved sudoku: ', solvedSudoku);
console.log('Here is the solution for reference', refSolution);

// compare if the elements in the arrays are the same - no direct comparsionn in JS
console.log('My answer matches the solution?', solvedSudoku.join() === refSolution.join());
