/**
 * There are a row of n houses, each house can be painted with one of the k colors.
 * The cost of painting each house with a certain color is different.
 * You have to paint all the houses such that no two adjacent houses have the same color.
 *
 * The cost of painting each house with a certain color is represented by an n x k cost matrix costs.
 * For example:
 * costs[0][0] is the cost of painting house 0 with color 0;
 * costs[1][2] is the cost of painting house 1 with color 2, and so on...
 *
 * Return the minimum cost to paint all houses.
 *
 * Sample Output:
 * Input: costs = [[1,5,3], [2,9,4]]
 * Obervation: house 0's color selection [1, 5, 3], house 1's color selection [2, 9, 4]
 * Output: 5
 * Explanation:
 * Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5;
 * Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost: 3 + 2 = 5.
 *
 * Input: costs = [[1,3],[2,4]]
 * Output: 5
 *
 * Constraints:
 * costs.length == n
 * costs[i].length == k
 * 1 <= n <= 100
 * 2 <= k <= 20
 * 1 <= costs[i][j] <= 20
 */

// Solution using Dynamic programming with Optimized Time

/**
 * There are a row of n houses, each house can be painted with one of the k colors.
 * Return the minimum cost to paint all houses.
 * @param {number[][]} costs
 * @return {number} min
 */

function minimumCost(costs) {
    if (!costs || !costs.length || !costs[0].length) return 0;

    const numHouses = costs.length;
    const numColors = costs[0].length;

    let prevMin = 0;
    let prevSecondMin = 0;
    let prevMinIndex = -1;

    for (let i = 0; i < numHouses; i++) {
        let min = Number.MAX_SAFE_INTEGER;
        let secondMin = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;

        for (let j = 0; j < numColors; j++) {
            const cost =
                costs[i][j] + (prevMinIndex === j ? prevSecondMin : prevMin);
            if (minIndex < 0 || cost < min) {
                secondMin = min;
                min = cost;
                minIndex = j;
            } else if (cost < secondMin) {
                secondMin = cost;
            }
        }
        prevMin = min;
        prevSecondMin = secondMin;
        prevMinIndex = minIndex;
    }

    return prevMin;
}

console.log(
    minimumCost([
        [1, 5, 3],
        [2, 9, 4],
    ])
);

// result should be 28
console.log(
    minimumCost([
        [8, 16, 12, 18, 9],
        [19, 18, 8, 2, 8],
        [8, 5, 5, 13, 4],
        [15, 9, 3, 19, 2],
        [8, 7, 1, 8, 17],
        [8, 2, 8, 15, 5],
        [8, 17, 1, 15, 3],
        [8, 8, 5, 5, 16],
        [2, 2, 18, 2, 9],
    ])
);
