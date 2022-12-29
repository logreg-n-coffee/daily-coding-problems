/*
Assume you have access to a function toss_biased() which returns 0 or 1 
with a probability that's not 50-50 (but also not 0-100 or 100-0). 
You do not know the bias of the coin.

Write a function to simulate an unbiased coin toss.
*/

const tossBiased = () => Math.random() > 0.66;

const tossFair = () => { 
    const t1 = tossBiased();
    const t2 = tossBiased();

    if (t1 && !t2) {
        return true;
    } else if (t2 && !t1) { 
        return false;
    } else {
        return tossFair();
    }

};

// driver code
const result = Array(1000).fill().map(() => tossFair());
const headCount = result.filter(x => x === true).length;
const tailCount = result.filter(x => x === false).length;

console.log(result);
console.log(headCount, tailCount);

/*
Intuition:
probability chart for tossing our coin twice - probability of getting heads is p, so tails is 1 - p

HH: p * p
HT: p * (1 - p)
TH: (1 - p) * p
TT: (1 - p) * (1 - p)

Toss our coin twice.
If we get heads and then tails, return heads. 
If we get heads and then tails, return tails.
Otherwise if we get the same outcome for both coins, re-toss.
*/