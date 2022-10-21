import { twoSumIndex } from "./1-two-numbers-in-list";

// generate a random array of numbers
const generateRandomArray = (len, max) => [... new Array(len)].map(() => Math.floor(Math.random() * max));
const len = 10;
const max = 100;
const randomArray = generateRandomArray(len, max);

// add two random numbers in the random array together 
const indexOne = Math.floor(Math.random() * len);
const indexTwo = Math.floor(Math.random() * len);
const sum = randomArray[indexOne] + randomArray[indexTwo];

console.log('randomArray', randomArray);
console.log('sum', sum);

console.log('indices', twoSumIndex(randomArray, sum));
