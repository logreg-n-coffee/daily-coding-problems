/*
Given an integer n and a list of integers l, 
write a function that randomly generates a number from 0 to n-1 (incl.) that isn't in l (uniform).
 */

const randomNumberExcludingList = (n: number, l: number[]): number => {
    const nums: number[] = processList(n, l);
    const idx = generateRandom(nums.length);

    return nums[idx];

    /**
     * generate a list from 0 to n-1, minus the l list
     * @param n max range n (not inclusive)
     * @param l list of integers to exclude
     * @returns a list from 0 to n-1, minus the l list
     */
    function processList(n: number, l: number[]): number[] { 
        const allNumsSet: number[] = Array(n).fill(0).map((_, i) => i);
        return allNumsSet.filter(x => !l.includes(x));
    }

    /**
     * generate a random number from 0 to n-1 (incl.)
     * @param n max range n (not inclusive)
     * @returns a random number from 0 to n-1 (incl.)
     */
    function generateRandom(n: number): number {
        return Math.floor(Math.random() * n);
    }
}; 

(() => {
    console.log(randomNumberExcludingList(4, [1, 2]));
})();