/*
In a directed graph, each node is assigned an uppercase letter. 
We define a path's value as the number of most frequently-occurring letter along that path. 

For example, if a path in the graph goes through "ABACA", the value of the path is 3, 
since there are 3 occurrences of 'A' on the path.

Given a graph with n nodes and m directed edges, return the largest value path of the graph. 
If the largest value is infinite, then return null.

The graph is represented with a string and an edge list. 
The i-th character represents the uppercase letter of the i-th node. 
Each tuple in the edge list (i, j) means there is a directed edge from the i-th node to the j-th node. 
Self-edges are possible, as well as multi-edges.

For example, the following input graph:

string: ABACA - 5 nodes indexed 0, 1, 2, 3, 4 and labeled A, B, A, C, A

edge list:
[(0, 1),
 (0, 2),
 (2, 3),
 (3, 4)]

Would have maximum value 3 using the path of vertices [0, 2, 3, 4], (A, A, C, A).

The following input graph:

A
[(0, 0)]
Should return null, since we have an infinite loop.

Adjacency list of the map:
[ [ 1, 2 ], [], [ 3 ], [ 4 ], [] ]
*/

const maxValue = (s: string, lst: Array<Array<number>>): number | null => { 
    const VISITED = 0;
    const UNVISITED = 1;
    const VISITING = 2;

    // build adjacency list - index is the vertex index, content of the index is its neighboring vertices
    const adj = Array(s.length).fill(null).map(() => Array(0));

    for (const [u, v] of lst) {
        adj[u].push(v);
    }

    // create matrix cache
    const dp = Array(s.length).fill(null).map(() => Array(26).fill(0));
    const state = new Map();

    for (let i = 0; i < s.length; i++) {
        state.set(i, UNVISITED);
    }

    // run dfs on the graph
    for (let v = 0; v < s.length; v++) {
        if (state.get(v) === UNVISITED) {
            const hasCycle = dfs(v);
            if (hasCycle) return null;
        }
    }

    // debug
    console.table(dp);

    // return the largest number in the 2d dp matrix
    return Math.max(...dp.map(x => Math.max(...x)));


    function dfs(v: number): boolean {
        state.set(v, VISITING);
        
        // iterate through the neighbors of vertex
        for (const neighbor of adj[v]) {
            if (state.get(neighbor) === VISITING) {
                // we have found a cycle 
                return true;
            }
            dfs(neighbor);
            for (let i = 0; i < 26; i++) {
                dp[v][i] = dp[neighbor][i];
            }
        }

        const currentChar: number = s[v].charCodeAt(0) - 'A'.charCodeAt(0);
        dp[v][currentChar] += 1;
        
        // set the vertex to be visited
        state.set(v, VISITED);

        // return false if no cycle found in dfs
        return false;
    }
};

// driver code
(() => { 
    const s = 'ABACA';
    const lst = [[0, 1], [0, 2], [2, 3], [3, 4]];

    console.log(maxValue(s, lst));
})();

// TC: O(V + E) where V is the number of vertices and E is the number of edges
