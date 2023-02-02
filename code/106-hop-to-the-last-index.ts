/*
Given an integer list where each number represents the number of hops you can make, 
determine whether you can reach to the last index starting at index 0.

For example, [2, 0, 1, 0] returns True while [1, 1, 0, 1] returns False.
 */

/**
 * Solve the problem using greedy algorithm
 * @param hops 
 * @returns whether you can reach to the last index starting at index 0
 */
const canHopToEnd = (hops: number[]): boolean => { 
    let farthestIndex = 0;

    for (let i = 0; i < hops.length; i++) {
        if (i > farthestIndex) return false;

        farthestIndex = Math.max(farthestIndex, i + hops[i]);
    }

    return true;
};

(() => { 
    console.log(canHopToEnd([2, 0, 1, 0]));
    console.log(canHopToEnd([1, 1, 0, 1]));
})();