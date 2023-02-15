/*
Given a set of closed intervals, find the smallest set of numbers that covers all the intervals. 
If there are multiple smallest sets, return any of them.

For example, given the intervals [0, 3], [2, 6], [3, 4], [6, 9], 
one set of numbers that covers all these intervals is {3, 6}.
 */


/**
 * Find out the maximum in left of intervals and minimum in right of interval
 * @param intervals 
 * @returns one set of numbers that covers all these intervals
 */
function smallestSet(intervals: number[][]): number[] {
    if (intervals.length === 0) return [];
    
    let lower = Infinity;
    let upper = -Infinity;

    for (const interval of intervals) { 
        upper = Math.max(upper, interval[0]);
        lower = Math.min(lower, interval[1]);
    }

    return [lower, upper];
}


(() => { 
    console.log(smallestSet([[0, 3], [2, 6], [3, 4], [6, 9]]));
})();