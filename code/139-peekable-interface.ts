/* 
Given an iterator with methods next() and hasNext(), create a wrapper iterator, PeekableInterface, which also implements peek(). 
peek() shows the next element that would be returned on next().

Here is the interface:

class PeekableInterface(object):
    def __init__(self, iterator):
        pass

    def peek(self):
        pass

    def next(self):
        pass

    def hasNext(self):
        pass
 */

(() => { 
    interface Iterator<T> {
        next(): T | undefined;
        hasNext(): boolean;
    }
    
    class PeekableInterface<T> implements Iterator<T> { 
        private iterator: Iterator<T>;
        private nextItem: T | undefined;

        constructor(iterator: Iterator<T>) {
            this.iterator = iterator;
            this.nextItem = undefined;
        }

        peek(): T | undefined { 
            if (!this.nextItem && this.iterator.hasNext()) { 
                this.nextItem = this.iterator.next();
            }
            return this.nextItem;
        }

        next(): T | undefined {
            if (this.nextItem) {
                const item = this.nextItem;
                this.nextItem = undefined;
                return item;
            } else if (this.iterator.hasNext()) { 
                return this.iterator.next();
            } else {
                return undefined;
            }
        }

        hasNext(): boolean {
            return this.nextItem != undefined || this.iterator.hasNext();
        }
    }

    // test case
    const arr = [1, 2, 3, 4, 5];
    const iterator = {
        index: 0,
        next() {
            return arr[this.index++];
        },
        hasNext() { 
            return this.index < arr.length;
        },
    };

    const peekable = new PeekableInterface(iterator);

    console.log(peekable.peek()); // 1
    console.log(peekable.next()); // 1
    console.log(peekable.hasNext()); // true
    console.log(peekable.peek()); // 2
    console.log(peekable.next()); // 2
    console.log(peekable.peek()); // 3
    console.log(peekable.next()); // 3
    console.log(peekable.hasNext()); // true
    console.log(peekable.peek()); // 4
    console.log(peekable.next()); // 4
    console.log(peekable.hasNext()); // true
    console.log(peekable.peek()); // 5
    console.log(peekable.next()); // 5
    console.log(peekable.hasNext()); // false
    console.log(peekable.peek()); // undefined
    console.log(peekable.next()); // undefined
})();