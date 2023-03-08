/* 
    Given an N by M matrix consisting only of 1's and 0's, find the largest rectangle containing only 1's and return its area.

    For example, given the following matrix:

    [[1, 0, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [0, 1, 0, 0]]
    Return 4.
 */

// solve the max area question in a histogram
(() => {
    const areaOfLargestRect = (matrix: number[][]): number => { 
        // handle invalid matrix
        if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
            return 0;
        }
        // init max area to zero
        let maxArea = 0;
        // a temp array to hold the heights of the bars in the histogram
        const temp: number[] = Array(matrix[0].length).fill(0);

        // iterate over each row 
        for (let i = 0; i < matrix.length; i++) { 
            // update the heights of the bars in the histogram
            for (let j = 0; j < matrix[i].length; j++) {
                temp[j] = matrix[i][j] === 0 ? 0 : temp[j] + matrix[i][j];
            }
            // Compute the max area in the current histogram using the maximum area in a histogram algorithm
            const area = areaOfLargestRectInRow(temp);
            // Update the max area
            maxArea = Math.max(maxArea, area);
        }

        // Return the maximum area
        return maxArea;


        function areaOfLargestRectInRow(heights: number[]): number {
            // Initialize a stack to hold the indices of the bars in the histogram
            const stack: number[] = [];
            // Initialize the max area to zero
            let maxArea = 0;
            // Iterate over the bars in the histogram
            for (let i = 0; i < heights.length + 1; i++) { 
                // If the current bar is shorter than the prev bar, compute the area of the prev bar and update max area
                while (
                    stack.length > 0 && 
                    (i === heights.length || heights[stack[stack.length - 1]] >= heights[i])
                ) {
                    const h = heights[stack.pop()!];
                    const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                    maxArea = Math.max(maxArea, h * w);
                }
                // Push the current bar to the stack
                stack.push(i);
            }
            // After everything is complete, return max area
            return maxArea;
        }
    };

    const matrix = [
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 0, 1, 1],
        [0, 1, 0, 0],
    ];

    console.log(matrix);
    console.log(areaOfLargestRect(matrix));
})();