// Given an infinite stream of elements too large to store in memory,
// pick a random element from the stream with uniform probability. - resevoir sampling
// we can only visit the data in the stream once
// website: https://en.wikipedia.org/wiki/Reservoir_sampling

// Uniform probability:
// def: a type of probability distribution in which all outcomes are equally likely
// example: - picking a club / diamond / spade / heart in a set of cards - rolling a dice

// For i = 0, we would’ve picked uniformly from [0, 0].
// For i > 0, before the loop began, any element K in [0, i - 1] had 1 / i chance
// of being chosen as the random element. We want K to have 1 / (i + 1) chance
// of being chosen after the iteration. This is the case since the chance of having
// being chosen already but not getting swapped with the ith element is
// 1 / i * (1 - (1 / (i + 1))) which is 1 / i * i / (i + 1) or 1 / (i + 1)

let res = 0; // The resultant random number
let count = 0; //Count of numbers visited so far in stream

//A method to randomly select a item from stream[0], stream[1], .. stream[i-1]
function selectRandom(x) {
    count++; // increment count of numbers seen so far

    // If this is the first element from stream, return it
    if (count == 1) res = x;
    else {
        // Generate a random number from 0 to count - 1
        let i = Math.floor(Math.random() * count);

        // Replace the prev random number with new number with 1/count probability
        if (i == count - 1) res = x;
    }
    return res;
}

// Driver program to test above function.
let stream = [1, 2, 3, 4];
let n = stream.length;
for (let i = 0; i < n; i++) {
    console.log(
        `Random number from first ${i + 1} numbers is ${selectRandom(
            stream[i]
        )}`
    );
}

/**
 * We need to prove that every element is picked with 1/n probability 
 * where n is the number of items seen so far. 
 * 
 * For every new stream item x, we pick a random number from 0 to ‘count -1’, 
 * if the picked number is ‘count-1’, we replace the previous result with x.
 * 
 * To simplify proof, let us first consider the last element, 
 * the last element replaces the previously-stored result with 1/n probability. 
 * So the probability of getting the last element as the result is 1/n.
 * 
 * Let us now talk about the second last element. 
 * When the second last element processed the first time, 
 * the probability that it replaced the previous result is 1/(n-1). 
 * The probability that the previous result stays when the nth item is considered is (n-1)/n. 
 * So the probability that the second last element is picked in the last iteration is [1/(n-1)] * [(n-1)/n] which is 1/n. 
 */