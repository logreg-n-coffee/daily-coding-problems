/*
Implement a queue using two stacks. Recall that a queue is a FIFO (first-in, first-out) 
data structure with the following methods: 
1. enqueue, which inserts an element into the queue, and 
2. dequeue, which removes it.
*/

class Queue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    enqueue(val) {
        this.s1.push(val);
    }

    dequeue() {
        if (this.s2.length > 0) {
            return this.s2.pop();
        }

        if (this.s1.length > 0) {
            // empty all of s1 into s2
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
            return this.s2.pop();
        }

        return null;
    }
}

// driver code 
const random = () => Math.floor(Math.random() * 10);
const q = new Queue();

const myArr = Array(20).fill().map(() => random());
console.log('myArr', myArr);

const n = myArr.length;

for (let i = 0; i < n; i++) {
    q.enqueue(myArr[i]);
}

for (let i = 0; i < n; i++) {
    console.log(q.dequeue());
}

/*
Intuition:
Consider enqueuing three elements: 1, 2, and then 3:

stack1: [1, 2, 3]
stack2: []

Then emptying stack1 into stack2:

stack1: []
stack2: [3, 2, 1]
Then popping three times (retaining the original order):

1
2
3

*/