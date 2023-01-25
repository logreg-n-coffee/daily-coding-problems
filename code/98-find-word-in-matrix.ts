/*
https://leetcode.com/problems/word-search/

Given a 2D board of characters and a word, 
find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, 
where 'adjacent' cells are those horizontally or vertically neighboring. 
The same letter cell may not be used more than once.

For example, given the following board:

[
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
]
exists(board, 'ABCCED') returns true, 
exists(board, 'SEE') returns true, 
exists(board, 'ABCB') returns false.
 */


const exists = (board: string[][], word: string): boolean => { 
    const ROWS = board.length;
    const COLS = board[0].length;

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (backtrack(r, c, word, 0)) {
                return true;
            }
        }
    }

    // return false if the board has been explored already and
    return false;

    function backtrack(
        row: number,
        col: number,
        word: string,
        index: number,
    ): boolean {
        // step 1: check bottom case
        if (index >= word.length) return true;

        // step 2: check boundaries
        if (
            row < 0 ||
            row === ROWS ||
            col < 0 ||
            col === COLS ||
            // if the char in the board is not the same as the char we are looking for
            board[row][col] !== word.charAt(index)  
        ) {
            return false;
        }

        // step 3: explore the neighbors in dfs
        let ret: boolean = false;

        // mark the path before the next exploration
        board[row][col] = '*';

        const rowOffsets = [0, 1, 0, -1];
        const colOffsets = [1, 0, -1, 0];

        for (let d = 0; d < 4; d++) {
            ret = backtrack(
                row + rowOffsets[d],
                col + colOffsets[d],
                word,
                index + 1,
            );

            if (ret) break;
        }

        // step 4: clean up and return 
        board[row][col] = word.charAt(index);  // return the board into the original setting
        return ret;
    }
};

(() => { 
    const board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
    ];

    console.log(exists([...board], 'ABCCED')); // returns true, 
    console.log(exists([...board], 'SEE')); // returns true, 
    console.log(exists([...board], 'ABCB')); // returns false.

})();