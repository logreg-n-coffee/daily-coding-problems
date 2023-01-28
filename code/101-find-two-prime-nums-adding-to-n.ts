/*
Given an even number (greater than 2), 
return two prime numbers whose sum will be equal to the given number.

A solution will always exist. See Goldbach’s conjecture.

Example:

Input: 4
Output: 2 + 2 = 4
If there are more than one solution possible, return the lexicographically smaller solution.

If [a, b] is one solution with a <= b, and [c, d] is another solution with c <= d, then

[a, b] < [c, d]
If a < c OR a==c AND b < d.
 */

const primeSum = (n: number): [number, number] | null => { 
    // get a list of primes up to n
    const primes: number[] = sieveOfEratosthenes(n);
    for (const prime of primes) {
        if (prime > n - 2) {
            // the other prime must be less than n - 2
            break;
        }
        if (primes.includes(n - prime)) {
            return [prime, n - prime]
        }
    }
    return null;

    function sieveOfEratosthenes(n: number): number[] {
        const primes = Array(n + 1).fill(true);
        primes[0] = primes[1] = false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (primes[i]) {
                for (let j = i ** 2; j <= n; j += i) {
                    primes[j] = false;
                }
            }
        }
        return primes.reduce((acc, isPrime, index) => { 
            if (isPrime) {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);
    }
};

(() => { 
    console.log(primeSum(4));
})();
