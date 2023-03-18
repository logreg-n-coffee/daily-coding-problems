/*
Given the head of a singly linked list, swap every two nodes and return its head.

For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3.
 */

(() => { 
    class List {
        val: number;
        next: List | null;

        constructor(val: number) {
            this.val = val;
            this.next = null;
        }
    }

    const swap = (node: List | null) => { 
        let curr = node;

        while (curr && curr.next) {
            [curr.val, curr.next.val] = [curr.next.val, curr.val];
            curr = curr.next.next;
        }
    };

    const myList = new List(1);
    myList.next = new List(2);
    myList.next.next = new List(3);
    myList.next.next.next = new List(4);

    console.log(myList);
    console.log(swap(myList), myList);
})();