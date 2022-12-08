/*
Given a function that generates perfectly random numbers between 1 and k (inclusive), 
where k is an input, write a function that shuffles a deck of cards represented as an array using only swaps.
*/

const random = (k = 1) => Math.floor(Math.random() * k + 1);

const randomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);  // min inclusive, max inclusive
};

/**
 * shuffle a deck of cards represented as an array using only swaps using Fisher-Yates Algorithm
 * @param {number[]} array 
 * @return {number[]} shuffled deck of cards
 */
const shuffle = (array) => {
    const n = array.length - 1;  // n will be used as an index, as indices start from 0, hence minus 1

    array.forEach((_, i) => {
        const r = randomRange(i, n);
        [array[i], array[r]] = [array[r], array[i]];
    });

    return array;
};


// driver code
const card = Array(52).fill().map((_, i) => i);

console.log('Before shuffle:', card)
console.log('After shuffle:', shuffle(card));


/* rationale
Fisher-Yates algorithm: 
1. First, generate a random integer between the current index and the last index of the array. 
2. Then, we swap the elements at the current index and the chosen index
**  it is possible to swap an element with itself
(n-1)   (n-2)   (n-3)        (n-k+1)  (n-k)
----- * ----- * ----- *(...)* ----- * ----- * (1/n-k)
  n     (n-1)   (n-2)        (n-k+2) (n-k+1)
*/
