/*
    Find the minimum number of coins required to make n cents.

    You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.

    For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.
 */

// solve problem with greedy algo - O(n) time and O(1) space
(() => { 
    const minCoins = (n: number): number => { 
        let count = 0;
        while (n > 0) {
            if (n >= 25) {
                n -= 25;
                count++;
            } else if (n >= 10) {
                n -= 10;
                count++;
            } else if (n >= 5) {
                n -= 5;
                count++;
            } else {
                n--;
                count++;
            }
        }
        return count;
    };

    console.log(minCoins(16));
})();