/**
 * You run an e-commerce website and want to record the last N order ids in a log. 
 * 
 * Implement a data structure to accomplish this, with the following API:
 * 
 * record(order_id): adds the order_id to the log
 * get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
 * 
 * You should be as efficient with time and space as possible.
 */

class Log {
    #log;  // declare private field

    constructor(n) {
        this.#log = [];  // initialize an array 
        this.n = n;  // use variable n to limit the max length of the array 
    }

    // add the orderId to the log
    record(orderId) {
        if (this.#log.length >= this.n) {
            this.#log.splice(this.#log.length - 1, 1);  // O(n)
        }
        this.#log.unshift(orderId);
    }

    // get the i-th last element - 
    // since the lastly added element goes to the beginning, 
    // it literally retrieves the beginning of the i-th element
    getLast(i) {
        return this.#log[i - 1];
    }

    // print everything in the private log array
    print() {
        this.#log.forEach((element, index) => console.log('element, index', element, index));
    }

}

// driver code
console.log('---O(n)---');
const log = new Log(5);
for (let i = 0; i < 6; i++) {
    log.record(i);
}
log.record(100);
log.record(200);
log.record(300);
log.record(400);
log.record(500);
log.record(600);
console.log(log.getLast(1));
log.print();


// O(1) constant time solution - build a circular buffer
class LogWithCircularBuffer {
    // declare private field
    #log;
    #cur;

    constructor(n) {
        this.n = n;
        this.#log = [];
        this.#cur = 0;
    }

    record(orderId) {
        if (this.#log.length === this.n) {
            this.#log[this.#cur] = orderId;
        } else {
            this.#log.push(orderId);
        }
        this.#cur = (this.#cur + 1) % this.n;
    }

    getLast(i) {
        return this.#log[this.#cur - i];
    }

    print() {
        this.#log.forEach((element, index) =>
            console.log('element, index', element, index)
        );
    }
}

// driver code
console.log('---O(1)---');
const logWithCircularBuffer = new LogWithCircularBuffer(5);
for (let i = 0; i < 6; i++) {
    log.record(i);
}
logWithCircularBuffer.record(100);
logWithCircularBuffer.record(200);
logWithCircularBuffer.record(300);
logWithCircularBuffer.record(400);
logWithCircularBuffer.record(500);
logWithCircularBuffer.record(600);
console.log(logWithCircularBuffer.getLast(1));
logWithCircularBuffer.print();