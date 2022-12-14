/*
Given an undirected graph represented as an adjacency matrix and an integer k, 
write a function to determine whether each vertex in the graph can be colored such that 
no two adjacent vertices share the same color using at most k colors.
*/

/**
 * Solve the color problem 
 * @param {number[][]} graph adjacency matrix
 * @param {number} k number of colors to choose from
 * @returns {boolean} whether each vertex in the graph can be colored such that no two adjacent vertices share the same color using at most k colors.
 */
const solveColoringProblem = (graph, k) => {
    const V = graph.length;  // number of vertices in graph
    const colorArr = Array(V).fill(0);  // populate color array with 0's

    // call colorGraph for vertex 0
    if (!colorGraph(graph, k, colorArr, 0)) {
        console.log('There is no solution available for this graph.');
        return false;
    }

    // print the solution
    printSolution(colorArr);
    return true;

    /**
     * Check if the current vertex is safe to color
     * @param {number} v 
     * @param {number[][]} graph 
     * @param {number[]} colorArr 
     * @param {number} c 
     * @returns {boolean}
     */
    function isSafe(v, graph, colorArr, c) {
        for (let i = 0; i < V; i++) {
            if (graph[v][i] === 1 && c === colorArr[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Color the given graph with the maximum number of colors 
     * @param {number[][]} graph 
     * @param {number} k 
     * @param {number[]} colorArr 
     * @param {number} v 
     * @returns {boolean} if it is possible to color the graph with the given instructions
     */
    function colorGraph(graph, k, colorArr, v) {
        // base case: return true if all vertices are assigned to a color
        if (v === V) {
            return true;
        }

        // consider the vertex v and try different colors
        for (let c = 1; c <= k; c++) {
            // check if assignment of color c to v is allowed
            if (isSafe(v, graph, colorArr, c)) {
                colorArr[v] = c;

                // recur to assign colors to rest of verices
                if (colorGraph(graph, k, colorArr, v + 1)) {
                    return true;
                }

                // if there is no solution after assignment of color c, remove the color
                colorArr[v] = 0;
            }
        }

        // if no colors can be assigned to this vertex 
        return false;
    }

    /**
     * print out one possible solution
     * @param {number[]} colorArr 
     */
    function printSolution(colorArr) {
        let printout = '';
        console.log('The following are the assigned colors.');
        colorArr.forEach(color => printout += ' ' + color + ' ');
        console.log(printout);
    }
};

// driver code
/*
    (3)---(2)
    |   / |
    |  /  |
    | /   |
    (0)---(1)
*/
const myGraph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0],
];
const myK = 3;

console.log(solveColoringProblem(myGraph, myK));
