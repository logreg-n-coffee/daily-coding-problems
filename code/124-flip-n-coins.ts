/* 
    You have n fair coins and you flip them all at the same time. Any that come up tails you set aside. 
    The ones that come up heads you flip again. How many rounds do you expect to play before only one coin remains?

    Write a function that, given n, returns the number of rounds you'd expect to play until one coin remains.
 */

(() => { 
    const flipCoin = (n: number): number => Math.ceil(Math.log2(n));

    console.log(flipCoin(100));
})();

/*
    Solution: 
    If you have 100 fair coins, then you'd expect to get 50 heads after the first round, and then 25, and so on. 
    We can get the number of rounds it takes to get to 1 remaining coin by simply halving until we reach one.

    That's simply log2(n)
 */