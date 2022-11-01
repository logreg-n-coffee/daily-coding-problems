// Implement a job scheduler 
// which takes in a function f and an integer n, and calls f after n milliseconds.

/**
 * takes in a function f and an integer n, and calls f after n milliseconds
 * @param {function f() {}} f 
 * @param {number} n 
 */
const jobScheduler = (f, n) => {
    setInterval(() => f(), n);
};

const f = () => console.log('hey hey');

jobScheduler(f, 1000);  // 1000ms = 1s