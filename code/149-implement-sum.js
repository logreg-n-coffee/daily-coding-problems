/*
Given a list of numbers L, 
implement a method sum(i, j) which returns the sum from the sublist L[i:j] (including i, excluding j).

For example, given L = [1, 2, 3, 4, 5], sum(1, 3) should return sum([2, 3]), which is 5.

You can assume that you can do some pre-processing. 
sum() should be optimized over the pre-processing step.
 */

(() => { 
    Array.prototype.sum = function (startIndex, endIndex) {
        endIndex = endIndex || this.length;

        let sum = 0;
        for (let i = startIndex; i < endIndex; i++) {
            sum += this[i];
        }
        
        return sum;
    }

    const l = [1, 2, 3, 4, 5];
    console.log(l.sum(1, 3));
})();