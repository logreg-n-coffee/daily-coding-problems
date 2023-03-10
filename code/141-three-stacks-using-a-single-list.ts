/*
Implement 3 stacks using a single list:

class Stack:
    def __init__(self):
        self.list = []

    def pop(self, stack_number):
        pass

    def push(self, item, stack_number):
        pass
 */

(() => { 
    class Stack {
        private stackSize: number;
        private list: (number | null)[];
        private top: number[];

        constructor(stackSize = 50) {
            this.stackSize = stackSize;
            this.list = Array(stackSize * 3).fill(null);
            this.top = [-1, -1, -1];  // keep track of top of each stack
        }

        pop(stackNumber: number): number | null {
            if (this.top[stackNumber] === -1) {
                throw new Error(`Stack ${stackNumber} is empty`);
            }
            const item = this.list[this.stackSize * stackNumber + this.top[stackNumber]];
            this.list[this.stackSize * stackNumber + this.top[stackNumber]] = null;
            this.top[stackNumber]--;
            return item;
        }

        push(item: any, stackNumber: number = 0): void { 
            if (this.top[stackNumber] === this.stackSize - 1) {
                throw new Error(`Stack ${stackNumber} is full`);
            }
            this.top[stackNumber]++;
            this.list[this.stackSize * stackNumber + this.top[stackNumber]] = item;
        }

        peek(stackNumber: number): number | null {
            if (this.top[stackNumber] === -1) {
                throw new Error(`Stack ${stackNumber} is empty`);
            }
            return this.list[this.stackSize * stackNumber + this.top[stackNumber]];
        }
    }

    const myStack = new Stack(10);
    for (let i = 0; i < 10; i++) { 
        myStack.push(i, 0);
        myStack.push(i + 10, 1);
    }
    
    for (let i = 0; i < 5; i++) {
        console.log('Popping from stack 0: ', myStack.pop(0));
        console.log('Popping from stack 1: ', myStack.pop(1));
    }
})();
