/**
 * You are given an M by N matrix consisting of booleans that represents a board.
 * Each True (1) boolean represents a wall. Each False (0) boolean represents a tile you can walk on.
 *
 * Given this matrix, a start coordinate, and an end coordinate,
 * return the minimum number of steps required to reach the end coordinate from the start.
 * If there is no possible path, then return null. You can move up, left, down, and right.
 * You cannot move through walls. You cannot wrap around the edges of the board.
 *
 * For example, given the following board:
 * [[f, f, f, f],
 * [t, t, f, t],
 * [f, f, f, f],
 * [f, f, f, f]]
 *
 * and start = (3, 0) (bottom left) and end = (0, 0) (top left),
 * the minimum number of steps required to reach the end is 7,
 * since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
 *
 * Movement:
 * Go Top: (x, y) ——> (x – 1, y)
 * Go Left: (x, y) ——> (x, y – 1)
 * Go Down: (x, y) ——> (x + 1, y)
 * Go Right: (x, y) ——> (x, y + 1)
 */

/* 
Solution: solving the problem with Lee's algorithm & bfs (gives out an optimal solution but is slow and takes memory)
Intuition: shortest path ==> breadth first search 
Algorithm:
1. Create an empty queue and enqueue the source cell having a distance 0 from the source (itself) 
and mark it as visited.
2. Loop till queue is empty:
    1) Dequeue the front node.
    2) If the popped node is the destination node, then return its distance.
    3) Otherwise, for each of four adjacent cells of the current cell, 
enqueue each valid cell with +1 distance and mark them as visited.
3. If all the queue nodes are processed, and the destination is not reached, then return false.

Note that in BFS, all cells having the shortest path as 1 are visited first, 
followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on… 
So if we reach any node in BFS, its shortest path is one more than the shortest path of the parent. 
So, the destination cell’s first occurrence gives us the result, and we can stop our search there. 

It is impossible that the shortest path exists from some other cell for which we haven’t reached the given node yet. 
If any such path were possible, we would have already explored it.
*/

// JavaScript program to find the shortest
// path between a given source cell
// to a destination cell.

// To store matrix cell coordinates

(() => { 
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    // A data structure for queue used in BFS
    class Node {
        constructor(pt, dist) {
            this.pt = pt; // The coordinates of the cell
            this.dist = dist; // Cell's distance from the source
        }
    }

    // Check whether given cell(row,col)
    // is a valid cell or not
    function isValid(row, col, mat) {
        const m = mat.length;
        const n = mat[0].length;
        return row >= 0 && row < m && col >= 0 && col < n;
    }

    // These arrays are used to get row and column
    // numbers of 4 neighbours of a given cell
    let rowNum = [-1, 0, 0, 1];
    let colNum = [0, -1, 1, 0];

    // Function to find the shortest path between
    // a given source cell to a destination cell.
    function BFS(mat, src, dest) {
        const m = mat.length; // 9
        const n = mat[0].length; // 10
        // base case: check source and destination cell
        // of the matrix have value 0 (unvisitable at the beginning)
        if (mat[src.x][src.y] !== 0 || mat[dest.x][dest.y] !== 0) return -1;

        // initialize a matrix of m * n using fill and map method chain
        let visited = Array(m)
            .fill(false)
            .map(() => Array(n).fill(false));

        // Mark the source cell as visited
        visited[src.x][src.y] = true;

        // Create a queue for BFS
        let q = [];

        // Distance of source cell is 0
        let s = new Node(src, 0);
        q.push(s); // Enqueue source cell

        // Do a BFS starting from source cell
        while (q) {
            let curr = q.shift(); // Dequeue the front cell

            console.log(curr); // examine the queue

            // If we have reached the destination cell,
            // we are done
            let pt = curr.pt;
            if (pt.x == dest.x && pt.y == dest.y) return curr.dist;

            // Otherwise enqueue its adjacent cells
            for (let i = 0; i < 4; i++) {
                let row = pt.x + rowNum[i];
                let col = pt.y + colNum[i];

                // if adjacent cell is valid, has path
                // and not visited yet, enqueue it.
                if (
                    isValid(row, col, mat) && // is valid
                    mat[row][col] === 0 && // has path
                    !visited[row][col] // not visited yet
                ) {
                    visited[row][col] = true;
                    let adjCell = new Node(new Point(row, col), curr.dist + 1);
                    q.push(adjCell);
                }
            }
        }
        // Return -1 if destination cannot be reached
        return -1;
    }

    // Driver code
    function main() {
        let mat = [
            [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 1, 1, 0],
        ];

        let source = new Point(0, 0);
        let dest = new Point(3, 4);

        let dist = BFS(mat, source, dest);

        if (dist !== -1) console.log('Shortest Path is', dist);
        else console.log("Shortest Path doesn't exist");
    }

    main();
})();