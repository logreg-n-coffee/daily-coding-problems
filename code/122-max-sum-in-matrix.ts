/* 
 You are given a 2-d matrix where each cell represents number of coins in that cell. Assuming we start at matrix[0][0], and can only move right or down, find the maximum number of coins you can collect by the bottom right corner.

 For example, in this matrix

    0 3 1 1
    2 0 0 4
    1 5 3 1

 The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.
 */

(() => { 
    const maxPathSumMatrix = (mat: number[][]): number => { 
        const rowLen = mat.length;
        const colLen = mat[0].length;

        // create and initialize a dp matrix
        const dp: number[][] = Array(rowLen)
            .fill(0)
            .map(() => Array(colLen).fill(0));
        dp[0][0] = mat[0][0];
        
        // fill the first row
        for (let j = 1; j < colLen; j++) {
            // push right
            dp[0][j] = dp[0][j - 1] + mat[0][j];
        }

        // fill the first column
        for (let i = 1; i < rowLen; i++) { 
            // push down
            dp[i][0] = dp[i - 1][0] + mat[i][0];
        }

        // fill the remaining cells
        for (let i = 1; i < rowLen; i++) { 
            for (let j = 1; j < colLen; j++) { 
                // either push right or down (take the max) add the value in 
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + mat[i][j];
            }
        }

        return dp[rowLen - 1][colLen - 1];
    };

    const matrix = [
        [0, 3, 1, 1],
        [2, 0, 0, 4],
        [1, 5, 3, 1],
    ];

    console.log(maxPathSumMatrix(matrix));  // time and space complexity: O(MN)
})();