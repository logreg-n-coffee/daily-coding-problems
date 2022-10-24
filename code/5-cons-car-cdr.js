// cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. 
// For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

// cons::(a, b) -> (((a, b) -> c) -> c)
// car::(((a, b) -> a) -> a) -> a
// cdr::(((a, b) -> b) -> b) -> b

// definition
// function cons(a, b) {
//     // function pair(f) {
//     //     return f(a, b);
//     // }
//     const pair = (f) => f(a, b); 
//     return pair;
// }

const cons = (a, b) => f => f(a, b);

// function car(f) {
//     const pair = (a, b) => a;
//     return f(pair);
// }

const car = f => {
    const pair = (a, b) => a;
    return f(pair);
};

const cdr = f => {
    const pair = (a, b) => b; 
    return f(pair);
}

console.log(car(cons(3, 4)));
console.log(cdr(cons(3, 4)));
