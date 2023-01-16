/*
Given three 32-bit integers x, y, and b, 
return x if b is 1 and y if b is 0, using only mathematical or bit operations. 
You can assume b can only be 1 or 0.
 */

const logicalSwitch = (x: number, y: number, b: number) => (x * b) + (y * (1 - b));
// also valid:
// const logicalSwitch = (x: number, y: number, b: number) => (x * b) | (y * (1 - b));

(() => { 
    console.log(logicalSwitch(100, 200, 0));
    console.log(logicalSwitch(500, 800, 1));
})();