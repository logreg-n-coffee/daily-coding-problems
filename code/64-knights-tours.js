/*
A knight's tour is a sequence of moves by a knight on a chessboard such that all squares are visited once.

Given N, write a function to return the number of knight's tours on an N by N chessboard.
*/

class KnightsTours {
    constructor(n) {
        this.n = n;
    }

    // a method to check if the knight can move to a given location
    #isValid(board, row, col) {
        return (
            row >= 0 &&
            row < this.n &&
            col >= 0 &&
            col < this.n &&
            board[row][col] === null
        );
    }

    // a method to perform backtracking 
    #validMoves(board, row, col) {
        const deltas = [
            [-2, -1], [-2, 1], [2, 1], [2, -1],
            [-1, -2], [-1, 2], [1, 2], [1, -2],
        ];

        const allMoves = [];
        for (const [dr, dc] of deltas) { 
            allMoves.push([row + dr, col + dc]);
        }

        return allMoves.filter(x => this.#isValid(board, x[0], x[1]));
    }

    solveKnightTour(row = 0, col = 0) { 
        // helper function 
        const solveKnightTourHelper = (row, col, tour, board, dr, dc) => { 
            if (tour === this.n ** 2) {
                return true;
            }

            // try all the eight possible movements 
            for (let i = 0; i < 8; i++) { 
                const nextRow = row + dr[i];
                const nextCol = col + dc[i];

                if (this.#isValid(board, nextRow, nextCol)) { 
                    board[nextRow][nextCol] = tour;
                    if (solveKnightTourHelper(nextRow, nextCol, tour + 1, board, dr, dc)) {
                        return true;
                    } else {
                        board[nextRow][nextCol] = null;
                    }
                }
            }

            return false;
        };

        // deltas
        const dr = [2, 1, -1, -2, -2, -1, 1, 2];
        const dc = [1, 2, 2, 1, -1, -2, -2, -1];

        // board
        const board = Array(this.n).fill().map(() => Array(this.n).fill(null));

        // initially place knight at the first block
        board[row][col] = 0;

        if (!solveKnightTourHelper(row, col, 1, board, dr, dc)) {
            console.log('No solution found');
            return false;
        } else {
            console.log(board);
        }

        return true;
    }

    countKnightsTours() {
        // knights tours helper
        const countKnightsToursHelper = (board, tour) => {
            if (tour.length === this.n ** 2) {
                return 1;
            } else {
                let count = 0;
                const [lastR, lastC] = tour[tour.length - 1];
                for (const [r, c] of this.#validMoves(board, lastR, lastC)) {
                    tour.push([r, c]);
                    board[r][c] = tour.length;
                    count += countKnightsToursHelper(board, tour, this.n);
                    tour.pop();
                    board[r][c] = null;
                }
                return count;
            }
        };

        // number of possible tours
        let count = 0;

        // start backtracking from each position on the board
        for (let row = 0; row < this.n; row++) { 
            for (let col = 0; col < this.n; col++) { 
                const board = Array(this.n).fill().map(() => Array(this.n).fill(null));
                board[row][col] = 0;
                count += countKnightsToursHelper(board, [[row, col]]);
            }
        }

        return count;

    }
}


// driver code
console.log('Count of all possible solutions: ', new KnightsTours(5).countKnightsTours());
console.log(`One possible solution at col 0 and row 0`, new KnightsTours(5).solveKnightTour());
