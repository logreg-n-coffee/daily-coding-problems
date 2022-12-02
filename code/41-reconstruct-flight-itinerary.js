/*
Given an unordered list of flights taken by someone, each represented as (origin, destination) pairs, 
and a starting airport, compute the person's itinerary. 
If no such itinerary exists, return null. 

If there are multiple possible itineraries, return the lexicographically smallest one. 
All flights must be used in the itinerary.

For example, 
1. given the list of flights [['SFO', 'HKO'], ['YYZ', 'SFO'], ['YUL', 'YYZ'], ['HKO', 'ORD']] and 
starting airport 'YUL', you should return the list ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].

2. Given the list of flights [['SFO', 'COM'], ['COM', 'YYZ']] and starting airport 'COM', 
you should return null.

3. Given the list of flights [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'A']] and 
starting airport 'A', you should return the list ['A', 'B', 'C', 'A', 'C'] 
even though ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
However, the first one is lexicographically smaller.
*/


/**
 * Solve itinerary problem with Hierholzer's Algorithm - Eulerian path
 * @param {string[][]} tickets 
 * @param {string} start 
 * @returns {string[]} an array of airports that form an itinerary
 */
const getItinerary = (tickets, start) => {
    // step 1: build the graph
    // store all the flights into an object: key:origin -> value: array of destinations
    const flightMap = new Map();
    for (const [ori, des] of tickets) {
        if (flightMap.has(ori)) {
            // get the destination array from the value of the map
            const destArr = flightMap.get(ori);
            destArr.push(des);
        } else {
            // if there is no original airport, create a key-value pair, with key being the origin and value being the destination
            const destArr = [];
            destArr.push(des);
            flightMap.set(ori, destArr);
        }
    }

    // step 2: sort the destinations
    flightMap.forEach((value) => {
        // callbackFn in Map takes (value, key) instead of (key, value)
        value.sort();
        // sort() sorts and mutates the array in lexicographical order/ASCII character order (lexical smallest ones precede larger ones) 
        // -compare: sort((a - b) => a - b)
    });

    // step 3: post order dfs to find the result 
    const result = [];
    dfs(start);  // postorder dfs - starting on the start airport 
    
    // step 4: validate the result - if we don't use up all the unique airports, then the itinerary does not exist
    if ([...new Set(tickets.flat())].length !== [...new Set(result)].length) {
        return null;
    }

    // return result
    return result;

    // dfs function - the def does not return any value but undefined
    function dfs(origin) {
        // visit all outgoing edges 
        if (flightMap.has(origin)) {
            const destArr = flightMap.get(origin);
            while (destArr?.length > 0) {
                // while we visit the edge, we trim it off from graph.
                const destination = destArr.shift();
                dfs(destination);
            }
        }
        // add the airport to the head of the itinerary
        result.unshift(origin);
    }

};

// driver code: 
console.log(
    getItinerary([
        ['SFO', 'HKO'],
        ['YYZ', 'SFO'],
        ['YUL', 'YYZ'],
        ['HKO', 'ORD'],
    ], 'YUL')
);

console.log(
    getItinerary(
        [
            ['SFO', 'COM'],
            ['COM', 'YYZ'],
        ],
        'COM'
    )
);

console.log(
    getItinerary(
        [
            ['A', 'B'],
            ['A', 'C'],
            ['B', 'C'],
            ['C', 'A'],
        ],
        'A'
    )
);

console.log(
    getItinerary([
        ['JFK', 'SFO'],
        ['JFK', 'ATL'],
        ['SFO', 'ATL'],
        ['ATL', 'JFK'],
        ['ATL', 'SFO'],
    ], 'JFK')
);
// Expected: 
// ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'];

/*
Intuition: Overall, we could consider this problem as a graph traversal problem, 
where an airport can be viewed as a vertex in graph and flight between airports as an edge in graph.

Explanation:
    This problem is about finding the Euler path. Euler path is a path
    which involves traversing all the edges only once.

    The way the algo works is, we start with a source and start traversing the outward
    edges it has, each time we remove that edge so that we don't process that edge even if come 
    back to this node again. We keep traversing till we hit a node, from where we can't move forward
    either due to all the outward edges being used already or lack of outward edges.

    When we hit a terminal node, we know that this is a node that should come after any remaining unvisited nodes.
    because we pick an edge without any core logic, we might traverse a path that skips other nodes,
    so when in this path we hit a roadblock we need to store that node in such a way that this comes after 
    the nodes that are yet to traversed. 

    So we save the node in a stack, return to the previous node. There check if there are any other edges are yet
    not traversed, if yes then traverse else add this node as well and return to the previous stack call.
    Since all the nodes are stored in a stack manner, path starts from the top element.
    
    TC: O(V + E) + O(ElogE) + O(E) // graph construction + sorting + Euler traversal
    SC: O(V + E)
*/



// leetcode feedback: 12/01/2022 12:23	Accepted	163 ms	47 MB	javascript