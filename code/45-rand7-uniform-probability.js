/*
Using a function rand5() that returns an integer from 1 to 5 (inclusive) with uniform probability, 
implement a function rand7() that returns an integer from 1 to 7 (inclusive).
*/


// Math.random() * 5 + 1 generates a random float number from 1 (inclusive) to 6 (exclusive)
// after flooring the float number, it will generate integers from 1 to 5 (both inclusive) - in uniform probability
const rand5 = () => Math.floor(Math.random() * 5 + 1);  

// generate numbers from 1 to 7 (both inclusive) using rejection sampling
const rand7 = () => {
    let result;
    while (1) {
        // uniformly generate numbers in the range 0 to 24 (both incl) using the following formula and save it to the result
        result = rand5() - 1 + 5 * (rand5() - 1); // generate values uniformly from 0 to 4 by subtracting 1 from the result of rand5()
        // If the above formula generates a random number in the range 0 to 20, accept the number
        if (result <= 20) {
            break;
        }
        // If the formula generates a number in the range 21 to 24, reject the number and then retry
    }
    // We then add 1 to the remainder to get the result which will be uniformly distributed in the range 1-7
    result = 1 + (result % 7); // (result % 7) The remainder will be uniformly distributed in the range 0 to 6
    return result;
};

// driver code 
const n = 10_000;
const seed = Array(n).fill().map(() => rand7());
const pick1 = seed.filter(x => x === 1).length;
console.log('Using rand7, the possibility of randomly picking 1 is: ', (pick1 / n).toFixed(3));
console.log('1 / 7 equals to:', (1 / 7).toFixed(3));

// O(Infinity) in the worst case
