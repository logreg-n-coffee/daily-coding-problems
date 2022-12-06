/*
Given a array of numbers representing the stock prices of a company in chronological order, 
write a function that calculates the maximum profit you could have made from buying and selling that stock once. 
You must buy before you can sell it.

For example, given [9, 11, 8, 5, 7, 10], you should return 5, 
since you could buy the stock at 5 dollars and sell it at 10 dollars.
*/

// Brute force: TC: O(n^2) SC: O(1)
const maxProfitBF = (arr) => {
    const n = arr.length;
    let maxProfit = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i; j < n; j++) {
            const buy = arr[i];
            const sell = arr[j];
            maxProfit = Math.max(maxProfit, sell - buy);
        }
    }
    return maxProfit;
};

/**
 * Find the maximum profit for a given array of stock prices in O(n) time and O(1) extra space
 * @param {number[]} arr a array of numbers representing the stock prices of a company in chronological order
 * @returns {number} the maximum profit you could have made from buying and selling that stock once
 */
const maxProfit = (arr) => {
    const n = arr.length;
    let currentMax = 0;
    let maxProfit = 0;

    for (let i = n - 1; i >= 0; i--) {
        currentMax = Math.max(currentMax, arr[i]);
        const potentialProfit = currentMax - arr[i];
        maxProfit = Math.max(maxProfit, potentialProfit);
    }

    return maxProfit;
};

/*
Intuition: The maximum profit comes from the greatest difference between the highest price and lowest price, 
where the higher price must come after the lower one.

But if we see a high price x and then a higher price y afterwards, then we can always discard x. 
So, if we keep track of the highest price in the future for each variable, 
we can immediately find how much profit buying at that price can make.

That means we can look at the array backwards and always keep track of the highest price we've seen so far. 
Then, at each step, we can look at the current price and check how much profit we would have made buying 
at that price by comparing with our maximum price in the future.
*/

// driver code
console.log(maxProfitBF([9, 11, 8, 5, 7, 10]));
console.log(maxProfit([9, 11, 8, 5, 7, 10]));
