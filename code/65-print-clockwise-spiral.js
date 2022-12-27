/*
Given a N by M matrix of numbers, print out the matrix in a clockwise spiral.

For example, given the following matrix:

[[1,  2,  3,  4,  5],
 [6,  7,  8,  9,  10],
 [11, 12, 13, 14, 15],
 [16, 17, 18, 19, 20]]
You should print out the following:

1
2
3
4
5
10
15
20
19
18
17
16
11
6
7
8
9
14
13
12

*/

const printSpiral = (matrix) => { 
    // set up the direction enum
    const DIRECTIONS = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3,
    };

    // initialize counter and current direction and position
    let remaining = matrix.length * matrix[0].length;
    let currentDirection = DIRECTIONS.RIGHT;
    let currentPosition = [0, 0];

    // print out everything in the matrix
    while (remaining > 0) {
        // print current position and reduce the counter
        let [row, col] = currentPosition;
        console.log(matrix[row][col]);
        matrix[row][col] = null;
        remaining--;

        // get next possible position and check if we should change direction
        let possibleNextPosition = nextPosition(currentPosition, currentDirection);
        if (shouldChangeDirection(matrix, possibleNextPosition[0], possibleNextPosition[1])) {
            currentDirection = nextDirection(currentDirection);
            currentPosition = nextPosition(currentPosition, currentDirection);
        } else {
            currentPosition = possibleNextPosition;
        }
    }

    function nextDirection(direction) {
        if (direction === DIRECTIONS.RIGHT) {
            return DIRECTIONS.DOWN;
        } else if (direction === DIRECTIONS.DOWN) {
            return DIRECTIONS.LEFT;
        } else if (direction === DIRECTIONS.LEFT) {
            return DIRECTIONS.UP;
        } else if (direction === DIRECTIONS.UP) {
            return DIRECTIONS.RIGHT;
        }
    }

    function nextPosition(position, direction) {
        if (direction === DIRECTIONS.RIGHT) {
            return [position[0], position[1] + 1];
        } else if (direction === DIRECTIONS.DOWN) {
            return [position[0] + 1, position[1]];
        } else if (direction === DIRECTIONS.LEFT) {
            return [position[0], position[1] - 1];
        } else if (direction === DIRECTIONS.UP) {
            return [position[0] - 1, position[1]];
        }
    }

    function shouldChangeDirection(matrix, row, col) {
        const inBoundRow = row >= 0 && row < matrix.length;
        const inBoundCol = col >= 0 && col < matrix[0].length;
        return (!inBoundRow || !inBoundCol || matrix[row][col] === null);
    }
    
};

const myMatrix = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
];

printSpiral(myMatrix);

// Time Complexity: O(m * n)