/*
Given a 2D matrix of characters and a target word, 
write a function that returns whether the word can be found in the matrix by 
going left-to-right, or up-to-down.

For example, given the following matrix:
[['F', 'A', 'C', 'I'],
 ['O', 'B', 'Q', 'P'],
 ['A', 'N', 'O', 'B'],
 ['M', 'A', 'S', 'S']]

and the target word 'FOAM', you should return true, since it's the leftmost column. 
Similarly, given the target word 'MASS', you should return true, since it's the last row.

*/

const findWord = (matrix, word) => {
    const rowLen = matrix.length;
    const colLen = matrix[0].length;

    // define the direction of the pointer movement 
    const x = [1, 0];
    const y = [0, 1];

    // execute patternSearch and return the return value of the function
    return patternSearch(matrix, word);

    // pattern search function
    function patternSearch(matrix, word) {
        for (let row = 0; row < rowLen; row++) {
            for (let col = 0; col < colLen; col++) {
                if (search2D(matrix, row, col, word)) {
                    console.log(`Pattern ${word} found.`);
                    return true;
                }
            }
        }
        return false;
    }

    // 2d search function 
    function search2D(matrix, row, col, word) {
        // match the first letter in the word; if no match, return false
        if (matrix[row][col] !== word[0]) {
            return false;
        }

        // get the length
        const len = word.length;

        // match the rest of the letters in the word
        for (let dir = 0; dir < 2; dir++) {
            let k;
            let r = row + x[dir];
            let c = col + y[dir];
            for (k = 1; k < len; k++) {
                if (r >= rowLen || r < 0 || c >= colLen || c < 0) {
                    break;
                }
                if (matrix[r][c] !== word[k]) {
                    break;
                }
                r += x[dir];
                c += y[dir];
            }
            if (k === len) {
                return true;
            }
        }

        // return false by default
        return false;
    }
};


// driver code
const myMatrix = [
    ['F', 'A', 'C', 'I'],
    ['O', 'B', 'Q', 'P'],
    ['A', 'N', 'O', 'B'],
    ['M', 'A', 'S', 'S']
];

console.log('found FACI?', findWord(myMatrix, 'FACI'), '\n');
console.log('found MASS?', findWord(myMatrix, 'MASS'), '\n');
console.log('found ABNA?', findWord(myMatrix, 'ABNA'), '\n');
console.log('found FBOS?', findWord(myMatrix, 'FBOS'), '\n');
