/*
Conway's Game of Life takes place on an **infinite** two-dimensional board of square cells. 

Each cell is either dead or alive, and at each tick, the following rules apply:
1. Any live cell with less than two live neighbours dies.
2. Any live cell with two or three live neighbours remains living.
3. Any live cell with more than three live neighbours dies.
4. Any dead cell with exactly three live neighbours becomes a live cell.
A cell neighbors another cell if it is horizontally, vertically, or diagonally adjacent.

Implement Conway's Game of Life. 
It should be able to be initialized with a starting list of live cell coordinates and 
the number of steps it should run for. Once initialized, it should print out the board state at each step. 
Since it's an infinite board, print out only the relevant coordinates, 
i.e. from the top-leftmost live cell to bottom-rightmost live cell.

You can represent a live cell with an asterisk (*) and a dead cell with a dot (.).
*/

/*
Intuition:
As the board is infinite, use Cartesian coordinates to represent the board cells
*/

class GameOfLife {
    constructor(n, cells = []) {
        this.cells = cells;  // cells is an array of row and column pairs
        for (let i = 0; i < n; i++) {
            this.printBoard();
            this.next();
        }
    }

    getNumberOfLiveNeighbors(row, col) {
        let count = 0;
        for (const [cellRow, cellCol] of this.cells) {
            if (Math.abs(cellRow - row) > 1) {
                continue;
            }
            if (Math.abs(cellCol - col) > 1) {
                continue;
            }
            if (cellRow === row && cellCol === col) {
                continue;
            }
            count++;
        }
        return count;
    }

    getNeigboringCells(row, col) {
        return [
            [row - 1, col - 1],
            [row, col - 1],
            [row + 1, col - 1],
            [row - 1, col],
            [row + 1, col],
            [row - 1, col + 1],
            [row, col + 1],
            [row + 1, col + 1],
        ];
    }

    next() {
        let newCells = new Set();
        // go thru each cell, look for neighbors, and decide whether to add to the new set
        for (const [row, col] of this.cells) {
            const numOfNeighbors = this.getNumberOfLiveNeighbors(row, col);
            if (numOfNeighbors >= 2 && numOfNeighbors <= 3) {
                newCells.add([row, col]);
            }
        }
        
        let potentialLiveCells = new Set();
        for (const [row, col] of this.cells) {
            potentialLiveCells = new Set([...potentialLiveCells, ...this.getLiveNeighbors(row, col)]);
        }

        potentialLiveCells = potentialLiveCells.filter(elem => !this.cells.includes(elem));

        for (const [row, col] of [...potentialLiveCells]) {
            const numOfNeighbors = this.getNumberOfLiveNeighbors(row, col);
            if (numOfNeighbors === 3) {
                newCells.add([row, col]);
            }
        }

        this.cells = [...newCells];
    }

    getBoundaries() {
        const top = Math.min(...this.cells.map(elem => elem[0]));
        const bottom = Math.max(...this.cells.map(elem => elem[0]));
        const left = Math.min(...this.cells.map(elem => elem[1]));
        const right = Math.max(...this.cells.map(elem => elem[1]));
        return [top, bottom, left, right];
    }

    printBoard() {
        const [top, bottom, left, right] = this.getBoundaries();

        console.log('---------------------------------------');

        for (let i = top; i < bottom + 1; i++) {
            for (let j = left; j < right + 1; j++) {
                if (this.cells.includes([i, j])) {
                    console.log('*');
                } else {
                    console.log('.');
                }
            }
            console.log('');
        }

        console.log('---------------------------------------');
    }

}