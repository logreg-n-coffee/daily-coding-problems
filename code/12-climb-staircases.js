// There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. 
// Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

// For example, if N is 4, then there are 5 unique ways:

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2
// What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? 
// For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
// answer: f(n) = f(n - 1) + f(n - 3) + f(n - 5)

// fibonacci numbers - dynamic planning -> f(n) = f(n - 1) + f(n - 2)  // 1 = 1 step, 2 = 2 steps

const climbStairs = (n = 1) => {
    if (n <= 2) {
        return n;
    }
    let res = 0, n1 = 1, n2 = 2;
    for (let i = 3; i <= n; i++) {
        res = n1 + n2;
        // console.log('current res: ', res);
        n1 = n2;
        n2 = res;
    }
    return res;
};

console.log(climbStairs(6));
// expect 13
// Time: O(n) / Space: O(1)

const climbStairsAlt = (n = 1) => {
    let a = 1, b = 2;
    for (const _ of Array(n - 1).keys()) {
        [a, b] = [b, a + b];
    }
    return a;
};
console.log(climbStairsAlt(5));

// steps = [x1, x2, ..., xn] 
// f(n) = f(n - x1) + f(n - x2) + ... + f(n - xn)
const climbStairsWithCustomizedSteps = (n = 1, steps = [1, 2]) => {
    const cache = Array(n + 1);
    if (n === 0) {
        cache[n] = 1;
    } else {
        let total = 0;
        for (const step of steps) {
            if (n >= step) {
                total += climbStairsWithCustomizedSteps(n - step, steps);
            }
            cache[n] = total;
        }
    }
    return cache[n];

};

console.log(climbStairsWithCustomizedSteps(6));
// time: O(n * |steps|) - space: O(n) 