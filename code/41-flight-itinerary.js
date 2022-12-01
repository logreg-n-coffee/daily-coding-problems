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
 * Solve itinerary problem with Hierholzer's Algorithm
 * @param {string[][]} flights 
 * @param {string} start 
 * @returns {string[]} an array of airports that form an itinerary
 */
const getItinerary = (flights, start) => {
    // step 1: build the graph
    // store all the flights into an object: key:origin -> value: array of destinations
    const flightMap = new Map();
    for (const [ori, des] of flights) {
        if (flightMap.has(ori)) {
            const destArr = flightMap.get(ori);
            destArr.push(des);
        } else {
            const destArr = [];
            destArr.push(des);
            flightMap.set(ori, destArr);
        }
    }

    // step 2: sort the destinations
    flightMap.forEach((value, key) => {
        value.sort((a, b) => a - b);
    });

    // step 3: post order dfs to find the result 
    const result = [];
    dfs(start);  // postorder dfs
    
    // step 4: validate the result - if we don't use up all the unique airports, then the itinerary does not exist
    if ([...new Set(flights.flat())].length !== [...new Set(result)].length) {
        return null;
    }

    // return result
    return result;

    // dfs function 
    function dfs(origin) {
        // visit all outgoing edges 
        if (flightMap.has(origin)) {
            const destArr = flightMap.get(origin);
            while (destArr?.length > 0) {
                const destination = destArr.shift();
                dfs(destination, flightMap);
            }
        }
        // add the airport to the head of the itinerary
        result.unshift(origin);
    }

};


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

/*
intuition: Overall, we could consider this problem as a graph traversal problem, 
where an airport can be viewed as a vertex in graph and flight between airports as an edge in graph.
*/