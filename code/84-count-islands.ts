/*
Given a matrix of 1s and 0s, return the number of "islands" in the matrix. 
A 1 represents land and 0 represents water, 
so an island is a group of 1s that are neighboring whose perimeter is surrounded by water.

For example, this matrix has 4 islands.

1 0 0 0 0
0 0 1 1 0
0 1 1 0 0
0 0 0 0 0
1 1 0 0 1
1 1 0 0 1

 */

const countIslands = (matrix: number[][]): number => { 
    if (!matrix || matrix.length === 0) {
        return 0;
    }

    const nRows = matrix.length;
    const nCols = matrix[0].length;
    let islandCount = 0;

    for (let row = 0; row < nRows; row++) { 
        for (let col = 0; col < nCols; col++) {
            if (matrix[row][col] === 1) {
                islandCount++;
                dfs(matrix, row, col);
            }
        }
    }

    return islandCount;

    
    function dfs(
        matrix: number[][],
        row: number,
        col: number,
    ): void { 
        const nRows = matrix.length;
        const nCols = matrix[0].length;

        // if row or col indices is / are out of range, return
        if (
            row < 0 || col < 0 || row >= nRows || col >= nCols ||
            matrix[row][col] === 0
        ) {
            return;
        }

        // mark island visited 
        matrix[row][col] = 0;
        
        // use dfs search - try all fill possibilities
        dfs(matrix, row - 1, col);
        dfs(matrix, row + 1, col);
        dfs(matrix, row, col - 1);
        dfs(matrix, row, col + 1);
    }
    
};

(() => { 
    const myMatrix: number[][] = [
        [1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [1, 1, 0, 0, 1],
    ];

    console.log(countIslands(myMatrix));
})();

