/*
Suppose you are given a table of currency exchange rates, represented as a 2D array. 

Determine whether there is a possible arbitrage: 
that is, whether there is some sequence of trades you can make, 
starting with some amount A of any currency, 
so that you can end up with some amount greater than A of that currency.

There are no transaction costs and you can trade fractional quantities.
*/

/*
Intuition: 
1. Concept of Arbitrage 
Let’s say, 
1 U.S. dollar bought 0.82 Euro, 
1 Euro bought 129.7 Japanese Yen, 
1 Japanese Yen bought 12 Turkish Lira, and 
1 Turkish Lira bought 0.0008 U.S. dollars. 

Then, by converting currencies, a trader can start with 1 U.S. dollar and buy U.S. dollars, 
thus turning a 0.82*129.7*12*0.008 =1.02 US dollars, thus making a 2% profit.

2. Choice of Data Structure: Graph data structure
Weighted directed graphs can be represented as an adjacency matrix. 
For a graph with |V| X |V| vertices, an adjacency matrix is a |V| times |V| matrix of values, 
where the entry in row i & column j is a non-zero integer if and only if the edge (i, j) is in the graph. 
If you want to indicate an edge weight, put it in the row i, column j entry, 
and reserve a special value (perhaps None) to indicate an absent edge.

3. Ultimate Finding: w1 * w2 * w3 * ... * wn > 1
Take log on both sides: log(w1) + log(w2) + ... + log(wn) > 0
Take negative: (-log(w1)) + (-log(w2)) + ... + (-log(wn)) < 0 

Therefore we can conclude that if we can find a cycle of vertices such that 
the sum of their weights if negative, 
then we can conclude there exists an opportunity for currency arbitrage. 

Luckily, Bellman-Ford algorithm is a standard graph algorithm 
that can be used to easily detect negative weight cycles in O(|V*E|) time.

4. Bellman-Ford algorithm
- Let G(V, E) be a graph with vertices, V, and edges, E.
- Let w(x) denote the weight of vertex x.
- Let w(i, j) denote the weight of the edge from source vertex i to destination vertex j.
- Let p(j) denote the predecessor of vertex j.

The Bellman-Ford algorithm seeks to solve the single-source shortest path problem. 

It is used in situations where a source vertex is selected and the shortest paths 
to every other vertex in the graph need to be determined. 

After applying Bellman-Ford algorithm on a graph, each vertex maintains 
the weight of the shortest path from the source vertex to itself and the vertex which precedes it in the shortest path. 

In each iteration, all edges are relaxed if [w(i) + w(i, j) < w(j)] and the weight of each vertex is updated accordingly. 
After the i-th iteration, the algorithm finds all shortest paths consisting of at most i edges.

Once all shortest paths have been identified, the algorithm loops through all of the edges and looks for edges 
that can further decrease the value of the shortest path. 
If we can still relax the edges, then a negative weight cycle has been found since a path can have at most |V-1| edges.
*/ 

const rates = [
    [1, 0.23, 0.25, 16.43, 18.21, 4.94],
    [4.34, 1, 1.11, 71.4, 79.09, 21.44],
    [3.93, 0.9, 1, 64.52, 71.48, 19.37],
    [0.061, 0.014, 0.015, 1, 1.11, 0.3],
    [0.055, 0.013, 0.014, 0.9, 1, 0.27],
    [0.2, 0.047, 0.052, 3.33, 3.69, 1],
];

const currencies = ['PLN', 'EUR', 'USD', 'RUB', 'INR', 'MXN'];

const findArbitrage = (matrix, currencies) => {
    const graph = transformMatrix(matrix);

    // pick any source vertex - we can run Bellman-Ford algorithm from any vertex
    let source = 0;

    const n = graph.length;
    const minDist = Array(n).fill(Infinity);

    // predecessor
    const pre = Array(n).fill(-1);

    minDist[source] = source;

    // relax edges |V - 1| times
    for (let i = 0; i < n - 1; i++) {
        for (let sourceCurr = 0; sourceCurr < n; sourceCurr++) {
            for (let destCurr = 0; destCurr < n; destCurr++) {
                if (
                    minDist[destCurr] >
                    minDist[sourceCurr] + graph[sourceCurr][destCurr]
                ) {
                    minDist[destCurr] =
                        minDist[sourceCurr] + graph[sourceCurr][destCurr];
                    pre[destCurr] = sourceCurr;
                }
            }
        }
    }

    // if we can still relax edges, then we have a negative cycle 
    for (let sourceCurr = 0; sourceCurr < n; sourceCurr++) {
        for (let destCurr = 0; destCurr < n; destCurr++) {
            if (
                minDist[destCurr] >
                minDist[sourceCurr] + graph[sourceCurr][destCurr]
            ) {
                // negative cycle exists, and use the predecessor chain to print the cycle
                let printCycle = [destCurr, sourceCurr];
                // Start from the source and go backwards
                // until you see the source vertex again or any vertex that already exists in printCycle array
                while (!printCycle.includes(pre[sourceCurr])) {
                    printCycle.push(pre[sourceCurr]);
                    sourceCurr = pre[sourceCurr];
                }
                printCycle.push(pre[sourceCurr]);
                console.log('Arbitrage Opportunity:');
                for (const p of printCycle.reverse()) {
                    console.log(currencies[p]);
                }

                return true;
            }
        }
    }

    return false;
};

function transformMatrix(matrix) {
    return matrix.map(row => row.map(col => -Math.log(col)));
}

console.log(findArbitrage(rates, currencies));

// Time Complexity: O(n^3)
// Space Complexity: O(n^2)

/*
Reflection:
In the real world scenario, it may be hard to find the arbitrage opportunity. 
It is advisable to take the negative logarithm of currency value 
after converting the floating point value with 2 decimal places and multiply that by 100. 
This is beneficial such that we can avoid arbitrage opportunities which are less than 1%. 
*/