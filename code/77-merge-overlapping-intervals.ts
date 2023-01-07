/*
Given a list of possibly overlapping intervals, 
return a new list of intervals where all overlapping intervals have been merged.

The input list is not necessarily ordered in any way.

For example, given [[1, 3], [5, 8], [4, 10], [20, 25]], 
you should return [[1, 3], [4, 10], [20, 25]].
 */

/**
 * a function to merge all overlapping intervals in O(n * log(n))
 * @param intervals a list of possibly overlapping intervals
 * @returns a new list of intervals where all overlapping intervals have been merged
 */
const merge = (intervals: number[][]): number[][] => { 
    const result: number[][] = [];

    // sort the input array by the starting time - O(n * log(n))
    for (const [start, end] of intervals.sort((a, b) => a[0] - b[0])) {
        // if current interval overlaps with the previous one, combine them
        if (result.length > 0 && start < result[result.length - 1][1]) {
            const [prevStart, prevEnd] = result[result.length - 1];
            result[result.length - 1] = [prevStart, Math.max(end, prevEnd)];
        } else {
            result.push([start, end]);
        }
    }

    return result;
};

(() => { 
    const myInvervals = [[1, 3], [5, 8], [4, 10], [20, 25]];
    console.log(merge(myInvervals));
})();