/*
You are in an infinite 2D grid where you can move in any of the 8 directions:

 [x, y] to
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
    [x + 1, y - 1]
You are given a sequence of points and the order in which you need to cover the points. Give the minimum number of steps in which you can achieve it. You start from the first point.

Example:

Input: [[0, 0], [1, 1], [1, 2]]
Output: 2
It takes 1 step to move from [0, 0] to [1, 1]. 
It takes one more step to move from [1, 1] to [1, 2].
 */

(() => { 
    const minSteps = (sequence: number[][]): number => { 
        let stepCount = 0;

        for (let i = 0; i < sequence.length - 1; i++) { 
            stepCount +=
                shortestPath(sequence[i], sequence[i + 1]);
        }

        return stepCount;

        function shortestPath(p1: number[], p2: number[]): number {
            const dx = Math.abs(p1[0] - p2[0]);
            const dy = Math.abs(p1[1] - p2[1]);
            return Math.max(dx, dy);
        }
    };

    (() => { 
        const sequence = [[0, 0], [1, 1], [1, 2]];
        console.log(minSteps(sequence));
    })();
})();