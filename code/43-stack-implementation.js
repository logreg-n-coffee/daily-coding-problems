/*
Implement a stack that has the following methods:

1. push(val), which pushes an element onto the stack
2. pop(), which pops off and returns the topmost element of the stack. 
If there are no elements in the stack, then it should throw an error or return null.
3. max(), which returns the maximum value in the stack currently. If there are no elements in the stack, 
then it should throw an error or return null.

Each method should run in constant time. - keep track of the max values
*/

class Stack {
    constructor(val) {
        this.stack = [];
        this.maxes = [];
        if (val) this.push(val);
    }

    push(val) {
        this.stack.push(val);
        if (this.maxes.length) {
            this.maxes.push(Math.max(val, this.maxes[this.maxes.length - 1]));
        } else {
            this.maxes.push(val);
        }
    }

    pop() {
        if (this.maxes.length) {
            this.maxes.pop();
        }
        return this.stack.pop();
    }

    max() {
        return this.maxes[this.maxes.length - 1];
    }
}

// driver code
const stack = new Stack();
const list = Array(5).fill().map(() => Math.floor(Math.random() * 10));
list.forEach(item => stack.push(item));

console.log('Populated Stack: ', stack.stack);
console.log('Populated Maxes: ', stack.maxes);
console.log('Current Max: ', stack.max());

console.log('\nPopped the last value: ', stack.pop());
console.log('Current Stack: ', stack.stack);
console.log('Current Max: ', stack.max());

console.log('\nPopped the last value: ', stack.pop());
console.log('Current Stack: ', stack.stack);
console.log('Current Max: ', stack.max());

console.log('\nPopped the last value: ', stack.pop());
console.log('Current Stack: ', stack.stack);
console.log('Current Max: ', stack.max());

console.log('\nPopped the last value: ', stack.pop());
console.log('Current Stack: ', stack.stack);
console.log('Current Max: ', stack.max());